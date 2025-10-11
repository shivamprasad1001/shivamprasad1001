import React, { useState } from "react";

type Experience = {
  company: string;
  period: string;
  location: string;
  title: string;
  description: string;
  fullDescription?: string;
};

const experiences: Experience[] = [
  {
    company: "Truwix Tech Solutions pvt. ltd ",
    period: "Sep 2025 - Present",
    location: "Onsite",
    title: "AI/ML Engineer (Trainee)",
    description:
      "As an AI/ML Engineer at Truwix, I design and deploy intelligent systems that power chatbots, automation tools, and predictive models using machine learning, deep learning, and NLP. My work focuses on building scalable, data-driven solutions that enhance efficiency, user engagement, and real-world decision-making",
    fullDescription:
      "As an AI/ML Engineer at Truwix, I develop and implement end-to-end AI solutions, including chatbots, automation pipelines, and intelligent analytics systems. My role involves leveraging machine learning, deep learning, and natural language processing to create adaptive and human-like AI experiences. I collaborate with cross-functional teams to design scalable architectures, integrate AI models into production systems, and automate complex workflows. I also focus on optimizing model performance, improving user interactions, and deploying AI-driven assistants that enhance productivity and operational efficiency. Through continuous research and experimentation, I aim to bridge innovation with practicality—transforming how businesses interact with technology through intelligent automation.",
  },
];

const WorkExperience: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const activeExperience = experiences[activeIndex];

  return (
    <section
      id="experience"
      className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-center text-gray-800 dark:text-white mb-16">
          Work Experience
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Timeline (left) */}
          <div className="md:col-span-4 relative">
            <div className="absolute top-4 bottom-4 right-10 md:right-12 w-px bg-gray-200 dark:bg-gray-700"></div>
            <div className="space-y-4">
              {experiences.map((exp, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveIndex(idx);
                    setExpanded(false); // reset expand on switch
                  }}
                  className="group relative w-full text-right pr-20 md:pr-24 py-6 flex items-center"
                >
                  <div
                    className={`w-full transition-colors duration-200 ${
                      idx === activeIndex
                        ? "text-gray-900 dark:text-white font-semibold"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <div className="text-sm">{exp.company}</div>
                    <div className="text-xs mt-1">{exp.period}</div>
                    <div className="text-xs">{exp.location}</div>
                  </div>
                  <span
                    className={`absolute right-6 md:right-10 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-all duration-300 ${
                      idx === activeIndex
                        ? "bg-pink-500 ring-4 ring-pink-200 dark:ring-pink-500/30"
                        : "bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-500"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Active description (right) */}
          <div className="md:col-span-8 pt-1">
            {activeExperience && (
              <div className="transition-all duration-400 ease-in-out">
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                  {activeExperience.title}
                </h3>

                {/* Animated expandable text */}
                <div
                  className={`overflow-hidden transition-[max-height] duration-500 ease-in-out`}
                  style={{ maxHeight: expanded ? "500px" : "80px" }} // adjust 500px if text is longer
                >
                  <p className="text-gray-600 dark:text-gray-300 mt-6 leading-relaxed max-w-prose">
                    {expanded && activeExperience.fullDescription
                      ? activeExperience.fullDescription
                      : activeExperience.description}
                  </p>
                </div>

                {activeExperience.fullDescription && (
                  <button
                    onClick={() => setExpanded((prev) => !prev)}
                    className="inline-block mt-6 text-xs font-bold tracking-widest text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors duration-300"
                  >
                    {expanded ? "SHOW LESS" : "LEARN MORE"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
