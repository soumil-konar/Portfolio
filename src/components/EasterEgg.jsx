import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const EasterEgg = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Soumil_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="hidden sm:block fixed bottom-6 right-6 z-40 cursor-pointer group select-none"
      onClick={handleDownload}
      title="Download System Log (Resume)"
      role="button"
      aria-label="Download Resume"
    >
      <div className="relative p-2.5 sm:p-2 rounded-full backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-700/80 shadow-lg hover:scale-110 active:scale-95 transition-transform flex items-center justify-center min-w-[42px] min-h-[42px]">
        <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400 opacity-80 group-hover:opacity-100 transition-opacity" />
        <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
        </span>
      </div>
    </motion.div>
  );
};

export default EasterEgg;