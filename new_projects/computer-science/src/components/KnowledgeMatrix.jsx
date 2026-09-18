import React, { useState } from 'react';
import { BookOpen, Code, Database, Cpu, Zap, Layers, GitBranch, Crosshair, ArrowRight, CheckCircle2, ChevronRight, Terminal, Clock, HardDrive, Hash, RefreshCw, Box } from 'lucide-react';
import { CORE_CS_TERMS, CS_KNOWLEDGE_MATRIX } from '../utils/csData';
import { SoundEngine } from '../utils/soundEngine';

export function KnowledgeMatrix() {
  const [selectedTermId, setSelectedTermId] = useState('algorithm');
  const [filterCategory, setFilterCategory] = useState('all');
  const [matrixSearch, setMatrixSearch] = useState('');

  const activeTerm = CORE_CS_TERMS.find(t => t.id === selectedTermId) || CORE_CS_TERMS[0];

  const filteredTerms = CORE_CS_TERMS.filter(t => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'foundation') return t.paradigm === 'Foundation' || t.paradigm === 'Memory & Architecture';
    if (filterCategory === 'complexity') return t.paradigm === 'Complexity Analysis' || t.paradigm === 'Asymptotic Theory';
    if (filterCategory === 'paradigm') return t.paradigm === 'Algorithmic Paradigm';
    return true;
  });

  const getIconForTerm = (id) => {
    switch (id) {
      case 'algorithm': return <Terminal size={18} />;
      case 'data-structure': return <Database size={18} />;
      case 'time-complexity': return <Clock size={18} />;
      case 'space-complexity': return <HardDrive size={18} />;
      case 'big-o-notation': return <Hash size={18} />;
      case 'recursion': return <RefreshCw size={18} />;
      case 'divide-and-conquer': return <GitBranch size={18} />;
      case 'brute-force': return <Crosshair size={18} />;
      default: return <BookOpen size={18} />;
    }
  };

  return (
    <section id="core-taxonomy" className="section-padding" style={{ background: '#FFFFFF', borderBottom: 'var(--border-thick)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <span className="brutal-badge brutal-badge-cyan font-mono" style={{ fontSize: '0.8rem' }}>
              UNIT 00 // FOUNDATIONAL COMPUTER SCIENCE TAXONOMY
            </span>
            <span className="brutal-badge brutal-badge-yellow font-mono" style={{ fontSize: '0.8rem' }}>
              8 CORE THEORETICAL PILLARS
            </span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.85rem, 4vw, 3rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: '0.25rem 0 0.75rem',
            color: 'var(--ink-black)'
          }}>
            THE 8 FUNDAMENTAL <span style={{ color: 'var(--cobalt-blue)' }}>CONCEPTS OF ALGORITHMS</span>
          </h2>
          <p style={{ fontSize: '1rem', color: '#4B5563', maxWidth: '820px', lineHeight: 1.5, margin: 0 }}>
            Mastering computer science begins with a precise, rigorous understanding of these eight foundational terms. Explore their definitions, theoretical mechanics, asymptotic trade-offs, and practical implementations below.
          </p>
        </div>

        {/* 1. CANONICAL QUICK REFERENCE COMPARISON TABLE */}
        <div className="brutal-card" style={{
          background: 'var(--bg-paper)',
          padding: '1.25rem',
          marginBottom: '2rem',
          border: 'var(--border-thick)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={18} color="var(--cobalt-blue)" />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, margin: 0, textTransform: 'uppercase' }}>
                Canonical Terms &amp; Definitions Cheat Sheet
              </h3>
            </div>
            <span className="font-mono text-xs" style={{ color: '#6B7280', fontWeight: 700 }}>
              CLICK ANY ROW TO EXPAND FULL ELABORATION
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: '#FFFFFF',
              border: 'var(--border-solid)',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-sans)'
            }}>
              <thead>
                <tr style={{ background: '#0A0A0A', color: '#FFFFFF', textAlign: 'left', fontFamily: 'var(--font-mono)' }}>
                  <th style={{ padding: '0.75rem 1rem', borderRight: '1px solid #333' }}>TERM</th>
                  <th style={{ padding: '0.75rem 1rem', borderRight: '1px solid #333' }}>CANONICAL DESCRIPTION</th>
                  <th style={{ padding: '0.75rem 1rem', borderRight: '1px solid #333' }}>CATEGORY / METRIC</th>
                  <th style={{ padding: '0.75rem 1rem' }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {CORE_CS_TERMS.map((item, idx) => {
                  const isSelected = selectedTermId === item.id;
                  return (
                    <tr
                      key={item.id}
                      onClick={() => {
                        setSelectedTermId(item.id);
                        SoundEngine.playClick();
                      }}
                      style={{
                        background: isSelected ? 'rgba(0, 240, 255, 0.12)' : (idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB'),
                        borderBottom: '1px solid var(--border-light)',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease'
                      }}
                    >
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 800, fontFamily: 'var(--font-mono)', borderRight: '1px solid var(--border-light)', color: 'var(--ink-black)', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                          <span style={{ color: item.color }}>{getIconForTerm(item.id)}</span>
                          <span>{item.term}</span>
                        </div>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', color: '#1F2937', borderRight: '1px solid var(--border-light)', lineHeight: 1.45 }}>
                        <strong>{item.shortDesc}</strong>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', borderRight: '1px solid var(--border-light)', whiteSpace: 'nowrap' }}>
                        <span className={`brutal-badge ${item.badgeClass}`} style={{ fontSize: '0.68rem' }}>
                          {item.badge}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                        <button
                          className="brutal-btn brutal-btn-sm"
                          style={{
                            padding: '0.2rem 0.6rem',
                            fontSize: '0.72rem',
                            background: isSelected ? 'var(--canary-yellow)' : '#FFF'
                          }}
                        >
                          {isSelected ? 'ACTIVE' : 'EXPAND'} →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. DEEP-DIVE INTERACTIVE EXPLORER (Selected Term Analysis) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr)) 1.6fr', gap: '1.5rem', alignItems: 'start' }}>
          
          {/* Left Column: 8 Selectable Term Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span className="font-mono text-xs" style={{ fontWeight: 800, color: 'var(--ink-black)' }}>
                SELECT CONCEPT TO EXAMINE:
              </span>
              <div style={{ display: 'flex', gap: '0.3rem' }}>
                <button
                  onClick={() => setFilterCategory('all')}
                  className="brutal-btn brutal-btn-sm"
                  style={{ padding: '0.15rem 0.45rem', fontSize: '0.68rem', background: filterCategory === 'all' ? 'var(--canary-yellow)' : '#FFF' }}
                >
                  ALL (8)
                </button>
                <button
                  onClick={() => setFilterCategory('complexity')}
                  className="brutal-btn brutal-btn-sm"
                  style={{ padding: '0.15rem 0.45rem', fontSize: '0.68rem', background: filterCategory === 'complexity' ? 'var(--canary-yellow)' : '#FFF' }}
                >
                  COMPLEXITY
                </button>
                <button
                  onClick={() => setFilterCategory('paradigm')}
                  className="brutal-btn brutal-btn-sm"
                  style={{ padding: '0.15rem 0.45rem', fontSize: '0.68rem', background: filterCategory === 'paradigm' ? 'var(--canary-yellow)' : '#FFF' }}
                >
                  PARADIGMS
                </button>
              </div>
            </div>

            {filteredTerms.map((t) => {
              const isSelected = selectedTermId === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => {
                    setSelectedTermId(t.id);
                    SoundEngine.playClick();
                  }}
                  className="brutal-card"
                  style={{
                    padding: '0.85rem 1.1rem',
                    background: isSelected ? '#FFFFFF' : 'var(--bg-paper)',
                    border: isSelected ? '3px solid var(--ink-black)' : '1.5px solid var(--ink-black)',
                    boxShadow: isSelected ? 'var(--shadow-md)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    transform: isSelected ? 'translateX(4px)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <span style={{ color: t.color }}>{getIconForTerm(t.id)}</span>
                      <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', color: 'var(--ink-black)' }}>
                        {t.term}
                      </strong>
                    </div>
                    <span className={`brutal-badge ${t.badgeClass}`} style={{ fontSize: '0.62rem', padding: '0.1rem 0.35rem' }}>
                      {t.paradigm}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#4B5563', margin: 0, lineHeight: 1.35 }}>
                    {t.shortDesc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Elaborated Deep-Dive Showcase */}
          <div className="brutal-card" style={{
            background: '#FFFFFF',
            padding: 'clamp(1.25rem, 3vw, 1.85rem)',
            border: 'var(--border-thick)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            
            {/* Term Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', borderBottom: 'var(--border-solid)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <span className={`brutal-badge ${activeTerm.badgeClass}`}>
                    {activeTerm.badge}
                  </span>
                  <span className="font-mono text-xs" style={{ color: '#6B7280', fontWeight: 700 }}>
                    TAXONOMY ENTRY #{CORE_CS_TERMS.findIndex(x => x.id === activeTerm.id) + 1} OF 8
                  </span>
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  fontWeight: 900,
                  margin: 0,
                  color: 'var(--ink-black)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem'
                }}>
                  <span style={{ color: activeTerm.color }}>{getIconForTerm(activeTerm.id)}</span>
                  <span>{activeTerm.term}</span>
                </h3>
              </div>

              <div style={{ background: 'var(--bg-paper)', border: 'var(--border-solid)', padding: '0.5rem 0.85rem', textAlign: 'right', borderRadius: '4px' }}>
                <div className="font-mono text-xs" style={{ color: '#6B7280' }}>PARADIGM DOMAIN</div>
                <div className="font-mono" style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--ink-black)' }}>
                  {activeTerm.paradigm}
                </div>
              </div>
            </div>

            {/* Canonical Definition Box (Highlighted Callout) */}
            <div style={{
              background: 'var(--canary-yellow)',
              border: 'var(--border-thick)',
              padding: '1rem 1.25rem',
              marginBottom: '1.25rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div className="font-mono text-xs" style={{ fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem', color: '#0A0A0A' }}>
                ★ CANONICAL DEFINITION:
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0A0A0A', lineHeight: 1.45 }}>
                "{activeTerm.shortDesc}"
              </div>
            </div>

            {/* Deep Technical Elaboration */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--cobalt-blue)', marginBottom: '0.5rem' }}>
                // DEEP THEORETICAL &amp; ARCHITECTURAL ELABORATION:
              </h4>
              <p style={{ fontSize: '0.95rem', color: '#1F2937', lineHeight: 1.65, margin: 0 }}>
                {activeTerm.elaboration}
              </p>
            </div>

            {/* Key Properties & Production Examples (2-Column Grid) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              
              {/* Properties */}
              <div style={{ background: 'var(--bg-paper)', border: 'var(--border-solid)', padding: '1rem', borderRadius: '4px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, color: 'var(--ink-black)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  ✓ Core Architectural Attributes:
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.82rem', color: '#374151', lineHeight: 1.5 }}>
                  {activeTerm.keyProperties.map((p, idx) => (
                    <li key={idx} style={{ marginBottom: '0.3rem' }}>{p}</li>
                  ))}
                </ul>
              </div>

              {/* Examples */}
              <div style={{ background: 'var(--bg-paper)', border: 'var(--border-solid)', padding: '1rem', borderRadius: '4px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, color: 'var(--ink-black)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  ⚡ Real-World Implementations:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {activeTerm.examples.map((ex, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: '#1F2937' }}>
                      <span style={{ color: 'var(--emerald-mint)', fontWeight: 800 }}>▸</span>
                      <span>{ex}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Pseudocode / Code Implementation Box */}
            <div style={{ background: '#0A0A0A', color: '#F3F4F6', border: 'var(--border-thick)', padding: '1rem 1.25rem', borderRadius: '4px', overflowX: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
                <span className="font-mono text-xs" style={{ color: 'var(--canary-yellow)', fontWeight: 800 }}>
                  <Code size={13} style={{ display: 'inline', marginRight: '4px' }} />
                  {activeTerm.term.toUpperCase()} // CODE IMPLEMENTATION PATTERN
                </span>
                <span className="font-mono text-xs" style={{ color: '#888' }}>JavaScript / ES6</span>
              </div>
              <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.84rem', lineHeight: 1.5, color: '#A7F3D0' }}>
                <code>{activeTerm.codeSnippet}</code>
              </pre>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default KnowledgeMatrix;
