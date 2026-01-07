import React from 'react';
import { motion, useSpring } from 'framer-motion';

const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  // Spring physics for a realistic heavy feel
  const chainY = useSpring(0, { damping: 15, stiffness: 200, mass: 1.5 });

  const handlePull = () => {
    // Pull down logic
    chainY.set(60);
    setTimeout(() => chainY.set(0), 150);
    toggleTheme();
  };

  return (
    <div className="absolute top-0 right-10 z-50 flex flex-col items-center">
      
      {/* 1. The Ceiling Mount (The base of the switch) */}
      <div className="w-8 h-4 bg-gray-200 rounded-b-full shadow-md z-10 border-t-0 border border-gray-300 flex justify-center">
         <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 shadow-inner"></div>
      </div>

      {/* 2. The Static Top Chain (Connector) */}
      <div className="w-0.5 h-4 border-l-2 border-dotted border-gray-400/80 -mt-1"></div>

      {/* 3. The Moving Chain & Handle */}
      <motion.div 
        style={{ y: chainY }} 
        className="flex flex-col items-center cursor-pointer active:cursor-grabbing group"
        onClick={handlePull}
        whileHover={{ scale: 1.05 }}
      >
        {/* The Ball Chain (Simulated with dotted border) */}
        <div className="w-0.5 h-24 border-l-2 border-dotted border-gray-400 shadow-sm group-hover:border-gray-500 transition-colors"></div>
        
        {/* The Connector (Between chain and bulb) */}
        <div className="w-1 h-2 bg-gradient-to-b from-gray-300 to-gray-500 rounded-sm"></div>

        {/* The 3D Handle (Brass/Gold or Chrome/Silver) */}
        <div className={`w-6 h-6 rounded-full shadow-lg border border-black/10 relative overflow-hidden transition-all duration-500
          ${isDarkMode 
            ? 'bg-gradient-to-br from-slate-600 via-slate-800 to-black ring-2 ring-slate-500' // Dark "Off" look
            : 'bg-gradient-to-br from-amber-200 via-yellow-500 to-amber-700 ring-2 ring-yellow-600/50' // Gold "On" look
          }`
        }>
          {/* Specular Highlight (The shiny white dot reflecting light) */}
          <div className="absolute top-1 left-1.5 w-2 h-1.5 bg-white opacity-40 rounded-full blur-[1px]"></div>
          
          {/* Bottom Reflection */}
          <div className="absolute bottom-1 right-1.5 w-2 h-2 bg-white opacity-10 rounded-full blur-[2px]"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default ThemeToggle;