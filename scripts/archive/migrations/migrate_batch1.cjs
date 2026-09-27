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
const allDataIds = new Map(); // id -> { file, item }
const allDataWords = new Map(); // word.toLowerCase() -> { file, item }

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

console.log('Total existing IDs in vocabulary:', allDataIds.size);
console.log('Total existing words in vocabulary:', allDataWords.size);

// Load adjectives.js
const code = fs.readFileSync(path.join(clDir, 'adjectives.js'), 'utf8');
const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(code, sandbox);
const items = sandbox.window.vocabularyData?.it || sandbox.module.exports || [];

// Target files in A0_A1
const adjFile = path.join(cdDir, 'adjectives.json');
const genAdjFile = path.join(cdDir, 'general_adjectives.json');
const weatherFile = path.join(cdDir, 'weather.json');

const adjData = JSON.parse(fs.readFileSync(adjFile, 'utf8'));
const genAdjData = JSON.parse(fs.readFileSync(genAdjFile, 'utf8'));
const weatherData = JSON.parse(fs.readFileSync(weatherFile, 'utf8'));

let addedNew = 0;
let updatedLevels = 0;
let skippedDuplicates = 0;

items.forEach(item => {
  if (!item.word) return;
  const wordClean = item.word.trim();
  const wordKey = wordClean.toLowerCase();
  const slug = slugifyIt(wordClean);
  const id = `it:${slug}:adjective`;

  // Check if word or id exists anywhere
  let existing = allDataIds.get(id) || allDataWords.get(wordKey);

  if (existing) {
    if (existing.file.includes('a0_a1')) {
      skippedDuplicates++;
      return;
    }
    // Entry exists in A2/B1/etc., annotate levels
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

  // Create new entry
  let defText = 'Relativo a ' + wordClean + '.';
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

  const newEntry = {
    id: id,
    word: wordClean,
    language: 'it',
    form: 'adjective',
    level: 'A1',
    definitions: [defText],
    examples: examples.length > 0 ? examples : [`È un esempio con ${wordClean}.`],
    domain: 'general, spoken',
    theme: 'adjectives',
    updated: '2025-01-15',
    transcription: formatIpa(item.transcription),
    emoji: item.emoji || '✨'
  };

  if (item.antonyms && Array.isArray(item.antonyms) && item.antonyms.length > 0) {
    newEntry.antonyms = item.antonyms.filter(a => typeof a === 'string');
  } else {
    newEntry.no_antonym = true;
  }

  if (['soleggiato', 'piovoso', 'nuvoloso', 'ventoso', 'freddo', 'caldo'].includes(slug)) {
    newEntry.theme = 'weather';
    weatherData.push(newEntry);
  } else if (['generale', 'ordinario', 'straordinario', 'inutile', 'utile', 'possibile', 'impossibile', 'probabile'].includes(slug)) {
    newEntry.theme = 'general_adjectives';
    genAdjData.push(newEntry);
  } else {
    adjData.push(newEntry);
  }

  allDataIds.set(id, { file: adjFile, item: newEntry });
  allDataWords.set(wordKey, { file: adjFile, item: newEntry });
  addedNew++;
});

fs.writeFileSync(adjFile, JSON.stringify(adjData, null, 2) + '\n');
fs.writeFileSync(genAdjFile, JSON.stringify(genAdjData, null, 2) + '\n');
fs.writeFileSync(weatherFile, JSON.stringify(weatherData, null, 2) + '\n');

console.log(`Batch 1 Complete: Added ${addedNew} new entries, updated ${updatedLevels} levels in higher files, skipped ${skippedDuplicates} existing A0/A1 duplicates.`);
