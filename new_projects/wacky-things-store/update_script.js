const fs = require('fs');
let s = fs.readFileSync('script.js', 'utf8');

// 1. Fix Image
s = s.replace(/https:\/\/images\.unsplash\.com\/photo-1548839140-29a749e1bc4e\?auto=format&fit=crop&w=600&q=80/g, 'https://images.unsplash.com/photo-1546377791-bebc64f4340d?auto=format&fit=crop&w=600&q=80');

// 2. Fix game speed in script.js
s = s.replace(/let speed = 50;/g, 'let speed = 20;');
s = s.replace(/const minJumps = 40;/g, 'const minJumps = 20;');
s = s.replace(/const maxJumps = 60 \+ Math\.floor\(Math\.random\(\) \* 20\);/g, 'const maxJumps = 30 + Math.floor(Math.random() * 10);');

// 3. Fix button not being disabled when closing minigame in script.js
let closeModalRegex = /const cornerBtn = document\.getElementById\('wacky-corner-toggle'\);\s*if \(cornerBtn && window\.minigamePlayed\) \{\s*cornerBtn\.classList\.add\('opacity-50', 'pointer-events-none', 'grayscale'\);\s*\}/g;
s = s.replace(closeModalRegex, '');

// 4. Fix updateThemeUI stroke color in script.js
s = s.replace(/path\.setAttribute\('stroke', '#14B8A6'\);/g, "path.setAttribute('stroke', '#6B21A8');");
s = s.replace(/path\.setAttribute\('stroke', '#0D9488'\);/g, "path.setAttribute('stroke', '#4C1D95');");

fs.writeFileSync('script.js', s);

// Now do index.html
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/https:\/\/images\.unsplash\.com\/photo-1548839140-29a749e1bc4e\?auto=format&fit=crop&w=600&q=80/g, 'https://images.unsplash.com/photo-1546377791-bebc64f4340d?auto=format&fit=crop&w=600&q=80');
html = html.replace(/let speed = 50;/g, 'let speed = 20;');
html = html.replace(/const minJumps = 40;/g, 'const minJumps = 20;');
html = html.replace(/const maxJumps = 60 \+ Math\.floor\(Math\.random\(\) \* 20\);/g, 'const maxJumps = 30 + Math.floor(Math.random() * 10);');
html = html.replace(closeModalRegex, '');
html = html.replace(/path\.setAttribute\('stroke', '#14B8A6'\);/g, "path.setAttribute('stroke', '#6B21A8');");
html = html.replace(/path\.setAttribute\('stroke', '#0D9488'\);/g, "path.setAttribute('stroke', '#4C1D95');");
html = html.replace(/stroke="#6B21A8"/g, 'stroke="#6B21A8"'); // Wait, the default stroke is already "#6B21A8" in index.html line 3308?

// Wait, the default stroke in index.html was stroke="#6B21A8".
// Let's explicitly replace #6B21A8 if it was something else, but it was already #6B21A8! The issue was updateThemeUI changing it to Teal.

fs.writeFileSync('index.html', html);
console.log('Edits applied successfully!');
