const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

let marker = `    <!-- BLOG POST READER MODAL -->`;
let modalIdx = c.indexOf(marker);

if (modalIdx !== -1) {
    let endOfModal = c.indexOf('    </body></html>">', modalIdx);
    if (endOfModal !== -1) {
        let newContent = c.substring(0, endOfModal) + '</body>\n</html>\n';
        fs.writeFileSync('index.html', newContent);
        console.log('File trimmed safely!');
    } else {
        console.log('End of modal not found.');
    }
} else {
    console.log('Modal not found.');
}
