import React, { useState } from 'react'
import { AstrologyBoard } from './components/AstrologyBoard'
import { ZODIAC_SIGNS, getRandomFortune } from './data/fortunes'
import './styles/astral.css'

function App() {
  const [activeSign, setActiveSign] = useState(null);
  const [fortune, setFortune] = useState('Awaiting Channeling...');
  const [isChanneling, setIsChanneling] = useState(false);

  const handleSelectSign = (sign) => {
    setActiveSign(sign);
    setIsChanneling(true);
    setFortune('Channeling...');
    
    // Quick timeout to simulate reading
    setTimeout(() => {
      setFortune(getRandomFortune());
      setIsChanneling(false);
    }, 800);
  };

  const handleMouseLeave = () => {
    setActiveSign(null);
    setFortune('Awaiting Channeling...');
  };

  return (
    <>
      <div className="universe-bg"></div>
      <div className="celestial-body"></div>

      <header className="site-header">
          <h1>Zodiac Fortune Board</h1>
          <a href="../index.html" className="back-btn">
              <i className="fa-solid fa-arrow-left"></i> Return to Realm
          </a>
      </header>

      <div className="board-container">
        <AstrologyBoard 
          signs={ZODIAC_SIGNS}
          activeSign={activeSign}
          onHoverSign={handleSelectSign}
          onLeaveSign={handleMouseLeave}
          fortune={fortune}
        />
      </div>
    </>
  )
}

export default App
