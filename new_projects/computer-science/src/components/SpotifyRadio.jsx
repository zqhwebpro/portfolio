import React, { useState, useEffect } from 'react';
import { Disc, Play, Pause, Music, Volume2, Sparkles } from 'lucide-react';

export function SpotifyRadio({ onAudioStateChange }) {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (onAudioStateChange) {
      onAudioStateChange(isPlaying);
    }
  }, [isPlaying, onAudioStateChange]);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '0.85rem',
        right: '0.85rem',
        zIndex: 35,
        width: '300px',
        background: 'rgba(6, 1, 18, 0.88)',
        backdropFilter: 'blur(18px)',
        border: '1.5px solid rgba(0, 240, 255, 0.75)',
        borderRadius: '16px',
        boxShadow: '0 0 35px rgba(0, 240, 255, 0.45), inset 0 0 15px rgba(0, 240, 255, 0.2)',
        overflow: 'hidden',
        color: '#FFFFFF',
      }}
    >
      {/* Iconographic Top Header Bar (No Words, Pure Visual Design & API) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          padding: '0.55rem 0.8rem',
          background: 'rgba(0, 240, 255, 0.08)',
          borderBottom: '1px solid rgba(0, 240, 255, 0.25)',
        }}
      >
        {/* Left: Spinning Disc & Pulsing Equalizer Bars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Disc
            size={18}
            color="#00F0FF"
            style={{
              filter: 'drop-shadow(0 0 6px #00F0FF)',
              animation: isPlaying ? 'spin 4s linear infinite' : 'none',
            }}
          />
          {/* Visual Sound Equalizer Waves */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '14px' }}>
            <span style={{ width: '3px', height: isPlaying ? '12px' : '4px', background: '#00F0FF', borderRadius: '1px', transition: 'height 0.2s ease' }} />
            <span style={{ width: '3px', height: isPlaying ? '14px' : '6px', background: '#FF007F', borderRadius: '1px', transition: 'height 0.2s ease' }} />
            <span style={{ width: '3px', height: isPlaying ? '10px' : '3px', background: '#FFE600', borderRadius: '1px', transition: 'height 0.2s ease' }} />
            <span style={{ width: '3px', height: isPlaying ? '13px' : '5px', background: '#00F0FF', borderRadius: '1px', transition: 'height 0.2s ease' }} />
          </div>
        </div>

        {/* Right: Audio Pulse Toggle */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            background: 'rgba(0, 240, 255, 0.12)',
            border: '1px solid rgba(0, 240, 255, 0.4)',
            borderRadius: '50%',
            width: '26px',
            height: '26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#00F0FF',
            cursor: 'pointer',
            boxShadow: '0 0 10px rgba(0, 240, 255, 0.3)',
          }}
          title="Toggle Music Spectrum"
        >
          {isPlaying ? <Volume2 size={13} /> : <Music size={13} />}
        </button>
      </div>

      {/* Embedded Spotify Official Retrowave Playlist */}
      <div style={{ padding: '0.45rem', background: '#04010a' }}>
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

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
