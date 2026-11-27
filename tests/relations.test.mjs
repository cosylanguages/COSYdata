/**
 * Relations lexicon tests
 * -----------------------
 * shared/data/vocabulary-relations.json is the canonical antonym/synonym table,
 * compiled from our own entries and consumed by sibling projects that have words
 * but no entries. These tests keep it reproducible and honest: no placeholders,
 * no empty records, normalised keys, and totals that match the content.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LEXICON = JSON.parse(fs.readFileSync(path.join(ROOT, 'shared/data/vocabulary-relations.json'), 'utf8'));
const PLACEHOLDERS = new Set(['no_antonym', 'no_synonym', 'no_antonyms', 'no_synonyms']);

test('the lexicon is up to date with the entries on disk', () => {
  const output = execFileSync(process.execPath, ['scripts/build-relations.cjs', '--check'], { cwd: ROOT, encoding: 'utf8' });
  assert.match(output, /is up to date/);
});

test('every language with relations is published', () => {
  assert.deepEqual(Object.keys(LEXICON.langs).sort(), ['ba', 'br', 'cv', 'de', 'el', 'en', 'es', 'fr', 'hy', 'it', 'ka', 'pt', 'ru', 'tt']);
  assert.equal(LEXICON.totals.languages, Object.keys(LEXICON.langs).length);
});

test('totals match the content', () => {
  let words = 0;
  let antonyms = 0;
  let synonyms = 0;
  for (const table of Object.values(LEXICON.langs)) {
    for (const record of Object.values(table)) {
      words += 1;
      antonyms += record.antonyms.length;
      synonyms += record.synonyms.length;
    }
  }
  assert.deepEqual(LEXICON.totals, { words, antonyms, synonyms, languages: LEXICON.totals.languages });
});

test('records are clean: normalised keys, no placeholders, no empty entries', () => {
  for (const [lang, table] of Object.entries(LEXICON.langs)) {
    for (const [word, record] of Object.entries(table)) {
      assert.equal(word, word.trim().toLowerCase().replace(/\s+/g, ' '), `${lang}: "${word}" is a normalised key`);
      assert.ok(word.length > 0, `${lang}: keys are non-empty`);
      assert.ok(record.antonyms.length + record.synonyms.length > 0, `${lang}: "${word}" has at least one relation`);
      for (const value of [...record.antonyms, ...record.synonyms]) {
        assert.equal(typeof value, 'string', `${lang}: "${word}" relations are strings`);
        assert.ok(value.trim().length > 0, `${lang}: "${word}" relations are non-empty`);
        assert.ok(!PLACEHOLDERS.has(value.trim().toLowerCase()), `${lang}: "${word}" carries a placeholder (${value})`);
      }
      const antonyms = record.antonyms.map((value) => value.toLowerCase());
      const synonyms = record.synonyms.map((value) => value.toLowerCase());
      assert.equal(new Set(antonyms).size, antonyms.length, `${lang}: "${word}" has no duplicate antonyms`);
      assert.equal(new Set(synonyms).size, synonyms.length, `${lang}: "${word}" has no duplicate synonyms`);
      // A word cannot be both a synonym and an antonym of the same headword.
      const both = antonyms.filter((value) => synonyms.includes(value));
      assert.deepEqual(both, [], `${lang}: "${word}" lists ${both.join(', ')} as both synonym and antonym`);
    }
  }
});

test('a known entry keeps the relations it stores', () => {
  assert.deepEqual(LEXICON.langs.en.easy.antonyms, ['difficult', 'hard']);
});
