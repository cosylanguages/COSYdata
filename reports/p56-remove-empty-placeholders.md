# P56 Remove empty B1 placeholders
P56 removed the last entries with no definitions: 66 empty B1 place-name shells.
## Removed
- Bashkir: 11
- Breton: 11
- German: 11
- Armenian: 11
- Georgian: 11
- Tatar: 11
Each entry had only an ID, word, level, form, language, status, emoji, countability, plural form, theme and update date. None had a definition, example or transcription.
## Why remove instead of backfill
The entries were empty placeholders added in bulk. Writing definitions and examples in six smaller languages would require verified wording in each language; inventing it would violate the accuracy policy. Keeping empty shells was also not useful.
## Aliases
All 66 IDs are now null aliases in `shared/id-aliases.json`.
## Files removed
The removal emptied these files, which were deleted:
- `vocabulary/hy/b1/noun.json`, `vocabulary/hy/b1/phrase.json`
- `vocabulary/ka/b1/noun.json`
- `vocabulary/tt/b1/noun.json`
- `vocabulary/ba/b1/noun.json`
- `vocabulary/br/b1/noun.json`, `vocabulary/br/b1/phrase.json`
- `vocabulary/de/b1/noun.json`, `vocabulary/de/b1/phrase.json`
## Verification
- Every remaining entry has at least one definition.
- No old ID remains in a data file.
- Validation and all tests pass.
## Result
- Entries removed: **66**
- Entries total: **31,499**
- Findings: **9,153** (from 9,351)
- Missing definitions: **0**
- Missing examples: **826**
