# A0–A1 Multilingual Vocabulary Coverage & Parity Audit Report

## Executive Summary

This report delivers a comprehensive audit of **CEFR A0–A1 level vocabulary units, words, phrases, and theme file distributions** across the five primary course languages in `COSYdata`: **English (`en`)**, **French (`fr`)**, **Italian (`it`)**, **Russian (`ru`)**, and **Greek (`el`)**.

---

## 1. Key Audit Findings & Entry Count Distribution

1. **Current Entry Counts Across Languages**:
   - **English (`en`)**: 1,682 entries across 38 files.
   - **French (`fr`)**: 1,094 entries across 38 files.
   - **Italian (`it`)**: 1,113 entries across 38 files.
   - **Russian (`ru`)**: 910 entries across 38 files.
   - **Greek (`el`)**: 794 entries across 38 files.

2. **Core 516 Benchmark Concept Coverage**:
   - The core 516 beginner communicative concepts defined in `intake/a0_a1_fr_it_ru_el/all_languages.csv` are covered across all target datasets (100% in French, 99.4% in Italian, 95.9% in Russian, 91.9% in Greek).

3. **Linguistic Quality Directive**:
   - Automated scripts generating placeholder translations or copying raw English words into non-English files with boilerplate definitions violate linguistic accuracy standards.
   - New entries must be authored with authentic dictionary headwords, real IPA transcriptions, correct grammatical metadata (articles, gender, plurals, verb aspect), natural definitions, and genuine 5–8 word example sentences.

---

## 2. Detailed Theme File Entry Counts Matrix

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
| `idioms.json` | 0 | 0 | 0 | 0 | 0 |
| `jobs.json` | 48 | 27 | 29 | 10 | 13 |
| `measurement.json` | 19 | 10 | 10 | 10 | 10 |
| `money_shopping.json` | 22 | 12 | 13 | 12 | 12 |
| `nationalities.json` | 20 | 72 | 19 | 14 | 21 |
| `numbers.json` | 55 | 30 | 29 | 29 | 29 |
| `objects.json` | 53 | 15 | 15 | 15 | 15 |
| `phrasal_verbs.json` | 10 | 0 | 0 | 0 | 0 |
| `places_transport.json` | 76 | 54 | 54 | 34 | 27 |
| `prepositions.json` | 26 | 18 | 21 | 12 | 12 |
| `pronouns.json` | 51 | 24 | 23 | 22 | 22 |
| `school.json` | 42 | 33 | 30 | 15 | 15 |
| `shapes_materials.json` | 16 | 10 | 10 | 10 | 10 |
| `shopping.json` | 0 | 0 | 0 | 0 | 0 |
| `sports_hobbies.json` | 45 | 12 | 13 | 13 | 15 |
| `technology.json` | 39 | 12 | 12 | 12 | 12 |
| `time.json` | 63 | 45 | 45 | 40 | 38 |
| `transport.json` | 0 | 0 | 0 | 0 | 0 |
| `verbs.json` | 93 | 21 | 20 | 20 | 20 |
| `weather.json` | 26 | 7 | 6 | 11 | 10 |
