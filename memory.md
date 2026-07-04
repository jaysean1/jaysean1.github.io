# Memory

This file stores current facts and recent decisions for `jaysean1.github.io/`.
Long-term resume content and site workflow details belong in `README.md` and `AGENTS.md`.

## Active Projects and Work

- 2026-07: Astryx-style frontend redesign implemented (plan: `.doc/astryx_redesign/redesign_plan.md`).
  - Tailwind CDN removed; styles now live in `styles/tokens.css`, `styles/main.css`, `styles/motion.css`.
  - Light/dark themes via `data-theme` on `<html>` + localStorage; default follows system.
  - Company logos swap per theme: `freelancer-logo-dark.svg` / `loadshift-logo-navy.svg` (official assets fetched from f-cdn.com) in light mode, white variants in dark mode.
  - Scroll narrative: numbered chapters, reveal engine (`[data-reveal]`), scroll progress bar, timeline draw effect; all disabled under `prefers-reduced-motion`.
  - Content JSON unchanged except `about.json` image path now points to optimised `about-me.jpg`.
  - Old `styles.css` deleted; hero image optimised to `public/img/hero-portrait.jpg`; favicon to `favicon-64.png`.

- 2026-07-05: SEO + LLM optimisation pass.
  - Added `llms.txt` (canonical agent-readable profile), `robots.txt` (AI crawlers allowed), `sitemap.xml`.
  - `index.html`: canonical, Open Graph, Twitter Card, JSON-LD Person schema, `<noscript>` profile summary fallback.
  - Hero: "Tell your agent with a ready-to-use prompt" copy pill (aisa.one style); copy logic in `script.js` (`initAgentPrompt`), styles in `main.css` (`.hero__agent`, `.agent-prompt`).
  - Content JSON: meaningful image alt texts, footer copyright to 2026, fixed dead `#personal-projects` link, added llms.txt footer link.
  - Remember: when resume facts change, update `content/*.json` AND `llms.txt` together.
  - Hero layout v2: kicker and role lines removed from visible hero (kept as `.sr-only` text for SEO/a11y); agent prompt pill sits between the H1 and the highlight chips, label reuses the Astryx brand-dash kicker motif; `.hero__copy { min-width: 0 }` prevents the nowrap prompt text from blowing out the grid on mobile.

## Scheduled Tasks

- No `jaysean1.github.io/` scheduled task memory has been recorded yet.

## Core Memory

- This repo publishes the personal portfolio site.
- `README.md` is a content source for resume and portfolio facts.
