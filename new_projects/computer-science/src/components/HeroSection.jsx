import React, { useEffect, useRef } from 'react';
import { CONCEPTS } from '../utils/csData';
import { SoundEngine } from '../utils/soundEngine';

export function HeroSection({ onSelect }) {
  const marqueeRef = useRef(null);

  return (
    <section style={{
      background: '#0A0A0A',
      borderBottom: '3.5px solid #0A0A0A',
      padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 2.5rem)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Grid background pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.06,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
      }} />

      {/* Bauhaus geometric accent squares */}
      <div style={{ position: 'absolute', top: '2rem', right: '2rem', display: 'flex', gap: '0.5rem', opacity: 0.5 }}>
        {['#0038FF','#FFE600','#FF2A00','#00E599'].map((c, i) => (
          <div key={i} style={{ width: 18, height: 18, background: c, border: '1.5px solid rgba(255,255,255,0.3)' }} />
        ))}
      </div>

      <div className="container" style={{ position: 'relative' }}>
        {/* Tag line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <span style={{
            background: '#FFE600', color: '#000', fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem', fontWeight: 900, padding: '0.2rem 0.65rem',
            border: '1.5px solid #FFE600', letterSpacing: '0.08em',
          }}>INTERACTIVE INFOGRAPHIC</span>
          <span style={{
            background: 'transparent', color: '#555', fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.65rem',
            border: '1.5px solid #333', letterSpacing: '0.05em',
          }}>COMPUTER SCIENCE // CANONICAL REFERENCE</span>
        </div>

        {/* Main headline */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.4rem, 7vw, 5.5rem)',
          fontWeight: 900,
          lineHeight: 1.0,
          color: '#FFFFFF',
          letterSpacing: '-0.03em',
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
        }}>
          The 8{' '}
          <span style={{
            color: '#FFE600',
            textShadow: '3px 3px 0px #0038FF',
            display: 'inline-block',
          }}>Fundamental</span>
          <br />
          Concepts of{' '}
          <span style={{
            color: '#0038FF',
            WebkitTextStroke: '1px #0038FF',
            textShadow: 'none',
          }}>Algorithms</span>
        </h1>

        <p style={{
          fontFamily: 'var(--font-body)',
          color: '#888',
          fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
          maxWidth: '640px',
          lineHeight: 1.6,
          marginBottom: '2.5rem',
          fontWeight: 500,
        }}>
          Each slide is the canonical definition. Every interaction proves the term. Click a concept below to jump directly to its interactive demonstration.
        </p>

        {/* 8 Concept Launch Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
          gap: '0.75rem',
        }}>
          {CONCEPTS.map((c, i) => (
            <button
              key={c.id}
              onClick={() => { SoundEngine.playClick(); onSelect(i); document.getElementById('concept-slides')?.scrollIntoView({ behavior: 'smooth' }); }}
              style={{
                background: 'transparent',
                border: `2px solid #222`,
                padding: '1rem 1.1rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.border = `2px solid ${c.color}`;
                e.currentTarget.style.background = `${c.color}11`;
                e.currentTarget.style.transform = 'translate(-2px,-2px)';
                e.currentTarget.style.boxShadow = `4px 4px 0 ${c.color}`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.border = '2px solid #222';
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Number */}
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.5rem',
                fontWeight: 900,
                color: c.color,
                lineHeight: 1,
                flexShrink: 0,
                minWidth: '2.5rem',
              }}>{c.num}</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1rem', color: '#FFF', lineHeight: 1.1, marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                  {c.term}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#555', fontWeight: 700, letterSpacing: '0.05em' }}>
                  {c.category}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Scroll cue */}
        <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '2rem', height: '2px', background: '#333' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#444', fontWeight: 700, letterSpacing: '0.1em' }}>
            SCROLL OR USE ← → ARROW KEYS TO NAVIGATE SLIDES
          </span>
        </div>
      </div>
    </section>
  );
}
