const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// 1. Add lights to luck-sq
c = c.replace(/class="luck-sq aspect-square/g, 'class="luck-sq relative aspect-square');
c = c.replace(/data-prize-idx="(\d+)">([^<]+)(<br\/>[^<]+)?<\/div>/g, (m, idx, t1, t2) => {
    return `data-prize-idx="${idx}">
                    <div class="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-teal-300 opacity-20 transition-all duration-300 sq-bulb"></div>
                    <div class="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-teal-300 opacity-20 transition-all duration-300 sq-bulb"></div>
                    <div class="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-teal-300 opacity-20 transition-all duration-300 sq-bulb"></div>
                    <div class="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-teal-300 opacity-20 transition-all duration-300 sq-bulb"></div>
                    <span class="relative z-10">${t1}${t2 || ''}</span>
                </div>`;
});

// 2. Hide corner toggle if played before
c = c.replace(/window\.toggleViewStoreBlog = function \(forceTarget\) \{/g, `window.toggleViewStoreBlog = function (forceTarget) {`);
c = c.replace(
    /if \(window\.currentView === 'store'\) \{\n\s*cornerBtn\.classList\.add\('hidden'\);\n\s*\} else \{\n\s*cornerBtn\.classList\.remove\('hidden'\);\n\s*\}/g,
    `if (window.currentView === 'store' || window.minigamePlayed) {\n                cornerBtn.classList.add('hidden');\n            } else {\n                cornerBtn.classList.remove('hidden');\n            }`
);

// 3. Mark minigame as played in triggerMinigame
c = c.replace(/window\.triggerMinigame = function \(\) \{/, `window.triggerMinigame = function () {\n            window.minigamePlayed = true;`);

// 4. Update corner button color to dark purple
c = c.replace(/stroke="#0D9488"/g, `stroke="#6B21A8"`);
c = c.replace(/<stop offset="0%" stop-color="#0F766E" \/>/g, `<stop offset="0%" stop-color="#4C1D95" />`);
c = c.replace(/<stop offset="60%" stop-color="#0D9488" \/>/g, `<stop offset="60%" stop-color="#6B21A8" />`);
c = c.replace(/<stop offset="100%" stop-color="#14B8A6" \/>/g, `<stop offset="100%" stop-color="#9333EA" />`);

// 5. Update active-sq lights logic in CSS
c = c.replace(/<style>/, `<style>\n        .luck-sq.active-sq .sq-bulb { opacity: 1; box-shadow: 0 0 10px #5EEAD4; background-color: #5EEAD4; }`);

fs.writeFileSync('index.html', c);
console.log('updated index.html');
