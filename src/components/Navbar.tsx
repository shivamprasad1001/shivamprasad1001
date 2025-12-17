import React, { useState, useEffect } from 'react';
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

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const headerElement = document.getElementById('main-header');
      if (headerElement) {
        const headerTop = headerElement.offsetTop;
        setIsSticky(window.scrollY >= headerTop);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <nav className={`z-50 py-5 flex justify-between items-center max-w-6xl mx-auto w-full px-8 sm:px-12 transition-all duration-300 ${
        isSticky ? 'fixed top-0 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg rounded-b-2xl' : ''
      }`}>
        <a
          href="#"
          className="text-2xl font-serif font-bold text-gray-800 dark:text-white"
        >
          Shivam<span className="text-pink-500">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
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
            className="md:hidden rounded-lg mx-4 mt-2 p-4 space-y-3 z-10"
          >
            <NavLink href="#about">About Me</NavLink>
            <NavLink href="#toolkit">Toolkit</NavLink>
            <NavLink href="#portfolio">Portfolio</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;