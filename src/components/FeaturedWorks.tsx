import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Star } from 'lucide-react';
import type { WorkProject } from '../../types';
import projectsData from '../data/projectsData.json';

const projects = projectsData as WorkProject[];
const spotlight = projects[0];
const projectCount = projects.length;

const getProjectTags = (title: string) => {
  const key = title.toLowerCase();

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

const FeaturedWorks: React.FC = () => {
  return (
    <section id="portfolio" className="py-20 sm:py-28">
      <div className="section-shell">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">Research-aligned projects</p>
            <h2 className="section-title mt-4">Selected projects that reflect the problems I want to study more deeply.</h2>
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
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="quiet-panel group overflow-hidden rounded-[2rem] p-4 sm:p-6"
          >
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative overflow-hidden rounded-[1.5rem]">
                <img
                  src={spotlight.imageUrl}
                  alt={spotlight.title}
                  className="h-full min-h-[18rem] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090d] via-[#09090d]/20 to-transparent" />
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
                      className="inline-flex items-center gap-2 rounded-full bg-[#C17D4A] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#8B5E3C]"
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
                      className="inline-flex items-center gap-2 rounded-full border border-[#E0D9CF] bg-white px-5 py-3 text-sm text-[#7A6E65] transition hover:border-[#C17D4A]/30"
                    >
                      Source
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.article>
        )}

        <div className="mt-8 overflow-x-auto pb-3">
          <div className="flex min-w-full snap-x gap-5">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.06 }}
                className="group quiet-panel snap-start overflow-hidden rounded-[1.8rem] border-white/10 min-w-[19rem] max-w-[22rem] flex-1"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/10 to-transparent opacity-80" />
                  <div className="absolute inset-x-4 bottom-4 flex translate-y-4 gap-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-medium text-[#2C2825]"
                      >
                        Live
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-[#E0D9CF] bg-white/90 px-3 py-2 text-xs text-[#2C2825]"
                      >
                        GitHub
                        <Github className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-xl font-bold text-[#2C2825]">{project.title}</h3>
                    <span className="text-sm text-[#A89E94]">{project.year}</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[#7A6E65]">{project.description}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.24em] text-[#C17D4A]">Research direction signal</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {getProjectTags(project.title).map((tag) => (
                      <span key={`${project.title}-${tag}`} className="rounded-full border border-[#E0D9CF] bg-white px-3 py-1 text-xs text-[#7A6E65]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorks;
