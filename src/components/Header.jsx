import React, { useEffect, useState, useRef } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { SOCIAL_LINKS } from '../data';

const Header = ({ theme }) => {
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
    <header className="flex flex-col items-center justify-center space-y-3 md:space-y-4 mt-6 md:mt-10 shrink-0">
      
      {/* Modern 3D Tech Avatar with Glowing Gradient Halo */}
      <div className="relative group/avatar cursor-pointer">
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full p-[3px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-400 shadow-2xl shadow-indigo-500/20 group-hover/avatar:shadow-indigo-500/40 transition-all duration-500">
          <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-white/20">
            <img 
              src="/avatar.jpg" 
              alt="Soumil - Generative AI Engineer" 
              className="w-full h-full object-cover select-none group-hover/avatar:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Live Active Status Indicator */}
        <div 
          className="absolute bottom-1 right-1.5 flex items-center justify-center" 
          title="Available for AI Systems Engineering"
        >
          <span className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-md ring-4 ring-emerald-500/20 animate-pulse" />
        </div>
      </div>

      <div className="text-center">
        {/* --- HACKER NAME WITH DECRYPTION EFFECT --- */}
        <h1 
          className={`text-2xl md:text-4xl font-bold tracking-tight transition-all duration-300 ${
            isScrambling 
              ? 'text-emerald-400 font-mono' 
              : 'font-sans text-slate-900 dark:text-white'
          }`}
          style={isScrambling ? {
            textShadow: '0 0 10px rgba(52, 211, 153, 0.8), 0 0 20px rgba(52, 211, 153, 0.4), 0 0 30px rgba(52, 211, 153, 0.2)',
            letterSpacing: '0.05em'
          } : {}}
        >
          {displayText}
        </h1>
        
        <p className={`text-xs md:text-sm font-mono font-bold ${theme.accent}`}>{'<'}Generative AI Engineer /{'>'}</p>
        <p className="text-[10px] md:text-[11px] mt-1 tracking-wider uppercase font-semibold text-slate-600 dark:text-slate-300">LLMs, RAG & Agentic Systems</p>
      </div>

      <div className="flex space-x-5 pt-1.5 text-slate-600 dark:text-slate-300">
        <a 
          href={SOCIAL_LINKS.github} 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="GitHub Profile"
        >
          <Github className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform hover:text-indigo-600 dark:hover:text-indigo-400" />
        </a>

        <a 
          href={SOCIAL_LINKS.linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="LinkedIn Profile"
        >
          <Linkedin className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform hover:text-[#0A66C2] dark:hover:text-[#38bdf8]" />
        </a>

        <a 
          href={SOCIAL_LINKS.email}
          aria-label="Send Email"
        >
          <Mail className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform hover:text-red-500 dark:hover:text-red-400" />
        </a>
      </div>
    </header>
  );
};

export default Header;