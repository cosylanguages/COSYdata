# P67 Greek transcriptions
P67 filled Greek IPA from English Wiktionary.
## Coverage
- 202 Greek entries received a transcription.
- 323 Greek entries remain without one and are listed in `reports/needs-review/p67-el-transcription.md`.
## Method
For each entry the script requested the English Wiktionary page, selected the `==Greek==` section, and read the first `{{IPA|el|...}}` template. Values in slashes or square brackets were accepted; the brackets were normalised to slashes.
## Short forms left empty
Five short entries have genuine IPA equal to their spelling (`με` me, `σε` se, `στη` sti, `στην` stin, `στο` sto). The quality gate treats `/word/` as a pseudo-transcription, so they were left empty instead of baselining new findings.
## Tatar probe
Tatar was checked first. English, Tatar and Russian Wiktionary together yielded only 7 usable Tatar IPA values out of 555 entries, so P67 switched to Greek. Tatar remains open for a phase with an external Tatar pronunciation source.
## Verification
- Every added value is slash-delimited IPA and passed `npm run validate`.
- No new pseudo, native-script or placeholder findings were introduced.
- The quality baseline moved from 5,782 to 5,580 findings.
## Result
- Entries changed: **202**
- Entries total: **31,498**
- Findings: **5,580** (all missing transcriptions)
- Missing definitions: **0**
- Missing examples: **0**
