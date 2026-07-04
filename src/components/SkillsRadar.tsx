import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SkillData {
  category: string;
  skillLevel: number;
  deliveryConfidence: number;
  learningAgility: number;
}

const skillsData: SkillData[] = [
  { category: 'Languages', skillLevel: 92, deliveryConfidence: 90, learningAgility: 95 },
  { category: 'Front-End', skillLevel: 82, deliveryConfidence: 80, learningAgility: 88 },
  { category: 'Back-End', skillLevel: 90, deliveryConfidence: 88, learningAgility: 90 },
  { category: 'Databases', skillLevel: 85, deliveryConfidence: 80, learningAgility: 70 },
  { category: 'Data Analytics', skillLevel: 88, deliveryConfidence: 85, learningAgility: 90 },
  { category: 'AI & ML', skillLevel: 96, deliveryConfidence: 93, learningAgility: 97 },
  { category: 'Dev Tools', skillLevel: 94, deliveryConfidence: 92, learningAgility: 95 },
];

const metrics = [
  { key: 'skillLevel' as const, label: 'Skill Level', color: '#C17D4A' },
  { key: 'deliveryConfidence' as const, label: 'Delivery Confidence', color: '#8B5E3C' },
  { key: 'learningAgility' as const, label: 'Learning Agility', color: '#7A6E65' },
];

const categoryDetails: Record<string, { desc: string; tech: string[] }> = {
  Languages: {
    desc: 'Core syntax and programming paradigms used to build high-performance systems and scripts.',
    tech: ['Python', 'C++', 'Go', 'Rust', 'JavaScript', 'TypeScript']
  },
  'Front-End': {
    desc: 'Creating fluid, responsive, and visually stunning interactive experiences.',
    tech: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Framer Motion']
  },
  'Back-End': {
    desc: 'Designing robust, scalable API architectures, message queues, and background services.',
    tech: ['FastAPI', 'Node.js', 'Express', 'Deno', 'gRPC']
  },
  Databases: {
    desc: 'Designing efficient database schemas, query optimizations, and caching layers.',
    tech: ['PostgreSQL', 'Redis', 'MongoDB', 'Supabase']
  },
  'Data Analytics': {
    desc: 'Mining insights, statistical modeling, and data pipelines for informed decisions.',
    tech: ['Pandas', 'NumPy', 'Scikit-learn', 'Tableau', 'Jupyter']
  },
  'AI & ML': {
    desc: 'Training custom computer vision models, fine-tuning LLMs, and serving real-time inferences.',
    tech: ['PyTorch', 'YOLO v8/v11', 'HuggingFace', 'OpenCV', 'TensorFlow']
  },
  'Dev Tools': {
    desc: 'Automating CI/CD pipelines, containerization, and configuring secure servers.',
    tech: ['Git', 'Docker', 'GitHub Actions', 'AWS', 'Linux']
  }
};

const SkillsRadar: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<(typeof metrics)[number]['key'] | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('AI & ML');

  const size = 520;
  const center = size / 2;
  const radius = 175;
  const levels = 5;
  const angleStep = (2 * Math.PI) / skillsData.length;

  const visibleMetrics = useMemo(
    () => metrics.filter((metric) => !selectedMetric || metric.key === selectedMetric),
    [selectedMetric]
  );

  const getPoint = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / 100) * radius;
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
  };

  const createPath = (key: keyof SkillData) =>
    `${skillsData
      .map((skill, index) => {
        const { x, y } = getPoint(skill[key] as number, index);
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ')} Z`;

  const getTextAnchor = (index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const cos = Math.cos(angle);
    if (cos < -0.15) return 'end';
    if (cos > 0.15) return 'start';
    return 'middle';
  };

  // Find the skill data for the currently active category
  const currentSkillData = useMemo(() => {
    return skillsData.find((s) => s.category === activeCategory) || skillsData[5];
  }, [activeCategory]);

  return (
    <section id="skills" className="py-20 sm:py-28">
      <div className="section-shell">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">Skill radar</p>
            <h2 className="section-title mt-4">A quick read on where I deliver strongest.</h2>
            <p className="section-copy mt-4">
              Click a legend pill to isolate a single signal. Hover over any node or category label to inspect detailed competency metrics.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {metrics.map((metric) => {
              const active = selectedMetric === metric.key;

              return (
                <button
                  key={metric.key}
                  type="button"
                  onClick={() => setSelectedMetric(active ? null : metric.key)}
                  className={`rounded-full px-4 py-2 text-sm transition flex items-center ${
                    active
                      ? 'neu-pressed text-[#2C2825] font-semibold'
                      : 'neu-button text-[#7A6E65] hover:text-[#2C2825]'
                  }`}
                >
                  <span
                    className="mr-2 inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: metric.color }}
                  />
                  {metric.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(44,40,37,0.04)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />
          
          <div className="relative grid gap-8 lg:grid-cols-12 items-center">
            {/* SVG radar chart on the left */}
            <div className="lg:col-span-7 flex justify-center relative">
              <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[500px] overflow-visible">
                <defs>
                  <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#DACFBC" flood-opacity="0.5" />
                  </filter>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Concentric rings */}
                {Array.from({ length: levels }).map((_, index) => {
                  const r = (radius / levels) * (index + 1);
                  return (
                    <circle
                      key={index}
                      cx={center}
                      cy={center}
                      r={r}
                      fill={index % 2 === 0 ? 'rgba(44, 40, 37, 0.015)' : 'none'}
                      stroke="rgba(44, 40, 37, 0.05)"
                      strokeWidth="1"
                      strokeDasharray={index === levels - 1 ? 'none' : '3,3'}
                    />
                  );
                })}

                {/* Level indicators */}
                {Array.from({ length: levels }).map((_, index) => {
                  const val = ((index + 1) / levels) * 100;
                  return (
                    <text
                      key={index}
                      x={center}
                      y={center - (radius / levels) * (index + 1) - 4}
                      textAnchor="middle"
                      className="fill-[#A89E94] text-[8px] font-mono"
                    >
                      {val}%
                    </text>
                  );
                })}

                {/* Axis lines */}
                {skillsData.map((_, index) => {
                  const { x, y } = getPoint(100, index);
                  return (
                    <line
                      key={index}
                      x1={center}
                      y1={center}
                      x2={x}
                      y2={y}
                      stroke="rgba(44, 40, 37, 0.06)"
                      strokeWidth="1.2"
                    />
                  );
                })}

                {/* Polygon paths */}
                {visibleMetrics.map((metric, metricIndex) => (
                  <motion.path
                    key={metric.key}
                    d={createPath(metric.key)}
                    fill={metric.color}
                    fillOpacity={0.06}
                    stroke={metric.color}
                    strokeWidth="2.5"
                    filter="url(#soft-shadow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1.1, delay: metricIndex * 0.15 }}
                  />
                ))}

                {/* Interactive points */}
                {visibleMetrics.map((metric) =>
                  skillsData.map((skill, index) => {
                    const { x, y } = getPoint(skill[metric.key], index);
                    const isSelected = activeCategory === skill.category;

                    return (
                      <circle
                        key={`${metric.key}-${skill.category}`}
                        cx={x}
                        cy={y}
                        r={isSelected ? '7' : '5'}
                        fill={metric.color}
                        stroke="#ffffff"
                        strokeWidth={isSelected ? '3.5' : '2.5'}
                        className="cursor-pointer transition-all duration-200"
                        style={{ filter: isSelected ? 'url(#glow)' : 'url(#soft-shadow)' }}
                        onMouseEnter={() => setActiveCategory(skill.category)}
                      />
                    );
                  })
                )}

                {/* Interactive label anchors */}
                {skillsData.map((skill, index) => {
                  const { x, y } = getPoint(114, index);
                  const isCurrent = activeCategory === skill.category;
                  const anchor = getTextAnchor(index);

                  return (
                    <text
                      key={skill.category}
                      x={x}
                      y={y}
                      textAnchor={anchor}
                      dominantBaseline="middle"
                      className={`cursor-pointer text-[10px] sm:text-[11px] font-semibold font-mono tracking-wider transition-all duration-300 ${
                        isCurrent
                          ? 'fill-[#C17D4A] font-bold scale-[1.05]'
                          : 'fill-[#7A6E65] hover:fill-[#2C2825]'
                      }`}
                      onClick={() => setActiveCategory(skill.category)}
                      onMouseEnter={() => setActiveCategory(skill.category)}
                    >
                      {skill.category.toUpperCase()}
                    </text>
                  );
                })}
              </svg>
            </div>

            {/* Dynamic Console / Detail Panel on the right */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[380px] p-6 rounded-3xl neu-pressed relative overflow-hidden">
              <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-[#C17D4A]/5 opacity-[0.03] pointer-events-none" />
              
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#C17D4A] font-semibold">
                  Competency Details
                </span>
                
                <h3 className="text-xl font-bold text-[#2C2825] mt-1 font-display tracking-tight">
                  {activeCategory}
                </h3>
                
                <p className="text-sm text-[#7A6E65] mt-3 leading-relaxed">
                  {categoryDetails[activeCategory]?.desc}
                </p>

                {/* Progress bars inside the Neumorphic Details Card */}
                <div className="mt-8 space-y-4">
                  {metrics.map((metric) => {
                    const value = currentSkillData[metric.key];
                    return (
                      <div key={metric.key} className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#A89E94] font-medium">{metric.label}</span>
                          <span className="text-[#2C2825] font-semibold font-mono">{value}%</span>
                        </div>
                        <div className="h-2.5 w-full rounded-full bg-[#FAF7F2] p-[2px] shadow-[inset_1px_1px_3px_rgba(220,212,198,0.75),_inset_-1px_-1px_3px_rgba(255,255,255,0.9)]">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${value}%` }}
                            transition={{ type: 'spring', stiffness: 90, damping: 18 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: metric.color }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Core stack pills */}
              <div className="mt-8 pt-6 border-t border-[#E0D9CF]/40">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#A89E94] block mb-3 font-semibold">
                  Stack Spotlight
                </span>
                <div className="flex flex-wrap gap-2">
                  {categoryDetails[activeCategory]?.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg bg-white px-2.5 py-1.5 text-xs text-[#7A6E65] border border-[#E0D9CF]/50 shadow-sm font-medium hover:border-[#C17D4A]/30 transition duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsRadar;
