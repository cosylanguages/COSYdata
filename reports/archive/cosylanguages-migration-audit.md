# COSYlanguages Vocabulary Migration Audit

Audit date: 2026-10-01  
Source: `COSYlanguages` commit `fec25ae3d5253deb6485864d109d1bc1316961ea`  
Target: current COSYdata worktree

## Scope and Method

The audit evaluated the active `vocabulary/<lang>/{A2,B1,B2,C1,C2}` JavaScript trees from the source snapshot in an isolated VM, counting arrays exported through `window.vocabularyData` or `module.exports`. It compared normalized headword + part-of-speech pairs with all levels already present in COSYdata for that language. Form normalization was limited to `noun phrase` -> `noun`, `adjective / adverb` -> `adjective`, and `other` -> `phrase`.

This is a surface-form coverage check only. A match does not prove that definitions, examples, grammar, sense, level, or concept links are equivalent. An unmatched pair is a review candidate, not an automatic import instruction.

The current source tree contains 620 active-level JavaScript files. 246 files did not expose a lexical array through this extractor; several are named `fluency.js`, `opinions.js`, `locations.js`, `debates.js`, and `speaking.js` and appear to hold prompt or activity content. They need separate classification before deciding whether they belong in vocabulary, functional phrases, or another dataset.

The current source tree has no active `A1` vocabulary directories, although `vocabulary/manifest.json` still lists A1 files. Historical A1 reports therefore cannot establish the contents of the current source snapshot.

## Coverage by Language

| Language | Source objects | Missing word/POS | Unique valid word/form pairs | Found in COSYdata, any level | Same headword, other POS | No target headword |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| ba | 371 | 0 | 370 | 20 | 2 | 348 |
| br | 371 | 0 | 365 | 10 | 0 | 355 |
| cv | 5 | 0 | 4 | 1 | 0 | 3 |
| de | 184 | 0 | 134 | 1 | 0 | 133 |
| el | 513 | 2 | 482 | 260 | 0 | 222 |
| en | 5,433 | 0 | 3,584 | 3,584 | 0 | 0 |
| es | 133 | 0 | 133 | 1 | 0 | 132 |
| fr | 1,343 | 39 | 1,247 | 257 | 163 | 827 |
| hy | 371 | 0 | 366 | 25 | 0 | 341 |
| it | 1,333 | 2 | 1,263 | 264 | 172 | 827 |
| ka | 371 | 0 | 364 | 20 | 1 | 343 |
| pt | 182 | 0 | 133 | 2 | 0 | 131 |
| ru | 1,348 | 1 | 1,265 | 257 | 164 | 844 |
| tt | 371 | 0 | 370 | 24 | 2 | 344 |
| **Total** | **12,329** | **44** | **10,080** | **4,726** | **504** | **4,850** |

The 44 source objects without a word or POS are excluded from the valid-pair counts; the remaining valid records contain 2,205 repeated word/form objects. The 167 exact matches that resolve to multiple COSYdata entries are ambiguous and are not safe migration targets. The 504 same-headword/different-POS cases, especially in French, Italian, and Russian, require grammatical and sense review. English A2-C2 source pairs are all represented somewhere in COSYdata under this surface-form comparison.

## Completed Batches: CEFR Levels

The first batch transferred English CEFR-level membership from the A2-C2 source into existing COSYdata entries. Of 3,584 unique pairs, 11 had multiple target entries and were skipped. **696 entries across 146 files** received a sorted `levels` array containing the target's existing level(s) plus the source level(s), and `updated` was set to the migration date.

The second batch applied **211 unambiguous level updates** in non-English datasets across 77 files. It skipped absent target pairs, ambiguous target matches, and records without a headword or POS. A separate direct sense check aligned the existing Italian entry `it:all-estero:phrase` to `en:abroad:adverb`; no lexical entry was added. The level migrator defaults to dry-run; pass `--apply` to write. The source commit used for these batches is recorded above.

## Readiness Blockers

The source schema is materially looser than the COSYdata entry contract. A source record may have a word and definition while lacking information required for a canonical dictionary entry. Examples from the measured unique source pairs:

- Bashkir C2: all 135 unique pairs lack transcription and antonyms; 16 noun records also lack countability.
- Greek A2: all 247 unique pairs lack transcription and antonyms; 59 noun records lack countability.
- French A2: 233 of 401 unique pairs lack transcription, all lack antonyms, and 57 nouns lack countability.
- Italian A2: 234 of 395 lack transcription, all lack antonyms, and 57 nouns lack countability.
- Russian A2: 183 of 401 lack transcription, all lack antonyms, and 59 nouns lack countability.
- English A2: all source pairs are represented in COSYdata, but the source snapshot itself has 1,919 unique pairs without antonyms, 753 nouns without countability, and 154 without transcription.

For non-English entries, the source export does not provide COSYdata's English `concept` ID. Concepts need sense-level alignment against the English source vocabulary. Many entries also use legacy IDs and theme names, and some files contain phrases/prompts rather than headwords.

## Migration Decision

No unmatched non-English batch currently satisfies the canonical requirements without adding or verifying linguistic data. Do not bulk-copy these records into `vocabulary/` with guessed IPA, antonyms, countability, examples, themes, or concept links. Instead, migrate in reviewed language/level batches, record uncertain fields in `reports/needs-review/`, and validate each completed batch before rebuilding indexes.

Do not delete the source vocabulary from COSYlanguages yet. The source application must first switch to COSYdata (or another validated replacement), and a source-to-target coverage check must pass for the exact commit being retired. The A1 manifest discrepancy must also be resolved against source history or confirmed as already migrated before declaring A1 complete.
