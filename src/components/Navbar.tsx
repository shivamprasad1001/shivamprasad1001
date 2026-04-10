import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Download, Menu, X } from 'lucide-react';

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Radar' },
  { href: '#toolkit', label: 'Toolkit' },
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#about');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(`#${visible.target.id}`);
        }
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: '-15% 0px -35% 0px' }
    );

    navItems.forEach((item) => {
      const element = document.querySelector(item.href);
      if (element) {
        observer.observe(element);
      }
    });

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? window.scrollY / total : 0);
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const progressWidth = useMemo(
    () => `${Math.min(scrollProgress * 100, 100)}%`,
    [scrollProgress]
  );

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[110] h-[2px] bg-slate-200">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-violet-500 to-rose-400 transition-[width] duration-150"
          style={{ width: progressWidth }}
        />
      </div>

      <nav className="fixed inset-x-0 top-0 z-[100]">
        <div className="section-shell pt-5">
          <div
            className={`flex items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 sm:px-6 ${
              isScrolled
                ? 'glass-panel border-slate-200 shadow-[0_20px_60px_rgba(15,23,42,0.08)]'
                : 'border-slate-200/80 bg-white/70'
            }`}
          >
            <a href="#main-header" className="group flex items-center gap-2">
              <span className="font-display text-xl font-bold tracking-tight text-slate-900">
                Shivam
              </span>
              <span className="h-5 w-[2px] animate-pulse bg-cyan-400" />
            </a>

            <div className="hidden items-center gap-5 lg:flex">
              {navItems.map((item) => {
                const active = activeSection === item.href;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`relative py-2 text-sm transition-colors ${
                      active ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-300 ${
                        active ? 'w-full opacity-100' : 'w-0 opacity-0'
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/papers"
                className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 sm:inline-flex"
              >
                Read Papers
              </a>

              <a
                href="./resume.pdf"
                download="shivam-resume.pdf"
                className="group hidden rounded-full p-[1px] sm:inline-block"
              >
                <span className="relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-rose-400 p-[1px]">
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                  <span className="relative flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-900">
                    <Download className="h-4 w-4" />
                    Download CV
                  </span>
                </span>
              </a>

              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 lg:hidden"
                aria-label="Toggle navigation"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[95] bg-black/60 backdrop-blur-sm lg:hidden"
              aria-label="Close navigation overlay"
            />
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              className="glass-panel fixed right-4 top-20 z-[100] w-[min(22rem,calc(100vw-2rem))] rounded-[2rem] border-slate-200 p-6 lg:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="section-kicker">Navigation</p>
                  <p className="mt-2 text-sm text-slate-400">Jump anywhere in the portfolio.</p>
                </div>
              </div>

              <div className="space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm ${
                      activeSection === item.href
                        ? 'border-cyan-300/50 bg-cyan-50 text-slate-900'
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    {item.label}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ))}
              </div>

              <a
                href="/papers"
                onClick={() => setMenuOpen(false)}
                className="mt-6 flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
              >
                Read Papers
              </a>

              <a
                href="./resume.pdf"
                download="shivam-resume.pdf"
                className="mt-3 flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
              >
                <Download className="h-4 w-4" />
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
