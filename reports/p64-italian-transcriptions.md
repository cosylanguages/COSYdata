# P64 Italian transcriptions
P64 filled Italian IPA from Italian and French Wiktionary.
## Coverage
- 497 Italian entries received a transcription.
- 931 Italian entries remain without one and are listed in `reports/needs-review/p64-it-transcription.md`.
- 359 values came from Italian Wiktionary and 150 from French Wiktionary.
## Method
For each entry the script requested the Italian Wiktionary page first and read the Italian `== {{-it-}} ==` section and its first `{{IPA|...}}` template. If that failed, it requested the French Wiktionary page and read the `== {{langue|it}} ==` section and its first `{{pron|...|it}}` template.
Values were rejected if they contained native script, templates, pipes, equals signs, backslashes or more than 80 characters. Multiple variants were reduced to the first variant. `*` markers, leading secondary-stress commas and colon length marks were normalised to IPA `ˌ` and `ː`.
## Short forms left empty
Twelve short entries have genuine IPA equal to their spelling (`a`, `e`, `i`, `il`, `in`, `le`, `ne`, `o`, `se`, `si`, `tu`, `un`). The quality gate treats `/word/` as a pseudo-transcription, so they were left empty instead of baselining new findings.
## Verification
- Every added value is slash-delimited IPA and passed `npm run validate`.
- No new pseudo, native-script or placeholder findings were introduced.
- The quality baseline moved from 7,152 to 6,655 findings.
## Result
- Entries changed: **497**
- Entries total: **31,498**
- Findings: **6,655** (all missing transcriptions)
- Missing definitions: **0**
- Missing examples: **0**
