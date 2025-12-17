import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SkillData {
  category: string;
  skillLevel: number;
  deliveryConfidence: number;
  learningAgility: number;
}

/* =======================
   YOUR SKILL PROFILE DATA
   ======================= */
const skillsData: SkillData[] = [
  {
    category: 'Languages',
    skillLevel: 92,
    deliveryConfidence: 90,
    learningAgility: 95,
  },
  {
    category: 'Front-End',
    skillLevel: 82,
    deliveryConfidence: 80,
    learningAgility: 88,
  },
  {
    category: 'Back-End',
    skillLevel: 90,
    deliveryConfidence: 88,
    learningAgility: 90,
  },
  {
    category: 'Databases',
    skillLevel: 85,
    deliveryConfidence: 80,
    learningAgility: 70
  },
  {
    category: 'Data Analytics',
    skillLevel: 88,
    deliveryConfidence: 85,
    learningAgility: 90,
  },
  {
    category: 'AI & ML',
    skillLevel: 96,
    deliveryConfidence: 93,
    learningAgility: 97,
  },
  {
    category: 'Dev Tools',
    skillLevel: 94,
    deliveryConfidence: 92,
    learningAgility: 95,
  },
];

/* =======================
   METRIC CONFIG
   ======================= */
const metrics = [
  {
    key: 'skillLevel' as const,
    label: 'Skill Level',
    color: '#3b82f6',
  },
  {
    key: 'deliveryConfidence' as const,
    label: 'Delivery Confidence',
    color: '#8b5cf6',
  },
  {
    key: 'learningAgility' as const,
    label: 'Learning Agility',
    color: '#ec4899',
  },
];

const SkillsRadar: React.FC = () => {
  const [hovered, setHovered] = useState<{
    x: number;
    y: number;
    label: string;
    value: number;
  } | null>(null);

  const size = 420;
  const center = size / 2;
  const radius = 150;
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

  const createPath = (key: keyof SkillData) =>
    skillsData
      .map((skill, i) => {
        const { x, y } = getPoint(skill[key] as number, i);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ') + ' Z';

  return (
    <section className="py-20 px-4 bg-[#FDFDFD] dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white mb-3">
            Technical Mastery
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Skill, confidence & learning agility across domains
          </p>
        </motion.div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mb-8 flex-wrap">
          {metrics.map((metric) => (
            <div key={metric.key} className="flex items-center gap-2 text-sm">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: metric.color }}
              />
              <span className="text-gray-600 dark:text-gray-300">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* Radar Chart */}
        <div className="flex justify-center relative">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="w-full max-w-[420px]"
          >
            {/* Grid */}
            {Array.from({ length: levels }).map((_, i) => (
              <circle
                key={i}
                cx={center}
                cy={center}
                r={(radius / levels) * (i + 1)}
                fill="none"
                stroke="currentColor"
                opacity="0.15"
                className="stroke-gray-400 dark:stroke-gray-600"
              />
            ))}

            {/* Axes */}
            {skillsData.map((_, i) => {
              const { x, y } = getPoint(100, i);
              return (
                <line
                  key={i}
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke="currentColor"
                  opacity="0.15"
                  className="stroke-gray-400 dark:stroke-gray-600"
                />
              );
            })}

            {/* Skill Areas */}
            {metrics.map((metric, idx) => (
              <motion.path
                key={metric.key}
                d={createPath(metric.key)}
                fill={metric.color}
                fillOpacity="0.22"
                stroke={metric.color}
                strokeWidth="2.5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: idx * 0.2 }}
              />
            ))}

            {/* Points */}
            {metrics.map((metric) =>
              skillsData.map((skill, i) => {
                const { x, y } = getPoint(skill[metric.key], i);
                return (
                  <circle
                    key={`${metric.key}-${i}`}
                    cx={x}
                    cy={y}
                    r="5"
                    fill={metric.color}
                    stroke="white"
                    strokeWidth="2"
                    className="cursor-pointer"
                    onMouseEnter={() =>
                      setHovered({
                        x,
                        y,
                        label: `${skill.category} · ${metric.label}`,
                        value: skill[metric.key],
                      })
                    }
                    onMouseLeave={() => setHovered(null)}
                  />
                );
              })
            )}

            {/* Labels */}
            {skillsData.map((skill, i) => {
              const { x, y } = getPoint(112, i);
              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-[10px] sm:text-xs font-semibold fill-gray-700 dark:fill-gray-300"
                >
                  {skill.category}
                </text>
              );
            })}
          </svg>

          {/* Tooltip */}
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute pointer-events-none bg-white dark:bg-gray-800 
                         border border-gray-200 dark:border-gray-700
                         rounded-lg px-3 py-2 shadow-xl text-xs"
              style={{ left: hovered.x, top: hovered.y }}
            >
              <div className="font-semibold text-gray-800 dark:text-white">
                {hovered.label}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {hovered.value}%
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillsRadar;
