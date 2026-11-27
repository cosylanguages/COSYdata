# stats.json

`stats.json` is the machine-readable summary of this repository. It is generated,
committed, and served at:

```
https://cosylanguages.github.io/COSYdata/stats.json
```

Consumers can use it instead of walking `vocabulary/` themselves: COSYlanguages
can show coverage on a homepage, a report can quote a number, and the site's own
statistics page is just one renderer of this file.

## Why it is generated and committed

The file is an artifact of the data, like `index.json`. Committing it means:

- a consumer can read one small file (about 15 KB) instead of 1,125;
- every published number is reviewable in a pull request;
- the numbers cannot drift from the data, because `npm run check:stats` fails
  when the file no longer matches a fresh build.

There is no build timestamp, so the output is reproducible: two runs on two
machines produce byte-identical files. The `data_updated` field is the newest
`updated` value found in the data, which is the honest answer to "when did this
dataset last change".

## Counting rule

One entry is one object in a JSON array under `vocabulary/<lang>/<level>/`,
excluding `index.json`, `flat-index.json`, `search-index.json`,
`themes-index.json`, `*-tracks.json` and the `vocabulary/_canonical` staging tree.

That rule lives in exactly one place, `scripts/lib/vocabulary-scan.cjs`, and is
shared by this builder and `scripts/quality-audit.cjs`. `tests/stats.test.mjs`
also checks that `scripts/validate-theme-normalisation.cjs` reports the same
total, so "31,498 entries" cannot mean two different things in two reports.

## Fields

| Field | Meaning |
| --- | --- |
| `schema_version` | Integer. Bumped when a consumer-visible field changes shape. |
| `counting_rule` | The definition above, repeated in the file for consumers. |
| `data_updated` | Newest `updated` date in the data (`YYYY-MM-DD`). |
| `totals` | Languages, entries, data files, levels, themes, sub-themes, functional phrases. |
| `by_level` | Entry count per CEFR level, always all seven keys in A0–C2 order. |
| `by_form` | Ranked list of `{name, entries}` for noun, verb, adjective, idiom, phrase and the rest. |
| `coverage` | Percentage of entries where each optional field is present and non-empty. |
| `languages[]` | Per language: `code`, `entries`, `by_level`, `coverage`, `updated`. |
| `themes[]` | Ranked `{theme, entries, languages}`; `languages` counts how many languages use the theme. |
| `functional_phrases` | `entries`, `data_files`, and `by_language` / `by_level` ranked lists. |

`coverage` counts a field as present when an array is non-empty, a string is not
blank, or a scalar is truthy. It measures presence, not quality: an entry with a
weak definition still counts as having one.

## What it does not contain

- **Quality findings.** Those live in `reports/quality-baseline.json` and are
  enforced by `scripts/quality-audit.cjs`. `coverage` says how many entries have
  a field, never whether the content is good.
- **Per-entry data.** Use `vocabulary/<lang>/search-index.json` or the entry
  files for that.
- **Timestamps or build ids.** See above.

## Refreshing

```
npm run build:stats     # rewrite stats.json
npm run check:stats     # exit 1 when it is stale (CI runs this)
npm run test:stats      # reproducibility, internal consistency, counting-rule agreement
```

## The page

`products/statistics/` renders this file for humans at
`https://cosylanguages.github.io/COSYdata/products/statistics/`. It is the first
product in the `products/` layout: its own HTML, CSS and JavaScript, no shared
code beyond the design tokens, and it resolves `stats.json` relative to its own
module, so the folder can be copied elsewhere without edits.

The page holds no numbers of its own. If a field is missing from `stats.json`,
the page leaves the slot blank instead of filling it in.
