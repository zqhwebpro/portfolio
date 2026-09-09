// App.js
const { useState, useEffect, useMemo } = React;

const YOUTUBE_API_KEY = "AIzaSyBihjoihZeQhF_QaCjg4vwg19ypqrA-wZQ";
const EXERCISE_BASE_RAW = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';
const EXERCISEDB_DIRECT_DATASET = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json';

const AFFIRMATIONS = [
    "BREATHE, CENTER, AND EXECUTE WITH DISCIPLINE",
    "STRENGTH ARISES FROM PATIENCE AND INTENT",
    "EVERY REPETITION REFINES YOUR FORM",
    "CONTROL UNDER CONTINUOUS TENSION",
    "POWER EARNED THROUGH CONSISTENT ACTION",
    "MIND AND MUSCLE IN TOTAL HARMONY"
];

const WORKOUT_STYLES = [
    { id: 'all', label: 'ALL CATEGORIES' },
    { id: 'strength', label: 'STRENGTH' },
    { id: 'stretching', label: 'STRETCHING' },
    { id: 'plyometrics', label: 'PLYOMETRICS' },
    { id: 'strongman', label: 'STRONGMAN' },
    { id: 'powerlifting', label: 'POWERLIFTING' },
    { id: 'cardio', label: 'CARDIO' },
    { id: 'olympic weightlifting', label: 'OLYMPIC' }
];

const MUSCLE_GROUPS = [
    { id: 'all', label: 'ALL' },
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
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 9.9-1" />
        </svg>
    );
}

function RenderIsolatedMusclePath({ muscleKey, fillColor = "#38bdf8", strokeColor = "#ffffff" }) {
    switch (muscleKey) {
        case 'shoulders':
            return (
                <g transform="translate(-10, 10)">
                    <path d="M 40 40 C 30 46 24 60 30 72 C 34 76 38 74 40 68 C 42 60 41 50 40 40 Z" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
                    <path d="M 80 40 C 90 46 96 60 90 72 C 86 76 82 74 80 68 C 78 60 79 50 80 40 Z" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
                </g>
            );
        case 'chest':
            return (
                <g transform="translate(-10, 8)">
                    <path d="M 44 42 C 54 41 61 44 62 54 C 62 68 48 72 42 70 C 38 62 40 48 44 42 Z" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
                    <path d="M 76 42 C 66 41 59 44 58 54 C 58 68 72 72 78 70 C 82 62 80 48 76 42 Z" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
                </g>
            );
        case 'biceps':
            return (
                <g transform="translate(-10, 0)">
                    <path d="M 38 42 C 30 50 30 64 38 74 C 43 75 47 71 48 62 C 49 53 47 45 38 42 Z" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
                    <path d="M 82 42 C 90 50 90 64 82 74 C 77 75 73 71 72 62 C 71 53 73 45 82 42 Z" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
                </g>
            );
        case 'triceps':
            return (
                <g transform="translate(-10, 0)">
                    <path d="M 36 40 C 28 52 30 70 38 78 C 43 78 46 72 47 62 C 47 52 44 44 36 40 Z" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
                    <path d="M 84 40 C 92 52 90 70 82 78 C 77 78 74 72 73 62 C 73 52 76 44 84 40 Z" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
                </g>
            );
        case 'back':
            return (
                <g transform="translate(-10, 6)">
                    <path d="M 52 32 L 68 32 L 82 48 L 60 74 L 38 48 Z" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
                    <path d="M 40 52 C 32 68 35 92 45 104 C 48 96 49 84 49 72 Z" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
                    <path d="M 80 52 C 88 68 85 92 75 104 C 72 96 71 84 71 72 Z" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
                </g>
            );
        case 'abs':
            return (
                <g transform="translate(-10, 10)">
                    <rect x="47" y="32" width="11" height="13" rx="2" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
                    <rect x="62" y="32" width="11" height="13" rx="2" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
                    <rect x="46" y="48" width="12" height="13" rx="2" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
                    <rect x="62" y="48" width="12" height="13" rx="2" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
                    <rect x="47" y="64" width="11" height="13" rx="2" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
                    <rect x="62" y="64" width="11" height="13" rx="2" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
                </g>
            );
        case 'quads':
            return (
                <g transform="translate(-10, 0)">
                    <path d="M 46 36 C 36 54 34 84 42 110 C 49 114 58 112 58 104 C 60 80 58 54 46 36 Z" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
                    <path d="M 74 36 C 84 54 86 84 78 110 C 71 114 62 112 62 104 C 60 80 62 54 74 36 Z" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
                </g>
            );
        case 'hamstrings':
            return (
                <g transform="translate(-10, 0)">
                    <path d="M 46 36 C 42 56 44 82 51 102 C 58 104 64 100 64 90 C 65 68 64 46 56 36 Z" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
                    <path d="M 74 36 C 78 56 76 82 69 102 C 62 104 56 100 56 90 C 55 68 56 46 64 36 Z" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
                </g>
            );
        case 'calves':
            return (
                <g transform="translate(-10, 0)">
                    <path d="M 44 40 C 38 56 41 80 50 96 L 56 96 C 58 80 57 60 52 40 Z" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
                    <path d="M 76 40 C 82 56 79 80 70 96 L 64 96 C 62 80 63 60 68 40 Z" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
                </g>
            );
        default:
            return (
                <g transform="translate(-10, 0)">
                    <circle cx="60" cy="50" r="14" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
                    <path d="M 45 70 Q 60 62 75 70 L 72 105 Q 60 108 48 105 Z" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
                </g>
            );
    }
}

function AnatomyBadgeCard({ activeMuscle, displayTargetName }) {
    const pri = normalizeMuscleName(activeMuscle);

    return (
        <div className="steel-card flex items-stretch min-h-[64px] overflow-hidden">
            <div className="w-14 bg-[#142033] border-r border-[#22324d] flex items-center justify-center p-1.5 shrink-0">
                <svg viewBox="0 0 100 120" className="w-full h-full object-contain filter drop-shadow-[0_0_4px_rgba(56,189,248,0.5)]">
                    <RenderIsolatedMusclePath muscleKey={pri} fillColor="#38bdf8" strokeColor="#ffffff" />
                </svg>
            </div>
            <div className="flex-1 px-3.5 py-2 flex flex-col justify-center text-left min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    Anatomy
                </span>
                <span className="text-sm font-athletic font-bold text-electric-sky uppercase tracking-wide truncate">
                    {displayTargetName || 'Full Body'}
                </span>
            </div>
        </div>
    );
}

function MetricCard({ label, value }) {
    return (
        <div className="steel-card px-3.5 py-2 flex flex-col justify-center text-left min-h-[64px]">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                {label}
            </span>
            <span className="text-sm font-athletic font-bold text-slate-100 uppercase tracking-wide truncate">
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
        <div className="steel-panel p-3 flex flex-col flex-1 h-full min-h-[300px]">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#22324d] shrink-0">
                <span className="text-xs font-athletic font-bold tracking-wider text-slate-200 uppercase">
                    CADENCE MOTION FEED
                </span>
                <span className="text-[10px] font-bold font-athletic tracking-wide px-2 py-0.5 rounded bg-sky-500/20 text-electric-sky border border-sky-500/30">
                    LIVE PREVIEW
                </span>
            </div>
            <div className="flex-1 w-full h-full min-h-[260px] relative rounded-lg overflow-hidden bg-[#090e18] flex items-center justify-center border border-[#1e2c45]">
                {activeImageSrc && !imageError ? (
                    <img
                        key={`${exercise?.name}-${frameIndex}`}
                        src={activeImageSrc}
                        alt={exercise?.name}
                        onError={() => setImageError(true)}
                        className="h-full w-full object-cover object-center"
                    />
                ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-500">
                        <span className="text-3xl text-sky-400">⚡</span>
                        <span className="text-[11px] font-athletic uppercase tracking-wider">MOTION FEED UNAVAILABLE</span>
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

        const searchQuery = `${exercise.name} exercise tutorial proper form`;
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
            setError(err.message || 'Tutorial search quota exceeded');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchYouTubeTutorials();
    }, [exercise?.name]);

    return (
        <div className="steel-panel p-3 flex flex-col h-full min-h-[320px] overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#22324d] pb-2 mb-2 shrink-0">
                <span className="text-xs font-athletic font-bold tracking-wider text-slate-200 uppercase">
                    FORM TUTORIALS
                </span>
            </div>

            <div className="flex-1 min-h-0 flex flex-col gap-2 overflow-hidden">
                <div className="w-full aspect-video bg-[#090e18] rounded-lg overflow-hidden border border-[#22324d] shrink-0 flex items-center justify-center">
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
                        <div className="text-slate-400 text-xs font-athletic uppercase tracking-wider">
                            {loading ? 'Searching Guides...' : 'No Video Selected'}
                        </div>
                    )}
                </div>

                <div className="flex-1 min-h-[140px] overflow-y-auto pr-1 space-y-2">
                    {loading ? (
                        <div className="h-full flex flex-col items-center justify-center gap-2 py-6 text-slate-400">
                            <div className="w-6 h-6 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                            <span className="text-[11px] font-athletic uppercase tracking-wider text-slate-300">
                                Loading tutorials...
                            </span>
                        </div>
                    ) : error ? (
                        <div className="text-center py-6 text-xs text-slate-400 font-sans space-y-2 px-2">
                            <p className="text-red-400 font-semibold">{error}</p>
                            <button
                                onClick={fetchYouTubeTutorials}
                                className="px-3 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded text-[10px] uppercase font-bold"
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
                                    className={`p-2 rounded-lg border flex items-center gap-2.5 cursor-pointer transition ${isCurrent
                                            ? 'bg-[#1e2b44] border-sky-400 text-white'
                                            : 'bg-[#101726] border-[#22324d] text-slate-300 hover:border-slate-500'
                                        }`}
                                >
                                    <div className="w-16 h-10 shrink-0 rounded overflow-hidden bg-black relative border border-slate-700">
                                        <img
                                            src={vid.snippet.thumbnails?.medium?.url || vid.snippet.thumbnails?.default?.url}
                                            alt={vid.snippet.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[11px] font-semibold line-clamp-2 leading-tight">
                                            {cleanHtmlEntities(vid.snippet.title)}
                                        </p>
                                        <span className="text-[9px] text-slate-400 truncate block mt-0.5 font-athletic">
                                            {vid.snippet.channelTitle}
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-6 text-slate-500 text-xs font-athletic uppercase">
                            No guides found for this exercise.
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
        <div className="w-screen min-h-screen lg:h-[100dvh] flex flex-col pb-28 md:pb-32 lg:pb-0 touch-pan-y overflow-x-hidden">

            {/* Top Marquee Header */}
            <header className="shrink-0 bg-[#0d1422] border-b border-[#22324d] text-slate-300 px-4 py-2 flex items-center z-20 sticky top-0 w-full overflow-hidden">
                <div className="flex items-center mr-4 shrink-0 gap-2">
                    <span className="w-2.5 h-2.5 bg-sky-400 rounded-sm" />
                    <span className="text-xs font-athletic font-bold tracking-widest text-white uppercase">
                        WO RANDOMIZER
                    </span>
                </div>
                <div className="flex-1 whitespace-nowrap overflow-hidden">
                    <div className="animate-marquee text-xs font-medium tracking-wider text-slate-400 select-none">
                        {AFFIRMATIONS.map((text, i) => (
                            <span key={i} className="inline-flex items-center">
                                <span>{text}</span>
                                <span className="mx-4 text-sky-500 font-bold">/</span>
                            </span>
                        ))}
                    </div>
                </div>
            </header>

            {/* Main Application Container */}
            <main className="flex-1 w-full max-w-full p-2 md:p-3 flex flex-col gap-2 overflow-y-auto lg:overflow-hidden min-h-0 touch-pan-y">

                {/* Focus Bar */}
                <div className="shrink-0 steel-panel px-3 py-2 flex items-center justify-between w-full max-w-full overflow-hidden">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar min-w-0 flex-1">
                        <span className="text-xs font-athletic font-bold text-slate-300 uppercase tracking-wider shrink-0 select-none whitespace-nowrap pr-1">
                            Focus:
                        </span>

                        <div className="flex items-center gap-1.5 shrink-0">
                            {WORKOUT_STYLES.map(style => {
                                const isSelected = selectedStyle === style.id;
                                return (
                                    <button
                                        key={style.id}
                                        type="button"
                                        onClick={() => handleStyleButtonClick(style.id)}
                                        className={`px-3 py-1 font-athletic font-bold text-xs tracking-wider transition shrink-0 uppercase select-none rounded-md ${isSelected
                                                ? 'bg-sky-600 text-white border border-sky-400 shadow-sm'
                                                : 'bg-[#182438] text-slate-300 border border-[#2b3e61] hover:bg-[#20304a] hover:text-white'
                                            }`}
                                    >
                                        {style.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex items-center shrink-0 pl-3">
                        <div className="h-5 w-[1px] bg-[#22324d] mx-2" />

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleShuffle}
                                title="Randomize Session"
                                className="btn-action-primary h-8 px-3 flex items-center gap-1.5 text-xs font-athletic font-bold uppercase rounded-md select-none"
                            >
                                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="16 3 21 3 21 8" />
                                    <line x1="4" y1="20" x2="21" y2="3" />
                                    <polyline points="21 16 21 21 16 21" />
                                    <line x1="15" y1="15" x2="21" y2="21" />
                                    <line x1="4" y1="4" x2="9" y2="9" />
                                </svg>
                                <span className="hidden sm:inline">RANDOMIZE</span>
                            </button>

                            <button
                                type="button"
                                onClick={handleAddCurrentGroup}
                                title="Save current routine"
                                className="w-8 h-8 flex items-center justify-center font-bold text-base bg-[#182438] hover:bg-[#20304a] text-slate-200 rounded-md border border-[#2b3e61] transition"
                            >
                                +
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsFavoritesOpen(true)}
                                title="Saved routines vault"
                                className="w-8 h-8 flex items-center justify-center text-sm bg-[#182438] hover:bg-[#20304a] text-sky-400 rounded-md border border-[#2b3e61] relative transition"
                            >
                                <span>♥</span>
                                {favoriteGroups.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-sky-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                        {favoriteGroups.length}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Workspace */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-2.5 min-h-0 lg:overflow-hidden w-full max-w-full">

                    <section className="lg:col-span-8 flex flex-col min-h-0 steel-panel p-3.5 md:p-4 overflow-hidden">
                        {loading ? (
                            <div className="flex-1 min-h-[300px] flex flex-col items-center justify-center gap-3 text-slate-400">
                                <div className="w-8 h-8 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                                <span className="text-xs font-athletic tracking-wider uppercase">Loading routine...</span>
                            </div>
                        ) : error ? (
                            <div className="flex-1 min-h-[300px] flex flex-col items-center justify-center text-center p-6">
                                <p className="text-sm text-red-400 font-bold uppercase mb-4">{error}</p>
                                <button
                                    onClick={handleShuffle}
                                    className="px-6 py-2 btn-action-primary text-xs font-bold rounded-md"
                                >
                                    RETRY
                                </button>
                            </div>
                        ) : currentExercise ? (
                            <div className="flex-1 flex flex-col min-h-0 justify-between gap-3">

                                {/* Exercise Header & 3 Metric Badges */}
                                <div className="shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#22324d]">
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-athletic font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/20 text-electric-sky border border-sky-500/30">
                                                {currentExercise.category || currentExercise.bodyPart || 'STRENGTH'}
                                            </span>
                                            {isCurrentLocked && (
                                                <span className="inline-flex items-center gap-1 text-[10px] font-athletic font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-600 text-white shadow-xs">
                                                    <RenderLockIcon locked={true} className="w-3 h-3" />
                                                    LOCKED IN
                                                </span>
                                            )}
                                        </div>
                                        <h2 className="text-xl md:text-2xl font-athletic font-extrabold text-white tracking-wide uppercase leading-tight truncate">
                                            {currentExercise.name}
                                        </h2>
                                    </div>

                                    {/* 3 Metric Badges */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 shrink-0 md:min-w-[420px] w-full md:w-auto">
                                        <AnatomyBadgeCard
                                            activeMuscle={activeRawMuscle}
                                            displayTargetName={displayTargetName}
                                        />

                                        <MetricCard
                                            label="Equipment"
                                            value={toTitleCase(currentExercise.equipment || 'body weight')}
                                        />

                                        <MetricCard
                                            label="Level"
                                            value={toTitleCase(currentExercise.level || 'Intermediate')}
                                        />
                                    </div>
                                </div>

                                {/* Motion Feed & Instructions Protocol */}
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3 min-h-0 lg:overflow-hidden">
                                    <div className="md:col-span-7 min-h-0 flex flex-col h-full">
                                        <ExerciseMotionFeed exercise={currentExercise} />
                                    </div>

                                    <div className="md:col-span-5 min-h-0 flex flex-col gap-2.5 overflow-hidden">
                                        <div className="flex-1 min-h-[220px] steel-panel p-3 flex flex-col overflow-hidden bg-[#0e1624]">
                                            <div className="pb-2 mb-2 border-b border-[#22324d] flex items-center justify-between shrink-0">
                                                <span className="text-xs font-athletic font-bold text-slate-200 tracking-wider uppercase">
                                                    FORM PROTOCOL & CUES
                                                </span>
                                            </div>
                                            <div className="flex-1 overflow-y-auto text-xs leading-relaxed text-slate-300 pr-1 space-y-2 touch-pan-y">
                                                {Array.isArray(currentExercise.instructions) && currentExercise.instructions.length > 0 ? (
                                                    currentExercise.instructions.map((step, idx) => (
                                                        <div key={idx} className="flex items-start gap-2.5 p-1.5 rounded bg-[#131d2e] border border-[#1f2e47]">
                                                            <span className="text-[10px] font-athletic font-bold text-white bg-sky-600 px-1.5 py-0.2 rounded shrink-0">
                                                                {idx + 1}
                                                            </span>
                                                            <p className="flex-1 text-slate-200 text-xs leading-relaxed font-normal">{step}</p>
                                                        </div>
                                                    ))
                                                ) : typeof currentExercise.instructions === 'string' && currentExercise.instructions ? (
                                                    currentExercise.instructions.split('. ').map((step, idx) => (
                                                        step.trim() && (
                                                            <div key={idx} className="flex items-start gap-2.5 p-1.5 rounded bg-[#131d2e] border border-[#1f2e47]">
                                                                <span className="text-[10px] font-athletic font-bold text-white bg-sky-600 px-1.5 py-0.2 rounded shrink-0">
                                                                    {idx + 1}
                                                                </span>
                                                                <p className="flex-1 text-slate-200 text-xs leading-relaxed font-normal">{step.endsWith('.') ? step : `${step}.`}</p>
                                                            </div>
                                                        )
                                                    ))
                                                ) : (
                                                    <p className="text-slate-400 text-xs">Execute repetitions with continuous muscular tension and complete eccentric control.</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Action Bar: PREV, Lock, NEXT */}
                                        <div className="hidden lg:grid grid-cols-12 gap-2 pt-1 shrink-0 select-none items-center">
                                            <button
                                                type="button"
                                                onClick={handlePrev}
                                                disabled={loading || isCurrentLocked || currentMuscleList.length <= 1}
                                                className={`col-span-5 btn-steel h-14 rounded-lg flex items-center justify-center gap-2 font-athletic font-bold text-sm tracking-wide transition ${isCurrentLocked ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                                                    }`}
                                            >
                                                <span>◀</span>
                                                <span>PREV</span>
                                            </button>

                                            {/* Machined Lock Button */}
                                            <button
                                                type="button"
                                                onClick={toggleLockCurrent}
                                                title={isCurrentLocked ? "Unlock workout" : "Lock workout in place"}
                                                className={`col-span-2 h-14 rounded-lg flex flex-col items-center justify-center gap-1 cursor-pointer transition active:scale-95 border ${isCurrentLocked
                                                        ? 'bg-sky-600 text-white border-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.4)]'
                                                        : 'bg-[#182438] text-slate-300 border-[#2b3e61] hover:text-white hover:border-slate-400'
                                                    }`}
                                            >
                                                <RenderLockIcon locked={isCurrentLocked} className="w-4 h-4" />
                                                <span className="text-[9px] font-athletic font-bold tracking-wider leading-none">
                                                    {isCurrentLocked ? 'LOCKED' : 'LOCK'}
                                                </span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={handleNext}
                                                disabled={loading || isCurrentLocked || currentMuscleList.length <= 1}
                                                className={`col-span-5 btn-steel h-14 rounded-lg flex items-center justify-center gap-2 font-athletic font-bold text-sm tracking-wide transition ${isCurrentLocked ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                                                    }`}
                                            >
                                                <span>NEXT</span>
                                                <span>▶</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ) : null}
                    </section>

                    <aside className="lg:col-span-4 flex flex-col min-h-[360px] lg:h-full lg:min-h-0">
                        <YouTubeFormDeck exercise={currentExercise} />
                    </aside>

                </div>

                {/* Bottom Active Routine Deck */}
                <div className="shrink-0 steel-panel p-2.5 flex flex-col gap-1.5 w-full max-w-full overflow-hidden box-border">
                    <div className="flex items-center justify-between px-1 shrink-0">
                        <span className="text-xs font-athletic font-bold tracking-wider text-slate-200 uppercase">
                            ACTIVE STACK
                        </span>
                        <span className="text-[10px] text-slate-400 font-sans uppercase">
                            Click to inspect target
                        </span>
                    </div>

                    <div className="w-full max-w-full overflow-x-auto lg:overflow-x-hidden no-scrollbar py-0.5">
                        <div className="grid grid-flow-col auto-cols-[145px] lg:auto-cols-auto lg:grid-flow-row lg:grid-cols-10 gap-2 w-full">
                            {queriedMuscleCards.map(({ group, exercise, isLocked }) => {
                                const isSelected = group.id === selectedMuscle;
                                const previewImg = exercise?.gifUrl || (exercise?.images?.length ? formatImageUrl(exercise.images[0]) : null);

                                return (
                                    <div
                                        key={group.id}
                                        onClick={() => handleFocusChange(group.id)}
                                        className={`relative rounded-lg p-2 cursor-pointer transition flex items-center gap-2 min-w-0 border ${isSelected
                                                ? 'bg-[#1a283e] border-sky-400 shadow-sm -translate-y-0.5 ring-1 ring-sky-400/40'
                                                : isLocked
                                                    ? 'bg-[#131d2e] border-sky-600/70'
                                                    : 'bg-[#111a29] border-[#22324d] hover:border-slate-500'
                                            }`}
                                    >
                                        <div className="w-9 h-9 rounded bg-[#090e18] overflow-hidden shrink-0 flex items-center justify-center border border-[#1e2c45] relative">
                                            {previewImg ? (
                                                <img
                                                    src={previewImg}
                                                    alt={exercise?.name || group.label}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                                />
                                            ) : (
                                                <span className="text-xs text-sky-400 font-athletic">⚡</span>
                                            )}
                                            {isLocked && (
                                                <div className="absolute inset-0 bg-[#090e18]/80 flex items-center justify-center">
                                                    <RenderLockIcon locked={true} className="w-3 h-3 text-sky-400" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between gap-0.5 leading-none mb-0.5">
                                                <span className={`text-[9px] font-athletic font-bold uppercase tracking-wider truncate ${isSelected ? 'text-sky-400' : 'text-slate-400'}`}>
                                                    {group.label}
                                                </span>
                                                {isLocked && (
                                                    <span className="text-[7px] font-athletic font-bold bg-sky-600 text-white px-1 py-0.2 rounded uppercase">
                                                        LOCKED
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-[11px] font-athletic font-bold text-white truncate leading-tight">
                                                {exercise ? exercise.name : 'None'}
                                            </div>
                                            <div className="text-[8px] text-slate-400 capitalize truncate leading-none mt-0.5">
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

            {/* Mobile Fixed Bottom Nav */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-2.5 bg-[#0a0e17]/95 backdrop-blur-md border-t border-[#22324d] select-none">
                <div className="max-w-xl mx-auto grid grid-cols-12 gap-2 items-center">
                    <button
                        type="button"
                        onClick={handlePrev}
                        disabled={loading || isCurrentLocked || currentMuscleList.length <= 1}
                        className={`col-span-5 btn-steel h-12 rounded-lg flex items-center justify-center gap-1 font-athletic font-bold text-xs ${isCurrentLocked ? 'opacity-30' : ''
                            }`}
                    >
                        <span>◀</span>
                        <span>PREV</span>
                    </button>

                    <button
                        type="button"
                        onClick={toggleLockCurrent}
                        className={`col-span-2 h-12 rounded-lg flex flex-col items-center justify-center gap-0.5 border ${isCurrentLocked
                                ? 'bg-sky-600 text-white border-sky-400'
                                : 'bg-[#182438] text-slate-300 border-[#2b3e61]'
                            }`}
                    >
                        <RenderLockIcon locked={isCurrentLocked} className="w-3.5 h-3.5" />
                        <span className="text-[8px] font-athletic font-bold uppercase">
                            {isCurrentLocked ? 'LOCKED' : 'LOCK'}
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={loading || isCurrentLocked || currentMuscleList.length <= 1}
                        className={`col-span-5 btn-steel h-12 rounded-lg flex items-center justify-center gap-1 font-athletic font-bold text-xs ${isCurrentLocked ? 'opacity-30' : ''
                            }`}
                    >
                        <span>NEXT</span>
                        <span>▶</span>
                    </button>
                </div>
            </div>

            {/* Routine Vault Modal */}
            {isFavoritesOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 md:p-6">
                    <div className="steel-panel bg-[#0d1422] w-full max-w-xl overflow-hidden flex flex-col max-h-[85vh] border-[#334b73]">
                        <div className="px-5 py-3.5 border-b border-[#22324d] flex items-center justify-between">
                            <h3 className="text-sm font-athletic font-bold text-white uppercase tracking-wider">
                                Saved Routines Vault
                            </h3>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleAddCurrentGroup}
                                    className="btn-action-primary px-3 py-1 text-xs font-athletic font-bold rounded"
                                >
                                    + Save Current
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsFavoritesOpen(false)}
                                    className="w-7 h-7 rounded bg-[#182438] hover:bg-[#22324d] text-slate-300 flex items-center justify-center font-bold text-sm"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        <div className="p-4 overflow-y-auto space-y-2.5 flex-1">
                            {favoriteGroups.length === 0 ? (
                                <div className="text-center py-10 text-slate-500">
                                    <span className="text-3xl block mb-2">📋</span>
                                    <p className="text-sm font-athletic font-bold text-slate-300 uppercase">Vault is empty</p>
                                    <p className="text-xs text-slate-500 mt-1">
                                        Click + in the top bar to save your current routine.
                                    </p>
                                </div>
                            ) : (
                                favoriteGroups.map((group) => {
                                    const isEditing = editingGroupId === group.id;
                                    return (
                                        <div
                                            key={group.id}
                                            className="p-3 rounded-lg bg-[#111a29] border border-[#22324d] flex flex-col gap-2"
                                        >
                                            <div className="flex items-center justify-between gap-2">
                                                {isEditing ? (
                                                    <div className="flex items-center gap-2 flex-1">
                                                        <input
                                                            type="text"
                                                            value={editingTitle}
                                                            onChange={(e) => setEditingTitle(e.target.value)}
                                                            className="flex-1 bg-[#090e18] border border-sky-400 rounded px-2.5 py-1 text-sm text-white focus:outline-none"
                                                            autoFocus
                                                        />
                                                        <button
                                                            onClick={(e) => handleSaveRename(group.id, e)}
                                                            className="btn-action-primary px-2.5 py-1 text-xs font-bold rounded"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingGroupId(null)}
                                                            className="px-2 py-1 text-xs text-slate-400 hover:text-white"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <span className="text-sm font-athletic font-bold text-white truncate">
                                                            {group.name}
                                                        </span>
                                                        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#182438] text-sky-400 rounded border border-[#22324d]">
                                                            #{group.serialCode}
                                                        </span>
                                                    </div>
                                                )}

                                                <span className="text-[10px] text-slate-500 shrink-0">
                                                    {group.createdAt}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between pt-1 border-t border-[#1a283e] text-xs">
                                                <button
                                                    type="button"
                                                    onClick={(e) => handleLoadGroup(group, e)}
                                                    className="btn-action-primary px-3 py-1 text-[11px] font-athletic font-bold rounded"
                                                >
                                                    Load Routine
                                                </button>
                                                <div className="flex items-center gap-2 font-sans text-xs">
                                                    {!isEditing && (
                                                        <button
                                                            type="button"
                                                            onClick={(e) => handleStartRename(group, e)}
                                                            className="text-slate-400 hover:text-white underline cursor-pointer"
                                                        >
                                                            Rename
                                                        </button>
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={(e) => handleDeleteGroup(group.id, e)}
                                                        className="text-red-400 hover:text-red-300 font-semibold cursor-pointer"
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