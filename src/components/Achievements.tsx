import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { Achievement, Skill } from '../../types';
import { Brain, BookOpenText, Code2, Eye, FlaskConical, GitBranch, MessageSquare, Network } from 'lucide-react';

const skills: Skill[] = [
  { name: 'Python', level: 95, icon: Code2, description: 'My primary language for experiments, model training, analysis, and research prototypes.' },
  { name: 'Deep Learning', level: 90, icon: Brain, description: 'Neural network fundamentals, model experimentation, fine-tuning, and implementation-heavy learning.' },
  { name: 'NLP', level: 86, icon: MessageSquare, description: 'Text processing, embeddings, LLM applications, document intelligence, and language-focused systems.' },
  { name: 'Computer Vision', level: 81, icon: Eye, description: 'Image understanding, classification, emotion-aware interfaces, and applied vision workflows.' },
  { name: 'Paper Reading', level: 78, icon: BookOpenText, description: 'Actively building the habit of reading papers, extracting ideas, and translating them into experiments.' },
  { name: 'Experimentation', level: 82, icon: FlaskConical, description: 'Testing ideas, comparing approaches, iterating on results, and learning from model behavior.' },
  { name: 'Research Collaboration', level: 88, icon: GitBranch, description: 'Working with teammates on shared ideas, technical discussion, version control, and paper progress.' },
  { name: 'LLM & RAG Systems', level: 85, icon: Network, description: 'Retriever pipelines, document chat systems, grounded generation, and multi-stage AI workflows.' },
];

const timeline: Array<Achievement & { kind: 'Education' | 'Certification' }> = [
  {
    period: '2022 - 2026',
    title: 'B.Tech in Computer Science & Engineering',
    institution: 'Dr. A.P.J. Abdul Kalam Technical University',
    kind: 'Education',
  },
  {
    period: '2025 - Present',
    title: 'Collaborative Research Paper in Progress',
    institution: 'With 3 college teammates',
    description: 'Working as a four-member student team on an AI/ML paper with focus on idea development, implementation, evaluation, and technical writing.',
    kind: 'Certification',
  },
  {
    period: '2025',
    title: 'Artificial Intelligence A-Z',
    institution: 'Udemy',
    description: 'Hands-on with agentic AI, GenAI, NLP, and reinforcement learning.',
    kind: 'Certification',
  },
  {
    period: '2024',
    title: 'Deep Learning Specialization',
    institution: 'Coursera / Andrew Ng',
    description: 'Neural networks, CNNs, sequence models, and core deep learning practice.',
    kind: 'Certification',
  },
];

const RingSkill: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const circumference = 2 * Math.PI * 46;
  const offset = circumference - (circumference * skill.level) / 100;

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: index * 0.08 }}
      className="glass-panel h-full rounded-[1.75rem] p-5"
    >
      <div className="flex h-full flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">
            [{skill.name.toLowerCase().replace(/\s+/g, '_')}]
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">{skill.description}</p>
        </div>
        <div className="relative mx-auto h-28 w-28 shrink-0 sm:mx-0 sm:self-start">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(15,23,42,0.08)" strokeWidth="10" />
            <motion.circle
              cx="60"
              cy="60"
              r="46"
              fill="none"
              stroke="url(#ringGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: visible ? offset : circumference }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C17D4A" />
                <stop offset="100%" stopColor="#8B5E3C" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <skill.icon className="h-5 w-5 text-[#C17D4A]" />
            <span className="mt-1 font-display text-lg font-bold text-slate-900">{skill.level}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Achievements: React.FC = () => {
  return (
    <section id="toolkit" className="py-20 sm:py-28">
      <div className="section-shell">
        <div className="mb-12">
          <p className="section-kicker">Research foundation</p>
          <h2 className="section-title mt-4">The skills, habits, and milestones shaping my path toward AI/ML research.</h2>
          <p className="section-copy mt-4">
            This section highlights the technical foundation behind my long-term goal. I am building depth in core machine
            learning areas while also learning how to read papers, design experiments, collaborate on ideas, and turn
            promising concepts into research-ready work.
          </p>
        </div>

        <div className="items-start gap-8 lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(22rem,0.8fr)]">
          <div className="grid auto-rows-fr gap-5 md:grid-cols-2">
            {skills.map((skill, index) => (
              <RingSkill key={skill.name} skill={skill} index={index} />
            ))}
          </div>

          <div className="glass-panel mt-8 rounded-[2rem] p-6 sm:p-8 lg:mt-0">
            <div className="mb-8">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-slate-500">[education_research_and_certifications]</p>
            </div>
            <div className="relative pl-8 sm:pl-10">
              <div className="absolute bottom-0 left-3 top-2 w-px bg-gradient-to-b from-[#C17D4A]/70 via-[#8B5E3C]/45 to-transparent sm:left-4" />
              <div className="space-y-8">
                {timeline.map((item) => (
                  <motion.div
                    key={`${item.kind}-${item.title}`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="relative"
                  >
                    <span className="absolute -left-[1.9rem] top-2 h-3 w-3 rounded-full border border-[#C17D4A]/40 bg-white sm:-left-[2.15rem]" />
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-slate-500">{item.period}</p>
                    <div className="mt-2 rounded-[1.5rem] border border-[#E0D9CF] bg-white p-5">
                      <p className="text-xs uppercase tracking-[0.28em] text-[#C17D4A]">[{item.kind}]</p>
                      <h3 className="mt-3 font-display text-xl font-semibold text-[#2C2825]">{item.title}</h3>
                      <p className="mt-2 text-sm text-[#A89E94]">{item.institution}</p>
                      {item.description && <p className="mt-3 text-sm leading-6 text-[#2C2825]">{item.description}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
