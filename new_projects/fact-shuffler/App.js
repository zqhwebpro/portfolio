// App.js
const { useState, useEffect, useCallback, useRef, useMemo } = React;

class FocusToneGenerator {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.oscillators = [];
        this.isPlaying = false;
    }

    start() {
        if (this.isPlaying) return;
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        this.masterGain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 1.2);
        this.masterGain.connect(this.ctx.destination);

        const freqs = [108, 216, 432];
        this.oscillators = [];

        freqs.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const oscGain = this.ctx.createGain();
            osc.type = idx === 0 ? 'triangle' : 'sine';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

            const lfo = this.ctx.createOscillator();
            lfo.frequency.setValueAtTime(0.15 + idx * 0.05, this.ctx.currentTime);
            const lfoGain = this.ctx.createGain();
            lfoGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);
            lfo.start();

            oscGain.gain.setValueAtTime(0.3 / (idx + 1), this.ctx.currentTime);
            osc.connect(oscGain);
            oscGain.connect(this.masterGain);
            osc.start();
            this.oscillators.push(osc, lfo);
        });

        this.isPlaying = true;
    }

    stop() {
        if (!this.isPlaying) return;
        if (this.masterGain && this.ctx) {
            this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.4);
            setTimeout(() => {
                this.oscillators.forEach(osc => {
                    try { osc.stop(); osc.disconnect(); } catch (e) { }
                });
                this.oscillators = [];
                this.isPlaying = false;
            }, 500);
        } else {
            this.isPlaying = false;
        }
    }

    toggle() {
        this.isPlaying ? this.stop() : this.start();
        return this.isPlaying;
    }
}

// Retro 8-bit staccato laugh audio generator
const playRetroLaugh = () => {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        const now = ctx.currentTime;
        const bursts = [
            { freq: 440, time: 0.00 },
            { freq: 587, time: 0.09 },
            { freq: 440, time: 0.18 },
            { freq: 659, time: 0.27 },
            { freq: 523, time: 0.36 },
            { freq: 698, time: 0.45 },
            { freq: 880, time: 0.54 }
        ];

        bursts.forEach(({ freq, time }) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, now + time);
            osc.frequency.exponentialRampToValueAtTime(freq * 0.75, now + time + 0.07);

            gain.gain.setValueAtTime(0.12, now + time);
            gain.gain.exponentialRampToValueAtTime(0.001, now + time + 0.07);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now + time);
            osc.stop(now + time + 0.07);
        });

        setTimeout(() => {
            try { ctx.close(); } catch (e) { }
        }, 900);
    } catch (err) {
        console.warn("WebAudio laugh effect error:", err);
    }
};

// Civilian Emergency Life-Saving Knowledge Corpus
const CIVILIAN_EMERGENCY_CORPUS = [
    { num: 1, headline: "[TRAUMA] ARTERIAL TOURNIQUET APPLICATION", content: "Place commercial tourniquet 2–3 inches above bleeding wound (never on a joint). Twist windlass until bright red pulsing stops completely. Record time on forehead; tissue tolerates up to two hours safely." },
    { num: 2, headline: "[TRAUMA] JUNCTIONAL WOUND PACKING", content: "For arterial bleeding at the groin, armpit, or neck where tourniquets cannot fit, pack hemostatic gauze deep into the wound cavity until packed tight, then maintain constant direct two-handed pressure for 3 full minutes." },
    { num: 3, headline: "[AIRWAY] RECOVERY POSITION FOR UNRESPONSIVENESS", content: "Place an unconscious breathing person on their left side with top leg bent at 90 degrees. This prevents the tongue from obstructing the airway and stops aspirating vomit into the lungs." },
    { num: 4, headline: "[CHOKING] HEIMLICH & SELF-ABDOMINAL THRUSTS", content: "Stand behind the victim, make a fist above the navel, and thrust inward and upward forcefully. If alone, drive your upper abdomen forcefully over the back of a sturdy chair or countertop edge." },
    { num: 5, headline: "[WATER] EMERGENCY BOILING STANDARDS", content: "Bring water to a rolling boil for a minimum of 1 full minute (3 minutes at elevations above 5,000 feet) to kill all enteric pathogens, protozoa, and viruses regardless of turbidity." },
    { num: 6, headline: "[WATER] HOUSEHOLD BLEACH PURIFICATION", content: "Add 8 drops (1/8 teaspoon) of plain, unscented 6% household bleach per gallon of clear water. Stir and wait 30 minutes; water must retain a slight chlorine scent or repeat treatment once." },
    { num: 7, headline: "[WATER] HOT WATER HEATER EMERGENCY SUPPLY", content: "In a total municipal shutoff, shut off the main incoming home water valve to avoid contamination, turn off the heater power breaker, and drain 30–50 gallons of potable water from the bottom drain spigot." },
    { num: 8, headline: "[FIRE] SMOKE INHALATION CRAWL PROFILE", content: "In structural fires, toxic carbon monoxide and superheated gases pool from the ceiling down. Keep face 12–24 inches off the floor where clean, cool oxygen remains, and feel doors with the back of hand for heat before opening." },
    { num: 9, headline: "[FIRE] SECONDARY EGRESS BREAKOUT", content: "If primary stairwells are blocked, retreat to an exterior room, seal under-door gaps with wet towels, and signal out a closed window. Break windows only as a last resort to prevent backdraft oxygen rushes." },
    { num: 10, headline: "[HAZMAT] SHELTER-IN-PLACE SEALING", content: "For toxic airborne spills, select an above-ground interior room without external vents. Turn off all HVAC systems immediately and seal door borders, windows, and electrical outlets with 4-mil plastic sheeting and duct tape." },
    { num: 11, headline: "[BLACKOUT] REFRIGERATOR COLD-CHAIN INTEGRITY", content: "An unopened refrigerator keeps food safe for 4 hours; a full closed freezer holds safe temperatures for 48 hours. Discard perishable meats and dairy held above 40°F (4°C) for more than 2 hours." },
    { num: 12, headline: "[FLOOD] RAPID WATER VEHICLE EVACUATION", content: "Moving water 12 inches deep can carry away small cars; 24 inches sweeps trucks. If stalled in rising water, unbuckle instantly, roll down windows before electrical shorts, and escape onto the roof." },
    { num: 13, headline: "[COLD] PREVENTING CONDUCTIVE HEAT DRAIN", content: "Hypothermia in stranded situations is accelerated by direct conduction into cold ground. Place cardboard, car floor mats, spare tires, or luggage between your body and concrete/dirt surfaces." },
    { num: 14, headline: "[HEAT] HEAT STROKE RAPID COOLING", content: "Heat stroke (confusion, cessation of sweating, core temp over 104°F) is lethal. Strip clothing and apply cold packs or soaked towels directly to high-blood-flow nodes: armpits, groin, and neck base." },
    { num: 15, headline: "[WEATHER] TORNADO INTERIOR REFUGE", content: "In a structure without a basement, shelter in the center-most room (bathroom/closet) on the lowest floor. Put as many walls between you and the exterior as possible, and cover your head with a mattress." },
    { num: 16, headline: "[EARTHQUAKE] DROP, COVER, AND HOLD ON", content: "Do not run outside where falling masonry and glass cause 80% of injuries. Drop to hands and knees under a heavy desk, protect head/neck with hands, and hold on to the furniture leg until shaking ceases." },
    { num: 17, headline: "[COMMS] SMS TEXT OVER VOICE PRIORITIZATION", content: "During regional disasters, voice cellular networks fail due to bandwidth saturation. SMS text packets require minimal bandwidth and will queue through clogged towers even when phone calls drop." },
    { num: 18, headline: "[COMMS] EMERGENCY 911 TOWER ROAMING", content: "Cell phones are legally mandated to connect to any available cellular carrier tower for emergency 911 calls, even if your specific provider shows zero reception bars or your SIM card is deactivated." },
    { num: 19, headline: "[THREAT] RUN-HIDE-FIGHT INTERIOR DEFENSE", content: "If evacuation is cut off during an active attack, lock and barricade doorways with heavy desks tied off with belts or extension cords, turn off lights, silence cell phones, and prepare ambush counter-strikes." },
    { num: 20, headline: "[NAVIGATION] ANALOG WATCH COMPASS", content: "In the Northern Hemisphere, point the hour hand directly at the sun. Halfway between the hour hand and the 12 o'clock marker marks true South. In the Southern Hemisphere, point 12 at the sun; halfway marks North." },
    { num: 21, headline: "[SIGNALING] REFLECTIVE FLASH TECHNIQUES", content: "A pocket mirror, polished phone screen, or car rearview mirror can project sunlight flashes visible to aircraft up to 20 miles away. Aim flash through a V-shaped sight between two outstretched fingers." },
    { num: 22, headline: "[MED] CARBON MONOXIDE CO SILENT HAZARD", content: "Running generators, camp stoves, or charcoal grills indoors produces colorless, odorless CO that binds to hemoglobin 200x faster than oxygen. Never run combustion engines within 20 feet of open home windows." },
    { num: 23, headline: "[PANIC] 4-4-4-4 BOX BREATHING", content: "Extreme situational panic causes tunnel vision and loss of fine motor skills. Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, and hold empty for 4 seconds to force down sympathetic heart rate." },
    { num: 24, headline: "[OFF-GRID] SANITATION AND WASTE MANAGEMENT", content: "In prolonged grid failure, isolate human waste immediately to prevent cholera outbreaks. Line a 5-gallon bucket with heavy garbage bags and cover waste after each use with sawdust, cat litter, or ash." }
];

const HUE_STOPS = [0, 60, 120, 180, 240, 300];

// Pure on-device synthesis engine
function generateLocalSynthesis(items) {
    if (!items || items.length === 0) return "";

    const primaryInterventions = items.slice(0, 3).map(i => i.headline.replace(/\[.*?\]\s*/g, '')).join(', ');

    return `In cascading civilian disasters, survivability requires rapid multi-hazard operational triage. Mitigating immediate physiological failure—specifically ${primaryInterventions}—must always precede sustained environmental defense. Halting catastrophic hemorrhage and clearing compromised airways sustains oxygen delivery to vital organs, buying the critical time window necessary to purify secondary water reserves, insulate against extreme thermal conditions, and establish extraction signaling.`;
}

function PerspectiveCard({ item, index, onSelect }) {
    const cardRef = useRef(null);
    const [mouseTransform, setMouseTransform] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const tossStyle = useMemo(() => {
        const angles = [-3.2, 2.5, -2.1, 3.1, -2.8, 1.8, -3.4, 2.4, -1.9, 2.7, 3.3, -2.2];
        const xOffsets = [-6, 8, -5, 10, -8, 6, -7, 7, -4, 9, -10, 5];
        const tapeOffsets = [24, 62, 38, 70, 28, 55, 32, 65, 45, 58, 30, 72];
        const tapeAngles = [-5, 4, -3, 6, -4, 5, -2, 4, -3, 5, -6, 3];

        return {
            baseRot: angles[index % angles.length],
            baseShiftX: xOffsets[index % xOffsets.length],
            tapeLeft: tapeOffsets[index % tapeOffsets.length],
            tapeRot: tapeAngles[index % tapeAngles.length],
            zIndex: 10 + (index % 8)
        };
    }, [index]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -14;
        const rotateY = ((x - centerX) / centerX) * 14;

        setMouseTransform(`perspective(900px) translateX(${tossStyle.baseShiftX}px) rotateZ(${tossStyle.baseRot}deg) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(24px) scale3d(1.04, 1.04, 1.04)`);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setMouseTransform(`perspective(900px) translateX(${tossStyle.baseShiftX}px) rotateZ(${tossStyle.baseRot}deg) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)`);
    };

    return (
        <article
            ref={cardRef}
            className="archive-clipping"
            style={{
                transform: mouseTransform || `perspective(900px) translateX(${tossStyle.baseShiftX}px) rotateZ(${tossStyle.baseRot}deg)`,
                transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.36s cubic-bezier(0.2, 0.8, 0.4, 1)',
                animationDelay: `${(index % 8) * 0.04}s`,
                zIndex: isHovered ? 120 : tossStyle.zIndex,
                margin: '10px 14px'
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={() => onSelect(item)}
        >
            <div
                className="archive-tape"
                style={{
                    left: `${tossStyle.tapeLeft}%`,
                    transform: `translateX(-50%) rotate(${tossStyle.tapeRot}deg) translateZ(14px)`,
                    width: '76px'
                }}
            ></div>

            <h2 className="archive-headline">
                {item.headline}
            </h2>
            <p className="archive-body">
                {item.content}
            </p>
        </article>
    );
}

function App() {
    const [telemetryItems, setTelemetryItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [aiSynthesizing, setAiSynthesizing] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [isAudioActive, setIsAudioActive] = useState(false);
    const [shuffleCounter, setShuffleCounter] = useState(0);
    const [lastSynthesizedTime, setLastSynthesizedTime] = useState(null);
    const [hueIndex, setHueIndex] = useState(0);
    const [lifeSavingSummary, setLifeSavingSummary] = useState("Compiling civilian life-preservation protocol...");

    const toneGenRef = useRef(null);
    const hasInitializedRef = useRef(false);

    useEffect(() => {
        toneGenRef.current = new FocusToneGenerator();
        return () => {
            if (toneGenRef.current) toneGenRef.current.stop();
        };
    }, []);

    const handleToggleAudio = () => {
        if (toneGenRef.current) {
            toneGenRef.current.toggle();
            setIsAudioActive(toneGenRef.current.isPlaying);
        }
    };

    const handleSmileyClick = () => {
        setHueIndex((prev) => (prev + 1) % HUE_STOPS.length);
    };

    const handleSmileyHover = () => {
        playRetroLaugh();
    };

    const sampleEmergencyDirectives = useCallback((targetCount = 8) => {
        const pool = [...CIVILIAN_EMERGENCY_CORPUS];
        const sampled = [];
        while (sampled.length < targetCount) {
            const shuffled = [...pool].sort(() => 0.5 - Math.random());
            sampled.push(...shuffled);
        }
        return sampled.slice(0, targetCount).map((item, idx) => ({
            id: `emg-${item.num}-${Date.now()}-${idx}`,
            code: `EMG-${String(item.num).padStart(3, '0')}`,
            headline: item.headline,
            content: item.content
        }));
    }, []);

    const handleFullShuffle = useCallback(() => {
        setLoading(true);
        setActiveModal(null);

        const items = sampleEmergencyDirectives(8);
        setTelemetryItems(items);
        setShuffleCounter(prev => prev + 1);

        setAiSynthesizing(true);
        setTimeout(() => {
            const result = generateLocalSynthesis(items);
            setLifeSavingSummary(result);
            setLastSynthesizedTime(new Date().toLocaleTimeString());
            setAiSynthesizing(false);
            setLoading(false);
        }, 160);
    }, [sampleEmergencyDirectives]);

    useEffect(() => {
        if (!hasInitializedRef.current) {
            hasInitializedRef.current = true;
            handleFullShuffle();
        }
    }, [handleFullShuffle]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setActiveModal(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div
            className="crt-screen"
            style={{ filter: `hue-rotate(${HUE_STOPS[hueIndex]}deg)` }}
        >
            {/* RETRO TOP BAR */}
            <header style={{
                padding: '12px 24px',
                borderBottom: '1.5px solid var(--term-green-dim)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 60,
                background: 'rgba(3, 10, 5, 0.98)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <button
                        type="button"
                        className="pixel-face-btn"
                        onClick={handleSmileyClick}
                        onMouseEnter={handleSmileyHover}
                        title="Laugh & Shift Color Hue"
                    >
                        <svg width="42" height="42" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: 'crispEdges' }}>
                            <path d="M5 2h6v1H5V2zm-2 2h2v1H3V4zm-1 3h1v2H2V7zm0 2h1v1H2V9zm1 3h2v1H3v-1zm2 1h6v1H5v-1zm6-1h2v1h-2v-1zm2-3h1v2h-1V9zm0-2h1v1h-1V7zm-1-3h2v1h-2V4z" fill="#00ff66" />
                            <path d="M5 3h6v1H5V3zm-2 2h10v2H3V5zm-1 2h12v2H2V7zm0 2h12v2H2V9zm1 2h10v1H3v-1zm2 1h6v1H5v-1z" fill="#04200d" />
                            <path d="M5 6h1v3H5V6zm-1 1h3v1H4V7zm6-1h1v3h-1V6zm-1 1h3v1h-3V7z" fill="#00ff66" />
                            <path d="M3 8h1v3H3V8zm9 0h1v3h-1V8zm-8 3h1v1H4v-1zm7 0h1v1h-1v-1zm-6 1h6v1H5v-1z" fill="#00ff66" />
                        </svg>
                    </button>

                    <div>
                        <div style={{ fontSize: '1.15rem', letterSpacing: '0.12em', fontWeight: 700, color: 'var(--term-green-bright)' }}>
                            ZPR LLC (TM) Termalink Protocol
                        </div>
                        <div className="uppercase-label" style={{ fontSize: '0.74rem', color: 'var(--term-text-dim)', marginTop: 2, letterSpacing: '0.05em' }}>
                            Civilian Emergency Readiness Array // Run #{shuffleCounter}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 10, alignItems: 'stretch' }}>
                    <button
                        type="button"
                        onClick={handleFullShuffle}
                        disabled={loading || aiSynthesizing}
                        className="term-btn"
                        style={{ padding: '9px 24px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8 }}
                    >
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="16 3 21 3 21 8" />
                            <line x1="4" y1="20" x2="21" y2="3" />
                            <polyline points="21 16 21 21 16 21" />
                            <line x1="15" y1="15" x2="21" y2="21" />
                            <line x1="4" y1="4" x2="9" y2="9" />
                        </svg>
                        {loading ? "Re-filing..." : "Shuffle"}
                    </button>

                    <button
                        type="button"
                        onClick={handleToggleAudio}
                        className="term-btn"
                        style={{ padding: '9px 24px', fontWeight: 700 }}
                    >
                        {isAudioActive ? "432Hz Hum: On" : "432Hz Hum: Off"}
                    </button>
                </div>
            </header>

            {/* MAIN WORKSPACE */}
            <main style={{ display: 'grid', gridTemplateColumns: '430px 1fr', flex: 1, minHeight: 0 }}>

                {/* LEFT SECTION: SCROLLABLE EMERGENCY KNOWLEDGE CARDS */}
                <section className="archive-rail scroll-dark" style={{ padding: '24px 14px 60px 14px', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {telemetryItems.map((item, idx) => (
                            <PerspectiveCard
                                key={item.id || `${shuffleCounter}-${idx}`}
                                item={item}
                                index={idx}
                                onSelect={(selected) => setActiveModal({
                                    headline: selected.headline,
                                    content: selected.content
                                })}
                            />
                        ))}
                    </div>
                </section>

                {/* RIGHT SECTION: RETRO TERMINAL DECK */}
                <section className="retro-terminal-deck scroll-dark" style={{ padding: '24px 36px', display: 'flex', flexDirection: 'column' }}>
                    <div className="scan-bar"></div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid var(--term-green-dim)',
                        paddingBottom: 10,
                        marginBottom: 16,
                        position: 'relative',
                        zIndex: 25
                    }}>
                        <div>
                            <span className="uppercase-label" style={{ fontSize: '0.96rem', letterSpacing: '0.12em', color: 'var(--term-green-bright)', fontWeight: 700 }}>
                                Tactical Directive // Life-Preservation Matrix
                            </span>
                        </div>

                        {lastSynthesizedTime && (
                            <span className="uppercase-label" style={{ fontSize: '0.74rem', color: 'var(--term-text-dim)' }}>
                                Updated: {lastSynthesizedTime}
                            </span>
                        )}
                    </div>

                    {/* Protocol Query Banner */}
                    <div style={{
                        background: 'rgba(0, 30, 10, 0.7)',
                        border: '1px solid var(--term-green-dim)',
                        padding: '12px 18px',
                        marginBottom: 16,
                        borderRadius: 2,
                        position: 'relative',
                        zIndex: 25,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12
                    }}>
                        <span style={{
                            background: 'var(--term-green)',
                            color: '#000',
                            padding: '3px 8px',
                            fontWeight: 800,
                            fontSize: '0.74rem'
                        }}>
                            PROTOCOL
                        </span>
                        <span style={{ color: 'var(--term-text-main)', fontSize: '1.02rem', letterSpacing: '0.04em' }}>
                            "Deterministic synthesis of systemic life-saving synergy."
                        </span>
                    </div>

                    {/* SUMMARY AREA */}
                    {aiSynthesizing ? (
                        <div style={{
                            padding: 34,
                            border: '1px dashed var(--term-green-dim)',
                            background: 'rgba(4, 20, 8, 0.4)',
                            color: 'var(--term-text-dim)',
                            fontSize: '1.08rem',
                            lineHeight: 2,
                            fontFamily: 'Share Tech Mono, monospace',
                            position: 'relative',
                            zIndex: 25,
                            flex: 1
                        }}>
                            Correlating civilian life-saving protocols...<br />
                            Formulating cross-disciplinary disaster survival matrix...<br />
                            <span style={{ color: 'var(--term-green-bright)' }}>Rendering directive...</span>
                        </div>
                    ) : (
                        <div className="dossier-animate" style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: 0
                        }}>
                            <div style={{
                                border: '1.5px solid var(--term-green-bright)',
                                padding: '26px 30px',
                                background: 'rgba(20, 255, 87, 0.03)',
                                boxShadow: '0 0 25px rgba(51, 255, 102, 0.12), inset 0 0 20px rgba(51, 255, 102, 0.03)',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                flex: 1,
                                minHeight: 0
                            }}>
                                <div style={{
                                    overflowY: 'auto',
                                    maxHeight: '75vh',
                                    paddingRight: 10
                                }} className="scroll-dark">
                                    <div style={{
                                        borderLeft: `3px solid var(--term-green)`,
                                        padding: '18px 24px',
                                        background: 'rgba(51, 255, 102, 0.06)',
                                        textShadow: '0 0 3px rgba(51, 255, 102, 0.3)'
                                    }}>
                                        <div className="uppercase-label" style={{ fontSize: '0.8rem', color: 'var(--term-green-bright)', fontWeight: 800, marginBottom: 12, letterSpacing: '0.08em' }}>
                                            // Systemic Life-Saving Synergy [Tactical Triage Directive]
                                        </div>
                                        <p style={{
                                            fontSize: '1.14rem',
                                            lineHeight: 1.85,
                                            color: 'var(--term-text-main)',
                                            margin: 0,
                                            letterSpacing: '0.015em'
                                        }}>
                                            {lifeSavingSummary}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </main>

            {/* MODAL */}
            {activeModal && (
                <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
                    <div className="modal-box-crt" onClick={(e) => e.stopPropagation()}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid var(--term-green-dim)',
                            paddingBottom: 12,
                            marginBottom: 16,
                            position: 'relative',
                            zIndex: 15
                        }}>
                            <div>
                                <div style={{
                                    fontSize: '1.05rem',
                                    letterSpacing: '0.06em',
                                    color: 'var(--term-green-bright)',
                                    fontWeight: 700
                                }}>
                                    {activeModal.headline}
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setActiveModal(null)}
                                className="term-btn"
                                style={{ padding: '4px 10px', fontSize: '0.72rem' }}
                            >
                                Close [ESC]
                            </button>
                        </div>

                        <div style={{
                            fontSize: '1.2rem',
                            lineHeight: 1.8,
                            color: 'var(--term-text-main)',
                            textShadow: '0 0 3px rgba(51, 255, 102, 0.45)',
                            margin: '14px 0 10px 0',
                            position: 'relative',
                            zIndex: 15,
                            letterSpacing: '0.02em'
                        }}>
                            {activeModal.content}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

window.App = App;