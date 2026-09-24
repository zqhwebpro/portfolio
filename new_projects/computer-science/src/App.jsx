import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ConceptSlides } from './components/ConceptSlides';
import { ReferenceTable } from './components/ReferenceTable';
import { Footer } from './components/Footer';
import { CONCEPTS } from './utils/csData';

export function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (index) => {
    setActiveIndex(index);
    const concept = CONCEPTS[index];
    if (concept) {
      const el = document.getElementById(`concept-${concept.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      <Navbar activeIndex={activeIndex} onSelect={handleSelect} />
      <main style={{ flex: 1 }}>
        <HeroSection onSelect={handleSelect} />
        <ConceptSlides activeIndex={activeIndex} onSelect={handleSelect} />
        <ReferenceTable onSelect={handleSelect} />
      </main>
      <Footer onSelect={handleSelect} />
    </div>
  );
}

export default App;
