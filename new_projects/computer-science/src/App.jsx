import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroPlayground } from './components/HeroPlayground';
import { BinarySearchUnit } from './components/BinarySearchUnit';
import { BigOGraph } from './components/BigOGraph';
import { SpatialSortingArena } from './components/SpatialSortingArena';
import { RecursionStackTower } from './components/RecursionStackTower';
import { DivideConquerArena } from './components/DivideConquerArena';
import { TreeGraphTraversal } from './components/TreeGraphTraversal';
import { QuizChallenge } from './components/QuizChallenge';
import { Footer } from './components/Footer';

export function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section for navbar highlighting
  useEffect(() => {
    const sectionIds = [
      'hero',
      'binary-search',
      'big-o',
      'sorting',
      'recursion',
      'divide-conquer',
      'graphs',
      'quiz'
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activeSection={activeSection} />
      
      <main style={{ flex: 1 }}>
        {/* Unit 01: Intro to Algorithms & Guessing Game */}
        <HeroPlayground />
        <div className="hazard-divider" />

        {/* Unit 02: Binary Search on Sorted Arrays */}
        <BinarySearchUnit />
        <div className="bauhaus-divider" />

        {/* Unit 03: Asymptotic Analysis (Big-Theta, Big-O, Big-Omega) */}
        <BigOGraph />
        <div className="hazard-divider" />

        {/* Unit 04: Selection Sort & Insertion Sort */}
        <SpatialSortingArena />
        <div className="bauhaus-divider" />

        {/* Unit 05: Recursive Algorithms & Towers of Hanoi */}
        <RecursionStackTower />
        <div className="hazard-divider" />

        {/* Unit 06: Divide & Conquer (Merge Sort & Quick Sort) */}
        <DivideConquerArena />
        <div className="bauhaus-divider" />

        {/* Unit 07: Graph Representation & Breadth-First Search */}
        <TreeGraphTraversal />
        <div className="hazard-divider" />

        {/* Unit 08: Algorithms Mastery Assessment */}
        <QuizChallenge />
      </main>

      <Footer />
    </div>
  );
}

export default App;
