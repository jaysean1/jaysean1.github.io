# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Sui Qian's personal resume portfolio website hosted on GitHub Pages. The repository contains:

1. **Main Portfolio Website** (root files) - A refactored static site with separated CSS, JS, and JSON content management
2. **Interactive MediaPipe Demo** (`html/mediapipe/`) - A 3D hand tracking application using MediaPipe and Three.js

> **Note:** The `nextjs-portfolio/` folder exists in the repository but is not the active site. The `legacy-static/` folder contains the old single-file reference. The currently active site uses the refactored multi-file structure at the root.

## Website Architecture (Current)

The site is a **pure static site** (no build system, no Node.js). Content is managed via JSON files loaded at runtime.

### File Structure
```
/index.html         — ~187-line skeleton HTML (hero hardcoded, all other sections are content slots)
/styles.css         — All custom CSS (~725 lines, extracted from the old inline <style> block)
/script.js          — All interactive JS features (~360 lines, exposes initAllFeatures() globally)
/content-loader.js  — Fetches JSON files and renders each section into content slots (~400 lines)
/content/
  manifest.json     — Lists all sections and their JSON file paths
  videos.json       — Product video grid (YouTube embeds)
  projects.json     — Selected owner projects
  about.json        — About Me text, skill cards, profile image
  capabilities.json — Capability Map (5 tabs: Product Design, Innovation, Agile, Commercialisation, Technical)
  work-history.json — Work History cards (Alibaba + eBanma)
  experience.json   — Timeline experience (5 entries with images)
  achievements.json — Counter stats, patents, industry impact
  education.json    — Education background
  contact.json      — Contact details
  testimonials.json — Photo carousel rows
  footer.json       — Footer links and contact info
/public/            — Static assets (unchanged)
/favicon.PNG        — Site favicon
/legacy-static/     — Reference copy of the original single-file version
```

### How Content Loading Works
1. `content-loader.js` fires on `DOMContentLoaded`
2. Fetches `content/manifest.json` to get all section file paths
3. Parallel-fetches all JSON files with `Promise.all()`
4. Calls each `render*()` function to build HTML and inject into `[data-section="..."]` slots
5. Calls `initAllFeatures()` from `script.js` after all content is in the DOM

### Key Rules for Editing
- **To update content** (text, links, images): edit the relevant `content/*.json` file
- **To update styles**: edit `styles.css`
- **To update interactions** (animations, tabs, modals): edit `script.js`
- **To update section HTML structure**: edit the `render*()` functions in `content-loader.js`
- **Hero section** is hardcoded in `index.html` (intentional — no loading delay for first screen)
- **`⚠️ DO NOT`** add `<script>` or `<style>` blocks back into `index.html`

### Capability Tabs
- Tab buttons use `data-tab` attribute (NOT `data-target`)
- Content panels use matching `id` values (e.g. `id="product-design"`)

### Toast Notifications
- `showToast()` uses positional args: `showToast(title, description, actionText, actionCallback)`

## External Dependencies (all via CDN)
- TailwindCSS — utility classes
- Font Awesome 6.4.0 — icons
- ECharts 5.5.0 — charts
- Lucide Icons — tab icons (initialised via `lucide.createIcons()`)
- Google Fonts (Pacifico)
- Google Analytics (G-J4RKB1D6WY)

## Visual Theme
```css
/* Dark theme colour palette */
background: #15171a (main)
sections: #23262b (content areas)
text: #f4f4f5 (primary)
accent: #2563eb (primary blue)
secondary: #60a5fa (hover blue)
```

## Testing Locally
```bash
# Must use an HTTP server — JSON fetch will fail with file:// protocol
cd /Users/jayseanqian/Desktop/on_board/jaysean1.github.io
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deployment
- **Active Site**: GitHub Pages serving `index.html` from root
- **Domain**: jayseanqian.com
- **Branch**: main (auto-deployed)

## MediaPipe Demo
- **Location**: `html/mediapipe/`
- **Interactive 3D visualisation** using Three.js and MediaPipe Hands
- Must be served via HTTPS or localhost for camera access
- Chinese debug messages in the demo code

## Important Notes
- All dependencies loaded via CDN (no local npm packages, no build step)
- Responsive design optimised for various screen sizes
- Google Analytics tracking enabled (G-J4RKB1D6WY)
- Resume content source of truth is `README.md` at repository root
- Image paths in JSON files are relative to the site root (e.g. `public/img/about-me.png`)
