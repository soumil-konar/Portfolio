// src/components/GradientMesh.jsx
import React, { useEffect, useRef } from 'react';

const GradientMesh = ({ isDarkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    let animationFrameId;
    let time = 0;

    let lastWidth = 0;
    let lastHeight = 0;

    // Mouse tracking for subtle synaptic interaction (dark mode only)
    let mouse = { x: -1000, y: -1000, radius: 170 };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave, { passive: true });

    // Neural Constellation Nodes for Dark Mode
    let nodes = [];
    const initNodes = (w, h) => {
      if (w <= 0 || h <= 0) return;
      const count = Math.min(50, Math.floor((w * h) / 26000));
      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          baseRadius: Math.random() * 1.5 + 1.0,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const resizeCanvas = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      if (lastWidth === 0 || newWidth !== lastWidth || Math.abs(newHeight - lastHeight) > 80) {
        lastWidth = newWidth;
        lastHeight = newHeight;
        canvas.width = newWidth;
        canvas.height = newHeight;
        if (isDarkMode) {
          initNodes(newWidth, newHeight);
        }
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Deep Dark Mode Blobs (Obsidian + Bioluminescent Indigo/Blue)
    const darkBlobs = [
      { x: 0.25, y: 0.3, radius: 0.5, speedX: 0.00015, speedY: 0.00012, color: '#1e1b4b' },
      { x: 0.75, y: 0.65, radius: 0.55, speedX: -0.00014, speedY: 0.00016, color: '#172554' },
      { x: 0.5, y: 0.85, radius: 0.45, speedX: 0.00012, speedY: -0.00012, color: '#1e293b' },
    ];

    // Elegant, Luminous Light Mode Blobs (Soft Alabaster, Warm Pearl, Silky Indigo/Lavender Mist)
    const lightBlobs = [
      { x: 0.2, y: 0.2, radius: 0.55, speedX: 0.0001, speedY: 0.00008, color: '#e0e7ff' }, // Soft Indigo Mist
      { x: 0.8, y: 0.6, radius: 0.6, speedX: -0.00008, speedY: 0.0001, color: '#f3e8ff' },  // Soft Lavender Aura
      { x: 0.5, y: 0.85, radius: 0.5, speedX: 0.00008, speedY: -0.00008, color: '#e0f2fe' }, // Soft Cyan Mist
    ];

    const animate = () => {
      time += 0.005;
      const w = canvas.width;
      const h = canvas.height;

      if (w === 0 || h === 0) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      // Base Background Fill (Deep Obsidian in Dark, Warm Porcelain in Light)
      ctx.fillStyle = isDarkMode ? '#07090e' : '#fcfcfd';
      ctx.fillRect(0, 0, w, h);

      // 1. Ambient Volumetric Glow Blobs
      const blobs = isDarkMode ? darkBlobs : lightBlobs;
      blobs.forEach((blob) => {
        const posX = (blob.x + Math.sin(time * blob.speedX * 100) * 0.1) * w;
        const posY = (blob.y + Math.cos(time * blob.speedY * 100) * 0.1) * h;
        const radius = blob.radius * Math.min(w, h);

        const gradient = ctx.createRadialGradient(posX, posY, 0, posX, posY, radius);
        gradient.addColorStop(0, isDarkMode ? `${blob.color}80` : `${blob.color}90`);
        gradient.addColorStop(0.5, isDarkMode ? `${blob.color}30` : `${blob.color}35`);
        gradient.addColorStop(1, isDarkMode ? `${blob.color}00` : `${blob.color}00`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      });

      // 2. Neural Embedding Synaptic Graph (Render ONLY in Dark Mode to keep Light Mode clean & pristine)
      if (isDarkMode) {
        const maxDist = 120;
        const nodeColor = 'rgba(129, 140, 248,';
        const lineColor = 'rgba(99, 102, 241,';

        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];

          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;

          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const distToMouse = Math.sqrt(dx * dx + dy * dy);
          if (distToMouse < mouse.radius && distToMouse > 0) {
            const force = (mouse.radius - distToMouse) / mouse.radius * 0.35;
            n.x -= (dx / distToMouse) * force;
            n.y -= (dy / distToMouse) * force;
          }

          for (let j = i + 1; j < nodes.length; j++) {
            const n2 = nodes[j];
            const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * 0.15;
              ctx.strokeStyle = `${lineColor}${alpha})`;
              ctx.lineWidth = 0.75;
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.stroke();
            }
          }

          const pulse = Math.sin(time * 2 + n.phase) * 0.3 + 0.7;
          ctx.fillStyle = `${nodeColor}${0.35 * pulse})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.baseRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      style={{ 
        mixBlendMode: 'normal',
        willChange: 'transform',
        contain: 'strict',
      }}
    />
  );
};

export default GradientMesh;
