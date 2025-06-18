'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { siteData } from '@/lib/data';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { personalInfo } = siteData;

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      heroElement.style.setProperty('--mouse-x', `${x}px`);
      heroElement.style.setProperty('--mouse-y', `${y}px`);
    };

    heroElement.addEventListener('mousemove', handleMouseMove);
    return () => heroElement.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative h-[60vh] flex items-center justify-center bg-[#191c20] hero-highlight-container group"
    >
      {/* Background patterns */}
      <div className="dot-pattern"></div>
      <div className="mouse-highlight"></div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between h-full gap-8">
          {/* Left side - Text content */}
          <div className="text-left w-full lg:w-1/2 flex flex-col justify-center h-full">
            <h1 className="text-5xl font-bold text-white mb-4">
              {personalInfo.name}
            </h1>
            <h2 className="text-3xl font-semibold text-gray-200 mb-6">
              {personalInfo.title}
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent font-bold">
                {personalInfo.yearsExperience} years
              </span>{' '}
              of product experience |{' '}
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent font-bold">
                AI
              </span>{' '}
              &{' '}
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent font-bold">
                IoT Expert
              </span>
            </p>
            
            {/* Company logos */}
            <div className="company-logos flex flex-wrap gap-6 mb-6">
              {personalInfo.companies.map((company, index) => (
                <div
                  key={index}
                  className="company-logo flex items-center bg-card rounded-lg p-3 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Image
                    src={company.logo}
                    alt={`${company.name} Logo`}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-2">
              <a
                href="https://www.notion.so/qiansui/Sui-Qian-Portfolio-c6be6c3fe60c420faf915f35f73bb408"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-button bg-primary text-white font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Project Detail
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
          
          {/* Right side - Hero image */}
          <div className="w-full lg:w-1/2 flex justify-center items-center h-full">
            <Image
              src={personalInfo.heroImage}
              alt="Hero Image"
              width={400}
              height={380}
              className="max-w-md w-full h-[320px] lg:h-[380px] rounded-2xl shadow-lg object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}