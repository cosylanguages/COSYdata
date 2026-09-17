const fs = require('fs');
const path = require('path');

const TODAY = "2025-01-15";

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getArticle(word) {
  const lower = word.toLowerCase().trim();
  if (/^[aeiou]/i.test(lower)) {
    return 'an';
  }
  return 'a';
}

function makeEntry(item) {
  const slug = slugify(item.word);
  const id = `en:${slug}:${item.form}`;

  const entry = {
    id: id,
    word: item.word,
    language: "en",
    form: item.form,
    level: item.level,
    definitions: [item.def],
    examples: [item.ex],
    domain: item.dom || "general, relocation",
    theme: item.theme,
    updated: TODAY,
    levels: [item.level],
    transcription: item.uk
  };

  if (item.us && item.us !== item.uk) {
    entry.transcription_variants = { us: item.us };
  }

  if (item.emoji) entry.emoji = item.emoji;
  if (item.noEmoji) entry.no_emoji = true;

  if (item.form === "noun") {
    entry.countability = item.count;
    if (item.count === "countable") {
      entry.article = getArticle(item.word);
    }
    if (item.plural) entry.plural_form = item.plural;
    if (item.singWork) entry.singular_workaround = item.singWork;
  }

  if (item.form === "adjective" || item.form === "adverb") {
    if (item.comp) entry.comparative = item.comp;
    if (item.sup) entry.superlative = item.sup;
  }

  if (["B1", "B2", "C1", "C2"].includes(item.level)) {
    if (item.syn && item.syn.length > 0) {
      entry.synonyms = item.syn;
    } else {
      entry.synonyms = [item.word];
    }
  }

  if (item.ant && item.ant.length > 0) {
    entry.antonyms = item.ant;
  } else if (item.noAnt) {
    entry.no_antonym = true;
  } else {
    entry.no_antonym = true;
  }

  return { file: item.file, entry: entry };
}

const b1 = require('./dataset_batch1.cjs');
const b2 = require('./dataset_batch2.cjs');
const b3 = require('./dataset_batch3.cjs');
const b4 = require('./dataset_batch4.cjs');
const b5 = require('./dataset_batch5.cjs');
const b6 = require('./dataset_batch6.cjs');

const allItems = [...b1, ...b2, ...b3, ...b4, ...b5, ...b6];
console.log(`Total new entries to write: ${allItems.length}`);

const fileGroups = {};
for (const item of allItems) {
  const { file, entry } = makeEntry(item);
  const fullPath = path.join('vocabulary/en', file);
  if (!fileGroups[fullPath]) fileGroups[fullPath] = [];
  fileGroups[fullPath].push(entry);
}

for (const [fullPath, newEntries] of Object.entries(fileGroups)) {
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  let existingData = [];
  if (fs.existsSync(fullPath)) {
    existingData = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  }

  for (const newEnt of newEntries) {
    const idx = existingData.findIndex(e => e.id === newEnt.id);
    if (idx >= 0) {
      existingData[idx] = newEnt;
    } else {
      existingData.push(newEnt);
    }
  }

  fs.writeFileSync(fullPath, JSON.stringify(existingData, null, 2) + '\n', 'utf8');
}

console.log(`Successfully wrote all ${allItems.length} new entries to theme files.`);
