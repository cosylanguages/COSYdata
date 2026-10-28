# CEFR Taxonomy & Level Alignment Comparative Audit

## Executive Summary
This audit provides a comprehensive comparison of all taxonomy specifications across the COSYlanguages ecosystem (`COSYdata`, `COSYplatform`, `COSYlanguages`, `COSYtools`, `COSYmanuals`, `COSYevents`, and `COSYgames`). It evaluates master taxonomy files (`taxonomy/themes.json`, `taxonomy/levels.json`, `taxonomy/tracks.json`, `taxonomy/crosswalk-themes.json`, `taxonomy/languages.json`), schema files (`schemas/themes.json`, `schemas/vocabulary.schema.json`), runtime definitions (`shared/themes.json`), and live datasets.

---

## 1. Primary Taxonomy Hierarchy (Three-Tier Educational Structure)

The ecosystem establishes a clear, practice-first, educational taxonomy:

```
Level 1: CEFR Proficiency Levels (Primary Category)
 └── Level 2: Lexical Themes / Functional Domains (Secondary Category)
      └── Level 3: Sub-Themes / Situational Scenarios (Tertiary Category)
```

### Level 1: CEFR Proficiency Levels
* **A0 (Pre-A1):** Absolute beginners, formulaic expressions, basic script/alphabet, core numbers, survival phrases.
* **A1 (Breakthrough):** Essential concrete vocabulary, basic everyday needs, personal identity, family, immediate environment.
* **A2 (Waystage):** Elementary social routines, direct exchanges, routine daily life, housing, health, travel basics.
* **B1 (Threshold):** Independent intermediate contexts, work, education, travel problems, opinions, narrative accounts.
* **B2 (Vantage):** Upper-intermediate complex topics, abstract concepts, professional life, social debates, statistics.
* **C1 (Effective Operational Proficiency):** Advanced, nuanced, domain-specific, academic, legal, cultural, and implicit meanings.
* **C2 (Mastery):** Spontaneous, native-like ease, subtle register shifts, irony, stylistic devices, specialized field terminology.

---

## 2. Taxonomy Domain Breakdown & CEFR Level Progression

`taxonomy/themes.json` defines 9 core taxonomy domains comprising **92 primary themes** and **320+ subthemes**:

| Taxonomy Domain | Domain Code | Primary Themes Count | Primary Level Scope | Focus & Educational Objective |
| :--- | :---: | :---: | :---: | :--- |
| **Vocabulary Themes** | `V01–V24` | 24 | A1 → C2 | Topical lexical sets (Family, Housing, Food, Work, Technology, Science). |
| **Lexical Types** | `LT01–LT04` | 4 | A0 → C2 | Axis independent of topic (Word classes, Collocations, Idioms, Academic terms). |
| **Grammar Themes (Core)** | `G01–G14` | 14 | A0 → C2 | Structural progression (Script, Nouns, Pronouns, Tenses, Modality, Syntax). |
| **Grammar Themes (Optional)** | `G15–G20` | 6 | A0 → C2 | Language-specific features (Tones, Classifiers, Vowel Harmony, Screeves). |
| **Speaking Functions** | `S01–S10` | 10 | A1 → C1 | Communicative functions (Social interaction, Opinions, Debate, Monologue). |
| **Writing Text Types** | `W01–W11` | 11 | A1 → C2 | Production formats (Forms, Emails, Essays, Reports, Creative writing). |
| **Receptive Skills** | `R01–R03` | 3 | A1 → C2 | Listening/Reading text types and strategies (Scanning, Gist, Style analysis). |
| **Situational Scenarios** | `SIT01–SIT16` | 16 | A1 → C1 | Real-world tasks (Restaurant, Travel, Hospital, Work meetings, Banking). |
| **Culture & Sociolinguistics** | `C01–C07` | 7 | A1 → C1 | Sociocultural norms, history, registers, taboos, intercultural competence. |
| **Mediation & Learning** | `M01–M02` | 2 | A1 → C1 | Plurilingual mediation, paraphrasing, dictionary skills, autonomous study. |

---

## 3. Comparative Taxonomy Alignment Matrix

Evaluating the consistency between `taxonomy/themes.json`, `schemas/themes.json`, `shared/themes.json`, and live dataset directories (`vocabulary/<lang>/<level>/`):

### A. Theme Naming & Slug Standardization
* **Schema vs. Shared Differences:** `shared/themes.json` includes convenience themes such as `city`, `drinks`, `games`, `history`, `home`, `military`, `music`, `plants`, `space` which map to specific sub-themes in `schemas/themes.json` (e.g., `home` and `housing` both exist in `shared/themes.json`, whereas `schemas/themes.json` standardizes on `housing`).
* **Crosswalk Mapping (`crosswalk-themes.json`):** Successfully maps 46 legacy theme keys (e.g. `clothing`, `money`, `nature`, `shopping`) to taxonomy target codes (`V07`, `V11`, `SIT03`).
* **Unmapped Legacy Keys:** 114 legacy dataset file theme keys (e.g. `B1_idioms_candidates`, `abstract_concepts`, `food_drink`, `body_health`, `art-culture`) are cataloged in `taxonomy/crosswalk-themes.json` for ongoing migration.

### B. Track & Course Availability Rules
* **Allowed at A0–A1:** `general`, `spoken`, `travelling`.
* **Restricted from A0–A1 (A2+ Only):** `professional`, `relocation`, `exam`.

---

## 4. Key Recommendations for Taxonomy Harmonization

1. **Maintain Three-Tier Practice Structure:** Always expose CEFR Levels (`A0`–`C2`) as the entry-point primary cards, followed by primary Lexical Themes and detailed Sub-Themes.
2. **Schema & Index Integration:** Ensure search indexes across all 14 languages maintain `sub_theme` attributes to power fine-grained educational filtering.
3. **Crosswalk Cleanup:** Gradually map dataset theme filenames (`food_drink.json`, `body_health.json`) to canonical taxonomy IDs (`V06`, `V14`) using `taxonomy/crosswalk-themes.json`.
4. **Repository Consistency:** Keep `schemas/themes.json` and `shared/themes.json` synchronized when adding new sub-themes.
