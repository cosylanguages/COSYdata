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
  de: 'tools/de/konjugation/data/verbs.json',
  ru: 'tools/ru/spryazhenie/data/verbs.json',
  el: 'tools/el/klisi-rimaton/data/verbs.json'
};
const GOVERNANCE = {
  en: 'tools/en/verb-prep/data/verbs.json',
  fr: 'tools/fr/regime/data/verbs.json',
  it: 'tools/it/reggenza/data/verbs.json',
  de: 'tools/de/praepositionen/data/verbs.json',
  el: 'tools/el/syntaxi/data/verbs.json'
};

const lemma = (s) => String(s).normalize('NFC').toLowerCase().replace(/\u0301/g, '').replace(/^to\s+/, '').trim();

function readEntries(rel) {
  const file = path.join(toolsRoot, rel);
  if (!fs.existsSync(file)) throw new Error(`missing ${rel} in ${toolsRoot}`);
  const d = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (Array.isArray(d)) return d.map((x) => [x.verb || x.lemma || x.base, x]).filter(([k]) => k);
  return Object.entries(d);
}

function lemmas(rel) {
  return Array.from(new Set(readEntries(rel).map(([k]) => lemma(k)).filter(Boolean))).sort();
}

// The card needs the governed preposition itself, not just the fact that COSYtools has a governance entry.
// Normalise the two shapes COSYtools uses: `prepositions: [...]` and Greek `government: [{case, preposition}]`.
function governanceCard(entry) {
  const preps = Array.isArray(entry.prepositions) ? entry.prepositions.filter(Boolean) : [];
  const government = Array.isArray(entry.government) ? entry.government.filter(Boolean) : [];
  const fromGovernment = government.map((g) => g.preposition).filter(Boolean);
  const allPreps = (preps.length ? preps : fromGovernment).map((p) => String(p).trim());
  const preposition = allPreps.length ? allPreps[0] : 'none';
  const caseValue = entry.case || (government[0] && government[0].case) || null;
  return {
    prepositions: allPreps.length ? allPreps : ['none'],
    preposition,
    case: caseValue,
    pattern: entry.pattern || '',
    grammar_rule: entry.grammar_rule || '',
    examples: (Array.isArray(entry.examples) ? entry.examples.slice(0, 2) : [])
      .map((e) => (typeof e === 'string' ? e : (e && (e.sentence || e.example)) || ''))
      .filter(Boolean),
    common_mistake: entry.common_mistake || '',
    level: entry.level || null
  };
}

let commit = null;
try { commit = execSync('git rev-parse --short HEAD', { cwd: toolsRoot }).toString().trim(); } catch (e) { /* not a git checkout */ }

const out = { source: 'COSYtools', commit, conjugation: {}, governance: {}, governanceData: {} };
for (const [l, rel] of Object.entries(CONJUGATION)) out.conjugation[l] = lemmas(rel);
for (const [l, rel] of Object.entries(GOVERNANCE)) {
  const entries = readEntries(rel);
  out.governance[l] = Array.from(new Set(entries.map(([k]) => lemma(k)).filter(Boolean))).sort();
  out.governanceData[l] = {};
  for (const [k, entry] of entries) {
    if (!k || !entry || typeof entry !== 'object') continue;
    out.governanceData[l][lemma(k)] = governanceCard(entry);
  }
}
fs.writeFileSync(path.join(root, 'shared', 'cosytools-verbs.json'), JSON.stringify(out, null, 2) + '\n');
console.log('shared/cosytools-verbs.json written from COSYtools' + (commit ? '@' + commit : ''));
for (const [l, v] of Object.entries(out.conjugation)) console.log(`  ${l}: ${v.length} conjugable, ${(out.governance[l] || []).length} with governance`);
