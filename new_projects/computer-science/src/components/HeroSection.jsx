import React from 'react';
import { CONCEPTS } from '../utils/csData';
import { SoundEngine } from '../utils/soundEngine';

export function HeroSection({ onSelect }) {
  return (
    <section style={{
      background: '#FFFFFF',
      borderBottom: '4px solid #0A0A0A',
      padding: 'clamp(4rem, 8vw, 6.5rem) clamp(1.5rem, 5vw, 3.5rem)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Neo-brutalist grid background pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.15,
        backgroundImage: 'linear-gradient(#0A0A0A 1px, transparent 1px), linear-gradient(90deg, #0A0A0A 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        pointerEvents: 'none',
      }} />

      {/* Bauhaus color accent blocks top right */}
      <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', display: 'flex', gap: '0.4rem' }}>
        {['#0038FF', '#FFE600', '#FF2A00', '#00E599', '#7928CA'].map((c, i) => (
          <div key={i} style={{ width: 16, height: 16, background: c, border: '2px solid #0A0A0A' }} />
        ))}
      </div>

      <div className="container" style={{ position: 'relative' }}>
        {/* Badges / Header pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <span style={{
            background: '#FFE600', color: '#0A0A0A', fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem', fontWeight: 900, padding: '0.35rem 0.75rem',
            border: '2.5px solid #0A0A0A', boxShadow: '3px 3px 0px #0A0A0A',
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            ◆ INTERACTIVE INFOGRAPHIC
          </span>
          <span style={{
            background: '#0A0A0A', color: '#FFFFFF', fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem', fontWeight: 800, padding: '0.35rem 0.75rem',
            border: '2.5px solid #0A0A0A', boxShadow: '3px 3px 0px #0038FF',
            letterSpacing: '0.05em',
          }}>
            BASICS OF PROGRAMMING // REFERENCE
          </span>
        </div>

        {/* Main headline */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 6.5vw, 4.8rem)',
          fontWeight: 900,
          lineHeight: 1.05,
          color: '#0A0A0A',
          letterSpacing: '-0.02em',
          marginBottom: '1.25rem',
          textTransform: 'uppercase',
        }}>
          THE 5{' '}
          <span style={{
            background: '#FFE600',
            color: '#0A0A0A',
            padding: '0 0.4rem',
            border: '3px solid #0A0A0A',
            boxShadow: '5px 5px 0px #0A0A0A',
            display: 'inline-block',
          }}>
            FUNDAMENTAL
          </span>
          <br />
          CONCEPTS OF{' '}
          <span style={{
            background: '#0038FF',
            color: '#FFFFFF',
            padding: '0 0.4rem',
            border: '3px solid #0A0A0A',
            boxShadow: '5px 5px 0px #0A0A0A',
            display: 'inline-block',
          }}>
            PROGRAMMING
          </span>
        </h1>

        <p style={{
          fontFamily: 'var(--font-body)',
          color: '#333333',
          fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
          maxWidth: '680px',
          lineHeight: 1.6,
          marginBottom: '2.5rem',
          fontWeight: 600,
        }}>
          An interactive canonical reference guide to programming basics. Click any concept card below to jump straight to its definition, live visualizer, and code implementation.
        </p>

        {/* 5 Concept Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
          gap: '1.25rem',
        }}>
          {CONCEPTS.map((c, i) => (
            <button
              key={c.id}
              onClick={() => { SoundEngine.playClick(); if (onSelect) onSelect(i); }}
              style={{
                background: '#FFFFFF',
                border: '3px solid #0A0A0A',
                padding: '1.25rem 1.4rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.12s ease',
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                boxShadow: '5px 5px 0 #0A0A0A',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = c.color === '#FFE600' ? '#FFFBE6' : '#F4F7FF';
                e.currentTarget.style.transform = 'translate(-3px, -3px)';
                e.currentTarget.style.boxShadow = `8px 8px 0 #0A0A0A`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '5px 5px 0 #0A0A0A';
              }}
            >
              {/* Number */}
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.4rem',
                fontWeight: 900,
                background: c.color,
                color: c.textColor,
                border: '2px solid #0A0A0A',
                width: '2.4rem',
                height: '2.4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '2px 2px 0 #0A0A0A',
              }}>
                {c.num}
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '1.05rem',
                  color: '#0A0A0A',
                  lineHeight: 1.15,
                  marginBottom: '0.35rem',
                  textTransform: 'uppercase',
                }}>
                  {c.term}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: '#555555',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                }}>
                  {c.category}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
