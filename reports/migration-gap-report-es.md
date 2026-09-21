# COSYdata vs COSYlanguages Spanish A1 Vocabulary Migration Gap Report

## Executive Summary

This report documents the migration gap audit and reconciliation for Spanish A1 vocabulary between **COSYlanguages** (legacy UI application repo) and **COSYdata** (canonical static data repository).

- **Source Dataset:** `COSYlanguages/vocabulary/es/A1/**/*.js` (391 unique terms).
- **Initial Target Dataset:** `COSYdata/vocabulary/es/a0_a1/*.json` (123 existing entries across 12 files).
- **Migrated Dataset:** `COSYdata/vocabulary/es/a0_a1/*.json` (482 canonical entries across 17 thematic files).
- **CEFR Reference Framework:** Instituto Cervantes Plan Curricular del Instituto Cervantes (Nivel A1 / DELE A1).

---

## Migration Statistics & Breakdown

| Category | Count | Percentage | Description / Examples |
| :--- | :---: | :---: | :--- |
| **Initial COSYdata ES Entries** | 123 | — | Baseline vocabulary set prior to intake. |
| **COSYlanguages ES Unique Words** | 391 | 100.00% | Total unique Spanish A1 terms extracted from JS files. |
| **Existing Overlaps Skipped** | 32 | 8.18% | Terms already present in COSYdata (`gato`, `perro`, `madre`, `padre`, `llave`, `silla`, `coche`, `libro`, `bolígrafo`, `sol`, `lluvia`, etc.). |
| **Newly Converted & Migrated Entries** | **359** | **91.82%** | **New qualifying entries converted and integrated into COSYdata.** |
| **Final COSYdata ES Entries** | **482** | — | **Total canonical Spanish A0/A1 vocabulary entries.** |

---

## Thematic File Distribution (Post-Migration)

| Theme JSON File | Pre-Migration Count | Migrated Entries Added | Post-Migration Total |
| :--- | :---: | :---: | :---: |
| `adjectives.json` *(new)* | 0 | 114 | 114 |
| `adverbs_connectors.json` *(new)* | 0 | 10 | 10 |
| `animals.json` | 2 | 4 | 6 |
| `body_health.json` | 7 | 1 | 8 |
| `clothes.json` | 5 | 3 | 8 |
| `expressions.json` | 7 | 2 | 9 |
| `family.json` | 7 | 2 | 9 |
| `food_drink.json` | 14 | 3 | 17 |
| `house_furniture.json` | 37 | 0 | 37 |
| `jobs.json` | 4 | 0 | 4 |
| `nationalities.json` *(new)* | 0 | 14 | 14 |
| `numbers.json` *(new)* | 0 | 2 | 2 |
| `places_transport.json` | 19 | 57 | 76 |
| `school.json` | 13 | 1 | 14 |
| `time.json` | 6 | 2 | 8 |
| `verbs.json` *(new)* | 0 | 143 | 143 |
| `weather.json` | 2 | 1 | 3 |
| **Total** | **123** | **359** | **482** |

---

## CEFR Reference Alignment & Conventions

1. **Instituto Cervantes Plan Curricular A1 Verification:**
   - Every migrated term was evaluated against the Instituto Cervantes Plan Curricular (Nivel A1).
   - Core beginner terms retain primary `level: "A0"` or `"A1"`.
   - Multi-level senses (e.g. `alto`, `bajo`, `bueno`, `malo`, `grande`, `sol`, `lluvia`) are annotated using the `levels` array property (`levels: ["A1", "A2"]`).
2. **Peninsular Spanish Conventions:**
   - Consistent with existing COSYdata Spanish entries, Peninsular Spanish terms and spelling variants were preserved as dominant (e.g. `coche` over `carro`, `autobús` over `colectivo`, `ordenador` over `computadora`).
3. **Noun Countability & Articles:**
   - Nouns include `article` (`el`, `la`, `los`, `las`), `gender` (`masculine`, `feminine`), and `plural_form`.
   - Proper nouns and geographic terms (`España`, `Francia`, `Barcelona`, `Madrid`, `México`) set `countability: "invariable"` or `"uncountable"` and omit `plural_form`.

---

## Verification & Tooling Execution

- `npm run validate`: Passed (575 JSON data files validated against schema, zero duplicate ID collisions).
- `npm run build:index`: Updated `vocabulary/es/index.json` (498 total indexed terms).
- `npm run build:flat-index`: Updated `vocabulary/es/flat-index.json` (615 surface forms indexed).
- `node scripts/audit_vocabulary.cjs`: Passed (updated `reports/content-audit.md`).
- `node scripts/compare_a1_migration_gap.cjs`: Passed (updated `reports/migration-gap-report.md`).

Conclusion: Spanish A0/A1 vocabulary migration is complete, validated, and fully compliant with COSYdata repository standards.
