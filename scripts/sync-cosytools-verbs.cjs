#!/usr/bin/env node
/**
 * Snapshots which verbs COSYtools can conjugate and which have preposition/case governance data, into
 * shared/cosytools-verbs.json. The verb-of-the-day calendars only feature verbs the tools can drill, so
 * they read this snapshot instead of reaching into another repository at build time.
 *
 *   node scripts/sync-cosytools-verbs.cjs ../COSYtools
 *
 * Re-run it when COSYtools adds or removes verbs, then `npm run build:daily`; `npm run validate` fails if a
 * calendar pick is no longer in the snapshot.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const toolsRoot = path.resolve(process.argv[2] || '../COSYtools');
const root = path.resolve(__dirname, '..');

// language -> data file inside COSYtools, keyed by verb lemma
const CONJUGATION = {
  en: 'tools/en/irregular-verbs/data/verbs.json',
  fr: 'tools/fr/conjugeur/data/verbs.json',
  it: 'tools/it/coniugatore/data/verbs.json',
  ru: 'tools/ru/spryazhenie/data/verbs.json',
  el: 'tools/el/klisi-rimaton/data/verbs.json'
};
const GOVERNANCE = {
  en: 'tools/en/verb-prep/data/verbs.json',
  fr: 'tools/fr/regime/data/verbs.json',
  it: 'tools/it/reggenza/data/verbs.json',
  el: 'tools/el/syntaxi/data/verbs.json'
};

const lemma = (s) => String(s).normalize('NFC').toLowerCase().replace(/\u0301/g, '').replace(/^to\s+/, '').trim();

function lemmas(rel) {
  const file = path.join(toolsRoot, rel);
  if (!fs.existsSync(file)) throw new Error(`missing ${rel} in ${toolsRoot}`);
  const d = JSON.parse(fs.readFileSync(file, 'utf8'));
  const keys = Array.isArray(d) ? d.map((x) => x.verb || x.lemma || x.base) : Object.keys(d);
  return Array.from(new Set(keys.filter(Boolean).map(lemma))).sort();
}

let commit = null;
try { commit = execSync('git rev-parse --short HEAD', { cwd: toolsRoot }).toString().trim(); } catch (e) { /* not a git checkout */ }

const out = { source: 'COSYtools', commit, conjugation: {}, governance: {} };
for (const [l, rel] of Object.entries(CONJUGATION)) out.conjugation[l] = lemmas(rel);
for (const [l, rel] of Object.entries(GOVERNANCE)) out.governance[l] = lemmas(rel);
fs.writeFileSync(path.join(root, 'shared', 'cosytools-verbs.json'), JSON.stringify(out, null, 2) + '\n');
console.log('shared/cosytools-verbs.json written from COSYtools' + (commit ? '@' + commit : ''));
for (const [l, v] of Object.entries(out.conjugation)) console.log(`  ${l}: ${v.length} conjugable, ${(out.governance[l] || []).length} with governance`);
