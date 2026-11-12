#!/usr/bin/env node
/*
 * Builds comparative/concepts/calendar.json: one concept per weekday, month and season,
 * with the matching dictionary entry from each of the 14 languages.
 *
 * Alignment source: seasons.months.days.json (same 23 items, same order, per language).
 * Entry data (word, IPA, gender, article) is read from vocabulary/<lang>/a0_a1/calendar.json,
 * so this file never duplicates editorial content: vocabulary stays the single source.
 *
 * Usage:  node scripts/build-comparative.cjs          write comparative/concepts/calendar.json
 *         node scripts/build-comparative.cjs --check  fail if the file is stale or any check fails
 * Does not touch vocabulary/ or its schema.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'comparative', 'concepts', 'calendar.json');
const LANGS = ['en', 'fr', 'it', 'ru', 'el', 'es', 'de', 'pt', 'hy', 'ka', 'tt', 'ba', 'br', 'cv'];
const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august',
  'september', 'october', 'november', 'december'];
const SEASONS = ['spring', 'summer', 'autumn', 'winter'];
const EMOJI = { weekday: '📅', month: '🗓️', season: '🍂' };
const SEASON_EMOJI = { spring: '🌱', summer: '☀️', autumn: '🍂', winter: '❄️' };

const readJson = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));
const errors = [];
const fail = (m) => errors.push(m);

function buildConcepts() {
  const align = readJson('seasons.months.days.json').languages;
  const concepts = [];
  const spec = [
    ...DAYS.map((s, i) => ({ kind: 'weekday', slug: s, cat: 'days_of_week', level: 'A0', idx: i })),
    ...MONTHS.map((s, i) => ({ kind: 'month', slug: s, cat: 'months', level: 'A1', idx: i })),
    ...SEASONS.map((s, i) => ({ kind: 'season', slug: s, cat: 'seasons', level: 'A1', idx: i })),
  ];
  const entries = {};
  for (const l of LANGS) {
    const list = readJson(`vocabulary/${l}/a0_a1/calendar.json`);
    entries[l] = Object.fromEntries(list.map((e) => [e.id, e]));
    if (!align[l]) fail(`${l}: missing from seasons.months.days.json`);
  }
  for (const s of spec) {
    const forms = {};
    for (const l of LANGS) {
      const ref = align[l] && align[l].levels[s.level] && align[l].levels[s.level][s.cat];
      const item = ref && ref[s.idx];
      if (!item) { fail(`${l}: no ${s.cat}[${s.idx}] for ${s.kind}.${s.slug}`); continue; }
      const e = entries[l][item.repository_entry_id];
      if (!e) { fail(`${l}: entry ${item.repository_entry_id} not found in vocabulary`); continue; }
      if (e.word !== item.word) fail(`${l}: ${item.repository_entry_id} word differs between sources ("${e.word}" vs "${item.word}")`);
      const f = { entry_id: e.id, word: e.word };
      if (e.transcription) f.ipa = e.transcription;
      if (e.gender) f.gender = e.gender;
      if (e.article) f.article = e.article;
      forms[l] = f;
    }
    concepts.push({
      concept_id: `${s.kind}.${s.slug}`,
      kind: s.kind,
      order: s.idx + 1,
      cefr: s.level,
      emoji: s.kind === 'season' ? SEASON_EMOJI[s.slug] : EMOJI[s.kind],
      forms,
    });
  }
  return { schemaVersion: 1, set: 'calendar', generated_from: ['seasons.months.days.json', 'vocabulary/<lang>/a0_a1/calendar.json'], languages: LANGS, concepts };
}

function checkLinguistics(concepts) {
  const doc = readJson('comparative/linguistics/calendar-cognates.json');
  const ids = new Set(concepts.concepts.map((c) => c.concept_id));
  const seen = new Set();
  for (const g of doc.groups) {
    if (!ids.has(g.concept)) fail(`group ${g.id}: unknown concept ${g.concept}`);
    if (typeof g.reviewed !== 'boolean') fail(`group ${g.id}: reviewed must be boolean`);
    if (g.members.length < 2) fail(`group ${g.id}: needs at least 2 members`);
    for (const m of g.members) {
      if (!LANGS.includes(m.lang)) fail(`group ${g.id}: unknown language ${m.lang}`);
      if (!['inherited', 'calque', 'loan', 'parallel', 'source'].includes(m.relation)) fail(`group ${g.id}: bad relation ${m.relation}`);
      const k = `${g.concept}/${m.lang}/${g.id.split('.').pop()}`;
      if (seen.has(k)) fail(`group ${g.id}: duplicate member ${m.lang}`);
      seen.add(k);
    }
  }
  for (const key of Object.keys(doc.etymologies)) {
    const [c, l] = key.split('/');
    if (!ids.has(c) || !LANGS.includes(l)) fail(`etymology ${key}: unknown concept or language`);
    const e = doc.etymologies[key];
    if (!e.literal || !e.origin || typeof e.reviewed !== 'boolean') fail(`etymology ${key}: needs literal, origin, reviewed`);
  }
  for (const i of doc.insights) {
    for (const c of i.concepts) if (!ids.has(c)) fail(`insight ${i.id}: unknown concept ${c}`);
    if (typeof i.reviewed !== 'boolean') fail(`insight ${i.id}: reviewed must be boolean`);
  }
  const langDoc = readJson('comparative/languages.json').languages.map((l) => l.code);
  if (JSON.stringify(langDoc) !== JSON.stringify(LANGS)) fail('comparative/languages.json: language list/order differs from LANGS');
}

function main() {
  const check = process.argv.includes('--check');
  const built = buildConcepts();
  checkLinguistics(built);
  const text = JSON.stringify(built, null, 2) + '\n';
  if (errors.length) {
    console.error(errors.map((e) => `[ERROR] ${e}`).join('\n'));
    process.exit(1);
  }
  if (check) {
    const cur = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
    if (cur !== text) {
      console.error('[ERROR] comparative/concepts/calendar.json is stale. Run: npm run build:comparative');
      process.exit(1);
    }
    console.log(`Comparative checks passed (${built.concepts.length} concepts x ${LANGS.length} languages).`);
    return;
  }
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, text);
  console.log(`Wrote ${path.relative(ROOT, OUT)} (${built.concepts.length} concepts x ${LANGS.length} languages).`);
}
main();
