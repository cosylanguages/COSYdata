# Unified Daily Ecosystem Architecture & Cross-Repository Specification

## 1. Executive Summary & Core Mission

The **COSY Unified Daily System** connects learners to four coordinated daily vocabulary and phrase elements:
1. **Word of the Day (WOTD)** (`word`)
2. **Phrasal Verb of the Day** (`phrasal_verb`)
3. **Collocation of the Day** (`collocation`)
4. **Idiom of the Day** (`idiom`)

### Pedagogical Philosophy: Beyond Passive Memorization
- **Creative Production (Self-Explanation)**: The primary objective of the Word of the Day is not mere passive memorization or rote repetition. The learner is actively challenged to **explain the word in their own words** (paraphrasing, circumlocution, personal analogies, or contextual mini-stories). This develops active linguistic fluency and creative language manipulation.
- **Synonym Expansion (B1 to C2)**: Beginning at CEFR **B1**, expanding through **B2**, and reaching mastery at **C1–C2**, daily challenges require learners to generate and explore **as many synonyms, near-synonyms, and nuanced semantic variations as possible** (differentiating formal vs. informal registers, subtle connotations, and intensity).
- **Thematic Cohesion Across the Ecosystem**: All daily elements share a synchronized **Daily Theme** anchored to the ecosystem's canonical taxonomy (`shared/themes.json`).
- **Deep Interconnection**: Every daily element across COSY repositories points directly to related learning materials in sibling repositories (**COSYlanguages**, **COSYpractice**, **COSYtools**, and **COSYdata**).

---

## 2. Daily Element Slots & CEFR Level Matrix

The daily elements are divided into CEFR proficiency bands:
- **A0–A1**: Elementary Foundation (high-frequency, concrete vocabulary, core action verbs, survival collocations).
- **A2**: Pre-Intermediate (daily routine expansion, foundational phrasal verbs, common fixed combinations).
- **B1–B2**: Intermediate & Upper-Intermediate (abstract concepts, polysemous phrasal verbs, academic/work collocations, core idioms; focus on synonym diversity and nuanced usage).
- **C1–C2**: Advanced & Mastery (sophisticated nuance, low-frequency idiomatic expressions, specialized collocations, stylistic variation, advanced register switching).

### Level Availability Matrix by Slot

| Slot | A0–A1 | A2 | B1–B2 | C1–C2 | Focus / Core Pedagogical Task |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Word of the Day** | ✅ | ✅ | ✅ | ✅ | Explain with own words (A0–A2: simple paraphrase/example; B1–C2: rich paraphrase + maximum synonyms). |
| **Phrasal Verb of the Day** | ⚠️ *(A1 select)* | ✅ | ✅ | ✅ | Particle semantics, separable/inseparable syntax, figurative vs. literal meanings. |
| **Collocation of the Day** | ✅ | ✅ | ✅ | ✅ | Natural word pairings (verb+noun, adj+noun, adverb+adj) to sound authentic and eliminate literal native-language calques. |
| **Idiom of the Day** | ❌ | ✅ *(core)*| ✅ | ✅ | Figurative imagery, cultural context, literal vs. real meaning, pragmatic register. |

*Note for A0–A1:* Idioms are excluded at A0–A1 to avoid cognitive overload with figurative expressions before basic grammar is internalized. Phrasal verbs begin at high A1/A2 (e.g., *wake up*, *get up*, *turn on*). Words and collocations are supported across all bands.

---

## 3. Creative Mechanics & Interaction Specifications

### A. Word of the Day (WOTD)
- **A0–A1 / A2 Prompt**:
  > *"How would you describe this word to a friend without using the word itself? Write 1–2 simple sentences explaining what it means or describing a situation where you need it."*
- **B1–B2 Prompt**:
  > *"Explain this concept in your own words using a creative scenario or analogy. Then list at least 3 to 5 synonyms or related terms, noting any differences in formality or intensity."*
- **C1–C2 Prompt**:
  > *"Provide a nuanced definition in your own words, contrasting it with close synonyms. How many alternative expressions, formal equivalents, or idiomatic substitutes can you provide? Identify the register (formal, literary, academic, colloquial)."*

### B. Phrasal Verb of the Day
- Displays headword, particle breakdown, transitivity, and separability.
- Prompt:
  > *"Create two sentences: one literal (if applicable) and one idiomatic. Point out what happens when an object pronoun is inserted (e.g., 'turn it off' vs 'turn off the light')."*

### C. Collocation of the Day
- Displays the collocate pair (e.g., *make a decision*, *heavy rain*, *harsh reality*).
- Prompt:
  > *"What words naturally pair with this term? Explain why saying 'do a decision' or 'strong rain' is unnatural. Write a sentence demonstrating the natural pairing."*

### D. Idiom of the Day
- Displays the idiom, `literal_meaning`, `real_meaning`, and sample context.
- Prompt:
  > *"Imagine explaining this idiom to someone who takes everything literally. What funny image does the literal meaning conjure up, and how do you use its real meaning in real life?"*

---

## 4. Cross-Repository Ecosystem Mapping

The daily elements are integrated across four specialized repositories:

```
                      ┌───────────────────────────────────────┐
                      │               COSYdata                │
                      │  (Canonical Data Hub & Daily Feeds)   │
                      │   - Word of the Day                   │
                      │   - Phrasal Verb of the Day           │
                      │   - Collocation of the Day            │
                      │   - Idiom of the Day                  │
                      └──────────────────┬────────────────────┘
                                         │ Thematic Sync
          ┌──────────────────────────────┼──────────────────────────────┐
          ▼                              ▼                              ▼
┌──────────────────┐           ┌──────────────────┐           ┌──────────────────┐
│  COSYlanguages   │           │   COSYpractice   │           │    COSYtools     │
│ (Daily Immersion)│           │ (Active Output)  │           │ (Morpho/Syntax)  │
│ - Daily Spoken   │◄─────────►│ - Daily Spoken   │◄─────────►│ - Verb Conjugator│
│ - Daily Written  │           │   Audio Rec & AI │           │   & Irregular    │
│ - Thematic Strip │           │ - Daily Written  │           │ - Verb + Prep    │
│   Links          │           │   Journal/Review │           │   Governance     │
└──────────────────┘           └──────────────────┘           └──────────────────┘
```

### Repository Responsibilities & Cross-Links

1. **COSYdata** (`https://cosylanguages.github.io/COSYdata/`):
   - Generates and publishes the deterministic static calendar feeds (`/daily/<lang>/calendar/<slot>/YYYY-MM.json`).
   - Serves the shared entry cards with cross-repo links to COSYlanguages, COSYpractice, and COSYtools.
   - Provides client-side helpers (`shared/vocab-resolver.js`, `shared/daily-picker.js`).

2. **COSYlanguages** (`https://cosylanguages.github.io/COSYlanguages/`):
   - Features the primary **Daily Strip** header on the homepage and dashboard.
   - **Daily Spoken Prompt**: Thematic conversational trigger linked to the day's theme and vocabulary.
   - **Daily Written Prompt**: Journaling/essay prompt applying the day's WOTD, phrasal verb, or idiom.
   - Direct link out to COSYpractice for speaking recording or essay grading, and to COSYtools for verb drills.

3. **COSYpractice** (`https://cosylanguages.github.io/COSYpractice/`):
   - **Daily Spoken Practice**: Voice recording studio with speech-to-text pronunciation evaluation and AI conversation roleplay using the day's target elements.
   - **Daily Written Practice**: Timed writing sandbox with automated feedback on synonym diversity, collocation accuracy, and creative paraphrase quality.
   - Direct deep links back to COSYlanguages for reading material and COSYtools for grammar reference.

4. **COSYtools** (`https://cosylanguages.github.io/COSYtools/`):
   - **Daily Verb Conjugation**: Dynamic conjugation tables for the verb featured in the day's WOTD or phrasal verb (e.g., tense drills, irregular past forms).
   - **Daily Verb + Preposition**: Governance lookup and fill-in-the-blank drill for prepositions associated with the day's verb/collocation.
   - Direct back-links to COSYlanguages and COSYpractice to see the verb in full conversational context.

---

## 5. Local Midnight Timezone Resolution Architecture

To provide a consistent, personalized experience where all daily elements update **simultaneously at local midnight** for each user without requiring user authentication, servers, or cookies:

### A. The Client-Side Local Date Key
Every client calculates the user's current date in their local timezone using the client device's browser time:

```javascript
/**
 * Resolves the client's current local date formatted as YYYY-MM-DD.
 * Automatically handles local midnight roll-over across all time zones.
 *
 * @param {Date} [now=new Date()]
 * @returns {string} e.g. "2026-11-11"
 */
export function getLocalMidnightDateKey(now = new Date()) {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calculates milliseconds remaining until the upcoming local midnight.
 * Allows scheduling a seamless client-side hot refresh.
 *
 * @param {Date} [now=new Date()]
 * @returns {number} Milliseconds until 00:00:00 tomorrow
 */
export function getMsUntilLocalMidnight(now = new Date()) {
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return tomorrow.getTime() - now.getTime();
}
```

### B. Monthly Partitioned Static JSON
Instead of fetching one massive multi-megabyte feed, feeds are partitioned by month:
`https://cosylanguages.github.io/COSYdata/daily/<lang>/calendar/<slot>/<YYYY-MM>.json`

```
daily/
  calendar-config.json
  en/
    calendar/
      word/
        2026-11.json
      phrasal_verb/
        2026-11.json
      collocation/
        2026-11.json
      idiom/
        2026-11.json
```

When a user visits at 00:01 AM on November 11th in Tokyo (`UTC+9`), their browser requests `2026-11.json` and keys into `days["2026-11-11"]`. At the exact same universal instant, a user in San Francisco (`UTC-7`) still has local date `2026-11-10` and receives `days["2026-11-10"]`. Both receive their local "day's" elements with 0 latency and 100% cacheability on GitHub Pages CDN.

### C. Automatic Midnight Hot-Refresh
Client applications register a timer using `getMsUntilLocalMidnight()`. At 00:00:01 local time, the UI invalidates the current day state and gracefully transitions to the new day's elements without requiring a manual page reload.

---

## 6. Daily Calendar Card Schema & Ecosystem Link Payload

Each daily card payload in `YYYY-MM.json` contains:
```json
{
  "id": "en:resilient:adjective",
  "word": "Resilient",
  "cefr": "B2",
  "theme": "personality",
  "definitions": [
    "Able to withstand or recover quickly from difficult conditions"
  ],
  "synonyms": [
    "tough",
    "hardy",
    "adaptable",
    "buoyant",
    "tenacious"
  ],
  "examples": [
    "Local communities proved remarkably resilient after the storm."
  ],
  "creative_prompt": {
    "type": "explain_in_own_words",
    "instruction": "Explain 'resilient' in your own words. Describe a person or system that demonstrated resilience.",
    "synonym_challenge": "Can you provide 3 to 5 synonyms with varying formality?"
  },
  "ecosystem_links": {
    "cosylanguages": "https://cosylanguages.github.io/COSYlanguages/?theme=personality&date=2026-11-11",
    "cosypractice": "https://cosylanguages.github.io/COSYpractice/?type=spoken&vocab=en:resilient:adjective",
    "cosytools": "https://cosylanguages.github.io/COSYtools/?verb=resile"
  }
}
```

---

## 7. Ready-to-Use Engineering Prompts for External Repositories

Below are the complete, actionable prompts designed to be executed directly in **COSYlanguages**, **COSYpractice**, and **COSYtools** to implement the matching daily strip features.

---

### Prompt 1: For `COSYlanguages` (Daily Spoken, Written & Strip Header)

```markdown
# TASK: Implement Thematically Synchronized Daily Strip in COSYlanguages

## Objective
Integrate the COSYdata Unified Daily Strip on COSYlanguages. The daily strip must display:
1. Word of the Day (with Creative Self-Explanation & Synonym Expansion for B1+)
2. Phrasal Verb of the Day
3. Collocation of the Day
4. Idiom of the Day
5. Daily Spoken Prompt (Conversation prompt matching the day's theme)
6. Daily Written Prompt (Journaling prompt matching the day's theme)

## Specifications & Requirements
1. **Local Midnight Rollover**:
   - Calculate user's current date as `YYYY-MM-DD` using client local time (`new Date().getFullYear()`, etc.).
   - Fetch static calendar files from COSYdata:
     `https://cosylanguages.github.io/COSYdata/daily/{lang}/calendar/{slot}/{YYYY-MM}.json`
     where slot ∈ `['word', 'phrasal_verb', 'collocation', 'idiom']`.
   - Set a `setTimeout` for `getMsUntilLocalMidnight()` to hot-refresh at 00:00:00 local time.
2. **CEFR Level Filter**:
   - Provide a CEFR selector tabs: `A0–A1`, `A2`, `B1–B2`, `C1–C2`.
   - Update cards instantly when the user switches levels.
3. **Creative WOTD Card**:
   - Display headword, phonetic transcription, part of speech, and definition.
   - For A0–A2: Display "Explain in your own words" creative practice bubble with a sample scaffold.
   - For B1–C2: Display "Synonym Challenge" interactive box prompting users to brainstorm synonyms before revealing dictionary synonyms.
4. **Cross-Repository Deep Linking**:
   - Add deep-link action buttons on each daily card:
     - "🎙️ Practice Speaking this prompt in COSYpractice" -> links to `https://cosylanguages.github.io/COSYpractice/?slot={slot}&id={id}&lang={lang}`
     - "✍️ Write & Review in COSYpractice" -> links to `https://cosylanguages.github.io/COSYpractice/?mode=writing&topic={theme}`
     - "🔎 Conjugate & Syntax in COSYtools" -> links to `https://cosylanguages.github.io/COSYtools/?word={verb_form}&lang={lang}`
5. **Ecosystem Strip Consistency**:
   - Use canonical tokens (`tokens.css`) and maintain the shared top ecosystem nav strip.
```

---

### Prompt 2: For `COSYpractice` (Daily Spoken & Written Interactive Lab)

```markdown
# TASK: Build Daily Spoken and Written Interactive Practice Modules in COSYpractice

## Objective
Implement daily practice rooms in COSYpractice that consume the daily feeds from COSYdata and connect with COSYlanguages and COSYtools:
1. Daily Spoken Practice (Speech Recording & AI Evaluation)
2. Daily Written Practice (Creative Paraphrasing & Synonym Challenge)

## Specifications & Requirements
1. **Daily Thematic Ingestion**:
   - Query COSYdata daily calendar endpoints for today's local date (`YYYY-MM-DD`):
     - `daily/{lang}/calendar/word/{YYYY-MM}.json`
     - `daily/{lang}/calendar/phrasal_verb/{YYYY-MM}.json`
     - `daily/{lang}/calendar/collocation/{YYYY-MM}.json`
     - `daily/{lang}/calendar/idiom/{YYYY-MM}.json`
     - `daily/{lang}/speaking.json` and `daily/{lang}/writing.json`
2. **Interactive Spoken Module (Daily Spoken)**:
   - Present today's speaking prompt.
   - Provide audio recording interface via MediaRecorder API or Web Speech API.
   - Challenge rule: Learner must incorporate today's Word of the Day or Phrasal Verb into their spoken response.
   - Real-time transcript feedback highlighting the target vocabulary term.
3. **Interactive Written Module (Daily Written & Creative WOTD)**:
   - Provide a text editor with two distinct modes based on CEFR level:
     - **Creative Paraphrase Sandbox (A0–B2)**: Learner writes their own definition/scenario without using the target word.
     - **Synonym Storm (B1–C2)**: Learner types as many synonyms as possible in 60 seconds. Provide live matching against COSYdata `synonyms` array.
4. **Cross-Repo Navigation**:
   - Link back to COSYlanguages daily strip for comprehensive cultural notes.
   - Link to COSYtools for verb conjugation and preposition drills for any verbs in the day's exercise.
   - Automatic local midnight rollover matching client timezone.
```

---

### Prompt 3: For `COSYtools` (Daily Verb Conjugator & Preposition Governance)

```markdown
# TASK: Implement Daily Verb Conjugation and Daily Verb + Preposition Modules in COSYtools

## Objective
Add daily grammar and syntax tools to COSYtools that link directly with COSYdata daily feeds and provide targeted drills for the verbs featured in COSYlanguages and COSYpractice.

## Specifications & Requirements
1. **Daily Verb Ingestion**:
   - Ingest today's Word of the Day (if verb) and Phrasal Verb of the Day from COSYdata:
     `https://cosylanguages.github.io/COSYdata/daily/{lang}/calendar/{slot}/{YYYY-MM}.json`
   - Match verb headword against COSYtools conjugation database (e.g., `shared/top10-verbs.json` or language conjugeurs: `fr-conjugeur`, `it-coniugatore`, `ru-spryazhenie`, `el-klisi-rimaton`, `en-irregular-verbs`).
2. **Daily Verb Conjugation Card**:
   - Showcase full conjugation table for the verb across key tenses (Present, Past/Preterite, Perfect, Future, Subjunctive/Conditional where applicable).
   - For English: Highlight irregular forms (`base`, `past_simple`, `past_participle`).
   - Interactive mini-drill: Fill in missing conjugated verb forms.
3. **Daily Verb + Preposition Governance Card**:
   - Feature today's verb preposition governance (e.g., *depend on*, *accuse of*, *s'intéresser à*, *abituarsi a*, *зависеть от*).
   - Display governed grammatical case (e.g., Russian *accusative* vs *genitive*, German *Dativ* vs *Akkusativ*).
   - Provide interactive 3-question preposition choice drill.
4. **Cross-Repository Ecosystem Integration**:
   - Include deep-link buttons:
     - "🎙️ Use in Daily Conversation (COSYlanguages)" -> `https://cosylanguages.github.io/COSYlanguages/?date={YYYY-MM-DD}`
     - "✍️ Practice in Context (COSYpractice)" -> `https://cosylanguages.github.io/COSYpractice/?verb={verb_id}`
   - Ensure local midnight rollover based on user's client-side date.
```
