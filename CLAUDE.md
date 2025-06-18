# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Sui Qian's personal resume portfolio website hosted on GitHub Pages. The repository contains:

1. **Main Portfolio Website** (`index.html`) - A comprehensive HTML/CSS/JavaScript personal resume website with dark theme
2. **Interactive MediaPipe Demo** (`html/mediapipe/`) - A 3D hand tracking application using MediaPipe and Three.js

## Architecture

### Main Website Structure
- **Single-page application** built with vanilla HTML, CSS, and JavaScript
- **Dark theme** with custom styling (`#15171a` background, `#23262b` section backgrounds)
- **External dependencies**: TailwindCSS (CDN), Font Awesome, ECharts, Lucide Icons, Google Fonts
- **Analytics**: Google Analytics integration (gtag.js)
- **Responsive design** with smooth scrolling and fade-in animations

### MediaPipe Demo Structure
- **Interactive 3D visualization** using Three.js and MediaPipe Hands
- **Real-time hand tracking** with gesture controls:
  - Right hand pinch controls sphere size
  - Right hand rotation controls sphere rotation  
  - Left hand index finger touch changes sphere color
- **Draggable camera feed** overlay with hand landmarks visualization
- **Smooth animations** with configurable smoothing factors

## Key Technologies

### Main Website
- **Styling**: TailwindCSS via CDN with custom configuration
- **Charts**: ECharts for data visualization
- **Icons**: Font Awesome + Lucide Icons
- **Typography**: Google Fonts (Pacifico)

### MediaPipe Demo
- **Computer Vision**: MediaPipe Hands (via CDN)
- **3D Graphics**: Three.js (via CDN)
- **Materials**: MeshPhysicalMaterial with transmission and clearcoat effects
- **Hand Tracking**: Supports up to 2 hands with landmark detection

## Development Workflow

### No Build Process
This is a static website that runs directly in the browser without any build tools or package managers.

### Testing the Main Website
```bash
# Serve locally (any HTTP server)
python -m http.server 8000
# or
npx serve .
```

### Testing MediaPipe Demo
```bash
# Must serve via HTTPS or localhost for camera access
# MediaPipe demo is at: html/mediapipe/index.html
```

### Deployment
- **Hosting**: GitHub Pages
- **Domain**: jaysean1.github.io
- **Branch**: main (auto-deployed)

## File Organization

- `/index.html` - Main portfolio website
- `/public/` - Static assets (images, icons, company logos)
  - `/img/` - General images and screenshots
  - `/company_icon/` - Company logos for work experience
  - `/row_1/`, `/row_2/` - Grid layout images
  - `/timeline/` - Work experience timeline images organized by company
- `/html/mediapipe/` - Interactive 3D hand tracking demo
  - `index.html` - Demo HTML structure
  - `main.js` - Hand tracking and Three.js logic
  - `style.css` - Demo-specific styling
- `/favicon.PNG` - Website favicon

## Configuration Details

### Hand Tracking Parameters
```javascript
// MediaPipe Hands configuration
maxNumHands: 2
modelComplexity: 1
minDetectionConfidence: 0.7
minTrackingConfidence: 0.5

// Interaction smoothing
smoothingFactor: 0.1 (sphere scaling)
rotationSmoothingFactor: 0.05 (rotation)
colorChangeDelay: 500ms
```

### Visual Theme
```css
/* Dark theme color palette */
background: #15171a (main)
sections: #23262b (content areas)
text: #f4f4f5 (primary)
accent: #2563eb (primary blue)
secondary: #60a5fa (hover blue)
```

## Important Notes

- Camera permission required for MediaPipe demo
- All dependencies loaded via CDN (no local npm packages)
- Responsive design optimized for various screen sizes
- Chinese debug messages in MediaPipe demo code
- Google Analytics tracking enabled (G-J4RKB1D6WY)