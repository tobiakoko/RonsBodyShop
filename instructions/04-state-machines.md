# 04 — State Machines (implementation spec)

This is the core correctness document. Every stateful piece of the redesign is spec'd here as an **explicit** state machine. The redesign, like the original, builds these implicitly — loose booleans and raw numbers with scattered transitions. This file says exactly what each machine's states, events, and transitions are, and how to implement them cleanly. **No state-machine library** — `useReducer` + discriminated unions + plain hooks are the right tools for this size.

There are **five** stateful machines in the redesign:

1. **Estimate wizard** (4-step + submission) — `EstimateCalculator.tsx` 🔴
2. **Form submission status** (3 forms share this shape) 🔴
3. **Live shop open/closed status** (duplicated in 3 files) 🟠
4. **Mobile navigation menu** — `Navbar.tsx` 🟡
5. **Service-icon lookup** — `Services.tsx` 🔵 (transition table, not temporal)

---

## SM-1 — Estimate wizard (`EstimateCalculator.tsx`) 🔴

### As built (implicit)
A 4-step wizard tracked by `const [step, setStep] = useState<number>(1)` plus `const [isSubmitted, setIsSubmitted] = useState(false)`, with ~13 separate `useState` fields for the form data. Navigation is `setStep(2)`, `setStep(3)`, etc., hardcoded in each button.

### Problems
- **`step` is an unbounded `number`.** Nothing prevents `setStep(5)` or `setStep(0)`; a typo renders a blank wizard (no step matches). The legal states are exactly `1 | 2 | 3 | 4`, but the type says "any number."
- **Linear-only, hardcoded transitions.** Each "Next" button literally calls `setStep(n+1)` with a literal. Adding/removing a step means editing every button. The step sequence isn't defined anywhere as data.
- **No per-step validation.** You can advance from step 2 (Vehicle) to step 3 without a model/year even though they're `required` — `required` only blocks final form submit, not the `type="button"` "Next" clicks. So a user can reach step 4 with empty vehicle data, and the "summary" shows blanks.
- **Submission is a MOCK (critical).** `handleSubmit` does `setTicketNumber('RBS-' + random); setIsSubmitted(true)`. **It sends nothing to the shop.** Identical to the original's fatal bug. The "Reference #" shown to the customer is a random local number, not a real ticket. See `05` — this must be wired to a real transport.
- **`isSubmitted` + `step` can disagree.** They're independent; nothing enforces that `isSubmitted` implies the form phase is over.

### Target: explicit wizard machine
Model the wizard as an explicit state with a bounded step union and a status:

```ts
type Step = 1 | 2 | 3 | 4;
type WizardStatus = 'editing' | 'submitting' | 'success' | 'error';

interface WizardState {
  status: WizardStatus;
  step: Step;
  data: EstimateData;          // the 13 fields, grouped into one object
  errors: Partial<Record<keyof EstimateData, string>>;
  ticket?: string;             // set only on 'success' (returned by the server, not random)
  errorMessage?: string;       // set only on 'error'
}

type WizardAction =
  | { type: 'FIELD'; key: keyof EstimateData; value: string | string[] }
  | { type: 'NEXT' }           // validates current step, advances or sets errors
  | { type: 'BACK' }
  | { type: 'GOTO'; step: Step }
  | { type: 'SUBMIT' }         // → submitting
  | { type: 'RESOLVED'; ticket: string }   // server returned a real ref number
  | { type: 'REJECTED'; message: string }
  | { type: 'RESET' };
```

Transition diagram:
```
editing(step 1) ──NEXT(valid)──▶ editing(step 2) ──NEXT──▶ editing(step 3) ──NEXT──▶ editing(step 4)
      ▲ BACK                        ▲ BACK                    ▲ BACK                      │ SUBMIT
      └────────────────────────────────────────────────────────────────────────         ▼
                                                                              submitting ──RESOLVED──▶ success ──RESET──▶ editing(step 1)
                                                                                    └────REJECTED────▶ error ──(edit/SUBMIT)──▶ submitting
      NEXT(invalid) ──▶ stays on same step, errors populated
```

Implementation notes:
- `reducer` lives next to the component (or in `lib/` if you prefer); the component just dispatches. All transitions in one place — you can read the whole machine.
- **Per-step validation:** `NEXT` runs a Zod `.pick()` of the fields for the current step; on failure it sets `errors` and does not advance. This closes the "reach step 4 with empty vehicle" hole. Use the shared Zod schema from `05`.
- **Bounded step:** the `Step` union makes `setStep(5)` a compile error.
- **Real submission:** `SUBMIT` → `submitting` → call `submitLead(data)` (`05`) → `RESOLVED` with the **server-issued** reference, or `REJECTED`. Remove `Math.random()` ticket generation.
- **Step metadata as data:** define `const STEPS = [{n:1, label:'Damage'}, …]` and render the indicator + "Next" targets from it, so the sequence is declared once (fixes the hardcoded-`setStep` smell).
- **Disable "Submit" while `submitting`** and show a spinner (the redesign has no loading state on submit — it's instant because it's fake; a real network call needs one).

### Also fix: duplicated service taxonomy
`EstimateCalculator`'s `damageOptions` array (5 items: collision/paint/dent/frame/classic) **duplicates** `CORE_SERVICES` from `content/` with different label text. Unify: derive `damageOptions` from `CORE_SERVICES` (add a short `wizardLabel`/`wizardDesc` field to the service data if the wording must differ) so there's one service taxonomy. This also makes `onSelectService(id)` from the Services section able to pre-select the matching damage type (`02`).

**Most important file:** `src/components/EstimateCalculator.tsx` → split the reducer into `lib/estimateWizard.ts` (reducer + types) and keep the component presentational.

---

## SM-2 — Form submission status (shared by 3 forms) 🔴

### As built (implicit)
Three separate forms each hand-roll a submission flow, all mocks:
- `EstimateCalculator` — `isSubmitted` boolean (covered in SM-1).
- `LocationAndHours` — `const [submitted, setSubmitted] = useState(false)`; `handleSendMessage` just `setSubmitted(true)`. No validation, no transport.
- (The original's `Contact.tsx` had the same; not in the redesign, but the pattern recurs.)

### Problems
- **All three send nothing.** `LocationAndHours`'s "Quick Message to Ron" shows "Message Dispatched!" but no message is dispatched anywhere. Same fatal class as SM-1.
- **No validation** beyond HTML `required`.
- **No loading or error state** — success is instant and unconditional, so a real network call (which can fail) has nowhere to represent "sending…" or "failed, retry."
- **Duplicated flow logic** across forms.

### Target: one explicit submit-status machine, reused
Define a single small status type and (optionally) a reusable hook so all forms share one correct implementation:

```ts
type SubmitStatus =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; reference?: string }
  | { status: 'error'; message: string };
```

A `useLeadForm` hook in `lib/` can encapsulate: hold `data`, run Zod validation, POST via `submitLead` (`05`), and expose `{ status, errors, handleChange, handleSubmit, reset }`. Both the estimate wizard's final step and the LocationAndHours quick-message form consume it. This:
- makes `success` and `error` and `submitting` mutually exclusive by construction (one discriminated union, not three booleans),
- gives every form the same validation + loading + error UX,
- means the real-transport wiring (`05`) happens **once**.

Implementation notes:
- Keep the redesign's nice success UI (the checkmark card, "Message Dispatched!") — just drive it from `status === 'success'` and show the real/returned data.
- Add an **error** branch (currently none): if `submitLead` throws, show a "couldn't send — call us at {phone}" message with the real phone as a fallback. For a lead-gen site, a failed submit must always surface the phone number.
- Add a **submitting** branch: disable the button, show a spinner.
- Clear timers on unmount (the original leaked a `setTimeout`; don't repeat).

**Most important files:** `src/components/LocationAndHours.tsx`, `src/components/EstimateCalculator.tsx`, new `src/lib/useLeadForm.ts`, `src/lib/validation.ts`, `src/lib/submitLead.ts`.

---

## SM-3 — Live shop open/closed status (duplicated in 3 files) 🟠

### As built (implicit)
The **same ~25-line time-of-day computation is copy-pasted into three components**: `Hero.tsx`, `MobileFloatingBar.tsx`, and `LocationAndHours.tsx`. Each computes, via `useMemo(() => {...}, [])`, whether the shop is currently open based on Pacific Time, returning `{ isOpen, text }` (LocationAndHours also returns `subtext`).

### Problems
- **DRY violation — three copies.** Change the hours and you must edit three identical blocks. They've already diverged slightly (different `text`/`subtext` wording).
- **Broken timezone conversion.** `new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }))` is an **unreliable idiom**: it formats a date to a locale string, then parses that string back into a `Date`, which is implementation- and locale-dependent and can be off by hours or fail silently (the `try/catch` swallows it and falls back to "open"). This is a real correctness bug — the "Open Now / Closed" badge can lie.
- **Stale — never updates.** `useMemo(…, [])` computes once at mount. If a visitor loads the page at 5:25 PM and lingers, it still says "Open until 5:30 PM" at 6:00 PM. The status is frozen at page-load time.
- **Hours are hardcoded in the logic**, not read from `SHOP_INFO.hours` — a second source of truth for the schedule, which can drift from the displayed hours table.

### Target: one explicit, correct `useShopStatus` hook
Create `src/lib/useShopStatus.ts` — a single hook that all three components call.

```ts
type ShopStatus = {
  isOpen: boolean;
  text: string;      // "Open until 5:30 PM" | "Opens Mon 8:00 AM" | …
  subtext: string;
};
export function useShopStatus(): ShopStatus { … }
```

Requirements:
- **Correct timezone handling.** Use `Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', hour12:false, weekday,hour,minute }).formatToParts(new Date())` to read PT day/hour/minute directly — never parse a formatted string back into a `Date`. (Or use a tiny date lib like `date-fns-tz` if you prefer, but `Intl.formatToParts` needs no dependency.)
- **Drive from `SHOP_INFO.hours`** (the single source of truth), not hardcoded `8`/`17.5`/`12`. Parse the hours table into open ranges per weekday so changing `SHOP_INFO.hours` changes the live status automatically.
- **Update over time.** Use a `useEffect` with an interval (recompute every 60s, or schedule a recompute at the next open/close boundary) and `useState` so the badge transitions live without a reload. Keep it cheap.
- Return the three fields; let each component pick what it shows (Hero/FloatingBar use `text`, LocationAndHours also uses `subtext`).

This collapses ~75 lines of triplicated, buggy code into one tested hook — and makes it a *state machine over time* (states: `open`, `opening-later-today`, `closed-for-evening`, `closed-weekend`, `closed-sunday`) that's explicit and correct.

**Most important files:** new `src/lib/useShopStatus.ts`; update `Hero.tsx`, `MobileFloatingBar.tsx`, `LocationAndHours.tsx` to consume it.

---

## SM-4 — Mobile navigation menu (`Navbar.tsx`) 🟡

### As built (implicit)
`const [mobileMenuOpen, setMobileMenuOpen] = useState(false)`. A clean 2-state machine (`closed ⇄ open`). The drawer is **conditionally rendered** (`{mobileMenuOpen && <div>…</div>}`), which is actually **better than the original** (whose menu stayed in the DOM and was tabbable while "closed"). Links call `setMobileMenuOpen(false)` on click.

### Problems (minor — this one is mostly fine)
- **No `aria-expanded`** on the toggle button to reflect state (accessibility).
- **No `Escape`-to-close** and no close-on-outside-click.
- **No scroll-lock** when open (background scrolls behind the drawer).
- Because it's conditionally rendered, the tabbability bug is already avoided — good. A focus-trap isn't strictly required for a simple drawer but is nice.

### Target
Keep the boolean (a `useReducer` would be over-engineering for 2 states). Just complete the "open" state's obligations:
- `aria-expanded={mobileMenuOpen}` and `aria-controls` on the button.
- `useEffect` to add an `Escape` key listener and lock body scroll while open; clean up on close/unmount.
- Optional: close on outside click.

Document the two states and their entry/exit actions in a comment so the next editor sees the full contract.

**Most important file:** `src/components/Navbar.tsx`.

---

## SM-5 — Service-icon lookup (`Services.tsx`) 🔵 (transition table)

### As built (implicit)
```ts
const getIcon = (id: string) => {
  switch (id) {
    case 'collision': return <ShieldCheck …/>;
    case 'paint':     return <Palette …/>;
    case 'dent':      return <Sparkles …/>;
    case 'frame':     return <Wrench …/>;
    case 'classic':   return <Flame …/>;
    default:          return <Wrench …/>;   // silent default
  }
};
```
Not temporal — a pure input→output map (a transition table). `switch` is cleaner than the original's if-chain, but it has the **same silent-default problem**: the parameter is typed `string`, and the `default` swallows any unknown id by rendering the wrench. Add a 6th service and its icon silently falls back with no error.

### Target: exhaustive, type-checked map
```ts
import type { ServiceItem } from '@/content/services';
const SERVICE_ICON: Record<ServiceItem['id'], LucideIcon> = {
  collision: ShieldCheck, paint: Palette, dent: Sparkles, frame: Wrench, classic: Flame,
};
// usage: const Icon = SERVICE_ICON[service.id]; <Icon className="…" />
```
If `ServiceItem['id']` is a string-literal union (make it one in `content/services.ts`: `id: 'collision' | 'paint' | …`), then `Record<Union, …>` forces TypeScript to require every id — adding a service becomes a compile error until its icon is added. The silent-default bug becomes impossible. Keep a tiny fallback only at the lookup site if `id` must stay `string` for any reason.

**Most important files:** `src/components/Services.tsx`, `src/content/services.ts` (tighten the `id` type to a union).

---

## Priority & summary

| Machine | File(s) | Priority | Core fix |
|---|---|---|---|
| SM-1 Estimate wizard | `EstimateCalculator.tsx` | 🔴 | Bounded step union + reducer + per-step validation + **real submit** |
| SM-2 Submit status | `LocationAndHours.tsx`, estimate, `lib/useLeadForm` | 🔴 | One status union + **real transport** + loading/error branches |
| SM-3 Live hours | `Hero`, `MobileFloatingBar`, `LocationAndHours` → `lib/useShopStatus` | 🟠 | De-duplicate to one hook; fix TZ bug; update over time; read `SHOP_INFO` |
| SM-4 Mobile menu | `Navbar.tsx` | 🟡 | Keep boolean; add aria-expanded, Esc, scroll-lock |
| SM-5 Icon lookup | `Services.tsx`, `content/services.ts` | 🔵 | Exhaustive `Record<Union,…>`; kill silent default |

The recurring theme (same as the original audit): *a raw primitive standing in for a bounded state, a silent default standing in for exhaustiveness, and "success" that was never earned because nothing was actually sent.* Fixing SM-1 and SM-2 — which both require the real transport in `05` — is the whole ballgame.
