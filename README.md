# COSYdata

COSYdata is the canonical, machine-readable data repository and vocabulary hub for the COSY Languages ecosystem, serving standardized dictionary entries, functional phrases, and curriculum competencies across multiple languages via GitHub Pages.

Chuvash (`cv`), Tatar (`tt`), Bashkir (`ba`) and Breton (`br`) currently stop at B2; C1/C2 are intentionally not maintained for those four languages yet.

- **Live Site**: [COSYdata Vocabulary Hub](https://cosylanguages.github.io/COSYdata/)
- **Main Site**: [COSYlanguages Platform](https://cosylanguages.github.io/COSYlanguages/)

---

## Repository Structure

```
COSYdata/
├── vocabulary/               # Vocabulary datasets by language
│   ├── <lang>/               # ISO language directory (en, fr, it, ru, el, es, de, pt, hy, ka, ba, br, cv, tt)
│   │   ├── a0_a1/            # Beginner/A1 vocabulary entries (JSON files by theme)
│   │   ├── a0/, a1/          # Split beginner level dirs used by some languages
│   │   ├── <level>/home/     # Optional nested theme dirs, e.g. a0_a1/home/furniture/
│   │   ├── a2/               # Elementary level vocabulary entries
│   │   ├── b1/               # Intermediate level vocabulary entries
│   │   ├── b2/               # Upper-intermediate level vocabulary entries
│   │   ├── c1/               # Advanced level vocabulary entries (not yet for cv, tt, ba, br)
│   │   ├── c2/               # Proficiency level vocabulary entries (not yet for cv, tt, ba, br)
│   │   ├── index.json        # Maps entry IDs -> relative file path
│   │   ├── flat-index.json   # Maps surface word forms -> entry ID & field references
│   │   ├── search-index.json # Lightweight search index items
│   │   └── themes-index.json # Maps theme & theme/sub_theme -> entry IDs (primary & secondary)
├── functional-phrases/       # Situational phrase datasets by language and level
├── curriculum/               # Competency maps and curriculum guidelines
├── schemas/                  # JSON Schemas (draft 2020-12)
│   ├── vocabulary.schema.json
│   ├── themes.json           # Canonical data taxonomy (46 primary themes, 236 sub-theme pairs); shared/themes.json is the 55-theme display view
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
│   ├── audit-a0-a1.cjs       # CEFR A0-A1 dataset audit tool
│   └── quality-audit.cjs     # Baseline-gated vocabulary quality audit
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
    ├── a0_a1_parity.md       # Multi-language parity status report
    └── quality-baseline.json # Accepted quality debt; new violations fail validation
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
- `transcription` *(string, required by the target quality profile)*: Primary IPA pronunciation transcription. Existing gaps are recorded in `reports/quality-baseline.json`; new entries must supply real IPA.
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
- `concept` *(string, optional)*: Legacy concept key. The data currently contains 80 dotted English keys (e.g., `housing.furniture.chair`) and 2,664 non-English `en:<entry-id>` references; no value is a self-reference. New entries should follow the current optional-English-ID convention in `AGENTS.md`, not the old dotted form.

### Grammar & Morphology
- `article` / `gender` / `countability` / `plural_form` / `partitive` / `contraction`: Grammatical properties for nouns and prepositions.
- `past_tense` / `past_participle` / `present_participle` / `is_irregular` / `prepositions`: Verb conjugation and preposition pattern details.

### Content & Learning Metadata
- `emoji` *(string, required by the target quality profile unless `no_emoji: true`)*: Representative Unicode emoji or symbol. Existing gaps are baselined; new entries must supply an emoji or `no_emoji`.
- `definitions` *(array of strings)*: Clear definition strings in the entry language. Required by the target quality profile; existing gaps are baselined.
- `examples` *(array of strings)*: Example usage sentences in the entry language. Required by the target quality profile; existing gaps are baselined.
- `synonyms` / `antonyms` *(arrays of strings, optional)*: Near-synonyms and opposite terms.
- `domain` *(string, optional)*: Course track tags (`general`, `spoken`, `travel`, `relocation`, `exam`, `professional`).

---

## Build & Validation Commands

```bash
# Run schema and taxonomy validation, index mapping, partitive/contraction checks,
# and the vocabulary quality regression gate
npm run validate

# Check vocabulary quality against the accepted baseline only
npm run quality

# Accept the current quality debt as the baseline (use only after reviewing the diff)
npm run quality:update-baseline

# Build primary index.json and themes-index.json for all language datasets
npm run build:index

# Build all index artifacts (index.json, flat-index.json, search-index.json)
npm run build
```

### Vocabulary quality gate

`schemas/vocabulary.quality.schema.json` is the target quality profile. It requires
definitions and examples, enforces the `lang:slug:form` ID pattern, and restricts
forms and unsafe emoji. Because the repository already has substantial data debt,
`scripts/quality-audit.cjs` records existing violations in
`reports/quality-baseline.json` and fails only when a new violation is introduced.
`npm run quality:update-baseline` is intentionally explicit: it should only be run
after reviewing the new findings.

---

## Daily vocabulary

`index.html` shows "Today in the dictionary": the word, verb, verb + preposition, phrasal verb and
idiom of the day. This repository owns that vocabulary; the other daily elements live where they
belong and the page links out to them.

| Element | Owner |
|---|---|
| Word, verb, verb + preposition, phrasal verb and idiom of the day | COSYdata (`daily/<lang>/calendar/<slot>/YYYY-MM.json`, `daily/<lang>/idioms.json`) |
| Speaking and writing prompts, Daily Challenge | [COSYpractice](https://github.com/cosylanguages/COSYpractice) |
| Fun fact and the hub daily strip | [COSYlanguages](https://github.com/cosylanguages/COSYlanguages) |
| Cultural spotlights | [COSYevents](https://github.com/cosylanguages/COSYevents) |

The page loads the shared hub strip and directory from COSYlanguages
(`https://cosylanguages.github.io/COSYlanguages/js/daily-strip.js`, `.../js/daily-directory.js`) and
mounts the directory with `<div data-daily-directory data-self="data">`. The calendars are prebuilt
monthly by `scripts/build-daily-calendar.cjs`; the vocabulary of the day rotates by date.

Copyright (c) 2025-2026 COSY Languages. All rights reserved.
