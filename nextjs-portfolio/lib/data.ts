import { SiteData } from '@/types';

export const siteData: SiteData = {
  personalInfo: {
    name: "Sui Qian",
    title: "Senior Internet Product Manager / Technical Product Leader",
    subtitle: "9 years of product experience | AI & IoT Expert",
    description: "I am a technical product leader with 9 years of experience in internet product management, specializing in AI and IoT solutions. I have led key projects at top-tier companies such as Alibaba, overseeing the entire process from concept to implementation for products like smart cockpits, hybrid AI service desks, and warehouse video intelligent inspection systems, while also promoting technological innovation and social inclusion.",
    heroImage: "/images/hero-image.png",
    profileImage: "/images/about-me.png",
    yearsExperience: 9,
    companies: [
      {
        name: "Alibaba",
        logo: "/images/company-icons/alibaba.png"
      },
      {
        name: "Alibaba Cloud",
        logo: "/images/company-icons/alibaba-cloud.png"
      }
    ]
  },
  
  projectVideos: [
    {
      id: "intelligent-inspection",
      title: "Intelligent Inspection",
      description: "A computer vision-based intelligent inspection system, sold 50,000 units, saving $24M annually.",
      youtubeId: "aCCHTP_BOcc"
    },
    {
      id: "storyboard-ai",
      title: "Storyboard AI",
      description: "Storyboard AI is my personal project, built on the qwen2.5pro model, enabling video generation from storyboards.",
      youtubeId: "6D3PtrpCy7Y"
    },
    {
      id: "intelligent-cockpit",
      title: "Intelligent Cockpit",
      description: "Demonstration of the intelligent cockpit deploying a large model on an in-vehicle computer for voice interaction, combining geolocation data to place orders.",
      youtubeId: "K--wfslZpvI"
    },
    {
      id: "merchant-support-chatbot",
      title: "Merchant Support Chatbot",
      description: "Dynamically embedded within the Alibaba Merchant Workbench, combining self-service and live support to provide high-quality service.",
      youtubeId: "gpInVA8Qo_Y"
    },
    {
      id: "mini-program-car",
      title: "In-Vehicle Mini Program",
      description: "Provides music, navigation, voice assistant, meal ordering, and more without downloads, directly on the car infotainment system, achieving 10% monthly active usage.",
      youtubeId: "RUnq9KUwUYM"
    },
    {
      id: "ai-study-desk",
      title: "AI Study Desk",
      description: "Automates 80% of children's homework tutoring using Python Tkinter, Flask, and Qwen-Omni-VL.",
      youtubeId: "tRlVbto5exU"
    },
    {
      id: "3d-hand-tracking",
      title: "3D Hand Tracking",
      description: "Use 3D video tracking technology to control the changes of the virtual ball.",
      youtubeId: "3OsG4tORupY"
    },
    {
      id: "job-seeker",
      title: "Job Seeker",
      description: "Automatically crawl and match the job opportunities that best match your resume, score them, generate a cover letter for high-scoring opportunities, and finally generate a tracking list.",
      youtubeId: "K2iEEjpbchk"
    },
    {
      id: "terminal-website",
      title: "Terminal-style Website",
      description: "Deepseek R1 0528 to create a terminal-style personal website. I uploaded my resume information, and then the model completely handled all the tasks for me.",
      youtubeId: "J5a13R4XQ84"
    }
  ],
  
  projects: [
    {
      id: "smart-cockpit",
      title: "Smart Cockpit Solution",
      description: "Combines visual perception and intelligent voice technology to automatically detect traffic violations and enable an in-vehicle office experience.",
      image: "/images/projects/smart-cockpit.png",
      link: "https://www.notion.so/qiansui/Intelligent-In-Vehicle-Office-Assistant-198cbf6f641b818ca100d8dbf831f8eb"
    },
    {
      id: "hybrid-ai-service",
      title: "Hybrid AI Service Desk",
      description: "Utilizes a crowdsourcing model and RNN intent recognition algorithm to support 20,000 daily consultations, serving over 50 international enterprises and creating 110,000 job opportunities.",
      image: "/images/projects/hybrid-ai-service.jpg",
      link: "https://www.notion.so/qiansui/AI-Hybrid-Service-Desk-198cbf6f641b81fdb304c1da55e53e6a"
    },
    {
      id: "warehouse-inspection",
      title: "Warehouse Video Intelligent Inspection",
      description: "A computer vision-based intelligent inspection system for warehouses, successfully sold 50,000 units while saving $24M annually.",
      image: "/images/projects/warehouse-inspection.png",
      link: "https://www.notion.so/qiansui/Warehouse-Video-Intelligent-Inspection-Solution-198cbf6f641b813d9b15e234a85245f4"
    }
  ],
  
  workExperience: [
    {
      id: "kol-manager",
      company: "Xiao Han Student Reports",
      position: "KOL Manager - 250K Followers Account",
      duration: "May 2021 - present",
      description: "Managed Social Media: Xiao Han Student Reports (Part-time)",
      companyLogo: "/images/company-icons/alibaba.png",
      companyUrl: "https://www.xiaohongshu.com/user/profile/5b2340ebe8ac2b66a26b2d8d",
      achievements: [
        "Content Optimization: Analyzed trends, researched fashion, ideated outfits, coordinated scenes, and crafted narratives for engagement.",
        "Business Strategy: Secured fashion brand partnerships, promoted products, and built revenue via ads, incentives, and Normwear.",
        "AI-Driven Operations: Used LLMs for automation, email processing, creative previews, and data-driven content distribution."
      ],
      images: [
        "/images/timeline/KOL Manager/image.png",
        "/images/timeline/KOL Manager/image copy.png",
        "/images/timeline/KOL Manager/image copy 2.png"
      ]
    },
    {
      id: "alibaba-cloud-banma",
      company: "Alibaba Cloud - Banma Smart Cockpit Solutions Product Department",
      position: "Product Leader",
      duration: "May 2021 - Oct 2023",
      location: "Shanghai",
      description: "Product Leader: Responsible for the planning and implementation of the in-vehicle interactive cloud application and intelligent voice assistant.",
      companyLogo: "/images/company-icons/alibaba-cloud.png",
      companyUrl: "https://www.ebanma.com/",
      achievements: [
        "In-Vehicle Citylife Service Cloud Application: Deployed on 200,000 in-vehicle devices with an average weekly active rate of 10%.",
        "In-Vehicle AI Voice Assistant: Developed for LS6 engineering vehicles and showcased at the Chengdu International Auto Show, supporting office assistance and traffic violation recognition."
      ],
      images: [
        "/images/timeline/Banma Smart Cockpit Solutions Product Department/image.png",
        "/images/timeline/Banma Smart Cockpit Solutions Product Department/image copy.png",
        "/images/timeline/Banma Smart Cockpit Solutions Product Department/image copy 2.png",
        "/images/timeline/Banma Smart Cockpit Solutions Product Department/image copy 3.png"
      ]
    },
    {
      id: "alibaba-taobao",
      company: "Alibaba Group - Taobao Consulting Product Department",
      position: "Product Leader",
      duration: "Sept 2018 - May 2021",
      location: "Hangzhou",
      description: "Product Leader: Oversaw the design and implementation of Taobao platform consulting services.",
      companyLogo: "/images/company-icons/alibaba.png",
      companyUrl: "https://www.ebanma.com/",
      achievements: [
        "Merchant Support Chatbot: Supported 20,000 daily conversations, with 80% resolved by AI.",
        "Taobao Hybrid Service Desk: Created 110,000 job opportunities, serving 50+ international enterprises."
      ],
      images: [
        "/images/timeline/Taobao Consulting Product Department/image.png",
        "/images/timeline/Taobao Consulting Product Department/image copy.png",
        "/images/timeline/Taobao Consulting Product Department/image copy 2.png",
        "/images/timeline/Taobao Consulting Product Department/image copy 3.png",
        "/images/timeline/Taobao Consulting Product Department/image copy 4.png"
      ]
    }
  ],
  
  capabilities: [
    {
      id: "product-design",
      title: "Product Design",
      description: "I possess solid product design capabilities, specializing in transforming potential user needs into tangible product features:",
      icon: "layout-dashboard",
      achievements: [
        "In smart cockpit and hybrid AI customer service projects, I can identify user pain points in current experiences, creating more user-friendly and impactful products.",
        "My inclusive design philosophy is reflected in systems developed for visually impaired users, ensuring that even visually impaired users can enjoy a high-quality experience."
      ]
    },
    {
      id: "innovation",
      title: "Innovation Capability",
      description: "I also possess excellent product innovation capabilities:",
      icon: "lightbulb",
      achievements: [
        "In my logistics domain products, I significantly improved warehouse inspection efficiency and security by combining intelligent IoT devices with our RPA service operating system, and completed a patent application (CN113327114A).",
        "I designed a cloud service distribution product that can be quickly deployed to the cloud during peak service periods, similar to Uber, allowing users to enjoy better service experiences without waiting.",
        "Developed a traffic violation detection system based on visual perception, using a reverse product perspective to provide users with a better experience during complex traffic situations."
      ]
    },
    {
      id: "agile",
      title: "Agile & Collaboration",
      description: "During my time at Alibaba, I led cross-functional teams to deliver complex projects, demonstrating excellent application of agile methodologies and stakeholder management capabilities:",
      icon: "users",
      achievements: [
        "Successfully drove large-scale project implementation (covering 200,000 devices, serving 50+ enterprises), maintaining efficient execution within complex organizational structures. The project that created 110,000 job opportunities showcased my ability to build inclusive collaborative environments.",
        "In the intelligent inspection project, after one month of rapid iteration, I led the team to complete the product prototype from scratch and successfully pushed it live, gaining recognition from the business unit."
      ]
    },
    {
      id: "commercialization",
      title: "Product Commercialization",
      description: "I have excellent experience in product commercialization:",
      icon: "trending-up",
      achievements: [
        "In the intelligent inspection project, my product achieved ¥21 million in product sales, 50,000 warehouse units sold, saving $24M in costs annually.",
        "In the intelligent cockpit product, my product achieved a 10% weekly active rate. (The stock of cars in Shanghai reaches 10 million. With a 10% penetration rate of intelligent cockpits, there are 1 million cars.)",
        "In the customer service workstation project, I created more than 110,000 jobs."
      ]
    },
    {
      id: "technical",
      title: "Technical Capability",
      description: "I have deep technical expertise in AI and IoT fields, covering large language model fine-tuning, computer vision detection systems, and RNN intent recognition.",
      icon: "code",
      achievements: [
        "My implemented smart cockpit and warehouse systems demonstrate my IoT integration capabilities. Through developing chatbots, voice assistants, and intelligent video analysis systems.",
        "Personal projects of mine have developed OOTD assistant, Storyboard AI, and Golden Relationship Assistant using current large language models (LLMs). I have a profound understanding of current large language models."
      ]
    }
  ],
  
  contact: {
    email: "jaysean.qian@gmail.com",
    phone: "+86-159-8817-1024",
    linkedin: "https://www.linkedin.com/in/sui-qian-7504892a0/",
    location: "Chaoyang District, Beijing"
  },
  
  testimonialImages: {
    row1: [
      { src: "/images/testimonials/row1/image.png", alt: "Testimonial 1" },
      { src: "/images/testimonials/row1/image copy.png", alt: "Testimonial 2" },
      { src: "/images/testimonials/row1/image copy 2.png", alt: "Testimonial 3" },
      { src: "/images/testimonials/row1/image copy 3.png", alt: "Testimonial 4" }
    ],
    row2: [
      { src: "/images/testimonials/row2/image.png", alt: "Testimonial 5" },
      { src: "/images/testimonials/row2/image copy.png", alt: "Testimonial 6" },
      { src: "/images/testimonials/row2/image copy 2.png", alt: "Testimonial 7" },
      { src: "/images/testimonials/row2/image copy 3.png", alt: "Testimonial 8" }
    ]
  }
};