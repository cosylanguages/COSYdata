import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const VOCABULARY = path.join(ROOT, 'vocabulary');
const FORMS = new Set([
  'noun', 'verb', 'adjective', 'adverb', 'phrase', 'idiom', 'preposition',
  'pronoun', 'determiner', 'conjunction', 'interjection', 'expression',
  'number', 'article', 'postposition', 'particle', 'phrasal_verb', 'prefix', 'suffix'
]);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((dirent) => {
    const full = path.join(dir, dirent.name);
    if (dirent.isDirectory()) return walk(full);
    if (!dirent.name.endsWith('.json')) return [];
    if (['index.json', 'flat-index.json', 'search-index.json', 'themes-index.json'].includes(dirent.name)) return [];
    return [full];
  });
}

const entries = [];
for (const file of walk(VOCABULARY)) {
  const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!Array.isArray(parsed)) continue;
  for (const entry of parsed) if (entry && entry.id) entries.push(entry);
}
const ids = new Set(entries.map((entry) => entry.id));

test('every derivative names a real term and a valid part of speech', () => {
  for (const entry of entries) {
    if (entry.derivatives === undefined) continue;
    assert.ok(Array.isArray(entry.derivatives) && entry.derivatives.length > 0, `${entry.id} derivatives is a non-empty array`);
    const seen = new Set();
    for (const derivative of entry.derivatives) {
      assert.equal(typeof derivative.term, 'string', `${entry.id} derivative term is a string`);
      assert.ok(derivative.term.trim().length > 0, `${entry.id} derivative term is not empty`);
      assert.ok(FORMS.has(derivative.form), `${entry.id} derivative form '${derivative.form}' is valid`);
      assert.ok(
        !(derivative.form === entry.form && derivative.term.trim().toLowerCase() === entry.word.trim().toLowerCase()),
        `${entry.id} does not repeat its own headword as the same part of speech`
      );
      const key = `${derivative.form}\u0000${derivative.term.toLowerCase()}`;
      assert.ok(!seen.has(key), `${entry.id} does not list the same ${derivative.form} twice`);
      seen.add(key);
      if (/^[a-z]{2}:[^:]+:[^:]+$/.test(derivative.term)) {
        assert.ok(ids.has(derivative.term), `${entry.id} derivative ID '${derivative.term}' resolves`);
      }
    }
  }
});

test('the first-pass scope is covered in every target language', () => {
  for (const lang of ['en', 'fr', 'it', 'ru', 'el']) {
    for (const level of ['B1', 'B2']) {
      const annotated = entries.filter((entry) => entry.language === lang && entry.level === level && entry.derivatives);
      assert.ok(annotated.length > 0, `${lang} has ${level} derivatives`);
    }
  }
  for (const lang of ['fr', 'it', 'ru', 'el']) {
    const eligible = entries.filter((entry) => entry.language === lang && entry.level === 'B2'
      && ['noun', 'verb', 'adjective', 'adverb'].includes(entry.form)
      && !entry.word.includes(' ') && !entry.word.includes('-'));
    const annotated = eligible.filter((entry) => entry.derivatives);
    assert.ok(annotated.length / eligible.length > 0.9, `${lang} B2 coverage is above 90%`);
  }
});

test('derivatives stay out of multi-word entries in the first pass', () => {
  for (const entry of entries) {
    if (!entry.derivatives) continue;
    if (entry.level !== 'B1' && entry.level !== 'B2') continue;
    assert.ok(!entry.word.includes(' '), `${entry.id} is a single-word headword`);
  }
});

test('homographs carry distinct sense labels once labels are used', () => {
  const groups = new Map();
  for (const entry of entries) {
    if (entry.sense_label === undefined) continue;
    const key = `${entry.language}\u0000${entry.word.toLowerCase()}\u0000${entry.form}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(entry);
  }
  for (const group of groups.values()) {
    if (group.length < 2) continue;
    const labels = new Set();
    for (const entry of group) {
      assert.equal(typeof entry.sense_label, 'string', `${entry.id} has a sense_label`);
      assert.ok(entry.sense_label.trim().length > 0, `${entry.id} sense_label is not empty`);
      assert.ok(entry.sense, `${entry.id} has a sense slug`);
      labels.add(entry.sense_label.toLowerCase());
    }
    assert.equal(labels.size, group.length, `${group[0].word} (${group[0].form}) sense labels are distinct`);
  }
});

test('the polysemy pilot covers a meaningful set of English homographs', () => {
  const labeled = entries.filter((entry) => entry.language === 'en' && entry.sense_label);
  assert.ok(labeled.length >= 180, `at least 180 English senses carry a label, got ${labeled.length}`);
  const groups = new Set(labeled.map((entry) => `${entry.word.toLowerCase()}\u0000${entry.form}`));
  assert.ok(groups.size >= 100, `labels cover at least 100 word/form pairs, got ${groups.size}`);
});

test('B1 and B2 adjectives carry the gendered forms their language needs', () => {
  const required = {
    fr: ['feminine', 'feminine_plural', 'masculine_plural'],
    it: ['feminine', 'feminine_plural', 'masculine_plural'],
    ru: ['feminine', 'neuter', 'plural_form'],
    el: ['feminine', 'neuter', 'masculine_plural', 'feminine_plural', 'neuter_plural']
  };
  for (const [lang, fields] of Object.entries(required)) {
    const adjectives = entries.filter((entry) => entry.language === lang
      && (entry.level === 'B1' || entry.level === 'B2')
      && entry.form === 'adjective' && !entry.word.includes(' ') && !entry.word.includes('-'));
    for (const entry of adjectives) {
      for (const field of fields) {
        assert.equal(typeof entry[field], 'string', `${entry.id} has ${field}`);
        assert.ok(entry[field].trim().length > 0, `${entry.id} ${field} is not empty`);
      }
    }
  }
});
