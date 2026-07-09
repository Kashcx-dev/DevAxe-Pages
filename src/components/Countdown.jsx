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
    <div className="countdown-container">
      {Object.keys(timeLeft).length ? (
        Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="countdown-item">
            <span className="countdown-value">
              {value.toString().padStart(2, '0')}
            </span>
            <span className="countdown-label">
              {unit}
            </span>
          </div>
        ))
      ) : (
        <span className="countdown-finished">SYSTEM ONLINE</span>
      )}
    </div>
  );
};

export default Countdown;
