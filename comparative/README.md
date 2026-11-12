# comparative/

Cross-language views built **from** the monolingual dictionaries. Nothing here replaces or edits `vocabulary/`:
dictionaries stay independent (see `AGENTS.md`), and `concept` is not added to non-English entries.

| Path | What | How it is made |
|---|---|---|
| `languages.json` | 14 languages: family, branch, script, BCP-47 code | hand-written |
| `concepts/calendar.json` | 23 concepts (weekday/month/season) x 14 languages, with word, IPA, gender, article and the dictionary entry id | **generated** by `npm run build:comparative` |
| `linguistics/calendar-cognates.json` | cognate groups, per-word etymologies, insights | hand-written, **draft** |

## Alignment
`seasons.months.days.json` already lists the same 23 items in the same order for each language. The build script
reads that order, looks each entry up in `vocabulary/<lang>/a0_a1/calendar.json`, and fails if the two sources disagree.

## Concept ids
`weekday.monday` ... `weekday.sunday`, `month.january` ... `month.december`, `season.spring` ... `season.winter`.
Ids are stable; do not rename.

## Linguistic data policy
- Every group, etymology and insight carries `reviewed` (boolean). **All are currently `false`.** UIs must show them as drafts until a human flips the flag after checking the sources.
- Group members have a `relation`: `inherited` (descends from the root), `calque` (translated), `loan` (borrowed), `parallel` (same idea formed independently), `source` (the language the root comes from).
- Similar spelling is never evidence. Do not add a cognate group without a historical source.
- Unsure about a form or claim: leave it out and list it under `reports/needs-review/`.

## Commands
    npm run build:comparative     # regenerate concepts/calendar.json
    npm run validate              # includes the comparative check (stale file or broken references fail)
