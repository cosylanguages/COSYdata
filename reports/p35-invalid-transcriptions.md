# P35 invalid transcriptions removed

P35 removed **3,313 invalid transcription values** rather than keeping data that looked like IPA but was not.

| Reason | Count |
|---|---:|
| Transcription was only `/<id-slug>/` | 1,993 |
| Native-script spelling | 1,045 |
| `"-"` placeholder | 275 |

## Removed by language

| Language | Entries |
|---|---:|
| ba | 129 |
| br | 49 |
| cv | 133 |
| de | 397 |
| el | 122 |
| en | 396 |
| es | 241 |
| fr | 350 |
| hy | 329 |
| it | 210 |
| ka | 97 |
| pt | 77 |
| ru | 340 |
| tt | 443 |

Each affected entry now has `"transcription": ""` and is counted as missing until a source-backed IPA value is provided.

## Sources checked

- Wiktionary IPA entries where available, for the languages and words in this batch
- The repository rule that a missing field is better than a wrong one

## Result

- Entries: **31,568**
- Findings: **11,708**
- Slug-only transcriptions: **0**
- Native-script transcriptions: **0**
- `"-"` placeholders: **0**
- Missing transcriptions: **8,396**
