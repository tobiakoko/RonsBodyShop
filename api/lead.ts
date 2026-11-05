/**
 * POST /api/lead — Vercel Function (Node.js runtime).
 *
 * Receives estimate-wizard and quick-message submissions, validates them with
 * the same Zod schemas the client uses, and emails the shop via Resend.
 * Responds with a server-issued reference number that appears in both the
 * customer's confirmation screen and the shop's email.
 *
 * Env (server-side only — never VITE_-prefixed):
 *   RESEND_API_KEY        required
 *   LEAD_FROM_EMAIL       verified sender on the Resend domain
 *   TURNSTILE_SECRET_KEY  optional; when set, a valid Turnstile token is required
 */
import { randomInt } from 'node:crypto';
import { Resend } from 'resend';
import { SHOP_INFO } from '../src/content/shop.js';
import { CORE_SERVICES } from '../src/content/services.js';
import {
  estimateSchema,
  messageSchema,
  type EstimateInput,
  type LeadKind,
  type MessageInput,
} from '../src/lib/validation.js';

const DEFAULT_FROM = "Ron's Body Shop Website <noreply@ronsbodyshop.net>";
const MAX_BODY_BYTES = 20_000;

export default {
  fetch(request: Request): Promise<Response> {
    return handleLead(request);
  },
};

export async function handleLead(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', Allow: 'POST' },
    });
  }

  const raw = await request.text().catch(() => '');
  if (!raw || raw.length > MAX_BODY_BYTES) return json({ error: 'Bad request' }, 400);

  let body: { kind?: unknown; data?: unknown; turnstileToken?: unknown };
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: 'Bad request' }, 400);
  }

  const kind = body.kind;
  if (kind !== 'estimate' && kind !== 'message') return json({ error: 'Bad request' }, 400);

  // Honeypot: bots fill the hidden `company` field. Pretend success, send nothing.
  const company = (body.data as { company?: unknown } | null)?.company;
  if (typeof company === 'string' && company.length > 0) {
    return json({ reference: makeReference() }, 200);
  }

  const parsed =
    kind === 'estimate' ? estimateSchema.safeParse(body.data) : messageSchema.safeParse(body.data);
  if (!parsed.success) return json({ error: 'Please check the form and try again.' }, 400);

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (secret) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    const ok = await verifyTurnstile(secret, body.turnstileToken, ip);
    if (!ok) return json({ error: 'Spam check failed — please try again.' }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[lead] RESEND_API_KEY is not configured');
    return json({ error: 'Our online form is temporarily unavailable.' }, 500);
  }

  const reference = makeReference();
  const email = buildEmail(kind, parsed.data, reference);

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.LEAD_FROM_EMAIL || DEFAULT_FROM,
    to: [SHOP_INFO.email],
    replyTo: email.replyTo,
    subject: email.subject,
    text: email.text,
  });

  if (error) {
    console.error('[lead] Resend error', error);
    return json({ error: 'We could not send your request.' }, 502);
  }

  return json({ reference }, 200);
}

// ─── helpers ──────────────────────────────────────────────────────────────────

function json(obj: unknown, status: number): Response {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

function makeReference(): string {
  return `RBS-${randomInt(100000, 1000000)}`;
}

/** Strip line breaks and cap length before anything user-supplied touches a header. */
function headerSafe(value: string, max = 80): string {
  return value.replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function buildEmail(
  kind: LeadKind,
  d: EstimateInput | MessageInput,
  reference: string,
): { subject: string; text: string; replyTo?: string } {
  if (kind === 'estimate') {
    const e = d as EstimateInput;
    const service = CORE_SERVICES.find((s) => s.id === e.damageType)?.title ?? e.damageType;
    const billing =
      e.paymentType === 'insurance'
        ? `Insurance — ${e.insuranceCarrier || 'carrier not given'}${e.claimNumber ? ` (claim ${e.claimNumber})` : ''}`
        : 'Customer pay / out-of-pocket';
    return {
      subject: `New estimate request ${reference} — ${headerSafe(e.contactName)}`,
      replyTo: e.contactEmail && isEmail(e.contactEmail) ? e.contactEmail : undefined,
      text: [
        `New online estimate request — ${reference}`,
        '',
        `Name:    ${e.contactName}`,
        `Phone:   ${e.contactPhone}`,
        `Email:   ${e.contactEmail || '—'}`,
        '',
        `Service: ${service}`,
        `Vehicle: ${e.vehicleYear} ${e.vehicleMake} ${e.vehicleModel}`,
        `Billing: ${billing}`,
        '',
        'Notes:',
        e.notes || '—',
        '',
        '— Sent from the ronsbodyshop.net estimate form. Customer consented to be contacted.',
      ].join('\n'),
    };
  }

  const m = d as MessageInput;
  return {
    subject: `New website message ${reference} — ${headerSafe(m.name)}`,
    replyTo: isEmail(m.contact) ? m.contact : undefined,
    text: [
      `New quick message — ${reference}`,
      '',
      `Name:    ${m.name}`,
      `Contact: ${m.contact}`,
      '',
      'Message:',
      m.message,
      '',
      '— Sent from the ronsbodyshop.net contact form. Customer consented to be contacted.',
    ].join('\n'),
  };
}

async function verifyTurnstile(secret: string, token: unknown, ip?: string): Promise<boolean> {
  if (typeof token !== 'string' || !token) return false;
  try {
    const form = new URLSearchParams({ secret, response: token });
    if (ip) form.set('remoteip', ip);
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form,
    });
    const result = (await res.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}
