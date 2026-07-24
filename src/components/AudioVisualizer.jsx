import React, { useEffect, useRef } from 'react';

const AudioVisualizer = ({ analyser, isPlaying }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Hi-DPI support
    const size = 200;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const centerX = size / 2;
    const centerY = size / 2;
    const innerRadius = 36;
    const barCount = 64;
    const maxBarHeight = 45;

    const animate = () => {
      ctx.clearRect(0, 0, size, size);

      let dataArray;
      let avgAmplitude = 0;

      if (analyser && isPlaying) {
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);
        
        // Calculate average amplitude for the bass pulse
        for (let i = 0; i < bufferLength; i++) {
          avgAmplitude += dataArray[i];
        }
        avgAmplitude = avgAmplitude / bufferLength / 255;
      }

      // Draw circular frequency bars
      for (let i = 0; i < barCount; i++) {
        const angle = (i / barCount) * Math.PI * 2 - Math.PI / 2;
        
        let barHeight;
        if (dataArray && isPlaying) {
          // Map bar index to frequency data
          const dataIndex = Math.floor((i / barCount) * (dataArray.length * 0.7));
          barHeight = (dataArray[dataIndex] / 255) * maxBarHeight;
        } else {
          // Idle animation — gentle wave
          barHeight = 3 + Math.sin(Date.now() * 0.002 + i * 0.3) * 2;
        }

        const x1 = centerX + Math.cos(angle) * innerRadius;
        const y1 = centerY + Math.sin(angle) * innerRadius;
        const x2 = centerX + Math.cos(angle) * (innerRadius + barHeight);
        const y2 = centerY + Math.sin(angle) * (innerRadius + barHeight);

        // Color based on frequency — low=cyan, mid=pink, high=purple
        const hue = (i / barCount) * 120 + 170; // 170-290 range (cyan to purple)
        const saturation = 100;
        const lightness = 55 + (barHeight / maxBarHeight) * 20;
        const alpha = 0.6 + (barHeight / maxBarHeight) * 0.4;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Glow effect for louder bars
        if (barHeight > maxBarHeight * 0.5) {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha * 0.3})`;
          ctx.lineWidth = 5;
          ctx.stroke();
        }
      }

      // Draw inner ring
      const ringAlpha = isPlaying ? 0.3 + avgAmplitude * 0.5 : 0.15;
      ctx.beginPath();
      ctx.arc(centerX, centerY, innerRadius - 2, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 243, 255, ${ringAlpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Outer glow ring that pulses with music
      if (isPlaying && avgAmplitude > 0.1) {
        const glowRadius = innerRadius + maxBarHeight + avgAmplitude * 15;
        ctx.beginPath();
        ctx.arc(centerX, centerY, glowRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 243, 255, ${avgAmplitude * 0.15})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [analyser, isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className="audio-visualizer-canvas"
    />
  );
};

// Bass pulse overlay that throbs with the music
const BassPulseOverlay = ({ analyser, isPlaying }) => {
  const overlayRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!analyser || !isPlaying) {
      if (overlayRef.current) {
        overlayRef.current.style.opacity = '0';
      }
      return;
    }

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const animate = () => {
      analyser.getByteFrequencyData(dataArray);

      // Focus on bass frequencies (first 10 bins)
      let bass = 0;
      for (let i = 0; i < 10; i++) {
        bass += dataArray[i];
      }
      bass = bass / (10 * 255);

      if (overlayRef.current) {
        // Subtle vignette pulse on bass hits
        const intensity = Math.pow(bass, 1.5) * 0.15;
        overlayRef.current.style.opacity = String(intensity);
        overlayRef.current.style.boxShadow = `inset 0 0 ${100 + bass * 200}px ${40 + bass * 80}px rgba(0, 243, 255, ${intensity * 0.5}), inset 0 0 ${60 + bass * 120}px ${20 + bass * 40}px rgba(255, 0, 127, ${intensity * 0.3})`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [analyser, isPlaying]);

  return (
    <div
      ref={overlayRef}
      className="bass-pulse-overlay"
    />
  );
};

export { AudioVisualizer, BassPulseOverlay };
