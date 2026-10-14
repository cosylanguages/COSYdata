# COSYlanguages Local Vocabulary Audit & Comparison Report

This report provides a full audit of all entries in COSYlanguages local `vocabulary/{lang}/` files compared against COSYdata master datasets.

## Executive Summary

1. **English Migration**: All genuine B1, C1, and C2 idioms and A0–A1 core vocabulary terms (such as `thanks` and `repeat`) have been migrated into `COSYdata/vocabulary/en/` in compliance with `schemas/vocabulary.schema.json`.
2. **COSYlanguages Local Directory Audit**: Across COSYlanguages' 683 local files, remaining unmigrated items are categorized into:
   - **Core Vocabulary Terms**: High-level or regional terms.
   - **Idioms**: French, Italian, and Russian idiom lists.
   - **Discussion Prompts**: Debates, fluency, opinions, and quotes.

### Summary Table by Language

| Language | Local Files | COSYdata Surface Words | Missing Vocab Terms | Missing Idioms | Missing Prompts | Total Missing |
|---|---|---|---|---|---|---|
| **ba** | 32 | 479 | 325 | 0 | 115 | 440 |
| **br** | 32 | 513 | 337 | 0 | 115 | 452 |
| **cv** | 18 | 568 | 3 | 0 | 10 | 13 |
| **de** | 18 | 654 | 193 | 0 | 184 | 377 |
| **el** | 50 | 1374 | 244 | 0 | 323 | 567 |
| **en** | 232 | 14172 | 1754 | 0 | 0 | 1754 |
| **es** | 18 | 614 | 134 | 0 | 184 | 318 |
| **fr** | 57 | 2405 | 251 | 643 | 655 | 1549 |
| **hy** | 32 | 495 | 322 | 0 | 115 | 437 |
| **it** | 56 | 2907 | 265 | 632 | 654 | 1551 |
| **ka** | 32 | 494 | 326 | 0 | 115 | 441 |
| **pt** | 18 | 609 | 181 | 0 | 184 | 365 |
| **ru** | 56 | 2149 | 315 | 631 | 655 | 1601 |
| **tt** | 32 | 489 | 321 | 0 | 115 | 436 |

---

## Detailed Breakdown by Language

### Language: `ba`

- **COSYlanguages Local Files**: 32
- **COSYdata Master Surface Words**: 479
- **Unmigrated Vocabulary Terms**: 325
- **Unmigrated Idioms**: 0
- **Unmigrated Discussion Prompts**: 115

#### Sample Unmigrated Entries:

| Source Local File | Entry Category | Unmigrated Term / Prompt |
|---|---|---|
| `A2/fluency.js` | Discussion Prompt | `Һеҙ хәтерләгән ялдар` |
| `A2/fluency.js` | Discussion Prompt | `Һеҙҙең яратҡан ресторанығыҙ йәки кафеғыҙ` |
| `A2/fluency.js` | Discussion Prompt | `Һеҙ эшкә йәки уҡырға нисек бараһығыҙ` |
| `A2/fluency.js` | Discussion Prompt | `Ял итеү өсөн нәрсә эшләйһегеҙ` |
| `A2/fluency.js` | Discussion Prompt | `Күптән түгел ҡараған фильм` |
| `A2/fluency.js` | Discussion Prompt | `Һеҙҙең идеаль ял көндәрегеҙ` |
| `A2/fluency.js` | Discussion Prompt | `Һеҙ һоҡланған кеше` |
| `A2/fluency.js` | Discussion Prompt | `Һеҙҙең хыялдағы сәйәхәт урынығыҙ` |
| `A2/fluency.js` | Discussion Prompt | `Һеҙҙең телефон менән мөнәсәбәтегеҙ` |
| `A2/fluency.js` | Discussion Prompt | `Һеҙҙең менән булған ҡыҙыҡлы хәл` |
| `A2/fluency.js` | Discussion Prompt | `Һеҙҙең хоббиларығыҙ` |
| `A2/fluency.js` | Discussion Prompt | `Һеҙ йәшәгән урындағы һава торошо` |
| `A2/fluency.js` | Discussion Prompt | `Һеҙ хәтерләгән тыуған көн` |
| `A2/fluency.js` | Discussion Prompt | `Йәшәгән урынығыҙҙа һеҙ яратҡан әйберҙәр` |
| `A2/fluency.js` | Discussion Prompt | `Ғәҙәти йәкшәмбе` |
| `A2/fluency.js` | Discussion Prompt | `Илегеҙҙең ризыҡтары` |
| `A2/fluency.js` | Discussion Prompt | `Күптән түгел һатып алынған әйбер` |
| `A2/fluency.js` | Discussion Prompt | `Һеҙҙең яратҡан ҡушымтағыҙ` |
| `A2/fluency.js` | Discussion Prompt | `Бала саҡ иҫтәлеге` |
| `A2/fluency.js` | Discussion Prompt | `Кисә нәрсә ашанығыҙ` |
| `A2/opinions.js` | Discussion Prompt | `Ял көндәре бик ҡыҫҡа.` |
| `A2/opinions.js` | Discussion Prompt | `Һуңға ҡалыу — әҙәпһеҙлек.` |
| `A2/opinions.js` | Discussion Prompt | `Кескәй ҡалаларҙа кешеләр мәхәббәтлерәк.` |
| `A2/opinions.js` | Discussion Prompt | `Йорт хайуаны булыуы ыеҙҙе бәхетлерәк итә.` |
| `A2/opinions.js` | Discussion Prompt | `Аяҡ кейеме буйынса кеше тураһында күп нәмә әйтеп була.` |
| `A2/opinions.js` | Discussion Prompt | `Ресторанда бер үҙең ашау — нормаль.` |
| `A2/opinions.js` | Discussion Prompt | `Йәш саҡта тел өйрәнеү еңелерәк.` |
| `A2/opinions.js` | Discussion Prompt | `Йәмәғәт транспорты автомобилгә ҡарағанда яхшыраҡ.` |
| `A2/opinions.js` | Discussion Prompt | `Телефон булғанда күңелһеҙләнеү ҡыйын.` |
| `A2/opinions.js` | Discussion Prompt | `Өйҙә ашарға бешереү һәр ваҡыт тышта ашауҙан яхшыраҡ.` |
| `A2/opinions.js` | Discussion Prompt | `Һәр кем бер йыл сит илдә йәшәп ҡарарға тейеш.` |
| `A2/opinions.js` | Discussion Prompt | `Супергеройҙар реаль геройҙарға ҡарағанда ҡызыҡлыраҡ.` |
| `A2/opinions.js` | Discussion Prompt | `Һәр иртә урын-ерҙе йыйып ҡуйыу мөһим.` |
| `A2/opinions.js` | Discussion Prompt | `Шопинг — бу хобби.` |
| `A2/opinions.js` | Discussion Prompt | `Бер үҙең сәйәхәт итеү дуҫтар менән сәйәхәт итеүҙән яхшыраҡ.` |
| `B1/fluency.js` | Discussion Prompt | `Үҙеңде өйҙәгесә хис иткән урын` |
| `B1/fluency.js` | Discussion Prompt | `Һеҙ фекерегеҙҙе үҙгәрткән нәмә` |
| `B1/fluency.js` | Discussion Prompt | `Яҡшы дуҫ ниндәй булырға тейеш` |
| `B1/fluency.js` | Discussion Prompt | `Һеҙ иртәрәк өйрәнергә теләгән нәмә` |
| `B1/fluency.js` | Discussion Prompt | `Һеҙ яҡшыртырға тырышҡан күнекмә` |
| `B1/fluency.js` | Discussion Prompt | `Баласаҡтан һеҙгә етмәгән нәмә` |
| `B1/fluency.js` | Discussion Prompt | `Һеҙҙең идеаль эш көнөгөҙ` |
| `B1/fluency.js` | Discussion Prompt | `Тормошоғоҙ һуңғы берничә йылда нисек үҙгәрҙе` |
| `B1/fluency.js` | Discussion Prompt | `Һеҙҙе үҙегеҙҙе иң йәнле хис иттергән нәмә` |
| `B1/fluency.js` | Discussion Prompt | `Һеҙҙе иң ныҡ игътибарҙы ситкә йүнәлткән нәмә` |
| `B1/fluency.js` | Discussion Prompt | `Хәтерҙә ҡалған китап, фильм йәки сериал` |
| `B1/fluency.js` | Discussion Prompt | `Һеҙҙең өсөн өй нәмә аңлата` |
| `B1/fluency.js` | Discussion Prompt | `Һеҙ күпселек кешәнән айырылып эшләй торган нәмә` |
| `B1/fluency.js` | Discussion Prompt | `Һеҙ ғорурлана торган ғәҙәт` |
| `B1/fluency.js` | Discussion Prompt | `Һеҙҙе ғәжәпләндергән сәйәхәт` |
| ... | ... | *[390 additional entries omitted for brevity]* |

### Language: `br`

- **COSYlanguages Local Files**: 32
- **COSYdata Master Surface Words**: 513
- **Unmigrated Vocabulary Terms**: 337
- **Unmigrated Idioms**: 0
- **Unmigrated Discussion Prompts**: 115

#### Sample Unmigrated Entries:

| Source Local File | Entry Category | Unmigrated Term / Prompt |
|---|---|---|
| `A2/fluency.js` | Discussion Prompt | `Vakañsoù ho peus soñj anezho` |
| `A2/fluency.js` | Discussion Prompt | `Ho pretis pe ho cafedi muiañ-karet` |
| `A2/fluency.js` | Discussion Prompt | `Penaos e tait d'al labour pe d'ar skol` |
| `A2/fluency.js` | Discussion Prompt | `Petra a rit evit diskuizhañ` |
| `A2/fluency.js` | Discussion Prompt | `Ur film ho peus gwelet n'eus ket pell` |
| `A2/fluency.js` | Discussion Prompt | `Hoc'h dibenn-sizhun eus an dibab` |
| `A2/fluency.js` | Discussion Prompt | `Un den a vourrit anezhañ` |
| `A2/fluency.js` | Discussion Prompt | `Lec'h ho vakañsoù a huñvre` |
| `A2/fluency.js` | Discussion Prompt | `Ho liamm gant ho pellgomz` |
| `A2/fluency.js` | Discussion Prompt | `Un dra bennak farsus a zo c'hoarvezet ganeoc'h` |
| `A2/fluency.js` | Discussion Prompt | `Ho plijadurioù` |
| `A2/fluency.js` | Discussion Prompt | `An amzer en ho lec'h-bevañ` |
| `A2/fluency.js` | Discussion Prompt | `Un deiz-ha-bloaz ho peus soñj anezhañ` |
| `A2/fluency.js` | Discussion Prompt | `Traoù a garit en ho lec'h-bevañ` |
| `A2/fluency.js` | Discussion Prompt | `Ur Sul peurvuiañ` |
| `A2/fluency.js` | Discussion Prompt | `Boued eus ho pro` |
| `A2/fluency.js` | Discussion Prompt | `Un dra bennak ho peus prenet n'eus ket pell` |
| `A2/fluency.js` | Discussion Prompt | `Hoc'h app muiañ-karet` |
| `A2/fluency.js` | Discussion Prompt | `Ur soñj eus ho pugaleaj` |
| `A2/fluency.js` | Discussion Prompt | `Petra ho peus debret dec'h` |
| `A2/opinions.js` | Discussion Prompt | `Re verr eo an dibenn-sizhun.` |
| `A2/opinions.js` | Discussion Prompt | `Displed eo bezañ war-lerc'h.` |
| `A2/opinions.js` | Discussion Prompt | `Gwelloc'h eo an dud er c'hêrioù bihan.` |
| `A2/opinions.js` | Discussion Prompt | `Laouenoc'h e vezit pa az peus ul loen-ti.` |
| `A2/opinions.js` | Discussion Prompt | `Gallout a rit lavaret kalz traoù diwar-benn unan bennak dre o botoù.` |
| `A2/opinions.js` | Discussion Prompt | `Mat eo debriñ e-unan en un ti-debriñ.` |
| `A2/opinions.js` | Discussion Prompt | `Aesoc'h eo deskiñ ur yezh pa vezit yaouank.` |
| `A2/opinions.js` | Discussion Prompt | `Gwelloc'h eo an dezougen boutin eget kaout ur c'harr-tan.` |
| `A2/opinions.js` | Discussion Prompt | `Diaes eo bezañ en deus dregantiñ pa az peus ur pellgomz.` |
| `A2/opinions.js` | Discussion Prompt | `Gwelloc'h eo poazhañ er gêr eget debriñ en un ti-debriñ.` |
| `A2/opinions.js` | Discussion Prompt | `An holl a rankfe klask bevañ en estrenvro e-pad ur bloaz.` |
| `A2/opinions.js` | Discussion Prompt | `Dedennotoc'h eo ar gourharozed eget ar harozed wirion.` |
| `A2/opinions.js` | Discussion Prompt | `Pouezus eo ober ho kwele bemdez d'ar mintin.` |
| `A2/opinions.js` | Discussion Prompt | `Un dudi eo ar prenañ traoù.` |
| `A2/opinions.js` | Discussion Prompt | `Gwelloc'h eo veajiñ ho-unan eget veajiñ gant mignoned.` |
| `B1/fluency.js` | Discussion Prompt | `Ul lec'h ma fell deoc'h bezañ er gêr` |
| `B1/fluency.js` | Discussion Prompt | `Un dra bennak ho peus cheñchet ho soñj warnañ` |
| `B1/fluency.js` | Discussion Prompt | `Petra a laka un den da vezañ ur mignon mat` |
| `B1/fluency.js` | Discussion Prompt | `Un dra bennak ho pije bet c'hoant da zeskiñ abretoc'h` |
| `B1/fluency.js` | Discussion Prompt | `Ur varregezh emaoc'h o klask gwellaat` |
| `B1/fluency.js` | Discussion Prompt | `Ar pezh a vank deoc'h eus ho pugaleaj` |
| `B1/fluency.js` | Discussion Prompt | `Ho tiviz-labour eus an dibab` |
| `B1/fluency.js` | Discussion Prompt | `Penaos eo cheñchet ho puhez e-kerzh ar bloavezhioù diwezhañ` |
| `B1/fluency.js` | Discussion Prompt | `Petra a laka ac'hanoc'h da vezañ bev-buhezek` |
| `B1/fluency.js` | Discussion Prompt | `Ho tistro-spered brasañ` |
| `B1/fluency.js` | Discussion Prompt | `Ul levr, ur film pe ur rummad filmoù a zo chomet en ho spered` |
| `B1/fluency.js` | Discussion Prompt | `Petra eo ar gêr evidoc'h` |
| `B1/fluency.js` | Discussion Prompt | `Un dra bennak a rit en un doare disheñvel diouzh ar re all` |
| `B1/fluency.js` | Discussion Prompt | `Ur boaz a zo ur lorc'h ennoch gantañ` |
| `B1/fluency.js` | Discussion Prompt | `Ur veaj he deus souezhet ac'hanoc'h` |
| ... | ... | *[402 additional entries omitted for brevity]* |

### Language: `cv`

- **COSYlanguages Local Files**: 18
- **COSYdata Master Surface Words**: 568
- **Unmigrated Vocabulary Terms**: 3
- **Unmigrated Idioms**: 0
- **Unmigrated Discussion Prompts**: 10

#### Sample Unmigrated Entries:

| Source Local File | Entry Category | Unmigrated Term / Prompt |
|---|---|---|
| `A2/fluency.js` | Discussion Prompt | `Çулçӳрев тата каникул` |
| `A2/opinions.js` | Discussion Prompt | `Ĕç тата кану` |
| `B1/fluency.js` | Discussion Prompt | `Çулçӳрев тата каникул` |
| `B1/opinions.js` | Discussion Prompt | `Ĕç тата кану` |
| `B2/fluency.js` | Discussion Prompt | `Çулçӳрев тата каникул` |
| `B2/opinions.js` | Discussion Prompt | `Ĕç тата кану` |
| `C1/fluency.js` | Discussion Prompt | `Çулçӳрев тата каникул` |
| `C1/opinions.js` | Discussion Prompt | `Ĕç тата кану` |
| `C2/adjectives.js` | Vocabulary | `кăсăклăхлă` |
| `C2/fluency.js` | Discussion Prompt | `Çулçӳрев тата каникул` |
| `C2/opinions.js` | Discussion Prompt | `Ĕç тата кану` |
| `C2/verbs.js` | Vocabulary | `шухăшласа илме` |
| `C2/vocabulary.js` | Vocabulary | `çут çанталăк` |

### Language: `de`

- **COSYlanguages Local Files**: 18
- **COSYdata Master Surface Words**: 654
- **Unmigrated Vocabulary Terms**: 193
- **Unmigrated Idioms**: 0
- **Unmigrated Discussion Prompts**: 184

#### Sample Unmigrated Entries:

| Source Local File | Entry Category | Unmigrated Term / Prompt |
|---|---|---|
| `A2/fluency.js` | Discussion Prompt | `Ein Urlaub, an den du dich erinnerst` |
| `A2/fluency.js` | Discussion Prompt | `Dein Lieblingsrestaurant oder -café` |
| `A2/fluency.js` | Discussion Prompt | `Wie du zur Arbeit oder Schule kommst` |
| `A2/fluency.js` | Discussion Prompt | `Was du tust, um dich zu entspannen` |
| `A2/fluency.js` | Discussion Prompt | `Ein Film, den du vor Kurzem gesehen hast` |
| `A2/fluency.js` | Discussion Prompt | `Dein ideales Wochenende` |
| `A2/fluency.js` | Discussion Prompt | `Eine Person, die du bewunderst` |
| `A2/fluency.js` | Discussion Prompt | `Dein Traum-Urlaubsziel` |
| `A2/fluency.js` | Discussion Prompt | `Deine Beziehung zu deinem Handy` |
| `A2/fluency.js` | Discussion Prompt | `Etwas Lustiges, das dir passiert ist` |
| `A2/fluency.js` | Discussion Prompt | `Deine Hobbys` |
| `A2/fluency.js` | Discussion Prompt | `Das Wetter, wo du wohnst` |
| `A2/fluency.js` | Discussion Prompt | `Ein Geburtstag, an den du dich erinnerst` |
| `A2/fluency.js` | Discussion Prompt | `Dinge, die du an deinem Wohnort liebst` |
| `A2/fluency.js` | Discussion Prompt | `Ein typischer Sonntag` |
| `A2/fluency.js` | Discussion Prompt | `Essen aus deinem Land` |
| `A2/fluency.js` | Discussion Prompt | `Etwas, das du vor Kurzem gekauft hast` |
| `A2/fluency.js` | Discussion Prompt | `Deine Lieblings-App` |
| `A2/fluency.js` | Discussion Prompt | `Eine Kindheitserinnerung` |
| `A2/fluency.js` | Discussion Prompt | `Was du gestern gegessen hast` |
| `A2/opinions.js` | Discussion Prompt | `Wochenenden sind zu kurz.` |
| `A2/opinions.js` | Discussion Prompt | `Es ist unhöflich, zu spät zu kommen.` |
| `A2/opinions.js` | Discussion Prompt | `Menschen sind in Kleinstädten netter.` |
| `A2/opinions.js` | Discussion Prompt | `Ein Haustier zu haben, macht glücklicher.` |
| `A2/opinions.js` | Discussion Prompt | `Man kann viel über jemanden an seinen Schuhen erkennen.` |
| `A2/opinions.js` | Discussion Prompt | `Es ist okay, allein in einem Restaurant zu essen.` |
| `A2/opinions.js` | Discussion Prompt | `Eine Sprache zu lernen ist einfacher, wenn man jung ist.` |
| `A2/opinions.js` | Discussion Prompt | `Öffentliche Verkehrsmittel sind besser als ein Auto.` |
| `A2/opinions.js` | Discussion Prompt | `Es ist schwer, sich zu langweilen, wenn man ein Handy hat.` |
| `A2/opinions.js` | Discussion Prompt | `Zu Hause zu kochen ist immer besser als auswärts zu essen.` |
| `A2/opinions.js` | Discussion Prompt | `Jeder sollte versuchen, ein Jahr lang im Ausland zu leben.` |
| `A2/opinions.js` | Discussion Prompt | `Superhelden sind interessanter als echte Helden.` |
| `A2/opinions.js` | Discussion Prompt | `Es ist wichtig, jeden Morgen das Bett zu machen.` |
| `A2/opinions.js` | Discussion Prompt | `Einkaufen ist ein Hobby.` |
| `A2/opinions.js` | Discussion Prompt | `Allein zu reisen ist besser, als mit Freunden zu reisen.` |
| `B1/fluency.js` | Discussion Prompt | `Ein Ort, der sich für dich wie Zuhause anfühlt` |
| `B1/fluency.js` | Discussion Prompt | `Etwas, worüber du deine Meinung geändert hast` |
| `B1/fluency.js` | Discussion Prompt | `Was einen guten Freund ausmacht` |
| `B1/fluency.js` | Discussion Prompt | `Etwas, das du gerne früher gelernt hättest` |
| `B1/fluency.js` | Discussion Prompt | `Eine Fähigkeit, die du zu verbessern versuchst` |
| `B1/fluency.js` | Discussion Prompt | `Was du am Kindsein vermisst` |
| `B1/fluency.js` | Discussion Prompt | `Dein idealer Arbeitstag` |
| `B1/fluency.js` | Discussion Prompt | `Wie sich dein Leben in den letzten Jahren verändert hat` |
| `B1/fluency.js` | Discussion Prompt | `Was dich am lebendigsten fühlen lässt` |
| `B1/fluency.js` | Discussion Prompt | `Deine größte Ablenkung` |
| `B1/fluency.js` | Discussion Prompt | `Ein Buch, ein Film oder eine Serie, die dir in Erinnerung geblieben ist` |
| `B1/fluency.js` | Discussion Prompt | `Was Zuhause für dich bedeutet` |
| `B1/fluency.js` | Discussion Prompt | `Etwas, das du anders machst als die meisten Menschen` |
| `B1/fluency.js` | Discussion Prompt | `Eine Gewohnheit, auf die du stolz bist` |
| `B1/fluency.js` | Discussion Prompt | `Eine Reise, die dich überrascht hat` |
| ... | ... | *[327 additional entries omitted for brevity]* |

### Language: `el`

- **COSYlanguages Local Files**: 50
- **COSYdata Master Surface Words**: 1374
- **Unmigrated Vocabulary Terms**: 244
- **Unmigrated Idioms**: 0
- **Unmigrated Discussion Prompts**: 323

#### Sample Unmigrated Entries:

| Source Local File | Entry Category | Unmigrated Term / Prompt |
|---|---|---|
| `A2/debates.js` | Discussion Prompt | `Υψηλός μισθός εναντίον σύντομης διαδρομής: τι έχει μεγαλύτερη σημασία σε μια δουλειά;` |
| `A2/debates.js` | Discussion Prompt | `Συχνή αλλαγή εργασίας εναντίον παραμονής στην ίδια εταιρεία: τι είναι καλύτερο για την καριέρα σας;` |
| `A2/debates.js` | Discussion Prompt | `Εργασία υπερωριών εναντίον αποχώρησης στην ώρα σας κάθε μέρα: ποια είναι η καλύτερη συνήθεια;` |
| `A2/debates.js` | Discussion Prompt | `Ένα αφεντικό που είναι αυστηρό εναντίον ενός αφεντικού που είναι χαλαρό: για ποιον είναι καλύτερο να εργάζεστε;` |
| `A2/debates.js` | Discussion Prompt | `Εργασία σε μια μεγάλη εταιρεία εναντίον μιας μικρής εταιρείας: τι είναι καλύτερο;` |
| `A2/debates.js` | Discussion Prompt | `Απόκτηση προαγωγής εναντίον απόκτησης περισσότερου ελεύθερου χρόνου: τι θα επιλέγατε;` |
| `A2/debates.js` | Discussion Prompt | `Αγορά σπιτιού εναντίον ενοικίασης για μια ζωή: ποια είναι η πιο έξυπνη οικονομική απόφαση;` |
| `A2/debates.js` | Discussion Prompt | `Ζωή στο κέντρο της πόλης εναντίον ζωής στα προάστια: τι είναι καλύτερο;` |
| `A2/debates.js` | Discussion Prompt | `Δαπάνη χρημάτων σε εμπειρίες εναντίον σε πράγματα: τι σας κάνει πιο ευτυχισμένους;` |
| `A2/debates.js` | Discussion Prompt | `Μαγειρική κάθε μέρα εναντίον προετοιμασίας γευμάτων μία φορά την εβδομάδα: τι είναι πιο πρακτικό;` |
| `A2/debates.js` | Discussion Prompt | `Ύπαρξη καθαριστή εναντίον προσωπικής ενασχόλησης με τις δουλειές του σπιτιού: ποια είναι η καλύτερη επιλογή;` |
| `A2/debates.js` | Discussion Prompt | `Ζωή με σύντροφο εναντίον ζωής μόνος: τι είναι καλύτερο για τους ενήλικες;` |
| `A2/debates.js` | Discussion Prompt | `Απόκτηση παιδιών νωρίς εναντίον απόκτησης παιδιών αργότερα στη ζωή: τι είναι καλύτερο;` |
| `A2/debates.js` | Discussion Prompt | `Στενές οικογενειακές σχέσεις εναντίον ανεξαρτησίας από την οικογένεια: τι είναι πιο σημαντικό ως ενήλικας;` |
| `A2/debates.js` | Discussion Prompt | `Γνωριμία με νέους ανθρώπους εναντίον διατήρησης παλιών φιλιών: τι είναι πιο πολύτιμο;` |
| `A2/debates.js` | Discussion Prompt | `Κοινωνικοποίηση μετά τη δουλειά εναντίον επιστροφής κατευθείαν στο σπίτι: τι είναι καλύτερο για τις εργασιακές σχέσεις;` |
| `A2/debates.js` | Discussion Prompt | `Πηγαίνοντας στο γυμναστήριο εναντίον άσκησης σε εξωτερικούς χώρους: τι είναι καλύτερο για τους ενήλικες;` |
| `A2/debates.js` | Discussion Prompt | `Αυστηρή δίαιτα εναντίον κατανάλωσης των πάντων με μέτρο: τι είναι πιο υγιεινό;` |
| `A2/debates.js` | Discussion Prompt | `Επίσκεψη σε γιατρό νωρίς εναντίον αναμονής για να δείτε αν θα γίνετε καλύτερα: τι είναι πιο συνετό;` |
| `A2/debates.js` | Discussion Prompt | `Ύπνος οκτώ ωρών εναντίον ύπνου έξι ωρών αλλά με άσκηση: τι είναι καλύτερο για ενέργεια;` |
| `A2/debates.js` | Discussion Prompt | `Μείωση του στρες μέσω του αθλητισμού εναντίον μέσω της χαλάρωσης: τι λειτουργεί καλύτερα;` |
| `A2/debates.js` | Discussion Prompt | `Smartphones εναντίον συνομιλίας πρόσωπο με πρόσωπο: τι χρησιμοποιούμε περισσότερο και είναι αυτό πρόβλημα;` |
| `A2/debates.js` | Discussion Prompt | `Online banking εναντίον επίσκεψης στην τράπεζα: τι είναι καλύτερο;` |
| `A2/debates.js` | Discussion Prompt | `Εργασία με χαρτί εναντίον ψηφιακής εργασίας: τι είναι πιο αποτελεσματικό;` |
| `A2/debates.js` | Discussion Prompt | `Social media για δικτύωση εναντίον συνάντησης ανθρώπων από κοντά: τι είναι πιο χρήσιμο επαγγελματικά;` |
| `A2/debates.js` | Discussion Prompt | `Οργανωμένες διακοπές εναντίον ανεξάρτητου ταξιδιού: τι είναι καλύτερο για τους ενήλικες;` |
| `A2/debates.js` | Discussion Prompt | `Σύντομη απόδραση στην πόλη εναντίον διακοπών στην παραλία: ποιος είναι ο καλύτερος τρόπος για να χαλαρώσετε;` |
| `A2/debates.js` | Discussion Prompt | `Μία μεγάλη διακοπή το χρόνο εναντίον αρκετών μικρών αποδράσεων: τι είναι καλύτερο;` |
| `A2/debates.js` | Discussion Prompt | `Ταξιδεύοντας ως ζευγάρι εναντίον ταξιδεύοντας μόνος: τι είναι πιο απολαυστικό;` |
| `A2/debates.js` | Discussion Prompt | `Το να λέτε στον σύντροφό σας για κάθε μικρό πρόβλημα εναντίον του να κρατάτε τα πράγματα για τον εαυτό σας: τι είναι πιο υγιές;` |
| `A2/debates.js` | Discussion Prompt | `Έλεγχος του τηλεφώνου σας αμέσως το πρωί εναντίον αναμονής μέχρι μετά το πρωινό: ποια είναι η καλύτερη συνήθεια;` |
| `A2/debates.js` | Discussion Prompt | `Το να γνωρίζετε τα ονόματα των γειτόνων σας εναντίον του να μην τους γνωρίζετε: ποια είναι η πιο φυσιολογική εμπειρία ενήλικα σήμερα;` |
| `A2/debates.js` | Discussion Prompt | `Ψώνια στο σούπερ μάρκετ με λίστα εναντίον χωρίς λίστα: ποιος τύπος ανθρώπου έχει καλύτερη ζωή;` |
| `A2/debates.js` | Discussion Prompt | `Το να λέτε στο αφεντικό σας ότι είστε άρρωστοι εναντίον του να πηγαίνετε στη δουλειά άρρωστοι: ποια είναι η πιο γενναία επιλογή;` |
| `A2/debates.js` | Discussion Prompt | `Πλήρης απασχόληση εναντίον μερικής απασχόλησης: τι είναι καλύτερο;` |
| `A2/debates.js` | Discussion Prompt | `Εργασία σε γραφείο εναντίον εργασίας από το σπίτι: τι είναι καλύτερο;` |
| `A2/debates.js` | Discussion Prompt | `Μια δουλειά που αγαπάτε εναντίον μιας δουλειάς που πληρώνει καλά: τι είναι πιο σημαντικό;` |
| `A2/debates.js` | Discussion Prompt | `Εργασία με άλλους ανθρώπους εναντίον εργασίας μόνος: τι είναι καλύτερο;` |
| `A2/debates.js` | Discussion Prompt | `Μια σύντομη διαδρομή εναντίον μιας μεγάλης διαδρομής για τη δουλειά: τι είναι πιο αποδεκτό;` |
| `A2/debates.js` | Discussion Prompt | `Ζωή μόνος εναντίον ζωής με σύντροφο: τι είναι καλύτερο;` |
| `A2/debates.js` | Discussion Prompt | `Μεγάλη πόλη εναντίον μικρής πόλης: ποιο είναι το καλύτερο μέρος για να ζεις ως ενήλικας;` |
| `A2/debates.js` | Discussion Prompt | `Μαγειρική στο σπίτι εναντίον φαγητού έξω: τι είναι καλύτερο για την καθημερινή ζωή;` |
| `A2/debates.js` | Discussion Prompt | `Έχοντας παιδιά εναντίον μη έχοντας παιδιά: ποια ζωή είναι καλύτερη;` |
| `A2/debates.js` | Discussion Prompt | `Ενοικίαση διαμερίσματος εναντίον αγοράς σπιτιού: τι είναι καλύτερο για τους νέους ενήλικες;` |
| `A2/debates.js` | Discussion Prompt | `Άσκηση κάθε μέρα εναντίον ξεκούρασης: τι είναι καλύτερο για την υγεία σας;` |
| `A2/debates.js` | Discussion Prompt | `Πηγαίνοντας στον γιατρό εναντίον αναμονής: τι είναι καλύτερο όταν νιώθετε άρρωστοι;` |
| `A2/debates.js` | Discussion Prompt | `Ύπνος οκτώ ώρες εναντίον λιγότερου ύπνου: τι είναι πιο ρεαλιστικό για τους ενήλικες;` |
| `A2/debates.js` | Discussion Prompt | `Περπάτημα προς τη δουλειά εναντίον χρήσης αυτοκινήτου: τι είναι καλύτερο για την υγεία σας;` |
| `A2/debates.js` | Discussion Prompt | `Online αγορές εναντίον αγορών σε κατάστημα: τι είναι καλύτερο;` |
| `A2/debates.js` | Discussion Prompt | `Αποταμίευση για το μέλλον εναντίον απόλαυσης χρημάτων τώρα: τι είναι πιο συνετό;` |
| ... | ... | *[517 additional entries omitted for brevity]* |

### Language: `en`

- **COSYlanguages Local Files**: 232
- **COSYdata Master Surface Words**: 14172
- **Unmigrated Vocabulary Terms**: 1754
- **Unmigrated Idioms**: 0
- **Unmigrated Discussion Prompts**: 0

#### Sample Unmigrated Entries:

| Source Local File | Entry Category | Unmigrated Term / Prompt |
|---|---|---|
| `A2/Adjectives/COMMUNICATION/Leisure/Literature_Books.js` | Vocabulary | `artistic` |
| `A2/Adjectives/COMMUNICATION/Shopping/Retail_Transactions.js` | Vocabulary | `appealing` |
| `A2/Adjectives/COMMUNICATION/Shopping/Retail_Transactions.js` | Vocabulary | `appealing` |
| `A2/Adjectives/COMMUNICATION/Social/Interactions.js` | Vocabulary | `anonymous` |
| `A2/Adjectives/COMMUNICATION/Social/Interactions.js` | Vocabulary | `anonymous` |
| `A2/Adjectives/COMMUNICATION/Social/Language_Terms.js` | Vocabulary | `blank` |
| `A2/Adjectives/COMMUNICATION/Social/Language_Terms.js` | Vocabulary | `blank` |
| `A2/Adjectives/COMMUNICATION/Technology/Digital_Devices.js` | Vocabulary | `attached` |
| `A2/Adjectives/COMMUNICATION/Technology/Digital_Devices.js` | Vocabulary | `attached` |
| `A2/Adjectives/FOOD/Ingredients/Food_Beverages.js` | Vocabulary | `nutritious` |
| `A2/Adjectives/FOOD/Ingredients/Food_Beverages.js` | Vocabulary | `nutritious` |
| `A2/Adjectives/HOME/Buildings/Housing_Types.js` | Vocabulary | `architectural` |
| `A2/Adjectives/HOME/Buildings/Housing_Types.js` | Vocabulary | `architectural` |
| `A2/Adjectives/HOME/Furniture/Living_Furniture.js` | Vocabulary | `adjusted` |
| `A2/Adjectives/HOME/Furniture/Living_Furniture.js` | Vocabulary | `adjusted` |
| `A2/Adjectives/NATURE/Environment/Flora_Plants.js` | Vocabulary | `agricultural` |
| `A2/Adjectives/NATURE/Environment/Flora_Plants.js` | Vocabulary | `agricultural` |
| `A2/Adjectives/NATURE/Environment/Natural_World.js` | Vocabulary | `biological` |
| `A2/Adjectives/NATURE/Environment/Natural_World.js` | Vocabulary | `chilly` |
| `A2/Adjectives/NATURE/Environment/Natural_World.js` | Vocabulary | `hazardous` |
| `A2/Adjectives/NATURE/Environment/Natural_World.js` | Vocabulary | `adverse` |
| `A2/Adjectives/NATURE/Environment/Natural_World.js` | Vocabulary | `alien` |
| `A2/Adjectives/NATURE/Environment/Natural_World.js` | Vocabulary | `bare` |
| `A2/Adjectives/NATURE/Environment/Natural_World.js` | Vocabulary | `stormy` |
| `A2/Adjectives/NATURE/Environment/Natural_World.js` | Vocabulary | `biological` |
| `A2/Adjectives/NATURE/Environment/Natural_World.js` | Vocabulary | `chilly` |
| `A2/Adjectives/NATURE/Environment/Natural_World.js` | Vocabulary | `hazardous` |
| `A2/Adjectives/NATURE/Environment/Natural_World.js` | Vocabulary | `adverse` |
| `A2/Adjectives/NATURE/Environment/Natural_World.js` | Vocabulary | `alien` |
| `A2/Adjectives/NATURE/Environment/Natural_World.js` | Vocabulary | `bare` |
| `A2/Adjectives/NATURE/Environment/Natural_World.js` | Vocabulary | `stormy` |
| `A2/Adjectives/NATURE/Environment/Weather_Seasons.js` | Vocabulary | `tropical` |
| `A2/Adjectives/NATURE/Environment/Weather_Seasons.js` | Vocabulary | `tropical` |
| `A2/Adjectives/SELF/Appearance/Clothing_Garments.js` | Vocabulary | `casual` |
| `A2/Adjectives/SELF/Appearance/Clothing_Garments.js` | Vocabulary | `casual` |
| `A2/Adjectives/SELF/Appearance/Colours_Shades.js` | Vocabulary | `pale` |
| `A2/Adjectives/SELF/Appearance/Colours_Shades.js` | Vocabulary | `pale` |
| `A2/Adjectives/SELF/Appearance/Descriptive_Traits.js` | Vocabulary | `actual` |
| `A2/Adjectives/SELF/Appearance/Descriptive_Traits.js` | Vocabulary | `annual` |
| `A2/Adjectives/SELF/Appearance/Descriptive_Traits.js` | Vocabulary | `confidential` |
| `A2/Adjectives/SELF/Appearance/Descriptive_Traits.js` | Vocabulary | `daily` |
| `A2/Adjectives/SELF/Appearance/Descriptive_Traits.js` | Vocabulary | `dull` |
| `A2/Adjectives/SELF/Appearance/Descriptive_Traits.js` | Vocabulary | `excellent` |
| `A2/Adjectives/SELF/Appearance/Descriptive_Traits.js` | Vocabulary | `frequent` |
| `A2/Adjectives/SELF/Appearance/Descriptive_Traits.js` | Vocabulary | `inner` |
| `A2/Adjectives/SELF/Appearance/Descriptive_Traits.js` | Vocabulary | `internal` |
| `A2/Adjectives/SELF/Appearance/Descriptive_Traits.js` | Vocabulary | `manual` |
| `A2/Adjectives/SELF/Appearance/Descriptive_Traits.js` | Vocabulary | `odd` |
| `A2/Adjectives/SELF/Appearance/Descriptive_Traits.js` | Vocabulary | `outer` |
| `A2/Adjectives/SELF/Appearance/Descriptive_Traits.js` | Vocabulary | `severe` |
| ... | ... | *[1704 additional entries omitted for brevity]* |

### Language: `es`

- **COSYlanguages Local Files**: 18
- **COSYdata Master Surface Words**: 614
- **Unmigrated Vocabulary Terms**: 134
- **Unmigrated Idioms**: 0
- **Unmigrated Discussion Prompts**: 184

#### Sample Unmigrated Entries:

| Source Local File | Entry Category | Unmigrated Term / Prompt |
|---|---|---|
| `A2/fluency.js` | Discussion Prompt | `Una vacación que recuerdas` |
| `A2/fluency.js` | Discussion Prompt | `Tu restaurante o café favorito` |
| `A2/fluency.js` | Discussion Prompt | `Cómo vas al trabajo o a la escuela` |
| `A2/fluency.js` | Discussion Prompt | `Lo que haces para relajarte` |
| `A2/fluency.js` | Discussion Prompt | `Una película que viste hace poco` |
| `A2/fluency.js` | Discussion Prompt | `Tu fin de semana ideal` |
| `A2/fluency.js` | Discussion Prompt | `Una persona a la que admiras` |
| `A2/fluency.js` | Discussion Prompt | `El destino de vacaciones de tus sueños` |
| `A2/fluency.js` | Discussion Prompt | `Tu relación con tu teléfono` |
| `A2/fluency.js` | Discussion Prompt | `Algo divertido que te pasó` |
| `A2/fluency.js` | Discussion Prompt | `Tus aficiones` |
| `A2/fluency.js` | Discussion Prompt | `El clima donde vives` |
| `A2/fluency.js` | Discussion Prompt | `Un cumpleaños que recuerdas` |
| `A2/fluency.js` | Discussion Prompt | `Cosas que te gustan de donde vives` |
| `A2/fluency.js` | Discussion Prompt | `Un domingo típico` |
| `A2/fluency.js` | Discussion Prompt | `Comida de tu país` |
| `A2/fluency.js` | Discussion Prompt | `Algo que compraste hace poco` |
| `A2/fluency.js` | Discussion Prompt | `Tu aplicación favorita` |
| `A2/fluency.js` | Discussion Prompt | `Un recuerdo de la infancia` |
| `A2/fluency.js` | Discussion Prompt | `Lo que comiste ayer` |
| `A2/opinions.js` | Discussion Prompt | `Los fines de semana son demasiado cortos.` |
| `A2/opinions.js` | Discussion Prompt | `Es de mala educación llegar tarde.` |
| `A2/opinions.js` | Discussion Prompt | `La gente es más amable en los pueblos pequeños.` |
| `A2/opinions.js` | Discussion Prompt | `Tener una mascota te hace más feliz.` |
| `A2/opinions.js` | Discussion Prompt | `Se puede saber mucho de alguien por sus zapatos.` |
| `A2/opinions.js` | Discussion Prompt | `Está bien comer solo en un restaurante.` |
| `A2/opinions.js` | Discussion Prompt | `Aprender un idioma es más fácil cuando eres joven.` |
| `A2/opinions.js` | Discussion Prompt | `El transporte público es mejor que tener un coche.` |
| `A2/opinions.js` | Discussion Prompt | `Es difícil aburrirse cuando tienes un teléfono.` |
| `A2/opinions.js` | Discussion Prompt | `Cocinar en casa siempre es mejor que comer fuera.` |
| `A2/opinions.js` | Discussion Prompt | `Todo el mundo debería intentar vivir en el extranjero durante un año.` |
| `A2/opinions.js` | Discussion Prompt | `Los superhéroes son más interesantes que los héroes reales.` |
| `A2/opinions.js` | Discussion Prompt | `Es importante hacer la cama todas las mañanas.` |
| `A2/opinions.js` | Discussion Prompt | `Ir de compras es un pasatiempo.` |
| `A2/opinions.js` | Discussion Prompt | `Viajar solo es mejor que viajar con amigos.` |
| `B1/fluency.js` | Discussion Prompt | `Un lugar que sientes como tu hogar` |
| `B1/fluency.js` | Discussion Prompt | `Algo sobre lo que hayas cambiado de opinión` |
| `B1/fluency.js` | Discussion Prompt | `Qué hace a un buen amigo` |
| `B1/fluency.js` | Discussion Prompt | `Algo que desearías haber aprendido antes` |
| `B1/fluency.js` | Discussion Prompt | `Una habilidad que estés intentando mejorar` |
| `B1/fluency.js` | Discussion Prompt | `Lo que extrañas de ser niño` |
| `B1/fluency.js` | Discussion Prompt | `Tu día de trabajo ideal` |
| `B1/fluency.js` | Discussion Prompt | `Cómo ha cambiado tu vida en los últimos años` |
| `B1/fluency.js` | Discussion Prompt | `Qué te hace sentir más vivo` |
| `B1/fluency.js` | Discussion Prompt | `Tu mayor distracción` |
| `B1/fluency.js` | Discussion Prompt | `Un libro, película o serie que se haya quedado contigo` |
| `B1/fluency.js` | Discussion Prompt | `Qué significa el hogar para ti` |
| `B1/fluency.js` | Discussion Prompt | `Algo que haces diferente a la mayoría de la gente` |
| `B1/fluency.js` | Discussion Prompt | `Un hábito del que estés orgulloso` |
| `B1/fluency.js` | Discussion Prompt | `Un viaje que te sorprendió` |
| ... | ... | *[268 additional entries omitted for brevity]* |

### Language: `fr`

- **COSYlanguages Local Files**: 57
- **COSYdata Master Surface Words**: 2405
- **Unmigrated Vocabulary Terms**: 251
- **Unmigrated Idioms**: 643
- **Unmigrated Discussion Prompts**: 655

#### Sample Unmigrated Entries:

| Source Local File | Entry Category | Unmigrated Term / Prompt |
|---|---|---|
| `A2/debates.js` | Discussion Prompt | `Un salaire élevé vs un court trajet: qu'est-ce qui compte le plus dans un travail ?` |
| `A2/debates.js` | Discussion Prompt | `Changer souvent d'emploi vs rester dans la même entreprise: qu'est-ce qui est le mieux pour votre carrière ?` |
| `A2/debates.js` | Discussion Prompt | `Faire des heures supplémentaires vs partir à l'heure tous les jours: quelle est la meilleure habitude ?` |
| `A2/debates.js` | Discussion Prompt | `Un patron strict vs un patron détendu: pour qui est-il préférable de travailler ?` |
| `A2/debates.js` | Discussion Prompt | `Travailler dans une grande entreprise vs une petite entreprise: qu'est-ce qui est mieux ?` |
| `A2/debates.js` | Discussion Prompt | `Obtenir une promotion vs obtenir plus de temps libre: que choisiriez-vous ?` |
| `A2/debates.js` | Discussion Prompt | `Acheter une maison vs louer toute sa vie: quelle est la décision financière la plus intelligente ?` |
| `A2/debates.js` | Discussion Prompt | `Vivre en centre-ville vs vivre en banlieue: qu'est-ce qui est mieux ?` |
| `A2/debates.js` | Discussion Prompt | `Dépenser de l'argent pour des expériences vs pour des objets: qu'est-ce qui vous rend plus heureux ?` |
| `A2/debates.js` | Discussion Prompt | `Cuisiner tous les jours vs préparer les repas une fois par semaine: qu'est-ce qui est le plus pratique ?` |
| `A2/debates.js` | Discussion Prompt | `Avoir une femme de ménage vs faire son propre ménage: quel est le meilleur choix ?` |
| `A2/debates.js` | Discussion Prompt | `Vivre avec un partenaire vs vivre seul: qu'est-ce qui est mieux pour les adultes ?` |
| `A2/debates.js` | Discussion Prompt | `Avoir des enfants tôt vs avoir des enfants plus tard dans la vie: qu'est-ce qui est mieux ?` |
| `A2/debates.js` | Discussion Prompt | `Relations familiales étroites vs indépendance vis-à-vis de la famille: qu'est-ce qui est le plus important à l'âge adulte ?` |
| `A2/debates.js` | Discussion Prompt | `Rencontrer de nouvelles personnes vs garder d'anciennes amitiés: qu'est-ce qui a le plus de valeur ?` |
| `A2/debates.js` | Discussion Prompt | `Socialiser après le travail vs rentrer directement à la maison: qu'est-ce qui est mieux pour les relations de travail ?` |
| `A2/debates.js` | Discussion Prompt | `Aller à la salle de sport vs faire de l'exercice à l'extérieur: qu'est-ce qui est mieux pour les adultes ?` |
| `A2/debates.js` | Discussion Prompt | `Régime strict vs manger de tout avec modération: qu'est-ce qui est plus sain ?` |
| `A2/debates.js` | Discussion Prompt | `Voir un médecin tôt vs attendre de voir si on va mieux: qu'est-ce qui est le plus sage ?` |
| `A2/debates.js` | Discussion Prompt | `Dormir huit heures vs dormir six heures mais faire de l'exercice: qu'est-ce qui est mieux pour l'énergie ?` |
| `A2/debates.js` | Discussion Prompt | `Réduire le stress par le sport vs par la relaxation: qu'est-ce qui fonctionne le mieux ?` |
| `A2/debates.js` | Discussion Prompt | `Smartphones vs conversation en face à face: qu'utilisons-nous le plus, et est-ce un problème ?` |
| `A2/debates.js` | Discussion Prompt | `Banque en ligne vs aller à la banque: qu'est-ce qui est mieux ?` |
| `A2/debates.js` | Discussion Prompt | `Travailler avec du papier vs travailler numériquement: qu'est-ce qui est le plus efficace ?` |
| `A2/debates.js` | Discussion Prompt | `Réseaux sociaux pour le réseautage vs rencontrer les gens en personne: qu'est-ce qui est le plus utile professionnellement ?` |
| `A2/debates.js` | Discussion Prompt | `Voyage organisé vs voyage indépendant: qu'est-ce qui est mieux pour les adultes ?` |
| `A2/debates.js` | Discussion Prompt | `Séjour en ville vs vacances à la plage: quelle est la meilleure façon de se détendre ?` |
| `A2/debates.js` | Discussion Prompt | `Une seule longue vacance par an vs plusieurs courts séjours: qu'est-ce qui est mieux ?` |
| `A2/debates.js` | Discussion Prompt | `Voyager en couple vs voyager seul: qu'est-ce qui est le plus agréable ?` |
| `A2/debates.js` | Discussion Prompt | `Parler à son partenaire de chaque petit problème vs garder les choses pour soi: qu'est-ce qui est le plus sain ?` |
| `A2/debates.js` | Discussion Prompt | `Consulter son téléphone dès le matin vs attendre après le petit-déjeuner: quelle est la meilleure habitude ?` |
| `A2/debates.js` | Discussion Prompt | `Connaître le nom de ses voisins vs ne pas les connaître: quelle est l'expérience adulte la plus normale aujourd'hui ?` |
| `A2/debates.js` | Discussion Prompt | `Faire les courses avec une liste vs sans liste: quel type de personne a une meilleure vie ?` |
| `A2/debates.js` | Discussion Prompt | `Dire à son patron qu'on est malade vs aller travailler malade: quel est le choix le plus courageux ?` |
| `A2/debates.js` | Discussion Prompt | `Travailler à temps plein vs travailler à temps partiel: qu'est-ce qui est mieux ?` |
| `A2/debates.js` | Discussion Prompt | `Travailler dans un bureau vs travailler à domicile: que préférez-vous ?` |
| `A2/debates.js` | Discussion Prompt | `Un travail qu'on aime vs un travail bien payé: qu'est-ce qui est le plus important ?` |
| `A2/debates.js` | Discussion Prompt | `Travailler avec d'autres personnes vs travailler seul: qu'est-ce qui est mieux ?` |
| `A2/debates.js` | Discussion Prompt | `Un trajet court vs un trajet long: qu'est-ce qui est le plus acceptable ?` |
| `A2/debates.js` | Discussion Prompt | `Vivre seul vs vivre avec un partenaire: qu'est-ce qui est mieux ?` |
| `A2/debates.js` | Discussion Prompt | `Grande ville vs petite ville: quel est le meilleur endroit pour vivre en tant qu'adulte ?` |
| `A2/debates.js` | Discussion Prompt | `Cuisiner à la maison vs manger à l'extérieur: qu'est-ce qui est mieux pour la vie quotidienne ?` |
| `A2/debates.js` | Discussion Prompt | `Avoir des enfants vs ne pas avoir d'enfants: quelle vie est la meilleure ?` |
| `A2/debates.js` | Discussion Prompt | `Louer un appartement vs acheter une maison: qu'est-ce qui est mieux pour les jeunes adultes ?` |
| `A2/debates.js` | Discussion Prompt | `Faire de l'exercice tous les jours vs se reposer: qu'est-ce qui est mieux pour votre santé ?` |
| `A2/debates.js` | Discussion Prompt | `Aller chez le médecin vs attendre: qu'est-ce qui est mieux quand on se sent malade ?` |
| `A2/debates.js` | Discussion Prompt | `Dormir huit heures vs dormir moins: qu'est-ce qui est le plus réaliste pour les adultes ?` |
| `A2/debates.js` | Discussion Prompt | `Aller au travail à pied vs prendre la voiture: qu'est-ce qui est mieux pour votre santé ?` |
| `A2/debates.js` | Discussion Prompt | `Achats en ligne vs achats en magasin: que préférez-vous ?` |
| `A2/debates.js` | Discussion Prompt | `Économiser pour l'avenir vs profiter de l'argent maintenant: qu'est-ce qui est le plus sage ?` |
| ... | ... | *[1499 additional entries omitted for brevity]* |

### Language: `hy`

- **COSYlanguages Local Files**: 32
- **COSYdata Master Surface Words**: 495
- **Unmigrated Vocabulary Terms**: 322
- **Unmigrated Idioms**: 0
- **Unmigrated Discussion Prompts**: 115

#### Sample Unmigrated Entries:

| Source Local File | Entry Category | Unmigrated Term / Prompt |
|---|---|---|
| `A2/fluency.js` | Discussion Prompt | `Արձակուրդ, որը հիշում եք` |
| `A2/fluency.js` | Discussion Prompt | `Ձեր սիրելի ռեստորանը կամ սրճարանը` |
| `A2/fluency.js` | Discussion Prompt | `Ինչպես եք հասնում աշխատանքի կամ դպրոց` |
| `A2/fluency.js` | Discussion Prompt | `Ինչ եք անում հանգստանալու համար` |
| `A2/fluency.js` | Discussion Prompt | `Ֆիլմ, որը վերջերս եք դիտել` |
| `A2/fluency.js` | Discussion Prompt | `Ձեր իդեալական հանգստյան օրերը` |
| `A2/fluency.js` | Discussion Prompt | `Մի մարդ, ումով հիանում եք` |
| `A2/fluency.js` | Discussion Prompt | `Ձեր երազանքի արձակուրդի վայրը` |
| `A2/fluency.js` | Discussion Prompt | `Ձեր հարաբերությունները հեռախոսի հետ` |
| `A2/fluency.js` | Discussion Prompt | `Մի զվարճալի դեպք, որը պատահել է ձեզ հետ` |
| `A2/fluency.js` | Discussion Prompt | `Ձեր հոբբիները` |
| `A2/fluency.js` | Discussion Prompt | `Եղանակը ձեր բնակավայրում` |
| `A2/fluency.js` | Discussion Prompt | `Ծննդյան օր, որը հիշում եք` |
| `A2/fluency.js` | Discussion Prompt | `Բաներ, որոնք սիրում եք ձեր բնակավայրում` |
| `A2/fluency.js` | Discussion Prompt | `Տիպիկ կիրակի` |
| `A2/fluency.js` | Discussion Prompt | `Ուտեստներ ձեր երկրից` |
| `A2/fluency.js` | Discussion Prompt | `Ինչ-որ բան, որ վերջերս եք գնել` |
| `A2/fluency.js` | Discussion Prompt | `Ձեր սիրելի հավելվածը` |
| `A2/fluency.js` | Discussion Prompt | `Մանկության հիշողություն` |
| `A2/fluency.js` | Discussion Prompt | `Ինչ եք կերել երեկ` |
| `A2/opinions.js` | Discussion Prompt | `Հանգստյան օրերը շատ կարճ են:` |
| `A2/opinions.js` | Discussion Prompt | `Ուշանալը անքաղաքավարություն է:` |
| `A2/opinions.js` | Discussion Prompt | `Մարդիկ ավելի բարի են փոքր քաղաքներում:` |
| `A2/opinions.js` | Discussion Prompt | `Ընտանի կենդանի ունենալը ձեզ ավելի երջանիկ է դարձնում:` |
| `A2/opinions.js` | Discussion Prompt | `Կարելի է շատ բան իմանալ մարդու մասին նրա կոշիկներով:` |
| `A2/opinions.js` | Discussion Prompt | `Նորմալ է ռեստորանում միայնակ ուտելը:` |
| `A2/opinions.js` | Discussion Prompt | `Լեզու սովորելն ավելի հեշտ է, երբ երիտասարդ ես:` |
| `A2/opinions.js` | Discussion Prompt | `Հասարակական տրանսպորտը ավելի լավ է, քան մեքենա ունենալը:` |
| `A2/opinions.js` | Discussion Prompt | `Դժվար է ձանձրանալ, երբ հեռախոս ունես:` |
| `A2/opinions.js` | Discussion Prompt | `Տանը կերակուր պատրաստելը միշտ ավելի լավ է, քան դրսում ուտելը:` |
| `A2/opinions.js` | Discussion Prompt | `Բոլորը պետք է փորձեն մեկ տարի ապրել արտերկրում:` |
| `A2/opinions.js` | Discussion Prompt | `Սուպերհերոսները ավելի հետաքրքիր են, քան իրական հերոսները:` |
| `A2/opinions.js` | Discussion Prompt | `Կարևոր է ամեն առավոտ հավաքել անկողինը:` |
| `A2/opinions.js` | Discussion Prompt | `Գնումներ կատարելը հոբբի է:` |
| `A2/opinions.js` | Discussion Prompt | `Միայնակ ճամփորդելը ավելի լավ է, քան ընկերների հետ:` |
| `B1/fluency.js` | Discussion Prompt | `Մի վայր, որտեղ ձեզ զգում եք ինչպես տանը` |
| `B1/fluency.js` | Discussion Prompt | `Ինչ-որ բան, որի մասին փոխել եք ձեր կարծիքը` |
| `B1/fluency.js` | Discussion Prompt | `Ինչն է դարձնում ընկերոջը լավ ընկեր` |
| `B1/fluency.js` | Discussion Prompt | `Ինչ-որ բան, որ կցանկանայիք ավելի վաղ սովորած լինել` |
| `B1/fluency.js` | Discussion Prompt | `Հմտություն, որը փորձում եք կատարելագործել` |
| `B1/fluency.js` | Discussion Prompt | `Այն, ինչ կարոտում եք մանկությունից` |
| `B1/fluency.js` | Discussion Prompt | `Ձեր իդեալական աշխատանքային օրը` |
| `B1/fluency.js` | Discussion Prompt | `Ինչպես է ձեր կյանքը փոխվել վերջին մի քանի տարիների ընթացքում` |
| `B1/fluency.js` | Discussion Prompt | `Ինչն է ձեզ ստիպում զգալ առավել կենսունակ` |
| `B1/fluency.js` | Discussion Prompt | `Ձեր ամենամեծ շեղող գործոնը` |
| `B1/fluency.js` | Discussion Prompt | `Գիրք, ֆիլմ կամ սերիալ, որը տպավորվել է ձեր մեջ` |
| `B1/fluency.js` | Discussion Prompt | `Ինչ է նշանակում տունը ձեզ համար` |
| `B1/fluency.js` | Discussion Prompt | `Ինչ-որ բան, որ դուք անում եք այլ կերպ, քան մարդկանց մեծամասնությունը` |
| `B1/fluency.js` | Discussion Prompt | `Սովորություն, որով հպարտանում եք` |
| `B1/fluency.js` | Discussion Prompt | `Ճանապարհորդություն, որը զարմացրեց ձեզ` |
| ... | ... | *[387 additional entries omitted for brevity]* |

### Language: `it`

- **COSYlanguages Local Files**: 56
- **COSYdata Master Surface Words**: 2907
- **Unmigrated Vocabulary Terms**: 265
- **Unmigrated Idioms**: 632
- **Unmigrated Discussion Prompts**: 654

#### Sample Unmigrated Entries:

| Source Local File | Entry Category | Unmigrated Term / Prompt |
|---|---|---|
| `A2/debates.js` | Discussion Prompt | `Uno stipendio alto vs un breve tragitto giornaliero: cosa conta di più in un lavoro?` |
| `A2/debates.js` | Discussion Prompt | `Cambiare spesso lavoro vs restare nella stessa azienda: cosa è meglio per la tua carriera?` |
| `A2/debates.js` | Discussion Prompt | `Lavorare straordinari vs uscire in orario ogni giorno: qual è l'abitudine migliore?` |
| `A2/debates.js` | Discussion Prompt | `Un capo severo vs un capo rilassato: con chi è meglio lavorare?` |
| `A2/debates.js` | Discussion Prompt | `Lavorare in una grande azienda vs una piccola azienda: cosa è meglio?` |
| `A2/debates.js` | Discussion Prompt | `Ottenere una promozione vs avere più tempo libero: cosa sceglieresti?` |
| `A2/debates.js` | Discussion Prompt | `Comprare casa vs affittare a vita: qual è la decisione finanziaria più intelligente?` |
| `A2/debates.js` | Discussion Prompt | `Vivere in centro città vs vivere in periferia: cosa è meglio?` |
| `A2/debates.js` | Discussion Prompt | `Spendere soldi per esperienze vs per oggetti: cosa ti rende più felice?` |
| `A2/debates.js` | Discussion Prompt | `Cucinare ogni giorno vs preparare i pasti una volta a settimana: cosa è più pratico?` |
| `A2/debates.js` | Discussion Prompt | `Avere una persona per le pulizie vs fare le pulizie da soli: qual è la scelta migliore?` |
| `A2/debates.js` | Discussion Prompt | `Vivere con un partner vs vivere da soli: cosa è meglio per gli adulti?` |
| `A2/debates.js` | Discussion Prompt | `Avere figli presto vs avere figli più tardi nella vita: cosa è meglio?` |
| `A2/debates.js` | Discussion Prompt | `Legami familiari stretti vs indipendenza dalla famiglia: cosa è più importante da adulti?` |
| `A2/debates.js` | Discussion Prompt | `Incontrare nuove persone vs mantenere le vecchie amicizie: cosa ha più valore?` |
| `A2/debates.js` | Discussion Prompt | `Socializzare dopo il lavoro vs tornare direttamente a casa: cosa è meglio per le relazioni lavorative?` |
| `A2/debates.js` | Discussion Prompt | `Andare in palestra vs fare esercizio all'aperto: cosa è meglio per gli adulti?` |
| `A2/debates.js` | Discussion Prompt | `Dieta ferrea vs mangiare tutto con moderazione: cosa è più sano?` |
| `A2/debates.js` | Discussion Prompt | `Vedere il medico subito vs aspettare per vedere se si migliora: cosa è più saggio?` |
| `A2/debates.js` | Discussion Prompt | `Dormire otto ore vs dormire sei ore ma fare esercizio: cosa è meglio per l'energia?` |
| `A2/debates.js` | Discussion Prompt | `Ridurre lo stress attraverso lo sport vs attraverso il relax: cosa funziona meglio?` |
| `A2/debates.js` | Discussion Prompt | `Smartphone vs conversazione faccia a faccia: cosa usiamo di più, ed è un problema?` |
| `A2/debates.js` | Discussion Prompt | `Banking online vs andare in banca: cosa è meglio?` |
| `A2/debates.js` | Discussion Prompt | `Lavorare con la carta vs lavorare digitalmente: cosa è più efficiente?` |
| `A2/debates.js` | Discussion Prompt | `Social media per il networking vs incontrare persone di persona: cosa è più utile professionalmente?` |
| `A2/debates.js` | Discussion Prompt | `Viaggio organizzato vs viaggio indipendente: cosa è meglio per gli adulti?` |
| `A2/debates.js` | Discussion Prompt | `Soggiorno in città vs vacanza al mare: qual è il modo migliore per rilassarsi?` |
| `A2/debates.js` | Discussion Prompt | `Una vacanza lunga all'anno vs diversi brevi soggiorni: cosa è meglio?` |
| `A2/debates.js` | Discussion Prompt | `Viaggiare in coppia vs viaggiare da soli: cosa è più piacevole?` |
| `A2/debates.js` | Discussion Prompt | `Raccontare ogni piccolo problema al partner vs tenere le cose per sé: cosa è più sano?` |
| `A2/debates.js` | Discussion Prompt | `Controllare il telefono appena svegli vs aspettare dopo colazione: quale è un'abitudine migliore?` |
| `A2/debates.js` | Discussion Prompt | `Conoscere il nome dei vicini vs non conoscerli: qual è l'esperienza adulta più normale oggi?` |
| `A2/debates.js` | Discussion Prompt | `Fare la spesa con una lista vs senza lista: quale tipo di persona vive meglio?` |
| `A2/debates.js` | Discussion Prompt | `Dire al capo che sei malato vs andare al lavoro malato: quale è la scelta più coraggiosa?` |
| `A2/debates.js` | Discussion Prompt | `Lavorare a tempo pieno vs lavorare a tempo parziale: cosa è meglio?` |
| `A2/debates.js` | Discussion Prompt | `Lavorare in ufficio vs lavorare da casa: cosa è meglio?` |
| `A2/debates.js` | Discussion Prompt | `Un lavoro che ami vs un lavoro che paga bene: cosa è più importante?` |
| `A2/debates.js` | Discussion Prompt | `Lavorare con altre persone vs lavorare da soli: cosa è meglio?` |
| `A2/debates.js` | Discussion Prompt | `Un tragitto breve vs un tragitto lungo: cosa è più accettabile?` |
| `A2/debates.js` | Discussion Prompt | `Vivere da soli vs vivere con un partner: cosa è meglio?` |
| `A2/debates.js` | Discussion Prompt | `Grande città vs piccola città: qual è il posto migliore dove vivere da adulti?` |
| `A2/debates.js` | Discussion Prompt | `Cucinare a casa vs mangiare fuori: cosa è meglio per la vita quotidiana?` |
| `A2/debates.js` | Discussion Prompt | `Avere figli vs non avere figli: quale vita è migliore?` |
| `A2/debates.js` | Discussion Prompt | `Affittare un appartamento vs comprare una casa: cosa è meglio per i giovani adulti?` |
| `A2/debates.js` | Discussion Prompt | `Esercizio ogni giorno vs riposo: cosa è meglio per la tua salute?` |
| `A2/debates.js` | Discussion Prompt | `Andare dal medico vs aspettare: cosa è meglio quando ti senti male?` |
| `A2/debates.js` | Discussion Prompt | `Dormire otto ore vs dormire meno: cosa è più realistico per gli adulti?` |
| `A2/debates.js` | Discussion Prompt | `Andare al lavoro a piedi vs prendere l'auto: cosa è meglio per la tua salute?` |
| `A2/debates.js` | Discussion Prompt | `Acquisti online vs acquisti in un negozio: cosa è meglio?` |
| `A2/debates.js` | Discussion Prompt | `Risparmiare per il futuro vs godersi i soldi ora: cosa è più saggio?` |
| ... | ... | *[1501 additional entries omitted for brevity]* |

### Language: `ka`

- **COSYlanguages Local Files**: 32
- **COSYdata Master Surface Words**: 494
- **Unmigrated Vocabulary Terms**: 326
- **Unmigrated Idioms**: 0
- **Unmigrated Discussion Prompts**: 115

#### Sample Unmigrated Entries:

| Source Local File | Entry Category | Unmigrated Term / Prompt |
|---|---|---|
| `A2/fluency.js` | Discussion Prompt | `არდადეგები, რომლებიც გახსოვთ` |
| `A2/fluency.js` | Discussion Prompt | `თქვენი საყვარელი რესტორანი ან კაფე` |
| `A2/fluency.js` | Discussion Prompt | `როგორ მიდიხართ სამსახურში ან სკოლაში` |
| `A2/fluency.js` | Discussion Prompt | `რას აკეთებთ დასასვენებლად` |
| `A2/fluency.js` | Discussion Prompt | `ფილმი, რომელიც ახლახან ნახეთ` |
| `A2/fluency.js` | Discussion Prompt | `თქვენი იდეალური შაბათ-კვირა` |
| `A2/fluency.js` | Discussion Prompt | `ადამიანი, რომლითაც აღფრთოვანებული ხართ` |
| `A2/fluency.js` | Discussion Prompt | `თქვენი საოცნებო დასასვენებელი ადგილი` |
| `A2/fluency.js` | Discussion Prompt | `თქვენი დამოკიდებულება ტელეფონთან` |
| `A2/fluency.js` | Discussion Prompt | `რაღაც სასაცილო, რაც გადაგხდათ` |
| `A2/fluency.js` | Discussion Prompt | `თქვენი ჰობი` |
| `A2/fluency.js` | Discussion Prompt | `ამინდი იქ, სად ცხოვრობთ` |
| `A2/fluency.js` | Discussion Prompt | `დაბადების დღე, რომელიც გახსოვთ` |
| `A2/fluency.js` | Discussion Prompt | `რაც გიყვართ იქ, სად ცხოვრობთ` |
| `A2/fluency.js` | Discussion Prompt | `ტიპური კვირა დღე` |
| `A2/fluency.js` | Discussion Prompt | `საჭმელი თქვენი ქვეყნიდან` |
| `A2/fluency.js` | Discussion Prompt | `რაღაც, რაც ახლახან იყიდეთ` |
| `A2/fluency.js` | Discussion Prompt | `თქვენი საყვარელი აპლიკაცია` |
| `A2/fluency.js` | Discussion Prompt | `ბავშვობის მოგონება` |
| `A2/fluency.js` | Discussion Prompt | `რა ჭამეთ გუშინ` |
| `A2/opinions.js` | Discussion Prompt | `შაბათ-კვირა ძალიან მოკლეა.` |
| `A2/opinions.js` | Discussion Prompt | `დაგვიანება უზრდელობაა.` |
| `A2/opinions.js` | Discussion Prompt | `პატარა ქალაქებში ხალხი უფრო კეთილია.` |
| `A2/opinions.js` | Discussion Prompt | `შინაური ცხოველის ყოლა უფრო ბედნიერს გხდის.` |
| `A2/opinions.js` | Discussion Prompt | `ფეხსაცმლით ადამიანზე ბევრის თქმა შეიძლება.` |
| `A2/opinions.js` | Discussion Prompt | `რესტორანში მარტო ჭამა ნორმალურია.` |
| `A2/opinions.js` | Discussion Prompt | `ენის სწავლა უფრო ადვილია, როცა ახალგაზრდა ხარ.` |
| `A2/opinions.js` | Discussion Prompt | `საზოგადოებრივი ტრანსპორტი ჯობია საკუთარი ავტომობილის ყოლას.` |
| `A2/opinions.js` | Discussion Prompt | `ტელეფონით რთულია მოწყენილი იყო.` |
| `A2/opinions.js` | Discussion Prompt | `სახლში მომზადება ყოველთვის ჯობია გარეთ ჭამას.` |
| `A2/opinions.js` | Discussion Prompt | `ყველამ უნდა სცადოს საზღვარგარეთ ცხოვრება ერთი წლის განმავლობაში.` |
| `A2/opinions.js` | Discussion Prompt | `სუპერგმირები უფრო საინტერესოები არიან, ვიდრე ნამდვილი გმირები.` |
| `A2/opinions.js` | Discussion Prompt | `მნიშვნელოვანია ყოველ დილით საწოლის გასწორება.` |
| `A2/opinions.js` | Discussion Prompt | `შოპინგი ჰობია.` |
| `A2/opinions.js` | Discussion Prompt | `მარტო მოგზაურობა ჯობია მეგობრებთან ერთად მოგზაურობას.` |
| `B1/fluency.js` | Discussion Prompt | `ადგილი, სადაც თავს ისე გრძნობთ, როგორც სახლში` |
| `B1/fluency.js` | Discussion Prompt | `რაღაც, რაზეც აზრი შეიცვალეთ` |
| `B1/fluency.js` | Discussion Prompt | `რა ხდის ადამიანს კარგ მეგობრად` |
| `B1/fluency.js` | Discussion Prompt | `რაღაც, რისი სწავლაც ადრე გინდოდათ` |
| `B1/fluency.js` | Discussion Prompt | `უნარი, რომლის გაუმჯობესებასაც ცდილობთ` |
| `B1/fluency.js` | Discussion Prompt | `რა გენატრებათ ბავშვობიდან` |
| `B1/fluency.js` | Discussion Prompt | `თქვენი იდეალური სამუშაო დღე` |
| `B1/fluency.js` | Discussion Prompt | `როგორ შეიცვალა თქვენი ცხოვრება ბოლო რამდენიმე წლის განმავლობაში` |
| `B1/fluency.js` | Discussion Prompt | `რა გაგრძნობინებთ თავს ყველაზე მეტად ცოცხლად` |
| `B1/fluency.js` | Discussion Prompt | `თქვენი ყველაზე დიდი ხელისშემშლელი ფაქტორი` |
| `B1/fluency.js` | Discussion Prompt | `წიგნი, ფილმი ან სერიალი, რომელიც დაგამახსოვრდათ` |
| `B1/fluency.js` | Discussion Prompt | `რას ნიშნავს თქვენთვის სახლი` |
| `B1/fluency.js` | Discussion Prompt | `რაღაც, რასაც სხვებისგან განსხვავებულად აკეთებთ` |
| `B1/fluency.js` | Discussion Prompt | `ჩვევა, რომლითაც ამაყობთ` |
| `B1/fluency.js` | Discussion Prompt | `მოგზაურობა, რომელმაც გაგაოცათ` |
| ... | ... | *[391 additional entries omitted for brevity]* |

### Language: `pt`

- **COSYlanguages Local Files**: 18
- **COSYdata Master Surface Words**: 609
- **Unmigrated Vocabulary Terms**: 181
- **Unmigrated Idioms**: 0
- **Unmigrated Discussion Prompts**: 184

#### Sample Unmigrated Entries:

| Source Local File | Entry Category | Unmigrated Term / Prompt |
|---|---|---|
| `A2/fluency.js` | Discussion Prompt | `Umas férias de que você se lembra` |
| `A2/fluency.js` | Discussion Prompt | `Seu restaurante ou café favorito` |
| `A2/fluency.js` | Discussion Prompt | `Como você vai para o trabalho ou escola` |
| `A2/fluency.js` | Discussion Prompt | `O que você faz para relaxar` |
| `A2/fluency.js` | Discussion Prompt | `Um filme que você assistiu recentemente` |
| `A2/fluency.js` | Discussion Prompt | `Seu fim de semana ideal` |
| `A2/fluency.js` | Discussion Prompt | `Uma pessoa que você admira` |
| `A2/fluency.js` | Discussion Prompt | `O destino das suas férias dos sonhos` |
| `A2/fluency.js` | Discussion Prompt | `Sua relação com seu telefone` |
| `A2/fluency.js` | Discussion Prompt | `Algo engraçado que aconteceu com você` |
| `A2/fluency.js` | Discussion Prompt | `Seus hobbies` |
| `A2/fluency.js` | Discussion Prompt | `O tempo onde você mora` |
| `A2/fluency.js` | Discussion Prompt | `Um aniversário de que você se lembra` |
| `A2/fluency.js` | Discussion Prompt | `Coisas que você ama onde mora` |
| `A2/fluency.js` | Discussion Prompt | `Um domingo típico` |
| `A2/fluency.js` | Discussion Prompt | `Comida do seu país` |
| `A2/fluency.js` | Discussion Prompt | `Algo que você comprou recentemente` |
| `A2/fluency.js` | Discussion Prompt | `Seu aplicativo favorito` |
| `A2/fluency.js` | Discussion Prompt | `Uma lembrança de infância` |
| `A2/fluency.js` | Discussion Prompt | `O que você comeu ontem` |
| `A2/opinions.js` | Discussion Prompt | `Os fins de semana são demasiado curtos.` |
| `A2/opinions.js` | Discussion Prompt | `É falta de educação chegar atrasado.` |
| `A2/opinions.js` | Discussion Prompt | `As pessoas são mais simpáticas nas cidades pequenas.` |
| `A2/opinions.js` | Discussion Prompt | `Ter um animal de estimação torna-o mais feliz.` |
| `A2/opinions.js` | Discussion Prompt | `Pode-se dizer muito sobre alguém pelos seus sapatos.` |
| `A2/opinions.js` | Discussion Prompt | `Não há problema em comer sozinho num restaurante.` |
| `A2/opinions.js` | Discussion Prompt | `Aprender uma língua é mais fácil quando se é jovem.` |
| `A2/opinions.js` | Discussion Prompt | `O transporte público é melhor do que ter um carro.` |
| `A2/opinions.js` | Discussion Prompt | `É difícil ficar entediado quando se tem um telemóvel.` |
| `A2/opinions.js` | Discussion Prompt | `Cozinhar em casa é sempre melhor do que comer fora.` |
| `A2/opinions.js` | Discussion Prompt | `Todos deveriam tentar viver no estrangeiro durante um ano.` |
| `A2/opinions.js` | Discussion Prompt | `Os super-heróis são mais interessantes do que os heróis reais.` |
| `A2/opinions.js` | Discussion Prompt | `É importante fazer a cama todas as manhãs.` |
| `A2/opinions.js` | Discussion Prompt | `Fazer compras é um passatempo.` |
| `A2/opinions.js` | Discussion Prompt | `Viajar sozinho é melhor do que viajar com amigos.` |
| `B1/fluency.js` | Discussion Prompt | `Um lugar que você sente como seu lar` |
| `B1/fluency.js` | Discussion Prompt | `Algo sobre o qual você mudou de ideia` |
| `B1/fluency.js` | Discussion Prompt | `O que faz de alguém um bom amigo` |
| `B1/fluency.js` | Discussion Prompt | `Algo que você gostaria de ter aprendido antes` |
| `B1/fluency.js` | Discussion Prompt | `Uma habilidade que você está tentando melhorar` |
| `B1/fluency.js` | Discussion Prompt | `O que você sente falta de ser criança` |
| `B1/fluency.js` | Discussion Prompt | `Seu dia de trabalho ideal` |
| `B1/fluency.js` | Discussion Prompt | `Como sua vida mudou nos últimos anos` |
| `B1/fluency.js` | Discussion Prompt | `O que faz você se sentir mais vivo` |
| `B1/fluency.js` | Discussion Prompt | `Sua maior distração` |
| `B1/fluency.js` | Discussion Prompt | `Um livro, filme ou série que marcou você` |
| `B1/fluency.js` | Discussion Prompt | `O que o lar significa para você` |
| `B1/fluency.js` | Discussion Prompt | `Algo que você faz de forma diferente da maioria das pessoas` |
| `B1/fluency.js` | Discussion Prompt | `Um hábito do qual você se orgulha` |
| `B1/fluency.js` | Discussion Prompt | `Uma viagem que surpreendeu você` |
| ... | ... | *[315 additional entries omitted for brevity]* |

### Language: `ru`

- **COSYlanguages Local Files**: 56
- **COSYdata Master Surface Words**: 2149
- **Unmigrated Vocabulary Terms**: 315
- **Unmigrated Idioms**: 631
- **Unmigrated Discussion Prompts**: 655

#### Sample Unmigrated Entries:

| Source Local File | Entry Category | Unmigrated Term / Prompt |
|---|---|---|
| `A2/debates.js` | Discussion Prompt | `Высокая зарплата или короткий путь до работы: что важнее?` |
| `A2/debates.js` | Discussion Prompt | `Частая смена работы или преданность одной компании: что лучше для карьеры?` |
| `A2/debates.js` | Discussion Prompt | `Работа сверхурочно или уход вовремя каждый день: какая привычка лучше?` |
| `A2/debates.js` | Discussion Prompt | `Строгий босс или мягкий босс: с кем лучше работать?` |
| `A2/debates.js` | Discussion Prompt | `Работа в большой компании или в маленькой: что лучше?` |
| `A2/debates.js` | Discussion Prompt | `Получить повышение или получить больше свободного времени: что бы вы выбрали?` |
| `A2/debates.js` | Discussion Prompt | `Покупка дома или аренда на всю жизнь: какое финансовое решение умнее?` |
| `A2/debates.js` | Discussion Prompt | `Жизнь в центре города или в пригороде: что лучше?` |
| `A2/debates.js` | Discussion Prompt | `Тратить деньги на впечатления или на вещи: что делает вас счастливее?` |
| `A2/debates.js` | Discussion Prompt | `Готовить каждый день или готовить на неделю вперед: что практичнее?` |
| `A2/debates.js` | Discussion Prompt | `Нанять клинера или делать уборку самому: какой выбор лучше?` |
| `A2/debates.js` | Discussion Prompt | `Жить с партнером или жить одному: что лучше для взрослых людей?` |
| `A2/debates.js` | Discussion Prompt | `Рожать детей рано или позже в жизни: что лучше?` |
| `A2/debates.js` | Discussion Prompt | `Близкие отношения с семьей или независимость от нее: что важнее во взрослом возрасте?` |
| `A2/debates.js` | Discussion Prompt | `Знакомство с новыми людьми или сохранение старых друзей: что ценнее?` |
| `A2/debates.js` | Discussion Prompt | `Общение с коллегами после работы или поход прямо домой: что лучше для рабочих отношений?` |
| `A2/debates.js` | Discussion Prompt | `Ходить в спортзал или тренироваться на улице: что лучше для взрослых?` |
| `A2/debates.js` | Discussion Prompt | `Строгая диета или умеренность во всем: что здоровее?` |
| `A2/debates.js` | Discussion Prompt | `Идти к врачу сразу или ждать, пока само пройдет: что мудрее?` |
| `A2/debates.js` | Discussion Prompt | `Спать по восемь часов или шесть, но заниматься спортом: что лучше для энергии?` |
| `A2/debates.js` | Discussion Prompt | `Снимать стресс спортом или релаксацией: что работает лучше?` |
| `A2/debates.js` | Discussion Prompt | `Смартфоны или живое общение: чем мы пользуемся больше, и проблема ли это?` |
| `A2/debates.js` | Discussion Prompt | `Онлайн-банкинг или поход в банк: что лучше?` |
| `A2/debates.js` | Discussion Prompt | `Работа с бумагой или работа в цифровом виде: что эффективнее?` |
| `A2/debates.js` | Discussion Prompt | `Соцсети для нетворкинга или личные встречи: что полезнее для карьеры?` |
| `A2/debates.js` | Discussion Prompt | `Пакетный тур или самостоятельное путешествие: что лучше для взрослых?` |
| `A2/debates.js` | Discussion Prompt | `Поездка в город или отдых на пляже: как лучше расслабиться?` |
| `A2/debates.js` | Discussion Prompt | `Один длинный отпуск в году или несколько коротких: что лучше?` |
| `A2/debates.js` | Discussion Prompt | `Путешествие парой или в одиночку: что приносит больше удовольствия?` |
| `A2/debates.js` | Discussion Prompt | `Рассказывать партнеру о каждой мелочи или держать все в себе: что здоровее?` |
| `A2/debates.js` | Discussion Prompt | `Проверять телефон первым делом утром или после завтрака: какая привычка лучше?` |
| `A2/debates.js` | Discussion Prompt | `Знать имена соседей или не знать их: что сейчас считается нормой для взрослого?` |
| `A2/debates.js` | Discussion Prompt | `Поход за продуктами со списком или без него: у кого жизнь лучше?` |
| `A2/debates.js` | Discussion Prompt | `Сказать боссу, что заболел, или идти на работу больным: какой выбор смелее?` |
| `A2/debates.js` | Discussion Prompt | `Полный рабочий день или частичная занятость: что лучше?` |
| `A2/debates.js` | Discussion Prompt | `Работа в офисе или работа из дома: что лучше?` |
| `A2/debates.js` | Discussion Prompt | `Работа, которую вы любите, или работа, которая хорошо оплачивается: что важнее?` |
| `A2/debates.js` | Discussion Prompt | `Работа с другими людьми или работа в одиночку: что лучше?` |
| `A2/debates.js` | Discussion Prompt | `Короткий путь на работу или длинный: что более приемлемо?` |
| `A2/debates.js` | Discussion Prompt | `Жить одному или жить с партнером: что лучше?` |
| `A2/debates.js` | Discussion Prompt | `Большой город или маленький городок: где лучше жить взрослому человеку?` |
| `A2/debates.js` | Discussion Prompt | `Готовить дома или есть вне дома: что лучше для повседневной жизни?` |
| `A2/debates.js` | Discussion Prompt | `Иметь детей или не иметь: какая жизнь лучше?` |
| `A2/debates.js` | Discussion Prompt | `Снимать квартиру или покупать дом: что лучше для молодых людей?` |
| `A2/debates.js` | Discussion Prompt | `Физкультура каждый день или отдых: что лучше для здоровья?` |
| `A2/debates.js` | Discussion Prompt | `Идти к врачу или ждать: что лучше, когда вы чувствуете себя больным?` |
| `A2/debates.js` | Discussion Prompt | `Спать по восемь часов или меньше: что более реально для взрослых?` |
| `A2/debates.js` | Discussion Prompt | `Ходить на работу пешком или ездить на машине: что лучше для здоровья?` |
| `A2/debates.js` | Discussion Prompt | `Онлайн-покупки или покупки в магазине: что лучше?` |
| `A2/debates.js` | Discussion Prompt | `Копить на будущее или наслаждаться деньгами сейчас: что мудрее?` |
| ... | ... | *[1551 additional entries omitted for brevity]* |

### Language: `tt`

- **COSYlanguages Local Files**: 32
- **COSYdata Master Surface Words**: 489
- **Unmigrated Vocabulary Terms**: 321
- **Unmigrated Idioms**: 0
- **Unmigrated Discussion Prompts**: 115

#### Sample Unmigrated Entries:

| Source Local File | Entry Category | Unmigrated Term / Prompt |
|---|---|---|
| `A2/fluency.js` | Discussion Prompt | `Сез хәтерләгән яллар` |
| `A2/fluency.js` | Discussion Prompt | `Сезнең яраткан рестораныгыз яисә кафегыз` |
| `A2/fluency.js` | Discussion Prompt | `Сез эшкә яисә укырга ничек барасыз` |
| `A2/fluency.js` | Discussion Prompt | `Ял итү өчен нәрсә эшлисез` |
| `A2/fluency.js` | Discussion Prompt | `Күптән түгел караган фильм` |
| `A2/fluency.js` | Discussion Prompt | `Сезнең идеаль ял көннәрегез` |
| `A2/fluency.js` | Discussion Prompt | `Сез сокланган кеше` |
| `A2/fluency.js` | Discussion Prompt | `Сезнең хыялдагы сәяхәт урыныгыз` |
| `A2/fluency.js` | Discussion Prompt | `Сезнең телефон белән мөнәсәбәтегез` |
| `A2/fluency.js` | Discussion Prompt | `Сезнең белән булган кызыклы хәл` |
| `A2/fluency.js` | Discussion Prompt | `Сезнең хоббиларыгыз` |
| `A2/fluency.js` | Discussion Prompt | `Сез яшәгән урындагы һава торышы` |
| `A2/fluency.js` | Discussion Prompt | `Сез хәтерләгән туган көн` |
| `A2/fluency.js` | Discussion Prompt | `Яшәгән урыныгызда сез яраткан әйберләр` |
| `A2/fluency.js` | Discussion Prompt | `Гадәти якшәмбе` |
| `A2/fluency.js` | Discussion Prompt | `Илегезнең ризыклары` |
| `A2/fluency.js` | Discussion Prompt | `Күптән түгел сатып алынган әйбер` |
| `A2/fluency.js` | Discussion Prompt | `Сезнең яраткан кушымтагыз` |
| `A2/fluency.js` | Discussion Prompt | `Балачак истәлеге` |
| `A2/fluency.js` | Discussion Prompt | `Кичә нәрсә ашадыгыз` |
| `A2/opinions.js` | Discussion Prompt | `Ял көннәре бик кыска.` |
| `A2/opinions.js` | Discussion Prompt | `Соңга калу — әдәпсезлек.` |
| `A2/opinions.js` | Discussion Prompt | `Кечкенә шәһәрләрдә кешеләр мәхәббәтле.` |
| `A2/opinions.js` | Discussion Prompt | `Йорт хайваны булу сезне бәхетле итә.` |
| `A2/opinions.js` | Discussion Prompt | `Аяк киеме буенча кеше турында күп нәрсә әйтеп була.` |
| `A2/opinions.js` | Discussion Prompt | `Ресторанда берүзең ашау — нормаль.` |
| `A2/opinions.js` | Discussion Prompt | `Яшь чакта тел өйрәнү җиңелрәк.` |
| `A2/opinions.js` | Discussion Prompt | `Җәмәгать транспорты автомобильгә караганда яхшырак.` |
| `A2/opinions.js` | Discussion Prompt | `Телефон булганда күңелсезләнү кыен.` |
| `A2/opinions.js` | Discussion Prompt | `Өйдә ашарга пешерү һәрвакыт тышта ашаудан яхшырак.` |
| `A2/opinions.js` | Discussion Prompt | `Һәркем бер ел чит илдә яшәп карарга тиеш.` |
| `A2/opinions.js` | Discussion Prompt | `Супергеройлар реаль геройларга караганда кызыклырак.` |
| `A2/opinions.js` | Discussion Prompt | `Һәр иртә урын-җирне җыеп кую мөһим.` |
| `A2/opinions.js` | Discussion Prompt | `Шопинг — бу хобби.` |
| `A2/opinions.js` | Discussion Prompt | `Берүзең сәяхәт итү дуслар белән сәяхәт итүдән яхшырак.` |
| `B1/fluency.js` | Discussion Prompt | `Үзеңне өйдәгечә хис иткән урын` |
| `B1/fluency.js` | Discussion Prompt | `Сез фикерегезне үзгәрткән нәрсә` |
| `B1/fluency.js` | Discussion Prompt | `Яхшы дус нинди булырга тиеш` |
| `B1/fluency.js` | Discussion Prompt | `Сез иртәрәк өйрәнергә теләгән нәрсә` |
| `B1/fluency.js` | Discussion Prompt | `Сез яхшыртырга тырышкан күнекмә` |
| `B1/fluency.js` | Discussion Prompt | `Балачактан сезгә җитмәгән нәрсә` |
| `B1/fluency.js` | Discussion Prompt | `Сезнең идеаль эш көнегез` |
| `B1/fluency.js` | Discussion Prompt | `Тормышыгыз соңгы берничә елда ничек үзгәрде` |
| `B1/fluency.js` | Discussion Prompt | `Сезне үзегезне иң җанлы хис иттергән нәрсә` |
| `B1/fluency.js` | Discussion Prompt | `Сезне иң нык игътибарны читкә юнәлтүче нәрсә` |
| `B1/fluency.js` | Discussion Prompt | `Хәтердә калган китап, фильм яки сериал` |
| `B1/fluency.js` | Discussion Prompt | `Сезнең өчен өй нәрсә аңлата` |
| `B1/fluency.js` | Discussion Prompt | `Сез күпчелек кешедән аерылып эшли торган нәрсә` |
| `B1/fluency.js` | Discussion Prompt | `Сез горурлана торган гадәт` |
| `B1/fluency.js` | Discussion Prompt | `Сезне гаҗәпләндергән сәяхәт` |
| ... | ... | *[386 additional entries omitted for brevity]* |
