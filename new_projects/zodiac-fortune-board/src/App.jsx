import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AstrologyBoard } from './components/AstrologyBoard';
import { ScryingMirror } from './components/ScryingMirror';
import { GrimoirePanel } from './components/GrimoirePanel';
import { SparkleCanvas } from './components/SparkleCanvas';
import { 
  ZODIAC_SIGNS, 
  getRandomGoal, 
  getZodiacTarot, 
  drawRuneSpread 
} from './data/fortunes';
import { useHandTracking } from './hooks/useHandTracking';
import { mysticAudio } from './utils/mysticAudio';
import velvetBg from './assets/velvet-bg.jpg';
import './styles/astral.css';

function App() {
  const [selectedSign, setSelectedSign] = useState(null);
  const [isSignLocked, setIsSignLocked] = useState(false);

  // 4 Progressive Stages: 1: Zodiac Seal | 2: Destiny Covenant | 3: Tarot | 4: Runes
  const [activeStage, setActiveStage] = useState(1);
  const [hoveredSign, setHoveredSign] = useState(null);

  // Divination state containers
  const [horoscopeGoal, setHoroscopeGoal] = useState(() => getRandomGoal(ZODIAC_SIGNS[0]));

  const [manualAspects, setManualAspects] = useState(false);
  const [isGrimoireOpen, setIsGrimoireOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // 3-Second Fist Hold State for Locking / Unlocking Selected Zodiac
  const [fistHoldProgress, setFistHoldProgress] = useState(0); // 0 to 1
  const [isFistHeld, setIsFistHeld] = useState(false);
  const [manualFistHold, setManualFistHold] = useState(false);
  const fistHoldStartTimeRef = useRef(null);
  const fistCooldownRef = useRef(false);
  const holdAnimFrameRef = useRef(null);

  const gestureCooldownRef = useRef({});

  const {
    isCameraActive,
    isReady,
    rotation,
    setRotation,
    activeSpell,
    handCoordinates,
    rawLandmarks,
    cameraError,
    startCamera,
    stopCamera,
    videoRef
  } = useHandTracking({ isLocked: isSignLocked });

  const showAspects = activeSpell === 'HORNS' || manualAspects;

  const isSignLockedRef = useRef(isSignLocked);
  useEffect(() => {
    isSignLockedRef.current = isSignLocked;
  }, [isSignLocked]);

  // Derive the zodiac sign aligned with the top Zenith (12 o'clock) as the compass spins
  const zenithSign = React.useMemo(() => {
    const normalizedAngle = (-rotation % 360 + 360) % 360;
    const zenithIdx = Math.floor((normalizedAngle + 15) % 360 / 30) % 12;
    return ZODIAC_SIGNS[zenithIdx] || ZODIAC_SIGNS[0];
  }, [rotation]);

  // When a zodiac sign is locked, it remains the active focus across all divination stages!
  const activeSign = (isSignLocked && selectedSign) ? selectedSign : zenithSign;

  // Play subtle astral tick sound as rotation scrolls past each 30-degree zodiac notch
  const lastScrolledIdxRef = useRef(0);
  useEffect(() => {
    const normalizedAngle = (-rotation % 360 + 360) % 360;
    const currentIdx = Math.floor((normalizedAngle + 15) % 360 / 30) % 12;
    if (currentIdx !== lastScrolledIdxRef.current) {
      lastScrolledIdxRef.current = currentIdx;
      mysticAudio.playAstralRotation(0.35);
    }
  }, [rotation]);

  // Derive Tarot card and Runes spread directly from the active zodiac sign
  const tarotCard = React.useMemo(() => {
    return getZodiacTarot(activeSign?.id);
  }, [activeSign?.id]);

  const runeData = React.useMemo(() => {
    return drawRuneSpread(activeSign);
  }, [activeSign]);

  // Fist 3-Second Hold Controller:
  // Holding a fist for 3 seconds locks the zenith sign.
  // Holding a fist for 3 seconds again unlocks it.
  useEffect(() => {
    const isFistActive = activeSpell === 'FIST' || manualFistHold;

    if (!isFistActive) {
      if (holdAnimFrameRef.current) {
        cancelAnimationFrame(holdAnimFrameRef.current);
        holdAnimFrameRef.current = null;
      }
      fistHoldStartTimeRef.current = null;
      fistCooldownRef.current = false;
      setFistHoldProgress(0);
      setIsFistHeld(false);
      return;
    }

    // Still holding after a successful trigger -> await release before re-triggering
    if (fistCooldownRef.current) return;

    if (!fistHoldStartTimeRef.current) {
      fistHoldStartTimeRef.current = performance.now();
      setIsFistHeld(true);
    }

    const tickHold = () => {
      if (!fistHoldStartTimeRef.current) return;
      const elapsed = performance.now() - fistHoldStartTimeRef.current;
      const progress = Math.min(elapsed / 3000, 1);
      setFistHoldProgress(progress);

      if (progress >= 1) {
        // 3 seconds completed!
        fistCooldownRef.current = true;
        fistHoldStartTimeRef.current = null;
        setFistHoldProgress(1);

        if (!isSignLockedRef.current) {
          // LOCK
          const chosen = zenithSign;
          isSignLockedRef.current = true;
          setIsSignLocked(true);
          setSelectedSign(chosen);
          setActiveStage(1);
          mysticAudio.playNodeIgnite();
          mysticAudio.playCelestialChime(4);

          const signIdx = ZODIAC_SIGNS.findIndex(s => s.id === chosen.id);
          if (signIdx !== -1) {
            setRotation(-signIdx * 30);
          }
        } else {
          // UNLOCK
          isSignLockedRef.current = false;
          setIsSignLocked(false);
          setSelectedSign(null);
          mysticAudio.playSpellCast('flare');
        }

        setTimeout(() => {
          setFistHoldProgress(0);
          setIsFistHeld(false);
        }, 350);

        return;
      }

      holdAnimFrameRef.current = requestAnimationFrame(tickHold);
    };

    holdAnimFrameRef.current = requestAnimationFrame(tickHold);

    return () => {
      if (holdAnimFrameRef.current) {
        cancelAnimationFrame(holdAnimFrameRef.current);
        holdAnimFrameRef.current = null;
      }
    };
  }, [activeSpell, manualFistHold, zenithSign, setRotation]);

  // Stage 2: Cast Destiny Covenant / Horoscope Goal Channeling
  const handleCastGoal = useCallback(() => {
    if (gestureCooldownRef.current.prophecy) return;
    gestureCooldownRef.current.prophecy = true;

    setActiveStage(2);
    mysticAudio.playSpellCast('prophecy');

    const newGoal = getRandomGoal(activeSign);
    setHoroscopeGoal(newGoal);

    setTimeout(() => {
      mysticAudio.playCelestialChime(Math.floor(Math.random() * 6));
      setTimeout(() => {
        gestureCooldownRef.current.prophecy = false;
      }, 1200);
    }, 200);
  }, [activeSign]);

  // Gesture stages controller for non-fist gestures
  useEffect(() => {
    // POINTING (☝️) Focus Stage 1
    if (activeSpell === 'POINTING') {
      requestAnimationFrame(() => {
        setActiveStage(1);
      });
    }

    // Stage 2: PEACE / V-SIGN (2 Fingers - Destiny Covenant)
    if (activeSpell === 'PEACE' && !gestureCooldownRef.current.peace) {
      gestureCooldownRef.current.peace = true;
      handleCastGoal();
      setTimeout(() => {
        gestureCooldownRef.current.peace = false;
      }, 1400);
    }

    // Stage 3: OPEN_PALM (Open Hand - Major Arcana Tarot Card Display)
    if (activeSpell === 'OPEN_PALM' && !gestureCooldownRef.current.tarot) {
      gestureCooldownRef.current.tarot = true;
      setActiveStage(3);
      mysticAudio.playTarotDraw();
      setTimeout(() => {
        gestureCooldownRef.current.tarot = false;
      }, 1400);
    }

    // Stage 4: HORNS (Mystic Horns 🤘 - Witches' 3 Sacred Runes)
    if (activeSpell === 'HORNS' && !gestureCooldownRef.current.runes) {
      gestureCooldownRef.current.runes = true;
      setActiveStage(4);
      mysticAudio.playRuneCast();
      setTimeout(() => {
        gestureCooldownRef.current.runes = false;
      }, 1400);
    }
  }, [activeSpell, handleCastGoal]);

  // Toggle Camera
  const handleToggleCamera = () => {
    if (isCameraActive) {
      stopCamera();
    } else {
      mysticAudio.startCosmicDrone();
      startCamera();
    }
  };

  // Toggle Audio Mute
  const handleToggleAudio = () => {
    const muted = mysticAudio.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      mysticAudio.startCosmicDrone();
    }
  };

  // Keyboard Shortcuts for Astral Simulator
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleCastGoal();
      } else if (e.key === '1' || e.key === 'Enter') {
        setManualFistHold(true);
      } else if (e.key === '2') {
        handleCastGoal();
      } else if (e.key === '3') {
        setActiveStage(3);
        mysticAudio.playTarotDraw();
      } else if (e.key === '4') {
        setActiveStage(4);
        mysticAudio.playRuneCast();
      } else if (e.key.toLowerCase() === 'a') {
        setManualAspects(prev => !prev);
        mysticAudio.playSpellCast('flare');
      } else if (e.key.toLowerCase() === 'm') {
        handleToggleAudio();
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === '1' || e.key === 'Enter') {
        setManualFistHold(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleCastGoal]);

  const handleHoverSign = (sign) => {
    setHoveredSign(sign);
  };

  const handleLeaveSign = () => {
    setHoveredSign(null);
  };

  const handleSelectSign = (sign) => {
    if (isSignLocked && selectedSign?.id === sign.id) {
      // Toggle off / unlock
      isSignLockedRef.current = false;
      setIsSignLocked(false);
      setSelectedSign(null);
      mysticAudio.playSpellCast('flare');
      return;
    }

    const chosen = sign;
    isSignLockedRef.current = true;
    setIsSignLocked(true);
    setSelectedSign(chosen);
    setHoveredSign(null);
    mysticAudio.playNodeIgnite();
    mysticAudio.playCelestialChime(4);

    // Smoothly rotate the wheel so the chosen sign aligns at the top Zenith
    const signIdx = ZODIAC_SIGNS.findIndex(s => s.id === chosen.id);
    if (signIdx !== -1) {
      setRotation(-signIdx * 30);
    }
  };

  const handleWheelRotate = (delta) => {
    // If sign is locked, prevent rotation drift
    if (isSignLocked) return;
    setRotation(prev => prev + delta);
    mysticAudio.playAstralRotation(delta * 0.05);
  };

  return (
    <div className="universe-container">
      <div 
        className="universe-bg"
        style={{
          backgroundImage: `radial-gradient(ellipse at center, rgba(18, 2, 6, 0.38) 0%, rgba(10, 1, 4, 0.72) 55%, rgba(4, 0, 1, 0.95) 100%), url(${velvetBg})`,
          zIndex: 0
        }}
      ></div>
      <div className="celestial-body"></div>
      <SparkleCanvas 
        handCoordinates={handCoordinates} 
        rawLandmarks={rawLandmarks} 
        isCameraActive={isCameraActive} 
      />

      {/* Top Header & Arcane Controls */}
      <header className="site-header">
        <div className="header-titles">
          <h1>Tarot & Zodiac Divination Compass</h1>
          <p className="realm-tagline">Mystic Cartomancy · Ancient Astrolabe · Gesture Spells</p>
        </div>

        <div className="header-actions">
          <a href="../index.html" className="astral-btn back-btn">
            <i className="fa-solid fa-arrow-left"></i> Back to Projects
          </a>

          {/* Audio Mute/Unmute */}
          <button 
            className="astral-btn icon-btn" 
            onClick={handleToggleAudio}
            title={isMuted ? "Unmute Cosmic Audio" : "Mute Cosmic Audio"}
          >
            <i className={`fa-solid ${isMuted ? 'fa-volume-xmark' : 'fa-volume-high'}`}></i>
          </button>
        </div>
      </header>

      {/* Main Astrolabe Horoscope Compass */}
      <div className="board-container">
        <AstrologyBoard
          signs={ZODIAC_SIGNS}
          activeSign={activeSign}
          selectedSign={selectedSign}
          hoveredSign={hoveredSign}
          zenithSign={zenithSign}
          isSignLocked={isSignLocked}
          onHoverSign={handleHoverSign}
          onLeaveSign={handleLeaveSign}
          onSelectSign={handleSelectSign}
          horoscopeGoal={horoscopeGoal}
          rotation={rotation}
          onWheelRotate={handleWheelRotate}
          showAspects={showAspects}
          activeSpell={activeSpell}
          activeStage={activeStage}
          onSelectStage={(stage) => {
            setActiveStage(stage);
            if (stage === 2) handleCastGoal();
            if (stage === 3) mysticAudio.playTarotDraw();
            if (stage === 4) mysticAudio.playRuneCast();
          }}
          onCastGoalSpell={handleCastGoal}
          tarotCard={tarotCard}
          runeData={runeData}
          fistHoldProgress={fistHoldProgress}
          isFistHeld={isFistHeld}
          onStartFistHold={() => setManualFistHold(true)}
          onEndFistHold={() => setManualFistHold(false)}
        />
      </div>

      {/* Arcane Scrying Glass (Webcam PIP) */}
      <ScryingMirror
        videoRef={videoRef}
        isCameraActive={isCameraActive}
        isReady={isReady}
        activeSpell={activeSpell}
        rawLandmarks={rawLandmarks}
        onToggleCamera={handleToggleCamera}
        cameraError={cameraError}
        isSignLocked={isSignLocked}
        selectedSign={selectedSign}
        fistHoldProgress={fistHoldProgress}
        isFistHeld={isFistHeld}
      />

      {/* Grimoire Spellbook Drawer */}
      <GrimoirePanel
        isOpen={isGrimoireOpen}
        onClose={() => setIsGrimoireOpen(false)}
      />
    </div>
  );
}

export default App;
