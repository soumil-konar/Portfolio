import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data';
import InfiniteMarquee from './InfiniteMarquee';
import SpotlightCard from './SpotlightCard';

const ProjectCarousel = ({ theme, isDarkMode }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="my-8 md:my-10 shrink-0 relative group"
    >
       <div className="mb-5 md:mb-6 px-2 opacity-60 text-[11px] md:text-xs uppercase tracking-widest font-bold">
          Featured Deployments
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
                whileHover={{}}
                whileTap={{ scale: 0.99 }}
                data-cursor-hover
                className={`w-72 md:w-80 lg:w-96 p-6 md:p-7 rounded-2xl cursor-pointer select-none backdrop-blur-xl transition-all duration-300 ${isDarkMode ? 'border' : ''} ${
                  isDarkMode 
                    ? 'bg-slate-800/40 border-slate-600/50 hover:border-indigo-400/70 hover:bg-slate-700/60 shadow-2xl hover:shadow-indigo-500/20' 
                    : 'bg-indigo-50/40 hover:bg-blue-50/60 shadow-lg hover:shadow-2xl hover:shadow-indigo-200/50'
                }`}
              >
                <div className={`mb-4 ${theme.accent} p-3 md:p-4 rounded-xl w-fit backdrop-blur-sm ${
                  isDarkMode ? 'bg-indigo-500/20' : 'bg-indigo-100/60'
                }`}>{proj.icon}</div>
                <h3 className="font-bold text-base md:text-lg mb-3">{proj.title}</h3>
                <p className="text-xs md:text-sm opacity-70 leading-relaxed font-sans pointer-events-none">{proj.desc}</p>
                
                <div className="mt-5 flex items-center space-x-2 opacity-50">
                   <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                   <span className="text-[10px] uppercase tracking-wider">Production</span>
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