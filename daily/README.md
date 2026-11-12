# COSYdata Daily Strip Datasets

This directory contains standardized, static daily content strips for language learning, designed to be fetched directly by the **COSYlanguages** web application and other ecosystem clients via GitHub Pages.

## Overview

The daily strip content is organized by language ISO code under `/daily/<lang>/`. Four types of daily learning cards are provided for each supported language:

1. `speaking.json`: Daily speaking and conversation prompts.
2. `writing.json`: Daily writing, essay, and journaling prompts.
3. `idioms.json`: Daily idiomatic expressions with literal and figurative meanings, examples, and optional audio references.
4. `facts.json`: Fun facts about the target language, culture, history, and linguistics.

Additionally, `/daily/index.json` provides an aggregate index of available languages and entry counts per content file.

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

## Dictionary-backed calendar (idiom and word of the day)

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
- **Editorial filter:** `daily/<lang>/calendar/exclude.json` lists entries that are never featured
  (`{"<slot>": {"<id>": "<word>"}}`). `idioms.json` also holds collocations and phrasal verbs, so `idiom` needs it.
- **Hand edits:** `daily/<lang>/calendar/overrides.json`, `{"<slot>": {"2026-12-25": {"B1": "<entry id>"}}}`.
- **Languages and levels:** only slots/languages in `daily/calendar-config.json` are built. A level whose eligible
  pool is below `minPool` (90 for `word`) is skipped, because it would repeat too often; clients fall back to the nearest
  published level. Today: `idiom` en; `word` en (A0-C2), fr (A0, A2), it (A1-B1), ru (A0-A2), el (A1).
- **Validation:** `npm run validate` fails if a pick no longer exists, is excluded or ineligible, or its card is out of date.

## CORS & Hosting

All JSON files in this directory are hosted statically via GitHub Pages at:
`https://cosylanguages.github.io/COSYdata/daily/<lang>/<type>.json`

GitHub Pages automatically serves static assets with `Access-Control-Allow-Origin: *` headers, ensuring seamless client-side `fetch()` capabilities across all COSY web applications without proxy requirements.

---

## Schema Specifications

All daily strip files are validated against [`schemas/daily.schema.json`](../schemas/daily.schema.json).

### 1. Speaking Prompts (`speaking.json`)
```json
[
  {
    "id": "en:speaking:1",
    "prompt": "What is a morning routine that makes you feel productive and relaxed?",
    "topic": "daily_routine",
    "level": "A2-B1"
  }
]
```

### 2. Writing Prompts (`writing.json`)
```json
[
  {
    "id": "en:writing:1",
    "prompt": "Write a short paragraph reflecting on a goal you set for yourself this year.",
    "topic": "reflection",
    "level": "A2-B1"
  }
]
```

### 3. Idiomatic Expressions (`idioms.json`)
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

### 4. Language & Cultural Facts (`facts.json`)
```json
[
  {
    "id": "en:fact:1",
    "fact": "English is the official international language of aviation and maritime communications worldwide.",
    "topic": "linguistics"
  }
]
```

---

## Supported Languages & Entry Counts

| Code | Language | Speaking | Writing | Idioms | Facts | Status |
|------|----------|----------|---------|--------|-------|--------|
| `en` | English | 30 | 30 | 30 | 30 | Full production set |
| `fr` | French | 10 | 10 | 10 | 10 | Placeholder (needs review) |
| `it` | Italian | 10 | 10 | 10 | 10 | Placeholder (needs review) |
| `ru` | Russian | 10 | 10 | 10 | 10 | Placeholder (needs review) |
| `el` | Greek | 10 | 10 | 10 | 10 | Placeholder (needs review) |
| `es` | Spanish | 10 | 10 | 10 | 10 | Placeholder (needs review) |
| `de` | German | 10 | 10 | 10 | 10 | Placeholder (needs review) |
| `pt` | Portuguese | 10 | 10 | 10 | 10 | Placeholder (needs review) |
| `hy` | Armenian | 10 | 10 | 10 | 10 | Placeholder (needs review) |
| `ka` | Georgian | 10 | 10 | 10 | 10 | Placeholder (needs review) |
| `ba` | Bashkir | 10 | 10 | 10 | 10 | Placeholder (needs review) |
| `br` | Breton | 10 | 10 | 10 | 10 | Placeholder (needs review) |
| `cv` | Chuvash | 10 | 10 | 10 | 10 | Placeholder (needs review) |
| `tt` | Tatar | 10 | 10 | 10 | 10 | Placeholder (needs review) |

See [`TODO.md`](./TODO.md) for details on outstanding native-speaker review items.
