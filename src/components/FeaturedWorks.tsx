import React from 'react';
import type { WorkProject } from '../../types';
import { ExternalLinkIcon, GitHubIcon } from './Icons';
import projectsData from '../data/projectsData.json'; // Import JSON

const ProjectCard: React.FC<{ project: WorkProject }> = ({ project }) => (
  <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
    <div className="relative aspect-square overflow-hidden rounded-t-xl">
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>

    <div className="p-4 flex flex-col flex-grow justify-between">
      <div>
        <h3 className="font-bold text-gray-800 dark:text-white">{project.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{project.year}</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{project.description}</p>
      </div>

      <div className="mt-4 flex gap-2">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-3 py-1 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
          >
            <ExternalLinkIcon className="w-4 h-4 mr-1" /> Live
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-sm font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            <GitHubIcon className="w-4 h-4 mr-1" /> GitHub
          </a>
        )}
      </div>
    </div>
  </div>
);

const FeaturedWorks: React.FC = () => {
  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-[#FDFDFD] dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-48 h-48 border-4 border-gray-200 dark:border-gray-700 rounded-full opacity-50 -translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-1/2 right-0 w-32 h-32 border-2 border-gray-200 dark:border-gray-700 rounded-full opacity-50 translate-x-1/4"></div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="text-left">
            <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold tracking-widest">// FIND ALL MY WORKS ON</p>
            <a
              href="https://github.com/shivamprasad1001/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold tracking-wider text-gray-800 dark:text-white underline underline-offset-4 decoration-2 decoration-gray-300 dark:decoration-gray-600 hover:decoration-gray-800 dark:hover:decoration-white transition"
            >
              github.com/shivamprasad1001
            </a>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white mt-4 md:mt-0">Featured Works</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {projectsData.map((p: WorkProject) => <ProjectCard key={p.title} project={p} />)}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorks;
