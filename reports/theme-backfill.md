# Vocabulary form-theme backfill — 2026-11-21

## Result

- Files scanned: **1,844**
- Entries changed: **4,815** across **163** form-based files
- Entries without a primary theme before: **4,815**
- Entries without a primary theme after: **0**
- Invalid themes or sub-themes after: **0**

These are broad form-based defaults, not semantic reclassifications. Entries that already had a semantic theme were left untouched.

Final coverage across the non-staging dataset: **32,469 entries**, **0 without a theme**, all **46** primary themes and **235** sub-themes in use.

| Form | Entries | Assigned theme / sub-theme |
| --- | ---: | --- |
| idiom | 2,380 | `communication/general` |
| noun | 806 | `general/miscellaneous` |
| adjective | 792 | `descriptors/general` |
| verb | 580 | `actions/general` |
| phrase | 230 | `communication/general` |
| adverb | 18 | `grammar/adverbs` |
| conjunction | 7 | `grammar/conjunctions_connectors` |
| determiner | 2 | `grammar/general` |
| **Total** | **4,815** | |

## Notes

- The backfill is idempotent: re-running `npm run backfill:form-themes` reports 0 changes.
- Use `npm run backfill:form-themes -- --dry-run` to preview.
- `scripts/validate-theme-normalisation.cjs` now rejects entries without a theme by default. Pass `--allow-missing-theme` only for transitional data.
- The **310 highest-confidence mismatches** were corrected by `scripts/fix-theme-mismatches.cjs`; see `reports/theme-mismatch-corrections.md`.
- The remaining **2,411 mismatches** are split into **1,663 expected form-file mismatches** (`reports/theme-mismatches-form-files.csv`) and **748 semantic review items** (`reports/theme-mismatches-review.csv`). The full snapshot remains in `reports/theme-normalisation-review.csv`.
