import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

function buildFlatIndexForLanguage(langDir) {
  const files = getJsonFiles(langDir);
  const flatIndex = {};
  const TARGET_FIELDS = ['word', 'plural_form', 'comparative', 'superlative'];

  for (const filePath of files) {
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
        if (!entry || !entry.id) continue;

        for (const field of TARGET_FIELDS) {
          const val = entry[field];
          if (typeof val === 'string' && val.trim() !== '') {
            const surfaceForm = val.trim().toLowerCase();
            if (!flatIndex[surfaceForm]) {
              flatIndex[surfaceForm] = [];
            }
            const exists = flatIndex[surfaceForm].some(
              (item) => item.id === entry.id && item.field === field
            );
            if (!exists) {
              flatIndex[surfaceForm].push({ id: entry.id, field });
            }
          }
        }
      }
    } catch (err) {
      console.error(`Error reading ${filePath}: ${err.message}`);
      process.exit(1);
    }
  }

  const sortedMap = {};
  const sortedKeys = Object.keys(flatIndex).sort();

  for (const key of sortedKeys) {
    const sortedItems = flatIndex[key].sort((a, b) => {
      if (a.id !== b.id) return a.id.localeCompare(b.id);
      return a.field.localeCompare(b.field);
    });
    sortedMap[key] = sortedItems;
  }

  const outputPath = path.join(langDir, 'flat-index.json');
  fs.writeFileSync(outputPath, JSON.stringify(sortedMap, null, 2) + '\n', 'utf8');
  console.log(`Updated ${path.relative(path.join(__dirname, '..'), outputPath)} with ${sortedKeys.length} surface form(s).`);
}

function main() {
  const vocabDir = path.join(__dirname, '..', 'vocabulary');
  if (!fs.existsSync(vocabDir)) return;

  const langDirs = fs
    .readdirSync(vocabDir)
    .map((item) => path.join(vocabDir, item))
    .filter((item) => fs.statSync(item).isDirectory());

  for (const langDir of langDirs) {
    buildFlatIndexForLanguage(langDir);
  }
}

main();
