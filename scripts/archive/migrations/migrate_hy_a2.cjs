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
    'ա': 'a', 'բ': 'b', 'գ': 'g', 'դ': 'd', 'ե': 'e', 'զ': 'z', 'է': 'e', 'ը': 'e', 'թ': 't', 'ժ': 'zh',
    'ի': 'i', 'լ': 'l', 'խ': 'kh', 'ծ': 'ts', 'կ': 'k', 'հ': 'h', 'ձ': 'dz', 'ղ': 'gh', 'ճ': 'ch', 'մ': 'm',
    'յ': 'y', 'ն': 'n', 'շ': 'sh', 'ո': 'o', 'չ': 'ch', 'պ': 'p', 'ջ': 'j', 'ռ': 'r', 'ս': 's', 'վ': 'v',
    'տ': 't', 'ր': 'r', 'ց': 'c', 'ու': 'u', 'փ': 'p', 'ք': 'k', 'օ': 'o', 'ֆ': 'f'
  };
  return text
    .toLowerCase()
    .split('')
    .map(ch => map[ch] !== undefined ? map[ch] : ch)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const hyIPA = {
  "Գերմանիա": "/ɡɛɾmaˈnia/",
  "Կանադա": "/kanaˈda/",
  "Մեքսիկա": "/mɛkʰsiˈka/",
  "Եգիպտոս": "/jɛɡipˈtɔs/",
  "Թուրքիա": "/tʰuɾkʰiˈa/",
  "Պորտուգալիա": "/pɔɾtuɡaˈlia/",
  "Հայաստան": "/hajasaˈtan/",
  "Վրաստան": "/vɾasaˈtan/",
  "Բերլին": "/bɛɾˈlin/",
  "Մադրիդ": "/madˈɾid/",
  "Տորոնտո": "/tɔɾɔnˈtɔ/",
  "Ստամբուլ": "/stambuˈl/",
  "Լիսաբոն": "/lisaˈbɔn/",
  "Երևան": "/jɛɾɛˈvan/",
  "Թբիլիսի": "/tʰbiˈlisi/",
  "Կազան": "/kaˈzan/"
};

const hyDefs = {
  "Գերմանիա": "Եվրոպայի կենտրոնում գտնվող պետություն՝ Բեռլին մայրաքաղաքով։",
  "Կանադա": "Հյուսիսային Ամերիկայում գտնվող ընդարձակ երկիր՝ Օտտավա մայրաքաղաքով։",
  "Մեքսիկա": "Հյուսիսային Ամերիկայի հարավում գտնվող երկիր՝ հարուստ մշակույթով։",
  "Եգիպտոս": "Աֆրիկայի հյուսիս-արևելքում գտնվող երկիր՝ հայտնի բուրգերով։",
  "Թուրքիա": "Եվրոպայի և Ասիայի սահմանին գտնվող տրանսկոնտինենտալ երկիր։",
  "Պորտուգալիա": "Եվրոպական երկիր Պիրենեյան թերակղզում՝ Ատլանտյան օվկիանոսի ափին։",
  "Հայաստան": "Լեռնային երկիր Հարավային Կովկասում՝ Երևան մայրաքաղաքով։",
  "Վրաստան": "Երկիր Սև ծովի ափին՝ Թբիլիսի մայրաքաղաքով։",
  "Բերլին": "Գերմանիայի մայրաքաղաքը և ամենամեծ քաղաքը։",
  "Մադրիդ": "Իսպանիայի մայրաքաղաքը և ամենախոշոր քաղաքը։",
  "Տորոնտո": "Կանադայի ամենամեծ քաղաքը Օնտարիո լճի ափին։",
  "Ստամբուլ": "Թուրքիայի խոշորագույն պատմական քաղաքը, որը միացնում է երկու մայրցամաք։",
  "Լիսաբոն": "Պորտուգալիայի մայրաքաղաքը և խոշոր նավահանգիստը։",
  "Երևան": "Հայաստանի Հանրապետության մայրաքաղաքը և ամենամեծ քաղաքը։",
  "Թբիլիսի": "Վրաստանի մայրաքաղաքը և խոշորագույն քաղաքը։",
  "Կազան": "Ռուսաստանի պատմական խոշոր քաղաք Վոլգա գետի ափին։"
};

const hyExamples = {
  "Գերմանիա": "Գերմանիա երկիրն ունի բազմաթիվ գեղեցիկ պատմական քաղաքներ։",
  "Կանադա": "Կանադա երկիրը հայտնի է իր գեղեցիկ բնությամբ և անտառներով։",
  "Մեքսիկա": "Մեքսիկա երկիրն ունի շատ հրաշալի ծովափեր։",
  "Եգիպտոս": "Եգիպտոս երկրում գտնվում են հին հայտնի բուրգերը։",
  "Թուրքիա": "Թուրքիա երկիրն ունի հարուստ պատմություն և մշակույթ։",
  "Պորտուգալիա": "Պորտուգալիա երկիրը գտնվում է Ատլանտյան օվկիանոսի ափին։",
  "Հայաստան": "Հայաստան երկիրն ունի հին պատմություն և գեղեցիկ լեռներ։",
  "Վրաստան": "Վրաստան երկիրը հայտնի է իր հյուրընկալությամբ և խոհանոցով։",
  "Բերլին": "Բերլին քաղաքում կան բազմաթիվ թանգարաններ և պատմական վայրեր։",
  "Մադրիդ": "Մադրիդ քաղաքում մենք այցելեցինք գեղեցիկ այգիներ։",
  "Տորոնտո": "Տորոնտո քաղաքում գտնվում է հայտնի CN Tower աշտարակը։",
  "Ստամբուլ": "Ստամբուլ քաղաքը միացնում է Եվրոպան և Ասիան։",
  "Լիսաբոն": "Լիսաբոն քաղաքում շատ սիրուն հին փողոցներ կան։",
  "Երևան": "Երևան քաղաքում մենք զբոսնում ենք Հանրապետության հրապարակում։",
  "Թբիլիսի": "Թբիլիսի քաղաքում կան հին պատմական բաղնիքներ։",
  "Կազան": "Կազան քաղաքում գտնվում է գեղեցիկ պատմական կրեմլը։"
};

const flags = {
  "Գերմանիա": "🇩🇪", "Կանադա": "🇨🇦", "Մեքսիկա": "🇲🇽", "Եգիպտոս": "🇪🇬",
  "Թուրքիա": "🇹🇷", "Պորտուգալիա": "🇵🇹", "Հայաստան": "🇦🇲", "Վրաստան": "🇬🇪",
  "Բերլին": "🏛️", "Մադրիդ": "🏛️", "Տորոնտո": "🏙️", "Ստամբուլ": "🕌",
  "Լիսաբոն": "🇵🇹", "Երևան": "🇦🇲", "Թբիլիսի": "🇬🇪", "Կազան": "🕌"
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

collectExistingIds(path.join(rootDir, 'vocabulary', 'hy', 'a0_a1'));

const sourceDir = '/tmp/COSYlanguages/vocabulary/hy/A2';
const targetDir = path.join(rootDir, 'vocabulary', 'hy', 'a2');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const locItems = loadFile(path.join(sourceDir, 'locations.js'));
const entries = [];

for (const item of locItems) {
  const word = item.word.trim();
  const slug = transliterate(word);
  const id = `hy:${slug}:noun`;

  if (existingIds.has(id)) continue;
  existingIds.add(id);

  const entry = {
    id: id,
    word: word,
    language: 'hy',
    form: 'noun',
    level: 'A2',
    transcription: hyIPA[word] || '/.../',
    emoji: flags[word] || '🏛️',
    definitions: [hyDefs[word] || `Աշխարհագրական վայր ${word}.`],
    examples: [hyExamples[word] || `${word} քաղաքը շատ հետաքրքիր վայր է։`],
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
