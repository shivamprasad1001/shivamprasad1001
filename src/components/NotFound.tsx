import React from 'react';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4">
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
          className="text-9xl font-bold text-gray-800 dark:text-white mb-4"
        >
          404
        </motion.h1>
        <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block px-8 py-3 text-white bg-gray-900 dark:bg-gray-700 
                     rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 
                     transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Back to Home
        </a>
      </motion.div>
    </div>
  );
};

export default NotFound;
