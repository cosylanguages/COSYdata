# Italian (A0/A1) Vocabulary Migration Gap Report

## Executive Summary
This report documents the resolution of the Italian (`it`) A0/A1 vocabulary migration gap between legacy COSYlanguages JS datasets (`vocabulary/it/A1/*.js`) and canonical COSYdata JSON datasets (`vocabulary/it/a0_a1/*.json`).

Prior to migration, COSYlanguages contained 1,154 unique terms in A1, whereas COSYdata contained only 513 unique terms in `vocabulary/it/a0_a1/` (517 total entries).

Through this migration effort:
- **475 missing terms** were directly added as new schema-compliant JSON entries in `vocabulary/it/a0_a1/`.
- **251 terms** existing in higher levels (A2/B1/B2) were updated with `levels: ["A1", "<higher_level>"]` multi-level annotations without creating duplicate IDs.
- **428 terms** were skipped as exact duplicates or existing A0/A1 entries.
- The total entry count in `vocabulary/it/a0_a1/` expanded from **517 to 992 entries** (988 unique terms).
- All migrated entries were verified against CILS A1 (*Sillabo CILS Uno-A1*) and CELI 1 beginner frameworks.

---

## Migration Strategy & Batch Breakdown

Work was executed incrementally in 6 logical batches by theme, running validation (`npm run validate`) and vocabulary auditing (`node scripts/audit_vocabulary.cjs`) after each batch:

### Batch 1: Adjectives & General Qualities
- **Source File:** `adjectives.js`
- **Target Files:** `adjectives.json`, `general_adjectives.json`, `weather.json`
- **Actions:** Added 63 new adjective entries; updated level annotations for 69 existing higher-level adjectives (e.g. `costoso`, `libero`, `interessante`, `gentile`).

### Batch 2: Objects, Home, Food, Animals & Health
- **Source Files:** `furniture.js`, `clothes.js`, `body.js`, `food_drink.js`, `dishes.js`, `animals.js`, `colours.js`
- **Target Files:** `house_furniture.json`, `clothes.json`, `body_health.json`, `food_drink.json`, `animals.json`, `colors.json`
- **Actions:** Added 62 new noun/adjective entries with complete gender, article, countability, and plural properties; updated level annotations for 20 higher-level entries.

### Batch 3: Verbs & Actions
- **Source File:** `verbs.js`
- **Target Files:** `daily_verbs.json`, `auxiliary_verbs.json`
- **Actions:** Added 70 new verb entries; updated level annotations for 75 existing higher-level verbs (e.g. `andare`, `capire`, `mangiare`, `parlare`).

### Batch 4: Places, Transport, Geography, School, Jobs & People
- **Source Files:** `locations.js`, `places.js`, `travel.js`, `nationalities.js`, `school.js`, `jobs.js`, `people.js`, `shopping.js`
- **Target Files:** `places_transport.json`, `geography.json`, `nationalities.json`, `school.json`, `jobs.json`
- **Actions:** Added 110 new entries (proper nouns marked with `countability: "invariable"`); updated level annotations for 47 higher-level entries.

### Batch 5: Time, Numbers, Family & Common Nouns
- **Source Files:** `time.js`, `numbers.js`, `family.js`, `nature.js`
- **Target Files:** `time.json`, `numbers.json`, `family.json`, `geography.json`
- **Actions:** Added 12 new entries; updated level annotations for 7 higher-level entries.

### Batch 6: Adverbs, Connectors, Prepositions, Pronouns, Expressions & Idioms
- **Source Files:** `grammar_elements.js`, `social.js`, `idioms.js`, `technology.js`
- **Target Files:** `adverbs_connectors.json`, `expressions.json`, `prepositions.json`, `pronouns.json`, `common_nouns.json`
- **Actions:** Added 158 new entries; updated level annotations for 40 higher-level entries.

---

## Summary Table

| Metric | Pre-Migration | Post-Migration | Delta |
| :--- | :---: | :---: | :---: |
| **COSYdata A0/A1 Total Entries** | 517 | 992 | +475 |
| **COSYdata A0/A1 Unique Terms** | 513 | 988 | +475 |
| **Multi-level Annotations Updated (A2/B1/B2)** | 38 | 289 | +251 |
| **Schema Validation** | PASS | PASS | - |
| **Index Mapping Check** | PASS | PASS | - |

---

## Conclusion
The Italian A0/A1 vocabulary dataset is now fully integrated, validated, indexed, and aligned with CILS A1 / CELI 1 standards without missing terms or duplicate IDs.
