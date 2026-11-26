import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { collectFindings, recordsByCode } = require('../scripts/quality-audit.cjs');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const vocabularyDir = path.join(root, 'vocabulary');
const indexFiles = new Set(['index.json', 'flat-index.json', 'search-index.json', 'themes-index.json']);
const nativeScript = {
  ru: /[\u0400-\u04ff]/,
  tt: /[\u0400-\u04ff]/,
  ba: /[\u0400-\u04ff]/,
  cv: /[\u0400-\u04ff]/,
  hy: /[\u0530-\u058f]/,
};

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((dirent) => {
    const full = path.join(dir, dirent.name);
    if (dirent.isDirectory()) return dirent.name === '_canonical' ? [] : walk(full);
    return dirent.name.endsWith('.json') && !indexFiles.has(dirent.name) ? [full] : [];
  });
}

const entries = [];
for (const file of walk(vocabularyDir)) {
  const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!Array.isArray(parsed)) continue;
  for (const entry of parsed) {
    if (entry && typeof entry === 'object' && entry.id) entries.push({ entry, file: path.relative(root, file) });
  }
}

function currentFindings() {
  return recordsByCode(collectFindings(entries));
}

test('the dataset has no structural or quality defects outside missing fields', () => {
  const findings = currentFindings();
  for (const code of [
    'definition-equals-word',
    'template-example',
    'pseudo-transcription',
    'native-script-transcription',
    'transcription-placeholder',
    'duplicate-word-form-sense',
    'invalid-id',
    'id-form-mismatch',
    'double-escaped-transcription',
    'invalid-form',
    'invalid-emoji',
  ]) {
    assert.deepEqual(findings[code] || [], [], `${code} must be empty`);
  }
});

test('no entry has a placeholder, slug-only or native-script transcription', () => {
  const bad = [];
  for (const { entry } of entries) {
    const value = typeof entry.transcription === 'string' ? entry.transcription.trim() : '';
    if (!value) continue;
    const slug = entry.id.split(':')[1];
    if (value === '-' || value === `/${slug}/`) bad.push(entry.id);
    else if (nativeScript[entry.language]?.test(value)) bad.push(entry.id);
  }
  assert.deepEqual(bad, []);
});

test('removed real named people stay removed', () => {
  const aliases = JSON.parse(fs.readFileSync(path.join(root, 'shared', 'id-aliases.json'), 'utf8'));
  const removed = [
    'en:albert-einstein:phrase',
    'en:beyonce:phrase',
    'en:leonardo-da-vinci:phrase',
    'fr:claude-monet:noun',
    'fr:victor-hugo:phrase',
    'fr:moliere:noun',
    'es:marie-curie:noun',
    'es:beyonce:noun',
    'it:galileo-galilei:noun',
    'it:umberto-eco:phrase',
    'pt:nelson-mandela:noun',
    'pt:leonardo-da-vinci:noun',
    'el:platonas:noun',
    'el:sokratis:noun',
  ];
  const live = new Set(entries.map(({ entry }) => entry.id));
  for (const id of removed) {
    assert.equal(live.has(id), false, `${id} must not be a live entry`);
    assert.equal(aliases[id], null, `${id} must have a null alias`);
  }
});
