import React, { useState } from 'react';
import { Radio, ChevronDown, ChevronUp, Music } from 'lucide-react';

export function SpotifyRadio({ onAudioStateChange }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '0.85rem',
        right: '0.85rem',
        zIndex: 35,
        width: '320px',
        background: 'rgba(6, 1, 18, 0.85)',
        backdropFilter: 'blur(16px)',
        border: '1.5px solid rgba(0, 240, 255, 0.75)',
        borderRadius: '16px',
        boxShadow: '0 0 30px rgba(0, 240, 255, 0.4), inset 0 0 15px rgba(0, 240, 255, 0.15)',
        overflow: 'hidden',
        color: '#FFFFFF',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Sleek Spotify Radio Header Bar */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          padding: '0.65rem 0.85rem',
          background: 'rgba(0, 240, 255, 0.08)',
          borderBottom: isExpanded ? '1px solid rgba(0, 240, 255, 0.25)' : 'none',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 800, color: '#00F0FF', display: 'flex', alignItems: 'center', gap: '0.4rem', textShadow: '0 0 8px rgba(0, 240, 255, 0.8)' }}>
          <Radio size={14} color="#00F0FF" /> SYNTHWAVE RADIO • SPOTIFY PLAYLIST
        </div>

        <button
          style={{
            background: 'transparent',
            border: 'none',
            color: '#00F0FF',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
      </div>

      {/* Embedded Spotify Official Retrowave / Synthwave Playlist Player */}
      {isExpanded && (
        <div style={{ padding: '0.5rem', background: '#04010a' }}>
          <iframe
            title="Spotify Synthwave Playlist"
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DXdLEN7aqioXM?utm_source=generator&theme=0"
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ borderRadius: '12px', border: 'none' }}
          />
        </div>
      )}
    </div>
  );
}
