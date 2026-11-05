import { useEffect, useState } from 'react';
import { getShopStatus, type ShopStatus } from './hours';

const REFRESH_MS = 60_000;

/**
 * Live open/closed status, shared by Hero, MobileFloatingBar and
 * LocationAndHours. Recomputes every minute so the badge flips at opening and
 * closing time without a reload. Logic lives in `getShopStatus` (pure, tested).
 */
export function useShopStatus(): ShopStatus {
  const [status, setStatus] = useState(() => getShopStatus(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => {
      const next = getShopStatus(new Date());
      setStatus((prev) => (prev.text === next.text && prev.subtext === next.subtext ? prev : next));
    }, REFRESH_MS);
    return () => window.clearInterval(id);
  }, []);

  return status;
}
