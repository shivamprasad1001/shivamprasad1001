import React from 'react';
import { GitHubIcon, LinkedInIcon, TwitterIcon, ArrowRightIcon } from './Icons';
import { motion } from "framer-motion";
import ThemeToggle from './ThemeToggle';

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    className="text-sm font-medium text-gray-600 hover:text-gray-900 
               dark:text-gray-300 dark:hover:text-white 
               transition-colors duration-300"
  >
    {children}
  </a>
);

const SocialLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-500 hover:text-gray-900 
               dark:text-gray-400 dark:hover:text-white 
               transition-colors duration-300"
  >
    {children}
  </a>
);

const Header: React.FC = () => {
  return (
    <header className="relative w-full min-h-screen flex flex-col 
                       bg-[#FCFCFC] dark:bg-gray-900 overflow-hidden">

      {/* Decorative blurred circles */}
      <div className="absolute top-20 left-40 w-72 h-72 bg-pink-200 rounded-full opacity-40 blur-3xl"></div>
      <div className="absolute bottom-40 right-32 w-96 h-96 bg-purple-200 rounded-full opacity-40 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-teal-200 rounded-full opacity-30 blur-3xl"></div>

      {/* Top Navbar */}
      <nav className="z-10 py-6 flex justify-between items-center max-w-7xl mx-auto w-full px-8">
        <a
          href="#"
          className="text-2xl font-serif font-bold text-gray-800 dark:text-white"
        >
          Shivam<span className="text-pink-500">.</span>
        </a>
        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="#about">About Me</NavLink>
          <NavLink href="#toolkit">Toolkit</NavLink>
          <NavLink href="#portfolio">Portfolio</NavLink>
          <NavLink href="#experience">Experience</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <a
            href="#"
            className="hidden sm:inline-block px-6 py-2.5 text-sm font-semibold text-white 
                       bg-gray-900 dark:bg-gray-800 rounded-full 
                       hover:bg-gray-700 dark:hover:bg-gray-600 
                       transition-all duration-300 shadow-md"
          >
            Download CV
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
        {/* Avatar */}
        <div className="relative mb-12">
          <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden 
                          shadow-2xl border-[6px] border-white/70 dark:border-gray-700">
            <img
              src="https://avatars.githubusercontent.com/u/161421872?q=80&w=400&h=400&fit=crop"
              alt="Shivam Prasad"
              className="w-full h-full object-cover"
            />
          </div>


        </div>
        {/* Floating badge (like “Let’s build together”) */}
        <div className="absolute top-20 right-80">
          <svg viewBox="0 0 220 220" className="w-44 h-44">
            {/* Define the circular path */}
            <defs>
              <path
                id="circleTextPath"
                d="M 110, 110
           m -85, 0
           a 85,85 0 1,1 170,0
           a 85,85 0 1,1 -170,0"
              />
            </defs>

            {/* Text moving around the path */}
            <text
              fill="currentColor"
              className="text-gray-600 dark:text-gray-300 text-sm tracking-widest"
            >
              <textPath
                href="#circleTextPath"
                startOffset="0%"
                textAnchor="middle"
              >
                <animate
                  attributeName="startOffset"
                  from="0%"
                  to="100%"
                  dur="15s"
                  repeatCount="indefinite"
                />
                Let’s work together!
              </textPath>
            </text>

            {/* Visible circle */}
            <circle
              cx="110"
              cy="110"
              r="53"
              fill="none"
              stroke="rgba(147,197,253,0.4)"
              strokeWidth="30"
            />
          </svg>
        </div>





        {/* Name & Role */}
        <div className="flex items-center space-x-6 mt-8">
  {/* Name + Title */}
  <div>
    <h1 className="font-serif text-6xl lg:text-8xl font-bold text-gray-800 dark:text-white leading-none">
      Shivam Prasad
    </h1>
    <p className="text-lg text-gray-500 dark:text-gray-400 mt-2 tracking-widest">
      // AI/ML Developer //
    </p>
  </div>

  {/* Write me button */}
  <a href="#contact">
  <button
    className="absolute bottom-20 right-25  flex items-center justify-center w-28 h-20 rounded-full 
               border border-gray-300 dark:border-gray-600 
               text-gray-700 dark:text-gray-300  
               hover:bg-white dark:hover:bg-gray-800 
               hover:shadow-lg transition-all duration-300 group"
  >
    <span className="mr-2 text-sm font-medium">Write me</span>
    <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1 rotate-[330deg]" />
  </button>
  </a>
</div>

      </div>

      {/* Left Side Social Links */}
      <div className="absolute left-56 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-6">
        <div className="h-16 w-px bg-gray-300 dark:bg-gray-600 my-4"></div>
        <div className="flex flex-col space-y-6">
          <SocialLink href="https://github.com/shivamprasad1001"><GitHubIcon className="w-5 h-5" /></SocialLink>
          <SocialLink href="https://www.linkedin.com/in/shivamprasad1001/"><LinkedInIcon className="w-5 h-5" /></SocialLink>
          <SocialLink href="https://twitter.com/Shivampr101"><TwitterIcon className="w-5 h-5" /></SocialLink>
        </div>
        <span className="text-xs tracking-widest text-gray-500 dark:text-gray-400 transform -rotate-90 p-20">
          FOLLOW ME
        </span>
      </div>
    </header>
  );
};

export default Header;
