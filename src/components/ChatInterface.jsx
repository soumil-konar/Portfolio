// src/components/ChatInterface.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Command, Send, Sparkles, ChevronDown, Copy, Check, Trash2, ArrowUpRight } from 'lucide-react'; 
import { SUGGESTED_QUESTIONS, SOCIAL_LINKS } from '../data'; 
import { sound } from '../utils/audio';

const ChatInterface = ({ isDarkMode }) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [streamingThinking, setStreamingThinking] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const chatEndRef = useRef(null);
  const isFirstRender = useRef(true);
  
  const [modifierKey] = useState(() => {
    if (typeof navigator !== 'undefined' && navigator.platform.indexOf('Mac') > -1) return '⌘';
    return 'Ctrl';
  });
  
  const [chatHistory, setChatHistory] = useState([
    { 
      type: 'bot', 
      text: "Hello! I am Soumil's AI Assistant (v2.6). Ask me anything about his production LangGraph orchestrators, Model Context Protocol (MCP) servers, or enterprise RAG systems.",
      thinking: "Initialized session: loaded knowledge graph indices and enterprise project context."
    }
  ]);

  useEffect(() => { 
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }); 
  }, [chatHistory, isTyping, streamingText]);

  const streamResponse = (fullText, thinkingText) => {
    setIsTyping(true);
    setStreamingText('');
    setStreamingThinking(thinkingText);

    let charIndex = 0;
    const streamInterval = setInterval(() => {
      charIndex += 4;
      if (charIndex % 12 === 0) {
        sound.playTypeBlip();
      }

      if (charIndex >= fullText.length) {
        clearInterval(streamInterval);
        setStreamingText('');
        setStreamingThinking('');
        setChatHistory(prev => [...prev, { type: 'bot', text: fullText, thinking: thinkingText }]);
        setIsTyping(false);
        sound.playChime(560);
      } else {
        setStreamingText(fullText.slice(0, charIndex));
      }
    }, 28);
  };

  const handleAsk = (question) => {
    if (!question.trim() || isTyping) return;
    sound.playClick();
    
    setChatHistory(prev => [...prev, { type: 'user', text: question }]);
    setInputValue('');

    const { text, thinking } = getAnswer(question);
    setTimeout(() => {
      streamResponse(text, thinking);
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAsk(inputValue);
  };

  const handleCopyMessage = (text, idx) => {
    sound.playClick();
    navigator.clipboard.writeText(typeof text === 'string' ? text : "Soumil's Contact info copied.");
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleClearChat = () => {
    sound.playClick();
    setChatHistory([
      { 
        type: 'bot', 
        text: "Terminal reset. How can I assist you with Soumil's AI engineering portfolio?",
        thinking: "Memory buffer cleared."
      }
    ]);
  };

  const getAnswer = (q) => {
    const lower = q.toLowerCase();

    if (lower.startsWith('/clear')) {
      handleClearChat();
      return { text: "Cleared.", thinking: "" };
    }

    if (lower.startsWith('/help') || lower.startsWith('/commands')) {
      return {
        text: "Supported slash commands:\n• /projects - Overview of key production architectures\n• /skills - Core AI and systems stack\n• /resume - Direct resume download\n• /contact - Email and LinkedIn links\n• /clear - Reset conversation session",
        thinking: "Parsed /help command. Outputting available shell routing capabilities."
      };
    }

    if (lower.includes("who")) {
      return {
        text: "Soumil Konar is a Generative AI Systems Engineer specialized in architecting production-grade LLM systems, RAG microservices, and agentic workflows for enterprise platforms.",
        thinking: "Intent: PROFILE_LOOKUP. Vector distance: 0.04. Retrieved executive summary."
      };
    }

    if (lower.includes("orchestrator") || lower.includes("langgraph")) {
      return {
        text: "He architected a descriptor-driven RAG orchestrator with a 4-node LangGraph pipeline routing across 5 use cases (schedule impact, resource recommendation, conflict detection, copilot, and fallback) over 10,000+ enterprise task schedules.",
        thinking: "Intent: ARCHITECTURE_LANGGRAPH. Querying property graph node for Multi-Use-Case Orchestrator."
      };
    }

    if (lower.includes("mcp") || lower.includes("tool")) {
      return {
        text: "He engineered dual Model Context Protocol (MCP) servers enabling AI assistants to securely query Neo4j (Cypher) and SQL Server (T-SQL) as standardized tools.",
        thinking: "Intent: MCP_PROTOCOL. Dispatched tool metadata schema and transport details."
      };
    }

    if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack")) {
      return {
        text: "His core stack covers LangGraph, Semantic Kernel, Neo4j, FastAPI, ChromaDB, pgvector, Python, PyTorch/TensorFlow, PostgreSQL, Docker, and GitLab CI/CD.",
        thinking: "Intent: SKILLS_QUERY. Retaining 12 production-verified technical competencies."
      };
    }

    if (lower.includes("contact") || lower.includes("email") || lower.includes("reach") || lower.startsWith('/contact')) {
      return {
        text: `You can reach Soumil directly via Email at soumil.konar2001@gmail.com or connect on LinkedIn (https://linkedin.com/in/soumil-konar).`,
        thinking: "Intent: CONTACT_DISPATCH. Retrieved validated social endpoints."
      };
    }

    if (lower.includes("resume") || lower.startsWith('/resume')) {
      return {
        text: "You can download Soumil's complete engineering resume in PDF format using the button in the hero header or by clicking the beacon icon in the bottom right corner.",
        thinking: "Intent: RESUME_DOWNLOAD. Pointing to static asset /resume.pdf."
      };
    }

    if (lower.includes("hobbies") || lower.includes("hobby")) {
      return {
        text: "Outside of neural architectures, he enjoys Fantasy Premier League (FPL), Sci-Fi literature, 3D modeling, and exploring new AI research papers.",
        thinking: "Intent: PERSONAL_INTERESTS. Retrieved non-work interests."
      };
    }
    
    return {
      text: "I am trained on Soumil's AI engineering work, RAG architectures, and agentic workflows. Feel free to ask about his LangGraph pipelines, MCP servers, or technical stack!",
      thinking: "Intent: GENERAL_QUERY. Fallback to AI engineering domain context."
    };
  };

  return (
    <section className="flex-1 flex flex-col justify-end min-h-0 pb-4 group select-none">
      <div className={`w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border flex flex-col h-[350px] sm:h-[440px] md:h-[480px] backdrop-blur-xl transition-all duration-300 ${
        isDarkMode 
          ? 'bg-[#101014]/95 border-zinc-800/90 shadow-2xl' 
          : 'bg-white/95 border-zinc-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
      }`}>
        
        {/* Terminal Header */}
        <div className={`h-9 shrink-0 flex items-center justify-between px-3 sm:px-4 backdrop-blur-md ${
          isDarkMode ? 'bg-[#08080a] border-b border-zinc-800' : 'bg-zinc-100/90 border-b border-zinc-200'
        }`}>
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
            <div className="ml-2 text-[10px] font-mono select-none text-zinc-600 dark:text-zinc-300 font-semibold flex items-center space-x-1.5">
              <span>soumil-agent-terminal.sh</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">v2.6</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleClearChat}
              title="Clear Terminal Session"
              className="text-zinc-400 hover:text-red-400 transition-colors p-1 cursor-pointer"
            >
              <Trash2 size={12} />
            </button>

            {/* Command Palette Trigger */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
              className={`flex items-center space-x-1 text-[10px] font-mono px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                isDarkMode 
                  ? 'border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 bg-[#16161b]' 
                  : 'border-zinc-200 text-zinc-600 hover:text-zinc-900 bg-zinc-50'
              }`}
              title="Open Command Palette (Ctrl+K)"
            >
              <Command size={10} />
              <span className="hidden sm:inline">{modifierKey} + K</span>
              <span className="sm:hidden">Menu</span>
            </button>
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className={`flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 backdrop-blur-sm ${
          isDarkMode ? 'bg-[#0a0a0d]/50' : 'bg-zinc-50/50'
        }`}>
          {chatHistory.map((msg, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="flex items-end gap-2 max-w-[90%] sm:max-w-[85%] group/msg">
                {msg.type === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-black flex items-center justify-center shrink-0 shadow-sm shadow-amber-500/30">
                    <Terminal size={13} className="text-black"/>
                  </div>
                )}
                
                <div className="flex flex-col">
                  {/* Optional Thinking Accordion */}
                  {msg.thinking && (
                    <div className="mb-1.5 text-[10px] font-mono text-zinc-500 flex items-center space-x-1">
                      <span className="text-amber-400">⚡ Reasoning Graph:</span>
                      <span className="italic">{msg.thinking}</span>
                    </div>
                  )}

                  <div className={`relative rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm leading-relaxed ${
                    msg.type === 'user'
                      ? 'bg-amber-500 text-black font-semibold rounded-br-none shadow-md font-mono'
                      : isDarkMode
                        ? 'bg-[#16161b] border border-zinc-800 text-zinc-100 rounded-bl-none shadow-sm'
                        : 'bg-white border border-zinc-200 text-zinc-800 rounded-bl-none shadow-xs'
                  }`}>
                    <div className="whitespace-pre-wrap font-sans">{msg.text}</div>

                    {msg.type === 'bot' && (
                      <button
                        onClick={() => handleCopyMessage(msg.text, idx)}
                        className="absolute -right-7 top-2 opacity-0 group-hover/msg:opacity-100 transition-opacity p-1 text-slate-400 hover:text-white"
                        title="Copy Response"
                      >
                        {copiedIndex === idx ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Real-Time Typewriter Streaming State */}
          {isTyping && (
            <div className="flex items-end gap-2 max-w-[90%]">
              <div className="w-6 h-6 rounded-full bg-amber-500 text-black flex items-center justify-center shrink-0 shadow-sm shadow-amber-500/30">
                <Terminal size={13} className="text-black"/>
              </div>

              <div className="flex flex-col">
                {streamingThinking && (
                  <div className="mb-1.5 text-[10px] font-mono text-amber-400 flex items-center space-x-1 animate-pulse">
                    <span>⚡ Generating response...</span>
                  </div>
                )}

                <div className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed border ${
                  isDarkMode ? 'bg-[#16161b] border-zinc-800 text-zinc-200' : 'bg-white border-zinc-200 text-zinc-800'
                }`}>
                  {streamingText ? (
                    <span>
                      {streamingText}
                      <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-amber-400 animate-pulse align-middle" />
                    </span>
                  ) : (
                    <div className="flex space-x-1 py-1">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className={`px-3 py-1.5 border-t backdrop-blur-md overflow-hidden ${
          isDarkMode ? 'border-zinc-800 bg-[#08080a]/90' : 'border-zinc-200 bg-white/95'
        }`}>
          <div className="flex sm:flex-wrap gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {SUGGESTED_QUESTIONS.map((q, i) => (
              <button 
                key={i} 
                onClick={() => handleAsk(q)} 
                disabled={isTyping} 
                className={`text-[10px] sm:text-[11px] px-2.5 py-1 rounded-full border transition-all hover:-translate-y-0.5 font-mono cursor-pointer whitespace-nowrap shrink-0 ${
                  isDarkMode 
                    ? 'border-zinc-800 bg-[#16161b] hover:bg-[#202026] hover:border-amber-400 text-amber-300 hover:text-white' 
                    : 'border-zinc-200 bg-white hover:bg-amber-50 hover:border-amber-400 text-amber-700 shadow-2xs'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSubmit}
          className={`p-2 sm:p-2.5 border-t flex items-center gap-2 backdrop-blur-md ${
            isDarkMode ? 'border-zinc-800 bg-[#08080a]' : 'border-zinc-200 bg-zinc-50'
          }`}
        >
          <span className="text-[11px] font-mono text-amber-500 font-bold pl-2 hidden sm:inline">$</span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
            placeholder="Ask about LangGraph, MCP, or type /help..."
            className={`flex-1 bg-transparent px-2 py-1.5 text-xs sm:text-sm font-mono outline-none ${
              isDarkMode ? 'text-white placeholder:text-zinc-500' : 'text-zinc-900 placeholder:text-zinc-400'
            }`}
          />
          <button
            type="submit"
            disabled={isTyping || !inputValue.trim()}
            className={`p-2 rounded-xl text-black font-bold disabled:opacity-40 transition-all cursor-pointer shrink-0 active:scale-95 ${
              isDarkMode ? 'bg-amber-500 hover:bg-amber-400' : 'bg-amber-500 hover:bg-amber-600 text-black'
            }`}
          >
            <Send size={13} />
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChatInterface;