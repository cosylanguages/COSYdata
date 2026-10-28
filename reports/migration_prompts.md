# COSY Ecosystem Cross-Repository Task Prompts for Jules

This document provides copy-pasteable prompt instructions for invoking Jules in sister repositories across the COSY ecosystem (`COSYmanuals`, `COSYplatform`, `COSYtools`, `COSYevents`, and `COSYgames`). These prompts ensure consistent taxonomy alignment, repository domain boundaries, and monolingual learning standards.

---

## 1. Prompt for COSYmanuals (Grammar & Communication Manuals)

```text
Please align COSYmanuals content structure and taxonomy indexing with the master COSY taxonomy definitions:

1. Repository Domain Scope:
   - COSYmanuals owns written reference manuals for Grammar (domains G01–G20) and Communication (domains S01–S10 speaking functions, W01–W11 writing text types).
   - Ensure all grammar and communication manual files are organized under manuals/<lang>/<level>/grammar/ and manuals/<lang>/<level>/communication/.

2. CEFR Level & Topic Alignment:
   - Ensure folder structure follows ISO 639-1 language code -> CEFR level (A0–C2) -> topic.
   - Verify that all grammar lesson links reference valid COSYmanuals URLs ({ topic_id, manual_url }).

3. Monolingual Learning Standard:
   - Use monolingual target-language explanations and visual cues/emojis where applicable.

4. Verification:
   - Run local validation or linting scripts to verify manual link resolution.
```

---

## 2. Prompt for COSYplatform (Interactive Learning & Course Platform)

```text
Please update COSYplatform course curriculums and lesson activities to enforce ecosystem taxonomy boundaries:

1. Repository Domain Scope:
   - COSYplatform owns interactive course roadmaps, lesson activities, situational scenarios (SIT01–SIT16), receptive skills (R01–R03), culture (C01–C07), and mediation strategies (M01–M02).
   - Ensure lesson files link to COSYdata vocabulary entry IDs (e.g. en:apartment:noun) and COSYmanuals grammar/communication URLs rather than duplicating raw headword datasets.

2. Three-Tier Category Navigation:
   - Structure course drill selections by Level 1: CEFR Level (A0–C2), Level 2: Primary Lexical/Functional Theme, and Level 3: Sub-Theme.

3. Monolingual UI & Localized Labels:
   - Ensure lesson interface controls, category tags, and feedback messages render in the target language.

4. Verification:
   - Test lesson loading and confirm that vocabulary terms resolve against COSYdata search-index.json.
```

---

## 3. Prompt for COSYtools (Linguistic Engines & Lookup Tools)

```text
Please verify and update COSYtools conjugators and reference tables:

1. Repository Domain Scope:
   - COSYtools owns framework-free web engines for verb conjugation (e.g. fr-conjugeur, ru-spryazhenie, it-coniugatore, el-klisi-rimaton, en-irregular-verbs), declension, prepositional regimes, and phonetic lookups.

2. Tool ID Consistency:
   - Ensure all tool IDs match the canonical catalog in COSYtools catalog.json (e.g. COSYtools:<tool-id>:<headword>).

3. Integration & Embedding:
   - Ensure lookup tools expose embeddable ES modules and clean iframe/JSON endpoints for COSYdata and COSYlanguages practice views.

4. Verification:
   - Run COSYtools test suite to verify conjugation accuracy across target languages.
```

---

## 4. Prompt for COSYevents (Speaking Club Sessions & Event Topics)

```text
Please update COSYevents session definitions and export scripts:

1. Repository Domain Scope:
   - COSYevents owns conversation club session guides and speaking topic vocabularies.

2. Vocabulary Exporting:
   - Ensure new session vocabularies are tagged with canonical primary themes and sub-themes from taxonomy/themes.json.
   - Run the export script or verify compatibility with COSYdata's scripts/import-events-vocab.cjs.

3. Verification:
   - Confirm session vocabulary IDs follow the canonical pattern <lang>:<slug>:<form>.
```

---

## 5. Prompt for COSYgames (Interactive Games & Practice Drills)

```text
Please update COSYgames practice games and flashcard drills:

1. Repository Domain Scope:
   - COSYgames owns gamified practice engines, speed drills, and flashcard practice games.

2. Data Consumption:
   - Fetch vocabulary data dynamically from COSYdata search-index.json (https://cosylanguages.github.io/COSYdata/vocabulary/<lang>/search-index.json).
   - Organize game level selection by CEFR Level (A0–C2) first, followed by primary lexical themes and sub-themes.

3. Verification:
   - Verify game rendering and score tracking across all 14 supported languages.
```
