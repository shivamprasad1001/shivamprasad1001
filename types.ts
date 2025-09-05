import { StepId } from "framer-motion";

export interface Skill {
  name: string;
  level: number; // 0-100
  icon: React.ComponentType<{ className?: string }>;
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
  imageUrl: string;
}

export interface Experience {
  company: string;
  period: string;
  location: string;
  title: string;
  description: string;
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
