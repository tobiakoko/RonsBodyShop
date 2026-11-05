import { useEffect, useRef } from 'react';
import { TURNSTILE_SITE_KEY as SITE_KEY } from './useTurnstile';

/**
 * Cloudflare Turnstile spam check. Renders nothing unless
 * VITE_TURNSTILE_SITE_KEY is set, so local dev and preview builds work
 * without keys. The server verifies the token when TURNSTILE_SECRET_KEY is set.
 */
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

interface TurnstileApi {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
}
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<void> | null = null;
const loadScript = () =>
  (scriptPromise ??= new Promise<void>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = SCRIPT_SRC;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Turnstile failed to load'));
    document.head.appendChild(s);
  }));

export const TurnstileWidget = ({ onToken }: { onToken: (token?: string) => void }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!SITE_KEY || !container.current) return;
    let widgetId: string | undefined;
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !container.current || !window.turnstile) return;
        widgetId = window.turnstile.render(container.current, {
          sitekey: SITE_KEY,
          callback: (t: string) => onToken(t),
          'expired-callback': () => onToken(undefined),
          'error-callback': () => onToken(undefined),
        });
      })
      .catch(() => onToken(undefined));
    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [onToken]);

  if (!SITE_KEY) return null;
  return <div ref={container} className="min-h-[65px]" />;
};
