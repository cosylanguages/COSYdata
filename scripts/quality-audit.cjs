#!/usr/bin/env node
/*
 * Quality gate for vocabulary data.
 *
 * Existing defects are recorded in reports/quality-baseline.json so that this
 * repository can make progress without pretending the current data is clean.
 * Any finding not present in the baseline fails `--check`.
 */
const fs = require('fs');
const path = require('path');
const Ajv2020 = require('ajv/dist/2020');
const { readEntries } = require('./lib/vocabulary-scan.cjs');

const rootDir = path.resolve(__dirname, '..');
const qualitySchemaPath = path.join(rootDir, 'schemas', 'vocabulary.quality.schema.json');
const baselinePath = path.join(rootDir, 'reports', 'quality-baseline.json');
let entriesCount = 0;

// Every rule the audit can raise, with the sentence a reader needs. The report
// page renders this catalogue, including the rules that found nothing: a clean
// rule is information too.
const RULES = {
  'missing-definitions': 'The entry has no definitions field.',
  'missing-examples': 'The entry has no examples field.',
  'empty-definitions': 'The definitions array is empty.',
  'empty-examples': 'The examples array is empty.',
  'definition-too-short': 'A definition is shorter than two characters.',
  'example-too-short': 'An example is shorter than two characters.',
  'invalid-definitions': 'The definitions field is not an array of strings.',
  'invalid-examples': 'The examples field is not an array of strings.',
  'invalid-id': 'The id does not follow lang:slug:form.',
  'invalid-form': 'The form is not one of the allowed parts of speech.',
  'invalid-emoji': 'The emoji field is missing or would break HTML.',
  'invalid-transcription': 'The transcription field is not a string.',
  'transcription-placeholder': 'The transcription is the schema placeholder "-".',
  'missing-transcription': 'The entry has no IPA transcription.',
  'pseudo-transcription': 'The transcription is only the slug in slashes, not IPA.',
  'double-escaped-transcription': 'The transcription contains literal backslash-u escapes.',
  'native-script-transcription': 'The IPA field holds native script instead of IPA.',
  'id-form-mismatch': 'The id form segment does not match the form field.',
  'definition-equals-word': 'A definition just repeats the headword.',
  'template-example': 'An example is a fixed template sentence reused across entries.',
  'duplicate-word-form-sense': 'Several entries share language, word, form and sense.'
};

const SCHEMA_CODE_BY_ERROR = {
  missingDefinitions: 'missing-definitions',
  missingExamples: 'missing-examples',
  emptyDefinitions: 'empty-definitions',
  emptyExamples: 'empty-examples',
  shortDefinition: 'definition-too-short',
  shortExample: 'example-too-short',
  invalidId: 'invalid-id',
  invalidForm: 'invalid-form',
  invalidEmoji: 'invalid-emoji',
  transcriptionPlaceholder: 'transcription-placeholder',
};

const TEMPLATE_EXAMPLE_PATTERNS = [
  /^Il utilise l'expression(?=\s|$)/i,
  /^Usa l'espressione(?=\s|$)/i,
  /^Он использует выражение(?=\s|$)/i,
  /^Мы знаем известное выражение(?=\s|$)/i,
];

const NATIVE_SCRIPT_LANGUAGES = {
  ru: /[\u0400-\u04ff]/,
  tt: /[\u0400-\u04ff]/,
  ba: /[\u0400-\u04ff]/,
  cv: /[\u0400-\u04ff]/,
  hy: /[\u0530-\u058f]/,
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

function normalizeText(value) {
  return String(value)
    .normalize('NFC')
    .toLowerCase()
    .replace(/[.!?;,:]+$/g, '')
    .trim();
}

function addFinding(findings, code, subject, detail) {
  const key = `${code}\u0000${subject}`;
  if (!findings.has(key)) {
    findings.set(key, { code, subject, detail: detail || '' });
  }
}

function mapSchemaError(err) {
  if (err.keyword === 'required') {
    if (err.params && err.params.missingProperty === 'definitions') return SCHEMA_CODE_BY_ERROR.missingDefinitions;
    if (err.params && err.params.missingProperty === 'examples') return SCHEMA_CODE_BY_ERROR.missingExamples;
    return null;
  }
  if (err.keyword === 'minItems' && err.instancePath === '/definitions') return SCHEMA_CODE_BY_ERROR.emptyDefinitions;
  if (err.keyword === 'minItems' && err.instancePath === '/examples') return SCHEMA_CODE_BY_ERROR.emptyExamples;
  if (err.keyword === 'minLength' && err.instancePath.startsWith('/definitions/')) return SCHEMA_CODE_BY_ERROR.shortDefinition;
  if (err.keyword === 'minLength' && err.instancePath.startsWith('/examples/')) return SCHEMA_CODE_BY_ERROR.shortExample;
  if (err.keyword === 'pattern' && err.instancePath === '/id') return SCHEMA_CODE_BY_ERROR.invalidId;
  if (err.keyword === 'enum' && err.instancePath === '/form') return SCHEMA_CODE_BY_ERROR.invalidForm;
  if (err.keyword === 'pattern' && err.instancePath === '/emoji') return SCHEMA_CODE_BY_ERROR.invalidEmoji;
  if (err.keyword === 'not' && err.instancePath === '/transcription') return SCHEMA_CODE_BY_ERROR.transcriptionPlaceholder;
  if (err.keyword === 'type') {
    if (err.instancePath === '/definitions') return 'invalid-definitions';
    if (err.instancePath === '/examples') return 'invalid-examples';
    if (err.instancePath === '/id') return SCHEMA_CODE_BY_ERROR.invalidId;
    if (err.instancePath === '/form') return SCHEMA_CODE_BY_ERROR.invalidForm;
    if (err.instancePath === '/emoji') return SCHEMA_CODE_BY_ERROR.invalidEmoji;
    if (err.instancePath === '/transcription') return 'invalid-transcription';
  }
  return null;
}

function loadEntries() {
  let files;
  let pairs;
  try {
    ({ files, entries: pairs } = readEntries(path.join(rootDir, 'vocabulary')));
  } catch (err) {
    throw new Error(`Cannot parse vocabulary data: ${err.message}`);
  }
  const entries = pairs.map(({ entry, file }) => ({ entry, file: path.relative(rootDir, file).replace(/\\/g, '/') }));
  return { files, entries };
}

function collectFindings(entries) {
  if (!fs.existsSync(qualitySchemaPath)) {
    throw new Error(`Quality schema not found: ${qualitySchemaPath}`);
  }
  const schema = JSON.parse(fs.readFileSync(qualitySchemaPath, 'utf8'));
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const findings = new Map();
  const wordFormSense = new Map();

  for (const { entry } of entries) {
    if (!validate(entry)) {
      for (const err of validate.errors || []) {
        const code = mapSchemaError(err);
        if (code) addFinding(findings, code, entry.id || '(missing id)', err.message);
      }
    }

    const id = String(entry.id || '');
    const idParts = id.split(':');
    if (idParts.length === 3 && idParts[2] !== entry.form) {
      addFinding(
        findings,
        'id-form-mismatch',
        id,
        `ID segment '${idParts[2]}' does not match form '${entry.form}'`
      );
    }

    if (Array.isArray(entry.definitions)) {
      const word = normalizeText(entry.word || '');
      if (word && entry.definitions.some((d) => normalizeText(d) === word)) {
        addFinding(findings, 'definition-equals-word', id, `definition repeats '${entry.word}'`);
      }
    }

    if (Array.isArray(entry.examples) && entry.examples.some((ex) => {
      return TEMPLATE_EXAMPLE_PATTERNS.some((re) => re.test(String(ex).trim()));
    })) {
      addFinding(findings, 'template-example', id, 'example uses a fixed template sentence');
    }

    const transcription = typeof entry.transcription === 'string' ? entry.transcription.trim() : '';
    if (!transcription) {
      addFinding(findings, 'missing-transcription', id, 'transcription is absent or empty');
    } else {
      const slug = idParts.length >= 2 ? idParts[1] : '';
      if (slug && transcription === `/${slug}/`) {
        addFinding(findings, 'pseudo-transcription', id, `transcription is only /${slug}/`);
      }
      if (transcription.includes('\\u')) {
        addFinding(findings, 'double-escaped-transcription', id, 'transcription contains literal \\u escapes');
      }
      const nativeScript = NATIVE_SCRIPT_LANGUAGES[entry.language];
      if (nativeScript && nativeScript.test(transcription)) {
        addFinding(findings, 'native-script-transcription', id, 'transcription uses native script instead of IPA');
      }
    }

    const duplicateKey = [entry.language, entry.word, entry.form, entry.sense || ''].join('\u0000');
    if (!wordFormSense.has(duplicateKey)) wordFormSense.set(duplicateKey, []);
    wordFormSense.get(duplicateKey).push(id);
  }

  for (const ids of wordFormSense.values()) {
    if (ids.length < 2) continue;
    const sorted = [...new Set(ids)].sort();
    addFinding(
      findings,
      'duplicate-word-form-sense',
      sorted.join('|'),
      `${sorted.length} entries share language, word, form and sense`
    );
  }

  return findings;
}

function recordsByCode(findings) {
  const records = {};
  for (const finding of findings.values()) {
    if (!records[finding.code]) records[finding.code] = [];
    records[finding.code].push(finding.subject);
  }
  for (const code of Object.keys(records)) records[code].sort();
  return records;
}

function loadBaseline() {
  if (!fs.existsSync(baselinePath)) return null;
  const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
  return baseline.records || {};
}

function check(findings) {
  const baseline = loadBaseline();
  if (!baseline) {
    console.error(`Quality baseline not found: ${path.relative(rootDir, baselinePath)}`);
    console.error('Run: npm run quality:update-baseline');
    process.exit(2);
  }

  const current = recordsByCode(findings);
  const newFindings = [];
  let resolved = 0;

  for (const [code, subjects] of Object.entries(current)) {
    const known = new Set(baseline[code] || []);
    for (const subject of subjects) {
      if (!known.has(subject)) newFindings.push({ code, subject });
    }
  }
  for (const [code, subjects] of Object.entries(baseline)) {
    const present = new Set(current[code] || []);
    for (const subject of subjects) {
      if (!present.has(subject)) resolved += 1;
    }
  }

  console.log('Quality audit');
  console.log(`  entries: ${entriesCount}`);
  console.log(`  findings: ${findings.size}`);
  console.log(`  baseline: ${Object.values(baseline).reduce((n, list) => n + list.length, 0)}`);
  console.log(`  new: ${newFindings.length}`);
  console.log(`  resolved since baseline: ${resolved}`);

  if (newFindings.length > 0) {
    console.error('\nNew quality violations:');
    for (const finding of newFindings.slice(0, 50)) {
      console.error(`  - [${finding.code}] ${finding.subject}`);
    }
    if (newFindings.length > 50) {
      console.error(`  ... and ${newFindings.length - 50} more`);
    }
    console.error('\nFix these entries or, if they are intentional baseline debt, run:');
    console.error('  npm run quality:update-baseline');
    process.exit(1);
  }

  if (resolved > 0) {
    console.log('\nBaseline is stale: some recorded violations are now resolved.');
    console.log('Run: npm run quality:update-baseline');
  }
}

function updateBaseline(findings) {
  const records = recordsByCode(findings);
  const baseline = {
    version: 1,
    generated: today(),
    description: 'Existing vocabulary quality debt accepted by scripts/quality-audit.cjs. New entries must not add findings.',
    entry_count: entriesCount,
    records,
  };
  fs.writeFileSync(baselinePath, `${JSON.stringify(baseline, null, 2)}\n`);
  console.log(`Wrote ${path.relative(rootDir, baselinePath)}`);
  console.log(`  entries: ${entriesCount}`);
  console.log(`  findings: ${findings.size}`);
  for (const [code, subjects] of Object.entries(records)) {
    console.log(`  ${code}: ${subjects.length}`);
  }
}

function main() {
  const args = process.argv.slice(2);
  const update = args.includes('--update-baseline');
  const checkMode = args.includes('--check') || (!update && args.length === 0);

  if (!update && !checkMode) {
    console.error('Usage: node scripts/quality-audit.cjs [--check | --update-baseline]');
    process.exit(2);
  }

  const loaded = loadEntries();
  entriesCount = loaded.entries.length;
  const findings = collectFindings(loaded.entries);

  if (update) {
    updateBaseline(findings);
  } else {
    check(findings);
  }
}

if (require.main === module) {
  main();
}

module.exports = { collectFindings, recordsByCode, RULES };

