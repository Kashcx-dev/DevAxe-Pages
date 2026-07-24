import React, { useEffect, useRef, useState } from 'react';

const SectionDivider = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dividerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    const current = dividerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={dividerRef}
      className={`section-divider ${isVisible ? 'section-divider--visible' : ''}`}
    >
      <div className="section-divider__node section-divider__node--left" />
      <div className="section-divider__line">
        <div className="section-divider__scan" />
      </div>
      <div className="section-divider__node section-divider__node--right" />
    </div>
  );
};

export default SectionDivider;
