import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, FolderTree, MapPin, Mail, Sparkles } from 'lucide-react';

const stats = [
  { label: 'Research paper collaborators', value: 4, suffix: '' },
  { label: 'Years building with AI/ML', value: 3, suffix: '+' },
  { label: 'Core ML domains explored', value: 4, suffix: '' },
];

const skillGroups = [
  {
    title: 'research-interests.ts',
    items: ['Deep Learning', 'Natural Language Processing', 'Computer Vision', 'LLMs', 'Model evaluation', 'Experiment design'],
  },
  {
    title: 'research-workflow.ts',
    items: ['Literature review', 'Paper reading', 'Ablation thinking', 'Prototyping ideas', 'Result analysis', 'Technical writing'],
  },
  {
    title: 'engineering-foundation.ts',
    items: ['Python', 'PyTorch', 'TensorFlow', 'FastAPI', 'React', 'Deployment basics'],
  },
];

const infoRows = [
  ['Name', 'Shivam Prasad'],
  ['Location', 'Lucknow / New Delhi, India'],
  ['Goal', 'AI/ML Researcher'],
  ['Email', 'shivamprasad1001@gmail.com'],
];

const CountUpCard: React.FC<{ label: string; value: number; suffix: string }> = ({ label, value, suffix }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        let frame = 0;
        const totalFrames = 40;
        const interval = window.setInterval(() => {
          frame += 1;
          const progress = frame / totalFrames;
          setCount(Math.round(value * progress));

          if (frame >= totalFrames) {
            window.clearInterval(interval);
          }
        }, 28);

        observer.disconnect();
      },
      { threshold: 0.45 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="interactive-hover glass-panel rounded-[1.75rem] p-6">
      <p className="font-display text-4xl font-bold tracking-tight text-[#2C2825] sm:text-5xl">
        {count}
        {suffix}
      </p>
      <p className="mt-3 text-sm text-[#7A6E65]">{label}</p>
    </div>
  );
};

const Biography: React.FC = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const memoizedGroups = useMemo(() => skillGroups, []);

  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="section-shell">
        <div className="mb-10">
          <p className="section-kicker">// about me</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.95fr]">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="quiet-panel noise-mask rounded-[2rem] p-7 sm:p-10"
          >
            <h2 className="editorial-divider font-display text-3xl font-bold tracking-tight text-[#2C2825] sm:text-5xl">
              I am shaping my work around becoming an AI/ML researcher with strong practical depth.
            </h2>
            <div className="mt-8 space-y-5 text-base leading-8 text-[#7A6E65]">
              <p>
                My portfolio is centered on the path from <span className="glow-underline text-[#2C2825]">student builder to serious research contributor</span>.
                I enjoy studying how machine learning ideas work, implementing them carefully, and turning them into systems that can be tested, improved, and eventually written up clearly.
              </p>
              <p>
                I&apos;m especially drawn to <span className="glow-underline text-[#2C2825]">deep learning, NLP, computer vision, and LLM-based systems</span>,
                because these areas combine strong mathematical ideas with visible real-world impact. I like going beyond implementation and asking why a method works, where it fails, and how it can be improved.
              </p>
              <p>
                Right now, one of the most meaningful parts of my journey is <span className="glow-underline text-[#2C2825]">writing a research paper with three college teammates</span>.
                That collaboration is helping me build the habits I care about most: reading papers, discussing ideas, designing experiments, documenting results, and learning how research becomes shared knowledge.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <CountUpCard key={stat.label} {...stat} />
              ))}
            </div>
          </motion.article>

          <div className="grid gap-6">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              className="quiet-panel rounded-[2rem] p-6 sm:p-8"
            >
              <div className="mb-5 flex items-center gap-3">
                <FolderTree className="h-5 w-5 text-[#C17D4A]" />
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#A89E94]">skill-tree</p>
              </div>

              <div className="space-y-3">
                {memoizedGroups.map((group, index) => (
                  <div key={group.title} className="rounded-2xl border border-[#E0D9CF] bg-white">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                      className="flex w-full items-center justify-between px-4 py-4 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`h-2.5 w-2.5 rounded-full ${index % 2 === 0 ? 'bg-[#C17D4A]' : 'bg-[#8B5E3C]'}`} />
                        <span className="font-mono text-sm text-[#2C2825]">{group.title}</span>
                      </div>
                      <ChevronRight
                        className={`h-4 w-4 text-[#7A6E65] transition-transform ${openIndex === index ? 'rotate-90' : ''}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-[#E0D9CF] px-4 py-4">
                            {group.items.map((item) => (
                              <div key={item} className="flex items-center gap-3 py-2 text-sm text-[#7A6E65]">
                                <span className="font-mono text-[#C17D4A]">├─</span>
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: 0.1 }}
              className="quiet-panel rounded-[2rem] p-6 sm:p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-[#8B5E3C]" />
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#A89E94]">personal-info</p>
              </div>

              <div className="divide-y divide-[#E0D9CF]/50">
                {infoRows.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[90px_1fr] gap-4 py-3 text-sm">
                    <span className="text-[#A89E94]">{label}</span>
                    <span className="text-[#2C2825] font-medium">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#E0D9CF] bg-white px-3 py-2">
                  <Sparkles className="h-4 w-4 text-[#C17D4A]" />
                  <span className="text-xs font-medium text-[#2C2825]">Researcher & Developer</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#E0D9CF] bg-white px-3 py-2">
                  <MapPin className="h-4 w-4 text-[#C17D4A]" />
                  <span className="text-xs font-medium text-[#2C2825]">India</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#E0D9CF] bg-white px-3 py-2">
                  <Mail className="h-4 w-4 text-[#8B5E3C]" />
                  <span className="text-xs font-medium text-[#2C2825]">Contactable</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Biography;
