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
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
            if (this.ctx.state === 'suspended') {
                this.ctx.resume();
            }

            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
            this.masterGain.gain.linearRampToValueAtTime(0.22, this.ctx.currentTime + 0.5);
            this.masterGain.connect(this.ctx.destination);

            // 432Hz harmonic triad: 108Hz, 216Hz, 432Hz
            const harmonics = [
                { freq: 108, gainVal: 0.35, type: 'triangle' },
                { freq: 216, gainVal: 0.25, type: 'sine' },
                { freq: 432, gainVal: 0.18, type: 'sine' }
            ];

            this.oscillators = [];

            harmonics.forEach(({ freq, gainVal, type }) => {
                const osc = this.ctx.createOscillator();
                const oscGain = this.ctx.createGain();
                osc.type = type;
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

                oscGain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
                osc.connect(oscGain);
                oscGain.connect(this.masterGain);
                osc.start();
                this.oscillators.push(osc);
            });

            this.isPlaying = true;
        } catch (e) {
            console.warn("Audio Context error:", e);
        }
    }

    stop() {
        if (!this.isPlaying) return;
        try {
            if (this.masterGain && this.ctx) {
                const now = this.ctx.currentTime;
                this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
                this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.12);

                setTimeout(() => {
                    this.oscillators.forEach(osc => {
                        try { osc.stop(); osc.disconnect(); } catch (e) { }
                    });
                    this.oscillators = [];
                    if (this.ctx && this.ctx.state !== 'closed') {
                        try { this.ctx.close(); } catch (e) { }
                    }
                    this.ctx = null;
                    this.isPlaying = false;
                }, 150);
            } else {
                this.isPlaying = false;
            }
        } catch (e) {
            this.isPlaying = false;
        }
    }

    toggle() {
        if (this.isPlaying) {
            this.stop();
            return false;
        } else {
            this.start();
            return true;
        }
    }
}

// Retro 8-bit staccato laugh audio generator
const playRetroLaugh = () => {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
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
        if (ctx.state === 'suspended') ctx.resume();
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
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;

        const notes = [
            { freq: 261.63, time: 0.00, dur: 0.09 },
            { freq: 329.63, time: 0.09, dur: 0.09 },
            { freq: 392.00, time: 0.18, dur: 0.09 },
            { freq: 523.25, time: 0.27, dur: 0.22 },
            { freq: 440.00, time: 0.52, dur: 0.09 },
            { freq: 523.25, time: 0.61, dur: 0.09 },
            { freq: 659.25, time: 0.70, dur: 0.45 }
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
        if (ctx.state === 'suspended') ctx.resume();
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

// Retro 8-bit digital glitch audio blip
const playGlitchSound = () => {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.linearRampToValueAtTime(140, now + 0.16);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
        setTimeout(() => { try { ctx.close(); } catch (e) { } }, 250);
    } catch (e) { }
};

// Retro 8-bit digital computer page switch beep
const playPageTurnSound = () => {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(880, now + 0.04);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
        setTimeout(() => { try { ctx.close(); } catch (e) { } }, 150);
    } catch (e) { }
};

// Post-Apocalyptic & Civilian Survival Knowledge Corpus (100 Directives)
const CIVILIAN_EMERGENCY_CORPUS = [
    {
        "num": 1,
        "headline": "[TRAUMA] ARTERIAL TOURNIQUET APPLICATION",
        "content": "Place commercial tourniquet 2–3 inches above bleeding wound (never on a joint). Twist windlass until bright red pulsing stops completely. Record time on forehead; tissue tolerates up to two hours safely."
    },
    {
        "num": 2,
        "headline": "[TRAUMA] JUNCTIONAL WOUND PACKING",
        "content": "For arterial bleeding at the groin, armpit, or neck where tourniquets cannot fit, pack hemostatic gauze deep into the wound cavity until packed tight, then maintain constant direct two-handed pressure for 3 full minutes."
    },
    {
        "num": 3,
        "headline": "[AIRWAY] RECOVERY POSITION FOR UNRESPONSIVENESS",
        "content": "Place an unconscious breathing person on their left side with top leg bent at 90 degrees. This prevents the tongue from obstructing the airway and stops aspirating vomit into the lungs."
    },
    {
        "num": 4,
        "headline": "[CHOKING] HEIMLICH & SELF-ABDOMINAL THRUSTS",
        "content": "Stand behind the victim, make a fist above the navel, and thrust inward and upward forcefully. If alone, drive your upper abdomen forcefully over the back of a sturdy chair or countertop edge."
    },
    {
        "num": 5,
        "headline": "[WATER] EMERGENCY BOILING STANDARDS",
        "content": "Bring water to a rolling boil for a minimum of 1 full minute (3 minutes at elevations above 5,000 feet) to kill all enteric pathogens, protozoa, and viruses regardless of turbidity."
    },
    {
        "num": 6,
        "headline": "[WATER] HOUSEHOLD BLEACH PURIFICATION",
        "content": "Add 8 drops (1/8 teaspoon) of plain, unscented 6% household bleach per gallon of clear water. Stir and wait 30 minutes; water must retain a slight chlorine scent or repeat treatment once."
    },
    {
        "num": 7,
        "headline": "[WATER] HOT WATER HEATER EMERGENCY SUPPLY",
        "content": "In a total municipal shutoff, shut off the main incoming home water valve to avoid contamination, turn off the heater power breaker, and drain 30–50 gallons of potable water from the bottom drain spigot."
    },
    {
        "num": 8,
        "headline": "[FIRE] SMOKE INHALATION CRAWL PROFILE",
        "content": "In structural fires, toxic carbon monoxide and superheated gases pool from the ceiling down. Keep face 12–24 inches off the floor where clean, cool oxygen remains, and feel doors with the back of hand for heat before opening."
    },
    {
        "num": 9,
        "headline": "[FIRE] SECONDARY EGRESS BREAKOUT",
        "content": "If primary stairwells are blocked, retreat to an exterior room, seal under-door gaps with wet towels, and signal out a closed window. Break windows only as a last resort to prevent backdraft oxygen rushes."
    },
    {
        "num": 10,
        "headline": "[HAZMAT] SHELTER-IN-PLACE SEALING",
        "content": "For toxic airborne spills, select an above-ground interior room without external vents. Turn off all HVAC systems immediately and seal door borders, windows, and electrical outlets with 4-mil plastic sheeting and duct tape."
    },
    {
        "num": 11,
        "headline": "[BLACKOUT] REFRIGERATOR COLD-CHAIN INTEGRITY",
        "content": "An unopened refrigerator keeps food safe for 4 hours; a full closed freezer holds safe temperatures for 48 hours. Discard perishable meats and dairy held above 40°F (4°C) for more than 2 hours."
    },
    {
        "num": 12,
        "headline": "[FLOOD] RAPID WATER VEHICLE EVACUATION",
        "content": "Moving water 12 inches deep can carry away small cars; 24 inches sweeps trucks. If stalled in rising water, unbuckle instantly, roll down windows before electrical shorts, and escape onto the roof."
    },
    {
        "num": 13,
        "headline": "[COLD] PREVENTING CONDUCTIVE HEAT DRAIN",
        "content": "Hypothermia in stranded situations is accelerated by direct conduction into cold ground. Place cardboard, car floor mats, spare tires, or luggage between your body and concrete/dirt surfaces."
    },
    {
        "num": 14,
        "headline": "[HEAT] HEAT STROKE RAPID COOLING",
        "content": "Heat stroke (confusion, cessation of sweating, core temp over 104°F) is lethal. Strip clothing and apply cold packs or soaked towels directly to high-blood-flow nodes: armpits, groin, and neck base."
    },
    {
        "num": 15,
        "headline": "[WEATHER] TORNADO INTERIOR REFUGE",
        "content": "In a structure without a basement, shelter in the center-most room (bathroom/closet) on the lowest floor. Put as many walls between you and the exterior as possible, and cover your head with a mattress."
    },
    {
        "num": 16,
        "headline": "[EARTHQUAKE] DROP, COVER, AND HOLD ON",
        "content": "Do not run outside where falling masonry and glass cause 80% of injuries. Drop to hands and knees under a heavy desk, protect head/neck with hands, and hold on to the furniture leg until shaking ceases."
    },
    {
        "num": 17,
        "headline": "[COMMS] SMS TEXT OVER VOICE PRIORITIZATION",
        "content": "During regional disasters, voice cellular networks fail due to bandwidth saturation. SMS text packets require minimal bandwidth and will queue through clogged towers even when phone calls drop."
    },
    {
        "num": 18,
        "headline": "[COMMS] EMERGENCY 911 TOWER ROAMING",
        "content": "Cell phones are legally mandated to connect to any available cellular carrier tower for emergency 911 calls, even if your specific provider shows zero reception bars or your SIM card is deactivated."
    },
    {
        "num": 19,
        "headline": "[THREAT] RUN-HIDE-FIGHT INTERIOR DEFENSE",
        "content": "If evacuation is cut off during an active attack, lock and barricade doorways with heavy desks tied off with belts or extension cords, turn off lights, silence cell phones, and prepare ambush counter-strikes."
    },
    {
        "num": 20,
        "headline": "[NAVIGATION] ANALOG WATCH COMPASS",
        "content": "In the Northern Hemisphere, point the hour hand directly at the sun. Halfway between the hour hand and the 12 o'clock marker marks true South. In the Southern Hemisphere, point 12 at the sun; halfway marks North."
    },
    {
        "num": 21,
        "headline": "[SIGNALING] REFLECTIVE FLASH TECHNIQUES",
        "content": "A pocket mirror, polished phone screen, or car rearview mirror can project sunlight flashes visible to aircraft up to 20 miles away. Aim flash through a V-shaped sight between two outstretched fingers."
    },
    {
        "num": 22,
        "headline": "[MED] CARBON MONOXIDE CO SILENT HAZARD",
        "content": "Running generators, camp stoves, or charcoal grills indoors produces colorless, odorless CO that binds to hemoglobin 200x faster than oxygen. Never run combustion engines within 20 feet of open home windows."
    },
    {
        "num": 23,
        "headline": "[PANIC] 4-4-4-4 BOX BREATHING",
        "content": "Extreme situational panic causes tunnel vision and loss of fine motor skills. Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, and hold empty for 4 seconds to force down sympathetic heart rate."
    },
    {
        "num": 24,
        "headline": "[OFF-GRID] SANITATION AND WASTE MANAGEMENT",
        "content": "In prolonged grid failure, isolate human waste immediately to prevent cholera outbreaks. Line a 5-gallon bucket with heavy garbage bags and cover waste after each use with sawdust, cat litter, or ash."
    },
    {
        "num": 25,
        "headline": "[FALLOUT] NUCLEAR GAMMA ATTENUATION",
        "content": "To halve penetrating gamma radiation from nuclear fallout (half-value layer), interpose either 3 inches of solid lead, 12 inches of poured concrete, or 18 inches of packed soil."
    },
    {
        "num": 26,
        "headline": "[FALLOUT] 7-10 RULE FOR RADIATION DECAY",
        "content": "Nuclear fallout radioactivity follows the 7-10 rule: for every 7-fold increase in time post-detonation, radiation dose rates decay by 90% (e.g., at 7 hours radiation drops to 1/10th; at 49 hours to 1/100th)."
    },
    {
        "num": 27,
        "headline": "[RADIATION] PERSONNEL DECONTAMINATION",
        "content": "Removing contaminated outer garments and footwear eliminates up to 90% of radioactive fallout particles. Gently wash exposed skin and hair with warm water and soap without abrasive scrubbing."
    },
    {
        "num": 28,
        "headline": "[WATER] IMPROVISED CHARCOAL SAND FILTER",
        "content": "Layer crushed hardwood charcoal between fine sand, gravel, and clean cloth inside a cut plastic bottle to adsorb chemical contaminants, radioactive particulates, and organic toxins before boiling."
    },
    {
        "num": 29,
        "headline": "[WATER] SOLAR CONDENSATION STILL",
        "content": "In arid environments, dig a 3-foot pit with a central collection jar, line the pit with green non-toxic foliage, and seal with a clear plastic sheet weighted by a center stone to condense pure solar water."
    },
    {
        "num": 30,
        "headline": "[EMP] FARADAY CAGE PROTECTION",
        "content": "Protect sensitive electronics, two-way radios, and solar inverters from high-altitude EMP by storing them inside nested galvanized steel cans lined with non-conductive cardboard and sealed metal lids."
    },
    {
        "num": 31,
        "headline": "[MED] POTASSIUM IODIDE (KI) PROTOCOL",
        "content": "Take Potassium Iodide (KI) immediately upon verified radiological fallout alert to flood thyroid receptors with stable iodine, preventing uptake of carcinogenic radioactive Iodine-131."
    },
    {
        "num": 32,
        "headline": "[FORAGING] UNIVERSAL EDIBILITY TEST",
        "content": "Test unfamiliar plants sequentially over 8-hour intervals: rub plant sap on inner wrist, touch to lip corner, place on tongue tip, chew small leaf without swallowing, then ingest small bite if symptom-free."
    },
    {
        "num": 33,
        "headline": "[FUEL] RECOVERY & JIGGLER SIPHON SAFETY",
        "content": "Never mouth-siphon aged vehicle gasoline. Use an anti-static jiggler brass-ball siphon hose, and treat recovered fuel with chemical stabilizer to prevent carburetor varnishing."
    },
    {
        "num": 34,
        "headline": "[ENERGY] 12V LEAD-ACID BATTERY REVIVAL",
        "content": "Dead sulfated lead-acid car batteries can be reconditioned in off-grid survival by replacing dried electrolyte with warm distilled water saturated with Epsom salt (magnesium sulfate) before slow charging."
    },
    {
        "num": 35,
        "headline": "[COMMS] EMERGENCY SOS FLASH CADENCE",
        "content": "Broadcast visual or audio distress signals using the standardized SOS pattern: 3 short bursts, 3 long bursts, 3 short bursts (· · · — — — · · ·), followed by a 60-second silence before repeating."
    },
    {
        "num": 36,
        "headline": "[COLD] TRENCH FOOT & IMMERSION PREVENTION",
        "content": "Non-freezing cold immersion injury occurs when feet stay damp below 60°F (15°C) for over 12 hours. Vigorously dry feet daily, apply antiseptic powder, and rotate dry wool sock pairs."
    },
    {
        "num": 37,
        "headline": "[TRAUMA] SUCKING CHEST WOUND 3-SIDED VENT SEAL",
        "content": "For penetrating thoracic wounds with bubbling air, tape an airtight plastic sheet on three sides leaving the bottom open as a flutter valve to release trapped pleural air and prevent tension pneumothorax."
    },
    {
        "num": 38,
        "headline": "[TRAUMA] CLOSED FRACTURE TRACTION & SPLINTING",
        "content": "Immobilize the joint above and below any suspected broken bone using rigid branches or rolled magazines. Check distal pulse, motor function, and sensation before and after applying binding wraps."
    },
    {
        "num": 39,
        "headline": "[TRAUMA] CRUSH SYNDROME TOXIC REPERFUSION",
        "content": "If a limb has been pinned under heavy debris for over 2 hours, do not lift the weight suddenly without pre-hydrating victim; releasing sudden myoglobin and potassium toxins into circulation causes cardiac arrest."
    },
    {
        "num": 40,
        "headline": "[MED] SEVERE BURN RULE OF NINES & DRESSINGS",
        "content": "Cover deep second and third-degree burns with clean dry sterile plastic sheeting or unmedicated gauze. Never apply ice, butter, or oil, and do not pop blisters to prevent fatal bacterial infection."
    },
    {
        "num": 41,
        "headline": "[MED] PIT VIPER SNAKEBITE IMMOBILIZATION",
        "content": "Keep victim calm and immobilize the bitten limb below heart level. Never cut the wound, never suck venom, and never apply tourniquets; mark advancing swelling with pen every 15 minutes."
    },
    {
        "num": 42,
        "headline": "[MED] SEVERE ANAPHYLAXIS EPINEPHRINE PROTOCOL",
        "content": "Inject an epinephrine auto-injector into the anterolateral mid-outer thigh and hold firmly for 3 seconds. Massage area for 10 seconds and prepare for a potential biphasic secondary reaction within 4 hours."
    },
    {
        "num": 43,
        "headline": "[MED] CHEMICAL EYE INJURY CONTINUOUS IRRIGATION",
        "content": "Flush chemical splash into eyes immediately with clean water or saline for a minimum of 15–20 continuous minutes, holding eyelids open while rolling eyes in all directions."
    },
    {
        "num": 44,
        "headline": "[MED] SEVERE DIARRHEA ORAL REHYDRATION SALTS (ORS)",
        "content": "To prevent fatal dehydration from dysentery or cholera, mix 1 liter clean water with 6 level teaspoons sugar and 1/2 level teaspoon salt to restore essential electrolyte absorption."
    },
    {
        "num": 45,
        "headline": "[MED] EMERGENCY DENTAL TOOTHACHE OIL OF CLOVES",
        "content": "Apply a drop of essential clove oil (eugenol) on a sterile cotton pellet directly into a decayed cavity to numb dental pulp nerve agony and provide natural antimicrobial suppression."
    },
    {
        "num": 46,
        "headline": "[MED] STERILE BUTTERFLY WOUND CLOSURE VS SUTURES",
        "content": "Clean laceration borders with sterile water and pull wound edges together using adhesive butterfly strips placed perpendicular across the cut, rather than amateur suturing which traps anaerobic infections."
    },
    {
        "num": 47,
        "headline": "[WATER] SODIS UV SOLAR WATER DISINFECTION",
        "content": "Fill transparent PET plastic bottles (under 2 liters) with clear water and lay horizontally on a metal or reflective roof in full sunlight for 6 hours (2 days if cloudy) to inactivate pathogens via UV-A rays."
    },
    {
        "num": 48,
        "headline": "[WATER] TRANSPIRATION BAG WATER HARVESTING",
        "content": "Tie a clear plastic garbage bag tightly around a sunlit leafy non-toxic tree branch with a corner hanging low. Plant transpiration condenses clean, filtered water droplets into the bag basin daily."
    },
    {
        "num": 49,
        "headline": "[WATER] RAINWATER HARVESTING FIRST FLUSH DIVERSION",
        "content": "When collecting roof rainwater, divert and discard the first 1–2 gallons per 100 sq ft of roof area to wash away bird droppings, soot, and atmospheric debris before filling storage cisterns."
    },
    {
        "num": 50,
        "headline": "[WATER] CHLORINE DIOXIDE VS IODINE PURIFICATION",
        "content": "Chlorine dioxide tablets kill Cryptosporidium oocysts and Giardia without discoloring water; iodine tablets require 4 hours for Cryptosporidium and must not be used long-term by pregnant individuals."
    },
    {
        "num": 51,
        "headline": "[WATER] DESALINATING SEAWATER IMPROVISED FREEZE-THAW",
        "content": "Never drink raw seawater (high salinity draws cellular water, causing renal failure). When seawater freezes, pure ice crystals form on top while dense brine drops to the bottom; melt the rinsed top ice for potable water."
    },
    {
        "num": 52,
        "headline": "[WATER] FLOCCULATION WATER CLARIFICATION WITH ALUM",
        "content": "Add a pinch of potassium alum (aluminum sulfate) to muddy turbid water and stir briskly for 1 minute then slowly for 5 minutes. Suspended dirt particles clump and settle to the bottom in 30 minutes."
    },
    {
        "num": 53,
        "headline": "[WATER] SEEP WELL GROUNDWATER FILTRATION",
        "content": "Dig a 3-foot deep hole 6–10 feet back from a muddy riverbank or lake shore. Water seeping into the pit has undergone natural soil and sand filtration, reducing silt and turbidity before disinfection."
    },
    {
        "num": 54,
        "headline": "[FALLOUT] HIGH-DOSE ACUTE RADIATION SICKNESS (ARS)",
        "content": "Nausea, vomiting, and diarrhea within 1–2 hours of fallout exposure indicate life-threatening gamma dose (>4 Gray/400 Rads). Absolute isolation, hydration, and prophylactic antibiotics are mandatory."
    },
    {
        "num": 55,
        "headline": "[CBRN] NERVE AGENT AUTO-INJECTOR ATROPINE PROTOCOL",
        "content": "Upon exposure to organophosphate chemical agents (pinpoint pupils, twitching, severe salivation), inject Atropine and 2-PAM chloride immediately into the outer thigh to block fatal cholinergic crisis."
    },
    {
        "num": 56,
        "headline": "[CBRN] HEAVY CHLORINE GAS UPWIND HIGH-GROUND ESCAPE",
        "content": "Chlorine and phosgene gas are heavier than air and sink into basements, valleys, and drainage ditches. Evacuate immediately upwind and seek the highest elevation or upper floors of airtight buildings."
    },
    {
        "num": 57,
        "headline": "[CBRN] IMPROVISED ACTIVATED CHARCOAL GAS RESPIRATOR",
        "content": "Pack activated charcoal granules tightly between cotton layers inside a plastic container sealed against the face. Dampening outer cloth with baking soda neutralizes acidic chlorine fumes."
    },
    {
        "num": 58,
        "headline": "[CBRN] BIOLOGICAL QUARANTINE AIRLOCK ISOLATION",
        "content": "Isolate symptomatic infected individuals in a separate room sealed with double-layer plastic airlocks. Caregivers must wear impermeable aprons, eye goggles, and soak footwear in 10% bleach pans upon exit."
    },
    {
        "num": 59,
        "headline": "[FALLOUT] RADIATION DOSIMETER PEN READING & LIMITS",
        "content": "Monitor quartz fiber pocket dosimeter daily. Keep cumulative emergency civilian exposure strictly below 25 Roentgens (0.25 Sv) to avoid acute immunosuppression and clinical radiation sickness."
    },
    {
        "num": 60,
        "headline": "[FALLOUT] RESIDUAL BETA PARTICLE CONTACT PREVENTION",
        "content": "Beta radiation particles cause severe dermal burns upon contact. Wear thick boots, heavy work gloves, wrap duct tape around trouser cuffs and wrists, and discard outer ponchos prior to entering bunker doors."
    },
    {
        "num": 61,
        "headline": "[FIRE] FERROCERIUM ROD & TINDER PREPARATION",
        "content": "Scrape dull black coating off ferro rod first. Shave fine magnesium curls or prepare fine petroleum jelly cotton ball tinder, then scrape spine of carbon knife at 45 degrees into tinder from 1 inch away."
    },
    {
        "num": 62,
        "headline": "[FIRE] FRICTION BOW DRILL EMBER GENERATION",
        "content": "Carve a V-notch into a dry cedar or cottonwood hearth board. Spin a dry hardwood spindle via bow until black dust fills notch, then increase downward pressure and speed until heavy smoke forms a glowing ember."
    },
    {
        "num": 63,
        "headline": "[FIRE] SWEDISH SELF-FEEDING LOG STOVE",
        "content": "Cut two perpendicular vertical slits halfway down a standing dry log and ignite kindling inside center intersection. The chimney effect draws air upward, burning from inside out for 3+ hours of stable cooking heat."
    },
    {
        "num": 64,
        "headline": "[FIRE] CHAR CLOTH PRODUCTION IN AIRTIGHT TINS",
        "content": "Place 100% natural cotton cloth squares inside a metal tin with a tiny nail hole in lid. Heat over fire until white smoke stops venting; cooled cloth catches the faintest spark instantly into a glowing ember."
    },
    {
        "num": 65,
        "headline": "[FIRE] CHEMICAL FIRE STARTING WITH POTASSIUM PERMANGANATE",
        "content": "Mix potassium permanganate crystals with a few drops of pure glycerin or antifreeze on dry paper. The exothermic oxidation reaction spontaneously bursts into vigorous flame within 30–60 seconds."
    },
    {
        "num": 66,
        "headline": "[COLD] DEEP HYPOTHERMIA TRUNK REWARMING PROTOCOL",
        "content": "Rewarm the body core (chest, neck, groin) first using warm dry clothing and hot water bottles wrapped in towels. Never vigorously rub cold extremities; sudden cold blood shock to the heart triggers fatal ventricular fibrillation."
    },
    {
        "num": 67,
        "headline": "[COLD] IMPROVISED SNOW TRENCH & QUINZHEE INSULATION",
        "content": "Piled snow contains 90% trapped air, providing thermal insulation. Hollow out a quinzhee dome with a raised sleeping bench higher than the entrance tunnel, allowing heavy cold air to sink below your body."
    },
    {
        "num": 68,
        "headline": "[COLD] BLIZZARD VEHICLE EXHAUST TAILPIPE INSPECTION",
        "content": "When running a stranded vehicle heater in heavy snow, clear snow around exhaust tailpipe every 20 minutes. A blocked exhaust backs lethal carbon monoxide directly into the passenger cabin in minutes."
    },
    {
        "num": 69,
        "headline": "[HEAT] DESERT SURVIVAL SIERRA CUP WATER CONSERVATION",
        "content": "In extreme heat, breathe exclusively through the nose, keep all clothing on to reflect radiant solar heat and slow sweat evaporation, and travel only during twilight and nighttime hours."
    },
    {
        "num": 70,
        "headline": "[ENERGY] OFF-GRID SOLAR MPPT VS PWM CHARGE CONTROLLERS",
        "content": "Maximum Power Point Tracking (MPPT) charge controllers extract up to 30% more energy from solar panels in cold or cloudy conditions compared to simple Pulse Width Modulation (PWM) by converting excess voltage to amperage."
    },
    {
        "num": 71,
        "headline": "[ENERGY] PREVENTING LITHIUM-ION SUB-ZERO CHARGE DAMAGE",
        "content": "Never charge Lithium Iron Phosphate (LiFePO4) batteries below 32°F (0°C); sub-zero charging causes permanent metallic lithium plating on anodes and catastrophic short-circuits. Discharge is safe down to -4°F."
    },
    {
        "num": 72,
        "headline": "[ENERGY] RECTIFIER DIODE SOLAR BACKFEED BLOCKING",
        "content": "Install a heavy-duty Schottky blocking diode in series on the positive line of simple DIY solar panels to prevent the battery bank from discharging backward through the dark solar cells overnight."
    },
    {
        "num": 73,
        "headline": "[ENERGY] MOTORCYCLE ALTERNATOR DIY WIND GENERATOR",
        "content": "A permanent-magnet motorcycle alternator or brushless DC treadmill motor wired to a bridge rectifier creates efficient low-RPM 12V DC power when coupled to three-bladed PVC pipe wind turbines."
    },
    {
        "num": 74,
        "headline": "[ENERGY] BIOMASS WOOD GASIFICATION FOR ENGINES",
        "content": "Heating dry wood chunks inside an oxygen-starved gasifier converts cellulose into wood gas (carbon monoxide and hydrogen). Filter soot through wood chips and feed directly into a gasoline engine carburetor."
    },
    {
        "num": 75,
        "headline": "[ENERGY] EMERGENCY TERRACOTTA CANDLE HEATER CONVECTION",
        "content": "Inverting nested unglazed clay flower pots over three tea-light candles on a fireproof brick creates a thermal convective radiator that traps and distributes gentle radiant heat without open flame drafts."
    },
    {
        "num": 76,
        "headline": "[FUEL] LONG-TERM GASOLINE VS DIESEL ALGAE DEGRADATION",
        "content": "Untreated ethanol gasoline degrades in 3–6 months forming gummy varnish; diesel stores for 12–24 months but grows anaerobic microbial algae. Treat diesel with biocide and gasoline with fuel stabilizer."
    },
    {
        "num": 77,
        "headline": "[NAVIGATION] POLARIS NORTH STAR MERIDIAN SIGHTING",
        "content": "Locate the Big Dipper's outer bowl stars (Merak and Dubhe). Extend an imaginary line through them 5 times their distance to find Polaris (North Star), which indicates True North within 1 degree."
    },
    {
        "num": 78,
        "headline": "[NAVIGATION] SOUTHERN CROSS POINTER STAR HEADING",
        "content": "In the Southern Hemisphere, extend a line through the long axis of the Southern Cross constellation 4.5 times its length, then drop directly down to the horizon to identify True South."
    },
    {
        "num": 79,
        "headline": "[NAVIGATION] SHADOW TIP STICK EAST-WEST LINE METHOD",
        "content": "Place a 3-foot stick vertically in level ground and mark tip of shadow with a stone. Wait 20 minutes and mark the new shadow tip. A straight line between marks points East-West (first stone is West, second is East)."
    },
    {
        "num": 80,
        "headline": "[NAVIGATION] TOPOGRAPHIC MAP MAGNETIC DECLINATION DRIFT",
        "content": "Compass needles point to Magnetic North, not True Grid North. Adjust compass declination ring for your region (e.g. 12° West) before plotting bearings to avoid miles of off-target navigation error over distance."
    },
    {
        "num": 81,
        "headline": "[NAVIGATION] STANDARDIZED PACE COUNTING PACE-BEADS CALIBRATION",
        "content": "Calibrate your personal pace count by walking a measured 100-meter course (e.g. 64 double-steps). Slide one pace-count ranger bead down for every 100m traveled to maintain dead-reckoning accuracy."
    },
    {
        "num": 82,
        "headline": "[SIGNALING] GROUND-TO-AIR VISUAL RESCUE SYMBOLS (X, V, II)",
        "content": "Lay high-contrast rock or log markers at least 10 feet long in an open clearing: 'X' indicates Require Medical Assistance, 'V' indicates Require Assistance, and 'II' indicates Require Medical Supplies."
    },
    {
        "num": 83,
        "headline": "[SIGNALING] PEALESS WHISTLE 3-BLAST CADENCE",
        "content": "Blow three loud 3-second whistle blasts, pause for 1 minute, then repeat. Three blasts in any combination is the universal distress signal recognized across international search and rescue."
    },
    {
        "num": 84,
        "headline": "[SIGNALING] EMERGENCY ORANGE SMOKE & NIGHT FLARE DRIFT",
        "content": "Deploy dense orange smoke flares only when aircraft or rescue teams are within visual line of sight. Always stand upwind to prevent smoke from obscuring ground markers or suffocating signaling personnel."
    },
    {
        "num": 85,
        "headline": "[WEATHER] CUMULONIMBUS ANVIL THUNDERSTORM PREDICTION",
        "content": "A towering cumulus cloud flattening into a wide, fibrous anvil-shaped top indicates severe updrafts, dangerous lightning, microburst winds, and localized flash flooding within 30–60 minutes."
    },
    {
        "num": 86,
        "headline": "[WEATHER] RAPID BAROMETRIC DROP STORM GALE WARNING",
        "content": "A sudden barometric pressure drop greater than 3 millibars (0.09 inHg) within a 3-hour period reliably indicates an approaching severe squall line or gale-force cyclone within 6–12 hours."
    },
    {
        "num": 87,
        "headline": "[SECURITY] ENTRYWAY DOOR BARRIER CROSSBAR LEVERAGE",
        "content": "Reinforce standard entryways by screwing heavy 2x4 steel brackets into wall studs 3 inches deep on both door frames and dropping a solid hardwood timber across the center latch plane."
    },
    {
        "num": 88,
        "headline": "[SECURITY] PERIMETER MONOFILAMENT TRIPWIRE ACOUSTIC ALARMS",
        "content": "Run low-visibility 10-lb test fishing monofilament 6 inches above ground along perimeter choke points connected to spring-loaded clothespin triggers holding aluminum cans filled with gravel."
    },
    {
        "num": 89,
        "headline": "[SECURITY] NIGHT LIGHT DISCIPLINE & RED-FILTER ILLUMINATION",
        "content": "A single unshielded flashlight beam is visible from 10 miles away in blackout terrain. Use low-lumen red LED light or red cellophane covers to preserve scotopic night vision and prevent visual detection."
    },
    {
        "num": 90,
        "headline": "[COMMS] HAM RADIO VHF 2-METER LINE-OF-SIGHT PROPAGATION",
        "content": "VHF 2-meter (144–148 MHz) handheld radios require direct line-of-sight propagation. Climb ridge crests or elevate antennas onto 20-foot bamboo masts to extend radio transmission range from 3 miles to over 25 miles."
    },
    {
        "num": 91,
        "headline": "[COMMS] FRS & GMRS CHANNEL RESTRICTIONS POST-GRID",
        "content": "Standard Family Radio Service (FRS) channels 1–7 and 15–22 allow up to 2 Watts power output; channels 8–14 are restricted to 0.5 Watts short-range. Channel 1 (462.5625 MHz) is common emergency contact."
    },
    {
        "num": 92,
        "headline": "[OFF-GRID] TWO-BUCKET BIO-SEPARATION LATRINE TOILET",
        "content": "Separate urine from solid feces using a diversion toilet seat. Pure urine is sterile nitrogen fertilizer; dry solid waste covered with sawdust dehydrates without anaerobic odor or lethal fly-borne contamination."
    },
    {
        "num": 93,
        "headline": "[FORAGING] PINE NEEDLE VITAMIN C SCURVY PREVENTION TEA",
        "content": "Steep clean green needles from White Pine, Spruce, or Douglas Fir in hot (not boiling) water for 10 minutes. Pine needle tea contains 4–5 times the Vitamin C of orange juice, preventing fatal scurvy."
    },
    {
        "num": 94,
        "headline": "[FORAGING] ACORN TANNIN HOT WATER LEACHING PROCESS",
        "content": "Raw oak acorns contain bitter toxic tannic acid that damages kidneys. Shell acorns, crush into coarse meal, and boil through 3–4 water changes until water remains completely clear and sweet."
    },
    {
        "num": 95,
        "headline": "[FORAGING] WILD DANDELION & PLANTAIN ROOT NUTRIENTS",
        "content": "Every part of the common dandelion is edible: roots roast into coffee substitute, leaves provide iron and vitamin A. Crushed broadleaf plantain leaves form an emergency poultice against insect bites."
    },
    {
        "num": 96,
        "headline": "[FOOD] PEMMICAN TALLOW & DRIED MEAT PRESERVATION",
        "content": "Pemmican is made by pulverizing lean dehydrated meat into a coarse powder and mixing 1:1 by weight with rendered beef/bison kidney tallow. Sealed in airtight rawhide, it remains calorie-dense for 20+ years."
    },
    {
        "num": 97,
        "headline": "[FOOD] VEGETABLE SALT-BRINE LACTO-FERMENTATION",
        "content": "Submerge chopped clean vegetables in a 2.5% to 3% salt-water brine (2 tablespoons kosher salt per quart water) under an airtight airlock. Beneficial Lactobacillus bacteria preserves food for months without power."
    },
    {
        "num": 98,
        "headline": "[FOOD] SOLAR DRIED FRUIT & BACTERIAL SLICE THICKNESS",
        "content": "Slice fruits and vegetables into uniform 1/4-inch slices and place on mesh screens inside a solar dehydrator at 130°F–140°F until moisture content drops below 10%, preventing mold and bacterial proliferation."
    },
    {
        "num": 99,
        "headline": "[FOOD] TOXIC WOODS TO AVOID FOR MEAT SMOKING",
        "content": "Never smoke survival meat or fish with resinous softwoods like pine, fir, cedar, or spruce; their creosote and toxic resins ruin food and cause severe toxicity. Use hardwoods like oak, hickory, maple, or fruitwoods."
    },
    {
        "num": 100,
        "headline": "[FOOD] ROOT VEGETABLE DAMP SAND ROOT CELLAR STORAGE",
        "content": "Store unwashed carrots, beets, potatoes, and parsnips in single layers buried in boxes of barely damp sandbox sand at 35°F–40°F. Root vegetables enter dormancy and stay fresh for 6–8 months off-grid."
    }
];

// Comprehensive Question Bank for all 100 emergency directives
const TRIVIA_QUESTION_BANK = {
    "1": {
        "question": "Where should an arterial tourniquet be placed relative to a bleeding wound?",
        "correct": "2–3 inches above the wound (never on a joint)",
        "distractors": [
            "Directly over the nearest joint",
            "1–2 inches below the laceration site",
            "Directly on top of the open wound"
        ]
    },
    "2": {
        "question": "How long must continuous direct two-handed pressure be maintained after packing junctional wounds?",
        "correct": "3 full minutes of uninterrupted pressure",
        "distractors": [
            "30 seconds of light compression",
            "10 seconds followed by wrapping",
            "15 minutes without any gauze"
        ]
    },
    "3": {
        "question": "How should an unconscious breathing person be positioned in the recovery position?",
        "correct": "On their left side with top leg bent at 90 degrees",
        "distractors": [
            "Flat on their back with feet elevated 12 inches",
            "Face-down with arms pinned under the chest",
            "Seated upright leaning backward against a wall"
        ]
    },
    "4": {
        "question": "Where should you position your fist when performing the Heimlich maneuver / abdominal thrusts?",
        "correct": "Directly above the navel with inward and upward thrusts",
        "distractors": [
            "Directly over the center of the breastbone",
            "Below the belt line against the pelvic bone",
            "Across the lower rib cage margin"
        ]
    },
    "5": {
        "question": "What is the minimum rolling boil duration required to purify emergency water at sea level?",
        "correct": "1 full minute (3 minutes at elevations above 5,000 ft)",
        "distractors": [
            "15 seconds of gentle simmering",
            "30 minutes of continuous rolling boil",
            "5 seconds as soon as steam begins"
        ]
    },
    "6": {
        "question": "How much plain 6% unscented household bleach is required to purify one gallon of clear water?",
        "correct": "8 drops (1/8 teaspoon), then wait 30 minutes",
        "distractors": [
            "2 full tablespoons per gallon",
            "25 drops per quart of water",
            "1 fluid cup per 5 gallons"
        ]
    },
    "7": {
        "question": "What essential safety step must be performed before draining emergency water from a hot water heater?",
        "correct": "Shut off incoming main water valve and heater power breaker",
        "distractors": [
            "Turn the thermostat to maximum heat setting",
            "Add chlorine tablets directly into the vent stack",
            "Open all upstairs hot faucets before closing any valves"
        ]
    },
    "8": {
        "question": "In structural fire conditions, where does clean, cool oxygen remain for escape?",
        "correct": "12–24 inches off the floor below thermal ceiling layers",
        "distractors": [
            "Near the ceiling where hot air rises",
            "Directly in front of open chimney flues",
            "Standing upright at eye level"
        ]
    },
    "9": {
        "question": "Why should windows only be broken as a last resort during structural fire entrapment?",
        "correct": "To prevent sudden backdraft oxygen rushes from feeding the fire",
        "distractors": [
            "To preserve the acoustic glass alarm",
            "Because smoke will escape too quickly",
            "To prevent cold outdoor air from freezing rooms"
        ]
    },
    "10": {
        "question": "What room location is safest for shelter-in-place sealing during hazardous airborne releases?",
        "correct": "An above-ground interior room without external vents",
        "distractors": [
            "A deep basement with open exterior floor drains",
            "A rooftop patio with wide air circulation",
            "A garage next to parked vehicles"
        ]
    },
    "11": {
        "question": "How long does a full, closed freezer maintain safe cold temperatures during a blackout?",
        "correct": "48 hours (if kept tightly closed)",
        "distractors": [
            "4 hours maximum",
            "7 full days without power",
            "12 hours before thawing begins"
        ]
    },
    "12": {
        "question": "What depth of moving flood water is capable of sweeping away light passenger vehicles?",
        "correct": "12 inches of rapidly moving water",
        "distractors": [
            "4 feet of water",
            "6 feet of water",
            "2 inches of water"
        ]
    },
    "13": {
        "question": "How do you prevent rapid conductive heat loss when stranded on frozen ground or concrete?",
        "correct": "Place cardboard, car floor mats, or spare tires between body and ground",
        "distractors": [
            "Lie completely flat directly on the bare concrete",
            "Dig into the damp frozen mud with bare hands",
            "Submerge feet in cold standing water"
        ]
    },
    "14": {
        "question": "Where should cold packs or soaked towels be placed to rapidly cool life-threatening heat stroke?",
        "correct": "Armpits, groin, and neck base (high-blood-flow nodes)",
        "distractors": [
            "On top of hair and fingernails",
            "Under the soles of running shoes",
            "Around the wrists and ankles only"
        ]
    },
    "15": {
        "question": "In a building without a basement, where is the safest refuge during a violent tornado?",
        "correct": "Center-most room (bathroom/closet) on lowest floor under a mattress",
        "distractors": [
            "Next to large exterior glass sliding doors",
            "On the top floor balcony for visibility",
            "In an open garage under the steel door"
        ]
    },
    "16": {
        "question": "What is the recommended emergency action during sudden severe earthquake tremors?",
        "correct": "Drop, Cover, and Hold On under a sturdy desk or table",
        "distractors": [
            "Sprint outside immediately into the street",
            "Stand in an exterior doorway with glass windows",
            "Climb onto the roof of the building"
        ]
    },
    "17": {
        "question": "Why should you send SMS text messages rather than voice calls during regional disasters?",
        "correct": "SMS packets consume minimal bandwidth and queue through clogged towers",
        "distractors": [
            "Voice calls automatically cancel cellular contracts",
            "SMS texts are immune to atmospheric electromagnetic waves",
            "Towers shut down text message antennas first"
        ]
    },
    "18": {
        "question": "Can an emergency 911 call be made from a mobile phone with no SIM card or zero signal bars for your carrier?",
        "correct": "Yes, phones legally roam onto any available cellular carrier tower for 911",
        "distractors": [
            "No, 911 requires an active paid subscription plan",
            "No, SIM cards must be active to connect to any tower",
            "Only if within 50 feet of a police station"
        ]
    },
    "19": {
        "question": "What is the primary protocol if evacuation is impossible during an active interior threat?",
        "correct": "Barricade doors, silence phones, turn off lights, and prepare ambush counter-strikes",
        "distractors": [
            "Shout continuously down hallways to attract security",
            "Turn on all lights and unlock doors to show cooperation",
            "Stand by open windows taking photos"
        ]
    },
    "20": {
        "question": "In the Northern Hemisphere, how do you find South using an analog watch and the sun?",
        "correct": "Point hour hand at sun; halfway between hour hand and 12 o'clock is South",
        "distractors": [
            "Point 12 at sun; the 6 o'clock marker is always South",
            "Point minute hand at sun; hour hand points due North",
            "Spin watch counter-clockwise until date window aligns"
        ]
    },
    "21": {
        "question": "How far away can a mirror reflection flash be detected by search aircraft on clear days?",
        "correct": "Up to 20 miles away",
        "distractors": [
            "Only 500 feet",
            "Over 250 miles",
            "50 yards maximum"
        ]
    },
    "22": {
        "question": "Why is running combustion engines or generators indoors immediately life-threatening?",
        "correct": "Colorless, odorless CO binds to hemoglobin 200x faster than oxygen",
        "distractors": [
            "Engines instantly deplete all room nitrogen",
            "Exhaust fumes generate combustible hydrogen explosions",
            "It turns atmospheric oxygen into radioactive ozone"
        ]
    },
    "23": {
        "question": "What is the timing cadence for 4-4-4-4 box breathing to regain autonomic nervous control?",
        "correct": "Inhale 4s, hold 4s, exhale 4s, hold empty 4s",
        "distractors": [
            "Inhale 10s, exhale 1s, repeat 4 times",
            "Hyperventilate rapidly for 44 seconds",
            "Hold breath for 4 minutes continuously"
        ]
    },
    "24": {
        "question": "How should solid human waste be managed in prolonged grid-down emergencies to prevent cholera?",
        "correct": "Isolate in heavy-bag lined 5-gallon buckets covered with sawdust/ash",
        "distractors": [
            "Dump directly into local stormwater street gutters",
            "Wash into standing water puddles near camp",
            "Bury shallowly inside sleeping shelters"
        ]
    },
    "25": {
        "question": "What thickness of solid poured concrete is needed to halve penetrating gamma radiation?",
        "correct": "12 inches of concrete (half-value layer)",
        "distractors": [
            "1 inch of concrete",
            "6 feet of concrete",
            "1/4 inch of concrete"
        ]
    },
    "26": {
        "question": "According to the 7-10 rule of nuclear radiation decay, what happens to dose rates after 7 hours?",
        "correct": "Dose rates decay by 90% (dropping to 1/10th of initial rate)",
        "distractors": [
            "Radiation levels double every 7 hours",
            "Radiation completely vanishes in 7 hours",
            "Dose rate increases tenfold"
        ]
    },
    "27": {
        "question": "What immediate action eliminates approximately 90% of external radioactive fallout contamination?",
        "correct": "Removing outer clothing garments and footwear gently",
        "distractors": [
            "Scrubbing skin with abrasive wire brushes",
            "Spraying hair with alcohol and petroleum jelly",
            "Burning clothes while wearing them"
        ]
    },
    "28": {
        "question": "Why is crushed hardwood charcoal included in an emergency sand water filter?",
        "correct": "To chemically adsorb toxins, radioactive fallout particulates, and volatile organics",
        "distractors": [
            "To heat the water to boiling automatically",
            "To add carbonation for improved shelf life",
            "To tint the water black for UV blocking"
        ]
    },
    "29": {
        "question": "How does an improvised solar condensation still collect potable drinking water?",
        "correct": "Solar heat evaporates ground moisture, condensing droplets onto angled plastic into a jar",
        "distractors": [
            "By capturing electromagnetic rainwater charges",
            "By filtering underground root sap through gravel",
            "By condensing ambient smog through dry cloth"
        ]
    },
    "30": {
        "question": "How do you protect critical survival two-way radios and solar electronics from high-altitude EMP?",
        "correct": "Store inside nested galvanized steel cans lined with non-conductive cardboard",
        "distractors": [
            "Wrap tightly in plastic grocery bags and submerge in water",
            "Leave connected to main building wall outlets",
            "Place on top of metal roof antennas"
        ]
    },
    "31": {
        "question": "What is the primary medical purpose of taking Potassium Iodide (KI) during nuclear fallout?",
        "correct": "Floods the thyroid gland with stable iodine to block radioactive Iodine-131",
        "distractors": [
            "Cures full-body radiation sickness immediately",
            "Protects skin from thermal burns and ultraviolet rays",
            "Neutralizes radioactive cesium in the bloodstream"
        ]
    },
    "32": {
        "question": "In the Universal Edibility Test for unknown wild forage, what is done after a 15-minute lip test?",
        "correct": "Place a small piece on the tongue tip for 15 minutes without chewing",
        "distractors": [
            "Boil and swallow 2 cups of the plant immediately",
            "Feed the entire plant to small animals",
            "Rub the plant into an open wound"
        ]
    },
    "33": {
        "question": "What is the safe procedure for recovering fuel from derelict vehicles post-collapse?",
        "correct": "Use an anti-static jiggler brass-ball siphon hose and fuel stabilizer",
        "distractors": [
            "Suck hard on an open garden hose with mouth",
            "Puncture the gas tank with a steel road flare",
            "Mix gasoline with river water 50/50 before use"
        ]
    },
    "34": {
        "question": "How can a dead sulfated 12V lead-acid car battery be reconditioned for off-grid power?",
        "correct": "Flush cells with distilled water saturated with Epsom salt (magnesium sulfate)",
        "distractors": [
            "Fill battery cells with household bleach and vinegar",
            "Connect directly to high-voltage AC wall power",
            "Submerge the entire battery in gasoline"
        ]
    },
    "35": {
        "question": "What is the universal international cadence for visual or auditory SOS distress signaling?",
        "correct": "3 short, 3 long, 3 short bursts (· · · — — — · · ·), pause 1 min, repeat",
        "distractors": [
            "Continuous rapid flashing without any pause",
            "1 long pulse followed by 5 quick clicks",
            "4 rapid flashes every 10 seconds"
        ]
    },
    "36": {
        "question": "How do you prevent debilitating trench foot during prolonged damp cold survival conditions?",
        "correct": "Dry feet completely each day, apply antiseptic powder, and rotate dry wool socks",
        "distractors": [
            "Keep wet boots on continuously for 7 days to preserve heat",
            "Submerge feet in freezing stream water before sleeping",
            "Coat feet with engine motor oil"
        ]
    },
    "37": {
        "question": "How should an open sucking chest wound be sealed in emergency tactical field care?",
        "correct": "Tape an airtight plastic sheet on 3 sides to create a one-way flutter valve",
        "distractors": [
            "Tape all 4 sides completely airtight with duct tape",
            "Pack open soil directly into the pleural cavity",
            "Leave wide open to ambient air without dressing"
        ]
    },
    "38": {
        "question": "What is the primary rule when splinting a suspected closed limb fracture?",
        "correct": "Immobilize the joint above and the joint below the injury site",
        "distractors": [
            "Bend the broken limb 90 degrees against the joint",
            "Splint only the exact center break without touching joints",
            "Apply heat pads directly over open broken skin"
        ]
    },
    "39": {
        "question": "Why must prolonged crush injury victims be pre-hydrated before lifting heavy rubble?",
        "correct": "To prevent sudden fatal release of myoglobin and potassium toxins into heart",
        "distractors": [
            "To prevent the debris from catching on fire",
            "Because muscles immediately turn to bone upon release",
            "To increase victim blood pressure to maximum levels"
        ]
    },
    "40": {
        "question": "How should extensive second and third-degree burns be dressed in emergency triage?",
        "correct": "Cover with clean, dry sterile sheets or non-adherent dressings without oils",
        "distractors": [
            "Apply thick butter, mayonnaise, and lard",
            "Pack with coarse river ice cubes directly on dermis",
            "Pop all burn blisters with a sewing needle"
        ]
    },
    "41": {
        "question": "What is the critical field management protocol for a venomous pit viper snakebite?",
        "correct": "Keep victim calm and immobilize the limb below heart level without tourniquets",
        "distractors": [
            "Cut an X over the fang punctures and suck venom with mouth",
            "Apply a freezing ice bath and tight arterial tourniquet",
            "Have victim run 2 miles to sweat out the venom"
        ]
    },
    "42": {
        "question": "Where is an epinephrine auto-injector administered during life-threatening anaphylaxis?",
        "correct": "Anterolateral mid-outer thigh, held firmly for 3 seconds",
        "distractors": [
            "Directly into the center of the abdominal navel",
            "Under the tongue vein with light pressure",
            "Into the deltoid shoulder muscle only"
        ]
    },
    "43": {
        "question": "How long must eyes be flushed following corrosive acid or alkali chemical splash?",
        "correct": "15–20 continuous minutes of running clean water or saline",
        "distractors": [
            "30 seconds of gentle blinking",
            "2 minutes followed by rubbing with dry towels",
            "Apply vinegar directly into eyes to neutralize alkali"
        ]
    },
    "44": {
        "question": "What is the standard formula for emergency Oral Rehydration Salts (ORS) per liter of water?",
        "correct": "6 level teaspoons sugar and 1/2 level teaspoon salt",
        "distractors": [
            "5 tablespoons salt and no sugar",
            "1 cup sugar and 3 tablespoons baking soda",
            "Equal parts bleach, salt, and vinegar"
        ]
    },
    "45": {
        "question": "What natural essential oil contains eugenol to numb severe toothache nerve pain off-grid?",
        "correct": "Oil of cloves applied on a small sterile cotton pellet",
        "distractors": [
            "Pure lemon juice applied directly into cavity",
            "Kerosene fuel swished for 5 minutes",
            "Crushed raw garlic mixed with battery acid"
        ]
    },
    "46": {
        "question": "Why are sterile adhesive butterfly closures preferred over amateur field suturing?",
        "correct": "Suturing without sterile surgical conditions traps lethal anaerobic bacteria",
        "distractors": [
            "Butterfly strips melt into human skin permanently",
            "Sutures cannot hold human skin together",
            "Adhesive strips require electrical power to activate"
        ]
    },
    "47": {
        "question": "How does the SODIS method purify clear water in transparent PET plastic bottles?",
        "correct": "Solar UV-A radiation and thermal heating inactivate pathogens over 6+ hours",
        "distractors": [
            "Plastic chemicals dissolve into water to kill bacteria",
            "Sunlight removes heavy metals and lead automatically",
            "Infrared radiation boils water inside the bottle in 2 minutes"
        ]
    },
    "48": {
        "question": "How do transpiration bags collect drinkable water from living tree foliage?",
        "correct": "Sealed plastic around sunlit leafy branches captures evaporated plant moisture",
        "distractors": [
            "By puncturing the bark to drain raw sap into the bag",
            "By capturing subterranean groundwater through the tree trunk",
            "By attracting morning fog through electrostatic static"
        ]
    },
    "49": {
        "question": "Why must the first flush of rainwater collection off roofs be diverted away from cisterns?",
        "correct": "To wash away accumulated bird feces, soot, heavy dust, and roofing grit",
        "distractors": [
            "Because the first rain drops carry zero liquid water",
            "To prevent rainwater from dissolving the storage tank walls",
            "First rain is always radioactive regardless of fallout"
        ]
    },
    "50": {
        "question": "What key advantage do chlorine dioxide purification tablets have over standard iodine?",
        "correct": "Chlorine dioxide kills Cryptosporidium oocysts and does not taint water taste",
        "distractors": [
            "Chlorine dioxide turns water into sweet fruit juice",
            "Iodine dissolves metal canteens within 10 minutes",
            "Chlorine dioxide requires zero contact time"
        ]
    },
    "51": {
        "question": "How can freeze-thaw separation produce potable water from raw ocean seawater?",
        "correct": "Freezing forces salt brine downward; melting the rinsed top ice yields fresh water",
        "distractors": [
            "Frozen seawater turns completely into table salt",
            "Boiling frozen seawater removes 100% of salt instantly",
            "Freezing destroys all sodium ions permanently"
        ]
    },
    "52": {
        "question": "What chemical coagulant clumps suspended mud and clay particles out of turbid river water?",
        "correct": "Potassium alum (aluminum sulfate) flocculation",
        "distractors": [
            "Granulated white table sugar",
            "Motor oil added to the surface",
            "Crushed limestone rock placed in sunlight"
        ]
    },
    "53": {
        "question": "How does a seep well dug 10 feet back from a riverbank improve water quality?",
        "correct": "River water filters naturally through sand and soil layers, removing silt",
        "distractors": [
            "It turns river water into distilled bottled mineral water",
            "It heats the water to boiling underground",
            "It eliminates the need for any chemical disinfection"
        ]
    },
    "54": {
        "question": "What clinical symptom within 1–2 hours indicates severe, life-threatening radiation dose (>4 Gray)?",
        "correct": "Rapid onset of severe vomiting, diarrhea, and cognitive confusion",
        "distractors": [
            "Mild fingernail discoloration after 3 weeks",
            "Slight dry cough after 10 days",
            "Temporary hiccups after 48 hours"
        ]
    },
    "55": {
        "question": "What emergency antidote is auto-injected upon organophosphate chemical nerve agent exposure?",
        "correct": "Atropine sulfate and 2-PAM chloride (Pralidoxime)",
        "distractors": [
            "High-dose oral vitamin C and zinc tablets",
            "Epinephrine and diphenhydramine syrup",
            "Potassium chloride intravenous injection"
        ]
    },
    "56": {
        "question": "Why must personnel evacuate to higher elevation and upwind during chlorine gas leaks?",
        "correct": "Chlorine gas is denser than air and settles into low ground, ditches, and basements",
        "distractors": [
            "Chlorine gas only exists at altitudes above 10,000 feet",
            "High elevation reverses chlorine gas into oxygen",
            "Chlorine gas attaches only to moving vehicles"
        ]
    },
    "57": {
        "question": "What household chemical solution neutralizes acidic chlorine gas in an improvised respirator?",
        "correct": "Dampening outer filter cloth with baking soda (sodium bicarbonate) solution",
        "distractors": [
            "Soaking filter cloth in concentrated muriatic acid",
            "Spraying cloth with petroleum kerosene",
            "Wetting cloth with rubbing alcohol and vinegar"
        ]
    },
    "58": {
        "question": "How is an emergency quarantine room maintained to prevent airborne biological pathogen escape?",
        "correct": "Double-layer plastic airlocks, dedicated ventilation, and 10% bleach footbaths",
        "distractors": [
            "Opening all windows to blow pathogens into the hallway",
            "Using household ceiling fans to disperse air through the house",
            "Spraying perfume in the airlock every 10 minutes"
        ]
    },
    "59": {
        "question": "What cumulative radiation exposure limit is considered the maximum emergency civilian threshold?",
        "correct": "Strictly below 25 Roentgens (0.25 Sv) to avoid acute sickness",
        "distractors": [
            "500 Roentgens per hour",
            "Zero tolerance beyond 0.0001 Roentgen",
            "1,000 Roentgens per week"
        ]
    },
    "60": {
        "question": "How do you protect skin from severe contact burns caused by residual radioactive beta particles?",
        "correct": "Wear thick boots, heavy gloves, wrap duct tape around trouser cuffs and wrists, and discard outer ponchos prior to entering bunker doors",
        "distractors": [
            "Walk barefoot to avoid trapping radioactive dust in socks",
            "Apply sun tanning lotion across all exposed skin",
            "Wear thin nylon mesh clothing in fallout zones"
        ]
    },
    "61": {
        "question": "What is the proper angle and strike technique when using a ferrocerium spark rod?",
        "correct": "Scrape carbon steel spine at 45° firmly into prepared tinder from 1 inch away",
        "distractors": [
            "Tap the ferro rod gently with a glass bottle",
            "Rub the ferro rod against damp moss",
            "Hold rod 3 feet above tinder and strike backward"
        ]
    },
    "62": {
        "question": "In bow drill friction fire starting, what indicates a live glowing ember has formed?",
        "correct": "Dark wood dust fills the notch and continues smoking independently without spinning",
        "distractors": [
            "The spindle turns completely white and cold",
            "Green sparks shoot out of the top handhold",
            "Water begins condensing on the hearth board"
        ]
    },
    "63": {
        "question": "What chimney effect allows a Swedish log stove to burn self-feeding for hours?",
        "correct": "Vertical perpendicular cuts draw air into the center, burning from the inside out",
        "distractors": [
            "Soaking the entire log in gasoline before lighting",
            "Burying the log under 2 feet of wet dirt",
            "Lighting the log strictly from the bottom bark"
        ]
    },
    "64": {
        "question": "What material is used inside an airtight vented tin to manufacture high-spark char cloth?",
        "correct": "100% natural unbleached cotton or linen fabric squares",
        "distractors": [
            "Synthetic polyester and nylon rope scraps",
            "Aluminum foil and copper wire strips",
            "Wet green pine tree needles"
        ]
    },
    "65": {
        "question": "What common liquid triggers spontaneous exothermic fire when mixed with potassium permanganate?",
        "correct": "Pure glycerin (glycerol) or standard automotive antifreeze",
        "distractors": [
            "Plain distilled drinking water",
            "Liquid laundry detergent",
            "Household white vinegar"
        ]
    },
    "66": {
        "question": "Why must hypothermia rewarming focus on the body trunk before warming cold arms and legs?",
        "correct": "Warming limbs first flushes cold acidic blood to the heart, causing cardiac arrest",
        "distractors": [
            "Because limbs cannot absorb thermal heat",
            "Trunk rewarming turns fat into instant glucose",
            "Warming arms first causes lungs to hyperventilate"
        ]
    },
    "67": {
        "question": "Why is an elevated sleeping shelf constructed inside a snow quinzhee or snow cave shelter?",
        "correct": "Dense cold air sinks to the lower entrance trench while warm air pools on the shelf",
        "distractors": [
            "To keep sleeping gear away from subterranean animals",
            "Because snow burns if touched by human bodies",
            "To prevent the roof from touching the sky"
        ]
    },
    "68": {
        "question": "Why must vehicle tailpipes be cleared continuously when running car heaters in blizzard snowbanks?",
        "correct": "Snow buildup forces lethal carbon monoxide into the passenger cabin within minutes",
        "distractors": [
            "To prevent the car radio antenna from freezing",
            "Because snow melts into gasoline in the exhaust",
            "To keep the muffler shiny for visual signaling"
        ]
    },
    "69": {
        "question": "How should water intake and activity be managed in high-temperature desert survival?",
        "correct": "Keep clothing on, breathe through nose, and travel exclusively at night",
        "distractors": [
            "Strip naked and run during peak midday sun",
            "Gargle ocean water and drink all urine immediately",
            "Eat heavy dry beef jerky without drinking water"
        ]
    },
    "70": {
        "question": "Why are MPPT solar charge controllers superior to PWM controllers in cold off-grid setups?",
        "correct": "MPPT converts excess panel voltage into higher charging amperage up to 30% more",
        "distractors": [
            "PWM controllers destroy solar panels in sunlight",
            "MPPT controllers generate solar electricity without sunlight",
            "PWM controllers can only charge alkaline AAA batteries"
        ]
    },
    "71": {
        "question": "What catastrophic damage occurs if Lithium Iron Phosphate (LiFePO4) batteries are charged below 32°F (0°C)?",
        "correct": "Permanent metallic lithium dendrite plating causes internal short-circuits",
        "distractors": [
            "The battery casing expands into steam instantly",
            "The battery voltage permanently drops to zero volts",
            "The battery turns into lead-acid chemistry"
        ]
    },
    "72": {
        "question": "What is the function of a series Schottky blocking diode in a DIY solar charging circuit?",
        "correct": "Prevents battery current from discharging backward through dark solar panels at night",
        "distractors": [
            "Increases solar panel voltage by tenfold",
            "Converts direct current (DC) into alternating current (AC)",
            "Filters ultraviolet rays into radio frequencies"
        ]
    },
    "73": {
        "question": "What motor component can be repurposed with wind turbine blades to generate off-grid 12V DC?",
        "correct": "A permanent-magnet motorcycle alternator or brushless DC treadmill motor",
        "distractors": [
            "A standard household microwave AC induction motor",
            "A single-phase refrigerator compressor pump",
            "A computer cooling fan without magnets"
        ]
    },
    "74": {
        "question": "What flammable gas mixture is produced by oxygen-starved wood biomass gasification?",
        "correct": "Wood gas consisting primarily of carbon monoxide (CO) and hydrogen (H2)",
        "distractors": [
            "Pure liquid diesel fuel and kerosene",
            "Liquid nitrogen and compressed helium",
            "High-pressure acetylene and chlorine gas"
        ]
    },
    "75": {
        "question": "How does an emergency inverted terracotta pot candle heater distribute thermal energy?",
        "correct": "Traps rising candle heat and radiates gentle convective thermal warmth across clay walls",
        "distractors": [
            "Converts clay minerals into nuclear fusion energy",
            "Generates 5,000 BTU electrical induction waves",
            "Creates oxygen gas from candle wick soot"
        ]
    },
    "76": {
        "question": "What biological contamination degrades stored diesel fuel over 12–24 months?",
        "correct": "Anaerobic microbial bacterial and fungal algae slime forming sludge",
        "distractors": [
            "Diesel turns into solid lead metal",
            "Diesel evaporates into pure nitrogen gas",
            "Ethanol separation creates combustible ethanol crystals"
        ]
    },
    "77": {
        "question": "How do you locate Polaris (the North Star) using the Big Dipper constellation?",
        "correct": "Sight through the two pointer stars of the bowl and extend the line 5x their distance",
        "distractors": [
            "Look for the brightest star in the handle of the Dipper",
            "Follow the curve of the handle backward 10 times",
            "Polaris is the center star of the Orion belt"
        ]
    },
    "78": {
        "question": "How is True South located in the Southern Hemisphere using the Southern Cross constellation?",
        "correct": "Extend the long axis 4.5 times its length and drop vertically to the horizon",
        "distractors": [
            "Point directly at the center star of the Cross",
            "Follow the pointer stars due East 180 degrees",
            "The Southern Cross points directly to Polaris"
        ]
    },
    "79": {
        "question": "In the shadow-tip stick method, what cardinal direction does the line from mark 1 to mark 2 indicate?",
        "correct": "First shadow mark is West; second shadow mark is East (line runs West-to-East)",
        "distractors": [
            "First mark is North; second mark is South",
            "The line points directly at the North Star",
            "The shadow line points South-to-North at all times"
        ]
    },
    "80": {
        "question": "What map error occurs if magnetic declination is ignored when following a compass bearing?",
        "correct": "The magnetic-to-grid offset compounds over distance, causing miles of navigational drift",
        "distractors": [
            "The map instantly loses all printed elevation contours",
            "The compass needle demagnetizes and spins freely",
            "The GPS satellites lose signal connectivity"
        ]
    },
    "81": {
        "question": "How do ranger pace-counting beads assist dead-reckoning navigation on foot?",
        "correct": "Tracks elapsed 100-meter and 1-kilometer intervals based on calibrated double-paces",
        "distractors": [
            "Measures atmospheric barometric pressure changes",
            "Generates acoustic sound pulses to repel wild predators",
            "Points magnetic north using weighted lead beads"
        ]
    },
    "82": {
        "question": "What does an 'X' visual ground symbol communicate to overhead search and rescue aircraft?",
        "correct": "'Require Medical Assistance' (critical emergency triage)",
        "distractors": [
            "'All is well, do not land'",
            "'Landing site is contaminated with fuel'",
            "'Require fuel and vehicle parts only'"
        ]
    },
    "83": {
        "question": "What is the international emergency whistle signal cadence for search and rescue?",
        "correct": "3 loud blasts of 3 seconds each, pause 1 minute, repeat",
        "distractors": [
            "1 long continuous blast lasting 10 minutes",
            "5 rapid chirps every 5 seconds",
            "2 short clicks followed by silence"
        ]
    },
    "84": {
        "question": "When should emergency pyrotechnic signal flares or orange smoke canisters be deployed?",
        "correct": "Only when search aircraft or rescue boats are confirmed in visual/auditory line of sight",
        "distractors": [
            "Continuously inside closed survival shelters overnight",
            "Immediately upon getting lost in heavy fog with no one around",
            "Under dense tree canopies where smoke is trapped"
        ]
    },
    "85": {
        "question": "What severe weather event is indicated by a towering cumulus cloud flattening into a fibrous anvil top?",
        "correct": "Severe thunderstorm with violent lightning, microburst winds, and flash flooding",
        "distractors": [
            "Clear skies and dry calm weather for 48 hours",
            "Sub-zero blizzard conditions in desert terrain",
            "Immediate hurricane eye landfall"
        ]
    },
    "86": {
        "question": "What weather change is heralded by a barometric pressure drop >3 millibars in 3 hours?",
        "correct": "An approaching severe squall line, frontal storm, or gale-force cyclone",
        "distractors": [
            "Prolonged heat wave with zero precipitation",
            "Instant dissipated cloud cover and rising sunshine",
            "A drop in relative humidity to desert levels"
        ]
    },
    "87": {
        "question": "How should an interior doorway be reinforced against forced entry using lumber?",
        "correct": "Drop a heavy hardwood 2x4 crossbar into steel brackets anchored 3 inches into wall studs",
        "distractors": [
            "Tape cardboard over the door handle with duct tape",
            "Place a single plastic chair against the inward swing",
            "Remove the door from hinges and lean it outward"
        ]
    },
    "88": {
        "question": "What height and material should be used for perimeter acoustic intrusion tripwires?",
        "correct": "10-lb monofilament fishing line set 6 inches high connected to gravel-filled rattle cans",
        "distractors": [
            "Heavy 2-inch steel cable stretched 5 feet above ground",
            "Bright yellow caution tape tied to tree trunks",
            "Electrical live copper wire connected to wall outlets"
        ]
    },
    "89": {
        "question": "Why is low-lumen red light used during tactical blackout night operations?",
        "correct": "Preserves human rhodopsin night vision and reduces long-range detection distance",
        "distractors": [
            "Red light is completely invisible to human eyes",
            "Red light illuminates through solid concrete walls",
            "Red light recharges flashlight batteries while in use"
        ]
    },
    "90": {
        "question": "How can the range of a handheld VHF 2-meter (144 MHz) survival radio be dramatically increased?",
        "correct": "Gain elevation on ridge crests or hoist antennas on a 20-foot mast (line-of-sight propagation)",
        "distractors": [
            "Bury the radio 3 feet underground inside a tin can",
            "Submerge the antenna in salt water while transmitting",
            "Wrap the antenna tightly in aluminum foil"
        ]
    },
    "91": {
        "question": "What FRS/GMRS channel frequency is widely monitored as an emergency calling channel?",
        "correct": "Channel 1 (462.5625 MHz) / Channel 20 (462.6750 MHz)",
        "distractors": [
            "Channel 8 restricted to 0.5 mW audio only",
            "Channel 99 on high-band radar frequencies",
            "AM radio broadcast frequency 540 kHz"
        ]
    },
    "92": {
        "question": "Why is urine separated from solid feces in an off-grid two-bucket bio-latrine?",
        "correct": "Keeps feces dry to prevent anaerobic pathogen odor and fly-borne disease vectors",
        "distractors": [
            "Because mixing urine and feces causes spontaneous ignition",
            "Urine must be boiled to make gunpowder saltpeter daily",
            "Solid feces dissolves plastic buckets within 24 hours"
        ]
    },
    "93": {
        "question": "What critical survival nutrient is obtained by steeping fresh white pine or spruce needles?",
        "correct": "High concentrations of Vitamin C to prevent debilitating scurvy",
        "distractors": [
            "Complete animal protein and essential amino acids",
            "High-calorie carbohydrates and digestible fats",
            "Sodium chloride and synthetic potassium tablets"
        ]
    },
    "94": {
        "question": "Why must wild oak acorns undergo multiple hot water leachings before consumption?",
        "correct": "To wash out toxic, bitter tannic acid that causes severe gastrointestinal and kidney damage",
        "distractors": [
            "To remove dangerous cyanide gas from the shell",
            "Because raw acorns contain live insect larvae venom",
            "To convert acorn starch into table sugar"
        ]
    },
    "95": {
        "question": "How can broadleaf plantain leaves be used in wilderness medical emergencies?",
        "correct": "Crushed as a soothing antimicrobial poultice over insect stings, bites, and minor cuts",
        "distractors": [
            "Boiled into an anesthetic that causes total unconsciousness",
            "Chewed to replace commercial arterial tourniquets",
            "Burned to create poison gas that repels animals"
        ]
    },
    "96": {
        "question": "What two ingredients are combined 1:1 by weight to make shelf-stable survival pemmican?",
        "correct": "Pulverized lean dehydrated meat and rendered tallow (purified animal fat)",
        "distractors": [
            "Raw ground beef and fresh cow's milk",
            "Cooked bacon grease and refined white sugar",
            "Crushed bone marrow and raw wild berries only"
        ]
    },
    "97": {
        "question": "What salt concentration brine is used for safe vegetable lacto-fermentation preservation?",
        "correct": "2.5% to 3% salt-to-water ratio (approx. 2 tbsp kosher salt per quart of water)",
        "distractors": [
            "50% pure salt slurry that crystallizes immediately",
            "0.1% freshwater with 3 cups vinegar",
            "Equal parts motor oil, water, and baking soda"
        ]
    },
    "98": {
        "question": "What thickness should produce slices be cut to ensure rapid, mold-free solar dehydration?",
        "correct": "Uniform 1/4-inch (approx. 6mm) thin slices",
        "distractors": [
            "Whole unpeeled fruits 3–4 inches thick",
            "Paper-thin dust shavings under 0.01mm",
            "Cut into 2-inch cubes left in the shade"
        ]
    },
    "99": {
        "question": "Why must resinous softwoods (pine, cedar, fir) never be used to smoke preserved meat?",
        "correct": "Their heavy toxic creosote and resins deposit bitter, harmful carcinogens on meat",
        "distractors": [
            "Pine wood smoke cannot reach temperatures above 30°F",
            "Softwood smoke turns meat into combustible gasoline",
            "Cedar smoke attracts swarms of hornets to meat racks"
        ]
    },
    "100": {
        "question": "How are root vegetables (carrots, beets, potatoes) stored for 6+ months in a root cellar?",
        "correct": "Buried unwashed in single layers inside boxes of barely damp sand at 35°F–40°F",
        "distractors": [
            "Boiled for 10 minutes and left in open warm sunlight",
            "Submerged completely in pure chlorine bleach water",
            "Wrapped in wet electric blankets inside cardboard boxes"
        ]
    }
};

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

// Category Detector for Emergency Directives (Comprehensive Direct Mapping)
const getCategoryForDirective = (item) => {
    const headline = ((item && item.headline) || '').toUpperCase();
    const text = (headline + ' ' + ((item && item.content) || '') + ' ' + ((item && item.question) || '')).toUpperCase();

    // 1. Direct Headline Tag Matching
    if (headline.includes('[COLD]')) return 'COLD';
    if (headline.includes('[HEAT]')) return 'HEAT';
    if (headline.includes('[WEATHER]') || headline.includes('[EARTHQUAKE]')) return 'WEATHER';
    if (headline.includes('[FLOOD]')) return 'FLOOD';
    if (headline.includes('[SECURITY]') || headline.includes('[THREAT]')) return 'SECURITY';
    if (headline.includes('[WATER]')) return 'WATER';
    if (headline.includes('[FALLOUT]') || headline.includes('[RADIATION]')) return 'RADIATION';
    if (headline.includes('[HAZMAT]') || headline.includes('[CBRN]') || headline.includes('[AIRWAY]') || headline.includes('[CHOKING]')) return 'BIOHAZARD';
    if (headline.includes('[FIRE]')) return 'FIRE';
    if (headline.includes('[TRAUMA]') || headline.includes('[MED]') || headline.includes('[PANIC]')) return 'TRAUMA';
    if (headline.includes('[NAVIGATION]')) return 'NAVIGATION';
    if (headline.includes('[COMMS]') || headline.includes('[SIGNALING]') || headline.includes('[EMP]')) return 'COMMS';
    if (headline.includes('[FORAGING]') || headline.includes('[FOOD]')) return 'FORAGING';
    if (headline.includes('[ENERGY]') || headline.includes('[FUEL]') || headline.includes('[BLACKOUT]')) return 'POWER';
    if (headline.includes('[OFF-GRID]')) return 'SHELTER';

    // 2. Keyword Fallback Matching
    if (text.includes('COLD') || text.includes('FROST') || text.includes('FREEZ') || text.includes('BLIZZARD') || text.includes('SNOW') || text.includes('TRENCH FOOT') || text.includes('HYPOTHERMIA')) {
        return 'COLD';
    }
    if (text.includes('HEAT') || text.includes('DESERT') || text.includes('HOT WATER') || text.includes('SWEAT')) {
        return 'HEAT';
    }
    if (text.includes('TORNADO') || text.includes('EARTHQUAKE') || text.includes('STORM') || text.includes('BAROMETRIC') || text.includes('LIGHTNING') || text.includes('CUMULONIMBUS') || text.includes('WIND')) {
        return 'WEATHER';
    }
    if (text.includes('FLOOD') || text.includes('SUBMERG') || text.includes('RISING WATER')) {
        return 'FLOOD';
    }
    if (text.includes('SECURITY') || text.includes('BARRICADE') || text.includes('TRIPWIRE') || text.includes('INTRUSION') || text.includes('LIGHT DISCIPLINE') || text.includes('ATTACK')) {
        return 'SECURITY';
    }
    if (text.includes('TRAUMA') || text.includes('TOURNIQUET') || text.includes('BLEEDING') || text.includes('WOUND') || text.includes('BURN') || text.includes('FRACTURE') || text.includes('SPLINT') || text.includes('SEAL') || text.includes('TRIAGE') || text.includes('HEMOSTASIS') || text.includes('ANAPHYLAXIS') || text.includes('SNAKEBITE') || text.includes('CHEST WOUND') || text.includes('CRUSH')) {
        return 'TRAUMA';
    }
    if (text.includes('WATER') || text.includes('BOIL') || text.includes('BLEACH') || text.includes('DISTILL') || text.includes('SODIS') || text.includes('FILTER') || text.includes('RAINWATER') || text.includes('CHARCOAL') || text.includes('PURIFICATION') || text.includes('DESALIN')) {
        return 'WATER';
    }
    if (text.includes('RADIATION') || text.includes('FALLOUT') || text.includes('GAMMA') || text.includes('GEIGER') || text.includes('IODIDE') || text.includes('HALF-VALUE') || text.includes('DECAY') || text.includes('7-10') || text.includes('SHIELDING') || text.includes('DOSIMETER') || text.includes('BETA PARTICLE')) {
        return 'RADIATION';
    }
    if (text.includes('BIOHAZARD') || text.includes('AIRWAY') || text.includes('AIRLOCK') || text.includes('DECONTAMINATION') || text.includes('RESPIRATOR') || text.includes('GAS') || text.includes('MASK') || text.includes('CARBON MONOXIDE') || text.includes('CHEMICAL') || text.includes('CHOKING') || text.includes('NERVE AGENT') || text.includes('ATROPINE') || text.includes('CHLORINE')) {
        return 'BIOHAZARD';
    }
    if (text.includes('FIRE') || text.includes('DAKOTA') || text.includes('BOW DRILL') || text.includes('FLINT') || text.includes('CHAR CLOTH') || text.includes('FERRO') || text.includes('SMOKE') || text.includes('KINDLING') || text.includes('SWEDISH')) {
        return 'FIRE';
    }
    if (text.includes('NAV') || text.includes('POLARIS') || text.includes('COMPASS') || text.includes('SHADOW') || text.includes('AZIMUTH') || text.includes('STARS') || text.includes('WATCH') || text.includes('ORIENTATION') || text.includes('PACE COUNT') || text.includes('SOUTHERN CROSS') || text.includes('DECLINATION')) {
        return 'NAVIGATION';
    }
    if (text.includes('COMM') || text.includes('MORSE') || text.includes('RADIO') || text.includes('VHF') || text.includes('SIGNAL') || text.includes('MIRROR') || text.includes('FARADAY') || text.includes('EMP') || text.includes('ANTENNA') || text.includes('WHISTLE') || text.includes('SOS') || text.includes('FLARE') || text.includes('GMRS')) {
        return 'COMMS';
    }
    if (text.includes('FOOD') || text.includes('FORAG') || text.includes('SNARE') || text.includes('EDIBIL') || text.includes('PEMMICAN') || text.includes('JERKY') || text.includes('PLANT') || text.includes('TOXIN') || text.includes('CALORIE') || text.includes('NUTRITION') || text.includes('ACORN') || text.includes('FERMENTATION') || text.includes('DEHYDRAT') || text.includes('DANDELION')) {
        return 'FORAGING';
    }
    if (text.includes('SHELTER') || text.includes('BLAST') || text.includes('BUNKER') || text.includes('LATRINE') || text.includes('WASTE') || text.includes('OVERBURDEN')) {
        return 'SHELTER';
    }
    if (text.includes('POWER') || text.includes('BATTERY') || text.includes('ELECTRIC') || text.includes('SOLAR') || text.includes('VOLT') || text.includes('GENERATOR') || text.includes('FUEL') || text.includes('GASOLINE') || text.includes('DIESEL') || text.includes('MPPT') || text.includes('DIODE') || text.includes('GASIFICATION')) {
        return 'POWER';
    }

    return 'TACTICAL';
};

// Tactical CRT Vector Schematics Renderer
const renderSchematicSVG = (category, num = 1) => {
    switch (category) {
        case 'COLD':
            return (
                <svg viewBox="0 0 240 100" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Thermometer Outline */}
                    <rect x="30" y="16" width="16" height="52" rx="8" stroke="#33ff66" strokeWidth="2" fill="rgba(0,25,8,0.7)" />
                    <circle cx="38" cy="74" r="14" stroke="#33ff66" strokeWidth="2" fill="rgba(0,25,8,0.7)" />
                    {/* Sub-Zero Mercury Level */}
                    <rect x="34" y="44" width="8" height="24" fill="#66ff8f" />
                    <circle cx="38" cy="74" r="9" fill="#66ff8f" />
                    {/* Tick Marks */}
                    <line x1="49" y1="26" x2="55" y2="26" stroke="#33ff66" strokeWidth="1.5" />
                    <line x1="49" y1="36" x2="53" y2="36" stroke="rgba(51,255,102,0.6)" strokeWidth="1.2" />
                    <line x1="49" y1="46" x2="57" y2="46" stroke="#ff4455" strokeWidth="1.8" />
                    <line x1="49" y1="56" x2="53" y2="56" stroke="rgba(51,255,102,0.6)" strokeWidth="1.2" />
                    {/* Snowflake / Ice Crystal Vector */}
                    <g transform="translate(95, 50)" stroke="#66ff8f" strokeWidth="1.8">
                        <line x1="-22" y1="0" x2="22" y2="0" />
                        <line x1="0" y1="-22" x2="0" y2="22" />
                        <line x1="-15" y1="-15" x2="15" y2="15" />
                        <line x1="-15" y1="15" x2="15" y2="-15" />
                        <circle cx="0" cy="0" r="3" fill="#33ff66" />
                    </g>
                    {/* Telemetry Readouts */}
                    <text x="135" y="30" fill="#33ff66" fontSize="8.5" fontFamily="Share Tech Mono" fontWeight="bold">SUB-ZERO THERMAL</text>
                    <text x="135" y="44" fill="#8affaa" fontSize="7" fontFamily="Share Tech Mono">CORE REWARM PROTOCOL</text>
                    <text x="135" y="58" fill="#ff4455" fontSize="7.5" fontFamily="Share Tech Mono" fontWeight="bold">T &lt; 60°F IMMERSION</text>
                    <text x="135" y="72" fill="rgba(51,255,102,0.7)" fontSize="6.5" fontFamily="Share Tech Mono">CONDUCTIVE ISOLATION: OK</text>
                </svg>
            );
        case 'HEAT':
            return (
                <svg viewBox="0 0 240 100" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Radiating High-Temperature Sun */}
                    <g transform="translate(48, 50)">
                        <circle cx="0" cy="0" r="16" fill="rgba(255,180,0,0.25)" stroke="#ffcc00" strokeWidth="2" />
                        <line x1="0" y1="-26" x2="0" y2="-19" stroke="#ff4455" strokeWidth="2" />
                        <line x1="0" y1="19" x2="0" y2="26" stroke="#ff4455" strokeWidth="2" />
                        <line x1="-26" y1="0" x2="-19" y2="0" stroke="#ff4455" strokeWidth="2" />
                        <line x1="19" y1="0" x2="26" y2="0" stroke="#ff4455" strokeWidth="2" />
                        <line x1="-18" y1="-18" x2="-13" y2="-13" stroke="#ffcc00" strokeWidth="1.6" />
                        <line x1="13" y1="13" x2="18" y2="18" stroke="#ffcc00" strokeWidth="1.6" />
                        <line x1="-18" y1="18" x2="-13" y2="13" stroke="#ffcc00" strokeWidth="1.6" />
                        <line x1="13" y1="-13" x2="18" y2="-18" stroke="#ffcc00" strokeWidth="1.6" />
                    </g>
                    {/* Rapid Cooling Triad Nodes */}
                    <rect x="90" y="24" width="34" height="18" rx="2" stroke="#66ff8f" strokeWidth="1.5" fill="rgba(0,30,10,0.7)" />
                    <text x="94" y="36" fill="#33ff66" fontSize="7" fontFamily="Share Tech Mono" fontWeight="bold">GROIN</text>
                    <rect x="90" y="46" width="34" height="18" rx="2" stroke="#66ff8f" strokeWidth="1.5" fill="rgba(0,30,10,0.7)" />
                    <text x="94" y="58" fill="#33ff66" fontSize="7" fontFamily="Share Tech Mono" fontWeight="bold">AXILLA</text>
                    <rect x="90" y="68" width="34" height="18" rx="2" stroke="#66ff8f" strokeWidth="1.5" fill="rgba(0,30,10,0.7)" />
                    <text x="94" y="80" fill="#33ff66" fontSize="7" fontFamily="Share Tech Mono" fontWeight="bold">NECK</text>
                    {/* Readouts */}
                    <text x="135" y="32" fill="#ff4455" fontSize="8.5" fontFamily="Share Tech Mono" fontWeight="bold">HEAT STROKE ALERT</text>
                    <text x="135" y="46" fill="#ffcc00" fontSize="7" fontFamily="Share Tech Mono">CORE TEMP &gt; 104°F</text>
                    <text x="135" y="60" fill="#8affaa" fontSize="7" fontFamily="Share Tech Mono">RAPID COOLING PROTOCOL</text>
                    <text x="135" y="74" fill="rgba(51,255,102,0.7)" fontSize="6.5" fontFamily="Share Tech Mono">WATER CONSERVATION ACTIVE</text>
                </svg>
            );
        case 'WEATHER':
            return (
                <svg viewBox="0 0 240 100" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Anvil / Squall Cumulonimbus Cloud */}
                    <path d="M 18 36 L 85 36 C 88 28, 76 18, 62 20 C 56 14, 40 14, 34 22 C 22 20, 16 28, 18 36 Z" fill="rgba(51,255,102,0.2)" stroke="#33ff66" strokeWidth="1.8" />
                    <path d="M 24 36 L 40 70 L 65 70 L 78 36" fill="rgba(51,255,102,0.08)" stroke="rgba(51,255,102,0.4)" strokeDasharray="2 2" />
                    {/* Lightning Strike */}
                    <polygon points="52,42 42,60 48,60 38,78 60,55 52,55" fill="#ffff33" stroke="#ffcc00" strokeWidth="1" />
                    {/* Isobar Wave */}
                    <path d="M 95 35 Q 110 22, 125 35 T 155 35" stroke="#66ff8f" strokeWidth="1.5" strokeDasharray="3 2" />
                    <path d="M 95 55 Q 110 42, 125 55 T 155 55" stroke="#66ff8f" strokeWidth="1.5" strokeDasharray="3 2" />
                    {/* Telemetry */}
                    <text x="135" y="32" fill="#33ff66" fontSize="8.5" fontFamily="Share Tech Mono" fontWeight="bold">SEVERE ATMOSPHERIC</text>
                    <text x="135" y="46" fill="#ffcc00" fontSize="7" fontFamily="Share Tech Mono">ΔP &gt; 3 mbar / 3 HRS</text>
                    <text x="135" y="60" fill="#8affaa" fontSize="7" fontFamily="Share Tech Mono">TORNADO / SEISMIC REFUGE</text>
                    <text x="135" y="74" fill="rgba(51,255,102,0.7)" fontSize="6.5" fontFamily="Share Tech Mono">LOWEST FLOOR // MATTRESS</text>
                </svg>
            );
        case 'FLOOD':
            return (
                <svg viewBox="0 0 240 100" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Vehicle Submersion Profile */}
                    <path d="M 20 62 L 32 50 L 58 50 L 72 62 L 84 62 L 84 72 L 20 72 Z" fill="rgba(51,255,102,0.15)" stroke="#33ff66" strokeWidth="1.8" />
                    <circle cx="34" cy="72" r="6" stroke="#33ff66" strokeWidth="1.5" />
                    <circle cx="70" cy="72" r="6" stroke="#33ff66" strokeWidth="1.5" />
                    {/* Rapid Water Vector Lines */}
                    <path d="M 10 56 Q 30 52, 55 56 T 100 56 T 145 56" stroke="#66ff8f" strokeWidth="2" strokeDasharray="4 2" />
                    <path d="M 10 68 Q 30 64, 55 68 T 100 68 T 145 68" stroke="#33ff66" strokeWidth="1.8" />
                    <path d="M 10 80 Q 30 76, 55 80 T 100 80 T 145 80" stroke="rgba(51,255,102,0.6)" strokeWidth="1.5" />
                    {/* Depth Gauge */}
                    <line x1="100" y1="36" x2="100" y2="82" stroke="#ff4455" strokeWidth="2" />
                    <line x1="96" y1="56" x2="104" y2="56" stroke="#ff4455" strokeWidth="2" />
                    <text x="106" y="58" fill="#ff4455" fontSize="7" fontFamily="Share Tech Mono" fontWeight="bold">12 IN</text>
                    {/* Telemetry */}
                    <text x="135" y="32" fill="#33ff66" fontSize="8.5" fontFamily="Share Tech Mono" fontWeight="bold">RAPID WATER VECTOR</text>
                    <text x="135" y="46" fill="#ff4455" fontSize="7" fontFamily="Share Tech Mono">VEHICLE DISPLACEMENT: CRIT</text>
                    <text x="135" y="60" fill="#8affaa" fontSize="7" fontFamily="Share Tech Mono">WINDOW BREACH // ROOF EXIT</text>
                    <text x="135" y="74" fill="rgba(51,255,102,0.7)" fontSize="6.5" fontFamily="Share Tech Mono">EVACUATION LINE: ACTIVE</text>
                </svg>
            );
        case 'SECURITY':
            return (
                <svg viewBox="0 0 240 100" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Reinforced Entryway Door Barrier Profile */}
                    <rect x="25" y="16" width="46" height="70" stroke="#33ff66" strokeWidth="2" fill="rgba(0,30,10,0.8)" />
                    {/* Heavy 2x4 Timber Crossbar */}
                    <rect x="15" y="45" width="66" height="12" rx="2" fill="rgba(255,180,0,0.25)" stroke="#ffcc00" strokeWidth="2" />
                    {/* Steel Anchor Stud Brackets */}
                    <rect x="15" y="43" width="8" height="16" fill="#ff4455" stroke="#ff4455" />
                    <rect x="73" y="43" width="8" height="16" fill="#ff4455" stroke="#ff4455" />
                    {/* Perimeter Monofilament Tripwire Alarm Line */}
                    <line x1="95" y1="72" x2="140" y2="72" stroke="#66ff8f" strokeWidth="1.2" strokeDasharray="3 2" />
                    <rect x="125" y="60" width="10" height="14" rx="2" stroke="#33ff66" strokeWidth="1" fill="rgba(51,255,102,0.2)" />
                    {/* Telemetry */}
                    <text x="135" y="32" fill="#33ff66" fontSize="8.5" fontFamily="Share Tech Mono" fontWeight="bold">PERIMETER DEFENSE</text>
                    <text x="135" y="46" fill="#8affaa" fontSize="7" fontFamily="Share Tech Mono">CROSSBAR TIMBER LOCK</text>
                    <text x="135" y="60" fill="#ffcc00" fontSize="7" fontFamily="Share Tech Mono">TRIPWIRE ACOUSTIC CHOKE</text>
                    <text x="135" y="74" fill="#ff4455" fontSize="6.5" fontFamily="Share Tech Mono">RED-FILTER ILLUMINATION</text>
                </svg>
            );
        case 'TRAUMA':
            return (
                <svg viewBox="0 0 240 100" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
                    {/* Artery & Vessel Line */}
                    <path d="M 10 50 Q 30 35, 55 50 T 100 50 T 145 50 T 190 50 L 230 50" stroke="rgba(51,255,102,0.4)" strokeWidth="10" strokeLinecap="round" />
                    <path d="M 10 50 Q 30 35, 55 50 T 100 50 T 145 50 T 190 50 L 230 50" stroke="#33ff66" strokeWidth="2" strokeDasharray="3 3" />
                    {/* Occlusion Band */}
                    <rect x="110" y="20" width="20" height="60" rx="3" fill="rgba(255,51,68,0.25)" stroke="#ff4455" strokeWidth="2" />
                    {/* Windlass Rod */}
                    <line x1="100" y1="18" x2="140" y2="42" stroke="#33ff66" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="120" cy="30" r="4" fill="#33ff66" />
                    {/* Occlusion Arrows */}
                    <path d="M 120 8 L 120 18 M 116 14 L 120 18 L 124 14" stroke="#ff4455" strokeWidth="2" />
                    <path d="M 120 92 L 120 82 M 116 86 L 120 82 L 124 86" stroke="#ff4455" strokeWidth="2" />
                    {/* Pulse Waveform */}
                    <path d="M 15 24 L 35 24 L 40 12 L 45 36 L 50 16 L 55 24 L 75 24" stroke="#66ff8f" strokeWidth="1.8" fill="none" />
                    {/* Measurement Target */}
                    <circle cx="120" cy="50" r="28" stroke="rgba(51,255,102,0.3)" strokeWidth="1" strokeDasharray="2 2" />
                    <line x1="120" y1="36" x2="120" y2="64" stroke="rgba(51,255,102,0.4)" strokeWidth="1" />
                    <line x1="106" y1="50" x2="134" y2="50" stroke="rgba(51,255,102,0.4)" strokeWidth="1" />
                    {/* Telemetry Text */}
                    <text x="145" y="25" fill="#33ff66" fontSize="8" fontFamily="Share Tech Mono" fontWeight="bold">HEMOSTASIS LOCK</text>
                    <text x="145" y="36" fill="rgba(51,255,102,0.7)" fontSize="7" fontFamily="Share Tech Mono">ΔP &gt; 320 mmHg</text>
                    <text x="145" y="82" fill="#ff4455" fontSize="7.5" fontFamily="Share Tech Mono" fontWeight="bold">ARTERY OCCLUSION</text>
                </svg>
            );
        case 'WATER':
            return (
                <svg viewBox="0 0 240 100" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Filtration Cylinder */}
                    <rect x="25" y="14" width="70" height="74" rx="2" stroke="#33ff66" strokeWidth="1.8" fill="rgba(0,25,8,0.7)" />
                    {/* Strata 1: Gravel */}
                    <rect x="27" y="16" width="66" height="20" fill="rgba(51,255,102,0.15)" stroke="rgba(51,255,102,0.4)" strokeDasharray="2 2" />
                    <text x="32" y="29" fill="#8affaa" fontSize="7" fontFamily="Share Tech Mono">1. GRAVEL BED</text>
                    {/* Strata 2: Active Charcoal */}
                    <rect x="27" y="38" width="66" height="24" fill="rgba(51,255,102,0.3)" stroke="rgba(51,255,102,0.6)" />
                    <text x="32" y="52" fill="#33ff66" fontSize="7" fontFamily="Share Tech Mono" fontWeight="bold">2. CHARCOAL</text>
                    {/* Strata 3: Silica Sand */}
                    <rect x="27" y="64" width="66" height="22" fill="rgba(51,255,102,0.08)" stroke="rgba(51,255,102,0.4)" strokeDasharray="2 2" />
                    <text x="32" y="77" fill="#8affaa" fontSize="7" fontFamily="Share Tech Mono">3. FINE SAND</text>
                    {/* Flow Vector */}
                    <path d="M 60 4 L 60 12 M 57 9 L 60 12 L 63 9" stroke="#66ff8f" strokeWidth="2" />
                    <path d="M 60 90 L 60 98 M 57 95 L 60 98 L 63 95" stroke="#33ff66" strokeWidth="2" />
                    {/* Droplets & Ripples */}
                    <circle cx="140" cy="55" r="16" stroke="rgba(51,255,102,0.3)" strokeWidth="1.2" strokeDasharray="2 2" />
                    <circle cx="140" cy="55" r="28" stroke="rgba(51,255,102,0.15)" strokeWidth="1" strokeDasharray="3 3" />
                    <path d="M 140 38 C 135 48, 132 54, 132 60 A 8 8 0 0 0 148 60 C 148 54, 145 48, 140 38 Z" fill="rgba(51,255,102,0.3)" stroke="#33ff66" strokeWidth="1.5" />
                    {/* Solar SODIS UV Rays */}
                    <line x1="175" y1="20" x2="195" y2="35" stroke="#ffcc00" strokeWidth="1.5" strokeDasharray="3 2" />
                    <line x1="185" y1="15" x2="205" y2="30" stroke="#ffcc00" strokeWidth="1.5" strokeDasharray="3 2" />
                    <text x="175" y="48" fill="#33ff66" fontSize="8" fontFamily="Share Tech Mono" fontWeight="bold">PURITY: 99.9%</text>
                    <text x="175" y="60" fill="rgba(51,255,102,0.7)" fontSize="7" fontFamily="Share Tech Mono">BOIL: 100°C / 1M</text>
                    <text x="175" y="72" fill="#8affaa" fontSize="7" fontFamily="Share Tech Mono">SODIS UV 400nm</text>
                </svg>
            );
        case 'RADIATION':
            return (
                <svg viewBox="0 0 240 100" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Radiation Trefoil Icon */}
                    <g transform="translate(42, 50)">
                        <circle cx="0" cy="0" r="7" fill="#ff4455" />
                        <path d="M -16 -24 A 28 28 0 0 1 16 -24 L 7 -10 A 12 12 0 0 0 -7 -10 Z" fill="rgba(255,68,85,0.4)" stroke="#ff4455" strokeWidth="1.2" />
                        <path d="M 28 0 A 28 28 0 0 1 14 26 L 6 12 A 12 12 0 0 0 12 0 Z" fill="rgba(255,68,85,0.4)" stroke="#ff4455" strokeWidth="1.2" transform="rotate(30)" />
                        <path d="M 28 0 A 28 28 0 0 1 14 26 L 6 12 A 12 12 0 0 0 12 0 Z" fill="rgba(255,68,85,0.4)" stroke="#ff4455" strokeWidth="1.2" transform="rotate(150)" />
                    </g>
                    {/* Gamma Attenuation Shield Barrier */}
                    <rect x="95" y="16" width="16" height="68" fill="rgba(51,255,102,0.25)" stroke="#33ff66" strokeWidth="2" />
                    <rect x="115" y="16" width="22" height="68" fill="rgba(51,255,102,0.15)" stroke="rgba(51,255,102,0.6)" strokeWidth="1.5" />
                    <rect x="141" y="16" width="30" height="68" fill="rgba(51,255,102,0.08)" stroke="rgba(51,255,102,0.4)" strokeDasharray="3 2" />
                    {/* Gamma Incident Waves */}
                    <path d="M 20 28 Q 28 22, 36 28 T 52 28 T 68 28 T 84 28 T 95 28" stroke="#ff4455" strokeWidth="1.5" />
                    <path d="M 20 50 Q 28 44, 36 50 T 52 50 T 68 50 T 84 50 T 95 50" stroke="#ff4455" strokeWidth="1.5" />
                    <path d="M 20 72 Q 28 66, 36 72 T 52 72 T 68 72 T 84 72 T 95 72" stroke="#ff4455" strokeWidth="1.5" />
                    {/* Attenuated Waves */}
                    <path d="M 95 50 Q 115 48, 135 50 T 175 50" stroke="#33ff66" strokeWidth="1" strokeDasharray="2 2" />
                    {/* Telemetry Labels */}
                    <text x="96" y="92" fill="#33ff66" fontSize="6.5" fontFamily="Share Tech Mono">LEAD</text>
                    <text x="117" y="92" fill="#8affaa" fontSize="6.5" fontFamily="Share Tech Mono">CONC</text>
                    <text x="144" y="92" fill="rgba(51,255,102,0.7)" fontSize="6.5" fontFamily="Share Tech Mono">EARTH</text>
                    <text x="178" y="32" fill="#33ff66" fontSize="8" fontFamily="Share Tech Mono" fontWeight="bold">7:10 RULE</text>
                    <text x="178" y="44" fill="#8affaa" fontSize="7" fontFamily="Share Tech Mono">-90% / 7 HRS</text>
                    <text x="178" y="56" fill="#ff4455" fontSize="7" fontFamily="Share Tech Mono">KI: THYROID</text>
                    <text x="178" y="68" fill="rgba(51,255,102,0.7)" fontSize="6.5" fontFamily="Share Tech Mono">R/HR DECAY</text>
                </svg>
            );
        case 'BIOHAZARD':
            return (
                <svg viewBox="0 0 240 100" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Double Door Airlock */}
                    <rect x="25" y="16" width="100" height="68" stroke="rgba(51,255,102,0.4)" strokeWidth="1.5" strokeDasharray="3 2" />
                    <line x1="45" y1="16" x2="45" y2="84" stroke="#33ff66" strokeWidth="3" />
                    <line x1="105" y1="16" x2="105" y2="84" stroke="#33ff66" strokeWidth="3" />
                    <rect x="58" y="30" width="34" height="40" rx="3" fill="rgba(51,255,102,0.15)" stroke="#66ff8f" strokeWidth="1.5" />
                    <text x="62" y="54" fill="#33ff66" fontSize="7" fontFamily="Share Tech Mono" fontWeight="bold">AIRLOCK</text>
                    {/* Respirator Filter Canister */}
                    <rect x="150" y="24" width="36" height="52" rx="4" stroke="#33ff66" strokeWidth="2" fill="rgba(0,30,10,0.8)" />
                    <line x1="150" y1="40" x2="186" y2="40" stroke="rgba(51,255,102,0.6)" strokeWidth="1.5" />
                    <line x1="150" y1="56" x2="186" y2="56" stroke="rgba(51,255,102,0.6)" strokeWidth="1.5" />
                    <circle cx="168" cy="32" r="4" fill="rgba(51,255,102,0.4)" stroke="#33ff66" strokeWidth="1" />
                    {/* Airflow arrows */}
                    <path d="M 136 50 L 146 50 M 142 46 L 146 50 L 142 54" stroke="#ff4455" strokeWidth="1.5" />
                    <path d="M 190 50 L 200 50 M 196 46 L 200 50 L 196 54" stroke="#33ff66" strokeWidth="1.5" />
                    {/* Readouts */}
                    <text x="195" y="32" fill="#33ff66" fontSize="8" fontFamily="Share Tech Mono" fontWeight="bold">HEPA P100</text>
                    <text x="195" y="44" fill="rgba(51,255,102,0.7)" fontSize="7" fontFamily="Share Tech Mono">99.97% EFF</text>
                    <text x="195" y="68" fill="#8affaa" fontSize="7" fontFamily="Share Tech Mono">ΔP: -25 Pa</text>
                    <text x="195" y="80" fill="#ff4455" fontSize="6.5" fontFamily="Share Tech Mono">DECON STG-2</text>
                </svg>
            );
        case 'FIRE':
            return (
                <svg viewBox="0 0 240 100" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Ground Surface Line */}
                    <line x1="15" y1="36" x2="225" y2="36" stroke="rgba(51,255,102,0.7)" strokeWidth="2" />
                    <line x1="15" y1="36" x2="225" y2="36" stroke="rgba(51,255,102,0.2)" strokeWidth="8" strokeDasharray="4 4" />
                    {/* Dakota Fire Hole Profile */}
                    {/* Combustion Chamber */}
                    <path d="M 100 36 L 100 78 C 100 86, 140 86, 140 78 L 140 36" stroke="#33ff66" strokeWidth="2" fill="rgba(255,80,30,0.15)" />
                    {/* Air Intake Draft Tunnel */}
                    <path d="M 50 36 L 70 80 L 100 80" stroke="#33ff66" strokeWidth="2" strokeDasharray="2 2" fill="none" />
                    {/* Cold Air Intake Arrow */}
                    <path d="M 45 28 L 65 68 L 96 74" stroke="#66ff8f" strokeWidth="1.8" strokeDasharray="3 2" />
                    <path d="M 90 71 L 96 74 L 91 78" stroke="#66ff8f" strokeWidth="1.8" fill="none" />
                    {/* Flame Vector in Pit */}
                    <path d="M 120 74 C 112 66, 110 52, 120 42 C 130 52, 128 66, 120 74 Z" fill="#ff4455" stroke="#ffcc00" strokeWidth="1.5" />
                    <circle cx="120" cy="58" r="4" fill="#ffcc00" />
                    {/* Smokeless Updraft Thermal Loop */}
                    <path d="M 120 40 L 120 16 M 116 22 L 120 16 L 124 22" stroke="#ffcc00" strokeWidth="1.5" />
                    {/* Telemetry Labels */}
                    <text x="25" y="24" fill="#66ff8f" fontSize="7.5" fontFamily="Share Tech Mono">AIR DRAFT ➔</text>
                    <text x="150" y="50" fill="#33ff66" fontSize="8" fontFamily="Share Tech Mono" fontWeight="bold">DAKOTA HOLE</text>
                    <text x="150" y="62" fill="#ffcc00" fontSize="7" fontFamily="Share Tech Mono">SMOKELESS 90%</text>
                    <text x="150" y="74" fill="rgba(51,255,102,0.7)" fontSize="7" fontFamily="Share Tech Mono">CHAR CLOTH 400°</text>
                </svg>
            );
        case 'NAVIGATION':
            return (
                <svg viewBox="0 0 240 100" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Celestial Radar Reticle */}
                    <circle cx="70" cy="50" r="38" stroke="rgba(51,255,102,0.3)" strokeWidth="1" strokeDasharray="2 2" />
                    <circle cx="70" cy="50" r="22" stroke="rgba(51,255,102,0.2)" strokeWidth="1" />
                    <line x1="70" y1="8" x2="70" y2="92" stroke="rgba(51,255,102,0.4)" strokeWidth="1" />
                    <line x1="28" y1="50" x2="112" y2="50" stroke="rgba(51,255,102,0.4)" strokeWidth="1" />
                    {/* Big Dipper Asterism */}
                    <circle cx="38" cy="72" r="2.5" fill="#33ff66" />
                    <circle cx="48" cy="68" r="2.5" fill="#33ff66" />
                    <circle cx="56" cy="74" r="2.5" fill="#33ff66" />
                    <circle cx="62" cy="80" r="2.5" fill="#33ff66" />
                    <circle cx="74" cy="78" r="2.5" fill="#33ff66" />
                    <circle cx="78" cy="66" r="3" fill="#66ff8f" />
                    <circle cx="66" cy="64" r="3" fill="#66ff8f" />
                    <polyline points="38,72 48,68 56,74 62,80 74,78 78,66 66,64 62,80" stroke="rgba(51,255,102,0.5)" strokeWidth="1.2" />
                    {/* Pointer Stars 5x Line to Polaris */}
                    <line x1="74" y1="78" x2="78" y2="66" stroke="#66ff8f" strokeWidth="1.5" />
                    <line x1="78" y1="66" x2="88" y2="24" stroke="#ffcc00" strokeWidth="1.8" strokeDasharray="3 2" />
                    {/* Polaris (North Star) */}
                    <circle cx="88" cy="24" r="4.5" fill="#ffffff" stroke="#33ff66" strokeWidth="1.5" />
                    <line x1="88" y1="14" x2="88" y2="34" stroke="#ffffff" strokeWidth="1" />
                    <line x1="78" y1="24" x2="98" y2="24" stroke="#ffffff" strokeWidth="1" />
                    {/* Azimuth / Compass dial on right */}
                    <text x="135" y="32" fill="#33ff66" fontSize="8.5" fontFamily="Share Tech Mono" fontWeight="bold">POLARIS 000° N</text>
                    <text x="135" y="46" fill="#8affaa" fontSize="7" fontFamily="Share Tech Mono">AZIMUTH: TRUE NORTH</text>
                    <text x="135" y="58" fill="rgba(51,255,102,0.7)" fontSize="7" fontFamily="Share Tech Mono">ELEVATION = LATITUDE</text>
                    <text x="135" y="72" fill="#ffcc00" fontSize="7" fontFamily="Share Tech Mono">SHADOW STICK E-W</text>
                    <text x="135" y="84" fill="rgba(51,255,102,0.7)" fontSize="6.5" fontFamily="Share Tech Mono">ACCURACY: ±1.5 DEG</text>
                </svg>
            );
        case 'COMMS':
            return (
                <svg viewBox="0 0 240 100" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Antenna Tower */}
                    <line x1="45" y1="78" x2="45" y2="26" stroke="#33ff66" strokeWidth="2.5" />
                    <line x1="28" y1="78" x2="45" y2="38" stroke="rgba(51,255,102,0.6)" strokeWidth="1.5" />
                    <line x1="62" y1="78" x2="45" y2="38" stroke="rgba(51,255,102,0.6)" strokeWidth="1.5" />
                    <circle cx="45" cy="24" r="4" fill="#ff4455" stroke="#33ff66" strokeWidth="1.5" />
                    {/* RF Radiation Sine Arcs */}
                    <path d="M 54 18 A 12 12 0 0 1 54 30" stroke="#33ff66" strokeWidth="1.5" fill="none" />
                    <path d="M 60 12 A 20 20 0 0 1 60 36" stroke="rgba(51,255,102,0.7)" strokeWidth="1.5" fill="none" />
                    <path d="M 66 6 A 28 28 0 0 1 66 42" stroke="rgba(51,255,102,0.4)" strokeWidth="1.5" fill="none" />
                    {/* Morse Code SOS Telegraph Line */}
                    <g transform="translate(100, 22)">
                        <rect x="0" y="0" width="130" height="24" rx="2" fill="rgba(0,30,10,0.8)" stroke="#33ff66" strokeWidth="1.2" />
                        <text x="6" y="16" fill="#ffcc00" fontSize="11" fontFamily="Share Tech Mono" fontWeight="bold">••• ─── ••• (SOS)</text>
                    </g>
                    {/* Faraday Mesh Shield */}
                    <rect x="100" y="54" width="60" height="32" stroke="rgba(51,255,102,0.4)" strokeWidth="1" strokeDasharray="3 3" fill="rgba(51,255,102,0.06)" />
                    <line x1="100" y1="64" x2="160" y2="64" stroke="rgba(51,255,102,0.3)" />
                    <line x1="100" y1="74" x2="160" y2="74" stroke="rgba(51,255,102,0.3)" />
                    <line x1="120" y1="54" x2="120" y2="86" stroke="rgba(51,255,102,0.3)" />
                    <line x1="140" y1="54" x2="140" y2="86" stroke="rgba(51,255,102,0.3)" />
                    <text x="104" y="80" fill="#33ff66" fontSize="6.5" fontFamily="Share Tech Mono">FARADAY EMP</text>
                    {/* Telemetry */}
                    <text x="168" y="66" fill="#33ff66" fontSize="8" fontFamily="Share Tech Mono" fontWeight="bold">VHF 146.52 MHz</text>
                    <text x="168" y="78" fill="rgba(51,255,102,0.7)" fontSize="7" fontFamily="Share Tech Mono">SIMPLEX // LINE-SIGHT</text>
                </svg>
            );
        case 'FORAGING':
            return (
                <svg viewBox="0 0 240 100" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Ground line */}
                    <line x1="15" y1="84" x2="120" y2="84" stroke="rgba(51,255,102,0.6)" strokeWidth="2" />
                    {/* Figure-4 Snare Mechanism */}
                    {/* Vertical Post */}
                    <line x1="45" y1="84" x2="45" y2="35" stroke="#33ff66" strokeWidth="3" strokeLinecap="round" />
                    {/* Diagonal Arm */}
                    <line x1="40" y1="38" x2="95" y2="82" stroke="#66ff8f" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Horizontal Bait Trigger Stick */}
                    <line x1="30" y1="62" x2="105" y2="62" stroke="#ffcc00" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="102" cy="62" r="3" fill="#ff4455" />
                    {/* Deadfall Rock/Log Vector */}
                    <polygon points="35,16 95,28 85,38 25,26" fill="rgba(51,255,102,0.25)" stroke="#33ff66" strokeWidth="1.5" />
                    <path d="M 60 38 L 60 52 M 56 48 L 60 52 L 64 48" stroke="#ff4455" strokeWidth="1.5" />
                    {/* Plant Botanical Edibility leaf */}
                    <g transform="translate(140, 20)">
                        <path d="M 30 10 C 15 25, 10 45, 30 65 C 50 45, 45 25, 30 10 Z" fill="rgba(51,255,102,0.15)" stroke="#33ff66" strokeWidth="1.8" />
                        <line x1="30" y1="10" x2="30" y2="70" stroke="#33ff66" strokeWidth="1.5" />
                        <line x1="30" y1="28" x2="42" y2="20" stroke="rgba(51,255,102,0.6)" strokeWidth="1" />
                        <line x1="30" y1="40" x2="18" y2="32" stroke="rgba(51,255,102,0.6)" strokeWidth="1" />
                        <line x1="30" y1="52" x2="42" y2="44" stroke="rgba(51,255,102,0.6)" strokeWidth="1" />
                    </g>
                    {/* Telemetry Labels */}
                    <text x="180" y="36" fill="#33ff66" fontSize="8" fontFamily="Share Tech Mono" fontWeight="bold">FIGURE-4 TRAP</text>
                    <text x="180" y="48" fill="#ffcc00" fontSize="7" fontFamily="Share Tech Mono">EDIBILITY TRIAGE</text>
                    <text x="180" y="60" fill="rgba(51,255,102,0.7)" fontSize="7" fontFamily="Share Tech Mono">PEMMICAN 3000k</text>
                    <text x="180" y="72" fill="#8affaa" fontSize="6.5" fontFamily="Share Tech Mono">8-HR SKIN / LIP TEST</text>
                </svg>
            );
        case 'SHELTER':
            return (
                <svg viewBox="0 0 240 100" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Ground and Dugout Trench cross section */}
                    <path d="M 15 36 L 60 36 L 60 84 L 170 84 L 170 36 L 225 36" stroke="#33ff66" strokeWidth="2" fill="rgba(0,25,8,0.7)" />
                    {/* Heavy Overhead Stringer Logs */}
                    <circle cx="75" cy="30" r="6" stroke="#33ff66" strokeWidth="1.5" fill="rgba(51,255,102,0.2)" />
                    <circle cx="89" cy="30" r="6" stroke="#33ff66" strokeWidth="1.5" fill="rgba(51,255,102,0.2)" />
                    <circle cx="103" cy="30" r="6" stroke="#33ff66" strokeWidth="1.5" fill="rgba(51,255,102,0.2)" />
                    <circle cx="117" cy="30" r="6" stroke="#33ff66" strokeWidth="1.5" fill="rgba(51,255,102,0.2)" />
                    <circle cx="131" cy="30" r="6" stroke="#33ff66" strokeWidth="1.5" fill="rgba(51,255,102,0.2)" />
                    <circle cx="145" cy="30" r="6" stroke="#33ff66" strokeWidth="1.5" fill="rgba(51,255,102,0.2)" />
                    <circle cx="159" cy="30" r="6" stroke="#33ff66" strokeWidth="1.5" fill="rgba(51,255,102,0.2)" />
                    {/* Earth Overburden Layer */}
                    <rect x="62" y="10" width="106" height="14" fill="rgba(51,255,102,0.12)" stroke="rgba(51,255,102,0.4)" strokeDasharray="3 2" />
                    <text x="76" y="20" fill="#8affaa" fontSize="6.5" fontFamily="Share Tech Mono">3.0 FT PACKED EARTH</text>
                    {/* Ventilation Air Intake Snorkel */}
                    <path d="M 162 80 L 162 14 L 172 14" stroke="#66ff8f" strokeWidth="2" fill="none" />
                    {/* Blast Deflection Baffle */}
                    <line x1="60" y1="56" x2="80" y2="56" stroke="#ff4455" strokeWidth="2.5" />
                    {/* Telemetry Labels */}
                    <text x="80" y="66" fill="#33ff66" fontSize="8" fontFamily="Share Tech Mono" fontWeight="bold">TRENCH BLAST BUNKER</text>
                    <text x="80" y="78" fill="rgba(51,255,102,0.7)" fontSize="7" fontFamily="Share Tech Mono">PF &gt; 100 // OVERBURDEN LOCK</text>
                </svg>
            );
        case 'POWER':
            return (
                <svg viewBox="0 0 240 100" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Lead-Acid Battery Cell */}
                    <rect x="25" y="20" width="75" height="64" rx="3" stroke="#33ff66" strokeWidth="1.8" fill="rgba(0,30,10,0.7)" />
                    {/* Terminal Posts */}
                    <rect x="36" y="12" width="10" height="8" fill="#ff4455" stroke="#ff4455" />
                    <rect x="78" y="12" width="10" height="8" fill="#33ff66" stroke="#33ff66" />
                    <text x="39" y="9" fill="#ff4455" fontSize="7" fontFamily="Share Tech Mono" fontWeight="bold">+</text>
                    <text x="81" y="9" fill="#33ff66" fontSize="7" fontFamily="Share Tech Mono" fontWeight="bold">-</text>
                    {/* Electrolyte Plates */}
                    <line x1="42" y1="26" x2="42" y2="76" stroke="#ff4455" strokeWidth="3" />
                    <line x1="56" y1="26" x2="56" y2="76" stroke="#33ff66" strokeWidth="3" />
                    <line x1="70" y1="26" x2="70" y2="76" stroke="#ff4455" strokeWidth="3" />
                    <line x1="84" y1="26" x2="84" y2="76" stroke="#33ff66" strokeWidth="3" />
                    {/* Photovoltaic Solar Panel on Right */}
                    <g transform="translate(130, 18)">
                        <polygon points="0,20 60,0 80,45 20,65" fill="rgba(51,255,102,0.18)" stroke="#33ff66" strokeWidth="1.5" />
                        <line x1="30" y1="10" x2="50" y2="55" stroke="rgba(51,255,102,0.5)" strokeWidth="1" />
                        <line x1="10" y1="42" x2="70" y2="22" stroke="rgba(51,255,102,0.5)" strokeWidth="1" />
                    </g>
                    {/* Telemetry Labels */}
                    <text x="135" y="78" fill="#33ff66" fontSize="8" fontFamily="Share Tech Mono" fontWeight="bold">12.6V DC LEAD-ACID</text>
                    <text x="135" y="90" fill="rgba(51,255,102,0.7)" fontSize="7" fontFamily="Share Tech Mono">H2SO4 1.265 SG // PV ARRAY</text>
                </svg>
            );
        default: // 'TACTICAL'
            return (
                <svg viewBox="0 0 240 100" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Concentric Radar Rings */}
                    <circle cx="80" cy="50" r="42" stroke="rgba(51,255,102,0.3)" strokeWidth="1.2" strokeDasharray="3 3" />
                    <circle cx="80" cy="50" r="28" stroke="rgba(51,255,102,0.4)" strokeWidth="1" />
                    <circle cx="80" cy="50" r="14" stroke="rgba(51,255,102,0.5)" strokeWidth="1" />
                    <circle cx="80" cy="50" r="2" fill="#33ff66" />
                    <line x1="80" y1="4" x2="80" y2="96" stroke="rgba(51,255,102,0.3)" strokeWidth="1" />
                    <line x1="34" y1="50" x2="126" y2="50" stroke="rgba(51,255,102,0.3)" strokeWidth="1" />
                    {/* Sweep Line */}
                    <line x1="80" y1="50" x2="114" y2="22" stroke="#66ff8f" strokeWidth="2" strokeLinecap="round" />
                    {/* Target Lock Blips */}
                    <rect x="100" y="30" width="6" height="6" fill="#ff4455" stroke="#ffffff" strokeWidth="0.8" />
                    <circle cx="60" cy="65" r="3" fill="#33ff66" />
                    {/* Target HUD Brackets on Right */}
                    <text x="140" y="36" fill="#33ff66" fontSize="8.5" fontFamily="Share Tech Mono" fontWeight="bold">TACTICAL RADAR</text>
                    <text x="140" y="48" fill="#8affaa" fontSize="7" fontFamily="Share Tech Mono">GRID: REF-00{num}</text>
                    <text x="140" y="60" fill="rgba(51,255,102,0.7)" fontSize="7" fontFamily="Share Tech Mono">TARGET ACQUIRED</text>
                    <text x="140" y="74" fill="#66ff8f" fontSize="7" fontFamily="Share Tech Mono">STATUS: 100% NOMINAL</text>
                </svg>
            );
    }
};

// Tactical Schematic HUD Card Component
function TacticalSchematicHUD({ item, height = 114, showDetails = true }) {
    if (!item) return null;
    const category = getCategoryForDirective(item);

    return (
        <div className="tactical-schematic-card" style={{ minHeight: height }}>
            <div className="schematic-corner-tl"></div>
            <div className="schematic-corner-tr"></div>
            <div className="schematic-corner-bl"></div>
            <div className="schematic-corner-br"></div>

            {/* Header Telemetry */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(51, 255, 102, 0.25)',
                paddingBottom: '3px',
                marginBottom: '4px',
                fontSize: '0.68rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: 'var(--term-green-bright)',
                position: 'relative',
                zIndex: 10
            }}>
                <span>// SCHEMATIC: {category}</span>
                <span style={{ color: 'var(--term-text-dim)', fontSize: '0.62rem' }}>FIG. {String(item.num || 1).padStart(3, '0')}</span>
            </div>

            {/* SVG Visual Graphic */}
            <div className="schematic-svg-canvas" style={{ height: height - 42 }}>
                {renderSchematicSVG(category, item.num)}
            </div>

            {/* Bottom Diagnostic Metadata */}
            {showDetails && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid rgba(51, 255, 102, 0.18)',
                    paddingTop: '3px',
                    marginTop: '4px',
                    fontSize: '0.58rem',
                    color: 'var(--term-text-dim)',
                    letterSpacing: '0.05em',
                    position: 'relative',
                    zIndex: 10
                }}>
                    <span>VECTOR TELEMETRY // OK</span>
                    <span style={{ color: 'var(--term-green-bright)' }}>CRT-RASTER 80s</span>
                </div>
            )}
        </div>
    );
}

// Vintage Alarm Clock Component
function VintageAlarmClock({ compact = false }) {
    const getClockParts = () => {
        const d = new Date();
        let hours = d.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const strHours = String(hours).padStart(2, '0');
        const strMins = String(d.getMinutes()).padStart(2, '0');
        const strSecs = String(d.getSeconds()).padStart(2, '0');
        return { hours: strHours, minutes: strMins, seconds: strSecs, ampm };
    };

    const [clock, setClock] = useState(() => getClockParts());

    useEffect(() => {
        const timer = setInterval(() => {
            setClock(getClockParts());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    if (compact) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'baseline',
                fontFamily: "'Orbitron', 'Share Tech Mono', monospace",
                fontSize: '0.86rem',
                fontWeight: 800,
                color: 'var(--term-green-bright)',
                letterSpacing: '0.06em',
                textShadow: '0 0 6px rgba(51, 255, 102, 0.7)'
            }}>
                <span>{clock.hours}</span>
                <span className="alarm-colon">:</span>
                <span>{clock.minutes}</span>
                <span className="alarm-colon">:</span>
                <span>{clock.seconds}</span>
                <span style={{ fontSize: '0.62rem', marginLeft: '4px', color: 'var(--term-green)' }}>{clock.ampm}</span>
            </div>
        );
    }

    return (
        <div className="vintage-alarm-clock-box">
            <div className="vintage-alarm-display">
                <div className="vintage-alarm-ghost">
                    88:88:88 <span style={{ fontSize: '0.65rem', marginLeft: '6px' }}>88</span>
                </div>

                <div className="vintage-alarm-digits">
                    <span className="alarm-digit">{clock.hours}</span>
                    <span className="alarm-colon">:</span>
                    <span className="alarm-digit">{clock.minutes}</span>
                    <span className="alarm-colon">:</span>
                    <span className="alarm-digit">{clock.seconds}</span>
                    <span className="alarm-ampm-badge">{clock.ampm}</span>
                </div>
            </div>
        </div>
    );
}

function PerspectiveCard({ item, index, onSelect }) {
    const cardRef = useRef(null);
    const [mouseTransform, setMouseTransform] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const tossStyle = useMemo(() => {
        const angles = [-2.2, 1.8, -1.5, 2.1, -1.9, 1.4, -2.4, 1.7, -1.3, 2.0, 2.2, -1.6];
        const xOffsets = [-4, 6, -3, 7, -5, 4, -5, 5, -3, 6, -7, 4];
        const tapeAngles = [-1.5, 1.2, -1.0, 1.6, -1.2, 1.0, -1.4, 1.3, -0.8, 1.5, -1.6, 0.9];

        return {
            baseRot: angles[index % angles.length],
            baseShiftX: xOffsets[index % xOffsets.length],
            tapeRot: tapeAngles[index % tapeAngles.length],
            zIndex: 10 + (index % 8)
        };
    }, [index]);

    const handleMouseMove = (e) => {
        if (!cardRef.current || (typeof window !== 'undefined' && window.innerWidth < 860)) return;
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
        setMouseTransform('');
    };

    const handleClick = () => {
        playSelectClick();
        onSelect(item);
    };

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 860;

    return (
        <article
            ref={cardRef}
            className="archive-clipping"
            style={{
                transform: mouseTransform || (!isMobile ? `perspective(900px) translateX(${tossStyle.baseShiftX}px) rotateZ(${tossStyle.baseRot}deg)` : 'none'),
                transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.36s cubic-bezier(0.2, 0.8, 0.4, 1)',
                animationDelay: `${(index % 8) * 0.04}s`,
                zIndex: isHovered ? 120 : tossStyle.zIndex,
                margin: isMobile ? '8px 4px' : '10px 14px'
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <div
                className="archive-tape"
                style={{
                    left: '50%',
                    transform: `translateX(-50%) rotate(${tossStyle.tapeRot}deg) translateZ(14px)`,
                    width: '84px'
                }}
            ></div>

            {/* Tactical Visual Schematic Image on Fact Card - ABOVE HEADLINE */}
            <div style={{
                margin: '2px 0 8px 0',
                border: '1.5px solid #000000',
                background: '#031407',
                borderRadius: 2,
                overflow: 'hidden',
                transform: 'translateZ(8px)'
            }}>
                <TacticalSchematicHUD item={item} height={isMobile ? 86 : 96} showDetails={false} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#006622', letterSpacing: '0.06em' }}>
                    DIRECTIVE #{item.num}
                </span>
                <span style={{ fontSize: '0.66rem', fontWeight: 700, color: '#444444', letterSpacing: '0.04em' }}>
                    TAP TO INSPECT ↗
                </span>
            </div>

            <h2 className="archive-headline" style={{ color: '#000000', margin: '2px 0 6px 0' }}>
                {item.headline}
            </h2>

            <p className="archive-body" style={{ color: '#000000' }}>
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

    // Responsive Mobile Tab State: 'intel' | 'simulator' | 'hud'
    const [activeMobileTab, setActiveMobileTab] = useState('simulator');
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 860 : false));

    useEffect(() => {
        const handleResize = () => {
            setIsMobileOrTablet(window.innerWidth < 860);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleTabSwitch = (tab) => {
        playPageTurnSound();
        setActiveMobileTab(tab);
    };

    // Visual State: Digital Distortion & Continuous Color Shift (Still green by default until happy face is clicked)
    const [baseHue, setBaseHue] = useState(0);
    const [isColorPhasing, setIsColorPhasing] = useState(false);
    const [glitchKey, setGlitchKey] = useState(0);
    const [isGlitching, setIsGlitching] = useState(false);
    const [transitionTick, setTransitionTick] = useState(0);
    const glitchTimeoutRef = useRef(null);

    // Quiz State (Default 5 facts)
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
            const nowPlaying = toneGenRef.current.toggle();
            setIsAudioActive(nowPlaying);
        }
    };

    const handleSmileyClick = () => {
        playGlitchSound();
        setIsGlitching(true);
        setGlitchKey(prev => prev + 1);
        if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
        glitchTimeoutRef.current = setTimeout(() => {
            setIsGlitching(false);
        }, 440);

        if (!isColorPhasing) {
            setBaseHue(prev => (prev + 80 + Math.floor(Math.random() * 95)) % 360 || 90);
            setIsColorPhasing(true);
        } else {
            setBaseHue(0);
            setIsColorPhasing(false);
        }
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
                question: `What is the critical post-collapse survival directive for ${item.headline}?`,
                correct: item.content.slice(0, 80) + '...',
                distractors: [
                    "Delay immediate action until external rescue arrives on scene",
                    "Do not perform triage without certified institutional authorization",
                    "Apply general obsolete procedures without specific directive"
                ]
            };

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

    // Default to 5 facts
    const sampleEmergencyDirectives = useCallback((targetCount = 5) => {
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

        const items = sampleEmergencyDirectives(5);
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

    // Quiz Interactions with 80's Computer Transitions
    const changeQuestionIdx = (newIdx) => {
        playPageTurnSound();
        setCurrentQuestionIdx(newIdx);
        setTransitionTick(prev => prev + 1);
    };

    const handleSelectOption = (qIdx, optionIdx) => {
        playSelectClick();
        setUserAnswers(prev => ({
            ...prev,
            [qIdx]: optionIdx
        }));
    };

    const handleRetakeQuiz = () => {
        playPageTurnSound();
        setUserAnswers({});
        setCurrentQuestionIdx(0);
        setTransitionTick(prev => prev + 1);
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
            key={`crt-screen-${glitchKey}`}
            className={`crt-screen ${isColorPhasing ? 'color-cycling' : ''} ${isGlitching ? 'glitch-active' : ''}`}
            style={{
                '--start-hue': `${baseHue}deg`
            }}
        >
            {/* RETRO TOP BAR */}
            <header className="term-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {/* Pixel Smiley Button to the left of the Logo */}
                    <button
                        type="button"
                        className="pixel-face-btn-circle"
                        onClick={handleSmileyClick}
                        onMouseEnter={handleSmileyHover}
                        title={isColorPhasing ? "Reset to Static Green (Trigger Digital Distortion)" : "Trigger Digital Distortion & Color Blending"}
                        style={{ width: '34px', height: '34px', flexShrink: 0 }}
                    >
                        <svg width="26" height="26" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: 'crispEdges' }}>
                            <rect x="4" y="5" width="2" height="2" fill="#33ff66" />
                            <rect x="10" y="5" width="2" height="2" fill="#33ff66" />
                            <rect x="3" y="9" width="1" height="2" fill="#33ff66" />
                            <rect x="12" y="9" width="1" height="2" fill="#33ff66" />
                            <rect x="4" y="11" width="8" height="1.5" fill="#33ff66" />
                        </svg>
                    </button>

                    <div>
                        <div style={{ fontSize: '1.12rem', letterSpacing: '0.12em', fontWeight: 800, color: 'var(--term-green-bright)', lineHeight: 1.1 }}>
                            TERMALINK
                        </div>
                        <div className="uppercase-label" style={{ fontSize: '0.66rem', color: 'var(--term-text-dim)', marginTop: 2, letterSpacing: '0.06em' }}>
                            Civilian Bunker Training
                        </div>
                    </div>
                </div>

                {/* Vintage Alarm Clock in Center on Desktop */}
                <div className="desktop-alarm-center">
                    <VintageAlarmClock />
                </div>

                {/* Mobile Compact Header Clock */}
                <div className="mobile-header-clock">
                    <VintageAlarmClock compact={true} />
                </div>

                {/* Desktop Action Buttons */}
                <div className="desktop-header-controls">
                    <button
                        type="button"
                        onClick={handleFullShuffle}
                        disabled={loading}
                        className="term-btn"
                        style={{ padding: '9px 22px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8 }}
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
                        {loading ? "Re-filing Data..." : "Retrieve Protocol"}
                    </button>

                    <button
                        type="button"
                        onClick={handleToggleAudio}
                        className="term-btn"
                        style={{
                            padding: '9px 22px',
                            fontWeight: 700,
                            background: isAudioActive ? 'var(--term-green)' : 'rgba(3, 15, 6, 0.85)',
                            color: isAudioActive ? '#000' : 'var(--term-green-bright)'
                        }}
                    >
                        {isAudioActive ? "432Hz Drone: ON" : "432Hz Drone: OFF"}
                    </button>
                </div>

                {/* Mobile Quick Action Buttons */}
                <div className="mobile-header-actions">
                    <button
                        type="button"
                        onClick={handleToggleAudio}
                        className={`mobile-icon-btn ${isAudioActive ? 'active' : ''}`}
                        title="432Hz Drone Audio"
                        aria-label="Toggle 432Hz Drone Audio"
                    >
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            {isAudioActive ? (
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                            ) : (
                                <line x1="23" y1="9" x2="17" y2="15"></line>
                            )}
                        </svg>
                    </button>

                    <button
                        type="button"
                        onClick={handleFullShuffle}
                        disabled={loading}
                        className="mobile-icon-btn"
                        title="Retrieve Protocol"
                        aria-label="Retrieve Protocol"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="16 3 21 3 21 8" />
                            <line x1="4" y1="20" x2="21" y2="3" />
                            <polyline points="21 16 21 21 16 21" />
                            <line x1="15" y1="15" x2="21" y2="21" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* MAIN WORKSPACE */}
            <main className="term-main-layout">

                {/* SECTION 1: SCROLLABLE EMERGENCY KNOWLEDGE CARDS (INTEL) */}
                <section
                    className={`archive-rail scroll-dark ${isMobileOrTablet ? `tab-content-panel ${activeMobileTab === 'intel' ? 'active' : ''}` : ''}`}
                    style={!isMobileOrTablet ? { padding: '24px 14px 60px 14px', overflowY: 'auto' } : undefined}
                >
                    {isMobileOrTablet && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 14,
                            paddingBottom: 8,
                            borderBottom: '1px solid var(--term-green-dim)'
                        }}>
                            <span className="uppercase-label" style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--term-green-bright)', letterSpacing: '0.08em' }}>
                                // RECOVERED DIRECTIVES [{telemetryItems.length}]
                            </span>
                            <button
                                type="button"
                                onClick={() => handleTabSwitch('simulator')}
                                className="term-btn"
                                style={{ padding: '5px 12px', fontSize: '0.74rem', fontWeight: 700 }}
                            >
                                Take Simulator Quiz ▶
                            </button>
                        </div>
                    )}

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

                    {isMobileOrTablet && (
                        <div style={{ marginTop: 22, textAlign: 'center', paddingBottom: 10 }}>
                            <button
                                type="button"
                                onClick={() => handleTabSwitch('simulator')}
                                className="term-btn"
                                style={{
                                    width: '100%',
                                    padding: '13px 18px',
                                    fontWeight: 800,
                                    fontSize: '0.9rem',
                                    background: 'var(--term-green)',
                                    color: '#000',
                                    boxShadow: '0 0 16px var(--term-green)'
                                }}
                            >
                                Launch 5-Stage Simulator Assessment ▶
                            </button>
                        </div>
                    )}
                </section>

                {/* SECTION 2: RETRO TERMINAL DECK (TRIVIA POP QUIZ) */}
                <section
                    className={`retro-terminal-deck ${isMobileOrTablet ? `tab-content-panel ${activeMobileTab === 'simulator' ? 'active' : ''}` : ''}`}
                    style={!isMobileOrTablet ? { padding: '24px 36px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' } : undefined}
                >
                    <div className="scan-bar"></div>

                    {/* Section Top Header */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid var(--term-green-dim)',
                        paddingBottom: 10,
                        marginBottom: 14,
                        position: 'relative',
                        zIndex: 25,
                        flexWrap: 'wrap',
                        gap: 6
                    }}>
                        <div>
                            <span className="uppercase-label" style={{ fontSize: '0.94rem', letterSpacing: '0.1em', color: 'var(--term-green-bright)', fontWeight: 700 }}>
                                Tactical Assessment // Post-Collapse Simulator
                            </span>
                        </div>

                        {lastSynthesizedTime && (
                            <span className="uppercase-label" style={{ fontSize: '0.72rem', color: 'var(--term-text-dim)' }}>
                                Simulator Cycle: {lastSynthesizedTime}
                            </span>
                        )}
                    </div>

                    {/* Simulator Query Banner */}
                    <div style={{
                        background: 'rgba(0, 30, 10, 0.7)',
                        border: '1px solid var(--term-green-dim)',
                        padding: '10px 14px',
                        marginBottom: 14,
                        borderRadius: 2,
                        position: 'relative',
                        zIndex: 25,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 8,
                        flexWrap: 'wrap'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{
                                background: 'var(--term-green)',
                                color: '#000',
                                padding: '2px 7px',
                                fontWeight: 800,
                                fontSize: '0.72rem'
                            }}>
                                SIMULATOR
                            </span>
                            <span style={{ color: 'var(--term-text-main)', fontSize: '0.9rem', letterSpacing: '0.02em' }}>
                                5-Stage Survival Assessment (100% Clearance)
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
                            padding: 30,
                            border: '1px dashed var(--term-green-dim)',
                            background: 'rgba(4, 20, 8, 0.4)',
                            color: 'var(--term-text-dim)',
                            fontSize: '1rem',
                            lineHeight: 1.9,
                            fontFamily: 'Share Tech Mono, monospace',
                            position: 'relative',
                            zIndex: 25,
                            flex: 1
                        }}>
                            Loading recovered bunker telemetry...<br />
                            Formulating 5-stage post-collapse survival simulation...<br />
                            <span style={{ color: 'var(--term-green-bright)' }}>Initialising terminal diagnostic matrix...</span>
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
                                <div
                                    key={`q-stage-${currentQuestionIdx}-${transitionTick}`}
                                    className="retro-80s-page-anim"
                                    style={{
                                        border: '1.5px solid var(--term-green-bright)',
                                        padding: isMobileOrTablet ? '14px 14px' : '22px 26px',
                                        background: 'rgba(20, 255, 87, 0.03)',
                                        boxShadow: '0 0 25px rgba(51, 255, 102, 0.12), inset 0 0 20px rgba(51, 255, 102, 0.03)',
                                        position: 'relative',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        flex: 1,
                                        minHeight: 0
                                    }}
                                >
                                    <div className="raster-sweep-line"></div>

                                    {/* Question Step Indicator */}
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: 16,
                                        borderBottom: '1px solid var(--term-green-dim)',
                                        paddingBottom: 10
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--term-green-bright)', letterSpacing: '0.08em' }}>
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
                                                        onClick={() => changeQuestionIdx(idx)}
                                                        title={`Question ${idx + 1}`}
                                                    >
                                                        {idx + 1}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <div style={{ fontSize: '0.78rem', color: 'var(--term-text-dim)', letterSpacing: '0.05em' }}>
                                            [ 0{currentQuestionIdx + 1} / 05 ]
                                        </div>
                                    </div>

                                    {/* Question Content */}
                                    <div style={{
                                        overflowY: 'auto',
                                        paddingRight: 4,
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }} className="scroll-dark">
                                        {/* Directive Header & Summary Box with Tactical Visual Schematic Image */}
                                        <div className="quiz-directive-grid">
                                            {/* Left: Directive Prompt */}
                                            <div style={{
                                                borderLeft: `3px solid var(--term-green)`,
                                                padding: '12px 14px',
                                                background: 'rgba(51, 255, 102, 0.06)',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                borderRadius: 2
                                            }}>
                                                <div className="uppercase-label" style={{ fontSize: '0.72rem', color: 'var(--term-green-bright)', fontWeight: 800, marginBottom: 6, letterSpacing: '0.06em' }}>
                                                    // SIMULATED DIRECTIVE: {currentQ.headline}
                                                </div>
                                                <div style={{
                                                    fontSize: isMobileOrTablet ? '1.02rem' : '1.14rem',
                                                    lineHeight: 1.5,
                                                    color: 'var(--term-text-main)',
                                                    fontWeight: 700,
                                                    letterSpacing: '0.02em',
                                                    textShadow: '0 0 4px rgba(51, 255, 102, 0.35)'
                                                }}>
                                                    {currentQ.question}
                                                </div>
                                            </div>

                                            {/* Right: Tactical Visual Schematic Image in Summary Box */}
                                            <TacticalSchematicHUD item={currentQ} height={isMobileOrTablet ? 104 : 124} showDetails={true} />
                                        </div>

                                        {/* 4 Multiple Choice Options */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, marginBottom: 18 }}>
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
                                            marginTop: 'auto',
                                            gap: 10
                                        }}>
                                            <button
                                                type="button"
                                                className="term-btn"
                                                disabled={currentQuestionIdx === 0}
                                                onClick={() => changeQuestionIdx(currentQuestionIdx - 1)}
                                                style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                                            >
                                                ◀ Prev
                                            </button>

                                            <div style={{ display: 'flex', gap: 8 }}>
                                                {currentQuestionIdx < 4 ? (
                                                    <button
                                                        type="button"
                                                        className="term-btn"
                                                        onClick={() => changeQuestionIdx(currentQuestionIdx + 1)}
                                                        style={{ padding: '8px 20px', fontSize: '0.84rem', fontWeight: 700 }}
                                                    >
                                                        Next ▶
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="term-btn"
                                                        onClick={handleSubmitQuiz}
                                                        disabled={answeredCount === 0}
                                                        style={{
                                                            padding: '9px 22px',
                                                            fontSize: '0.86rem',
                                                            fontWeight: 800,
                                                            background: answeredCount === 5 ? 'var(--term-green)' : 'rgba(3, 15, 6, 0.85)',
                                                            color: answeredCount === 5 ? '#000' : 'var(--term-green-bright)',
                                                            boxShadow: answeredCount === 5 ? '0 0 16px var(--term-green)' : undefined
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
                                    minHeight: 0,
                                    padding: isMobileOrTablet ? '16px 14px' : '24px 28px'
                                }}>
                                    <div style={{
                                        borderBottom: '2px solid #ff3344',
                                        paddingBottom: 12,
                                        marginBottom: 14
                                    }}>
                                        <div style={{
                                            fontSize: isMobileOrTablet ? '1.05rem' : '1.24rem',
                                            fontWeight: 800,
                                            color: '#ff3344',
                                            letterSpacing: '0.06em',
                                            textShadow: '0 0 10px rgba(255, 51, 68, 0.6)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 8
                                        }}>
                                            <span>[ ! ] SIMULATION FAILED: CASUALTY DETECTED</span>
                                        </div>
                                        <div style={{ color: '#ff99aa', fontSize: '0.82rem', marginTop: 4 }}>
                                            SCORE: {5 - quizErrorDetails.length} / 5 // POST-COLLAPSE SURVIVAL REQUIRES 100% ACCURACY (5/5)
                                        </div>
                                    </div>

                                    {/* Breakdown of errors */}
                                    <div style={{
                                        overflowY: 'auto',
                                        flex: 1,
                                        paddingRight: 6,
                                        marginBottom: 14
                                    }} className="scroll-dark">
                                        <div style={{
                                            background: 'rgba(255, 51, 68, 0.08)',
                                            border: '1px dashed rgba(255, 51, 68, 0.4)',
                                            padding: '10px 14px',
                                            marginBottom: 14,
                                            color: '#ffd0d6',
                                            fontSize: '0.88rem',
                                            lineHeight: 1.5
                                        }}>
                                            In hostile fallout and grid-down environments, one procedural misjudgment causes fatal failure. Study the breached protocols below before re-running the simulator.
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                            {quizErrorDetails.map((err, idx) => (
                                                <div key={idx} style={{
                                                    border: '1px solid rgba(255, 51, 68, 0.35)',
                                                    background: 'rgba(30, 2, 5, 0.75)',
                                                    padding: '10px 14px',
                                                    borderRadius: 2
                                                }}>
                                                    <div style={{ color: '#ff6677', fontSize: '0.74rem', fontWeight: 700, marginBottom: 4 }}>
                                                        FAILED STAGE #{err.questionNum} // {err.headline}
                                                    </div>
                                                    <div style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 600, marginBottom: 6 }}>
                                                        {err.question}
                                                    </div>
                                                    <div style={{ color: '#ff8899', fontSize: '0.82rem', marginBottom: 4 }}>
                                                        ✖ YOUR SELECTION: {err.selectedText}
                                                    </div>
                                                    <div style={{ color: 'var(--term-green-bright)', fontSize: '0.84rem', fontWeight: 700 }}>
                                                        ✔ MANDATORY PROTOCOL: {err.correctText}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Loser Screen Actions */}
                                    <div style={{
                                        display: 'flex',
                                        gap: 10,
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        paddingTop: 10,
                                        borderTop: '1px solid rgba(255, 51, 68, 0.4)',
                                        flexWrap: 'wrap'
                                    }}>
                                        <button
                                            type="button"
                                            onClick={handleFullShuffle}
                                            className="term-btn"
                                            style={{ padding: '9px 16px', fontSize: '0.82rem' }}
                                        >
                                            Retrieve Protocol
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleRetakeQuiz}
                                            className="loser-btn"
                                            style={{ padding: '9px 20px', fontSize: '0.84rem' }}
                                        >
                                            Retake Simulator Quiz (Retry)
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
                                    minHeight: 0,
                                    padding: isMobileOrTablet ? '16px 14px' : '26px 30px'
                                }}>
                                    <DigitalConfetti />

                                    <div style={{
                                        borderBottom: '2px solid var(--term-green-bright)',
                                        paddingBottom: 12,
                                        marginBottom: 14,
                                        position: 'relative',
                                        zIndex: 60
                                    }}>
                                        <div style={{
                                            fontSize: isMobileOrTablet ? '1.12rem' : '1.35rem',
                                            fontWeight: 900,
                                            color: 'var(--term-green-bright)',
                                            letterSpacing: '0.06em',
                                            textShadow: '0 0 16px var(--term-green-bright)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 8
                                        }}>
                                            <span>[ ★★★ ] SIMULATION COMPLETE: CLEARANCE GRANTED!</span>
                                        </div>
                                        <div style={{ color: 'var(--term-text-main)', fontSize: '0.88rem', marginTop: 4, letterSpacing: '0.03em' }}>
                                            SIMULATOR RESULT: 5 / 5 (100% ACCURACY) // VAULT SURVIVALIST CERTIFIED
                                        </div>
                                    </div>

                                    <div style={{
                                        overflowY: 'auto',
                                        flex: 1,
                                        paddingRight: 6,
                                        marginBottom: 14,
                                        position: 'relative',
                                        zIndex: 60
                                    }} className="scroll-dark">
                                        <div style={{
                                            background: 'rgba(51, 255, 102, 0.12)',
                                            border: '1.5px solid var(--term-green-bright)',
                                            padding: isMobileOrTablet ? '14px 16px' : '18px 22px',
                                            marginBottom: 16,
                                            boxShadow: '0 0 20px rgba(51, 255, 102, 0.2)'
                                        }}>
                                            <div style={{
                                                fontSize: isMobileOrTablet ? '1.02rem' : '1.15rem',
                                                lineHeight: 1.6,
                                                color: '#ffffff',
                                                fontWeight: 700,
                                                marginBottom: 8
                                            }}>
                                                CONGRATULATIONS: BUNKER READINESS TRIAGE VALIDATED!
                                            </div>
                                            <p style={{
                                                fontSize: '0.94rem',
                                                lineHeight: 1.6,
                                                color: 'var(--term-text-main)',
                                                margin: 0
                                            }}>
                                                You achieved flawless 5/5 mastery across all active post-apocalyptic survival scenarios. You have demonstrated command over nuclear gamma shielding, trauma triage, off-grid water harvesting, and biological decontamination.
                                            </p>
                                        </div>

                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                            gap: 10
                                        }}>
                                            {quizQuestions.map((q, idx) => (
                                                <div key={idx} style={{
                                                    border: '1px solid var(--term-green-dim)',
                                                    background: 'rgba(3, 20, 8, 0.7)',
                                                    padding: '10px 14px',
                                                    borderRadius: 2
                                                }}>
                                                    <div style={{ color: 'var(--term-green-bright)', fontSize: '0.74rem', fontWeight: 800, marginBottom: 4 }}>
                                                        STAGE 0{idx + 1} // {q.headline}
                                                    </div>
                                                    <div style={{ color: 'var(--term-text-main)', fontSize: '0.82rem' }}>
                                                        ✔ {q.correctAnswer}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Success Screen Actions */}
                                    <div style={{
                                        display: 'flex',
                                        gap: 10,
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        paddingTop: 10,
                                        borderTop: '1px solid var(--term-green-dim)',
                                        position: 'relative',
                                        zIndex: 60,
                                        flexWrap: 'wrap'
                                    }}>
                                        <button
                                            type="button"
                                            onClick={handleRetakeQuiz}
                                            className="term-btn"
                                            style={{ padding: '9px 18px', fontSize: '0.82rem' }}
                                        >
                                            Retake Quiz
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleFullShuffle}
                                            className="term-btn"
                                            style={{
                                                padding: '9px 22px',
                                                fontWeight: 800,
                                                fontSize: '0.84rem',
                                                background: 'var(--term-green)',
                                                color: '#000',
                                                boxShadow: '0 0 16px var(--term-green)'
                                            }}
                                        >
                                            Retrieve Protocol
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    )}
                </section>

                {/* SECTION 3 (MOBILE ONLY): HUD & TELEMETRY PANEL */}
                {isMobileOrTablet && (
                    <section className={`mobile-hud-panel scroll-dark ${activeMobileTab === 'hud' ? 'active' : ''}`}>
                        <div style={{ border: '1.5px solid var(--term-green-bright)', padding: '14px', background: 'rgba(51, 255, 102, 0.05)', borderRadius: 2 }}>
                            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--term-green-bright)', marginBottom: 4, letterSpacing: '0.08em' }}>
                                // TACTICAL HUD & SYSTEM STATUS
                            </div>
                            <div style={{ fontSize: '0.82rem', color: 'var(--term-text-dim)', lineHeight: 1.5 }}>
                                Real-time field operations center. Manage audio drones, toggle CRT raster distortions, review telemetry, and access developer archives.
                            </div>
                        </div>

                        {/* Quick Control Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                            <button
                                type="button"
                                onClick={handleToggleAudio}
                                className="term-btn"
                                style={{
                                    padding: '12px 10px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 4,
                                    background: isAudioActive ? 'var(--term-green)' : 'rgba(3, 18, 7, 0.85)',
                                    color: isAudioActive ? '#000' : 'var(--term-green-bright)',
                                    boxShadow: isAudioActive ? '0 0 14px var(--term-green)' : undefined
                                }}
                            >
                                <span style={{ fontSize: '1.2rem' }}>🔊</span>
                                <span style={{ fontSize: '0.78rem', fontWeight: 800 }}>432Hz Audio</span>
                                <span style={{ fontSize: '0.68rem', opacity: 0.85 }}>{isAudioActive ? "STATUS: ON" : "STATUS: OFF"}</span>
                            </button>

                            <button
                                type="button"
                                onClick={handleSmileyClick}
                                className="term-btn"
                                style={{
                                    padding: '12px 10px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 4
                                }}
                            >
                                <span style={{ fontSize: '1.2rem' }}>👾</span>
                                <span style={{ fontSize: '0.78rem', fontWeight: 800 }}>Color Glitch</span>
                                <span style={{ fontSize: '0.68rem', color: 'var(--term-text-dim)' }}>{isColorPhasing ? "Phasing Mode" : "Phosphor Green"}</span>
                            </button>
                        </div>

                        {/* Diagnostic Telemetry Matrix */}
                        <div style={{ border: '1px solid var(--term-green-dim)', padding: '12px 14px', background: 'rgba(0, 20, 6, 0.75)', borderRadius: 2 }}>
                            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--term-green-bright)', marginBottom: 8, letterSpacing: '0.06em' }}>
                                // SYSTEM TELEMETRY MATRIX
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.78rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(51, 255, 102, 0.1)', paddingBottom: 4 }}>
                                    <span style={{ color: 'var(--term-text-dim)' }}>Bunker Dossiers:</span>
                                    <span style={{ color: 'var(--term-text-main)', fontWeight: 700 }}>{telemetryItems.length} Loaded</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(51, 255, 102, 0.1)', paddingBottom: 4 }}>
                                    <span style={{ color: 'var(--term-text-dim)' }}>Assessment State:</span>
                                    <span style={{ fontWeight: 800, color: quizStatus === 'success' ? 'var(--term-green-bright)' : quizStatus === 'loser' ? '#ff4455' : '#ffcc00' }}>
                                        {quizStatus === 'success' ? 'PASS (100%)' : quizStatus === 'loser' ? 'CASUALTY DETECTED' : 'IN PROGRESS'}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(51, 255, 102, 0.1)', paddingBottom: 4 }}>
                                    <span style={{ color: 'var(--term-text-dim)' }}>Stages Answered:</span>
                                    <span style={{ color: 'var(--term-text-main)', fontWeight: 700 }}>{answeredCount} / 5</span>
                                </div>
                                {lastSynthesizedTime && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'var(--term-text-dim)' }}>Last Cycle Time:</span>
                                        <span style={{ color: 'var(--term-text-main)' }}>{lastSynthesizedTime}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Actions & Portfolio Navigation */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 'auto', paddingTop: 10 }}>
                            <button
                                type="button"
                                onClick={handleFullShuffle}
                                disabled={loading}
                                className="term-btn"
                                style={{ width: '100%', padding: '12px 14px', fontWeight: 800, fontSize: '0.84rem' }}
                            >
                                🔄 Retrieve Protocol (Shuffle 5 Directives)
                            </button>

                            <a
                                href="https://zqhwebpro.github.io/portfolio/new_projects/"
                                className="term-btn"
                                style={{
                                    width: '100%',
                                    padding: '12px 14px',
                                    fontWeight: 800,
                                    fontSize: '0.84rem',
                                    textDecoration: 'none',
                                    background: 'rgba(51, 255, 102, 0.14)',
                                    color: 'var(--term-green-bright)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 8
                                }}
                            >
                                <span>See Creator Portfolio</span>
                                <span>↗</span>
                            </a>
                        </div>
                    </section>
                )}

            </main>

            {/* MOBILE APP BOTTOM NAVIGATION BAR */}
            {isMobileOrTablet && (
                <nav className="mobile-tab-bar" aria-label="Mobile Tactical Navigation">
                    <button
                        type="button"
                        className={`nav-tab-btn ${activeMobileTab === 'intel' ? 'active' : ''}`}
                        onClick={() => handleTabSwitch('intel')}
                    >
                        <span style={{ fontSize: '1.05rem' }}>📁</span>
                        <span>Intel</span>
                        <span className="nav-tab-badge">05</span>
                    </button>

                    <button
                        type="button"
                        className={`nav-tab-btn ${activeMobileTab === 'simulator' ? 'active' : ''}`}
                        onClick={() => handleTabSwitch('simulator')}
                    >
                        <span style={{ fontSize: '1.05rem' }}>🎯</span>
                        <span>Simulator</span>
                        <span
                            className="nav-tab-badge"
                            style={{
                                background: quizStatus === 'success' ? '#33ff66' : quizStatus === 'loser' ? '#ff3344' : '#ffcc00',
                                color: '#000'
                            }}
                        >
                            {answeredCount}/5
                        </span>
                    </button>

                    <button
                        type="button"
                        className={`nav-tab-btn ${activeMobileTab === 'hud' ? 'active' : ''}`}
                        onClick={() => handleTabSwitch('hud')}
                    >
                        <span style={{ fontSize: '1.05rem' }}>⚡</span>
                        <span>HUD</span>
                    </button>
                </nav>
            )}

            {/* FIXED LOWER-LEFT: "See Portfolio" Button on Desktop */}
            <a
                href="https://zqhwebpro.github.io/portfolio/new_projects/"
                className="term-btn desktop-fixed-portfolio"
            >
                <span>See Portfolio</span>
                <span style={{ fontSize: '0.75rem' }}>↗</span>
            </a>

            {/* MODAL */}
            {activeModal && (
                <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
                    <div className="modal-box-crt" onClick={(e) => e.stopPropagation()}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid var(--term-green-dim)',
                            paddingBottom: 10,
                            marginBottom: 14,
                            position: 'relative',
                            zIndex: 15
                        }}>
                            <div>
                                <div style={{
                                    fontSize: '1rem',
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
                            fontSize: isMobileOrTablet ? '1.05rem' : '1.2rem',
                            lineHeight: 1.7,
                            color: 'var(--term-text-main)',
                            textShadow: '0 0 3px rgba(51, 255, 102, 0.45)',
                            margin: '12px 0 10px 0',
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