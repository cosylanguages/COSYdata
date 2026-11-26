# P21 `-a2` ID review

The quality audit reports 122 entries whose IDs contain `-a2`, for example
`fr:sur-a2:adjective` and `it:guidare-a2:verb`. Every one has a same-word,
same-form base entry, but they are **not all duplicates**:

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
