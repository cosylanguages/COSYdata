# Generated pages

Fourteen dictionary pages, one template.

## Why

The pages at `vocabulary/<lang>/index.html` were fourteen copies of the same 39
lines. They differed in exactly five things: the language code, the title, the
description, the Open Graph locale, and the `<h1>`. Every shell change — a new
stylesheet, a meta tag, the theme script — had to be made fourteen times, and
the way that ends is thirteen pages updated and one forgotten.

GitHub Pages serves static files and has no includes, so the choice was:

1. custom elements (`<cosy-navbar>`) filled in by JavaScript — the nav and the
   shell disappear when JS fails, and crawlers see an empty body;
2. a build step that renders the HTML ahead of time — static HTML stays static,
   and the shell lives in one file;
3. keep copying.

This repository already generates `index.json`, `flat-index.json`,
`search-index.json` and `stats.json` and commits them, with CI checking they are
current. The pages follow the same pattern, which is option 2.

## What is generated

| Template | Config | Output |
| --- | --- | --- |
| `templates/dictionary-page.html` | `templates/dictionaries.json` | `vocabulary/<code>/index.html` |

Everything else — `index.html`, `top10-verbs.html`, `products/statistics/` — is
hand-written, because each is a single page with unique content. A template with
one instance is a file with extra steps.

## Commands

```
npm run build:pages     # render the pages
npm run check:pages     # exit 1 when a committed page differs from its template
npm run test:pages      # template freshness, per-language metadata, config/data parity
```

`npm run build` renders the pages first, and `npm run validate` ends with
`--check`, so a stale page fails the same gate as a stale index.

## Adding a language

1. Add the language's vocabulary files under `vocabulary/<code>/<level>/`.
2. Add one object to `templates/dictionaries.json`:
   `{ "code", "locale", "title", "description", "heading" }`. The title,
   description and heading are written in the language itself.
3. `npm run build:pages`.

The build refuses to run when a directory under `vocabulary/` has no config
entry, and `test:pages` fails when a language has data files but no page. Both
directions are guarded, because a language with no page is invisible and a page
with no config is a page that will drift.

## Adding a generated page type

Add a descriptor to the `PAGES` array in `scripts/build-pages.cjs`: a template
path, an entries file, an output path function, and a `vars` function that maps
one entry to the template's placeholders. Placeholders are `{{name}}` and are
HTML-escaped on substitution; an unreplaced or unknown placeholder is an error,
not an empty string.

## What this does not do

It does not make the hub, the tool and the statistics page share a navbar. Those
three pages have three different headers today, and unifying them is a design
change, not a build change. When that decision is made, the shared header
becomes a partial that `build-pages.cjs` also writes into those pages — the
mechanism is already here.
