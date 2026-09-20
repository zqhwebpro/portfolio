import React from 'react';

const ZODIAC_SIGNS = [
  { name: 'Aries', symbol: '♈' },
  { name: 'Taurus', symbol: '♉' },
  { name: 'Gemini', symbol: '♊' },
  { name: 'Cancer', symbol: '♋' },
  { name: 'Leo', symbol: '♌' },
  { name: 'Virgo', symbol: '♍' },
  { name: 'Libra', symbol: '♎' },
  { name: 'Scorpio', symbol: '♏' },
  { name: 'Sagittarius', symbol: '♐' },
  { name: 'Capricorn', symbol: '♑' },
  { name: 'Aquarius', symbol: '♒' },
  { name: 'Pisces', symbol: '♓' },
];

export function AstrologyBoard({ onSelectSign, isChanneling, activeSign }) {
  
  // Calculate planchette position & rotation
  let planchetteStyle = { transform: 'translate(0px, 0px) rotate(0deg)' };
  
  if (activeSign) {
    const index = ZODIAC_SIGNS.findIndex(s => s.name === activeSign);
    if (index !== -1) {
      const angleDeg = (index * 30) - 90; // -90 deg makes Aries top-center
      const angleRad = angleDeg * (Math.PI / 180);
      const radius = 100; // Planchette stops inside the ring
      const x = Math.cos(angleRad) * radius;
      const y = Math.sin(angleRad) * radius;
      
      // Rotate the planchette to face the sign
      // Since the SVG points "up" naturally, we add 90 so it rotates correctly relative to the angle
      planchetteStyle = {
        transform: `translate(${x}px, ${y}px) rotate(${angleDeg + 90}deg)`
      };
    }
  }

  return (
    <div className={`astrology-board ${isChanneling ? 'channeling' : ''}`}>
      <div className="center-emblem">
        ✧
      </div>
      
      {/* The Planchette */}
      <svg 
        className="planchette" 
        viewBox="0 0 100 120"
        style={planchetteStyle}
      >
        <path 
          d="M50 10 C 15 50, 5 90, 15 110 L 85 110 C 95 90, 85 50, 50 10 Z" 
          fill="var(--wood-dark)" 
          stroke="var(--gold-antique)" 
          strokeWidth="3"
        />
        <circle cx="50" cy="80" r="15" fill="rgba(5,5,16,0.6)" stroke="var(--gold-antique)" strokeWidth="2"/>
        <circle cx="50" cy="80" r="18" fill="transparent" stroke="var(--gold-antique)" strokeWidth="1" strokeDasharray="2 2"/>
      </svg>

      {/* Zodiac Nodes */}
      {ZODIAC_SIGNS.map((sign, index) => {
        const angle = (index * 30) - 90;
        const radius = 180;
        const x = Math.cos(angle * (Math.PI / 180)) * radius;
        const y = Math.sin(angle * (Math.PI / 180)) * radius;
        const isActive = activeSign === sign.name;

        return (
          <div
            key={sign.name}
            className={`zodiac-node ${isActive ? 'active' : ''}`}
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
            onClick={() => !isChanneling && onSelectSign(sign.name)}
          >
            <div className="zodiac-symbol">{sign.symbol}</div>
            <div className="zodiac-name">{sign.name}</div>
          </div>
        );
      })}
    </div>
  );
}
