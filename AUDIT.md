# COSYdata Repository Audit Report

This audit assesses the structural integrity, CI validation accuracy, client API robustness, and developer documentation of the `COSYdata` repository. As `COSYdata` is primarily a static JSON dataset served via GitHub Pages alongside shared JS resolver utilities, visual UI/CSS analysis is not applicable and is noted accordingly.

---

## STRUCTURAL / LOGIC AUDIT

### Finding 1: `resolveVocab` Suppresses Errors and Returns `null` on Missing Entries or Network/404 Failures
- **Severity:** High
- **Location:** `shared/vocab-resolver.js` (`fetchJson` function, lines 84–95; `resolveVocab` function, lines 109–246)
- **Why it matters:** When `resolveVocab` is asked to resolve a non-existent ID (e.g. `en:nonexistent:noun`) or encounters a network error / HTTP 404 while fetching `index.json` or a theme file, it catches the error, outputs a `console.warn` log, and returns `null`. While returning `null` allows simple boolean checks (`if (!entry) ...`), consuming applications (such as `COSYlanguages` practice hub or `COSYgames`) receive no error object, status code, or structural error classification distinguishing between:
  1. Word reference missing from `index.json` or alias mapping (404 / content gap),
  2. Temporary network or HTTP server outage (500 / offline / CORS issue),
  3. Malformed JSON or parse error.

  Furthermore, `hydrateVocabElements` silently catches exceptions and leaves DOM node text completely unchanged when `resolveVocab` returns `null`. On consuming practice pages, missing entries fail silently, leaving blank or unhydrated placeholder spans without triggering fallback visual states or retry mechanisms.

---

### Finding 2: CI Workflow Validates Index Freshness via Git Diff, but `validate.cjs` Lacks Flat-Index and Search-Index Cross-Checks
- **Severity:** Medium
- **Location:** `.github/workflows/validate-vocabulary.yml` (lines 35–56) & `scripts/validate.cjs`
- **Why it matters:** The README claims CI validates index freshness. In `.github/workflows/validate-vocabulary.yml`, index freshness is checked by running `npm run build:index`, `npm run build:flat-index`, and `npm run build:search-index` sequentially and verifying `git diff --exit-code vocabulary/`. However:
  1. `scripts/validate.cjs` itself only checks `index.json` mappings against theme files; it does **not** validate whether `flat-index.json` or `search-index.json` contain dangling IDs, orphaned surface forms, or out-of-sync metadata.
  2. If a contributor runs `npm run validate` locally, `validate.cjs` passes without alerting them that `flat-index.json` or `search-index.json` are stale unless they also run `npm run build`.

---

### Finding 3: Repository CI Validation Currently Fails (`scripts/validate.cjs`) Due to Retired IDs in Data Files and Unmapped Themes
- **Severity:** High
- **Location:** `scripts/validate.cjs`, `shared/id-aliases.json`, and dataset JSON files (e.g., `vocabulary/tt/a0_a1/*.json`)
- **Why it matters:** Running `npm run validate` fails on the current `main` branch with 78 retired ID errors (e.g. `[RETIRED ID ERROR] ID 'en:eyes:noun' is listed in shared/id-aliases.json as retired, but still exists in data files`). `scripts/validate.cjs` enforces that retired IDs in `shared/id-aliases.json` must not exist in data files. Because these retired IDs were not purged from the source theme JSON files during alias creation, any PR or CI run touching vocabulary files will fail validation.

---

### Finding 4: Fragile 3-Part Reference Parsing in `resolveVocab` for Hyphenated Words or Custom Forms
- **Severity:** Medium
- **Location:** `shared/vocab-resolver.js` (lines 130–152)
- **Why it matters:** `resolveVocab` parses colon-delimited references (`ref.split(':')`). If a reference has 3 parts (`lang:part2:part3`), `resolveVocab` checks if `part3` is in `KNOWN_FORMS` (`Set(['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'interjection', 'phrase', 'number'])`).
  If `part3` matches a known form, `part2` is assumed to be `wordSlug`.
  However:
  - If a novel or extended form is used (e.g., `en:take-care-of:phrasal_verb`), `phrasal_verb` is not in `KNOWN_FORMS`, so `resolveVocab` misinterprets `part2` (`take-care-of`) as a `theme` and `part3` (`phrasal_verb`) as `wordSlug`.
  - If a reference has more than 3 colon segments, `wordSlug` parsing relies on array slicing (`parts.slice(2).join(':')`) which fails to resolve standard canonical IDs correctly.

---

### Finding 5: `localStorage` Cache Invalidations and Exception Handling Gaps in Resolver
- **Severity:** Low
- **Location:** `shared/vocab-resolver.js` (`getCache` & `setCache`, lines 29–82)
- **Why it matters:** When `localStorage.setItem` fails (e.g. quota exceeded or private browsing restrictions in iOS Safari), `setCache` silently ignores the error and relies on `memoryCache`. However, cached index and theme payloads have a fixed 24-hour TTL (`DEFAULT_TTL_MS = 86400000`). If a dataset update is deployed to GitHub Pages, client browsers will continue serving stale cached JSON definitions for up to 24 hours with no cache-busting version parameter or cache-revalidation mechanism (`ETag` / `If-None-Match`).

---

## UX / UI (API / DX) AUDIT

### Finding 1: `shared/README.md` Lacks Response Shape Specifications and Error Case Documentation
- **Severity:** Medium
- **Location:** `shared/README.md`
- **Why it matters:** `shared/README.md` documents only happy-path examples for `resolveVocab` and `hydrateVocabElements`. It does not provide:
  1. The explicit TypeScript or JSDoc object shape returned by `resolveVocab` (e.g., list of mandatory vs optional fields: `word`, `form`, `transcription`, `definitions`, `examples`, `level`, `domain`).
  2. Documentation on what `resolveVocab` returns when an entry is not found (`null` vs throwing).
  3. Guidance on how consuming apps should handle `null` returns (e.g. fallback UI components, displaying raw word slug, or error boundaries).
  4. Documentation on `flat-index.json` schema or its return structure (maps surface form strings to arrays of `{ id, field }` objects).

---

### Finding 2: `hydrateVocabElements` Field Resolver Supports Limited Array Indexing
- **Severity:** Low
- **Location:** `shared/vocab-resolver.js` (`hydrateVocabElements`, lines 266–274) & `shared/README.md`
- **Why it matters:** `hydrateVocabElements` explicitly checks for `field === 'definitions[0]' || field === 'definition'` and `field === 'examples[0]' || field === 'example'`. However, it does not support generalized array index notation (e.g., `definitions[1]`, `examples[1]`, or `synonyms[0]`), nor does it support joined array fields (e.g., comma-separated `synonyms` or `antonyms`). Developers attempting to display secondary examples or synonym lists via `data-vocab-field` attributes will find those fields evaluated as `undefined` and left unhydrated.

---

## VISUAL / CSS AUDIT

- **Status:** **NOT APPLICABLE**
- **Note:** `COSYdata` is a static JSON data repository paired with client-side JavaScript resolution modules (`shared/vocab-resolver.js`, `shared/cosy-word-popup.js`, `shared/dictionary-ui.js`). There is no visitor-facing standalone website or visual frontend application maintained within this repository. Visual UI testing and CSS layout verification are handled downstream in consumer frontend applications (e.g., `COSYlanguages`, `COSYgames`, `COSYtools`).

---

## TOP 5 PRIORITY FIXES

1. **Purge Retired IDs from Source Theme JSON Files (`scripts/validate.cjs` failure)**
   - *Action:* Remove the 78 retired entry IDs listed in `shared/id-aliases.json` from their respective theme JSON files across `vocabulary/en/` so that `npm run validate` passes cleanly.
2. **Expand `KNOWN_FORMS` in `shared/vocab-resolver.js` to Include All Schema Forms**
   - *Action:* Add missing forms (`phrasal_verb`, `idiom`, `expression`, `prefix`, `suffix`, `particle`) to the `KNOWN_FORMS` `Set` in `shared/vocab-resolver.js` to prevent reference resolution misparsing.
3. **Enhance `shared/README.md` DX Documentation with Response Shapes and Error Handling**
   - *Action:* Update `shared/README.md` to document the exact JSON return structure of `resolveVocab`, document `null` return behavior on missing entries/network failures, provide integration pattern examples for error handling, and document `flat-index.json` schema.
4. **Integrate Flat-Index and Search-Index Verification into `scripts/validate.cjs`**
   - *Action:* Update `scripts/validate.cjs` so that running local validation also checks the integrity and sync status of `flat-index.json` and `search-index.json`, matching CI guarantees.
5. **Add Optional Error / Fallback Options to `resolveVocab` and `hydrateVocabElements`**
   - *Action:* Add a `fallback` option or custom error handler callback to `resolveVocab` and `hydrateVocabElements` so consuming apps can cleanly render placeholder text or handle missing entries without silent failures.
