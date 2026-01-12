import React, { useEffect, useState, useRef } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { SOCIAL_LINKS } from '../data';

const Header = ({ theme }) => {
  // --- EXISTING AVATAR LOGIC ---
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const angle = Math.atan2(dy, dx);
      const distance = Math.min(6, Math.hypot(dx, dy) / 15);
      setEyePos({ x: Math.cos(angle) * distance, y: Math.sin(angle) * distance });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
      setTimeout(triggerBlink, Math.random() * 4000 + 2000);
    };
    const initialTimeout = setTimeout(triggerBlink, 2000);
    return () => clearTimeout(initialTimeout);
  }, []);

  // --- HACKER DECRYPTION LOGIC ---
  const TARGET_TEXT = "Soumil";
  const CYCLES_PER_LETTER = 3; // How many "scrambles" before fixing a letter
  const SHUFFLE_TIME = 60; // Speed in ms for smoother animation

  const [displayText, setDisplayText] = useState("");
  const [isScrambling, setIsScrambling] = useState(false);
  const hasDecryptedRef = useRef(false); // Use ref to persist across theme changes

  // Trigger decryption only once on initial dark mode load
  useEffect(() => {
    const isDark = theme.bg.includes('slate') || theme.bg.includes('0f172a');

    if (isDark && !hasDecryptedRef.current) {
      // Start with encrypted text
      setDisplayText("######");
      setTimeout(() => scrambleText(), 300); // Small delay before decryption starts
    } else if (!isDark) {
      // In light mode, show clean text immediately
      setDisplayText(TARGET_TEXT);
      // Don't reset hasDecryptedRef - keep it true so animation won't re-trigger
    } else if (isDark && hasDecryptedRef.current) {
      // Already decrypted, just show the name
      setDisplayText(TARGET_TEXT);
    }
  }, [theme]);

  const scrambleText = () => {
    setIsScrambling(true);
    let iteration = 0;
    const totalIterations = TARGET_TEXT.length * CYCLES_PER_LETTER;

    const interval = setInterval(() => {
      const scrambled = TARGET_TEXT.split('')
        .map((char, index) => {
          // Calculate if this letter should be "solved" yet
          const solvePoint = index * CYCLES_PER_LETTER;
          
          if (iteration > solvePoint) {
            return char; // Letter is decrypted
          }
          
          // Return random hacker-style character (alphanumeric + symbols)
          const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~';
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      setDisplayText(scrambled);
      iteration++;

      if (iteration > totalIterations) {
        clearInterval(interval);
        setIsScrambling(false);
        setDisplayText(TARGET_TEXT);
        hasDecryptedRef.current = true; // Mark as decrypted using ref
      }
    }, SHUFFLE_TIME);
  };

  return (
    <header className="flex flex-col items-center justify-center space-y-3 md:space-y-4 mt-8 md:mt-12 shrink-0">
      
      {/* Avatar (Same as before) */}
      <div ref={containerRef} className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-indigo-100/50 border-4 border-indigo-300/40 overflow-hidden shadow-xl">
         <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="55" r="35" fill="#FDE2D3" />
            <path d="M15,45 Q50,5 85,45 L90,40 Q50,-15 10,40 Z" fill="#2D3748" />
            <g fill="none" stroke="#4338CA" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
               <circle cx="35" cy="53" r="13" fill="#FFFFFF" opacity="0.9" />
               <circle cx="65" cy="53" r="13" fill="#FFFFFF" opacity="0.9"/>
               <line x1="48" y1="53" x2="52" y2="53" strokeWidth="3" />
            </g>
            <g style={{ transformOrigin: '50% 53px', transform: isBlinking ? 'scaleY(0.1)' : 'scaleY(1)', transition: 'transform 0.1s ease-in-out' }}>
              <g transform={`translate(${eyePos.x}, ${eyePos.y})`} style={{ transition: 'transform 0.05s linear' }}>
                 <circle cx="35" cy="53" r="5" fill="#1A202C" />
                 <circle cx="65" cy="53" r="5" fill="#1A202C" />
                 <circle cx="37" cy="51" r="2" fill="white" opacity="0.8" />
                 <circle cx="67" cy="51" r="2" fill="white" opacity="0.8" />
              </g>
            </g>
            <path d="M38,72 Q50,82 62,72" fill="none" stroke="#C07F5F" strokeWidth="3" strokeLinecap="round" />
            <path d="M88,55 Q92,75 75,80" fill="none" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="75" cy="80" r="3.5" fill="#2D3748" />
         </svg>
      </div>

      <div className="text-center">
        {/* --- HACKER NAME WITH DECRYPTION EFFECT --- */}
        <h1 
          className={`text-2xl md:text-4xl font-bold tracking-tight transition-all duration-300 ${
            isScrambling 
              ? 'text-emerald-400 font-mono' 
              : 'font-sans'
          }`}
          style={isScrambling ? {
            textShadow: '0 0 10px rgba(52, 211, 153, 0.8), 0 0 20px rgba(52, 211, 153, 0.4), 0 0 30px rgba(52, 211, 153, 0.2)',
            letterSpacing: '0.05em'
          } : {}}
        >
          {displayText}
        </h1>
        
        <p className={`text-xs md:text-sm opacity-75 font-mono ${theme.accent}`}>{'<'}Full Stack Engineer /{'>'}</p>
        <p className="text-[9px] md:text-[10px] opacity-60 mt-1 tracking-wider uppercase">AI & RAG Specialist</p>
      </div>

      <div className="flex space-x-5 opacity-60 pt-1">
        <a 
          href={SOCIAL_LINKS.github} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
        >
          <Github className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform hover:text-[#6B8E23] dark:hover:text-[#B794F4]" />
          {/* <Github className="w-5 h-5 md:w-6 md:h-6 hover:text-[#6B8E23]" /> */}
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