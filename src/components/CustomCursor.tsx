import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, [data-cursor="interactive"]';

const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const x = useSpring(cursorX, { stiffness: 500, damping: 40, mass: 0.4 });
  const y = useSpring(cursorY, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer:fine)').matches;
    setEnabled(isFinePointer);

    if (!isFinePointer) {
      return;
    }

    const handleMove = (event: MouseEvent) => {
      cursorX.set(event.clientX - 10);
      cursorY.set(event.clientY - 10);
    };

    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setActive(Boolean(target?.closest(INTERACTIVE_SELECTOR)));
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseover', handleOver);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
    };
  }, [cursorX, cursorY]);

  if (!enabled) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[120] hidden rounded-full border border-cyan-300/50 bg-cyan-300/30 mix-blend-screen md:block"
      style={{ x, y }}
      animate={{
        width: active ? 42 : 20,
        height: active ? 42 : 20,
        marginLeft: active ? -11 : 0,
        marginTop: active ? -11 : 0,
        opacity: active ? 0.75 : 1,
        filter: active ? 'blur(2px)' : 'blur(0px)',
        backgroundColor: active ? 'rgba(139,92,246,0.16)' : 'rgba(6,182,212,0.35)',
      }}
      transition={{ type: 'spring', stiffness: 360, damping: 28 }}
    />
  );
};

export default CustomCursor;
