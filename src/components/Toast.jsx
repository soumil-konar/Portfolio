// src/components/Toast.jsx
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, Sparkles, X } from 'lucide-react';
import { ToastContext } from '../context/ToastContext';

export const ToastProvider = ({ children, isDarkMode }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ message, type = 'success', duration = 3200 }) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
      case 'info':
        return <Info className="w-4 h-4 text-cyan-400 shrink-0" />;
      case 'sparkle':
        return <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />;
      default:
        return <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />;
    }
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[999999] flex flex-col gap-2 pointer-events-none max-w-sm w-[90vw]">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl font-mono text-xs select-none transition-all ${
                isDarkMode
                  ? 'bg-slate-900/95 border-slate-700/90 text-slate-100 shadow-indigo-950/40'
                  : 'bg-white/95 border-slate-200/90 text-slate-800 shadow-slate-300/40'
              }`}
            >
              {getIcon(toast.type)}
              <span className="flex-1 font-medium leading-tight">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="opacity-50 hover:opacity-100 p-0.5 transition-opacity"
              >
                <X size={12} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
