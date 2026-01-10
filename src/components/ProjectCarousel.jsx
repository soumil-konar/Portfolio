import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data';
import InfiniteMarquee from './InfiniteMarquee';

const ProjectCarousel = ({ theme, isDarkMode }) => {
  return (
    <section className="my-6 shrink-0 relative group">
       <div className="mb-4 px-2 opacity-50 text-[10px] uppercase tracking-widest font-bold">
          Featured Deployments
       </div>

      {/* Removed 'hover:pause-animation' because we now use drag-to-pause */}
      <div>
        {/* Speed 1.2 is good for reading project cards */}
        <InfiniteMarquee speed={1.2} direction="right">
          {PROJECTS.map((proj) => (
            <motion.div 
              key={proj.id}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }} // Add tactile feedback on touch
              className={`shrink-0 w-64 p-5 mx-4 rounded-xl ${theme.card} shadow-sm border border-transparent hover:border-indigo-200 transition-colors cursor-pointer select-none`}
            >
              <div className={`mb-3 ${theme.accent} p-2 bg-white/50 rounded-lg w-fit`}>{proj.icon}</div>
              <h3 className="font-bold text-sm mb-2">{proj.title}</h3>
              <p className="text-[11px] opacity-70 leading-relaxed font-sans pointer-events-none">{proj.desc}</p>
              
              <div className="mt-4 flex items-center space-x-1.5 opacity-50">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                 <span className="text-[9px] uppercase tracking-wider">Production</span>
              </div>
            </motion.div>
          ))}
        </InfiniteMarquee>
      </div>
    </section>
  );
};

export default ProjectCarousel;