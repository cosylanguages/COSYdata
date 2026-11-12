# COSYdata Repository Audit Report

**Audit Date:** October 14, 2026
**Auditor:** Jules (AI Software Engineer)
**Repository:** `cosylanguages/COSYdata`
**Ecosystem:** COSYlanguages Ecosystem (**COSYlanguages**, **COSYdata**, **COSYtools**, **COSYmanuals**, **COSYplatform**, **COSYevents**, **COSYgames**)

---

## Executive Summary

This read-only audit report provides a comprehensive, structured evaluation of the `COSYdata` repository across all branches, pull requests, files, schemas, and ecosystem integration points. `COSYdata` serves as the central, machine-readable vocabulary and curriculum data hub for the COSYlanguages ecosystem.

---

## 1. Branches and Open Pull Requests

The repository currently contains **169 remote branches** and **22 open pull requests**. All branches have been inspected relative to `origin/main`. Below is the complete status of all open pull requests and notable unmerged branches.

### Open Pull Requests (22 Total)

| PR # | Title | Branch Name | Last Commit Date | Commits Ahead | Summary of Changes vs. `main` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **#9** | Update vocabulary schema field requirements and validation | `feat/schema-field-requirements-16817109394433754592` | 2026-09-15 | 1 | Schema updates in `schemas/vocabulary.schema.json` enforcing strict field requirements and validation constraints. |
| **#16** | Add Definition Guidelines for A0-A1 and A2 Levels | `jules-8351868177292388940-556778e7` | 2026-09-15 | 1 | Adds A0–A2 definition guidelines in `docs/definition-guidelines.md` and updates level schemas. |
| **#41** | Add missing English A0-A1 vocabulary entries | `add-missing-a0-a1-vocab-10444947146617708768` | 2026-09-16 | 1 | Populates missing A0–A1 core terms across English vocabulary files in `vocabulary/en/a0_a1/`. |
| **#43** | Verify A0/A1 vocabulary entries | `main-11112415848536471443` | 2026-09-16 | 1 | Quality sweep verifying definition clarity and example sentence formatting for A0–A1 entries. |
| **#47** | Consolidate idioms/phrasal verbs and add game classification themes | `jules-14783597798940735684-2901f30d` | 2026-09-16 | 1 | Consolidates idioms/phrasal verbs into `a0_a1` folders and tags entries for COSYgames classification. |
| **#79** | Update Regional Variants Audit Report v2 | `jules/regional-audit-v2-18428615992038273364` | 2026-09-18 | 1 | Updates regional metadata and generates `reports/theme-domain-regional-audit-v2.md`. |
| **#83** | Update flat index files and present vocabulary comparison report | `jules-17614876148155145487-702be1c0` | 2026-09-18 | 1 | Regenerates flat index files across languages and adds `reports/cosylanguages-vs-cosydata-audit.md`. |
| **#90** | Tag English vocabulary entries for exam course domain (Phase 3a) | `tag-english-vocab-exam-domain-phase3a-8992791083852762462` | 2026-09-19 | 1 | Tags English entries with `domain: "exam"` and updates `vocabulary/exam-tracks.json`. |
| **#104** | Audit A1 vocabulary migration gap and functional phrases parity | `audit-a1-migration-gap-12898924316910972563` | 2026-09-21 | 1 | Audits migration gaps between COSYlanguages and COSYdata; creates `reports/migration-gap-report.md`. |
| **#105** | Audit A1 vocabulary migration gap and functional phrases parity | `jules-16371583711923486657-e92edc2c` | 2026-09-21 | 1 | Secondary audit branch comparing A1 functional phrases across target languages. |
| **#109** | Reconcile French A0/A1 vocabulary gap and update reports | `migrate-fr-vocab-gap-4632538543995383074` | 2026-09-21 | 1 | Reconciles French A0–A1 vocabulary gap, adding candidate entries from intake datasets. |
| **#111** | Migrate Italian A0/A1 Vocabulary Gap from COSYlanguages | `migrate-it-vocab-gap-1731229906959401978` | 2026-09-21 | 1 | Migrates Italian A0–A1 vocabulary gap and removes legacy report `reports/a0_a1_cefr_audit.md`. |
| **#145** | Populate COSYtools related_forms and fix validation errors | `jules-4933975161012294873-81a7db99` | 2026-09-23 | 1 | Links English verb entries to `COSYtools:en-verb-prep:<headword>` in `related_forms`. |
| **#146** | Migrate and adapt English vocabulary data from COSYlanguages across all levels | `jules/migrate-en-vocab-all-levels-12433192815503676838` | 2026-09-23 | 1 | Comprehensive migration adapting English entries across A0–C2 levels into canonical structure. |
| **#154** | Update README layout documentation and create COSYevents session intake template | `jules-12702333567308526818-c84b1f9b` | 2026-09-24 | 1 | Updates layout docs in `README.md` and adds intake template script for COSYevents session topics. |
| **#157** | Add COSYdata repository audit report | `audit-repo-findings-7921377086458969684` | 2026-09-25 | 1 | Prior repository findings audit saved to `reports/content-audit.md`. |
| **#168** | Add idiom schema support and ingest idiom entries from COSYlanguages audit | `feat/idiom-schema-support-and-ingestion-4770355169186001292` | 2026-09-28 | 1 | Updates `schemas/vocabulary.schema.json` to support `idiom` form and ingests B1–C2 idiom datasets. |
| **#178** | Audit A0-A1 vocabulary coverage and ensure theme file parity across EN, FR, IT, RU, EL | `jules/a0-a1-multilingual-audit-and-parity-17246755121911559455` | 2026-10-06 | 1 | Audits beginner vocabulary parity across 5 core languages; adds `scripts/a0-a1-parity.cjs`. |
| **#182** | French A0-A1 level audit, partitives, contractions, and domain cleanup | `jules/p1b-partitives-contractions-5581365124827737531` | 2026-10-08 | 1 | Audits French partitive articles, contraction forms, and cleans up domain tags in `vocabulary/fr/`. |
| **#201** | Add vocabulary audit report in reports/vocabulary-audit.md | `jules-4647664532026367309-5f92a2fa` | 2026-10-12 | 1 | Adds comprehensive vocabulary dataset comparison audit report in `reports/vocabulary-audit.md`. |
| **#204** | Fix schema errors, merge duplicate IDs, and standardize concepts | `fix-schema-errors-and-duplicate-ids-9060710125943633588` | 2026-10-14 | 1 | Resolves JSON schema validation failures, merges duplicate entry IDs, and standardizes `concept` keys. |
| **#205** | Refine UI CSS styles and remove redundant DOM elements | `clean-ui-css-and-dom-10280545780008106159` | 2026-10-14 | 1 | Cleans up shared UI stylesheet `shared/dictionary-ui.css` and optimizes DOM structure in `shared/dictionary-ui.js`. |

---

## 2. Full Folder Tree (Depth 3)

Below is the folder tree to depth 3, with a one-line purpose and approximate file counts for each folder.

```
. (Root Directory) [18 files] - Root workspace containing project config, deployment assets, entrypoints, and logs.
├── .github/ [0 files directly, 1 subdirs] - GitHub repository configuration and automation.
│   └── workflows/ [2 files] - GitHub Actions CI/CD workflows for validation and cross-repo notification.
├── curriculum/ [0 files directly, 1 subdirs] - Course curriculum frameworks, competencies, and lesson plans.
│   └── en/ [1 file] - English curriculum competency mappings and lesson definitions.
├── docs/ [3 files] - Project documentation, taxonomy rules, and tagging conventions.
├── functional-phrases/ [0 files directly, 5 subdirs] - Conversational functional phrase entries categorized by language and level.
│   ├── el/ [1 file directly, 1 subdirs] - Greek functional phrase collections.
│   │   └── a1/ [12 files] - Level A1 Greek functional phrases by situation.
│   ├── en/ [1 file directly, 5 subdirs] - English functional phrase collections.
│   │   ├── a1/ [12 files] - Level A1 English functional phrases by situation.
│   │   ├── a2/ [4 files] - Level A2 English functional phrases.
│   │   ├── b1/ [4 files] - Level B1 English functional phrases.
│   │   ├── b2/ [5 files] - Level B2 English functional phrases.
│   │   └── c1_c2/ [1 file] - Levels C1-C2 advanced English functional phrases.
│   ├── fr/ [1 file directly, 1 subdirs] - French functional phrase collections.
│   │   └── a1/ [12 files] - Level A1 French functional phrases by situation.
│   ├── it/ [1 file directly, 1 subdirs] - Italian functional phrase collections.
│   │   └── a1/ [12 files] - Level A1 Italian functional phrases by situation.
│   └── ru/ [1 file directly, 1 subdirs] - Russian functional phrase collections.
│       └── a1/ [12 files] - Level A1 Russian functional phrases by situation.
├── intake/ [0 files directly, 1 subdirs] - Raw intake CSV files and migration plans for vocabulary datasets.
│   └── a0_a1_fr_it_ru_el/ [7 files] - CSV intake benchmarks for French, Italian, Russian, and Greek A0-A1 terms.
├── reports/ [59 files directly, 1 subdirs] - Generated audit reports, migration comparisons, and review lists.
│   └── needs-review/ [1 file] - Unresolved items requiring manual review from migration sweeps.
├── schemas/ [5 files directly, 1 subdirs] - JSON Schemas enforcing vocabulary, lesson, competency, and phrase structures.
│   └── examples/ [38 files] - Test fixture examples validating schema edge cases and rules.
├── scripts/ [10 files directly, 2 subdirs] - Build, indexing, validation, and parity auditing scripts.
│   ├── archive/ [2 files directly, 4 subdirs] - Legacy and one-off maintenance scripts archived for reference.
│   │   ├── checks/ [5 files] - Archived schema and entry check scripts.
│   │   ├── dataset-builds/ [19 files] - Archived dataset generation scripts.
│   │   ├── fixes/ [5 files] - Archived targeted database repair scripts.
│   │   └── migrations/ [26 files] - Archived data migration scripts.
│   └── data/ [8 files] - Master reference JSON/TSV data tables for dataset generation and parity audits.
├── shared/ [7 files] - Framework-agnostic dictionary UI engine, CSS styles, ID aliases, and theme taxonomy.
└── vocabulary/ [2 files directly, 15 subdirs] - Canonical vocabulary datasets organized by ISO 639-1 language code.
    ├── _canonical/ [2 files directly, 1 subdirs] - Canonical cross-linguistic search and flat index staging.
    │   └── en/ [3 files] - Canonical English reference vocabulary indices.
    ├── ba/ [5 files directly, 3 subdirs] - Bashkir (ba) vocabulary dataset.
    │   ├── a0_a1/ [20 files] - Bashkir beginner A0-A1 vocabulary theme files.
    │   ├── a1/ [1 file directly, 1 subdirs] - Bashkir A1 vocabulary extensions.
    │   └── a2/ [1 file] - Bashkir A2 vocabulary dataset.
    ├── br/ [5 files directly, 3 subdirs] - Breton (br) vocabulary dataset.
    │   ├── a0_a1/ [21 files] - Breton beginner A0-A1 vocabulary theme files.
    │   ├── a1/ [0 files directly, 1 subdirs] - Breton A1 vocabulary extensions.
    │   └── a2/ [1 file] - Breton A2 vocabulary dataset.
    ├── cv/ [5 files directly, 2 subdirs] - Chuvash (cv) vocabulary dataset.
    │   ├── a0_a1/ [21 files] - Chuvash beginner A0-A1 vocabulary theme files.
    │   └── a1/ [0 files directly, 1 subdirs] - Chuvash A1 vocabulary extensions.
    ├── de/ [5 files directly, 3 subdirs] - German (de) vocabulary dataset.
    │   ├── a0_a1/ [21 files] - German beginner A0-A1 vocabulary theme files.
    │   ├── a1/ [1 file directly, 1 subdirs] - German A1 vocabulary extensions.
    │   └── a2/ [1 file] - German A2 vocabulary dataset.
    ├── el/ [5 files directly, 8 subdirs] - Greek (el) vocabulary dataset.
    │   ├── a0/ [0 files directly, 1 subdirs] - Greek A0 vocabulary extensions.
    │   ├── a0_a1/ [34 files directly, 1 subdirs] - Greek beginner A0-A1 vocabulary theme files.
    │   ├── a1/ [0 files directly, 1 subdirs] - Greek A1 vocabulary extensions.
    │   ├── a2/ [40 files directly, 1 subdirs] - Greek elementary A2 vocabulary theme files.
    │   ├── b1/ [47 files directly, 1 subdirs] - Greek intermediate B1 vocabulary theme files.
    │   ├── b2/ [47 files directly, 1 subdirs] - Greek upper-intermediate B2 vocabulary theme files.
    │   ├── c1/ [45 files] - Greek advanced C1 vocabulary theme files.
    │   └── c2/ [29 files] - Greek mastery C2 vocabulary theme files.
    ├── en/ [5 files directly, 8 subdirs] - English (en) vocabulary dataset.
    │   ├── a0/ [0 files directly, 1 subdirs] - English A0 vocabulary extensions.
    │   ├── a0_a1/ [38 files directly, 1 subdirs] - English beginner A0-A1 vocabulary theme files.
    │   ├── a1/ [0 files directly, 1 subdirs] - English A1 vocabulary extensions.
    │   ├── a2/ [72 files directly, 1 subdirs] - English elementary A2 vocabulary theme files.
    │   ├── b1/ [57 files directly, 1 subdirs] - English intermediate B1 vocabulary theme files.
    │   ├── b2/ [53 files directly, 1 subdirs] - English upper-intermediate B2 vocabulary theme files.
    │   ├── c1/ [55 files] - English advanced C1 vocabulary theme files.
    │   └── c2/ [38 files] - English mastery C2 vocabulary theme files.
    ├── es/ [5 files directly, 3 subdirs] - Spanish (es) vocabulary dataset.
    │   ├── a0_a1/ [17 files] - Spanish beginner A0-A1 vocabulary theme files.
    │   ├── a1/ [0 files directly, 1 subdirs] - Spanish A1 vocabulary extensions.
    │   └── a2/ [1 file] - Spanish A2 vocabulary dataset.
    ├── fr/ [5 files directly, 8 subdirs] - French (fr) vocabulary dataset.
    │   ├── a0/ [1 file directly, 1 subdirs] - French A0 vocabulary extensions.
    │   ├── a0_a1/ [34 files directly, 1 subdirs] - French beginner A0-A1 vocabulary theme files.
    │   ├── a1/ [0 files directly, 1 subdirs] - French A1 vocabulary extensions.
    │   ├── a2/ [41 files directly, 1 subdirs] - French elementary A2 vocabulary theme files.
    │   ├── b1/ [47 files directly, 1 subdirs] - French intermediate B1 vocabulary theme files.
    │   ├── b2/ [48 files directly, 1 subdirs] - French upper-intermediate B2 vocabulary theme files.
    │   ├── c1/ [45 files] - French advanced C1 vocabulary theme files.
    │   └── c2/ [29 files] - French mastery C2 vocabulary theme files.
    ├── hy/ [5 files directly, 3 subdirs] - Armenian (hy) vocabulary dataset.
    │   ├── a0_a1/ [21 files] - Armenian beginner A0-A1 vocabulary theme files.
    │   ├── a1/ [0 files directly, 1 subdirs] - Armenian A1 vocabulary extensions.
    │   └── a2/ [1 file] - Armenian A2 vocabulary dataset.
    ├── it/ [5 files directly, 8 subdirs] - Italian (it) vocabulary dataset.
    │   ├── a0/ [0 files directly, 1 subdirs] - Italian A0 vocabulary extensions.
    │   ├── a0_a1/ [34 files directly, 1 subdirs] - Italian beginner A0-A1 vocabulary theme files.
    │   ├── a1/ [0 files directly, 1 subdirs] - Italian A1 vocabulary extensions.
    │   ├── a2/ [42 files directly, 1 subdirs] - Italian elementary A2 vocabulary theme files.
    │   ├── b1/ [47 files directly, 1 subdirs] - Italian intermediate B1 vocabulary theme files.
    │   ├── b2/ [48 files directly, 1 subdirs] - Italian upper-intermediate B2 vocabulary theme files.
    │   ├── c1/ [45 files] - Italian advanced C1 vocabulary theme files.
    │   └── c2/ [29 files] - Italian mastery C2 vocabulary theme files.
    ├── ka/ [5 files directly, 3 subdirs] - Georgian (ka) vocabulary dataset.
    │   ├── a0_a1/ [18 files] - Georgian beginner A0-A1 vocabulary theme files.
    │   ├── a1/ [1 file directly, 1 subdirs] - Georgian A1 vocabulary extensions.
    │   └── a2/ [1 file] - Georgian A2 vocabulary dataset.
    ├── pt/ [5 files directly, 3 subdirs] - Portuguese (pt) vocabulary dataset.
    │   ├── a0_a1/ [23 files] - Portuguese beginner A0-A1 vocabulary theme files.
    │   ├── a1/ [0 files directly, 1 subdirs] - Portuguese A1 vocabulary extensions.
    │   └── a2/ [1 file] - Portuguese A2 vocabulary dataset.
    ├── ru/ [5 files directly, 8 subdirs] - Russian (ru) vocabulary dataset.
    │   ├── a0/ [0 files directly, 1 subdirs] - Russian A0 vocabulary extensions.
    │   ├── a0_a1/ [29 files directly, 1 subdirs] - Russian beginner A0-A1 vocabulary theme files.
    │   ├── a1/ [0 files directly, 1 subdirs] - Russian A1 vocabulary extensions.
    │   ├── a2/ [28 files directly, 1 subdirs] - Russian elementary A2 vocabulary theme files.
    │   ├── b1/ [47 files directly, 1 subdirs] - Russian intermediate B1 vocabulary theme files.
    │   ├── b2/ [47 files directly, 1 subdirs] - Russian upper-intermediate B2 vocabulary theme files.
    │   ├── c1/ [45 files] - Russian advanced C1 vocabulary theme files.
    │   └── c2/ [29 files] - Russian mastery C2 vocabulary theme files.
    └── tt/ [5 files directly, 3 subdirs] - Tatar (tt) vocabulary dataset.
        ├── a0_a1/ [18 files] - Tatar beginner A0-A1 vocabulary theme files.
        ├── a1/ [0 files directly, 1 subdirs] - Tatar A1 vocabulary extensions.
        └── a2/ [1 file] - Tatar A2 vocabulary dataset.
```

---

## 3. Languages and CEFR Levels Covered per Content Type

The repository covers **14 languages** (ISO 639-1 codes) across 4 major content types. The breakdown of language and CEFR level coverage per content type is as follows:

### 1. Vocabulary Datasets (`vocabulary/<lang>/`)

| Language | Code | CEFR Levels Covered | Status & Notes |
| :--- | :--- | :--- | :--- |
| **English** | `en` | A0, A1, A0-A1, A2, B1, B2, C1, C2 | Fully populated across all CEFR levels (385+ files). |
| **French** | `fr` | A0, A1, A0-A1, A2, B1, B2, C1, C2 | Fully populated across all CEFR levels. |
| **Italian** | `it` | A0, A1, A0-A1, A2, B1, B2, C1, C2 | Fully populated across all CEFR levels. |
| **Russian** | `ru` | A0, A1, A0-A1, A2, B1, B2, C1, C2 | Fully populated across all CEFR levels. |
| **Greek** | `el` | A0, A1, A0-A1, A2, B1, B2, C1, C2 | Fully populated across all CEFR levels. |
| **Spanish** | `es` | A0-A1, A1, A2 | Beginner/elementary coverage. |
| **German** | `de` | A0-A1, A1, A2 | Beginner/elementary coverage. |
| **Portuguese** | `pt` | A0-A1, A1, A2 | Beginner/elementary coverage. |
| **Bashkir** | `ba` | A0-A1, A1, A2 | Regional/indigenous language beginner coverage. |
| **Breton** | `br` | A0-A1, A1, A2 | Regional/indigenous language beginner coverage. |
| **Chuvash** | `cv` | A0-A1, A1 | Regional/indigenous language beginner coverage. |
| **Georgian** | `ka` | A0-A1, A1, A2 | Caucasian language beginner coverage. |
| **Armenian** | `hy` | A0-A1, A1, A2 | Caucasian/Indo-European beginner coverage. |
| **Tatar** | `tt` | A0-A1, A1, A2 | Regional/indigenous language beginner coverage. |

### 2. Functional Phrases (`functional-phrases/<lang>/`)

| Language | Code | CEFR Levels Covered | Situations Covered |
| :--- | :--- | :--- | :--- |
| **English** | `en` | A1, A2, B1, B2, C1_C2 | Everyday transactions, travel, medical, professional, relocation. |
| **French** | `fr` | A1 | Everyday transactions, eating out, travel, emergencies, social interaction. |
| **Italian** | `it` | A1 | Everyday transactions, eating out, travel, emergencies, social interaction. |
| **Russian** | `ru` | A1 | Everyday transactions, eating out, travel, emergencies, social interaction. |
| **Greek** | `el` | A1 | Everyday transactions, eating out, travel, emergencies, social interaction. |

### 3. Curriculum Framework (`curriculum/<lang>/`)

| Language | Code | CEFR Levels Covered | Status |
| :--- | :--- | :--- | :--- |
| **English** | `en` | A1, A2, B1, B2, C1, C2 (planned) | Directory structure scaffolded (`curriculum/en/`). Competency schema defined in `schemas/curriculum-competency.schema.json`. |

### 4. Raw Intake Datasets (`intake/a0_a1_fr_it_ru_el/`)

| Language | Benchmark Coverage |
| :--- | :--- |
| **Multilingual Benchmark** | 516 core beginner concepts across `en`, `fr`, `it`, `ru`, `el` in `intake/a0_a1_fr_it_ru_el/all_languages.csv`. |

---

## 4. Publicly Served Paid / Restricted Content

All content in `COSYdata` is currently stored in git-tracked public files and served over **GitHub Pages** (`https://cosylanguages.github.io/COSYdata/`). There are **no access controls or authentication mechanisms** restricting access to premium, course-specific, or specialized track content.

### Publicly Readable Content Intended for Paid Platform / Restricted Courses (`COSYplatform`)

The following specialized track vocabulary files and functional phrase sets are intended for paid, specialized platform courses (e.g., Professional, Relocation, Exam Preparation, Specialized Professions) but are publicly readable and downloadable:

1. **Specialized Professional Track Datasets (`vocabulary/en/` & non-English B2–C2 folders)**:
   - `vocabulary/en/c1/legal_specialization.json` - Professional Legal terminology.
   - `vocabulary/en/c1/medical_professions.json` - Medical specialization terms.
   - `vocabulary/en/c1/business_strategy.json` - Executive business & corporate strategy.
   - `vocabulary/en/c1/tech_engineering.json` - Technical engineering & software development terms.
   - `vocabulary/en/c1/discourse-argument.json` - Advanced professional negotiation & academic debate terms.
   - `vocabulary/en/b2/marketing_finance.json` - Corporate marketing and finance vocabulary.
   - `vocabulary/en/b2/teachers_scientists.json` - Academic research & teaching terminology.
   - Equivalent `teachers_scientists.json` files across `fr`, `it`, `ru`, `el` at levels B1, B2, C1, C2 (e.g. `vocabulary/fr/c1/teachers_scientists.json`).

2. **Exam Preparation Track Vocabulary (`domain: "exam"`)**:
   - `vocabulary/exam-tracks.json` - Comprehensive track mapping for IELTS, TOEFL, and Cambridge exams.
   - 1,200+ vocabulary entries tagged with `domain: "exam"` across English levels B1, B2, and C1.

3. **Relocation & Specialized Functional Phrase Datasets (`functional-phrases/`)**:
   - `functional-phrases/en/b2/relocation.json` - Practical relocation, housing contracts, and banking phrases.
   - `functional-phrases/en/c1_c2/professional-workplace.json` - High-level workplace meeting, negotiation, and leadership phrases.
   - `functional-phrases/en/b1/medical-health.json` - Specialized healthcare consultation phrases.

---

## 5. Ecosystem Overlaps and Cross-Repository Duplication

`COSYdata` overlaps directly with other repositories in the **COSYlanguages ecosystem**. Below is the catalog of overlapping paths and their fingerprint data (**file count** and **newest commit date** as of October 14, 2026):

| Content Area | Target COSY Repository | Overlapping Paths in `COSYdata` | File Count | Newest Commit Date | Overlap Analysis & Fingerprint |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Vocabulary Data** | `COSYlanguages` (Public Site) | `vocabulary/` | **1,752 files** | 2026-10-13 | `COSYlanguages` historically stored inline vocabulary JS files. `COSYdata` serves as the central canonical JSON source. |
| **Functional Phrases** | `COSYmanuals` / `COSYplatform` | `functional-phrases/` | **80 files** | 2026-10-13 | Phrase collections in `COSYdata` link directly to `COSYmanuals` documentation pages (`manual_url`). |
| **Curriculum Framework** | `COSYplatform` / `COSYlanguages` | `curriculum/` | **1 file** | 2026-10-13 | Curriculum competency mappings overlap with `COSYplatform` course structure definitions. |
| **Shared UI & Taxonomy** | `COSYlanguages` (Public Site) | `shared/` | **7 files** | 2026-10-13 | `shared/dictionary-ui.js` and `shared/dictionary-ui.css` are embedded directly in `COSYlanguages` pages. |
| **JSON Schemas** | `COSYplatform` / `COSYdata` | `schemas/` | **43 files** | 2026-10-13 | Schemas dictate data contracts consumed by both `COSYlanguages` and `COSYplatform`. |
| **Events Ingestion** | `COSYevents` | `scripts/import-events-vocab.cjs`, `reports/events-import-needs-review.json` | **2 files** | 2026-10-13 | Ingests session topics from `COSYevents` into `COSYdata` vocabulary entries. |

---

## 6. Audit of References to COSYworld

`COSYworld` is a dormant product being discontinued across the COSYlanguages ecosystem.

### Results on `origin/main`
- **0 occurrences found on `origin/main`**. `COSYworld` has been completely scrubbed from active codebase files, documentation, config, and comments on `main`.

### Results across Remote Feature Branches (21 Occurrences in Legacy Audit Docs)
The string `COSYworld` or `cosyworld` appears in **21 locations across 15 remote feature branches**, restricted entirely to archived markdown audit reports (`reports/cosylanguages-vs-cosydata-audit.md` and `reports/vocabulary-audit.md`):

1. `origin/add-philosophy-and-tech-subthemes-13463833217461843834:reports/cosylanguages-vs-cosydata-audit.md:62`
2. `origin/align-a2-theme-taxonomy-12036025359844937027:reports/cosylanguages-vs-cosydata-audit.md:62`
3. `origin/b2-theme-canonicalization-9196972976515181642:reports/cosylanguages-vs-cosydata-audit.md:62`
4. `origin/feat/functional-phrases-fr-it-ru-el-and-lesson-schema-13072062435074806285:reports/cosylanguages-vs-cosydata-audit.md:62`
5. `origin/feature/dictionary-ui-engine-15238310956820988445:reports/cosylanguages-vs-cosydata-audit.md:62`
6. `origin/fix/relocate-weather-terms-a0-a1-3459923183461518367:reports/cosylanguages-vs-cosydata-audit.md:62`
7. `origin/jules-12702333567308526818-c84b1f9b:reports/cosylanguages-vs-cosydata-audit.md:62`
8. `origin/jules-17614876148155145487-702be1c0:reports/cosylanguages-vs-cosydata-audit.md:62`
9. `origin/jules-4647664532026367309-5f92a2fa:reports/vocabulary-audit.md:22`
10. `origin/jules-4647664532026367309-5f92a2fa:reports/vocabulary-audit.md:23`
11. `origin/jules-4647664532026367309-5f92a2fa:reports/vocabulary-audit.md:155`
12. `origin/jules-4647664532026367309-5f92a2fa:reports/vocabulary-audit.md:157`
13. `origin/jules-4647664532026367309-5f92a2fa:reports/vocabulary-audit.md:159`
14. `origin/jules-4647664532026367309-5f92a2fa:reports/vocabulary-audit.md:160`
15. `origin/jules-4933975161012294873-81a7db99:reports/cosylanguages-vs-cosydata-audit.md:62`
16. `origin/jules-b1-theme-taxonomy-canonicalization-12617077298078618763:reports/cosylanguages-vs-cosydata-audit.md:62`
17. `origin/jules/add-macro-domains-themes-json-12821525970510583524:reports/cosylanguages-vs-cosydata-audit.md:62`
18. `origin/jules/build-search-index-17789276398921370712:reports/cosylanguages-vs-cosydata-audit.md:62`
19. `origin/jules/dictionary-ui-audit-18206019282233325619:reports/cosylanguages-vs-cosydata-audit.md:62`
20. `origin/jules/migrate-en-vocab-all-levels-12433192815503676838:reports/cosylanguages-vs-cosydata-audit.md:62`
21. `origin/theme-taxonomy-c1-c2-audit-18078034976957492093:reports/cosylanguages-vs-cosydata-audit.md:62`

---

## 7. Inter-Repository Dependencies

The `COSYdata` repository links to other repositories in the COSY ecosystem via static HTML stylesheets, external URLs, cross-reference ID references, and schema URIs.

### Exact File and Line References

1. **Static CSS Token Import from COSYlanguages**:
   - `index.html:22`: `<link rel="stylesheet" href="https://cosylanguages.github.io/COSYlanguages/shared/css/tokens.css" />`
2. **Navigation Header Links to Sister Repositories**:
   - `index.html:143`: `<li><a href="https://cosylanguages.github.io/COSYlanguages/" class="cosy-strip-link">COSYlanguages</a></li>`
   - `index.html:145`: `<li><a href="https://cosylanguages.github.io/COSYtools/" target="_blank" rel="noopener" class="cosy-strip-link">COSYtools</a></li>`
   - `index.html:146`: `<li><a href="https://cosylanguages.github.io/COSYgames/" target="_blank" rel="noopener" class="cosy-strip-link">COSYgames</a></li>`
   - `index.html:147`: `<li><a href="https://cosylanguages.github.io/COSYevents/" target="_blank" rel="noopener" class="cosy-strip-link">COSYevents</a></li>`
3. **Cross-Reference Tool IDs (`related_forms` in Vocabulary Entries)**:
   - Thousands of verb vocabulary entries across `vocabulary/<lang>/` contain `related_forms` strings pointing directly to `COSYtools` endpoints:
     - `COSYtools:fr-conjugeur:<headword>` (French Verb Conjugator)
     - `COSYtools:it-coniugatore:<headword>` (Italian Verb Conjugator)
     - `COSYtools:ru-spryazhenie:<headword>` (Russian Verb Conjugator)
     - `COSYtools:el-klisi-rimaton:<headword>` (Greek Verb Conjugator)
     - `COSYtools:en-irregular-verbs:<headword>` (English Irregular Verbs)
     - `COSYtools:en-verb-prep:<headword>` (English Verb Preposition Patterns)
   - Example line: `vocabulary/en/a0_a1/verbs.json:45: "related_forms": ["COSYtools:en-verb-prep:agree"]`
4. **Schema Canonical URIs**:
   - `schemas/vocabulary.schema.json:2`: `"$id": "https://cosylanguages.github.io/COSYdata/schemas/vocabulary.schema.json"`
   - `schemas/functional-phrase.schema.json:2`: `"$id": "https://cosylanguages.github.io/COSYdata/schemas/functional-phrase.schema.json"`
   - `schemas/lesson.schema.json:2`: `"$id": "https://cosylanguages.github.io/COSYdata/schemas/lesson.schema.json"`
   - `schemas/curriculum-competency.schema.json:2`: `"$id": "https://cosylanguages.github.io/COSYdata/schemas/curriculum-competency.schema.json"`
5. **Cross-Repo Repository Dispatch Workflow**:
   - `.github/workflows/notify-consumers.yml:25`: Dispatches `repository_dispatch` event (`cosydata_updated`) to `cosylanguages/COSYlanguages`.

---

## 8. Dead Weight and Artifact Catalog

The repository contains several committed log files, temporary debug scripts, unindexed root JSON dumps, and archived legacy scripts that can be safely cleaned up in future maintenance tasks:

### 1. Committed Log Files (6 Files)
- `validate.log`
- `validate_full.log`
- `val.log`
- `check_missing.cjs` (log output / one-off script)
- `check_missing_map.cjs`
- `check_detailed.cjs`

### 2. Root Unindexed Data Dumps & Artifacts (2 Files)
- `a0_a1_entries.json` - Raw unindexed JSON dump at repo root.
- `seasons.months.days.json` - Duplicate multi-language calendar reference dump (superseded by `vocabulary/<lang>/a0_a1/calendar.json`).

### 3. Archived Scripts (`scripts/archive/` - 73 Files)
- `scripts/archive/checks/` (5 files) - Obsolete checking scripts.
- `scripts/archive/dataset-builds/` (19 files) - Obsolete build scripts.
- `scripts/archive/fixes/` (5 files) - One-off repair scripts.
- `scripts/archive/migrations/` (26 files) - One-off migration scripts from legacy imports.

### 4. Stale / Generated Audit Reports (`reports/` - 60 Files)
- Numerous static markdown and JSON audit reports generated during intermediate migration phases (e.g. `reports/home-audit.json`, `reports/multi-theme-audit.json`, `reports/cosylanguages-migration-audit.md`, `reports/fr-home-questions.md`).

---

## 9. Deployment and Access Control

### 1. Deployment Architecture
- **Host**: **GitHub Pages**
- **Canonical Site URL**: `https://cosylanguages.github.io/COSYdata/`
- **Build & Serving Mechanism**: Static web hosting serving directly from the root `/` directory of the `main` branch.
- **Index Assets**: `index.html` provides a lightweight browser interface powered by `shared/dictionary-ui.js` and `shared/vocab-resolver.js`.

### 2. Continuous Integration & Automation (`.github/workflows/`)
- `validate-vocabulary.yml`: Runs on every push and pull request to execute `npm run validate` (`scripts/validate.cjs`), ensuring all vocabulary JSON files conform to JSON schemas.
- `notify-consumers.yml`: Triggers on push to `main`, sending a GitHub repository dispatch event (`cosydata_updated`) to `cosylanguages/COSYlanguages` to notify downstream consumers.

### 3. Access Control Assessment
- **Access Level**: **Public (Open)**.
- **CORS**: GitHub Pages serves all assets with `Access-Control-Allow-Origin: *`, allowing any web application to fetch JSON datasets directly.
- **Authentication**: **None**. There is no API key, token, or paywall restriction on any endpoint or file path. All paid course vocabulary, exam track vocabulary, and specialized functional phrases are fully public and readable.
