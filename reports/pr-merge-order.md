# Open Pull Requests Audit and Safe Merge Order

This document provides a comprehensive audit of all 12 open Pull Requests in `cosylanguages/COSYdata` as of September 2026. It categorizes each PR by touched files, identifies overlaps, tests mergeability against current `main`, flags duplicate/empty PRs, and establishes a recommended safe merge order.

---

## Conflict Status Against Current `main`

Due to recent PR merges on `main` (e.g. PRs #129–#137), many open PRs now have merge conflicts against current `main` and require rebasing before they can be merged.

| PR # | Branch | Clean Merge on `main`? | Conflict Reason / Notes |
|:---:|:---|:---:|:---|
| **#9** | `feat/schema-field-requirements-...` | ❌ Conflict | Conflicts on `README.md`, `schemas/vocabulary.schema.json`, `scripts/validate.cjs`. Needs rebase on `main`. |
| **#16** | `jules-8351868177292388940-...` | ❌ Conflict | Conflicts on `README.md`. Needs rebase on `main`. |
| **#41** | `add-missing-a0-a1-vocab-...` | ✅ Clean | Clean merge on current `main`. |
| **#43** | `main-11112415848536471443` | ✅ Clean | Empty PR (0 files changed). |
| **#47** | `jules-14783597798940735684-...` | ❌ Conflict | Conflicts on English vocabulary JSON files updated in PRs #129/#132. Needs rebase. |
| **#79** | `jules/regional-audit-v2-...` | ✅ Clean | Standalone report file (`reports/theme-domain-regional-audit-v2.md`). Clean merge. |
| **#83** | `jules-17614876148155145487-...` | ❌ Conflict | Conflicts on report file/indexes. Needs rebase. |
| **#90** | `tag-english-vocab-exam-domain-...` | ❌ Conflict | Conflicts on English vocabulary JSON files updated in PRs #129/#132. Needs rebase. |
| **#104**| `audit-a1-migration-gap-...` | ❌ Conflict | Conflicts on `scripts/compare_a1_migration_gap.cjs`. Needs rebase. |
| **#105**| `jules-16371583711923486657-...` | ✅ Clean | Empty PR (0 files changed, duplicate of #104). |
| **#109**| `migrate-fr-vocab-gap-...` | ❌ Conflict | Conflicts on `reports/a0_a1_cefr_audit.md` and French vocabulary files. Needs rebase. |
| **#111**| `migrate-it-vocab-gap-...` | ❌ Conflict | Conflicts on `reports/a0_a1_cefr_audit.md`. Needs rebase. |

---

## Duplicate & Empty PR Identification

### 1. PR #104 vs PR #105
* **PR #104**: `Audit A1 vocabulary migration gap and functional phrases parity` (Branch: `audit-a1-migration-gap-12898924316910972563`)
  * Touches `reports/migration-gap-report.md` and `scripts/compare_a1_migration_gap.cjs`. Contains actual audit logic and report updates.
* **PR #105**: `Audit A1 vocabulary migration gap and functional phrases parity` (Branch: `jules-16371583711923486657-e92edc2c`)
  * Modified 0 files relative to its branch point (empty PR).
* **Recommendation**: **Close PR #105 as a duplicate of PR #104**, referencing PR #104 in the closing comment.

### 2. PR #43 (`main-11112415848536471443`)
* **Status**: Modified 0 files relative to its branch point (empty PR).
* **Recommendation**: Can be closed or dismissed as empty.

---

## Open PR Taxonomy & Touched File Scope

| PR # | Title | Branch | Touched Scope | Files Changed Count |
|:---:|:---|:---|:---|:---:|
| **#9** | Update vocabulary schema field requirements and validation | `feat/schema-field-requirements-...` | **schema / validation** | 1 (`scripts/validate.cjs`) |
| **#16** | Add Definition Guidelines for A0-A1 and A2 Levels | `jules-8351868177292388940-...` | **reports-only (docs)** | 1 (`README.md`) |
| **#41** | Add missing English A0-A1 vocabulary entries | `add-missing-a0-a1-vocab-...` | **reports-only (scripts)** | 4 (`a0_a1_entries.json`, scripts) |
| **#43** | Verify A0/A1 vocabulary entries | `main-11112415848536471443` | **empty** | 0 |
| **#47** | Consolidate idioms/phrasal verbs and add game classification themes | `jules-14783597798940735684-...` | **en** | 82 (`vocabulary/en/*`) |
| **#79** | Update Regional Variants Audit Report v2 | `jules/regional-audit-v2-...` | **reports-only** | 1 (`reports/theme-domain-regional-audit-v2.md`) |
| **#83** | Update flat index files and present vocabulary comparison report | `jules-17614876148155145487-...` | **reports-only** | 1 (`reports/cosylanguages-vs-cosydata-audit.md`) |
| **#90** | Tag English vocabulary entries for exam course domain (Phase 3a) | `tag-english-vocab-exam-domain-...` | **en** | 210 (`vocabulary/en/*`, script, report) |
| **#104**| Audit A1 vocabulary migration gap and functional phrases parity | `audit-a1-migration-gap-...` | **reports-only** | 2 (`reports/migration-gap-report.md`, script) |
| **#105**| Audit A1 vocabulary migration gap and functional phrases parity | `jules-16371583711923486657-...` | **empty (duplicate of #104)**| 0 |
| **#109**| feat(fr): reconcile French A0/A1 vocabulary gap and update reports | `migrate-fr-vocab-gap-...` | **fr / reports-only** | 11 (`vocabulary/fr/*`, reports) |
| **#111**| Migrate Italian A0/A1 Vocabulary Gap from COSYlanguages | `migrate-it-vocab-gap-...` | **it / reports-only** | 1 (`reports/a0_a1_cefr_audit.md`) |

---

## File Overlaps & Conflict Risk Analysis

1. **Schema & Validation Requirements (`scripts/validate.cjs`)**:
   * **PR #9** updates schema validation rules in `scripts/validate.cjs`.
   * **Impact**: Must be rebased and merged **FIRST** before PRs #41, #43, #47, #79, #83, #90, #104, #105, #109, #111 to ensure all subsequent vocabulary and report contributions adhere to updated schema rules.

2. **English Vocabulary Conflicts (`vocabulary/en/*`)**:
   * **PR #47** (82 files) and **PR #90** (208 English files) **overlap on 70 `vocabulary/en/` JSON files**.
   * **Impact**: Both PRs currently conflict with `main`. Rebase PR #47 first to consolidate idioms and phrasal verbs, then rebase PR #90 on top of PR #47 to apply course domain tagging cleanly.

3. **Report Overlaps (`reports/a0_a1_cefr_audit.md`)**:
   * **PR #109** (French gap migration) and **PR #111** (Italian gap migration) both touch `reports/a0_a1_cefr_audit.md`.
   * **Impact**: Non-data markdown report conflict. Rebase PR #109 first, then rebase PR #111 on top of PR #109.

4. **Isolated Documentation & Audit PRs**:
   * **PR #16** (`README.md`), **PR #41** (standalone helper scripts), **PR #79** (standalone report), **PR #83** (standalone report), and **PR #104** (standalone report & script) touch disjoint files. Rebase each on `main` after schema validation rules are locked.

---

## Recommended Safe Merge Order

1. **PR #9** (`feat/schema-field-requirements-16817109394433754592`): Rebase on `main` and merge FIRST to lock in updated vocabulary schema field requirements and validation rules.
2. **PR #16** (`jules-8351868177292388940-556778e7`): Rebase on `main` and merge A0-A1 / A2 definition guidelines in `README.md`.
3. **PR #41** (`add-missing-a0-a1-vocab-10444947146617708768`): Merge standalone English vocabulary check scripts and entry lists (currently clean on `main`).
4. **PR #79** (`jules/regional-audit-v2-18428615992038273364`): Merge standalone regional variants audit report v2 (currently clean on `main`).
5. **PR #83** (`jules-17614876148155145487-702be1c0`): Rebase on `main` and merge standalone vocabulary comparison audit report.
6. **PR #104** (`audit-a1-migration-gap-12898924316910972563`): Rebase on `main` and merge standalone A1 migration gap audit report and comparison script.
7. **PR #47** (`jules-14783597798940735684-2901f30d`): Rebase on `main` and merge English idioms/phrasal verbs consolidation before domain tagging.
8. **PR #90** (`tag-english-vocab-exam-domain-phase3a-8992791083852762462`): Rebase on `main` (and PR #47) to tag English vocabulary entries for exam domain, resolving the 70 overlapping files.
9. **PR #109** (`migrate-fr-vocab-gap-4632538543995383074`): Rebase on `main` and merge French A0/A1 vocabulary entries and audit reports.
10. **PR #111** (`migrate-it-vocab-gap-1731229906959401978`): Rebase on `main` (and PR #109) to update Italian audit report, resolving `reports/a0_a1_cefr_audit.md` overlap.
11. **PR #43** (`main-11112415848536471443`): Close or dismiss as empty (0 files changed).
12. **PR #105** (`jules-16371583711923486657-e92edc2c`): Close as exact duplicate of PR #104 (0 files changed).
