# COSYdata vs COSYlanguages A1 Vocabulary Migration Gap & Functional Phrases Parity Audit

This report presents a comprehensive per-language audit comparing A1 level vocabulary and functional phrases between **COSYlanguages** (legacy UI repo) and **COSYdata** (canonical data repository).

- **COSYlanguages Source Directory:** `vocabulary/<lang>/A1/**/*.js` (parsed from IIFE arrays)
- **COSYdata Target Directory:** `vocabulary/<lang>/a0_a1/*.json`
- **Functional Phrases Source/Target:** `COSYdata/functional-phrases/en` vs COSYlanguages `communication/`, `practice/types/`, and `vocabulary/en/A1/`

---

## Executive Summary Table

| Language | Code | COSYlanguages A1 Words | COSYdata A0/A1 Words | Exact Overlap | Candidates to Migrate (Only in COSYlanguages) | Kept / Extra in COSYdata | Likely Near-Duplicates | Classification |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| BA | `ba` | 379 | 377 | 377 | 2 | 0 | 0 | (b) Incomplete Migration |
| BR | `br` | 397 | 398 | 394 | 3 | 4 | 1 | (a) Curated Subset by Design (COSYdata Expanded) |
| CV | `cv` | 449 | 445 | 445 | 4 | 0 | 0 | (b) Incomplete Migration |
| DE | `de` | 479 | 494 | 468 | 11 | 26 | 0 | (a) Curated Subset by Design (COSYdata Expanded) |
| EL | `el` | 301 | 670 | 283 | 18 | 387 | 1 | (a) Curated Subset by Design (COSYdata Expanded) |
| EN | `en` | 1298 | 1601 | 1274 | 24 | 327 | 4 | SuperSet / Complete Migration (Already Exceeds) |
| ES | `es` | 391 | 482 | 391 | 0 | 91 | 0 | (a) Curated Subset by Design (COSYdata Expanded) |
| FR | `fr` | 1033 | 964 | 822 | 211 | 142 | 6 | (b) Incomplete Migration |
| HY | `hy` | 391 | 391 | 391 | 0 | 0 | 0 | (a) Curated Subset by Design |
| IT | `it` | 1154 | 988 | 876 | 278 | 112 | 3 | (b) Incomplete Migration |
| KA | `ka` | 387 | 387 | 387 | 0 | 0 | 0 | (a) Curated Subset by Design |
| PT | `pt` | 393 | 476 | 383 | 10 | 93 | 0 | (a) Curated Subset by Design (COSYdata Expanded) |
| RU | `ru` | 465 | 792 | 380 | 85 | 412 | 0 | (a) Curated Subset by Design (COSYdata Expanded) |
| TT | `tt` | 377 | 377 | 377 | 0 | 0 | 0 | (a) Curated Subset by Design |

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
- **COSYdata A0/A1 Word Count:** 377
- **Exact Overlap Count:** 377
- **Candidates to Migrate (Only in COSYlanguages):** 2 words
- **COSYdata Unique Words (To Keep):** 0 words
- **Likely Near-Duplicates:** 0 pairs
- **Migration Classification:** **(b) Incomplete Migration**
- **Rationale:** COSYdata contains 377 words vs 379 in COSYlanguages. While substantial core vocabulary was migrated (377 exact overlap), significant vocabulary (2 words) remains in COSYlanguages awaiting intake.

<details>
<summary><strong>Full "Only in COSYlanguages" Word List (2 words)</strong></summary>

```
бүген, ҡыҙыл э싩
```

</details>

---

### BR (`br`)

- **COSYlanguages A1 Word Count:** 397
- **COSYdata A0/A1 Word Count:** 398
- **Exact Overlap Count:** 394
- **Candidates to Migrate (Only in COSYlanguages):** 3 words
- **COSYdata Unique Words (To Keep):** 4 words
- **Likely Near-Duplicates:** 1 pairs
- **Migration Classification:** **(a) Curated Subset by Design (COSYdata Expanded)**
- **Rationale:** COSYdata has 398 words vs 397 in COSYlanguages. COSYdata was expanded with additional language-specific core vocabulary.

#### Likely Near-Duplicates (1 pairs)
| Candidate (COSYlanguages) | Existing (COSYdata) | Match Type |
| :--- | :--- | :--- |
| `anit / atav` | `atav` | Slash / Option variant |

<details>
<summary><strong>Full "Only in COSYlanguages" Word List (3 words)</strong></summary>

```
anit / atav, kaye, Sachañ
```

</details>

<details>
<summary><strong>COSYdata Unique Words List (4 words)</strong></summary>

```
atav, kaier, monet, sachañ
```

</details>

---

### CV (`cv`)

- **COSYlanguages A1 Word Count:** 449
- **COSYdata A0/A1 Word Count:** 445
- **Exact Overlap Count:** 445
- **Candidates to Migrate (Only in COSYlanguages):** 4 words
- **COSYdata Unique Words (To Keep):** 0 words
- **Likely Near-Duplicates:** 0 pairs
- **Migration Classification:** **(b) Incomplete Migration**
- **Rationale:** COSYdata contains 445 words vs 449 in COSYlanguages. While substantial core vocabulary was migrated (445 exact overlap), significant vocabulary (4 words) remains in COSYlanguages awaiting intake.

<details>
<summary><strong>Full "Only in COSYlanguages" Word List (4 words)</strong></summary>

```
Базар, Хула, Шкул, Ял
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
- **COSYdata A0/A1 Word Count:** 391
- **Exact Overlap Count:** 391
- **Candidates to Migrate (Only in COSYlanguages):** 0 words
- **COSYdata Unique Words (To Keep):** 0 words
- **Likely Near-Duplicates:** 0 pairs
- **Migration Classification:** **(a) Curated Subset by Design**
- **Rationale:** Word counts are aligned or curated.

*No words only in COSYlanguages. All words are present in COSYdata.*

---

### IT (`it`)

- **COSYlanguages A1 Word Count:** 1154
- **COSYdata A0/A1 Word Count:** 988
- **Exact Overlap Count:** 876
- **Candidates to Migrate (Only in COSYlanguages):** 278 words
- **COSYdata Unique Words (To Keep):** 112 words
- **Likely Near-Duplicates:** 3 pairs
- **Migration Classification:** **(b) Incomplete Migration**
- **Rationale:** COSYdata contains 988 words vs 1154 in COSYlanguages. While substantial core vocabulary was migrated (876 exact overlap), significant vocabulary (278 words) remains in COSYlanguages awaiting intake.

#### Likely Near-Duplicates (3 pairs)
| Candidate (COSYlanguages) | Existing (COSYdata) | Match Type |
| :--- | :--- | :--- |
| `essere d'accordo` | `essere d accordo` | Hyphenation / Spacing variant |
| `a presto` | `presto` | Article prefix variant |
| `là` | `la` | Accent / Diacritic variant |

<details>
<summary><strong>Full "Only in COSYlanguages" Word List (278 words)</strong></summary>

```
a, a presto, accendere, addebitare, affittare, affitto, all'estero, alla fine, almeno, alzarsi, amichevole, Amsterdam, andare a letto, anello, annoiato, antico, app, appartenere, arrabbiato, artista, asciugamano, attore, Australia, Austria, azienda, bagagli, banconota, band, bar, batteria, biglietto, binario, biondo, bottiglia, boutique, buona fortuna, buona giornata, Canada, canzone, capo, carino, carota, carta di credito, centro commerciale, chef, chiamare, chiaro, Chicago, cinema, cliente, collana, collega, comodo, compagno di classe, compiti, comune, concerto, condividere, contanti, continuare, conto, controllare, coperta, coraggioso, corretto, costare, costoso, costruire, costume da bagno, creare, creativo, credere, crescere, cuscino, decidere, dentista, descrivere, disegnare, diventare, divertente, dovere, e, economico, edificio, educato, elegante, email, esame, esercizio, essere d'accordo, essere in orario, essere in ritardo, famoso, fare colazione, farmacia, fattura, festeggiare, fine settimana, forno, fragola, fresco, frigorifero, garage, gentile, gestire, giornale, girare, giusto, guadagnare, guarire, hotel, il, in forma, in generale, includere, incontrare, India, indossare, infatti, intelligente, interessante, inutile, inviare, invitare, Irlanda, Istanbul, italiano, jeans, là, largo, lavatrice, le, Leonardo da Vinci, lezione, libero, Los Angeles, ma, Madrid, maleducato, messaggio, Miami, migliorare, moderno, mouse, nascondere, nebbia, nervoso, nevoso, New York, niente, noioso, non importa, normale, notare, nuvoloso, o, occhiali, occupato, offerta, ombrello, onesto, online, orario, ordinario, organizzare, orgoglioso, ovale, partecipare, passaporto, password, paziente, per esempio, perdere, pericoloso, permettersi, pianificare, piano, piazza, pigiama, pigro, piovoso, pizza, popolare, portafoglio, Praga, prendere in prestito, prendere una decisione, prenotazione, preoccuparsi, preoccupato, preparare, presentare, prestare, prodotto, produrre, progetto, provare, quartiere, quindi, radio, reception, relazione, ricevere, rilassarsi, ringraziare, riparare, ripetere, risparmiare, riunione, riuscire, rivista, Roma, rompere, rumoroso, salutare, San Francisco, sano, sbagliato, scaffale, scegliere, schermo, se, secondo me, seguire, sembrare, semplice, serio, servizio, sicuro, sicuro di sé, silenzioso, simile, sito web, sognare, soleggiato, solo, sorpreso, spaventato, speciale, spegnere, spendere, sperare, spesa, spiegare, stare, stipendio, strano, stress, stressato, succedere, supermercato, sveglia, svegliarsi, Sydney, t-shirt, tappeto, temperatura, tempo libero, tennis, tigre, timido, Tokyo, Toronto, tutto, ufficio, un, utile, uva, valigia, ventoso, vestirsi, viaggiare, viaggio, villaggio, vincere, visitare, volo, wifi
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
- **COSYdata A0/A1 Word Count:** 377
- **Exact Overlap Count:** 377
- **Candidates to Migrate (Only in COSYlanguages):** 0 words
- **COSYdata Unique Words (To Keep):** 0 words
- **Likely Near-Duplicates:** 0 pairs
- **Migration Classification:** **(a) Curated Subset by Design**
- **Rationale:** Word counts are aligned or curated.

*No words only in COSYlanguages. All words are present in COSYdata.*

---
