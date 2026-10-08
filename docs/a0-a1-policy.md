# A0–A1 Vocabulary Policy

This policy defines the standards, level evidence requirements, domain rules, allowed grammatical forms, counting rules, and parity targets for CEFR A0–A1 vocabulary datasets across target languages (`en`, `fr`, `it`, `ru`, `el`).

---

## Levels

- **A0 (Pre-A1 "survival core")**: Represents what a true beginner needs in the first 2–3 lessons. This includes:
  - Basic greetings and courtesy expressions (hello, goodbye, yes, no, please, thank you, sorry).
  - Numbers 0–20.
  - Basic colours.
  - Days of the week.
  - Close family members.
  - Core body parts.
  - Basic classroom words.
  - Personal pronouns.
  - Most essential verbs (e.g., be, have, go, want).
- **A1**: Everything else at CEFR A1.
- **`level` and `levels` Fields**:
  - Inside `vocabulary/<lang>/a0_a1/`, the `level` field must be either `"A0"` or `"A1"`.
  - The `levels` array lists extra CEFR levels for other senses or usage levels.
  - The `level` property must equal the lowest value in the `levels` array.

---

## Level evidence

Levels must be established strictly using named reference sources for each specific language; intuition is never permitted.

- **English (`en`)**:
  - Oxford 3000 CEFR tags (sense-aware).
  - English Vocabulary Profile (EVP).
  - Cambridge Young Learners: Starters list (A0), Movers list (A1).
- **French (`fr`)**:
  - DELF A1 / Référentiel pour le français niveau A1.
  - Français fondamental 1er degré (frequency check).
- **Italian (`it`)**:
  - Profilo della lingua italiana A1.
  - CELI 1 / CILS A1 syllabi.
  - Nuovo vocabolario di base (frequency check).
- **Russian (`ru`)**:
  - Лексический минимум ТЭУ (элементарный уровень, A1) of TORFL.
- **Greek (`el`)**:
  - Κέντρο Ελληνικής Γλώσσας (ΚΕΓ) A1 syllabus / Πιστοποίηση Ελληνομάθειας A1.

If an authoritative source cannot be reached or consulted for an entry, do not guess: list the entry in `reports/needs-review/`.

---

## Courses at A0–A1

- **Primary Domain**: Every entry must have `general` listed first in the `domain` field (e.g., `"general"` or `"general, spoken"`).
- **Allowed Course Domains at A0–A1**:
  - `general`: Standard core vocabulary.
  - `spoken`: High-frequency everyday conversational words and phrases.
  - `travel`: Words needed by a beginner traveller (transport, accommodation, food ordering, directions, money, emergencies, tourist places, dates/time, weather).
  - **No other domain values are allowed at A0–A1.**
- **Excluded Domains**:
  - The course domains `relocation`, `exam`, and `professional` start at B1 and must NOT appear in A0–A1 domains.
  - Invalid values (such as `food`, `home`, `leisure`, etc.) must be replaced by the correct theme / sub_theme; canonical theme names are defined in `shared/themes.json`.

---

## Allowed forms

- **Allowed Grammatical Forms at A0–A1**:
  - `noun`
  - `verb`
  - `adjective`
  - `adverb`
  - `pronoun`
  - `preposition`
  - `conjunction`
  - `determiner`
  - `number`
  - `phrase` (restricted strictly to fixed greetings and survival expressions)
- **Disallowed at A0–A1**:
  - `idiom`
  - Phrasal verbs beyond explicit English A1 reference sources.
  - Separate entries for plurals, conjugations, or other regular inflected forms (unless the language's A1 reference syllabus specifically lists the form as its own independent lemma).

---

## Partitives and contractions

### Partitive articles on nouns
- **Field**: `partitive` (string, optional on nouns).
- **French (`fr`)**:
  - Allowed values: `"du"`, `"de la"`, `"de l'"`, `"des"`.
  - **REQUIRED** on every noun with countability `uncountable` (*du pain*, *de la viande*, *de l'eau*).
  - **REQUIRED** with value `"des"` on `pluralia_tantum` nouns (*des pâtes*, *des vacances*).
  - **REQUIRED** on countable nouns that are normally also used as a mass noun at A1 (*du poulet*, *du poisson*, *du fromage*, *du sport*, *de la musique*, *du temps*, *de l'argent*, *de la chance*).
  - **OMITTED** on ordinary countable nouns (their plural remains in `plural_form`).
  - Value agreement: masculine -> `du`; feminine -> `de la`; initial vowel or mute h (`h_aspire: false`) -> `de l'`. If the mass sense and count sense differ in meaning (e.g., *poulet* animal vs *poulet* meat), use separate entry IDs distinguished with `sense`.
- **Italian (`it`)**:
  - Allowed values: `"del"`, `"dello"`, `"della"`, `"dell'"`, `"dei"`, `"degli"`, `"delle"`.
  - Same logic: required on uncountable and normally-mass nouns, plural forms for pluralia_tantum / mass-plural nouns (*del pane*, *della frutta*, *dell'acqua*, *degli spaghetti*), omitted on ordinary countable nouns.
- **English (`en`), Russian (`ru`), Greek (`el`)**:
  - `partitive` is prohibited and rejected by the schema.
- **Counting Rule**: Partitive articles themselves are **NOT** separate entries; they live in the `partitive` field on the noun entries.

### Preposition + article contractions
- **Field**: `contraction` (`{"preposition": "<base preposition>", "article": "<article>"}`).
- Allowed strictly when `form` is `"preposition"` and language is `fr`, `it`, or `el`.
- Each contracted form is its **OWN entry** (e.g., ID `fr:au:preposition`; homograph entries like `fr:du-contracte:preposition` and `fr:des-contracte:preposition` use `sense` so they never clash with partitive or indefinite uses of *du* / *des*).
- Base prepositions list their contracted entry IDs in `related_forms`.
- **Required A1 Sets**:
  - **French (`fr`)**: *au* (à+le), *aux* (à+les), *du* (de+le), *des* (de+les). Base prepositions: *à*, *de*.
  - **Italian (`it`)**:
    - *a* -> *al*, *allo*, *alla*, *all'*, *ai*, *agli*, *alle*;
    - *di* -> *del*, *dello*, *della*, *dell'*, *dei*, *degli*, *delle*;
    - *in* -> *nel*, *nello*, *nella*, *nell'*, *nei*, *negli*, *nelle*;
    - *su* -> *sul*, *sullo*, *sulla*, *sull'*, *sui*, *sugli*, *sulle*;
    - *da* -> *dal*, *dallo*, *dalla*, *dall'*, *dai*, *dagli*, *dalle*.
    - *(con + article forms col / coi are not A1).*
  - **Greek (`el`)**: *στο*, *στη*, *στην*, *στον*, *στα*, *στους*, *στις* (σε + article). Base preposition: *σε*.
  - **English (`en`) and Russian (`ru`)**: Not applicable; the field is rejected.
- **Counting Rule**: Each contracted form is one entry and counts in the A0–A1 total like any other entry.

---

## Counting rule

- **Unit of Counting**: 1 entry ID = 1 unit.
- **Contracted Prepositions**: Each contracted preposition entry (e.g., *au*, *aux*, *del*, *στο*) counts as **ONE** entry.
- **Partitives**: Partitive articles live in the `partitive` property on noun entries and do **NOT** count as separate entries.
- **Homographs**: Words with identical surface forms but distinct meanings/senses must be separate entry IDs distinguished by the `sense` slug.
- **Russian Aspect Pairs**: Aspectual verb pairs (imperfective/perfective) count as **ONE** entry. The imperfective verb serves as the headword, with the perfective verb referenced in `related_forms`.
- **Russian Motion Verbs**: Unidirectional vs. multidirectional motion verbs (e.g., *идти* / *ходить*) count as **TWO** separate entries.
- **French and Italian Reflexive Verbs**: Reflexive verbs count as **ONE** entry.
- **Theme Canonical Living**: An entry lives in exactly one primary theme file (`vocabulary/<lang>/a0_a1/<theme>.json`). Additional themes must be represented using the `secondary_themes` array.

---

## Parity rule

- **Cross-Linguistic Monolingual Independence**: Each language dataset (`en`, `fr`, `it`, `ru`, `el`) is an independent monolingual dictionary, not a direct translation of English.
- **Quantitative Target Parity**: The total number of A0–A1 entries, the total A0 count, and the total A1 count must be identical across `en`, `fr`, `it`, `ru`, and `el`.
- **Per-Theme Parity**: Per-theme entry counts for each language should be within 30% of English (or the target benchmark), serving as a warning threshold while allowing language-specific pedagogical adaptation.
