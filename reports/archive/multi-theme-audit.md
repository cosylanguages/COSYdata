# Multi-Theme & Taxonomy Audit Report (`vocabulary/en`)

This report presents the findings from the comprehensive audit of all **13,615 entries** in the English vocabulary dataset (`vocabulary/en/`).

---

## 1. Executive Summary & Audit Overview

The audit evaluated every entry in `vocabulary/en/` across headwords, definitions, example sentences, and collocations against the canonical taxonomy defined in `schemas/themes.json`.

- **Total Entries Audited**: 13,615
- **Entries Requiring Changes**: 206 (high/medium confidence changes recorded in `reports/multi-theme-audit.json`, 0 low-confidence entries in `reports/multi-theme-audit-needs-review.json`).
- **Data Files Modified**: 0 (all vocabulary entries remain strictly unedited per repository directives).

---

## 2. Key Error Categories Flagged

### A. Self-Referencing Concept Values
- **Audit Finding**: 100% (**48 out of 48**) of existing English entries containing a `concept` field were found to be self-references (where `concept` equals the entry's own `id`, e.g., `en:shower:noun` -> `Concept: en:shower:noun`).
- **Remediation**: `schemas/vocabulary.schema.json` has been updated to accept language-independent dot-separated keys (e.g., `housing.furniture.chair`).

### B. Secondary Themes Equal to `"general"`
- **Audit Finding**: **122 entries** across `a0_a1/expressions.json`, `a0_a1/technology.json`, `a2/expressions.json`, and `a2/opinions.json` contained `"secondary_themes": ["general"]`.
- **Remediation**: `schemas/themes.json` `$defs.secondary_theme` enum disallows `"general"` as a secondary theme value.

### C. Misfiled Primary Themes
- **Audit Finding**: Identified entries filed under improper primary themes (e.g., `rubbish` / `garbage` filed under `nature/plants_trees`; travel and accommodation terms like `cabin` or `hostel` under `housing/furniture`).
- **Proposed Re-mappings**: Re-mapped `rubbish` to `housing/chores` and accommodation terms to `travel/vacation_lodging`.

---

## 3. Multi-Theme & Room Mapping Examples

| Entry ID | Word | Current Primary | Proposed Primary | Proposed Secondary Themes | Proposed Rooms |
| --- | --- | --- | --- | --- | --- |
| `en:clean:verb` | clean | `actions/physical_actions` | `actions/physical_actions` | `["housing/chores", "health/fitness_hygiene"]` | - |
| `en:wash:verb` | wash | `actions/physical_actions` | `actions/physical_actions` | `["housing/chores", "health/fitness_hygiene"]` | `["bathroom", "laundry_room"]` |
| `en:bake:verb` | bake | `actions/physical_actions` | `actions/physical_actions` | `["food/cooking"]` | `["kitchen"]` |
| `en:lease:noun` | lease | `housing/building_types` | `housing/building_types` | `["law/legal_system", "money/finance"]` | - |
| `en:rubbish:noun` | rubbish | `nature/plants_trees` | `housing/chores` | `["activities/chores"]` | `["kitchen"]` |
| `en:sink:noun` | sink | `housing/home_fixtures` | `housing/home_fixtures` | `["housing/chores"]` | `["kitchen", "bathroom"]` |

---

## 4. Common Missing Words Inventory

The audit evaluated core beginner and elementary vocabulary coverage for home chores, daily routines, cooking, and household operations. The following common terms were identified as missing from `vocabulary/en/`:

1. **`scrub`** *(verb, chore)*
2. **`polish`** *(verb, chore)*
3. **`rinse`** *(verb, chore / cooking)*
4. **`load`** *(verb, appliance/chore)*
5. **`unload`** *(verb, appliance/chore)*
6. **`dishes`** *(noun, household)*
7. **`bin`** *(noun, household)*
8. **`detergent`** *(noun, cleaning/laundry)*
9. **`hob`** *(noun, kitchen appliance)*
10. **`switch on` / `switch off`** *(phrasal verbs, home technology/lighting)*
11. **`bedtime`** *(noun, daily routine)*
12. **`make the bed`** *(phrase, daily routine/chore)*
13. **`do the dishes`** *(phrase, chore)*
14. **`take out the rubbish`** *(phrase, chore)*

---

## 5. Output Artifacts
- **High/Med Confidence Proposed Changes**: `reports/multi-theme-audit.json` (206 entries)
- **Low Confidence Proposed Changes**: `reports/multi-theme-audit-needs-review.json` (0 entries)
- **Summary Report**: `reports/multi-theme-audit.md`
