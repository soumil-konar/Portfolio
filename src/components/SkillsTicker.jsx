import React from 'react';
import { motion } from 'framer-motion';
import InfiniteMarquee from './InfiniteMarquee';
import { Database, Server, Cpu, Code, Terminal, Layers, Globe, Workflow, Brain, Zap, Boxes, Network } from 'lucide-react';

const SKILLS = [
  { name: "LangGraph", icon: <Workflow size={16} /> },
  { name: "Semantic Kernel", icon: <Brain size={16} /> },
  { name: "Neo4j", icon: <Network size={16} /> },
  { name: "MCP (Model Context Protocol)", icon: <Boxes size={16} /> },
  { name: "FastAPI", icon: <Zap size={16} /> },
  { name: "ChromaDB / pgvector", icon: <Database size={16} /> },
  { name: "Python", icon: <Code size={16} /> },
  { name: "PyTorch & TensorFlow", icon: <Cpu size={16} /> },
  { name: "PostgreSQL & SQL Server", icon: <Database size={16} /> },
  { name: "Docker & GitLab CI/CD", icon: <Layers size={16} /> },
  { name: "React.js", icon: <Globe size={16} /> },
  { name: "Node.js", icon: <Server size={16} /> },
  { name: "Linux / Bash", icon: <Terminal size={16} /> },
];

const SkillsTicker = ({ theme, isDarkMode }) => {
  const pillClass = isDarkMode 
    ? "bg-slate-900/90 border-slate-700 text-slate-100" 
    : "bg-white border-slate-200/90 text-slate-800 hover:border-indigo-300";

  const shadowClass = isDarkMode
    ? "shadow-lg shadow-black/20"
    : "shadow-xs hover:shadow-md";


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
              className={`flex items-center space-x-2 md:space-x-3 px-5 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-mono whitespace-nowrap select-none transition-shadow duration-300 border ${pillClass} ${shadowClass}`}
            >
              <span className="text-indigo-600 dark:text-indigo-400">{skill.icon}</span>
              <span className="font-bold tracking-wide">{skill.name}</span>
            </div>
          ))}
        </InfiniteMarquee>
      </div>
    </motion.div>
  );
};

export default SkillsTicker;