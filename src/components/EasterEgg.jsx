import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const EasterEgg = ({ isDarkMode }) => {
  if (!isDarkMode) return null;

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
      className="fixed bottom-4 right-4 cursor-pointer group"
      onClick={handleDownload}
      title="Download System Log (Resume)"
    >
      <div className="relative">
        <FileText className="w-6 h-6 text-indigo-400 opacity-50 group-hover:opacity-100 transition-opacity" />
        <span className="absolute -top-1 -right-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
      </div>
    </motion.div>
  );
};

export default EasterEgg;