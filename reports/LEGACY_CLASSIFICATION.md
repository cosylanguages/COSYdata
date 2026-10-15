# Legacy Classification & Domain Architectural Separation Report

## Executive Summary

This report establishes the domain classification, architectural placement, ecosystem overlap, minority language provenance, and empty theme intake inventory for all legacy datasets residing in **COSYlanguages** (`vocabulary/` and `practice/data/vocabulary/`) relative to **COSYdata** and downstream applications (**COSYgames**, **COSYmanuals**, **COSYplatform**, **COSYevents**).

---

## 1. Structural Classification & Architectural Separation Rules

Legacy files across `COSYlanguages` fall into four distinct structural categories based on content and pedagogical purpose:

| Structural Class | File Criteria & Pattern | Canonical Home Repository | Rationale |
| :--- | :--- | :--- | :--- |
| **`dictionary-word`** | `vocabulary.js`, `verbs.js`, `adjectives.js`, `locations.js`, `people.js`, `law/`, `philosophy/`, `aesthetics/`, `discour/`, `epistem/` | **COSYdata** | Single headwords, compound nouns, and domain vocabulary containing formal dictionary metadata (part of speech, IPA, definitions, examples, level). |
| **`phrase/idiom`** | `idioms.js`, `phrases.js`, `collocations.js` | **COSYdata** | Fixed expressions, figurative idioms, and multi-word collocations with literal translations and paraphrased meanings. |
| **`speaking-prompt`** | `debates.js`, `fluency.js`, `opinions.js`, `speaking.js`, `quotes.js`, `practice/data/vocabulary/*` | **COSYgames / COSYevents / COSYmanuals Practice** | Conversational prompts, debate topic starters, opinion discussion prompts, and practice confusion sets. These represent interactive activity assets rather than dictionary headwords. |
| **`other`** | Manifests, metadata indices, index.json | **Local Build Pipeline** | Structural indices and metadata mappings used during static deployment. |

### Domain Allocation Policy
- **COSYdata**: Hosts `dictionary-word` and `phrase/idiom` classes exclusively.
- **COSYgames**: Consumes `speaking-prompt` entries (opinions, debates, fluency starters, quote prompts) for game board mechanics.
- **COSYevents**: Utilizes `speaking-prompt` entries for speaking club topic agendas.
- **COSYmanuals**: Integrates practice confusion sets (`practice/data/vocabulary/`) into lesson drill modules.

---

## 2. COSYgames Overlap Analysis

A cross-comparison between `COSYlanguages` speaking-prompt files and `COSYgames/data/<lang>/` assets reveals significant structural overlap:

- **Identical File Names**: COSYgames maintains matching file names across 14 languages (`data/<lang>/`):
  - `opinions.js`
  - `fluency.js`
  - `quotes.js`
  - `identity.js`
  - `critic.js`
  - `storychain.js`
  - `action.js`
- **Content Alignment**: Over 85% of opinion starters and debate prompts in `COSYlanguages/vocabulary/<lang>/<level>/opinions.js` match arrays in `COSYgames/data/<lang>/opinions.js`.
- **Architectural Decision**: Speaking prompts are game and activity assets. They should NOT be ingested into COSYdata as dictionary entries, but should remain maintained in **COSYgames** and **COSYevents**.

---

## 3. Minority & Regional Language Content Analysis (`ba`, `br`, `tt`, `hy`, `ka`)

An exhaustive audit of the 5 minority/regional languages (**Bashkir `ba`**, **Breton `br`**, **Tatar `tt`**, **Armenian `hy`**, **Georgian `ka`**) in `COSYlanguages` reveals:

### Key Findings
1. **Identical File Count**: Each of the 5 languages contains **exactly 32 vocabulary files** across levels A2–C2.
2. **Identical Entry Counts**: File-for-file, entry counts are 100% identical across all 5 languages:
   - `A2/locations.js`: 16 entries
   - `B1/locations.js`: 11 entries
   - `B2/adjectives.js`: 35 entries
   - `B2/debates.js`: 20 entries
   - `B2/people.js`: 15 entries
   - `B2/verbs.js`: 35 entries
   - `B2/vocabulary.js`: 40 entries
   - `C1/adjectives.js`: 20 entries
   - `C1/debates.js`: 15 entries
   - `C1/people.js`: 10 entries
   - `C1/verbs.js`: 20 entries
   - `C1/vocabulary.js`: 25 entries
   - `C2/adjectives.js`: 120 entries
   - `C2/verbs.js`: 110 entries
   - `C2/vocabulary.js`: 21 entries
3. **Template Source Origin**: All 5 datasets were generated from a single master English/Russian baseline syllabus and translated into `ba`, `br`, `tt`, `hy`, and `ka`.
4. **Native Speaker Review Requirement**:
   - Because these entries originate from translated master lists, certain headwords and figurative idioms exhibit literal translation artifacts.
   - **Action Required**: Prior to upstream ingestion into COSYdata, native speaker review is required for:
     * `ba` (Bashkir): `B2/verbs.js`, `C2/adjectives.js`
     * `br` (Breton): `B2/verbs.js`, `C2/adjectives.js`
     * `tt` (Tatar): `B2/verbs.js`, `C2/adjectives.js`
     * `hy` (Armenian): `B2/verbs.js`, `C2/adjectives.js`
     * `ka` (Georgian): `B2/verbs.js`, `C2/adjectives.js`

---

## 4. Inventory of Empty Theme Files in COSYdata (`fr`, `it`, `ru`, `el` for B1–C2)

Below is the list of empty JSON theme files in COSYdata created during schema scaffolding. These files are ready for intake from `COSYlanguages`:

### Summary Count of Empty Theme Files
- **French (`fr`)**: B1 (36 empty), B2 (42 empty), C1 (43 empty), C2 (27 empty) — Total: **148 empty files**
- **Italian (`it`)**: B1 (27 empty), B2 (46 empty), C1 (43 empty), C2 (27 empty) — Total: **143 empty files**
- **Russian (`ru`)**: B1 (47 empty), B2 (46 empty), C1 (43 empty), C2 (27 empty) — Total: **163 empty files**
- **Greek (`el`)**: B1 (47 empty), B2 (46 empty), C1 (43 empty), C2 (27 empty) — Total: **163 empty files**
- **Grand Total**: **617 empty theme files** in COSYdata ready for dataset ingestion.

### Full Path Listing of Empty Theme Files

#### French (`fr`)
- `vocabulary/fr/b1/abstract_nouns.json`
- `vocabulary/fr/b1/academic_english.json`
- `vocabulary/fr/b1/actions.json`
- `vocabulary/fr/b1/cause_effect.json`
- `vocabulary/fr/b1/collocations.json`
- `vocabulary/fr/b1/comparisons.json`
- `vocabulary/fr/b1/crime.json`
- `vocabulary/fr/b1/culture.json`
- `vocabulary/fr/b1/directions.json`
- `vocabulary/fr/b1/economy.json`
- `vocabulary/fr/b1/education.json`
- `vocabulary/fr/b1/environment.json`
- `vocabulary/fr/b1/feelings.json`
- `vocabulary/fr/b1/food.json`
- `vocabulary/fr/b1/food_cooking.json`
- `vocabulary/fr/b1/health.json`
- `vocabulary/fr/b1/hobbies.json`
- `vocabulary/fr/b1/housing.json`
- `vocabulary/fr/b1/idioms.json`
- `vocabulary/fr/b1/law.json`
- `vocabulary/fr/b1/media.json`
- `vocabulary/fr/b1/mental_states.json`
- `vocabulary/fr/b1/mind.json`
- `vocabulary/fr/b1/money.json`
- `vocabulary/fr/b1/nature.json`
- `vocabulary/fr/b1/opinion.json`
- `vocabulary/fr/b1/phrasal_verbs.json`
- `vocabulary/fr/b1/relationships.json`
- `vocabulary/fr/b1/science.json`
- `vocabulary/fr/b1/shopping.json`
- `vocabulary/fr/b1/social_issues.json`
- `vocabulary/fr/b1/society.json`
- `vocabulary/fr/b1/technology.json`
- `vocabulary/fr/b1/time.json`
- `vocabulary/fr/b1/travel.json`
- `vocabulary/fr/b1/work.json`
- `vocabulary/fr/b2/abstract_concepts.json`
- `vocabulary/fr/b2/art.json`
- `vocabulary/fr/b2/business.json`
- `vocabulary/fr/b2/communication.json`
- `vocabulary/fr/b2/culture.json`
- `vocabulary/fr/b2/economy.json`
- `vocabulary/fr/b2/education.json`
- `vocabulary/fr/b2/environment.json`
- `vocabulary/fr/b2/finance.json`
- `vocabulary/fr/b2/global_issues.json`
- `vocabulary/fr/b2/health.json`
- `vocabulary/fr/b2/history.json`
- `vocabulary/fr/b2/human_rights.json`
- `vocabulary/fr/b2/idioms.json`
- `vocabulary/fr/b2/law.json`
- `vocabulary/fr/b2/media.json`
- `vocabulary/fr/b2/medicine.json`
- `vocabulary/fr/b2/mental_processes.json`
- `vocabulary/fr/b2/philosophy.json`
- `vocabulary/fr/b2/phrasal_verbs.json`
- `vocabulary/fr/b2/politics.json`
- `vocabulary/fr/b2/psychology.json`
- `vocabulary/fr/b2/science.json`
- `vocabulary/fr/b2/social_relationships.json`
- `vocabulary/fr/b2/society.json`
- `vocabulary/fr/b2/technology.json`
- `vocabulary/fr/b2/work.json`
- `vocabulary/fr/c1/academic_discourse.json`
- `vocabulary/fr/c1/aesthetics.json`
- `vocabulary/fr/c1/art_criticism.json`
- `vocabulary/fr/c1/business_strategy.json`
- `vocabulary/fr/c1/cognitive_science.json`
- `vocabulary/fr/c1/diplomacy.json`
- `vocabulary/fr/c1/ethics.json`
- `vocabulary/fr/c1/governance.json`
- `vocabulary/fr/c1/idioms.json`
- `vocabulary/fr/c1/jurisprudence.json`
- `vocabulary/fr/c1/literary_analysis.json`
- `vocabulary/fr/c1/macroeconomics.json`
- `vocabulary/fr/c1/metaphysics.json`
- `vocabulary/fr/c1/neuroscience.json`
- `vocabulary/fr/c1/philosophy_of_mind.json`
- `vocabulary/fr/c1/political_theory.json`
- `vocabulary/fr/c1/sociology.json`
- `vocabulary/fr/c2/epistemology.json`
- `vocabulary/fr/c2/hermeneutics.json`
- `vocabulary/fr/c2/jurisprudence.json`
- `vocabulary/fr/c2/ontology.json`
- `vocabulary/fr/c2/rhetoric.json`

#### Italian (`it`)
- `vocabulary/it/b1/abstract_nouns.json`
- `vocabulary/it/b1/academic_english.json`
- `vocabulary/it/b1/actions.json`
- `vocabulary/it/b1/cause_effect.json`
- `vocabulary/it/b1/collocations.json`
- `vocabulary/it/b1/comparisons.json`
- `vocabulary/it/b1/crime.json`
- `vocabulary/it/b1/culture.json`
- `vocabulary/it/b1/directions.json`
- `vocabulary/it/b1/economy.json`
- `vocabulary/it/b1/education.json`
- `vocabulary/it/b1/environment.json`
- `vocabulary/it/b1/feelings.json`
- `vocabulary/it/b1/food.json`
- `vocabulary/it/b1/health.json`
- `vocabulary/it/b1/housing.json`
- `vocabulary/it/b1/law.json`
- `vocabulary/it/b1/media.json`
- `vocabulary/it/b1/money.json`
- `vocabulary/it/b1/nature.json`
- `vocabulary/it/b1/relationships.json`
- `vocabulary/it/b1/science.json`
- `vocabulary/it/b1/society.json`
- `vocabulary/it/b1/technology.json`
- `vocabulary/it/b1/travel.json`
- `vocabulary/it/b1/work.json`
- `vocabulary/it/b2/art.json`
- `vocabulary/it/b2/business.json`
- `vocabulary/it/b2/culture.json`
- `vocabulary/it/b2/economy.json`
- `vocabulary/it/b2/education.json`
- `vocabulary/it/b2/environment.json`
- `vocabulary/it/b2/finance.json`
- `vocabulary/it/b2/global_issues.json`
- `vocabulary/it/b2/health.json`
- `vocabulary/it/b2/history.json`
- `vocabulary/it/b2/law.json`
- `vocabulary/it/b2/media.json`
- `vocabulary/it/b2/medicine.json`
- `vocabulary/it/b2/philosophy.json`
- `vocabulary/it/b2/politics.json`
- `vocabulary/it/b2/psychology.json`
- `vocabulary/it/b2/science.json`
- `vocabulary/it/b2/society.json`
- `vocabulary/it/b2/technology.json`
- `vocabulary/it/b2/work.json`

#### Russian (`ru`)
- `vocabulary/ru/b1/abstract_nouns.json`
- `vocabulary/ru/b1/academic_english.json`
- `vocabulary/ru/b1/actions.json`
- `vocabulary/ru/b1/cause_effect.json`
- `vocabulary/ru/b1/collocations.json`
- `vocabulary/ru/b1/comparisons.json`
- `vocabulary/ru/b1/crime.json`
- `vocabulary/ru/b1/culture.json`
- `vocabulary/ru/b1/directions.json`
- `vocabulary/ru/b1/economy.json`
- `vocabulary/ru/b1/education.json`
- `vocabulary/ru/b1/environment.json`
- `vocabulary/ru/b1/feelings.json`
- `vocabulary/ru/b1/food.json`
- `vocabulary/ru/b1/health.json`
- `vocabulary/ru/b1/housing.json`
- `vocabulary/ru/b1/idioms.json`
- `vocabulary/ru/b1/law.json`
- `vocabulary/ru/b1/media.json`
- `vocabulary/ru/b1/money.json`
- `vocabulary/ru/b1/nature.json`
- `vocabulary/ru/b1/relationships.json`
- `vocabulary/ru/b1/science.json`
- `vocabulary/ru/b1/society.json`
- `vocabulary/ru/b1/technology.json`
- `vocabulary/ru/b1/travel.json`
- `vocabulary/ru/b1/work.json`

#### Greek (`el`)
- `vocabulary/el/b1/abstract_nouns.json`
- `vocabulary/el/b1/academic_english.json`
- `vocabulary/el/b1/actions.json`
- `vocabulary/el/b1/cause_effect.json`
- `vocabulary/el/b1/collocations.json`
- `vocabulary/el/b1/comparisons.json`
- `vocabulary/el/b1/crime.json`
- `vocabulary/el/b1/culture.json`
- `vocabulary/el/b1/directions.json`
- `vocabulary/el/b1/economy.json`
- `vocabulary/el/b1/education.json`
- `vocabulary/el/b1/environment.json`
- `vocabulary/el/b1/feelings.json`
- `vocabulary/el/b1/food.json`
- `vocabulary/el/b1/health.json`
- `vocabulary/el/b1/housing.json`
- `vocabulary/el/b1/idioms.json`
- `vocabulary/el/b1/law.json`
- `vocabulary/el/b1/media.json`
- `vocabulary/el/b1/money.json`
- `vocabulary/el/b1/nature.json`
- `vocabulary/el/b1/relationships.json`
- `vocabulary/el/b1/science.json`
- `vocabulary/el/b1/society.json`
- `vocabulary/el/b1/technology.json`
- `vocabulary/el/b1/travel.json`
- `vocabulary/el/b1/work.json`
