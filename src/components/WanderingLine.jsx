import React, { useEffect, useRef } from 'react';

const WanderingLine = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let vx = Math.random() * 4 - 2;
    let vy = Math.random() * 4 - 2;

    const draw = () => {
      // Fade effect to create the trail
      ctx.fillStyle = 'rgba(5, 5, 5, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Randomly alter velocity
      vx += Math.random() * 0.4 - 0.2;
      vy += Math.random() * 0.4 - 0.2;

      // Limit speed
      const speed = Math.sqrt(vx * vx + vy * vy);
      if (speed > 2.5) {
        vx = (vx / speed) * 2.5;
        vy = (vy / speed) * 2.5;
      }

      // Bounce off walls softly
      if (x < 0 || x > canvas.width) vx *= -1.5;
      if (y < 0 || y > canvas.height) vy *= -1.5;

      ctx.beginPath();
      ctx.moveTo(x, y);
      x += vx;
      y += vy;
      ctx.lineTo(x, y);
      
      // Cyberpunk neon style
      ctx.strokeStyle = '#00f3ff';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#00f3ff';
      ctx.stroke();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0.6
      }}
    />
  );
};

export default WanderingLine;
