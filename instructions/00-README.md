# Ron's Body Shop — Build Instructions

**Purpose of this folder.** These documents are the authoritative spec for building the production Ron's Body Shop website. They take the **AI Studio redesign** (the uploaded zip) as the visual/structural blueprint, correct it against the **audit** and **state-machine** findings from the original repo, and lay out exactly how to assemble a clean, correct, deployable codebase — without over-engineering a single-page marketing site.

**Who this is for.** A developer or an AI coding agent implementing the site. Read `00` → `08` in order the first time. After that, each file is a standalone reference for its area.

---

## The situation in one paragraph

There are **two** codebases. The **original** (`github.com/tobiakoko/RonsBodyShop`) is a small Vite/React site whose contact form silently discards leads, ships a dead duplicate form, hotlinks expiring Google images, and has inconsistent business data. The **redesign** (the AI Studio zip) is a much stronger site — real sections (Hero, Services, How It Works, Insurance, Reviews, 4-step Estimate wizard, Location/Hours), a clean single-source-of-truth data layer, consistent branding, mobile-first UX. **But the redesign inherits the original's fatal flaw: every form is still a mock** (it fakes success and sends nothing), ships ~56 MB of unoptimized photos, and carries unused AI/server dependencies. The job is to take the redesign's structure and design, fix what it still gets wrong, and ship it.

**The guiding principle, repeated throughout:** this is a one-page lead-generation site for a local body shop. Build it clean and correct, but **resist over-engineering.** No state-machine libraries, no micro-frontends, no premature backend. The single most important outcome is: *a customer fills out the form and the shop actually receives it.*

---

## Decision already made: start from the redesign

Build on the **redesign** codebase, not the original. The redesign is structurally and visually far ahead; the original's only advantages (the `ContactForm.tsx` validation logic, the SEO/schema metadata in `index.html`) are things we port *into* the redesign. Specifically, carry these forward from the original:

- The **validation + consent-checkbox + error-UI pattern** from the original's `ContactForm.tsx` (the redesign's forms have no validation).
- The **SEO metadata and `AutoBodyShop` schema.org JSON-LD** from the original's `index.html` (the redesign's `index.html` is thin — see `05`).
- The **favicon/manifest/PWA icon set** from the original's `public/` (the redesign only has a logo).

Everything else comes from the redesign.

---

## The files in this folder

| File | What it covers | Read when |
|---|---|---|
| `00-README.md` | This overview + the build-order checklist below. | First. |
| `01-project-setup.md` | Stack, dependencies (what to keep/remove/add/pin), config files, scripts, folder structure. | Before writing any code. |
| `02-architecture-and-conventions.md` | Component conventions, prop patterns, data layer, the single-source-of-truth rule, file naming. | Before building components. |
| `03-design-system.md` | Colors, fonts, the token system, spacing/layout rules, how to kill hardcoded hex. | While building any UI. |
| `04-state-machines.md` | Every stateful piece spec'd as an explicit machine: estimate wizard, forms, menus, live-hours status. **The core correctness doc.** | While building interactive parts. |
| `05-contact-estimate-backend.md` | The #1 fix: making forms actually submit. Transport, validation, serverless function, spam protection, SEO metadata port. | When wiring forms (do this early, it's the point of the site). |
| `06-assets-and-performance.md` | The 56 MB image problem, optimization pipeline, LCP, Core Web Vitals, logo/favicon. | During the assets pass. |
| `07-testing-and-devops.md` | Right-sized test suite, CI, Vercel config, security headers, env hygiene. | Before first deploy. |
| `08-accessibility-and-polish.md` | A11y pass, reduced-motion, focus management, copy/trust fixes, final checklist. | Before launch. |

---

## Build-order checklist (do these in order)

Each box is a self-contained, reviewable commit/PR. Don't batch; keep each green (`npm run build` + `tsc --noEmit` pass).

**Phase A — Foundation**
- [ ] A1. Copy the redesign into a fresh repo working tree; `git init`; baseline commit. (`01`)
- [ ] A2. Clean `package.json`: remove unused deps (`@google/genai`, `express`, `dotenv`, `tsx`, `esbuild`, `autoprefixer`), pin the rest, add `zod` + ESLint + Prettier. (`01`)
- [ ] A3. Add real config: ESLint, Prettier, `.env.example`, align `tsconfig`. (`01`, `07`)
- [ ] A4. Establish the folder structure (`components/{layout,sections,ui}`, `content/`, `lib/`). (`01`, `02`)

**Phase B — Correctness (the point of the site)**
- [ ] B1. Wire the **Estimate wizard** and **all forms** to a real transport (serverless function + Resend/Formspree) with Zod validation on both sides + honeypot. (`05`)
- [ ] B2. Refactor the 4 implicit state machines to explicit ones (wizard, submit status, live-hours, mobile menu). (`04`)
- [ ] B3. De-duplicate the live-hours status machine (it's copy-pasted in 3 files → one `useShopStatus` hook) and fix its timezone/staleness bugs. (`04`)

**Phase C — Quality**
- [ ] C1. Design-token pass: move all `bg-[#...]` hardcoded hex to semantic Tailwind tokens. (`03`)
- [ ] C2. Asset pass: optimize the 56 MB of photos → responsive WebP/AVIF; fix the LCP image; logo. (`06`)
- [ ] C3. SEO/metadata port: real `<title>`, meta, Open Graph, `AutoBodyShop` JSON-LD from the single data source. (`05`)
- [ ] C4. Accessibility pass + reduced-motion + focus management. (`08`)

**Phase D — Ship**
- [ ] D1. Tests (Zod schema, form submit, wizard navigation, hours status). (`07`)
- [ ] D2. CI (GitHub Actions: typecheck, lint, test, build) + `vercel.json` (headers, caching). (`07`)
- [ ] D3. Final launch checklist + copy/trust review. (`08`)

Phases B and C can overlap, but **B1 is the highest priority single task in the whole project** — until it's done, the site doesn't do its job.

---

## Non-negotiables (the things that must be true at launch)

1. **A real lead submitted through any form reaches the shop** (email or dashboard). No mocks in production.
2. **One source of truth for business data** — name, phone, email, address, hours — already exists in the redesign (`src/data/shopData.ts`); keep it that way and let `index.html` schema read from it.
3. **The phone number dials the real number everywhere.** (The original had three different numbers; the redesign is consistent — don't regress.)
4. **No secret keys in client code.** The email-provider key lives only in the serverless function's server-side env (never `VITE_`-prefixed).
5. **Hero image LCP < 2.5s on mobile.** The 5.7 MB hero photo must be optimized before launch.
6. **Consent + privacy** on any form collecting phone/email (CCPA — the shop is in California).

If you're ever unsure whether to add complexity, re-read the guiding principle: *build it clean, resist over-engineering.*
