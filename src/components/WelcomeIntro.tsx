import React, { useEffect, useState } from 'react';

const TITLE_TEXT = 'Welcome.';
const SUB_TEXT = 'Loading Shivam Prasad portfolio';

interface WelcomeIntroProps {
  onComplete: () => void;
}

const WelcomeIntro: React.FC<WelcomeIntroProps> = ({ onComplete }) => {
  const [title, setTitle] = useState('');
  const [subText, setSubText] = useState('');
  const [showSub, setShowSub] = useState(false);
  const [closing, setClosing] = useState(false);

  const [titleIndex, setTitleIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);

  useEffect(() => {
    if (titleIndex < TITLE_TEXT.length) {
      const timer = setTimeout(() => {
        setTitle((prev) => prev + TITLE_TEXT[titleIndex]);
        setTitleIndex((prev) => prev + 1);
      }, 85);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => setShowSub(true), 180);
    return () => clearTimeout(timer);
  }, [titleIndex]);

  useEffect(() => {
    if (showSub && subIndex < SUB_TEXT.length) {
      const timer = setTimeout(() => {
        setSubText((prev) => prev + SUB_TEXT[subIndex]);
        setSubIndex((prev) => prev + 1);
      }, 26);
      return () => clearTimeout(timer);
    }

    if (subIndex === SUB_TEXT.length) {
      const fadeTimer = setTimeout(() => setClosing(true), 700);
      const completeTimer = setTimeout(() => onComplete(), 1250);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [onComplete, showSub, subIndex]);

  return (
    <section
      className="relative h-screen w-full flex flex-col items-center 
                 justify-center bg-white overflow-hidden fixed inset-0 z-[140] transition-opacity duration-500"
      style={{ opacity: closing ? 0 : 1 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(193,125,74,0.08),transparent_24%),radial-gradient(circle_at_78%_12%,rgba(44,40,37,0.04),transparent_18%),linear-gradient(180deg,#FAF7F2_0%,#F5EFE6_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(44,40,37,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(44,40,37,0.03)_1px,transparent_1px)] bg-[size:56px_56px]" />

      <div className="z-10 text-center px-4">
        <h1
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold 
                     text-[#2C2825] mb-5 tracking-tight"
        >
          {title}
          <span className="ml-1 text-[#C17D4A] animate-pulse">|</span>
        </h1>

        <p
          className={`text-base sm:text-lg text-[#7A6E65] 
                      max-w-xl mx-auto min-h-[2rem] font-mono tracking-[0.08em]
                      transition-all duration-1000 delay-500
                      ${showSub ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {subText}
        </p>

        <div className="mt-8 flex items-center justify-center gap-2">
          {[0, 1, 2].map((item) => (
            <span
              key={item}
              className="h-2.5 w-2.5 rounded-full bg-[#E0D9CF]"
              style={{
                animation: `pulse 1.2s ${item * 0.18}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WelcomeIntro;
