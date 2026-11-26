# P21 French phrase IPA review

## Fixed

Six French phrase transcriptions used an underscore as a word separator, which is
not valid IPA:

| Entry | Old | New |
|---|---|---|
| `fr:monter-etage:phrase` | `/mɔ̃.te a l_e.taʒ/` | `/mɔ̃.te a l‿e.taʒ/` |
| `fr:arriver-heure:phrase` | `/a.ʁi.ve a l_œʁ/` | `/a.ʁi.ve a l‿œʁ/` |
| `fr:cacher-objet:phrase` | `/ka.ʃe œ̃ n_ɔb.ʒɛ/` | `/ka.ʃe œ̃.n‿ɔb.ʒɛ/` |
| `fr:apporter-aide:phrase` | `/a.pɔʁ.te də l_ɛd/` | `/a.pɔʁ.te də l‿ɛd/` |
| `fr:gagner-argent:phrase` | `/ɡa.ɲe də l_aʁ.ʒɑ̃/` | `/ɡa.ɲe də l‿aʁ.ʒɑ̃/` |
| `fr:boire-eau:phrase` | `/bwaʁ də l_o/` | `/bwaʁ də l‿o/` |

## Still unresolved

`vocabulary/fr/a0_a1/common_nouns.json` contains **126 phrase entries whose
transcription is only the ID slug**, for example `/avoir-faim/`, `/d-accord/`
and `/en-ville/`. These are pseudo-transcriptions and are included in the
quality baseline.

Sources checked:

- `fr.wiktionary.org` has pages for some phrases (`avoir faim`, `avoir soif`,
  `avoir peur`, `avoir l'air`, `avoir envie de`, `avoir de la chance`,
  `avoir le temps`) but not for many others (`avoir chaud`, `avoir froid`,
  `avoir besoin`, `avoir mal à`, `avoir hâte de`, `être en avance`).
- `en.wiktionary.org` has generated French IPA for some of those pages but not
  every phrase.
- Bulk `action=query&export=1` cannot return the generated `{{fr-IPA}}` output
  as text, and the API rate-limited repeated page parses.

They need one-by-one dictionary or native-speaker verification before being
replaced. No guessed IPA was added.
