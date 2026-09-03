// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, FileText, Download, Copy, Check, Volume2, VolumeX, Sparkles, MapPin, Activity, Terminal } from 'lucide-react';
import { SOCIAL_LINKS } from '../data';
import { sound } from '../utils/audio';
import { useToast } from '../context/ToastContext';

/**
 * Editorial Museum-Grade Header & Systems Manifesto
 * Inspired by spragadheeshraj.com and Swiss graphic engineering publications.
 */
const Header = () => {
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
      message: next ? "Audio FX muted" : "Tactile Audio FX enabled", 
      type: next ? 'info' : 'sparkle' 
    });
  };

  return (
    <header className="w-full pt-4 sm:pt-6 md:pt-10 pb-6 sm:pb-8 border-b border-zinc-200 dark:border-zinc-800/90 select-none">
      
      {/* 1. Top Architectural Colophon & Status Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between text-xs font-mono pb-6 border-b border-zinc-200/80 dark:border-zinc-800/60 gap-3">
        {/* Identity Title */}
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
          <span className="font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Soumil Konar
          </span>
          <span className="text-zinc-400 dark:text-zinc-600">—</span>
          <span className="text-zinc-600 dark:text-zinc-400">
            AI Systems Engineer & Agent Architect
          </span>
        </div>

        {/* Global Coordinates & IST Clock */}
        <div className="flex items-center space-x-3 text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">
          <div className="flex items-center space-x-1.5">
            <MapPin size={11} className="text-amber-500" />
            <span>19.0760° N, 72.8777° E</span>
            <span className="text-zinc-400 dark:text-zinc-600">(Mumbai, IN)</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-zinc-900 dark:text-zinc-200 font-bold">{currentTime || '00:45:00'} IST</span>
          </div>
        </div>

        {/* Tactical Controls & Actions */}
        <div className="flex items-center space-x-2 self-end md:self-auto">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            title={isAudioMuted ? "Enable Tactile Audio" : "Mute Tactile Audio"}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#101014] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer text-[11px]"
          >
            {isAudioMuted ? <VolumeX size={12} /> : <Volume2 size={12} className="text-amber-500 animate-pulse" />}
            <span className="hidden lg:inline">{isAudioMuted ? "FX Off" : "Tactile FX"}</span>
          </button>

          {/* Direct Resume Download */}
          <a
            href="/resume.pdf"
            download="Soumil_Resume.pdf"
            onClick={() => {
              sound.playPowerUp();
              addToast({ message: "Downloading Soumil_Resume.pdf", type: 'sparkle' });
            }}
            className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold border border-amber-400 transition-all text-[11px] shadow-xs cursor-pointer"
            title="Download Official Resume PDF"
          >
            <FileText size={11} />
            <span>Resume</span>
            <Download size={10} />
          </a>
        </div>
      </div>

      {/* 2. Main Human Editorial Manifesto */}
      <div className="pt-8 sm:pt-12 pb-6 sm:pb-8">
        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-md border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[11px] font-mono font-semibold mb-4">
            <Sparkles size={11} />
            <span>SYSTEMS ARCHITECT & LLM PROTOCOLS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-grotesk tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.12]">
            I build deterministic AI architectures at the intersection of graph intelligence, multi-actor agents, and production inference.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-sans mt-5 max-w-3xl leading-relaxed">
            Specialized in stateful <span className="text-zinc-900 dark:text-zinc-100 font-semibold">LangGraph orchestrators</span>, Anthropic <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Model Context Protocol (MCP)</span> servers, and high-throughput hybrid vector retrieval engines. Crafting transparent, explainable AI workflows that run reliably under enterprise load.
          </p>
        </div>

        {/* 3. Operational Telemetry & Proof Ribbon */}
        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center space-x-1.5">
              <Activity size={12} className="text-emerald-500" />
              <span>LATENCY:</span>
              <span className="text-zinc-900 dark:text-zinc-200 font-bold">24ms (ap-south-1)</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1.5">
              <Terminal size={12} className="text-amber-500" />
              <span>CORE PROTOCOL:</span>
              <span className="text-zinc-900 dark:text-zinc-200 font-bold">MCP 1.0 + LangGraph</span>
            </div>
          </div>

          {/* Social Contact Direct Links */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyEmail}
              className="flex items-center space-x-1.5 px-3 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#101014] text-zinc-700 dark:text-zinc-300 hover:border-amber-400 transition-colors text-xs cursor-pointer"
            >
              {copiedEmail ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
              <span>{copiedEmail ? 'Copied' : 'soumil.konar2001@gmail.com'}</span>
            </button>

            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-amber-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="GitHub Profile"
            >
              <Github size={14} />
            </a>

            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-amber-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin size={14} />
            </a>

            <a
              href={SOCIAL_LINKS.email}
              onClick={() => sound.playClick()}
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-amber-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="Send Email"
            >
              <Mail size={14} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;