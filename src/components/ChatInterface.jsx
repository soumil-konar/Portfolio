import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Command } from 'lucide-react'; // Added Command icon
import { SUGGESTED_QUESTIONS } from '../data';

const ChatInterface = ({ isDarkMode, theme }) => {
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  
  // Detect OS for correct key symbol (Cmd vs Ctrl)
  const [modifierKey, setModifierKey] = useState('Ctrl');
  useEffect(() => {
    if (navigator.platform.indexOf('Mac') > -1) {
      setModifierKey('⌘');
    }
  }, []);
  
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', text: "Hello! I am Soumil's virtual assistant. Ask me anything about his work in AI." }
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
    if (q.includes("Who")) return "Soumil is a Full Stack Engineer specialized in Backend Systems and AI.";
    if (q.includes("contact")) return "You can reach him via email or LinkedIn (links above).";
    if (q.includes("hobbies")) return "He enjoys Fantasy Premier League (FPL), Sci-Fi novels, and tech tinkering.";
    if (q.includes("RAG")) return "He builds Enterprise RAG systems using Vector DBs, customized chunking, and LLM orchestration.";
    return "I am not trained on that yet.";
  };

  return (
    <section className="flex-1 flex flex-col justify-end min-h-0 pb-4 group"> {/* Added 'group' for hover effect */}
      <div className={`w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl border flex flex-col h-full max-h-[400px] ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
        
        {/* Terminal Header */}
        <div className={`h-8 shrink-0 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'} flex items-center justify-between px-4`}>
          
          {/* Left: Window Controls */}
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
            <div className="ml-4 text-[10px] opacity-50 font-sans select-none">interactive_resume.sh</div>
          </div>

          {/* Right: Subtle Command Hint (The Easter Egg) */}
          <div className={`flex items-center space-x-1 text-[10px] font-mono transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-40 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            <Command size={10} />
            <span>{modifierKey} + K</span>
          </div>

        </div>

        {/* Chat Body */}
        <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
          {chatHistory.map((msg, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
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

        {/* Chips */}
        <div className={`p-3 border-t ${isDarkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-white'}`}>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => handleAsk(q)}
                disabled={isTyping}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all hover:-translate-y-0.5 ${
                  isDarkMode 
                    ? 'border-slate-700 hover:bg-indigo-900/30 text-indigo-300' 
                    : 'border-slate-200 hover:bg-indigo-50 text-indigo-600'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;