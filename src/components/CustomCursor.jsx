import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null; // Disable on mobile
  }

  return (
    <img 
      src="/cursor.png" 
      alt="custom-cursor"
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '40px', // Forces the image to a reasonable size even if the source is huge
        pointerEvents: 'none', // Critical so it doesn't block clicks
        zIndex: 10000,
        transform: 'translate(0, 0)', // Align top-left corner with the actual mouse pointer
      }}
    />
  );
};

export default CustomCursor;
