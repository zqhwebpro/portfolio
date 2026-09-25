const fs = require('fs');

const indexFile = 'c:/Users/zqhwe/OneDrive/Desktop/Art/portfolio-git/portfolio/new_projects/wacky-things-store/index.html';
const scriptFile = 'c:/Users/zqhwe/OneDrive/Desktop/Art/portfolio-git/portfolio/new_projects/wacky-things-store/script.js';

let indexContent = fs.readFileSync(indexFile, 'utf8');
indexContent = indexContent.replace(
    /const cornerBtn = document.getElementById\('wacky-corner-toggle'\);\s*if \(cornerBtn\) {/g,
    "const cornerBtn = document.getElementById('wacky-corner-toggle');\n                if (cornerBtn && !window.minigamePlayed) {"
);
fs.writeFileSync(indexFile, indexContent);

let scriptContent = fs.readFileSync(scriptFile, 'utf8');
scriptContent = scriptContent.replace(
    /const cornerBtn = document.getElementById\('wacky-corner-toggle'\);\s*if \(cornerBtn\) {/g,
    "const cornerBtn = document.getElementById('wacky-corner-toggle');\n                if (cornerBtn && !window.minigamePlayed) {"
);
fs.writeFileSync(scriptFile, scriptContent);
console.log('Fixed cornerBtn toggle!');
