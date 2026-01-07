import React, { useEffect, useState, useRef } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { SOCIAL_LINKS } from '../data';

const Header = ({ theme }) => {
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const containerRef = useRef(null);

  // 1. Math: Circular Eye Tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      // Get the exact center of the avatar on the screen
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from center to mouse
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      // Calculate the angle using trigonometry
      const angle = Math.atan2(dy, dx);

      // Calculate how far to move (clamped)
      // We limit the radius to 6px so it stays inside the eye whites
      // The '/ 15' factor dampens the movement so you have to move the mouse further to look further
      const distance = Math.min(6, Math.hypot(dx, dy) / 15);

      const moveX = Math.cos(angle) * distance;
      const moveY = Math.sin(angle) * distance;

      setEyePos({ x: moveX, y: moveY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 2. Life: Random Blinking Logic
  useEffect(() => {
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150); // Blink duration (150ms)
      
      // Schedule next blink randomly between 2s and 6s
      setTimeout(triggerBlink, Math.random() * 4000 + 2000);
    };

    const initialTimeout = setTimeout(triggerBlink, 2000);
    return () => clearTimeout(initialTimeout);
  }, []);

  return (
    <header className="flex flex-col items-center justify-center space-y-4 mt-4 shrink-0">
      
      {/* Avatar Container with Ref for calculating center */}
      <div 
        ref={containerRef}
        className="relative w-28 h-28 rounded-full bg-indigo-50/80 border-4 border-indigo-200 overflow-hidden shadow-xl"
      >
         <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Skin */}
            <circle cx="50" cy="55" r="35" fill="#FDE2D3" />

            {/* Hair */}
            <path d="M15,45 Q50,5 85,45 L90,40 Q50,-15 10,40 Z" fill="#2D3748" />
            
            {/* Glasses Frames */}
            <g fill="none" stroke="#4338CA" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
               <circle cx="35" cy="53" r="13" fill="#FFFFFF" opacity="0.9" />
               <circle cx="65" cy="53" r="13" fill="#FFFFFF" opacity="0.9"/>
               <line x1="48" y1="53" x2="52" y2="53" strokeWidth="3" />
            </g>

            {/* EYE GROUP */}
            {/* We scale Y to 0.1 to simulate blinking */}
            <g 
              style={{ 
                transformOrigin: '50% 53px', // Pivot from center of eyes
                transform: isBlinking ? 'scaleY(0.1)' : 'scaleY(1)',
                transition: 'transform 0.1s ease-in-out' 
              }}
            >
              <g transform={`translate(${eyePos.x}, ${eyePos.y})`} style={{ transition: 'transform 0.05s linear' }}>
                 {/* Pupils */}
                 <circle cx="35" cy="53" r="5" fill="#1A202C" />
                 <circle cx="65" cy="53" r="5" fill="#1A202C" />
                 {/* Sparkles (Reflections) */}
                 <circle cx="37" cy="51" r="2" fill="white" opacity="0.8" />
                 <circle cx="67" cy="51" r="2" fill="white" opacity="0.8" />
              </g>
            </g>

            {/* Smile */}
            <path d="M38,72 Q50,82 62,72" fill="none" stroke="#C07F5F" strokeWidth="3" strokeLinecap="round" />

            {/* Headset Mic */}
            <path d="M88,55 Q92,75 75,80" fill="none" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="75" cy="80" r="3.5" fill="#2D3748" />
         </svg>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Soumil</h1>
        <p className={`text-xs opacity-75 font-mono ${theme.accent}`}>{'<'}Full Stack Engineer /{'>'}</p>
        <p className="text-[10px] opacity-60 mt-1 tracking-wider uppercase">AI & RAG Specialist</p>
      </div>

      <div className="flex space-x-4 opacity-60 pt-2">
        <a 
          href={SOCIAL_LINKS.github} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
        >
          <Github className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform hover:text-[#6B8E23] dark:hover:text-[#B794F4]" />
        </a>

        <a 
          href={SOCIAL_LINKS.linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
        >
          <Linkedin className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform hover:text-[#0A66C2]" />
        </a>

        <a 
          href={SOCIAL_LINKS.email}
          aria-label="Send Email"
        >
          <Mail className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform hover:text-red-400" />
        </a>
      </div>
    </header>
  );
};

export default Header;