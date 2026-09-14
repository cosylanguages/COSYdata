# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - Unreleased

### Added
- Initial scaffold for `COSYdata` repository.
- Vocabulary schema (`schemas/vocabulary.schema.json`) using JSON Schema draft 2020-12 with form-dependent conditionals (`if`/`then`).
- Complete English A0/A1, A2, and B1 vocabulary datasets containing 2,914+ unique words across 74 theme files in `vocabulary/en/` (including `abstract_concepts.json`, `opinions.json`, `cause_effect.json`, `society.json`, `politics.json`, `economy.json`, `science.json`, `environment.json`, `health.json`, `education.json`, `media.json`, `relationships.json`, `culture.json`, `work.json`, `crime.json`, `phrasal_verbs.json`, `idioms.json`, `word_building.json`, `statistics.json`, `register.json`, `abstract_nouns.json`, `verbs_cognition.json`, `geography.json`, `food_health.json`, `sports.json`, `family.json`, `urban_housing.json`, `technology.json`, `communication.json`, `ethics.json`, `global_issues.json`, etc.).
- Index generator script (`scripts/build-index.cjs`) and `npm run build:index` task to automatically generate `index.json` maps for language directories.
- Validation script (`scripts/validate.cjs`) verifying vocabulary theme entries against schema and checking index mapping target references.
- Shared vocabulary resolver client module (`shared/vocab-resolver.js`) providing `resolveVocab` and `hydrateVocabElements` functions with 24h `localStorage` TTL caching and graceful fallback handling.
- Documentation for shared resolver module in `shared/README.md`.
- GitHub Actions CI workflow (`.github/workflows/validate-vocabulary.yml`) running vocabulary schema validation, index mapping checks, and index freshness checks on PRs.
- Test fixtures in `schemas/examples/` with valid (`valid-noun.json`, `valid-adjective.json`, `valid-verb.json`) and invalid (`invalid-id-format.json`, `invalid-level.json`, `invalid-definitions-empty.json`, `invalid-form-fields.json`) vocabulary entries.
