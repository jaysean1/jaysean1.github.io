import Image from 'next/image';
import { siteData } from '@/lib/data';

export default function ProductVideos() {
  const { projectVideos } = siteData;

  return (
    <section id="product-videos" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">Product Videos</h2>
          <p className="mt-2 text-gray-400">Explore my projects and achievements</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {projectVideos.map((video) => (
            <div
              key={video.id}
              className="group bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <a
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative pb-[56.25%]"
              >
                <Image
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
              </a>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {video.title}
                </h3>
                <div
                  className="text-gray-400 text-sm"
                  dangerouslySetInnerHTML={{
                    __html: video.description
                      .replace(/computer vision/gi, '<span class="text-primary">computer vision</span>')
                      .replace(/AI/gi, '<span class="text-primary">AI</span>')
                      .replace(/large model/gi, '<span class="text-primary">large model</span>')
                      .replace(/qwen2\.5pro model/gi, '<span class="text-primary">qwen2.5pro model</span>')
                      .replace(/Alibaba Merchant Workbench/gi, '<span class="text-primary">Alibaba Merchant Workbench</span>')
                      .replace(/resume/gi, '<span class="text-primary">resume</span>')
                      .replace(/cover letter/gi, '<span class="text-primary">cover letter</span>')
                      .replace(/(\d+(?:,\d+)*)/g, '<span class="font-bold text-primary">$1</span>')
                      .replace(/(\d+%)/g, '<span class="font-bold text-primary">$1</span>')
                      .replace(/(\$\d+M)/g, '<span class="font-bold text-primary">$1</span>')
                      .replace(/(80%)/g, '<span class="text-primary">$1</span>')
                      .replace(/(10%)/g, '<span class="font-bold text-primary">$1</span>')
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}