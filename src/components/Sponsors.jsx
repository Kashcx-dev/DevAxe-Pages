import React from 'react';

const Sponsors = () => {
  return (
    <section id="sponsors">
      <h2 className="section-title">ALLIES // SPONSORS</h2>
      <div className="glass-panel text-center">
        <p>Partnering with the best in the industry to bring you top-tier tools and resources.</p>
        <div className="sponsors-logo-grid" style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {/* Placeholders for Sponsors */}
          <a href="https://www.wolfram.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }} className="wolfram-sponsor">
            <div style={{ padding: '15px 30px', border: '1px solid rgba(255,0,0,0.5)', color: '#fff', display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(0,0,0,0.5)', borderRadius: '4px', transition: 'all 0.3s' }}>
              <span style={{ color: '#ff2a2a', fontSize: '32px', lineHeight: '1' }}>✺</span>
              <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: '900', fontSize: '26px', letterSpacing: '1px' }}>WOLFRAM</span>
            </div>
          </a>
          <div className="sponsor-placeholder" style={{ padding: '20px', border: '1px solid var(--neon-cyan)', color: 'var(--neon-cyan)' }}>SPONSOR 2</div>
          <div className="sponsor-placeholder" style={{ padding: '20px', border: '1px solid var(--neon-pink)', color: 'var(--neon-pink)' }}>SPONSOR 3</div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
