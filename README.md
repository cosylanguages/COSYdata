# COSYdata

Welcome to **COSYdata**, the canonical static data repository for the COSYlanguages ecosystem.

## Overview

This repository serves as the **single source of truth** for vocabulary, functional phrase, and curriculum competency data consumed by other repositories across the COSYlanguages ecosystem (`COSYlanguages`, `COSYmanuals`, `COSYgames`, `COSYtools`).

There is no backend service or build step required for the data itself. All canonical data files are versioned JSON files served statically over HTTP via **GitHub Pages**.

> **GitHub Pages Configuration Note:**
> To enable GitHub Pages for this repository, navigate to **Settings > Pages** in GitHub, set the source to deploy from the `main` branch root folder (`/`).
> Once enabled, `vocabulary/en/index.json` will be reachable at:
> https://cosylanguages.github.io/COSYdata/vocabulary/en/index.json

---

## ID Schemes

- **Vocabulary entries**: `<language>:<word-slug>:<form>` (e.g., `"en:healthy:adjective"`, `"en:cat:noun"`, `"es:casa:noun"`)
- **Functional phrases**: `en:relocation:<situation>:<slug>` (e.g., `"en:relocation:housing:asking-about-rent"`)
- **Curriculum competencies**: `en:relocation:competency:<slug>` (e.g., `"en:relocation:competency:opening-bank-account"`)

---

## Directory Organization & Datasets

```
COSYdata/
├── vocabulary/
│   └── <lang>/
│       ├── index.json
│       ├── a0_a1/
│       ├── a2/
│       ├── b1/
│       ├── b2/
│       ├── c1/
│       └── c2/
├── functional-phrases/
│   └── <lang>/
└── curriculum/
    └── <lang>/
```

- **`vocabulary/<lang>/<level>/<theme>.json`**: Contains array or map of word entries belonging to a given level and theme (e.g. `vocabulary/en/a0_a1/animals.json`, `vocabulary/en/a2/personality.json`, `vocabulary/en/b1/society.json`, `vocabulary/en/b2/business.json`, `vocabulary/en/c1/rhetoric.json`, `vocabulary/en/c2/rare_adjectives.json`).
- **`vocabulary/<lang>/index.json`**: Mappings from each word ID to its relative theme file path (e.g. `"en:cat:noun": "a0_a1/animals.json"`).
- **`functional-phrases/<lang>/`**: Whole situational sentences and utterances (e.g., relocation phrases).
- **`curriculum/<lang>/`**: Age-specific learning objectives and discussion themes.

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

## Schemas & Content Types

The repository uses JSON Schema (Draft 2020-12) files in `schemas/` to validate all content:

### 1. Vocabulary Entry (`schemas/vocabulary.schema.json`)
For single words and terms.

#### Required Fields
- **`id`** *(string)*: Unique identifier matching pattern `^[a-z]{2}:[a-z0-9-]+:[a-z0-9-]+$`.
- **`word`** *(string)*: The canonical word or term.
- **`language`** *(string)*: 2-letter language code.
- **`form`** *(string)*: Grammatical form / part of speech.
- **`transcription`** *(string)*: Primary or neutral IPA phonetic transcription.
- **`emoji`** *(string)*: Representative emoji or short sequence (unless waived by `no_emoji: true`).
- **`antonyms`** *(string[])*: Array of antonym word IDs or terms (unless waived by `no_antonym: true`).

### 2. Functional Phrase (`schemas/functional-phrase.schema.json`)
For whole situational sentences or utterances (not single words).

#### Required Fields
- **`id`** *(string)*: Matching `en:relocation:<situation>:<slug>`.
- **`phrase`** *(string)*: Full sentence or utterance.
- **`language`** *(string)*: 2-letter language code.
- **`level`** *(string)*: CEFR level (`A0`–`C2`).
- **`register`** *(string)*: Enum `["formal", "neutral", "informal"]`.
- **`situation`** *(string)*: Free-text category name.
- **`domain`** *(string)*: Subject domain.

#### Optional Fields
- **`audience`** *(string)*: Enum `["general", "children", "teens", "adults", "seniors"]`.
- **`translation_notes`** *(string)*: Translation context or nuance notes.
- **`related_vocabulary`** *(string[])*: Array of vocabulary entry IDs.
- **`variants`** *(object)*: Map of phrase variants (e.g. `{"more_formal": "...", "less_formal": "..."}`).

### 3. Curriculum Competency (`schemas/curriculum-competency.schema.json`)
For age-specific learning objectives and discussion themes (not language items).

#### Required Fields
- **`id`** *(string)*: Matching `en:relocation:competency:<slug>`.
- **`objective`** *(string)*: Learning objective or discussion theme.
- **`language`** *(string)*: 2-letter language code.
- **`level`** *(string)*: CEFR level (`A0`–`C2`).
- **`stage`** *(integer)*: Learning stage index.
- **`audience`** *(string)*: Enum `["children", "teens", "adults", "seniors"]`.
- **`domain`** *(string)*: Subject domain.
- **`category`** *(string)*: Free-text category name.

#### Optional Fields
- **`discussion_prompts`** *(string[])*: Array of discussion prompt strings.
- **`related_vocabulary`** *(string[])*: Array of vocabulary entry IDs.
- **`related_functional_phrases`** *(string[])*: Array of functional phrase entry IDs.

---

## Validation & CI Workflow

Every pull request touching content or schemas triggers an automated GitHub Actions validation check (`.github/workflows/validate-vocabulary.yml`).

### What is Checked:
1. **Schema Validation**: Every data file under `vocabulary/`, `functional-phrases/`, and `curriculum/` (excluding `index.json`) is validated against its respective JSON schema.
2. **Index Mapping Integrity**: Every word ID mapped in an `index.json` file is verified to exist within the target theme file it references.
3. **Index Freshness**: Verifies that `index.json` is completely up-to-date by running `npm run build:index` and ensuring no uncommitted differences exist.

PRs touching data must pass these automated checks before merging.
