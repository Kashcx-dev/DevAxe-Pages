import React from 'react';

const AudioVibe = ({ isPlaying }) => {
  // This component is completely isolated as requested, so you can easily remove it later.
  if (!isPlaying) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 0, // Sits right behind the text but above the background
      background: 'radial-gradient(circle at center, rgba(176, 38, 255, 0.12) 0%, transparent 60%)',
      animation: 'vibe-pulse 2s infinite alternate ease-in-out',
      mixBlendMode: 'screen'
    }}>
      <style>
        {`
          @keyframes vibe-pulse {
            0% { transform: scale(1); opacity: 0.3; }
            100% { transform: scale(1.2); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default AudioVibe;
