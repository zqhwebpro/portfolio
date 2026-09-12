import React, { useState } from 'react';
import { Binary, Cpu, Zap, ArrowRight, ToggleLeft, ToggleRight, Sparkles } from 'lucide-react';
import { SoundEngine } from '../utils/soundEngine';

export function BitwiseLogicGates() {
  // 8-bit registers (represented as arrays of 8 booleans)
  const [regA, setRegA] = useState([0, 0, 1, 0, 1, 1, 0, 1]); // 45
  const [regB, setRegB] = useState([0, 1, 0, 1, 0, 0, 1, 1]); // 83
  const [activeOp, setActiveOp] = useState('AND'); // AND, OR, XOR, NOT, SHL, SHR

  // Flip bit in register A
  const toggleBitA = (idx) => {
    SoundEngine.playClick();
    setRegA(prev => {
      const next = [...prev];
      next[idx] = next[idx] ? 0 : 1;
      return next;
    });
  };

  // Flip bit in register B
  const toggleBitB = (idx) => {
    SoundEngine.playClick();
    setRegB(prev => {
      const next = [...prev];
      next[idx] = next[idx] ? 0 : 1;
      return next;
    });
  };

  // Calculate bitwise result based on activeOp
  const computeResult = () => {
    const res = [];
    for (let i = 0; i < 8; i++) {
      const a = regA[i];
      const b = regB[i];
      if (activeOp === 'AND') res.push(a & b);
      else if (activeOp === 'OR') res.push(a | b);
      else if (activeOp === 'XOR') res.push(a ^ b);
      else if (activeOp === 'NOT') res.push(a ? 0 : 1);
      else if (activeOp === 'SHL') res.push(i < 7 ? regA[i + 1] : 0); // Shift left (most significant bit on left)
      else if (activeOp === 'SHR') res.push(i > 0 ? regA[i - 1] : 0); // Shift right
    }
    return res;
  };

  const resultBits = computeResult();

  // Convert bit array to decimal number
  const toDecimal = (bits) => {
    return bits.reduce((acc, bit, idx) => acc + (bit ? Math.pow(2, 7 - idx) : 0), 0);
  };

  const decA = toDecimal(regA);
  const decB = toDecimal(regB);
  const decRes = toDecimal(resultBits);

  const hexA = '0x' + decA.toString(16).toUpperCase().padStart(2, '0');
  const hexB = '0x' + decB.toString(16).toUpperCase().padStart(2, '0');
  const hexRes = '0x' + decRes.toString(16).toUpperCase().padStart(2, '0');

  return (
    <section id="bitwise" className="section-wrapper" style={{ background: '#FFFFFF' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Binary size={14} /> CONCEPT 06 // SILICON HARDWARE LOGIC
          </div>
          <h2 className="section-title">
            BITWISE LOGIC & <span style={{ color: 'var(--cobalt-blue)' }}>ALU ARITHMETIC</span>
          </h2>
          <p className="section-subtitle">
            At the silicon physical layer, every complex algorithm reduces to discrete boolean gates operating on raw voltages. Toggle individual bits below to observe instant single-cycle ALU transformations.
          </p>
        </div>

        {/* Main Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 540px), 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          alignItems: 'start'
        }}>
          {/* Left Column: 8-Bit Interactive Registers */}
          <div className="brutal-card" style={{
            background: 'var(--bg-card)',
            border: 'var(--border-thick)',
            boxShadow: 'var(--shadow-lg)',
            padding: '1.5rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: 'var(--border-solid)',
              paddingBottom: '0.75rem',
              marginBottom: '1.25rem'
            }}>
              <span className="font-mono" style={{ fontWeight: 800, fontSize: '0.85rem' }}>
                // 8-BIT HARDWARE REGISTERS [CLICK BITS TO TOGGLE]
              </span>
              <span className="brutal-pill pill-blue">
                SINGLE-CYCLE
              </span>
            </div>

            {/* REGISTER A */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                <span><strong>REGISTER A:</strong> (DEC: <strong style={{ color: 'var(--cobalt-blue)' }}>{decA}</strong> | HEX: <strong>{hexA}</strong>)</span>
                <span style={{ color: '#888' }}>2⁷ ... 2⁰</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '6px' }}>
                {regA.map((bit, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleBitA(idx)}
                    style={{
                      height: '46px',
                      background: bit ? 'var(--cobalt-blue)' : 'var(--bg-paper)',
                      color: bit ? '#FFFFFF' : '#0A0A0A',
                      border: '2px solid #0A0A0A',
                      boxShadow: bit ? '3px 3px 0px #0A0A0A' : '2px 2px 0px #0A0A0A',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.2rem',
                      fontWeight: 900,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.1s ease',
                      userSelect: 'none'
                    }}
                  >
                    {bit}
                  </button>
                ))}
              </div>
            </div>

            {/* REGISTER B (Disabled for unary ops like NOT, SHL, SHR) */}
            {activeOp !== 'NOT' && activeOp !== 'SHL' && activeOp !== 'SHR' && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                  <span><strong>REGISTER B:</strong> (DEC: <strong style={{ color: 'var(--vermilion-red)' }}>{decB}</strong> | HEX: <strong>{hexB}</strong>)</span>
                  <span style={{ color: '#888' }}>2⁷ ... 2⁰</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '6px' }}>
                  {regB.map((bit, idx) => (
                    <button
                      key={idx}
                      onClick={() => toggleBitB(idx)}
                      style={{
                        height: '46px',
                        background: bit ? 'var(--vermilion-red)' : 'var(--bg-paper)',
                        color: bit ? '#FFFFFF' : '#0A0A0A',
                        border: '2px solid #0A0A0A',
                        boxShadow: bit ? '3px 3px 0px #0A0A0A' : '2px 2px 0px #0A0A0A',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.2rem',
                        fontWeight: 900,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.1s ease',
                        userSelect: 'none'
                      }}
                    >
                      {bit}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Operator Selection Bar */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#666', marginBottom: '0.4rem' }}>
                SELECT ALU BITWISE OPERATOR:
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {[
                  { id: 'AND', label: 'AND (&)', desc: 'Bitwise Conjunction' },
                  { id: 'OR', label: 'OR (|)', desc: 'Bitwise Disjunction' },
                  { id: 'XOR', label: 'XOR (^)', desc: 'Exclusive-OR' },
                  { id: 'NOT', label: 'NOT (~A)', desc: 'Bit Inversion' },
                  { id: 'SHL', label: 'SHL (A << 1)', desc: 'Fast ×2 Multiply' },
                  { id: 'SHR', label: 'SHR (A >> 1)', desc: 'Fast ÷2 Division' },
                ].map((op) => {
                  const isSelected = activeOp === op.id;
                  return (
                    <button
                      key={op.id}
                      onClick={() => {
                        SoundEngine.playClick();
                        setActiveOp(op.id);
                      }}
                      className="brutal-btn brutal-btn-sm"
                      style={{
                        background: isSelected ? 'var(--canary-yellow)' : '#FFF',
                        borderColor: '#000',
                        fontWeight: isSelected ? 900 : 700
                      }}
                    >
                      {op.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RESULT REGISTER OUTPUT */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                <span><strong>ALU OUTPUT (A {activeOp} {activeOp !== 'NOT' && activeOp !== 'SHL' && activeOp !== 'SHR' ? 'B' : ''}):</strong></span>
                <span>DEC: <strong style={{ color: 'var(--emerald-mint)' }}>{decRes}</strong> | HEX: <strong>{hexRes}</strong></span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '6px' }}>
                {resultBits.map((bit, idx) => (
                  <div
                    key={idx}
                    style={{
                      height: '46px',
                      background: bit ? 'var(--emerald-mint)' : '#0A0A0A',
                      color: bit ? '#0A0A0A' : '#FFFFFF',
                      border: '2px solid #0A0A0A',
                      boxShadow: '3px 3px 0px #0A0A0A',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.2rem',
                      fontWeight: 900,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {bit}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Deep Dive & Truth Table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="brutal-card" style={{
              background: 'var(--bg-card)',
              border: 'var(--border-thick)',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Zap size={18} color="var(--cobalt-blue)" />
                <h3 style={{ fontSize: '1.25rem' }}>
                  {activeOp === 'AND' && 'BITWISE AND (&) // MASKING & FILTERING'}
                  {activeOp === 'OR' && 'BITWISE OR (|) // COMBINING FLAGS'}
                  {activeOp === 'XOR' && 'BITWISE XOR (^) // CRYPTO & PARITY'}
                  {activeOp === 'NOT' && 'BITWISE NOT (~) // ONES\' COMPLEMENT'}
                  {activeOp === 'SHL' && 'BIT SHIFT LEFT (<<) // INSTANT 2ⁿ MULTIPLICATION'}
                  {activeOp === 'SHR' && 'BIT SHIFT RIGHT (>>) // INSTANT 2ⁿ DIVISION'}
                </h3>
              </div>

              <p style={{ fontSize: '0.9rem', color: '#333', lineHeight: 1.5, marginBottom: '1rem' }}>
                {activeOp === 'AND' && 'Transfers 1 only when BOTH operands contain 1 at that position. Used to clear bits, extract RGB alpha channels, and check permission flags.'}
                {activeOp === 'OR' && 'Yields 1 if EITHER bit is 1. Standard approach for combining distinct boolean state masks into a single compact integer byte.'}
                {activeOp === 'XOR' && 'Yields 1 only when bits DIFFER. The fundamental engine behind stream ciphers, RAID parity calculations, and swapping two numbers without a temporary variable.'}
                {activeOp === 'NOT' && 'Inverts every 0 to 1 and every 1 to 0. Forms the basis of two\'s complement signed integer representation.'}
                {activeOp === 'SHL' && 'Shifts all bits left by 1 position, appending 0 to the least significant bit. Mathematically equivalent to multiplying by 2 in a single hardware cycle.'}
                {activeOp === 'SHR' && 'Shifts all bits right by 1 position, discarding the lowest bit. Mathematically equivalent to integer division by 2.'}
              </p>

              {/* Truth Table Grid */}
              <div style={{ background: '#0A0A0A', color: '#FFF', padding: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                <div style={{ color: 'var(--canary-yellow)', fontWeight: 800, marginBottom: '0.4rem' }}>
                  // LOGIC GATE TRUTH TABLE:
                </div>
                {activeOp === 'AND' && (
                  <div>0 & 0 = 0 | 0 & 1 = 0 | 1 & 0 = 0 | <strong>1 & 1 = 1</strong></div>
                )}
                {activeOp === 'OR' && (
                  <div>0 | 0 = 0 | <strong>0 | 1 = 1</strong> | <strong>1 | 0 = 1</strong> | <strong>1 | 1 = 1</strong></div>
                )}
                {activeOp === 'XOR' && (
                  <div>0 ^ 0 = 0 | <strong>0 ^ 1 = 1</strong> | <strong>1 ^ 0 = 1</strong> | 1 ^ 1 = 0</div>
                )}
                {activeOp === 'NOT' && (
                  <div>~0 = 1 | ~1 = 0</div>
                )}
                {activeOp === 'SHL' && (
                  <div>N {'<<'} 1 = N × 2 | N {'<<'} k = N × 2ᵏ</div>
                )}
                {activeOp === 'SHR' && (
                  <div>N {'>>'} 1 = ⌊N / 2⌋ | N {'>>'} k = ⌊N / 2ᵏ⌋</div>
                )}
              </div>
            </div>

            {/* Performance Tip Stamp */}
            <div className="brutal-card-yellow" style={{ padding: '1rem' }}>
              <div className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 900, marginBottom: '0.2rem' }}>
                ★ HARDWARE AXIOM:
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                Bitwise operations execute inside the CPU's Arithmetic Logic Unit in a single clock cycle (0.2–0.5 nanoseconds), bypassing software memory decoders entirely.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
