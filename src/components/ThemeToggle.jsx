import React from 'react';
import { motion, useSpring } from 'framer-motion';

import { sound } from '../utils/audio';

const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  const chainY = useSpring(0, { damping: 15, stiffness: 200, mass: 1.5 });
  const handlePull = () => {
    sound.playChime(isDarkMode ? 540 : 440);
    chainY.set(60);
    setTimeout(() => chainY.set(0), 150);
    toggleTheme();
  };

  return (
    <div className="absolute top-0 right-3 sm:right-6 md:right-10 z-50 flex flex-col items-center select-none">
      <div className="w-7 sm:w-8 h-3.5 sm:h-4 bg-gray-200 rounded-b-full shadow-md z-10 border-t-0 border border-gray-300 flex justify-center">
         <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gray-400 rounded-full mt-1.5 sm:mt-2 shadow-inner"></div>
      </div>
      <div className="w-0.5 h-2 sm:h-3 md:h-4 border-l-2 border-dotted border-gray-400/80 -mt-1"></div>
      <motion.div 
        style={{ y: chainY }} 
        className="flex flex-col items-center cursor-pointer active:cursor-grabbing group p-1 -m-1"
        onClick={handlePull}
        whileHover={{ scale: 1.05 }}
        title="Toggle Theme"
        role="button"
        aria-label="Toggle dark/light theme"
      >
        <div className="w-0.5 h-12 sm:h-16 md:h-24 border-l-2 border-dotted border-gray-400 shadow-sm group-hover:border-gray-500 transition-colors"></div>
        <div className="w-1 h-2 bg-gradient-to-b from-gray-300 to-gray-500 rounded-sm"></div>
        <div className="p-1 -m-1 flex items-center justify-center">
          <div className={`w-6 h-6 rounded-full shadow-lg border border-black/10 relative overflow-hidden transition-all duration-500 ${isDarkMode ? 'bg-gradient-to-br from-zinc-700 via-zinc-900 to-black ring-2 ring-amber-500/40 shadow-amber-500/20' : 'bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 ring-2 ring-amber-500/50'}`}>
            <div className="absolute top-1 left-1.5 w-2 h-1.5 bg-white opacity-40 rounded-full blur-[1px]"></div>
            <div className="absolute bottom-1 right-1.5 w-2 h-2 bg-white opacity-10 rounded-full blur-[2px]"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default ThemeToggle;