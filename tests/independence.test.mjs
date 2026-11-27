/**
 * Repository independence tests
 * -----------------------------
 * COSYdata must render with nothing but its own files. Two checks:
 *
 *  1. Static: no page loads CSS, JS, a font or an image from a sibling
 *     repository (scripts/check-no-cross-repo-assets.cjs).
 *  2. Live: the browser makes no stylesheet/script/font/image request to a
 *     sibling repository, and the dictionary still renders real entries.
 *
 * Data fetches (JSON from COSYpractice or COSYlanguages) are out of scope:
 * they are optional content and degrade to an empty widget.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SIBLING_ORIGIN = 'https://cosylanguages.github.io/';
const ASSET_TYPES = new Set(['stylesheet', 'script', 'font', 'image', 'media']);
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml',
  '.png': 'image/png'
};

function isSiblingAsset(url) {
  const parsed = new URL(url);
  if (parsed.hostname !== 'cosylanguages.github.io') return false;
  return !(parsed.pathname === '/COSYdata' || parsed.pathname.startsWith('/COSYdata/'));
}

function makeServer() {
  return http.createServer((req, res) => {
    let pathname;
    try { pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname); }
    catch { res.writeHead(400).end('Bad request'); return; }
    const file = path.resolve(ROOT, '.' + pathname);
    if (!file.startsWith(ROOT + path.sep) && file !== ROOT) { res.writeHead(403).end('Forbidden'); return; }
    try {
      const stat = fs.statSync(file);
      const target = stat.isDirectory() ? path.join(file, 'index.html') : file;
      res.writeHead(200, { 'Content-Type': MIME[path.extname(target)] || 'application/octet-stream' });
      fs.createReadStream(target).pipe(res);
    } catch { res.writeHead(404).end('Not found'); }
  });
}

const listen = (server) => new Promise((resolve, reject) => {
  server.once('error', reject);
  server.listen(0, '127.0.0.1', () => resolve(server.address().port));
});

test('no page references a sibling repository asset', () => {
  const output = execFileSync(process.execPath, ['scripts/check-no-cross-repo-assets.cjs'], { cwd: ROOT, encoding: 'utf8' });
  assert.match(output, /No cross-repository or missing runtime assets/);
});

test('pages render without loading sibling repository assets', async () => {
  const server = makeServer();
  const port = await listen(server);
  const base = `http://127.0.0.1:${port}/`;
  let browser;

  try {
    browser = await chromium.launch({ headless: true });
    const page = await (await browser.newContext()).newPage();
    const violations = [];
    const fonts = [];
    page.on('request', (request) => {
      if (!ASSET_TYPES.has(request.resourceType())) return;
      if (!isSiblingAsset(request.url())) return;
      violations.push(`${request.resourceType()} ${request.url()}`);
    });
    page.on('response', (response) => {
      if (response.request().resourceType() === 'font') fonts.push(response.status());
    });

    await page.goto(base + 'vocabulary/en/', { waitUntil: 'networkidle' });
    await page.waitForSelector('#dictionary-app .cosy-dict-wotd-word', { timeout: 20000 });
    assert.deepEqual(violations, [], 'dictionary page asset requests stay on this repository');
    assert.ok(fonts.length > 0, 'self-hosted fonts were requested');
    assert.ok(fonts.every((status) => status === 200), `font files resolve locally: ${fonts.join(', ')}`);

    violations.length = 0;
    await page.goto(base, { waitUntil: 'networkidle' });
    assert.deepEqual(violations, [], 'hub page asset requests stay on this repository');
  } finally {
    if (browser) await browser.close();
    server.close();
  }
});
