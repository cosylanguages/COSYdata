# P66 Armenian transcriptions
P66 filled Armenian IPA from English Wiktionary.
## Coverage
- 373 Armenian entries received a transcription.
- 286 Armenian entries remain without one and are listed in `reports/needs-review/p66-hy-transcription.md`.
## Method
For each entry the script requested the English Wiktionary page and found the first `{{hy-IPA}}` template. If the template had no positional argument, the stored headword was used. Named parameters such as `e=` and `w=` were ignored and replaced by the headword. The templates were expanded through the MediaWiki `expandtemplates` API and the Eastern Armenian IPA was read from the rendered `<span class="IPA nowrap">/.../ [...]</span>`.
## Short forms left empty
Four short entries have genuine IPA equal to their spelling (`կին` kin, `հին` hin, `մեկ` mek, `մոտ` mot). The quality gate treats `/word/` as a pseudo-transcription, so they were left empty instead of baselining new findings.
## Verification
- Every added value is slash-delimited IPA and passed `npm run validate`.
- No new pseudo, native-script or placeholder findings were introduced.
- The quality baseline moved from 6,155 to 5,782 findings.
## Result
- Entries changed: **373**
- Entries total: **31,498**
- Findings: **5,782** (all missing transcriptions)
- Missing definitions: **0**
- Missing examples: **0**
