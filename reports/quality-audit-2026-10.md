# COSYdata Quality Audit — Initial Findings (2026-10)

## Status and scope

This is the first triage pass, not a claim that every entry has been linguistically reviewed. The audit starts from the current `main` tree (commit `b8ffff83ce3ea8ea3ca58feb9b6b74c3eec3440f`) and separates automated structural checks from language-expert review.

Repository inventory from the recursive Git tree:
- 2,124 tracked files.
- 14 language directories: `ba br cv de el en es fr hy it ka pt ru tt`.
- 1,736 JSON files under `vocabulary/` (this count includes generated indexes and other generated JSON, not just source-entry files).
- Vocabulary coverage is uneven: English, French, Italian, Greek, and Russian have many level directories populated; several other languages currently have mostly A0/A1 plus a single A2 file. This is a coverage/parity question, not automatically a quality defect.

## High-confidence findings from the initial sample

The examples below were inspected directly in the current source files. These are examples to fix or review; they are not prevalence estimates for the entire corpus.

| Priority | Entry / file | Finding | Proposed action |
| --- | --- | --- | --- |
| P1 | `en:tree:noun`, `vocabulary/en/a0_a1/animals.json` | The definition “a tall plant with wooden trunk” is ungrammatical/incomplete: the count noun `trunk` needs a determiner in this construction. The entry is also stored in an animals file despite `theme: nature`. | Rewrite as “a tall plant with a wooden trunk” (or an equally natural definition); move/reclassify the entry only after checking file organization and generated indexes. |
| P1 | `en:cat:noun`, `vocabulary/en/a0_a1/animals.json` | Example “The cat sleeps on warm sofa.” is missing a determiner before the singular count noun `sofa`. | Change to “The cat sleeps on a warm sofa.” or “The cat sleeps on the warm sofa.” depending on intended meaning. |
| P1 | `en:world:noun`, `vocabulary/en/a0_a1/animals.json` | The entry is in an animals file and tagged `theme: animals`, but “world” is not an animal concept. | Reclassify to an appropriate geography/general theme and move it to the matching source file if that is the repository convention. |
| P2 | `en:same:adjective`, `vocabulary/en/a0_a1/adjectives.json` | `comparative: more same` and `superlative: most same` are not normal learner-dictionary forms for this adjective. | Remove these fields unless a specific, clearly explained marked usage is intended. |
| P2 | `en:wrong:adjective`, `vocabulary/en/a0_a1/adjectives.json` | `more wrong / most wrong` can occur in context, but presenting them as routine comparative/superlative forms is questionable for beginner material. | Review against the project’s morphology policy; omit the fields if they are not useful default forms. |
| P2 | `fr:beau:adjective`, `vocabulary/fr/a0_a1/adjectives.json` | The original example was understandable but less idiomatic for this meaning. | Updated on the audit branch to “Il y a un beau soleil ce matin.”; still recommend a French-language reviewer confirm naturalness. |

## CEFR adaptation is a core quality requirement

Definitions and examples must be adapted to the learner's CEFR level, not merely attached to an entry that carries a level label. This applies in every language and at every level.

- **Definitions:** use vocabulary, syntax, and explanation length appropriate to the target level; define the intended sense precisely; avoid circular definitions and unexplained advanced words. Prefer a short, direct definition at A0/A1; allow more nuance and terminology at higher levels when useful.
- **Examples:** use natural, grammatically correct sentences that demonstrate the target meaning; keep sentence length, clause complexity, idioms, and surrounding vocabulary appropriate to the entry's intended level. A sentence can be grammatical but still be unsuitable for beginners.
- **Level alignment:** evaluate the whole definition and example, not just the headword. Flag examples that rely on vocabulary or grammar substantially above the target level unless that complexity is intentional and pedagogically justified.
- **Progression:** avoid treating CEFR as a rigid word-frequency list. Judge suitability in context, allowing common functional chunks and necessary irregular forms at early levels; higher levels should add precision, register, idiomaticity, and nuanced senses rather than simply longer sentences.
- **Consistency:** use a documented editorial rubric across languages, while allowing language-specific grammar and natural phrasing. Do not mechanically translate the same definition or example across languages.
- **Review output:** for each flagged item, record the entry ID, field (`definitions` or `examples`), assigned level, specific difficulty (lexical / grammatical / syntactic / pragmatic), reason, and a proposed level-appropriate rewrite.

**Suggested review rubric**
- **A0/A1:** concrete, familiar vocabulary; short simple sentences; one main idea; minimal subordinate clauses; no unnecessary idioms; clear demonstration of the headword.
- **A2:** everyday contexts with modest detail and some coordination or common subordinate structures.
- **B1/B2:** broader contexts, connected discourse, more varied sentence structures, and idiomatic language where relevant.
- **C1/C2:** nuanced meanings, register, collocation, and complex syntax where these help explain advanced usage—not complexity for its own sake.

These are editorial heuristics, not a substitute for the project's language-specific CEFR policy or expert review. CEFR labels should be checked against the repository's current policy and applied consistently.

## Important systemic risks to verify

1. **Grammar and morphology:** articles/countability, noun plurals, adjective agreement and comparison, verb forms, preposition patterns, and language-specific exceptions.
2. **Lexical correctness:** headword/part-of-speech mismatch, wrong sense, inaccurate or over-broad definitions, false friends, and regional labels.
3. **Definitions and examples:** grammaticality, lexical accuracy, idiomaticity, correct use of the target headword, and CEFR adaptation of vocabulary, syntax, sentence length, and conceptual complexity.
4. **Taxonomy and file placement:** theme/sub-theme validity, topical mismatch, duplicate or inconsistent categorization, and generated-index consistency after any move.
5. **Pronunciation:** IPA accuracy and dialect labeling. A transcription identical to spelling is a warning signal, not proof of error; some scripts and languages need different treatment.
6. **Cross-language parity and coverage:** compare coverage carefully without forcing word-for-word equivalence across languages.
7. **Structural integrity:** JSON/schema validity, duplicate IDs, dangling references, stale indexes, and consistency of aliases after any ID changes.

## Existing automated checks and reports

The repository provides `npm run validate`, `npm run build`, `npm run audit`, and `npm run parity`. Existing reports include `reports/audit-a0-a1.md`, `reports/content-audit.md`, `reports/a0_a1_parity.md`, and topic-specific audits. They should be treated as evidence to reconcile with the current source tree, not as proof that every flagged item is still present or that every unflagged item is correct.

The A0/A1 audit script checks several useful patterns (IDs, duplicate word/forms, cross-level overlap, transcription equality, missing grammar fields, themes, and regional-equivalent links). Its heuristics need manual review: a warning is not automatically an error, and the current report should be regenerated before using its counts as a current baseline.

## Recommended execution order

1. Run build and schema validation against the current checkout and capture the exact results.
2. Regenerate current automated audit reports; compare them with the committed reports.
3. Produce a machine-readable list of structural and heuristic findings with file path, entry ID, field, severity, and rationale.
4. Review source entries in manageable batches, beginning with English A0/A1, then other languages/levels; use authoritative language-specific references for uncertain grammar, IPA, and usage.
5. Keep suggested changes separate from accepted corrections; do not rename IDs or move entries without checking references and rebuilding indexes.
6. Apply accepted corrections in small, reviewable changes, update the `updated` field only on changed entries, and rerun all required checks.

## Follow-up findings from the English A0/A1 correction pass

A focused review of `vocabulary/en/a0_a1/food_drink.json` identified additional entries where the definition/example was awkward, too technical for A0/A1, or inconsistent with the part-of-speech label. A subset of definition and example wording was simplified on the separate draft correction branch `jules/en-a0-a1-cefr-language-fixes-2026-10` (PR #210). Examples include:

| Entry | Issue observed | Follow-up |
| --- | --- | --- |
| `en:yogurt:noun` | Original definition used technical wording (“semi-solid”, “fermented by bacteria”) for A1. | Simplified to “a soft food made from milk.” |
| `en:sparkling-water:noun` / `en:still-water:noun` | Original definitions used unnecessarily technical language for A1. | Reworded in terms of bubbles. |
| `en:to-go:phrase`, `en:no-meat:phrase`, `en:no-sugar:phrase` | Definitions were formal or unnatural for common restaurant requests. | Rewritten as simple functional phrases with short examples. |
| `en:restaurant:noun`, `en:hamburger:noun`, `en:tomato:noun`, `en:bill:noun` | Definitions were vague, unnatural, or misleadingly phrased. | Wording clarified on the correction branch. |
| `en:eat:noun` | The example “Let us go out for an eat” is not idiomatic English and the noun label is suspicious for the headword. | Example improved to “Let's get something to eat.”; part-of-speech / ID issue remains flagged for a reference-aware decision. |
| `en:drank:noun`, `en:eaten:noun`, `en:salty:noun`, `en:sour:noun` | The stored `form` and ID suffix say noun, but the headwords and usage are verb forms or adjectives. | Not renamed or reclassified in this batch because IDs may be referenced by indexes or other data. Requires a repository-wide reference check and coordinated index rebuild. |

The correction branch also rewrites selected animal definitions and everyday verb examples for clarity and beginner-level suitability. The food-and-drink pass now clarifies definitions for verb forms and adjectives, plus entries such as rice, fruit, vegetables, pepper, and cream. The French example above has also been revised on this audit branch. These edits are proposals under review, not merged changes.

The category mismatch for `en:drank:noun`, `en:eaten:noun`, `en:salty:noun`, and `en:sour:noun` is still unresolved. Definitions now describe the actual grammatical form more clearly, but changing `form` or ID suffixes safely requires a repository-wide reference check and index rebuild. This is a structural follow-up, not a wording-only fix.

## Validation status and limitations

At the time of this follow-up, GitHub Actions passed the vocabulary-file/reference validation and the freshness checks for the correction branch's preceding revision. A subsequent focused food-and-drink edit was committed after that run; its own workflow must finish before it can be described as validated. These automated checks establish structural/index consistency, not linguistic correctness.

The source files have not all been downloaded and validated locally in this pass. The findings remain a small, directly inspected sample, not a complete linguistic audit of all 14 language directories. The cross-language findings (including the French example above) still need review by proficient speakers. Keep ID changes and file moves separate until references and generated indexes have been checked.
