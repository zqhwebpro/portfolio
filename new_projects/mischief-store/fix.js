const fs = require('fs');
const file = 'c:/Users/zqhwe/OneDrive/Desktop/Art/portfolio-git/portfolio/new_projects/mischief-store/index.html';
let content = fs.readFileSync(file, 'utf8');

const cutOffStr = "            document.getElementById('pm-price').innerText = '";
const cutOffIndex = content.indexOf(cutOffStr);

if (cutOffIndex !== -1) {
    const startOfGoodCode = content.substring(0, cutOffIndex);
    
    // Find where the orphaned block starts
    const orphanStartStr = " + prod.price.toFixed(2);";
    const orphanStartIndex = content.indexOf(orphanStartStr);
    
    if (orphanStartIndex !== -1) {
        const orphanBlock = content.substring(orphanStartIndex);
        
        // Let's assemble it
        const replacement = "            document.getElementById('pm-price').innerText = '$'" + orphanBlock;
        
        const finalContent = startOfGoodCode + replacement;
        fs.writeFileSync(file, finalContent);
        console.log('Fixed index.html successfully!');
    } else {
        console.log('Could not find orphan start');
    }
} else {
    console.log('Could not find cutoff');
}
