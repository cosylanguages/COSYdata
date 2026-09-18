# Intake Plan: French, Italian, Russian, and Greek A0–A1 Vocabulary

This document establishes the dataset structure, sheet layout analysis, theme mapping table, CEFR level assignments, and ambiguity review items for incorporating French (`fr`), Italian (`it`), Russian (`ru`), and Greek (`el`) A0–A1 core vocabulary datasets into `COSYdata`.

## 1. Sheet Tab Column Layouts

The source workbook `A0-A1_Vocabulary_FR_IT_RU_EL` consists of 6 tabs with the following column structures:

| Tab Name | GID | Total Rows | Column Layout | Description |
|---|---|---|---|---|
| `Read Me` | `707882404` | 14 | Single column | Overview, CEFR scope note (~500-800 words), tab usage, and sourcing methodology. |
| `All Languages` | `2131576859` | 517 (1 header + 516 data) | `Category`, `English`, `French`, `Italian`, `Russian`, `Russian (translit.)`, `Greek`, `Greek (translit.)` | Master side-by-side comparative table for all 516 core beginner concepts across all 4 target languages with transliterations. |
| `French` | `1296305636` | 517 (1 header + 516 data) | `Category`, `English`, `French` | Language-specific sheet for French vocabulary entries. |
| `Italian` | `2012623124` | 517 (1 header + 516 data) | `Category`, `English`, `Italian` | Language-specific sheet for Italian vocabulary entries. |
| `Russian` | `616308159` | 517 (1 header + 516 data) | `Category`, `English`, `Russian`, `Transliteration` | Language-specific sheet for Russian vocabulary entries with Latin transliteration. |
| `Greek` | `1677370548` | 517 (1 header + 516 data) | `Category`, `English`, `Greek`, `Transliteration` | Language-specific sheet for Greek vocabulary entries with Latin transliteration. |

## 2. Topic / Category Mapping to Existing `vocabulary/en/a0_a1/*.json` Files

All 26 categories in the intake sheet fit directly into existing `vocabulary/en/a0_a1/` theme files. No new theme filenames are required.

| Sheet Category | Intake Concept Count | Target Existing Theme File | Justification & Refinements |
|---|---|---|---|
| `Adjectives` | 51 | `adjectives.json`, `general_adjectives.json`, `feelings.json` | Feelings adjectives (e.g. happy, sad, angry) map to `feelings.json`. Dimensional/physical adjectives (e.g. big, small, heavy) map to `general_adjectives.json`. General qualitative adjectives map to `adjectives.json`. |
| `Adverbs` | 15 | `adverbs_connectors.json` | Connectors, frequency adverbs, and basic adverbs. |
| `Animals` | 20 | `animals.json` | Beginner animal nouns (cat, dog, bird, wolf, fox, etc.). |
| `Body` | 20 | `body_health.json` | Body parts and basic health terms. |
| `Clothing` | 15 | `clothes.json` | Apparel and footwear terms. |
| `Colors` | 12 | `colors.json` | Primary and common color terms. |
| `Countries` | 10 | `nationalities.json` | Country names and nationality terms. |
| `Days` | 7 | `time.json` | Days of the week (Monday–Sunday). |
| `Family` | 20 | `family.json` | Kinship and family relation terms. |
| `Food` | 49 | `food_drink.json` | Food items, meals, fruits, vegetables, and beverages. |
| `Greetings` | 15 | `expressions.json` | Everyday conversational expressions, greetings, and polite formulas. |
| `House` | 25 | `house_furniture.json` | Rooms, household objects, and furniture. |
| `Misc` | 20 | `common_nouns.json` | General everyday miscellaneous objects and common nouns. |
| `Months` | 12 | `time.json` | Months of the year (January–December). |
| `Nature` | 20 | `geography.json`, `weather.json` | Weather-specific terms (sun, rain, snow, wind) map to `weather.json`; physical geography terms (mountain, river, sea, forest) map to `geography.json`. |
| `Numbers` | 29 | `numbers.json` | Cardinal numbers 0–100, hundred, thousand. |
| `Places` | 15 | `places_transport.json` | City locations, buildings, and public places. |
| `Prepositions` | 12 | `prepositions.json` | Basic spatial and directional prepositions. |
| `Professions` | 10 | `jobs.json` | Common occupations and job titles. |
| `Pronouns` | 12 | `pronouns.json` | Personal, possessive, and demonstrative pronouns. |
| `Questions` | 10 | `pronouns.json` | Question words / interrogative pronouns (who, what, where, why, how). |
| `School` | 15 | `school.json` | Classroom objects, subjects, and educational terms. |
| `Seasons` | 4 | `time.json` | Four seasons (spring, summer, autumn/fall, winter). |
| `Time` | 15 | `time.json` | Time expressions (today, tomorrow, morning, hour, year). |
| `Transport` | 12 | `places_transport.json` | Vehicles and modes of transportation. |
| `Verbs` | 71 | `daily_verbs.json`, `auxiliary_verbs.json` | Modal and auxiliary verbs (to be, to have, can, must, want) map to `auxiliary_verbs.json`; action/daily activity verbs map to `daily_verbs.json`. |

## 3. CEFR Level Assignments & English Equivalent Mappings for 516 Concepts

Below is the complete mapping table for all 516 intake concepts. CEFR levels (`A0` or `A1`) are assigned to match the corresponding English concept in `vocabulary/en/a0_a1/` wherever present.

| # | Category | English Concept | Assigned Level | Target Theme File | Matched English ID | Alignment Note |
|---|---|---|---|---|---|---|
| 1 | Numbers | zero | A1 | `numbers.json` | `en:zero:number` | Matches zero (en:zero:number) in numbers.json |
| 2 | Numbers | one | A1 | `numbers.json` | `en:one:number` | Matches one (en:one:number) in numbers.json |
| 3 | Numbers | two | A1 | `numbers.json` | `en:two:number` | Matches two (en:two:number) in numbers.json |
| 4 | Numbers | three | A1 | `numbers.json` | `en:three:number` | Matches three (en:three:number) in numbers.json |
| 5 | Numbers | four | A1 | `numbers.json` | `en:four:number` | Matches four (en:four:number) in numbers.json |
| 6 | Numbers | five | A1 | `numbers.json` | `en:five:number` | Matches five (en:five:number) in numbers.json |
| 7 | Numbers | six | A1 | `numbers.json` | `en:six:number` | Matches six (en:six:number) in numbers.json |
| 8 | Numbers | seven | A1 | `numbers.json` | `en:seven:number` | Matches seven (en:seven:number) in numbers.json |
| 9 | Numbers | eight | A1 | `numbers.json` | `en:eight:number` | Matches eight (en:eight:number) in numbers.json |
| 10 | Numbers | nine | A1 | `numbers.json` | `en:nine:number` | Matches nine (en:nine:number) in numbers.json |
| 11 | Numbers | ten | A1 | `numbers.json` | `en:ten:number` | Matches ten (en:ten:number) in numbers.json |
| 12 | Numbers | eleven | A1 | `numbers.json` | `en:eleven:number` | Matches eleven (en:eleven:number) in numbers.json |
| 13 | Numbers | twelve | A1 | `numbers.json` | `en:twelve:number` | Matches twelve (en:twelve:number) in numbers.json |
| 14 | Numbers | thirteen | A1 | `numbers.json` | `en:thirteen:number` | Matches thirteen (en:thirteen:number) in numbers.json |
| 15 | Numbers | fourteen | A1 | `numbers.json` | `en:fourteen:number` | Matches fourteen (en:fourteen:number) in numbers.json |
| 16 | Numbers | fifteen | A1 | `numbers.json` | `en:fifteen:number` | Matches fifteen (en:fifteen:number) in numbers.json |
| 17 | Numbers | sixteen | A1 | `numbers.json` | `en:sixteen:number` | Matches sixteen (en:sixteen:number) in numbers.json |
| 18 | Numbers | seventeen | A1 | `numbers.json` | `en:seventeen:number` | Matches seventeen (en:seventeen:number) in numbers.json |
| 19 | Numbers | eighteen | A1 | `numbers.json` | `en:eighteen:number` | Matches eighteen (en:eighteen:number) in numbers.json |
| 20 | Numbers | nineteen | A1 | `numbers.json` | `en:nineteen:number` | Matches nineteen (en:nineteen:number) in numbers.json |
| 21 | Numbers | twenty | A1 | `numbers.json` | `en:twenty:number` | Matches twenty (en:twenty:number) in numbers.json |
| 22 | Numbers | thirty | A1 | `numbers.json` | `en:thirty:number` | Matches thirty (en:thirty:number) in numbers.json |
| 23 | Numbers | forty | A1 | `numbers.json` | `en:forty:number` | Matches forty (en:forty:number) in numbers.json |
| 24 | Numbers | fifty | A1 | `numbers.json` | `en:fifty:number` | Matches fifty (en:fifty:number) in numbers.json |
| 25 | Numbers | sixty | A1 | `numbers.json` | `en:sixty:number` | Matches sixty (en:sixty:number) in numbers.json |
| 26 | Numbers | seventy | A1 | `numbers.json` | `en:seventy:number` | Matches seventy (en:seventy:number) in numbers.json |
| 27 | Numbers | eighty | A1 | `numbers.json` | `en:eighty:number` | Matches eighty (en:eighty:number) in numbers.json |
| 28 | Numbers | ninety | A1 | `numbers.json` | `en:ninety:number` | Matches ninety (en:ninety:number) in numbers.json |
| 29 | Numbers | hundred | A1 | `numbers.json` | `en:hundred:number` | Matches hundred (en:hundred:number) in numbers.json |
| 30 | Days | Monday | A1 | `time.json` | `en:monday:noun` | Matches Monday (en:monday:noun) in time.json |
| 31 | Days | Tuesday | A1 | `time.json` | `en:tuesday:noun` | Matches Tuesday (en:tuesday:noun) in time.json |
| 32 | Days | Wednesday | A1 | `time.json` | `en:wednesday:noun` | Matches Wednesday (en:wednesday:noun) in time.json |
| 33 | Days | Thursday | A1 | `time.json` | `en:thursday:noun` | Matches Thursday (en:thursday:noun) in time.json |
| 34 | Days | Friday | A1 | `time.json` | `en:friday:noun` | Matches Friday (en:friday:noun) in time.json |
| 35 | Days | Saturday | A1 | `time.json` | `en:saturday:noun` | Matches Saturday (en:saturday:noun) in time.json |
| 36 | Days | Sunday | A1 | `time.json` | `en:sunday:noun` | Matches Sunday (en:sunday:noun) in time.json |
| 37 | Months | January | A1 | `time.json` | `en:january:noun` | Matches January (en:january:noun) in time.json |
| 38 | Months | February | A1 | `time.json` | `en:february:noun` | Matches February (en:february:noun) in time.json |
| 39 | Months | March | A1 | `time.json` | `en:march:noun` | Matches March (en:march:noun) in time.json |
| 40 | Months | April | A1 | `time.json` | `en:april:noun` | Matches April (en:april:noun) in time.json |
| 41 | Months | May | A1 | `time.json` | `en:may:phrase` | Matches may (en:may:phrase) in expressions.json |
| 42 | Months | June | A1 | `time.json` | `en:june:noun` | Matches June (en:june:noun) in time.json |
| 43 | Months | July | A1 | `time.json` | `en:july:noun` | Matches July (en:july:noun) in time.json |
| 44 | Months | August | A1 | `time.json` | `en:august:noun` | Matches August (en:august:noun) in time.json |
| 45 | Months | September | A1 | `time.json` | `en:september:noun` | Matches September (en:september:noun) in time.json |
| 46 | Months | October | A1 | `time.json` | `en:october:noun` | Matches October (en:october:noun) in time.json |
| 47 | Months | November | A1 | `time.json` | `en:november:noun` | Matches November (en:november:noun) in time.json |
| 48 | Months | December | A1 | `time.json` | `en:december:noun` | Matches December (en:december:noun) in time.json |
| 49 | Seasons | spring | A1 | `time.json` | `en:spring:noun` | Matches spring (en:spring:noun) in time.json |
| 50 | Seasons | summer | A1 | `time.json` | `en:summer:noun` | Matches summer (en:summer:noun) in time.json |
| 51 | Seasons | autumn | A1 | `time.json` | `en:autumn:noun` | Matches autumn (en:autumn:noun) in time.json |
| 52 | Seasons | winter | A1 | `time.json` | `en:winter:noun` | Matches winter (en:winter:noun) in time.json |
| 53 | Colors | white | A1 | `colors.json` | `en:white:adjective` | Matches white (en:white:adjective) in colors.json |
| 54 | Colors | black | A1 | `colors.json` | `en:black:adjective` | Matches black (en:black:adjective) in colors.json |
| 55 | Colors | red | A1 | `colors.json` | `en:red:adjective` | Matches red (en:red:adjective) in colors.json |
| 56 | Colors | blue | A1 | `colors.json` | `en:blue:adjective` | Matches blue (en:blue:adjective) in colors.json |
| 57 | Colors | green | A1 | `colors.json` | `en:green:adjective` | Matches green (en:green:adjective) in colors.json |
| 58 | Colors | yellow | A1 | `colors.json` | `en:yellow:adjective` | Matches yellow (en:yellow:adjective) in colors.json |
| 59 | Colors | orange | A1 | `colors.json` | `en:orange:adjective` | Matches orange (en:orange:adjective) in colors.json |
| 60 | Colors | pink | A1 | `colors.json` | `en:pink:adjective` | Matches pink (en:pink:adjective) in colors.json |
| 61 | Colors | brown | A1 | `colors.json` | `en:brown:adjective` | Matches brown (en:brown:adjective) in colors.json |
| 62 | Colors | grey | A1 | `colors.json` | `en:grey:adjective` | Matches grey (en:grey:adjective) in colors.json |
| 63 | Colors | purple | A1 | `colors.json` | `en:purple:adjective` | Matches purple (en:purple:adjective) in colors.json |
| 64 | Colors | gold | A1 | `colors.json` | `en:gold:adjective` | Matches gold (en:gold:adjective) in colors.json |
| 65 | Family | mother | A1 | `family.json` | `en:mother:noun` | Matches mother (en:mother:noun) in family.json |
| 66 | Family | father | A1 | `family.json` | `en:father:noun` | Matches father (en:father:noun) in family.json |
| 67 | Family | parents | A1 | `family.json` | `en:parents:noun` | Matches parents (en:parents:noun) in family.json |
| 68 | Family | son | A1 | `family.json` | `en:son:noun` | Matches son (en:son:noun) in family.json |
| 69 | Family | daughter | A1 | `family.json` | `en:daughter:noun` | Matches daughter (en:daughter:noun) in family.json |
| 70 | Family | child | A1 | `family.json` | `en:child:noun` | Matches child (en:child:noun) in family.json |
| 71 | Family | brother | A1 | `family.json` | `en:brother:noun` | Matches brother (en:brother:noun) in family.json |
| 72 | Family | sister | A1 | `family.json` | `en:sister:noun` | Matches sister (en:sister:noun) in family.json |
| 73 | Family | grandmother | A1 | `family.json` | `en:grandmother:noun` | Matches grandmother (en:grandmother:noun) in family.json |
| 74 | Family | grandfather | A1 | `family.json` | `en:grandfather:noun` | Matches grandfather (en:grandfather:noun) in family.json |
| 75 | Family | husband | A1 | `family.json` | `en:husband:noun` | Matches husband (en:husband:noun) in family.json |
| 76 | Family | wife | A1 | `family.json` | `en:wife:noun` | Matches wife (en:wife:noun) in family.json |
| 77 | Family | family | A1 | `family.json` | `en:family:noun` | Matches family (en:family:noun) in family.json |
| 78 | Family | uncle | A1 | `family.json` | `en:uncle:noun` | Matches uncle (en:uncle:noun) in family.json |
| 79 | Family | aunt | A1 | `family.json` | `en:aunt:noun` | Matches aunt (en:aunt:noun) in family.json |
| 80 | Family | cousin | A1 | `family.json` | `en:cousin:noun` | Matches cousin (en:cousin:noun) in family.json |
| 81 | Family | baby | A1 | `family.json` | `en:baby:noun` | Matches baby (en:baby:noun) in family.json |
| 82 | Family | man | A1 | `family.json` | `en:man:noun` | Matches man (en:man:noun) in family.json |
| 83 | Family | woman | A1 | `family.json` | `en:woman:noun` | Matches woman (en:woman:noun) in family.json |
| 84 | Family | friend | A1 | `family.json` | `en:friend:noun` | Matches friend (en:friend:noun) in family.json |
| 85 | Greetings | hello | A1 | `expressions.json` | `en:hello:phrase` | Matches hello (en:hello:phrase) in expressions.json |
| 86 | Greetings | goodbye | A1 | `expressions.json` | `en:goodbye:phrase` | Matches goodbye (en:goodbye:phrase) in expressions.json |
| 87 | Greetings | please | A1 | `expressions.json` | `en:please:phrase` | Matches please (en:please:phrase) in expressions.json |
| 88 | Greetings | thank you | A0 | `expressions.json` | `en:thank-you:phrase` | Matches Thank you (en:thank-you:phrase) in expressions.json |
| 89 | Greetings | you're welcome | A0 | `expressions.json` | `en:you-re-welcome:phrase` | Matches You're welcome (en:you-re-welcome:phrase) in expressions.json |
| 90 | Greetings | yes | A1 | `expressions.json` | `en:yes:phrase` | Matches yes (en:yes:phrase) in expressions.json |
| 91 | Greetings | no | A1 | `expressions.json` | `en:no:adverb` | Matches no (en:no:adverb) in adverbs_connectors.json |
| 92 | Greetings | excuse me | A0 | `expressions.json` | `en:excuse-me:phrase` | Matches Excuse me (en:excuse-me:phrase) in directions.json |
| 93 | Greetings | sorry | A1 | `expressions.json` | `en:sorry:phrase` | Matches sorry (en:sorry:phrase) in expressions.json |
| 94 | Greetings | good morning | A1 | `expressions.json` | `en:good-morning:phrase` | Matches good morning (en:good-morning:phrase) in expressions.json |
| 95 | Greetings | good evening | A1 | `expressions.json` | `en:good-evening:phrase` | Matches good evening (en:good-evening:phrase) in expressions.json |
| 96 | Greetings | good night | A1 | `expressions.json` | `en:good-night:phrase` | Matches good night (en:good-night:phrase) in expressions.json |
| 97 | Greetings | how are you | A0 | `expressions.json` | `en:how-are-you:phrase` | Matches How are you (en:how-are-you:phrase) in expressions.json |
| 98 | Greetings | nice to meet you | A0 | `expressions.json` | `en:nice-to-meet-you:phrase` | Matches Nice to meet you (en:nice-to-meet-you:phrase) in expressions.json |
| 99 | Greetings | welcome | A1 | `expressions.json` | `en:welcome:phrase` | Matches welcome (en:welcome:phrase) in expressions.json |
| 100 | Questions | what | A1 | `pronouns.json` | `en:what:phrase` | Matches what (en:what:phrase) in classroom_phrases.json |
| 101 | Questions | who | A1 | `pronouns.json` | `en:who:pronoun` | Matches who (en:who:pronoun) in pronouns.json |
| 102 | Questions | where | A1 | `pronouns.json` | `en:where:pronoun` | Matches where (en:where:pronoun) in pronouns.json |
| 103 | Questions | when | A1 | `pronouns.json` | `en:when:adverb` | Matches when (en:when:adverb) in adverbs_connectors.json |
| 104 | Questions | why | A1 | `pronouns.json` | `en:why:pronoun` | Matches why (en:why:pronoun) in pronouns.json |
| 105 | Questions | how | A1 | `pronouns.json` | `en:how:phrase` | Matches how (en:how:phrase) in classroom_phrases.json |
| 106 | Questions | how much/many | A0 | `pronouns.json` | `en:how-much:pronoun` | Matches how much (en:how-much:pronoun) in expressions.json |
| 107 | Questions | which | A1 | `pronouns.json` | `en:which:pronoun` | Matches which (en:which:pronoun) in pronouns.json |
| 108 | Questions | whose | A1 | `pronouns.json` | `en:whose:pronoun` | Matches whose (en:whose:pronoun) in pronouns.json |
| 109 | Questions | whom | A1 | `pronouns.json` | `en:whom:pronoun` | Matches whom (en:whom:pronoun) in pronouns.json |
| 110 | Pronouns | I | A1 | `pronouns.json` | `en:i:phrase` | Matches I (en:i:phrase) in classroom_phrases.json |
| 111 | Pronouns | you (sg) | A1 | `pronouns.json` | `en:you:pronoun` | Matches you (en:you:pronoun) in classroom_phrases.json |
| 112 | Pronouns | he | A1 | `pronouns.json` | `en:he:pronoun` | Matches he (en:he:pronoun) in pronouns.json |
| 113 | Pronouns | she | A1 | `pronouns.json` | `en:she:pronoun` | Matches she (en:she:pronoun) in pronouns.json |
| 114 | Pronouns | we | A1 | `pronouns.json` | `en:we:pronoun` | Matches we (en:we:pronoun) in pronouns.json |
| 115 | Pronouns | you (pl) | A1 | `pronouns.json` | `en:you:pronoun` | Matches you (en:you:pronoun) in classroom_phrases.json |
| 116 | Pronouns | they | A1 | `pronouns.json` | `en:they:pronoun` | Matches they (en:they:pronoun) in pronouns.json |
| 117 | Pronouns | this | A1 | `pronouns.json` | `en:this:phrase` | Matches this (en:this:phrase) in classroom_phrases.json |
| 118 | Pronouns | that | A1 | `pronouns.json` | `en:that:phrase` | Matches that (en:that:phrase) in classroom_phrases.json |
| 119 | Pronouns | my | A1 | `pronouns.json` | `en:my:pronoun` | Matches my (en:my:pronoun) in pronouns.json |
| 120 | Pronouns | your | A1 | `pronouns.json` | `en:your:pronoun` | Matches your (en:your:pronoun) in classroom_phrases.json |
| 121 | Pronouns | our | A1 | `pronouns.json` | `en:our:pronoun` | Matches our (en:our:pronoun) in pronouns.json |
| 122 | Time | today | A1 | `time.json` | `en:today:adverb` | Matches today (en:today:adverb) in adverbs_connectors.json |
| 123 | Time | tomorrow | A1 | `time.json` | `en:tomorrow:adverb` | Matches tomorrow (en:tomorrow:adverb) in adverbs_connectors.json |
| 124 | Time | yesterday | A1 | `time.json` | `en:yesterday:adverb` | Matches yesterday (en:yesterday:adverb) in adverbs_connectors.json |
| 125 | Time | now | A1 | `time.json` | `en:now:adverb` | Matches now (en:now:adverb) in adverbs_connectors.json |
| 126 | Time | later | A1 | `time.json` | `en:later:noun` | Matches later (en:later:noun) in time.json |
| 127 | Time | morning | A1 | `time.json` | `en:morning:noun` | Matches morning (en:morning:noun) in time.json |
| 128 | Time | afternoon | A1 | `time.json` | `en:afternoon:noun` | Matches afternoon (en:afternoon:noun) in time.json |
| 129 | Time | evening | A1 | `time.json` | `en:evening:noun` | Matches evening (en:evening:noun) in time.json |
| 130 | Time | night | A1 | `time.json` | `en:night:noun` | Matches night (en:night:noun) in time.json |
| 131 | Time | week | A1 | `time.json` | `en:week:noun` | Matches week (en:week:noun) in time.json |
| 132 | Time | month | A1 | `time.json` | `en:month:noun` | Matches month (en:month:noun) in time.json |
| 133 | Time | year | A1 | `time.json` | `en:year:noun` | Matches year (en:year:noun) in time.json |
| 134 | Time | hour | A1 | `time.json` | `en:hour:noun` | Matches hour (en:hour:noun) in time.json |
| 135 | Time | minute | A1 | `time.json` | `en:minute:noun` | Matches minute (en:minute:noun) in time.json |
| 136 | Time | day | A1 | `time.json` | `en:day:noun` | Matches day (en:day:noun) in time.json |
| 137 | Verbs | to be | A1 | `auxiliary_verbs.json` | `en:be:verb` | Matches be (en:be:verb) in auxiliary_verbs.json |
| 138 | Verbs | to have | A1 | `auxiliary_verbs.json` | `en:have:verb` | Matches have (en:have:verb) in auxiliary_verbs.json |
| 139 | Verbs | to do/make | A1 | `daily_verbs.json` | `en:do:phrase` | Matches do (en:do:phrase) in classroom_phrases.json |
| 140 | Verbs | to go | A1 | `daily_verbs.json` | `en:to-go:phrase` | Matches to go (en:to-go:phrase) in food_drink.json |
| 141 | Verbs | to come | A1 | `daily_verbs.json` | `en:come:verb` | Matches come (en:come:verb) in classroom_phrases.json |
| 142 | Verbs | to want | A1 | `daily_verbs.json` | `en:want:verb` | Matches want (en:want:verb) in verbs.json |
| 143 | Verbs | to be able to/can | A1 | `daily_verbs.json` | `en:be-able-to:verb` | Matches be able to (en:be-able-to:verb) in a2/expressions.json (level A2) |
| 144 | Verbs | to know | A1 | `daily_verbs.json` | `en:know:verb` | Matches know (en:know:verb) in verbs.json |
| 145 | Verbs | to see | A1 | `daily_verbs.json` | `en:see:verb` | Matches see (en:see:verb) in verbs.json |
| 146 | Verbs | to say/tell | A1 | `daily_verbs.json` | `en:say:phrase` | Matches say (en:say:phrase) in classroom_phrases.json |
| 147 | Verbs | to speak | A1 | `daily_verbs.json` | `en:speak:verb` | Matches speak (en:speak:verb) in verbs.json |
| 148 | Verbs | to eat | A1 | `daily_verbs.json` | `en:eat:verb` | Matches eat (en:eat:verb) in verbs.json |
| 149 | Verbs | to drink | A1 | `daily_verbs.json` | `en:drink:verb` | Matches drink (en:drink:verb) in verbs.json |
| 150 | Verbs | to sleep | A1 | `daily_verbs.json` | `en:sleep:verb` | Matches sleep (en:sleep:verb) in verbs.json |
| 151 | Verbs | to live | A1 | `daily_verbs.json` | `en:live:verb` | Matches live (en:live:verb) in verbs.json |
| 152 | Verbs | to work | A1 | `daily_verbs.json` | `en:work:verb` | Matches work (en:work:verb) in jobs.json |
| 153 | Verbs | to study | A1 | `daily_verbs.json` | `en:study:verb` | Matches study (en:study:verb) in verbs.json |
| 154 | Verbs | to read | A1 | `daily_verbs.json` | `en:read:verb` | Matches read (en:read:verb) in verbs.json |
| 155 | Verbs | to write | A1 | `daily_verbs.json` | `en:write:verb` | Matches write (en:write:verb) in verbs.json |
| 156 | Verbs | to listen | A1 | `daily_verbs.json` | `en:listen:verb` | Matches listen (en:listen:verb) in verbs.json |
| 157 | Verbs | to look/watch | A1 | `daily_verbs.json` | `en:look:verb` | Matches look (en:look:verb) in verbs.json |
| 158 | Verbs | to understand | A1 | `daily_verbs.json` | `en:understand:phrase` | Matches understand (en:understand:phrase) in expressions.json |
| 159 | Verbs | to think | A1 | `daily_verbs.json` | `en:think:phrase` | Matches think (en:think:phrase) in classroom_phrases.json |
| 160 | Verbs | to love | A1 | `daily_verbs.json` | `en:love:verb` | Matches love (en:love:verb) in verbs.json |
| 161 | Verbs | to like | A1 | `daily_verbs.json` | `en:like:verb` | Matches like (en:like:verb) in expressions.json |
| 162 | Verbs | to need | A1 | `daily_verbs.json` | `en:need:verb` | Matches need (en:need:verb) in verbs.json |
| 163 | Verbs | to buy | A1 | `daily_verbs.json` | `en:buy:noun` | Matches buy (en:buy:noun) in money_shopping.json |
| 164 | Verbs | to sell | A1 | `daily_verbs.json` | `en:sell:noun` | Matches sell (en:sell:noun) in money_shopping.json |
| 165 | Verbs | to pay | A1 | `daily_verbs.json` | `en:pay:noun` | Matches pay (en:pay:noun) in jobs.json |
| 166 | Verbs | to open | A1 | `daily_verbs.json` | `en:open:verb` | Matches open (en:open:verb) in verbs.json |
| 167 | Verbs | to close | A1 | `daily_verbs.json` | `en:close:adjective` | Matches close (en:close:adjective) in general_adjectives.json |
| 168 | Verbs | to give | A1 | `daily_verbs.json` | `en:give:verb` | Matches give (en:give:verb) in verbs.json |
| 169 | Verbs | to take | A1 | `daily_verbs.json` | `en:take:verb` | Matches take (en:take:verb) in classroom_phrases.json |
| 170 | Verbs | to walk | A1 | `daily_verbs.json` | `en:walk:noun` | Matches walk (en:walk:noun) in places_transport.json |
| 171 | Verbs | to run | A1 | `daily_verbs.json` | `en:run:verb` | Matches run (en:run:verb) in daily_verbs.json |
| 172 | Verbs | to stop | A1 | `daily_verbs.json` | `en:stop:noun` | Matches stop (en:stop:noun) in places_transport.json |
| 173 | Verbs | to start/begin | A1 | `daily_verbs.json` | `en:start:verb` | Matches start (en:start:verb) in verbs.json |
| 174 | Verbs | to finish | A1 | `daily_verbs.json` | `en:finish:verb` | Matches finish (en:finish:verb) in verbs.json |
| 175 | Verbs | to play | A1 | `daily_verbs.json` | `en:play:verb` | Matches play (en:play:verb) in verbs.json |
| 176 | Verbs | to sing | A1 | `daily_verbs.json` | `en:sing:noun` | Matches sing (en:sing:noun) in sports_hobbies.json |
| 177 | Verbs | to dance | A1 | `daily_verbs.json` | `en:dance:noun` | Matches dance (en:dance:noun) in sports_hobbies.json |
| 178 | Verbs | to wait | A1 | `daily_verbs.json` | `en:wait:verb` | Matches wait (en:wait:verb) in verbs.json |
| 179 | Verbs | to look for | A1 | `daily_verbs.json` | `en:look-for:verb` | Matches look for (en:look-for:verb) in a2/phrasal_verbs.json (level A2) |
| 180 | Verbs | to find | A1 | `daily_verbs.json` | `en:find:verb` | Matches find (en:find:verb) in verbs.json |
| 181 | Verbs | to ask | A1 | `daily_verbs.json` | `en:ask:verb` | Matches ask (en:ask:verb) in verbs.json |
| 182 | Verbs | to answer | A1 | `daily_verbs.json` | `en:answer:verb` | Matches answer (en:answer:verb) in verbs.json |
| 183 | Verbs | to help | A1 | `daily_verbs.json` | `en:help:verb` | Matches help (en:help:verb) in verbs.json |
| 184 | Verbs | to remember | A1 | `daily_verbs.json` | `en:remember:verb` | Matches remember (en:remember:verb) in verbs.json |
| 185 | Verbs | to forget | A1 | `daily_verbs.json` | `en:forget:verb` | Matches forget (en:forget:verb) in verbs.json |
| 186 | Verbs | to feel | A1 | `daily_verbs.json` | `en:feel:adjective` | Matches feel (en:feel:adjective) in feelings.json |
| 187 | Verbs | to arrive | A0 | `daily_verbs.json` | `en:arrive:verb` | Matches arrive (en:arrive:verb) in verbs.json |
| 188 | Verbs | to leave | A0 | `daily_verbs.json` | `en:leave:verb` | Matches leave (en:leave:verb) in verbs.json |
| 189 | Verbs | to enter | A1 | `daily_verbs.json` | `None` | Core verb; assigned A1. |
| 190 | Verbs | to exit | A1 | `daily_verbs.json` | `en:exit:noun` | Matches exit (en:exit:noun) in a2/directions.json (level A2) |
| 191 | Verbs | to stand | A1 | `daily_verbs.json` | `en:stand:verb` | Matches stand (en:stand:verb) in verbs.json |
| 192 | Verbs | to sit | A1 | `daily_verbs.json` | `en:sit:verb` | Matches sit (en:sit:verb) in verbs.json |
| 193 | Verbs | to fall | A1 | `daily_verbs.json` | `en:fall:noun` | Matches fall (en:fall:noun) in time.json |
| 194 | Verbs | to bring | A1 | `daily_verbs.json` | `en:bring:verb` | Matches bring (en:bring:verb) in b1/phrasal_verbs.json (level B1) |
| 195 | Verbs | to carry | A1 | `daily_verbs.json` | `en:carry:verb` | Matches carry (en:carry:verb) in daily_verbs.json |
| 196 | Verbs | to cook | A1 | `daily_verbs.json` | `en:cook:verb` | Matches cook (en:cook:verb) in verbs.json |
| 197 | Verbs | to clean | A1 | `daily_verbs.json` | `en:clean:noun` | Matches clean (en:clean:noun) in house_furniture.json |
| 198 | Verbs | to wash | A1 | `daily_verbs.json` | `en:wash:verb` | Matches wash (en:wash:verb) in verbs.json |
| 199 | Verbs | to drive | A1 | `daily_verbs.json` | `en:drive:noun` | Matches drive (en:drive:noun) in places_transport.json |
| 200 | Verbs | to fly | A1 | `daily_verbs.json` | `en:fly:noun` | Matches fly (en:fly:noun) in places_transport.json |
| 201 | Verbs | to swim | A1 | `daily_verbs.json` | `en:swim:verb` | Matches swim (en:swim:verb) in daily_verbs.json |
| 202 | Verbs | to laugh | A1 | `daily_verbs.json` | `en:laugh:verb` | Matches laugh (en:laugh:verb) in daily_verbs.json |
| 203 | Verbs | to cry | A1 | `daily_verbs.json` | `en:cry:verb` | Matches cry (en:cry:verb) in daily_verbs.json |
| 204 | Verbs | to exist | A1 | `daily_verbs.json` | `en:exist:verb` | Matches exist (en:exist:verb) in a2/opinions.json (level A2) |
| 205 | Verbs | to change | A1 | `daily_verbs.json` | `en:change:noun` | Matches change (en:change:noun) in a2/environment.json (level A2) |
| 206 | Verbs | to learn | A1 | `daily_verbs.json` | `en:learn:verb` | Matches learn (en:learn:verb) in verbs.json |
| 207 | Verbs | to teach | A1 | `daily_verbs.json` | `en:teach:verb` | Matches teach (en:teach:verb) in verbs.json |
| 208 | Adjectives | big | A1 | `general_adjectives.json` | `en:big:adjective` | Matches big (en:big:adjective) in adjectives.json |
| 209 | Adjectives | small | A1 | `general_adjectives.json` | `en:small:noun` | Matches small (en:small:noun) in clothes.json |
| 210 | Adjectives | good | A1 | `adjectives.json` | `en:good:adjective` | Matches good (en:good:adjective) in adjectives.json |
| 211 | Adjectives | bad | A1 | `adjectives.json` | `en:bad:adjective` | Matches bad (en:bad:adjective) in adjectives.json |
| 212 | Adjectives | new | A1 | `adjectives.json` | `en:new:adjective` | Matches new (en:new:adjective) in adjectives.json |
| 213 | Adjectives | old | A1 | `adjectives.json` | `en:old:adjective` | Matches old (en:old:adjective) in adjectives.json |
| 214 | Adjectives | young | A1 | `adjectives.json` | `en:young:adjective` | Matches young (en:young:adjective) in adjectives.json |
| 215 | Adjectives | happy | A1 | `feelings.json` | `en:happy:phrase` | Matches happy (en:happy:phrase) in classroom_phrases.json |
| 216 | Adjectives | sad | A1 | `feelings.json` | `en:sad:adjective` | Matches sad (en:sad:adjective) in adjectives.json |
| 217 | Adjectives | beautiful | A1 | `adjectives.json` | `en:beautiful:adjective` | Matches beautiful (en:beautiful:adjective) in adjectives.json |
| 218 | Adjectives | ugly | A1 | `adjectives.json` | `en:ugly:adjective` | Matches ugly (en:ugly:adjective) in adjectives.json |
| 219 | Adjectives | tall | A1 | `general_adjectives.json` | `en:tall:adjective` | Matches tall (en:tall:adjective) in adjectives.json |
| 220 | Adjectives | short | A1 | `general_adjectives.json` | `en:short:adjective` | Matches short (en:short:adjective) in adjectives.json |
| 221 | Adjectives | long | A1 | `general_adjectives.json` | `en:long:adjective` | Matches long (en:long:adjective) in adjectives.json |
| 222 | Adjectives | fast | A1 | `general_adjectives.json` | `en:fast:adverb` | Matches fast (en:fast:adverb) in adverbs_connectors.json |
| 223 | Adjectives | slow | A1 | `general_adjectives.json` | `en:slow:adjective` | Matches slow (en:slow:adjective) in adjectives.json |
| 224 | Adjectives | hot | A1 | `adjectives.json` | `en:hot:adjective` | Matches hot (en:hot:adjective) in animals.json |
| 225 | Adjectives | cold | A1 | `adjectives.json` | `en:cold:adjective` | Matches cold (en:cold:adjective) in animals.json |
| 226 | Adjectives | easy | A1 | `adjectives.json` | `en:easy:adjective` | Matches easy (en:easy:adjective) in adjectives.json |
| 227 | Adjectives | difficult | A1 | `adjectives.json` | `en:difficult:adjective` | Matches difficult (en:difficult:adjective) in adjectives.json |
| 228 | Adjectives | strong | A1 | `adjectives.json` | `en:strong:adjective` | Matches strong (en:strong:adjective) in adjectives.json |
| 229 | Adjectives | weak | A1 | `adjectives.json` | `en:weak:adjective` | Matches weak (en:weak:adjective) in adjectives.json |
| 230 | Adjectives | rich | A1 | `adjectives.json` | `en:rich:adjective` | Matches rich (en:rich:adjective) in adjectives.json |
| 231 | Adjectives | poor | A1 | `adjectives.json` | `en:poor:adjective` | Matches poor (en:poor:adjective) in adjectives.json |
| 232 | Adjectives | clean | A1 | `adjectives.json` | `en:clean:noun` | Matches clean (en:clean:noun) in house_furniture.json |
| 233 | Adjectives | dirty | A1 | `adjectives.json` | `en:dirty:noun` | Matches dirty (en:dirty:noun) in house_furniture.json |
| 234 | Adjectives | full | A1 | `adjectives.json` | `en:full:adjective` | Matches full (en:full:adjective) in adjectives.json |
| 235 | Adjectives | empty | A1 | `adjectives.json` | `en:empty:adjective` | Matches empty (en:empty:adjective) in adjectives.json |
| 236 | Adjectives | open | A1 | `adjectives.json` | `en:open:verb` | Matches open (en:open:verb) in verbs.json |
| 237 | Adjectives | closed | A1 | `adjectives.json` | `en:closed:adjective` | Matches closed (en:closed:adjective) in adjectives.json |
| 238 | Adjectives | early | A1 | `adjectives.json` | `en:early:adjective` | Matches early (en:early:adjective) in adjectives.json |
| 239 | Adjectives | late | A1 | `adjectives.json` | `en:late:adjective` | Matches late (en:late:adjective) in adjectives.json |
| 240 | Adjectives | near | A1 | `adjectives.json` | `en:near:preposition` | Matches near (en:near:preposition) in prepositions.json |
| 241 | Adjectives | far | A1 | `adjectives.json` | `en:far:preposition` | Matches far (en:far:preposition) in prepositions.json |
| 242 | Adjectives | right | A1 | `adjectives.json` | `en:right:adverb` | Matches right (en:right:adverb) in directions.json |
| 243 | Adjectives | left | A1 | `adjectives.json` | `en:left:adverb` | Matches left (en:left:adverb) in directions.json |
| 244 | Adjectives | heavy | A1 | `general_adjectives.json` | `en:heavy:adjective` | Matches heavy (en:heavy:adjective) in adjectives.json |
| 245 | Adjectives | light (weight) | A1 | `adjectives.json` | `en:light:adjective` | Matches light (en:light:adjective) in colors.json |
| 246 | Adjectives | same | A1 | `adjectives.json` | `en:same:adjective` | Matches same (en:same:adjective) in adjectives.json |
| 247 | Adjectives | different | A1 | `adjectives.json` | `en:different:adjective` | Matches different (en:different:adjective) in adjectives.json |
| 248 | Adjectives | important | A1 | `adjectives.json` | `en:important:adjective` | Matches important (en:important:adjective) in adjectives.json |
| 249 | Adjectives | possible | A1 | `adjectives.json` | `en:possible:adjective` | Matches possible (en:possible:adjective) in a2/general_adjectives.json (level A2) |
| 250 | Adjectives | hard | A1 | `adjectives.json` | `en:hard:adverb` | Matches hard (en:hard:adverb) in adverbs_connectors.json |
| 251 | Adjectives | soft | A1 | `adjectives.json` | `en:soft:adjective` | Matches soft (en:soft:adjective) in general_adjectives.json |
| 252 | Adjectives | sweet | A1 | `adjectives.json` | `en:sweet:noun` | Matches sweet (en:sweet:noun) in food_drink.json |
| 253 | Adjectives | bitter | A1 | `adjectives.json` | `en:bitter:adjective` | Matches bitter (en:bitter:adjective) in b1/emotions.json (level B1) |
| 254 | Adjectives | delicious | A1 | `adjectives.json` | `en:delicious:noun` | Matches delicious (en:delicious:noun) in food_drink.json |
| 255 | Adjectives | hungry | A1 | `adjectives.json` | `en:hungry:noun` | Matches hungry (en:hungry:noun) in body_health.json |
| 256 | Adjectives | thirsty | A1 | `adjectives.json` | `en:thirsty:noun` | Matches thirsty (en:thirsty:noun) in body_health.json |
| 257 | Adjectives | tired | A1 | `feelings.json` | `en:tired:noun` | Matches tired (en:tired:noun) in body_health.json |
| 258 | Adjectives | sick | A1 | `feelings.json` | `en:sick:noun` | Matches sick (en:sick:noun) in body_health.json |
| 259 | Food | bread | A1 | `food_drink.json` | `en:bread:noun` | Matches bread (en:bread:noun) in food_drink.json |
| 260 | Food | water | A1 | `food_drink.json` | `en:water:verb` | Matches water (en:water:verb) in daily_verbs.json |
| 261 | Food | milk | A1 | `food_drink.json` | `en:milk:noun` | Matches milk (en:milk:noun) in food_drink.json |
| 262 | Food | coffee | A1 | `food_drink.json` | `en:coffee:noun` | Matches coffee (en:coffee:noun) in food_drink.json |
| 263 | Food | tea | A1 | `food_drink.json` | `en:tea:noun` | Matches tea (en:tea:noun) in food_drink.json |
| 264 | Food | wine | A1 | `food_drink.json` | `en:wine:noun` | Matches wine (en:wine:noun) in food_drink.json |
| 265 | Food | beer | A1 | `food_drink.json` | `en:beer:noun` | Matches beer (en:beer:noun) in food_drink.json |
| 266 | Food | juice | A1 | `food_drink.json` | `en:juice:noun` | Matches juice (en:juice:noun) in food_drink.json |
| 267 | Food | egg | A1 | `food_drink.json` | `en:egg:noun` | Matches egg (en:egg:noun) in food_drink.json |
| 268 | Food | cheese | A1 | `food_drink.json` | `en:cheese:noun` | Matches cheese (en:cheese:noun) in food_drink.json |
| 269 | Food | butter | A1 | `food_drink.json` | `en:butter:noun` | Matches butter (en:butter:noun) in food_drink.json |
| 270 | Food | meat | A1 | `food_drink.json` | `en:meat:noun` | Matches meat (en:meat:noun) in food_drink.json |
| 271 | Food | chicken | A1 | `food_drink.json` | `en:chicken:noun` | Matches chicken (en:chicken:noun) in animals.json |
| 272 | Food | fish | A1 | `food_drink.json` | `en:fish:noun` | Matches fish (en:fish:noun) in animals.json |
| 273 | Food | rice | A1 | `food_drink.json` | `en:rice:noun` | Matches rice (en:rice:noun) in food_drink.json |
| 274 | Food | pasta | A1 | `food_drink.json` | `en:pasta:noun` | Matches pasta (en:pasta:noun) in food_drink.json |
| 275 | Food | soup | A1 | `food_drink.json` | `en:soup:noun` | Matches soup (en:soup:noun) in food_drink.json |
| 276 | Food | salad | A1 | `food_drink.json` | `en:salad:noun` | Matches salad (en:salad:noun) in food_drink.json |
| 277 | Food | fruit | A1 | `food_drink.json` | `en:fruit:noun` | Matches fruit (en:fruit:noun) in food_drink.json |
| 278 | Food | apple | A1 | `food_drink.json` | `en:apple:noun` | Matches apple (en:apple:noun) in food_drink.json |
| 279 | Food | banana | A1 | `food_drink.json` | `en:banana:noun` | Matches banana (en:banana:noun) in food_drink.json |
| 280 | Food | orange (fruit) | A1 | `food_drink.json` | `en:orange:adjective` | Matches orange (en:orange:adjective) in colors.json |
| 281 | Food | tomato | A1 | `food_drink.json` | `en:tomato:noun` | Matches tomato (en:tomato:noun) in food_drink.json |
| 282 | Food | potato | A1 | `food_drink.json` | `en:potato:noun` | Matches potato (en:potato:noun) in food_drink.json |
| 283 | Food | vegetable | A1 | `food_drink.json` | `en:vegetable:noun` | Matches vegetable (en:vegetable:noun) in food_drink.json |
| 284 | Food | salt | A1 | `food_drink.json` | `en:salt:noun` | Matches salt (en:salt:noun) in food_drink.json |
| 285 | Food | sugar | A1 | `food_drink.json` | `en:sugar:noun` | Matches sugar (en:sugar:noun) in food_drink.json |
| 286 | Food | sandwich | A1 | `food_drink.json` | `en:sandwich:noun` | Matches sandwich (en:sandwich:noun) in food_drink.json |
| 287 | Food | cake | A1 | `food_drink.json` | `en:cake:noun` | Matches cake (en:cake:noun) in food_drink.json |
| 288 | Food | ice cream | A0 | `food_drink.json` | `en:ice-cream:noun` | Matches ice cream (en:ice-cream:noun) in food_drink.json |
| 289 | Food | chocolate | A1 | `food_drink.json` | `en:chocolate:noun` | Matches chocolate (en:chocolate:noun) in food_drink.json |
| 290 | Food | breakfast | A1 | `food_drink.json` | `en:breakfast:noun` | Matches breakfast (en:breakfast:noun) in food_drink.json |
| 291 | Food | lunch | A1 | `food_drink.json` | `en:lunch:noun` | Matches lunch (en:lunch:noun) in food_drink.json |
| 292 | Food | dinner | A1 | `food_drink.json` | `en:dinner:noun` | Matches dinner (en:dinner:noun) in food_drink.json |
| 293 | Food | plate | A1 | `food_drink.json` | `en:plate:noun` | Matches plate (en:plate:noun) in house_furniture.json |
| 294 | Food | glass (drinking) | A1 | `food_drink.json` | `en:glass:noun` | Matches glass (en:glass:noun) in house_furniture.json |
| 295 | Food | fork | A1 | `food_drink.json` | `en:fork:noun` | Matches fork (en:fork:noun) in house_furniture.json |
| 296 | Food | knife | A1 | `food_drink.json` | `en:knife:noun` | Matches knife (en:knife:noun) in objects.json |
| 297 | Food | spoon | A1 | `food_drink.json` | `en:spoon:noun` | Matches spoon (en:spoon:noun) in house_furniture.json |
| 298 | Food | napkin | A0 | `food_drink.json` | `en:napkin:noun` | Matches napkin (en:napkin:noun) in house_furniture.json |
| 299 | Food | restaurant | A1 | `food_drink.json` | `en:restaurant:noun` | Matches restaurant (en:restaurant:noun) in food_drink.json |
| 300 | Food | menu | A1 | `food_drink.json` | `en:menu:noun` | Matches menu (en:menu:noun) in food_drink.json |
| 301 | Food | onion | A1 | `food_drink.json` | `en:onion:noun` | Matches onion (en:onion:noun) in food_drink.json |
| 302 | Food | garlic | A0 | `food_drink.json` | `en:garlic:noun` | Matches garlic (en:garlic:noun) in food_drink.json |
| 303 | Food | lemon | A1 | `food_drink.json` | `en:lemon:noun` | Matches lemon (en:lemon:noun) in food_drink.json |
| 304 | Food | honey | A1 | `food_drink.json` | `en:honey:noun` | Matches honey (en:honey:noun) in food_drink.json |
| 305 | Food | yogurt | A1 | `food_drink.json` | `en:yogurt:noun` | Matches yogurt (en:yogurt:noun) in food_drink.json |
| 306 | Food | pepper | A1 | `food_drink.json` | `en:pepper:noun` | Matches pepper (en:pepper:noun) in food_drink.json |
| 307 | Food | oil | A1 | `food_drink.json` | `en:oil:noun` | Matches oil (en:oil:noun) in food_drink.json |
| 308 | Body | head | A1 | `body_health.json` | `en:head:noun` | Matches head (en:head:noun) in body_health.json |
| 309 | Body | face | A1 | `body_health.json` | `en:face:noun` | Matches face (en:face:noun) in body_health.json |
| 310 | Body | eye | A1 | `body_health.json` | `en:eye:noun` | Matches eye (en:eye:noun) in body_health.json |
| 311 | Body | ear | A1 | `body_health.json` | `en:ear:noun` | Matches ear (en:ear:noun) in body_health.json |
| 312 | Body | nose | A1 | `body_health.json` | `en:nose:noun` | Matches nose (en:nose:noun) in body_health.json |
| 313 | Body | mouth | A1 | `body_health.json` | `en:mouth:noun` | Matches mouth (en:mouth:noun) in body_health.json |
| 314 | Body | hand | A1 | `body_health.json` | `en:hand:noun` | Matches hand (en:hand:noun) in body_health.json |
| 315 | Body | arm | A1 | `body_health.json` | `en:arm:noun` | Matches arm (en:arm:noun) in body_health.json |
| 316 | Body | leg | A1 | `body_health.json` | `en:leg:noun` | Matches leg (en:leg:noun) in body_health.json |
| 317 | Body | foot | A1 | `body_health.json` | `en:foot:noun` | Matches foot (en:foot:noun) in body_health.json |
| 318 | Body | finger | A1 | `body_health.json` | `en:finger:noun` | Matches finger (en:finger:noun) in body_health.json |
| 319 | Body | hair | A1 | `body_health.json` | `en:hair:noun` | Matches hair (en:hair:noun) in body_health.json |
| 320 | Body | tooth | A1 | `body_health.json` | `en:tooth:noun` | Matches tooth (en:tooth:noun) in body_health.json |
| 321 | Body | heart | A1 | `body_health.json` | `en:heart:noun` | Matches heart (en:heart:noun) in body_health.json |
| 322 | Body | back | A1 | `body_health.json` | `en:back:noun` | Matches back (en:back:noun) in body_health.json |
| 323 | Body | stomach | A1 | `body_health.json` | `en:stomach:noun` | Matches stomach (en:stomach:noun) in body_health.json |
| 324 | Body | neck | A1 | `body_health.json` | `en:neck:noun` | Matches neck (en:neck:noun) in body_health.json |
| 325 | Body | shoulder | A1 | `body_health.json` | `en:shoulder:noun` | Matches shoulder (en:shoulder:noun) in body_health.json |
| 326 | Body | knee | A1 | `body_health.json` | `en:knee:noun` | Matches knee (en:knee:noun) in body_health.json |
| 327 | Body | skin | A1 | `body_health.json` | `en:skin:noun` | Matches skin (en:skin:noun) in body_health.json |
| 328 | Clothing | clothes | A1 | `clothes.json` | `en:clothes:noun` | Matches clothes (en:clothes:noun) in clothes.json |
| 329 | Clothing | shirt | A1 | `clothes.json` | `en:shirt:noun` | Matches shirt (en:shirt:noun) in clothes.json |
| 330 | Clothing | trousers/pants | A1 | `clothes.json` | `en:trousers:noun` | Matches trousers (en:trousers:noun) in clothes.json |
| 331 | Clothing | dress | A1 | `clothes.json` | `en:dress:verb` | Matches dress (en:dress:verb) in daily_verbs.json |
| 332 | Clothing | skirt | A1 | `clothes.json` | `en:skirt:noun` | Matches skirt (en:skirt:noun) in clothes.json |
| 333 | Clothing | shoes | A1 | `clothes.json` | `en:shoes:noun` | Matches shoes (en:shoes:noun) in clothes.json |
| 334 | Clothing | socks | A1 | `clothes.json` | `en:socks:noun` | Matches socks (en:socks:noun) in clothes.json |
| 335 | Clothing | jacket | A1 | `clothes.json` | `en:jacket:noun` | Matches jacket (en:jacket:noun) in clothes.json |
| 336 | Clothing | coat | A1 | `clothes.json` | `en:coat:noun` | Matches coat (en:coat:noun) in clothes.json |
| 337 | Clothing | hat | A1 | `clothes.json` | `en:hat:noun` | Matches hat (en:hat:noun) in clothes.json |
| 338 | Clothing | t-shirt | A1 | `clothes.json` | `en:t-shirt:noun` | Matches t-shirt (en:t-shirt:noun) in clothes.json |
| 339 | Clothing | sweater | A1 | `clothes.json` | `en:sweater:noun` | Matches sweater (en:sweater:noun) in clothes.json |
| 340 | Clothing | scarf | A1 | `clothes.json` | `en:scarf:noun` | Matches scarf (en:scarf:noun) in clothes.json |
| 341 | Clothing | gloves | A1 | `clothes.json` | `en:gloves:noun` | Matches gloves (en:gloves:noun) in clothes.json |
| 342 | Clothing | belt | A1 | `clothes.json` | `en:belt:noun` | Matches belt (en:belt:noun) in clothes.json |
| 343 | House | house | A1 | `house_furniture.json` | `en:house:noun` | Matches house (en:house:noun) in house_furniture.json |
| 344 | House | apartment | A1 | `house_furniture.json` | `en:apartment:noun` | Matches apartment (en:apartment:noun) in house_furniture.json |
| 345 | House | room | A1 | `house_furniture.json` | `en:room:noun` | Matches room (en:room:noun) in house_furniture.json |
| 346 | House | kitchen | A1 | `house_furniture.json` | `en:kitchen:noun` | Matches kitchen (en:kitchen:noun) in house_furniture.json |
| 347 | House | bathroom | A1 | `house_furniture.json` | `en:bathroom:noun` | Matches bathroom (en:bathroom:noun) in house_furniture.json |
| 348 | House | bedroom | A1 | `house_furniture.json` | `en:bedroom:noun` | Matches bedroom (en:bedroom:noun) in house_furniture.json |
| 349 | House | living room | A0 | `house_furniture.json` | `en:living-room:noun` | Matches living room (en:living-room:noun) in house_furniture.json |
| 350 | House | door | A1 | `house_furniture.json` | `en:door:noun` | Matches door (en:door:noun) in house_furniture.json |
| 351 | House | window | A1 | `house_furniture.json` | `en:window:noun` | Matches window (en:window:noun) in house_furniture.json |
| 352 | House | table | A1 | `house_furniture.json` | `en:table:noun` | Matches table (en:table:noun) in house_furniture.json |
| 353 | House | chair | A1 | `house_furniture.json` | `en:chair:noun` | Matches chair (en:chair:noun) in house_furniture.json |
| 354 | House | bed | A1 | `house_furniture.json` | `en:bed:noun` | Matches bed (en:bed:noun) in house_furniture.json |
| 355 | House | sofa | A1 | `house_furniture.json` | `en:sofa:noun` | Matches sofa (en:sofa:noun) in house_furniture.json |
| 356 | House | wall | A1 | `house_furniture.json` | `en:wall:noun` | Matches wall (en:wall:noun) in house_furniture.json |
| 357 | House | floor | A1 | `house_furniture.json` | `en:floor:noun` | Matches floor (en:floor:noun) in house_furniture.json |
| 358 | House | roof | A1 | `house_furniture.json` | `en:roof:noun` | Matches roof (en:roof:noun) in house_furniture.json |
| 359 | House | key | A1 | `house_furniture.json` | `en:key:noun` | Matches key (en:key:noun) in house_furniture.json |
| 360 | House | lamp | A1 | `house_furniture.json` | `en:lamp:noun` | Matches lamp (en:lamp:noun) in house_furniture.json |
| 361 | House | mirror | A1 | `house_furniture.json` | `en:mirror:noun` | Matches mirror (en:mirror:noun) in objects.json |
| 362 | House | garden | A1 | `house_furniture.json` | `en:garden:noun` | Matches garden (en:garden:noun) in house_furniture.json |
| 363 | House | stairs | A1 | `house_furniture.json` | `en:stairs:noun` | Matches stairs (en:stairs:noun) in house_furniture.json |
| 364 | House | television | A1 | `house_furniture.json` | `en:television:noun` | Matches television (en:television:noun) in technology.json |
| 365 | House | telephone | A1 | `house_furniture.json` | `en:telephone:noun` | Matches telephone (en:telephone:noun) in technology.json |
| 366 | House | computer | A1 | `house_furniture.json` | `en:computer:noun` | Matches computer (en:computer:noun) in technology.json |
| 367 | House | clock | A1 | `house_furniture.json` | `en:clock:noun` | Matches clock (en:clock:noun) in house_furniture.json |
| 368 | Animals | dog | A1 | `animals.json` | `en:dog:noun` | Matches dog (en:dog:noun) in animals.json |
| 369 | Animals | cat | A1 | `animals.json` | `en:cat:noun` | Matches cat (en:cat:noun) in animals.json |
| 370 | Animals | bird | A1 | `animals.json` | `en:bird:noun` | Matches bird (en:bird:noun) in animals.json |
| 371 | Animals | horse | A1 | `animals.json` | `en:horse:noun` | Matches horse (en:horse:noun) in animals.json |
| 372 | Animals | cow | A1 | `animals.json` | `en:cow:noun` | Matches cow (en:cow:noun) in animals.json |
| 373 | Animals | pig | A1 | `animals.json` | `en:pig:noun` | Matches pig (en:pig:noun) in animals.json |
| 374 | Animals | sheep | A1 | `animals.json` | `en:sheep:noun` | Matches sheep (en:sheep:noun) in animals.json |
| 375 | Animals | fish (animal) | A1 | `animals.json` | `en:fish:noun` | Matches fish (en:fish:noun) in animals.json |
| 376 | Animals | mouse | A1 | `animals.json` | `en:mouse:noun` | Matches mouse (en:mouse:noun) in animals.json |
| 377 | Animals | rabbit | A1 | `animals.json` | `en:rabbit:noun` | Matches rabbit (en:rabbit:noun) in animals.json |
| 378 | Animals | lion | A1 | `animals.json` | `en:lion:noun` | Matches lion (en:lion:noun) in animals.json |
| 379 | Animals | elephant | A1 | `animals.json` | `en:elephant:noun` | Matches elephant (en:elephant:noun) in animals.json |
| 380 | Animals | bear | A1 | `animals.json` | `en:bear:noun` | Matches bear (en:bear:noun) in animals.json |
| 381 | Animals | wolf | A1 | `animals.json` | `None` | No direct standalone English A0-A1 entry; assigned A1. |
| 382 | Animals | fox | A1 | `animals.json` | `None` | No direct standalone English A0-A1 entry; assigned A1. |
| 383 | Animals | monkey | A1 | `animals.json` | `en:monkey:noun` | Matches monkey (en:monkey:noun) in animals.json |
| 384 | Animals | duck | A1 | `animals.json` | `en:duck:noun` | Matches duck (en:duck:noun) in animals.json |
| 385 | Animals | chicken (animal) | A1 | `animals.json` | `en:chicken:noun` | Matches chicken (en:chicken:noun) in animals.json |
| 386 | Animals | snake | A1 | `animals.json` | `en:snake:noun` | Matches snake (en:snake:noun) in animals.json |
| 387 | Animals | butterfly | A0 | `animals.json` | `en:butterfly:noun` | Matches butterfly (en:butterfly:noun) in animals.json |
| 388 | Nature | sun | A1 | `weather.json` | `en:sun:noun` | Matches sun (en:sun:noun) in animals.json |
| 389 | Nature | moon | A1 | `weather.json` | `en:moon:noun` | Matches moon (en:moon:noun) in animals.json |
| 390 | Nature | star | A1 | `geography.json` | `en:star:noun` | Matches star (en:star:noun) in animals.json |
| 391 | Nature | sky | A1 | `geography.json` | `en:sky:noun` | Matches sky (en:sky:noun) in animals.json |
| 392 | Nature | rain | A1 | `weather.json` | `en:rain:noun` | Matches rain (en:rain:noun) in animals.json |
| 393 | Nature | snow | A1 | `weather.json` | `en:snow:noun` | Matches snow (en:snow:noun) in animals.json |
| 394 | Nature | wind | A1 | `weather.json` | `en:wind:noun` | Matches wind (en:wind:noun) in animals.json |
| 395 | Nature | cloud | A1 | `weather.json` | `en:cloud:noun` | Matches cloud (en:cloud:noun) in animals.json |
| 396 | Nature | sea | A1 | `geography.json` | `en:sea:noun` | Matches sea (en:sea:noun) in animals.json |
| 397 | Nature | river | A1 | `geography.json` | `en:river:noun` | Matches river (en:river:noun) in animals.json |
| 398 | Nature | mountain | A1 | `geography.json` | `en:mountain:noun` | Matches mountain (en:mountain:noun) in animals.json |
| 399 | Nature | forest | A1 | `geography.json` | `en:forest:noun` | Matches forest (en:forest:noun) in animals.json |
| 400 | Nature | tree | A1 | `geography.json` | `en:tree:noun` | Matches tree (en:tree:noun) in animals.json |
| 401 | Nature | flower | A1 | `geography.json` | `en:flower:noun` | Matches flower (en:flower:noun) in animals.json |
| 402 | Nature | grass | A1 | `geography.json` | `en:grass:noun` | Matches grass (en:grass:noun) in animals.json |
| 403 | Nature | stone | A1 | `geography.json` | `en:stone:noun` | Matches stone (en:stone:noun) in animals.json |
| 404 | Nature | earth | A1 | `geography.json` | `en:earth:noun` | Matches earth (en:earth:noun) in animals.json |
| 405 | Nature | fire | A1 | `geography.json` | `en:fire:noun` | Matches fire (en:fire:noun) in b1/urban_housing.json (level B1) |
| 406 | Nature | air | A1 | `geography.json` | `en:air:noun` | Matches air (en:air:noun) in a2/living.json (level A2) |
| 407 | Nature | weather | A1 | `weather.json` | `en:weather:noun` | Matches weather (en:weather:noun) in animals.json |
| 408 | Transport | car | A1 | `places_transport.json` | `en:car:noun` | Matches car (en:car:noun) in places_transport.json |
| 409 | Transport | bus | A1 | `places_transport.json` | `en:bus:noun` | Matches bus (en:bus:noun) in places_transport.json |
| 410 | Transport | train | A1 | `places_transport.json` | `en:train:noun` | Matches train (en:train:noun) in places_transport.json |
| 411 | Transport | plane | A1 | `places_transport.json` | `en:plane:noun` | Matches plane (en:plane:noun) in places_transport.json |
| 412 | Transport | bicycle | A1 | `places_transport.json` | `en:bicycle:noun` | Matches bicycle (en:bicycle:noun) in places_transport.json |
| 413 | Transport | boat | A1 | `places_transport.json` | `en:boat:noun` | Matches boat (en:boat:noun) in places_transport.json |
| 414 | Transport | taxi | A1 | `places_transport.json` | `en:taxi:noun` | Matches taxi (en:taxi:noun) in places_transport.json |
| 415 | Transport | ship | A1 | `places_transport.json` | `en:ship:noun` | Matches ship (en:ship:noun) in places_transport.json |
| 416 | Transport | metro/subway | A1 | `places_transport.json` | `en:metro:noun` | Matches metro (en:metro:noun) in a2/tourism.json (level A2) |
| 417 | Transport | motorcycle | A1 | `places_transport.json` | `None` | Transport concept; assigned A1. |
| 418 | Transport | road | A1 | `places_transport.json` | `en:road:noun` | Matches road (en:road:noun) in places_transport.json |
| 419 | Transport | airport | A1 | `places_transport.json` | `en:airport:noun` | Matches airport (en:airport:noun) in places_transport.json |
| 420 | Places | city | A1 | `places_transport.json` | `en:city:noun` | Matches city (en:city:noun) in geography.json |
| 421 | Places | street | A1 | `places_transport.json` | `en:street:noun` | Matches street (en:street:noun) in places_transport.json |
| 422 | Places | school | A1 | `places_transport.json` | `en:school:noun` | Matches school (en:school:noun) in places_transport.json |
| 423 | Places | hospital | A1 | `places_transport.json` | `en:hospital:noun` | Matches hospital (en:hospital:noun) in body_health.json |
| 424 | Places | shop/store | A1 | `places_transport.json` | `en:shop:noun` | Matches shop (en:shop:noun) in jobs.json |
| 425 | Places | market | A1 | `places_transport.json` | `en:market:noun` | Matches market (en:market:noun) in money_shopping.json |
| 426 | Places | church | A1 | `places_transport.json` | `en:church:noun` | Matches church (en:church:noun) in places_transport.json |
| 427 | Places | park | A1 | `places_transport.json` | `en:park:noun` | Matches park (en:park:noun) in places_transport.json |
| 428 | Places | bank | A1 | `places_transport.json` | `en:bank:noun` | Matches bank (en:bank:noun) in money_shopping.json |
| 429 | Places | station | A1 | `places_transport.json` | `en:station:noun` | Matches station (en:station:noun) in places_transport.json |
| 430 | Places | hotel | A1 | `places_transport.json` | `en:hotel:noun` | Matches hotel (en:hotel:noun) in places_transport.json |
| 431 | Places | library | A1 | `places_transport.json` | `en:library:noun` | Matches library (en:library:noun) in places_transport.json |
| 432 | Places | museum | A1 | `places_transport.json` | `en:museum:noun` | Matches museum (en:museum:noun) in places_transport.json |
| 433 | Places | university | A1 | `places_transport.json` | `en:university:noun` | Matches university (en:university:noun) in places_transport.json |
| 434 | Places | country | A1 | `places_transport.json` | `en:country:noun` | Matches country (en:country:noun) in geography.json |
| 435 | Professions | teacher | A1 | `jobs.json` | `en:teacher:noun` | Matches teacher (en:teacher:noun) in jobs.json |
| 436 | Professions | doctor | A1 | `jobs.json` | `en:doctor:noun` | Matches doctor (en:doctor:noun) in body_health.json |
| 437 | Professions | student | A1 | `jobs.json` | `en:student:noun` | Matches student (en:student:noun) in jobs.json |
| 438 | Professions | engineer | A1 | `jobs.json` | `en:engineer:noun` | Matches engineer (en:engineer:noun) in jobs.json |
| 439 | Professions | lawyer | A0 | `jobs.json` | `en:lawyer:noun` | Matches lawyer (en:lawyer:noun) in jobs.json |
| 440 | Professions | nurse | A1 | `jobs.json` | `en:nurse:noun` | Matches nurse (en:nurse:noun) in body_health.json |
| 441 | Professions | police officer | A0 | `jobs.json` | `en:police-officer:noun` | Matches police officer (en:police-officer:noun) in jobs.json |
| 442 | Professions | cook/chef | A1 | `jobs.json` | `en:cook:verb` | Matches cook (en:cook:verb) in verbs.json |
| 443 | Professions | driver | A1 | `jobs.json` | `en:driver:noun` | Matches driver (en:driver:noun) in jobs.json |
| 444 | Professions | worker | A1 | `jobs.json` | `en:worker:noun` | Matches worker (en:worker:noun) in jobs.json |
| 445 | School | book | A1 | `school.json` | `en:book:noun` | Matches book (en:book:noun) in school.json |
| 446 | School | pen | A1 | `school.json` | `en:pen:noun` | Matches pen (en:pen:noun) in school.json |
| 447 | School | pencil | A1 | `school.json` | `en:pencil:noun` | Matches pencil (en:pencil:noun) in school.json |
| 448 | School | paper | A1 | `school.json` | `en:paper:noun` | Matches paper (en:paper:noun) in school.json |
| 449 | School | notebook | A1 | `school.json` | `en:notebook:noun` | Matches notebook (en:notebook:noun) in school.json |
| 450 | School | desk | A1 | `school.json` | `en:desk:noun` | Matches desk (en:desk:noun) in house_furniture.json |
| 451 | School | bag | A1 | `school.json` | `en:bag:noun` | Matches bag (en:bag:noun) in objects.json |
| 452 | School | money | A1 | `school.json` | `en:money:noun` | Matches money (en:money:noun) in jobs.json |
| 453 | School | letter | A1 | `school.json` | `en:letter:noun` | Matches letter (en:letter:noun) in objects.json |
| 454 | School | map | A1 | `school.json` | `en:map:noun` | Matches map (en:map:noun) in objects.json |
| 455 | School | picture/photo | A1 | `school.json` | `en:picture:noun` | Matches picture (en:picture:noun) in technology.json |
| 456 | School | name | A1 | `school.json` | `en:name:noun` | Matches name (en:name:noun) in family.json |
| 457 | School | word | A1 | `school.json` | `en:word:noun` | Matches word (en:word:noun) in school.json |
| 458 | School | language | A1 | `school.json` | `en:language:noun` | Matches language (en:language:noun) in nationalities.json |
| 459 | School | question | A1 | `school.json` | `en:question:noun` | Matches question (en:question:noun) in school.json |
| 460 | Prepositions | in | A1 | `prepositions.json` | `en:in:preposition` | Matches in (en:in:preposition) in daily_verbs.json |
| 461 | Prepositions | on | A1 | `prepositions.json` | `en:on:preposition` | Matches on (en:on:preposition) in clothes.json |
| 462 | Prepositions | under | A1 | `prepositions.json` | `en:under:preposition` | Matches under (en:under:preposition) in prepositions.json |
| 463 | Prepositions | with | A1 | `prepositions.json` | `en:with:preposition` | Matches with (en:with:preposition) in prepositions.json |
| 464 | Prepositions | without | A1 | `prepositions.json` | `en:without:preposition` | Matches without (en:without:preposition) in prepositions.json |
| 465 | Prepositions | before | A1 | `prepositions.json` | `en:before:preposition` | Matches before (en:before:preposition) in adverbs_connectors.json |
| 466 | Prepositions | after | A1 | `prepositions.json` | `en:after:preposition` | Matches after (en:after:preposition) in adverbs_connectors.json |
| 467 | Prepositions | between | A1 | `prepositions.json` | `en:between:preposition` | Matches between (en:between:preposition) in directions.json |
| 468 | Prepositions | towards | A1 | `prepositions.json` | `None` | Directional preposition; assigned A1. |
| 469 | Prepositions | from | A1 | `prepositions.json` | `en:from:preposition` | Matches from (en:from:preposition) in prepositions.json |
| 470 | Prepositions | for | A1 | `prepositions.json` | `en:for:preposition` | Matches for (en:for:preposition) in classroom_phrases.json |
| 471 | Prepositions | about | A1 | `prepositions.json` | `en:about:preposition` | Matches about (en:about:preposition) in prepositions.json |
| 472 | Adverbs | very | A1 | `adverbs_connectors.json` | `en:very:adverb` | Matches very (en:very:adverb) in adverbs_connectors.json |
| 473 | Adverbs | also/too | A1 | `adverbs_connectors.json` | `en:also:adverb` | Matches also (en:also:adverb) in adverbs_connectors.json |
| 474 | Adverbs | always | A1 | `adverbs_connectors.json` | `en:always:adverb` | Matches always (en:always:adverb) in adverbs_connectors.json |
| 475 | Adverbs | never | A1 | `adverbs_connectors.json` | `en:never:adverb` | Matches never (en:never:adverb) in adverbs_connectors.json |
| 476 | Adverbs | often | A1 | `adverbs_connectors.json` | `en:often:adverb` | Matches often (en:often:adverb) in adverbs_connectors.json |
| 477 | Adverbs | sometimes | A1 | `adverbs_connectors.json` | `en:sometimes:adverb` | Matches sometimes (en:sometimes:adverb) in adverbs_connectors.json |
| 478 | Adverbs | here | A1 | `adverbs_connectors.json` | `en:here:adverb` | Matches here (en:here:adverb) in adverbs_connectors.json |
| 479 | Adverbs | there | A1 | `adverbs_connectors.json` | `en:there:adverb` | Matches there (en:there:adverb) in adverbs_connectors.json |
| 480 | Adverbs | maybe | A1 | `adverbs_connectors.json` | `en:maybe:adverb` | Matches maybe (en:maybe:adverb) in adverbs_connectors.json |
| 481 | Adverbs | already | A1 | `adverbs_connectors.json` | `en:already:adverb` | Matches already (en:already:adverb) in adverbs_connectors.json |
| 482 | Adverbs | still/yet | A1 | `adverbs_connectors.json` | `en:still:adverb` | Matches still (en:still:adverb) in adverbs_connectors.json |
| 483 | Adverbs | more | A1 | `adverbs_connectors.json` | `en:more:adverb` | Matches more (en:more:adverb) in a2/comparisons.json (level A2) |
| 484 | Adverbs | less | A1 | `adverbs_connectors.json` | `en:less:adverb` | Matches less (en:less:adverb) in a2/comparisons.json (level A2) |
| 485 | Adverbs | enough | A1 | `adverbs_connectors.json` | `en:enough:adverb` | Matches enough (en:enough:adverb) in a2/comparisons.json (level A2) |
| 486 | Adverbs | together | A0 | `adverbs_connectors.json` | `en:together:adverb` | Matches together (en:together:adverb) in adverbs_connectors.json |
| 487 | Countries | France | A1 | `nationalities.json` | `en:france:noun` | Matches France (en:france:noun) in geography.json |
| 488 | Countries | Italy | A1 | `nationalities.json` | `en:italy:noun` | Matches Italy (en:italy:noun) in geography.json |
| 489 | Countries | Russia | A1 | `nationalities.json` | `en:russia:noun` | Matches Russia (en:russia:noun) in geography.json |
| 490 | Countries | Greece | A0 | `nationalities.json` | `None` | Country proper noun; assigned A0 alongside other countries in nationalities.json. |
| 491 | Countries | England | A1 | `nationalities.json` | `en:england:noun` | Matches England (en:england:noun) in geography.json |
| 492 | Countries | Germany | A1 | `nationalities.json` | `en:germany:noun` | Matches Germany (en:germany:noun) in geography.json |
| 493 | Countries | Spain | A1 | `nationalities.json` | `en:spain:noun` | Matches Spain (en:spain:noun) in geography.json |
| 494 | Countries | world | A1 | `nationalities.json` | `en:world:noun` | Matches world (en:world:noun) in animals.json |
| 495 | Countries | America | A1 | `nationalities.json` | `en:america:noun` | Matches America (en:america:noun) in geography.json |
| 496 | Countries | China | A1 | `nationalities.json` | `en:china:noun` | Matches China (en:china:noun) in geography.json |
| 497 | Misc | work/job | A1 | `common_nouns.json` | `en:work:verb` | Matches work (en:work:verb) in jobs.json |
| 498 | Misc | life | A1 | `common_nouns.json` | `en:life:noun` | Matches life (en:life:noun) in b2/health.json (level B2) |
| 499 | Misc | love | A1 | `common_nouns.json` | `en:love:verb` | Matches love (en:love:verb) in verbs.json |
| 500 | Misc | music | A1 | `common_nouns.json` | `en:music:noun` | Matches music (en:music:noun) in school.json |
| 501 | Misc | film/movie | A1 | `common_nouns.json` | `en:film:noun` | Matches film (en:film:noun) in sports_hobbies.json |
| 502 | Misc | game | A1 | `common_nouns.json` | `en:game:noun` | Matches game (en:game:noun) in sports_hobbies.json |
| 503 | Misc | sport | A1 | `common_nouns.json` | `en:sport:noun` | Matches sport (en:sport:noun) in sports_hobbies.json |
| 504 | Misc | news | A1 | `common_nouns.json` | `en:news:noun` | Matches news (en:news:noun) in common_nouns.json |
| 505 | Misc | problem | A1 | `common_nouns.json` | `en:problem:noun` | Matches problem (en:problem:noun) in common_nouns.json |
| 506 | Misc | idea | A1 | `common_nouns.json` | `en:idea:noun` | Matches idea (en:idea:noun) in common_nouns.json |
| 507 | Misc | way/road | A1 | `common_nouns.json` | `en:way:noun` | Matches way (en:way:noun) in places_transport.json |
| 508 | Misc | number | A1 | `common_nouns.json` | `en:number:noun` | Matches number (en:number:noun) in measurement.json |
| 509 | Misc | color | A1 | `common_nouns.json` | `en:color:adjective` | Matches color (en:color:adjective) in colors.json |
| 510 | Misc | price | A1 | `common_nouns.json` | `en:price:noun` | Matches price (en:price:noun) in money_shopping.json |
| 511 | Misc | gift | A1 | `common_nouns.json` | `en:gift:noun` | Matches gift (en:gift:noun) in common_nouns.json |
| 512 | Misc | holiday/vacation | A1 | `common_nouns.json` | `en:holiday:noun` | Matches holiday (en:holiday:noun) in time.json |
| 513 | Misc | party | A1 | `common_nouns.json` | `en:party:noun` | Matches party (en:party:noun) in sports_hobbies.json |
| 514 | Misc | dream | A1 | `common_nouns.json` | `en:dream:noun` | Matches dream (en:dream:noun) in common_nouns.json |
| 515 | Misc | health | A1 | `common_nouns.json` | `en:health:noun` | Matches health (en:health:noun) in b1/health.json (level B1) |
| 516 | Misc | peace | A1 | `common_nouns.json` | `en:peace:noun` | Matches peace (en:peace:noun) in common_nouns.json |

## 4. Ambiguities, Edge Cases & Review Items

During data analysis, the following structural and linguistic ambiguities were identified in the source sheet for human review before language file generation tasks execute:

1. **Grammatical Metadata Requirements**:
   - **Nouns**: The source sheet lists bare nouns without articles or explicit gender tags (e.g. French `zéro`, Italian `casa`, Russian `дом`, Greek `σπίτι`). During task execution, language tasks must add mandatory grammatical metadata according to `schemas/vocabulary.schema.json` (e.g. `article`, `gender`, `countability`, `plural_form`).
   - **Verbs**: Infinitive forms vary across languages (e.g. French `parler`, Italian `parlare`, Russian `говорить`, Greek `μιλάω` 1st person singular present). Language tasks will generate standard dictionary headwords.
2. **Slash-Separated Concepts**:
   - Source entries such as `to do/make` (French `faire`, Italian `fare`, Russian `делать`, Greek `κάνω`), `trousers/pants` (French `pantalon`), `metro/subway` (French `métro`), `how much/many` (French `combien`) represent combined concepts in English. Each target language entry will capture its canonical single term.
3. **Pronominal & Form Variations**:
   - `you (sg)` vs `you (pl)`: French `tu` (informal singular) / `vous` (plural/formal); Italian `tu` / `voi`; Russian `ты` / `вы`; Greek `εσύ` / `εσείς`. Entries will be distinct in target language files.
4. **Transliterations**:
   - Russian and Greek tabs include a `Transliteration` column. Transliterations are auxiliary pronunciation guides for non-Latin script beginner entries. Primary phonetics in `COSYdata` will use IPA transcriptions (`transcription` field) per schema rules.
5. **Concepts Lacking Direct Standalone English A0–A1 Match**:
   - `wolf` (#381) and `fox` (#382): Common beginner animal concepts. Assigned level `A1` under `animals.json`.
   - `to enter` (#189): Core motion verb (`entrer`, `entrare`, `входить`, `μπαίνω`). Assigned level `A1` under `daily_verbs.json`.
   - `metro/subway` (#416) and `motorcycle` (#417): Assigned level `A1` under `places_transport.json`.
   - `towards` (#468): Directional preposition. Assigned level `A1` under `prepositions.json`.
   - `Greece` (#490): Country name. Assigned level `A0` under `nationalities.json` alongside other country entries.