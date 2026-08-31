import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import InfiniteMarquee from './InfiniteMarquee';
import { 
  Database, 
  Server, 
  Cpu, 
  Code, 
  Terminal, 
  Layers, 
  Globe, 
  Workflow, 
  Brain, 
  Zap, 
  Boxes, 
  Network,
  Sparkles
} from 'lucide-react';
import { SKILLS } from '../data';

const ICON_MAP = {
  Workflow: <Workflow size={16} />,
  Brain: <Brain size={16} />,
  Network: <Network size={16} />,
  Boxes: <Boxes size={16} />,
  Zap: <Zap size={16} />,
  Database: <Database size={16} />,
  Code: <Code size={16} />,
  Cpu: <Cpu size={16} />,
  Layers: <Layers size={16} />,
  Globe: <Globe size={16} />,
  Server: <Server size={16} />,
  Terminal: <Terminal size={16} />,
};

const SkillsTicker = ({ theme, isDarkMode, onSelectSkill }) => {
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);

  const handlePointerDown = (e) => {
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
    hasDraggedRef.current = false;
  };

  const handlePointerMove = (e) => {
    const dx = Math.abs(e.clientX - pointerStartRef.current.x);
    const dy = Math.abs(e.clientY - pointerStartRef.current.y);
    if (dx > 6 || dy > 6) {
      hasDraggedRef.current = true;
    }
  };

  const handleSkillClick = (skill) => {
    if (hasDraggedRef.current) return;
    if (onSelectSkill) {
      onSelectSkill(skill);
    }
  };

  const pillClass = isDarkMode 
    ? "bg-slate-900/90 border-slate-700 text-slate-100 hover:border-indigo-400 hover:bg-slate-800/95" 
    : "bg-white border-slate-200/90 text-slate-800 hover:border-indigo-400 hover:bg-indigo-50/50";

  const shadowClass = isDarkMode
    ? "shadow-lg shadow-black/20 hover:shadow-indigo-500/10"
    : "shadow-xs hover:shadow-md hover:shadow-indigo-200/50";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full py-8 md:py-10 overflow-hidden relative z-10"
    >
      {/* Small Hint Label above ticker */}
      <div className="flex items-center justify-between mb-3 px-3">
        <div className="text-[10px] uppercase font-mono tracking-widest font-bold text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
          <Sparkles size={11} className="text-indigo-500" />
          <span>Core Engineering Stack & Tooling</span>
        </div>
        <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 hidden sm:inline font-medium">
          Click any skill to inspect practical architecture ↗
        </div>
      </div>

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
          {SKILLS.map((skill, index) => {
            const icon = ICON_MAP[skill.iconName] || <Workflow size={16} />;

            return (
              <div 
                key={index}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onClick={() => handleSkillClick(skill)}
                data-cursor-hover
                className={`flex items-center space-x-2 md:space-x-3 px-5 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-mono whitespace-nowrap select-none transition-all duration-200 border cursor-pointer active:scale-95 group ${pillClass} ${shadowClass}`}
                title={`Click to inspect ${skill.name} in projects`}
              >
                <span className="text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                  {icon}
                </span>
                <span className="font-bold tracking-wide group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                  {skill.name}
                </span>
                <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400 hidden md:inline ml-0.5">
                  ↗
                </span>
              </div>
            );
          })}
        </InfiniteMarquee>
      </div>
    </motion.div>
  );
};

export default SkillsTicker;