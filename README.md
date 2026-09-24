# COSYdata

Welcome to **COSYdata**, the canonical static data repository for the COSYlanguages ecosystem.

## Overview

This repository serves as the **single source of truth** for vocabulary data consumed by other repositories across the COSYlanguages ecosystem (`COSYlanguages`, `COSYmanuals`, `COSYgames`, `COSYtools`, `COSYplatform`).

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

Vocabulary entries are **batched into theme files** organized by CEFR levels in level subdirectories under each language directory:

```
vocabulary/
└── <lang>/
    ├── index.json
    ├── search-index.json
    ├── flat-index.json
    ├── a0_a1/
    │   ├── animals.json
    │   ├── colors.json
    │   ├── family.json
    │   ├── food_drink.json
    │   └── ...
    ├── a2/
    │   ├── animals.json
    │   ├── appearance.json
    │   ├── personality.json
    │   └── ...
    ├── b1/
    │   ├── abstract_concepts.json
    │   ├── cause_effect.json
    │   ├── society.json
    │   └── ...
    ├── b2/
    │   ├── academic_vocabulary.json
    │   ├── business_management.json
    │   └── ...
    ├── c1/
    │   ├── advanced_ethics.json
    │   └── ...
    └── c2/
        ├── philosophy_epistemology.json
        └── ...
```

- **`vocabulary/<lang>/<level>/<theme>.json`**: Level-first directory structure containing array of word entries belonging to a given CEFR level and theme (e.g. `vocabulary/en/a0_a1/animals.json`, `vocabulary/en/a2/personality.json`, `vocabulary/en/b1/society.json`).
- **`vocabulary/<lang>/index.json`**: Mappings from each word ID to its relative theme file path (e.g. `"en:cat:noun": "a0_a1/animals.json"`).
- **`vocabulary/<lang>/search-index.json`**: Lightweight entry array used to populate UI search, browse, and filter views efficiently without needing to load full definitions, examples, collocations, or audio metadata.
- **`vocabulary/<lang>/flat-index.json`**: Fast lookup table mapping word surface forms across language datasets.

### Search Index (`search-index.json`) Shape
Each language folder contains `search-index.json`, an array of lightweight JSON objects formatted with key metadata fields required for quick dictionary browsing and filtering:

```json
[
  {
    "id": "en:cat:noun",
    "word": "cat",
    "emoji": "🐱",
    "level": "A1",
    "form": "noun",
    "theme": "animals",
    "domain": "general, spoken",
    "tags": ["spoken", "beginner"]
  }
]
```

Fields omitted in `search-index.json` to optimize payload size: `definitions`, `examples`, `collocations`, `related_forms`, `audio`, `image`, `antonyms`, `synonyms`, `transcription`, `transcription_variants`.

To regenerate `search-index.json` across all languages, run:

```bash
npm run build:search-index
```

Or run all build tasks (index, flat index, search index) at once with:

```bash
npm run build
```

### Course Domains & Level Folders
- **`a0_a1/`**: Beginner CEFR A0–A1 level vocabulary files across general and spoken courses.
- **`a2/`**: Elementary CEFR A2 level vocabulary files across general and spoken courses.
- **`b1/`**: Intermediate CEFR B1 level vocabulary files across general and spoken courses.
- **`b2/`**: Upper-Intermediate CEFR B2 level vocabulary files across general, professional, and exam courses.
- **`c1/`**: Advanced CEFR C1 level vocabulary files across specialized, academic, and professional domains.
- **`c2/`**: Mastery CEFR C2 level vocabulary files across nuanced, specialized, and domain-specific tracks.

### Course Track Domains (`domain`)
- **`general`**: Standard CEFR course vocabulary for everyday communication.
- **`travelling`**: Travel course vocabulary focused on tourism, transit, and navigation.
- **`relocation`**: Relocation course vocabulary focused on housing, immigration, and settling in a new country.
- **`spoken`**: Spoken course vocabulary focused on informal conversation and oral fluency.
- **`exam_preparation`**: Exam preparation course vocabulary aligned with international proficiency tests (e.g. IELTS, TOEFL, DELF, TORFL).
- **`professional`**: Professional course vocabulary focused on workplace, business, legal, financial, IT, and medical specializations.
- **Multi-domain strings**: Entries can belong to multiple course tracks as a comma-separated list (e.g., `general, relocation, professional`).

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
- **`transcription`** *(string)*: Phonetic pronunciation (e.g., IPA string). Required for every entry at every level.
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

## Definition Guidelines (A0–A1 and A2 Levels)

When creating or revising definitions for vocabulary entries at **A0–A1** and **A2** levels, strictly follow the principles, pattern taxonomy, and grammar guardrails outlined below.

### Core A0–A1 Principles
1. **Clause & Tense Limits**: One relative clause maximum, present simple tense only. No passive voice, no perfect tenses, and no subordinate clauses nested inside relative clauses.
2. **Relative Pronoun Agreement**:
   - `who` for people (e.g., *a person who...*)
   - `that` or `which` for things and animals (e.g., *an animal that...*)
   - `where` for physical locations only (e.g., *a place where...*)
   - `when` for time (e.g., *a time when...*)
3. **Vocabulary Level Constraint**: Never define a word using a harder word than itself. If an A1 definition requires a B1 word, simplify the wording or choose a different pattern.
4. **Avoid Self-Reference**: Never use self-referential phrases like *"a word that means..."*. Always define the real-world concept or object directly.

### Pattern Library by Category (A0–A1)

| Category | Reusable Frame / Pattern | Example |
| :--- | :--- | :--- |
| **People / Professions / Roles** | `"a person who [verb]s"`<br>`"a person whose job is to [verb]"`<br>`"a person in your family who..."` | **teacher**: *a person who teaches children.*<br>**doctor**: *a person whose job is to help sick people.*<br>**mother**: *a woman who has a child.* |
| **Animals** | `"an animal that [verb]s"`<br>`"a small/big animal with [feature]"`<br>`"an animal people keep at home"` | **fish**: *an animal that lives in water.*<br>**bird**: *an animal with wings that can fly.*<br>**pet**: *an animal that lives with people in their house.* |
| **Places** | `"a place where people [verb]"`<br>`"a place where you can [verb]"`<br>`"a room where you [verb]"` | **school**: *a place where children learn.*<br>**shop**: *a place where you can buy things.*<br>**kitchen**: *a room where you cook food.* |
| **Things / Objects** | `"a thing you use to [verb]"`<br>`"a thing you [verb] on/in/with"`<br>`"a thing that [verb]s"` | **pen**: *a thing you use to write.*<br>**chair**: *a thing you sit on.*<br>**clock**: *a thing that shows the time.* |
| **Food & Drink** | `"a food made from [ingredient]"`<br>`"a drink made from [ingredient]"`<br>`"a sweet food people eat"` | **bread**: *a food made from flour.*<br>**tea**: *a drink made from hot water and leaves.*<br>**cake**: *a sweet food people eat on birthdays.* |
| **Clothes** | `"a thing you wear on your [body part]"` | **hat**: *a thing you wear on your head.*<br>**shoes**: *things you wear on your feet.* |
| **Time Words** | `"a time when [clause]"`<br>`"the day before/after [day]"`<br>`"a part of the day when..."` | **morning**: *a time when the day starts.*<br>**Tuesday**: *the day after Monday.*<br>**evening**: *a part of the day when the sun goes down.* |
| **Feelings / Emotions** | `"how you feel when [clause]"`<br>`"how you feel when you [verb]"` | **happy**: *how you feel when something good happens.*<br>**tired**: *how you feel when you need to sleep.* |
| **Verbs (Actions)** | `"to [do something] using [body part/tool]"`<br>`"when you [verb1], you [verb2]"`<br>`"to make [something] [happen]"` | **walk**: *to move using your legs.*<br>**eat**: *when you eat, food goes into your mouth.*<br>**open**: *to make something no longer closed.* |
| **Adjectives (Qualities)** | `"opposite of [known antonym]"` *(reuse `antonyms` field)*<br>`"how [something] is when [clause]"` | **small**: *the opposite of big.*<br>**hot**: *how food or weather is when it has a lot of heat.* |
| **Colors** | `"the color of [common concrete thing]"` | **red**: *the color of blood, or a tomato.*<br>**green**: *the color of grass.* |
| **Numbers** | `"the number after/before [number]"`<br>`"the number you get when you count [set]"` | **six**: *the number after five.*<br>**ten**: *the number of your fingers.* |
| **Family** | `"a person in your family who is [relation]"` | **sister**: *a girl or woman who has the same parents as you.* |
| **Function Words** | Short functional gloss instead of full relative clause. | **where**: *asks about a place.*<br>**who**: *asks about a person.*<br>**in**: *shows that something is inside another thing.*<br>**and**: *joins two words or ideas together.* |

### Grammar Guardrails
- **Relative Pronoun Agreement**: Enforce strict agreement (`who` for people only, `where` for concrete physical locations only—do not use `where` for abstract situations).
- **Single Relative Clause Limit**: Reject sentences with nested relative clauses (e.g., *"a person who teaches children who go to primary school"* is B1-structured).
- **Circularity Prevention**: Do not use a word inside a definition (e.g., using *teaches* to define *teacher*) unless that word itself is introduced at $\le$A1 level.

### A2 Shift
At the **A2 level**, rigid pattern scaffolding (`"a thing that..."`) is dropped in favor of natural, dictionary-style definitions using simple A1–A2 vocabulary:
- **Structure**: Can use up to two clauses joined by `and` or `or`.
- **Purpose Constructions**: `"used for/to"` constructions are permitted.
- **Abstraction**: Mild abstraction is allowed while keeping inner vocabulary strictly $\le$A2.

**Comparison Examples**:
- **A1**: *restaurant* — a place where you eat food.
- **A2**: *restaurant* — a place where you pay to eat a meal that someone else cooks for you.
- **A1**: *angry* — how you feel when something bad happens.
- **A2**: *angry* — feeling strong displeasure about something someone did wrong.

---

## Contribution Guide: How to Add a Word

1. **Locate or Create Theme File**: Find the target language and level directory (e.g., `vocabulary/en/a0_a1/`, `vocabulary/en/a2/`, `vocabulary/en/b1/`) and locate the appropriate `<theme>.json` file (or create a new theme file if one does not exist).
2. **Add Entry**: Add the word entry matching the schema defined in `schemas/vocabulary.schema.json`. Ensure definitions follow the [Definition Guidelines (A0–A1 and A2 Levels)](#definition-guidelines-a0a1-and-a2-levels).
3. **Regenerate Index**: Run `npm run build:index` to update `vocabulary/<lang>/index.json` with the new word ID mapping.
4. **Validate**: Run local validation (`npm run validate` after installing dependencies) to ensure all JSON files pass validation.
5. **Submit PR**: Open a pull request targeting `main`.
