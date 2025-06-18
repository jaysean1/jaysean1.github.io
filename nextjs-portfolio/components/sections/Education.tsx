'use client';

import { GraduationCap } from 'lucide-react';
import { siteData } from '@/lib/data';
import FadeInSection from '@/components/ui/FadeInSection';

export default function Education() {
  const { education } = siteData;

  return (
    <section id="education" className="py-20 section-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <h2 className="text-3xl font-bold text-center text-white mb-16">
            Education
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((edu) => (
              <div key={edu.id} className="bg-card p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <GraduationCap className="text-primary text-3xl mr-4 w-12 h-12 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {edu.institution}
                    </h3>
                    <p className="text-text-secondary">
                      {edu.degree} in <span className="highlight-skill">{edu.field}</span>
                    </p>
                    <p className="text-text-secondary">
                      <strong className="font-bold text-primary highlight-achievement">
                        {edu.duration}
                      </strong>
                    </p>
                  </div>
                </div>
                {edu.description && (
                  <p className="text-text-secondary mt-2">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
} 