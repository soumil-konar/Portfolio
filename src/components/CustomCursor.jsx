// src/components/CustomCursor.jsx
import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [isVisible] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: fine) and (hover: hover)').matches);

  // Smooth spring physics for cursor movement
  const cursorX = useSpring(-100, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(-100, { stiffness: 500, damping: 28 });

  useEffect(() => {
    if (!isVisible) return;

    const updateMousePosition = (e) => {
      if (!hasMoved) setHasMoved(true);
      setMousePos({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseLeave = () => {
      setHasMoved(false);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('[data-cursor-hover]')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible, hasMoved]);

  if (!isVisible || !hasMoved) return null;

  return (
    <>
      {/* Outer cursor ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            width: isHovered ? 40 : 20,
            height: isHovered ? 40 : 20,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        >
          <div className="w-full h-full rounded-full bg-white border-2 border-white opacity-80" />
        </motion.div>
      </motion.div>

      {/* Small dot in center */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: mousePos.x,
          y: mousePos.y,
        }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white" />
      </motion.div>
    </>
  );
};

export default CustomCursor;
