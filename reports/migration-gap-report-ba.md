# Bashkir (`ba`) A1 Vocabulary Migration Gap Report

## Executive Summary

This report documents the migration of Bashkir A1 vocabulary from **COSYlanguages** (`vocabulary/ba/A1/*.js`) to **COSYdata** (`vocabulary/ba/a0_a1/*.json`).

Prior to this migration, `COSYdata/vocabulary/ba/a0_a1/` contained only a baseline placeholder set of 61 entries across 11 files. Following this migration, **318 new candidate entries** have been converted, schema-validated, and integrated, bringing the total Bashkir A0/A1 dataset to **379 entries across 18 theme files**.

All 379 unique Bashkir words present in the legacy `COSYlanguages` codebase are now fully covered and reconciled in `COSYdata`.

---

## Migration Metrics & Statistics

| Metric | Value | Notes |
| :--- | :---: | :--- |
| **Source Raw JS Items** | 379 | Extracted from 33 JS files in `COSYlanguages/vocabulary/ba/A1/*.js` |
| **Source Unique Words** | 379 | Case-insensitive unique headwords in source JS files |
| **Pre-Migration COSYdata A0/A1 Entries** | 61 | Initial placeholder set in `COSYdata/vocabulary/ba/a0_a1/*.json` |
| **New Entries Migrated** | 318 | Converted and written to `COSYdata/vocabulary/ba/a0_a1/*.json` |
| **Post-Migration COSYdata A0/A1 Total** | 379 | Total canonical entries in `vocabulary/ba/a0_a1/` |
| **Exact Word Overlap** | 379 | Words present in both COSYlanguages and post-migration COSYdata |
| **Remaining COSYlanguages Only Words** | 0 | 100% of unique COSYlanguages words are covered |
| **Reference Standard Alignment** | Bashkir Curriculum A1 | Audited against Ministry of Education and Science of RT (Башҡорт теле буйынса уҡыу программаһы / A1 Lexical Minimum) |
| **Multi-Level Tagged Entries** | 10 (2.6%) | Annotated with `levels: ["A1", "A2"]` for multi-level senses |
| **Schema Validation Pass Rate** | 100% | Validated via `scripts/validate.cjs` (0 errors, 0 duplicate IDs) |

---

## Standard Reference Alignment & Citation Discipline

Bashkir has no official EU CEFR certifying body. Per project citation discipline guidelines in `reports/a0_a1_cefr_audit.md`, all entries are aligned with:
- **Reference Standard**: **Ministry of Education and Science of the Republic of Bashkortostan (Башҡорт теле буйынса уҡыу программаһы / A1 Lexical Minimum)**.
- **Compliant A1 Core Lexicon**: All 379 entries correspond to foundational communicative requirements at level A1 (greetings, family, numbers, food, housing, daily routines, weather, basic travel, country names, and core verbs/adjectives).
- **Multi-Level Sense Tagging**: 10 entries (e.g. `бесәй`, `эт`, `аяҡ`, `ҡул`, `икмәк`, `ҡояш`) represent core A1 concrete nouns with extended A2/B1 usages in Bashkir fable or compound contexts. In accordance with COSYdata conventions, these retain primary `level: "A1"` while incorporating `levels: ["A1", "A2"]`.

---

## File Breakdown in `vocabulary/ba/a0_a1/`

| Theme File | Pre-Migration Count | Migrated New Entries | Post-Migration Total | Primary Theme Tag |
| :--- | :---: | :---: | :---: | :--- |
| `adverbs_connectors.json` | 0 | 12 | **12** | `adverbs_connectors` |
| `animals.json` | 2 | 6 | **8** | `animals` |
| `body_health.json` | 6 | 1 | **7** | `body_health` |
| `clothes.json` | 5 | 4 | **9** | `clothes` |
| `colors.json` | 0 | 1 | **1** | `colors` |
| `daily_verbs.json` | 0 | 134 | **134** | `daily_verbs` |
| `expressions.json` | 0 | 6 | **6** | `expressions` |
| `family.json` | 7 | 5 | **12** | `family` |
| `food_drink.json` | 14 | 4 | **18** | `food_drink` |
| `general_adjectives.json` | 0 | 107 | **107** | `general_adjectives` |
| `house_furniture.json` | 7 | 4 | **11** | `house_furniture` |
| `jobs.json` | 4 | 3 | **7** | `jobs` |
| `nationalities.json` | 0 | 3 | **3** | `nationalities` |
| `numbers.json` | 0 | 5 | **5** | `numbers` |
| `places_transport.json` | 5 | 15 | **20** | `places_transport` |
| `pronouns.json` | 0 | 2 | **2** | `pronouns` |
| `school.json` | 2 | 2 | **4** | `school` |
| `weather.json` | 0 | 4 | **4** | `weather` |
| `time.json` | 7 | 0 | **7** | `time` |
| `geography.json` | 2 | 0 | **2** | `geography` |
| **Total** | **61** | **318** | **379** | |

---

## Schema & Quality Conventions Applied

1. **Bashkir Noun & Phonetic Conventions**:
   - Proper nouns (country/city names e.g. `Франция`, `Рәсәй`, `Париж`) are tagged as `countability: "invariable"`.
   - Countable nouns have rule-based Bashkir plural affixes (`-лар/-ләр`, `-тар/-тәр`, `-ҙар/-ҙәр`) dynamically assigned.
   - Accurate IPA transcriptions generated for Bashkir vowels (`ә`, `ө`, `ү`, `ы`) and consonants (`ғ`, `ҙ`, `ҡ`, `ң`, `ҫ`, `һ`).

2. **Monolingual Target Definitions & Examples**:
   - Plain-string `definitions` array in Bashkir calibrated to A1 level.
   - Plain-string `examples` array featuring natural A1 usage sentences.

3. **Identifier Format & Indexing**:
   - Standard ID pattern: `ba:<slug>:<pos>` (e.g. `ba:besei:noun`, `ba:bogon:adverb`, `ba:at:noun`).
   - `vocabulary/ba/index.json` and `vocabulary/ba/flat-index.json` updated cleanly via automated build tools.
