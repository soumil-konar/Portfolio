import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Github, 
  ExternalLink, 
  Lock, 
  Workflow, 
  CheckCircle2, 
  Activity, 
  Layers, 
  Cpu, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const ProjectModal = ({ project, isOpen, onClose, isDarkMode, theme }) => {
  const [activeTab, setActiveTab] = useState('architecture'); // 'architecture' | 'highlights' | 'metrics'
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project || !mounted) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          className={`relative w-full max-w-3xl rounded-2xl border shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh] backdrop-blur-2xl ${
            isDarkMode 
              ? 'bg-slate-900/95 border-slate-700/80 text-slate-100' 
              : 'bg-white border-slate-200 shadow-2xl text-slate-900'
          }`}
        >
          {/* Top Bar / Header */}
          <div className={`px-6 py-5 border-b flex items-center justify-between shrink-0 ${
            isDarkMode ? 'border-slate-800 bg-slate-950/80' : 'border-slate-100 bg-slate-50/60'
          }`}>
            <div className="flex items-center space-x-3.5">
              <div className={`p-2.5 rounded-xl ${
                isDarkMode ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-indigo-50 border border-indigo-100 text-indigo-600'
              }`}>
                {project.icon}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-lg md:text-xl tracking-tight text-slate-900 dark:text-white">{project.title}</h3>
                </div>
                <div className="flex items-center space-x-2 mt-0.5">
                  {project.github ? (
                    <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold flex items-center space-x-1">
                      <Sparkles size={11} />
                      <span>Open Source System</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono font-medium text-slate-600 dark:text-slate-300 flex items-center space-x-1">
                      <Lock size={10} />
                      <span>Enterprise Production System</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action buttons & Close */}
            <div className="flex items-center space-x-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 px-3 rounded-lg border text-xs font-mono flex items-center space-x-1.5 transition-all shadow-xs font-semibold ${
                    isDarkMode
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-400'
                      : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900'
                  }`}
                >
                  <Github size={13} />
                  <span>GitHub</span>
                  <ExternalLink size={10} />
                </a>
              )}
              <button
                onClick={onClose}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  isDarkMode 
                    ? 'border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white' 
                    : 'border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
                title="Close (Esc)"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className={`px-6 pt-3 flex space-x-6 border-b text-xs font-mono shrink-0 ${
            isDarkMode ? 'border-slate-800 bg-slate-950/40' : 'border-slate-100 bg-slate-50/30'
          }`}>
            {[
              { id: 'architecture', label: 'Architecture & Flow', icon: <Workflow size={13} /> },
              { id: 'highlights', label: 'Key Highlights', icon: <CheckCircle2 size={13} /> },
              { id: 'metrics', label: 'Impact & Stats', icon: <Activity size={13} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 pb-2.5 border-b-2 transition-all cursor-pointer font-semibold ${
                  activeTab === tab.id
                    ? isDarkMode ? 'border-indigo-400 text-indigo-300' : 'border-indigo-600 text-indigo-700'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Scrollable Content Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {/* Problem Statement Card */}
            {project.problem && (
              <div className={`p-4 rounded-xl border leading-relaxed text-xs md:text-sm font-sans ${
                isDarkMode 
                  ? 'bg-slate-950/80 border-slate-700/80 text-slate-200 font-medium' 
                  : 'bg-indigo-50/70 border-indigo-100 text-slate-800 font-medium'
              }`}>
                <span className="font-bold uppercase tracking-wider text-[10px] font-mono block mb-1.5 text-indigo-600 dark:text-indigo-400">
                  Engineering Challenge / Problem Statement:
                </span>
                {project.problem}
              </div>
            )}

            {/* TAB 1: ARCHITECTURE FLOW */}
            {activeTab === 'architecture' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                  <Workflow size={13} />
                  <span>Pipeline Execution Flow:</span>
                </h4>

                {project.architecture && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.architecture.map((node, i) => (
                      <div
                        key={i}
                        className={`p-3.5 rounded-xl border transition-all ${
                          isDarkMode
                            ? 'bg-slate-950/80 border-slate-700/80 hover:border-indigo-400/80 text-slate-200'
                            : 'bg-slate-50 border-slate-200 shadow-2xs hover:border-indigo-300 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-xs mb-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                          <span>{node.step}</span>
                        </div>
                        <p className="text-xs font-sans leading-relaxed text-slate-700 dark:text-slate-200">{node.detail}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 2: HIGHLIGHTS */}
            {activeTab === 'highlights' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                  <CheckCircle2 size={13} />
                  <span>Technical Accomplishments:</span>
                </h4>

                {project.highlights && (
                  <div className="space-y-2.5">
                    {project.highlights.map((item, i) => (
                      <div
                        key={i}
                        className={`flex items-start space-x-3 p-3 rounded-xl border ${
                          isDarkMode ? 'bg-slate-950/70 border-slate-700/80 text-slate-100 font-medium' : 'bg-slate-50 border-slate-200 shadow-2xs text-slate-800 font-medium'
                        }`}
                      >
                        <ShieldCheck size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-xs md:text-sm font-sans leading-relaxed text-slate-800 dark:text-slate-100">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 3: METRICS */}
            {activeTab === 'metrics' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                  <Activity size={13} />
                  <span>Telemetry & Measurable Outcomes:</span>
                </h4>

                {project.metrics && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {project.metrics.map((metric, i) => (
                      <div
                        key={i}
                        className={`p-4 rounded-xl border text-center flex flex-col justify-center ${
                          isDarkMode
                            ? 'bg-slate-950/80 border-slate-700/80 shadow-md'
                            : 'bg-indigo-50/60 border-indigo-100 shadow-2xs'
                        }`}
                      >
                        <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-600 dark:text-slate-300 block mb-1">
                          {metric.label}
                        </span>
                        <span className="font-mono font-bold text-sm md:text-base text-indigo-600 dark:text-indigo-400">
                          {metric.val}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Footer Bar with Tech Tags */}
          <div className={`px-6 py-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 ${
            isDarkMode ? 'border-slate-800 bg-slate-950/80' : 'border-slate-100 bg-slate-50/50'
          }`}>
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase mr-1">Stack:</span>
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-indigo-300 font-medium'
                      : 'bg-indigo-50 border-indigo-100 text-indigo-700 font-medium'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 self-end sm:self-auto font-medium">
              Press <kbd className="px-1.5 py-0.5 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold">ESC</kbd> to exit
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default ProjectModal;
