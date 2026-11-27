#!/usr/bin/env node
/**
 * Renders the pages that are the same file with different content.
 *
 * The fourteen dictionary pages differ only in their language code, title,
 * description, locale and heading. Keeping fourteen copies of the same 39 lines
 * means every shell change has to be made fourteen times, and one of them gets
 * missed. Here the shell is one template and the content is one JSON file.
 *
 *   node scripts/build-pages.cjs           # write the pages
 *   node scripts/build-pages.cjs --check   # exit 1 if a page is stale
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://cosylanguages.github.io/COSYdata';

const PAGES = [
  {
    name: 'dictionary',
    template: 'templates/dictionary-page.html',
    entries: 'templates/dictionaries.json',
    output: (entry) => `vocabulary/${entry.code}/index.html`,
    // A page that is not in the config is a page nobody will remember to update.
    owned: 'vocabulary',
    vars: (entry) => ({
      code: entry.code,
      locale: entry.locale,
      title: entry.title,
      description: entry.description,
      heading: entry.heading,
      url: `${SITE_URL}/vocabulary/${entry.code}/`
    })
  }
];

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, (char) => ESCAPES[char]);
}

function render(template, vars) {
  const rendered = template.replace(/\{\{([a-z_]+)\}\}/g, (match, key) => {
    if (!(key in vars)) throw new Error(`placeholder ${match} has no value`);
    return escapeHtml(vars[key]);
  });
  const leftover = rendered.match(/\{\{[^}]*\}\}/);
  if (leftover) throw new Error(`placeholder ${leftover[0]} was not replaced`);
  return rendered;
}

function ownedDirectories(page) {
  const base = path.join(ROOT, page.owned);
  if (!fs.existsSync(base)) return [];
  return fs
    .readdirSync(base, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && !dirent.name.startsWith('_'))
    .map((dirent) => dirent.name);
}

function main() {
  const check = process.argv.includes('--check');
  const changed = [];
  let total = 0;

  for (const page of PAGES) {
    const template = fs.readFileSync(path.join(ROOT, page.template), 'utf8');
    const entries = JSON.parse(fs.readFileSync(path.join(ROOT, page.entries), 'utf8'));
    const written = new Set();
    let pageChanged = 0;

    for (const entry of entries) {
      const relative = page.output(entry);
      if (written.has(relative)) throw new Error(`${page.name}: two entries write ${relative}`);
      written.add(relative);
      total += 1;

      const html = render(template, page.vars(entry));
      const target = path.join(ROOT, relative);
      const current = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : null;
      if (current === html) continue;

      changed.push(relative);
      pageChanged += 1;
      if (!check) {
        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, html);
      }
    }

    if (page.owned) {
      const expected = new Set(entries.map((entry) => entry.code));
      const extra = ownedDirectories(page).filter((code) => !expected.has(code));
      if (extra.length) {
        console.error(`${page.name}: ${page.owned}/ has pages with no config entry: ${extra.join(', ')}`);
        process.exitCode = 1;
      }
    }

    console.log(`${page.name}: ${entries.length} page(s), ${pageChanged} ${check ? 'stale' : 'written'}`);
  }

  if (check && changed.length) {
    console.error(`\n${changed.length} page(s) do not match their template. Run: npm run build:pages`);
    for (const file of changed) console.error(`  ${file}`);
    process.exitCode = 1;
  } else if (changed.length) {
    for (const file of changed) console.log(`  wrote ${file}`);
  }

  if (process.exitCode) return;
  console.log(`\n${total} page(s) up to date.`);
}

main();
