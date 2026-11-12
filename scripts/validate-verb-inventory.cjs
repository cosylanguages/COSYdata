const fs = require('fs');
const path = require('path');
const Ajv = require('ajv/dist/2020');

console.log('=== Validating Multilingual Verb Inventory ===\n');

const schemaPath = path.resolve('schemas/multilingual-verb-inventory.schema.json');
const registryPath = path.resolve('inventory/language-registry.json');
const inventoryPath = path.resolve('inventory/multilingual-verb-inventory.json');

// 1. Schema compilation and validation
if (!fs.existsSync(schemaPath)) {
  console.error(`ERROR: Schema file not found at ${schemaPath}`);
  process.exit(1);
}
if (!fs.existsSync(inventoryPath)) {
  console.error(`ERROR: Inventory file not found at ${inventoryPath}`);
  process.exit(1);
}
if (!fs.existsSync(registryPath)) {
  console.error(`ERROR: Registry file not found at ${registryPath}`);
  process.exit(1);
}

const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));

const ajv = new Ajv({ allErrors: true, strict: false });
const validateSchema = ajv.compile(schema);

const isValid = validateSchema(inventory);
if (!isValid) {
  console.error('ERROR: Inventory failed schema validation:');
  console.error(validateSchema.errors);
  process.exit(1);
}
console.log('✓ Schema validation passed.');

// 2. Canonical source list verification (53 items)
const canonicalSourceList = [
  "be", "have", "think", "know", "like", "love", "hate", "dislike", "want", "work",
  "study", "go", "can", "eat", "drink", "do", "make", "understand", "speak", "talk",
  "say", "tell", "need", "look", "watch", "see", "ask", "answer", "take", "give",
  "must", "have to", "wait", "live", "listen", "hear", "pay", "buy", "remember",
  "forget", "feel", "meet", "decide", "write", "read", "type", "spend", "waste",
  "play", "agree", "disagree", "send", "get"
];

console.log(`Checking canonical source list representation (${canonicalSourceList.length} items)...`);

const inventoryTerms = inventory.concepts.map(c => c.english_canonical_term);
const missingTerms = canonicalSourceList.filter(term => !inventoryTerms.includes(term));

if (missingTerms.length > 0) {
  console.error(`ERROR: Missing source terms in inventory: ${missingTerms.join(', ')}`);
  process.exit(1);
}
console.log(`✓ All ${canonicalSourceList.length} canonical source verbs/expressions are represented.`);

// 3. Check language coverage across all 14 languages
const supportedLangs = inventory.supported_languages;
if (supportedLangs.length !== 14) {
  console.error(`ERROR: Expected 14 supported languages, got ${supportedLangs.length}`);
  process.exit(1);
}

let totalSenses = 0;
let totalTranslations = 0;

inventory.concepts.forEach(concept => {
  concept.senses.forEach(sense => {
    totalSenses++;
    supportedLangs.forEach(lang => {
      const translations = sense.translations[lang];
      if (!translations || translations.length === 0) {
        console.error(`ERROR: Missing translation for concept ${concept.concept_id}, sense ${sense.sense_id}, language ${lang}`);
        process.exit(1);
      }
      totalTranslations += translations.length;
    });
  });
});

console.log(`✓ 100% language coverage confirmed across all 14 languages.`);
console.log(`  - Total Concepts: ${inventory.concepts.length}`);
console.log(`  - Total Verb Senses: ${totalSenses}`);
console.log(`  - Total Language Translations: ${totalTranslations}`);

console.log('\n=== All Multilingual Verb Inventory Tests Passed! ===\n');
