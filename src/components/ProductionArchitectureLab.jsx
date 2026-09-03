import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Coins, 
  ExternalLink,
  ArrowRight,
  Sparkles,
  Network,
  Workflow
} from 'lucide-react';
import { sound } from '../utils/audio';
import { PROJECTS } from '../data';

const BENCHMARKS = [
  {
    id: 'graph_rag',
    projectId: 1,
    title: 'Multi-Hop GraphRAG',
    shortLabel: 'GraphRAG',
    icon: <Network size={15} />,
    domain: 'Enterprise Knowledge Graphs & Dependency Chains',
    query: 'Identify all critical-path assemblies delayed if Avionics Sub-assembly #4092 slips 14 days',
    naive: {
      label: 'Naive Vector RAG',
      tag: 'Raw Embedding Search',
      latency: 1850,
      accuracy: 54,
      costPer1k: 42.50,
      reliability: '46% Hallucination',
      approach: 'Dumps flat vector chunks (top-k=8) into context window without graph topological awareness.',
      result: 'Misses 2 out of 3 critical path dependencies because spatial vector proximity cannot encode multi-hop relational edges.',
      codeSnippet: `// Naive Vector Retrieval
const chunks = await vectorDb.similaritySearch(query, 8);
const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'system', content: chunks.join('\\n') }]
});
// ❌ Result: Hallucinates fictional task #4119; misses downstream float exhaustion.`
    },
    production: {
      label: "Soumil's Architecture",
      tag: 'Neo4j GraphRAG + RRF',
      latency: 135,
      accuracy: 99.4,
      costPer1k: 3.20,
      reliability: '99.4% Verified',
      approach: 'Cypher Graph Traversal with Reciprocal Rank Fusion, Redis Semantic Cache, and Pydantic schema validation.',
      result: 'Zero hallucinations. Traverses 4 dependency hops deterministically in 135ms with 92% token cost reduction.',
      codeSnippet: `// Production GraphRAG + Schema Verification
MATCH (t:Task {id: '4092'})-[:PRECEDES*1..4]->(d:Task)
WHERE d.isCritical = true
RETURN d.id, d.name, d.floatDays, d.slack;
// ✅ Result: Deterministically flags Stage 2 Avionics Integration (+8d slip).`
    }
  },
  {
    id: 'mcp_gateway',
    projectId: 2,
    title: 'Dual MCP Gateway',
    shortLabel: 'MCP Protocol',
    icon: <Zap size={15} />,
    domain: 'Heterogeneous Multi-Database Orchestration',
    query: 'Federate sprint node velocities from Neo4j with financial balance sheets from SQL Server',
    naive: {
      label: 'Brittle REST Wrappers',
      tag: 'Ad-hoc Function Calling',
      latency: 1420,
      accuracy: 62,
      costPer1k: 38.00,
      reliability: 'High Injection Risk',
      approach: 'Scattered Python helper functions with hardcoded connection strings and unstructured JSON outputs.',
      result: 'Frequent schema mismatch breakages; vulnerable to prompt injections in database arguments; sequential network lag.',
      codeSnippet: `// Brittle Ad-hoc Tooling
async function queryDb(sqlQuery) {
  // ⚠️ Security Risk: Unsanitized dynamic SQL execution
  return await db.raw(sqlQuery);
}
// ❌ Result: Schema drift causes 38% runtime failure rate during schema migrations.`
    },
    production: {
      label: "Soumil's Architecture",
      tag: 'Dual MCP Servers (Anthropic Standard)',
      latency: 110,
      accuracy: 99.8,
      costPer1k: 4.10,
      reliability: 'Enterprise Guardrails',
      approach: 'Author of open-standard Model Context Protocol servers (neo4j-mcp-server & mssql-mcp-server) with async connection pooling.',
      result: 'Standardized tool negotiation, strict Pydantic JSON schema boundaries, zero-trust injection defense, and parallel dispatch.',
      codeSnippet: `// Standardized Model Context Protocol Gateway
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "server": "neo4j-mcp-server",
    "name": "federated_dependency_query",
    "arguments": { "scope": "Q3_AVIONICS", "strict_schema": true }
  }
}
// ✅ Result: Sub-120ms federated query across graph & relational stores.`
    }
  },
  {
    id: 'stateful_agents',
    projectId: 3,
    title: 'Fault-Tolerant Agents',
    shortLabel: 'LangGraph State',
    icon: <Workflow size={15} />,
    domain: 'Multi-Step ATA Spec Document Generation',
    query: 'Execute 7-stage prompt chain to compile, verify, and persist ATA-100 technical spec',
    naive: {
      label: 'Stateless Chaining',
      tag: 'Linear Chains in Memory',
      latency: 4200,
      accuracy: 58,
      costPer1k: 56.00,
      reliability: '0% State Recovery',
      approach: 'Sequential in-memory promise chain. Any network timeout or rate limit at step 6 aborts the entire execution.',
      result: 'Zero state persistence. Complete failure requires restarting all 7 steps from scratch, doubling user wait time and API bills.',
      codeSnippet: `// Fragile Sequential Chain
const res1 = await step1();
const res2 = await step2(res1);
// ... network timeout at step 5!
// ❌ Entire workflow dies in RAM; 4,200ms and $0.05 wasted with zero recovery.`
    },
    production: {
      label: "Soumil's Architecture",
      tag: 'LangGraph State Checkpointer',
      latency: 480,
      accuracy: 99.9,
      costPer1k: 6.50,
      reliability: 'Deterministic Rollbacks',
      approach: 'Stateful DAG with Postgres state persistence checkpointer, human-in-the-loop pause/resume, and idempotent retries.',
      result: 'Transient network failure recovers in sub-500ms from the exact failure node without re-running earlier steps.',
      codeSnippet: `// LangGraph State Graph with Checkpointer
const workflow = new StateGraph({ channels: stateChannels })
  .addNode("extract_specs", extractSpecsNode)
  .addNode("verify_ata", verifyAtaNode)
  .withCheckpointer(postgresCheckpointer);
// ✅ Instant resumption from node checkpoint; zero wasted tokens.`
    }
  }
];

const ProductionArchitectureLab = ({ isDarkMode, onSelectProject }) => {
  const [selectedBenchmark, setSelectedBenchmark] = useState(BENCHMARKS[0]);
  const [activeMode, setActiveMode] = useState('production'); // 'production' | 'naive'
  const [showCode, setShowCode] = useState(false);

  const currentData = activeMode === 'production' 
    ? selectedBenchmark.production 
    : selectedBenchmark.naive;

  const handleBenchmarkSelect = (b) => {
    sound.playClick();
    setSelectedBenchmark(b);
  };

  const toggleMode = (mode) => {
    if (mode === activeMode) return;
    if (mode === 'production') {
      sound.playPowerUp();
    } else {
      sound.playClick();
    }
    setActiveMode(mode);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="my-5 sm:my-8 md:my-12 shrink-0 select-none"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-3 sm:mb-4 px-2 sm:px-3 gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold font-mono text-emerald-600 dark:text-emerald-400">
              Interactive System Benchmarks
            </span>
          </div>
          <h2 className="text-base sm:text-xl md:text-2xl font-bold tracking-tight mt-0.5 text-slate-900 dark:text-white">
            Production Architecture vs. Naive AI
          </h2>
        </div>
        <p className="text-[11px] sm:text-xs font-mono text-slate-600 dark:text-slate-400 hidden sm:block">
          Interactive evaluation: latency, cost reduction, and failure resilience
        </p>
      </div>

      {/* Scenario Tabs (Clean horizontal pills) */}
      <div className="flex overflow-x-auto no-scrollbar space-x-1.5 sm:space-x-2 pb-2 mb-3.5 px-2 sm:px-3">
        {BENCHMARKS.map((b) => (
          <button
            key={b.id}
            onClick={() => handleBenchmarkSelect(b)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all whitespace-nowrap cursor-pointer shrink-0 ${
              selectedBenchmark.id === b.id
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm font-semibold'
                : isDarkMode
                  ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-2xs font-medium'
            }`}
          >
            <span className={selectedBenchmark.id === b.id ? 'text-white' : 'text-indigo-500 dark:text-indigo-400'}>
              {b.icon}
            </span>
            <span className="hidden sm:inline">{b.title}</span>
            <span className="sm:hidden">{b.shortLabel}</span>
          </button>
        ))}
      </div>

      {/* THE BENCHMARK CARD */}
      <div className={`rounded-2xl border backdrop-blur-xl p-4 sm:p-6 transition-all duration-300 relative overflow-hidden shadow-md ${
        isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        
        {/* Top Ribbon: Mode Switcher & Domain */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-600 dark:text-slate-300 block">
              Test Case Domain
            </span>
            <h3 className="font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5">
              {selectedBenchmark.domain}
            </h3>
          </div>

          {/* Interactive Mode Toggle */}
          <div className={`flex items-center p-1 rounded-xl border self-start sm:self-auto text-xs font-mono font-semibold ${
            isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200 shadow-2xs'
          }`}>
            <button
              onClick={() => toggleMode('production')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeMode === 'production'
                  ? 'bg-emerald-600 text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles size={12} />
              <span>Production AI</span>
            </button>
            <button
              onClick={() => toggleMode('naive')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeMode === 'naive'
                  ? 'bg-amber-600 text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <AlertTriangle size={12} />
              <span>Naive Wrapper</span>
            </button>
          </div>
        </div>

        {/* The Query Prompt */}
        <div className="py-3 flex items-start gap-2 text-xs font-mono text-slate-800 dark:text-slate-200">
          <span className="font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">$</span>
          <span className="leading-relaxed font-medium">"{selectedBenchmark.query}"</span>
        </div>

        {/* 3 LIVE METRICS COMPARISON BARS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 my-3">
          
          {/* Metric 1: Latency */}
          <div className={`p-3 rounded-xl border transition-all ${
            activeMode === 'production' 
              ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-900/40' 
              : 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/80 dark:border-amber-900/40'
          }`}>
            <div className="flex items-center justify-between text-[10px] font-mono uppercase font-bold text-slate-600 dark:text-slate-300 mb-1">
              <span className="flex items-center gap-1">
                <Clock size={11} />
                <span>P99 Latency</span>
              </span>
              <span className={activeMode === 'production' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-amber-600 dark:text-amber-400 font-bold'}>
                {activeMode === 'production' ? '12x Faster' : 'Laggy'}
              </span>
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-white">
              {currentData.latency}ms
            </div>
            {/* Visual meter */}
            <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 mt-2 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  activeMode === 'production' ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
                initial={false}
                animate={{ width: `${Math.min(100, Math.max(12, (currentData.latency / 2000) * 100))}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {/* Metric 2: Grounding / Accuracy */}
          <div className={`p-3 rounded-xl border transition-all ${
            activeMode === 'production' 
              ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-900/40' 
              : 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/80 dark:border-amber-900/40'
          }`}>
            <div className="flex items-center justify-between text-[10px] font-mono uppercase font-bold text-slate-600 dark:text-slate-300 mb-1">
              <span className="flex items-center gap-1">
                <ShieldCheck size={11} />
                <span>Factuality & Grounding</span>
              </span>
              <span className={activeMode === 'production' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-amber-600 dark:text-amber-400 font-bold'}>
                {activeMode === 'production' ? 'Verified' : 'Unsafe'}
              </span>
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-white">
              {currentData.accuracy}%
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 mt-2 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  activeMode === 'production' ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
                initial={false}
                animate={{ width: `${currentData.accuracy}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {/* Metric 3: Cost per 1k queries */}
          <div className={`p-3 rounded-xl border transition-all ${
            activeMode === 'production' 
              ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-900/40' 
              : 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/80 dark:border-amber-900/40'
          }`}>
            <div className="flex items-center justify-between text-[10px] font-mono uppercase font-bold text-slate-600 dark:text-slate-300 mb-1">
              <span className="flex items-center gap-1">
                <Coins size={11} />
                <span>Cost / 1k Invocations</span>
              </span>
              <span className={activeMode === 'production' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-amber-600 dark:text-amber-400 font-bold'}>
                {activeMode === 'production' ? '92% Saved' : 'Wasteful'}
              </span>
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-white">
              ${currentData.costPer1k.toFixed(2)}
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 mt-2 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  activeMode === 'production' ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
                initial={false}
                animate={{ width: `${Math.min(100, (currentData.costPer1k / 60) * 100)}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

        </div>

        {/* Dynamic Architectural Assessment Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMode + selectedBenchmark.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className={`p-3.5 sm:p-4 rounded-xl border my-3 transition-colors ${
              activeMode === 'production'
                ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60'
                : 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60'
            }`}
          >
            <div className="flex items-center space-x-2 text-xs font-mono font-bold mb-1">
              {activeMode === 'production' ? (
                <>
                  <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-800 dark:text-emerald-300">
                    {currentData.tag}
                  </span>
                </>
              ) : (
                <>
                  <AlertTriangle size={14} className="text-amber-600 dark:text-amber-400" />
                  <span className="text-amber-800 dark:text-amber-300">
                    {currentData.tag}
                  </span>
                </>
              )}
            </div>

            <p className="text-xs sm:text-sm font-sans text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
              {currentData.approach}
            </p>

            <div className="mt-2 pt-2 border-t border-black/5 dark:border-white/10 text-xs font-mono font-semibold flex items-center justify-between">
              <span className={activeMode === 'production' ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}>
                {currentData.result}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Action Controls & Code Inspection */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setShowCode(!showCode);
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-medium transition-colors cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
              }`}
            >
              <span>{showCode ? 'Hide Implementation' : 'View Code Implementation'}</span>
              <ArrowRight size={12} className={`transition-transform duration-200 ${showCode ? 'rotate-90' : ''}`} />
            </button>

            {onSelectProject && (
              <button
                onClick={() => {
                  sound.playClick();
                  const proj = PROJECTS.find(p => p.id === selectedBenchmark.projectId);
                  if (proj) onSelectProject(proj);
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-medium transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'bg-indigo-950/40 border-indigo-800/50 text-indigo-300 hover:bg-indigo-900/50 hover:text-white'
                    : 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-900 shadow-2xs'
                }`}
              >
                <span>Deep Dive Architecture</span>
                <ExternalLink size={12} />
              </button>
            )}
          </div>

          <span className="text-[11px] font-mono text-slate-600 dark:text-slate-300 font-semibold">
            {activeMode === 'production' ? '✅ Tested in Staging & Prod' : '⚠️ Common Anti-Pattern'}
          </span>
        </div>

        {/* Code Snippet Drawer */}
        <AnimatePresence>
          {showCode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-3 pt-3 border-t border-slate-200 dark:border-slate-800"
            >
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto">
                <pre className="text-[11px] font-mono leading-relaxed text-indigo-300">
                  {currentData.codeSnippet}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.section>
  );
};

export default ProductionArchitectureLab;
