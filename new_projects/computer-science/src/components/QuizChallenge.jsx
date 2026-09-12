import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Award, RotateCcw } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../utils/csData';
import { SoundEngine } from '../utils/soundEngine';

export function QuizChallenge() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    SoundEngine.playClick();
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === question.correct) {
      setScore(prev => prev + 1);
      SoundEngine.playSuccess();
    } else {
      SoundEngine.playStackPop();
    }
  };

  const handleNext = () => {
    SoundEngine.playClick();
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    SoundEngine.playClick();
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <section className="section-wrapper" style={{ background: 'var(--bg-paper)' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <div className="section-header" style={{ textAlign: 'center', alignItems: 'center' }}>
          <div className="section-tag">
            <HelpCircle size={14} /> KNOWLEDGE EVALUATION
          </div>
          <h2 className="section-title" style={{ justifyContent: 'center' }}>
            TEST YOUR <span style={{ color: 'var(--vermilion-red)' }}>INTELLECT</span>
          </h2>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>
            Verify your mastery of asymptotic complexity and algorithmic patterns.
          </p>
        </div>

        <div className="brutal-card" style={{
          background: 'var(--bg-card)',
          border: 'var(--border-thick)',
          boxShadow: 'var(--shadow-xl)',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          position: 'relative'
        }}>
          {!isFinished ? (
            <div>
              {/* Question Header & Progress */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: 'var(--border-solid)',
                paddingBottom: '0.75rem',
                marginBottom: '1.25rem'
              }}>
                <span className="font-mono" style={{ fontWeight: 800, fontSize: '0.85rem' }}>
                  QUESTION {currentIdx + 1} OF {QUIZ_QUESTIONS.length}
                </span>
                <span className="brutal-pill pill-yellow">
                  SCORE: {score} / {QUIZ_QUESTIONS.length}
                </span>
              </div>

              {/* Question Text */}
              <h3 style={{ fontSize: '1.35rem', lineHeight: 1.3, marginBottom: '1.5rem' }}>
                {question.question}
              </h3>

              {/* Options Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {question.options.map((opt, idx) => {
                  let bg = '#FFFFFF';
                  let borderColor = '#0A0A0A';
                  if (isAnswered) {
                    if (idx === question.correct) {
                      bg = 'var(--emerald-mint)';
                    } else if (idx === selectedOption) {
                      bg = 'var(--vermilion-red)';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      style={{
                        padding: '0.85rem 1.25rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        textAlign: 'left',
                        background: bg,
                        color: idx === selectedOption && idx !== question.correct ? '#FFFFFF' : '#0A0A0A',
                        border: '2px solid #0A0A0A',
                        boxShadow: '3px 3px 0px #0A0A0A',
                        cursor: isAnswered ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.1s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{
                          background: '#0A0A0A',
                          color: '#FFFFFF',
                          padding: '2px 6px',
                          fontSize: '0.75rem'
                        }}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isAnswered && idx === question.correct && <CheckCircle2 size={18} color="#000" />}
                      {isAnswered && idx === selectedOption && idx !== question.correct && <XCircle size={18} color="#FFF" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Reveal */}
              {isAnswered && (
                <div style={{
                  background: '#0A0A0A',
                  color: '#FFFFFF',
                  padding: '1rem',
                  border: 'var(--border-solid)',
                  marginBottom: '1.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem'
                }}>
                  <div style={{ color: 'var(--canary-yellow)', fontWeight: 800, marginBottom: '0.25rem' }}>
                    // ARCHITECTURAL RATIONALE:
                  </div>
                  <div>{question.explanation}</div>
                </div>
              )}

              {/* Next Button */}
              {isAnswered && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={handleNext}
                    className="brutal-btn brutal-btn-primary"
                  >
                    {currentIdx < QUIZ_QUESTIONS.length - 1 ? 'NEXT QUESTION →' : 'VIEW SCORE SUMMARY'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Score Summary */
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <Award size={54} color="var(--cobalt-blue)" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>EVALUATION COMPLETE</h3>
              <p className="font-mono" style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>
                YOUR SCORE: <strong style={{ color: 'var(--cobalt-blue)' }}>{score}</strong> / {QUIZ_QUESTIONS.length} ({Math.round((score / QUIZ_QUESTIONS.length) * 100)}%)
              </p>
              <button
                onClick={handleRestart}
                className="brutal-btn brutal-btn-accent"
              >
                <RotateCcw size={16} /> RESTART EVALUATION
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
