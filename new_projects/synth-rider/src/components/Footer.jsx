import React from 'react';
import { CONCEPTS } from '../utils/csData';
import { SoundEngine } from '../utils/soundEngine';

export function Footer({ onSelect }) {
  return (
    <footer style={{ background: '#0A0A0A', color: '#FFFFFF', borderTop: '3.5px solid #0A0A0A' }}>
      {/* Hazard stripe */}
      <div className="hazard-divider" />

      <div className="container" style={{ padding: '2.5rem clamp(1rem, 4vw, 2.5rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>

          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 900, color: '#FFFFFF', marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>
              THE 5 FUNDAMENTALS
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#A0A0A0', lineHeight: 1.6 }}>
              An interactive infographic presenting the canonical definitions of the 5 fundamental programming concepts.
            </div>
          </div>

          {/* Concept index */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, color: '#FFE600', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>CONCEPT INDEX</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {CONCEPTS.map((c, i) => (
                <button key={c.id} onClick={() => { SoundEngine.playClick(); if (onSelect) onSelect(i); }} style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700,
                  color: '#CCCCCC', textAlign: 'left', padding: '0',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  transition: 'color 0.1s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = c.color}
                onMouseLeave={e => e.currentTarget.style.color = '#CCCCCC'}
                >
                  <span style={{ color: '#FFE600', minWidth: '1.5rem', fontWeight: 900 }}>{c.num}</span>
                  {c.term}
                </button>
              ))}
            </div>
          </div>

          {/* Design system key */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, color: '#FFE600', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>DESIGN SYSTEM</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {[
                { label: 'Cobalt Blue', color: '#0038FF', use: 'Formal definitions' },
                { label: 'Canary Yellow', color: '#FFE600', use: 'Key terms / CTAs' },
                { label: 'Vermilion Red', color: '#FF2A00', use: 'Warnings / worst case' },
                { label: 'Emerald Mint', color: '#00E599', use: 'Success / best case' },
                { label: 'Bauhaus Purple', color: '#7928CA', use: 'Recursion paradigm' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#A0A0A0' }}>
                  <div style={{ width: 10, height: 10, background: item.color, border: `1px solid ${item.color}`, flexShrink: 0 }} />
                  <span style={{ color: item.color }}>{item.label}</span>
                  <span style={{ opacity: 0.7 }}>— {item.use}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '2px solid #333333', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#888888', fontWeight: 700 }}>
            NEO-BRUTALIST BAUHAUS × CS INFOGRAPHIC // INTERACTIVE CANONICAL REFERENCE
          </span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['#0038FF','#FFE600','#FF2A00','#00E599','#7928CA','#00F0FF'].map(c => (
              <div key={c} style={{ width: 10, height: 10, background: c, border: '1.5px solid #FFFFFF' }} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
