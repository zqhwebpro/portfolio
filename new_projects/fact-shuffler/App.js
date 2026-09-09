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

// Retro 8-bit failure buzzer
const playBuzzerSound = () => {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.setValueAtTime(95, now + 0.15);
        osc.frequency.setValueAtTime(70, now + 0.30);

        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.5);

        setTimeout(() => {
            try { ctx.close(); } catch (e) { }
        }, 600);
    } catch (e) { }
};

// Retro 8-bit victory arpeggio
const playVictoryFanfare = () => {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        const now = ctx.currentTime;

        const notes = [
            { freq: 261.63, time: 0.00, dur: 0.09 }, // C4
            { freq: 329.63, time: 0.09, dur: 0.09 }, // E4
            { freq: 392.00, time: 0.18, dur: 0.09 }, // G4
            { freq: 523.25, time: 0.27, dur: 0.22 }, // C5
            { freq: 440.00, time: 0.52, dur: 0.09 }, // A4
            { freq: 523.25, time: 0.61, dur: 0.09 }, // C5
            { freq: 659.25, time: 0.70, dur: 0.45 }  // E5
        ];

        notes.forEach(({ freq, time, dur }) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + time);

            gain.gain.setValueAtTime(0.2, now + time);
            gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + time);
            osc.stop(now + time + dur);
        });

        setTimeout(() => {
            try { ctx.close(); } catch (e) { }
        }, 1400);
    } catch (e) { }
};

// Subtle click tone on option selection
const playSelectClick = () => {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(620, now);
        osc.frequency.exponentialRampToValueAtTime(940, now + 0.04);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
        setTimeout(() => { try { ctx.close(); } catch (e) { } }, 100);
    } catch (e) { }
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

// Comprehensive Question Bank for all 24 emergency directives
const TRIVIA_QUESTION_BANK = {
    1: {
        question: "Where should an arterial tourniquet be placed relative to a bleeding wound?",
        correct: "2–3 inches above the wound (never on a joint)",
        distractors: [
            "Directly over the nearest joint",
            "1–2 inches below the laceration site",
            "Directly on top of the open wound"
        ]
    },
    2: {
        question: "How long must continuous direct two-handed pressure be maintained after packing junctional wounds?",
        correct: "3 full minutes of uninterrupted pressure",
        distractors: [
            "30 seconds of light compression",
            "10 seconds followed by wrapping",
            "15 minutes without any gauze"
        ]
    },
    3: {
        question: "How should an unconscious breathing person be positioned in the recovery position?",
        correct: "On their left side with top leg bent at 90 degrees",
        distractors: [
            "Flat on their back with feet elevated 12 inches",
            "Face-down with arms pinned under the chest",
            "Seated upright leaning backward against a wall"
        ]
    },
    4: {
        question: "Where should you position your fist when performing the Heimlich maneuver / abdominal thrusts?",
        correct: "Directly above the navel with inward and upward thrusts",
        distractors: [
            "Directly over the center of the breastbone",
            "Below the belt line against the pelvic bone",
            "Across the lower rib cage margin"
        ]
    },
    5: {
        question: "What is the minimum rolling boil duration required to purify emergency water at sea level?",
        correct: "1 full minute (3 minutes at elevations above 5,000 ft)",
        distractors: [
            "15 seconds of gentle simmering",
            "30 minutes of continuous rolling boil",
            "5 seconds as soon as steam begins"
        ]
    },
    6: {
        question: "How much plain 6% unscented household bleach is required to purify one gallon of clear water?",
        correct: "8 drops (1/8 teaspoon), then wait 30 minutes",
        distractors: [
            "2 full tablespoons per gallon",
            "25 drops per quart of water",
            "1 fluid cup per 5 gallons"
        ]
    },
    7: {
        question: "What essential safety step must be performed before draining emergency water from a hot water heater?",
        correct: "Shut off incoming main water valve and heater power breaker",
        distractors: [
            "Turn the thermostat to maximum heat setting",
            "Add chlorine tablets directly into the vent stack",
            "Open all upstairs hot faucets before closing any valves"
        ]
    },
    8: {
        question: "During a structural fire evacuation, what height off the floor keeps your face in cleaner oxygen?",
        correct: "12–24 inches off the floor",
        distractors: [
            "48–60 inches near the ceiling line",
            "0 inches pressed completely flat to the floor",
            "Standing upright at door handle height"
        ]
    },
    9: {
        question: "If trapped in an exterior room by stairwell fire, how should under-door gaps be sealed?",
        correct: "Seal under-door gaps with wet towels",
        distractors: [
            "Leave gaps open for maximum drafts",
            "Seal with dry loose newspapers",
            "Block door with flammable cardboard"
        ]
    },
    10: {
        question: "What room setup and materials are recommended to shelter-in-place during an airborne toxic spill?",
        correct: "Interior above-ground room sealed with 4-mil plastic & duct tape, HVAC off",
        distractors: [
            "Basement room with exhaust fans running continuously",
            "Exterior balcony sealed with cardboard sheets",
            "Ground-floor garage with cracked windows"
        ]
    },
    11: {
        question: "During a blackout, how long does an unopened refrigerator keep perishable food safe?",
        correct: "4 hours (a full closed freezer holds safe temps for 48 hours)",
        distractors: [
            "24 hours for refrigerator / 12 hours for freezer",
            "1 hour maximum before all contents spoil",
            "72 hours as long as doors stay shut"
        ]
    },
    12: {
        question: "How much moving floodwater is sufficient to sweep away small passenger cars?",
        correct: "12 inches (24 inches sweeps trucks)",
        distractors: [
            "3 inches of moving water",
            "36 inches of moving water",
            "48 inches of moving water"
        ]
    },
    13: {
        question: "How do you prevent lethal conductive hypothermia when stranded on cold surfaces?",
        correct: "Place cardboard, car floor mats, or luggage between body and ground",
        distractors: [
            "Lie flat on bare wet concrete to ground body heat",
            "Strip off outer layers to acclimate the skin",
            "Sprinkle cold water on clothing layers"
        ]
    },
    14: {
        question: "Where should cold packs or soaked towels be applied immediately for rapid heat stroke cooling?",
        correct: "High-blood-flow nodes: armpits, groin, and neck base",
        distractors: [
            "Hands and feet extremities only",
            "Lower shins and calves only",
            "Ears and forehead only"
        ]
    },
    15: {
        question: "In a building with no basement, where is the safest shelter location during a tornado?",
        correct: "Center-most room on lowest floor with a mattress covering head",
        distractors: [
            "Top floor room with large panoramic windows",
            "Under exterior metal patio awnings",
            "Open garage near the roll-up door"
        ]
    },
    16: {
        question: "What is the correct immediate action when violent earthquake shaking starts indoors?",
        correct: "Drop to hands and knees under heavy desk, protect head/neck, hold on",
        distractors: [
            "Sprint outside into the open street immediately",
            "Stand directly under exterior glass facades",
            "Climb onto furniture to stay off the floor"
        ]
    },
    17: {
        question: "Why do SMS text messages succeed during regional disaster gridlock when phone calls fail?",
        correct: "SMS requires minimal bandwidth and queues through saturated towers",
        distractors: [
            "SMS uses dedicated military satellite links",
            "Voice calls are legally blocked during emergencies",
            "SMS routes through underwater cables exclusively"
        ]
    },
    18: {
        question: "Under what carrier status are mobile phones legally mandated to connect for emergency 911 calls?",
        correct: "Any available carrier tower, even with 0 provider bars or inactive SIM",
        distractors: [
            "Only if your specific carrier has active 5G signal",
            "Only with a paid emergency cellular subscription",
            "Only when connected to high-speed Wi-Fi"
        ]
    },
    19: {
        question: "If trapped indoors during an active attack, how should you secure the room?",
        correct: "Barricade doors tied with belts, extinguish lights, silence phones",
        distractors: [
            "Turn on all lights and shout to alert authorities",
            "Leave doors unlocked so rescuers enter easily",
            "Stand directly in line with doorway glass"
        ]
    },
    20: {
        question: "In the Northern Hemisphere, how do you determine true South using an analog watch?",
        correct: "Point hour hand at sun; halfway between hour hand and 12 marks South",
        distractors: [
            "Point 12 at sun; the 6 o'clock marker points South",
            "Point minute hand at sun; 9 o'clock marks South",
            "Point 6 at sun; the hour hand marks South"
        ]
    },
    21: {
        question: "How far away can sunlight flashes from a pocket mirror or phone screen be visible to aircraft?",
        correct: "Up to 20 miles away",
        distractors: [
            "Up to 500 feet only",
            "Up to 2 miles maximum",
            "Over 250 miles"
        ]
    },
    22: {
        question: "Why must fuel generators and camp stoves never run within 20 ft of open home windows?",
        correct: "CO is colorless/odorless and binds to hemoglobin 200x faster than oxygen",
        distractors: [
            "CO depletes local atmospheric nitrogen instantly",
            "Exhaust attracts outdoor predators",
            "Generators drain building electrical grounding"
        ]
    },
    23: {
        question: "What is the exact rhythmic cadence of 4-4-4-4 box breathing to control situational panic?",
        correct: "Inhale 4s, hold 4s, exhale 4s, hold empty 4s",
        distractors: [
            "Inhale 10s, exhale 2s, hold 4s, hyperventilate 4s",
            "Hold breath for 16s continuously",
            "Inhale 2s, exhale 8s, hold 2s, inhale 2s"
        ]
    },
    24: {
        question: "During extended grid failure, how should bucket waste be covered to stop cholera outbreaks?",
        correct: "Cover waste after each use with sawdust, cat litter, or ash",
        distractors: [
            "Leave bucket open to evaporate indoors",
            "Pour boiling cooking oil into the bucket",
            "Flush repeatedly with drinking water"
        ]
    }
};

const HUE_STOPS = [0, 60, 120, 180, 240, 300];

// Digital Confetti Canvas Component
function DigitalConfetti() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
            canvas.height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const colors = [
            '#33ff66', '#66ff8f', '#00ffcc', '#ffff33', '#ffffff', '#00ff88', '#38ef7d'
        ];
        const chars = ['0', '1', '★', '▲', '⚡', '■', '◆', '+', 'x'];

        const particleCount = 130;
        const particles = Array.from({ length: particleCount }).map(() => ({
            x: Math.random() * canvas.width,
            y: -20 - Math.random() * 150,
            vx: (Math.random() - 0.5) * 4.5,
            vy: 2.2 + Math.random() * 4.8,
            size: 8 + Math.random() * 8,
            rot: Math.random() * Math.PI * 2,
            vrot: (Math.random() - 0.5) * 0.12,
            color: colors[Math.floor(Math.random() * colors.length)],
            char: Math.random() > 0.4 ? chars[Math.floor(Math.random() * chars.length)] : null,
            alpha: 0.85 + Math.random() * 0.15,
            wobble: Math.random() * Math.PI * 2
        }));

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.wobble += 0.05;
                p.x += p.vx + Math.sin(p.wobble) * 1.2;
                p.y += p.vy;
                p.rot += p.vrot;

                if (p.y > canvas.height + 30) {
                    p.y = -20;
                    p.x = Math.random() * canvas.width;
                    p.vy = 2.2 + Math.random() * 4.8;
                }

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot);
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 8;

                if (p.char) {
                    ctx.font = `bold ${Math.round(p.size * 1.3)}px "Share Tech Mono", monospace`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(p.char, 0, 0);
                } else {
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
                }

                ctx.restore();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="confetti-canvas" />;
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
    const [activeModal, setActiveModal] = useState(null);
    const [isAudioActive, setIsAudioActive] = useState(false);
    const [shuffleCounter, setShuffleCounter] = useState(0);
    const [lastSynthesizedTime, setLastSynthesizedTime] = useState(null);
    const [hueIndex, setHueIndex] = useState(0);

    // Quiz State
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [quizStatus, setQuizStatus] = useState('in_progress'); // 'in_progress' | 'loser' | 'success'
    const [quizErrorDetails, setQuizErrorDetails] = useState([]);

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

    // Build 5 multiple-choice questions from sampled items
    const generateQuizFromItems = useCallback((items) => {
        const selected = items.slice(0, 5);
        return selected.map((item, qIdx) => {
            const num = item.num;
            const bankData = TRIVIA_QUESTION_BANK[num] || {
                question: `What is the critical life-saving protocol for ${item.headline}?`,
                correct: item.content.slice(0, 80) + '...',
                distractors: [
                    "Delay immediate action until external responders arrive on scene",
                    "Do not perform triage without certified medical authorization",
                    "Apply general first-aid procedures without specific directive"
                ]
            };

            // Combine and shuffle options
            const options = [
                { text: bankData.correct, isCorrect: true },
                ...bankData.distractors.map(d => ({ text: d, isCorrect: false }))
            ].sort(() => 0.5 - Math.random());

            return {
                id: `q-${qIdx}-${item.num}`,
                num: item.num,
                headline: item.headline,
                question: bankData.question,
                options,
                correctAnswer: bankData.correct
            };
        });
    }, []);

    const sampleEmergencyDirectives = useCallback((targetCount = 8) => {
        const pool = [...CIVILIAN_EMERGENCY_CORPUS];
        const sampled = [];
        const shuffled = [...pool].sort(() => 0.5 - Math.random());
        while (sampled.length < targetCount) {
            sampled.push(...shuffled);
        }
        return sampled.slice(0, targetCount).map((item, idx) => ({
            id: `emg-${item.num}-${Date.now()}-${idx}`,
            num: item.num,
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

        const newQuestions = generateQuizFromItems(items);
        setQuizQuestions(newQuestions);
        setUserAnswers({});
        setCurrentQuestionIdx(0);
        setQuizStatus('in_progress');
        setQuizErrorDetails([]);

        setTimeout(() => {
            setLastSynthesizedTime(new Date().toLocaleTimeString());
            setLoading(false);
        }, 160);
    }, [sampleEmergencyDirectives, generateQuizFromItems]);

    useEffect(() => {
        if (!hasInitializedRef.current) {
            hasInitializedRef.current = true;
            handleFullShuffle();
        }
    }, [handleFullShuffle]);

    // Quiz Interactions
    const handleSelectOption = (qIdx, optionIdx) => {
        playSelectClick();
        setUserAnswers(prev => ({
            ...prev,
            [qIdx]: optionIdx
        }));
    };

    const handleRetakeQuiz = () => {
        setUserAnswers({});
        setCurrentQuestionIdx(0);
        setQuizStatus('in_progress');
        setQuizErrorDetails([]);
    };

    const handleSubmitQuiz = () => {
        let hasError = false;
        const errorList = [];

        quizQuestions.forEach((q, idx) => {
            const selectedOptIdx = userAnswers[idx];
            const chosenOption = selectedOptIdx !== undefined ? q.options[selectedOptIdx] : null;

            if (!chosenOption || !chosenOption.isCorrect) {
                hasError = true;
                errorList.push({
                    questionNum: idx + 1,
                    headline: q.headline,
                    question: q.question,
                    selectedText: chosenOption ? chosenOption.text : "[NO ANSWER SELECTED]",
                    correctText: q.correctAnswer
                });
            }
        });

        if (hasError) {
            playBuzzerSound();
            setQuizErrorDetails(errorList);
            setQuizStatus('loser');
        } else {
            playVictoryFanfare();
            setQuizStatus('success');
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setActiveModal(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const currentQ = quizQuestions[currentQuestionIdx];
    const answeredCount = Object.keys(userAnswers).length;

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
                <div>
                    <div style={{ fontSize: '1.15rem', letterSpacing: '0.12em', fontWeight: 700, color: 'var(--term-green-bright)' }}>
                        ZPR LLC (TM) Termalink Protocol
                    </div>
                    <div className="uppercase-label" style={{ fontSize: '0.74rem', color: 'var(--term-text-dim)', marginTop: 2, letterSpacing: '0.05em' }}>
                        Civilian Emergency Readiness Array // Run #{shuffleCounter}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 10, alignItems: 'stretch' }}>
                    <button
                        type="button"
                        onClick={handleFullShuffle}
                        disabled={loading}
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

                {/* RIGHT SECTION: RETRO TERMINAL DECK (TRIVIA POP QUIZ) */}
                <section className="retro-terminal-deck scroll-dark" style={{ padding: '24px 36px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    <div className="scan-bar"></div>

                    {/* Section Top Header */}
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
                                Tactical Assessment // Life-Preservation Pop Quiz
                            </span>
                        </div>

                        {lastSynthesizedTime && (
                            <span className="uppercase-label" style={{ fontSize: '0.74rem', color: 'var(--term-text-dim)' }}>
                                Generated: {lastSynthesizedTime}
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
                        justifyContent: 'space-between',
                        gap: 12
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{
                                background: 'var(--term-green)',
                                color: '#000',
                                padding: '3px 8px',
                                fontWeight: 800,
                                fontSize: '0.74rem'
                            }}>
                                ASSESSMENT
                            </span>
                            <span style={{ color: 'var(--term-text-main)', fontSize: '0.98rem', letterSpacing: '0.04em' }}>
                                5-Question Pop Quiz on Active Protocols (100% Accuracy Required)
                            </span>
                        </div>

                        {quizStatus === 'in_progress' && (
                            <div style={{ fontSize: '0.82rem', color: 'var(--term-green-bright)', fontWeight: 700 }}>
                                Answered: {answeredCount} / 5
                            </div>
                        )}
                    </div>

                    {/* QUIZ CONTENT AREA */}
                    {loading ? (
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
                            Extracting generated emergency directives...<br />
                            Formulating tactical multiple-choice pop quiz...<br />
                            <span style={{ color: 'var(--term-green-bright)' }}>Loading assessment deck...</span>
                        </div>
                    ) : (
                        <div className="dossier-animate" style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: 0
                        }}>

                            {/* STATE 1: IN PROGRESS QUIZ */}
                            {quizStatus === 'in_progress' && currentQ && (
                                <div style={{
                                    border: '1.5px solid var(--term-green-bright)',
                                    padding: '24px 28px',
                                    background: 'rgba(20, 255, 87, 0.03)',
                                    boxShadow: '0 0 25px rgba(51, 255, 102, 0.12), inset 0 0 20px rgba(51, 255, 102, 0.03)',
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flex: 1,
                                    minHeight: 0
                                }}>
                                    {/* Question Step Indicator */}
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: 20,
                                        borderBottom: '1px solid var(--term-green-dim)',
                                        paddingBottom: 12
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--term-green-bright)', letterSpacing: '0.08em' }}>
                                                STAGE:
                                            </span>
                                            {quizQuestions.map((_, idx) => {
                                                const isAnswered = userAnswers[idx] !== undefined;
                                                const isActive = idx === currentQuestionIdx;
                                                return (
                                                    <button
                                                        key={idx}
                                                        type="button"
                                                        className={`step-dot ${isActive ? 'active' : ''} ${isAnswered ? 'answered' : ''}`}
                                                        onClick={() => setCurrentQuestionIdx(idx)}
                                                        title={`Question ${idx + 1}`}
                                                    >
                                                        {idx + 1}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <div style={{ fontSize: '0.8rem', color: 'var(--term-text-dim)', letterSpacing: '0.05em' }}>
                                            QUESTION [ 0{currentQuestionIdx + 1} / 05 ]
                                        </div>
                                    </div>

                                    {/* Question Content */}
                                    <div style={{
                                        overflowY: 'auto',
                                        paddingRight: 6,
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }} className="scroll-dark">
                                        <div style={{
                                            borderLeft: `3px solid var(--term-green)`,
                                            padding: '12px 18px',
                                            background: 'rgba(51, 255, 102, 0.06)',
                                            marginBottom: 18
                                        }}>
                                            <div className="uppercase-label" style={{ fontSize: '0.75rem', color: 'var(--term-green-bright)', fontWeight: 800, marginBottom: 6, letterSpacing: '0.08em' }}>
                                                // PROTOCOL: {currentQ.headline}
                                            </div>
                                            <div style={{
                                                fontSize: '1.18rem',
                                                lineHeight: 1.6,
                                                color: 'var(--term-text-main)',
                                                fontWeight: 700,
                                                letterSpacing: '0.02em',
                                                textShadow: '0 0 4px rgba(51, 255, 102, 0.35)'
                                            }}>
                                                {currentQ.question}
                                            </div>
                                        </div>

                                        {/* 4 Multiple Choice Options */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, marginBottom: 20 }}>
                                            {currentQ.options.map((opt, oIdx) => {
                                                const label = ['A', 'B', 'C', 'D'][oIdx];
                                                const isSelected = userAnswers[currentQuestionIdx] === oIdx;

                                                return (
                                                    <button
                                                        key={oIdx}
                                                        type="button"
                                                        className={`quiz-option-btn ${isSelected ? 'selected' : ''}`}
                                                        onClick={() => handleSelectOption(currentQuestionIdx, oIdx)}
                                                    >
                                                        <span className="quiz-badge">[{label}]</span>
                                                        <span style={{ flex: 1 }}>{opt.text}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Quiz Navigation & Submit */}
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            paddingTop: 12,
                                            borderTop: '1px solid var(--term-green-dim)',
                                            marginTop: 'auto'
                                        }}>
                                            <button
                                                type="button"
                                                className="term-btn"
                                                disabled={currentQuestionIdx === 0}
                                                onClick={() => setCurrentQuestionIdx(prev => prev - 1)}
                                                style={{ padding: '8px 18px', fontSize: '0.84rem' }}
                                            >
                                                ◀ Prev Stage
                                            </button>

                                            <div style={{ display: 'flex', gap: 10 }}>
                                                {currentQuestionIdx < 4 ? (
                                                    <button
                                                        type="button"
                                                        className="term-btn"
                                                        onClick={() => setCurrentQuestionIdx(prev => prev + 1)}
                                                        style={{ padding: '8px 22px', fontSize: '0.84rem', fontWeight: 700 }}
                                                    >
                                                        Next Stage ▶
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="term-btn"
                                                        onClick={handleSubmitQuiz}
                                                        disabled={answeredCount === 0}
                                                        style={{
                                                            padding: '9px 26px',
                                                            fontSize: '0.88rem',
                                                            fontWeight: 800,
                                                            background: answeredCount === 5 ? 'var(--term-green)' : 'rgba(3, 15, 6, 0.85)',
                                                            color: answeredCount === 5 ? '#000' : 'var(--term-green-bright)'
                                                        }}
                                                    >
                                                        Submit Assessment [Enter]
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STATE 2: LOSER SCREEN (FAILURE / MISSED ANY QUESTION) */}
                            {quizStatus === 'loser' && (
                                <div className="loser-container" style={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    minHeight: 0
                                }}>
                                    <div style={{
                                        borderBottom: '2px solid #ff3344',
                                        paddingBottom: 14,
                                        marginBottom: 16
                                    }}>
                                        <div style={{
                                            fontSize: '1.28rem',
                                            fontWeight: 800,
                                            color: '#ff3344',
                                            letterSpacing: '0.08em',
                                            textShadow: '0 0 10px rgba(255, 51, 68, 0.6)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 10
                                        }}>
                                            <span>[ ! ] ASSESSMENT REJECTED: CRITICAL PROTOCOL BREACH</span>
                                        </div>
                                        <div style={{ color: '#ff99aa', fontSize: '0.86rem', marginTop: 4 }}>
                                            SCORE: {5 - quizErrorDetails.length} / 5 // CIVILIAN SURVIVABILITY REQUIRES 100% (5/5)
                                        </div>
                                    </div>

                                    {/* Breakdown of errors */}
                                    <div style={{
                                        overflowY: 'auto',
                                        flex: 1,
                                        paddingRight: 8,
                                        marginBottom: 16
                                    }} className="scroll-dark">
                                        <div style={{
                                            background: 'rgba(255, 51, 68, 0.08)',
                                            border: '1px dashed rgba(255, 51, 68, 0.4)',
                                            padding: '12px 16px',
                                            marginBottom: 16,
                                            color: '#ffd0d6',
                                            fontSize: '0.94rem',
                                            lineHeight: 1.6
                                        }}>
                                            In cascading disaster triage, a single procedural error can prove fatal. Review the failed directives below and retake the readiness assessment.
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                            {quizErrorDetails.map((err, idx) => (
                                                <div key={idx} style={{
                                                    border: '1px solid rgba(255, 51, 68, 0.35)',
                                                    background: 'rgba(30, 2, 5, 0.75)',
                                                    padding: '12px 16px',
                                                    borderRadius: 2
                                                }}>
                                                    <div style={{ color: '#ff6677', fontSize: '0.78rem', fontWeight: 700, marginBottom: 4 }}>
                                                        FAILED STAGE #{err.questionNum} // {err.headline}
                                                    </div>
                                                    <div style={{ color: '#ffffff', fontSize: '0.96rem', fontWeight: 600, marginBottom: 8 }}>
                                                        {err.question}
                                                    </div>
                                                    <div style={{ color: '#ff8899', fontSize: '0.86rem', marginBottom: 4 }}>
                                                        ✖ YOUR SELECTION: {err.selectedText}
                                                    </div>
                                                    <div style={{ color: 'var(--term-green-bright)', fontSize: '0.86rem', fontWeight: 700 }}>
                                                        ✔ MANDATORY PROTOCOL: {err.correctText}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Loser Screen Actions */}
                                    <div style={{
                                        display: 'flex',
                                        gap: 14,
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        paddingTop: 12,
                                        borderTop: '1px solid rgba(255, 51, 68, 0.4)'
                                    }}>
                                        <button
                                            type="button"
                                            onClick={handleFullShuffle}
                                            className="term-btn"
                                            style={{ padding: '10px 20px' }}
                                        >
                                            Shuffle New Directives
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleRetakeQuiz}
                                            className="loser-btn"
                                            style={{ padding: '10px 26px' }}
                                        >
                                            Retake Pop Quiz (Retry)
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* STATE 3: SUCCESS SCREEN (5/5 CORRECT + DIGITAL CONFETTI) */}
                            {quizStatus === 'success' && (
                                <div className="victory-container" style={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    minHeight: 0
                                }}>
                                    <DigitalConfetti />

                                    <div style={{
                                        borderBottom: '2px solid var(--term-green-bright)',
                                        paddingBottom: 14,
                                        marginBottom: 18,
                                        position: 'relative',
                                        zIndex: 60
                                    }}>
                                        <div style={{
                                            fontSize: '1.45rem',
                                            fontWeight: 900,
                                            color: 'var(--term-green-bright)',
                                            letterSpacing: '0.08em',
                                            textShadow: '0 0 16px var(--term-green-bright)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 10
                                        }}>
                                            <span>[ ★★★ ] CIVILIAN READINESS CLEARANCE GRANTED!</span>
                                        </div>
                                        <div style={{ color: 'var(--term-text-main)', fontSize: '0.94rem', marginTop: 4, letterSpacing: '0.04em' }}>
                                            ASSESSMENT RESULT: 5 / 5 (100% ACCURACY) // DIRECTIVE MASTERY CERTIFIED
                                        </div>
                                    </div>

                                    <div style={{
                                        overflowY: 'auto',
                                        flex: 1,
                                        paddingRight: 8,
                                        marginBottom: 16,
                                        position: 'relative',
                                        zIndex: 60
                                    }} className="scroll-dark">
                                        <div style={{
                                            background: 'rgba(51, 255, 102, 0.12)',
                                            border: '1.5px solid var(--term-green-bright)',
                                            padding: '20px 24px',
                                            marginBottom: 20,
                                            boxShadow: '0 0 20px rgba(51, 255, 102, 0.2)'
                                        }}>
                                            <div style={{
                                                fontSize: '1.2rem',
                                                lineHeight: 1.7,
                                                color: '#ffffff',
                                                fontWeight: 700,
                                                marginBottom: 12
                                            }}>
                                                CONGRATULATIONS: FLIGHT-READY OPERATIONAL DISASTER TRIAGE VALIDATED!
                                            </div>
                                            <p style={{
                                                fontSize: '1.02rem',
                                                lineHeight: 1.8,
                                                color: 'var(--term-text-main)',
                                                margin: 0
                                            }}>
                                                You achieved a perfect 5/5 score across all active civilian emergency knowledge modules. You have demonstrated immediate mastery of critical tourniquet hemorrhage control, airway protection, hazardous material sealing, and emergency grid survivability.
                                            </p>
                                        </div>

                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                            gap: 12
                                        }}>
                                            {quizQuestions.map((q, idx) => (
                                                <div key={idx} style={{
                                                    border: '1px solid var(--term-green-dim)',
                                                    background: 'rgba(3, 20, 8, 0.7)',
                                                    padding: '12px 16px',
                                                    borderRadius: 2
                                                }}>
                                                    <div style={{ color: 'var(--term-green-bright)', fontSize: '0.76rem', fontWeight: 800, marginBottom: 4 }}>
                                                        STAGE 0{idx + 1} // {q.headline}
                                                    </div>
                                                    <div style={{ color: 'var(--term-text-main)', fontSize: '0.86rem' }}>
                                                        ✔ {q.correctAnswer}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Success Screen Actions */}
                                    <div style={{
                                        display: 'flex',
                                        gap: 14,
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        paddingTop: 12,
                                        borderTop: '1px solid var(--term-green-dim)',
                                        position: 'relative',
                                        zIndex: 60
                                    }}>
                                        <button
                                            type="button"
                                            onClick={handleRetakeQuiz}
                                            className="term-btn"
                                            style={{ padding: '10px 22px' }}
                                        >
                                            Retake Pop Quiz
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleFullShuffle}
                                            className="term-btn"
                                            style={{
                                                padding: '10px 28px',
                                                fontWeight: 800,
                                                background: 'var(--term-green)',
                                                color: '#000'
                                            }}
                                        >
                                            Shuffle New Directives & Quiz
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    )}
                </section>
            </main>

            {/* FIXED LOWER-LEFT: "See Portfolio" Button */}
            <a
                href="https://zqhwebpro.github.io/portfolio/new_projects/"
                className="term-btn"
                style={{
                    position: 'fixed',
                    bottom: '16px',
                    left: '16px',
                    zIndex: 90,
                    padding: '8px 16px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    borderRadius: '2px',
                    letterSpacing: '0.08em',
                    boxShadow: '0 0 12px rgba(51, 255, 102, 0.35)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                }}
            >
                <span>See Portfolio</span>
                <span style={{ fontSize: '0.75rem' }}>↗</span>
            </a>

            {/* FIXED LOWER-RIGHT: Pixel Smiley Face Button */}
            <button
                type="button"
                className="pixel-face-btn"
                onClick={handleSmileyClick}
                onMouseEnter={handleSmileyHover}
                title="Laugh & Shift Color Hue"
                style={{
                    position: 'fixed',
                    bottom: '16px',
                    right: '16px',
                    zIndex: 90,
                    background: 'rgba(3, 15, 6, 0.92)',
                    border: '1.5px solid var(--term-green)',
                    borderRadius: '4px',
                    padding: '8px',
                    boxShadow: '0 0 16px rgba(51, 255, 102, 0.4)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <svg width="40" height="40" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: 'crispEdges' }}>
                    <path d="M5 2h6v1H5V2zm-2 2h2v1H3V4zm-1 3h1v2H2V7zm0 2h1v1H2V9zm1 3h2v1H3v-1zm2 1h6v1H5v-1zm6-1h2v1h-2v-1zm2-3h1v2h-1V9zm0-2h1v1h-1V7zm-1-3h2v1h-2V4z" fill="#00ff66" />
                    <path d="M5 3h6v1H5V3zm-2 2h10v2H3V5zm-1 2h12v2H2V7zm0 2h12v2H2V9zm1 2h10v1H3v-1zm2 1h6v1H5v-1z" fill="#04200d" />
                    <path d="M5 6h1v3H5V6zm-1 1h3v1H4V7zm6-1h1v3h-1V6zm-1 1h3v1h-3V7z" fill="#00ff66" />
                    <path d="M3 8h1v3H3V8zm9 0h1v3h-1V8zm-8 3h1v1H4v-1zm7 0h1v1h-1v-1zm-6 1h6v1H5v-1z" fill="#00ff66" />
                </svg>
            </button>

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