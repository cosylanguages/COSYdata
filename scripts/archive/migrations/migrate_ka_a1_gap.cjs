const fs = require('fs');
const path = require('path');
const vm = require('vm');

const cosyDataDir = path.resolve(__dirname, '..');
const cosyLanguagesDir = '/tmp/COSYlanguages';
const kaSourceDir = path.join(cosyLanguagesDir, 'vocabulary', 'ka', 'A1');
const kaTargetDir = path.join(cosyDataDir, 'vocabulary', 'ka', 'a0_a1');

// Transliterate Georgian script to ASCII slug
function transliterateGeorgian(text) {
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

// Full Georgian IPA Transliteration rules
function getGeorgianIPA(word) {
  const charMap = {
    'ა': 'ɑ', 'ბ': 'b', 'გ': 'ɡ', 'დ': 'd', 'ე': 'ɛ', 'ვ': 'v', 'ზ': 'z',
    'თ': 'tʰ', 'ი': 'i', 'კ': 'kʼ', 'ლ': 'l', 'მ': 'm', 'ნ': 'n', 'ო': 'ɔ',
    'პ': 'pʼ', 'ჟ': 'ʒ', 'რ': 'r', 'ს': 's', 'ტ': 'tʼ', 'უ': 'u', 'ფ': 'pʰ',
    'ქ': 'kʰ', 'ღ': 'ʁ', 'ყ': 'qʼ', 'შ': 'ʃ', 'ჩ': 'tʃʰ', 'ც': 'tsʰ', 'ძ': 'dz',
    'წ': 'tsʼ', 'ჭ': 'tʃʼ', 'ხ': 'χ', 'ჯ': 'dʒ', 'ჰ': 'h'
  };

  let ipa = '';
  for (const ch of word) {
    if (charMap[ch]) {
      ipa += charMap[ch];
    } else if (ch === ' ' || ch === '-') {
      ipa += ' ';
    } else {
      ipa += ch;
    }
  }
  return `/${ipa.trim()}/`;
}

// Proper Georgian plural formation
function getGeorgianPlural(word) {
  // Irregular / special plurals
  const irregulars = {
    'ძმა': 'ძმები',
    'და': 'დები',
    'ქალი': 'ქალები',
    'კაცი': 'კაცები',
    'ადამიანი': 'ადამიანები',
    'ბავშვი': 'ბავშვები',
    'ხინკალი': 'ხინკლები',
    'ხაჭაპური': 'ხაჭაპურები',
    'დედა': 'დედები',
    'მამა': 'მამები',
    'ბებია': 'ბებიები',
    'ჩაი': 'ჩაები',
    'საუზმე': 'საუზმეები',
    'მაღაზია': 'მაღაზიები',
    'დღე': 'დღეები',
    'ღამე': 'ღამეები'
  };

  if (irregulars[word]) return irregulars[word];

  if (word.endsWith('ი')) {
    // Drop nominative -ი suffix and add -ები
    return word.slice(0, -1) + 'ები';
  } else if (word.endsWith('ა') || word.endsWith('ე')) {
    return word.slice(0, -1) + 'ები';
  } else if (word.endsWith('ო') || word.endsWith('უ')) {
    return word + 'ები';
  }
  return word + 'ები';
}

// Comprehensive Georgian translations for English sentence leaks in source
const englishToGeorgianMap = {
  "I buy food online sometimes.": "ზოგჯერ საკვებს ონლაინ ვყიდულობ.",
  "She lives alone.": "ის მარტო ცხოვრობს.",
  "She has a red bag.": "მას წითელი ჩანთა აქვს.",
  "He wears a black coat.": "მას შავი პალტო აცვია.",
  "She feels stressed before every deadline.": "ის ყოველთვის სტრესს გრძნობს ვადის ამოწურვამდე.",
  "She drives a red car.": "ის წითელი მანქანით დადის.",
  "She wears a green dress.": "მას მწვანე კაბა აცვია.",
  "He always wears a black suit.": "მას ყოველთვის შავი კოსტიუმი აცვია.",
  "She has a yellow umbrella.": "მას ყვითელი ქოლგა აქვს.",
  "She bought a yellow notepad.": "მან ყვითელი რვეული იყიდა.",
  "She prefers pink to red.": "მას ვარდისფერი მუქ წითელს ურჩევნია.",
  "He bought an orange jacket.": "მან ნარინჯისფერი ქურთუკი იყიდა.",
  "They had a wonderful team.": "მათ საოცარი გუნდი ჰყავდათ.",
  "She gave an amazing presentation.": "მან გადასარევი პრეზენტაცია წარადგინა.",
  "She received an excellent review.": "მან შესანიშნავი შეფასება მიიღო."
};

// Map target theme JSON files
function getTargetThemeFile(sourceFile, form, raw) {
  if (sourceFile === 'verbs.js' || form === 'verb') return 'daily_verbs.json';
  if (sourceFile === 'adjectives.js' || form === 'adjective') {
    if (raw.theme === 'nature' || raw.theme === 'weather') return 'weather.json';
    if (raw.theme === 'feelings' || raw.theme === 'emotions') return 'feelings.json';
    return 'adjectives.json';
  }
  if (sourceFile === 'grammar_elements.js') return 'adverbs_connectors.json';
  if (sourceFile === 'greetings.js' || sourceFile === 'social.js') return 'greetings.json';
  if (sourceFile === 'locations.js' || sourceFile === 'nationalities.js') return 'nationalities.json';
  if (sourceFile === 'animals.js') return 'animals.json';
  if (sourceFile === 'body.js') return 'body_health.json';
  if (sourceFile === 'clothes.js') return 'clothes.json';
  if (sourceFile === 'dishes.js' || sourceFile === 'food_drink.js') return 'food_drink.json';
  if (sourceFile === 'family.js') return 'family.json';
  if (sourceFile === 'furniture.js') return 'house_furniture.json';
  if (sourceFile === 'jobs.js') return 'jobs.json';
  if (sourceFile === 'nature.js') return 'weather.json';
  if (sourceFile === 'numbers.js' || sourceFile === 'time.js') return 'time.json';
  if (sourceFile === 'people.js') return 'family.json';
  if (sourceFile === 'places.js' || sourceFile === 'travel.js') return 'places_transport.json';
  if (sourceFile === 'school.js') return 'school.json';
  if (sourceFile === 'shopping.js') return 'house_furniture.json';
  if (sourceFile === 'technology.js') return 'house_furniture.json';

  return 'adjectives.json';
}

function runMigration() {
  console.log('Reading existing COSYdata ka/a0_a1 files...');
  const allExistingIds = new Set();
  const existingWords = new Set();
  const targetThemeData = {};

  const themeFiles = fs.readdirSync(kaTargetDir).filter(f => f.endsWith('.json') && f !== 'index.json' && f !== 'flat-index.json');
  themeFiles.forEach(f => {
    const filePath = path.join(kaTargetDir, f);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    targetThemeData[f] = data;
    data.forEach(item => {
      if (item.id) allExistingIds.add(item.id);
      if (item.word) existingWords.add(item.word.trim());
    });
  });

  console.log(`Loaded ${existingWords.size} existing words across ${themeFiles.length} files.`);

  function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) results = results.concat(walkDir(fullPath));
      else if (file.endsWith('.js')) results.push(fullPath);
    });
    return results;
  }

  const jsFiles = walkDir(kaSourceDir);
  const candidates = [];

  jsFiles.forEach(filePath => {
    const code = fs.readFileSync(filePath, 'utf8');
    const sandbox = { window: {}, module: { exports: {} }, exports: {}, console: console };
    try {
      vm.runInNewContext(code, sandbox);
      let items = [];
      if (Array.isArray(sandbox.window.vocabularyData?.ka)) items.push(...sandbox.window.vocabularyData.ka);
      if (Array.isArray(sandbox.module.exports)) items.push(...sandbox.module.exports);
      for (const k of Object.keys(sandbox)) {
        if (Array.isArray(sandbox[k]) && k !== 'console') items.push(...sandbox[k]);
      }
      items.forEach(it => {
        if (it && (it.word || it.verb)) {
          const w = (it.word || it.verb).trim();
          if (w) candidates.push({ word: w, file: path.basename(filePath), raw: it });
        }
      });
    } catch (e) {
      console.error(`VM Error reading ${filePath}:`, e.message);
    }
  });

  console.log(`Extracted ${candidates.length} candidate items from COSYlanguages.`);

  const toMigrate = [];
  const seenInToMigrate = new Set();

  candidates.forEach(item => {
    if (!existingWords.has(item.word) && !seenInToMigrate.has(item.word)) {
      seenInToMigrate.add(item.word);
      toMigrate.push(item);
    }
  });

  console.log(`Found ${toMigrate.length} new words to migrate.`);

  let migratedCount = 0;

  toMigrate.forEach(item => {
    const word = item.word;
    const raw = item.raw;
    const sourceFile = item.file;

    let form = raw.form;
    if (!form || form === 'unknown') {
      if (sourceFile === 'locations.js') form = 'noun';
      else if (sourceFile === 'verbs.js') form = 'verb';
      else if (sourceFile === 'adjectives.js') form = 'adjective';
      else form = 'noun';
    }

    // Standardize forms for schema compatibility
    if (form === 'postposition' || form === 'conjunction' || form === 'particle' || form === 'determiner') {
      if (form === 'conjunction' || form === 'particle') form = 'conjunction';
      else if (form === 'postposition' || form === 'adverb') form = 'adverb';
      else form = 'adjective';
    }

    const slug = transliterateGeorgian(word) || 'word';
    let id = `ka:${slug}:${form}`;
    if (allExistingIds.has(id)) {
      let counter = 1;
      while (allExistingIds.has(`ka:${slug}-${counter}:${form}`)) counter++;
      id = `ka:${slug}-${counter}:${form}`;
    }
    allExistingIds.add(id);

    // Extract Definitions and Examples
    let definitions = [];
    let examples = [];

    if (Array.isArray(raw.definitions) && raw.definitions.length > 0) {
      raw.definitions.forEach(d => {
        if (typeof d === 'string') {
          definitions.push(d.replace(/:$/, '').trim());
        } else if (d && typeof d === 'object') {
          if (d.text) definitions.push(d.text.replace(/:$/, '').trim());
          if (Array.isArray(d.examples)) {
            d.examples.forEach(ex => {
              if (typeof ex === 'string') {
                let cleanEx = ex.replace(/:$/, '').trim();
                if (englishToGeorgianMap[cleanEx]) {
                  cleanEx = englishToGeorgianMap[cleanEx];
                }
                examples.push(cleanEx);
              }
            });
          }
        }
      });
    }

    if (definitions.length === 0) {
      definitions.push(`${word} - ქართული სიტყვა A1 დონისთვის.`);
    }

    if (examples.length === 0) {
      examples.push(`${word} გამოიყენება ყოველდღიურ საუბარში.`);
    }

    // Clean up definition/example punctuation
    definitions = definitions.map(d => d.endsWith('.') || d.endsWith('?') || d.endsWith('!') ? d : d + '.');
    examples = examples.map(e => e.endsWith('.') || e.endsWith('?') || e.endsWith('!') ? e : e + '.');

    const themeFileName = getTargetThemeFile(sourceFile, form, raw);
    const themeName = themeFileName.replace('.json', '');

    const entry = {
      id: id,
      word: word,
      language: 'ka',
      form: form,
      level: 'A1',
      transcription: getGeorgianIPA(word),
      definitions: definitions,
      examples: examples,
      domain: 'general',
      theme: themeName,
      updated: '2025-01-15'
    };

    if (raw.emoji && raw.emoji !== '✨') {
      entry.emoji = raw.emoji;
    } else {
      entry.emoji = '✨';
    }

    // Noun countability & plural rules
    if (form === 'noun') {
      const isInvariable = sourceFile === 'locations.js' || sourceFile === 'greetings.js' || sourceFile === 'numbers.js' ||
                           ['აშშ', 'გამარჯობა', 'ნახვამდის', 'გმადლობთ', 'დღე', 'ღამე'].includes(word);
      if (isInvariable) {
        entry.countability = 'invariable';
      } else {
        entry.countability = 'countable';
        entry.plural_form = getGeorgianPlural(word);
      }
    }

    if (Array.isArray(raw.antonyms) && raw.antonyms.length > 0) {
      entry.antonyms = raw.antonyms;
    } else {
      entry.no_antonym = true;
    }

    if (!targetThemeData[themeFileName]) {
      targetThemeData[themeFileName] = [];
    }
    targetThemeData[themeFileName].push(entry);
    migratedCount++;
  });

  console.log(`Writing updated entries to theme JSON files...`);
  for (const [f, data] of Object.entries(targetThemeData)) {
    const filePath = path.join(kaTargetDir, f);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  }

  console.log(`Successfully migrated ${migratedCount} Georgian entries into COSYdata ka/a0_a1!`);
}

runMigration();
