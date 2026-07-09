import React, { useEffect, useRef, useState } from 'react';

const ScrollPath = () => {
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
      pathRef.current.style.strokeDasharray = length;
      pathRef.current.style.strokeDashoffset = length;
    }

    const handleScroll = () => {
      if (!pathRef.current) return;
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = windowHeight === 0 ? 0 : totalScroll / windowHeight;
      
      const drawLength = pathLength * scrollPercentage;
      pathRef.current.style.strokeDashoffset = pathLength - drawLength;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathLength]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999 }}>
      {/* 
        A faint background track to show the path ahead of time (optional, but looks cool) 
      */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.1 }}>
        <path
          d="M 15 0 C 40 15, 85 15, 85 30 C 85 45, 15 45, 15 60 C 15 75, 85 75, 85 90 C 85 95, 50 100, 50 100"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* 
        The active scroll-drawn neon line 
      */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <path
          ref={pathRef}
          d="M 15 0 C 40 15, 85 15, 85 30 C 85 45, 15 45, 15 60 C 15 75, 85 75, 85 90 C 85 95, 50 100, 50 100"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="3"
          style={{ filter: 'drop-shadow(0 0 10px rgba(0, 243, 255, 0.8))' }}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};

export default ScrollPath;
