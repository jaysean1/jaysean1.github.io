'use client';

import { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Capability } from '@/types';

interface CapabilityTabsProps {
  capabilities: Capability[];
}

export default function CapabilityTabs({ capabilities }: CapabilityTabsProps) {
  const [activeTab, setActiveTab] = useState(capabilities[0]?.id || '');

  const getIcon = (iconName: string): LucideIcon => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as LucideIcon;
    return IconComponent || Icons.HelpCircle;
  };

  return (
    <div className="flex flex-col lg:flex-row bg-card rounded-lg shadow-sm overflow-hidden">
      {/* Sidebar - Capability List */}
      <div className="w-full lg:w-1/4 bg-card">
        <div className="capability-tabs">
          {capabilities.map((capability) => {
            const IconComponent = getIcon(capability.icon);
            return (
              <button
                key={capability.id}
                className={`capability-tab ${
                  activeTab === capability.id ? 'active' : ''
                }`}
                onClick={() => setActiveTab(capability.id)}
              >
                <div className="tab-icon">
                  <IconComponent className="text-primary" />
                </div>
                <span>
                  {capability.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content - Capability Details */}
      <div className="w-full lg:w-3/4 p-6 lg:p-8 bg-card">
        {capabilities.map((capability) => (
          <div
            key={capability.id}
            className={`capability-content ${
              activeTab === capability.id ? 'active' : ''
            }`}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              {capability.title}
            </h3>
            <p className="text-text-secondary mb-4">{capability.description}</p>
            <ul className="space-y-3 text-text-secondary">
              {capability.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start">
                  <Icons.CheckCircle className="text-primary mr-2 mt-1 flex-shrink-0 w-5 h-5" />
                  <span
                    dangerouslySetInnerHTML={{
                      __html: achievement
                        .replace(/identify user pain points/gi, '<span class="highlight-skill">identify user pain points</span>')
                        .replace(/high-quality experience/gi, '<span class="highlight-skill">high-quality experience</span>')
                        .replace(/significantly improved warehouse inspection efficiency and security/gi, '<span class="highlight-skill">significantly improved warehouse inspection efficiency and security</span>')
                        .replace(/CN113327114A/gi, '<span class="highlight-achievement">CN113327114A</span>')
                        .replace(/quickly deployed to the cloud during peak service periods/gi, '<span class="highlight-tech">quickly deployed to the cloud during peak service periods</span>')
                        .replace(/traffic violation detection system based on visual perception/gi, '<span class="highlight-product">traffic violation detection system based on visual perception</span>')
                        .replace(/200,000 devices/gi, '<span class="highlight-achievement">200,000 devices</span>')
                        .replace(/50\+ enterprises/gi, '<span class="highlight-achievement">50+ enterprises</span>')
                        .replace(/110,000 job opportunities/gi, '<span class="highlight-achievement">110,000 job opportunities</span>')
                        .replace(/one month of rapid iteration/gi, '<span class="highlight-skill">one month of rapid iteration</span>')
                        .replace(/¥21 million in product sales/gi, '<span class="highlight-achievement">¥21 million in product sales</span>')
                        .replace(/50,000 warehouse units sold/gi, '<span class="highlight-achievement">50,000 warehouse units sold</span>')
                        .replace(/\$24M in costs annually/gi, '<span class="highlight-achievement">$24M in costs annually</span>')
                        .replace(/10% weekly active rate/gi, '<span class="highlight-achievement">10% weekly active rate</span>')
                        .replace(/110,000 jobs/gi, '<span class="highlight-achievement">110,000 jobs</span>')
                        .replace(/large language model fine-tuning/gi, '<span class="highlight-tech">large language model fine-tuning</span>')
                        .replace(/computer vision detection systems/gi, '<span class="highlight-tech">computer vision detection systems</span>')
                        .replace(/RNN intent recognition/gi, '<span class="highlight-tech">RNN intent recognition</span>')
                        .replace(/IoT integration capabilities/gi, '<span class="highlight-tech">IoT integration capabilities</span>')
                        .replace(/OOTD assistant/gi, '<span class="highlight-product">OOTD assistant</span>')
                        .replace(/Storyboard AI/gi, '<span class="highlight-product">Storyboard AI</span>')
                        .replace(/Golden Relationship Assistant/gi, '<span class="highlight-product">Golden Relationship Assistant</span>')
                        .replace(/profound understanding of current large language models/gi, '<span class="highlight-skill">profound understanding of current large language models</span>')
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}