# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - Unreleased

### Changed
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
