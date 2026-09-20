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

const baIPA = {
  "Германия": "/ɡerˈmanija/",
  "Канада": "/kaˈnada/",
  "Мексика": "/ˈmeksika/",
  "Египет": "/jeˈɡipet/",
  "Төркиә": "/tørkiˈæ/",
  "Португалия": "/portuˈɡalija/",
  "Армения": "/arˈmenija/",
  "Грузия": "/ˈɡruzija/",
  "Берлин": "/berˈlin/",
  "Мадрид": "/madˈrid/",
  "Торонто": "/toˈronto/",
  "Стамбул": "/stamˈbul/",
  "Лиссабон": "/lisaˈbon/",
  "Ереван": "/jereˈvan/",
  "Тбилиси": "/tbiˈlisi/",
  "Казан": "/kaˈzan/"
};

const baDefs = {
  "Германия": "Европа үҙәгендә урынлашҡан дәүләт, баш ҡалаһы — Берлин.",
  "Канада": "Һүҙһеҙ Төньяҡ Америкала урынлашҡан ҙур ил, баш ҡалаһы — Оттава.",
  "Мексика": "Төньяҡ Америкалағы бай тарихлы дәүләт.",
  "Египет": "Африканың төньяҡ-юнәлешендә урынлашҡан, пирамидалары менән билдәле ил.",
  "Төркиә": "Европа менән Азия сигендә урынлашҡан дәүләт.",
  "Португалия": "Европала Антлантик океан ярында урынлашҡан дәүләт.",
  "Армения": "Кавказ төбәгендә урынлашҡан тарихи ил.",
  "Грузия": "Ҡара диңгеҙ ярында урынлашҡан дәүләт.",
  "Берлин": "Германияның баш ҡалаһы һәм иң ҙур ҡалаһы.",
  "Мадрид": "Испанияның баш ҡалаһы һәм иң ҙур ҡалаһы.",
  "Торонто": "Канадалағы иң ҙур ҡала.",
  "Стамбул": "Төркиәлә ике ҡитғаны тоташтырған тарихи ҡала.",
  "Лиссабон": "Португалияның баш ҡалаһы.",
  "Ереван": "Арменияның баш ҡалаһы һәм иң ҙур ҡалаһы.",
  "Тбилиси": "Грузияның баш ҡалаһы.",
  "Казан": "Волга ярында урынлашҡан тарихи ҙур ҡала."
};

const baExamples = {
  "Германия": "Германия — Европалағы тарихи һәм матур ил.",
  "Канада": "Канада үҙенең матур урмандары менән билдәле.",
  "Мексика": "Мексика иленә йыл һайын күп туристар килә.",
  "Египет": "Египет илендә боронғо тарихи пирамидалар бар.",
  "Төркиә": "Төркиә — туристар яратып килә торған ил.",
  "Португалия": "Португалия Океан ярында урынлашҡан.",
  "Армения": "Армения — таулы һәм матур ил.",
  "Грузия": "Грузия үҙенең ҡунаҡсыллығы менән билдәле.",
  "Берлин": "Берлин ҡалаһында күп музейҙар бар.",
  "Мадрид": "Мадрид — Испанияның иң матур ҡалаһы.",
  "Торонто": "Торонто — Канаданың ҙур заманса ҡалаһы.",
  "Стамбул": "Стамбул ҡалаһы ике ҡитғаны тоташтыра.",
  "Лиссабон": "Лиссабон — Португалияның диңгеҙ ярындағы баш ҡалаһы.",
  "Ереван": "Ереван ҡалаһында тарихи урындар күп.",
  "Тбилиси": "Тбилиси — Грузияның матур баш ҡалаһы.",
  "Казан": "Казан ҡалаһы Волга йылғаһы ярында урынлашҡан."
};

const flags = {
  "Германия": "🇩🇪", "Канада": "🇨🇦", "Мексика": "🇲🇽", "Египет": "🇪🇬",
  "Төркиә": "🇹🇷", "Португалия": "🇵🇹", "Армения": "🇦🇲", "Грузия": "🇬🇪",
  "Берлин": "🏛️", "Мадрид": "🏛️", "Торонто": "🏙️", "Стамбул": "🕌",
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

collectExistingIds(path.join(rootDir, 'vocabulary', 'ba', 'a0_a1'));

const sourceDir = '/tmp/COSYlanguages/vocabulary/ba/A2';
const targetDir = path.join(rootDir, 'vocabulary', 'ba', 'a2');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const locItems = loadFile(path.join(sourceDir, 'locations.js'));
const entries = [];

for (const item of locItems) {
  const word = item.word.trim();
  const slug = transliterate(word);
  const id = `ba:${slug}:noun`;

  if (existingIds.has(id)) continue;
  existingIds.add(id);

  const entry = {
    id: id,
    word: word,
    language: 'ba',
    form: 'noun',
    level: 'A2',
    transcription: baIPA[word] || '/.../',
    emoji: flags[word] || '🏛️',
    definitions: [baDefs[word] || `Географик урын ${word}.`],
    examples: [baExamples[word] || `${word} — бик ҡыҙыҡлы урын.`],
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
