// src/components/AgentPipelineVisualizer.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Workflow, 
  Brain, 
  Database, 
  Terminal, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Activity, 
  Layers, 
  Code, 
  Sparkles, 
  Network, 
  Server,
  Zap,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Clock,
  LayoutGrid
} from 'lucide-react';
import { sound } from '../utils/audio';

const SCENARIOS = [
  {
    id: 'schedule_impact',
    label: 'Schedule Impact',
    icon: <Network size={14} />,
    query: 'Analyze downstream schedule impact of Task #4092 delay by 14 days',
    intent: 'SCHEDULE_IMPACT',
    confidence: 0.98,
    plugin: 'schedule_impact_resolver.yaml',
    toolName: 'Neo4j Graph Traversal (Cypher)',
    toolIcon: <Network size={16} />,
    queryCode: `MATCH (t:Task {id: '4092'})-[:PRECEDES*1..4]->(d:Task)\nWHERE d.isCritical = true\nRETURN d.name, d.floatDays, d.slack;`,
    output: `🚨 3 Critical Path Milestones impacted. Stage 2 Avionics Integration delayed by +8 days. Float exhausted for Task #4108.`,
    metrics: { classifier: 14, routing: 8, toolExec: 38, synthesis: 74, total: 134 }
  },
  {
    id: 'resource_conflict',
    label: 'Resource Conflict',
    icon: <Layers size={14} />,
    query: 'Detect Q3 resource over-allocation across avionics & structural teams',
    intent: 'CONFLICT_DETECTION',
    confidence: 0.95,
    plugin: 'resource_alloc_checker.yaml',
    toolName: 'SQL Server (T-SQL) + Constraint Engine',
    toolIcon: <Database size={16} />,
    queryCode: `SELECT r.name, SUM(a.assignedHours) as load, r.capacity\nFROM Allocations a JOIN Resources r ON a.resourceId = r.id\nWHERE a.quarter = 'Q3'\nGROUP BY r.name HAVING SUM(a.assignedHours) > r.capacity;`,
    output: `⚠️ Conflict Detected: Lead Engineer over-allocated by 135% in Weeks 32-34. Recommendation: Auto-dispatch auxiliary subcontractor team.`,
    metrics: { classifier: 12, routing: 6, toolExec: 26, synthesis: 48, total: 92 }
  },
  {
    id: 'mcp_federated',
    label: 'MCP Tool Gateway',
    icon: <Zap size={14} />,
    query: 'Query unified project state across Cypher Graph and Relational DB via MCP',
    intent: 'CROSS_DOMAIN_MCP',
    confidence: 0.97,
    plugin: 'mcp_gateway_router.yaml',
    toolName: 'Dual MCP Servers (Neo4j + SQL Server)',
    toolIcon: <Server size={16} />,
    queryCode: `// MCP Dispatch: tools/call\n{\n  "servers": ["neo4j-mcp-server", "mssql-mcp-server"],\n  "protocol": "MCP/1.0",\n  "operation": "federated_state_query"\n}`,
    output: `✅ Dual MCP Handshake OK: Synced 12 active sprint nodes with 4 relational budget tables in unified response payload.`,
    metrics: { classifier: 15, routing: 9, toolExec: 44, synthesis: 52, total: 120 }
  },
  {
    id: 'doc_generation',
    label: 'ATA Doc Gen',
    icon: <Sparkles size={14} />,
    query: 'Generate ATA-compliant Scope-of-Work document with semantic verification',
    intent: 'DOC_GENERATION',
    confidence: 0.99,
    plugin: 'doc_gen_chain.yaml',
    toolName: 'pgvector Semantic Search + Prompt Chaining',
    toolIcon: <Brain size={16} />,
    queryCode: `SELECT doc_chunk, 1 - (embedding <=> $query_vec) AS sim_score\nFROM engineering_specs\nWHERE sim_score > 0.82\nORDER BY sim_score DESC LIMIT 5;`,
    output: `📄 Generated ATA Spec #24-10-02 Scope-of-Work. 7-step prompt chain verified with 94.2% semantic relevance score.`,
    metrics: { classifier: 18, routing: 11, toolExec: 42, synthesis: 99, total: 170 }
  },
  {
    id: 'stateful_rag',
    label: 'Stateful Context Rewriting',
    icon: <Brain size={14} />,
    query: 'What about their contingency budget after the recent schedule adjustment?',
    intent: 'MULTI_TURN_REWRITE',
    confidence: 0.96,
    plugin: 'stateful_conversation_rewriter.yaml',
    toolName: 'LangGraph State Checkpointer + Hybrid Retrieval',
    toolIcon: <Workflow size={16} />,
    queryCode: `// LangGraph State Injection\n{\n  "session_id": "sess_8941",\n  "rewritten_query": "Avionics Task #4092 contingency budget reserves Q3",\n  "memory_turns": 4\n}`,
    output: `💡 Context resolved: Contingency reserves for Task #4092 currently stand at $42,500 with $18,000 committed to auxiliary contractors.`,
    metrics: { classifier: 10, routing: 7, toolExec: 31, synthesis: 60, total: 108 }
  }
];

const AgentPipelineVisualizer = ({ isDarkMode }) => {
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0]);
  const [activeStep, setActiveStep] = useState(4); // 0 = idle, 1 = classifier, 2 = router, 3 = tool, 4 = complete
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('output'); // 'output' | 'query' | 'telemetry' | 'state'
  const [viewMode, setViewMode] = useState('dag'); // 'dag' | 'waterfall'
  const [inspectedNode, setInspectedNode] = useState(null);
  const [showMobileDetails, setShowMobileDetails] = useState(false);

  // Run pipeline animation step-by-step
  const runSimulation = () => {
    if (isRunning) return;
    sound.playPowerUp();
    setIsRunning(true);
    setActiveStep(1);
    setInspectedNode(null);

    setTimeout(() => {
      sound.playClick();
      setActiveStep(2);
    }, 550);

    setTimeout(() => {
      sound.playClick();
      setActiveStep(3);
    }, 1200);

    setTimeout(() => {
      sound.playChime(620);
      setActiveStep(4);
      setIsRunning(false);
    }, 1900);
  };

  const handleScenarioChange = (scenario) => {
    sound.playClick();
    setSelectedScenario(scenario);
    setInspectedNode(null);
    if (!isRunning) {
      setActiveStep(4);
    }
  };

  const nodes = [
    {
      id: 1,
      title: 'Intent Classifier',
      role: 'Classifier Node',
      icon: <Brain size={16} />,
      detail: `Intent: ${selectedScenario.intent}`,
      subdetail: `Confidence: ${(selectedScenario.confidence * 100).toFixed(0)}%`,
      badge: `${selectedScenario.metrics.classifier}ms`,
      stateSnippet: {
        intent: selectedScenario.intent,
        confidence: selectedScenario.confidence,
        raw_tokens: selectedScenario.query.split(' ').length
      }
    },
    {
      id: 2,
      title: 'Plugin Router',
      role: 'Config Loader',
      icon: <Workflow size={16} />,
      detail: selectedScenario.plugin,
      subdetail: 'Schema Validated',
      badge: `${selectedScenario.metrics.routing}ms`,
      stateSnippet: {
        descriptor_file: selectedScenario.plugin,
        target_executor: selectedScenario.toolName,
        schema_validation: "VALIDATED_OK"
      }
    },
    {
      id: 3,
      title: 'Execution Node',
      role: 'Multi-Source Tool',
      icon: <Database size={16} />,
      detail: selectedScenario.toolName,
      subdetail: 'Dispatched Query',
      badge: `${selectedScenario.metrics.toolExec}ms`,
      stateSnippet: {
        tool_dispatched: selectedScenario.toolName,
        execution_latency: `${selectedScenario.metrics.toolExec}ms`,
        query_preview: selectedScenario.queryCode.slice(0, 60) + '...'
      }
    },
    {
      id: 4,
      title: 'Context Synthesizer',
      role: 'LLM Response',
      icon: <Terminal size={16} />,
      detail: 'Synthesized Context',
      subdetail: 'Verified Payload',
      badge: `${selectedScenario.metrics.synthesis}ms`,
      stateSnippet: {
        response_status: "SYNTHESIS_COMPLETE",
        tokens_out: selectedScenario.output.split(' ').length,
        verified: true
      }
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="my-4 sm:my-8 md:my-12 shrink-0 relative select-none"
    >
      {/* Section Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 px-2 sm:px-3 gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold font-mono text-indigo-600 dark:text-indigo-400">
              Agentic Architecture
            </span>
          </div>
          <h2 className="text-base sm:text-xl md:text-2xl font-bold tracking-tight mt-0.5 text-slate-900 dark:text-white">
            LangGraph Multi-Agent Orchestrator
          </h2>
        </div>

        {/* Desktop Controls (Hidden on small mobile screens) */}
        <div className="hidden md:flex items-center space-x-2">
          <div className={`flex items-center space-x-1 p-1 rounded-lg border text-[11px] font-mono ${
            isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-100 border-slate-200 shadow-2xs'
          }`}>
            <button
              onClick={() => { sound.playClick(); setViewMode('dag'); }}
              className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                viewMode === 'dag' 
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm' 
                  : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-900 hover:bg-white/80 font-medium'
              }`}
            >
              DAG Graph
            </button>
            <button
              onClick={() => { sound.playClick(); setViewMode('waterfall'); }}
              className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                viewMode === 'waterfall' 
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm' 
                  : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-900 hover:bg-white/80 font-medium'
              }`}
            >
              Waterfall Trace
            </button>
          </div>

          <button
            onClick={runSimulation}
            disabled={isRunning}
            className={`flex items-center space-x-2 text-xs font-mono px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer ${
              isRunning 
                ? 'bg-indigo-900/60 border border-indigo-500/40 text-indigo-200 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20'
            }`}
          >
            {isRunning ? (
              <>
                <RotateCcw size={13} className="animate-spin text-indigo-300" />
                <span>Simulating...</span>
              </>
            ) : (
              <>
                <Play size={13} className="fill-current" />
                <span>Simulate Flow</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Scenario Selection Chips (Horizontal Swipe) */}
      <div className="flex overflow-x-auto no-scrollbar space-x-1.5 sm:space-x-2 pb-2 mb-3 px-2 sm:px-3">
        {SCENARIOS.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => handleScenarioChange(scenario)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-[11px] sm:text-xs font-mono transition-all whitespace-nowrap cursor-pointer shrink-0 ${
              selectedScenario.id === scenario.id
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm font-semibold' 
                : isDarkMode 
                  ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800' 
                  : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-2xs font-medium'
            }`}
          >
            <span className={selectedScenario.id === scenario.id ? 'text-white' : 'text-indigo-500 dark:text-indigo-400'}>
              {scenario.icon}
            </span>
            <span>{scenario.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================
          MOBILE VIEW (< 768px): Unified, Modern Pipeline Trace Card
          ======================================================== */}
      <div className="md:hidden px-1">
        <div className={`rounded-2xl border p-4 backdrop-blur-xl transition-all shadow-md ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90 shadow-sm'
        }`}>
          {/* Query Bar */}
          <div className="flex items-start gap-2 mb-3.5 pb-3 border-b border-slate-200 dark:border-slate-800">
            <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">$</span>
            <p className="text-xs font-mono font-medium text-slate-800 dark:text-slate-200 leading-snug flex-1">
              {selectedScenario.query}
            </p>
          </div>

          {/* Connected Vertical Pipeline Timeline */}
          <div className="relative pl-6 space-y-4 mb-4">
            {/* The Continuous Glowing Vertical Rail */}
            <div className={`absolute left-2.5 top-2 bottom-2 w-0.5 transition-all ${
              isDarkMode ? 'bg-slate-800' : 'bg-slate-200'
            }`}>
              <div 
                className="w-full bg-gradient-to-b from-indigo-500 to-cyan-400 transition-all duration-500 rounded-full"
                style={{ height: `${(Math.min(activeStep, 4) / 4) * 100}%` }}
              />
            </div>

            {nodes.map((node) => {
              const isNodeActive = activeStep >= node.id;
              const isCurrent = activeStep === node.id && isRunning;

              return (
                <div key={node.id} className="relative flex items-start justify-between gap-2">
                  {/* Glowing Node Marker */}
                  <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                    isCurrent
                      ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/30 animate-pulse'
                      : isNodeActive
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : isDarkMode
                          ? 'bg-slate-800 text-slate-500 border border-slate-700'
                          : 'bg-slate-200 text-slate-500'
                  }`}>
                    {isNodeActive ? '✓' : node.id}
                  </div>

                  {/* Node Information */}
                  <div className="flex-1 pr-2">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold font-mono text-xs text-slate-900 dark:text-white">
                        {node.title}
                      </span>
                    </div>
                    <p className="text-[11px] font-sans text-slate-600 dark:text-slate-400 mt-0.5 leading-tight">
                      {node.detail}
                    </p>
                  </div>

                  {/* Step Latency Badge */}
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold shrink-0 ${
                    isNodeActive
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/50'
                      : 'text-slate-400 bg-slate-100 dark:bg-slate-800'
                  }`}>
                    {node.badge}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Unified Synthesized Response Banner */}
          <div className="p-3.5 rounded-xl border bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40 mb-3.5">
            <div className="flex items-center justify-between mb-1.5 text-[10px] font-mono uppercase font-bold text-emerald-800 dark:text-emerald-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400" />
                <span>Synthesized Output</span>
              </span>
              <span>{selectedScenario.metrics.total}ms total</span>
            </div>
            <p className="text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed font-sans font-medium">
              {selectedScenario.output}
            </p>
          </div>

          {/* Mobile Action Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={runSimulation}
              disabled={isRunning}
              className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-mono font-bold transition-all shadow-md active:scale-95 cursor-pointer ${
                isRunning 
                  ? 'bg-indigo-900/60 border border-indigo-500/40 text-indigo-200 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'
              }`}
            >
              {isRunning ? (
                <>
                  <RotateCcw size={13} className="animate-spin text-indigo-300" />
                  <span>Executing Pipeline...</span>
                </>
              ) : (
                <>
                  <Play size={13} className="fill-current" />
                  <span>Simulate Flow</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setShowMobileDetails(!showMobileDetails);
              }}
              className={`flex items-center space-x-1 py-2.5 px-3 rounded-xl border text-xs font-mono font-medium transition-colors cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
              }`}
            >
              <Code size={13} />
              <span>{showMobileDetails ? 'Hide' : 'Code'}</span>
              {showMobileDetails ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          </div>

          {/* Expandable Technical Details (Optional for Mobile) */}
          <AnimatePresence>
            {showMobileDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-3 pt-3 border-t border-slate-200 dark:border-slate-800"
              >
                <div className="text-[10px] font-mono text-slate-500 uppercase font-bold mb-1.5">
                  Generated Query ({selectedScenario.toolName})
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 overflow-x-auto">
                  <pre className="text-[10px] text-indigo-300 font-mono">
                    {selectedScenario.queryCode}
                  </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ========================================================
          DESKTOP & TABLET VIEW (>= 768px): Full 4-Column DAG Grid
          ======================================================== */}
      <div className="hidden md:block">
        {/* Active Query Card */}
        <div className={`p-4 rounded-xl border mb-5 backdrop-blur-md transition-all ${
          isDarkMode 
            ? 'bg-slate-950/80 border-slate-800 shadow-inner' 
            : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold mb-1">
            <span>Inbound Enterprise Query:</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">Latency Budget: {selectedScenario.metrics.total}ms</span>
          </div>
          <p className="text-sm font-mono text-slate-800 dark:text-slate-200 font-medium">
            "{selectedScenario.query}"
          </p>
        </div>

        {viewMode === 'dag' ? (
          /* Desktop DAG Flow */
          <div className="grid grid-cols-4 gap-3 relative mb-5">
            {nodes.map((node) => {
              const isNodeActive = activeStep >= node.id;
              const isCurrent = activeStep === node.id && isRunning;
              const isInspected = inspectedNode?.id === node.id;

              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    setInspectedNode(node);
                    setActiveTab('state');
                  }}
                  className={`p-4 rounded-xl border backdrop-blur-xl transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[140px] group ${
                    isInspected
                      ? 'ring-2 ring-indigo-500 border-indigo-400 shadow-lg'
                      : isNodeActive
                        ? isDarkMode
                          ? 'bg-slate-900/90 border-slate-700/90 shadow-lg hover:border-indigo-400'
                          : 'bg-white border-slate-200 shadow-sm hover:border-indigo-400 hover:shadow-md'
                        : isDarkMode
                          ? 'bg-slate-950/40 border-slate-800/60 opacity-40'
                          : 'bg-slate-100/60 border-slate-200/60 opacity-40'
                  }`}
                >
                  {isCurrent && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 animate-pulse" />
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-lg ${
                        isNodeActive 
                          ? 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400' 
                          : isDarkMode ? 'bg-slate-800 text-slate-500' : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}>
                        {node.icon}
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 border border-slate-200 text-slate-700 font-semibold'
                        }`}>
                          {node.badge}
                        </span>
                        {isNodeActive && <CheckCircle2 size={14} className="text-emerald-500 dark:text-emerald-400" />}
                      </div>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 dark:text-white font-mono">
                      {node.title}
                    </h4>
                    <p className="text-[11px] font-sans text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-1 font-medium">
                      {node.detail}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-medium">
                    <span>{node.subdetail}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity font-bold">Inspect State ↗</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Desktop Waterfall Trace */
          <div className={`p-4 rounded-xl border mb-5 backdrop-blur-md ${
            isDarkMode ? 'bg-slate-950/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between mb-3 text-xs font-mono font-bold text-slate-800 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-2">
              <span>Execution Timeline Waterfall (Total: {selectedScenario.metrics.total}ms)</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">P99: Sub-200ms</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {nodes.map((node) => {
                const ms = parseInt(node.badge.replace('ms', ''));
                const pct = (ms / selectedScenario.metrics.total) * 100;

                return (
                  <div key={node.id} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-800 dark:text-slate-300 font-semibold">{node.title} ({node.role})</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold">{node.badge}</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200/80 dark:border-transparent">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(12, pct)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Desktop Inspector Panel */}
        <div className={`rounded-xl border overflow-hidden backdrop-blur-md ${
          isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-3 pt-2 space-x-3 text-xs font-mono">
            {[
              { id: 'output', label: 'Synthesized Context', icon: <Terminal size={12} /> },
              { id: 'query', label: 'Generated Tool Query', icon: <Code size={12} /> },
              { id: 'state', label: inspectedNode ? `Node State: ${inspectedNode.title}` : 'Node State Dict', icon: <Brain size={12} /> },
              { id: 'telemetry', label: 'Telemetry Payload', icon: <Activity size={12} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { sound.playClick(); setActiveTab(tab.id); }}
                className={`flex items-center space-x-1.5 pb-2 border-b-2 transition-all cursor-pointer font-semibold ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-4 font-mono text-xs min-h-[120px]">
            {activeTab === 'output' && (
              <div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed font-sans font-medium">
                {selectedScenario.output}
              </div>
            )}

            {activeTab === 'query' && (
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 overflow-x-auto">
                <pre className="text-[11px] text-indigo-300 font-mono">
                  {selectedScenario.queryCode}
                </pre>
              </div>
            )}

            {activeTab === 'state' && (
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 overflow-x-auto">
                <pre className="text-[11px] text-cyan-300 font-mono">
                  {JSON.stringify(inspectedNode ? inspectedNode.stateSnippet : nodes[0].stateSnippet, null, 2)}
                </pre>
              </div>
            )}

            {activeTab === 'telemetry' && (
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 overflow-x-auto">
                <pre className="text-[11px] text-purple-300 font-mono">
                  {JSON.stringify({
                    scenario: selectedScenario.id,
                    latency_breakdown: selectedScenario.metrics,
                    langgraph_version: "0.2.28",
                    mcp_protocol_version: "2024-11-05",
                    status: "VERIFIED_OK"
                  }, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AgentPipelineVisualizer;
