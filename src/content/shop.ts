/**
 * Verified business information for Ron's Body Shop — the single source of
 * truth. Components, the live open/closed hook, the serverless function and
 * the JSON-LD in index.html (generated at build time) all read from here.
 *
 * Pure data — no logic, no React.
 */

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday

export interface HoursEntry {
  /** Display label, e.g. "Monday – Friday". */
  label: string;
  /** Compact label, e.g. "Mon–Fri". */
  short: string;
  days: Weekday[];
  /** 24h "HH:MM" in shop local time. Omit both for a closed day. */
  open?: string;
  close?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  source: string;
  text: string;
  detail: string;
}

const HOURS: HoursEntry[] = [
  {
    label: 'Monday – Friday',
    short: 'Mon–Fri',
    days: [1, 2, 3, 4, 5],
    open: '08:00',
    close: '17:30',
  },
  { label: 'Saturday', short: 'Sat', days: [6], open: '08:00', close: '12:00' },
  { label: 'Sunday', short: 'Sun', days: [0] },
];

export const SHOP_INFO = {
  name: "Ron's Body Shop",
  tagline: 'Where Satisfaction is a Tradition',
  url: 'https://ronsbodyshop.net',
  address: '1324 Cabrillo Ave',
  city: 'Torrance',
  state: 'CA',
  zip: '90501',
  fullAddress: '1324 Cabrillo Ave, Torrance, CA 90501',
  geo: { latitude: 33.8358, longitude: -118.3406 },
  phone: '(310) 618-8791',
  phoneRaw: '3106188791',
  phoneE164: '+13106188791',
  email: 'ronsbodyshop@sbcglobal.net',
  // TODO(owner): confirm the real founding year. The redesign said 1980, the
  // original site's schema said 1982. Everything reads this one value.
  foundedYear: 1980,
  experienceYears: '40+',
  // TODO(owner): confirm against the live Google Business Profile before launch.
  rating: '4.7',
  reviewCount: '85+',
  timeZone: 'America/Los_Angeles',
  hours: HOURS,
  mapUrl: "https://maps.google.com/?q=Ron's+Body+Shop+1324+Cabrillo+Ave+Torrance+CA+90501",
} as const;

export const REAL_REVIEWS: ReviewItem[] = [
  {
    id: '1',
    author: 'Local South Bay Driver',
    rating: 5,
    source: 'Google Review',
    text: 'Ron and his team did an outstanding job on my car after an accident. The paint matching is seamless and the panels align perfectly. Honest, straightforward estimate with no surprises.',
    detail: 'Collision & Paint Repair',
  },
  {
    id: '2',
    author: 'Torrance Car Owner',
    rating: 5,
    source: 'Google Review',
    text: 'I’ve been bringing cars to Ron’s Body Shop for years. You can tell they take pride in what they do the moment you walk into the shop. They dealt directly with the insurance company and made the entire process painless.',
    detail: 'Insurance Claim & Body Work',
  },
  {
    id: '3',
    author: 'Classic Vehicle Enthusiast',
    rating: 5,
    source: 'Google Review',
    text: 'Finding a shop that understands classic metalwork and modern precision at the same time is rare. Ron’s team has real craftsmanship. The car looks as good as the day it rolled off the assembly line.',
    detail: 'Restoration & Metalwork',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Get Your Estimate',
    desc: `Call ${SHOP_INFO.phone}, bring your car to ${SHOP_INFO.address}, or request a free estimate online.`,
  },
  {
    step: '02',
    title: 'We Handle The Insurance',
    desc: 'Under CA law, you choose your repair shop. We coordinate directly with your adjuster to approve proper repairs.',
  },
  {
    step: '03',
    title: 'Drive Away Restored',
    desc: 'Our technicians repair, align, and paint your vehicle to factory standard, keeping you updated every step.',
  },
];

// TODO(owner): confirm each carrier relationship/descriptor is accurate before launch (see 08 §8.2).
export const INSURANCE_PARTNERS = [
  { name: 'AAA Auto Club', desc: 'Approved & Coordinated' },
  { name: 'State Farm', desc: 'Direct Claim Handling' },
  { name: 'Farmers Insurance', desc: 'Digital Supplements' },
  { name: 'Geico', desc: 'Adjuster Interfacing' },
  { name: 'Allstate', desc: 'Seamless Claims' },
  { name: 'Progressive', desc: 'Expedited Approvals' },
  { name: 'Mercury Insurance', desc: 'Direct Coordination' },
  { name: 'USAA', desc: 'Dedicated Service' },
  { name: 'Liberty Mutual', desc: 'Direct Billing' },
  { name: 'Travelers', desc: 'Full Coverage' },
];
