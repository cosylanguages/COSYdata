# COSYdata Canonical Taxonomy Specification (`taxonomy/`)

This directory contains the canonical, single-source-of-truth unified CEFR taxonomy for the COSY ecosystem.

## Overview & Directory Structure

- `taxonomy/levels.json`: Definitions for CEFR proficiency levels (A0 through C2), human labels, canonical lowercase directory codes (`a0_a1`, `a2`, `b1`, `b2`, `c1`, `c2`), and alias mappings (`a0_a1` -> `["a0", "a1"]`).
- `taxonomy/tracks.json`: Definitions for core course tracks (`general`, `spoken`, `professional`, `travelling`, `relocation`, `exam`) and extra tracks (`cinema`, `karaoke`, `discussion`, `pronunciation`), including repository ownership, track aliases (`travel` -> `travelling`), and level availability rules.
- `taxonomy/themes.json`: Comprehensive domain taxonomy incorporating all CEFR classification axes:
  - **V**: Vocabulary themes
  - **LT**: Lexical types
  - **G**: Core grammar & optional language modules (G15–G20)
  - **S**: Speaking functions
  - **W**: Writing text types
  - **R**: Receptive skills (Listening & Reading)
  - **SIT**: Real-life situational scenarios
  - **C**: Culture & sociolinguistic themes
  - **M**: Mediation & learning strategies
- `taxonomy/languages.json`: Language profiles and feature matrices for all 14 repository languages (`en`, `fr`, `it`, `ru`, `el`, `de`, `pt`, `es`, `tt`, `ba`, `cv`, `br`, `hy`, `ka`).
- `taxonomy/crosswalk-themes.json`: Mapping table linking legacy 46 schema keys (`schemas/themes.json`) to taxonomy IDs with confidence ratings (`exact`, `partial`, `none`), alongside a report of active vocabulary themes unmapped to schema keys.
- `taxonomy/CHANGES.md`: Changelog documenting specific `level_min` adjustments made to align the unified taxonomy with COSYdata A0–A1 vocabulary content.

## Consumption via Raw GitHub URLs

External applications and consumer repositories (`COSYlanguages`, `COSYplatform`, `COSYtools`, `COSYgames`, `COSYmanuals`, `COSYevents`) consume these taxonomy definitions directly via GitHub Raw URLs:

```
https://raw.githubusercontent.com/COSYlanguages/COSYdata/main/taxonomy/levels.json
https://raw.githubusercontent.com/COSYlanguages/COSYdata/main/taxonomy/tracks.json
https://raw.githubusercontent.com/COSYlanguages/COSYdata/main/taxonomy/themes.json
https://raw.githubusercontent.com/COSYlanguages/COSYdata/main/taxonomy/languages.json
https://raw.githubusercontent.com/COSYlanguages/COSYdata/main/taxonomy/crosswalk-themes.json
```

## Proposing Changes & Governance

To propose additions, modifications, or reclassifications within the taxonomy:

1. **Submit a Pull Request**: Create a dedicated branch in `COSYdata` and update the relevant JSON files under `taxonomy/`.
2. **Schema Validation**: Ensure all modifications strictly validate against the corresponding JSON schemas in `schemas/taxonomy-*.schema.json` by running `node scripts/validate-taxonomy.cjs`.
3. **Record Shifts in `CHANGES.md`**: If adjusting a `level_min` or `level_max` bound due to real-world dataset alignment, record the rationale in `taxonomy/CHANGES.md`.
4. **Maintain Cross-Repository Compatibility**: Any breaking changes to stable theme or track IDs must preserve legacy aliases in `aliases` blocks.
