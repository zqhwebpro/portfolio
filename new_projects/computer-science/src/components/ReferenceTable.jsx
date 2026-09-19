import React, { useState } from 'react';
import { CONCEPTS } from '../utils/csData';
import { SoundEngine } from '../utils/soundEngine';

export function ReferenceTable({ onSelect }) {
  const [highlighted, setHighlighted] = useState(null);

  return (
    <section id="reference-table" style={{
      background: '#FFFFFF',
      padding: 'clamp(2.5rem, 6vw, 5rem) 0',
      borderBottom: '3.5px solid #0A0A0A',
    }}>
      <div className="container">

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ background: '#FFE600', color: '#000', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900, padding: '0.25rem 0.75rem', border: '2px solid #FFE600', letterSpacing: '0.08em', display: 'inline-block', marginBottom: '0.75rem' }}>
            ◆ CANONICAL REFERENCE TABLE
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.05, color: '#0A0A0A', marginBottom: '0.5rem' }}>
            TERMS & DEFINITIONS <span style={{ color: '#0038FF' }}>QUICK REFERENCE</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', color: '#555', fontSize: '0.95rem', lineHeight: 1.6 }}>
            The complete canonical definitions for all 5 concepts. Click any row to jump to its interactive slide.
          </p>
        </div>

        {/* Table */}
        <div style={{ border: '3px solid #FFE600', overflow: 'hidden', boxShadow: '8px 8px 0 #FFE600' }}>

          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '60px 160px 1fr 220px',
            background: '#FFE600',
            padding: '0.65rem 1.25rem',
            gap: '1rem',
            borderBottom: '2px solid #000',
          }}>
            {['#', 'CONCEPT', 'CANONICAL DEFINITION', 'KEY PROPERTIES'].map(h => (
              <div key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 900, color: '#000', letterSpacing: '0.08em' }}>{h}</div>
            ))}
          </div>

          {/* Rows */}
          {CONCEPTS.map((c, i) => {
            const isHover = highlighted === i;
            return (
              <div
                key={c.id}
                onClick={() => { SoundEngine.playClick(); onSelect(i); }}
                onMouseEnter={() => setHighlighted(i)}
                onMouseLeave={() => setHighlighted(null)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 160px 1fr 220px',
                  padding: '1rem 1.25rem',
                  gap: '1rem',
                  borderBottom: i < CONCEPTS.length - 1 ? '1px solid #E5E5E5' : 'none',
                  cursor: 'pointer',
                  background: isHover ? '#F8F8F8' : '#FFFFFF',
                  transition: 'background 0.12s ease',
                  alignItems: 'start',
                }}
              >
                {/* Number */}
                <div style={{
                  fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: '1.1rem',
                  color: isHover ? c.color : '#333',
                  transition: 'color 0.12s ease',
                  paddingTop: '0.1rem',
                }}>{c.num}</div>

                {/* Term name */}
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '0.95rem',
                    color: isHover ? c.color : '#0A0A0A',
                    marginBottom: '0.3rem', lineHeight: 1.1,
                    transition: 'color 0.12s ease',
                    textTransform: 'uppercase',
                  }}>{c.term}</div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700,
                    color: isHover ? c.color : '#444',
                    letterSpacing: '0.06em',
                    transition: 'color 0.12s ease',
                  }}>{c.category}</div>
                  {isHover && (
                    <div style={{
                      marginTop: '0.5rem',
                      fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 800,
                      color: c.color, letterSpacing: '0.04em',
                      display: 'flex', alignItems: 'center', gap: '0.3rem',
                    }}>
                      → VIEW SLIDE
                    </div>
                  )}
                </div>

                {/* Definition */}
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.83rem', color: '#555', lineHeight: 1.55 }}>
                  {c.definition}
                  {isHover && (
                    <div style={{ marginTop: '0.6rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#666', lineHeight: 1.4, borderLeft: `3px solid ${c.color}`, paddingLeft: '0.6rem' }}>
                      {c.formalDef.substring(0, 140)}…
                    </div>
                  )}
                </div>

                {/* Key properties */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {c.properties.map((p, pi) => (
                    <div key={pi} style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 800,
                      color: isHover ? c.color : '#555',
                      display: 'flex', alignItems: 'flex-start', gap: '0.3rem',
                      transition: 'color 0.12s ease',
                    }}>
                      <span style={{ opacity: 0.4, flexShrink: 0 }}>▸</span>
                      <span>{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '2rem', height: '2px', background: '#333' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#444', fontWeight: 700 }}>
            CLICK ANY ROW TO NAVIGATE TO THE INTERACTIVE SLIDE ↑
          </span>
        </div>

        {/* Bauhaus color key */}
        <div style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#444', marginRight: '0.25rem' }}>CONCEPT COLOR KEY:</span>
          {CONCEPTS.map(c => (
            <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <div style={{ width: 12, height: 12, background: c.color, border: `1.5px solid ${c.color}` }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#555' }}>{c.term}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
