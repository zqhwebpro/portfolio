export const ZODIAC_SIGNS = [
  {
    id: 'aries',
    name: 'Aries',
    title: 'The Celestial Ram',
    symbol: '♈',
    element: 'Fire',
    planet: 'Mars ♂',
    house: 'I House of Self',
    dates: 'Mar 21 - Apr 19',
    color: '#ff4b82',
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
    element: 'Earth',
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
    element: 'Air',
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
    element: 'Water',
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
    element: 'Fire',
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
    element: 'Earth',
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
    element: 'Air',
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
    element: 'Water',
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
    element: 'Fire',
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
    element: 'Earth',
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
    element: 'Air',
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
    element: 'Water',
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

/* ============================================================
   Stage 2: Goal-Oriented Horoscope Quests
   Replaces generic fortunes with empowering celestial goals
   ============================================================ */
export const HOROSCOPE_GOALS = [
  {
    questTitle: 'The Citadel of Will',
    cosmicImpetus: 'Mars forms an ascendant conjunction with the solar core, generating unprecedented kinetic momentum.',
    goalMilestone: 'Draft the master blueprint of your most ambitious vision and complete the first concrete milestone within three solar days.',
    cosmicOath: 'I command my creative willpower without hesitation. Obstacles transform into stepping stones of mastery.',
    horizonWindow: 'Peak Power: Next 72 Hours',
    aspectLabel: 'Trine to Midheaven'
  },
  {
    questTitle: 'The Horizon Concord',
    cosmicImpetus: 'Jupiter sextiles the intellectual nexus of Mercury, revealing unexpected strategic pathways across your sphere.',
    goalMilestone: 'Initiate the crucial alliance or bold proposal you have delayed. Speak your definitive terms with clear authority.',
    cosmicOath: 'My voice carries sovereign weight. I forge alliances grounded in mutual honor and shared purpose.',
    horizonWindow: 'Optimal Window: Before the Crescent Phase',
    aspectLabel: 'Eleventh House Resonance'
  },
  {
    questTitle: 'The Alchemical Crucible',
    cosmicImpetus: 'Pluto retrogrades through your sector of transformation, burning away outworn patterns of self-limitation.',
    goalMilestone: 'Purge one major distraction or obsolete habit immediately to liberate mental bandwidth for your true magnum opus.',
    cosmicOath: 'I surrender the lesser to claim the magnificent. The ashes of yesterday nourish my sovereign dawn.',
    horizonWindow: 'Critical Window: Next 48 Hours',
    aspectLabel: 'Scorpio Phoenix Alignment'
  },
  {
    questTitle: 'The Fountain of Innovation',
    cosmicImpetus: 'Uranus electrifies the house of discovery, transmitting rare insights that defy conventional precedent.',
    goalMilestone: 'Prototype or build the unorthodox idea that excites you most, regardless of tradition or doubt.',
    cosmicOath: 'I pioneer untrodden paths. Originality is my celestial birthright and greatest weapon.',
    horizonWindow: 'Peak Alignment: Next 5 Days',
    aspectLabel: 'Aquarian Lightning Trine'
  },
  {
    questTitle: 'The Sovereign Equilibrium',
    cosmicImpetus: 'Venus enters the house of contracts and balance, offering golden leverage in negotiation and creative harmony.',
    goalMilestone: 'Resolve an outstanding imbalance in your daily routine and establish a non-negotiable boundary around your focus hours.',
    cosmicOath: 'I guard my creative energy as a consecrated flame. Balance generates enduring victory.',
    horizonWindow: 'Harmonic Window: Next 96 Hours',
    aspectLabel: 'Golden Ratio Confluence'
  },
  {
    questTitle: 'The Anchor of Mastery',
    cosmicImpetus: 'Saturn trines the celestial north node, rewarding meticulous craftsmanship and deliberate patience.',
    goalMilestone: 'Dedicate two uninterrupted hours to master the technical detail that separates amateur effort from legendary execution.',
    cosmicOath: 'Patience is my supreme strategy. What I construct with deliberate precision shall endure for epochs.',
    horizonWindow: 'Sovereign Window: Current Lunar Cycle',
    aspectLabel: 'Tenth House Aegis'
  },
  {
    questTitle: 'The Oceanic Vision',
    cosmicImpetus: 'Neptune illuminates your deep intuitive center, dissolving the veil between dream vision and reality.',
    goalMilestone: 'Record your clearest nocturnal revelation upon waking and translate its symbolic core into your current project.',
    cosmicOath: 'I navigate with deep instinct where mortal logic falters. The current carries me toward rightful dominion.',
    horizonWindow: 'Intuitive Window: Nocturnal Transit',
    aspectLabel: 'Mystic Pisces Confluence'
  },
  {
    questTitle: 'The Hearth of Fortitude',
    cosmicImpetus: 'The Moon crowns your foundation sector, replenishing the deep emotional wells from which all greatness flows.',
    goalMilestone: 'Fortify your immediate workspace into a sacred sanctuary of deep work, free from noise and intrusion.',
    cosmicOath: 'My center remains serene amid external tempests. Inner stillness is my impenetrable fortress.',
    horizonWindow: 'Sanctuary Window: Current Waxing Moon',
    aspectLabel: 'Fourth House Bastion'
  }
];

export const getRandomGoal = (sign = null) => {
  const pool = HOROSCOPE_GOALS;
  const item = pool[Math.floor(Math.random() * pool.length)];
  return {
    ...item,
    signAffinity: sign ? sign.name : 'The Cosmic Seeker',
    signElement: sign ? sign.element : 'Aether'
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
    upright: 'Channel bold initiative and unyielding resolve. You are the architect of your own realm. Forge sovereign order from raw cosmic chaos.',
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
    advice: 'Harmonize polarities; divine synthesis is born of patient persistence.'
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
    translation: 'Wealth and Generative Fire',
    element: 'Fire',
    meaning: 'Unbounded abundance, kinetic energy, and generative creative fire.',
    incantation: 'Fehu ignites the dormant embers of prosperity.'
  },
  {
    glyph: 'ᚢ',
    name: 'Uruz',
    translation: 'Primal Vitality and Fortitude',
    element: 'Earth',
    meaning: 'Untamed vitality, resilience, and unyielding fortitude through adversity.',
    incantation: 'Uruz channels the unyielding titan within.'
  },
  {
    glyph: 'ᚦ',
    name: 'Thurisaz',
    translation: 'Sacred Gateway and Defense',
    element: 'Fire',
    meaning: 'Protective ward, catalytic tension, and piercing through illusions.',
    incantation: 'Thurisaz pierces the veil of mortal hesitation.'
  },
  {
    glyph: 'ᚫ',
    name: 'Ansuz',
    translation: 'Divine Breath and Wisdom',
    element: 'Air',
    meaning: 'Ancestral wisdom, celestial transmission, and eloquence of truth.',
    incantation: 'Ansuz unlocks celestial harmony and inspired vision.'
  },
  {
    glyph: 'ᚱ',
    name: 'Raido',
    translation: 'The Celestial Journey',
    element: 'Air',
    meaning: 'Cyclic progression, righteous action, and traveling the cosmic path.',
    incantation: 'Raido aligns thy footsteps with celestial destiny.'
  },
  {
    glyph: 'ᚲ',
    name: 'Kenaz',
    translation: 'Torch of Revelation',
    element: 'Fire',
    meaning: 'Artisan craft, sudden insight, and revelation cutting through gloom.',
    incantation: 'Kenaz dispels shadow with brilliant creative craft.'
  },
  {
    glyph: 'ᚷ',
    name: 'Gebo',
    translation: 'Sacred Bond and Honor',
    element: 'Air',
    meaning: 'Mutual honor, generous alliances, and divine exchange of energy.',
    incantation: 'Gebo weaves sacred balance between giving and receiving.'
  },
  {
    glyph: 'ᚹ',
    name: 'Wunjo',
    translation: 'Fulfillment and Harmony',
    element: 'Earth',
    meaning: 'Harmony of desire and reality, celebration, and spiritual kinship.',
    incantation: 'Wunjo descends like morning dew upon the spirit.'
  },
  {
    glyph: 'ᚺ',
    name: 'Hagalaz',
    translation: 'Purifying Transformation',
    element: 'Water',
    meaning: 'Radical upheaval, purifying storms, and the seed of liberation.',
    incantation: 'Hagalaz dissolves obsolete anchors into raw aether.'
  },
  {
    glyph: 'ᛋ',
    name: 'Sowilo',
    translation: 'Sun Wheel and Victory',
    element: 'Fire',
    meaning: 'Total triumph, radiant vitality, and celestial light banishing darkness.',
    incantation: 'Sowilo crowns thy noble purpose with solar triumph.'
  },
  {
    glyph: 'ᛏ',
    name: 'Tiwaz',
    translation: 'The Spear of Justice',
    element: 'Air',
    meaning: 'Unshakable courage, self-sacrifice for high ideals, and true victory.',
    incantation: 'Tiwaz guides the straight arrow through fog and storm.'
  },
  {
    glyph: 'ᛉ',
    name: 'Algiz',
    translation: 'Divine Shield and Sanctuary',
    element: 'Water',
    meaning: 'Impenetrable astral ward, higher guidance, and divine protection.',
    incantation: 'Algiz erects an impenetrable aegis of starlight.'
  },
  {
    glyph: 'ᛒ',
    name: 'Berkana',
    translation: 'Regeneration and Birch',
    element: 'Earth',
    meaning: 'Nurturing growth, secret fertile dreams, and renewal of life.',
    incantation: 'Berkana breathes vital green breath into sacred dreams.'
  },
  {
    glyph: 'ᛖ',
    name: 'Ehwaz',
    translation: 'Sacred Steed and Flight',
    element: 'Earth',
    meaning: 'Harmonious cooperation, swift progress, and shared spiritual pilgrimage.',
    incantation: 'Ehwaz carries thy ambition across astral plains.'
  },
  {
    glyph: 'ᛚ',
    name: 'Laguz',
    translation: 'Deep Water and Intuition',
    element: 'Water',
    meaning: 'The lunar tide, fluid adaptation, and occult knowing through feeling.',
    incantation: 'Laguz purifies the chalice and opens deep sight.'
  },
  {
    glyph: 'ᛞ',
    name: 'Dagaz',
    translation: 'The Radiant Dawn',
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

  let spellRune = shuffled[3] || shuffled[0];
  if (sign && sign.element) {
    const matched = DIVINATION_RUNES.find(r => r.element.toLowerCase() === sign.element.toLowerCase());
    if (matched) spellRune = matched;
  }

  return {
    spread,
    spellRune: {
      ...spellRune,
      signBonus: sign ? `${sign.name} Resonance` : 'Universal Compass'
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
    omen = 'The firmament splits open; divine favor manifests instantaneously. Whatever goal you undertake tonight is touched with miraculous perfection.';
    blessing = 'Total Celestial Harmony. Automatic Prophetic Success';
  } else if (roll >= 75) {
    tier = 'Auspicious Fortune';
    title = 'The Golden Transit';
    omen = 'Benefic planetary aspects beam directly onto your path. Hidden opportunities and unexpected allies step forward from the shadows.';
    blessing = 'Solar Radiance. Auspicious Forward Momentum';
  } else if (roll >= 45) {
    tier = 'Equinox Equilibrium';
    title = 'The Measured Balance';
    omen = 'The cosmic scales remain poised in perfect symmetry. Deliberate, conscious action holds the key to tipping reality in your favor.';
    blessing = 'Lunar Insight. Impartial Discernment';
  } else if (roll >= 15) {
    tier = 'Shadow Crucible';
    title = 'The Trial of Fortitude';
    omen = 'The stars test your inner resolve. Treat incoming friction not as a barrier, but as the whetstone refining your willpower.';
    blessing = 'Tempered Endurance. Transmutation of Doubt';
  } else {
    tier = 'Chaotic Eclipse';
    title = 'Purification of the Void';
    omen = 'Ancient structures crumble to clear fertile ground for a radical rebirth. Surrender what is obsolete; phoenix fire awaits.';
    blessing = 'Total Karmic Rebirth. Clean Astral Slate';
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
