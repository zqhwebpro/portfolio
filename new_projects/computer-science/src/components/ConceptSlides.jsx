import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Terminal as TerminalIcon, Box, Check, X } from 'lucide-react';
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
          {concept.id}.js
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#444' }}>
          {concept.num}/05
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
   SLIDE 01 — VARIABLES & CONSTANTS
   ============================================================ */
function VariablesSlide({ concept }) {
  const [slots, setSlots] = useState(concept.memorySlots.map(s => ({ ...s })));
  const [activeProperty, setActiveProperty] = useState('DECLARATION');
  const [errorMsg, setErrorMsg] = useState('');

  const handleUpdate = (idx) => {
    SoundEngine.playClick();
    const newSlots = [...slots];
    if (newSlots[idx].canChange) {
      if (typeof newSlots[idx].val === 'number') {
        newSlots[idx].val += 1;
      } else {
        newSlots[idx].val = '"Bob"';
      }
      setSlots(newSlots);
      setActiveProperty('ASSIGNMENT');
      setErrorMsg('');
      SoundEngine.playSuccess();
    } else {
      setActiveProperty('MUTABILITY');
      setErrorMsg(`TypeError: Assignment to constant variable '${newSlots[idx].label}'.`);
    }
  };

  return (
    <SlideShell concept={concept}>
      <div style={{ background: '#FFFFFF', border: '2.5px solid #0A0A0A', padding: '1.25rem', boxShadow: '4px 4px 0 #0A0A0A' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, color: '#888', letterSpacing: '0.08em', marginBottom: '1rem' }}>
          MEMORY STATE VISUALIZER
        </div>
        
        {errorMsg && (
          <div style={{ background: '#FF2A00', color: '#FFF', padding: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '1rem', border: '2px solid #0A0A0A' }}>
            {errorMsg}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {slots.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'stretch', border: '2px solid #0A0A0A' }}>
              <div style={{ background: s.canChange ? '#0A0A0A' : '#444', color: s.canChange ? concept.color : '#CCC', padding: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 900, minWidth: '80px' }}>
                {s.type} {s.label}
              </div>
              <div style={{ flex: 1, padding: '0.75rem', background: '#F8F7F2', fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 800, color: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {s.val}
                <button onClick={() => handleUpdate(i)} style={{ background: '#0A0A0A', color: '#FFF', border: 'none', padding: '0.3rem 0.6rem', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 'bold' }}>
                  UPDATE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CodePanel concept={concept} activeProperty={activeProperty} />
    </SlideShell>
  );
}

/* ============================================================
   SLIDE 02 — DATA TYPES
   ============================================================ */
function DataTypesSlide({ concept }) {
  const [active, setActive] = useState(0);
  const t = concept.typesList[active];

  return (
    <SlideShell concept={concept}>
      <div style={{ background: '#FFFFFF', border: '2.5px solid #0A0A0A', padding: '1.25rem', boxShadow: '4px 4px 0 #0A0A0A' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, color: '#888', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
          TYPE INSPECTOR
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
          {concept.typesList.map((typeObj, i) => {
            const isActive = i === active;
            return (
              <button key={i} onClick={() => { SoundEngine.playClick(); setActive(i); }} style={{
                background: isActive ? '#0A0A0A' : '#F8F7F2',
                color: isActive ? '#FFF' : '#0A0A0A',
                border: isActive ? `2px solid ${typeObj.color}` : '2px solid #E5E5E5',
                padding: '0.55rem 0.8rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 800,
                display: 'flex',
                justifyContent: 'space-between',
                transition: 'all 0.1s ease',
                boxShadow: isActive ? `3px 3px 0 ${typeObj.color}` : 'none',
              }}>
                <span style={{ color: isActive ? typeObj.color : '#0A0A0A' }}>{typeObj.name}</span>
                <span style={{ opacity: isActive ? 1 : 0.6 }}>{typeObj.val}</span>
              </button>
            );
          })}
        </div>

        <div style={{ background: '#0A0A0A', border: `2px solid ${t.color}`, padding: '1rem', boxShadow: `4px 4px 0 ${t.color}` }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1rem', color: t.color, marginBottom: '0.4rem' }}>{t.name}</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#CCC', lineHeight: 1.4 }}>
            {t.desc}
          </div>
        </div>
      </div>
      <CodePanel concept={concept} activeProperty={active > 3 ? 'COMPOSITES' : 'PRIMITIVES'} />
    </SlideShell>
  );
}

/* ============================================================
   SLIDE 03 — CONTROL STRUCTURES
   ============================================================ */
function ControlStructuresSlide({ concept }) {
  const [step, setStep] = useState(0);
  const STEPS = [
    { codeLine: 8, label: 'ITERATION', note: 'Start for loop. Initialize i = 1' },
    { codeLine: 9, label: 'LOOPS', note: 'i=1: Execute loop body. print(1)' },
    { codeLine: 8, label: 'ITERATION', note: 'Next iteration. i = 2' },
    { codeLine: 9, label: 'LOOPS', note: 'i=2: Execute loop body. print(2)' },
    { codeLine: 8, label: 'ITERATION', note: 'Next iteration. i = 3' },
    { codeLine: 9, label: 'LOOPS', note: 'i=3: Execute loop body. print(3)' },
    { codeLine: 8, label: 'ITERATION', note: 'Next iteration. i = 4. Exceeds range. Exit loop.' },
  ];
  const cur = STEPS[step];

  const advance = () => {
    SoundEngine.playClick();
    setStep(s => (s + 1) % STEPS.length);
  };
  const reset = () => { SoundEngine.playClick(); setStep(0); };

  return (
    <SlideShell concept={concept}>
      <div style={{ background: '#FFFFFF', border: '2.5px solid #0A0A0A', padding: '1.25rem', boxShadow: '4px 4px 0 #0A0A0A' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #0A0A0A', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, color: '#888', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>EXECUTION FLOW</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.1rem' }}>LOOP STEPPER</div>
          </div>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button onClick={advance} style={{ background: concept.color, color: concept.textColor, border: '2px solid #0A0A0A', padding: '0.4rem 0.8rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', boxShadow: '2px 2px 0 #0A0A0A' }}>
              <Play size={13} /> STEP
            </button>
            <button onClick={reset} style={{ background: '#FFF', border: '2px solid #0A0A0A', padding: '0.4rem 0.5rem', cursor: 'pointer', boxShadow: '2px 2px 0 #0A0A0A' }}>
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        <div style={{ background: '#0A0A0A', border: `2px solid ${concept.color}`, padding: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#FFF', lineHeight: 1.5, marginBottom: '1rem' }}>
          <span style={{ color: concept.color, fontWeight: 900 }}>[{cur.label}] </span><br/>{cur.note}
        </div>

        <div style={{ display: 'flex', gap: '0.35rem' }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{ flex: 1, height: '6px', background: i <= step ? concept.color : '#E5E5E5', border: '1px solid #0A0A0A', transition: 'background 0.2s' }} />
          ))}
        </div>
      </div>
      <CodePanel concept={concept} activeProperty={cur.label} />
    </SlideShell>
  );
}

/* ============================================================
   SLIDE 04 — INPUT/OUTPUT
   ============================================================ */
function IOSlide({ concept }) {
  const [logs, setLogs] = useState(['Waiting for input...']);
  const [inputVal, setInputVal] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal) return;
    SoundEngine.playClick();
    const newLogs = [...logs, `> ${inputVal}`];
    
    const parsed = parseInt(inputVal, 10);
    if (isNaN(parsed)) {
      newLogs.push('Error: Not a valid number.');
    } else {
      newLogs.push(`Parsed integer: ${parsed}`);
      newLogs.push(`Output: You will be ${parsed + 1}`);
      SoundEngine.playSuccess();
    }
    
    setLogs(newLogs);
    setInputVal('');
  };

  return (
    <SlideShell concept={concept}>
      <div style={{ background: '#FFFFFF', border: '2.5px solid #0A0A0A', padding: '1.25rem', boxShadow: '4px 4px 0 #0A0A0A' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, color: '#888', letterSpacing: '0.08em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <TerminalIcon size={14} /> TERMINAL SIMULATOR
        </div>

        <div style={{ background: '#0A0A0A', border: '2px solid #0A0A0A', padding: '1rem', height: '150px', overflowY: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#00E599', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
          {logs.map((l, i) => <div key={i} style={{ color: l.startsWith('>') ? '#FFF' : l.startsWith('Error') ? '#FF2A00' : '#00E599' }}>{l}</div>)}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            type="text" 
            value={inputVal} 
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Enter your age..."
            style={{ flex: 1, background: '#F8F7F2', border: '2px solid #0A0A0A', padding: '0.6rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 'bold' }}
          />
          <button type="submit" style={{ background: concept.color, color: '#FFF', border: '2px solid #0A0A0A', padding: '0.6rem 1rem', fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: '0.8rem', cursor: 'pointer', boxShadow: '2px 2px 0 #0A0A0A' }}>
            SEND
          </button>
        </form>
      </div>
      <CodePanel concept={concept} activeProperty={logs.length <= 1 ? 'INPUT' : logs[logs.length-1].includes('Error') ? 'PARSING' : 'OUTPUT'} />
    </SlideShell>
  );
}

/* ============================================================
   SLIDE 05 — FUNCTIONS
   ============================================================ */
function FunctionsSlide({ concept }) {
  const [w, setW] = useState(5);
  const [h, setH] = useState(5);
  const [res, setRes] = useState(null);

  const calculate = () => {
    SoundEngine.playSuccess();
    setRes(w * h);
  };

  return (
    <SlideShell concept={concept}>
      <div style={{ background: '#FFFFFF', border: '2.5px solid #0A0A0A', padding: '1.25rem', boxShadow: '4px 4px 0 #0A0A0A' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, color: '#888', letterSpacing: '0.08em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Box size={14} /> FUNCTION MACHINE
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          {/* Inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 'bold', color: '#555', marginBottom: '0.2rem' }}>ARG 1 (width)</div>
              <input type="number" value={w} onChange={e => {setW(Number(e.target.value)); setRes(null);}} style={{ width: '100%', padding: '0.5rem', border: '2px solid #0A0A0A', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 'bold', color: '#555', marginBottom: '0.2rem' }}>ARG 2 (height)</div>
              <input type="number" value={h} onChange={e => {setH(Number(e.target.value)); setRes(null);}} style={{ width: '100%', padding: '0.5rem', border: '2px solid #0A0A0A', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }} />
            </div>
          </div>

          {/* Machine */}
          <div style={{ background: concept.color, color: '#FFF', border: '3px solid #0A0A0A', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '4px 4px 0 #0A0A0A' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 900 }}>calculate_area()</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 900, margin: '0.5rem 0' }}>{w} × {h}</div>
            <button onClick={calculate} style={{ background: '#0A0A0A', color: '#FFF', border: 'none', padding: '0.4rem 0.8rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer' }}>EXECUTE</button>
          </div>
        </div>

        {/* Output */}
        <div style={{ background: res !== null ? '#00E599' : '#F8F7F2', border: '2px solid #0A0A0A', padding: '1rem', textAlign: 'center', transition: 'all 0.3s ease' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 'bold', color: res !== null ? '#0A0A0A' : '#888', marginBottom: '0.2rem' }}>RETURN VALUE</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, color: res !== null ? '#0A0A0A' : '#CCC' }}>
            {res !== null ? res : '?'}
          </div>
        </div>
      </div>
      <CodePanel concept={concept} activeProperty={res !== null ? 'RETURN VALUE' : 'ARGUMENTS'} />
    </SlideShell>
  );
}

/* ============================================================
   SLIDE ROUTER
   ============================================================ */
const SLIDE_COMPONENTS = {
  'variables':          VariablesSlide,
  'data-types':         DataTypesSlide,
  'control-structures': ControlStructuresSlide,
  'input-output':       IOSlide,
  'functions':          FunctionsSlide,
};

/* ============================================================
   CONCEPT BLOCK — one full self-contained section per concept
   ============================================================ */
function ConceptBlock({ concept }) {
  const SlideComponent = SLIDE_COMPONENTS[concept.id];
  if (!SlideComponent) return null;
  return (
    <div
      id={`concept-${concept.id}`}
      style={{
        borderBottom: '3px solid #0A0A0A',
        paddingBottom: '3.5rem',
        marginBottom: '3.5rem',
      }}
    >
      {/* Colored concept header */}
      <div style={{
        background: concept.color,
        border: '3px solid #0A0A0A',
        padding: '1.25rem 1.5rem',
        marginBottom: '1.75rem',
        boxShadow: '6px 6px 0 #0A0A0A',
        display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 900,
          color: concept.textColor,
          lineHeight: 1,
          opacity: 0.45,
        }}>
          {concept.num}
        </div>
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900,
            color: concept.textColor, opacity: 0.7, letterSpacing: '0.1em', marginBottom: '0.2rem',
          }}>
            {concept.category}
          </div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 900,
            color: concept.textColor,
            margin: 0,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}>
            {concept.term}
          </h3>
        </div>
        <div style={{
          marginLeft: 'auto',
          fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800,
          color: concept.textColor, opacity: 0.7,
          maxWidth: '300px', lineHeight: 1.4,
        }}>
          {concept.formalDef.substring(0, 100)}…
        </div>
      </div>

      {/* Interactive slide content */}
      <SlideComponent concept={concept} />
    </div>
  );
}

/* ============================================================
   MAIN EXPORT: ConceptSlides
   ============================================================ */
export function ConceptSlides() {
  return (
    <section id="concept-slides" style={{ background: '#FFFFFF', padding: 'clamp(2.5rem, 6vw, 5rem) 0', borderBottom: '3.5px solid #0A0A0A' }}>
      <div className="container">

        {/* Section header */}
        <div style={{ marginBottom: '3rem' }}>
          <span style={{
            background: '#0A0A0A', color: '#FFE600',
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900,
            padding: '0.25rem 0.75rem', border: '2px solid #0A0A0A', letterSpacing: '0.08em',
            display: 'inline-block', marginBottom: '0.75rem',
          }}>
            INTERACTIVE REFERENCE // 5 CANONICAL CONCEPTS
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.05,
            color: '#0A0A0A', marginBottom: '0.5rem',
          }}>
            THE 5 FUNDAMENTAL <span style={{ color: '#0038FF' }}>CONCEPTS OF PROGRAMMING</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', color: '#666', fontSize: '0.98rem', maxWidth: '640px', lineHeight: 1.6 }}>
            Each section presents one canonical term: its formal definition, key properties,
            an interactive demonstration that proves the definition, and annotated code.
          </p>
        </div>

        {/* All 5 concepts rendered as stacked divs */}
        {CONCEPTS.map((concept) => (
          <ConceptBlock key={concept.id} concept={concept} />
        ))}

      </div>
    </section>
  );
}
