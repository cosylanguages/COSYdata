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

Vocabulary entries are identified using a standard colon-separated scheme:

$$\text{\{language\}}:\text{\{word\}}:\text{\{form\}}$$

### Examples:
- `"en:healthy:adjective"`
- `"en:run:verb"`
- `"es:casa:noun"`

---

## Vocabulary File Organization

Vocabulary entries are **batched into theme files** rather than having individual JSON files per word:

```
vocabulary/
└── <lang>/
    ├── index.json
    ├── <theme>.json
    └── ...
```

- **`vocabulary/<lang>/<theme>.json`**: Contains array or map of word entries belonging to a given theme (e.g. `health.json`, `food.json`).
- **`vocabulary/<lang>/index.json`**: Mappings from each word ID to its corresponding theme file.

For example, `vocabulary/en/index.json` maps word IDs to their location:

```json
{
  "en:healthy:adjective": "health.json"
}
```

---

## Vocabulary Entry Fields

Vocabulary entries in theme files follow the schema defined in `schemas/vocabulary.schema.json`. Fields include:

- **`id`** *(string)*: Unique identifier (`language:word:form`).
- **`word`** *(string)*: The canonical word or term.
- **`language`** *(string)*: Language code (e.g., `en`, `es`).
- **`form`** *(string)*: Part of speech or grammatical form (e.g., `adjective`, `noun`, `verb`).
- **`level`** *(string)*: CEFR or difficulty level (e.g., `A1`, `B2`).
- **`emoji`** *(string)*: Representative emoji or icon string.
- **`transcription`** *(string)*: Phonetic pronunciation (e.g., IPA string).
- **`definitions`** *(string[])*: Array of clear definition strings.
- **`examples`** *(string[])*: Array of example sentences demonstrating usage.
- **`gender`** *(string)*: Grammatical gender (where applicable, e.g., `masculine`, `feminine`).
- **`article`** *(string)*: Grammatical article (e.g., `el`, `la`, `der`, `die`, `das`).
- **`plural_form`** *(string)*: Plural form of the word.
- **`comparative`** *(string)*: Comparative form for adjectives or adverbs.
- **`superlative`** *(string)*: Superlative form for adjectives or adverbs.
- **`synonyms`** *(string[])*: Array of synonym word IDs or terms.
- **`antonyms`** *(string[])*: Array of antonym word IDs or terms.
- **`collocations`** *(string[])*: Array of common word pairings or phrases.
- **`related_forms`** *(string[])*: Array of related word IDs or derivative forms.
- **`domain`** *(string)*: Broad subject domain.
- **`theme`** *(string)*: Primary thematic category.
- **`sub_theme`** *(string)*: Sub-thematic classification.
- **`tags`** *(string[])*: Array of searchable tags.
- **`updated`** *(string)*: ISO date or timestamp of last update.

---

## Contribution Guide: How to Add a Word

1. **Locate or Create Theme File**: Find the target language directory (e.g., `vocabulary/en/`) and locate the appropriate `<theme>.json` file (or create a new theme file if one does not exist).
2. **Add Entry**: Add the word entry matching the field structure defined in `schemas/vocabulary.schema.json`.
3. **Update Index**: Update `vocabulary/<lang>/index.json` to map the new word ID (`language:word:form`) to the theme JSON file name.
4. **Validate**: Ensure all JSON files are formatted properly and valid JSON.
5. **Submit PR**: Open a pull request targeting `main`.
