// src/data.js
import { Database, Cpu, Server } from 'lucide-react';

export const PASTEL_PALETTE = {
  light: { 
    bg: 'bg-[#fafaf9]', 
    text: 'text-slate-800', 
    card: 'bg-[#f5f5f4]', 
    chatUser: 'bg-[#6366f1] text-white',
    chatBot: 'bg-[#e7e5e4] text-slate-800',
    accent: 'text-[#4f46e5]' 
  },
  dark: { 
    bg: 'bg-[#0f172a]', 
    text: 'text-slate-200', 
    card: 'bg-[#1e293b]', 
    chatUser: 'bg-[#6366f1] text-white',
    chatBot: 'bg-[#334155] text-white',
    accent: 'text-[#818cf8]' 
  }
};

export const PROJECTS = [
  { id: 1, title: "Enterprise RAG System", desc: "Scalable vector search architecture processing 1M+ docs.", icon: <Database size={24}/> },
  { id: 2, title: "AI Query Agent", desc: "LLM-based agent reducing customer resolution time by 40%.", icon: <Cpu size={24}/> },
  { id: 3, title: "Backend Microservices", desc: "High-throughput node.js services handling concurrent streams.", icon: <Server size={24}/> },
];

export const SUGGESTED_QUESTIONS = [
  "Who is Soumil?",
  "How can I contact him?", 
  "What are his hobbies?",
  "Tell me about the RAG experience."
];

export const SOCIAL_LINKS = {
    github: "https://github.com/soumil-konar",
    linkedin: "https://www.linkedin.com/in/soumil-konar",
    email: "mailto:soumil.konar2001@gmail.com"
};