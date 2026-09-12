import React, { useState, useMemo, useRef } from 'react';
import { Activity, Gauge, Cpu, Sliders, ChevronRight, Zap, Info } from 'lucide-react';
import { BIG_O_CURVES } from '../utils/csData';
import { SoundEngine } from '../utils/soundEngine';

export function BigOGraph() {
  const [nVal, setNVal] = useState(25);
  const [selectedCurveId, setSelectedCurveId] = useState('on');
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const selectedCurve = useMemo(() => {
    return BIG_O_CURVES.find(c => c.id === selectedCurveId) || BIG_O_CURVES[2];
  }, [selectedCurveId]);

  const handleSliderChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setNVal(val);
    SoundEngine.playSliderBlip(val / 100);
  };

  // SVG Coordinates setup
  const width = 640;
  const height = 360;
  const padding = { top: 30, right: 30, bottom: 45, left: 60 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  // Max Domain calculations
  const maxN = 50;
  const maxY = 2500; // quadratic max scale

  const xScale = (n) => padding.left + (n / maxN) * innerWidth;
  const yScale = (y) => padding.top + innerHeight - (Math.min(y, maxY) / maxY) * innerHeight;

  // Generate SVG Path definitions
  const generatePath = (curve) => {
    let d = '';
    const pointsCount = 60;
    for (let i = 1; i <= pointsCount; i++) {
      const currentN = (i / pointsCount) * maxN;
      let yVal = curve.fn(currentN);
      if (curve.id === 'o2n' && currentN > 12) {
        yVal = maxY * 1.5; // clamp exponential ceiling
      }
      const x = xScale(currentN);
      const y = yScale(yVal);
      if (i === 1) {
        d += `M ${x} ${y}`;
      } else {
        d += ` L ${x} ${y}`;
      }
    }
    return d;
  };

  // Calculate current point for scrubbed N value
  const getPointForN = (curve, n) => {
    const yVal = curve.fn(n);
    const x = xScale(Math.min(n, maxN));
    const y = yScale(Math.min(yVal, maxY));
    return { x, y, yVal, clamped: yVal > maxY };
  };

  return (
    <section id="big-o" className="section-wrapper" style={{ background: '#FFFFFF' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Activity size={14} /> CONCEPT 01 // COMPUTATIONAL COMPLEXITY
          </div>
          <h2 className="section-title">
            BIG-O <span style={{ color: 'var(--cobalt-blue)' }}>ASYMPTOTIC</span> COMPLEXITY GRAPH
          </h2>
          <p className="section-subtitle">
            How does execution time scale as input volume $N$ explodes? Scrub the input slider to witness the mathematical divide between constant speed and combinatorial explosion.
          </p>
        </div>

        {/* Main Grid: Interactive Graph & Control Arena */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 540px), 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          alignItems: 'start'
        }}>
          {/* Left Column: Interactive Vector Graph */}
          <div className="brutal-card" style={{
            background: 'var(--bg-card)',
            border: 'var(--border-thick)',
            boxShadow: 'var(--shadow-lg)',
            padding: '1.25rem'
          }}>
            {/* Graph Control Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: 'var(--border-solid)',
              paddingBottom: '0.75rem',
              marginBottom: '1rem',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              <span className="font-mono" style={{ fontWeight: 800, fontSize: '0.85rem' }}>
                // LIVE TIME-SPACE CURVES [N = {nVal}]
              </span>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {['all', 'efficient', 'expensive'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      SoundEngine.playClick();
                    }}
                    className="brutal-btn brutal-btn-sm"
                    style={{
                      background: activeTab === tab ? 'var(--canary-yellow)' : 'transparent',
                      padding: '0.2rem 0.5rem',
                      fontSize: '0.7rem'
                    }}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* SVG Interactive Coordinate Space */}
            <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
              <svg
                viewBox={`0 0 ${width} ${height}`}
                style={{ width: '100%', height: 'auto', display: 'block', background: 'var(--bg-paper)', border: 'var(--border-solid)' }}
              >
                {/* Background Grid Lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
                  const y = padding.top + pct * innerHeight;
                  const x = padding.left + pct * innerWidth;
                  return (
                    <g key={i}>
                      {/* Horizontal Grid */}
                      <line
                        x1={padding.left}
                        y1={y}
                        x2={width - padding.right}
                        y2={y}
                        stroke="#0a0a0a"
                        strokeOpacity="0.08"
                        strokeDasharray="4 4"
                      />
                      {/* Vertical Grid */}
                      <line
                        x1={x}
                        y1={padding.top}
                        x2={x}
                        y2={height - padding.bottom}
                        stroke="#0a0a0a"
                        strokeOpacity="0.08"
                        strokeDasharray="4 4"
                      />
                    </g>
                  );
                })}

                {/* Axes */}
                <line
                  x1={padding.left}
                  y1={height - padding.bottom}
                  x2={width - padding.right}
                  y2={height - padding.bottom}
                  stroke="#0a0a0a"
                  strokeWidth="2.5"
                />
                <line
                  x1={padding.left}
                  y1={padding.top}
                  x2={padding.left}
                  y2={height - padding.bottom}
                  stroke="#0a0a0a"
                  strokeWidth="2.5"
                />

                {/* Axis Labels */}
                <text
                  x={width - padding.right}
                  y={height - padding.bottom + 26}
                  fill="#0a0a0a"
                  fontSize="11"
                  fontFamily="var(--font-mono)"
                  fontWeight="800"
                  textAnchor="end"
                >
                  INPUT SCALE (N) →
                </text>
                <text
                  x={padding.left - 10}
                  y={padding.top - 10}
                  fill="#0a0a0a"
                  fontSize="11"
                  fontFamily="var(--font-mono)"
                  fontWeight="800"
                  textAnchor="start"
                >
                  ↑ TIME / OPERATIONS
                </text>

                {/* Plot Curves */}
                {BIG_O_CURVES.map((curve) => {
                  if (activeTab === 'efficient' && (curve.id === 'on2' || curve.id === 'o2n')) return null;
                  if (activeTab === 'expensive' && (curve.id === 'o1' || curve.id === 'ologn')) return null;

                  const isSelected = curve.id === selectedCurveId;
                  const pathD = generatePath(curve);
                  const pt = getPointForN(curve, nVal);

                  return (
                    <g key={curve.id}>
                      {/* Glow outline on selection */}
                      {isSelected && (
                        <path
                          d={pathD}
                          fill="none"
                          stroke={curve.color}
                          strokeWidth="8"
                          strokeOpacity="0.25"
                        />
                      )}
                      <path
                        d={pathD}
                        fill="none"
                        stroke={curve.color}
                        strokeWidth={isSelected ? '4' : '2'}
                        style={{
                          cursor: 'pointer',
                          transition: 'stroke-width 0.15s ease'
                        }}
                        onClick={() => {
                          setSelectedCurveId(curve.id);
                          SoundEngine.playClick();
                        }}
                      />

                      {/* Scrubber Intersection Pulse Node */}
                      {!pt.clamped && (
                        <g transform={`translate(${pt.x}, ${pt.y})`}>
                          <circle
                            r={isSelected ? 7 : 4}
                            fill={curve.color}
                            stroke="#0a0a0a"
                            strokeWidth="2"
                            style={{
                              transition: 'r 0.15s ease'
                            }}
                          />
                          {isSelected && (
                            <circle
                              r="12"
                              fill="none"
                              stroke={curve.color}
                              strokeWidth="1.5"
                              strokeDasharray="2 2"
                              className="animate-spin-slow"
                            />
                          )}
                        </g>
                      )}
                    </g>
                  );
                })}

                {/* Vertical Scrubber Line */}
                <line
                  x1={xScale(Math.min(nVal, maxN))}
                  y1={padding.top}
                  x2={xScale(Math.min(nVal, maxN))}
                  y2={height - padding.bottom}
                  stroke="var(--vermilion-red)"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />

                {/* Scrubber Badge */}
                <g transform={`translate(${xScale(Math.min(nVal, maxN))}, ${height - padding.bottom + 4})`}>
                  <rect
                    x="-18"
                    y="0"
                    width="36"
                    height="18"
                    fill="var(--vermilion-red)"
                    stroke="#000"
                    strokeWidth="1.5"
                  />
                  <text
                    x="0"
                    y="13"
                    fill="#FFF"
                    fontSize="9"
                    fontFamily="var(--font-mono)"
                    fontWeight="800"
                    textAnchor="middle"
                  >
                    N={nVal}
                  </text>
                </g>
              </svg>
            </div>

            {/* Interactive Slider Input */}
            <div style={{ marginTop: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label className="font-mono" style={{ fontWeight: 800, fontSize: '0.85rem' }}>
                  SCRUB INPUT SIZE (N = {nVal}):
                </label>
                <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  MIN: 1 | MAX: 50
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={nVal}
                onChange={handleSliderChange}
                style={{
                  width: '100%',
                  height: '14px',
                  accentColor: 'var(--cobalt-blue)',
                  cursor: 'pointer'
                }}
              />
            </div>
          </div>

          {/* Right Column: Mathematical Analysis & Metric Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Active Curve Selector Badges */}
            <div className="brutal-card" style={{ padding: '1rem', background: '#0A0A0A', color: '#FFF' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#888', marginBottom: '0.5rem' }}>
                SELECT COMPLEXITY CLASS:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {BIG_O_CURVES.map((curve) => {
                  const isSelected = curve.id === selectedCurveId;
                  return (
                    <button
                      key={curve.id}
                      onClick={() => {
                        setSelectedCurveId(curve.id);
                        SoundEngine.playClick();
                      }}
                      className="brutal-btn brutal-btn-sm"
                      style={{
                        background: isSelected ? curve.color : '#222',
                        color: isSelected ? '#000' : '#FFF',
                        borderColor: isSelected ? '#FFF' : '#444',
                        boxShadow: isSelected ? `2px 2px 0px ${curve.color}` : 'none'
                      }}
                    >
                      {curve.name.split(' - ')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Comprehensive Detail Card */}
            <div className="brutal-card" style={{
              background: 'var(--bg-card)',
              border: `3px solid ${selectedCurve.color}`,
              boxShadow: 'var(--shadow-md)'
            }}>
              {/* Header with Tier Stamp */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <span className={`brutal-pill ${selectedCurve.badgeClass}`} style={{ marginBottom: '0.35rem' }}>
                    TIER: {selectedCurve.tier}
                  </span>
                  <h3 style={{ fontSize: '1.6rem', lineHeight: 1.1 }}>
                    {selectedCurve.name}
                  </h3>
                  <div className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--cobalt-blue)', fontWeight: 700, marginTop: '0.2rem' }}>
                    Formula: {selectedCurve.formula}
                  </div>
                </div>

                {/* Operations Badge */}
                <div style={{
                  background: '#0A0A0A',
                  color: selectedCurve.color,
                  padding: '0.5rem 0.75rem',
                  fontFamily: 'var(--font-mono)',
                  textAlign: 'right',
                  border: '1.5px solid #0A0A0A'
                }}>
                  <div style={{ fontSize: '0.65rem', color: '#888' }}>COMPUTED OPS</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900 }}>
                    {Math.round(selectedCurve.fn(nVal)).toLocaleString()}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.95rem', color: '#333', marginBottom: '1.25rem' }}>
                {selectedCurve.desc}
              </p>

              {/* Hardware Execution Metric */}
              <div style={{
                background: 'var(--bg-paper)',
                border: 'var(--border-solid)',
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.25rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Cpu size={16} color="var(--cobalt-blue)" />
                  <span className="font-mono" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                    ESTIMATED HARDWARE RUNTIME:
                  </span>
                </div>
                <span className="font-mono" style={{
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  color: selectedCurve.id === 'o2n' && nVal > 25 ? 'var(--vermilion-red)' : 'var(--cobalt-blue)'
                }}>
                  {selectedCurve.hardwareTime(nVal)}
                </span>
              </div>

              {/* Canonical Real-World Examples */}
              <div>
                <div className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 800, marginBottom: '0.5rem', color: '#555' }}>
                  CANONICAL ALGORITHMIC EXAMPLES:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {selectedCurve.examples.map((ex, idx) => (
                    <span key={idx} className="brutal-pill" style={{ background: '#FFF' }}>
                      <ChevronRight size={12} /> {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
