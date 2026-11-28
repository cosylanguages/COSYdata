# Polysemy: one entry per meaning

A word with several meanings gets **one entry per meaning**, not one entry with a
list of unrelated senses. Each entry keeps the same `word` and `form`, has its
own `id`, `level`, `definitions`, `examples`, `synonyms`, `antonyms` and
`derivatives`, and carries a `sense` slug plus a short English `sense_label`.

```json
{
  "id": "en:bank-river:noun",
  "word": "bank",
  "form": "noun",
  "level": "B1",
  "sense": "river",
  "sense_label": "land beside a river",
  "definitions": ["The land along the side of a river."],
  "examples": ["We sat on the bank and watched the boats go by."]
}
```

## Why separate entries

- Each meaning can sit at its own CEFR level. `bank` as a financial institution
  is A1; `bank` as the land beside a river is B1. A shared entry cannot carry
  two levels honestly.
- Definitions, examples, synonyms, antonyms and word-family links always belong
  to one meaning. Mixing them is what makes learner dictionaries confusing.
- Ids stay stable and reviewable. `en:bank:noun` keeps the first sense;
  `en:bank-river:noun` is a new entry, and the id-alias file is untouched.

## Naming

- `sense` is a short lowercase slug: `river`, `sport`, `accusation`, `release`.
- `sense_label` is a short English gloss shown in the dictionary next to the
  headword, for example `bank · land beside a river`.
- The id uses the slug when the bare word is already taken:
  `en:bank:noun` → `en:bank-river:noun`. Do not rename the existing id.
- Two entries may share word and form only when they have different `sense`
  values or different `level` values. `npm run validate` checks the id rules;
  reviewers check the sense labels.

## CEFR rule

The `level` of the entry is the level of **that meaning**, established with the
same sources as any other entry (Oxford 3000/5000 sense-aware tags, EVP,
Cambridge, Larousse, Treccani, Babiniotis, Ozhegov and the language policy in
`docs/a0-a1-policy.md`). If a meaning is used at more than one level, list every
level in `levels` and keep `level` equal to the lowest one.

Definitions and examples must be understandable at the entry's own level. For a
B1 sense, use B1 words and short sentences; do not copy the C1 definition of the
same word from another dictionary.

## First pass

The first pass adds missing high-frequency second senses that learners meet
early: `bank` (river), `match` (game), `court` (sport), `spring` (water),
`case` (instance), `point` (idea), `state` (condition), `light` (not heavy),
`season` (add flavour), `charge` (accusation), `issue` (release), `matter`
(be important) and `right` (entitlement). Each new entry has its own level,
definition, examples and derivatives, so `season` the verb is B2 while
`season` the noun stays A1. It is a demonstration of the model, not a claim that
English polysemy is complete. Later tasks extend it by frequency and by level.
