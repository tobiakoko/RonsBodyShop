/**
 * Shared Zod schemas — the client forms and the serverless function
 * (`api/lead.ts`) validate with exactly the same rules.
 *
 * Imports use explicit `.js` extensions so the file also resolves under
 * Node ESM inside the Vercel function bundle.
 */
import { z } from 'zod';
import { SERVICE_IDS } from '../content/services.js';

const CONSENT_MESSAGE = 'Please agree so we can contact you about your request';

const phone = z
  .string()
  .trim()
  .min(7, 'Phone is required')
  .max(30)
  .regex(/^[\d\s\-()+.]+$/, 'Enter a valid phone number');

const optionalEmail = z
  .string()
  .trim()
  .max(200)
  .refine((v) => v === '' || z.email().safeParse(v).success, 'Enter a valid email');

/** Hidden honeypot input — humans never fill it. */
const honeypot = z.string().max(0).optional();

// ─── Quick message ────────────────────────────────────────────────────────────

export const messageSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  contact: z.string().trim().min(5, 'Phone or email is required').max(200),
  message: z.string().trim().min(1, 'Please tell us how we can help').max(2000),
  consent: z.literal(true, { error: CONSENT_MESSAGE }),
  company: honeypot,
});

// ─── Estimate wizard ──────────────────────────────────────────────────────────

const currentYear = new Date().getFullYear();

/** Plain object (no object-level refinements) so the wizard can `.pick()` per step. */
export const estimateFields = z.object({
  damageType: z.enum(SERVICE_IDS, { error: 'Select the type of damage or project' }),
  vehicleMake: z.string().trim().min(1, 'Make is required').max(60),
  vehicleModel: z.string().trim().min(1, 'Model is required').max(60),
  vehicleYear: z
    .string()
    .trim()
    .regex(/^\d{4}$/, 'Enter a 4-digit year')
    .refine((v) => Number(v) >= 1900 && Number(v) <= currentYear + 2, 'Enter a valid year'),
  paymentType: z.enum(['insurance', 'out-of-pocket'], { error: 'Choose how the repair is paid' }),
  insuranceCarrier: z.string().trim().max(80).optional().default(''),
  claimNumber: z.string().trim().max(60).optional().default(''),
  notes: z.string().trim().max(2000).optional().default(''),
  contactName: z.string().trim().min(1, 'Name is required').max(100),
  contactPhone: phone,
  contactEmail: optionalEmail.optional().default(''),
  consent: z.literal(true, { error: CONSENT_MESSAGE }),
  company: honeypot,
});

const carrierRequired = (d: { paymentType?: string; insuranceCarrier?: string }) =>
  d.paymentType !== 'insurance' || Boolean(d.insuranceCarrier?.trim());
const CARRIER_RULE = { message: 'Select your insurance carrier', path: ['insuranceCarrier'] };

export const estimateSchema = estimateFields.refine(carrierRequired, CARRIER_RULE);

/** Fields validated when leaving each wizard step. */
export const ESTIMATE_STEP_FIELDS = {
  1: ['damageType'],
  2: ['vehicleMake', 'vehicleModel', 'vehicleYear'],
  3: ['paymentType', 'insuranceCarrier', 'claimNumber'],
  4: ['contactName', 'contactPhone', 'contactEmail', 'notes', 'consent'],
} as const satisfies Record<1 | 2 | 3 | 4, readonly (keyof z.infer<typeof estimateFields>)[]>;

export type MessageInput = z.infer<typeof messageSchema>;
export type EstimateInput = z.infer<typeof estimateSchema>;
export type LeadKind = 'estimate' | 'message';

export type FieldErrors<K extends string = string> = Partial<Record<K, string>>;

/** Flatten a Zod error into `{ field: firstMessage }`. */
export function toFieldErrors<K extends string>(error: z.ZodError): FieldErrors<K> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? '');
    if (key && !out[key]) out[key] = issue.message;
  }
  return out as FieldErrors<K>;
}

/** Validate only the fields belonging to one wizard step. */
export function validateEstimateStep(
  step: 1 | 2 | 3 | 4,
  data: Record<string, unknown>,
): FieldErrors {
  const mask = Object.fromEntries(ESTIMATE_STEP_FIELDS[step].map((k) => [k, true])) as {
    [K in keyof z.infer<typeof estimateFields>]?: true;
  };
  let schema: z.ZodType = estimateFields.pick(mask);
  if (step === 3)
    schema = schema.refine(
      (d) => carrierRequired(d as Parameters<typeof carrierRequired>[0]),
      CARRIER_RULE,
    );
  const result = schema.safeParse(data);
  return result.success ? {} : toFieldErrors(result.error);
}
