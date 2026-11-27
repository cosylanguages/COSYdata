# Independence rules

COSYdata is a standalone repository that the rest of the COSY ecosystem consumes.
It must never need a sibling repository in order to render.

## The rule

Every file the browser fetches to draw a COSYdata page lives in this repository.

- **Forbidden:** `<link rel="stylesheet">`, `<script src>`, `<img src>`, `<source>`,
  `@import`, `url()` or a JavaScript asset URL that points at
  `cosylanguages.github.io/COSYlanguages/`, `COSYtools/`, `COSYgames/`,
  `COSYmanuals/`, `COSYplatform/`, `COSYpractice/` or `COSYevents/`.
- **Allowed:** navigation links (`<a href>`), canonical and Open Graph metadata,
  and data fetches listed under [Data-plane couplings](#data-plane-couplings).

The boundary is deliberately **build-time**, not origin-time. Every COSY site is
served from `cosylanguages.github.io`, so they share `localStorage` (including the
`cosy.theme` and `cosy-auth` keys). That is a platform feature. What we control is
whether a COSYlanguages deploy can break a COSYdata page, and it cannot.

## Adding or updating a shared asset

1. Add the entry to the `ASSETS` list in `scripts/sync-ecosystem-assets.cjs`.
2. Run `npm run sync:ecosystem-assets`. It downloads the file into
   `shared/vendor/`, records its SHA-256 in `shared/vendor/ASSETS.json`, and
   prints `updated` or `unchanged` per asset.
3. Reference the local copy from the page, using a path relative to that page.
4. Commit the vendored file together with `ASSETS.json`.

`shared/vendor/css/fonts.css` uses `../fonts/` URLs, which is why the layout
mirrors upstream (`css/`, `js/`, `fonts/`) instead of flattening.

**Never edit a vendored file.** `npm run validate` hashes every copy and fails on
a mismatch, so a local tweak is caught before review. Upstream changes arrive by
re-running the sync script and reviewing the diff like any dependency bump. No
vendored file is patched at runtime.

## Enforcement

| Check | Command | What it proves |
| --- | --- | --- |
| Static scan | `npm run check:independence` | No page, stylesheet or script names a sibling asset. |
| Hash check | `npm run check:ecosystem-assets` | Vendored copies are unmodified and complete. |
| Live browser | `npm run test:independence` | No stylesheet/script/font/image request leaves this repository, fonts resolve locally, and the dictionary still renders. |

`npm run validate` runs the first two. CI runs the third after installing Chromium.

## Data-plane couplings

These are content feeds, not dependencies. Each one degrades to an empty widget,
never to a broken page.

| Surface | Endpoint | Owner | Behaviour when unavailable |
| --- | --- | --- | --- |
| Hub daily strip (speaking, writing prompts, fun facts) | `COSYpractice/data/daily/`, `COSYlanguages/data/daily/` | COSYpractice, COSYlanguages | Slot stays empty |
| Hub daily strip (vocabulary calendars) | `COSYdata/daily/` | this repository | Slot stays empty |
| Ecosystem strip sign-in state | `localStorage["cosy-auth"]` | shared platform key | Signed-in-only links stay hidden |

## Relations

The antonym and synonym lexicon used to be compiled by COSYtools and vendored in
here, which made a tool repository the source of truth for vocabulary data. It is
now generated from our own entries:

```
npm run build:relations     # writes shared/data/vocabulary-relations.json
npm run check:relations     # exit 1 when it is stale (part of npm run validate)
```

The output keeps the shape COSYtools' loader reads — `{ langs: { <lang>: {
<word>: { antonyms, synonyms } } } }` — so a consumer can point at it without
changing code. Keys are lower-cased word forms, homographs are merged, and the
schema's `no_antonym` placeholder is filtered out.

The dictionary page itself no longer fetches a lexicon: every entry it renders
already carries its own relations, and fetching a 1.4 MB table to fill gaps that
the entries already fill was the wrong trade. The published file exists for the
surfaces that have words but no entries.
