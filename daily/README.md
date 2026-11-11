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

## Front-End Entry Selection Logic & Local Midnight Synchronization

To present consistent, synchronized daily learning cards across all client applications without requiring backend infrastructure, applications resolve the client's current date in their local timezone (`YYYY-MM-DD`). All daily feeds update simultaneously at local midnight.

```javascript
/**
 * Resolves current client date as YYYY-MM-DD in local time.
 */
function getLocalMidnightDateKey(now = new Date()) {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Milliseconds until the next local midnight for automatic UI hot-refresh.
 */
function getMsUntilLocalMidnight(now = new Date()) {
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return tomorrow.getTime() - now.getTime();
}
```

---

## The 4 Daily Components & Cross-Ecosystem Synchronization

For full architectural blueprints, see [`docs/daily-ecosystem-architecture.md`](../docs/daily-ecosystem-architecture.md).

The daily strip delivers four coordinated components divided into CEFR levels (`A0–A1`, `A2`, `B1–B2`, `C1–C2`):

1. **Word of the Day (WOTD)** (`word`): Focuses on creative active production—explaining the concept in the learner's own words rather than passive reading. From **B1 upwards**, learners are challenged to provide as many synonyms and register variants as possible.
2. **Phrasal Verb of the Day** (`phrasal_verb`): Particle semantics, transitivity, and literal vs. figurative usage.
3. **Collocation of the Day** (`collocation`): Natural word partnerships (verb+noun, adj+noun) to build native-like fluency.
4. **Idiom of the Day** (`idiom`): Figurative imagery, cultural contexts, literal translations, and real meanings.

### Cross-Repository Connections
All daily elements share a synchronized Daily Theme and link across the COSY ecosystem:
- **COSYlanguages**: Daily Spoken and Written immersion strips.
- **COSYpractice**: Interactive voice recording studio (Daily Spoken) and creative writing/synonym sandbox (Daily Written).
- **COSYtools**: Daily Verb Conjugator (and irregular verbs) + Daily Verb & Preposition governance.

---

## Dictionary-backed calendar (idiom of the day)

`daily/<lang>/calendar/idiom/YYYY-MM.json` holds one idiom per CEFR level per day, picked from
`vocabulary/<lang>/<level>/idioms.json`. Each day carries a ready-to-show card (word, definition,
example, optional `literal_meaning`, `emoji`, `audio`), so a client needs one small request:

```json
{ "lang": "en", "slot": "idiom", "month": "2026-11",
  "days": { "2026-11-10": { "B1": { "id": "en:feather-in-ones-cap:idiom", "word": "Feather in one's cap",
                                    "definition": "An achievement to be proud of", "example": "..." } } } }
```

- **Build:** `npm run build:daily` (also part of `npm run build`). Defaults to the current month plus 13.
  Existing month files are never re-picked, so published days stay stable; their cards are refreshed from the
  dictionary on every run, and a retired ID is re-pointed through `shared/id-aliases.json`.
- **Picking:** deterministic (language, level, date), no repeat within min(90, pool/2) days at a level.
- **Editorial filter:** `idioms.json` also contains plain collocations and phrasal verbs.
  `daily/<lang>/calendar/exclude.json` lists entries that are never featured (`{"idiom": {"<id>": "<word>"}}`).
- **Hand edits:** `daily/<lang>/calendar/overrides.json`, `{"idiom": {"2026-12-25": {"B1": "<entry id>"}}}`.
- **Languages:** only those listed in `daily/calendar-config.json`. Add a language after reviewing its idiom pool and
  writing its `exclude.json`. Currently `en`. Levels without a pool are skipped (fr: A2, it: A2-B1, ru: A2 today).
- **Validation:** `npm run validate` fails if a pick no longer exists, its card is out of date, or it is excluded.

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
