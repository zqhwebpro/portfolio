import React from 'react';

export function TarotIllustration({ signId, className = '' }) {
  const id = (signId || 'aries').toLowerCase();

  return (
    <svg 
      className={`tarot-svg-artwork ${className}`} 
      viewBox="0 0 200 240" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Mystic Gold Foil Gradients */}
        <linearGradient id="tarotGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff2a3" />
          <stop offset="35%" stopColor="#d4af37" />
          <stop offset="70%" stopColor="#aa7c11" />
          <stop offset="100%" stopColor="#ffd700" />
        </linearGradient>

        <radialGradient id="tarotSunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe680" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#d4af37" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#20030a" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="tarotSkyNight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#140207" />
          <stop offset="60%" stopColor="#2c0510" />
          <stop offset="100%" stopColor="#48091a" />
        </linearGradient>

        <linearGradient id="tarotCrimson" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff4d6d" />
          <stop offset="50%" stopColor="#a01a35" />
          <stop offset="100%" stopColor="#4a0412" />
        </linearGradient>

        {/* Clip path for the classic arched Tarot window */}
        <clipPath id="tarotArchClip">
          <path d="M 12 50 C 12 24, 45 12, 100 12 C 155 12, 188 24, 188 50 L 188 228 L 12 228 Z" />
        </clipPath>
      </defs>

      {/* Arched Illustration Frame Background */}
      <g clipPath="url(#tarotArchClip)">
        <rect x="10" y="10" width="180" height="220" fill="url(#tarotSkyNight)" />

        {/* Dynamic Card Illustration by Zodiac Sign */}
        {id === 'aries' && (
          /* IV: THE EMPEROR - Sovereign Ram Throne & Solar Scepter */
          <g>
            <circle cx="100" cy="85" r="55" fill="url(#tarotSunGlow)" />
            {/* Craggy Martian Mountains */}
            <polygon points="10,228 50,130 90,228" fill="#3a101d" stroke="#d4af37" strokeWidth="1" />
            <polygon points="70,228 120,115 165,228" fill="#4d1222" stroke="#d4af37" strokeWidth="1" />
            <polygon points="135,228 175,140 190,228" fill="#300d16" stroke="#d4af37" strokeWidth="1" />
            {/* Stone Throne with Ram Heads */}
            <rect x="68" y="95" width="64" height="110" fill="#24050e" stroke="url(#tarotGold)" strokeWidth="1.8" rx="4" />
            <path d="M 62 105 C 50 90, 52 120, 68 125" fill="none" stroke="url(#tarotGold)" strokeWidth="2.5" />
            <path d="M 138 105 C 150 90, 148 120, 132 125" fill="none" stroke="url(#tarotGold)" strokeWidth="2.5" />
            {/* Crowned Sovereign Monarch Silhouette with Scepter */}
            <circle cx="100" cy="115" r="14" fill="url(#tarotGold)" />
            <polygon points="90,105 95,95 100,102 105,95 110,105" fill="#ffd700" />
            <path d="M 85 130 Q 100 125 115 130 L 120 185 Q 100 190 80 185 Z" fill="url(#tarotCrimson)" stroke="url(#tarotGold)" strokeWidth="1.5" />
            {/* Ankh Scepter */}
            <line x1="125" y1="120" x2="125" y2="185" stroke="url(#tarotGold)" strokeWidth="2.2" />
            <circle cx="125" cy="115" r="5" fill="none" stroke="url(#tarotGold)" strokeWidth="1.8" />
            <line x1="120" y1="122" x2="130" y2="122" stroke="url(#tarotGold)" strokeWidth="1.8" />
            {/* Stars */}
            <circle cx="45" cy="45" r="1.5" fill="#fff" /><circle cx="155" cy="40" r="1.5" fill="#fff" />
          </g>
        )}

        {id === 'taurus' && (
          /* V: THE HIEROPHANT - Sacred Temple Pillars & Crossed Keys */
          <g>
            <circle cx="100" cy="80" r="50" fill="url(#tarotSunGlow)" />
            {/* Twin Temple Pillars */}
            <rect x="24" y="55" width="22" height="170" fill="#280612" stroke="url(#tarotGold)" strokeWidth="1.8" />
            <rect x="20" y="50" width="30" height="8" fill="url(#tarotGold)" />
            <rect x="154" y="55" width="22" height="170" fill="#280612" stroke="url(#tarotGold)" strokeWidth="1.8" />
            <rect x="150" y="50" width="30" height="8" fill="url(#tarotGold)" />
            {/* Hierophant Figure */}
            <circle cx="100" cy="95" r="13" fill="url(#tarotGold)" />
            {/* Triple Tiara */}
            <polygon points="92,85 100,70 108,85" fill="url(#tarotGold)" stroke="#ffd700" />
            <line x1="90" y1="80" x2="110" y2="80" stroke="#fff" strokeWidth="1.2" />
            <path d="M 80 112 Q 100 108 120 112 L 125 185 L 75 185 Z" fill="#400818" stroke="url(#tarotGold)" strokeWidth="1.5" />
            {/* Raised Hand of Benediction & Papal Cross */}
            <line x1="128" y1="90" x2="128" y2="170" stroke="url(#tarotGold)" strokeWidth="2" />
            <line x1="122" y1="98" x2="134" y2="98" stroke="url(#tarotGold)" strokeWidth="1.5" />
            <line x1="124" y1="106" x2="132" y2="106" stroke="url(#tarotGold)" strokeWidth="1.5" />
            {/* Crossed Golden Keys of Heaven */}
            <line x1="88" y1="195" x2="112" y2="215" stroke="url(#tarotGold)" strokeWidth="2.5" />
            <line x1="112" y1="195" x2="88" y2="215" stroke="url(#tarotGold)" strokeWidth="2.5" />
            <circle cx="86" cy="193" r="4" fill="none" stroke="url(#tarotGold)" strokeWidth="1.5" />
            <circle cx="114" cy="193" r="4" fill="none" stroke="url(#tarotGold)" strokeWidth="1.5" />
          </g>
        )}

        {id === 'gemini' && (
          /* VI: THE LOVERS - Winged Archangel & Twin Celestial Souls */
          <g>
            {/* Golden Radiating Sun */}
            <circle cx="100" cy="50" r="30" fill="url(#tarotSunGlow)" />
            <line x1="100" y1="15" x2="100" y2="5" stroke="url(#tarotGold)" strokeWidth="2" />
            <line x1="125" y1="25" x2="135" y2="15" stroke="url(#tarotGold)" strokeWidth="2" />
            <line x1="75" y1="25" x2="65" y2="15" stroke="url(#tarotGold)" strokeWidth="2" />
            {/* Archangel Raphael Outstretched Wings */}
            <path d="M 100 70 Q 50 35 25 75 Q 60 90 90 85 Z" fill="url(#tarotCrimson)" stroke="url(#tarotGold)" strokeWidth="1.5" />
            <path d="M 100 70 Q 150 35 175 75 Q 140 90 110 85 Z" fill="url(#tarotCrimson)" stroke="url(#tarotGold)" strokeWidth="1.5" />
            <circle cx="100" cy="72" r="11" fill="url(#tarotGold)" />
            {/* Twin Souls Looking to Heavens */}
            <circle cx="65" cy="140" r="10" fill="url(#tarotGold)" />
            <path d="M 55 152 Q 65 148 75 152 L 78 215 L 52 215 Z" fill="#2c0612" stroke="url(#tarotGold)" strokeWidth="1.2" />
            <circle cx="135" cy="140" r="10" fill="url(#tarotGold)" />
            <path d="M 125 152 Q 135 148 145 152 L 148 215 L 122 215 Z" fill="#2c0612" stroke="url(#tarotGold)" strokeWidth="1.2" />
            {/* Tree of Life & Constellation Arcs */}
            <path d="M 35 215 Q 35 140 28 130" stroke="url(#tarotGold)" strokeWidth="2" fill="none" />
            <circle cx="28" cy="130" r="6" fill="#ffe259" />
          </g>
        )}

        {id === 'cancer' && (
          /* VII: THE CHARIOT - Winged Sphinxes & Star Canopy */
          <g>
            <circle cx="100" cy="70" r="45" fill="url(#tarotSunGlow)" />
            {/* Starry Canopy */}
            <path d="M 35 50 L 165 50 L 150 85 L 50 85 Z" fill="#26050e" stroke="url(#tarotGold)" strokeWidth="1.5" />
            <circle cx="65" cy="65" r="2" fill="#fff" /><circle cx="100" cy="65" r="2.5" fill="#ffd700" /><circle cx="135" cy="65" r="2" fill="#fff" />
            {/* Armored Charioteer */}
            <circle cx="100" cy="100" r="12" fill="url(#tarotGold)" />
            <polygon points="90,92 100,82 110,92" fill="#ffd700" />
            <path d="M 85 115 L 115 115 L 118 165 L 82 165 Z" fill="#3a0815" stroke="url(#tarotGold)" strokeWidth="1.4" />
            {/* Stone Chariot Body */}
            <rect x="60" y="155" width="80" height="45" fill="#20040b" stroke="url(#tarotGold)" strokeWidth="2" rx="4" />
            {/* Twin Sphinxes (Dark & Light) */}
            <path d="M 30 190 Q 55 175 60 215 L 20 215 Z" fill="#000000" stroke="url(#tarotGold)" strokeWidth="1.5" />
            <path d="M 170 190 Q 145 175 140 215 L 180 215 Z" fill="#ffffff" stroke="url(#tarotGold)" strokeWidth="1.5" />
          </g>
        )}

        {id === 'leo' && (
          /* VIII: STRENGTH - Maiden with Infinity Halo & Solar Lion */
          <g>
            <circle cx="100" cy="75" r="50" fill="url(#tarotSunGlow)" />
            {/* Floating Infinity Symbol Halo (Lemniscate) */}
            <path d="M 86 52 C 80 44, 72 44, 72 52 C 72 60, 80 60, 86 52 C 92 44, 100 44, 100 52 C 100 60, 92 60, 86 52" fill="none" stroke="#ffd700" strokeWidth="2.8" />
            {/* Serene White Maiden */}
            <circle cx="86" cy="75" r="12" fill="url(#tarotGold)" />
            <path d="M 74 90 Q 86 85 98 90 L 102 180 L 70 180 Z" fill="#fff5ea" stroke="url(#tarotGold)" strokeWidth="1.5" />
            {/* Majestic Celestial Lion Head & Mane */}
            <circle cx="130" cy="120" r="28" fill="url(#tarotSunGlow)" />
            <path d="M 110 100 Q 135 85 155 110 Q 165 140 145 160 Q 120 165 115 140 Z" fill="#804000" stroke="url(#tarotGold)" strokeWidth="2" />
            <polygon points="120,125 132,120 130,135" fill="#ffd700" />
            {/* Flowing Garland of Sacred Blossoms */}
            <path d="M 70 110 Q 100 130 135 115" fill="none" stroke="#ff4d6d" strokeWidth="2.5" strokeDasharray="3,3" />
          </g>
        )}

        {id === 'virgo' && (
          /* IX: THE HERMIT - Mountain Sage with Star Lantern */
          <g>
            {/* Starry Night Summit */}
            <circle cx="130" cy="65" r="35" fill="url(#tarotSunGlow)" />
            <polygon points="20,228 100,165 180,228" fill="#25050f" stroke="url(#tarotGold)" strokeWidth="1.5" />
            {/* Hooded Sage Silhouette */}
            <path d="M 65 105 Q 85 85 100 105 L 115 205 L 55 205 Z" fill="#160208" stroke="url(#tarotGold)" strokeWidth="1.8" />
            <circle cx="82" cy="115" r="8" fill="url(#tarotGold)" />
            {/* Golden Staff of Wisdom */}
            <line x1="58" y1="95" x2="58" y2="225" stroke="url(#tarotGold)" strokeWidth="2.5" />
            {/* The Six-Pointed Star Lantern Held Aloft */}
            <rect x="115" y="80" width="22" height="30" fill="#20040d" stroke="url(#tarotGold)" strokeWidth="2" rx="3" />
            <line x1="100" y1="105" x2="115" y2="95" stroke="url(#tarotGold)" strokeWidth="2" />
            {/* Blazing Star inside Lantern */}
            <polygon points="126,86 130,96 122,96" fill="#ffffff" />
            <polygon points="126,98 130,88 122,88" fill="#ffffff" />
            <circle cx="126" cy="92" r="16" fill="url(#tarotSunGlow)" />
          </g>
        )}

        {id === 'libra' && (
          /* XI: JUSTICE - Enthroned Goddess with Sword & Golden Scales */
          <g>
            <circle cx="100" cy="75" r="50" fill="url(#tarotSunGlow)" />
            {/* Pillars of Equilibrium */}
            <rect x="22" y="55" width="18" height="170" fill="#26050e" stroke="url(#tarotGold)" strokeWidth="1.5" />
            <rect x="160" y="55" width="18" height="170" fill="#26050e" stroke="url(#tarotGold)" strokeWidth="1.5" />
            {/* Enthroned Goddess */}
            <circle cx="100" cy="85" r="13" fill="url(#tarotGold)" />
            <rect x="90" y="83" width="20" height="4" fill="#ffffff" />
            <path d="M 80 102 Q 100 98 120 102 L 125 185 L 75 185 Z" fill="#800f2f" stroke="url(#tarotGold)" strokeWidth="1.5" />
            {/* Upright Double-Edged Sword of Truth */}
            <line x1="72" y1="70" x2="72" y2="145" stroke="#ffffff" strokeWidth="2.5" />
            <line x1="64" y1="130" x2="80" y2="130" stroke="url(#tarotGold)" strokeWidth="2" />
            {/* Balanced Golden Scales */}
            <line x1="120" y1="85" x2="155" y2="85" stroke="url(#tarotGold)" strokeWidth="2" />
            <line x1="124" y1="85" x2="118" y2="105" stroke="url(#tarotGold)" strokeWidth="1.2" />
            <line x1="151" y1="85" x2="157" y2="105" stroke="url(#tarotGold)" strokeWidth="1.2" />
            <path d="M 112 105 Q 118 112 124 105 Z" fill="url(#tarotGold)" />
            <path d="M 151 105 Q 157 112 163 105 Z" fill="url(#tarotGold)" />
          </g>
        )}

        {id === 'scorpio' && (
          /* XIII: DEATH / THE PHOENIX - Rising Firebird of Metamorphosis */
          <g>
            <circle cx="100" cy="120" r="55" fill="url(#tarotSunGlow)" />
            {/* Rising Sun of Dawn */}
            <circle cx="100" cy="180" r="30" fill="#ffd700" />
            {/* Immortal Phoenix Wings of Flame */}
            <path d="M 100 135 Q 60 70 20 95 Q 55 130 85 145 Z" fill="url(#tarotCrimson)" stroke="url(#tarotGold)" strokeWidth="1.8" />
            <path d="M 100 135 Q 140 70 180 95 Q 145 130 115 145 Z" fill="url(#tarotCrimson)" stroke="url(#tarotGold)" strokeWidth="1.8" />
            {/* Phoenix Head & Crest */}
            <circle cx="100" cy="115" r="9" fill="url(#tarotGold)" />
            <polygon points="97,108 100,95 103,108" fill="#ffd700" />
            {/* Black Banner with Mystic White Rose */}
            <line x1="35" y1="60" x2="35" y2="200" stroke="url(#tarotGold)" strokeWidth="2" />
            <polygon points="35,60 85,75 35,90" fill="#140207" stroke="url(#tarotGold)" strokeWidth="1.2" />
            <circle cx="55" cy="75" r="6" fill="#ffffff" stroke="#ffd700" strokeWidth="1" />
          </g>
        )}

        {id === 'sagittarius' && (
          /* XIV: TEMPERANCE - Winged Alchemical Angel with Chalices */
          <g>
            <circle cx="100" cy="65" r="45" fill="url(#tarotSunGlow)" />
            {/* Golden Solar Crest on Brow */}
            <circle cx="100" cy="72" r="12" fill="url(#tarotGold)" />
            <circle cx="100" cy="64" r="4" fill="#ffd700" />
            {/* Great Angelic Wings */}
            <path d="M 100 85 Q 40 40 18 90 Q 55 110 88 105 Z" fill="url(#tarotCrimson)" stroke="url(#tarotGold)" strokeWidth="1.5" />
            <path d="M 100 85 Q 160 40 182 90 Q 145 110 112 105 Z" fill="url(#tarotCrimson)" stroke="url(#tarotGold)" strokeWidth="1.5" />
            {/* Flowing White Robes */}
            <path d="M 85 100 Q 100 95 115 100 L 125 195 L 75 195 Z" fill="#ffffff" stroke="url(#tarotGold)" strokeWidth="1.5" />
            {/* Silver & Gold Chalices with Arc of Living Water */}
            <path d="M 72 115 Q 78 128 84 115 Z" fill="url(#tarotGold)" />
            <path d="M 116 135 Q 122 148 128 135 Z" fill="#e0e0e0" />
            {/* Stream of Living Starlight Pouring Between Chalices */}
            <path d="M 78 115 Q 100 120 122 135" fill="none" stroke="#00ffff" strokeWidth="2.5" />
          </g>
        )}

        {id === 'capricorn' && (
          /* XV: THE DEVIL / PAN - Horned God of Mastery & Loose Chains */
          <g>
            <circle cx="100" cy="85" r="50" fill="url(#tarotSunGlow)" />
            {/* Inverted Pentagram of Earth Power */}
            <polygon points="100,58 107,75 90,65 110,65 93,75" fill="none" stroke="#ffd700" strokeWidth="1.5" />
            {/* Great Horned Deity Crown */}
            <circle cx="100" cy="88" r="14" fill="url(#tarotGold)" />
            <path d="M 90 82 C 70 60, 60 75, 75 88" fill="none" stroke="url(#tarotGold)" strokeWidth="2.5" />
            <path d="M 110 82 C 130 60, 140 75, 125 88" fill="none" stroke="url(#tarotGold)" strokeWidth="2.5" />
            {/* Torso & Stone Altar */}
            <path d="M 80 105 L 120 105 L 128 160 L 72 160 Z" fill="#320612" stroke="url(#tarotGold)" strokeWidth="1.5" />
            <rect x="65" y="160" width="70" height="50" fill="#1a0309" stroke="url(#tarotGold)" strokeWidth="2" />
            {/* Blazing Downward Torch */}
            <line x1="60" y1="95" x2="60" y2="135" stroke="url(#tarotGold)" strokeWidth="2.5" />
            <polygon points="56,135 60,148 64,135" fill="#ff4d00" />
            {/* Broken/Loose Rings of Liberation */}
            <circle cx="85" cy="180" r="7" fill="none" stroke="#ffd700" strokeWidth="1.8" strokeDasharray="6,4" />
            <circle cx="115" cy="180" r="7" fill="none" stroke="#ffd700" strokeWidth="1.8" strokeDasharray="6,4" />
          </g>
        )}

        {id === 'aquarius' && (
          /* XVII: THE STAR - Maiden Pouring Celestial Waters Under 8-Pointed Star */
          <g>
            {/* Great 8-Pointed Celestial Star */}
            <circle cx="100" cy="50" r="35" fill="url(#tarotSunGlow)" />
            <polygon points="100,25 104,45 125,50 104,55 100,75 96,55 75,50 96,45" fill="#ffd700" />
            <polygon points="100,32 103,46 118,50 103,54 100,68 97,54 82,50 97,46" fill="#ffffff" />
            {/* 7 Surrounding Lesser Stars */}
            <circle cx="45" cy="40" r="2.5" fill="#ffd700" /><circle cx="155" cy="40" r="2.5" fill="#ffd700" />
            <circle cx="30" cy="70" r="2" fill="#fff" /><circle cx="170" cy="70" r="2" fill="#fff" />
            {/* Celestial Maiden */}
            <circle cx="100" cy="105" r="11" fill="url(#tarotGold)" />
            <path d="M 88 120 Q 100 115 112 120 L 115 185 L 85 185 Z" fill="#e8f4fd" stroke="url(#tarotGold)" strokeWidth="1.5" />
            {/* Two Urns of Living Consciousness */}
            <path d="M 68 135 Q 74 150 80 135 Z" fill="url(#tarotGold)" />
            <path d="M 120 135 Q 126 150 132 135 Z" fill="url(#tarotGold)" />
            {/* Streams of Water to Earth and Pool */}
            <path d="M 74 140 Q 50 160 40 215" fill="none" stroke="#00ffff" strokeWidth="2.5" />
            <path d="M 126 140 Q 150 160 160 215" fill="none" stroke="#00ffff" strokeWidth="2.5" />
            {/* Pool of Life */}
            <ellipse cx="100" cy="215" rx="65" ry="14" fill="#1a040b" stroke="url(#tarotGold)" strokeWidth="1.5" />
          </g>
        )}

        {id === 'pisces' && (
          /* XVIII: THE MOON - Full Moon Face, Twin Towers, & Wolf/Hound */
          <g>
            {/* Golden Radiating Full Moon with Serene Profile */}
            <circle cx="100" cy="55" r="38" fill="url(#tarotSunGlow)" />
            <circle cx="100" cy="55" r="26" fill="#ffd700" stroke="url(#tarotGold)" strokeWidth="1.5" />
            <path d="M 100 30 A 25 25 0 0 1 100 80 A 25 25 0 0 0 100 30" fill="#fff2a3" />
            {/* Drops of Celestial Dew falling from Moon */}
            <circle cx="75" cy="85" r="2" fill="#ffd700" /><circle cx="125" cy="85" r="2" fill="#ffd700" />
            <circle cx="100" cy="98" r="2.5" fill="#ffd700" />
            {/* Twin Sentinel Towers on Horizon */}
            <rect x="25" y="95" width="25" height="110" fill="#25050e" stroke="url(#tarotGold)" strokeWidth="1.5" />
            <polygon points="20,95 37,75 55,95" fill="#400816" stroke="url(#tarotGold)" strokeWidth="1.2" />
            <rect x="150" y="95" width="25" height="110" fill="#25050e" stroke="url(#tarotGold)" strokeWidth="1.5" />
            <polygon points="145,95 162,75 180,95" fill="#400816" stroke="url(#tarotGold)" strokeWidth="1.2" />
            {/* Wolf & Hound Howling at the Skies */}
            <polygon points="65,195 75,160 85,195" fill="#160207" stroke="url(#tarotGold)" strokeWidth="1.2" />
            <polygon points="115,195 125,160 135,195" fill="#4a0918" stroke="url(#tarotGold)" strokeWidth="1.2" />
            {/* Winding Path of Consciousness */}
            <path d="M 100 130 Q 80 160 100 185 Q 120 205 100 228" fill="none" stroke="url(#tarotGold)" strokeWidth="2" strokeDasharray="3,3" />
          </g>
        )}
      </g>

      {/* Ornate Golden Gothic Arch Outline */}
      <path 
        d="M 12 50 C 12 24, 45 12, 100 12 C 155 12, 188 24, 188 50 L 188 228 L 12 228 Z" 
        fill="none" 
        stroke="url(#tarotGold)" 
        strokeWidth="2.5" 
      />

      {/* Decorative Golden Corner Accents & Alchemical Star */}
      <circle cx="100" cy="13" r="3" fill="#ffd700" />
      <line x1="12" y1="50" x2="188" y2="50" stroke="url(#tarotGold)" strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}
