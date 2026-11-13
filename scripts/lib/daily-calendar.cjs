'use strict';
/**
 * Shared definition of the daily calendar slots (used by build-daily-calendar.cjs and validate.cjs),
 * so the generator and the validator can never disagree about what a card is or who is eligible.
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');

function readJson(p, dflt) { return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : dflt; }

const norm = (s) => String(s || '').toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
const first = (arr) => (Array.isArray(arr) && arr.length ? String(arr[0] || '').trim() : '');

function vocabFiles(lang) {
  const base = path.join(root, 'vocabulary', lang);
  if (!fs.existsSync(base)) return [];
  const out = [];
  for (const dir of fs.readdirSync(base, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue;
    for (const f of fs.readdirSync(path.join(base, dir.name))) {
      if (f.endsWith('.json') && !/index|search/.test(f)) out.push({ dir: dir.name, file: path.join(base, dir.name, f), name: f });
    }
  }
  return out.sort((a, b) => (a.file < b.file ? -1 : 1));
}

function entriesOf(file) {
  try {
    const d = JSON.parse(fs.readFileSync(file, 'utf8'));
    return Array.isArray(d) ? d.filter((e) => e && typeof e === 'object' && e.id) : [];
  } catch (e) { return []; }
}

function cleanTranscription(e) {
  const t = String(e.transcription || '').trim();
  if (!/^\/.+\/$/.test(t) || /^\/\.+\/$/.test(t)) return null;
  if (norm(t) === norm(e.word)) return null; // spelling repeated between slashes, not IPA
  return t;
}

const WORD_POS = ['noun', 'adjective', 'adverb'];

// Template stubs ("Terme désignant X." / "Nous utilisons X tous les jours.") are identical across many words once
// the headword is masked. Flags (meta.template) any definition or example shared by 3+ headwords.
function markTemplates(items) {
  const mask = (text, w) => String(text || '').toLowerCase().split(String(w || '').toLowerCase()).join('\u00a7');
  const count = {};
  const keys = items.map(({ entry: e }) => [mask(first(e.definitions), e.word), mask(first(e.examples), e.word)]);
  keys.forEach(([d, x]) => { count['d' + d] = (count['d' + d] || 0) + 1; count['x' + x] = (count['x' + x] || 0) + 1; });
  items.forEach((item, i) => {
    const [d, x] = keys[i];
    item.meta.template = (d.includes('\u00a7') && count['d' + d] >= 3) || (x.includes('\u00a7') && count['x' + x] >= 3);
  });
}

// Advanced English entries often open with a register/part-of-speech label, e.g. "Formal / Literary noun: <definition>".
// Learners should see the definition itself.
const TAG = '(?:Formal|Informal|Literary|Technical|Academic|Legal|Medical|Slang)';
const LABEL = new RegExp('^' + TAG + '(?:\\s*/\\s*[^:]{2,60})?(?:\\s+(?:noun|verb|adjective|adverb))?\\s*:\\s*', 'i');
// A label that names a phrase or a foreign-language element marks a fragment of a longer expression
// (fait ACCOMPLI, "ad" in ad infinitum), not a word worth featuring.
const FRAGMENT = new RegExp('^' + TAG + '\\s*/\\s*[^:]{0,60}\\b(?:phrase|expression|Latin|French|Italian|German|Greek)\\b[^:]{0,40}:', 'i');
function wordDefinition(e) {
  const raw = first(e.definitions);
  const d = raw.replace(LABEL, '');
  return d === raw ? raw : d.charAt(0).toUpperCase() + d.slice(1);
}
const LEVELS_ALL = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const SLOTS = {
  idiom: {
    levels: ['A2', 'B1', 'B2', 'C1', 'C2'],
    // idioms live in one file per level; the directory decides the level
    collect(lang) {
      const out = [];
      const dirLevel = { a2: 'A2', b1: 'B1', b2: 'B2', c1: 'C1', c2: 'C2' };
      for (const f of vocabFiles(lang)) {
        if (f.name !== 'idioms.json' || !dirLevel[f.dir]) continue;
        for (const e of entriesOf(f.file)) out.push({ entry: e, level: dirLevel[f.dir], meta: {} });
      }
      return out;
    },
    eligible(e) {
      return Boolean(first(e.definitions) && first(e.examples));
    },
    card(e) {
      const c = { id: e.id, word: e.word, definition: first(e.definitions), example: first(e.examples) };
      if (e.literal_meaning) c.literal_meaning = e.literal_meaning;
      if (e.emoji) c.emoji = e.emoji;
      if (e.audio) c.audio = e.audio;
      return c;
    }
  },

  // Word of the day: one lexeme (noun, adjective or adverb). Verbs are reserved for the verb-of-the-day slot.
  word: {
    levels: LEVELS_ALL,
    collect(lang) {
      const out = [];
      for (const f of vocabFiles(lang)) {
        if (f.name === 'idioms.json' || f.name === 'phrasal_verbs.json') continue;
        for (const e of entriesOf(f.file)) {
          const level = String(e.level || '').toUpperCase();
          if (WORD_POS.includes(e.form) && LEVELS_ALL.includes(level)) out.push({ entry: e, level, meta: {} });
        }
      }
      markTemplates(out);
      return out;
    },
    // Automatic quality rules; editorial exclusions live in daily/<lang>/calendar/exclude.json
    eligible(e, level, meta) {
      if (meta && meta.template) return false;                    // template-generated stub
      const w = String(e.word || '').trim();
      const d = wordDefinition(e);
      const x = first(e.examples);
      if (!w || /\s/.test(w)) return false;                       // single lexeme only
      if (d.length < 12) return false;                            // empty / one-word definitions
      if (FRAGMENT.test(first(e.definitions))) return false;      // fragment of a longer phrase
      if (/\bas in\b/i.test(d)) return false;                    // fragment of a longer phrase ("as in caveat emptor")
      if (norm(d) === norm(w) || norm(d) === norm(x)) return false; // circular, or the example pasted in
      if (x.length < 15) return false;
      const wl = w.toLowerCase();
      const stem = wl.length < 4 ? wl : wl.slice(0, Math.max(4, wl.length - 2));
      if (!x.toLowerCase().includes(stem)) return false;          // example must actually use the word
      if (new RegExp('["«“„]\\s*' + wl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(x.toLowerCase())) return false; // meta example
      if (['A0', 'A1', 'A2'].includes(level) && !e.emoji) return false; // beginners need the visual anchor
      return true;
    },
    card(e) {
      const c = { id: e.id, word: e.word, pos: e.form, definition: wordDefinition(e), example: first(e.examples) };
      const ipa = cleanTranscription(e);
      if (ipa) c.transcription = ipa;
      if (e.article) c.article = e.article;
      if (e.gender) c.gender = e.gender;
      if (e.emoji) c.emoji = e.emoji;
      if (e.audio) c.audio = e.audio;
      return c;
    }
  }
};

// ---- phrasal-verb slot -------------------------------------------------------------------------------------
const PARTICLES = new Set(['up', 'down', 'out', 'off', 'on', 'in', 'into', 'over', 'away', 'back', 'through', 'across', 'along',
  'around', 'apart', 'together', 'after', 'by', 'for', 'with', 'from', 'about', 'at', 'to', 'of', 'ahead', 'forward', 'behind',
  'without', 'upon', 'against', 'onto', 'round', 'aside', 'beyond', 'under', 'towards', 'toward', 'past']);
// phrasal_verbs.json also holds modals, polite formulas and bare particles; a leading modal/pronoun/"be" is never a phrasal verb
const NOT_A_VERB_START = new Set(['can', 'could', 'may', 'might', 'must', 'shall', 'should', "shouldn't", "mustn't", "don't", 'would',
  'will', 'i', "i'd", 'you', 'we', 'he', 'she', 'it', "it's", 'be']);
const stripTo = (w) => String(w || '').trim().replace(/^to\s+/i, '');

SLOTS['phrasal-verb'] = {
  levels: LEVELS_ALL,
  collect(lang) {
    const out = [];
    for (const f of vocabFiles(lang)) {
      if (f.name !== 'phrasal_verbs.json') continue;
      for (const e of entriesOf(f.file)) {
        const level = String(e.level || '').toUpperCase();
        if (LEVELS_ALL.includes(level)) out.push({ entry: e, level, meta: {} });
      }
    }
    markTemplates(out);
    return out;
  },
  eligible(e, level, meta) {
    if (meta && meta.template) return false;
    const toks = stripTo(e.word).toLowerCase().split(/\s+/);
    if (toks.length < 2 || toks.length > 4) return false;           // verb + particle(s), no bare particles
    if (NOT_A_VERB_START.has(toks[0])) return false;
    const idx = toks.findIndex((t, i) => i > 0 && PARTICLES.has(t));
    if (idx < 0 || !PARTICLES.has(toks[toks.length - 1])) return false; // must be verb ... particle
    const d = first(e.definitions);
    const x = first(e.examples);
    if (d.length < 12 || norm(d) === norm(e.word) || norm(d) === norm(x)) return false;
    if (x.length < 15) return false;
    if (!new RegExp('\\b' + toks[idx] + '\\b', 'i').test(x)) return false; // the example must use the particle
    if (['A0', 'A1', 'A2'].includes(level) && !e.emoji) return false;
    return true;
  },
  card(e) {
    const word = stripTo(e.word);
    const c = { id: e.id, word, definition: first(e.definitions), example: first(e.examples) };
    // "to stand out" has an IPA that may include the infinitive marker; only keep IPA that matches the cleaned headword
    const ipa = word === String(e.word).trim() ? cleanTranscription(e) : null;
    if (ipa) c.transcription = ipa;
    if (e.emoji) c.emoji = e.emoji;
    const syn = (Array.isArray(e.synonyms) ? e.synonyms : []).filter((x) => typeof x === 'string' && x.trim()).slice(0, 2);
    if (syn.length) c.synonyms = syn;
    const tool = (Array.isArray(e.related_forms) ? e.related_forms : []).find((r) => typeof r === 'string' && r.startsWith('COSYtools:'));
    if (tool) c.tool = tool.slice('COSYtools:'.length);
    return c;
  }
};

function loadExclude(lang, slot) {
  return (readJson(path.join(root, 'daily', lang, 'calendar', 'exclude.json'), {})[slot]) || {};
}

/** Eligible entries per level for a slot/language, plus every entry by id. Pools smaller than minPool are dropped. */
function buildPools(slotName, lang, minPool) {
  const spec = SLOTS[slotName];
  const excluded = loadExclude(lang, slotName);
  const byId = {};
  const pools = {};
  const seen = {};
  for (const { entry, level, meta } of spec.collect(lang)) {
    byId[entry.id] = entry;
    if (excluded[entry.id] || !spec.eligible(entry, level, meta)) continue;
    const key = String(entry.word).toLowerCase();
    seen[level] = seen[level] || new Set();
    if (seen[level].has(key)) continue;
    seen[level].add(key);
    (pools[level] = pools[level] || []).push(entry);
  }
  const skipped = [];
  for (const level of Object.keys(pools)) {
    if (pools[level].length < (minPool || 1)) { skipped.push(`${level}(${pools[level].length})`); delete pools[level]; continue; }
    pools[level].sort((a, b) => (a.id < b.id ? -1 : 1));
  }
  const levels = spec.levels.filter((l) => pools[l]);
  return { pools, byId, levels, skipped };
}

module.exports = { root, SLOTS, loadExclude, readJson, buildPools };
