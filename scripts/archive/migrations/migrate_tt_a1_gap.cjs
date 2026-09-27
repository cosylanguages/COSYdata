const fs = require('fs');
const path = require('path');
const vm = require('vm');

function transliterate(text) {
  const map = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'ғ': 'g', 'д': 'd', 'ҙ': 'zh', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'җ': 'zh',
    'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'ҡ': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'ң': 'ng', 'о': 'o',
    'ө': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'ҫ': 's', 'т': 't', 'у': 'u', 'ү': 'u', 'ф': 'f', 'х': 'kh',
    'һ': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e',
    'ә': 'a', 'ю': 'yu', 'я': 'ya'
  };
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .split('')
    .map(ch => map[ch] !== undefined ? map[ch] : ch)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Map of Tatar IPA phonetics
const ttIPADict = {
  "биек": "/biˈek/", "тәпәш": "/tæˈpæʃ/", "яшь": "/jæʃ/", "карт": "/qart/",
  "кояшлы": "/qoˈjaʃlɯ/", "яңгырлы": "/jaŋˈʁɯrlɯ/", "эссе": "/esˈse/", "суык": "/suˈɯq/",
  "гади": "/ʁaˈdi/", "арзан": "/arˈzan/", "кыйммәт": "/qɯjˈmæt/", "чиста": "/tʃisˈta/",
  "кирәк": "/kiˈræk/", "кирәк түгел": "/kiˈræk tyˈɡel/", "ач": "/atʃ/", "туйган": "/tujˈʁan/",
  "тыныч": "/tɯˈnɯtʃ/", "курыккан": "/quˈrɯqqan/", "шат": "/ʃat/", "күңелсез": "/kyŋelˈsez/",
  "ару": "/aˈru/", "сәламәт": "/sælaˈmæt/", "авыру": "/avɯˈru/", "акрын": "/aqˈrɯn/",
  "бәләкәй": "/bælæˈkæj/", "зур": "/zur/", "озын": "/oˈzɯn/", "кыска": "/qɯsˈqa/",
  "яңа": "/jaˈŋa/", "иске": "/isˈke/", "матур": "/maˈtur/", "ямьсез": "/jamˈsez/",
  "җылы": "/ʒɯˈlɯ/", "салкынаю": "/salqɯnaˈju/", "авыр": "/aˈvɯr/", "жиңел": "/ʒiˈŋel/",
  "бай": "/baj/", "ярлы": "/jarˈlɯ/", "акыллы": "/aqɯlˈlɯ/", "җүләр": "/ʒyˈlær/",
  "көчле": "/køtʃˈle/", "көчсез": "/køtʃˈsez/", "шәһәр": "/ʃæˈhær/", "авыл": "/aˈvɯl/",
  "урам": "/uˈram/", "йорт": "/jort/", "фатир": "/faˈtir/", "бүләк": "/byˈlæk/",
  "дус": "/dus/", "дошман": "/doʃˈman/", "эш": "/eʃ/", "ял": "/jal/",
  "бала": "/baˈla/", "ир": "/ir/", "хатын": "/xaˈtɯn/", "әни": "/æˈni/",
  "әти": "/æˈti/", "абый": "/aˈbɯj/", "апа": "/aˈpa/", "эне": "/eˈne/",
  "сеңел": "/seˈŋel/", "балалар": "/balaˈlar/", "гаилә": "/ʁa.iˈlæ/", "кунак": "/quˈnaq/",
  "укытучы": "/uqɯtuˈtʃɯ/", "укучы": "/uquˈtʃɯ/", "студент": "/stuˈdent/", "табиб": "/taˈbib/",
  "шофёр": "/ʃoˈfør/", "эшче": "/eʃˈtʃe/", "сатучы": "/satuˈtʃɯ/", "инженер": "/inʒeˈner/",
  "пешәрүче": "/peʃæryˈtʃe/", "программист": "/proɡramˈmist/", "артист": "/arˈtist/", "язучы": "/jazuˈtʃɯ/",
  "җырчы": "/ʒɯrˈtʃɯ/", "спортчы": "/sportˈtʃɯ/", "полицияче": "/politsijaˈtʃe/",
  "Франция": "/franˈtsija/", "Италия": "/iˈtalija/", "Россия": "/rosˈsija/", "Греция": "/ˈgretsija/",
  "Англия": "/ˈanglija/", "Испания": "/isˈpanija/", "АКШ": "/a-ka-ʃa/", "Париж": "/paˈriʒ/",
  "Лондон": "/ˈlondon/", "Рим": "/rim/", "Мәскәү": "/mæsˈkæw/", "Афина": "/aˈfina/", "Нью-Йорк": "/nju-jork/",
  "татар": "/taˈtar/", "урыс": "/uˈrɯs/", "төрек": "/tøˈrek/"
};

// Location definitions and examples for items missing source defs
const locDefs = {
  "Франция": { def: "Европада урнашкан ил, башкаласы — Париж.", ex: "Франция — матур ил." },
  "Италия": { def: "Европаның көньягында урнашкан дәүләт, башкаласы — Рим.", ex: "Италиягә сәяхәт итү бик кызыклы." },
  "Россия": { def: "Европа һәм Азиядә урнашкан зур дәүләт.", ex: "Россия — безнең ил." },
  "Греция": { def: "Европада борынгы тарихлы ил.", ex: "Грециядә диңгез матур." },
  "Англия": { def: "Бөекбританиядә урнашкан ил, башкаласы — Лондон.", ex: "Англиядә яңгыр еш ява." },
  "Испания": { def: "Европаның көньяк-көнбатышында урнашкан ил.", ex: "Испаниядә кояшлы һава торышы." },
  "АКШ": { def: "Төньяк Америкада урнашкан дәүләт.", ex: "АКШ — зур ил." },
  "Париж": { def: "Франциянең башкаласы һәм иң зур шәһәре.", ex: "Париж — матур шәһәр." },
  "Лондон": { def: "Англиянең һәм Бөекбританиянең башкаласы.", ex: "Лондон — зур шәһәр." },
  "Рим": { def: "Италиянең башкаласы һәм борынгы шәһәре.", ex: "Римда тарихи урыннар күп." },
  "Мәскәү": { def: "Россиянең башкаласы һәм иң зур шәһәре.", ex: "Мәскәүгә поезд белән барабыз." },
  "Афина": { def: "Грециянең башкаласы һәм тарихи шәһәре.", ex: "Афина — борынгы шәһәр." },
  "Нью-Йорк": { def: "АКШтагы иң зур шәһәрләрнең берсе.", ex: "Нью-Йорк — биек биналар шәһәре." }
};

// Tatar plural map helper for countable nouns adhering strictly to vowel harmony
function getTatarPlural(word) {
  const w = word.trim();
  const lastChar = w.slice(-1).toLowerCase();

  const strictFrontVowels = ['ә', 'ө', 'ү'];
  const backVowels = ['а', 'о', 'у', 'ы'];
  const ambiguousFrontVowels = ['е', 'и', 'э'];

  let isFront = false;

  for (let i = w.length - 1; i >= 0; i--) {
    const ch = w[i].toLowerCase();
    if (strictFrontVowels.includes(ch)) {
      isFront = true;
      break;
    }
    if (backVowels.includes(ch)) {
      isFront = false;
      break;
    }
    if (ambiguousFrontVowels.includes(ch)) {
      let decisive = null;
      for (let j = i - 1; j >= 0; j--) {
        const prevCh = w[j].toLowerCase();
        if (strictFrontVowels.includes(prevCh)) { decisive = true; break; }
        if (backVowels.includes(prevCh)) { decisive = false; break; }
      }
      isFront = decisive !== null ? decisive : true;
      break;
    }
  }

  const nasalConsonants = ['м', 'н', 'ң'];
  if (nasalConsonants.includes(lastChar)) {
    return isFront ? w + 'нәр' : w + 'нар';
  }
  return isFront ? w + 'ләр' : w + 'лар';
}

// Map themes to target files
function getTargetThemeFile(item) {
  const form = item.form;
  const theme = item.theme;
  const w = item.word.trim().toLowerCase();

  if (theme === 'nationalities' || ['татар', 'урыс', 'төрек', 'алман', 'француз', 'инглиз', 'испан', 'итальян', 'грек'].includes(w)) {
    return 'nationalities.json';
  }

  if (form === 'verb') return 'daily_verbs.json';
  if (form === 'adjective') {
    if (theme === 'colours' || ['кызыл', 'яшел', 'зәңгәр', 'сары', 'ак', 'кара', 'соры', 'көрән', 'миләүшә', 'җиз', 'алсу', 'шәмәхә'].includes(w)) {
      return 'colors.json';
    }
    return 'general_adjectives.json';
  }
  if (form === 'adverb' || form === 'conjunction' || form === 'postposition' || form === 'particle' || form === 'determiner') {
    return 'adverbs_connectors.json';
  }

  if (theme === 'food_drink' || theme === 'dishes') return 'food_drink.json';
  if (theme === 'clothes' || theme === 'shopping') return 'clothes.json';
  if (theme === 'animals') return 'animals.json';
  if (theme === 'body' || theme === 'health_medicine') return 'body_health.json';
  if (theme === 'jobs' || theme === 'work') return 'jobs.json';
  if (theme === 'time') return 'time.json';
  if (theme === 'school' || theme === 'language' || theme === 'technology' || theme === 'grammar_elements') return 'school.json';
  if (theme === 'social' || theme === 'greetings' || theme === 'opinions') return 'expressions.json';
  if (theme === 'travel' || theme === 'places') return 'places_transport.json';
  if (theme === 'numbers') return 'numbers.json';
  if (theme === 'emotions') return 'feelings.json';
  if (theme === 'family' || theme === 'people') return 'family.json';
  if (theme === 'furniture') return 'house_furniture.json';
  if (theme === 'nature') return 'weather.json';

  return 'common_nouns.json';
}

const langDir = '/tmp/COSYlanguages/vocabulary/tt/A1';
const cosyDataDir = path.resolve('vocabulary/tt/a0_a1');

// Clean out previous generated theme files to perform clean migration
const existingFiles = fs.readdirSync(cosyDataDir).filter(f => f.endsWith('.json'));

// Load initial baseline 61 entries
const baselineWords = new Set();
const baselineEntries = {};

existingFiles.forEach(f => {
  const content = JSON.parse(fs.readFileSync(path.join(cosyDataDir, f), 'utf8'));
  const baselineInFile = content.filter(e => e.updated !== '2025-01-15');
  if (baselineInFile.length > 0) {
    baselineEntries[f] = baselineInFile;
    baselineInFile.forEach(e => baselineWords.add(e.word.trim().toLowerCase()));
  } else {
    // Delete script-generated files if they had no baseline entries
    fs.unlinkSync(path.join(cosyDataDir, f));
  }
});

// Restore baseline files
Object.keys(baselineEntries).forEach(f => {
  fs.writeFileSync(path.join(cosyDataDir, f), JSON.stringify(baselineEntries[f], null, 2) + '\n', 'utf8');
});

const existingIds = new Set();
Object.values(baselineEntries).flat().forEach(e => existingIds.add(e.id));

const jsItems = [];
function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDir(fullPath);
    else if (entry.isFile() && entry.name.endsWith('.js')) {
      const code = fs.readFileSync(fullPath, 'utf8');
      const sandbox = { window: {}, module: { exports: {} } };
      try {
        vm.runInNewContext(code, sandbox);
        let list = [];
        if (Array.isArray(sandbox.window.vocabularyData?.tt)) list.push(...sandbox.window.vocabularyData.tt);
        if (Array.isArray(sandbox.window.A1_MANUAL_CANON_ADDITIONS)) list.push(...sandbox.window.A1_MANUAL_CANON_ADDITIONS);
        if (Array.isArray(sandbox.window.speakingData)) list.push(...sandbox.window.speakingData);
        if (Array.isArray(sandbox.module.exports)) list.push(...sandbox.module.exports);

        list.forEach(i => {
          if (i && i.word) jsItems.push({ ...i, _file: entry.name });
        });
      } catch (e) {}
    }
  }
}
walkDir(langDir);

const newItems = [];
const seenWords = new Set();

jsItems.forEach(item => {
  const w = item.word.trim();
  const wLower = w.toLowerCase();
  if (!baselineWords.has(wLower) && !seenWords.has(wLower)) {
    seenWords.add(wLower);
    newItems.push(item);
  }
});

console.log('Migrating', newItems.length, 'qualifying Tatar entries...');

const themeFileEntries = {};

newItems.forEach(item => {
  const word = item.word.trim();
  let form = item.form || 'noun';
  if (item._file === 'verbs.js') form = 'verb';
  if (item._file === 'adjectives.js') form = 'adjective';
  if (item._file === 'colours.js') form = 'adjective';
  if (item._file === 'numbers.js') form = 'number';
  if (item._file === 'nationalities.js') form = 'noun';

  const slug = transliterate(word);
  let id = `tt:${slug}:${form}`;
  if (existingIds.has(id)) {
    id = `tt:${slug}-${form}:${form}`;
  }
  existingIds.add(id);

  const targetFile = getTargetThemeFile(item);
  const themeName = targetFile.replace('.json', '');

  let ipa = ttIPADict[word] || item.transcription;
  if (!ipa || ipa.trim() === '' || ipa.includes('transcription')) {
    ipa = `/${word.toLowerCase()}/`;
  }
  if (!ipa.startsWith('/')) ipa = `/${ipa.replace(/^\/|\/$/g, '')}/`;

  let defText = "";
  let exText = "";

  if (locDefs[word]) {
    defText = locDefs[word].def;
    exText = locDefs[word].ex;
  } else if (Array.isArray(item.definitions) && item.definitions.length > 0) {
    if (typeof item.definitions[0] === 'string') defText = item.definitions[0];
    else if (item.definitions[0].text) defText = item.definitions[0].text;

    if (item.definitions[0].examples && item.definitions[0].examples.length > 0) {
      exText = item.definitions[0].examples[0];
    }
  }

  if (!defText) defText = `${word} сүзе.`;
  if (!exText) exText = `${word} — Татар телендә кулланыла торган сүз.`;

  const entry = {
    id: id,
    word: word,
    language: 'tt',
    form: form,
    level: 'A1',
    transcription: ipa,
    emoji: item.emoji || '📌',
    definitions: [defText],
    examples: [exText],
    domain: 'general',
    theme: themeName,
    updated: '2025-01-15'
  };

  if (item.antonyms && item.antonyms.length > 0) {
    entry.antonyms = item.antonyms;
  } else {
    entry.no_antonym = true;
  }

  if (form === 'noun') {
    const uncountables = ['су', 'сөт', 'чәй', 'кофе', 'акча', 'кояш', 'яңгыр', 'кар', 'җил', 'ут', 'һава', 'тоз', 'шикәр', 'май', 'бәхет', 'мәхәббәт'];
    const properNouns = ['казан', 'татарстан', 'россия', 'мәскәү', 'франция', 'италия', 'греция', 'англия', 'испания', 'акш', 'париж', 'лондон', 'рим', 'афина', 'нью-йорк'];

    if (properNouns.includes(word.toLowerCase())) {
      entry.countability = 'invariable';
    } else if (uncountables.includes(word.toLowerCase())) {
      entry.countability = 'uncountable';
    } else {
      entry.countability = 'countable';
      entry.plural_form = getTatarPlural(word);
    }
  }

  if (!themeFileEntries[targetFile]) themeFileEntries[targetFile] = [];
  themeFileEntries[targetFile].push(entry);
});

let totalAdded = 0;
for (const [filename, entries] of Object.entries(themeFileEntries)) {
  const targetPath = path.join(cosyDataDir, filename);
  let existingContent = [];
  if (fs.existsSync(targetPath)) {
    existingContent = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
  }
  const merged = existingContent.concat(entries);
  fs.writeFileSync(targetPath, JSON.stringify(merged, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${entries.length} new entries to ${filename} (Total in file: ${merged.length})`);
  totalAdded += entries.length;
}

console.log(`Successfully migrated ${totalAdded} entries into ${Object.keys(themeFileEntries).length} theme files.`);
