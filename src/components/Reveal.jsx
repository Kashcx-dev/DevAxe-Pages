import React, { useEffect, useRef, useState } from 'react';

const Reveal = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          // Toggle visibility so the animation repeats every time you scroll past it
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.15 } // Trigger when 15% of the element is visible
    );
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`reveal-wrapper ${isVisible ? 'is-visible' : ''}`}
    >
      {children}
    </div>
  );
};

export default Reveal;
