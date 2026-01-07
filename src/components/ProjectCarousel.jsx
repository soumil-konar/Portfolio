import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data';

const ProjectCarousel = ({ theme }) => {
  return (
    <section className="my-6 shrink-0">
      <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide snap-x">
        {PROJECTS.map((proj) => (
          <motion.div 
            key={proj.id}
            whileHover={{ scale: 1.02 }}
            className={`snap-center shrink-0 w-60 p-4 rounded-xl ${theme.card} shadow-sm border border-transparent hover:border-indigo-200 transition-all`}
          >
            <div className={`mb-2 ${theme.accent}`}>{proj.icon}</div>
            <h3 className="font-bold text-sm mb-1">{proj.title}</h3>
            <p className="text-[10px] opacity-70 leading-relaxed">{proj.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectCarousel;