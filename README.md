# COSYdata

COSYdata is the canonical, machine-readable data repository and vocabulary hub for the COSY Languages ecosystem, serving standardized dictionary entries, functional phrases, and curriculum competencies across multiple languages via GitHub Pages.

- **Live Site**: [COSYdata Vocabulary Hub](https://cosylanguages.github.io/COSYdata/)
- **Main Site**: [COSYlanguages Platform](https://cosylanguages.github.io/COSYlanguages/)

---

## Repository Structure

```
COSYdata/
├── vocabulary/               # Vocabulary datasets by language
│   ├── <lang>/               # ISO language directory (en, fr, it, ru, el, es, de, pt, hy, ka, ba, br, cv, tt)
│   │   ├── a0_a1/            # Beginner level vocabulary entries (JSON files by theme)
│   │   ├── a2/               # Elementary level vocabulary entries
│   │   ├── b1/               # Intermediate level vocabulary entries
│   │   ├── b2/               # Upper-intermediate level vocabulary entries
│   │   ├── c1/               # Advanced level vocabulary entries
│   │   ├── c2/               # Proficiency level vocabulary entries
│   │   ├── index.json        # Maps entry IDs -> relative file path
│   │   ├── flat-index.json   # Maps surface word forms -> entry ID & field references
│   │   ├── search-index.json # Lightweight search index items
│   │   └── themes-index.json # Maps theme & theme/sub_theme -> entry IDs (primary & secondary)
├── functional-phrases/       # Situational phrase datasets by language and level
├── curriculum/               # Competency maps and curriculum guidelines
├── schemas/                  # JSON Schemas (draft 2020-12)
│   ├── vocabulary.schema.json
│   ├── themes.json           # Canonical taxonomy (46 themes & sub-themes, secondary_theme enums)
│   ├── functional-phrase.schema.json
│   ├── lesson.schema.json
│   ├── curriculum-competency.schema.json
│   └── examples/             # Valid and invalid test fixtures
├── scripts/                  # Build, validation, and audit scripts
│   ├── validate.cjs          # Validates data against schemas, checks taxonomy and index freshness
│   ├── build-index.cjs       # Generates index.json and themes-index.json
│   ├── build-flat-index.js   # Generates flat-index.json
│   ├── build-search-index.js # Generates search-index.json
│   ├── a0-a1-parity.cjs      # Cross-linguistic parity and benchmark reporting
│   └── audit-a0-a1.cjs       # CEFR A0-A1 dataset audit tool
├── shared/                   # Ecosystem modules and client utilities
│   ├── vocab-resolver.js     # Framework-free client-side word resolver
│   ├── cosy-word-popup.js    # Client-side word popup UI component
│   ├── dictionary-ui.js      # Dictionary browsing UI engine
│   ├── dictionary-ui.css     # Dictionary UI styling
│   └── id-aliases.json       # Retired entry ID redirects map
└── reports/                  # Audit and taxonomy mapping reports
    ├── theme-merges.md       # Proposed theme merge catalog
    ├── multi-theme-audit.md  # 13,615 English entries multi-theme audit summary
    ├── multi-theme-audit.json# Proposed primary/secondary theme and room re-mappings
    └── a0_a1_parity.md       # Multi-language parity status report
```

---

## Vocabulary Entry Fields Specification

Vocabulary entries are JSON objects defined and validated against `schemas/vocabulary.schema.json`.

### Core Identification & Headword
- `id` *(string, required)*: Canonical entry identifier matching `<lang>:<word-slug>:<form>`, e.g., `en:healthy:adjective`.
- `word` *(string, required)*: The target headword term.
- `language` *(string, required)*: 2-letter ISO language code (`en`, `fr`, `it`, `ru`, `el`, etc.).
- `form` *(string, required)*: Grammatical form / part of speech (`noun`, `verb`, `adjective`, `adverb`, `preposition`, `pronoun`, `determiner`, `number`, `phrase`, `idiom`).
- `level` *(string, optional)*: CEFR level (`A0`, `A1`, `A2`, `B1`, `B2`, `C1`, `C2`).
- `levels` *(array of strings, optional)*: All CEFR levels across merged source entries.

### Phonetics & Dialect / Regional Variants
- `transcription` *(string, required for non-contractions)*: Primary IPA pronunciation transcription.
- `transcription_variants` *(object, optional)*: Dialect IPA variants by regional code (`uk`, `us`, `ca`, `au`, `nz`).
- `region` *(array of strings, optional)*: Regional preference tags (`UK`, `US`, `CA`, `AU`, `NZ`, `PT`, `BR`, `EA`, `WA`, `ES`, `LATAM`).
- `regional_equivalents` *(array of strings, optional)*: Array of entry IDs pointing to equivalent terms in other dialects (e.g., `en:apartment:noun` <-> `en:flat:noun`).

### Taxonomy, Housing, & Concept Mapping
- `theme` *(string, optional)*: Primary theme (e.g., `housing`, `actions`, `food`).
- `sub_theme` *(string, optional)*: Primary sub-theme (e.g., `furniture`, `chores`, `daily_life`).
- `secondary_themes` *(array of strings, optional)*: Array of `"theme"` or `"theme/sub_theme"` strings validated against `schemas/themes.json`. `"general"` alone is not permitted as a secondary theme.
- `rooms` *(array of strings, optional)*: Associated rooms or house spaces (`entrance`, `hallway`, `living_room`, `dining_room`, `kitchen`, `pantry`, `bedroom`, `nursery`, `childrens_room`, `bathroom`, `study`, `laundry_room`, `garage`, `basement`, `attic`, `balcony`, `terrace`, `garden`, `storage`, `shared`).
- `verbs` *(array of strings, optional)*: Action verb entry IDs associated with the term (e.g., `["en:clean:verb", "en:wash:verb"]`).
- `see_also` *(array of strings, optional)*: Related entry IDs (e.g., `["en:broom:noun"]`).
- `concept` *(string, optional)*: Language-independent concept key (e.g., `housing.furniture.chair`). *Audit Note*: An audit revealed that all 48 existing `concept` values in `vocabulary/en/` are self-references (pointing to the entry's own ID).

### Grammar & Morphology
- `article` / `gender` / `countability` / `plural_form` / `partitive` / `contraction`: Grammatical properties for nouns and prepositions.
- `past_tense` / `past_participle` / `present_participle` / `is_irregular` / `prepositions`: Verb conjugation and preposition pattern details.

### Content & Learning Metadata
- `emoji` *(string, required unless `no_emoji: true`)*: Representative Unicode emoji or symbol.
- `definitions` *(array of strings, optional)*: Clear definition strings in the entry language.
- `examples` *(array of strings, optional)*: Example usage sentences.
- `synonyms` / `antonyms` *(arrays of strings, optional)*: Near-synonyms and opposite terms.
- `domain` *(string, optional)*: Course track tags (`general`, `spoken`, `travel`, `relocation`, `exam`, `professional`).

---

## Build & Validation Commands

```bash
# Run schema and taxonomy validation, index mapping, and partitive/contraction checks
npm run validate

# Build primary index.json and themes-index.json for all language datasets
npm run build:index

# Build all index artifacts (index.json, flat-index.json, search-index.json)
npm run build
```

Copyright (c) 2025-2026 COSY Languages. All rights reserved.
