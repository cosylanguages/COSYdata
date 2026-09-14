const fs = require('fs');
const path = require('path');

function main() {
  const vocabDir = path.join(__dirname, '..', 'vocabulary');

  if (!fs.existsSync(vocabDir)) {
    console.log('No vocabulary directory found.');
    return;
  }

  const langDirs = fs
    .readdirSync(vocabDir)
    .map((item) => path.join(vocabDir, item))
    .filter((item) => fs.statSync(item).isDirectory());

  for (const langDir of langDirs) {
    const lang = path.basename(langDir);
    const indexMap = {};

    const files = fs
      .readdirSync(langDir)
      .filter((file) => file.endsWith('.json') && file !== 'index.json');

    for (const file of files) {
      const filePath = path.join(langDir, file);
      try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const entries = Array.isArray(content)
          ? content
          : typeof content === 'object' && content !== null && content.id
          ? [content]
          : typeof content === 'object' && content !== null
          ? Object.values(content)
          : [];

        for (const entry of entries) {
          if (entry && entry.id) {
            indexMap[entry.id] = file;
          }
        }
      } catch (err) {
        console.error(`Error reading ${filePath}: ${err.message}`);
        process.exit(1);
      }
    }

    // Sort keys alphabetically for deterministic output
    const sortedMap = {};
    Object.keys(indexMap)
      .sort()
      .forEach((key) => {
        sortedMap[key] = indexMap[key];
      });

    const indexPath = path.join(langDir, 'index.json');
    fs.writeFileSync(indexPath, JSON.stringify(sortedMap, null, 2) + '\n', 'utf8');
    console.log(`Updated ${path.relative(path.join(__dirname, '..'), indexPath)} with ${Object.keys(sortedMap).length} entry/entries.`);
  }
}

main();
