# Analysis Report: Ambiguous, Irregular, and Multiword Verbs in CosyData & CosyTools

## Executive Overview

This report presents a cross-linguistic lexicographical and grammatical analysis of the **53 canonical English source verbs and multiword verbal expressions** across all **14 supported languages** in the COSYlanguages ecosystem:
`en` (English), `fr` (French), `it` (Italian), `ru` (Russian), `el` (Greek), `pt` (Portuguese), `de` (German), `es` (Spanish), `tt` (Tatar), `ba` (Bashkir), `cv` (Chuvash), `br` (Breton), `hy` (Armenian), `ka` (Georgian).

---

## 1. Ambiguous and Polysemous Verbs

Several English source verbs exhibit one-to-many semantic splits when translated into other target languages. The inventory schema handles this by introducing distinct sense IDs (`verb:<concept>:<sense_slug>`) to preserve precise translation relationships.

### Key Polysemous Verbs & Sense Mappings

#### 1. `know`
- **Sense 1 (`verb:know:facts`)**: Knowledge of facts, answers, or skills.
  - *French*: `savoir`
  - *Italian*: `sapere`
  - *Spanish*: `saber`
  - *German*: `wissen`
  - *Portuguese*: `saber`
  - *Russian*: `знать`
- **Sense 2 (`verb:know:people`)**: Acquaintance or familiarity with a person or place.
  - *French*: `connaître`
  - *Italian*: `conoscere`
  - *Spanish*: `conocer`
  - *German*: `kennen`
  - *Portuguese*: `conhecer`
  - *Russian*: `знать`

#### 2. `be`
- **Sense 1 (`verb:be:existence`)**: Existence and essential attributes vs temporary states or locations.
  - *Spanish / Portuguese*: `ser` (essential/permanent quality) vs `estar` (transitory state or spatial location).
  - *Breton*: `bezañ` (with situation/habitual forms `emañ` / `bezañ`).
  - *Russian*: `быть` (frequently omitted in present indicative copula position).

#### 3. `think`
- **Sense 1 (`verb:think:cognition`)**: Mental process or active reflection.
  - *French*: `penser` | *Italian*: `pensare` | *Spanish*: `pensar` | *German*: `denken` | *Russian*: `думать`
- **Sense 2 (`verb:think:opinion`)**: Holding a belief or opinion.
  - *French*: `croire` | *Italian*: `credere` | *Spanish*: `creer` | *German*: `glauben` | *Russian*: `считать`

#### 4. `spend` vs `waste`
- **`spend` (`verb:spend:primary`)**: Disbursing money or spending time constructively.
  - *French*: `dépenser` (money) / `passer` (time) | *Italian*: `spendere` (money) / `passare` (time) | *German*: `ausgeben` (money) / `verbringen` (time)
- **`waste` (`verb:waste:primary`)**: Squandering or wasting resources heedlessly.
  - *French*: `gaspiller` | *Italian*: `sprecare` | *Spanish*: `desperdiciar` | *German*: `verschwenden` | *Russian*: `тратить впустую`

#### 5. `look`, `watch`, `see`
- **`see` (`verb:see:primary`)**: Passive visual perception (*seeing*).
  - *French*: `voir` | *Italian*: `vedere` | *Spanish*: `ver` | *German*: `sehen` | *Russian*: `видеть`
- **`look` (`verb:look:primary`)**: Directing gaze (*looking at*).
  - *French*: `regarder` | *Italian*: `guardare` | *Spanish*: `mirar` | *German*: `schauen` | *Russian*: `смотреть`
- **`watch` (`verb:watch:primary`)**: Observing attentively over time (*watching*).
  - *French*: `observer` / `regarder` | *Italian*: `osservare` / `guardare` | *Spanish*: `observar` | *German*: `beobachten` / `zuschauen` | *Russian*: `наблюдать`

---

## 2. Irregular Conjugation Paradigms Across Languages

Verbs belonging to core vocabulary frequently retain archaic, highly suppletive, or irregular conjugation paradigms across language families.

### Selected High-Irregularity Paradigms

| Language | Canonical Lemma | Conjugation Class / Paradigm Notes | CosyTools Model Key |
| :--- | :--- | :--- | :--- |
| **English** | `be` | Highly suppletive (*am, is, are, was, were, been*) | `COSYtools:en-irregular-verbs:be` |
| **English** | `go` | Suppletive past tense (*go / went / gone*) | `COSYtools:en-irregular-verbs:go` |
| **French** | `être` | Highly irregular 3rd group verb (*suis, es, est, sommes, êtes, sont*) | `COSYtools:fr-verb:etre` |
| **French** | `avoir` | Auxiliary verb (*ai, as, a, avons, avez, ont*) | `COSYtools:fr-verb:avoir` |
| **French** | `aller` | Suppletive stems (*vais, vas, va, allons, irez*) | `COSYtools:fr-verb:aller` |
| **Italian** | `essere` | Highly suppletive (*sono, sei, è, siamo, siete, sono*) | `COSYtools:it-verb:essere` |
| **Italian** | `andare` | Suppletive present vs future (*vado vs andrò*) | `COSYtools:it-verb:andare` |
| **German** | `sein` | Strong irregular verb (*bin, bist, ist, sind, seid, war, gewesen*) | `COSYtools:de-verb:sein` |
| **German** | `gehen` | Strong Class 7 verb (*gehen, ging, gegangen*) | `COSYtools:de-verb:gehen` |
| **Spanish** | `ser` | Suppletive (*soy, eres, es, somos, sois, son; fui*) | `COSYtools:es-verb:ser` |
| **Spanish** | `ir` | Suppletive (*voy, vas, va; fui; iré*) | `COSYtools:es-verb:ir` |
| **Russian** | `быть` | Archaic present (*есть*), regular future (*буду*) | `COSYtools:ru-verb:byt` |
| **Greek** | `είμαι` | Deponent verb, no infinitive form | `COSYtools:el-verb:eimai` |
| **Breton** | `bezañ` | Brittonic suppletive verb (*on, out, eo, omp, oc'h, int*) | `COSYtools:br-verb:bezan` |
| **Georgian** | `ყოფნა` | Masdar verbal noun with suppletive screeve patterns | `COSYtools:ka-verb:qopna` |

---

## 3. Modal and Multiword Verbal Expressions

Multiword verbal idioms and modal constructions require special syntactic handling, as they are not always simple single-word headwords.

### Key Multiword & Modal Expressions

1. **`have to` (`verb:have-to:primary`)**:
   - *English*: Multiword modal expression of obligation (`have to`).
   - *French*: Periphrastic verb `devoir` / `avoir à`.
   - *Spanish*: Periphrastic verb `tener que` (+ infinitive).
   - *Portuguese*: Periphrastic verb `ter de` / `ter que` (+ infinitive).
   - *Italian*: Modal verb `dovere`.
   - *German*: Modal verb `müssen`.
   - *Russian*: Impersonal/modal predicate `приходиться` / `должен`.
   - *Greek*: Impersonal modal construction `πρέπει να`.
   - *Breton*: Verb `rankout`.
   - *Tatar / Bashkir*: Predicative adjective + copula (`тиеш булу` / `тиеш булыу`).

2. **`agree` & `disagree` (`verb:agree` & `verb:disagree`)**:
   - *French*: Multiword expression `être d'accord` / `ne pas être d'accord`.
   - *Italian*: Multiword expression `essere d'accordo` / `non essere d'accordo`.
   - *Spanish*: Multiword expression `estar de acuerdo` / `no estar de acuerdo`.
   - *Breton*: Idiomatic expression `a-du bezañ` / `n'emañ ket a-du`.

3. **`need` (`verb:need`)**:
   - *French*: Nominal verbal phrase `avoir besoin de`.
   - *Italian*: Nominal verbal phrase `aver bisogno di`.
   - *Portuguese*: Prepositional verb `precisar de`.
   - *Breton*: Nominal verbal phrase `ezhomm kaout`.
   - *Tatar / Bashkir*: Impersonal predicate phrase (`кирәк булу` / `кәрәк булыу`).

---

## 4. Citation Form Conventions & Language Morphology

Each language family in the inventory uses a specific lexicographical citation convention, registered in `inventory/language-registry.json`:

- **Infinitive (bare / to-less)**: `en` (`be`, `work`)
- **Standard Infinitive**: `fr` (`être`), `it` (`essere`), `ru` (`быть`), `pt` (`ser`), `de` (`sein`), `es` (`ser`), `tt` (`булу`), `ba` (`булыу`), `cv` (`пулмаш`), `hy` (`լինել`)
- **1st Person Singular Present Indicative**: `el` (`είμαι`, `έχω`, `ξέρω`) — *Greek lacks a traditional infinitive form.*
- **Verbal Noun / Masdar**: `br` (`bezañ`), `ka` (`ყოფნა`, `ქონა`, `ცოდნა`) — *Georgian dictionary headwords use the masdar verbal noun.*

---

## 5. Integration with CosyTools Conjugation Models

Every translation entry in `inventory/multilingual-verb-inventory.json` includes a structured reference key `cosytools_conjugation_pattern` pointing directly to CosyTools conjugation models.

Example reference link structure:
```json
{
  "lemma": "être",
  "cosydata_entry_ids": ["fr:etre:verb"],
  "cosytools_conjugation_pattern": "COSYtools:fr-verb:etre"
}
```

This guarantees seamless inter-operability between **CosyData** (lexical dictionary storage) and **CosyTools** (verb conjugation tables and practice engines).
