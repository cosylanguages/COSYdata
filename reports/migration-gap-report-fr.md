# French (`fr`) A0–A1 Vocabulary Migration Gap Reconciliation Report

## Executive Summary

This report documents the reconciliation and migration gap closure for French (`fr`) A0–A1 core vocabulary between intake candidate sources and **COSYdata** (canonical static data repository).

Prior to this reconciliation, `COSYdata/vocabulary/fr/a0_a1/` contained 966 entries (964 unique words). Following a comprehensive extraction and diffing of candidate A0/A1 vocabulary lists (including `intake/a0_a1_fr_it_ru_el/french.csv` and previous intake iterations) against `COSYdata/vocabulary/fr/a0_a1/*.json` and all level directories:
- **12 missing candidate terms** were extracted from the intake dataset.
- **12 terms** were evaluated against the **DELF A1 (France Éducation International)** reference standard.
- All qualifying candidate entries were converted to schema-compliant entries and added to `COSYdata/vocabulary/fr/a0_a1/*.json`.

Following this reconciliation, `COSYdata/vocabulary/fr/a0_a1/` contains **978 total entries** (976 unique words), achieving complete coverage with zero schema errors or linter failures.

---

## 1. Candidate Extraction & Gap Analysis

The candidate list from `intake/a0_a1_fr_it_ru_el/french.csv` was diffed against `COSYdata/vocabulary/fr/a0_a1/*.json`. Out of 516 rows, 504 terms already existed in COSYdata A0/A1. The remaining 12 terms were evaluated across all French level directories to check for duplicates, level placement, or multi-level scope.

---

## 2. DELF A1 Evaluation & Multi-Level Alignment

Each candidate term was verified against the **DELF A1 (France Éducation International)** curriculum and standards:

1. **`comment ça va`** (`phrase`) -> Added to `expressions.json` (`fr:comment-ca-va:phrase`). Essential informal greeting at DELF A1.
2. **`habiter`** (`verb`) -> Added to `daily_verbs.json` (`fr:habiter:verb`). Core DELF A1 verb for expressing residence/location.
3. **`aimer bien`** (`verb`) -> Added to `daily_verbs.json` (`fr:aimer-bien:verb`). Core DELF A1 verb expression for moderate preference.
4. **`tôt`** (`adverb`) -> Added to `adverbs_connectors.json` (`fr:tot:adverb`). Fundamental temporal adverb at DELF A1.
5. **`tard`** (`adverb`) -> Added to `adverbs_connectors.json` (`fr:tard:adverb`). Fundamental temporal adverb at DELF A1.
6. **`loin`** (`adverb`) -> Added to `adverbs_connectors.json` (`fr:loin:adverb`). Spatial adverb at DELF A1.
7. **`ventre`** (`noun`) -> Added to `body_health.json` (`fr:ventre:noun`). Basic body part vocabulary at DELF A1.
8. **`infirmier`** (`noun`) -> Added to `jobs.json` (`fr:infirmier-1:noun`). Standard male profession term matching existing female counterpart (`infirmière`). Multi-level `levels: ["A1", "A2"]` specified.
9. **`ouvrier`** (`noun`) -> Added to `jobs.json` (`fr:ouvrier:noun`). Common profession term at DELF A1.
10. **`de`** (`preposition`) -> Added to `prepositions.json` (`fr:de:preposition`). Essential structural preposition at DELF A1.
11. **`à propos de`** (`preposition`) -> Added to `prepositions.json` (`fr:a-propos-de:preposition`). Key topic preposition at DELF A1.
12. **`nombre`** (`noun`) -> Added to `numbers.json` (`fr:nombre:noun`). Basic mathematical/counting noun at DELF A1.

---

## 3. Summary of Migrated Entries by File

| Target Theme File | New Entries Added | Added Word(s) |
| :--- | :---: | :--- |
| `expressions.json` | 1 | `comment ça va` |
| `daily_verbs.json` | 2 | `habiter`, `aimer bien` |
| `adverbs_connectors.json` | 3 | `tôt`, `tard`, `loin` |
| `body_health.json` | 1 | `ventre` |
| `jobs.json` | 2 | `infirmier`, `ouvrier` |
| `prepositions.json` | 2 | `de`, `à propos de` |
| `numbers.json` | 1 | `nombre` |
| **Total** | **12** | |

---

## 4. Final Dataset Metrics

| Metric | Pre-Migration | Post-Migration | Change |
| :--- | :---: | :---: | :---: |
| **Total Entries in `vocabulary/fr/a0_a1/`** | 966 | **978** | +12 |
| **Unique Words in `vocabulary/fr/a0_a1/`** | 964 | **976** | +12 |
| **Index Entries (`vocabulary/fr/index.json`)** | 1,714 | **1,726** | +12 |
| **Flat Index Forms (`vocabulary/fr/flat-index.json`)** | 2,282 | **2,294** | +12 |
| **Schema Validation (`scripts/validate.cjs`)** | Pass | **Pass** | Clean |
| **Audit Check (`scripts/audit_vocabulary.cjs`)** | Pass | **Pass** | Clean |

---

## 5. Conclusion

The French (`fr`) A0–A1 vocabulary migration gap reconciliation is complete. All 12 missing candidate terms from intake datasets have been incorporated into `vocabulary/fr/a0_a1/` with full schema compliance and validated against DELF A1 reference standards.
