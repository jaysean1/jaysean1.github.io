import { Mail, Phone, Linkedin } from 'lucide-react';
import { siteData } from '@/lib/data';
import FadeInSection from '@/components/ui/FadeInSection';

export default function Contact() {
  const { contact } = siteData;

  return (
    <section id="contact" className="py-20 section-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <h2 className="text-3xl font-bold text-center text-white mb-16">
            Contact
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Mail className="text-2xl text-primary w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Email</h3>
              <p className="text-text-secondary">
                <strong className="font-bold text-primary">{contact.email}</strong>
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Phone className="text-2xl text-primary w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Phone</h3>
              <p className="text-text-secondary">
                <strong className="font-bold text-primary">{contact.phone}</strong>
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Linkedin className="text-2xl text-primary w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">LinkedIn</h3>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/90 transition-colors"
              >
                <strong className="font-bold text-primary">View Profile</strong>
              </a>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}