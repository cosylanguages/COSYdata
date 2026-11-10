# English idiom audit: duplicates and placeholder entries

Scope: `vocabulary/en/*/idioms.json` (generated 2026-11-10). Nothing in this report has been applied to the data.

## Numbers
| | |
|---|---|
| Entries in the idioms files | 1978 (905 `idiom`, 1073 `phrase`) |
| Distinct expressions (normalised: case, punctuation, leading the/a/to, *barking*/*bark*, *take it with*/*take with*) | 1092 |
| Expressions that appear more than once | 786 |
| Entries that would be removed or merged | 886 |
| Placeholder entries (definition starts "Idiomatic expression" or example is "Example sentence using ...") | 658 |
| Expressions that have only placeholder entries | 0 |

Every expression has at least one real entry, so removing the placeholders loses no expression.

## Why it matters for the daily strip
A daily pick by entry ID can land on a placeholder (e.g. `en:bark-up-the-wrong-tree-2:phrase`, whose definition is just "Idiomatic expression: ..."), or show the same idiom twice in a month under different IDs and levels.

## Proposed rule (not applied)
Per expression keep one entry: prefer a real entry over a placeholder, then form `idiom` over `phrase`, then the lowest level, then the lowest id. Retire the others and record each in `shared/id-aliases.json` (AGENTS.md rule 3). Where an expression is genuinely taught at several levels, merge them into the kept entry with the existing `levels` array instead of keeping duplicates.

Machine-readable groups, with the proposed entry to keep: `reports/idiom-duplicates.json`.

## Other findings
- 895 of the 903 `idiom`-form entries carry the placeholder transcription `/.../`. The schema requires `transcription`, so it can't just be deleted; the options are real IPA, or `status: needs_review`.
- 895 of the 903 `idiom`-form entries have `no_emoji`. The daily card would benefit from an emoji for the literal image.
