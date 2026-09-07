// App.js
const { useState, useEffect, useCallback, useRef } = React;

// ExerciseDB API with CORS Proxy wrapper
const BASE_URL = 'https://exercisedb-api.vercel.app/api/v1';
const CORS_PROXY = 'https://corsproxy.io/?';

const AFFIRMATIONS = [
    "BREATHE, CENTER, EXECUTE.",
    "CULTIVATE STRENGTH FROM INNER STILLNESS.",
    "EVERY REP REFINES YOUR FOCUS AND FORM.",
    "EFFORTLESS PRECISION IN EVERY MOTION.",
    "QUIET THE NOISE, CONQUER THE WEIGHT.",
    "POWER HARMONIZED WITH CONTROL."
];

const FITNESS_JOKES = [
    "Why don't bodybuilders play hide and seek? Because good luck hiding when you're always flexin'!",
    "I asked my trainer if I could do cardio on my phone. He said 'Sure, if you run away from your responsibilities!'",
    "Why did the dumbbell go to school? To get a little smarter before getting lifted!",
    "My favorite machine at the gym is the vending machine. 100% rep completion!",
    "Why did the squatter bring extra pencils? In case they needed to draw a deeper line!"
];

const MUSCLE_GROUPS = [
    { id: 'all', label: 'ALL TARGETS' },
    { id: 'chest', label: 'CHEST' },
    { id: 'back', label: 'BACK' },
    { id: 'biceps', label: 'BICEPS' },
    { id: 'triceps', label: 'TRICEPS' },
    { id: 'shoulders', label: 'SHOULDERS' },
    { id: 'quads', label: 'QUADS' },
    { id: 'hamstrings', label: 'HAMSTRINGS' },
    { id: 'calves', label: 'CALVES' },
    { id: 'abs', label: 'ABS' }
];

function MuscleWikiDiagram({ activeMuscle }) {
    const isTarget = (group) => {
        if (!activeMuscle) return false;
        const target = activeMuscle.toLowerCase();
        if (group === 'chest' && target.includes('chest')) return true;
        if (group === 'back' && (target.includes('back') || target.includes('lats') || target.includes('traps') || target.includes('upper back') || target.includes('lower back'))) return true;
        if (group === 'biceps' && target.includes('bicep')) return true;
        if (group === 'triceps' && target.includes('tricep')) return true;
        if (group === 'shoulders' && (target.includes('shoulder') || target.includes('deltoid'))) return true;
        if (group === 'quadriceps' && (target.includes('quad') || target.includes('leg'))) return true;
        if (group === 'hamstrings' && target.includes('hamstring')) return true;
        if (group === 'calves' && target.includes('cal')) return true;
        if (group === 'abdominals' && (target.includes('abs') || target.includes('abdominal') || target.includes('waist'))) return true;
        return false;
    };

    const getFill = (group) => isTarget(group) ? '#CCFF00' : '#27272A';
    const getStroke = (group) => isTarget(group) ? '#FFFFFF' : '#52525B';

    return (
        <div className="athletic-card rounded-2xl p-3 border border-white/10 flex flex-col items-center justify-between h-full w-full relative overflow-hidden">
            <div className="w-full flex items-center justify-between border-b border-white/10 pb-1.5 mb-1 shrink-0">
                <span className="text-[11px] font-black tracking-wider text-white uppercase italic">
                    MUSCLEWIKI ANATOMY MAP
                </span>
                <span className="text-[10px] font-extrabold text-[#CCFF00] tracking-widest uppercase bg-[#CCFF00]/10 px-2.5 py-0.5 rounded border border-[#CCFF00]/30">
                    {activeMuscle || 'FULL BODY'}
                </span>
            </div>

            <div className="flex-1 w-full flex items-center justify-center py-2 min-h-0 overflow-hidden relative">
                <svg viewBox="0 0 200 240" className="h-full w-auto max-h-[210px] object-contain filter drop-shadow-[0_0_12px_rgba(204,255,0,0.35)]">
                    <ellipse cx="100" cy="22" rx="14" ry="16" fill="#18181C" stroke="#3F3F46" strokeWidth="1.5" />
                    <path d="M88 36 L112 36 L116 48 L84 48 Z" fill="#18181C" stroke="#3F3F46" strokeWidth="1.5" />
                    <path d="M68 48 C55 50 50 66 58 80 C66 80 72 70 76 56 Z" fill={getFill('shoulders')} stroke={getStroke('shoulders')} strokeWidth="1.5" />
                    <path d="M132 48 C145 50 150 66 142 80 C134 80 128 70 124 56 Z" fill={getFill('shoulders')} stroke={getStroke('shoulders')} strokeWidth="1.5" />
                    <path d="M76 54 Q100 58 124 54 L120 86 Q100 94 80 86 Z" fill={getFill('chest')} stroke={getStroke('chest')} strokeWidth="1.5" />
                    <path d="M56 82 C50 92 50 110 58 120 C64 116 66 100 62 82 Z" fill={getFill('biceps')} stroke={getStroke('biceps')} strokeWidth="1.5" />
                    <path d="M144 82 C150 92 150 110 142 120 C136 116 134 100 138 82 Z" fill={getFill('biceps')} stroke={getStroke('biceps')} strokeWidth="1.5" />
                    <path d="M50 84 C45 94 45 106 52 114 C55 110 55 96 52 84 Z" fill={getFill('triceps')} stroke={getStroke('triceps')} strokeWidth="1.5" />
                    <path d="M150 84 C155 94 155 106 148 114 C145 110 145 96 148 84 Z" fill={getFill('triceps')} stroke={getStroke('triceps')} strokeWidth="1.5" />
                    <path d="M80 88 Q100 92 120 88 L114 142 Q100 146 86 142 Z" fill={getFill('abdominals')} stroke={getStroke('abdominals')} strokeWidth="1.5" />
                    <path d="M72 52 L128 52 L132 88 L68 88 Z" fill={getFill('back')} stroke={getStroke('back')} strokeWidth="1.5" opacity={isTarget('back') ? 1 : 0.2} />
                    <path d="M78 146 C70 162 72 202 82 216 C92 216 96 182 96 146 Z" fill={getFill('quadriceps')} stroke={getStroke('quadriceps')} strokeWidth="1.5" />
                    <path d="M122 146 C130 162 128 202 118 216 C108 216 104 182 104 146 Z" fill={getFill('quadriceps')} stroke={getStroke('quadriceps')} strokeWidth="1.5" />
                    <path d="M78 220 C72 228 74 236 80 238 C86 238 88 230 88 220 Z" fill={getFill('calves')} stroke={getStroke('calves')} strokeWidth="1.5" />
                    <path d="M122 220 C128 228 126 236 120 238 C114 238 112 230 112 220 Z" fill={getFill('calves')} stroke={getStroke('calves')} strokeWidth="1.5" />
                </svg>
            </div>
        </div>
    );
}

function SpotifyModule() {
    const [activePlaylist, setActivePlaylist] = useState('BEAST MODE');
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(35);
    const [currentTrack, setCurrentTrack] = useState({
        title: "Power Overload (130 BPM)",
        artist: "Spotify Workout Mix",
        cover: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=150&auto=format&fit=crop&q=80"
    });

    const playlists = [
        { name: 'BEAST MODE', track: 'Power Overload (130 BPM)', artist: 'Heavy Beats' },
        { name: 'POWERLIFT', track: 'Iron Metal Cadence', artist: 'Strength Lab' },
        { name: 'EDM WORKOUT', track: 'Neon Pump 140', artist: 'Electro Pulse' },
        { name: 'HIP HOP PUMP', track: 'Heavy Bass Reps', artist: 'Urban Hype' }
    ];

    const handlePlaylistChange = (pl) => {
        setActivePlaylist(pl.name);
        setCurrentTrack(prev => ({
            ...prev,
            title: pl.track,
            artist: pl.artist
        }));
        setIsPlaying(true);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="athletic-card rounded-2xl p-3 border border-white/10 flex flex-col gap-2.5 shrink-0 bg-black/40">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1DB954] animate-pulse" />
                    <span className="text-[11px] font-black tracking-wider text-white uppercase italic">
                        SPOTIFY WEB PLAYER
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-extrabold text-[#1DB954] bg-[#1DB954]/10 border border-[#1DB954]/30 px-2 py-0.5 rounded tracking-widest uppercase">
                        ONLINE
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                {playlists.map((pl) => (
                    <button
                        key={pl.name}
                        onClick={() => handlePlaylistChange(pl)}
                        className={`text-[9px] font-black px-2.5 py-1 rounded shrink-0 transition cursor-pointer tracking-wider uppercase ${activePlaylist === pl.name
                            ? 'bg-[#1DB954] text-black shadow-[0_0_10px_rgba(29,185,84,0.4)]'
                            : 'bg-white/5 text-slate-400 hover:text-white'
                            }`}
                    >
                        {pl.name}
                    </button>
                ))}
            </div>

            <div className="w-full p-2.5 rounded-xl bg-black/80 border border-white/10 flex flex-col gap-2 relative overflow-hidden">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-white/10 relative group">
                        <img src={currentTrack.cover} alt="Album Art" className="w-full h-full object-cover" />
                        {isPlaying && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5">
                                <span className="w-1 h-4 bg-[#1DB954] animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-1 h-4 bg-[#1DB954] animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-1 h-4 bg-[#1DB954] animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        )}
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col">
                        <span className="text-xs font-black text-white truncate uppercase tracking-tight">
                            {currentTrack.title}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 truncate">
                            {currentTrack.artist} • {activePlaylist}
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                        <button className="text-slate-400 hover:text-white text-xs px-1 cursor-pointer">⏮</button>
                        <button
                            onClick={togglePlay}
                            className="w-8 h-8 rounded-full bg-[#1DB954] text-black flex items-center justify-center text-sm font-bold hover:scale-105 transition cursor-pointer shadow-[0_0_12px_rgba(29,185,84,0.4)]"
                        >
                            {isPlaying ? '❚❚' : '▶'}
                        </button>
                        <button className="text-slate-400 hover:text-white text-xs px-1 cursor-pointer">⏭</button>
                    </div>
                </div>

                <div className="w-full flex items-center gap-2 pt-1">
                    <span className="text-[8px] font-mono font-bold text-slate-400">1:12</span>
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer relative">
                        <div
                            className="h-full bg-[#1DB954] rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className="text-[8px] font-mono font-bold text-slate-400">3:24</span>
                </div>
            </div>
        </div>
    );
}

function JokeOfTheDay() {
    const [jokeIndex, setJokeIndex] = useState(0);

    const handleNextJoke = () => {
        setJokeIndex(prev => (prev + 1) % FITNESS_JOKES.length);
    };

    return (
        <div className="athletic-card rounded-2xl p-2.5 border border-white/10 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 overflow-hidden">
                <span className="text-base">🏋️‍♂️</span>
                <div className="flex flex-col overflow-hidden">
                    <span className="text-[10px] font-black text-[#CCFF00] uppercase italic tracking-wider">JOKE OF THE DAY</span>
                    <p className="text-xs font-body font-normal text-slate-200 truncate">{FITNESS_JOKES[jokeIndex]}</p>
                </div>
            </div>
            <button
                onClick={handleNextJoke}
                className="text-[9px] font-black px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 transition shrink-0 uppercase tracking-wider border border-white/10 cursor-pointer"
            >
                NEXT JOKE ↻
            </button>
        </div>
    );
}

function App() {
    const [exercises, setExercises] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedMuscle, setSelectedMuscle] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [timerSeconds, setTimerSeconds] = useState(60);
    const [timerInitial, setTimerInitial] = useState(60);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const timerIntervalRef = useRef(null);

    const [isPlayingNoise, setIsPlayingNoise] = useState(false);
    const audioContextRef = useRef(null);
    const gainNodeRef = useRef(null);
    const oscillatorsRef = useRef([]);

    const playTimerChime = useCallback(() => {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(880, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.4);
            gain.gain.setValueAtTime(0.4, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.4);
        } catch (e) {
            console.warn('Audio chime error:', e);
        }
    }, []);

    useEffect(() => {
        if (isTimerRunning) {
            timerIntervalRef.current = setInterval(() => {
                setTimerSeconds(prev => {
                    if (prev <= 1) {
                        clearInterval(timerIntervalRef.current);
                        setIsTimerRunning(false);
                        playTimerChime();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
        }
        return () => {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        };
    }, [isTimerRunning, playTimerChime]);

    const setPresetTimer = (seconds) => {
        setIsTimerRunning(false);
        setTimerInitial(seconds);
        setTimerSeconds(seconds);
    };

    const toggleTimer = () => {
        if (timerSeconds === 0) {
            setTimerSeconds(timerInitial);
        }
        setIsTimerRunning(!isTimerRunning);
    };

    const resetTimer = () => {
        setIsTimerRunning(false);
        setTimerSeconds(timerInitial);
    };

    const toggleMeditationNoise = () => {
        if (isPlayingNoise) {
            if (gainNodeRef.current && audioContextRef.current) {
                gainNodeRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.4);
                setTimeout(() => {
                    oscillatorsRef.current.forEach(osc => {
                        try { osc.stop(); osc.disconnect(); } catch (e) { }
                    });
                    oscillatorsRef.current = [];
                    setIsPlayingNoise(false);
                }, 500);
            } else {
                setIsPlayingNoise(false);
            }
        } else {
            try {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                const ctx = new AudioCtx();
                audioContextRef.current = ctx;

                const masterGain = ctx.createGain();
                masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
                masterGain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 1.2);
                masterGain.connect(ctx.destination);
                gainNodeRef.current = masterGain;

                const freqs = [108, 216, 432];
                const oscList = [];

                freqs.forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const oscGain = ctx.createGain();
                    osc.type = idx === 0 ? 'triangle' : 'sine';
                    osc.frequency.setValueAtTime(freq, ctx.currentTime);

                    const lfo = ctx.createOscillator();
                    lfo.frequency.setValueAtTime(0.15 + idx * 0.05, ctx.currentTime);
                    const lfoGain = ctx.createGain();
                    lfoGain.gain.setValueAtTime(0.8, ctx.currentTime);
                    lfo.connect(lfoGain);
                    lfoGain.connect(osc.frequency);
                    lfo.start();

                    oscGain.gain.setValueAtTime(0.3 / (idx + 1), ctx.currentTime);
                    osc.connect(oscGain);
                    oscGain.connect(masterGain);
                    osc.start();
                    oscList.push(osc, lfo);
                });

                oscillatorsRef.current = oscList;
                setIsPlayingNoise(true);
            } catch (err) {
                console.warn('Audio Context start prevented:', err);
                setIsPlayingNoise(false);
            }
        }
    };

    const fetchExercises = useCallback(async (targetMuscle = selectedMuscle) => {
        setLoading(true);
        setError(null);
        setCurrentIndex(0);

        let targetEndpoint = `${BASE_URL}/exercises`;
        if (targetMuscle !== 'all') {
            targetEndpoint = `${BASE_URL}/exercises/target/${encodeURIComponent(targetMuscle)}`;
        }

        const proxiedUrl = `${CORS_PROXY}${encodeURIComponent(targetEndpoint)}`;

        try {
            const response = await fetch(proxiedUrl);
            if (!response.ok) throw new Error('Failed to load exercises via CORS proxy.');

            const result = await response.json();
            const data = Array.isArray(result) ? result : (result.data || []);

            if (!data || data.length === 0) throw new Error('No routines discovered for this muscle group.');

            setExercises(data.sort(() => 0.5 - Math.random()).slice(0, 8));
        } catch (err) {
            setError(err.message || 'Unable to load workouts.');
        } finally {
            setLoading(false);
        }
    }, [selectedMuscle]);

    useEffect(() => {
        fetchExercises();
    }, []);

    const handleMuscleChange = (muscleId) => {
        setSelectedMuscle(muscleId);
        fetchExercises(muscleId);
    };

    const handleNext = () => {
        if (!exercises.length) return;
        setCurrentIndex(prev => (prev + 1) % exercises.length);
    };

    const handlePrev = () => {
        if (!exercises.length) return;
        setCurrentIndex(prev => (prev - 1 + exercises.length) % exercises.length);
    };

    const handleShuffle = () => {
        fetchExercises(selectedMuscle);
    };

    const currentExercise = exercises[currentIndex];

    const videoExternalUrl = currentExercise
        ? `https://www.youtube.com/results?search_query=${encodeURIComponent(currentExercise.name + ' exercise proper form tutorial')}`
        : 'https://www.youtube.com';

    const formatTime = (secs) => {
        const mins = Math.floor(secs / 60);
        const remSecs = secs % 60;
        return `${mins}:${remSecs < 10 ? '0' : ''}${remSecs}`;
    };

    const toTitleCase = (str) => {
        if (!str) return '';
        return str
            .replace(/_/g, ' ')
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <div className="w-screen h-[100dvh] flex flex-col bg-carbon-pattern text-slate-100 overflow-hidden select-none">

            <header className="shrink-0 bg-[#09090B]/95 border-b border-white/10 px-4 py-2.5 flex items-center justify-between gap-4 z-20">
                <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xl md:text-2xl font-black italic tracking-tighter text-[#CCFF00]">
                        WORKOUT // SHUFFLER
                    </span>
                    <span className="hidden sm:inline-block text-[9px] px-2 py-0.5 rounded bg-[#CCFF00]/10 text-[#CCFF00] font-black uppercase tracking-widest border border-[#CCFF00]/30">
                        EXERCISEDB ENGINE
                    </span>
                </div>

                <div className="flex-1 overflow-hidden mx-4 hidden md:block border-x border-white/10 px-3 py-1 bg-black/40 rounded-full">
                    <div className="whitespace-nowrap overflow-hidden">
                        <div className="animate-marquee text-xs font-bold text-slate-300 italic tracking-wider">
                            {AFFIRMATIONS.join("   •   ")}   •   {AFFIRMATIONS.join("   •   ")}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <button
                        onClick={toggleMeditationNoise}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded transition cursor-pointer border font-black text-xs uppercase tracking-wider ${isPlayingNoise
                            ? 'bg-[#CCFF00] text-black border-[#CCFF00] shadow-[0_0_15px_rgba(204,255,0,0.5)]'
                            : 'athletic-card border-white/10 text-slate-300 hover:text-white'
                            }`}
                    >
                        <span>🧘</span>
                        <span>{isPlayingNoise ? '432HZ ACTIVE' : 'FOCUS TONE'}</span>
                    </button>
                </div>
            </header>

            <main className="flex-1 w-full min-h-0 p-2 md:p-4 overflow-hidden flex flex-col">
                <div className="w-full h-full flex flex-col gap-2 md:gap-3 min-h-0">

                    <div className="shrink-0 athletic-card rounded-2xl p-1.5 flex items-center gap-1 overflow-x-auto no-scrollbar border border-white/10">
                        <span className="text-[10px] font-black text-slate-400 px-2 shrink-0 italic uppercase">
                            TARGET:
                        </span>
                        {MUSCLE_GROUPS.map(muscle => (
                            <button
                                key={muscle.id}
                                onClick={() => handleMuscleChange(muscle.id)}
                                className={`px-3 py-1.5 rounded font-black text-xs tracking-wider transition shrink-0 cursor-pointer uppercase ${selectedMuscle === muscle.id
                                    ? 'bg-[#CCFF00] text-black shadow-[0_0_12px_rgba(204,255,0,0.4)]'
                                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {muscle.label}
                            </button>
                        ))}
                    </div>

                    <section className="flex-1 flex flex-col min-h-0 athletic-card athletic-card-glow rounded-3xl p-3 md:p-4 border border-white/10 relative overflow-hidden">
                        {loading ? (
                            <div className="flex-1 flex flex-col items-center justify-center gap-3">
                                <div className="w-12 h-12 border-4 border-white/10 border-t-[#CCFF00] rounded-full animate-spin" />
                                <span className="text-xs font-black tracking-widest text-[#CCFF00] uppercase">GENERATING MOVEMENT...</span>
                            </div>
                        ) : error ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                                <p className="text-sm text-[#FF2A2A] font-bold uppercase mb-4">{error}</p>
                                <button
                                    onClick={() => fetchExercises(selectedMuscle)}
                                    className="px-5 py-2.5 btn-neon rounded text-xs"
                                >
                                    RETRY CONNECTION
                                </button>
                            </div>
                        ) : currentExercise ? (
                            <div className="flex-1 flex flex-col min-h-0 justify-between gap-2.5">

                                <div className="shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-2 pb-2 border-b border-white/10">
                                    <div>
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="text-[10px] font-black text-[#CCFF00] uppercase tracking-widest bg-[#CCFF00]/10 px-2 py-0.5 rounded border border-[#CCFF00]/20">
                                                MOVEMENT {currentIndex + 1} / {exercises.length}
                                            </span>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                {currentExercise.bodyPart || 'FULL BODY'}
                                            </span>
                                        </div>
                                        <h2 className="text-xl md:text-2xl font-black text-white italic tracking-tight uppercase leading-none">
                                            {currentExercise.name}
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 shrink-0 md:min-w-[360px]">
                                        <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 text-center">
                                            <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">TARGET</span>
                                            <span className="text-sm md:text-base font-black text-white capitalize truncate mt-0.5 block">
                                                {toTitleCase(currentExercise.target)}
                                            </span>
                                        </div>
                                        <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 text-center">
                                            <span className="block text-[9px] font-extrabold text-[#CCFF00] uppercase tracking-widest">BODY PART</span>
                                            <span className="text-sm md:text-base font-black text-[#CCFF00] capitalize truncate mt-0.5 block">
                                                {toTitleCase(currentExercise.bodyPart)}
                                            </span>
                                        </div>
                                        <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 text-center">
                                            <span className="block text-[9px] font-extrabold text-slate-300 uppercase tracking-widest">EQUIPMENT</span>
                                            <span className="text-sm md:text-base font-black text-white capitalize truncate mt-0.5 block">
                                                {toTitleCase(currentExercise.equipment || 'body weight')}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-0 overflow-hidden">

                                    <div className="lg:col-span-4 athletic-card rounded-2xl p-2 flex flex-col min-h-[160px] border border-white/10">
                                        <div className="flex items-center justify-between pb-1 mb-1 border-b border-white/10">
                                            <span className="text-[11px] font-black text-white tracking-wider uppercase italic">
                                                ANIMATED DEMO
                                            </span>
                                            <a
                                                href={videoExternalUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-[10px] text-[#CCFF00] hover:underline font-bold tracking-wider uppercase"
                                            >
                                                YOUTUBE ↗
                                            </a>
                                        </div>
                                        <div className="flex-1 w-full h-full relative rounded-xl overflow-hidden bg-black border border-white/10 flex items-center justify-center p-1">
                                            {currentExercise.gifUrl ? (
                                                <img
                                                    src={currentExercise.gifUrl}
                                                    alt={currentExercise.name}
                                                    className="max-h-full max-w-full object-contain rounded-lg filter drop-shadow-md"
                                                />
                                            ) : (
                                                <span className="text-xs text-slate-400 font-bold uppercase">NO ANIMATION</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="lg:col-span-4 flex flex-col min-h-[160px]">
                                        <MuscleWikiDiagram activeMuscle={currentExercise.target || currentExercise.bodyPart} />
                                    </div>

                                    <div className="lg:col-span-4 flex flex-col gap-2 min-h-0 overflow-hidden">
                                        <SpotifyModule />
                                        <JokeOfTheDay />

                                        <div className="flex-1 athletic-card rounded-2xl p-3 flex flex-col min-h-[120px] overflow-hidden border border-white/10">
                                            <div className="pb-1 mb-1 border-b border-white/10">
                                                <span className="text-[11px] font-black text-white tracking-wider uppercase italic">
                                                    EXECUTION STEPS
                                                </span>
                                            </div>
                                            <div className="flex-1 overflow-y-auto text-xs md:text-sm leading-relaxed text-slate-100 pr-1 select-text space-y-2 font-body font-normal">
                                                {Array.isArray(currentExercise.instructions) && currentExercise.instructions.length > 0 ? (
                                                    currentExercise.instructions.map((step, idx) => (
                                                        <div key={idx} className="flex items-start gap-2">
                                                            <span className="text-[10px] font-bold text-black bg-[#CCFF00] px-1.5 py-0.5 rounded mt-0.5 shrink-0 font-body">
                                                                {idx + 1}
                                                            </span>
                                                            <p className="flex-1 font-body text-slate-200">{step}</p>
                                                        </div>
                                                    ))
                                                ) : typeof currentExercise.instructions === 'string' && currentExercise.instructions ? (
                                                    currentExercise.instructions.split('. ').map((step, idx) => (
                                                        step.trim() && (
                                                            <div key={idx} className="flex items-start gap-2">
                                                                <span className="text-[10px] font-bold text-black bg-[#CCFF00] px-1.5 py-0.5 rounded mt-0.5 shrink-0 font-body">
                                                                    {idx + 1}
                                                                </span>
                                                                <p className="flex-1 font-body text-slate-200">{step.endsWith('.') ? step : `${step}.`}</p>
                                                            </div>
                                                        )
                                                    ))
                                                ) : (
                                                    <p className="text-slate-400 font-body">Perform standard cadence and maintain controlled breathing.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="shrink-0 flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-white/10">

                                    <div className="athletic-card px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black uppercase text-slate-400 italic">REST TIMER</span>
                                            <span className={`font-mono text-base font-black px-2 py-0.5 rounded border ${isTimerRunning
                                                ? 'text-[#CCFF00] bg-[#CCFF00]/10 border-[#CCFF00]/40 animate-pulse'
                                                : 'text-white bg-black/60 border-white/10'
                                                }`}>
                                                {formatTime(timerSeconds)}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            {[
                                                { label: '1M', sec: 60 },
                                                { label: '3M', sec: 180 },
                                                { label: '5M', sec: 300 }
                                            ].map(preset => (
                                                <button
                                                    key={preset.sec}
                                                    onClick={() => setPresetTimer(preset.sec)}
                                                    className={`text-[10px] font-black px-2 py-0.5 rounded transition cursor-pointer ${timerInitial === preset.sec && !isTimerRunning
                                                        ? 'bg-[#CCFF00] text-black'
                                                        : 'bg-white/5 text-slate-400 hover:text-white'
                                                        }`}
                                                >
                                                    {preset.label}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={toggleTimer}
                                                className={`text-xs font-black px-3 py-1 rounded transition cursor-pointer uppercase ${isTimerRunning
                                                    ? 'bg-[#FF2A2A] text-white'
                                                    : 'bg-[#CCFF00] text-black'
                                                    }`}
                                            >
                                                {isTimerRunning ? 'PAUSE' : 'START'}
                                            </button>
                                            <button
                                                onClick={resetTimer}
                                                className="text-[10px] text-slate-400 hover:text-white px-1 cursor-pointer font-bold"
                                                title="RESET TIMER"
                                            >
                                                ↺
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                        <button
                                            onClick={handlePrev}
                                            disabled={loading || !exercises.length}
                                            className="flex-1 sm:flex-initial py-2 px-4 rounded athletic-card hover:bg-white/10 border border-white/10 font-black text-xs text-slate-200 transition cursor-pointer disabled:opacity-50 uppercase tracking-wider"
                                        >
                                            ← PREV
                                        </button>
                                        <button
                                            onClick={handleShuffle}
                                            disabled={loading}
                                            className="flex-1 sm:flex-initial py-2 px-6 rounded btn-neon font-black text-xs transition cursor-pointer disabled:opacity-50 uppercase tracking-widest"
                                        >
                                            ✦ SHUFFLE
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            disabled={loading || !exercises.length}
                                            className="flex-1 sm:flex-initial py-2 px-4 rounded athletic-card hover:bg-white/10 border border-white/10 font-black text-xs text-slate-200 transition cursor-pointer disabled:opacity-50 uppercase tracking-wider"
                                        >
                                            NEXT →
                                        </button>
                                    </div>

                                </div>

                            </div>
                        ) : null}
                    </section>

                </div>
            </main>

        </div>
    );
}

window.App = App;