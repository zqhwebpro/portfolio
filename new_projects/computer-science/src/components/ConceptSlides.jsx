import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';
import { CONCEPTS } from '../utils/csData';
import { SoundEngine } from '../utils/soundEngine';

/* ============================================================
   SHARED SLIDE SHELL
   ============================================================ */
function SlideShell({ concept, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* ① Canonical Definition Banner */}
      <div style={{
        borderLeft: `8px solid ${concept.color}`,
        background: '#FAFAFA',
        border: `2px solid #0A0A0A`,
        borderLeft: `8px solid ${concept.color}`,
        padding: '1.25rem 1.5rem',
        boxShadow: '4px 4px 0 #0A0A0A',
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 900, color: concept.color, letterSpacing: '0.1em', marginBottom: '0.6rem', textTransform: 'uppercase' }}>
          ◆ CANONICAL DEFINITION
        </div>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: 800, lineHeight: 1.35, color: '#0A0A0A', margin: 0 }}>
          "{concept.definition}"
        </p>
      </div>

      {/* ② Key Properties */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 220px), 1fr))', gap: '0.65rem' }}>
        {concept.properties.map((p, i) => (
          <div key={i} style={{
            background: '#0A0A0A',
            border: `2px solid #0A0A0A`,
            padding: '0.75rem 0.9rem',
            boxShadow: `3px 3px 0 ${concept.color}`,
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 900, color: concept.color, letterSpacing: '0.08em', marginBottom: '0.3rem' }}>
              [{p.label}]
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#CCC', lineHeight: 1.4 }}>
              {p.desc}
            </div>
          </div>
        ))}
      </div>

      {/* ③ Interactive Demo + Code — side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '1.25rem', alignItems: 'start' }}>
        {children}
      </div>

      {/* ④ Examples */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 900, color: '#888', letterSpacing: '0.08em', marginRight: '0.25rem' }}>REAL-WORLD:</span>
        {concept.examples.map((ex, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700,
            background: '#F0F0F0', color: '#0A0A0A',
            border: '1.5px solid #0A0A0A', padding: '0.2rem 0.6rem',
            boxShadow: '2px 2px 0 #0A0A0A',
          }}>
            {ex.name} <span style={{ color: concept.color === '#FFE600' ? '#444' : concept.color, marginLeft: '0.3rem' }}>{ex.complexity}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   CODE PANEL — shared, with line highlighting
   ============================================================ */
function CodePanel({ concept, activeProperty = null }) {
  return (
    <div className="brutal-code-panel">
      <div className="code-header">
        <div className="code-dots">
          <div className="code-dot" style={{ background: '#FF5F56' }} />
          <div className="code-dot" style={{ background: '#FFBD2E' }} />
          <div className="code-dot" style={{ background: '#27C93F' }} />
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#666', fontWeight: 700 }}>
          {concept.term.toLowerCase().replace(/ /g,'_')}.js
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#444' }}>
          {concept.num}/08
        </span>
      </div>
      <div className="code-body">
        {concept.codeLines.map((line, i) => {
          const isHighlighted = line.key && (activeProperty === null || activeProperty === line.key);
          return (
            <div key={i} className={`code-line${isHighlighted ? ' active' : ''}`}>
              <span className="code-linenum">{line.n}</span>
              <span>{line.text || '\u00a0'}</span>
              {isHighlighted && (
                <span style={{
                  marginLeft: 'auto', paddingLeft: '0.75rem',
                  fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 900,
                  color: concept.color === '#FFE600' ? '#000' : concept.color,
                  background: 'rgba(0,0,0,0.4)', padding: '0 0.3rem',
                  whiteSpace: 'nowrap',
                }}>← {line.key}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   SLIDE 01 — ALGORITHM: GCD State Machine
   Shows: Finiteness (converges), Definiteness (each step clear),
          Input/Output, Effective
   ============================================================ */
function AlgorithmSlide({ concept }) {
  const STEPS = [
    { a: 48, b: 18, r: 12, prop: 'DEFINITE', desc: 'Step 1: a=48, b=18. b≠0 → compute r = 48 % 18 = 12. Each operation is unambiguously defined.' },
    { a: 18, b: 12, r:  6, prop: 'FINITE',   desc: 'Step 2: a=18, b=12. b≠0 → r = 18 % 12 = 6. State is strictly decreasing — halting guaranteed.' },
    { a: 12, b:  6, r:  0, prop: 'FINITE',   desc: 'Step 3: a=12, b=6. b≠0 → r = 12 % 6 = 0. Convergence continues toward base case.' },
    { a:  6, b:  0, r:  0, prop: 'INPUT/OUTPUT', desc: 'Step 4: b=0 ← BASE CASE. ALGORITHM TERMINATES. Output: GCD(48,18) = 6. ✓ FINITE & EFFECTIVE.' },
  ];
  const [step, setStep] = useState(0);
  const cur = STEPS[step];

  const advance = () => {
    SoundEngine.playClick();
    setStep(s => (s + 1) % STEPS.length);
    if (step === STEPS.length - 1) SoundEngine.playSuccess();
  };
  const reset = () => { SoundEngine.playClick(); setStep(0); };
  const done = step === STEPS.length - 1;

  return (
    <SlideShell concept={concept}>
      {/* Demo */}
      <div style={{ background: '#FFFFFF', border: '2.5px solid #0A0A0A', padding: '1.25rem', boxShadow: '4px 4px 0 #0A0A0A' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #0A0A0A', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, color: '#888', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>GCD STATE MACHINE</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.1rem' }}>EUCLIDEAN GCD(48, 18)</div>
          </div>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button onClick={advance} style={{ background: done ? '#00E599' : concept.color, color: done ? '#000' : concept.textColor, border: '2px solid #0A0A0A', padding: '0.4rem 0.8rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', boxShadow: '2px 2px 0 #0A0A0A' }}>
              <Play size={13} /> {done ? 'DONE →' : 'STEP'}
            </button>
            <button onClick={reset} style={{ background: '#FFF', border: '2px solid #0A0A0A', padding: '0.4rem 0.5rem', cursor: 'pointer', boxShadow: '2px 2px 0 #0A0A0A' }}>
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        {/* State display */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 800 }}>
          {['a','b'].map((v, idx) => (
            <div key={v} style={{ flex: 1, background: '#0A0A0A', color: idx === 0 ? '#00F0FF' : '#FFE600', padding: '0.6rem', border: '1.5px solid #0A0A0A', textAlign: 'center' }}>
              <div style={{ fontSize: '0.6rem', opacity: 0.7, marginBottom: '0.2rem' }}>STATE {v.toUpperCase()}</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900 }}>{idx === 0 ? cur.a : cur.b}</div>
            </div>
          ))}
          <div style={{ flex: 1, background: done ? '#00E599' : '#F8F7F2', color: '#0A0A0A', padding: '0.6rem', border: '2px solid #0A0A0A', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 900, opacity: 0.6, marginBottom: '0.2rem' }}>OUTPUT</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900 }}>{done ? cur.a : '?'}</div>
          </div>
        </div>

        {/* Convergence bar */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, color: '#888', marginBottom: '0.35rem' }}>CONVERGENCE → HALTING GUARANTEE</div>
          {['a','b'].map((v, idx) => {
            const val = idx === 0 ? cur.a : cur.b;
            const pct = Math.round((val / 48) * 100);
            return (
              <div key={v} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 800, width: '1rem', color: '#888' }}>{v}</span>
                <div style={{ flex: 1, background: '#E5E5E5', height: '14px', border: '1.5px solid #0A0A0A' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: idx === 0 ? '#00F0FF' : '#FFE600', transition: 'width 0.35s ease' }} />
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 900, width: '2rem', textAlign: 'right' }}>{val}</span>
              </div>
            );
          })}
        </div>

        {/* Active property callout */}
        <div style={{ background: '#0A0A0A', border: `2px solid ${concept.color}`, padding: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', lineHeight: 1.5, color: '#FFF' }}>
          <span style={{ color: concept.color, fontWeight: 900 }}>[{cur.prop}] </span>{cur.desc}
        </div>

        {/* Step counter */}
        <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.35rem' }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{ flex: 1, height: '4px', background: i <= step ? concept.color : '#E5E5E5', border: '1px solid #0A0A0A', transition: 'background 0.2s' }} />
          ))}
        </div>
      </div>

      {/* Code */}
      <CodePanel concept={concept} activeProperty={cur.prop} />
    </SlideShell>
  );
}

/* ============================================================
   SLIDE 02 — DATA STRUCTURE: Trade-off Matrix Live
   ============================================================ */
function DataStructureSlide({ concept }) {
  const [active, setActive] = useState(0);
  const ds = concept.tradeoffs[active];

  return (
    <SlideShell concept={concept}>
      {/* Demo */}
      <div style={{ background: '#FFFFFF', border: '2.5px solid #0A0A0A', padding: '1.25rem', boxShadow: '4px 4px 0 #0A0A0A' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, color: '#888', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>ACCESS vs. MUTATION TRADE-OFF TABLE</div>

        {/* Structure selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
          {concept.tradeoffs.map((t, i) => {
            const isActive = i === active;
            return (
              <button key={i} onClick={() => { SoundEngine.playClick(); setActive(i); }} style={{
                background: isActive ? '#0A0A0A' : '#F8F7F2',
                color: isActive ? '#FFF' : '#0A0A0A',
                border: isActive ? `2px solid ${t.color}` : '2px solid #E5E5E5',
                padding: '0.55rem 0.8rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 800,
                display: 'grid',
                gridTemplateColumns: '1fr auto auto auto',
                gap: '0.5rem',
                alignItems: 'center',
                textAlign: 'left',
                transition: 'all 0.1s ease',
                boxShadow: isActive ? `3px 3px 0 ${t.color}` : 'none',
              }}>
                <span style={{ color: isActive ? t.color : '#0A0A0A' }}>{t.name}</span>
                <span style={{ opacity: 0.6, fontSize: '0.62rem' }}>ACCESS: <strong style={{ color: isActive ? '#00F0FF' : '#0A0A0A' }}>{t.access}</strong></span>
                <span style={{ opacity: 0.6, fontSize: '0.62rem' }}>INS: <strong style={{ color: isActive ? '#00E599' : '#0A0A0A' }}>{t.insert}</strong></span>
                <span style={{ opacity: 0.6, fontSize: '0.62rem' }}>DEL: <strong style={{ color: isActive ? '#FFE600' : '#0A0A0A' }}>{t.del}</strong></span>
              </button>
            );
          })}
        </div>

        {/* Active DS detail */}
        <div style={{ background: '#0A0A0A', border: `2px solid ${ds.color}`, padding: '1rem', boxShadow: `4px 4px 0 ${ds.color}` }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1rem', color: ds.color, marginBottom: '0.65rem' }}>{ds.name}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem' }}>
            {[
              { k: 'ACCESS', v: ds.access, prop: 'ACCESS COST' },
              { k: 'INSERT', v: ds.insert, prop: 'MUTATION COST' },
              { k: 'DELETE', v: ds.del,    prop: 'MUTATION COST' },
              { k: 'SPACE',  v: ds.space,  prop: 'SPACE' },
            ].map(item => (
              <div key={item.k} style={{ background: '#1A1A1A', border: `1.5px solid #333`, padding: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: '#666', fontWeight: 700, marginBottom: '0.2rem' }}>{item.k}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: '0.85rem', color: ds.color }}>{item.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#888', lineHeight: 1.5 }}>
          <span style={{ color: concept.color, fontWeight: 900 }}>[LAYOUT] </span>
          {active === 0 && 'Contiguous RAM cells → CPU cache-line perfect → O(1) index by pointer arithmetic.'}
          {active === 1 && 'Heap-allocated nodes → pointer chaining → O(n) traversal, O(1) insertion at head/tail.'}
          {active === 2 && 'Hash function → bucket array → O(1) average but O(n) worst-case on collisions.'}
          {active === 3 && 'Complete binary tree in array → parent at ⌊i/2⌋ → O(log n) heapify up/down.'}
          {active === 4 && 'Balanced BST (Red-Black/AVL) → maintains height ≤ 2log n → guaranteed O(log n).'}
        </div>
      </div>

      {/* Code */}
      <CodePanel concept={concept} activeProperty={null} />
    </SlideShell>
  );
}

/* ============================================================
   SLIDE 03 — TIME COMPLEXITY: N-Scaler with Operation Counter
   ============================================================ */
function TimeComplexitySlide({ concept }) {
  const [n, setN] = useState(100);
  const fmt = (x) => {
    if (x >= 1e18) return '> Universe lifetime';
    if (x >= 1e15) return `${(x/1e15).toFixed(1)}P ops`;
    if (x >= 1e12) return `${(x/1e12).toFixed(1)}T ops`;
    if (x >= 1e9)  return `${(x/1e9).toFixed(1)}B ops`;
    if (x >= 1e6)  return `${(x/1e6).toFixed(2)}M ops`;
    if (x >= 1e3)  return `${(x/1e3).toFixed(2)}K ops`;
    return `${Math.round(x)} ops`;
  };

  return (
    <SlideShell concept={concept}>
      {/* Demo */}
      <div style={{ background: '#FFFFFF', border: '2.5px solid #0A0A0A', padding: '1.25rem', boxShadow: '4px 4px 0 #0A0A0A' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, color: '#888', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>T(n) OPERATION COUNT AT SCALE</div>

        {/* Slider */}
        <div style={{ background: '#0A0A0A', border: '2px solid #0A0A0A', padding: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, color: '#FFF', marginBottom: '0.5rem' }}>
            <span>INPUT SIZE n =</span>
            <span style={{ color: '#FFE600', fontSize: '1.1rem' }}>{n.toLocaleString()}</span>
          </div>
          <input type="range" min={1} max={1000} value={n}
            onChange={e => { setN(Number(e.target.value)); SoundEngine.playSliderBlip(n/1000); }}
            style={{ width: '100%', accentColor: '#FFE600', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#444', marginTop: '0.25rem' }}>
            <span>n=1</span><span>n=1,000</span>
          </div>
        </div>

        {/* T(n) rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {concept.scalingRows.map((row, i) => {
            const ops = row.fn(n);
            const barPct = Math.min(100, (Math.log10(Math.max(1, ops)) / Math.log10(Math.max(1, concept.scalingRows[5].fn(n)))) * 100);
            return (
              <div key={i} style={{ background: '#0A0A0A', border: `1.5px solid #222`, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 0.7rem', gap: '0.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 900, color: row.color, minWidth: '180px' }}>{row.label}</span>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <div style={{ background: '#1A1A1A', height: '18px', width: '100%', border: '1px solid #333' }}>
                      <div style={{ width: `${Math.max(2, barPct)}%`, height: '100%', background: row.color, transition: 'width 0.2s ease', opacity: 0.85 }} />
                    </div>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 900, color: '#FFF', minWidth: '120px', textAlign: 'right' }}>{fmt(ops)}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', fontWeight: 800, color: row.color, border: `1px solid ${row.color}`, padding: '0.1rem 0.35rem', whiteSpace: 'nowrap' }}>{row.tier}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#888', lineHeight: 1.5 }}>
          <span style={{ color: concept.color, fontWeight: 900 }}>[ASYMPTOTIC] </span>
          As n grows, dominant term completely governs. At n={n}: O(n²) requires {fmt(n*n)} vs O(log n) only {Math.ceil(Math.log2(Math.max(2,n)))} ops.
        </div>
      </div>

      {/* Code */}
      <CodePanel concept={concept} activeProperty="ASYMPTOTIC" />
    </SlideShell>
  );
}

/* ============================================================
   SLIDE 04 — SPACE COMPLEXITY: RAM Fill Visualizer
   ============================================================ */
function SpaceComplexitySlide({ concept }) {
  const [modeIdx, setModeIdx] = useState(0);
  const mode = concept.memoryModes[modeIdx];

  return (
    <SlideShell concept={concept}>
      {/* Demo */}
      <div style={{ background: '#FFFFFF', border: '2.5px solid #0A0A0A', padding: '1.25rem', boxShadow: '4px 4px 0 #0A0A0A' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, color: '#888', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
          S(n) = INPUT SPACE + AUXILIARY SPACE
        </div>

        {/* Mode buttons */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {concept.memoryModes.map((m, i) => (
            <button key={i} onClick={() => { SoundEngine.playClick(); setModeIdx(i); }} style={{
              background: i === modeIdx ? '#0A0A0A' : '#F8F7F2',
              color: i === modeIdx ? m.color : '#0A0A0A',
              border: `2px solid ${i === modeIdx ? m.color : '#CCC'}`,
              padding: '0.4rem 0.75rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 900,
              cursor: 'pointer',
              boxShadow: i === modeIdx ? `2px 2px 0 ${m.color}` : 'none',
            }}>
              {m.label}
            </button>
          ))}
        </div>

        {/* RAM model */}
        <div style={{ background: '#0A0A0A', border: '2px solid #0A0A0A', padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, color: '#555', marginBottom: '0.75rem', letterSpacing: '0.06em' }}>
            MEMORY MODEL (n=100 elements)
          </div>

          {/* Input space bar — always 100 cells */}
          <div style={{ marginBottom: '0.65rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#666', marginBottom: '0.3rem' }}>
              INPUT SPACE (unavoidable) = 100 cells
            </div>
            <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap' }}>
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} style={{ width: 12, height: 12, background: '#0038FF', border: '1px solid #222', opacity: 0.7 }} />
              ))}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#0038FF', alignSelf: 'center', marginLeft: '0.3rem' }}>… (100 cells)</span>
            </div>
          </div>

          {/* Auxiliary space bar — changes with mode */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#666', marginBottom: '0.3rem' }}>
              AUXILIARY SPACE (S_aux) = {mode.label}
            </div>
            <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap', alignItems: 'center', minHeight: '14px' }}>
              {Array.from({ length: Math.min(mode.aux, 30) }).map((_, i) => (
                <div key={i} style={{ width: 12, height: 12, background: mode.color, border: '1px solid #222', transition: 'all 0.3s ease' }} />
              ))}
              {mode.aux > 30 && (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: mode.color, alignSelf: 'center', marginLeft: '0.3rem' }}>… ({mode.aux} cells)</span>
              )}
              {mode.aux <= 1 && (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#00E599', marginLeft: '0.25rem' }}>← only {mode.aux} variable(s)</span>
              )}
            </div>
          </div>

          {/* Total bar */}
          <div style={{ marginTop: '0.75rem', background: '#111', height: '24px', border: `1.5px solid ${mode.color}`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${Math.min(100, (100/(100+mode.aux))*100)}%`, background: '#0038FF', opacity: 0.6 }} />
            <div style={{ position: 'absolute', left: `${Math.min(100, (100/(100+mode.aux))*100)}%`, top: 0, bottom: 0, right: 0, background: mode.color, opacity: 0.7, transition: 'all 0.3s ease' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, color: '#FFF' }}>
              S(n) = 100 + {mode.aux} = {100 + mode.aux} cells total
            </div>
          </div>
        </div>

        <div style={{ background: '#0A0A0A', border: `2px solid ${mode.color}`, padding: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#FFF', lineHeight: 1.5 }}>
          <span style={{ color: mode.color, fontWeight: 900 }}>
            [{modeIdx === 0 ? 'IN-PLACE' : modeIdx === 1 ? 'CALL STACK DEPTH' : 'AUXILIARY SPACE'}]
          </span>{' '}{mode.desc}
          <div style={{ marginTop: '0.35rem', fontSize: '0.65rem', color: '#666' }}>EXAMPLE: {mode.example}</div>
        </div>
      </div>

      {/* Code */}
      <CodePanel concept={concept} activeProperty={modeIdx === 0 ? 'IN-PLACE' : 'AUXILIARY SPACE'} />
    </SlideShell>
  );
}

/* ============================================================
   SLIDE 05 — BIG O NOTATION: Formal bound explorer
   ============================================================ */
function BigOSlide({ concept }) {
  const [notIdx, setNotIdx] = useState(0);
  const not = concept.notations[notIdx];
  const [n, setN] = useState(50);

  // f(n) = 3n + 50 example — show the bounding
  const fn = n => 3 * n + 50;
  const gn = n => n * n;
  const cgn = n => 4 * n * n;
  const maxY = cgn(n);
  const fnPct = Math.min(100, (fn(n) / maxY) * 100);
  const gnPct = Math.min(100, (gn(n) / maxY) * 100);

  return (
    <SlideShell concept={concept}>
      {/* Demo */}
      <div style={{ background: '#FFFFFF', border: '2.5px solid #0A0A0A', padding: '1.25rem', boxShadow: '4px 4px 0 #0A0A0A' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, color: '#888', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
          ASYMPTOTIC BOUND VISUALIZER
        </div>

        {/* Notation selector */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
          {concept.notations.map((nt, i) => (
            <button key={i} onClick={() => { SoundEngine.playClick(); setNotIdx(i); }} style={{
              flex: 1,
              background: i === notIdx ? nt.color : '#F8F7F2',
              color: i === notIdx ? (nt.color === '#FFE600' ? '#000' : '#FFF') : '#0A0A0A',
              border: `2px solid ${i === notIdx ? nt.color : '#CCC'}`,
              padding: '0.6rem 0.5rem',
              fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: '0.75rem',
              cursor: 'pointer', textAlign: 'center',
              boxShadow: i === notIdx ? `3px 3px 0 #0A0A0A` : 'none',
            }}>
              <div style={{ fontSize: '1.2rem' }}>{nt.symbol}</div>
              <div style={{ fontSize: '0.6rem', marginTop: '0.1rem' }}>{nt.bound} BOUND</div>
            </button>
          ))}
        </div>

        {/* Formal definition */}
        <div style={{ background: '#0A0A0A', border: `2px solid ${not.color}`, padding: '0.85rem', marginBottom: '1rem', boxShadow: `3px 3px 0 ${not.color}` }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#666', marginBottom: '0.3rem' }}>{not.name} ({not.symbol}) — {not.caseLabel}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 900, color: not.color }}>{not.formal}</div>
        </div>

        {/* Simplification walkthrough */}
        <div style={{ background: '#F8F7F2', border: '2px solid #0A0A0A', padding: '0.85rem', marginBottom: '0.75rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, color: '#888', marginBottom: '0.5rem' }}>DROP CONSTANTS & LOW-ORDER TERMS:</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
            <div>f(n) = <strong>3n² + 50n + 1000</strong></div>
            <div style={{ color: '#888' }}>① Dominant term: <strong style={{ color: '#0038FF' }}>n²</strong>  <span style={{ fontSize: '0.65rem' }}>(DROP LOW-ORDER)</span></div>
            <div style={{ color: '#888' }}>② Drop coefficient: <strong style={{ color: '#0038FF' }}>n²</strong>  <span style={{ fontSize: '0.65rem' }}>(DROP CONSTANTS)</span></div>
            <div style={{ color: not.color, fontWeight: 900 }}>∴ f(n) = {not.symbol}(n²)  <span style={{ fontSize: '0.65rem' }}>← {not.name}</span></div>
          </div>
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#888', lineHeight: 1.5 }}>
          <span style={{ color: concept.color, fontWeight: 900 }}>[UPPER BOUND] </span>
          For {not.symbol}(n²): ∃ c=4, n₀=100 such that f(n) ≤ 4·n² for all n ≥ 100.
        </div>
      </div>

      {/* Code */}
      <CodePanel concept={concept} activeProperty="UPPER BOUND" />
    </SlideShell>
  );
}

/* ============================================================
   SLIDE 06 — RECURSION: Live Call Stack Tower
   ============================================================ */
function RecursionSlide({ concept }) {
  const [step, setStep] = useState(0);
  const steps = concept.stackSteps;
  const cur = steps[step];
  const pushSteps = steps.filter(s => s.phase === 'PUSH' || s.phase === 'BASE');
  const stackDepth = steps.slice(0, step + 1).filter(s => s.phase === 'PUSH' || s.phase === 'BASE').length
    - steps.slice(0, step + 1).filter(s => s.phase === 'POP').length;

  const visibleStack = [];
  let depth = 0;
  for (let i = 0; i <= step; i++) {
    const s = steps[i];
    if (s.phase === 'PUSH' || s.phase === 'BASE') {
      visibleStack.push({ ...s, depth });
      depth++;
    } else if (s.phase === 'POP') {
      visibleStack.pop();
      depth = Math.max(0, depth - 1);
    }
  }

  const advance = () => { SoundEngine.playClick(); setStep(s => Math.min(s + 1, steps.length - 1)); };
  const reset = () => { SoundEngine.playClick(); setStep(0); };

  const phaseColors = { PUSH: '#0038FF', BASE: '#00E599', POP: '#FF2A00' };

  return (
    <SlideShell concept={concept}>
      {/* Demo */}
      <div style={{ background: '#FFFFFF', border: '2.5px solid #0A0A0A', padding: '1.25rem', boxShadow: '4px 4px 0 #0A0A0A' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #0A0A0A', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, color: '#888', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>LIFO CALL STACK VISUALIZER</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.05rem' }}>factorial(4) EXECUTION</div>
          </div>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button onClick={advance} disabled={step >= steps.length - 1} style={{ background: concept.color, color: concept.textColor, border: '2px solid #0A0A0A', padding: '0.4rem 0.8rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', boxShadow: '2px 2px 0 #0A0A0A', opacity: step >= steps.length - 1 ? 0.5 : 1 }}>
              <Play size={13} /> STEP
            </button>
            <button onClick={reset} style={{ background: '#FFF', border: '2px solid #0A0A0A', padding: '0.4rem 0.5rem', cursor: 'pointer', boxShadow: '2px 2px 0 #0A0A0A' }}>
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        {/* Phase legend */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          {[['PUSH', 'RECURSIVE STEP'], ['BASE', 'BASE CASE'], ['POP', 'CALL STACK UNWIND']].map(([ph, label]) => (
            <div key={ph} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 800 }}>
              <div style={{ width: 8, height: 8, background: phaseColors[ph], border: '1px solid #0A0A0A' }} />
              <span style={{ color: cur.phase === ph ? phaseColors[ph] : '#888' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Stack visualization */}
        <div style={{ background: '#0A0A0A', border: '2px solid #0A0A0A', padding: '0.75rem', marginBottom: '0.75rem', minHeight: '160px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#444', marginBottom: '0.5rem' }}>
            ← TOP OF STACK (most recent frame) | STACK DEPTH: {visibleStack.length}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: '0.3rem' }}>
            {visibleStack.map((frame, i) => {
              const isTop = i === visibleStack.length - 1;
              const fc = phaseColors[frame.phase];
              return (
                <div key={i} style={{
                  background: isTop ? '#1A1A1A' : '#111',
                  border: isTop ? `2px solid ${fc}` : '1.5px solid #222',
                  padding: '0.55rem 0.85rem',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  boxShadow: isTop ? `3px 3px 0 ${fc}` : 'none',
                  animation: isTop ? 'stackPush 0.25s ease' : 'none',
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: '0.85rem', color: isTop ? fc : '#555' }}>
                    {frame.frame}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: isTop ? fc : '#444', fontWeight: 700 }}>
                    [{frame.phase}]
                  </span>
                </div>
              );
            })}
            {visibleStack.length === 0 && (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#333', textAlign: 'center', padding: '1rem' }}>[ EMPTY STACK ]</div>
            )}
          </div>
        </div>

        {/* Current step explanation */}
        <div style={{ background: '#0A0A0A', border: `2px solid ${phaseColors[cur.phase]}`, padding: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#FFF', lineHeight: 1.5 }}>
          <span style={{ color: phaseColors[cur.phase], fontWeight: 900 }}>[{cur.highlight}] </span>{cur.note}
        </div>

        {/* Progress */}
        <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.35rem' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ flex: 1, height: '4px', background: i <= step ? phaseColors[s.phase] : '#E5E5E5', border: '1px solid #0A0A0A', transition: 'background 0.2s' }} />
          ))}
        </div>
      </div>

      {/* Code */}
      <CodePanel concept={concept} activeProperty={cur.highlight} />
    </SlideShell>
  );
}

/* ============================================================
   SLIDE 07 — DIVIDE & CONQUER: 3-Phase Stepper
   ============================================================ */
function DivideConquerSlide({ concept }) {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const phase = concept.phases[phaseIdx];

  return (
    <SlideShell concept={concept}>
      {/* Demo */}
      <div style={{ background: '#FFFFFF', border: '2.5px solid #0A0A0A', padding: '1.25rem', boxShadow: '4px 4px 0 #0A0A0A' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, color: '#888', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
          3-PHASE PARADIGM: MERGE SORT EXAMPLE
        </div>

        {/* Phase selector */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem' }}>
          {concept.phases.map((p, i) => (
            <button key={p.id} onClick={() => { SoundEngine.playClick(); setPhaseIdx(i); }} style={{
              flex: 1,
              background: i === phaseIdx ? p.color : '#F8F7F2',
              color: i === phaseIdx ? (p.color === '#FFE600' ? '#000' : '#FFF') : '#888',
              border: `2px solid ${i === phaseIdx ? p.color : '#E5E5E5'}`,
              padding: '0.75rem 0.5rem',
              fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: '0.72rem',
              cursor: 'pointer',
              boxShadow: i === phaseIdx ? `4px 4px 0 #0A0A0A` : 'none',
              textAlign: 'center',
            }}>
              {p.label}
            </button>
          ))}
        </div>

        {/* Phase visual */}
        <div style={{ background: '#0A0A0A', border: `2px solid ${phase.color}`, padding: '1.1rem', marginBottom: '1rem', boxShadow: `4px 4px 0 ${phase.color}` }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.83rem', color: '#CCC', lineHeight: 1.5, marginBottom: '0.85rem' }}>
            {phase.desc}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center', justifyContent: 'center' }}>
            {phase.visual.map((item, i) => (
              <div key={i} style={{
                background: item === '|' ? 'transparent' : phase.color,
                color: item === '|' ? '#FF2A00' : (phase.color === '#FFE600' ? '#000' : '#FFF'),
                border: item === '|' ? 'none' : '2px solid #0A0A0A',
                padding: item === '|' ? '0' : '0.5rem 0.7rem',
                fontFamily: 'var(--font-mono)', fontWeight: 900,
                fontSize: item === '|' ? '1.5rem' : '0.85rem',
                boxShadow: item !== '|' ? '2px 2px 0 rgba(0,0,0,0.3)' : 'none',
                minWidth: item === '|' ? 'auto' : '2.5rem',
                textAlign: 'center',
              }}>
                {item}
              </div>
            ))}
          </div>
          <div style={{ marginTop: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#666', textAlign: 'center' }}>
            {phase.sub}
          </div>
        </div>

        {/* Pipeline flow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
          {concept.phases.map((p, i) => (
            <React.Fragment key={p.id}>
              <div style={{ background: i === phaseIdx ? p.color : '#111', color: i === phaseIdx ? (p.color === '#FFE600' ? '#000' : '#FFF') : '#444', border: `1.5px solid ${i === phaseIdx ? p.color : '#333'}`, padding: '0.35rem 0.6rem', fontWeight: 900, fontSize: '0.65rem' }}>
                {p.label}
              </div>
              {i < 2 && <span style={{ color: '#555', fontWeight: 900 }}>→</span>}
            </React.Fragment>
          ))}
          <div style={{ marginLeft: 'auto', color: '#555', fontSize: '0.65rem' }}>T(n) = 2T(n/2) + O(n) → O(n log n)</div>
        </div>
      </div>

      {/* Code */}
      <CodePanel concept={concept} activeProperty={phaseIdx === 0 ? 'DIVIDE' : phaseIdx === 1 ? 'CONQUER' : 'COMBINE'} />
    </SlideShell>
  );
}

/* ============================================================
   SLIDE 08 — BRUTE FORCE: Exhaustive Search + Cost Explosion
   ============================================================ */
function BruteForceSlide({ concept }) {
  const [running, setRunning] = useState(false);
  const [current, setCurrent] = useState(0);
  const [found, setFound] = useState(false);
  const TARGET = 73;

  const runSearch = () => {
    if (running) return;
    setRunning(true); setFound(false); setCurrent(0);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setCurrent(i);
      SoundEngine.playSliderBlip(i / 100);
      if (i >= TARGET) {
        clearInterval(id);
        setRunning(false);
        setFound(true);
        SoundEngine.playSuccess();
      }
    }, 30);
  };
  const reset = () => { setRunning(false); setCurrent(0); setFound(false); SoundEngine.playClick(); };

  return (
    <SlideShell concept={concept}>
      {/* Demo */}
      <div style={{ background: '#FFFFFF', border: '2.5px solid #0A0A0A', padding: '1.25rem', boxShadow: '4px 4px 0 #0A0A0A' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, color: '#888', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
          EXHAUSTIVE SEARCH DEMONSTRATOR
        </div>

        {/* Search grid */}
        <div style={{ background: '#0A0A0A', border: '2px solid #0A0A0A', padding: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#555', marginBottom: '0.5rem' }}>
            SEARCH SPACE: 100 elements, target = {TARGET}. NO SHORTCUTS — check every index.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '2px' }}>
            {Array.from({ length: 100 }).map((_, i) => {
              const checked = i < current;
              const isCurrent = i === current - 1;
              const isTarget = i === TARGET - 1 && found;
              return (
                <div key={i} style={{
                  aspectRatio: '1',
                  background: isTarget ? '#00E599' : isCurrent ? concept.color : checked ? '#1A1A1A' : '#111',
                  border: isTarget ? `1.5px solid #00E599` : isCurrent ? `1.5px solid ${concept.color}` : '1px solid #222',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: '0.5rem', fontWeight: 900,
                  color: isTarget ? '#000' : isCurrent ? '#000' : checked ? '#333' : '#444',
                  transition: 'background 0.05s ease',
                }}>
                  {i + 1}
                </div>
              );
            })}
          </div>
        </div>

        {/* Status */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800 }}>
          <div style={{ flex: 1, background: '#0A0A0A', color: concept.color, border: `1.5px solid ${concept.color}`, padding: '0.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.6rem', opacity: 0.7, marginBottom: '0.2rem' }}>CHECKED</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>{current}</div>
          </div>
          <div style={{ flex: 1, background: found ? '#00E599' : '#0A0A0A', color: found ? '#000' : '#FFF', border: `1.5px solid ${found ? '#00E599' : '#333'}`, padding: '0.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.6rem', opacity: 0.7, marginBottom: '0.2rem' }}>STATUS</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 900 }}>{found ? `FOUND @ i=${TARGET}` : running ? 'SCANNING...' : 'IDLE'}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <button onClick={runSearch} disabled={running} style={{ flex: 1, background: concept.color, color: '#FFF', border: '2px solid #0A0A0A', padding: '0.55rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 900, cursor: running ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', boxShadow: '3px 3px 0 #0A0A0A', opacity: running ? 0.6 : 1 }}>
            <Play size={14} /> {running ? 'ENUMERATING...' : 'RUN BRUTE SEARCH'}
          </button>
          <button onClick={reset} style={{ background: '#FFF', border: '2px solid #0A0A0A', padding: '0.55rem 0.75rem', cursor: 'pointer', boxShadow: '2px 2px 0 #0A0A0A' }}>
            <RotateCcw size={14} />
          </button>
        </div>

        {/* Cost explosion table */}
        <div style={{ background: '#0A0A0A', border: '2px solid #0A0A0A', padding: '0.75rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#555', marginBottom: '0.5rem' }}>[COMBINATORIAL COST] SEARCH SPACE EXPLOSION:</div>
          {concept.searchSpaces.map((ss, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.3rem 0', borderBottom: '1px solid #1A1A1A', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
              <span style={{ color: '#888' }}>{ss.label}</span>
              <span style={{ color: '#555', fontSize: '0.62rem' }}>{ss.space}</span>
              <span style={{ color: concept.color, fontWeight: 900 }}>{ss.complexity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Code */}
      <CodePanel concept={concept} activeProperty="EXHAUSTIVE" />
    </SlideShell>
  );
}

/* ============================================================
   SLIDE ROUTER
   ============================================================ */
const SLIDE_COMPONENTS = {
  'algorithm':       AlgorithmSlide,
  'data-structure':  DataStructureSlide,
  'time-complexity': TimeComplexitySlide,
  'space-complexity': SpaceComplexitySlide,
  'big-o':           BigOSlide,
  'recursion':       RecursionSlide,
  'divide-conquer':  DivideConquerSlide,
  'brute-force':     BruteForceSlide,
};

/* ============================================================
   MAIN EXPORT: ConceptSlides
   ============================================================ */
export function ConceptSlides({ activeIndex, onSelect }) {
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const concept = CONCEPTS[activeIndex];
  const SlideComponent = SLIDE_COMPONENTS[concept.id];

  // Arrow key navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') { SoundEngine.playClick(); onSelect(i => Math.min(i + 1, CONCEPTS.length - 1)); }
      if (e.key === 'ArrowLeft')  { SoundEngine.playClick(); onSelect(i => Math.max(i - 1, 0)); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onSelect]);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlay) return;
    const id = setInterval(() => { SoundEngine.playClick(); onSelect(i => (i + 1) % CONCEPTS.length); }, 10000);
    return () => clearInterval(id);
  }, [isAutoPlay, onSelect]);

  return (
    <section id="concept-slides" style={{ background: '#FFFFFF', padding: 'clamp(2.5rem, 6vw, 5rem) 0', borderBottom: '3.5px solid #0A0A0A' }}>
      <div className="container">

        {/* Section header */}
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ background: '#0A0A0A', color: '#FFE600', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900, padding: '0.25rem 0.75rem', border: '2px solid #0A0A0A', letterSpacing: '0.08em', display: 'inline-block', marginBottom: '0.75rem' }}>
            INTERACTIVE REFERENCE // 8 CANONICAL CONCEPTS
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.05, color: '#0A0A0A', marginBottom: '0.5rem' }}>
            THE 8 FUNDAMENTAL <span style={{ color: '#0038FF' }}>CONCEPTS OF ALGORITHMS</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', color: '#666', fontSize: '0.98rem', maxWidth: '640px', lineHeight: 1.6 }}>
            Each slide presents one canonical term: its formal definition, key properties, an interactive demonstration that proves the definition, and annotated code.
          </p>
        </div>

        {/* Nav bar */}
        <div style={{ background: '#0A0A0A', padding: '0.65rem 0.85rem', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap', border: '2px solid #0A0A0A' }}>
          {/* Concept tabs */}
          <div style={{ display: 'flex', gap: '0.3rem', overflowX: 'auto', flex: 1 }}>
            {CONCEPTS.map((c, i) => {
              const active = i === activeIndex;
              return (
                <button key={c.id} onClick={() => { SoundEngine.playClick(); onSelect(i); }} style={{
                  background: active ? c.color : 'transparent',
                  color: active ? c.textColor : '#666',
                  border: active ? `1.5px solid ${c.color}` : '1.5px solid #333',
                  padding: '0.3rem 0.7rem',
                  fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: '0.68rem',
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  transition: 'all 0.12s ease',
                }}>
                  {c.num} {c.term.toUpperCase()}
                </button>
              );
            })}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button onClick={() => setIsAutoPlay(p => !p)} style={{
              background: isAutoPlay ? '#00E599' : '#1A1A1A', color: isAutoPlay ? '#000' : '#FFF',
              border: '1.5px solid #333', padding: '0.3rem 0.7rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem',
            }}>
              {isAutoPlay ? <><Pause size={12} /> PAUSE</> : <><Play size={12} /> AUTO</>}
            </button>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#666' }}>
              <strong style={{ color: '#FFF' }}>{activeIndex + 1}</strong>/{CONCEPTS.length}
            </span>
            <button onClick={() => { SoundEngine.playClick(); onSelect(i => Math.max(i - 1, 0)); }} style={{ background: '#222', color: '#FFF', border: '1.5px solid #444', padding: '0.3rem 0.5rem', cursor: 'pointer' }}>
              <ChevronLeft size={14} />
            </button>
            <button onClick={() => { SoundEngine.playClick(); onSelect(i => Math.min(i + 1, CONCEPTS.length - 1)); }} style={{ background: '#FFE600', color: '#000', border: '1.5px solid #000', padding: '0.3rem 0.5rem', cursor: 'pointer' }}>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Active slide header */}
        <div style={{
          background: concept.color,
          border: '3px solid #0A0A0A',
          padding: '1.25rem 1.5rem',
          marginBottom: '1.5rem',
          boxShadow: '6px 6px 0 #0A0A0A',
          display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap',
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: concept.textColor, lineHeight: 1, opacity: 0.5 }}>
            {concept.num}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, color: concept.textColor, opacity: 0.7, letterSpacing: '0.1em', marginBottom: '0.2rem' }}>
              {concept.category}
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 900, color: concept.textColor, margin: 0, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              {concept.term}
            </h3>
          </div>
          <div style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, color: concept.textColor, opacity: 0.7, maxWidth: '300px', lineHeight: 1.4 }}>
            {concept.formalDef.substring(0, 100)}…
          </div>
        </div>

        {/* Slide content */}
        <SlideComponent key={concept.id} concept={concept} />

      </div>
    </section>
  );
}
