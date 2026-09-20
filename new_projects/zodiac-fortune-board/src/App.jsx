import React, { useState } from 'react'
import { AstrologyBoard } from './components/AstrologyBoard'
import { OracleDisplay } from './components/OracleDisplay'
import { getRandomFortune } from './data/fortunes'
import './styles/astral.css'

function App() {
  const [activeSign, setActiveSign] = useState(null);
  const [fortune, setFortune] = useState(null);
  const [isChanneling, setIsChanneling] = useState(false);

  const handleSelectSign = (signId) => {
    if (isChanneling) return;
    
    setActiveSign(signId);
    setIsChanneling(true);
    setFortune(null);

    // Play channeling animation for a moment before revealing
    setTimeout(() => {
      setFortune(getRandomFortune());
      setIsChanneling(false);
    }, 2000); // 2 second dramatic pause
  };

  return (
    <div className={`app-container ${isChanneling ? 'shaking' : ''}`}>
      <h1 className="title-glow mystic-text">Astral Oracle</h1>
      <p className="subtitle">SELECT YOUR SIGN TO UNLEASH UNLIMITED POWER</p>
      
      <AstrologyBoard 
        onSelectSign={handleSelectSign}
        activeSign={activeSign}
        isChanneling={isChanneling}
      />

      <OracleDisplay 
        fortune={fortune}
        isChanneling={isChanneling}
      />
    </div>
  )
}

export default App
