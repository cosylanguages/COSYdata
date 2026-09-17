# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - Unreleased

### Changed
- Corrected `theme` field values across 54 vocabulary entries in `vocabulary/en/` according to Section 1 of `/reports/theme-domain-regional-audit.md`:
  - `a0_a1/`: 39 entries in `animals.json` corrected from `theme: "animals"` to `weather` (18 entries) or `nature` (21 entries).
  - `a2/`: 15 entries corrected across `environment.json` (3 entries) and `media.json` (12 entries) to accurate `media` or `politics` themes.
- Corrected missing articles before singular countable common nouns in example sentences across all English CEFR level subdirectories in `vocabulary/en/` (58 corrections across 31 theme files):
  - `a0_a1/`: 43 corrections across 18 files (`adjectives.json`, `adverbs_connectors.json`, `animals.json`, `common_nouns.json`, `directions.json`, `feelings.json`, `general_adjectives.json`, `house_furniture.json`, `jobs.json`, `measurement.json`, `money_shopping.json`, `nationalities.json`, `numbers.json`, `objects.json`, `places_transport.json`, `technology.json`, `time.json`, `verbs.json`).
  - `a2/`: 2 corrections across 2 files (`general_adjectives.json`, `work.json`).
  - `b1/`: 5 corrections across 4 files (`expressions.json`, `idioms.json`, `linking_words.json`, `phrasal_verbs.json`).
  - `b2/`: 4 corrections across 3 files (`advanced_verbs.json`, `phrasal_verbs.json`, `work.json`).
  - `c1/`: 3 corrections across 3 files (`collocations.json`, `emotions.json`, `synonyms.json`).
  - `c2/`: 1 correction in 1 file (`rare_adjectives.json`).
- Replaced templated placeholder definitions and example sentences across all 1,277 B2 vocabulary entries in `vocabulary/en/b2/` across 37 theme files with genuine, nuanced B2 definitions and complex 12–18 word example sentences featuring subordinate clauses, passive voice, or reported speech where natural:
  - **Batch 1** (9 files: `academic_vocabulary.json`, `advanced_verbs.json`, `collocations.json`, `communication.json`, `comparisons.json`, `crime.json`, `culture.json`, `economy.json`, `education.json`): 295 entries rewritten.
  - **Batch 2** (9 files: `emotions.json`, `environment.json`, `ethics.json`, `expressions.json`, `general_adjectives.json`, `global_issues.json`, `health.json`, `idioms.json`, `innovation.json`): 350 entries rewritten.
  - **Batch 3** (9 files: `lifestyle.json`, `linking_words.json`, `media.json`, `migration.json`, `nature.json`, `opinions.json`, `personality.json`, `phrasal_verbs.json`, `politics.json`): 335 entries rewritten.
  - **Batch 4** (10 files: `psychology.json`, `register.json`, `relationships.json`, `science.json`, `society.json`, `statistics.json`, `time.json`, `urban_housing.json`, `word_building.json`, `work.json`): 297 entries rewritten.
  - **Total B2 Coverage**: 1,277 entries rewritten with zero remaining templated phrases.
- Added B2-register `synonyms` (1-3 nuanced terms) and `antonyms` (1-2 genuine antonyms or `no_antonym: true` waivers) across all 1,277 B2 vocabulary entries in `vocabulary/en/b2/` across 37 theme files:
  - **Batch 1** (9 files: `academic_vocabulary.json`, `advanced_verbs.json`, `collocations.json`, `communication.json`, `comparisons.json`, `crime.json`, `culture.json`, `economy.json`, `education.json`): 738 synonyms, 377 antonyms, 94 `no_antonym: true` waivers across 295 entries.
  - **Batch 2** (9 files: `emotions.json`, `environment.json`, `ethics.json`, `expressions.json`, `general_adjectives.json`, `global_issues.json`, `health.json`, `idioms.json`, `innovation.json`): 807 synonyms, 413 antonyms, 105 `no_antonym: true` waivers across 350 entries.
  - **Batch 3** (9 files: `lifestyle.json`, `linking_words.json`, `media.json`, `migration.json`, `nature.json`, `opinions.json`, `personality.json`, `phrasal_verbs.json`, `politics.json`): 812 synonyms, 453 antonyms, 76 `no_antonym: true` waivers across 335 entries.
  - **Batch 4** (10 files: `psychology.json`, `register.json`, `relationships.json`, `science.json`, `society.json`, `statistics.json`, `time.json`, `urban_housing.json`, `word_building.json`, `work.json`): 699 synonyms, 338 antonyms, 85 `no_antonym: true` waivers across 297 entries.
  - **Total B2 Coverage**: 3,056 synonyms, 1,581 antonyms, and 360 `no_antonym: true` waivers added across 1,277 entries.
- Comprehensive update of transcription, emoji/symbols, and countability/plurals across all 1,277 vocabulary entries in `vocabulary/en/b2/` across 37 theme files:
  - **Transcriptions**: Sourced and formatted standard dual-accent IPA objects (`{ "uk": "...", "us": "..." }`) for all 1,277 entries from reliable dictionary references (RP for UK, General American for US), providing full-phrase transcriptions for multi-word collocations, idioms, phrasal verbs, and expressions.
  - **Emoji & Symbols**: Evaluated representative emojis, symbols, and combinations across all 1,277 entries; assigned emojis to 1,150 entries and applied `no_emoji: true` waivers to 127 highly abstract, academic, political, analytical, or function terms where forcing an emoji would be misleading.
  - **Countability & Plurals**: Classified and updated all 561 noun entries (`countable`: 352 with correct plural forms, `uncountable`: 183 abstract/mass nouns removing naive plurals, `pluralia_tantum`: 22 with appropriate `singular_workaround` entries where applicable, and `false_plural`: 4).
- Comprehensive update of transcription, emoji/symbols, and countability/plurals across all 1,361 vocabulary entries in `vocabulary/en/a2/` across 37 theme files:
  - **Transcriptions**: Converted all 1,361 entries to dual-accent IPA objects (`{ "uk": "...", "us": "..." }`) sourced from standard learner dictionaries (RP for UK, General American for US), including full phrase transcriptions for multi-word entries.
  - **Emoji & Symbols**: Assigned representative emojis, directional/preposition Unicode symbols, or 2-unit logical combinations across 1,322 entries; set `no_emoji: true` for 39 purely abstract or function/connector words.
  - **Countability & Plurals**: Set `countability` for all 761 noun entries (`countable`: 535, `uncountable`: 212, `pluralia_tantum`: 14 with `singular_workaround` where applicable). Verified that no prohibited `plural_form` fields remain on uncountable or pluralia tantum nouns.
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
- Converted all 1,354 vocabulary entries in `vocabulary/en/b1/` across 40 theme files to dual-accent IPA objects (`{ "uk": "...", "us": "..." }`), updated emoji assignments, and audited noun countability and plural forms:
  - **Transcriptions**: 1,354 entries updated to UK/US IPA objects, including full-phrase transcriptions for phrasal verbs, collocations, and idiom expressions.
  - **Emoji & Symbols**: Audited emoji representations across all 1,354 entries, replacing missing/waiver fields with logically motivated emojis or symbols (0 `no_emoji` waivers retained).
  - **Countability & Plurals**: Added required `countability` and proper `plural_form` fields to all 607 noun entries (329 countable, 257 uncountable, 18 pluralia_tantum, 2 invariable, and 1 false_plural).
- Updated countability, plural forms, singular workarounds, and collective notes across 283 flagged noun entries in `vocabulary/en/` according to `/reports/countability-audit.md`:
  - `countable`: 130 entries (corrected naive or incorrect plural forms, added collective notes where appropriate)
  - `uncountable`: 84 entries (removed prohibited plural forms)
  - `pluralia_tantum`: 45 entries (removed prohibited plural forms, added `singular_workaround` phrases such as "a pair of ..." where applicable)
  - `false_plural`: 15 entries (removed prohibited plural forms)
  - `invariable`: 9 entries (removed prohibited plural forms)
- Rewrote definitions and example sentences across all 1,052 vocabulary entries in `vocabulary/en/c1/` across 33 theme files:
  - **Definitions**: Replaced templated placeholder text with formal, precise definitions highlighting semantic nuance and distinguishing terms from nearest synonyms, or defining figurative meanings for idioms, collocations, and phrasal verbs.
  - **Example Sentences**: Crafting sophisticated 15–20 word example sentences with natural idiomatic phrasing for all 1,052 entries.
- Added `synonyms` and `antonyms` (or `no_antonym: true`) across all 1,052 vocabulary entries in `vocabulary/en/c1/` across 33 theme files:
  - **Synonyms**: Added 1–3 genuine C1-level synonyms per entry matching register and formality across all 1,052 entries.
  - **Antonyms**: Assigned genuine antonyms to 620 entries (e.g. *meticulous* ~ *careless*, *alleviate* ~ *aggravate*) and set `no_antonym: true` for 432 entries (primarily phrasal verbs, idioms, and terms lacking clear direct opposites).
- Updated transcription, emoji, and countability fields across all 951 entries in `vocabulary/en/c2/` across 20 theme files:
  - **Transcription**: Added dual-accent British (UK) and American (US) IPA objects (`{ "uk": "...", "us": "..." }`) sourced from standard dictionary references for all 951 entries (including full-phrase transcriptions for idioms, proverbs, and multi-word C2 expressions).
  - **Emoji & Symbol**: Evaluated all 951 entries; retained `no_emoji: true` waivers for 736 rare, literary, or formal abstract words (e.g. *perfunctory*, *ubiquitous*, *sui generis*), while adding genuine single emojis, symbols, or combinations to 215 entries with vivid or concrete imagery (e.g. proverbs, idioms, concrete concepts).
  - **Countability & Plurals**: Classified all 311 noun entries in `vocabulary/en/c2/`: 213 abstract/mass nouns as `uncountable` (removing naive plural forms), 96 as `countable` with accurate plural forms, and 2 as `pluralia_tantum` with appropriate `singular_workaround` phrases.
  - **Synonyms & Antonyms**: Populated `synonyms` and `antonyms` / `no_antonym` across all 951 entries in `vocabulary/en/c2/`. Added 1–3 precise near-synonyms preserving register and nuance to all 951 entries, added genuine antonym lists to 677 entries, and applied `no_antonym: true` waivers to 274 entries genuinely lacking direct opposites.

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
