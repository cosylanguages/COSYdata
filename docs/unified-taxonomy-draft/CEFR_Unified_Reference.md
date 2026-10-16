# Unified CEFR Reference (A1–C2)

**Project languages:** English, French, Italian, Russian, Greek, German, Portuguese, Spanish, Tatar, Bashkir, Chuvash, Breton, Armenian, Georgian

**How to read this document**
- **[CoE]** = official Council of Europe wording (the canonical layer, identical for all languages).
- **[Src]** = taken from one of the supplied sources (school, publisher, test provider). These are expansions or local practice, not the framework itself.
- **[Web]** = found by online research on 9 Oct 2026 (source named in the text). Re-check anything time-sensitive.
- **[Gen]** = added from general knowledge, NOT from the supplied files or the web check. Verify before publishing.
- **⚠** = conflict or doubtful point between sources (collected in section 11).

---

## 1. What the CEFR is

- The Common European Framework of Reference for Languages (CEFR / CECRL in French) is a Council of Europe framework that describes language ability in **six levels, A1 to C2**, using positive "can-do" descriptors. It is **not an exam**; exams (IELTS, DELF, Goethe…) are mapped onto it. [CoE][Src]
- Published in **2001**; extended by a **Companion Volume (2018/2020)**. [Src: 2001/2020; Gen: details]
- Groups: **A = Basic User**, **B = Independent User**, **C = Proficient User**. French names: *utilisateur élémentaire / indépendant / expérimenté*. [CoE][Src]
- Descriptors are language-neutral, written without reference to any specific language, so they apply to all 14 project languages. Language-specific content (grammar, vocabulary, exams) comes from *Reference Level Descriptions* (RLD), which is what sections 8–9 approximate. [CoE]
- Origins: the "threshold level" (*Threshold Level* for English 1975, *Un Niveau Seuil* for French 1976) is the ancestor of B1. [CoE]
- Levels are **cumulative**: each level assumes everything below it. [Src]
- Learners usually have a **spiky profile** (e.g. B2 listening, B1 speaking; reading typically runs ahead of speaking). Store levels **per skill**, not only as one label. [Src]

### Skills assessed
Five skills in the CoE grid: **Listening, Reading, Spoken Interaction, Spoken Production, Writing**. Many providers reduce these to four (listening, reading, speaking, writing). [CoE][Src]

### Sub-levels used in practice (for internal codes)
| Scheme | Where seen | Note |
|---|---|---|
| Pre-A1 / A0 | Several providers | Not in the 2001 core scale; "entry" level before A1 (Cyrillic/alphabet stage for RU, EL, HY, KA). [Src][Gen: Pre-A1 is in the 2020 Companion Volume] |
| A2+, B1+, B2+ | Companion Volume; Exlinguo (B1+, B2+); Italian Dream Academy (A1+, A2+, B1+) | Intermediate steps. [Src][Gen] |
| .1 / .2 / .3 | French school referential (A2.1–A2.2, B1.1–B1.2, B2.1–B2.3, C1.1–C1.3) | Course-session sub-levels. [Src] |
| Numeric 1–6+ | Italian school (Levels 1, 1/2, 2, 2/3 … 6, 6+) | Internal scheme mapped to CEFR. [Src] |

**Recommendation:** store the CEFR level (A1…C2) as the canonical field and any "+"/".x" as a separate `sublevel` field.

---

## 2. Global scale [CoE]

| Band | Level | Descriptor |
|---|---|---|
| Proficient | **C2** | Can understand with ease virtually everything heard or read. Can summarise information from different spoken and written sources, reconstructing arguments and accounts in a coherent presentation. Can express him/herself spontaneously, very fluently and precisely, differentiating finer shades of meaning even in more complex situations. |
| Proficient | **C1** | Can understand a wide range of demanding, longer texts, and recognise implicit meaning. Can express him/herself fluently and spontaneously without much obvious searching for expressions. Can use language flexibly and effectively for social, academic and professional purposes. Can produce clear, well-structured, detailed text on complex subjects, showing controlled use of organisational patterns, connectors and cohesive devices. |
| Independent | **B2** | Can understand the main ideas of complex text on both concrete and abstract topics, including technical discussions in his/her field of specialisation. Can interact with a degree of fluency and spontaneity that makes regular interaction with native speakers quite possible without strain for either party. Can produce clear, detailed text on a wide range of subjects and explain a viewpoint on a topical issue giving the advantages and disadvantages of various options. |
| Independent | **B1** | Can understand the main points of clear standard input on familiar matters regularly encountered in work, school, leisure, etc. Can deal with most situations likely to arise whilst travelling in an area where the language is spoken. Can produce simple connected text on topics which are familiar or of personal interest. Can describe experiences and events, dreams, hopes and ambitions and briefly give reasons and explanations for opinions and plans. |
| Basic | **A2** | Can understand sentences and frequently used expressions related to areas of most immediate relevance (e.g. very basic personal and family information, shopping, local geography, employment). Can communicate in simple and routine tasks requiring a simple and direct exchange of information on familiar and routine matters. Can describe in simple terms aspects of his/her background, immediate environment and matters in areas of immediate need. |
| Basic | **A1** | Can understand and use familiar everyday expressions and very basic phrases aimed at the satisfaction of needs of a concrete type. Can introduce him/herself and others and can ask and answer questions about personal details such as where he/she lives, people he/she knows and things he/she has. Can interact in a simple way provided the other person talks slowly and clearly and is prepared to help. |

### French official wording (Service Public / Goethe-Institut FR) [Src]
Useful for French-language UI. Level nicknames: A1 *introductif / découverte*, A2 *intermédiaire / usuel*, B1 *seuil*, B2 *avancé / indépendant*, C1 *autonome*, C2 *maîtrise*.

---

## 3. Self-assessment grid (Table 2) [CoE]

Wording is "I can…" (learner-facing). Use this for self-assessment features.

### A1
- **Listening:** I can recognise familiar words and very basic phrases concerning myself, my family and immediate concrete surroundings when people speak slowly and clearly.
- **Reading:** I can understand familiar names, words and very simple sentences, for example on notices and posters or in catalogues.
- **Spoken interaction:** I can interact in a simple way provided the other person is prepared to repeat or rephrase things at a slower rate of speech and help me formulate what I'm trying to say. I can ask and answer simple questions in areas of immediate need or on very familiar topics.
- **Spoken production:** I can use simple phrases and sentences to describe where I live and people I know.
- **Writing:** I can write a short, simple postcard, for example sending holiday greetings. I can fill in forms with personal details, for example entering my name, nationality and address on a hotel registration form.

### A2
- **Listening:** I can understand phrases and the highest frequency vocabulary related to areas of most immediate personal relevance (e.g. very basic personal and family information, shopping, local area, employment). I can catch the main point in short, clear, simple messages and announcements.
- **Reading:** I can read very short, simple texts. I can find specific, predictable information in simple everyday material such as advertisements, prospectuses, menus and timetables and I can understand short simple personal letters.
- **Spoken interaction:** I can communicate in simple and routine tasks requiring a simple and direct exchange of information on familiar topics and activities. I can handle very short social exchanges, even though I can't usually understand enough to keep the conversation going myself.
- **Spoken production:** I can use a series of phrases and sentences to describe in simple terms my family and other people, living conditions, my educational background and my present or most recent job.
- **Writing:** I can write short, simple notes and messages relating to matters in areas of immediate needs. I can write a very simple personal letter, for example thanking someone for something.

### B1
- **Listening:** I can understand the main points of clear standard speech on familiar matters regularly encountered in work, school, leisure, etc. I can understand the main point of many radio or TV programmes on current affairs or topics of personal or professional interest when the delivery is relatively slow and clear.
- **Reading:** I can understand texts that consist mainly of high frequency everyday or job-related language. I can understand the description of events, feelings and wishes in personal letters.
- **Spoken interaction:** I can deal with most situations likely to arise whilst travelling in an area where the language is spoken. I can enter unprepared into conversation on topics that are familiar, of personal interest or pertinent to everyday life (e.g. family, hobbies, work, travel and current events).
- **Spoken production:** I can connect phrases in a simple way in order to describe experiences and events, my dreams, hopes and ambitions. I can briefly give reasons and explanations for opinions and plans. I can narrate a story or relate the plot of a book or film and describe my reactions.
- **Writing:** I can write simple connected text on topics which are familiar or of personal interest. I can write personal letters describing experiences and impressions.

### B2
- **Listening:** I can understand extended speech and lectures and follow even complex lines of argument provided the topic is reasonably familiar. I can understand most TV news and current affairs programmes. I can understand the majority of films in standard dialect.
- **Reading:** I can read articles and reports concerned with contemporary problems in which the writers adopt particular attitudes or viewpoints. I can understand contemporary literary prose.
- **Spoken interaction:** I can interact with a degree of fluency and spontaneity that makes regular interaction with native speakers quite possible. I can take an active part in discussion in familiar contexts, accounting for and sustaining my views.
- **Spoken production:** I can present clear, detailed descriptions on a wide range of subjects related to my field of interest. I can explain a viewpoint on a topical issue giving the advantages and disadvantages of various options.
- **Writing:** I can write clear, detailed text on a wide range of subjects related to my interests. I can write an essay or report, passing on information or giving reasons in support of or against a particular point of view. I can write letters highlighting the personal significance of events and experiences.

### C1
- **Listening:** I can understand extended speech even when it is not clearly structured and when relationships are only implied and not signalled explicitly. I can understand television programmes and films without too much effort.
- **Reading:** I can understand long and complex factual and literary texts, appreciating distinctions of style. I can understand specialised articles and longer technical instructions, even when they do not relate to my field.
- **Spoken interaction:** I can express myself fluently and spontaneously without much obvious searching for expressions. I can use language flexibly and effectively for social and professional purposes. I can formulate ideas and opinions with precision and relate my contribution skilfully to those of other speakers.
- **Spoken production:** I can present clear, detailed descriptions of complex subjects integrating sub-themes, developing particular points and rounding off with an appropriate conclusion.
- **Writing:** I can express myself in clear, well-structured text, expressing points of view at some length. I can write about complex subjects in a letter, an essay or a report, underlining what I consider to be the salient issues. I can select style appropriate to the reader in mind.

### C2
- **Listening:** I have no difficulty in understanding any kind of spoken language, whether live or broadcast, even when delivered at fast native speed, provided I have some time to get familiar with the accent.
- **Reading:** I can read with ease virtually all forms of the written language, including abstract, structurally or linguistically complex texts such as manuals, specialised articles and literary works.
- **Spoken interaction:** I can take part effortlessly in any conversation or discussion and have a good familiarity with idiomatic expressions and colloquialisms. I can express myself fluently and convey finer shades of meaning precisely. If I do have a problem I can backtrack and restructure around the difficulty so smoothly that other people are hardly aware of it.
- **Spoken production:** I can present a clear, smoothly-flowing description or argument in a style appropriate to the context and with an effective logical structure which helps the recipient to notice and remember significant points.
- **Writing:** I can write clear, smoothly-flowing text in an appropriate style. I can write complex letters, reports or articles which present a case with an effective logical structure which helps the recipient to notice and remember significant points. I can write summaries and reviews of professional or literary works.

---

## 4. Qualitative aspects of spoken language use (Table 3) [CoE]

Designed for assessing spoken performance. Condensed from the official table.

| Level | Range | Accuracy | Fluency | Interaction | Coherence |
|---|---|---|---|---|---|
| **A1** | Very basic repertoire of words and simple phrases for personal details and concrete situations. | Limited control of a few simple structures in a memorised repertoire. | Very short, isolated, pre-packaged utterances; much pausing and repair. | Asks/answers questions about personal details; depends totally on repetition, rephrasing and repair. | Links words/groups of words with very basic connectors like "and", "then". |
| **A2** | Basic sentence patterns with memorised phrases and formulae for limited information in simple everyday situations. | Some simple structures correct, but systematic basic mistakes. | Understandable in very short utterances; pauses, false starts and reformulation very evident. | Answers questions and responds to simple statements; rarely able to keep conversation going alone. | Links groups of words with "and", "but", "because". |
| **B1** | Enough language to get by, with some hesitation and circumlocution on family, hobbies, work, travel, current events. | Reasonably accurate with frequently used routines and patterns in predictable situations. | Keeps going comprehensibly; planning and repair very evident, especially in longer free production. | Initiates, maintains and closes simple face-to-face conversation on familiar topics; can repeat back to confirm understanding. | Links shorter discrete elements into a connected linear sequence. |
| **B2** | Sufficient range for clear descriptions and viewpoints on most general topics without much conspicuous searching; some complex sentence forms. | Relatively high grammatical control; no errors causing misunderstanding; corrects most mistakes. | Fairly even tempo; hesitant while searching for patterns, but few noticeably long pauses. | Initiates, takes turns and ends conversation, though not always elegantly; helps the discussion along on familiar ground. | Limited number of cohesive devices; some "jumpiness" in long contributions. |
| **C1** | Good command of a broad range; selects a formulation for an appropriate style on general, academic, professional or leisure topics without restricting what he/she wants to say. | Consistently high grammatical accuracy; errors rare, hard to spot, usually self-corrected. | Fluent, spontaneous, almost effortless; only conceptually difficult subjects hinder smooth flow. | Selects a suitable discourse function to get or keep the floor and relates contributions skilfully to others. | Clear, smooth, well-structured speech with controlled organisational patterns, connectors and cohesive devices. |
| **C2** | Great flexibility reformulating ideas to convey finer shades of meaning, emphasise, differentiate, eliminate ambiguity; good command of idioms and colloquialisms. | Consistent grammatical control of complex language even while attention is elsewhere. | Natural colloquial flow at length; avoids or backtracks around difficulty so smoothly that others hardly notice. | Interacts with ease and skill, using non-verbal and intonational cues; fully natural turn-taking, referencing, allusion. | Coherent, cohesive discourse using varied organisational patterns and a wide range of connectors. |

---

## 5. Practical profile of each level (language-neutral)

Merged from all sources. "Typical use" is indicative, not official.

| Level | Nickname | In one line | Typical real-world sufficiency [Src] |
|---|---|---|---|
| **Pre-A1 / A0** | Discovery / entry | A few words, cannot yet form a sentence; alphabet and sounds stage. | Nothing functional. |
| **A1** | Beginner / breakthrough / survival | Introductions, basic needs, slow clear speech, memorised chunks. | Very simple tourist interactions. Not enough for study or work. Some visa types (e.g. family reunification in Germany). |
| **A2** | Elementary / waystage | Routine tasks, past events, plans, short social exchanges; cannot yet sustain conversation alone. | Tourism and light socialising; work limited to very familiar topics. Not enough for study or most media. Often the minimum in basic residency tests. |
| **B1** | Intermediate / threshold | Independent in familiar situations; opinions, narration, travel. Plateau risk (e.g. subjunctive). | Everyday life in the country; entry-level work; many residency/citizenship thresholds; minimum for some university programmes. |
| **B2** | Upper-intermediate / vantage | Fluent, spontaneous, argumentative; complex text on abstract topics. Lacks nuance outside own field. | The most common threshold for jobs, university admission and naturalisation. |
| **C1** | Advanced / autonomy / effective operational proficiency | Flexible, precise, implicit meaning, academic/professional register. | Full autonomy: study in the language, regulated professions, senior roles. |
| **C2** | Mastery / proficiency | Near-native ease and nuance; summarising and reconstructing arguments. | Specialist roles (translation, interpreting, academia). Rarely a goal for general learners. |

---

## 6. Study-hour estimates (compare and choose carefully)

⚠ Sources disagree substantially. Do not present one figure as fact; present ranges and say "guided learning hours, varies by learner and language".

### 6.1 Cumulative hours from zero (to reach the level)
| Source | A1 | A2 | B1 | B2 | C1 | C2 |
|---|---|---|---|---|---|---|
| EF (English) | 60–80 | 200 | 400 | 600 | 800 | 1000 |
| French article (Mastering French…) | 90–100 | 180–200 | 350–400 | 500–600 | 700–800 | 1000–1200 |
| IET (English A1 guide) | 70–100 | 180–200 total | | | | |

### 6.2 Hours to advance FROM the previous level (per step)
| Step | TEFL guide (English) | Alliance Française Lyon (French) | Indo-Berlin (German) | Russian Voice (Russian; 60-min lessons, 1 h = 45 min) |
|---|---|---|---|---|
| Pre-A1 → A1 | n/a | n/a | n/a | 60–80 (A0) then 100–120 (A1) |
| A1 → A2 | 90–100 | 100–150 | 80–100 (A2) | 120 (A2) |
| A2 → B1 | 140–160 | 150–200 | 150–200 (B1) | 120 (B1) |
| B1 → B2 | 180–200 | 200–250 | 150–200 (B2) | 160–200 (B2) |
| B2 → C1 | ~200 | 250–300 | 200–250 (C1) | 200–220 (C1) |
| C1 → C2 | 200+ | n/a | 200+ (C2) | n/a |

⚠ Indo-Berlin's German figures (A1 1.5–2 months) look optimistic compared with the others; treat as a marketing estimate.
Cambridge and other providers are cited by the TEFL source at roughly 200 guided hours per level step.

### 6.3 Other local benchmarks
- **French school referential:** one session = 4 weeks / 80 h. A1 = 1 session, A2 = 2, B1 = 2, B2 = 3, C1 = 3 (about 80 / 160 / 160 / 240 / 240 h per level). [Src]
- **Alliance Française (via article):** about one level per 12-week intensive term at lower levels. [Src]
- **Italian school:** about 40 h of guided instruction per internal sub-level. [Src]
- **Greek (Omilo):** about 40 h of lessons plus home practice to cover one course level. [Src]
- **Russian (Exlinguo, immersion):** one level every 4–6 weeks in full immersion. [Src]
- **Calendar time, weekly classes plus daily practice (Melbourne French school, French):** A1 3–6 months, A2 6–12 months, B1 about 2 years, B2 3–4 years, C1 5+ years, C2 a decade or more. [Src]
- **Calendar time, steady near-daily practice (Lambda Lingua, Greek):** A1 6–12 months, A2 1–2 years, B1 2–4 years, B2 4–6 years. [Src]

---

## 7. Multi-language level equivalences of labels (for UI)

| CEFR | English | Français | Deutsch (Goethe/telc) | Italiano (CILS/CELI) | Русский (TORFL/ТРКИ) | Ελληνικά |
|---|---|---|---|---|---|---|
| A1 | Beginner | Découverte | A1 | A1 | ТЭУ (TEU) | Α1 |
| A2 | Elementary | Intermédiaire/usuel | A2 | A2 | ТБУ (TBU) | Α2 |
| B1 | Intermediate | Seuil | B1 | B1 | ТРКИ-1 | Β1 |
| B2 | Upper-intermediate | Avancé/indépendant | B2 | B2 | ТРКИ-2 | Β2 |
| C1 | Advanced | Autonome | C1 | C1 | ТРКИ-3 | Γ1 |
| C2 | Proficiency | Maîtrise | C2 | C2 | ТРКИ-4 [Web] | Γ2 |

---

## 8. Exams and certifications by language

Only entries marked [Src] come from your files. Entries marked [Gen] are from general knowledge and must be verified.

| Language | Certifications aligned to CEFR |
|---|---|
| **English** | IELTS, TOEFL iBT, TOEIC (Reading & Listening), Cambridge English (Scale 80–230), Pearson Global Scale of English (GSE), EF SET. [Src] |
| **French** | **DELF** (A1–B2), **DALF** (C1–C2), **TCF**, **TEF**; issued by France Éducation international, over 1,200 exam centres worldwide. [Src] TCF IRN is used for naturalisation. [Src] |
| **Italian** | **CILS** (Università per Stranieri di Siena), **CELI** (Università per Stranieri di Perugia), **PLIDA** (Società Dante Alighieri); each A1–C2, valid for study and residency in Italy. [Src] |
| **Russian** | **TORFL / ТРКИ**: TEU (A1), TBU (A2), TRKI-1 (B1), TRKI-2 (B2), TRKI-3 (C1). [Src] |
| **Greek** | **Ελληνομάθεια** certificate (levels written in Greek letters Α1–Γ2; C1/C2 appear as Γ1/Γ2). Greek citizenship exam **ΠΕΓΠ** (B1 language plus knowledge of Greece). Cyprus language exam (A2 and B1). [Src] |
| **German** | **Goethe-Institut**, **telc** (A1–C2, including telc Medizin and telc Pflege), **TestDaF**. [Src] |
| **Spanish** | **DELE** A1–C2 (Instituto Cervantes; diploma does not expire) and **SIELE** (Cervantes/UNAM/USAL/UBA; online, score-based). [Src][Web] ⚠ SIELE validity is reported as 5 years by some sources and 2 years by others; check siele.org. |
| **Portuguese** | **CAPLE** exams: ACESSO (A1), **CIPLE** (A2), **DEPLE** (B1), **DIPLE** (B2), **DAPLE** (C1), **DUPLE** (C2). [Web] **CELPE-Bras** (Brazil) is a single test with its own scale, not a CEFR-level exam. [Gen] |
| **Tatar** | Kazan Federal University developed a Tatar proficiency test system for levels A1–B2 (2016). A state programme in Tatarstan also plans a Language Certification Center for Tatar. No widely used international exam. [Web; verify current status] |
| **Bashkir** | No CEFR-aligned national or international exam found. [Web] |
| **Chuvash** | No CEFR-aligned national or international exam found. [Web] |
| **Breton** | **DCL (Diplôme de compétence en langue) – breton**, a French regional-language diploma, with levels roughly A2–C1. [Web; verify exact levels] |
| **Armenian** | Armenia's Language Committee has developed unified standards for "Armenian for non-Armenian speakers" with six levels (reported Dec 2025). A testing/certification system is still being built. [Web] |
| **Georgian** | Council of Europe published **Reference Level Descriptions for Georgian (A1–B2)**. A state Georgian-language exam for non-Georgian speakers (A1–B2) was announced in Nov 2025, with higher levels planned later. LanguagesCert also offers a Georgian certificate. [Web; verify dates] |

Russian TORFL (ТРКИ) full ladder [Web: Wikipedia, SPbU system]: Elementary/TEU (A1) → Basic/TBU (A2) → TORFL-I (B1) → TORFL-II (B2) → TORFL-III (C1) → **TORFL-IV (C2)**. Authorised testing bodies are universities listed by the Ministry of Education (13 in the 2019 order; e.g. SPbU, Herzen, MSU, RUDN, Pushkin Institute). Five sub-tests: writing, vocabulary/grammar, reading, listening, speaking.

Greek **Ελληνομάθεια** [Web: Centre for the Greek Language, KEG]: six levels, A1 (also a version for children 8–12), A2, B1, B2, Γ1, Γ2. The Greek labels are A2 "Βασική γνώση" (basic), B1 "Μέτρια γνώση" (moderate), B2 "Καλή γνώση" (good). It is used to enrol in Greek higher education. The University of Cyprus runs its own sittings (candidates must be 15+).

### 8.1 English test-score equivalences (EF's table)
⚠ This is one provider's mapping. Other test publishers publish their own alignment tables, and the two can differ. Store it as `source: EF`.

| CEFR | EF SET | IELTS | TOEFL iBT | TOEIC L&R total | Cambridge Scale | GSE (Pearson) |
|---|---|---|---|---|---|---|
| A1 | 21–30 | n/a | n/a | n/a | 80–99 | n/a |
| A2 | 31–40 | n/a | n/a | 225–545 | 120–139 | 30–42 |
| B1 | 41–50 | 4.0–5.0 | 42–71 | 550–780 | 140–159 | 43–58 |
| B2 | 51–60 | 5.5–6.0 | 72–94 | 785–940 | 160–179 | 59–75 |
| C1 | 61–70 | 6.5–7.5 | 95–120 | 945–990 | 180–199 | 76–84 |
| C2 | 71–100 | 8.0–9.0 | n/a | n/a | 200–230 | 85–90 |

---

## 9. Language-specific level guides

### 9.1 English

**Detailed can-do lists (EF, cumulative; each level includes the ones below).** [Src]

- **A1:** introduce oneself and use basic greetings; say where people are from and describe one's city; talk simply about family and colleagues (appearance, personality); discuss clothing and ask shop staff simple questions; talk about favourite food and place simple take-out orders; talk about daily activities and arrange meetings; describe current weather; describe common health symptoms to a doctor; describe the location of one's home and give simple directions; talk about hobbies and make plans; complete basic hotel transactions; buy common products and return faulty items.
- **A2:** relate past events (weekend, stories); describe past life and milestones; host or visit someone at home; discuss and report on holidays; talk about nature and travel; talk about films and choose one; engage in basic workplace communication and attend meetings on familiar topics; describe an accident, get medical help and fill a prescription; basic business socialising and networking; understand and make simple business proposals; explain game rules; evaluate colleagues' performance.
- **B1:** discuss hopes and plans for the future; arrange and attend a job interview in one's field; talk about TV habits; describe education and training plans; talk about music and plan a night out; discuss healthy lifestyle; discuss relationships and dating (including via social media); order at a restaurant and hold polite dinner conversation; take part in negotiations in one's field with some help; discuss workplace safety and rules; discuss polite and impolite behaviour.
- **B2:** participate in meetings in one's field with some help; discuss gender issues and perceptions of rudeness; give advice on personal finance; describe professional life; explain education, experience, strengths and weaknesses; talk about reading preferences and recommend books; use appropriate social language (praise, sympathy); discuss leadership; manage complex awkward situations; discuss politics and politicians.
- **C1:** discuss success and team building in detail; talk about art and architecture; discuss societal problems and the role of corporations; discuss conservation and sustainability; discuss news and its impact; talk about life risks; compare education systems; discuss types of humour including sarcasm; understand direct, indirect, formal and informal communication styles; discuss quality of life and work-life balance; discuss ethics (e.g. civil disobedience).
- **C2:** discuss science and technology; talk about celebrities and activism; use techniques to promote creativity in speech and writing; discuss financial planning; talk about stress; discuss research techniques.

**Practical sufficiency (EF):** A1 tourist only; A2 tourism and socialising, limited work on very familiar topics; B1 familiar topics, simple reports and emails, not enough to work fully in English; B2 functional at work but lacks nuance outside own field; C1 full functionality at work/study and full autonomy in an English-speaking country; C2 essentially native-level.

**Classroom implications (TEFL guide):**
- A1: slow, clear teacher talk, heavy visual support, short drills, survival language.
- A2: everyday functional tasks (shopping, directions, small talk), simple present/past, guided role-plays.
- B1: longer texts, opinion discussion, paragraph writing, less translation.
- B2: debate, authentic media, structured extended writing, minimal scaffolding.
- C1: academic/professional English, register nuance, essays and presentations.
- C2: near-native refinement, idiom and register, source synthesis.

Most general English classes for new teachers fall in A1–B2; C2 is rare in ordinary courses. [Src]

---

### 9.2 French

**Grammar/functions by level (Alexa course, lesson mapping; adapt if the project uses its own course).** [Src]
- **A0:** greetings, numbers, months, days, colours, family, very basic grammar.
- **A1:** *être* and *avoir*, *aller* + prepositions, regular and irregular verbs (present), simple negation, dictation and reading.
- **A2:** adverbs, comparatives, possessive adjectives, irregular/complex adjectives, near future (*aller* + infinitive), past tenses, interrogatives.
- **B1:** future, *imparfait*, conditional, relative pronouns (*qui/que*), direct/indirect object pronouns.
- **B2:** subjunctive, pluperfect, future perfect, past conditional; documentaries and interviews.
- **C1:** *passé simple*, active/passive, direct/indirect speech; extensive reading, dictation, gap-fills.
- **C2:** radio/TV, conversation groups, extended speaking practice.

**Communicative objectives by level (institutional referential, Inspire / Défi / Cosmopolite textbooks).** [Src]
- **A1 (80 h):** greet, introduce oneself, spell, ask politely, describe family/profession/place, give directions, invite/accept/refuse, tell time, make appointments, shop (quantities, prices), describe food, talk about health, past events (intro), housing, weather, phone calls.
- **A2.1 / A2.2 (2 × 80 h):** talk about tastes, social relations, future, appearance and character, childhood and past context, feelings, the city, shopping habits, write a friendly email, express desire/obligation/hope/hypothesis, CV and biography, describe objects, report speech, tell anecdotes, travel diaries, cultural habits.
- **B1.1 / B1.2 (2 × 80 h):** compare generations, give advice and predictions, cultural differences, narrate current events, express opinions and nuance, comment on a survey, recommendations and hypotheses, regrets and reproaches, describe a city's transformation, describe artworks, lead a debate, media, read articles of law, colloquial register.
- **B2.1 / B2.2 / B2.3 (3 × 80 h):** nuance, recommend a film, agree, past narration, express possibility/emotion/paradox, correct false information, condense information, manage cultural misunderstandings, identify and switch language registers, explain civic initiatives, compare voting systems, write administrative letters, explain technology and its limits, write an argued article, express implicit opinions, popularise scientific terms, denounce cultural clichés.
- **C1.1 / C1.2 / C1.3 (3 × 80 h):** two alternative referentials appear in the sources: *Défi C1* (harmony and urbanism, grading systems, transgression, civil disobedience, gastronomy, guilt and forgiveness, justice, cyberviolence, animal welfare, parasciences, fear and anxiety, taxation and money, perception and reality, cultural restitution and appropriation) and *Cosmopolite C1* (oral report of two documents, synthesis, urban mobility, food and health, organ donation, scientific findings, slam, body language, art analysis, song interpretation, press review, job-ad hooks, theatre and film criticism, utopias, Francophonie, fake news, editorial writing, plea planning, humour, climate change and ecological policy).

**Certification/use cases (French):** DELF/DALF, TCF, TEF (see section 8). One school source says B1 is the practical "live in France" level, and B2 is the working/migration threshold. ⚠ See section 10.

---

### 9.3 Italian

**Key idea:** grammar is sequenced past tenses → congiuntivo. [Src]

| Level | Can do | Key grammar |
|---|---|---|
| **A1** | Introduce oneself, order food, ask simple questions, handle numbers and times. | Present tense, *essere*/*avere*, gender and articles, noun–adjective agreement. |
| **A2** | Describe routine, recount the past, talk about plans and needs. | *Passato prossimo*, *imperfetto*, reflexives, direct/indirect pronouns, simple future. |
| **B1** | Cope with travel, narrate experiences, give and justify opinions. | Present *congiuntivo*, *condizionale*, comparatives, *ci* and *ne*, imperative. |
| **B2** | Argue a viewpoint, follow most media, interact fluently. | Imperfect *congiuntivo*, *periodo ipotetico*, passive, reported speech, connectors. |
| **C1** | Use Italian flexibly for academic/professional purposes. | All *congiuntivo* uses, *passato remoto* for reading, register, idiom. |
| **C2** | Understand virtually everything; precise nuance. | Stylistic mastery, regional and literary forms, idiomatic command. |

**Diagnostic placement (Derstina):** narrate a recent event (tests *passato prossimo/imperfetto*, separating A2); prompt opinions and wishes (*penso che…*, *vorrei che…*) to test *congiuntivo* (separating B1 from B2+). [Src]

**Internal school scheme (sub-level → syllabus):** [Src]
- L1 (A1): articles, regular/common irregular present, agreement, subject pronouns, possessive/demonstrative adjectives, present progressive, reflexives, intro *passato prossimo*.
- L1/2: direct-object pronouns, *ne*, first *imperfetto* (*c'era, ero*), informal imperative.
- L2 (A2): present, *passato prossimo*, *imperfetto*, indirect pronouns, awareness of conditional (*vorrei, potrebbe*).
- L2/3: future, conditional, formal imperative, combined pronouns, relative pronouns, impersonal *si*.
- L3 (B1): *trapassato*, conditional perfect, present subjunctive (recognition, not yet active).
- L3/4: subjunctive to express opinion/hypothesis, purpose/consecutive/temporal clauses.
- L4 (B2): sequence of tenses, uncertainty/condition/desire, passive.
- L4/5: subjunctive in independent clauses, indefinite pronouns, *si passivante*.
- Later levels (5, 5/6, 6, 6+ = B2 → C2) are listed in the school's table but without a syllabus in the supplied text.

**Exams:** CILS, CELI, PLIDA. University enrolment in Italy: at least B1 (one source). Work: A2–B2 depending on the job. ⚠ See section 10.

---

### 9.4 Russian

**Vocabulary and exam mapping (Exlinguo immersion):** [Src]

| CEFR | Exlinguo level | Exam | Vocabulary |
|---|---|---|---|
| A1 | 1 "Discovery" | TEU | ~780 words |
| A2 | 2 "Survival" | TBU | ~1,300 words |
| B1 | 3 "Threshold" | TRKI-1 | ~2,300 words |
| B1+ | 4 | | ~4,000 |
| B2 | 5 "Independent" | TRKI-2 | ~5,000 |
| B2+ | 6 | | ~6,000 |
| C1 | 7 "Autonomous" | TRKI-3 | ~7,000 |

**Practical thresholds:**
- B1 / TRKI-1: officially required to enter university in Russia.
- B2 / TRKI-2: required for employment in a Russian company; living in-country is recommended to reach it.
- C1 / TRKI-3: required for executives at Russian firms, diplomats, Russian teachers, translators and interpreters.
- One online school states a lower level certificate is needed for Russian citizenship and that higher levels are needed for Bachelor/Master/PhD study. ⚠ Verify against current official requirements.

**Beginner course topics (A0–A1 syllabus, French training provider + Polyglot Club):** Cyrillic alphabet (upper/lowercase), stress and vowel reduction, greetings, introductions, personal pronouns, *быть* (to be, mostly implicit in present), three genders and plurals, subject–verb–object, nominative, accusative, genitive (possession/absence), dative, prepositional case, present and past tense, verbs of motion, adjective agreement, numbers and time, restaurant and directions, family vocabulary, comparatives/superlatives, culture (holidays, literature).

**Learning goals per CEFR level (Russian Voice):** [Src]
- A0 (60–80 h): read Cyrillic, pronunciation basics, introduce oneself, simple conversations.
- A1 (100–120 h): shop, use transport, weather talk, read signs and short texts, write short notes.
- A2 (120 h): talk confidently in daily life, tell about family/work/studies, read short texts.
- B1 (120 h): wider grammar and vocabulary, understand most of lectures and TV in general meaning, extract information from documents.
- B2 (160–200 h): extended conversation, write plans/summaries/formal texts, understand radio news, films, express and evaluate opinions.
- C1 (200–220 h): lengthy conversations, formal/academic/professional documents, literature, prepared and unprepared communication.

⚠ The Russian Voice table has apparent mislabels (its TORFL column does not match the standard TEU/TBU/TRKI mapping). The Exlinguo mapping above is the one to use.

---

### 9.5 Greek

**Grammar by level (Lambda Lingua):** [Src]
- **A1:** alphabet, articles, noun gender and cases, adjectives, pronouns, numbers, present/past/future. ("Greek front-loads its grammar.")
- **A2:** imperfect, perfect, passive, conditionals, imperative, relative clauses, reported speech.
- **B1:** participles, modal verbs, strong/weak pronouns, discourse markers.
- **B2:** nuanced reported speech, complex syntax, word formation, register and style.
- C1/C2: not detailed in the source.

**School course structure (Omilo, about 40 h per course level):** [Src]
- Absolute Beginner: alphabet, greetings, self-presentation, numbers, present tense, articles, possessives, nominative.
- Beginner 1 → A1: telling time, routines, formal/informal questions, accusative, adverbs of frequency.
- Beginner 2 → A1: plurals, simple future, subjunctive, intro to past.
- Intermediate 1 → A2: past tense, diminutives, comparative/superlative, conditionals, genitive, imperative, more pronouns.
- Intermediate 2 → A2/B1: reflexives, past continuous, present perfect, past perfect, direct/indirect speech, future continuous, intro passive.
- Advanced 1 → B2: passive completed, most grammar, press and literary texts.
- Advanced 2 → C1: professional/specialised topics, read fiction.

⚠ Omilo puts Advanced 1 at B2 and Advanced 2 at C1, which is more generous than Lambda Lingua's grammar timeline; treat as a school mapping.

**Practical:** A2 enough for holidays; B1 for living in Greece/Cyprus; B2 for study/professional use; residency tests commonly around A2–B1, citizenship higher (ΠΕΓΠ B1 plus civic knowledge). Check current rules. [Src]

---

### 9.6 German

**Skill-by-skill profile (PrepareBuddy).** [Src]

| Level | Reading | Listening | Speaking | Writing |
|---|---|---|---|---|
| A1 | Signs, menus, very short messages | Familiar words, basic phrases, slow and clear | Simple questions about yourself, rehearsed phrases | Postcard, form entries |
| A2 | Short personal letters, simple ads, timetables | Gist of short clear announcements and conversations | Short social exchanges, daily routine | Short notes, simple personal letters |
| B1 | Everyday texts, straightforward news on familiar topics | Main points of clear standard speech | Narrate experiences, give reasons, keep a conversation going | Connected text on familiar topics |
| B2 | Contemporary articles with viewpoints | Extended talks, most TV news, films in standard German | Fluent interaction, clear detailed arguments | Detailed essays/reports for or against a view |
| C1 | Long complex factual/literary texts | Extended speech, implicit meaning | Spontaneous and precise, adapted style | Well-structured complex text |
| C2 | Virtually all written German | Any spoken German at native speed | Effortless, fine shades of meaning | Polished summaries, reviews, professional documents |

**Level jumps and focus:** A1→A2 high-frequency vocabulary, present plus perfect; A2→B1 connected speech, past narration, opinions; B1→B2 argumentation, passive, professional vocabulary; B2→C1 register control, idiom; C1→C2 nuance and near-native reception speed. [Src]

**Use cases:** A1 some family-reunification visas; B1 permanent residence, citizenship, vocational training; B2 most jobs, many university programmes; C1 university study in German, regulated professions; C2 academia, translation. Exams: Goethe, telc, TestDaF. [Src]

**Common misjudgement traps:** reading runs ahead of speaking; recognition ≠ production; comfort-zone topics hide the B1→B2 abstraction wall. Use diagnostic testing across all four skills. [Src]

---

### 9.7 Spanish

**Indicative grammar ladder** [Web; Kwiziq/Lengalia-type course maps, not the official Plan Curricular, which should be consulted at cvc.cervantes.es]
- **A1:** present tense, *ser/estar/tener*, gender and number, articles, basic questions, numbers, *gustar*.
- **A2:** past tenses (*pretérito perfecto, indefinido, imperfecto*), near future (*ir a* + infinitive), reflexives, object pronouns, comparatives, basic imperative.
- **B1:** present subjunctive (introduction), conditional, simple future, imperative forms, relative clauses, reported speech (basics).
- **B2:** full subjunctive including imperfect, *si*-clauses, passive and *se* constructions, pluperfect, connectors, argumentation.
- **C1–C2:** register, idiom, regional variation, nuance, advanced subjunctive and stylistic choices.

⚠ Providers disagree on when the subjunctive starts (B1 in some course maps, B2 in others). Decide your own cut-off and document it.

**Exams:** DELE (A1–C2, no expiry) and SIELE. **Citizenship:** Spain requires DELE A2 or higher plus the CCSE civic test (Instituto Cervantes). [Web]

### 9.8 Portuguese

- **Variety decision:** European (Portugal) vs Brazilian. The CAPLE exams are tied to European Portuguese and the Camões institute; CELPE-Bras is Brazilian. Choose one primary variety per course. [Gen]
- **Indicative grammar ladder** [Gen; verify against a Portuguese RLD]:
  - A1: present tense, *ser/estar/ter*, articles and contractions (*no, na, do*), basic questions.
  - A2: *pretérito perfeito vs imperfeito*, near future (*ir* + infinitive), reflexives, clitic pronouns.
  - B1: future, conditional, present subjunctive, personal infinitive (intro).
  - B2: imperfect and future subjunctive, passive, reported speech, complex connectors.
  - C1–C2: register, idiom, stylistic control.
- **Exam ladder:** ACESSO (A1), CIPLE (A2), DEPLE (B1), DIPLE (B2), DAPLE (C1), DUPLE (C2). [Web]
- **Citizenship/residency:** A2 Portuguese is required for permanent residency and nationality, usually via CIPLE, or an approved A2 course (about 150 hours) since Jan 2024. A new nationality law entered into force on 19 May 2026 (longer residence periods, extra civic-knowledge tests); the A2 requirement was reported as unchanged. [Web; verify]

### 9.9 Tatar

- **Status:** Kazan Federal University researchers created a CEFR-based proficiency test system for Tatar (A1–B2, 2016) and a Tatar-as-foreign-language course of about 130–140 hours (18 lessons plus an introductory block). A Tatarstan state programme plans a certification centre. No international exam. [Web; verify current availability]
- **Linguistic profile (planning notes):** Kipchak Turkic, agglutinative, vowel harmony, case system, Cyrillic script with extra letters. [Gen]
- **Suggested level design:** Pre-A1 = alphabet and phonology; A1–A2 = core suffix morphology (plural, possession, 6 cases), present/past; B1 = full tense/mood system, converbs and participles; B2+ = literary and media registers. [Gen; confirm with a Tatar methodologist]

### 9.10 Bashkir

- **Status:** No CEFR-aligned standard or exam was found online. Methodological materials exist for school teaching in Bashkortostan (Institute for Education Development) but they are school-curriculum documents, not CEFR descriptors. [Web]
- **Linguistic profile:** Kipchak Turkic, very close to Tatar; Cyrillic with extra letters (Ә, Ө, Ү, Ғ, Ҡ, Ң, Ҙ, Һ, Ҫ). [Gen]
- **Suggested approach:** reuse the Tatar ladder as a template and mark all descriptors "adapted, pending validation". [Gen]

### 9.11 Chuvash

- **Status:** No CEFR-aligned standard or exam was found. [Web]
- **Linguistic profile:** the only living Oghur-branch Turkic language, so Tatar/Bashkir/Turkish knowledge transfers less than learners expect. Cyrillic with extra letters (Ӑ, Ӗ, Ҫ, Ӳ). Sources differ on the description of its vowel harmony, so take phonology details from a specialist grammar. [Web; verify]
- **Suggested approach:** build descriptors from the CoE grid, with grammar milestones written by a Chuvash philologist. [Gen]

### 9.12 Breton

- **Exam:** the DCL (*Diplôme de compétence en langue*) in Breton, a French regional-language diploma, covering roughly A2–C1. Regional bodies (Region Bretagne, Office public de la langue bretonne) publish related documents. [Web; verify levels and organiser]
- **Linguistic profile:** Brittonic Celtic; initial consonant mutations; dialect and orthography issues (standard *peurunvan* orthography vs dialects: Vannetais, Cornouaillais, Léon, Trégor). [Gen]
- **Suggested approach:** A1–A2 = mutations in context, conjugated prepositions, verb *bezañ*; B1+ = full tense system, periphrastic constructions; make dialect exposure explicit from B1. [Gen]

### 9.13 Armenian

- **Status:** Armenia's Language Committee and partners developed unified standards for teaching, testing and assessing Armenian for non-native speakers across six levels (reported Dec 2025). A national testing and certification system was still being built. [Web]
- **Linguistic profile:** Eastern vs Western Armenian are two standards; decide which you teach (or offer both). Own alphabet (Mesrobian). Case system, rich verb morphology. [Gen]
- **Suggested approach:** Pre-A1 = alphabet and reading; follow the national standard's descriptors once published and map them to the CoE ones. [Gen]

### 9.14 Georgian

- **Official descriptors:** the Council of Europe published **Reference Level Descriptions for Georgian, A1–B2** (rm.coe.int). Georgian academic papers also define A2 and B1 teaching requirements. [Web]
- **Exams:** state Georgian-language exam for non-Georgian speakers (A1–B2) announced Nov 2025; C1–C2 planned later. LanguagesCert Georgian certificate. NCER offers a one-year Georgian preparatory programme for minority students. [Web; verify dates]
- **Linguistic profile:** Mkhedruli script (33 letters, no case), complex verb system organised in *screeves* (tense–aspect–mood series), polypersonal agreement, no grammatical gender. [Web: Screeve; Gen]
- **Suggested approach:** Pre-A1 script; A1–A2 present and aorist; B1 introduces more screeves and preverbs; B2 aligns with the CoE RLD. [Gen]

---

## 10. Practical requirements by country

Verified online on 9 Oct 2026 where marked [Web]. These are rules that change, so keep `verified_date` in your data.

| Country / context | Level | Notes |
|---|---|---|
| **France**, naturalisation | **B2** (spoken and written) from 2026 | [Web] Multiple 2026 sources and Service-Public. Accepted proofs include DELF/DALF B2+, TCF/TEF IRN (valid about 2 years), or a French diploma. Civic test also required. |
| France, residence card | multi-year card A2; long-term/10-year card B1 [Web] | Verify per card type. |
| France, university | B2 typical (DELF/TCF), varies by programme | ⚠ [Src] |
| France, work | B1 minimum; B2 for public-facing/writing jobs | [Src] |
| **Germany**, citizenship | **B1** | [Web] |
| Germany, permanent settlement permit | **B1** | [Web] |
| Germany, family reunification | **A1** (spouses) | [Web] |
| Germany, Chancenkarte | A1 German or B2 English, plus other criteria [Web; verify] | |
| Germany, university | B2–C1 (programme-dependent) | [Src] |
| **Italy**, citizenship | **B1** (CILS/CELI/PLIDA etc.) | [Web] Several sources agree. |
| Italy, university | B1–B2+ varies | ⚠ [Src] says at least B1 |
| **Spain**, citizenship | **A2** (DELE A2+) plus CCSE | [Web] |
| **Portugal**, citizenship/permanent residency | **A2** (CIPLE or approved A2 course) plus new civic tests | [Web] New nationality law in force 19 May 2026. |
| **Russia**, citizenship | **A2 (TBL)** per Wikipedia; one school says A1 | ⚠ [Web vs Src] Verify against current federal rules. |
| Russia, university entry | B1 (TORFL-I) to apply; B2 (TORFL-II) for degrees (most subjects) | [Web] |
| Russia, professional | C1 (TORFL-III) for linguistics, translation, journalism, international relations; C2 (TORFL-IV) for philology master | [Web] |
| **Greece / Cyprus** | Residency tests often A2–B1; citizenship B1 plus civic knowledge; Ελληνομάθεια for university | [Src][Web partial] Verify with the Greek ministry. |
| English, general | A1 tourist; B2 workplace; C1 full autonomy | EF [Src] |
| Georgia | Exam for non-Georgian speakers A1–B2 (announced 2025) | [Web; verify] |

---

## 11. Discrepancies and data-quality notes

1. **Study hours** vary by a factor of 2 or more between sources (section 6). Present as ranges.
2. **Vocabulary size:** IET says A1 needs about 500–600 word families and A2 about 1,000; Exlinguo (Russian) says A1 about 780 words and A2 about 1,300 words; a French article claims about 1,500 words for "basic fluency". Counts are language-dependent and word-vs-family definitions differ; do not treat as universal.
3. **History:** the Italian article says the CEFR was "established between 1966 and 1989"; the CoE text says it was launched in 2001, building on the 1970s Threshold Level work. Use the CoE account.
4. **C1 group name:** the Melbourne French page calls C the "Compétent" group; the official French label is *utilisateur expérimenté* (Service Public, Goethe). Use the official name.
5. **French C1 referentials:** two different textbooks are named (*Défi C1*, *Cosmopolite C1*). Choose one for the project or map both.
6. **Russian TORFL table (Russian Voice)** has apparent errors in the exam column; Exlinguo's TEU/TBU/TRKI mapping is consistent with the official system.
7. **Greek:** Omilo's Advanced 1/2 = B2/C1 vs Lambda Lingua's much longer B2 timeline.
8. **Country requirements** come from language schools, not government sources. Verify with official sites before showing them to users.
9. **Commercial content:** several sources are marketing pages (course promotions, testimonials, salary tables for India). The salary and job tables from the German source were deliberately excluded as non-CEFR.
10. **Test-score tables** (EF) are provider-specific mappings, not CEFR itself.
11. **Spanish subjunctive** starts at B1 in some course maps and B2 in others; **SIELE validity** is reported as 5 years by some sources and 2 years by others.
12. **Russian citizenship level:** Wikipedia says A2 (TBL); one school says A1. Russian TRKI levels now confirmed incl. TORFL-IV = C2.
13. **Minority languages:** only Georgian (CoE RLD A1–B2) and Armenian (national standards, Dec 2025) have official CEFR-type descriptors found online. Tatar has a university-developed A1–B2 test. Bashkir and Chuvash have none found. Breton has the DCL. Treat generated descriptors for these as drafts.
14. **Remaining gaps after the web check:** Pre-A1 syllabi, C1/C2 grammar detail for Russian/Greek, official Spanish/Portuguese RLD tables, and primary-source confirmation (government sites) for all country requirements.
15. **Coverage note:** the supplied files had nothing for Spanish, Portuguese, Tatar, Bashkir, Chuvash, Breton, Armenian or Georgian. Sections 8, 9.7–9.14 and 10 now carry web-checked information plus clearly marked [Gen] suggestions.

---

## 12. Suggested data model for your project

```
level: A1 | A2 | B1 | B2 | C1 | C2      # canonical (+ Pre-A1)
sublevel: "+", ".1", ".2", ".3" or null  # optional
band: basic | independent | proficient
skills: {listening, reading, spoken_interaction, spoken_production, writing}  # each a level
descriptor_source: CoE | school | provider
language: en | fr | it | ru | el | de | pt | es | tt | ba | cv | br | hy | ka
can_do[]: {skill, text, source}
grammar_milestones[]: per language
hours: {min, max, cumulative: bool, source}
exams[]: {name, level, source, verified_date}
requirements[]: {country, purpose, level, source, verified_date}
```

Treat `verified_date` and `source` as mandatory on anything that may change (requirements, exams, hours).
