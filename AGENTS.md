# AGENTS.md

This file is the agent entry point for `jaysean1.github.io/`.

## README First

- Read `README.md` first for resume and portfolio content facts.
- Treat `README.md` as content source, not as the full development workflow.
- Keep current site notes in `memory.md`; keep old site history in `archive.md`.

## Agent Rules

- The active site is a static GitHub Pages site at the repo root.
- Content sections are mostly managed through `content/*.json`; the hero section is in `index.html`.
- Edit styles in `styles.css`, interactions in `script.js`, and JSON rendering in `content-loader.js`.
- Do not add inline `<script>` or `<style>` blocks back into `index.html`.
- Serve the site through a local HTTP server before browser testing because JSON fetches fail under `file://`.
- Run Git commands from this folder.
