import assert from 'node:assert/strict';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const require = createRequire(import.meta.url);
const { loadLevelEntries } = require('../scripts/a0-a1-parity.cjs');
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('parity loader includes nested home vocabulary files', () => {
  const entries = loadLevelEntries(rootDir, 'en', 'a0_a1');
  assert.ok(entries.length > 1600, `expected a full A0-A1 set, got ${entries.length}`);
  const nested = entries.filter((entry) => entry._filename.startsWith('home/'));
  assert.ok(nested.length > 0);
  assert.ok(nested.some((entry) => entry._filename === 'home/homes.json'));
});

test('parity loader ignores index files and records relative paths', () => {
  const entries = loadLevelEntries(rootDir, 'en', 'a0_a1');
  assert.ok(entries.every((entry) => !entry._filename.endsWith('index.json')));
  assert.ok(entries.every((entry) => !path.isAbsolute(entry._filename)));
});
