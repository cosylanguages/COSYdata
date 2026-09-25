# COSYlanguages vs COSYdata Vocabulary Comparison Audit

## Executive Summary
This report presents a language-by-language, level-by-level, and word-level comparison between the vocabulary dataset currently residing in **COSYlanguages** (`vocabulary/`) and the central source-of-truth dataset in **COSYdata** (`https://github.com/cosylanguages/cosydata/tree/main/vocabulary/`).

### Primary Findings
1. **Repository Inventory**:
   - **COSYlanguages**: 1,198 total vocabulary files across **14 languages** (`ba`, `br`, `cv`, `de`, `el`, `en`, `es`, `fr`, `hy`, `it`, `ka`, `pt`, `ru`, `tt`).
   - **COSYdata**: 407 total vocabulary files across **5 core languages** (`el`, `en`, `fr`, `it`, `ru`).
2. **Format Differences**:
   - **COSYlanguages**: Uses client-side JavaScript wrapped modules (`(function() { const data = [...]; window.vocabularyData = ...; })();`) in `.js` format (with occasional `.json` files). Folder structure uses uppercase level codes (`A1`, `A2`, `B1`, `B2`, `C1`, `C2`).
   - **COSYdata**: Uses standardized Draft 2020-12 JSON files (`.json`) with unified schemas (`id`, `word`, `language`, `form`, `level`, `transcription`, `emoji`, `definitions`, `examples`, `domain`, `theme`). Folder structure uses lowercase level codes (`a0_a1`, `a2`, `b1`, `b2`, `c1`, `c2`).
3. **Data Overlap & Unique Scope**:
   - **English (`en`)**: COSYdata is vastly larger (10,350 unique words across A0-C2 vs 2,194 unique words in COSYlanguages). 1,252 words overlap.
   - **French (`fr`), Italian (`it`), Russian (`ru`), Greek (`el`)**: COSYlanguages contains more unique word entries at higher levels (B1-C2) than COSYdata currently has populated (COSYdata currently covers A0-A1 and A2 for FR, IT, RU, and A0-A1 for EL).
   - **Other 9 Languages (`ba`, `br`, `cv`, `de`, `es`, `hy`, `ka`, `pt`, `tt`)**: Present **only** in COSYlanguages (0 files in COSYdata).

---

## Detailed Language-by-Language Audit Table

| Language | COSYlanguages Files | COSYlanguages Words | COSYdata Files | COSYdata Words | Shared Overlap | COSYlanguages Only | COSYdata Only | Status & Migration Strategy |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `BA` | 65 | 833 | 0 | 0 | 0 | 833 | 0 | Keep in COSYlanguages until ported to COSYdata |
| `BR` | 65 | 859 | 0 | 0 | 0 | 859 | 0 | Keep in COSYlanguages until ported to COSYdata |
| `CV` | 33 | 450 | 0 | 0 | 0 | 450 | 0 | Keep in COSYlanguages until ported to COSYdata |
| `DE` | 51 | 914 | 0 | 0 | 0 | 914 | 0 | Keep in COSYlanguages until ported to COSYdata |
| `EL` | 70 | 1199 | 27 | 509 | 224 | 975 | 285 | Partial overlap; keep unmigrated levels in COSYlanguages |
| `EN` | 184 | 2194 | 238 | 10350 | 1252 | 942 | 9098 | Ready for phased migration/deletion once remote fetch is wired |
| `ES` | 51 | 889 | 0 | 0 | 0 | 889 | 0 | Keep in COSYlanguages until ported to COSYdata |
| `FR` | 91 | 2987 | 47 | 916 | 570 | 2417 | 346 | Partial overlap; keep unmigrated levels in COSYlanguages |
| `HY` | 65 | 838 | 0 | 0 | 0 | 838 | 0 | Keep in COSYlanguages until ported to COSYdata |
| `IT` | 90 | 3139 | 47 | 918 | 615 | 2524 | 303 | Partial overlap; keep unmigrated levels in COSYlanguages |
| `KA` | 65 | 835 | 0 | 0 | 0 | 835 | 0 | Keep in COSYlanguages until ported to COSYdata |
| `PT` | 51 | 891 | 0 | 0 | 0 | 891 | 0 | Keep in COSYlanguages until ported to COSYdata |
| `RU` | 77 | 2646 | 47 | 967 | 354 | 2292 | 613 | Partial overlap; keep unmigrated levels in COSYlanguages |
| `TT` | 65 | 827 | 0 | 0 | 0 | 827 | 0 | Keep in COSYlanguages until ported to COSYdata |

---

## Level Breakdown & Schema Differences

### 1. English (`en`)
- **COSYlanguages Levels**: `A1` (118 files), `A2` (128 files), `B1` (40 files), `B2` (21 files), `C1` (26 files), `C2` (16 files). Total unique words: **2,194**.
- **COSYdata Levels**: `a0_a1` (36 files), `a2` (42 files), `b1` (52 files), `b2` (44 files), `c1` (39 files), `c2` (23 files). Total unique words: **10,350**.
- **Analysis**: COSYdata contains a superset of English vocabulary for all CEFR levels.

### 2. French (`fr`), Italian (`it`), Russian (`ru`), Greek (`el`)
- **COSYlanguages**: Contains full A1-C2 coverage.
- **COSYdata**: Contains `a0_a1` and `a2` (FR, IT, RU) or `a0_a1` (EL).
- **Analysis**: Higher CEFR levels (B1, B2, C1, C2) for these languages must be retained in COSYlanguages until COSYdata completes intake for higher levels.

### 3. Minority & Additional Languages (`ba`, `br`, `cv`, `de`, `es`, `hy`, `ka`, `pt`, `tt`)
- **COSYlanguages**: Fully populated with A1-C2 datasets.
- **COSYdata**: 0 files.
- **Analysis**: All 9 languages must remain in COSYlanguages until they are migrated upstream into COSYdata.

---

## Ecosystem Linking Architecture & Consumer Repositories

All downstream applications across the COSYlanguages ecosystem (**COSYmanuals**, **COSYlanguages**, **COSYplatform**, **COSYgames**) consume canonical vocabulary from COSYdata via the following mechanisms:

1. **Static HTTP Serving**: Served over GitHub Pages at `https://cosylanguages.github.io/COSYdata/`.
2. **Index Lookups**:
   - `vocabulary/<lang>/index.json`: Resolves entry IDs (`en:cat:noun`) to relative file paths (`a0_a1/animals.json`).
   - `vocabulary/<lang>/flat-index.json`: Resolves surface forms (`cats`, `cat`) to `{ id, field }` references.
3. **Shared Modules**:
   - `shared/vocab-resolver.js`: `resolveVocab(ref)` and `hydrateVocabElements(root)` for DOM hydration.
   - `shared/cosy-word-popup.js`: `autoDetect`, `attachPopupHandler`, `createCosyDictionary`, and `hydrate` for client-side popups and dictionary storage.

---

## Action Plan & Migration Roadmap

1. **Deletion Safety Rule**: Do NOT delete local JS files from `vocabulary/` for a language/level in downstream repos until a remote loader fetch or build script exists to supply practice engines (`practice/`, `js/games/utils/shared.js`, `scripts/verify_vocab_pool.js`) with equivalent or superior data from COSYdata.
2. **Dynamic Adapter Strategy**:
   - Implement an adapter layer in consumer engines that fetches JSON files directly from `https://cosylanguages.github.io/COSYdata/vocabulary/` when requested.
   - For levels missing in COSYdata, fall back to local `vocabulary/{lang}/{LEVEL}/` JS files seamlessly.
3. **Phased Upstream Porting**:
   - Port missing B1–C2 levels for `fr`, `it`, `ru`, `el` and datasets for `ba`, `br`, `cv`, `de`, `es`, `hy`, `ka`, `pt`, `tt` into COSYdata JSON format, validating against `schemas/vocabulary.schema.json`.
4. **Phased Unit Deletion**:
   - Once the remote fetch adapter is active and passing CI, delete local duplicate JS files for `en` (A1-C2) and `a0_a1`/`a2` for `fr`, `it`, `ru`, `el` in consumer repos.
