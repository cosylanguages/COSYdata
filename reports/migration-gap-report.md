# COSYdata vs COSYlanguages A1 Vocabulary Migration Gap & Functional Phrases Parity Audit

This report presents a comprehensive per-language audit comparing A1 level vocabulary and functional phrases between **COSYlanguages** (legacy UI repo) and **COSYdata** (canonical data repository).

- **COSYlanguages Source Directory:** `vocabulary/<lang>/A1/**/*.js` (parsed from IIFE arrays)
- **COSYdata Target Directory:** `vocabulary/<lang>/a0_a1/*.json`
- **Functional Phrases Source/Target:** `COSYdata/functional-phrases/en` vs COSYlanguages `communication/`, `practice/types/`, and `vocabulary/en/A1/`

---

## Executive Summary Table

| Language | Code | COSYlanguages A1 Words | COSYdata A0/A1 Words | Exact Overlap | Candidates to Migrate (Only in COSYlanguages) | Kept / Extra in COSYdata | Likely Near-Duplicates | Classification |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| BA | `ba` | 379 | 61 | 61 | 318 | 0 | 0 | (b) Incomplete Migration |
| BR | `br` | 397 | 62 | 62 | 335 | 0 | 0 | (b) Incomplete Migration |
| CV | `cv` | 449 | 132 | 132 | 317 | 0 | 0 | (b) Incomplete Migration |
| DE | `de` | 479 | 494 | 468 | 11 | 26 | 0 | (a) Curated Subset by Design (COSYdata Expanded) |
| EL | `el` | 301 | 670 | 283 | 18 | 387 | 1 | (a) Curated Subset by Design (COSYdata Expanded) |
| EN | `en` | 1298 | 1601 | 1274 | 24 | 327 | 4 | SuperSet / Complete Migration (Already Exceeds) |
| ES | `es` | 391 | 482 | 391 | 0 | 91 | 0 | (a) Curated Subset by Design (COSYdata Expanded) |
| FR | `fr` | 1033 | 964 | 822 | 211 | 142 | 6 | (b) Incomplete Migration |
| HY | `hy` | 391 | 61 | 61 | 330 | 0 | 0 | (b) Incomplete Migration |
| IT | `it` | 1154 | 513 | 401 | 753 | 112 | 5 | (b) Incomplete Migration |
| KA | `ka` | 387 | 387 | 387 | 0 | 0 | 0 | (a) Curated Subset by Design |
| PT | `pt` | 393 | 476 | 383 | 10 | 93 | 0 | (a) Curated Subset by Design (COSYdata Expanded) |
| RU | `ru` | 465 | 792 | 380 | 85 | 412 | 0 | (a) Curated Subset by Design (COSYdata Expanded) |
| TT | `tt` | 377 | 61 | 61 | 316 | 0 | 0 | (b) Incomplete Migration |

---

## Functional Phrases Parity Analysis

### Summary
COSYdata contains 142 structured functional phrases for English across A1 to C1_C2 levels (e.g. 18 in A1, 36 in A2, 29 in B1, 44 in B2, 15 in C1_C2).
In contrast, COSYlanguages does NOT have a standalone structured functional phrase dataset.
In COSYlanguages:
- `communication/` contains only high-level documentation (`COMMUNICATION_STANDARD.md`) and JSON schema (`communication.schema.json`).
- `practice/types/` contains interactive UI renderer code for writing and concept check widgets, but no phrase bank.
- `vocabulary/en/A1/` contains a small set of social/opinion phrases stored as standard vocabulary entries in `vocabulary/en/A1/Other_POS/COMMUNICATION/Expressions/Social_Phrases.js`.
Conclusion: COSYdata's `functional-phrases/en` is the advanced single source of truth for functional phrases, while COSYlanguages relies on embedded vocabulary entries and manual HTML topic guides.

### COSYdata Functional Phrases Breakdown
- **Total Functional Phrases in COSYdata:** 142
- **Level Breakdown:**
  - **A1:** 18 phrases
  - **A2:** 36 phrases
  - **B1:** 29 phrases
  - **B2:** 44 phrases
  - **C1:** 15 phrases

### COSYlanguages Comparison Check Points
- **`communication/` directory:** Evaluated. Found `COMMUNICATION_STANDARD.md` and `communication.schema.json`. No phrase data files exist.
- **`practice/types/` directory:** Evaluated. Found UI exercise JS files (`writing.js`, `daily_data.js`, `concept-check.js`). No central functional phrase repository exists.
- **`vocabulary/en/A1/` phrase files:** Evaluated. Expressions and social phrases are stored in standard vocabulary format (e.g. `vocabulary/en/A1/Other_POS/COMMUNICATION/Expressions/Social_Phrases.js`).

---

## Detailed Per-Language Migration Gap Reports

### BA (`ba`)

- **COSYlanguages A1 Word Count:** 379
- **COSYdata A0/A1 Word Count:** 61
- **Exact Overlap Count:** 61
- **Candidates to Migrate (Only in COSYlanguages):** 318 words
- **COSYdata Unique Words (To Keep):** 0 words
- **Likely Near-Duplicates:** 0 pairs
- **Migration Classification:** **(b) Incomplete Migration**
- **Rationale:** COSYdata contains only a placeholder / baseline set of 61 words (e.g. basic numbers/colors/family), whereas COSYlanguages contains 379 words. This indicates an unmigrated or barely started migration gap.

<details>
<summary><strong>Full "Only in COSYlanguages" Word List (318 words)</strong></summary>

```
ағай, ағас, ай, АКШ, аҡ, аҡрын, аҡыллы, ал, алыу, Англия, аңлата, аңлатыу, аңлау, апай, арыған, ас, асыҡ, асыу, асыулы, ат, ауыр, ауырыу, Афина, аш бешереү, ашау, ашсы, әҙәпле, әйтеү, байрам, байрам итеү, балыҡ, барыу, баш, башҡа, башҡорт, башлау, башлыҡ, бәләкәй, бәхетле, бәхетһеҙ, бәһа, бейек, бейеү, белән, белеү, бер, бер үк, бесәй, бик насар, бик яҡшы, биреү, биш, бишбармаҡ, бороу, борсоулы, бөйөк, бөтөрөү, булдыра алыу, булыу, бурыслы булыу, буш, бүген, бүлешеү, бүре, бы, бысраҡ, Греция, ғәжәп, ғәжәпләнгән, ғорур, дауам итеү, дәрес, дәфтәр, диңгеҙ, дөрөҫ, дуҫтарса, дүрт, ҙур, ебәреү, елмәйеү, еңел, еңеү, заказ биреү, зәңгәр, идара итеү, ике, илау, иртәнге ашты ашау, Испания, иҫәпһеҙ яҡшы, Италия, ишетеү, йәйәү йөрөү, йәш, йәшәү, йәшел, йоҡларға ятыу, йоҡлау, йомшаҡ, йөҙөү, йүгереү, йығылыу, йыйыу, йылға, йылы, йырлау, йыуыу, камил, кәрәк булыу, кәрәкле, кәрәкһеҙ, кейеү, кеше, килеп етеү, килеү, килтереү, кисә, киҫеү, китеү, компьютер, коңғырт, көлкөлө, көслө, көсһөҙ, көтөү, күк, күлмәк, күнегеүҙәр эшләү, күңеле ҡайтҡан, күреү, күркәм, күрһәтеү, күсеү, ҡабатлау, ҡайтыу, ҡала, ҡалыу, ҡара, ҡарар итеү, ҡарау, ҡарт, ҡатнашыу, ҡаты, ҡиммәт, ҡоро, ҡот осҡос, ҡош, ҡояшлы, ҡулланыу, ҡурҡҡан, ҡурҡыныс, ҡуртымға алыу, ҡыҙғылт һары, ҡыҙыҡлы, ҡыҙыҡһыҙ, ҡыҙыл, ҡыҙыл э싩, ҡыйын, ләззәт алыу, ләкин, Лондон, май, матур, машина йөрөтөү, Мәскәү, мәшғүл, миһырбанлы, моңло, мөмкин, мөмкин түгел, мөһим, намыҫлы, насар, нәфрәт итеү, Нью-Йорк, оҙон, оҡшаш, олатай, олтороу, онлайн, онотоу, осоу, осрашыу, осһоҙ, ошатыу, өйрәнеү, өләсәй, өмит итеү, өс, өсөн, өҫтәү, Париж, популяр, Рәсәй, рәхмәт, рәхмәт әйтеү, риза булыу, Рим, саҡырыу, саф, сәйәхәт, сәйәхәт итеү, сәләмәт, сөнки, стресслы, табип, табыу, таҙа, таҙартыу, тамамлау, таныштырыу, тартыу, татар, ташыу, тәҡдим итеү, тәпәш, теләү, тиҙ, тикшереү, тойола, тойоу, тора, тороу, тотоноу, төҙөтеү, төҙөү, төшөү, туҡтау, тулҡынланған, тулы, тулы булмаған көн, тулы көн, тун, тупаҫ, тураһында, түбән, түгел, түләү, түләү алыу, тыныс, тыңлау, тырышыу, уйлау, уйнау, уҡытыу, уҡыу, урындыҡ, урыҫ, уяныу, үҙ эсенә алыу, үҙгәртеү, үҙенә ышанған, үҙенсәлекле, үкенесле, үлеү, үҫеү, үтеү, файҙалы, фантастик, Франция, хата, хәҙер, хәйерле иртә, хәтерләү, хәүефһеҙ, һағыныу, һайлау, һаҡлау, һалыу, һары, һатып алыу, һатыу, һау булығыҙ, һаумыһығыҙ, һауығыу, һәм, һәрваҡыт, һикереү, һорау, һоро, һөйләү, һөйләшеү, һуң, һүрәт төшөрөү, һыйыр, һыныу, һыуыҡ, чак-чак, шау-шыулы, шкаф, шофёр, шул, шыңғыртыу, ыштан, эйә булыу, эсеү, эҫе, этәреү, этеү, эшкә йөрөү, эшләп алыу, эшләү, юғалтыу, ябай, ябыҡ, ябыу, яҙыу, яки, яҡшы, ял итеү, ялҡау, ялыҡҡан, ямғырлы, яңғыҙ, яңы, яратыу, ярҙам итеү, яуап биреү
```

</details>

---

### BR (`br`)

- **COSYlanguages A1 Word Count:** 397
- **COSYdata A0/A1 Word Count:** 62
- **Exact Overlap Count:** 62
- **Candidates to Migrate (Only in COSYlanguages):** 335 words
- **COSYdata Unique Words (To Keep):** 0 words
- **Likely Near-Duplicates:** 0 pairs
- **Migration Classification:** **(b) Incomplete Migration**
- **Rationale:** COSYdata contains only a placeholder / baseline set of 62 words (e.g. basic numbers/colors/family), whereas COSYlanguages contains 397 words. This indicates an unmigrated or barely started migration gap.

<details>
<summary><strong>Full "Only in COSYlanguages" Word List (335 words)</strong></summary>

```
adzlavarout, aes, amann, amposupl, anit / atav, ankounac'haat, aoniek, aozañ ar malizenn, ar, armel, Aten, azezañ, bale, beaj, beajiñ, beajiñ bemdez, berr, bevañ, bezañ, bezañ da, bihan, bihanik, bleiz, bleniañ, blot, borodet, borodus, boutin, bras, brav, bravik, bremañ, breur, brezhon, Bro-Saoz, brudet, buan, buoc'h, cheñch, chom, c'hoar, c'hoari, da, dañjerus, dañsal, daou, debriñ, dec'h, dedennus, degas, degouezhout, demat, den, derc'hel, deskiñ, diaes, dibab, didrous, dieub, digeriñ, digor, dihuniñ, dilaouen, dilec'hiañ, diogel, disantet, disheñvel, diskouez, diskuizhañ, dispendiñ, displegañ, distend, distreiñ, ditalvoud, divizout, dizereat, dleout, dont, dont da vezañ, dougen, dreist, du, e, e-barzh, e-unan, echuiñ, emglev, en em ginnig, en em zistendañ, enlinenn, entouziastet, erbediñ, espern, esperout, estonus, eus, euzhus, evañ, evit, evn, ezhomm, fakturiñ, fall, farsus, fazi, fellout, fest, feurmiñ, fiziañs, Frañs, fresk, galetez, gall, gant, gell, gellet paeañ, gervel, glas, glavek, gleb, gorrek, gortoz, gouelañ, goulenn, goullo, gounit, gounit arc'hant, gouzout, Gres, gris, gweladenniñ, gwelet, gwenn, gwer, gwerzhañ, gwezenn, gwiriañ, ha, hanter-amzer, hañvalout, heñvel, heoliek, heuliañ, hir, hizio, implijout, ispisial, Italia, izel, jentil, kabell, kalet, kanañ, kaout, kaout soñj, kaoz, kaozeal, karet, karout, kas, kavout, kaye, kazout, keginer, kejañ, kelenn, kellenner, kemer, kemer perzh, kenavo, kenderc'hel, kentel, ker, kêr, ket, keuziek, klañv, klask, klevet, koant, koll, kompren, komz, konnar, kontañ, kouezhañ, kouign-amann, kousket, koustañ, kozh, krampouezh, kregiñ, kreñv, kreskiñ, kuitaat, labourat, lakaat, lammat, laouen, lavarout, ledan, lenn, leue, leun, leun-amzer, lidat, liorzhour, loar, lodennañ, Londrez, lorc'hus, lous, mab, mankout, mantell, maouez, marc'h, marc'had-mat, marzhus, mat, melen, memes, merañ, merc'h, mervel, met, meur, mignonel, mirout, mont, mont da gousket, mor, Moskov, mousc'hoarzhin, naet, naetaat, naoniek, neuñvial, nevez, New York, nijout, noz vat, nullañ, ober, ober droug, ober sport, onest, orañjez, ouzhpennañ, paeañ, paouez, pareañ, Pariz, pe, pediñ, pemoc'h, pemp, penn, perfezh, pesk, pevar, plijout, poazhañ, posupl, pouezus, pounner, pousañ, prenañ, priz, rak, ratreañ, redek, reiñ, reizh, resev, respont, ret, roched, Roma, roz, Rusia, ruz, Sachañ, sae, santout, saoz, sec'h, selaou, sellet, sellout, serr, serriñ, sevel, seven, sikour, skañv, skramm, skrivañ, skuizh, soñjal, souezhet, Spagn, speredek, Stadoù-Unanet, stêr, strafuilhet, strollat, studiañ, talvoudus, talvout, terriñ, ti, tomm, tommik, treiñ, tremen, treset, tri, trist, troc'hañ, trouzus, trugarekaat, trugarez, uhel, unan, ur, urdiazour, urzhiañ, walc'hiñ, wan, war, yac'h, yaouank, yar, yen
```

</details>

---

### CV (`cv`)

- **COSYlanguages A1 Word Count:** 449
- **COSYdata A0/A1 Word Count:** 132
- **Exact Overlap Count:** 132
- **Candidates to Migrate (Only in COSYlanguages):** 317 words
- **COSYdata Unique Words (To Keep):** 0 words
- **Likely Near-Duplicates:** 0 pairs
- **Migration Classification:** **(b) Incomplete Migration**
- **Rationale:** COSYdata contains 132 words vs 449 in COSYlanguages. While substantial core vocabulary was migrated (132 exact overlap), significant vocabulary (317 words) remains in COSYlanguages awaiting intake.

<details>
<summary><strong>Full "Only in COSYlanguages" Word List (317 words)</strong></summary>

```
ăнланма, ăслă, ăссăр, ăшă, çăмăл, Çĕмĕрле, çĕнĕ, Çĕнĕ Шупашкар, çĕнтерме, çамрăк, çемçе, çемьепе чупма, çил ĕфме, çиллĕ, çиме, çинçе, çинçепĕр, çинчен, çисе яма, çитерме, çитехме, çӳç ярма, çуйма, çук, çул тытма, çулама, çуллă, çулталăк улшăнма, çулталăкри, çумăр çума, çумăрлă, çумри, çунма, çунтарнă, çуратма, çуркуннехи, çурт тума, çутă, çутăртама, çухатма, çухи, çывăрма, çын, çынлă, çырма, çырнă, çырни, çырса хурма, ĕççĕ, ĕçе кайма, ĕçех, ĕçлеме, ĕçлени, ĕçме, ĕçсе яма, ĕненме, авалхи, анма, анчах, апат çиме, арçын, ача, ачаш, Базар, башкир, вăйлă, вăйсăр, вăрăм, вăранма, вĕренме, вĕреннĕ, вĕренни, вĕрентĕкçĕ, вĕрентме, валли, вара, варклама, васкама, ватă, виçкĕмĕш, Волга, вулама, вуласа тухма, выляма, вырăс, Германия, е, иккĕмĕш, илме, илсе кайма, илсе килме, илтме, илтсе илме, инçетри, ирхи, йăнăш, йăтма, йĕрме, йивĕр, йӳçĕ, йунçă, йывăр, кăвак, кăнтăрлахи, кăсăклă, кăшкăрма, кĕнеке вулама, кĕркуннехи, кĕрме, кĕске, кĕтме, каç килме, каçхи, кайма, какай шӳрпи, калама, канама, Канаш, кашнă, килĕшме, килме, килти, куçарма, кукăль, кулма, кулянчăк, кун пуçланма, кунселенхи, кӳршĕ, кӳршĕри, лайăх, лайăх кăмăллă, ларма, лартма, мăнтăр, мăншăн, мĕншĕн тесен, манма, мари, мордва, музыка илтме, Мускав, пăрахма, пăрлă, пăхма, пăхса хурма, пĕçерме, пĕçернĕ, пĕçерсе хурма, пĕлĕтлĕ, пĕлме, пĕлтерме, пĕрлехи, пĕрлешме, пĕрремĕш, пĕчĕк, пайне, палăртма, палăртнă, паллă, палламан, паллашма, парма, паттăр, паян, пулăшма, пулма, пур, пурнама, пушă, пуян, пысăк, пятекĕмĕш, Россия, сăмах пама, сĕтлĕ, савăнма, савăнса юрлама, саламлама, сарă, сахарлă, сивĕ, симĕс, сутма, сывă, сывлăх сунма, сывпуллашма, сыхлама, тăван, тăварлă, тăваткăмĕш, тăма, тăпăрчă, тăрашма, тăхăнма, тĕкĕнме, тĕп, тĕрĕс, тĕрĕслев тума, тĕрĕслеме, тĕттĕм, таса, тата, ташлама, телевизор пăхма, телейлĕ, тирпейлĕ, титĕрме, туйма, тулă, тулашри, тума, тупăшма, тупма, тус, тутар, тутлă, тухма, тухтăр, туянма, тытма, уçă, уçăлма, уçăмлă, уçăмлăхлă, уçма, уçса пама, уйрăлма, уйрăм, Улатăр, унăннă, урама тухма, урамри, усă курма, усăлма, усал, утма, утни, ученик, учитель, уяв пулма, уявлама, Франция, хăвăрт, хăвăртлă, хăвăртлăхлă, хăварма, хăпарма, хăракан, хăрама, хăтланма, хĕвел батма, хĕвел тухма, хĕвеллĕ, хĕллехи, хĕрарăм, хĕрлĕ, хĕрхенчĕк, хаклă, халь, хальхи, хастар, хисеплеме, хитре, Хула, хулахи, хупă, хуплу, хупма, хупса хурма, хура, хуравлама, хурлăхлă, хурланма, хурланса калама, хыççăн, хыпарлама, хыпарма, хытă, чăваш, Чăваш Ен, чей ĕçме, чирлĕ, чирлемен, чупма, чухăн, шăл çума, шăп, шăп тăма, шăрттан, шăшма, шавлă, шалахи, Шкул, шулăтрах, Шупашкар, шурă, шурăмпуçлă, шутлă, шутлав тума, шутлама, ыйтма, ырă, ыран, юлма, юлташ, юлташпа выляма, юр çума, юратма, юрлă, юрлама, яваш, Ял, яланах, яллă, япăх, ятлă
```

</details>

---

### DE (`de`)

- **COSYlanguages A1 Word Count:** 479
- **COSYdata A0/A1 Word Count:** 494
- **Exact Overlap Count:** 468
- **Candidates to Migrate (Only in COSYlanguages):** 11 words
- **COSYdata Unique Words (To Keep):** 26 words
- **Likely Near-Duplicates:** 0 pairs
- **Migration Classification:** **(a) Curated Subset by Design (COSYdata Expanded)**
- **Rationale:** COSYdata has 494 words vs 479 in COSYlanguages. COSYdata was expanded with additional language-specific core vocabulary.

<details>
<summary><strong>Full "Only in COSYlanguages" Word List (11 words)</strong></summary>

```
auf Wiedersehen, deutsch, Entschuldigung, essen, gute Nacht, guten Abend, guten Morgen, guten Tag, orange, österreichisch, schweizerisch
```

</details>

<details>
<summary><strong>COSYdata Unique Words List (26 words)</strong></summary>

```
Abend, Abendessen, Arbeit, Auf Wiedersehen, Deutsch, Ehefrau, Ehemann, Ei, entschuldigung, Essen, Familie, Frühstück, Garten, Gute Nacht, Guten Abend, Guten Morgen, Guten Tag, Mittagessen, Morgen, Orange, Österreichisch, Pasta, Pizza, Schlüssel, Schweizerisch, Zuhause
```

</details>

---

### EL (`el`)

- **COSYlanguages A1 Word Count:** 301
- **COSYdata A0/A1 Word Count:** 670
- **Exact Overlap Count:** 283
- **Candidates to Migrate (Only in COSYlanguages):** 18 words
- **COSYdata Unique Words (To Keep):** 387 words
- **Likely Near-Duplicates:** 1 pairs
- **Migration Classification:** **(a) Curated Subset by Design (COSYdata Expanded)**
- **Rationale:** COSYdata has 670 words vs 301 in COSYlanguages. COSYdata was expanded with additional language-specific core vocabulary.

#### Likely Near-Duplicates (1 pairs)
| Candidate (COSYlanguages) | Existing (COSYdata) | Match Type |
| :--- | :--- | :--- |
| `πορτοκαλί` | `πορτοκάλι` | Accent / Diacritic variant |

<details>
<summary><strong>Full "Only in COSYlanguages" Word List (18 words)</strong></summary>

```
αγαπώ, απαντώ, βοηθώ, γεια, κίτρινο, κόκκινο, κολυμπώ, κουβαλώ, μιλώ, ξεχνώ, περπατώ, πετώ, πορτοκαλί, πουλώ, πράσινο, ρωτώ, σταματώ, τραγουδώ
```

</details>

<details>
<summary><strong>COSYdata Unique Words List (387 words)</strong></summary>

```
αγαπάω, αγάπη, αγελάδα, αγορά, αέρας, αεροδρόμιο, αεροπλάνο, αθλητισμός, ακόμα, αλάτι, αλεπού, άλογο, Αμερική, άνδρας, άνεμος, άνοιξη, απαντάω, από, απόγευμα, Απρίλιος, αργά, αργότερα, αριθμός, αριστερά, αρκετά, αρκούδα, αρχίζω, αστέρι, αστυνομικός, άσχημος, αυγό, Αύγουστος, αυτή, αυτί, αυτό, αυτοί, αυτοκίνητο, αυτός, βάρκα, βγαίνω, βιβλίο, βιβλιοθήκη, βοηθάω, βουνό, βούτυρο, βραδινό, βράδυ, βραχίονας, βροχή, γάντια, γάτα, γεια σου, γελάω, Γερμανία, γη, για, γιαγιά, γιαούρτι, γιατί, γιατρός, γιος, γλυκός, γλώσσα, γόνατο, γονείς, γουρούνι, γράμμα, γρασίδι, γραφείο, γυναίκα, δάσκαλος, δάσος, δάχτυλο, δέκα, δεκαεννέα, δεκαέξι, δεκαεπτά, δεκαοκτώ, δεκαπέντε, δεκατέσσερα, δεκατρία, Δεκέμβριος, δέντρο, δεξιά, δέρμα, Δευτέρα, διακοπές, διαμέρισμα, δικηγόρος, διψασμένος, δόντι, δρόμος, δώδεκα, δωμάτιο, δώρο, εβδομάδα, εβδομήντα, εγώ, εδώ, εικόνα, είκοσι, ειρήνη, εκατό, εκεί, εκείνο, εκκλησία, ελέφαντας, εμείς, ενενήντα, εννέα, έντεκα, εξήντα, έξι, επίσης, επτά, εργασία, εργάτης, ερώτηση, εσείς, εστιατόριο, εσύ, ζάχαρη, ζωή, ζώνη, ήδη, ήλιος, ημέρα, θάλασσα, θεία, θείος, Ιανουάριος, ιδέα, Ιούλιος, Ιούνιος, ίσως, καθρέφτης, καιρός, καλημέρα, καληνύχτα, καλησπέρα, καλοκαίρι, κάλτσες, καλώς όρισες, καναπές, καπέλο, κάποιες φορές, καρδιά, καρέκλα, κασκόλ, κατάστημα, κάτω, καφές, κέικ, κεφάλι, κήπος, Κίνα, κλειδί, κολυμπάω, κοντά, κόρη, κόσμος, κοτόπουλο, κουβαλάω, κουζίνα, κουνέλι, κουτάλι, κρασί, κρέας, κρεβάτι, κρεμμύδι, Κυριακή, λάδι, λαιμός, λάμπα, λαχανικό, λεμόνι, λέξη, λεπτό, λεωφορείο, λιγότερο, λιοντάρι, λουλούδι, λύκος, μάγειρας, μαζί, μαθητής, μαϊμού, Μάιος, μακαρόνια, μακριά, μαλλιά, Μάρτιος, μας, μάτι, μαχαίρι, με, με συγχωρείτε, μέλι, μενού, μεσημεριανό, μετά, μεταξύ, μετρό, μηδέν, μήνας, μητέρα, μηχανικός, μολύβι, μοτοσικλέτα, μου, μουσείο, μουσική, μπαίνω, μπανάνα, μπάνιο, μπίρα, μπλουζάκι, μπορώ, μύτη, μωβ, μωρό, ναι, νέα, Νοέμβριος, νοσοκόμα, νοσοκομείο, νόστιμος, ντομάτα, νύχτα, νωρίς, ξάδελφος, ξενοδοχείο, ξεχνάω, ογδόντα, οδηγός, οδός, οκτώ, Οκτώβριος, όνειρο, όνομα, ουρανός, όχι, παγωτό, παιδί, παιχνίδι, παλτό, πανεπιστήμιο, πάντα, παντελόνι, πάνω, πάπια, παπούτσια, παππούς, παράθυρο, Παρασκευή, πάρκο, πάρτι, πατάτα, πατέρας, πάτωμα, πέλμα, Πέμπτη, πενήντα, περισσότερο, περπατάω, πεταλούδα, πετάω, πέτρα, πιάτο, πικρός, πιπέρι, πιρούνι, πλάτη, πλοίο, πλούσιος, ποδήλατο, πόδι, ποιο, ποιον, ποιος, πόλη, πολύ, ποντίκι, πόρτα, πορτοκαλής, πορτοκάλι, πόσο, ποτάμι, ποτέ, πότε, ποτήρι, πού, πουκάμισο, πουλάω, πουλί, πουλόβερ, πριν, πρόβατο, πρόβλημα, προς, πρόσωπο, πρωί, πρωινό, πώς, πώς είσαι;, ρολόι, ρούχα, ρύζι, ρωτάω, Σάββατο, σακάκι, σαλάτα, σαλόνι, σάντουιτς, σαράντα, σε, Σεπτέμβριος, σκάλα, σκεπή, σκόρδο, σκύλος, σοκολάτα, σου, σούπα, σπίτι, σταθμός, σταματάω, στόμα, στομάχι, στυλό, σύζυγος, σύννεφο, συχνά, σχετικά με, σχολείο, ταινία, ταξί, Τετάρτη, τετράδιο, τηλεόραση, τηλέφωνο, τι, τιμή, τίνος, τοίχος, τραγουδάω, τράπεζα, τραπέζι, τρένο, τριάντα, Τρίτη, τσάντα, τυρί, τώρα, υγεία, υπάρχω, υπνοδωμάτιο, υπολογιστής, Φεβρουάριος, φεγγάρι, φθινόπωρο, φίδι, φίλος, φόρεμα, φούστα, φρούτο, φτωχός, φωτιά, χάρηκα, χάρτης, χαρτί, χαρτοπετσέτα, χειμώνας, χέρι, χθες, χιόνι, χρήματα, χρόνος, χρυσός, χρώμα, χυμός, χώρα, χωρίς, ψάρι, ψάχνω, ώμος, ώρα
```

</details>

---

### EN (`en`)

- **COSYlanguages A1 Word Count:** 1298
- **COSYdata A0/A1 Word Count:** 1601
- **Exact Overlap Count:** 1274
- **Candidates to Migrate (Only in COSYlanguages):** 24 words
- **COSYdata Unique Words (To Keep):** 327 words
- **Likely Near-Duplicates:** 4 pairs
- **Migration Classification:** **SuperSet / Complete Migration (Already Exceeds)**
- **Rationale:** COSYdata already contains 1601 unique words compared to COSYlanguages's 1298 words. COSYdata is a superset for English.

#### Likely Near-Duplicates (4 pairs)
| Candidate (COSYlanguages) | Existing (COSYdata) | Match Type |
| :--- | :--- | :--- |
| `fries` | `chips / fries` | Slash / Option variant |
| `mall` | `shopping center / mall` | Slash / Option variant |
| `shopping center` | `shopping center / mall` | Slash / Option variant |
| `cafe` | `café` | Accent / Diacritic variant |

<details>
<summary><strong>Full "Only in COSYlanguages" Word List (24 words)</strong></summary>

```
africa, america, arabic, asia, britain, cafe, europe, excuse me, fries, happy birthday, mall, mexico, ok, portugal, russian, scotland, see you, shopping center, thank you, the usa, tv, wales, yoghurt, you're welcome
```

</details>

<details>
<summary><strong>COSYdata Unique Words List (327 words)</strong></summary>

```
Africa, ago, agree with, America, And you, animals, ant, anybody, anyone, anything, apartment building, Arabic, are there, arms, around, as well, Asia, Australian, autumn/fall, bar, Be careful, be quiet, bell, blocks, Britain, brush teeth, builder, building, burger, cab, café, call 911, call the police, Can I have, Can I help you, Can you help me, Can you repeat that please, Can you speak slowly please, Canadian, carpet, cartoon, cell phone, chips / fries, clean the house, cleaner, cleaning, click, closet, clothing, cola, colorful, come back, Come here, come home, Come in, computer game, congratulations on, continue, cook dinner, cooker, copy, crayon, credit card, cross, cucumber, dark blue, delete, describe, dining room, disagree with, do homework, do the laundry, do the shopping, Do you speak English, Don't worry, each, ears, easily, elbow, eleventh, especially, Europe, every day, everything, Excuse me, eyes, family member, far from, faucet, field, fill in, fingers, fire alarm, for example, free time, freezer, full name, gaming, get dressed, glad, Go straight, go to bed, go to school, go to work, goat, Good job, Good luck, grandchild, grandchildren, grandparents, grey/gray, ground, handbag, Happy birthday, Have a good day, Have a nice day, have breakfast, have dinner, have lunch, headphones, hen, herself, hide, himself, hoodie, How are you, How do I get to, How do you say in English, How much is it, how often, How old are you, Hurry up, I agree, I am years old, I disagree, I don't know, I don't understand, I live in, I need help, I think so, I want, I'd like, I'm a teacher, I'm fine, I'm from, I'm good, I'm lost, I'm not sure, I'm okay, I'm sorry, in front of, in love, Is it okay, is there, It's far, It's near, It's okay, jewelry, Just a minute, keys, lawyer, legs, let, Let me see, Let's go, light blue, Listen carefully, listen to, look at, Look at me, Look out, loose, lunchbox, madam, matches, mathematics, may, mechanic, Mexico, mister, moment, mood, movie theater, moving, mr, mrs, My name is, myself, napkin, necklace, Nice to meet you, Nice to meet you too, no meat, no one, No problem, no sugar, noodles, Not bad, Of course, OK, Okay, on foot, One moment please, one ticket, onto, opposite, over there, page, pajamas, place, plant, playground, please repeat, police station, pool, Portugal, Portuguese, print, promise, pyjamas, quarter past, quarter to, race, raincoat, raise your hand, relative, remote control, repeat after me, right here, rooms, rug, Russian, salesperson, Scotland, seat, secretary, See you, See you later, See you soon, See you tomorrow, shampoo, shopping center / mall, singing, sir, sit down, Sit down, slide, soda, soft drink, soldier, somebody, sparkling water, spell, stand up, Stand up, sticker, still water, story, storybook, straight ahead, stuff, sunscreen, surname, swimming pool, swimsuit, swing, take a nap, take a shower, Take care, take care of, take out the trash, Take your time, tap, teddy bear, Thank you, Thank you very much, That's okay, That's right, That's wrong, the USA, thing, tight, to go, toes, toilet paper, too much, toys, traffic light, tram, traveling, trolley, truck, Turn left, turn off, turn on, Turn right, TV, twelfth, twenty-one, twin, twins, type, underwear, uniform, vegetables, Wait a minute, Wales, walk the dog, walking, wash the dishes, Watch out, watch TV, way, Well done, What do you do, What does mean, What time is it, What's your name, wheelchair, Where are you from, Where do you live, Where is, whiteboard, Wi-Fi, yogurt, you are welcome, You're welcome
```

</details>

---

### ES (`es`)

- **COSYlanguages A1 Word Count:** 391
- **COSYdata A0/A1 Word Count:** 482
- **Exact Overlap Count:** 391
- **Candidates to Migrate (Only in COSYlanguages):** 0 words
- **COSYdata Unique Words (To Keep):** 91 words
- **Likely Near-Duplicates:** 0 pairs
- **Migration Classification:** **(a) Curated Subset by Design (COSYdata Expanded)**
- **Rationale:** COSYdata has 482 words vs 391 in COSYlanguages. COSYdata was expanded with additional language-specific core vocabulary.

*No words only in COSYlanguages. All words are present in COSYdata.*

<details>
<summary><strong>COSYdata Unique Words List (91 words)</strong></summary>

```
almuerzo, armario, autobús, bienvenido, boca, bolígrafo, bolsa, bosque, botella, caja, calle, camiseta, cena, cepillo de dientes, champú, comida, cómo, cuándo, cuántos, cuchara, cuchillo, desayuno, dónde, escritorio, escuela, espejo, estante, familia, hogar, horno, hoy, huevo, jabón, jardín, lámpara, lápiz, llave, lluvia, manzana, mañana, mapa, mar, marido, mercado, montaña, mujer, nariz, nevera, niño, no, país, palabra, pantalones, papel, pared, parque, pasta, pasta de dientes, peine, perdón, pierna, pizza, plátano, plato, playa, por favor, por qué, puente, puerta, qué, quién, recibo, regalo, reloj, río, semana, sí, sofá, sombrero, suelo, tarde, tarjeta, taza, té, techo, tenedor, tienda, toalla, trabajo, vaso, ventana
```

</details>

---

### FR (`fr`)

- **COSYlanguages A1 Word Count:** 1033
- **COSYdata A0/A1 Word Count:** 964
- **Exact Overlap Count:** 822
- **Candidates to Migrate (Only in COSYlanguages):** 211 words
- **COSYdata Unique Words (To Keep):** 142 words
- **Likely Near-Duplicates:** 6 pairs
- **Migration Classification:** **(b) Incomplete Migration**
- **Rationale:** COSYdata contains 964 words vs 1033 in COSYlanguages. While substantial core vocabulary was migrated (822 exact overlap), significant vocabulary (211 words) remains in COSYlanguages awaiting intake.

#### Likely Near-Duplicates (6 pairs)
| Candidate (COSYlanguages) | Existing (COSYdata) | Match Type |
| :--- | :--- | :--- |
| `sûr` | `sur` | Accent / Diacritic variant |
| `salé` | `sale` | Accent / Diacritic variant |
| `la` | `là` | Accent / Diacritic variant |
| `ou` | `où` | Accent / Diacritic variant |
| `un jour` | `jour` | Article prefix variant |
| `s asseoir` | `s'asseoir` | Hyphenation / Spacing variant |

<details>
<summary><strong>Full "Only in COSYlanguages" Word List (211 words)</strong></summary>

```
à bientôt, à côté de, à droite, à gauche, à pied, à plus tard, acteur, allumer, améliorer, amical, ancien, appareil photo, appartenir, appeler, artiste, attraper, au fait, au moins, avoir les moyens, bagages, billet, blond, bon marché, bonne chance, bonne journée, bouteille, bruyant, calme, carotte, casser, célèbre, centre commercial, chanson, chef, cher, choisir, cinéma, clair, client, collègue, commun, compte, concert, confiant, confortable, construire, continuer, correct, courageux, coûter, couverture, créatif, créer, croire, curieux, dangereux, décider, dentiste, dépenser, dessiner, devenir, devoir, donc, drôle, économiser, écran, effrayé, email, emprunter, en colère, en fait, en forme, en général, ennuyé, ennuyeux, ensoleillé, entreprise, envoyer, espèces, espérer, essayer, étagère, éteindre, étrange, être à l'heure, être d accord, être d'accord, être en retard, excité, expliquer, facture, facturer, faire du vélo, faire mal, faux, fier, food_drink, fraise, gagner, gentil, honnête, impoli, inclure, infirmier, inquiet, intelligent, intéressant, inutile, inviter, jean, joli, la, libre, louer, loyer, lunettes, maillot de bain, mener, message, moderne, monnaie, monter, montre, mot de passe, neigeux, nerveux, normal, nuageux, occupé, oreiller, organiser, ou, par exemple, parapluie, paresseux, partager, pas de problème, passeport, patient, patron, perdre, pharmacie, place, planifier, pluvieux, poli, populaire, portefeuille, prendre le petit-déjeuner, préparer, présenter, prêter, produire, projet, pyjama, quai, quartier, raisin, recevoir, recommander, reçu, remercier, rencontrer, réparer, répéter, réservation, rester, réunion, réveil, rêver, s asseoir, s'inquiéter, sain, salaire, salé, saluer, se coucher, se détendre, se passer, se reposer, se réveiller, sembler, sérieux, si, similaire, simple, site web, spécial, stressé, suivre, supermarché, sûr, surpris, temps libre, tigre, timide, tomber malade, tourner, tout droit, un jour, utile, valise, venteux, vérifier, village, visiter, voisin, vol, voyage, voyager, week-end
```

</details>

<details>
<summary><strong>COSYdata Unique Words List (142 words)</strong></summary>

```
à qui, air, Amérique, amour, année, après, arbre, assez, aussi, avant, avec, avocat, banane, bienvenue, cahier, canard, ceci, cela, cent, chauffeur, cheveux, ciel, cinquante, cœur, combien, comment allez-vous, concernant, couleur, cuisine, cuisinier, déjà, dent, depuis, dix, dix-huit, dix-neuf, dix-sept, douze, église, enchanté, entre, entrer, épouse, étoile, excusez-moi, exister, feu, fille, fleur, forêt, gauche, herbe, homme, huit, ici, idée, infirmière, jeu, lequel, lettre, loup, lune, maintenant, marron, menu, mer, météo, miel, moins, mois, monde, montagne, moto, mur, navire, nécessiter, neige, neuf, nom, non, notre, nouvelles, nuage, numéro, œil, œuf, onze, oui, ours, paix, papillon, parents, pâtes, peau, peut-être, pierre, plus, plus tard, poule, pour, pouvoir, problème, quarante, quatorze, quatre-vingt-dix, quatre-vingts, que, quel, question, quinze, renard, ressentir, rêve, rivière, s'arrêter, s'asseoir, salle de bains, salut, sandwich, sans, santé, seize, sept, serpent, six, sœur, soixante, soixante-dix, sol, sortir, terre, travailleur, treize, trente, très, vers, vêtements, vie, vingt, visage, yaourt, zéro
```

</details>

---

### HY (`hy`)

- **COSYlanguages A1 Word Count:** 391
- **COSYdata A0/A1 Word Count:** 61
- **Exact Overlap Count:** 61
- **Candidates to Migrate (Only in COSYlanguages):** 330 words
- **COSYdata Unique Words (To Keep):** 0 words
- **Likely Near-Duplicates:** 0 pairs
- **Migration Classification:** **(b) Incomplete Migration**
- **Rationale:** COSYdata contains only a placeholder / baseline set of 61 words (e.g. basic numbers/colors/family), whereas COSYlanguages contains 391 words. This indicates an unmigrated or barely started migration gap.

<details>
<summary><strong>Full "Only in COSYlanguages" Word List (330 words)</strong></summary>

```
ազատ, ազնիվ, Աթենք, աղմկոտ, աճել, ԱՄՆ, ամրագրել, այն, այս, այցելել, Անգլիա, անել, անկողին գնալ, անհանգիստ, անհնար, անհրաժեշտ, անձրևոտ, անցնել, անօգուտ, աշխատել, ապահով, ապաքինվել, ապրել, առողջ, առցանց, ասել, ավարտել, ավելացնել, ատել, արագ, արևոտ, արթնանալ, արժենալ, բաճկոն, բայց, բարև, բարի, բարի լույս, բարկացած, բարձր, բարձրահասակ, բաց, բաց թողնել, բացատրել, բացել, բերել, գալ, գայլ, գանձել, գեղեցիկ, գետ, գերազանց, գին, գլուխ, գնալ, գնել, գտնել, գրել, դանդաղ, դառնալ, դաս, դասավանդել, դատարկ, դեղին, դժբախտ, դժվար, դիտել, դնել, դրամ, եղբայր, և, երգել, երեկ, երեք, երթևեկել, երիտասարդ, երկար, երկու, երջանիկ, եփել, զանգել, զարմանալի, զարմացած, զբաղված, զգալ, զգեստ, զղջացող, զով, զրույց, զրուցել, էժան, ընկերական, ընկնել, ընտրել, թանկ, թաց, թեթև, թուլանալ, թույլ, թույլ տալ, թռչել, թռչուն, թվալ, ժամանել, ժպտալ, իմանալ, ինքնավստահ, Իսպանիա, Իտալիա, լավ, լավաշ, լաց լինել, լինել, լիքը, լողալ, Լոնդոն, լուսին, լսել, լվանալ, լրիվ դրույք, խաղալ, խելացի, խմել, խնայել, խոհարար, խոսել, խորհուրդ տալ, խորոված, ծախսել, ծանր, ծառ, ծիծաղելի, ծով, ծույլ, կամ, կանաչ, կանգնել, կանգնեցնել, կապույտ, կառուցել, կատարյալ, կարագ, կարդալ, կարևոր, կարիք ունենալ, կարճ, կարմիր, կեղտոտ, կես դրույք, կիսվել, կոկիկ, կոշտ, կոպիտ, կով, կոտրել, կորցնել, կտրել, կրկնել, հագնել, հաղթել, հաճելի, համակարգիչ, համաձայնել, համար, հայ, հանգիստ, հանգստանալ, հանդիպել, հանրաճանաչ, հասկանալ, հավանել, հավաքել, հատուկ, հարցնել, հեշտ, հեռանալ, հետաքրքիր, հետևել, հետո, հիանալի, հիասթափված, հիմա, հին, հինգ, հիշել, հիվանդ, հնարավոր, հոգնած, Հունաստան, հուսալ, հպարտ, Հռոմ, հրավիրել, հրել, ձանձրալի, ձանձրացած, ձի, ձուկ, ղեկավարել, ճամփորդել, ճանապարհորդություն, ճիշտ, մահանալ, մասին, մասնակցել, մարդ, մարզվել, մաքուր, մաքրել, մեծ, մեկ, մենակ, մնալ, մոխրագույն, մոռանալ, Մոսկվա, մոտ, մտածել, նախաճաշել, նայել, նարնջագույν, ներառել, ներկայացնել, նկարել, նման, նյարդային, Նյու Յորք, նշանակել, նոր, նորոգել, նույն, նստել, շագանակագույն, շարունակել, շնորհակալություն, շնորհակալություն հայտնել, ոգևորված, ոչ, որոշել, որովհետև, ուզել, ուժեղ, ուղարկել, ունենալ, ուսումնասիրել, ուտել, չեղարկել, չոր, չորս, պահարան, պահել, պապ, պատահել, պատասխանել, պատկանել, պատմել, պատվիրել, պատրաստել, պարել, պարտք լինել, պտտել, ռուս, Ռուսաստան, սառը, սարսափելի, սև, սթրեսի մեջ, սիրել, սխալ, սկսել, սոված, սովորական, սովորել, սպասել, սպիտակ, ստանալ, ստուգել, սքանչելի, վազել, վախեցած, վաճառել, վայելել, վաստակել, վատ, վարդագույն, վարել, վարձել, վարորդ, վեր կենալ, վերադառնալ, վերցնել, վճարել, վտանգավոր, տալ, տանել, տատ, տարբեր, տաք, տեղափոխվել, տեսնել, տետր, տխուր, տղամարդ, տոլմա, տոն, տոնել, ցածր, ցավեցնել, ցատկել, ցույց տալ, ցտեսություն, փակ, փակել, Փարիզ, փափուկ, փոխել, փորձել, փոքր, քաղաք, քաղաքավարի, քայլել, քաշել, քնել, քույր, օգնել, օգտագործել, օգտակար, ֆանտաստիկ, Ֆրանսիա, ֆրանսիացի
```

</details>

---

### IT (`it`)

- **COSYlanguages A1 Word Count:** 1154
- **COSYdata A0/A1 Word Count:** 513
- **Exact Overlap Count:** 401
- **Candidates to Migrate (Only in COSYlanguages):** 753 words
- **COSYdata Unique Words (To Keep):** 112 words
- **Likely Near-Duplicates:** 5 pairs
- **Migration Classification:** **(b) Incomplete Migration**
- **Rationale:** COSYdata contains 513 words vs 1154 in COSYlanguages. While substantial core vocabulary was migrated (401 exact overlap), significant vocabulary (753 words) remains in COSYlanguages awaiting intake.

#### Likely Near-Duplicates (5 pairs)
| Candidate (COSYlanguages) | Existing (COSYdata) | Match Type |
| :--- | :--- | :--- |
| `a presto` | `presto` | Article prefix variant |
| `a dopo` | `dopo` | Article prefix variant |
| `a domani` | `domani` | Article prefix variant |
| `a casa` | `casa` | Article prefix variant |
| `un giorno` | `giorno` | Article prefix variant |

<details>
<summary><strong>Full "Only in COSYlanguages" Word List (753 words)</strong></summary>

```
a, a casa, a causa di, a domani, a dopo, a mano a mano, a mio parere, a piedi nudi, a presto, a stento, a tempo parziale, a tempo pieno, a testa alta, a vista d'occhio, abbastanza di, accanto a, accendere, aceto, acido, acquisto, ad alta voce, addebitare, affari, affittare, affitto, aggiungere, al caldo, al cinema, al fresco, al mercato, al piano terra, al primo piano, al ristorante, al sicuro, al tempo stesso, alfabeto, all'aperto, all'estero, all'improvviso, all'inizio, alla fine, almeno, alzarsi, americano, amichevole, Amsterdam, andare a letto, anello, animale, annoiato, annotare, annullare, antico, antipatico, ape, app, appartenere, argentato, Argentina, armadio, arrabbiato, arrampicarsi, arrivo, arte, artista, ascensore, asciugamano, asciutto, assaggiare, astuccio, attento, attivo, attore, aula, Australia, Austria, avere caldo, avere fame, avere fortuna, avere freddo, avere fretta, avere fretta di, avere intenzione di, avere paura, avere ragione, avere sete, avere sonno, avere tempo, avere torto, avere voglia di, azienda, bagagli, bagnato, balena, bambola, banchina, banconota, band, bar, Barcellona, barrare, batteria, Belgio, Berlino, berretto, bevanda, biglietto, binario, biondo, bottiglia, boutique, Brasile, buon appetito, buon viaggio, buona fortuna, buona giornata, calciare, calcio, camera d'albergo, cameriere, Canada, cantando, canzone, capo, carino, carota, carta di credito, cassetto, cavalcare, celibe, centro, centro commerciale, cerchio, cereali, chef, chiamare, chiaro, Chicago, ci vediamo, cibo, ciliegia, cinema, cinese, Città del Messico, classe, cliente, clientela, codardo, collana, collega, colorare, combattere, cominciare, comodo, compagno di classe, compitare, compiti, completare, completo, computer portatile, comune, comunque, concerto, condividere, conducente, conoscere, consegna, consigliare, contadino, contanti, contare, contemporaneamente, continuare, conto, controllare, coperta, coraggioso, corpo, corretto, corridoio, costare, costo, costoso, costruire, costume da bagno, cravatta, creare, creativo, credere, crescere, Cristoforo Colombo, cuscino, d'accordo, da lontano, da un lato, da vicino, dall'altro lato, Dante Alighieri, davanti a, decidere, delfino, deluso, denaro, dentifricio, dentista, dentro, descrivere, desiderare, destra, di, di buon'ora, di fretta, di fronte, di fronte a, di nascosto, di nuovo, di profilo, di sicuro, di solito, di tanto in tanto, dietro a, differente, dipingere, direttore, disegnare, disordinato, dispiaciuto, dito del piede, diventare, divertente, dizionario, doccia, domani mattina, dovere, Dublino, e, eccellente, economico, edificio, educato, Egitto, elegante, email, emozionante, emozionato, enorme, entrata, Enzo Ferrari, errore, esame, esempio, esercitarsi, esercizio, essere d accordo, essere d'accordo, essere in anticipo, essere in forma, essere in orario, essere in ritardo, essere occupato, essere pronto, essere sorpreso, essere spiacente, fa, faccia, falso, famoso, fantastico, far male, fare acquisti, fare attenzione, fare colazione, fare festa, fare il bagno, fare il pendolare, fare la conoscenza di, fare la doccia, fare la fila, fare la spesa, fare le valigie, fare sport, fare una passeggiata, farmacia, fattura, Federico Fellini, fermata dell'autobus, festeggiare, fianco a fianco, figurati, fine settimana, Firenze, flauto, forno, fortunato, fra, fragola, francese, frase, fresco, frigorifero, funzionare, fuori, Galileo Galilei, garage, genitore, gentile, geografia, gestire, Giappone, giapponese, Ginevra, gioielli, giornale, girare, giusto, gli, godere, gomma, grasso, grazie a, grazie mille, gridare, guadagnare, guarire, Guglielmo Marconi, hotel, ieri sera, il, impaziente, impiego, impossibile, in autunno, in campagna, in città, in collera, in corso, in corso di, in diretta, in estate, in fondo a, in forma, in futuro, in generale, in guasto, in inverno, in libertà, in mezzo a, in montagna, in pace, in pericolo, in primavera, in questo momento, in ritardo di, in saldo, in silenzio, in spiaggia, in vacanza, includere, incontrare, incredibile, India, indicare, indirizzo, indossare, infatti, infelice, inglese, inoltre, intelligente, interessante, intorno, inutile, invece, inviare, invitare, Irlanda, Istanbul, italiano, jeans, la, là, lanciare, largo, lasagna, lavastoviglie, lavatrice, le, lenzuolo, Leonardo da Vinci, lezione, libero, libreria, Lisbona, liscio, lo, Londra, Los Angeles, Luciano Pavarotti, luminoso, ma, macchina fotografica, Madrid, magro, mai dire mai, maleducato, mandare un SMS, manzo, Marco Polo, matematica, medico, mensa, meraviglioso, merenda, messaggio, Messico, mestiere, metropolitana, mettere, mezzanotte, mezzogiorno, Miami, Michelangelo Buonarroti, microonde, migliorare, Milano, minuscolo, mobili, moderno, molto di, monete, morire, Mosca, mostrare, mouse, muovere, muri, Napoli, nascondere, naturale, nazionalità, nebbia, nebbioso, necessario, nervoso, nevoso, New York, niente, nipote, noioso, non importa, normale, Norvegia, notare, nuoto, nuvoloso, o, occhiali, occhiali da sole, occupato, occupazione, odiare, odorare, offerta, ogni giorno, ombrello, onesto, online, orario, ordinare, ordinario, ordinato, ordine, organizzare, orgoglioso, orribile, ospite, ottenere, ovale, padella, Paesi Bassi, pagamento, palla, pantaloncini, Parigi, partecipare, partenza, passaporto, passare, password, pasto, paziente, Pechino, pentola, per caso, per esempio, per ora, per terra, pera, perdere, perfetto, pericoloso, permettersi, Perù, pesca, piacevole, pianificare, piano, piantina, piazza, pigiama, pigro, pilota, piovoso, più o meno, pizza, poco amichevole, poco profondo, poltrona, popolare, portafoglio, Portogallo, Praga, preferire, preferito, prendere appunti, prendere in prestito, prendere l'autobus, prendere un caffè, prendere una decisione, prendersi del tempo, prenotare, prenotazione, preoccuparsi, preoccupato, preparare, presentare, prestare, prodotto, produrre, professore, profondo, progettare, progetto, provare, purtroppo, quadrato, quadro, qualche volta, qualcosa, quartiere, quasi, questa sera, quindi, radio, ragno, rapporto, raramente, reception, relazione, respirare, restare, rettangolare, riccio, ricevere, ricevuta, riempire, righello, rilassarsi, rilassato, rimbalzare, ringraziare, riparare, ripetere, riposare, risparmiare, risparmio, riunione, riuscire, rivista, Roma, rompere, rotondo, rubinetto, rumoroso, russo, ruvido, sala da pranzo, salato, salire, saltare, saltellare, salutare, San Francisco, sano, sapone, sbadigliare, sbagliato, sbaglio, scaffale, scatola, scegliere, scendere, schermo, scienza, scopa, scrittore, scuro, sdraiarsi, se, secondo, secondo me, segnare, segretario, seguire, sembrare, semplice, sentiero, senza dubbio, serio, servizio, sfortunato, sicuro, sicuro di sé, significare, silenzioso, simile, simpatico, sinistra, sito web, smettere, soffitto, sognare, soldato, soleggiato, solitamente, solo, sonno, Sophia Loren, sopra, sopra di, sorpreso, sorridere, sotto di, spagnolo, spaventato, spazzolare, spazzolino, speciale, spegnere, spendere, sperare, spesa, spiacevole, spiegare, spingere, spogliarsi, sposato, spuntino, squalo, stagione, stare, starnutire, Stati Uniti, stipendio, stivale, stivali, stomaco, storia, strano, stress, stressato, stretto, subito, succedere, successo, sul posto, sul punto di, suonare, superficiale, supermercato, sussurrare, sveglia, svegliarsi, Svezia, Svizzera, Sydney, t-shirt, tagliare, talvolta, tappeto, tastiera, tazza, tedesco, telecomando, temperatura, tempestoso, tempo libero, tempo meteorologico, tenda, tenere, tennis, terribile, tiepido, tigre, timido, tirare, toccare, Tokyo, tornare, Toronto, tossire, tostapane, tragitto, triangolare, triangolo, troppo di, tutti i giorni, tutto, tutto il tempo, udire, ufficio, uguale, un, un giorno, un po' di, una, usare, uscita, utile, uva, vale a dire, valigia, velocità, vendita, Venezia, ventoso, vero, vestirsi, viaggiare, viaggiatore, viaggio, Vienna, vigile del fuoco, villaggio, vincere, violino, visitare, volo, Washington, wifi, zaino, zuccotto, Zurigo
```

</details>

<details>
<summary><strong>COSYdata Unique Words List (112 words)</strong></summary>

```
a chi, abbastanza, albergo, albero, America, amore, anatra, anche, aria, arrivederci, avvocato, benvenuto, cento, chiesa, cielo, cinquanta, come stai, destro, di chi, diciannove, diciassette, diciotto, dieci, diverso, dodici, domanda, donna, dottore, dove, erba, esistere, farfalla, fiore, fiume, foresta, fuoco, gallina, genitori, gioco, idea, luna, lupo, mare, meno, menù, metro, mi dispiace, miele, mio, molto, mondo, montagna, motocicletta, muro, nave, no, nome, nostro, notizie, novanta, nove, numero, nuvola, operaio, orso, ottanta, otto, pace, pancia, panino, pelle, pietra, più, problema, quale, quando, quanto, quaranta, quattordici, quello, questo, quindici, riguardo a, salute, sedici, sei, senza, serpente, sessanta, settanta, sette, sì, sinistro, sogno, soldi, stella, terra, topo, tovagliolo, tredici, trenta, tuo, undici, uomo, venti, verso, vestiti, viso, vita, volpe, yogurt, zero
```

</details>

---

### KA (`ka`)

- **COSYlanguages A1 Word Count:** 387
- **COSYdata A0/A1 Word Count:** 387
- **Exact Overlap Count:** 387
- **Candidates to Migrate (Only in COSYlanguages):** 0 words
- **COSYdata Unique Words (To Keep):** 0 words
- **Likely Near-Duplicates:** 0 pairs
- **Migration Classification:** **(a) Curated Subset by Design**
- **Rationale:** Word counts are aligned or curated.

*No words only in COSYlanguages. All words are present in COSYdata.*

---

### PT (`pt`)

- **COSYlanguages A1 Word Count:** 393
- **COSYdata A0/A1 Word Count:** 476
- **Exact Overlap Count:** 383
- **Candidates to Migrate (Only in COSYlanguages):** 10 words
- **COSYdata Unique Words (To Keep):** 93 words
- **Likely Near-Duplicates:** 0 pairs
- **Migration Classification:** **(a) Curated Subset by Design (COSYdata Expanded)**
- **Rationale:** COSYdata has 476 words vs 393 in COSYlanguages. COSYdata was expanded with additional language-specific core vocabulary.

<details>
<summary><strong>Full "Only in COSYlanguages" Word List (10 words)</strong></summary>

```
abrir, bom, caro, chorar, Dublim, interessante, Moscou, pequeno, popular, um
```

</details>

<details>
<summary><strong>COSYdata Unique Words List (93 words)</strong></summary>

```
almoço, amanhã, armário, autocarro, banana, bem-vindo, boca, bolsa, caixa, caneta, cartão, chá, champô, chão, chapéu, chave, chávena, chuva, colher, com licença, comida, como, copo, criança, escola, escova de dentes, espelho, estante, faca, família, floresta, forno, frigorífico, garfo, garrafa, hoje, inúteis, janela, jantar, jardim, lâmpada, lápis, loja, maçã, mala, manhã, mapa, mar, marido, massa, mercado, montanha, Moscovo, mulher, não, nariz, o quê, onde, ovo, país, papel, parede, parque, pasta de dentes, pente, pequeno-almoço, perna, pizza, ponte, por favor, porquê, porta, praia, prato, presente, quando, quantos, quem, recibo, relógio, rio, rua, sabão, secretária, semana, sim, sofá, t-shirt, tarde, telefone, telhado, toalha, trabalho
```

</details>

---

### RU (`ru`)

- **COSYlanguages A1 Word Count:** 465
- **COSYdata A0/A1 Word Count:** 792
- **Exact Overlap Count:** 380
- **Candidates to Migrate (Only in COSYlanguages):** 85 words
- **COSYdata Unique Words (To Keep):** 412 words
- **Likely Near-Duplicates:** 0 pairs
- **Migration Classification:** **(a) Curated Subset by Design (COSYdata Expanded)**
- **Rationale:** COSYdata has 792 words vs 465 in COSYlanguages. COSYdata was expanded with additional language-specific core vocabulary.

<details>
<summary><strong>Full "Only in COSYlanguages" Word List (85 words)</strong></summary>

```
безопасный, бесполезный, благодарить, болеть, быть должным, вежливый, взволнованный, включать, вставать, вставлять палки в колёса, встречать, выбирать, выздоравливать, гордый, грубый, делиться, дешёвый, добрый, дождливый, дорогой, дружелюбный, завтракать, зарабатывать, звонить, здоровый, интересный, испуганный, казаться, ленивый, ложиться спать, ломать, на самом деле, надеяться, напряжённый, неправильный, нервный, носить, обеспокоенный, объяснять, обычный, опасный, особенный, оставаться, отдыхать, поворачивать, повторять, позволить себе, полезный, получать, популярный, посещать, похожий, правильный, праздновать, представлять, приглашать, принадлежать, проверять, продолжать, просыпаться, путешествовать, расслабляться, расти, рекомендовать, решать, рисовать, свободный, скучающий, скучный, следовать, случаться, смешной, соглашаться, солнечный, сохранять, становиться, стоить, строить, тихий, уверенный, удивлённый, умный, честный, чинить, шумный
```

</details>

<details>
<summary><strong>COSYdata Unique Words List (412 words)</strong></summary>

```
август, автобус, Америка, апельсин, апрель, аэропорт, бабочка, бабушка, банан, банк, бедный, без, библиотека, близкий, богатый, больница, больше, брюки, бумага, бутерброд, в, ванная, велосипед, весна, ветер, вечер, вечеринка, взять, вилка, вино, вкусный, водитель, воздух, войти, волк, волосы, вопрос, восемнадцать, восемь, восемьдесят, воскресенье, врач, время, всегда, вторник, входить, вчера, вы, выйти, выпить, выходить, где, Германия, глаз, год, голова, гора, город, горький, гостиная, да, далёкий, дать, двадцать, двенадцать, дверь, девяносто, девятнадцать, девять, дедушка, декабрь, день, деньги, дерево, десять, диван, для, до, до свидания, добро пожаловать, доброе утро, добрый вечер, дождь, дом, дорога, достаточно, дочь, друг, дядя, ещё, жаждущий, жена, женщина, живот, жизнь, забыть, завтра, завтрак, закончить, закрыть, заплатить, звезда, здесь, здоровье, здравствуйте, земля, зеркало, зима, змея, золотой, зуб, игра, идея, из, имя, инженер, иногда, искать, июль, июнь, йогурт, к, как, как дела, какой, камень, карандаш, карта, картинка, картофель, квартира, кисть, Китай, ключ, книга, когда, кожа, колено, комната, компьютер, кому, корабль, корова, кофе, кошка, кровать, кролик, крыша, кто, купить, курица, куртка, кухня, лампа, лев, левый, лес, лестница, лето, лимон, лиса, лицо, лодка, ложка, лошадь, лук, луна, любовь, магазин, май, макароны, март, масло, мать, машина, мёд, медведь, медсестра, между, меньше, меню, месяц, метро, минута, мир, младенец, может быть, мой, море, мороженое, мотоцикл, мочь, муж, мужчина, музей, музыка, мы, мышь, мясо, на, найти, написать, начать, наш, не за что, небо, неделя, некрасивый, никогда, новости, нога, нож, ноль, номер, нос, носки, ночь, ноябрь, о, обед, обезьяна, облако, обувь, овощи, овца, огонь, одежда, одиннадцать, окно, октябрь, он, она, они, осень, останавливаться, остановиться, ответить, отель, отец, открыть, очень, палец, пальто, парк, перец, перчатки, пиво, письменный стол, письмо, платье, плечо, повар, погода, под, подарок, подождать, подумать, поезд, поздний, позже, пойти, пол, полицейский, помидор, помочь, понедельник, понять, после, послушать, посмотреть, почему, правый, праздник, приехать, прийти, приятно познакомиться, проблема, продать, простите, прочитать, птица, путь, пятнадцать, пятница, пятьдесят, работа, рабочий, разный, ранний, растительное масло, ребёнок, река, ремень, ресторан, рис, родители, рот, рубашка, рука, ручка, рыба, рынок, с, сад, салат, салфетка, самолёт, сахар, свинья, свитер, сделать, сейчас, семнадцать, семь, семьдесят, сентябрь, сердце, сколько, сладкий, слово, слон, смеяться, снег, собака, сок, солнце, соль, сон, сорок, спальня, спина, спокойной ночи, спорт, спросить, среда, стакан, станция, стена, сто, стол, стопа, страна, студент, стул, суббота, сумка, суп, существовать, съесть, сын, сыр, такси, там, тарелка, твой, телевизор, телефон, тетрадь, тётя, тоже, торт, тот, трава, тридцать, тринадцать, ты, увидеть, уезжать, уехать, уже, ужин, улица, университет, упасть, уставший, утка, утро, ухо, учитель, февраль, фильм, фиолетовый, фрукты, футболка, ходить, цвет, цветок, цена, церковь, час, часто, часы, чей, чеснок, четверг, четырнадцать, что, шарф, шестнадцать, шесть, шестьдесят, шея, школа, шляпа, шоколад, этот, юбка, юрист, я, язык, яйцо, январь
```

</details>

---

### TT (`tt`)

- **COSYlanguages A1 Word Count:** 377
- **COSYdata A0/A1 Word Count:** 61
- **Exact Overlap Count:** 61
- **Candidates to Migrate (Only in COSYlanguages):** 316 words
- **COSYdata Unique Words (To Keep):** 0 words
- **Likely Near-Duplicates:** 0 pairs
- **Migration Classification:** **(b) Incomplete Migration**
- **Rationale:** COSYdata contains only a placeholder / baseline set of 61 words (e.g. basic numbers/colors/family), whereas COSYlanguages contains 377 words. This indicates an unmigrated or barely started migration gap.

<details>
<summary><strong>Full "Only in COSYlanguages" Word List (316 words)</strong></summary>

```
абый, авыр, авырту, авыру, агач, ай, ак, акрын, АКШ, акыллы, ал, алу, амма, Англия, аңлата, аңлату, аңлау, апа, арзан, арыган, ат, Афина, ач, ачу, ачулы, ачык, аш пешерү, ашау, ашчы, әби, әдәпле, әйтү, бабай, балык, бару, баш, башка, башлау, башлык, бәйрәм, бәйрәм итү, бәхетле, бәхетсез, бәя, белән, белү, бер, бер үк, бетерү, биек, бик начар, бик яхшы, бирү, биш, бию, бору, борчулы, бөек, бу, булдыра алу, булу, бурычлы булу, буш, бүлешү, бүре, бысрак, гади, гаҗәп, гаҗәпләнгән, горур, Греция, дәвам итү, дәрес, дәфтәр, диңгез, дөрес, дулкынланган, дусларча, дүрт, егылу, елау, елга, елмаю, җавап бирү, җәяү йөрү, җибәрү, җиңел, җиңү, җылы, җырлау, җыю, заказ бирү, зәңгәр, зур, идарә итү, ике, ир-ат, иртәнге ашны ашау, исәнмесез, искиткеч яхшы, Испания, Италия, ишетү, ия булу, иярү, йокларга яту, йоклау, йомшак, йөгерү, йөзү, кабатлау, кайту, калу, камил, кара, карар итү, карау, карт, катнашу, каты, кечкенә, кеше, килеп җитү, килү, кирәк булу, кирәкле, кирәксез, кисү, китерү, китү, кичә, кию, компьютер, коңгырт, коры, кош, кояшлы, көлкеле, көтү, көчле, көчсез, куллану, куркыныч, куркынычсыз, куртка, курыккан, куян, күлмәк, күнегүләр ясау, күңеле кайткан, күркәм, күрсәтү, күрү, күчү, кызгылт сары, кызыклы, кызыксыз, кызыл, кыйммәт, кыйын, кыстыбый, ләззәт алу, Лондон, май, матур, машина йөртү, мәрхәмәтле, Мәскәү, мәшгуль, моңлы, мөмкин, мөмкин түгел, мөһим, намуслы, начар, нәфрәт итү, Нью-Йорк, озын, онлайн, оныту, очрашу, очу, ошату, ошаш, өйрәнү, өмет итү, өстәү, өч, өчен, өчпочмак, Париж, популяр, рәсем ясау, рәхмәт, рәхмәт әйтү, риза булу, Рим, Россия, савыгу, сагыну, сайлау, саклау, салу, сары, сату, сатып алу, сау булыгыз, саф, сәламәт, сәяхәт, сәяхәт итү, сикерү, соң, сорау, соры, сөйләү, сөйләшү, стресслы, суык, сыер, сыну, табиб, табу, таза, тазарту, таныштыру, тарту, татар, ташу, тәкъдим итү, тәмамлау, тәпәш, теләү, тиз, тикшерү, тора, тору, тотону, тою, тояла, төзәтү, төзү, төрек, туктау, тулы, тулы булмаган көн, тулы көн, тупас, турында, түбән, түгел, түләү, түләү алу, тыныч, тыңлау, тырышу, уйлау, уйнау, уку, укыту, урнашу, урыс, утыру, уяну, үз эченә алу, үзгәртү, үзенә ышанган, үзенчәлекле, үкенечле, үлү, үсү, үтү, файдалы, фантастик, Франция, хата, хатын-кыз, хәерле иртә, хәзер, хәтерләү, һәм, һәрвакыт, чакыру, чәк-чәк, чөнки, шалтырату, шау-шулы, шәһәр, шкаф, шофёр, шул, ыштан, эссе, этәрү, эчү, эшкә йөрү, эшләп алу, эшләү, югалту, юу, ябу, ябык, языу, яки, ял итү, ялгыз, ялкау, ялыккан, яңа, яңгырлы, ярату, ярдәм итү, яхшы, яшәү, яшел, яшь
```

</details>

---
