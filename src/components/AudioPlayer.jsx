import React, { useRef, useState, useEffect } from 'react';

const AudioPlayer = ({ onPlayStateChange }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.15; // Kept the volume low as requested
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Handle promise in case browser blocks autoplay
        audioRef.current.play().catch(e => console.log("Audio play blocked by browser:", e));
      }
      
      setIsPlaying(!isPlaying);
      if (onPlayStateChange) {
        onPlayStateChange(!isPlaying);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} loop src="/background.mp3" />
      <button 
        onClick={togglePlay}
        style={{
          position: 'fixed',
          bottom: '25px',
          left: '25px',
          width: '55px',
          height: '55px',
          borderRadius: '50%',
          backgroundColor: isPlaying ? 'var(--neon-cyan)' : 'rgba(10, 10, 10, 0.8)',
          border: `2px solid ${isPlaying ? '#fff' : 'var(--neon-cyan)'}`,
          color: isPlaying ? '#000' : 'var(--neon-cyan)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10000,
          boxShadow: isPlaying ? '0 0 20px var(--neon-cyan)' : '0 0 10px rgba(0, 243, 255, 0.2)',
          transition: 'all 0.3s ease',
          fontSize: '24px'
        }}
        title="Toggle Background Music"
      >
        {isPlaying ? '🔊' : '🔈'}
      </button>
    </>
  );
};

export default AudioPlayer;
