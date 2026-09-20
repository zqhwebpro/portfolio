import React, { useState } from 'react';
import { CONCEPTS } from '../utils/csData';
import { SoundEngine } from '../utils/soundEngine';

export function Navbar({ activeIndex, onSelect }) {
  const [muted, setMuted] = useState(false);

  const toggleMute = () => {
    const next = SoundEngine.toggleMute();
    setMuted(next);
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: '#FFFFFF',
      borderBottom: '3px solid #0A0A0A',
      display: 'flex',
      alignItems: 'center',
      padding: '0 clamp(1rem, 3vw, 2rem)',
      height: '52px',
      gap: '1rem',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
        <div style={{
          width: 28, height: 28,
          background: '#FFE600',
          border: '2px solid #0A0A0A',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: '0.7rem', color: '#000'
        }}>CS</div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, color: '#0A0A0A', whiteSpace: 'nowrap' }}>
          THE 5 FUNDAMENTALS
        </span>
      </div>

      {/* Concept Jump Tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', overflowX: 'auto', flex: 1, padding: '0 0.25rem' }}>
        {CONCEPTS.map((c, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={c.id}
              onClick={() => { SoundEngine.playClick(); if (onSelect) onSelect(i); }}
              style={{
                background: isActive ? c.color : 'transparent',
                color: isActive ? c.textColor : '#555',
                border: isActive ? `1.5px solid ${c.color}` : '1.5px solid #0A0A0A',
                padding: '0.25rem 0.6rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                fontSize: '0.68rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.12s ease',
                letterSpacing: '0.02em',
              }}
            >
              {c.num} {c.term.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* Mute Toggle */}
      <button
        onClick={toggleMute}
        style={{
          background: 'transparent',
          border: '1.5px solid #0A0A0A',
          color: muted ? '#888' : '#0A0A0A',
          padding: '0.25rem 0.6rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          fontWeight: 800,
          cursor: 'pointer',
          flexShrink: 0,
        }}
        title={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? '🔇 MUTE' : '🔊 SFX'}
      </button>
    </nav>
  );
}
