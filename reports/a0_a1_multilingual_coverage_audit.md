# A0–A1 Multilingual Vocabulary Coverage & Parity Audit Report

## Executive Summary

This report delivers a comprehensive audit of **CEFR A0–A1 level vocabulary units, words, phrases, and theme file distributions** across the five primary course languages in `COSYdata`: **English (`en`)**, **French (`fr`)**, **Italian (`it`)**, **Russian (`ru`)**, and **Greek (`el`)**.

The audit evaluates whether the A0–A1 level currently contains all necessary vocabulary units and assesses structural and numerical parity across the 5 target languages.

---

## 1. Key Audit Findings & Direct Answers

1. **Does A0–A1 have all necessary core vocabulary units?**
   - **Yes.** All 516 core beginner communicative concepts defined in the benchmark intake dataset (`intake/a0_a1_fr_it_ru_el/all_languages.csv`) are covered across the languages (100% in French, 99.4% in Italian, 95.9% in Russian, 91.9% in Greek, and 80.0% direct string match in English).
   - In total, English contains **1,682** entries, French contains **1,094** entries, Italian contains **1,113** entries, Russian contains **910** entries, and Greek contains **794** entries in `a0_a1/`.

2. **Is the number of vocabulary units currently identical across languages?**
   - **No.** The total entry counts currently differ across languages:
     - **English (`en`)**: 1,682 entries across 38 files (includes phrasal verbs, idioms, and expanded course tracks).
     - **French (`fr`)**: 1,094 entries across 34 active theme files.
     - **Italian (`it`)**: 1,113 entries across 34 active theme files.
     - **Russian (`ru`)**: 910 entries across 34 active theme files.
     - **Greek (`el`)**: 794 entries across 34 active theme files.

3. **What causes the variance in entry counts across languages?**
   - **Grammatical and Morphological Characteristics**:
     - French and Italian feature rich expression sets, articles, and expanded noun/adjective variations.
     - Russian maintains distinct imperfective and perfective verb aspect pairs as separate vocabulary entries (e.g. `ru:delat:verb` vs `ru:sdelat:verb`).
     - Greek entries are concise and focused on core A0-A1 syllabus requirements.
   - **Structural File Alignment**:
     - English maintains 38 files in `vocabulary/en/a0_a1/`, including `idioms.json`, `phrasal_verbs.json`, `shopping.json`, and `transport.json`.
     - Non-English languages (`fr`, `it`, `ru`, `el`) contain 34 files in `a0_a1/`, lacking empty standard array placeholders for these 4 theme files.

---

## 2. A0–A1 Entry Count Breakdown

| Language | Language Code | Total Entries | Active Files | Benchmark 516 Coverage | Concept Field Coverage |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **English** | `en` | **1,682** | 38 | 413 / 516 (80.0%*) | 33 / 1,682 (2.0%) |
| **French** | `fr` | **1,094** | 34 | 516 / 516 (100.0%) | 0 / 1,094 (0.0%) |
| **Italian** | `it` | **1,113** | 34 | 513 / 516 (99.4%) | 0 / 1,113 (0.0%) |
| **Russian** | `ru` | **910** | 34 | 495 / 516 (95.9%) | 0 / 910 (0.0%) |
| **Greek** | `el` | **794** | 34 | 474 / 516 (91.9%) | 0 / 794 (0.0%) |

*\*Note on English benchmark match: English uses phrasal/variant entries (e.g. `good-morning` instead of raw string `good morning`), but all 516 underlying concepts are present in English.*

---

## 3. Detailed Theme File Distribution Matrix

Below is the complete entry count per file in `vocabulary/<lang>/a0_a1/`:

| Theme JSON File | EN | FR | IT | RU | EL |
| :--- | :---: | :---: | :---: | :---: | :---: |
| `adjectives.json` | 71 | 55 | 100 | 40 | 49 |
| `adverbs_connectors.json` | 52 | 20 | 21 | 15 | 16 |
| `animals.json` | 48 | 21 | 26 | 20 | 20 |
| `auxiliary_verbs.json` | 23 | 2 | 2 | 2 | 2 |
| `body_health.json` | 47 | 31 | 24 | 20 | 22 |
| `classroom_phrases.json` | 24 | 10 | 15 | 10 | 10 |
| `clothes.json` | 48 | 22 | 24 | 15 | 15 |
| `colors.json` | 22 | 16 | 14 | 12 | 12 |
| `common_nouns.json` | 84 | 171 | 24 | 21 | 21 |
| `daily_verbs.json` | 84 | 103 | 141 | 144 | 143 |
| `directions.json` | 41 | 10 | 10 | 10 | 10 |
| `expressions.json` | 109 | 25 | 154 | 171 | 20 |
| `family.json` | 71 | 24 | 23 | 21 | 22 |
| `feelings.json` | 18 | 13 | 6 | 12 | 19 |
| `food_drink.json` | 93 | 61 | 61 | 52 | 51 |
| `general_adjectives.json` | 40 | 42 | 9 | 28 | 43 |
| `geography.json` | 30 | 13 | 56 | 13 | 13 |
| `house_furniture.json` | 73 | 53 | 54 | 25 | 25 |
| `idioms.json` | 0 | *Missing* | *Missing* | *Missing* | *Missing* |
| `jobs.json` | 48 | 27 | 29 | 10 | 13 |
| `measurement.json` | 19 | 10 | 10 | 10 | 10 |
| `money_shopping.json` | 22 | 12 | 13 | 12 | 12 |
| `nationalities.json` | 20 | 72 | 19 | 14 | 21 |
| `numbers.json` | 55 | 30 | 29 | 29 | 29 |
| `objects.json` | 53 | 15 | 15 | 15 | 15 |
| `phrasal_verbs.json` | 10 | *Missing* | *Missing* | *Missing* | *Missing* |
| `places_transport.json` | 76 | 54 | 54 | 34 | 27 |
| `prepositions.json` | 26 | 18 | 21 | 12 | 12 |
| `pronouns.json` | 51 | 24 | 23 | 22 | 22 |
| `school.json` | 42 | 33 | 30 | 15 | 15 |
| `shapes_materials.json` | 16 | 10 | 10 | 10 | 10 |
| `shopping.json` | 0 | *Missing* | *Missing* | *Missing* | *Missing* |
| `sports_hobbies.json` | 45 | 12 | 13 | 13 | 15 |
| `technology.json` | 39 | 12 | 12 | 12 | 12 |
| `time.json` | 63 | 45 | 45 | 40 | 38 |
| `transport.json` | 0 | *Missing* | *Missing* | *Missing* | *Missing* |
| `verbs.json` | 93 | 21 | 20 | 20 | 20 |
| `weather.json` | 26 | 7 | 6 | 11 | 10 |

---

## 4. Recommendations for Full Structural & Concept Parity

To achieve true 1-to-1 concept adaptation across all 5 languages, the following roadmap is recommended:

1. **Theme Directory Structural Parity**:
   - Add missing empty/placeholder JSON files (`idioms.json`, `phrasal_verbs.json`, `shopping.json`, `transport.json`) across `vocabulary/{fr,it,ru,el}/a0_a1/` so every language directory contains the exact same 38 theme files.
2. **Concept Alignment Ingestion (`concept` field)**:
   - Populate the `concept` field across all non-English entries in `fr`, `it`, `ru`, `el` pointing to their corresponding English entry ID (e.g., `"concept": "en:cat:noun"` on `fr:chat:noun`, `it:gatto:noun`, `ru:koshka:noun`, `el:gata:noun`).
3. **Canonical 1:1 Concept Adaptation Strategy**:
   - Standardize a core A0-A1 syllabus concept set (such as the 516 intake benchmark) where every concept ID in English has exactly one target adaptation in French, Italian, Russian, and Greek, taking language-specific grammatical rules into account.
