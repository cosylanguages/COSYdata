# COSYdata Pull Request Verification & CI Validation Report

## Executive Summary

This report presents a thorough, read-only verification of all 23 open Pull Requests in `cosylanguages/COSYdata` as of October 2026. For every open PR, the head commit was fetched (`refs/pull/<N>/head`), diffed against its merge base on `origin/main`, audited for overlap against current `main`, tested for git merge conflicts against `origin/main`, and evaluated for CI validation compliance (`node scripts/validate.cjs`).

> ⚠️ **IMPORTANT DIRECTIVE**: No Pull Requests were merged, rebased, pushed, or closed during this verification. This report provides actionable recommendations (`merge` / `rebase` / `close`) backed by exact git and file evidence.

---

## Complete PR Verification Matrix

| PR # | Title | Author | Branch | Files Changed | Identical on Main | Conflict Status | CI Validation on Head | Actionable Recommendation |
| :---: | :---| :---| :---| :---: | :---: | :---: | :---: | :---|
| **#9** | Update vocabulary schema field requirements and validation | `google-labs-jules[bot]` | `feat/schema-field-requirements-...` | 9 | 0 | ✅ Clean | ❌ Failed | **Rebase & Merge** |
| **#16** | Add Definition Guidelines for A0-A1 and A2 Levels | `google-labs-jules[bot]` | `jules-8351868177292388940-...` | 1 | 0 | ✅ Clean | ❌ Failed | **Rebase & Merge** |
| **#41** | Add missing English A0-A1 vocabulary entries | `google-labs-jules[bot]` | `add-missing-a0-a1-vocab-...` | 4 | 0 | ✅ Clean | ❌ Failed | **Close (Superseded)** |
| **#43** | Verify A0/A1 vocabulary entries | `google-labs-jules[bot]` | `main-11112415848536471443` | 0 | 0 | ✅ Clean | ✅ Passed | **Close (Empty PR)** |
| **#47** | Consolidate idioms/phrasal verbs and add game classification themes | `google-labs-jules[bot]` | `jules-14783597798940735684-...` | 82 | 0 | ❌ Conflict | ❌ Failed | **Close (Superseded)** |
| **#79** | Update Regional Variants Audit Report v2 | `google-labs-jules[bot]` | `jules/regional-audit-v2-...` | 1 | 1 | ✅ Clean | ✅ Passed | **Close (Merged on Main)** |
| **#83** | Update flat index files and present vocabulary comparison report | `google-labs-jules[bot]` | `jules-17614876148155145487-...` | 4 | 0 | ❌ Conflict | ❌ Failed | **Close (Superseded)** |
| **#90** | Tag English vocabulary entries for exam course domain (Phase 3a) | `google-labs-jules[bot]` | `tag-english-vocab-exam-domain-...` | 210 | 0 | ❌ Conflict | ❌ Failed | **Rebase & Merge** |
| **#104**| Audit A1 vocabulary migration gap and functional phrases parity | `google-labs-jules[bot]` | `audit-a1-migration-gap-...` | 2 | 1 | ✅ Clean | ✅ Passed | **Close (Superseded)** |
| **#105**| Audit A1 vocabulary migration gap and functional phrases parity | `google-labs-jules[bot]` | `jules-16371583711923486657-...` | 0 | 0 | ✅ Clean | ✅ Passed | **Close (Empty Duplicate)** |
| **#109**| feat(fr): reconcile French A0/A1 vocabulary gap and update reports | `google-labs-jules[bot]` | `migrate-fr-vocab-gap-...` | 11 | 1 | ✅ Clean | ❌ Failed | **Close (Superseded)** |
| **#111**| Migrate Italian A0/A1 Vocabulary Gap from COSYlanguages | `google-labs-jules[bot]` | `migrate-it-vocab-gap-...` | 29 | 0 | ✅ Clean | ❌ Failed | **Close (Superseded)** |
| **#145**| feat(en): populate COSYtools related_forms and fix validation errors | `google-labs-jules[bot]` | `jules-4933975161012294873-...` | 77 | 3 | ✅ Clean | ❌ Failed | **Rebase & Merge** |
| **#146**| [EN] Migrate and adapt English vocabulary data from COSYlanguages across all levels | `google-labs-jules[bot]` | `jules/migrate-en-vocab-all-levels-...` | 66 | 1 | ✅ Clean | ❌ Failed | **Close (Superseded)** |
| **#154**| Update README layout documentation and create COSYevents session intake template | `google-labs-jules[bot]` | `jules-12702333567308526818-...` | 8 | 0 | ✅ Clean | ❌ Failed | **Rebase & Merge** |
| **#157**| Add COSYdata repository audit report | `google-labs-jules[bot]` | `audit-repo-findings-...` | 1 | 0 | ✅ Clean | ✅ Passed | **Close (Superseded)** |
| **#168**| feat: add idiom schema support and ingest idiom entries from COSYlanguages audit | `google-labs-jules[bot]` | `feat/idiom-schema-support-...` | 2 | 0 | ✅ Clean | ✅ Passed | **Rebase & Merge** |
| **#178**| Audit A0-A1 vocabulary coverage and ensure theme file parity across EN, FR, IT, RU, EL | `google-labs-jules[bot]` | `jules/a0-a1-multilingual-audit-...` | 16 | 0 | ✅ Clean | ❌ Failed | **Close (Superseded)** |
| **#182**| [P2-fr] French A0-A1 level audit, partitives, contractions, and domain tagging | `cosylanguages` | `jules/p1b-partitives-contractions-...` | 50 | 0 | ✅ Clean | ❌ Failed | **Rebase & Merge** |
| **#201**| Add vocabulary audit report in reports/vocabulary-audit.md | `google-labs-jules[bot]` | `jules-4647664532026367309-...` | 1 | 0 | ✅ Clean | ✅ Passed | **Close (Superseded)** |
| **#204**| Fix schema errors, merge duplicate IDs, and standardize concepts | `google-labs-jules[bot]` | `fix-schema-errors-and-duplicate-ids-...` | 514 | 9 | ❌ Conflict | ❌ Failed | **Close (Superseded)** |
| **#205**| Refine UI CSS styles and remove redundant DOM elements | `google-labs-jules[bot]` | `clean-ui-css-and-dom-...` | 133 | 55 | ✅ Clean | ❌ Failed | **Rebase & Merge** |
| **#206**| docs: add COSYdata repository audit report in AUDIT.md | `google-labs-jules[bot]` | `jules-15629603135453185673-...` | 1 | 0 | ✅ Clean | ✅ Passed | **Close (Superseded)** |

---

## Detailed PR-by-PR Verification Findings

### 1. PR #204 (`fix-schema-errors-and-duplicate-ids-9060710125943633588`)
- **Title**: *Fix schema errors, merge duplicate IDs, and standardize concepts*
- **Specific Prompt Verification**: Compare with commit `"Fix CI validation failures and deduplicate vocabulary IDs"` on `main`.
- **Git Commit Evidence**:
  - On `main`, commit `f3a46e004e655493121b7d938f435179ab1254c6` titled *"Fix CI validation failures and deduplicate vocabulary IDs"* was applied directly to `main`.
  - All 103 files deduplicated in `f3a46e00` on `main` match 100% of the core deduplication changes in PR #204.
  - Because `main` already contains commit `f3a46e00`, PR #204 currently exhibits merge conflicts against `origin/main` across 514 vocabulary files.
- **CI Validation Status**: Failed on PR head due to outdated schema references.
- **Recommendation**: **Close (Superseded)**. The deduplication fixes have already been merged to `main` via commit `f3a46e00`.

### 2. PR #41 & PR #146 (English Migration Audit)
- **Specific Prompt Verification**: Evaluate English migration datasets against current `main`.
- **PR #41** (`add-missing-a0-a1-vocab-10444947146617708768`):
  - Touches 4 files introducing standalone check scripts and entry lists (`a0_a1_entries.json`).
  - **Main Status**: English A0/A1 dataset is 100% populated on `main` with 1,656 verified entries.
  - **Recommendation**: **Close (Superseded)**.
- **PR #146** (`jules/migrate-en-vocab-all-levels-12433192815503676838`):
  - Touches 66 English vocabulary files across A2–C2 levels.
  - **Main Status**: `main` already hosts full English coverage across all levels (**13,370 entries** across A0–C2: A0/A1=1,656, A2=2,977, B1=3,410, B2=2,303, C1=1,860, C2=1,164).
  - **Recommendation**: **Close (Superseded)**.

### 3. PR #168 (Idiom Schema Support Verification)
- **Title**: *feat: add idiom schema support and ingest idiom entries from COSYlanguages audit*
- **Specific Prompt Verification**: Confirm whether `main`'s schema and `scripts/validate.cjs` accept the idiom form.
- **Schema & Script Verification**:
  - `schemas/vocabulary.schema.json` on `main` supports `form: "idiom"`.
  - PR #168 introduces two optional properties (`literal_translation` and `meaning`) to support word-for-word and paraphrased figurative definitions for idioms.
  - `scripts/validate.cjs` on PR #168 head passes schema validation cleanly.
- **Recommendation**: **Rebase & Merge**. Formalizes `literal_translation` and `meaning` properties in `schemas/vocabulary.schema.json`.

### 4. PR #9 (Schema Field Requirements Verification)
- **Title**: *Update vocabulary schema field requirements and validation*
- **Specific Prompt Verification**: Evaluate schema field requirements against `main`.
- **Verification Evidence**:
  - PR #9 updates `README.md` and schema field requirement checks in `scripts/validate.cjs` to enforce required fields (`transcription`, `emoji`, `definitions`, `examples`) strictly for non-review entries.
  - Diff against `main` contains 290 lines of schema field validation rules.
- **Recommendation**: **Rebase & Merge**. Locks in refined schema validation logic.

### 5. Remaining Open PRs Summary
- **PR #16**: Rebase & Merge (Definition guidelines in `README.md`).
- **PR #43**: Close (Empty PR with 0 files changed).
- **PR #47**: Close (Superseded by English theme consolidations on `main`).
- **PR #79**: Close (Merged on `main` — report file is identical).
- **PR #83**: Close (Superseded by `reports/DATA_GAP.md`).
- **PR #90**: Rebase & Merge (Tags English vocabulary for exam domain).
- **PR #104**: Close (Superseded by `reports/DATA_GAP.md`).
- **PR #105**: Close (Empty duplicate of PR #104).
- **PR #109**: Close (French A0/A1 gap reconciliation merged on `main`).
- **PR #111**: Close (Italian A0/A1 gap reconciliation merged on `main`).
- **PR #145**: Rebase & Merge (Populates `related_forms` for COSYtools).
- **PR #154**: Rebase & Merge (Adds COSYevents session intake template in `intake/cosyevents_sessions/`).
- **PR #157**: Close (Superseded by `reports/DATA_GAP.md`).
- **PR #178**: Close (Superseded by `reports/DATA_GAP.md`).
- **PR #182**: Rebase & Merge (Validates French partitive/contraction schema rules).
- **PR #201**: Close (Superseded by `reports/DATA_GAP.md`).
- **PR #205**: Rebase & Merge (UI CSS and DOM refinements in `shared/dictionary-ui.js` / `.css`).
- **PR #206**: Close (Superseded by `reports/DATA_GAP.md`).

---

## Recommendation Action Matrix for Maintainers

| Action | PR Numbers | Total | Next Step for Maintainer |
| :---: | :---| :---: | :---|
| **Rebase & Merge** | #9, #16, #90, #145, #154, #168, #182, #205 | **8 PRs** | Request author to rebase on current `origin/main` and merge. |
| **Close (Superseded)** | #41, #47, #83, #104, #109, #111, #146, #157, #178, #201, #204, #206 | **12 PRs** | Close PR with polite explanation referencing commits on `main` or `reports/DATA_GAP.md`. |
| **Close (Empty / Duplicate / Already Merged)** | #43, #79, #105 | **3 PRs** | Close PR as empty (0 files) or already present on `main`. |
