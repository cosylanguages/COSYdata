/**
 * Conjugation registry + embed tests
 * ----------------------------------
 * Verifies the generated registry is well-formed and stable, and that the
 * browser component renders a single table and a cross-language concept group.
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
const REGISTRY = path.join(ROOT, 'shared', 'conjugation-registry.json');
const INDEX = path.join(ROOT, 'shared', 'conjugation-index.json');
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8' };

test('registry has stable, unique ids and a compact index', () => {
  const registry = JSON.parse(fs.readFileSync(REGISTRY, 'utf8'));
  const index = JSON.parse(fs.readFileSync(INDEX, 'utf8'));
  assert.ok(registry.count > 0, 'registry not empty');
  assert.equal(registry.tables.length, registry.count);
  const ids = registry.tables.map((t) => t.id);
  assert.equal(new Set(ids).size, ids.length, 'ids unique');
  for (const id of ids) assert.match(id, /^conj:[a-z]{2,3}:[a-z0-9-]+:[a-z0-9-]+$/, 'id shape: ' + id);
  for (const t of registry.tables) {
    assert.ok(index[t.id], 'indexed: ' + t.id);
    assert.equal(index[t.id].lang, t.lang);
    assert.ok(Object.keys(t.table).length > 0, 'non-empty table: ' + t.id);
  }
});

test('known conjugation ids resolve', () => {
  const index = JSON.parse(fs.readFileSync(INDEX, 'utf8'));
  assert.ok(index['conj:en:be:present'], 'English be');
  assert.ok(index['conj:fr:etre:present'], 'French être');
  assert.ok(index['conj:ru:byt:present'], 'Russian быть');
  assert.equal(index['conj:fr:etre:present'].table['je'], 'suis');
  assert.equal(index['conj:en:be:present'].concept, 'be');
});

test('concept id groups every language for one verb', () => {
  const index = JSON.parse(fs.readFileSync(INDEX, 'utf8'));
  const beLangs = Object.values(index).filter((e) => e.concept === 'be').map((e) => e.lang);
  for (const lang of ['en', 'fr', 'it', 'de', 'ru', 'el', 'es', 'pt', 'hy', 'ka', 'ba', 'br', 'cv', 'tt']) {
    assert.ok(beLangs.includes(lang), 'concept "be" has ' + lang);
  }
});

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
      res.writeHead(200, { 'Content-Type': MIME[path.extname(target)] || 'application/octet-stream', 'Access-Control-Allow-Origin': '*' });
      fs.createReadStream(target).pipe(res);
    } catch { res.writeHead(404).end('Not found'); }
  });
}

const listen = (server) => new Promise((resolve, reject) => {
  server.once('error', reject);
  server.listen(0, '127.0.0.1', () => resolve(server.address().port));
});

test('renders a single table and a concept group in shadow DOM', async () => {
  const server = makeServer();
  const port = await listen(server);
  const base = `http://127.0.0.1:${port}/`;
  const html = `<div data-conjugation-embed="conj:fr:etre:present" data-conjugation-embed-url="${base}"></div>
<div data-conjugation-embed="conj:be:present" data-conjugation-embed-langs="en,fr,ru" data-conjugation-embed-url="${base}"></div>
<div data-conjugation-embed="conj:xx:nope:present" data-conjugation-embed-url="${base}"></div>
<script src="/shared/conjugation-embed.js"></script>`;
  fs.writeFileSync(path.join(ROOT, '__conj_test.html'), html);

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const p = await (await browser.newContext()).newPage();
    const errors = [];
    p.on('pageerror', (e) => errors.push(e.message));
    await p.goto(base + '__conj_test.html', { waitUntil: 'networkidle' });
    await p.waitForFunction(() => Array.from(document.querySelectorAll('[data-conjugation-embed]'))
      .every((h) => h.shadowRoot && !h.shadowRoot.querySelector('.conj-status[role="status"]')), null, { timeout: 15000 });

    const out = await p.evaluate(() => {
      const read = (sel) => {
        const root = document.querySelector(sel).shadowRoot;
        return { cards: root.querySelectorAll('.conj-card').length, text: root.textContent };
      };
      return {
        single: read('[data-conjugation-embed="conj:fr:etre:present"]'),
        concept: read('[data-conjugation-embed="conj:be:present"]'),
        missing: read('[data-conjugation-embed="conj:xx:nope:present"]')
      };
    });

    assert.deepEqual(errors, [], 'no page errors');
    assert.equal(out.single.cards, 1, 'one table for an exact id');
    assert.match(out.single.text, /suis/, 'French forms render');
    assert.equal(out.concept.cards, 3, 'concept limited to 3 languages');
    assert.match(out.concept.text, /быть/, 'Russian concept entry renders');
    assert.match(out.missing.text, /No conjugation table/i, 'unknown id degrades gracefully');
  } finally {
    if (browser) await browser.close();
    server.close();
    fs.rmSync(path.join(ROOT, '__conj_test.html'), { force: true });
  }
});

test('the registry matches the tables it is built from', () => {
  const output = execFileSync(process.execPath, ['scripts/build-conjugation-registry.mjs', '--check'], {
    cwd: ROOT,
    encoding: 'utf8'
  });
  assert.match(output, /up to date/);
});

test('conjugation coverage is declared by COSYtools, never assumed here', () => {
  const snapshot = JSON.parse(fs.readFileSync(path.join(ROOT, 'shared', 'cosytools-verbs.json'), 'utf8'));
  const registry = JSON.parse(fs.readFileSync(REGISTRY, 'utf8'));
  const verbs = JSON.parse(fs.readFileSync(path.join(ROOT, 'shared', 'top10-verbs.json'), 'utf8'));

  assert.equal(snapshot.source, 'COSYtools', 'the snapshot names its owner');
  assert.match(String(snapshot.commit || ''), /^[0-9a-f]{7,40}$/, 'the snapshot records the commit it came from');

  const registryLangs = new Set(registry.tables.map((table) => table.lang));
  const verbsLangs = new Set(verbs.flatMap((verb) => Object.keys(verb.languages || {})));

  for (const lang of Object.keys(snapshot.conjugation || {})) {
    assert.ok(registryLangs.has(lang), `snapshot language ${lang} has tables here`);
  }
  for (const lang of registryLangs) {
    assert.ok(verbsLangs.has(lang), `registry language ${lang} comes from shared/top10-verbs.json`);
  }
});
