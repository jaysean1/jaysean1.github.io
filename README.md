# jaysean1.github.io

## Overview
This repository hosts the personal website at `jayseanqian.com`.
The active site is a static GitHub Pages site served from the repository root.

Use this README as the repo index and workflow guide. Resume and portfolio content lives in the site files, JSON content files, and `personalinfo/`.

## Active Site
- `index.html` is the active static site entry page.
- `styles.css` contains the root site styles.
- `script.js` contains root site interactions.
- `content-loader.js` loads structured content from `content/*.json`.
- `CNAME` points GitHub Pages to `jayseanqian.com`.

## Directory Map
- `content/` - Structured JSON content for about, experience, projects, contact, videos, testimonials, and related page sections.
- `public/` - Image and visual assets used by the active static site.
- `personalinfo/` - Resume and CV source files, including PDF, Markdown, and LaTeX versions.
- `legacy-static/` - Earlier modular static website version kept for reference.
- `nextjs-portfolio/` - Experimental Next.js portfolio implementation.
- `html/` - Standalone HTML experiments and demos.
- `memory.md` - Current repo notes and recent decisions.
- `archive.md` - Older site history.

## Local Preview
Serve the root site through a local HTTP server. Do not open `index.html` directly with `file://`, because JSON content loading can fail.

```bash
python3 -m http.server 8000
```

Open:

```text
http://localhost:8000
```

For the Next.js experiment:

```bash
cd nextjs-portfolio
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Editing Guide
- Update most portfolio content in `content/*.json`.
- Update the hero section and page shell in `index.html`.
- Update visual styling in `styles.css`.
- Update interactions in `script.js`.
- Update JSON rendering logic in `content-loader.js`.
- Keep reusable images under `public/`.
- Keep resume source documents under `personalinfo/`.

## Verification
Before publishing:

1. Run a local HTTP server from the repo root.
2. Check the home page in a browser.
3. Confirm JSON-driven sections load correctly.
4. Check responsive layout on mobile and desktop widths.
5. Run Git commands from this repository folder, not from the workspace root.

## Deployment
The root static site is deployed by GitHub Pages from this repository.
Changes to the active root site should be committed and pushed from this folder.
