import React from 'react';
import Tilt from 'react-parallax-tilt';

const Hero = () => {
  return (
    <section id="hero" className="hero-section">
      <img src="/DevAxe.png" alt="DevAxe Background Logo" className="hero-logo-watermark" />
      <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} trackOnWindow={true} transitionSpeed={2000}>
        <div className="hero-content">
          <h1 className="glitch-text title" data-text="DEVAXE HACKS">DEVAXE HACKS</h1>
          <p className="subtitle">Build the future. Break the rules.</p>
          <div className="hero-buttons">
            <a href="#tracks">
              <button className="cyber-btn cyber-btn-primary">
                Explore Tracks
              </button>
            </a>
            <a href="https://discord.gg/Pp6y3Xtu6Z" target="_blank" rel="noopener noreferrer">
              <button className="cyber-btn">
                Join Discord
              </button>
            </a>
            <span title='"Ponder and deliberate before you make a move." - Sun Tzu. The submission portal is not yet open.' style={{ display: 'inline-block', cursor: 'not-allowed' }}>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSeg3s6rrF5-i_pi4AO0iipwlx9PIr5IiKbBtHhGRh6dqjg4yA/viewform?usp=publish-editor" target="_blank" rel="noopener noreferrer" style={{ pointerEvents: 'none' }}>
                <button className="cyber-btn ghosted-btn" disabled>
                  Submit Project
                </button>
              </a>
            </span>
          </div>
        </div>
      </Tilt>
    </section>
  );
};

export default Hero;
