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
2. **688 of the original 1,850 vocabulary JSON files were empty (37%).** P1 pruned them; 1,162 data files remain, with 0 empty files.
3. **1,279 entries have no definition and 1,803 have no example.** Another 710 examples are template sentences and 273 "definitions" are just the headword.
4. **475 entries share the same word and the same form with another entry; 439 share word, form and sense.** This includes 122 explicit `-a2` duplicates. P9 removed the four Spanish country/city duplicates.
5. **205 IDs violated their own `lang:slug:form` contract** (145 French, 56 Spanish, 4 Italian), but passed the schema; 76 failed the stricter quality ID pattern outright. P8 repaired 19 French IDs, P9 repaired all 56 Spanish IDs, and P10 renamed 126 French `avoir …` IDs; 4 remain (all Italian), with 1 strict failure.
6. **Pronunciation data is heavily corrupted or non-IPA:** 1,997 transcriptions are the slug in slashes, at least 1,054 use native-script spelling instead of IPA, 281 are `-`, and 5,778 are missing.
7. **The parity tool ignored nested `home/` directories**, undercounting major languages and producing false "missing essentials" such as English `house`, `room` and `kitchen`. P2 fixed the recursive loader; parity still covers only its five target languages.
8. **Tests and CI do not fully protect the data.** `playwright` is still undeclared, so `test:conjugation` fails; P5 added CI runs for `audit`, `parity`, and `test:verb-inventory`, but the full `npm run validate` chain and conjugation test remain outside CI.

## Verification results

| Command | Result |
|---|---|
| `npm run validate` | Passes with no empty-file warnings. It now also runs the quality regression gate; existing debt is accepted in the baseline. |
| `npm run quality` | Passes against the baseline: 32,493 entries, 13,378 recorded findings, 0 new. |
| `npm run build` | Passes; rebuilding all indexes/daily/comparative artifacts produced **no git diff**. Indexes are in sync. |
| `npm run audit` | Passes; writes `reports/audit-a0-a1.md`, but does not fail on the defects below. |
| `npm run parity` | Passes after P2; now includes nested `a0_a1/home/**` entries but still covers only its five target languages. |
| `npm run test:verb-inventory` | Passes: 53 concepts, 55 senses, 772 translations, 14 languages. |
| `npm run test:conjugation` | **Fails:** `ERR_MODULE_NOT_FOUND: Cannot find package 'playwright'`. `playwright` is absent from `package.json` and `package-lock.json`. |

## Structural findings

### S1 - Empty scaffold files (Critical)
- **688 empty JSON arrays out of the original 1,850 vocabulary data files (37.2%) were removed in P1.** 1,162 data files remain; 0 are empty. See `reports/empty-vocabulary-files-pruned.md`.
- Worst: `ru/b1` 46, `el/b1` 46, `it/b2` 45, `ru/b2` 45, `el/b2` 45, `fr/c1` 43, `it/c1` 43, `ru/c1` 43, `el/c1` 43, `fr/b2` 41, `fr/b1` 36, `el/a2` 31.
- Empty by theme name: `phrasal_verbs` 18, `idioms` 17, `linking_words` 17, `teachers_scientists` 16, `academic_english` 16, `media` 16, `it_specialists` 16, `register` 16, `ethics`/`emotions`/`politics`/`society` 15 each.
- The validator only warns. Empty files look like supported themes/levels to consumers and make coverage reports misleading.

### S2 - Level directories and level coverage are inconsistent (Critical)
- `de`, `es` and `pt` have no `a0` and no `b2` directory. `cv` has only `a0_a1`, `a1` and `c2`.
- `en`, `fr`, `it`, `ru` and `el` have three overlapping beginner schemes: `a0/`, `a0_a1/`, `a1/`.
- Nested `home/furniture/**` directories exist across all 14 languages, in addition to flat theme files. They are valid data but outside the documented flat layout and outside the parity scan.
- Entries by level (including nested):

| Lang | A0 | A1 | A2 | B1 | B2 | C1 | C2 | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| en | 478 | 1,264 | 3,080 | 2,706 | 2,286 | 1,826 | 1,171 | 12,811 |
| fr | 1,072 | 635 | 1,001 | 279 | 212 | 189 | 301 | 3,689 |
| it | 275 | 1,006 | 1,009 | 761 | 226 | 188 | 296 | 3,761 |
| de | 40 | 592 | 17 | 11 | 0 | 0 | 133 | 793 |
| ru | 213 | 570 | 1,314 | 268 | 230 | 186 | 290 | 3,071 |
| el | 155 | 824 | 317 | 113 | 72 | 27 | 141 | 1,649 |
| es | 35 | 592 | 33 | 11 | 0 | 0 | 132 | 803 |
| pt | 36 | 584 | 18 | 3 | 0 | 0 | 131 | 772 |
| br | 29 | 523 | 17 | 11 | 140 | 89 | 125 | 934 |
| cv | 28 | 572 | 0 | 0 | 0 | 0 | 3 | 603 |
| hy | 29 | 500 | 17 | 11 | 125 | 88 | 128 | 898 |
| ka | 28 | 517 | 17 | 11 | 130 | 88 | 126 | 917 |
| ba | 33 | 498 | 17 | 11 | 127 | 88 | 134 | 908 |
| tt | 31 | 495 | 17 | 11 | 123 | 88 | 134 | 899 |

- **German/Spanish/Portuguese C2-only blocks:** `de` has 133 C2 entries and zero B2/C1; `es` 132; `pt` 131. The C2 files look like real philosophical vocabulary but are `status: needs_review`; the level jump is not credible and needs review.
- **Chuvash C2** has only 3 entries (`noun.json`, `verb.json`, `adjective.json`), none with examples.
- **French A0/A1 imbalance:** 1,072 A0 vs 635 A1, while the parity target is 474 A0 / 1,195 A1. This looks like mass A0 labeling, not progression.

### S3 - Stray, dead and duplicate artefacts (Low/Medium)
- One-byte stray file `docs/unified-taxonomy-draft/123`.
- `vocabulary/_canonical/` is an unconsumed second English source: `A0-A1_master.json` has 1,262 words with a different ID scheme (`en_preposition_about`) and definitions such as `"Basic A1 English preposition: 'about'."`; `flat-index.json` is `{}` and `search-index.json` is `[]`. It is not built or validated.
- `reports/archive/` is 4.4 MB of 61 exact duplicate files; e.g. `reports/content-audit.md` and `reports/archive/content-audit.md` have identical MD5. `reports/` totals 145 files / 11 MB.
- Pre-existing reports already flag unresolved data: `reports/idiom-duplicates.json` has 786 duplicate idiom groups, `reports/placeholder_merged_entries.json` has 866 entries, and `reports/home-audit.json` (2026-10-11) lists 89 non-home entries in home files, 11 home entries outside home, 4 duplicates, 4 level discrepancies and 20 missing home words.

## Vocabulary quality findings

### Q1 - Missing definitions and examples (Critical)
- **1,278 entries have no `definitions`:** it 381, fr 341, el 256, ru 232, de 11, hy/ka/tt/ba/br 11 each, pt 3.
- **1,803 entries have no `examples`:** fr 438, it 392, el 314, ru 268, tt/ba 70, hy/ka 69, br 68, es 27, de 11, pt 4, cv 3.
- All 1,279 entries missing definitions also lack examples; 524 additional entries have definitions but no examples.
- Cause: the JSON Schema requires only `id`, `word`, `language` and `form`; `definitions` is only constrained to `minItems: 1` **if present**. The "placeholder definitions" check cannot see an absent field.

### Q2 - Placeholder, template and tautological content (High)
- **710 examples are template sentences:** fr 177 (`Il utilise l'expression "…" dans sa conversation.`), it 210 (`Usa l'espressione "…" nella sua conversazione.`), ru 323 (`Он использует выражение "…" в своем разговоре.` and `Мы знаем известное выражение …`).
- **273 definitions are just the headword** (case-insensitive): ru 119, el 60, es 27, fr 26, it 25, cv 11, tt 3, ba 2. Examples: `ru:deshevyi:adjective` definition `"дешевый"`; `el:dorean:adjective` definition `"δωρεάν"`; `fr:lyon:noun` definition `"Lyon"`.
- **133 entries have at least two of these defects** (definition = word, template example, pseudo-IPA): ru 75, it 28, fr 17, el 13.
- **110 entries use "used to …" style definitions** (`en:maybe`, `en:no`, `en:not`, `en:remote-control`, `en:email-address`, `en:phone-number`, `en:credit-card`): usage notes, not definitions.

### Q3 - Duplicate words and forms (Critical)
- **475 entries share the same `(language, word, form)` with another entry**, in 237 groups; **439 entries in 219 groups also share the same `sense`** (the stricter duplicate signal used by the quality gate). By language: it 160, fr 124, ru 75, en 60, el 34, es 0, pt 8, ka 8, tt 2, ba 2, br 2.
- **122 `-a2` duplicate IDs** exist (fr 31, it 67, ru 24); every one has a base entry for the same word. 42 are definition = word, 35 use template examples, 45 are otherwise real duplicate content. Examples: `fr:oiseau:noun` vs `fr:oiseau-a2:noun`; `it:cavallo:noun` vs `it:cavallo-a2:noun`; `ru:lev:noun` vs `ru:lev-a2:noun`.
- **Theme-suffixed duplicates:** `en:data-breach:noun` vs `en:data-breach-technology:noun`; `en:consciousness:noun` vs `en:consciousness-philosophy:noun`; `fr:poisson:noun` vs `fr:poisson-aliment:noun`; `it:pesce:noun` vs `it:pesce-animale:noun`; `ru:ryba:noun` vs `ru:ryba-anim:noun`. These violate the rule to use `secondary_themes` instead of duplicate entries. Only 120 entries use `secondary_themes`.
- **Transliteration duplicates:** `el:sabbato:noun` vs `el:savvato:noun`; `el:ianouarios:noun` vs `el:ianoyarios:noun`; `ka:tkma:verb` vs `ka:thqma:verb`; `ba:yahau:verb` vs `ba:yasau:verb`.
- **371 IDs have numeric suffixes** (`-1`, `-2`, `-a2`). Some are legitimate (`en:catch-22:idiom`), but many are collision workarounds (`fr:soeur-1:noun`, `fr:oeil-1:noun`, `pt:alemanha-1:noun`, `br:bleiz-1:noun`).

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
- **4 ID/form mismatches:** it 4; fr 0, es 0.
  - The 126 French `avoir …` entries in `vocabulary/fr/a0_a1/common_nouns.json` had IDs ending `:idiom` while `form` was `phrase`; P10 renamed them to `:phrase` and added aliases.
  - **19 French sports entries** previously put IPA in the ID: `fr:dessiner:/de.si.ne/`, etc. P8 fixed all 19 (8 became unique verbs, 11 were duplicates of existing verbs).
  - The 56 Spanish `:other` entries were repaired in P9: four were merged into canonical nouns and 52 now use `:noun`.
  - **4 Italian entries:** `it:ma:phrase`/`it:e:phrase`/`it:o:phrase` have `form: conjunction`; `it:non-piacere:verb` has `form: phrase`.
- **1 ID has a non-ASCII slug:** `fr:fêter-un-anniversaire:phrase`. Most French IDs drop accents; this one does not.
- **Accent-stripping creates ambiguity:** `es:teleologa:noun` (word `teleología`) collides conceptually with `teleóloga` (a female teleologist); `es:ontologa:noun` has the same issue.
- Consequence: `resolveVocab("fr:avoir-faim:phrase")` now resolves directly; the retired `fr:avoir-faim:idiom` ID is also aliased. The remaining Italian conjunction IDs still need repair.

### Q6 - Pronunciation/transcription is unreliable (High)
- **5,778 entries have no `transcription`** (17.8%).
- **281 entries use `"-"`** as transcription.
- **1,997 entries have a transcription exactly `/<id-slug>/`**, e.g. `/hen/`, `/send/`, `/katze/`, `/gato/`, `/perro/`, `/rome/`, `/se/`. These are spellings/transliterations, not IPA (English `/hɛn/`, German `/ˈkatsə/`, Spanish `/ˈɡato/`).
- **1,054 transcriptions across Tatar 428, Russian 290, Bashkir 112, Chuvash 112 and Armenian 112 use native-script spelling**, e.g. `/эт/`, `/мәче/`, `/ноль/`, `/զրո/`, `[та́нец]`. These are not IPA.
- **74 transcriptions were double-escaped Unicode**, e.g. `\u02c8m\u0251\u02d0m\u0259` instead of `ˈmɑːmə`; 3 examples and 1 definition were also double-escaped (`l\u0027enseignement`). P6 decoded all 78 values. Affected: en 46, fr 8, it 8, ru 6, el 6.
- **1,246 transcriptions use brackets**, 869 have no delimiter, 281 are `-`, and 24,333 use slashes. Notation is inconsistent.
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
- **11 examples are one token or less:** 9 Chuvash place names (`"Шупашкар."`), `es:enfermo:adjective` (`"enfermo"`), and `es:util:adjective` (`"útil"`). The 28 Spanish `"país"` examples were fixed in P9.

## Reference, schema and taxonomy findings

### T1 - The schema does not enforce the quality contract (Critical)
`schemas/vocabulary.schema.json` requires only `id`, `word`, `language` and `form` (the P0 branch adds a `form` enum, but not the rest). A supplemental `schemas/vocabulary.quality.schema.json` and `scripts/quality-audit.cjs` now define and gate the target profile, but the remaining 13,378 existing violations are baselined rather than fixed. The core schema still allows:
- missing `definitions` and `examples`;
- any third token in `id` (the quality profile adds a strict pattern, but the core schema does not enforce it);
- any string for `transcription` (including `-`, native script and double-escaped Unicode);
- any string for `emoji` (including `<`, `>`, `%`, `=`), while the UI inserts it into HTML unescaped.
The validator's "placeholder definitions and examples" check only checks values that exist. This is why `npm run validate` succeeds while 1,279 entries have no definition.

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
- Existing tests: `tests/conjugation-embed.test.mjs`, `tests/quality-audit.test.mjs`, and `tests/parity-recursion.test.mjs`. The conjugation test imports `playwright`, which is **not declared** in `package.json` or `package-lock.json`; `npm run test:conjugation` fails before running any assertion.
- `validate-vocabulary.yml` runs schema/theme/taxonomy checks, quality tests, parity-loader tests, `npm run audit`, `npm run parity`, `npm run test:verb-inventory`, and index-freshness checks. It still **does not run** the full `npm run validate` chain or `npm run test:conjugation`.
- Workflows use `actions/checkout@v4` and `actions/setup-node@v4` tags, not commit SHAs. `npm install --no-save ajv@^8 ajv-formats@^2` uses floating ranges rather than the lockfile.
- `daily-calendar.yml` has `contents: write` and commits directly to `main` on a schedule; there is no test gate for generated daily content.

### C2 - Stored-XSS surface in the dictionary UI (Medium)
- `dictionary-ui.js` inserts `emoji` and `form` directly into `innerHTML` in several places: lines 1281, 1435, 1437, 1456, 1459, 1460. Some other fields are escaped, so sanitisation is inconsistent.
- `emoji` and `form` are unconstrained strings in the schema. A future entry with `emoji: "<img src=x onerror=…>"` or a malicious `form` would execute in any consumer that uses `dictionary-ui.js`. Current data contains no `<script>`/`onerror`/`javascript:` payloads. P3 replaced the two HTML-unsafe `<`/`>` values; 5 entries still use safe symbols (`%`, `=`).
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
- `reports/a0_a1_parity.md` was regenerated after P2 and now reflects the nested files; the five-language target limitation remains.

## Documentation findings

- `README.md` says `transcription` is "required for non-contractions" and `emoji` is "required unless `no_emoji: true`"; data has 5,779 missing transcriptions and 3,287 entries with neither emoji nor `no_emoji`.
- README describes `concept` as a dotted language-independent key and says all 48 English values are self-references; actual English values are 80 dotted keys and none are self-references. Non-English entries mostly use `en:` IDs instead.
- README previously documented a flat `a0_a1/` layout and omitted `a0/`, `a1/` and nested `home/furniture/`; P7 now documents them.
- README/`schemas/themes.json` describe 46 themes as canonical; `shared/themes.json` has 55 and 369 pairs (9 extra themes and 133 extra sub-themes). README now states both counts; the two files remain separate sources.
- Previous `AUDIT.md` said CI currently fails with 78 retired IDs and that `KNOWN_FORMS` lacks `idiom`/`phrasal_verb`; both are false on this revision.
- `top10-verbs.html` is titled "Top 10 Verbs … Part 1, Part 2 & Part 3", but `shared/top10-verbs.json` has **40 verbs**, with part counts 12/11/17. P7 retitled the page and link to "Core Verbs" and removed the stale "Top 10" claim; the filename keeps its historical name.
- `docs/unified-taxonomy-draft/123` is a 1-byte stray file with no purpose.
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
5. **Deduplicate the 475 same-word/same-form entries** and the 122 `-a2` entries. Keep the richest entry, merge definitions/examples/forms, add `"old": "new"` aliases to `shared/id-aliases.json`, and update every `regional_equivalents`, `synonyms`, `related_forms`, `concept`, index and consumer reference.
6. **Repair the remaining 4 malformed IDs** (all Italian). The 19 French IPA-in-ID entries, 56 Spanish `:other` entries, and 126 French `:idiom` -> `:phrase` entries are already fixed. Add aliases for every old ID and review whether the French `avoir …` phrases belong in `common_nouns.json`.
7. **Fix the English POS batch:** re-derive `form` from a dictionary POS, not from the file/theme; correct 169 entries and re-review the files listed in Q4.
8. **Remove or backfill the 1,279 no-definition and 1,803 no-example entries.** Delete template examples and def=word entries rather than keeping them as "content". For Russian/Greek adjective batches, regenerate real definitions and examples.
9. **Rebuild pronunciation data:** remove `-` and pseudo-IPA; use real IPA from authoritative sources or omit `transcription`; standardize on one delimiter and remove the UI's extra `/ … /` wrapper. P6 decoded all double-escaped values.
10. **Spanish `:other` batch:** fixed in P9; review the remaining `:phrase` homographs for redundancy.
11. **Fill the level gaps or stop advertising them:** either add A2/B1/B2/C1 for de/es/pt/cv and A2/B1 for hy/ka/ba/tt/br, or mark those levels unsupported; re-level FR A0/A1 and de/es/pt C2 entries.
12. **Parity recursion is fixed in P2 for the five target languages.** Extending parity to all 14 languages still needs essentials columns and targets for the other nine; the report now distinguishes the rechecked five-language result from that unstarted expansion.

### P2 - references, taxonomy, security, hygiene
13. Resolve the 23 `translation_of` references, the 1 dangling `related_forms`, and the 199 dotted `concept` values; decide whether `concept` is an `en:` ID or a dotted key and enforce one.
14. Collapse the taxonomy sources: one machine-readable file, one human document; delete/mark deprecated `taxonomy/themes.json`, `docs/unified-taxonomy-draft/cefr_taxonomy.json`, unused 9 themes and 136 sub-themes, and `_canonical` empty indexes.
15. Escape every field inserted into `innerHTML` (`emoji`, `form`, `level`), or build DOM nodes with `textContent`. Add a CSP meta tag and SRI for third-party scripts; pin GitHub Actions to commit SHAs; use `npm ci` in CI.
16. Add `playwright` to devDependencies and run `test:conjugation` in CI; also run `test:verb-inventory`, `audit`, `parity` and the full `validate` chain.
17. Remove `docs/unified-taxonomy-draft/123`, deduplicate `reports/archive/`, and update README/`AUDIT.md` claims (transcription/emoji requirements, concept format, theme counts, top10 verb count, level layout).
18. Add regression tests for: ID/form consistency, same-word/same-form uniqueness, required definitions/examples, transcription format, theme catalog usage, reference resolution (including `COSYtools:`), and resolver failure classification.

## Bottom line

The repository has a solid mechanical backbone: JSON parses, IDs are unique, indexes rebuild deterministically, schema themes resolve, and the resolver handles aliases and cycles. But the **content layer is not trustworthy yet**. The most damaging pattern is that placeholder and duplicate entries are structurally valid, so the current validators certify them. Fixing the schema quality rules and the level/deduplication clusters should come before adding more vocabulary; otherwise more content will simply amplify the same defects.
