'use client';

import { siteData } from '@/lib/data';

export default function Footer() {
  const { personalInfo, contact } = siteData;

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="text-2xl font-pacifico text-white mb-4 block">
              {personalInfo.name}
            </span>
            <p className="text-gray-400">
              <strong className="font-bold text-primary">
                Senior Internet Product Manager
              </strong>{' '}
              |{' '}
              <strong className="font-bold text-primary">
                AI & IoT Expert
              </strong>
            </p>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  onClick={handleNavClick('#about')}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  About Me
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  onClick={handleNavClick('#experience')}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  onClick={handleNavClick('#projects')}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#product-videos"
                  onClick={handleNavClick('#product-videos')}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Personal Projects
                </a>
              </li>
            </ul>
          </div>
          
          <div className="text-right">
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <strong className="font-bold text-primary">Email:</strong>{' '}
                {contact.email}
              </li>
              <li className="text-gray-400">
                <strong className="font-bold text-primary">Phone:</strong>{' '}
                {contact.phone}
              </li>
              <li className="text-gray-400">
                <strong className="font-bold text-primary">Address:</strong>{' '}
                {contact.location}
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © 2024 Personal Resume Website. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}