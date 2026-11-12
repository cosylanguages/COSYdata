#!/usr/bin/env node
/**
 * Builds the dictionary-backed daily calendars for the COSY daily strip.
 *
 *   daily/<lang>/calendar/<slot>/YYYY-MM.json      slots: idiom, word   (see scripts/lib/daily-calendar.cjs)
 *
 * One entry per CEFR level per day. Each day carries a small card payload (word, definition, example, ...)
 * so clients make one tiny request instead of loading a vocabulary file.
 *
 * Rules
 *  - Deterministic: the pick depends only on slot, lang, level, date and what was already used.
 *  - No repeats within min(90, pool/2) days at the same level.
 *  - Existing month files are not re-picked (published days stay stable). Their cards are refreshed from the
 *    dictionary on every run; a retired ID is re-pointed via shared/id-aliases.json. A pick that is no longer
 *    eligible (entry removed, newly excluded, failing the quality rules) is replaced.
 *  - Hand edits:       daily/<lang>/calendar/overrides.json  {"<slot>": {"2026-12-25": {"B1": "<entry id>"}}}
 *  - Editorial filter: daily/<lang>/calendar/exclude.json    {"<slot>": {"<entry id>": "<word>"}}
 *  - Only slots/languages listed in daily/calendar-config.json are built:
 *      {"word": {"languages": ["en"], "minPool": 90}}
 *    A level whose eligible pool is smaller than minPool is skipped (it would repeat too often); clients fall
 *    back to the nearest published level. Add a language after reviewing its pools.
 *
 * Usage: node scripts/build-daily-calendar.cjs [--from YYYY-MM-DD] [--months N] [--lang xx] [--slot idiom|word]
 *        Defaults: first day of the current month, 14 months, every configured slot and language.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { root, SLOTS, readJson, buildPools } = require('./lib/daily-calendar.cjs');

function arg(name, dflt) {
  const i = process.argv.indexOf('--' + name);
  return i > -1 ? process.argv[i + 1] : dflt;
}
function pad(n) { return String(n).padStart(2, '0'); }
function fnv1a(s) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h >>> 0;
}
function writeJson(p, data) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
}
function monthsFrom(startStr, n) {
  const [y, m] = startStr.split('-').map(Number);
  return Array.from({ length: n }, (_, i) => `${y + Math.floor((m - 1 + i) / 12)}-${pad(((m - 1 + i) % 12) + 1)}`);
}
function daysOf(month) {
  const [y, m] = month.split('-').map(Number);
  const n = new Date(Date.UTC(y, m, 0)).getUTCDate();
  return Array.from({ length: n }, (_, i) => `${month}-${pad(i + 1)}`);
}

const aliases = readJson(path.join(root, 'shared', 'id-aliases.json'), {});

function buildLang(slotName, lang, months, minPool) {
  const spec = SLOTS[slotName];
  const { pools, byId, levels, skipped } = buildPools(slotName, lang, minPool);
  if (!levels.length) return { lang, skipped, none: true };
  const inPool = {};
  levels.forEach((l) => (inPool[l] = new Set(pools[l].map((e) => e.id))));
  const overrides = (readJson(path.join(root, 'daily', lang, 'calendar', 'overrides.json'), {})[slotName]) || {};
  const history = {};
  levels.forEach((l) => (history[l] = []));
  const stats = { created: 0, repointed: 0, repicked: 0, rewritten: 0 };

  function pick(level, date) {
    const pool = pools[level];
    const window = Math.min(90, Math.floor(pool.length / 2));
    const recent = new Set(history[level].slice(-window).map((h) => h.id));
    const cands = pool.filter((e) => !recent.has(e.id));
    const list = cands.length ? cands : pool;
    return list[fnv1a(`${lang}|${slotName}|${level}|${date}`) % list.length];
  }

  for (const month of months) {
    const file = path.join(root, 'daily', lang, 'calendar', slotName, `${month}.json`);
    const existing = readJson(file, null);
    const days = {};
    for (const date of daysOf(month)) {
      const day = {};
      for (const level of levels) {
        let entry = null;
        const old = existing && existing.days && existing.days[date] && existing.days[date][level];
        if (old) {
          const id = !byId[old.id] && aliases[old.id] ? aliases[old.id] : old.id;
          if (inPool[level].has(id)) { entry = byId[id]; if (id !== old.id) stats.repointed++; }
          else stats.repicked++;
        }
        if (overrides[date] && overrides[date][level] && byId[overrides[date][level]]) entry = byId[overrides[date][level]];
        if (!entry) { entry = pick(level, date); if (!old) stats.created++; }
        history[level].push({ date, id: entry.id });
        day[level] = spec.card(entry);
      }
      days[date] = day;
    }
    const next = { lang, slot: slotName, month, days };
    if (!existing || JSON.stringify(existing) !== JSON.stringify(next)) {
      if (existing) stats.rewritten++;
      writeJson(file, next);
    }
  }
  return { lang, levels, skipped, ...stats };
}

function main() {
  const now = new Date();
  const from = arg('from', `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}-01`);
  const months = monthsFrom(from.slice(0, 7), parseInt(arg('months', '14'), 10));
  const onlyLang = arg('lang', null);
  const onlySlot = arg('slot', null);
  const config = readJson(path.join(root, 'daily', 'calendar-config.json'), {});
  for (const slotName of Object.keys(config)) {
    if (!SLOTS[slotName] || (onlySlot && onlySlot !== slotName)) continue;
    const minPool = config[slotName].minPool || 1;
    for (const lang of (config[slotName].languages || []).filter((l) => !onlyLang || l === onlyLang)) {
      const r = buildLang(slotName, lang, months, minPool);
      const skip = r.skipped.length ? `; skipped (pool < ${minPool}): ${r.skipped.join(' ')}` : '';
      if (r.none) { console.log(`daily calendar [${slotName}/${lang}]: no level has a large enough pool${skip}`); continue; }
      console.log(`daily calendar [${slotName}/${lang}] levels ${r.levels.join(',')}: ${r.created} picked, ${r.repointed} re-pointed, ${r.repicked} replaced, ${r.rewritten} month file(s) rewritten${skip}`);
    }
  }
}

main();
