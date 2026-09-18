import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, FastForward, CheckCircle, Search, HelpCircle, Binary, ArrowDown, ChevronRight } from 'lucide-react';
import { SoundEngine } from '../utils/soundEngine';

const SORTED_PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53];

export function BinarySearchUnit() {
  const [array] = useState(SORTED_PRIMES);
  const [target, setTarget] = useState(31);
  const [minIdx, setMinIdx] = useState(0);
  const [maxIdx, setMaxIdx] = useState(SORTED_PRIMES.length - 1);
  const [midIdx, setMidIdx] = useState(Math.floor((0 + SORTED_PRIMES.length - 1) / 2));
  const [stepCount, setStepCount] = useState(0);
  const [status, setStatus] = useState('IDLE'); // 'IDLE' | 'COMPARING' | 'FOUND' | 'NOT_FOUND'
  const [explanation, setExplanation] = useState('Select a target number and click "Step Search" to execute binary search.');
  const [activeCodeLine, setActiveCodeLine] = useState(1);

  const resetSearch = (newTarget = target) => {
    SoundEngine.playClick();
    setTarget(newTarget);
    setMinIdx(0);
    setMaxIdx(array.length - 1);
    const initialMid = Math.floor((0 + array.length - 1) / 2);
    setMidIdx(initialMid);
    setStepCount(0);
    setStatus('IDLE');
    setExplanation(`Ready to search for target value ${newTarget} in sorted array of ${array.length} elements.`);
    setActiveCodeLine(1);
  };

  const stepBinarySearch = () => {
    if (status === 'FOUND' || status === 'NOT_FOUND') {
      resetSearch();
      return;
    }

    SoundEngine.playPop();
    const currMin = minIdx;
    const currMax = maxIdx;

    if (currMin > currMax) {
      SoundEngine.playThud();
      setStatus('NOT_FOUND');
      setExplanation(`Target ${target} was not found in the array. min (${currMin}) crossed max (${currMax}).`);
      setActiveCodeLine(8);
      return;
    }

    const currMid = Math.floor((currMin + currMax) / 2);
    setMidIdx(currMid);
    const midVal = array[currMid];
    const newSteps = stepCount + 1;
    setStepCount(newSteps);

    if (midVal === target) {
      SoundEngine.playFanfare();
      setStatus('FOUND');
      setExplanation(`SUCCESS! Target ${target} found at index ${currMid} in ${newSteps} comparison(s)!`);
      setActiveCodeLine(5);
    } else if (midVal < target) {
      SoundEngine.playBlip();
      setStatus('COMPARING');
      setExplanation(`array[${currMid}] = ${midVal} is TOO SMALL (< ${target}). Eliminate left half. Set min = ${currMid + 1}.`);
      setMinIdx(currMid + 1);
      setActiveCodeLine(6);
    } else {
      SoundEngine.playBlip();
      setStatus('COMPARING');
      setExplanation(`array[${currMid}] = ${midVal} is TOO LARGE (> ${target}). Eliminate right half. Set max = ${currMid - 1}.`);
      setMaxIdx(currMid - 1);
      setActiveCodeLine(7);
    }
  };

  const autoRun = async () => {
    resetSearch(target);
    let l = 0;
    let r = array.length - 1;
    let steps = 0;

    const interval = setInterval(() => {
      if (l > r) {
        clearInterval(interval);
        setStatus('NOT_FOUND');
        return;
      }
      const m = Math.floor((l + r) / 2);
      setMidIdx(m);
      setMinIdx(l);
      setMaxIdx(r);
      steps++;
      setStepCount(steps);

      if (array[m] === target) {
        SoundEngine.playFanfare();
        setStatus('FOUND');
        setExplanation(`SUCCESS! Found ${target} at index ${m} in ${steps} steps.`);
        clearInterval(interval);
      } else if (array[m] < target) {
        SoundEngine.playBlip();
        setExplanation(`array[${m}] = ${array[m]} < ${target}. Move min to ${m + 1}.`);
        l = m + 1;
      } else {
        SoundEngine.playBlip();
        setExplanation(`array[${m}] = ${array[m]} > ${target}. Move max to ${m - 1}.`);
        r = m - 1;
      }
    }, 700);
  };

  return (
    <section id="binary-search" className="section-padding" style={{
      background: 'var(--bg-primary)',
      borderBottom: 'var(--border-thick)'
    }}>
      <div className="container">

        {/* Section Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="brutal-badge brutal-badge-blue font-mono" style={{ fontSize: '0.8rem' }}>
              UNIT 02 // BINARY SEARCH
            </span>
            <span className="brutal-badge brutal-badge-yellow font-mono" style={{ fontSize: '0.8rem' }}>
              O(LOG N) SEARCH SPACE HALVING
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
            BINARY SEARCH ON SORTED ARRAYS
          </h2>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.1rem',
            color: 'var(--text-muted)',
            maxWidth: '850px',
            lineHeight: 1.6
          }}>
            Binary search is an efficient algorithm for finding an item from a <strong>sorted list</strong>. It works by repeatedly halving the portion of the list that could contain the item, until you've narrowed the possible locations to just one.
          </p>
        </div>

        {/* Interactive Workspace: Array Visualizer + Code & Math Analysis */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}>

          {/* Left Column: Visual Array Chassis & Step Controls */}
          <div className="brutal-card" style={{ background: '#FFF' }}>
            
            {/* Target Selection & Stepper Controls */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.5rem',
              borderBottom: '2px solid #000',
              paddingBottom: '1rem'
            }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 800, marginBottom: '0.25rem' }}>
                  SEARCH TARGET:
                </label>
                <select
                  value={target}
                  onChange={(e) => resetSearch(Number(e.target.value))}
                  style={{
                    padding: '0.4rem 0.8rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    fontSize: '1rem',
                    border: '2px solid #000',
                    boxShadow: '2px 2px 0 #000',
                    outline: 'none',
                    background: 'var(--canary-yellow)'
                  }}
                >
                  {array.map((val) => (
                    <option key={val} value={val}>Target: {val}</option>
                  ))}
                  <option value={99}>Target: 99 (Not In Array)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={stepBinarySearch}
                  className="brutal-btn brutal-btn-red"
                  style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}
                >
                  <ChevronRight size={16} /> STEP SEARCH
                </button>
                <button
                  onClick={autoRun}
                  className="brutal-btn brutal-btn-blue"
                  style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}
                >
                  <Play size={16} /> AUTO PLAY
                </button>
                <button
                  onClick={() => resetSearch()}
                  className="brutal-btn brutal-btn-sm"
                  style={{ background: '#E5E5E5', border: '1.5px solid #000' }}
                  title="Reset Search"
                >
                  <RotateCcw size={15} />
                </button>
              </div>
            </div>

            {/* Visual Pointer Badges (Min, Mid, Max) */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 800
            }}>
              <span style={{ color: 'var(--emerald-mint)', background: '#0A0A0A', padding: '0.2rem 0.5rem', border: '1px solid #000' }}>
                MIN IDX: {minIdx}
              </span>
              <span style={{ color: 'var(--canary-yellow)', background: '#0A0A0A', padding: '0.2rem 0.5rem', border: '1px solid #000' }}>
                MID IDX: {midIdx} (val: {array[midIdx] ?? 'N/A'})
              </span>
              <span style={{ color: 'var(--vermilion-red)', background: '#0A0A0A', padding: '0.2rem 0.5rem', border: '1px solid #000' }}>
                MAX IDX: {maxIdx}
              </span>
              <span style={{ marginLeft: 'auto', background: 'var(--canary-yellow)', padding: '0.2rem 0.5rem', border: '1.5px solid #000' }}>
                STEPS: {stepCount} / max {Math.ceil(Math.log2(array.length))}
              </span>
            </div>

            {/* Visual Array Grid (16 Elements) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              gap: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              {array.map((val, idx) => {
                const isMin = idx === minIdx;
                const isMax = idx === maxIdx;
                const isMid = idx === midIdx;
                const isEliminated = idx < minIdx || idx > maxIdx;
                const isFound = status === 'FOUND' && idx === midIdx;

                let bg = '#FFF';
                if (isFound) bg = 'var(--emerald-mint)';
                else if (isMid) bg = 'var(--canary-yellow)';
                else if (isEliminated) bg = '#E5E5E5';

                return (
                  <div
                    key={idx}
                    onClick={() => resetSearch(val)}
                    style={{
                      border: isFound ? '3px solid #000' : isMid ? '2.5px solid #000' : '1.5px solid #000',
                      background: bg,
                      padding: '0.75rem 0.25rem',
                      textAlign: 'center',
                      position: 'relative',
                      opacity: isEliminated ? 0.35 : 1,
                      transform: isMid ? 'translateY(-2px)' : 'none',
                      boxShadow: isMid ? '3px 3px 0 #000' : '1px 1px 0 #000',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    title={`Index: ${idx} | Value: ${val}`}
                  >
                    {/* Value */}
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: '1.1rem' }}>
                      {val}
                    </div>

                    {/* Index subscript */}
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#666' }}>
                      [{idx}]
                    </div>

                    {/* Pointer Tag */}
                    {isMid && (
                      <div style={{
                        position: 'absolute',
                        bottom: '-18px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: '0.6rem',
                        fontWeight: 900,
                        fontFamily: 'var(--font-mono)',
                        background: '#000',
                        color: 'var(--canary-yellow)',
                        padding: '0 0.25rem'
                      }}>
                        MID
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Explanation Live Banner */}
            <div style={{
              background: status === 'FOUND' ? '#D1FAE5' : 'var(--bg-paper)',
              border: '2px solid #000',
              padding: '1rem',
              boxShadow: '3px 3px 0 #000',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              lineHeight: 1.5,
              fontWeight: 700
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', color: 'var(--cobalt-blue)' }}>
                <Search size={16} /> STEP EXPLANATION:
              </div>
              <div style={{ color: status === 'FOUND' ? '#065F46' : '#111' }}>
                {explanation}
              </div>
            </div>

          </div>

          {/* Right Column: Binary Search Algorithm Code & Runtime Growth Table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Pseudocode Walkthrough */}
            <div className="brutal-card brutal-card-dark">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Binary size={18} color="var(--canary-yellow)" />
                <h4 style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1rem', color: 'var(--canary-yellow)' }}>
                  BINARY SEARCH ALGORITHM (CLRS / CS THEORY)
                </h4>
              </div>

              <pre style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                lineHeight: 1.6,
                background: '#000',
                padding: '0.85rem',
                border: '1px solid #333',
                overflowX: 'auto',
                color: '#CCC'
              }}>
                <div style={{ background: activeCodeLine === 1 ? '#333' : 'transparent', color: activeCodeLine === 1 ? 'var(--canary-yellow)' : '#CCC' }}>
                  1: function binarySearch(array, target):
                </div>
                <div style={{ background: activeCodeLine === 2 ? '#333' : 'transparent' }}>
                  2:   min = 0, max = array.length - 1
                </div>
                <div style={{ background: activeCodeLine === 3 ? '#333' : 'transparent' }}>
                  3:   while min &lt;= max:
                </div>
                <div style={{ background: activeCodeLine === 4 ? '#333' : 'transparent', color: activeCodeLine === 4 ? 'var(--canary-yellow)' : '#CCC' }}>
                  4:     mid = floor((min + max) / 2)
                </div>
                <div style={{ background: activeCodeLine === 5 ? '#333' : 'transparent', color: activeCodeLine === 5 ? 'var(--emerald-mint)' : '#CCC' }}>
                  5:     if array[mid] == target: return mid
                </div>
                <div style={{ background: activeCodeLine === 6 ? '#333' : 'transparent', color: activeCodeLine === 6 ? 'var(--pure-cyan)' : '#CCC' }}>
                  6:     else if array[mid] &lt; target: min = mid + 1
                </div>
                <div style={{ background: activeCodeLine === 7 ? '#333' : 'transparent', color: activeCodeLine === 7 ? 'var(--vermilion-red)' : '#CCC' }}>
                  7:     else: max = mid - 1
                </div>
                <div style={{ background: activeCodeLine === 8 ? '#333' : 'transparent' }}>
                  8:   return -1 // Not found
                </div>
              </pre>
            </div>

            {/* Log2 Growth Table (Why Binary Search is so Fast) */}
            <div className="brutal-card brutal-card-yellow">
              <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                RUNNING TIME OF BINARY SEARCH: Θ(LOG₂ N)
              </h4>
              <p style={{ fontSize: '0.85rem', marginBottom: '0.75rem', color: '#222' }}>
                Each step cuts the remaining list in half. Even for 1 billion items, binary search needs at most <strong>30 guesses</strong>!
              </p>

              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                background: '#FFF',
                border: '1.5px solid #000'
              }}>
                <thead>
                  <tr style={{ background: '#0A0A0A', color: '#FFF' }}>
                    <th style={{ padding: '0.4rem', textAlign: 'left' }}>ARRAY SIZE (N)</th>
                    <th style={{ padding: '0.4rem', textAlign: 'left' }}>MAX GUESSES (⌈LOG₂ N⌉)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { n: '8', steps: '3' },
                    { n: '16', steps: '4' },
                    { n: '32', steps: '5' },
                    { n: '1,024', steps: '10' },
                    { n: '1,000,000 (1M)', steps: '20' },
                    { n: '1,000,000,000 (1B)', steps: '30' },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #DDD', background: i % 2 === 0 ? '#F9F9F9' : '#FFF' }}>
                      <td style={{ padding: '0.35rem 0.5rem', fontWeight: 700 }}>{row.n}</td>
                      <td style={{ padding: '0.35rem 0.5rem', color: 'var(--cobalt-blue)', fontWeight: 800 }}>{row.steps}</td>
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

export default BinarySearchUnit;
