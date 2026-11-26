# P33 final definition cleanup

P33 fixed the last definitions that only repeated the headword and reclassified two C2 phrases that were stored as verbs.

## Entries updated

- `cv:chavash-en:noun`
- `cv:shupashkar:noun`
- `cv:ulatar:noun`
- `cv:cene-shupashkar:noun`
- `cv:kanash:noun`
- `cv:cemerle:noun`
- `cv:muskav:noun`
- `cv:rossiya:noun`
- `cv:frantsiya:noun`
- `cv:germaniya:noun`
- `cv:volga:noun`
- `tt:kurkynychsyz:adjective`
- `tt:irtange-ashny-ashau:verb`
- `tt:ioklarga-yatu:verb`
- `ba:irtange-ashty-ashau:verb`
- `ba:yoklarga-yatyu:verb`

## Reclassified from verb to noun

- `fr:changement-de-paradigme:verb` → `fr:changement-de-paradigme:noun`
- `it:cambio-di-paradigma:verb` → `it:cambio-di-paradigma:noun`

Both old IDs are recorded in `shared/id-aliases.json`; no remaining references point at the old IDs.

## Sources checked

- Chuvash Wikipedia place articles for the Chuvash names in this batch
- Tatar and Bashkir Wikipedia/Wiktionary entries for the five Tatar/Bashkir entries
- French and Italian Wiktionary entries for `changement de paradigme` and `cambio di paradigma`
- Standard French and Italian grammar for the noun gender and article in the two reclassified phrases

## Result

- Entries: **31,636**
- Findings: **11,747**
- Definitions equal to headword: **0**
- New findings: **0**
