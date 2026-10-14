# Georgian (`ka`) A1 Vocabulary Migration Gap Report

## Executive Summary

This report documents the resolution of the A1 vocabulary migration gap for **Georgian (`ka`)** between **COSYlanguages** (legacy UI application repo) and **COSYdata** (canonical static data repository).

- **COSYlanguages Source Directory:** `COSYlanguages/vocabulary/ka/A1/**/*.js`
- **COSYdata Target Directory:** `COSYdata/vocabulary/ka/a0_a1/*.json`
- **Reference Standard:** **National Center for Educational Quality Enhancement & Center for Assessment and Examinations (Georgian as a Foreign Language A1 Standard / ქართული ენა როგორც უცხოური ენა A1)**.

---

## Migration Metrics & Audit Summary

| Metric | Count |
| :--- | :---: |
| **COSYlanguages A1 Unique Headwords** | 387 |
| **COSYdata Baseline A0/A1 Headwords (Pre-Migration)** | 61 |
| **Exact Overlap Baseline** | 61 |
| **Migrated Gap Entries** | 326 |
| **COSYdata Final A0/A1 Headwords (Post-Migration)** | 387 |
| **Duplicate / Skipped Count** | 0 |
| **Target Standard Compliance Ratio** | 100.0% |

---

## Technical & Schema Transformation Discipline

Each migrated entry strictly follows COSYdata's JSON schema directives (`schemas/vocabulary.schema.json`):

1. **ID Convention**: `ka:<slug>:<form>` generated using ASCII transliteration of Georgian characters (e.g. `კატა` -> `ka:kata:noun`, `ყოფნა` -> `ka:qopna:verb`, `მაღალი` -> `ka:magali:adjective`).
2. **Plain String Definitions**: Converted from nested object definitions into plain-string arrays (`definitions: ["..."]`).
3. **Noun Specifications**:
   - `countability`: Assigned `countable` or `invariable` (e.g., proper country/city nouns set to `invariable`).
   - `plural_form`: Included for all countable nouns (e.g. `კატები`, `ძაღლები`).
4. **Antonym Discipline**: Every entry includes either a 1-2 term `antonyms` array or a `no_antonym: true` waiver for concrete nouns, proper nouns, and verbs.
5. **Theme Assignment**: Entries were mapped to appropriate theme JSON files under `vocabulary/ka/a0_a1/` (`daily_verbs.json`, `adjectives.json`, `adverbs_connectors.json`, `feelings.json`, `greetings.json`, `nationalities.json`, `animals.json`, `body_health.json`, `clothes.json`, `family.json`, `food_drink.json`, `house_furniture.json`, `jobs.json`, `places_transport.json`, `school.json`, `time.json`, `weather.json`).

---

## Verification & Freshness

- **Schema Linter (`npm run validate`)**: Executed and passed with **0 errors**.
- **Audit Script (`node scripts/audit_vocabulary.cjs`)**: Executed and updated `reports/content-audit.md`.
- **Global Index (`npm run build:index`)**: Rebuilt mapping index in `vocabulary/ka/index.json`.
- **Flat Surface Index (`npm run build:flat-index`)**: Rebuilt flat index mapping 387 terms in `vocabulary/ka/flat-index.json`.
