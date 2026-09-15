# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - Unreleased

### Changed
- Separated CEFR A2 and B1 level vocabulary into dedicated `vocabulary/en/a2/` and `vocabulary/en/b1/` directories:
  - Extracted all 1,361 CEFR A2 vocabulary entries into 37 theme files under `vocabulary/en/a2/`.
  - Extracted all 1,354 CEFR B1 vocabulary entries into 40 theme files under `vocabulary/en/b1/`.
  - Removed extracted A2 and B1 entries from root `vocabulary/en/` theme files (deleting theme files whose entries were 100% A2 or B1).
- Separated A0–A1 level vocabulary into a dedicated `vocabulary/en/a0_a1/` directory:
  - Extracted all 1,581 CEFR A0 and A1 vocabulary entries into 36 theme files under `vocabulary/en/a0_a1/`.
  - Removed A0 and A1 entries from root `vocabulary/en/` theme files (deleting theme files whose entries were 100% A0/A1).
  - Updated `scripts/build-index.cjs` to recursively scan language subdirectories (such as `vocabulary/en/a0_a1/`, `a2/`, `b1/`) and generate relative file paths in `vocabulary/<lang>/index.json`.
- Re-audited and updated all 1,581 CEFR A0/A1 vocabulary entries across 36 theme files in `vocabulary/en/` in single-pass updates:
  - **Definitions**: 1,581 replaced with simple, natural A0/A1-level definitions (present simple only, max one relative clause, no passive voice, no perfect tenses, strictly using known A0/A1 vocabulary).
  - **Examples**: 1,581 updated with 5–8 word everyday concrete usage sentences in present or past simple.
  - **Transcriptions**: 1,581 updated with accurate IPA phonetic transcriptions.
  - **Emoji**: 1,581 updated with representative emoji icons or explicit `no_emoji: true` waivers.
  - **Antonyms**: 1,581 updated with simple A1 opposite terms or explicit `no_antonym: true` waivers.
- Updated countability, plural forms, singular workarounds, and collective notes across 283 flagged noun entries in `vocabulary/en/` according to `/reports/countability-audit.md`:
  - `countable`: 130 entries (corrected naive or incorrect plural forms, added collective notes where appropriate)
  - `uncountable`: 84 entries (removed prohibited plural forms)
  - `pluralia_tantum`: 45 entries (removed prohibited plural forms, added `singular_workaround` phrases such as "a pair of ..." where applicable)
  - `false_plural`: 15 entries (removed prohibited plural forms)
  - `invariable`: 9 entries (removed prohibited plural forms)

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
