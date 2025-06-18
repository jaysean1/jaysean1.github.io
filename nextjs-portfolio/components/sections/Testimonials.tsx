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
        
        // Pause on hover
        row.addEventListener('mouseenter', () => {
          row.style.animationPlayState = 'paused';
        });
        
        row.addEventListener('mouseleave', () => {
          row.style.animationPlayState = 'running';
        });
      });
    };

    setupCarousel();
    window.addEventListener('resize', setupCarousel);
    
    return () => window.removeEventListener('resize', setupCarousel);
  }, []);

  return (
    <section id="testimonials" className="py-20 section-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          {/* Testimonials Carousel Container */}
          <div className="relative w-full overflow-hidden py-5 mb-10">
            {/* First Row */}
            <div ref={row1Ref} className="flex gap-5 py-5 px-20 overflow-hidden w-fit mb-5">
              {testimonialImages.row1.map((image, index) => (
                <div
                  key={index}
                  className="testimonial-image flex-shrink-0 w-[480px] h-80 overflow-hidden rounded-xl shadow-md bg-gray-100"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={480}
                    height={320}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
            
            {/* Second Row */}
            <div ref={row2Ref} className="flex gap-5 py-5 px-20 overflow-hidden w-fit">
              {testimonialImages.row2.map((image, index) => (
                <div
                  key={index}
                  className="testimonial-image flex-shrink-0 w-[480px] h-80 overflow-hidden rounded-xl shadow-md bg-gray-100"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={480}
                    height={320}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
            
            {/* Gradient overlays */}
            <div className="absolute top-0 bottom-0 left-0 w-30 pointer-events-none z-10 bg-gradient-to-r from-card to-transparent"></div>
            <div className="absolute top-0 bottom-0 right-0 w-30 pointer-events-none z-10 bg-gradient-to-l from-card to-transparent"></div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}