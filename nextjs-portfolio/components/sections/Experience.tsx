'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { siteData } from '@/lib/data';
import FadeInSection from '@/components/ui/FadeInSection';
import ImageModal from '@/components/ui/ImageModal';

export default function Experience() {
  const { workExperience } = siteData;
  const [modalState, setModalState] = useState({
    isOpen: false,
    images: [] as string[],
    currentIndex: 0
  });

  const openModal = (images: string[], index: number) => {
    setModalState({
      isOpen: true,
      images,
      currentIndex: index
    });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const goToPrevious = () => {
    setModalState(prev => ({
      ...prev,
      currentIndex: Math.max(0, prev.currentIndex - 1)
    }));
  };

  const goToNext = () => {
    setModalState(prev => ({
      ...prev,
      currentIndex: Math.min(prev.images.length - 1, prev.currentIndex + 1)
    }));
  };

  return (
    <>
      <section id="experience" className="py-20 section-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <h2 className="text-3xl font-bold text-center text-white mb-16">
              Experience
            </h2>
            
            <div className="space-y-12">
              {workExperience.map((job) => (
                <div key={job.id} className="timeline-item">
                  <div className="bg-card p-6 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <div className="mr-4 p-2 bg-primary/10 rounded-full">
                        <Image
                          src={job.companyLogo}
                          alt={`${job.company} Logo`}
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {job.companyUrl ? (
                            <a
                              href={job.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center hover:text-primary transition-colors"
                            >
                              {job.company}
                              <ExternalLink className="w-4 h-4 ml-2" />
                            </a>
                          ) : (
                            job.company
                          )}
                        </h3>
                        <p className="text-text-secondary mt-1">
                          {job.duration}
                          {job.location && ` | ${job.location}`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-text-secondary mb-4">
                        <strong>Position:</strong> {job.position}
                      </p>
                      <p className="text-text-secondary mb-4">{job.description}</p>
                      
                      <ul className="list-disc list-inside text-text-secondary space-y-2">
                        {job.achievements.map((achievement, index) => (
                          <li
                            key={index}
                            dangerouslySetInnerHTML={{
                              __html: achievement
                                .replace(/Content Optimization:/gi, '<strong class="font-bold text-primary">Content Optimization:</strong>')
                                .replace(/Business Strategy:/gi, '<strong class="font-bold text-primary">Business Strategy:</strong>')
                                .replace(/AI-Driven Operations:/gi, '<strong class="font-bold text-primary">AI-Driven Operations:</strong>')
                                .replace(/In-Vehicle Citylife Service Cloud Application:/gi, '<strong class="font-bold text-primary">In-Vehicle Citylife Service Cloud Application:</strong>')
                                .replace(/In-Vehicle AI Voice Assistant:/gi, '<strong class="font-bold text-primary">In-Vehicle AI Voice Assistant:</strong>')
                                .replace(/Merchant Support Chatbot:/gi, '<strong class="font-bold text-primary highlight-product">Merchant Support Chatbot:</strong>')
                                .replace(/Taobao Hybrid Service Desk:/gi, '<strong class="font-bold text-primary">Taobao Hybrid Service Desk:</strong>')
                                .replace(/(\d+(?:,\d+)*)/g, '<strong class="font-bold text-primary">$1</strong>')
                                .replace(/(10%)/g, '<strong class="font-bold text-primary">$1</strong>')
                                .replace(/(80%)/g, '<strong class="font-bold text-primary highlight-achievement">$1</strong>')
                                .replace(/office assistance/gi, '<span class="highlight-skill">office assistance</span>')
                                .replace(/traffic violation recognition/gi, '<span class="highlight-tech">traffic violation recognition</span>')
                                .replace(/LS6/gi, '<strong class="font-bold text-primary">LS6</strong>')
                                .replace(/Chengdu International Auto Show/gi, '<strong class="font-bold text-primary">Chengdu International Auto Show</strong>')
                                .replace(/AI/gi, '<span class="highlight-tech">AI</span>')
                            }}
                          />
                        ))}
                      </ul>
                      
                      {job.images.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 mt-6">
                          {job.images.map((imageSrc, index) => (
                            <div
                              key={index}
                              className="group bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                              onClick={() => openModal(job.images, index)}
                            >
                              <Image
                                src={imageSrc}
                                alt={`${job.company} Image ${index + 1}`}
                                width={300}
                                height={256}
                                className="w-full h-64 object-contain"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      <ImageModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        images={modalState.images}
        currentIndex={modalState.currentIndex}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </>
  );
}