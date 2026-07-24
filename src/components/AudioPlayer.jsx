import React, { useRef, useState, useEffect, useCallback } from 'react';

const AudioPlayer = ({ onPlayStateChange, onAnalyserReady }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const hasSetupAudio = useRef(false);

  const setupAudioContext = useCallback(() => {
    if (hasSetupAudio.current || !audioRef.current) return;
    
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      
      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      sourceRef.current = source;
      hasSetupAudio.current = true;
      
      if (onAnalyserReady) {
        onAnalyserReady(analyser);
      }
    } catch (e) {
      console.log('Audio context setup failed:', e);
    }
  }, [onAnalyserReady]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().then(() => {
        setupAudioContext();
      }).catch(e => {
        console.log("Audio play blocked by browser:", e);
        setIsPlaying(false);
        if (onPlayStateChange) onPlayStateChange(false);
      });
    }
  }, [onPlayStateChange, setupAudioContext]);

  const togglePlay = () => {
    if (audioRef.current) {
      // Setup audio context on first user interaction (required by browsers)
      setupAudioContext();
      
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log(e));
      }
      
      setIsPlaying(!isPlaying);
      if (onPlayStateChange) {
        onPlayStateChange(!isPlaying);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} loop src="/background.mp3" crossOrigin="anonymous" />
      <button 
        onClick={togglePlay}
        className="audio-toggle-btn"
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
          zIndex: 10001,
          boxShadow: isPlaying ? '0 0 20px var(--neon-cyan)' : '0 0 10px rgba(0, 243, 255, 0.2)',
          transition: 'all 0.3s ease',
          fontSize: '24px',
          cursor: 'pointer',
        }}
        title="Toggle Background Music"
      >
        {isPlaying ? '🔊' : '🔈'}
      </button>
    </>
  );
};

export default AudioPlayer;
