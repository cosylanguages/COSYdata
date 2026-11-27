/**
 * Statistics artifact tests
 * -------------------------
 * stats.json is generated, committed and published. These tests keep it honest:
 * it must be reproducible, internally consistent, and agree with the entry
 * count reported by the theme normalisation validator.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const STATS_PATH = path.join(ROOT, 'stats.json');
const STATS = JSON.parse(fs.readFileSync(STATS_PATH, 'utf8'));
const sum = (values) => values.reduce((total, value) => total + value, 0);

test('stats.json is up to date with the data on disk', () => {
  const output = execFileSync(process.execPath, ['scripts/build-stats.cjs', '--check'], { cwd: ROOT, encoding: 'utf8' });
  assert.match(output, /stats\.json is up to date/);
});

test('totals agree with the per-level, per-form and per-language breakdowns', () => {
  assert.equal(sum(Object.values(STATS.by_level)), STATS.totals.entries, 'by_level sums to the total');
  assert.equal(sum(STATS.by_form.map((form) => form.entries)), STATS.totals.entries, 'by_form sums to the total');
  assert.equal(sum(STATS.languages.map((language) => language.entries)), STATS.totals.entries, 'languages sum to the total');
  assert.equal(STATS.languages.length, STATS.totals.languages);
  for (const language of STATS.languages) {
    assert.equal(sum(Object.values(language.by_level)), language.entries, `${language.code} levels sum to its total`);
  }
});

test('entry count matches the theme normalisation validator', () => {
  const output = execFileSync(process.execPath, ['scripts/validate-theme-normalisation.cjs'], { cwd: ROOT, encoding: 'utf8' });
  const match = output.match(/(\d+) entries/);
  assert.ok(match, 'validator reports an entry count');
  assert.equal(Number(match[1]), STATS.totals.entries, 'one counting rule everywhere');
});

test('coverage percentages stay in range and definitions are complete', () => {
  const blocks = [STATS.coverage, ...STATS.languages.map((language) => language.coverage)];
  for (const coverage of blocks) {
    for (const [field, value] of Object.entries(coverage)) {
      assert.ok(value >= 0 && value <= 100, `${field} is a percentage: ${value}`);
    }
  }
  assert.equal(STATS.coverage.definitions, 100);
  assert.equal(STATS.coverage.examples, 100);
});

test('the artifact is self-describing for consumers', () => {
  assert.equal(STATS.schema_version, 1);
  assert.ok(STATS.counting_rule.length > 40, 'counting rule is documented in the file');
  assert.match(STATS.data_updated, /^\d{4}-\d{2}-\d{2}$/, 'data_updated is an ISO date');
  assert.deepEqual(Object.keys(STATS.by_level), ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2']);
  assert.equal(STATS.totals.themes, Object.keys(JSON.parse(fs.readFileSync(path.join(ROOT, 'schemas', 'themes.json'), 'utf8')).themes).length);
  assert.ok(STATS.themes.length > 0 && STATS.themes.every((theme) => theme.entries > 0));
  assert.ok(STATS.functional_phrases.entries === sum(STATS.functional_phrases.by_language.map((row) => row.entries)));
});
