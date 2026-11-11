#!/usr/bin/env node
/**
 * Builds the dictionary-backed daily calendar for the COSY daily strip.
 *
 *   daily/<lang>/calendar/idiom/YYYY-MM.json
 *
 * One idiom per CEFR level per day, picked from vocabulary/<lang>/<level>/idioms.json.
 * Each day carries a small card payload (word, definition, example, ...) so clients make one
 * tiny request instead of loading a vocabulary file.
 *
 * Rules
 *  - Deterministic: the pick depends only on lang, level, date and what was already used.
 *  - No repeats within min(90, pool/2) days at the same level.
 *  - Existing month files are never re-picked (published days stay stable). Their card payloads are
 *    refreshed from the dictionary on every run; a retired ID is replaced via shared/id-aliases.json.
 *  - Hand edits: daily/<lang>/calendar/overrides.json  {"idiom": {"2026-12-25": {"B1": "<entry id>"}}}
 *  - Editorial filter: daily/<lang>/calendar/exclude.json  {"idiom": {"<entry id>": "<word>"}}
 *    idioms.json also holds plain collocations and phrasal verbs; excluded entries are never featured.
 *  - Only languages listed in daily/calendar-config.json are built, i.e. languages whose idiom pool
 *    has been reviewed. Add a language there after reviewing it and writing its exclude.json.
 *
 * Usage: node scripts/build-daily-calendar.cjs [--from YYYY-MM-DD] [--months N] [--lang xx]
 *        Defaults: first day of the current month, 14 months, every language in daily/calendar-config.json.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const LEVEL_DIRS = { a2: 'A2', b1: 'B1', b2: 'B2', c1: 'C1', c2: 'C2' };
const SLOT = 'idiom';

function arg(name, dflt) {
  const i = process.argv.indexOf('--' + name);
  return i > -1 ? process.argv[i + 1] : dflt;
}
function pad(n) { return String(n).padStart(2, '0'); }
function ymd(d) { return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`; }
function fnv1a(s) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h >>> 0;
}
function readJson(p, dflt) { return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : dflt; }
function writeJson(p, data) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
}

const aliases = readJson(path.join(root, 'shared', 'id-aliases.json'), {});

function loadPools(lang, excluded) {
  const pools = {}; // level -> [entry]
  const byId = {};
  for (const [dir, level] of Object.entries(LEVEL_DIRS)) {
    const file = path.join(root, 'vocabulary', lang, dir, 'idioms.json');
    if (!fs.existsSync(file)) continue;
    const seen = new Set();
    for (const e of readJson(file, [])) {
      byId[e.id] = e;
      const ok = e.definitions && String(e.definitions[0] || '').trim() && e.examples && String(e.examples[0] || '').trim();
      const key = String(e.word).toLowerCase();
      if (!ok || seen.has(key) || excluded[e.id]) continue;
      seen.add(key);
      (pools[level] = pools[level] || []).push(e);
    }
  }
  for (const l of Object.keys(pools)) pools[l].sort((a, b) => (a.id < b.id ? -1 : 1));
  return { pools, byId };
}

function card(e, level) {
  const c = { id: e.id, word: e.word, definition: e.definitions[0], example: e.examples[0] };
  if (e.literal_meaning) c.literal_meaning = e.literal_meaning;
  if (e.emoji) c.emoji = e.emoji;
  if (e.audio) c.audio = e.audio;
  return c;
}

function monthsFrom(startStr, n) {
  const [y, m] = startStr.split('-').map(Number);
  const out = [];
  for (let i = 0; i < n; i++) out.push(`${y + Math.floor((m - 1 + i) / 12)}-${pad(((m - 1 + i) % 12) + 1)}`);
  return out;
}
function daysOf(month) {
  const [y, m] = month.split('-').map(Number);
  const n = new Date(Date.UTC(y, m, 0)).getUTCDate();
  return Array.from({ length: n }, (_, i) => `${month}-${pad(i + 1)}`);
}

function buildLang(lang, months) {
  const excluded = (readJson(path.join(root, 'daily', lang, 'calendar', 'exclude.json'), {})[SLOT]) || {};
  const { pools, byId } = loadPools(lang, excluded);
  const levels = Object.keys(pools);
  if (!levels.length) return { lang, skipped: true };
  const overrides = (readJson(path.join(root, 'daily', lang, 'calendar', 'overrides.json'), {})[SLOT]) || {};
  const history = {}; // level -> [{date,id}] in date order
  levels.forEach((l) => (history[l] = []));
  const stats = { created: 0, refreshed: 0, replaced: 0 };

  function pick(level, date) {
    if (overrides[date] && overrides[date][level] && byId[overrides[date][level]]) return byId[overrides[date][level]];
    const pool = pools[level];
    const window = Math.min(90, Math.floor(pool.length / 2));
    const recent = new Set(history[level].slice(-window).map((h) => h.id));
    const cands = pool.filter((e) => !recent.has(e.id));
    const list = cands.length ? cands : pool;
    return list[fnv1a(`${lang}|${SLOT}|${level}|${date}`) % list.length];
  }

  for (const month of months) {
    const file = path.join(root, 'daily', lang, 'calendar', SLOT, `${month}.json`);
    const existing = readJson(file, null);
    const days = {};
    for (const date of daysOf(month)) {
      const day = {};
      for (const level of levels) {
        let entry = null;
        const old = existing && existing.days && existing.days[date] && existing.days[date][level];
        if (old) {
          let id = old.id;
          if (!byId[id] && aliases[id]) id = aliases[id];
          entry = byId[id] || null;
          if (entry && entry.id !== old.id) stats.replaced++;
        }
        if (overrides[date] && overrides[date][level] && byId[overrides[date][level]]) entry = byId[overrides[date][level]];
        if (!entry) { entry = pick(level, date); stats.created++; }
        history[level].push({ date, id: entry.id });
        day[level] = card(entry, level);
      }
      days[date] = day;
    }
    const next = { lang, slot: SLOT, month, days };
    if (!existing || JSON.stringify(existing) !== JSON.stringify(next)) {
      if (existing) stats.refreshed++;
      writeJson(file, next);
    }
  }
  return { lang, levels, ...stats };
}

function main() {
  const now = new Date();
  const from = arg('from', `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}-01`);
  const months = monthsFrom(from.slice(0, 7), parseInt(arg('months', '14'), 10));
  const only = arg('lang', null);
  const config = readJson(path.join(root, 'daily', 'calendar-config.json'), {});
  const langs = ((config[SLOT] && config[SLOT].languages) || []).filter((l) => !only || l === only);
  for (const lang of langs) {
    const r = buildLang(lang, months);
    if (r.skipped) continue;
    console.log(`daily calendar [${lang}] levels ${r.levels.join(',')}: ${r.created} picked, ${r.replaced} re-pointed, ${r.refreshed} month file(s) rewritten`);
  }
}

main();
