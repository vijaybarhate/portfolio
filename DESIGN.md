# Design System

Editorial "paper & ink" portfolio for Vijay Barhate — Awwwards-style kinetic overhaul. Built with Tailwind CSS v4 (CSS-first `@theme` tokens), React 18, Framer Motion 12, Lenis smooth scroll, and a raw three.js WebGL hero field.

## Core Theme

Defined as Tailwind v4 tokens in `src/index.css` (`@theme`).

### Colors
- **Paper (background):** `#eae8e2`
- **Ink (text primary):** `#141413`
- **Muted (text secondary):** `#6e6a62`
- **Line (borders):** `rgba(20, 20, 19, 0.15)` — footer uses `paper/15` on the dark surface
- **Accent:** `#ff4d00` (orange — large display, dark surfaces, dots, selection, focus rings)
- **Accent deep (small text on paper):** `#b53a00` — `text-accent` on paper is 2.71:1 (fails); `text-accent-deep` is 4.8:1
- **Muted:** `#5c5750` (5.8:1 on paper) — body copy; meta text on ink uses `paper/70`+ (7.8:1)

### Typography
- **Display:** Syne (700–800, uppercase) — hero name, section headlines, marquee
- **Body:** Instrument Sans — paragraphs, lists
- **Mono:** JetBrains Mono — nav, labels, meta, timestamps (uppercase, wide tracking `0.12–0.25em`)
- Loaded via `@fontsource` self-hosted woff2 (Syne 700/800, Instrument Sans 400–600, JetBrains Mono 400/500)

## Motion Architecture

| Layer | Implementation | File |
|---|---|---|
| Smooth scroll | Lenis (`duration: 1.15`, exponential ease-out), rAF-driven; created only when motion allowed — skipped under OS reduced-motion or user Calm override, re-enabled by explicit Full opt-in | `src/App.tsx` + `MotionContext.tsx` |
| Motion preference | `full` (default — motion on for everyone) / `calm` (static) / `auto` (follow OS), persisted `vb-motion-mode`, cross-tab sync, live OS listener; drives Lenis, `MotionConfig` framer kill-switch, WebGL rig, marquee/hero/contact/work kinetics; footer toggle + palette command | `MotionContext.tsx`, `Contact.tsx` footer |
| Anchor navigation | Global click interceptor → `lenis.scrollTo(el, { offset: -56 })`, native smooth-scroll fallback | `src/App.tsx` |
| Preloader | Ink curtain, eased 0→100% counter (~1.5 s), slides up `[0.76, 0, 0.24, 1]`; gates hero reveals via `ready` prop and locks `documentElement` overflow | `Preloader.tsx` |
| Custom cursor | Accent dot (instant) + spring-lagged ring that morphs into labeled bubble from `data-cursor="Label"` attributes ("View", "Say hi", "Go"); pointer-fine only, native cursor hidden via CSS | `Cursor.tsx` |
| Magnetic elements | Reusable wrapper — motion values + springs, no `useState` in the pointer path | `Magnetic.tsx` |
| Hero WebGL field | Raw three.js `Points` terrain (130×70 grid), custom `ShaderMaterial`: layered sine waves + mouse raycast repulsion bump + ~1.2 % accent dots; scroll-linked dive via `uScroll` uniform (camera z 8.2→6.6, y 3.4→2.5, wave amp ×1.55) fed by hero `scrollYProgress` through `WebGLScrollRig`; adaptive DPR (1 <768px, 2 desktop); IO pause offscreen + `document.hidden`; reduced-motion renders scroll-linked static frames only (no autonomous time animation, repaint on resize/scroll/IO — resize clears GL buffers); **lazy-loaded chunk** | `three/HeroField.tsx` + `three/WebGLScrollRig.tsx` |
| Scroll parallax | Hero content translates/fades out, field dims to 12% opacity on scroll away | `Hero.tsx` |
| Word reveal | About lead paragraph split into words; per-word opacity driven by `useScroll` progress ranges; `*` prefix marks accent-colored words | `About.tsx` |
| Work previews | Cursor-following SVG thumbnail cards (4 deterministic pattern variants) above project rows, lg + pointer-fine only | `Work.tsx` |
| Masked line reveals | Contact headline lines slide up from `overflow-hidden` masks on view | `Contact.tsx` |
| Marquee | JS-driven loop (`useAnimationFrame`, 60px/s + up to 4× scroll-velocity boost, wrap at half width) on its own nested element; velocity skew lives on the parent so transforms never fight; gated by effective preference, static x=0 under Calm | `Marquee.tsx` |
| Header | Hide-on-scroll-down / show-on-up past 140 px | `Header.tsx` |
| Command palette | Cmd/Ctrl+K fuzzy nav (sections via `vb:goto` → Lenis, email copy, resume, socials, motion toggle, top); ArrowUp/Down+Enter, Esc, dialog semantics | `CommandPalette.tsx` |
| Konami egg | ↑↑↓↓←→←→BA → terminal bar with typewriter (`role=status`), auto-dismiss 9s | `KonamiTerminal.tsx` |
| Grain | Fixed SVG `feTurbulence` overlay, 5% opacity, z-150; hidden under `prefers-reduced-transparency` | `App.tsx` |

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
- Reduced-motion: default Full keeps motion on; Calm/Auto+OS-reduce disables Lenis, WebGL loop (scroll-linked static frames), ticker (parked), CSS ambient anims, and all framer transitions via `MotionConfig`
