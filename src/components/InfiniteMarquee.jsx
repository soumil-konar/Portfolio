import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";

const InfiniteMarquee = ({
  children,
  direction = "left",
  speed = 1.5, // Pixels per frame
  className = ""
}) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  
  const x = useMotionValue(0);
  
  // State to track interaction
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (contentRef.current) {
        setContentWidth(contentRef.current.scrollWidth / 3);
      }
    };

    updateWidth();

    // Recompute on resize or orientation change
    window.addEventListener('resize', updateWidth);
    let ro;
    if (typeof ResizeObserver !== 'undefined' && contentRef.current) {
      ro = new ResizeObserver(updateWidth);
      ro.observe(contentRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateWidth);
      if (ro) ro.disconnect();
    };
  }, [children]);

  useAnimationFrame((t, delta) => {
    // STOP the auto-scroll if user is Dragging OR Hovering
    if (isDragging || isHovering || !contentWidth) return;

    let moveBy = direction === "left" ? -speed : speed;
    moveBy = (moveBy * delta) / 16; 

    let newX = x.get() + moveBy;

    // Infinite Loop Logic
    if (direction === "left") {
      if (newX <= -contentWidth) {
        newX = 0; 
      }
    } else {
      if (newX >= 0) {
        newX = -contentWidth; 
      }
    }

    x.set(newX);
  });

  return (
    <div 
      ref={containerRef} 
      className={`overflow-hidden w-full ${className} cursor-grab active:cursor-grabbing touch-pan-y`}
      // Only pause on hover if device actually supports hover (prevents getting stuck on touch devices)
      onMouseEnter={() => {
        if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
          setIsHovering(true);
        }
      }}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
    >
      <motion.div
        ref={contentRef}
        className="flex w-max items-center gap-4 sm:gap-6 md:gap-8"
        style={{ x }}
        
        // --- DRAG LOGIC ---
        drag="x"
        dragConstraints={{ left: -10000, right: 10000 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        dragElastic={0.08} 
        dragMomentum={false}
      >
        {children}
        {children}
        {children} {/* 3 copies ensures smooth looping even on wide monitors */}
      </motion.div>
    </div>
  );
};

export default InfiniteMarquee;