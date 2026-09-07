// App.js
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

// 1 & 3: THE HOT SEAT ARENA (With reserved Category Pill Header and Proper-Case Answer)
function HotSeatArena(props) {
    const card = props.card;
    const cardIndex = props.cardIndex;
    const totalCards = props.totalCards;
    const revealed = props.revealed;

    if (!card) {
        return (
            <div className="stage-podium p-4 text-center">
                <i className="bi bi-stars text-warning fs-1 d-block mb-2"></i>
                <h4 className="show-font text-warning mb-1">CONTESTANTS READY!</h4>
                <p className="text-light opacity-75 small mb-0">Hit "SPIN THE WHEEL" to load the stage!</p>
            </div>
        );
    }

    const cardCounter = 'CLUE ' + (cardIndex + 1) + ' OF ' + totalCards;

    // Badges mapped per category
    const badgeColors = {
        'Trivia': 'bg-success text-dark',
        'History': 'bg-warning text-dark',
        'Wiki': 'bg-info text-dark',
        'Fact': 'bg-primary text-white'
    };
    const badgeClass = badgeColors[card.type] || 'bg-warning text-dark';

    return (
        <div className="stage-podium p-3 p-md-4">
            {/* Top Stage Bar */}
            <div className="d-flex align-items-center justify-content-between border-bottom border-white border-opacity-20 pb-2 mb-3">
                <span className="badge rounded-pill bg-danger px-3 py-1.5 fw-bold text-uppercase d-inline-flex align-items-center gap-1.5 shadow-sm">
                    <i className="bi bi-broadcast-pin text-warning"></i>
                    THE HOT SEAT
                </span>
                <span className="show-font text-warning fs-6">
                    {cardCounter}
                </span>
            </div>

            {/* RESERVED HEADER AREA: Shows Category Type & Tag */}
            <div className="p-2.5 rounded-3 mb-3 bg-black bg-opacity-40 border border-white border-opacity-10 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                    <span className={`badge ${badgeClass} text-uppercase px-2.5 py-1 fw-bold fs-7`}>
                        {card.type}
                    </span>
                    <span className="text-light text-truncate fw-semibold small">
                        {card.category}
                    </span>
                </div>
                <span className="badge rounded-pill bg-warning-subtle text-warning border border-warning border-opacity-50">
                    +100 PTS
                </span>
            </div>

            {/* Question Prompt */}
            <div className="text-center my-3 px-2">
                <h4 className="fw-bold text-white mb-4 lh-base">
                    "{card.prompt}"
                </h4>

                {/* BUZZER / ANSWER REVEAL (3. Proper Cased, Not All Caps) */}
                <div className="mb-3">
                    {revealed ? (
                        <div className="p-3 rounded-4 border border-2 border-warning bg-black bg-opacity-80 shadow-lg text-center">
                            <div className="show-font text-warning fs-6 mb-1 text-uppercase">Correct Answer</div>
                            <div className="fs-5 fw-bold text-light text-capitalize">
                                {card.answer}
                            </div>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={props.onReveal}
                            className="btn pir-buzzer w-100 py-3 rounded-4 fs-5"
                        >
                            <i className="bi bi-hand-index-thumb-fill me-2"></i>HIT THE BUZZER!
                        </button>
                    )}
                </div>
            </div>

            {/* Round Controls */}
            <div className="d-flex justify-content-between align-items-center pt-2 border-top border-white border-opacity-10">
                <button
                    type="button"
                    disabled={cardIndex === 0}
                    onClick={props.onPrev}
                    className="btn btn-sm btn-outline-light rounded-pill px-4 fw-bold text-uppercase"
                >
                    <i className="bi bi-arrow-left me-1"></i>Prev
                </button>

                <span className="small text-warning fw-bold text-uppercase">Stage Clue</span>

                <button
                    type="button"
                    disabled={cardIndex >= totalCards - 1}
                    onClick={props.onNext}
                    className="btn btn-sm btn-warning rounded-pill px-4 fw-bold text-uppercase shadow text-dark"
                >
                    Next<i className="bi bi-arrow-right ms-1"></i>
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

    // 2. Actionable Synthesis Connection Engine
    const [isCompiling, setIsCompiling] = useState(false);
    const [synthesis, setSynthesis] = useState({
        commonTheme: '',
        bridgeStory: '',
        gameStrategy: ''
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

    // 1. API Ninjas Facts[cite: 1]
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

    // 2. This Day in History[cite: 1]
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

    // 3. Wikipedia Summary[cite: 1]
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

    // 4. Open Trivia DB[cite: 1]
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

    // 2. Actionable Synthesis: Explain specifically how the board ties together
    const compileHostBrief = (facts, history, wiki, otTrivia) => {
        setIsCompiling(true);

        setTimeout(() => {
            const fact = facts[0] || 'Natural systems organize via localized, self-regulating biological mechanisms.';
            const hist = history[0] || { year: '1977', topic: 'Voyager Launch', text: 'NASA deployed deep-space probes.' };
            const wikiItem = wiki || { title: 'Emergent Phenomena', extract: 'Documented empirical observation.' };
            const ot = otTrivia[0] || { category: 'General Knowledge', question: 'Primary query', answer: 'Verified answer' };

            // Practical game connections:
            const commonTheme = `Adaptation & Discovery Under High Pressure`;
            const bridgeStory = `Notice the puzzle thread: The physical dynamics in "${fact.slice(0, 55)}..." share the exact structural adaptability seen in the ${hist.year} milestone (${hist.topic}), while "${wikiItem.title}" frames the science testing your recall in "${ot.category}".`;
            const gameStrategy = `Clues on the left hold the conceptual keys: use the timeline from ${hist.year} and scientific rules in "${wikiItem.title}" to eliminate decoy answers during the Hot Seat challenge!`;

            // Build Flashcards with clean proper labels
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
                    type: 'Wiki',
                    category: wikiItem.title,
                    prompt: `How is "${wikiItem.title}" defined?`,
                    answer: wikiItem.extract
                });
            }
            if (facts.length > 0) {
                cards.push({
                    type: 'Fact',
                    category: 'Empirical Science',
                    prompt: `True or False: ${facts[0]}`,
                    answer: 'True'
                });
            }

            setSynthesis({ commonTheme, bridgeStory, gameStrategy });
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

            {/* RETRO MARQUEE APP BAR */}
            <header className="marquee-bar px-3 py-2 d-flex align-items-center justify-content-between flex-nowrap z-3">
                <div className="d-flex align-items-center me-3 flex-shrink-0">
                    <div className="score-board px-3 py-1 me-3 d-flex align-items-center gap-2 text-warning">
                        <i className="bi bi-star-fill text-warning"></i>
                        <span className="fs-6">${score} BANK</span>
                    </div>
                    <span className="show-font fs-4 text-warning d-none d-sm-inline text-shadow">
                        THE PRICE IS TRIVIA!
                    </span>
                </div>

                {/* POD FILTER TOGGLES */}
                <div className="d-flex gap-2 overflow-auto py-1 me-auto custom-scroll">
                    <button
                        type="button"
                        onClick={() => toggleFilter('all')}
                        className={`btn btn-sm rounded-pill px-3 pill-toggle ${isAllActive ? 'btn-warning shadow' : 'btn-outline-light text-white-50'}`}
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
                                className={`btn btn-sm rounded-pill px-3 pill-toggle d-inline-flex align-items-center gap-1.5 ${isPressed ? 'btn-' + tab.color + ' text-dark shadow fw-bold' : 'btn-outline-light text-white-50'}`}
                            >
                                <i className={`bi ${tab.icon}`}></i>
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* WHEEL SPIN ACTION */}
                <div className="d-flex align-items-center gap-2 flex-shrink-0 ms-2">
                    <div className="btn-group btn-group-sm d-md-none" role="group">
                        <button
                            type="button"
                            onClick={() => setMobileTab('facts')}
                            className={`btn ${mobileTab === 'facts' ? 'btn-warning' : 'btn-outline-light'}`}
                        >
                            Board
                        </button>
                        <button
                            type="button"
                            onClick={() => setMobileTab('hub')}
                            className={`btn ${mobileTab === 'hub' ? 'btn-warning' : 'btn-outline-light'}`}
                        >
                            Stage
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={handleShuffle}
                        disabled={loadingFeeds || isCompiling}
                        className="btn btn-sm btn-warning d-flex align-items-center gap-1.5 rounded-pill px-3.5 py-1.5 fw-bold shadow text-dark"
                    >
                        <i className={`bi bi-arrow-repeat ${loadingFeeds ? 'spinner-border spinner-border-sm border-2' : ''}`}></i>
                        <span className="show-font fs-6">{loadingFeeds ? 'SPINNING...' : 'SPIN WHEEL!'}</span>
                    </button>
                </div>
            </header>

            {/* MAIN STAGE WORKSPACE */}
            <main className="d-flex flex-grow-1 overflow-hidden" style={{ backgroundColor: '#0e0624' }}>

                {/* LEFT: CLUE PODS */}
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
                                    <div key={idx} className="contestant-card p-3 border-start border-4 border-info">
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
                                    <div key={idx} className="contestant-card p-3 border-start border-4 border-warning">
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
                                    <div className="contestant-card p-3 border-start border-4 border-primary">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="badge bg-primary text-white fw-bold text-uppercase">
                                                <i className="bi bi-book-half me-1"></i>Wiki: {wikiArticle.title}
                                            </span>
                                            <span className="badge rounded-pill bg-black text-primary border border-primary border-opacity-50">400 PTS</span>
                                        </div>
                                        <p className="text-light mb-0 fs-6 leading-relaxed">{wikiArticle.extract}</p>
                                    </div>
                                )}

                                {/* 4. Open Trivia DB Clues (Fixed padding & spacing when answered) */}
                                {visibleFilters.opentrivia && openTriviaQuestions.map((ot, idx) => (
                                    <div key={idx} className="contestant-card p-3 border-start border-4 border-success">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="badge bg-success text-dark fw-bold text-uppercase">
                                                <i className="bi bi-award-fill me-1"></i>Trivia &bull; {ot.category}
                                            </span>
                                            <span className="badge rounded-pill bg-black text-success border border-success border-opacity-50">500 PTS</span>
                                        </div>
                                        <h5 className="fw-bold text-white mb-3 lh-base">{ot.question}</h5>

                                        {/* Spacious, readable answer pill */}
                                        <div className="p-3 rounded-3 bg-black bg-opacity-60 border border-success border-opacity-30 d-flex align-items-center justify-content-between gap-3">
                                            <span className="badge bg-success-subtle text-success text-uppercase px-2 py-1 fw-bold">Answer</span>
                                            <span className="fw-bold text-warning fs-6 text-end flex-grow-1">{ot.answer}</span>
                                        </div>
                                    </div>
                                ))}
                            </React.Fragment>
                        )}

                    </div>
                </section>

                {/* RIGHT: THE MAIN STAGE & HOT SEAT */}
                <section className={`col-12 col-md-6 flex-column ${mobileTab === 'hub' ? 'd-flex' : 'd-none d-md-flex'}`} style={{ backgroundColor: '#13082e' }}>
                    <div className="p-3 p-md-4 overflow-y-auto custom-scroll flex-grow-1 d-flex flex-column gap-3">

                        {/* 2. ACTIONABLE GAME MASTER'S SHOWDOWN BRIEF */}
                        <div className="contestant-card p-3 p-md-4 border border-2 border-warning shadow" style={{ background: 'linear-gradient(145deg, rgba(255,230,0,0.12) 0%, rgba(255,119,0,0.08) 100%)' }}>
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <span className="badge bg-warning text-dark text-uppercase px-2.5 py-1 fw-bold">
                                    <i className="bi bi-megaphone-fill me-1"></i>HOW TODAY'S TILES CONNECT
                                </span>
                                <span className="badge rounded-pill bg-danger text-white fw-bold">LIVE STAGE</span>
                            </div>

                            <h4 className="show-font text-warning mb-2">{synthesis.commonTheme || 'Syncing Clues...'}</h4>

                            <p className="text-light leading-relaxed small mb-3">
                                {synthesis.bridgeStory}
                            </p>

                            <div className="p-2.5 rounded-3 bg-black bg-opacity-70 border border-warning border-opacity-40 small text-light">
                                <strong className="text-warning"><i className="bi bi-lightbulb-fill me-1"></i>GAME MASTER STRATEGY: </strong>
                                {synthesis.gameStrategy}
                            </div>
                        </div>

                        {/* STAGE TILE STATS */}
                        <div className="row g-2">
                            <div className="col-4">
                                <div className="contestant-card p-2 text-center border-warning border-opacity-50">
                                    <div className="show-font text-warning fs-5">
                                        {ninjaFacts.length + historyEvents.length + openTriviaQuestions.length + (wikiArticle ? 1 : 0)}
                                    </div>
                                    <div className="text-white-50 fw-bold" style={{ fontSize: '0.65rem' }}>ACTIVE TILES</div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="contestant-card p-2 text-center border-info border-opacity-50">
                                    <div className="show-font text-info fs-5">4</div>
                                    <div className="text-white-50 fw-bold" style={{ fontSize: '0.65rem' }}>CATEGORIES</div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="contestant-card p-2 text-center border-danger border-opacity-50">
                                    <div className="show-font text-danger fs-5">$100</div>
                                    <div className="text-white-50 fw-bold" style={{ fontSize: '0.65rem' }}>PER BUZZER</div>
                                </div>
                            </div>
                        </div>

                        {/* 1 & 3. HOT SEAT ARENA */}
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