import React, { useEffect, useRef, useState } from 'react';

const CursorGlow = () => {
  const glowRef = useRef(null);
  const trailRef = useRef([]);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    // Check for touch device — disable cursor glow on mobile
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const TRAIL_LENGTH = 12;

    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cyber-btn') ||
        target.classList.contains('track-card') ||
        target.classList.contains('prize-card') ||
        target.classList.contains('faq-item');
      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    const animate = () => {
      const glow = glowRef.current;
      if (!glow) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // Ease towards target
      const ease = 0.15;
      posRef.current.x += (targetRef.current.x - posRef.current.x) * ease;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * ease;

      // Update trail
      trailRef.current.unshift({ x: posRef.current.x, y: posRef.current.y });
      if (trailRef.current.length > TRAIL_LENGTH) {
        trailRef.current.pop();
      }

      glow.style.left = `${posRef.current.x}px`;
      glow.style.top = `${posRef.current.y}px`;

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Don't render on touch devices
  const isTouchDevice = typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  if (isTouchDevice) return null;

  return (
    <div
      ref={glowRef}
      className={`cursor-glow ${isHovering ? 'cursor-glow--active' : ''}`}
    />
  );
};

export default CursorGlow;
