import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Command } from 'lucide-react'; 
import { SUGGESTED_QUESTIONS, SOCIAL_LINKS } from '../data'; 

const ChatInterface = ({ isDarkMode, theme }) => {
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  
  // --- FIX: Track first render to prevent auto-scrolling on load ---
  const isFirstRender = useRef(true);
  
  const [modifierKey, setModifierKey] = useState('Ctrl');
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.platform.indexOf('Mac') > -1) setModifierKey('⌘');
  }, []);
  
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', text: "Hello! I am Soumil's virtual assistant. Ask me anything about his work in AI." }
  ]);

  // --- UPDATED USE EFFECT ---
  useEffect(() => { 
    // If it's the first time the page loads, DO NOT scroll.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Otherwise (new messages), scroll to bottom gently
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }); 
  }, [chatHistory, isTyping]);


  const handleAsk = (question) => {
    setChatHistory(prev => [...prev, { type: 'user', text: question }]);
    setIsTyping(true);
    
    setTimeout(() => {
      let answer = getAnswer(question);
      setChatHistory(prev => [...prev, { type: 'bot', text: answer }]);
      setIsTyping(false);
    }, 1000);
  };

  const getAnswer = (q) => {
    const linkStyle = "underline font-bold hover:text-indigo-500 transition-colors";

    if (q.includes("Who")) return "Soumil is a Full Stack Engineer specialized in Backend Systems and AI.";
    
    if (q.includes("contact")) {
      return (
        <span>
          You can reach him via{' '}
          <a href={SOCIAL_LINKS.email} className={linkStyle}>Email</a>
          {' '}or connect on{' '}
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className={linkStyle}>LinkedIn</a>.
        </span>
      );
    }

    if (q.includes("hobbies")) return "He enjoys Fantasy Premier League (FPL), Sci-Fi novels, and tech tinkering.";
    if (q.includes("RAG")) return "He builds Enterprise RAG systems using Vector DBs, customized chunking, and LLM orchestration.";
    
    return "I am not trained on that yet.";
  };

  return (
    <section className="flex-1 flex flex-col justify-end min-h-0 pb-4 group">
      <div className={`w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl border flex flex-col h-full max-h-[350px] md:max-h-[400px] backdrop-blur-xl ${
        isDarkMode 
          ? 'bg-slate-800/40 border-slate-600/50' 
          : 'bg-white/50 border-slate-200/60'
      }`}>
        
        {/* Terminal Header */}
        <div className={`h-8 shrink-0 flex items-center justify-between px-4 backdrop-blur-md ${
          isDarkMode ? 'bg-slate-800/60 border-b border-slate-700/50' : 'bg-slate-100/60 border-b border-slate-200/50'
        }`}>
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
            <div className="ml-4 text-[10px] opacity-50 font-sans select-none">
              <span className="hidden md:inline">interactive_resume.sh</span>
              <span className="md:hidden">term.sh</span>
            </div>
          </div>
          <div className={`hidden md:flex items-center space-x-1 text-[10px] font-mono transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-40 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            <Command size={10} />
            <span>{modifierKey} + K</span>
          </div>
        </div>

        {/* Chat Body */}
        <div className={`flex-1 overflow-y-auto p-4 space-y-4 backdrop-blur-sm ${
          isDarkMode ? 'bg-slate-900/30' : 'bg-white/30'
        }`}>
          {chatHistory.map((msg, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-end gap-2 max-w-[80%]`}>
                {msg.type === 'bot' && <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center shrink-0"><Terminal size={14} className="text-white"/></div>}
                <div className={`rounded-lg px-4 py-2 text-sm shadow-sm ${msg.type === 'user' ? theme.chatUser : theme.chatBot}`}>
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
             <div className="flex items-center gap-2">
                 <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center"><Terminal size={14} className="text-white"/></div>
                 <div className={`${theme.chatBot} rounded-lg px-4 py-3 flex space-x-1`}>
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce delay-200"></div>
                 </div>
             </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className={`p-3 border-t backdrop-blur-md ${
          isDarkMode 
            ? 'border-slate-700/50 bg-slate-900/40' 
            : 'border-slate-200/50 bg-white/40'
        }`}>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((q, i) => (
              <button key={i} onClick={() => handleAsk(q)} disabled={isTyping} className={`text-xs px-3 py-1.5 rounded-full border transition-all hover:-translate-y-0.5 ${isDarkMode ? 'border-slate-700 hover:bg-indigo-900/30 text-indigo-300' : 'border-slate-200 hover:bg-indigo-50 text-indigo-600'}`}>{q}</button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default ChatInterface;