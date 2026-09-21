export const ZODIAC_SIGNS = [
  { id: 'aries', name: 'Aries', symbol: '♈', color: '#ff4b82' },
  { id: 'taurus', name: 'Taurus', symbol: '♉', color: '#33ffcc' },
  { id: 'gemini', name: 'Gemini', symbol: '♊', color: '#f3e6ff' },
  { id: 'cancer', name: 'Cancer', symbol: '♋', color: '#88ccff' },
  { id: 'leo', name: 'Leo', symbol: '♌', color: '#ffd166' },
  { id: 'virgo', name: 'Virgo', symbol: '♍', color: '#00ffea' },
  { id: 'libra', name: 'Libra', symbol: '♎', color: '#b366ff' },
  { id: 'scorpio', name: 'Scorpio', symbol: '♏', color: '#ff3366' },
  { id: 'sagittarius', name: 'Sagittarius', symbol: '♐', color: '#9d4edd' },
  { id: 'capricorn', name: 'Capricorn', symbol: '♑', color: '#7b2cbf' },
  { id: 'aquarius', name: 'Aquarius', symbol: '♒', color: '#00bbf9' },
  { id: 'pisces', name: 'Pisces', symbol: '♓', color: '#3a0ca3' }
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
