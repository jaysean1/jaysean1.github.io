import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { siteData } from '@/lib/data';
import FadeInSection from '@/components/ui/FadeInSection';

export default function Projects() {
  const { projects } = siteData;

  return (
    <section id="projects" className="py-20 section-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Selected Owner Project
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {project.title}
                  </h3>
                  <div
                    className="text-gray-400 text-sm mb-4"
                    dangerouslySetInnerHTML={{
                      __html: project.description
                        .replace(/visual perception/gi, '<span class="highlight-tech">visual perception</span>')
                        .replace(/intelligent voice technology/gi, '<span class="highlight-tech">intelligent voice technology</span>')
                        .replace(/traffic violations/gi, '<span class="highlight-product">traffic violations</span>')
                        .replace(/in-vehicle office experience/gi, '<span class="highlight-product">in-vehicle office experience</span>')
                        .replace(/crowdsourcing model/gi, '<span class="highlight-skill">crowdsourcing model</span>')
                        .replace(/RNN intent recognition algorithm/gi, '<span class="highlight-tech">RNN intent recognition algorithm</span>')
                        .replace(/computer vision/gi, '<span class="highlight-tech">computer vision</span>')
                        .replace(/(\d+(?:,\d+)*)/g, '<span class="font-bold text-primary">$1</span>')
                        .replace(/(\$\d+M)/g, '<span class="font-bold text-primary">$1</span>')
                    }}
                  />
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-button bg-primary text-white font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}