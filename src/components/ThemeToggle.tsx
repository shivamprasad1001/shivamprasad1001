import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { SunIcon, MoonIcon } from './Icons';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-6 rounded-full p-1 bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
      aria-label="Toggle dark mode"
    >
      <div className="absolute inset-0 flex items-center justify-between px-1.5">
          <SunIcon className="w-4 h-4 text-yellow-500" />
          <MoonIcon className="w-4 h-4 text-slate-400" />
      </div>
      <div
        className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
          theme === 'dark' ? 'translate-x-[24px]' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
