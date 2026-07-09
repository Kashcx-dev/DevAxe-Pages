import React from 'react';

const AudioVibe = ({ isPlaying }) => {
  // This component is completely isolated as requested, so you can easily remove it later.
  if (!isPlaying) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 9998,
      background: 'linear-gradient(270deg, rgba(176,38,255,0) 0%, rgba(176,38,255,0.4) 50%, rgba(176,38,255,0) 100%)',
      backgroundSize: '200% 200%',
      animation: 'vibe-sweep 6s ease-in-out infinite',
      mixBlendMode: 'screen'
    }}>
      <style>
        {`
          @keyframes vibe-sweep {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
};

export default AudioVibe;
