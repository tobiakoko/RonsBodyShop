import { useSyncExternalStore } from 'react';
import { SHOP_INFO } from '../content/shop';
import { formatHoursShort, getShopStatus, type ShopStatus } from './hours';

const REFRESH_MS = 60_000;

/**
 * Rendered into the prerendered HTML (and during hydration), where the real
 * time is unknown. Shows the weekday hours instead of guessing open/closed;
 * React swaps in the live status right after hydrating, without a mismatch.
 */
export const UNKNOWN_STATUS: ShopStatus = {
  phase: 'unknown',
  isOpen: false,
  text: formatHoursShort(SHOP_INFO.hours[0]),
  subtext: '',
};

// One shared clock for every consumer (Hero, MobileFloatingBar, LocationAndHours).
let current: ShopStatus | null = null;
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;

function refresh() {
  const next = getShopStatus(new Date());
  if (current && current.text === next.text && current.subtext === next.subtext) return;
  current = next;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) timer = setInterval(refresh, REFRESH_MS);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      clearInterval(timer);
      current = null; // recompute fresh on the next subscription
    }
  };
}

function getSnapshot(): ShopStatus {
  if (!current) current = getShopStatus(new Date());
  return current;
}

const getServerSnapshot = () => UNKNOWN_STATUS;

/**
 * Live open/closed status. Recomputes every minute so the badge flips at
 * opening and closing time without a reload. Logic lives in `getShopStatus`
 * (pure, tested). Returns `UNKNOWN_STATUS` during prerender/hydration.
 */
export function useShopStatus(): ShopStatus {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
