# 05 — Contact / Estimate Backend (the #1 fix)

**This is the single most important document in the folder.** Right now, every form in the redesign is a mock: the Estimate wizard, the "Quick Message to Ron" form, and (if ported) any contact form all show a success message and **send nothing to the shop.** A lead-generation site that doesn't capture leads has failed at its one job. This file makes the forms real.

---

## 5.1 What's broken

| Form | File | Current behavior |
|---|---|---|
| Estimate wizard (4-step) | `EstimateCalculator.tsx` | `handleSubmit` generates `'RBS-' + Math.random()` and sets `isSubmitted`. **No network call.** Photos are `URL.createObjectURL` only — never uploaded. |
| Quick Message to Ron | `LocationAndHours.tsx` | `handleSendMessage` sets `submitted = true`. **No network call.** |

Both validate nothing beyond HTML `required`. Both show "Received!/Dispatched!" regardless of reality.

## 5.2 The constraint

The site is a **static SPA** (Vite build → static files, deployed to Vercel). There's no running server. So "submit" needs a destination. The redesign's leftover `express`/`@google/genai` deps suggest a Node server was imagined, but **none was built** — and a full Node server is more than this needs. Two clean options, in recommended order.

## 5.3 Option A (recommended): Vercel Serverless Function + Resend

You deploy on Vercel; a serverless function is free, requires no separate server, and keeps the email-provider key server-side. **Resend** is a modern transactional-email API with a generous free tier (ample for a body shop).

### Files to create

**`src/lib/validation.ts`** — shared Zod schemas (client + server use the same ones):
```ts
import { z } from "zod";

// Quick message form
export const messageSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  contact: z.string().trim().min(5, "Phone or email is required").max(200),
  message: z.string().trim().min(1, "Please tell us how we can help").max(2000),
  company: z.string().max(0).optional(),           // honeypot
});

// Estimate wizard — grouped so the wizard can .pick() per step (see 04 SM-1)
export const estimateSchema = z.object({
  damageType: z.enum(["collision", "paint", "dent", "frame", "classic"]),
  vehicleMake: z.string().trim().min(1).max(60),
  vehicleModel: z.string().trim().min(1, "Model is required").max(60),
  vehicleYear: z.string().trim().regex(/^\d{4}$/, "Enter a 4-digit year"),
  paymentType: z.enum(["insurance", "out-of-pocket"]),
  insuranceCarrier: z.string().max(80).optional(),
  claimNumber: z.string().max(60).optional(),
  notes: z.string().max(2000).optional().default(""),
  contactName: z.string().trim().min(1, "Name is required").max(100),
  contactPhone: z.string().trim().min(7, "Phone is required").max(30)
    .regex(/^[\d\s\-()+.]+$/, "Enter a valid phone number"),
  contactEmail: z.string().trim().email("Enter a valid email").max(200).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent is required" }) }),
  company: z.string().max(0).optional(),           // honeypot
});

export type MessageInput = z.infer<typeof messageSchema>;
export type EstimateInput = z.infer<typeof estimateSchema>;
```

**`src/lib/submitLead.ts`** — client transport:
```ts
export async function submitLead<T>(kind: "estimate" | "message", data: T): Promise<{ reference: string }> {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind, data }),
  });
  if (!res.ok) throw new Error("Submission failed");
  return res.json();   // { reference: "RBS-..." } — issued by the server, not random
}
```

**`api/lead.ts`** — Vercel serverless function (lives at repo root `/api`, not in `src/`):
```ts
import { Resend } from "resend";
import { estimateSchema, messageSchema } from "../src/lib/validation";

const resend = new Resend(process.env.RESEND_API_KEY);   // server-only secret
const SHOP_EMAIL = "ronsbodyshop@sbcglobal.net";

export const config = { runtime: "nodejs" };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const body = await req.json().catch(() => null);
  if (!body?.kind) return json({ error: "Bad request" }, 400);

  const schema = body.kind === "estimate" ? estimateSchema : messageSchema;
  const parsed = schema.safeParse(body.data);
  if (!parsed.success) return json({ error: "Validation failed" }, 400);

  const d: any = parsed.data;
  if (d.company) return json({ reference: "RBS-000000" }, 200);  // honeypot: fake success

  // TODO: verify Cloudflare Turnstile token here (see 5.5) before sending

  const reference = "RBS-" + Math.floor(100000 + Math.random() * 900000);
  const subject = body.kind === "estimate"
    ? `New estimate request ${reference} — ${d.contactName}`
    : `New message ${reference} — ${d.name}`;

  await resend.emails.send({
    from: "Ron's Body Shop Website <noreply@ronsbodyshop.net>",
    to: [SHOP_EMAIL],
    replyTo: d.contactEmail || d.contact || undefined,   // structured field — no header injection
    subject,
    text: formatLeadBody(body.kind, d, reference),        // user input only in the body
  });

  return json({ reference }, 200);
}

function json(obj: unknown, status: number) {
  return new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json" } });
}
function formatLeadBody(kind: string, d: any, ref: string): string {
  // Build a plain-text summary. NEVER interpolate user input into email headers.
  return [`Reference: ${ref}`, `Type: ${kind}`, ...Object.entries(d)
    .filter(([k]) => k !== "company" && k !== "consent")
    .map(([k, v]) => `${k}: ${v}`)].join("\n");
}
```

### Wiring it up
- The estimate wizard's `SUBMIT` action (`04` SM-1) calls `submitLead("estimate", data)`, dispatches `RESOLVED` with the returned `reference` (replacing `Math.random()`), or `REJECTED` on throw.
- The quick-message form's submit calls `submitLead("message", data)` via the shared `useLeadForm` hook (`04` SM-2).
- The **reference number now comes from the server**, so it's consistent with what the shop sees in the email.

### Security baked in (addresses audit S1/S2/S3)
- **Zod validates on both client and server** — the server never trusts the client.
- **User input goes only in the email body/structured `replyTo`**, never in headers → no email-header injection.
- **API key is server-only** (`process.env.RESEND_API_KEY`, not `VITE_`-prefixed → never shipped to the browser).
- **Honeypot** (`company` field, hidden, must be empty) blocks basic bots.
- Add **consent** to the forms (the estimate form has no consent checkbox; the schema requires it — add the checkbox to step 4). California CCPA.

## 5.4 Option B (fastest): Formspree / Web3Forms

If you want it live today with zero backend code: point `submitLead` at a Formspree or Web3Forms endpoint instead of `/api/lead`. Their service receives the POST and emails the shop; they handle spam filtering. Trade-offs: third-party branding on free tiers, monthly submission caps, data flows through them, and you can't shape the email as precisely. Good interim; Option A is the professional end state. **Do NOT fall back to a `mailto:` link** — it opens the user's mail client, converts terribly, and breaks on phones without mail configured.

## 5.5 Spam protection (do this before launch)

A public form with email delivery is a spam magnet and, with a paid API, a cost vector.
1. **Honeypot** — already in the schema/function above. Free, zero UX cost. Add the hidden `company` input to each form.
2. **Cloudflare Turnstile** (recommended) or hCaptcha — privacy-friendly, mostly invisible CAPTCHA. Add the widget to the form, verify the token in `api/lead.ts` before sending.
3. **Rate-limit** the function — e.g. Vercel KV / Upstash counter keyed by IP (N submissions/hour), or a Vercel firewall rule. Prevents hammering.

## 5.6 Photo uploads (estimate wizard)

The wizard's `handleFakePhotoUpload` only makes a local `createObjectURL` — photos never leave the browser. Options, cheapest first:
- **v1 (ship this):** drop the upload from the online form; the success screen already tells the customer to text/bring photos. Simplest, avoids storage/cost/abuse. Recommended for launch.
- **v2:** real upload to Vercel Blob / S3 / Cloudinary, include the URLs in the email. Only if the shop wants photo-first estimates. Adds cost, size limits, and abuse surface — don't build it unless asked.

## 5.7 `.env.example` (replace the AI Studio one)

```
# Email transport (Option A — Resend). Server-side only; never prefix with VITE_.
RESEND_API_KEY=""

# Spam protection (Option A). Server-side verify key + public site key.
TURNSTILE_SECRET_KEY=""
VITE_TURNSTILE_SITE_KEY=""     # the site key is public by design; VITE_ is fine here
```
Remove `GEMINI_API_KEY` and `APP_URL` (unused — genai/server were removed in `01`).

## 5.8 SEO metadata port (do this alongside the backend — C3)

The redesign's `index.html` is thin (title, description, basic OG). The **original** repo's `index.html` had a rich, correct SEO block that must be ported:
- Full primary meta (keywords, author, robots, canonical, theme-color).
- Open Graph + Twitter cards with image dimensions.
- The **`AutoBodyShop` schema.org JSON-LD** (address, geo, hours, telephone, areaServed, foundingDate).

Port that block into the redesign's `index.html`, but **fix the data to match `SHOP_INFO`**: the original's JSON-LD had a placeholder phone `+1-310-555-0123` — use the real `(310) 618-8791` → `+13106188791`. Also correct `foundingDate`: the original said 1982, the redesign's header says "Est. 1980" — **confirm the real founding year with the owner** and use it consistently everywhere (schema, nav tagline, hero copy). Best practice: generate the JSON-LD from `SHOP_INFO` at build time (a tiny Vite plugin or a prebuild script) so it can never drift from the displayed data.

Also port the **favicon/PWA icon set** from the original's `public/` (favicon.ico, the 16/32/180/192/512 PNGs, `site.webmanifest`) — the redesign only ships the logo PNG. Fix the original manifest's `theme_color` (`#2563eb`, a generic blue that doesn't match the brand) to the brand navy `#16203B`.

## 5.9 Summary

1. Create `lib/validation.ts` (Zod), `lib/submitLead.ts` (client), `api/lead.ts` (server). **[highest priority task in the project]**
2. Wire the estimate wizard and quick-message form to `submitLead`; server issues the reference number.
3. Add honeypot + Turnstile + rate-limit.
4. Add a consent checkbox to the estimate form.
5. Drop fake photo upload for v1.
6. Rewrite `.env.example`; keep the email key server-only.
7. Port + correct the SEO metadata, JSON-LD, and favicon set from the original repo; confirm founding year and phone with the owner.
