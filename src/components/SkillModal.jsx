import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Workflow, 
  Brain, 
  Database, 
  Boxes, 
  Zap, 
  Code, 
  Cpu, 
  Layers, 
  Globe, 
  Server, 
  Terminal, 
  Network, 
  Lock, 
  CheckCircle2, 
  ChevronRight
} from 'lucide-react';

const ICON_MAP = {
  Workflow: <Workflow size={22} />,
  Brain: <Brain size={22} />,
  Network: <Network size={22} />,
  Boxes: <Boxes size={22} />,
  Zap: <Zap size={22} />,
  Database: <Database size={22} />,
  Code: <Code size={22} />,
  Cpu: <Cpu size={22} />,
  Layers: <Layers size={22} />,
  Globe: <Globe size={22} />,
  Server: <Server size={22} />,
  Terminal: <Terminal size={22} />,
};

const SkillModal = ({ skill, isOpen, onClose, onSelectProject, projects = [], isDarkMode }) => {
  const [mounted] = useState(() => typeof window !== 'undefined');

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

  if (!isOpen || !skill || !mounted) return null;

  const skillIcon = ICON_MAP[skill.iconName] || <Workflow size={22} />;

  const handleOpenProject = (fullProject) => {
    onClose();
    if (onSelectProject && fullProject) {
      setTimeout(() => {
        onSelectProject(fullProject);
      }, 150);
    }
  };

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-2.5 sm:p-4 md:p-6">
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
          className={`relative w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh] sm:max-h-[85vh] backdrop-blur-2xl ${
            isDarkMode 
              ? 'bg-[#101014]/98 border-zinc-800 text-zinc-100' 
              : 'bg-white border-zinc-200 shadow-2xl text-zinc-900'
          }`}
        >
          {/* Top Bar / Header */}
          <div className={`px-4 sm:px-6 py-3.5 sm:py-5 border-b flex items-center justify-between shrink-0 gap-3 ${
            isDarkMode ? 'border-zinc-800 bg-[#08080a]' : 'border-zinc-100 bg-zinc-50/60'
          }`}>
            <div className="flex items-center space-x-3 min-w-0">
              <div className={`p-2 sm:p-2.5 rounded-xl shadow-sm shrink-0 ${
                isDarkMode ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' : 'bg-amber-50 border border-amber-200 text-amber-700'
              }`}>
                {skillIcon}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-base sm:text-lg md:text-xl tracking-tight text-zinc-900 dark:text-white truncate">
                  {skill.name}
                </h3>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-0.5">
                  <span className="text-[10px] sm:text-[11px] font-mono font-semibold text-amber-600 dark:text-amber-400">
                    {skill.category}
                  </span>
                  <span className="text-zinc-400 dark:text-zinc-600 text-xs">•</span>
                  <span className={`text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-md border font-medium ${
                    isDarkMode 
                      ? 'bg-[#16161b] border-zinc-800 text-zinc-300' 
                      : 'bg-zinc-100 border-zinc-200 text-zinc-700'
                  }`}>
                    {skill.experience}
                  </span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className={`p-1.5 sm:p-2 rounded-xl border transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center shrink-0 ${
                isDarkMode 
                  ? 'border-zinc-800 hover:bg-[#16161b] text-zinc-300 hover:text-white' 
                  : 'border-zinc-200 hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900'
              }`}
              title="Close (Esc)"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 flex-1">
            {/* Overview / Depth Card */}
            <div className={`p-3.5 sm:p-4 rounded-xl border leading-relaxed text-xs md:text-sm font-sans ${
              isDarkMode 
                ? 'bg-[#08080a] border-zinc-800 text-zinc-200 font-medium' 
                : 'bg-amber-50/60 border-amber-200/60 text-zinc-800 font-medium'
            }`}>
              <span className="font-bold uppercase tracking-wider text-[10px] font-mono block mb-1 text-amber-600 dark:text-amber-400">
                Technical Depth & Engineering Application:
              </span>
              {skill.overview}
            </div>

            {/* Key Capabilities */}
            {skill.capabilities && skill.capabilities.length > 0 && (
              <div className="space-y-2 sm:space-y-2.5">
                <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  <span>Key Patterns & Implementation Strengths:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {skill.capabilities.map((cap, i) => (
                    <div
                      key={i}
                      className={`px-3 py-2 rounded-lg border text-xs font-mono flex items-center space-x-2 ${
                        isDarkMode
                          ? 'bg-[#16161b] border-zinc-800 text-zinc-200'
                          : 'bg-zinc-50 border-zinc-200 text-zinc-800 font-medium'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span className="truncate">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Projects Section */}
            {skill.relatedProjects && skill.relatedProjects.length > 0 && (
              <div className="space-y-2.5 sm:space-y-3">
                <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-zinc-700 dark:text-zinc-300 flex items-center space-x-1.5">
                  <Workflow size={13} className="text-amber-500" />
                  <span>Deployed In These Portfolio Systems ({skill.relatedProjects.length}):</span>
                </h4>

                <div className="space-y-2.5 sm:space-y-3">
                  {skill.relatedProjects.map((item, idx) => {
                    const fullProject = projects.find(p => p.id === item.projectId);
                    if (!fullProject) return null;

                    return (
                      <div
                        key={idx}
                        className={`p-3.5 sm:p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between gap-3 ${
                          isDarkMode
                            ? 'bg-[#08080a] border-zinc-800 hover:border-amber-400/80 shadow-md'
                            : 'bg-white border-zinc-200 hover:border-amber-400 shadow-xs'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <div className="flex items-center space-x-2 flex-wrap gap-1">
                              <span className="font-bold text-sm text-zinc-900 dark:text-white">
                                {fullProject.title}
                              </span>
                              {fullProject.isEnterprise ? (
                                <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono border flex items-center space-x-1 ${
                                  isDarkMode ? 'bg-[#16161b] border-zinc-800 text-zinc-300' : 'bg-zinc-100 border-zinc-200 text-zinc-700 font-medium'
                                }`}>
                                  <Lock size={8} />
                                  <span>Enterprise</span>
                                </span>
                              ) : (
                                <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono border flex items-center space-x-1 ${
                                  isDarkMode ? 'bg-amber-500/15 border-amber-500/30 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800 font-medium'
                                }`}>
                                  <Sparkles size={8} />
                                  <span>Open Source</span>
                                </span>
                              )}
                            </div>
                          </div>

                          <p className="text-xs font-sans leading-relaxed text-zinc-700 dark:text-zinc-300 mt-1">
                            {item.usage}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-zinc-200/50 dark:border-zinc-800/80 gap-2">
                          <div className="flex flex-wrap gap-1">
                            {fullProject.tags && fullProject.tags.slice(0, 3).map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                                  isDarkMode ? 'bg-[#16161b] border-zinc-800 text-zinc-400' : 'bg-zinc-50 border-zinc-200 text-zinc-600'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <button
                            onClick={() => handleOpenProject(fullProject)}
                            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg border text-xs font-mono font-medium transition-all self-start sm:self-auto cursor-pointer ${
                              isDarkMode
                                ? 'bg-amber-500/15 border-amber-500/30 text-amber-300 hover:bg-amber-500/25 hover:text-white'
                                : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100 shadow-2xs'
                            }`}
                          >
                            <span>Inspect System</span>
                            <ChevronRight size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className={`px-4 sm:px-6 py-3 sm:py-3.5 border-t flex items-center justify-between shrink-0 ${
            isDarkMode ? 'border-slate-800 bg-slate-950/80' : 'border-slate-100 bg-slate-50/50'
          }`}>
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium">
              Click any project tile to view its full architectural diagram & metrics
            </span>
            <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
              Press <kbd className="px-1.5 py-0.5 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold">ESC</kbd> to exit
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default SkillModal;
