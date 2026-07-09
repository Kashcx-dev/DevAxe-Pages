import React, { useState, useEffect } from 'react';

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', margin: '40px 0', fontFamily: 'var(--font-display)' }}>
      {Object.keys(timeLeft).length ? (
        Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(5,5,5,0.6)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(0,243,255,0.2)' }}>
            <span style={{ fontSize: '3rem', color: 'var(--neon-cyan)', textShadow: '0 0 10px rgba(0, 243, 255, 0.5)', lineHeight: 1 }}>
              {value.toString().padStart(2, '0')}
            </span>
            <span style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--neon-pink)', letterSpacing: '2px', marginTop: '5px' }}>
              {unit}
            </span>
          </div>
        ))
      ) : (
        <span style={{ fontSize: '2.5rem', color: 'var(--neon-pink)', textShadow: '0 0 15px var(--neon-pink)' }}>SYSTEM ONLINE</span>
      )}
    </div>
  );
};

export default Countdown;
