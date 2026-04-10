import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const CIRCUMFERENCE = 2 * Math.PI * 20;

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = total > 0 ? window.scrollY / total : 0;
      setProgress(nextProgress);
      setVisible(window.scrollY > 400);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const dashOffset = useMemo(
    () => CIRCUMFERENCE - CIRCUMFERENCE * progress,
    [progress]
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-900 shadow-[0_20px_60px_rgba(15,23,42,0.15)] backdrop-blur"
          aria-label="Back to top"
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="3"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="url(#backToTopGradient)"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              strokeWidth="3"
            />
            <defs>
              <linearGradient id="backToTopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <ArrowUp className="relative z-10 h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
