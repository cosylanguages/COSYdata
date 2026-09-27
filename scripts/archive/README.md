# Legacy Scripts Archive

These scripts are preserved for historical reference and record-keeping only. They were used during initial dataset extractions, multi-stage schema migrations, one-off bug fixes, batch processing, and early audit passes.

For active maintenance, validation, and dataset updates in COSYdata, use the active scripts located at the `scripts/` root directory:

* `scripts/validate.cjs` – Main repository validator enforcing JSON schemas, ID uniqueness, theme taxonomy alignment, ID alias resolution, and index freshness. Executed in CI (`.github/workflows/validate-vocabulary.yml`).
* `scripts/audit-a0-a1.cjs` – Linter and audit tool evaluating CEFR A0/A1 data quality and field coverage across all 14 languages (`npm run audit`).
* `scripts/build-index.cjs` – Generates `<category>/<lang>/index.json` maps (`npm run build:index`).
* `scripts/build-flat-index.js` – Generates `vocabulary/<lang>/flat-index.json` mappings (`npm run build:flat-index`).
* `scripts/build-search-index.js` – Generates `vocabulary/<lang>/search-index.json` datasets (`npm run build:search-index`).
* `scripts/import-events-vocab.cjs` – Tool for importing vocabulary entries from COSYevents session feeds (`npm run import:events`).

---

## Folder Summaries

### `archive/migrations/`
Contains per-language and batch migration scripts used during initial extractions to convert legacy COSYlanguages dataset structures into schema-compliant JSON theme files under `vocabulary/`.

* `compare_a1_migration_gap.cjs` – Evaluated coverage gaps between legacy COSYlanguages JS datasets and migrated COSYdata A1 JSON files.
* `migrate_ba_a1_gap.cjs` – Migrated missing Bashkir A1 vocabulary entries into `vocabulary/ba/a0_a1/` JSON files.
* `migrate_ba_a2.cjs` – Extracted and converted Bashkir A2 vocabulary entries into `vocabulary/ba/a2/` JSON files.
* `migrate_batch1.cjs` – Converted Batch 1 legacy vocabulary items into schema-compliant JSON theme files.
* `migrate_batch2.cjs` – Converted Batch 2 legacy vocabulary items into schema-compliant JSON theme files.
* `migrate_batch3.cjs` – Converted Batch 3 legacy vocabulary items into schema-compliant JSON theme files.
* `migrate_batch4.cjs` – Converted Batch 4 legacy vocabulary items into schema-compliant JSON theme files.
* `migrate_batch5.cjs` – Converted Batch 5 legacy vocabulary items into schema-compliant JSON theme files.
* `migrate_batch6.cjs` – Converted Batch 6 legacy vocabulary items into schema-compliant JSON theme files.
* `migrate_br_a1_gap.cjs` – Migrated missing Breton A1 vocabulary gap items into `vocabulary/br/a0_a1/` JSON files.
* `migrate_br_a2.cjs` – Converted Breton A2 vocabulary items into `vocabulary/br/a2/` JSON files.
* `migrate_de_a1.cjs` – Extracted and structured German A1 vocabulary into `vocabulary/de/a0_a1/` JSON files.
* `migrate_de_a2.cjs` – Extracted and structured German A2 vocabulary into `vocabulary/de/a2/` JSON files.
* `migrate_el_a1_gap.cjs` – Migrated Greek A1 vocabulary gap entries into `vocabulary/el/a0_a1/` JSON files.
* `migrate_el_a2.cjs` – Migrated Greek A2 vocabulary entries into `vocabulary/el/a2/` JSON files.
* `migrate_es_a2.cjs` – Migrated Spanish A2 vocabulary entries into `vocabulary/es/a2/` JSON files.
* `migrate_fr_a1.cjs` – Extracted and structured French A1 vocabulary into `vocabulary/fr/a0_a1/` JSON files.
* `migrate_hy_a1.cjs` – Extracted and structured Armenian A1 vocabulary into `vocabulary/hy/a0_a1/` JSON files.
* `migrate_hy_a2.cjs` – Extracted and structured Armenian A2 vocabulary into `vocabulary/hy/a2/` JSON files.
* `migrate_ka_a1_gap.cjs` – Migrated Georgian A1 vocabulary gap entries into `vocabulary/ka/a0_a1/` JSON files.
* `migrate_ka_a2.cjs` – Migrated Georgian A2 vocabulary entries into `vocabulary/ka/a2/` JSON files.
* `migrate_pt_a1_gap.cjs` – Migrated Portuguese A1 vocabulary gap entries into `vocabulary/pt/a0_a1/` JSON files.
* `migrate_pt_a2.cjs` – Migrated Portuguese A2 vocabulary entries into `vocabulary/pt/a2/` JSON files.
* `migrate_ru_a1.cjs` – Extracted and structured Russian A1 vocabulary into `vocabulary/ru/a0_a1/` JSON files.
* `migrate_tt_a1_gap.cjs` – Migrated Tatar A1 vocabulary gap entries into `vocabulary/tt/a0_a1/` JSON files.
* `migrate_tt_a2.cjs` – Migrated Tatar A2 vocabulary entries into `vocabulary/tt/a2/` JSON files.

### `archive/fixes/`
Contains target one-off bugfix scripts executed to patch schemas, ID references, transcription formats, and missing metadata across legacy datasets.

* `fix_bug1.cjs` – Patched missing fields, incorrect entry IDs, and array formatting in early vocabulary migrations.
* `fix_bug2.cjs` – Fixed IPA transcription formats, emoji values, and noun metadata across multi-language datasets.
* `fix_bug3.cjs` – Normalized verb preposition objects and fixed invalid countability properties on non-noun forms.
* `fix_bug4.cjs` – Corrected theme taxonomy keys and resolved duplicate entry IDs across theme files.
* `fix_bug5.cjs` – Patched schema validation discrepancies in example sentence structures and level designations.

### `archive/dataset-builds/`
Contains dataset assembly, batch generation, transformation, and parsing scripts (along with Python helper data modules) used to construct theme JSON files for various levels and specialized tracks.

* `build_greek_dataset.cjs` – Consolidated Greek vocabulary datasets across levels into structured theme files.
* `build_phase2_curated.cjs` – Assembled and validated Phase 2 curated vocabulary entries for intermediate levels.
* `build_relocation_stage2.cjs` – Generated relocation domain vocabulary entries for Stage 2 language tracks.
* `build_ru_a2.py` – Built Russian A2 vocabulary JSON files from Python data definitions (`data_a2/`).
* `build_ru_all.py` – Built Russian A1 vocabulary JSON files from Python data definitions (`data/`).
* `convert-all.cjs` – Converted legacy JS dataset files across multiple languages into COSYdata schema JSON format.
* `data/` – Python module package containing raw Russian A1 vocabulary definitions broken down by thematic parts (`part1` through `part8`).
* `data_a2/` – Python module package containing raw Russian A2 vocabulary definitions broken down by thematic parts (`part1` through `part8`).
* `dataset_batch1.cjs` – Generated Batch 1 themed vocabulary JSON files from raw source items.
* `dataset_batch2.cjs` – Generated Batch 2 themed vocabulary JSON files from raw source items.
* `dataset_batch3.cjs` – Generated Batch 3 themed vocabulary JSON files from raw source items.
* `dataset_batch4.cjs` – Generated Batch 4 themed vocabulary JSON files from raw source items.
* `dataset_batch5.cjs` – Generated Batch 5 themed vocabulary JSON files from raw source items.
* `dataset_batch6.cjs` – Generated Batch 6 themed vocabulary JSON files from raw source items.
* `greek_numbers_time.cjs` – Built Greek numbers, time, and calendar vocabulary entry sets.
* `greek_part1.cjs` – Modular dataset builder for Greek vocabulary Part 1 (basics, daily life).
* `greek_part2.cjs` – Modular dataset builder for Greek vocabulary Part 2 (family, food, house).
* `greek_part3.cjs` – Modular dataset builder for Greek vocabulary Part 3 (places, work, nature).
* `greek_part4.cjs` – Modular dataset builder for Greek vocabulary Part 4 (grammar, adverbs, expressions).
* `parse_and_tag_exam.cjs` – Parsed exam preparation track vocabulary items and assigned `exam_preparation` domains and tags.
* `parse_and_tag_professional.cjs` – Parsed professional track vocabulary items and assigned `professional` domains and tags.

### `archive/checks/`
Contains one-off audit, duplicate merging, example sentence verification, and report generation scripts used during initial dataset consolidation phases.

* `audit_vocabulary.cjs` – Performed linter checks and quality reporting across all vocabulary files prior to `audit-a0-a1.cjs`.
* `generate_and_write_all.cjs` – Generated and updated index files and verified cross-file consistency.
* `generate_ru_report.cjs` – Audited Russian dataset coverage and outputted Russian vocabulary status reports.
* `merge_duplicates.cjs` – Detected duplicate headwords and merged conflicting entry definitions.
* `verify_examples.cjs` – Verified that example sentences contained headwords or root stems.
