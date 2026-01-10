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

    // Gradient blob configuration
    const blobs = [
      { x: 0.2, y: 0.3, radius: 0.3, speedX: 0.0003, speedY: 0.0002, color1: isDarkMode ? '#4F46E5' : '#06B6D4' },
      { x: 0.7, y: 0.6, radius: 0.35, speedX: -0.0002, speedY: 0.0003, color1: isDarkMode ? '#7C3AED' : '#8B5CF6' },
      { x: 0.5, y: 0.5, radius: 0.25, speedX: 0.0002, speedY: -0.0002, color1: isDarkMode ? '#EC4899' : '#F59E0B' },
      { x: 0.8, y: 0.2, radius: 0.28, speedX: -0.0003, speedY: -0.0003, color1: isDarkMode ? '#06B6D4' : '#10B981' },
    ];

    const animate = () => {
      time += 0.01;
      
      // Clear canvas with background color
      ctx.fillStyle = isDarkMode ? '#1a202c' : '#FDFBF7';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw each blob with radial gradient
      blobs.forEach((blob, index) => {
        // Update position with smooth sine wave motion
        const posX = (blob.x + Math.sin(time * blob.speedX * 100) * 0.15) * canvas.width;
        const posY = (blob.y + Math.cos(time * blob.speedY * 100) * 0.15) * canvas.height;
        const radius = blob.radius * Math.min(canvas.width, canvas.height);

        // Create radial gradient
        const gradient = ctx.createRadialGradient(posX, posY, 0, posX, posY, radius);
        
        if (isDarkMode) {
          gradient.addColorStop(0, `${blob.color1}80`); // 50% opacity
          gradient.addColorStop(0.5, `${blob.color1}40`); // 25% opacity
          gradient.addColorStop(1, `${blob.color1}00`); // 0% opacity
        } else {
          gradient.addColorStop(0, `${blob.color1}60`); // 37.5% opacity
          gradient.addColorStop(0.5, `${blob.color1}30`); // 18.75% opacity
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
      style={{ mixBlendMode: 'normal' }}
    />
  );
};

export default GradientMesh;
