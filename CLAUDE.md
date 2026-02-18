# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Sui Qian's personal resume portfolio website hosted on GitHub Pages. The repository contains:

1. **Main Portfolio Website** (`index.html`) - A comprehensive HTML/CSS/JavaScript personal resume website with dark theme (legacy static site, currently active)
2. **Interactive MediaPipe Demo** (`html/mediapipe/`) - A 3D hand tracking application using MediaPipe and Three.js

> **Note:** The `nextjs-portfolio/` folder exists in the repository but is not the active site. The currently deployed website is `index.html` (legacy static version).

## Legacy Static Website Structure
- **Single-page application** built with vanilla HTML, CSS, and JavaScript
- **Dark theme** with custom styling (`#15171a` background, `#23262b` section backgrounds)
- **External dependencies**: TailwindCSS (CDN), Font Awesome, ECharts, Lucide Icons, Google Fonts
- **Analytics**: Google Analytics integration (gtag.js)
- **Responsive design** with smooth scrolling and fade-in animations

## MediaPipe Demo Structure
- **Interactive 3D visualization** using Three.js and MediaPipe Hands
- **Real-time hand tracking** with gesture controls:
  - Right hand pinch controls sphere size
  - Right hand rotation controls sphere rotation
  - Left hand index finger touch changes sphere color
- **Draggable camera feed** overlay with hand landmarks visualisation
- **Smooth animations** with configurable smoothing factors

## Legacy Website Testing
```bash
# Serve locally (any HTTP server)
python -m http.server 8000
# or
npx serve .
```

### MediaPipe Demo Testing
```bash
# Must serve via HTTPS or localhost for camera access
# MediaPipe demo is at: html/mediapipe/index.html
```

## Deployment
- **Active Site**: GitHub Pages serving `index.html` from root
- **Domain**: jaysean1.github.io
- **Branch**: main (auto-deployed)

## File Organisation

### Legacy Structure
- `/index.html` - Main portfolio website
- `/public/` - Static assets (images, icons, company logos)
  - `/img/` - General images and screenshots
  - `/company_icon/` - Company logos for work experience
  - `/row_1/`, `/row_2/` - Grid layout images
  - `/timeline/` - Work experience timeline images organised by company
- `/html/mediapipe/` - Interactive 3D hand tracking demo
  - `index.html` - Demo HTML structure
  - `main.js` - Hand tracking and Three.js logic
  - `style.css` - Demo-specific styling
- `/favicon.PNG` - Website favicon

## Visual Theme
```css
/* Dark theme colour palette */
background: #15171a (main)
sections: #23262b (content areas)
text: #f4f4f5 (primary)
accent: #2563eb (primary blue)
secondary: #60a5fa (hover blue)
```

## Important Notes

### Legacy Website
- Camera permission required for MediaPipe demo
- All dependencies loaded via CDN (no local npm packages)
- Responsive design optimised for various screen sizes
- Chinese debug messages in MediaPipe demo code
- Google Analytics tracking enabled (G-J4RKB1D6WY)
- Resume content is maintained in `README.md` at the repository root
