'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { siteData } from '@/lib/data';
import CapabilityTabs from '@/components/ui/CapabilityTabs';
import FadeInSection from '@/components/ui/FadeInSection';

export default function About() {
  const { personalInfo, capabilities } = siteData;

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-20 section-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <h2 className="text-3xl font-bold text-center text-white mb-16">
            About Me
          </h2>
          
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-3/5 pr-8">
              <div
                className="text-lg text-text-secondary mb-6"
                dangerouslySetInnerHTML={{
                  __html: personalInfo.description
                    .replace(/9 years/gi, '<strong class="font-bold text-primary">9 years</strong>')
                    .replace(/AI/gi, '<strong class="font-bold text-primary">AI</strong>')
                    .replace(/IoT/gi, '<strong class="font-bold text-primary">IoT</strong>')
                    .replace(/Alibaba/gi, '<strong class="font-bold text-primary">Alibaba</strong>')
                    .replace(/smart cockpits/gi, '<strong class="font-bold text-primary">smart cockpits</strong>')
                    .replace(/hybrid AI service desks/gi, '<strong class="font-bold text-primary">hybrid AI service desks</strong>')
                    .replace(/warehouse video intelligent inspection systems/gi, '<strong class="font-bold text-primary">warehouse video intelligent inspection systems</strong>')
                    .replace(/technological innovation/gi, '<strong class="font-bold text-primary">technological innovation</strong>')
                    .replace(/social inclusion/gi, '<strong class="font-bold text-primary">social inclusion</strong>')
                }}
              />
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="p-4 bg-card rounded-lg shadow-sm">
                  <h3 className="font-semibold text-white mb-2">Product Planning</h3>
                  <p className="text-text-secondary">
                    Led key projects from{' '}
                    <span className="highlight-skill">concept to launch</span>
                  </p>
                </div>
                <div className="p-4 bg-card rounded-lg shadow-sm">
                  <h3 className="font-semibold text-white mb-2">Team Management</h3>
                  <p className="text-text-secondary">
                    Coordinated{' '}
                    <span className="highlight-skill">cross-functional teams</span>{' '}
                    for efficient delivery
                  </p>
                </div>
                <div className="p-4 bg-card rounded-lg shadow-sm">
                  <h3 className="font-semibold text-white mb-2">Patent Achievement</h3>
                  <p className="text-text-secondary">
                    1 Patent Application (
                    <strong className="font-bold text-primary">CN113327114A</strong>)
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <a
                  href="#contact"
                  onClick={handleContactClick}
                  className="inline-flex items-center px-6 py-3 rounded-button bg-primary text-white font-medium hover:bg-primary/90 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Contact Me
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div className="w-full lg:w-2/5 mt-8 lg:mt-0">
              <Image
                src={personalInfo.profileImage}
                alt="Profile Photo"
                width={400}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Capability Map Section */}
          <section id="capabilities" className="py-20 section-card mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeInSection>
                <h2 className="text-3xl font-bold text-center text-white mb-16">
                  Capability Map
                </h2>
                <CapabilityTabs capabilities={capabilities} />
              </FadeInSection>
            </div>
          </section>
        </FadeInSection>
      </div>
    </section>
  );
}