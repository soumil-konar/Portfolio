import React, { useState, useEffect } from 'react';
import { Globe, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const StatusFooter = () => {
  const [latency, setLatency] = useState(24);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => Math.max(10, Math.min(60, prev + (Math.random() > 0.5 ? 2 : -2))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`w-full py-3 md:py-2 px-3 sm:px-4 md:px-6 border-t flex justify-between items-center text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-300 font-semibold border-slate-200 dark:border-slate-800/80 mt-auto`}
    >
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="md:hidden">Online</span>
          <span className="hidden md:inline">Systems Operational</span>
        </div>
        <div className="flex items-center space-x-1 hidden md:flex">
          <Activity size={10} />
          <span>{latency}ms</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
         <div className="flex items-center space-x-1 hidden md:flex">
          <Globe size={10} />
          <span>ap-south-1 (Mumbai)</span>
        </div>
        <span className="font-mono">v2.6.0</span>
      </div>
    </motion.footer>
  );
};

export default StatusFooter;