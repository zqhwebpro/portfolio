import React from 'react';
import { ArrowUp, Terminal, BookOpen, Layers } from 'lucide-react';
import { SoundEngine } from '../utils/soundEngine';
import { CORE_CS_TERMS } from '../utils/csData';

export function Footer({ onSelectSlide = () => {} }) {
  const scrollToTop = () => {
    SoundEngine.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSlideJump = (idx) => {
    SoundEngine.playClick();
    onSelectSlide(idx);
    const el = document.getElementById('interactive-slides');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer style={{
      background: '#0A0A0A',
      color: '#FFFFFF',
      borderTop: 'var(--border-thick)',
      padding: '3.5rem 0 2rem 0',
      position: 'relative'
    }}>
      <div className="container">
        {/* Top Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
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
                ALGORITHMS // CS
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#AAA', lineHeight: 1.6 }}>
              Comprehensive interactive exploration of the 8 fundamental concepts of computer science algorithms, complexity analysis, memory architectures, and problem-solving paradigms.
            </p>
          </div>

          {/* Col 2: Architectural Specs */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--canary-yellow)', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>
              // THEORETICAL TAXONOMY
            </h4>
            <ul style={{ listStyle: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#CCC', display: 'flex', flexDirection: 'column', gap: '0.45rem', padding: 0 }}>
              <li>• Computational Complexity: O(1), O(log n), O(n), O(n²)</li>
              <li>• Memory Models: Contiguous vs Heap Pointer Nodes</li>
              <li>• Recursion Call Stack Unwinding &amp; Base Cases</li>
              <li>• 3-Phase Divide, Conquer &amp; Combine Patterns</li>
            </ul>
          </div>

          {/* Col 3: The 8 Core Concepts */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--cobalt-blue)', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>
              // 8 CORE CS CONCEPTS
            </h4>
            <ul style={{ listStyle: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#CCC', display: 'flex', flexDirection: 'column', gap: '0.4rem', padding: 0 }}>
              {CORE_CS_TERMS.map((item, idx) => (
                <li
                  key={item.id}
                  onClick={() => handleSlideJump(idx)}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'color 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--canary-yellow)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#CCC'}
                >
                  <span style={{ color: item.color, fontWeight: 800 }}>{String(idx + 1).padStart(2, '0')}.</span>
                  <span>{item.term}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Back to Top & Quick Jump */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--vermilion-red)', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                // NAVIGATION
              </h4>
              <span className="font-mono" style={{ fontSize: '0.8rem', color: '#888' }}>
                Quick Jump &amp; Return to Top
              </span>
            </div>

            <button
              onClick={scrollToTop}
              className="brutal-btn brutal-btn-yellow"
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
            © 2026 // COMPUTER SCIENCE ALGORITHMS FOUNDATIONS
          </div>
          <div>
            8 CORE SLIDES &bull; CANONICAL DEFINITIONS &bull; REACT VITE
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

