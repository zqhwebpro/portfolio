import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';
import { SoundEngine } from '../utils/soundEngine';

const KHAN_QUIZ_QUESTIONS = [
  {
    id: 1,
    unit: 'Unit 02 // Binary Search',
    question: 'In a sorted array of 128 elements, what is the maximum number of comparisons binary search will ever make in the worst case?',
    options: [
      { text: '7 comparisons', correct: true, exp: 'Correct! log₂(128) = 7, so at most 7 comparisons are required.' },
      { text: '64 comparisons', correct: false, exp: 'Incorrect. 64 would be half the array, but binary search halves repeatedly in log₂(n) = 7 steps.' },
      { text: '128 comparisons', correct: false, exp: 'Incorrect. 128 is linear search worst case, not binary search.' },
      { text: '14 comparisons', correct: false, exp: 'Incorrect. 2 * log₂(128) is not the formula; ceil(log₂(128)) = 7.' }
    ]
  },
  {
    id: 2,
    unit: 'Unit 03 // Asymptotic Analysis',
    question: 'Which asymptotic notation indicates that an algorithm\'s running time is bounded both from above AND from below by a function g(n)?',
    options: [
      { text: 'Big-Θ (Big-Theta)', correct: true, exp: 'Correct! Big-Θ indicates an asymptotically tight bound (both upper and lower).' },
      { text: 'Big-O (Big-O)', correct: false, exp: 'Incorrect. Big-O only provides an asymptotic upper bound.' },
      { text: 'Big-Ω (Big-Omega)', correct: false, exp: 'Incorrect. Big-Ω only provides an asymptotic lower bound.' },
      { text: 'Little-o', correct: false, exp: 'Incorrect. Little-o is a strict upper bound.' }
    ]
  },
  {
    id: 3,
    unit: 'Unit 04 // Selection Sort',
    question: 'How many total comparisons does Selection Sort perform on an array of size n = 10, if the array is already sorted in ascending order?',
    options: [
      { text: '45 comparisons (n(n-1)/2)', correct: true, exp: 'Correct! Selection sort always scans the entire unsorted subarray to find the minimum: 9+8+...+1 = 45 comparisons.' },
      { text: '9 comparisons (n - 1)', correct: false, exp: 'Incorrect. Selection sort has no early exit and always does n(n-1)/2 comparisons.' },
      { text: '0 comparisons', correct: false, exp: 'Incorrect. Even sorted arrays require full pairwise minimum scans in Selection Sort.' },
      { text: '100 comparisons (n²)', correct: false, exp: 'Incorrect. The exact sum of 1 to n-1 is n(n-1)/2 = 45.' }
    ]
  },
  {
    id: 4,
    unit: 'Unit 04 // Insertion Sort',
    question: 'What is the best-case time complexity of Insertion Sort when given an array that is ALREADY sorted?',
    options: [
      { text: 'Θ(n) linear time', correct: true, exp: 'Correct! When already sorted, each element only needs 1 comparison against its left neighbor with zero shifts.' },
      { text: 'Θ(n²) quadratic time', correct: false, exp: 'Incorrect. Θ(n²) is the worst/average case (when reversed).' },
      { text: 'Θ(log n) logarithmic time', correct: false, exp: 'Incorrect. Insertion sort must at least inspect all n elements.' },
      { text: 'Θ(1) constant time', correct: false, exp: 'Incorrect. The algorithm must verify all n elements.' }
    ]
  },
  {
    id: 5,
    unit: 'Unit 05 // Recursive Algorithms',
    question: 'What two fundamental components are strictly required for every valid recursive function?',
    options: [
      { text: 'A Base Case and a Recursive Case', correct: true, exp: 'Correct! The Base Case stops recursion, while the Recursive Case reduces the problem.' },
      { text: 'A While loop and a Call Stack', correct: false, exp: 'Incorrect. Recursion avoids loops by having the function call itself.' },
      { text: 'A Sorting array and a Pivot', correct: false, exp: 'Incorrect. Those are specific to quicksort/sorting.' },
      { text: 'An Adjacency list and a Hash table', correct: false, exp: 'Incorrect. Those are graph/dictionary data structures.' }
    ]
  },
  {
    id: 6,
    unit: 'Unit 05 // Towers of Hanoi',
    question: 'What is the minimum number of disk moves required to solve the Towers of Hanoi puzzle with n = 4 disks?',
    options: [
      { text: '15 moves (2⁴ - 1)', correct: true, exp: 'Correct! The formula is 2ⁿ - 1. For n = 4, 2⁴ - 1 = 16 - 1 = 15 moves.' },
      { text: '16 moves', correct: false, exp: 'Incorrect. 2⁴ = 16, but the optimal formula is 2ⁿ - 1 = 15.' },
      { text: '8 moves', correct: false, exp: 'Incorrect. 2 * 4 = 8 is linear, but Hanoi is exponential.' },
      { text: '24 moves (4!)', correct: false, exp: 'Incorrect. Hanoi does not scale as a factorial.' }
    ]
  },
  {
    id: 7,
    unit: 'Unit 06 // Divide & Conquer',
    question: 'What is the worst-case running time of Quick Sort, and when does it occur?',
    options: [
      { text: 'O(n²), when the pivot repeatedly creates 0-element and (n-1)-element partitions', correct: true, exp: 'Correct! Highly unbalanced partitions (e.g. picking min/max on sorted array) cause O(n²) worst-case recursion.' },
      { text: 'O(n log n), occurring on all inputs guaranteed', correct: false, exp: 'Incorrect. Merge sort is O(n log n) guaranteed, but Quick Sort can degrade to O(n²).' },
      { text: 'O(2ⁿ), occurring on random arrays', correct: false, exp: 'Incorrect. Quicksort never exceeds O(n²).' },
      { text: 'O(n), occurring on reversed arrays', correct: false, exp: 'Incorrect. Reversed arrays with poor pivots yield O(n²).' }
    ]
  },
  {
    id: 8,
    unit: 'Unit 07 // Graph Breadth-First Search',
    question: 'Which fundamental data structure does Breadth-First Search (BFS) use to visit vertices in level-order and find shortest paths?',
    options: [
      { text: 'A Queue (FIFO — First In, First Out)', correct: true, exp: 'Correct! A FIFO Queue guarantees vertices are explored in order of increasing distance from the source.' },
      { text: 'A Stack (LIFO — Last In, First Out)', correct: false, exp: 'Incorrect. A Stack is used for Depth-First Search (DFS).' },
      { text: 'A Binary Heap', correct: false, exp: 'Incorrect. A Binary Heap is used for Dijkstra\'s weighted shortest path algorithm.' },
      { text: 'A Hash Table', correct: false, exp: 'Incorrect. Hash tables store key-value pairs, not traversal order.' }
    ]
  },
  {
    id: 9,
    unit: 'Unit 00 // Algorithmic Paradigms',
    question: 'What is the fundamental difference between a Brute Force strategy and Divide and Conquer?',
    options: [
      { text: 'Brute Force tries all possible candidates exhaustively, while Divide and Conquer breaks the problem into sub-problems, solves them recursively, and combines the results', correct: true, exp: 'Correct! Brute Force tests every candidate without shortcuts, whereas Divide and Conquer exploits structural sub-problem partitioning to reduce complexity.' },
      { text: 'Brute Force uses O(1) time while Divide and Conquer uses O(n!)', correct: false, exp: 'Incorrect. Brute force is typically much slower (combinatorial or linear), whereas Divide and Conquer is logarithmic or linearithmic O(n log n).' },
      { text: 'Divide and Conquer never uses recursion', correct: false, exp: 'Incorrect. Divide and Conquer relies heavily on recursion to solve partitioned sub-problems.' },
      { text: 'They are identical approaches with different names', correct: false, exp: 'Incorrect. They are fundamentally distinct problem-solving paradigms.' }
    ]
  },
  {
    id: 10,
    unit: 'Unit 00 // Complexity & Big O',
    question: 'How do Time Complexity and Space Complexity differ in algorithmic analysis?',
    options: [
      { text: 'Time Complexity measures operations/runtime growth relative to input size n, while Space Complexity measures total memory/auxiliary storage footprint', correct: true, exp: 'Correct! Time complexity models instruction count growth T(n), and Space complexity models memory allocation S(n) including call stacks and heap buffers.' },
      { text: 'Time complexity is measured in megabytes and space complexity in seconds', correct: false, exp: 'Incorrect. Time is measured in operation counts/cycles, space in memory bytes/slots.' },
      { text: 'Space complexity only applies to hardware disks, not RAM', correct: false, exp: 'Incorrect. Space complexity primarily analyzes RAM (stack frames and heap memory).' },
      { text: 'Big O notation can only be applied to Time Complexity, never Space Complexity', correct: false, exp: 'Incorrect. Big O asymptotic notation describes both time and space complexity scaling.' }
    ]
  }
];

export function QuizChallenge() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const q = KHAN_QUIZ_QUESTIONS[currentIdx];

  const handleSelect = (idx) => {
    if (isSubmitted) return;
    SoundEngine.playClick();
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null || isSubmitted) return;
    setIsSubmitted(true);
    const isCorrect = q.options[selectedOption].correct;

    if (isCorrect) {
      SoundEngine.playFanfare();
      setScore(prev => prev + 1);
    } else {
      SoundEngine.playThud();
    }
  };

  const handleNext = () => {
    SoundEngine.playClick();
    if (currentIdx + 1 < KHAN_QUIZ_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
      SoundEngine.playFanfare();
    }
  };

  const resetQuiz = () => {
    SoundEngine.playClick();
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setIsSubmitted(false);
    setIsFinished(false);
  };

  return (
    <section id="quiz" className="section-padding" style={{
      background: 'var(--bg-primary)',
      borderBottom: 'var(--border-thick)'
    }}>
      <div className="container">

        {/* Section Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="brutal-badge brutal-badge-yellow font-mono" style={{ fontSize: '0.8rem' }}>
              UNIT 08 // KHAN ALGORITHMS
            </span>
            <span className="brutal-badge brutal-badge-mint font-mono" style={{ fontSize: '0.8rem' }}>
              MASTERY ASSESSMENT (8 QUESTIONS)
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
            ALGORITHMS MASTERY CHECK
          </h2>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.1rem',
            color: 'var(--text-muted)',
            maxWidth: '850px',
            lineHeight: 1.6
          }}>
            Test your understanding of the core concepts from Khan Academy's Computer Science Algorithms curriculum.
          </p>
        </div>

        {/* Quiz Chassis */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {!isFinished ? (
            <div className="brutal-card" style={{ background: '#FFF' }}>
              
              {/* Question Header & Progress Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '2px solid #000', paddingBottom: '0.75rem' }}>
                <span className="brutal-badge brutal-badge-blue font-mono" style={{ fontSize: '0.8rem' }}>
                  {q.unit}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.9rem' }}>
                  QUESTION {currentIdx + 1} OF {KHAN_QUIZ_QUESTIONS.length}
                </span>
              </div>

              {/* Progress Bar Line */}
              <div style={{ height: '8px', background: '#E5E5E5', border: '1.5px solid #000', marginBottom: '1.5rem' }}>
                <div style={{
                  height: '100%',
                  width: `${((currentIdx + (isSubmitted ? 1 : 0)) / KHAN_QUIZ_QUESTIONS.length) * 100}%`,
                  background: 'var(--canary-yellow)',
                  transition: 'width 0.3s ease'
                }} />
              </div>

              {/* Question Text */}
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.3rem',
                fontWeight: 800,
                lineHeight: 1.4,
                marginBottom: '1.5rem'
              }}>
                {q.question}
              </h3>

              {/* Multiple Choice Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {q.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  let optBg = '#FFF';
                  let optBorder = '2px solid #000';

                  if (isSubmitted) {
                    if (opt.correct) {
                      optBg = '#D1FAE5';
                      optBorder = '2.5px solid #059669';
                    } else if (isSelected && !opt.correct) {
                      optBg = '#FEE2E2';
                      optBorder = '2.5px solid #DC2626';
                    }
                  } else if (isSelected) {
                    optBg = 'var(--canary-yellow)';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={isSubmitted}
                      style={{
                        textAlign: 'left',
                        padding: '1rem',
                        background: optBg,
                        border: optBorder,
                        boxShadow: isSelected ? '4px 4px 0 #000' : '2px 2px 0 #000',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.9rem',
                        fontWeight: isSelected ? 800 : 600,
                        cursor: isSubmitted ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.75rem',
                        transition: 'all 0.15s'
                      }}
                    >
                      <span>{opt.text}</span>
                      {isSubmitted && opt.correct && <CheckCircle2 size={18} color="#059669" />}
                      {isSubmitted && isSelected && !opt.correct && <XCircle size={18} color="#DC2626" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Banner (Post-Submission) */}
              {isSubmitted && (
                <div style={{
                  padding: '1rem',
                  border: '2px solid #000',
                  boxShadow: '3px 3px 0 #000',
                  marginBottom: '1.5rem',
                  background: q.options[selectedOption].correct ? '#D1FAE5' : '#FEE2E2',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  lineHeight: 1.5
                }}>
                  <strong style={{ display: 'block', marginBottom: '0.25rem', color: q.options[selectedOption].correct ? '#065F46' : '#991B1B' }}>
                    {q.options[selectedOption].correct ? '✓ EXCELLENT!' : '✗ EXPLANATION:'}
                  </strong>
                  {q.options[selectedOption].exp}
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                {!isSubmitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={selectedOption === null}
                    className="brutal-btn brutal-btn-red"
                    style={{ padding: '0.65rem 1.5rem', fontSize: '0.95rem' }}
                  >
                    SUBMIT ANSWER
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="brutal-btn brutal-btn-yellow"
                    style={{ padding: '0.65rem 1.5rem', fontSize: '0.95rem' }}
                  >
                    {currentIdx + 1 < KHAN_QUIZ_QUESTIONS.length ? 'NEXT QUESTION →' : 'VIEW FINAL SCORE →'}
                  </button>
                )}
              </div>

            </div>
          ) : (
            /* Quiz Completed Score Summary */
            <div className="brutal-card brutal-card-yellow" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
              <div style={{ width: '64px', height: '64px', background: '#000', borderRadius: '50%', color: 'var(--canary-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                <Award size={36} />
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2rem', marginBottom: '0.5rem' }}>
                ASSESSMENT COMPLETE!
              </h3>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 900, color: 'var(--cobalt-blue)', marginBottom: '1rem' }}>
                SCORE: {score} / {KHAN_QUIZ_QUESTIONS.length} ({Math.round((score / KHAN_QUIZ_QUESTIONS.length) * 100)}%)
              </div>

              <p style={{ maxWidth: '500px', margin: '0 auto 2rem auto', fontSize: '1rem', color: '#111', lineHeight: 1.5 }}>
                {score >= 7
                  ? 'Outstanding mastery of algorithmic theory, runtime analysis, and data structures!'
                  : score >= 5
                  ? 'Solid foundation! Review Divide & Conquer and Asymptotic Bounds to achieve full mastery.'
                  : 'Keep studying the units above to reinforce your algorithmic fundamentals!'}
              </p>

              <button
                onClick={resetQuiz}
                className="brutal-btn brutal-btn-red"
                style={{ padding: '0.75rem 2rem', fontSize: '1rem', margin: '0 auto' }}
              >
                <RotateCcw size={16} /> RETAKE ASSESSMENT
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

export default QuizChallenge;
