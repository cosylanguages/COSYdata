const fs = require('fs');
const path = require('path');

function slugify(text) {
  return text
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
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getJsonFiles(fullPath));
    } else if (item.endsWith('.json') && item !== 'index.json' && item !== 'flat-index.json') {
      results.push(fullPath);
    }
  }
  return results;
}

function buildIndexForCategory(categoryDirName) {
  const categoryDir = path.join(__dirname, '..', categoryDirName);

  if (!fs.existsSync(categoryDir)) {
    return;
  }

  const langDirs = fs
    .readdirSync(categoryDir)
    .map((item) => path.join(categoryDir, item))
    .filter((item) => fs.statSync(item).isDirectory());

  for (const langDir of langDirs) {
    const indexMap = {};

    const files = getJsonFiles(langDir);

    for (const filePath of files) {
      const relativePath = path.relative(langDir, filePath).replace(/\\/g, '/');
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
            // Validate slug format
            const parts = entry.id.split(':');
            if (parts.length >= 2 && entry.word) {
              const currentSlug = parts[1];
              const expectedSlug = slugify(entry.word);
              if (currentSlug.includes('--')) {
                console.warn(`[WARNING] Malformed multi-hyphen slug in ${entry.id} (word: "${entry.word}")`);
              }
            }
            indexMap[entry.id] = relativePath;
          }
        }
      } catch (err) {
        console.error(`Error reading ${filePath}: ${err.message}`);
        process.exit(1);
      }
    }

    if (Object.keys(indexMap).length === 0) {
      continue;
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

function main() {
  const categories = ['vocabulary', 'functional-phrases', 'curriculum'];
  for (const cat of categories) {
    buildIndexForCategory(cat);
  }
}

main();
