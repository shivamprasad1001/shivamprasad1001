import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from './ThemeToggle';

const NavLink: React.FC<{ href: string; children: React.ReactNode; onClick?: () => void }> = ({ href, children, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="block md:inline-block text-sm font-medium text-gray-600 hover:text-gray-900 
               dark:text-gray-300 dark:hover:text-white 
               transition-colors duration-300 px-3 py-2 md:px-0 rounded-lg
               hover:bg-gray-100 dark:hover:bg-gray-800 md:hover:bg-transparent"
  >
    {children}
  </a>
);

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [menuOpen]);
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
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-md 
                       text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 
                       transition z-50 relative"
            aria-label="Toggle Menu"
          >
            <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-current my-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay & Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={closeMenu}
            />
            {/* Menu Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 
                         shadow-2xl z-50 flex flex-col p-6"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold text-gray-800 dark:text-white">Menu</span>
                <button
                  onClick={closeMenu}
                  className="w-8 h-8 flex items-center justify-center rounded-full 
                             hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  aria-label="Close Menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-col space-y-1 flex-1">
                <NavLink href="#about" onClick={closeMenu}>About Me</NavLink>
                <NavLink href="#toolkit" onClick={closeMenu}>Toolkit</NavLink>
                <NavLink href="#portfolio" onClick={closeMenu}>Portfolio</NavLink>
                <NavLink href="#experience" onClick={closeMenu}>Experience</NavLink>
                <NavLink href="#contact" onClick={closeMenu}>Contact</NavLink>
              </nav>
              <a
                href="./resume.pdf" download="shivam-resume.pdf"
                className="w-full px-5 py-3 text-center text-sm font-semibold text-white 
                           bg-gray-900 dark:bg-gray-800 rounded-full 
                           hover:bg-gray-700 dark:hover:bg-gray-600 
                           transition-all duration-300 shadow-md mt-4"
              >
                Download CV
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;