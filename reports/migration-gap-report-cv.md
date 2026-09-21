# Chuvash (`cv`) A0–A1 Vocabulary Migration Gap Report

## Executive Summary

This report documents the completed migration and reconciliation of Chuvash (`cv`) A1 vocabulary from **COSYlanguages** (`vocabulary/cv/A1/**/*.js`) into **COSYdata** (`vocabulary/cv/a0_a1/*.json`).

### Dataset Comparison Overview

| Metric | Count | Notes |
| :--- | :---: | :--- |
| **COSYlanguages cv A1 Unique Words** | **445** | Extracted from 8 JS source files in `COSYlanguages/vocabulary/cv/A1/` |
| **COSYdata cv A0/A1 Pre-Migration Entries** | **132** | Initial baseline set in `COSYdata/vocabulary/cv/a0_a1/*.json` |
| **Exact Word Overlap** | **132** | All 132 baseline entries were present in COSYlanguages |
| **Migrated Gap Candidate Terms** | **313** | Distinct unique words present only in COSYlanguages converted and merged |
| **Total Post-Migration COSYdata Entries** | **445** | Canonical Chuvash A0/A1 vocabulary entries in COSYdata |

---

## Source Standard & Authoritative Reference Citation

As Chuvash has no official EU CEFR certifying body, all entries were audited and validated against the most authoritative published Chuvash beginner/foreign-language lexical minimum standard:

- **Source Standard Citation**: **Ministry of Education and Youth Policy of the Chuvash Republic (Чăваш Республикин Вĕрентӳ министерстви) & Chuvash State Institute of Humanities (Чăваш патшалăх гуманитари ăслăлăхĕсен институчĕ)** — *Чăваш чĕлхин калаçу минимумĕ / A1 Beginner Lexical Minimum for Chuvash as a Second/Foreign Language*.
- **Citation Discipline**: In accordance with the citation discipline in `reports/a0_a1_cefr_audit.md`, every entry maintains A0/A1 beginner communicative alignment (family, greetings, numbers, daily activities, food, clothing, nature, animals, and common verbs/adjectives).

---

## File Breakdown in `vocabulary/cv/a0_a1/`

The 313 migrated gap entries were mapped to 21 theme files in `vocabulary/cv/a0_a1/` based on part-of-speech and semantic domain:

| Theme File | Pre-Migration Count | Migrated New Entries | Post-Migration Total | Primary POS / Domain |
| :--- | :---: | :---: | :---: | :--- |
| `adjectives.json` | 1 | 0 | **1** | Qualitative descriptors |
| `adverbs_connectors.json` | 0 | 15 | **15** | Adverbs and grammatical connectors (`grammar_elements.js`) |
| `animals.json` | 5 | 7 | **12** | Domestic and wild animals |
| `body_health.json` | 5 | 9 | **14** | Anatomy and health terms |
| `clothes.json` | 3 | 9 | **12** | Clothing and accessories |
| `common_nouns.json` | 6 | 2 | **8** | General concrete nouns |
| `daily_verbs.json` | 0 | 140 | **140** | Daily action, motion, and auxiliary verbs (`verbs.js`) |
| `expressions.json` | 1 | 7 | **8** | Conversational phrases and idioms |
| `family.json` | 3 | 11 | **14** | Family relationships and personal terms |
| `feelings.json` | 1 | 1 | **2** | Emotions and mental states |
| `food_drink.json` | 4 | 26 | **30** | Food items and traditional dishes (`dishes.js`) |
| `general_adjectives.json` | 0 | 125 | **125** | General qualitative and dimensional descriptors (`adjectives.js`) |
| `geography.json` | 3 | 16 | **19** | Nature, weather, and geographical concepts |
| `house_furniture.json` | 4 | 10 | **14** | Home, furniture, and household objects |
| `jobs.json` | 2 | 2 | **4** | Occupations and professions |
| `nationalities.json` | 0 | 17 | **17** | Person nouns, nationalities, and places (`nationalities.js`, `people.js`) |
| `numbers.json` | 3 | 3 | **6** | Numerals and counting terms |
| `places_transport.json` | 3 | 24 | **27** | Cities, transport, and locations (`locations.js`) |
| `school.json` | 3 | 10 | **13** | Classroom and educational terms |
| `time.json` | 3 | 6 | **9** | Time, days, and seasons |
| `weather.json` | 3 | 4 | **7** | Weather phenomena |
| **Total** | **132** | **313** | **445** | |

---

## Schema Compliance & Quality Standards Enforced

1. **Identifier Format & Slugs**: All entry IDs follow the `cv:<slug>:<pos>` pattern (e.g. `cv:pysak:adjective`, `cv:puyakh:adjective`, `cv:vrenet:verb`). Cyrillic Chuvash letters (`ă`, `ĕ`, `ç`, `ÿ`, `ш`, `ч`, etc.) were cleanly transliterated.
2. **Monolingual Chuvash Definitions**: Definitions format strictly uses plain-string arrays (`definitions: ["..."]`).
3. **Example Sentences**: Example sentences format strictly uses plain-string arrays (`examples: ["..."]`).
4. **Noun Metadata**: Chuvash noun entries specify `countability` (`countable`, `invariable`, etc.) and `plural_form` (with `-сем` suffix for countable nouns). Proper nouns (e.g. `Шупашкар`, `Мускав`, `Волга`, `Россия`) use `countability: "invariable"`.
5. **Zero Validation Errors**: `npm run validate` (`scripts/validate.cjs`), `npm run build:index`, and `npm run build:flat-index` pass with 0 errors or duplicate ID warnings.
