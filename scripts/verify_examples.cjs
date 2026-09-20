const fs = require('fs');
const path = require('path');

function normalizeText(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function getStems(word) {
  const norm = normalizeText(word.replace(/[-_]/g, ' ').trim());
  const words = norm.split(/\s+/).filter(w => w.length > 0);
  const stopWords = new Set(['der', 'die', 'das', 'el', 'la', 'los', 'las', 'le', 'les', 'un', 'una', 'ein', 'eine', 'o', 'a', 'os', 'as', 'al', 'ar', 'an']);

  const stems = [];
  for (const w of words) {
    if (stopWords.has(w) && words.length > 1) continue;
    stems.push(w);
    if (w.length > 4) {
      stems.push(w.slice(0, w.length - 2));
      stems.push(w.slice(0, w.length - 3));
    } else if (w.length > 3) {
      stems.push(w.slice(0, w.length - 1));
    }
  }
  return stems;
}

const templatePatterns = [
  /αυτο το αντικειμενο ειναι πολυ .* και ολοι το προσεχουν/i,
  /η λεξη .* χρησιμοποιειται συχνα στην καθημερινη ζωη/i,
  /ενοια που δηλωνει/i,
  /is a word used in daily life/i
];

function findJsonFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findJsonFiles(fullPath));
    } else if (item.endsWith('.json') && item !== 'index.json' && item !== 'flat-index.json' && !item.endsWith('-tracks.json')) {
      results.push(fullPath);
    }
  }
  return results;
}

function verifyExamples(targetLang) {
  const rootDir = path.join(__dirname, '..');
  const vocabDir = targetLang ? path.join(rootDir, 'vocabulary', targetLang) : path.join(rootDir, 'vocabulary');

  const files = findJsonFiles(vocabDir);
  console.log(`Checking example sentences across ${files.length} JSON file(s)...`);

  let errors = 0;
  let totalEntriesChecked = 0;
  const usedExamples = new Map();

  for (const file of files) {
    const relPath = path.relative(rootDir, file).replace(/\\/g, '/');
    let data;
    try {
      data = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (e) {
      console.error(`[JSON ERROR] Failed to parse ${relPath}: ${e.message}`);
      errors++;
      continue;
    }

    if (!Array.isArray(data)) continue;

    for (const [idx, entry] of data.entries()) {
      totalEntriesChecked++;
      const word = entry.word;
      if (!word) {
        console.error(`[ERROR] Entry #${idx + 1} in ${relPath} is missing 'word' property.`);
        errors++;
        continue;
      }

      if (!entry.examples || !Array.isArray(entry.examples) || entry.examples.length === 0) {
        console.error(`[EMPTY EXAMPLE ERROR] Entry '${entry.id}' (${word}) in ${relPath} has no example sentence.`);
        errors++;
        continue;
      }

      for (const ex of entry.examples) {
        if (typeof ex !== 'string' || ex.trim().length === 0) {
          console.error(`[EMPTY EXAMPLE ERROR] Entry '${entry.id}' (${word}) in ${relPath} has an empty example string.`);
          errors++;
          continue;
        }

        // Check for template pattern match
        const normEx = ex.trim();
        for (const pattern of templatePatterns) {
          if (pattern.test(normEx)) {
            console.error(`[BOILERPLATE TEMPLATE ERROR] Entry '${entry.id}' (${word}) in ${relPath} uses a prohibited boilerplate sentence template: "${ex}"`);
            errors++;
          }
        }

        // Check for template re-use
        const normExLower = normEx.toLowerCase();
        if (usedExamples.has(normExLower)) {
          const prev = usedExamples.get(normExLower);
          if (prev.word !== word) {
            console.error(`[REUSED TEMPLATE ERROR] Example "${ex}" was reused across unrelated words '${prev.word}' (${prev.file}) and '${word}' (${relPath}).`);
            errors++;
          }
        } else {
          usedExamples.set(normExLower, { word, file: relPath });
        }

        // Check headword occurrence
        const normSentence = normalizeText(ex);
        const stems = getStems(word);

        const matchFound = stems.some(s => normSentence.includes(s));

        if (!matchFound) {
          console.error(`[MISSING HEADWORD ERROR] Entry '${entry.id}' headword "${word}" does NOT appear in its example sentence:\n  Example: "${ex}"\n  File: ${relPath}`);
          errors++;
        }
      }
    }
  }

  console.log(`Verified ${totalEntriesChecked} entries across ${files.length} file(s). Total errors: ${errors}`);
  return errors === 0;
}

if (require.main === module) {
  const langArg = process.argv[2];
  const success = verifyExamples(langArg);
  if (!success) process.exit(1);
}

module.exports = { verifyExamples };
