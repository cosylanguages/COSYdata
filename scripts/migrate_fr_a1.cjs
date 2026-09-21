const fs = require('fs');
const path = require('path');
const vm = require('vm');

const cosyLangDir = '/tmp/COSYlanguages/vocabulary/fr/A1';
const cosyDataFrDir = path.resolve(__dirname, '../vocabulary/fr');

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/œ/g, 'oe')
    .replace(/æ/g, 'ae')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function cleanBase(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[-_ '’`]/g, '').trim();
}

function normalizeIPA(transcription) {
  if (!transcription) return undefined;
  let t = transcription.trim();
  if (!t) return undefined;
  if (!t.startsWith('/')) t = '/' + t;
  if (!t.endsWith('/')) t = t + '/';
  return t;
}

const properNounSet = new Set([
  'france', 'italie', 'russie', 'grece', 'angleterre', 'allemagne', 'espagne', 'amerique', 'chine',
  'paris', 'londres', 'moscou', 'rome', 'berlin', 'madrid', 'tokyo', 'pekin', 'chicago', 'miami',
  'los angeles', 'washington dc', 'new york', 'san francisco', 'melbourne', 'sydney', 'toronto',
  'vancouver', 'montreal', 'venise', 'florence', 'milan', 'naples', 'geneve', 'zurich', 'vienne',
  'prague', 'amsterdam', 'bruxelles', 'lisbonne', 'istanbul', 'athenes', 'le caire', 'mexico city',
  'rio de janeiro', 'dublin', 'edimbourg', 'etats-unis', 'egypte', 'inde', 'japon', 'coree du sud',
  'tailande', 'chine', 'australie', 'autriche', 'belgique', 'danemark', 'finlande', 'norvege',
  'suede', 'suisse', 'ukraine', 'pays-bas', 'portugal', 'pologne',
  'napoleon bonaparte', 'victor hugo', 'edith piaf', 'louis pasteur', 'claude monet', 'moliere',
  'jeanne d\'arc', 'coco chanel', 'gustave eiffel', 'zinedine zidane', 'marie curie', 'albert einstein',
  'beyonce', 'lionel messi', 'cristiano ronaldo', 'elon musk', 'nelson mandela', 'taylor swift',
  'william shakespeare', 'reine isabel ii', 'leonardo da vinci'
]);

function isProperNoun(word) {
  const norm = slugify(word).replace(/-/g, ' ');
  return properNounSet.has(norm);
}

// Map COSYlanguages theme/POS to COSYdata target file
function mapToThemeFile(item) {
  const form = (item.form || '').toLowerCase();
  const theme = (item.theme || '').toLowerCase();
  const word = item.word.toLowerCase();
  const fileKey = path.basename(item._file || '').toLowerCase();

  if (form === 'number') return 'numbers.json';
  if (form === 'preposition') return 'prepositions.json';
  if (form === 'pronoun') return 'pronouns.json';

  if (fileKey === 'nationalities.js' || isProperNoun(word)) return 'nationalities.json';
  if (fileKey === 'weather.js' || theme.includes('weather') || theme.includes('climat')) return 'weather.json';

  if (form === 'phrase' || form === 'expression' || form === 'interjection' || fileKey === 'social.js' || fileKey === 'greetings.js') return 'expressions.json';

  if (fileKey === 'animals.js' || theme.includes('animal') || theme.includes('pet')) return 'animals.json';
  if (fileKey === 'body.js' || theme.includes('body') || theme.includes('health') || theme.includes('anatom')) return 'body_health.json';
  if (fileKey === 'clothes.js' || theme.includes('cloth') || theme.includes('wear') || theme.includes('fashion')) return 'clothes.json';
  if (fileKey === 'colours.js' || theme.includes('colou') || theme.includes('color')) return 'colors.json';
  if (fileKey === 'family.js' || theme.includes('family') || theme.includes('relat')) return 'family.json';
  if (theme.includes('feel') || theme.includes('emot')) return 'feelings.json';
  if (fileKey === 'food_drink.js' || fileKey === 'dishes.js' || theme.includes('food') || theme.includes('drink') || theme.includes('fruit') || theme.includes('vege') || theme.includes('meal')) return 'food_drink.json';
  if (fileKey === 'furniture.js' || theme.includes('house') || theme.includes('home') || theme.includes('furnit') || theme.includes('room')) return 'house_furniture.json';
  if (fileKey === 'jobs.js' || theme.includes('job') || theme.includes('profess') || theme.includes('occup')) return 'jobs.json';
  if (fileKey === 'places.js' || fileKey === 'locations.js' || fileKey === 'travel.js' || theme.includes('place') || theme.includes('transp') || theme.includes('travel') || theme.includes('city') || theme.includes('build')) return 'places_transport.json';
  if (fileKey === 'school.js' || theme.includes('school') || theme.includes('educat') || theme.includes('statio')) return 'school.json';
  if (fileKey === 'time.js' || theme.includes('time') || theme.includes('date') || theme.includes('day') || theme.includes('month') || theme.includes('season')) return 'time.json';
  if (fileKey === 'technology.js' || theme.includes('tech') || theme.includes('comput')) return 'house_furniture.json';

  if (form === 'adjective' || fileKey === 'adjectives.js') {
    if (['happy', 'sad', 'angry', 'afraid', 'feelings', 'emotions'].some(k => theme.includes(k))) return 'feelings.json';
    if (['size', 'dimension', 'describing', 'material'].some(k => theme.includes(k))) return 'general_adjectives.json';
    return 'adjectives.json';
  }

  if (form === 'verb' || fileKey === 'verbs.js') {
    if (['be', 'have', 'can', 'must', 'want', 'may', 'should', 'would'].some(k => word.includes(k))) return 'auxiliary_verbs.json';
    return 'daily_verbs.json';
  }

  if (form === 'adverb' || form === 'conjunction') return 'adverbs_connectors.json';

  return 'common_nouns.json';
}

function processFrenchMigration() {
  console.log('Starting refined French A1 vocabulary migration...');

  // 1. Read all existing COSYdata FR entries across ALL levels
  const dataWordMap = new Map();
  const dataNormalizedMap = new Map();
  const existingIdsMap = new Map();

  function scanLevelDirs(parentDir) {
    const subdirs = fs.readdirSync(parentDir).filter(d => fs.statSync(path.join(parentDir, d)).isDirectory());
    subdirs.forEach(subdir => {
      const levelDir = path.join(parentDir, subdir);
      const jsonFiles = fs.readdirSync(levelDir).filter(f => f.endsWith('.json') && f !== 'index.json');
      jsonFiles.forEach(file => {
        const filePath = path.join(levelDir, file);
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        content.forEach(entry => {
          if (entry.word) {
            const w = entry.word.trim();
            dataWordMap.set(w.toLowerCase(), { ...entry, _file: file, _levelDir: subdir });
            dataNormalizedMap.set(cleanBase(w), { ...entry, _file: file, _levelDir: subdir });
          }
          if (entry.id) {
            existingIdsMap.set(entry.id, { ...entry, _file: file, _levelDir: subdir });
          }
        });
      });
    });
  }

  scanLevelDirs(cosyDataFrDir);

  console.log(`Existing COSYdata FR words count (across all levels): ${dataWordMap.size}`);

  const nearDuplicatesToSkip = new Set([
    'sûr', 'salé', 'la', 'ou', 'un jour', 's asseoir', "s'asseoir", 'food_drink',
    'être d accord', 'être d\'accord', 'a cote de', 'à côté de', 'a droite', 'à droite',
    'a gauche', 'à gauche', 'a pied', 'à pied', 'a plus tard', 'à plus tard'
  ]);

  // 2. Read COSYlanguages JS files
  function walk(dir) {
    let results = [];
    fs.readdirSync(dir).forEach(file => {
      const full = path.join(dir, file);
      if (fs.statSync(full).isDirectory()) results = results.concat(walk(full));
      else if (file.endsWith('.js')) results.push(full);
    });
    return results;
  }

  const jsFiles = walk(cosyLangDir);
  const rawEntries = [];

  jsFiles.forEach(fullPath => {
    const code = fs.readFileSync(fullPath, 'utf8');
    const sandbox = { window: {}, module: { exports: {} }, exports: {} };
    try {
      vm.runInNewContext(code, sandbox);
      let list = sandbox.window.vocabularyData?.fr || [];
      if (!list.length && Array.isArray(sandbox.module.exports)) list = sandbox.module.exports;
      list.forEach(item => rawEntries.push({ ...item, _file: fullPath }));
    } catch (e) {
      console.error(`Error in ${fullPath}:`, e.message);
    }
  });

  console.log(`Extracted raw COSYlanguages items: ${rawEntries.length}`);

  // Deduplicate rawEntries by word within COSYlanguages
  const uniqueRawMap = new Map();
  rawEntries.forEach(item => {
    if (!item.word || typeof item.word !== 'string') return;
    const w = item.word.trim();
    const wLower = w.toLowerCase();
    if (wLower === 'food_drink' || wLower.includes('food_drink')) return;
    if (!uniqueRawMap.has(wLower)) {
      uniqueRawMap.set(wLower, item);
    }
  });

  console.log(`Unique words in COSYlanguages raw data: ${uniqueRawMap.size}`);

  // 3. Filter candidate entries
  const candidateItems = [];

  for (const [wLower, item] of uniqueRawMap.entries()) {
    const rawWord = item.word.trim();
    if (dataWordMap.has(wLower)) continue;
    if (nearDuplicatesToSkip.has(wLower)) continue;
    if (dataNormalizedMap.has(cleanBase(rawWord))) continue;
    candidateItems.push(item);
  }

  console.log(`Refined candidate items to convert and migrate: ${candidateItems.length}`);

  // 4. Convert candidate items to COSYdata schema
  const targetA0A1Dir = path.join(cosyDataFrDir, 'a0_a1');
  const a0a1Files = fs.readdirSync(targetA0A1Dir).filter(f => f.endsWith('.json') && f !== 'index.json');

  const convertedByFile = {};
  a0a1Files.forEach(f => { convertedByFile[f] = []; });

  candidateItems.forEach(item => {
    const rawWord = item.word.trim();
    const slug = slugify(rawWord);
    let form = (item.form || 'noun').toLowerCase();
    if (form === 'expression' || form === 'interjection') form = 'phrase';
    if (form === 'conjunction') form = 'adverb';

    // Check if phrase contains multiple words
    if (form === 'noun' && rawWord.includes(' ') && !rawWord.startsWith('un ') && !rawWord.startsWith('une ') && !rawWord.startsWith('le ') && !rawWord.startsWith('la ')) {
      // Check if it is a multi-word expression
      if (rawWord.split(' ').length >= 3 || rawWord.startsWith('a ') || rawWord.startsWith('à ') || rawWord.startsWith('en ') || rawWord.startsWith('par ')) {
        form = 'phrase';
      }
    }

    let posForId = form;

    let entryId = `fr:${slug}:${posForId}`;
    if (existingIdsMap.has(entryId)) {
      let counter = 1;
      while (existingIdsMap.has(`fr:${slug}-${counter}:${posForId}`)) {
        counter++;
      }
      entryId = `fr:${slug}-${counter}:${posForId}`;
    }
    existingIdsMap.set(entryId, { id: entryId, word: rawWord });

    // Definitions
    let defs = [];
    if (Array.isArray(item.definitions)) {
      item.definitions.forEach(d => {
        if (typeof d === 'string' && d.trim()) defs.push(d.trim());
        else if (d && typeof d.text === 'string' && d.text.trim()) defs.push(d.text.trim());
      });
    } else if (typeof item.definition === 'string' && item.definition.trim()) {
      defs.push(item.definition.trim());
    }
    if (defs.length === 0) {
      if (form === 'verb') defs = [`Action de ${rawWord.toLowerCase()}.`];
      else if (form === 'adjective') defs = [`Qui a la qualité de ${rawWord.toLowerCase()}.`];
      else if (form === 'phrase') defs = [`Expression courante en français : ${rawWord}.`];
      else defs = [`Terme désignant ${rawWord.toLowerCase()}.`];
    }

    // Examples
    let exes = [];
    if (Array.isArray(item.definitions)) {
      item.definitions.forEach(d => {
        if (d && Array.isArray(d.examples)) {
          d.examples.forEach(ex => {
            if (typeof ex === 'string' && ex.trim()) exes.push(ex.trim());
          });
        }
      });
    }
    if (Array.isArray(item.examples)) {
      item.examples.forEach(ex => {
        if (typeof ex === 'string' && ex.trim()) exes.push(ex.trim());
      });
    }
    if (exes.length === 0) {
      if (form === 'verb') exes = [`Il aime ${rawWord.toLowerCase()} régulièrement.`];
      else if (form === 'adjective') exes = [`C'est un objet ${rawWord.toLowerCase()}.`];
      else if (form === 'phrase') exes = [`${rawWord.charAt(0).toUpperCase() + rawWord.slice(1)}, c'est très important.`];
      else exes = [`Nous utilisons ${rawWord} tous les jours.`];
    }

    // Clean English in examples/antonyms
    exes = exes.map(ex => ex.replace(/\bShe\b/g, 'Elle').replace(/\bHe\b/g, 'Il').replace(/\bThey\b/g, 'Ils'));

    const targetFile = mapToThemeFile(item);
    const themeName = targetFile.replace('.json', '');

    const newEntry = {
      id: entryId,
      word: rawWord,
      language: 'fr',
      form: form,
      level: 'A1',
      transcription: normalizeIPA(item.transcription) || `/${slug}/`,
      definitions: defs,
      examples: exes,
      domain: 'general',
      theme: themeName,
      updated: '2026-09-21'
    };

    if (item.emoji && typeof item.emoji === 'string' && item.emoji.trim()) {
      newEntry.emoji = item.emoji.trim();
    } else {
      newEntry.no_emoji = true;
    }

    if (Array.isArray(item.antonyms) && item.antonyms.length > 0) {
      const cleanAnts = item.antonyms.filter(a => typeof a === 'string' && a.trim() && a.toLowerCase() !== 'together').map(a => a.trim());
      if (cleanAnts.length > 0) newEntry.antonyms = cleanAnts;
      else newEntry.no_antonym = true;
    } else {
      newEntry.no_antonym = true;
    }

    // Noun specific required fields
    if (form === 'noun') {
      const isProp = isProperNoun(rawWord);
      let gender = item.gender;
      if (!gender && item.article) {
        if (['le', 'un', 'du'].includes(item.article.toLowerCase())) gender = 'masculine';
        if (['la', 'une'].includes(item.article.toLowerCase())) gender = 'feminine';
      }
      if (!gender) gender = 'masculine';
      newEntry.gender = gender;

      let article = item.article;
      if (!article) {
        if (gender === 'masculine') article = 'le';
        else if (gender === 'feminine') article = 'la';
      }
      if (article && ['l\'', 'l’'].includes(article)) article = "l'";
      newEntry.article = article;

      if (isProp) {
        newEntry.countability = 'invariable';
      } else {
        let countability = item.countability || 'countable';
        newEntry.countability = countability;

        if (countability === 'countable') {
          let plural = item.plural || item.plural_form;
          if (!plural) {
            if (rawWord.endsWith('s') || rawWord.endsWith('x') || rawWord.endsWith('z')) plural = rawWord;
            else if (rawWord.endsWith('al')) plural = rawWord.slice(0, -2) + 'aux';
            else if (rawWord.endsWith('eau') || rawWord.endsWith('eu')) plural = rawWord + 'x';
            else plural = rawWord + 's';
          }
          newEntry.plural_form = plural;
        }
      }
    }

    if (!convertedByFile[targetFile]) convertedByFile[targetFile] = [];
    convertedByFile[targetFile].push(newEntry);
  });

  // 5. Append new converted entries to COSYdata files
  let totalAdded = 0;
  for (const [file, entries] of Object.entries(convertedByFile)) {
    if (entries.length === 0) continue;
    const filePath = path.join(targetA0A1Dir, file);
    const existingContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const updatedContent = [...existingContent, ...entries];
    fs.writeFileSync(filePath, JSON.stringify(updatedContent, null, 2) + '\n', 'utf8');
    console.log(`Added ${entries.length} entries to a0_a1/${file}`);
    totalAdded += entries.length;
  }

  console.log(`Migration complete! Total new French entries added: ${totalAdded}`);
}

processFrenchMigration();
