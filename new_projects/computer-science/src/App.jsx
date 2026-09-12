import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroPlayground } from './components/HeroPlayground';
import { BigOGraph } from './components/BigOGraph';
import { RecursionStackTower } from './components/RecursionStackTower';
import { TreeGraphTraversal } from './components/TreeGraphTraversal';
import { SpatialSortingArena } from './components/SpatialSortingArena';
import { KnowledgeMatrix } from './components/KnowledgeMatrix';
import { BitwiseLogicGates } from './components/BitwiseLogicGates';
import { QuizChallenge } from './components/QuizChallenge';
import { Footer } from './components/Footer';

export function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section for navbar highlighting
  useEffect(() => {
    const sectionIds = ['hero', 'big-o', 'recursion', 'trees', 'sorting', 'matrix', 'bitwise'];
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
        <HeroPlayground />
        <div className="hazard-divider" />
        <BigOGraph />
        <div className="bauhaus-divider" />
        <RecursionStackTower />
        <div className="hazard-divider" />
        <TreeGraphTraversal />
        <div className="bauhaus-divider" />
        <SpatialSortingArena />
        <div className="hazard-divider" />
        <KnowledgeMatrix />
        <div className="bauhaus-divider" />
        <BitwiseLogicGates />
        <div className="hazard-divider" />
        <QuizChallenge />
      </main>

      <Footer />
    </div>
  );
}

export default App;
