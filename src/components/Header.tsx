import React from 'react';
import { GitHubIcon, LinkedInIcon, TwitterIcon, ArrowRightIcon } from './Icons';
import Navbar from './Navbar';
import WelcomeIntro from './WelcomeIntro';

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
    <header id="main-header" className="relative w-full min-h-screen flex flex-col 
                       bg-[#FCFCFC] dark:bg-gray-900 overflow-hidden">

      {/* Decorative blurred circles */}
      <div className="absolute top-16 left-8 w-44 h-44 sm:w-60 sm:h-60 bg-pink-200 rounded-full opacity-40 blur-3xl"></div>
      <div className="absolute bottom-32 right-8 w-60 h-60 sm:w-80 sm:h-80 bg-purple-200 rounded-full opacity-40 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-48 h-48 sm:w-64 sm:h-64 bg-teal-200 rounded-full opacity-30 blur-3xl"></div>

      <Navbar />



      {/* Hero Section */}
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4 relative z-0">
        {/* Avatar */}
        <div className="relative mb-8 sm:mb-10">
          <div className="w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 rounded-full overflow-hidden 
                          shadow-2xl border-[5px] border-white/70 dark:border-gray-700">
            <img
              src="https://avatars.githubusercontent.com/u/161421872?q=80&w=400&h=400&fit=crop"
              alt="Shivam Prasad"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Floating badge */}
        <div className="hidden md:block absolute top-20 right-8 md:right-32">
          <svg viewBox="0 0 220 220" className="w-30 h-30 sm:w-36 sm:h-36">
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
        <div className="flex flex-col items-center mt-5 sm:mt-6">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-bold text-gray-800 dark:text-white leading-tight">
            Shivam Prasad
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2 tracking-widest">
            // AI/ML Developer //
          </p>

          {/* Write me button */}
          <a href="#contact" className="mt-5 sm:mt-8">
            <button
              className="flex items-center justify-center px-5 py-2 rounded-full 
                         border border-gray-300 dark:border-gray-600 
                         text-gray-700 dark:text-gray-300  
                         hover:bg-white dark:hover:bg-gray-800 
                         hover:shadow-lg transition-all duration-300 group"
            >
              <span className="mr-2 text-sm font-medium">Write me</span>
              <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 rotate-[330deg]" />
            </button>
          </a>
        </div>
      </div>

      {/* Social Links */}
      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center space-y-5">
        <div className="h-12 w-px bg-gray-300 dark:bg-gray-600 my-3"></div>
        <div className="flex flex-col space-y-5">
          <SocialLink href="https://github.com/shivamprasad1001"><GitHubIcon className="w-4 h-4" /></SocialLink>
          <SocialLink href="https://www.linkedin.com/in/shivamprasad1001/"><LinkedInIcon className="w-4 h-4" /></SocialLink>
          <SocialLink href="https://twitter.com/Shivampr101"><TwitterIcon className="w-4 h-4" /></SocialLink>
        </div>
        <span className="text-xs tracking-widest text-gray-500 dark:text-gray-400 transform -rotate-90 p-16">
          FOLLOW ME
        </span>
      </div>

      {/* Bottom Social Links for mobile */}
      <div className="lg:hidden flex justify-center space-x-5 mt-6 mb-5">
        <SocialLink href="https://github.com/shivamprasad1001"><GitHubIcon className="w-4 h-4" /></SocialLink>
        <SocialLink href="https://www.linkedin.com/in/shivamprasad1001/"><LinkedInIcon className="w-4 h-4" /></SocialLink>
        <SocialLink href="https://twitter.com/Shivampr101"><TwitterIcon className="w-4 h-4" /></SocialLink>
      </div>
    </header>
  );
};

export default Header;
