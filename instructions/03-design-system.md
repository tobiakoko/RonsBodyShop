# 03 — Design System

Colors, fonts, tokens, layout. The redesign has a **good, coherent** design system — far better than the original's. The main job here is to *enforce* it by replacing hardcoded hex with the tokens that already exist.

---

## 3.1 The palette (already defined — use it)

The redesign defines its palette cleanly in `src/index.css` via Tailwind v4's `@theme`:

```css
@theme {
  --color-vnavy: #16203B;        /* primary dark — headers, nav, hero bg */
  --color-vnavy-dark: #0F1626;   /* darker navy — utility strip, depth */
  --color-vnavy-light: #233154;
  --color-vamber: #E7A622;       /* primary accent — CTAs, highlights */
  --color-vamber-hover: #D3951B; /* CTA hover */
  --color-vred: #D83A27;         /* secondary accent — labels, alerts */
  --color-vcream: #FAF7F2;       /* page background */
  --color-vsand: #F3EFE6;        /* alternating section background */
  --color-vcharcoal: #1E232B;
}
```

These map to Tailwind classes automatically in v4: `bg-vnavy`, `text-vamber`, `border-vred`, etc. **This is the single source of truth for color.** The vintage-Americana identity (navy + amber + red on cream) is the brand — preserve it exactly.

## 3.2 The problem: hardcoded hex everywhere (the one real design debt)

Despite the clean token definitions, the components are **riddled with arbitrary hex values** instead of the tokens:

```
grep -rn "\[#" src/components/   →   dozens of hits
```

Examples found in nearly every component: `bg-[#16203B]`, `text-[#E7A622]`, `bg-[#0F1626]`, `bg-[#FAF7F2]`, `bg-[#F3EFE6]`, `text-[#D83A27]`, `bg-[#D83A27]`, `hover:bg-[#D3951B]`. Every one of these is a token written the long, un-maintainable way. This is the **same class of problem the audit flagged in the original** (hardcoded hex bypassing tokens), just carried into the redesign.

**Why it matters:** if the shop ever rebrands (or you reuse this template for another business — which is the whole point of the Freelance Builds project), you'd have to find-and-replace hex across 12 files instead of editing 9 lines in `@theme`. It also makes the `@theme` block misleading — it looks like the source of truth but isn't actually used.

**Fix (C1 in the checklist):** mechanical find-and-replace.

| Replace this arbitrary value | With this token class |
|---|---|
| `[#16203B]` | `vnavy` |
| `[#0F1626]` | `vnavy-dark` |
| `[#233154]` | `vnavy-light` |
| `[#E7A622]` | `vamber` |
| `[#D3951B]` | `vamber-hover` |
| `[#D83A27]` | `vred` |
| `[#FAF7F2]` | `vcream` |
| `[#F3EFE6]` | `vsand` |
| `[#1E232B]` | `vcharcoal` |

So `bg-[#16203B]` → `bg-vnavy`, `text-[#E7A622]` → `text-vamber`, `hover:bg-[#D3951B]` → `hover:bg-vamber-hover`, and so on across all prefixes (`bg-`, `text-`, `border-`, `ring-`, `from-`, `via-`, `to-`, `fill-`, `divide-`, `selection:`).

Do it carefully, rebuild, and eyeball each section — the rendered result should be pixel-identical (same colors, now via tokens). Also move the two hardcoded colors in `index.html`'s `<body class>` (`bg-[#FAF7F2] text-[#1A1D20] selection:bg-[#E7A622]/30`) — but note `#1A1D20` isn't a token; add `--color-vink: #1A1D20` (body text) to `@theme` and use it, or map body text to `vcharcoal` if close enough. There are a couple of one-off `slate-*` and `emerald-*` utility colors (for form success/neutral states) — those are fine to leave as Tailwind built-ins; only the **brand** colors need tokenizing.

## 3.3 Fonts (the redesign is clean — one small cut)

The redesign loads **three** families via a single Google Fonts `<link>` in `index.html`:
- **Oswald** — display/signage (headings, the vintage "Americana" look). Used heavily (`font-['Oswald']`).
- **Plus Jakarta Sans** — body/UI sans. The default body font.
- **Playfair Display** — serif. Declared as `--font-serif` but **verify it's actually used** (`grep -rn "font-serif\|Playfair" src/`). If nothing uses it, **drop it** from the Google Fonts URL — it's an unused render-blocking font (the exact waste the audit flagged in the original, which loaded six families).

This is already far better than the original (which loaded 6 families across two conflicting `@import`s plus an undeclared `Rajdhani`). Keep the single `<link>`, `preconnect` is present (good), `display=swap` is present (good).

**Optional upgrade (recommended for a client site):** self-host the fonts via Fontsource (`@fontsource/oswald`, `@fontsource/plus-jakarta-sans`) instead of Google Fonts. Benefits: removes the third-party request and the privacy/latency dependency, lets Vite fingerprint and cache the font files, and eliminates the `preconnect` round-trips. For a template you'll reuse, self-hosting is the more professional default. Load only the weights actually used (audit which `font-weight`s appear).

**Font tokens** are correctly defined in `@theme` (`--font-display`, `--font-serif`, `--font-sans`). One inconsistency: components write `font-['Oswald']` (arbitrary value) in dozens of places instead of using the `font-display` token. Same problem as the colors — replace `font-['Oswald']` with `font-display` so the font family is defined once. (`font-['Oswald']` → `font-display`.)

## 3.4 Layout conventions

The redesign is consistent here (better than the original, which mixed `container` and `max-w-7xl`):
- Section container: `max-w-6xl mx-auto px-4 sm:px-6` (Navbar/Hero/Services/etc.) — a couple use `max-w-4xl`/`max-w-2xl` intentionally for narrower content (the estimate form). Keep this; it's a deliberate rhythm.
- Sections alternate backgrounds `bg-vcream` / `bg-vsand` for visual separation. Good.
- Section vertical padding is `py-14`/`py-16`/`py-20` — slightly inconsistent. Optionally standardize to a scale (e.g. `py-16` default, `py-20` for hero-adjacent). Low priority.
- Consider extracting a `<Container>` and `<Section>` primitive into `components/ui/` if the repetition bothers you — but for one page it's optional, not required. Don't over-abstract.

## 3.5 Custom utilities

`index.css` defines `.vintage-pinstripe`, `.vintage-metal-border`, `.vintage-badge-shadow`. Verify each is used (`grep -rn "vintage-pinstripe\|vintage-metal-border\|vintage-badge-shadow" src/`); `vintage-pinstripe` is used in Hero. Delete any that are unused (the original had several dead vintage utilities — don't carry that pattern in). These three are small and on-brand; keep the used ones.

## 3.6 Dark mode

The redesign has **no** dark-mode system (unlike the original, which had a dead `.dark` block that never activated). That's the right call for this site — **do not add dark mode.** A body-shop brochure doesn't need it; it would be scope creep.

## 3.7 Summary of design-system tasks

1. Replace all `[#hex]` arbitrary values with brand tokens (table in 3.2). **Mechanical, high-value.**
2. Replace `font-['Oswald']` with `font-display`.
3. Add `--color-vink: #1A1D20` (or map to `vcharcoal`) and tokenize the body colors in `index.html`.
4. Verify & drop Playfair Display if unused.
5. (Optional, recommended) self-host fonts via Fontsource.
6. Delete any unused `.vintage-*` utilities.
7. Do **not** add dark mode or over-abstract the layout primitives.
