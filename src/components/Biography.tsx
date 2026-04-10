import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, FolderTree, MapPin, Mail, Sparkles } from 'lucide-react';

const stats = [
  { label: 'AI builds shipped', value: 24, suffix: '+' },
  { label: 'Years building', value: 3, suffix: '+' },
  { label: 'ML domains used', value: 8, suffix: '' },
];

const skillGroups = [
  {
    title: 'ai-stack.ts',
    items: ['PyTorch', 'TensorFlow', 'RAG pipelines', 'NLP', 'Computer Vision', 'LLM apps'],
  },
  {
    title: 'frontend-ui.ts',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
  },
  {
    title: 'systems-backend.ts',
    items: ['FastAPI', 'Flask', 'Docker', 'PostgreSQL', 'MongoDB', 'Automation'],
  },
];

const infoRows = [
  ['Name', 'Shivam Prasad'],
  ['Location', 'Lucknow / New Delhi, India'],
  ['Freelance', 'Available'],
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
      <p className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        {count}
        {suffix}
      </p>
      <p className="mt-3 text-sm text-slate-500">{label}</p>
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
            <h2 className="editorial-divider font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              I like building AI systems that are useful, legible, and ready for real users.
            </h2>
            <div className="mt-8 space-y-5 text-base leading-8 text-slate-600">
              <p>
                Most of my work sits where <span className="glow-underline text-slate-900">machine learning meets product design</span>.
                I enjoy taking ideas that start out technical and shaping them into interfaces, tools, and workflows people can actually navigate without friction.
              </p>
              <p>
                I&apos;m especially drawn to <span className="glow-underline text-slate-900">LLM products, RAG systems, automation, and full-stack AI apps</span>,
                because they demand more than model work alone. Retrieval quality, API design, latency, evaluation, and UI clarity all have to work together.
              </p>
              <p>
                I care a lot about <span className="glow-underline text-slate-900">taking AI projects past the demo stage</span>.
                That means thinking about deployment, grounded outputs, practical workflows, and an interface that makes the system feel trustworthy instead of gimmicky.
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
                <FolderTree className="h-5 w-5 text-cyan-300" />
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-slate-500">skill-tree</p>
              </div>

              <div className="space-y-3">
                {memoizedGroups.map((group, index) => (
                  <div key={group.title} className="rounded-2xl border border-slate-200 bg-white">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                      className="flex w-full items-center justify-between px-4 py-4 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                        <span className="font-mono text-sm text-slate-800">{group.title}</span>
                      </div>
                      <ChevronRight
                        className={`h-4 w-4 text-slate-500 transition-transform ${openIndex === index ? 'rotate-90' : ''}`}
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
                          <div className="border-t border-slate-200 px-4 py-4">
                            {group.items.map((item) => (
                              <div key={item} className="flex items-center gap-3 py-2 text-sm text-slate-600">
                                <span className="font-mono text-cyan-300">├─</span>
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
              <div className="mb-5 flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-violet-300" />
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-slate-500">personal-info</p>
              </div>

              <div className="divide-y divide-white/8">
                {infoRows.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[90px_1fr] gap-4 py-3 text-sm">
                    <span className="text-slate-500">{label}</span>
                    <span className="text-slate-800">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2">
                  <Sparkles className="h-4 w-4 text-cyan-500" />
                  AI-first product builder
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2">
                  <MapPin className="h-4 w-4 text-cyan-300" />
                  Remote + onsite friendly
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2">
                  <Mail className="h-4 w-4 text-violet-300" />
                  Fast replies
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
