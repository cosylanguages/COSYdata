const fs = require('fs');
const path = require('path');
const vm = require('vm');

function slugifyIt(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatIpa(transcription) {
  if (!transcription) return '/.../';
  let t = transcription.trim();
  if (!t.startsWith('/')) t = '/' + t;
  if (!t.endsWith('/')) t = t + '/';
  return t;
}

const clDir = '/tmp/COSYlanguages/vocabulary/it/A1';
const cdDir = path.join(__dirname, '../vocabulary/it/a0_a1');

// Index ALL IDs and words across ALL COSYdata files in ALL levels
const allDataIds = new Map();
const allDataWords = new Map();

function scanAll(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) scanAll(full);
    else if (entry.isFile() && entry.name.endsWith('.json') && entry.name !== 'index.json' && entry.name !== 'flat-index.json' && !entry.name.endsWith('-tracks.json')) {
      try {
        const data = JSON.parse(fs.readFileSync(full, 'utf8'));
        if (Array.isArray(data)) {
          data.forEach(item => {
            if (item.id) allDataIds.set(item.id, { file: full, item });
            if (item.word) allDataWords.set(item.word.trim().toLowerCase(), { file: full, item });
          });
        }
      } catch(e) {}
    }
  });
}
scanAll(path.join(__dirname, '../vocabulary'));

// Batch 3: verbs.js -> daily_verbs.json / auxiliary_verbs.json
const srcPath = path.join(clDir, 'verbs.js');
const code = fs.readFileSync(srcPath, 'utf8');
const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(code, sandbox);
const items = sandbox.window.vocabularyData?.it || sandbox.module.exports || [];

const dailyPath = path.join(cdDir, 'daily_verbs.json');
const auxPath = path.join(cdDir, 'auxiliary_verbs.json');

const dailyData = JSON.parse(fs.readFileSync(dailyPath, 'utf8'));
const auxData = JSON.parse(fs.readFileSync(auxPath, 'utf8'));

let addedNew = 0;
let updatedLevels = 0;
let skippedDuplicates = 0;

items.forEach(item => {
  if (!item.word) return;
  const wordClean = item.word.trim();
  const wordKey = wordClean.toLowerCase();
  const slug = slugifyIt(wordClean);
  const id = `it:${slug}:verb`;

  let existing = allDataIds.get(id) || allDataWords.get(wordKey);

  if (existing) {
    if (existing.file.includes('a0_a1')) {
      skippedDuplicates++;
      return;
    }
    const targetItem = existing.item;
    if (!targetItem.levels) {
      const origLvl = targetItem.level || 'A2';
      targetItem.levels = ['A1', origLvl];
    } else if (!targetItem.levels.includes('A1')) {
      targetItem.levels.unshift('A1');
    }

    const fileContent = JSON.parse(fs.readFileSync(existing.file, 'utf8'));
    const idx = fileContent.findIndex(i => i.id === targetItem.id);
    if (idx !== -1) {
      fileContent[idx] = targetItem;
      fs.writeFileSync(existing.file, JSON.stringify(fileContent, null, 2) + '\n');
      updatedLevels++;
    }
    return;
  }

  // Def & Ex
  let defText = 'Azione di ' + wordClean + '.';
  let examples = [];
  if (Array.isArray(item.definitions) && item.definitions.length > 0) {
    if (typeof item.definitions[0] === 'string') {
      defText = item.definitions[0];
    } else if (item.definitions[0].text) {
      defText = item.definitions[0].text;
      if (Array.isArray(item.definitions[0].examples)) {
        examples = item.definitions[0].examples.filter(e => typeof e === 'string' && e.trim().length > 0);
      }
    }
  }

  const isAux = ['essere', 'avere', 'dovere', 'potere', 'volere', 'sapere'].includes(slug);
  const targetFile = isAux ? auxPath : dailyPath;
  const targetData = isAux ? auxData : dailyData;

  const newEntry = {
    id: id,
    word: wordClean,
    language: 'it',
    form: 'verb',
    level: 'A1',
    definitions: [defText],
    examples: examples.length > 0 ? examples : [`Voglio ${wordClean} oggi.`],
    domain: 'general, spoken',
    theme: isAux ? 'auxiliary_verbs' : 'daily_verbs',
    updated: '2025-01-15',
    transcription: formatIpa(item.transcription),
    emoji: item.emoji || '✨'
  };

  if (item.antonyms && Array.isArray(item.antonyms) && item.antonyms.length > 0) {
    newEntry.antonyms = item.antonyms.filter(a => typeof a === 'string');
  } else {
    newEntry.no_antonym = true;
  }

  targetData.push(newEntry);
  allDataIds.set(id, { file: targetFile, item: newEntry });
  allDataWords.set(wordKey, { file: targetFile, item: newEntry });
  addedNew++;
});

fs.writeFileSync(dailyPath, JSON.stringify(dailyData, null, 2) + '\n');
fs.writeFileSync(auxPath, JSON.stringify(auxData, null, 2) + '\n');

console.log(`Batch 3 Complete: Added ${addedNew} new verb entries, updated ${updatedLevels} levels in higher files, skipped ${skippedDuplicates} existing A0/A1 duplicates.`);
