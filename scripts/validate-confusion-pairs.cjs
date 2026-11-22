const fs = require('fs');
const path = require('path');
const Ajv2020 = require('ajv/dist/2020');

const ROOT = path.join(__dirname, '..');
const FILES = [
  'taxonomy/vocab-confusion-pairs.json',
  'taxonomy/grammar-confusion-pairs.json',
  'taxonomy/french-grammar-confusion-pairs.json'
];
const LEVELS = new Set(['a1', 'a2', 'b1', 'b2', 'c1', 'c2']);
const EXPECTED_LANGUAGE = {
  'taxonomy/vocab-confusion-pairs.json': 'en',
  'taxonomy/grammar-confusion-pairs.json': 'en',
  'taxonomy/french-grammar-confusion-pairs.json': 'fr'
};
const idsByFile = new Map();

const schema = JSON.parse(fs.readFileSync(path.join(ROOT, 'schemas', 'taxonomy-confusion-pairs.schema.json'), 'utf8'));
const ajv = new Ajv2020({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

let failed = false;
for (const relative of FILES) {
  const file = path.join(ROOT, relative);
  if (!fs.existsSync(file)) {
    console.error(`Missing ${relative}`);
    failed = true;
    continue;
  }
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!validate(data)) {
    console.error(`${relative} does not match the schema:`);
    for (const error of validate.errors || []) {
      console.error(`  ${error.instancePath || '/'} ${error.message}`);
    }
    failed = true;
    continue;
  }

  if (data.language !== EXPECTED_LANGUAGE[relative]) {
    console.error(`${relative}: expected language "${EXPECTED_LANGUAGE[relative]}", found "${data.language}"`);
    failed = true;
  }

  const flatIndex = relative === 'taxonomy/vocab-confusion-pairs.json'
    ? JSON.parse(fs.readFileSync(path.join(ROOT, 'vocabulary', 'en', 'flat-index.json'), 'utf8'))
    : null;

  const fileIds = new Set();
  let total = 0;
  for (const [level, entries] of Object.entries(data.levels)) {
    if (!LEVELS.has(level)) {
      console.error(`${relative}: unsupported level "${level}"`);
      failed = true;
    }
    const seen = new Set();
    for (const entry of entries) {
      if (entry.level !== level) {
        console.error(`${relative}: ${entry.id} is under "${level}" but declares "${entry.level}"`);
        failed = true;
      }
      if (seen.has(entry.id)) {
        console.error(`${relative}: duplicate id "${entry.id}" under "${level}"`);
        failed = true;
      }
      seen.add(entry.id);
      fileIds.add(entry.id);
      if (flatIndex) {
        const has = term => Boolean(term && flatIndex[String(term).toLowerCase().trim()]);
        const actual = has(entry.termA) && has(entry.termB);
        if (typeof entry.covered !== 'boolean') {
          console.error(`${relative}: ${entry.id} is missing "covered"`);
          failed = true;
        } else if (entry.covered !== actual) {
          console.error(`${relative}: ${entry.id} says covered=${entry.covered} but COSYdata has ${actual}`);
          failed = true;
        }
      }
    }
    total += entries.length;
  }
  idsByFile.set(relative, fileIds);
  console.log(`${relative}: ${total} entries across ${Object.keys(data.levels).length} levels`);
}

const englishGrammar = idsByFile.get('taxonomy/grammar-confusion-pairs.json');
const frenchGrammar = idsByFile.get('taxonomy/french-grammar-confusion-pairs.json');
if (englishGrammar && frenchGrammar) {
  const shared = [...englishGrammar].filter(id => frenchGrammar.has(id));
  if (shared.length) {
    console.error(`English and French grammar taxonomies share ids: ${shared.sort().join(', ')}`);
    failed = true;
  }
}

if (failed) process.exit(1);
