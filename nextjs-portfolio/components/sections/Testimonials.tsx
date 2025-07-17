'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { siteData } from '@/lib/data';
import FadeInSection from '@/components/ui/FadeInSection';

export default function Testimonials() {
  const { testimonialImages } = siteData;
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setupCarousel = () => {
      const rows = [row1Ref.current, row2Ref.current];
      
      rows.forEach((row, index) => {
        if (!row) return;
        
        // Reset animation
        row.style.animation = 'none';
        row.offsetHeight; // Trigger reflow
        
        // Get original images
        const originalImages = Array.from(row.querySelectorAll('.testimonial-image'));
        
        // Clear existing clones
        row.querySelectorAll('.clone-image').forEach(clone => clone.remove());
        
        // Clone images for seamless loop
        originalImages.forEach(image => {
          const clone = image.cloneNode(true) as HTMLElement;
          clone.classList.add('clone-image');
          row.appendChild(clone);
        });
        
        // Apply animation
        const animationName = index === 0 ? 'scroll-left' : 'scroll-right';
        row.style.animation = `${animationName} 30s linear infinite`;
        
        // Calculate total width and adjust animation speed
        const totalWidth = row.scrollWidth / 2; // Half because we have duplicated content
        const speed = Math.max(totalWidth / 60, 20); // Minimum 20s
        row.style.animationDuration = `${speed}s`;
        
        // Pause on hover
        row.addEventListener('mouseenter', () => {
          row.style.animationPlayState = 'paused';
        });
        
        row.addEventListener('mouseleave', () => {
          row.style.animationPlayState = 'running';
        });
      });
    };

    // Preload images before starting animation
    const preloadImages = (imageElements: Element[]) => {
      return Promise.all(Array.from(imageElements).map(imgElement => {
        const img = imgElement.querySelector('img');
        if (!img) return Promise.resolve();
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve; // Continue even if some images fail
        });
      }));
    };

    // Wait for images to load, then setup carousel
    const allImages = document.querySelectorAll('.testimonial-image');
    preloadImages(Array.from(allImages)).then(() => {
      setupCarousel();
    });

    window.addEventListener('resize', setupCarousel);
    
    return () => window.removeEventListener('resize', setupCarousel);
  }, []);

  return (
    <section id="testimonials" className="py-20 section-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          {/* Testimonials Carousel Container */}
          <div className="testimonials-carousel-container">
            {/* First Row */}
            <div ref={row1Ref} className="testimonials-row">
              {testimonialImages.row1.map((image, index) => (
                <div
                  key={index}
                  className="testimonial-image"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={480}
                    height={320}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            
            {/* Second Row */}
            <div ref={row2Ref} className="testimonials-row">
              {testimonialImages.row2.map((image, index) => (
                <div
                  key={index}
                  className="testimonial-image"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={480}
                    height={320}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            
            {/* Gradient overlays */}
            <div className="testimonials-shade-left"></div>
            <div className="testimonials-shade-right"></div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}