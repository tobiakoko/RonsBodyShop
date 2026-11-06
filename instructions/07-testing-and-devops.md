# 07 — Testing & DevOps

Right-sized for a one-page marketing site. The redesign has **no tests, no ESLint, no CI, and no deployment config** beyond AI Studio's defaults. Add a thin, high-value safety net — not an enterprise test pyramid.

---

## 7.1 Testing (aim for ~10–15 tests total)

Stack: **Vitest + React Testing Library + jsdom** (the Vite-native choice; `01` lists the deps).

| Layer | Test | Why it earns its place |
|---|---|---|
| Unit | `validation.ts` — `estimateSchema`/`messageSchema` accept valid input, reject bad email/phone/year, require consent, catch honeypot. | The validation is the gate on every lead; a regression here silently lets junk (or nothing) through. |
| Unit | `useShopStatus` — given a fixed/mocked `Date`, returns correct open/closed for Mon 10am, Fri 6pm, Sat 11am, Sat 1pm, Sunday. | The redesign's hours logic has a real TZ bug (`04` SM-3); tests pin the correct behavior and prevent re-breaking. Mock the clock (`vi.setSystemTime`). |
| Component | Estimate wizard — advancing with empty required fields stays on the step and shows errors; valid input advances; final submit calls `submitLead` (mocked) and renders the returned reference; a rejected submit shows the error + phone fallback. | This is the money path. A test that **fails if the form stops submitting** is the whole point — it's the bug that shipped twice. |
| Component | Quick-message form — same submit/validation/error contract via `useLeadForm`. | Second lead path. |
| Component | Mobile menu — opens on click, closes on link click and on Escape, button has `aria-expanded`. | Guards the a11y fixes from `04` SM-4. |
| Component | Services — each service renders its correct icon; the exhaustive map has no fallback hit. | Guards `04` SM-5. |
| A11y (optional) | `vitest-axe` on the rendered `<App/>` — no critical violations. | Automates part of the WCAG pass (`08`). |

**Don't** write snapshot tests of whole components (brittle, low value) or chase coverage %. Test the logic and the two lead paths. That's the correct amount of safety net for this codebase.

Add one **Playwright** smoke test only if you iterate on the forms often: load page → fill estimate wizard → submit (network mocked) → see success. Catches "whole page blank" and "form regressed" in CI. Optional.

## 7.2 Linting & formatting

- **ESLint** (flat config): `@eslint/js` recommended + `typescript-eslint` recommended + `eslint-plugin-react-hooks` + **`eslint-plugin-jsx-a11y`** (accessibility — matters here). Base it on the *original* repo's `eslint.config.js` (a solid flat-config starting point) and add `jsx-a11y`. The redesign has **no ESLint at all**.
- **Prettier** — add `.prettierrc`; wire `format` script. Run once across the repo after the token refactor.
- Enable `noUnusedLocals`/`noUnusedParameters` in tsconfig (`01`) to catch the dead imports (`Clock`, etc.).

## 7.3 CI — GitHub Actions

`.github/workflows/ci.yml` — run on PR and push to `main`:
```yaml
name: CI
on: [push, pull_request]
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run typecheck      # tsc --noEmit
      - run: npm run lint           # eslint
      - run: npm run test           # vitest run
      - run: npm run build          # vite build must succeed
```
Block merge on failure (branch protection on `main`). This is the guard the repo currently lacks — it's what would have caught "build ships with type errors" and "form logic broke."

Optionally add **Lighthouse CI** (`treosh/lighthouse-ci-action`) with the budgets from `06` §6.6 so performance/a11y can't regress.

Enable **Dependabot** or **Renovate** for weekly dependency PRs (keeps the stack current without manual tracking).

## 7.4 Deployment — Vercel

The site is already a Vercel deploy (analytics + the Arko link in the original imply it). Keep:
- **Preview deployments per PR** (Vercel default) — eyeball each change on a real URL.
- **Promote to production on merge to `main`.**
- The serverless function (`api/lead.ts`, `05`) deploys automatically with the project — Vercel detects `/api`.

### `vercel.json` (add — the redesign has none)
```jsonc
{
  "cleanUrls": true,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'; img-src 'self' data:; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self'; connect-src 'self' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; frame-ancestors 'none'" }
      ]
    },
    {
      "source": "/media/(.*)",
      "headers": [ { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" } ]
    }
  ]
}
```
Tune the CSP once you know the final font strategy (self-hosted fonts → drop the Google hosts) and whether Turnstile is used (keeps the `challenges.cloudflare.com` entries). If you add Vercel Analytics, add its host to `script-src`/`connect-src`.

## 7.5 Environment & secrets

- Email key + Turnstile secret → **Vercel Environment Variables** (Production + Preview), **never** `VITE_`-prefixed (that inlines them into client JS = public). Only the Turnstile **site** key is `VITE_` (it's public by design).
- Commit `.env.example` (`05` §5.7), never `.env.local`.

## 7.6 Summary

1. Vitest + RTL; ~10–15 tests focused on validation, the two lead paths, `useShopStatus`, menu a11y, service icons.
2. Add ESLint (+ jsx-a11y) and Prettier; the redesign has neither.
3. GitHub Actions CI: typecheck → lint → test → build, blocking merge.
4. `vercel.json` with security headers + asset caching.
5. Secrets server-side only; `.env.example` committed.
6. Dependabot/Renovate + optional Lighthouse CI.
