// src/data.js
import { Database, Cpu, Server, Workflow, Network, Boxes, Sparkles, Smartphone, ScanFace } from 'lucide-react';

export const PASTEL_PALETTE = {
  light: { 
    bg: 'bg-[#fafaf9]', 
    text: 'text-slate-900', 
    card: 'bg-white/90 border-slate-200/80 shadow-sm', 
    chatUser: 'bg-indigo-600 text-white font-medium',
    chatBot: 'bg-white border border-slate-200/90 text-slate-800 shadow-sm',
    accent: 'text-indigo-600' 
  },
  dark: { 
    bg: 'bg-[#0b0f19]', 
    text: 'text-slate-100', 
    card: 'bg-slate-900/90 border-slate-700/80 shadow-xl', 
    chatUser: 'bg-indigo-600 text-white font-semibold',
    chatBot: 'bg-slate-800/90 border border-slate-700 text-slate-100 shadow-md font-medium',
    accent: 'text-indigo-400' 
  }
};

export const PROJECTS = [
  { 
    id: 1, 
    title: "Multi-Use-Case RAG Orchestrator", 
    desc: "Plug-and-play descriptor-driven engine with a 4-node LangGraph pipeline routing across 5 use cases with dynamic SQL, Cypher, and Python resolvers.", 
    icon: <Workflow size={24}/>,
    tags: ["LangGraph", "Neo4j", "SQL Server", "Python"],
    isEnterprise: true,
    problem: "Enterprise project managers needed to query complex schedule impacts, resource conflicts, and cross-team dependencies across 10,000+ task schedules in natural language without manual graph/SQL authoring.",
    architecture: [
      { step: "01. Intent Classifier", detail: "LangGraph classifier node routes across 5 use cases with confidence scoring." },
      { step: "02. Plugin Registry", detail: "Loads YAML descriptors containing schema mappings, variations, and resolvers." },
      { step: "03. Multi-Source Node", detail: "Dynamically dispatches Neo4j Cypher traversals, SQL Server queries, and Python logic." },
      { step: "04. Synthesizer", detail: "Formulates context-aware, ATA-compliant responses with confidence validation." }
    ],
    highlights: [
      "Descriptor-driven plug-and-play architecture defined by declarative JSON/YAML schemas.",
      "4-node LangGraph pipeline supporting 5 enterprise operational domains.",
      "Unified multi-source execution node querying relational and graph DBs in parallel.",
      "Automatic fallback mechanisms with graceful degradation for out-of-domain queries."
    ],
    metrics: [
      { label: "Schedules", val: "10,000+ Tasks" },
      { label: "Use Cases", val: "5 Domains" },
      { label: "Confidence", val: "95%+ Accuracy" },
      { label: "Execution", val: "Sub-second" }
    ]
  },
  { 
    id: 2, 
    title: "Graph ETL Pipeline & MCP Servers", 
    desc: "ETL script transforming relational schedules into a Neo4j property graph with dual Model Context Protocol (MCP) servers for AI querying.", 
    icon: <Network size={24}/>,
    tags: ["Neo4j", "MCP", "SQL Server", "ETL"],
    isEnterprise: true,
    problem: "Relational tables in SQL Server lacked topological graph relationship awareness for complex dependency chains, blocking downstream AI agents from performing graph pathfinding.",
    architecture: [
      { step: "01. SQL Ingestion", detail: "Extracts relational task hierarchies and scheduling constraints." },
      { step: "02. Predecessor Parser", detail: "Parses predecessor/successor chains into 10+ node labels and 8 edge types." },
      { step: "03. Batch Commits", detail: "Ingests graph topology with 500-node transactional batch commits into Neo4j." },
      { step: "04. Dual MCP Gateways", detail: "Exposes Neo4j (Cypher) and SQL Server (T-SQL) as intelligent tool interfaces." }
    ],
    highlights: [
      "Custom graph ETL parser transforming complex relational schedules into Neo4j property graphs.",
      "High-throughput transactional batch commits (500 nodes/commit) with integrity checks.",
      "Built dual Model Context Protocol (MCP) servers letting AI assistants query graphs directly.",
      "Accelerated downstream impact analysis by 80% compared to recursive SQL queries."
    ],
    metrics: [
      { label: "Graph Labels", val: "10+ Labels" },
      { label: "Edge Types", val: "8 Relationships" },
      { label: "Batch Size", val: "500 Nodes/Commit" },
      { label: "Protocols", val: "MCP 1.0" }
    ]
  },
  { 
    id: 3, 
    title: "Enterprise RAG Microservices Suite", 
    desc: "5 domain RAG microservices with NLQ-to-SQL pipelines, Semantic Kernel tool calling, hybrid vector/metadata search, and multi-turn context.", 
    icon: <Boxes size={24}/>,
    tags: ["FastAPI", "Semantic Kernel", "ChromaDB", "LangGraph"],
    isEnterprise: true,
    problem: "Disparate enterprise databases and unstructured documentation across 5 business domains required unified, secure conversational search with context persistence.",
    architecture: [
      { step: "01. Gateway Routing", detail: "FastAPI gateway with CredHub secret management on Cloud Foundry." },
      { step: "02. NLQ-to-SQL & Vectors", detail: "LangGraph pipelines generate T-SQL queries; ChromaDB executes hybrid vector search." },
      { step: "03. Semantic Kernel Tools", detail: "Multi-system routing and autonomous tool-calling across internal databases." },
      { step: "04. Context Rewriting", detail: "Standalone query rewriting engine supporting 6+ follow-up operation types." }
    ],
    highlights: [
      "Engineered 8 production RAG microservices deployed on Cloud Foundry / TAS.",
      "Multi-turn context rewriting handling filters, aggregations, and pagination follow-ups.",
      "Hybrid dense/sparse vector retrieval with ChromaDB and pgvector metadata filtering.",
      "Fully integrated CI/CD pipelines with GitLab CI and CredHub secret management."
    ],
    metrics: [
      { label: "Microservices", val: "8 Services" },
      { label: "Operations", val: "6+ Follow-ups" },
      { label: "Deployment", val: "Cloud Foundry / TAS" },
      { label: "Security", val: "CredHub Secrets" }
    ]
  },
  { 
    id: 4, 
    title: "Outfit Suggestion Website", 
    desc: "Fashion recommendation engine combining NLP and image recognition with LLM trend analysis for personalized, context-aware style exploration.", 
    icon: <Sparkles size={24}/>,
    tags: ["Python", "TensorFlow", "JavaScript", "NLP"],
    github: "https://github.com/d33pe8h-j4a/Flipkar-Grid",
    problem: "Traditional e-commerce filtering relies on static categories, lacking contextual intelligence to suggest cohesive outfits based on user preferences, occasions, and seasonal trends.",
    architecture: [
      { step: "01. Multimodal Intake", detail: "Processes user text inputs, style preferences, and uploaded clothing images." },
      { step: "02. Computer Vision", detail: "TensorFlow image recognition categorizes apparel colors, patterns, and cuts." },
      { step: "03. Trend Engine", detail: "LLM-based trend analysis engine scores outfit pairing compatibility." },
      { step: "04. Interactive Web UI", detail: "Dynamic frontend for real-time style exploration and outfit composition." }
    ],
    highlights: [
      "Multimodal recommendation system combining NLP text analysis with deep learning vision models.",
      "Dynamic outfit compatibility scoring based on color theory and current fashion trends.",
      "Interactive web UI built for intuitive drag-and-drop style exploration.",
      "Contributed to the core recommendation pipeline and frontend integration."
    ],
    metrics: [
      { label: "Type", val: "Multimodal AI" },
      { label: "Vision", val: "TensorFlow" },
      { label: "Frontend", val: "Interactive JS" },
      { label: "Source", val: "Open Source" }
    ]
  },
  { 
    id: 5, 
    title: "Money Tracker (Android / Fintech)", 
    desc: "SMS-first Android money tracker with event-driven debit/credit parsing, local-first Room DB, and automated WorkManager recurring subscription scans.", 
    icon: <Smartphone size={24}/>,
    tags: ["Kotlin", "Jetpack Compose", "Room DB", "Android"],
    github: "https://github.com/soumil-konar/money-Tracker",
    problem: "Users struggle to track personal finances manually; existing apps often require invasive bank credentials or suffer from poor offline reliability.",
    architecture: [
      { step: "01. SMS Ingestion", detail: "Event-driven Android broadcast receiver captures transactional SMS in real time." },
      { step: "02. Regex/NLP Parser", detail: "Parses Indian bank formats for amounts, merchants, accounts, and balance updates." },
      { step: "03. Local-First Room DB", detail: "Persists transactions, budgets, and accounts locally with 100% offline support." },
      { step: "04. WorkManager Scans", detail: "Daily background workers analyze transaction patterns to detect recurring subscriptions." }
    ],
    highlights: [
      "Built with 100% Kotlin and modern Jetpack Compose declarative UI architecture.",
      "Event-driven SMS ingestion with duplicate transaction detection and low-confidence review queues.",
      "Local-first privacy architecture: all personal financial data remains strictly on-device.",
      "Automated recurring bill and subscription detection powered by Android WorkManager."
    ],
    metrics: [
      { label: "Platform", val: "Android Native" },
      { label: "UI Framework", val: "Jetpack Compose" },
      { label: "Storage", val: "Local Room DB" },
      { label: "Privacy", val: "100% On-Device" }
    ]
  },
  { 
    id: 6, 
    title: "K-Means Image Segmentation", 
    desc: "Full-stack computer vision application clustering and segmenting images into K color clusters with client-server architecture.", 
    icon: <ScanFace size={24}/>,
    tags: ["Python", "OpenCV", "Clustering", "Computer Vision"],
    github: "https://github.com/soumil-konar/image-segmentation",
    problem: "Segmenting complex images into quantized color palettes for digital art and compression often requires heavy workstation software.",
    architecture: [
      { step: "01. Image Upload", detail: "Client uploads image and specifies target cluster count K." },
      { step: "02. Color Space Transform", detail: "Extracts RGB/HSV color vectors for pixel-level clustering." },
      { step: "03. K-Means Algorithm", detail: "Iterative centroid optimization computes representative color palettes." },
      { step: "04. Output Rendering", detail: "Reconstructs segmented image with quantized palette previews." }
    ],
    highlights: [
      "Clean client-server architecture with Python OpenCV backend processing.",
      "High-performance pixel-level K-Means vector quantization and clustering.",
      "Interactive controls for real-time K parameter tuning and palette extraction.",
      "Lightweight web interface for instant visual comparison."
    ],
    metrics: [
      { label: "Algorithm", val: "K-Means Clustering" },
      { label: "Library", val: "OpenCV / NumPy" },
      { label: "Processing", val: "Client-Server" },
      { label: "Source", val: "Open Source" }
    ]
  },
  { 
    id: 7, 
    title: "Enterprise RAG System", 
    desc: "Scalable vector search architecture processing 1M+ docs with high-precision retrieval.", 
    icon: <Database size={24}/>,
    tags: ["Vector DB", "LLMs", "Python"],
    isEnterprise: true,
    problem: "Searching across 1M+ technical documentation pages using keyword matching yielded low relevance and missed semantic context.",
    architecture: [
      { step: "01. Document Chunking", detail: "Custom recursive character chunking preserving table structures." },
      { step: "02. Embedding Pipeline", detail: "Generates high-dimensional vector embeddings via sentence-transformers." },
      { step: "03. Vector Indexing", detail: "Hierarchical Navigable Small World (HNSW) index in pgvector / ChromaDB." },
      { step: "04. Re-ranking & Synthesis", detail: "Cross-encoder re-ranking followed by LLM context injection." }
    ],
    highlights: [
      "Scalable vector search architecture indexing 1,000,000+ technical documents.",
      "Custom semantic chunking strategy preserving tables, code blocks, and headers.",
      "Cross-encoder re-ranking to boost top-3 retrieval precision by 35%.",
      "Sub-200ms semantic lookup latency under concurrent search load."
    ],
    metrics: [
      { label: "Corpus Size", val: "1M+ Documents" },
      { label: "Precision", val: "+35% via Re-rank" },
      { label: "Latency", val: "< 200ms" },
      { label: "Index", val: "HNSW Vector Index" }
    ]
  },
  { 
    id: 8, 
    title: "AI Query Agent", 
    desc: "LLM-based agent reducing customer resolution time by 40% through autonomous reasoning.", 
    icon: <Cpu size={24}/>,
    tags: ["Agentic AI", "Prompt Eng", "Node.js"],
    isEnterprise: true,
    problem: "Support teams were overloaded with repetitive troubleshooting inquiries requiring multi-system lookups.",
    architecture: [
      { step: "01. Query Intake", detail: "Natural language customer issue classification." },
      { step: "02. Tool Execution", detail: "Autonomous function calling to query logs, APIs, and user records." },
      { step: "03. Resolution Planning", detail: "ReAct reasoning loop iteratively verifying system states." },
      { step: "04. Output Formatting", detail: "Step-by-step diagnostic resolution sent to customer and CRM." }
    ],
    highlights: [
      "Autonomous ReAct reasoning loop with safe tool-calling boundaries.",
      "Integration with CRM and telemetry APIs for automated log diagnostics.",
      "Reduced average first-response resolution time by 40%.",
      "Built-in human-in-the-loop escalation for edge cases."
    ],
    metrics: [
      { label: "Resolution", val: "40% Faster" },
      { label: "Pattern", val: "ReAct Agent" },
      { label: "Tools", val: "APIs & CRM" },
      { label: "Automation", val: "End-to-End" }
    ]
  },
  { 
    id: 9, 
    title: "Backend Microservices", 
    desc: "High-throughput services handling concurrent streaming connections and secure enterprise workloads.", 
    icon: <Server size={24}/>,
    tags: ["Microservices", "REST APIs", "Docker"],
    isEnterprise: true,
    problem: "Legacy monolith struggled with concurrent streaming payloads and decoupled service deployments.",
    architecture: [
      { step: "01. API Gateway", detail: "Reverse proxy routing with JWT authentication and rate limiting." },
      { step: "02. Worker Nodes", detail: "Stateless Node.js microservices handling streaming data." },
      { step: "03. Message Queue", detail: "Async event dispatching for decoupled background workloads." },
      { step: "04. Container Engine", detail: "Docker containerization with automated health monitoring." }
    ],
    highlights: [
      "High-throughput architecture supporting concurrent streaming workloads.",
      "Modular Dockerized microservices with zero-downtime deployment capabilities.",
      "Robust error-handling, rate-limiting, and distributed tracing.",
      "Comprehensive unit and integration test suites."
    ],
    metrics: [
      { label: "Throughput", val: "High Concurrent" },
      { label: "Architecture", val: "Microservices" },
      { label: "Deployment", val: "Docker Containers" },
      { label: "Uptime", val: "99.9% Reliable" }
    ]
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