import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { RearviewMirror } from './RearviewMirror';
import { WaveformVisualizer } from './WaveformVisualizer';
import { SpotifyRadio } from './SpotifyRadio';
import { RANDOM_WIKI_RESERVE } from '../data/randomWikiArticles';

// ---------------------------------------------------------------------------
// Wikipedia API helpers & Curated Reserve
// ---------------------------------------------------------------------------

/** Curated thematic Wikipedia articles with verified working thumbnail images */
const CURATED_WIKI_FALLBACKS = [
  {
    title: 'Synthwave',
    extract: 'Synthwave is an electronic music microgenre based predominantly on 1980s film soundtracks, retrofuturistic synth art, and vintage analog synthesizers like the Prophet-5 and Juno-106.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Synthwave.svg/330px-Synthwave.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    url: 'https://en.wikipedia.org/wiki/Synthwave',
  },
  {
    title: 'Information superhighway',
    extract: 'The information superhighway was a popular 1990s telecommunications term referring to digital communication systems and the Internet infrastructure facilitating instant global data exchange.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Internet_map_1024_-_transparent%2C_inverted.png/330px-Internet_map_1024_-_transparent%2C_inverted.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    url: 'https://en.wikipedia.org/wiki/Information_superhighway',
  },
  {
    title: 'Tron',
    extract: 'Tron is a 1982 American science fiction action-adventure film produced by Walt Disney Productions, pioneering extensive use of CGI and glowing light-cycle grid arenas.',
    image: 'https://upload.wikimedia.org/wikipedia/en/1/17/Tron_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled',
    url: 'https://en.wikipedia.org/wiki/Tron',
  },
  {
    title: 'Blade Runner',
    extract: 'Blade Runner is a 1982 cyberpunk neo-noir science fiction film directed by Ridley Scott, set in a dystopian future Los Angeles filled with holographic billboards and flying spinner vehicles.',
    image: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Blade_Runner_%281982_poster%29.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled',
    url: 'https://en.wikipedia.org/wiki/Blade_Runner',
  },
  {
    title: 'Commodore 64',
    extract: 'The Commodore 64 is an 8-bit home computer introduced in January 1982 by Commodore International. It is listed as the highest-selling single computer model of all time, famous for its SID sound chip.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Commodore-64-Computer-FL.jpg/330px-Commodore-64-Computer-FL.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    url: 'https://en.wikipedia.org/wiki/Commodore_64',
  },
  {
    title: 'DeLorean time machine',
    extract: 'The DeLorean time machine is a fictional automobile time travel device based on the DMC-12 sports car, conceived for the Back to the Future franchise featuring the iconic flux capacitor.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/DeLorean_Replica_Kovacs_Time_Machine.png/330px-DeLorean_Replica_Kovacs_Time_Machine.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    url: 'https://en.wikipedia.org/wiki/DeLorean_time_machine',
  },
  {
    title: 'Arcade video game',
    extract: 'An arcade video game takes player input from its controls, processes it through electrical components, and displays the output to a monitor, flourishing during the golden age of arcade games.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/Arcade-20071020-a.jpg/330px-Arcade-20071020-a.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    url: 'https://en.wikipedia.org/wiki/Arcade_video_game',
  },
  {
    title: 'Vectrex',
    extract: 'A vector monitor is a cathode-ray tube display used for early computer graphics and 1980s arcade games like Asteroids, Battlezone, and Star Wars using electron beam line rendering.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/Vectrex-Console-Set.jpg/330px-Vectrex-Console-Set.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    url: 'https://en.wikipedia.org/wiki/Vector_monitor',
  },
  {
    title: 'Roland TR-808',
    extract: 'The Roland TR-808 Rhythm Composer is a drum machine manufactured by the Roland Corporation between 1980 and 1983, distinguished by its booming analog bass drum and crisp metallic snare.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e6/TR-808_-_MIM%2C_Phoenix_%282019-08-30_14.59.26_by_Bryan_Pocius%29_%28cropped%29.jpg/330px-TR-808_-_MIM%2C_Phoenix_%282019-08-30_14.59.26_by_Bryan_Pocius%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    url: 'https://en.wikipedia.org/wiki/Roland_TR-808',
  },
  {
    title: 'Cyberpunk',
    extract: 'Cyberpunk is a subgenre of science fiction in a dystopian futuristic setting that tends to focus on a combination of low life and high tech, featuring advanced technology and cybernetics.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4a/Cyberpunk_city_%284065413356%29.jpg/330px-Cyberpunk_city_%284065413356%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    url: 'https://en.wikipedia.org/wiki/Cyberpunk',
  },
  {
    title: 'F-Zero',
    extract: 'F-Zero is a futuristic racing video game developed by Nintendo for the Super Nintendo Entertainment System, renowned for high speed, Mode 7 pseudo-3D perspective tracks, and pulse synth rock.',
    image: 'https://upload.wikimedia.org/wikipedia/en/7/77/F-Zero_logo.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled',
    url: 'https://en.wikipedia.org/wiki/F-Zero',
  },
  {
    title: 'Daft Punk',
    extract: 'Daft Punk were a French electronic music duo formed in 1993 in Paris by Thomas Bangalter and Guy-Manuel de Homem-Christo, widely regarded as one of the most influential dance acts in history.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Daft_Punk_in_2013_2-_centered.jpg/330px-Daft_Punk_in_2013_2-_centered.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    url: 'https://en.wikipedia.org/wiki/Daft_Punk',
  },
  {
    title: 'Amiga',
    extract: 'Amiga is a family of personal computers introduced in 1985 by Commodore, celebrated for groundbreaking multitasking, color graphics, and influential demoscene tracker music.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c3/Amiga500_system.jpg/330px-Amiga500_system.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    url: 'https://en.wikipedia.org/wiki/Amiga',
  },
  {
    title: 'Atari 2600',
    extract: 'The Atari 2600 is a pioneering home video game console released in 1977 that popularized microprocessor-based hardware and ROM cartridges, defining early arcade gaming at home.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/02/Atari-2600-Wood-4Sw-Set.png/330px-Atari-2600-Wood-4Sw-Set.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    url: 'https://en.wikipedia.org/wiki/Atari_2600',
  },
  {
    title: 'Hubble Space Telescope',
    extract: 'The Hubble Space Telescope is a space observatory launched in 1990 into low Earth orbit, providing breathtaking deep space imagery that revolutionized modern astrophysics.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4a/Hubble_2009_close-up_2.jpg/330px-Hubble_2009_close-up_2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    url: 'https://en.wikipedia.org/wiki/Hubble_Space_Telescope',
  },
  {
    title: 'Sega Genesis',
    extract: 'The Sega Genesis is a 16-bit fourth-generation video game console released by Sega in 1989, known for its edgy arcade ports, high blast processing speed, and iconic FM synth audio.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a1/Sega-Mega-Drive-JP-Mk1-Console-Set.jpg/330px-Sega-Mega-Drive-JP-Mk1-Console-Set.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    url: 'https://en.wikipedia.org/wiki/Sega_Genesis',
  },
  {
    title: 'Floppy disk',
    extract: 'A floppy disk is an iconic magnetic storage disk enclosed in a square plastic shell, serving as the quintessential universal save icon and primary data exchange format of the 1980s and 1990s.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/aa/Floppy_disk_2009_G1.jpg/330px-Floppy_disk_2009_G1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    url: 'https://en.wikipedia.org/wiki/Floppy_disk',
  },
  {
    title: 'Game Boy',
    extract: 'The Game Boy is an 8-bit handheld game console released by Nintendo in 1989, legendary for its rugged design, dot-matrix green LCD screen, and astronomical worldwide popularity.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/Game-Boy-FL.png/330px-Game-Boy-FL.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    url: 'https://en.wikipedia.org/wiki/Game_Boy',
  },
  {
    title: 'Ferrari Testarossa',
    extract: 'The Ferrari Testarossa is a 12-cylinder mid-engine sports car produced in 1984, renowned for its side strakes, ultra-wide rear stance, and defining role in 1980s synthwave pop culture.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0c/Ferrari_Testarossa_IMG_3043.jpg/330px-Ferrari_Testarossa_IMG_3043.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    url: 'https://en.wikipedia.org/wiki/Ferrari_Testarossa',
  },
  {
    title: 'Dodge Viper',
    extract: 'The Dodge Viper is an iconic American sports car unveiled in 1989, built around an immense 8.0-liter V10 engine delivering raw, unfiltered speed and muscular styling.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/%22_14_Fiat-Chrysler_SRT_Viper_GTS_%28cropped%29.jpg/330px-%22_14_Fiat-Chrysler_SRT_Viper_GTS_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    url: 'https://en.wikipedia.org/wiki/Dodge_Viper',
  },
];

/** Combined master fallback pool of curated thematic + rich random Wikipedia reserve */
const ALL_FALLBACK_ARTICLES = [...CURATED_WIKI_FALLBACKS, ...RANDOM_WIKI_RESERVE];

/** Fisher-Yates array shuffle */
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Pre-computed cyberspace starfield for night sky (no yellow) */
const CYBER_STARS = Array.from({ length: 65 }, (_, i) => ({
  x: ((i * 137.5) % 100) / 100,
  y: ((i * 73.1) % 46) / 100,
  size: i % 3 === 0 ? 2.0 : i % 2 === 0 ? 1.4 : 1.0,
  color:
    i % 4 === 0
      ? '#00F0FF'
      : i % 4 === 1
        ? '#FF007F'
        : i % 4 === 2
          ? '#9D00FF'
          : '#FFFFFF',
  twinklePhase: (i * 0.9) % (Math.PI * 2),
}));

/** Module-level constant photon definitions (no yellow) */
const PHOTON_SEEDS = [
  { lane: -2.5, speedMult: 1.4, color: '#00F0FF', glow: '#00EEFF', phase: 0.1 },
  { lane: 2.5,  speedMult: 1.7, color: '#9D00FF', glow: '#D177FF', phase: 0.4 },
  { lane: -1.2, speedMult: 1.9, color: '#FF007F', glow: '#FF66AA', phase: 0.7 },
  { lane: 1.2,  speedMult: 1.5, color: '#00E599', glow: '#88FFDD', phase: 0.85 },
];

/**
 * Fetch a batch of live random Wikipedia articles via MediaWiki Action API with timeout and deduplication.
 */
async function fetchWikiBatch(count = 12, seenTitles = new Set()) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&generator=random&grnnamespace=0&grnlimit=50&prop=extracts|pageimages|info&inprop=url&exintro=1&explaintext=1&exchars=240&piprop=thumbnail&pithumbsize=330`;
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'Api-User-Agent': 'SynthRiderGame/2.0 (https://zqhwebpro.github.io/portfolio/; contact@zqh.me)',
      },
    });
    clearTimeout(timeoutId);

    if (res.status === 429 || res.status === 403) {
      return { articles: [], quotaHit: true };
    }
    if (!res.ok) throw new Error(`Wiki API ${res.status}`);

    const data = await res.json();
    if (data?.error?.code === 'ratelimited' || data?.error?.code === 'maxlag') {
      return { articles: [], quotaHit: true };
    }

    const pages = data?.query?.pages ? Object.values(data.query.pages) : [];
    const articles = [];

    for (const page of pages) {
      if (!page || !page.title || !page.thumbnail?.source || !page.extract) continue;
      if (seenTitles.has(page.title)) continue;

      const cleanExtract = (page.extract || '')
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 220);
      if (cleanExtract.length < 20) continue;

      articles.push({
        title: page.title,
        extract: cleanExtract,
        image: page.thumbnail.source,
        url: page.fullurl || `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title)}`,
        isCuratedFallback: false,
      });
      if (articles.length >= count) break;
    }

    return { articles, quotaHit: false };
  } catch (err) {
    clearTimeout(timeoutId);
    try {
      const single = await fetchSingleWikiSummary();
      if (single && single.image && !seenTitles.has(single.title)) {
        return { articles: [{ ...single, isCuratedFallback: false }], quotaHit: false };
      }
    } catch (e2) {}
    return { articles: [], quotaHit: err.name === 'AbortError' ? false : true };
  }
}

/** Fallback single random summary fetch */
async function fetchSingleWikiSummary() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3500);
  try {
    const res = await fetch('https://en.wikipedia.org/api/rest_v1/page/random/summary', {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'Api-User-Agent': 'SynthRiderGame/2.0 (https://zqhwebpro.github.io/portfolio/; contact@zqh.me)',
      },
    });
    clearTimeout(timeoutId);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.thumbnail?.source || !data.title) return null;
    return {
      title: data.title,
      extract: data.extract_html
        ? data.extract_html.replace(/<[^>]*>/g, '').slice(0, 200)
        : (data.extract || '').slice(0, 200),
      image: data.thumbnail.source,
      url:
        data.content_urls?.desktop?.page ||
        `https://en.wikipedia.org/wiki/${encodeURIComponent(data.title)}`,
    };
  } catch (err) {
    clearTimeout(timeoutId);
    return null;
  }
}

/**
 * Get next article: Live pool first, then fallback reserve
 */
function getNextArticle(livePoolRef, fallbackReserveRef, seenTitlesRef, quotaExpendedRef) {
  while (livePoolRef.current && livePoolRef.current.length > 0) {
    const randIdx = Math.floor(Math.random() * livePoolRef.current.length);
    const candidate = livePoolRef.current.splice(randIdx, 1)[0];
    if (
      candidate &&
      candidate.title &&
      candidate.image &&
      !seenTitlesRef.current.has(candidate.title)
    ) {
      seenTitlesRef.current.add(candidate.title);
      return { ...candidate, isCuratedFallback: false };
    }
  }

  const unseenFallbacks = fallbackReserveRef.current.filter(
    (a) => a && a.title && !seenTitlesRef.current.has(a.title)
  );

  if (unseenFallbacks.length > 0) {
    const chosen = unseenFallbacks[Math.floor(Math.random() * unseenFallbacks.length)];
    seenTitlesRef.current.add(chosen.title);
    return { ...chosen, isCuratedFallback: true };
  }

  const recentSeen = Array.from(seenTitlesRef.current).slice(-10);
  seenTitlesRef.current = new Set(recentSeen);

  const available = fallbackReserveRef.current.filter(
    (a) => a && a.title && !seenTitlesRef.current.has(a.title)
  );
  const selected =
    available.length > 0
      ? available[Math.floor(Math.random() * available.length)]
      : fallbackReserveRef.current[Math.floor(Math.random() * fallbackReserveRef.current.length)];

  seenTitlesRef.current.add(selected.title);
  return { ...selected, isCuratedFallback: true };
}

// ---------------------------------------------------------------------------
// F-Zero Tron Bike definitions
// ---------------------------------------------------------------------------
const FZERO_BIKES = [
  { lineIndex: -7,  color: '#00AAFF', exhaust: '#00EEFF', speed: 0.0022, startT: 0.12 },
  { lineIndex: 7,   color: '#FF3300', exhaust: '#FF8800', speed: 0.0019, startT: 0.37 },
  { lineIndex: -15, color: '#00DD55', exhaust: '#88FFBB', speed: 0.0027, startT: 0.06 },
  { lineIndex: 15,  color: '#9D00FF', exhaust: '#D177FF', speed: 0.0020, startT: 0.55 },
  { lineIndex: 1,   color: '#CC00FF', exhaust: '#FF77FF', speed: 0.0017, startT: 0.44 },
];

export function SynthwaveDrive() {
  const canvasRef = useRef(null);
  const viewportRef = useRef(null);

  // Driving & simulation state
  const [speedMph, setSpeedMph] = useState(0);
  const [driveDistance, setDriveDistance] = useState(0);
  const [popups, setPopups] = useState([]);
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const [autoDrive, setAutoDrive] = useState(false);
  const [playerX, setPlayerX] = useState(0);

  // API Quota & Fallback indicators
  const [isCuratedFallback, setIsCuratedFallback] = useState(false);
  const [quotaExpended, setQuotaExpended] = useState(false);
  const [articlesStreamed, setArticlesStreamed] = useState(0);

  // Set of all article titles seen
  const seenTitlesRef = useRef(new Set());

  // Article pools
  const liveWikiPoolRef = useRef([]);
  const fallbackReserveRef = useRef(shuffleArray(ALL_FALLBACK_ARTICLES));
  const poolLoadingRef = useRef(false);
  const quotaExpendedRef = useRef(false);

  // F-Zero Tron bikes
  const bikesRef = useRef(null);

  // Animation & simulation refs
  const autoDriveRef = useRef(false);
  const speedRef = useRef(0);
  const directionRef = useRef(1); // 1 = Forward, -1 = Reverse
  const offsetRef = useRef(0);
  const driveDistanceRef = useRef(0);
  const nextMilestoneDistRef = useRef(28);
  const milestoneCountRef = useRef(0);

  // Steering physics refs
  const playerXRef = useRef(0);
  const steerVelocityRef = useRef(0);
  const keysPressedRef = useRef({ left: false, right: false });

  // Popups reference for F-key handler & physics loop
  const popupsRef = useRef([]);
  useEffect(() => {
    popupsRef.current = popups;
  }, [popups]);

  // Performance throttling refs to prevent redundant React renders
  const lastSpeedMphRef = useRef(-1);
  const lastPlayerXRef = useRef(0);
  const frameCountRef = useRef(0);

  // Refill live random pool
  const refillLivePool = useCallback(async () => {
    if (poolLoadingRef.current || liveWikiPoolRef.current.length >= 25 || quotaExpendedRef.current) return;
    poolLoadingRef.current = true;

    try {
      const { articles, quotaHit } = await fetchWikiBatch(15, seenTitlesRef.current);

      if (quotaHit) {
        quotaExpendedRef.current = true;
        setQuotaExpended(true);
        if (liveWikiPoolRef.current.length === 0) {
          setIsCuratedFallback(true);
        }
        return;
      }

      if (articles && articles.length > 0) {
        const existingInPool = new Set(liveWikiPoolRef.current.map((a) => a.title));
        const fresh = articles.filter(
          (a) => !seenTitlesRef.current.has(a.title) && !existingInPool.has(a.title)
        );
        liveWikiPoolRef.current.push(...fresh);
        quotaExpendedRef.current = false;
        setQuotaExpended(false);
      }
    } catch (e) {
      // Network isolated
    } finally {
      poolLoadingRef.current = false;
    }
  }, []);

  // Pre-warm with live Wikipedia articles on mount
  useEffect(() => {
    refillLivePool();
  }, [refillLivePool]);

  // Toggle Auto Drive cruise mode
  const toggleAutoDrive = useCallback(() => {
    setAutoDrive((prev) => {
      const next = !prev;
      autoDriveRef.current = next;
      if (next) {
        directionRef.current = 1;
        speedRef.current = Math.max(30, speedRef.current);
      }
      return next;
    });
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle auto-drive with Spacebar
      if (e.code === 'Space' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        toggleAutoDrive();
        return;
      }

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysPressedRef.current.left = true;
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysPressedRef.current.right = true;
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        directionRef.current = 1;
        speedRef.current = Math.min(280, speedRef.current + 12);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        if (speedRef.current > 5 && directionRef.current === 1) {
          speedRef.current = Math.max(0, speedRef.current - 16);
        } else {
          directionRef.current = -1;
          speedRef.current = Math.min(280, speedRef.current + 12);
        }
      } else if (e.key === 'f' || e.key === 'F') {
        // ALWAYS TARGET THE CLOSEST ARTICLE IN FRONT OF THE DRIVER!
        // Once an article passes (prog > 1.02), it is gone into the rearview mirror and cannot be selected.
        const currentDist = Math.abs(driveDistanceRef.current);
        const ahead = popupsRef.current
          .filter((p) => {
            if (!p.url) return false;
            const prog = (currentDist - p.startDist) / 36;
            return prog >= 0 && prog <= 1.02;
          })
          .sort((a, b) => {
            const progA = (currentDist - a.startDist) / 36;
            const progB = (currentDist - b.startDist) / 36;
            return progB - progA; // Descending: largest progress = closest to car!
          });

        if (ahead.length > 0) {
          const closest = ahead[0];
          window.open(closest.url, '_blank', 'noopener,noreferrer');
        }
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysPressedRef.current.left = false;
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysPressedRef.current.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [toggleAutoDrive]);

  // Momentum wheel / scroll interaction
  useEffect(() => {
    const handleWheel = (e) => {
      const deltaMag = Math.min(Math.abs(e.deltaY), 120);
      const impulse = deltaMag * 0.35;

      if (e.deltaY > 0) {
        directionRef.current = 1;
        speedRef.current = Math.min(280, speedRef.current + impulse);
      } else if (e.deltaY < 0) {
        directionRef.current = -1;
        speedRef.current = Math.min(280, speedRef.current + impulse);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Touch swipe to drive
  useEffect(() => {
    let lastTouchY = null;
    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        lastTouchY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (!e.touches || !e.touches[0] || lastTouchY === null) return;
      const currentY = e.touches[0].clientY;
      const deltaY = lastTouchY - currentY;
      lastTouchY = currentY;

      const deltaMag = Math.min(Math.abs(deltaY), 80);
      const impulse = deltaMag * 0.45;

      if (deltaY > 0) {
        directionRef.current = 1;
        speedRef.current = Math.min(280, speedRef.current + impulse);
      } else if (deltaY < 0) {
        directionRef.current = -1;
        speedRef.current = Math.min(280, speedRef.current + impulse);
      }
    };

    const handleTouchEnd = () => {
      lastTouchY = null;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Canvas 3D Perspective Grid & Scene Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const render = () => {
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth;
      const height = parent ? parent.clientHeight : window.innerHeight;

      // Only resize canvas buffer when dimensions actually change
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      // Handle keyboard lateral steering physics
      if (keysPressedRef.current.left) {
        steerVelocityRef.current = Math.max(-0.045, steerVelocityRef.current - 0.008);
      }
      if (keysPressedRef.current.right) {
        steerVelocityRef.current = Math.min(0.045, steerVelocityRef.current + 0.008);
      }
      if (!keysPressedRef.current.left && !keysPressedRef.current.right) {
        steerVelocityRef.current *= 0.88;
      }

      if (Math.abs(steerVelocityRef.current) > 0.0001) {
        playerXRef.current += steerVelocityRef.current;
        playerXRef.current = Math.max(-0.85, Math.min(0.85, playerXRef.current));
      }

      // Handle speed adjustments (auto-drive cruise vs momentum deceleration)
      if (autoDriveRef.current) {
        directionRef.current = 1;
        speedRef.current = speedRef.current + (30 - speedRef.current) * 0.05;
      } else {
        if (speedRef.current > 0.1) {
          speedRef.current = speedRef.current * 0.95;
        } else {
          speedRef.current = 0;
        }
      }

      // Advance grid offset & distance
      if (speedRef.current > 0) {
        const baseVel = speedRef.current * 0.14 * directionRef.current;
        offsetRef.current = (offsetRef.current + baseVel + 40) % 40;
        driveDistanceRef.current += baseVel / 40;
      }

      const currentDist = Math.abs(driveDistanceRef.current);

      // Throttled React state updates to avoid chopping and garbage collection pauses
      const roundedSpeed = Math.max(0, Math.round(speedRef.current));
      if (roundedSpeed !== lastSpeedMphRef.current) {
        lastSpeedMphRef.current = roundedSpeed;
        setSpeedMph(roundedSpeed);
      }

      setDriveDistance(currentDist);

      if (Math.abs(playerXRef.current - lastPlayerXRef.current) > 0.008) {
        lastPlayerXRef.current = playerXRef.current;
        setPlayerX(playerXRef.current);
      }

      // Periodic pruning of cards that have passed past the rearview mirror horizon (> 2.6)
      frameCountRef.current++;
      if (frameCountRef.current % 90 === 0) {
        setPopups((prev) => {
          const active = prev.filter((p) => (currentDist - p.startDist) / 36 <= 2.6);
          return active.length === prev.length ? prev : active;
        });
      }

      // Spawn a new Wikipedia card popup
      if (currentDist >= nextMilestoneDistRef.current) {
        milestoneCountRef.current += 1;

        const article = getNextArticle(liveWikiPoolRef, fallbackReserveRef, seenTitlesRef, quotaExpendedRef);
        setIsCuratedFallback(article.isCuratedFallback);
        setArticlesStreamed((prev) => prev + 1);

        if (liveWikiPoolRef.current.length < 15 && !quotaExpendedRef.current) {
          refillLivePool();
        }

        const startDist = Math.ceil(currentDist);
        const newPopup = {
          id: Date.now() + Math.random(),
          number: milestoneCountRef.current,
          startDist,
          targetDist: startDist + 36,
          title: article.title,
          extract: article.extract,
          image: article.image,
          url: article.url,
          isCuratedFallback: article.isCuratedFallback,
        };

        // Keep cards alive through both forward approach and rearview mirror exit
        setPopups((prev) => [
          ...prev.filter((p) => (currentDist - p.startDist) / 36 <= 2.6),
          newPopup,
        ]);
        const nextGap = Math.floor(Math.random() * 15) + 20;
        nextMilestoneDistRef.current = startDist + nextGap;
      }

      const horizonY = height * 0.55;
      const sunCenterX = width * 0.5;
      const sunRadius = Math.min(width, height) * 0.25;
      const sunCenterY = horizonY - sunRadius * 0.35;

      // 1. Deep Space Night Sky & Synthwave Sun
      drawSkyAndSun(ctx, width, height, horizonY, sunCenterX, sunCenterY, sunRadius, playerXRef.current);

      // 2. Distant Mountain Silhouettes
      drawMountains(ctx, width, horizonY, playerXRef.current);

      // 3. 3D Information Superhighway & Grid (glowy transparent rails, NO yellow lines)
      drawGridFloor(ctx, width, height, horizonY, sunCenterX, offsetRef.current, playerXRef.current, speedRef.current);

      // 4. F-Zero Tron bikes riding the perspective lanes
      if (!bikesRef.current) {
        bikesRef.current = FZERO_BIKES.map((cfg) => ({
          ...cfg,
          t: cfg.startT,
          trail: [],
        }));
      }
      updateAndDrawBikes(
        ctx,
        width,
        height,
        horizonY,
        sunCenterX,
        bikesRef.current,
        playerXRef.current,
        speedRef.current
      );

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [refillLivePool]);

  const handleAudioStateChange = useCallback((active) => {
    setIsAudioPlaying(active);
  }, []);

  // Determine closest article ahead of the car for [F] indicator
  const closestPopup = useMemo(() => {
    return popups
      .filter((p) => {
        const prog = (driveDistance - p.startDist) / 36;
        return prog >= 0 && prog <= 1.02;
      })
      .sort((a, b) => {
        const progA = (driveDistance - a.startDist) / 36;
        const progB = (driveDistance - b.startDist) / 36;
        return progB - progA;
      })[0];
  }, [popups, driveDistance]);

  const closestPopupId = closestPopup?.id;

  return (
    <div
      ref={viewportRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: '#040008',
      }}
    >
      {/* 3D Canvas Perspective Viewport */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          zIndex: 10,
        }}
      />

      {/* Cyber Brand Title Top Left */}
      <div
        id="synth-branding-logo"
        style={{
          position: 'absolute',
          top: '1.5rem',
          left: '1.5rem',
          zIndex: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '6px',
          background: 'rgba(8, 2, 22, 0.78)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: isCuratedFallback
            ? '1.5px solid rgba(255, 0, 127, 0.65)'
            : '1.5px solid rgba(0, 240, 255, 0.55)',
          borderRadius: '12px',
          padding: '0.65rem 1.25rem',
          boxShadow: isCuratedFallback
            ? '0 8px 28px rgba(0, 0, 0, 0.8), 0 0 24px rgba(255, 0, 127, 0.35), inset 0 0 14px rgba(255, 0, 127, 0.15)'
            : '0 8px 28px rgba(0, 0, 0, 0.8), 0 0 24px rgba(0, 240, 255, 0.35), inset 0 0 14px rgba(255, 0, 127, 0.15)',
          cursor: 'pointer',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          width: 'fit-content',
          maxWidth: 'calc(100vw - 3rem)',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            fontFamily: 'Syne, var(--font-display, "Space Grotesk"), sans-serif',
            fontSize: '1.1rem',
            fontWeight: 900,
            fontStyle: 'italic',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            background: 'linear-gradient(90deg, #00F0FF 0%, #FF007F 50%, #9D00FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter:
              'drop-shadow(0 0 8px rgba(0, 240, 255, 0.65)) drop-shadow(0 0 18px rgba(255, 0, 127, 0.4))',
            lineHeight: 1.15,
            whiteSpace: 'nowrap',
          }}
        >
          Information Superhighway
        </div>

        {/* Synth neon horizon underline bar */}
        <div
          style={{
            width: '100%',
            height: '2px',
            background: 'linear-gradient(90deg, #00F0FF 0%, #FF007F 55%, rgba(157, 0, 255, 0.8) 100%)',
            boxShadow: '0 0 8px #00F0FF, 0 0 12px #FF007F',
            borderRadius: '1px',
          }}
        />

        {/* Compact status pill directly underneath logo */}
        {isCuratedFallback ? (
          <div
            id="superhighway-fallback-status"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              marginTop: '2px',
              padding: '4px 9px',
              background: 'linear-gradient(90deg, rgba(255, 0, 127, 0.22) 0%, rgba(157, 0, 255, 0.16) 100%)',
              border: '1px solid rgba(255, 0, 127, 0.65)',
              borderRadius: '6px',
              boxShadow: '0 0 12px rgba(255, 0, 127, 0.25), inset 0 0 8px rgba(157, 0, 255, 0.1)',
              boxSizing: 'border-box',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#FF007F',
                boxShadow: '0 0 6px #FF007F, 0 0 12px #FF007F',
                flexShrink: 0,
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.62rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                color: '#FF007F',
                textShadow: '0 0 6px rgba(255, 0, 127, 0.75)',
                textTransform: 'uppercase',
                lineHeight: 1.2,
              }}
            >
              CURATED WIKI BACKUP • OFFLINE RESERVE
            </span>
          </div>
        ) : (
          <div
            id="superhighway-live-status"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              marginTop: '2px',
              padding: '4px 9px',
              background: 'linear-gradient(90deg, rgba(0, 240, 255, 0.16) 0%, rgba(157, 0, 255, 0.12) 100%)',
              border: '1px solid rgba(0, 240, 255, 0.55)',
              borderRadius: '6px',
              boxShadow: '0 0 12px rgba(0, 240, 255, 0.2), inset 0 0 8px rgba(0, 240, 255, 0.1)',
              boxSizing: 'border-box',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#00F0FF',
                boxShadow: '0 0 6px #00F0FF, 0 0 12px #00F0FF',
                flexShrink: 0,
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.62rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                color: '#00F0FF',
                textShadow: '0 0 6px rgba(0, 240, 255, 0.75)',
                textTransform: 'uppercase',
                lineHeight: 1.2,
              }}
            >
              LIVE WIKIPEDIA DATASTREAM
            </span>
          </div>
        )}
      </div>

      {/* Top Center Rearview Mirror */}
      <RearviewMirror
        speedMph={speedMph}
        popups={popups}
        driveDistance={driveDistance}
        playerX={playerX}
      />

      {/* Live Waveform Scope Along Horizon */}
      <WaveformVisualizer isAudioPlaying={isAudioPlaying} speedMph={speedMph} />

      {/* Direct Spotify Radio Embed */}
      <SpotifyRadio onAudioStateChange={handleAudioStateChange} />

      {/* Steering & Drive Controls Hint */}
      <div
        id="synth-controls-hud"
        style={{
          position: 'absolute',
          bottom: '1.25rem',
          left: '1.5rem',
          zIndex: 35,
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          background: 'rgba(10, 2, 22, 0.88)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(0, 240, 255, 0.35)',
          borderRadius: '8px',
          padding: '0.45rem 0.95rem',
          color: 'rgba(255, 255, 255, 0.85)',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.68rem',
          letterSpacing: '0.08em',
          pointerEvents: 'none',
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.7), inset 0 0 10px rgba(0, 240, 255, 0.1)',
          maxWidth: 'calc(100vw - 3rem)',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#00F0FF', fontWeight: 800 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
            <rect x="5" y="2" width="14" height="20" rx="7" />
            <path d="M12 6v4" />
          </svg>
          SCROLL ↓ / ↑
        </span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span>
        <span style={{ color: '#FFFFFF' }}>Drive / Reverse</span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span>
        <span style={{ color: '#00F0FF', fontWeight: 800 }}>← / → or A / D</span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span>
        <span>Steer</span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span>
        <span style={{ color: '#FF007F', fontWeight: 800 }}>F</span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span>
        <span>Open Article</span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span>
        <span style={{ color: '#00E599', fontWeight: 800 }}>SPACE</span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span>
        <span>Auto Drive</span>
      </div>

      {/* Auto Drive Toggle Button */}
      <button
        id="auto-drive-btn"
        type="button"
        onClick={(e) => {
          toggleAutoDrive();
          e.currentTarget.blur();
        }}
        onKeyDown={(e) => {
          if (e.code === 'Space' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
          }
        }}
        title="Toggle Auto Drive (Spacebar)"
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          zIndex: 40,
          background: autoDrive ? 'rgba(0, 240, 255, 0.2)' : 'rgba(10, 2, 20, 0.75)',
          border: `1px solid ${autoDrive ? '#00F0FF' : 'rgba(0, 240, 255, 0.3)'}`,
          color: autoDrive ? '#00F0FF' : 'rgba(255, 255, 255, 0.7)',
          padding: '0.75rem 1.25rem',
          borderRadius: '8px',
          fontFamily: 'var(--font-sans, sans-serif)',
          fontWeight: 'bold',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          backdropFilter: 'blur(12px)',
          boxShadow: autoDrive ? '0 0 15px rgba(0, 240, 255, 0.4)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {autoDrive ? 'Auto Drive: ON' : 'Auto Drive: OFF'}
      </button>

      {/* Wikipedia Article Cards traveling down the road */}
      {popups.map((popup) => (
        <WikiCard
          key={popup.id}
          popup={popup}
          driveDistance={driveDistance}
          playerX={playerX}
          isClosest={popup.id === closestPopupId}
        />
      ))}
    </div>
  );
}

// ----------------------------------------------------------------------------
// Canvas Layer Render Helpers
// ----------------------------------------------------------------------------

function drawSkyAndSun(ctx, width, height, horizonY, sunCenterX, sunCenterY, sunRadius, playerX = 0) {
  const shiftX = -playerX * (width * 0.02);
  const cx = sunCenterX + shiftX;

  // 1. Deep space sky gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
  skyGrad.addColorStop(0, '#040008');
  skyGrad.addColorStop(0.5, '#18042e');
  skyGrad.addColorStop(1, '#420747');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Cyberspace Digital Starfield (optimized, no shadow blur on each star)
  const now = Date.now() * 0.002;
  ctx.save();
  for (let i = 0; i < CYBER_STARS.length; i++) {
    const star = CYBER_STARS[i];
    const starX = ((star.x * width + shiftX * 0.6) % width + width) % width;
    const starY = star.y * horizonY;
    const alpha = 0.4 + 0.5 * Math.sin(now + star.twinklePhase);

    ctx.globalAlpha = Math.max(0.15, alpha);
    ctx.fillStyle = star.color;
    ctx.beginPath();
    ctx.arc(starX, starY, star.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.restore();

  // 3. Synthwave sun (neon pink to magenta/purple, NO YELLOW)
  const sunGrad = ctx.createLinearGradient(0, sunCenterY - sunRadius, 0, horizonY);
  sunGrad.addColorStop(0, '#FF4D94');
  sunGrad.addColorStop(0.35, '#ff007f');
  sunGrad.addColorStop(0.75, '#ff0055');
  sunGrad.addColorStop(1, '#9d00ff');
  ctx.fillStyle = sunGrad;

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, sunCenterY, sunRadius, 0, Math.PI * 2);
  ctx.fill();

  // 4. Retro Horizontal Synthwave Sun Slats
  const numSlats = 8;
  const slatStartY = sunCenterY + sunRadius * 0.05;
  const slatSpan = sunCenterY + sunRadius - slatStartY;

  for (let s = 0; s < numSlats; s++) {
    const norm = (s + 1) / (numSlats + 1);
    const slatY = slatStartY + norm * slatSpan;
    const slatH = 2.0 + norm * 5.0;

    ctx.fillStyle = '#18042e';
    ctx.fillRect(cx - sunRadius - 10, slatY, (sunRadius + 10) * 2, slatH);
  }

  // 5. Sun glow aura
  const sunGlow = ctx.createRadialGradient(
    cx,
    sunCenterY,
    sunRadius * 0.5,
    cx,
    sunCenterY,
    sunRadius * 2.3
  );
  sunGlow.addColorStop(0, 'rgba(255, 0, 127, 0.45)');
  sunGlow.addColorStop(0.5, 'rgba(0, 240, 255, 0.22)');
  sunGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = sunGlow;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function drawMountains(ctx, width, horizonY, playerX = 0) {
  const shift = -playerX * (width * 0.035);
  ctx.fillStyle = '#0e041d';
  ctx.beginPath();
  ctx.moveTo(0, horizonY);
  ctx.lineTo(width * 0.15 + shift, horizonY - 45);
  ctx.lineTo(width * 0.28 + shift, horizonY - 20);
  ctx.lineTo(width * 0.4 + shift, horizonY - 60);
  ctx.lineTo(width * 0.5 + shift, horizonY - 25);
  ctx.lineTo(width * 0.65 + shift, horizonY - 70);
  ctx.lineTo(width * 0.8 + shift, horizonY - 30);
  ctx.lineTo(width, horizonY);
  ctx.closePath();
  ctx.fill();
}

function drawGridFloor(ctx, width, height, horizonY, sunCenterX, offset, playerX = 0, speed = 0) {
  ctx.save();

  // 1. Base dark cyberspace ground
  const floorGrad = ctx.createLinearGradient(0, horizonY, 0, height);
  floorGrad.addColorStop(0, '#100324');
  floorGrad.addColorStop(0.4, '#0a0218');
  floorGrad.addColorStop(1, '#030008');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, horizonY, width, height - horizonY);

  const fanning = 26;
  const cx = sunCenterX;

  // 2. Central Information Superhighway Expressway Deck (Lanes -5 to +5)
  const startLeft  = cx - playerX * (width * 0.04) + (-5 / fanning) * (width * 0.05);
  const startRight = cx - playerX * (width * 0.04) + (5 / fanning) * (width * 0.05);
  const endLeft    = cx - playerX * (width * 0.40) - 5 * (width * 0.08);
  const endRight   = cx - playerX * (width * 0.40) + 5 * (width * 0.08);

  const highwayDeckGrad = ctx.createLinearGradient(0, horizonY, 0, height);
  highwayDeckGrad.addColorStop(0, 'rgba(32, 6, 60, 0.85)');
  highwayDeckGrad.addColorStop(0.5, 'rgba(16, 3, 34, 0.92)');
  highwayDeckGrad.addColorStop(1, 'rgba(6, 1, 16, 0.98)');
  ctx.fillStyle = highwayDeckGrad;
  ctx.beginPath();
  ctx.moveTo(startLeft, horizonY);
  ctx.lineTo(startRight, horizonY);
  ctx.lineTo(endRight, height);
  ctx.lineTo(endLeft, height);
  ctx.closePath();
  ctx.fill();

  // Highway deck road surface sheen
  const sheenGrad = ctx.createLinearGradient(0, horizonY, 0, height);
  sheenGrad.addColorStop(0, 'rgba(0, 240, 255, 0.08)');
  sheenGrad.addColorStop(0.6, 'rgba(255, 0, 127, 0.05)');
  sheenGrad.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
  ctx.fillStyle = sheenGrad;
  ctx.beginPath();
  ctx.moveTo(startLeft, horizonY);
  ctx.lineTo(startRight, horizonY);
  ctx.lineTo(endRight, height);
  ctx.lineTo(endLeft, height);
  ctx.closePath();
  ctx.fill();

  // 3. Horizon anchor neon line
  ctx.lineWidth = 2.0;
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.75)';
  ctx.shadowColor = '#00F0FF';
  ctx.shadowBlur = 6;
  ctx.beginPath();
  ctx.moveTo(0, horizonY);
  ctx.lineTo(width, horizonY);
  ctx.stroke();

  // 4. Horizontal perspective grid lines moving forward/backward
  const numH = 18;
  for (let i = 0; i < numH; i++) {
    const progress = (((i + offset / 40) % numH) + numH) % numH / numH;
    const py = horizonY + Math.pow(progress, 2.5) * (height - horizonY);

    ctx.strokeStyle = `rgba(0, 240, 255, ${0.20 + progress * 0.70})`;
    ctx.shadowColor = '#00F0FF';
    ctx.shadowBlur = progress * 6;
    ctx.lineWidth = Math.max(0.7, progress * 2.0);
    ctx.beginPath();
    ctx.moveTo(0, py);
    ctx.lineTo(width, py);
    ctx.stroke();
  }

  // 5. Vertical perspective lines fanning outward, shifting laterally with steering
  // NO center yellow line! Skip i === 0. Left lanes = Cyan, Right lanes = Magenta, transparent and glowy.
  for (let i = -fanning; i <= fanning; i++) {
    if (i === 0) continue; // Yellow center line completely removed!

    const startX = cx - playerX * (width * 0.04) + (i / fanning) * (width * 0.05);
    const endX   = cx - playerX * (width * 0.40) + i * (width * 0.08);

    const isInnerLane = Math.abs(i) <= 5;
    if (i < 0) {
      // Left side: glowing transparent Cyan
      ctx.strokeStyle = isInnerLane ? 'rgba(0, 240, 255, 0.42)' : 'rgba(0, 240, 255, 0.20)';
      ctx.shadowColor = '#00F0FF';
      ctx.shadowBlur = isInnerLane ? 8 : 3;
      ctx.lineWidth = isInnerLane ? 1.2 : 0.85;
    } else {
      // Right side: glowing transparent Magenta
      ctx.strokeStyle = isInnerLane ? 'rgba(255, 0, 127, 0.42)' : 'rgba(255, 0, 127, 0.20)';
      ctx.shadowColor = '#FF007F';
      ctx.shadowBlur = isInnerLane ? 8 : 3;
      ctx.lineWidth = isInnerLane ? 1.2 : 0.85;
    }

    ctx.beginPath();
    ctx.moveTo(startX, horizonY);
    ctx.lineTo(endX, height);
    ctx.stroke();
  }

  // 6. Highway Shoulder Laser Barrier Rails (lineIndex = -5 and +5)
  // Transparent and glowy (user request: "the cyan and magent line around the yellow line should be more transparent and glowy")
  ctx.lineWidth = 2.4;

  // Left shoulder laser rail (Cyan)
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.50)';
  ctx.shadowColor = '#00F0FF';
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.moveTo(startLeft, horizonY);
  ctx.lineTo(endLeft, height);
  ctx.stroke();

  // Right shoulder laser rail (Hot Magenta)
  ctx.strokeStyle = 'rgba(255, 0, 127, 0.50)';
  ctx.shadowColor = '#FF007F';
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.moveTo(startRight, horizonY);
  ctx.lineTo(endRight, height);
  ctx.stroke();

  // Shoulder Light Beacons along the highway edges
  const numBeacons = 7;
  for (let b = 1; b <= numBeacons; b++) {
    const p = Math.pow(b / numBeacons, 2.5);
    const by = horizonY + p * (height - horizonY);
    const bxl = startLeft + (endLeft - startLeft) * p;
    const bxr = startRight + (endRight - startRight) * p;
    const beaconSize = Math.max(1.5, p * 4.5);

    // Left beacon
    ctx.fillStyle = 'rgba(0, 240, 255, 0.85)';
    ctx.shadowColor = '#00F0FF';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(bxl, by, beaconSize, 0, Math.PI * 2);
    ctx.fill();

    // Right beacon
    ctx.fillStyle = 'rgba(255, 0, 127, 0.85)';
    ctx.shadowColor = '#FF007F';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(bxr, by, beaconSize, 0, Math.PI * 2);
    ctx.fill();
  }

  // 7. Yellow center highway divider line: COMPLETELY REMOVED!

  // 8. Digital Data Packets / Fiber Light Photons racing along highway lanes (no yellow)
  const nowSec = Date.now() * 0.001;
  for (const photon of PHOTON_SEEDS) {
    const t = (nowSec * photon.speedMult + photon.phase) % 1;
    const p = Math.pow(t, 2.6);
    if (p < 0.05) continue;

    const startLaneX = cx - playerX * (width * 0.04) + (photon.lane / fanning) * (width * 0.05);
    const endLaneX   = cx - playerX * (width * 0.40) + photon.lane * (width * 0.08);
    const px = startLaneX + (endLaneX - startLaneX) * p;
    const py = horizonY + p * (height - horizonY);

    const pPrev = Math.max(0, p - 0.04);
    const prevPx = startLaneX + (endLaneX - startLaneX) * pPrev;
    const prevPy = horizonY + pPrev * (height - horizonY);

    ctx.strokeStyle = photon.glow;
    ctx.shadowColor = photon.color;
    ctx.shadowBlur = 10;
    ctx.lineWidth = Math.max(1.0, p * 3.5);
    ctx.beginPath();
    ctx.moveTo(prevPx, prevPy);
    ctx.lineTo(px, py);
    ctx.stroke();

    // Bright photon head
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(px, py, Math.max(1.2, p * 3.0), 0, Math.PI * 2);
    ctx.fill();
  }

  // 9. Peripheral Speed Warp Rays when driving fast (speed > 75 mph)
  if (speed > 75) {
    const warpIntensity = Math.min(1, (speed - 75) / 100);
    ctx.save();
    ctx.globalAlpha = warpIntensity * 0.30;
    ctx.strokeStyle = '#00F0FF';
    ctx.shadowColor = '#00F0FF';
    ctx.shadowBlur = 8;
    ctx.lineWidth = 1.5;

    const numWarps = 8;
    for (let w = 0; w < numWarps; w++) {
      const side = w % 2 === 0 ? 0 : width;
      const wy = horizonY + ((w * 137 + offset * 8) % (height - horizonY));
      const targetX = side === 0 ? width * 0.25 : width * 0.75;
      ctx.beginPath();
      ctx.moveTo(side, wy);
      ctx.lineTo(targetX, wy + 20);
      ctx.stroke();
    }
    ctx.restore();
  }

  ctx.shadowBlur = 0;
  ctx.restore();
}

// ----------------------------------------------------------------------------
// F-Zero Tron Bike — Canvas Helpers
// ----------------------------------------------------------------------------

function getBikePosOnLine(width, horizonY, height, sunCenterX, lineIndex, t, playerX) {
  const fanning = 26;
  const cx = sunCenterX;
  const startX = cx - playerX * (width * 0.04) + (lineIndex / fanning) * (width * 0.05);
  const endX   = cx - playerX * (width * 0.40) + lineIndex * (width * 0.08);
  const progressY = Math.pow(Math.max(0, Math.min(1, t)), 2.5);
  return {
    x: startX + (endX - startX) * progressY,
    y: horizonY + progressY * (height - horizonY),
    progressY,
  };
}

function updateAndDrawBikes(ctx, width, height, horizonY, sunCenterX, bikes, playerX, speed) {
  for (const bike of bikes) {
    bike.t += bike.speed + Math.max(0, speed) * 0.00012;
    if (bike.t > 0.93) {
      bike.t = 0.03 + Math.random() * 0.07;
      bike.trail = [];
    }

    const { x, y, progressY } = getBikePosOnLine(
      width,
      horizonY,
      height,
      sunCenterX,
      bike.lineIndex,
      bike.t,
      playerX
    );
    if (y < horizonY) continue;

    const fadeIn = Math.min(1, bike.t * 6);
    const scale  = Math.pow(progressY, 0.72) * 0.9;

    bike.trail.push({ x, y });
    if (bike.trail.length > 20) bike.trail.shift();

    // Draw speed trail
    ctx.save();
    ctx.strokeStyle = bike.exhaust;
    ctx.shadowColor = bike.color;
    ctx.shadowBlur = 6;
    for (let i = 1; i < bike.trail.length; i++) {
      const ratio = i / bike.trail.length;
      ctx.globalAlpha = ratio * ratio * 0.85 * fadeIn;
      ctx.lineWidth = Math.max(0.4, ratio * progressY * 3.8);
      ctx.beginPath();
      ctx.moveTo(bike.trail[i - 1].x, bike.trail[i - 1].y);
      ctx.lineTo(bike.trail[i].x,     bike.trail[i].y);
      ctx.stroke();
    }
    ctx.restore();

    // Draw bike body
    if (scale > 0.03 && fadeIn > 0.08) {
      const angle = Math.atan2(horizonY - y, sunCenterX - x);
      ctx.save();
      ctx.globalAlpha = Math.min(1, fadeIn);
      drawFZeroBike(ctx, x, y, scale, bike.color, bike.exhaust, angle);
      ctx.restore();
    }
  }
}

function drawFZeroBike(ctx, x, y, scale, color, exhaustColor, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(scale, scale);

  ctx.shadowColor = color;
  ctx.shadowBlur  = 16;

  // Main hull
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(22, 0);
  ctx.bezierCurveTo(16, -5.5,  -8, -5.5, -18, 0);
  ctx.bezierCurveTo(-8,  5.5,  16,  5.5,  22, 0);
  ctx.fill();

  // Hull edge highlight
  ctx.strokeStyle = 'rgba(255,255,255,0.28)';
  ctx.lineWidth   = 0.7;
  ctx.shadowBlur  = 0;
  ctx.beginPath();
  ctx.moveTo(20, -2);
  ctx.bezierCurveTo(12, -5.5, -6, -5.5, -16, -1);
  ctx.stroke();

  // Cockpit canopy
  ctx.shadowColor = 'rgba(160,240,255,0.7)';
  ctx.shadowBlur  = 6;
  ctx.fillStyle   = 'rgba(155, 235, 255, 0.90)';
  ctx.beginPath();
  ctx.ellipse(6, 0, 7.5, 3.8, 0, 0, Math.PI * 2);
  ctx.fill();

  // Glare
  ctx.fillStyle = 'rgba(255,255,255,0.52)';
  ctx.beginPath();
  ctx.ellipse(7.5, -1.4, 3.2, 1.4, -0.3, 0, Math.PI * 2);
  ctx.fill();

  // Left stabiliser wing
  ctx.shadowColor = color;
  ctx.shadowBlur  = 8;
  ctx.fillStyle   = color;
  ctx.beginPath();
  ctx.moveTo( 2,  -5);
  ctx.lineTo(-10, -17);
  ctx.lineTo(-18, -13);
  ctx.lineTo( -6,  -4);
  ctx.closePath();
  ctx.fill();

  // Right stabiliser wing
  ctx.beginPath();
  ctx.moveTo( 2,   5);
  ctx.lineTo(-10,  17);
  ctx.lineTo(-18,  13);
  ctx.lineTo( -6,   4);
  ctx.closePath();
  ctx.fill();

  // Wing accent striping
  ctx.strokeStyle = 'rgba(255,255,255,0.35)';
  ctx.lineWidth   = 0.9;
  ctx.shadowBlur  = 0;
  ctx.beginPath(); ctx.moveTo(0, -5.5); ctx.lineTo(-13, -15); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0,  5.5); ctx.lineTo(-13,  15); ctx.stroke();

  // Nose bumper
  ctx.shadowColor = 'rgba(255,255,255,0.9)';
  ctx.shadowBlur  = 8;
  ctx.fillStyle   = 'rgba(255,255,255,0.95)';
  ctx.beginPath();
  ctx.arc(22, 0, 3.0, 0, Math.PI * 2);
  ctx.fill();

  // Twin engine exhausts
  ctx.shadowColor = exhaustColor;
  ctx.shadowBlur  = 16;
  ctx.fillStyle = exhaustColor;
  ctx.beginPath();
  ctx.ellipse(-18, -2.6, 4.0, 2.1, 0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(-18,  2.6, 4.0, 2.1, -0.1, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.restore();
}

// ----------------------------------------------------------------------------
// WikiCard Component (Hardware-accelerated, memoized, with [F] targeting badge)
// ----------------------------------------------------------------------------

const WikiCard = React.memo(function WikiCard({
  popup,
  driveDistance,
  playerX = 0,
  isClosest = false,
}) {
  const rawProgress = (driveDistance - popup.startDist) / 36;

  // Once it passes the camera (rawProgress > 1.02), it is GONE into the rearview mirror!
  if (rawProgress > 1.02) return null;

  const title = popup.title || CURATED_WIKI_FALLBACKS[0].title;
  const extract = popup.extract || CURATED_WIKI_FALLBACKS[0].extract;
  const image = popup.image || CURATED_WIKI_FALLBACKS[0].image;
  const url = popup.url || CURATED_WIKI_FALLBACKS[0].url;

  const p = Math.max(0, Math.min(1, rawProgress));
  const progressY = Math.pow(p, 2.5);

  const topPct = 52 + progressY * 45;
  const scale = Math.max(0.01, progressY * 3.0);
  const opacity = p > 0.84 ? Math.max(0, 1 - (p - 0.84) * 6.0) : 1;

  const isLeft = popup.number % 2 === 0;
  const lineIndex = isLeft ? -2 : 2;
  const startX_pct = 50 - playerX * 4 + (lineIndex / 26) * 5;
  const endX_pct   = 50 - playerX * 40 + lineIndex * 8;
  const currentX_pct = startX_pct + (endX_pct - startX_pct) * progressY;

  const primaryColor = isLeft ? '#00F0FF' : '#FF007F';
  const waveGlow = isLeft ? 'rgba(0, 240, 255, 0.6)' : 'rgba(255, 0, 127, 0.6)';
  const secondaryGlow = isLeft ? 'rgba(255, 0, 127, 0.35)' : 'rgba(0, 240, 255, 0.35)';
  const innerGlow = isLeft ? 'rgba(0, 240, 255, 0.18)' : 'rgba(255, 0, 127, 0.18)';

  const boxShadowBase = isClosest
    ? `0 14px 40px rgba(0,0,0,0.85), 0 0 35px ${waveGlow}, 0 0 60px ${secondaryGlow}, 0 0 16px #00F0FF, inset 0 0 20px ${innerGlow}`
    : `0 12px 35px rgba(0,0,0,0.8), 0 0 30px ${waveGlow}, 0 0 55px ${secondaryGlow}, inset 0 0 20px ${innerGlow}`;
  const boxShadowHover = `0 16px 45px rgba(0,0,0,0.9), 0 0 45px ${waveGlow}, 0 0 75px ${secondaryGlow}, inset 0 0 25px ${innerGlow}`;

  const isClickable = opacity > 0.3 && url;

  const handleClick = () => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: `${topPct}%`,
        left: `${currentX_pct}%`,
        transform: `translate(-50%, -100%) scale(${scale})`,
        transformOrigin: '50% 100%',
        opacity,
        zIndex: Math.round(45 + p * 20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        willChange: 'transform, opacity',
        pointerEvents: isClickable ? 'auto' : 'none',
        cursor: isClickable ? 'pointer' : 'default',
      }}
      onClick={handleClick}
      title={url ? `Open "${title}" on Wikipedia (Press F)` : undefined}
    >
      <div
        style={{
          background:
            'linear-gradient(135deg, rgba(8,2,28,0.96) 0%, rgba(22,4,42,0.96) 50%, rgba(3,14,36,0.98) 100%)',
          backdropFilter: 'blur(16px)',
          border: `2.5px solid ${isClosest ? '#00F0FF' : primaryColor}`,
          borderRadius: '14px',
          width: '340px',
          maxWidth: '88vw',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: boxShadowBase,
          position: 'relative',
          transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = boxShadowHover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = boxShadowBase;
        }}
      >
        {/* Top accent line (Cyan to Purple to Magenta - NO YELLOW) */}
        <div
          style={{
            height: '4px',
            background: 'linear-gradient(90deg, #00F0FF 0%, #9D00FF 50%, #FF007F 100%)',
            boxShadow: '0 0 10px #00F0FF, 0 0 16px #FF007F',
            flexShrink: 0,
          }}
        />

        {/* Text body */}
        <div
          style={{
            padding: '0.95rem 1.15rem 1.15rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem',
          }}
        >
          {/* Wikipedia badge + status / F shortcut indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  color: primaryColor,
                  textShadow: `0 0 8px ${primaryColor}`,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                ◈ Wikipedia
              </span>
              {popup.isCuratedFallback ? (
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.54rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    padding: '1px 5px',
                    borderRadius: '3px',
                    background: 'rgba(255, 0, 127, 0.2)',
                    border: '1px solid rgba(255, 0, 127, 0.55)',
                    color: '#FF007F',
                    textShadow: '0 0 6px rgba(255, 0, 127, 0.6)',
                  }}
                >
                  CURATED BACKUP
                </span>
              ) : (
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.54rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    padding: '1px 5px',
                    borderRadius: '3px',
                    background: 'rgba(0, 240, 255, 0.2)',
                    border: '1px solid rgba(0, 240, 255, 0.55)',
                    color: '#00F0FF',
                    textShadow: '0 0 6px rgba(0, 240, 255, 0.6)',
                  }}
                >
                  LIVE STREAM
                </span>
              )}
            </div>

            {isClosest ? (
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  color: '#00F0FF',
                  letterSpacing: '0.06em',
                  background: 'rgba(0, 240, 255, 0.22)',
                  border: '1px solid #00F0FF',
                  padding: '2px 7px',
                  borderRadius: '4px',
                  boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                PRESS [F] ↗
              </span>
            ) : (
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.58rem',
                  color: 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.06em',
                }}
              >
                click or press F ↗
              </span>
            )}
          </div>

          {/* Article image */}
          <div
            style={{
              width: '100%',
              height: '145px',
              borderRadius: '8px',
              overflow: 'hidden',
              flexShrink: 0,
              position: 'relative',
              border: `1.5px solid ${isLeft ? 'rgba(0, 240, 255, 0.4)' : 'rgba(255, 0, 127, 0.4)'}`,
              boxShadow: `0 6px 18px rgba(0,0,0,0.6), inset 0 0 12px ${innerGlow}`,
              background: 'rgba(4, 2, 16, 0.8)',
            }}
          >
            <img
              src={image}
              alt={title}
              referrerPolicy="no-referrer"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                filter: 'brightness(0.95) saturate(1.15)',
              }}
              onError={(e) => {
                const randomFallback =
                  CURATED_WIKI_FALLBACKS[
                    Math.floor(Math.random() * CURATED_WIKI_FALLBACKS.length)
                  ].image;
                if (e.currentTarget.src !== randomFallback) {
                  e.currentTarget.src = randomFallback;
                }
              }}
            />
            {/* Subtle gradient vignette */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to bottom, transparent 65%, rgba(8,2,28,0.7) 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Article headline / title */}
          <div
            style={{
              fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)',
              fontSize: '1.15rem',
              fontWeight: 700,
              lineHeight: 1.25,
              color: '#FFFFFF',
              textShadow: `0 0 15px rgba(255,255,255,0.9), 0 0 30px ${waveGlow}`,
              letterSpacing: '0.01em',
            }}
          >
            {title}
          </div>

          {/* Article extract / summary */}
          {extract && (
            <div
              style={{
                fontFamily: 'var(--font-sans, sans-serif)',
                fontSize: '0.78rem',
                fontWeight: 400,
                lineHeight: 1.5,
                color: 'rgba(225, 225, 255, 0.88)',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {extract}
            </div>
          )}
        </div>
      </div>

      {/* Sign post pole */}
      <div
        style={{
          width: '3px',
          height: '32px',
          background: `linear-gradient(to bottom, ${primaryColor}, rgba(0,0,0,0))`,
          boxShadow: `0 0 6px ${primaryColor}`,
          borderRadius: '0 0 3px 3px',
        }}
      />
    </div>
  );
});
