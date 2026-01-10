import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data';
import InfiniteMarquee from './InfiniteMarquee';

const ProjectCarousel = ({ theme, isDarkMode }) => {
  return (
    <section className="my-8 md:my-10 shrink-0 relative group">
       <div className="mb-5 md:mb-6 px-2 opacity-60 text-[11px] md:text-xs uppercase tracking-widest font-bold">
          Featured Deployments
       </div>

      {/* CSS mask for seamless fade that works with gradient mesh background */}
      <div 
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)',
        }}
      >
        {/* Speed 1.0 is better for larger cards */}
        <InfiniteMarquee speed={1.0} direction="right">
          {PROJECTS.map((proj) => (
            <motion.div 
              key={proj.id}
              whileHover={{ scale: 1.05, y: -6 }}
              whileTap={{ scale: 0.98 }}
              className={`shrink-0 w-72 md:w-80 lg:w-96 p-6 md:p-7 mx-2 md:mx-4 rounded-2xl shadow-2xl cursor-pointer select-none backdrop-blur-xl border transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-slate-800/40 border-slate-600/50 hover:border-indigo-400/60 hover:bg-slate-700/50' 
                  : 'bg-white/40 border-slate-200/60 hover:border-indigo-300/70 hover:bg-white/60'
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
          ))}
        </InfiniteMarquee>
      </div>
    </section>
  );
};

export default ProjectCarousel;