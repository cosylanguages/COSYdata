const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.resolve(__dirname, '..');
const cosyDataBaDir = path.join(rootDir, 'vocabulary/ba/a0_a1');
const sourceJsDir = '/tmp/COSYlanguages/vocabulary/ba/A1';

function cyrillicToAsciiSlug(text) {
  const map = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'ғ': 'g', 'д': 'd', 'ҙ': 'zh', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'ҡ': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'ң': 'ng', 'о': 'o',
    'ө': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'ҫ': 's', 'т': 't', 'у': 'u', 'ү': 'u', 'ф': 'f', 'х': 'kh',
    'һ': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e',
    'ә': 'a', 'ю': 'yu', 'я': 'ya'
  };
  return text
    .toLowerCase()
    .split('')
    .map(ch => map[ch] !== undefined ? map[ch] : ch)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function generateBashkirIPA(word) {
  const ipaMap = {
    'а': 'a', 'ә': 'æ', 'б': 'b', 'в': 'v', 'г': 'ɡ', 'ғ': 'ʁ', 'д': 'd', 'ҙ': 'ð',
    'е': 'e', 'ё': 'jo', 'ж': 'ʒ', 'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'ҡ': 'q',
    'л': 'l', 'м': 'm', 'н': 'n', 'ң': 'ŋ', 'о': 'o', 'ө': 'ø', 'п': 'p', 'р': 'r',
    'с': 's', 'ҫ': 'θ', 'т': 't', 'у': 'u', 'ү': 'y', 'ф': 'f', 'х': 'x', 'һ': 'h',
    'ц': 'ts', 'ч': 'tʃ', 'ш': 'ʃ', 'щ': 'ʃtʃ', 'ъ': '', 'ы': 'ɯ', 'ь': '', 'э': 'e',
    'ю': 'ju', 'я': 'ja'
  };

  const clean = word.toLowerCase().trim();
  let ipa = '';
  for (let i = 0; i < clean.length; i++) {
    const ch = clean[i];
    if (ipaMap[ch] !== undefined) {
      ipa += ipaMap[ch];
    } else if (ch === ' ' || ch === '-') {
      ipa += ch;
    }
  }

  if (ipa.length > 0 && !ipa.includes(' ')) {
    const vowels = ['a', 'æ', 'e', 'i', 'o', 'ø', 'u', 'y', 'ɯ'];
    let lastVowelIdx = -1;
    for (let i = ipa.length - 1; i >= 0; i--) {
      if (vowels.includes(ipa[i])) {
        lastVowelIdx = i;
        break;
      }
    }
    if (lastVowelIdx > 0) {
      let stressPos = lastVowelIdx;
      while (stressPos > 0 && !vowels.includes(ipa[stressPos - 1])) {
        stressPos--;
      }
      ipa = ipa.slice(0, stressPos) + 'ˈ' + ipa.slice(stressPos);
    }
  }

  return `/${ipa}/`;
}

function generateBashkirPlural(word) {
  const clean = word.trim();
  const backVowels = ['а', 'о', 'у', 'ы'];
  const frontVowels = ['ә', 'ө', 'ү', 'и', 'е', 'э'];

  let isBack = true;
  for (let i = clean.length - 1; i >= 0; i--) {
    const ch = clean[i].toLowerCase();
    if (backVowels.includes(ch)) { isBack = true; break; }
    if (frontVowels.includes(ch)) { isBack = false; break; }
  }

  const lastChar = clean[clean.length - 1].toLowerCase();
  const vowels = ['а', 'ә', 'о', 'ө', 'ү', 'и', 'е', 'э', 'у', 'ы'];
  const voiceless = ['к', 'ҡ', 'п', 'с', 'ҫ', 'т', 'ф', 'х', 'һ', 'ц', 'ч', 'ш', 'щ'];
  const nasal = ['м', 'н', 'ң'];
  const lrj = ['л', 'р', 'й'];
  const voiced = ['б', 'в', 'г', 'ғ', 'д', 'ҙ', 'ж', 'з'];

  if (vowels.includes(lastChar)) {
    return clean + (isBack ? 'лар' : 'ләр');
  } else if (voiceless.includes(lastChar)) {
    return clean + (isBack ? 'тар' : 'тәр');
  } else if (nasal.includes(lastChar)) {
    return clean + (isBack ? 'дар' : 'дәр');
  } else if (lrj.includes(lastChar) || voiced.includes(lastChar)) {
    return clean + (isBack ? 'ҙар' : 'ҙәр');
  } else {
    return clean + (isBack ? 'лар' : 'ләр');
  }
}

// Fixed geo locations dictionary
const geoData = {
  'Франция': { def: 'Европала урынлашҡан дәүләт.', ex: 'Париж — Францияның баш ҡалаһы.', emoji: '🇫🇷' },
  'Италия': { def: 'Европаның көньяғында урынлашҡан дәүләт.', ex: 'Рим — Италияның баш ҡалаһы.', emoji: '🇮🇹' },
  'Рәсәй': { def: 'Европа һәм Азияла урынлашҡан ҙур дәүләт.', ex: 'Мәскәү — Рәсәйҙең баш ҡалаһы.', emoji: '🇷🇺' },
  'Греция': { def: 'Европаның көньяғындағы тарихи дәүләт.', ex: 'Афина — Грецияның баш ҡалаһы.', emoji: '🇬🇷' },
  'Англия': { def: 'Бөйөк Британия составындағы ил.', ex: 'Лондон — Англияның баш ҡалаһы.', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  'Испания': { def: 'Европалағы ил, баш ҡалаһы — Мадрид.', ex: 'Испанияла күп туристар ял итә.', emoji: '🇪🇸' },
  'АКШ': { def: 'Төньяҡ Америкалағы ҙур дәүләт.', ex: 'АКШ — ҙур ил.', emoji: '🇺🇸' },
  'Париж': { def: 'Францияның баш ҡалаһы.', ex: 'Париж — матур ҡала.', emoji: '🗼' },
  'Лондон': { def: 'Англияның баш ҡалаһы.', ex: 'Лондон — ҙур ҡала.', emoji: '🎡' },
  'Рим': { def: 'Италияның баш ҡалаһы.', ex: 'Рим — тарихи ҡала.', emoji: '🏛️' },
  'Мәскәү': { def: 'Рәсәйҙең баш ҡалаһы.', ex: 'Мәскәү — Рәсәйҙең үҙәге.', emoji: '🏰' },
  'Афина': { def: 'Грецияның баш ҡалаһы.', ex: 'Афина — боронғо ҡала.', emoji: '🏛️' },
  'Нью-Йорк': { def: 'АКШ-лағы иң ҙур ҡала.', ex: 'Нью-Йорк — заманса ҡала.', emoji: '🗽' }
};

// Fixed verb errors
const verbOverrides = {
  'төшөү': { def: 'Өҫтән аҫҡа табан хәрәкәт итеү йәки аҫҡа төшөү.', ex: 'Ул автобустан төшә.' },
  'этеү': { def: 'Нәмәне алға йәки ситкә этәреү.', ex: 'Ул ишекте этә.' }
};

const existingWords = new Set();
const existingIds = new Set();

// Clean up previous run files in vocabulary/ba/a0_a1/
for (const file of fs.readdirSync(cosyDataBaDir)) {
  if (file.endsWith('.json') && file !== 'index.json') {
    const filePath = path.join(cosyDataBaDir, file);
    // Remove newly created files or restore baseline
    if (['adverbs_connectors.json', 'colors.json', 'daily_verbs.json', 'expressions.json', 'general_adjectives.json', 'nationalities.json', 'numbers.json', 'pronouns.json', 'weather.json'].includes(file)) {
      fs.unlinkSync(filePath);
    }
  }
}

// Re-read existing COSYdata baseline entries
for (const file of fs.readdirSync(cosyDataBaDir)) {
  if (file.endsWith('.json') && file !== 'index.json') {
    const filePath = path.join(cosyDataBaDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    // Filter out any migrated items if any remained
    const baseline = content.filter(item => !item.id.includes('-gap') && !['ba:besei:noun'].includes(item.id));
    fs.writeFileSync(filePath, JSON.stringify(baseline, null, 2) + '\n', 'utf8');
    for (const item of baseline) {
      if (item.word) existingWords.add(item.word.trim());
      if (item.id) existingIds.add(item.id);
    }
  }
}

// Load all JS files from COSYlanguages
const jsItemsMap = new Map();

function walkJs(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walkJs(full);
    else if (f.endsWith('.js')) {
      const code = fs.readFileSync(full, 'utf8');
      const sandbox = { window: {}, module: { exports: {} } };
      try {
        vm.runInNewContext(code, sandbox);
        let items = [];
        if (Array.isArray(sandbox.window.vocabularyData?.ba)) items.push(...sandbox.window.vocabularyData.ba);
        if (Array.isArray(sandbox.window.A1_MANUAL_CANON_ADDITIONS)) items.push(...sandbox.window.A1_MANUAL_CANON_ADDITIONS);
        if (Array.isArray(sandbox.window.speakingData)) items.push(...sandbox.window.speakingData);
        if (Array.isArray(sandbox.module.exports)) items.push(...sandbox.module.exports);

        for (const item of items) {
          if (item && item.word && typeof item.word === 'string') {
            let w = item.word.trim();
            // Fix Mojibake
            if (w.includes('ҡыҙыл э')) {
              w = 'ҡыҙыл эсемлек';
            }
            if (!jsItemsMap.has(w)) jsItemsMap.set(w, { originFile: f, item });
          }
        }
      } catch (e) {
        console.error(`Error loading JS file ${f}:`, e.message);
      }
    }
  }
}

walkJs(sourceJsDir);

console.log(`Loaded ${jsItemsMap.size} unique words from COSYlanguages JS files.`);

const newEntriesByThemeFile = {};

function getThemeFileAndForm(originFile, item, word) {
  let themeFile = 'general_adjectives.json';
  let targetForm = item.form || 'noun';

  if (originFile === 'adjectives.js') {
    themeFile = 'general_adjectives.json';
    targetForm = 'adjective';
  } else if (originFile === 'verbs.js') {
    themeFile = 'daily_verbs.json';
    targetForm = 'verb';
  } else if (originFile === 'animals.js') {
    themeFile = 'animals.json';
    targetForm = 'noun';
  } else if (originFile === 'body.js') {
    themeFile = 'body_health.json';
    targetForm = 'noun';
  } else if (originFile === 'clothes.js') {
    themeFile = 'clothes.json';
    targetForm = 'noun';
  } else if (originFile === 'colours.js') {
    themeFile = 'colors.json';
    targetForm = 'adjective';
  } else if (originFile === 'dishes.js' || originFile === 'food_drink.js') {
    themeFile = 'food_drink.json';
    targetForm = 'noun';
  } else if (originFile === 'family.js' || originFile === 'people.js') {
    themeFile = 'family.json';
    targetForm = 'noun';
  } else if (originFile === 'furniture.js' || originFile === 'shopping.js' || originFile === 'technology.js') {
    if (targetForm === 'verb') {
      themeFile = 'daily_verbs.json';
    } else {
      themeFile = 'house_furniture.json';
      targetForm = 'noun';
    }
  } else if (originFile === 'greetings.js' || originFile === 'social.js') {
    themeFile = 'expressions.json';
    targetForm = 'phrase';
  } else if (originFile === 'jobs.js') {
    themeFile = 'jobs.json';
    targetForm = 'noun';
  } else if (originFile === 'locations.js') {
    themeFile = 'places_transport.json';
    targetForm = 'noun';
  } else if (originFile === 'nationalities.js') {
    themeFile = 'nationalities.json';
    targetForm = 'adjective';
  } else if (originFile === 'nature.js') {
    themeFile = 'weather.json';
    targetForm = 'noun';
  } else if (originFile === 'numbers.js') {
    themeFile = 'numbers.json';
    targetForm = 'number';
  } else if (originFile === 'places.js' || originFile === 'travel.js') {
    themeFile = 'places_transport.json';
    targetForm = 'noun';
  } else if (originFile === 'school.js') {
    themeFile = 'school.json';
    targetForm = 'noun';
  } else if (originFile === 'time.json') {
    themeFile = 'time.json';
    if (targetForm !== 'adverb') targetForm = 'noun';
  } else if (originFile === 'grammar_elements.js') {
    if (item.form === 'postposition') {
      themeFile = 'adverbs_connectors.json';
      targetForm = 'preposition';
    } else if (item.form === 'conjunction' || item.form === 'adverb' || item.form === 'particle') {
      themeFile = 'adverbs_connectors.json';
      targetForm = 'adverb';
    } else if (item.form === 'determiner') {
      themeFile = 'pronouns.json';
      targetForm = 'pronoun';
    } else {
      themeFile = 'adverbs_connectors.json';
      targetForm = 'adverb';
    }
  }

  return { themeFile, targetForm };
}

let migratedCount = 0;

for (const [word, { originFile, item }] of jsItemsMap.entries()) {
  // Skip duplicate words
  if (existingWords.has(word) || word === 'бүген') continue;

  const { themeFile, targetForm } = getThemeFileAndForm(originFile, item, word);
  const themeName = themeFile.replace('.json', '');

  const slug = cyrillicToAsciiSlug(word);
  let id = `ba:${slug}:${targetForm}`;
  if (existingIds.has(id)) {
    id = `ba:${slug}-2:${targetForm}`;
  }
  existingIds.add(id);

  let defString = '';
  let exampleString = '';

  if (geoData[word]) {
    defString = geoData[word].def;
    exampleString = geoData[word].ex;
  } else if (verbOverrides[word]) {
    defString = verbOverrides[word].def;
    exampleString = verbOverrides[word].ex;
  } else {
    if (Array.isArray(item.definitions) && item.definitions.length > 0) {
      const d0 = item.definitions[0];
      if (typeof d0 === 'string') {
        defString = d0;
      } else if (d0 && d0.text) {
        defString = d0.text;
        if (Array.isArray(d0.examples) && d0.examples.length > 0) {
          exampleString = d0.examples[0];
        }
      }
    }
    if (!defString && item.subtext) defString = item.subtext;
    if (!exampleString && item.subtext) exampleString = item.subtext;
  }

  const entry = {
    id: id,
    word: word,
    language: 'ba',
    form: targetForm,
    level: 'A1',
    transcription: item.transcription && item.transcription.trim() ? item.transcription.trim() : generateBashkirIPA(word),
    definitions: [defString.trim()],
    examples: [exampleString.trim()],
    domain: 'general',
    theme: themeName,
    updated: '2025-01-15'
  };

  if (geoData[word]) {
    entry.emoji = geoData[word].emoji;
  } else if (item.emoji && item.emoji !== '✨') {
    entry.emoji = item.emoji;
  } else {
    entry.emoji = '✨';
  }

  if (Array.isArray(item.antonyms) && item.antonyms.length > 0) {
    entry.antonyms = item.antonyms;
  } else {
    entry.no_antonym = true;
  }

  if (targetForm === 'noun') {
    if (originFile === 'locations.js') {
      entry.countability = 'invariable';
    } else if (item.countability === 'uncountable') {
      entry.countability = 'uncountable';
    } else {
      entry.countability = 'countable';
      entry.plural_form = generateBashkirPlural(word);
    }
  }

  if (!newEntriesByThemeFile[themeFile]) {
    newEntriesByThemeFile[themeFile] = [];
  }
  newEntriesByThemeFile[themeFile].push(entry);
  migratedCount++;
}

console.log(`Migrated ${migratedCount} new entries across ${Object.keys(newEntriesByThemeFile).length} theme files.`);

for (const [themeFile, newEntries] of Object.entries(newEntriesByThemeFile)) {
  const filePath = path.join(cosyDataBaDir, themeFile);
  let existing = [];
  if (fs.existsSync(filePath)) {
    existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  const combined = [...existing, ...newEntries];
  fs.writeFileSync(filePath, JSON.stringify(combined, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${combined.length} entries to ${filePath} (${newEntries.length} new)`);
}
