# P24 duplicate merges

P24 removed **43 duplicate entries** and redirected their IDs through `shared/id-aliases.json`. The merge map:

- `ba:yasau:verb` -> `ba:yahau:verb`
- `el:anelkystiras-elevator:noun` -> `el:anelkystiras:noun`
- `el:aygoystos:noun` -> `el:avgoustos:noun`
- `el:dekemvrios:noun` -> `el:dekembrios:noun`
- `el:fevroyarios:noun` -> `el:fevrouarios:noun`
- `el:ianoyarios:noun` -> `el:ianouarios:noun`
- `el:ioylios:noun` -> `el:ioulios:noun`
- `el:ioynios:noun` -> `el:iounios:noun`
- `el:noemvrios:noun` -> `el:noembrios:noun`
- `el:piroyni:noun` -> `el:pironi:noun`
- `el:savvato:noun` -> `el:sabbato:noun`
- `el:septemvrios:noun` -> `el:septembrios:noun`
- `en:determinism-philosophy:noun` -> `en:determinism:noun`
- `en:dialectic-philosophy:noun` -> `en:dialectic:noun`
- `en:existentialism-philosophy:noun` -> `en:existentialism:noun`
- `en:fallacy-philosophy:noun` -> `en:fallacy:noun`
- `en:free-will-philosophy:noun` -> `en:free-will:noun`
- `en:morality-philosophy:noun` -> `en:morality:noun`
- `en:ontology-philosophy:noun` -> `en:ontology:noun`
- `en:phenomenology-philosophy:noun` -> `en:phenomenology:noun`
- `en:solipsism-philosophy:noun` -> `en:solipsism:noun`
- `fr:ascenseur-elevator:noun` -> `fr:ascenseur:noun`
- `fr:radio-ecouter:noun` -> `fr:radio:noun`
- `fr:ticket-de-caisse:noun` -> `fr:ticket-caisse:noun`
- `it:ascensore-elevator:noun` -> `it:ascensore:noun`
- `ka:kitkhva:verb` -> `ka:kitkva:verb`
- `ka:satsiroeba:verb` -> `ka:sachiroeba:verb`
- `ka:thqma:verb` -> `ka:tkma:verb`
- `ka:tskovreba:verb` -> `ka:tskhovreba:verb`
- `pt:alemanha-1:noun` -> `pt:alemanha:noun`
- `pt:berlim-1:noun` -> `pt:berlim:noun`
- `pt:canada-1:noun` -> `pt:canada:noun`
- `pt:egito-1:noun` -> `pt:egito:noun`
- `ru:bol-nitsa:noun` -> `ru:bolnitsa:noun`
- `ru:bol-noi:adjective` -> `ru:bolnoi:adjective`
- `ru:dostupnyy:adjective` -> `ru:dostupnyi:adjective`
- `ru:lift-elevator:noun` -> `ru:lift:noun`
- `ru:pis-mennyi-stol:noun` -> `ru:pismennyi-stol:noun`
- `ru:pismennyy-stol:noun` -> `ru:pismennyi-stol:noun`
- `ru:plat-e:noun` -> `ru:platye:noun`
- `ru:rayon:noun` -> `ru:raion:noun`
- `ru:sil-nyi:adjective` -> `ru:silnyi:adjective`
- `ru:zdaniye:noun` -> `ru:zdanie:noun`

## Rules used

- Only groups sharing `(language, word, form)` were considered.
- Exact-definition duplicate pairs were merged into the richer entry.
- Empty or transliteration-only variants were merged only where the meaning was the same.
- Distinct senses with different definitions were left separate; they are for the next duplicate pass.
- Natural examples were combined; template examples and headword-only definitions were not copied into survivors.
- Greek calendar entries inside `a0_a1/calendar.json` were kept as the survivors because `seasons.months.days.json` and `build-comparative.cjs` read that file.
