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

    // AI Synthesis State
    const [isCompiling, setIsCompiling] = useState(false);
    const [synthesis, setSynthesis] = useState({
        overview: '',
        takeaway: '',
        relevanceTogether: '',
        relevanceApart: ''
    });

    // Toggle individual category filter
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
            console.warn('API Ninjas fetch error:', e);
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
                        topic: e.pages?.[0]?.titles?.normalized || 'Historical Event'
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

    // 3. Wikipedia Random Article
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

    // 4. Numbers Trivia
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

    // 5. Open Trivia DB
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

    // AI Synthesis Generator
    const compileAISynthesis = (facts, history, wiki, number, otTrivia) => {
        setIsCompiling(true);

        setTimeout(() => {
            const fact = facts[0] || 'Natural systems organize via localized, self-regulating biological mechanisms.';
            const hist = history[0] || { year: '1977', topic: 'Voyager Launch', text: 'NASA deployed deep-space probes carrying archival human records.' };
            const wikiItem = wiki || { title: 'Emergent Phenomena', extract: 'Documented empirical observation.' };
            const ot = otTrivia[0] || { category: 'General Knowledge', question: 'Primary subject query', answer: 'Verified answer' };

            const overview = `Today's compiled findings bridge biological observation ("${fact}") with historical milestones like ${hist.year} (${hist.topic}), encyclopedic concepts in "${wikiItem.title}", and general trivia in ${ot.category}. Together, these data streams reveal how disparate facts share common underlying patterns of emergence, decay, and organizational structure.`;
            const takeaway = `Isolated data sources yield rich contextual patterns when synthesized as an integrated matrix of knowledge.`;
            const relevanceTogether = `Across all extracted data feeds—from scientific facts to historical events and trivias—there is a common thread of systemic progression. Observing "${wikiItem.title}" requires similar analytical tools to evaluating ${hist.topic} or solving "${ot.question}". Viewing these topics collectively reinforces how natural and human-designed systems follow reproducible patterns of growth and balance.`;
            const relevanceApart = `Independently, ${hist.year} highlights human strategic decision-making in high-stakes environments, whereas empirical facts like "${fact.slice(0, 40)}..." describe passive natural realities. Meanwhile, quantitative metrics and Open Trivia entries like "${ot.question}" test discrete recall. Each type of information serves a unique role in building a well-rounded mental model.`;

            setSynthesis({ overview, takeaway, relevanceTogether, relevanceApart });
            setIsCompiling(false);
        }, 250);
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

            compileAISynthesis(factsRes, historyRes, wikiRes, numberRes, otRes);
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
        { id: 'facts', label: 'Facts' },
        { id: 'history', label: 'History' },
        { id: 'wiki', label: 'Wiki' },
        { id: 'numbers', label: 'Numbers' },
        { id: 'opentrivia', label: 'Open Trivia' }
    ];

    return (
        <div className="d-flex flex-column h-100 w-100">
            {/* HEADER BAR */}
            <header className="navbar navbar-dark px-3 py-2 border-bottom border-secondary border-opacity-25 flex-nowrap" style={{ backgroundColor: '#131b2e' }}>
                <div className="d-flex align-items-center me-3 flex-shrink-0">
                    <div className="d-flex gap-1 me-3">
                        <span className="rounded-circle bg-danger d-inline-block" style={{ width: 10, height: 10 }}></span>
                        <span className="rounded-circle bg-warning d-inline-block" style={{ width: 10, height: 10 }}></span>
                        <span className="rounded-circle bg-success d-inline-block" style={{ width: 10, height: 10 }}></span>
                    </div>
                    <span className="navbar-brand mb-0 h1 fs-6 fw-bold text-light d-none d-sm-inline">Random Findings</span>
                </div>

                {/* FILTER TOGGLE BUTTONS */}
                <div className="d-flex gap-2 overflow-auto py-1 me-auto custom-scroll">
                    <button
                        type="button"
                        onClick={() => toggleFilter('all')}
                        className={`btn btn-sm rounded-pill px-3 fw-semibold text-nowrap ${isAllActive ? 'btn-primary' : 'btn-outline-secondary text-secondary'}`}
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
                                className={`btn btn-sm rounded-pill px-3 fw-semibold text-nowrap ${isPressed ? 'btn-primary shadow-sm' : 'btn-outline-secondary text-secondary'}`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* ACTION BUTTONS & MOBILE VIEW SWITCHER */}
                <div className="d-flex align-items-center gap-2 flex-shrink-0 ms-2">
                    <div className="btn-group btn-group-sm d-md-none" role="group">
                        <button
                            type="button"
                            onClick={() => setMobileTab('facts')}
                            className={`btn ${mobileTab === 'facts' ? 'btn-primary' : 'btn-outline-secondary'}`}
                        >
                            Data
                        </button>
                        <button
                            type="button"
                            onClick={() => setMobileTab('summary')}
                            className={`btn ${mobileTab === 'summary' ? 'btn-primary' : 'btn-outline-secondary'}`}
                        >
                            Analysis
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={handleShuffle}
                        disabled={loadingFeeds || isCompiling}
                        className="btn btn-sm btn-primary d-flex align-items-center gap-2 rounded-3 px-3 shadow-sm"
                    >
                        <i className={`bi bi-arrow-clockwise ${loadingFeeds ? 'spinner-border spinner-border-sm border-2' : ''}`}></i>
                        <span>{loadingFeeds ? 'Loading...' : 'Shuffle Facts'}</span>
                    </button>
                </div>
            </header>

            {/* MAIN DUAL PANE */}
            <main className="d-flex flex-grow-1 overflow-hidden" style={{ backgroundColor: '#0a0e1a' }}>

                {/* LEFT SIDE: RAW DATA CARDS */}
                <section className={`col-12 col-md-6 d-flex flex-column border-end border-secondary border-opacity-25 ${mobileTab === 'facts' ? 'd-flex' : 'd-none d-md-flex'}`}>
                    <div className="p-3 p-md-4 overflow-y-auto custom-scroll flex-grow-1 d-flex flex-column gap-3">

                        {loadingFeeds ? (
                            <div className="d-flex justify-content-center align-items-center h-100 py-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading feeds...</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Verified Facts */}
                                {visibleFilters.facts && ninjaFacts.map((fact, idx) => (
                                    <div key={idx} className="custom-card rounded-3 p-3">
                                        <span className="badge bg-primary-subtle text-primary border border-primary-subtle mb-2">General Fact</span>
                                        <p className="card-text text-light-emphasis mb-0">{fact}</p>
                                    </div>
                                ))}

                                {/* Historical Events */}
                                {visibleFilters.history && historyEvents.map((evt, idx) => (
                                    <div key={idx} className="custom-card rounded-3 p-3">
                                        <span className="badge bg-primary-subtle text-primary border border-primary-subtle mb-2">{evt.year} • {evt.topic}</span>
                                        <p className="card-text text-light-emphasis mb-0">{evt.text}</p>
                                    </div>
                                ))}

                                {/* Wikipedia Article */}
                                {visibleFilters.wiki && wikiArticle && (
                                    <div className="custom-card rounded-3 p-3">
                                        <span className="badge bg-primary-subtle text-primary border border-primary-subtle mb-2">{wikiArticle.title}</span>
                                        <p className="card-text text-light-emphasis mb-0">{wikiArticle.extract}</p>
                                    </div>
                                )}

                                {/* Numbers Trivia */}
                                {visibleFilters.numbers && numberTrivia && (
                                    <div className="custom-card rounded-3 p-3">
                                        <span className="badge bg-primary-subtle text-primary border border-primary-subtle mb-2">Numeric Trivia</span>
                                        <p className="card-text text-light-emphasis mb-0">{numberTrivia}</p>
                                    </div>
                                )}

                                {/* Open Trivia DB Cards */}
                                {visibleFilters.opentrivia && openTriviaQuestions.map((ot, idx) => (
                                    <div key={idx} className="custom-card rounded-3 p-3">
                                        <span className="badge bg-primary-subtle text-primary border border-primary-subtle mb-2">Trivia • {ot.category}</span>
                                        <h6 className="fw-semibold text-light mb-2">{ot.question}</h6>
                                        <div className="p-2.5 rounded-2 bg-dark bg-opacity-75 border border-secondary border-opacity-25">
                                            <p className="mb-0 text-light">{ot.answer}</p>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}

                    </div>
                </section>

                {/* RIGHT SIDE: SYNTHESIS SUMMARY */}
                <section className={`col-12 col-md-6 flex-column ${mobileTab === 'summary' ? 'd-flex' : 'd-none d-md-flex'}`} style={{ backgroundColor: 'rgba(14, 20, 36, 0.4)' }}>
                    <div className="p-3 p-md-4 overflow-y-auto custom-scroll flex-grow-1 d-flex flex-column gap-3">

                        {isCompiling ? (
                            <div className="custom-card rounded-3 p-5 text-center my-auto">
                                <div className="spinner-border text-primary mb-3" role="status"></div>
                                <p className="text-secondary small mb-0">Compiling Contextual Intelligence...</p>
                            </div>
                        ) : (
                            <>
                                {/* Executive Findings */}
                                <div className="custom-card rounded-3 p-3 border-primary border-opacity-50">
                                    <div className="d-flex align-items-center justify-content-between border-bottom border-secondary border-opacity-25 pb-2 mb-3">
                                        <div className="d-flex align-items-center gap-2 text-primary fw-bold text-uppercase small">
                                            <i className="bi bi-circle-fill fs-6"></i>
                                            Executive Findings
                                        </div>
                                    </div>
                                    <p className="text-light-emphasis leading-relaxed mb-3">
                                        {synthesis.overview}
                                    </p>
                                    <div className="pt-2 border-top border-secondary border-opacity-25 small text-secondary">
                                        <strong className="text-primary">Core Insight: </strong>
                                        {synthesis.takeaway}
                                    </div>
                                </div>

                                {/* System Connections */}
                                <div className="custom-card rounded-3 p-3">
                                    <div className="d-flex align-items-center gap-2 text-success fw-bold text-uppercase small border-bottom border-secondary border-opacity-25 pb-2 mb-3">
                                        <i className="bi bi-link-45deg fs-5"></i>
                                        System Connections & Synergy
                                    </div>
                                    <p className="text-light-emphasis mb-0">
                                        {synthesis.relevanceTogether}
                                    </p>
                                </div>

                                {/* Distinct Dynamics */}
                                <div className="custom-card rounded-3 p-3">
                                    <div className="d-flex align-items-center gap-2 text-warning fw-bold text-uppercase small border-bottom border-secondary border-opacity-25 pb-2 mb-3">
                                        <i className="bi bi-shuffle fs-6"></i>
                                        Distinct Dynamics & Divergence
                                    </div>
                                    <p className="text-light-emphasis mb-0">
                                        {synthesis.relevanceApart}
                                    </p>
                                </div>
                            </>
                        )}

                    </div>
                </section>

            </main>
        </div>
    );
}

window.App = App;