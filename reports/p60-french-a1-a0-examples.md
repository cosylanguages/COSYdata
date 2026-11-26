# P60 French A0–A1 examples
P60 cleared the French A0–A1 example gap.
## Coverage
- 4 A0 nouns: sol, lampe, jardin, canapé
- 25 A1 adjective phrases in `common_nouns.json`
- 7 A1 colour phrases in `common_nouns.json`
- 33 A1 verb phrases in `common_nouns.json`
- 1 A2 verb: atteindre
## Definition repair
All 65 A1 phrases had an example sentence in `definitions`, not a definition. P60 replaced each with a short French definition and moved the sentence idea to `examples`.
Examples:
- `fr:grand-taille-haut:adjective`: definition `Qui mesure plus que la moyenne.`; example `Mon frère est de grande taille.`
- `fr:marcher-vite:phrase`: definition `Se déplacer à pied à une allure rapide.`; example `Je dois marcher vite pour être à l'heure.`
- `fr:rouge-fonce:adjective`: definition `D'un rouge intense et sombre.`; example `Elle porte une veste rouge foncé.`
## Other fixes
- Added the missing `emoji`, `no_antonym` and `transcription` fields to `fr:sol:noun`.
## Sources checked
- French Wiktionary for spelling and phrase meaning
- Existing French A0–A1 entries for register and sentence length
- The stored definitions for each headword
## Verification
- Every example contains the exact headword.
- All 65 definitions now describe the headword instead of being examples.
## Result
- Entries changed: **70**
- Entries total: **31,499**
- Findings: **8,737** (from 8,807)
- Missing definitions: **0**
- Missing examples: **410**
