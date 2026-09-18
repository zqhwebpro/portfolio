import React, { useState } from 'react';
import { Volume2, VolumeX, Terminal, Cpu, BookOpen, Layers } from 'lucide-react';
import { SoundEngine } from '../utils/soundEngine';

export function Navbar({ activeSlideIndex = 0, onSelectSlide = () => {} }) {
  const [muted, setMuted] = useState(SoundEngine.getIsMuted());

  const handleToggleSound = () => {
    const isNowMuted = SoundEngine.toggleMute();
    setMuted(isNowMuted);
    if (!isNowMuted) {
      SoundEngine.playClick();
    }
  };

  const navConcepts = [
    { id: 'algorithm', label: '01 ALGORITHM', idx: 0 },
    { id: 'data-structure', label: '02 DATA STRUCTURE', idx: 1 },
    { id: 'time-complexity', label: '03 TIME COMPLEXITY', idx: 2 },
    { id: 'space-complexity', label: '04 SPACE COMPLEXITY', idx: 3 },
    { id: 'big-o-notation', label: '05 BIG O NOTATION', idx: 4 },
    { id: 'recursion', label: '06 RECURSION', idx: 5 },
    { id: 'divide-and-conquer', label: '07 DIVIDE & CONQUER', idx: 6 },
    { id: 'brute-force', label: '08 BRUTE FORCE', idx: 7 },
  ];

  const handleNavClick = (idx) => {
    SoundEngine.playClick();
    onSelectSlide(idx);
    const el = document.getElementById('interactive-slides');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (id) => {
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
            <Terminal size={14} /> COMPUTER_SCIENCE_FOUNDATIONS
          </span>
          <span className="hide-mobile" style={{ color: '#888' }}>|</span>
          <span className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Cpu size={14} color="var(--cobalt-blue)" />
            CURRICULUM: <span style={{ color: 'var(--emerald-mint)', fontWeight: 700 }}>8 CORE THEORETICAL CONCEPTS</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div className="hide-mobile" style={{ display: 'flex', gap: '1rem', color: '#AAA' }}>
            <span>SLIDE: <strong style={{ color: '#FFF' }}>{String(activeSlideIndex + 1).padStart(2, '0')} / 08</strong></span>
            <span>NOTATION: <strong style={{ color: 'var(--canary-yellow)' }}>O(1), O(log n), O(n), O(n²)</strong></span>
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
            title={muted ? "Unmute Sound FX" : "Mute Sound FX"}
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
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick(0)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            background: 'var(--cobalt-blue)',
            border: '2px solid #000',
            boxShadow: '3px 3px 0px #000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFF',
            fontWeight: 900
          }}>
            <span style={{ fontSize: '1.1rem' }}>CS</span>
          </div>

          <div>
            <span className="font-display" style={{ fontWeight: 900, fontSize: '1.25rem', letterSpacing: '-0.03em', lineHeight: 1, display: 'block', color: 'var(--ink-black)' }}>
              COMPUTER SCIENCE
            </span>
            <span className="font-mono text-xs" style={{ color: '#6B7280', fontWeight: 700, letterSpacing: '0.05em' }}>
              8 CORE ALGORITHMIC CONCEPTS
            </span>
          </div>
        </div>

        {/* Concept Quick Jump Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
          {navConcepts.map((item) => {
            const isActive = activeSlideIndex === item.idx;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.idx)}
                className="brutal-btn brutal-btn-sm"
                style={{
                  background: isActive ? 'var(--canary-yellow)' : '#FFFFFF',
                  color: 'var(--ink-black)',
                  border: '1.5px solid #000',
                  boxShadow: isActive ? '2px 2px 0px #000' : 'none',
                  fontSize: '0.72rem',
                  padding: '0.3rem 0.6rem',
                  fontWeight: 800
                }}
              >
                {item.label}
              </button>
            );
          })}

          <button
            onClick={() => scrollToSection('comparison-table-section')}
            className="brutal-btn brutal-btn-sm"
            style={{
              background: '#0A0A0A',
              color: '#FFFFFF',
              border: '1.5px solid #000',
              fontSize: '0.72rem',
              padding: '0.3rem 0.6rem',
              fontWeight: 800
            }}
          >
            <Layers size={12} /> TABLE
          </button>
        </nav>
      </div>
    </header>
  );
}
