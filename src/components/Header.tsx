import React, { useState } from 'react';
import { GitHubIcon, LinkedInIcon, TwitterIcon, ArrowRightIcon } from './Icons';
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from './ThemeToggle';

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    className="block md:inline-block text-sm font-medium text-gray-600 hover:text-gray-900 
               dark:text-gray-300 dark:hover:text-white 
               transition-colors duration-300 px-3 py-2 md:px-0"
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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative w-full min-h-screen flex flex-col 
                       bg-[#FCFCFC] dark:bg-gray-900 overflow-hidden">

      {/* Decorative blurred circles */}
      <div className="absolute top-20 left-10 w-52 h-52 sm:w-72 sm:h-72 bg-pink-200 rounded-full opacity-40 blur-3xl"></div>
      <div className="absolute bottom-40 right-10 w-72 h-72 sm:w-96 sm:h-96 bg-purple-200 rounded-full opacity-40 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-60 h-60 sm:w-80 sm:h-80 bg-teal-200 rounded-full opacity-30 blur-3xl"></div>

      {/* Top Navbar */}
      <nav className="z-20 py-6 flex justify-between items-center max-w-7xl mx-auto w-full px-6 sm:px-8">
        <a
          href="#"
          className="text-2xl font-serif font-bold text-gray-800 dark:text-white"
        >
          Shivam<span className="text-pink-500">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="#about">About Me</NavLink>
          <NavLink href="#toolkit">Toolkit</NavLink>
          <NavLink href="#portfolio">Portfolio</NavLink>
          <NavLink href="#experience">Experience</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <a
            href="./resume.pdf" download="shivam-resume.pdf"
            className="hidden sm:inline-block px-5 py-2 text-sm font-semibold text-white 
                       bg-gray-900 dark:bg-gray-800 rounded-full 
                       hover:bg-gray-700 dark:hover:bg-gray-600 
                       transition-all duration-300 shadow-md"
          >
            Download CV
          </a>
          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-md 
                       text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 
                       transition"
          >
            <span className="sr-only">Toggle Menu</span>
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-current"></div>
              <div className="w-6 h-0.5 bg-current"></div>
              <div className="w-6 h-0.5 bg-current"></div>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu with smooth animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="md:hidden rounded-lg mx-4 mt-2 p-4 space-y-3 z-10 "
          >
            <NavLink href="#about">About Me</NavLink>
            <NavLink href="#toolkit">Toolkit</NavLink>
            <NavLink href="#portfolio">Portfolio</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with sliding animation when menu opens */}
      <motion.div
        animate={{ 
          y: menuOpen ? 50 : 0, 
          opacity: menuOpen ? 0.85 : 1,
        
        }}
        transition={{ type: "spring", stiffness: 100, damping: 55 }}
        className="flex-grow flex flex-col items-center justify-center text-center px-4 relative z-0"
      >
        {/* Avatar */}
        <div className="relative mb-10 sm:mb-12">
          <div className="w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden 
                          shadow-2xl border-[6px] border-white/70 dark:border-gray-700">
            <img
              src="https://avatars.githubusercontent.com/u/161421872?q=80&w=400&h=400&fit=crop"
              alt="Shivam Prasad"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Floating badge */}
        <div className="hidden md:block absolute top-24 right-10 md:right-40">
          <svg viewBox="0 0 220 220" className="w-36 h-36 sm:w-44 sm:h-44">
            <defs>
              <path
                id="circleTextPath"
                d="M 110, 110
                   m -85, 0
                   a 85,85 0 1,1 170,0
                   a 85,85 0 1,1 -170,0"
              />
            </defs>
            <text
              fill="currentColor"
              className="text-gray-600 dark:text-gray-300 text-sm tracking-widest"
            >
              <textPath href="#circleTextPath" startOffset="0%" textAnchor="middle">
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
        <div className="flex flex-col items-center mt-6 sm:mt-8">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-8xl font-bold text-gray-800 dark:text-white leading-tight">
            Shivam Prasad
          </h1>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mt-2 tracking-widest">
            // AI/ML Developer //
          </p>

          {/* Write me button */}
          <a href="#contact" className="mt-6 sm:mt-10">
            <button
              className="flex items-center justify-center px-6 py-3 rounded-full 
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
      </motion.div>

      {/* Social Links */}
      <div className="hidden lg:flex absolute left-10 top-1/2 -translate-y-1/2 flex-col items-center space-y-6">
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

      {/* Bottom Social Links for mobile */}
      <div className="lg:hidden flex justify-center space-x-6 mt-8 mb-6">
        <SocialLink href="https://github.com/shivamprasad1001"><GitHubIcon className="w-5 h-5" /></SocialLink>
        <SocialLink href="https://www.linkedin.com/in/shivamprasad1001/"><LinkedInIcon className="w-5 h-5" /></SocialLink>
        <SocialLink href="https://twitter.com/Shivampr101"><TwitterIcon className="w-5 h-5" /></SocialLink>
      </div>
    </header>
  );
};

export default Header;
