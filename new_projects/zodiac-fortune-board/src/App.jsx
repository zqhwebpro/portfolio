import React, { useState, useEffect, useRef } from 'react'
import { AstrologyBoard } from './components/AstrologyBoard'
import { SparkleCanvas } from './components/SparkleCanvas'
import { ZODIAC_SIGNS, getRandomFortune } from './data/fortunes'
import { useHandTracking } from './hooks/useHandTracking'
import './styles/astral.css'

function App() {
  const [activeSign, setActiveSign] = useState(null);
  const [fortune, setFortune] = useState('Awaiting Channeling...');
  const [isChanneling, setIsChanneling] = useState(false);
  const spellCooldown = useRef(false);

  const { isCameraActive, isReady, rotation, isPinching, handCoordinates, startCamera, stopCamera, videoRef } = useHandTracking();

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

  // Handle Spell Casting via Pinch Gesture
  useEffect(() => {
    if (isPinching && !spellCooldown.current) {
      spellCooldown.current = true;
      setFortune('✨ Casting Spell... ✨');
      setIsChanneling(true);
      
      setTimeout(() => {
        setFortune(getRandomFortune());
        setIsChanneling(false);
        setTimeout(() => { spellCooldown.current = false; }, 2000);
      }, 800);
    }
  }, [isPinching]);

  return (
    <>
      <div className="universe-bg"></div>
      <div className="celestial-body"></div>

      {/* Magical Sparkle Particle System */}
      <SparkleCanvas handCoordinates={handCoordinates} isCameraActive={isCameraActive} />

      <header className="site-header">
          <h1>Zodiac Fortune Board</h1>
          <a href="../index.html" className="back-btn">
              <i className="fa-solid fa-arrow-left"></i> Return to Realm
          </a>
          <div className="camera-controls" style={{ marginTop: '15px' }}>
            {!isCameraActive ? (
              <button 
                onClick={startCamera} 
                disabled={!isReady}
                className="back-btn" 
                style={{ cursor: isReady ? 'pointer' : 'wait' }}
              >
                <i className="fa-solid fa-video"></i> {isReady ? 'Connect Camera' : 'Loading Magick...'}
              </button>
            ) : (
              <button onClick={stopCamera} className="back-btn" style={{ borderColor: 'var(--tribal-accent)', color: 'var(--tribal-accent)' }}>
                <i className="fa-solid fa-video-slash"></i> Disconnect
              </button>
            )}
          </div>
      </header>

      {/* Picture-in-Picture Webcam View */}
      <video 
        ref={videoRef} 
        className={isCameraActive ? "mystic-camera-frame" : ""}
        style={{ display: isCameraActive ? 'block' : 'none' }} 
        autoPlay 
        playsInline
      ></video>

      <div className="board-container">
        <AstrologyBoard 
          signs={ZODIAC_SIGNS}
          activeSign={activeSign}
          onHoverSign={handleSelectSign}
          onLeaveSign={handleMouseLeave}
          fortune={fortune}
          rotation={rotation}
        />
      </div>
    </>
  )
}

export default App
