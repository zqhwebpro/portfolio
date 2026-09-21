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
              <div className="spell-icon">☝️</div>
              <div className="spell-details">
                <h3>Stage 1: Celestial Wand</h3>
                <span className="spell-gesture">Gesture: Pointing with Index Finger</span>
                <p>
                  Focuses a beam of starlight from your fingertip onto any outer zodiac node.
                  Sets the active zodiac focus and reveals its sacred star map, house, and ruling planet in the center Oculus.
                </p>
              </div>
            </div>

            <div className="spell-card highlight">
              <div className="spell-icon">🤏</div>
              <div className="spell-details">
                <h3>Stage 2: Pinch of Fate</h3>
                <span className="spell-gesture">Gesture: Pinch Index & Thumb</span>
                <p>
                  Compresses celestial stardust between fingertips. Replaces the center content with an
                  exclusive horoscope prophecy, planetary transit, celestial omen, and lucky aspect.
                </p>
              </div>
            </div>

            <div className="spell-card">
              <div className="spell-icon">✌️</div>
              <div className="spell-details">
                <h3>Stage 3: Tarot Divination</h3>
                <span className="spell-gesture">Gesture: Two-Finger Peace / V Sign</span>
                <p>
                  Transmutes the center content into your sign's corresponding Major Arcana Tarot Card,
                  complete with Roman numeral, astrological sigil, upright divination, and spiritual counsel.
                </p>
              </div>
            </div>

            <div className="spell-card">
              <div className="spell-icon">✋</div>
              <div className="spell-details">
                <h3>Stage 4: Divination Runes</h3>
                <span className="spell-gesture">Gesture: Open Palm (5 Extended Fingers)</span>
                <p>
                  Draws a 3-rune Elder Futhark spread (Past, Present, Destiny) and consecrates the designated
                  Spell Rune with its Old Norse glyph, elemental translation, and ancient incantation.
                </p>
              </div>
            </div>

            <div className="spell-card highlight">
              <div className="spell-icon">✊</div>
              <div className="spell-details">
                <h3>Stage 5: 100-Sided Fate Dice</h3>
                <span className="spell-gesture">Gesture: Clenched Arcane Fist</span>
                <p>
                  The center icon turns into a glowing 100-sided die (d100) and rolls for fate!
                  Scores between 1 and 100 reveal your celestial fate tier, from Chaotic Eclipse to Critical Triumph.
                </p>
              </div>
            </div>
          </div>

          <div className="grimoire-footer-notes">
            <h4>🔮 Astral Simulator (Mouse & Keyboard Controls)</h4>
            <div className="shortcuts-list">
              <span><kbd>1</kbd> Constellation Lore</span>
              <span><kbd>2</kbd> or <kbd>Space</kbd> Horoscope Prophecy</span>
              <span><kbd>3</kbd> Tarot Card Divination</span>
              <span><kbd>4</kbd> Elder Futhark Runes</span>
              <span><kbd>5</kbd> Roll d100 Fate Dice</span>
              <span><kbd>Drag Wheel</kbd> Rotate Astrolabe</span>
              <span><kbd>E</kbd> Transmute Element</span>
              <span><kbd>M</kbd> Mute / Unmute Audio</span>
            </div>
            {currentElement && (
              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem' }}>Cosmic Plane:</span>
                <button 
                  className="astral-btn" 
                  onClick={onCycleElement}
                  style={{ borderColor: currentElement.color, color: currentElement.color, padding: '4px 12px', fontSize: '0.8rem' }}
                >
                  {currentElement.symbol} {currentElement.name} · Click to Transmute (E)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
