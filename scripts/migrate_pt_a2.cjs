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

const ptIPA = {
  "Alemanha": "/ɐlɨˈmɐɲɐ/",
  "Canadá": "/kɐnɐˈda/",
  "México": "/ˈmɛksiku/",
  "Egito": "/iˈʒitu/",
  "Turquia": "/tuɾˈki.ɐ/",
  "Portugal": "/puɾtuˈɡaɫ/",
  "Armênia": "/ɐɾˈmɨniɐ/",
  "Geórgia": "/ʒiˈɔɾʒiɐ/",
  "Berlim": "/bɨɾˈlĩ/",
  "Madrid": "/mɐˈdɾid/",
  "Toronto": "/tuˈɾõtu/",
  "Istambul": "/iʃtɐ̃ˈbuɫ/",
  "Lisboa": "/liʒˈboɐ/",
  "Erevan": "/ɨɾɨˈvɐ̃/",
  "Tbilisi": "/tbiliˈsi/",
  "Kazan": "/kɐˈzɐ̃/"
};

const ptDefs = {
  "Alemanha": "País situado na Europa Central com capital em Berlim.",
  "Canadá": "Extenso país da América do Norte com capital em Otava.",
  "México": "País da América do Norte com rica cultura e história.",
  "Egito": "País do nordeste da África famoso pelas suas pirâmides.",
  "Turquia": "País transcontinental situado entre a Europa e a Ásia.",
  "Portugal": "País europeu localizado na península Ibérica junto ao Atlântico.",
  "Armênia": "País montanhoso sem litoral na região do Cáucaso.",
  "Geórgia": "País localizado na interseção entre a Europa Oriental e a Ásia Ocidental.",
  "Berlim": "Capital e maior cidade da Alemanha.",
  "Madrid": "Capital de Espanha e a sua cidade mais populosa.",
  "Toronto": "A maior cidade do Canadá situada junto ao lago Ontário.",
  "Istambul": "Cidade histórica turca que liga dois continentes.",
  "Lisboa": "Capital e maior cidade de Portugal junto ao rio Tejo.",
  "Erevan": "Capital e maior cidade da República da Armênia.",
  "Tbilisi": "Capital e maior metrópole da Geórgia.",
  "Kazan": "Cidade histórica da Rússia situada junto ao rio Volga."
};

const ptExamples = {
  "Alemanha": "A Alemanha tem belas cidades históricas e paisagens naturais.",
  "Canadá": "O Canadá é famoso pelas suas florestas e lagos naturais.",
  "México": "O México atrai muitos visitantes com as suas belas praias.",
  "Egito": "O Egito possui monumentos antigos ao longo do rio Nilo.",
  "Turquia": "A Turquia combina tradições culturais da Europa e da Ásia.",
  "Portugal": "Portugal tem praias fantásticas ao longo do oceano Atlântico.",
  "Armênia": "A Armênia tem montanhas impressionantes e belas igrejas.",
  "Geórgia": "A Geórgia é famosa pela sua hospitalidade e gastronomia.",
  "Berlim": "Em Berlim visitámos a famosa Porta de Brandremburgo.",
  "Madrid": "Em Madrid passeámos pelo lindo Parque do Retiro.",
  "Toronto": "Em Toronto visitámos a famosa torre de televisão CN Tower.",
  "Istambul": "Em Istambul atravessámos o estreito do Bósforo de barco.",
  "Lisboa": "Em Lisboa andámos nos elétricos amarelos pelas ruas antigas.",
  "Erevan": "Em Erevan temos uma vista bonita do monte Ararat.",
  "Tbilisi": "Em Tbilisi os visitantes gostam dos banhos termais históricos.",
  "Kazan": "Em Kazan situa-se um belo kremlin histórico."
};

const flags = {
  "Alemanha": "🇩🇪", "Canadá": "🇨🇦", "México": "🇲🇽", "Egito": "🇪🇬",
  "Turquia": "🇹🇷", "Portugal": "🇵🇹", "Armênia": "🇦🇲", "Geórgia": "🇬🇪",
  "Berlim": "🏛️", "Madrid": "🏛️", "Toronto": "🏙️", "Istambul": "🕌",
  "Lisboa": "🇵🇹", "Erevan": "🇦🇲", "Tbilisi": "🇬🇪", "Kazan": "🕌"
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

collectExistingIds(path.join(rootDir, 'vocabulary', 'pt', 'a0_a1'));

const sourceDir = '/tmp/COSYlanguages/vocabulary/pt/A2';
const targetDir = path.join(rootDir, 'vocabulary', 'pt', 'a2');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const locItems = loadFile(path.join(sourceDir, 'locations.js'));
const entries = [];

for (const item of locItems) {
  const word = item.word.trim();
  const slug = slugify(word);
  const id = `pt:${slug}:noun`;

  if (existingIds.has(id)) continue;
  existingIds.add(id);

  const entry = {
    id: id,
    word: word,
    language: 'pt',
    form: 'noun',
    level: 'A2',
    transcription: ptIPA[word] || '/.../',
    emoji: flags[word] || '🏛️',
    definitions: [ptDefs[word] || `Lugar geográfico chamado ${word}.`],
    examples: [ptExamples[word] || `${word} é um ótimo destino para visitar.`],
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
