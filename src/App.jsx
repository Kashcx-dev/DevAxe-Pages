import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Schedule from './components/Schedule';
import Prizes from './components/Prizes';
import Sponsors from './components/Sponsors';
import FAQs from './components/FAQs';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo-container">
          <img src="/DevAxe.png" alt="DevAxe Hacks Logo" className="logo-img" />
        </div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#schedule">Schedule</a></li>
          <li><a href="#prizes">Prizes</a></li>
          <li><a href="#sponsors">Sponsors</a></li>
          <li><a href="#faqs">FAQs</a></li>
        </ul>
      </nav>

      <main>
        <Hero />
        <About />
        <Schedule />
        <Prizes />
        <Sponsors />
        <FAQs />
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} DevAxe Hacks. All rights reserved. Built for the future.</p>
      </footer>
    </div>
  );
}

export default App;
