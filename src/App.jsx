import React, { useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Tracks from './components/Tracks';
import Schedule from './components/Schedule';
import Prizes from './components/Prizes';
import Sponsors from './components/Sponsors';
import FAQs from './components/FAQs';
import Reveal from './components/Reveal';
import AudioPlayer from './components/AudioPlayer';
import AudioVibe from './components/AudioVibe';
import './index.css';

function App() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  return (
    <div className="app-container">
      <AudioVibe isPlaying={isMusicPlaying} />
      <AudioPlayer onPlayStateChange={setIsMusicPlaying} />
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
        <Reveal><Tracks /></Reveal>
        <Reveal><About /></Reveal>
        <Reveal><Schedule /></Reveal>
        <Reveal><Prizes /></Reveal>
        <Reveal><Sponsors /></Reveal>
        <Reveal><FAQs /></Reveal>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} DevAxe Hacks. All rights reserved. Built for the future.</p>
      </footer>
    </div>
  );
}

export default App;
