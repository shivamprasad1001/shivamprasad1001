import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SkillData {
  category: string;
  skillLevel: number;
  deliveryConfidence: number;
  learningAgility: number;
}

const skillsData: SkillData[] = [
  { category: 'Languages', skillLevel: 95, deliveryConfidence: 90, learningAgility: 95 },
  { category: 'Front-End', skillLevel: 85, deliveryConfidence: 88, learningAgility: 90 },
  { category: 'Back-End', skillLevel: 92, deliveryConfidence: 90, learningAgility: 88 },
  { category: 'Databases', skillLevel: 88, deliveryConfidence: 85, learningAgility: 85 },
  { category: 'Data Analytics', skillLevel: 90, deliveryConfidence: 92, learningAgility: 93 },
  { category: 'AI & ML', skillLevel: 98, deliveryConfidence: 95, learningAgility: 98 },
  { category: 'Mobile Dev', skillLevel: 75, deliveryConfidence: 70, learningAgility: 85 },
  { category: 'Dev Tools', skillLevel: 93, deliveryConfidence: 90, learningAgility: 92 },
];

const SkillsRadar: React.FC = () => {
  const [hoveredPoint, setHoveredPoint] = useState<{ category: string; metric: string; value: number } | null>(null);
  
  const size = 500;
  const center = size / 2;
  const radius = 180;
  const levels = 5;
  const angleStep = (2 * Math.PI) / skillsData.length;

  const getPoint = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const createPath = (dataKey: 'skillLevel' | 'deliveryConfidence' | 'learningAgility') => {
    return skillsData.map((skill, i) => {
      const point = getPoint(skill[dataKey], i);
      return `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
    }).join(' ') + ' Z';
  };

  const metrics = [
    { key: 'skillLevel' as const, label: 'Skill Level', color: '#06b6d4', glow: 'rgba(6, 182, 212, 0.3)' },
    { key: 'deliveryConfidence' as const, label: 'Delivery Confidence', color: '#a855f7', glow: 'rgba(168, 85, 247, 0.3)' },
    { key: 'learningAgility' as const, label: 'Learning Agility', color: '#f97316', glow: 'rgba(249, 115, 22, 0.3)' },
  ];

  return (
    <section id="toolkit" className="py-20 px-8 bg-gradient-to-br from-gray-900 via-teal-900 to-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Technical Mastery</h2>
          <p className="text-gray-300">Comprehensive skill assessment across domains</p>
        </motion.div>

        {/* Legend */}
        <div className="flex justify-center gap-8 mb-8 flex-wrap">
          {metrics.map((metric) => (
            <div key={metric.key} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: metric.color, boxShadow: `0 0 10px ${metric.glow}` }} />
              <span className="text-gray-300 text-sm">{metric.label}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <svg width={size} height={size} className="drop-shadow-2xl">
              <defs>
                {metrics.map((metric) => (
                  <filter key={`glow-${metric.key}`} id={`glow-${metric.key}`}>
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                ))}
              </defs>

              {/* Grid circles */}
              {Array.from({ length: levels }).map((_, i) => (
                <circle
                  key={i}
                  cx={center}
                  cy={center}
                  r={(radius / levels) * (i + 1)}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="1"
                />
              ))}

              {/* Axis lines */}
              {skillsData.map((_, i) => {
                const point = getPoint(100, i);
                return (
                  <line
                    key={i}
                    x1={center}
                    y1={center}
                    x2={point.x}
                    y2={point.y}
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Data areas */}
              {metrics.map((metric, idx) => (
                <motion.path
                  key={metric.key}
                  d={createPath(metric.key)}
                  fill={metric.color}
                  fillOpacity="0.15"
                  stroke={metric.color}
                  strokeWidth="2"
                  filter={`url(#glow-${metric.key})`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: idx * 0.2, ease: 'easeOut' }}
                />
              ))}

              {/* Data points */}
              {metrics.map((metric) =>
                skillsData.map((skill, i) => {
                  const point = getPoint(skill[metric.key], i);
                  return (
                    <motion.circle
                      key={`${metric.key}-${i}`}
                      cx={point.x}
                      cy={point.y}
                      r="5"
                      fill={metric.color}
                      stroke="white"
                      strokeWidth="2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 1.5 + i * 0.05 }}
                      whileHover={{ scale: 1.5 }}
                      onMouseEnter={() => setHoveredPoint({ category: skill.category, metric: metric.label, value: skill[metric.key] })}
                      onMouseLeave={() => setHoveredPoint(null)}
                      className="cursor-pointer"
                      style={{ filter: `drop-shadow(0 0 6px ${metric.glow})` }}
                    />
                  );
                })
              )}

              {/* Labels */}
              {skillsData.map((skill, i) => {
                const point = getPoint(115, i);
                return (
                  <text
                    key={i}
                    x={point.x}
                    y={point.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs font-medium fill-gray-300"
                  >
                    {skill.category}
                  </text>
                );
              })}
            </svg>

            {/* Tooltip */}
            {hoveredPoint && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-xl border border-gray-700"
              >
                <div className="text-sm font-semibold">{hoveredPoint.category}</div>
                <div className="text-xs text-gray-300">{hoveredPoint.metric}: {hoveredPoint.value}%</div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsRadar;
