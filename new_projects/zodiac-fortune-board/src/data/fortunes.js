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
  "THE COSMOS DEMANDS YOU SEIZE CONTROL. YOUR ENERGY SURGES BEYOND MORTAL LIMITS TODAY.",
  "REALITY BENDS TO YOUR WILL. A FINANCIAL WINDFALL OR CATACLYSMIC EVENT IS IMMINENT.",
  "YOUR THIRD EYE IS WIDE OPEN. YOU WILL PERCEIVE THE TRUTH THAT OTHERS ARE TOO WEAK TO SEE.",
  "AN ANCIENT ENTITY SMILES UPON YOUR ENDEAVORS. GO FORTH AND CONQUER WITH MERCILESS GRACE.",
  "THE STARS HAVE ALIGNED TO VAPORIZE YOUR OBSTACLES. DO NOT HESITATE, DESTROY YOUR DOUBTS.",
  "A TREMENDOUS SURGE OF ASTRAL POWER AWAITS YOU. CHANNEL IT CAREFULLY OR BE CONSUMED.",
  "YOU ARE THE CHOSEN VESSEL OF CHAOS TODAY. EMBRACE THE UNPREDICTABLE AND REAP THE REWARDS.",
  "YOUR DESTINY IS WRITTEN IN SUPERNOVA FIRE. NOTHING CAN EXTINGUISH YOUR ASCENT.",
  "THE UNIVERSE WHISPERS SECRETS OF ABSOLUTE POWER INTO YOUR EAR. USE THEM TO FORGE YOUR EMPIRE.",
  "A PARADIGM SHIFT OF APOCALYPTIC PROPORTIONS WILL ELEVATE YOUR SPIRIT TO GODHOOD."
];

export const getRandomFortune = () => {
  const randomIndex = Math.floor(Math.random() * OVER_THE_TOP_FORTUNES.length);
  return OVER_THE_TOP_FORTUNES[randomIndex];
};
