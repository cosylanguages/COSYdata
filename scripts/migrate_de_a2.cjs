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
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const deIPA = {
  "Deutschland": "/ˈdɔʏtʃlant/",
  "Kanada": "/ˈkaːnada/",
  "Mexiko": "/ˈmɛksiko/",
  "Ägypten": "/ɛˈɡʏptn̩/",
  "Türkei": "/tʏʁˈkaɪ̯/",
  "Portugal": "/ˈpɔʁtuɡal/",
  "Armenien": "/aʁˈmeːni̯ən/",
  "Georgien": "/ɡeˈɔʁɡi̯ən/",
  "Berlin": "/bɛʁˈliːn/",
  "Madrid": "/maˈdʁɪt/",
  "Toronto": "/toˈʁɔnto/",
  "Istanbul": "/ˈɪstanbul/",
  "Lissabon": "/ˈlɪsabɔn/",
  "Eriwan": "/ˈeːʁivan/",
  "Tiflis": "/ˈtɪflɪs/",
  "Kasan": "/kaˈzaːn/"
};

const deDefs = {
  "Deutschland": "Ein Bundesstaat in Mitteleuropa mit der Hauptstadt Berlin.",
  "Kanada": "Ein großes Land in Nordamerika mit der Hauptstadt Ottawa.",
  "Mexiko": "Ein Land im Süden von Nordamerika mit reichhaltiger Kultur.",
  "Ägypten": "Ein Land im Nordosten von Afrika, bekannt für die Pyramiden.",
  "Türkei": "Ein Staat, der sich über Südosteuropa und Vorderasien erstreckt.",
  "Portugal": "Ein europäisches Land auf der Iberischen Halbinsel am Atlantik.",
  "Armenien": "Ein Binnenland in der Kaukasusregion mit alter Geschichte.",
  "Georgien": "Ein Staat an der Schnittstelle zwischen Osteuropa und Westasien.",
  "Berlin": "Die Bundeshauptstadt und größte Stadt von Deutschland.",
  "Madrid": "Die Hauptstadt und größte Metropole von Spanien.",
  "Toronto": "Die größte Stadt in Kanada am Nordufer des Ontariosees.",
  "Istanbul": "Die größte Stadt der Türkei, die zwei Kontinente verbindet.",
  "Lissabon": "Die Hauptstadt und größte Küstenstadt von Portugal.",
  "Eriwan": "Die Hauptstadt und größte Stadt der Republik Armenien.",
  "Tiflis": "Die Hauptstadt und größte Metropole des Staates Georgien.",
  "Kasan": "Eine bedeutende historische Großstadt an der Wolga in Russland."
};

const deExamples = {
  "Deutschland": "Deutschland hat viele historische Städte und eine schöne Landschaft.",
  "Kanada": "Kanada ist bekannt für seine beeindruckenden Wälder und Seen.",
  "Mexiko": "Mexiko zieht jedes Jahr Millionen von Touristen an.",
  "Ägypten": "Ägypten liegt am Nil und besitzt weltberühmte alte Bauwerke.",
  "Türkei": "Die Türkei verbindet kulinarische Traditionen aus Europa und Asien.",
  "Portugal": "Portugal hat lange Küstenabschnitte mit feinem Sandstrand.",
  "Armenien": "Armenien hat eine wunderschöne bergige Landschaft.",
  "Georgien": "Georgien ist berühmt für seine gastfreundliche Kultur und Küche.",
  "Berlin": "In Berlin besuchen viele Touristen das historische Brandenburger Tor.",
  "Madrid": "In Madrid kann man berühmte Museen und schöne Parks besuchen.",
  "Toronto": "In Toronto steht der bekannte Fernsehturm CN Tower.",
  "Istanbul": "In Istanbul überquert man den Bosporus zwischen zwei Kontinenten.",
  "Lissabon": "In Lissabon fahren die gelben Straßenbahnen durch alte Gassen.",
  "Eriwan": "In Eriwan hat man einen wunderbaren Blick auf den Berg Ararat.",
  "Tiflis": "In Tiflis schätzen Besucher die historischen Schwefelbäder.",
  "Kasan": "In Kasan steht ein prächtiger Kreml an der Wolga."
};

const flags = {
  "Deutschland": "🇩🇪", "Kanada": "🇨🇦", "Mexiko": "🇲🇽", "Ägypten": "🇪🇬",
  "Türkei": "🇹🇷", "Portugal": "🇵🇹", "Armenien": "🇦🇲", "Georgien": "🇬🇪",
  "Berlin": "🏛️", "Madrid": "🏛️", "Toronto": "🏙️", "Istanbul": "🕌",
  "Lissabon": "🇵🇹", "Eriwan": "🇦🇲", "Tiflis": "🇬🇪", "Kasan": "🕌"
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

collectExistingIds(path.join(rootDir, 'vocabulary', 'de', 'a0_a1'));

const sourceDir = '/tmp/COSYlanguages/vocabulary/de/A2';
const targetDir = path.join(rootDir, 'vocabulary', 'de', 'a2');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const locItems = loadFile(path.join(sourceDir, 'locations.js'));
const entries = [];

for (const item of locItems) {
  const word = item.word.trim();
  const slug = slugify(word);
  const id = `de:${slug}:noun`;

  if (existingIds.has(id)) continue;
  existingIds.add(id);

  const entry = {
    id: id,
    word: word,
    language: 'de',
    form: 'noun',
    level: 'A2',
    transcription: deIPA[word] || '/.../',
    emoji: flags[word] || '🏛️',
    definitions: [deDefs[word] || `Geografischer Ort namens ${word}.`],
    examples: [deExamples[word] || `${word} ist ein schönes Reiseziel.`],
    domain: 'general, travel',
    theme: 'places_transport',
    updated: '2025-01-15',
    no_antonym: true,
    countability: 'invariable'
  };

  if (word === "Türkei") {
    entry.article = "die";
    entry.gender = "feminine";
  }

  entries.push(entry);
}

const filePath = path.join(targetDir, 'places_transport.json');
fs.writeFileSync(filePath, JSON.stringify(entries, null, 2) + '\n', 'utf8');
console.log(`Wrote ${entries.length} entries to ${filePath}`);
