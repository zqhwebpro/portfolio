const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

// Replace active tile highlight
code = code.replace(/bg-amber-400/g, 'bg-purple-500');
code = code.replace(/border-amber-200/g, 'border-purple-300');
code = code.replace(/shadow-\[0_0_30px_rgba\(251,191,36,0\.8\)\]/g, 'shadow-[0_0_30px_rgba(168,85,247,0.8)]');

// Replace base tile shadow
code = code.replace(/shadow-\[0_0_15px_rgba\(20,184,166,0\.3\)\]/g, 'shadow-[0_0_15px_rgba(88,28,135,0.3)]');

fs.writeFileSync('script.js', code);
