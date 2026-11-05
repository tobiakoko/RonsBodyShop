import { useCallback, useRef } from 'react';

export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

/** Holds the latest Turnstile token for a form; `getToken` is stable. */
export function useTurnstile() {
  const token = useRef<string | undefined>(undefined);
  const getToken = useCallback(() => token.current, []);
  const setToken = useCallback((t?: string) => {
    token.current = t;
  }, []);
  return { getToken, setToken, enabled: Boolean(TURNSTILE_SITE_KEY) };
}
