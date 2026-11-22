# Taxonomy Level Minimum Adjustments (CHANGES.md)

## Confusion pair taxonomies

`taxonomy/vocab-confusion-pairs.json`, `taxonomy/grammar-confusion-pairs.json`
and `taxonomy/french-grammar-confusion-pairs.json` preserve the confusion-pair
indexes that previously lived in COSYpractice. They contain metadata only
(`id`, `label`, `group`, `level`, `termA`, `termB`, optional `terms`); practice
questions are not duplicated here. The vocabulary taxonomy is the canonical
273-pair index used by COSYpractice; the grammar files combine the curated
COSYpractice pair banks with the pair topics that only existed in the removed
generated drill files.

Each vocabulary pair carries `covered: true` when both `termA` and `termB`
exist in `vocabulary/en/flat-index.json`, and `covered: false` otherwise.
COSYpractice shows only covered pairs in its picker, so a pair never opens an
empty session. Regenerate the flag after vocabulary changes with
`npm run build:pair-coverage`; `npm run validate` checks it stays in sync.

The 39 missing English terms that kept 35 pairs uncovered were added in
`vocabulary/en/{a1,a2,b1,b2,c1,c2}/confusion_pairs.json`, so all 273
vocabulary pairs are now `covered: true`. The new entries follow the normal
vocabulary schema (definitions, examples, IPA, theme and level) and are
included in the rebuilt `index.json`, `flat-index.json`, `search-index.json`
and `themes-index.json`.

The English grammar taxonomy originally carried 27 French pair IDs copied from
the French bank. Those entries were removed, leaving 79 English entries.
`scripts/validate-confusion-pairs.cjs` now checks each file's `language` and
rejects any ID shared between the English and French grammar files, so the
same mix cannot return.

This document records all modifications made to `level_min` values in `taxonomy/themes.json` compared to the initial draft in `docs/unified-taxonomy-draft/cefr_taxonomy.json`. These shifts align the unified taxonomy with actual CEFR A0–A1 vocabulary dataset content implemented in COSYdata.

## Level Minimum Shifts

1. **`V07.02` Clothes & accessories**
   - **Draft `level_min`:** `A1`
   - **Data-aligned `level_min`:** `A1`
   - **Reason:** Basic apparel terms (e.g. shirt, shoes, hat) are actively present across COSYdata A0–A1 vocabulary datasets (`vocabulary/<lang>/a0_a1/clothes.json`).

2. **`V11.01` Weather & seasons**
   - **Draft `level_min`:** `A1`
   - **Data-aligned `level_min`:** `A1`
   - **Reason:** Essential weather terms (e.g. sun, rain, hot, cold) and seasons are present in COSYdata A0–A1 vocabulary datasets (`vocabulary/<lang>/a0_a1/weather.json`).

3. **`V11.02` Animals & plants**
   - **Draft `level_min`:** `A2`
   - **Shifted `level_min`:** `A1`
   - **Reason:** Core domestic animals, common pets, and basic nature terms (e.g. dog, cat, bird, horse) are foundational vocabulary included across all COSYdata A0–A1 datasets (`vocabulary/<lang>/a0_a1/animals.json`).

4. **`V14.01` Body parts**
   - **Draft `level_min`:** `A1`
   - **Data-aligned `level_min`:** `A1`
   - **Reason:** Basic anatomy terms (e.g. head, hand, eye, leg) are present in COSYdata A0–A1 vocabulary datasets (`vocabulary/<lang>/a0_a1/body_health.json`).
