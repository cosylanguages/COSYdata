# Theme, Domain, and Regional Variants Audit Report

## Executive Summary

This audit evaluates the entire English dataset (`vocabulary/en/`) across **7,393 vocabulary entries** in all six CEFR level directories (`a0_a1`, `a2`, `b1`, `b2`, `c1`, `c2`).

This task is **audit-only** — no vocabulary files have been modified.

### Audit Summary Counts Table

| Audit Category | Total Flagged Count | Description / Notes |
| :--- | :---: | :--- |
| **1. Theme Accuracy** | **54** | Entries whose `theme` JSON field value mismatches the true semantic meaning of the word. |
| **2. Domain Accuracy** | **15** | Entries whose `domain` field (`general`, `spoken`, `general, spoken`) is inconsistent with word register. |
| &nbsp;&nbsp;↳ *Formal / Academic tagged "spoken" only* | 0 | Highly formal, written, or academic register terms incorrectly assigned `domain: "spoken"`. |
| &nbsp;&nbsp;↳ *Conversational / Idiomatic tagged "general" only* | 15 | Everyday spoken expressions or idioms tagged `domain: "general"` without `spoken`. |
| **3. Regional Lexical Variants** | **123** | Total regional lexical and spelling variant findings across 3 sub-categories. |
| &nbsp;&nbsp;↳ *(a) Both words exist as separate entries* | **24** | Both regional terms exist in dataset with matching part-of-speech; need `regional_equivalents` links & `region` tags. |
| &nbsp;&nbsp;↳ *(b) Only one side exists as an entry* | **24** | One side exists in dataset; counterpart term is missing and recommended for addition. |
| &nbsp;&nbsp;↳ *(c) Region-ambiguous / untagged spelling* | **75** | Entries with distinct UK/US regional spelling lacking a `region` tag. |

---

## 1. Theme Accuracy

For each entry, its `theme` value was audited against what the word actually means.

### Overview of Identified Patterns:
1. **`animals.json` Mismatches**: Non-animal entries stored in `animals.json` tagged with `theme: "animals"` instead of their true semantic theme (`weather` or `nature`).
2. **`environment.json` Mismatches**: Non-environmental terms assigned misfit theme tags (e.g. `headline` tagged `communication`, `reporter` and `mayor` tagged `work`).
3. **`media.json` Mismatches**: Traditional journalism and publishing terms tagged with `theme: "technology"` instead of `theme: "media"`.

### Level: A0 / A1 (Beginner / Elementary) (a0_a1)

#### File: `animals.json` (39 flagged)

| Entry ID | Word | Current Theme | Suggested Theme | Reason / Notes |
| :--- | :--- | :--- | :--- | :--- |
| `en:weather:noun` | **weather** | `animals` | `weather` | Weather/astronomy term |
| `en:moon:noun` | **moon** | `animals` | `weather` | Weather/astronomy term |
| `en:tree:noun` | **tree** | `animals` | `nature` | Flora/landscape term |
| `en:stone:noun` | **stone** | `animals` | `nature` | Flora/landscape term |
| `en:cloud:noun` | **cloud** | `animals` | `weather` | Weather/astronomy term |
| `en:flower:noun` | **flower** | `animals` | `nature` | Flora/landscape term |
| `en:grass:noun` | **grass** | `animals` | `nature` | Flora/landscape term |
| `en:leaf:noun` | **leaf** | `animals` | `nature` | Flora/landscape term |
| `en:leaves:noun` | **leaves** | `animals` | `nature` | Flora/landscape term |
| `en:forest:noun` | **forest** | `animals` | `nature` | Flora/landscape term |
| `en:wood:noun` | **wood** | `animals` | `nature` | Flora/landscape term |
| `en:mountain:noun` | **mountain** | `animals` | `nature` | Flora/landscape term |
| `en:hill:noun` | **hill** | `animals` | `nature` | Flora/landscape term |
| `en:river:noun` | **river** | `animals` | `nature` | Flora/landscape term |
| `en:lake:noun` | **lake** | `animals` | `nature` | Flora/landscape term |
| `en:sea:noun` | **sea** | `animals` | `nature` | Flora/landscape term |
| `en:ocean:noun` | **ocean** | `animals` | `nature` | Flora/landscape term |
| `en:beach:noun` | **beach** | `animals` | `nature` | Flora/landscape term |
| `en:island:noun` | **island** | `animals` | `nature` | Flora/landscape term |
| `en:sky:noun` | **sky** | `animals` | `weather` | Weather/astronomy term |
| `en:sun:noun` | **sun** | `animals` | `weather` | Weather/astronomy term |
| `en:star:noun` | **star** | `animals` | `weather` | Weather/astronomy term |
| `en:rain:noun` | **rain** | `animals` | `weather` | Weather/astronomy term |
| `en:snow:noun` | **snow** | `animals` | `weather` | Weather/astronomy term |
| `en:wind:noun` | **wind** | `animals` | `weather` | Weather/astronomy term |
| `en:storm:noun` | **storm** | `animals` | `weather` | Weather/astronomy term |
| `en:hot:adjective` | **hot** | `animals` | `weather` | Weather/astronomy term |
| `en:cold:adjective` | **cold** | `animals` | `weather` | Weather/astronomy term |
| `en:warm:adjective` | **warm** | `animals` | `weather` | Weather/astronomy term |
| `en:cool:adjective` | **cool** | `animals` | `weather` | Weather/astronomy term |
| `en:sunny:adjective` | **sunny** | `animals` | `weather` | Weather/astronomy term |
| `en:rainy:adjective` | **rainy** | `animals` | `weather` | Weather/astronomy term |
| `en:cloudy:adjective` | **cloudy** | `animals` | `weather` | Weather/astronomy term |
| `en:windy:adjective` | **windy** | `animals` | `weather` | Weather/astronomy term |
| `en:snowy:adjective` | **snowy** | `animals` | `weather` | Weather/astronomy term |
| `en:earth:noun` | **earth** | `animals` | `nature` | Flora/landscape term |
| `en:nature:noun` | **nature** | `animals` | `nature` | Flora/landscape term |
| `en:rock:noun` | **rock** | `animals` | `nature` | Flora/landscape term |
| `en:sand:noun` | **sand** | `animals` | `nature` | Flora/landscape term |

### Level: A2 (Elementary) (a2)

#### File: `environment.json` (3 flagged)

| Entry ID | Word | Current Theme | Suggested Theme | Reason / Notes |
| :--- | :--- | :--- | :--- | :--- |
| `en:headline:noun` | **headline** | `communication` | `media` | Media publishing term |
| `en:reporter:noun` | **reporter** | `work` | `media` | Journalism term |
| `en:mayor:noun` | **mayor** | `work` | `politics` | Political office term |

#### File: `media.json` (12 flagged)

| Entry ID | Word | Current Theme | Suggested Theme | Reason / Notes |
| :--- | :--- | :--- | :--- | :--- |
| `en:article:noun` | **article** | `technology` | `media` | Media/journalism term |
| `en:channel:noun` | **channel** | `technology` | `media` | Media/journalism term |
| `en:program:noun` | **program** | `technology` | `media` | Media/journalism term |
| `en:programme:noun` | **programme** | `technology` | `media` | Media/journalism term |
| `en:advertisement:noun` | **advertisement** | `technology` | `media` | Media/journalism term |
| `en:advert:noun` | **advert** | `technology` | `media` | Media/journalism term |
| `en:commercial:noun` | **commercial** | `technology` | `media` | Media/journalism term |
| `en:subscribe:verb` | **subscribe** | `technology` | `media` | Media/journalism term |
| `en:follow:verb` | **follow** | `technology` | `media` | Media/journalism term |
| `en:comment:verb` | **comment** | `technology` | `media` | Media/journalism term |
| `en:profile:noun` | **profile** | `technology` | `media` | Media/journalism term |
| `en:subscriber:noun` | **subscriber** | `technology` | `media` | Media/journalism term |

---

## 2. Domain Accuracy

The `domain` field strictly takes one of: `"general"`, `"spoken"`, or `"general, spoken"`.

### Overview of Identified Patterns:
1. **Formal/Academic Terms Tagged "spoken" Only**: Formal public-speaking transitions, academic rhetoric phrases, legal terms, and sociological concepts tagged with `domain: "spoken"` without belonging to everyday spoken register. These should be set to `domain: "general"`.
2. **Everyday Idioms & Spoken Expressions Tagged "general" Only**: Everyday spoken expressions and idioms tagged `domain: "general"` without including `spoken`. These should be updated to `domain: "general, spoken"` or `domain: "spoken"`.

### Level: B1 (Intermediate) (b1)

#### File: `idioms.json` (2 flagged)

| Entry ID | Word | Current Domain | Suggested Domain | Reason / Notes |
| :--- | :--- | :--- | :--- | :--- |
| `en:not-in-the-least:phrase` | **not in the least** | `general` | `general, spoken` | Everyday conversational/spoken item tagged "general" only |
| `en:out-of-the-blue:phrase` | **out of the blue** | `general` | `general, spoken` | Everyday conversational/spoken item tagged "general" only |

### Level: B2 (Upper Intermediate) (b2)

#### File: `collocations.json` (2 flagged)

| Entry ID | Word | Current Domain | Suggested Domain | Reason / Notes |
| :--- | :--- | :--- | :--- | :--- |
| `en:strike-a-balance:phrase` | **strike a balance** | `general` | `general, spoken` | Everyday conversational/spoken item tagged "general" only |
| `en:in-retrospect:phrase` | **in retrospect** | `general` | `general, spoken` | Everyday conversational/spoken item tagged "general" only |

#### File: `idioms.json` (1 flagged)

| Entry ID | Word | Current Domain | Suggested Domain | Reason / Notes |
| :--- | :--- | :--- | :--- | :--- |
| `en:throw-in-the-towel:phrase` | **throw in the towel** | `general` | `general, spoken` | Everyday conversational/spoken item tagged "general" only |

#### File: `linking_words.json` (1 flagged)

| Entry ID | Word | Current Domain | Suggested Domain | Reason / Notes |
| :--- | :--- | :--- | :--- | :--- |
| `en:with-regard-to:phrase` | **with regard to** | `general` | `general, spoken` | Everyday conversational/spoken item tagged "general" only |

### Level: C1 (Advanced) (c1)

#### File: `collocations.json` (2 flagged)

| Entry ID | Word | Current Domain | Suggested Domain | Reason / Notes |
| :--- | :--- | :--- | :--- | :--- |
| `en:pave-the-way:phrase` | **pave the way** | `general` | `general, spoken` | Everyday conversational/spoken item tagged "general" only |
| `en:set-a-precedent:phrase` | **set a precedent** | `general` | `general, spoken` | Everyday conversational/spoken item tagged "general" only |

#### File: `idioms.json` (1 flagged)

| Entry ID | Word | Current Domain | Suggested Domain | Reason / Notes |
| :--- | :--- | :--- | :--- | :--- |
| `en:beat-around-the-bush:phrase` | **beat around the bush** | `general` | `general, spoken` | Everyday conversational/spoken item tagged "general" only |

### Level: C2 (Proficient) (c2)

#### File: `idioms.json` (6 flagged)

| Entry ID | Word | Current Domain | Suggested Domain | Reason / Notes |
| :--- | :--- | :--- | :--- | :--- |
| `en:a-leopard-cannot-change-its-spots:phrase` | **a leopard cannot change its spots** | `general` | `general, spoken` | Everyday conversational/spoken item tagged "general" only |
| `en:fit-for-purpose:phrase` | **fit for purpose** | `general` | `general, spoken` | Everyday conversational/spoken item tagged "general" only |
| `en:poetic-justice:phrase` | **poetic justice** | `general` | `general, spoken` | Everyday conversational/spoken item tagged "general" only |
| `en:rub-salt-in-the-wound:phrase` | **rub salt in the wound** | `general` | `general, spoken` | Everyday conversational/spoken item tagged "general" only |
| `en:skate-on-thin-ice:phrase` | **skate on thin ice** | `general` | `general, spoken` | Everyday conversational/spoken item tagged "general" only |
| `en:the-writing-on-the-wall:phrase` | **the writing on the wall** | `general` | `general, spoken` | Everyday conversational/spoken item tagged "general" only |

---

## 3. Regional Lexical Variants

This section identifies UK, US, CA, AU, and NZ regional lexical differences and regional spelling variants across the dataset.

### (a) BOTH Words Already Exist as Separate Entries
These entries represent existing paired regional terms in the dataset with matching part of speech. They require a metadata fix: linking each other via `regional_equivalents` and assigning the proper `region` tag (`["UK"]`, `["US"]`, etc.).

| UK Entry ID | UK Word | US Entry ID | US Word | Recommended Fix |
| :--- | :--- | :--- | :--- | :--- |
| `en:flat:noun` | **flat** | `en:apartment:noun` | **apartment** | Link via `regional_equivalents` & add `region` tags (`UK` / `US`) |
| `en:car-park:noun` | **car park** | `en:parking-lot:noun` | **parking lot** | Link via `regional_equivalents` & add `region` tags (`UK` / `US`) |
| `en:biscuit:noun` | **biscuit** | `en:cookie:noun` | **cookie** | Link via `regional_equivalents` & add `region` tags (`UK` / `US`) |
| `en:takeaway:noun` | **takeaway** | `en:takeout:noun` | **takeout** | Link via `regional_equivalents` & add `region` tags (`UK` / `US`) |
| `en:starter:noun` | **starter** | `en:appetizer:noun` | **appetizer** | Link via `regional_equivalents` & add `region` tags (`UK` / `US`) |
| `en:trousers:noun` | **trousers** | `en:pants:noun` | **pants** | Link via `regional_equivalents` & add `region` tags (`UK` / `US`) |
| `en:jumper:noun` | **jumper** | `en:sweater:noun` | **sweater** | Link via `regional_equivalents` & add `region` tags (`UK` / `US`) |
| `en:pyjamas:noun` | **pyjamas** | `en:pajamas:noun` | **pajamas** | Link via `regional_equivalents` & add `region` tags (`UK` / `US`) |
| `en:underground:noun` | **underground** | `en:subway:noun` | **subway** | Link via `regional_equivalents` & add `region` tags (`UK` / `US`) |
| `en:crossroads:noun` | **crossroads** | `en:intersection:noun` | **intersection** | Link via `regional_equivalents` & add `region` tags (`UK` / `US`) |
| `en:pavement:noun` | **pavement** | `en:sidewalk:noun` | **sidewalk** | Link via `regional_equivalents` & add `region` tags (`UK` / `US`) |
| `en:motorway:noun` | **motorway** | `en:highway:noun` | **highway** | Link via `regional_equivalents` & add `region` tags (`UK` / `US`) |
| `en:shop:noun` | **shop** | `en:store:noun` | **store** | Link via `regional_equivalents` & add `region` tags (`UK` / `US`) |
| `en:note:noun` | **note** | `en:bill:noun` | **bill** | Link via `regional_equivalents` & add `region` tags (`UK` / `US`) |
| `en:booking:noun` | **booking** | `en:reservation:noun` | **reservation** | Link via `regional_equivalents` & add `region` tags (`UK` / `US`) |
| `en:holiday:noun` | **holiday** | `en:vacation:noun` | **vacation** | Link via `regional_equivalents` & add `region` tags (`UK` / `US`) |
| `en:autumn:noun` | **autumn** | `en:fall:noun` | **fall** | Link via `regional_equivalents` & add `region` tags (`UK` / `US`) |
| `en:film:noun` | **film** | `en:movie:noun` | **movie** | Link via `regional_equivalents` & add `region` tags (`UK` / `US`) |
| `en:cinema:noun` | **cinema** | `en:movie-theater:noun` | **movie theater** | Link via `regional_equivalents` & add `region` tags (`UK` / `US`) |
| `en:timetable:noun` | **timetable** | `en:schedule:noun` | **schedule** | Link via `regional_equivalents` & add `region` tags (`UK` / `US`) |
| `en:maths:noun` | **maths** | `en:math:noun` | **math** | Link via `regional_equivalents` & add `region` tags (`UK` / `US`) |
| `en:football:noun` | **football** | `en:soccer:noun` | **soccer** | Link via `regional_equivalents` & add `region` tags (`UK` / `US`) |
| `en:rubbish:noun` | **rubbish** | `en:garbage:noun` | **garbage** | Link via `regional_equivalents` & add `region` tags (`UK` / `US`) |
| `en:mum:noun` | **mum** | `en:mom:noun` | **mom** | Link via `regional_equivalents` & add `region` tags (`UK` / `US`) |

### (b) ONLY ONE Side Currently Exists as an Entry
Only one side of the regional pair exists in the dataset. Adding a new entry is a broader content decision, so these missing counterparts are flagged for review.

| Existing Entry ID | Existing Word | Existing Region | Missing Regional Counterpart | Missing Region |
| :--- | :--- | :---: | :--- | :---: |
| `en:apartment-building:noun` | **apartment building** | `US` | **block of flats** | `UK` |
| `en:soda:noun` | **soda** | `US` | **fizzy drink** | `UK` |
| `en:main-course:noun` | **main course** | `UK` | **entrée** | `US` |
| `en:dessert:noun` | **dessert** | `US` | **pudding** | `UK` |
| `en:gas:noun` | **gas** | `US` | **petrol** | `UK` |
| `en:truck:noun` | **truck** | `US` | **lorry** | `UK` |
| `en:subway:noun` | **subway** | `US` | **tube** | `UK` |
| `en:crosswalk:noun` | **crosswalk** | `US` | **zebra crossing** | `UK` |
| `en:roundabout:noun` | **roundabout** | `UK` | **traffic circle** | `US` |
| `en:shoulder:noun` | **shoulder** | `US` | **verge** | `UK` |
| `en:motorway:noun` | **motorway** | `UK` | **freeway** | `US` |
| `en:bill:noun` | **bill** | `UK` | **check** | `US` |
| `en:bill:noun` | **bill** | `US` | **banknote** | `UK` |
| `en:atm:noun` | **ATM** | `US` | **cash machine** | `UK` |
| `en:atm:noun` | **ATM** | `US` | **cashpoint** | `UK` |
| `en:chemist:noun` | **chemist** | `UK` | **drugstore** | `US` |
| `en:pharmacy:noun` | **pharmacy** | `UK` | **drugstore** | `US` |
| `en:post:noun` | **post** | `UK` | **mail** | `US` |
| `en:zip-code:noun` | **zip code** | `US` | **postcode** | `UK` |
| `en:mobile:noun` | **mobile** | `UK` | **cell phone** | `US` |
| `en:mobile-phone:noun` | **mobile phone** | `UK` | **cell phone** | `US` |
| `en:line:noun` | **line** | `US` | **queue** | `UK` |
| `en:eraser:noun` | **eraser** | `US` | **rubber** | `UK` |
| `en:rubbish:noun` | **rubbish** | `UK` | **trash** | `US` |

### (c) Region-Ambiguous or Untagged Regional Spelling
Single entries that use distinct regional spelling (e.g. UK `-our`, `-ise`, `-re`, double-`l`, or US `-or`, `-er`, single-`l`) but currently lack a `region` tag.

#### Level: A0 / A1 (Beginner / Elementary) (a0_a1)

| Entry ID | Word | Spelling Type | Recommended Region Tag | Regional Counterpart |
| :--- | :--- | :--- | :---: | :--- |
| `en:apologize:verb` | **apologize** | -ize spelling | `["US/Oxford"]` | **apologise** |
| `en:colour:noun` | **colour** | -our (UK spelling) | `["UK"]` | **color** |
| `en:traveling:noun` | **traveling** | single-l (US spelling) | `["US"]` | **travelling** |

#### Level: A2 (Elementary) (a2)

| Entry ID | Word | Spelling Type | Recommended Region Tag | Regional Counterpart |
| :--- | :--- | :--- | :---: | :--- |
| `en:behaviour:noun` | **behaviour** | -our (UK spelling) | `["UK"]` | **behavior** |
| `en:flavour:noun` | **flavour** | -our (UK spelling) | `["UK"]` | **flavor** |
| `en:memorize:verb` | **memorize** | -ize spelling | `["US/Oxford"]` | **memorise** |
| `en:sympathize:verb` | **sympathize** | -ize spelling | `["US/Oxford"]` | **sympathise** |
| `en:apologise:verb` | **apologise** | -ise (UK spelling) | `["UK"]` | **apologize** |
| `en:rumour:noun` | **rumour** | -our (UK spelling) | `["UK"]` | **rumor** |

#### Level: B1 (Intermediate) (b1)

| Entry ID | Word | Spelling Type | Recommended Region Tag | Regional Counterpart |
| :--- | :--- | :--- | :---: | :--- |
| `en:globalisation:noun` | **globalisation** | -isation (UK spelling) | `["UK"]` | **globalization** |
| `en:globalization:noun` | **globalization** | -ization (US spelling) | `["US"]` | **globalisation** |
| `en:criticize:verb` | **criticize** | -ize spelling | `["US/Oxford"]` | **criticise** |
| `en:modernize:verb` | **modernize** | -ize spelling | `["US/Oxford"]` | **modernise** |
| `en:centre:noun` | **centre** | -re (UK spelling) | `["UK"]` | **center** |

#### Level: B2 (Upper Intermediate) (b2)

| Entry ID | Word | Spelling Type | Recommended Region Tag | Regional Counterpart |
| :--- | :--- | :--- | :---: | :--- |
| `en:comprise:verb` | **comprise** | -ise (UK spelling) | `["UK"]` | **comprize** |
| `en:prioritize:verb` | **prioritize** | -ize spelling | `["US/Oxford"]` | **prioritise** |
| `en:prioritise:verb` | **prioritise** | -ise (UK spelling) | `["UK"]` | **prioritize** |
| `en:utilize:verb` | **utilize** | -ize spelling | `["US/Oxford"]` | **utilise** |
| `en:utilise:verb` | **utilise** | -ise (UK spelling) | `["UK"]` | **utilize** |
| `en:downsize:noun` | **downsize** | -ize spelling | `["US/Oxford"]` | **downsise** |
| `en:rigour:noun` | **rigour** | -our (UK spelling) | `["UK"]` | **rigor** |
| `en:homogenization:noun` | **homogenization** | -ization (US spelling) | `["US"]` | **homogenisation** |
| `en:homogenisation:noun` | **homogenisation** | -isation (UK spelling) | `["UK"]` | **homogenization** |
| `en:commercialization:noun` | **commercialization** | -ization (US spelling) | `["US"]` | **commercialisation** |
| `en:commercialisation:noun` | **commercialisation** | -isation (UK spelling) | `["UK"]` | **commercialization** |
| `en:naturalization:noun` | **naturalization** | -ization (US spelling) | `["US"]` | **naturalisation** |
| `en:naturalisation:noun` | **naturalisation** | -isation (UK spelling) | `["UK"]` | **naturalization** |
| `en:hypothesize:verb` | **hypothesize** | -ize spelling | `["US/Oxford"]` | **hypothesise** |
| `en:generalization:verb` | **generalization** | -ization (US spelling) | `["US"]` | **generalisation** |
| `en:generalisation:verb` | **generalisation** | -isation (UK spelling) | `["UK"]` | **generalization** |
| `en:generalize:phrase` | **generalize** | -ize spelling | `["US/Oxford"]` | **generalise** |
| `en:rationalize:noun` | **rationalize** | -ize spelling | `["US/Oxford"]` | **rationalise** |
| `en:optimize:verb` | **optimize** | -ize spelling | `["US/Oxford"]` | **optimise** |
| `en:optimise:verb` | **optimise** | -ise (UK spelling) | `["UK"]` | **optimize** |

#### Level: C1 (Advanced) (c1)

| Entry ID | Word | Spelling Type | Recommended Region Tag | Regional Counterpart |
| :--- | :--- | :--- | :---: | :--- |
| `en:incentivize:verb` | **incentivize** | -ize spelling | `["US/Oxford"]` | **incentivise** |
| `en:incentivise:verb` | **incentivise** | -ise (UK spelling) | `["UK"]` | **incentivize** |
| `en:tabloidization:noun` | **tabloidization** | -ization (US spelling) | `["US"]` | **tabloidisation** |
| `en:militarization:noun` | **militarization** | -ization (US spelling) | `["US"]` | **militarisation** |
| `en:militarisation:noun` | **militarisation** | -isation (UK spelling) | `["UK"]` | **militarization** |
| `en:subsidize:verb` | **subsidize** | -ize spelling | `["US/Oxford"]` | **subsidise** |
| `en:subsidise:verb` | **subsidise** | -ise (UK spelling) | `["UK"]` | **subsidize** |
| `en:modelling:noun` | **modelling** | double-l (UK spelling) | `["UK"]` | **modeling** |
| `en:galvanize:verb` | **galvanize** | -ize spelling | `["US/Oxford"]` | **galvanise** |
| `en:galvanise:verb` | **galvanise** | -ise (UK spelling) | `["UK"]` | **galvanize** |
| `en:scrutinize:verb` | **scrutinize** | -ize spelling | `["US/Oxford"]` | **scrutinise** |
| `en:scrutinise:verb` | **scrutinise** | -ise (UK spelling) | `["UK"]` | **scrutinize** |
| `en:polarization:noun` | **polarization** | -ization (US spelling) | `["US"]` | **polarisation** |
| `en:polarisation:noun` | **polarisation** | -isation (UK spelling) | `["UK"]` | **polarization** |
| `en:rationalization:noun` | **rationalization** | -ization (US spelling) | `["US"]` | **rationalisation** |
| `en:rationalisation:noun` | **rationalisation** | -isation (UK spelling) | `["UK"]` | **rationalization** |
| `en:self-actualization:noun` | **self-actualization** | -ization (US spelling) | `["US"]` | **self-actualisation** |
| `en:self-actualisation:noun` | **self-actualisation** | -isation (UK spelling) | `["UK"]` | **self-actualization** |
| `en:synthesize:verb` | **synthesize** | -ize spelling | `["US/Oxford"]` | **synthesise** |
| `en:marginalization:noun` | **marginalization** | -ization (US spelling) | `["US"]` | **marginalisation** |
| `en:disenfranchise:verb` | **disenfranchise** | -ise (UK spelling) | `["UK"]` | **disenfranchize** |
| `en:overgeneralize:verb` | **overgeneralize** | -ize spelling | `["US/Oxford"]` | **overgeneralise** |
| `en:overgeneralise:verb` | **overgeneralise** | -ise (UK spelling) | `["UK"]` | **overgeneralize** |
| `en:reconceptualize:verb` | **reconceptualize** | -ize spelling | `["US/Oxford"]` | **reconceptualise** |
| `en:reconceptualise:verb` | **reconceptualise** | -ise (UK spelling) | `["UK"]` | **reconceptualize** |

#### Level: C2 (Proficient) (c2)

| Entry ID | Word | Spelling Type | Recommended Region Tag | Regional Counterpart |
| :--- | :--- | :--- | :---: | :--- |
| `en:candour:noun` | **candour** | -our (UK spelling) | `["UK"]` | **candor** |
| `en:fervour:noun` | **fervour** | -our (UK spelling) | `["UK"]` | **fervor** |
| `en:rancour:noun` | **rancour** | -our (UK spelling) | `["UK"]` | **rancor** |
| `en:aggrandize:verb` | **aggrandize** | -ize spelling | `["US/Oxford"]` | **aggrandise** |
| `en:aggrandise:verb` | **aggrandise** | -ise (UK spelling) | `["UK"]` | **aggrandize** |
| `en:bowdlerize:verb` | **bowdlerize** | -ize spelling | `["US/Oxford"]` | **bowdlerise** |
| `en:bowdlerise:verb` | **bowdlerise** | -ise (UK spelling) | `["UK"]` | **bowdlerize** |
| `en:hypothesise:verb` | **hypothesise** | -ise (UK spelling) | `["UK"]` | **hypothesize** |
| `en:lionize:verb` | **lionize** | -ize spelling | `["US/Oxford"]` | **lionise** |
| `en:lionise:verb` | **lionise** | -ise (UK spelling) | `["UK"]` | **lionize** |
| `en:marginalize:verb` | **marginalize** | -ize spelling | `["US/Oxford"]` | **marginalise** |
| `en:marginalise:verb` | **marginalise** | -ise (UK spelling) | `["UK"]` | **marginalize** |
| `en:ostracize:verb` | **ostracize** | -ize spelling | `["US/Oxford"]` | **ostracise** |
| `en:ostracise:verb` | **ostracise** | -ise (UK spelling) | `["UK"]` | **ostracize** |
| `en:criticize:adjective` | **criticize** | -ize spelling | `["US/Oxford"]` | **criticise** |
| `en:eulogize:verb` | **eulogize** | -ize spelling | `["US/Oxford"]` | **eulogise** |
