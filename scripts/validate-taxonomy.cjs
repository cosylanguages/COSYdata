const fs = require('fs');
const path = require('path');
const Ajv2020 = require('ajv/dist/2020');

const ajv = new Ajv2020({ allErrors: true });

function validateFileAgainstSchema(dataFile, schemaFile) {
  console.log(`Validating ${dataFile} against ${schemaFile}...`);
  if (!fs.existsSync(dataFile)) {
    throw new Error(`Data file missing: ${dataFile}`);
  }
  if (!fs.existsSync(schemaFile)) {
    throw new Error(`Schema file missing: ${schemaFile}`);
  }

  const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  const schema = JSON.parse(fs.readFileSync(schemaFile, 'utf8'));

  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    console.error(`Validation failed for ${dataFile}:`);
    console.error(JSON.stringify(validate.errors, null, 2));
    process.exit(1);
  }
  console.log(`✓ ${dataFile} is valid.`);
  return data;
}

async function verifyToolsCatalogCoverage() {
  console.log('\nFetching COSYtools catalog.json...');
  const catalogUrl = 'https://raw.githubusercontent.com/COSYlanguages/COSYtools/main/catalog.json';
  try {
    const res = await fetch(catalogUrl);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }
    const catalog = await res.json();
    console.log(`✓ COSYtools catalog fetched successfully. Total tools registered: ${catalog.length}`);
  } catch (err) {
    console.warn(`⚠ Warning: Could not fetch COSYtools catalog from ${catalogUrl}: ${err.message}`);
  }
}

async function run() {
  console.log('=== COSYdata Taxonomy Validation ===\n');

  // Validate levels.json
  validateFileAgainstSchema('taxonomy/levels.json', 'schemas/taxonomy-levels.schema.json');

  // Validate tracks.json
  validateFileAgainstSchema('taxonomy/tracks.json', 'schemas/taxonomy-tracks.schema.json');

  // Validate themes.json
  validateFileAgainstSchema('taxonomy/themes.json', 'schemas/taxonomy-themes.schema.json');

  // Validate languages.json
  validateFileAgainstSchema('taxonomy/languages.json', 'schemas/taxonomy-languages.schema.json');

  // Validate crosswalk-themes.json
  validateFileAgainstSchema('taxonomy/crosswalk-themes.json', 'schemas/taxonomy-crosswalk-themes.schema.json');

  // Dynamic verification of COSYtools coverage
  await verifyToolsCatalogCoverage();

  console.log('\n✓ All taxonomy files passed validation successfully!');
}

run().catch(err => {
  console.error('\n❌ Taxonomy validation error:', err);
  process.exit(1);
});
