import React, { useState } from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    number: '01',
    label: 'AI Systems',
    title: 'Custom AI products that move from concept to usable software.',
    description: 'From scoped prototypes to production paths, I help shape the right product surface around the model.',
    tone: 'bg-cyan-400',
  },
  {
    number: '02',
    label: 'NLP',
    title: 'Language interfaces, retrieval workflows, and assistant experiences.',
    description: 'Ideal for chat, search, document understanding, and human-facing AI interactions.',
    tone: 'bg-violet-400',
  },
  {
    number: '03',
    label: 'Vision',
    title: 'Computer vision features for classification, detection, and recognition.',
    description: 'I build practical CV flows that plug into apps and business workflows, not just notebooks.',
    tone: 'bg-emerald-400',
  },
  {
    number: '04',
    label: 'Automation',
    title: 'Workflow automation where AI actually reduces manual drag.',
    description: 'Useful for repetitive operational tasks, triage systems, reporting, and structured decision flows.',
    tone: 'bg-amber-300',
  },
  {
    number: '05',
    label: 'Analytics',
    title: 'Predictive and time-series systems for data-driven decisions.',
    description: 'Forecasting, signal analysis, and operational dashboards with models behind them.',
    tone: 'bg-rose-400',
  },
  {
    number: '06',
    label: 'Full Stack',
    title: 'Interactive product surfaces for AI-backed experiences.',
    description: 'Frontend and backend delivery that gives the intelligence a polished interface and usable workflow.',
    tone: 'bg-sky-400',
  },
];

const ServiceCard: React.FC<(typeof services)[number]> = ({ number, label, title, description, tone }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    setRotation({ x: (0.5 - py) * 10, y: (px - 0.5) * 12 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -8 }}
      onMouseMove={onMove}
      onMouseLeave={() => setRotation({ x: 0, y: 0 })}
      className="h-full"
      style={{ perspective: 1200 }}
    >
      <div
        className="quiet-panel interactive-hover relative h-full overflow-hidden rounded-[1.9rem] p-6"
        style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
      >
        <span className="pointer-events-none absolute right-3 top-1 font-display text-[5rem] font-bold leading-none text-slate-200 sm:text-[6rem]">
          {number}
        </span>
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <span className={`h-2.5 w-2.5 rounded-full ${tone}`} />
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">{label}</span>
          </div>
          <h3 className="mt-6 font-display text-2xl font-semibold leading-tight text-slate-900">{title}</h3>
          <p className="mt-4 max-w-[28ch] text-sm leading-7 text-slate-600">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 sm:py-28">
      <div className="section-shell">
        <div className="mb-12">
          <p className="section-kicker">Services</p>
          <h2 className="section-title mt-4">A few ways I usually end up helping teams ship better work.</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.number} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
