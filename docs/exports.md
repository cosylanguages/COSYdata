# Exports

`exports/` is the vocabulary as files people can download. It is generated,
never edited, and checked in so the static site can serve it.

## What is published

| File | Rows | Size | Shape |
| --- | --- | --- | --- |
| `exports/vocabulary.jsonl` | every entry | ~14 MB | one JSON object per line, every field kept |
| `exports/vocabulary.csv` | every entry | ~8 MB | 15 flat columns, lists joined with ` \| ` |
| `exports/by-language/<code>.csv` | one language | — | same columns, one dictionary |
| `exports/manifest.json` | — | 6 KB | rows, bytes and sha256 for every file |

Rows are sorted by `id`. Nothing carries a build timestamp, so the output is
reproducible: running the generator twice gives byte-identical files, and
`npm run check:exports` fails when the committed files differ from what the
generator would write.

## Why both JSONL and CSV

They answer different questions. JSONL is the data: no column is dropped, arrays
stay arrays, and a consumer that needs `regional_equivalents` or
`transcription_variants` finds them. CSV is the reading surface: one row per
entry, definitions and examples joined into a single cell, openable in a
spreadsheet without a parser.

The CSV columns are listed in `scripts/build-exports.cjs` and described on the
[exporter page](../products/exporter/). New columns are only ever added at the
end, so a fixed column position stays valid.

## Why the per-language files exist

`by-language/<code>.csv` is a partition of `vocabulary.csv`, so it duplicates
bytes that are already published. It is worth the ~8 MB because "French, in
Excel" is the common request and `jq 'select(.language=="fr")'` is not something a
teacher should have to learn.

## Cost worth knowing

`exports/` adds ~30 MB to the repository and is rewritten whenever the vocabulary
changes. Git stores each rebuild as a delta against the previous file, so the
history cost is small, but a fresh clone carries the full size. If that ever
becomes a problem, the honest fix is to generate exports in CI and publish them
as release assets rather than committing them; that would break the
`check:exports` freshness gate, which is the trade-off to weigh then, not now.

## Commands

```
npm run build:exports     # regenerate exports/ and the manifest
npm run check:exports     # fail when exports/ is stale (part of validate)
npm run test:exporter     # manifest vs disk, JSONL and CSV integrity, browser render
```

## What the tests hold

- Every file the manifest lists exists with the declared byte size and sha256.
- `manifest.rows` equals `stats.json`'s entry count; per-language rows sum to it.
- The JSONL parses line by line, has one unique `id` per row, and is sorted.
- The CSV header equals the manifest's column list, every row has that width, and
  quoting round-trips (a definition containing a comma or a quote survives).
- The page lists one card per whole-file download, one chip per language, and one
  documented row per column.
