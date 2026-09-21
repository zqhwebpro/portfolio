export const ZODIAC_SIGNS = [
  { id: 'aries', name: 'Aries', symbol: '♈', color: '#FF3333' },
  { id: 'taurus', name: 'Taurus', symbol: '♉', color: '#33FF77' },
  { id: 'gemini', name: 'Gemini', symbol: '♊', color: '#FFFF33' },
  { id: 'cancer', name: 'Cancer', symbol: '♋', color: '#DDDDFF' },
  { id: 'leo', name: 'Leo', symbol: '♌', color: '#FFAA33' },
  { id: 'virgo', name: 'Virgo', symbol: '♍', color: '#AAFF77' },
  { id: 'libra', name: 'Libra', symbol: '♎', color: '#FF77FF' },
  { id: 'scorpio', name: 'Scorpio', symbol: '♏', color: '#880000' },
  { id: 'sagittarius', name: 'Sagittarius', symbol: '♐', color: '#AA33FF' },
  { id: 'capricorn', name: 'Capricorn', symbol: '♑', color: '#555555' },
  { id: 'aquarius', name: 'Aquarius', symbol: '♒', color: '#33FFFF' },
  { id: 'pisces', name: 'Pisces', symbol: '♓', color: '#3333FF' }
];

const OVER_THE_TOP_FORTUNES = [
  "The ethereal weave unravels, revealing a path woven in starlight.",
  "Ancient cosmic energies converge; a hidden truth shall soon manifest.",
  "The celestial spheres align, granting you fragments of forgotten knowledge.",
  "A shadowy veil lifts—what was obscured by time now calls your name.",
  "Look beyond the mortal realm; your aura resonates with an ancient spirit.",
  "The astral currents shift violently. Ride the tide of fate or be swept away.",
  "An arcane doorway slowly opens. Step through with intent, not fear.",
  "Echoes of a past life guide your hand toward an impossible victory.",
  "The universe exhales a secret just for you. Listen to the silence.",
  "A constellation long thought dead flares to life to bless your journey."
];

export const getRandomFortune = () => {
  const randomIndex = Math.floor(Math.random() * OVER_THE_TOP_FORTUNES.length);
  return OVER_THE_TOP_FORTUNES[randomIndex];
};
