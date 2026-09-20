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

const esIPA = {
  "Alemania": "/aleˈmanja/",
  "Canadá": "/kanaˈda/",
  "México": "/ˈmexiko/",
  "Egipto": "/eˈxipto/",
  "Turquía": "/tuɾˈki.a/",
  "Portugal": "/poɾtuˈɣal/",
  "Armenia": "/aɾˈmenja/",
  "Georgia": "/ˈxeoɾxja/",
  "Berlín": "/beɾˈlin/",
  "Madrid": "/maˈðɾið/",
  "Toronto": "/toˈɾonto/",
  "Estambul": "/estamˈbul/",
  "Lisboa": "/lizˈβoa/",
  "Ereván": "/eɾeˈβan/",
  "Tiflis": "/ˈtiflis/",
  "Kazán": "/kaˈsan/"
};

const esDefs = {
  "Alemania": "País situado en el centro de Europa con capital en Berlín.",
  "Canadá": "Extenso país de América del Norte con capital en Ottawa.",
  "México": "País de América del Norte con rica historia y cultura.",
  "Egipto": "País del noreste de África famoso por sus pirámides históricas.",
  "Turquía": "País transcontinental situado entre Europa y Asia.",
  "Portugal": "País europeo ubicado en la península ibérica junto al océano Atlántico.",
  "Armenia": "País montañoso sin litoral en la región del Cáucaso.",
  "Georgia": "País situado en la intersección entre Europa Oriental y Asia Occidental.",
  "Berlín": "Capital y ciudad más grande de Alemania.",
  "Madrid": "Capital de España y su ciudad más poblada.",
  "Toronto": "La ciudad más grande de Canadá a orillas del lago Ontario.",
  "Estambul": "Ciudad histórica turca que conecta dos continentes.",
  "Lisboa": "Capital y mayor ciudad de Portugal a orillas del Tajo.",
  "Ereván": "Capital y mayor ciudad de la República de Armenia.",
  "Tiflis": "Capital y mayor metrópoli de Georgia.",
  "Kazán": "Ciudad histórica de Rusia a orillas del río Volga."
};

const esExamples = {
  "Alemania": "Alemania tiene hermosas ciudades históricas y grandes bosques.",
  "Canadá": "Canadá es famoso por sus paisajes naturales y grandes bosques.",
  "México": "México atrae a millones de turistas por sus hermosas playas.",
  "Egipto": "Egipto tiene monumentos antiguos a lo largo del río Nilo.",
  "Turquía": "Turquía combina tradiciones culinarias de Europa y Asia.",
  "Portugal": "Portugal tiene hermosas playas a lo largo del océano Atlántico.",
  "Armenia": "Armenia posee hermosas montañas e históricas iglesias.",
  "Georgia": "Georgia es famosa por su hospitalidad y su rica gastronomía.",
  "Berlín": "En Berlín muchos turistas visitan la famosa Puerta de Brandemburgo.",
  "Madrid": "En Madrid caminamos por el hermoso Parque del Retiro.",
  "Toronto": "En Toronto visitamos la famosa torre de televisión CN Tower.",
  "Estambul": "En Estambul cruzamos el estrecho del Bósforo en barco.",
  "Lisboa": "En Lisboa recorrimos sus calles históricas en tranvía amarillo.",
  "Ereván": "En Ereván se observa una hermosa vista del monte Ararat.",
  "Tiflis": "En Tiflis los viajeros disfrutan de los baños termales.",
  "Kazán": "En Kazán se encuentra un hermoso kremlin histórico."
};

const flags = {
  "Alemania": "🇩🇪", "Canadá": "🇨🇦", "México": "🇲🇽", "Egipto": "🇪🇬",
  "Turquía": "🇹🇷", "Portugal": "🇵🇹", "Armenia": "🇦🇲", "Georgia": "🇬🇪",
  "Berlín": "🏛️", "Madrid": "🏛️", "Toronto": "🏙️", "Estambul": "🕌",
  "Lisboa": "🇵🇹", "Ereván": "🇦🇲", "Tiflis": "🇬🇪", "Kazán": "🕌"
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

collectExistingIds(path.join(rootDir, 'vocabulary', 'es', 'a0_a1'));

const sourceDir = '/tmp/COSYlanguages/vocabulary/es/A2';
const targetDir = path.join(rootDir, 'vocabulary', 'es', 'a2');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const locItems = loadFile(path.join(sourceDir, 'locations.js'));
const entries = [];

for (const item of locItems) {
  const word = item.word.trim();
  const slug = slugify(word);
  const id = `es:${slug}:noun`;

  if (existingIds.has(id)) continue;
  existingIds.add(id);

  const entry = {
    id: id,
    word: word,
    language: 'es',
    form: 'noun',
    level: 'A2',
    transcription: esIPA[word] || '/.../',
    emoji: flags[word] || '🏛️',
    definitions: [esDefs[word] || `Lugar geográfico llamado ${word}.`],
    examples: [esExamples[word] || `${word} es un lugar muy interesante para visitar.`],
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
