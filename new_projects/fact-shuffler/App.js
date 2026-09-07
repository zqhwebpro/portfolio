// App.jsx
const { useState, useEffect, useCallback } = React;

const API_NINJAS_KEY = '2mHyynImjWwtRajcetrz8znopKXIZ5JG8clNFbfi';

function decodeHTMLEntities(text) {
    if (!text) return '';
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
}

const DEFAULT_FILTERS = {
    facts: true,
    history: true,
    wiki: true,
    opentrivia: true
};

// THE HOT SEAT / FLASHCARD ARENA
function HotSeatArena(props) {
    const card = props.card;
    const cardIndex = props.cardIndex;
    const totalCards = props.totalCards;
    const revealed = props.revealed;

    if (!card) {
        return (
            <div className="hot-seat p-4 text-center">
                <i className="bi bi-broadcast text-warning fs-1 d-block mb-2"></i>
                <h4 className="show-font text-warning mb-1">STAGE IS EMPTY</h4>
                <p className="text-white-50 small mb-0">Hit "SPIN NEXT ROUND" to load the board!</p>
            </div>
        );
    }

    const cardCounter = 'QUESTION ' + (cardIndex + 1) + ' OF ' + totalCards;

    return (
        <div className="hot-seat p-3 p-md-4">
            {/* Top Board Tag & Round Progress */}
            <div className="d-flex align-items-center justify-content-between border-bottom border-white border-opacity-25 pb-2 mb-3">
                <span className="badge rounded-pill bg-danger px-3 py-2 fw-bold text-uppercase d-inline-flex align-items-center gap-1.5 shadow-sm">
                    <i className="bi bi-fire text-warning"></i>
                    THE HOT SEAT
                </span>
                <span className="show-font text-warning small">
                    {cardCounter}
                </span>
            </div>

            {/* Question Card Box */}
            <div className="text-center my-3">
                <span className="badge bg-warning text-dark fw-bold px-3 py-1 mb-2 text-uppercase letter-spacing-1">
                    {card.category}
                </span>
                <h4 className="fw-bold text-white mb-4 px-2 lh-base">
                    "{card.prompt}"
                </h4>

                {/* BUZZER / ANSWER REVEAL */}
                <div className="mb-4">
                    {revealed ? (
                        <div className="p-3 rounded-4 border border-2 border-warning bg-black bg-opacity-70 shadow-lg text-center animate__animated animate__zoomIn">
                            <div className="show-font text-warning fs-6 mb-1">CORRECT ANSWER</div>
                            <div className="fs-4 fw-extrabold text-white text-uppercase tracking-wide">{card.answer}</div>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={props.onReveal}
                            className="btn buzzer-btn w-100 py-3 rounded-4 fs-5"
                        >
                            <i className="bi bi-bell-fill me-2"></i>HIT THE BUZZER!
                        </button>
                    )}
                </div>
            </div>

            {/* ROUND NAVIGATION */}
            <div className="d-flex justify-content-between align-items-center pt-2 border-top border-white border-opacity-10">
                <button
                    type="button"
                    disabled={cardIndex === 0}
                    onClick={props.onPrev}
                    className="btn btn-sm btn-outline-light rounded-pill px-4 fw-bold text-uppercase"
                >
                    <i className="bi bi-chevron-left me-1"></i>Prev
                </button>

                <div className="small text-secondary fw-bold">100 PTS EACH</div>

                <button
                    type="button"
                    disabled={cardIndex >= totalCards - 1}
                    onClick={props.onNext}
                    className="btn btn-sm btn-warning rounded-pill px-4 fw-bold text-uppercase shadow-sm text-dark"
                >
                    Next<i className="bi bi-chevron-right ms-1"></i>
                </button>
            </div>
        </div>
    );
}

function App() {
    const [mobileTab, setMobileTab] = useState('facts');
    const [visibleFilters, setVisibleFilters] = useState(DEFAULT_FILTERS);

    // Data State
    const [ninjaFacts, setNinjaFacts] = useState([]);
    const [historyEvents, setHistoryEvents] = useState([]);
    const [wikiArticle, setWikiArticle] = useState(null);
    const [openTriviaQuestions, setOpenTriviaQuestions] = useState([]);
    const [loadingFeeds, setLoadingFeeds] = useState(false);

    // Studio Overview Memo
    const [isCompiling, setIsCompiling] = useState(false);
    const [synthesis, setSynthesis] = useState({
        overview: '',
        takeaway: ''
    });

    // Hot Seat State
    const [flashcards, setFlashcards] = useState([]);
    const [cardIndex, setCardIndex] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const [score, setScore] = useState(0);

    const handleRevealAnswer = () => {
        if (!revealed) {
            setScore(prev => prev + 100);
        }
        setRevealed(true);
    };

    const handlePrevCard = () => {
        setCardIndex(prev => Math.max(0, prev - 1));
        setRevealed(false);
    };

    const handleNextCard = () => {
        setCardIndex(prev => prev + 1);
        setRevealed(false);
    };

    const toggleFilter = (key) => {
        if (key === 'all') {
            const allActive = Object.values(visibleFilters).every(v => v);
            const newState = {};
            Object.keys(DEFAULT_FILTERS).forEach(k => {
                newState[k] = !allActive;
            });
            setVisibleFilters(newState);
            return;
        }

        setVisibleFilters(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    // 1. API Ninjas Facts
    const fetchNinjaFacts = useCallback(async () => {
        try {
            const res = await fetch(`https://api.api-ninjas.com/v1/facts?limit=2&_t=${Date.now()}`, {
                headers: { 'X-Api-Key': API_NINJAS_KEY }
            });
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    return data.map(item => item.fact);
                }
            }
        } catch (e) {
            console.warn('Facts API error:', e);
        }
        return [
            "A standard cumulus cloud weighs approximately 1.1 million pounds, remaining aloft due to air density and updrafts.",
            "Octopuses have three hearts: two pump blood to the gills, while the third circulates it to the rest of the body."
        ];
    }, []);

    // 2. This Day in History
    const fetchHistory = useCallback(async () => {
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        try {
            const res = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`);
            if (res.ok) {
                const data = await res.json();
                if (data.events && data.events.length > 0) {
                    const shuffled = data.events.sort(() => 0.5 - Math.random()).slice(0, 2);
                    return shuffled.map(e => ({
                        year: e.year,
                        text: e.text,
                        topic: e.pages && e.pages[0] && e.pages[0].titles ? e.pages[0].titles.normalized : 'Historical Event'
                    }));
                }
            }
        } catch (e) {
            console.warn('History API error:', e);
        }
        return [
            { year: 1977, topic: 'Voyager 1 Mission', text: 'NASA launched Voyager 1 to explore the outer solar system and interstellar space.' }
        ];
    }, []);

    // 3. Random Wikipedia Article
    const fetchWiki = useCallback(async () => {
        try {
            const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/random/summary?_t=${Date.now()}`);
            if (res.ok) {
                const data = await res.json();
                return {
                    title: data.title || 'General Science',
                    extract: data.extract || data.description || 'Documented encyclopedic discovery.'
                };
            }
        } catch (e) {
            console.warn('Wiki API error:', e);
        }
        return {
            title: 'Komorebi',
            extract: 'The visual phenomenon of sunlight filtering through leaves and canopy branches onto the ground.'
        };
    }, []);

    // 4. Open Trivia DB
    const fetchOpenTrivia = useCallback(async () => {
        try {
            const res = await fetch(`https://opentdb.com/api.php?amount=2&_t=${Date.now()}`);
            if (res.ok) {
                const data = await res.json();
                if (data.results && data.results.length > 0) {
                    return data.results.map(item => ({
                        category: decodeHTMLEntities(item.category),
                        question: decodeHTMLEntities(item.question),
                        answer: decodeHTMLEntities(item.correct_answer)
                    }));
                }
            }
        } catch (e) {
            console.warn('OpenTrivia API error:', e);
        }
        return [
            {
                category: 'Science: Computers',
                question: 'What does SSD stand for in modern computer storage?',
                answer: 'Solid State Drive'
            }
        ];
    }, []);

    // Game Host Summary Compiler
    const compileHostBrief = (facts, history, wiki, otTrivia) => {
        setIsCompiling(true);

        setTimeout(() => {
            const fact = facts[0] || 'Natural systems organize via localized, self-regulating biological mechanisms.';
            const hist = history[0] || { year: '1977', topic: 'Voyager Launch', text: 'NASA deployed deep-space probes.' };
            const wikiItem = wiki || { title: 'Emergent Phenomena', extract: 'Documented empirical observation.' };
            const ot = otTrivia[0] || { category: 'General Knowledge', question: 'Primary query', answer: 'Verified answer' };

            const overview = `Contestants, on tonight's board we have an incredible spectrum of clues! From biological truths like "${fact}" to high-stakes history in ${hist.year} (${hist.topic}), encyclopedia concepts in "${wikiItem.title}", and mind-bending trivia in ${ot.category}!`;
            const takeaway = `True trivia champions spot the common thread across every category!`;

            const cards = [];
            if (otTrivia.length > 0) {
                cards.push({
                    type: 'Trivia',
                    category: otTrivia[0].category,
                    prompt: otTrivia[0].question,
                    answer: otTrivia[0].answer
                });
            }
            if (history.length > 0) {
                cards.push({
                    type: 'History',
                    category: `${hist.year} • ${hist.topic}`,
                    prompt: `What famous event took place in ${hist.year} regarding ${hist.topic}?`,
                    answer: hist.text
                });
            }
            if (wiki) {
                cards.push({
                    type: 'Encyclopedia',
                    category: wikiItem.title,
                    prompt: `What is the definition of "${wikiItem.title}"?`,
                    answer: wikiItem.extract
                });
            }

            setSynthesis({ overview, takeaway });
            setFlashcards(cards);
            setCardIndex(0);
            setRevealed(false);
            setIsCompiling(false);
        }, 200);
    };

    const handleShuffle = useCallback(async () => {
        setLoadingFeeds(true);
        setIsCompiling(true);
        setVisibleFilters(DEFAULT_FILTERS);

        try {
            const [factsRes, historyRes, wikiRes, otRes] = await Promise.all([
                fetchNinjaFacts(),
                fetchHistory(),
                fetchWiki(),
                fetchOpenTrivia()
            ]);

            setNinjaFacts(factsRes);
            setHistoryEvents(historyRes);
            setWikiArticle(wikiRes);
            setOpenTriviaQuestions(otRes);

            compileHostBrief(factsRes, historyRes, wikiRes, otRes);
        } catch (error) {
            console.error('Error shuffling data:', error);
            setIsCompiling(false);
        } finally {
            setLoadingFeeds(false);
        }
    }, [fetchNinjaFacts, fetchHistory, fetchWiki, fetchOpenTrivia]);

    useEffect(() => {
        handleShuffle();
    }, []);

    const isAllActive = Object.values(visibleFilters).every(v => v);

    const toggleButtons = [
        { id: 'facts', label: 'Facts', icon: 'bi-lightbulb-fill', color: 'info' },
        { id: 'history', label: 'History', icon: 'bi-hourglass-split', color: 'warning' },
        { id: 'wiki', label: 'Wiki', icon: 'bi-book-half', color: 'primary' },
        { id: 'opentrivia', label: 'Trivia', icon: 'bi-award-fill', color: 'success' }
    ];

    const currentCard = flashcards[cardIndex] || null;

    return (
        <div className="d-flex flex-column h-100 w-100">

            {/* STUDIO SPOTLIGHT APP BAR */}
            <header className="stage-header px-3 py-2 d-flex align-items-center justify-content-between flex-nowrap z-3">
                <div className="d-flex align-items-center me-3 flex-shrink-0">
                    <div className="led-display px-2 py-1 me-3 d-flex align-items-center gap-1.5 text-warning">
                        <i className="bi bi-trophy-fill text-warning"></i>
                        <span className="fs-6">{score} PTS</span>
                    </div>
                    <span className="show-font fs-5 text-warning d-none d-sm-inline text-shadow">
                        ★ TRIVIA SHOWDOWN ★
                    </span>
                </div>

                {/* GAME CATEGORY TOGGLES */}
                <div className="d-flex gap-2 overflow-auto py-1 me-auto custom-scroll">
                    <button
                        type="button"
                        onClick={() => toggleFilter('all')}
                        className={`btn btn-sm rounded-pill px-3 pill-toggle ${isAllActive ? 'btn-warning shadow' : 'btn-outline-secondary'}`}
                    >
                        ALL PODS
                    </button>

                    {toggleButtons.map(tab => {
                        const isPressed = visibleFilters[tab.id];
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => toggleFilter(tab.id)}
                                className={`btn btn-sm rounded-pill px-3 pill-toggle d-inline-flex align-items-center gap-1.5 ${isPressed ? 'btn-outline-' + tab.color + ' active bg-' + tab.color + ' text-black shadow' : 'btn-outline-secondary'}`}
                            >
                                <i className={`bi ${tab.icon}`}></i>
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* SPIN WHEEL BUTTON */}
                <div className="d-flex align-items-center gap-2 flex-shrink-0 ms-2">
                    <div className="btn-group btn-group-sm d-md-none" role="group">
                        <button
                            type="button"
                            onClick={() => setMobileTab('facts')}
                            className={`btn ${mobileTab === 'facts' ? 'btn-warning' : 'btn-outline-secondary'}`}
                        >
                            Board
                        </button>
                        <button
                            type="button"
                            onClick={() => setMobileTab('hub')}
                            className={`btn ${mobileTab === 'hub' ? 'btn-warning' : 'btn-outline-secondary'}`}
                        >
                            Stage
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={handleShuffle}
                        disabled={loadingFeeds || isCompiling}
                        className="btn btn-sm btn-warning d-flex align-items-center gap-1.5 rounded-pill px-3.5 py-1.5 fw-bold shadow show-font text-dark"
                    >
                        <i className={`bi bi-arrow-repeat ${loadingFeeds ? 'spinner-border spinner-border-sm border-2' : ''}`}></i>
                        <span>{loadingFeeds ? 'SPINNING...' : 'SPIN BOARD'}</span>
                    </button>
                </div>
            </header>

            {/* MAIN STUDIO ARENA */}
            <main className="d-flex flex-grow-1 overflow-hidden" style={{ backgroundColor: '#0a0518' }}>

                {/* LEFT: THE GAME CLUE BOARD */}
                <section className={`col-12 col-md-6 d-flex flex-column border-end border-white border-opacity-10 ${mobileTab === 'facts' ? 'd-flex' : 'd-none d-md-flex'}`}>
                    <div className="p-3 p-md-4 overflow-y-auto custom-scroll flex-grow-1 d-flex flex-column gap-3">

                        {loadingFeeds ? (
                            <div className="d-flex flex-column justify-content-center align-items-center h-100 py-5 text-center">
                                <div className="spinner-grow text-warning mb-3" style={{ width: '3rem', height: '3rem' }} role="status"></div>
                                <h5 className="show-font text-warning">RE-SHUFFLING THE BOARD...</h5>
                            </div>
                        ) : (
                            <React.Fragment>
                                {/* Facts Clues */}
                                {visibleFilters.facts && ninjaFacts.map((fact, idx) => (
                                    <div key={idx} className="game-card p-3 border-start border-4 border-info">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="badge bg-info text-dark fw-bold text-uppercase">
                                                <i className="bi bi-lightbulb-fill me-1"></i>Fact Clue
                                            </span>
                                            <span className="badge rounded-pill bg-black text-info border border-info border-opacity-50">200 PTS</span>
                                        </div>
                                        <p className="text-light mb-0 fs-6 leading-relaxed">{fact}</p>
                                    </div>
                                ))}

                                {/* History Clues */}
                                {visibleFilters.history && historyEvents.map((evt, idx) => (
                                    <div key={idx} className="game-card p-3 border-start border-4 border-warning">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="badge bg-warning text-dark fw-bold text-uppercase">
                                                <i className="bi bi-hourglass-split me-1"></i>{evt.year} &bull; {evt.topic}
                                            </span>
                                            <span className="badge rounded-pill bg-black text-warning border border-warning border-opacity-50">300 PTS</span>
                                        </div>
                                        <p className="text-light mb-0 fs-6 leading-relaxed">{evt.text}</p>
                                    </div>
                                ))}

                                {/* Wikipedia Clues */}
                                {visibleFilters.wiki && wikiArticle && (
                                    <div className="game-card p-3 border-start border-4 border-primary">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="badge bg-primary text-white fw-bold text-uppercase">
                                                <i className="bi bi-book-half me-1"></i>Encyclopedia Mystery: {wikiArticle.title}
                                            </span>
                                            <span className="badge rounded-pill bg-black text-primary border border-primary border-opacity-50">400 PTS</span>
                                        </div>
                                        <p className="text-light mb-0 fs-6 leading-relaxed">{wikiArticle.extract}</p>
                                    </div>
                                )}

                                {/* Open Trivia DB Clues */}
                                {visibleFilters.opentrivia && openTriviaQuestions.map((ot, idx) => (
                                    <div key={idx} className="game-card p-3 border-start border-4 border-success">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="badge bg-success text-dark fw-bold text-uppercase">
                                                <i className="bi bi-award-fill me-1"></i>Round Question &bull; {ot.category}
                                            </span>
                                            <span className="badge rounded-pill bg-black text-success border border-success border-opacity-50">500 PTS</span>
                                        </div>
                                        <h5 className="fw-bold text-white mb-2">{ot.question}</h5>
                                        <div className="p-2.5 rounded-3 bg-black bg-opacity-70 border border-success border-opacity-25 d-flex align-items-center justify-content-between">
                                            <span className="badge bg-success-subtle text-success text-uppercase">Answer</span>
                                            <span className="fw-bold text-warning fs-6">{ot.answer}</span>
                                        </div>
                                    </div>
                                ))}
                            </React.Fragment>
                        )}

                    </div>
                </section>

                {/* RIGHT: THE STAGE & HOT SEAT ROUND */}
                <section className={`col-12 col-md-6 flex-column ${mobileTab === 'hub' ? 'd-flex' : 'd-none d-md-flex'}`} style={{ backgroundColor: 'rgba(21, 10, 48, 0.65)' }}>
                    <div className="p-3 p-md-4 overflow-y-auto custom-scroll flex-grow-1 d-flex flex-column gap-3">

                        {/* HOST BRIEFING CARD */}
                        <div className="game-card p-3 p-md-4 border border-2 border-warning shadow position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(255,204,0,0.1) 0%, rgba(255,0,128,0.1) 100%)' }}>
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <span className="badge bg-warning text-dark text-uppercase px-2.5 py-1 fw-bold">
                                    <i className="bi bi-mic-fill me-1"></i>HOST ROUND BRIEF
                                </span>
                                <span className="show-font text-warning small">
                                    ROUND 1 ACTIVE
                                </span>
                            </div>
                            <h4 className="show-font text-white mb-2">TONIGHT'S CHALLENGE</h4>
                            <p className="text-light leading-relaxed small mb-3">
                                {synthesis.overview || 'The studio computer is preparing clues...'}
                            </p>
                            <div className="p-2 rounded-3 bg-black bg-opacity-60 border border-warning border-opacity-30 small text-warning fw-bold">
                                <i className="bi bi-stars me-1"></i>STRATEGY TIP: {synthesis.takeaway}
                            </div>
                        </div>

                        {/* LIVE STAGE STATS */}
                        <div className="row g-2">
                            <div className="col-4">
                                <div className="game-card p-2 text-center border-warning border-opacity-50">
                                    <div className="show-font text-warning fs-5">
                                        {ninjaFacts.length + historyEvents.length + openTriviaQuestions.length + (wikiArticle ? 1 : 0)}
                                    </div>
                                    <div className="text-white-50 fw-bold" style={{ fontSize: '0.65rem' }}>BOARD TILES</div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="game-card p-2 text-center border-info border-opacity-50">
                                    <div className="show-font text-info fs-5">4</div>
                                    <div className="text-white-50 fw-bold" style={{ fontSize: '0.65rem' }}>CATEGORIES</div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="game-card p-2 text-center border-danger border-opacity-50">
                                    <div className="show-font text-danger fs-5">LIVE</div>
                                    <div className="text-white-50 fw-bold" style={{ fontSize: '0.65rem' }}>STUDIO FEED</div>
                                </div>
                            </div>
                        </div>

                        {/* INTERACTIVE HOT SEAT ARENA */}
                        <HotSeatArena
                            card={currentCard}
                            cardIndex={cardIndex}
                            totalCards={flashcards.length}
                            revealed={revealed}
                            onReveal={handleRevealAnswer}
                            onPrev={handlePrevCard}
                            onNext={handleNextCard}
                        />

                    </div>
                </section>

            </main>
        </div>
    );
}

window.App = App;