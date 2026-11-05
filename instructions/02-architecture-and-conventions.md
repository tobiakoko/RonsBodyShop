# 02 — Architecture & Conventions

The rules every component in this codebase follows. The redesign already gets most of this right; this file codifies it and flags the few places to tighten.

---

## 2.1 High-level architecture

Single-page React app, statically built by Vite, deployed to Vercel. One route. The page is a vertical stack of **sections** wrapped in persistent **layout** chrome. The only server-side code is **one serverless function** for form submission (`05`). There is no client-side router, no global state manager, no backend database (unless you add lead storage later — `05` scaling notes).

```
index.html ──▶ main.tsx ──▶ <App/>
                               ├─ <Navbar/>              (layout)      ─┐
                               ├─ <main>                                │ state owned by App:
                               │   ├─ <Hero/>            (section)      │  isEstimateModalOpen
                               │   ├─ <HowItWorks/>                     │
                               │   ├─ <Services/>                       │ passed down as:
                               │   ├─ <AboutShop/>                      │  onOpenEstimate()
                               │   ├─ <InsuranceAdvocacy/>              │  onSelectService()
                               │   ├─ <ReviewsAndTrust/>                │
                               │   ├─ <EstimateCalculator/> (inline)    │
                               │   └─ <LocationAndHours/>               │
                               ├─ <Footer/>             (layout)        │
                               ├─ <MobileFloatingBar/>  (layout)        │
                               └─ <EstimateCalculator isModal/> ───────┘  (conditionally rendered)

              content/*  ──▶  read by sections (SHOP_INFO, CORE_SERVICES, …)
              lib/*      ──▶  useShopStatus, validation, submitLead
              /api/contact (serverless) ◀── submitLead() POSTs here
```

## 2.2 The single-source-of-truth rule (keep what the redesign got right)

**This is the most important convention and the redesign already nails it.** All business data lives in `content/shop.ts` (`SHOP_INFO`) and the other `content/*` files. Components never hardcode a phone number, address, or hours — they read from `SHOP_INFO`. This is exactly what the audit demanded for the *original* (which had three conflicting phone numbers); the redesign fixed it. **Do not regress.**

Rules:
- Phone appears as `SHOP_INFO.phone` (display) and `SHOP_INFO.phoneRaw` (for `tel:`). Never type a number inline.
- Hours appear only in `SHOP_INFO.hours`. The live open/closed *computation* lives in one hook (`useShopStatus`, `04`), not re-derived per component.
- The SEO JSON-LD in `index.html` must reflect the same data (`05`). Keep them in sync; ideally generate the JSON-LD from `SHOP_INFO` at build time so they can't drift.
- Service definitions live in `CORE_SERVICES`; the estimate wizard's `damageOptions` currently **duplicates** the service list with different labels (`05`/`04`) — unify these so there's one service taxonomy.

## 2.3 Component conventions

- **Named exports**, one component per file, file named after the component (`Navbar.tsx` → `export const Navbar`). The redesign is consistent here; keep it.
- **Props typed with an explicit interface** above the component (`interface NavbarProps { onOpenEstimate: () => void }`). Keep.
- **Presentational components take data + callbacks as props**; they don't reach into global state or fetch. State that coordinates multiple sections (the estimate modal open/closed) lives in `App` and is passed down. This is correct and sufficient — **do not add Context or a store** for one boolean.
- **Logic goes in `lib/`**, not in components. The live-hours computation, validation, and transport are logic → extract them (the redesign inlines the hours computation into three components; `04` fixes this).
- **No `React.FC` is required** but the redesign uses it consistently — fine to keep for consistency. (Modern guidance mildly prefers plain function declarations; not worth a migration.)

## 2.4 The prop-drilling situation (acceptable, with a note)

`onOpenEstimate` is drilled from `App` into Navbar, Hero, HowItWorks, InsuranceAdvocacy, Footer, and MobileFloatingBar. That's six consumers of one callback. For this depth (one level — App → section), **prop drilling is the right call**; a Context would be over-engineering. Leave it.

The one thing to clean: `handleSelectService` in `App` scrolls to `#estimate` *or* opens the modal depending on whether the element exists — but `#estimate` always exists (the inline `EstimateCalculator` renders it), so the `else` branch is dead. Simplify to just scroll-to-section, and have the service selection also pre-fill the wizard's damage type (`04`).

## 2.5 The duplicate-EstimateCalculator pattern

`EstimateCalculator` renders **twice**: once inline as a `<section id="estimate">`, and once as a modal when `isEstimateModalOpen`. Same component, `isModal` prop switches the wrapper. This is a reasonable pattern, but note:
- Two independent instances means **two independent copies of the wizard state** (step, form fields). Opening the modal doesn't carry over anything the user typed inline, and vice versa. For this site that's acceptable (they're alternate entry points), but document it so it's not mistaken for a bug.
- When `onSelectService(id)` fires from the Services section, it should set the inline wizard's `damageType` to `id` and scroll to it. Right now it only scrolls; the selected service is ignored. Wire it (`04`).

## 2.6 Imports & hygiene

- Remove unused imports as you go (`Clock` in `MobileFloatingBar`, `Car`/`ShieldCheck`/`Wrench` where imported-but-unused in several components). Enabling `noUnusedLocals` in tsconfig (`01`) surfaces these.
- Icon imports come only from `lucide-react`. One icon library (the redesign already does this — the original's two-library problem is gone; don't reintroduce `react-icons`).
- Use the `@/` path alias (configured in `vite.config.ts`/`tsconfig`) for cross-folder imports, or keep relative — pick one and be consistent. The redesign uses relative imports; fine.

## 2.7 What NOT to build (anti-over-engineering guardrails)

Explicitly out of scope for this site — adding any of these is the failure mode to avoid:
- A client-side router (one page).
- Redux / Zustand / Jotai / Context for app state (one boolean in App suffices).
- A state-machine library like XState (`04` uses `useReducer` + unions — sufficient).
- A design-system package / Storybook (it's one site).
- A headless CMS (unless the owner explicitly wants to self-edit content — that's a `05`/scaling decision, not a default).
- SSR/Next.js migration (static + prerendered meta is enough for this SEO need; revisit only if it becomes multi-page).
- GraphQL, a database, auth (no accounts on a body-shop brochure site).
