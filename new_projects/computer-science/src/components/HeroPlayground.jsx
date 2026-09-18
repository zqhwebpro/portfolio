import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Sparkles, HelpCircle, CheckCircle, ArrowRight, Zap, Target, Binary } from 'lucide-react';
import { SoundEngine } from '../utils/soundEngine';

export function HeroPlayground() {
// Guessing Game State (Intro Unit)
  const [secretNumber, setSecretNumber] = useState(67);
  const [currentGuess, setCurrentGuess] = useState(50);
  const [lowBound, setLowBound] = useState(1);
  const [highBound, setHighBound] = useState(100);
  const [guessHistory, setGuessHistory] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [lastFeedback, setLastFeedback] = useState(null); // 'high' | 'low' | 'correct' | null

  // Interactive Cursor Physics Background
  const playgroundRef = useRef(null);

  const resetGame = (newSecret = null) => {
    SoundEngine.playClick();
    const sec = newSecret || Math.floor(Math.random() * 100) + 1;
    setSecretNumber(sec);
    setLowBound(1);
    setHighBound(100);
    setCurrentGuess(50);
    setGuessHistory([]);
    setGameWon(false);
    setLastFeedback(null);
  };

  const handleMakeGuess = (guessVal) => {
    if (gameWon) return;
    const val = Number(guessVal);
    if (val < 1 || val > 100) return;

    SoundEngine.playPop();
    const newEntry = {
      guess: val,
      step: guessHistory.length + 1,
      min: lowBound,
      max: highBound,
    };

    if (val === secretNumber) {
      SoundEngine.playFanfare();
      newEntry.result = 'CORRECT';
      setLastFeedback('correct');
      setGameWon(true);
    } else if (val < secretNumber) {
      SoundEngine.playBlip();
      newEntry.result = 'TOO LOW';
      setLastFeedback('low');
      setLowBound(Math.max(lowBound, val + 1));
      // Auto-suggest next binary midpoint
      const nextMid = Math.floor((Math.max(lowBound, val + 1) + highBound) / 2);
      setCurrentGuess(nextMid);
    } else {
      SoundEngine.playBlip();
      newEntry.result = 'TOO HIGH';
      setLastFeedback('high');
      setHighBound(Math.min(highBound, val - 1));
      // Auto-suggest next binary midpoint
      const nextMid = Math.floor((lowBound + Math.min(highBound, val - 1)) / 2);
      setCurrentGuess(nextMid);
    }

    setGuessHistory(prev => [newEntry, ...prev]);
  };

  const runOptimalBinaryStep = () => {
    const optimalMid = Math.floor((lowBound + highBound) / 2);
    setCurrentGuess(optimalMid);
    handleMakeGuess(optimalMid);
  };

  return (
    <section id="hero" className="section-padding" style={{
      background: 'var(--bg-paper)',
      borderBottom: 'var(--border-thick)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container" ref={playgroundRef}>
        
        {/* Section Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="brutal-badge brutal-badge-red font-mono" style={{ fontSize: '0.8rem' }}>
              UNIT 00 // FOUNDATIONAL INTRO
            </span>
            <span className="brutal-badge brutal-badge-yellow font-mono" style={{ fontSize: '0.8rem' }}>
              COMPUTATIONAL PROBLEM SOLVING
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.75rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            maxWidth: '900px',
            marginBottom: '1rem'
          }}>
            WHAT IS AN ALGORITHM?
            <span style={{
              display: 'inline-block',
              background: 'var(--canary-yellow)',
              padding: '0 0.35rem',
              marginLeft: '0.5rem',
              border: '2px solid #000',
              boxShadow: '3px 3px 0 #000'
            }}>
              &amp; THE GUESSING GAME
            </span>
          </h1>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            color: 'var(--text-muted)',
            maxWidth: '820px',
            lineHeight: 1.6
          }}>
            An algorithm is a step-by-step procedure for solving a computational problem. An algorithm must always be <strong>correct</strong> (producing the right answer for every valid input) and <strong>resource-efficient</strong> (minimizing operations and memory usage).
          </p>
        </div>

        {/* 2-Column Grid: Left (Concepts & Impact) | Right (Interactive Guessing Game) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}>

          {/* Left Column: Algorithmic Foundations Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div className="brutal-card brutal-card-blue">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Zap size={20} color="var(--canary-yellow)" />
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem' }}>
                  CORE ALGORITHMIC PRINCIPLES
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem', lineHeight: 1.5 }}>
                <div style={{
                  background: 'rgba(255,255,255,0.15)',
                  padding: '0.85rem',
                  border: '1.5px solid rgba(255,255,255,0.3)'
                }}>
                  <strong style={{ color: 'var(--canary-yellow)', display: 'block', marginBottom: '0.25rem' }}>
                    1. Problem vs. Algorithm
                  </strong>
                  A <em>problem</em> specifies the input-output relationship (e.g., "Find target in sorted list"). An <em>algorithm</em> is the concrete set of instructions that computes it.
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.15)',
                  padding: '0.85rem',
                  border: '1.5px solid rgba(255,255,255,0.3)'
                }}>
                  <strong style={{ color: 'var(--emerald-mint)', display: 'block', marginBottom: '0.25rem' }}>
                    2. Correctness &amp; Halting
                  </strong>
                  An algorithm is correct if, for every instance of the problem, it halts in finite steps and outputs the mathematically correct answer.
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.15)',
                  padding: '0.85rem',
                  border: '1.5px solid rgba(255,255,255,0.3)'
                }}>
                  <strong style={{ color: '#00F0FF', display: 'block', marginBottom: '0.25rem' }}>
                    3. Real-World Applications
                  </strong>
                  From GPS route calculation (shortest-path graphs) to internet cryptography (modular exponentiation) and search ranking, algorithms drive modern software engineering.
                </div>
              </div>
            </div>

            {/* Comparison Box: Linear vs Binary Thinking */}
            <div className="brutal-card brutal-card-yellow">
              <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                LINEAR VS. BINARY SEARCH THINKING
              </h4>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem', color: '#111' }}>
                If you guess a number between 1 and 100 sequentially (1, 2, 3...), it could take up to <strong>100 guesses</strong>. If you divide the search range in half each time, it takes at most <strong>7 guesses</strong>!
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem'
              }}>
                <div style={{ background: '#FFF', padding: '0.75rem', border: '1.5px solid #000', boxShadow: '2px 2px 0 #000' }}>
                  <div style={{ fontWeight: 800, color: 'var(--vermilion-red)' }}>LINEAR SEARCH</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, margin: '0.25rem 0' }}>Max 100</div>
                  <div style={{ color: '#666' }}>O(n) comparisons</div>
                </div>
                <div style={{ background: '#FFF', padding: '0.75rem', border: '1.5px solid #000', boxShadow: '2px 2px 0 #000' }}>
                  <div style={{ fontWeight: 800, color: 'var(--cobalt-blue)' }}>BINARY SEARCH</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, margin: '0.25rem 0' }}>Max 7</div>
                  <div style={{ color: '#666' }}>O(log₂ n) comparisons</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Number Guessing Game */}
          <div className="brutal-card" style={{ background: '#FFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <span className="brutal-badge brutal-badge-mint font-mono" style={{ fontSize: '0.75rem' }}>
                  INTERACTIVE LAB // 1 TO 100
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.4rem', marginTop: '0.25rem' }}>
                  THE NUMBER GUESSING GAME
                </h3>
              </div>

              <button
                onClick={() => resetGame()}
                className="brutal-btn brutal-btn-sm"
                style={{ background: '#F5F5F5', border: '1.5px solid #000' }}
                title="Pick a new secret number"
              >
                <RotateCcw size={14} /> New Secret Number
              </button>
            </div>

            {/* Active Range Tracker Bar */}
            <div style={{
              background: 'var(--bg-paper)',
              border: '2px solid #000',
              padding: '1rem',
              marginBottom: '1.5rem',
              boxShadow: '3px 3px 0 #000'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                <span>SEARCH RANGE: [{lowBound} ... {highBound}]</span>
                <span>REMAINING CANDIDATES: {Math.max(0, highBound - lowBound + 1)}</span>
              </div>

              {/* Visual Number Range Bar */}
              <div style={{
                position: 'relative',
                height: '24px',
                background: '#E5E5E5',
                border: '1.5px solid #000',
                borderRadius: '0px',
                overflow: 'hidden'
              }}>
                {/* Active Sub-Range */}
                <div style={{
                  position: 'absolute',
                  left: `${((lowBound - 1) / 100) * 100}%`,
                  width: `${((highBound - lowBound + 1) / 100) * 100}%`,
                  height: '100%',
                  background: 'var(--canary-yellow)',
                  borderLeft: '2px solid var(--cobalt-blue)',
                  borderRight: '2px solid var(--cobalt-blue)',
                  transition: 'all 0.3s ease'
                }} />
              </div>
            </div>

            {/* Guess Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '0.25rem' }}>
                    ENTER YOUR GUESS (1 – 100):
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={currentGuess}
                    disabled={gameWon}
                    onChange={(e) => setCurrentGuess(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleMakeGuess(currentGuess); }}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      border: '2px solid #000',
                      boxShadow: '3px 3px 0 #000',
                      outline: 'none',
                      background: gameWon ? '#E8F8F0' : '#FFF'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignSelf: 'flex-end' }}>
                  <button
                    onClick={() => handleMakeGuess(currentGuess)}
                    disabled={gameWon}
                    className="brutal-btn brutal-btn-red"
                    style={{ padding: '0.75rem 1.25rem', fontWeight: 800 }}
                  >
                    GUESS!
                  </button>
                </div>
              </div>

              {/* Binary Search Helper Button */}
              {!gameWon && (
                <button
                  onClick={runOptimalBinaryStep}
                  className="brutal-btn brutal-btn-yellow"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontSize: '0.85rem',
                    padding: '0.5rem'
                  }}
                >
                  <Binary size={16} />
                  PLAY OPTIMAL BINARY STEP: Guess {Math.floor((lowBound + highBound) / 2)} (Midpoint)
                </button>
              )}
            </div>

            {/* Live Feedback Alert Banner */}
            {lastFeedback && (
              <div style={{
                padding: '1rem',
                border: '2px solid #000',
                boxShadow: '3px 3px 0 #000',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontWeight: 800,
                fontSize: '1.1rem',
                fontFamily: 'var(--font-mono)',
                background: lastFeedback === 'correct' ? 'var(--emerald-mint)' : lastFeedback === 'high' ? 'var(--vermilion-red)' : 'var(--canary-yellow)',
                color: lastFeedback === 'high' ? '#FFF' : '#000'
              }}>
                {lastFeedback === 'correct' && <CheckCircle size={24} />}
                {lastFeedback === 'high' && <ArrowRight style={{ transform: 'rotate(-90deg)' }} size={24} />}
                {lastFeedback === 'low' && <ArrowRight style={{ transform: 'rotate(90deg)' }} size={24} />}
                <span>
                  {lastFeedback === 'correct' && `🎉 BINGO! The secret number is ${secretNumber}. Found in ${guessHistory.length} guesses!`}
                  {lastFeedback === 'high' && `TOO HIGH! Guess was ${currentGuess}. Range is now [${lowBound} ... ${highBound}].`}
                  {lastFeedback === 'low' && `TOO LOW! Guess was ${currentGuess}. Range is now [${lowBound} ... ${highBound}].`}
                </span>
              </div>
            )}

            {/* Guess Log History */}
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                GUESS LOG ({guessHistory.length} STEPS):
              </div>
              <div style={{
                maxHeight: '160px',
                overflowY: 'auto',
                border: '1.5px solid #000',
                background: 'var(--bg-paper)',
                padding: '0.5rem'
              }}>
                {guessHistory.length === 0 ? (
                  <div style={{ color: '#888', fontStyle: 'italic', fontSize: '0.85rem', padding: '0.5rem' }}>
                    Make a guess above to start the binary search elimination log.
                  </div>
                ) : (
                  guessHistory.map((entry, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0.35rem 0.5rem',
                        borderBottom: '1px solid #DDD',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        background: entry.result === 'CORRECT' ? '#D1FAE5' : 'transparent'
                      }}
                    >
                      <span><strong>#{entry.step}</strong>: Guessed <strong>{entry.guess}</strong></span>
                      <span>Range was [{entry.min} ... {entry.max}]</span>
                      <strong style={{
                        color: entry.result === 'CORRECT' ? '#059669' : entry.result === 'TOO HIGH' ? 'var(--vermilion-red)' : 'var(--cobalt-blue)'
                      }}>
                        {entry.result}
                      </strong>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default HeroPlayground;
