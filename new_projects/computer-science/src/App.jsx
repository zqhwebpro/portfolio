import React from 'react';
import { ConceptSlides } from './components/ConceptSlides';

export function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      <main style={{ flex: 1 }}>
        <ConceptSlides />
      </main>
    </div>
  );
}

export default App;

