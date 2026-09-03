import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Command } from 'lucide-react'; 
import { SUGGESTED_QUESTIONS, SOCIAL_LINKS } from '../data'; 

const ChatInterface = ({ isDarkMode, theme }) => {
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  
  // --- FIX: Track first render to prevent auto-scrolling on load ---
  const isFirstRender = useRef(true);
  
  const [modifierKey] = useState(() => {
    if (typeof navigator !== 'undefined' && navigator.platform.indexOf('Mac') > -1) return '⌘';
    return 'Ctrl';
  });
  
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
    const lower = q.toLowerCase();

    if (lower.includes("who")) {
      return "Soumil is a Generative AI Engineer specialized in architecting production-grade LLM systems, RAG microservices, and agentic workflows for mission-critical enterprise platforms.";
    }

    if (lower.includes("orchestrator") || lower.includes("langgraph")) {
      return "He architected a descriptor-driven RAG orchestrator with a 4-node LangGraph pipeline routing across 5 use cases (schedule impact, resource recommendation, conflict detection, copilot, and fallback) over 10,000+ enterprise task schedules.";
    }

    if (lower.includes("mcp") || lower.includes("tool")) {
      return "He built dual Model Context Protocol (MCP) servers enabling AI assistants to securely query Neo4j (Cypher) and SQL Server (T-SQL) directly as intelligent tool interfaces.";
    }

    if (lower.includes("skill") || lower.includes("tech") || lower.includes("core")) {
      return "His core expertise covers LangGraph, Semantic Kernel, Neo4j, FastAPI, ChromaDB, pgvector, Python, PyTorch/TensorFlow, SQL Server, Docker, and GitLab CI/CD.";
    }

    if (lower.includes("graph") || lower.includes("etl") || lower.includes("neo4j")) {
      return "He engineered a high-throughput Neo4j graph ETL pipeline transforming relational schedules into a 10+ label property graph with predecessor parsing for downstream impact analysis.";
    }

    if (lower.includes("rag") || lower.includes("experience")) {
      return "He has built 8+ production RAG microservices using FastAPI, Semantic Kernel, and LangGraph with NLQ-to-SQL, hybrid vector/metadata search, and multi-turn query rewriting.";
    }

    if (lower.includes("outfit") || lower.includes("fashion")) {
      return "He created a fashion recommendation engine combining NLP and computer vision with LLM-based trend analysis for context-aware personalized styling.";
    }
    
    if (lower.includes("contact") || lower.includes("email") || lower.includes("reach")) {
      return (
        <span>
          You can reach him via{' '}
          <a href={SOCIAL_LINKS.email} className={linkStyle}>Email</a>
          {' '}or connect on{' '}
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className={linkStyle}>LinkedIn</a>.
        </span>
      );
    }

    if (lower.includes("hobbies") || lower.includes("hobby")) {
      return "He enjoys Fantasy Premier League (FPL), Sci-Fi novels, 3D modeling, and exploring new AI architectures.";
    }
    
    return "I am trained on Soumil's AI engineering work, RAG architectures, and agentic workflows. Feel free to ask about his LangGraph pipelines, MCP servers, or technical stack!";
  };

  return (
    <section className="flex-1 flex flex-col justify-end min-h-0 pb-4 group">
      <div className={`w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border flex flex-col h-[360px] sm:h-[380px] md:h-[400px] backdrop-blur-xl transition-all duration-300 ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-700/90 shadow-2xl' 
          : 'bg-white/95 border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
      }`}>
        
        {/* Terminal Header */}
        <div className={`h-8 shrink-0 flex items-center justify-between px-3 sm:px-4 backdrop-blur-md ${
          isDarkMode ? 'bg-slate-950 border-b border-slate-800' : 'bg-slate-100/90 border-b border-slate-200'
        }`}>
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
            <div className="ml-2 sm:ml-4 text-[10px] font-mono select-none text-slate-600 dark:text-slate-300 font-semibold">
              <span className="hidden sm:inline">interactive_resume.sh</span>
              <span className="sm:hidden">term.sh</span>
            </div>
          </div>

          {/* Command Palette Trigger: interactive button for mobile/touch, desktop shows hint */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
            className={`flex items-center space-x-1 text-[10px] font-mono px-2 py-0.5 rounded border transition-colors cursor-pointer ${
              isDarkMode 
                ? 'border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 bg-slate-900/50' 
                : 'border-slate-200 text-slate-600 hover:text-slate-900 bg-slate-50'
            }`}
            title="Open Command Palette (Ctrl+K)"
          >
            <Command size={10} />
            <span className="hidden sm:inline">{modifierKey} + K</span>
            <span className="sm:hidden">Menu</span>
          </button>
        </div>

        {/* Chat Body */}
        <div className={`flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 backdrop-blur-sm ${
          isDarkMode ? 'bg-slate-950/50' : 'bg-slate-50/50'
        }`}>
          {chatHistory.map((msg, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-end gap-1.5 sm:gap-2 max-w-[88%] sm:max-w-[80%]`}>
                {msg.type === 'bot' && <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center shrink-0 shadow-sm shadow-indigo-500/40"><Terminal size={14} className="text-white"/></div>}
                <div className={`rounded-xl sm:rounded-lg px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm shadow-sm leading-relaxed ${msg.type === 'user' ? theme.chatUser : theme.chatBot}`}>
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
             <div className="flex items-center gap-2">
                 <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center shadow-sm shadow-indigo-500/40"><Terminal size={14} className="text-white"/></div>
                 <div className={`${theme.chatBot} rounded-xl sm:rounded-lg px-3.5 sm:px-4 py-2.5 sm:py-3 flex space-x-1`}>
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce delay-200"></div>
                 </div>
             </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggestion Chips: Single-row horizontal scroll on mobile, multi-row flex on desktop */}
        <div className={`p-2 sm:p-3 border-t backdrop-blur-md overflow-hidden ${
          isDarkMode 
            ? 'border-slate-800 bg-slate-950/80' 
            : 'border-slate-200/90 bg-white/95'
        }`}>
          <div className="flex sm:flex-wrap gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
            {SUGGESTED_QUESTIONS.map((q, i) => (
              <button 
                key={i} 
                onClick={() => handleAsk(q)} 
                disabled={isTyping} 
                className={`text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border transition-all hover:-translate-y-0.5 font-medium cursor-pointer whitespace-nowrap shrink-0 ${
                  isDarkMode 
                    ? 'border-slate-700 bg-slate-900/80 hover:bg-indigo-950/60 hover:border-indigo-400 text-indigo-300 hover:text-white' 
                    : 'border-slate-200 bg-white hover:bg-indigo-50 hover:border-indigo-300 text-indigo-700 shadow-2xs'
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