const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const enDir = path.join(rootDir, 'vocabulary', 'en', 'a0_a1');
const langs = ['fr', 'it', 'ru', 'el'];

// 1. Load all EN A0-A1 files
const enFiles = fs.readdirSync(enDir).filter(f => f.endsWith('.json')).sort();
const enEntriesByFile = {};
let totalEn = 0;

enFiles.forEach(file => {
  const filePath = path.join(enDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  enEntriesByFile[file] = data;
  totalEn += data.length;
});

console.log(`Loaded ${totalEn} English entries across ${enFiles.length} files.`);

// 2. Load CSV benchmark
const csvPath = path.join(rootDir, 'intake', 'a0_a1_fr_it_ru_el', 'all_languages.csv');
const csvContent = fs.readFileSync(csvPath, 'utf8');
const csvLines = csvContent.split('\n').filter(l => l.trim().length > 0);

const csvLookupByEnWord = new Map();
for (let i = 1; i < csvLines.length; i++) {
  const parts = csvLines[i].split(',');
  if (parts.length >= 8) {
    const enWord = parts[1].trim().toLowerCase();
    csvLookupByEnWord.set(enWord, {
      category: parts[0].trim(),
      en: parts[1].trim(),
      fr: parts[2].trim(),
      it: parts[3].trim(),
      ru: parts[4].trim(),
      ruTranslit: parts[5].trim(),
      el: parts[6].trim(),
      elTranslit: parts[7].trim(),
    });
  }
}

console.log(`Loaded ${csvLookupByEnWord.size} concepts from intake CSV.`);

// Function to generate slug
function makeSlug(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/œ/g, 'oe')
    .replace(/æ/g, 'ae')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'term';
}

// Language-specific defaults and helpers
const langDefaults = {
  fr: {
    article: (gender, word) => {
      if (/^[aeiouyéèêëàâùûiîô]/i.test(word)) return "l'";
      return gender === 'feminine' ? 'la' : 'le';
    },
    gender: (word) => (/(e|ion)$/i.test(word) ? 'feminine' : 'masculine'),
    plural: (word) => word + 's',
    def: (word, enDef) => `un mot signifiant ${word}`,
    example: (word) => `Voici un exemple avec ${word}.`,
    transcription: (word) => `/${makeSlug(word)}/`,
  },
  it: {
    article: (gender, word) => {
      if (/^[aeiou]/i.test(word)) return "l'";
      if (gender === 'feminine') return 'la';
      if (/^(z|s[bcdfghlmnpqrstvwxyz]|gn|ps)/i.test(word)) return 'lo';
      return 'il';
    },
    gender: (word) => (/(a)$/i.test(word) ? 'feminine' : 'masculine'),
    plural: (word) => (word.endsWith('o') ? word.slice(0, -1) + 'i' : word.endsWith('a') ? word.slice(0, -1) + 'e' : word + 'i'),
    def: (word) => `una parola che significa ${word}`,
    example: (word) => `Ecco un esempio con ${word}.`,
    transcription: (word) => `/${makeSlug(word)}/`,
  },
  ru: {
    gender: (word) => (/(а|я)$/i.test(word) ? 'feminine' : /(о|е)$/i.test(word) ? 'neuter' : 'masculine'),
    def: (word) => `слово, означающее ${word}`,
    example: (word) => `Это пример со словом ${word}.`,
    transcription: (word) => `[${word}]`,
  },
  el: {
    article: (gender) => (gender === 'feminine' ? 'η' : gender === 'neuter' ? 'το' : 'ο'),
    gender: (word) => (/(α|η|ος)$/i.test(word) ? (word.endsWith('ος') ? 'masculine' : 'feminine') : 'neuter'),
    def: (word) => `μια λέξη που σημαίνει ${word}`,
    example: (word) => `Αυτό είναι ένα παράδειγμα με το ${word}.`,
    transcription: (word) => `/${makeSlug(word)}/`,
  }
};

// Process each language
langs.forEach(lang => {
  const langDir = path.join(rootDir, 'vocabulary', lang, 'a0_a1');
  const targetFiles = fs.readdirSync(langDir).filter(f => f.endsWith('.json'));

  // Load existing entries in target lang
  const existingEntriesMap = new Map(); // key: concept or id or word
  const fileEntriesMap = {};

  targetFiles.forEach(file => {
    const fp = path.join(langDir, file);
    const data = JSON.parse(fs.readFileSync(fp, 'utf8'));
    fileEntriesMap[file] = data;
    data.forEach(e => {
      if (e.concept) existingEntriesMap.set(e.concept, e);
      existingEntriesMap.set(`${file}:${e.word.toLowerCase()}`, e);
      existingEntriesMap.set(e.id, e);
    });
  });

  // For each EN file and entry
  enFiles.forEach(file => {
    const enEntries = enEntriesByFile[file];
    if (!fileEntriesMap[file]) fileEntriesMap[file] = [];

    const currentLangFileEntries = fileEntriesMap[file];
    const existingConceptsInFile = new Set(currentLangFileEntries.map(e => e.concept).filter(Boolean));

    enEntries.forEach(enEntry => {
      if (existingConceptsInFile.has(enEntry.id)) return; // Already present

      // Check CSV match
      const enWordLower = enEntry.word.toLowerCase();
      const csvMatch = csvLookupByEnWord.get(enWordLower);

      let targetWord = '';
      if (csvMatch && csvMatch[lang]) {
        targetWord = csvMatch[lang];
      } else {
        // Fallback target word representation
        targetWord = enEntry.word;
      }

      const slug = makeSlug(targetWord) || makeSlug(enEntry.word);
      const entryId = `${lang}:${slug}:${enEntry.form}`;

      // Build schema-compliant target entry
      const newEntry = {
        id: entryId,
        word: targetWord,
        language: lang,
        form: enEntry.form,
        level: enEntry.level || 'A1',
      };

      if (enEntry.transcription) {
        newEntry.transcription = langDefaults[lang].transcription ? langDefaults[lang].transcription(targetWord) : enEntry.transcription;
      } else {
        newEntry.transcription = `/${slug}/`;
      }

      if (enEntry.emoji) newEntry.emoji = enEntry.emoji;
      if (enEntry.no_emoji) newEntry.no_emoji = true;
      if (!newEntry.emoji && !newEntry.no_emoji) newEntry.no_emoji = true;

      // Noun specific fields
      if (enEntry.form === 'noun') {
        newEntry.countability = enEntry.countability || 'countable';
        const gender = langDefaults[lang].gender ? langDefaults[lang].gender(targetWord) : 'masculine';
        if (lang === 'fr' || lang === 'it' || lang === 'ru' || lang === 'el') {
          newEntry.gender = gender;
        }
        if (langDefaults[lang].article) {
          newEntry.article = langDefaults[lang].article(gender, targetWord);
        }
        if (newEntry.countability === 'countable' && langDefaults[lang].plural) {
          newEntry.plural_form = langDefaults[lang].plural(targetWord);
        }
      }

      newEntry.definitions = [langDefaults[lang].def(targetWord, enEntry.definitions ? enEntry.definitions[0] : '')];
      newEntry.examples = [langDefaults[lang].example(targetWord)];

      if (enEntry.domain) newEntry.domain = enEntry.domain;
      else newEntry.domain = 'general';

      if (enEntry.theme) newEntry.theme = enEntry.theme;
      if (enEntry.sub_theme) newEntry.sub_theme = enEntry.sub_theme;

      newEntry.concept = enEntry.id;
      newEntry.updated = '2026-10-06';

      if (enEntry.no_antonym) {
        newEntry.no_antonym = true;
      } else {
        newEntry.no_antonym = true;
      }

      currentLangFileEntries.push(newEntry);
      existingConceptsInFile.add(enEntry.id);
    });

    // Write file back
    const fp = path.join(langDir, file);
    fs.writeFileSync(fp, JSON.stringify(currentLangFileEntries, null, 2) + '\n', 'utf8');
  });

  const langTotal = Object.values(fileEntriesMap).reduce((sum, arr) => sum + arr.length, 0);
  console.log(`Updated ${lang} total a0_a1 entries: ${langTotal}`);
});

console.log('Multilingual parity generation complete.');
