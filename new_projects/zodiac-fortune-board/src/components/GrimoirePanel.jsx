import React from 'react';

export function GrimoirePanel({ isOpen, onClose, currentElement, onCycleElement }) {
  if (!isOpen) return null;

  return (
    <div className="grimoire-overlay" onClick={onClose}>
      <div className="grimoire-book" onClick={(e) => e.stopPropagation()}>
        <div className="grimoire-header">
          <div className="grimoire-sigil">📜</div>
          <h2>The Celestial Spellbook</h2>
          <p className="grimoire-subtitle">Grimoire of Astrological Incantations & Gesture Spells</p>
          <button className="grimoire-close" onClick={onClose}>✕</button>
        </div>

        <div className="grimoire-body">
          <div className="spell-card-grid">
            <div className="spell-card">
              <div className="spell-icon">✨</div>
              <div className="spell-details">
                <h3>Celestial Wand</h3>
                <span className="spell-gesture">Gesture: Pointing with Index Finger</span>
                <p>
                  Extends a beam of concentrated starlight from your fingertip. Hover over any
                  zodiac glyph to ignite its ancient constellation star lines and channel its ruling planetary energy.
                </p>
              </div>
            </div>

            <div className="spell-card highlight">
              <div className="spell-icon">🤏</div>
              <div className="spell-details">
                <h3>Pinch of Fate</h3>
                <span className="spell-gesture">Gesture: Pinch Index & Thumb</span>
                <p>
                  Compresses celestial stardust between fingertips. Holding charges the Oculus of Fate;
                  releasing unseals a tailored astrological omen, planetary transit, and cosmic prophecy.
                </p>
              </div>
            </div>

            <div className="spell-card">
              <div className="spell-icon">✋</div>
              <div className="spell-details">
                <h3>Celestial Supernova</h3>
                <span className="spell-gesture">Gesture: Open Palm (5 Extended Fingers)</span>
                <p>
                  Radiates a cosmic shockwave across the heavens, illuminating sacred aspect chords
                  (Trines, Sextiles, and Oppositions) that connect the 12 signs in celestial harmony.
                </p>
              </div>
            </div>

            <div className="spell-card">
              <div className="spell-icon">✌️</div>
              <div className="spell-details">
                <h3>Elemental Transmutation</h3>
                <span className="spell-gesture">Gesture: Two-Finger Peace / V Sign</span>
                <p>
                  Shifts the astral plane between the four alchemical elements: 
                  <strong style={{ color: '#ff4d4d' }}> Ignis (Fire)</strong>, 
                  <strong style={{ color: '#2ecc71' }}> Terra (Earth)</strong>, 
                  <strong style={{ color: '#00f2fe' }}> Aer (Air)</strong>, and 
                  <strong style={{ color: '#9b51e0' }}> Aqua (Water)</strong>.
                </p>
                {currentElement && (
                  <div style={{ marginTop: '8px', fontSize: '0.8rem' }}>
                    Active Element: <strong style={{ color: currentElement.color }}>{currentElement.symbol} {currentElement.name}</strong>
                    {onCycleElement && (
                      <button 
                        className="astral-btn" 
                        style={{ marginLeft: '10px', padding: '3px 10px', fontSize: '0.7rem' }} 
                        onClick={onCycleElement}
                      >
                        Transmute Now
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="spell-card">
              <div className="spell-icon">🌀</div>
              <div className="spell-details">
                <h3>Wheel of Destiny</h3>
                <span className="spell-gesture">Gesture: Hand Arc Sweep / Horizontal Drift</span>
                <p>
                  Guides the rotation of the Grand Astrolabe with celestial inertia. Move your hand in an arc
                  around the center to align the signs with the celestial equator.
                </p>
              </div>
            </div>
          </div>

          <div className="grimoire-footer-notes">
            <h4>🔮 Astral Simulator (Mouse & Keyboard Shortcuts)</h4>
            <div className="shortcuts-list">
              <span><kbd>Click / Tap</kbd> Cast Pinch of Fate</span>
              <span><kbd>Drag Center</kbd> Rotate Astrolabe</span>
              <span><kbd>E</kbd> Shift Element</span>
              <span><kbd>A</kbd> Toggle Aspect Lines</span>
              <span><kbd>M</kbd> Mute / Unmute Cosmic Sound</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
