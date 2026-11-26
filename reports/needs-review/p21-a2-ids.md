# P21/P22 `-a2` ID review

Status: **resolved in P22**. The 122 IDs were reviewed, then nine distinct
senses were renamed with a semantic ID and `sense` value, and 113 level
variants were merged into their base entries. No `-a2` IDs remain.

P21 established that they were **not safe to merge blindly**:

- `fr:billet` base = transport ticket; `fr:billet-a2` = banknote.
- `fr:gagner` base = win; `fr:gagner-a2` = earn.
- `it:guidare` base = drive; `it:guidare-a2` = lead a group.
- `fr:sur` base = safe; `fr:sur-a2` = convinced.
- Other pairs are near-synonymous level variants, and some duplicate
  definitions are only the word itself (`fr:vin-a2`, `it:riso-a2`,
  `ru:syr-a2`) or use the template example `Il utilise l'expression …`.

Removing the `-a2` entries would delete real senses and A2 coverage. They need
a semantic `sense` value and a descriptive ID (`fr:billet-banknote:noun`,
`fr:gagner-earn:verb`, etc.) before the suffix can be retired. Until then they
remain accepted debt and are not safe to merge automatically.

## P22 outcome

Renamed distinct senses: `fr:attendre-expect`, `fr:sur-certain`,
`fr:billet-banknote`, `fr:gagner-earn`, `it:guidare-lead`,
`it:bilancio-budget`, `it:scoprire-learn`, `it:richiedere-need` and
`it:raggiungere-arrive`.

Merged level variants: the remaining 113 entries were removed and their old
IDs now resolve to the base entry through `shared/id-aliases.json`. The base
entries gained `A2` in `levels`, and missing definitions/examples where the
duplicate had the only usable content.
