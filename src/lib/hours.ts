import { SHOP_INFO, type HoursEntry, type Weekday } from '../content/shop';

const WEEKDAY_INDEX: Record<string, Weekday> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** "17:30" → "5:30 PM" */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${suffix}`;
}

/** "8:00 AM – 5:30 PM" or "Closed" */
export function formatHours(entry: HoursEntry): string {
  return entry.open && entry.close
    ? `${formatTime(entry.open)} – ${formatTime(entry.close)}`
    : 'Closed';
}

/** Compact weekday summary for headers, e.g. "Mon–Fri: 8:00 AM – 5:30 PM" */
export function formatHoursShort(entry: HoursEntry): string {
  return `${entry.short}: ${formatHours(entry)}`;
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/**
 * Read the weekday and minutes-since-midnight in the shop's timezone directly
 * via Intl.formatToParts — never by formatting to a string and re-parsing it
 * into a Date (that idiom is locale/implementation dependent).
 */
export function zonedNow(date: Date, timeZone: string): { day: Weekday; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? '';
  return {
    day: WEEKDAY_INDEX[get('weekday')],
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  };
}

export type ShopPhase = 'open' | 'opening-later-today' | 'closed';

export interface ShopStatus {
  phase: ShopPhase;
  isOpen: boolean;
  /** "Open until 5:30 PM" | "Opens today at 8:00 AM" | "Opens Monday at 8:00 AM" */
  text: string;
  subtext: string;
}

const rangeFor = (hours: readonly HoursEntry[], day: Weekday) =>
  hours.find((h) => h.days.includes(day) && h.open && h.close);

/**
 * Pure status computation over the hours table. States:
 *   open                 — inside today's range
 *   opening-later-today  — before today's opening time
 *   closed               — after closing, or a closed day (next opening named)
 */
export function getShopStatus(
  date: Date,
  hours: readonly HoursEntry[] = SHOP_INFO.hours,
  timeZone: string = SHOP_INFO.timeZone,
): ShopStatus {
  const { day, minutes } = zonedNow(date, timeZone);
  const today = rangeFor(hours, day);

  if (today?.open && today.close) {
    const open = toMinutes(today.open);
    const close = toMinutes(today.close);
    if (minutes >= open && minutes < close) {
      return {
        phase: 'open',
        isOpen: true,
        text: `Open until ${formatTime(today.close)}`,
        subtext: 'Walk-ins & drop-offs welcome',
      };
    }
    if (minutes < open) {
      return {
        phase: 'opening-later-today',
        isOpen: false,
        text: `Opens today at ${formatTime(today.open)}`,
        subtext: 'Closed now',
      };
    }
  }

  for (let offset = 1; offset <= 7; offset++) {
    const next = ((day + offset) % 7) as Weekday;
    const range = rangeFor(hours, next);
    if (range?.open) {
      const when = offset === 1 ? 'tomorrow' : DAY_NAMES[next];
      return {
        phase: 'closed',
        isOpen: false,
        text: `Opens ${when} at ${formatTime(range.open)}`,
        subtext: today ? 'Closed for the day' : `Closed ${DAY_NAMES[day]}s`,
      };
    }
  }

  return { phase: 'closed', isOpen: false, text: 'Closed', subtext: 'Call for availability' };
}
