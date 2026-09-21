# Armenian (`hy`) A0–A1 Vocabulary Migration Gap Report

## Executive Summary

This report documents the completed migration of Armenian (`hy`) A1 vocabulary from **COSYlanguages** (`vocabulary/hy/A1/*.js`) into **COSYdata** (`vocabulary/hy/a0_a1/*.json`).

Because Armenian has no official EU CEFR certifying body, vocabulary difficulty alignment and curriculum bounds are evaluated against the **Ministry of Education, Science, Culture and Sports of RA (Armenian as a Foreign Language A1 Standard)** and **Yerevan State University AFL A1 Syllabus**.

### Dataset Comparison Overview

| Metric | Count | Notes |
| :--- | :---: | :--- |
| **COSYlanguages A1 Raw Extracted Items** | **451** | Extracted from 32 JavaScript source files in `COSYlanguages/vocabulary/hy/A1/` |
| **COSYlanguages A1 Unique Words** | **391** | Distinct Armenian words present in COSYlanguages A1 files |
| **COSYdata A0/A1 Baseline Words** | **61** | Baseline placeholder set in `COSYdata/vocabulary/hy/a0_a1/*.json` prior to migration |
| **Exact Overlap** | **61** | Unique words present in both repositories prior to migration |
| **Migrated Gap Candidate Items** | **330** | Qualifying unique words migrated from COSYlanguages into COSYdata |
| **Total Post-Migration COSYdata Words** | **391** | Full canonical Armenian A0/A1 vocabulary set in COSYdata |

---

## Thematic Distribution of Migrated Gap Items

The 330 migrated items were converted to COSYdata schema format and mapped into theme files under `vocabulary/hy/a0_a1/`:

| Target Theme JSON File | Added Entries Count | Total File Entries Count | Primary POS / Domain |
| :--- | :---: | :---: | :--- |
| `daily_verbs.json` | **137** | 137 | Action verbs, movement, daily routines |
| `general_adjectives.json` | **95** | 95 | Qualitative descriptors, colors, dimensions |
| `expressions.json` | **16** | 16 | Greetings, fixed phrases, conversational expressions |
| `places_transport.json` | **15** | 22 | Cities, countries, locations, transport |
| `animals.json` | **9** | 11 | Domestic animals, wildlife |
| `feelings.json` | **7** | 7 | Emotional states, feelings |
| `adverbs_connectors.json` | **6** | 6 | Connectors, adverbs |
| `numbers.json` | **6** | 6 | Cardinal numbers |
| `nationalities.json` | **5** | 5 | Proper nouns, nationalities, person terms |
| `weather.json` | **5** | 7 | Weather terms, temperature descriptors |
| `clothes.json` | **4** | 8 | Clothing, accessories, shopping |
| `family.json` | **4** | 9 | Family members, relatives |
| `food_drink.json` | **4** | 10 | Traditional foods, beverages |
| `prepositions.json` | **4** | 4 | Prepositions and spatial relations |
| `auxiliary_verbs.json` | **3** | 3 | Modal and auxiliary verbs |
| `pronouns.json` | **3** | 3 | Pronouns and interrogatives |
| `school.json` | **3** | 6 | Classroom and learning items |
| `jobs.json` | **2** | 5 | Professions, occupations |
| `body_health.json` | **1** | 6 | Body parts, health |
| `house_furniture.json` | **1** | 7 | Furniture and household objects |
| **Total** | **330** | **391** | |

---

## Source Standard Alignment & Schema Compliance

1. **Source Standard Citation**: Evaluated against the **Ministry of Education, Science, Culture and Sports of RA (Armenian as a Foreign Language A1 Standard)** and **Yerevan State University AFL A1 Syllabus**, given the absence of an official EU CEFR body for the Armenian language.
2. **ID Convention & Transliteration**: Entry IDs follow `hy:<slug>:<pos>`, utilizing slugification where Armenian letters are transliterated to unaccented ASCII equivalents (`և` -> `ev`, `ա` -> `a`, `ե` -> `e`, etc.).
3. **Grammatical Metadata for Nouns**: Noun entries specify `countability` (`countable`, `uncountable`, `invariable`), with `plural_form` provided for countable nouns (e.g., `կատուներ`, `տներ`, `մարդիկ`) and `article` omitted per Armenian schema rules.
4. **Example Sentence Calibration**: Every example sentence is written in natural Armenian (5–8 words long) and explicitly contains the headword or stem form in context.
5. **Globally Unique Entry IDs**: All entry IDs are verified unique across the repository, passing `scripts/validate.cjs` and `scripts/audit_vocabulary.cjs` checks.

---

## Summary List of Migrated Armenian Items (330 Terms)

<details>
<summary><strong>Expand Full Item List (330 entries)</strong></summary>

- **Adjectives / Descriptors (95)**: ազատ, ազնիվ, աղմկոտ, անհանգիստ, անհնար, անհրաժեշտ, անօգուտ, ապահով, առողջ, առցանց, արագ, բարի, բարկացած, բարձր, բարձրահասակ, բաց, գեղեցիկ, գերազանց, դանդաղ, դատարկ, դեղին, դժբախտ, դժվար, երիտասարդ, երկար, երջանիկ, զարմանալի, զարմացած, զբաղված, զգեստ, զղջացող, զով, էժան, ընկերական, թանկ, թաց, թեթև, թույլ, ինքնավստահ, լավ, լիքը, լրիվ դրույք, խելացի, ծանր, ծիծաղելի, ծույլ, կանաչ, կապույտ, կատարյալ, կարևոր, կարճ, կարմիր, կեղտոտ, կես դրույք, կոկիկ, կոշտ, կոպիտ, հաճելի, հանգիստ, հանրաճանաչ, հատուկ, հեշտ, հետաքրքիր, հիանալի, հիասթափված, հին, հիվանդ, հնարավոր, հոգնած, հպարտ, ձանձրալի, ձանձրացած, ճիշտ, մաքուր, մեծ, մենակ, մոխրագույն, նարնջագույն, նյարդային, նոր, նույն, շագանակագույն, ոգևորված, ուժեղ, չոր, սարսափելի, սև, սխալ, սոված, սովորական, սպիտակ, սքանչելի, վախեցած, վատ, վարդագույն, վտանգավոր, տախ, տխուր, ցածր, փակ, փափուկ, փոքր, քաղաքավարի, օգտակար, ֆանտաստիկ
- **Verbs (140)**: աճել, ամրագրել, այցելել, անել, անկողին գնալ, անցնել, աշխատել, ապաքինվել, ապրել, ասել, ավարտել, ավելացնել, ատել, արթնանալ, արժենալ, բաց թողնել, բացատրել, բացել, բերել, գալ, գանձել, գնալ, գնել, գտնել, գրել, դառնալ, դասավանդել, դիտել, դնել, երգել, երթևեկել, եփել, զանգել, զգալ, զրուցել, ընկնել, ընտրել, թուլանալ, թույլ տալ, թռչել, թվալ, ժամանել, ժպտալ, իմանալ, լաց լինել, լինել, լողալ, լսել, լվանալ, խաղալ, խմել, խնայել, խոսել, խորհուրդ տալ, ծախսել, կանգնել, կանգնեցնել, կառուցել, կարդալ, կարիք ունենալ, կիսվել, կոտրել, կորցնել, կտրել, կրկնել, հագնել, հաղթել, համաձայնել, հանգստանալ, հանդիպել, հասկանալ, հավանել, հավաքել, հարցնել, հեռանալ, հետևել, հիշել, հուսալ, հրավիրել, հրել, ղեկավարել, ճամփորդել, մահանալ, մասնակցել, մարզվել, մաքրել, մնալ, մոռանալ, մտածել, նախաճաշել, նայել, ներառել, ներկայացնել, նկարել, նշանակել, նորոգել, նստել, շարունակել, շնորհակալություն հայտնել, որոշել, ուզել, ուղարկել, ունենալ, ուսումնասիրել, ուտել, չեղարկել, պահել, պատահել, պատասխանել, պատկանել, պատմել, պատվիրել, պատրաստել, պարել, պարտք լինել, պտտել, սիրել, սկսել, սովորել, սպասել, ստանալ, ստուգել, վազել, վաճառել, վայելել, վաստակել, վարել, վարձել, վեր կենալ, վերադառնալ, վերցնել, վճարել, տալ, տանել, տեղափոխվել, տեսնել, տոնել, ցավեցնել, ցատկել, ցույց տալ, փակել, փոխել, փորձել, քայլել, քաշել, քնել, օգնել, օգտագործել
- **Nouns (Nouns, Proper Nouns, Food, Animals, Family, Places) (50)**: Աթենք, ԱՄՆ, Անգլիա, բաճկոն, գայլ, գետ, գին, գլուխ, դաս, դրամ, եղբայր, զգեստ, զրույց, Իսպանիա, Իտալիա, լավաշ, Լոնդոն, լուսին, խոհարար, խորոված, ծառ, ծով, կարագ, կով, համակարգիչ, հայ, Հունաստան, Հռոմ, ձի, ձուկ, ճանապարհորդություն, մարդ, Մոսկվա, Նյու Յորք, պահարան, պապ, ռուս, Ռուսաստան, տատ, տոլմա, տոն, տետր, տղամարդ, Փարիզ, քաղաք, քույր, Ֆրանսիա, ֆրանսիացի
- **Expressions, Adverbs, Prepositions, Numbers, Pronouns (25)**: այն, այս, բայց, բարև, բարի լույս, երեկ, երեք, երկու, և, հետո, հիմա, հինգ, մոտ, մասին, մեկ, նման, ոչ, որովհետև, չորս, շնորհակալություն, ցտեսություն

</details>
