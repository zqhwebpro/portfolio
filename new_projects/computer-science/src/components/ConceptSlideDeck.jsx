import React, { useState, useEffect } from 'react';
import { 
  Terminal, Database, Clock, HardDrive, Hash, RefreshCw, GitBranch, Crosshair, 
  ChevronLeft, ChevronRight, Play, Pause, RotateCcw, CheckCircle2, Sparkles, 
  Layers, Cpu, BookOpen, ArrowRight, Zap, Code, ShieldCheck, HelpCircle,
  Binary, Activity, BarChart2, AlertCircle
} from 'lucide-react';
import { CORE_CS_TERMS, BIG_O_CURVES } from '../utils/csData';
import { SoundEngine } from '../utils/soundEngine';

export function ConceptSlideDeck({ currentSlideIndex = 0, onSelectSlide = () => {} }) {
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);

  // --- Interactive State per Concept Slide ---
  
  // Concept 1: Algorithm - Euclidean GCD State Machine
  const [algoA, setAlgoA] = useState(48);
  const [algoB, setAlgoB] = useState(18);
  const [algoStep, setAlgoStep] = useState(1);
  const [algoHistory, setAlgoHistory] = useState([
    { step: 1, a: 48, b: 18, rem: 12, line: 2, desc: 'Initial state: Check if b (18) == 0. (False). Compute remainder r = 48 % 18 = 12.' }
  ]);

  // Concept 2: Data Structure - Memory Layout Switcher
  const [activeDsType, setActiveDsType] = useState('array'); // 'array' | 'linked-list' | 'bst'

  // Concept 3: Time Complexity - Input N Slider
  const [complexityN, setComplexityN] = useState(100);

  // Concept 4: Space Complexity - Memory Allocation Mode
  const [spaceMode, setSpaceMode] = useState('inplace'); // 'inplace' | 'auxiliary' | 'recursive'

  // Concept 5: Big O Notation - Curve and Bound Mode
  const [selectedCurveId, setSelectedCurveId] = useState('onlogn');
  const [selectedBoundType, setSelectedBoundType] = useState('big_o'); // 'big_o' | 'big_theta' | 'big_omega'

  // Concept 6: Recursion - Call Stack Stepper
  const [stackStep, setStackStep] = useState(0);

  // Concept 7: Divide & Conquer - 3-Phase Stepper
  const [dncPhase, setDncPhase] = useState(1); // 1: Divide, 2: Conquer, 3: Combine

  // Concept 8: Brute Force - Exhaustive Search Runner
  const [bruteTarget, setBruteTarget] = useState(42);
  const [bruteCurrent, setBruteCurrent] = useState(0);
  const [isBruteRunning, setIsBruteRunning] = useState(false);
  const [bruteFound, setBruteFound] = useState(false);

  const totalSlides = CORE_CS_TERMS.length;
  const currentSlide = CORE_CS_TERMS[currentSlideIndex] || CORE_CS_TERMS[0];

  // Auto-play presentation timer
  useEffect(() => {
    let interval = null;
    if (isPlayingAuto) {
      interval = setInterval(() => {
        const next = (currentSlideIndex + 1) % totalSlides;
        onSelectSlide(next);
        SoundEngine.playBlip();
      }, 9000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlayingAuto, currentSlideIndex, totalSlides, onSelectSlide]);

  // Keyboard navigation (Left / Right Arrow keys)
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
    const next = (currentSlideIndex + 1) % totalSlides;
    onSelectSlide(next);
  };

  const handlePrevSlide = () => {
    SoundEngine.playClick();
    const prev = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    onSelectSlide(prev);
  };

  const getIconForTerm = (id) => {
    switch (id) {
      case 'algorithm': return <Terminal size={20} />;
      case 'data-structure': return <Database size={20} />;
      case 'time-complexity': return <Clock size={20} />;
      case 'space-complexity': return <HardDrive size={20} />;
      case 'big-o-notation': return <Hash size={20} />;
      case 'recursion': return <RefreshCw size={20} />;
      case 'divide-and-conquer': return <GitBranch size={20} />;
      case 'brute-force': return <Crosshair size={20} />;
      default: return <BookOpen size={20} />;
    }
  };

  // --- Concept 1: Euclidean GCD Stepper Logic ---
  const handleStepAlgo = () => {
    SoundEngine.playPop();
    if (algoStep >= 4) {
      // Reset
      setAlgoStep(1);
      setAlgoA(48);
      setAlgoB(18);
      setAlgoHistory([{ step: 1, a: 48, b: 18, rem: 12, line: 2, desc: 'Initial state: Check if b (18) == 0. (False). Compute remainder r = 48 % 18 = 12.' }]);
      return;
    }
    const next = algoStep + 1;
    setAlgoStep(next);
    if (next === 2) {
      setAlgoA(18);
      setAlgoB(12);
      setAlgoHistory(prev => [...prev, { step: 2, a: 18, b: 12, rem: 6, line: 4, desc: 'Shift states: a = 18, b = 12. Next remainder r = 18 % 12 = 6.' }]);
    } else if (next === 3) {
      setAlgoA(12);
      setAlgoB(6);
      setAlgoHistory(prev => [...prev, { step: 3, a: 12, b: 6, rem: 0, line: 4, desc: 'Shift states: a = 12, b = 6. Next remainder r = 12 % 6 = 0.' }]);
    } else if (next === 4) {
      setAlgoA(6);
      setAlgoB(0);
      SoundEngine.playFanfare();
      setAlgoHistory(prev => [...prev, { step: 4, a: 6, b: 0, rem: 0, line: 6, desc: 'b == 0! HALTING GUARANTEE REACHED. Returning GCD Result = 6.' }]);
    }
  };

  const handleResetAlgo = () => {
    SoundEngine.playClick();
    setAlgoStep(1);
    setAlgoA(48);
    setAlgoB(18);
    setAlgoHistory([{ step: 1, a: 48, b: 18, rem: 12, line: 2, desc: 'Initial state: Check if b (18) == 0. (False). Compute remainder r = 48 % 18 = 12.' }]);
  };

  // --- Concept 8: Brute Force Search Runner ---
  const runBruteForceSearch = () => {
    setIsBruteRunning(true);
    setBruteFound(false);
    setBruteCurrent(0);
    let curr = 0;
    const interval = setInterval(() => {
      curr++;
      setBruteCurrent(curr);
      if (curr >= bruteTarget) {
        clearInterval(interval);
        setIsBruteRunning(false);
        setBruteFound(true);
        SoundEngine.playFanfare();
      } else {
        SoundEngine.playBlip();
      }
    }, 45);
  };

  return (
    <section id="interactive-slides" className="section-padding" style={{ background: '#FFFFFF', borderBottom: 'var(--border-thick)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
            <span className="brutal-badge brutal-badge-cyan font-mono" style={{ fontSize: '0.8rem' }}>
              CONCEPT {String(currentSlideIndex + 1).padStart(2, '0')} OF 08 // ALGORITHMIC TAXONOMY
            </span>
            <span className="brutal-badge brutal-badge-yellow font-mono" style={{ fontSize: '0.8rem' }}>
              THE 8 FUNDAMENTAL CONCEPTS
            </span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.85rem, 4vw, 3.1rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: '0.25rem 0 0.5rem',
            color: 'var(--ink-black)'
          }}>
            THE 8 FUNDAMENTAL <span style={{ color: 'var(--cobalt-blue)' }}>CONCEPTS OF ALGORITHMS</span>
          </h2>
          <p style={{ fontSize: '0.98rem', color: '#4B5563', maxWidth: '860px', lineHeight: 1.55, margin: 0 }}>
            Master core computer science theory through dedicated interactive concept slides. Each concept is presented with its exact canonical definition, live visual simulator, synchronized code highlighting, and asymptotic analysis.
          </p>
        </div>

        {/* 🎛️ SLIDE NAVIGATION SELECTOR BAR */}
        <div style={{
          background: '#0A0A0A',
          padding: '0.65rem 0.85rem',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.6rem',
          boxShadow: '3px 3px 0px rgba(0,0,0,0.15)'
        }}>
          {/* Quick Concept Jump Buttons */}
          <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '2px', flex: 1 }}>
            {CORE_CS_TERMS.map((item, idx) => {
              const isActive = idx === currentSlideIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => { SoundEngine.playClick(); onSelectSlide(idx); }}
                  className="font-mono text-xs"
                  style={{
                    background: isActive ? item.color : '#1A1A1A',
                    color: isActive ? '#000000' : '#FFFFFF',
                    border: '1px solid #333333',
                    padding: '0.4rem 0.8rem',
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
                  <span>{item.term.toUpperCase()}</span>
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
                padding: '0.35rem 0.75rem',
                fontSize: '0.75rem'
              }}
              title="Toggle Auto Slide Timer"
            >
              {isPlayingAuto ? <Pause size={13} /> : <Play size={13} />}
              <span>{isPlayingAuto ? 'PAUSE' : 'AUTO PLAY'}</span>
            </button>

            <span className="font-mono" style={{ color: '#888', fontSize: '0.8rem', margin: '0 0.25rem' }}>
              <strong style={{ color: '#FFF' }}>{currentSlideIndex + 1}</strong> / {totalSlides}
            </span>

            <button
              onClick={handlePrevSlide}
              className="brutal-btn brutal-btn-sm"
              style={{ background: '#262626', color: '#FFF', border: '1px solid #444', padding: '0.35rem 0.6rem' }}
              title="Previous Concept (Left Arrow)"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={handleNextSlide}
              className="brutal-btn brutal-btn-sm"
              style={{ background: 'var(--canary-yellow)', color: '#000', border: '1px solid #000', padding: '0.35rem 0.6rem' }}
              title="Next Concept (Right Arrow)"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* 🖥️ MAIN ACTIVE CONCEPT PRESENTATION DECK (Unit 02+ Architecture) */}
        <div style={{
          background: 'var(--bg-paper)',
          padding: 'clamp(1.25rem, 3vw, 2.25rem)',
          border: 'var(--border-thick)',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '2rem',
          position: 'relative'
        }}>
          
          {/* Top Slide Meta Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: 'var(--border-solid)',
            paddingBottom: '0.85rem',
            marginBottom: '1.25rem',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
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
                  CONCEPT {String(currentSlideIndex + 1).padStart(2, '0')} // {currentSlide.paradigm.toUpperCase()}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                  fontWeight: 900,
                  margin: 0,
                  lineHeight: 1.1,
                  color: 'var(--ink-black)'
                }}>
                  {currentSlide.term}
                </h3>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span className={`brutal-badge ${currentSlide.badgeClass}`} style={{ fontSize: '0.78rem', padding: '0.35rem 0.85rem' }}>
                {currentSlide.badge}
              </span>
            </div>
          </div>

          {/* 🎯 1. EXACT CANONICAL DEFINITION CALLOUT BANNER */}
          <div style={{
            background: '#FFFFFF',
            border: '2px solid var(--ink-black)',
            borderLeft: `8px solid ${currentSlide.color}`,
            borderRadius: 'var(--radius-xs)',
            padding: '1.15rem 1.4rem',
            marginBottom: '1.75rem',
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

          {/* ⚡ 2-COLUMN UNIT 02+ STRUCTURED GRID */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
            gap: '1.75rem',
            alignItems: 'start',
            marginBottom: '1.75rem'
          }}>
            
            {/* 🔬 LEFT COLUMN: INTERACTIVE VISUAL LAB / SIMULATOR (WHITE BRUTAL CARD) */}
            <div className="brutal-card" style={{ background: '#FFFFFF' }}>
              
              {/* 1. CONCEPT: ALGORITHM (Euclidean GCD Step Runner) */}
              {currentSlide.id === 'algorithm' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '2px solid #000', paddingBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <span className="brutal-badge brutal-badge-cyan font-mono" style={{ fontSize: '0.75rem' }}>
                        INTERACTIVE STATE MACHINE
                      </span>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', margin: '0.2rem 0 0' }}>
                        EUCLIDEAN GCD ALGORITHM LAB
                      </h4>
                    </div>

                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button onClick={handleStepAlgo} className="brutal-btn brutal-btn-red" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                        <Play size={14} /> {algoStep >= 4 ? 'RESTART' : 'STEP GCD'}
                      </button>
                      <button onClick={handleResetAlgo} className="brutal-btn brutal-btn-sm" style={{ background: '#E5E5E5', border: '1.5px solid #000' }} title="Reset GCD">
                        <RotateCcw size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Status Chips Bar */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800 }}>
                    <span style={{ background: '#0A0A0A', color: 'var(--canary-yellow)', padding: '0.25rem 0.6rem', border: '1px solid #000' }}>
                      STATE A: {algoA}
                    </span>
                    <span style={{ background: '#0A0A0A', color: 'var(--emerald-mint)', padding: '0.25rem 0.6rem', border: '1px solid #000' }}>
                      STATE B: {algoB}
                    </span>
                    <span style={{ background: '#0A0A0A', color: '#00F0FF', padding: '0.25rem 0.6rem', border: '1px solid #000' }}>
                      STEP: {algoStep} / 4
                    </span>
                    <span style={{ background: algoStep === 4 ? 'var(--emerald-mint)' : 'var(--canary-yellow)', color: '#000', padding: '0.25rem 0.6rem', border: '1.5px solid #000', marginLeft: 'auto' }}>
                      STATUS: {algoStep === 4 ? 'HALTED & SOLVED' : 'COMPUTING'}
                    </span>
                  </div>

                  {/* Interactive Visual Canvas: Number Segment Bars */}
                  <div style={{ background: 'var(--bg-paper)', border: '2px solid #000', padding: '1rem', marginBottom: '1rem', boxShadow: '2px 2px 0 #000' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, color: '#666', marginBottom: '0.5rem' }}>
                      EUCLIDEAN DIVISION REMAINDER BAR:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: '60px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 800 }}>A ({algoA})</span>
                        <div style={{ flex: 1, background: '#E5E5E5', height: '20px', border: '1.5px solid #000' }}>
                          <div style={{ width: `${Math.min(100, (algoA / 48) * 100)}%`, height: '100%', background: 'var(--cobalt-blue)', transition: 'width 0.3s ease' }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: '60px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 800 }}>B ({algoB})</span>
                        <div style={{ flex: 1, background: '#E5E5E5', height: '20px', border: '1.5px solid #000' }}>
                          <div style={{ width: `${Math.min(100, (algoB / 48) * 100)}%`, height: '100%', background: 'var(--canary-yellow)', transition: 'width 0.3s ease' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step Explanation Callout */}
                  <div style={{
                    background: algoStep === 4 ? '#D1FAE5' : 'var(--bg-paper)',
                    border: '2px solid #000',
                    padding: '0.85rem 1rem',
                    boxShadow: '3px 3px 0 #000',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
                    fontWeight: 700
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem', color: 'var(--cobalt-blue)' }}>
                      <Zap size={16} /> STEP EXPLANATION:
                    </div>
                    <div style={{ color: algoStep === 4 ? '#065F46' : '#111' }}>
                      {algoHistory[algoHistory.length - 1].desc}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. CONCEPT: DATA STRUCTURE (Memory Layout Explorer) */}
              {currentSlide.id === 'data-structure' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '2px solid #000', paddingBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <span className="brutal-badge brutal-badge-mint font-mono" style={{ fontSize: '0.75rem' }}>
                        SPATIAL MEMORY ARCHITECTURE
                      </span>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', margin: '0.2rem 0 0' }}>
                        MEMORY LAYOUT &amp; ACCESS MODELS
                      </h4>
                    </div>

                    {/* Mode Selector */}
                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                      <button onClick={() => { setActiveDsType('array'); SoundEngine.playClick(); }} className="brutal-btn brutal-btn-sm" style={{ background: activeDsType === 'array' ? 'var(--canary-yellow)' : '#FFF' }}>Array</button>
                      <button onClick={() => { setActiveDsType('linked-list'); SoundEngine.playClick(); }} className="brutal-btn brutal-btn-sm" style={{ background: activeDsType === 'linked-list' ? 'var(--canary-yellow)' : '#FFF' }}>List</button>
                      <button onClick={() => { setActiveDsType('bst'); SoundEngine.playClick(); }} className="brutal-btn brutal-btn-sm" style={{ background: activeDsType === 'bst' ? 'var(--canary-yellow)' : '#FFF' }}>Tree</button>
                    </div>
                  </div>

                  {/* Status Chips Bar */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800 }}>
                    <span style={{ background: '#0A0A0A', color: 'var(--emerald-mint)', padding: '0.25rem 0.6rem', border: '1px solid #000' }}>
                      LAYOUT: {activeDsType === 'array' ? 'CONTIGUOUS BUFFER' : activeDsType === 'linked-list' ? 'HEAP POINTER NODES' : 'HIERARCHICAL BST'}
                    </span>
                    <span style={{ background: '#0A0A0A', color: 'var(--canary-yellow)', padding: '0.25rem 0.6rem', border: '1px solid #000' }}>
                      ACCESS: {activeDsType === 'array' ? 'O(1) CONSTANT' : activeDsType === 'linked-list' ? 'O(N) TRAVERSAL' : 'O(LOG N) AVG'}
                    </span>
                  </div>

                  {/* Visual Memory Blocks */}
                  <div style={{ background: 'var(--bg-paper)', border: '2px solid #000', padding: '1rem', marginBottom: '1rem', boxShadow: '2px 2px 0 #000' }}>
                    {activeDsType === 'array' && (
                      <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>
                          PHYSICAL RAM: Contiguous Address Offsets [Base + i * sizeof(int)]
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.4rem' }}>
                          {[
                            { idx: 0, val: 10, addr: '0x1000' },
                            { idx: 1, val: 24, addr: '0x1004' },
                            { idx: 2, val: 35, addr: '0x1008' },
                            { idx: 3, val: 48, addr: '0x100C' },
                            { idx: 4, val: 92, addr: '0x1010' },
                          ].map(item => (
                            <div key={item.idx} style={{ background: '#FFF', border: '1.5px solid #000', padding: '0.5rem 0.25rem', textAlign: 'center', boxShadow: '1px 1px 0 #000' }}>
                              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: '1rem', color: 'var(--cobalt-blue)' }}>{item.val}</div>
                              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#666' }}>[{item.idx}]</div>
                              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: '#999' }}>{item.addr}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeDsType === 'linked-list' && (
                      <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>
                          HEAP NODES: Pointer Chaining [Node = Value + Next Pointer]
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', overflowX: 'auto', padding: '0.25rem 0' }}>
                          {[
                            { val: 10, next: '0x2400' },
                            { val: 24, next: '0x3100' },
                            { val: 35, next: 'null' },
                          ].map((node, i) => (
                            <React.Fragment key={i}>
                              <div style={{ background: '#FFF', border: '1.5px solid #000', padding: '0.5rem', minWidth: '100px', boxShadow: '1px 1px 0 #000', fontFamily: 'var(--font-mono)' }}>
                                <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--cobalt-blue)' }}>Val: {node.val}</div>
                                <div style={{ fontSize: '0.65rem', color: '#666' }}>Next: {node.next}</div>
                              </div>
                              {node.next !== 'null' && <span style={{ fontWeight: 900, color: 'var(--vermilion-red)' }}>&rarr;</span>}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeDsType === 'bst' && (
                      <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>
                          HIERARCHICAL BST: Left Subtree (&lt; Value) &bull; Right Subtree (&gt; Value)
                        </div>
                        <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                          <div style={{ display: 'inline-block', background: 'var(--canary-yellow)', border: '1.5px solid #000', padding: '0.3rem 0.6rem', fontWeight: 800 }}>Root: 35</div>
                          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '0.5rem' }}>
                            <div style={{ background: '#FFF', border: '1.5px solid #000', padding: '0.3rem 0.6rem', fontWeight: 800 }}>Left: 10</div>
                            <div style={{ background: '#FFF', border: '1.5px solid #000', padding: '0.3rem 0.6rem', fontWeight: 800 }}>Right: 48</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Step Explanation Callout */}
                  <div style={{ background: 'var(--bg-paper)', border: '2px solid #000', padding: '0.85rem 1rem', boxShadow: '3px 3px 0 #000', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.5, fontWeight: 700 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem', color: 'var(--cobalt-blue)' }}>
                      <Zap size={16} /> ARCHITECTURAL ADVANTAGE:
                    </div>
                    <div>
                      {activeDsType === 'array' && 'Arrays provide instant O(1) random memory lookup via hardware CPU cache lines, but resizing requires O(n) reallocation.'}
                      {activeDsType === 'linked-list' && 'Linked lists allow O(1) dynamic insertions without contiguous reallocation, but require O(n) sequential pointer traversal.'}
                      {activeDsType === 'bst' && 'Binary search trees maintain sorted order for O(log n) average search, insert, and delete operations.'}
                    </div>
                  </div>
                </div>
              )}

              {/* 3. CONCEPT: TIME COMPLEXITY (Dataset N Slider) */}
              {currentSlide.id === 'time-complexity' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '2px solid #000', paddingBottom: '0.75rem' }}>
                    <div>
                      <span className="brutal-badge brutal-badge-yellow font-mono" style={{ fontSize: '0.75rem' }}>
                        ASYMPTOTIC SCALING SIMULATOR
                      </span>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', margin: '0.2rem 0 0' }}>
                        OPERATIONS SCALING AT DATASET SIZE N
                      </h4>
                    </div>
                  </div>

                  {/* Slider Control */}
                  <div style={{ background: 'var(--bg-paper)', border: '2px solid #000', padding: '1rem', marginBottom: '1rem', boxShadow: '2px 2px 0 #000' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      <span>ADJUST INPUT VOLUME (N):</span>
                      <span style={{ color: 'var(--cobalt-blue)', fontSize: '1.1rem' }}>n = {complexityN.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="10000" 
                      step="10" 
                      value={complexityN} 
                      onChange={(e) => { setComplexityN(Number(e.target.value)); SoundEngine.playSliderBlip(complexityN / 10000); }}
                      style={{ width: '100%', accentColor: 'var(--cobalt-blue)', cursor: 'pointer' }}
                    />
                  </div>

                  {/* Growth Table */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: '#D1FAE5', border: '1px solid #000' }}>
                      <strong>O(1) Constant</strong>
                      <span>1 operation (1.2 ns)</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: '#E0F2FE', border: '1px solid #000' }}>
                      <strong>O(log n) Binary Search</strong>
                      <span>~{Math.ceil(Math.log2(complexityN))} operations ({(Math.log2(complexityN) * 1.5).toFixed(1)} ns)</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: '#FEF9C3', border: '1px solid #000' }}>
                      <strong>O(n) Linear Scan</strong>
                      <span>{complexityN.toLocaleString()} operations ({(complexityN * 2).toFixed(1)} ns)</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: '#FEE2E2', border: '1px solid #000', color: 'var(--vermilion-red)', fontWeight: 800 }}>
                      <strong>O(n²) Quadratic Loop</strong>
                      <span>{(complexityN * complexityN).toLocaleString()} operations ({((complexityN * complexityN * 2) / 1e6).toFixed(2)} ms)</span>
                    </div>
                  </div>

                  {/* Step Explanation Callout */}
                  <div style={{ background: 'var(--bg-paper)', border: '2px solid #000', padding: '0.85rem 1rem', boxShadow: '3px 3px 0 #000', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.5, fontWeight: 700 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem', color: 'var(--cobalt-blue)' }}>
                      <Zap size={16} /> ASYMPTOTIC PRINCIPLE:
                    </div>
                    <div>
                      Time complexity measures operation growth as n increases toward infinity, making the evaluation completely independent of specific CPU clock speeds or hardware variance.
                    </div>
                  </div>
                </div>
              )}

              {/* 4. CONCEPT: SPACE COMPLEXITY (Memory Footprint Model) */}
              {currentSlide.id === 'space-complexity' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '2px solid #000', paddingBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <span className="brutal-badge brutal-badge-red font-mono" style={{ fontSize: '0.75rem' }}>
                        MEMORY ALLOCATION TRACKER
                      </span>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', margin: '0.2rem 0 0' }}>
                        IN-PLACE VS. AUXILIARY MEMORY
                      </h4>
                    </div>

                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                      <button onClick={() => { setSpaceMode('inplace'); SoundEngine.playClick(); }} className="brutal-btn brutal-btn-sm" style={{ background: spaceMode === 'inplace' ? 'var(--canary-yellow)' : '#FFF' }}>In-Place O(1)</button>
                      <button onClick={() => { setSpaceMode('auxiliary'); SoundEngine.playClick(); }} className="brutal-btn brutal-btn-sm" style={{ background: spaceMode === 'auxiliary' ? 'var(--canary-yellow)' : '#FFF' }}>Auxiliary O(n)</button>
                    </div>
                  </div>

                  {/* Status Chips Bar */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800 }}>
                    <span style={{ background: '#0A0A0A', color: spaceMode === 'inplace' ? 'var(--emerald-mint)' : 'var(--vermilion-red)', padding: '0.25rem 0.6rem', border: '1px solid #000' }}>
                      EXTRA RAM: {spaceMode === 'inplace' ? 'O(1) ZERO HEAP' : 'O(n) HEAP ALLOCATED'}
                    </span>
                    <span style={{ background: '#0A0A0A', color: 'var(--canary-yellow)', padding: '0.25rem 0.6rem', border: '1px solid #000' }}>
                      STORAGE: {spaceMode === 'inplace' ? 'REUSES INPUT ARRAY' : 'DUPLICATE BUFFER'}
                    </span>
                  </div>

                  {/* Visual Memory Model */}
                  <div style={{ background: 'var(--bg-paper)', border: '2px solid #000', padding: '1rem', marginBottom: '1rem', boxShadow: '2px 2px 0 #000' }}>
                    {spaceMode === 'inplace' ? (
                      <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#059669', fontWeight: 800, marginBottom: '0.4rem' }}>
                          ✓ IN-PLACE MEMORY REUSE: S(n) = O(1)
                        </div>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#333', margin: 0 }}>
                          Modifies input elements directly using constant stack register variables. No auxiliary memory arrays or heap allocations created.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--vermilion-red)', fontWeight: 800, marginBottom: '0.4rem' }}>
                          ⚠ AUXILIARY HEAP ALLOCATION: S(n) = O(n)
                        </div>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#333', margin: 0 }}>
                          Allocates a duplicate buffer of size n on Heap memory. Consumes additional RAM proportional to input size.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Step Explanation Callout */}
                  <div style={{ background: 'var(--bg-paper)', border: '2px solid #000', padding: '0.85rem 1rem', boxShadow: '3px 3px 0 #000', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.5, fontWeight: 700 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem', color: 'var(--cobalt-blue)' }}>
                      <Zap size={16} /> SPACE COMPLEXITY DEFINITION:
                    </div>
                    <div>
                      Total space complexity = Input Space + Auxiliary Space. In-place algorithms (like QuickSort or Insertion Sort) operate in O(1) auxiliary space.
                    </div>
                  </div>
                </div>
              )}

              {/* 5. CONCEPT: BIG O NOTATION (Asymptotic Bound Selector) */}
              {currentSlide.id === 'big-o-notation' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '2px solid #000', paddingBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <span className="brutal-badge brutal-badge-blue font-mono" style={{ fontSize: '0.75rem' }}>
                        ASYMPTOTIC BOUND EXPLORER
                      </span>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', margin: '0.2rem 0 0' }}>
                        THE 3 FORMAL ASYMPTOTIC NOTATIONS
                      </h4>
                    </div>

                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                      <button onClick={() => { setSelectedBoundType('big_o'); SoundEngine.playClick(); }} className="brutal-btn brutal-btn-sm" style={{ background: selectedBoundType === 'big_o' ? 'var(--canary-yellow)' : '#FFF' }}>O (Upper)</button>
                      <button onClick={() => { setSelectedBoundType('big_theta'); SoundEngine.playClick(); }} className="brutal-btn brutal-btn-sm" style={{ background: selectedBoundType === 'big_theta' ? 'var(--canary-yellow)' : '#FFF' }}>Θ (Tight)</button>
                      <button onClick={() => { setSelectedBoundType('big_omega'); SoundEngine.playClick(); }} className="brutal-btn brutal-btn-sm" style={{ background: selectedBoundType === 'big_omega' ? 'var(--canary-yellow)' : '#FFF' }}>Ω (Lower)</button>
                    </div>
                  </div>

                  {/* Curve Selector Pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                    {BIG_O_CURVES.map(c => (
                      <button
                        key={c.id}
                        onClick={() => { setSelectedCurveId(c.id); SoundEngine.playClick(); }}
                        className="font-mono text-xs"
                        style={{
                          background: selectedCurveId === c.id ? c.color : '#FFF',
                          color: '#000',
                          border: '1.5px solid #000',
                          padding: '0.25rem 0.55rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          boxShadow: selectedCurveId === c.id ? '2px 2px 0 #000' : 'none'
                        }}
                      >
                        {c.name.split(' - ')[0]}
                      </button>
                    ))}
                  </div>

                  {/* Active Curve Details */}
                  {(() => {
                    const curve = BIG_O_CURVES.find(c => c.id === selectedCurveId) || BIG_O_CURVES[0];
                    return (
                      <div style={{ background: 'var(--bg-paper)', border: '2px solid #000', padding: '1rem', marginBottom: '1rem', boxShadow: '2px 2px 0 #000', fontFamily: 'var(--font-mono)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                          <span style={{ fontWeight: 900, fontSize: '1rem', color: curve.color }}>{curve.name}</span>
                          <span className="brutal-badge brutal-badge-dark" style={{ fontSize: '0.7rem' }}>{curve.tier}</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#333', marginBottom: '0.4rem' }}>{curve.desc}</div>
                        <div style={{ fontSize: '0.75rem', color: '#666' }}>Formula: <strong>{curve.formula}</strong></div>
                      </div>
                    );
                  })()}

                  {/* Step Explanation Callout */}
                  <div style={{ background: 'var(--bg-paper)', border: '2px solid #000', padding: '0.85rem 1rem', boxShadow: '3px 3px 0 #000', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.5, fontWeight: 700 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem', color: 'var(--cobalt-blue)' }}>
                      <Zap size={16} /> FORMAL CALCULUS DEFINITION:
                    </div>
                    <div>
                      {selectedBoundType === 'big_o' && 'Big-O (O) defines the worst-case asymptotic upper bound: f(n) ≤ c · g(n) for all n ≥ n₀.'}
                      {selectedBoundType === 'big_theta' && 'Big-Theta (Θ) defines an asymptotically tight bound: c₁ · g(n) ≤ f(n) ≤ c₂ · g(n) for all n ≥ n₀.'}
                      {selectedBoundType === 'big_omega' && 'Big-Omega (Ω) defines the best-case asymptotic lower bound: f(n) ≥ c · g(n) for all n ≥ n₀.'}
                    </div>
                  </div>
                </div>
              )}

              {/* 6. CONCEPT: RECURSION (Call Stack Visualizer) */}
              {currentSlide.id === 'recursion' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '2px solid #000', paddingBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <span className="brutal-badge brutal-badge-purple font-mono" style={{ fontSize: '0.75rem' }}>
                        LIFO EXECUTION CALL STACK
                      </span>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', margin: '0.2rem 0 0' }}>
                        RECURSION STACK: factorial(4)
                      </h4>
                    </div>

                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      <button onClick={() => { setStackStep((stackStep + 1) % 5); SoundEngine.playPop(); }} className="brutal-btn brutal-btn-yellow" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                        <Play size={14} /> {stackStep === 4 ? 'RESTART' : 'STEP FRAME'}
                      </button>
                      <button onClick={() => { setStackStep(0); SoundEngine.playClick(); }} className="brutal-btn brutal-btn-sm" style={{ background: '#E5E5E5', border: '1.5px solid #000' }}>
                        <RotateCcw size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Status Chips Bar */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800 }}>
                    <span style={{ background: '#0A0A0A', color: 'var(--canary-yellow)', padding: '0.25rem 0.6rem', border: '1px solid #000' }}>
                      CALL STACK DEPTH: {stackStep <= 3 ? stackStep + 1 : 1}
                    </span>
                    <span style={{ background: '#0A0A0A', color: stackStep === 3 ? 'var(--emerald-mint)' : '#FFF', padding: '0.25rem 0.6rem', border: '1px solid #000' }}>
                      PHASE: {stackStep === 3 ? 'BASE CASE HIT' : stackStep === 4 ? 'UNWOUND & RETURNED' : 'STACK PUSHING'}
                    </span>
                  </div>

                  {/* Call Stack Tower Canvas */}
                  <div style={{ background: 'var(--bg-paper)', border: '2px solid #000', padding: '1rem', marginBottom: '1rem', minHeight: '140px', display: 'flex', flexDirection: 'column-reverse', gap: '0.35rem', justifyContent: 'flex-start', boxShadow: '2px 2px 0 #000' }}>
                    {stackStep >= 0 && <div style={{ background: '#7928CA', color: '#FFF', padding: '0.4rem 0.6rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', border: '1.5px solid #000', fontWeight: 700 }}>Frame 1: factorial(4) ➔ awaits 4 * factorial(3)</div>}
                    {stackStep >= 1 && <div style={{ background: '#9333EA', color: '#FFF', padding: '0.4rem 0.6rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', border: '1.5px solid #000', fontWeight: 700 }}>Frame 2: factorial(3) ➔ awaits 3 * factorial(2)</div>}
                    {stackStep >= 2 && <div style={{ background: '#A855F7', color: '#FFF', padding: '0.4rem 0.6rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', border: '1.5px solid #000', fontWeight: 700 }}>Frame 3: factorial(2) ➔ awaits 2 * factorial(1)</div>}
                    {stackStep >= 3 && <div style={{ background: 'var(--emerald-mint)', color: '#000', padding: '0.4rem 0.6rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', border: '1.5px solid #000', fontWeight: 800 }}>Frame 4: factorial(1) [BASE CASE HIT!] ➔ returns 1</div>}
                  </div>

                  {/* Step Explanation Callout */}
                  <div style={{ background: stackStep === 4 ? '#D1FAE5' : 'var(--bg-paper)', border: '2px solid #000', padding: '0.85rem 1rem', boxShadow: '3px 3px 0 #000', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.5, fontWeight: 700 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem', color: 'var(--cobalt-blue)' }}>
                      <Zap size={16} /> RECURSIVE STACK DYNAMICS:
                    </div>
                    <div style={{ color: stackStep === 4 ? '#065F46' : '#111' }}>
                      {stackStep < 3 && 'Each recursive invocation pushes a new stack frame onto the Call Stack with its own isolated parameters and local variables.'}
                      {stackStep === 3 && 'Base Case Triggered! The recursion halts and return values begin unwinding downwards.'}
                      {stackStep === 4 && 'Stack Unwound! Result = 4 × 3 × 2 × 1 = 24. Total Auxiliary Stack Space = O(n).'}
                    </div>
                  </div>
                </div>
              )}

              {/* 7. CONCEPT: DIVIDE AND CONQUER (3-Phase Array Splitter) */}
              {currentSlide.id === 'divide-and-conquer' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '2px solid #000', paddingBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <span className="brutal-badge brutal-badge-red font-mono" style={{ fontSize: '0.75rem' }}>
                        TOP-DOWN PARADIGM LAB
                      </span>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', margin: '0.2rem 0 0' }}>
                        3-PHASE MERGE SORT PIPELINE
                      </h4>
                    </div>

                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                      <button onClick={() => { setDncPhase(1); SoundEngine.playClick(); }} className="brutal-btn brutal-btn-sm" style={{ background: dncPhase === 1 ? 'var(--canary-yellow)' : '#FFF' }}>1. DIVIDE</button>
                      <button onClick={() => { setDncPhase(2); SoundEngine.playClick(); }} className="brutal-btn brutal-btn-sm" style={{ background: dncPhase === 2 ? 'var(--canary-yellow)' : '#FFF' }}>2. CONQUER</button>
                      <button onClick={() => { setDncPhase(3); SoundEngine.playClick(); }} className="brutal-btn brutal-btn-sm" style={{ background: dncPhase === 3 ? 'var(--canary-yellow)' : '#FFF' }}>3. COMBINE</button>
                    </div>
                  </div>

                  {/* Status Chips Bar */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800 }}>
                    <span style={{ background: '#0A0A0A', color: 'var(--pure-cyan)', padding: '0.25rem 0.6rem', border: '1px solid #000' }}>
                      PHASE: {dncPhase === 1 ? '1. DIVIDE (SUBDIVIDE)' : dncPhase === 2 ? '2. CONQUER (RECURSE)' : '3. COMBINE (MERGE)'}
                    </span>
                    <span style={{ background: '#0A0A0A', color: 'var(--canary-yellow)', padding: '0.25rem 0.6rem', border: '1px solid #000' }}>
                      COMPLEXITY: O(N LOG N)
                    </span>
                  </div>

                  {/* Visual Array Subdivision */}
                  <div style={{ background: 'var(--bg-paper)', border: '2px solid #000', padding: '1rem', marginBottom: '1rem', textAlign: 'center', boxShadow: '2px 2px 0 #000', fontFamily: 'var(--font-mono)' }}>
                    {dncPhase === 1 && (
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>1. DIVIDE: Partition array into 2 independent sub-problems at midpoint</div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontWeight: 800 }}>
                          <span style={{ background: '#FFF', padding: '0.4rem 0.8rem', border: '1.5px solid #000' }}>[38, 27, 43, 3]</span>
                          <span style={{ color: 'var(--vermilion-red)', alignSelf: 'center' }}>&bull;</span>
                          <span style={{ background: '#FFF', padding: '0.4rem 0.8rem', border: '1.5px solid #000' }}>[9, 82, 10]</span>
                        </div>
                      </div>
                    )}
                    {dncPhase === 2 && (
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>2. CONQUER: Recursively sort each sub-array independently</div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontWeight: 800 }}>
                          <span style={{ background: '#FEF9C3', padding: '0.4rem 0.8rem', border: '1.5px solid #000' }}>[3, 27, 38, 43]</span>
                          <span style={{ color: 'var(--vermilion-red)', alignSelf: 'center' }}>&bull;</span>
                          <span style={{ background: '#FEF9C3', padding: '0.4rem 0.8rem', border: '1.5px solid #000' }}>[9, 10, 82]</span>
                        </div>
                      </div>
                    )}
                    {dncPhase === 3 && (
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>3. COMBINE: Merge two sorted subarrays in linear O(n) time</div>
                        <div style={{ background: 'var(--emerald-mint)', padding: '0.5rem 1rem', border: '2px solid #000', fontWeight: 900, display: 'inline-block' }}>
                          [3, 9, 10, 27, 38, 43, 82]
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Step Explanation Callout */}
                  <div style={{ background: 'var(--bg-paper)', border: '2px solid #000', padding: '0.85rem 1rem', boxShadow: '3px 3px 0 #000', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.5, fontWeight: 700 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem', color: 'var(--cobalt-blue)' }}>
                      <Zap size={16} /> MASTER THEOREM PRINCIPLE:
                    </div>
                    <div>
                      Divide and conquer reduces sorting runtime from O(n²) quadratic operations to O(n log n) by breaking large problems into non-overlapping logarithmic sub-trees.
                    </div>
                  </div>
                </div>
              )}

              {/* 8. CONCEPT: BRUTE FORCE (Exhaustive Permutation Search) */}
              {currentSlide.id === 'brute-force' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '2px solid #000', paddingBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <span className="brutal-badge brutal-badge-orange font-mono" style={{ fontSize: '0.75rem' }}>
                        EXHAUSTIVE STATE SEARCH
                      </span>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', margin: '0.2rem 0 0' }}>
                        SYSTEMATIC ENUMERATION RUNNER
                      </h4>
                    </div>

                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      <button onClick={runBruteForceSearch} disabled={isBruteRunning} className="brutal-btn brutal-btn-red" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                        <Play size={14} /> {isBruteRunning ? 'SEARCHING...' : 'RUN BRUTE FORCE'}
                      </button>
                    </div>
                  </div>

                  {/* Status Chips Bar */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800 }}>
                    <span style={{ background: '#0A0A0A', color: 'var(--canary-yellow)', padding: '0.25rem 0.6rem', border: '1px solid #000' }}>
                      TARGET KEY: #{bruteTarget}
                    </span>
                    <span style={{ background: '#0A0A0A', color: bruteFound ? 'var(--emerald-mint)' : '#FFF', padding: '0.25rem 0.6rem', border: '1px solid #000' }}>
                      TESTING CANDIDATE: #{bruteCurrent}
                    </span>
                    <span style={{ background: bruteFound ? 'var(--emerald-mint)' : 'var(--canary-yellow)', color: '#000', padding: '0.25rem 0.6rem', border: '1.5px solid #000', marginLeft: 'auto' }}>
                      STATUS: {bruteFound ? 'MATCH FOUND' : isBruteRunning ? 'EVALUATING' : 'IDLE'}
                    </span>
                  </div>

                  {/* Visual Candidate Grid */}
                  <div style={{ background: 'var(--bg-paper)', border: '2px solid #000', padding: '1rem', marginBottom: '1rem', boxShadow: '2px 2px 0 #000', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 900, color: bruteFound ? 'var(--emerald-mint)' : 'var(--cobalt-blue)', marginBottom: '0.25rem' }}>
                      {bruteCurrent === 0 ? 'Click "Run Brute Force" to begin' : `Testing State: ${bruteCurrent} / ${bruteTarget}`}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#666' }}>
                      Scans every state sequentially without heuristic pruning. Cost = O(N) evaluations.
                    </div>
                  </div>

                  {/* Step Explanation Callout */}
                  <div style={{ background: bruteFound ? '#D1FAE5' : 'var(--bg-paper)', border: '2px solid #000', padding: '0.85rem 1rem', boxShadow: '3px 3px 0 #000', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.5, fontWeight: 700 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem', color: 'var(--cobalt-blue)' }}>
                      <Zap size={16} /> TRADE-OFF EVALUATION:
                    </div>
                    <div style={{ color: bruteFound ? '#065F46' : '#111' }}>
                      Brute force guarantees finding a valid solution if one exists, serving as an invaluable correctness baseline before designing optimized algorithms.
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* 💻 RIGHT COLUMN: REFERENCE CODE & ASYMPTOTIC PROPERTIES (DARK & BRUTAL CARDS) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Reference Code Walkthrough Card */}
              <div className="brutal-card brutal-card-dark">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Code size={16} color="var(--canary-yellow)" />
                    <h4 style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.9rem', color: 'var(--canary-yellow)' }}>
                      {currentSlide.term.toUpperCase()} // IMPLEMENTATION PATTERN
                    </h4>
                  </div>
                  <span className="font-mono text-xs" style={{ color: '#888' }}>
                    JAVASCRIPT / ES6
                  </span>
                </div>

                <pre style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  lineHeight: 1.55,
                  background: '#000',
                  padding: '0.85rem',
                  border: '1px solid #333',
                  overflowX: 'auto',
                  color: '#A7F3D0',
                  margin: 0
                }}>
                  {currentSlide.codeSnippet}
                </pre>
              </div>

              {/* Key Properties & Real-World Applications Card */}
              <div className="brutal-card brutal-card-yellow">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
                  <ShieldCheck size={16} color="#000" />
                  <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1rem', color: '#000', margin: 0 }}>
                    THEORETICAL MECHANICS &amp; GUARANTEES
                  </h4>
                </div>

                <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: '#111', marginBottom: '0.75rem' }}>
                  {currentSlide.elaboration}
                </p>

                {/* Key Properties Checklist */}
                <div style={{ background: '#FFF', padding: '0.65rem 0.85rem', border: '1.5px solid #000', marginBottom: '0.65rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 800, color: 'var(--cobalt-blue)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                    Core Architectural Properties:
                  </div>
                  <ul style={{ paddingLeft: '1rem', margin: 0, fontSize: '0.78rem', color: '#111', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {currentSlide.keyProperties.map((prop, idx) => (
                      <li key={idx}><strong>{prop}</strong></li>
                    ))}
                  </ul>
                </div>

                {/* Real-World Systems Applied Tags */}
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 800, color: '#000', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                    ⚡ Applied Systems &amp; Production Examples:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {currentSlide.examples.map((ex, idx) => (
                      <span key={idx} style={{ background: '#0A0A0A', color: '#FFF', border: '1px solid #000', padding: '0.2rem 0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700 }}>
                        &bull; {ex}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* 🔘 BOTTOM SLIDE FOOTER CONTROLS */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1.25rem',
            paddingTop: '1rem',
            borderTop: 'var(--border-solid)',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <button
              onClick={handlePrevSlide}
              className="brutal-btn"
              style={{ background: '#FFFFFF', padding: '0.45rem 1.2rem', fontSize: '0.82rem' }}
            >
              &larr; Previous Concept
            </button>

            {/* Slide Dot Indicators */}
            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              {CORE_CS_TERMS.map((item, i) => (
                <div
                  key={i}
                  onClick={() => { SoundEngine.playClick(); onSelectSlide(i); }}
                  title={`${i + 1}. ${item.term}`}
                  style={{
                    width: i === currentSlideIndex ? '24px' : '8px',
                    height: '8px',
                    background: i === currentSlideIndex ? item.color : '#CBD5E1',
                    border: '1px solid #000',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                />
              ))}
            </div>

            <button
              onClick={handleNextSlide}
              className="brutal-btn"
              style={{ background: 'var(--canary-yellow)', padding: '0.45rem 1.2rem', fontSize: '0.82rem' }}
            >
              Next Concept &rarr;
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

export default ConceptSlideDeck;
