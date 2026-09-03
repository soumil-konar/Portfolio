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
  Zap
} from 'lucide-react';

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
  }
];

const AgentPipelineVisualizer = ({ isDarkMode }) => {
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0]);
  const [activeStep, setActiveStep] = useState(4); // 0 = idle, 1 = classifier, 2 = router, 3 = tool, 4 = complete
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('output'); // 'output' | 'query' | 'telemetry'
  const [inspectedNode, setInspectedNode] = useState(null);

  // Run pipeline animation step-by-step
  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(1);
    setInspectedNode(null);

    setTimeout(() => {
      setActiveStep(2);
    }, 600);

    setTimeout(() => {
      setActiveStep(3);
    }, 1300);

    setTimeout(() => {
      setActiveStep(4);
      setIsRunning(false);
    }, 2000);
  };

  const handleScenarioChange = (scenario) => {
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
      icon: <Brain size={18} />,
      detail: `Classified as: ${selectedScenario.intent}`,
      subdetail: `Confidence: ${(selectedScenario.confidence * 100).toFixed(0)}%`,
      badge: `${selectedScenario.metrics.classifier}ms`,
    },
    {
      id: 2,
      title: 'Plugin Router',
      role: 'Config Loader',
      icon: <Workflow size={18} />,
      detail: `YAML: ${selectedScenario.plugin}`,
      subdetail: 'Dynamic Schema Mapped',
      badge: `${selectedScenario.metrics.routing}ms`,
    },
    {
      id: 3,
      title: 'Execution Node',
      role: 'Multi-Source Tool',
      icon: <Database size={18} />,
      detail: selectedScenario.toolName,
      subdetail: 'Dynamic Query Dispatched',
      badge: `${selectedScenario.metrics.toolExec}ms`,
    },
    {
      id: 4,
      title: 'Context Synthesizer',
      role: 'LLM Response',
      icon: <Terminal size={18} />,
      detail: 'Synthesized Context',
      subdetail: 'ATA / JSON Format Verified',
      badge: `${selectedScenario.metrics.synthesis}ms`,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="my-8 sm:my-10 md:my-14 shrink-0 relative group"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-5 px-1 sm:px-2 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            <span className="text-[10px] sm:text-[11px] md:text-xs uppercase tracking-widest font-bold font-mono text-indigo-600 dark:text-indigo-400">
              Live Architecture Simulator
            </span>
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight mt-1 text-slate-900 dark:text-white">
            Descriptor-Driven LangGraph Orchestrator
          </h2>
        </div>

        <div className="flex items-center space-x-2 self-stretch sm:self-auto">
          <button
            onClick={runSimulation}
            disabled={isRunning}
            className={`w-full sm:w-auto justify-center flex items-center space-x-2 text-xs font-mono px-4 py-2.5 sm:py-2 rounded-xl transition-all duration-200 shadow-md active:scale-95 cursor-pointer ${
              isRunning 
                ? 'bg-indigo-500/50 text-white cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/25 hover:shadow-indigo-500/40 font-semibold'
            }`}
          >
            {isRunning ? (
              <>
                <Activity size={14} className="animate-spin" />
                <span>Executing Pipeline...</span>
              </>
            ) : (
              <>
                <Play size={14} className="fill-current" />
                <span>Simulate Execution</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div 
        className={`w-full rounded-2xl border backdrop-blur-xl p-4 sm:p-5 md:p-7 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-slate-900/90 border-slate-700/90 shadow-2xl' 
            : 'bg-white/95 border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
        }`}
      >
        {/* Scenario Selection Chips */}
        <div className="mb-6">
          <div className="text-[11px] font-mono uppercase tracking-wider font-bold mb-2.5 text-slate-600 dark:text-slate-300">
            Select Live Scenario:
          </div>
          <div className="flex flex-wrap gap-2">
            {SCENARIOS.map((scenario) => {
              const isSelected = selectedScenario.id === scenario.id;
              return (
                <button
                  key={scenario.id}
                  onClick={() => handleScenarioChange(scenario)}
                  disabled={isRunning}
                  className={`flex items-center space-x-2 text-xs font-mono px-3.5 py-2 rounded-lg border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? isDarkMode
                        ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-md shadow-indigo-500/20 font-bold'
                        : 'bg-indigo-50 border-indigo-400 text-indigo-700 shadow-2xs font-bold'
                      : isDarkMode
                      ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-indigo-400 hover:text-white hover:bg-slate-800 font-medium'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-indigo-300 font-medium'
                  }`}
                >
                  <span>{scenario.icon}</span>
                  <span className="font-semibold">{scenario.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Input Bar */}
        <div 
          className={`p-3.5 rounded-xl border mb-6 flex items-center space-x-3 text-xs font-mono ${
            isDarkMode 
              ? 'bg-slate-950/80 border-slate-700/80 text-slate-100' 
              : 'bg-slate-50 border-slate-200 text-slate-900 font-medium'
          }`}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 shadow-sm shadow-emerald-500/50" />
          <span className="font-bold select-none hidden sm:inline text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-[10px]">query:</span>
          <span className="font-medium truncate text-slate-900 dark:text-slate-100">{selectedScenario.query}</span>
        </div>

        {/* 4-Node LangGraph Flowchart */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 relative mb-6">
          {nodes.map((node, index) => {
            const isActive = activeStep === node.id;
            const isCompleted = activeStep > node.id;
            const isInspected = inspectedNode === node.id;

            return (
              <React.Fragment key={node.id}>
                <motion.div
                  onClick={() => setInspectedNode(node.id)}
                  whileHover={{ y: -2 }}
                  className={`relative rounded-xl p-3.5 sm:p-4 border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? isDarkMode
                        ? 'border-indigo-400 ring-2 ring-indigo-500/50 shadow-xl shadow-indigo-500/20 bg-slate-800/95 text-white'
                        : 'border-indigo-500 ring-2 ring-indigo-400/30 shadow-md bg-indigo-50/80 text-slate-900'
                      : isCompleted
                      ? isDarkMode
                        ? 'bg-slate-900/90 border-slate-700/90 text-slate-100'
                        : 'bg-white border-slate-200/90 text-slate-900 shadow-2xs'
                      : isDarkMode
                      ? 'bg-slate-900/60 border-slate-700/80 text-slate-200 hover:border-slate-500'
                      : 'bg-slate-50/80 border-slate-200 opacity-70 text-slate-600'
                  } ${
                    isInspected ? 'ring-2 ring-emerald-500' : ''
                  }`}
                >
                  {/* Node Header */}
                  <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                    <div className="flex items-center space-x-2">
                      <div 
                        className={`p-1.5 rounded-lg ${
                          isActive
                            ? 'bg-indigo-500 text-white animate-pulse'
                            : isCompleted
                            ? isDarkMode ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                            : isDarkMode ? 'bg-slate-800 text-slate-300 border border-slate-700' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {node.icon}
                      </div>
                      <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500 dark:text-slate-300">
                        Node 0{node.id}
                      </span>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      isDarkMode ? 'bg-slate-800 border border-slate-700 text-indigo-300' : 'bg-indigo-50 border border-indigo-100 text-indigo-700'
                    }`}>
                      {node.badge}
                    </span>
                  </div>

                  {/* Node Body */}
                  <h4 className="font-bold text-xs md:text-sm mb-1 text-slate-900 dark:text-white">{node.title}</h4>
                  <p className="text-[11px] font-mono truncate mb-1 text-indigo-700 dark:text-indigo-300 font-medium">{node.detail}</p>
                  <p className="text-[10px] font-sans truncate text-slate-600 dark:text-slate-300">{node.subdetail}</p>

                  {/* Flow Connection Arrow for Desktop */}
                  {index < 3 && (
                    <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-indigo-400">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </motion.div>

                {/* Vertical Downward Connector Arrow for Mobile (Single Column) */}
                {index < 3 && (
                  <div className="flex sm:hidden justify-center -my-1 text-indigo-400/60">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Telemetry & Output Inspector Drawer */}
        <div 
          className={`rounded-xl border overflow-hidden ${
            isDarkMode ? 'bg-slate-950/90 border-slate-700/80 shadow-lg' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          {/* Tabs Bar with Mobile Overflow Support */}
          <div 
            className={`flex flex-col sm:flex-row sm:items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 border-b text-xs font-mono gap-2 ${
              isDarkMode ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-slate-50/70'
            }`}
          >
            <div className="flex space-x-3 sm:space-x-4 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('output')}
                className={`pb-1 border-b-2 transition-colors font-semibold cursor-pointer whitespace-nowrap ${
                  activeTab === 'output'
                    ? isDarkMode ? 'border-indigo-400 text-indigo-300' : 'border-indigo-600 text-indigo-700'
                    : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span className="hidden sm:inline">Synthesized </span>Output
              </button>
              <button
                onClick={() => setActiveTab('query')}
                className={`pb-1 border-b-2 transition-colors font-semibold cursor-pointer whitespace-nowrap ${
                  activeTab === 'query'
                    ? isDarkMode ? 'border-indigo-400 text-indigo-300' : 'border-indigo-600 text-indigo-700'
                    : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span className="hidden sm:inline">Generated </span>Query<span className="hidden sm:inline"> / Payload</span>
              </button>
              <button
                onClick={() => setActiveTab('telemetry')}
                className={`pb-1 border-b-2 transition-colors font-semibold cursor-pointer whitespace-nowrap ${
                  activeTab === 'telemetry'
                    ? isDarkMode ? 'border-indigo-400 text-indigo-300' : 'border-indigo-600 text-indigo-700'
                    : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span className="hidden sm:inline">Execution </span>Telemetry
              </button>
            </div>

            <div className="flex items-center space-x-1.5 text-[10px] text-slate-600 dark:text-slate-300 font-semibold self-end sm:self-auto shrink-0">
              <Activity size={12} className="text-indigo-500 dark:text-indigo-400" />
              <span>{selectedScenario.metrics.total}ms total</span>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4 font-mono text-xs">
            {activeTab === 'output' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 text-[11px] mb-1 font-bold">
                  <CheckCircle2 size={14} />
                  <span>Pipeline Execution Finished Successfully</span>
                </div>
                <div className={`p-4 rounded-lg leading-relaxed border font-medium ${
                  isDarkMode ? 'bg-slate-900/90 border-slate-700/90 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}>
                  {selectedScenario.output}
                </div>
              </motion.div>
            )}

            {activeTab === 'query' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="text-[10px] uppercase tracking-wider mb-2 font-bold text-slate-600 dark:text-slate-300">
                  Target Tool: <span className="text-indigo-600 dark:text-indigo-400 font-bold">{selectedScenario.toolName}</span>
                </div>
                <pre className={`p-3.5 rounded-lg overflow-x-auto text-[11px] font-mono leading-normal border ${
                  isDarkMode ? 'bg-slate-900 border-slate-700/80 text-indigo-300' : 'bg-slate-900 border-slate-800 text-indigo-200'
                }`}>
                  <code>{selectedScenario.queryCode}</code>
                </pre>
              </motion.div>
            )}

            {activeTab === 'telemetry' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                <div className="text-[10px] uppercase tracking-wider font-bold text-slate-600 dark:text-slate-300">
                  Node Latency Breakdown
                </div>
                <div className="space-y-2.5">
                  {Object.entries({
                    'Intent Classifier': selectedScenario.metrics.classifier,
                    'Plugin & YAML Routing': selectedScenario.metrics.routing,
                    'Tool / Database Execution': selectedScenario.metrics.toolExec,
                    'Context Synthesizer': selectedScenario.metrics.synthesis,
                  }).map(([name, ms]) => {
                    const percentage = (ms / selectedScenario.metrics.total) * 100;
                    return (
                      <div key={name} className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-800 dark:text-slate-200 font-semibold">{name}</span>
                          <span className="font-bold text-indigo-600 dark:text-indigo-400">{ms}ms</span>
                        </div>
                        <div className={`h-2 w-full rounded-full overflow-hidden ${
                          isDarkMode ? 'bg-slate-800 border border-slate-700/60' : 'bg-slate-200'
                        }`}>
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AgentPipelineVisualizer;
