import React from 'react';

const FAQs = () => {
  const faqs = [
    { q: "Who can participate?", a: "Anyone! Whether you're a student, professional, or self-taught developer." },
    { q: "How much does it cost?", a: "It's 100% free to attend." },
    { q: "Do I need a team?", a: "You can hack solo or in a team of up to 4 people. We'll have team-building events if you need a squad." },
    { q: "Is this event online or in-person?", a: "This hackathon is 100% online!" },
    { q: "What should I build?", a: "Anything you want! Web, mobile, software, AI - if you can code it, you can build it. (Note: No hardware projects)." }
  ];

  return (
    <section id="faqs">
      <h2 className="section-title">QUERY // FAQS</h2>
      <div className="faqs-list">
        {faqs.map((faq, index) => (
          <div key={index} className="glass-panel faq-item" style={{ marginBottom: '15px' }}>
            <h3 style={{ color: 'var(--neon-yellow)' }}>{'> '}{faq.q}</h3>
            <p style={{ marginTop: '10px' }}>{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQs;
