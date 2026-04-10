import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BriefcaseBusiness, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import Navbar from './Navbar';

const roles = [
  'aspiring AI/ML researcher',
  'deep learning builder',
  'NLP and computer vision explorer',
  'research-driven AI engineer',
];

const socials = [
  { href: 'https://github.com/shivamprasad1001', label: 'GitHub', icon: Github },
  { href: 'https://www.linkedin.com/in/shivamprasad1001/', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://x.com/Shivampr101', label: 'X', icon: Twitter },
  { href: 'mailto:shivamprasad1001@gmail.com', label: 'Email', icon: Mail },
];

const particles = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  size: 2 + (index % 4),
  left: `${(index * 11) % 100}%`,
  top: `${(index * 17) % 100}%`,
  delay: index * 0.25,
  duration: 4 + (index % 5),
}));

const useTypewriter = (items: string[]) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = items[index];
    const complete = text === current;
    const empty = text.length === 0;
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          if (complete) {
            setDeleting(true);
            return;
          }
          setText(current.slice(0, text.length + 1));
          return;
        }

        if (empty) {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % items.length);
          return;
        }

        setText(current.slice(0, text.length - 1));
      },
      complete && !deleting ? 1400 : deleting ? 40 : 85
    );

    return () => clearTimeout(timeout);
  }, [deleting, index, items, text]);

  return text;
};

const Header: React.FC = () => {
  const magneticRef = useRef<HTMLAnchorElement>(null);
  const [magneticStyle, setMagneticStyle] = useState({ x: 0, y: 0 });
  const typedRole = useTypewriter(roles);
  const words = useMemo(() => ['Shivam', 'Prasad'], []);

  const handleMagnetMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = magneticRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    setMagneticStyle({ x: x * 0.18, y: y * 0.18 });
  };

  return (
    <header id="main-header" className="relative overflow-hidden">
      <Navbar />

      <section className="relative min-h-screen overflow-hidden pt-28">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.1),transparent_22%),radial-gradient(circle_at_78%_18%,rgba(139,92,246,0.12),transparent_16%)]" />
          <div className="absolute inset-0 opacity-40">
            {particles.map((particle) => (
              <motion.span
                key={particle.id}
                className="absolute rounded-full bg-cyan-300/50"
                style={{
                  width: particle.size,
                  height: particle.size,
                  left: particle.left,
                  top: particle.top,
                }}
                animate={{ y: [0, -18, 0], opacity: [0.25, 0.8, 0.25] }}
                transition={{
                  repeat: Infinity,
                  duration: particle.duration,
                  delay: particle.delay,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </div>

        <div className="section-shell relative z-10 flex min-h-[calc(100vh-7rem)] items-center">
          <div className="grid w-full gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
                </span>
                Focused on research collaborations
              </motion.div>

              <div className="mb-6 space-y-2">
                {words.map((word, index) => (
                  <motion.div
                    key={word}
                    className="overflow-hidden"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: { delayChildren: 0.2 + index * 0.15, staggerChildren: 0.04 },
                      },
                    }}
                  >
                    <div className="flex flex-wrap">
                      {word.split('').map((letter, letterIndex) => (
                        <motion.span
                          key={`${word}-${letterIndex}`}
                          variants={{
                            hidden: { y: '110%', opacity: 0 },
                            visible: { y: 0, opacity: 1 },
                          }}
                          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                          className="font-display text-[3.15rem] font-bold leading-[0.9] tracking-[-0.05em] text-slate-900 sm:text-[4.8rem] lg:text-[6.8rem]"
                        >
                          {letter}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                className="mb-8 flex min-h-[2rem] items-center gap-3 text-base text-slate-600 sm:text-xl"
              >
                <span className="font-mono text-xs uppercase tracking-[0.28em] text-slate-500">Research focus</span>
                <span className="font-display text-slate-900">{typedRole}</span>
                <span className="h-5 w-[2px] animate-pulse bg-cyan-400" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg"
              >
                I am building my portfolio around one clear goal: becoming an AI/ML researcher who can connect strong
                theory with practical systems. My work spans deep learning, NLP, computer vision, and LLM applications,
                and I am especially interested in projects that can grow into research papers, experiments, and
                meaningful real-world impact.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.78, duration: 0.6 }}
                className="mt-6 flex flex-wrap gap-2"
              >
                {['AI Research', 'Deep Learning', 'NLP', 'Computer Vision', 'PyTorch', 'Paper Writing'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.6 }}
                className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center"
              >
                <motion.a
                  ref={magneticRef}
                  href="#contact"
                  onMouseMove={handleMagnetMove}
                  onMouseLeave={() => setMagneticStyle({ x: 0, y: 0 })}
                  animate={{ x: magneticStyle.x, y: magneticStyle.y }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  data-cursor="interactive"
                  className="group inline-flex w-fit items-center gap-3 rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_32px_rgba(0,0,0,0.18)]"
                >
                  Contact me
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.a>

                <a
                  href="#portfolio"
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  View research projects
                  <BriefcaseBusiness className="h-4 w-4" />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="mt-12 flex flex-wrap gap-3"
              >
                {socials.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                    >
                      <span className="absolute inset-y-0 left-0 w-0 bg-slate-100 transition-all duration-300 group-hover:w-full" />
                      <Icon className="relative z-10 h-4 w-4" />
                      <span className="relative z-10">{social.label}</span>
                    </a>
                  );
                })}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="relative mx-auto w-full max-w-[27rem]"
            >
              <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
                <div className="mb-5 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  <span className="ml-3 font-mono text-xs uppercase tracking-[0.3em] text-slate-500">portrait</span>
                </div>
                <div className="noise-mask rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                  <div className="relative mx-auto aspect-square overflow-hidden rounded-[1.35rem]">
                    <motion.div
                      className="absolute inset-0 rounded-[1.35rem] bg-[conic-gradient(from_90deg,rgba(6,182,212,0.55),rgba(139,92,246,0.45),rgba(6,182,212,0.55))]"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                    />
                    <div className="absolute inset-[6px] rounded-[1.2rem] bg-white" />
                    <img
                      src="https://avatars.githubusercontent.com/u/161421872?q=80&w=400&h=400&fit=crop"
                      alt="Shivam Prasad"
                      className="absolute inset-[16px] h-[calc(100%-32px)] w-[calc(100%-32px)] rounded-[1rem] object-cover"
                    />
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {[
                      ['Model focus', 'LLMs, NLP, CV'],
                      ['Deployment', 'Inference-ready apps'],
                      ['Stack', 'Python, FastAPI, React'],
                    ].map(([title, value]) => (
                      <div key={title} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500">{title}</p>
                        <p className="mt-2 text-sm text-slate-700">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
