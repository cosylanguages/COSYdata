# Family Members Vocabulary Audit Report across 14 Languages

## 1. Executive Summary
An exhaustive audit of family and kinship vocabulary was conducted across all **14 supported languages** in COSYdata:
- English (`en`), French (`fr`), Italian (`it`), Greek (`el`), Russian (`ru`), German (`de`), Spanish (`es`), Portuguese (`pt`), Armenian (`hy`), Georgian (`ka`), Bashkir (`ba`), Breton (`br`), Chuvash (`cv`), and Tatar (`tt`).

All family vocabulary entries in COSYdata are organized under the primary theme `"family"` in level-specific files following the repository standard `vocabulary/<lang>/<level>/family.json`.

---

## 2. Summary Table by Language

| Language Code | Language Name | Total Family Entries | Levels Present | Key Kinship Categories Covered | Regional Variants & Linked Equivalents |
| --- | --- | --- | --- | --- | --- |
| `en` | English | **197** | A0_A1 (71), A2 (68), B1 (42), C2 (16) | Immediate, Extended, In-laws, Step, Foster, Adoptive, Ancestors, Descendants, Informal | `mom` (US) / `mum` (UK) linked via `region` & `regional_equivalents` |
| `fr` | French | **43** | A0_A1 (39), B1 (0), C2 (0) | Immediate, Grandparents, Paternal/Maternal distinctions, Extended | Standard French (`mère`, `père`, `cousin germain`, etc.) |
| `it` | Italian | **23** | A0_A1 (23), B1 (0), C2 (0) | Immediate, Grandparents, Uncles/Aunts, Cousins, Nephew/Niece | Standard Italian (`madre`, `padre`, `nipote`, etc.) |
| `el` | Greek | **22** | A0_A1 (22), B1 (0), C2 (0) | Immediate, Grandparents, Uncles/Aunts, Cousins, Informal (`μαμά`, `μπαμπάς`) | Standard Greek (`μητέρα`, `πατέρας`, `γιαγιά`, etc.) |
| `ru` | Russian | **21** | A0_A1 (20), A2 (1), B1 (0), C2 (0) | Immediate, Grandparents, Uncles/Aunts, Informal (`мама`, `папа`) | Standard Russian (`мать`, `отец`, `бабушка`, etc.) |
| `de` | German | **20** | A0_A1 (20) | Immediate, Grandparents, Uncles/Aunts, Cousins, Informal (`Oma`, `Opa`) | Standard German (`Mutter`, `Vater`, `Onkel`, etc.) |
| `ka` | Georgian | **14** | A0_A1 (14) | Immediate, Grandparents | Standard Georgian (`დედა`, `მამა`, `ბებია`, etc.) |
| `tt` | Tatar | **13** | A0_A1 (13) | Immediate, Grandparents, Older siblings (`абый`, `апа`) | Standard Tatar (`әти`, `әни`, `бабай`, `әби`, etc.) |
| `ba` | Bashkir | **12** | A0_A1 (12) | Immediate, Grandparents, Older siblings (`ағай`, `апай`) | Standard Bashkir (`әсәй`, `атай`, `олатай`, etc.) |
| `br` | Breton | **11** | A0_A1 (11) | Immediate, Siblings, Children | Standard Breton (`mamm`, `tad`, `breur`, `c'hoar`) |
| `cv` | Chuvash | **11** | A0_A1 (11) | Immediate, Paternal/Maternal grandparents (`асатте`, `кукаçи`) | Standard Chuvash (`анне`, `атте`, `шăллă`) |
| `hy` | Armenian | **11** | A0_A1 (11) | Immediate, Grandparents | Standard Armenian (`մայր`, `հայր`, `պապ`, `տատ`) |
| `es` | Spanish | **9** | A0_A1 (9) | Immediate, Siblings | Standard Spanish (`madre`, `padre`, `hermano`) |
| `pt` | Portuguese | **9** | A0_A1 (9) | Immediate, Siblings | Standard Portuguese (`mãe`, `pai`, `irmão`) |

---

## 3. CEFR Level Distribution & Kinship Classification

### A0–A1 (Beginner / Survival Family Vocabulary)
- **Immediate Family**: Mother, father, parent, son, daughter, child, baby, brother, sister, husband, wife.
- **Informal / Endearments**: Mom / Mum, Dad, Grandma, Grandpa, Mama, Papa.
- **Grandparents & Extended**: Grandmother, grandfather, grandparent, aunt, uncle, cousin, nephew, niece.

### A2 (Elementary / Extended Relationships)
- **In-Laws & Step-Family**: In-law, mother-in-law, father-in-law, stepmother, stepfather, stepson, stepdaughter, half-brother, half-sister.
- **Extended & Blended Terms**: Spouse, fiancé, fiancée, widow, widower, newborn, acquaintance, roommate.

### B1 (Intermediate / Family Structures & Genealogy)
- **Family Systems**: Sibling, nuclear family, extended family, blended family, single parent, foster family, adoption, guardian, custody, upbringing.
- **Lineage & Kinship**: Ancestor, descendant, relative, distant relative, sibling rivalry, co-parenting.

### B2–C2 (Advanced / Formal & Literary Kinship)
- Metaphorical, legal, and generational relationship expressions (e.g., `passing the torch`, `leaving a legacy`, `full circle moments`).

---

## 4. File Organization & Architecture
1. **File Locations**: Family entries are stored in `vocabulary/<lang>/<level>/family.json`.
2. **Taxonomy Schema**: Entries use `"theme": "family"` and sub-themes `"immediate_family"`, `"extended_family"`, and `"relationships"`.
3. **Regional Linking**: US/UK regional spelling variants (e.g., `en:mom:noun` with `region: ["US"]` and `en:mum:noun` with `region: ["UK"]`) are bidirectionally linked using `regional_equivalents`.
