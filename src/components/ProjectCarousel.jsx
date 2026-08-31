import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Lock, Sparkles, ChevronRight } from 'lucide-react';
import { PROJECTS } from '../data';
import InfiniteMarquee from './InfiniteMarquee';
import SpotlightCard from './SpotlightCard';
import ProjectModal from './ProjectModal';

const ProjectCarousel = ({ theme, isDarkMode }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const pointerStartRef = React.useRef({ x: 0, y: 0 });
  const hasDraggedRef = React.useRef(false);

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

  const handleCardClick = (proj) => {
    // If user dragged to scroll, ignore click
    if (hasDraggedRef.current) return;
    setSelectedProject(proj);
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="my-8 md:my-10 shrink-0 relative group"
      >
        <div className="flex items-center justify-between mb-5 md:mb-6 px-2">
          <div className="opacity-60 text-[11px] md:text-xs uppercase tracking-widest font-bold font-mono">
            Featured Deployments & Open Source
          </div>
          <div className="text-[10px] font-mono opacity-50 hidden sm:inline">
            Click tile to inspect architecture ↗
          </div>
        </div>

        {/* CSS mask with smoother fade for seamless blending */}
        <div 
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          }}
        >
          {/* Speed 1.0 is better for larger cards */}
          <InfiniteMarquee speed={1.0} direction="right">
            {PROJECTS.map((proj) => (
              <SpotlightCard key={proj.id} className="group shrink-0 mx-2 md:mx-4">
                <motion.div 
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onClick={() => handleCardClick(proj)}
                  data-cursor-hover
                  className={`w-80 md:w-96 p-6 md:p-7 rounded-2xl cursor-pointer select-none backdrop-blur-xl transition-all duration-300 flex flex-col justify-between h-[325px] md:h-[345px] ${isDarkMode ? 'border' : ''} ${
                    isDarkMode 
                      ? 'bg-slate-800/40 border-slate-600/50 hover:border-indigo-400/80 hover:bg-slate-700/60 shadow-2xl hover:shadow-indigo-500/20' 
                      : 'bg-indigo-50/40 hover:bg-blue-50/70 shadow-lg hover:shadow-2xl hover:shadow-indigo-200/60'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`${theme.accent} p-3 rounded-xl backdrop-blur-sm ${
                        isDarkMode ? 'bg-indigo-500/20' : 'bg-indigo-100/60'
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
                                ? 'bg-slate-900/70 border-slate-700 hover:border-indigo-400 hover:text-indigo-300 text-slate-300' 
                                : 'bg-white/90 border-indigo-200 hover:border-indigo-500 hover:text-indigo-600 text-slate-700 shadow-sm'
                            }`}
                            title="View Source on GitHub"
                          >
                            <Github size={13} />
                            <span className="font-semibold">GitHub</span>
                            <ExternalLink size={10} className="opacity-60 group-hover/btn:translate-x-0.5 transition-transform" />
                          </a>
                        )}

                        {proj.isEnterprise && (
                          <div 
                            className={`px-2 py-1 rounded-md border flex items-center space-x-1 text-[10px] font-mono opacity-60 ${
                              isDarkMode 
                                ? 'bg-slate-900/50 border-slate-800 text-slate-400' 
                                : 'bg-indigo-100/50 border-indigo-200/50 text-slate-600'
                            }`}
                          >
                            <Lock size={10} />
                            <span>Enterprise</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <h3 className="font-bold text-base md:text-lg mb-2 line-clamp-1 group-hover:text-indigo-400 transition-colors flex items-center justify-between">
                      <span>{proj.title}</span>
                      <ChevronRight size={16} className="opacity-0 group-hover:opacity-80 -translate-x-2 group-hover:translate-x-0 transition-all text-indigo-400 shrink-0 ml-1" />
                    </h3>
                    <p className="text-xs md:text-sm opacity-70 leading-relaxed font-sans pointer-events-none line-clamp-3 mb-3">
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
                                ? 'bg-slate-900/60 border-slate-700 text-indigo-300' 
                                : 'bg-indigo-100/50 border-indigo-200/60 text-indigo-700'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between opacity-50 pt-1 text-[10px]">
                       <div className="flex items-center space-x-1.5">
                         <div className={`w-2 h-2 rounded-full ${proj.github ? 'bg-indigo-400' : 'bg-emerald-500'}`} />
                         <span className="uppercase tracking-wider">
                           {proj.github ? 'Open Source' : 'Production Platform'}
                         </span>
                       </div>

                       <span className="font-mono text-indigo-400 group-hover:opacity-100 opacity-60">
                         Case Study ↗
                       </span>
                    </div>
                  </div>
                </motion.div>
              </SpotlightCard>
            ))}
          </InfiniteMarquee>
        </div>
      </motion.section>

      {/* Case Study Modal */}
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