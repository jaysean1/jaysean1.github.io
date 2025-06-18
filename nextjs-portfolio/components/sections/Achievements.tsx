'use client';

import { useState, useEffect } from 'react';
import { Award, Trophy, ExternalLink } from 'lucide-react';
import { siteData } from '@/lib/data';
import FadeInSection from '@/components/ui/FadeInSection';

export default function Achievements() {
  const { achievements, patents } = siteData;
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetValue = parseInt(entry.target.getAttribute('data-count') || '0');
          const duration = 2000;
          const step = targetValue / (duration / 16);
          let current = 0;

          const updateCount = () => {
            current += step;
            if (current < targetValue) {
              setAnimatedValues(prev => ({
                ...prev,
                [entry.target.id]: Math.floor(current)
              }));
              requestAnimationFrame(updateCount);
            } else {
              setAnimatedValues(prev => ({
                ...prev,
                [entry.target.id]: targetValue
              }));
            }
          };

          updateCount();
          observer.unobserve(entry.target);
        }
      });
    });

    achievements.forEach(achievement => {
      const element = document.getElementById(achievement.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [achievements]);

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  return (
    <section id="achievements" className="py-20 section-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <h2 className="text-3xl font-bold text-center text-white mb-16">
            Achievements & Patents
          </h2>
          
          {/* Core Numbers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="text-center">
                <div 
                  id={achievement.id}
                  className="text-4xl font-bold text-primary mb-2"
                  data-count={achievement.value}
                >
                  {formatNumber(animatedValues[achievement.id] || 0)}
                </div>
                <p className="text-text-secondary">
                  {achievement.title}{' '}
                  {achievement.unit && (
                    <span className="highlight-achievement">({achievement.unit})</span>
                  )}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Technical Patents */}
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-white mb-4">Technical Patents</h3>
              <ul className="space-y-4">
                {patents.map((patent) => (
                  <li key={patent.id} className="flex items-start">
                    <Award className="text-primary mt-1 mr-3 w-5 h-5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-white">
                        <span className="highlight-tech">{patent.title}</span>
                      </h4>
                      <p className="text-text-secondary text-sm">
                        Patent No.:{' '}
                        {patent.url ? (
                          <a
                            href={patent.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-primary highlight-achievement hover:underline"
                          >
                            {patent.patentNumber}
                            <ExternalLink className="inline w-3 h-3 ml-1" />
                          </a>
                        ) : (
                          <span className="font-bold text-primary highlight-achievement">
                            {patent.patentNumber}
                          </span>
                        )}
                      </p>
                      {patent.description && (
                        <p className="text-text-secondary text-sm mt-1">
                          {patent.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industry Impact */}
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-white mb-4">Industry Impact</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Trophy className="text-primary mt-1 mr-3 w-5 h-5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">200,000 In-Vehicle Device Coverage</h4>
                    <p className="text-text-secondary">
                      Smart cockpit cloud application deployed on{' '}
                      <strong className="font-bold text-primary">200,000</strong> devices.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Trophy className="text-primary mt-1 mr-3 w-5 h-5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">50+ International Enterprises Served</h4>
                    <p className="text-text-secondary">
                      Hybrid AI service desk efficiently supports over{' '}
                      <strong className="font-bold text-primary">50</strong> international enterprises.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Trophy className="text-primary mt-1 mr-3 w-5 h-5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">110,000 Job Opportunities</h4>
                    <p className="text-text-secondary">
                      Inclusive product created{' '}
                      <strong className="font-bold text-primary">110,000</strong> employment
                      opportunities for the disabled.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
} 