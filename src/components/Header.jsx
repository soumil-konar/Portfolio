import React, { useEffect, useState, useRef } from 'react';
import { Github, Linkedin, Mail, FileText, Download } from 'lucide-react';
import { SOCIAL_LINKS } from '../data';

const Header = ({ theme, isDarkMode }) => {
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
    <header className="flex flex-col items-center justify-center space-y-3 sm:space-y-3.5 md:space-y-4 mt-4 sm:mt-6 md:mt-10 shrink-0 px-2">
      
      {/* Modern 3D Tech Avatar with Glowing Gradient Halo */}
      <div className="relative group/avatar cursor-pointer">
        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full p-[3px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-400 shadow-2xl shadow-indigo-500/20 group-hover/avatar:shadow-indigo-500/40 transition-all duration-500">
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
          className="absolute bottom-0.5 right-1 sm:bottom-1 sm:right-1.5 flex items-center justify-center" 
          title="Available for AI Systems Engineering"
        >
          <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-md ring-4 ring-emerald-500/20 animate-pulse" />
        </div>
      </div>

      <div className="text-center max-w-sm sm:max-w-md md:max-w-xl mx-auto px-2">
        {/* --- HACKER NAME WITH DECRYPTION EFFECT --- */}
        <h1 
          className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight transition-all duration-300 ${
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
        
        <p className={`text-xs sm:text-sm font-mono font-bold mt-1 ${theme.accent}`}>{'<'}Generative AI Engineer /{'>'}</p>
        <p className="text-[10px] sm:text-[11px] mt-1 tracking-wider uppercase font-semibold text-slate-600 dark:text-slate-300">LLMs, RAG & Agentic Systems</p>
      </div>

      {/* Hero CTA & Social Connect Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-1">
        {/* Direct Resume Download Button */}
        <a 
          href="/resume.pdf" 
          download="Soumil_Resume.pdf"
          className={`flex items-center space-x-2 px-3.5 sm:px-4 py-2 sm:py-1.5 rounded-full text-xs font-mono font-bold border transition-all duration-200 shadow-md hover:scale-105 active:scale-95 group ${
            isDarkMode 
              ? 'bg-indigo-600/30 border-indigo-400/80 hover:bg-indigo-600 text-white shadow-indigo-500/20' 
              : 'bg-indigo-50 border-indigo-300 hover:bg-indigo-600 hover:text-white text-indigo-700 shadow-sm'
          }`}
          title="Download Full Resume PDF"
        >
          <FileText size={13} className="text-indigo-400 dark:text-indigo-300 group-hover:text-white transition-colors" />
          <span>Resume (PDF)</span>
          <Download size={12} className="opacity-80 group-hover:translate-y-0.5 transition-transform" />
        </a>

        {/* Social Icons with accessible touch padding */}
        <div className="flex space-x-1 sm:space-x-2 text-slate-600 dark:text-slate-300 items-center">
          <a 
            href={SOCIAL_LINKS.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="GitHub Profile"
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center min-w-[36px] min-h-[36px]"
          >
            <Github className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform hover:text-indigo-600 dark:hover:text-indigo-400" />
          </a>

          <a 
            href={SOCIAL_LINKS.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LinkedIn Profile"
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center min-w-[36px] min-h-[36px]"
          >
            <Linkedin className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform hover:text-[#0A66C2] dark:hover:text-[#38bdf8]" />
          </a>

          <a 
            href={SOCIAL_LINKS.email} 
            aria-label="Send Email"
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center min-w-[36px] min-h-[36px]"
          >
            <Mail className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform hover:text-red-500 dark:hover:text-red-400" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;