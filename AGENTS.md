# Agent instructions for COSYdata

## Repo facts
- Vocabulary lives in `vocabulary/<lang>/<level>/*.json` (each file is a JSON array of entries). Levels: a0_a1, a2, b1, b2, c1, c2. Languages: ba br cv de el en es fr hy it ka pt ru tt.
- English is the source language. Every entry in another language should point to the English entry that has the same meaning through the `concept` field.
- Schema: `schemas/vocabulary.schema.json` (+ fixtures in `schemas/examples/`). Indexes: `vocabulary/<lang>/index.json`, `flat-index.json`, and `search-index.json`.
- Theme taxonomy: `docs/theme-taxonomy.md` and its machine-readable copy `shared/themes.json`.

## Commands (run all before finishing; all must pass)
    npm ci
    npm run build
    npm run validate
    node scripts/audit-a0-a1.cjs        # once it exists; must not report NEW problems compared with main

## Editing rules
1. Only change files inside the scope named in the task. Do not touch other languages or levels.
2. Keep JSON formatting identical to the existing files: UTF-8, 2-space indent, trailing newline, existing key order. Do not reformat entries you do not change. Keep entry order inside a file unless the task says otherwise.
3. Never rename or delete an existing `id` unless the task explicitly says so. When you do remove or rename one, add `"<old id>": "<new id or null>"` to `shared/id-aliases.json` and fix every reference (`regional_equivalents`, `synonyms`, `related_forms`, `concept`, index files) across the whole repo (search all levels and languages).
4. Set `"updated"` to today's date (YYYY-MM-DD) on every entry you change. Do not touch `updated` on other entries.
5. `domain` is a comma-separated string with `general` first when present. Keep existing values.
6. New entries need every field required by the schema and the language's conventions: id `<lang>:<slug>:<form>` (use the slug style already used in that language), word, language, form, level, transcription (real IPA), emoji or `no_emoji`, antonyms or `no_antonym`, definitions (in the entry's own language), examples (one natural sentence containing the headword), domain, theme, sub_theme, concept, updated.

## Linguistic accuracy (most important)
- Never invent forms. Use authoritative sources (reputable dictionaries, Wiktionary inflection tables, official grammars) and list them in the PR description.
- If you are not highly confident about a form, leave the field out and add a line to `reports/needs-review/<task-id>-<lang>.md` (entry id, field, what you were unsure about, sources checked). A missing field is better than a wrong one.
- Definitions and examples must be written in the entry's own language, must describe THAT word (never copy another word's definition), and must contain the headword.
- Do not add real named people, brands or copyrighted material as vocabulary.

## Field decisions (names are fixed; P01 adds them to the schema)
- `concept`: string, the id of the English entry with the same meaning and sense, e.g. "en:dog:noun". English entries point to themselves; for a UK/US pair both entries use the UK entry's id. Omit `concept` when no English entry matches (list those in `reports/concept-alignment-<lang>.md`).
- `secondary_themes`: array of canonical theme names (see `shared/themes.json`) for words that belong to more than one theme. `theme` stays the single primary theme. NEVER duplicate an entry to place it in a second theme.
- `sense`: short slug that distinguishes homographs (e.g. "animal" / "food").
- `usage_note`: one short sentence of usage guidance in English.
- Language-specific grammar fields are listed in the P01 prompt and in `schemas/vocabulary.schema.json`.

## PR rules
- One task per PR. Branch `jules/<task-id>`, title `[<task-id>] <short summary>`.
- Add a bullet under "Unreleased" in `CHANGELOG.md` (counts of entries changed/added/removed).
- PR description must contain: what changed with counts, the exact commands run and their result, sources used, and the list of items left in `reports/needs-review/`.
- If the task is too large to finish safely, finish a coherent part, say precisely what is left, and stop. Do not leave the repo failing validation.
