# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Sui Qian's personal resume portfolio website hosted on GitHub Pages. The repository contains:

1. **Main Portfolio Website** (`index.html`) - A comprehensive HTML/CSS/JavaScript personal resume website with dark theme
2. **Next.js Portfolio** (`nextjs-portfolio/`) - A modern React/Next.js version of the portfolio with enhanced features
3. **Interactive MediaPipe Demo** (`html/mediapipe/`) - A 3D hand tracking application using MediaPipe and Three.js

## Architecture

### Next.js Portfolio Structure (Primary)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom configuration
- **Components**: Modular React components in `/components/sections/`
- **UI Components**: Reusable UI elements in `/components/ui/`
- **Data Management**: Centralized data structure in `/lib/data.ts`
- **Type Definitions**: Comprehensive TypeScript types in `/types/index.ts`

#### Key Components
- `Hero.tsx` - Landing section with interactive background effects
- `ProductVideos.tsx` - YouTube video showcase with grid layout
- `Projects.tsx` - Project portfolio with external links
- `About.tsx` - Personal information with capability tabs
- `Experience.tsx` - Work timeline with image galleries and modal popup
- `Achievements.tsx` - Animated statistics and patent information
- `Education.tsx` - Educational background display
- `Contact.tsx` - Contact information and social links
- `Testimonials.tsx` - Infinite scrolling image carousel
- `ImageModal.tsx` - Reusable image lightbox with navigation
- `CapabilityTabs.tsx` - Interactive skill showcase tabs
- `FadeInSection.tsx` - Intersection Observer based animations

#### Features
- **Image Modals**: Click-to-view lightbox for experience images
- **Infinite Carousel**: Smooth scrolling testimonial galleries
- **Animated Counters**: Number animation for achievements
- **Interactive Tabs**: Capability map with smooth transitions
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Dark Theme**: Consistent `#15171a` background with `#23262b` cards

### Legacy Static Website Structure
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

### Next.js Portfolio (Modern Stack)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React icons
- **Images**: Next.js Image optimization
- **Animations**: CSS animations with Intersection Observer
- **Build**: Turbopack (dev) / Webpack (production)

### Legacy Website
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

### Next.js Portfolio Development
```bash
cd nextjs-portfolio

# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Legacy Website Testing
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

### Deployment
- **Next.js**: Can be deployed to Vercel, Netlify, or GitHub Pages (with static export)
- **Legacy**: GitHub Pages
- **Domain**: jaysean1.github.io
- **Branch**: main (auto-deployed)

## File Organization

### Next.js Portfolio (`/nextjs-portfolio/`)
```
nextjs-portfolio/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Home page with all sections
├── components/
│   ├── sections/            # Main page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Achievements.tsx
│   │   ├── Education.tsx
│   │   ├── ProductVideos.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx
│   │   └── Testimonials.tsx
│   └── ui/                  # Reusable UI components
│       ├── CapabilityTabs.tsx
│       ├── FadeInSection.tsx
│       ├── ImageModal.tsx
│       ├── Toast.tsx
│       └── ToastContainer.tsx
├── lib/
│   └── data.ts              # Centralized data structure
├── types/
│   └── index.ts             # TypeScript type definitions
├── public/
│   └── images/              # Static assets (same structure as root)
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── next.config.js          # Next.js configuration
```

### Legacy Structure
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

### Next.js Specific Configuration
```javascript
// tailwind.config.js - Custom design tokens
colors: {
  primary: '#2563eb',
  secondary: '#3b82f6', 
  background: '#15171a',
  card: '#23262b',
  'text-primary': '#f4f4f5',
  'text-secondary': '#e0e7ef'
}

// CSS animations
@keyframes scroll-left / scroll-right // Infinite carousel
.fade-in // Intersection Observer animations
.capability-tabs // Interactive tab system
.image-modal // Lightbox functionality
```

### Data Structure (TypeScript)
```typescript
interface SiteData {
  personalInfo: PersonalInfo;
  projectVideos: ProjectVideo[];
  projects: Project[];
  workExperience: WorkExperience[];
  capabilities: Capability[];
  achievements: Achievement[];
  patents: Patent[];
  education: Education[];
  contact: ContactInfo;
  testimonialImages: TestimonialImages;
}
```

### Hand Tracking Parameters (MediaPipe)
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

### Next.js Portfolio
- **Modern Stack**: Built with latest React 18, Next.js 14, TypeScript
- **Performance**: Optimized images, lazy loading, code splitting
- **Accessibility**: Proper ARIA labels, keyboard navigation
- **SEO**: Meta tags, semantic HTML structure
- **Animations**: Smooth transitions, Intersection Observer
- **Responsive**: Mobile-first design with Tailwind breakpoints

### Legacy Website
- Camera permission required for MediaPipe demo
- All dependencies loaded via CDN (no local npm packages)
- Responsive design optimized for various screen sizes
- Chinese debug messages in MediaPipe demo code
- Google Analytics tracking enabled (G-J4RKB1D6WY)

### Development Tips
- **Next.js**: Use `npm run dev` for hot reloading during development
- **Image Paths**: Ensure images in `/public/images/` match data structure paths
- **TypeScript**: Strict typing enforced - check types in `/types/index.ts`
- **Styling**: Custom CSS classes defined in `globals.css` for complex animations
- **Components**: Each section is self-contained with its own state management