import React, { useEffect, useRef, useState } from 'react';

const AnimatedCounter = ({ end, suffix = '', label, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            let start = 0;
            const startTime = performance.now();

            const animate = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.floor(eased * end);
              setCount(current);
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    const current = ref.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [end, duration, hasAnimated]);

  return (
    <div ref={ref} className="stat-badge">
      <span className="stat-badge__value">
        {count}{suffix}
      </span>
      <span className="stat-badge__label">{label}</span>
    </div>
  );
};

const About = () => {
  return (
    <section id="about">
      <h2 className="section-title">SYSTEM_INFO // ABOUT</h2>

      <div className="stat-badges-grid">
        <AnimatedCounter end={48} suffix="h" label="Of Hacking" />
        <AnimatedCounter end={500} suffix="+" label="Hackers" />
        <AnimatedCounter end={780} suffix="$+" label="In Prizes" />
        <AnimatedCounter end={3} suffix="" label="Tracks" />
      </div>

      <div className="glass-panel about-content">
        <p>
          Welcome to DevAxe Hacks, the premier hackathon for builders, creators, and rule-breakers. 
          We are pushing the boundaries of what's possible in the digital realm. Whether you're a seasoned 
          developer or a first-time hacker, you'll find the resources, mentorship, and community you need 
          to build something incredible.
        </p>
        <br />
        <p>
          Join hundreds of hackers from around the globe in a 48-hour sprint to create the next big thing. 
          Expect caffeine, code, and cyberpunk aesthetics.
        </p>
      </div>
    </section>
  );
};

export default About;
