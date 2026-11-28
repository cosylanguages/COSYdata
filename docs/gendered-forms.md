# Gendered adjective forms

Adjectives in French, Italian, Russian and Greek change with the gender (and
number) of the noun. The headword is the form cited in dictionaries: masculine
singular for French, Italian and Russian; masculine nominative singular for
Greek.

The schema already has the fields, so no dotted notation is stored. Write the
full form, not `content.e` or `italien.ne`:

| Field | Meaning | French example | Italian example |
| --- | --- | --- | --- |
| headword `word` | masculine singular | `content` | `italiano` |
| `feminine` | feminine singular | `contente` | `italiana` |
| `masculine_plural` | masculine plural | `contents` | `italiani` |
| `feminine_plural` | feminine plural | `contentes` | `italiane` |

Russian adjectives add `feminine`, `neuter` and one `plural_form` (the plural is
the same for all genders). Greek adjectives add `feminine`, `neuter`,
`masculine_plural`, `feminine_plural` and `neuter_plural`.

## Rules

- Add the fields only to `form: "adjective"` entries. A gendered **noun**
  (`acteur` / `actrice`, `attore` / `attrice`) is a different lexeme and gets its
  own entry, not a field on the masculine one.
- Invariable adjectives repeat the same form: Italian `indipendente` →
  `feminine: "indipendente"`, `feminine_plural: "indipendenti"`.
- Do not invent forms. Check the infinitive/declension in a dictionary
  (Larousse, Le Robert, Treccani, Garzanti, Ozhegov, Babiniotis) or the official
  grammar. Doubtful forms go to `reports/needs-review/`.
- The fields describe nominative forms only. Case forms, comparatives and
  superlatives stay in their own fields.
- `npm run validate` checks that the fields are strings; a reviewer checks the
  linguistics.

## First pass

All B1 and B2 adjectives in French, Italian, Russian and Greek now carry the
forms their language needs. A0–A2 adjectives are filled gradually; the largest
existing block is Russian A2, which already had `feminine` and `neuter`.
