"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Sparkles, Code, Brain, Palette, Zap } from 'lucide-react';

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="group flex justify-between py-3 border-b border-gray-200 dark:border-gray-700/50 hover:border-blue-400 dark:hover:border-blue-500 transition-colors duration-300"
  >
    <span className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{label}:</span>
    <span className="font-medium text-gray-900 dark:text-white">{value}</span>
  </motion.div>
);

const SkillSection: React.FC<{ title: string; skills: string[]; icon: React.ReactNode }> = ({ title, skills, icon }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-4"
    >
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(!open)}
        className="group flex justify-between items-center w-full text-left font-semibold bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 p-4 rounded-lg hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-300 border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center gap-3">
          <span className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">{icon}</span>
          <span className="text-gray-800 dark:text-gray-200 text-sm uppercase tracking-wide">{title}</span>
        </div>
        <motion.span 
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-600 dark:text-gray-400"
        >
          ▶
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 px-4">
              {skills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm py-2 px-3 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:translate-x-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 group-hover:scale-150 transition-transform"></span>
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Biography: React.FC = () => {
  return (
    <section className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 dark:from-gray-900 dark:via-blue-950/30 dark:to-indigo-950/40 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 -left-20 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 -right-20 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/5 dark:bg-purple-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 w-16 h-1 mx-auto rounded-full" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Biography
          </h2>
        </motion.div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 p-8 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Personal Info</h3>
                </div>
                <div className="space-y-1">
                  <InfoItem label="Name" value="Shivam Prasad" />
                  <InfoItem label="Age" value="20 Years" />
                  <InfoItem label="Location" value="Lucknow, India" />
                  <InfoItem label="Freelance" value="Available" />
                  <InfoItem label="Email" value="shivam@example.com" />
                </div>
              </div>
            </motion.div>

            {/* Skills Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 p-8 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Technical Skills</h3>
                </div>
                <div className="space-y-4">
                  <SkillSection 
                    title="AI & Machine Learning" 
                    icon={<Brain className="w-5 h-5" />}
                    skills={[
                      "TensorFlow & PyTorch",
                      "NLP (NLTK, spaCy)",
                      "Computer Vision (OpenCV)",
                      "Deep Learning",
                      "Model Deployment",
                      "MLOps & Automation"
                    ]} 
                  />
                  <SkillSection 
                    title="Web Development" 
                    icon={<Code className="w-5 h-5" />}
                    skills={[
                      "React & Next.js",
                      "TypeScript",
                      "Tailwind CSS",
                      "FastAPI & Flask",
                      "PostgreSQL & MongoDB",
                      "REST APIs & GraphQL"
                    ]} 
                  />
                  <SkillSection 
                    title="Design & Tools" 
                    icon={<Palette className="w-5 h-5" />}
                    skills={[
                      "Figma",
                      "Adobe XD",
                      "Git & GitHub",
                      "Docker",
                      "AWS & Vercel",
                      "CI/CD Pipelines"
                    ]} 
                  />
                </div>
              </div>
            </motion.div>

            {/* CV Download Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-[2px] shadow-xl"
              >
                <div className="relative flex items-center justify-center gap-3 bg-white dark:bg-gray-900 rounded-2xl px-8 py-6 transition-all duration-300 group-hover:bg-transparent">
                  <Download className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                  <span className="font-semibold text-gray-900 dark:text-white group-hover:text-white transition-colors">
                    DOWNLOAD CV
                  </span>
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  animate={{
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.button>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative h-full backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 p-10 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3 mb-8">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg"
                  >
                    <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">About Me</h3>
                </div>

                <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg"
                  >
                    Hello! I'm <span className="font-semibold text-blue-600 dark:text-blue-400">Shivam Prasad</span>, an{" "}
                    <span className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                      AI & Web Developer
                    </span>{" "}
                    passionate about building intelligent systems and modern applications. I specialize in{" "}
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">AI/ML, NLP, and Computer Vision</span>, 
                    while also crafting scalable, responsive web solutions using{" "}
                    <span className="font-semibold text-purple-600 dark:text-purple-400">React, Next.js, and FastAPI</span>.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-lg"
                  >
                    I enjoy solving real-world problems with AI, automating workflows, and creating impactful digital products. 
                    Beyond coding, I love exploring new technologies, contributing to open-source, and collaborating with peers 
                    to bring innovative ideas to life.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6"
                  >
                    {[
                      { label: "Projects", value: "50+" },
                      { label: "Experience", value: "3+ Years" },
                      { label: "Technologies", value: "20+" },
                    ].map((stat, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 text-center"
                      >
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
          className="fixed bottom-8 right-8 z-20"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />
            <div className="relative flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg">
              <Sparkles className="w-4 h-4" />
              <span className="font-semibold text-sm">Always Learning</span>
            </div>
          </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default Biography;