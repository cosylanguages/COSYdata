#!/usr/bin/env node
/**
 * Compiles the antonym and synonym lexicon from our own entries.
 *
 * COSYdata owns the vocabulary, so it owns the relations: the lexicon used to be
 * compiled by COSYtools and vendored back in here, which meant a tool repository
 * was the source of truth for data that lives in this one. This script inverts
 * that. The output keeps the shape the COSYtools loader already understands
 * (`{ langs: { <lang>: { <word>: { antonyms, synonyms } } } }`), so consumers
 * can switch to it without changing their code.
 *
 *   node scripts/build-relations.cjs           # write the lexicon
 *   node scripts/build-relations.cjs --check   # exit 1 if it is stale
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { readEntries } = require('./lib/vocabulary-scan.cjs');

const ROOT = path.resolve(__dirname, '..');
const VOCABULARY_DIR = path.join(ROOT, 'vocabulary');
const OUTPUT = path.join(ROOT, 'shared/data/vocabulary-relations.json');

// The schema uses "no_antonym" where a word has none. It is a placeholder, not a
// relation, and it must never reach the lexicon.
const PLACEHOLDERS = new Set(['no_antonym', 'no_synonym', 'no_antonyms', 'no_synonyms']);

const normaliseWord = (word) => String(word == null ? '' : word).trim().toLowerCase().replace(/\s+/g, ' ');

function cleanRelations(list) {
  if (!Array.isArray(list)) return [];
  const seen = new Set();
  const kept = [];
  for (const item of list) {
    if (typeof item !== 'string') continue;
    const value = item.trim();
    if (!value || PLACEHOLDERS.has(value.toLowerCase())) continue;
    const key = value.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    kept.push(value);
  }
  return kept.sort((a, b) => a.localeCompare(b, 'en'));
}

function build() {
  const { entries } = readEntries(VOCABULARY_DIR);
  const langs = new Map();

  for (const { entry } of entries) {
    const lang = entry.language;
    const word = normaliseWord(entry.word);
    if (!lang || !word) continue;

    const antonyms = cleanRelations(entry.antonyms);
    const synonyms = cleanRelations(entry.synonyms);
    if (!antonyms.length && !synonyms.length) continue;

    if (!langs.has(lang)) langs.set(lang, new Map());
    const table = langs.get(lang);
    // Homographs share a key: the union is what a reader looking up the word wants.
    // Maps keyed by the lower-cased value, so "Difficult" and "difficult" collapse.
    if (!table.has(word)) table.set(word, { antonyms: new Map(), synonyms: new Map() });
    const record = table.get(word);
    for (const value of antonyms) record.antonyms.set(value.toLowerCase(), value);
    for (const value of synonyms) record.synonyms.set(value.toLowerCase(), value);
  }

  const out = {};
  let words = 0;
  let antonyms = 0;
  let synonyms = 0;

  for (const lang of [...langs.keys()].sort()) {
    const table = langs.get(lang);
    const sorted = {};
    for (const word of [...table.keys()].sort()) {
      const record = table.get(word);
      const antonymList = [...record.antonyms.values()].sort((a, b) => a.localeCompare(b, 'en'));
      const synonymList = [...record.synonyms.values()].sort((a, b) => a.localeCompare(b, 'en'));
      sorted[word] = { antonyms: antonymList, synonyms: synonymList };
      words += 1;
      antonyms += antonymList.length;
      synonyms += synonymList.length;
    }
    out[lang] = sorted;
  }

  return {
    version: 1,
    note:
      'Antonym and synonym relations compiled from vocabulary/ by scripts/build-relations.cjs. ' +
      'Keys are lower-cased word forms; homographs are merged. Do not edit by hand.',
    totals: { words, antonyms, synonyms, languages: Object.keys(out).length },
    langs: out
  };
}

function main() {
  const check = process.argv.includes('--check');
  const json = JSON.stringify(build(), null, 1) + '\n';
  const current = fs.existsSync(OUTPUT) ? fs.readFileSync(OUTPUT, 'utf8') : null;
  const { totals } = JSON.parse(json);
  const summary = `${totals.words} words, ${totals.antonyms} antonyms, ${totals.synonyms} synonyms, ${totals.languages} languages`;

  if (current === json) {
    console.log(`vocabulary-relations.json is up to date (${summary}).`);
    return;
  }
  if (check) {
    console.error(`vocabulary-relations.json is stale. Run: npm run build:relations`);
    process.exitCode = 1;
    return;
  }
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, json);
  console.log(`vocabulary-relations.json written (${summary}).`);
}

main();
