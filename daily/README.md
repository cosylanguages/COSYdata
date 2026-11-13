# COSYdata Daily Strip Datasets

This directory contains standardized, static daily content strips for language learning, designed to be fetched directly by the **COSYlanguages** web application and other ecosystem clients via GitHub Pages.

## Overview

COSYdata holds **vocabulary only**, so what lives here is what the dictionary generates or still backs:

- `calendar/<slot>/YYYY-MM.json`: the dictionary-backed idiom and word of the day (see below). This is the current source.
- `idioms.json` (legacy): the original hand-written idiom lists. The strip uses them only for languages that have no idiom
  calendar yet; they will go once those languages have reviewed calendars.

Moved out in 2026-11 (the strip reads the new locations first):

| Content | New home |
|---|---|
| Speaking and writing prompts | COSYpractice: `data/daily/<lang>/speaking.json`, `writing.json` |
| Fun facts | COSYlanguages: `data/daily/<lang>/facts.json` |

`/daily/index.json` lists the languages and the legacy idiom counts.

---

## Front-End Entry Selection Logic

To present a consistent "Card of the Day" to users without requiring a backend server or database, front-end applications calculate the current Day of the Year (1–366) and select the card index using the modulo operator over the array length:

```javascript
/**
 * Computes the 0-indexed day of the year for a given date.
 */
function getDayOfYear(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

/**
 * Selects the daily entry for today from a fetched array.
 */
function getDailyEntry(items) {
  if (!Array.isArray(items) || items.length === 0) return null;
  const dayOfYear = getDayOfYear();
  const index = dayOfYear % items.length;
  return items[index];
}
```

---

## Dictionary-backed calendar (idiom, word and phrasal verb of the day)

`daily/<lang>/calendar/<slot>/YYYY-MM.json` holds one entry per CEFR level per day, picked from the vocabulary.
Each day carries a ready-to-show card, so a client needs one small request (about 20 KB gzipped per month):

```json
{ "lang": "fr", "slot": "word", "month": "2026-11",
  "days": { "2026-11-10": { "A0": { "id": "fr:gare:noun", "word": "gare", "pos": "noun", "article": "la", "gender": "feminine",
                                    "transcription": "/ɡaʁ/", "definition": "Bâtiment où s'arrêtent les trains.",
                                    "example": "Le train s'arrête à la gare centrale.", "emoji": "🚉" } } } }
```

| Slot | Pool | Cards carry |
|---|---|---|
| `idiom` | `vocabulary/<lang>/<level>/idioms.json` | word, definition, example, `literal_meaning`, emoji |
| `word` | nouns, adjectives and adverbs from every vocabulary file (verbs are kept for a verb-of-the-day slot) | word, pos, definition, example, article, gender, IPA (only real IPA), emoji |
| `phrasal-verb` | `vocabulary/<lang>/<level>/phrasal_verbs.json` | word (without "to"), definition, example, IPA, emoji, up to 2 `synonyms`, `tool` (the COSYtools page for the verb, e.g. `en-verb-prep:wake up`) |

- **Build:** `npm run build:daily` (also part of `npm run build`). Defaults to the current month plus 13.
  Existing month files are not re-picked, so published days stay stable; their cards are refreshed from the
  dictionary on every run, a retired ID is re-pointed through `shared/id-aliases.json`, and a pick that is no
  longer eligible (entry removed, newly excluded, failing a quality rule) is replaced.
- **Picking:** deterministic (slot, language, level, date); no repeat within min(90, pool/2) days at a level.
- **Quality rules (`scripts/lib/daily-calendar.cjs`, shared by the build and the validator).** For `word`:
  a single lexeme; a real definition (12+ characters, not the word or the example); an example that uses the word and
  is not a quotation of it; an emoji at A0-A2; not a template stub (a definition or example identical across 3+ headwords
  once the headword is masked, e.g. "Terme désignant X."); not a fragment of a longer phrase ("as in caveat emptor").
  Register labels such as "Formal / Literary noun:" are removed from the card definition.
- **Phrasal-verb rules:** `phrasal_verbs.json` also holds modals ("Can I"), polite formulas, bare particles ("out") and
  trend phrases ("upward trend"). A pick is verb + particle(s) (2-4 words, last word a particle or preposition, no leading
  modal/pronoun/"be"), its example must use the particle, and a leading "to" is dropped ("to stand out" and "stand out" are one
  entry). Idioms that are not phrasal verbs ("fall prey to") are in `exclude.json`.
- **Editorial filter:** `daily/<lang>/calendar/exclude.json` lists entries that are never featured
  (`{"<slot>": {"<id>": "<word>"}}`). `idioms.json` also holds collocations and phrasal verbs, so `idiom` needs it.
- **Hand edits:** `daily/<lang>/calendar/overrides.json`, `{"<slot>": {"2026-12-25": {"B1": "<entry id>"}}}`.
- **Languages and levels:** only slots/languages in `daily/calendar-config.json` are built. A level whose eligible
  pool is below `minPool` (90 for `word`) is skipped, because it would repeat too often; clients fall back to the nearest
  published level. Today: `idiom` en; `word` en (A0-C2), fr (A0, A2), it (A1-B1), ru (A0-A2), el (A1); `phrasal-verb` en (A2-C1, minPool 55). Italian has 55 `phrasal_verbs.json` entries at A2 but they are ordinary verbs, so it is not enabled; fr, ru and el have none.
- **Validation:** `npm run validate` fails if a pick no longer exists, is excluded or ineligible, or its card is out of date.

## CORS & Hosting

All JSON files in this directory are hosted statically via GitHub Pages at:
`https://cosylanguages.github.io/COSYdata/daily/<lang>/<type>.json`

GitHub Pages automatically serves static assets with `Access-Control-Allow-Origin: *` headers, ensuring seamless client-side `fetch()` capabilities across all COSY web applications without proxy requirements.

---

## Schema Specifications

The legacy idiom files follow [`schemas/daily.schema.json`](../schemas/daily.schema.json), which also describes the speaking, writing and facts formats now kept in COSYpractice and COSYlanguages.

### Idiomatic Expressions (`idioms.json`, legacy)
```json
[
  {
    "id": "en:idiom:1",
    "idiom": "Piece of cake",
    "literal_meaning": "A single slice of baked cake",
    "real_meaning": "Something that is very easy to accomplish",
    "example": "Don't worry about the grammar quiz; it will be a piece of cake!",
    "audio": null
  }
]
```

---

## Supported Languages & Entry Counts

| Code | Language | Idioms (legacy) | Status |
|------|----------|-----------------|--------|
| `en` | English | 30 | Full production set |
| `fr` | French | 10 | Placeholder (needs review) |
| `it` | Italian | 10 | Placeholder (needs review) |
| `ru` | Russian | 10 | Placeholder (needs review) |
| `el` | Greek | 10 | Placeholder (needs review) |
| `es` | Spanish | 10 | Placeholder (needs review) |
| `de` | German | 10 | Placeholder (needs review) |
| `pt` | Portuguese | 10 | Placeholder (needs review) |
| `hy` | Armenian | 10 | Placeholder (needs review) |
| `ka` | Georgian | 10 | Placeholder (needs review) |
| `ba` | Bashkir | 10 | Placeholder (needs review) |
| `br` | Breton | 10 | Placeholder (needs review) |
| `cv` | Chuvash | 10 | Placeholder (needs review) |
| `tt` | Tatar | 10 | Placeholder (needs review) |

See [`TODO.md`](./TODO.md) for details on outstanding native-speaker review items.
