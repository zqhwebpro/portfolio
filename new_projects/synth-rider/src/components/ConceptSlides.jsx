import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Box, CheckCircle2, GitFork, RotateCw, Keyboard, Terminal, Layers, Monitor, Sparkles, Check, ArrowRight } from 'lucide-react';
import { CONCEPTS } from '../utils/csData';
import { SoundEngine } from '../utils/soundEngine';

/* ============================================================
   ICON ROUTER MAP
   ============================================================ */
const ICON_COMPONENTS = {
  Keyboard,
  Box,
  Monitor,
  GitFork,
  RotateCw,
};

/* ============================================================
   SHARED SLIDE SHELL
   ============================================================ */
function SlideShell({ concept, children }) {
  const IconComp = ICON_COMPONENTS[concept.iconName] || Box;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      
      {/* Canonical Definition Banner */}
      <div style={{
        background: '#FAFAFA',
        border: `3px solid #0A0A0A`,
        borderLeft: `14px solid ${concept.color}`,
        padding: '2rem 2.25rem',
        boxShadow: '6px 6px 0 #0A0A0A',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900, color: concept.color === '#FFE600' ? '#000' : concept.color, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <IconComp size={16} /> ◆ CANONICAL CONCEPT #{concept.num}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 800, background: '#0A0A0A', color: concept.color, padding: '0.25rem 0.6rem', border: '1.5px solid #0A0A0A' }}>
            {concept.progression}
          </div>
        </div>

        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)', fontWeight: 900, lineHeight: 1.3, color: '#0A0A0A', margin: 0 }}>
          "{concept.definition}"
        </h4>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#555', marginTop: '0.6rem', margin: '0.6rem 0 0 0', lineHeight: 1.5 }}>
          {concept.formalDef}
        </p>
      </div>

      {/* Language Syntax Tabs / Pills */}
      <div style={{ background: '#0A0A0A', border: '3px solid #0A0A0A', padding: '1.25rem 1.5rem', boxShadow: '5px 5px 0 #0A0A0A', color: '#FFFFFF' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 900, color: '#FFE600', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
          SYNTAX ACROSS LANGUAGES (JAVA, C#, JS, PYTHON)
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '0.85rem' }}>
          {concept.snippets.map((snip, idx) => (
            <div key={idx} style={{ background: '#181818', border: '1.5px solid #333', padding: '0.75rem 1rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 900, color: concept.color, marginBottom: '0.35rem' }}>
                {snip.lang}
              </div>
              <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#F8F8F8', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
                {snip.code}
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* Key Properties Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))', gap: '1.25rem' }}>
        {concept.properties.map((p, i) => (
          <div key={i} style={{
            background: '#FFFFFF',
            border: `2.5px solid #0A0A0A`,
            padding: '1.25rem 1.5rem',
            boxShadow: `4px 4px 0 ${concept.color}`,
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 900, color: concept.color === '#FFE600' ? '#000' : concept.color, letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
              [{p.label}]
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#333', lineHeight: 1.4, fontWeight: 500 }}>
              {p.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive visualizer & Code Panel side-by-side */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: '1.5rem', alignItems: 'start' }}>
        {children}
      </div>

    </div>
  );
}

/* ============================================================
   CODE PANEL — annotated code with line highlight
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
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#AAA', fontWeight: 800 }}>
          {concept.id}.cs / .java
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#888' }}>
          CONCEPT {concept.num}/05
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
                  fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 900,
                  color: concept.color === '#FFE600' ? '#000' : concept.color,
                  background: 'rgba(0,0,0,0.4)', padding: '0 0.35rem',
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
   SLIDE 01 — TAKE INPUT
   ============================================================ */
function TakeInputSlide({ concept }) {
  const [typedText, setTypedText] = useState('100');
  const [isListening, setIsListening] = useState(true);
  const [history, setHistory] = useState([
    { raw: '100', parsed: 100, type: 'int', valid: true },
    { raw: 'Hello World', parsed: 'Hello World', type: 'string', valid: true }
  ]);

  const handleInput = (val) => {
    setTypedText(val);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!typedText.trim()) return;
    SoundEngine.playClick();
    const num = Number(typedText);
    const isValid = !isNaN(num);
    const newEntry = {
      raw: typedText,
      parsed: isValid ? num : typedText,
      type: isValid ? 'int' : 'string',
      valid: true,
    };
    setHistory([newEntry, ...history.slice(0, 4)]);
    setTypedText('');
    SoundEngine.playSuccess();
  };

  return (
    <SlideShell concept={concept}>
      <div style={{ background: '#FFFFFF', border: '3px solid #0A0A0A', padding: '2rem', boxShadow: '6px 6px 0 #0A0A0A' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '2px solid #0A0A0A', paddingBottom: '0.75rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900, color: '#0A0A0A', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Keyboard size={16} /> INPUT STREAM LISTENER
          </div>
          <div style={{
            background: isListening ? '#00E599' : '#FF2A00',
            color: '#000',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            fontWeight: 900,
            padding: '0.2rem 0.6rem',
            border: '1.5px solid #0A0A0A',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem'
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#000', display: 'inline-block' }} className="cursor-blink" />
            {isListening ? 'LISTENING (stdin)' : 'HALTED'}
          </div>
        </div>

        {/* Live Input Field Simulation */}
        <form onSubmit={handleSend} style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 800, color: '#555', display: 'block', marginBottom: '0.4rem' }}>
            TYPE INPUT VALUE (KEYBOARD SIMULATION):
          </label>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <input
                type="text"
                value={typedText}
                onChange={e => handleInput(e.target.value)}
                placeholder="Type integer or text (e.g. 100)..."
                style={{
                  width: '100%',
                  background: '#F8F7F2',
                  border: '2.5px solid #0A0A0A',
                  padding: '0.85rem 1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.95rem',
                  fontWeight: 900,
                  color: '#0A0A0A',
                  boxShadow: '3px 3px 0 #0A0A0A'
                }}
              />
              <span className="cursor-blink" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--font-mono)', fontWeight: 900, color: '#0038FF' }}>|</span>
            </div>
            <button
              type="submit"
              style={{
                background: '#00F0FF',
                color: '#000',
                border: '2.5px solid #0A0A0A',
                padding: '0.85rem 1.4rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '4px 4px 0 #0A0A0A'
              }}
            >
              INGEST
            </button>
          </div>
        </form>

        {/* Stream Buffer Inspection */}
        <div style={{ background: '#0A0A0A', color: '#00F0FF', padding: '1.25rem', border: '2px solid #0A0A0A', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', lineHeight: 1.5 }}>
          <div style={{ fontSize: '0.68rem', color: '#888', fontWeight: 900, marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>BUFFER STREAM HISTORY</span>
            <span>BYTES: {history.length * 8}</span>
          </div>
          {history.map((h, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #222', padding: '0.4rem 0' }}>
              <span style={{ color: '#FFE600' }}>stdin &gt; "{h.raw}"</span>
              <span style={{ color: '#00E599' }}>TYPE: {h.type.toUpperCase()} | VAL: {String(h.parsed)}</span>
            </div>
          ))}
        </div>
      </div>
      <CodePanel concept={concept} activeProperty="LISTEN" />
    </SlideShell>
  );
}

/* ============================================================
   SLIDE 02 — ALLOCATE MEMORY
   ============================================================ */
function AllocateMemorySlide({ concept }) {
  const [stackBoxes, setStackBoxes] = useState([
    { id: 1, label: 'count', type: 'Primitive (int)', value: '42', color: '#00F0FF' },
    { id: 2, label: 'user', type: 'Object (Heap Ref)', value: '{ name: "Sarah", id: 1 }', color: '#00E599' },
  ]);

  const addBox = (kind) => {
    SoundEngine.playClick();
    let newBox;
    if (kind === 'primitive') {
      newBox = { id: Date.now(), label: `val_${stackBoxes.length + 1}`, type: 'Primitive (int)', value: Math.floor(Math.random() * 100), color: '#00F0FF' };
    } else if (kind === 'object') {
      newBox = { id: Date.now(), label: `entity_${stackBoxes.length + 1}`, type: 'Object (Map)', value: `{ x: ${stackBoxes.length * 10}, y: 5 }`, color: '#00E599' };
    } else {
      newBox = { id: Date.now(), label: `treeNode_${stackBoxes.length + 1}`, type: 'Tree/List Node', value: `Node -> [left, right]`, color: '#7928CA' };
    }
    setStackBoxes([newBox, ...stackBoxes]);
    SoundEngine.playSuccess();
  };

  const clearStack = () => {
    SoundEngine.playClick();
    setStackBoxes([]);
  };

  return (
    <SlideShell concept={concept}>
      <div style={{ background: '#FFFFFF', border: '3px solid #0A0A0A', padding: '2rem', boxShadow: '6px 6px 0 #0A0A0A' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '2px solid #0A0A0A', paddingBottom: '0.75rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900, color: '#0A0A0A', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Layers size={16} /> STACK & HEAP MEMORY VISUALIZER
          </div>
          <button onClick={clearStack} style={{ background: '#FFFFFF', border: '2px solid #0A0A0A', padding: '0.2rem 0.6rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, cursor: 'pointer', boxShadow: '2px 2px 0 #0A0A0A' }}>
            CLEAR MEMORY
          </button>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <button onClick={() => addBox('primitive')} style={{ background: '#00F0FF', border: '2px solid #0A0A0A', padding: '0.5rem 0.8rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900, cursor: 'pointer', boxShadow: '3px 3px 0 #0A0A0A' }}>
            + DROP PRIMITIVE (int)
          </button>
          <button onClick={() => addBox('object')} style={{ background: '#00E599', border: '2px solid #0A0A0A', padding: '0.5rem 0.8rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900, cursor: 'pointer', boxShadow: '3px 3px 0 #0A0A0A' }}>
            + DROP OBJECT (Map)
          </button>
          <button onClick={() => addBox('tree')} style={{ background: '#7928CA', color: '#FFF', border: '2px solid #0A0A0A', padding: '0.5rem 0.8rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900, cursor: 'pointer', boxShadow: '3px 3px 0 #0A0A0A' }}>
            + DROP TREE NODE
          </button>
        </div>

        {/* Stacking Memory Boxes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minHeight: '180px', background: '#F8F7F2', padding: '1rem', border: '2px solid #0A0A0A' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#777', fontWeight: 900, textAlign: 'center', marginBottom: '0.25rem' }}>
            ↑ HIGHER MEMORY ADDRESSES (STACK UPWARD)
          </div>

          {stackBoxes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#888' }}>
              Memory is empty. Click buttons above to drop variables into memory!
            </div>
          ) : (
            stackBoxes.map((box) => (
              <div
                key={box.id}
                style={{
                  background: '#FFFFFF',
                  border: '2.5px solid #0A0A0A',
                  borderLeft: `10px solid ${box.color}`,
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: '4px 4px 0 #0A0A0A',
                  animation: 'stackPush 0.35s ease-out'
                }}
              >
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 900, color: '#0A0A0A' }}>
                    {box.label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#666', marginLeft: '0.6rem', fontWeight: 700 }}>
                    [{box.type}]
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 900, background: '#F0F0F0', padding: '0.2rem 0.6rem', border: '1.5px solid #0A0A0A' }}>
                  {box.value}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <CodePanel concept={concept} activeProperty="PRIMITIVES" />
    </SlideShell>
  );
}

/* ============================================================
   SLIDE 03 — GIVE OUTPUT
   ============================================================ */
function GiveOutputSlide({ concept }) {
  const [viewMode, setViewMode] = useState('TABLE'); // CONSOLE, TABLE, DASHBOARD
  const [isRendering, setIsRendering] = useState(false);

  const sampleData = [
    { id: 1, name: 'Alice', role: 'Dev', score: 98 },
    { id: 2, name: 'Bob', role: 'Sec', score: 85 },
    { id: 3, name: 'Charlie', role: 'Ops', score: 92 },
  ];

  const handleModeChange = (mode) => {
    SoundEngine.playClick();
    setIsRendering(true);
    setViewMode(mode);
    setTimeout(() => {
      setIsRendering(false);
      SoundEngine.playSuccess();
    }, 200);
  };

  return (
    <SlideShell concept={concept}>
      <div style={{ background: '#FFFFFF', border: '3px solid #0A0A0A', padding: '2rem', boxShadow: '6px 6px 0 #0A0A0A' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '2px solid #0A0A0A', paddingBottom: '0.75rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900, color: '#0A0A0A', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Monitor size={16} /> RENDER FORMAT SELECTOR
          </div>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            {['CONSOLE', 'TABLE', 'DASHBOARD'].map(m => (
              <button
                key={m}
                onClick={() => handleModeChange(m)}
                style={{
                  background: viewMode === m ? '#0038FF' : '#FFFFFF',
                  color: viewMode === m ? '#FFFFFF' : '#0A0A0A',
                  border: '2px solid #0A0A0A',
                  padding: '0.35rem 0.65rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: viewMode === m ? '2px 2px 0 #0A0A0A' : 'none'
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Display Screen */}
        <div style={{
          background: '#0A0A0A',
          border: '3px solid #0A0A0A',
          padding: '1.25rem',
          minHeight: '220px',
          color: '#FFFFFF',
          position: 'relative',
          opacity: isRendering ? 0.4 : 1,
          transition: 'opacity 0.2s ease'
        }}>
          {viewMode === 'CONSOLE' && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#00E599', lineHeight: 1.6 }}>
              <div>&gt; System.out.println("Processing data...");</div>
              <div>&gt; ID: 1 | Name: Alice | Score: 98</div>
              <div>&gt; ID: 2 | Name: Bob   | Score: 85</div>
              <div>&gt; ID: 3 | Name: Charlie| Score: 92</div>
              <div style={{ color: '#FFE600', marginTop: '0.5rem' }}>✓ Console text stream completed (3 records).</div>
            </div>
          )}

          {viewMode === 'TABLE' && (
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#FFE600', fontWeight: 900, marginBottom: '0.5rem' }}>
                TABULAR GRID FORMAT:
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                <thead>
                  <tr style={{ background: '#0038FF', color: '#FFF' }}>
                    <th style={{ border: '1px solid #FFF', padding: '0.4rem' }}>ID</th>
                    <th style={{ border: '1px solid #FFF', padding: '0.4rem' }}>NAME</th>
                    <th style={{ border: '1px solid #FFF', padding: '0.4rem' }}>ROLE</th>
                    <th style={{ border: '1px solid #FFF', padding: '0.4rem' }}>SCORE</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleData.map((d) => (
                    <tr key={d.id} style={{ background: '#181818', textAlign: 'center' }}>
                      <td style={{ border: '1px solid #333', padding: '0.4rem' }}>{d.id}</td>
                      <td style={{ border: '1px solid #333', padding: '0.4rem', color: '#00F0FF' }}>{d.name}</td>
                      <td style={{ border: '1px solid #333', padding: '0.4rem' }}>{d.role}</td>
                      <td style={{ border: '1px solid #333', padding: '0.4rem', color: '#00E599' }}>{d.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {viewMode === 'DASHBOARD' && (
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#00F0FF', fontWeight: 900, marginBottom: '0.75rem' }}>
                LIVE DASHBOARD WIDGETS:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {sampleData.map(d => (
                  <div key={d.id} style={{ background: '#1A1A1A', border: '2px solid #00F0FF', padding: '0.75rem', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 900, color: '#FFE600' }}>{d.score}%</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#FFF' }}>{d.name} ({d.role})</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <CodePanel concept={concept} activeProperty="FORMATTED TABLES" />
    </SlideShell>
  );
}

/* ============================================================
   SLIDE 04 — MAKE DECISIONS
   ============================================================ */
function MakeDecisionsSlide({ concept }) {
  const [val, setVal] = useState(35);

  const isHot = val > 30;

  return (
    <SlideShell concept={concept}>
      <div style={{ background: '#FFFFFF', border: '3px solid #0A0A0A', padding: '2rem', boxShadow: '6px 6px 0 #0A0A0A' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '2px solid #0A0A0A', paddingBottom: '0.75rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900, color: '#0A0A0A', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <GitFork size={16} /> BRANCHING PATHWAY ENGINE
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 900, color: '#FF2A00' }}>
            PREDICATE: (val &gt; 30)
          </div>
        </div>

        {/* Input slider for predicate */}
        <div style={{ marginBottom: '1.5rem', background: '#F8F7F2', padding: '1rem', border: '2px solid #0A0A0A' }}>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900, display: 'block', marginBottom: '0.4rem' }}>
            VALUE TEST: temp = {val}°C
          </label>
          <input
            type="range"
            min="10"
            max="50"
            value={val}
            onChange={e => { setVal(Number(e.target.value)); SoundEngine.playClick(); }}
            style={{ width: '100%', accentColor: '#FF2A00', cursor: 'pointer' }}
          />
        </div>

        {/* Branching Diagram */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', textAlign: 'center' }}>
          {/* True Branch */}
          <div style={{
            background: isHot ? '#00E599' : '#FFFFFF',
            color: '#0A0A0A',
            border: '3px solid #0A0A0A',
            padding: '1.25rem',
            boxShadow: isHot ? '6px 6px 0 #0A0A0A' : 'none',
            opacity: isHot ? 1 : 0.4,
            transition: 'all 0.2s ease'
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 900, marginBottom: '0.4rem' }}>
              ✓ IF TRUE (temp &gt; 30)
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 900 }}>
              "It's hot outside!"
            </div>
          </div>

          {/* False Branch */}
          <div style={{
            background: !isHot ? '#FF2A00' : '#FFFFFF',
            color: !isHot ? '#FFFFFF' : '#0A0A0A',
            border: '3px solid #0A0A0A',
            padding: '1.25rem',
            boxShadow: !isHot ? '6px 6px 0 #0A0A0A' : 'none',
            opacity: !isHot ? 1 : 0.4,
            transition: 'all 0.2s ease'
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 900, marginBottom: '0.4rem' }}>
              ✗ ELSE (temp ≤ 30)
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 900 }}>
              "Weather is pleasant."
            </div>
          </div>
        </div>
      </div>
      <CodePanel concept={concept} activeProperty="IF / ELSE" />
    </SlideShell>
  );
}

/* ============================================================
   SLIDE 05 — LOOP
   ============================================================ */
function LoopSlide({ concept }) {
  const [counter, setCounter] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setCounter(prev => {
          if (prev >= 100) {
            setIsRunning(false);
            SoundEngine.playSuccess();
            return 100;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(timer);
  }, [isRunning, speed]);

  const toggleLoop = () => {
    SoundEngine.playClick();
    if (counter >= 100) setCounter(1);
    setIsRunning(!isRunning);
  };

  const resetLoop = () => {
    SoundEngine.playClick();
    setIsRunning(false);
    setCounter(1);
  };

  return (
    <SlideShell concept={concept}>
      <div style={{ background: '#FFFFFF', border: '3px solid #0A0A0A', padding: '2rem', boxShadow: '6px 6px 0 #0A0A0A' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '2px solid #0A0A0A', paddingBottom: '0.75rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900, color: '#0A0A0A', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <RotateCw size={16} className={isRunning ? 'animate-spin-fast' : ''} /> CONTINUOUS REPETITION ENGINE
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 900, color: '#FFE600', background: '#0A0A0A', padding: '0.2rem 0.6rem' }}>
            for (i=1; i&lt;=100; i++)
          </div>
        </div>

        {/* Counter Display & Controls */}
        <div style={{ background: '#FFE600', border: '3px solid #0A0A0A', padding: '1.5rem', textAlign: 'center', boxShadow: '5px 5px 0 #0A0A0A', marginBottom: '1.5rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 900, color: '#000', marginBottom: '0.2rem' }}>
            ITERATION COUNTER (1 → 100)
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 900, color: '#0A0A0A', lineHeight: 1 }}>
            {counter} / 100
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={toggleLoop}
            style={{
              flex: 1,
              background: isRunning ? '#FF2A00' : '#00E599',
              color: isRunning ? '#FFF' : '#000',
              border: '2.5px solid #0A0A0A',
              padding: '0.8rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 900,
              cursor: 'pointer',
              boxShadow: '4px 4px 0 #0A0A0A'
            }}
          >
            {isRunning ? 'PAUSE LOOP' : counter >= 100 ? 'RESTART LOOP (1→100)' : 'START LOOP'}
          </button>

          <button
            onClick={resetLoop}
            style={{
              background: '#FFFFFF',
              border: '2.5px solid #0A0A0A',
              padding: '0.8rem 1.2rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 900,
              cursor: 'pointer',
              boxShadow: '4px 4px 0 #0A0A0A'
            }}
          >
            RESET
          </button>
        </div>
      </div>
      <CodePanel concept={concept} activeProperty="FOR LOOP" />
    </SlideShell>
  );
}

/* ============================================================
   SLIDE ROUTER MAP
   ============================================================ */
const SLIDE_COMPONENTS = {
  'take-input':      TakeInputSlide,
  'allocate-memory': AllocateMemorySlide,
  'give-output':     GiveOutputSlide,
  'make-decisions':  MakeDecisionsSlide,
  'loop':            LoopSlide,
};

/* ============================================================
   CONCEPT BLOCK — full self-contained block per concept
   ============================================================ */
function ConceptBlock({ concept }) {
  const SlideComponent = SLIDE_COMPONENTS[concept.id];
  if (!SlideComponent) return null;

  return (
    <div
      id={`concept-${concept.id}`}
      style={{
        borderBottom: '4px solid #0A0A0A',
        paddingBottom: '4rem',
        marginBottom: '4rem',
      }}
    >
      {/* Header Banner */}
      <div style={{
        background: concept.color,
        border: '3.5px solid #0A0A0A',
        padding: '1.5rem 1.75rem',
        marginBottom: '2rem',
        boxShadow: '6px 6px 0 #0A0A0A',
        display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
          fontWeight: 900,
          color: concept.textColor,
          lineHeight: 1,
          opacity: 0.35,
        }}>
          {concept.num}
        </div>
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 900,
            color: concept.textColor, opacity: 0.8, letterSpacing: '0.1em', marginBottom: '0.2rem',
          }}>
            {concept.category}
          </div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
            fontWeight: 900,
            color: concept.textColor,
            margin: 0,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}>
            {concept.term}
          </h3>
        </div>
      </div>

      <SlideComponent concept={concept} />
    </div>
  );
}

/* ============================================================
   MAIN EXPORT: ConceptSlides
   ============================================================ */
export function ConceptSlides() {
  return (
    <section id="concept-slides" style={{ background: '#FFFFFF', padding: 'clamp(3rem, 6vw, 5.5rem) 0', borderBottom: '4px solid #0A0A0A' }}>
      <div className="container">

        <div style={{ marginBottom: '3.5rem' }}>
          <span style={{
            background: '#0A0A0A', color: '#FFE600',
            fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 900,
            padding: '0.35rem 0.85rem', border: '2.5px solid #0A0A0A', letterSpacing: '0.08em',
            display: 'inline-block', marginBottom: '0.85rem',
          }}>
            THE 5 CORE CONCEPTS // DETAILED INTERACTIVE DEMOS
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
            fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.05,
            color: '#0A0A0A', marginBottom: '0.5rem',
          }}>
            EVERY LANGUAGE. <span style={{ color: '#0038FF' }}>EVERY PROGRAMMER.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', color: '#555', fontSize: '1.05rem', maxWidth: '700px', lineHeight: 1.6, fontWeight: 500 }}>
            Master these 5 core concepts once — and you will understand the architecture of every programming language you ever write.
          </p>
        </div>

        {CONCEPTS.map((concept) => (
          <ConceptBlock key={concept.id} concept={concept} />
        ))}

      </div>
    </section>
  );
}
