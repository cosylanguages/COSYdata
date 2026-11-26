# P63 French transcriptions
P63 filled French IPA from French Wiktionary.
## Coverage
- 1,175 French entries received a transcription.
- 432 French entries remain without one and are listed in `reports/needs-review/p63-fr-transcription.md`.
## Method
For each entry the script requested the French Wiktionary page for the stored word, selected only the `== {{langue|fr}} ==` section, and read the first non-empty `{{pron|...|fr}}` template. Values were rejected if they contained native script, templates, pipes or more than 80 characters. Multiple variants separated by `|` were reduced to the first variant.
The exact source page for an entry is `https://fr.wiktionary.org/wiki/<word>`.
## Short forms left empty
Ten short entries have genuine IPA equal to their spelling (`film`, `il`, `la`, `là`, `ma`, `mal`, `sa`, `si`, `ta`, `y`). The quality gate treats `/word/` as a pseudo-transcription, so they were left empty instead of baselining a new finding.
## Verification
- Every added value is slash-delimited IPA and passed `npm run validate`.
- No new pseudo, native-script or placeholder findings were introduced.
- The quality baseline moved from 8,327 to 7,152 findings.
## Result
- Entries changed: **1,175**
- Entries total: **31,498**
- Findings: **7,152** (all missing transcriptions)
- Missing definitions: **0**
- Missing examples: **0**
