# P65 Russian transcriptions
P65 filled Russian IPA from English Wiktionary.
## Coverage
- 500 Russian entries received a transcription.
- 242 Russian entries remain without one and are listed in `reports/needs-review/p65-ru-transcription.md`.
## Method
For each entry the script requested the English Wiktionary page, found the first `{{ru-IPA|...}}` template, expanded it through the MediaWiki `expandtemplates` API, and extracted the IPA from the rendered `<span class="IPA nowrap">[...]</span>`.
The template argument was compared with the stored headword after removing stress marks, parentheses and `ё`/`е` differences. Entries whose argument did not match were rejected.
## Rejected mismatches
Eight entries had a template argument that did not match the stored headword: `дверь`, `одиннадцать`, `семь`, `четыре`, `Нью-Йорк`, `борщ`, `убежище`, `пенсия`.
## Verification
- Every added value is slash-delimited IPA and passed `npm run validate`.
- No new pseudo, native-script or placeholder findings were introduced.
- The quality baseline moved from 6,655 to 6,155 findings.
## Result
- Entries changed: **500**
- Entries total: **31,498**
- Findings: **6,155** (all missing transcriptions)
- Missing definitions: **0**
- Missing examples: **0**
