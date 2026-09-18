import React, { useState } from 'react';
import { Volume2, VolumeX, Terminal, Cpu } from 'lucide-react';
import { SoundEngine } from '../utils/soundEngine';

export function Navbar({ activeSection, currentStats = { ops: 0, stackDepth: 0, treeVisited: 0 } }) {
  const [muted, setMuted] = useState(SoundEngine.getIsMuted());

  const handleToggleSound = () => {
    const isNowMuted = SoundEngine.toggleMute();
    setMuted(isNowMuted);
    if (!isNowMuted) {
      SoundEngine.playClick();
    }
  };

  const navItems = [
    { id: 'hero', label: '01 // INTRO & GUESSING', num: '01' },
    { id: 'binary-search', label: '02 // BINARY SEARCH', num: '02' },
    { id: 'big-o', label: '03 // ASYMPTOTIC NOTATION', num: '03' },
    { id: 'sorting', label: '04 // SELECTION & INSERTION', num: '04' },
    { id: 'recursion', label: '05 // RECURSION & HANOI', num: '05' },
    { id: 'divide-conquer', label: '06 // DIVIDE & CONQUER', num: '06' },
    { id: 'graphs', label: '07 // GRAPH BFS & DFS', num: '07' },
    { id: 'quiz', label: '08 // MASTERY QUIZ', num: '08' },
  ];

  const scrollTo = (id) => {
    SoundEngine.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar-wrapper" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--bg-primary)',
      borderBottom: 'var(--border-thick)',
      boxShadow: '0 4px 0px rgba(0,0,0,0.1)'
    }}>
      {/* Top Brutalist Status Bar */}
      <div style={{
        background: '#0A0A0A',
        color: '#FFFFFF',
        padding: '0.35rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.75rem',
        fontFamily: 'var(--font-mono)',
        borderBottom: '1px solid #222'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', overflow: 'hidden' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--canary-yellow)', fontWeight: 800 }}>
            <Terminal size={14} /> KHAN:ALGORITHMS_CURRICULUM
          </span>
          <span className="hide-mobile" style={{ color: '#888' }}>|</span>
          <span className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Cpu size={14} color="var(--cobalt-blue)" />
            CURRICULUM: <span style={{ color: 'var(--emerald-mint)', fontWeight: 700 }}>DARTMOUTH CS / CLRS</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div className="hide-mobile" style={{ display: 'flex', gap: '1rem', color: '#AAA' }}>
            <span>UNITS: <strong style={{ color: '#FFF' }}>08 COMPLETE</strong></span>
            <span>NOTATION: <strong style={{ color: 'var(--canary-yellow)' }}>Θ, O, Ω</strong></span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="brutal-btn brutal-btn-sm"
            style={{
              padding: '0.2rem 0.6rem',
              background: muted ? '#333' : 'var(--canary-yellow)',
              color: muted ? '#AAA' : '#0A0A0A',
              border: '1px solid #000',
              boxShadow: 'none',
              fontSize: '0.75rem'
            }}
            title={muted ? "Unmute Mechanical Sound FX" : "Mute Sound FX"}
          >
            {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
            <span>{muted ? 'SFX OFF' : 'SFX ON'}</span>
          </button>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem clamp(1rem, 3vw, 2rem)',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        {/* Brand Logo & Geometric Icon */}
        <div 
          onClick={() => scrollTo('hero')} 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          {/* Bauhaus Emblem */}
          <div style={{
            width: '36px',
            height: '36px',
            background: 'var(--cobalt-blue)',
            border: '2px solid #0A0A0A',
            boxShadow: '2px 2px 0px #0A0A0A',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: 'var(--canary-yellow)',
              border: '1.5px solid #0A0A0A'
            }} />
            <div style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 0,
              height: 0,
              borderLeft: '14px solid transparent',
              borderBottom: '14px solid var(--vermilion-red)'
            }} />
          </div>

          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}>
              <span>ALGORITHMS // KHAN CURRICULUM</span>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              fontWeight: 700,
              letterSpacing: '0.05em'
            }}>
              COMPUTER SCIENCE THEORY &amp; ANALYSIS
            </div>
          </div>
        </div>

        {/* Navigation Pills */}
        <nav style={{
          display: 'flex',
          gap: '0.4rem',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="brutal-btn brutal-btn-sm"
                style={{
                  background: isActive ? 'var(--canary-yellow)' : 'var(--bg-card)',
                  color: '#0A0A0A',
                  borderColor: '#0A0A0A',
                  fontWeight: isActive ? 800 : 600,
                  transform: isActive ? 'translate(-1px, -1px)' : 'none',
                  boxShadow: isActive ? '3px 3px 0px #0A0A0A' : '2px 2px 0px #0A0A0A',
                  padding: '0.35rem 0.55rem',
                  fontSize: '0.72rem'
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}

export default Navbar;
