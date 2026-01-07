// src/data.js
import { Database, Cpu, Server } from 'lucide-react';

export const PASTEL_PALETTE = {
  light: { 
    bg: 'bg-[#FDFBF7]', 
    text: 'text-slate-800', 
    card: 'bg-[#EAE4D9]', 
    chatUser: 'bg-[#2D3748] text-white',
    chatBot: 'bg-[#E2E8F0] text-slate-800',
    accent: 'text-[#6B8E23]' 
  },
  dark: { 
    bg: 'bg-[#1a202c]', 
    text: 'text-slate-200', 
    card: 'bg-[#2D3748]', 
    chatUser: 'bg-[#805AD5] text-white',
    chatBot: 'bg-[#4A5568] text-white',
    accent: 'text-[#B794F4]' 
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