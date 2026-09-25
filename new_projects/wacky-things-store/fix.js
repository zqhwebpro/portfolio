const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf8');

js = js.replace(/sq\.classList\.add\('bg-appetite-500', 'border-appetite-300', 'scale-105', 'z-10', 'shadow-\[0_0_25px_rgba\(20,184,166,0\.8\)\]'\);/g, 
  "sq.classList.add('bg-appetite-500', 'border-appetite-300', 'scale-105', 'z-10', 'shadow-[0_0_25px_rgba(20,184,166,0.8)]', 'active-sq');");

js = js.replace(/s\.classList\.remove\('bg-appetite-500', 'border-appetite-300', 'scale-105', 'z-10'\);/g, 
  "s.classList.remove('bg-appetite-500', 'border-appetite-300', 'scale-105', 'z-10', 'active-sq');");

js = js.replace(/window\.currentWonCoupon = code;/g, 
  "window.currentWonCoupon = code;\n                            window.minigamePlayed = true;");

js = js.replace(/window\.closeMinigameModal\(\);\n\s*\}, 3000\);/g, 
  "window.minigamePlayed = true;\n                                window.closeMinigameModal();\n                            }, 3000);");

fs.writeFileSync('script.js', js);
