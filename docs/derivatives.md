# Derivatives (word families)

`derivatives` records the other parts of speech that belong to an entry's word
family: the noun, verb, adjective and adverb forms a learner meets together.

```json
"derivatives": [
  { "term": "happiness", "form": "noun" },
  { "term": "happily", "form": "adverb" },
  { "term": "unhappy", "form": "adjective", "meaning_shift": "not happy" }
]
```

- `term` is the surface form in the entry's own language, or a vocabulary entry
  ID (`en:happiness:noun`) when the derivative already has its own entry.
- `form` is the part of speech of the derived term.
- `meaning_shift` is optional and only needed when the derived word is not a
  transparent counterpart of the headword.

## How it differs from `derivations`

`derivations` predates this field and records **verb-to-verb** relations:
prefixation (`overpay`, `rifare`, `перестроить`) and aspect pairs. It answers
"which verbs are built from this verb?". `derivatives` answers "which noun,
adjective, adverb or verb belongs to this word's family?". Both may appear on
the same entry. Do not move or rewrite existing `derivations` values.

## Editorial rules

- Add only forms you can support with a dictionary or grammar. If a form is
  doubtful, leave it out and note it in `reports/needs-review/`.
- The term must be a real word in the entry's language, not a description
  (`using a noun`, `adjectival form`).
- Do not repeat the headword, and do not list the same `form` + `term` twice.
- Keep the headword's own `form` out of `derivatives` unless the derived word is
  a genuinely different lexeme (for example a diminutive or an agent noun).
- Only single-word lemmas are annotated in the first pass; multi-word entries
  and idioms are out of scope until a later task.

## Scope

B1, B2, C1 and C2 entries whose `form` is `noun`, `verb`, `adjective` or
`adverb` and whose headword is a single word. The field is optional, so entries
with no confident family simply have no `derivatives`.

B1 (2026-11-28): 1,666 of 2,436 eligible entries annotated, 3,277 links. The
entries without a field are concrete nouns with no derivational family
(`tsunami`, `comet`, `pizza`, `sushi`) or entries where no form could be
supported confidently. English B1 gained 209 entries from a WordNet pass;
French, Russian and Greek B1 remain partly annotated because the imported B1
sets contain many concrete nouns.

B2 (2026-11-28):

| Language | Annotated | Eligible | Links |
| --- | ---: | ---: | ---: |
| English | 690 | 1,141 | 1,260 |
| French | 91 | 100 | 155 |
| Italian | 41 | 44 | 78 |
| Russian | 83 | 89 | 157 |
| Greek | 58 | 60 | 108 |
| **Total** | **963** | **1,434** | **1,758** |

The four non-English B2 sets are above 90% coverage; the remaining entries are
loanwords (`riad`) or words with no defensible family (`ciononostante`).
English B2 links were proposed from WordNet's derivationally related forms and
then filtered: the candidate must share a stem of at least five letters with the
headword, be a single word, and pass a manual review that removed semantic
near-synonyms (`dismissal` → `fire`) and rare variants. Adverbs were added only
when WordNet contains the adverb. The 451 English B2 entries without a field
need a later manual pass.

C1 (2026-11-28):

| Language | Annotated | Eligible | Links |
| --- | ---: | ---: | ---: |
| English | 549 | 961 | 843 |
| French | 16 | 23 | 33 |
| Italian | 17 | 23 | 38 |
| Russian | 12 | 23 | 28 |
| Greek | 15 | 17 | 33 |
| **Total** | **609** | **1,047** | **975** |

English C1 used the B2 WordNet method with a stricter prefix test: the candidate
must start with the first five letters of the headword, belong to a synset with
the entry's own part of speech, and not be a synonym in the same synset. This
removes pairs such as `desirable` → `suitableness`. The 412 English C1 entries
without a field are mostly concrete nouns, loanwords, or words whose only
WordNet relatives failed the prefix test. The four non-English C1 sets were
curated by hand from standard morphology; doubtful forms were left out and are
listed in `reports/needs-review/`.

C2 (2026-11-28):

| Language | Annotated | Eligible | Links |
| --- | ---: | ---: | ---: |
| English | 459 | 618 | 674 |
| French | 64 | 124 | 113 |
| Italian | 79 | 121 | 148 |
| Russian | 82 | 120 | 158 |
| Greek | 77 | 122 | 141 |
| **Total** | **761** | **1,105** | **1,234** |

English C2 used the same WordNet filter as C1 for 365 entries, then a curated
pass added 94 Latin, Greek and verb families (118 links) that WordNet does not
connect. The four non-English C2 sets now carry 302 noun links, 95 adjective
links and 163 adverb links. Adjectives are mostly past participles used
adjectivally; adverbs were added only where the form is lexical and common.
Less transparent families, and the remaining English C2 entries without a
defensible single-word relative, remain for a later pass.

Polysemous entries carry one `derivatives` list per sense, because each sense has
its own family (`issue` as a topic has no `issuer`; `issue` as a release does).
See `docs/polysemy.md`.

## Checking

`npm run validate` enforces the shape and the obvious invariants: non-empty
term, a valid part of speech, no self-reference, no duplicate term and native
script where the language requires it. `npm run test:derivatives` adds the
data-specific checks.
