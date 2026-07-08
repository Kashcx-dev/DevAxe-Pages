import React from 'react';

const Prizes = () => {
  return (
    <section id="prizes">
      <h2 className="section-title">BOUNTIES // PRIZES</h2>
      <div className="prizes-grid">
        <div className="glass-panel prize-card">
          <h3 className="prize-title">1ST PLACE</h3>
          <p className="prize-amount">$5,000</p>
          <p>+ Sponsor Swag & Cloud Credits</p>
        </div>
        <div className="glass-panel prize-card">
          <h3 className="prize-title">2ND PLACE</h3>
          <p className="prize-amount">$2,500</p>
          <p>+ Sponsor Swag & Cloud Credits</p>
        </div>
        <div className="glass-panel prize-card">
          <h3 className="prize-title">3RD PLACE</h3>
          <p className="prize-amount">$1,000</p>
          <p>+ Sponsor Swag</p>
        </div>
      </div>
    </section>
  );
};

export default Prizes;
