const fs = require('fs');
let code = fs.readFileSync('src/components/SynthwaveDrive.jsx', 'utf8');

// Replace the popup map logic to use percentages
code = code.replace(/const w = dimensions\.w;[\s\n]*const h = dimensions\.h;[\s\n]*const horizonY = h \* 0\.55;[\s\n]*\/\/ 3D Road Sign Perspective Calculations[\s\n]*const progressY = Math\.pow\(p, 2\.5\);[\s\n]*const topPx = horizonY \+ progressY \* \(h - horizonY\);[\s\n]*\/\/ Start exactly at 0 scale at the horizon so it doesn't float above it[\s\n]*const scale = Math\.max\(0\.01, progressY \* 3\.0\);[\s\n]*\/\/ Fully opaque until it passes the camera[\s\n]*const opacity = p > 0\.85 \? Math\.max\(0, 1 - \(p - 0\.85\) \* 6\.6\) : 1;[\s\n]*const stemHeight = 20 \+ \(popup\.id % 150\); \/\/ Stem height between 20 and 170px[\s\n]*const stemWidth = 6;[\s\n]*\/\/ Calculate X position matching the pink perspective lines[\s\n]*const isLeft = \(popup\.number % 2\) === 0;[\s\n]*\/\/ Exact integer ensures the sign perfectly rides the magenta grid line i = -1 or i = 1[\s\n]*const lineIndex = isLeft \? -1 : 1; \/\/ User wants them ON the magenta line[\s\n]*const sunCenterX = w \* 0\.5;[\s\n]*const startX = sunCenterX \+ \(lineIndex \/ 26\) \* \(w \* 0\.05\);[\s\n]*const endX = sunCenterX \+ lineIndex \* \(w \* 0\.08\);[\s\n]*const currentX = startX \+ \(endX - startX\) \* progressY;[\s\n]*return \([\s\n]*<div[\s\n]*key=\{popup\.id\}[\s\n]*style=\{\{[\s\n]*position: 'absolute',[\s\n]*bottom: \\$\{h - topPx\}px\,[\s\n]*left: \\$\{currentX\}px\,[\s\n]*transform: \	ranslateX\(-50%\) scale\(\$\{scale\}\)\, \/\/ Origin at bottom center[\s\n]*transformOrigin: '50% 100%',/g,
\const progressY = Math.pow(p, 2.5);

        // Calculate Y as a percentage (horizon is 55%)
        const topPct = 55 + progressY * 45;

        // Scale starts extremely small at horizon
        const scale = Math.max(0.01, progressY * 3.0);
        const opacity = p > 0.85 ? Math.max(0, 1 - (p - 0.85) * 6.6) : 1;

        const stemHeight = 20 + (popup.id % 150);
        const stemWidth = 6;

        const isLeft = (popup.number % 2) === 0;
        // Place precisely between the center line and the first track line
        const lineIndex = isLeft ? -0.5 : 0.5; 

        // X starts at 50% (center) + offset
        const startX_pct = 50 + (lineIndex / 26) * 5;
        const endX_pct = 50 + lineIndex * 8;
        const currentX_pct = startX_pct + (endX_pct - startX_pct) * progressY;

        return (
          <div
            key={popup.id}
            style={{
              position: 'absolute',
              top: \\%\,
              left: \\%\,
              transform: \	ranslate(-50%, -100%) scale(\)\,
              transformOrigin: '50% 100%',\);

fs.writeFileSync('src/components/SynthwaveDrive.jsx', code);
console.log('done synth 2');
