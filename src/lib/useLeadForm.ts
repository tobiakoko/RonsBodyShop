/**
 * SM-2 — shared submit-status machine for simple (single-step) lead forms.
 *
 *   idle ─submit✓→ submitting ─ok→ success ─reset→ idle
 *     ▲  submit✗ (stays idle,      └─fail→ error ─edit/submit→ …
 *     │  field errors shown)
 *
 * One discriminated union instead of loose booleans, so `success`, `error`
 * and `submitting` are mutually exclusive by construction.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { z } from 'zod';
import { submitLead } from './submitLead';
import { toFieldErrors, type FieldErrors, type LeadKind } from './validation';

export type SubmitStatus =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; reference?: string }
  | { status: 'error'; message: string };

type FormValue = string | boolean;

export function useLeadForm<T extends Record<string, FormValue>>(options: {
  kind: LeadKind;
  schema: z.ZodType;
  initial: T;
  getToken?: () => string | undefined;
}) {
  const { kind, schema, initial, getToken } = options;
  const [data, setData] = useState<T>(initial);
  const [errors, setErrors] = useState<FieldErrors<keyof T & string>>({});
  const [state, setState] = useState<SubmitStatus>({ status: 'idle' });
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const setField = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key as keyof T & string];
      return next;
    });
    setState((prev) => (prev.status === 'error' ? { status: 'idle' } : prev));
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const target = e.target;
      const value =
        target instanceof HTMLInputElement && target.type === 'checkbox'
          ? target.checked
          : target.value;
      setField(target.name as keyof T, value as T[keyof T]);
    },
    [setField],
  );

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      if (state.status === 'submitting') return;

      const parsed = schema.safeParse(data);
      if (!parsed.success) {
        setErrors(toFieldErrors(parsed.error));
        return;
      }
      setErrors({});
      setState({ status: 'submitting' });
      try {
        const { reference } = await submitLead(kind, parsed.data, getToken?.());
        if (mounted.current) setState({ status: 'success', reference });
      } catch (err) {
        if (mounted.current)
          setState({
            status: 'error',
            message: err instanceof Error ? err.message : 'Submission failed.',
          });
      }
    },
    [data, getToken, kind, schema, state.status],
  );

  const reset = useCallback(() => {
    setData(initial);
    setErrors({});
    setState({ status: 'idle' });
  }, [initial]);

  return { data, errors, state, setField, handleChange, handleSubmit, reset };
}
