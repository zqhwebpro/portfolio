const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');
let idx = c.indexOf('</footer>">');
if (idx !== -1) {
    let endIdx = c.indexOf('</footer>', idx + 10);
    if (endIdx !== -1) {
        c = c.substring(0, idx + 9) + c.substring(endIdx + 9);
        fs.writeFileSync('index.html', c);
        console.log('Fixed');
    }
}
