import React from 'react';
import { motion } from 'framer-motion';

const ThemeTransition = ({ isTargetDark, mode }) => {
  const targetColor = isTargetDark ? '#1a202c' : '#FDFBF7';
  
  // Enter is fast (cover the old theme), Exit is slow (reveal the new theme)
  const enterTransition = { duration: 0.7, ease: "easeInOut" };
  const exitTransition = { duration: 0.9, ease: "easeOut" }; // Slower fade out

  // Common exit animation: Just fade out to reveal the new theme
  const fadeOutExit = { opacity: 0 };

  return (
    <motion.div 
       className="fixed inset-0 z-[100] pointer-events-none"
       // This container handles the unmounting (exit) logic for all children
       exit={fadeOutExit} 
       transition={exitTransition}
    >
      
      {/* --- MODE 0: THE "ECLIPSE" --- */}
      {mode === 0 && (
        <motion.div
          key="circle"
          initial={{ clipPath: `circle(0% at 92% 40px)` }}
          animate={{ clipPath: `circle(150% at 92% 40px)` }}
          exit={{ opacity: 0 }} // Smooth fade out
          transition={enterTransition}
          className="w-full h-full"
          style={{ backgroundColor: targetColor }}
        />
      )}

      {/* --- MODE 1: THE "CURTAIN" --- */}
      {mode === 1 && (
        <motion.div
          key="curtain"
          initial={{ x: '100%' }}
          animate={{ x: '0%' }}
          exit={{ opacity: 0 }} // Smooth fade out
          transition={enterTransition}
          className="w-full h-full"
          style={{ backgroundColor: targetColor }}
        />
      )}

      {/* --- MODE 2: THE "GRID" --- */}
      {mode === 2 && (
        <div className="w-full h-full flex flex-wrap">
          {[...Array(4)].map((_, i) => (
             <motion.div
               key={i}
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               exit={{ opacity: 0 }} // Smooth fade out
               transition={{ ...enterTransition, delay: i * 0.05, duration: 0.5 }}
               className="w-1/2 h-1/2"
               style={{ 
                 backgroundColor: targetColor,
                 transformOrigin: i === 0 ? 'top left' : i === 1 ? 'top right' : i === 2 ? 'bottom left' : 'bottom right'
               }}
             />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ThemeTransition;