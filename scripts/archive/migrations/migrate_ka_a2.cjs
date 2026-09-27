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
    'ა': 'a', 'ბ': 'b', 'გ': 'g', 'დ': 'd', 'ე': 'e', 'ვ': 'v', 'ზ': 'z', 'თ': 't', 'ი': 'i', 'კ': 'k',
    'ლ': 'l', 'მ': 'm', 'ნ': 'n', 'ო': 'o', 'პ': 'p', 'ჟ': 'zh', 'რ': 'r', 'ს': 's', 'ტ': 't', 'უ': 'u',
    'ფ': 'p', 'ქ': 'k', 'ღ': 'g', 'ყ': 'q', 'შ': 'sh', 'ჩ': 'ch', 'ც': 'ts', 'ძ': 'dz', 'წ': 'ts', 'ჭ': 'ch',
    'ხ': 'k', 'ჯ': 'j', 'ჰ': 'h'
  };
  return text
    .toLowerCase()
    .split('')
    .map(ch => map[ch] !== undefined ? map[ch] : ch)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const kaIPA = {
  "გერმანიա": "/ɡɛrmania/",
  "კანადა": "/kanada/",
  "მექსიკა": "/mɛksika/",
  "ეგვიპტე": "/ɛɡviptɛ/",
  "თურქეთი": "/turkɛti/",
  "პორტუგალია": "/pɔrtuɡalia/",
  "სომხეთი": "/sɔmkɛti/",
  "საქართველო": "/sakartvɛlɔ/",
  "ბერლინი": "/bɛrlini/",
  "მადრიდი": "/madridi/",
  "ტორონტო": "/tɔrɔntɔ/",
  "სტამბოლი": "/stambɔli/",
  "ლისაბონი": "/lisabɔni/",
  "ერევანი": "/ɛrɛvani/",
  "თბილისი": "/tbilisi/",
  "ყაზანი": "/qazani/"
};

const kaDefs = {
  "გერმანია": "ქვეყანა ცენტრალურ ევროპაში, დედაქალაქით ბერლინი.",
  "კანადა": "დიდი ქვეყანა ჩრდილოეთ ამერიკაში, დედაქალაქით ოტავა.",
  "მექსიკა": "ქვეყანა ჩრდილოეთ ამერიკაში, მდიდარი ისტორიითა და კულტურით.",
  "ეგვიპტე": "ქვეყანა ჩრდილო-აღმოსავლეთ აფრიკაში, ცნობილი პირამიდებით.",
  "თურქეთი": "ტრანსკონტინენტური ქვეყანა ევროპასა და აზიას შორის.",
  "პორტუგალია": "ევროპული ქვეყანა პირინეის ნახევარკუნძულზე ატლანტის ოკეანესთან.",
  "სომხეთი": "მთიანი ქვეყანა სამხრეთ კავკასიაში, დედაქალაქით ერევანი.",
  "საქართველო": "ქვეყანა შავი ზღვის ნაპირას, დედაქალაქით თბილისი.",
  "ბერლინი": "გერმანიის დედაქალაქი და უდიდესი ქალაქი.",
  "მადრიდი": "ესპანეთის დედაქალაქი და უდიდესი მეტროპოლია.",
  "ტორონტო": "კანადის უდიდესი ქალაქი ონტარიოს ტბის პირას.",
  "სტამბოლი": "თურქეთის ისტორიული ქალაქი, რომელიც ორ კონტინენტს აკავშირებს.",
  "ლისაბონი": "პორტუგალიის დედაქალაქი და უდიდესი პორტი.",
  "ერევანი": "სომხეთის რესპუბლიკის დედაქალაქი და უდიდესი ქალაქი.",
  "თბილისი": "საქართველოს დედაქალაქი და უდიდესი მეტროპოლია.",
  "ყაზანი": "რუსეთის ისტორიული დიდი ქალაქი მდინარე ვოლგასთან."
};

const kaExamples = {
  "გერმანია": "გერმანია არის ულამაზესი ქვეყანა მრავალი ისტორიული ქალაქით.",
  "კანადა": "კანადა ცნობილია თავისი ულამაზესი ბუნებითა და ტყეებით.",
  "მექსიკა": "მექსიკა იზიდავს მრავალ ტურისტს თავისი სანაპიროებით.",
  "ეგვიპტე": "ეგვიპტე ცნობილია ძველი პირამიდებითა და მდინარე ნილოსით.",
  "თურქეთი": "თურქეთი აერთიანებს ევროპულ და აზიურ ტრადიციებს.",
  "პორტუგალია": "პორტუგალია მდებარეობს ატლანტის ოკეანის სანაპიროზე.",
  "სომხეთი": "სომხეთი გამოირჩევა ულამაზესი მთებითა და ისტორიით.",
  "საქართველო": "საქართველო ცნობილია თავისი სტუმართმოყვარეობითა და სამზარეულოთი.",
  "ბერლინი": "ბერლინი არის ქალაქი, სადაც ბევრი ისტორიული მუზეუმია.",
  "მადრიდი": "მადრიდი არის ესპანეთის ულამაზესი დედაქალაქი.",
  "ტორონტო": "ტორონტო არის კანადის დიდი და თანამედროვე ქალაქი.",
  "სტამბოლი": "სტამბოლი აკავშირებს ევროპასა და აზიას ბოსფორის სრუტით.",
  "ლისაბონი": "ლისაბონი არის პორტუგალიის ულამაზესი ზღვისპირა ქალაქი.",
  "ერევანი": "ერევანი არის სომხეთის ულამაზესი ვარდისფერი ქალაქი.",
  "თბილისი": "თბილისი არის საქართველოს ისტორიული და მზიანი დედაქალაქი.",
  "ყაზანი": "ყაზანი მდებარეობს მდინარე ვოლგის ულამაზეს ნაპირზე."
};

const flags = {
  "გერმანია": "🇩🇪", "კანადა": "🇨🇦", "მექსიკა": "🇲🇽", "ეგვიპტე": "🇪🇬",
  "თურქეთი": "🇹🇷", "პორტუგალია": "🇵🇹", "სომხეთი": "🇦🇲", "საქართველო": "🇬🇪",
  "ბერლინი": "🏛️", "მადრიდი": "🏛️", "ტორონტო": "🏙️", "სტამბოლი": "🕌",
  "ლისაბონი": "🇵🇹", "ერევანი": "🇦🇲", "თბილისი": "🇬🇪", "ყაზანი": "🕌"
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

collectExistingIds(path.join(rootDir, 'vocabulary', 'ka', 'a0_a1'));

const sourceDir = '/tmp/COSYlanguages/vocabulary/ka/A2';
const targetDir = path.join(rootDir, 'vocabulary', 'ka', 'a2');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const locItems = loadFile(path.join(sourceDir, 'locations.js'));
const entries = [];

for (const item of locItems) {
  const word = item.word.trim();
  const slug = transliterate(word);
  const id = `ka:${slug}:noun`;

  if (existingIds.has(id)) continue;
  existingIds.add(id);

  const entry = {
    id: id,
    word: word,
    language: 'ka',
    form: 'noun',
    level: 'A2',
    transcription: kaIPA[word] || '/.../',
    emoji: flags[word] || '🏛️',
    definitions: [kaDefs[word] || `გეოგრაფიული ადგილი სახელად ${word}.`],
    examples: [kaExamples[word] || `${word} არის ძალიან საინტერესო ადგილი.`],
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
