# Sui Qian Portfolio - Next.js

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS, showcasing professional experience as a Senior Internet Product Manager and Technical Product Leader.

## Features

- ⚡ Built with Next.js 14 and TypeScript for type safety and performance
- 🎨 Styled with Tailwind CSS for responsive design
- 🖼️ Optimized images with Next.js Image component
- 📱 Fully responsive design for mobile, tablet, and desktop
- 🎭 Smooth animations and interactive elements
- 🎯 SEO optimized with proper meta tags
- 🔧 Interactive component library with tabs, carousels, and modals

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **Image Optimization**: Next.js Image

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd nextjs-portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
nextjs-portfolio/
├── app/                    # Next.js 14 app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── sections/          # Page sections (Hero, About, etc.)
│   └── ui/               # Reusable UI components
├── lib/                  # Utility functions and data
│   └── data.ts           # Site content and configuration
├── types/                # TypeScript type definitions
│   └── index.ts          # Type definitions
└── public/               # Static assets
    └── images/           # Image assets
```

## Customization

### Content

Edit the content in `lib/data.ts` to customize:
- Personal information
- Work experience
- Projects
- Skills and capabilities
- Contact information

### Styling

The project uses Tailwind CSS with custom theme extensions in `tailwind.config.js`:
- Custom colors
- Animation keyframes
- Component styles

### Components

Each section is a separate component in `components/sections/`:
- `Hero.tsx` - Landing section with introduction
- `ProductVideos.tsx` - Video portfolio grid
- `Projects.tsx` - Featured projects showcase
- `About.tsx` - About section with capability tabs
- `Experience.tsx` - Work experience timeline
- `Contact.tsx` - Contact information
- `Testimonials.tsx` - Image carousel

## Performance

- Image optimization with Next.js Image component
- Code splitting with Next.js dynamic imports
- Responsive image loading
- SEO optimization with proper meta tags

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com/):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

## License

This project is for personal portfolio use.