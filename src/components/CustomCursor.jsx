import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imgSrc, setImgSrc] = useState('/cursor.png');

  useEffect(() => {
    // Automatically process the image to remove its background color
    const img = new Image();
    img.src = '/cursor.png';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Get background color from top-left pixel
      const bgR = data[0];
      const bgG = data[1];
      const bgB = data[2];
      const bgA = data[3];
      
      // Only process if it actually has a solid background (alpha > 0)
      if (bgA > 0) {
        const tolerance = 15;
        for (let i = 0; i < data.length; i += 4) {
          if (
            Math.abs(data[i] - bgR) <= tolerance &&
            Math.abs(data[i+1] - bgG) <= tolerance &&
            Math.abs(data[i+2] - bgB) <= tolerance
          ) {
            data[i+3] = 0; // Set alpha to 0 (transparent)
          }
        }
        ctx.putImageData(imageData, 0, 0);
        setImgSrc(canvas.toDataURL('image/png'));
      }
    };
  }, []);

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
      src={imgSrc} 
      alt="custom-cursor"
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '40px', // Forces the image to a reasonable size
        pointerEvents: 'none', // Critical so it doesn't block clicks
        zIndex: 2147483647, // Maximum possible z-index to ensure it is always on top
        transform: 'translate(0, 0)', // Align top-left corner with the actual mouse pointer
      }}
    />
  );
};

export default CustomCursor;
