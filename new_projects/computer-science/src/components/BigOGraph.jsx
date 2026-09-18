import React, { useState, useMemo } from 'react';
import { Activity, Sliders, ChevronRight, Zap, Info, Layers, BarChart2 } from 'lucide-react';
import { SoundEngine } from '../utils/soundEngine';

const ASYMPTOTIC_CLASSES = [
  {
    id: 'o1',
    name: 'Constant',
    notation: 'Θ(1)',
    color: '#00E599',
    fn: (n) => 1,
    desc: 'Execution time remains identical regardless of input size. Example: Array lookup by index.',
    realWorldExample: 'Accessing array[0], checking if a number is even/odd'
  },
  {
    id: 'ologn',
    name: 'Logarithmic',
    notation: 'Θ(log n)',
    color: '#0038FF',
    fn: (n) => Math.max(1, Math.log2(n || 1)),
    desc: 'Search space is halved on each step. Sub-linear growth. Example: Binary Search.',
    realWorldExample: 'Binary search on a sorted array of size n'
  },
  {
    id: 'on',
    name: 'Linear',
    notation: 'Θ(n)',
    color: '#FFE600',
    fn: (n) => n,
    desc: 'Operations increase in direct 1-to-1 proportion to input count. Example: Linear Search.',
    realWorldExample: 'Finding the minimum element in an unsorted list'
  },
  {
    id: 'onlogn',
    name: 'Linearithmic',
    notation: 'Θ(n log n)',
    color: '#00F0FF',
    fn: (n) => n * Math.max(1, Math.log2(n || 1)),
    desc: 'Optimal comparison sorting bound (Divide & Conquer). Example: Merge Sort, Quick Sort (avg).',
    realWorldExample: 'Merge sort, quicksort average case'
  },
  {
    id: 'on2',
    name: 'Quadratic',
    notation: 'Θ(n²)',
    color: '#FF2A00',
    fn: (n) => Math.pow(n, 2),
    desc: 'Nested loop comparisons. Growth explodes quickly. Example: Selection Sort, Insertion Sort.',
    realWorldExample: 'Selection sort, insertion sort worst case'
  },
  {
    id: 'o2n',
    name: 'Exponential',
    notation: 'Θ(2ⁿ)',
    color: '#7928CA',
    fn: (n) => Math.pow(2, Math.min(n, 20)),
    desc: 'Doubles with every single additional item. Intractable for large n. Example: Recursive Fibonacci, Hanoi.',
    realWorldExample: 'Towers of Hanoi minimum moves (2ⁿ - 1)'
  }
];

export function BigOGraph() {
  const [nVal, setNVal] = useState(20);
  const [selectedNotation, setSelectedNotation] = useState('theta'); // 'theta' | 'big_o' | 'omega'
  const [selectedClassId, setSelectedClassId] = useState('on');

  const selectedClass = useMemo(() => {
    return ASYMPTOTIC_CLASSES.find(c => c.id === selectedClassId) || ASYMPTOTIC_CLASSES[2];
  }, [selectedClassId]);

  const handleSliderChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setNVal(val);
    SoundEngine.playSliderBlip(val / 100);
  };

  // SVG Coordinates setup
  const width = 640;
  const height = 340;
  const padding = { top: 30, right: 30, bottom: 40, left: 60 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const maxN = 50;
  const maxY = 2500;

  const xScale = (n) => padding.left + (n / maxN) * innerWidth;
  const yScale = (y) => padding.top + innerHeight - (Math.min(y, maxY) / maxY) * innerHeight;

  const generatePath = (curve) => {
    let d = '';
    const pointsCount = 50;
    for (let i = 1; i <= pointsCount; i++) {
      const currentN = (i / pointsCount) * maxN;
      let yVal = curve.fn(currentN);
      if (curve.id === 'o2n' && currentN > 12) yVal = maxY * 1.5;
      const x = xScale(currentN);
      const y = yScale(yVal);
      if (i === 1) d += `M ${x} ${y}`;
      else d += ` L ${x} ${y}`;
    }
    return d;
  };

  return (
    <section id="big-o" className="section-padding" style={{
      background: 'var(--bg-paper)',
      borderBottom: 'var(--border-thick)'
    }}>
      <div className="container">

        {/* Section Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="brutal-badge brutal-badge-yellow font-mono" style={{ fontSize: '0.8rem' }}>
              UNIT 03 // ASYMPTOTIC NOTATION
            </span>
            <span className="brutal-badge brutal-badge-blue font-mono" style={{ fontSize: '0.8rem' }}>
              ASYMPTOTIC ANALYSIS: Θ, O, Ω
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
            ASYMPTOTIC ANALYSIS &amp; BIG-O NOTATION
          </h2>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.1rem',
            color: 'var(--text-muted)',
            maxWidth: '850px',
            lineHeight: 1.6
          }}>
            Asymptotic analysis measures how the runtime of an algorithm grows as the input size $n$ increases toward infinity. We discard machine-specific constants to focus purely on the <strong>rate of growth</strong>.
          </p>
        </div>

        {/* The 3 Core Notations Tabs (Asymptotic Definition Cards) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          {/* Big-Theta */}
          <div
            onClick={() => { SoundEngine.playClick(); setSelectedNotation('theta'); }}
            className="brutal-card"
            style={{
              background: selectedNotation === 'theta' ? 'var(--canary-yellow)' : '#FFF',
              border: selectedNotation === 'theta' ? '3px solid #000' : '1.5px solid #000',
              boxShadow: selectedNotation === 'theta' ? '5px 5px 0 #000' : '2px 2px 0 #000',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="font-mono font-bold text-lg" style={{ color: 'var(--cobalt-blue)' }}>Big-Θ (Big-Theta)</span>
              <span className="brutal-badge brutal-badge-sm">TIGHT BOUND</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              c₁ · g(n) ≤ f(n) ≤ c₂ · g(n)
            </div>
            <p style={{ fontSize: '0.85rem', color: '#222', lineHeight: 1.4 }}>
              Sandwiches runtime from above and below for all large $n$. Provides both the upper and lower limit.
            </p>
          </div>

          {/* Big-O */}
          <div
            onClick={() => { SoundEngine.playClick(); setSelectedNotation('big_o'); }}
            className="brutal-card"
            style={{
              background: selectedNotation === 'big_o' ? 'var(--canary-yellow)' : '#FFF',
              border: selectedNotation === 'big_o' ? '3px solid #000' : '1.5px solid #000',
              boxShadow: selectedNotation === 'big_o' ? '5px 5px 0 #000' : '2px 2px 0 #000',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="font-mono font-bold text-lg" style={{ color: 'var(--vermilion-red)' }}>Big-O (Big-O)</span>
              <span className="brutal-badge brutal-badge-sm">UPPER BOUND</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              f(n) ≤ c · g(n)
            </div>
            <p style={{ fontSize: '0.85rem', color: '#222', lineHeight: 1.4 }}>
              Asymptotic ceiling (worst-case guarantee). The algorithm takes <em>at most</em> this much time for large $n$.
            </p>
          </div>

          {/* Big-Omega */}
          <div
            onClick={() => { SoundEngine.playClick(); setSelectedNotation('omega'); }}
            className="brutal-card"
            style={{
              background: selectedNotation === 'omega' ? 'var(--canary-yellow)' : '#FFF',
              border: selectedNotation === 'omega' ? '3px solid #000' : '1.5px solid #000',
              boxShadow: selectedNotation === 'omega' ? '5px 5px 0 #000' : '2px 2px 0 #000',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="font-mono font-bold text-lg" style={{ color: 'var(--emerald-mint)' }}>Big-Ω (Big-Omega)</span>
              <span className="brutal-badge brutal-badge-sm">LOWER BOUND</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              f(n) ≥ c · g(n)
            </div>
            <p style={{ fontSize: '0.85rem', color: '#222', lineHeight: 1.4 }}>
              Asymptotic floor (best-case limit). The algorithm takes <em>at least</em> this much time for large $n$.
            </p>
          </div>
        </div>

        {/* Main Grid: Interactive Vector Graph & Input Size Scrubbing */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}>

          {/* Vector Growth Curve Graph */}
          <div className="brutal-card" style={{ background: '#FFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <span className="brutal-badge brutal-badge-blue font-mono" style={{ fontSize: '0.75rem' }}>
                  RATE OF GROWTH PLOTTER
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.25rem', marginTop: '0.25rem' }}>
                  FUNCTION GROWTH COMPARATOR
                </h3>
              </div>

              {/* N Slider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-paper)', padding: '0.35rem 0.75rem', border: '1.5px solid #000' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.85rem' }}>INPUT SIZE N:</span>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={nVal}
                  onChange={handleSliderChange}
                  style={{ width: '120px', cursor: 'pointer' }}
                />
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 900, color: 'var(--cobalt-blue)', width: '28px' }}>
                  {nVal}
                </span>
              </div>
            </div>

            {/* SVG Graph View */}
            <div style={{ background: '#0A0A0A', border: '2px solid #000', borderRadius: '2px', overflow: 'hidden', position: 'relative' }}>
              <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
                
                {/* Graph Gridlines */}
                {[0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                  const y = padding.top + innerHeight * (1 - ratio);
                  const x = padding.left + innerWidth * ratio;
                  return (
                    <g key={idx}>
                      <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#222" strokeDasharray="3 3" />
                      <line x1={x} y1={padding.top} x2={x} y2={height - padding.bottom} stroke="#222" strokeDasharray="3 3" />
                    </g>
                  );
                })}

                {/* Axes */}
                <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} stroke="#FFF" strokeWidth="2" />
                <line x1={padding.left} y1={padding.top} x2={padding.left} y2={height - padding.bottom} stroke="#FFF" strokeWidth="2" />

                {/* Axis Labels */}
                <text x={width - padding.right} y={height - padding.bottom + 25} fill="#AAA" fontSize="11" fontFamily="monospace" textAnchor="end">
                  INPUT SIZE (N) →
                </text>
                <text x={padding.left - 10} y={padding.top - 10} fill="#AAA" fontSize="11" fontFamily="monospace" textAnchor="start">
                  OPERATIONS / RUNTIME (T) ↑
                </text>

                {/* Asymptotic Curves */}
                {ASYMPTOTIC_CLASSES.map((c) => {
                  const isSelected = c.id === selectedClassId;
                  return (
                    <g key={c.id}>
                      <path
                        d={generatePath(c)}
                        fill="none"
                        stroke={c.color}
                        strokeWidth={isSelected ? 4 : 2}
                        opacity={isSelected ? 1 : 0.65}
                      />
                    </g>
                  );
                })}

                {/* Scrubbed N Vertical Line */}
                <line
                  x1={xScale(nVal)}
                  y1={padding.top}
                  x2={xScale(nVal)}
                  y2={height - padding.bottom}
                  stroke="var(--canary-yellow)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Point on Selected Curve */}
                {(() => {
                  const yVal = selectedClass.fn(nVal);
                  const ptX = xScale(nVal);
                  const ptY = yScale(Math.min(yVal, maxY));
                  return (
                    <circle
                      cx={ptX}
                      cy={ptY}
                      r="6"
                      fill="var(--canary-yellow)"
                      stroke="#000"
                      strokeWidth="2"
                    />
                  );
                })()}
              </svg>
            </div>

            {/* Quick Complexity Badges */}
            <div style={{ display: 'flex', gap: '0.4rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              {ASYMPTOTIC_CLASSES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { SoundEngine.playClick(); setSelectedClassId(c.id); }}
                  className="brutal-btn brutal-btn-sm"
                  style={{
                    background: selectedClassId === c.id ? c.color : '#FFF',
                    color: '#000',
                    border: '1.5px solid #000',
                    fontWeight: selectedClassId === c.id ? 900 : 700,
                    fontSize: '0.75rem'
                  }}
                >
                  {c.notation}
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Mathematical Growth Comparison Table at Current N */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            <div className="brutal-card brutal-card-yellow">
              <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                ACTIVE COMPLEXITY: {selectedClass.notation} ({selectedClass.name})
              </h4>
              <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: '#111', lineHeight: 1.5 }}>
                {selectedClass.desc}
              </p>
              <div style={{ background: '#FFF', padding: '0.65rem', border: '1.5px solid #000', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                <strong>REAL-WORLD EXAMPLE:</strong> {selectedClass.realWorldExample}
              </div>
            </div>

            {/* Operations at Current N Breakdown */}
            <div className="brutal-card" style={{ background: '#FFF' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                COMPUTED OPERATIONS AT N = {nVal}:
              </div>

              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                border: '1.5px solid #000'
              }}>
                <thead>
                  <tr style={{ background: '#0A0A0A', color: '#FFF' }}>
                    <th style={{ padding: '0.4rem', textAlign: 'left' }}>CLASS</th>
                    <th style={{ padding: '0.4rem', textAlign: 'left' }}>NOTATION</th>
                    <th style={{ padding: '0.4rem', textAlign: 'right' }}>OPERATIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {ASYMPTOTIC_CLASSES.map((c, i) => {
                    const ops = Math.round(c.fn(nVal));
                    const isSelected = c.id === selectedClassId;
                    return (
                      <tr
                        key={c.id}
                        onClick={() => { SoundEngine.playClick(); setSelectedClassId(c.id); }}
                        style={{
                          borderBottom: '1px solid #DDD',
                          background: isSelected ? 'var(--canary-yellow)' : i % 2 === 0 ? '#F9F9F9' : '#FFF',
                          cursor: 'pointer',
                          fontWeight: isSelected ? 800 : 500
                        }}
                      >
                        <td style={{ padding: '0.4rem 0.5rem' }}>{c.name}</td>
                        <td style={{ padding: '0.4rem 0.5rem', fontWeight: 800 }}>{c.notation}</td>
                        <td style={{ padding: '0.4rem 0.5rem', textAlign: 'right', fontWeight: 800 }}>
                          {ops > 1000000 ? '> 1,000,000' : ops.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default BigOGraph;
