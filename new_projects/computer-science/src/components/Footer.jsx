import React from 'react';
import { ArrowUp, BookOpen } from 'lucide-react';
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
                ALGORITHMS // CS
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#AAA', lineHeight: 1.6 }}>
              Modeled after Khan Academy's Computer Science Algorithms curriculum, created in partnership with Dartmouth professors Tom Cormen and Devin Balkcom.
            </p>
          </div>

          {/* Col 2: Architectural Specs */}
          <div>
            <h4 style={{ fontSize: '1rem', color: 'var(--canary-yellow)', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>
              // CURRICULUM FOUNDATIONS
            </h4>
            <ul style={{ listStyle: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#CCC', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>• Dartmouth CS &amp; CLRS Algorithms</li>
              <li>• Asymptotic Notations: Θ, O, Ω</li>
              <li>• Divide &amp; Conquer Recurrence Trees</li>
              <li>• Graph Level-Order Queue BFS</li>
            </ul>
          </div>

          {/* Col 3: Core Curricula */}
          <div>
            <h4 style={{ fontSize: '1rem', color: 'var(--cobalt-blue)', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>
              // UNITS COVERED
            </h4>
            <ul style={{ listStyle: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#CCC', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>01. Intro &amp; Number Guessing Game</li>
              <li>02. Binary Search &amp; Logarithmic Halving</li>
              <li>03. Asymptotic Analysis (Big-Θ, Big-O, Big-Ω)</li>
              <li>04. Selection Sort &amp; Insertion Sort</li>
              <li>05. Recursion &amp; Towers of Hanoi</li>
              <li>06. Divide &amp; Conquer (Merge &amp; Quick Sort)</li>
              <li>07. Graph Representation &amp; BFS</li>
              <li>08. Khan Mastery Assessment</li>
            </ul>
          </div>

          {/* Col 4: Back to Top */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h4 style={{ fontSize: '1rem', color: 'var(--vermilion-red)', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                // NAVIGATION
              </h4>
              <span className="font-mono" style={{ fontSize: '0.8rem', color: '#888' }}>
                Return to top
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
            © 2026 // ALGORITHMS CURRICULUM // NEO-BRUTALIST BAUHAUS CS
          </div>
          <div>
            100% CLIENT-SIDE JAVASCRIPT &amp; REACT
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
