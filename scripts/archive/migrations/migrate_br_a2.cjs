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

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const brIPA = {
  "Alamagn": "/aˈlaːmãn/",
  "Kanada": "/kaˈnãːda/",
  "Mec'hiko": "/meˈxiːko/",
  "Egipt": "/ˈeːɡipt/",
  "Turkia": "/tyrˈkiːa/",
  "Portugal": "/porˈtyːɡal/",
  "Armenia": "/arˈmẽːnia/",
  "Jorjia": "/ˈʒɔrʒia/",
  "Berlin": "/berˈlin/",
  "Madrid": "/maˈdrid/",
  "Toronto": "/toˈronto/",
  "Istanbul": "/isˈtanbul/",
  "Lisbon": "/lisˈbõn/",
  "Yerevan": "/jeˈreːvan/",
  "Tbilisi": "/tbiˈliːsi/",
  "Kazan": "/kaˈzãn/"
};

const brDefs = {
  "Alamagn": "Ur vro eus Kreiz Europa gant Berlin da bennkêr.",
  "Kanada": "Ur vro vras e Norzhamerika gant Ottawa da bennkêr.",
  "Mec'hiko": "Ur vro e su Norzhamerika gant un istor binvidik.",
  "Egipt": "Ur vro e biz Afrika, brudet evit he firamidoù.",
  "Turkia": "Ur vro lec'hiet etre Europa hag Azia.",
  "Portugal": "Ur vro eus Europa war ribl an Meurvor Atlantel.",
  "Armenia": "Ur vro fers e rannvro ar C'haokaz gant Yerevan da bennkêr.",
  "Jorjia": "Ur vro lec'hiet war ribl ar Mor du.",
  "Berlin": "Kêr-benn ha kêr vrasañ Alamagn.",
  "Madrid": "Kêr-benn ha kêr vrasañ Bro-Spagn.",
  "Toronto": "Kêr vrasañ Kanada e-kichen al lenn Ontario.",
  "Istanbul": "Kêr istorel eus Turkia a liamm daou gevandir.",
  "Lisbon": "Kêr-benn ha kêr vrasañ Portugal.",
  "Yerevan": "Kêr-benn ha kêr vrasañ Armenia.",
  "Tbilisi": "Kêr-benn ha kêr vrasañ Jorjia.",
  "Kazan": "Ur gêr istorel vras war ribl ar stêr Volga e Rusia."
};

const brExamples = {
  "Alamagn": "Alamagn zo ur vro istorel eus Europa gant kalz koadoù.",
  "Kanada": "Kanada zo brudet evit he c'hoadoù hag he lennoù bras.",
  "Mec'hiko": "Mec'hiko zo ur vro vras ha brav e Norzhamerika.",
  "Egipt": "Egipt zo brudet evit he firamidoù kozh.",
  "Turkia": "Turkia zo ur vro etre Europa hag Azia.",
  "Portugal": "Portugal zo ur vro e kornôg Europa.",
  "Armenia": "Armenia zo ur vro gant menezioù kaer.",
  "Jorjia": "Jorjia zo ur vro gaer war ribl ar Mor Du.",
  "Berlin": "E Berlin e c'haller gweladenniñ kalz mirdi.",
  "Madrid": "Madrid zo kêr-benn gaer Bro-Spagn.",
  "Toronto": "E Toronto emañ an tour brudet CN Tower.",
  "Istanbul": "Istanbul zo ur gêr istorel hag un amzer gaer.",
  "Lisbon": "Lisbon zo kêr-benn gaer Portugal e-kichen ar mor.",
  "Yerevan": "Yerevan zo kêr-benn istorel Armenia.",
  "Tbilisi": "Tbilisi zo kêr-benn Jorjia gant kouronkoù-tomm.",
  "Kazan": "E Kazan e c'haller gweladenniñ ur c'hremlin istorel."
};

const flags = {
  "Alamagn": "🇩🇪", "Kanada": "🇨🇦", "Mec'hiko": "🇲🇽", "Egipt": "🇪🇬",
  "Turkia": "🇹🇷", "Portugal": "🇵🇹", "Armenia": "🇦🇲", "Jorjia": "🇬🇪",
  "Berlin": "🏛️", "Madrid": "🏛️", "Toronto": "🏙️", "Istanbul": "🕌",
  "Lisbon": "🇵🇹", "Yerevan": "🇦🇲", "Tbilisi": "🇬🇪", "Kazan": "🕌"
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

collectExistingIds(path.join(rootDir, 'vocabulary', 'br', 'a0_a1'));

const sourceDir = '/tmp/COSYlanguages/vocabulary/br/A2';
const targetDir = path.join(rootDir, 'vocabulary', 'br', 'a2');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const locItems = loadFile(path.join(sourceDir, 'locations.js'));
const entries = [];

for (const item of locItems) {
  const word = item.word.trim();
  const slug = slugify(word);
  const id = `br:${slug}:noun`;

  if (existingIds.has(id)) continue;
  existingIds.add(id);

  const entry = {
    id: id,
    word: word,
    language: 'br',
    form: 'noun',
    level: 'A2',
    transcription: brIPA[word] || '/.../',
    emoji: flags[word] || '🏛️',
    definitions: [brDefs[word] || `Lec'h douaroniel anvet ${word}.`],
    examples: [brExamples[word] || `${word} zo al lec'h brav evit beajiñ.`],
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
