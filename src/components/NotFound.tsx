import React from 'react';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.h1
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-[12rem] font-bold font-display text-[#C17D4A]/20 mb-4 leading-none"
        >
          404
        </motion.h1>
        <h2 className="text-4xl font-bold font-display text-[#2C2825] mb-4">
          Lost in thought?
        </h2>
        <p className="text-[#7A6E65] mb-10 max-w-md mx-auto text-lg">
          The page you&apos;re looking for has moved or vanished into the digital ether.
        </p>
        <a
          href="/"
          className="inline-block px-10 py-4 text-white bg-[#C17D4A] 
                     rounded-full hover:bg-[#8B5E3C] 
                     transition-all duration-300 shadow-[0_20px_40px_rgba(193,125,74,0.2)] hover:shadow-xl transform hover:-translate-y-1 font-medium"
        >
          Return to portfolio
        </a>
      </motion.div>
    </div>
  );
};

export default NotFound;
