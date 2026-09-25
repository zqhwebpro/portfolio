const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');
const searchStr = '</body></html>">';
const idx = c.indexOf(searchStr);
if (idx !== -1) {
    fs.writeFileSync('index.html', c.substring(0, idx) + '</body>\n</html>\n');
    console.log('File trimmed!');
} else {
    console.log('Not found');
}
