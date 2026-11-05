import type { LeadKind } from './validation';

export interface LeadResponse {
  reference: string;
}

export class LeadSubmitError extends Error {}

/**
 * POST a lead to the serverless function. Resolves with the server-issued
 * reference number (the same one the shop sees in the email); throws
 * LeadSubmitError on any failure so the UI can show the phone fallback.
 */
export async function submitLead<T>(
  kind: LeadKind,
  data: T,
  turnstileToken?: string,
): Promise<LeadResponse> {
  let res: Response;
  try {
    res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, data, turnstileToken }),
    });
  } catch {
    throw new LeadSubmitError('Network error — please check your connection.');
  }

  const body = (await res.json().catch(() => null)) as { reference?: string; error?: string } | null;
  if (!res.ok || !body?.reference) {
    throw new LeadSubmitError(body?.error ?? 'Submission failed.');
  }
  return { reference: body.reference };
}
