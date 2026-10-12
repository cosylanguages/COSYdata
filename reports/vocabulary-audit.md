# COSYlanguages & COSYdata Vocabulary Audit Report

**Date**: October 2026
**Repositories**: `cosylanguages/COSYlanguages` and `cosylanguages/COSYdata`
**Scope**: Comprehensive vocabulary data audit covering local vs. central data locations, repository ownership, practice page loading paths, dropdown construction logic, legacy resource references, and language count statements.

---

## Executive Summary

1. **Vocabulary Directory Locations**:
   - In **COSYlanguages** (client application platform): Vocabulary data exists across `vocabulary/` (1,198 legacy `.js` files in uppercase level folders `A1`–`C2`), `data/` (static application configurations), `languages/` (UI locale dictionaries), `curriculum/` (competency maps), `practice/` (practice page engines), and `apps/` (interactive learning mini-apps). Home-related files (`house_furniture.js`, `housing.js`, `furniture.js`) exist in `vocabulary/` across levels.
   - In **COSYdata** (central data hub): All vocabulary data exists as standardized Draft 2020-12 `.json` files in `vocabulary/<lang>/<level>/*.json` (1,648 files across 14 languages). Home-related files (`homes.json`, `rooms.json`, `furniture/*.json`) exist across all 14 language directories under `home/` subfolders (122 files total).
2. **Vocabulary Ownership & Structural Overlap**: COSYdata is the canonical owner and single source of truth for vocabulary data. COSYlanguages holds legacy copies in `.js` format wrapped in client-side IIFEs (`window.vocabularyData = ...`). COSYdata standardizes these entries into `.json` schema files using canonical IDs (`<lang>:<slug>:<form>`), lowercase level paths (`a0`, `a0_a1`, `a1`, `a2`, `b1`, `b2`, `c1`, `c2`), and strict metadata fields (`transcription`, `definitions`, `examples`, `emoji`, `domain`, `theme`, `sub_theme`, `secondary_themes`, `rooms`, `verbs`, `concept`).
3. **Practice Page Loading Mechanisms**:
   - **Local files**: `practice/index.html` and practice scripts load local `vocabulary/<lang>/<LEVEL>/*.js` modules via script tags for offline practice.
   - **COSYdata fetches**: `shared/dictionary-ui.js` and `shared/vocab-resolver.js` fetch central JSON indexes (`vocabulary/<lang>/search-index.json`, `vocabulary/<lang>/index.json`, `shared/id-aliases.json`, and `vocabulary/<lang>/<theme>.json`) over HTTP from `https://cosylanguages.github.io/COSYdata/`.
4. **Dropdown Values Construction**:
   - **Level**: Built from unique `entry.level` (or `entry.levels`) fields in `search-index.json`, filtered against `['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2']`.
   - **Theme (Category)**: Built from unique `entry.theme` strings in `search-index.json` and validated against `shared/themes.json` (46 primary themes).
   - **Sub-theme**: Derived from `entry.sub_theme` fields and composite keys in `vocabulary/<lang>/themes-index.json` (e.g., `"housing/furniture"`).
5. **COSYworld & Teacher Resources References**:
   - `COSYworld`: **0 references** found in the codebase.
   - Teacher Resources: Sub-theme `"teachers-scientists"` in `schemas/themes.json` (18 primary theme occurrences), professional track `"teachers-scientists"` in `vocabulary/professional-tracks.json`, four theme JSON files in English (`vocabulary/en/b1|b2|c1|c2/teachers_scientists.json`), teacher-related vocabulary entries (`en:teacher:noun`, `en:parent-teacher-meeting:noun`), and term lists in audit scripts (`check_missing.cjs`, `check_detailed.cjs`).
6. **Language Count Statements**: The codebase states **14 supported languages** (`en`, `fr`, `it`, `de`, `ru`, `el`, `es`, `pt`, `br`, `cv`, `hy`, `ka`, `ba`, `tt`) in `README.md`, `index.html`, `shared/dictionary-ui.js`, `seasons.months.days.json`, and multiple audit reports. The README text lists 13 non-English target languages alongside English, while CEFR beginner policy documents restrict core parity targets to 5 languages (`en`, `fr`, `it`, `ru`, `el`).

---

## 1. Vocabulary Location & File Counts per Language

### COSYlanguages vs. COSYdata Directory Structure Comparison

| Directory Path | Role in `COSYlanguages` (App Platform) | Role in `COSYdata` (Data Repository) |
| :--- | :--- | :--- |
| **`vocabulary/`** | 1,198 legacy `.js` files across uppercase level directories (`A1`–`C2`) | 1,648 canonical `.json` data files across lowercase level directories (`a0`–`c2`) |
| **`data/`** | Application configuration JSONs and static exercise data | Not present at root (helper files reside in `scripts/data/`) |
| **`languages/`** | UI locale dictionary modules and language switcher settings | Not present at root |
| **`curriculum/`** | Lesson competence maps and grammar references | Competency map files for `en` (`curriculum/en/index.json`) |
| **`practice/`** | Practice page (`practice/index.html`) and drill engines | Not present at root |
| **`apps/`** | Mini-apps, vocabulary quiz games, and interactive tools | Not present at root |

### Detailed File Counts and Home-Related File Inventory

The 13 languages listed in `LANGUAGES.md` / prompt plus the 14th dataset (`cv`) were audited:

| Language Code | Language Name | COSYlanguages Legacy `.js` Files | COSYdata Canonical `.json` Files | COSYdata Level Breakdown | Home-Related File Count (COSYdata) | Home-Related File Paths (COSYdata) |
| :--- | :--- | :---: | :---: | :--- | :---: | :--- |
| **`en`** | English | 184 | 346 | `a0`: 3, `a0_a1`: 46, `a1`: 7, `a2`: 81, `b1`: 60, `b2`: 56, `c1`: 55, `c2`: 38 | 34 | `a0/home/homes.json`, `a0/home/rooms.json`, `a0/home/furniture/living_room.json`, `a0_a1/home/homes.json`, `a0_a1/home/rooms.json`, `a0_a1/home/furniture/*.json` (6 files), `a1/home/homes.json`, `a1/home/rooms.json`, `a1/home/furniture/*.json` (5 files), `a2/home/homes.json`, `a2/home/rooms.json`, `a2/home/furniture/*.json` (7 files), `b1/home/homes.json`, `b1/home/furniture/*.json` (2 files), `b2/home/homes.json`, `b2/home/rooms.json`, `b2/home/furniture/general.json` |
| **`fr`** | French | 91 | 263 | `a0`: 11, `a0_a1`: 34, `a1`: 5, `a2`: 44, `b1`: 47, `b2`: 48, `c1`: 45, `c2`: 29 | 19 | `a0/home/homes.json`, `a0/home/rooms.json`, `a0/home/furniture/*.json` (8 files), `a1/home/homes.json`, `a1/home/rooms.json`, `a1/home/furniture/*.json` (3 files), `a2/home/rooms.json`, `a2/home/furniture/bathroom.json`, `a2/home/furniture/living_room.json` |
| **`it`** | Italian | 90 | 257 | `a0`: 3, `a0_a1`: 34, `a1`: 9, `a2`: 43, `b1`: 47, `b2`: 47, `c1`: 45, `c2`: 29 | 14 | `a0/home/homes.json`, `a0/home/rooms.json`, `a0/home/furniture/general.json`, `a1/home/rooms.json`, `a1/home/furniture/*.json` (8 files), `a2/home/rooms.json` |
| **`ru`** | Russian | 77 | 235 | `a0`: 4, `a0_a1`: 29, `a1`: 5, `a2`: 29, `b1`: 47, `b2`: 47, `c1`: 45, `c2`: 29 | 11 | `a0/home/homes.json`, `a0/home/rooms.json`, `a0/home/furniture/*.json` (2 files), `a1/home/rooms.json`, `a1/home/furniture/*.json` (4 files), `a2/home/rooms.json` |
| **`el`** | Greek | 70 | 246 | `a0`: 1, `a0_a1`: 34, `a1`: 3, `a2`: 40, `b1`: 47, `b2`: 47, `c1`: 45, `c2`: 29 | 5 | `a0/home/rooms.json`, `a1/home/homes.json`, `a1/home/rooms.json`, `a1/home/furniture/general.json` |
| **`es`** | Spanish | 51 | 25 | `a0_a1`: 17, `a1`: 7, `a2`: 1 | 7 | `a1/home/homes.json`, `a1/home/rooms.json`, `a1/home/furniture/*.json` (5 files) |
| **`de`** | German | 51 | 27 | `a0_a1`: 21, `a1`: 5, `a2`: 1 | 4 | `a1/home/homes.json`, `a1/home/furniture/*.json` (3 files) |
| **`pt`** | Portuguese | 51 | 31 | `a0_a1`: 23, `a1`: 7, `a2`: 1 | 7 | `a1/home/homes.json`, `a1/home/rooms.json`, `a1/home/furniture/*.json` (5 files) |
| **`hy`** | Armenian | 65 | 26 | `a0_a1`: 21, `a1`: 4, `a2`: 1 | 4 | `a1/home/homes.json`, `a1/home/rooms.json`, `a1/home/furniture/*.json` (2 files) |
| **`ka`** | Georgian | 65 | 23 | `a0_a1`: 18, `a1`: 4, `a2`: 1 | 3 | `a1/home/homes.json`, `a1/home/rooms.json`, `a1/home/furniture/general.json` |
| **`tt`** | Tatar | 65 | 21 | `a0_a1`: 18, `a1`: 2, `a2`: 1 | 2 | `a1/home/furniture/bedroom.json`, `a1/home/furniture/general.json` |
| **`ba`** | Bashkir | 65 | 25 | `a0_a1`: 20, `a1`: 4, `a2`: 1 | 3 | `a1/home/rooms.json`, `a1/home/furniture/general.json`, `a1/home/furniture/office.json` |
| **`br`** | Breton | 65 | 25 | `a0_a1`: 21, `a1`: 3, `a2`: 1 | 3 | `a1/home/rooms.json`, `a1/home/furniture/bedroom.json`, `a1/home/furniture/general.json` |
| **`cv`** *(14th)* | Chuvash | 33 | 24 | `a0_a1`: 20, `a1`: 4 | 3 | `a1/home/homes.json`, `a1/home/furniture/general.json`, `a1/home/furniture/living_room.json` |

---

## 2. Vocabulary Ownership & Structural Comparison

### Repository Ownership Role
**COSYdata IS the canonical owner** and central source of truth for all vocabulary datasets in the COSY ecosystem. Downstream repositories (such as `COSYlanguages`, `COSYmanuals`, `COSYgames`, and `COSYtools`) consume vocabulary data from `COSYdata` via GitHub Pages or shared modules.

### Structural & Field Differences: COSYlanguages vs. COSYdata

| Feature / Dimension | COSYlanguages (Downstream Legacy) | COSYdata (Canonical Repo) |
| :--- | :--- | :--- |
| **File Format** | JavaScript `.js` wrapped in IIFEs (`window.vocabularyData = ...`) | Standardized Draft 2020-12 `.json` files |
| **Entry Identification** | Implicit or array index based; no standardized ID string | Canonical composite ID string (`<lang>:<slug>:<form>`, e.g. `en:chair:noun`) |
| **CEFR Directory Structure** | Uppercase level folder names (`A1`, `A2`, `B1`, `B2`, `C1`, `C2`) | Lowercase level folder names (`a0`, `a0_a1`, `a1`, `a2`, `b1`, `b2`, `c1`, `c2`) |
| **Phonetics & Dialects** | Optional or missing transcription strings | Mandatory IPA `transcription` (plus dialect `transcription_variants`) |
| **Grammar Metadata** | Basic gender/plural in some files; inconsistent | Standardized `gender`, `article`, `countability`, `plural_form`, `past_tense`, `past_participle`, `prepositions` |
| **Taxonomy & Housing** | Single `category` string | Standardized `theme`, `sub_theme`, `secondary_themes`, `rooms`, `verbs`, `see_also`, `concept` |
| **Course Domain Tagging** | Unstandardized or missing | Validated comma-separated `domain` tags (`general`, `spoken`, `travel`, `relocation`, `exam`, `professional`) |
| **Validation Engine** | None / ad-hoc scripts | Strict Ajv JSON Schema validation (`npm run validate`) |

---

## 3. Vocabulary Loading Mechanisms & File Paths

### Practice Page (`practice/index.html`) & UI Engine Vocabulary Loading

```
[User Browser / Practice UI]
       │
       ├─► Local File Loading (COSYlanguages Practice Page):
       │   └── <script src="../vocabulary/<lang>/<LEVEL>/<theme>.js"></script>
       │       (Loaded for local/offline client practice drills)
       │
       └─► Remote COSYdata Endpoints (Online Fetching):
           ├── 1. Initial Hub Load: fetch('./vocabulary/<lang>/index.json')
           ├── 2. UI Engine Init: fetch('https://cosylanguages.github.io/COSYdata/vocabulary/<lang>/search-index.json')
           └─► 3. On-Demand Entry Resolution: resolveVocab(ref) via shared/vocab-resolver.js
                  ├── fetch('https://cosylanguages.github.io/COSYdata/vocabulary/<lang>/index.json')
                  ├── fetch('https://cosylanguages.github.io/COSYdata/shared/id-aliases.json')
                  └── fetch('https://cosylanguages.github.io/COSYdata/vocabulary/<lang>/<theme>.json')
```

### Exact Fetch and Import Paths

1. **Local Script Import (COSYlanguages practice/index.html)**:
   - `<script src="../vocabulary/${lang}/${level}/${theme}.js"></script>`
2. **`index.html` (COSYdata Vocabulary Hub)**:
   - Script import: Inline ES module `<script type="module">`
   - Fetch path: `fetch(`./vocabulary/${lang.code}/index.json`)`
3. **`shared/dictionary-ui.js` (Dictionary Engine)**:
   - Module import: `import { resolveVocab, hydrateVocabElements } from './vocab-resolver.js';`
   - Fetch path: `fetch(`${baseUrl}vocabulary/${lang}/search-index.json`)`
4. **`shared/vocab-resolver.js` (Word Resolver)**:
   - Base URL default: `https://cosylanguages.github.io/COSYdata/`
   - Index lookup path: `fetch(`${baseUrl}vocabulary/${lang}/index.json`)`
   - ID Alias lookup path: `fetch(`${baseUrl}shared/id-aliases.json`)`
   - Full Theme file path: `fetch(`${baseUrl}vocabulary/${lang}/${theme}.json`)` (e.g. `vocabulary/en/a0_a1/animals.json`)

---

## 4. Dropdown Values Construction (Level, Theme, Sub-theme)

The Dictionary UI engine (`shared/dictionary-ui.js`) constructs filter and navigation dropdown values dynamically from specific JSON entry fields in `search-index.json` and index files:

```
                  ┌───────────────────────────────────────────────┐
                  │   vocabulary/<lang>/search-index.json        │
                  └───────────────────────┬───────────────────────┘
                                          │
            ┌─────────────────────────────┼─────────────────────────────┐
            ▼                             ▼                             ▼
   [ entry.level ]               [ entry.theme ]               [ entry.sub_theme ]
            │                             │                             │
            ▼                             ▼                             ▼
   Level Dropdown / Filter       Theme Dropdown / Category     Sub-theme Dropdown / Filter
   (filtered against ALL_LEVELS)  (sorted alphabetically)      (plus themes-index.json keys)
```

### 1. Level Dropdown
- **Source Fields**: `entry.level` (string, e.g. `"A1"`) and `entry.levels` (array of strings, e.g. `["A1", "A2"]`).
- **Construction Logic**: Collected into a Set during `loadSearchIndex()`, then filtered against canonical sequence `ALL_CEFR_LEVELS = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2']`.

### 2. Theme (Category) Dropdown
- **Source Field**: `entry.theme` (string, e.g. `"housing"`, `"animals"`).
- **Construction Logic**: Collected into `categorySet` during index traversal, sorted alphabetically, and formatted into human-readable label strings. Cross-checked against canonical taxonomy in `shared/themes.json` (46 primary themes).

### 3. Sub-theme Dropdown
- **Source Field**: `entry.sub_theme` (string, e.g. `"furniture"`, `"chores"`).
- **Construction Logic**: Extracted from entry data and mapped via `vocabulary/<lang>/themes-index.json` where composite key strings follow the format `"theme/sub_theme"` (e.g. `"housing/furniture"`, `"education/classroom_objects"`).

---

## 5. References to Legacy Resources (COSYworld and Teacher Resources)

All occurrences of `COSYworld` and teacher-related metadata across the codebase were audited for future cleanup tasks.

### 1. COSYworld References
- **Findings**: **0 references found**. Neither `COSYworld` nor `cosyworld` appears anywhere in the codebase or git-tracked files.

### 2. Teacher Resources & Metadata References

| Location / File | Reference Type | Exact Details |
| :--- | :--- | :--- |
| **`schemas/themes.json`** | Taxonomy Enum | Sub-theme slug `"teachers-scientists"` defined across 18 primary themes (e.g., `actions/teachers-scientists`, `education/teachers-scientists`, `work/teachers-scientists`). |
| **`vocabulary/professional-tracks.json`** | Professional Track Metadata | Defines track `{"slug": "teachers-scientists", "label": "Teachers & Scientists"}`. |
| **`vocabulary/en/b1/teachers_scientists.json`** | Theme File | English B1 theme file containing teacher/scientist terms. |
| **`vocabulary/en/b2/teachers_scientists.json`** | Theme File | English B2 theme file containing teacher/scientist terms. |
| **`vocabulary/en/c1/teachers_scientists.json`** | Theme File | English C1 theme file containing teacher/scientist terms. |
| **`vocabulary/en/c2/teachers_scientists.json`** | Theme File | English C2 theme file containing teacher/scientist terms. |
| **`a0_a1_entries.json`** | Entry IDs | `en:i-m-a-teacher:phrase` and `en:teacher:noun`. |
| **`vocabulary/en/b1/education.json`** | Entry ID | `en:parent-teacher-meeting:noun`. |
| **`check_missing.cjs` & `check_detailed.cjs`** | Script Term Lists | Term array includes `"teacher"` as a required basic check word. |

---

## 6. Language Count Statements Across the Repository

All occurrences of language count statements were cataloged across documentation, code, configuration, and reports:

### 1. Locations Stating "14 Target / Supported Languages"
1. **`README.md`** (line 12): Lists 14 ISO language code directories (`en`, `fr`, `it`, `ru`, `el`, `es`, `de`, `pt`, `hy`, `ka`, `ba`, `br`, `cv`, `tt`).
2. **`shared/dictionary-ui.js`** (lines 27–42): `SUPPORTED_LANGUAGES` array defines 14 languages.
3. **`index.html`** (lines 191–206): `languages` array defines 14 languages.
4. **`seasons.months.days.json`** (lines 2, 3): `"across 14 languages"`, `"total_languages": 14`.
5. **`reports/a0_a1_multilingual_comparison_audit.md`** (lines 7, 9, 33, 203): "across all 14 supported languages in COSYdata".
6. **`reports/cosylanguages-vs-cosydata-audit.md`** (line 8): "14 languages (`ba`, `br`, `cv`, `de`, `el`, `en`, `es`, `fr`, `hy`, `it`, `ka`, `pt`, `ru`, `tt`)".
7. **`reports/dictionary-ui-audit.md`** (lines 23, 27, 1749, 1767): "14 Language Directories".
8. **`reports/family_vocabulary_audit.md`** (lines 1, 4): "14 supported languages".
9. **`scripts/archive/README.md`** (line 8): "across all 14 languages".

### 2. Locations Listing 13 Languages
1. **Task prompt specification**: `(en, fr, it, ru, el, es, de, pt, hy, ka, tt, ba, br)` — lists 13 language codes, omitting `cv` (Chuvash).
2. **`README.md` text context**: Lists 13 non-English languages alongside English as primary non-English expansion targets.

### 3. Other Language Count References
1. **`docs/a0-a1-policy.md`** (line 3): Standard for 5 core target languages (`en`, `fr`, `it`, `ru`, `el`).
2. **`intake/a0_a1_fr_it_ru_el/PLAN.md`**: References 4 non-English core target languages (`fr`, `it`, `ru`, `el`).

---

## Conclusion & Recommendations

1. **No Data Modification Required**: This report is read-only as requested.
2. **Consolidation Readiness**: Downstream applications (`COSYlanguages`, `COSYmanuals`, `COSYgames`) can safely fetch vocabulary directly from `COSYdata` via `shared/dictionary-ui.js` and `shared/vocab-resolver.js`.
3. **Future Cleanup Task**: The teacher resource references identified in Section 5 (`teachers-scientists` sub-theme, track metadata, and theme files) can be removed or restructured in a dedicated follow-up task.
