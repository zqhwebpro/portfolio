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
