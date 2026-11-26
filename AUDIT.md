# COSYdata Repository Audit Report

**Audit date:** 2026-11-26
**Revision:** `3502aa4` (`main`, shallow clone)
**Scope:** structural integrity, vocabulary quality, schema/index consistency, taxonomy, resolver, parity tooling, tests/CI, documentation, security, repository hygiene.

**Method:** static inspection plus reproducible commands. `npm run validate`, `npm run build`, `npm run audit`, `npm run parity`, `npm run test:verb-inventory` and `npm run test:conjugation` were run. Indexes were rebuilt and compared with committed files; no drift was found. No vocabulary data was changed; the P0 remediation adds a quality gate and records existing debt in `reports/quality-baseline.json`.

> This report replaces the previous `AUDIT.md`. Its claims that validation fails with 78 retired IDs and that `KNOWN_FORMS` lacks `idiom`/`phrasal_verb` are false on this revision: validation passes and `KNOWN_FORMS` covers every form currently in the data.

## Executive verdict

The repository is **not yet a reliable 14-language A0-C2 dataset**. English is substantially populated; most other languages are partial scaffolds. Validators pass because they check schema shape, unique IDs, index coverage and theme names, but they do **not** enforce definitions, examples, real IPA, correct POS, level progression, or same-word/same-form uniqueness. The repo therefore contains large blocks of placeholder, duplicate and mislabeled entries that consumers will render as real vocabulary.

Highest-impact problems:

1. **Level coverage is not a progression.** German, Spanish and Portuguese have zero B2 and C1 entries; Chuvash has zero A2, B1, B2 and C1; Armenian, Georgian, Bashkir, Tatar and Breton have only 17 A2 and 11 B1 entries but 88-140 B2/C1 entries.
2. **688 of the original 1,850 vocabulary JSON files were empty (37%).** P1 pruned them; 1,140 data files remain, with 0 empty files.
3. **No entry lacks a definition or an example.** P29 removed 628 template examples; P30 added definitions and examples for 52 place/animal entries; P31 added Russian definitions and examples for 88 entries; P32 added Greek definitions and examples for 60 entries; P33 fixed the last 18 headword-only definitions; P56 removed the last 66 empty B1 placeholders; P57 added Greek C2 and Portuguese examples; P58 cleared Armenian and Georgian; P59 cleared Italian; P60 cleared French A0–A1; P61 cleared French A2; P62 cleared Russian. No definition now equals its headword.
4. **100 entries share the same word and the same form with another entry; 0 share word, form and sense.** P9 removed the four Spanish country/city duplicates. P22 resolved all 122 `-a2` IDs: 9 distinct senses were renamed with `sense`, and 113 level variants were merged into their base entries. P24 merged 43 exact or malformed duplicate entries; P25 merged 31 more and labelled 46 true homographs, reducing the duplicate groups from 123 to 50 and the same-sense duplicates to 0.
5. **205 IDs violated their own `lang:slug:form` contract** (145 French, 56 Spanish, 4 Italian), but passed the schema; 76 failed the stricter quality ID pattern outright. P8 repaired 19 French IDs, P9 repaired all 56 Spanish IDs, P10 renamed 126 French `avoir …` IDs, and P11 repaired the last 4 Italian IDs and P12 fixed the final non-ASCII slug; none remain, with 0 strict failures.
6. **Pronunciation data has been cleaned of known corruptions:** P35 removed 1,993 slug-only values, 1,045 native-script values and 275 `-` placeholders. 8,327 entries now have no transcription. Real IPA still needs to be written for those entries.
7. **The parity tool ignored nested `home/` directories**, undercounting major languages and producing false "missing essentials" such as English `house`, `room` and `kitchen`. P2 fixed the recursive loader; parity still covers only its five target languages.
8. **Tests and CI do not fully protect the data.** P17 declared `playwright` and added `test:conjugation` to CI; P5 added CI runs for `audit`, `parity`, and `test:verb-inventory`, and P14 added the full `npm run validate` chain.

## Verification results

| Command | Result |
|---|---|
| `npm run validate` | Passes with no empty-file warnings. It now also runs the quality regression gate; existing debt is accepted in the baseline. |
| `npm run quality` | Passes against the baseline: 31,498 entries, 8,327 recorded findings, 0 new. |
| `npm run build` | Passes; generated indexes, daily calendars and comparative artifacts are in sync with the vocabulary data. |
| `npm run audit` | Passes; writes `reports/audit-a0-a1.md`, but does not fail on the defects below. |
| `npm run parity` | Passes after P2; now includes nested `a0_a1/home/**` entries but still covers only its five target languages. |
| `npm run test:verb-inventory` | Passes: 53 concepts, 55 senses, 772 translations, 14 languages. |
| `npm run test:conjugation` | Passes: 4 tests, including the browser render test. |

## Structural findings

### S1 - Empty scaffold files (Critical)
- **688 empty JSON arrays out of the original 1,850 vocabulary data files (37.2%) were removed in P1.** 1,140 data files remain after the P23 level cap; 0 are empty. See `reports/empty-vocabulary-files-pruned.md`.
- Worst: `ru/b1` 46, `el/b1` 46, `it/b2` 45, `ru/b2` 45, `el/b2` 45, `fr/c1` 43, `it/c1` 43, `ru/c1` 43, `el/c1` 43, `fr/b2` 41, `fr/b1` 36, `el/a2` 31.
- Empty by theme name: `phrasal_verbs` 18, `idioms` 17, `linking_words` 17, `teachers_scientists` 16, `academic_english` 16, `media` 16, `it_specialists` 16, `register` 16, `ethics`/`emotions`/`politics`/`society` 15 each.
- The validator only warns. Empty files look like supported themes/levels to consumers and make coverage reports misleading.

### S2 - Level directories and level coverage are inconsistent (Critical)
- `de`, `es` and `pt` have no `a0` and no `b2` directory. `cv` has only `a0_a1` and `a1`.
- P23 capped `cv`, `tt`, `ba` and `br` at B2: their C1/C2 directories and 661 entries were removed, and all old IDs are null aliases.
- P26 removed 51 contradictory `no_antonym: true` flags from entries that already had `antonyms`, and removed 9 synonyms that repeated the headword. Quality counts did not change; these were structural contradictions the quality gate did not cover.
- P27 repaired 23 broken `translation_of` targets and removed one broken internal `related_forms` reference. These are cross-reference fixes; no dictionary content or quality counts changed.
- P28 removed 7 real named people from the Russian vocabulary: `Пётр I`, `Фёдор Достоевский`, `Мария Шарапова`, `Анна Ахматова`, `Александр Пушкин`, `Лев Толстой`, `Виктор Цой`. They violated the no-real-named-people rule and are now null aliases.
- P29 removed 628 template examples from French, Italian and Russian entries. They are listed in `reports/needs-review/p29-template-examples.md`; the entries now correctly report missing examples instead of fake ones.
- P30 added real definitions and examples for 52 French, Italian and Spanish place/animal entries, reducing findings from 12,102 to 11,996. It also removed the last real-person entry, `ru:yuriy-gagarin:noun`.
- P31 added Russian definitions and examples for 88 entries, reducing findings from 11,996 to 11,827 and Russian headword-only definitions to 0.
- P32 added Greek definitions and examples for 60 entries, reducing findings from 11,827 to 11,767 and Greek headword-only definitions to 0.
- P33 fixed the last 18 headword-only definitions, reclassified two French/Italian C2 phrases from verb to noun, and reduced findings to 11,747. No definition now equals its headword.
- P34 removed 68 real named people from English, French, Spanish, Italian, Portuguese and Greek. They are now null aliases; entries fell from 31,636 to 31,568.
- P35 removed 3,313 invalid transcription values (slug-only, native-script and `-`); they are now empty strings and counted as missing rather than false IPA.
- P36 added `npm run test:integrity`, which fails if any previously fixed defect class or removed real-person entry returns.
- P37 added French definitions and examples for 208 housing entries, reducing findings from 11,708 to 11,292.
- P38 added Italian A0/A1 definitions and examples for 64 housing entries, reducing findings to 11,164.
- P39 added Italian A2 definitions and examples for 97 housing entries, reducing findings to 10,970.
- P40 added Italian B1/B2 definitions and examples for 63 housing entries; the Italian housing theme is now complete, findings 10,844.
- P41 added Greek A0/A1 definitions and examples for 72 housing entries, reducing findings to 10,700.
- P42 added Greek A2 definitions and examples for 100 housing entries, reducing findings to 10,500; one headword order issue is in needs-review.
- P43 added Greek B1/B2 definitions and examples for 64 housing entries; the Greek housing theme is now complete except two nonstandard headwords in needs-review, findings 10,372.
- P44 added Russian A0/A1 definitions and examples for 61 housing entries, reducing findings to 10,250.
- P45 added Russian A2 definitions and examples for 99 housing entries, reducing findings to 10,052.
- P46 added Russian B1/B2 definitions and examples for 61 housing entries; the Russian housing theme is now complete except one nonstandard headword in needs-review, findings 9,930.
- P47 added French A0 definitions and examples for 44 basic entries, reducing findings to 9,842.
- P48 added French A1 definitions and examples for 71 basic entries, reducing findings to 9,700.
- P49 added Italian A0 definitions and examples for 52 food, travel and everyday-object entries, reducing findings to 9,596.
- P50 added Italian A0 definitions and examples for 37 verb and communication-phrase entries, reducing findings to 9,522.
- P51 added Italian A0 definitions and examples for 24 grammar-term and function-word entries, reducing findings to 9,474.
- P52 added Italian A0 definitions and examples for the last 26 identity, time, navigation and school entries; Italian A0 is now complete apart from 9 B1/C1 outliers, findings 9,422.
- P53 defined the eight Italian B1 place names, fixed their themes, and removed a duplicate C1 verb entry for `infrastruttura`; Italian now has no missing definitions, findings 9,403.
- P54 defined eleven Greek B1 place names and renamed two malformed Greek housing headwords, clearing Greek missing definitions, findings 9,377.
- P55 fixed the last French, Portuguese and Russian definition gaps, removed a named-person entry and duplicate verbs, and renamed three malformed IDs; findings 9,351.
- P56 removed the 66 empty B1 placeholders in ba, br, de, hy, ka and tt; no entry now lacks a definition, findings 9,153.
- P57 added examples for 58 Greek C2 adjectives and corrected the Portuguese July definition, findings 9,094.
- P58 added examples for 58 Armenian and 58 Georgian C2 adjectives and corrected three mismatched headwords, findings 8,978.
- P59 added examples for 171 Italian A2 entries, findings 8,807.
- P60 added examples for 70 French A0–A1 entries and replaced 65 example-shaped definitions, findings 8,737.
- P61 added examples for 160 French A2 entries, findings 8,577.
- P62 added examples for 249 Russian entries, removed one duplicate idiom and fixed six malformed headwords, findings 8,327.
- `en`, `fr`, `it`, `ru` and `el` have three overlapping beginner schemes: `a0/`, `a0_a1/`, `a1/`.
- Nested `home/furniture/**` directories exist across all 14 languages, in addition to flat theme files. They are valid data but outside the documented flat layout and outside the parity scan.
- Entries by level (including nested):

| Lang | A0 | A1 | A2 | B1 | B2 | C1 | C2 | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| en | 478 | 1,264 | 3,071 | 2,704 | 2,281 | 1,811 | 1,163 | 12,772 |
| fr | 1,062 | 611 | 972 | 278 | 211 | 187 | 301 | 3,622 |
| it | 275 | 1,005 | 936 | 759 | 225 | 187 | 296 | 3,683 |
| de | 40 | 592 | 17 | 11 | 0 | 0 | 133 | 793 |
| ru | 212 | 570 | 1,279 | 266 | 228 | 184 | 290 | 3,029 |
| el | 154 | 815 | 314 | 111 | 70 | 26 | 141 | 1,631 |
| es | 35 | 577 | 33 | 11 | 0 | 0 | 132 | 788 |
| pt | 36 | 569 | 18 | 3 | 0 | 0 | 131 | 757 |
| br | 29 | 523 | 17 | 11 | 140 | 0 | 0 | 720 |
| cv | 28 | 572 | 0 | 0 | 0 | 0 | 0 | 600 |
| hy | 29 | 500 | 17 | 11 | 125 | 88 | 128 | 898 |
| ka | 28 | 513 | 17 | 11 | 130 | 88 | 126 | 913 |
| ba | 32 | 498 | 17 | 11 | 127 | 0 | 0 | 685 |
| tt | 31 | 495 | 17 | 11 | 123 | 0 | 0 | 677 |

- **German/Spanish/Portuguese C2-only blocks:** `de` has 133 C2 entries and zero B2/C1; `es` 132; `pt` 131. The C2 files look like real philosophical vocabulary but are `status: needs_review`; the level jump is not credible and needs review.
- **French A0/A1 imbalance:** 1,062 A0 vs 611 A1, while the parity target is 474 A0 / 1,195 A1. This looks like mass A0 labeling, not progression.

### S3 - Stray, dead and duplicate artefacts (Low/Medium)
- `vocabulary/_canonical/` is an unconsumed second English source: `A0-A1_master.json` has 1,262 words with a different ID scheme (`en_preposition_about`) and definitions such as `"Basic A1 English preposition: 'about'."`; `flat-index.json` is `{}` and `search-index.json` is `[]`. It is not built or validated.
- P16 removed 57 exact duplicate files from `reports/archive/`; 3 unique historical files remain (136 KB). `reports/` is now much smaller.
- Pre-existing reports already flag unresolved data: `reports/idiom-duplicates.json` has 786 duplicate idiom groups, `reports/placeholder_merged_entries.json` has 866 entries, and `reports/home-audit.json` (2026-10-11) lists 89 non-home entries in home files, 11 home entries outside home, 4 duplicates, 4 level discrepancies and 20 missing home words.

## Vocabulary quality findings

### Q1 - Missing definitions and examples (Critical)
- **0 entries have no `definitions`.** P56 removed the last 66 empty B1 placeholders; every remaining entry has at least one definition.
- **0 entries have no `examples`.** P57 cleared Greek and Portuguese; P58 cleared Armenian and Georgian; P59 cleared Italian; P60 cleared French A0–A1; P61 cleared French A2; P62 cleared Russian. P29 removed the 628 template examples listed in `reports/needs-review/p29-template-examples.md`; P30–P33 added real examples for 135 entries.
- All remaining gaps are examples only; no entry is missing both fields.
- Cause: the JSON Schema requires only `id`, `word`, `language` and `form`; `definitions` is only constrained to `minItems: 1` **if present**. The "placeholder definitions" check cannot see an absent field.

### Q2 - Placeholder, template and tautological content (High)
- **0 template examples remain.** P29 removed all 628: fr 162, it 168, ru 298. They were listed in `reports/needs-review/p29-template-examples.md`.
- **0 definitions equal their headword.** P30 fixed 52 French, Italian and Spanish place/animal entries; P31 fixed 88 Russian entries; P32 fixed 60 Greek entries; P33 fixed the last 18 Chuvash/Tatar/Bashkir/French/Italian entries.
- **86 entries have at least two of these defects** (definition = word, template example, pseudo-IPA): ru 52, it 15, el 13, fr 6.
- **110 entries use "used to …" style definitions** (`en:maybe`, `en:no`, `en:not`, `en:remote-control`, `en:email-address`, `en:phone-number`, `en:credit-card`): usage notes, not definitions.

### Q3 - Duplicate words and forms (Critical)
- **100 entries share the same `(language, word, form)` with another entry**, in 50 groups; **0 entries share the same `sense`** (the stricter duplicate signal used by the quality gate). By language: fr 20, it 16, el 6, ru 4, en 2, tt 1, br 1.
- **P22 removed all 122 `-a2` IDs.** Nine distinct senses became semantic IDs with a `sense` field (`fr:billet-banknote`, `fr:gagner-earn`, `fr:sur-certain`, `fr:attendre-expect`, `it:guidare-lead`, `it:bilancio-budget`, `it:scoprire-learn`, `it:richiedere-need`, `it:raggiungere-arrive`); the other 113 were merged into their base entries, whose `levels` now include A2. All old IDs resolve through `shared/id-aliases.json`.
- **P24 merged 43 exact or malformed duplicates** (20 exact-definition pairs, 23 empty/transliteration variants), including Greek calendar doublets, English philosophy/ethics doublets, Russian transliteration variants and Georgian verb spellings. All old IDs resolve through `shared/id-aliases.json`.
- **P25 merged 31 more duplicates and assigned 46 `sense` labels** to true homographs (for example `fr:bureau` desk vs office, `it:salvare` save vs rescue, `ru:ryba` food vs animal, `tt:mai` oil vs May). The strict same-sense duplicate signal is now **0**.
- **Remaining word/form doublets are true polysemy:** for example `fr:poisson` food vs animal, `it:pesce` food vs animal, and `ru:ryba` food vs animal. P25 gave each a distinct `sense`; they are not duplicate records. Only 120 entries use `secondary_themes`.
- **P24 merged the listed transliteration duplicates:** Greek calendar spellings, Georgian verb spellings and the Bashkir `yahau`/`yasau` pair now resolve to one entry each.
- **371 IDs have numeric suffixes** (`-1`, `-2`). Some are legitimate (`en:catch-22:idiom`), but many are collision workarounds (`fr:soeur-1:noun`, `fr:oeil-1:noun`, `pt:alemanha-1:noun`, `br:bleiz-1:noun`). P22 removed the 122 `-a2` IDs.

### Q4 - POS/form is wrong for many entries (High)
- **169 English entries** have a definition that does not match the declared form (171 entries match the three patterns below; 2 match both):
  - 87 nouns whose definition is a verb phrase (`en:empower:noun`, `en:adjudicate:noun`, `en:bootstrap:noun`, `en:breed:noun`, `en:migrate:noun`, `en:solve:noun`, `en:blame:noun`, `en:get:noun`, `en:propose:noun`).
  - 25 adjectives whose definition is a verb phrase (`en:hone-a-skill:adjective`, `en:master-a-skill:adjective`, `en:fine-tune:adjective`, `en:refine:adjective`, `en:excel-at:adjective`).
  - 59 verbs whose definition is a noun phrase (`en:assertion:verb`, `en:fallacy:verb`, `en:credibility:verb`, `en:opinion:verb`, `en:example:verb`, `en:suspect:verb`, `en:cause:verb`).
- Defects cluster by source file (`en/b1/relationships.json` 20, `en/b2/opinions.json` 11, `en/a2/relationships.json` 11, `en/b2/work.json` 10), suggesting a batch import assigned `form` from the file/theme rather than the word's POS.
- Semantic mislabels: `en:look:adjective` ("To have a particular appearance"); `en:albeit:adjective`; `en:groundbreaking:noun`; `en:deadpan:noun`; `en:here:noun` and `en:here:pronoun` alongside `en:here:adverb`; `en:as:noun`/`en:as:verb` whose definitions describe the conjunction.
- The schema does not constrain `form`, so these all validate.

### Q5 - ID integrity is not enforced (Critical)
- Schema pattern is `^[a-z]{2}:[^:]+:[^:]+$`; the description says `<form>`, but any third token passes.
- **0 ID/form mismatches and 0 strict ID-pattern failures.** The last four Italian IDs were fixed in P11; P12 changed `fr:fêter-un-anniversaire:phrase` to `fr:feter-un-anniversaire:phrase`.
  - The 126 French `avoir …` entries in `vocabulary/fr/a0_a1/common_nouns.json` had IDs ending `:idiom` while `form` was `phrase`; P10 renamed them to `:phrase` and added aliases.
  - **19 French sports entries** previously put IPA in the ID: `fr:dessiner:/de.si.ne/`, etc. P8 fixed all 19 (8 became unique verbs, 11 were duplicates of existing verbs).
  - The 56 Spanish `:other` entries were repaired in P9: four were merged into canonical nouns and 52 now use `:noun`.
  - **4 Italian entries:** `it:ma:phrase`/`it:e:phrase`/`it:o:phrase` had `form: conjunction`; `it:non-piacere:verb` had `form: phrase`. P11 renamed them to `:conjunction` and `:phrase`; the latter duplicated an existing phrase entry, which now remains as the single canonical entry.
- **1 ID has a non-ASCII slug:** `fr:fêter-un-anniversaire:phrase`. Most French IDs drop accents; this one does not.
- **Accent-stripping creates ambiguity:** `es:teleologa:noun` (word `teleología`) collides conceptually with `teleóloga` (a female teleologist); `es:ontologa:noun` has the same issue.
- Consequence: `resolveVocab("fr:avoir-faim:phrase")` now resolves directly; the retired `fr:avoir-faim:idiom` ID is also aliased. The Italian conjunction aliases and the Spanish `:other` aliases are in place too.

### Q6 - Pronunciation/transcription is unreliable (High)
- **8,327 entries have no `transcription`** (26.4%).
- **0 entries use `"-"`** as transcription.
- **0 entries have a slug-only `/<id-slug>/` transcription.** P35 removed all 1,993 values, e.g. `/hen/`, `/send/`, `/katze/`, `/gato/`, `/perro/`, `/rome/`, `/se/`.
- **0 transcriptions use native-script spelling.** P35 removed all 1,045 values (Tatar 428, Russian 281, Bashkir 112, Chuvash 112, Armenian 112), e.g. `/эт/`, `/мәче/`, `/ноль/`, `/զրո/`, `[та́нец]`.
- **74 transcriptions were double-escaped Unicode**, e.g. `\u02c8m\u0251\u02d0m\u0259` instead of `ˈmɑːmə`; 3 examples and 1 definition were also double-escaped (`l\u0027enseignement`). P6 decoded all 78 values. Affected: en 46, fr 8, it 8, ru 6, el 6.
- **1,210 transcriptions use brackets**, 869 have no delimiter, and 21,093 use slashes. Notation is still inconsistent; all 0 placeholder values are gone.
- `dictionary-ui.js` renders expanded entries as `<span>/ ${transcription} /</span>`; because most data already contains slashes, users see `/ /kæt/ /` (double-delimited IPA). The WOTD and popup render the value as-is, so the same entry looks different in different components.
- No schema constraint rejects `-`, native script, double-escaped Unicode or pseudo-IPA.

### Q7 - Spanish legacy country/city batch was low quality (fixed in P9)
- P9 replaced the generic `"Un país en el mundo."` / `"Un famosa ciudad en el mundo."` definitions with concise Spanish definitions and real examples, and replaced the pseudo-IPA with IPA checked against Spanish Wiktionary (`es.wiktionary.org`).
- Four words already had A2 noun entries (`es:alemania:noun`, `es:berlin:noun`, `es:canada:noun`, `es:egipto:noun`); those duplicates were removed and aliased. Some of the same words still exist as separate `:phrase` entries, which is a valid homograph but should be reviewed for redundancy.
- Three manual IPA readings (`EE. UU.`, `San Francisco`, `Washington D.C.`) are recorded in `reports/needs-review/p9-es-places.md`.

### Q8 - Other language-specific clusters (Medium)
- The **19 French sports verbs** (`dessiner`, `danser`, `chanter`, …) were repaired in P8; the duplicate and mislabeled noun entries are gone.
- **126 French `avoir …` phrases** are in `common_nouns.json`, themed `general/common_things`, although they are phrases/idioms about hunger, thirst, fear, etc. Their IDs end `:idiom` while `form` is `phrase`.
- **Russian 119 adjectives** and **Greek 60 adjectives** have `definitions` equal to the word and template examples; Russian examples also use the `Он использует выражение …` template and `/дешевый/`-style transcriptions.
- **9 examples are one token or less:** 9 Chuvash place names (`"Шупашкар."`). The Spanish `enfermo`, `útil` and `país` examples were fixed in P9/P15.

## Reference, schema and taxonomy findings

### T1 - The schema does not enforce the quality contract (Critical)
`schemas/vocabulary.schema.json` requires only `id`, `word`, `language` and `form` (the P0 branch adds a `form` enum, but not the rest). A supplemental `schemas/vocabulary.quality.schema.json` and `scripts/quality-audit.cjs` now define and gate the target profile, but the remaining 8,327 existing violations are baselined rather than fixed. The core schema still allows:
- missing `definitions` and `examples`;
- any third token in `id` (the quality profile adds a strict pattern, but the core schema does not enforce it);
- any string for `transcription` (including `-`, native script and double-escaped Unicode);
- any string for `emoji` (including `<`, `>`, `%`, `=`), while the UI inserts it into HTML unescaped.
The validator's "placeholder definitions and examples" check only checks values that exist. This is why `npm run validate` succeeds while 1,256 entries have no definition.

### T2 - Competing taxonomy and concept schemes (High)
- `schemas/themes.json`: **46 themes / 236 sub-themes**.
- `shared/themes.json`: **55 themes / 369 sub-themes**; 9 themes are unused (`city`, `drinks`, `games`, `history`, `home`, `military`, `music`, `plants`, `space`) and **136 of 369 sub-themes are unused**.
- `taxonomy/themes.json`: a separate 10-domain / 4-course-format model with `level_rules`, `repo_map`, `events_map`.
- `docs/unified-taxonomy-draft/cefr_taxonomy.json`: another 10-domain / 4-format model, 87 KB, with `tracks`, `language_modules`, `tools_coverage`.
- `taxonomy/` also contains `languages.json`, `levels.json`, `tracks.json` and `crosswalk-themes.json`.
- Six narrative taxonomy documents (`TAXONOMY.md`, `docs/TAXONOMY.md`, `docs/theme-taxonomy.md`, `docs/domain-and-tagging-conventions.md`, `docs/unified-taxonomy-draft/*.md`) describe overlapping models. `shared/themes.json` says 55; README calls `schemas/themes.json` "canonical (46 themes)".
- **`concept` is split:** 2,664 values are valid `en:` entry IDs; 199 are dotted semantic keys such as `actions.daily_life.be`, including all 80 English values. README describes the dotted form as canonical and claims "all 48 existing concept values in vocabulary/en are self-references"; the actual data has 80 English values, all dotted and none self-referential. `concept` is documented as optional, but 2,783 non-English entries have it.
- **`_canonical/en/A0-A1_master.json`** is a third English source with 1,262 words and a fourth ID convention; it is not consumed by build or validation.

### T3 - Cross-reference integrity (Medium)
- **`translation_of`:** 119 values, 23 unresolved (7 unique targets). Most target `en:have-to:phrase`, but only `en:have-to:verb` exists; others target `en:be-able_to:phrase` (underscore typo), `en:need:phrase`, `en:dislike:phrase`, `en:watch:phrase`, `en:understand:verb`, none of which exist as referenced.
- **`related_forms`:** 1 dangling reference, `ru:zapomnit:verb` from `ru:pomnit:verb`; no such entry.
- **`regional_equivalents`:** 124 references, all English and currently resolvable.
- **`COSYtools:` references:** 659 `related_forms` values such as `COSYtools:fr-conjugeur:manquer`. The browser resolver cannot resolve these: its language part is uppercase `COSYtools`, so it attempts `vocabulary/COSYtools/index.json` and returns `null`. If consumers pass these to `resolveVocab`, they fail silently.
- **`concept`:** 199 dotted values are not entry IDs and cannot be resolved by the index; 2,664 `en:` IDs are valid.
- **Antonym contradiction:** 13 entries have both a non-empty `antonyms` array and `no_antonym: true` (`en:good-job:phrase`, `en:no-problem:phrase`, `en:see-you-later:phrase`, `es:posible:adjective`, `es:terrible:adjective`, etc.). Several `antonyms` values are not opposites (`en:no-problem` -> `["yes"]`; `en:come-to-a-conclusion` -> `["leave","depart"]`).

### T4 - Resolver behaviour (Medium)
- `resolveVocab` returns `null` for missing entries, network failures and parse errors. `handleFailure` logs a warning and suppresses the cause; callers cannot distinguish "entry does not exist" from "offline/404/500". Existing finding is valid.
- `hydrateVocabElements` silently leaves DOM unchanged on failure; no fallback/error event.
- The parser treats a 3-part reference as `lang:slug:form` only when the third part is in `KNOWN_FORMS`; otherwise it treats part 2 as a theme. `KNOWN_FORMS` now covers all 19 forms used in data, so current canonical forms parse correctly, but novel forms reproduce the original bug.
- Circular aliases are guarded by `_visited`; cache TTL is 24 hours with no revalidation. Index and theme payloads can be stale for a day after deployment.
- All 14 observed forms are in `KNOWN_FORMS`; the old "extend KNOWN_FORMS" finding no longer applies.

## Tooling, CI and security findings

### C1 - Tests/CI do not exercise the dataset (High)
- Existing tests: `tests/conjugation-embed.test.mjs`, `tests/quality-audit.test.mjs`, and `tests/parity-recursion.test.mjs`. P17 added `playwright` to `devDependencies` and installed Chromium in CI; `npm run test:conjugation` now passes all four tests.
- `validate-vocabulary.yml` now runs the full `npm run validate` chain, taxonomy/verb checks, data audit, parity, quality/parity and conjugation tests, and index-freshness checks.
- P14 changed dependency installation to `npm ci`, so CI uses the lockfile instead of floating ranges. P20 pinned `actions/checkout` and `actions/setup-node` to v4.4.0 commit SHAs and set least-privilege `contents: read` permissions where possible.
- `daily-calendar.yml` has `contents: write` and commits directly to `main` on a schedule; there is no test gate for generated daily content.

### C2 - Stored-XSS surface in the dictionary UI (Medium)
- P13 escaped all data-derived `emoji`, `form`, `level` and entry-ID values inserted into `innerHTML` in `dictionary-ui.js`; previously these fields were interpolated raw at lines 1279, 1281, 1435, 1437, 1438, 1456, 1459 and 1460.
- `emoji` and `form` remain unconstrained strings in the schema, so the UI must keep escaping them. Current data contains no `<script>`/`onerror`/`javascript:` payloads. P3 replaced the two HTML-unsafe `<`/`>` values; 5 entries still use safe symbols (`%`, `=`).
- `index.html` loads three external scripts from `https://cosylanguages.github.io/...` with no SRI and no CSP meta tag: `daily-strip.js`, `daily-directory.js`, `ecosystem-strip.js`. A compromise of the COSYlanguages Pages repo would execute in COSYdata consumers.
- `top10-verbs.html` previously inserted values from `shared/top10-verbs.json` into HTML without escaping. P4 added `escapeHtml` around every interpolated verb/conjugation field.

### C3 - Parity tool undercounted and covers only five languages (High; recursion fixed in P2)
- Before P2, `a0-a1-parity.cjs` read only top-level `vocabulary/<lang>/a0_a1/*.json` and ignored nested `a0_a1/home/**`. P2 now recurses; the historical top-level counts were:
  - EN reported 1,657; actual with nested 29 entries **1,686**; target 1,669 -> actual **+17**, not -12.
  - FR reported 1,620; actual 1,628 after the P8 cleanup; target 1,669 -> -41, not -49.
  - IT reported 1,210; actual 1,235 -> -434, not -459.
  - RU reported 712; actual 737 -> -932, not -957.
  - EL reported 906; actual 934 -> -735, not -763.
- Consequently, "missing essentials" includes false positives: `house`, `room`, `kitchen`, `bedroom`, `bathroom`, `door`, `window`, `table`, `chair`, `bed`, `toilet`, `clock` all exist in English nested home files. Truly absent English essentials include `garden`, `apartment` and `key`.
- The parity report has no section for `de`, `es`, `pt`, `br`, `cv`, `hy`, `ka`, `ba` or `tt`; 9 of 14 languages are outside the parity target.
- Real parity violations that remain: FR A0 1,072 vs 474 and A1 635 vs 1,195; IT `it:digitare:verb` domain `professional` at A0-A1 and `it:scrivania:noun` level mismatch; RU `ru:dolzhenstvovat:verb` at A2; EL `el:pliktrologio:verb` domain `professional` and `el:grafeio:noun` level mismatch; 10 EL duplicate word+form+sense groups; 4 FR, 4 RU; missing FR contractions `au`, `aux`, `du`, `des`.
- `reports/a0_a1_parity.md` was regenerated after P2 and now reflects the nested files; the five-language target limitation remains. P18 fixed the five English furniture entries that were missing a domain, so the EN structural-violation count is now 0.

## Documentation findings

- `README.md` says `transcription` is "required for non-contractions" and `emoji` is "required unless `no_emoji: true`"; data has 5,779 missing transcriptions and 3,287 entries with neither emoji nor `no_emoji`.
- P19 corrected README's `concept` description: the data has 80 dotted English keys and 2,664 non-English `en:` IDs, with no self-references.
- README previously documented a flat `a0_a1/` layout and omitted `a0/`, `a1/` and nested `home/furniture/`; P7 now documents them.
- README/`schemas/themes.json` describe 46 themes as canonical; `shared/themes.json` has 55 and 369 pairs (9 extra themes and 133 extra sub-themes). README now states both counts; the two files remain separate sources.
- Previous `AUDIT.md` said CI currently fails with 78 retired IDs and that `KNOWN_FORMS` lacks `idiom`/`phrasal_verb`; both are false on this revision.
- `top10-verbs.html` is titled "Top 10 Verbs … Part 1, Part 2 & Part 3", but `shared/top10-verbs.json` has **40 verbs**, with part counts 12/11/17. P7 retitled the page and link to "Core Verbs" and removed the stale "Top 10" claim; the filename keeps its historical name.
- `reports/multi-theme-audit.md` describes 13,615 English entries; the current English total is 12,811.

## What is actually healthy

- All vocabulary JSON files parse; no empty required fields (`id`, `word`, `language`, `form`).
- There are **no duplicate IDs** in the vocabulary data; all index mappings resolve.
- `npm run build` is deterministic and made no changes to committed indexes.
- Schema themes are all covered by shared themes; used themes are all valid; no wrong-script definitions/examples in non-Latin languages.
- `functional-phrases/` (79 files, 714 IDs) has no empty files, duplicate IDs or parse errors.
- `inventory/multilingual-verb-inventory.json` validates: 53 concepts, 55 senses, 772 translations, 14 languages.
- No `<script>`, `onerror=`, `javascript:` or `<iframe>` payloads were found in vocabulary data.
- Conjugation index has 560 tables; top10 verbs has 40 verbs x 14 languages with no missing language payloads.

## Recommended remediation

### P0 - stop the false sense of quality
1. **Tighten the schema or add a second quality schema:**
   - `form` enum matching the forms actually supported;
   - `id` pattern `^[a-z]{2}:[a-z0-9]+(?:-[a-z0-9]+)*:(form)$`;
   - require `definitions` (minItems 1) and `examples` (minItems 1), or add explicit `no_definition`/`no_example` flags;
   - constrain `transcription` to a documented IPA format or `no_transcription`;
   - constrain `emoji` to a Unicode emoji/symbol allowlist;
   - add cross-field rules: exactly one of `emoji`/`no_emoji`, exactly one of `antonyms`/`no_antonym`.
2. **Make `npm run validate` call the same checks as CI and fail on quality**, not only IDs/themes. Add a generated quality report with per-language/per-level counts.
3. **Done in P1: deleted the 688 empty scaffold files.** The removal is listed in `reports/empty-vocabulary-files-pruned.md`; no indexes or generated artifacts changed.
4. **Choose one level layout** (`a0_a1` or `a0`+`a1`) and one home layout (flat theme file or nested `home/`); migrate consistently and make parity/build/validator walk recursively.

### P1 - data correction, by cluster
5. **Deduplicate the remaining 247 same-word/same-form entries.** Keep the richest entry, merge definitions/examples/forms, add `"old": "new"` aliases to `shared/id-aliases.json`, and update every `regional_equivalents`, `synonyms`, `related_forms`, `concept`, index and consumer reference. The 122 `-a2` IDs were completed in P22.
6. **ID contract:** all 205 malformed IDs are now repaired and aliased. Keep the alias map fresh and review whether the French `avoir …` phrases belong in `common_nouns.json`.
7. **Fix the English POS batch:** re-derive `form` from a dictionary POS, not from the file/theme; correct 169 entries and re-review the files listed in Q4.
8. **Examples are complete.** All 31,498 entries now have at least one definition and one example; P62 finished Russian and removed one duplicate idiom.
9. **Rebuild pronunciation data:** remove `-` and pseudo-IPA; use real IPA from authoritative sources or omit `transcription`; standardize on one delimiter and remove the UI's extra `/ … /` wrapper. P6 decoded all double-escaped values; P21 fixed six French phrase IPA values that used `_` as a separator and recorded the remaining 126 phrase pseudo-transcriptions in `reports/needs-review/p21-fr-phrase-ipa.md`.
10. **Spanish `:other` batch:** fixed in P9; review the remaining `:phrase` homographs for redundancy.
11. **Fill the level gaps or stop advertising them:** either add A2/B1/B2/C1 for de/es/pt/cv and A2/B1 for hy/ka/ba/tt/br, or mark those levels unsupported; re-level FR A0/A1 and de/es/pt C2 entries.
12. **Parity recursion is fixed in P2 for the five target languages.** Extending parity to all 14 languages still needs essentials columns and targets for the other nine; the report now distinguishes the rechecked five-language result from that unstarted expansion.

### P2 - references, taxonomy, security, hygiene
13. Resolve the 23 `translation_of` references, the 1 dangling `related_forms`, and the 199 dotted `concept` values; decide whether `concept` is an `en:` ID or a dotted key and enforce one.
14. Collapse the taxonomy sources: one machine-readable file, one human document; delete/mark deprecated `taxonomy/themes.json`, `docs/unified-taxonomy-draft/cefr_taxonomy.json`, unused 9 themes and 136 sub-themes, and `_canonical` empty indexes.
15. Keep escaping every field inserted into `innerHTML` (P13 did this) and add a CSP meta tag and SRI for third-party scripts. P20 pinned GitHub Actions to commit SHAs; P14 switched CI to `npm ci`.
16. `test:conjugation` now runs in CI with Playwright; keep the browser install step in sync with the package version.
17. Update README/`AUDIT.md` claims that still describe the old layout (transcription/emoji requirements, concept format, theme counts, top10 verb count, level layout); the stray file and archive duplicates are removed.
18. **Partially done (P36):** `test:integrity` now locks the zero-defect classes: ID/form consistency, duplicate word/form/sense, template examples, definition-equals-word, invalid/native/placeholder transcriptions, real-person aliases, and the quality baseline. Still to add: theme-catalog checks, reference resolution including `COSYtools:`, and resolver failure classification.

## Bottom line

The repository has a solid mechanical backbone: JSON parses, IDs are unique, indexes rebuild deterministically, schema themes resolve, and the resolver handles aliases and cycles. But the **content layer is not trustworthy yet**. The most damaging pattern is that placeholder and duplicate entries are structurally valid, so the current validators certify them. Fixing the schema quality rules and the level/deduplication clusters should come before adding more vocabulary; otherwise more content will simply amplify the same defects.
