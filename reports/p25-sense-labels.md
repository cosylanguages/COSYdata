# P25 sense labels and duplicate merges

P25 merged **31 duplicate entries** and assigned **46 `sense` labels** to true homographs. The strict `(language, word, form, sense)` duplicate count is now **0**.

## Merged duplicates

- `en:algorithm-technology:noun` -> `en:algorithm:noun`
- `en:apodictic-philosophy:adjective` -> `en:apodictic:adjective`
- `en:automation-technology:noun` -> `en:automation:noun`
- `en:consciousness-philosophy:noun` -> `en:consciousness:noun`
- `en:data-breach-technology:noun` -> `en:data-breach:noun`
- `en:empiricism-philosophy:noun` -> `en:empiricism:noun`
- `en:encryption-technology:noun` -> `en:encryption:noun`
- `en:epistemological-philosophy:adjective` -> `en:epistemological:adjective`
- `en:epistemology-philosophy:noun` -> `en:epistemology:noun`
- `en:ethics-philosophy:noun` -> `en:ethics:noun`
- `en:firewall-technology:noun` -> `en:firewall:noun`
- `en:hermeneutics-philosophy:noun` -> `en:hermeneutics:noun`
- `en:machine-learning-technology:noun` -> `en:machine-learning:noun`
- `en:malware-technology:noun` -> `en:malware:noun`
- `en:neural-network-technology:noun` -> `en:neural-network:noun`
- `en:noumenon-philosophy:noun` -> `en:noumenon:noun`
- `en:phishing-technology:noun` -> `en:phishing:noun`
- `en:two-factor-authentication-technology:noun` -> `en:two-factor-authentication:noun`
- `en:utilitarianism-philosophy:noun` -> `en:utilitarianism:noun`
- `fr:boite-carton:noun` -> `fr:boite:noun`
- `fr:bouteille-eau:noun` -> `fr:bouteille:noun`
- `fr:depuis-duree:preposition` -> `fr:depuis:preposition`
- `fr:infirmier-1:noun` -> `fr:infirmier:noun`
- `fr:internet-web:noun` -> `fr:internet:noun`
- `fr:montre-poignet:noun` -> `fr:montre:noun`
- `fr:mot-de-passe-sec:noun` -> `fr:mot-de-passe:noun`
- `fr:pause-recreation:noun` -> `fr:pause:noun`
- `fr:portefeuille-poche:noun` -> `fr:portefeuille:noun`
- `fr:regarder-la-tele:phrase` -> `fr:regarder-la-television:phrase`
- `fr:site-internet:noun` -> `fr:site-web:noun`
- `fr:valise-voyage:noun` -> `fr:valise:noun`

## Sense labels

- `br:meurzh-miz:noun` -> `march`
- `br:meurzh:noun` -> `tuesday`
- `en:agency-sociology-structures-c1:noun` -> `sociology`
- `en:agency:noun` -> `business`
- `en:challenge-language:verb` -> `question`
- `en:challenge:verb` -> `test`
- `fr:bureau-travail:noun` -> `office`
- `fr:bureau:noun` -> `desk`
- `fr:glace-meteo:noun` -> `ice`
- `fr:glace:noun` -> `ice_cream`
- `fr:piece-monnaie:noun` -> `coin`
- `fr:piece:noun` -> `room`
- `fr:porter-vetement:verb` -> `wear`
- `fr:porter:verb` -> `carry`
- `fr:se-lever-routine:verb` -> `get_up`
- `fr:se-lever:verb` -> `rise`
- `fr:sol-terre:noun` -> `soil`
- `fr:sol:noun` -> `ground`
- `it:aprire-sbloccare:verb` -> `unlock`
- `it:aprire:verb` -> `open`
- `it:conoscenza-persona:noun` -> `acquaintance`
- `it:conoscenza-sapere:noun` -> `knowledge`
- `it:da-tempo:preposition` -> `time`
- `it:da:preposition` -> `origin`
- `it:molto-quantificatore:adverb` -> `quantity`
- `it:molto:adverb` -> `degree`
- `it:orologio-polso:noun` -> `wristwatch`
- `it:orologio:noun` -> `clock`
- `it:perche-causa:phrase` -> `cause`
- `it:perche:phrase` -> `question`
- `it:presto-a-breve:adverb` -> `soon`
- `it:presto:adverb` -> `early`
- `it:provare-tentare:verb` -> `attempt`
- `it:provare:verb` -> `try_on`
- `it:salvare-soccorrere:verb` -> `rescue`
- `it:salvare:verb` -> `save`
- `ru:kuritsa-anim:noun` -> `animal`
- `ru:kuritsa:noun` -> `food`
- `ru:mir-country:noun` -> `world`
- `ru:mir-peace:noun` -> `peace`
- `ru:perets-veg:noun` -> `vegetable`
- `ru:perets:noun` -> `spice`
- `ru:ryba-anim:noun` -> `animal`
- `ru:ryba:noun` -> `food`
- `tt:mai:noun` -> `oil`
- `tt:may:noun` -> `month`

## Rules used

- Same meaning in two records: merge into the clearer, richer entry and alias the retired ID.
- Different meanings sharing a word/form: keep both records and assign distinct `sense` slugs.
- Senses are lowercase kebab-case to satisfy the schema.
- No definitions, examples or forms were invented for the merge-only records; the one empty `fr:sol` record and the one empty `it:orologio` record received their basic dictionary definitions.
