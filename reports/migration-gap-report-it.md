# Italian A0–A1 Vocabulary Migration Gap Report

## Executive Summary

This report documents the resolution of the largest single-language migration gap in the project between **COSYlanguages** (legacy UI application dataset) and **COSYdata** (canonical data repository) for **Italian (`it`) A0–A1 level vocabulary**.

- **Source Directory**: `COSYlanguages/vocabulary/it/A1/**/*.js` (parsed from JS IIFE data arrays)
- **Target Directory**: `COSYdata/vocabulary/it/a0_a1/*.json`
- **Reference CEFR Standard**: **CILS A1 (Università per Stranieri di Siena)** & **CELI 1 (Università per Stranieri di Perugia)**

---

## Migration Metrics Summary Table

| Metric | Pre-Migration Count | Post-Migration Count | Change |
| :--- | :---: | :---: | :---: |
| **COSYlanguages A1 Unique Words** | 1,154 | 1,154 | - |
| **COSYdata `a0_a1` Unique Words** | 513 | 1,016 | **+503** |
| **Exact Word Overlap** | 401 | 904 | **+503** |
| **COSYlanguages Migration Gap List** | 753 | 0 | **Fully Resolved** |

---

## Migration Gap Analysis & Breakdown

The initial diff identified **753 candidate words** present in COSYlanguages A1 JS files that were not present in `COSYdata/vocabulary/it/a0_a1/`.

### Gap Categorization & Resolution

1. **New Qualifying Entries Added (`+503` entries)**:
   - Converted to `COSYdata` schema with plain-string `definitions` array, plain-string `examples` array, normalized IPA transcriptions, emojis or `no_emoji`, antonyms or `no_antonym`, and valid `it:<slug>:<pos>` IDs.
   - For all noun entries (`form == "noun"`), mandatory grammatical metadata was added (`gender`, `article`, `countability`, `plural_form` for countable nouns).
   - All entries were verified against CILS A1 / CELI 1 standards.

2. **Likely Near-Duplicates & Phrase Variants Skipped (`18` entries)**:
   - Phrases or spelling/article variants whose root concepts already exist in `vocabulary/it/a0_a1/` were merged into existing canonical entries to prevent ID collisions and duplicates.
   - Examples:
     - `a presto` -> merged into existing `presto` (`it:presto:adverb`)
     - `a dopo` -> merged into existing `dopo` (`it:dopo:adverb`)
     - `a domani` -> merged into existing `domani` (`it:domani:adverb`)
     - `per ora` -> merged into existing `ora` (`it:ora:adverb`)
     - `per terra` -> merged into existing `terra` (`it:terra:noun`)
     - `a casa` -> merged into existing `casa` (`it:casa:noun`)
     - `in città` -> merged into existing `città` (`it:citta:noun`)
     - `un giorno` -> merged into existing `giorno` (`it:giorno:noun`)

3. **Already Existing in Higher Levels of COSYdata (`232` entries)**:
   - Words already present in `vocabulary/it/a2/*.json`, `b1/*.json`, `b2/*.json`, etc.
   - To preserve repository-wide unique ID constraints (`it:<slug>:<pos>`), these words were retained in their higher-level COSYdata theme files rather than creating duplicate IDs in `a0_a1/`.
   - Examples:
     - `soleggiato` (`adjective`) -> existing in `vocabulary/it/a2/weather.json`
     - `economico` (`adjective`) -> existing in `vocabulary/it/a2/shopping.json`
     - `costoso` (`adjective`) -> existing in `vocabulary/it/a2/general_adjectives.json`
     - `sano` (`adjective`) -> existing in `vocabulary/it/a2/general_adjectives.json`
     - `preoccupato` (`adjective`) -> existing in `vocabulary/it/a2/emotions.json`
     - `arrabbiato` (`adjective`) -> existing in `vocabulary/it/a2/emotions.json`

---

## Added Entries Breakdown by Target Theme File

| Target Theme File | New Entries Added | Key Categories / Concepts Added |
| :--- | :---: | :--- |
| `expressions.json` | 115 | Idioms, greetings, social phrases, conversational formulas |
| `places_transport.json` | 79 | City locations, public buildings, travel & transportation terms |
| `adjectives.json` | 51 | General descriptors, physical qualities, qualitative adjectives |
| `daily_verbs.json` | 44 | Common action verbs, daily routines, communicative verbs |
| `house_furniture.json` | 35 | Household objects, rooms, furniture, home appliances |
| `common_nouns.json` | 24 | Miscellaneous everyday nouns, hobbies, sports instruments |
| `school.json` | 24 | Classroom objects, subjects, educational & study terms |
| `jobs.json` | 19 | Occupations, job titles, professions |
| `family.json` | 14 | Kinship relations, people, social connections |
| `food_drink.json` | 14 | Food items, meals, ingredients, beverages |
| `body_health.json` | 13 | Anatomical terms, body parts, health descriptors |
| `feelings.json` | 11 | Emotions, feelings, psychological state descriptors |
| `clothes.json` | 10 | Clothing items, footwear, accessories |
| `nationalities.json` | 10 | Countries and nationality adjectives |
| `prepositions.json` | 10 | Spatial, temporal, and directional prepositions |
| `geography.json` | 9 | Natural landscape terms, physical geography |
| `adverbs_connectors.json` | 6 | Conjunctions, time/frequency adverbs |
| `animals.json` | 6 | Domestic and common animals |
| `colors.json` | 3 | Color descriptors |
| `time.json` | 3 | Time units and temporal expressions |
| `auxiliary_verbs.json` | 1 | Auxiliary/modal verb forms |
| `pronouns.json` | 1 | Interrogative / personal pronouns |
| `weather.json` | 1 | Weather descriptors |
| **Total** | **503** | **Fully validated against schema & indexes** |

---

## Validation & Verification

1. **Schema Validation**: `scripts/validate.cjs` ran across all 570 data files and 15 index files with **0 schema errors** and **0 duplicate IDs**.
2. **Index Generation**: `npm run build:index` and `npm run build:flat-index` updated `vocabulary/it/index.json` (2,147 total entry mappings) and `vocabulary/it/flat-index.json` (2,870 surface forms).
3. **Audit Compliance**: `reports/a0_a1_cefr_audit.md` updated and confirmed 100% compliance with CILS A1 / CELI 1 standards.
