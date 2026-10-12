const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let subdirs = fs.readdirSync(dir);
  let files = [];
  for (let subdir of subdirs) {
    let res = path.resolve(dir, subdir);
    if (fs.statSync(res).isDirectory()) files.push(...getFiles(res));
    else files.push(res);
  }
  return files;
}

function slugifyRu(text) {
  const map = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts',
    'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
    'я': 'ya'
  };
  let normalized = text.toLowerCase();
  let res = '';
  for (let char of normalized) {
    if (map[char] !== undefined) res += map[char];
    else if (/[a-z0-9]/.test(char)) res += char;
    else res += '-';
  }
  return res.replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function slugifyEl(text) {
  const map = {
    'α': 'a', 'β': 'v', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'i', 'θ': 'th',
    'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': 'x', 'ο': 'o', 'π': 'p',
    'ρ': 'r', 'σ': 's', 'ς': 's', 'τ': 't', 'υ': 'y', 'φ': 'f', 'χ': 'ch', 'ψ': 'ps',
    'ω': 'o', 'ά': 'a', 'έ': 'e', 'ή': 'i', 'ί': 'i', 'ό': 'o', 'ύ': 'y', 'ώ': 'o',
    'ϊ': 'i', 'ϋ': 'y', 'ΐ': 'i', 'ΰ': 'y'
  };
  let normalized = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  let res = '';
  for (let char of normalized) {
    if (map[char] !== undefined) res += map[char];
    else if (/[a-z0-9]/.test(char)) res += char;
    else res += '-';
  }
  return res.replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function slugifyLatin(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/œ/g, 'oe')
    .replace(/æ/g, 'ae')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getSlug(lang, word) {
  if (lang === 'ru') return slugifyRu(word);
  if (lang === 'el') return slugifyEl(word);
  return slugifyLatin(word);
}

// Read EN files
const rootDir = path.resolve(__dirname, '../..');
const enHomeFiles = getFiles(path.join(rootDir, "vocabulary/en")).filter(f => f.includes("/home/"));

console.log(`Processing ${enHomeFiles.length} English home files...`);

// Load translations map
const masterData = JSON.parse(fs.readFileSync(path.join(__dirname, 'master_home_vocab.json'), 'utf8'));

for (let lang of ['fr', 'it', 'ru', 'el']) {
  let langData = masterData[lang] || {};
  let questions = [];

  for (let f of enHomeFiles) {
    let relPath = path.relative(path.join(rootDir, "vocabulary/en"), f);
    let targetPath = path.join(rootDir, "vocabulary", lang, relPath);
    let enItems = JSON.parse(fs.readFileSync(f, 'utf8'));
    let targetItems = [];

    for (let enItem of enItems) {
      let tr = langData[enItem.id];
      if (!tr) {
        console.error(`Missing translation for ${lang} - ${enItem.id}`);
        process.exit(1);
      }

      let slug = tr.slug_override || getSlug(lang, tr.word);

      let entry = {
        id: `${lang}:${slug}:${enItem.form}`,
        word: tr.word,
        language: lang,
        form: enItem.form,
        level: enItem.level,
        status: "needs_review",
        concept: enItem.id,
        theme: enItem.theme,
        sub_theme: enItem.sub_theme
      };

      if (enItem.rooms) {
        entry.rooms = enItem.rooms;
      }

      if (enItem.form === 'noun') {
        if (tr.article !== undefined) entry.article = tr.article;
        if (tr.gender !== undefined) entry.gender = tr.gender;
        if (tr.countability !== undefined) entry.countability = tr.countability;
        if (tr.plural_form !== undefined) entry.plural_form = tr.plural_form;
        if (tr.singular_workaround !== undefined) entry.singular_workaround = tr.singular_workaround;
        if (tr.partitive !== undefined) entry.partitive = tr.partitive;
        if (tr.animacy !== undefined) entry.animacy = tr.animacy;
      }

      if (tr.region) entry.region = tr.region;
      if (tr.regional_equivalents) entry.regional_equivalents = tr.regional_equivalents;
      if (tr.variant_group) entry.variant_group = tr.variant_group;

      if (tr.question) {
        questions.push(`- **${enItem.id}** (\`${tr.word}\`): ${tr.question}`);
      }

      targetItems.push(entry);
    }

    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, JSON.stringify(targetItems, null, 2) + '\n', 'utf8');
  }

  // Generate reports/<lang>-home-questions.md
  let reportPath = path.join(rootDir, "reports", `${lang}-home-questions.md`);
  let reportHeader = `# ${lang.toUpperCase()} Home Vocabulary Questions & Review Items\n\n` +
    `The following items and regional variants in the \`home/\` topic require human review / linguistic verification:\n\n`;

  let reportContent = reportHeader + (questions.length > 0 ? questions.join('\n') + '\n' : 'No unresolved questions for this language.\n');

  fs.writeFileSync(reportPath, reportContent, 'utf8');
  console.log(`Generated ${lang} home vocabulary and ${reportPath}`);
}
