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
| DE | `de` | 479 | 62 | 46 | 433 | 16 | 0 | (b) Incomplete Migration |
| EL | `el` | 301 | 509 | 122 | 179 | 387 | 1 | (a) Curated Subset by Design (COSYdata Expanded) |
| EN | `en` | 1262 | 1601 | 1240 | 22 | 361 | 3 | SuperSet / Complete Migration (Already Exceeds) |
| ES | `es` | 391 | 123 | 32 | 359 | 91 | 0 | (b) Incomplete Migration |
| FR | `fr` | 1033 | 961 | 819 | 214 | 142 | 6 | (b) Incomplete Migration |
| HY | `hy` | 391 | 61 | 61 | 330 | 0 | 0 | (b) Incomplete Migration |
| IT | `it` | 1154 | 513 | 401 | 753 | 112 | 5 | (b) Incomplete Migration |
| KA | `ka` | 387 | 61 | 61 | 326 | 0 | 0 | (b) Incomplete Migration |
| PT | `pt` | 393 | 124 | 33 | 360 | 91 | 0 | (b) Incomplete Migration |
| RU | `ru` | 465 | 545 | 133 | 332 | 412 | 0 | (a) Curated Subset by Design (COSYdata Expanded) |
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
- **COSYdata A0/A1 Word Count:** 62
- **Exact Overlap Count:** 46
- **Candidates to Migrate (Only in COSYlanguages):** 433 words
- **COSYdata Unique Words (To Keep):** 16 words
- **Likely Near-Duplicates:** 0 pairs
- **Migration Classification:** **(b) Incomplete Migration**
- **Rationale:** COSYdata contains only a placeholder / baseline set of 62 words (e.g. basic numbers/colors/family), whereas COSYlanguages contains 479 words. This indicates an unmigrated or barely started migration gap.

<details>
<summary><strong>Full "Only in COSYlanguages" Word List (433 words)</strong></summary>

```
aber, acht, ähnlich, allein, alt, ändern, anders, Angebot, ängstlich, ankommen, anrufen, antworten, Apfelsine, Apotheke, arbeiten, Arm, Athen, auf Wiedersehen, aufgeregt, aufstehen, aufwachen, ausgeben, ausgezeichnet, Bäckerei, Bahnhof, Bank, Bär, Bauch, bauen, Baum, bedeuten, beenden, beginnen, behalten, beinhalten, bekommen, beliebt, benutzen, berechnen, Berg, beschäftigt, besonders, besorgt, bestehen, bestellen, besuchen, bezahlen, Biene, Bild, billig, bitte, blau, bleiben, Bleistift, Blume, brauchen, braun, brechen, Brezel, bringen, Bruder, buchen, Büro, Butter, Computer, Cousine, Currywurst, danke, danken, dein, denken, deutsch, drehen, drei, drücken, du, E-Mail, ehrlich, einfach, einladen, eins, Eis, elf, empfangen, empfehlen, England, Ente, entscheiden, Entschuldigung, entspannen, entspannt, enttäuscht, er, erholen, erinnern, erklären, erstaunlich, erzählen, essen, fahren, Fahrer, Fahrkarte, fallen, falsch, fantastisch, faul, feiern, Fest, finden, Fisch, fit, Fleisch, fliegen, Flughafen, Flugzeug, Fluss, folgen, fortsetzen, fragen, Frankreich, Frau, freundlich, Freundschaft, frühstücken, fühlen, fünf, furchtbar, geben, gefährlich, gehen, gehören, gelangweilt, gelb, Gemüse, genießen, geschlossen, Gespräch, gestern, gestresst, gesund, gewinnen, gewöhnlich, gleich, glücklich, grau, Griechenland, groß, großartig, Großmutter, Großvater, grün, Gürtel, gut, gute Nacht, guten Abend, guten Morgen, guten Tag, gütig, Haar, haben, hallo, Haltestelle, Handy, hart, hassen, Haus, Hausaufgabe, Heft, heiß, helfen, Hemd, Himmel, hinzufügen, hoch, hoffen, höflich, hören, Hotel, hübsch, hungrig, ich, immer, Ingenieur, ins Bett gehen, interessant, Internet, Italien, Jacke, Jahr, jung, kalt, Kartoffel, Käse, Kasse, kaufen, Kellner, Klasse, Kleid, klein, Koch, kochen, Koffer, kommen, Kopf, korrekt, kosten, kostenlos, krank, Krankenhaus, Kuh, kühl, Kunde, lächeln, Lampe, lang, langsam, langweilig, laufen, laut, leben, leer, lehren, leicht, leise, leiten, lernen, lesen, lieben, London, lustig, machen, Mann, Mantel, Markt, Maus, Meer, mein, Mensch, mieten, mögen, möglich, Monat, Mond, Moskau, müde, nass, nehmen, nervös, nett, neu, neun, New York, nie, niedrig, notwendig, nützlich, nutzlos, Obst, offen, öffnen, Onkel, online, orange, organisieren, österreichisch, packen, Paris, Park, Pass, passieren, pendeln, perfekt, Pferd, Polizist, Post, präsentieren, Preis, prüfen, Pullover, Rechnung, reden, Regal, regnerisch, reinigen, Reis, Reise, reisen, rennen, reparieren, Restaurant, richtig, Rock, Rom, rosa, rot, ruhen, Russland, sagen, Salz, sauber, Schaf, schauen, scheinen, schlafen, schlau, schlecht, schließen, schmutzig, Schnee, schneiden, schnell, Schnitzel, schön, Schrank, schrecklich, schreiben, schulden, schwach, schwarz, Schwein, schweizerisch, schwer, Schwester, schwierig, schwimmen, sechs, See, sehen, sein, selbstbewusst, senden, sich leisten, sicher, sie, sieben, singen, sitzen, Socke, Sofa, Sohn, sonnig, Spanien, sparen, spielen, sprechen, springen, Stadt, stark, stehen, stellen, sterben, Stern, stolz, stoppen, stornieren, Student, studieren, Supermarkt, Tante, tanzen, teilen, Teilzeit, Teppich, teuer, Ticket, Tochter, tragen, trainieren, traurig, treffen, trinken, trocken, tschüss, tun, tut mir leid, überrascht, umziehen, und, unglücklich, unhöflich, unmöglich, Unterricht, Urlaub, USA, verängstigt, verdienen, vergessen, verkaufen, Verkäufer, verlassen, verlieren, verpassen, verstehen, versuchen, vier, violett, Vogel, voll, Vollzeit, vorstellen, wachsen, wählen, Wald, warm, warten, waschen, weh tun, weich, weinen, weiß, werden, Wetter, wichtig, wiederholen, Wind, wir, wissen, Wolke, wollen, wunderbar, wütend, Zahn, zehn, zeichnen, zeigen, ziehen, Zucker, zurückkehren, zurückkommen, zusammen, zustimmen, zwei, zwölf
```

</details>

<details>
<summary><strong>COSYdata Unique Words List (16 words)</strong></summary>

```
Abend, Abendessen, Arbeit, Ehefrau, Ehemann, Ei, Essen, Familie, Frühstück, Garten, Mittagessen, Morgen, Pasta, Pizza, Schlüssel, Zuhause
```

</details>

---

### EL (`el`)

- **COSYlanguages A1 Word Count:** 301
- **COSYdata A0/A1 Word Count:** 509
- **Exact Overlap Count:** 122
- **Candidates to Migrate (Only in COSYlanguages):** 179 words
- **COSYdata Unique Words (To Keep):** 387 words
- **Likely Near-Duplicates:** 1 pairs
- **Migration Classification:** **(a) Curated Subset by Design (COSYdata Expanded)**
- **Rationale:** COSYdata has 509 words vs 301 in COSYlanguages. COSYdata was expanded with additional language-specific core vocabulary.

#### Likely Near-Duplicates (1 pairs)
| Candidate (COSYlanguages) | Existing (COSYdata) | Match Type |
| :--- | :--- | :--- |
| `πορτοκαλί` | `πορτοκάλι` | Accent / Diacritic variant |

<details>
<summary><strong>Full "Only in COSYlanguages" Word List (179 words)</strong></summary>

```
αγαπώ, Άγγλος, αγενής, αγχωμένος, αδύνατος, Αθήνα, ακολουθώ, ακριβός, ακυρώνω, αναρρώνω, ανήκω, ανήσυχος, απαίσιος, απαντώ, απαραίτητος, απασχολημένος, απογοητευμένος, απολαμβάνω, αποταμιεύω, αποφασίζω, αστείος, ασφαλής, άχρηστος, βάζω, βαρετός, βαριεστημένος, βοηθώ, βρεγμένος, βροχερός, Γάλλος, γεια, γίνομαι, γιορτάζω, γυμνάζομαι, γυμνασμένος, δείχνω, δημοφιλής, διαδικτυακός, διαχειρίζομαι, δροσερός, δυστυχισμένος, ειδικός, ειλικρινής, έκπληκτος, ελέγχω, ελεύθερος, Έλληνας, ελπίζω, ενδιαφέρων, ενθουσιασμένος, εξαιρετικός, εξηγώ, έξυπνος, επαναλαμβάνω, επικίνδυνος, επιλέγω, επισκέπτομαι, επισκευάζω, επιστρέφω, ευγενής, ευγενικός, έχω την οικονομική δυνατότητα, ηλιόλουστος, ΗΠΑ, ήσυχος, θαυμάσιος, θορυβώδης, θυμωμένος, κάθε μέρα, καινούριος, καλώ, κάνω κράτηση, καταπληκτικός, κερδίζω, κίτρινο, κόβω, κόκκινο, κολυμπώ, κοστίζω, κουβαλώ, κρατώ, λαμβάνω, λανθασμένος, λευκό, Λονδίνο, μαμά, μεγαλώνω, μένω, μερικής απασχόλησης, μετακινούμαι, μετανιωμένος, μιλώ, μισώ, μοιράζομαι, μόνος, Μόσχα, μουσακάς, μπαμπάς, Νέα Υόρκη, νευρικός, νοικιάζω, ξεκινώ, ξεκουράζομαι, ξεχνώ, ξοδεύω, ξυπνάω, οργανώνω, παραγγέλνω, παρευρίσκομαι, Παρίσι, παρόμοιος, παρουσιάζω, πεθαίνω, περήφανος, περιλαμβάνω, περνώ, περπατώ, πετώ, πέφτω για ύπνο, πηδώ, πιθανός, πλήρους απασχόλησης, πονώ, πορτοκαλί, πουλώ, πράσινο, προσθέτω, προσκαλώ, προσπαθώ, Ρώμη, ρωτώ, σηκώνομαι, σημαίνω, σίγουρος, σπάω, σπρώχνω, σταματώ, στεγνός, στέλνω, στρίβω, συμβαίνει, συμφωνώ, συναντώ, συνεχίζω, συνηθισμένος, συνιστώ, συστήνω, σχεδιάζω, Σωκράτης, σωστός, ταξιδεύω, τέλειος, τεμπέλης, τραβώ, τραγουδώ, τρομερός, τρώω πρωινό, υγιής, υπέροχος, υψηλός, φαίνομαι, φανταστικός, φιλικός, φοβισμένος, φοράω, φτηνός, φτιάχνω, φτιάχνω βαλίτσα, χαλαρός, χαλαρώνω, χαμηλός, χαμογελώ, χάνω, χρεώνω, χρησιμοποιώ, χρήσιμος, χρωστώ, χτίζω, ωραίος
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

- **COSYlanguages A1 Word Count:** 1262
- **COSYdata A0/A1 Word Count:** 1601
- **Exact Overlap Count:** 1240
- **Candidates to Migrate (Only in COSYlanguages):** 22 words
- **COSYdata Unique Words (To Keep):** 361 words
- **Likely Near-Duplicates:** 3 pairs
- **Migration Classification:** **SuperSet / Complete Migration (Already Exceeds)**
- **Rationale:** COSYdata already contains 1601 unique words compared to COSYlanguages's 1262 words. COSYdata is a superset for English.

#### Likely Near-Duplicates (3 pairs)
| Candidate (COSYlanguages) | Existing (COSYdata) | Match Type |
| :--- | :--- | :--- |
| `fries` | `chips / fries` | Slash / Option variant |
| `mall` | `shopping center / mall` | Slash / Option variant |
| `shopping center` | `shopping center / mall` | Slash / Option variant |

<details>
<summary><strong>Full "Only in COSYlanguages" Word List (22 words)</strong></summary>

```
africa, america, arabic, asia, britain, europe, excuse me, fries, happy birthday, mall, mexico, ok, portugal, russian, scotland, see you, shopping center, thank you, the usa, tv, wales, you're welcome
```

</details>

<details>
<summary><strong>COSYdata Unique Words List (361 words)</strong></summary>

```
Africa, ago, agree with, America, And you, animals, ant, anybody, anyone, anything, apartment building, app, Arabic, are there, arms, around, as well, Asia, Australian, autumn/fall, backpack, bar, Be careful, be quiet, bell, blocks, Britain, brush teeth, builder, building, burger, cab, café, call 911, call the police, Can I have, Can I help you, Can you help me, Can you repeat that please, Can you speak slowly please, Canadian, carpet, cartoon, cell phone, cereal, chips / fries, classmate, clean the house, cleaner, cleaning, click, closet, clothing, cola, colleague, colorful, come back, Come here, come home, Come in, computer game, congratulations on, continue, cook dinner, cooker, copy, crayon, credit card, cross, cucumber, dark blue, delete, describe, dining room, disagree with, do homework, do the laundry, do the shopping, Do you speak English, Don't worry, each, ears, easily, elbow, eleventh, email address, especially, Europe, every day, everything, Excuse me, eyes, family member, far from, faucet, field, fill in, fingers, fire alarm, first name, flour, for example, free time, freezer, full name, gaming, garlic, get dressed, get up, glad, Go straight, go to bed, go to school, go to work, goat, Good job, Good luck, grandchild, grandchildren, grandparents, grey/gray, ground, gym, handbag, Happy birthday, Have a good day, Have a nice day, have breakfast, have dinner, have lunch, headphones, hen, herself, hide, himself, honey, hoodie, How are you, How do I get to, How do you say in English, How much is it, how often, How old are you, Hurry up, I agree, I am years old, I disagree, I don't know, I don't understand, I live in, I need help, I think so, I want, I'd like, I'm a teacher, I'm fine, I'm from, I'm good, I'm lost, I'm not sure, I'm okay, I'm sorry, in front of, in love, Is it okay, is there, It's far, It's near, It's okay, jewelry, Just a minute, keyboard, keys, last name, lawyer, legs, let, Let me see, Let's go, light blue, Listen carefully, listen to, look at, Look at me, Look out, loose, lunchbox, madam, matches, mathematics, may, mechanic, Mexico, mister, moment, mood, movie theater, moving, mr, mrs, My name is, myself, napkin, necklace, Nice to meet you, Nice to meet you too, no meat, no one, No problem, no sugar, noodles, Not bad, Of course, OK, Okay, on foot, One moment please, one ticket, onto, opposite, over there, page, pajamas, parents, partner, passport, phone number, place, plant, playground, please repeat, police station, pool, Portugal, Portuguese, print, printer, promise, put on, pyjamas, quarter past, quarter to, race, raincoat, raise your hand, relative, remote control, repeat after me, right here, rooms, rug, Russian, salesperson, sandals, Scotland, seat, secretary, See you, See you later, See you soon, See you tomorrow, shampoo, shopping center / mall, shorts, singing, sir, sit down, Sit down, slide, soda, soft drink, soldier, somebody, sparkling water, spell, stand up, Stand up, sticker, still water, story, storybook, straight ahead, stuff, suit, sunscreen, surname, swimming pool, swimsuit, swing, take a nap, take a shower, Take care, take care of, take off, take out the trash, Take your time, tap, teddy bear, Thank you, Thank you very much, That's okay, That's right, That's wrong, the USA, thing, tie, tight, to go, toes, toilet, toilet paper, too much, toothpaste, toys, traffic light, train station, tram, traveling, trolley, truck, try on, Turn left, turn off, turn on, Turn right, TV, twelfth, twenty-one, twin, twins, type, underwear, uniform, united kingdom, united states, vegetables, volleyball, Wait a minute, wake up, Wales, walk the dog, walking, wash the dishes, Watch out, watch TV, way, Well done, What do you do, What does mean, What time is it, What's your name, wheelchair, Where are you from, Where do you live, Where is, whiteboard, Wi-Fi, yoga, yogurt, you are welcome, You're welcome
```

</details>

---

### ES (`es`)

- **COSYlanguages A1 Word Count:** 391
- **COSYdata A0/A1 Word Count:** 123
- **Exact Overlap Count:** 32
- **Candidates to Migrate (Only in COSYlanguages):** 359 words
- **COSYdata Unique Words (To Keep):** 91 words
- **Likely Near-Duplicates:** 0 pairs
- **Migration Classification:** **(b) Incomplete Migration**
- **Rationale:** COSYdata contains 123 words vs 391 in COSYlanguages. While substantial core vocabulary was migrated (32 exact overlap), significant vocabulary (359 words) remains in COSYlanguages awaiting intake.

<details>
<summary><strong>Full "Only in COSYlanguages" Word List (359 words)</strong></summary>

```
a tiempo completo, a tiempo parcial, abierto, abrir, aburrido, acostarse, agradecer, ahorrar, Albert Einstein, Alemania, alquilar, alto, amable, amar, amarillo, amigable, Ámsterdam, añadir, aprender, arrepentido, asistir, asustado, Atenas, Australia, Austria, ayudar, azul, bailar, bajo, barato, Barcelona, beber, Bélgica, Berlín, Beyoncé, blanco, bonito, Brasil, buenísimo, bueno, caballo, cabeza, caer, cálido, caliente, cambiar, caminar, camisa, Canadá, cancelar, cansado, cantar, caro, casa, celebrar, cerrado, cerrar, Chicago, China, Ciudad de México, cobrar, cocinar, comer, compartir, comprar, conducir, confiado, conocer, construir, continuar, Corea del Sur, correcto, correr, cortar, costar, crecer, Cristiano Ronaldo, cuaderno, dar, deber, débil, decepcionado, decidir, decir, desayunar, descansar, despertarse, dibujar, diferente, difícil, Dinamarca, disfrutar, divertido, doler, dormir, dos, Dublín, duro, Edimburgo, educado, EE. UU., Egipto, él, elegir, ella, ellos, Elon Musk, emocionado, empezar, empujar, en forma, en línea, encontrar, enfadado, enfermo, enseñar, entender, enviar, escribir, escuchar, espantoso, España, español, especial, esperar, estar de acuerdo, estar de pie, estresado, estudiar, excelente, explicar, fácil, fantástico, feliz, fiesta, Finlandia, Florencia, francés, Francia, fresco, frío, fuerte, ganar, gastar, gazpacho, gestionar, girar, grande, gratis, Grecia, gris, grosero, gustar, hablar, hacer, hacer ejercicio, hacer la maleta, hacerse, hambriento, hermana, hermano, hermoso, honesto, importante, imposible, incluir, incorrecto, increíble, India, infeliz, Inglaterra, intentar, interesante, inútil, invitar, ir, Irlanda, Italia, italiano, Japón, joven, jugar, largo, lavar, leer, lento, Leonardo da Vinci, levantarse, ligero, limpiar, limpio, Lionel Messi, listo, llamar, llegar, lleno, llevar, llorar, lluvioso, Londres, Los Ángeles, luna, malo, mantener, maravilloso, Marie Curie, marrón, Melbourne, mi, Miami, mirar, mismo, mojado, Montreal, morir, Moscú, mostrar, mover, nadar, naranja, necesario, necesitar, negro, Nelson Mandela, nervioso, Noruega, nosotros, Nueva York, nuevo, nunca, obtener, ocupado, odiar, oír, olvidar, ordenador, ordinario, organizar, orgulloso, paella, pagar, Países Bajos, pájaro, pantalón, parar, parecer, París, pasar, pedir, Pekín, peligroso, pensar, pequeño, perder, perezoso, perfecto, permitirse, pero, pertenecer, pesado, pez, Polonia, poner, popular, posible, Praga, preguntar, preocupado, presentar, producir, proyectar, quedarse, querer, rápido, recibir, recomendar, recordar, recuperarse, Reina Isabel II, relajado, relajarse, reparar, repetir, reservar, responder, revisar, Río de Janeiro, rojo, Roma, romper, rosa, ruidoso, Rusia, saber, salir, saltar, saludable, San Francisco, seco, sediento, seguir, seguro, sentarse, sentir, ser, Sídney, siempre, significar, similar, simpático, soleado, solo, sonreír, sorprendido, suave, sucio, Suecia, Suiza, Tailandia, Taylor Swift, tener, terminar, terrible, tímido, tirar, Tokio, tomar, tortilla, trabajar, traer, tranquilo, triste, tu, tú, Ucrania, uno, usar, útil, vaca, vacío, Vancouver, vender, Venecia, venir, ver, verde, vestido, viajar, viajar diariamente, viejo, Viena, visitar, vivir, volar, volver, Washington D.C., William Shakespeare, y, yo
```

</details>

<details>
<summary><strong>COSYdata Unique Words List (91 words)</strong></summary>

```
almuerzo, armario, autobús, bienvenido, boca, bolígrafo, bolsa, bosque, botella, caja, calle, camiseta, cena, cepillo de dientes, champú, comida, cómo, cuándo, cuántos, cuchara, cuchillo, desayuno, dónde, escritorio, escuela, espejo, estante, familia, hogar, horno, hoy, huevo, jabón, jardín, lámpara, lápiz, llave, lluvia, manzana, mañana, mapa, mar, marido, mercado, montaña, mujer, nariz, nevera, niño, no, país, palabra, pantalones, papel, pared, parque, pasta, pasta de dientes, peine, perdón, pierna, pizza, plátano, plato, playa, por favor, por qué, puente, puerta, qué, quién, recibo, regalo, reloj, río, semana, sí, sofá, sombrero, suelo, tarde, tarjeta, taza, té, techo, tenedor, tienda, toalla, trabajo, vaso, ventana
```

</details>

---

### FR (`fr`)

- **COSYlanguages A1 Word Count:** 1033
- **COSYdata A0/A1 Word Count:** 961
- **Exact Overlap Count:** 819
- **Candidates to Migrate (Only in COSYlanguages):** 214 words
- **COSYdata Unique Words (To Keep):** 142 words
- **Likely Near-Duplicates:** 6 pairs
- **Migration Classification:** **(b) Incomplete Migration**
- **Rationale:** COSYdata contains 961 words vs 1033 in COSYlanguages. While substantial core vocabulary was migrated (819 exact overlap), significant vocabulary (214 words) remains in COSYlanguages awaiting intake.

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
<summary><strong>Full "Only in COSYlanguages" Word List (214 words)</strong></summary>

```
à bientôt, à côté de, à droite, à gauche, à pied, à plus tard, acteur, allumer, améliorer, amical, ancien, appareil photo, appartenir, appeler, artiste, attraper, au fait, au moins, avoir les moyens, bagages, billet, blond, bon marché, bonne chance, bonne journée, bouteille, bruyant, calme, carotte, casser, célèbre, centre commercial, chanson, chef, cher, choisir, cinéma, clair, client, collègue, commun, compte, concert, confiant, confortable, construire, continuer, correct, courageux, coûter, couverture, créatif, créer, croire, curieux, dangereux, décider, dentiste, dépenser, dessiner, devenir, devoir, donc, drôle, économiser, écran, effrayé, email, emprunter, en colère, en fait, en forme, en général, ennuyé, ennuyeux, ensoleillé, entreprise, envoyer, espèces, espérer, essayer, étagère, éteindre, étrange, être à l'heure, être d accord, être d'accord, être en retard, excité, expliquer, facture, facturer, faire du vélo, faire mal, faux, fier, food_drink, fraise, gagner, gentil, honnête, impoli, inclure, infirmier, inquiet, intelligent, intéressant, inutile, inviter, jean, joli, la, libre, louer, loyer, lunettes, maillot de bain, mener, message, moderne, monnaie, monter, montre, mot de passe, neigeux, nerveux, normal, nuageux, occupé, oeil, oeuf, oreiller, organiser, ou, par exemple, parapluie, paresseux, partager, pas de problème, passeport, patient, patron, perdre, pharmacie, place, planifier, pluvieux, poli, populaire, portefeuille, prendre le petit-déjeuner, préparer, présenter, prêter, produire, projet, pyjama, quai, quartier, raisin, recevoir, recommander, reçu, remercier, rencontrer, réparer, répéter, réservation, rester, réunion, réveil, rêver, s asseoir, s'inquiéter, sain, salaire, salé, saluer, se coucher, se détendre, se passer, se reposer, se réveiller, sembler, sérieux, si, similaire, simple, site web, soeur, spécial, stressé, suivre, supermarché, sûr, surpris, temps libre, tigre, timide, tomber malade, tourner, tout droit, un jour, utile, valise, venteux, vérifier, village, visiter, voisin, vol, voyage, voyager, week-end
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
- **COSYdata A0/A1 Word Count:** 61
- **Exact Overlap Count:** 61
- **Candidates to Migrate (Only in COSYlanguages):** 326 words
- **COSYdata Unique Words (To Keep):** 0 words
- **Likely Near-Duplicates:** 0 pairs
- **Migration Classification:** **(b) Incomplete Migration**
- **Rationale:** COSYdata contains only a placeholder / baseline set of 61 words (e.g. basic numbers/colors/family), whereas COSYlanguages contains 387 words. This indicates an unmigrated or barely started migration gap.

<details>
<summary><strong>Full "Only in COSYlanguages" Word List (326 words)</strong></summary>

```
-დან, -ზე, -თან, -თვის, -ში, ადამიანი, ადგომა, ადვილი, ავადმყოფი, ათენი, ამაყი, ან, არ, არასწორი, არჩევა, აღება, აღელვებული, აღნიშვნა, აშშ, ახალგაზრდა, ახალი, ახლა, ახსნა, ბებია, ბედნიერი, გაბრაზებული, გაგება, გაგზავნა, გაგონება, გაგრძელება, გადასარევი, გადასვლა, გადაწყვეტა, გადახდა, გადახდევინება, გავლა, გაზიარება, გაკეთება, გაკვეთილი, გაკვირვებული, გამარჯობა, გამეორება, გამომუშავება, გამოტოვება, გამოყენება, გამოჯანმრთელება, განსხვავებული, გატეხვა, გაუქმება, გაღვიძება, გაყიდვა, გაჩერება, გახდომა, გახსენება, გახსნა, გერმანელი, გმადლობთ, გრილი, გრძელი, გრძნობა, გუშინ, და, დაბალი, დაბრუნება, დადება, დავიწყება, დაზოგვა, დათანხმება, დათვი, დაკავებული, დაკარგვა, დაკეტვა, დაკეტილი, დამატება, დამთავრება, დანახვა, დაპატიჟება, დარეკვა, დარჩენა, დასვენება, დასტრესილი, დასუფთავება, დასწრება, დაღლილი, დაწოლა, დაწყება, დახმარება, დაჯავშნა, დგომა, დიდებული, დიდი, დილა მშვიდობისა, დღესასწაული, ერთი, ეს, ესპანეთი, ვალის ქონა, ვარდისფერი, ვარდნა, ვარჯიში, ზარმაცი, ზრდა, ზრდილი, ზღვა, თავდაჯერებული, თავი, თავისუფალი, თამაში, თბილი, თევზი, თეთრი, თქმა, თხრობა, იაფი, იგივე, იდეალური, იმედგაცრუებული, იმედოვნება, ინგლისელი, ინგლისი, ის, იტალია, კაბა, კარადა, კარაქი, კარგი, კაცი, კეთება, კეთილი, კვდომა, კითხვა, კომპიუტერი, კუთვნილება, ლამაზი, ლაპარაკი, ლოდინი, ლონდონი, ლურჯი, მაგარი, მაგრამ, მადლობა, მართვა, მარტო, მაღალი, მგელი, მგზავრობა, მდინარე, მეგობრული, მზარეული, მზიანი, მთვარე, მიღება, მიყოლა, მიცემა, მიწოლა, მნიშვნელოვანი, მობრუნება, მოგება, მოგზაურობა, მოდუნება, მოდუნებული, მოკლე, მომზადება, მოსაწყენი, მოსვლა, მოსკოვი, მოსმენა, მოტანა, მოცვა, მოწონება, მოწყენილი, მოხდენა, მსგავსი, მსუბუქი, მშიერი, მშრალი, მძიმე, მძღოლი, მწვადი, მწვანე, მწუხარე, ნარინჯისფერი, ნაცრისფერი, ნახევარი განაკვეთი, ნახვამდის, ნდომა, ნელი, ნერვიული, ნიუ-იორკი, ნიშნვნა, ოთხი, ონლაინ, ორი, პაპა, პარიზი, პასუხი, პატარა, პატიოსანი, პერანგი, პირის ღრუ, პოვნა, პოპულარული, რადგან, რბილი, რეკომენდაცია, რეცხვა, რვეული, რთული, რომი, რუსეთი, საბერძნეთი, სავსე, საინტერესო, სამი, საოცარი, სასარგებლო, სასაცილო, საუბარი, საუზმობა, საფრანგეთი, საშინელი, საჭირო, საჭიროება, სახიფათო, სველი, სვლა, სიამოვნება, სიარული, სიმღერა, სირბილი, სმა, სპეციალური, სრული განაკვეთი, სტუმრობა, სუსტი, სუფთა, სძულება, სწავლა, სწავლება, სწორი, სწრაფი, ტარება, ტირილი, ტკივილი, უბედური, უსარგებლო, უსაფრთხო, უხეში, ფანტასტიკური, ფასი, ფიქრი, ფორმაში, ფრენა, ფრინველი, ქალაქი, ქალი, ქართველი, ქირაობა, ქონა, ქურთუკი, ღია, ღიმილი, ღირებულება, ყავისფერი, ყვარება, ყვითელი, ყიდვა, ყოფნა, ყურება, შავი, შეკეთება, შეკვეთა, შემოწმება, შენახვა, შენება, შესანიშნავი, შესაძლებელი, შეუძლებელი, შეშინებული, შეცვლა, შეწუხებული, შეხვედრა, ჩალაგება, ჩამოსვლა, ჩენა, ჩვენება, ჩვეულებრივი, ცარიელი, ცდა, ცეკვა, ცივი, ცოდნა, ცუდი, ცურვა, ცხელი, ცხენი, ცხოვრება, ძველი, ძვირი, ძილი, ძლიერი, ძმა, ძროხა, წარდგენა, წასვლა, წევა, წერა, წვდომა, წვიმიანი, წითელი, წყნარი, ჭამა, ჭკვიანი, ჭრა, ჭუჭყიანი, ხარჯვა, ხატვა, ხაჭაპური, ხე, ხინკალი, ხმამაღალი, ხმაურიანი, ხტომა, ხუთი, ჯანსაღი, ჯდომა
```

</details>

---

### PT (`pt`)

- **COSYlanguages A1 Word Count:** 393
- **COSYdata A0/A1 Word Count:** 124
- **Exact Overlap Count:** 33
- **Candidates to Migrate (Only in COSYlanguages):** 360 words
- **COSYdata Unique Words (To Keep):** 91 words
- **Likely Near-Duplicates:** 0 pairs
- **Migration Classification:** **(b) Incomplete Migration**
- **Rationale:** COSYdata contains 124 words vs 393 in COSYlanguages. While substantial core vocabulary was migrated (33 exact overlap), significant vocabulary (360 words) remains in COSYlanguages awaiting intake.

<details>
<summary><strong>Full "Only in COSYlanguages" Word List (360 words)</strong></summary>

```
a tempo inteiro, a tempo parcial, aberto, aborrecido, abrir, acontecer, acordar, adicionar, agradecer, ajudar, Albert Einstein, Alemanha, alto, alugar, amar, amarelo, Amesterdão, amigável, aprender, apresentar, arrependido, assistir, assustado, Atenas, Austrália, Áustria, azul, bacalhau, baixo, barato, Barcelona, barulhento, beber, Bélgica, Berlim, Beyoncé, bom, bondoso, bonito, branco, Brasil, brasileiro, brigadeiro, cabeça, caderno, cair, caminhar, camisa, Canadá, cancelar, cansado, cantar, caro, castanho, cavalo, celebrar, chegar, cheio, Chicago, China, chorar, chuvoso, Cidade do México, cinzento, cobrar, começar, comer, comprar, computador, comum, concordar, conduzir, confiante, conhecer, construir, contar, continuar, convidar, cor-de-rosa, Coreia do Sul, correr, correto, cortar, cozinhar, crescer, Cristiano Ronaldo, custar, dançar, dar, dececionado, decidir, deitar-se, descansar, desenhar, desfrutar, dever, diferente, difícil, Dinamarca, dizer, doente, dois, dormir, Dublim, duro, e, Edimburgo, educado, Egito, ela, ele, eles, Elon Musk, em forma, empurrar, encomendar, encontrar, engraçado, ensinar, ensolarado, entediado, entender, entusiasmado, enviar, errado, escolher, escrever, Espanha, especial, esperar, esperto, esquecer, estar de pé, estressado, estudar, eu, EUA, excelente, exercitar, explicar, fácil, falar, faminto, fantástico, fazer, fazer as malas, fechado, fechar, feijoada, feliz, festa, ficar, Finlândia, Florença, forte, fraco, França, fresco, frio, ganhar, gastar, gerir, gostar, grande, grátis, Grécia, grosseiro, honesto, horrível, importante, impossível, incluir, incrível, Índia, infeliz, Inglaterra, inglês, interessante, inútil, ir, Irlanda, irmã, irmão, Itália, Japão, jogar, jovem, laranja, lavar, lembrar, lento, Leonardo da Vinci, ler, levantar-se, levar, leve, ligar, limpar, limpo, lindo, Lionel Messi, Londres, longo, Los Angeles, lua, macio, magoar, manter, maravilhoso, Marie Curie, mas, mau, Melbourne, mesmo, meu, Miami, molhado, Montreal, morno, morrer, Moscou, mostrar, mover, mudar, nadar, necessário, Nelson Mandela, nervoso, Noruega, nós, Nova Iorque, novo, nunca, obter, ocupado, odiar, olhar, on-line, orgulhoso, ótimo, ouvir, pagar, Países Baixos, parar, parecer, Paris, partilhar, partir, passar, pássaro, peixe, pensar, pequeno, Pequim, perder, perfeito, perguntar, perigoso, pertencer, pesado, Polónia, popular, pôr, português, possível, poupar, Praga, precisar, preguiçoso, preocupado, preto, produzir, projetar, puxar, quebrar, quente, querer, Rainha Isabel II, rápido, receber, recomendar, recuperar, relaxado, relaxar, reparar, repetir, reservar, responder, Rio de Janeiro, Roma, Rússia, saber, saltar, São Francisco, saudável, seco, sedento, seguir, seguro, semelhante, sempre, sentar, sentir, ser, significar, silencioso, simpático, sorrir, sozinho, Suécia, Suíça, sujo, surpreendido, Sydney, Tailândia, Taylor Swift, telemóvel, tentar, ter, ter meios para, terminar, terrível, teu, tímido, tomar, tomar o pequeno-almoço, Tóquio, tornar-se, trabalhar, trazer, triste, tu, Ucrânia, um, usar, útil, vaca, Vancouver, vazio, velho, vender, Veneza, ver, verde, verificar, vermelho, vestido, vestir, viajar, viajar diariamente, Viena, vir, virar, visitar, viver, voar, voltar, Washington D.C., William Shakespeare, zangado
```

</details>

<details>
<summary><strong>COSYdata Unique Words List (91 words)</strong></summary>

```
almoço, amanhã, armário, autocarro, banana, bem-vindo, boca, bolsa, caixa, caneta, cartão, chá, champô, chão, chapéu, chave, chávena, chuva, colher, com licença, comida, como, copo, criança, escola, escova de dentes, espelho, estante, faca, família, floresta, forno, frigorífico, garfo, garrafa, hoje, janela, jantar, jardim, lâmpada, lápis, loja, maçã, mala, manhã, mapa, mar, marido, massa, mercado, montanha, mulher, não, nariz, o quê, onde, ovo, país, papel, parede, parque, pasta de dentes, pente, pequeno-almoço, perna, pizza, ponte, por favor, porquê, porta, praia, prato, presente, quando, quantos, quem, recibo, relógio, rio, rua, sabão, secretária, semana, sim, sofá, t-shirt, tarde, telefone, telhado, toalha, trabalho
```

</details>

---

### RU (`ru`)

- **COSYlanguages A1 Word Count:** 465
- **COSYdata A0/A1 Word Count:** 545
- **Exact Overlap Count:** 133
- **Candidates to Migrate (Only in COSYlanguages):** 332 words
- **COSYdata Unique Words (To Keep):** 412 words
- **Likely Near-Duplicates:** 0 pairs
- **Migration Classification:** **(a) Curated Subset by Design (COSYdata Expanded)**
- **Rationale:** COSYdata has 545 words vs 465 in COSYlanguages. COSYdata was expanded with additional language-specific core vocabulary.

<details>
<summary><strong>Full "Only in COSYlanguages" Word List (332 words)</strong></summary>

```
Александр Пушкин, американец, Афины, без труда не выловишь и рыбку из пруда, безопасный, бесполезный, битый час, бить баклуши, бить в точку, благодарить, бок о бок, болеть, борщ, бронировать, быть должным, в двух шагах, в здоровом теле здоровый дух, в конце концов, в лучшем случае, в мгновение ока, в общем и целом, в основном, в первую очередь, в самом деле, в самый раз, в свою очередь, в худшем случае, в центре внимания, вежливый, век живи — век учись, великолепный, верный, вешать нос, взволнованный, взимать плату, взять себя в руки, взять слово, витать в облаках, включать, водить за нос, возвращаться, волков бояться — в лес не ходить, время летит, время от времени, всему своё время, вставать, вставлять палки в колёса, встречать, встречать по одёжке, выбирать, выздоравливать, вылететь из головы, глазом не моргнуть, глядеть в оба, гордый, громкий, грубый, гулять, дарёному коню в зубы не смотрят, дать слово, двигаться, делать из мухи слона, делиться, делу время, потехе час, день за днём, день и ночь, держать в ежовых рукавицах, держать в уме, держать слово, держать ухо востро, держать язык за зубами, дешёвый, днём, до сих пор, добавлять, добрый, дождливый, дорогой, другой, дружелюбный, друзья познаются в беде, душа в душу, ездить на работу, ждать у моря погоды, завтракать, задирать нос, заказывать, замечательный, занятой, зарабатывать, засучив рукава, звонить, здоровый, знать назубок, значить, золотые руки, зуб на зуб не попадает, идеальный, из рук вон плохо, изо дня в день, интересный, использовать, испуганный, к сожалению, к счастью, к удивлению, каждый день, казаться, как кошка с собакой, как ни в чём не бывало, как по маслу, как правило, как с гуся вода, как свои пять пальцев, как снег на голову, кануть в лету, кверху ногами, китаец, класть, короче говоря, крупный, куй железо, пока горячо, лёгок на помине, ленивый, лить слёзы, лицом к лицу, ложиться спать, ломать, Лондон, лучше поздно, чем никогда, мастер на все руки, мокрый, Москва, на все сто, на всякий случай, на первый взгляд, на самом деле, на свежую голову, на широкую ногу, навещать, надеяться, намотать на ус, напряжённый, напуганный, нарушить слово, наслаждаться, не в своей тарелке, не за горами, не имей сто рублей, а имей сто друзей, небольшой, невозможный, ненавидеть, необходимый, неполный, неправильный, нервный, несчастный, нет дыма без огня, нет худа без добра, ни в коем случае, ни при чём, ни пуха ни пера, ни рыба ни мясо, ни свет ни заря, ни то ни сё, низкий, нога в ногу, носить, нуждаться, Нью-Йорк, обеспокоенный, объяснять, обычный, огорчённый, один в поле не воин, один на один, одинокий, одним словом, онлайн, опасный, организовать, особенный, оставаться, останавливать, от А до Я, от всего сердца, от корки до корки, отвратительный, отдыхать, отличный, отменять, пальчики оближешь, Париж, первый блин комом, плевать в потолок, плечом к плечу, по вкусу, по душам, по душе, по очереди, по ошибке, по плечу, по привычке, побеждать, поворачивать, повторение — мать учения, повторять, под боком, подать руку помощи, поживём — увидим, позволить себе, показывать, полезный, получать, популярный, посещать, посылать, похожий, правильный, праздновать, представлять, презентовать, преподавать, приглашать, принадлежать, принимать близко к сердцу, приятный, пробовать, проверять, продолжать, просыпаться, прохладный, проходить, прыгать, путешествовать, раз и навсегда, разговаривать, разочарованный, рано или поздно, рассказывать, расслабленный, расслабляться, расти, резать, рекомендовать, решать, Рим, рисовать, рука об руку, рукой подать, русский, с глазу на глаз, с другой стороны, с минуты на минуту, с ног на голову, с нуля, с одной стороны, с тех пор, с утра до вечера, с чистой совестью, салат оливье, само собой разумеется, свободный, семь раз отмерь, один раз отрежь, сердитый, сидеть сложа руки, симпатичный, скучать, скучающий, скучный, следовать, слово в слово, случаться, слышать, смешной, снимать, со всех ног, со дня на день, собака лает — караван идёт, собирать вещи, соглашаться, солнечный, сохранять, спортивный, спустя рукава, становиться, старый друг лучше новых двух, стоить, строить, судя по всему, сухой, считать воронов, США, сытый голодного не разумеет, так или иначе, тем временем, тем не менее, тёплый, терять, тихий, тише едешь — дальше будешь, толкать, тратить, тренироваться, тянуть, тянуть кота за хвост, уверенный, удивительный, удивлённый, ужасный, улыбаться, умирать, умный, умывать руки, управлять, усталый, уходить, фантастический, ходить пешком, хоть пруд пруди, хранить, целый день, цыплят по осени считают, через день, честно говоря, честный, чинить, что посеешь, то и пожнёшь, шаг за шагом, шила в мешке не утаишь, шумный, яблоко от яблони недалеко падает
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
