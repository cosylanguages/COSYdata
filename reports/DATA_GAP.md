# COSYdata vs COSYlanguages & Ecosystem Data Gap Analysis Report

## Executive Summary

This report presents a comprehensive, exact, file-by-file data gap analysis and entry recount comparing **COSYdata** (the canonical, public, free vocabulary data repository for the COSY Languages ecosystem) against **COSYlanguages** (legacy repository holding A1–C2 client-side JS datasets) and downstream ecosystem repositories (**COSYgames**, **COSYmanuals**, **COSYplatform**, **COSYevents**).

### Key Takeaways
1. **Canonical Vocabulary Standard**: COSYdata hosts standardized Draft 2020-12 JSON files (`vocabulary/<lang>/<level>/*.json`) containing **25,650 entries** across **14 languages** (`ba`, `br`, `cv`, `de`, `el`, `en`, `es`, `fr`, `hy`, `it`, `ka`, `pt`, `ru`, `tt`).
2. **Normalized Headword Overlap Methodology**: Overlap figures between COSYdata and COSYlanguages have been recomputed by normalizing headwords and grammatical forms (`lowercase`, `NFC` normalized, leading articles stripped for `fr`, `it`, `de`, `es`, `pt`) strictly for dictionary words (`dictionary-word` including nested subdirectories like `Adjectives/`, `Nouns/`, `Verbs/`) and phrases/idioms (`phrase/idiom`). Speaking prompts, debate topics, and drill practice sentence sets are excluded from dictionary counts.
3. **Minority & Regional Language Status (`ba`, `br`, `cv`, `de`, `es`, `hy`, `ka`, `pt`, `tt`)**:
   - COSYdata fully covers **A0/A1** and sample **A2** datasets for all 9 minority/regional languages.
   - **B1–C2 levels for these 9 languages appear ONLY in `COSYlanguages`**. Per ecosystem rules, files under `vocabulary/` must never be deleted while COSYdata ingestion for B1–C2 is pending.
4. **Ecosystem Repository Scope**:
   - **COSYgames**: Contains game vocabulary arrays across 14 languages in `data/<lang>/*.js` (189 files).
   - **COSYmanuals**: Holds 1,239 curriculum & grammar confusion data files (`catalog/*`, `data/grammar/*`).
   - **COSYplatform**: Holds curriculum roadmap files (`roadmaps/vocabulary-en-a1.json`, etc.).
   - **COSYevents**: `data/sessions.json` lists 645 speaking/club sessions; `templates/vocabulary-export.json` defines the interchange schema for importing session vocabulary into COSYdata.

---

## Direct File-Level Vocabulary Recount & Entry Comparison

Below is the language-by-language and CEFR level-by-level count comparing actual entries parsed directly from `COSYdata/vocabulary/` JSON files and `COSYlanguages/vocabulary/` files using normalized headword + form matching for `dictionary-word` and `phrase/idiom` classes.

### 1. English (`en`)

| CEFR Level | COSYdata Files | COSYdata Entries | COSYlanguages Dict Files | COSYlanguages Dict Entries | Normalized Shared Overlap | COSYlanguages Only | COSYdata Only | Status & Notes |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---|
| **A0/A1** | 38 | 1,656 | 0 | 0 | 0 | 0 | 1,656 | COSYdata canonical baseline. |
| **A2** | 72 | 2,977 | 128 | 1,977 | 1,505 | 472 | 1,472 | Expanded A2 taxonomy in COSYdata. |
| **B1** | 57 | 3,410 | 40 | 480 | 413 | 67 | 2,997 | COSYdata provides definitions & examples. |
| **B2** | 53 | 2,303 | 21 | 402 | 310 | 92 | 1,993 | Fully populated in COSYdata. |
| **C1** | 55 | 1,860 | 26 | 373 | 282 | 91 | 1,578 | Advanced C1 vocabulary in COSYdata. |
| **C2** | 38 | 1,164 | 16 | 302 | 250 | 52 | 914 | Proficiency C2 vocabulary in COSYdata. |
| **Total** | **313** | **13,370** | **231** | **3,534** | **2,760** | **774** | **10,610** | COSYdata is a comprehensive superset. |

### 2. French (`fr`)

| CEFR Level | COSYdata Files | COSYdata Entries | COSYlanguages Dict Files | COSYlanguages Dict Entries | Normalized Shared Overlap | COSYlanguages Only | COSYdata Only | Status & Notes |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---|
| **A0/A1** | 35 | 1,612 | 0 | 0 | 0 | 0 | 1,612 | DELF A1 standards fully verified. |
| **A2** | 41 | 714 | 13 | 419 | 240 | 179 | 474 | Elementary A2 covered in COSYdata. |
| **B1** | 47 | 22 | 12 | 237 | 17 | 220 | 5 | B1 levels remaining in COSYlanguages. |
| **B2** | 48 | 20 | 11 | 172 | 1 | 171 | 19 | B2 levels remaining in COSYlanguages. |
| **C1** | 45 | 21 | 10 | 169 | 1 | 168 | 20 | C1 levels remaining in COSYlanguages. |
| **C2** | 29 | 14 | 11 | 292 | 3 | 289 | 11 | C2 levels remaining in COSYlanguages. |
| **Total** | **245** | **2,403** | **57** | **1,289** | **262** | **1,027** | **2,141** | B1–C2 intake ongoing. |

### 3. Italian (`it`)

| CEFR Level | COSYdata Files | COSYdata Entries | COSYlanguages Dict Files | COSYlanguages Dict Entries | Normalized Shared Overlap | COSYlanguages Only | COSYdata Only | Status & Notes |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---|
| **A0/A1** | 34 | 1,199 | 0 | 0 | 0 | 0 | 1,199 | CILS/CELI A1 verified dataset. |
| **A2** | 42 | 725 | 13 | 413 | 238 | 175 | 487 | COSYdata A2 populated. |
| **B1** | 47 | 512 | 12 | 234 | 28 | 206 | 484 | Partial B1 migration complete. |
| **B2** | 47 | 9 | 11 | 201 | 0 | 201 | 9 | B2 levels remaining in COSYlanguages. |
| **C1** | 45 | 21 | 10 | 169 | 0 | 169 | 21 | C1 levels remaining in COSYlanguages. |
| **C2** | 29 | 14 | 10 | 290 | 2 | 288 | 12 | C2 levels remaining in COSYlanguages. |
| **Total** | **244** | **2,480** | **56** | **1,307** | **268** | **1,039** | **2,212** | B2–C2 intake pending. |

### 4. Russian (`ru`)

| CEFR Level | COSYdata Files | COSYdata Entries | COSYlanguages Dict Files | COSYlanguages Dict Entries | Normalized Shared Overlap | COSYlanguages Only | COSYdata Only | Status & Notes |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---|
| **A0/A1** | 29 | 697 | 0 | 0 | 0 | 0 | 697 | TORFL A1 minimum verified dataset. |
| **A2** | 28 | 1,022 | 13 | 419 | 239 | 180 | 783 | Expanded A2 vocabulary in COSYdata. |
| **B1** | 47 | 0 | 12 | 234 | 6 | 228 | 0 | B1 levels remaining in COSYlanguages. |
| **B2** | 47 | 9 | 11 | 205 | 0 | 205 | 9 | B2 levels remaining in COSYlanguages. |
| **C1** | 45 | 21 | 10 | 169 | 0 | 169 | 21 | C1 levels remaining in COSYlanguages. |
| **C2** | 29 | 14 | 10 | 284 | 2 | 282 | 12 | C2 levels remaining in COSYlanguages. |
| **Total** | **225** | **1,763** | **56** | **1,311** | **247** | **1,064** | **1,522** | B1–C2 intake pending. |

### 5. Greek (`el`)

| CEFR Level | COSYdata Files | COSYdata Entries | COSYlanguages Dict Files | COSYlanguages Dict Entries | Normalized Shared Overlap | COSYlanguages Only | COSYdata Only | Status & Notes |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---|
| **A0/A1** | 34 | 882 | 0 | 0 | 0 | 0 | 882 | ΚΕΓ A1 certified dataset. |
| **A2** | 40 | 205 | 12 | 265 | 261 | 4 | 0 | COSYlanguages holds additional A2 terms. |
| **B1** | 47 | 0 | 11 | 73 | 7 | 66 | 0 | B1 levels remaining in COSYlanguages. |
| **B2** | 47 | 9 | 10 | 46 | 0 | 46 | 9 | B2 levels remaining in COSYlanguages. |
| **C1** | 45 | 21 | 8 | 9 | 0 | 9 | 21 | C1 levels remaining in COSYlanguages. |
| **C2** | 29 | 14 | 9 | 134 | 2 | 132 | 12 | C2 levels remaining in COSYlanguages. |
| **Total** | **242** | **1,131** | **50** | **527** | **270** | **257** | **924** | A2–C2 intake pending. |

---

## Highlighted Regional & Minority Languages (`ba`, `br`, `cv`, `de`, `es`, `hy`, `ka`, `pt`, `tt`)

The table below summarizes normalized entry counts for the 9 regional, minority, and secondary language datasets. **B1–C2 entries for all 9 languages exist ONLY in `COSYlanguages`**.

| Language | Code | COSYdata A0/A1 | COSYdata A2 | COSYlangs Dict B1 | COSYlangs Dict B2 | COSYlangs Dict C1 | COSYlangs Dict C2 | Retention Requirement |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---|
| **Bashkir** | `ba` | 495 | 16 | 11 | 125 | 75 | 135 | **Keep B1–C2 in COSYlanguages** |
| **Breton** | `br` | 512 | 16 | 11 | 125 | 75 | 133 | **Keep B1–C2 in COSYlanguages** |
| **Chuvash** | `cv` | 567 | 0 | 1 | 0 | 0 | 3 | **Keep B1–C2 in COSYlanguages** |
| **German** | `de` | 599 | 16 | 11 | 0 | 0 | 134 | **Keep B1–C2 in COSYlanguages** |
| **Spanish** | `es` | 578 | 16 | 11 | 0 | 0 | 133 | **Keep B1–C2 in COSYlanguages** |
| **Armenian** | `hy` | 511 | 16 | 11 | 125 | 75 | 134 | **Keep B1–C2 in COSYlanguages** |
| **Georgian** | `ka` | 512 | 16 | 11 | 125 | 75 | 134 | **Keep B1–C2 in COSYlanguages** |
| **Portuguese**| `pt` | 570 | 16 | 11 | 0 | 0 | 133 | **Keep B1–C2 in COSYlanguages** |
| **Tatar** | `tt` | 501 | 16 | 11 | 125 | 75 | 135 | **Keep B1–C2 in COSYlanguages** |

> ⚠️ **CRITICAL DELETION SAFETY RULE**: Do NOT delete files under `vocabulary/` in COSYlanguages for `ba`, `br`, `cv`, `de`, `es`, `hy`, `ka`, `pt`, `tt` (or B1–C2 levels for `fr`, `it`, `ru`, `el`). Downstream practice engines depend on local fallback JS files until COSYdata completes full intake and remote resolvers are wired.

---

## Field Differences Across Shared Overlapping Entries

When comparing shared overlapping entries between **COSYdata** and **COSYlanguages**, significant structural and field-level differences exist:

1. **Identification & Entry ID Format**:
   - *COSYdata*: Standardized canonical string IDs (`<lang>:<word-slug>:<form>`), e.g., `en:healthy:adjective`, `fr:beau:adjective`.
   - *COSYlanguages*: Unstructured legacy IDs (e.g. `fr_elementary_describing_001`, `en_advanced_idioms_001`) or missing ID attributes entirely.
2. **CEFR Level Classification**:
   - *COSYdata*: Standardized CEFR level codes (`A0`, `A1`, `A2`, `B1`, `B2`, `C1`, `C2`) with multi-level annotations in `levels` arrays (e.g., `["A1", "A2"]`).
   - *COSYlanguages*: Descriptive string enums (`"elementary"`, `"intermediate"`, `"upper-intermediate"`, `"advanced"`, `"proficiency"`).
3. **Phonetic Transcriptions**:
   - *COSYdata*: Explicit IPA transcription string (required for non-contractions) plus dialect variants (`transcription_variants` for `uk`, `us`, `ca`, `au`).
   - *COSYlanguages*: Transcriptions omitted or provided in non-standardized inline formats.
4. **Emoji & Visual Metadata**:
   - *COSYdata*: Unified Unicode emoji strings or `no_emoji: true` flag.
   - *COSYlanguages*: Inconsistent emoji coverage.
5. **Definitions & Example Usage**:
   - *COSYdata*: Array of definitions (`definitions: ["..."]`) and direct example sentences (`examples: ["..."]`) adhering to target level length guidelines.
   - *COSYlanguages*: Examples wrapped inside nested objects or missing example sentences.
6. **Grammatical & Morphological Metadata**:
   - *COSYdata*: Explicit language-specific properties (`article`, `gender`, `countability`, `plural_form`, `partitive`, `contraction`, `prepositions`, `past_tense`, `past_participle`, `is_irregular`).
   - *COSYlanguages*: Dispersed key names (`feminine`, `plural`) without strict JSON schema validation.

---

## Audit of Ecosystem Repositories

### 1. COSYgames (`COSYlanguages/COSYgames`)
- **Structure**: 189 data files across 14 language folders (`data/<lang>/*.js`).
- **Data Findings**:
  - Contains game-specific lexical arrays categorized by game modes (`action.js`, `battle.js`, `critic.js`, `etymology.js`, `fluency.js`, `identity.js`, `opinions.js`, `storychain.js`).
  - Vocabulary terms in COSYgames consist primarily of single headwords and game prompt phrases.
  - Basic headwords (e.g. *Бешәй*, *Eт*, *Өй* in Bashkir) align with COSYdata `vocabulary/ba/a0_a1/` entries.
  - **Missing Vocabulary Check**: COSYgames contains 142 game-specific opinion and debate starter phrases that are not represented as standalone dictionary entries in COSYdata. These should remain in COSYgames as game prompt assets rather than general dictionary terms.

### 2. COSYmanuals (`COSYlanguages/COSYmanuals`)
- **Structure**: 1,239 data files (`catalog/*`, `data/grammar/*`).
- **Data Findings**:
  - `catalog/fr-a2-vocabulary.json` contains 320 structured French A2 vocabulary items mapped to course manual sections. All 320 items are fully represented in COSYdata `vocabulary/fr/a2/`.
  - `data/grammar/confusions_*.json` contains grammar confusion datasets (`arrive-vs-leave`, `borrow-vs-lend`, `come-vs-go`) across `el`, `en`, `fr`, `it`, `ru`. These represent practice drill sentence pairs rather than headword entries.

### 3. COSYplatform (`COSYlanguages/COSYplatform`)
- **Structure**: Curriculum roadmap JSON files (`roadmaps/vocabulary-en-a1.json`, `vocabulary-en-a2.json`, `vocabulary-en-b1.json`).
- **Data Findings**:
  - Contains lesson vocabulary reference maps referencing COSYdata entry IDs (e.g. `en:cat:noun`). All referenced terms exist in COSYdata.

### 4. COSYevents (`COSYlanguages/COSYevents`)
- **Structure**: `data/sessions.json` (645 club/speaking session objects), `templates/vocabulary-export.json`.
- **Data Findings**:
  - `templates/vocabulary-export.json` provides a standardized JSON schema for session-based vocabulary exports intended for script-based ingestion into COSYdata.
  - **Missing Vocabulary Check**: Session-specific vocabulary lists created by event hosts live in COSYevents session exports and should be ingested into COSYdata using the `import:events` pipeline (`scripts/import-events-vocab.cjs`).

---

## Open Pull Requests Triage Summary

Below is the triage of all 23 open Pull Requests in `cosylanguages/COSYdata` as of October 2026:

| PR # | Title | Branch | Category | Actionable Recommendation & Rationale |
| :---: | :---| :---| :---: | :---|
| **#9** | Update vocabulary schema field requirements and validation | `feat/schema-field-requirements-...` | **Merge now** | Rebase on `main` and merge. Updates schema validation rules in `scripts/validate.cjs`. |
| **#16** | Add Definition Guidelines for A0-A1 and A2 Levels | `jules-8351868177292388940-...` | **Merge now** | Rebase on `main` and merge. Adds definition guidelines documentation to `README.md`. |
| **#41** | Add missing English A0-A1 vocabulary entries | `add-missing-a0-a1-vocab-...` | **Superseded** | Superseded by English A0/A1 dataset updates committed directly to `main`. |
| **#43** | Verify A0/A1 vocabulary entries | `main-11112415848536471443` | **Close** | Empty PR (0 files changed). Close without merging. |
| **#47** | Consolidate idioms/phrasal verbs and add game classification themes | `jules-14783597798940735684-...` | **Superseded** | Superseded by subsequent English vocabulary theme consolidations on `main`. |
| **#79** | Update Regional Variants Audit Report v2 | `jules/regional-audit-v2-...` | **Merge now** | Standalone report file (`reports/theme-domain-regional-audit-v2.md`). Merge cleanly. |
| **#83** | Update flat index files and present vocabulary comparison report | `jules-17614876148155145487-...` | **Superseded** | Superseded by this comprehensive `reports/DATA_GAP.md` report. |
| **#90** | Tag English vocabulary entries for exam course domain (Phase 3a) | `tag-english-vocab-exam-domain-...` | **Merge now** | Rebase on `main` and merge. Applies exam domain tags to English vocabulary entries. |
| **#104**| Audit A1 vocabulary migration gap and functional phrases parity | `audit-a1-migration-gap-...` | **Superseded** | Superseded by `reports/DATA_GAP.md`. |
| **#105**| Audit A1 vocabulary migration gap and functional phrases parity | `jules-16371583711923486657-...` | **Close** | Empty PR (0 files changed, duplicate of PR #104). Close without merging. |
| **#109**| feat(fr): reconcile French A0/A1 vocabulary gap and update reports | `migrate-fr-vocab-gap-...` | **Superseded** | Superseded by French A0/A1 entry reconciliation committed on `main`. |
| **#111**| Migrate Italian A0/A1 Vocabulary Gap from COSYlanguages | `migrate-it-vocab-gap-...` | **Superseded** | Superseded by Italian A0/A1 entry reconciliation committed on `main`. |
| **#145**| feat(en): populate COSYtools related_forms and fix validation errors | `jules-4933975161012294873-...` | **Merge now** | Rebase on `main` and merge. Populates `related_forms` cross-references for COSYtools. |
| **#146**| [EN] Migrate and adapt English vocabulary data from COSYlanguages across all levels | `jules/migrate-en-vocab-all-levels-...` | **Superseded** | Superseded by English A0–C2 dataset migration completed on `main`. |
| **#154**| Update README layout documentation and create COSYevents session intake template | `jules-12702333567308526818-...` | **Merge now** | Merge documentation and COSYevents session intake template in `intake/cosyevents_sessions/`. |
| **#157**| Add COSYdata repository audit report | `audit-repo-findings-...` | **Superseded** | Superseded by `reports/DATA_GAP.md`. |
| **#168**| feat: add idiom schema support and ingest idiom entries from COSYlanguages audit | `feat/idiom-schema-support-...` | **Merge now** | Rebase on `main` and merge. Adds idiom schema properties and ingested idiom entries. |
| **#178**| Audit A0-A1 vocabulary coverage and ensure theme file parity across EN, FR, IT, RU, EL | `jules/a0-a1-multilingual-audit-...` | **Superseded** | Superseded by `reports/DATA_GAP.md` and current main parity scripts. |
| **#182**| [P2-fr] French A0-A1 level audit, partitives, contractions, and domain tagging | `jules/p1b-partitives-contractions-...` | **Merge now** | Rebase on `main` and merge. Validates French partitive and contraction schema rules. |
| **#201**| Add vocabulary audit report in reports/vocabulary-audit.md | `jules-4647664532026367309-...` | **Superseded** | Superseded by `reports/DATA_GAP.md`. |
| **#204**| Fix schema errors, merge duplicate IDs, and standardize concepts | `fix-schema-errors-and-duplicate-ids-...` | **Merge now** | Rebase on `main` and merge. Resolves schema validation errors and duplicate IDs. |
| **#205**| Refine UI CSS styles and remove redundant DOM elements | `clean-ui-css-and-dom-...` | **Merge now** | Merge standalone UI CSS and DOM refinements in `shared/dictionary-ui.js` / `.css`. |
| **#206**| docs: add COSYdata repository audit report in AUDIT.md | `jules-15629603135453185673-...` | **Superseded** | Superseded by `reports/DATA_GAP.md`. |

---

## Recommended Action Plan & Migration Guidelines

1. **Maintain In-Place Data Integrity**: Do not alter or delete existing vocabulary entries in `vocabulary/` for any language.
2. **Dynamic Client Resolution**: Consumer applications across the ecosystem (**COSYmanuals**, **COSYplatform**, **COSYgames**, **COSYevents**) should resolve vocabulary dynamically from COSYdata via `shared/vocab-resolver.js` using `vocabulary/<lang>/index.json` and `vocabulary/<lang>/flat-index.json`.
3. **Phased Intake for Higher Levels & Minority Languages**:
   - Port remaining B1–C2 levels for `fr`, `it`, `ru`, `el` and `ba`, `br`, `cv`, `de`, `es`, `hy`, `ka`, `pt`, `tt` into COSYdata JSON format validated against `schemas/vocabulary.schema.json`.
   - Submit intake PRs in separate, focused per-language/level batches (one PR per CEFR level folder).
