import { act, renderHook } from '@testing-library/react';
import { formatTime, getShopStatus } from './hours';
import { useShopStatus } from './useShopStatus';

// June 2026 → Pacific Daylight Time (UTC−7). 2026-06-08 is a Monday.
const pt = (isoLocal: string) => new Date(`${isoLocal}-07:00`);

describe('formatTime', () => {
  it('formats 24h to 12h', () => {
    expect(formatTime('08:00')).toBe('8:00 AM');
    expect(formatTime('12:00')).toBe('12:00 PM');
    expect(formatTime('17:30')).toBe('5:30 PM');
    expect(formatTime('00:15')).toBe('12:15 AM');
  });
});

describe('getShopStatus (Pacific Time, driven by SHOP_INFO.hours)', () => {
  it.each([
    ['Mon 10:00', '2026-06-08T10:00', true, 'Open until 5:30 PM'],
    ['Mon 07:30', '2026-06-08T07:30', false, 'Opens today at 8:00 AM'],
    ['Mon 17:29', '2026-06-08T17:29', true, 'Open until 5:30 PM'],
    ['Mon 17:30', '2026-06-08T17:30', false, 'Opens tomorrow at 8:00 AM'],
    ['Fri 18:00', '2026-06-12T18:00', false, 'Opens tomorrow at 8:00 AM'],
    ['Sat 11:00', '2026-06-13T11:00', true, 'Open until 12:00 PM'],
    ['Sat 13:00', '2026-06-13T13:00', false, 'Opens Monday at 8:00 AM'],
    ['Sun 12:00', '2026-06-14T12:00', false, 'Opens tomorrow at 8:00 AM'],
  ])('%s', (_label, local, isOpen, text) => {
    const status = getShopStatus(pt(local));
    expect(status.isOpen).toBe(isOpen);
    expect(status.text).toBe(text);
  });

  it('uses the shop timezone, not the visitor’s', () => {
    // 01:00 UTC Tuesday = 18:00 PT Monday → closed, even though it is "Tuesday" in UTC.
    expect(getShopStatus(new Date('2026-06-09T01:00:00Z')).text).toBe('Opens tomorrow at 8:00 AM');
  });

  it('handles standard time (PST, UTC−8) too', () => {
    // 2026-11-09 is a Monday; 16:30Z = 08:30 PST
    expect(getShopStatus(new Date('2026-11-09T16:30:00Z')).isOpen).toBe(true);
  });

  it('labels Sunday as a closed day', () => {
    expect(getShopStatus(pt('2026-06-14T12:00')).subtext).toBe('Closed Sundays');
  });
});

describe('useShopStatus', () => {
  afterEach(() => vi.useRealTimers());

  it('updates live when the shop closes', () => {
    vi.useFakeTimers();
    vi.setSystemTime(pt('2026-06-08T17:29'));
    const { result } = renderHook(() => useShopStatus());
    expect(result.current.isOpen).toBe(true);

    act(() => {
      vi.setSystemTime(pt('2026-06-08T17:31'));
      vi.advanceTimersByTime(60_000);
    });
    expect(result.current.isOpen).toBe(false);
  });
});
