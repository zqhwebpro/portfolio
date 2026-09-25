const fs = require('fs');

const file = 'c:/Users/zqhwe/OneDrive/Desktop/Art/portfolio-git/portfolio/new_projects/wacky-things-store/index.html';
let content = fs.readFileSync(file, 'utf8');

// Replace corner button text fill and shadow to light purple
content = content.replace(/fill="#0F766E"/g, 'fill="#D8B4FE"');
content = content.replace(/fill="#CCFBF1"/g, 'fill="#F3E8FF"');
content = content.replace(/text-shadow: 1px 1px 0px #CCFBF1/g, 'text-shadow: 1px 1px 0px #F3E8FF');

fs.writeFileSync(file, content);
console.log('Fixed corner button colors!');

