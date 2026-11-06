# Ron's Body Shop

One-page lead-generation site for Ron's Body Shop, a collision repair and auto body shop at 1324 Cabrillo Ave, Torrance, CA. Customers can request an estimate (a 4-step wizard) or send a quick message. Both reach the shop by email.

**Stack:** Vite 8 · React 19 · TypeScript 6 · Tailwind CSS 4 · Zod · Resend · Vercel (static site + one serverless function).

The full build spec lives in [`instructions/`](instructions/). Start with `00-README.md`.

## Getting started

```bash
npm install
npm run dev          # http://localhost:5173 (forms need the API; see below)
```

| Script                    | What it does                                            |
| ------------------------- | ------------------------------------------------------- |
| `npm run build`           | Typecheck, build to `dist/`, then prerender the HTML    |
| `npm run typecheck`       | `tsc --noEmit`                                          |
| `npm run lint`            | ESLint (TypeScript, React Hooks, jsx-a11y)              |
| `npm test`                | Vitest + Testing Library                                |
| `npm run format`          | Prettier                                                |
| `npm run optimize-images` | Regenerate `public/media/` from raw photos (see Images) |

To test the forms locally against the real function, run `vercel dev` with a `.env.local` (copy `.env.example`).

## How lead capture works

```
EstimateCalculator / LocationAndHours
   └─ lib/submitLead.ts  ── POST /api/lead ──▶  api/lead.ts (Vercel Function)
                                                 ├─ honeypot check
                                                 ├─ Zod validation (same schemas as the client: lib/validation.ts)
                                                 ├─ Cloudflare Turnstile verify (if TURNSTILE_SECRET_KEY is set)
                                                 └─ Resend → ronsbodyshop@sbcglobal.net
   ◀── { reference: "RBS-123456" } ── shown to the customer and included in the shop's email
```

If a submit fails, the form shows the shop phone number so the lead is never lost silently.

### Environment variables (Vercel → Project → Settings → Environment Variables)

| Name                      | Where                       | Required                                             |
| ------------------------- | --------------------------- | ---------------------------------------------------- |
| `RESEND_API_KEY`          | Server only (never `VITE_`) | **Yes**: forms return an error without it            |
| `LEAD_FROM_EMAIL`         | Server only                 | Recommended: a sender on your verified Resend domain |
| `TURNSTILE_SECRET_KEY`    | Server only                 | Optional: when set, a Turnstile token is required    |
| `VITE_TURNSTILE_SITE_KEY` | Client (public by design)   | Set together with the secret                         |

## Project structure

```
api/lead.ts                 serverless function (the only backend)
src/
  components/
    layout/                 Navbar, Footer, MobileFloatingBar
    sections/               page body, in render order
    ui/                     FormField, ResponsiveImage, SubmitErrorNotice, Turnstile
  content/                  pure data: shop.ts (SHOP_INFO, the single source of truth),
                            services.ts, media.ts (generated)
  lib/                      logic: validation, submitLead, estimateWizard (reducer),
                            useLeadForm, hours + useShopStatus, structuredData
  styles/index.css          Tailwind @theme brand tokens
scripts/optimize-images.mjs
instructions/               build spec
```

### Conventions

- **Business data lives only in `src/content/shop.ts`.** Phone, address, hours, rating, and founding year are all read from `SHOP_INFO`. That includes the live open/closed badge and the schema.org JSON-LD, which `vite.config.ts` injects into `index.html` at build time. Change the hours in one place and everything follows.
- **Colors use brand tokens** (`bg-vnavy`, `text-vamber`, …) from `@theme`. Never use arbitrary hex.
- State machines are explicit (`useReducer` + discriminated unions). See `instructions/04-state-machines.md`.
- **The page is prerendered.** `npm run build` renders `<App/>` to static HTML (`src/entry-server.tsx` → `scripts/prerender.mjs`) and the browser hydrates it. Keep render output deterministic: anything time- or browser-dependent belongs in an effect or behind `useSyncExternalStore` with a server snapshot (see `useShopStatus`). `prerender.test.tsx` fails on any hydration mismatch.
- Fonts are self-hosted (`@fontsource-variable/*`), so the CSP allows fonts from `'self'` only.

## Images

Raw phone photos (~5–6 MB each) are **not** committed. To add or replace a photo, put the raw JPEGs in a folder, list them in `JOBS` inside `scripts/optimize-images.mjs`, then run:

```bash
npm run optimize-images -- "/path/to/raw/photos"
```

This writes AVIF/WebP variants to `public/media/` and their sizes to `src/content/media.ts`. Commit both.

## Deploy

Pushing to `main` deploys to production on Vercel, and pull requests get preview URLs. CI (`.github/workflows/ci.yml`) runs typecheck → lint → test → build. `vercel.json` sets the security headers (including the CSP) and long-lived caching for `/media` and `/assets`.

---

© Ron's Body Shop. All rights reserved.
