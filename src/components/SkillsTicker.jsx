// src/components/SkillsTicker.jsx
import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Sparkles,
  LayoutGrid,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { SKILLS } from '../data';
import { sound } from '../utils/audio';

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

// 4 High-Tech AI Engineering Sectors
const BENTO_SECTORS = [
  {
    id: 'agents',
    title: 'Agentic Systems & Multi-Actor Graphs',
    subtitle: 'Stateful DAGs, cyclic routers, human-in-the-loop & tool calling',
    color: 'from-amber-500/15 via-orange-500/10 to-transparent',
    borderColor: 'border-amber-500/30',
    dotColor: 'bg-amber-400',
    skillIds: ['langgraph', 'semantic-kernel'],
  },
  {
    id: 'graphs-protocols',
    title: 'Tooling Protocols & Knowledge Graphs',
    subtitle: 'Anthropic MCP servers, Cypher pathfinding, Neo4j batch ETL',
    color: 'from-sky-500/15 via-blue-500/10 to-transparent',
    borderColor: 'border-sky-500/30',
    dotColor: 'bg-sky-400',
    skillIds: ['mcp', 'neo4j'],
  },
  {
    id: 'rag-vectors',
    title: 'Enterprise RAG & Hybrid Vector Search',
    subtitle: 'HNSW pgvector indexing, semantic chunking & cross-encoder re-ranking',
    color: 'from-emerald-500/15 via-teal-500/10 to-transparent',
    borderColor: 'border-emerald-500/30',
    dotColor: 'bg-emerald-400',
    skillIds: ['vector-dbs', 'databases'],
  },
  {
    id: 'infra-runtime',
    title: 'Production AI Infrastructure & Backend',
    subtitle: 'FastAPI async streaming, Docker CI/CD, PyTorch & Linux automation',
    color: 'from-amber-600/15 via-stone-500/10 to-transparent',
    borderColor: 'border-amber-600/30',
    dotColor: 'bg-amber-500',
    skillIds: ['fastapi', 'python', 'ml-frameworks', 'devops', 'nodejs', 'linux', 'react'],
  }
];

const SkillsTicker = ({ isDarkMode, onSelectSkill }) => {
  const [viewMode, setViewMode] = useState('bento'); // 'bento' default
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);

  const handlePointerDown = (e) => {
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
    hasDraggedRef.current = false;
  };

  const handlePointerMove = (e) => {
    const dx = Math.abs(e.clientX - pointerStartRef.current.x);
    const dy = Math.abs(e.clientY - pointerStartRef.current.y);
    if (dx > 12 || dy > 12) {
      hasDraggedRef.current = true;
    }
  };

  const handleSkillClick = (skill) => {
    if (hasDraggedRef.current) return;
    sound.playClick();
    if (onSelectSkill) {
      onSelectSkill(skill);
    }
  };

  const toggleViewMode = (mode) => {
    sound.playClick();
    setViewMode(mode);
  };

  const pillClass = isDarkMode 
    ? "bg-[#101014]/90 border-zinc-800 text-zinc-100 hover:border-amber-400 hover:bg-[#16161b]" 
    : "bg-white border-zinc-200 text-zinc-900 hover:border-amber-500 hover:bg-amber-50/50 hover:text-amber-700 shadow-2xs";

  const shadowClass = isDarkMode
    ? "shadow-lg shadow-black/40 hover:shadow-amber-500/10"
    : "shadow-xs hover:shadow-md hover:shadow-amber-200/50";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full py-2 sm:py-6 overflow-hidden relative z-10"
    >
      {/* Top Header with Mode Switcher */}
      <div className="flex items-center justify-between gap-2.5 mb-2 sm:mb-3 px-3">
        <div className="flex items-center space-x-2">
          <div className="p-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 dark:text-amber-400">
            <Sparkles size={13} />
          </div>
          <span className="text-xs uppercase font-mono tracking-wider font-bold text-zinc-800 dark:text-zinc-200">
            Core AI Engineering Matrix
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold">
            {SKILLS.length} Domains
          </span>
        </div>

        {/* View Switcher Controls (Desktop/Tablet Only) */}
        <div className={`hidden sm:flex items-center space-x-1.5 p-1 rounded-lg border backdrop-blur-md text-[11px] font-mono ${
          isDarkMode ? 'bg-[#101014]/90 border-zinc-800' : 'bg-zinc-100 border-zinc-200 shadow-2xs'
        }`}>
          <button
            onClick={() => toggleViewMode('bento')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              viewMode === 'bento'
                ? 'bg-amber-500 text-black font-bold shadow-sm'
                : isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-700 hover:text-zinc-900 hover:bg-white/80 font-medium'
            }`}
          >
            <LayoutGrid size={12} />
            <span>Bento Matrix</span>
          </button>
          <button
            onClick={() => toggleViewMode('ticker')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              viewMode === 'ticker'
                ? 'bg-amber-500 text-black font-bold shadow-sm'
                : isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-700 hover:text-zinc-900 hover:bg-white/80 font-medium'
            }`}
          >
            <Activity size={12} />
            <span>Ticker</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Infinite Marquee Strip */}
      <AnimatePresence mode="wait">
        {viewMode === 'ticker' ? (
          <motion.div
            key="ticker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            }}
          >
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
                    className={`flex items-center space-x-2 md:space-x-2.5 px-4 md:px-5 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-mono whitespace-nowrap select-none transition-all duration-200 border cursor-pointer active:scale-95 group ${pillClass} ${shadowClass}`}
                    title={`Click to inspect ${skill.name} architectural depth`}
                  >
                    <span className="text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                      {icon}
                    </span>
                    <span className="font-bold tracking-wide group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                      {skill.name}
                    </span>
                    <ArrowUpRight size={12} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-indigo-400" />
                  </div>
                );
              })}
            </InfiniteMarquee>
          </motion.div>
        ) : (
          /* Mode 2: Interactive Bento Grid Matrix */
          <motion.div
            key="bento"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 px-1"
          >
            {BENTO_SECTORS.map((sector) => {
              const sectorSkills = SKILLS.filter(s => sector.skillIds.includes(s.id));

              return (
                <div
                  key={sector.id}
                  className={`p-4 sm:p-5 rounded-2xl border backdrop-blur-xl transition-all duration-300 relative overflow-hidden group ${
                    isDarkMode 
                      ? `bg-[#101014]/90 ${sector.borderColor} shadow-xl hover:shadow-amber-500/10` 
                      : 'bg-white border-zinc-200 shadow-sm hover:shadow-md hover:border-amber-400'
                  }`}
                >
                  <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${sector.color} rounded-full blur-3xl pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity`} />

                  <div className="flex items-center space-x-2 mb-1.5">
                    <span className={`w-2 h-2 rounded-full ${sector.dotColor} animate-pulse`} />
                    <h3 className="text-xs sm:text-sm font-bold font-mono tracking-wide text-zinc-900 dark:text-zinc-100">
                      {sector.title}
                    </h3>
                  </div>

                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-sans mb-3.5 leading-relaxed font-medium">
                    {sector.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {sectorSkills.map((skill) => {
                      const icon = ICON_MAP[skill.iconName] || <Workflow size={14} />;
                      return (
                        <button
                          key={skill.id}
                          onClick={() => handleSkillClick(skill)}
                          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                            isDarkMode
                              ? 'bg-[#16161b] border-zinc-800 hover:border-amber-400 hover:bg-[#1e1e24] text-zinc-200'
                              : 'bg-zinc-50 border-zinc-200 hover:border-amber-400 hover:bg-amber-50/50 text-zinc-800 font-semibold shadow-2xs'
                          }`}
                        >
                          <span className="text-amber-500 dark:text-amber-400">{icon}</span>
                          <span>{skill.name}</span>
                          <span className="text-[10px] text-amber-500 dark:text-amber-400/80 font-bold">↗</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default SkillsTicker;