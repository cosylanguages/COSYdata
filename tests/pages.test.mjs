/**
 * Generated page tests
 * --------------------
 * The dictionary pages are one template plus one JSON file. These tests keep the
 * committed HTML equal to what the template produces, and keep the config in step
 * with the data: a language with vocabulary files but no page is invisible, and a
 * page with no config entry is a page that will drift.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DICTIONARIES = JSON.parse(fs.readFileSync(path.join(ROOT, 'templates/dictionaries.json'), 'utf8'));

const pagePath = (code) => path.join(ROOT, 'vocabulary', code, 'index.html');
const pageHtml = (code) => fs.readFileSync(pagePath(code), 'utf8');

test('every generated page matches its template', () => {
  const output = execFileSync(process.execPath, ['scripts/build-pages.cjs', '--check'], { cwd: ROOT, encoding: 'utf8' });
  assert.match(output, /page\(s\) up to date/);
});

test('each page carries its language, title and heading', () => {
  for (const entry of DICTIONARIES) {
    const html = pageHtml(entry.code);
    assert.match(html, new RegExp(`<html lang="${entry.code}">`), `${entry.code}: html lang`);
    assert.match(html, new RegExp(`data-dictionary-lang="${entry.code}"`), `${entry.code}: app lang`);
    assert.match(html, new RegExp(`initDictionaryUI\\('#dictionary-app', \\{ lang: '${entry.code}'`), `${entry.code}: init call`);
    assert.match(html, new RegExp(`href="https://cosylanguages.github.io/COSYdata/vocabulary/${entry.code}/"`), `${entry.code}: canonical`);
    assert.ok(html.includes(entry.heading.replace(/&/g, '&amp;')), `${entry.code}: heading`);
    assert.ok(html.includes(entry.title.replace(/&/g, '&amp;')), `${entry.code}: title`);
  }
});

test('every language with vocabulary files has a page', () => {
  const withData = fs
    .readdirSync(path.join(ROOT, 'vocabulary'), { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && !dirent.name.startsWith('_'))
    .filter((dirent) => fs.readdirSync(path.join(ROOT, 'vocabulary', dirent.name)).some((file) => file.endsWith('.json')))
    .map((dirent) => dirent.name)
    .sort();
  const configured = DICTIONARIES.map((entry) => entry.code).sort();
  assert.deepEqual(configured, withData, 'templates/dictionaries.json lists exactly the languages that have data');
});

test('generated pages hold no page-level styles and no sibling-repository assets', () => {
  for (const entry of DICTIONARIES) {
    const html = pageHtml(entry.code);
    assert.ok(!html.includes('<style'), `${entry.code}: no inline stylesheet`);
    assert.ok(!/https?:\/\/(?!cosylanguages\.github\.io\/COSYdata)/.test(html), `${entry.code}: no external URLs`);
  }
});
