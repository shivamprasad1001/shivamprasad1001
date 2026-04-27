import React, { useEffect, useState } from 'react';
import shivamp1 from '../assets/nasaImages/shivamp1.webp';
import shivamp2 from '../assets/nasaImages/shivamp2.webp';
import shivamp3 from '../assets/nasaImages/shivamp3.webp';
import shivamp4 from '../assets/nasaImages/shivamp4.webp';
import shivamp5 from '../assets/nasaImages/shivamp5.webp';
import shivamp6 from '../assets/nasaImages/shivamp6.webp';

const NASA_IMAGES = [shivamp1, shivamp2, shivamp3, shivamp4, shivamp5, shivamp6];

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

      <style>{`
        @keyframes panelDrop {
          from { transform: translateY(-150px) scale(0.9); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes scanSweep {
          0% { top: -5%; }
          50% { top: 105%; }
          100% { top: -5%; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.15); opacity: 1; }
        }
      `}</style>

      <div className="z-10 text-center w-full max-w-7xl mx-auto px-4">
        {/* NASA Satellite Array - Responsive & Aesthetic */}
        <div className="flex justify-center items-center gap-2 sm:gap-4 lg:gap-6 mb-12">
          {NASA_IMAGES.map((img, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-[13vw] max-w-[140px] aspect-[3/4.5] sm:w-28 sm:h-44 lg:w-36 lg:h-56 
                         bg-[#2C2825] border border-[#C17D4A]/20 overflow-hidden rounded-sm shadow-2xl"
              style={{
                animation: 'panelDrop 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                animationDelay: `${i * 0.15}s`,
                opacity: 0
              }}
            >
              {/* Technical HUD Detail */}
              <div className="absolute top-1 left-1.5 sm:top-2 sm:left-2.5 z-20 flex flex-col items-start gap-0.5">
                <span className="text-[6px] sm:text-[9px] font-mono text-[#C17D4A] leading-none opacity-80">S_ID: 0{i + 1}</span>
                <div className="w-3 h-[1px] bg-[#C17D4A]/40" />
              </div>

              <div className="absolute bottom-1 right-1.5 sm:bottom-2 sm:right-2.5 z-20">
                <span className="text-[6px] sm:text-[9px] font-mono text-[#C17D4A] leading-none opacity-80">{(34.2 + (i * 1.5)).toFixed(1)}°N</span>
              </div>

              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#C17D4A]/40 z-20" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#C17D4A]/40 z-20" />

              <img
                src={img}
                alt=""
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />

              {/* Glowing Scanline */}
              <div
                className="absolute inset-x-0 h-[1.5px] bg-[#C17D4A] z-30 opacity-60 shadow-[0_0_10px_#C17D4A]"
                style={{
                  animation: 'scanSweep 4s ease-in-out infinite',
                  animationDelay: `${(i * 0.15) + 1}s`,
                  top: '-5%'
                }}
              />

              {/* Glass Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#2C2825]/30 pointer-events-none" />
            </div>
          ))}
        </div>

        <h1
          className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold 
                     text-[#2C2825] mb-6 tracking-tight"
        >
          {title}
          <span className="ml-1 text-[#C17D4A] animate-pulse">|</span>
        </h1>

        <p
          className={`text-sm sm:text-base lg:text-lg text-[#7A6E65] 
                      max-w-2xl mx-auto min-h-[2rem] font-mono tracking-[0.12em]
                      transition-all duration-1000 delay-500 uppercase
                      ${showSub ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {subText}
        </p>

        <div className="mt-12 flex items-center justify-center gap-3">
          {[0, 1, 2].map((item) => (
            <span
              key={item}
              className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-[#C17D4A]/40 shadow-[0_0_10px_rgba(193,125,74,0.2)]"
              style={{
                animation: `pulse 1.5s ${item * 0.2}s infinite ease-in-out`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WelcomeIntro;
