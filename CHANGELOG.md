# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - Unreleased

### Changed
- Added synonyms and antonyms for C1 vocabulary entries in Batch 4 (`register.json`, `rhetoric.json`, `science.json`, `society.json`, `sophisticated_adjectives.json`, `synonyms.json`, `time.json`, `word_building.json`, `work.json` — 273 total entries):
  - **Synonyms**: Added 1–3 precise, register-appropriate synonyms across all 273 entries (658 total synonym terms added).
  - **Antonyms**: Added 311 antonym terms for words with genuine opposites; applied `no_antonym: true` to 94 entries with no direct opposite.
- Added synonyms and antonyms for C1 vocabulary entries in Batch 3 (`linking_words.json`, `media.json`, `nuanced_verbs.json`, `opinions.json`, `personality.json`, `phrasal_verbs.json`, `politics.json`, `psychology.json` — 277 total entries):
  - **Synonyms**: Added 1–3 precise, register-appropriate synonyms across all 277 entries (636 total synonym terms added).
  - **Antonyms**: Added 274 antonym terms for words with genuine opposites; applied `no_antonym: true` to 107 entries with no direct opposite.
- Added synonyms and antonyms for C1 vocabulary entries in Batch 2 (`crime.json`, `economy.json`, `education.json`, `emotions.json`, `environment.json`, `ethics.json`, `health.json`, `idioms.json` — 255 total entries):
  - **Synonyms**: Added 1–3 precise, register-appropriate synonyms across all 255 entries (562 total synonym terms added).
  - **Antonyms**: Added 237 antonym terms for words with genuine opposites; applied `no_antonym: true` to 113 entries with no direct opposite.
- Added synonyms and antonyms for C1 vocabulary entries in Batch 1 (`abstract_nouns.json`, `academic_vocabulary.json`, `arts.json`, `business.json`, `collocations.json`, `communication.json`, `comparisons.json`, `conflict.json` — 247 total entries):
  - **Synonyms**: Added 1–3 precise, register-appropriate synonyms across all 247 entries (569 total synonym terms added).
  - **Antonyms**: Added 181 antonym terms for words with genuine opposites; applied `no_antonym: true` to 135 entries with no direct opposite.
- Updated C1 vocabulary entries in Batch 4 (`register.json`, `rhetoric.json`, `science.json`, `society.json`, `sophisticated_adjectives.json`, `synonyms.json`, `time.json`, `word_building.json`, `work.json` — 273 total entries):
  - **Transcription**: Added UK/US dual IPA transcriptions to all 273 entries.
  - **Emoji/Symbol**: Updated emoji/symbol representations across 273 entries (268 with representative single/compound emojis, 5 with `no_emoji: true` waivers for abstract terms).
  - **Countability & Plurals**: Added schema-compliant `countability` and accurate `plural_form` fields to all 114 noun entries (43 countable, 66 uncountable, 5 pluralia_tantum with `singular_workaround`).
- Updated C1 vocabulary entries in Batch 3 (`linking_words.json`, `media.json`, `nuanced_verbs.json`, `opinions.json`, `personality.json`, `phrasal_verbs.json`, `politics.json`, `psychology.json` — 277 total entries):
  - **Transcription**: Added UK/US dual IPA transcriptions to all 277 entries.
  - **Emoji/Symbol**: Updated emoji/symbol representations across 277 entries (249 with representative single/compound emojis, 28 with `no_emoji: true` waivers for functional or abstract terms).
  - **Countability & Plurals**: Added schema-compliant `countability` and accurate `plural_form` fields to all 104 noun entries (51 countable, 50 uncountable, 3 pluralia_tantum with `singular_workaround`).
- Updated C1 vocabulary entries in Batch 2 (`crime.json`, `economy.json`, `education.json`, `emotions.json`, `environment.json`, `ethics.json`, `health.json`, `idioms.json` — 255 total entries):
  - **Transcription**: Added UK/US dual IPA transcriptions to all 255 entries.
  - **Emoji/Symbol**: Updated emoji/symbol representations across 255 entries (253 with representative single/compound emojis, 2 with `no_emoji: true` waivers for abstract terms).
  - **Countability & Plurals**: Added schema-compliant `countability` and accurate `plural_form` fields to all 109 noun entries (31 countable, 74 uncountable, 4 pluralia_tantum with `singular_workaround`).
- Updated C1 vocabulary entries in Batch 1 (`abstract_nouns.json`, `academic_vocabulary.json`, `arts.json`, `business.json`, `collocations.json`, `communication.json`, `comparisons.json`, `conflict.json` — 247 total entries):
  - **Transcription**: Added UK/US dual IPA transcriptions to all 247 entries.
  - **Emoji/Symbol**: Updated emoji/symbol representations across 247 entries (219 with representative single/compound emojis, 28 with `no_emoji: true` waivers for abstract/functional terms).
  - **Countability & Plurals**: Added schema-compliant `countability` and accurate `plural_form` fields to all 147 noun entries (51 countable, 94 uncountable, 2 pluralia_tantum with `singular_workaround`).
- Separated all English CEFR vocabulary entries into dedicated level subdirectories under `vocabulary/en/`:
  - `a0_a1/`: 1,581 A0 and A1 level entries across 36 theme files.
  - `a2/`: 1,361 A2 level entries across 37 theme files.
  - `b1/`: 1,354 B1 level entries across 40 theme files.
  - `b2/`: 1,277 B2 level entries across 37 theme files.
  - `c1/`: 1,052 C1 level entries across 33 theme files.
  - `c2/`: 951 C2 level entries across 20 theme files.
  - Updated `scripts/build-index.cjs` to recursively scan language subdirectories and generate relative file paths in `vocabulary/<lang>/index.json`.
- Converted all 1,581 vocabulary entries in `vocabulary/en/a0_a1/` across 36 theme files from single string transcriptions to dual-accent IPA objects (`{ "uk": "...", "us": "..." }`) verified against standard dictionary sources (RP for UK, General American for US):
  - **Total converted**: 1,581 entries.
  - **Straightforward splits**: 926 entries (original single string accurately represented UK, US, or both).
  - **Actual corrections**: 655 entries (original single string was wrong-accent or inaccurate and required phoneme/accent correction).
- Comprehensive linguistic re-audit of emoji/symbols, antonyms, and countability/plural_form across all 1,581 A0/A1 vocabulary entries in `vocabulary/en/a0_a1/`:
  - **Emoji & Symbols**: Re-evaluated all `no_emoji` waivers; added single emojis, symbols (e.g. directional/preposition arrows `⬆️`, `⬇️`, `👈`, `👉`, gender symbols `♀`/`♂`), or logical 2-unit combinations (e.g. `📅➡️`, `👴👵`). Replaced 1,541 previous `no_emoji: true` waivers with real emojis/symbols. Retained only 15 `no_emoji: true` waivers for purely abstract function words (`and`, `because`, `although`, etc.).
  - **Antonyms**: Re-evaluated all `no_antonym` waivers; added genuine A1 antonyms to common verbs, adjectives, and feelings (e.g., `hate` -> `["love", "like"]`). Replaced 385 previous `no_antonym: true` waivers with real antonym lists. Retained 1,057 `no_antonym: true` waivers for concrete object nouns, proper nouns, and function words with no meaningful opposite.
  - **Countability & Plurals**: Added required `countability` fields to all 824 noun entries in `vocabulary/en/a0_a1/`. Applied linguistically correct irregular/regular plural forms for countable nouns, and marked proper nouns (e.g., `portugal`, country/day/month names) as `countability: "invariable"` with no `plural_form`.
- Updated countability, plural forms, singular workarounds, and collective notes across 283 flagged noun entries in `vocabulary/en/` according to `/reports/countability-audit.md`:
  - `countable`: 130 entries (corrected naive or incorrect plural forms, added collective notes where appropriate)
  - `uncountable`: 84 entries (removed prohibited plural forms)
  - `pluralia_tantum`: 45 entries (removed prohibited plural forms, added `singular_workaround` phrases such as "a pair of ..." where applicable)
  - `false_plural`: 15 entries (removed prohibited plural forms)
  - `invariable`: 9 entries (removed prohibited plural forms)
- Updated transcription, emoji, and countability fields across all 951 entries in `vocabulary/en/c2/` across 20 theme files:
  - **Transcription**: Added dual-accent British (UK) and American (US) IPA objects (`{ "uk": "...", "us": "..." }`) sourced from standard dictionary references for all 951 entries (including full-phrase transcriptions for idioms, proverbs, and multi-word C2 expressions).
  - **Emoji & Symbol**: Evaluated all 951 entries; retained `no_emoji: true` waivers for 736 rare, literary, or formal abstract words (e.g. *perfunctory*, *ubiquitous*, *sui generis*), while adding genuine single emojis, symbols, or combinations to 215 entries with vivid or concrete imagery (e.g. proverbs, idioms, concrete concepts).
  - **Countability & Plurals**: Classified all 311 noun entries in `vocabulary/en/c2/`: 213 abstract/mass nouns as `uncountable` (removing naive plural forms), 96 as `countable` with accurate plural forms, and 2 as `pluralia_tantum` with appropriate `singular_workaround` phrases.

### Added
- Initial scaffold for `COSYdata` repository.
- Vocabulary schema (`schemas/vocabulary.schema.json`) using JSON Schema draft 2020-12 with form-dependent conditionals (`if`/`then`).
- Complete English CEFR A0–C2 general vocabulary and A0–C2 spoken English vocabulary datasets in `vocabulary/en/` (reaching 10,700+ total word entries across 86 theme files). Entries shared between general and spoken courses are tagged with `domain: "general, spoken"`.
- Index generator script (`scripts/build-index.cjs`) and `npm run build:index` task to automatically generate `index.json` maps for language directories.
- Validation script (`scripts/validate.cjs`) verifying vocabulary theme entries against schema and checking index mapping target references.
- Shared vocabulary resolver client module (`shared/vocab-resolver.js`) providing `resolveVocab` and `hydrateVocabElements` functions with 24h `localStorage` TTL caching and graceful fallback handling.
- Documentation for shared resolver module in `shared/README.md`.
- GitHub Actions CI workflow (`.github/workflows/validate-vocabulary.yml`) running vocabulary schema validation, index mapping checks, and index freshness checks on PRs.
- Test fixtures in `schemas/examples/` with valid (`valid-noun.json`, `valid-adjective.json`, `valid-verb.json`) and invalid (`invalid-id-format.json`, `invalid-level.json`, `invalid-definitions-empty.json`, `invalid-form-fields.json`) vocabulary entries.
