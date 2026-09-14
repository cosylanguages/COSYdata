# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - Unreleased

### Added
- Initial scaffold for `COSYdata` repository.
- Vocabulary schema (`schemas/vocabulary.schema.json`) using JSON Schema draft 2020-12 with form-dependent conditionals (`if`/`then`).
- Initial English vocabulary theme file `vocabulary/en/animals.json` with 10 A1 animal word entries (`cat`, `dog`, `cow`, `horse`, `bird`, `fish`, `mouse`, `pig`, `sheep`, `hen`).
- Index generator script (`scripts/build-index.js`) and `npm run build:index` task to automatically generate `index.json` maps for language directories.
- Validation script (`scripts/validate.js`) verifying vocabulary theme entries against schema and checking index mapping target references.
- GitHub Actions CI workflow (`.github/workflows/validate-vocabulary.yml`) running vocabulary schema validation, index mapping checks, and index freshness checks on PRs.
- Test fixtures in `schemas/examples/` with valid (`valid-noun.json`, `valid-adjective.json`, `valid-verb.json`) and invalid (`invalid-id-format.json`, `invalid-level.json`, `invalid-definitions-empty.json`, `invalid-form-fields.json`) vocabulary entries.
- Shared vocabulary resolver placeholder (`shared/vocab-resolver.js`).
