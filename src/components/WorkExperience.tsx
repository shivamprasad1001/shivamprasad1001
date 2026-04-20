import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Experience } from '../../types';
import { ArrowRight, Building2, Sparkles } from 'lucide-react';

const experiences: Experience[] = [
  {
    company: 'Truwix Tech Solutions Pvt. Ltd.',
    period: 'Sep 2025 - Present',
    location: 'Onsite',
    title: 'AI/ML Engineer (Trainee)',
    description:
      'Designing and deploying intelligent systems for chatbots, automation tools, and predictive workflows using machine learning, deep learning, and NLP.',
    fullDescription:
      'At Truwix, I work on end-to-end AI delivery: building assistants, integrating models into usable products, shaping deployment paths, and collaborating across teams so the systems are not only intelligent but operationally practical. The focus is on scalable architectures, strong user interaction quality, and measurable productivity gains through automation.',
  },
];

const WorkExperience: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeExperience = experiences[activeIndex];

  return (
    <section id="experience" className="py-20 sm:py-28">
      <div className="section-shell">
        <div className="mb-12">
          <p className="section-kicker">Experience</p>
          <h2 className="section-title mt-4">Current role and the kind of systems I&apos;m building day to day.</h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="relative pl-8">
            <div className="absolute bottom-0 left-3 top-3 w-px bg-[#E0D9CF]" />
            <div className="space-y-5">
              {experiences.map((experience, index) => {
                const active = index === activeIndex;

                return (
                  <button
                    key={experience.company}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="relative block w-full text-left"
                  >
                    <span
                      className={`absolute -left-[1.95rem] top-5 h-3.5 w-3.5 rounded-full ${
                        active ? 'bg-[#C17D4A] shadow-[0_0_0_8px_rgba(193,125,74,0.12)] animate-pulse' : 'bg-[#E0D9CF]'
                      }`}
                    />
                    <div className={`glass-panel rounded-[1.6rem] p-5 transition ${active ? 'border-[#C17D4A]/25' : 'border-[#E0D9CF]/30'}`}>
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-display text-lg font-bold text-[#2C2825]">{experience.company}</p>
                        {active && (
                          <span className="rounded-full bg-[#C17D4A]/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-[#C17D4A]">
                            Now
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-[#7A6E65]">{experience.period}</p>
                      <p className="mt-1 text-sm text-[#A89E94]">{experience.location}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExperience.company}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex flex-wrap items-start justify-between gap-5">
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#E0D9CF] bg-white">
                        <Building2 className="h-6 w-6 text-[#C17D4A]" />
                      </div>
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#A89E94]">{activeExperience.period}</p>
                        <h3 className="mt-2 font-display text-3xl font-bold text-[#2C2825]">{activeExperience.title}</h3>
                      </div>
                    </div>
                    <p className="max-w-2xl text-sm leading-7 text-[#7A6E65]">{activeExperience.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {['LLMs', 'Automation', 'NLP', 'Deployment'].map((tag) => (
                      <span key={tag} className="rounded-full border border-[#E0D9CF] bg-white px-3 py-2 text-xs text-[#7A6E65]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {activeExperience.fullDescription && (
                  <div className="mt-8 rounded-[1.6rem] border border-[#E0D9CF] bg-white p-5">
                    <div className="mb-3 flex items-center gap-2 text-[#C17D4A]">
                      <Sparkles className="h-4 w-4" />
                      <span className="font-mono text-[11px] uppercase tracking-[0.28em]">role_summary</span>
                    </div>
                    <p className="text-sm leading-7 text-[#7A6E65]">{activeExperience.fullDescription}</p>
                  </div>
                )}

                <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#E0D9CF] bg-white px-4 py-3 text-sm text-[#7A6E65]">
                  Live role indicator
                  <ArrowRight className="h-4 w-4 text-[#C17D4A]" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
