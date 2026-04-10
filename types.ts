export interface Skill {
  name: string;
  level: number; // 0-100
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

export interface Achievement {
  period: string;
  title: string;
  institution: string;
  description?: string;
}

export interface WorkProject {
  title: string;
  year: number;
  description?: string;
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
}

export interface ResearchPaper {
  title: string;
  year: number;
  status: string;
  venue: string;
  summary: string;
  collaborators: string[];
  pdfPath?: string;
}

export interface Experience {
  company: string;
  period: string;
  location: string;
  title: string;
  description: string;
  fullDescription?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatarUrl: string;
}

export interface BlogPost {
  date: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  link: string;
}
