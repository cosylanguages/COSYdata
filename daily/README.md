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
