import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { collectFindings, recordsByCode } = require('../scripts/quality-audit.cjs');

const validEntry = {
  id: 'en:cat:noun',
  word: 'cat',
  language: 'en',
  form: 'noun',
  definitions: ['A small domesticated animal.'],
  examples: ['The cat sleeps on the chair.'],
  transcription: '/kæt/',
  emoji: '🐈',
};

function findingsFor(entries) {
  return recordsByCode(collectFindings(entries.map((entry) => ({ entry, file: 'test.json' }))));
}

test('accepts a complete entry', () => {
  assert.deepEqual(findingsFor([validEntry]), {});
});

test('reports missing definitions and examples', () => {
  const entry = { ...validEntry };
  delete entry.definitions;
  delete entry.examples;
  const findings = findingsFor([entry]);
  assert.deepEqual(findings['missing-definitions'], ['en:cat:noun']);
  assert.deepEqual(findings['missing-examples'], ['en:cat:noun']);
});

test('reports a duplicate word, form and sense', () => {
  const second = { ...validEntry, id: 'en:cat-2:noun' };
  const findings = findingsFor([validEntry, second]);
  assert.deepEqual(findings['duplicate-word-form-sense'], ['en:cat-2:noun|en:cat:noun']);
});

test('reports a pseudo-IPA transcription and a template example', () => {
  const entry = {
    ...validEntry,
    transcription: '/cat/',
    examples: ["Il utilise l'expression \"cat\" dans sa conversation."],
  };
  const findings = findingsFor([entry]);
  assert.deepEqual(findings['pseudo-transcription'], ['en:cat:noun']);
  assert.deepEqual(findings['template-example'], ['en:cat:noun']);
});

test('reports an invalid ID and an ID/form mismatch', () => {
  const entry = { ...validEntry, id: 'en:cat:other' };
  const findings = findingsFor([entry]);
  assert.deepEqual(findings['invalid-id'], ['en:cat:other']);
  assert.deepEqual(findings['id-form-mismatch'], ['en:cat:other']);
});
