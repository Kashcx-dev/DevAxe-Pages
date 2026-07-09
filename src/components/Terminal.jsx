import React, { useState, useEffect, useRef } from 'react';

const Terminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [awaitingInput, setAwaitingInput] = useState(null);
  const [history, setHistory] = useState([
    { type: 'output', text: 'DevAxe OS v1.0.0 initialized.' },
    { type: 'output', text: 'Type "help" for a list of available commands.' }
  ]);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [history, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const promptText = awaitingInput === 'register' ? 'Track Selection [1/2]:' : 'root@devaxe:~#';
    const newHistory = [...history, { type: 'input', text: `${promptText} ${input}` }];
    
    if (awaitingInput === 'register') {
      if (cmd === '1') {
        newHistory.push({ type: 'output', text: 'Initializing Hack Track registration...' });
        window.open('https://forms.gle/gxRWhgTK7juZUnqF6', '_blank');
      } else if (cmd === '2') {
        newHistory.push({ type: 'output', text: 'Initializing Source Track registration...' });
        window.open('https://forms.gle/gxRWhgTK7juZUnqF6', '_blank');
      } else {
        newHistory.push({ type: 'output', text: 'Invalid selection. Registration aborted.' });
      }
      setAwaitingInput(null);
    } else {
      if (cmd === 'help') {
        newHistory.push({ type: 'output', text: 'Available commands: help, about, register, clear, sudo rm -rf /' });
      } else if (cmd === 'about') {
        newHistory.push({ type: 'output', text: 'DevAxe Hacks: 48-hour intense digital attrition. Build the future.' });
      } else if (cmd === 'register') {
        newHistory.push({ type: 'output', text: 'Select a track for registration:' });
        newHistory.push({ type: 'output', text: '[1] Hack Track' });
        newHistory.push({ type: 'output', text: '[2] Source Track' });
        setAwaitingInput('register');
      } else if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      } else if (cmd === 'sudo rm -rf /') {
        newHistory.push({ type: 'output', text: 'CRITICAL WARNING: INITIATING SYSTEM PURGE...', color: 'var(--neon-pink)' });
        setTimeout(() => {
          document.body.style.animation = 'glitch-anim 0.2s infinite';
          setTimeout(() => document.body.style.animation = '', 2000);
        }, 500);
      } else {
        newHistory.push({ type: 'output', text: `Command not found: ${cmd}` });
      }
    }

    setHistory(newHistory);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '50vh',
      background: 'rgba(5, 5, 5, 0.95)', borderBottom: '2px solid var(--neon-cyan)',
      zIndex: 99999, color: 'var(--neon-cyan)', fontFamily: 'var(--font-display)',
      padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid rgba(0,243,255,0.2)', paddingBottom: '10px' }}>
        <span>DevAxe OS Terminal [Press ` to close]</span>
        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--neon-pink)', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1.2rem' }}>[X]</button>
      </div>
      
      <div style={{ flex: 1 }}>
        {history.map((line, i) => (
          <div key={i} style={{ marginBottom: '5px', color: line.color || (line.type === 'input' ? '#fff' : 'var(--neon-cyan)') }}>
            {line.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', marginTop: '10px' }}>
        <span style={{ color: '#fff', marginRight: '10px' }}>
          {awaitingInput === 'register' ? 'Track Selection [1/2]:' : 'root@devaxe:~#'}
        </span>
        <input 
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--neon-cyan)', fontFamily: 'inherit', fontSize: '1rem'
          }}
        />
      </form>
    </div>
  );
};

export default Terminal;
