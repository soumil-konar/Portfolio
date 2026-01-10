import React from 'react';
import InfiniteMarquee from './InfiniteMarquee';
import { Database, Server, Cpu, Code, Cloud, Terminal, Layers, Globe } from 'lucide-react';

const SKILLS = [
  { name: "Python", icon: <Code size={14} /> },
  { name: "React", icon: <Globe size={14} /> },
  { name: "AWS", icon: <Cloud size={14} /> },
  { name: "Docker", icon: <Layers size={14} /> },
  { name: "PostgreSQL", icon: <Database size={14} /> },
  { name: "Node.js", icon: <Server size={14} /> },
  { name: "LLMs / RAG", icon: <Cpu size={14} /> },
  { name: "Linux", icon: <Terminal size={14} /> },
];

const SkillsTicker = ({ theme, isDarkMode }) => {
  const pillClass = isDarkMode 
    ? "bg-slate-800 border-slate-700 text-slate-300" 
    : "bg-white border-slate-200 text-slate-600";

  const fadeColor = isDarkMode ? '#1a202c' : '#FDFBF7';

  return (
    <div className="w-full py-6 overflow-hidden relative z-10 group">
      {/* Fade Masks */}
      <div className="absolute top-0 left-0 h-full w-12 z-20 pointer-events-none" style={{ background: `linear-gradient(to right, ${fadeColor}, transparent)` }}></div>
      <div className="absolute top-0 right-0 h-full w-12 z-20 pointer-events-none" style={{ background: `linear-gradient(to left, ${fadeColor}, transparent)` }}></div>

      {/* Speed increased to 60s for smoother flow */}
      <InfiniteMarquee speed={45} direction="left">
        {SKILLS.map((skill, index) => (
          <div 
            key={index} 
            className={`flex items-center space-x-2 px-4 py-2 rounded-full border shadow-sm text-xs font-mono whitespace-nowrap transition-transform hover:scale-105 ${pillClass}`}
          >
            <span className="opacity-70">{skill.icon}</span>
            <span className="font-bold tracking-wide">{skill.name}</span>
          </div>
        ))}
      </InfiniteMarquee>
    </div>
  );
};

export default SkillsTicker;