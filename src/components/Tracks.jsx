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

        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={true} glareMaxOpacity={0.3} glareColor="#b026ff" glarePosition="all" transitionSpeed={1500}>
          <div className="glass-panel track-card" style={{ height: '100%' }}>
            <h3 className="track-title" style={{ color: '#b026ff', textShadow: '0 0 10px #b026ff' }}>BLOG TRACK</h3>
            <p>Will be revealed soon. Stay tuned to our Discord for the upcoming transmission.</p>
            <div style={{ marginTop: '20px' }}>
              <button className="cyber-btn ghosted-btn" disabled>LOCKED</button>
            </div>
          </div>
        </Tilt>
      </div>

      <div style={{ marginTop: '50px' }}>
        <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} glareEnable={true} glareMaxOpacity={0.15} glareColor="#ffcc00" transitionSpeed={2000}>
          <div className="glass-panel bgmi-banner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', border: '1px solid #ffcc00', boxShadow: '0 0 30px rgba(255, 204, 0, 0.15) inset' }}>
            <h3 className="glitch-text track-title" data-text="SYSTEM ALERT: BGMI & CHILL" style={{ color: '#ffcc00', fontSize: '2.2rem', marginBottom: '10px' }}>SYSTEM ALERT: BGMI & CHILL</h3>
            <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', color: '#e0e0e0' }}>
              Need a break from debugging? Join our scheduled midnight attrition-busting BGMI tournament to keep energized and connected with other developers.
            </p>
            <h4 style={{ color: '#ffcc00', fontSize: '1.8rem', marginTop: '20px', textShadow: '0 0 15px rgba(255, 204, 0, 0.8)', fontFamily: 'var(--font-display)' }}>PRIZE POOL: $100 USD</h4>
            <div style={{ marginTop: '20px' }}>
              <a href="https://discord.gg/Pp6y3Xtu6Z" target="_blank" rel="noopener noreferrer">
                <button className="cyber-btn" style={{ borderColor: '#ffcc00', color: '#ffcc00', boxShadow: '0 0 15px rgba(255,204,0,0.3) inset' }}>JOIN LOBBY</button>
              </a>
            </div>
          </div>
        </Tilt>
      </div>
    </section>
  );
};

export default Tracks;
