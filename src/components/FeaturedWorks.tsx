import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Star } from 'lucide-react';
import type { WorkProject } from '../../types';
import projectsData from '../data/projectsData.json';
import TiltCard from './TiltCard';
import { ProjectIllustration } from './ProjectIllustration';

const projects = projectsData as WorkProject[];
const spotlight = projects[0];
const projectCount = projects.length;

const getProjectTags = (title: string) => {
  const key = title.toLowerCase();

  if (key.includes('orchestrator')) {
    return ['Multi-Agent', 'HITL', 'Code Gen'];
  }

  if (key.includes('debate')) {
    return ['MARL', 'PPO', 'LLM Debate'];
  }

  if (key.includes('yolodetector')) {
    return ['Android', 'TFLite', 'Computer Vision'];
  }

  if (key.includes('trainer')) {
    return ['Deep Learning', 'YOLOv8', 'Pipeline'];
  }

  if (key.includes('moodify')) {
    return ['Computer Vision', 'Emotion AI', 'Inference'];
  }

  if (key.includes('papermind')) {
    return ['RAG', 'Document AI', 'LLM App'];
  }

  if (key.includes('assistant')) {
    return ['LLM', 'Automation', 'Local AI'];
  }

  if (key.includes('password')) {
    return ['Security', 'Backend', 'Utility'];
  }

  return ['AI', 'Web App', 'Deployment'];
};

// Custom high-performance image component with vector illustration background and load transitions
const ImageWithFallback: React.FC<{ src: string; alt: string; projectTitle: string; className?: string }> = ({
  src,
  alt,
  projectTitle,
  className,
}) => {
  const [error, setError] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div className="relative w-full h-full bg-[#FAF7F2] flex items-center justify-center overflow-hidden">
      {/* Illustrated background: instantly renders responsive styled SVG design asset */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <ProjectIllustration title={projectTitle} />
      </div>

      {!error && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`${className} absolute inset-0 z-10 w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};

const FeaturedWorks: React.FC = () => {
  return (
    <section id="portfolio" className="py-20 sm:py-28">
      <div className="section-shell">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">Research-aligned projects</p>
            <h2 className="section-title mt-4">Selected projects that reflect the problems I study.</h2>
          </div>
          <div className="quiet-panel rounded-[1.5rem] px-5 py-4 border-[#E0D9CF]/50 bg-white/60">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#A89E94]">portfolio summary</p>
            <div className="mt-3 flex gap-6 text-sm text-[#7A6E65]">
              <span>{projectCount}+ featured projects</span>
              <span className="inline-flex items-center gap-2">
                <Star className="h-4 w-4 text-[#C17D4A]" />
                AI work with research potential
              </span>
            </div>
          </div>
        </div>

        {spotlight && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <TiltCard className="quiet-panel group overflow-hidden rounded-[2rem] p-4 sm:p-6 shadow-[0_24px_60px_rgba(44,40,37,0.04)] hover:shadow-[0_30px_70px_rgba(44,40,37,0.07)] transition-shadow duration-300">
              <article className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] items-stretch">
                <div className="relative overflow-hidden rounded-[1.5rem] min-h-[18rem] lg:h-full">
                  <ImageWithFallback
                    src={spotlight.imageUrl}
                    alt={spotlight.title}
                    projectTitle={spotlight.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2]/10 to-transparent pointer-events-none" />
                </div>
                <div className="flex flex-col justify-between gap-6 p-2">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#A89E94]">Featured project</p>
                    <h3 className="mt-4 font-display text-3xl font-bold text-[#2C2825] sm:text-4xl">{spotlight.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#7A6E65]">{spotlight.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {[...getProjectTags(spotlight.title), `${spotlight.year}`].map((tag) => (
                        <span key={tag} className="rounded-full border border-[#E0D9CF] bg-white px-3 py-1 text-xs text-[#7A6E65]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {spotlight.liveUrl && (
                      <a
                        href={spotlight.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[#C17D4A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8B5E3C] shadow-sm"
                      >
                        View live
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                    {spotlight.repoUrl && (
                      <a
                        href={spotlight.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-[#E0D9CF] bg-white px-5 py-3 text-sm font-semibold text-[#7A6E65] transition hover:border-[#C17D4A]/30 hover:text-[#2C2825] shadow-sm"
                      >
                        Source
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </TiltCard>
          </motion.div>
        )}

        {/* Scrollable list on mobile, beautiful clean grid on desktop */}
        <div className="mt-10 overflow-x-auto pb-4 md:pb-0 md:overflow-visible">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 snap-x scrollbar-thin">
            {projects.slice(1).map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.05 }}
                className="snap-start min-w-[18rem] md:min-w-0 w-full flex-shrink-0 md:flex-shrink-1"
              >
                <TiltCard className="group quiet-panel overflow-hidden rounded-[1.8rem] border-white/10 h-full flex flex-col justify-between shadow-[0_16px_40px_rgba(44,40,37,0.03)] hover:shadow-[0_24px_48px_rgba(44,40,37,0.06)] transition-all duration-300">
                  <article className="h-full flex flex-col justify-between">
                    <div>
                      {/* Project Image Frame */}
                      <div className="relative h-48 overflow-hidden rounded-t-[1.8rem]">
                        <ImageWithFallback
                          src={project.imageUrl}
                          alt={project.title}
                          projectTitle={project.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-104"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2]/10 to-transparent pointer-events-none" />
                      </div>

                      {/* Content Panel */}
                      <div className="p-5">
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="font-display text-lg font-bold text-[#2C2825] tracking-tight">{project.title}</h3>
                          <span className="text-xs font-mono text-[#A89E94]">{project.year}</span>
                        </div>
                        <p className="mt-3 text-xs leading-6 text-[#7A6E65] line-clamp-3">{project.description}</p>
                      </div>
                    </div>

                    <div>
                      {/* Tags row */}
                      <div className="px-5 pb-3">
                        <div className="flex flex-wrap gap-1.5">
                          {getProjectTags(project.title).map((tag) => (
                            <span
                              key={`${project.title}-${tag}`}
                              className="rounded-full border border-[#E0D9CF]/60 bg-white px-2.5 py-0.5 text-[10px] font-medium text-[#7A6E65] select-none"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Always Visible Direct Action Buttons */}
                      <div className="px-5 pb-5 pt-2 flex gap-3 border-t border-[#E0D9CF]/30 bg-white/20">
                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#C17D4A] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#8B5E3C] shadow-sm flex-1"
                          >
                            Demo
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        ) : null}
                        
                        {project.repoUrl ? (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#E0D9CF] bg-white px-3.5 py-2 text-xs font-semibold text-[#7A6E65] transition hover:border-[#C17D4A]/30 hover:text-[#2C2825] shadow-sm flex-1"
                          >
                            Source
                            <Github className="h-3.5 w-3.5" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorks;
