import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Radio } from 'lucide-react';
import { SoundEngine } from '../utils/soundEngine';

export function SpotifyRadio({ onAudioStateChange }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);

  const tracks = [
    { title: "Neon Skyline", artist: "Cyber Dreamer" },
    { title: "Midnight Overdrive", artist: "Synth & City" },
    { title: "Retro Future", artist: "Vaporwave Nights" },
    { title: "Grid Runner", artist: "Digital Sunset" }
  ];

  useEffect(() => {
    if (onAudioStateChange) {
      onAudioStateChange(isPlaying);
    }
  }, [isPlaying, onAudioStateChange]);

  const togglePlay = () => {
    if (isPlaying) {
      SoundEngine.stopSynthwaveBeat();
      setIsPlaying(false);
    } else {
      SoundEngine.startSynthwaveBeat(trackIndex);
      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    const nextIdx = (trackIndex + 1) % tracks.length;
    setTrackIndex(nextIdx);
    if (isPlaying) {
      SoundEngine.startSynthwaveBeat(nextIdx);
    }
  };

  const prevTrack = () => {
    const prevIdx = (trackIndex - 1 + tracks.length) % tracks.length;
    setTrackIndex(prevIdx);
    if (isPlaying) {
      SoundEngine.startSynthwaveBeat(prevIdx);
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 35,
        width: '340px',
        maxWidth: 'calc(100vw - 3rem)',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0, 240, 255, 0.25), 0 0 15px rgba(255, 0, 127, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.05)',
        background: 'rgba(10, 2, 20, 0.75)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(0, 240, 255, 0.3)',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        fontFamily: 'var(--font-sans, sans-serif)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#00F0FF', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          <Radio size={14} className={isPlaying ? "animate-pulse" : ""} />
          <span>Fm 84.0 Synth Radio</span>
        </div>
        {isPlaying && (
          <div style={{ display: 'flex', gap: '2px', height: '12px' }}>
            {[1, 2, 3].map(i => (
              <div
                key={i}
                style={{
                  width: '3px',
                  background: '#FF007F',
                  borderRadius: '2px',
                  animation: `bounce ${0.5 + i * 0.2}s infinite alternate`
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 15px rgba(255, 0, 127, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          flexShrink: 0
        }}>
          <img 
            src="/synthwave_album_cover.jpg" 
            alt="Album Cover" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ 
            color: '#FFFFFF', 
            fontWeight: 700, 
            fontSize: '1rem', 
            whiteSpace: 'nowrap', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
          }}>
            {tracks[trackIndex].title}
          </div>
          <div style={{ 
            color: 'rgba(255, 255, 255, 0.6)', 
            fontSize: '0.85rem', 
            marginTop: '2px' 
          }}>
            {tracks[trackIndex].artist}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginTop: '0.25rem' }}>
        <button 
          onClick={prevTrack}
          style={{ background: 'none', border: 'none', color: '#00F0FF', cursor: 'pointer', display: 'flex', padding: '0.25rem' }}
        >
          <SkipBack size={20} />
        </button>
        <button 
          onClick={togglePlay}
          style={{ 
            background: 'linear-gradient(135deg, #FF007F, #9D00FF)', 
            border: 'none', 
            color: '#FFFFFF', 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            boxShadow: '0 0 20px rgba(255, 0, 127, 0.6)'
          }}
        >
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" style={{ marginLeft: '2px' }} />}
        </button>
        <button 
          onClick={nextTrack}
          style={{ background: 'none', border: 'none', color: '#00F0FF', cursor: 'pointer', display: 'flex', padding: '0.25rem' }}
        >
          <SkipForward size={20} />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bounce {
          0% { height: 4px; }
          100% { height: 12px; }
        }
      `}} />
    </div>
  );
}
