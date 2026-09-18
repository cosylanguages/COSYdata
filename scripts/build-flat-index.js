#!/usr/bin/env node
/**
 * scripts/build-flat-index.js
 *
 * Builds vocabulary/<lang>/flat-index.json — a reverse lookup from every
 * surface form of a word (base form, plural, comparative, superlative)
 * to the word ID(s) it belongs to.
 *
 * WHY THIS EXISTS
 * `vocabulary/<lang>/index.json` maps word ID -> theme file, which is enough
 * when a page already knows which word it wants (e.g. `data-vocab="en:cat"`).
 * It is NOT enough to auto-detect clickable words inside arbitrary prose,
 * because the reader will encounter inflected forms ("cats", "healthier")
 * rather than dictionary headwords. flat-index.json closes that gap so
 * shared/cosy-word-popup.js can match on whatever string actually appears
 * on the page.
 *
 * OUTPUT SHAPE
 * {
 *   "cat":       [{ "id": "en:animals:cat", "field": "word" }],
 *   "cats":      [{ "id": "en:animals:cat", "field": "plural_form" }],
 *   "healthy":   [{ "id": "en:health:healthy", "field": "word" }],
 *   "healthier": [{ "id": "en:health:healthy", "field": "comparative" }]
 * }
 * Keys are lowercased + NFC-normalized. A key can map to more than one
 * entry (homographs / cross-theme collisions) — the popup component
 * decides how to disambiguate at click time.
 *
 * USAGE
 *   node scripts/build-flat-index.js
 * Add to package.json:
 *   "build:flat-index": "node scripts/build-flat-index.js"
 * Run it in the same CI step as `npm run build:index` so both stay fresh,
 * and consider adding the same "no uncommitted diff after regenerating"
 * check that validate-vocabulary.yml already does for index.json.
 */

const fs = require('fs');
const path = require('path');

const VOCAB_ROOT = path.join(__dirname, '..', 'vocabulary');
const SKIP_FILES = new Set(['index.json', 'flat-index.json']);

function normalize(str) {
  return String(str).toLowerCase().normalize('NFC');
}

function listThemeFiles(langDir) {
  return fs
    .readdirSync(langDir)
    .filter((f) => f.endsWith('.json') && !SKIP_FILES.has(f))
    .map((f) => path.join(langDir, f));
}

function addSurfaceForm(flat, surface, id, field) {
  if (!surface || typeof surface !== 'string') return;
  const key = normalize(surface);
  if (!flat[key]) flat[key] = [];
  const alreadyPresent = flat[key].some((e) => e.id === id && e.field === field);
  if (!alreadyPresent) flat[key].push({ id, field });
}

function buildFlatIndexForLang(lang) {
  const langDir = path.join(VOCAB_ROOT, lang);
  const files = listThemeFiles(langDir);
  const flat = {};

  for (const file of files) {
    let raw;
    try {
      raw = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (err) {
      console.error(`[build-flat-index] Failed to parse ${file}: ${err.message}`);
      continue;
    }
    const entries = Array.isArray(raw) ? raw : Object.values(raw);

    for (const entry of entries) {
      if (!entry || !entry.id || !entry.word) continue;
      addSurfaceForm(flat, entry.word, entry.id, 'word');
      addSurfaceForm(flat, entry.plural_form, entry.id, 'plural_form');
      addSurfaceForm(flat, entry.comparative, entry.id, 'comparative');
      addSurfaceForm(flat, entry.superlative, entry.id, 'superlative');
    }
  }

  // Sort keys for deterministic diffs in PRs.
  return Object.fromEntries(
    Object.keys(flat)
      .sort()
      .map((k) => [k, flat[k]])
  );
}

function main() {
  if (!fs.existsSync(VOCAB_ROOT)) {
    console.error(`[build-flat-index] vocabulary/ not found at ${VOCAB_ROOT}`);
    process.exit(1);
  }

  const langs = fs
    .readdirSync(VOCAB_ROOT)
    .filter((f) => fs.statSync(path.join(VOCAB_ROOT, f)).isDirectory());

  let totalForms = 0;
  for (const lang of langs) {
    const flat = buildFlatIndexForLang(lang);
    const outPath = path.join(VOCAB_ROOT, lang, 'flat-index.json');
    fs.writeFileSync(outPath, JSON.stringify(flat, null, 2) + '\n');
    totalForms += Object.keys(flat).length;
    console.log(`[build-flat-index] ${lang}: ${Object.keys(flat).length} surface forms -> ${outPath}`);
  }
  console.log(`[build-flat-index] done. ${totalForms} total surface forms across ${langs.length} language(s).`);
}

main();
