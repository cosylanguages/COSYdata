# The validator product

`products/validator/` publishes the quality audit as a page. It is the second
product, and the first one that is mostly a view over a generated file.

## The chain

```
scripts/quality-audit.cjs          decides what a finding is
        │  collectFindings(), RULES
        ▼
scripts/build-quality-report.cjs   writes reports/quality.json
        │
        ▼
products/validator/                renders that file
```

Each arrow is one-way. The page does not know a rule by name; it renders the
catalogue it is given, so adding a rule to the audit is a one-line change there
and no change here.

## Commands

| Command | What it does |
| --- | --- |
| `npm run build:quality-report` | Rebuild `reports/quality.json` |
| `npm run check:quality-report` | Exit 1 when the report is stale (part of `validate`) |
| `npm run test:validator` | Report freshness, totals, and a real browser render |

`build` includes the first, so a data change and its report arrive in the same
commit. The report carries no timestamp, so rebuilding it is a no-op unless the
data or the rules changed.

## What the page shows

- **Totals**: entries audited, rules in force, findings, new since baseline.
- **Rule catalogue**: every rule the audit can raise, with a plain-English
  sentence and its finding count. Rules that found nothing are shown as
  `clean`; they are the useful half of the page, because they say what the data
  already passes.
- **Findings by level and by language**, with share per entry.
- **A sample**, one finding per language first, so the spread is visible.

## Invariants the tests hold

- The report is reproducible: `--check` compares against the committed file.
- `by_code` and `rules` both sum to the headline `findings` count.
- Every rule in `RULES` appears in the report, including the ones with zero
  findings, so a rule cannot silently disappear from the page.
- The rendered page has one row per rule, one bar per level, one row per
  language, and makes no request outside this repository.

## Baseline debt

`reports/quality-baseline.json` records findings that were already there. The
page labels those `recorded debt` rather than hiding them, and `npm run
test:quality` still fails on anything not in that file. When a rule gains
findings that the baseline does not know about, the page labels them `N new` and
CI fails.
