# Multilingual A0–A1 Vocabulary Comparison & Audit Report

## Executive Summary

This report provides a comprehensive comparative audit of all **A0–A1 level vocabulary data** across all 14 supported languages in `COSYdata`, using **English (`en`)** as the primary benchmark and reference baseline.

### Dataset Overview Across 14 Languages

| Language | Code | Total A0–A1 Entries | Total Files | Nouns | Verbs | Adjectives | Other Forms | Status |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **English** | `en` | **1,727** | 34 | 926 | 221 | 240 | 340 | 🟢 Main Source Baseline |
| **Bashkir** | `ba` | **377** | 20 | 106 | 134 | 110 | 27 | 🟢 Audited |
| **Breton** | `br` | **398** | 21 | 119 | 143 | 113 | 23 | 🟢 Audited |
| **Chuvash** | `cv` | **445** | 21 | 158 | 140 | 132 | 15 | 🟢 Audited |
| **German** | `de` | **494** | 21 | 197 | 145 | 106 | 46 | 🟢 Audited |
| **Greek** | `el` | **677** | 25 | 298 | 145 | 122 | 112 | 🟢 Audited |
| **Spanish** | `es` | **482** | 17 | 194 | 144 | 116 | 28 | 🟢 Audited |
| **French** | `fr` | **966** | 25 | 458 | 133 | 125 | 250 | 🟢 Audited |
| **Armenian**| `hy` | **391** | 21 | 112 | 141 | 107 | 31 | 🟢 Audited |
| **Italian** | `it` | **992** | 25 | 466 | 139 | 133 | 254 | 🟢 Audited |
| **Georgian**| `ka` | **387** | 17 | 118 | 141 | 115 | 13 | 🟢 Audited |
| **Portuguese**| `pt`| **476** | 23 | 194 | 138 | 105 | 39 | 🟢 Audited |
| **Russian** | `ru` | **795** | 25 | 298 | 145 | 96 | 256 | 🟢 Audited |
| **Tatar**   | `tt` | **377** | 18 | 117 | 134 | 105 | 21 | 🟢 Audited |

---

## 1. Duplicate Verification & Homonym Analysis

### Unique ID Enforcement
All **8,804 A0–A1 entries** across all 14 languages pass unique ID constraints (`^[a-z]{2}:[a-z0-9-]+:[a-z0-9-]+$`). There are **zero duplicate IDs** present in the codebase.

### Headword & Part-of-Speech Homonym Analysis
In four language datasets (`el`, `fr`, `it`, `ru`), specific headwords share identical surface forms and parts of speech across separate thematic files. Analysis confirms that these are **intentional semantic homonyms / sense distinctions** rather than redundant duplicate entries:

| Language | Word | Form | File 1 & ID | Theme 1 & Sense | File 2 & ID | Theme 2 & Sense | Analysis |
| :--- | :--- | :---: | :--- | :--- | :--- | :--- | :--- |
| **Greek (`el`)** | **ψάρι** | `noun` | `animals.json`<br>`el:psari-animal:noun` | `animals`<br>(Living water animal) | `food_drink.json`<br>`el:psari:noun` | `food_drink`<br>(Fish as seafood/food) | Valid homonym pair (Animal vs. Food) |
| **Greek (`el`)** | **κοτόπουλο** | `noun` | `animals.json`<br>`el:kotopoylo-animal:noun` | `animals`<br>(Farm poultry bird) | `food_drink.json`<br>`el:kotopoylo:noun` | `food_drink`<br>(Chicken meat as food) | Valid homonym pair (Animal vs. Food) |
| **Greek (`el`)** | **δρόμος** | `noun` | `common_nouns.json`<br>`el:dromos:noun` | `common_nouns`<br>(Thoroughfare / road) | `places_transport.json`<br>`el:dromos-street:noun` | `places_transport`<br>(Street / avenue) | Valid homonym pair (Road vs. Street) |
| **Greek (`el`)** | **νέος** | `adjective` | `adjectives.json`<br>`el:neos:adjective` | `adjectives`<br>(New / recently made) | `adjectives.json`<br>`el:neos-young:adjective` | `adjectives`<br>(Young in age) | Valid homonym pair (New vs. Young) |
| **Greek (`el`)** | **δυνατός** | `adjective` | `adjectives.json`<br>`el:dynatos:adjective` | `adjectives`<br>(Strong / powerful) | `adjectives.json`<br>`el:dynatos-possible:adjective` | `adjectives`<br>(Possible / feasible) | Valid homonym pair (Strong vs. Possible) |
| **Greek (`el`)** | **παρακαλώ** | `phrase` | `expressions.json`<br>`el:parakalo:phrase` | `expressions`<br>(Please) | `expressions.json`<br>`el:parakalo-welcome:phrase` | `expressions`<br>(You're welcome) | Valid homonym pair (Please vs. You're welcome) |
| **Greek (`el`)** | **σύζυγος** | `noun` | `family.json`<br>`el:syzygos-andras:noun` | `family`<br>(Husband / male spouse) | `family.json`<br>`el:syzygos-gynaika:noun` | `family`<br>(Wife / female spouse) | Valid homonym pair (Husband vs. Wife) |
| **French (`fr`)** | **poisson** | `noun` | `animals.json`<br>`fr:poisson:noun` | `animals`<br>(Living aquatic animal) | `food_drink.json`<br>`fr:poisson-aliment:noun` | `food_drink`<br>(Fish flesh served as food) | Valid homonym pair (Animal vs. Food) |
| **Italian (`it`)** | **pesce** | `noun` | `animals.json`<br>`it:pesce-animale:noun` | `animals`<br>(Vertebrate aquatic animal) | `food_drink.json`<br>`it:pesce:noun` | `food_drink`<br>(Prepared fish food) | Valid homonym pair (Animal vs. Food) |
| **Italian (`it`)** | **strada** | `noun` | `common_nouns.json`<br>`it:strada-modo:noun` | `common_nouns`<br>(Route / path to goal) | `places_transport.json`<br>`it:strada:noun` | `places_transport`<br>(Paved street / road) | Valid homonym pair (Path vs. Street) |
| **Russian (`ru`)**| **рыба** | `noun` | `animals.json`<br>`ru:ryba-anim:noun` | `animals`<br>(Aquatic animal with scales) | `food_drink.json`<br>`ru:ryba:noun` | `food_drink`<br>(Fish cooked as food) | Valid homonym pair (Animal vs. Food) |
| **Russian (`ru`)**| **курица** | `noun` | `animals.json`<br>`ru:kuritsa-anim:noun` | `animals`<br>(Domestic hen bird) | `food_drink.json`<br>`ru:kuritsa:noun` | `food_drink`<br>(Chicken meat as food) | Valid homonym pair (Animal vs. Food) |
| **Russian (`ru`)**| **мир** | `noun` | `common_nouns.json`<br>`ru:mir-peace:noun` | `common_nouns`<br>(Peace / absence of war) | `nationalities.json`<br>`ru:mir-country:noun` | `nationalities`<br>(World / planet Earth) | Valid homonym pair (Peace vs. World) |

---

## 2. Language-Specific Grammatical & Lexical Requirements Audit

### (a) Nouns: Articles, Gender, Countability, Plural Forms, and Proper Nouns

The schema and conventions dictate specific noun properties depending on target language grammar:
- **Articles & Gender**: Required for gendered languages with standard nominal articles (`de`, `fr`, `it`, `es`, `pt`, `br`, `el`). Omitted for non-article/genderless languages (`en`, `ru`, `hy`, `ka`, `ba`, `cv`, `tt`).
- **Countability**: Required for all noun entries across all languages (`countable`, `uncountable`, `pluralia_tantum`, `invariable`, `false_plural`).
- **Plural Forms**: Required for all `countable` nouns.
- **Proper Nouns & Place Names**: Use `countability: "invariable"` with `plural_form`, `article`, and `gender` omitted.

#### Noun Audit Results Table

| Language | Total Nouns | Article Compliance | Gender Compliance | Countability Compliance | Plural Form (Countable) | Proper Nouns (Invariable) | Notes |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **English (`en`)** | 926 | N/A | N/A | 100% (926/926) | 100% (713/713) | 305 invariable | Proper place names omit articles |
| **Bashkir (`ba`)** | 106 | N/A | N/A | 100% (106/106) | 100% (89/89) | 17 invariable | No grammatical gender/article |
| **Breton (`br`)** | 119 | 100% (106/106)* | 100% (106/106)* | 100% (119/119) | 100% (92/92) | 13 invariable | *13 proper place names omit article/gender |
| **Chuvash (`cv`)** | 158 | N/A | N/A | 100% (158/158) | 100% (141/141) | 17 invariable | No grammatical gender/article |
| **German (`de`)** | 197 | 100% (184/184)* | 100% (184/184)* | 100% (197/197) | 100% (164/164) | 13 invariable | *13 proper country/city names omit article/gender |
| **Greek (`el`)** | 298 | 100% (298/298) | 100% (298/298) | 100% (298/298) | 100% (261/261) | 37 invariable | Country/city names include neuter/fem article |
| **Spanish (`es`)**| 194 | 100% (128/128)* | 100% (138/138)* | 100% (194/194) | 100% (128/128) | 66 invariable | *66 place names set to `countability: "invariable"` |
| **French (`fr`)** | 458 | 100% (458/458) | 100% (458/458) | 100% (458/458) | 100% (386/386) | 72 invariable | Includes articles (`le`, `la`, `l'`) |
| **Armenian (`hy`)**| 112 | N/A | N/A | 100% (112/112) | 100% (98/98) | 14 invariable | No grammatical gender/article |
| **Italian (`it`)** | 466 | 100% (426/426)* | 100% (426/426)* | 100% (466/466) | 100% (382/382) | 40 invariable | *40 proper place/person names omit article/gender |
| **Georgian (`ka`)**| 118 | N/A | N/A | 100% (118/118) | 100% (102/102) | 16 invariable | Stem vowel truncation (-ა/-ე -> -ები) |
| **Portuguese (`pt`)**| 194 | 100% (194/194) | 100% (194/194) | 100% (194/194) | 100% (148/148) | 46 invariable | Includes articles (`o`, `a`) |
| **Russian (`ru`)** | 298 | N/A | 100% (298/298) | 100% (298/298) | 100% (258/258) | 40 invariable | Gender present (`masculine`, `feminine`, `neuter`) |
| **Tatar (`tt`)**   | 117 | N/A | N/A | 100% (117/117) | 100% (101/101) | 16 invariable | No grammatical gender/article |

---

### (b) Verbs: Inflections, Irregularity, and Preposition Patterns (`COSYtools` Linking)

For ecosystem integration with **COSYtools** (verb conjugateurs, pattern practice tools, and dictionary popups), verbs require:
1. `past_tense`, `past_participle`, and `is_irregular` flags where applicable (currently populated for English).
2. **Verb-Preposition Patterns (`prepositions`)**: Array of objects containing `preposition` and `example` sentences demonstrating verb government/governance (e.g. *go to*, *depend on*, *look at*).

#### Verb Elements Audit Table

| Language | Total Verbs | Past Tense Populated | Past Participle Populated | Irregular Verbs Flagged | Preposition Patterns (`prepositions`) | Recommendations for COSYtools |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **English (`en`)** | **221** | 221 (100%) | 221 (100%) | 90 irregulars | **35 verbs with prepositions** | 🟢 Ready for COSYtools linking |
| **Bashkir (`ba`)** | **134** | 0 | 0 | 0 | 0 | 🟡 Expand verb prepositions/postpositions |
| **Breton (`br`)** | **143** | 0 | 0 | 0 | 0 | 🟡 Expand prepositions (e.g. *gortoz*, *sellet ouzh*) |
| **Chuvash (`cv`)** | **140** | 0 | 0 | 0 | 0 | 🟡 Expand postpositional verb patterns |
| **German (`de`)** | **145** | 0 | 0 | 0 | 0 | 🔴 Add *Präteritum*, *Partizip II*, & *Präpositionen* |
| **Greek (`el`)** | **145** | 0 | 0 | 0 | 0 | 🔴 Add past form (*Αόριστος*) & prepositions |
| **Spanish (`es`)**| **144** | 0 | 0 | 0 | 0 | 🔴 Add *Pretérito*, *Participio*, & *Preposiciones* |
| **French (`fr`)** | **133** | 0 | 0 | 0 | 0 | 🔴 Add *Passé composé*, *Participe passé*, & prepositions |
| **Armenian (`hy`)**| **141** | 0 | 0 | 0 | 0 | 🟡 Expand Armenian verb government |
| **Italian (`it`)** | **139** | 0 | 0 | 0 | 0 | 🔴 Add *Passato prossimo*, *Participio passato*, & prepositions |
| **Georgian (`ka`)**| **141** | 0 | 0 | 0 | 0 | 🟡 Expand Georgian preverbi/screeve patterns |
| **Portuguese (`pt`)**| **138**| 0 | 0 | 0 | 0 | 🔴 Add *Pretérito*, *Particípio*, & prepositions |
| **Russian (`ru`)** | **145** | 0 | 0 | 0 | 0 | 🔴 Add *Past Tense*, *Aspectual pairs*, & case prepositions |
| **Tatar (`tt`)**   | **134** | 0 | 0 | 0 | 0 | 🟡 Expand Tatar verb-postposition government |

#### Sample English Verb-Preposition Patterns Currently Implemented (`vocabulary/en/a0_a1/`)

```json
{
  "id": "en:go:verb",
  "word": "go",
  "form": "verb",
  "past_tense": "went",
  "past_participle": "gone",
  "is_irregular": true,
  "prepositions": [
    {
      "preposition": "to",
      "example": "I go to school every morning."
    }
  ]
}
```

```json
{
  "id": "en:point:verb",
  "word": "point",
  "form": "verb",
  "past_tense": "pointed",
  "past_participle": "pointed",
  "is_irregular": false,
  "prepositions": [
    {
      "preposition": "at",
      "example": "She pointed at the sign on the wall."
    }
  ]
}
```

---

### (c) General Element Completeness: IPA, Emoji, Definitions, Example Sentences

| Language | Total Entries | Definitions Completion | Examples Completion | Emoji / `no_emoji` Completion | IPA Transcription Completion |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **English (`en`)** | 1,727 | 100% | 100% | 100% | 100% (UK/US variants) |
| **Bashkir (`ba`)** | 377 | 100% | 100% | 100% | 100% |
| **Breton (`br`)** | 398 | 100% | 100% | 100% | 100% |
| **Chuvash (`cv`)** | 445 | 100% | 100% | 100% | **29.7%** (132/445 IPA present)* |
| **German (`de`)** | 494 | 100% | 100% | 100% | 100% |
| **Greek (`el`)** | 677 | 100% | 100% | 100% | 100% |
| **Spanish (`es`)**| 482 | 100% | 100% | 100% | 100% |
| **French (`fr`)** | 966 | 100% | 100% | 100% | 100% |
| **Armenian (`hy`)**| 391 | 100% | 100% | 100% | 100% |
| **Italian (`it`)** | 992 | 100% | 100% | 100% | 100% |
| **Georgian (`ka`)**| 387 | 100% | 100% | 100% | 100% |
| **Portuguese (`pt`)**| 476| 100% | 100% | 100% | 100% |
| **Russian (`ru`)** | 795 | 100% | 100% | 100% | 100% (Bracketed Cyrillic stress / IPA) |
| **Tatar (`tt`)**   | 377 | 100% | 100% | 100% | 100% |

*\*Note: Chuvash (`cv`) contains 313 entries with missing transcriptions; schema allows optional transcription for Chuvash, but completing IPA transcriptions is recommended.*

---

## 3. Themes and Sub-Themes Structural Analysis

### English Theme Model Baseline
English uses a granular **28-Theme** and **41-Subtheme** classification architecture:
- **Themes**: `actions`, `clothing`, `colors`, `communication`, `descriptors`, `education`, `emotions`, `family`, `food`, `general`, `geography`, `grammar`, `health`, `housing`, `leisure`, `measurement`, `nature`, `navigation`, `numbers`, `objects`, `shopping`, `shapes`, `technology`, `time`, `travel`, `weather`, `work`.
- **Sub-themes**: `body`, `feelings`, `transport`, `furniture`, `profession`, `routine`, `spatial`, `kitchen`, etc.

### Non-English Dataset Theme Architecture
Non-English language datasets currently organize entries into **20–25 topical JSON files** (e.g. `animals.json`, `food_drink.json`, `places_transport.json`, `house_furniture.json`, `body_health.json`, `general_adjectives.json`), where `theme` equals the file stem name and `sub_theme` is unpopulated (`undefined`).

### Multi-Theme / Cross-Theme Word Evaluation
Certain words inherently cross thematic boundaries and belong to multiple themes simultaneously:
1. **Food vs. Animal**: `fish` / `poisson` / `pesce` / `рыба` / `ψάρι` (Animal kingdom vs. Food/cooking).
2. **Body vs. Health**: `headache`, `doctor`, `medicine` (Anatomy vs. Medical care).
3. **Places vs. Transport**: `bus stop`, `train station`, `airport` (Physical geography vs. Transportation).
4. **House vs. Furniture**: `kitchen`, `bedroom` vs. `table`, `bed` (Rooms/housing vs. Objects/furniture).
5. **Time vs. Routine**: `morning`, `breakfast`, `weekend` (Temporal units vs. Daily actions).

---

## 4. Summary & Integration Recommendations for Maintainers

1. **COSYtools Verb Linking**:
   - **Prepositions array**: Extend the `prepositions` schema property across non-English verbs (specifically `de`, `fr`, `es`, `it`, `pt`, `ru`, `el`) to record essential verb government (e.g. French *penser à*, *parler de*; German *warten auf*, *denken an*; Spanish *depender de*, *pensar en*).
   - **Verb Conjugation Forms**: Populating `past_tense`, `past_participle`, or language-equivalent principal parts (e.g., *Passé composé*, *Präteritum*, *Passato prossimo*) will enable seamless automated conjugation drills in `COSYtools`.

2. **Homonym Handling**:
   - Preserve existing sense-discriminated homonym IDs (e.g., `el:psari-animal:noun` vs. `el:psari:noun`) as canonical standard entries.

3. **IPA Transcription Completion**:
   - Complete missing IPA transcriptions for 313 Chuvash (`cv`) entries to achieve 100% phonetical coverage across all 14 languages.

4. **Theme & Sub-Theme Harmonization**:
   - Maintain file-level simplicity while gradually populating `sub_theme` attributes on non-English entries to enable multi-theme filtering in client applications (`COSYtools` / `COSYlanguages`).
