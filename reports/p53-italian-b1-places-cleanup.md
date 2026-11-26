# P53 Italian B1 place names and duplicate cleanup
P53 fixed the remaining Italian entries with missing definitions.
## Changes
- Added Italian definitions and examples for eight B1 place names.
- Changed their theme from `general` or `communication` to `geography`.
- Removed `status: needs_review` from the completed place entries.
- Removed the duplicate `it:infrastruttura:verb` entry; the valid noun entry is `it:infrastruttura:noun`.
- Added the alias `it:infrastruttura:verb` -> `it:infrastruttura:noun`.
## Sources checked
- Italian Wiktionary and standard dictionaries for place-name spelling and meaning
- Existing English, Spanish, French and Portuguese place-name entries for structure
- `docs/theme-taxonomy.md` for the `geography` theme
## Verification
- All eight definitions are in Italian and describe the place.
- All eight examples are in Italian and contain the place name.
- Italian has zero entries missing definitions.
- The removed duplicate verb had no definitions and was not referenced outside indexes and the baseline.
- IPA for the place names was left out; see `reports/needs-review/p53-italian-b1-places-it.md`.
## Result
- Entries changed: **8**
- Entries removed: **1**
- Entries total: **31,567**
- Findings: **9,403** (from 9,422)
- Missing definitions: **91**
- Missing examples: **917**
