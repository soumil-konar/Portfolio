import React, { useEffect, useRef, useState, useMemo } from 'react';

/**
 * High-Performance WebGL Particle Dispersion Portal
 * Inspired by the bespoke quantum point dispersal shader on spragadheeshraj.com.
 * When hovering over projects, particles disperse and gather dynamically tracking the cursor.
 */
const ProjectParticlePortal = ({ activeProject, mousePos, isDarkMode }) => {
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const texturesRef = useRef({});
  const animFrameRef = useRef(null);
  const progressRef = useRef(1.0);
  const targetProgressRef = useRef(1.0);
  const currentPosRef = useRef({ x: 0, y: 0 });
  const [hasWebGL, setHasWebGL] = useState(true);

  // Generate SVG-based procedural technical architecture blueprint textures
  const projectTexturesData = useMemo(() => {
    return {
      1: {
        title: 'Multi-Hop GraphRAG Engine',
        subtitle: 'LangGraph 4-Node StateGraph',
        accent: '#f59e0b',
        code: 'MATCH (a:Assembly)-[:DEPENDS_ON*1..3]->(m:Milestone)',
        type: 'DETERMINISTIC GRAPH',
      },
      2: {
        title: 'Dual Model Context Protocol',
        subtitle: 'Anthropic MCP 1.0 Servers',
        accent: '#38bdf8',
        code: 'mcp.registerTool("cypher_traverse", neo4j_handler)',
        type: 'TOOL PROTOCOL',
      },
      3: {
        title: 'Enterprise RAG Suite',
        subtitle: 'FastAPI + Semantic Kernel',
        accent: '#10b981',
        code: 'hnsw_index.query(vector, top_k=10, filter={"auth": "L3"})',
        type: 'HYBRID SEARCH',
      },
      4: {
        title: 'Multimodal Vision Engine',
        subtitle: 'TensorFlow + LLM Trends',
        accent: '#ec4899',
        code: 'tensor.forward(rgb_features) -> outfit_compatibility_score',
        type: 'COMPUTER VISION',
      },
      5: {
        title: 'Local-First Money Tracker',
        subtitle: 'Kotlin + Room Database',
        accent: '#8b5cf6',
        code: 'WorkManager.enqueueUniqueWork("scan_recurring_bills")',
        type: 'ANDROID FINTECH',
      },
      6: {
        title: 'K-Means Color Segmentation',
        subtitle: 'OpenCV Pixel Clustering',
        accent: '#f97316',
        code: 'cv2.kmeans(pixel_matrix, K=8, criteria=TERM_CRITERIA)',
        type: 'VECTOR QUANTIZATION',
      },
    };
  }, []);

  // Update target progress when active project changes
  useEffect(() => {
    if (activeProject) {
      targetProgressRef.current = 0.0; // gather particles
    } else {
      targetProgressRef.current = 1.0; // disperse particles
    }
  }, [activeProject]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl = null;
    try {
      gl = canvas.getContext('webgl', { alpha: true, antialias: false });
    } catch {
      setHasWebGL(false);
      return;
    }

    if (!gl) {
      setHasWebGL(false);
      return;
    }
    glRef.current = gl;

    // Compile Shaders
    const vsSource = `
      attribute vec2 aUv;
      attribute vec2 aRandom;

      uniform float uProgress;
      uniform float uPointSize;

      varying vec2 vUv;
      varying float vAlpha;

      void main() {
        vUv = aUv;
        vec2 base = (aUv - 0.5) * 2.0;

        float angle = aRandom.x * 6.2831853;
        float radius = 0.4 + aRandom.y * 1.6;
        vec2 scatter = vec2(cos(angle), sin(angle)) * radius;

        float delay = aRandom.y * 0.35;
        float t = clamp((uProgress - delay) / (1.0 - delay + 0.001), 0.0, 1.0);
        float ease = t * t * (3.0 - 2.0 * t);

        vec2 pos = mix(base, scatter, ease);
        vAlpha = 1.0 - ease;

        gl_Position = vec4(pos, 0.0, 1.0);
        gl_PointSize = uPointSize * (1.0 - ease * 0.3);
      }
    `;

    const fsSource = `
      precision mediump float;
      uniform sampler2D uTexture;
      varying vec2 vUv;
      varying float vAlpha;

      void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);
        if (length(coord) > 0.5) discard;

        vec4 col = texture2D(uTexture, vUv);
        gl_FragColor = vec4(col.rgb, col.a * vAlpha);
      }
    `;

    const createShader = (type, source) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, source);
      gl.compileShader(s);
      return s;
    };

    const vert = createShader(gl.VERTEX_SHADER, vsSource);
    const frag = createShader(gl.FRAGMENT_SHADER, fsSource);
    const program = gl.createProgram();
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    gl.useProgram(program);
    programRef.current = program;

    // Grid of points: 80 x 60 = 4800 points
    const COLS = 80;
    const ROWS = 60;
    const COUNT = COLS * ROWS;
    const aUv = new Float32Array(COUNT * 2);
    const aRandom = new Float32Array(COUNT * 2);

    let idx = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        aUv[idx * 2] = c / (COLS - 1);
        aUv[idx * 2 + 1] = 1.0 - r / (ROWS - 1); // Flip Y
        aRandom[idx * 2] = Math.random();
        aRandom[idx * 2 + 1] = Math.random();
        idx++;
      }
    }

    const uvBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
    gl.bufferData(gl.ARRAY_BUFFER, aUv, gl.STATIC_DRAW);
    const aUvLoc = gl.getAttribLocation(program, 'aUv');
    gl.enableVertexAttribArray(aUvLoc);
    gl.vertexAttribPointer(aUvLoc, 2, gl.FLOAT, false, 0, 0);

    const randBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, randBuf);
    gl.bufferData(gl.ARRAY_BUFFER, aRandom, gl.STATIC_DRAW);
    const aRandLoc = gl.getAttribLocation(program, 'aRandom');
    gl.enableVertexAttribArray(aRandLoc);
    gl.vertexAttribPointer(aRandLoc, 2, gl.FLOAT, false, 0, 0);

    // Pre-render procedural textures onto 2D canvas and convert to WebGL textures
    Object.keys(projectTexturesData).forEach((id) => {
      const data = projectTexturesData[id];
      const offscreen = document.createElement('canvas');
      offscreen.width = 340;
      offscreen.height = 240;
      const ctx = offscreen.getContext('2d');

      // Background obsidian card
      ctx.fillStyle = '#08080a';
      ctx.fillRect(0, 0, offscreen.width, offscreen.height);

      // Subtle cybernetic grid
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      for (let x = 0; x < offscreen.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, offscreen.height);
        ctx.stroke();
      }
      for (let y = 0; y < offscreen.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(offscreen.width, y);
        ctx.stroke();
      }

      // Border glow
      ctx.strokeStyle = data.accent;
      ctx.lineWidth = 3;
      ctx.strokeRect(4, 4, offscreen.width - 8, offscreen.height - 8);

      // System Tag
      ctx.fillStyle = data.accent;
      ctx.font = 'bold 10px monospace';
      ctx.fillText(`// SYSTEM_ID: 0${id} • ${data.type}`, 16, 28);

      // Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText(data.title, 16, 60);

      // Subtitle
      ctx.fillStyle = '#a1a1aa';
      ctx.font = '12px monospace';
      ctx.fillText(data.subtitle, 16, 84);

      // Code Terminal preview box
      ctx.fillStyle = '#141418';
      ctx.fillRect(16, 110, offscreen.width - 32, 70);
      ctx.strokeStyle = '#27272a';
      ctx.strokeRect(16, 110, offscreen.width - 32, 70);

      ctx.fillStyle = '#fbbf24';
      ctx.font = '10px monospace';
      ctx.fillText('> DISPATCH TRACE:', 26, 130);

      ctx.fillStyle = '#71717a';
      ctx.font = '9px monospace';
      ctx.fillText(data.code.slice(0, 42), 26, 150);
      if (data.code.length > 42) {
        ctx.fillText(data.code.slice(42, 85), 26, 166);
      }

      // Telemetry Status Dot
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(28, 206, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#d4d4d8';
      ctx.font = '10px monospace';
      ctx.fillText('PRODUCTION TELEMETRY ACTIVE (100%)', 40, 210);

      // Upload texture to WebGL
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, offscreen);

      texturesRef.current[id] = tex;
    });

    // Default neutral texture
    if (texturesRef.current[1]) {
      gl.bindTexture(gl.TEXTURE_2D, texturesRef.current[1]);
    }

    // Render loop
    const loop = () => {
      animFrameRef.current = requestAnimationFrame(loop);

      // Smooth progress lerp
      const target = targetProgressRef.current;
      const speed = target === 0.0 ? 0.09 : 0.06;
      progressRef.current += (target - progressRef.current) * speed;

      // Smooth cursor lerp
      const targetX = mousePos ? mousePos.x : window.innerWidth / 2;
      const targetY = mousePos ? mousePos.y : window.innerHeight / 2;
      currentPosRef.current.x += (targetX - currentPosRef.current.x) * 0.12;
      currentPosRef.current.y += (targetY - currentPosRef.current.y) * 0.12;

      // If fully dispersed and not active, hide drawing
      if (progressRef.current > 0.99 && targetProgressRef.current === 1.0) {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        return;
      }

      // Bind active project's texture if valid
      if (activeProject && texturesRef.current[activeProject.id]) {
        gl.bindTexture(gl.TEXTURE_2D, texturesRef.current[activeProject.id]);
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      const uProgressLoc = gl.getUniformLocation(program, 'uProgress');
      gl.uniform1f(uProgressLoc, progressRef.current);

      const uPointSizeLoc = gl.getUniformLocation(program, 'uPointSize');
      gl.uniform1f(uPointSizeLoc, window.innerWidth < 768 ? 2.5 : 3.8);

      gl.drawArrays(gl.POINTS, 0, COUNT);
    };

    loop();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [projectTexturesData, mousePos, activeProject]);

  // Position portal smoothly near cursor
  const portalWidth = typeof window !== 'undefined' && window.innerWidth < 768 ? 260 : 340;
  const portalHeight = typeof window !== 'undefined' && window.innerWidth < 768 ? 180 : 240;

  let leftPos = currentPosRef.current.x + 30;
  let topPos = currentPosRef.current.y - portalHeight / 2;

  // Boundary safety check for viewport edges
  if (typeof window !== 'undefined') {
    if (leftPos + portalWidth > window.innerWidth - 20) {
      leftPos = currentPosRef.current.x - portalWidth - 30;
    }
    if (topPos < 80) topPos = 80;
    if (topPos + portalHeight > window.innerHeight - 20) {
      topPos = window.innerHeight - portalHeight - 20;
    }
  }

  // Crisp high-res image overlay fades in when particles fully coalesce
  const overlayOpacity = Math.max(0, Math.min(1, (0.35 - progressRef.current) / 0.35));

  if (!hasWebGL) return null;

  return (
    <div
      className="fixed pointer-events-none z-[80] hidden md:block transition-opacity duration-300"
      style={{
        left: `${leftPos}px`,
        top: `${topPos}px`,
        width: `${portalWidth}px`,
        height: `${portalHeight}px`,
        opacity: activeProject ? 1 : 0,
      }}
    >
      {/* WebGL Particle Points Canvas */}
      <canvas
        ref={canvasRef}
        width={340}
        height={240}
        className="w-full h-full rounded-xl overflow-hidden"
      />

      {/* High-definition crisp preview glass overlay appearing once coalesced */}
      {activeProject && (
        <div
          className={`absolute inset-0 rounded-xl border p-4 flex flex-col justify-between backdrop-blur-md shadow-2xl transition-opacity duration-200 ${
            isDarkMode
              ? 'bg-[#08080a]/90 border-amber-500/40 text-zinc-100 shadow-amber-500/10'
              : 'bg-white/95 border-amber-500/40 text-zinc-900 shadow-xl'
          }`}
          style={{ opacity: overlayOpacity }}
        >
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono mb-2">
              <span className="text-amber-500 font-bold">
                SYSTEM 0{activeProject.id} // ACTIVE
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                VERIFIED TRACE
              </span>
            </div>
            <h4 className="font-bold text-sm font-sans text-zinc-900 dark:text-white leading-snug">
              {activeProject.title}
            </h4>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
              {activeProject.desc}
            </p>
          </div>

          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[10px] font-mono">
            <span className="text-zinc-500 dark:text-zinc-400">
              {activeProject.tags ? activeProject.tags.slice(0, 2).join(' • ') : 'LangGraph'}
            </span>
            <span className="text-amber-500 font-bold flex items-center space-x-1">
              <span>View Case Study</span>
              <span>↗</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectParticlePortal;
