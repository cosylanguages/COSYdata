# COSYdata vs COSYlanguages English A1 Vocabulary Migration Gap Report

## Executive Summary

This report documents the migration gap audit and reconciliation for English A1 vocabulary between **COSYlanguages** (legacy UI application repo) and **COSYdata** (canonical data repository).

- **Source Dataset:** `COSYlanguages/vocabulary/en/A1/**/*.js` (1,298 unique words extracted from `window.vocabularyData['en']`, `window.A1_MANUAL_CANON_ADDITIONS`, `window.speakingData`, and `module.exports`).
- **Target Dataset:** `COSYdata/vocabulary/en/a0_a1/*.json` (1,727 canonical entries across 22 thematic JSON files).
- **Audit Outcome:** COSYdata's `vocabulary/en/a0_a1` dataset is a complete superset of COSYlanguages's `vocabulary/en/A1`. All 1,298 unique words from COSYlanguages are fully accounted for in COSYdata. Zero genuine vocabulary gaps were found.
- **Actions Applied:** Added `synonyms` fields to existing COSYdata entries for alternate spelling, accent, and component variants (`cafe`, `yoghurt`, `fries`, `mall`, `shopping center`). Rebuilt repository indexes and verified dataset schemas.

---

## Word List Comparison Breakdown

| Category | Word Count | Percentage | Description / Examples |
| :--- | :---: | :---: | :--- |
| **Exact Matches** | 1,274 | 98.15% | Words matching identically between COSYlanguages and COSYdata. |
| **Capitalization Variants** | 19 | 1.46% | Proper nouns and social phrases lowercase in COSYlanguages, properly capitalized in COSYdata (e.g. `africa` -> `Africa`, `the usa` -> `the USA`, `tv` -> `TV`, `excuse me` -> `Excuse me`). |
| **Composite / Slash Variants** | 3 | 0.23% | Terms represented in COSYdata as slash combinations (`fries` in `chips / fries`, `mall` and `shopping center` in `shopping center / mall`). |
| **Spelling / Accent Variants** | 2 | 0.15% | Alternate spellings (`cafe` vs `café`, `yoghurt` vs `yogurt`). |
| **Genuine Missing Gaps** | **0** | **0.00%** | **Zero missing vocabulary entries in COSYdata.** |
| **Total Analyzed** | **1,298** | **100.00%** | **All unique words in COSYlanguages A1.** |

---

## Detailed Variant Analysis and Mapping

### 1. Capitalization & Formatting Variants (19 Terms)
In COSYlanguages, proper nouns and expressions were stored in lower case. In COSYdata, these entries follow standard capitalization conventions:

- **Proper Nouns / Geographical Names:**
  - `africa` -> `Africa` (`en:africa:noun` in `geography.json`)
  - `america` -> `America` (`en:america:noun` in `geography.json`)
  - `arabic` -> `Arabic` (`en:arabic:noun` in `nationalities.json`)
  - `asia` -> `Asia` (`en:asia:noun` in `geography.json`)
  - `britain` -> `Britain` (`en:britain:noun` in `nationalities.json`)
  - `europe` -> `Europe` (`en:europe:noun` in `geography.json`)
  - `mexico` -> `Mexico` (`en:mexico:noun` in `geography.json`)
  - `portugal` -> `Portugal` (`en:portugal:noun` in `geography.json`)
  - `russian` -> `Russian` (`en:russian:noun` in `nationalities.json`)
  - `scotland` -> `Scotland` (`en:scotland:noun` in `geography.json`)
  - `the usa` -> `the USA` (`en:the-usa:noun` in `places_transport.json`)
  - `wales` -> `Wales` (`en:wales:noun` in `geography.json`)
- **Technology / Abbreviations:**
  - `tv` -> `TV` (`en:tv:noun` in `technology.json`)
- **Expressions & Social Phrases:**
  - `excuse me` -> `Excuse me` (`en:excuse-me:phrase` in `directions.json`)
  - `happy birthday` -> `Happy birthday` (`en:happy-birthday:phrase` in `expressions.json`)
  - `ok` -> `OK` (`en:ok:phrase` in `expressions.json`)
  - `see you` -> `See you` (`en:see-you:phrase` in `expressions.json`)
  - `you're welcome` -> `You're welcome` (`en:you-re-welcome:phrase` in `expressions.json`)
  - `thank you` -> `Thank you` (`en:thank-you:phrase` in `expressions.json`)

### 2. Spelling & Accent Variants (2 Terms)
- `cafe` -> COSYdata entry `en:cafe:noun` in `places_transport.json` uses the canonical accented word `café`. Updated with `"synonyms": ["cafe"]`.
- `yoghurt` -> COSYdata entry `en:yogurt:noun` in `food_drink.json` uses the American spelling `yogurt`. Updated with `"synonyms": ["yoghurt"]`.

### 3. Slash / Option Variants (3 Terms)
- `fries` -> COSYdata entry `en:chips-fries:noun` in `food_drink.json` uses `chips / fries`. Updated with `"synonyms": ["chips", "fries"]`.
- `mall` & `shopping center` -> COSYdata entry `en:shopping-center-mall:noun` in `money_shopping.json` uses `shopping center / mall`. Updated with `"synonyms": ["shopping center", "mall"]`.

---

## Dataset Updates & Maintenance

1. **Vocabulary File Updates:**
   - `vocabulary/en/a0_a1/places_transport.json`: Added `synonyms: ["cafe"]` to `en:cafe:noun`.
   - `vocabulary/en/a0_a1/food_drink.json`: Added `synonyms: ["yoghurt"]` to `en:yogurt:noun`, and `synonyms: ["chips", "fries"]` to `en:chips-fries:noun`.
   - `vocabulary/en/a0_a1/money_shopping.json`: Added `synonyms: ["shopping center", "mall"]` to `en:shopping-center-mall:noun`.
2. **Index Generation:**
   - Rebuilt `vocabulary/en/index.json` (10,797 total English vocabulary entries indexed across all CEFR levels).
   - Rebuilt `vocabulary/en/flat-index.json` (13,905 surface form references indexed).
3. **Audit & Validation Tooling Fixes:**
   - `scripts/audit_vocabulary.cjs`: Updated directory scanning logic to recursively walk level subdirectories (`a0_a1/`, `a2/`, `b1/`, `b2/`, `c1/`, `c2/`) under `vocabulary/en/`.
   - `scripts/compare_a1_migration_gap.cjs`: Updated extraction logic to parse all four COSYlanguages assignment structures (`window.vocabularyData[lang]`, `window.A1_MANUAL_CANON_ADDITIONS`, `window.speakingData`, `module.exports`).

---

## Verification Results

- `npm run validate`: Passed (all schema and unique ID checks passed).
- `node scripts/compare_a1_migration_gap.cjs`: Passed (generated `reports/migration-gap-report.md`).
- `node scripts/audit_vocabulary.cjs`: Passed (generated `reports/content-audit.md`).

Conclusion: COSYdata `vocabulary/en/a0_a1` is complete, fully validated, and ready for production use across consumer applications.
