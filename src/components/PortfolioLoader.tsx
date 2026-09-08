import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/** A short, deterministic entry sequence that never blocks access to the site. */
export default function PortfolioLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const startedAt = performance.now();
    const duration = reduced ? 80 : 1250;
    let frame = 0;
    const tick = (now: number) => {
      const value = Math.min((now - startedAt) / duration, 1);
      setProgress(Math.round(value * 100));
      if (value < 1) frame = requestAnimationFrame(tick);
      else window.setTimeout(() => setVisible(false), reduced ? 0 : 260);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  return <AnimatePresence>{visible && <motion.div className="portfolio-loader" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .45, ease: [0.22, 1, 0.36, 1] }}>
    <div className="loader-content"><p className="apple-wordmark">Shivam<span>.</span></p><div className="loader-line"><motion.i animate={{ width: `${progress}%` }} /></div><div className="loader-meta"><span>Loading portfolio</span><span>{progress}%</span></div></div>
  </motion.div>}</AnimatePresence>;
}
