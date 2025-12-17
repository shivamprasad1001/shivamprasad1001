import React, { useEffect, useState } from 'react';

const TITLE_TEXT = 'Welcome';
const SUB_TEXT =
  'Explore my portfolio and see my journey as an AI/ML Developer.';

const WelcomeIntro: React.FC = () => {
  const [title, setTitle] = useState('');
  const [subText, setSubText] = useState('');
  const [showSub, setShowSub] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const [titleIndex, setTitleIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);

  /* ───────── Scroll Lock ───────── */
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  /* ───────── Title Typing ───────── */
  useEffect(() => {
    if (titleIndex < TITLE_TEXT.length) {
      const timer = setTimeout(() => {
        setTitle((prev) => prev + TITLE_TEXT[titleIndex]);
        setTitleIndex((prev) => prev + 1);
      }, 90);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setShowSub(true), 200);
    }
  }, [titleIndex]);

  /* ───────── Subtitle Typing ───────── */
  useEffect(() => {
    if (showSub && subIndex < SUB_TEXT.length) {
      const timer = setTimeout(() => {
        setSubText((prev) => prev + SUB_TEXT[subIndex]);
        setSubIndex((prev) => prev + 1);
      }, 35);
      return () => clearTimeout(timer);
    }

    if (subIndex === SUB_TEXT.length) {
      setTimeout(() => setShowButton(true), 350);
    }
  }, [showSub, subIndex]);

  /* ───────── Unlock Scroll + Move On ───────── */
  const scrollToHeader = () => {
    document.body.style.overflow = '';
    document.getElementById('main-header')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <section
      className="relative h-screen w-full flex flex-col items-center 
                 justify-center bg-white dark:bg-gray-900 overflow-hidden"
      aria-label="Intro Section"
    >
      {/* Content */}
      <div className="z-10 text-center px-4">

        {/* Welcome */}
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold 
                     text-gray-900 dark:text-white mb-6
                     transition-all duration-700 ease-out
                     animate-[fadeScaleIn_0.8s_ease-out_forwards]"
        >
          {title}
          <span className="text-sky-400 animate-pulse ml-1">|</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-base sm:text-lg text-gray-600 dark:text-gray-400 
                      max-w-xl mx-auto min-h-[2rem]
                      transition-all duration-700 ease-out
                      ${showSub ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {subText}
        </p>

        {/* Button */}
        {showButton && (
          <button
            onClick={scrollToHeader}
            className="mt-10 px-7 py-3 rounded-full 
                       bg-sky-500 text-white font-medium
                       hover:bg-sky-600 hover:shadow-xl
                       transition-all duration-500 ease-out
                       animate-[fadeUp_0.6s_ease-out_forwards]"
          >
            Explore My Work
          </button>
        )}
      </div>

      {/* Animated Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" className="w-full">
          <path
            fill="#38bdf8"
            fillOpacity="0.15"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,0L0,0Z"
          >
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
              M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,0L0,0Z;
              M0,48L48,53.3C96,59,192,69,288,64C384,59,480,37,576,32C672,27,768,37,864,48C960,59,1056,69,1152,64C1248,59,1344,37,1392,26.7L1440,16L1440,0L0,0Z;
              M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,0L0,0Z
              "
            />
          </path>
        </svg>
      </div>
    </section>
  );
};

export default WelcomeIntro;
