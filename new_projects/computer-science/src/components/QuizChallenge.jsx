import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, HelpCircle, Sparkles, Terminal, Database, Clock, HardDrive, Hash, RefreshCw, GitBranch, Crosshair } from 'lucide-react';
import { SoundEngine } from '../utils/soundEngine';

const CS_QUIZ_QUESTIONS = [
  {
    id: 1,
    unit: 'Concept 01 // Algorithm',
    question: 'According to computer science foundations, what 5 essential criteria must every valid algorithm satisfy?',
    options: [
      { text: 'Finiteness, Definiteness, Input, Output, and Effectiveness', correct: true, exp: 'Correct! An algorithm must halt in finite steps, have unambiguous operations, receive inputs, produce outputs, and be computationally feasible.' },
      { text: 'Speed, Memory, Compiler, CPU, and Network', correct: false, exp: 'Incorrect. Those are hardware and systems execution parameters, not the definition of an algorithm.' },
      { text: 'Recursion, Sorting, Searching, Hashing, and Graphing', correct: false, exp: 'Incorrect. Those are specific algorithmic paradigms and techniques.' },
      { text: 'Object-Orientation, Polymorphism, Inheritance, and Encapsulation', correct: false, exp: 'Incorrect. Those are Object-Oriented Programming (OOP) design principles.' }
    ]
  },
  {
    id: 2,
    unit: 'Concept 02 // Data Structure',
    question: 'Why does an Array allow O(1) constant-time access to elements by index, whereas a Singly Linked List requires O(n) sequential traversal?',
    options: [
      { text: 'Arrays occupy contiguous memory allowing direct index address arithmetic: Base_Address + (Index * Element_Size)', correct: true, exp: 'Correct! Contiguous memory allocation allows the CPU to calculate exact memory offsets in O(1) time without pointer hopping.' },
      { text: 'Arrays are stored on the hard drive while Linked Lists are stored in RAM', correct: false, exp: 'Incorrect. Both data structures reside in RAM memory.' },
      { text: 'Linked lists are always sorted, which forces slower lookups', correct: false, exp: 'Incorrect. Linked list nodes are scattered across the heap and connected by pointers, requiring O(n) sequential hops.' },
      { text: 'Arrays use recursion to find elements', correct: false, exp: 'Incorrect. Arrays use direct hardware index offset calculations.' }
    ]
  },
  {
    id: 3,
    unit: 'Concept 03 // Time Complexity',
    question: 'When analyzing the running time of an algorithm as a function T(n), what does Worst-Case Time Complexity measure?',
    options: [
      { text: 'The maximum number of elementary operations executed over any input of size n (guaranteed upper bound)', correct: true, exp: 'Correct! Worst-case analysis provides an absolute upper bound guarantee that the algorithm will never exceed across all possible inputs.' },
      { text: 'The average number of operations over random inputs', correct: false, exp: 'Incorrect. That is Average-Case Complexity Θ(n).' },
      { text: 'The physical seconds measured using a stopwatch on a single CPU', correct: false, exp: 'Incorrect. Time complexity counts abstract operations independent of clock frequencies.' },
      { text: 'The memory consumption in megabytes', correct: false, exp: 'Incorrect. Memory consumption is measured by Space Complexity.' }
    ]
  },
  {
    id: 4,
    unit: 'Concept 04 // Space Complexity',
    question: 'What is the key distinction between "Input Space" and "Auxiliary Space"?',
    options: [
      { text: 'Input Space is the memory needed to store the initial input, while Auxiliary Space is extra temporary memory allocated during execution', correct: true, exp: 'Correct! Auxiliary space accounts for temporary variables, buffers, data structures, and recursive call stack frames created by the algorithm.' },
      { text: 'Input space is stored in the CPU cache, while auxiliary space is stored in the cloud', correct: false, exp: 'Incorrect. Both are in memory.' },
      { text: 'Auxiliary space is only used in Big O notation', correct: false, exp: 'Incorrect. Auxiliary space is the physical extra memory consumed.' },
      { text: 'They are identical terms with no difference', correct: false, exp: 'Incorrect. In-place algorithms require O(1) auxiliary space regardless of input size.' }
    ]
  },
  {
    id: 5,
    unit: 'Concept 05 // Big O Notation',
    question: 'When simplifying the algebraic runtime function T(n) = 4n³ + 250n² + 1000n + 99999 into Big O notation, what is the correct asymptotic result?',
    options: [
      { text: 'O(n³), because we drop lower-order terms and constant coefficients as n approaches infinity', correct: true, exp: 'Correct! As n grows arbitrarily large, the highest-order cubic term n³ completely dominates growth.' },
      { text: 'O(4n³ + 250n²)', correct: false, exp: 'Incorrect. Asymptotic analysis discards lower-order polynomial terms.' },
      { text: 'O(99999)', correct: false, exp: 'Incorrect. Constants are discarded in favor of variable input growth.' },
      { text: 'O(n⁶)', correct: false, exp: 'Incorrect. We do not multiply exponents together.' }
    ]
  },
  {
    id: 6,
    unit: 'Concept 06 // Recursion',
    question: 'What occurs inside a computer system if a recursive function fails to define or reach a valid "Base Case"?',
    options: [
      { text: 'Infinite recursive cascade leading to Call Stack Overflow (maximum call stack size exceeded)', correct: true, exp: 'Correct! Each recursive invocation pushes a new stack frame onto the Call Stack until allocated memory is exhausted.' },
      { text: 'The algorithm automatically converts itself into a while loop', correct: false, exp: 'Incorrect. The system will throw a RangeError/StackOverflowError.' },
      { text: 'The time complexity automatically improves to O(1)', correct: false, exp: 'Incorrect. Without a base case, recursion runs infinitely until crash.' },
      { text: 'The computer hard drive is wiped', correct: false, exp: 'Incorrect. Only the process call stack runs out of memory.' }
    ]
  },
  {
    id: 7,
    unit: 'Concept 07 // Divide and Conquer',
    question: 'What are the three canonical phases that define the Divide and Conquer algorithmic paradigm?',
    options: [
      { text: '1. Divide into sub-problems, 2. Conquer sub-problems recursively, 3. Combine sub-solutions into the final result', correct: true, exp: 'Correct! Classic examples like Merge Sort and Quick Sort follow this exact 3-phase lifecycle.' },
      { text: '1. Scan array, 2. Find minimum, 3. Swap positions', correct: false, exp: 'Incorrect. That describes Selection Sort.' },
      { text: '1. Initialize hash table, 2. Insert keys, 3. Handle collisions', correct: false, exp: 'Incorrect. That is hash map management.' },
      { text: '1. Generate all permutations, 2. Check each, 3. Output match', correct: false, exp: 'Incorrect. That describes the Brute Force paradigm.' }
    ]
  },
  {
    id: 8,
    unit: 'Concept 08 // Brute Force',
    question: 'Why is the Brute Force paradigm valuable in computer science despite often having exponential O(2ⁿ) or factorial O(n!) worst-case running times?',
    options: [
      { text: 'It is conceptually simple, guaranteed to find the optimal solution if one exists, and serves as the benchmark baseline for evaluating optimized algorithms', correct: true, exp: 'Correct! Brute force provides an invaluable correctness baseline and is practical for small inputs where optimization overhead is unnecessary.' },
      { text: 'It is always faster than divide and conquer on massive datasets', correct: false, exp: 'Incorrect. Brute force scales catastrophically on large inputs.' },
      { text: 'It requires zero CPU cycles to execute', correct: false, exp: 'Incorrect. It explores the entire combinatorial search space.' },
      { text: 'It only works with binary trees', correct: false, exp: 'Incorrect. Brute force applies to all problem domains.' }
    ]
  }
];

export function QuizChallenge() {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [history, setHistory] = useState([]);

  const currentQ = CS_QUIZ_QUESTIONS[currentQIndex];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = currentQ.options[idx].correct;
    if (isCorrect) {
      SoundEngine.playFanfare();
      setScore(prev => prev + 1);
    } else {
      SoundEngine.playBlip();
    }

    setHistory(prev => [
      ...prev,
      {
        questionId: currentQ.id,
        selected: idx,
        correct: isCorrect,
        unit: currentQ.unit
      }
    ]);
  };

  const handleNext = () => {
    SoundEngine.playClick();
    if (currentQIndex + 1 < CS_QUIZ_QUESTIONS.length) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    SoundEngine.playClick();
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
    setHistory([]);
  };

  return (
    <section id="quiz" className="section-padding" style={{
      background: 'var(--bg-paper)',
      borderBottom: 'var(--border-thick)'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <span className="brutal-badge brutal-badge-yellow font-mono" style={{ fontSize: '0.8rem' }}>
              ASSESSMENT // MASTERY CHECK
            </span>
            <span className="brutal-badge brutal-badge-mint font-mono" style={{ fontSize: '0.8rem' }}>
              THE 8 FUNDAMENTAL CONCEPTS
            </span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: '0.25rem 0'
          }}>
            THE 8 FUNDAMENTAL CONCEPTS CHALLENGE
          </h2>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.05rem',
            color: 'var(--text-muted)',
            maxWidth: '850px',
            lineHeight: 1.6
          }}>
            Test your comprehension of Algorithms, Data Structures, Complexity Metrics, Big-O Calculus, Recursion, Divide &amp; Conquer, and Brute Force principles.
          </p>
        </div>

        {/* Quiz Chassis */}
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          {!quizFinished ? (
            <div className="brutal-card" style={{ background: '#FFFFFF' }}>
              
              {/* Progress & Unit Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '2px solid #000',
                paddingBottom: '1rem',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                <span className="brutal-badge brutal-badge-blue font-mono" style={{ fontSize: '0.8rem' }}>
                  {currentQ.unit}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800 }}>
                  <span>QUESTION {currentQIndex + 1} OF {CS_QUIZ_QUESTIONS.length}</span>
                  <span style={{ background: 'var(--canary-yellow)', padding: '0.2rem 0.5rem', border: '1.5px solid #000' }}>
                    SCORE: {score}
                  </span>
                </div>
              </div>

              {/* Question Text */}
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                fontWeight: 900,
                lineHeight: 1.35,
                marginBottom: '1.75rem',
                color: 'var(--ink-black)'
              }}>
                {currentQ.question}
              </h3>

              {/* Options Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  let btnBg = '#FFFFFF';
                  let borderClr = '#000';
                  let txtClr = 'var(--ink-black)';

                  if (isAnswered) {
                    if (opt.correct) {
                      btnBg = 'var(--emerald-mint)';
                      borderClr = '#000';
                    } else if (isSelected) {
                      btnBg = 'var(--vermilion-red)';
                      txtClr = '#FFFFFF';
                      borderClr = '#000';
                    } else {
                      btnBg = '#F3F4F6';
                      txtClr = '#888';
                    }
                  } else if (isSelected) {
                    btnBg = 'var(--canary-yellow)';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className="brutal-btn"
                      style={{
                        background: btnBg,
                        color: txtClr,
                        borderColor: borderClr,
                        textAlign: 'left',
                        padding: '1rem 1.25rem',
                        fontSize: '0.95rem',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        cursor: isAnswered ? 'default' : 'pointer'
                      }}
                    >
                      <span style={{
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: isAnswered && opt.correct ? '#000' : 'rgba(0,0,0,0.1)',
                        color: isAnswered && opt.correct ? '#FFF' : 'inherit',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 900,
                        border: '1px solid #000',
                        flexShrink: 0
                      }}>
                        {['A', 'B', 'C', 'D'][idx]}
                      </span>
                      <span style={{ flex: 1 }}>{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback Explanation Banner */}
              {isAnswered && (
                <div style={{
                  background: currentQ.options[selectedOption]?.correct ? '#E6FBF5' : '#FFF0F3',
                  border: '2px solid #000',
                  padding: '1.25rem',
                  marginBottom: '1.5rem',
                  boxShadow: '3px 3px 0 #000'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: 900,
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    color: currentQ.options[selectedOption]?.correct ? 'var(--cobalt-blue)' : 'var(--vermilion-red)',
                    marginBottom: '0.4rem'
                  }}>
                    {currentQ.options[selectedOption]?.correct ? (
                      <>
                        <CheckCircle2 size={20} color="var(--cobalt-blue)" />
                        CORRECT ANALYSIS!
                      </>
                    ) : (
                      <>
                        <XCircle size={20} color="var(--vermilion-red)" />
                        INCORRECT OPTION
                      </>
                    )}
                  </div>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#222', lineHeight: 1.5 }}>
                    {currentQ.options[selectedOption]?.exp}
                  </p>
                </div>
              )}

              {/* Next Button */}
              {isAnswered && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={handleNext}
                    className="brutal-btn brutal-btn-blue"
                    style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}
                  >
                    {currentQIndex + 1 < CS_QUIZ_QUESTIONS.length ? (
                      <>NEXT QUESTION <ArrowRight size={18} /></>
                    ) : (
                      <>VIEW FINAL MASTERY SCORE <Award size={18} /></>
                    )}
                  </button>
                </div>
              )}

            </div>
          ) : (
            /* Quiz Completed View */
            <div className="brutal-card brutal-card-yellow" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
              <div style={{
                width: '72px',
                height: '72px',
                background: '#FFF',
                border: '3px solid #000',
                boxShadow: '4px 4px 0 #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <Award size={40} color="var(--cobalt-blue)" />
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 900, margin: '0 0 0.5rem' }}>
                CURRICULUM CHALLENGE COMPLETE!
              </h3>

              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '3rem',
                fontWeight: 900,
                color: 'var(--cobalt-blue)',
                margin: '1rem 0'
              }}>
                {score} / {CS_QUIZ_QUESTIONS.length}
              </div>

              <p style={{ fontSize: '1.1rem', maxWidth: '550px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
                {score === CS_QUIZ_QUESTIONS.length ? (
                  <strong>PERFECT SCORE! 🎯 You have mastered all 8 Fundamental Concepts of Algorithms!</strong>
                ) : score >= 6 ? (
                  <strong>STRONG MASTERY! ⚡ You have a solid grasp of core algorithmic principles. Review any missed concepts in the slides above.</strong>
                ) : (
                  <strong>GOOD FOUNDATION! 📚 Review the 8 Concept Slides and Asymptotic Curves above to sharpen your complexity analysis.</strong>
                )}
              </p>

              <button
                onClick={handleRestart}
                className="brutal-btn brutal-btn-red"
                style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}
              >
                <RotateCcw size={18} /> RETAKE CHALLENGE
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
