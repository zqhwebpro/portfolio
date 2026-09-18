import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Database, Clock, HardDrive, Hash, RefreshCw, GitBranch, Crosshair, 
  ChevronLeft, ChevronRight, Play, Pause, RotateCcw, CheckCircle2, Sparkles, 
  Layers, Cpu, BookOpen, ArrowRight, Zap, Code, ShieldCheck, HelpCircle
} from 'lucide-react';
import { CORE_CS_TERMS, BIG_O_CURVES } from '../utils/csData';
import { SoundEngine } from '../utils/soundEngine';

export function ConceptSlideDeck() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // --- Interactive Mini-Simulators State per Slide ---
  // Slide 1: Algorithm State Machine
  const [algoStep, setAlgoStep] = useState(1);
  const [algoA, setAlgoA] = useState(48);
  const [algoB, setAlgoB] = useState(18);

  // Slide 2: Data Structure Switcher
  const [activeDsType, setActiveDsType] = useState('array'); // 'array' | 'linked-list' | 'binary-tree'

  // Slide 3: Time Complexity Slider
  const [complexityN, setComplexityN] = useState(100);

  // Slide 4: Space Complexity Mode
  const [spaceMode, setSpaceMode] = useState('inplace'); // 'inplace' | 'auxiliary' | 'recursive'

  // Slide 5: Big O Selected Curve
  const [selectedCurveId, setSelectedCurveId] = useState('onlogn');

  // Slide 6: Recursion Stack Stepper
  const [recursionN, setRecursionN] = useState(4);
  const [stackStep, setStackStep] = useState(0);

  // Slide 7: Divide & Conquer Phase
  const [dncPhase, setDncPhase] = useState(1); // 1: Divide, 2: Conquer, 3: Combine

  // Slide 8: Brute Force Permutation Counter
  const [bruteForceTarget, setBruteForceTarget] = useState(42);
  const [bruteForceCurrent, setBruteForceCurrent] = useState(0);
  const [isBruteRunning, setIsBruteRunning] = useState(false);

  const totalSlides = CORE_CS_TERMS.length;
  const currentSlide = CORE_CS_TERMS[currentSlideIndex];

  // Auto-play presentation timer
  useEffect(() => {
    let interval = null;
    if (isPlayingAuto) {
      interval = setInterval(() => {
        setCurrentSlideIndex(prev => (prev + 1) % totalSlides);
        SoundEngine.playBlip();
      }, 8000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlayingAuto, totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNextSlide();
      } else if (e.key === 'ArrowLeft') {
        handlePrevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  const handleNextSlide = () => {
    SoundEngine.playClick();
    setCurrentSlideIndex(prev => (prev + 1) % totalSlides);
  };

  const handlePrevSlide = () => {
    SoundEngine.playClick();
    setCurrentSlideIndex(prev => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleSelectSlide = (index) => {
    SoundEngine.playClick();
    setCurrentSlideIndex(index);
  };

  const getIconForTerm = (id) => {
    switch (id) {
      case 'algorithm': return <Terminal size={22} />;
      case 'data-structure': return <Database size={22} />;
      case 'time-complexity': return <Clock size={22} />;
      case 'space-complexity': return <HardDrive size={22} />;
      case 'big-o-notation': return <Hash size={22} />;
      case 'recursion': return <RefreshCw size={22} />;
      case 'divide-and-conquer': return <GitBranch size={22} />;
      case 'brute-force': return <Crosshair size={22} />;
      default: return <BookOpen size={22} />;
    }
  };

  // Run brute force animation
  const runBruteForceSearch = () => {
    setIsBruteRunning(true);
    setBruteForceCurrent(0);
    let curr = 0;
    const interval = setInterval(() => {
      curr++;
      setBruteForceCurrent(curr);
      if (curr >= bruteForceTarget) {
        clearInterval(interval);
        setIsBruteRunning(false);
        SoundEngine.playFanfare();
      } else {
        SoundEngine.playBlip();
      }
    }, 40);
  };

  return (
    <section id="core-taxonomy" className="section-padding" style={{ background: '#FFFFFF', borderBottom: 'var(--border-thick)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <span className="brutal-badge brutal-badge-cyan font-mono" style={{ fontSize: '0.8rem' }}>
              MASTER CURRICULUM // INTERACTIVE CONCEPT SLIDES
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
            margin: '0.25rem 0 0.5rem',
            color: 'var(--ink-black)'
          }}>
            THE 8 FUNDAMENTAL <span style={{ color: 'var(--cobalt-blue)' }}>CONCEPTS OF ALGORITHMS</span>
          </h2>
          <p style={{ fontSize: '1rem', color: '#4B5563', maxWidth: '820px', lineHeight: 1.5, margin: 0 }}>
            Explore the 8 canonical concepts of computer science through interactive slides. Each concept is presented with its exact definition, asymptotic mechanics, live simulation, and formal engineering trade-offs.
          </p>
        </div>

        {/* 🎛️ SLIDE NAVIGATION BAR (Pills for all 8 slides) */}
        <div style={{
          background: '#0A0A0A',
          padding: '0.6rem 0.8rem',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          {/* Slide Selector Buttons */}
          <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '2px', flex: 1 }}>
            {CORE_CS_TERMS.map((item, idx) => {
              const isActive = idx === currentSlideIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectSlide(idx)}
                  className="font-mono text-xs"
                  style={{
                    background: isActive ? item.color : '#1A1A1A',
                    color: isActive ? '#000000' : '#FFFFFF',
                    border: '1px solid #333333',
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-xs)',
                    fontWeight: 800,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{String(idx + 1).padStart(2, '0')}</span>
                  <span>{item.term}</span>
                </button>
              );
            })}
          </div>

          {/* Presentation Toolbar Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => setIsPlayingAuto(!isPlayingAuto)}
              className="brutal-btn brutal-btn-sm"
              style={{
                background: isPlayingAuto ? 'var(--emerald-mint)' : '#262626',
                color: isPlayingAuto ? '#000' : '#FFF',
                border: '1px solid #444',
                padding: '0.3rem 0.65rem',
                fontSize: '0.75rem'
              }}
              title="Toggle 8-Second Auto Slide Timer"
            >
              {isPlayingAuto ? <Pause size={12} /> : <Play size={12} />}
              <span>{isPlayingAuto ? 'PAUSE' : 'AUTO PLAY'}</span>
            </button>

            <span className="font-mono" style={{ color: '#888', fontSize: '0.78rem', margin: '0 0.25rem' }}>
              <strong style={{ color: '#FFF' }}>{currentSlideIndex + 1}</strong> / {totalSlides}
            </span>

            <button
              onClick={handlePrevSlide}
              className="brutal-btn brutal-btn-sm"
              style={{ background: '#262626', color: '#FFF', border: '1px solid #444', padding: '0.3rem 0.5rem' }}
              title="Previous Slide (Left Arrow)"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={handleNextSlide}
              className="brutal-btn brutal-btn-sm"
              style={{ background: 'var(--canary-yellow)', color: '#000', border: '1px solid #000', padding: '0.3rem 0.5rem' }}
              title="Next Slide (Right Arrow)"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* 🖥️ MAIN ACTIVE SLIDE PRESENTATION CARD */}
        <div className="brutal-card" style={{
          background: 'var(--bg-paper)',
          padding: 'clamp(1.25rem, 3vw, 2.25rem)',
          border: 'var(--border-thick)',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '2rem',
          position: 'relative'
        }}>
          
          {/* Top Slide Meta Strip */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: 'var(--border-solid)',
            paddingBottom: '0.85rem',
            marginBottom: '1.25rem',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: currentSlide.color,
                color: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-xs)',
                border: '2px solid #000',
                boxShadow: '2px 2px 0px #000'
              }}>
                {getIconForTerm(currentSlide.id)}
              </div>
              <div>
                <span className="font-mono text-xs" style={{ color: '#6B7280', fontWeight: 800, textTransform: 'uppercase' }}>
                  SLIDE {String(currentSlideIndex + 1).padStart(2, '0')} OF 08 &bull; {currentSlide.paradigm}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 3.2vw, 2.3rem)',
                  fontWeight: 900,
                  margin: 0,
                  lineHeight: 1.1,
                  color: 'var(--ink-black)'
                }}>
                  {currentSlide.term}
                </h3>
              </div>
            </div>

            <span className={`brutal-badge ${currentSlide.badgeClass}`} style={{ fontSize: '0.78rem', padding: '0.35rem 0.85rem' }}>
              {currentSlide.badge}
            </span>
          </div>

          {/* 🎯 1. EXACT CANONICAL DEFINITION CALLOUT BOX */}
          <div style={{
            background: '#FFFFFF',
            border: '2px solid var(--ink-black)',
            borderLeft: `8px solid ${currentSlide.color}`,
            borderRadius: 'var(--radius-xs)',
            padding: '1.15rem 1.4rem',
            marginBottom: '1.5rem',
            boxShadow: '3px 3px 0px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
              <Sparkles size={16} color="var(--cobalt-blue)" />
              <span className="font-mono text-xs" style={{ fontWeight: 800, textTransform: 'uppercase', color: 'var(--cobalt-blue)' }}>
                Exact Canonical Definition
              </span>
            </div>
            <p style={{
              fontSize: '1.15rem',
              fontWeight: 800,
              lineHeight: 1.4,
              color: 'var(--ink-black)',
              margin: 0,
              fontFamily: 'var(--font-display)'
            }}>
              "{currentSlide.shortDesc}"
            </p>
          </div>

          {/* 2-COLUMN SPLIT: ELABORATION (LEFT) & INTERACTIVE SIMULATOR (RIGHT) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: '1.5rem',
            alignItems: 'start',
            marginBottom: '1.5rem'
          }}>
            
            {/* LEFT: THEORETICAL ELABORATION & PROPERTIES */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              <div>
                <h4 className="font-mono text-xs" style={{ fontWeight: 800, color: '#4B5563', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Theoretical Mechanics &amp; Execution Paradigm
                </h4>
                <p style={{ fontSize: '0.92rem', color: '#1F2937', lineHeight: 1.6, margin: 0 }}>
                  {currentSlide.elaboration}
                </p>
              </div>

              {/* Key Properties Box */}
              <div style={{
                background: '#F9FAFB',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-xs)',
                padding: '1rem'
              }}>
                <h5 className="font-mono text-xs" style={{ fontWeight: 800, color: 'var(--ink-black)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Key Properties &amp; Guarantees:
                </h5>
                <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.85rem', color: '#374151', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {currentSlide.keyProperties.map((prop, idx) => (
                    <li key={idx}><strong>{prop.split('(')[0]}</strong> {prop.includes('(') ? `(${prop.split('(')[1]}` : ''}</li>
                  ))}
                </ul>
              </div>

              {/* Real World Applications */}
              <div>
                <h5 className="font-mono text-xs" style={{ fontWeight: 800, color: '#4B5563', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Applied Systems &amp; Real-World Examples:
                </h5>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {currentSlide.examples.map((ex, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-xs"
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid var(--border-medium)',
                        padding: '0.25rem 0.6rem',
                        borderRadius: 'var(--radius-xs)',
                        color: 'var(--ink-black)',
                        fontWeight: 600
                      }}
                    >
                      &bull; {ex}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT: INTERACTIVE SLIDE SIMULATOR WIDGET */}
            <div style={{
              background: '#0A0A0A',
              color: '#FFFFFF',
              border: '2px solid #000000',
              borderRadius: 'var(--radius-xs)',
              padding: '1.25rem',
              boxShadow: '4px 4px 0px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '340px'
            }}>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #262626',
                paddingBottom: '0.5rem',
                marginBottom: '1rem'
              }}>
                <span className="font-mono text-xs" style={{ color: currentSlide.color, fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Zap size={14} /> LIVE CONCEPT SIMULATOR
                </span>
                <span className="font-mono text-xs" style={{ color: '#888' }}>
                  INTERACTIVE LAB
                </span>
              </div>

              {/* DYNAMIC MINI-SIMULATOR PER SLIDE */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                
                {/* 1. ALGORITHM: STEPPER MACHINE */}
                {currentSlide.id === 'algorithm' && (
                  <div>
                    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                      <div className="font-mono text-xs" style={{ color: '#AAA' }}>Euclidean GCD Algorithm Step-Through</div>
                      <div className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--canary-yellow)', margin: '4px 0' }}>
                        gcd({algoA}, {algoB})
                      </div>
                    </div>

                    <div style={{ background: '#171717', border: '1px solid #333', padding: '0.85rem', borderRadius: '4px', marginBottom: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                      {algoStep === 1 && <div>Step 1: Check if B (18) == 0. (False ➔ Continue)</div>}
                      {algoStep === 2 && <div>Step 2: Calculate remainder R = 48 % 18 = 12.</div>}
                      {algoStep === 3 && <div>Step 3: Shift states: A = 18, B = 12 ➔ Next remainder R = 18 % 12 = 6.</div>}
                      {algoStep === 4 && <div>Step 4: Shift states: A = 12, B = 6 ➔ Remainder R = 12 % 6 = 0.</div>}
                      {algoStep === 5 && <div style={{ color: 'var(--emerald-mint)', fontWeight: 800 }}>Step 5: B is 0! Terminating GCD Answer = 6.</div>}
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      <button 
                        onClick={() => { setAlgoStep(Math.max(1, algoStep - 1)); SoundEngine.playClick(); }} 
                        className="brutal-btn brutal-btn-sm" 
                        style={{ background: '#333', color: '#FFF' }}
                      >
                        &larr; Prev Step
                      </button>
                      <button 
                        onClick={() => { setAlgoStep(Math.min(5, algoStep + 1)); SoundEngine.playPop(); }} 
                        className="brutal-btn brutal-btn-sm" 
                        style={{ background: 'var(--canary-yellow)', color: '#000' }}
                      >
                        Next Step &rarr;
                      </button>
                      <button 
                        onClick={() => { setAlgoStep(1); SoundEngine.playClick(); }} 
                        className="brutal-btn brutal-btn-sm" 
                        style={{ background: '#222', color: '#AAA' }}
                      >
                        <RotateCcw size={12} />
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. DATA STRUCTURE: MEMORY LAYOUT SWITCHER */}
                {currentSlide.id === 'data-structure' && (
                  <div>
                    <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '1rem', justifyContent: 'center' }}>
                      <button 
                        onClick={() => { setActiveDsType('array'); SoundEngine.playClick(); }}
                        className="brutal-btn brutal-btn-sm" 
                        style={{ background: activeDsType === 'array' ? 'var(--emerald-mint)' : '#222', color: activeDsType === 'array' ? '#000' : '#FFF' }}
                      >
                        Contiguous Array
                      </button>
                      <button 
                        onClick={() => { setActiveDsType('linked-list'); SoundEngine.playClick(); }}
                        className="brutal-btn brutal-btn-sm" 
                        style={{ background: activeDsType === 'linked-list' ? 'var(--emerald-mint)' : '#222', color: activeDsType === 'linked-list' ? '#000' : '#FFF' }}
                      >
                        Linked List
                      </button>
                      <button 
                        onClick={() => { setActiveDsType('binary-tree'); SoundEngine.playClick(); }}
                        className="brutal-btn brutal-btn-sm" 
                        style={{ background: activeDsType === 'binary-tree' ? 'var(--emerald-mint)' : '#222', color: activeDsType === 'binary-tree' ? '#000' : '#FFF' }}
                      >
                        Binary Tree
                      </button>
                    </div>

                    <div style={{ background: '#171717', border: '1px solid #333', padding: '1rem', borderRadius: '4px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                      {activeDsType === 'array' && (
                        <div>
                          <div className="text-xs" style={{ color: '#888', marginBottom: '6px' }}>Indexed Contiguous Buffer [O(1) Random Access]</div>
                          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
                            {['[0]=10', '[1]=24', '[2]=35', '[3]=48', '[4]=92'].map((b, i) => (
                              <span key={i} style={{ background: '#00E599', color: '#000', padding: '4px 6px', fontSize: '11px', fontWeight: 800, borderRadius: '2px' }}>{b}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {activeDsType === 'linked-list' && (
                        <div>
                          <div className="text-xs" style={{ color: '#888', marginBottom: '6px' }}>Heap Pointer Nodes [O(1) Dynamic Insert]</div>
                          <div style={{ fontSize: '11px', color: '#00F0FF' }}>
                            [Head: 10 | &rarr;] &rarr; [24 | &rarr;] &rarr; [35 | &rarr;] &rarr; [Null]
                          </div>
                        </div>
                      )}
                      {activeDsType === 'binary-tree' && (
                        <div>
                          <div className="text-xs" style={{ color: '#888', marginBottom: '6px' }}>Hierarchical BST [O(log n) Partitioning]</div>
                          <div style={{ fontSize: '11px', color: '#FFE600' }}>
                            (Root: 35) &rarr; Left: (10), Right: (48 &rarr; 92)
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 3. TIME COMPLEXITY: N SLIDER */}
                {currentSlide.id === 'time-complexity' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: '6px' }}>
                      <span>Input Dataset Size (n):</span>
                      <strong style={{ color: 'var(--canary-yellow)' }}>n = {complexityN.toLocaleString()}</strong>
                    </div>

                    <input 
                      type="range" 
                      min="10" 
                      max="10000" 
                      step="10" 
                      value={complexityN} 
                      onChange={(e) => setComplexityN(Number(e.target.value))}
                      style={{ width: '100%', marginBottom: '1rem', accentColor: 'var(--canary-yellow)' }}
                    />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #222', paddingBottom: '3px' }}>
                        <span style={{ color: '#00E599' }}>O(1) Constant:</span>
                        <span>1 operation (~1.2 ns)</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #222', paddingBottom: '3px' }}>
                        <span style={{ color: '#00F0FF' }}>O(log n) Binary Search:</span>
                        <span>~{Math.ceil(Math.log2(complexityN))} operations</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #222', paddingBottom: '3px' }}>
                        <span style={{ color: '#FFE600' }}>O(n) Linear Scan:</span>
                        <span>{complexityN.toLocaleString()} operations</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#FF2A00' }}>O(n²) Quadratic Loop:</span>
                        <span style={{ color: '#FF2A00', fontWeight: 800 }}>{(complexityN * complexityN).toLocaleString()} operations</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. SPACE COMPLEXITY: MEMORY MODEL */}
                {currentSlide.id === 'space-complexity' && (
                  <div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', justifyContent: 'center' }}>
                      <button 
                        onClick={() => setSpaceMode('inplace')}
                        className="brutal-btn brutal-btn-sm"
                        style={{ background: spaceMode === 'inplace' ? '#FF0055' : '#222', color: '#FFF' }}
                      >
                        In-Place O(1) Space
                      </button>
                      <button 
                        onClick={() => setSpaceMode('auxiliary')}
                        className="brutal-btn brutal-btn-sm"
                        style={{ background: spaceMode === 'auxiliary' ? '#FF0055' : '#222', color: '#FFF' }}
                      >
                        Auxiliary O(n) Heap
                      </button>
                    </div>

                    <div style={{ background: '#171717', border: '1px solid #333', padding: '1rem', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                      {spaceMode === 'inplace' ? (
                        <div>
                          <div style={{ color: '#00E599', fontWeight: 800, marginBottom: '4px' }}>&bull; Zero Additional Buffers Allocated</div>
                          <p style={{ color: '#AAA', fontSize: '11px', margin: 0 }}>Modifies elements directly inside input array using register variables temp. Auxiliary space S(n) = O(1).</p>
                        </div>
                      ) : (
                        <div>
                          <div style={{ color: '#FF0055', fontWeight: 800, marginBottom: '4px' }}>&bull; Allocated Clone Array (n = 10,000)</div>
                          <p style={{ color: '#AAA', fontSize: '11px', margin: 0 }}>Allocates 10,000 new memory pointers on Heap storage. Total auxiliary space = O(n).</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 5. BIG O NOTATION: ASYMPTOTIC CURVES */}
                {currentSlide.id === 'big-o-notation' && (
                  <div>
                    <div className="font-mono text-xs" style={{ color: '#888', marginBottom: '6px' }}>Select an Asymptotic Curve:</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '1rem' }}>
                      {BIG_O_CURVES.map(c => (
                        <button
                          key={c.id}
                          onClick={() => { setSelectedCurveId(c.id); SoundEngine.playClick(); }}
                          className="font-mono text-xs"
                          style={{
                            background: selectedCurveId === c.id ? c.color : '#222',
                            color: selectedCurveId === c.id ? '#000' : '#FFF',
                            border: '1px solid #444',
                            padding: '3px 8px',
                            borderRadius: '2px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          {c.name.split(' - ')[0]}
                        </button>
                      ))}
                    </div>

                    {(() => {
                      const curve = BIG_O_CURVES.find(c => c.id === selectedCurveId) || BIG_O_CURVES[0];
                      return (
                        <div style={{ background: '#171717', border: '1px solid #333', padding: '0.85rem', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', color: curve.color, fontWeight: 800, fontSize: '0.9rem' }}>
                            <span>{curve.name}</span>
                            <span>{curve.tier}</span>
                          </div>
                          <div style={{ fontSize: '11px', color: '#AAA', marginTop: '4px' }}>{curve.desc}</div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* 6. RECURSION: CALL STACK VISUALIZER */}
                {currentSlide.id === 'recursion' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                      <span>Call Stack: factorial(4)</span>
                      <button 
                        onClick={() => { setStackStep((stackStep + 1) % 5); SoundEngine.playPop(); }} 
                        className="brutal-btn brutal-btn-sm" 
                        style={{ background: 'var(--canary-yellow)', color: '#000' }}
                      >
                        Step Execution &rarr;
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: '3px', background: '#171717', padding: '8px', border: '1px solid #333', minHeight: '120px', justifyContent: 'flex-start' }}>
                      {stackStep >= 0 && <div style={{ background: '#7928CA', color: '#FFF', padding: '4px 8px', fontSize: '11px', fontFamily: 'var(--font-mono)', borderRadius: '2px' }}>Frame 1: factorial(4) ➔ awaiting 4 * factorial(3)</div>}
                      {stackStep >= 1 && <div style={{ background: '#9333EA', color: '#FFF', padding: '4px 8px', fontSize: '11px', fontFamily: 'var(--font-mono)', borderRadius: '2px' }}>Frame 2: factorial(3) ➔ awaiting 3 * factorial(2)</div>}
                      {stackStep >= 2 && <div style={{ background: '#A855F7', color: '#FFF', padding: '4px 8px', fontSize: '11px', fontFamily: 'var(--font-mono)', borderRadius: '2px' }}>Frame 3: factorial(2) ➔ awaiting 2 * factorial(1)</div>}
                      {stackStep >= 3 && <div style={{ background: '#00E599', color: '#000', fontWeight: 800, padding: '4px 8px', fontSize: '11px', fontFamily: 'var(--font-mono)', borderRadius: '2px' }}>Frame 4: factorial(1) [BASE CASE HIT!] ➔ returns 1</div>}
                      {stackStep >= 4 && <div style={{ background: '#FFE600', color: '#000', fontWeight: 800, padding: '4px 8px', fontSize: '11px', fontFamily: 'var(--font-mono)', borderRadius: '2px' }}>Stack Unwound! Result = 4 &times; 3 &times; 2 &times; 1 = 24</div>}
                    </div>
                  </div>
                )}

                {/* 7. DIVIDE AND CONQUER: 3 PHASES */}
                {currentSlide.id === 'divide-and-conquer' && (
                  <div>
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '10px', justifyContent: 'center' }}>
                      <button 
                        onClick={() => { setDncPhase(1); SoundEngine.playClick(); }} 
                        className="brutal-btn brutal-btn-sm" 
                        style={{ background: dncPhase === 1 ? '#FF2A00' : '#222', color: '#FFF' }}
                      >
                        1. DIVIDE
                      </button>
                      <button 
                        onClick={() => { setDncPhase(2); SoundEngine.playClick(); }} 
                        className="brutal-btn brutal-btn-sm" 
                        style={{ background: dncPhase === 2 ? '#FF2A00' : '#222', color: '#FFF' }}
                      >
                        2. CONQUER
                      </button>
                      <button 
                        onClick={() => { setDncPhase(3); SoundEngine.playClick(); }} 
                        className="brutal-btn brutal-btn-sm" 
                        style={{ background: dncPhase === 3 ? '#FF2A00' : '#222', color: '#FFF' }}
                      >
                        3. COMBINE
                      </button>
                    </div>

                    <div style={{ background: '#171717', border: '1px solid #333', padding: '1rem', borderRadius: '4px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                      {dncPhase === 1 && (
                        <div>
                          <div style={{ fontSize: '11px', color: '#888', marginBottom: '4px' }}>Phase 1: Split Master Array into 2 Halves</div>
                          <div style={{ fontSize: '12px', color: '#00F0FF' }}>[38, 27, 43, 3] &bull; [9, 82, 10]</div>
                        </div>
                      )}
                      {dncPhase === 2 && (
                        <div>
                          <div style={{ fontSize: '11px', color: '#888', marginBottom: '4px' }}>Phase 2: Recursively Sort Individual Sub-Arrays</div>
                          <div style={{ fontSize: '12px', color: '#FFE600' }}>[3, 27, 38, 43] &bull; [9, 10, 82]</div>
                        </div>
                      )}
                      {dncPhase === 3 && (
                        <div>
                          <div style={{ fontSize: '11px', color: '#888', marginBottom: '4px' }}>Phase 3: Merge Two Sorted Arrays in O(n)</div>
                          <div style={{ fontSize: '12px', color: '#00E599', fontWeight: 800 }}>[3, 9, 10, 27, 38, 43, 82]</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 8. BRUTE FORCE: EXHAUSTIVE PERMUTATION SOLVER */}
                {currentSlide.id === 'brute-force' && (
                  <div>
                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                      <div className="font-mono text-xs" style={{ color: '#888' }}>Target Key Combination: <strong>#{bruteForceTarget}</strong></div>
                      <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--canary-yellow)' }}>
                        Current Test: #{bruteForceCurrent}
                      </div>
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                      <button 
                        onClick={runBruteForceSearch} 
                        disabled={isBruteRunning}
                        className="brutal-btn brutal-btn-sm" 
                        style={{ background: isBruteRunning ? '#444' : '#FF6B00', color: '#FFF' }}
                      >
                        {isBruteRunning ? 'Evaluating All States...' : '▶ Run Exhaustive Brute Force'}
                      </button>
                    </div>

                    <div style={{ background: '#171717', border: '1px solid #333', padding: '8px', borderRadius: '4px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#AAA' }}>
                      Systematically tests every possible state from 0 to N without heuristics. Guaranteed to solve, but costs O(N) operations.
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>

          {/* CODE IMPLEMENTATION SNIPPET ACCORDION */}
          <div style={{
            background: '#0D1117',
            border: '1.5px solid #30363D',
            borderRadius: 'var(--radius-xs)',
            overflow: 'hidden'
          }}>
            <div style={{
              background: '#161B22',
              padding: '0.5rem 1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #30363D'
            }}>
              <span className="font-mono text-xs" style={{ color: '#E6EDF3', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Code size={14} color="var(--canary-yellow)" /> REFERENCE CODE IMPLEMENTATION
              </span>
              <span className="font-mono text-xs" style={{ color: '#7D8590' }}>
                JAVASCRIPT / C#
              </span>
            </div>
            <pre style={{
              margin: 0,
              padding: '1rem',
              color: '#38BDF8',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              lineHeight: 1.5,
              overflowX: 'auto'
            }}>
              {currentSlide.codeSnippet}
            </pre>
          </div>

          {/* BOTTOM SLIDE FOOTER CONTROLS */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: 'var(--border-solid)',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <button
              onClick={handlePrevSlide}
              className="brutal-btn"
              style={{ background: '#FFFFFF', padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
            >
              &larr; Previous Concept
            </button>

            {/* Slide dot indicators */}
            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              {CORE_CS_TERMS.map((_, i) => (
                <div
                  key={i}
                  onClick={() => handleSelectSlide(i)}
                  style={{
                    width: i === currentSlideIndex ? '20px' : '8px',
                    height: '8px',
                    background: i === currentSlideIndex ? 'var(--cobalt-blue)' : '#CBD5E1',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                />
              ))}
            </div>

            <button
              onClick={handleNextSlide}
              className="brutal-btn"
              style={{ background: 'var(--canary-yellow)', padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
            >
              Next Concept &rarr;
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
