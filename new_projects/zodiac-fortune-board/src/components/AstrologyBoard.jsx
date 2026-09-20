import React from 'react';
import { ZODIAC_SIGNS } from '../data/fortunes';

export function AstrologyBoard({ onSelectSign, activeSign, isChanneling }) {
  const radius = 160;

  return (
    <div className={`astrology-board ${isChanneling ? 'channeling' : ''}`}>
      <div className="center-eye">
        {isChanneling ? '👁️' : (activeSign ? ZODIAC_SIGNS.find(s => s.id === activeSign)?.symbol : '✦')}
      </div>
      
      {ZODIAC_SIGNS.map((sign, index) => {
        // Calculate position on the circle
        const angle = (index / ZODIAC_SIGNS.length) * 2 * Math.PI - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        const isActive = activeSign === sign.id;

        return (
          <div 
            key={sign.id}
            className="zodiac-node-wrapper"
            style={{
              position: 'absolute',
              transform: `translate(${x}px, ${y}px)`,
              zIndex: isActive ? 30 : 10
            }}
          >
            <button
              onClick={() => onSelectSign(sign.id)}
              className={`zodiac-node ${isActive ? 'active' : ''}`}
              disabled={isChanneling}
              title={sign.name}
              style={{
                boxShadow: isActive ? `0 0 25px ${sign.color}` : 'none',
                borderColor: isActive ? sign.color : ''
              }}
            >
              <span className="zodiac-symbol">{sign.symbol}</span>
              <span className="zodiac-name">{sign.name}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
