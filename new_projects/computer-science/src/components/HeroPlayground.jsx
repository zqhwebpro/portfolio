import React, { useState } from 'react';
import { 
  Terminal, Database, Clock, HardDrive, Hash, RefreshCw, GitBranch, Crosshair, 
  ArrowRight, Sparkles, Zap, ShieldCheck, Cpu, Layers, Play, CheckCircle2, RotateCcw
} from 'lucide-react';
import { CORE_CS_TERMS } from '../utils/csData';
import { SoundEngine } from '../utils/soundEngine';

export function HeroPlayground({ onSelectSlide = () => {} }) {
  // Interactive Algorithmic Efficiency Sandbox (Linear O(N) vs Binary O(log N))
  const [searchTarget, setSearchTarget] = useState(67);
  const [arraySize, setArraySize] = useState(100);
  const [sandboxMode, setSandboxMode] = useState('comparison'); // 'comparison' | 'interactive'
  const [activeStep, setActiveStep] = useState(null);

  const linearOps = searchTarget;
  const binaryOps = Math.ceil(Math.log2(searchTarget + 1));
  const maxBinaryOps = Math.ceil(Math.log2(arraySize));

  const getConceptIcon = (id) => {
    switch (id) {
      case 'algorithm': return <Terminal size={18} />;
      case 'data-structure': return <Database size={18} />;
      case 'time-complexity': return <Clock size={18} />;
      case 'space-complexity': return <HardDrive size={18} />;
      case 'big-o-notation': return <Hash size={18} />;
      case 'recursion': return <RefreshCw size={18} />;
      case 'divide-and-conquer': return <GitBranch size={18} />;
      case 'brute-force': return <Crosshair size={18} />;
      default: return <Cpu size={18} />;
    }
  };

  const handleLaunchConcept = (index) => {
    SoundEngine.playFanfare();
    onSelectSlide(index);
    const el = document.getElementById('interactive-slides');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="section-padding" style={{
      background: 'var(--bg-paper)',
      borderBottom: 'var(--border-thick)',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Intro Meta Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
            <span className="brutal-badge brutal-badge-red font-mono" style={{ fontSize: '0.8rem' }}>
              THEORETICAL COMPUTER SCIENCE
            </span>
            <span className="brutal-badge brutal-badge-yellow font-mono" style={{ fontSize: '0.8rem' }}>
              8 CORE FUNDAMENTALS
            </span>
            <span className="brutal-badge brutal-badge-cyan font-mono" style={{ fontSize: '0.8rem' }}>
              INTERACTIVE INFOGRAPHIC CURRICULUM
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            margin: '0.5rem 0 1rem',
            color: 'var(--ink-black)'
          }}>
            THE 8 FUNDAMENTAL CONCEPTS
            <span style={{
              display: 'inline-block',
              background: 'var(--canary-yellow)',
              padding: '0 0.5rem',
              marginLeft: '0.5rem',
              border: '3px solid #000',
              boxShadow: '4px 4px 0 #000'
            }}>
              OF ALGORITHMS
            </span>
          </h1>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
            color: 'var(--text-muted)',
            maxWidth: '900px',
            lineHeight: 1.6
          }}>
            Computer science is fundamentally the study of computation, information representation, and algorithmic efficiency. This interactive infographic masterclass explores the <strong>8 core pillars</strong> that form the mathematical bedrock of all modern software engineering.
          </p>
        </div>

        {/* ⚡ 8 CORE CONCEPTS INTERACTIVE LAUNCH GRID */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
            borderBottom: '2px solid #000',
            paddingBottom: '0.5rem',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              margin: 0
            }}>
              THE 8 PILLARS OF ALGORITHMIC THINKING
            </h2>
            <span className="font-mono text-xs" style={{ color: '#666', fontWeight: 700 }}>
              CLICK ANY PILLAR TO LAUNCH ITS INTERACTIVE SLIDE LAB
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem'
          }}>
            {CORE_CS_TERMS.map((concept, idx) => (
              <div
                key={concept.id}
                onClick={() => handleLaunchConcept(idx)}
                className="brutal-card"
                style={{
                  background: '#FFFFFF',
                  cursor: 'pointer',
                  padding: '1.25rem',
                  transition: 'all 0.15s ease',
                  borderLeft: `6px solid ${concept.color}`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      background: concept.color,
                      color: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #000',
                      boxShadow: '2px 2px 0 #000'
                    }}>
                      {getConceptIcon(concept.id)}
                    </div>
                    <span className="font-mono text-xs" style={{ fontWeight: 800, color: '#666' }}>
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: '1.15rem',
                    margin: '0 0 0.35rem 0',
                    color: 'var(--ink-black)'
                  }}>
                    {concept.term}
                  </h3>

                  <p style={{
                    fontSize: '0.82rem',
                    color: '#555',
                    lineHeight: 1.45,
                    margin: 0
                  }}>
                    {concept.shortDesc}
                  </p>
                </div>

                <div style={{
                  marginTop: '1rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid #EEE',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span className={`brutal-badge ${concept.badgeClass}`} style={{ fontSize: '0.68rem', padding: '0.15rem 0.4rem' }}>
                    {concept.paradigm}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--cobalt-blue)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    EXPLORE <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2-Column Unit 02+ Structured Introduction Chassis */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}>

          {/* Left Column: Computational Foundations Card */}
          <div className="brutal-card brutal-card-blue">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Zap size={22} color="var(--canary-yellow)" />
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.35rem', margin: 0 }}>
                WHAT MAKES A VALID ALGORITHM?
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', lineHeight: 1.5 }}>
              <div style={{
                background: 'rgba(255,255,255,0.12)',
                padding: '0.85rem',
                border: '1.5px solid rgba(255,255,255,0.25)'
              }}>
                <strong style={{ color: 'var(--canary-yellow)', display: 'block', marginBottom: '0.2rem', fontFamily: 'var(--font-mono)' }}>
                  1. FINITENESS (Halting Guarantee)
                </strong>
                An algorithm must always terminate after a countable, finite sequence of execution steps for all valid inputs.
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.12)',
                padding: '0.85rem',
                border: '1.5px solid rgba(255,255,255,0.25)'
              }}>
                <strong style={{ color: 'var(--emerald-mint)', display: 'block', marginBottom: '0.2rem', fontFamily: 'var(--font-mono)' }}>
                  2. DEFINITENESS & DETERMINISM
                </strong>
                Each instruction must be completely unambiguous. Given identical initial parameters, an algorithm must transition through identical states.
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.12)',
                padding: '0.85rem',
                border: '1.5px solid rgba(255,255,255,0.25)'
              }}>
                <strong style={{ color: '#00F0FF', display: 'block', marginBottom: '0.2rem', fontFamily: 'var(--font-mono)' }}>
                  3. EFFECTIVENESS & FEASIBILITY
                </strong>
                Every operation must be basic enough to be carried out exactly in a finite amount of physical time using available CPU and memory resources.
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Algorithmic Strategy Visualizer */}
          <div className="brutal-card" style={{ background: '#FFFFFF' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
              borderBottom: '2px solid #000',
              paddingBottom: '0.75rem',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              <div>
                <span className="brutal-badge brutal-badge-mint font-mono" style={{ fontSize: '0.72rem' }}>
                  INTERACTIVE INTRO LAB
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.25rem', margin: '0.25rem 0 0' }}>
                  THE POWER OF ALGORITHMIC EFFICIENCY
                </h3>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#444', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              Compare how different algorithmic strategies tackle searching through <strong>{arraySize} sorted elements</strong>. Notice how logarithmic halving crushes sequential brute-force scanning:
            </p>

            {/* Target Number Selector Slider */}
            <div style={{
              background: 'var(--bg-paper)',
              padding: '1rem',
              border: '2px solid #000',
              marginBottom: '1.25rem',
              boxShadow: '3px 3px 0 #000'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                <span>SEARCH TARGET VALUE:</span>
                <span style={{ color: 'var(--cobalt-blue)', background: '#FFF', padding: '0.1rem 0.5rem', border: '1px solid #000' }}>
                  {searchTarget} / {arraySize}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max={arraySize}
                value={searchTarget}
                onChange={(e) => {
                  setSearchTarget(Number(e.target.value));
                  SoundEngine.playPop();
                }}
                style={{ width: '100%', accentColor: 'var(--cobalt-blue)', cursor: 'pointer' }}
              />
            </div>

            {/* Live Operation Counter Comparison Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              fontFamily: 'var(--font-mono)'
            }}>
              <div style={{
                background: '#FFF0F3',
                padding: '1rem',
                border: '2px solid #000',
                boxShadow: '3px 3px 0 #000'
              }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--vermilion-red)', textTransform: 'uppercase' }}>
                  BRUTE FORCE / LINEAR SCAN
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--vermilion-red)', margin: '0.35rem 0' }}>
                  {linearOps} <span style={{ fontSize: '0.8rem', color: '#666' }}>ops</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#555' }}>
                  Time Complexity: <strong>O(n)</strong>
                </div>
              </div>

              <div style={{
                background: '#E6FBF5',
                padding: '1rem',
                border: '2px solid #000',
                boxShadow: '3px 3px 0 #000'
              }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--emerald-mint)', textTransform: 'uppercase' }}>
                  DIVIDE & CONQUER / BINARY
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--cobalt-blue)', margin: '0.35rem 0' }}>
                  {binaryOps} <span style={{ fontSize: '0.8rem', color: '#666' }}>ops</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#555' }}>
                  Time Complexity: <strong>O(log n)</strong>
                </div>
              </div>
            </div>

            <div style={{
              marginTop: '1.25rem',
              background: 'var(--canary-yellow)',
              border: '2px solid #000',
              padding: '0.75rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span>ALGORITHMIC SPEEDUP:</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 900 }}>
                {(linearOps / Math.max(1, binaryOps)).toFixed(1)}x FASTER
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
