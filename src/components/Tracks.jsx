import React from 'react';
import Tilt from 'react-parallax-tilt';

const Tracks = () => {
  return (
    <section id="tracks">
      <h2 className="section-title">PATHS // TRACKS</h2>
      <div className="tracks-grid">
        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={true} glareMaxOpacity={0.3} glareColor="#ff007f" glarePosition="all" transitionSpeed={1500}>
          <div className="glass-panel track-card" style={{ height: '100%' }}>
            <h3 className="track-title" style={{ color: 'var(--neon-pink)' }}>HACK TRACK</h3>
            <p>The classic hackathon experience. Build something entirely new from scratch over the 48 hours.</p>
            <div style={{ marginTop: '20px' }}>
              <a href="https://forms.gle/gxRWhgTK7juZUnqF6" target="_blank" rel="noopener noreferrer">
                <button className="cyber-btn cyber-btn-primary">Register: Hack Track</button>
              </a>
            </div>
          </div>
        </Tilt>
        
        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={true} glareMaxOpacity={0.3} glareColor="#00f3ff" glarePosition="all" transitionSpeed={1500}>
          <div className="glass-panel track-card" style={{ height: '100%' }}>
            <h3 className="track-title" style={{ color: 'var(--neon-cyan)' }}>SOURCE TRACK</h3>
            <p>Focus on contributing to open source or extending existing projects. Perfect for collaborative builders.</p>
            <div style={{ marginTop: '20px' }}>
              <a href="https://forms.gle/gxRWhgTK7juZUnqF6" target="_blank" rel="noopener noreferrer">
                <button className="cyber-btn cyber-btn-primary">Register: Source Track</button>
              </a>
            </div>
          </div>
        </Tilt>
      </div>
    </section>
  );
};

export default Tracks;
