export const ELEMENTS = {
  FIRE: { name: 'Ignis', label: 'Fire', color: '#ff4d4d', glow: 'rgba(255, 77, 77, 0.6)', symbol: '🜂' },
  EARTH: { name: 'Terra', label: 'Earth', color: '#2ecc71', glow: 'rgba(46, 204, 113, 0.6)', symbol: '🜃' },
  AIR: { name: 'Aer', label: 'Air', color: '#00f2fe', glow: 'rgba(0, 242, 254, 0.6)', symbol: '🜁' },
  WATER: { name: 'Aqua', label: 'Water', color: '#9b51e0', glow: 'rgba(155, 81, 224, 0.6)', symbol: '🜄' }
};

export const ZODIAC_SIGNS = [
  {
    id: 'aries',
    name: 'Aries',
    title: 'The Celestial Ram',
    symbol: '♈',
    element: ELEMENTS.FIRE,
    planet: 'Mars ♂',
    house: 'I House of Self',
    dates: 'Mar 21 - Apr 19',
    color: '#ff4b82',
    // Normalized constellation star coordinates within a 100x100 box
    stars: [
      { x: 15, y: 70 },
      { x: 45, y: 55 },
      { x: 75, y: 35 },
      { x: 88, y: 22 }
    ],
    lines: [[0, 1], [1, 2], [2, 3]]
  },
  {
    id: 'taurus',
    name: 'Taurus',
    title: 'The Cosmic Bull',
    symbol: '♉',
    element: ELEMENTS.EARTH,
    planet: 'Venus ♀',
    house: 'II House of Value',
    dates: 'Apr 20 - May 20',
    color: '#33ffcc',
    stars: [
      { x: 20, y: 75 },
      { x: 38, y: 60 },
      { x: 50, y: 48 },
      { x: 65, y: 30 },
      { x: 82, y: 25 },
      { x: 55, y: 70 },
      { x: 70, y: 80 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [5, 6]]
  },
  {
    id: 'gemini',
    name: 'Gemini',
    title: 'The Astral Twins',
    symbol: '♊',
    element: ELEMENTS.AIR,
    planet: 'Mercury ☿',
    house: 'III House of Mind',
    dates: 'May 21 - Jun 20',
    color: '#f3e6ff',
    stars: [
      { x: 25, y: 20 },
      { x: 30, y: 45 },
      { x: 28, y: 75 },
      { x: 70, y: 22 },
      { x: 68, y: 48 },
      { x: 65, y: 78 }
    ],
    lines: [[0, 1], [1, 2], [3, 4], [4, 5], [0, 3], [1, 4]]
  },
  {
    id: 'cancer',
    name: 'Cancer',
    title: 'The Moon Crab',
    symbol: '♋',
    element: ELEMENTS.WATER,
    planet: 'Moon ☽',
    house: 'IV House of Home',
    dates: 'Jun 21 - Jul 22',
    color: '#88ccff',
    stars: [
      { x: 48, y: 50 },
      { x: 28, y: 30 },
      { x: 68, y: 32 },
      { x: 50, y: 78 }
    ],
    lines: [[0, 1], [0, 2], [0, 3]]
  },
  {
    id: 'leo',
    name: 'Leo',
    title: 'The Solar Lion',
    symbol: '♌',
    element: ELEMENTS.FIRE,
    planet: 'Sun ☉',
    house: 'V House of Pleasure',
    dates: 'Jul 23 - Aug 22',
    color: '#ffd166',
    stars: [
      { x: 78, y: 30 },
      { x: 65, y: 22 },
      { x: 52, y: 32 },
      { x: 50, y: 52 },
      { x: 25, y: 65 },
      { x: 15, y: 80 },
      { x: 35, y: 80 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [4, 6], [3, 6]]
  },
  {
    id: 'virgo',
    name: 'Virgo',
    title: 'The Mystic Maiden',
    symbol: '♍',
    element: ELEMENTS.EARTH,
    planet: 'Mercury ☿',
    house: 'VI House of Health',
    dates: 'Aug 23 - Sep 22',
    color: '#00ffea',
    stars: [
      { x: 50, y: 18 },
      { x: 42, y: 38 },
      { x: 58, y: 48 },
      { x: 75, y: 65 },
      { x: 30, y: 60 },
      { x: 20, y: 82 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [1, 4], [4, 5]]
  },
  {
    id: 'libra',
    name: 'Libra',
    title: 'The Scales of Equilibrium',
    symbol: '♎',
    element: ELEMENTS.AIR,
    planet: 'Venus ♀',
    house: 'VII House of Balance',
    dates: 'Sep 23 - Oct 22',
    color: '#b366ff',
    stars: [
      { x: 50, y: 25 },
      { x: 22, y: 55 },
      { x: 78, y: 52 },
      { x: 35, y: 78 },
      { x: 65, y: 80 }
    ],
    lines: [[0, 1], [0, 2], [1, 2], [1, 3], [2, 4]]
  },
  {
    id: 'scorpio',
    name: 'Scorpio',
    title: 'The Shadow Scorpion',
    symbol: '♏',
    element: ELEMENTS.WATER,
    planet: 'Pluto ♇',
    house: 'VIII House of Transformation',
    dates: 'Oct 23 - Nov 21',
    color: '#ff3366',
    stars: [
      { x: 80, y: 20 },
      { x: 70, y: 35 },
      { x: 60, y: 45 },
      { x: 50, y: 60 },
      { x: 35, y: 75 },
      { x: 20, y: 70 },
      { x: 18, y: 55 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]]
  },
  {
    id: 'sagittarius',
    name: 'Sagittarius',
    title: 'The Archon Centaur',
    symbol: '♐',
    element: ELEMENTS.FIRE,
    planet: 'Jupiter ♃',
    house: 'IX House of Philosophy',
    dates: 'Nov 22 - Dec 21',
    color: '#9d4edd',
    stars: [
      { x: 25, y: 75 },
      { x: 45, y: 60 },
      { x: 65, y: 50 },
      { x: 80, y: 30 },
      { x: 55, y: 35 },
      { x: 75, y: 70 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [1, 4], [4, 3], [2, 5]]
  },
  {
    id: 'capricorn',
    name: 'Capricorn',
    title: 'The Sea-Goat of Chronos',
    symbol: '♑',
    element: ELEMENTS.EARTH,
    planet: 'Saturn ♄',
    house: 'X House of Destiny',
    dates: 'Dec 22 - Jan 19',
    color: '#7b2cbf',
    stars: [
      { x: 20, y: 35 },
      { x: 55, y: 25 },
      { x: 80, y: 45 },
      { x: 70, y: 75 },
      { x: 35, y: 65 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]]
  },
  {
    id: 'aquarius',
    name: 'Aquarius',
    title: 'The Water-Bearer of the Void',
    symbol: '♒',
    element: ELEMENTS.AIR,
    planet: 'Uranus ♅',
    house: 'XI House of Truth',
    dates: 'Jan 20 - Feb 18',
    color: '#00bbf9',
    stars: [
      { x: 25, y: 30 },
      { x: 45, y: 25 },
      { x: 65, y: 35 },
      { x: 35, y: 55 },
      { x: 55, y: 50 },
      { x: 75, y: 60 }
    ],
    lines: [[0, 1], [1, 2], [0, 3], [3, 4], [4, 5], [2, 5]]
  },
  {
    id: 'pisces',
    name: 'Pisces',
    title: 'The Ethereal Fishes',
    symbol: '♓',
    element: ELEMENTS.WATER,
    planet: 'Neptune ♆',
    house: 'XII House of Secrets',
    dates: 'Feb 19 - Mar 20',
    color: '#3a0ca3',
    stars: [
      { x: 22, y: 25 },
      { x: 25, y: 55 },
      { x: 45, y: 75 },
      { x: 75, y: 70 },
      { x: 80, y: 40 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]]
  }
];

export const MYSTICAL_PROPHECIES = [
  {
    title: "Celestial Supernova",
    transit: "Grand Fire Trine in Zenith",
    omen: "The ethereal weave unravels, igniting dormant embers of creation. What you dare to manifest tonight shall echo across celestial spheres.",
    action: "Cast forth your ambition without fear.",
    luckyAspect: "Sextile with Solar Core"
  },
  {
    title: "Arcane Convergence",
    transit: "Jupiter Sextile Uranus",
    omen: "Ancient cosmic frequencies intersect your aura. A sudden revelation arrives in silence—listen closely to the space between thoughts.",
    action: "Embrace the unanticipated doorway.",
    luckyAspect: "11th House Harmony"
  },
  {
    title: "The Shrouded Oracle",
    transit: "Neptune in Deep Retrograde",
    omen: "A shadowy veil dissolves over past trials. Hidden motives become clear as glass under the luminous eye of the full moon.",
    action: "Trust your raw nocturnal instinct.",
    luckyAspect: "Trine with Mystical Waters"
  },
  {
    title: "Astral Sovereign",
    transit: "Pluto Conjunction Midheaven",
    omen: "The wheel of destiny turns in your favor. Old limitations burn to ash, clearing a consecrated path toward rightful dominion.",
    action: "Claim what is rightfully yours.",
    luckyAspect: "Golden Ratio Aspect"
  },
  {
    title: "Starlight Alchemy",
    transit: "Mercury Conjunct Aldebaran",
    omen: "Words spoken with intent carry enchantment tonight. A forgotten alliance re-emerges bearing ancient tools and unexpected fortune.",
    action: "Speak your desires into existence.",
    luckyAspect: "Mercury's Quincunx"
  },
  {
    title: "Tides of the Void",
    transit: "Lunar Eclipse in the Deep Astral",
    omen: "Great cosmic tides sweep away obsolete anchors. Do not resist the current; it deposits you onto shores of profound rebirth.",
    action: "Surrender what no longer serves the soul.",
    luckyAspect: "Trine to Oceanus"
  },
  {
    title: "Empyrean Beacon",
    transit: "Venus Rising in Aries",
    omen: "Passionate starlight floods your sphere of influence. A magnetic allure bends the cosmos to your chosen path.",
    action: "Radiate your unfiltered truth.",
    luckyAspect: "Venusian Confluence"
  },
  {
    title: "Chronos Unbound",
    transit: "Saturn Trine North Node",
    omen: "Patience weaves a tapestry of unbreakable fortitude. What you construct with your bare hands in this cycle will endure for epochs.",
    action: "Lay your cornerstone with deliberate precision.",
    luckyAspect: "Tenth House Aegis"
  }
];

export const getRandomFortune = (sign = null, element = null) => {
  let pool = MYSTICAL_PROPHECIES;
  const item = pool[Math.floor(Math.random() * pool.length)];
  return {
    ...item,
    signAffinity: sign ? sign.name : 'Cosmic All',
    elementAffinity: element ? element.name : (sign ? sign.element.name : 'Aether')
  };
};

/* ============================================================
   Stage 3: Major Arcana Tarot Correspondences for 12 Signs
   ============================================================ */
export const ZODIAC_TAROT = {
  aries: {
    number: 'IV',
    name: 'The Emperor',
    title: 'The Sovereign Architect',
    symbol: '👑',
    keywords: ['Authority', 'Willpower', 'Structure', 'Pioneering Leadership'],
    upright: 'Channel bold initiative and unyielding resolve. You are the architect of your own realm—forge sovereign order from raw cosmic chaos.',
    symbology: 'Ram-headed stone throne crowned in Martian crimson and solar gold.',
    advice: 'Command your destiny with clear purpose and unwavering conviction.'
  },
  taurus: {
    number: 'V',
    name: 'The Hierophant',
    title: 'The Keeper of Sacred Mysteries',
    symbol: '🗝️',
    keywords: ['Ancient Wisdom', 'Spiritual Grounding', 'Virtue', 'Endurance'],
    upright: 'Seek counsel from timeless truths and earthly foundations. Enduring prosperity is cultivated through patient reverence for proven universal laws.',
    symbology: 'Two crossed golden keys unlocking gates between earthly realm and ethereal skies.',
    advice: 'Anchor your spirit in steadfast principles and sacred dedication.'
  },
  gemini: {
    number: 'VI',
    name: 'The Lovers',
    title: 'The Divine Harmony',
    symbol: '♊',
    keywords: ['Sacred Union', 'Dual Choice', 'Alignment', 'Higher Truth'],
    upright: 'A pivotal choice stands before you at the crossroads of mind and soul. Synchronicity blooms when communication mirrors your purest intent.',
    symbology: 'Twin celestial souls blessed by the archangel Raphael under a radiant Sun.',
    advice: 'Choose the path that harmonizes your dual intellect with heartfelt truth.'
  },
  cancer: {
    number: 'VII',
    name: 'The Chariot',
    title: 'The Victorious Pilgrim',
    symbol: '🛡️',
    keywords: ['Emotional Mastery', 'Willpower', 'Triumph', 'Protective Aegis'],
    upright: 'Harness opposing currents with resolute emotional fortitude. The tides that once threatened to submerge you now propel your cosmic vessel toward conquest.',
    symbology: 'Armor of starlight drawn by black and white sphinxes across nocturnal waters.',
    advice: 'Steer firmly through turbulent waters; victory yields to focused spirit.'
  },
  leo: {
    number: 'VIII',
    name: 'Strength',
    title: 'The Radiant Sovereign',
    symbol: '🦁',
    keywords: ['Compassion', 'Courage', 'Inner Mastery', 'Solar Radiance'],
    upright: 'True power roars not in fierce aggression, but in the gentle mastery of primal forces. Your warmth disarms doubts and inspires unwavering devotion.',
    symbology: 'Maiden crowning the golden celestial lion with garlands of white roses.',
    advice: 'Subdue tempests with quiet, noble grace and boundless warmth.'
  },
  virgo: {
    number: 'IX',
    name: 'The Hermit',
    title: 'The Beacon in the Dark',
    symbol: '🏮',
    keywords: ['Introspection', 'Solitary Lantern', 'Inner Truth', 'Discernment'],
    upright: 'Withdraw into the sacred sanctuary of quiet contemplation. The lantern of wisdom shines brightest when external illusions fade into starlit silence.',
    symbology: 'Cloaked sage atop a snow-peaked mountain holding a hexagram star lantern.',
    advice: 'Heed the quiet whisper of your inner guidance above the noise of the world.'
  },
  libra: {
    number: 'XI',
    name: 'Justice',
    title: 'The Scales of Equilibrium',
    symbol: '⚖️',
    keywords: ['Cosmic Balance', 'Truth', 'Karmic Law', 'Impartial Clarity'],
    upright: 'Universal law restores pristine harmony to your sphere. Weigh every decision with impartial clarity; honesty acts as your impenetrable aegis.',
    symbology: 'Upright double-edged sword of truth paired with golden balanced scales.',
    advice: 'Let absolute truth and compassion dictate your chosen verdict.'
  },
  scorpio: {
    number: 'XIII',
    name: 'Death',
    title: 'The Great Phoenix',
    symbol: '🦅',
    keywords: ['Metamorphosis', 'Rebirth', 'Transmutation', 'Surrender'],
    upright: 'The obsolete chrysalis falls away in sacred surrender. Do not mourn the embers; within them stirs the glorious awakening of your immortal phoenix.',
    symbology: 'Black banner bearing the mystic white rose of life before a rising sun.',
    advice: 'Release old identities to embrace your profound renaissance.'
  },
  sagittarius: {
    number: 'XIV',
    name: 'Temperance',
    title: 'The Alchemist of Aether',
    symbol: '⚗️',
    keywords: ['Alchemy', 'Synthesis', 'Patience', 'Spiritual Flow'],
    upright: 'Blend fire and water to brew the elixir of serenity. You are transmuting disparate trials into pure spiritual gold through measured restraint and visionary grace.',
    symbology: 'Winged angel pouring living starlight between silver and gold chalices.',
    advice: 'Harmonize polarities; divine synthesis is born of patient patience.'
  },
  capricorn: {
    number: 'XV',
    name: 'The Devil',
    title: 'The Shadow Crucible',
    symbol: '⛓️',
    keywords: ['Liberation', 'Shadow Work', 'Transcending Chains', 'Mastery'],
    upright: 'Perceive the illusory bindings that tether ambition to anxiety. By acknowledging shadow desires without subjugation, you claim absolute spiritual sovereignty.',
    symbology: 'Torch lighting the darkened labyrinth where loose chains can be slipped free.',
    advice: 'Shatter false illusions of limitation; your willpower is sovereign.'
  },
  aquarius: {
    number: 'XVII',
    name: 'The Star',
    title: 'The Fountain of Hope',
    symbol: '⭐',
    keywords: ['Inspiration', 'Cosmic Clarity', 'Serenity', 'Divine Vision'],
    upright: 'A luminous celestial ray bathes your horizon with unwavering hope. Pour forth your visionary gifts freely into the collective reservoir of humanity.',
    symbology: 'Maiden pouring crystal waters onto fertile soil beneath seven guiding stars.',
    advice: 'Trust the eternal navigation of your guiding constellation.'
  },
  pisces: {
    number: 'XVIII',
    name: 'The Moon',
    title: 'The Mystic Dreamer',
    symbol: '🌙',
    keywords: ['Intuition', 'The Subconscious', 'Astral Veil', 'Deep Vision'],
    upright: 'Traverse the shimmering realm of dreams and prophetic nocturnal visions. What lies veiled beneath surface waters holds the master key to your destiny.',
    symbology: 'Two towers standing guard as the full moon drips divine dew upon deep waters.',
    advice: 'Follow deep instinct where mortal logic cannot dare to tread.'
  }
};

export const getZodiacTarot = (signId) => {
  const fallback = ZODIAC_TAROT.aries;
  if (!signId) return fallback;
  return ZODIAC_TAROT[signId.toLowerCase()] || fallback;
};

/* ============================================================
   Stage 4: Elder Futhark Divination Runes
   ============================================================ */
export const DIVINATION_RUNES = [
  {
    glyph: 'ᚠ',
    name: 'Fehu',
    translation: 'Cattle · Wealth',
    element: 'Fire',
    meaning: 'Unbounded abundance, kinetic energy, and generative creative fire.',
    incantation: 'Fehu ignites the dormant embers of prosperity.'
  },
  {
    glyph: 'ᚢ',
    name: 'Uruz',
    translation: 'Aurochs · Primal Strength',
    element: 'Earth',
    meaning: 'Untamed vitality, resilience, and unyielding fortitude through adversity.',
    incantation: 'Uruz channels the unyielding titan within.'
  },
  {
    glyph: 'ᚦ',
    name: 'Thurisaz',
    translation: 'Thorn · Sacred Barrier',
    element: 'Fire',
    meaning: 'Protective ward, catalytic tension, and piercing through illusions.',
    incantation: 'Thurisaz pierces the veil of mortal hesitation.'
  },
  {
    glyph: 'ᚫ',
    name: 'Ansuz',
    translation: 'Divine Breath · Voice',
    element: 'Air',
    meaning: 'Ancestral wisdom, celestial transmission, and eloquence of truth.',
    incantation: 'Ansuz unlocks celestial harmony and inspired vision.'
  },
  {
    glyph: 'ᚱ',
    name: 'Raido',
    translation: 'Chariot · Journey',
    element: 'Air',
    meaning: 'Cyclic progression, righteous action, and traveling the cosmic path.',
    incantation: 'Raido aligns thy footsteps with celestial destiny.'
  },
  {
    glyph: 'ᚲ',
    name: 'Kenaz',
    translation: 'Torch · Illumination',
    element: 'Fire',
    meaning: 'Artisan craft, sudden insight, and revelation cutting through gloom.',
    incantation: 'Kenaz dispels shadow with brilliant creative craft.'
  },
  {
    glyph: 'ᚷ',
    name: 'Gebo',
    translation: 'Gift · Sacred Bond',
    element: 'Air',
    meaning: 'Mutual honor, generous alliances, and divine exchange of energy.',
    incantation: 'Gebo weaves sacred balance between giving and receiving.'
  },
  {
    glyph: 'ᚹ',
    name: 'Wunjo',
    translation: 'Joy · Fellowship',
    element: 'Earth',
    meaning: 'Harmony of desire and reality, celebration, and spiritual kinship.',
    incantation: 'Wunjo descends like morning dew upon the spirit.'
  },
  {
    glyph: 'ᚺ',
    name: 'Hagalaz',
    translation: 'Hail · Cosmic Crucible',
    element: 'Water',
    meaning: 'Radical upheaval, purifying storms, and the seed of liberation.',
    incantation: 'Hagalaz dissolves obsolete anchors into raw aether.'
  },
  {
    glyph: 'ᛋ',
    name: 'Sowilo',
    translation: 'Sun Wheel · Victory',
    element: 'Fire',
    meaning: 'Total triumph, radiant vitality, and celestial light banishing darkness.',
    incantation: 'Sowilo crowns thy noble purpose with solar triumph.'
  },
  {
    glyph: 'ᛏ',
    name: 'Tiwaz',
    translation: 'The Spear · Celestial Justice',
    element: 'Air',
    meaning: 'Unshakable courage, self-sacrifice for high ideals, and true victory.',
    incantation: 'Tiwaz guides the straight arrow through fog and storm.'
  },
  {
    glyph: 'ᛉ',
    name: 'Algiz',
    translation: 'Elk · Sanctuary',
    element: 'Water',
    meaning: 'Impenetrable astral ward, higher guidance, and divine protection.',
    incantation: 'Algiz erects an impenetrable aegis of starlight.'
  },
  {
    glyph: 'ᛒ',
    name: 'Berkana',
    translation: 'Birch · Rebirth',
    element: 'Earth',
    meaning: 'Nurturing growth, secret fertile dreams, and renewal of life.',
    incantation: 'Berkana breathes vital green breath into sacred dreams.'
  },
  {
    glyph: 'ᛖ',
    name: 'Ehwaz',
    translation: 'Steed · Swift Flight',
    element: 'Earth',
    meaning: 'Harmonious cooperation, swift progress, and shared spiritual pilgrimage.',
    incantation: 'Ehwaz carries thy ambition across astral plains.'
  },
  {
    glyph: 'ᛚ',
    name: 'Laguz',
    translation: 'Deep Waters · Intuition',
    element: 'Water',
    meaning: 'The lunar tide, fluid adaptation, and occult knowing through feeling.',
    incantation: 'Laguz purifies the chalice and opens deep sight.'
  },
  {
    glyph: 'ᛞ',
    name: 'Dagaz',
    translation: 'Dawn · Awakening',
    element: 'Fire',
    meaning: 'Paradoxical breakthrough, morning light, and instantaneous transformation.',
    incantation: 'Dagaz transmutes midnight crucible into radiant day.'
  }
];

export const drawRuneSpread = (sign = null) => {
  const shuffled = [...DIVINATION_RUNES].sort(() => 0.5 - Math.random());
  const spread = [
    { position: 'Past Origin', ...shuffled[0] },
    { position: 'Present Crucible', ...shuffled[1] },
    { position: 'Destiny Outcome', ...shuffled[2] }
  ];

  // Pick or assign spell rune based on sign or random
  let spellRune = shuffled[3] || shuffled[0];
  if (sign && sign.element) {
    const matched = DIVINATION_RUNES.find(r => r.element.toLowerCase() === sign.element.label.toLowerCase());
    if (matched) spellRune = matched;
  }

  return {
    spread,
    spellRune: {
      ...spellRune,
      signBonus: sign ? `${sign.name} Affinity` : 'Cosmic Resonance'
    }
  };
};

/* ============================================================
   Stage 5: 100-Sided Dice (d100) Roll for Fate
   ============================================================ */
export const rollD100Fate = (sign = null) => {
  const roll = Math.floor(Math.random() * 100) + 1; // 1 to 100

  let tier, title, omen, blessing;
  if (roll >= 95) {
    tier = 'Critical Celestial Triumph';
    title = 'Apotheosis of the Stars';
    omen = 'The firmament splits open; divine favor manifests instantaneously. Whatever you undertake tonight is touched with miraculous perfection.';
    blessing = '+100% Celestial Harmony · Automatic Prophetic Success';
  } else if (roll >= 75) {
    tier = 'Auspicious Fortune';
    title = 'The Golden Transit';
    omen = 'Benefic planetary aspects beam directly onto your path. Hidden opportunities and unexpected allies step forward from the shadows.';
    blessing = '+50% Solar Radiance · Auspicious Momentum';
  } else if (roll >= 45) {
    tier = 'Equinox Equilibrium';
    title = 'The Measured Balance';
    omen = 'The cosmic scales remain poised in perfect symmetry. Deliberate, conscious choice holds the key to tipping reality in your favor.';
    blessing = '+25% Lunar Insight · Clear Discernment';
  } else if (roll >= 15) {
    tier = 'Shadow Crucible';
    title = 'The Trial of Fortitude';
    omen = 'The stars test your inner resolve. Treat incoming friction not as a barrier, but as the whetstone refining your cosmic blade.';
    blessing = 'Tempered Endurance · Transmutation of Doubt';
  } else {
    tier = 'Chaotic Eclipse';
    title = 'Purification of the Void';
    omen = 'Ancient structures crumble to clear fertile ground for a radical rebirth. Surrender what is obsolete; phoenix fire awaits.';
    blessing = 'Total Karmic Rebirth · Clean Astral Slate';
  }

  return {
    roll,
    tier,
    title,
    omen,
    blessing,
    signName: sign ? sign.name : 'The Cosmic Seeker',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
};
