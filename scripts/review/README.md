# Native-speaker review of the daily content

Spreadsheet workflow for reviewing the short texts the daily strip shows, which live in three repositories:
speaking/writing prompts (COSYpractice `data/daily`), fun facts (COSYlanguages `data/daily`) and the legacy idiom lists
(COSYdata `daily/<lang>/idioms.json`). Needs Python 3 and `openpyxl`. Run from this repository with the others cloned beside it.

1. **Make the sheets** (one workbook per language, 14 languages):
   `python scripts/review/make_review_sheets.py --practice ../COSYpractice --hub ../COSYlanguages --data . --out review-sheets`
   (add `--lang fr` for one language). Send each reviewer their `review-<lang>.xlsx`; they fill the cream columns
   (Verdict: OK / Fix / Remove, Corrected text, Corrected example, Comment) and send it back. The generated workbooks are
   snapshots, so they are not committed.
2. **Apply the returned sheet** (dry run first, then `--write`):
   `python scripts/review/apply_review.py review-fr.xlsx --practice ../COSYpractice --hub ../COSYlanguages --data .`
   A row is skipped when its text changed after the sheet was made, so newer edits are never overwritten.
3. **Check and commit in each repo that changed:** `node scripts/validate-daily-prompts.js` (COSYpractice, also keeps a curated
   prompt for every level band), `npm run build && npm run validate` (COSYdata).

Not covered: the vocabulary dictionary itself. Featured words, verbs and phrasal verbs (the daily calendars) are only checked by
the automatic quality rules in `scripts/lib/daily-calendar.cjs`, not by a native speaker.
