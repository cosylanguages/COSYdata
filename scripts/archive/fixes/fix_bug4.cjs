const fs = require('fs');
const path = require('path');

function getJsonFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(getJsonFiles(fullPath));
    } else if (item.endsWith('.json') && item !== 'index.json') {
      results.push(fullPath);
    }
  }
  return results;
}

function main() {
  const vocabDir = path.join(__dirname, '..', 'vocabulary', 'en');
  const files = getJsonFiles(vocabDir);
  let count = 0;

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('as in in ')) {
      const matches = (content.match(/as in in /g) || []).length;
      content = content.replace(/as in in /g, 'as in ');
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Replaced ${matches} occurrence(s) of "as in in " in ${file}`);
      count += matches;
    }
  }

  console.log(`Total replaced occurrences: ${count}`);
}

main();
