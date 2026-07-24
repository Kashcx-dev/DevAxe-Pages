import React, { useEffect, useRef } from 'react';

const ParticleNetwork = ({ analyser, isMusicPlaying }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const PARTICLE_COUNT = 80;
    const CONNECTION_DISTANCE = 150;
    const MOUSE_RADIUS = 180;
    const colors = [
      'rgba(0, 243, 255, ',   // cyan
      'rgba(255, 0, 127, ',   // pink
      'rgba(157, 0, 255, ',   // purple
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const initParticles = () => {
      const particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 2 + 1,
          baseRadius: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          baseAlpha: Math.random() * 0.5 + 0.3,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
      particlesRef.current = particles;
    };
    initParticles();

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    // Smoothed audio values — lerped each frame for butter-smooth transitions
    let smoothBass = 0;
    let smoothMid = 0;
    let smoothEnergy = 0;
    let smoothConnectionDist = CONNECTION_DISTANCE;
    let smoothLineWidth = 0.5;
    let smoothGlowMultiplier = 3;

    const LERP_SPEED = 0.08; // How fast values interpolate (0.01=very slow, 0.2=fast)
    const LERP_FAST = 0.12;  // Slightly faster for things that should be snappier

    const lerp = (current, target, speed) => current + (target - current) * speed;

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Raw audio reactivity
      let rawBass = 0;
      let rawMid = 0;
      let rawEnergy = 0;
      
      if (analyser && isMusicPlaying) {
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);
        
        // Bass (first 10 bins)
        for (let i = 0; i < 10; i++) {
          rawBass += dataArray[i];
        }
        rawBass = rawBass / (10 * 255);

        // Mids (bins 10-40)
        for (let i = 10; i < 40; i++) {
          rawMid += dataArray[i];
        }
        rawMid = rawMid / (30 * 255);

        // Overall energy
        for (let i = 0; i < dataArray.length; i++) {
          rawEnergy += dataArray[i];
        }
        rawEnergy = rawEnergy / (dataArray.length * 255);
      }

      // Interpolate all audio values smoothly
      smoothBass = lerp(smoothBass, rawBass, LERP_SPEED);
      smoothMid = lerp(smoothMid, rawMid, LERP_SPEED);
      smoothEnergy = lerp(smoothEnergy, rawEnergy, LERP_SPEED);

      // Interpolate derived values
      const targetConnectionDist = CONNECTION_DISTANCE + rawBass * 80;
      smoothConnectionDist = lerp(smoothConnectionDist, targetConnectionDist, LERP_SPEED);

      const targetLineWidth = 0.5 + rawBass * 1.5;
      smoothLineWidth = lerp(smoothLineWidth, targetLineWidth, LERP_SPEED);

      const targetGlowMultiplier = 3 + rawBass * 4;
      smoothGlowMultiplier = lerp(smoothGlowMultiplier, targetGlowMultiplier, LERP_SPEED);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse interaction — magnetic push/pull
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * 0.3;
          p.vy -= Math.sin(angle) * force * 0.3;
        }

        // Audio reactivity — smooth jitter with interpolated bass
        if (smoothBass > 0.15) {
          p.vx += (Math.random() - 0.5) * smoothBass * 1.2;
          p.vy += (Math.random() - 0.5) * smoothBass * 1.2;
        }

        // Audio-reactive radius — lerp towards target instead of snapping
        const targetRadius = p.baseRadius + smoothBass * 3 + smoothMid * 1.5;
        p.radius = lerp(p.radius, targetRadius, LERP_FAST);

        // Apply velocity with damping
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Pulsing alpha — enhanced by smoothed audio
        const audioAlphaBoost = smoothEnergy * 0.3;
        const alpha = p.baseAlpha + Math.sin(time * 2 + p.pulseOffset) * 0.15 + audioAlphaBoost;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.min(alpha, 1) + ')';
        ctx.fill();

        // Glow — smoothly interpolated
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * smoothGlowMultiplier, 0, Math.PI * 2);
        ctx.fillStyle = p.color + (Math.min(alpha, 1) * 0.15) + ')';
        ctx.fill();

        // Draw connections — smoothed distance and width
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < smoothConnectionDist) {
            const lineAlpha = (1 - cdist / smoothConnectionDist) * (0.25 + smoothEnergy * 0.3);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 243, 255, ${lineAlpha})`;
            ctx.lineWidth = smoothLineWidth;
            ctx.stroke();
          }
        }

        // Draw connection to mouse if close
        if (dist < MOUSE_RADIUS * 1.5 && dist > 0) {
          const lineAlpha = (1 - dist / (MOUSE_RADIUS * 1.5)) * 0.4;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255, 0, 127, ${lineAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [analyser, isMusicPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className="particle-network-canvas"
    />
  );
};

export default ParticleNetwork;
