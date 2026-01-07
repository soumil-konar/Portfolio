import React, { useState, useEffect } from 'react';
import { Wifi, Globe, Activity } from 'lucide-react';

const StatusFooter = ({ theme }) => {
  const [latency, setLatency] = useState(24);

  // Simulate small latency fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => Math.max(10, Math.min(60, prev + (Math.random() > 0.5 ? 2 : -2))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className={`w-full py-2 px-6 border-t flex justify-between items-center text-[10px] uppercase tracking-widest opacity-60 ${theme.text} border-gray-200/20`}>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span>Systems Operational</span>
        </div>
        <div className="flex items-center space-x-1 hidden sm:flex">
          <Activity size={10} />
          <span>{latency}ms</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
         <div className="flex items-center space-x-1 hidden sm:flex">
          <Globe size={10} />
          <span>ap-south-1</span>
        </div>
        <span className="font-mono">v1.0.4</span>
      </div>
    </footer>
  );
};

export default StatusFooter;