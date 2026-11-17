#!/usr/bin/env node
/**
 * Import vocabulary entries that exist only in the legacy COSYlanguages repository
 * into COSYdata.
 *
 * COSYdata/reports/LEGACY_CLASSIFICATION.md classifies this content as dictionary-word
 * or phrase/idiom and names COSYdata as the canonical home, but the import was never
 * completed. scripts/migrate-cosylanguages-levels.cjs only merges CEFR level metadata
 * for entries that already exist; it does not add missing entries.
 *
 * Usage:
 *   node scripts/import-cosylanguages-vocab.cjs --source <COSYlanguages/vocabulary>
 *   node scripts/import-cosylanguages-vocab.cjs --source <path> --apply
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');
const targetRoot = path.join(rootDir, 'vocabulary');
const levelOrder = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const sourceLevels = ['A2', 'B1', 'B2', 'C1', 'C2'];

const POS_FORMS = new Set([
  'noun', 'verb', 'adjective', 'adverb', 'phrase', 'idiom', 'number',
  'pronoun', 'preposition', 'conjunction', 'determiner', 'postposition', 'particle'
]);

function parseArgs() {
  const args = process.argv.slice(2);
  const i = args.indexOf('--source');
  if (i < 0 || i === args.length - 1) {
    console.error('Usage: node scripts/import-cosylanguages-vocab.cjs --source <COSYlanguages/vocabulary> [--apply]');
    process.exit(1);
  }
  return { sourceRoot: path.resolve(args[i + 1]), apply: args.includes('--apply') };
}

function normalizeWord(value) {
  return String(value || '').normalize('NFKC').toLowerCase().trim().replace(/\s+/g, ' ');
}

function normalizeForm(value) {
  const form = String(value || '').toLowerCase().trim();
  const mapped = {
    'noun phrase': 'noun',
    'adjective / adverb': 'adjective',
    'adjectival phrase': 'adjective',
    'verbal phrase': 'verb',
    other: 'phrase'
  }[form];
  const resolved = mapped || form;
  return POS_FORMS.has(resolved) ? resolved : 'phrase';
}

function slugify(value) {
  const base = String(value || '')
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[’'`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return base;
}

// Romanise non-Latin scripts so ids stay ASCII, matching existing ids such as
// ru:krovat:noun and el:yperories:noun.
const TRANSLIT = [
  [/[а-яё]/gi, null], // placeholder, handled by table below
];

const CYRILLIC = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z',
  и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
  с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch',
  ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
  ә: 'a', ғ: 'g', қ: 'q', ң: 'n', ө: 'o', ұ: 'u', ү: 'u', һ: 'h', і: 'i',
  ӑ: 'a', ӗ: 'e', ҫ: 's', ӳ: 'u', ĕ: 'e'
};

const GREEK = {
  α: 'a', β: 'v', γ: 'g', δ: 'd', ε: 'e', ζ: 'z', η: 'i', θ: 'th', ι: 'i',
  κ: 'k', λ: 'l', μ: 'm', ν: 'n', ξ: 'x', ο: 'o', π: 'p', ρ: 'r', σ: 's',
  ς: 's', τ: 't', υ: 'y', φ: 'f', χ: 'ch', ψ: 'ps', ω: 'o', ά: 'a', έ: 'e',
  ή: 'i', ί: 'i', ό: 'o', ύ: 'y', ώ: 'o', ϊ: 'i', ϋ: 'y'
};

function romanize(value) {
  const s = String(value || '');
  if (/^[\x00-\x7F]*$/.test(s)) return s;
  let out = '';
  for (const ch of s) {
    const lower = ch.toLowerCase();
    if (CYRILLIC[lower] !== undefined) {
      out += CYRILLIC[lower];
    } else if (GREEK[lower] !== undefined) {
      out += GREEK[lower];
    } else if (/[\x00-\x7F]/.test(ch)) {
      out += ch;
    } else if (/\s/.test(ch)) {
      out += '-';
    }
    // Characters with no mapping are dropped; the caller falls back to a hash.
  }
  return out;
}

function hashCode(value) {
  let h = 0;
  for (let i = 0; i < value.length; i++) {
    h = (h * 31 + value.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(36);
}

function makeId(language, word, form, usedIds) {
  let slug = slugify(romanize(word));
  if (!slug) slug = hashCode(normalizeWord(word));
  let id = `${language}:${slug}:${form}`;
  let n = 2;
  while (usedIds.has(id)) {
    id = `${language}:${slug}-${n}:${form}`;
    n++;
  }
  usedIds.add(id);
  return id;
}

function readTargetIndex() {
  const byKey = new Map();
  const files = [];

  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const name of fs.readdirSync(dir)) {
      const p = path.join(dir, name);
      if (fs.statSync(p).isDirectory()) {
        if (!name.startsWith('_') && !name.startsWith('.')) walk(p);
        continue;
      }
      if (!name.endsWith('.json')) continue;
      if (['index.json', 'flat-index.json', 'search-index.json'].includes(name)) continue;
      let entries;
      try {
        entries = JSON.parse(fs.readFileSync(p, 'utf8'));
      } catch {
        continue;
      }
      if (!Array.isArray(entries)) continue;
      const language = path.relative(targetRoot, p).split(path.sep)[0];
      files.push({ p, entries, language });
      for (const entry of entries) {
        if (!entry || typeof entry !== 'object') continue;
        const key = `${language}|${normalizeWord(entry.word)}|${normalizeForm(entry.form)}`;
        if (!byKey.has(key)) byKey.set(key, []);
        byKey.get(key).push(entry);
      }
    }
  }

  walk(targetRoot);
  const usedIds = new Set();
  for (const f of files) {
    for (const e of f.entries) if (e && e.id) usedIds.add(e.id);
  }
  return { byKey, files, usedIds };
}

function readSourceEntries(sourceRoot) {
  const found = [];

  for (const language of fs.readdirSync(sourceRoot)) {
    if (!/^[a-z]{2}$/.test(language)) continue;
    const languageDir = path.join(sourceRoot, language);
    if (!fs.statSync(languageDir).isDirectory()) continue;

    for (const level of sourceLevels) {
      const levelDir = path.join(languageDir, level);
      if (!fs.existsSync(levelDir)) continue;

      const walk = (dir) => {
        for (const name of fs.readdirSync(dir)) {
          const p = path.join(dir, name);
          if (fs.statSync(p).isDirectory()) {
            walk(p);
            continue;
          }
          if (!name.endsWith('.js')) continue;

          const sandbox = {};
          const module = { exports: {} };
          try {
            vm.runInNewContext(
              fs.readFileSync(p, 'utf8'),
              { window: sandbox, module, exports: module.exports, console: { log() {}, warn() {}, error() {} } },
              { filename: p, timeout: 2000 }
            );
          } catch (err) {
            console.warn(`[SKIP] ${p}: ${err.message}`);
            continue;
          }

          const collected = [];
          // Source files publish onto window.<name>[language] = [...]. Collect from the
          // dictionary windows only. speakingData holds speaking prompts, which
          // LEGACY_CLASSIFICATION.md assigns to COSYgames and COSYevents, not COSYdata.
          const SKIP_WINDOWS = new Set(['speakingData']);
          const harvest = (value) => {
            if (Array.isArray(value)) {
              collected.push(...value);
            } else if (value && typeof value === 'object') {
              for (const inner of Object.values(value)) {
                if (Array.isArray(inner)) collected.push(...inner);
              }
            }
          };
          for (const [name, value] of Object.entries(sandbox)) {
            if (SKIP_WINDOWS.has(name)) continue;
            harvest(value);
          }
          if (Array.isArray(module.exports)) collected.push(...module.exports);

          for (const entry of collected) {
            if (!entry || typeof entry !== 'object') continue;
            const word = normalizeWord(entry.word);
            if (!word) continue;
            const entryLanguage = entry.language || entry.lang || language;
            if (entryLanguage !== language) continue;
            found.push({
              language,
              level,
              word,
              form: normalizeForm(entry.form || entry.pos),
              raw: entry,
              sourceFile: path.relative(sourceRoot, p)
            });
          }
        }
      };

      walk(levelDir);
    }
  }

  return found;
}

function toTargetEntry(item, usedIds, knownThemes) {
  const src = item.raw;
  const out = {
    id: makeId(item.language, src.word, item.form, usedIds),
    word: String(src.word).normalize('NFKC').trim(),
    level: item.level,
    form: item.form,
    language: item.language,
    // Imported legacy entries carry the source definition but none of the
    // enrichment the schema otherwise requires (emoji, antonyms, countability,
    // transcription). The schema waives those requirements for needs_review, which
    // is the repository's existing mechanism for entries awaiting enrichment.
    status: 'needs_review'
  };

  // Only emit taxonomy values the canonical theme list recognises, so the import
  // does not introduce themes or sub-themes outside schemas/themes.json.
  const theme = slugify(src.theme || '');
  if (theme && knownThemes.has(theme)) {
    out.theme = theme;
    const subTheme = slugify(src.sub_theme || src.subcategory || '');
    if (subTheme && knownThemes.get(theme).has(subTheme)) out.sub_theme = subTheme;
  }

  const transcription = src.transcription || src.transliteration;
  if (transcription) out.transcription = String(transcription);
  if (src.emoji) out.emoji = String(src.emoji);
  if (src.register) out.register = String(src.register);

  // gender is only valid on nouns; the schema forbids it elsewhere.
  if (item.form === 'noun' && src.gender) out.gender = String(src.gender);

  // domain is constrained to a fixed set; drop anything outside it.
  const DOMAINS = new Set([
    'general', 'travelling', 'travel', 'relocation', 'spoken',
    'exam_preparation', 'exam', 'professional', 'general_adjectives'
  ]);
  const domain = String(src.domain || '').toLowerCase().trim();
  if (DOMAINS.has(domain)) out.domain = domain;

  // The schema requires countability for every noun, with no needs_review waiver, and
  // a plural_form for countable nouns at A0-B1. Use the source values when valid;
  // otherwise default to countable and mark the entry needs_review so a human confirms.
  if (item.form === 'noun') {
    const COUNTABILITY = new Set(['countable', 'uncountable', 'pluralia_tantum', 'invariable', 'false_plural']);
    let value = String(src.countability || '').toLowerCase().trim();
    if (value === 'plural') value = 'pluralia_tantum';
    out.countability = COUNTABILITY.has(value) ? value : 'countable';

    const plural = String(src.plural_form || '').trim();
    if (plural) {
      out.plural_form = plural;
    } else if (out.countability === 'countable' && ['A0', 'A1', 'A2', 'B1'].includes(item.level)) {
      // No source plural form. Reuse the headword so the required field is present;
      // needs_review marks it for a human to replace with the real plural.
      out.plural_form = out.word;
    }
  }

  const defs = [];
  const examples = [];
  const rawDefs = Array.isArray(src.definitions) ? src.definitions : [];
  for (const d of rawDefs) {
    if (typeof d === 'string') {
      defs.push(d);
    } else if (d && typeof d === 'object') {
      if (d.text) defs.push(String(d.text));
      if (Array.isArray(d.examples)) examples.push(...d.examples.map(String));
    }
  }
  if (Array.isArray(src.examples)) examples.push(...src.examples.map(String));
  if (defs.length) out.definitions = defs;
  if (examples.length) out.examples = examples;

  out.updated = new Date().toISOString().slice(0, 10);
  return out;
}

function targetPathFor(item) {
  const dir = path.join(targetRoot, item.language, item.level.toLowerCase());
  const fileName = `${item.form}.json`;
  return path.join(dir, fileName);
}

function loadKnownThemes() {
  for (const p of [path.join(rootDir, 'schemas', 'themes.json'), path.join(rootDir, 'shared', 'themes.json')]) {
    if (!fs.existsSync(p)) continue;
    try {
      const data = JSON.parse(fs.readFileSync(p, 'utf8'));
      const themes = data.themes || data;
      const byTheme = new Map();
      for (const [theme, subThemes] of Object.entries(themes)) {
        byTheme.set(theme, new Set(Array.isArray(subThemes) ? subThemes : []));
      }
      return byTheme;
    } catch {
      continue;
    }
  }
  return new Map();
}

function main() {
  const { sourceRoot, apply } = parseArgs();
  if (!fs.existsSync(sourceRoot)) {
    console.error(`Source directory not found: ${sourceRoot}`);
    process.exit(1);
  }

  const knownThemes = loadKnownThemes();
  const { byKey, usedIds } = readTargetIndex();
  const sourceEntries = readSourceEntries(sourceRoot);

  const seenSource = new Set();
  const missing = [];
  const existing = [];
  for (const item of sourceEntries) {
    const key = `${item.language}|${item.word}|${item.form}`;
    if (seenSource.has(key)) continue;
    seenSource.add(key);
    if (byKey.has(key)) existing.push(item);
    else missing.push(item);
  }

  const byLanguage = {};
  const byLevel = {};
  for (const item of missing) {
    byLanguage[item.language] = (byLanguage[item.language] || 0) + 1;
    byLevel[item.level] = (byLevel[item.level] || 0) + 1;
  }

  console.log(`Source entries (deduped by language|word|form): ${seenSource.size}`);
  console.log(`Already present in COSYdata: ${existing.length}`);
  console.log(`Missing from COSYdata: ${missing.length}`);
  console.log('By language:', JSON.stringify(byLanguage));
  console.log('By level:', JSON.stringify(byLevel));

  if (!apply) {
    console.log('\nMode: DRY RUN (pass --apply to write files)');
    return;
  }

  const written = new Map();
  for (const item of missing) {
    const file = targetPathFor(item);
    if (!written.has(file)) written.set(file, []);
    written.get(file).push(toTargetEntry(item, usedIds, knownThemes));
  }

  for (const [file, entries] of written) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    let merged = entries;
    if (fs.existsSync(file)) {
      const current = JSON.parse(fs.readFileSync(file, 'utf8'));
      if (Array.isArray(current)) merged = [...current, ...entries];
    }
    fs.writeFileSync(file, JSON.stringify(merged, null, 2) + '\n', 'utf8');
  }

  console.log(`\nMode: APPLY`);
  console.log(`Files written: ${written.size}`);
  console.log(`Entries added: ${missing.length}`);
}

main();
