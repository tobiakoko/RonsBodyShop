# 06 — Assets & Performance

The redesign fixed the original's worst asset problem (hotlinked, expiring Google CDN images → now real, self-hosted photos). But it introduced a new one: **the photos are enormous and unoptimized.** This is the biggest performance task.

---

## 6.1 The problem: ~56 MB of unoptimized photos

`public/assets/aistudio/` contains 10 JPEGs plus the logo:

```
IMG_6602  5.9 MB      IMG_6809  6.3 MB      IMG_6813  5.4 MB
IMG_6603  5.5 MB      IMG_6810  5.7 MB  ← hero LCP image
IMG_6604  5.1 MB      IMG_6811  5.3 MB      IMG_6814  5.4 MB
                      IMG_6812  6.6 MB      IMG_6815  5.3 MB
logo_copy_5.PNG  33 KB
```

**~56 MB total.** Each photo is a full-resolution phone JPEG (likely 4000×3000). The hero image alone (`IMG_6810`, 5.7 MB) is the **Largest Contentful Paint** element — on a mobile connection that's several seconds of blank or blurry hero before the page feels loaded. This will tank Core Web Vitals (an SEO ranking factor) and the mobile experience for exactly the customers the site targets.

Also: `.aistudio/artifacts/brain/.../.tempmediaStorage/` holds **another ~50 MB** of duplicate copies of these photos (AI Studio's cache). Delete that whole folder (`01`).

## 6.2 The fix: an image optimization pass

### Step 1 — Audit which images are actually used
Only 4 of the 10 photos are referenced in code:
```
grep -rhoE "IMG_[0-9]+_[a-f0-9]+\.jpeg" src/ | sort -u
→ IMG_6604, IMG_6810, IMG_6812, IMG_6815
```
The other 6 (IMG_6602, 6603, 6809, 6811, 6813, 6814) appear **unused**. Confirm, then either delete them or wire them into a gallery/about section if the design intends to show them. **Shipping 30+ MB of unreferenced photos is pure waste** — delete unused ones from `public/`.

### Step 2 — Resize + convert the used images
For each used photo, produce web-appropriate sizes and formats. Target: no image wider than it's displayed, served as **AVIF** (best) + **WebP** (fallback), JPEG only as last resort.

Recommended tool: **`sharp`** (Node) in a one-off build script, or **`vite-imagetools`** for on-the-fly generation at build. For a template you'll reuse, a small `scripts/optimize-images.mjs` using `sharp` is clean and explicit:

```js
// scripts/optimize-images.mjs  (run once, commit the outputs to public/media/)
import sharp from "sharp";
const jobs = [
  { in: "IMG_6810", widths: [768, 1280, 1920] },   // hero — larger set
  { in: "IMG_6604", widths: [640, 1024] },
  { in: "IMG_6812", widths: [640, 1024] },
  { in: "IMG_6815", widths: [640, 1024] },
];
for (const j of jobs) for (const w of j.widths) {
  const src = `public/assets/aistudio/${j.in}.jpeg`;
  await sharp(src).resize(w).avif({ quality: 55 }).toFile(`public/media/${j.in}-${w}.avif`);
  await sharp(src).resize(w).webp({ quality: 65 }).toFile(`public/media/${j.in}-${w}.webp`);
}
```
Expected result: each ~5.7 MB photo → ~40–120 KB per size in AVIF. **The hero drops from 5.7 MB to well under 150 KB** — a ~40× reduction.

### Step 3 — Serve responsively with `<picture>` / `srcset`
Replace the bare `<img src="/assets/aistudio/IMG_6810….jpeg">` with responsive markup:

```tsx
<picture>
  <source type="image/avif" srcSet="/media/IMG_6810-768.avif 768w, /media/IMG_6810-1280.avif 1280w, /media/IMG_6810-1920.avif 1920w" sizes="(max-width: 1024px) 100vw, 42vw" />
  <source type="image/webp" srcSet="/media/IMG_6810-768.webp 768w, …" sizes="…" />
  <img src="/media/IMG_6810-1280.webp" alt="Ron's Body Shop facility at 1324 Cabrillo Ave, Torrance, CA"
       width="1280" height="960" loading="eager" fetchPriority="high" decoding="async" />
</picture>
```

Rules:
- **Hero image:** `loading="eager"` + `fetchPriority="high"` (it's the LCP — load it first). Everything below the fold: `loading="lazy"` + `decoding="async"`.
- **Always set `width`/`height`** (intrinsic dimensions) to reserve space and prevent Cumulative Layout Shift (a Core Web Vital). The redesign's images have no dimensions.
- `alt` text is already decent in the redesign — keep descriptive alts.

### Step 4 — Preload the hero image
Add to `index.html` `<head>` so the browser fetches the LCP image before parsing the JS:
```html
<link rel="preload" as="image" href="/media/IMG_6810-1280.avif" type="image/avif" fetchpriority="high" />
```

## 6.3 The logo

`logo_copy_5_ac7ffbc9.PNG` — 33 KB, fine size. Two issues:
- **Uppercase `.PNG` extension.** Works on macOS/Vercel (case-insensitive) but **breaks on case-sensitive Linux** if any reference uses lowercase. Rename to lowercase `.png` and update references, or confirm exact-case consistency everywhere. Safer: rename to `logo.png`.
- It's used in the Navbar and as the favicon. Consider an **SVG logo** if one exists (sharp at any size, tiny). Otherwise provide a proper favicon set (port from the original — `05` §5.8).
- `referrerPolicy="no-referrer"` on the `<img>` is a leftover from when images were hotlinked; harmless now but unnecessary for same-origin images — can remove.

## 6.4 Fonts (cross-ref `03`)

Fonts are render-blocking resources too. `03` covers: drop Playfair if unused, consider self-hosting via Fontsource. Self-hosted, subsetted woff2 for Oswald + Plus Jakarta Sans is the performance-optimal choice and removes the Google Fonts round-trip.

## 6.5 Other performance notes

- **No code-splitting needed.** After cleanup the JS bundle is small (one page, one icon lib). Don't add `React.lazy` unless the bundle crosses ~200 KB gzipped — it won't.
- **`motion` library:** if kept (`01` says verify usage), it's ~30–50 KB. If animations are just Tailwind `animate-in` utilities, remove `motion` entirely — a meaningful bundle saving.
- **The `vintage-pinstripe` CSS background** on the hero is a cheap repeating-gradient — fine.
- **Vercel Image Optimization:** alternatively to the `sharp` script, Vercel can optimize images on-demand if you use its `<Image>` conventions — but that's a Next.js feature; for a plain Vite SPA, the build-time `sharp` approach is simpler and free.

## 6.6 Performance targets (enforce in CI — `07`)

| Metric | Target | Why |
|---|---|---|
| LCP (mobile) | < 2.5 s | Hero image must be optimized + preloaded |
| CLS | < 0.1 | All images need width/height |
| Total image payload (initial) | < 500 KB | Down from ~6 MB for the hero alone |
| Lighthouse Performance | ≥ 90 | Client-facing quality bar |

## 6.7 Summary

1. Delete `.aistudio/` cache folder (~50 MB) and unused photos (6 of 10).
2. Resize + convert the 4 used photos to AVIF/WebP at responsive widths (`sharp` script → `public/media/`).
3. Replace `<img>` with `<picture>` + `srcset` + `width`/`height`; `fetchPriority="high"` on hero, `loading="lazy"` below fold.
4. Preload the hero image in `index.html`.
5. Rename logo to lowercase `logo.png`; add favicon set.
6. Verify/remove `motion`; consider self-hosting fonts.
