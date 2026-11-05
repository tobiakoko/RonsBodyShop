# 01 — Project Setup

How to stand up the codebase: stack, dependencies, config, scripts, and the target folder structure. Everything here is Phase A of the checklist.

---

## 1.1 The stack (what the redesign is, and what we keep)

The redesign is **Vite 8 + React 19 + TypeScript 7 + Tailwind CSS 4**, with `lucide-react` for icons and `motion` for animation. That's a good, modern stack for this site. Keep it. Two caveats to decide on:

- **TypeScript 7** (the native Go compiler) is what the redesign declares (`^7.0.2`). It's fast but new. For a site you'll hand to a client, **TS 7 is fine** since the build is just `tsc --noEmit` type-checking — but if you hit tooling friction (editor plugins, CI images), pinning to **TS 6.x** (stable since Aug 2025) is a safe, boring fallback. No feature here needs TS 7.
- **Vite 8** (Dec 2025) is current. Keep it. If CI images lag, Vite 7 is the fallback.

## 1.2 Dependencies: remove, keep, add, pin

The redesign's `package.json` carries **AI Studio scaffolding that this site does not use.** Removing it is the first cleanup and shrinks the install significantly.

### Remove (unused — verified: no imports anywhere in `src/`)
| Package | Why it's there | Why remove |
|---|---|---|
| `@google/genai` | AI Studio default | **No Gemini call exists anywhere.** The estimate form generates a random ticket client-side, not via AI. Dead. |
| `express` | AI Studio server scaffold | No `server.js`, no server file exists. The site is static. Dead. |
| `dotenv` | pairs with express | Only needed by the (nonexistent) server. Vite handles env itself. Dead. |
| `tsx` | runs the (nonexistent) server | Dead. |
| `esbuild` (devDep) | transitive, pinned by AI Studio | Vite already bundles esbuild; an explicit top-level pin is unnecessary and can cause version conflicts. Remove unless something breaks. |
| `autoprefixer` (devDep) | PostCSS prefixing | **Tailwind v4 handles vendor prefixing itself** and doesn't use a PostCSS pipeline the way v3 did. Unused here. Remove. |
| `@types/express` (devDep) | types for express | Dead with express. |

> If you ever *do* add a Node backend for the contact form instead of a serverless function (see `05`), you'd re-add `express`/`dotenv`. The recommendation in `05` is a Vercel serverless function, which needs none of these.

### Keep (and why)
`react`, `react-dom`, `@tailwindcss/vite`, `tailwindcss`, `vite`, `@vitejs/plugin-react`, `lucide-react` (the one icon library — good, don't add a second), `motion` (animation — keep if you use it; see note), `typescript`, `@types/node`, `@types/react`, `@types/react-dom`.

> **`motion`**: verify it's actually used before keeping. Grep: `grep -rn "from 'motion'\|from \"motion\"" src/`. The components reviewed use Tailwind's `animate-in fade-in` utility classes, not `motion`, so `motion` may itself be unused — if grep comes back empty, **remove it too** (it's a large dependency). Only keep it if you add real motion-based animation.

### Add
| Package | Why |
|---|---|
| `zod` | Schema validation shared by client forms and the serverless function (`05`). The redesign has **zero validation** beyond HTML `required`. |
| `eslint`, `typescript-eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`, `globals` (devDeps) | The redesign has **no ESLint at all** (`lint` is just `tsc --noEmit`). Add real linting; `jsx-a11y` matters given the accessibility goals. |
| `prettier` (devDep) | No formatter configured. Add for consistency. |
| `resend` (if using the recommended email transport) | Server-side only; see `05`. |
| `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom` (devDeps) | Test suite (`07`). |

### Pin strategy
Use caret (`^`) ranges within current majors for libraries (React, Tailwind, lucide). **Pin exact** for the build-critical trio if CI reproducibility matters (Vite, TypeScript, @vitejs/plugin-react) — a surprise minor bump in the bundler shouldn't break a client deploy. Commit `package-lock.json`.

## 1.3 Scripts

Replace the redesign's scripts (which reference the dead server/clean targets) with:
```jsonc
{
  "dev": "vite",
  "build": "tsc --noEmit && vite build",   // typecheck gates the build
  "preview": "vite preview",
  "lint": "eslint .",
  "typecheck": "tsc --noEmit",
  "format": "prettier --write .",
  "test": "vitest run",
  "test:watch": "vitest"
}
```
Note `build` runs `tsc --noEmit` first — the redesign's `build` was just `vite build` with no typecheck gate, so type errors could ship. Gate them.

## 1.4 Config files

- **`vite.config.ts`** — the redesign's is fine (React + Tailwind plugins, `@` alias). **Remove the AI-Studio HMR-disabling block** (the `DISABLE_HMR` logic and the comment telling you not to touch it) — that's an AI Studio artifact; you want normal HMR locally.
- **`tsconfig.json`** — the redesign's works. Consider adding `"noUnusedLocals": true` and `"noUnusedParameters": true` (the original had these; they catch dead code — e.g. the unused `Clock` import in `MobileFloatingBar`). Keep `strict: true`.
- **`.gitignore`** — the redesign's covers `node_modules`, `dist`, `.env*`. Good. Confirm `.env.local` is ignored and `.env.example` is committed.
- **`.env.example`** — rewrite it (the redesign's references `GEMINI_API_KEY`/`APP_URL` which we don't use). New contents in `05`.
- **Add `.eslintrc`/`eslint.config.js`** — flat config, TS + react-hooks + jsx-a11y. (Base it on the original repo's `eslint.config.js`, which is a good flat-config starting point, plus `jsx-a11y`.)
- **Add `.prettierrc`** — minimal; whatever house style you use across the freelance templates.
- **Add `vercel.json`** — headers + caching; see `07`.

## 1.5 Target folder structure

The redesign is currently flat: everything in `src/components/*.tsx` with `src/data/shopData.ts`. For ~12 components that's borderline acceptable, but a light grouping makes intent obvious and matches the audit's recommendation. Target:

```
src/
  components/
    layout/            # persistent chrome
      Navbar.tsx
      Footer.tsx
      MobileFloatingBar.tsx
    sections/          # the page body, in render order
      Hero.tsx
      HowItWorks.tsx
      Services.tsx
      AboutShop.tsx
      InsuranceAdvocacy.tsx
      ReviewsAndTrust.tsx
      EstimateCalculator.tsx
      LocationAndHours.tsx
    ui/                # shared primitives that emerge during refactor
      ContactForm.tsx  # the extracted, validated form (from 05)
  content/             # pure data, no logic  (rename from data/)
    shop.ts            # SHOP_INFO  (was shopData.ts — keep as one file or split)
    services.ts        # CORE_SERVICES
    reviews.ts         # REAL_REVIEWS
    insurance.ts       # INSURANCE_PARTNERS
    process.ts         # HOW_IT_WORKS_STEPS
  lib/                 # logic, framework-agnostic where possible
    useShopStatus.ts   # the single live-hours hook (04)
    validation.ts      # Zod schemas (05)
    submitLead.ts      # client transport (05)
    analytics.ts       # optional, if analytics is added
  types/               # shared types if they outgrow their files
  styles/
    index.css
  App.tsx
  main.tsx
public/
  media/               # optimized images (06)
  icons/               # favicon set ported from the original (05)
```

**Reasoning for the structure (don't over-build it):**
- `layout/` vs `sections/` mirrors how the page is actually composed in `App.tsx` — chrome that persists vs. the scrolling body. It's the one distinction worth drawing.
- `content/` (renamed from `data/`) holds pure data. Splitting `shopData.ts` into per-concern files is optional — it's only 165 lines. **Split only if it grows**; a single `content/shop.ts` is fine to start. The point is the *name* (content, not "data") and that it stays logic-free.
- `lib/` is the one real architectural boundary: logic (status computation, validation, transport) separated from presentation. This is where the de-duplicated `useShopStatus` hook and the Zod schema live.
- **Do NOT** introduce `features/`, `entities/`, `widgets/` (Feature-Sliced Design) or a `services/` layer. For one page that's pure over-engineering — the exact thing the guiding principle forbids.

Move files with `git mv` to preserve history. The redesign exports components as **named** exports (`export const Navbar`); keep that convention consistently (the original mixed default and named — don't reintroduce that).

## 1.6 One-time cleanups during setup

- Delete the `.aistudio/` folder (AI Studio's internal artifact cache — `.aistudio/artifacts/brain/.../.tempmediaStorage/` holds duplicate copies of the photos; ~50 MB of waste not needed in the repo).
- Delete `metadata.json` (AI Studio manifest; `majorCapabilities: SERVER_SIDE_GEMINI_API` is irrelevant once genai is removed).
- Rewrite `README.md` (the redesign's is the AI Studio boilerplate pointing at ai.studio).
- Remove the dead-server `clean` script.
