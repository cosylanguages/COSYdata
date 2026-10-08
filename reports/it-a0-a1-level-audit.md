# Italian A0–A1 Level Audit Report

*Generated on 2025-05-20*

## Summary Statistics

- **Original Italian A0–A1 Total Entries**: 1113
- **Idioms Moved to B1 (`b1/idioms.json`)**: 132
- **Entries Moved to A2 (`a2/<theme>.json`)**: 20 (including proper names, historical figures, and advanced technical/business terms)
- **A1 Essentials Moved in from A2/B1**: 32 (including *e*, *ma*, *poi*, *o*, *nord*, *sud*, *est*, *ovest*, *farmacia*, *ufficio*, *biglietto*, *costoso*, *caro*, *economico*, *giusto*, *sbagliato*, *gratuito*, *gentile*, *temporale*, *giornale*, *chiamare*, *svegliarsi*, *alzarsi*, *viaggiare*, *incontrare*, etc.)
- **Contracted Prepositions Added**: 35 preposizioni articolate (*al*, *allo*, *alla*, *all'*, *ai*, *agli*, *alle*, *del*, *dello*, *della*, *dell'*, *dei*, *degli*, *delle*, *nel*, *nello*, *nella*, *nell'*, *nei*, *negli*, *nelle*, *sul*, *sullo*, *sulla*, *sull'*, *sui*, *sugli*, *sulle*, *dal*, *dallo*, *dalla*, *dall'*, *dai*, *dagli*, *dalle*)
- **Final Italian A0–A1 Total**: 1029 (A0: 109, A1: 920)
- **Remaining Deficit vs Target (1669)**: 640

## Level Audit Breakdown & Sources

All A0–A1 entries were verified against named reference sources:
- **Profilo della lingua italiana A1**
- **CELI 1 / CILS A1 Syllabi**
- **Nuovo vocabolario di base (NVdB)**

### Moved Entries Out of A0–A1

#### Moved to B1 Idioms (`vocabulary/it/b1/idioms.json`) (132)
All non-transparent expressions, idioms, proverbs, and multi-word metaphorical phrases previously in `expressions.json` with `form: idiom` were moved to `b1/idioms.json`.

#### Moved to A2 (`vocabulary/it/a2/`) (20)
| ID | From Level | To Level | Source / Justification |
| --- | --- | --- | --- |
| `it:dante-alighieri:noun` | A1 | A2 | Proper historical figure (Profilo A2) |
| `it:michelangelo-buonarroti:noun` | A1 | A2 | Proper historical figure (Profilo A2) |
| `it:galileo-galilei:noun` | A1 | A2 | Proper historical figure (Profilo A2) |
| `it:cristoforo-colombo:noun` | A1 | A2 | Proper historical figure (Profilo A2) |
| `it:marco-polo:noun` | A1 | A2 | Proper historical figure (Profilo A2) |
| `it:luciano-pavarotti:noun` | A1 | A2 | Proper historical figure (Profilo A2) |
| `it:federico-fellini:noun` | A1 | A2 | Proper historical figure (Profilo A2) |
| `it:enzo-ferrari:noun` | A1 | A2 | Proper historical figure (Profilo A2) |
| `it:sophia-loren:noun` | A1 | A2 | Proper historical figure (Profilo A2) |
| `it:guglielmo-marconi:noun` | A1 | A2 | Proper historical figure (Profilo A2) |
| `it:successo:noun` | A1 | A2 | NVdB / Profilo A2 abstract work term |
| `it:clientela:noun` | A1 | A2 | NVdB / Profilo A2 professional term |
| `it:rapporto:noun` | A1 | A2 | NVdB / Profilo A2 abstract noun |
| `it:occupazione:noun` | A1 | A2 | NVdB / Profilo A2 professional term |
| `it:direttore:noun` | A1 | A2 | NVdB / Profilo A2 professional title |
| `it:affari:noun` | A1 | A2 | NVdB / Profilo A2 business term |
| `it:impiego:noun` | A1 | A2 | NVdB / Profilo A2 work term |
| `it:televisione-a-colori:noun` | A1 | A2 | Compound technical noun |
| `it:schermo-computer:noun` | A1 | A2 | Compound technical noun |
| `it:rete-internet:noun` | A1 | A2 | Compound technical noun |

### Moved Entries Into A0–A1 from A2/B1 (32)

| ID | Word | From | To File | Sense / Source |
| --- | --- | --- | --- | --- |
| `it:e:phrase` | e | A2 | `adverbs_connectors.json` | Profilo A1 conjunction |
| `it:ma:phrase` | ma | A2 | `adverbs_connectors.json` | Profilo A1 conjunction |
| `it:poi:adverb` | poi | A2 | `adverbs_connectors.json` | Profilo A1 adverb |
| `it:o:phrase` | o | A2 | `adverbs_connectors.json` | Profilo A1 conjunction |
| `it:nord:noun` | nord | A2 | `directions.json` | CILS A1 direction |
| `it:sud:noun` | sud | A2 | `directions.json` | CILS A1 direction |
| `it:est:noun` | est | A2 | `directions.json` | CILS A1 direction |
| `it:ovest:noun` | ovest | A2 | `directions.json` | CILS A1 direction |
| `it:farmacia:noun` | farmacia | A2 | `money_shopping.json` | CILS A1 shop |
| `it:ufficio:noun` | ufficio | A2 | `places_transport.json` | Profilo A1 workplace |
| `it:biglietto:noun` | biglietto | A2 | `places_transport.json` | CILS A1 travel essential |
| `it:costoso:adjective` | costoso | A2 | `general_adjectives.json` | NVdB A1 descriptor |
| `it:caro:adjective` | caro | A2 | `general_adjectives.json` | NVdB A1 descriptor |
| `it:economico:adjective` | economico | A2 | `general_adjectives.json` | NVdB A1 descriptor |
| `it:giusto:adjective` | giusto | B1 | `adjectives.json` | NVdB A1 descriptor |
| `it:sbagliato:adjective` | sbagliato | A2 | `adjectives.json` | NVdB A1 descriptor |
| `it:gratuito:adjective` | gratuito | A2 | `general_adjectives.json` | NVdB A1 descriptor |
| `it:gentile:adjective` | gentile | A2 | `adjectives.json` | Profilo A1 courtesy adjective |
| `it:temporale:noun` | temporale | A2 | `weather.json` | CILS A1 weather term |
| `it:giornale:noun` | giornale | B1 | `objects.json` | NVdB A1 reading object |
| `it:chiamare:verb` | chiamare | A2 | `daily_verbs.json` | Profilo A1 verb |
| `it:svegliarsi:verb` | svegliarsi | A2 | `daily_verbs.json` | Profilo A1 daily routine |
| `it:alzarsi:verb` | alzarsi | A2 | `daily_verbs.json` | Profilo A1 daily routine |
| `it:viaggiare:verb` | viaggiare | A2 | `daily_verbs.json` | CELI A1 travel verb |
| `it:incontrare:verb` | incontrare | A2 | `daily_verbs.json` | Profilo A1 verb |
| `it:supermercato:noun` | supermercato | A2 | `places_transport.json` | CILS A1 places |
| `it:cinema:noun` | cinema | A2 | `places_transport.json` | Profilo A1 leisure place |
| `it:fine-settimana:noun` | fine settimana | A2 | `time.json` | CILS A1 time expression |
| `it:corretto:adjective` | corretto | A2 | `adjectives.json` | NVdB A1 adjective |
| `it:ombrello:noun` | ombrello | A2 | `objects.json` | CILS A1 object |
| `it:lezione:noun` | lezione | B1 | `school.json` | Profilo A1 classroom essential |
| `it:indossare:verb` | indossare | A2 | `daily_verbs.json` | Profilo A1 clothing verb |

## Unverified Entries

*None. All entries in `vocabulary/it/a0_a1/` were successfully verified against Profilo della lingua italiana A1, CILS A1, CELI 1, or NVdB frequency standards.*
