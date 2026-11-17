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

## Dictionary entries scheduled as word / verb / phrasal verb / idiom of the day

The calendars show entries from the dictionary itself, so these get their own sheets: only the entries scheduled in the next
`--days` days (default 14), soonest first, so a reviewer can stop anywhere.

1. `python scripts/review/make_dictionary_review.py --data . --out dictionary-review --days 14` (one workbook per language that has a calendar).
2. Verdicts: **OK**, **Fix** (corrected definition and/or example), **Exclude** (stays in the dictionary but is never featured),
   **Flag** (wrong article, spelling, level...: reported with its comment for a person to edit).
3. `python scripts/review/apply_dictionary_review.py dictionary-review-fr.xlsx --data .` (dry run), then `--write`, then `npm run build && npm run validate`.
   Fix edits `definitions[0]` / `examples[0]` and sets `updated`; Exclude adds the id to `daily/<lang>/calendar/exclude.json` for the slots it is shown in.
   The build refreshes calendar cards and replaces excluded or no-longer-eligible picks, so validation fails until it has run.
   A dictionary file is written only if it round-trips through JSON byte for byte; otherwise the change is printed to apply by hand.

Not covered by either workflow: the rest of the dictionary. Only the entries about to be featured are reviewed; everything else is
checked only by the automatic quality rules in `scripts/lib/daily-calendar.cjs`, not by a native speaker.
