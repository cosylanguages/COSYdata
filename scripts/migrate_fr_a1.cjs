const fs = require('fs');
const path = require('path');
const vm = require('vm');

function findCosyLanguagesDir() {
  const candidates = [
    path.resolve(__dirname, '../../COSYlanguages'),
    path.resolve(__dirname, '../COSYlanguages'),
    '/tmp/COSYlanguages'
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.existsSync(path.join(candidate, 'vocabulary'))) {
      return candidate;
    }
  }
  throw new Error('COSYlanguages repository directory not found.');
}

const cosyLanguagesDir = findCosyLanguagesDir();
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
  return str
    .toLowerCase()
    .replace(/œ/g, 'oe')
    .replace(/æ/g, 'ae')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
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
  'losangeles', 'washingtondc', 'newyork', 'sanfrancisco', 'melbourne', 'sydney', 'toronto',
  'vancouver', 'montreal', 'venise', 'florence', 'milan', 'naples', 'geneve', 'zurich', 'vienne',
  'prague', 'amsterdam', 'bruxelles', 'lisbonne', 'istanbul', 'athenes', 'lecaire', 'mexicocity',
  'riodejaneiro', 'dublin', 'edimbourg', 'etatsunis', 'egypte', 'inde', 'japon', 'coreedusud',
  'thailande', 'australie', 'autriche', 'belgique', 'danemark', 'finlande', 'norvege',
  'suede', 'suisse', 'ukraine', 'paysbas', 'portugal', 'pologne', 'barcelone', 'irlande',
  'napoleonbonaparte', 'victorhugo', 'edithpiaf', 'louispasteur', 'claudemonet', 'moliere',
  'jeannedarc', 'cocochanel', 'gustaveeiffel', 'zinedinezidane', 'mariecurie', 'alberteinstein',
  'beyonce', 'lionelmessi', 'cristianoronaldo', 'elonmusk', 'nelsonmandela', 'taylorswift',
  'williamshakespeare', 'reineisabelii', 'leonardodavinci'
].map(cleanBase));

const femalePersons = new Set([
  'mariecurie', 'edithpiaf', 'jeannedarc', 'cocochanel', 'beyonce', 'taylorswift', 'reineisabelii'
].map(cleanBase));

const feminineCountries = new Set([
  'france', 'italie', 'russie', 'grece', 'angleterre', 'allemagne', 'espagne', 'chine',
  'egypte', 'inde', 'thailande', 'australie', 'autriche', 'belgique', 'danemark', 'finlande',
  'norvege', 'suede', 'suisse', 'ukraine', 'pologne', 'irlande', 'coreedusud'
].map(cleanBase));

const pluralCountries = new Set([
  'etatsunis', 'paysbas'
].map(cleanBase));

function isProperNoun(word) {
  return properNounSet.has(cleanBase(word));
}

function fixFrenchElisions(str) {
  if (!str) return str;
  return str
    .replace(/\bJ\s+([aeiouyàâéèêëîïôûùh])/gi, "J'$1")
    .replace(/\bj\s+([aeiouyàâéèêëîïôûùh])/gi, "j'$1")
    .replace(/\bd\s+([aeiouyàâéèêëîïôûùh])/gi, "d'$1")
    .replace(/\bl\s+([aeiouyàâéèêëîïôûùh])/gi, "l'$1")
    .replace(/\bm\s+([aeiouyàâéèêëîïôûùh])/gi, "m'$1")
    .replace(/\bn\s+([aeiouyàâéèêëîïôûùh])/gi, "n'$1")
    .replace(/\bqu\s+([aeiouyàâéèêëîïôûùh])/gi, "qu'$1")
    .replace(/\bs\s+il\b/gi, "s'il")
    .replace(/\bs\s+ils\b/gi, "s'ils")
    .replace(/\bjusqu\s+a\b/gi, "jusqu'à")
    .replace(/\bC\s+est\b/gi, "C'est")
    .replace(/\bc\s+est\b/gi, "c'est")
    .replace(/\s+/g, ' ')
    .trim();
}

// Map COSYlanguages theme/POS to COSYdata target file
function mapToThemeFile(item) {
  const form = (item.form || '').toLowerCase();
  const theme = (item.theme || '').toLowerCase();
  const word = item.word.toLowerCase();
  const fileKey = path.basename(item._file || '').toLowerCase();

  if (word === 'sommeil') return 'body_health.json';

  if (form === 'number') return 'numbers.json';
  if (form === 'preposition') return 'prepositions.json';
  if (form === 'pronoun') return 'pronouns.json';

  if (fileKey === 'nationalities.js' || isProperNoun(word)) return 'nationalities.json';
  if (fileKey === 'weather.js' || theme.includes('weather') || theme.includes('climat')) return 'weather.json';

  if (form === 'phrase' || form === 'expression' || form === 'interjection' || form === 'idiom' ||
      fileKey === 'idioms.js' || fileKey === 'fluency.js' || fileKey === 'quotes.js' || fileKey === 'speaking.js') {
    return 'expressions.json';
  }

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
  console.log('Starting French A1 vocabulary migration...');
  const cosyLangSubDir = path.join(cosyLanguagesDir, 'vocabulary/fr/A1');

  if (!fs.existsSync(cosyLangSubDir)) {
    console.log(`Directory ${cosyLangSubDir} does not exist. Skipping.`);
    return;
  }

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
    'a gauche', 'à gauche', 'a pied', 'à pied', 'a plus tard', 'à plus tard',
    'soeur', 'oeuf', 'oeil'
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

  const jsFiles = walk(cosyLangSubDir);
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

  console.log(`Extracted raw COSYlanguages FR items: ${rawEntries.length}`);

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

  console.log(`Unique words in COSYlanguages raw FR data: ${uniqueRawMap.size}`);

  // 3. Filter candidate entries
  const candidateItems = [];

  for (const [wLower, item] of uniqueRawMap.entries()) {
    const rawWord = item.word.trim();
    if (dataWordMap.has(wLower)) continue;
    if (nearDuplicatesToSkip.has(wLower)) continue;
    if (dataNormalizedMap.has(cleanBase(rawWord))) continue;
    candidateItems.push(item);
  }

  console.log(`Candidate FR items to convert and migrate: ${candidateItems.length}`);

  // 4. Convert candidate items to COSYdata schema
  const targetA0A1Dir = path.join(cosyDataFrDir, 'a0_a1');
  const a0a1Files = fs.readdirSync(targetA0A1Dir).filter(f => f.endsWith('.json') && f !== 'index.json');

  const convertedByFile = {};
  a0a1Files.forEach(f => { convertedByFile[f] = []; });

  candidateItems.forEach(item => {
    const rawWord = item.word.trim();
    const slug = slugify(rawWord);
    let form = (item.form || 'noun').toLowerCase();
    if (form === 'expression' || form === 'interjection' || form === 'idiom') form = 'phrase';
    if (form === 'conjunction') form = 'adverb';

    const fileKey = path.basename(item._file || '').toLowerCase();
    if (fileKey === 'idioms.js' || fileKey === 'social.js' || fileKey === 'fluency.js' || fileKey === 'quotes.js' || fileKey === 'speaking.js') {
      if (item.form === 'noun' && !rawWord.includes(' ')) {
        form = 'noun';
      } else {
        form = 'phrase';
      }
    }

    if (form === 'noun' && rawWord.includes(' ') && !rawWord.startsWith('un ') && !rawWord.startsWith('une ') && !rawWord.startsWith('le ') && !rawWord.startsWith('la ')) {
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
        if (typeof d === 'string' && d.trim()) defs.push(fixFrenchElisions(d.trim()));
        else if (d && typeof d.text === 'string' && d.text.trim()) defs.push(fixFrenchElisions(d.text.trim()));
      });
    } else if (typeof item.definition === 'string' && item.definition.trim()) {
      defs.push(fixFrenchElisions(item.definition.trim()));
    }

    // Replace English definition if present
    if (slug === 'sec' && defs.some(d => d.includes('Without water'))) {
      defs = ["Qui ne contient pas d'eau ou de liquide."];
    }

    if (defs.length === 0) {
      if (form === 'verb') defs = [`Action de ${rawWord.toLowerCase()}.`];
      else if (form === 'adjective') defs = [`Qui présente la characteristic de ${rawWord.toLowerCase()}.`].map(s => fixFrenchElisions(s));
      else if (form === 'phrase') defs = [`Expression ou tournure courante : ${rawWord}.`];
      else if (isProperNoun(rawWord)) defs = [`Lieu ou personnage célèbre : ${rawWord}.`];
      else defs = [`Terme désignant ${rawWord.toLowerCase()}.`];
    }

    // Examples
    let exes = [];
    if (Array.isArray(item.definitions)) {
      item.definitions.forEach(d => {
        if (d && Array.isArray(d.examples)) {
          d.examples.forEach(ex => {
            if (typeof ex === 'string' && ex.trim()) {
              const cleanedEx = fixFrenchElisions(ex.trim());
              // Validate that example contains the word (or verb root)
              const wBase = cleanBase(rawWord);
              if (cleanBase(cleanedEx).includes(wBase) || form === 'phrase') {
                exes.push(cleanedEx);
              }
            }
          });
        }
      });
    }
    if (Array.isArray(item.examples)) {
      item.examples.forEach(ex => {
        if (typeof ex === 'string' && ex.trim()) {
          const cleanedEx = fixFrenchElisions(ex.trim());
          const wBase = cleanBase(rawWord);
          if (cleanBase(cleanedEx).includes(wBase) || form === 'phrase') {
            exes.push(cleanedEx);
          }
        }
      });
    }

    if (exes.length === 0) {
      const fem = item.feminine || rawWord;
      if (form === 'verb') exes = [`Il aime ${rawWord.toLowerCase()} régulièrement.`];
      else if (form === 'adjective') {
        if (['triangulaire', 'rectangulaire', 'ovale', 'carre', 'carré', 'rond'].includes(slug)) {
          const shapeFem = (slug === 'rond' ? 'ronde' : (slug === 'carre' || slug === 'carré' ? 'carrée' : rawWord));
          exes = [`C'est un panneau de forme ${shapeFem}.`];
        } else if (['brumeux', 'orageux', 'pluvieux', 'neigeux', 'ensoleille', 'ensoleillé', 'venteux'].includes(slug)) {
          exes = [`Le temps est particulièrement ${rawWord.toLowerCase()} ce matin.`];
        } else if (['acide', 'sale', 'salé', 'sucre', 'sucré', 'amer'].includes(slug)) {
          exes = [`Ce plat a un goût très ${rawWord.toLowerCase()}.`];
        } else {
          exes = [`C'est une personne très ${fem.toLowerCase()}.`];
        }
      } else if (form === 'phrase') {
        exes = [`${rawWord.charAt(0).toUpperCase() + rawWord.slice(1)}, c'est très important.`];
      } else if (isProperNoun(rawWord)) {
        const cBase = cleanBase(rawWord);
        if (pluralCountries.has(cBase)) {
          exes = [`J'aimerais visiter les ${rawWord} un jour.`];
        } else if (feminineCountries.has(cBase)) {
          exes = [`J'aimerais visiter la ${rawWord} un jour.`];
        } else if (femalePersons.has(cBase)) {
          exes = [`${rawWord} est une figure remarquable.`];
        } else {
          exes = [`J'aimerais visiter ${rawWord} un jour.`];
        }
      } else {
        exes = [`Nous utilisons ${rawWord} tous les jours.`];
      }
    }

    // Clean English in examples/antonyms
    exes = exes.map(ex => fixFrenchElisions(ex.replace(/\bShe\b/g, 'Elle').replace(/\bHe\b/g, 'Il').replace(/\bThey\b/g, 'Ils').replace(/\bregularly\b/g, 'régulièrement')));

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
      if (femalePersons.has(cleanBase(rawWord)) || feminineCountries.has(cleanBase(rawWord))) {
        gender = 'feminine';
      }
      if (!gender && item.article) {
        const art = item.article.toLowerCase();
        if (['le', 'un', 'du'].includes(art)) gender = 'masculine';
        if (['la', 'une'].includes(art)) gender = 'feminine';
      }
      if (!gender) gender = 'masculine';
      newEntry.gender = gender;

      let article = item.article;
      if (femalePersons.has(cleanBase(rawWord)) || feminineCountries.has(cleanBase(rawWord))) {
        article = 'la';
      } else if (pluralCountries.has(cleanBase(rawWord))) {
        article = 'les';
      }
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

  console.log(`Migration complete for FR! Total new entries added: ${totalAdded}`);
}

processFrenchMigration();
