import React, { useEffect, useRef } from 'react';

const GradientMesh = ({ isDarkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Gradient blob configuration - Aesthetic colors
    const blobs = [
      { x: 0.2, y: 0.3, radius: 0.35, speedX: 0.0002, speedY: 0.00015, color1: isDarkMode ? '#1e1b4b' : '#e0e7ff' },
      { x: 0.8, y: 0.7, radius: 0.4, speedX: -0.00015, speedY: 0.0002, color1: isDarkMode ? '#312e81' : '#fce7f3' },
      { x: 0.5, y: 0.5, radius: 0.3, speedX: 0.00015, speedY: -0.00015, color1: isDarkMode ? '#1e3a8a' : '#dbeafe' },
    ];

    const animate = () => {
      time += 0.005; // Reduced from 0.01 for smoother animation
      
      // Aesthetic background colors
      ctx.fillStyle = isDarkMode ? '#0f172a' : '#fafaf9';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw each blob with radial gradient
      blobs.forEach((blob) => {
        // Update position with smooth sine wave motion
        const posX = (blob.x + Math.sin(time * blob.speedX * 100) * 0.1) * canvas.width;
        const posY = (blob.y + Math.cos(time * blob.speedY * 100) * 0.1) * canvas.height;
        const radius = blob.radius * Math.min(canvas.width, canvas.height);

        // Create radial gradient
        const gradient = ctx.createRadialGradient(posX, posY, 0, posX, posY, radius);
        
        if (isDarkMode) {
          gradient.addColorStop(0, `${blob.color1}99`); // 60% opacity
          gradient.addColorStop(0.5, `${blob.color1}4D`); // 30% opacity
          gradient.addColorStop(1, `${blob.color1}00`); // 0% opacity
        } else {
          gradient.addColorStop(0, `${blob.color1}B3`); // 70% opacity
          gradient.addColorStop(0.5, `${blob.color1}66`); // 40% opacity
          gradient.addColorStop(1, `${blob.color1}00`); // 0% opacity
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ 
        mixBlendMode: 'normal',
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)',
        contain: 'layout style paint',
      }}
    />
  );
};

export default GradientMesh;
