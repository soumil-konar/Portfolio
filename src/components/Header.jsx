// src/components/Header.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Github, Linkedin, Mail, FileText, Download, Copy, Check, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { SOCIAL_LINKS } from '../data';
import { sound } from '../utils/audio';
import { useToast } from '../context/ToastContext';

const Header = ({ theme, isDarkMode }) => {
  const { addToast } = useToast();
  const [isAudioMuted, setIsAudioMuted] = useState(() => sound.isMuted());
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      setCurrentTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- HACKER DECRYPTION LOGIC ---
  const TARGET_TEXT = "Soumil Konar";
  const CYCLES_PER_LETTER = 2;
  const SHUFFLE_TIME = 45;

  const [displayText, setDisplayText] = useState("Soumil Konar");
  const [isScrambling, setIsScrambling] = useState(false);
  const hasDecryptedRef = useRef(false);

  useEffect(() => {
    const isDark = theme.bg.includes('slate') || theme.bg.includes('07090e') || theme.bg.includes('0f172a');
    if (isDark && !hasDecryptedRef.current) {
      setDisplayText("#############");
      setTimeout(() => scrambleText(), 250);
    } else {
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
          if (char === ' ') return ' ';
          const solvePoint = index * CYCLES_PER_LETTER;
          if (iteration > solvePoint) return char;
          const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>_';
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      setDisplayText(scrambled);
      iteration++;

      if (iteration > totalIterations) {
        clearInterval(interval);
        setIsScrambling(false);
        setDisplayText(TARGET_TEXT);
        hasDecryptedRef.current = true;
      }
    }, SHUFFLE_TIME);
  };

  const handleCopyEmail = () => {
    sound.playClick();
    const email = SOCIAL_LINKS.email.replace('mailto:', '');
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    sound.playChime(640);
    addToast({ message: `Copied ${email} to clipboard`, type: 'success' });
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const toggleSound = () => {
    const next = sound.toggleMute();
    setIsAudioMuted(next);
    addToast({ 
      message: next ? "Audio muted" : "Audio FX enabled", 
      type: next ? 'info' : 'sparkle' 
    });
  };

  return (
    <header className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 mt-2 sm:mt-4 md:mt-6 shrink-0 px-2 select-none">
      
      {/* Live Availability & Location Ticker */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] sm:text-[11px] font-mono">
        <div className={`flex items-center space-x-1.5 px-3 py-1 rounded-full border backdrop-blur-md transition-all ${
          isDarkMode ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 shadow-2xs font-semibold'
        }`}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="hidden sm:inline font-semibold tracking-wide">Available for AI Systems Engineering</span>
          <span className="sm:hidden font-semibold tracking-wide">Available for AI Roles</span>
        </div>

        <div className={`hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-full border backdrop-blur-md ${
          isDarkMode ? 'bg-[#101014]/90 border-zinc-800 text-zinc-400' : 'bg-white border-zinc-200 text-zinc-700 shadow-2xs font-semibold'
        }`}>
          <span>Mumbai, IN</span>
          <span>•</span>
          <span className="font-semibold text-amber-600 dark:text-amber-400">{currentTime || '23:45'} IST</span>
        </div>

        {/* Audio Mute/Unmute Toggle */}
        <button
          onClick={toggleSound}
          title={isAudioMuted ? "Enable Audio FX" : "Mute Audio FX"}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-full border text-[10px] transition-all cursor-pointer ${
            isDarkMode 
              ? 'bg-[#101014]/90 border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white' 
              : 'bg-white border-zinc-200 hover:border-zinc-300 text-zinc-700 hover:text-zinc-900 shadow-2xs font-semibold'
          }`}
        >
          {isAudioMuted ? <VolumeX size={12} className="text-zinc-500" /> : <Volume2 size={12} className="text-amber-500 dark:text-amber-400 animate-pulse" />}
          <span className="hidden md:inline">{isAudioMuted ? "Sound Off" : "Sound On"}</span>
        </button>
      </div>

      {/* Modern 3D Tech Avatar with Precision Amber Aperture Ring */}
      <div 
        className="relative group/avatar cursor-pointer"
        onClick={() => {
          sound.playChime(580);
          scrambleText();
        }}
        title="Click to trigger quantum handshake"
      >
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full p-[3px]">
          {/* Glowing Animated Gradient Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400 via-orange-500 to-yellow-300 animate-spin-slow opacity-85 blur-[2px] group-hover/avatar:opacity-100 group-hover/avatar:blur-[4px] transition-all duration-500" />
          
          <div className="relative w-full h-full rounded-full overflow-hidden bg-[#08080a] border-2 border-white/40 dark:border-zinc-800 shadow-xl">
            <img 
              src="/avatar.jpg" 
              alt="Soumil Konar - Generative AI Engineer" 
              className="w-full h-full object-cover select-none group-hover/avatar:scale-108 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Bottom Micro Badge */}
        <div 
          className="absolute -bottom-1 -right-1 sm:bottom-0.5 sm:right-0.5 flex items-center justify-center p-1 rounded-full backdrop-blur-md bg-[#08080a]/90 border border-zinc-700 shadow-lg"
          title="Autonomous Agent Core: Online"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 animate-pulse" />
        </div>
      </div>

      {/* Name, Role & High-Impact Credentials */}
      <div className="text-center max-w-sm sm:max-w-xl md:max-w-2xl mx-auto px-2">
        <h1 
          className={`text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight transition-all duration-300 ${
            isScrambling 
              ? 'text-amber-400 font-mono' 
              : 'font-sans text-zinc-900 dark:text-white'
          }`}
          style={isScrambling ? {
            textShadow: '0 0 12px rgba(251, 191, 36, 0.8), 0 0 24px rgba(245, 158, 11, 0.3)',
            letterSpacing: '0.04em'
          } : {}}
        >
          {displayText}
        </h1>
        
        <div className="flex items-center justify-center gap-2 mt-1.5 flex-wrap">
          <span className="text-xs sm:text-sm md:text-base font-mono font-bold text-amber-600 dark:text-amber-400">
            {'<'}Generative AI Systems Engineer & LLM Architect/{'>'}
          </span>
        </div>

        {/* Engineering Credential Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-2 font-mono text-[10px] sm:text-[11px]">
          <span className="px-2 sm:px-2.5 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#101014]/90 text-zinc-700 dark:text-zinc-300 shadow-2xs font-semibold">
            <span className="hidden sm:inline">LangGraph Multi-Agent Workflows</span>
            <span className="sm:hidden">LangGraph Agents</span>
          </span>
          <span className="px-2 sm:px-2.5 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#101014]/90 text-zinc-700 dark:text-zinc-300 shadow-2xs font-semibold">
            <span className="hidden sm:inline">Dual MCP Server Author</span>
            <span className="sm:hidden">MCP Author</span>
          </span>
          <span className="px-2 sm:px-2.5 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#101014]/90 text-zinc-700 dark:text-zinc-300 shadow-2xs font-semibold">
            <span className="hidden sm:inline">Enterprise RAG Microservices</span>
            <span className="sm:hidden">Enterprise RAG</span>
          </span>
        </div>
      </div>

      {/* Hero Action Ribbon */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1">
        {/* Direct Resume Download Button */}
        <a 
          href="/resume.pdf" 
          download="Soumil_Resume.pdf"
          onClick={() => {
            sound.playPowerUp();
            addToast({ message: "Downloading Soumil_Resume.pdf", type: 'sparkle' });
          }}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-mono font-bold border transition-all duration-200 shadow-md hover:scale-105 active:scale-95 group cursor-pointer ${
            isDarkMode 
              ? 'bg-amber-500 hover:bg-amber-400 border-amber-400 text-black shadow-amber-500/20 font-extrabold' 
              : 'bg-amber-600 hover:bg-amber-700 border-amber-600 text-white shadow-md shadow-amber-600/20 font-bold'
          }`}
          title="Download Full Resume PDF"
        >
          <FileText size={13} className={isDarkMode ? "text-black" : "text-amber-100 group-hover:text-white"} />
          <span>Resume (PDF)</span>
          <Download size={12} className="opacity-80 group-hover:translate-y-0.5 transition-transform" />
        </a>

        {/* Copy Email Button with instant feedback */}
        <button
          onClick={handleCopyEmail}
          className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-xs font-mono font-semibold border transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${
            isDarkMode 
              ? 'bg-[#101014]/90 border-zinc-800 hover:border-amber-400 text-zinc-200 hover:text-white shadow-md' 
              : 'bg-white border-zinc-200 hover:border-amber-500 text-zinc-800 hover:bg-zinc-50 shadow-2xs'
          }`}
          title="Copy Email Address"
        >
          {copiedEmail ? (
            <>
              <Check size={13} className="text-emerald-500 dark:text-emerald-400" />
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={13} className="text-zinc-500 dark:text-zinc-400" />
              <span>Copy Email</span>
            </>
          )}
        </button>

        {/* Social Icons with accessible touch targets */}
        <div className="flex space-x-1 sm:space-x-1.5 text-zinc-700 dark:text-zinc-300 items-center">
          <a 
            href={SOCIAL_LINKS.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="GitHub Profile"
            onClick={() => sound.playClick()}
            className="p-2 rounded-lg hover:bg-zinc-200/70 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center min-w-[38px] min-h-[38px]"
          >
            <Github className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform hover:text-amber-600 dark:hover:text-amber-400" />
          </a>

          <a 
            href={SOCIAL_LINKS.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LinkedIn Profile"
            onClick={() => sound.playClick()}
            className="p-2 rounded-lg hover:bg-zinc-200/70 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center min-w-[38px] min-h-[38px]"
          >
            <Linkedin className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform hover:text-amber-600 dark:hover:text-amber-400" />
          </a>

          <a 
            href={SOCIAL_LINKS.twitter} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Twitter Profile"
            onClick={() => sound.playClick()}
            className="p-2 rounded-lg hover:bg-zinc-200/70 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center min-w-[38px] min-h-[38px]"
          >
            <Twitter className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform hover:text-amber-600 dark:hover:text-amber-400" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;