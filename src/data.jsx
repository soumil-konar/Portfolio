// src/data.js
import { Database, Cpu, Server, Workflow, Network, Boxes, Sparkles } from 'lucide-react';

export const PASTEL_PALETTE = {
  light: { 
    bg: 'bg-[#fafaf9]', 
    text: 'text-slate-800', 
    card: 'bg-indigo-50/40', 
    chatUser: 'bg-[#6366f1] text-white',
    chatBot: 'bg-indigo-100/60 text-slate-700',
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
  { 
    id: 1, 
    title: "Multi-Use-Case RAG Orchestrator", 
    desc: "Plug-and-play descriptor-driven engine with a 4-node LangGraph pipeline routing across 5 use cases with dynamic SQL, Cypher, and Python resolvers.", 
    icon: <Workflow size={24}/>,
    tags: ["LangGraph", "Neo4j", "SQL Server", "Python"]
  },
  { 
    id: 2, 
    title: "Graph ETL Pipeline & MCP Servers", 
    desc: "ETL script transforming relational schedules into a Neo4j property graph with dual Model Context Protocol (MCP) servers for AI querying.", 
    icon: <Network size={24}/>,
    tags: ["Neo4j", "MCP", "SQL Server", "ETL"]
  },
  { 
    id: 3, 
    title: "Enterprise RAG Microservices Suite", 
    desc: "5 domain RAG microservices with NLQ-to-SQL pipelines, Semantic Kernel tool calling, hybrid vector/metadata search, and multi-turn context.", 
    icon: <Boxes size={24}/>,
    tags: ["FastAPI", "Semantic Kernel", "ChromaDB", "LangGraph"]
  },
  { 
    id: 4, 
    title: "Outfit Suggestion Website", 
    desc: "Fashion recommendation engine combining NLP and image recognition with LLM trend analysis for personalized, context-aware style exploration.", 
    icon: <Sparkles size={24}/>,
    tags: ["Python", "TensorFlow", "JavaScript", "NLP"]
  },
  { 
    id: 5, 
    title: "Enterprise RAG System", 
    desc: "Scalable vector search architecture processing 1M+ docs with high-precision retrieval.", 
    icon: <Database size={24}/>,
    tags: ["Vector DB", "LLMs", "Python"]
  },
  { 
    id: 6, 
    title: "AI Query Agent", 
    desc: "LLM-based agent reducing customer resolution time by 40% through autonomous reasoning.", 
    icon: <Cpu size={24}/>,
    tags: ["Agentic AI", "Prompt Eng", "Node.js"]
  },
  { 
    id: 7, 
    title: "Backend Microservices", 
    desc: "High-throughput services handling concurrent streaming connections and secure enterprise workloads.", 
    icon: <Server size={24}/>,
    tags: ["Microservices", "REST APIs", "Docker"]
  },
];

export const SUGGESTED_QUESTIONS = [
  "Who is Soumil?",
  "Tell me about the RAG Orchestrator.",
  "What are MCP Servers?",
  "What are his core AI skills?",
  "How can I contact him?", 
  "What are his hobbies?"
];

export const SOCIAL_LINKS = {
    github: "https://github.com/soumil-konar",
    linkedin: "https://www.linkedin.com/in/soumil-konar",
    email: "mailto:soumil.konar2001@gmail.com"
};