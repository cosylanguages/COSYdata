import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LIGHTWEIGHT_FIELDS = ['id', 'word', 'emoji', 'level', 'form', 'theme', 'domain', 'tags'];

function getJsonFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getJsonFiles(fullPath));
    } else if (
      item.endsWith('.json') &&
      item !== 'index.json' &&
      item !== 'flat-index.json' &&
      item !== 'search-index.json' &&
      !item.endsWith('-tracks.json')
    ) {
      results.push(fullPath);
    }
  }
  return results;
}

function buildSearchIndexForLanguage(langDir) {
  const files = getJsonFiles(langDir);
  const searchEntries = [];
  const seenIds = new Set();

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
        if (seenIds.has(entry.id)) continue;
        seenIds.add(entry.id);

        const lightweightEntry = {};
        for (const field of LIGHTWEIGHT_FIELDS) {
          if (entry[field] !== undefined) {
            lightweightEntry[field] = entry[field];
          }
        }
        searchEntries.push(lightweightEntry);
      }
    } catch (err) {
      console.error(`Error reading ${filePath}: ${err.message}`);
      process.exit(1);
    }
  }

  // Sort entries deterministically by ID
  searchEntries.sort((a, b) => a.id.localeCompare(b.id));

  const outputPath = path.join(langDir, 'search-index.json');
  fs.writeFileSync(outputPath, JSON.stringify(searchEntries, null, 2) + '\n', 'utf8');
  console.log(
    `Updated ${path.relative(path.join(__dirname, '..'), outputPath)} with ${searchEntries.length} lightweight entry/entries.`
  );
}

function main() {
  const vocabDir = path.join(__dirname, '..', 'vocabulary');
  if (!fs.existsSync(vocabDir)) return;

  const langDirs = fs
    .readdirSync(vocabDir)
    .map((item) => path.join(vocabDir, item))
    .filter((item) => fs.statSync(item).isDirectory());

  for (const langDir of langDirs) {
    buildSearchIndexForLanguage(langDir);
  }
}

main();
