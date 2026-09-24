import React, { useEffect } from 'react';

export function SpotifyRadio({ onAudioStateChange }) {
  useEffect(() => {
    if (onAudioStateChange) {
      onAudioStateChange(true);
    }
  }, [onAudioStateChange]);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '0.85rem',
        right: '0.85rem',
        zIndex: 35,
        width: '320px',
        maxWidth: 'calc(100vw - 2rem)',
        borderRadius: '16px',
        boxShadow: '0 0 30px rgba(0, 240, 255, 0.4), 0 0 15px rgba(255, 0, 127, 0.25)',
        overflow: 'hidden',
        background: '#04010a',
        lineHeight: 0,
      }}
    >
      <iframe
        title="Spotify Synthwave Playlist"
        src="https://open.spotify.com/embed/playlist/37i9dQZF1DXdLEN7aqioXM?utm_source=generator&theme=0"
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style={{ borderRadius: '16px', border: 'none', display: 'block' }}
      />
    </div>
  );
}
