import React from 'react';

const Hero = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <h1 className="glitch-text title" data-text="DEVAXE HACKS">DEVAXE HACKS</h1>
        <p className="subtitle">Build the future. Break the rules.</p>
        <div className="hero-buttons">
          <a href="https://forms.gle/gxRWhgTK7juZUnqF6" target="_blank" rel="noopener noreferrer">
            <button className="cyber-btn cyber-btn-primary">
              Register Now
            </button>
          </a>
          <a href="https://discord.gg/Pp6y3Xtu6Z" target="_blank" rel="noopener noreferrer">
            <button className="cyber-btn">
              Join Discord
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
