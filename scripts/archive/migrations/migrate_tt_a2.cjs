const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const sandbox = { window: {}, module: { exports: {} }, exports: {} };
  try {
    vm.runInNewContext(content, sandbox);
    for (const k of Object.keys(sandbox)) {
      if (Array.isArray(sandbox[k])) return sandbox[k];
    }
    for (const k of Object.keys(sandbox.window)) {
      if (Array.isArray(sandbox.window[k])) return sandbox.window[k];
    }
  } catch (e) {}
  const match = content.match(/const data = (\[[\s\S]*?\]);/);
  if (match) {
    const sb = {};
    vm.runInNewContext(`data = ${match[1]}`, sb);
    return sb.data;
  }
  return [];
}

function transliterate(text) {
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

const ttIPA = {
  "Германия": "/ɡerˈmanija/",
  "Канада": "/kaˈnada/",
  "Мексика": "/ˈmeksika/",
  "Египет": "/jeˈɡipet/",
  "Төркия": "/tørkiˈja/",
  "Португалия": "/portuˈɡalija/",
  "Армения": "/arˈmenija/",
  "Грузия": "/ˈɡruzija/",
  "Берлин": "/berˈlin/",
  "Мадрид": "/madˈrid/",
  "Торонто": "/toˈronto/",
  "Истанбул": "/istanˈbul/",
  "Лиссабон": "/lisaˈbon/",
  "Ереван": "/jereˈvan/",
  "Тбилиси": "/tbiˈlisi/",
  "Казан": "/qaˈzan/"
};

const ttDefs = {
  "Германия": "Европа уртасында урнашкан дәүләт, башкаласы — Берлин.",
  "Канада": "Төньяк Америкада урнашкан зур ил, башкаласы — Оттава.",
  "Мексика": "Төньяк Америкадагы бай тарихлы ил.",
  "Египет": "Африканың төньяк-көнчыгышында урнашкан, пирамидалары белән билгеле ил.",
  "Төркия": "Европа белән Азия чигендә урнашкан дәүләт.",
  "Португалия": "Европада Атлантик океан ярында урнашкан дәүләт.",
  "Армения": "Кавказ төбәгендә урнашкан тарихи ил.",
  "Грузия": "Кара диңгез ярында урнашкан дәүләт.",
  "Берлин": "Германиянең башкаласы һәм иң зур шәһәре.",
  "Мадрид": "Испаниянең башкаласы һәм иң зур шәһәре.",
  "Торонто": "Канададагы иң зур шәһәр.",
  "Истанбул": "Төркиядә ике кыйтганы тоташтырган тарихи шәһәр.",
  "Лиссабон": "Португалиянең башкаласы һәм иң зур порты.",
  "Ереван": "Армениянең башкаласы һәм иң зур шәһәре.",
  "Тбилиси": "Грузиянең башкаласы һәм иң зур шәһәре.",
  "Казан": "Идел ярында урнашкан тарихи һәм мәдәни зур шәһәр."
};

const ttExamples = {
  "Германия": "Германия — Европаның тарихи һәм матур иле.",
  "Канада": "Канада үзеңнең матур урманары белән билгеле.",
  "Мексика": "Мексика иленә ел саен күп туристлар килә.",
  "Египет": "Египет илендә борынгы пирамидалар бар.",
  "Төркия": "Төркия — туристлар яратып килә торган ил.",
  "Португалия": "Португалия диңгез ярында урнашкан матур ил.",
  "Армения": "Армения — таулы һәм матур ил.",
  "Грузия": "Грузия үзеңнең кунакчыллыгы белән билгеле.",
  "Берлин": "Берлин шәһәрендә күп музейлар бар.",
  "Мадрид": "Мадрид — Испаниянең иң матур шәһәре.",
  "Торонто": "Торонто — Канаданың зур заманча шәһәре.",
  "Истанбул": "Истанбул шәһәре ике кыйтганы тоташтыра.",
  "Лиссабон": "Лиссабон — Португалиянең диңгез ярындагы башкаласы.",
  "Ереван": "Ереван шәһәрендә тарихи урыннар күп.",
  "Тбилиси": "Тбилиси — Грузиянең матур башкаласы.",
  "Казан": "Казан шәһәре Идел елгасы ярында урнашкан."
};

const flags = {
  "Германия": "🇩🇪", "Канада": "🇨🇦", "Мексика": "🇲🇽", "Египет": "🇪🇬",
  "Төркия": "🇹🇷", "Португалия": "🇵🇹", "Армения": "🇦🇲", "Грузия": "🇬🇪",
  "Берлин": "🏛️", "Мадрид": "🏛️", "Торонто": "🏙️", "Истанбул": "🕌",
  "Лиссабон": "🇵🇹", "Ереван": "🇦🇲", "Тбилиси": "🇬🇪", "Казан": "🕌"
};

const rootDir = path.join(__dirname, '..');
const existingIds = new Set();

function collectExistingIds(dir) {
  if (!fs.existsSync(dir)) return;
  const list = fs.readdirSync(dir);
  for (const f of list) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      collectExistingIds(p);
    } else if (f.endsWith('.json') && f !== 'index.json' && f !== 'flat-index.json') {
      const data = JSON.parse(fs.readFileSync(p, 'utf8'));
      if (Array.isArray(data)) {
        data.forEach(item => { if (item.id) existingIds.add(item.id); });
      }
    }
  }
}

collectExistingIds(path.join(rootDir, 'vocabulary', 'tt', 'a0_a1'));

const sourceDir = '/tmp/COSYlanguages/vocabulary/tt/A2';
const targetDir = path.join(rootDir, 'vocabulary', 'tt', 'a2');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const locItems = loadFile(path.join(sourceDir, 'locations.js'));
const entries = [];

for (const item of locItems) {
  const word = item.word.trim();
  const slug = transliterate(word);
  const id = `tt:${slug}:noun`;

  if (existingIds.has(id)) continue;
  existingIds.add(id);

  const entry = {
    id: id,
    word: word,
    language: 'tt',
    form: 'noun',
    level: 'A2',
    transcription: ttIPA[word] || '/.../',
    emoji: flags[word] || '🏛️',
    definitions: [ttDefs[word] || `Географик урын ${word}.`],
    examples: [ttExamples[word] || `${word} — бик кызыклы урын.`],
    domain: 'general, travel',
    theme: 'places_transport',
    updated: '2025-01-15',
    no_antonym: true,
    countability: 'invariable'
  };

  entries.push(entry);
}

const filePath = path.join(targetDir, 'places_transport.json');
fs.writeFileSync(filePath, JSON.stringify(entries, null, 2) + '\n', 'utf8');
console.log(`Wrote ${entries.length} entries to ${filePath}`);
