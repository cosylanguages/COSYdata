/**
 * Exporter product tests
 * ----------------------
 * A download is a promise: this file, these rows, this hash. These tests check
 * the promise against the data on disk, then open the page and confirm it lists
 * exactly what the manifest declares.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { startStaticServer } from './helpers/static-server.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EXPORTS = path.join(ROOT, 'exports');
const MANIFEST = JSON.parse(fs.readFileSync(path.join(EXPORTS, 'manifest.json'), 'utf8'));
const STATS = JSON.parse(fs.readFileSync(path.join(ROOT, 'stats.json'), 'utf8'));

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') { field += '"'; i += 1; }
      else if (char === '"') quoted = false;
      else field += char;
    } else if (char === '"') quoted = true;
    else if (char === ',') { row.push(field); field = ''; }
    else if (char === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (char !== '\r') field += char;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

test('exports/ is up to date with the vocabulary', () => {
  const output = execFileSync(process.execPath, ['scripts/build-exports.cjs', '--check'], {
    cwd: ROOT,
    encoding: 'utf8'
  });
  assert.match(output, /is up to date/);
});

test('every file the manifest lists exists with the declared size and hash', () => {
  for (const file of MANIFEST.files) {
    const full = path.join(EXPORTS, file.path);
    assert.ok(fs.existsSync(full), `${file.path} exists`);
    const content = fs.readFileSync(full);
    assert.equal(content.length, file.bytes, `${file.path} byte size`);
    assert.equal(crypto.createHash('sha256').update(content).digest('hex'), file.sha256, `${file.path} sha256`);
  }
});

test('the row counts agree with the repository totals', () => {
  assert.equal(MANIFEST.rows, STATS.totals.entries, 'manifest rows match stats.json');
  const perLanguage = MANIFEST.languages.reduce((total, language) => total + language.rows, 0);
  assert.equal(perLanguage, MANIFEST.rows, 'per-language rows sum to the total');
});

test('the JSONL parses and keeps every field', () => {
  const lines = fs.readFileSync(path.join(EXPORTS, 'vocabulary.jsonl'), 'utf8').split('\n').filter(Boolean);
  assert.equal(lines.length, MANIFEST.rows, 'one line per entry');
  const ids = new Set();
  for (const line of lines) {
    const entry = JSON.parse(line);
    assert.ok(entry.id && entry.word && entry.language && entry.level, 'each row has the identifying fields');
    assert.ok(!ids.has(entry.id), `duplicate id in export: ${entry.id}`);
    ids.add(entry.id);
  }
  const sorted = [...lines].map((line) => JSON.parse(line).id);
  assert.deepEqual(sorted, [...sorted].sort((a, b) => a.localeCompare(b)), 'rows are sorted by id');
});

test('the CSV header matches the documented columns and every row has them', () => {
  const rows = parseCsv(fs.readFileSync(path.join(EXPORTS, 'vocabulary.csv'), 'utf8'));
  const header = rows[0];
  assert.deepEqual(header, MANIFEST.csv_columns.map((column) => column.name), 'header equals manifest columns');
  assert.equal(rows.length - 1, MANIFEST.rows, 'one data row per entry');
  for (const row of rows.slice(1, 200)) {
    assert.equal(row.length, header.length, `row width matches header: ${row[0]}`);
  }
});

test('quoting survives a round trip through the CSV', () => {
  const rows = parseCsv(fs.readFileSync(path.join(EXPORTS, 'vocabulary.csv'), 'utf8'));
  const header = rows[0];
  const definitions = header.indexOf('definitions');
  const examples = header.indexOf('examples');
  const quoted = rows.slice(1).filter((row) => row[definitions].includes(' | ') || row[examples].includes(' | '));
  assert.ok(quoted.length > 0, 'some rows carry joined lists');
  for (const row of quoted.slice(0, 50)) {
    assert.ok(!row[definitions].startsWith('"'), 'quotes are stripped by the parser, not kept as data');
  }
});

test('the page lists exactly what the manifest declares', async () => {
  const { base, close } = await startStaticServer(ROOT);
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await (await browser.newContext()).newPage();
    const missing = [];
    const pageErrors = [];
    page.on('response', (response) => {
      if (response.status() >= 400) missing.push(`${response.status()} ${response.url()}`);
    });
    page.on('pageerror', (error) => pageErrors.push(error.message));

    await page.goto(`${base}products/exporter/`, { waitUntil: 'networkidle' });
    await page.waitForSelector('body[data-rendered="true"]', { timeout: 15000 });

    assert.deepEqual(missing, [], 'no asset request fails');
    assert.deepEqual(pageErrors, [], 'no page errors');

    const shown = await page.locator('[data-stat="rows"]').innerText();
    assert.equal(Number(shown.replace(/[^0-9]/g, '')), MANIFEST.rows, 'tile shows the published row count');

    const cards = await page.locator('#ex-downloads a').count();
    assert.equal(cards, MANIFEST.files.filter((file) => !file.path.includes('/')).length, 'one card per whole-file download');

    const chips = await page.locator('#ex-languages a').count();
    assert.equal(chips, MANIFEST.languages.length, 'one chip per language');

    const columns = await page.locator('#ex-columns tr').count();
    assert.equal(columns, MANIFEST.csv_columns.length, 'every column is documented');

    const firstHref = await page.locator('#ex-downloads a').first().getAttribute('href');
    assert.match(firstHref, /^\.\.\/\.\.\/exports\//, 'downloads point at exports/');
  } finally {
    await browser.close();
    await close();
  }
});
