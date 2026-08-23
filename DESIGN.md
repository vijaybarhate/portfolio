# Design System

Editorial "paper & ink" portfolio for Vijay Barhate — Awwwards-style kinetic overhaul. Built with Tailwind CSS v4 (CSS-first `@theme` tokens), React 18, Framer Motion 12, Lenis smooth scroll, and a raw three.js WebGL hero field.

## Core Theme

Defined as Tailwind v4 tokens in `src/index.css` (`@theme`).

### Colors
- **Paper (background):** `#eae8e2`
- **Ink (text primary):** `#141413`
- **Muted (text secondary):** `#6e6a62`
- **Line (borders):** `rgba(20, 20, 19, 0.15)` — footer uses `paper/15` on the dark surface
- **Accent:** `#ff4d00` (orange — periods, markers, selection, focus rings, WebGL accent dots)

### Typography
- **Display:** Syne (700–800, uppercase) — hero name, section headlines, marquee
- **Body:** Instrument Sans — paragraphs, lists
- **Mono:** JetBrains Mono — nav, labels, meta, timestamps (uppercase, wide tracking `0.12–0.25em`)
- Loaded via Google Fonts in `index.html`

## Motion Architecture

| Layer | Implementation | File |
|---|---|---|
| Smooth scroll | Lenis (`duration: 1.15`, exponential ease-out), rAF-driven; skipped under reduced-motion | `src/App.tsx` |
| Anchor navigation | Global click interceptor → `lenis.scrollTo(el, { offset: -56 })`, native smooth-scroll fallback | `src/App.tsx` |
| Preloader | Ink curtain, eased 0→100% counter (~1.5 s), slides up `[0.76, 0, 0.24, 1]`; gates hero reveals via `ready` prop and locks `documentElement` overflow | `Preloader.tsx` |
| Custom cursor | Accent dot (instant) + spring-lagged ring that morphs into labeled bubble from `data-cursor="Label"` attributes ("View", "Say hi", "Go"); pointer-fine only, native cursor hidden via CSS | `Cursor.tsx` |
| Magnetic elements | Reusable wrapper — motion values + springs, no `useState` in the pointer path | `Magnetic.tsx` |
| Hero WebGL field | Raw three.js `Points` terrain (130×70 grid), custom `ShaderMaterial`: layered sine waves + mouse raycast repulsion bump + ~1.2 % accent dots; DPR cap 2, pauses when tab hidden, static frame under reduced-motion, **lazy-loaded chunk** | `three/HeroField.tsx` |
| Scroll parallax | Hero content translates/fades out, field dims to 12% opacity on scroll away | `Hero.tsx` |
| Word reveal | About lead paragraph split into words; per-word opacity driven by `useScroll` progress ranges; `*` prefix marks accent-colored words | `About.tsx` |
| Work previews | Cursor-following SVG thumbnail cards (4 deterministic pattern variants) above project rows, lg + pointer-fine only | `Work.tsx` |
| Masked line reveals | Contact headline lines slide up from `overflow-hidden` masks on view | `Contact.tsx` |
| Marquee | Infinite strip, CSS `--animate-marquee` (translateX −50%, duplicated row, `aria-hidden`) | `Marquee.tsx` |
| Header | Hide-on-scroll-down / show-on-up past 140 px | `Header.tsx` |
| Grain | Fixed SVG `feTurbulence` overlay, 5% opacity, z-150 | `App.tsx` |

## Layout

- Sections: Preloader → Hero (WebGL field) → Marquee → Work → About → Capabilities → Certifications → Contact (footer)
- Horizontal rhythm: `px-5 md:px-10`; vertical: `py-24 md:py-36`
- Grids collapse to single column below `lg`/`md`; list rows use negative-margin hover fills (bg-ink/text-paper inversion)

### Fluid display type (verified)
Display headlines are sized so the longest word always fits the content box (Syne ExtraBold ≈ 8.4em for "BARHATE.", ≈ 10.35em for "SOMETHING"):
- Hero name: `clamp(2rem, 10vw, 12.5rem)`
- Contact headline: `clamp(1.5rem, 8vw, 8rem)`

Do not raise the vw coefficient or the clamp minimums without re-verifying at 320px.

## Responsive Verification (2026-08-23, post-rework)

Checked at **320 / 375 / 768 / 1440** px via DevTools overflow audit (clipping-aware: skips children of `overflow: hidden/clip` ancestors and fixed elements) — **zero issues at all four widths**, plus visual screenshots of hero, work hover preview, about word-reveal, and contact at 320/1440.

Notes:
- The circular "SAY HELLO" magnetic CTA is hidden below `sm` (space constraint); the plain email link remains.
- Marquee children intentionally render off-screen inside an `overflow-hidden` container — not page overflow.
- Global safety net: `html, body { overflow-x: clip }`.

## Performance

- three.js isolated into async chunk (`HeroField-*.js`, ~131 kB gz) via `React.lazy`; main bundle ~106 kB gz
- DPR capped at 2; render loop pauses on `document.hidden`
- All pointer/scroll listeners `{ passive: true }` except where preventDefault is required
- Reduced-motion: Lenis disabled, WebGL renders one static frame, all CSS animations collapse to ~0 ms
