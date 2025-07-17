export interface ProjectVideo {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnail?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  duration: string;
  location?: string;
  description: string;
  achievements: string[];
  companyLogo: string;
  companyUrl?: string;
  images: string[];
}

export interface Capability {
  id: string;
  title: string;
  description: string;
  icon: string;
  achievements: string[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  location: string;
}

export interface TestimonialImage {
  src: string;
  alt: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  profileImage: string;
  yearsExperience: number;
  companies: Array<{
    name: string;
    logo: string;
  }>;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  value: number;
  unit: string;
  category: string;
}

export interface Patent {
  id: string;
  title: string;
  patentNumber: string;
  url?: string;
  description?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  description?: string;
}

export interface SiteData {
  personalInfo: PersonalInfo;
  projectVideos: ProjectVideo[];
  projects: Project[];
  workExperience: WorkExperience[];
  capabilities: Capability[];
  contact: ContactInfo;
  testimonialImages: {
    row1: TestimonialImage[];
    row2: TestimonialImage[];
  };
  achievements: Achievement[];
  patents: Patent[];
  education: Education[];
}