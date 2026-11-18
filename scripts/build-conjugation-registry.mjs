#!/usr/bin/env node
/**
 * Build the conjugation-table registry
 * ------------------------------------
 * Every conjugation table gets a stable id of the form
 * `conj:<lang>:<verb-slug>:<form>` (e.g. `conj:fr:etre:present`). The slug is a
 * transliterated, ASCII form of the infinitive so the id is URL-safe, stable and
 * self-describing across scripts.
 *
 * Source data: shared/top10-verbs.json (present-simple tables, 14 languages).
 * Output:      shared/conjugation-registry.json + shared/conjugation-index.json
 *
 * Cross-language link: every table also records the shared `concept` id (the
 * source verb id, e.g. `be`), so `conj:be:present` resolves to all languages.
 *
 * Run: node scripts/build-conjugation-registry.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = path.join(ROOT, 'shared', 'top10-verbs.json');
const REGISTRY = path.join(ROOT, 'shared', 'conjugation-registry.json');
const INDEX = path.join(ROOT, 'shared', 'conjugation-index.json');
const BASE_URL = 'https://cosylanguages.github.io/COSYdata/';

// Minimal transliteration for the scripts present in the dataset.
const MAP = {
  // Cyrillic (Russian, Bashkir, Tatar, Chuvash + extras)
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh', з: 'z',
  и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
  с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh',
  щ: 'shch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
  ә: 'a', ғ: 'gh', қ: 'q', ң: 'ng', ө: 'o', ҫ: 's', ү: 'u', һ: 'h', ҙ: 'z',
  ӑ: 'a', ӗ: 'e', ĕ: 'e', ҫ: 's', ÿ: 'u', ç: 'ch',
  // Greek
  α: 'a', β: 'v', γ: 'g', δ: 'd', ε: 'e', ζ: 'z', η: 'i', θ: 'th', ι: 'i',
  κ: 'k', λ: 'l', μ: 'm', ν: 'n', ξ: 'x', ο: 'o', π: 'p', ρ: 'r', σ: 's',
  ς: 's', τ: 't', υ: 'y', φ: 'f', χ: 'ch', ψ: 'ps', ω: 'o', ώ: 'o', ά: 'a',
  έ: 'e', ή: 'i', ί: 'i', ό: 'o', ύ: 'y', ϊ: 'i', ϋ: 'y',
  // Armenian
  ա: 'a', բ: 'b', գ: 'g', դ: 'd', ե: 'e', զ: 'z', է: 'e', ը: 'y', թ: 't',
  ժ: 'zh', ի: 'i', լ: 'l', խ: 'kh', ծ: 'ts', կ: 'k', հ: 'h', ձ: 'dz',
  ղ: 'gh', ճ: 'ch', մ: 'm', յ: 'y', ն: 'n', շ: 'sh', ո: 'o', չ: 'ch',
  պ: 'p', ջ: 'j', ռ: 'r', ս: 's', վ: 'v', տ: 't', ր: 'r', ց: 'ts', ւ: 'w',
  փ: 'p', ք: 'k', օ: 'o', ֆ: 'f',
  // Georgian
  ა: 'a', ბ: 'b', გ: 'g', დ: 'd', ე: 'e', ვ: 'v', ზ: 'z', თ: 't', ი: 'i',
  კ: 'k', ლ: 'l', მ: 'm', ნ: 'n', ო: 'o', პ: 'p', ჟ: 'zh', რ: 'r', ს: 's',
  ტ: 't', უ: 'u', ფ: 'p', ქ: 'k', ღ: 'gh', ყ: 'q', შ: 'sh', ჩ: 'ch',
  ც: 'ts', ძ: 'dz', წ: 'ts', ჭ: 'ch', ხ: 'kh', ჯ: 'j', ჰ: 'h'
};

function translit(s) {
  // Strip Latin diacritics first (é, ê, ñ, ü, ø…) so they do not become dashes.
  const norm = String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ø/g, 'o').replace(/đ/g, 'd').replace(/ß/g, 'ss');
  const out = [];
  for (const ch of norm.toLowerCase()) {
    if (/[a-z0-9]/.test(ch)) out.push(ch);
    else if (ch in MAP) out.push(MAP[ch]);
    else if (/[\s_/·().,'’]/.test(ch)) out.push('-');
    else out.push('-');
  }
  return out.join('');
}

function slugify(infinitive, fallback) {
  // Drop a parenthetical transliteration/gloss: "լինել (linel)" -> "լինել".
  const base = String(infinitive).replace(/\([^)]*\)/g, ' ').trim();
  let slug = translit(base).replace(/-+/g, '-').replace(/^-|-$/g, '');
  if (!slug) slug = String(fallback || '').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
  return slug;
}

function main() {
  const verbs = JSON.parse(fs.readFileSync(SOURCE, 'utf8'));
  const entries = [];
  const byId = new Map();

  for (const verb of verbs) {
    for (const [lang, info] of Object.entries(verb.languages || {})) {
      const conj = info && info.conjugation;
      if (!conj || !Object.keys(conj).length) continue;
      const form = 'present';
      const slug = slugify(info.infinitive, verb.id);
      const concept = String(verb.id).replace(/[^a-z0-9]+/gi, '-').toLowerCase().replace(/^-|-$/g, '');
      let id = `conj:${lang}:${slug}:${form}`;
      if (byId.has(id)) id = `conj:${lang}:${slug}-${concept}:${form}`;
      byId.set(id, true);
      entries.push({
        id,
        lang,
        verb_slug: slug,
        infinitive: info.infinitive,
        form,
        form_label: 'present simple',
        concept: verb.id,
        english_title: verb.english_title,
        notes: info.notes || '',
        table: conj
      });
    }
  }

  entries.sort((a, b) => a.id.localeCompare(b.id));

  const registry = {
    schema_version: '1.0.0',
    generated: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
    id_format: 'conj:<lang>:<verb-slug>:<form>',
    count: entries.length,
    tables: entries
  };
  fs.writeFileSync(REGISTRY, JSON.stringify(registry, null, 2) + '\n', 'utf8');

  // Compact index: id -> {lang, infinitive, concept, table} for the embed.
  const index = {};
  for (const e of entries) {
    index[e.id] = { lang: e.lang, infinitive: e.infinitive, concept: e.concept, notes: e.notes, table: e.table };
  }
  fs.writeFileSync(INDEX, JSON.stringify(index) + '\n', 'utf8');

  console.log(`Wrote ${entries.length} conjugation tables`);
  console.log(`  ${path.relative(ROOT, REGISTRY)}`);
  console.log(`  ${path.relative(ROOT, INDEX)}`);
}

main();
