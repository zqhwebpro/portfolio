// App.js
const { useState, useEffect, useMemo } = React;

const YOUTUBE_API_KEY = "AIzaSyBihjoihZeQhF_QaCjg4vwg19ypqrA-wZQ";
const EXERCISE_BASE_RAW = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';
const EXERCISEDB_DIRECT_DATASET = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json';

const AFFIRMATIONS = [
    "POWER, FOCUS, AND DISCIPLINE",
    "YOU BELONG HERE",
    "PROGRESS OVER PERFECTION",
    "MAXIMUM ATHLETIC ENERGY",
    "EVERY REP COUNTS",
    "MINDSET IS EVERYTHING",
    "CONSISTENCY CREATES CHAMPIONS",
    "STRONGER THAN YESTERDAY",
    "ONE REP AT A TIME",
    "CRUSH YOUR LIMITS",
    "UNSTOPPABLE DRIVE",
    "EARNED NOT GIVEN",
    "FOCUS ON THE FORM",
    "TRUST THE PROCESS",
    "SHOW UP FOR YOURSELF",
    "SWEAT IS JUST WEAKNESS LEAVING THE BODY",
    "BETTER TODAY THAN YESTERDAY",
    "DISCIPLINE EQUALS FREEDOM",
    "STRENGTH BEGINS IN THE MIND",
    "ENERGY FLOWS WHERE ATTENTION GOES",
    "DO NOT WISH FOR IT, WORK FOR IT",
    "FUEL YOUR AMBITION",
    "NO SHORTCUTS, ONLY DEDICATION",
    "FINISH STRONGER THAN YOU STARTED",
    "PROVE IT TO YOURSELF",
    "LOCK IN AND EXECUTE"
];

const WORKOUT_STYLES = [
    { id: 'all', label: 'ALL CATEGORIES' },
    { id: 'strength', label: 'STRENGTH' },
    { id: 'stretching', label: 'STRETCH' },
    { id: 'plyometrics', label: 'CARDIO & PLYO' },
    { id: 'strongman', label: 'POWER CIRCUIT' },
    { id: 'powerlifting', label: 'LIFTING' },
    { id: 'cardio', label: 'CARDIO' },
    { id: 'olympic weightlifting', label: 'ATHLETIC' }
];

const MUSCLE_GROUPS = [
    { id: 'all', label: 'FULL BODY' },
    { id: 'chest', label: 'CHEST' },
    { id: 'back', label: 'BACK' },
    { id: 'biceps', label: 'BICEPS' },
    { id: 'triceps', label: 'TRICEPS' },
    { id: 'shoulders', label: 'SHOULDERS' },
    { id: 'quads', label: 'QUADS' },
    { id: 'hamstrings', label: 'HAMSTRINGS' },
    { id: 'calves', label: 'CALVES' },
    { id: 'abs', label: 'CORE' }
];

const MUSCLE_TAG_MAP = {
    chest: ['chest', 'pectorals', 'pectoralis major', 'pectoralis minor'],
    back: ['lats', 'latissimus dorsi', 'middle back', 'lower back', 'traps', 'trapezius', 'rhomboids'],
    biceps: ['biceps', 'biceps brachii', 'brachialis'],
    triceps: ['triceps', 'triceps brachii'],
    shoulders: ['shoulders', 'deltoids', 'deltoid', 'anterior deltoids', 'lateral deltoids', 'posterior deltoids'],
    quads: ['quadriceps', 'quads', 'rectus femoris', 'vastus lateralis', 'vastus medialis'],
    hamstrings: ['hamstrings', 'biceps femoris'],
    calves: ['calves', 'gastrocnemius', 'soleus'],
    abs: ['abdominals', 'abs', 'rectus abdominis', 'obliques', 'transverse abdominis']
};

const isExerciseInMuscleGroup = (exercise, groupKey) => {
    if (!exercise || groupKey === 'all') return true;
    const validTags = MUSCLE_TAG_MAP[groupKey];
    if (!validTags) return false;

    const rawTargets = [
        ...(Array.isArray(exercise.primaryMuscles) ? exercise.primaryMuscles : []),
        exercise.target,
        exercise.bodyPart
    ].filter(Boolean).map(s => s.toLowerCase().trim());

    if (rawTargets.length === 0) return false;

    return rawTargets.some(raw => {
        if (groupKey === 'triceps' && raw.includes('quadriceps')) return false;
        return validTags.some(tag => {
            const regex = new RegExp(`(^|\\b|_|\\s)${tag}(\\b|_|\\s|$)`, 'i');
            return regex.test(raw);
        });
    });
};

const isExerciseInCategory = (exercise, categoryKey) => {
    if (!exercise || categoryKey === 'all') return true;
    const cat = (exercise.category || '').toLowerCase().trim();
    return cat === categoryKey.toLowerCase();
};

const normalizeMuscleName = (muscleStr) => {
    if (!muscleStr) return '';
    const s = muscleStr.toLowerCase().trim();
    if (s.includes('quadriceps') || s.includes('quad')) return 'quads';
    if (s.includes('triceps')) return 'triceps';

    for (const [groupKey, tags] of Object.entries(MUSCLE_TAG_MAP)) {
        if (tags.some(tag => {
            const regex = new RegExp(`(^|\\b|_|\\s)${tag}(\\b|_|\\s|$)`, 'i');
            return regex.test(s);
        })) {
            return groupKey;
        }
    }
    return s;
};

const formatImageUrl = (relativePath) => {
    if (!relativePath) return null;
    const encoded = relativePath.split('/').map(encodeURIComponent).join('/');
    return `${EXERCISE_BASE_RAW}${encoded}`;
};

function RenderLockIcon({ locked = false, className = "w-4 h-4" }) {
    return locked ? (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
        </svg>
    ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M12 1c-2.76 0-5 2.24-5 5v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2h-3V6c0-1.71 1.39-3.1 3.1-3.1 1.35 0 2.52.88 2.93 2.13.15.48.61.8 1.11.8.69 0 1.22-.64 1.05-1.31C18.66 2.45 15.6 1 12 1zm0 12c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
        </svg>
    );
}

function RenderIsolatedMusclePath({ muscleKey, fillColor = "#1d4ed8", strokeColor = "#ffb81c" }) {
    switch (muscleKey) {
        case 'shoulders':
            return (
                <g transform="translate(-10, 10)">
                    <path d="M 40 40 C 30 46 24 60 30 72 C 34 76 38 74 40 68 C 42 60 41 50 40 40 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
                    <path d="M 80 40 C 90 46 96 60 90 72 C 86 76 82 74 80 68 C 78 60 79 50 80 40 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
                </g>
            );
        case 'chest':
            return (
                <g transform="translate(-10, 8)">
                    <path d="M 44 42 C 54 41 61 44 62 54 C 62 68 48 72 42 70 C 38 62 40 48 44 42 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
                    <path d="M 76 42 C 66 41 59 44 58 54 C 58 68 72 72 78 70 C 82 62 80 48 76 42 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
                </g>
            );
        case 'biceps':
            return (
                <g transform="translate(-10, 0)">
                    <path d="M 38 42 C 30 50 30 64 38 74 C 43 75 47 71 48 62 C 49 53 47 45 38 42 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
                    <path d="M 82 42 C 90 50 90 64 82 74 C 77 75 73 71 72 62 C 71 53 73 45 82 42 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
                </g>
            );
        case 'triceps':
            return (
                <g transform="translate(-10, 0)">
                    <path d="M 36 40 C 28 52 30 70 38 78 C 43 78 46 72 47 62 C 47 52 44 44 36 40 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
                    <path d="M 84 40 C 92 52 90 70 82 78 C 77 78 74 72 73 62 C 73 52 76 44 84 40 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
                </g>
            );
        case 'back':
            return (
                <g transform="translate(-10, 6)">
                    <path d="M 52 32 L 68 32 L 82 48 L 60 74 L 38 48 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
                    <path d="M 40 52 C 32 68 35 92 45 104 C 48 96 49 84 49 72 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
                    <path d="M 80 52 C 88 68 85 92 75 104 C 72 96 71 84 71 72 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
                </g>
            );
        case 'abs':
            return (
                <g transform="translate(-10, 10)">
                    <rect x="47" y="32" width="11" height="13" rx="2" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
                    <rect x="62" y="32" width="11" height="13" rx="2" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
                    <rect x="46" y="48" width="12" height="13" rx="2" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
                    <rect x="62" y="48" width="12" height="13" rx="2" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
                    <rect x="47" y="64" width="11" height="13" rx="2" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
                    <rect x="62" y="64" width="11" height="13" rx="2" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
                </g>
            );
        case 'quads':
            return (
                <g transform="translate(-10, 0)">
                    <path d="M 46 36 C 36 54 34 84 42 110 C 49 114 58 112 58 104 C 60 80 58 54 46 36 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
                    <path d="M 74 36 C 84 54 86 84 78 110 C 71 114 62 112 62 104 C 60 80 62 54 74 36 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
                </g>
            );
        case 'hamstrings':
            return (
                <g transform="translate(-10, 0)">
                    <path d="M 46 36 C 42 56 44 82 51 102 C 58 104 64 100 64 90 C 65 68 64 46 56 36 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
                    <path d="M 74 36 C 78 56 76 82 69 102 C 62 104 56 100 56 90 C 55 68 56 46 64 36 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
                </g>
            );
        case 'calves':
            return (
                <g transform="translate(-10, 0)">
                    <path d="M 44 40 C 38 56 41 80 50 96 L 56 96 C 58 80 57 60 52 40 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
                    <path d="M 76 40 C 82 56 79 80 70 96 L 64 96 C 62 80 63 60 68 40 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
                </g>
            );
        default:
            return (
                <g transform="translate(-10, 0)">
                    <circle cx="60" cy="50" r="14" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
                    <path d="M 45 70 Q 60 62 75 70 L 72 105 Q 60 108 48 105 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
                </g>
            );
    }
}

function AnatomyBadgeCard({ activeMuscle, displayTargetName }) {
    const pri = normalizeMuscleName(activeMuscle);

    return (
        <div className="bg-white rounded-2xl border-2 border-pf-border flex items-stretch min-h-[64px] overflow-hidden shadow-xs">
            <div className="w-14 bg-blue-50 border-r-2 border-pf-border flex items-center justify-center p-1.5 shrink-0">
                <svg viewBox="0 0 100 120" className="w-full h-full object-contain">
                    <RenderIsolatedMusclePath muscleKey={pri} fillColor="#1d4ed8" strokeColor="#ffb81c" />
                </svg>
            </div>
            <div className="flex-1 px-3.5 py-2 flex flex-col justify-center text-left min-w-0">
                <span className="text-[10px] font-extrabold text-pf-blue uppercase tracking-wider">
                    TARGET MUSCLE
                </span>
                <span className="text-sm font-extrabold text-pf-blackblue uppercase tracking-tight truncate">
                    {displayTargetName || 'Full Body'}
                </span>
            </div>
        </div>
    );
}

function MetricCard({ label, value }) {
    return (
        <div className="bg-white rounded-2xl border-2 border-pf-border px-3.5 py-2 flex flex-col justify-center text-left min-h-[64px] shadow-xs">
            <span className="text-[10px] font-extrabold text-pf-blue uppercase tracking-wider">
                {label}
            </span>
            <span className="text-sm font-extrabold text-pf-blackblue uppercase tracking-tight truncate">
                {value}
            </span>
        </div>
    );
}

function ExerciseMotionFeed({ exercise }) {
    const [frameIndex, setFrameIndex] = useState(0);
    const [imageError, setImageError] = useState(false);
    const images = exercise?.images || [];

    useEffect(() => {
        setFrameIndex(0);
        setImageError(false);
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setFrameIndex(prev => (prev + 1) % images.length);
        }, 850);

        return () => clearInterval(interval);
    }, [exercise?.name, images.length]);

    const activeImageSrc = exercise?.gifUrl
        ? exercise.gifUrl
        : images.length > 0
            ? formatImageUrl(images[frameIndex])
            : null;

    return (
        <div className="pf-panel p-3.5 flex flex-col flex-1 h-full min-h-[300px]">
            <div className="flex items-center justify-between pb-2.5 mb-2 border-b-2 border-pf-border shrink-0">
                <span className="text-xs font-black tracking-wider text-pf-blue uppercase">
                    MOTION FEED & PREVIEW
                </span>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-pf-yellow text-pf-blackblue shadow-xs">
                    ACTIVE
                </span>
            </div>
            <div className="flex-1 w-full h-full min-h-[260px] relative rounded-xl overflow-hidden bg-[#0f172a] flex items-center justify-center border-2 border-pf-border shadow-inner">
                {activeImageSrc && !imageError ? (
                    <img
                        key={`${exercise?.name}-${frameIndex}`}
                        src={activeImageSrc}
                        alt={exercise?.name}
                        onError={() => setImageError(true)}
                        className="h-full w-full object-cover object-center"
                    />
                ) : (
                    <div className="flex flex-col items-center gap-2 text-white/70">
                        <span className="text-3xl">🏋️</span>
                        <span className="text-[11px] font-bold uppercase tracking-wider">FEED UNAVAILABLE</span>
                    </div>
                )}
            </div>
        </div>
    );
}

function YouTubeFormDeck({ exercise }) {
    const [videos, setVideos] = useState([]);
    const [selectedVideoId, setSelectedVideoId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const cleanHtmlEntities = (str) => {
        if (!str) return '';
        const txt = document.createElement('textarea');
        txt.innerHTML = str;
        return txt.value;
    };

    const fetchYouTubeTutorials = async () => {
        if (!exercise?.name) return;
        setLoading(true);
        setError(null);

        const searchQuery = `${exercise.name} exercise tutorial form`;
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(
            searchQuery
        )}&type=video&key=${YOUTUBE_API_KEY}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData?.error?.message || `HTTP ${response.status}`);
            }
            const data = await response.json();
            const items = data.items || [];
            setVideos(items);
            if (items.length > 0) {
                setSelectedVideoId(items[0].id.videoId);
            } else {
                setSelectedVideoId(null);
            }
        } catch (err) {
            setError(err.message || 'Tutorial guides currently unavailable.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchYouTubeTutorials();
    }, [exercise?.name]);

    return (
        <div className="pf-card p-3.5 flex flex-col h-full min-h-[320px] overflow-hidden">
            <div className="flex items-center justify-between border-b-2 border-pf-border pb-2.5 mb-2.5 shrink-0">
                <span className="text-xs font-black tracking-wider text-pf-blue uppercase">
                    VIDEO TUTORIALS
                </span>
            </div>

            <div className="flex-1 min-h-0 flex flex-col gap-2 overflow-hidden">
                <div className="w-full aspect-video bg-[#0f172a] rounded-xl overflow-hidden border-2 border-pf-border shrink-0 flex items-center justify-center">
                    {selectedVideoId ? (
                        <iframe
                            key={selectedVideoId}
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=0&rel=0`}
                            title="Exercise Form Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <div className="text-white/70 text-xs font-bold uppercase">
                            {loading ? 'Finding tutorials...' : 'No Video Selected'}
                        </div>
                    )}
                </div>

                <div className="flex-1 min-h-[140px] overflow-y-auto pr-1 space-y-2">
                    {loading ? (
                        <div className="h-full flex flex-col items-center justify-center gap-2 py-6 text-pf-blue">
                            <div className="w-6 h-6 border-3 border-pf-blue border-t-transparent rounded-full animate-spin" />
                            <span className="text-[11px] font-bold uppercase tracking-wider">
                                Searching guides...
                            </span>
                        </div>
                    ) : error ? (
                        <div className="text-center py-6 text-xs text-pf-slate font-medium space-y-2 px-2">
                            <p className="text-red-500 font-bold">{error}</p>
                            <button
                                onClick={fetchYouTubeTutorials}
                                className="px-3.5 py-1.5 btn-pf-blue text-[10px] font-bold uppercase"
                            >
                                Retry Search
                            </button>
                        </div>
                    ) : videos.length > 0 ? (
                        videos.map((vid) => {
                            const isCurrent = vid.id.videoId === selectedVideoId;
                            return (
                                <div
                                    key={vid.id.videoId}
                                    onClick={() => setSelectedVideoId(vid.id.videoId)}
                                    className={`p-2.5 rounded-xl border-2 flex items-center gap-2.5 cursor-pointer transition ${isCurrent
                                        ? 'bg-blue-50 border-pf-blue text-pf-blackblue shadow-xs'
                                        : 'bg-white border-pf-border text-pf-charcoal hover:border-pf-blue/50'
                                        }`}
                                >
                                    <div className="w-16 h-10 shrink-0 rounded-lg overflow-hidden bg-black relative">
                                        <img
                                            src={vid.snippet.thumbnails?.medium?.url || vid.snippet.thumbnails?.default?.url}
                                            alt={vid.snippet.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[11px] font-bold line-clamp-2 leading-snug">
                                            {cleanHtmlEntities(vid.snippet.title)}
                                        </p>
                                        <span className="text-[9px] font-semibold text-pf-slate truncate block mt-0.5">
                                            {vid.snippet.channelTitle}
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-6 text-pf-slate text-xs font-semibold uppercase">
                            No guides found for this movement.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function App() {
    const [allDatabase, setAllDatabase] = useState([]);
    const [routineDeck, setRoutineDeck] = useState({});
    const [groupIndices, setGroupIndices] = useState({});
    const [selectedStyle, setSelectedStyle] = useState('all');
    const [selectedMuscle, setSelectedMuscle] = useState('all');
    const [lockedMuscles, setLockedMuscles] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Marquee speed in seconds
    const [marqueeSpeed, setMarqueeSpeed] = useState(38);

    const handleSpeedFaster = (e) => {
        if (e) e.stopPropagation();
        setMarqueeSpeed(prev => Math.max(10, prev - 5));
    };

    const handleSpeedSlower = (e) => {
        if (e) e.stopPropagation();
        setMarqueeSpeed(prev => Math.min(90, prev + 5));
    };

    const [favoriteGroups, setFavoriteGroups] = useState(() => {
        try {
            const saved = localStorage.getItem('workout_favorite_groups');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    });
    const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
    const [editingGroupId, setEditingGroupId] = useState(null);
    const [editingTitle, setEditingTitle] = useState('');

    useEffect(() => {
        try {
            localStorage.setItem('workout_favorite_groups', JSON.stringify(favoriteGroups));
        } catch (e) {
            console.error('Failed to persist favorites', e);
        }
    }, [favoriteGroups]);

    const generateNewWorkoutSession = (dataset, styleFilter = 'all') => {
        if (!dataset || dataset.length === 0) return;

        const newDeck = { ...routineDeck };
        const newIndices = { ...groupIndices };

        const pool = dataset.filter(ex => isExerciseInCategory(ex, styleFilter));

        MUSCLE_GROUPS.forEach(group => {
            if (lockedMuscles[group.id] && routineDeck[group.id]?.length > 0) {
                return;
            }

            let matches = [];
            if (group.id === 'all') {
                matches = pool.length > 0 ? pool : dataset;
            } else {
                matches = pool.filter(ex => isExerciseInMuscleGroup(ex, group.id));
                if (matches.length === 0) {
                    matches = dataset.filter(ex => isExerciseInMuscleGroup(ex, group.id));
                }
            }

            const shuffled = [...matches].sort(() => 0.5 - Math.random()).slice(0, 8);
            newDeck[group.id] = shuffled;
            newIndices[group.id] = 0;
        });

        setRoutineDeck(newDeck);
        setGroupIndices(newIndices);
    };

    useEffect(() => {
        const loadInitialDataset = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(EXERCISEDB_DIRECT_DATASET);
                if (!response.ok) throw new Error('Failed to load dataset.');
                const data = await response.json();
                setAllDatabase(data);
                generateNewWorkoutSession(data, 'all');
            } catch (err) {
                setError('Unable to fetch exercise database.');
            } finally {
                setLoading(false);
            }
        };

        loadInitialDataset();
    }, []);

    const handleStyleButtonClick = (styleId) => {
        setSelectedStyle(styleId);

        if (lockedMuscles[selectedMuscle]) return;

        let pool = allDatabase.filter(ex => isExerciseInCategory(ex, styleId));
        let matches = [];

        if (selectedMuscle === 'all') {
            matches = pool.length > 0 ? pool : allDatabase;
        } else {
            matches = pool.filter(ex => isExerciseInMuscleGroup(ex, selectedMuscle));
            if (matches.length === 0) {
                matches = allDatabase.filter(ex => isExerciseInMuscleGroup(ex, selectedMuscle));
            }
        }

        if (matches.length === 0) return;

        const shuffled = [...matches].sort(() => 0.5 - Math.random()).slice(0, 8);

        setRoutineDeck(prev => ({
            ...prev,
            [selectedMuscle]: shuffled
        }));
        setGroupIndices(prev => ({
            ...prev,
            [selectedMuscle]: 0
        }));
    };

    const handleFocusChange = (muscleId) => {
        setSelectedMuscle(muscleId);
    };

    const toggleLockCurrent = (e) => {
        if (e) e.stopPropagation();
        setLockedMuscles(prev => ({
            ...prev,
            [selectedMuscle]: !prev[selectedMuscle]
        }));
    };

    const handleNext = (e) => {
        if (e) e.stopPropagation();
        if (lockedMuscles[selectedMuscle]) return;

        const activeList = routineDeck[selectedMuscle] || [];
        if (activeList.length <= 1) return;

        setGroupIndices(prev => ({
            ...prev,
            [selectedMuscle]: ((prev[selectedMuscle] || 0) + 1) % activeList.length
        }));
    };

    const handlePrev = (e) => {
        if (e) e.stopPropagation();
        if (lockedMuscles[selectedMuscle]) return;

        const activeList = routineDeck[selectedMuscle] || [];
        if (activeList.length <= 1) return;

        setGroupIndices(prev => ({
            ...prev,
            [selectedMuscle]: ((prev[selectedMuscle] || 0) - 1 + activeList.length) % activeList.length
        }));
    };

    const handleShuffle = (e) => {
        if (e) e.stopPropagation();
        generateNewWorkoutSession(allDatabase, selectedStyle);
    };

    const generateSerial = () => Math.floor(100000 + Math.random() * 900000).toString();

    const handleAddCurrentGroup = (e) => {
        if (e) e.stopPropagation();
        const serial = generateSerial();
        const newGroup = {
            id: 'grp_' + Date.now() + '_' + serial,
            serialCode: serial,
            name: `Routine #${serial}`,
            createdAt: new Date().toLocaleDateString(),
            deck: JSON.parse(JSON.stringify(routineDeck))
        };
        setFavoriteGroups(prev => [newGroup, ...prev]);
        setIsFavoritesOpen(true);
    };

    const handleDeleteGroup = (groupId, e) => {
        if (e) e.stopPropagation();
        setFavoriteGroups(prev => prev.filter(g => g.id !== groupId));
    };

    const handleStartRename = (group, e) => {
        if (e) e.stopPropagation();
        setEditingGroupId(group.id);
        setEditingTitle(group.name);
    };

    const handleSaveRename = (groupId, e) => {
        if (e) e.stopPropagation();
        if (!editingTitle.trim()) return;
        setFavoriteGroups(prev =>
            prev.map(g => (g.id === groupId ? { ...g, name: editingTitle.trim() } : g))
        );
        setEditingGroupId(null);
    };

    const handleLoadGroup = (group, e) => {
        if (e) e.stopPropagation();
        if (group && group.deck) {
            setRoutineDeck(group.deck);
            const resetIndices = {};
            MUSCLE_GROUPS.forEach(m => (resetIndices[m.id] = 0));
            setGroupIndices(resetIndices);
            setIsFavoritesOpen(false);
        }
    };

    const currentMuscleList = routineDeck[selectedMuscle] || [];
    const currentIndex = groupIndices[selectedMuscle] || 0;
    const currentExercise = currentMuscleList.length > 0 ? currentMuscleList[currentIndex] : null;
    const isCurrentLocked = !!lockedMuscles[selectedMuscle];

    const toTitleCase = (str) => {
        if (!str) return '';
        return str
            .replace(/_/g, ' ')
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const activeRawMuscle = useMemo(() => {
        if (!currentExercise) return '';
        return (currentExercise.primaryMuscles || [currentExercise.target])[0] || '';
    }, [currentExercise]);

    const displayTargetName = useMemo(() => {
        if (!activeRawMuscle) return '';
        const mapped = normalizeMuscleName(activeRawMuscle);
        return toTitleCase(mapped || activeRawMuscle);
    }, [activeRawMuscle]);

    const queriedMuscleCards = useMemo(() => {
        return MUSCLE_GROUPS.map(group => {
            const list = routineDeck[group.id] || [];
            const idx = groupIndices[group.id] || 0;
            const exercise = list[idx] || null;
            const isLocked = !!lockedMuscles[group.id];
            return {
                group,
                exercise,
                total: list.length,
                currentIndex: idx,
                isLocked
            };
        });
    }, [routineDeck, groupIndices, lockedMuscles]);

    return (
        <div className="w-screen min-h-screen lg:h-[100dvh] flex flex-col pb-28 md:pb-32 lg:pb-0 touch-pan-y overflow-x-hidden bg-pf-canvas">

            {/* Signature Royal Blue Header Marquee */}
            <header className="shrink-0 bg-pf-blue text-white px-3 md:px-4 py-2 flex items-center z-20 sticky top-0 w-full overflow-hidden shadow-md">
                <div className="flex items-center mr-4 shrink-0">
                    <span className="text-xs font-black tracking-wider text-white uppercase font-sans whitespace-nowrap">
                        WO RANDOMIZER
                    </span>
                </div>

                <div className="flex-1 whitespace-nowrap overflow-hidden py-0.5 cursor-default">
                    <div
                        className="animate-marquee text-xs font-bold tracking-widest text-pf-lightyellow select-none"
                        style={{ '--marquee-speed': `${marqueeSpeed}s`, animationDuration: `${marqueeSpeed}s` }}
                        title="Hover to pause"
                    >
                        {AFFIRMATIONS.map((text, i) => (
                            <span key={`a-${i}`} className="inline-flex items-center">
                                <span className="text-white">{text}</span>
                                <span className="mx-4 text-pf-yellow font-black">★</span>
                            </span>
                        ))}
                        {AFFIRMATIONS.map((text, i) => (
                            <span key={`b-${i}`} className="inline-flex items-center">
                                <span className="text-white">{text}</span>
                                <span className="mx-4 text-pf-yellow font-black">★</span>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Marquee Speed Controls on Right Side */}
                <div className="flex items-center gap-1 shrink-0 ml-3 pl-2.5 border-l border-white/25">
                    <span className="text-[9px] font-black uppercase tracking-wider text-white/80 hidden sm:inline mr-1 select-none">
                        Speed
                    </span>
                    <button
                        type="button"
                        onClick={handleSpeedSlower}
                        title="Slower speed"
                        aria-label="Slower marquee speed"
                        className="w-6 h-6 rounded-md bg-white/15 hover:bg-white/30 text-white font-black text-sm flex items-center justify-center transition active:scale-95 leading-none select-none"
                    >
                        -
                    </button>
                    <button
                        type="button"
                        onClick={handleSpeedFaster}
                        title="Faster speed"
                        aria-label="Faster marquee speed"
                        className="w-6 h-6 rounded-md bg-white/15 hover:bg-white/30 text-white font-black text-sm flex items-center justify-center transition active:scale-95 leading-none select-none"
                    >
                        +
                    </button>
                </div>
            </header>

            {/* Main Interactive Deck */}
            <main className="flex-1 w-full max-w-full p-2.5 md:p-3.5 flex flex-col gap-2.5 overflow-y-auto lg:overflow-hidden min-h-0 touch-pan-y">

                {/* Top White Bar: Action Controls on the Left, Muscle Groups on the Right */}
                <div className="shrink-0 pf-card px-3.5 py-2.5 flex items-center justify-between w-full max-w-full overflow-hidden">

                    {/* Left: Randomizer Action Button + Favorites */}
                    <div className="flex items-center gap-2 shrink-0 pr-3 border-r-2 border-pf-border">
                        <button
                            type="button"
                            onClick={handleShuffle}
                            title="Randomize unlocked workouts"
                            className="btn-pf-yellow h-9 px-4 flex items-center gap-2 text-xs uppercase"
                        >
                            <svg className="w-3.5 h-3.5 text-pf-blackblue" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
                            </svg>
                            <span className="hidden sm:inline">RANDOMIZE</span>
                        </button>

                        <button
                            type="button"
                            onClick={handleAddCurrentGroup}
                            title="Save current routine"
                            className="w-9 h-9 flex items-center justify-center font-extrabold text-base bg-white hover:bg-slate-100 text-pf-blue rounded-full border-2 border-pf-border shadow-xs active:scale-95 transition"
                        >
                            +
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsFavoritesOpen(true)}
                            title="Saved routines vault"
                            className="w-9 h-9 flex items-center justify-center text-sm bg-pf-blue text-pf-yellow rounded-full relative active:scale-95 transition shadow-xs"
                        >
                            <span>♥</span>
                            {favoriteGroups.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-pf-yellow text-pf-blackblue text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                                    {favoriteGroups.length}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Right: Muscle Group Selector Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar min-w-0 flex-1 pl-3">
                        <span className="text-xs font-extrabold text-pf-blue uppercase tracking-wider shrink-0 select-none whitespace-nowrap pr-1">
                            Muscle Groups:
                        </span>

                        <div className="flex items-center gap-1.5 shrink-0">
                            {MUSCLE_GROUPS.map(muscle => {
                                const isSelected = selectedMuscle === muscle.id;
                                return (
                                    <button
                                        key={muscle.id}
                                        type="button"
                                        onClick={() => handleFocusChange(muscle.id)}
                                        className={`px-3.5 py-1.5 font-bold text-xs tracking-wide transition shrink-0 uppercase select-none rounded-full ${isSelected
                                            ? 'bg-pf-blue text-white shadow-sm'
                                            : 'bg-slate-200/70 text-pf-blackblue hover:bg-pf-blue/20'
                                            }`}
                                    >
                                        {muscle.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                </div>

                {/* Main Showcase Row: Includes Focus Column on the Left, Workout Center, and YouTube on the Right */}
                <div className="flex-1 flex flex-col lg:flex-row gap-3 min-h-0 lg:overflow-hidden w-full max-w-full">

                    {/* Dedicated Skinny Focus Sidebar on the Left */}
                    <aside className="shrink-0 w-full lg:w-32 pf-card p-3 flex flex-col bg-slate-50 border-2 border-pf-border overflow-hidden">
                        <div className="pb-2 mb-2 border-b-2 border-pf-border flex items-center justify-between shrink-0">
                            <span className="text-xs font-black text-pf-blue tracking-wider uppercase">
                                FOCUS:
                            </span>
                        </div>
                        <div className="flex-1 flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-y-auto no-scrollbar pr-0.5">
                            {WORKOUT_STYLES.map(style => {
                                const isSelected = selectedStyle === style.id;
                                return (
                                    <button
                                        key={style.id}
                                        type="button"
                                        onClick={() => handleStyleButtonClick(style.id)}
                                        className={`py-2 px-2 font-black text-[10px] leading-tight transition shrink-0 uppercase select-none rounded-xl text-center shadow-2xs ${isSelected
                                                ? 'bg-pf-blue text-white shadow-xs'
                                                : 'bg-white text-pf-blackblue border border-pf-border hover:border-pf-blue/60'
                                            }`}
                                    >
                                        {style.label}
                                    </button>
                                );
                            })}
                        </div>
                    </aside>

                    {/* Center Instructional & Motion Protocol Column */}
                    <section className="flex-1 flex flex-col min-h-0 pf-card p-4 md:p-5 overflow-hidden">
                        {loading ? (
                            <div className="flex-1 min-h-[300px] flex flex-col items-center justify-center gap-3 text-pf-blue">
                                <div className="w-10 h-10 border-4 border-pf-blue border-t-pf-yellow rounded-full animate-spin" />
                                <span className="text-xs font-extrabold tracking-wider uppercase">Loading routine...</span>
                            </div>
                        ) : error ? (
                            <div className="flex-1 min-h-[300px] flex flex-col items-center justify-center text-center p-6">
                                <p className="text-sm text-red-500 font-bold uppercase mb-4">{error}</p>
                                <button
                                    onClick={handleShuffle}
                                    className="px-6 py-2.5 btn-pf-yellow text-xs uppercase"
                                >
                                    RETRY
                                </button>
                            </div>
                        ) : currentExercise ? (
                            <div className="flex-1 flex flex-col min-h-0 justify-between gap-3">

                                {/* Top Title & Metric Badges */}
                                <div className="shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b-2 border-pf-border">
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-pf-blue border border-blue-200">
                                                {currentExercise.category || currentExercise.bodyPart || 'STRENGTH'}
                                            </span>
                                            {isCurrentLocked && (
                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-pf-blue text-pf-yellow shadow-xs">
                                                    <RenderLockIcon locked={true} className="w-3 h-3 text-pf-yellow" />
                                                    LOCKED IN
                                                </span>
                                            )}
                                        </div>
                                        <h2 className="text-xl md:text-2xl font-black text-pf-blackblue tracking-tight uppercase leading-tight truncate">
                                            {currentExercise.name}
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 shrink-0 md:min-w-[420px] w-full md:w-auto">
                                        <AnatomyBadgeCard
                                            activeMuscle={activeRawMuscle}
                                            displayTargetName={displayTargetName}
                                        />

                                        <MetricCard
                                            label="EQUIPMENT"
                                            value={toTitleCase(currentExercise.equipment || 'BODY WEIGHT')}
                                        />

                                        <MetricCard
                                            label="LEVEL"
                                            value={toTitleCase(currentExercise.level || 'ALL LEVELS')}
                                        />
                                    </div>
                                </div>

                                {/* Center Split: Motion Preview Feed & Form Instructions */}
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3.5 min-h-0 lg:overflow-hidden">

                                    {/* Motion Feed */}
                                    <div className="md:col-span-6 min-h-0 flex flex-col h-full">
                                        <ExerciseMotionFeed exercise={currentExercise} />
                                    </div>

                                    {/* Instructions Box + Desktop Controls */}
                                    <div className="md:col-span-6 min-h-0 flex flex-col gap-2.5 overflow-hidden">
                                        <div className="flex-1 min-h-[220px] pf-panel p-3.5 flex flex-col overflow-hidden bg-white border-2 border-pf-border rounded-xl">
                                            <div className="pb-2 mb-2 border-b-2 border-pf-border flex items-center justify-between shrink-0">
                                                <span className="text-xs font-black text-pf-blue tracking-wider uppercase">
                                                    FORM PROTOCOL & CUES
                                                </span>
                                            </div>
                                            <div className="flex-1 overflow-y-auto text-xs leading-relaxed text-pf-charcoal pr-1 space-y-2.5 touch-pan-y">
                                                {Array.isArray(currentExercise.instructions) && currentExercise.instructions.length > 0 ? (
                                                    currentExercise.instructions.map((step, idx) => (
                                                        <div key={idx} className="flex items-start gap-2.5 p-1.5 rounded-lg bg-slate-50 border border-pf-border">
                                                            <span className="text-[10px] font-black text-white bg-pf-blue px-2 py-0.5 rounded-full shrink-0 shadow-xs">
                                                                {idx + 1}
                                                            </span>
                                                            <p className="flex-1 text-pf-charcoal text-xs leading-relaxed font-medium">{step}</p>
                                                        </div>
                                                    ))
                                                ) : typeof currentExercise.instructions === 'string' && currentExercise.instructions ? (
                                                    currentExercise.instructions.split('. ').map((step, idx) => (
                                                        step.trim() && (
                                                            <div key={idx} className="flex items-start gap-2.5 p-1.5 rounded-lg bg-slate-50 border border-pf-border">
                                                                <span className="text-[10px] font-black text-white bg-pf-blue px-2 py-0.5 rounded-full shrink-0 shadow-xs">
                                                                    {idx + 1}
                                                                </span>
                                                                <p className="flex-1 text-pf-charcoal text-xs leading-relaxed font-medium">{step.endsWith('.') ? step : `${step}.`}</p>
                                                            </div>
                                                        )
                                                    ))
                                                ) : (
                                                    <p className="text-pf-slate text-xs font-medium">Breathe steadily and execute smooth, controlled repetitions.</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Desktop Action Deck */}
                                        <div className="hidden lg:grid grid-cols-12 gap-2 pt-0.5 shrink-0 select-none items-center">
                                            <button
                                                type="button"
                                                onClick={handlePrev}
                                                disabled={loading || isCurrentLocked || currentMuscleList.length <= 1}
                                                className={`col-span-5 h-12 rounded-xl flex items-center justify-center gap-2 font-black text-xs uppercase transition ${isCurrentLocked
                                                    ? 'bg-pf-border text-pf-slate/50 cursor-not-allowed'
                                                    : 'btn-pf-blue'
                                                    }`}
                                            >
                                                <span className="text-base leading-none">◀</span>
                                                <span>PREV</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={toggleLockCurrent}
                                                title={isCurrentLocked ? "Unlock workout" : "Lock in workout"}
                                                className={`col-span-2 h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 cursor-pointer transition active:scale-95 border-2 ${isCurrentLocked
                                                    ? 'bg-pf-yellow text-pf-blackblue border-pf-yellow shadow-md'
                                                    : 'bg-white text-pf-blue border-pf-border hover:border-pf-blue'
                                                    }`}
                                            >
                                                <RenderLockIcon locked={isCurrentLocked} className="w-4 h-4" />
                                                <span className="text-[9px] font-black uppercase tracking-tight">
                                                    {isCurrentLocked ? 'LOCKED' : 'LOCK'}
                                                </span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={handleNext}
                                                disabled={loading || isCurrentLocked || currentMuscleList.length <= 1}
                                                className={`col-span-5 h-12 rounded-xl flex items-center justify-center gap-2 font-black text-xs uppercase transition ${isCurrentLocked
                                                    ? 'bg-pf-border text-pf-slate/50 cursor-not-allowed'
                                                    : 'btn-pf-blue'
                                                    }`}
                                            >
                                                <span>NEXT</span>
                                                <span className="text-base leading-none">▶</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ) : null}
                    </section>

                    {/* YouTube Video Tutorials on the Right Side of the Row */}
                    <aside className="w-full lg:w-80 shrink-0 flex flex-col min-h-[360px] lg:h-full lg:min-h-0">
                        <YouTubeFormDeck exercise={currentExercise} />
                    </aside>

                </div>

                {/* Bottom Active Stack Cards */}
                <div className="shrink-0 pf-card p-3 flex flex-col gap-1.5 w-full max-w-full overflow-hidden box-border">
                    <div className="flex items-center justify-between px-1 shrink-0">
                        <span className="text-xs font-black tracking-wider text-pf-blue uppercase">
                            Active Workout
                        </span>
                        <span className="text-[10px] font-bold text-pf-slate uppercase">
                            Click to select & inspect target
                        </span>
                    </div>

                    <div className="w-full max-w-full overflow-x-auto lg:overflow-x-hidden no-scrollbar py-0.5">
                        <div className="grid grid-flow-col auto-cols-[150px] lg:auto-cols-auto lg:grid-flow-row lg:grid-cols-10 gap-2 w-full">
                            {queriedMuscleCards.map(({ group, exercise, isLocked }) => {
                                const isSelected = group.id === selectedMuscle;
                                const previewImg = exercise?.gifUrl || (exercise?.images?.length ? formatImageUrl(exercise.images[0]) : null);

                                return (
                                    <div
                                        key={group.id}
                                        onClick={() => handleFocusChange(group.id)}
                                        className={`relative rounded-xl p-2 cursor-pointer transition flex items-center gap-2 min-w-0 border-2 ${isSelected
                                            ? 'bg-blue-50/70 border-pf-blue shadow-sm -translate-y-0.5 ring-2 ring-pf-blue/20'
                                            : isLocked
                                                ? 'bg-amber-50/60 border-pf-yellow'
                                                : 'bg-white border-pf-border hover:border-pf-blue/40'
                                            }`}
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-[#0f172a] overflow-hidden shrink-0 flex items-center justify-center border border-pf-border relative">
                                            {previewImg ? (
                                                <img
                                                    src={previewImg}
                                                    alt={exercise?.name || group.label}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                                />
                                            ) : (
                                                <span className="text-xs text-pf-yellow">⚡</span>
                                            )}
                                            {isLocked && (
                                                <div className="absolute inset-0 bg-pf-blackblue/80 flex items-center justify-center">
                                                    <RenderLockIcon locked={true} className="w-3.5 h-3.5 text-pf-yellow" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between gap-0.5 leading-none mb-0.5">
                                                <span className={`text-[8px] font-black uppercase tracking-wider truncate ${isSelected ? 'text-pf-blue' : 'text-pf-slate'}`}>
                                                    {group.label}
                                                </span>
                                                {isLocked && (
                                                    <span className="text-[7px] font-black bg-pf-yellow text-pf-blackblue px-1 py-0.2 rounded uppercase">
                                                        LOCKED
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-[10px] font-extrabold text-pf-blackblue truncate leading-tight">
                                                {exercise ? exercise.name : 'None'}
                                            </div>
                                            <div className="text-[8px] text-pf-slate capitalize truncate leading-none mt-0.5 font-medium">
                                                {exercise?.equipment || 'body weight'}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>

            {/* Mobile Fixed Bottom Controls */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-white/95 backdrop-blur-md border-t-2 border-pf-border shadow-xl select-none">
                <div className="max-w-md mx-auto grid grid-cols-12 gap-2 items-center">
                    <button
                        type="button"
                        onClick={handlePrev}
                        disabled={loading || isCurrentLocked || currentMuscleList.length <= 1}
                        className={`col-span-5 h-11 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 font-black text-xs uppercase leading-none shadow-sm ${isCurrentLocked ? 'bg-pf-border text-pf-slate/40' : 'btn-pf-blue'
                            }`}
                    >
                        <span className="text-sm leading-none">◀</span>
                        <span className="leading-none">PREV</span>
                    </button>

                    <button
                        type="button"
                        onClick={toggleLockCurrent}
                        className={`col-span-2 h-11 py-1 rounded-xl flex flex-col items-center justify-center gap-0.5 border-2 transition active:scale-95 leading-none shadow-xs ${isCurrentLocked
                                ? 'bg-pf-yellow text-pf-blackblue border-pf-yellow'
                                : 'bg-white text-pf-blue border-pf-border'
                            }`}
                    >
                        <RenderLockIcon locked={isCurrentLocked} className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-[8px] font-black uppercase leading-none">
                            {isCurrentLocked ? 'LOCKED' : 'LOCK'}
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={loading || isCurrentLocked || currentMuscleList.length <= 1}
                        className={`col-span-5 h-11 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 font-black text-xs uppercase leading-none shadow-sm ${isCurrentLocked ? 'bg-pf-border text-pf-slate/40' : 'btn-pf-blue'
                            }`}
                    >
                        <span className="leading-none">NEXT</span>
                        <span className="text-sm leading-none">▶</span>
                    </button>
                </div>
            </div>

            {/* Routine Vault Modal */}
            {isFavoritesOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-pf-blackblue/60 backdrop-blur-xs p-3 md:p-6">
                    <div className="pf-card w-full max-w-xl overflow-hidden flex flex-col max-h-[85vh] shadow-2xl">
                        <div className="px-5 py-4 border-b-2 border-pf-border flex items-center justify-between bg-pf-blue text-white">
                            <h3 className="text-sm font-black uppercase tracking-wider">
                                Saved Routines Vault
                            </h3>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleAddCurrentGroup}
                                    className="btn-pf-yellow px-3 py-1.5 text-xs uppercase font-extrabold"
                                >
                                    + Save Current
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsFavoritesOpen(false)}
                                    className="w-7 h-7 rounded-full bg-white text-pf-blue flex items-center justify-center font-black text-sm"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        <div className="p-4 overflow-y-auto space-y-2.5 flex-1 bg-pf-canvas">
                            {favoriteGroups.length === 0 ? (
                                <div className="text-center py-10 text-pf-slate">
                                    <span className="text-4xl block mb-2">📋</span>
                                    <p className="text-sm font-black text-pf-blackblue uppercase">No routines saved yet</p>
                                    <p className="text-xs text-pf-slate mt-1 font-medium">
                                        Click + in the Muscle bar to save your active workout deck.
                                    </p>
                                </div>
                            ) : (
                                favoriteGroups.map((group) => {
                                    const isEditing = editingGroupId === group.id;
                                    return (
                                        <div
                                            key={group.id}
                                            className="p-3.5 rounded-xl bg-white border-2 border-pf-border flex flex-col gap-2 shadow-xs"
                                        >
                                            <div className="flex items-center justify-between gap-2">
                                                {isEditing ? (
                                                    <div className="flex items-center gap-2 flex-1">
                                                        <input
                                                            type="text"
                                                            value={editingTitle}
                                                            onChange={(e) => setEditingTitle(e.target.value)}
                                                            className="flex-1 bg-white border-2 border-pf-blue rounded-lg px-2.5 py-1 text-sm font-bold text-pf-blackblue focus:outline-none"
                                                            autoFocus
                                                        />
                                                        <button
                                                            onClick={(e) => handleSaveRename(group.id, e)}
                                                            className="btn-pf-blue px-3 py-1 text-xs"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingGroupId(null)}
                                                            className="px-2 py-1 text-xs text-pf-slate hover:text-pf-blackblue"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <span className="text-sm font-black text-pf-blackblue truncate">
                                                            {group.name}
                                                        </span>
                                                        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-blue-50 text-pf-blue border border-blue-200 rounded font-bold">
                                                            #{group.serialCode}
                                                        </span>
                                                    </div>
                                                )}

                                                <span className="text-[10px] text-pf-slate shrink-0 font-medium">
                                                    {group.createdAt}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between pt-1 border-t border-pf-border text-xs">
                                                <button
                                                    type="button"
                                                    onClick={(e) => handleLoadGroup(group, e)}
                                                    className="btn-pf-blue px-3.5 py-1 text-[11px] font-bold"
                                                >
                                                    Load Workout
                                                </button>
                                                <div className="flex items-center gap-2">
                                                    {!isEditing && (
                                                        <button
                                                            type="button"
                                                            onClick={(e) => handleStartRename(group, e)}
                                                            className="text-pf-blue hover:underline font-bold cursor-pointer"
                                                        >
                                                            Rename
                                                        </button>
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={(e) => handleDeleteGroup(group.id, e)}
                                                        className="text-red-500 hover:text-red-700 font-bold cursor-pointer"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

window.App = App;