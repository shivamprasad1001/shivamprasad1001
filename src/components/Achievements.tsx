import React, { useState } from "react";
import type { Skill, Achievement } from "../../types";
import {
  ReactIcon,
  NextjsIcon,
  TypeScriptIcon,
  JavaScriptIcon,
  TailwindCssIcon,
} from "./Icons";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown,Brain,
  Cpu,
  Code2,
  GitBranch,
  Database,
  Cloud,
  Eye,
  MessageSquare,
  Network,
 } from "lucide-react";

// Skill Card with dropdown animation
const SkillRating: React.FC<{ skill: Skill }> = ({ skill }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 cursor-pointer hover:shadow-md transition"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <skill.icon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">
              {skill.name}
            </p>
            <div className="flex items-center mt-1.5 space-x-1">
              {[...Array(10)].map((_, i) => (
                <span
                  key={i}
                  className={`block w-3 h-1 rounded-full ${
                    i * 10 < skill.level
                      ? "bg-indigo-600 dark:bg-indigo-400"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                ></span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
            {skill.level}%
          </span>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && skill.description && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 text-sm text-gray-600 dark:text-gray-300"
          >
            {skill.description}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Achievement Component
const AchievementEntry: React.FC<{
  achievement: Achievement;
  type: "Education" | "Certification";
}> = ({ achievement, type }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
  >
    <p className="text-xs text-gray-500 dark:text-gray-400">
      {achievement.period}
    </p>
    <h4 className="font-bold text-md text-gray-800 dark:text-white mt-1">
      {achievement.title}
    </h4>
    <p className="text-xs font-semibold tracking-wider text-gray-400 dark:text-gray-500 mt-1">
      {achievement.institution}
    </p>
    {type === "Certification" && achievement.description && (
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
        {achievement.description}
      </p>
    )}
  </motion.div>
);

// 🔹 AI/ML Developer Skillset
const skills: Skill[] = [
  {
    name: "Python",
    level: 95,
    icon: Code2,
    description: "ML/DL pipelines, automation, data processing, AI agents.",
  },
  {
    name: "PyTorch & TensorFlow",
    level: 90,
    icon: Brain,
    description: "Training and deploying neural networks for CV/NLP tasks.",
  },
  {
    name: "NLP",
    level: 85,
    icon: MessageSquare,
    description:
      "Intent classification, RAG, transformers, embeddings, conversational AI.",
  },
  {
    name: "Computer Vision",
    level: 80,
    icon: Eye,
    description:
      "Face detection, object detection, image classification, deepfake research.",
  },
  {
    name: "RAG & AI Agents",
    level: 85,
    icon: Network,
    description:
      "LLM-powered apps using LangChain, Hugging Face, vector DBs, agents.",
  },
  {
    name: "MLOps & Deployment",
    level: 75,
    icon: Cloud,
    description:
      "Git, Docker, FastAPI, Flask, Hugging Face Spaces, CI/CD workflows.",
  },
  {
    name: "Version Control & CI/CD",
    level: 90,
    icon: GitBranch,
    description:
      "Proficient in Git/GitHub workflows, automated testing, and continuous delivery.",
  },
  {
    name: "Full-Stack AI Apps",
    level: 70,
    icon: Cpu,
    description:
      "Building React/Next.js frontends integrated with ML backends.",
  },
];

const education: Achievement[] = [
  {
    period: "2022-2026",
    title: "B.Tech in Computer Science & Engineering",
    institution: "Dr. A.P.J. Abdul Kalam Technical University",
  },
];

const certifications: Achievement[] = [
  {
    period: "2025",
    title: "Artificial Intelligence A-Z",
    institution: "Udemy",
    description:
      "Hands-on with Agentic AI, GenAI, NLP, Reinforcement Learning.",
  },
  {
    period: "2024",
    title: "Deep Learning Specialization",
    institution: "Coursera (Andrew Ng)",
    description: "Neural networks, CNNs, RNNs, sequence models.",
  },
];

const Achievements: React.FC = () => {
  return (
    <section
      id="toolkit"
      className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden"
    >
      {/* AI background blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-200 rounded-full opacity-30 dark:opacity-20 filter blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-200 rounded-full opacity-30 dark:opacity-20 filter blur-3xl"></div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white">
            AI/ML Toolkit
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
            Specialized in <span className="font-semibold">AI, ML, and NLP</span>{" "}
            with strong foundations in deep learning, RAG, and AI agents.
            Skilled at deploying ML into real-world applications with scalable
            systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column: Skills */}
          <div className="space-y-6">
            {skills.map((skill) => (
              <SkillRating key={skill.name} skill={skill} />
            ))}
          </div>

          {/* Right Column: Education & Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div>
              <h3 className="font-serif text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Education
              </h3>
              <div className="space-y-6">
                {education.map((edu, i) => (
                  <AchievementEntry
                    key={i}
                    achievement={edu}
                    type="Education"
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Certifications
              </h3>
              <div className="space-y-6">
                {certifications.map((cert, i) => (
                  <AchievementEntry
                    key={i}
                    achievement={cert}
                    type="Certification"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
