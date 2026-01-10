import React from 'react';
import { motion } from 'framer-motion';
import InfiniteMarquee from './InfiniteMarquee';
import { Database, Server, Cpu, Code, Cloud, Terminal, Layers, Globe } from 'lucide-react';

const SKILLS = [
  { name: "Python", icon: <Code size={16} /> },
  { name: "React", icon: <Globe size={16} /> },
  { name: "AWS", icon: <Cloud size={16} /> },
  { name: "Docker", icon: <Layers size={16} /> },
  { name: "PostgreSQL", icon: <Database size={16} /> },
  { name: "Node.js", icon: <Server size={16} /> },
  { name: "LLMs / RAG", icon: <Cpu size={16} /> },
  { name: "Linux", icon: <Terminal size={16} /> },
];

const SkillsTicker = ({ theme, isDarkMode }) => {
  const pillClass = isDarkMode 
    ? "bg-slate-800 border-slate-700 text-slate-300" 
    : "bg-white border-slate-200 text-slate-600";


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full py-8 md:py-10 overflow-hidden relative z-10"
    >
      {/* CSS mask with percentage-based fade for seamless blending */}
      <div 
        className="w-full h-full"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
        }}
      >
        {/* Speed 0.8 is a nice slow pace */}
        <InfiniteMarquee speed={0.8} direction="left">
          {SKILLS.map((skill, index) => (
            <div 
              key={index} 
              // Removed 'hover:scale' to prevent glitches during drag
              className={`flex items-center space-x-2 md:space-x-3 px-5 md:px-6 py-2.5 md:py-3 rounded-full border shadow-md text-xs md:text-sm font-mono whitespace-nowrap select-none ${pillClass}`}
            >
              <span className="opacity-70">{skill.icon}</span>
              <span className="font-bold tracking-wide">{skill.name}</span>
            </div>
          ))}
        </InfiniteMarquee>
      </div>
    </motion.div>
  );
};

export default SkillsTicker;