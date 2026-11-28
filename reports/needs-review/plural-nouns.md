# Plural noun headwords — review notes

Rule applied: a noun headword should be singular. Entries marked
`countability: pluralia_tantum` were left unchanged, per instruction, even when
a singular counterpart exists. `false_plural` entries (`criteria`,
`phenomena`) were also left unchanged.

## Retired duplicates

These countable plural entries duplicated an existing singular entry. They were
removed and their IDs now alias the singular entry:

| Retired ID | Singular ID |
| --- | --- |
| `en:outcomes:noun` | `en:outcome:noun` |
| `en:efforts:noun` | `en:effort:noun` |
| `en:heuristics:noun` | `en:heuristic:noun` |
| `en:woods:noun` | `en:wood-forest:noun` |
| `en:citizens:noun` | `en:citizen:noun` |
| `en:ladies:noun` | `en:lady:noun` |
| `en:shoes:noun` | `en:shoe:noun` |
| `en:boots:noun` | `en:boot:noun` |
| `en:socks:noun` | `en:sock:noun` |
| `en:gloves:noun` | `en:glove:noun` |
| `en:blocks:noun` | `en:block:noun` |
| `fr:bottes:noun` | `fr:botte:noun` |
| `it:straordinari:noun` | `it:straordinario:noun` |
| `it:stivali:noun` | `it:stivale:noun` |
| `it:monete:noun` | `it:moneta:noun` |
| `es:pantalones:noun` | `es:pantalon:noun` |

## Renamed to singular

These countable plural headwords had no singular entry. The entry was rewritten
in place with a new ID, singular word, definition, example and IPA:

- English: `trainers` → `trainer`, `chopsticks` → `chopstick`, `crisps` →
  `crisp`, `shutters` → `shutter`, `crowds` → `crowd`.
- Russian: `пельмени` → `пельмень`, `блины` → `блин`, `пирожки` → `пирожок`,
  `родители` → `родитель`, `фрукты` → `фрукт`, `овощи` → `овощ`, `носки` →
  `носок`, `перчатки` → `перчатка`, `волосы` → `волос`.

The Russian food and family plurals are common in everyday usage; the singular
forms are standard but may sound less natural in recipe-style contexts.

## Kept as pluralia tantum

The instruction to keep all pluralia tantum leaves 47 English entries unchanged,
including several that look countable and may deserve reclassification later:

`norms`, `roles`, `emissions`, `sanctions`, `shares`, `skills`, `benefits`,
`responsibilities`, `symptoms`, `casualties`, `utilities`, `fees`, `boundaries`,
`reservations`, `economies`, `liberties`, `principles`, `goals`, `practices`,
`externalities`, `chores`, `calories`, `herbs`, `ingredients`, `spices`,
`neighbors`, `settings`, `fireworks`, `ruins`, `expenses`, `repairs`,
`sneakers`, `rights`, `drums`, `facilities`, `noodles`, `sandals`, and the
clothing/plural-only set.

`en:shows:noun` also remains because it is marked `pluralia_tantum`; its
definition is a verb definition and should be cleaned up separately.
`en:goods:noun` was marked `pluralia_tantum` and its bad `plural_form`
(`goodss`) was removed.

French, Italian, Greek and Russian entries marked `pluralia_tantum` are
unchanged. Some have an existing singular with a different sense (for example
`fr:installations` facilities versus `fr:installation` act of installing), which
is why singularising them would not be a simple rename.

## Not covered

- Languages without a lemmatizer in this pass (`ba`, `br`, `cv`, `hy`, `ka`,
  `tt`) were not automatically scanned for plural headwords. They need a
  language-specific review.
- The rule was applied to single-word nouns. Multi-word entries that contain a
  plural noun remain unchanged.
