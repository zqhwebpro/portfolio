import React from 'react';

export function GrimoirePanel({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="grimoire-overlay" onClick={onClose}>
      <div className="grimoire-book" onClick={(e) => e.stopPropagation()}>
        <div className="grimoire-header">
          <div className="grimoire-sigil">📜</div>
          <h2>The Celestial Spellbook</h2>
          <p className="grimoire-subtitle">Grimoire of Astrological Quests and Gesture Spells</p>
          <button className="grimoire-close" onClick={onClose}>✕</button>
        </div>

        <div className="grimoire-body">
          <div className="spell-card-grid">
            <div className="spell-card highlight">
              <div className="spell-icon">✊</div>
              <div className="spell-details">
                <h3>Stage 1: Select Sign on Board</h3>
                <span className="spell-gesture">Gesture: Clenched Fist (✊)</span>
                <p>
                  Clench your hand into a fist to select and choose the star sign on the board.
                  Once chosen, pointing will no longer change the sign, securing your celestial focus.
                  (You can aim with ☝️ Point or click directly on any constellation node).
                </p>
              </div>
            </div>

            <div className="spell-card">
              <div className="spell-icon">✌️</div>
              <div className="spell-details">
                <h3>Stage 2: Summary Horoscope</h3>
                <span className="spell-gesture">Gesture: 2 Fingers (Peace / V-Sign)</span>
                <p>
                  Extends index and middle fingers in a peace sign to summon a clear, single-summary
                  astrological horoscope prophecy for the active star sign.
                </p>
              </div>
            </div>

            <div className="spell-card">
              <div className="spell-icon">✋</div>
              <div className="spell-details">
                <h3>Stage 3: Tarot Card Display</h3>
                <span className="spell-gesture">Gesture: Open Palm (All Fingers Extended)</span>
                <p>
                  Radiate all five fingers wide to unveil an authentic consecrated Major Arcana Tarot Card
                  complete with Roman numeral, astrological sigil, and sovereign upright guidance.
                </p>
              </div>
            </div>

            <div className="spell-card">
              <div className="spell-icon">🤘</div>
              <div className="spell-details">
                <h3>Stage 4: 3 Sacred Runes</h3>
                <span className="spell-gesture">Gesture: Mystic Horns (Index + Pinky)</span>
                <p>
                  Form the sacred Witches' Horns to cast 3 Elder Futhark obsidian runestones:
                  Past Origin (Wyrd), Present Crucible (Hamingja), and Destiny Outcome (Orlog).
                </p>
              </div>
            </div>
          </div>

          <div className="grimoire-footer-notes">
            <h4>Astrological Compass Controls</h4>
            <div className="shortcuts-list">
              <span><kbd>✊ Fist</kbd> or <kbd>1</kbd> Select sign on board</span>
              <span><kbd>2</kbd> or <kbd>Space</kbd> Summary Horoscope</span>
              <span><kbd>3</kbd> Major Arcana Tarot Card</span>
              <span><kbd>4</kbd> 3 Elder Futhark Runes</span>
              <span><kbd>Drag Rim</kbd> Rotate Compass Smoothly</span>
              <span><kbd>M</kbd> Mute / Unmute Audio</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
