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

// Batch 6 sources
const sources = [
  { file: 'grammar_elements.js', defaultTarget: 'adverbs_connectors.json' },
  { file: 'social.js', defaultTarget: 'expressions.json' },
  { file: 'idioms.js', defaultTarget: 'expressions.json' },
  { file: 'technology.js', defaultTarget: 'common_nouns.json' }
];

let addedNew = 0;
let updatedLevels = 0;
let skippedDuplicates = 0;

sources.forEach(src => {
  const srcPath = path.join(clDir, src.file);
  if (!fs.existsSync(srcPath)) return;

  const code = fs.readFileSync(srcPath, 'utf8');
  const sandbox = { window: {}, module: { exports: {} } };
  vm.runInNewContext(code, sandbox);
  const items = sandbox.window.vocabularyData?.it || sandbox.module.exports || [];

  items.forEach(item => {
    if (!item.word) return;
    const wordClean = item.word.trim();
    const wordKey = wordClean.toLowerCase();
    const pos = item.form || (src.file === 'idioms.js' ? 'phrase' : (src.file === 'social.js' ? 'phrase' : 'adverb'));
    const slug = slugifyIt(wordClean);
    const id = `it:${slug}:${pos}`;

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

    // Target file selection
    let targetFile = src.defaultTarget;
    if (pos === 'preposition') targetFile = 'prepositions.json';
    if (pos === 'pronoun') targetFile = 'pronouns.json';

    const targetPath = path.join(cdDir, targetFile);
    const targetData = JSON.parse(fs.readFileSync(targetPath, 'utf8'));

    // Def & Ex
    let defText = 'Espressione o parola ' + wordClean + '.';
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

    const themeName = targetFile.replace('.json', '');
    const newEntry = {
      id: id,
      word: wordClean,
      language: 'it',
      form: pos,
      level: 'A1',
      definitions: [defText],
      examples: examples.length > 0 ? examples : [`Un esempio con ${wordClean}.`],
      domain: 'general, spoken',
      theme: themeName,
      updated: '2025-01-15',
      transcription: formatIpa(item.transcription),
      emoji: item.emoji || '✨'
    };

    if (pos === 'noun') {
      newEntry.article = item.article || 'il';
      newEntry.gender = item.gender || 'masculine';
      newEntry.countability = item.countability || (item.plural ? 'countable' : 'uncountable');
      if (newEntry.countability === 'countable') {
        newEntry.plural_form = item.plural || item.numberPlural || (wordClean + 's');
      }
    }

    if (item.antonyms && Array.isArray(item.antonyms) && item.antonyms.length > 0) {
      newEntry.antonyms = item.antonyms.filter(a => typeof a === 'string');
    } else {
      newEntry.no_antonym = true;
    }

    targetData.push(newEntry);
    fs.writeFileSync(targetPath, JSON.stringify(targetData, null, 2) + '\n');
    allDataIds.set(id, { file: targetPath, item: newEntry });
    allDataWords.set(wordKey, { file: targetPath, item: newEntry });
    addedNew++;
  });
});

console.log(`Batch 6 Complete: Added ${addedNew} new entries, updated ${updatedLevels} levels in higher files, skipped ${skippedDuplicates} existing A0/A1 duplicates.`);
