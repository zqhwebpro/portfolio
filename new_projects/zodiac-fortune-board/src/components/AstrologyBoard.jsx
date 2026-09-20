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
  
  // Calculate planchette position & rotation based on the arched layout
  let planchetteStyle = { transform: 'translate(0px, 100px) rotate(0deg)' }; // Resting position
  
  if (activeSign) {
    const index = ZODIAC_SIGNS.findIndex(s => s.name === activeSign);
    if (index !== -1) {
      // Arch goes from -60 degrees to +60 degrees (top of the board)
      const angleDeg = -75 + (index * (150 / 11)); 
      const angleRad = angleDeg * (Math.PI / 180);
      const radius = 110; 
      const x = Math.sin(angleRad) * radius;
      const y = -Math.cos(angleRad) * radius; // Negative Y is up
      
      planchetteStyle = {
        transform: `translate(${x}px, ${y}px) rotate(${angleDeg}deg)`
      };
    }
  }

  return (
    <div className={`ouija-board-container ${isChanneling ? 'channeling' : ''}`}>
      
      {/* Decorative Ouija Elements */}
      <div className="ouija-corner top-left">YES</div>
      <div className="ouija-corner top-right">NO</div>
      <div className="ouija-sun">❂</div>
      <div className="ouija-moon">☾</div>
      <div className="ouija-goodbye">GOOD BYE</div>

      <div className="astrology-board">
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

        {/* Zodiac Nodes Arranged in an Arch */}
        {ZODIAC_SIGNS.map((sign, index) => {
          // Calculate arch from -75 to 75 degrees
          const angleDeg = -75 + (index * (150 / 11));
          const angleRad = angleDeg * (Math.PI / 180);
          const radius = 220; // Near the top edge of the board
          const x = Math.sin(angleRad) * radius;
          const y = -Math.cos(angleRad) * radius; // Negative Y is up
          
          const isActive = activeSign === sign.name;

          return (
            <div
              key={sign.name}
              className={`zodiac-node ${isActive ? 'active' : ''}`}
              style={{
                transform: `translate(${x}px, ${y + 50}px) rotate(${angleDeg}deg)`, // +50 to pull it down slightly
              }}
              onClick={() => !isChanneling && onSelectSign(sign.name)}
            >
              <div className="zodiac-symbol">{sign.symbol}</div>
              <div className="zodiac-name">{sign.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
