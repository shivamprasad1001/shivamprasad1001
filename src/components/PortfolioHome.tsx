import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import projects from '../data/projectsData.json';
import GwenWidget from './GwenWidget';
import WelcomeIntro from './WelcomeIntro';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const reveal = { hidden: { opacity: 0, y: 26, scale: 0.985 }, show: { opacity: 1, y: 0, scale: 1 } };
const transition = { duration: 0.72, ease: [0.22, 1, 0.36, 1] } as const;

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.16 }} transition={{ ...transition, delay: reduced ? 0 : delay }}>{children}</motion.div>;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 20); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll); }, []);
  return <nav className="apple-nav-wrap">
    <div className={`apple-nav ${scrolled ? 'apple-nav-scrolled' : ''}`}>
      <a className="apple-wordmark" href="#top">Shivam<span>.</span></a>
      <div className="apple-nav-links">{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</div>
      <a className="nav-cta" href="#contact">Let’s talk <ArrowUpRight size={14} /></a>
      <button className="nav-menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
    </div>
    {open && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mobile-panel">
      {links.map(link => <a key={link.href} onClick={() => setOpen(false)} href={link.href}>{link.label}</a>)}
      <a onClick={() => setOpen(false)} href="#contact">Let’s talk</a>
    </motion.div>}
  </nav>;
}

function Hero() {
  const reduced = useReducedMotion();
  const title = 'Ideas into intelligent systems.'.split(' ');
  return <header id="top" className="hero">
    <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
    <div className="hero-inner">
      <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={transition} className="eyebrow">AI/ML researcher &amp; engineer</motion.p>
      <h1>{title.map((word, i) => <span className="hero-word" key={word}><motion.span initial={{ opacity: 0, y: '110%' }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: reduced ? 0 : 0.1 + i * 0.12 }}>{word}</motion.span></span>)}</h1>
      <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.48 }} className="hero-copy">I’m Shivam Prasad. I explore the space between rigorous AI research and tools people can genuinely use.</motion.p>
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.6 }} className="hero-actions">
        <motion.a whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: .97 }} href="#work" className="button-primary">Explore my work <ArrowDown size={16} /></motion.a>
        <a href="/resume.pdf" download="shivam-resume.pdf" className="text-link">Download résumé</a>
      </motion.div>
    </div>
    <div className="hero-bottom">Scroll to discover <span /></div>
  </header>;
}

function About() {
  const facts = [['03+', 'Years building with AI/ML'], ['04', 'Core research domains'], ['01', 'Research paper in progress']];
  return <section id="about" className="section about-section"><div className="container about-grid">
    <Reveal><p className="eyebrow">01 — About</p><h2>Curious by nature.<br />Deliberate by practice.</h2></Reveal>
    <Reveal delay={.08}><div className="about-copy"><p>I’m an aspiring AI/ML researcher from India, drawn to deep learning, NLP, computer vision, and LLM systems. I care as much about why a model works as I do about getting it into the hands of people.</p><p>My work is a growing collection of experiments, useful systems, and research contributions — built carefully, tested openly, and always moving toward the next question.</p><a href="#contact" className="text-link">More about my approach <ArrowUpRight size={15} /></a></div></Reveal>
  </div><div className="container fact-grid">{facts.map(([number, label], i) => <Reveal key={label} delay={i * .08}><div className="fact"><strong>{number}</strong><span>{label}</span></div></Reveal>)}</div></section>;
}

const featured = projects.slice(0, 4);
function StackedWork() {
  const [selectedProject, setSelectedProject] = useState<(typeof featured)[number] | null>(null);
  return <section id="work" className="section work-section"><div className="container work-intro"><Reveal><p className="eyebrow">02 — Selected work</p><h2>Research, engineered<br />with purpose.</h2></Reveal><Reveal delay={.08}><p>Each project is a focused exploration — from multi-agent reasoning to deployable computer vision.</p></Reveal></div>
    <div className="stack-wrap">{featured.map((project, index) => <article className="stack-card" key={project.title} style={{ '--stack-index': index } as React.CSSProperties}>
      <div className="project-image"><img src={project.imageUrl} alt="" loading={index === 0 ? 'eager' : 'lazy'} /><div className="project-shade" /></div>
      <div className="project-content"><div><p className="project-index">0{index + 1} / {project.year}</p><h3>{project.title}</h3><p>{project.description}</p></div><div className="project-actions"><button onClick={() => setSelectedProject(project)}>Details <ArrowUpRight size={15} /></button>{project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer"><Github size={17} /> Source</a>}{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="button-light">View project <ArrowUpRight size={16} /></a>}</div></div>
    </article>)}</div><div className="container"><a className="text-link all-projects" href="https://github.com/shivamprasad1001" target="_blank" rel="noreferrer">View all projects on GitHub <ArrowUpRight size={15} /></a></div>
    {/* Detail layer retains scroll context and provides a smooth, focused project view. */}
    <AnimatePresence>{selectedProject && <motion.div className="project-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)}><motion.article className="project-modal" initial={{ opacity: 0, y: 24, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: .98 }} transition={transition} onClick={event => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project details"><X size={18} /></button><p className="eyebrow">{selectedProject.year} — Project overview</p><h3>{selectedProject.title}</h3><p>{selectedProject.description}</p><div className="project-actions">{selectedProject.repoUrl && <a href={selectedProject.repoUrl} target="_blank" rel="noreferrer"><Github size={17} /> View source</a>}{selectedProject.liveUrl && <a className="button-primary" href={selectedProject.liveUrl} target="_blank" rel="noreferrer">Open project <ArrowUpRight size={16} /></a>}</div></motion.article></motion.div>}</AnimatePresence>
  </section>;
}

function Skills() {
  const skills = ['Python', 'PyTorch', 'TensorFlow', 'FastAPI', 'React', 'Computer Vision', 'NLP', 'LLMs', 'Android', 'Docker'];
  return <section id="skills" className="section skills-section"><div className="container"><Reveal><p className="eyebrow">03 — Toolkit</p><h2>Technical range,<br />kept human.</h2></Reveal><div className="skill-list">{skills.map((skill, index) => <Reveal key={skill} delay={index * .045}><div className="skill-item"><span>0{index + 1}</span><strong>{skill}</strong><i /></div></Reveal>)}</div></div></section>;
}

function LabNotes() {
  const notes = [
    ['Research first', 'Start with the question, then build the smallest experiment that can answer it.'],
    ['Systems thinking', 'A useful model includes the interface, feedback loop, and real-world constraints around it.'],
    ['Share the learning', 'Good work gets clearer when it is documented, tested, and open to critique.'],
  ];
  return <section className="lab-section"><div className="container"><Reveal><p className="eyebrow">In the lab</p><div className="lab-heading"><h2>A quiet obsession<br />with better questions.</h2><div className="live-signal"><i /> Building, reading, iterating</div></div></Reveal><div className="lab-grid">{notes.map(([title, copy], index) => <Reveal key={title} delay={index * .09}><article><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article></Reveal>)}</div></div></section>;
}

function Contact() {
  return <section id="contact" className="contact-section"><div className="container"><Reveal className="contact-card"><p className="eyebrow">04 — Contact</p><h2>Let’s make something<br />that matters.</h2><p>For research collaborations, ambitious product ideas, or just a good conversation about AI.</p><motion.a whileHover={{ scale: 1.025 }} whileTap={{ scale: .97 }} className="button-primary" href="mailto:shivamprasad1001@gmail.com">Start a conversation <ArrowUpRight size={16} /></motion.a></Reveal></div></section>;
}

function Footer() { return <footer className="footer"><div className="container"><a className="apple-wordmark" href="#top">Shivam<span>.</span></a><div><a href="https://github.com/shivamprasad1001" target="_blank" rel="noreferrer"><Github size={18} /></a><a href="https://www.linkedin.com/in/shivamprasad1001" target="_blank" rel="noreferrer"><Linkedin size={18} /></a><a href="mailto:shivamprasad1001@gmail.com"><Mail size={18} /></a></div><p>© {new Date().getFullYear()} Shivam Prasad</p></div></footer>; }

export default function PortfolioHome() {
  const { scrollYProgress } = useScroll(); const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 26 });
  const [introComplete, setIntroComplete] = useState(false);
  return <div className="portfolio">{!introComplete && <WelcomeIntro onComplete={() => setIntroComplete(true)} />}<motion.div className="scroll-progress" style={{ scaleX: progress }} /><Navbar /><main><Hero /><About /><StackedWork /><Skills /><LabNotes /><Contact /></main><Footer /><GwenWidget /></div>;
}
