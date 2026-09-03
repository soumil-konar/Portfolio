// src/components/ProjectCarousel.jsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Lock, Sparkles, ChevronRight, Activity, LayoutGrid, Layers, Filter } from 'lucide-react';
import { PROJECTS } from '../data';
import InfiniteMarquee from './InfiniteMarquee';
import SpotlightCard from './SpotlightCard';
import ProjectModal from './ProjectModal';
import { sound } from '../utils/audio';

const ProjectCarousel = ({ theme, isDarkMode, selectedProject: propSelectedProject, onSelectProject }) => {
  const [internalSelectedProject, setInternalSelectedProject] = useState(null);
  const selectedProject = propSelectedProject !== undefined ? propSelectedProject : internalSelectedProject;
  const setSelectedProject = onSelectProject || setInternalSelectedProject;

  const [viewMode, setViewMode] = useState('track'); // 'track' | 'grid'
  const [filterCategory, setFilterCategory] = useState('all'); // 'all' | 'enterprise' | 'opensource'

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

  const handleCardClick = (proj) => {
    if (hasDraggedRef.current) return;
    sound.playClick();
    setSelectedProject(proj);
  };

  const filteredProjects = PROJECTS.filter((proj) => {
    if (filterCategory === 'enterprise') return proj.isEnterprise;
    if (filterCategory === 'opensource') return !!proj.github;
    return true;
  });

  const enterpriseCount = PROJECTS.filter(p => p.isEnterprise).length;
  const openSourceCount = PROJECTS.filter(p => p.github).length;

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="my-5 sm:my-8 md:my-10 shrink-0 relative group select-none"
      >
        {/* Top Controls Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 sm:mb-5 px-3">
          <div>
            <div className="flex items-center space-x-2">
              <div className="p-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Layers size={13} />
              </div>
              <span className="text-xs uppercase tracking-wider font-bold font-mono text-slate-800 dark:text-slate-200">
                Featured Deployments & AI Architectures
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5 hidden sm:block">
              Inspect multi-agent workflows, dual MCP gateways & enterprise RAG pipelines
            </p>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end">
            {/* Filter Pills */}
            <div className="flex items-center space-x-1 p-1 rounded-lg border backdrop-blur-md bg-slate-900/30 border-slate-800 text-[10px] font-mono">
              <button
                onClick={() => { sound.playClick(); setFilterCategory('all'); }}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  filterCategory === 'all'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({PROJECTS.length})
              </button>
              <button
                onClick={() => { sound.playClick(); setFilterCategory('enterprise'); }}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  filterCategory === 'enterprise'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Enterprise ({enterpriseCount})
              </button>
              <button
                onClick={() => { sound.playClick(); setFilterCategory('opensource'); }}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  filterCategory === 'opensource'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                OSS ({openSourceCount})
              </button>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center space-x-1 p-1 rounded-lg border backdrop-blur-md bg-slate-900/30 border-slate-800 text-[11px] font-mono">
              <button
                onClick={() => { sound.playClick(); setViewMode('track'); }}
                title="Continuous Showcase Track"
                className={`p-1 rounded transition-all cursor-pointer ${
                  viewMode === 'track'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Activity size={13} />
              </button>
              <button
                onClick={() => { sound.playClick(); setViewMode('grid'); }}
                title="Architectural Grid View"
                className={`p-1 rounded transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* View Mode 1: Marquee Track */}
        <AnimatePresence mode="wait">
          {viewMode === 'track' ? (
            <motion.div
              key="track"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
              }}
            >
              <InfiniteMarquee speed={1.0} direction="right">
                {filteredProjects.map((proj) => (
                  <SpotlightCard key={proj.id} className="group shrink-0 mx-1.5 sm:mx-2 md:mx-3">
                    <motion.div 
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onPointerDown={handlePointerDown}
                      onPointerMove={handlePointerMove}
                      onClick={() => handleCardClick(proj)}
                      data-cursor-hover
                      className={`w-[82vw] max-w-[340px] sm:w-[380px] md:w-[410px] lg:w-[430px] p-4 sm:p-6 md:p-7 rounded-2xl cursor-pointer select-none backdrop-blur-xl transition-all duration-300 flex flex-col justify-between min-h-[310px] sm:min-h-[330px] md:h-[350px] border ${
                        isDarkMode 
                          ? 'bg-slate-900/90 border-slate-700/90 hover:border-indigo-400 hover:bg-slate-800/95 shadow-2xl hover:shadow-indigo-500/20 text-slate-100' 
                          : 'bg-white/95 border-slate-200/90 hover:border-indigo-400 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(99,102,241,0.12)] text-slate-900'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 rounded-xl backdrop-blur-sm ${
                            isDarkMode ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-indigo-50 border border-indigo-100 text-indigo-600'
                          }`}>
                            {proj.icon}
                          </div>

                          <div className="flex items-center space-x-2">
                            {proj.github && (
                              <a 
                                href={proj.github} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                onClick={(e) => e.stopPropagation()}
                                className={`p-1.5 px-2.5 rounded-lg border transition-all duration-200 flex items-center space-x-1.5 text-[11px] font-mono group/btn ${
                                  isDarkMode 
                                    ? 'bg-slate-800 border-slate-700 hover:border-indigo-400 hover:text-white text-slate-200' 
                                    : 'bg-slate-50 border-slate-200 hover:border-indigo-500 hover:text-indigo-600 text-slate-800 shadow-2xs'
                                }`}
                                title="View Source on GitHub"
                              >
                                <Github size={13} />
                                <span className="font-semibold">GitHub</span>
                                <ExternalLink size={10} className="opacity-70 group-hover/btn:translate-x-0.5 transition-transform" />
                              </a>
                            )}

                            {proj.isEnterprise && (
                              <div 
                                className={`px-2 py-1 rounded-md border flex items-center space-x-1 text-[10px] font-mono ${
                                  isDarkMode 
                                    ? 'bg-slate-800 border-slate-700 text-slate-300 font-medium' 
                                    : 'bg-slate-100 border-slate-200 text-slate-700 font-medium'
                                }`}
                              >
                                <Lock size={10} />
                                <span>Enterprise</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <h3 className="font-bold text-base md:text-lg mb-2 line-clamp-1 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors flex items-center justify-between">
                          <span>{proj.title}</span>
                          <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-indigo-600 dark:text-indigo-400 shrink-0 ml-1" />
                        </h3>
                        <p className="text-xs md:text-sm leading-relaxed font-sans pointer-events-none line-clamp-3 mb-3 text-slate-600 dark:text-slate-200">
                          {proj.desc}
                        </p>
                      </div>
                      
                      <div>
                        {proj.tags && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {proj.tags.map((tag, i) => (
                              <span 
                                key={i} 
                                className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                                  isDarkMode 
                                    ? 'bg-slate-800 border-slate-700 text-indigo-300 font-medium' 
                                    : 'bg-indigo-50 border-indigo-100 text-indigo-700 font-medium'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between pt-1 text-[10px] text-slate-600 dark:text-slate-300">
                           <div className="flex items-center space-x-1.5 font-medium">
                             <div className={`w-2 h-2 rounded-full ${proj.github ? 'bg-indigo-500' : 'bg-emerald-500'}`} />
                             <span className="uppercase tracking-wider font-semibold">
                               {proj.github ? 'Open Source' : 'Production Platform'}
                             </span>
                           </div>

                           <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold group-hover:underline">
                             Case Study ↗
                           </span>
                        </div>
                      </div>
                    </motion.div>
                  </SpotlightCard>
                ))}
              </InfiniteMarquee>
            </motion.div>
          ) : (
            /* View Mode 2: Architectural Grid */
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-2"
            >
              {filteredProjects.map((proj) => (
                <SpotlightCard key={proj.id} className="group">
                  <motion.div
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCardClick(proj)}
                    className={`p-5 rounded-2xl cursor-pointer select-none backdrop-blur-xl transition-all duration-300 flex flex-col justify-between min-h-[320px] border ${
                      isDarkMode 
                        ? 'bg-slate-900/90 border-slate-700/90 hover:border-indigo-400 hover:bg-slate-800/95 shadow-xl hover:shadow-indigo-500/20 text-slate-100' 
                        : 'bg-white/95 border-slate-200/90 hover:border-indigo-400 shadow-sm hover:shadow-md text-slate-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-2.5 rounded-xl ${
                          isDarkMode ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-indigo-50 border border-indigo-100 text-indigo-600'
                        }`}>
                          {proj.icon}
                        </div>

                        <div className="flex items-center space-x-1.5">
                          {proj.isEnterprise && (
                            <div className="px-2 py-0.5 rounded text-[10px] font-mono border bg-slate-800 border-slate-700 text-slate-300">
                              Enterprise
                            </div>
                          )}
                          {proj.github && (
                            <a
                              href={proj.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white"
                            >
                              <Github size={12} />
                            </a>
                          )}
                        </div>
                      </div>

                      <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white group-hover:text-indigo-400 transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-xs leading-relaxed font-sans line-clamp-3 mb-3 text-slate-600 dark:text-slate-300">
                        {proj.desc}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {proj.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded border border-slate-800 bg-slate-950/50 text-indigo-300">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] font-mono text-indigo-400">
                        <span>Inspect Architecture</span>
                        <span>↗</span>
                      </div>
                    </div>
                  </motion.div>
                </SpotlightCard>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* Case Study Modal with Live Trace Playground */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        isDarkMode={isDarkMode}
        theme={theme}
      />
    </>
  );
};

export default ProjectCarousel;