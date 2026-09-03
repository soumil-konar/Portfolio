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
    color: 'from-indigo-500/20 via-purple-500/10 to-transparent',
    borderColor: 'border-indigo-500/30',
    dotColor: 'bg-indigo-400',
    skillIds: ['langgraph', 'semantic-kernel'],
  },
  {
    id: 'graphs-protocols',
    title: 'Tooling Protocols & Knowledge Graphs',
    subtitle: 'Anthropic MCP servers, Cypher pathfinding, Neo4j batch ETL',
    color: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    borderColor: 'border-cyan-500/30',
    dotColor: 'bg-cyan-400',
    skillIds: ['mcp', 'neo4j'],
  },
  {
    id: 'rag-vectors',
    title: 'Enterprise RAG & Hybrid Vector Search',
    subtitle: 'HNSW pgvector indexing, semantic chunking & cross-encoder re-ranking',
    color: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    borderColor: 'border-emerald-500/30',
    dotColor: 'bg-emerald-400',
    skillIds: ['vector-dbs', 'databases'],
  },
  {
    id: 'infra-runtime',
    title: 'Production AI Infrastructure & Backend',
    subtitle: 'FastAPI async streaming, Docker CI/CD, PyTorch & Linux automation',
    color: 'from-amber-500/20 via-orange-500/10 to-transparent',
    borderColor: 'border-amber-500/30',
    dotColor: 'bg-amber-400',
    skillIds: ['fastapi', 'python', 'ml-frameworks', 'devops', 'nodejs', 'linux', 'react'],
  }
];

const SkillsTicker = ({ isDarkMode, onSelectSkill }) => {
  const [viewMode, setViewMode] = useState('ticker'); // 'ticker' | 'bento'
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
    ? "bg-slate-900/90 border-slate-700 text-slate-100 hover:border-indigo-400 hover:bg-slate-800/95" 
    : "bg-white border-slate-200/90 text-slate-800 hover:border-indigo-400 hover:bg-indigo-50/50";

  const shadowClass = isDarkMode
    ? "shadow-lg shadow-black/20 hover:shadow-indigo-500/10"
    : "shadow-xs hover:shadow-md hover:shadow-indigo-200/50";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full py-4 sm:py-6 overflow-hidden relative z-10"
    >
      {/* Top Header with Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 mb-3 px-3">
        <div className="flex items-center space-x-2">
          <div className="p-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Sparkles size={13} />
          </div>
          <span className="text-xs uppercase font-mono tracking-wider font-bold text-slate-700 dark:text-slate-300">
            Core AI Engineering Matrix
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {SKILLS.length} Domains
          </span>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center space-x-1.5 p-1 rounded-lg border backdrop-blur-md bg-slate-900/30 border-slate-800 text-[11px] font-mono">
          <button
            onClick={() => toggleViewMode('ticker')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              viewMode === 'ticker'
                ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity size={12} />
            <span>Ticker</span>
          </button>
          <button
            onClick={() => toggleViewMode('bento')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              viewMode === 'bento'
                ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid size={12} />
            <span>Bento Matrix</span>
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
                      ? `bg-slate-900/80 ${sector.borderColor} shadow-xl hover:shadow-indigo-500/10` 
                      : 'bg-white/95 border-slate-200/90 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${sector.color} rounded-full blur-3xl pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity`} />

                  <div className="flex items-center space-x-2 mb-1.5">
                    <span className={`w-2 h-2 rounded-full ${sector.dotColor} animate-pulse`} />
                    <h3 className="text-xs sm:text-sm font-bold font-mono tracking-wide text-slate-900 dark:text-white">
                      {sector.title}
                    </h3>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans mb-3.5 leading-relaxed">
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
                              ? 'bg-slate-950/70 border-slate-800 hover:border-indigo-400 hover:bg-slate-800 text-slate-200'
                              : 'bg-slate-50 border-slate-200 hover:border-indigo-300 hover:bg-white text-slate-800'
                          }`}
                        >
                          <span className="text-indigo-400">{icon}</span>
                          <span>{skill.name}</span>
                          <span className="text-[10px] text-indigo-400/80">↗</span>
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