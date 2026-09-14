# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - Unreleased

### Added
- Initial scaffold for `COSYdata` repository.
- Vocabulary schema (`schemas/vocabulary.schema.json`) using JSON Schema draft 2020-12 with form-dependent conditionals (`if`/`then`).
- Complete English A0/A1 vocabulary dataset containing 1,158+ unique words across 34 topics in `vocabulary/en/` (`pronouns.json`, `auxiliary_verbs.json`, `numbers.json`, `time.json`, `colors.json`, `family.json`, `body_health.json`, `clothes.json`, `food_drink.json`, `house_furniture.json`, `animals.json`, `places_transport.json`, `jobs.json`, `school.json`, `technology.json`, `money_shopping.json`, `verbs.json`, `adjectives.json`, `adverbs_connectors.json`, `prepositions.json`, `feelings.json`, `sports_hobbies.json`, `expressions.json`, `nationalities.json`, `weather.json`, `objects.json`, `daily_verbs.json`, `general_adjectives.json`, `shapes_materials.json`, `geography.json`, `directions.json`, `common_nouns.json`, `classroom_phrases.json`, `measurement.json`).
- Index generator script (`scripts/build-index.cjs`) and `npm run build:index` task to automatically generate `index.json` maps for language directories.
- Validation script (`scripts/validate.cjs`) verifying vocabulary theme entries against schema and checking index mapping target references.
- Shared vocabulary resolver client module (`shared/vocab-resolver.js`) providing `resolveVocab` and `hydrateVocabElements` functions with 24h `localStorage` TTL caching and graceful fallback handling.
- Documentation for shared resolver module in `shared/README.md`.
- GitHub Actions CI workflow (`.github/workflows/validate-vocabulary.yml`) running vocabulary schema validation, index mapping checks, and index freshness checks on PRs.
- Test fixtures in `schemas/examples/` with valid (`valid-noun.json`, `valid-adjective.json`, `valid-verb.json`) and invalid (`invalid-id-format.json`, `invalid-level.json`, `invalid-definitions-empty.json`, `invalid-form-fields.json`) vocabulary entries.
