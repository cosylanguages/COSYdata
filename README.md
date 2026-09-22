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
│       ├── flat-index.json
│       ├── a0_a1/
│       ├── a2/
│       ├── b1/
│       ├── b2/
│       ├── c1/
│       └── c2/
├── functional-phrases/
│   └── <lang>/
├── curriculum/
│   └── <lang>/
└── shared/
    ├── themes.json
    ├── id-aliases.json
    ├── vocab-resolver.js
    └── cosy-word-popup.js
```

- **`vocabulary/<lang>/<level>/<theme>.json`**: Contains array or map of word entries belonging to a given level and theme (e.g. `vocabulary/en/a0_a1/animals.json`, `vocabulary/en/a2/personality.json`, `vocabulary/en/b1/society.json`, `vocabulary/en/b2/business.json`, `vocabulary/en/c1/rhetoric.json`, `vocabulary/en/c2/rare_adjectives.json`).
- **`vocabulary/<lang>/index.json`**: Mappings from each word ID to its relative theme file path (e.g. `"en:cat:noun": "a0_a1/animals.json"`).
- **`vocabulary/<lang>/flat-index.json`**: Pre-computed mapping from lowercased surface forms (`word`, `plural_form`, `comparative`, `superlative`) to an array of matching `{ id, field }` references for fast client-side word detection.
- **`functional-phrases/<lang>/`**: Whole situational sentences and utterances (e.g., relocation phrases).
- **`curriculum/<lang>/`**: Age-specific learning objectives and discussion themes.

### Course Domains & Level Folders
- **`a0_a1/`**: Beginner CEFR A0–A1 level vocabulary files.
- **`a2/`**: Elementary CEFR A2 level vocabulary files.
- **`b1/`**: Intermediate CEFR B1 level vocabulary files.
- **`b2/`**: Upper-Intermediate CEFR B2 level vocabulary files.
- **`c1/`**: Advanced CEFR C1 level vocabulary files.
- **`c2/`**: Mastery CEFR C2 level vocabulary files.

The repository uses the following course domains in the `domain` property (or comma-separated combinations thereof):
- **`general`**: Standard CEFR course vocabulary.
- **`spoken`**: Spoken course vocabulary focused on conversation.
- **`travelling`** (or **`travel`**): Vocabulary for travel, tourism, and navigation.
- **`relocation`**: Vocabulary and functional phrases for moving and living abroad.
- **`exam_preparation`** (or **`exam`**): Exam preparation, rubric, and task-based testing vocabulary.
- **`professional`**: Specialized workplace, academic, and career track vocabulary.

> **Note:** The `professional` and `exam` domains additionally use a `sub_theme`-based track system (registered in `vocabulary/professional-tracks.json` and `vocabulary/exam-tracks.json`). See [`docs/domain-and-tagging-conventions.md`](docs/domain-and-tagging-conventions.md) for full conventions.

To regenerate `index.json` and `flat-index.json` for all language folders, run:

```bash
npm run build:index
npm run build:flat-index
```

---

## Shared Modules & Taxonomies (`shared/`)

The repository provides lightweight, browser-ready ES modules and machine-readable JSON assets served directly over GitHub Pages:

1. **`shared/themes.json`**: Machine-readable canonical taxonomy mapping 29 primary themes to allowed `sub_theme` lists (derived from `docs/theme-taxonomy.md`).
2. **`shared/id-aliases.json`**: Redirect map for retired or renamed vocabulary entry IDs to maintain backwards compatibility across ecosystem apps.
3. **`shared/vocab-resolver.js`**: Resolves vocabulary references (e.g., `en:animals:cat` or `en:cat:noun`) into rendered content, supports alias redirection via `shared/id-aliases.json`, and hydrates HTML elements.
4. **`shared/cosy-word-popup.js`**: Auto-detects recognized vocabulary words in text nodes, opens interactive definition popups with speech audio, and manages a `localStorage`-backed personal dictionary.

### Click-to-Define & Personal Dictionary Example

```html
<script type="module">
  import { resolveVocab } from 'https://cosylanguages.github.io/COSYdata/shared/vocab-resolver.js';
  import { hydrate, createCosyDictionary } from 'https://cosylanguages.github.io/COSYdata/shared/cosy-word-popup.js';

  // Fetch flat index for word auto-detection
  const res = await fetch('https://cosylanguages.github.io/COSYdata/vocabulary/en/flat-index.json');
  const flatIndex = await res.json();

  // Hydrate DOM with word popups and personal dictionary
  hydrate(document.body, {
    lang: 'en',
    matchWord: (word) => flatIndex[word.toLowerCase()],
    resolveEntry: resolveVocab,
    dictionary: createCosyDictionary('my-app'),
  });
</script>
```

See [`shared/README.md`](shared/README.md) for full usage instructions and API details.

---

## Vocabulary Entry Schema & Fields (`schemas/vocabulary.schema.json`)

The repository uses JSON Schema (Draft 2020-12) files in `schemas/` to validate all content:

### 1. Core & General Fields
- **`id`** *(string)*: Unique identifier matching pattern `^[a-z]{2}:[a-z0-9-]+:[a-z0-9-]+$`. Required.
- **`word`** *(string)*: The canonical target word or term. Required.
- **`language`** *(string)*: 2-letter ISO language code (e.g. `en`, `fr`, `ru`). Required.
- **`form`** *(string)*: Grammatical form / part of speech (e.g. `noun`, `verb`, `adjective`, `adverb`, `pronoun`, `preposition`, `number`). Required.
- **`transcription`** *(string)*: Primary or neutral IPA phonetic transcription. Required.
- **`transcription_variants`** *(object)*: Dialect-specific IPA transcriptions (`uk`, `us`, `ca`, `au`, `nz`).
- **`concept`** *(string)*: ID of the corresponding English concept entry (e.g. `"en:dog:noun"`). English entries point to themselves.
- **`theme`** *(string)*: Primary canonical theme name from `shared/themes.json`.
- **`sub_theme`** *(string)*: Sub-theme name allowed for the primary theme in `shared/themes.json`.
- **`secondary_themes`** *(string[])*: Array of canonical theme names for cross-themed words. Must not duplicate `theme`.
- **`sense`** *(string)*: Short slug distinguishing homographs (e.g. `"animal"`, `"food"`).
- **`usage_note`** *(string)*: One short sentence of usage guidance in English.
- **`stress`** *(string)*: Headword with combining acute accent U+0301 on the stressed vowel (used for Russian).
- **`harmony`** *(string)*: Turkic vowel harmony class (`"front"` or `"back"`).
- **`region`** *(string[])*: Preferred region codes (`"UK"`, `"US"`, `"CA"`, `"AU"`, `"NZ"`, `"PT"`, `"BR"`, `"EA"`, `"WA"`, `"ES"`, `"LATAM"`).
- **`emoji`** *(string)*: Representative emoji or symbol (unless waived by `no_emoji: true`).
- **`antonyms`** *(string[])*: Array of antonym terms or IDs (unless waived by `no_antonym: true`).
- **`synonyms`** *(string[])*: Array of synonym terms or IDs (required for CEFR B1–C2 levels).
- **`definitions`** *(string[])*: Monolingual dictionary definitions in the entry's target language.
- **`examples`** *(string[])*: Natural usage sentences containing the headword.
- **`scenario`** *(string)*: Short situational tag (e.g., `"airport check-in"`).
- **`register`** *(string)*: Enum `["formal", "neutral", "informal"]` indicating tone or register.
- **`exam_board`** *(string)*: Free-text exam board or specification name (e.g., `"IELTS"`, `"Cambridge C1 Advanced"`, `"TOEFL"`, `"DELF B2"`, `"Goethe-Zertifikat B1"`, `"TORFL"`, `"Ελληνομάθεια"`).
- **`exam_level`** *(string)*: Specific level or grade within that exam board if distinct from the CEFR `level` field.
- **`transliteration`** *(string)*: Latin-script rendering of the word for non-Latin script languages (e.g., Russian, Greek).

### 2. Noun Fields
- **`countability`** *(string)*: Enum `["countable", "uncountable", "pluralia_tantum", "invariable", "false_plural"]`. Required for nouns.
- **`article`** *(string)*: Definite or indefinite article (e.g., `"der"`, `"la"`, `"l'"`).
- **`gender`** *(string)*: Grammatical gender (e.g., `"masculine"`, `"feminine"`, `"neuter"`).
- **`plural_form`** *(string)*: Plural form (required for countable nouns).
- **`partitive`** *(string)*: Partitive article/form (e.g., `"du"`, `"de la"`, `"del"`).
- **`h_aspire`** *(boolean)*: French aspirate h indicator.
- **`animacy`** *(string)*: Grammatical animacy (`"animate"` or `"inanimate"`).
- **`definite_form`** *(string)*: Definite form of the noun.
- **`genitive_singular`** *(string)*: Genitive singular form.
- **`initial_mutations`** *(object)*: Map of Celtic mutation forms (`soft`, `aspirate`, `spirant`).
- **`case_forms`** *(object)*: Map of case names to noun inflections (`nominative`, `genitive`, `dative`, `accusative`, etc.).

### 3. Verb Fields
- **`past_tense`** *(string)*: Simple past tense form (required for irregular English verbs).
- **`past_participle`** *(string)*: Past participle form.
- **`present_participle`** *(string)*: Present participle (-ing) form.
- **`is_irregular`** *(boolean)*: Indicates irregular verb inflections.
- **`auxiliary`** *(string)*: Auxiliary verb used in compound tenses (e.g. `"être"`, `"sein"`).
- **`conjugation_class`** *(string)*: Conjugation class or paradigm identifier.
- **`stem_change`** *(string)*: Stem vowel change specification (e.g. `"e->ie"`).
- **`separable_prefix`** *(string)*: Separable verb prefix (e.g. `"an"`).
- **`reflexive`** *(boolean)*: Indicates reflexive verb usage.
- **`aspect`** *(string)*: Verbal aspect (`"imperfective"`, `"perfective"`, `"biaspectual"`, `"stative"`, `"action"`, `"both"`).
- **`aspect_pair`** *(string)*: Opposite aspect verb ID or headword form.
- **`motion_type`** *(string)*: Motion verb classification (`"unidirectional"` or `"multidirectional"`).
- **`voice`** *(string)*: Grammatical voice (`"active"`, `"passive"`, `"deponent"`).
- **`present_forms`** *(object)*: Present tense conjugation forms (`sg1`, `sg2`, `sg3`, `sg3m`, `sg3f`, `pl1`, `pl2`, `pl3`).
- **`stems`** *(object)*: Map of stem variants.
- **`negative_form`** *(string)*: Negative verb form.
- **`prepositions`** *(array)*: Objects with `preposition`, `example`, optional `case` (string), and optional `usage` (string).

### 4. Adjective, Pronoun & Determiner Fields
- **`feminine`** *(string)*: Feminine singular form of adjective.
- **`neuter`** *(string)*: Neuter form of adjective.
- **`masculine_plural`** *(string)*: Masculine plural form.
- **`feminine_plural`** *(string)*: Feminine plural form.
- **`plural_form`** *(string)*: General plural form for adjectives.
- **`position`** *(string)*: Position relative to noun (`"before_noun"`, `"after_noun"`, `"either"`).
- **`comparative`** *(string)*: Comparative form.
- **`superlative`** *(string)*: Superlative form.
- **`case_forms`** *(object)*: Case form inflections for pronouns/determiners.
- **`person`** *(integer)*: Grammatical person (`1`, `2`, or `3`).
- **`number`** *(string)*: Grammatical number (`"singular"` or `"plural"`).

### 5. Other Grammatical Forms
- **`governs_case`** *(string | string[])*: Case(s) governed by a preposition or postposition.
- **`person_forms`** *(object)*: Inflected person forms for conjugated prepositions (`sg1`–`pl3`).
- **`value`** *(integer)*: Numeric integer value for `number` entries.

---

## Functional Phrase & Curriculum Competency Schemas

### Functional Phrase (`schemas/functional-phrase.schema.json`)
Whole situational sentences or utterances (e.g. relocation phrases).
- **Required**: `id`, `phrase`, `language`, `level`, `register` (`["formal", "neutral", "informal"]`), `situation`, `domain`.
- **Optional**: `audience`, `translation_notes`, `related_vocabulary`, `variants`.

### Curriculum Competency (`schemas/curriculum-competency.schema.json`)
Age-specific learning objectives and discussion themes.
- **Required**: `id`, `objective`, `language`, `level`, `stage`, `audience` (`["children", "teens", "adults", "seniors"]`), `domain`, `category`.
- **Optional**: `discussion_prompts`, `related_vocabulary`, `related_functional_phrases`.

---

## Validation & CI Workflow

Every pull request touching content or schemas triggers an automated GitHub Actions validation check (`.github/workflows/validate-vocabulary.yml`).

### What is Checked:
1. **Schema Validation**: Every data file under `vocabulary/`, `functional-phrases/`, and `curriculum/` (excluding `index.json`) is validated against its respective JSON schema.
2. **Index Mapping Integrity**: Every word ID mapped in an `index.json` file is verified to exist within the target theme file it references.
3. **Index Freshness**: Verifies that `index.json` is completely up-to-date by running `npm run build:index` and ensuring no uncommitted differences exist.
4. **ID Alias Freshness**: Ensures retired entry IDs listed in `shared/id-aliases.json` do not still exist in active data files.
5. **Taxonomy & Concept Warnings**: Reports non-blocking warnings for unknown themes/sub-themes or unresolvable English concepts.

PRs touching data must pass these automated checks before merging.
