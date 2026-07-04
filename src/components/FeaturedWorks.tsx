import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import type { WorkProject } from '../../types';
import projectsData from '../data/projectsData.json';
import TiltCard from './TiltCard';

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

// Custom high-performance image component with graceful fallback
const ImageWithFallback: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full bg-[#FAF7F2] flex items-center justify-center overflow-hidden">
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#FAF7F2]">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#C17D4A]/20 border-t-[#C17D4A]" />
        </div>
      )}
      {error ? (
        <div className="flex flex-col items-center justify-center text-[#A89E94] p-6 text-center select-none">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C17D4A] font-semibold">Preview Asset</span>
          <span className="text-[11px] text-[#7A6E65] mt-1 font-medium max-w-[80%] truncate">{alt}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        />
      )}
    </div>
  );
};

const FeaturedWorks: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  const slideProjects = projects.slice(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ensure index remains in bounds if visibility changes
  const maxIndex = Math.max(0, slideProjects.length - visibleCount);
  const adjustedIndex = Math.min(currentIndex, maxIndex);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section id="portfolio" className="py-20 sm:py-28 overflow-hidden">
      <div className="section-shell">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">Research-aligned projects</p>
            <h2 className="section-title mt-4">Selected projects that reflect the problems I study.</h2>
          </div>

          <div className="flex flex-wrap items-center gap-4 self-start lg:self-auto">
            <div className="quiet-panel rounded-[1.5rem] px-5 py-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#A89E94]">portfolio summary</p>
              <div className="mt-3 flex gap-6 text-sm text-[#7A6E65]">
                <span>{projectCount}+ featured projects</span>
                <span className="inline-flex items-center gap-2">
                  <Star className="h-4 w-4 text-[#C17D4A]" />
                  AI work
                </span>
              </div>
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
            <TiltCard className="quiet-panel group overflow-hidden rounded-[2rem] p-4 sm:p-6 transition-all duration-300">
              <article className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] items-stretch">
                <div className="relative overflow-hidden rounded-[1.5rem] min-h-[18rem] lg:h-full">
                  <ImageWithFallback
                    src={spotlight.imageUrl}
                    alt={spotlight.title}
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

        {/* Premium Project Slider Container */}
        <div className="relative mt-12 overflow-visible px-1 md:px-0">
          
          {/* Left Arrow Button */}
          {adjustedIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-2 md:left-[-24px] top-1/2 -translate-y-1/2 z-20 p-3.5 rounded-full glass-panel text-[#7A6E65] hover:text-[#C17D4A] select-none flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200"
              aria-label="Previous projects"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Right Arrow Button */}
          {adjustedIndex < maxIndex && (
            <button
              onClick={nextSlide}
              className="absolute right-2 md:right-[-24px] top-1/2 -translate-y-1/2 z-20 p-3.5 rounded-full glass-panel text-[#7A6E65] hover:text-[#C17D4A] select-none flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200"
              aria-label="Next projects"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

          {/* Slider viewport */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-0 cursor-grab active:cursor-grabbing touch-pan-y"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                const swipeThreshold = 40;
                if (info.offset.x < -swipeThreshold) {
                  nextSlide();
                } else if (info.offset.x > swipeThreshold) {
                  prevSlide();
                }
              }}
              animate={{ x: `-${adjustedIndex * (100 / visibleCount)}%` }}
              transition={{ type: 'spring', stiffness: 180, damping: 24 }}
            >
              {slideProjects.map((project) => (
                <div
                  key={project.title}
                  className="w-full flex-shrink-0 px-3 select-none"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <div className="h-full">
                    <TiltCard className="group quiet-panel overflow-hidden rounded-[1.8rem] h-full flex flex-col justify-between transition-all duration-300">
                      <article className="h-full flex flex-col justify-between">
                        <div>
                          {/* Project Image Frame */}
                          <div className="relative h-48 overflow-hidden rounded-t-[1.8rem]">
                            <ImageWithFallback
                              src={project.imageUrl}
                              alt={project.title}
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
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Progress Bar Tracker */}
        <div className="mt-10 mx-auto max-w-[200px] flex items-center justify-between gap-3 font-mono text-[10px] text-[#A89E94] select-none">
          <span>01</span>
          <div className="relative h-[2px] flex-1 bg-[#E0D9CF]/60 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 bottom-0 left-0 bg-[#C17D4A] rounded-full"
              animate={{
                left: `${maxIndex > 0 ? (adjustedIndex / maxIndex) * 75 : 0}%`,
                right: `${maxIndex > 0 ? 75 - (adjustedIndex / maxIndex) * 75 : 75}%`
              }}
              transition={{ type: 'spring', stiffness: 180, damping: 24 }}
            />
          </div>
          <span>{String(slideProjects.length).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorks;
