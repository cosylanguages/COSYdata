# COSYdata

Welcome to **COSYdata**, the canonical static data repository for the COSYlanguages ecosystem.

## Overview

This repository serves as the **single source of truth** for vocabulary data consumed by other repositories across the COSYlanguages ecosystem (`COSYlanguages`, `COSYmanuals`, `COSYgames`, `COSYtools`).

There is no backend service or build step required for the data itself. All canonical vocabulary files are versioned JSON files served statically over HTTP via **GitHub Pages**.

> **GitHub Pages Configuration Note:**
> To enable GitHub Pages for this repository, navigate to **Settings > Pages** in GitHub, set the source to deploy from the `main` branch root folder (`/`).
> Once enabled, `vocabulary/en/index.json` will be reachable at:
> https://cosylanguages.github.io/COSYdata/vocabulary/en/index.json

---

## ID Scheme

Vocabulary entries are identified using a standard colon-separated scheme matching `<language>:<word-slug>:<form>`:

$$\text{\{language\}}:\text{\{word-slug\}}:\text{\{form\}}$$

### Examples:
- `"en:healthy:adjective"`
- `"en:cat:noun"`
- `"es:casa:noun"`

---

## Vocabulary File Organization & Datasets

Vocabulary entries are **batched into theme files** organized into level-specific subdirectories across CEFR levels and courses:

```
vocabulary/
└── <lang>/
    ├── index.json
    ├── a0_a1/
    │   ├── animals.json
    │   ├── colors.json
    │   ├── family.json
    │   └── ...
    ├── a2/
    │   ├── appearance.json
    │   ├── personality.json
    │   └── ...
    ├── b1/
    │   ├── abstract_concepts.json
    │   ├── cause_effect.json
    │   └── ...
    ├── b2/
    │   ├── business.json
    │   ├── innovation.json
    │   └── ...
    ├── c1/
    │   ├── rhetoric.json
    │   ├── sophisticated_adjectives.json
    │   └── ...
    └── c2/
        ├── literary_devices.json
        ├── rare_adjectives.json
        └── ...
```

- **`vocabulary/<lang>/<level>/<theme>.json`**: Contains array or map of word entries belonging to a given level and theme (e.g. `vocabulary/en/a0_a1/animals.json`, `vocabulary/en/a2/personality.json`, `vocabulary/en/b1/society.json`, `vocabulary/en/b2/business.json`, `vocabulary/en/c1/rhetoric.json`, `vocabulary/en/c2/rare_adjectives.json`).
- **`vocabulary/<lang>/index.json`**: Mappings from each word ID to its relative theme file path (e.g. `"en:cat:noun": "a0_a1/animals.json"`).

### Course Domains & Level Folders
- **`a0_a1/`**: Beginner CEFR A0–A1 level vocabulary files across general and spoken courses.
- **`a2/`**: Elementary CEFR A2 level vocabulary files across general and spoken courses.
- **`b1/`**: Intermediate CEFR B1 level vocabulary files across general and spoken courses.
- **`b2/`**: Upper-Intermediate CEFR B2 level vocabulary files across general and spoken courses.
- **`c1/`**: Advanced CEFR C1 level vocabulary files across general and spoken courses.
- **`c2/`**: Mastery CEFR C2 level vocabulary files across general and spoken courses.
- **`general`**: Standard CEFR course vocabulary.
- **`spoken`**: Spoken course vocabulary focused on conversation.
- **`general, spoken`**: Words present in both general and spoken course lists.

To regenerate `index.json` for all language folders, run:

```bash
npm run build:index
```

---

## Shared Resolver Client (`shared/vocab-resolver.js`)

Other repositories in the ecosystem import `shared/vocab-resolver.js` via a `<script type="module">` tag to resolve vocabulary entries and hydrate HTML elements at runtime.

See [`shared/README.md`](shared/README.md) for full usage instructions and API details.

---

## Vocabulary Entry Schema & Fields

Vocabulary entries in theme files follow the JSON Schema (Draft 2020-12) defined in `schemas/vocabulary.schema.json`.

### Required Fields (Level-Universal)
- **`id`** *(string)*: Unique identifier matching pattern `^[a-z]{2}:[a-z0-9-]+:[a-z0-9-]+$` (e.g. `en:healthy:adjective`).
- **`word`** *(string)*: The canonical word or term.
- **`language`** *(string)*: 2-letter language code matching `^[a-z]{2}$` (e.g. `en`, `es`, `fr`).
- **`form`** *(string)*: Grammatical form / part of speech (e.g. `noun`, `verb`, `adjective`, `adverb`).
- **`transcription`** *(string)*: Primary or neutral IPA phonetic transcription string required for every entry at every level (e.g. `"/kæt/"`).
- **`emoji`** *(string)*: Representative emoji or short emoji sequence. Required for every entry at every level (unless waived by `no_emoji: true`).
- **`antonyms`** *(string[])*: Array of antonym word IDs or terms (minimum 1 item). Required for every entry at every level (unless waived by `no_antonym: true`).

### Level-Dependent Fields (Validated via JSON Schema `if`/`then`)
- **`synonyms`** *(string[])*: Array of synonym word IDs or terms (minimum 1 item). Required for every entry where `level` is `B1`, `B2`, `C1`, or `C2` (B1+). Optional for `A0`/`A1`/`A2`.

### Form-Dependent Fields (Validated via JSON Schema `if`/`then`)
- **Noun fields** (relevant when `form` is `"noun"`):
  - **`countability`** *(string, required)*: Classification enum: `["countable", "uncountable", "pluralia_tantum", "invariable", "false_plural"]`.
  - **`article`** *(string)*: Grammatical article (e.g. `a`, `an`, `el`, `la`, `der`).
  - **`gender`** *(string)*: Grammatical gender (e.g. `masculine`, `feminine`, `neuter`).
  - **`plural_form`** *(string)*: Plural form (required when `countability` is `"countable"`, must NOT be present for other `countability` types).
  - **`singular_workaround`** *(string)*: Countable phrase used to refer to one item for pluralia tantum nouns (e.g. `"a pair of scissors"`).
  - **`collective_note`** *(string)*: Optional note for countable nouns whose verb agreement varies by dialect or reading (e.g. `"Can take a singular or plural verb depending on whether the group is meant as a whole or as its members."`).
- **Adjective / Adverb fields** (relevant when `form` is `"adjective"` or `"adverb"`):
  - **`comparative`** *(string)*: Comparative form (e.g. `healthier`).
  - **`superlative`** *(string)*: Superlative form (e.g. `healthiest`).

### Optional & Escape Hatch Fields
- **`transcription_variants`** *(object)*: Optional map of dialect-specific IPA pronunciation variants. Supported keys are a subset of `["uk", "us", "ca", "au", "nz"]` (e.g. `{ "us": "/ˈweð.ɚ/" }`). Omitted when pronunciations are identical to primary `transcription`.
- **`region`** *(string[])*: Optional array marking regions where this specific word or spelling is preferred. Items are a subset of `["UK", "US", "CA", "AU", "NZ"]` (e.g. `["UK", "AU"]`).
- **`regional_equivalents`** *(string[])*: Optional array of vocabulary IDs pointing to equivalent words used in other regions (e.g. `["en:apartment:noun"]`).
- **`level`** *(string)*: Primary CEFR level, one of `["A0", "A1", "A2", "B1", "B2", "C1", "C2"]`.
- **`levels`** *(string[])*: Array of all CEFR levels this word entry appears at across merged source entries (e.g. `["B1", "B2"]`).
- **`no_emoji`** *(boolean)*: When `true`, waives the required `emoji` constraint for entries with no sensible single-emoji representation (e.g. highly abstract or formal words).
- **`no_antonym`** *(boolean)*: When `true`, waives the required `antonyms` constraint for entries with no meaningful antonym (e.g. concrete nouns, function words, proper nouns).
- **`audio`** *(string)*: Audio file path or URL.
- **`image`** *(string)*: Image file path or URL.
- **`definitions`** *(string[])*: Array of clear definition strings (minimum 1 item if present).
- **`examples`** *(string[])*: Array of example sentences demonstrating usage.
- **`collocations`** *(string[])*: Array of common word pairings or phrases.
- **`related_forms`** *(string[])*: Array of ID references into another COSY repo's data (e.g. `"COSYtools:fr-conjugeur:aimer"`).
- **`domain`** *(string)*: Subject domain (e.g., `general`, `spoken`, `general, spoken`).
- **`theme`** *(string)*: Primary thematic category.
- **`sub_theme`** *(string)*: Sub-thematic classification.
- **`tags`** *(string[])*: Array of searchable tags.
- **`updated`** *(string)*: Date string in ISO `YYYY-MM-DD` format.

---

## Validation & CI Workflow

Every pull request touching `vocabulary/**` triggers an automated GitHub Actions validation check (`.github/workflows/validate-vocabulary.yml`).

### What is Checked:
1. **Schema Validation**: Every theme file under `vocabulary/**/*.json` (excluding `index.json`) is validated against `schemas/vocabulary.schema.json`.
2. **Index Mapping Integrity**: Every word ID mapped in an `index.json` file is verified to exist within the target theme file it references.
3. **Index Freshness**: Verifies that `index.json` is completely up-to-date by running `npm run build:index` and ensuring no uncommitted differences exist.

### Schema Sanity Checking
When editing `schemas/vocabulary.schema.json` itself, you can use the test fixtures in `schemas/examples/` as a sanity check to verify that your schema updates correctly accept valid entries and reject invalid ones:

- `schemas/examples/valid-*.json`: Must pass schema validation.
- `schemas/examples/invalid-*.json`: Must fail schema validation.

PRs touching vocabulary data must pass these automated checks before merging.

---

## Contribution Guide: How to Add a Word

1. **Locate or Create Theme File**: Find the target language and level directory (e.g., `vocabulary/en/a0_a1/`, `vocabulary/en/a2/`, `vocabulary/en/b1/`, `vocabulary/en/b2/`, `vocabulary/en/c1/`, `vocabulary/en/c2/`) and locate the appropriate `<theme>.json` file (or create a new theme file if one does not exist).
2. **Add Entry**: Add the word entry matching the schema defined in `schemas/vocabulary.schema.json`.
3. **Regenerate Index**: Run `npm run build:index` to update `vocabulary/<lang>/index.json` with the new word ID mapping.
4. **Validate**: Run local validation (`npm run validate` after installing dependencies) to ensure all JSON files pass validation.
5. **Submit PR**: Open a pull request targeting `main`.
