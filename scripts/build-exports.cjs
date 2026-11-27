#!/usr/bin/env node
/**
 * Publishes the vocabulary as downloads.
 *
 * Three shapes, all derived from the same read of the data:
 *
 *   exports/vocabulary.jsonl      every entry, complete, one JSON object per line
 *   exports/vocabulary.csv        every entry, flat columns for spreadsheets
 *   exports/by-language/<l>.csv   one language, same columns
 *
 * Rows are sorted by id and nothing carries a timestamp, so the output is
 * reproducible: running this twice gives byte-identical files, which is what
 * the CI freshness check relies on.
 *
 *   node scripts/build-exports.cjs            write
 *   node scripts/build-exports.cjs --check    fail if the files on disk differ
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { readEntries } = require('./lib/vocabulary-scan.cjs');

const ROOT = path.resolve(__dirname, '..');
const VOCABULARY_DIR = path.join(ROOT, 'vocabulary');
const OUT_DIR = path.join(ROOT, 'exports');
const MANIFEST = path.join(OUT_DIR, 'manifest.json');
const SCHEMA_VERSION = '1.0.0';

const CSV_COLUMNS = [
  ['id', 'Stable entry id: language, slug, part of speech.'],
  ['language', 'ISO code of the dictionary the entry belongs to.'],
  ['level', 'CEFR level: A0, A1, A2, B1, B2, C1 or C2.'],
  ['word', 'The headword as displayed.'],
  ['form', 'Grammatical form: noun, verb, adjective, phrase and so on.'],
  ['transcription', 'IPA transcription, empty when the entry has none.'],
  ['definitions', 'Definitions in the entry\'s own language, joined with " | ".'],
  ['examples', 'Example sentences, joined with " | ".'],
  ['domain', 'Comma-separated domains, general first when present.'],
  ['theme', 'Primary theme from shared/themes.json.'],
  ['sub_theme', 'Primary sub-theme, or empty.'],
  ['antonyms', 'Antonym ids, joined with " | ".'],
  ['synonyms', 'Synonym ids, joined with " | ".'],
  ['emoji', 'Emoji, or empty when the entry uses no_emoji.'],
  ['updated', 'Date of the last edit, YYYY-MM-DD.']
];

function csvValue(value) {
  if (value == null) return '';
  const text = Array.isArray(value) ? value.join(' | ') : String(value);
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function toCsv(rows) {
  const lines = [CSV_COLUMNS.map(([name]) => name).join(',')];
  for (const entry of rows) lines.push(CSV_COLUMNS.map(([name]) => csvValue(entry[name])).join(','));
  return `${lines.join('\n')}\n`;
}

function toJsonl(rows) {
  return rows.length ? `${rows.map((entry) => JSON.stringify(entry)).join('\n')}\n` : '';
}

function sha256(text) {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

function describe(relPath, format, rows, text) {
  return { path: relPath, format, rows, bytes: Buffer.byteLength(text, 'utf8'), sha256: sha256(text) };
}

function build() {
  const { entries } = readEntries(VOCABULARY_DIR);
  const byLanguage = new Map();
  for (const { entry, file } of entries) {
    const code = path.relative(VOCABULARY_DIR, file).split(path.sep)[0];
    if (!byLanguage.has(code)) byLanguage.set(code, []);
    byLanguage.get(code).push(entry);
  }

  const all = entries.map(({ entry }) => entry).sort((a, b) => String(a.id).localeCompare(String(b.id)));
  const languages = [...byLanguage.keys()].sort();
  const files = [];
  const outputs = new Map();

  const jsonl = toJsonl(all);
  outputs.set('vocabulary.jsonl', jsonl);
  files.push(describe('vocabulary.jsonl', 'jsonl', all.length, jsonl));

  const csv = toCsv(all);
  outputs.set('vocabulary.csv', csv);
  files.push(describe('vocabulary.csv', 'csv', all.length, csv));

  const perLanguage = [];
  for (const code of languages) {
    const rows = byLanguage.get(code).slice().sort((a, b) => String(a.id).localeCompare(String(b.id)));
    const text = toCsv(rows);
    const relPath = `by-language/${code}.csv`;
    outputs.set(relPath, text);
    files.push(describe(relPath, 'csv', rows.length, text));
    perLanguage.push({ code, rows: rows.length, csv: relPath });
  }

  const manifest = {
    schema_version: SCHEMA_VERSION,
    generator: 'scripts/build-exports.cjs',
    source: 'vocabulary/<language>/<level>/*.json',
    rows: all.length,
    ordering: 'sorted by id',
    csv_columns: CSV_COLUMNS.map(([name, note]) => ({ name, note })),
    jsonl_note: 'One JSON object per line: the entry exactly as stored, no columns dropped.',
    languages: perLanguage,
    files
  };

  outputs.set('manifest.json', `${JSON.stringify(manifest, null, 2)}\n`);
  return { outputs, manifest };
}

function readIfExists(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
}

function main() {
  const check = process.argv.includes('--check');
  const { outputs, manifest } = build();
  const differences = [];
  const stale = [];

  if (check) {
    for (const [relPath, text] of outputs) {
      const onDisk = readIfExists(path.join(OUT_DIR, relPath));
      if (onDisk !== text) differences.push(relPath);
    }
    const languageDir = path.join(OUT_DIR, 'by-language');
    if (fs.existsSync(languageDir)) {
      const expected = new Set(manifest.languages.map((language) => `${language.code}.csv`));
      for (const file of fs.readdirSync(languageDir)) {
        if (!expected.has(file)) stale.push(`by-language/${file}`);
      }
    }
    if (differences.length || stale.length) {
      for (const file of differences) console.error(`  outdated: exports/${file}`);
      for (const file of stale) console.error(`  stale: exports/${file}`);
      console.error('exports/ is not up to date. Run: npm run build:exports');
      process.exit(1);
    }
    console.log(`exports/ is up to date (${manifest.rows} rows, ${manifest.files.length} files, ${manifest.languages.length} languages).`);
    return;
  }

  fs.mkdirSync(path.join(OUT_DIR, 'by-language'), { recursive: true });
  const languageDir = path.join(OUT_DIR, 'by-language');
  const expected = new Set(manifest.languages.map((language) => `${language.code}.csv`));
  for (const file of fs.readdirSync(languageDir)) {
    if (!expected.has(file)) fs.rmSync(path.join(languageDir, file));
  }
  for (const [relPath, text] of outputs) fs.writeFileSync(path.join(OUT_DIR, relPath), text);

  const megabytes = manifest.files.reduce((total, file) => total + file.bytes, 0) / 1048576;
  console.log(
    `exports/ written (${manifest.rows} rows across ${manifest.files.length} files, ` +
      `${manifest.languages.length} languages, ${megabytes.toFixed(1)} MB).`
  );
}

main();
