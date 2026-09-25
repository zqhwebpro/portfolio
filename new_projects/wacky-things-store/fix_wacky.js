const fs = require('fs');

const file = 'c:/Users/zqhwe/OneDrive/Desktop/Art/portfolio-git/portfolio/new_projects/wacky-things-store/index.html';
let content = fs.readFileSync(file, 'utf8');

// Replace honey with teal
content = content.replace(/honey-/g, 'teal-');

// Add more bulbs to the squares
const squareRegex = /(<div class="luck-sq[^>]*>)([\s\S]*?)(<span class="relative z-10">[^<]+<\/span>\s*<\/div>)/g;
content = content.replace(squareRegex, (match, p1, p2, p3) => {
    const newBulbs = '<div class="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 opacity-20 transition-all duration-300 sq-bulb"></div>' +
        '<div class="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-400 opacity-20 transition-all duration-300 sq-bulb"></div>' +
        '<div class="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 opacity-20 transition-all duration-300 sq-bulb"></div>' +
        '<div class="absolute top-1/2 -translate-y-1/2 left-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 opacity-20 transition-all duration-300 sq-bulb"></div>' +
        '<div class="absolute top-1/2 -translate-y-1/2 right-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 opacity-20 transition-all duration-300 sq-bulb"></div>' +
        '<div class="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 opacity-20 transition-all duration-300 sq-bulb"></div>' +
        '<div class="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-400 opacity-20 transition-all duration-300 sq-bulb"></div>' +
        '<div class="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 opacity-20 transition-all duration-300 sq-bulb"></div>';
    return p1 + '\n                      ' + newBulbs + '\n                      ' + p3;
});

// Update the TRY AGAIN TOMORROW text inside the square spans to "Try again<br/>tomorrow"
content = content.replace(/TRY AGAIN<br\/>TOMORROW/g, 'Try again<br/>tomorrow');
content = content.replace(/data-prize="TRY AGAIN TOMORROW"/g, 'data-prize="Try again tomorrow"');

fs.writeFileSync(file, content);
console.log('Fixed html!');

const scriptFile = 'c:/Users/zqhwe/OneDrive/Desktop/Art/portfolio-git/portfolio/new_projects/wacky-things-store/script.js';
let sContent = fs.readFileSync(scriptFile, 'utf8');
sContent = sContent.replace(/"TRY AGAIN TOMORROW"/g, '"Try again tomorrow"');
sContent = sContent.replace(/'TRY AGAIN TOMORROW'/g, "'Try again tomorrow'");

fs.writeFileSync(scriptFile, sContent);
console.log('Fixed script!');

