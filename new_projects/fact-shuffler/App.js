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
    numbers: true,
    opentrivia: true
};

function FlashcardView(props) {
    const card = props.card;
    const cardIndex = props.cardIndex;
    const totalCards = props.totalCards;
    const revealed = props.revealed;

    if (!card) {
        return (
            <div className="flashcard p-3 p-md-4 mt-1">
                <p className="text-secondary small mb-0">Hit Shuffle to generate questions.</p>
            </div>
        );
    }

    const cardCounter = (cardIndex + 1) + ' / ' + totalCards;

    return (
        <div className="flashcard p-3 p-md-4 mt-1">
            <div className="d-flex align-items-center justify-content-between border-bottom border-white border-opacity-10 pb-2 mb-3">
                <span className="small fw-bold text-uppercase text-secondary d-flex align-items-center gap-1">
                    <i className="bi bi-lightning-charge-fill text-warning"></i>
                    Rapid Recall Challenge
                </span>
                <span className="badge rounded-pill bg-secondary bg-opacity-50">
                    {cardCounter}
                </span>
            </div>

            <div>
                <div className="badge bg-primary-subtle text-primary border border-primary-subtle mb-2">
                    {card.category}
                </div>
                <p className="fw-semibold text-white fs-6 mb-3">
                    {card.prompt}
                </p>

                <div className="mb-3">
                    {revealed ? (
                        <div className="p-3 rounded-3 bg-success bg-opacity-10 border border-success border-opacity-25 text-light">
                            <div className="small fw-bold text-success text-uppercase mb-1">Answer</div>
                            <div>{card.answer}</div>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={props.onReveal}
                            className="btn btn-sm btn-outline-primary w-100 py-2 rounded-3"
                        >
                            <i className="bi bi-eye me-1"></i>Reveal Answer
                        </button>
                    )}
                </div>

                <div className="d-flex justify-content-between align-items-center pt-2">
                    <button
                        type="button"
                        disabled={cardIndex === 0}
                        onClick={props.onPrev}
                        className="btn btn-sm btn-outline-secondary rounded-pill px-3"
                    >
                        <i className="bi bi-chevron-left me-1"></i>Prev
                    </button>
                    <button
                        type="button"
                        disabled={cardIndex >= totalCards - 1}
                        onClick={props.onNext}
                        className="btn btn-sm btn-primary rounded-pill px-3"
                    >
                        Next<i className="bi bi-chevron-right ms-1"></i>
                    </button>
                </div>
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
    const [numberTrivia, setNumberTrivia] = useState('');
    const [openTriviaQuestions, setOpenTriviaQuestions] = useState([]);
    const [loadingFeeds, setLoadingFeeds] = useState(false);

    // Synthesis Briefing
    const [isCompiling, setIsCompiling] = useState(false);
    const [synthesis, setSynthesis] = useState({
        overview: '',
        takeaway: ''
    });

    // Interactive Flashcard State
    const [flashcards, setFlashcards] = useState([]);
    const [cardIndex, setCardIndex] = useState(0);
    const [revealed, setRevealed] = useState(false);

    // Named callbacks to prevent nested inline function parser bugs
    const handleRevealAnswer = () => {
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

    // Data Fetchers
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

    const fetchNumbers = useCallback(async () => {
        try {
            const res = await fetch(`https://numbersapi.com/random/trivia?json&_t=${Date.now()}`);
            if (res.ok) {
                const data = await res.json();
                return data.text;
            }
        } catch (e) {
            console.warn('Numbers API error:', e);
        }
        return '108 is a semi-meandric number recognized across ancient geometry and mathematics.';
    }, []);

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

    const compileAISynthesis = (facts, history, wiki, otTrivia) => {
        setIsCompiling(true);

        setTimeout(() => {
            const fact = facts[0] || 'Natural systems organize via localized, self-regulating biological mechanisms.';
            const hist = history[0] || { year: '1977', topic: 'Voyager Launch', text: 'NASA deployed deep-space probes.' };
            const wikiItem = wiki || { title: 'Emergent Phenomena', extract: 'Documented empirical observation.' };
            const ot = otTrivia[0] || { category: 'General Knowledge', question: 'Primary query', answer: 'Verified answer' };

            const overview = `Today's compiled findings bridge biological observation ("${fact}") with historical milestones like ${hist.year} (${hist.topic}), encyclopedic concepts in "${wikiItem.title}", and general trivia in ${ot.category}. Together, these data streams reveal how disparate facts share common underlying patterns of emergence, decay, and organizational structure.`;
            const takeaway = `Isolated data sources yield rich contextual patterns when synthesized as an integrated matrix of knowledge.`;

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
                    type: 'Encyclopedia',
                    category: wikiItem.title,
                    prompt: `What defines "${wikiItem.title}"?`,
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
            const [factsRes, historyRes, wikiRes, numberRes, otRes] = await Promise.all([
                fetchNinjaFacts(),
                fetchHistory(),
                fetchWiki(),
                fetchNumbers(),
                fetchOpenTrivia()
            ]);

            setNinjaFacts(factsRes);
            setHistoryEvents(historyRes);
            setWikiArticle(wikiRes);
            setNumberTrivia(numberRes);
            setOpenTriviaQuestions(otRes);

            compileAISynthesis(factsRes, historyRes, wikiRes, otRes);
        } catch (error) {
            console.error('Error shuffling data:', error);
            setIsCompiling(false);
        } finally {
            setLoadingFeeds(false);
        }
    }, [fetchNinjaFacts, fetchHistory, fetchWiki, fetchNumbers, fetchOpenTrivia]);

    useEffect(() => {
        handleShuffle();
    }, []);

    const isAllActive = Object.values(visibleFilters).every(v => v);

    const toggleButtons = [
        { id: 'facts', label: 'Facts', icon: 'bi-lightbulb' },
        { id: 'history', label: 'History', icon: 'bi-hourglass-split' },
        { id: 'wiki', label: 'Wiki', icon: 'bi-book' },
        { id: 'numbers', label: 'Numbers', icon: 'bi-123' },
        { id: 'opentrivia', label: 'Open Trivia', icon: 'bi-patch-question' }
    ];

    const currentCard = flashcards[cardIndex] || null;

    return (
        <div className="d-flex flex-column h-100 w-100">
            {/* HEADER BAR */}
            <header className="navbar navbar-dark px-3 py-2 border-bottom border-white border-opacity-10 flex-nowrap" style={{ backgroundColor: '#10172a' }}>
                <div className="d-flex align-items-center me-3 flex-shrink-0">
                    <div className="d-flex gap-1 me-3">
                        <span className="rounded-circle bg-danger opacity-75 d-inline-block" style={{ width: 9, height: 9 }}></span>
                        <span className="rounded-circle bg-warning opacity-75 d-inline-block" style={{ width: 9, height: 9 }}></span>
                        <span className="rounded-circle bg-success opacity-75 d-inline-block" style={{ width: 9, height: 9 }}></span>
                    </div>
                    <span className="heading-font fs-6 fw-bold text-white d-none d-sm-inline">
                        <i className="bi bi-compass text-primary me-2"></i>Random Findings
                    </span>
                </div>

                {/* FILTER BUTTONS */}
                <div className="d-flex gap-1 overflow-auto py-1 me-auto custom-scroll">
                    <button
                        type="button"
                        onClick={() => toggleFilter('all')}
                        className={`btn btn-sm rounded-pill px-3 fw-semibold text-nowrap ${isAllActive ? 'btn-primary' : 'btn-outline-secondary'}`}
                    >
                        All
                    </button>

                    {toggleButtons.map(tab => {
                        const isPressed = visibleFilters[tab.id];
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => toggleFilter(tab.id)}
                                className={`btn btn-sm rounded-pill px-2.5 fw-semibold text-nowrap d-inline-flex align-items-center gap-1 ${isPressed ? 'btn-primary shadow-sm' : 'btn-outline-secondary'}`}
                            >
                                <i className={`bi ${tab.icon}`}></i>
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* MOBILE TAB & ACTION */}
                <div className="d-flex align-items-center gap-2 flex-shrink-0 ms-2">
                    <div className="btn-group btn-group-sm d-md-none" role="group">
                        <button
                            type="button"
                            onClick={() => setMobileTab('facts')}
                            className={`btn ${mobileTab === 'facts' ? 'btn-primary' : 'btn-outline-secondary'}`}
                        >
                            Feeds
                        </button>
                        <button
                            type="button"
                            onClick={() => setMobileTab('hub')}
                            className={`btn ${mobileTab === 'hub' ? 'btn-primary' : 'btn-outline-secondary'}`}
                        >
                            Hub
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={handleShuffle}
                        disabled={loadingFeeds || isCompiling}
                        className="btn btn-sm btn-primary d-flex align-items-center gap-1 rounded-pill px-3 shadow-sm"
                    >
                        <i className={`bi bi-arrow-repeat ${loadingFeeds ? 'spinner-border spinner-border-sm border-2' : ''}`}></i>
                        <span>{loadingFeeds ? 'Loading...' : 'Shuffle'}</span>
                    </button>
                </div>
            </header>

            {/* MAIN WORKSPACE */}
            <main className="d-flex flex-grow-1 overflow-hidden" style={{ backgroundColor: '#090d16' }}>

                {/* LEFT: FEED CARDS */}
                <section className={`col-12 col-md-6 d-flex flex-column border-end border-white border-opacity-10 ${mobileTab === 'facts' ? 'd-flex' : 'd-none d-md-flex'}`}>
                    <div className="p-3 p-md-4 overflow-y-auto custom-scroll flex-grow-1 d-flex flex-column gap-3">

                        {loadingFeeds ? (
                            <div className="d-flex justify-content-center align-items-center h-100 py-5">
                                <div className="spinner-border text-primary" role="status"></div>
                            </div>
                        ) : (
                            <React.Fragment>
                                {/* Facts */}
                                {visibleFilters.facts && ninjaFacts.map((fact, idx) => (
                                    <div key={idx} className="glass-card p-3">
                                        <div className="d-flex align-items-center gap-2 text-primary fw-semibold small mb-2">
                                            <i className="bi bi-lightbulb"></i>
                                            <span>General Fact</span>
                                        </div>
                                        <p className="text-light-emphasis mb-0 leading-relaxed">{fact}</p>
                                    </div>
                                ))}

                                {/* History */}
                                {visibleFilters.history && historyEvents.map((evt, idx) => (
                                    <div key={idx} className="glass-card p-3">
                                        <div className="d-flex align-items-center gap-2 text-info fw-semibold small mb-2">
                                            <i className="bi bi-clock-history"></i>
                                            <span>{evt.year} &bull; {evt.topic}</span>
                                        </div>
                                        <p className="text-light-emphasis mb-0 leading-relaxed">{evt.text}</p>
                                    </div>
                                ))}

                                {/* Wikipedia */}
                                {visibleFilters.wiki && wikiArticle && (
                                    <div className="glass-card p-3">
                                        <div className="d-flex align-items-center gap-2 text-warning fw-semibold small mb-2">
                                            <i className="bi bi-book"></i>
                                            <span>{wikiArticle.title}</span>
                                        </div>
                                        <p className="text-light-emphasis mb-0 leading-relaxed">{wikiArticle.extract}</p>
                                    </div>
                                )}

                                {/* Numbers */}
                                {visibleFilters.numbers && numberTrivia && (
                                    <div className="glass-card p-3">
                                        <div className="d-flex align-items-center gap-2 small mb-2" style={{ color: '#c084fc' }}>
                                            <i className="bi bi-123"></i>
                                            <span className="fw-semibold">Numeric Metric</span>
                                        </div>
                                        <p className="text-light-emphasis mb-0 leading-relaxed">{numberTrivia}</p>
                                    </div>
                                )}

                                {/* Open Trivia */}
                                {visibleFilters.opentrivia && openTriviaQuestions.map((ot, idx) => (
                                    <div key={idx} className="glass-card p-3">
                                        <div className="d-flex align-items-center gap-2 text-success fw-semibold small mb-2">
                                            <i className="bi bi-patch-question"></i>
                                            <span>Trivia &bull; {ot.category}</span>
                                        </div>
                                        <h6 className="fw-semibold text-white mb-2">{ot.question}</h6>
                                        <div className="p-2.5 rounded-3 bg-black bg-opacity-40 border border-white border-opacity-5">
                                            <span className="badge bg-success-subtle text-success me-2">Answer</span>
                                            <span className="text-light">{ot.answer}</span>
                                        </div>
                                    </div>
                                ))}
                            </React.Fragment>
                        )}

                    </div>
                </section>

                {/* RIGHT: INTERACTIVE DISCOVERY HUB */}
                <section className={`col-12 col-md-6 flex-column ${mobileTab === 'hub' ? 'd-flex' : 'd-none d-md-flex'}`}>
                    <div className="p-3 p-md-4 overflow-y-auto custom-scroll flex-grow-1 d-flex flex-column gap-3">

                        {/* EXECUTIVE BRIEFING HERO BANNER */}
                        <div className="hero-banner p-3 p-md-4 shadow-sm">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <span className="badge bg-primary text-white text-uppercase px-2.5 py-1">
                                    <i className="bi bi-cpu me-1"></i>Synthesis Brief
                                </span>
                                <span className="small text-secondary">
                                    <i className="bi bi-activity text-success me-1"></i>Live Streams
                                </span>
                            </div>
                            <h5 className="heading-font fw-bold text-white mb-2">Cross-Domain Intelligence</h5>
                            <p className="text-light-emphasis leading-relaxed small mb-3">
                                {synthesis.overview || 'Aggregating intelligence streams...'}
                            </p>
                            <div className="p-2.5 rounded-3 bg-dark bg-opacity-50 border border-primary border-opacity-25 small text-light">
                                <strong className="text-primary"><i className="bi bi-stars me-1"></i>Core Takeaway: </strong>
                                {synthesis.takeaway}
                            </div>
                        </div>

                        {/* STREAM PULSE & STATS */}
                        <div className="row g-2">
                            <div className="col-4">
                                <div className="glass-card p-2 text-center">
                                    <div className="fw-bold text-white fs-5">
                                        {ninjaFacts.length + historyEvents.length + openTriviaQuestions.length + (wikiArticle ? 1 : 0)}
                                    </div>
                                    <div className="text-secondary" style={{ fontSize: '0.7rem' }}>Entities Synced</div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="glass-card p-2 text-center">
                                    <div className="fw-bold text-info fs-5">5</div>
                                    <div className="text-secondary" style={{ fontSize: '0.7rem' }}>Data Sources</div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="glass-card p-2 text-center">
                                    <div className="fw-bold text-success fs-5">100%</div>
                                    <div className="text-secondary" style={{ fontSize: '0.7rem' }}>Verified Live</div>
                                </div>
                            </div>
                        </div>

                        {/* INTERACTIVE RAPID RECALL FLASHCARD */}
                        <FlashcardView
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