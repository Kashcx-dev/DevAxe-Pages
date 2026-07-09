import React, { useState } from 'react';

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    { q: "Who can participate?", a: "Anyone! Whether you're a student, professional, or self-taught developer." },
    { q: "How much does it cost?", a: "It's 100% free to attend, thanks to our amazing sponsors." },
    { q: "Do I need a team?", a: "You can hack solo or in a team of up to 4. We will have team-building events on Discord if you need to find one!" },
    { q: "What if I don't know how to code?", a: "We have dedicated mentors and open-source tracks designed specifically for learning." }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faqs">
      <h2 className="section-title">QUERY // FAQS</h2>
      <div className="faqs-list">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item glass-panel ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleAccordion(index)}
            style={{ cursor: 'pointer', marginBottom: '15px', transition: 'all 0.3s ease' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, color: activeIndex === index ? 'var(--neon-cyan)' : 'var(--text-main)', transition: 'color 0.3s' }}>{faq.q}</h3>
              <span style={{ color: 'var(--neon-pink)', fontSize: '1.5rem', transform: activeIndex === index ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>+</span>
            </div>
            <div style={{ 
              maxHeight: activeIndex === index ? '200px' : '0', 
              overflow: 'hidden', 
              transition: 'max-height 0.4s ease-in-out',
              marginTop: activeIndex === index ? '15px' : '0'
            }}>
              <p style={{ margin: 0 }}>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQs;
