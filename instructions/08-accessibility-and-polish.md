# 08 — Accessibility & Final Polish

The last pass before launch. The redesign is more accessible than the original (conditionally-rendered mobile menu, decent alt text, semantic sections), but several gaps remain. Plus the customer-trust and copy fixes.

---

## 8.1 Accessibility

### Forms
- **Associate errors with inputs.** When Zod validation (`05`) produces a field error, render it with `aria-invalid={true}` on the input and `aria-describedby` pointing at the error element. The redesign's forms have no error display at all yet — build it in with these attributes from the start.
- **Announce submit outcome.** Wrap the success/error banner in `aria-live="polite"` so screen-reader users hear "Message dispatched" / "Something went wrong."
- **Consent checkbox** on the estimate form (also a legal item — `05`): add it with a proper `<label>`.
- **Labels:** the redesign uses `<label>` elements but verify every input has a programmatic association (`htmlFor`/`id`). Several use placeholder text as the only hint — placeholders aren't labels.

### Mobile menu (`04` SM-4)
- `aria-expanded` on the toggle, `aria-controls` pointing at the drawer.
- Escape-to-close, body scroll-lock while open.
- Already conditionally rendered (good — not tabbable when closed).

### Motion & the hero
- The redesign uses `animate-in fade-in` utilities and hover `scale` transforms. **Respect `prefers-reduced-motion`:** gate non-essential animation behind `motion-safe:` Tailwind variants (or a media query) so users who request reduced motion don't get movement. The original shipped an autoplaying hero *video* with no reduced-motion handling — the redesign uses a static hero image instead (better), but still apply reduced-motion to transitions.

### Color contrast
- Check the amber `#E7A622` text on light backgrounds and the `slate-400`/`slate-500` greys on navy — some pairings are likely below WCAG AA 4.5:1 for small text. Run axe/Lighthouse and darken where needed. Amber-on-navy (the main accent pairing) should pass; amber-on-cream for small text may not.

### Semantics & structure
- Exactly one `<h1>` (Hero's "Precision Auto Body…") — verify no other `<h1>`. Heading levels shouldn't skip.
- Decorative icons (the `✓`, star fills, icon glyphs that repeat adjacent text) should be `aria-hidden="true"`.
- The `<a href="#">` logo link in Navbar should go to `#` top or `/` — fine, but ensure skip-to-content exists for keyboard users (add a visually-hidden "Skip to main content" link as the first focusable element).
- Google Maps link and phone/email links are correct (`tel:`, `mailto:`, `target="_blank" rel="noopener noreferrer"` on external). Keep.

### Tooling
- `eslint-plugin-jsx-a11y` (`07`) catches many of these at lint time.
- Run **axe DevTools** + **Lighthouse Accessibility** (target ≥ 95) before launch.

## 8.2 Customer-trust & copy fixes

These came up in the audit and apply to the redesign's content:

- **Founding year inconsistency.** The redesign's Navbar says "Est. 1980"; the original's schema said "1982." **Confirm the real year with the owner** and use it in exactly one place (`SHOP_INFO`) that the nav, hero, and JSON-LD all read. Don't ship two different founding years.
- **Review authenticity.** `REAL_REVIEWS` uses generic author names ("Local South Bay Driver," "Torrance Car Owner"). If these are paraphrased real Google reviews, that's fine; if invented, either source real ones or label them honestly. The "4.7 ★ (85+ reviews)" claim should match the actual Google Business Profile — verify the numbers are real before publishing (misrepresenting ratings is a trust and potentially legal issue).
- **Insurance partner claims.** `INSURANCE_PARTNERS` lists 10 carriers with specific descriptors ("Direct Billing," "Digital Supplements"). Confirm the shop actually has these relationships — claiming a direct-billing relationship that doesn't exist is a problem. If it's "we work with all major insurers," soften the per-carrier specificity.
- **"I-CAR trained"** appears in service copy. Confirm current certification. (The original claimed "I-CAR certified"; verify the exact, true status.)
- **Phone/email consistency** — already good in the redesign (single `SHOP_INFO`); just confirm the real values with the owner one final time (the original had three conflicting numbers, so this is worth a direct confirmation).
- **Estimate wizard defaults** — it pre-fills `vehicleMake: 'Mercedes-Benz'`, `vehicleYear: '2021'`, `insuranceCarrier: 'AAA Auto Club'`. These pre-selected defaults can produce wrong data if a user skips a field. Default to empty/placeholder so the customer actively chooses. Minor but affects data quality.

## 8.3 Final pre-launch checklist

**Correctness**
- [ ] Submit the estimate wizard end-to-end on production — confirm the shop **receives the email**.
- [ ] Submit the quick-message form — confirm receipt.
- [ ] Every `tel:` link dials `(310) 618-8791`; every `mailto:` opens `ronsbodyshop@sbcglobal.net`.
- [ ] The live "Open/Closed" badge is correct at several real times of day (test the TZ fix).
- [ ] Founding year, rating, review count, hours, address match reality in all locations.

**Performance**
- [ ] Hero image optimized + preloaded; LCP < 2.5s on throttled mobile (Lighthouse).
- [ ] No unused photos shipped; `.aistudio/` deleted.
- [ ] CLS < 0.1 (all images have width/height).
- [ ] Lighthouse Performance ≥ 90.

**Quality**
- [ ] No hardcoded `[#hex]` left (`grep -rn "\[#" src/` returns nothing).
- [ ] `tsc --noEmit`, `eslint`, `vitest`, `vite build` all green in CI.
- [ ] No unused deps (`@google/genai`, `express`, etc. removed).
- [ ] `vercel.json` headers live; CSP doesn't block fonts/analytics/Turnstile.
- [ ] Secrets server-side only; `.env.example` committed, `.env.local` ignored.

**SEO & a11y**
- [ ] Rich meta + `AutoBodyShop` JSON-LD in `index.html`, data from `SHOP_INFO`.
- [ ] Favicon/PWA icon set present; manifest `theme_color` = brand navy.
- [ ] Lighthouse Accessibility ≥ 95; axe shows no critical violations.
- [ ] `prefers-reduced-motion` respected.

**Docs**
- [ ] README rewritten to match the real project (not the AI Studio boilerplate).
- [ ] This `instructions/` folder committed to the repo for the next maintainer.

## 8.4 After launch — scaling (only if the business asks)

Smallest-leap-first, same as the audit's guidance — don't pre-build any of these:
1. **Lead storage + alerting** — persist submissions (Vercel Postgres/Supabase) and/or SMS the owner (Twilio) so a failed email never loses a lead.
2. **Content editing for the owner** — a lightweight CMS (TinaCMS/Decap/Sanity) if they want to edit services/hours/reviews without a dev.
3. **Real photo-first estimates** — wire up uploads (`05` §5.6 v2) if photo estimates become a real workflow.
4. **Online booking** — a "schedule a drop-off" flow (Cal.com embed) is the highest-value *product* addition for a body shop.
5. **Multi-page + Next.js** — only if it grows into separate Services/Blog/Location pages for SEO. The current static + prerendered-meta approach is sufficient for one page; migrating now would be over-engineering.
6. **i18n** (Spanish/Korean/Japanese) — Torrance is multilingual; add `react-i18next` only if the owner wants it.

---

That's the full build. Work the phases in `00`'s checklist order, keep each commit green, and keep returning to the one principle: **make the lead capture real, keep it clean, and don't over-engineer a one-page site.**
