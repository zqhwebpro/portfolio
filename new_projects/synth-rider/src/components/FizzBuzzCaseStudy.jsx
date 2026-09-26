import React, { useState, useEffect } from 'react';
import { Keyboard, Box, RotateCw, GitFork, Monitor, Play, RotateCcw, Sparkles, Check, ArrowRight } from 'lucide-react';
import { SoundEngine } from '../utils/soundEngine';

export function FizzBuzzCaseStudy() {
  const [fizzNum, setFizzNum] = useState(3);
  const [buzzNum, setBuzzNum] = useState(5);
  const [currentStep, setCurrentStep] = useState(1); // 1 to 100
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNode, setActiveNode] = useState(0); // 0=Input, 1=Memory, 2=Loop, 3=Decision, 4=Output
  const [filterMode, setFilterMode] = useState('ALL');

  const [results, setResults] = useState([]);

  // Auto-play loop
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            SoundEngine.playSuccess();
            return 100;
          }
          const next = prev + 1;
          
          // Animate node steps
          setActiveNode((next % 5));
          
          return next;
        });
      }, 40);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Compute results array up to currentStep
  useEffect(() => {
    const list = [];
    for (let i = 1; i <= currentStep; i++) {
      let val = String(i);
      let tag = 'NUMBER';
      let color = '#0A0A0A';
      if (i % (fizzNum * buzzNum) === 0) {
        val = 'FizzBuzz';
        tag = 'FIZZBUZZ';
        color = '#7928CA';
      } else if (i % fizzNum === 0) {
        val = 'Fizz';
        tag = 'FIZZ';
        color = '#0038FF';
      } else if (i % buzzNum === 0) {
        val = 'Buzz';
        tag = 'BUZZ';
        color = '#FF2A00';
      }
      list.push({ num: i, val, tag, color });
    }
    setResults(list);
  }, [currentStep, fizzNum, buzzNum]);

  const togglePlay = () => {
    SoundEngine.playClick();
    if (currentStep >= 100) setCurrentStep(1);
    setIsPlaying(!isPlaying);
  };

  const resetAll = () => {
    SoundEngine.playClick();
    setIsPlaying(false);
    setCurrentStep(1);
    setActiveNode(0);
  };

  const stepForward = () => {
    SoundEngine.playClick();
    if (currentStep < 100) {
      setCurrentStep(s => s + 1);
      setActiveNode((currentStep + 1) % 5);
    }
  };

  const filteredResults = results.filter(r => {
    if (filterMode === 'ALL') return true;
    return r.tag === filterMode;
  });

  const FLOW_NODES = [
    { num: '1️⃣', title: 'Take Input', desc: `Divisors (${fizzNum}, ${buzzNum})`, icon: Keyboard, color: '#00F0FF' },
    { num: '2️⃣', title: 'Allocate Memory', desc: `fizz=${fizzNum}, buzz=${buzzNum}`, icon: Box, color: '#00E599' },
    { num: '3️⃣', title: 'Loop', desc: `i = ${currentStep} / 100`, icon: RotateCw, color: '#FFE600' },
    { num: '4️⃣', title: 'Make Decisions', desc: `i % ${fizzNum*buzzNum} == 0 ?`, icon: GitFork, color: '#FF2A00' },
    { num: '5️⃣', title: 'Give Output', desc: `${filteredResults.length} Rows Rendered`, icon: Monitor, color: '#0038FF' },
  ];

  return (
    <section id="fizzbuzz-demo" style={{
      background: '#F8F7F2',
      borderBottom: '4px solid #0A0A0A',
      padding: 'clamp(3rem, 7vw, 6rem) 0',
      position: 'relative',
    }}>
      <div className="container">

        {/* Section Header */}
        <div style={{ marginBottom: '3rem' }}>
          <span style={{
            background: '#FFE600', color: '#0A0A0A',
            fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 900,
            padding: '0.35rem 0.85rem', border: '2.5px solid #0A0A0A', letterSpacing: '0.08em',
            boxShadow: '4px 4px 0 #0A0A0A', display: 'inline-block', marginBottom: '0.85rem',
            textTransform: 'uppercase',
          }}>
            💡 REAL-WORLD PROOF // CASE STUDY STRIP
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
            fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.05,
            color: '#0A0A0A', marginBottom: '0.5rem', textTransform: 'uppercase',
          }}>
            "FIZZBUZZ IN ACTION"
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', color: '#444', fontSize: '1.1rem', maxWidth: '780px', lineHeight: 1.6, fontWeight: 600 }}>
            Take 2 inputs → Store as integers → Loop 1–100 → Decide Fizz/Buzz/Number → Output results in a table. Watch all 5 core concepts execute synchronously in sequence!
          </p>
        </div>

        {/* 5-Node Animated Flowchart */}
        <div style={{
          background: '#FFFFFF',
          border: '3.5px solid #0A0A0A',
          padding: '2rem 1.5rem',
          boxShadow: '8px 8px 0 #0A0A0A',
          marginBottom: '2.5rem',
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900, color: '#777', letterSpacing: '0.08em', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
            ◆ 5-CONCEPT PIPELINE FLOWCHART
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 190px), 1fr))', gap: '1.25rem', alignItems: 'center' }}>
            {FLOW_NODES.map((node, i) => {
              const IconComponent = node.icon;
              const isActive = activeNode === i || isPlaying;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    flex: 1,
                    background: isActive ? node.color : '#FFFFFF',
                    color: node.color === '#0038FF' && isActive ? '#FFF' : '#0A0A0A',
                    border: '3px solid #0A0A0A',
                    padding: '1.25rem 1rem',
                    boxShadow: isActive ? '6px 6px 0 #0A0A0A' : '3px 3px 0 #0A0A0A',
                    transition: 'all 0.15s ease',
                    transform: isActive ? 'translate(-2px, -2px)' : 'none',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 900 }}>{node.num}</span>
                      <IconComponent size={20} className={i === 2 && isPlaying ? 'animate-spin-fast' : ''} />
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '0.95rem', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                      {node.title}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 700, opacity: 0.85 }}>
                      {node.desc}
                    </div>
                  </div>
                  {i < FLOW_NODES.length - 1 && (
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: '1.2rem', color: '#0A0A0A', display: 'none' }} className="flow-arrow">
                      →
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Simulation Controls & Output Table Snapshot */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '2rem', alignItems: 'start' }}>
          
          {/* Controls & Inputs */}
          <div style={{ background: '#FFFFFF', border: '3.5px solid #0A0A0A', padding: '2rem', boxShadow: '6px 6px 0 #0A0A0A' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900, color: '#0A0A0A', letterSpacing: '0.08em', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
              SIMULATION PARAMETERS & EXECUTION
            </div>

            {/* Inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 900, color: '#555', display: 'block', marginBottom: '0.3rem' }}>
                  FIZZ DIVISOR:
                </label>
                <input
                  type="number"
                  min="2"
                  max="10"
                  value={fizzNum}
                  onChange={e => setFizzNum(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.75rem', border: '2.5px solid #0A0A0A', fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: '0.95rem' }}
                />
              </div>
              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 900, color: '#555', display: 'block', marginBottom: '0.3rem' }}>
                  BUZZ DIVISOR:
                </label>
                <input
                  type="number"
                  min="2"
                  max="10"
                  value={buzzNum}
                  onChange={e => setBuzzNum(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.75rem', border: '2.5px solid #0A0A0A', fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: '0.95rem' }}
                />
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900, marginBottom: '0.4rem' }}>
                <span>LOOP ITERATION: {currentStep} / 100</span>
                <span>{Math.round((currentStep/100)*100)}%</span>
              </div>
              <div style={{ width: '100%', height: '14px', background: '#F0F0F0', border: '2px solid #0A0A0A', padding: '2px' }}>
                <div style={{ width: `${currentStep}%`, height: '100%', background: '#FFE600', transition: 'width 0.05s linear' }} />
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={togglePlay}
                style={{
                  background: isPlaying ? '#FF2A00' : '#00E599',
                  color: isPlaying ? '#FFF' : '#000',
                  border: '3px solid #0A0A0A',
                  padding: '1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.95rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: '4px 4px 0 #0A0A0A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  textTransform: 'uppercase'
                }}
              >
                <Play size={18} /> {isPlaying ? 'PAUSE SIMULATION' : currentStep >= 100 ? 'RESTART FIZZBUZZ (1→100)' : 'RUN FIZZBUZZ SIMULATION'}
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <button
                  onClick={stepForward}
                  style={{
                    background: '#FFFFFF',
                    border: '2.5px solid #0A0A0A',
                    padding: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    boxShadow: '3px 3px 0 #0A0A0A'
                  }}
                >
                  STEP FORWARD +1
                </button>
                <button
                  onClick={resetAll}
                  style={{
                    background: '#FFFFFF',
                    border: '2.5px solid #0A0A0A',
                    padding: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    boxShadow: '3px 3px 0 #0A0A0A'
                  }}
                >
                  RESET
                </button>
              </div>
            </div>
          </div>

          {/* Results Table Snapshot */}
          <div style={{ background: '#FFFFFF', border: '3.5px solid #0A0A0A', padding: '2rem', boxShadow: '6px 6px 0 #0A0A0A' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900, color: '#0A0A0A', textTransform: 'uppercase' }}>
                OUTPUT RESULTS TABLE SNAPSHOT
              </div>
              
              {/* Filters */}
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {['ALL', 'FIZZ', 'BUZZ', 'FIZZBUZZ'].map(f => (
                  <button
                    key={f}
                    onClick={() => { setFilterMode(f); SoundEngine.playClick(); }}
                    style={{
                      background: filterMode === f ? '#0A0A0A' : '#FFFFFF',
                      color: filterMode === f ? '#FFE600' : '#0A0A0A',
                      border: '1.5px solid #0A0A0A',
                      padding: '0.2rem 0.5rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      fontWeight: 900,
                      cursor: 'pointer'
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Table Container */}
            <div style={{ height: '300px', overflowY: 'auto', border: '2.5px solid #0A0A0A', background: '#0A0A0A', padding: '0.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                <thead>
                  <tr style={{ background: '#FFE600', color: '#000', textAlign: 'left' }}>
                    <th style={{ padding: '0.5rem', border: '1px solid #000' }}>#</th>
                    <th style={{ padding: '0.5rem', border: '1px solid #000' }}>VALUE</th>
                    <th style={{ padding: '0.5rem', border: '1px solid #000' }}>TAG</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResults.map((r) => (
                    <tr key={r.num} style={{ background: '#181818', color: '#FFF' }}>
                      <td style={{ padding: '0.4rem 0.5rem', border: '1px solid #333' }}>{r.num}</td>
                      <td style={{ padding: '0.4rem 0.5rem', border: '1px solid #333', fontWeight: 900, color: r.color }}>{r.val}</td>
                      <td style={{ padding: '0.4rem 0.5rem', border: '1px solid #333', fontSize: '0.7rem' }}>
                        <span style={{ background: r.color, color: r.color === '#FFE600' || r.color === '#00F0FF' ? '#000' : '#FFF', padding: '0.1rem 0.4rem', border: '1px solid #FFF', fontWeight: 900 }}>
                          {r.tag}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
