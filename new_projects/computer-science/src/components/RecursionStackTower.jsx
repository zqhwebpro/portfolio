import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, ChevronRight, Layers, HelpCircle, CheckCircle, ArrowRight, CornerDownRight } from 'lucide-react';
import { SoundEngine } from '../utils/soundEngine';

export function RecursionStackTower() {
  const [activeTab, setActiveTab] = useState('hanoi'); // 'hanoi' | 'factorial' | 'palindrome'
  
  // Towers of Hanoi State
  const [hanoiDisks, setHanoiDisks] = useState(3);
  const [pegs, setPegs] = useState({ A: [3, 2, 1], B: [], C: [] });
  const [hanoiMoves, setHanoiMoves] = useState([]);
  const [hanoiStepIndex, setHanoiStepIndex] = useState(0);
  const [hanoiIsPlaying, setHanoiIsPlaying] = useState(false);

  // Factorial State
  const [factN, setFactN] = useState(4);
  const [callStack, setCallStack] = useState([]);
  const [factResult, setFactResult] = useState(null);

  // Palindrome State
  const [palindromeWord, setPalindromeWord] = useState('ROTOR');
  const [palindromeSteps, setPalindromeSteps] = useState([]);

  // Generate Hanoi Solution Moves
  const generateHanoiMoves = (n, source, target, auxiliary, moves = []) => {
    if (n === 1) {
      moves.push({ disk: 1, from: source, to: target });
      return moves;
    }
    generateHanoiMoves(n - 1, source, auxiliary, target, moves);
    moves.push({ disk: n, from: source, to: target });
    generateHanoiMoves(n - 1, auxiliary, target, source, moves);
    return moves;
  };

  const resetHanoi = (n = hanoiDisks) => {
    SoundEngine.playClick();
    setHanoiIsPlaying(false);
    setHanoiDisks(n);
    const initialA = Array.from({ length: n }, (_, i) => n - i);
    setPegs({ A: initialA, B: [], C: [] });
    const moves = generateHanoiMoves(n, 'A', 'B', 'C', []);
    setHanoiMoves(moves);
    setHanoiStepIndex(0);
  };

  useEffect(() => {
    resetHanoi(3);
  }, []);

  const stepHanoi = () => {
    if (hanoiStepIndex >= hanoiMoves.length) return;
    SoundEngine.playPop();
    const move = hanoiMoves[hanoiStepIndex];
    
    setPegs(prev => {
      const newFrom = [...prev[move.from]];
      const newTo = [...prev[move.to]];
      const disk = newFrom.pop();
      newTo.push(disk);
      return { ...prev, [move.from]: newFrom, [move.to]: newTo };
    });

    setHanoiStepIndex(prev => prev + 1);
    if (hanoiStepIndex + 1 === hanoiMoves.length) {
      SoundEngine.playFanfare();
    }
  };

  const autoPlayHanoi = () => {
    if (hanoiIsPlaying || hanoiStepIndex >= hanoiMoves.length) return;
    setHanoiIsPlaying(true);
    SoundEngine.playClick();

    let currIndex = hanoiStepIndex;
    let currPegs = { ...pegs };

    const interval = setInterval(() => {
      if (currIndex >= hanoiMoves.length) {
        clearInterval(interval);
        setHanoiIsPlaying(false);
        return;
      }

      const m = hanoiMoves[currIndex];
      const newFrom = [...currPegs[m.from]];
      const newTo = [...currPegs[m.to]];
      const disk = newFrom.pop();
      newTo.push(disk);
      currPegs = { ...currPegs, [m.from]: newFrom, [m.to]: newTo };
      setPegs(currPegs);

      currIndex++;
      setHanoiStepIndex(currIndex);
      SoundEngine.playBlip();

      if (currIndex === hanoiMoves.length) {
        SoundEngine.playFanfare();
        clearInterval(interval);
        setHanoiIsPlaying(false);
      }
    }, 700);
  };

  // Run Factorial Simulation
  const runFactorial = (n) => {
    SoundEngine.playClick();
    setFactN(n);
    const stack = [];
    
    const fact = (num) => {
      stack.push({ fn: `factorial(${num})`, arg: num, type: num <= 1 ? 'BASE CASE' : 'RECURSIVE CALL' });
      if (num <= 1) return 1;
      return num * fact(num - 1);
    };

    const res = fact(n);
    setCallStack(stack);
    setFactResult(res);
    SoundEngine.playFanfare();
  };

  return (
    <section id="recursion" className="section-padding" style={{
      background: 'var(--bg-paper)',
      borderBottom: 'var(--border-thick)'
    }}>
      <div className="container">

        {/* Section Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="brutal-badge brutal-badge-blue font-mono" style={{ fontSize: '0.8rem' }}>
              UNIT 05 // RECURSION &amp; CALL STACK
            </span>
            <span className="brutal-badge brutal-badge-red font-mono" style={{ fontSize: '0.8rem' }}>
              RECURSIVE ALGORITHMS &amp; TOWERS OF HANOI
            </span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '1rem'
          }}>
            RECURSIVE ALGORITHMS &amp; THE CALL STACK
          </h2>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.1rem',
            color: 'var(--text-muted)',
            maxWidth: '850px',
            lineHeight: 1.6
          }}>
            Recursion occurs when a function solves a problem by calling itself on smaller instances. Every valid recursive algorithm requires a <strong>base case</strong> (to terminate) and a <strong>recursive case</strong> (to reduce the problem).
          </p>
        </div>

        {/* Topic Selector Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => { SoundEngine.playClick(); setActiveTab('hanoi'); }}
            className="brutal-btn"
            style={{
              background: activeTab === 'hanoi' ? 'var(--canary-yellow)' : '#FFF',
              fontWeight: activeTab === 'hanoi' ? 900 : 700,
              border: '2px solid #000'
            }}
          >
            1. TOWERS OF HANOI (2ⁿ - 1)
          </button>
          <button
            onClick={() => { SoundEngine.playClick(); setActiveTab('factorial'); runFactorial(4); }}
            className="brutal-btn"
            style={{
              background: activeTab === 'factorial' ? 'var(--canary-yellow)' : '#FFF',
              fontWeight: activeTab === 'factorial' ? 900 : 700,
              border: '2px solid #000'
            }}
          >
            2. FACTORIAL CALL STACK (N!)
          </button>
        </div>

        {/* Content Panel: Towers of Hanoi */}
        {activeTab === 'hanoi' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            alignItems: 'start'
          }}>

            {/* Left: Interactive Towers of Hanoi Visualizer */}
            <div className="brutal-card" style={{ background: '#FFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <span className="brutal-badge brutal-badge-mint font-mono" style={{ fontSize: '0.75rem' }}>
                    RECURSIVE DECOMPOSITION
                  </span>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.25rem', marginTop: '0.25rem' }}>
                    TOWERS OF HANOI ({hanoiDisks} DISKS)
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <button
                    onClick={() => resetHanoi(hanoiDisks === 3 ? 4 : 3)}
                    className="brutal-btn brutal-btn-sm"
                    style={{ background: '#FFF' }}
                  >
                    Set {hanoiDisks === 3 ? '4' : '3'} Disks
                  </button>
                  <button
                    onClick={stepHanoi}
                    disabled={hanoiIsPlaying || hanoiStepIndex >= hanoiMoves.length}
                    className="brutal-btn brutal-btn-red"
                    style={{ padding: '0.45rem 0.85rem' }}
                  >
                    <ChevronRight size={15} /> STEP
                  </button>
                  <button
                    onClick={autoPlayHanoi}
                    disabled={hanoiIsPlaying || hanoiStepIndex >= hanoiMoves.length}
                    className="brutal-btn brutal-btn-blue"
                    style={{ padding: '0.45rem 0.85rem' }}
                  >
                    <Play size={15} /> AUTO
                  </button>
                  <button
                    onClick={() => resetHanoi()}
                    className="brutal-btn brutal-btn-sm"
                    style={{ background: '#E5E5E5' }}
                  >
                    <RotateCcw size={15} />
                  </button>
                </div>
              </div>

              {/* Hanoi 3 Pegs Arena */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                background: 'var(--bg-paper)',
                padding: '2rem 1rem 1rem 1rem',
                border: '2px solid #000',
                marginBottom: '1.5rem',
                minHeight: '220px',
                alignItems: 'end'
              }}>
                {['A', 'B', 'C'].map((pegKey) => {
                  const disksOnPeg = pegs[pegKey] || [];
                  return (
                    <div
                      key={pegKey}
                      style={{
                        display: 'flex',
                        flexDirection: 'column-reverse',
                        alignItems: 'center',
                        position: 'relative',
                        height: '160px',
                        borderBottom: '4px solid #000'
                      }}
                    >
                      {/* Vertical Peg Rod */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        width: '8px',
                        background: '#333',
                        zIndex: 1
                      }} />

                      {/* Disks */}
                      {disksOnPeg.map((diskSize, idx) => {
                        const colors = ['#00E599', '#FFE600', '#0038FF', '#FF2A00'];
                        const diskColor = colors[diskSize - 1] || 'var(--cobalt-blue)';
                        const widthPct = 30 + diskSize * 16;
                        return (
                          <div
                            key={idx}
                            style={{
                              width: `${widthPct}%`,
                              height: '24px',
                              background: diskColor,
                              border: '2px solid #000',
                              boxShadow: '2px 2px 0 #000',
                              zIndex: 2,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontFamily: 'var(--font-mono)',
                              fontWeight: 900,
                              fontSize: '0.75rem',
                              color: '#000',
                              marginBottom: '2px'
                            }}
                          >
                            {diskSize}
                          </div>
                        );
                      })}

                      {/* Peg Label */}
                      <div style={{
                        position: 'absolute',
                        bottom: '-32px',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 900,
                        fontSize: '0.9rem'
                      }}>
                        PEG {pegKey}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Step Progress Readout */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 700,
                background: 'var(--bg-paper)',
                padding: '0.75rem',
                border: '1.5px solid #000'
              }}>
                <span>MOVE: {hanoiStepIndex} / {hanoiMoves.length} OPTIMAL</span>
                <span>MINIMUM FORMULA: 2^{hanoiDisks} - 1 = {Math.pow(2, hanoiDisks) - 1} MOVES</span>
              </div>
            </div>

            {/* Right: Hanoi Recursive Theory */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="brutal-card brutal-card-yellow">
                <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                  THE HANOI RECURRENCE RELATION: Θ(2ⁿ)
                </h4>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: '#111', marginBottom: '0.75rem' }}>
                  To move $n$ disks from Peg A to Peg B using Peg C:
                </p>
                <ol style={{ fontSize: '0.85rem', lineHeight: 1.6, paddingLeft: '1.25rem', fontFamily: 'var(--font-mono)' }}>
                  <li>1. Recursively move top $n-1$ disks from <strong>A → C</strong>.</li>
                  <li>2. Move single largest disk $n$ directly from <strong>A → B</strong>.</li>
                  <li>3. Recursively move $n-1$ disks from <strong>C → B</strong>.</li>
                </ol>
                <div style={{ background: '#FFF', padding: '0.5rem', border: '1.5px solid #000', marginTop: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                  Recurrence: T(n) = 2T(n-1) + 1 = <strong>2ⁿ - 1 moves</strong>.
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Content Panel: Factorial Call Stack */}
        {activeTab === 'factorial' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            alignItems: 'start'
          }}>

            <div className="brutal-card" style={{ background: '#FFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span className="brutal-badge brutal-badge-blue font-mono" style={{ fontSize: '0.75rem' }}>
                  CALL STACK FRAMES (LIFO)
                </span>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 800 }}>N:</span>
                  {[3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      onClick={() => runFactorial(num)}
                      className="brutal-btn brutal-btn-sm"
                      style={{
                        background: factN === num ? 'var(--canary-yellow)' : '#FFF',
                        fontWeight: 900
                      }}
                    >
                      {num}!
                    </button>
                  ))}
                </div>
              </div>

              {/* Call Stack Frames Visualizer */}
              <div style={{
                display: 'flex',
                flexDirection: 'column-reverse',
                gap: '0.5rem',
                background: 'var(--bg-paper)',
                padding: '1rem',
                border: '2px solid #000',
                minHeight: '200px'
              }}>
                {callStack.map((frame, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: frame.type === 'BASE CASE' ? 'var(--emerald-mint)' : 'var(--canary-yellow)',
                      border: '2px solid #000',
                      boxShadow: '2px 2px 0 #000',
                      padding: '0.65rem 1rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span>FRAME #{idx + 1}: {frame.fn}</span>
                    <span className="brutal-badge brutal-badge-sm" style={{ background: '#000', color: '#FFF' }}>
                      {frame.type}
                    </span>
                  </div>
                ))}
              </div>

              {factResult !== null && (
                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  background: 'var(--emerald-mint)',
                  border: '2px solid #000',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 900,
                  fontSize: '1rem'
                }}>
                  RESULT: {factN}! = {factResult.toLocaleString()}
                </div>
              )}
            </div>

            <div className="brutal-card brutal-card-blue">
              <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                FACTORIAL MATHEMATICAL DEFINITION
              </h4>
              <pre style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                background: '#000',
                padding: '0.85rem',
                border: '1px solid #333',
                color: 'var(--canary-yellow)'
              }}>
                n! = 1              if n = 0 (Base Case)<br />
                n! = n × (n - 1)!   if n &gt; 0 (Recursive Case)
              </pre>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}

export default RecursionStackTower;
