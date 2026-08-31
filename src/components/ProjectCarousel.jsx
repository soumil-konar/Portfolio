import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Lock } from 'lucide-react';
import { PROJECTS } from '../data';
import InfiniteMarquee from './InfiniteMarquee';
import SpotlightCard from './SpotlightCard';

const ProjectCarousel = ({ theme, isDarkMode }) => {
  const handleCardClick = (proj) => {
    if (proj.github) {
      window.open(proj.github, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="my-8 md:my-10 shrink-0 relative group"
    >
       <div className="mb-5 md:mb-6 px-2 opacity-60 text-[11px] md:text-xs uppercase tracking-widest font-bold">
          Featured Deployments & Open Source
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
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCardClick(proj)}
                data-cursor-hover
                className={`w-80 md:w-96 p-6 md:p-7 rounded-2xl cursor-pointer select-none backdrop-blur-xl transition-all duration-300 flex flex-col justify-between h-[320px] md:h-[340px] ${isDarkMode ? 'border' : ''} ${
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

                    {proj.github ? (
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
                    ) : (
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

                  <h3 className="font-bold text-base md:text-lg mb-2 line-clamp-1 group-hover:text-indigo-400 transition-colors">
                    {proj.title}
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
                  
                  <div className="flex items-center space-x-2 opacity-50 pt-1">
                     <div className={`w-2 h-2 rounded-full ${proj.github ? 'bg-indigo-400' : 'bg-emerald-500'}`} />
                     <span className="text-[10px] uppercase tracking-wider">
                       {proj.github ? 'Open Source' : 'Production Platform'}
                     </span>
                  </div>
                </div>
              </motion.div>
            </SpotlightCard>
          ))}
        </InfiniteMarquee>
      </div>
    </motion.section>
  );
};

export default ProjectCarousel;