# Astryx-Style Frontend Redesign Plan

Status: IMPLEMENTED (2026-07-02) — verified with Playwright screenshots across
desktop/mobile and light/dark themes. See repo `README.md` for the new file layout.
Scope: frontend only. Content in `content/*.json` stays the same. Small wording or grouping changes are allowed only when the new layout needs them.

---

## 1. Current State Analysis

### 1.1 Structure

```text
index.html          page shell, nav, hardcoded hero, empty content slots
content-loader.js   fetches content/*.json, renders 11 sections as HTML strings
script.js           scroll fade-in, tabs, toast, hero mouse glow, marquee, modal, counters
styles.css          custom CSS layered on top of Tailwind CDN utilities
content/*.json      all resume content (about, experience, projects, ...)
public/             images (17 MB), company logos, testimonial scans
```

### 1.2 What works well

- Content/presentation split via JSON + manifest is clean and should be kept.
- IntersectionObserver reveal, counter animation, and marquee already exist as building blocks.
- Static hosting on GitHub Pages, no build step. Keep this.

### 1.3 Main problems

| # | Problem | Evidence |
|---|---------|----------|
| P1 | Theme is "dark-only by brute force". Tailwind light classes (`bg-white`, `text-gray-900`) are overridden with `!important` dark rules in `styles.css`. No light mode, and styles are fragile. | `section, .bg-white { background:#23262b !important }` |
| P2 | Tailwind CDN script (~300 KB, render-blocking) used in production, plus duplicate Lucide script tags, ECharts loaded but unused. | `<script src="https://cdn.tailwindcss.com">` |
| P3 | Visual identity is generic "blue admin dark". No design tokens, no typographic scale, inconsistent radius/shadows. | hardcoded `#23262b`, `#2563eb` everywhere |
| P4 | Motion is minimal: one fade-in class reused everywhere; no scroll narrative, no staggering, no hero motion beyond mouse glow. | `initScrollAnimations()` |
| P5 | Mobile has patch-style media queries (`nav.fixed { position: static }` kills sticky nav; forced `!important` paddings). No mobile menu at all — nav links disappear under `md:`. | `styles.css` mobile block |
| P6 | Performance: favicon is 644 KB PNG; hero image is a large PNG; no `loading="lazy"`; Google Fonts not preloaded. | `favicon.PNG`, `public/img/*` |
| P7 | No `prefers-reduced-motion`, weak focus states, decorative headings not semantic in some renders. | global |

---

## 2. Astryx Design Language (extracted from astryx.atmeta.com)

Verified by live screenshots (light + dark) and computed CSS tokens:

- Token pattern: CSS custom properties with `light-dark()`, e.g.
  `--color-background-body: light-dark(#F8F4ED, #111112)`
  `--color-accent: light-dark(#15110C, #DFE2E5)`
  feature card bg: `light-dark(#e6f0ff, #1a2333)`
- Light mode: warm cream `#F8F4ED` body, near-black ink `#15110C`, soft blue-tinted cards `#E6F0FF`, royal blue brand (~`#2B4AC9`), pastel chips (pink / lilac / butter yellow).
- Dark mode: near-black `#111112` body, navy-tinted cards `#1A2333`, soft grey text `#DFE2E5`.
- Type: Figtree for body/UI, Poppins 600 for headings; very large hero display type; short punchy headline lines ("Start anywhere. Change anything. Ship faster.").
- Shape: pill buttons (`radius-full`), 12 px control radius, 20–28 px card radius, and the signature "big rounded sheet" — the whole content area sits on a large rounded surface over the page background.
- Layout: bento grid feature cards, generous spacing (`--astryx-marketing-section-gap: 100px`), thin subtle borders instead of heavy shadows.
- Motion feel: calm, small distances, ease-out, content "settles" rather than flies.

---

## 3. Target Architecture

Keep it simple: static site, no framework, no build step.

```text
index.html            new shell: skip link, sticky nav + theme toggle + mobile menu,
                      hero, section slots (order unchanged), footer
styles/tokens.css     design tokens: colors (light-dark), type scale, spacing,
                      radius, shadows, motion durations/easings
styles/main.css       base + layout + components, mobile-first, no Tailwind
styles/motion.css     reveal system, scroll-driven animations, reduced-motion rules
script.js             theme manager, scroll narrative engine, nav, marquee, modal, counters
content-loader.js     same data flow, templates updated to new class names
content/*.json        UNCHANGED
```

Removed: Tailwind CDN, ECharts, duplicate Lucide tag, Pacifico font.
Added: Figtree + Poppins via Google Fonts (preloaded, `display=swap`).

### 3.1 Theming (dark / light)

- All colors defined once in `tokens.css` using the Astryx palette above.
- Mechanism: `:root { color-scheme: light dark }` + `light-dark()` values,
  controlled by `data-theme="light" | "dark" | (absent = system)` on `<html>`.
- Toggle button in nav (sun/moon), choice saved to `localStorage`,
  default follows `prefers-color-scheme`. Inline head script applies the saved
  theme before first paint to avoid flash.
- Company logos: swap light/dark logo variants via `data-theme` CSS.
  DECIDED (owner approved): official light-background variants were fetched
  from the live sites and saved to `public/company_icon/`:
  - `freelancer-logo-dark.svg` — official fullcolor logo (blue bird `#29B2FE`,
    dark navy wordmark `#161F2B`) from `f-cdn.com` (freelancer.com production asset)
  - `loadshift-logo-navy.svg` — official navy wordmark (`#1F376B`) used on the
    light header of loadshift.com.au (freightlancer asset folder)
  Alibaba / Alibaba Cloud logos are orange on transparent and work on both
  themes without change. No colour-chip fallback is needed; if a future logo
  has no official variant, the fallback is to recolour the SVG fills directly.

### 3.2 Scroll narrative engine ("scrollytelling")

Goal: the whole resume reads as one continuous story by simply scrolling.

1. Chapter structure. Each section becomes a "chapter" with a consistent
   header pattern: kicker label (e.g. `01 — Experience`), big Poppins headline,
   one-line sub. A thin scroll progress bar sits under the nav, and the active
   chapter is highlighted in the nav.
2. Reveal system (works everywhere): one IntersectionObserver drives
   `data-reveal` elements with variants `fade-up`, `fade-in`, `scale-in`,
   `slide-left/right` and `data-reveal-delay` stagger steps (60–90 ms).
3. Scroll-driven extras (progressive enhancement, CSS
   `animation-timeline: view()` with `@supports` guard, IO fallback):
   - hero: headline settles with letter/word stagger; dot grid drifts slowly
     (parallax); company logo chips stagger in
   - experience timeline: vertical line "draws" downward as you scroll;
     each entry's dot pops when it enters
   - achievements: counters count up (keep), stat cards stagger
   - big rounded sheet: hero is full-bleed on body background; the rest of the
     page sits on the Astryx-style rounded surface that slides up over the hero
4. Restraint rules: max one moving idea per viewport; distances <= 24 px;
   durations 300–600 ms; `ease-out` for entry; everything disabled under
   `prefers-reduced-motion: reduce` (jump to final state).

### 3.3 Section-by-section redesign

| Section | Redesign |
|---|---|
| Nav | Floating pill nav (Astryx style): blur backdrop, subtle border, name left, links center, theme toggle right. Mobile: hamburger opening a full-screen sheet menu with staggered links. Stays sticky on mobile (fixes P5). |
| Hero | Full-viewport chapter. Giant Poppins headline (name + role), highlight keywords as pastel Astryx chips instead of dark `text-highlight` spans. Keep dot grid + mouse glow (theme-aware). Company logos as bordered chips. Two pill CTAs (Portfolio / terminal site). Scroll cue arrow. |
| Work History | Bento grid (2 wide cards): logo chip, intro, responsibilities. Card = Astryx feature card (`#E6F0FF` / `#1A2333`). |
| Experience | Timeline with scroll-drawn line; entries as sheet cards; period as pill badge; image thumbnails in rounded mini-bento with existing modal carousel. |
| Projects | 3-col bento; image zoom-on-hover inside rounded mask; pill "Learn More" buttons; pastel tag chips. |
| Achievements | 4 stat tiles with count-up; patents/impact as two list cards with icon chips. |
| Education | Two simple bordered cards. |
| Contact | 3 icon chips row; hover lift. |
| Product Videos | Keep grid; thumbnails in rounded masks with play badge; lazy-loaded. |
| About + Capabilities | Keep tabs but restyle as Astryx segmented control; content crossfades. |
| Testimonials | Keep dual-direction marquee; theme-aware edge fades; pause on hover; slower on mobile; `loading="lazy"`. |
| Footer | Simple 3-column on the sheet edge; small type; social/contact rows. |

Content note: only micro-copy that the layout needs may change (e.g. hero
headline split into two lines, kicker labels like "01 — Experience"). All facts,
lists, links, images stay identical. Chapter number labels are owner approved.

### 3.4 Mobile-first rules

- Base styles are mobile; `min-width` queries add desktop layout (reverse of today).
- Sticky nav with sheet menu; 44 px minimum touch targets.
- Bento grids collapse to single column; timeline keeps the drawn line.
- Marquee cards sized ~80vw; hero type scales with `clamp()`.
- No `!important` layout patches; spacing via tokens.

### 3.5 Performance and a11y quick wins

- Replace 644 KB `favicon.PNG` with a 32/180 px PNG set (or SVG).
- Convert hero/about PNGs to WebP (~80 % smaller), `loading="lazy"` +
  `decoding="async"` on all below-fold images, explicit width/height.
- Preconnect + preload the two font families; remove ECharts and duplicate Lucide.
- `prefers-reduced-motion` support, visible focus rings using the brand blue,
  skip-to-content link, correct heading order.

---

## 4. Implementation Phases

| Phase | Work | Output |
|---|---|---|
| 1. Foundation | `tokens.css`, fonts, theme manager + toggle, new nav (desktop + mobile sheet) | theme switching works end to end |
| 2. Shell + Hero | new `index.html` shell, rounded-sheet layout, hero rebuild with motion | first screen matches Astryx feel |
| 3. Sections | update all `content-loader.js` templates + section CSS | all 11 sections restyled, JSON untouched |
| 4. Motion | reveal engine, scroll-drawn timeline, stagger, progress bar, reduced-motion | scroll narrative complete |
| 5. Polish | image compression, lazy-loading, favicon, a11y pass, cross-device QA | ship-ready |

Each phase ends with local verification: `python3 -m http.server 8000`,
check light + dark, 375 px / 768 px / 1280 px widths, and
`prefers-reduced-motion` emulation.

## 5. Risks

- Rewriting templates without Tailwind classes touches every render function in
  `content-loader.js` — mitigated by keeping function signatures and JSON schema
  identical, changing only the HTML strings.
- ~~White company SVG logos need light-mode handling~~ Resolved: official
  dark-on-light variants downloaded and stored in `public/company_icon/`.
- `animation-timeline: view()` is not in all browsers — always paired with the
  IntersectionObserver fallback, so no browser loses the reveal effect.
- `legacy-static/`, `nextjs-portfolio/`, `html/` are untouched.
