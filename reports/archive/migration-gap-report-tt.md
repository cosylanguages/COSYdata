# Tatar (`tt`) A0–A1 Vocabulary Migration Gap Report

## Executive Summary

This report documents the reconciliation and migration gap closure for Tatar (`tt`) A0–A1 core vocabulary between **COSYlanguages** (`vocabulary/tt/A1/**/*.js`) and **COSYdata** (`vocabulary/tt/a0_a1/*.json`).

Prior to this migration, `COSYdata/vocabulary/tt/a0_a1/` contained a baseline placeholder set of 61 entries across 11 files. Following this migration, **316 new qualifying candidate entries** have been converted, schema-validated, and integrated, bringing the total Tatar A0/A1 dataset to **377 unique entries across 17 theme files**.

All 377 unique Tatar words present in the legacy `COSYlanguages` codebase are now fully covered and reconciled in `COSYdata`.

---

## Source Standard & Citation Discipline

Tatar has no official EU CEFR certifying body. To ensure rigorous, objective level assignments, all entries were verified against the most authoritative published Tatar beginner/foreign-language wordlist:

- **Source Reference**: **G. Ibragimov Institute of Language, Literature and Art of the Academy of Sciences of the Republic of Tatarstan (ИЯЛИ АН РТ — Татар теле буенча лексик минимум A1)**.
- **Citation Discipline**: Cited explicitly per entry in `reports/a0_a1_cefr_audit.md` as `Tatar A1 Minimum (ИЯЛИ АН РТ)`.

---

## Migration Metrics & Statistics

| Metric | Value | Notes |
| :--- | :---: | :--- |
| **Source Raw JS Items** | 453 | Extracted from JS files in `COSYlanguages/vocabulary/tt/A1/**/*.js` |
| **Source Unique Words** | 377 | Case-insensitive unique headwords in source JS files |
| **Pre-Migration COSYdata A0/A1 Entries** | 61 | Initial placeholder set in `COSYdata/vocabulary/tt/a0_a1/*.json` |
| **New Entries Migrated** | 316 | Converted and written to `COSYdata/vocabulary/tt/a0_a1/*.json` |
| **Post-Migration COSYdata A0/A1 Total** | 377 | Total canonical entries in `vocabulary/tt/a0_a1/` |
| **Exact Word Overlap** | 377 | Words present in both COSYlanguages and post-migration COSYdata |
| **Remaining COSYlanguages Only Words** | 0 | 100% of unique COSYlanguages words are covered |
| **CEFR Framework Alignment** | ИЯЛИ АН РТ | Audited against ИЯЛИ АН РТ A1 Lexical Minimum |
| **Schema Validation Pass Rate** | 100% | Validated via `scripts/validate.cjs` (0 errors, 0 duplicate IDs) |

---

## File Breakdown in `vocabulary/tt/a0_a1/`

| Theme File | Pre-Migration Count | Migrated New Entries | Post-Migration Total | Primary Theme Tag |
| :--- | :---: | :---: | :---: | :--- |
| `adverbs_connectors.json` | 0 | 14 | **14** | `adverbs_connectors` |
| `animals.json` | 2 | 6 | **8** | `animals` |
| `body_health.json` | 6 | 1 | **7** | `body_health` |
| `clothes.json` | 5 | 5 | **10** | `clothes` |
| `colors.json` | 0 | 10 | **10** | `colors` |
| `daily_verbs.json` | 0 | 134 | **134** | `daily_verbs` |
| `expressions.json` | 0 | 6 | **6** | `expressions` |
| `family.json` | 7 | 7 | **14** | `family` |
| `food_drink.json` | 14 | 4 | **18** | `food_drink` |
| `general_adjectives.json` | 0 | 98 | **98** | `general_adjectives` |
| `house_furniture.json` | 7 | 1 | **8** | `house_furniture` |
| `jobs.json` | 4 | 3 | **7** | `jobs` |
| `numbers.json` | 0 | 5 | **5** | `numbers` |
| `places_transport.json` | 5 | 15 | **20** | `places_transport` |
| `school.json` | 2 | 3 | **5** | `school` |
| `time.json` | 7 | 0 | **7** | `time` |
| `weather.json` | 2 | 4 | **6** | `weather` |
| **Total** | **61** | **316** | **377** | |

---

## Schema & Quality Conventions Applied

1. **Tatar Lexical Conventions**:
   - Headwords maintain standard Tatar Cyrillic orthography (e.g. `биек`, `укытучы`, `мәче`, `кояш`).
   - Standard ID format: `tt:<slug>:<pos>` (e.g. `tt:biek:adjective`, `tt:uqɯtutʃɯ:noun`, `tt:mache:noun`).
   - Transliterations use standard Cyrillic-to-ASCII mappings for ID slugs.
   - Tatar has no grammatical gender or articles; noun entries omit `article` and `gender`.
   - Noun countabilities (`countable`, `uncountable`, `invariable`) and plural forms (`plural_form`) adhering to Tatar vowel harmony rules (`-лар`/`-ләр`/`-нар`/`-нәр`) are explicitly populated.

2. **Monolingual Target Definitions & Examples**:
   - Plain-string `definitions` array in Tatar calibrated to A1 level.
   - Plain-string `examples` array featuring natural A1 usage sentences containing the entry's headword.

3. **Identifier Format & Indexing**:
   - `vocabulary/tt/index.json` and `vocabulary/tt/flat-index.json` updated cleanly via `scripts/build-index.cjs` and `scripts/build-flat-index.js`.
