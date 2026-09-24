import React from 'react';
import { Code, Keyboard, Box, Monitor, GitFork, RotateCw, ArrowRight } from 'lucide-react';
import { SoundEngine } from '../utils/soundEngine';

export function ClosingBanner() {
  const scrollToDemo = () => {
    SoundEngine.playClick();
    const el = document.getElementById('fizzbuzz-demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section style={{
      background: '#0A0A0A',
      color: '#FFFFFF',
      borderTop: '4px solid #0A0A0A',
      borderBottom: '4px solid #0A0A0A',
      padding: 'clamp(4rem, 8vw, 6.5rem) 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.08,
        backgroundImage: 'linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: '3rem', alignItems: 'center' }}>
          
          {/* Text Content */}
          <div>
            <span style={{
              background: '#FFE600', color: '#0A0A0A',
              fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 900,
              padding: '0.35rem 0.85rem', border: '2.5px solid #0A0A0A', letterSpacing: '0.08em',
              boxShadow: '4px 4px 0 #0038FF', display: 'inline-block', marginBottom: '1.25rem',
              textTransform: 'uppercase',
            }}>
              🚀 CLOSING STATEMENT // CORE FUNDAMENTALS
            </span>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              marginBottom: '1.25rem',
              textTransform: 'uppercase',
            }}>
              "LANGUAGES CHANGE.<br />
              <span style={{ color: '#FFE600' }}>FUNDAMENTALS DON'T.</span>"
            </h2>

            <p style={{
              fontFamily: 'var(--font-body)',
              color: '#CCCCCC',
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
              lineHeight: 1.6,
              marginBottom: '2.5rem',
              fontWeight: 600,
              maxWidth: '620px',
            }}>
              From Java to C++ to C# — these 5 concepts are the foundation of every program you'll ever write.
            </p>

            {/* CTA Button */}
            <button
              onClick={scrollToDemo}
              style={{
                background: '#FFE600',
                color: '#0A0A0A',
                border: '3.5px solid #FFFFFF',
                padding: '1.1rem 2.2rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '1rem',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '6px 6px 0 #0038FF',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                textTransform: 'uppercase',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translate(-3px, -3px)';
                e.currentTarget.style.boxShadow = '9px 9px 0 #0038FF';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '6px 6px 0 #0038FF';
              }}
            >
              SEE IT LIVE → [FIZZBUZZ DEMO] <ArrowRight size={20} />
            </button>
          </div>

          {/* Orbiting Animation Visual */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
              width: '280px',
              height: '280px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              border: '3px dashed #FFE600',
              background: 'rgba(255,255,255,0.02)'
            }}>
              {/* Central Code Icon */}
              <div style={{
                width: '80px',
                height: '80px',
                background: '#FFE600',
                color: '#0A0A0A',
                border: '3.5px solid #FFFFFF',
                boxShadow: '4px 4px 0 #0038FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}>
                <Code size={40} />
              </div>

              {/* Orbiting Icons Container */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  animation: 'orbitRotate 18s linear infinite',
                }}
              >
                {/* 5 Orbiting Concept Nodes */}
                {[
                  { Icon: Keyboard, color: '#00F0FF', top: '0%', left: '50%', transform: 'translate(-50%, -50%)' },
                  { Icon: Box, color: '#00E599', top: '38%', left: '100%', transform: 'translate(-50%, -50%)' },
                  { Icon: Monitor, color: '#0038FF', top: '90%', left: '75%', transform: 'translate(-50%, -50%)' },
                  { Icon: GitFork, color: '#FF2A00', top: '90%', left: '25%', transform: 'translate(-50%, -50%)' },
                  { Icon: RotateCw, color: '#FFE600', top: '38%', left: '0%', transform: 'translate(-50%, -50%)' },
                ].map((node, i) => {
                  const IconComponent = node.Icon;
                  return (
                    <div
                      key={i}
                      style={{
                        position: 'absolute',
                        top: node.top,
                        left: node.left,
                        transform: node.transform,
                        background: node.color,
                        color: node.color === '#FFE600' || node.color === '#00F0FF' ? '#000' : '#FFF',
                        border: '2.5px solid #FFFFFF',
                        padding: '0.6rem',
                        boxShadow: '3px 3px 0 #0A0A0A',
                        animation: 'orbitCounterRotate 18s linear infinite',
                      }}
                    >
                      <IconComponent size={22} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
