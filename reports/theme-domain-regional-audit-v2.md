# Theme, Domain, and Regional Variants Audit Report (v2)

> ## Re-Audit Change Log & Re-evaluation Note
>
> This v2 report updates Section 3 ("Regional Lexical Variants") of the audit following dictionary verification against Cambridge Dictionary, Oxford Learner's Dictionaries, and Merriam-Webster.
>
> ### Key Corrections & Changes from Original Report:
>
> 1. **Removal of Fabricated Words (3 entries removed from 3(c))**:
>    - **"downsize" / claimed UK "downsise"**: Removed. *Downsise* is non-standard / fabricated. *Downsize* is the standard spelling in both British and American English.
>    - **"comprise" / claimed UK "comprize"**: Removed. *Comprize* is non-standard / fabricated. *Comprise* is spelled with *-ise* in both British and American English.
>    - **"disenfranchise" / claimed UK "disenfranchize"**: Removed. *Disenfranchize* is non-standard / fabricated. *Disenfranchise* is spelled with *-ise* in both British and American English.
>    - *Impact*: Section 3(c) count reduced from 75 to 72 entries; total Regional findings reduced from 123 to 120.
>
> 2. **Resolution of `en:bill:noun` Sense Collision**:
>    - In `vocabulary/en/a0_a1/food_drink.json`, `en:bill:noun` is defined strictly as *"a paper showing cost of meal"* with example *"Pay the restaurant bill now."*
>    - In British English, *bill* is the standard term for restaurant payment (US counterpart: *check*). In American English, *bill* refers to paper money (UK counterpart: *banknote* or *note*).
>    - The original report incorrectly combined these distinct senses onto `en:bill:noun`, treating it simultaneously as the US counterpart of `en:note:noun` (money), the UK counterpart of `check` (restaurant), and the UK term for missing `banknote`.
>    - **Recommendation**: Narrow the regional metadata on `en:bill:noun` (`food_drink.json`) to its actual defined sense (UK restaurant bill, paired with US `check`). Do not link `en:bill:noun` to `en:note:noun` (money) or `en:banknote:noun`. If a separate entry for paper money (*bill*) is desired in American English, it should be created as a distinct sense-specific ID (e.g. `en:bill-banknote:noun`).
>
> 3. **Re-evaluation of "-ize" / "-ise" and "-ization" / "-isation" Tags**:
>    - The original report suggested an invalid region tag `["US/Oxford"]` (the schema strictly accepts `UK`, `US`, `CA`, `AU`, `NZ`).
>    - Lexicographical verification shows:
>      - **`-ize` / `-ization` forms**: Standard in American English AND fully accepted standard British English (Oxford / OED house style). Because both spellings are valid across major dialects, `-ize` / `-ization` terms are **dialect-neutral** and require **no region tag** and no regional equivalent links unless paired with a UK-only `-ise` form.
>      - **`-ise` / `-isation` forms**: Exclusively British / Commonwealth English (UK, AU, NZ) and not accepted in standard American English. These entries should be tagged `["UK"]` (or `["UK", "AU", "NZ"]`).
>
> 4. **Verification of Section 3(b) Missing Terms**:
>    - All missing terms listed in 3(b) (e.g., *block of flats*, *fizzy drink*, *entrée*, *pudding*, *petrol*, *lorry*, *tube*, *zebra crossing*, *traffic circle*, *verge*, *freeway*, *check*, *cash machine*, *cashpoint*, *drugstore*, *postcode*, *cell phone*, *queue*, *rubber*, *trash*) were verified as genuine, attested regional terms in Cambridge and Oxford dictionaries.

---

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
| **3. Regional Lexical Variants** | **120** | Total regional lexical and spelling variant findings across 3 sub-categories. |
| &nbsp;&nbsp;↳ *(a) Both words exist as separate entries* | **24** | Both regional terms exist in dataset with matching part-of-speech; need `regional_equivalents` links & `region` tags. |
| &nbsp;&nbsp;↳ *(b) Only one side exists as an entry* | **24** | One side exists in dataset; counterpart term is missing and recommended for addition. |
| &nbsp;&nbsp;↳ *(c) Region-ambiguous / untagged spelling* | **72** | Entries with distinct UK/US regional spelling or `-ise` regional tag needs. |

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

| Entry ID | Word | Suggested Domain | Reason / Notes |
| :--- | :--- | :--- | :--- |
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

This section identifies UK, US, CA, AU, and NZ regional lexical differences and regional spelling variants across the dataset, verified against standard dictionary authorities (Cambridge Dictionary, Oxford Learner's Dictionaries, Merriam-Webster).

### (a) BOTH Words Already Exist as Separate Entries
These entries represent existing paired regional terms in the dataset with matching part of speech. They require metadata fixes: linking each other via `regional_equivalents` and assigning the proper `region` tag (`["UK"]`, `["US"]`, etc.).

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
| `en:bill:noun` | **bill** | `[missing check]` | **check** | Tag `en:bill:noun` (`food_drink.json`) as `["UK"]` (restaurant bill) and pair with missing US `check`. *Note: Do not link to `en:note:noun` (money).* |
| `en:note:noun` | **note** | `[missing bill]` | **bill** | Tag `en:note:noun` (`money_shopping.json`) as `["UK"]` (money) and pair with US money term *bill* (requires new US banknote sense entry). |
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

---

### (b) ONLY ONE Side Currently Exists as an Entry
Only one side of the regional pair exists in the dataset. Verified against dictionaries as real, attested regional terms before recommending addition.

| Existing Entry ID | Existing Word | Existing Region | Missing Regional Counterpart | Missing Region | Notes / Verification Status |
| :--- | :--- | :---: | :--- | :---: | :--- |
| `en:apartment-building:noun` | **apartment building** | `US` | **block of flats** | `UK` | Verified in Cambridge & OED |
| `en:soda:noun` | **soda** | `US` | **fizzy drink** | `UK` | Verified in Cambridge & OED |
| `en:main-course:noun` | **main course** | `UK` | **entrée** | `US` | Verified in Merriam-Webster |
| `en:dessert:noun` | **dessert** | `US` | **pudding** | `UK` | Verified in Cambridge & OED |
| `en:gas:noun` | **gas** | `US` | **petrol** | `UK` | Verified in Cambridge & OED |
| `en:truck:noun` | **truck** | `US` | **lorry** | `UK` | Verified in Cambridge & OED |
| `en:subway:noun` | **subway** | `US` | **tube** | `UK` | Verified in Cambridge & OED (London Underground / informal) |
| `en:crosswalk:noun` | **crosswalk** | `US` | **zebra crossing** | `UK` | Verified in Cambridge & OED |
| `en:roundabout:noun` | **roundabout** | `UK` | **traffic circle** | `US` | Verified in Merriam-Webster & Cambridge |
| `en:shoulder:noun` | **shoulder** | `US` | **verge** | `UK` | Verified in Cambridge & OED |
| `en:motorway:noun` | **motorway** | `UK` | **freeway** | `US` | Verified in Merriam-Webster |
| `en:bill:noun` | **bill** | `UK` | **check** | `US` | Verified: restaurant bill (UK) ↔ check (US) |
| `en:note:noun` | **note** | `UK` | **bill** | `US` | Verified: paper money note (UK) ↔ bill (US) |
| `en:atm:noun` | **ATM** | `US` | **cash machine** | `UK` | Verified in Cambridge & OED |
| `en:atm:noun` | **ATM** | `US` | **cashpoint** | `UK` | Verified in Cambridge & OED |
| `en:chemist:noun` | **chemist** | `UK` | **drugstore** | `US` | Verified in Merriam-Webster |
| `en:pharmacy:noun` | **pharmacy** | `UK` | **drugstore** | `US` | Verified in Merriam-Webster |
| `en:post:noun` | **post** | `UK` | **mail** | `US` | Verified in Merriam-Webster |
| `en:zip-code:noun` | **zip code** | `US` | **postcode** | `UK` | Verified in Cambridge & OED |
| `en:mobile:noun` | **mobile** | `UK` | **cell phone** | `US` | Verified in Merriam-Webster |
| `en:mobile-phone:noun` | **mobile phone** | `UK` | **cell phone** | `US` | Verified in Merriam-Webster |
| `en:line:noun` | **line** | `US` | **queue** | `UK` | Verified in Cambridge & OED |
| `en:eraser:noun` | **eraser** | `US` | **rubber** | `UK` | Verified in Cambridge & OED |
| `en:rubbish:noun` | **rubbish** | `UK` | **trash** | `US` | Verified in Merriam-Webster |

---

### (c) Region-Ambiguous or Untagged Regional Spelling

*Policy Note on Spelling Variants*:
- **`-ize` / `-ization` forms**: Standard in American English AND standard in Oxford British English. Dialect-neutral; no region tag assigned.
- **`-ise` / `-isation` forms**: Exclusively British/Commonwealth English. Tagged `["UK"]`.
- **Non-ize regional spellings** (e.g. `-our`/`-or`, double-`l`/single-`l`, `-re`/`-er`): Tagged with their specific region (`["UK"]` or `["US"]`).

#### Level: A0 / A1 (Beginner / Elementary) (a0_a1)

| Entry ID | Word | Spelling Type | Recommended Region Tag | Regional Counterpart | Notes |
| :--- | :--- | :--- | :---: | :--- | :--- |
| `en:apologize:verb` | **apologize** | -ize spelling | *(None)* | **apologise** | Dialect-neutral (US standard & Oxford UK) |
| `en:colour:noun` | **colour** | -our (UK spelling) | `["UK"]` | **color** | Genuine UK spelling variant |
| `en:traveling:noun` | **traveling** | single-l (US spelling) | `["US"]` | **travelling** | Genuine US spelling variant |

#### Level: A2 (Elementary) (a2)

| Entry ID | Word | Spelling Type | Recommended Region Tag | Regional Counterpart | Notes |
| :--- | :--- | :--- | :---: | :--- | :--- |
| `en:behaviour:noun` | **behaviour** | -our (UK spelling) | `["UK"]` | **behavior** | Genuine UK spelling variant |
| `en:flavour:noun` | **flavour** | -our (UK spelling) | `["UK"]` | **flavor** | Genuine UK spelling variant |
| `en:memorize:verb` | **memorize** | -ize spelling | *(None)* | **memorise** | Dialect-neutral (US standard & Oxford UK) |
| `en:sympathize:verb` | **sympathize** | -ize spelling | *(None)* | **sympathise** | Dialect-neutral (US standard & Oxford UK) |
| `en:apologise:verb` | **apologise** | -ise (UK spelling) | `["UK"]` | **apologize** | Genuine UK spelling variant |
| `en:rumour:noun` | **rumour** | -our (UK spelling) | `["UK"]` | **rumor** | Genuine UK spelling variant |

#### Level: B1 (Intermediate) (b1)

| Entry ID | Word | Spelling Type | Recommended Region Tag | Regional Counterpart | Notes |
| :--- | :--- | :--- | :---: | :--- | :--- |
| `en:globalisation:noun` | **globalisation** | -isation (UK spelling) | `["UK"]` | **globalization** | Genuine UK spelling variant |
| `en:globalization:noun` | **globalization** | -ization spelling | *(None)* | **globalisation** | Dialect-neutral (US standard & Oxford UK) |
| `en:criticize:verb` | **criticize** | -ize spelling | *(None)* | **criticise** | Dialect-neutral (US standard & Oxford UK) |
| `en:modernize:verb` | **modernize** | -ize spelling | *(None)* | **modernise** | Dialect-neutral (US standard & Oxford UK) |
| `en:centre:noun` | **centre** | -re (UK spelling) | `["UK"]` | **center** | Genuine UK spelling variant |

#### Level: B2 (Upper Intermediate) (b2)

| Entry ID | Word | Spelling Type | Recommended Region Tag | Regional Counterpart | Notes |
| :--- | :--- | :--- | :---: | :--- | :--- |
| `en:prioritize:verb` | **prioritize** | -ize spelling | *(None)* | **prioritise** | Dialect-neutral (US standard & Oxford UK) |
| `en:prioritise:verb` | **prioritise** | -ise (UK spelling) | `["UK"]` | **prioritize** | Genuine UK spelling variant |
| `en:utilize:verb` | **utilize** | -ize spelling | *(None)* | **utilise** | Dialect-neutral (US standard & Oxford UK) |
| `en:utilise:verb` | **utilise** | -ise (UK spelling) | `["UK"]` | **utilize** | Genuine UK spelling variant |
| `en:rigour:noun` | **rigour** | -our (UK spelling) | `["UK"]` | **rigor** | Genuine UK spelling variant |
| `en:homogenization:noun` | **homogenization** | -ization spelling | *(None)* | **homogenisation** | Dialect-neutral (US standard & Oxford UK) |
| `en:homogenisation:noun` | **homogenisation** | -isation (UK spelling) | `["UK"]` | **homogenization** | Genuine UK spelling variant |
| `en:commercialization:noun` | **commercialization** | -ization spelling | *(None)* | **commercialisation** | Dialect-neutral (US standard & Oxford UK) |
| `en:commercialisation:noun` | **commercialisation** | -isation (UK spelling) | `["UK"]` | **commercialization** | Genuine UK spelling variant |
| `en:naturalization:noun` | **naturalization** | -ization spelling | *(None)* | **naturalisation** | Dialect-neutral (US standard & Oxford UK) |
| `en:naturalisation:noun` | **naturalisation** | -isation (UK spelling) | `["UK"]` | **naturalization** | Genuine UK spelling variant |
| `en:hypothesize:verb` | **hypothesize** | -ize spelling | *(None)* | **hypothesise** | Dialect-neutral (US standard & Oxford UK) |
| `en:generalization:verb` | **generalization** | -ization spelling | *(None)* | **generalisation** | Dialect-neutral (US standard & Oxford UK) |
| `en:generalisation:verb` | **generalisation** | -isation (UK spelling) | `["UK"]` | **generalization** | Genuine UK spelling variant |
| `en:generalize:phrase` | **generalize** | -ize spelling | *(None)* | **generalise** | Dialect-neutral (US standard & Oxford UK) |
| `en:rationalize:noun` | **rationalize** | -ize spelling | *(None)* | **rationalise** | Dialect-neutral (US standard & Oxford UK) |
| `en:optimize:verb` | **optimize** | -ize spelling | *(None)* | **optimise** | Dialect-neutral (US standard & Oxford UK) |
| `en:optimise:verb` | **optimise** | -ise (UK spelling) | `["UK"]` | **optimize** | Genuine UK spelling variant |

#### Level: C1 (Advanced) (c1)

| Entry ID | Word | Spelling Type | Recommended Region Tag | Regional Counterpart | Notes |
| :--- | :--- | :--- | :---: | :--- | :--- |
| `en:incentivize:verb` | **incentivize** | -ize spelling | *(None)* | **incentivise** | Dialect-neutral (US standard & Oxford UK) |
| `en:incentivise:verb` | **incentivise** | -ise (UK spelling) | `["UK"]` | **incentivize** | Genuine UK spelling variant |
| `en:tabloidization:noun` | **tabloidization** | -ization spelling | *(None)* | **tabloidisation** | Dialect-neutral (US standard & Oxford UK) |
| `en:militarization:noun` | **militarization** | -ization spelling | *(None)* | **militarisation** | Dialect-neutral (US standard & Oxford UK) |
| `en:militarisation:noun` | **militarisation** | -isation (UK spelling) | `["UK"]` | **militarization** | Genuine UK spelling variant |
| `en:subsidize:verb` | **subsidize** | -ize spelling | *(None)* | **subsidise** | Dialect-neutral (US standard & Oxford UK) |
| `en:subsidise:verb` | **subsidise** | -ise (UK spelling) | `["UK"]` | **subsidize** | Genuine UK spelling variant |
| `en:modelling:noun` | **modelling** | double-l (UK spelling) | `["UK"]` | **modeling** | Genuine UK spelling variant |
| `en:galvanize:verb` | **galvanize** | -ize spelling | *(None)* | **galvanise** | Dialect-neutral (US standard & Oxford UK) |
| `en:galvanise:verb` | **galvanise** | -ise (UK spelling) | `["UK"]` | **galvanize** | Genuine UK spelling variant |
| `en:scrutinize:verb` | **scrutinize** | -ize spelling | *(None)* | **scrutinise** | Dialect-neutral (US standard & Oxford UK) |
| `en:scrutinise:verb` | **scrutinise** | -ise (UK spelling) | `["UK"]` | **scrutinize** | Genuine UK spelling variant |
| `en:polarization:noun` | **polarization** | -ization spelling | *(None)* | **polarisation** | Dialect-neutral (US standard & Oxford UK) |
| `en:polarisation:noun` | **polarisation** | -isation (UK spelling) | `["UK"]` | **polarization** | Genuine UK spelling variant |
| `en:rationalization:noun` | **rationalization** | -ization spelling | *(None)* | **rationalisation** | Dialect-neutral (US standard & Oxford UK) |
| `en:rationalisation:noun` | **rationalisation** | -isation (UK spelling) | `["UK"]` | **rationalization** | Genuine UK spelling variant |
| `en:self-actualization:noun` | **self-actualization** | -ization spelling | *(None)* | **self-actualisation** | Dialect-neutral (US standard & Oxford UK) |
| `en:self-actualisation:noun` | **self-actualisation** | -isation (UK spelling) | `["UK"]` | **self-actualization** | Genuine UK spelling variant |
| `en:synthesize:verb` | **synthesize** | -ize spelling | *(None)* | **synthesise** | Dialect-neutral (US standard & Oxford UK) |
| `en:marginalization:noun` | **marginalization** | -ization spelling | *(None)* | **marginalisation** | Dialect-neutral (US standard & Oxford UK) |
| `en:overgeneralize:verb` | **overgeneralize** | -ize spelling | *(None)* | **overgeneralise** | Dialect-neutral (US standard & Oxford UK) |
| `en:overgeneralise:verb` | **overgeneralise** | -ise (UK spelling) | `["UK"]` | **overgeneralize** | Genuine UK spelling variant |
| `en:reconceptualize:verb` | **reconceptualize** | -ize spelling | *(None)* | **reconceptualise** | Dialect-neutral (US standard & Oxford UK) |
| `en:reconceptualise:verb` | **reconceptualise** | -ise (UK spelling) | `["UK"]` | **reconceptualize** | Genuine UK spelling variant |

#### Level: C2 (Proficient) (c2)

| Entry ID | Word | Spelling Type | Recommended Region Tag | Regional Counterpart | Notes |
| :--- | :--- | :--- | :---: | :--- | :--- |
| `en:candour:noun` | **candour** | -our (UK spelling) | `["UK"]` | **candor** | Genuine UK spelling variant |
| `en:fervour:noun` | **fervour** | -our (UK spelling) | `["UK"]` | **fervor** | Genuine UK spelling variant |
| `en:rancour:noun` | **rancour** | -our (UK spelling) | `["UK"]` | **rancor** | Genuine UK spelling variant |
| `en:aggrandize:verb` | **aggrandize** | -ize spelling | *(None)* | **aggrandise** | Dialect-neutral (US standard & Oxford UK) |
| `en:aggrandise:verb` | **aggrandise** | -ise (UK spelling) | `["UK"]` | **aggrandize** | Genuine UK spelling variant |
| `en:bowdlerize:verb` | **bowdlerize** | -ize spelling | *(None)* | **bowdlerise** | Dialect-neutral (US standard & Oxford UK) |
| `en:bowdlerise:verb` | **bowdlerise** | -ise (UK spelling) | `["UK"]` | **bowdlerize** | Genuine UK spelling variant |
| `en:hypothesise:verb` | **hypothesise** | -ise (UK spelling) | `["UK"]` | **hypothesize** | Genuine UK spelling variant |
| `en:lionize:verb` | **lionize** | -ize spelling | *(None)* | **lionise** | Dialect-neutral (US standard & Oxford UK) |
| `en:lionise:verb` | **lionise** | -ise (UK spelling) | `["UK"]` | **lionize** | Genuine UK spelling variant |
| `en:marginalize:verb` | **marginalize** | -ize spelling | *(None)* | **marginalise** | Dialect-neutral (US standard & Oxford UK) |
| `en:marginalise:verb` | **marginalise** | -ise (UK spelling) | `["UK"]` | **marginalize** | Genuine UK spelling variant |
| `en:ostracize:verb` | **ostracize** | -ize spelling | *(None)* | **ostracise** | Dialect-neutral (US standard & Oxford UK) |
| `en:ostracise:verb` | **ostracise** | -ise (UK spelling) | `["UK"]` | **ostracize** | Genuine UK spelling variant |
| `en:criticize:adjective` | **criticize** | -ize spelling | *(None)* | **criticise** | Dialect-neutral (US standard & Oxford UK) |
| `en:eulogize:verb` | **eulogize** | -ize spelling | *(None)* | **eulogise** | Dialect-neutral (US standard & Oxford UK) |
