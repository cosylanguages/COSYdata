const fs = require('fs');
const path = require('path');
const https = require('https');
const vm = require('vm');

const cosyDataDir = path.resolve(__dirname, '..');
const brDir = path.join(cosyDataDir, 'vocabulary', 'br');
const targetA0A1Dir = path.join(brDir, 'a0_a1');

function fetchRaw(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Node.js' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function parseJS(content) {
  let extracted = [];
  const sandbox = {
    window: { vocabularyData: {}, grammarData: {}, verbsData: {}, phrasesData: {}, quotesData: {} },
    module: { exports: {} }, exports: {}
  };
  sandbox.window.window = sandbox.window;
  try {
    vm.runInNewContext(content, sandbox);
    for (const k of Object.keys(sandbox.window)) {
      if (k === 'window') continue;
      const val = sandbox.window[k];
      if (typeof val === 'object' && val !== null) {
        if (Array.isArray(val)) extracted.push(...val);
        else for (const lk of Object.keys(val)) if (Array.isArray(val[lk])) extracted.push(...val[lk]);
      }
    }
  } catch (e) {}
  return extracted;
}

function slugifyBreton(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/ñ/g, 'n')
    .replace(/c'h/g, 'c-h')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Dictionary of known Breton feminine nouns in A1
const feminineNouns = new Set([
  "buoc'h", "yar", "sae", "mantell", "maouez", "merc'h", "c'hoar", "gwezenn",
  "stêr", "fest", "mamm", "gwreg", "kador", "taol", "liorzh", "skol", "stal",
  "fizik", "kemennadenn", "sizhun", "menez", "micher", "kegin", "ti-feurm",
  "bag", "kambr", "prenestr", "dor", "enezen", "straed", "gwazed",
  "skeudenn", "pennad", "strollad", "floch", "vrec'h", "gazetenn", "vro", "gêr"
]);

// Map file/_file or item.theme to target COSYdata theme file
function determineThemeFile(item, word, form) {
  const f = item._file;
  const th = item.theme;

  if (f === 'nationalities.js' || f === 'locations.js' || th === 'nationalities' || th === 'places') return 'nationalities.json';
  if (f === 'colors.js' || f === 'colours.js' || th === 'colours' || th === 'colors') return 'colors.json';
  if (f === 'animals.js' || th === 'animals') return 'animals.json';
  if (f === 'body.js' || th === 'body') return 'body_health.json';
  if (f === 'clothes.js' || th === 'clothes') return 'clothes.json';
  if (f === 'family.js' || th === 'family') return 'family.json';
  if (f === 'food_drink.js' || f === 'dishes.js' || th === 'food_drink' || th === 'dishes') return 'food_drink.json';
  if (f === 'furniture.js' || th === 'furniture') return 'house_furniture.json';
  if (f === 'jobs.js' || th === 'jobs') return 'jobs.json';
  if (f === 'school.js' || th === 'school') return 'school.json';
  if (f === 'time.js' || th === 'time') return 'time.json';
  if (f === 'weather.json' || f === 'nature.js' || th === 'nature' || th === 'weather') return 'weather.json';
  if (f === 'verbs.js' || form === 'verb') return 'daily_verbs.json';
  if (f === 'adjectives.js' || form === 'adjective') return 'general_adjectives.json';
  if (f === 'numbers.js' || th === 'numbers' || form === 'number') return 'numbers.json';
  if (f === 'greetings.js' || th === 'greetings' || form === 'phrase') return 'expressions.json';
  if (form === 'preposition') return 'prepositions.json';
  if (form === 'conjunction' || form === 'adverb') return 'adverbs_connectors.json';
  if (form === 'determiner' || form === 'pronoun') return 'pronouns.json';

  return 'common_nouns.json';
}

const countryEmojis = {
  'Frañs': '🇫🇷', 'Italia': '🇮🇹', 'Rusia': '🇷🇺', 'Gres': '🇬🇷',
  'Bro-Saoz': '🇬🇧', 'Spagn': '🇪🇸', 'Stadoù-Unanet': '🇺🇸',
  'Pariz': '🇫🇷', 'Londrez': '🇬🇧', 'Roma': '🇮🇹', 'Moskov': '🇷🇺',
  'Aten': '🇬🇷', 'New York': '🇺🇸'
};

const countryDefs = {
  'Frañs': 'Bro e kornaoueg Europa gant Pariz da bennkêr.',
  'Italia': 'Bro e su Europa gant Roma da bennkêr.',
  'Rusia': 'Bro vras er reter Europa hag Azia.',
  'Gres': 'Bro e su Europa brudet evit hec’h istor.',
  'Bro-Saoz': 'Bro en enezenn Breizh-Veur.',
  'Spagn': 'Bro e mervent Europa war ledenez Iberia.',
  'Stadoù-Unanet': 'Bro vras e Norzhamerika.',
  'Pariz': 'Kêr-benn hag ar gêr vrasañ e Bro-C’hall.',
  'Londrez': 'Kêr-benn Bro-Saoz ha Rouantelezh-Unanet.',
  'Roma': 'Kêr-benn Italia gant un istor kozh meurgez.',
  'Moskov': 'Kêr-benn Rusia lec’hiet e kornôg ar vro.',
  'Aten': 'Kêr-benn Gres brudet evit an henanzerien.',
  'New York': 'Kêr vrasañ ar Stadoù-Unanet brudet evit he zeir-uhel.'
};

const countryExamples = {
  'Frañs': 'Plijet bras on o veajiñ e Frañs.',
  'Italia': 'E Bro-Italia e tebrer kalz pasta.',
  'Rusia': 'Bro-Rusia zo ur vro vras ha yen er goañv.',
  'Gres': 'En Aten hag e Bro-Gres e reer amzer heoliek.',
  'Bro-Saoz': 'E Bro-Saoz e komzer saozneg bemdez.',
  'Spagn': 'E Spagn e vez tomm an amzer en hañv.',
  'Stadoù-Unanet': 'Er Stadoù-Unanet e vever e kêrioù bras.',
  'Pariz': 'Pariz zo ur gêr gaer gant an Tour Eiffel.',
  'Londrez': 'E Londrez e c’haller gweladenniñ mirdiou kalz.',
  'Roma': 'E Roma e c’haller gweladenniñ monumantoù kozh.',
  'Moskov': 'E Moskov e c’haller gweladenniñ ar C’hremlin.',
  'Aten': 'Aten zo kêr-benn gaer ha brudet Gres.',
  'New York': 'E New York e c’haller gweladenniñ Central Park.'
};

const placeNames = new Set([
  'Frañs', 'Italia', 'Rusia', 'Gres', 'Bro-Saoz', 'Spagn', 'Stadoù-Unanet',
  'Pariz', 'Londrez', 'Roma', 'Moskov', 'Aten', 'New York'
]);

// Original 62 baseline words
const original62Words = new Set([
  "kazh", "ki", "troad", "dorn", "gar", "lagad", "fri", "genou", "skouarn", "t-shirt",
  "bragoù", "botez", "tog", "sac'h", "mamm", "tad", "familh", "mignon", "gwaz", "gwreg",
  "bugel", "pizza", "pasta", "aval", "bara", "vi", "laezh", "banana", "kafe", "te", "dour",
  "boued", "lein", "merenn", "koan", "liorzh", "kador", "taol", "gwele", "alc'hwez", "pellgomz",
  "stilo", "gêr", "medisin", "kelenner", "labour", "arc'hant", "skol", "karr", "karr-boutin",
  "tren", "stal", "levr", "deiz", "sizhun", "mintin", "noz", "teñvalijenn", "hiziv", "warc'hoazh",
  "heol", "glav"
]);

async function runMigration() {
  console.log('Fetching source entries from COSYlanguages/vocabulary/br/A1...');
  const filesRes = await fetchRaw('https://api.github.com/repos/cosylanguages/COSYlanguages/contents/vocabulary/br/A1');
  const files = JSON.parse(filesRes);
  const jsFiles = files.filter(f => f.name.endsWith('.js'));

  const cosyLangItems = [];
  for (const f of jsFiles) {
    const raw = await fetchRaw(f.download_url);
    const parsed = parseJS(raw);
    for (const item of parsed) {
      if (item && item.word) {
        cosyLangItems.push({ ...item, _file: f.name });
      }
    }
  }

  console.log(`Fetched ${cosyLangItems.length} total raw items from COSYlanguages.`);

  const existingIds = new Set();
  const existingWords = new Map();

  // Load existing baseline
  const subdirs = fs.readdirSync(brDir).filter(d => fs.statSync(path.join(brDir, d)).isDirectory());
  for (const subdir of subdirs) {
    const levelDir = path.join(brDir, subdir);
    const fList = fs.readdirSync(levelDir).filter(f => f.endsWith('.json') && f !== 'index.json' && f !== 'flat-index.json');
    for (const f of fList) {
      const data = JSON.parse(fs.readFileSync(path.join(levelDir, f), 'utf8'));
      for (const e of data) {
        if (e.id) existingIds.add(e.id);
        if (subdir === 'a0_a1' && original62Words.has(e.word)) {
          existingWords.set(e.word, e);
        }
      }
    }
  }

  console.log(`Loaded ${existingWords.size} baseline unique words in COSYdata/vocabulary/br/a0_a1.`);

  // Load existing target theme files and preserve only baseline original 62 items
  const themeFilesMap = {};
  const targetFiles = fs.readdirSync(targetA0A1Dir).filter(f => f.endsWith('.json') && f !== 'index.json' && f !== 'flat-index.json');
  for (const f of targetFiles) {
    const data = JSON.parse(fs.readFileSync(path.join(targetA0A1Dir, f), 'utf8'));
    themeFilesMap[f] = data.filter(e => original62Words.has(e.word));
  }

  let migratedCount = 0;
  let skippedCount = 0;

  const processedWords = new Set();

  for (const item of cosyLangItems) {
    let word = item.word.trim();

    // Clean slash separated words or phonetic spellings
    if (word === 'anit / atav') word = 'atav';
    if (word === 'kaye') word = 'kaier';
    if (word === 'Sachañ') word = 'sachañ';

    if (existingWords.has(word) || processedWords.has(word)) {
      skippedCount++;
      continue;
    }
    processedWords.add(word);

    let form = item.form;
    if (word === 'e-barzh') form = 'preposition';
    else if (['demat', 'kenavo', 'trugarez', 'noz vat'].includes(word.toLowerCase())) form = 'phrase';
    else if (['unan', 'daou', 'tri', 'pevar', 'pemp'].includes(word.toLowerCase())) form = 'noun';
    else if (!form && item._file === 'locations.js') form = 'noun';
    else if (!form) form = 'noun';

    const themeFile = determineThemeFile(item, word, form);
    const themeName = themeFile.replace('.json', '');

    const slug = slugifyBreton(word);
    let id = `br:${slug}:${form}`;
    if (existingIds.has(id)) {
      let c = 1;
      while (existingIds.has(`br:${slug}-${c}:${form}`)) c++;
      id = `br:${slug}-${c}:${form}`;
    }
    existingIds.add(id);

    // Definitions & Examples
    let defText = '';
    let exText = '';

    if (item.definitions && Array.isArray(item.definitions) && item.definitions.length > 0) {
      const d0 = item.definitions[0];
      if (typeof d0 === 'string') {
        defText = d0;
      } else if (d0 && d0.text) {
        defText = d0.text;
        if (d0.examples && d0.examples.length > 0) {
          exText = d0.examples[0];
        }
      }
    }

    // Clean English translations / French spellings in definitions & examples
    defText = defText
      .replace(/\s*\([a-zA-Z\s\/]+\)/g, '') // remove parenthetical English like (to be)
      .replace(/Maniere/g, 'Doare')
      .trim();

    if (!defText) {
      if (countryDefs[word]) defText = countryDefs[word];
      else defText = `Ger brezhonek evit ${word}.`;
    }

    if (!exText) {
      if (countryExamples[word]) exText = countryExamples[word];
      else exText = `Setu ur frazenn gant ar ger ${word}.`;
    }

    exText = exText.replace(/pretis/g, 'pretioù').trim();

    const entry = {
      id: id,
      word: word,
      language: 'br',
      form: form,
      level: 'A1',
      definitions: [defText],
      examples: [exText],
      domain: 'general',
      theme: themeName,
      updated: '2025-01-15'
    };

    // Transcription
    if (item.transcription && item.transcription.trim()) {
      entry.transcription = item.transcription.trim();
    } else {
      entry.transcription = `/${slug}/`;
    }

    // Emoji
    if (item.emoji && item.emoji !== '✨') {
      entry.emoji = item.emoji;
    } else if (countryEmojis[word]) {
      entry.emoji = countryEmojis[word];
    } else {
      entry.no_emoji = true;
    }

    // Antonyms
    if (item.antonyms && Array.isArray(item.antonyms) && item.antonyms.length > 0) {
      entry.antonyms = item.antonyms;
    } else {
      entry.no_antonym = true;
    }

    // Noun metadata
    if (form === 'noun') {
      if (placeNames.has(word)) {
        entry.countability = 'invariable';
      } else {
        entry.gender = feminineNouns.has(word) ? 'feminine' : (item.gender || 'masculine');
        entry.article = item.article || 'ar';
        entry.countability = item.countability || 'countable';
        if (entry.countability === 'countable') {
          entry.plural_form = item.plural_form || item.plural || `${word}où`;
        }
      }
    }

    if (!themeFilesMap[themeFile]) themeFilesMap[themeFile] = [];
    themeFilesMap[themeFile].push(entry);
    migratedCount++;
  }

  // Remove empty or unpopulated theme files
  for (const f of Object.keys(themeFilesMap)) {
    if (themeFilesMap[f].length === 0) {
      delete themeFilesMap[f];
      const p = path.join(targetA0A1Dir, f);
      if (fs.existsSync(p)) fs.unlinkSync(p);
    }
  }

  // Save all non-empty theme files
  for (const [f, content] of Object.entries(themeFilesMap)) {
    const filePath = path.join(targetA0A1Dir, f);
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf8');
  }

  console.log(`Successfully migrated ${migratedCount} new Breton entries! Skipped ${skippedCount} duplicate/existing terms.`);
}

runMigration().catch(err => {
  console.error(err);
  process.exit(1);
});
