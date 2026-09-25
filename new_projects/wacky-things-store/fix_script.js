const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');
code = code.replace(
  '// Explicitly show the corner button in case it was hidden\\n                const cornerBtn = document.getElementById(\\'wacky-corner-toggle\\');\\n                if (cornerBtn) {\\n                    cornerBtn.classList.remove(\\'hidden\\');\\n                    cornerBtn.style.display = \\'flex\\';',
  '// Explicitly show the corner button in case it was hidden, UNLESS minigame was played\\n                const cornerBtn = document.getElementById(\\'wacky-corner-toggle\\');\\n                if (cornerBtn && !window.minigamePlayed) {\\n                    cornerBtn.classList.remove(\\'hidden\\');\\n                    cornerBtn.style.display = \\'flex\\';'
);
fs.writeFileSync('script.js', code);
