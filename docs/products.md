# Products

A product is a folder under `products/` that a reader could copy out and run.
`products/statistics/` and `products/validator/` are the two that exist.

## What a product is

```
products/<name>/
  index.html    markup only: empty containers, no data
  <name>.css    layout and accents, colours from tokens
  <name>.js     fetches one data file and fills the containers
  README.md     what it is, what it needs, how to check it
```

No build step, no bundler, no framework. A product is three files and a README.

## The contract

`tests/product-contract.test.mjs` (`npm run test:products`) enforces four rules:

| Rule | Why |
| --- | --- |
| Every product has markup, a stylesheet, a script and a README | A folder without a README is not copyable, it is a mystery. |
| A product loads only its own files, `shared/`, or a declared data file | Anything else is a hidden dependency. |
| Every referenced file exists | A 404 in production is a test failure here. |
| No product references another product | Removing one product must not touch the others. |

Loaded assets and navigation links are treated differently. A stylesheet, script,
JSON file or font is an asset and must be inside the product, in `shared/`, or on
the declared data list. A plain `<a href>` is navigation and may point anywhere in
the repository, including the hub and the baseline file, because a link that
leaves the product is not a dependency.

## Adding a product

1. Create `products/<name>/` with the four files.
2. Generate its data file with a script in `scripts/`, and add that file to
   `DATA_FILES` in the contract test plus the README's dependency block.
3. Link it from the hub hero (`index.html`) and add a `<url>` to `sitemap.xml`.

## Removing a product

Delete the folder, its hub link and its sitemap entry. Nothing else mentions it:
the contract test fails if another product links to it, so a stray reference
would have been caught when it was added, not when it is removed.

## Why the pages carry no numbers

Both products render a generated file (`stats.json`, `reports/quality.json`).
The number lives in exactly one place, the file, and the page is a view of it.
That is what makes "delete the product and nothing breaks" true: the data does
not live in the product, and the product does not compute anything another
surface depends on.
