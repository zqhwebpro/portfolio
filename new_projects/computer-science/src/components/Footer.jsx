import React from 'react';
import { Terminal, Shield, Compass, Heart, ArrowUp } from 'lucide-react';
import { SoundEngine } from '../utils/soundEngine';

export function Footer() {
  const scrollToTop = () => {
    SoundEngine.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: '#0A0A0A',
      color: '#FFFFFF',
      borderTop: 'var(--border-thick)',
      padding: '4rem 0 2rem 0',
      position: 'relative'
    }}>
      <div className="container">
        {/* Top Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: '2.5rem',
          marginBottom: '3.5rem'
        }}>
          {/* Col 1: Brand & Manifesto */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'var(--cobalt-blue)',
                border: '2px solid #FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'var(--canary-yellow)' }} />
              </div>
              <span className="font-display" style={{ fontWeight: 900, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>
                GEOMETRY // CS
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#AAA', lineHeight: 1.6 }}>
              A high-precision educational interactive infographic engineered in Neo-Brutalist Bauhaus aesthetic. Translating computational theory into tangible geometry.
            </p>
          </div>

          {/* Col 2: Architectural Specs */}
          <div>
            <h4 style={{ fontSize: '1rem', color: 'var(--canary-yellow)', marginBottom: '1rem' }}>
              // TECHNICAL STACK
            </h4>
            <ul style={{ listStyle: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#CCC', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>• React 18 + Pure Vanilla CSS Tokens</li>
              <li>• Direct rAF DOM cursor interpolation</li>
              <li>• Procedural Web Audio API synthesizer</li>
              <li>• Zero-dependency SVG vector math</li>
            </ul>
          </div>

          {/* Col 3: Core Curricula */}
          <div>
            <h4 style={{ fontSize: '1rem', color: 'var(--cobalt-blue)', marginBottom: '1rem' }}>
              // TOPICS COVERED
            </h4>
            <ul style={{ listStyle: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#CCC', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>01. Big-O Time & Space Growth</li>
              <li>02. Call Stack Frames & Recursion</li>
              <li>03. Graph Traversals (BFS & DFS)</li>
              <li>04. Sorting Race & Quadtree Division</li>
            </ul>
          </div>

          {/* Col 4: Back to Top */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h4 style={{ fontSize: '1rem', color: 'var(--vermilion-red)', marginBottom: '0.5rem' }}>
                // NAVIGATION
              </h4>
              <span className="font-mono" style={{ fontSize: '0.8rem', color: '#888' }}>
                Return to the apex
              </span>
            </div>

            <button
              onClick={scrollToTop}
              className="brutal-btn brutal-btn-accent"
              style={{ marginTop: '1rem' }}
            >
              <ArrowUp size={16} /> BACK TO TOP
            </button>
          </div>
        </div>

        {/* Bauhaus Color Strip */}
        <div className="bauhaus-divider" style={{ borderColor: '#333', marginBottom: '2rem' }} />

        {/* Bottom Metadata */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: '#777'
        }}>
          <div>
            THE GEOMETRY OF COMPUTATION © 2026 // PRINCIPAL FRONT-END ARCHITECTURE
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span>LATENCY: 0.2ms</span>
            <span>FRAME RATE: 60-120 FPS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
