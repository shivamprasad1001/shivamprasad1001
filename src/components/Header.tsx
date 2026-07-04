import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BriefcaseBusiness, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import Navbar from './Navbar';
import Magnetic from './Magnetic';
import TiltCard from './TiltCard';

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

  // Simulating real-time face mesh coordinates fluctuating for the AI Scan effect
  const [coords, setCoords] = useState({ x1: 142, y1: 158, x2: 246, y2: 154 });
  useEffect(() => {
    const interval = setInterval(() => {
      setCoords({
        x1: Math.floor(138 + Math.random() * 8),
        y1: Math.floor(154 + Math.random() * 8),
        x2: Math.floor(242 + Math.random() * 8),
        y2: Math.floor(150 + Math.random() * 8),
      });
    }, 250);
    return () => clearInterval(interval);
  }, []);

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

      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(193,125,74,0.1),transparent_22%),radial-gradient(circle_at_78%_18%,rgba(139,92,246,0.06),transparent_16%)]" />
        <div className="absolute inset-0 opacity-40">
          {particles.map((particle) => (
            <motion.span
              key={particle.id}
              className="absolute rounded-full bg-amber-500/40"
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

      <div className="section-shell relative z-10 flex min-h-[calc(100vh-6rem)] items-center pt-24 pb-12 lg:pt-32">
        <div className="grid w-full gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10 inline-flex items-center gap-3 rounded-full border border-[#E0D9CF] bg-white px-4 py-2 text-sm text-[#7A6E65]"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C17D4A] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#C17D4A]" />
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
                        className="font-display text-[2.5rem] font-bold leading-[0.9] tracking-[-0.05em] text-[#2C2825] sm:text-[3.8rem] lg:text-[5.5rem]"
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
              className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-base text-[#7A6E65] sm:text-xl"
            >
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#A89E94]">
                Research focu<a href="https://www.shivamprasad1001.in/roadmap.html" className="hover:text-inherit cursor-default">s</a>
              </span>
              <span className="font-display italic text-[#2C2825]">{typedRole}</span>
              <span className="h-5 w-[2px] animate-pulse bg-[#C17D4A]" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="max-w-2xl text-base leading-8 text-[#7A6E65] sm:text-lg"
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
                  className="rounded-full border border-[#E0D9CF] bg-white px-3 py-1 text-xs font-medium text-[#7A6E65]"
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
              {/* Wrapped in Magnetic wrapper for interactive motion trend */}
              <motion.a
                ref={magneticRef}
                href="#contact"
                onMouseMove={handleMagnetMove}
                onMouseLeave={() => setMagneticStyle({ x: 0, y: 0 })}
                animate={{ x: magneticStyle.x, y: magneticStyle.y }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                data-cursor="interactive"
                className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#2C2825] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(44,40,37,0.18)]"
              >
                Contact me
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>

              <Magnetic strength={0.25}>
                <a
                  href="#portfolio"
                  className="inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm text-[#7A6E65] transition neu-button"
                >
                  View research projects
                  <BriefcaseBusiness className="h-4 w-4" />
                </a>
              </Magnetic>
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
                  <Magnetic key={social.label} strength={0.3}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-4 py-2.5 text-sm text-[#7A6E65] transition neu-button hover:text-[#2C2825]"
                    >
                      <Icon className="relative z-10 h-4 w-4" />
                      <span className="relative z-10">{social.label}</span>
                    </a>
                  </Magnetic>
                );
              })}
            </motion.div>
          </div>

          {/* Premium Computer Vision Scan Target Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="relative mx-auto w-full max-w-[27rem]"
          >
            <TiltCard className="h-full w-full">
              <div className="relative rounded-[2rem] p-5 glass-panel select-none">
                {/* Console header bar */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400 animate-pulse" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#8B5E3C]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#C17D4A]" />
                    <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#A89E94]">
                      Inference HUD
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-[#C17D4A] font-semibold animate-pulse">
                    SYS_ACTIVE
                  </span>
                </div>

                {/* Portrait container with live computer vision scanning animation */}
                <div className="noise-mask rounded-[1.5rem] p-4 neu-pressed relative overflow-hidden">
                  <div className="relative mx-auto aspect-square overflow-hidden rounded-[1.2rem] bg-white border border-[#E0D9CF]/40">
                    
                    {/* Bounding box visual target indicators */}
                    <div className="absolute inset-2 border border-[#C17D4A]/15 rounded-[0.8rem] pointer-events-none z-10">
                      <div className="absolute -top-1 -left-1 h-4 w-4 border-t-2 border-l-2 border-[#C17D4A] rounded-tl-[4px]" />
                      <div className="absolute -top-1 -right-1 h-4 w-4 border-t-2 border-r-2 border-[#C17D4A] rounded-tr-[4px]" />
                      <div className="absolute -bottom-1 -left-1 h-4 w-4 border-b-2 border-l-2 border-[#C17D4A] rounded-bl-[4px]" />
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 border-b-2 border-r-2 border-[#C17D4A] rounded-br-[4px]" />
                    </div>

                    {/* Sweeping scanline */}
                    <motion.div
                      className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C17D4A]/60 to-transparent shadow-[0_0_8px_rgba(193,125,74,0.8)] pointer-events-none z-10"
                      animate={{ top: ['4%', '96%', '4%'] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    {/* HUD labels inside the frame */}
                    <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md rounded-md px-2 py-0.5 border border-white/10 pointer-events-none select-none font-mono text-[7px] tracking-wider text-white">
                      <span className="text-[#C17D4A] font-semibold">● DETECT: AGENT</span> | CAM_01
                    </div>

                    <div className="absolute bottom-4 left-4 z-10 bg-black/60 backdrop-blur-md rounded-md px-2 py-0.5 border border-white/10 pointer-events-none select-none font-mono text-[7px] tracking-wider text-white">
                      ID: <span className="text-[#C17D4A]">SHIVAM_P.26n</span>
                    </div>

                    <div className="absolute bottom-4 right-4 z-10 bg-black/60 backdrop-blur-md rounded-md px-2 py-0.5 border border-white/10 pointer-events-none select-none font-mono text-[7px] tracking-wider text-white">
                      CONF: <span className="text-[#C17D4A]">99.96%</span>
                    </div>

                    {/* Dynamic coordinate face tracking points */}
                    <div className="absolute inset-0 pointer-events-none z-10">
                      {/* Left eye tracker */}
                      <div className="absolute left-[38%] top-[40%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                        <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-[#C17D4A] opacity-60" />
                        <span className="h-1.5 w-1.5 rounded-full bg-[#C17D4A]" />
                        <span className="absolute left-3.5 font-mono text-[6px] text-white bg-black/50 px-1 py-0.5 rounded leading-none">
                          x:{coords.x1} y:{coords.y1}
                        </span>
                      </div>

                      {/* Right eye tracker */}
                      <div className="absolute left-[62%] top-[40%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                        <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-[#C17D4A] opacity-60" />
                        <span className="h-1.5 w-1.5 rounded-full bg-[#C17D4A]" />
                        <span className="absolute left-3.5 font-mono text-[6px] text-white bg-black/50 px-1 py-0.5 rounded leading-none">
                          x:{coords.x2} y:{coords.y2}
                        </span>
                      </div>

                      {/* Chin/Mouth tracker */}
                      <div className="absolute left-[50%] top-[66%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#C17D4A]" />
                        <span className="absolute left-3.5 font-mono text-[6px] text-white bg-black/50 px-1 py-0.5 rounded leading-none">
                          MESH_3
                        </span>
                      </div>
                    </div>

                    {/* Portrait Image */}
                    <img
                      src="https://avatars.githubusercontent.com/u/161421872?q=80&w=400&h=400&fit=crop"
                      alt="Shivam Prasad"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                    />
                  </div>

                  {/* Profile highlights row */}
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {[
                      ['Model focus', 'LLMs, NLP, CV'],
                      ['Deployment', 'Inference-ready apps'],
                      ['Stack', 'Python, FastAPI, React'],
                    ].map(([title, value]) => (
                      <div key={title} className="rounded-2xl px-4 py-3 neu-raised text-center sm:text-left transition-all duration-300 hover:translate-y-[-2px]">
                        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#A89E94] font-semibold">{title}</p>
                        <p className="mt-2 text-xs font-medium text-[#7A6E65]">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
