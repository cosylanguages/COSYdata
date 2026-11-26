# P55 French, Portuguese and Russian cleanup
P55 cleared every remaining definition gap outside the six smaller languages.
## Definitions added
- French: Bretagne, Delhi, Rio de Janeiro, Le Caire, réalité virtuelle, infrastructure
- Portuguese: Cairo, Deli, Rio de Janeiro
- Russian: риад
## Broken entries removed
- `fr:simone-de-beauvoir:phrase`: a real named person, against the repository policy.
- `ru:infrastruktura:verb`: duplicate of the valid B2 noun entry.
## IDs renamed
- `fr:ralit-virtuelle:noun` -> `fr:realite-virtuelle:noun` (the slug missed the accent).
- `fr:infrastructure:verb` -> `fr:infrastructure:noun` (wrong part of speech).
- `ru:riat:noun` -> `ru:riad:noun` (standard spelling `риад`, plural `риады`).
All old IDs are recorded in `shared/id-aliases.json`.
## Other fixes
- Place-name themes changed to `geography`.
- Added `no_antonym` where the schema requires it.
- Removed `status: needs_review` from completed entries.
- Deleted the resolved `p46-russian-housing-b1-b2-ru.md` note.
## Sources checked
- French, Portuguese and Russian Wiktionary for spelling and place-name forms
- Existing entries in the same languages for register and field order
- `docs/theme-taxonomy.md` for the `geography` and `society` themes
## Verification
- All definitions are in the entry language and describe the headword.
- All examples contain the headword.
- French, Portuguese and Russian now have zero entries missing definitions.
## Result
- Entries changed or added: **11**
- Entries removed: **2**
- Entries total: **31,565**
- Findings: **9,351** (from 9,377)
- Missing definitions: **66**
- Missing examples: **892**
