#!/usr/bin/env node
/**
 * Builds the dictionary-backed daily calendars for the COSY daily ecosystem.
 *
 *   daily/<lang>/calendar/<slot>/YYYY-MM.json
 *
 * Supported slots:
 *  - word: Word of the Day (creative explanation & synonym expansion for B1+)
 *  - phrasal_verb: Phrasal Verb of the Day
 *  - collocation: Collocation of the Day
 *  - idiom: Idiom of the Day
 *
 * CEFR Bands:
 *  - A0-A1 (dirs: a0, a0_a1, a1)
 *  - A2 (dirs: a2)
 *  - B1-B2 (dirs: b1, b2)
 *  - C1-C2 (dirs: c1, c2)
 *
 * Each card carries a lightweight, ready-to-show payload with creative prompts
 * and cross-ecosystem deep links to COSYlanguages, COSYpractice, and COSYtools.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

// Definition of CEFR bands mapped to directory names
const CEFR_BANDS = {
  'A0-A1': ['a0', 'a0_a1', 'a1'],
  'A2': ['a2'],
  'B1-B2': ['b1', 'b2'],
  'C1-C2': ['c1', 'c2']
};

// Legacy idiom-only level directories for backward compatibility if needed
const LEGACY_IDIOM_LEVELS = { a2: 'A2', b1: 'B1', b2: 'B2', c1: 'C1', c2: 'C2' };

const ALL_SLOTS = ['idiom', 'word', 'phrasal_verb', 'collocation'];

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

/**
 * Filter and load vocabulary pools for a given slot & language.
 */
function loadPools(lang, slot, excluded) {
  const pools = {}; // level/band -> [entry]
  const byId = {};

  if (slot === 'idiom') {
    // Preserve exact existing idiom levels (A2, B1, B2, C1, C2) for compatibility
    for (const [dir, level] of Object.entries(LEGACY_IDIOM_LEVELS)) {
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
  } else {
    // Banded slots: word, phrasal_verb, collocation
    for (const [band, dirs] of Object.entries(CEFR_BANDS)) {
      const seen = new Set();
      for (const dir of dirs) {
        const dirPath = path.join(root, 'vocabulary', lang, dir);
        if (!fs.existsSync(dirPath)) continue;

        let targetFiles = [];
        if (slot === 'phrasal_verb') {
          const pvFile = path.join(dirPath, 'phrasal_verbs.json');
          if (fs.existsSync(pvFile)) targetFiles.push(pvFile);
        } else if (slot === 'collocation') {
          const colFile = path.join(dirPath, 'collocations.json');
          if (fs.existsSync(colFile)) targetFiles.push(colFile);
        } else if (slot === 'word') {
          // All files except idioms, phrasal_verbs, collocations
          const files = fs.readdirSync(dirPath).filter((f) =>
            f.endsWith('.json') &&
            !['idioms.json', 'phrasal_verbs.json', 'collocations.json', 'index.json', 'flat-index.json', 'search-index.json', 'themes-index.json'].includes(f)
          );
          targetFiles = files.map((f) => path.join(dirPath, f));
        }

        for (const file of targetFiles) {
          for (const e of readJson(file, [])) {
            byId[e.id] = e;
            const ok = e.definitions && String(e.definitions[0] || '').trim() && e.examples && String(e.examples[0] || '').trim();
            const key = String(e.word).toLowerCase();
            if (!ok || seen.has(key) || excluded[e.id]) continue;

            // Form matching
            if (slot === 'phrasal_verb' && e.form !== 'phrasal_verb' && !file.endsWith('phrasal_verbs.json')) continue;
            if (slot === 'collocation' && e.form !== 'collocation' && !file.endsWith('collocations.json')) continue;
            if (slot === 'word') {
              if (['idiom', 'phrase', 'phrasal_verb', 'collocation'].includes(e.form)) continue;
            }

            seen.add(key);
            (pools[band] = pools[band] || []).push(e);
          }
        }
      }
    }
  }

  for (const l of Object.keys(pools)) pools[l].sort((a, b) => (a.id < b.id ? -1 : 1));
  return { pools, byId };
}

/**
 * Generate lightweight card payload with creative prompts and cross-repo links.
 */
function makeCard(e, slot, levelOrBand, lang, date) {
  const c = { id: e.id, word: e.word, definition: e.definitions[0], example: e.examples[0] };
  if (e.literal_meaning) c.literal_meaning = e.literal_meaning;
  if (e.emoji) c.emoji = e.emoji;
  if (e.audio) c.audio = e.audio;

  // Add rich pedagogic enhancements for new slots
  if (slot === 'word') {
    c.cefr = e.level || levelOrBand;
    if (e.theme) c.theme = e.theme;
    if (e.synonyms && e.synonyms.length > 0) {
      c.synonyms = e.synonyms.slice(0, 5);
    }
    const isHigherLevel = ['B1-B2', 'C1-C2', 'B1', 'B2', 'C1', 'C2'].includes(levelOrBand);
    c.creative_prompt = {
      type: 'explain_in_own_words',
      instruction: `Explain '${e.word}' in your own words without using the word itself.`
    };
    if (isHigherLevel) {
      c.creative_prompt.synonym_challenge = 'How many synonyms or alternative expressions can you generate?';
    }
  } else if (slot === 'phrasal_verb') {
    c.cefr = e.level || levelOrBand;
    if (e.theme) c.theme = e.theme;
    c.creative_prompt = {
      type: 'particle_usage',
      instruction: `Create two sentences using '${e.word}': one showing its main meaning and one testing pronoun placement.`
    };
  } else if (slot === 'collocation') {
    c.cefr = e.level || levelOrBand;
    if (e.theme) c.theme = e.theme;
    c.creative_prompt = {
      type: 'natural_pairing',
      instruction: `Why is '${e.word}' a natural word pairing? Write a realistic sentence using it.`
    };
  }

  // Cross-ecosystem links
  if (slot !== 'idiom') {
    c.ecosystem_links = {
      cosylanguages: `https://cosylanguages.github.io/COSYlanguages/?slot=${slot}&id=${encodeURIComponent(e.id)}`,
      cosypractice: `https://cosylanguages.github.io/COSYpractice/?slot=${slot}&id=${encodeURIComponent(e.id)}`,
      cosytools: `https://cosylanguages.github.io/COSYtools/?word=${encodeURIComponent(e.word)}`
    };
  }

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

function buildLangSlot(lang, slot, months) {
  const excluded = (readJson(path.join(root, 'daily', lang, 'calendar', 'exclude.json'), {})[slot]) || {};
  const { pools, byId } = loadPools(lang, slot, excluded);
  const levels = Object.keys(pools);
  if (!levels.length) return { lang, slot, skipped: true };
  const overrides = (readJson(path.join(root, 'daily', lang, 'calendar', 'overrides.json'), {})[slot]) || {};
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
    return list[fnv1a(`${lang}|${slot}|${level}|${date}`) % list.length];
  }

  for (const month of months) {
    const file = path.join(root, 'daily', lang, 'calendar', slot, `${month}.json`);
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
        day[level] = makeCard(entry, slot, level, lang, date);
      }
      days[date] = day;
    }
    const next = { lang, slot, month, days };
    if (!existing || JSON.stringify(existing) !== JSON.stringify(next)) {
      if (existing) stats.refreshed++;
      writeJson(file, next);
    }
  }
  return { lang, slot, levels, ...stats };
}

function main() {
  const now = new Date();
  const from = arg('from', `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}-01`);
  const months = monthsFrom(from.slice(0, 7), parseInt(arg('months', '14'), 10));
  const onlyLang = arg('lang', null);
  const onlySlot = arg('slot', null);
  const config = readJson(path.join(root, 'daily', 'calendar-config.json'), {});

  const slotsToBuild = onlySlot ? [onlySlot] : ALL_SLOTS;

  for (const slot of slotsToBuild) {
    const langs = ((config[slot] && config[slot].languages) || []).filter((l) => !onlyLang || l === onlyLang);
    for (const lang of langs) {
      const r = buildLangSlot(lang, slot, months);
      if (r.skipped) continue;
      console.log(`daily calendar [${lang}:${slot}] levels ${r.levels.join(',')}: ${r.created} picked, ${r.replaced} re-pointed, ${r.refreshed} month file(s) rewritten`);
    }
  }
}

main();
