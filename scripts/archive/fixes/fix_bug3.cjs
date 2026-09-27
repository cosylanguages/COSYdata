const fs = require('fs');
const path = require('path');

function cleanSlug(word) {
  return word
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

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
  const vocabDir = path.join(__dirname, '..', 'vocabulary');
  const files = getJsonFiles(vocabDir);
  let updatedCount = 0;

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    let modified = false;

    if (Array.isArray(data)) {
      for (const entry of data) {
        if (!entry || !entry.id || !entry.word) continue;
        const parts = entry.id.split(':');
        if (parts.length < 3) continue;

        const lang = parts[0];
        const currentSlug = parts[1];
        const form = parts[2];

        const expectedSlug = cleanSlug(entry.word);
        if (currentSlug !== expectedSlug || entry.id.includes('--')) {
          const newId = `${lang}:${expectedSlug}:${form}`;
          console.log(`Updating ${file}: ${entry.id} -> ${newId} (word: "${entry.word}")`);
          entry.id = newId;
          modified = true;
          updatedCount++;
        }
      }
    }

    if (modified) {
      fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
    }
  }

  console.log(`Successfully updated ${updatedCount} entry IDs.`);
}

main();
