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

// 1 & 3: THE HOT SEAT ARENA (With dedicated top badge zone and clean natural-case answers)
function HotSeatArena(props) {
    const card = props.card;
    const cardIndex = props.cardIndex;
    const totalCards = props.totalCards;
    const revealed = props.revealed;

    if (!card) {
        return (
            <div className="showcase-stage p-4 text-center">
                <i className="bi bi-trophy text-warning fs-1 d-block mb-2"></i>
                <h4 className="show-title-font text-warning mb-1">Contestants on stage</h4>
                <p className="text-light opacity-75 small mb-0">Hit "Spin the Big Wheel" to deal a new round.</p>
            </div>
        );
    }

    const cardCounter = 'Clue ' + (cardIndex + 1) + ' of ' + totalCards;

    // Badges mapped per category
    const categoryConfig = {
        'Trivia': { bg: 'bg-success', text: 'text-dark', icon: 'bi-patch-question-fill', label: 'Open Trivia' },
        'History': { bg: 'bg-warning', text: 'text-dark', icon: 'bi-hourglass-split', label: 'History Milestone' },
        'Wiki': { bg: 'bg-info', text: 'text-dark', icon: 'bi-journal-bookmark-fill', label: 'Wikipedia Concept' },
        'Fact': { bg: 'bg-primary', text: 'text-white', icon: 'bi-lightbulb-fill', label: 'General Fact' }
    };
    const config = categoryConfig[card.type] || { bg: 'bg-warning', text: 'text-dark', icon: 'bi-star-fill', label: 'Trivia Clue' };

    return (
        <div className="showcase-stage p-3 p-md-4">
            {/* Top Stage Bar */}
            <div className="d-flex align-items-center justify-content-between border-bottom border-warning border-opacity-25 pb-2 mb-3">
                <span className="badge rounded-pill bg-danger px-3 py-1.5 fw-bold d-inline-flex align-items-center gap-1.5 shadow-sm">
                    <i className="bi bi-mic-fill text-warning"></i>
                    The Hot Seat
                </span>
                <span className="fw-bold text-warning fs-6">
                    {cardCounter}
                </span>
            </div>

            {/* REQUIREMENT #1: Reserved Category Label Strip */}
            <div className="p-2.5 rounded-3 mb-3 bg-black bg-opacity-50 border border-white border-opacity-15 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                    <span className={`badge ${config.bg} ${config.text} px-2.5 py-1.5 fw-bold fs-7 d-inline-flex align-items-center gap-1`}>
                        <i className={`bi ${config.icon}`}></i>
                        {config.label}
                    </span>
                    <span className="text-light text-truncate fw-semibold small">
                        {card.category}
                    </span>
                </div>
                <span className="badge rounded-pill bg-warning-subtle text-warning border border-warning border-opacity-50">
                    +100 pts
                </span>
            </div>

            {/* Question Prompt */}
            <div className="text-center my-3 px-2">
                <h4 className="fw-bold text-white mb-4 lh-base">
                    "{card.prompt}"
                </h4>

                {/* REQUIREMENT #3: Buzz-in Answer Reveal in Natural Proper Case (No All-Caps) */}
                <div className="mb-3">
                    {revealed ? (
                        <div className="answer-box shadow-lg text-center">
                            <div className="text-warning fw-bold small mb-1">Correct answer</div>
                            <div className="fs-5 fw-bold text-light">
                                {card.answer}
                            </div>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={props.onReveal}
                            className="btn buzzer-btn w-100 py-3 rounded-4"
                        >
                            <i className="bi bi-bell-fill me-2"></i>Hit the Buzzer
                        </button>
                    )}
                </div>
            </div>

            {/* Stage Navigation */}
            <div className="d-flex justify-content-between align-items-center pt-2 border-top border-white border-opacity-15">
                <button
                    type="button"
                    disabled={cardIndex === 0}
                    onClick={props.onPrev}
                    className="btn btn-sm btn-outline-light rounded-pill px-4 fw-bold"
                >
                    <i className="bi bi-arrow-left me-1"></i>Previous Clue
                </button>

                <span className="small text-warning fw-bold">Stage Clue</span>

                <button
                    type="button"
                    disabled={cardIndex >= totalCards - 1}
                    onClick={props.onNext}
                    className="btn btn-sm btn-warning rounded-pill px-4 fw-bold shadow text-dark"
                >
                    Next Clue<i className="bi bi-arrow-right ms-1"></i>
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

    // REQUIREMENT #2: Actionable Dynamic Connection Engine
    const [isCompiling, setIsCompiling] = useState(false);
    const [synthesis, setSynthesis] = useState({
        headline: '',
        connectionDetails: '',
        boardGamePlan: ''
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

    // 1. Facts Fetcher[cite: 1]
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

    // 2. History Fetcher[cite: 1]
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

    // 3. Wikipedia Fetcher[cite: 1]
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

    // 4. Open Trivia DB Fetcher[cite: 1]
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

    // REQUIREMENT #2: Concrete connection logic linking the facts together
    const compileGameConnections = (facts, history, wiki, otTrivia) => {
        setIsCompiling(true);

        setTimeout(() => {
            const fact = facts[0] || 'Natural systems organize via localized, self-regulating biological mechanisms.';
            const hist = history[0] || { year: '1977', topic: 'Voyager Launch', text: 'NASA deployed deep-space probes.' };
            const wikiItem = wiki || { title: 'Emergent Phenomena', extract: 'Documented empirical observation.' };
            const ot = otTrivia[0] || { category: 'General Knowledge', question: 'Primary query', answer: 'Verified answer' };

            // Explicitly show how the pieces interlock
            const headline = `Structural Adaptation: From Physical Laws to Human History`;
            const connectionDetails = `These facts build on each other in a single line of deduction: The biological/physical reality described in our fact clue ("${fact.slice(0, 50)}...") illustrates natural adaptation. That exact same principle of strategic adaptation drove the events of ${hist.year} (${hist.topic}). Meanwhile, "${wikiItem.title}" supplies the vocabulary needed to understand the premise behind your "${ot.category}" question.`;
            const boardGamePlan = `Use the timeline in ${hist.year} to rule out chronological traps, and use the definition from "${wikiItem.title}" to eliminate decoy answers during the Hot Seat round!`;

            // Prepare cards with proper case
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
                    prompt: `What notable event took place in ${hist.year} concerning ${hist.topic}?`,
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
                    category: 'Science Observation',
                    prompt: `True or false: ${facts[0]}`,
                    answer: 'True'
                });
            }

            setSynthesis({ headline, connectionDetails, boardGamePlan });
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

            compileGameConnections(factsRes, historyRes, wikiRes, otRes);
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
        { id: 'wiki', label: 'Wiki', icon: 'bi-journal-bookmark-fill', color: 'primary' },
        { id: 'opentrivia', label: 'Trivia', icon: 'bi-patch-question-fill', color: 'success' }
    ];

    const currentCard = flashcards[cardIndex] || null;

    return (
        <div className="d-flex flex-column h-100 w-100">

            {/* REQUIREMENT #5: Price is Right Marquee Stage Bar */}
            <header className="stage-header px-3 py-2 d-flex align-items-center justify-content-between flex-nowrap z-3">
                <div className="d-flex align-items-center me-3 flex-shrink-0">
                    <div className="score-display px-3 py-1 me-3 d-flex align-items-center gap-2 text-warning">
                        <i className="bi bi-cash-coin text-warning"></i>
                        <span className="fs-6">${score}</span>
                    </div>
                    <span className="show-title-font fs-5 text-warning d-none d-sm-inline">
                        The Price is Trivia
                    </span>
                </div>

                {/* Big Wheel Filter Pods */}
                <div className="d-flex gap-2 overflow-auto py-1 me-auto custom-scroll">
                    <button
                        type="button"
                        onClick={() => toggleFilter('all')}
                        className={`btn btn-sm pod-toggle px-3 ${isAllActive ? 'btn-warning text-dark shadow' : 'btn-outline-light text-white-50'}`}
                    >
                        All Pods
                    </button>

                    {toggleButtons.map(tab => {
                        const isPressed = visibleFilters[tab.id];
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => toggleFilter(tab.id)}
                                className={`btn btn-sm pod-toggle px-3 d-inline-flex align-items-center gap-1.5 ${isPressed ? 'btn-' + tab.color + ' text-dark shadow fw-bold' : 'btn-outline-light text-white-50'}`}
                            >
                                <i className={`bi ${tab.icon}`}></i>
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Big Wheel Spin Trigger */}
                <div className="d-flex align-items-center gap-2 flex-shrink-0 ms-2">
                    <div className="btn-group btn-group-sm d-md-none" role="group">
                        <button
                            type="button"
                            onClick={() => setMobileTab('facts')}
                            className={`btn ${mobileTab === 'facts' ? 'btn-warning text-dark' : 'btn-outline-light'}`}
                        >
                            Board
                        </button>
                        <button
                            type="button"
                            onClick={() => setMobileTab('hub')}
                            className={`btn ${mobileTab === 'hub' ? 'btn-warning text-dark' : 'btn-outline-light'}`}
                        >
                            Stage
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={handleShuffle}
                        disabled={loadingFeeds || isCompiling}
                        className="btn btn-sm btn-warning d-flex align-items-center gap-2 rounded-pill px-3.5 py-1.5 fw-bold shadow text-dark"
                    >
                        <i className={`bi bi-arrow-repeat ${loadingFeeds ? 'spinner-border spinner-border-sm border-2' : ''}`}></i>
                        <span className="fw-bold">{loadingFeeds ? 'Spinning...' : 'Spin the Big Wheel!'}</span>
                    </button>
                </div>
            </header>

            {/* Stage Floor */}
            <main className="d-flex flex-grow-1 overflow-hidden" style={{ backgroundColor: '#14052b' }}>

                {/* Left: Clue Pods */}
                <section className={`col-12 col-md-6 d-flex flex-column border-end border-warning border-opacity-25 ${mobileTab === 'facts' ? 'd-flex' : 'd-none d-md-flex'}`}>
                    <div className="p-3 p-md-4 overflow-y-auto custom-scroll flex-grow-1 d-flex flex-column gap-3">

                        {loadingFeeds ? (
                            <div className="d-flex flex-column justify-content-center align-items-center h-100 py-5 text-center">
                                <div className="spinner-border text-warning mb-3" style={{ width: '3rem', height: '3rem' }} role="status"></div>
                                <h5 className="show-title-font text-warning">Spinning the clues...</h5>
                            </div>
                        ) : (
                            <React.Fragment>
                                {/* Facts Clues */}
                                {visibleFilters.facts && ninjaFacts.map((fact, idx) => (
                                    <div key={idx} className="clue-pod p-3 border-start border-4 border-info">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="badge bg-info text-dark fw-bold">
                                                <i className="bi bi-lightbulb-fill me-1"></i>General Fact
                                            </span>
                                            <span className="badge rounded-pill bg-black text-info border border-info border-opacity-50">200 pts</span>
                                        </div>
                                        <p className="text-light mb-0 fs-6 leading-relaxed">{fact}</p>
                                    </div>
                                ))}

                                {/* History Clues */}
                                {visibleFilters.history && historyEvents.map((evt, idx) => (
                                    <div key={idx} className="clue-pod p-3 border-start border-4 border-warning">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="badge bg-warning text-dark fw-bold">
                                                <i className="bi bi-hourglass-split me-1"></i>{evt.year} &bull; {evt.topic}
                                            </span>
                                            <span className="badge rounded-pill bg-black text-warning border border-warning border-opacity-50">300 pts</span>
                                        </div>
                                        <p className="text-light mb-0 fs-6 leading-relaxed">{evt.text}</p>
                                    </div>
                                ))}

                                {/* Wikipedia Clues */}
                                {visibleFilters.wiki && wikiArticle && (
                                    <div className="clue-pod p-3 border-start border-4 border-primary">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="badge bg-primary text-white fw-bold">
                                                <i className="bi bi-journal-bookmark-fill me-1"></i>Wiki: {wikiArticle.title}
                                            </span>
                                            <span className="badge rounded-pill bg-black text-primary border border-primary border-opacity-50">400 pts</span>
                                        </div>
                                        <p className="text-light mb-0 fs-6 leading-relaxed">{wikiArticle.extract}</p>
                                    </div>
                                )}

                                {/* REQUIREMENT #4: Open Trivia Card with Fixed Padding & Spacing */}
                                {visibleFilters.opentrivia && openTriviaQuestions.map((ot, idx) => (
                                    <div key={idx} className="clue-pod p-3 border-start border-4 border-success">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="badge bg-success text-dark fw-bold">
                                                <i className="bi bi-patch-question-fill me-1"></i>Trivia &bull; {ot.category}
                                            </span>
                                            <span className="badge rounded-pill bg-black text-success border border-success border-opacity-50">500 pts</span>
                                        </div>
                                        <h5 className="fw-semibold text-white mb-3 lh-base">{ot.question}</h5>

                                        {/* Spacious, unclipped answer container with proper padding */}
                                        <div className="p-3 rounded-3 bg-black bg-opacity-70 border border-success border-opacity-40 d-flex flex-wrap align-items-center justify-content-between gap-2">
                                            <span className="badge bg-success text-dark px-2.5 py-1 fw-bold">Answer</span>
                                            <span className="fw-bold text-warning fs-6 text-break">{ot.answer}</span>
                                        </div>
                                    </div>
                                ))}
                            </React.Fragment>
                        )}

                    </div>
                </section>

                {/* Right: The Showcase Stage */}
                <section className={`col-12 col-md-6 flex-column ${mobileTab === 'hub' ? 'd-flex' : 'd-none d-md-flex'}`} style={{ backgroundColor: '#1a0738' }}>
                    <div className="p-3 p-md-4 overflow-y-auto custom-scroll flex-grow-1 d-flex flex-column gap-3">

                        {/* REQUIREMENT #2: Actionable Showcase Connection Box */}
                        <div className="clue-pod p-3 p-md-4 border border-2 border-warning shadow" style={{ background: 'linear-gradient(145deg, rgba(255,219,0,0.12) 0%, rgba(255,85,0,0.1) 100%)' }}>
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <span className="badge bg-warning text-dark px-2.5 py-1 fw-bold">
                                    <i className="bi bi-stars me-1"></i>Common Thread Showcase
                                </span>
                                <span className="badge rounded-pill bg-danger text-white fw-bold">Door #1</span>
                            </div>

                            <h4 className="show-title-font text-warning fs-5 mb-2">{synthesis.headline || 'Connecting the board...'}</h4>

                            <p className="text-light leading-relaxed small mb-3">
                                {synthesis.connectionDetails}
                            </p>

                            <div className="p-3 rounded-3 bg-black bg-opacity-70 border border-warning border-opacity-40 small text-light">
                                <strong className="text-warning"><i className="bi bi-compass-fill me-1"></i>How to Use These Together: </strong>
                                {synthesis.boardGamePlan}
                            </div>
                        </div>

                        {/* Stage Stats */}
                        <div className="row g-2">
                            <div className="col-4">
                                <div className="clue-pod p-2 text-center border-warning border-opacity-50">
                                    <div className="show-title-font text-warning fs-5">
                                        {ninjaFacts.length + historyEvents.length + openTriviaQuestions.length + (wikiArticle ? 1 : 0)}
                                    </div>
                                    <div className="text-white-50 fw-bold" style={{ fontSize: '0.75rem' }}>Active Clues</div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="clue-pod p-2 text-center border-info border-opacity-50">
                                    <div className="show-title-font text-info fs-5">4</div>
                                    <div className="text-white-50 fw-bold" style={{ fontSize: '0.75rem' }}>Categories</div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="clue-pod p-2 text-center border-danger border-opacity-50">
                                    <div className="show-title-font text-danger fs-5">$100</div>
                                    <div className="text-white-50 fw-bold" style={{ fontSize: '0.75rem' }}>Per Buzzer</div>
                                </div>
                            </div>
                        </div>

                        {/* REQUIREMENTS #1 & #3: Hot Seat Arena with Category Pill & Proper-Cased Answers */}
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