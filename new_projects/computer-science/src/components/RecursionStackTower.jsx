import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Layers, Play, Pause, SkipForward, SkipBack, RotateCcw, AlertTriangle, ArrowUp, ArrowDown, Code2, Database } from 'lucide-react';
import { RECURSION_MODES } from '../utils/csData';
import { SoundEngine } from '../utils/soundEngine';

export function RecursionStackTower() {
  const [selectedModeId, setSelectedModeId] = useState('factorial');
  const [nParam, setNParam] = useState(5);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(800); // ms per step

  const mode = useMemo(() => {
    return RECURSION_MODES.find(m => m.id === selectedModeId) || RECURSION_MODES[0];
  }, [selectedModeId]);

  // Generate complete execution steps
  const steps = useMemo(() => {
    return mode.generateSteps(nParam);
  }, [mode, nParam]);

  const currentStep = steps[stepIndex] || steps[0] || {
    action: 'Ready',
    highlightLine: 1,
    stack: [],
    currentFrame: null,
    phase: 'idle',
    returnVal: null,
    memoryBytes: 0
  };

  // Auto-play timer
  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            SoundEngine.playSuccess();
            return prev;
          }
          const next = prev + 1;
          const nextStep = steps[next];
          if (nextStep) {
            if (nextStep.phase === 'call') {
              SoundEngine.playStackPush(nextStep.stack.length);
            } else if (nextStep.phase === 'return') {
              SoundEngine.playStackPop(nextStep.stack.length);
            }
          }
          return next;
        });
      }, playbackSpeed);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, steps, playbackSpeed]);

  const handleModeChange = (id) => {
    SoundEngine.playClick();
    setIsPlaying(false);
    setSelectedModeId(id);
    const m = RECURSION_MODES.find(x => x.id === id);
    if (m) setNParam(m.defaultN);
    setStepIndex(0);
  };

  const handleStepForward = () => {
    if (stepIndex < steps.length - 1) {
      const next = stepIndex + 1;
      const nextStep = steps[next];
      if (nextStep.phase === 'call') {
        SoundEngine.playStackPush(nextStep.stack.length);
      } else if (nextStep.phase === 'return') {
        SoundEngine.playStackPop(nextStep.stack.length);
      }
      setStepIndex(next);
    } else {
      SoundEngine.playSuccess();
    }
  };

  const handleStepBack = () => {
    if (stepIndex > 0) {
      SoundEngine.playClick();
      setStepIndex(stepIndex - 1);
    }
  };

  const handleReset = () => {
    SoundEngine.playClick();
    setIsPlaying(false);
    setStepIndex(0);
  };

  const togglePlay = () => {
    SoundEngine.playClick();
    if (stepIndex >= steps.length - 1) {
      setStepIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  // Color palette for stack levels
  const stackColors = [
    '#0038FF', // Cobalt Blue
    '#FFE600', // Canary Yellow
    '#FF2A00', // Vermilion Red
    '#00E599', // Mint
    '#7928CA', // Purple
    '#00F0FF', // Cyan
    '#FF7A00', // Orange
  ];

  return (
    <section id="recursion" className="section-wrapper" style={{ background: 'var(--bg-paper)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Layers size={14} /> CONCEPT 02 // RECURSION & MEMORY STACK
          </div>
          <h2 className="section-title">
            THE PHYSICAL <span style={{ color: 'var(--vermilion-red)' }}>CALL STACK</span> TOWER
          </h2>
          <p className="section-subtitle">
            Every recursive invocation allocates an isolated frame on the stack memory. Watch stack frames physically accumulate as colored architectural blocks and pop off during the return phase.
          </p>
        </div>

        {/* Algorithm Switcher Tabs */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {RECURSION_MODES.map((m) => {
            const isSelected = m.id === selectedModeId;
            return (
              <button
                key={m.id}
                onClick={() => handleModeChange(m.id)}
                className="brutal-btn"
                style={{
                  background: isSelected ? 'var(--vermilion-red)' : 'var(--bg-card)',
                  color: isSelected ? '#FFFFFF' : '#0A0A0A',
                  borderColor: '#0A0A0A',
                  boxShadow: isSelected ? 'var(--shadow-hover-md)' : 'var(--shadow-md)',
                  fontWeight: 800
                }}
              >
                {m.title}
              </button>
            );
          })}
        </div>

        {/* Main Grid: Code Inspector & Stack Tower */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          alignItems: 'start'
        }}>
          {/* Left Column: Code Window & Step Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Control Dashboard */}
            <div className="brutal-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span className="font-mono" style={{ fontWeight: 800, fontSize: '0.9rem' }}>
                  // STEPPER [ {stepIndex + 1} / {steps.length} ]
                </span>

                {/* Input Parameter N Selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <label className="font-mono" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                    INPUT N:
                  </label>
                  <select
                    value={nParam}
                    onChange={(e) => {
                      SoundEngine.playClick();
                      setNParam(parseInt(e.target.value, 10));
                      setStepIndex(0);
                    }}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      padding: '0.2rem 0.5rem',
                      border: 'var(--border-solid)',
                      background: 'var(--canary-yellow)',
                      cursor: 'pointer'
                    }}
                  >
                    {[3, 4, 5, 6].filter(n => n <= mode.maxN).map(n => (
                      <option key={n} value={n}>N = {n}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <button
                  onClick={togglePlay}
                  className={`brutal-btn ${isPlaying ? 'brutal-btn-danger' : 'brutal-btn-primary'}`}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  <span>{isPlaying ? 'PAUSE' : 'AUTO PLAY'}</span>
                </button>
                <button
                  onClick={handleStepBack}
                  disabled={stepIndex === 0 || isPlaying}
                  className="brutal-btn"
                  title="Step Backward"
                >
                  <SkipBack size={16} />
                </button>
                <button
                  onClick={handleStepForward}
                  disabled={stepIndex >= steps.length - 1 || isPlaying}
                  className="brutal-btn brutal-btn-accent"
                  title="Step Forward"
                >
                  <SkipForward size={16} /> STEP
                </button>
                <button
                  onClick={handleReset}
                  className="brutal-btn"
                  title="Reset"
                >
                  <RotateCcw size={16} />
                </button>
              </div>

              {/* Action Narration Box */}
              <div style={{
                background: currentStep.phase === 'base' ? 'var(--canary-yellow)' : currentStep.phase === 'return' ? 'var(--emerald-mint)' : '#0A0A0A',
                color: currentStep.phase === 'base' || currentStep.phase === 'return' ? '#0A0A0A' : '#FFFFFF',
                border: 'var(--border-solid)',
                padding: '0.75rem 1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                {currentStep.phase === 'call' && <ArrowUp size={16} color="var(--canary-yellow)" />}
                {currentStep.phase === 'return' && <ArrowDown size={16} />}
                {currentStep.phase === 'base' && <AlertTriangle size={16} />}
                <span>{currentStep.action}</span>
              </div>
            </div>

            {/* Synchronized Code Panel */}
            <div className="brutal-code-panel">
              <div className="code-header">
                <span style={{ fontSize: '0.8rem', color: '#AAA' }}>{mode.id}.js (Execution Trace)</span>
                <div className="code-dots">
                  <span className="code-dot" style={{ background: '#FF5F56' }}></span>
                  <span className="code-dot" style={{ background: '#FFBD2E' }}></span>
                  <span className="code-dot" style={{ background: '#27C93F' }}></span>
                </div>
              </div>
              <div className="code-body">
                {mode.code.map((c) => {
                  const isActive = currentStep.highlightLine === c.line;
                  return (
                    <div key={c.line} className={`code-line ${isActive ? 'active' : ''}`}>
                      <span className="code-linenum">{c.line}</span>
                      <span>{c.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Physical Stack Tower Arena */}
          <div className="brutal-card" style={{
            background: 'var(--bg-card)',
            border: 'var(--border-thick)',
            boxShadow: 'var(--shadow-lg)',
            padding: '1.5rem',
            minHeight: '440px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            {/* Stack Telemetry Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: 'var(--border-solid)',
              paddingBottom: '0.75rem',
              marginBottom: '1rem'
            }}>
              <div>
                <div className="font-mono" style={{ fontSize: '0.7rem', color: '#666' }}>STACK DEPTH:</div>
                <div className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--vermilion-red)' }}>
                  {currentStep.stack.length} FRAMES
                </div>
              </div>

              <div>
                <div className="font-mono" style={{ fontSize: '0.7rem', color: '#666' }}>ESTIMATED STACK RAM:</div>
                <div className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                  {currentStep.memoryBytes} BYTES
                </div>
              </div>

              <div className="brutal-pill pill-yellow">
                LIFO TOWER
              </div>
            </div>

            {/* Visual Stack Tower (Building from ground up) */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column-reverse',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '8px',
              padding: '1.5rem 0',
              position: 'relative'
            }}>
              {currentStep.stack.length === 0 ? (
                <div className="font-mono" style={{ color: '#888', fontStyle: 'italic', margin: 'auto' }}>
                  // Call Stack Empty (Ready to push)
                </div>
              ) : (
                currentStep.stack.map((frame, idx) => {
                  const isTop = idx === currentStep.stack.length - 1;
                  const color = stackColors[idx % stackColors.length];
                  const isDark = color === '#0038FF' || color === '#7928CA' || color === '#FF2A00';

                  return (
                    <div
                      key={frame.id || idx}
                      style={{
                        width: '90%',
                        maxWidth: '380px',
                        background: color,
                        color: isDark ? '#FFFFFF' : '#0A0A0A',
                        border: '2.5px solid #0A0A0A',
                        boxShadow: isTop ? '6px 6px 0px #0A0A0A' : '3px 3px 0px #0A0A0A',
                        padding: '0.75rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        transform: isTop ? 'scale(1.03)' : 'scale(1)',
                        transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        position: 'relative'
                      }}
                    >
                      {/* Left Frame Signature */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{
                          background: isDark ? '#FFFFFF' : '#0A0A0A',
                          color: isDark ? '#0A0A0A' : '#FFFFFF',
                          padding: '1px 5px',
                          fontSize: '0.75rem'
                        }}>
                          #{idx + 1}
                        </span>
                        <span>{frame.name}</span>
                      </div>

                      {/* Right Frame Return / Evaluation State */}
                      <div style={{
                        background: 'rgba(0,0,0,0.15)',
                        padding: '2px 8px',
                        borderRadius: '2px',
                        fontSize: '0.8rem'
                      }}>
                        val: <strong>{frame.value !== undefined ? (typeof frame.value === 'object' ? JSON.stringify(frame.value) : frame.value) : '?'}</strong>
                      </div>

                      {/* Top Frame Pointer Stamp */}
                      {isTop && (
                        <div style={{
                          position: 'absolute',
                          left: '-28px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'var(--vermilion-red)',
                          fontWeight: 900,
                          fontSize: '1.2rem'
                        }}>
                          ▶
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Base of Physical Stack (Architectural Foundation) */}
            <div style={{
              width: '100%',
              height: '18px',
              background: '#0A0A0A',
              border: '2px solid #0A0A0A',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--canary-yellow)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              fontWeight: 800,
              letterSpacing: '0.1em'
            }}>
              ▼ STACK BASE POINTER [0x7FFEEF] ▼
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
