"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <p className="text-sm">
    <span className="font-semibold text-gray-700 dark:text-gray-200">{label}:</span> {value}
  </p>
);

const SkillItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="relative pl-4 text-sm before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:bg-gray-400 dark:before:bg-gray-500 before:rounded-full">
    {children}
  </li>
);

const SkillSection: React.FC<{ title: string; skills: string[] }> = ({ title, skills }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
      {/* Section Header */}
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-left font-semibold text-gray-800 dark:text-gray-200 text-sm uppercase tracking-wide"
      >
        {title}
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-2 inline-block text-gray-500"
        >
          ▶
        </motion.span>
      </button>

      {/* Dropdown Skills */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="space-y-2 mt-3 overflow-hidden text-gray-600 dark:text-gray-300"
          >
            {skills.map((skill, idx) => (
              <SkillItem key={idx}>{skill}</SkillItem>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const Biography: React.FC = () => {
  return (
    <section
      id="about"
      className="py-20 sm:py-28 bg-[#FDFDFD] dark:bg-gray-900 relative scroll-mt-20"
    >
      {/* Decorative circles */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-10 right-10 w-40 h-40 border-2 border-gray-200 dark:border-gray-700 rounded-full opacity-50"
      ></motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-1/4 left-10 w-24 h-24 border-2 border-gray-200 dark:border-gray-700 rounded-full opacity-50"
      ></motion.div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-4xl sm:text-5xl font-bold text-center text-gray-800 dark:text-white mb-16"
        >
          Biography
        </motion.h2>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left Column */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 lg:pl-12"
          >
            {/* Personal Info */}
            <div>
              <p className="text-xs font-semibold tracking-widest text-gray-400 dark:text-gray-500 mb-3">
                // PERSONAL INFO
              </p>
              <div className="space-y-1.5 text-gray-600 dark:text-gray-300">
                <InfoItem label="Name" value="Shivam Prasad" />
                <InfoItem label="Email" value="shivamprasad1001@gmail.com" />
                <InfoItem label="City" value="New Delhi, India" />
              </div>
            </div>

            {/* Skills */}
            <div>
              <p className="text-xs font-semibold tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                // TECHNICAL SKILLS
              </p>

              <div className="space-y-4">
                <SkillSection
                  title="AI & Machine Learning"
                  skills={[
                    "Python",
                    "TensorFlow / PyTorch",
                    "Computer Vision (OpenCV, YOLO)",
                    "Natural Language Processing",
                    "RAG & LLMs (LangChain, Hugging Face)",
                    "Deep Learning (CNNs, Transformers)",
                    "Data Science & Visualization",
                  ]}
                />
                <SkillSection
                  title="Web Development"
                  skills={[
                    "React.js / Next.js",
                    "TypeScript / JavaScript (ES6+)",
                    "Flask / FastAPI",
                    "HTML5 & CSS3",
                    "Tailwind CSS",
                    "Responsive UI/UX",
                    "REST APIs / GraphQL",
                  ]}
                />
                <SkillSection
                  title="Tools & Platforms"
                  skills={[
                    "Git & GitHub",
                    "Docker",
                    "Linux & Shell Scripting",
                    "Google Cloud / AWS (Basics)",
                    "Notion / Google Sheets Automation",
                    "Algorithms & Problem Solving",
                  ]}
                />
                <SkillSection
                  title="Cybersecurity & Other"
                  skills={[
                    "Cybersecurity Fundamentals",
                    "SSH & Netcat",
                    "Networking Basics",
                    "CI/CD (Basics)",
                    "Project Management & Collaboration",
                  ]}
                />
              </div>
            </div>

            {/* CV Download */}
            <div>
              <a
                href="./resume.pdf" download="shivam's-resume.pdf"
                className="text-sm font-bold tracking-wider text-gray-800 dark:text-white underline underline-offset-4 decoration-2 decoration-gray-300 dark:decoration-gray-600 hover:decoration-gray-800 dark:hover:decoration-white transition"
              >
                DOWNLOAD CV
              </a>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              <b>Hello!</b> I'm Shivam Prasad, an{" "}
              <span className="font-semibold">AI & Web Developer</span> passionate about
              building intelligent systems and modern applications. I specialize in{" "}
              <span className="font-semibold">AI/ML, NLP, and Computer Vision</span>, while also
              crafting scalable, responsive web solutions using{" "}
              <span className="font-semibold">React, Next.js, and FastAPI</span>.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I enjoy solving real-world problems with AI, automating workflows, and creating
              impactful digital products. Beyond coding, I love exploring new technologies,
              contributing to open-source, and collaborating with peers to bring innovative
              ideas to life.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4 hidden">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src="https://picsum.photos/seed/dev1/300/400"
                  alt="Developer coding"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Biography;
