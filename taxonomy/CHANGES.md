# Taxonomy Level Minimum Adjustments (CHANGES.md)

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
