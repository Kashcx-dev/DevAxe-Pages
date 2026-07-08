import React from 'react';

const Prizes = () => {
  return (
    <section id="prizes">
      <h2 className="section-title">BOUNTIES // PRIZES</h2>
      <div className="prizes-grid">
        <div className="glass-panel prize-card">
          <h3 className="prize-title">1ST PLACE</h3>
          <p className="prize-amount">$420</p>
          <p>+ Sponsor Swag & Cloud Credits</p>
        </div>
        <div className="glass-panel prize-card">
          <h3 className="prize-title">2ND PLACE</h3>
          <p className="prize-amount">$240</p>
          <p>+ Sponsor Swag & Cloud Credits</p>
        </div>
        <div className="glass-panel prize-card">
          <h3 className="prize-title">3RD PLACE</h3>
          <p className="prize-amount">$120</p>
          <p>+ Sponsor Swag</p>
        </div>
      </div>
      <div className="glass-panel text-center" style={{ marginTop: '40px', borderColor: 'var(--neon-cyan)' }}>
        <h3 style={{ color: 'var(--neon-cyan)', marginBottom: '10px' }}>// DIRECTIVES: CAREER</h3>
        <p>Top contenders will have an exclusive opportunity to interview with our sponsors for potential roles.</p>
      </div>
    </section>
  );
};

export default Prizes;
