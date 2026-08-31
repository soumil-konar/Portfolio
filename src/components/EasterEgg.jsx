import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const EasterEgg = ({ isDarkMode }) => {
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
      className="fixed bottom-4 right-4 z-40 cursor-pointer group"
      onClick={handleDownload}
      title="Download System Log (Resume)"
    >
      <div className="relative p-2 rounded-full backdrop-blur-md bg-white/40 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-700/50 shadow-md">
        <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400 opacity-70 group-hover:opacity-100 transition-opacity" />
        <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
        </span>
      </div>
    </motion.div>
  );
};

export default EasterEgg;