import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

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
  { key: 'skillLevel' as const, label: 'Skill Level', color: '#06b6d4' },
  { key: 'deliveryConfidence' as const, label: 'Delivery Confidence', color: '#8b5cf6' },
  { key: 'learningAgility' as const, label: 'Learning Agility', color: '#f43f5e' },
];

const SkillsRadar: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<(typeof metrics)[number]['key'] | null>(null);
  const [hovered, setHovered] = useState<{ x: number; y: number; label: string; value: number } | null>(null);

  const size = 540;
  const center = size / 2;
  const radius = 190;
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

  return (
    <section id="skills" className="py-20 sm:py-28">
      <div className="section-shell">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">Skill radar</p>
            <h2 className="section-title mt-4">A quick read on where I deliver strongest.</h2>
            <p className="section-copy mt-4">
              Click a legend pill to isolate a single signal. The chart compares depth, delivery confidence, and how fast I can climb into adjacent domains.
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
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    active
                      ? 'border-slate-300 bg-white text-slate-950'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-cyan-400/40'
                  }`}
                >
                  <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full align-middle" style={{ backgroundColor: metric.color }} />
                  {metric.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="glass-panel relative overflow-hidden rounded-[2rem] p-5 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />
          <div className="relative flex justify-center">
            <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[720px]">
              {Array.from({ length: levels }).map((_, index) => (
                <circle
                  key={index}
                  cx={center}
                  cy={center}
                  r={(radius / levels) * (index + 1)}
                  fill="none"
                  stroke="rgba(15,23,42,0.08)"
                />
              ))}

              {skillsData.map((_, index) => {
                const { x, y } = getPoint(100, index);
                return (
                  <line
                    key={index}
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke="rgba(15,23,42,0.08)"
                  />
                );
              })}

              {visibleMetrics.map((metric, metricIndex) => (
                <motion.path
                  key={metric.key}
                  d={createPath(metric.key)}
                  fill={metric.color}
                  fillOpacity={0.12}
                  stroke={metric.color}
                  strokeWidth="2.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1.1, delay: metricIndex * 0.18 }}
                />
              ))}

              {visibleMetrics.map((metric) =>
                skillsData.map((skill, index) => {
                  const { x, y } = getPoint(skill[metric.key], index);

                  return (
                    <circle
                      key={`${metric.key}-${skill.category}`}
                      cx={x}
                      cy={y}
                      r="6"
                      fill={metric.color}
                      stroke="#ffffff"
                      strokeWidth="3"
                      className="cursor-pointer"
                      onMouseEnter={() => setHovered({ x, y, label: `${skill.category} · ${metric.label}`, value: skill[metric.key] })}
                      onMouseLeave={() => setHovered(null)}
                    />
                  );
                })
              )}

              {skillsData.map((skill, index) => {
                const { x, y } = getPoint(116, index);
                return (
                  <text
                    key={skill.category}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-slate-700 text-[12px] font-medium"
                  >
                    {skill.category}
                  </text>
                );
              })}
            </svg>

            {hovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="pointer-events-none absolute rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-2xl"
                style={{ left: hovered.x - 20, top: hovered.y - 14 }}
              >
                <p className="text-slate-900">{hovered.label}</p>
                <p className="mt-1 text-slate-600">{hovered.value}%</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsRadar;
