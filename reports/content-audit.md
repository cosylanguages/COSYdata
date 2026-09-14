# English Vocabulary Dataset Content Audit Report

## Executive Summary

- **Dataset Location**: `vocabulary/en/`
- **Total Theme Files**: 92
- **Total Canonical Vocabulary Entries**: 7576
- **Total Unique IDs**: 7576
- **Current Duplicate IDs Across Theme Files**: 0
- **Templated Entries**: 7566 (99.87%)
- **Non-Templated Entries**: 10 (0.13%)
- **Merged Entries Requiring Content Review (Placeholder-Only)**: 583

---

## 1. Duplicate Entry IDs Across Theme Files

### Audit Summary & ID Collision Resolution

All **867 ID collisions** originally identified across theme files have been merged into single canonical entries per `word`+`form` ID.
Each canonical entry now:
- Retains the lowest CEFR level at which the word is introduced as its primary `level` field.
- Includes a `levels` array property containing all CEFR levels across which the word was present (e.g., `["B1", "B2"]`).
- Retains the richest non-placeholder definitions and examples where available.
- Resides in a single primary theme file, with all redundant duplicate copies removed.

**Current Duplicate IDs Remaining**: **0**

*(Zero duplicate IDs remain in the dataset. Validation strictly enforces unique IDs across theme files.)*

---

## 2. Entries Matching Templated Patterns

### Pattern Audit Results

- **Matching Templated Entries**: **7566** / 7576 (99.87%)
- **Non-Templated Entries**: **10** / 7576

### Identified Templated Patterns

The vast majority of entries in the dataset contain automatically generated placeholder strings for their first definition (`definitions[0]`) and/or first example sentence (`examples[0]`). The detected templated patterns include:

1. **Definition Patterns (`definitions[0]`)**:
   - `"[LEVEL] entry for \"[word]\" in English vocabulary."` (e.g. *"B1 entry for \"influence\" in English vocabulary."*)
   - `"[LEVEL] Spoken English entry for \"[word]\"."` (e.g. *"B1 Spoken English entry for \"hello\"."*)
   - `"Entry for \"[word]\" in general English vocabulary."`
   - `"Spoken English entry for \"[word]\"."`

2. **Example Sentence Patterns (`examples[0]`)**:
   - `"This is an example sentence using \"[word]\"."` (e.g. *"This is an example sentence using \"influence\"."*)
   - `"[LEVEL] spoken usage example with \"[word]\"."`
   - `"Spoken usage example with \"[word]\"."`
   - `"Example usage of \"[word]\"."`

### Exceptions (Non-Templated Entries)

Only **10 entries** across the entire dataset contain genuine, human-authored definitions and examples (located in `animals.json`):

- **`en:cat:noun`** in `animals.json`:
  - *Definition*: "A small domesticated carnivorous mammal with soft fur, a short snout, and retractile claws."
  - *Example*: "The cat slept peacefully on the sunny windowsill."
- **`en:dog:noun`** in `animals.json`:
  - *Definition*: "A domesticated carnivorous mammal that typically has a long snout, an acute sense of smell, and a barking voice."
  - *Example*: "My dog loves running after tennis balls in the park."
- **`en:cow:noun`** in `animals.json`:
  - *Definition*: "A fully grown female animal of a bovine farm species, kept for producing milk or meat."
  - *Example*: "The cow was grazing peacefully in the green field."
- **`en:horse:noun`** in `animals.json`:
  - *Definition*: "A large plant-eating domesticated mammal with solid hooves and a flowing mane and tail, used for riding and hauling."
  - *Example*: "He rode his horse along the mountain trail."
- **`en:bird:noun`** in `animals.json`:
  - *Definition*: "A warm-blooded egg-laying vertebrate animal distinguished by the possession of feathers, wings, and a beak."
  - *Example*: "A colourful bird sang sweet songs in the oak tree."
- **`en:fish:noun`** in `animals.json`:
  - *Definition*: "A limbless cold-blooded vertebrate animal with gills and fins living wholly in water."
  - *Example*: "We saw bright gold fish swimming in the garden pond."
- **`en:mouse:noun`** in `animals.json`:
  - *Definition*: "A small rodent that typically has a pointed snout, relatively large ears and eyes, and a long tail."
  - *Example*: "The little mouse nibbled quietly on a piece of cheese."
- **`en:pig:noun`** in `animals.json`:
  - *Definition*: "An omnivorous domesticated hoofed mammal with a sparse bristly coat and a flat snout."
  - *Example*: "The pig enjoyed splashing in the cool mud on a warm day."
- **`en:sheep:noun`** in `animals.json`:
  - *Definition*: "A domesticated ruminant mammal with a thick woolly coat, kept for its wool or meat."
  - *Example*: "A flock of white sheep grazed on the grassy hillside."
- **`en:hen:noun`** in `animals.json`:
  - *Definition*: "A female bird, especially of a domestic fowl."
  - *Example*: "The hen laid a fresh brown egg in her nest."

---

## 3. Templated Entry Counts Breakdown

### 3.1 Breakdown by CEFR Level

| CEFR Level | Templated Entries Count | Percentage of Templated Total | Percentage of All Entries |
|------------|------------------------|------------------------------|--------------------------|
| **A0** | 280 | 3.70% | 3.70% |
| **A1** | 1,291 | 17.06% | 17.04% |
| **A2** | 1,361 | 17.99% | 17.96% |
| **B1** | 1,354 | 17.90% | 17.87% |
| **B2** | 1,277 | 16.88% | 16.86% |
| **C1** | 1,052 | 13.90% | 13.89% |
| **C2** | 951 | 12.57% | 12.55% |
| **Total** | **7,566** | **100.00%** | **99.87%** |

### 3.2 Breakdown by Theme File and CEFR Level

| Theme File | A0 | A1 | A2 | B1 | B2 | C1 | C2 | Total Templated | Total File Entries |
|------------|----|----|----|----|----|----|----|-----------------|--------------------|
| `abstract_concepts.json` | 0 | 0 | 0 | 35 | 0 | 0 | 0 | **35** | 35 |
| `abstract_nouns.json` | 0 | 0 | 34 | 9 | 0 | 26 | 113 | **182** | 182 |
| `academic_vocabulary.json` | 0 | 0 | 0 | 0 | 29 | 29 | 28 | **86** | 86 |
| `adjectives.json` | 0 | 69 | 0 | 0 | 0 | 0 | 0 | **69** | 69 |
| `advanced_verbs.json` | 0 | 0 | 0 | 0 | 22 | 0 | 0 | **22** | 22 |
| `adverbs_connectors.json` | 4 | 46 | 19 | 0 | 0 | 0 | 0 | **69** | 69 |
| `animals.json` | 7 | 51 | 46 | 0 | 0 | 0 | 0 | **104** | 114 |
| `appearance.json` | 0 | 0 | 28 | 0 | 0 | 0 | 0 | **28** | 28 |
| `arts.json` | 0 | 0 | 0 | 0 | 0 | 17 | 0 | **17** | 17 |
| `auxiliary_verbs.json` | 0 | 23 | 0 | 0 | 0 | 0 | 0 | **23** | 23 |
| `body_health.json` | 1 | 51 | 0 | 0 | 0 | 0 | 0 | **52** | 52 |
| `business.json` | 0 | 0 | 0 | 0 | 0 | 47 | 0 | **47** | 47 |
| `cause_effect.json` | 0 | 0 | 0 | 15 | 0 | 0 | 0 | **15** | 15 |
| `classroom_phrases.json` | 0 | 54 | 0 | 0 | 0 | 0 | 0 | **54** | 54 |
| `clothes.json` | 8 | 31 | 0 | 0 | 0 | 0 | 0 | **39** | 39 |
| `collocations.json` | 0 | 0 | 0 | 56 | 52 | 59 | 0 | **167** | 167 |
| `colors.json` | 4 | 18 | 0 | 0 | 0 | 0 | 0 | **22** | 22 |
| `common_nouns.json` | 6 | 55 | 15 | 0 | 0 | 0 | 0 | **76** | 76 |
| `communication.json` | 0 | 0 | 28 | 20 | 37 | 31 | 16 | **132** | 132 |
| `comparisons.json` | 0 | 0 | 49 | 22 | 19 | 23 | 0 | **113** | 113 |
| `conflict.json` | 0 | 0 | 0 | 0 | 0 | 15 | 0 | **15** | 15 |
| `consumer_items.json` | 0 | 0 | 18 | 0 | 0 | 0 | 0 | **18** | 18 |
| `cooking.json` | 0 | 0 | 51 | 0 | 0 | 0 | 0 | **51** | 51 |
| `crime.json` | 0 | 0 | 32 | 17 | 18 | 14 | 0 | **81** | 81 |
| `culture.json` | 0 | 0 | 22 | 36 | 19 | 0 | 0 | **77** | 77 |
| `daily_verbs.json` | 0 | 74 | 0 | 0 | 0 | 0 | 0 | **74** | 74 |
| `directions.json` | 14 | 31 | 18 | 0 | 0 | 0 | 0 | **63** | 63 |
| `economy.json` | 0 | 0 | 0 | 43 | 57 | 16 | 35 | **151** | 151 |
| `education.json` | 0 | 0 | 39 | 41 | 42 | 13 | 0 | **135** | 135 |
| `emotions.json` | 0 | 0 | 21 | 42 | 26 | 21 | 12 | **122** | 122 |
| `environment.json` | 0 | 0 | 36 | 42 | 44 | 30 | 0 | **152** | 152 |
| `ethics.json` | 0 | 0 | 0 | 24 | 39 | 17 | 42 | **122** | 122 |
| `expressions.json` | 87 | 30 | 122 | 40 | 30 | 0 | 0 | **309** | 309 |
| `family.json` | 33 | 40 | 0 | 30 | 0 | 0 | 16 | **119** | 119 |
| `feelings.json` | 3 | 15 | 35 | 0 | 0 | 0 | 0 | **53** | 53 |
| `food_drink.json` | 5 | 66 | 0 | 0 | 0 | 0 | 0 | **71** | 71 |
| `food_health.json` | 0 | 0 | 0 | 23 | 0 | 0 | 0 | **23** | 23 |
| `general_adjectives.json` | 4 | 34 | 60 | 0 | 47 | 0 | 0 | **145** | 145 |
| `geography.json` | 0 | 28 | 0 | 30 | 0 | 0 | 0 | **58** | 58 |
| `global_issues.json` | 0 | 0 | 0 | 13 | 16 | 0 | 0 | **29** | 29 |
| `grammar.json` | 0 | 0 | 0 | 37 | 0 | 0 | 0 | **37** | 37 |
| `health.json` | 0 | 0 | 50 | 42 | 43 | 23 | 0 | **158** | 158 |
| `house_furniture.json` | 5 | 55 | 0 | 0 | 0 | 0 | 0 | **60** | 60 |
| `idioms.json` | 0 | 0 | 0 | 65 | 86 | 121 | 91 | **363** | 363 |
| `innovation.json` | 0 | 0 | 0 | 0 | 19 | 0 | 0 | **19** | 19 |
| `jobs.json` | 13 | 31 | 0 | 0 | 0 | 0 | 0 | **44** | 44 |
| `lifestyle.json` | 0 | 0 | 20 | 0 | 18 | 0 | 0 | **38** | 38 |
| `linking_words.json` | 0 | 0 | 19 | 20 | 49 | 49 | 48 | **185** | 185 |
| `literary_devices.json` | 0 | 0 | 0 | 0 | 0 | 0 | 19 | **19** | 19 |
| `living.json` | 0 | 0 | 44 | 0 | 0 | 0 | 0 | **44** | 44 |
| `measurement.json` | 0 | 19 | 40 | 0 | 0 | 0 | 0 | **59** | 59 |
| `media.json` | 0 | 0 | 44 | 48 | 38 | 33 | 14 | **177** | 177 |
| `migration.json` | 0 | 0 | 0 | 0 | 15 | 0 | 0 | **15** | 15 |
| `money_shopping.json` | 0 | 17 | 0 | 0 | 0 | 0 | 0 | **17** | 17 |
| `nationalities.json` | 3 | 15 | 0 | 0 | 0 | 0 | 0 | **18** | 18 |
| `nature.json` | 0 | 0 | 0 | 0 | 17 | 0 | 0 | **17** | 17 |
| `nuanced_verbs.json` | 0 | 0 | 0 | 0 | 0 | 34 | 0 | **34** | 34 |
| `numbers.json` | 3 | 52 | 0 | 0 | 0 | 0 | 0 | **55** | 55 |
| `objects.json` | 1 | 47 | 0 | 0 | 0 | 0 | 0 | **48** | 48 |
| `opinions.json` | 0 | 0 | 50 | 78 | 63 | 20 | 0 | **211** | 211 |
| `personality.json` | 0 | 0 | 46 | 22 | 33 | 20 | 0 | **121** | 121 |
| `phrasal_verbs.json` | 0 | 0 | 47 | 63 | 70 | 42 | 0 | **222** | 222 |
| `places_transport.json` | 10 | 46 | 29 | 0 | 0 | 0 | 0 | **85** | 85 |
| `politics.json` | 0 | 0 | 0 | 34 | 32 | 45 | 53 | **164** | 164 |
| `prepositions.json` | 4 | 18 | 0 | 0 | 0 | 0 | 0 | **22** | 22 |
| `pronouns.json` | 15 | 35 | 0 | 0 | 0 | 0 | 0 | **50** | 50 |
| `psychology.json` | 0 | 0 | 0 | 0 | 38 | 34 | 20 | **92** | 92 |
| `rare_adjectives.json` | 0 | 0 | 0 | 0 | 0 | 0 | 174 | **174** | 174 |
| `rare_verbs.json` | 0 | 0 | 0 | 0 | 0 | 0 | 148 | **148** | 148 |
| `register.json` | 0 | 0 | 0 | 30 | 34 | 37 | 30 | **131** | 131 |
| `relationships.json` | 0 | 0 | 50 | 41 | 43 | 0 | 11 | **145** | 145 |
| `rhetoric.json` | 0 | 0 | 0 | 0 | 0 | 18 | 38 | **56** | 56 |
| `school.json` | 4 | 32 | 0 | 0 | 0 | 0 | 0 | **36** | 36 |
| `science.json` | 0 | 0 | 0 | 27 | 41 | 33 | 0 | **101** | 101 |
| `shapes_materials.json` | 0 | 20 | 0 | 0 | 0 | 0 | 0 | **20** | 20 |
| `shopping.json` | 1 | 0 | 48 | 0 | 0 | 0 | 0 | **49** | 49 |
| `society.json` | 0 | 0 | 0 | 33 | 22 | 33 | 20 | **108** | 108 |
| `sophisticated_adjectives.json` | 0 | 0 | 0 | 0 | 0 | 68 | 0 | **68** | 68 |
| `sports.json` | 0 | 0 | 11 | 22 | 0 | 0 | 0 | **33** | 33 |
| `sports_hobbies.json` | 4 | 30 | 42 | 0 | 0 | 0 | 0 | **76** | 76 |
| `statistics.json` | 0 | 0 | 0 | 48 | 20 | 0 | 0 | **68** | 68 |
| `synonyms.json` | 0 | 0 | 0 | 0 | 0 | 36 | 23 | **59** | 59 |
| `technology.json` | 4 | 25 | 0 | 40 | 0 | 0 | 0 | **69** | 69 |
| `time.json` | 4 | 60 | 29 | 38 | 18 | 17 | 0 | **166** | 166 |
| `tourism.json` | 0 | 0 | 49 | 0 | 0 | 0 | 0 | **49** | 49 |
| `transport.json` | 5 | 0 | 17 | 0 | 0 | 0 | 0 | **22** | 22 |
| `urban_housing.json` | 0 | 0 | 0 | 18 | 16 | 0 | 0 | **34** | 34 |
| `verbs.json` | 27 | 69 | 0 | 18 | 0 | 0 | 0 | **114** | 114 |
| `verbs_cognition.json` | 0 | 0 | 0 | 14 | 0 | 0 | 0 | **14** | 14 |
| `weather.json` | 1 | 4 | 14 | 0 | 0 | 0 | 0 | **19** | 19 |
| `word_building.json` | 0 | 0 | 0 | 36 | 18 | 16 | 0 | **70** | 70 |
| `work.json` | 0 | 0 | 39 | 42 | 47 | 15 | 0 | **143** | 143 |

---

## 4. Theme Field and Topic Mismatches

This section details entries where the `theme` JSON field value or word concept does not match the file's primary topic or filename.

### 4.1 Off-Topic & Misplaced Entries in `animals.json`

`animals.json` contains 116 total entries. Of these, only 68 are animals with `theme: "animals"`. The remaining 48 entries are landscape/nature concepts tagged with `theme: "nature"`. Furthermore, multiple non-animal nature and weather terms are erroneously tagged with `theme: "animals"`.

1. **Entries with `theme: "animals"` that are Weather / Astronomy / Landscape concepts**:
   - **Weather / Astronomy**: `en:weather:noun` (weather), `en:moon:noun` (moon), `en:cloud:noun` (cloud), `en:sky:noun` (sky), `en:sun:noun` (sun), `en:star:noun` (star), `en:rain:noun` (rain), `en:snow:noun` (snow), `en:wind:noun` (wind), `en:storm:noun` (storm), `en:sunny:adjective`, `en:rainy:adjective`, `en:cloudy:adjective`, `en:windy:adjective`, `en:snowy:adjective`, `en:hot:adjective`, `en:cold:adjective`, `en:warm:adjective`, `en:cool:adjective`.
   - **Flora & Landscape**: `en:tree:noun`, `en:stone:noun`, `en:flower:noun`, `en:grass:noun`, `en:leaf:noun`, `en:leaves:noun`, `en:forest:noun`, `en:wood:noun`, `en:mountain:noun`, `en:hill:noun`, `en:river:noun`, `en:lake:noun`, `en:sea:noun`, `en:ocean:noun`, `en:beach:noun`, `en:island:noun`, `en:earth:noun`, `en:nature:noun`, `en:rock:noun`, `en:sand:noun`.

2. **48 Entries tagged with `theme: "nature"` placed inside `animals.json`**:
   - `view`, `landscape`, `wildlife`, `habitat`, `species`, `mammal`, `reptile`, `insect`, `amphibian`, `predator`, `prey`, `nest`, `cave`, `burrow`, `jungle`, `desert`, `valley`, `cliff`, `waterfall`, `volcano`, `tide`, `wave`, `current`, `branch`, `root`, `seed`, `bloom`, `blossom`, `breed`, `migrate`, `hibernate`, `pet`, `pond`, `stream`, `countryside`, `scenery`, `coast`, `wing`, `tail`, `paw`, `fur`, `feather`, `cage`, `wild`, `tame`, `pet-shop`, `veterinarian`, `vet`.

### 4.2 Theme Field Mismatches in `environment.json`

While 163 entries in `environment.json` have `theme: "environment"`, **7 entries** have `theme: "society"`:
- `en:headline:noun` (headline)
- `en:reporter:noun` (reporter)
- `en:climate-change:noun` (climate change)
- `en:global-warming:noun` (global warming)
- `en:nature-reserve:noun` (nature reserve)
- `en:natural-disaster:noun` (natural disaster)
- `en:mayor:noun` (mayor)

### 4.3 Theme Field Mismatches in `media.json`

While 146 entries in `media.json` have `theme: "media"`, **54 entries** have `theme: "technology"`:
- Tech / Software terms: `website`, `app`, `application`, `download`, `upload`, `social`, `media`, `internet`, `connection`, `wifi`, `password`, `username`, `account`, `update`, `install`, `device`, `gadget`, `newspaper`, `magazine`, `article`, `news`, `channel`, `program`, `programme`, `advertisement`, `advert`, `commercial`, `subscribe`, `follow`, `like`, `share`, `comment`, `online`, `offline`, `data`, `file`, `folder`, `search`, `engine`, `browser`, `social-media`, `profile`, `subscriber`, `uninstall`, `settings`, `memory`, `plug-in`, `connect`, `signal`, `hack`, `spam`, `search-engine`, `link`, `document`.

### 4.4 Macro-Taxonomy Theme Mappings Across All Theme Files

Across the 92 theme files, many JSON files use broader taxonomy categories for their `theme` attribute rather than the specific filename topic. Below is a summary table of all theme files and the entry `theme` field values present in each file:

| Theme File | Total Entries | Entry `theme` Values Present & Counts |
|------------|---------------|----------------------------------------|
| `abstract_concepts.json` | 35 | `concepts`: 35 |
| `abstract_nouns.json` | 182 | `concepts`: 139, `general`: 43 |
| `academic_vocabulary.json` | 86 | `academic`: 86 |
| `adjectives.json` | 69 | `descriptors`: 69 |
| `advanced_verbs.json` | 22 | `actions`: 22 |
| `adverbs_connectors.json` | 69 | `grammar`: 69 |
| `animals.json` | 114 | `animals`: 68, `nature`: 46 |
| `appearance.json` | 28 | `appearance`: 28 |
| `arts.json` | 17 | `arts`: 17 |
| `auxiliary_verbs.json` | 23 | `grammar`: 23 |
| `body_health.json` | 52 | `health`: 52 |
| `business.json` | 47 | `business`: 47 |
| `cause_effect.json` | 15 | `concepts`: 15 |
| `classroom_phrases.json` | 54 | `education`: 54 |
| `clothes.json` | 39 | `clothing`: 39 |
| `collocations.json` | 167 | `communication`: 167 |
| `colors.json` | 22 | `colors`: 22 |
| `common_nouns.json` | 76 | `general`: 76 |
| `communication.json` | 132 | `communication`: 132 |
| `comparisons.json` | 113 | `grammar`: 113 |
| `conflict.json` | 15 | `politics`: 15 |
| `consumer_items.json` | 18 | `shopping`: 18 |
| `cooking.json` | 51 | `food`: 51 |
| `crime.json` | 81 | `law`: 81 |
| `culture.json` | 77 | `culture`: 77 |
| `daily_verbs.json` | 74 | `activities`: 74 |
| `directions.json` | 63 | `navigation`: 63 |
| `economy.json` | 151 | `business`: 151 |
| `education.json` | 135 | `education`: 135 |
| `emotions.json` | 122 | `emotions`: 122 |
| `environment.json` | 152 | `environment`: 145, `society`: 7 |
| `ethics.json` | 122 | `ethics`: 122 |
| `expressions.json` | 309 | `communication`: 286, `grammar`: 23 |
| `family.json` | 119 | `family`: 119 |
| `feelings.json` | 53 | `emotions`: 53 |
| `food_drink.json` | 71 | `food`: 71 |
| `food_health.json` | 23 | `health`: 23 |
| `general_adjectives.json` | 145 | `descriptors`: 145 |
| `geography.json` | 58 | `geography`: 58 |
| `global_issues.json` | 29 | `politics`: 29 |
| `grammar.json` | 37 | `grammar`: 37 |
| `health.json` | 158 | `health`: 158 |
| `house_furniture.json` | 60 | `housing`: 60 |
| `idioms.json` | 363 | `communication`: 363 |
| `innovation.json` | 19 | `business`: 19 |
| `jobs.json` | 44 | `work`: 44 |
| `lifestyle.json` | 38 | `lifestyle`: 38 |
| `linking_words.json` | 185 | `grammar`: 185 |
| `literary_devices.json` | 19 | `media`: 19 |
| `living.json` | 44 | `housing`: 44 |
| `measurement.json` | 59 | `measurement`: 59 |
| `media.json` | 177 | `technology`: 44, `media`: 133 |
| `migration.json` | 15 | `society`: 15 |
| `money_shopping.json` | 17 | `shopping`: 17 |
| `nationalities.json` | 18 | `geography`: 18 |
| `nature.json` | 17 | `nature`: 17 |
| `nuanced_verbs.json` | 34 | `actions`: 34 |
| `numbers.json` | 55 | `numbers`: 55 |
| `objects.json` | 48 | `objects`: 48 |
| `opinions.json` | 211 | `communication`: 211 |
| `personality.json` | 121 | `personality`: 121 |
| `phrasal_verbs.json` | 222 | `actions`: 222 |
| `places_transport.json` | 85 | `travel`: 56, `places`: 29 |
| `politics.json` | 164 | `politics`: 164 |
| `prepositions.json` | 22 | `grammar`: 22 |
| `pronouns.json` | 50 | `grammar`: 50 |
| `psychology.json` | 92 | `psychology`: 92 |
| `rare_adjectives.json` | 174 | `descriptors`: 174 |
| `rare_verbs.json` | 148 | `actions`: 148 |
| `register.json` | 131 | `communication`: 131 |
| `relationships.json` | 145 | `relationships`: 145 |
| `rhetoric.json` | 56 | `communication`: 56 |
| `school.json` | 36 | `education`: 36 |
| `science.json` | 101 | `science`: 101 |
| `shapes_materials.json` | 20 | `shapes`: 20 |
| `shopping.json` | 49 | `shopping`: 49 |
| `society.json` | 108 | `society`: 108 |
| `sophisticated_adjectives.json` | 68 | `descriptors`: 68 |
| `sports.json` | 33 | `sports`: 33 |
| `sports_hobbies.json` | 76 | `leisure`: 76 |
| `statistics.json` | 68 | `statistics`: 68 |
| `synonyms.json` | 59 | `descriptors`: 59 |
| `technology.json` | 69 | `technology`: 69 |
| `time.json` | 166 | `time`: 166 |
| `tourism.json` | 49 | `travel`: 49 |
| `transport.json` | 22 | `transport`: 22 |
| `urban_housing.json` | 34 | `housing`: 34 |
| `verbs.json` | 114 | `actions`: 96, `communication`: 18 |
| `verbs_cognition.json` | 14 | `cognition`: 14 |
| `weather.json` | 19 | `weather`: 19 |
| `word_building.json` | 70 | `grammar`: 70 |
| `work.json` | 143 | `work`: 143 |

---

## 5. Follow-up List: Merged Entries Requiring Human Definition Review

The following **583 merged entries** were created by consolidating multi-level ID collisions, but currently possess only placeholder definitions and examples. Content editors should review and replace these placeholder definitions/examples with rich, human-authored content:

- **`en:a:article`** (word: "a") in `measurement.json` | Intro Level: `A2` | All Levels: `[A2, B1, B2, C1]`
- **`en:about:preposition`** (word: "about") in `prepositions.json` | Intro Level: `A1` | All Levels: `[A1, A2, B1]`
- **`en:accountability:noun`** (word: "accountability") in `ethics.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:acknowledge:verb`** (word: "acknowledge") in `opinions.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:actor:noun`** (word: "actor") in `jobs.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:advantage:noun`** (word: "advantage") in `abstract_nouns.json` | Intro Level: `A2` | All Levels: `[A2, B2]`
- **`en:after:preposition`** (word: "after") in `adverbs_connectors.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:agree:verb`** (word: "agree") in `daily_verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:agreement:noun`** (word: "agreement") in `living.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:airport:noun`** (word: "airport") in `places_transport.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:algorithm:noun`** (word: "algorithm") in `technology.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:all:adverb`** (word: "all") in `adverbs_connectors.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:although:conjunction`** (word: "although") in `adverbs_connectors.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:ambiguous:adjective`** (word: "ambiguous") in `communication.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:ameliorate:verb`** (word: "ameliorate") in `nuanced_verbs.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:an:article`** (word: "an") in `idioms.json` | Intro Level: `B1` | All Levels: `[B1, C1]`
- **`en:analyse:verb`** (word: "analyse") in `education.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:analysis:noun`** (word: "analysis") in `science.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:analyze:verb`** (word: "analyze") in `science.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:ancient:adjective`** (word: "ancient") in `general_adjectives.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:and:conjunction`** (word: "and") in `adverbs_connectors.json` | Intro Level: `A1` | All Levels: `[A1, B2, C2]`
- **`en:angry:adjective`** (word: "angry") in `adjectives.json` | Intro Level: `A1` | All Levels: `[A1, C1]`
- **`en:anomaly:noun`** (word: "anomaly") in `statistics.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:anticipate:verb`** (word: "anticipate") in `verbs_cognition.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:apologize:verb`** (word: "apologize") in `daily_verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:approach:noun`** (word: "approach") in `abstract_concepts.json` | Intro Level: `B1` | All Levels: `[B1, B2, C1]`
- **`en:approximately:noun`** (word: "approximately") in `measurement.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:archetype:noun`** (word: "archetype") in `media.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:argue:verb`** (word: "argue") in `daily_verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2, B1]`
- **`en:argument:noun`** (word: "argument") in `communication.json` | Intro Level: `A2` | All Levels: `[A2, C1]`
- **`en:art:noun`** (word: "art") in `school.json` | Intro Level: `A1` | All Levels: `[A1, C1]`
- **`en:articulate:verb`** (word: "articulate") in `advanced_verbs.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:as:phrase`** (word: "as") in `classroom_phrases.json` | Intro Level: `A1` | All Levels: `[A1, B2]`
- **`en:assert:verb`** (word: "assert") in `opinions.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:assumption:noun`** (word: "assumption") in `abstract_concepts.json` | Intro Level: `B1` | All Levels: `[B1, C1]`
- **`en:asylum:noun`** (word: "asylum") in `society.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:at:preposition`** (word: "at") in `prepositions.json` | Intro Level: `A1` | All Levels: `[A1, B1, C1, C2]`
- **`en:attitude:noun`** (word: "attitude") in `abstract_nouns.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:autonomy:noun`** (word: "autonomy") in `ethics.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:avant-garde:noun`** (word: "avant-garde") in `media.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:average:noun`** (word: "average") in `measurement.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:awareness:noun`** (word: "awareness") in `environment.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:bake:verb`** (word: "bake") in `daily_verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:balance:noun`** (word: "balance") in `lifestyle.json` | Intro Level: `A2` | All Levels: `[A2, B2]`
- **`en:balanced:adjective`** (word: "balanced") in `health.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:be:phrase`** (word: "be") in `classroom_phrases.json` | Intro Level: `A1` | All Levels: `[A1, C1]`
- **`en:beautiful:adjective`** (word: "beautiful") in `adjectives.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:behavior:noun`** (word: "behavior") in `abstract_nouns.json` | Intro Level: `A2` | All Levels: `[A2, B2]`
- **`en:behaviour:noun`** (word: "behaviour") in `abstract_nouns.json` | Intro Level: `A2` | All Levels: `[A2, B2]`
- **`en:belief:noun`** (word: "belief") in `culture.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:belt:noun`** (word: "belt") in `clothes.json` | Intro Level: `A1` | All Levels: `[A1, B2]`
- **`en:between:preposition`** (word: "between") in `directions.json` | Intro Level: `A1` | All Levels: `[A1, C1]`
- **`en:bias:noun`** (word: "bias") in `ethics.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:big:adjective`** (word: "big") in `adjectives.json` | Intro Level: `A1` | All Levels: `[A1, C1]`
- **`en:bill:noun`** (word: "bill") in `food_drink.json` | Intro Level: `A1` | All Levels: `[A1, A2, B2]`
- **`en:biodiversity:noun`** (word: "biodiversity") in `environment.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:board:noun`** (word: "board") in `school.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:boil:verb`** (word: "boil") in `daily_verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:book:noun`** (word: "book") in `school.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:border:noun`** (word: "border") in `geography.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:boundaries:noun`** (word: "boundaries") in `relationships.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:brand:noun`** (word: "brand") in `shopping.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:break:verb`** (word: "break") in `verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2, B1]`
- **`en:budget:noun`** (word: "budget") in `shopping.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:bus:noun`** (word: "bus") in `places_transport.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:but:conjunction`** (word: "but") in `adverbs_connectors.json` | Intro Level: `A1` | All Levels: `[A1, A2, B1]`
- **`en:by:preposition`** (word: "by") in `prepositions.json` | Intro Level: `A1` | All Levels: `[A1, B2, C2]`
- **`en:calm:adjective`** (word: "calm") in `feelings.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:can:phrase`** (word: "can") in `expressions.json` | Intro Level: `A1` | All Levels: `[A1, C1]`
- **`en:capital:noun`** (word: "capital") in `geography.json` | Intro Level: `A1` | All Levels: `[A1, B2, C1]`
- **`en:capitulate:verb`** (word: "capitulate") in `nuanced_verbs.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:capricious:adjective`** (word: "capricious") in `sophisticated_adjectives.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:carbon:noun`** (word: "carbon") in `environment.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:card:noun`** (word: "card") in `money_shopping.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:careful:adjective`** (word: "careful") in `personality.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:careless:adjective`** (word: "careless") in `personality.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:carry:verb`** (word: "carry") in `daily_verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:cash:noun`** (word: "cash") in `money_shopping.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:catch:verb`** (word: "catch") in `daily_verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2, B1]`
- **`en:ceiling:noun`** (word: "ceiling") in `house_furniture.json` | Intro Level: `A1` | All Levels: `[A1, B2]`
- **`en:championship:noun`** (word: "championship") in `sports_hobbies.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:choose:verb`** (word: "choose") in `verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:circumvent:verb`** (word: "circumvent") in `nuanced_verbs.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:city:noun`** (word: "city") in `geography.json` | Intro Level: `A1` | All Levels: `[A1, B2]`
- **`en:class:noun`** (word: "class") in `school.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:clean:adjective`** (word: "clean") in `adjectives.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:climate:noun`** (word: "climate") in `weather.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:clock:noun`** (word: "clock") in `house_furniture.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:cloud:noun`** (word: "cloud") in `animals.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:club:noun`** (word: "club") in `common_nouns.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:coach:verb`** (word: "coach") in `sports_hobbies.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:coalesce:verb`** (word: "coalesce") in `nuanced_verbs.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:coherence:noun`** (word: "coherence") in `academic_vocabulary.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:college:noun`** (word: "college") in `places_transport.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:come:phrase`** (word: "come") in `collocations.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:come:verb`** (word: "come") in `classroom_phrases.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:comfortable:adjective`** (word: "comfortable") in `feelings.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:community:noun`** (word: "community") in `abstract_nouns.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:company:noun`** (word: "company") in `jobs.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:compare:verb`** (word: "compare") in `opinions.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:competition:noun`** (word: "competition") in `sports_hobbies.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:concept:noun`** (word: "concept") in `abstract_concepts.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:condition:noun`** (word: "condition") in `abstract_nouns.json` | Intro Level: `A2` | All Levels: `[A2, B2]`
- **`en:conditioning:noun`** (word: "conditioning") in `living.json` | Intro Level: `A2` | All Levels: `[A2, B2]`
- **`en:conflate:verb`** (word: "conflate") in `nuanced_verbs.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:conflict:noun`** (word: "conflict") in `global_issues.json` | Intro Level: `B1` | All Levels: `[B1, C1]`
- **`en:connotation:noun`** (word: "connotation") in `communication.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:consciousness:noun`** (word: "consciousness") in `ethics.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:consequence:noun`** (word: "consequence") in `abstract_nouns.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:conservation:noun`** (word: "conservation") in `environment.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:contend:verb`** (word: "contend") in `opinions.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:content:adjective`** (word: "content") in `emotions.json` | Intro Level: `A2` | All Levels: `[A2, C1]`
- **`en:context:noun`** (word: "context") in `communication.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:contract:noun`** (word: "contract") in `work.json` | Intro Level: `A2` | All Levels: `[A2, C1]`
- **`en:control:noun`** (word: "control") in `science.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:controversial:adjective`** (word: "controversial") in `opinions.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:corporation:noun`** (word: "corporation") in `economy.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:could:phrase`** (word: "could") in `register.json` | Intro Level: `B1` | All Levels: `[B1, C2]`
- **`en:course:phrase`** (word: "course") in `classroom_phrases.json` | Intro Level: `A1` | All Levels: `[A1, B2, C2]`
- **`en:creative:noun`** (word: "creative") in `arts.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:crisis:noun`** (word: "crisis") in `environment.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:critical:adjective`** (word: "critical") in `education.json` | Intro Level: `B1` | All Levels: `[B1, C1]`
- **`en:cultural:noun`** (word: "cultural") in `global_issues.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:culture:noun`** (word: "culture") in `common_nouns.json` | Intro Level: `A1` | All Levels: `[A1, B1, B2, C1]`
- **`en:custom:noun`** (word: "custom") in `common_nouns.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:damage:noun`** (word: "damage") in `geography.json` | Intro Level: `B1` | All Levels: `[B1, C1]`
- **`en:data:noun`** (word: "data") in `media.json` | Intro Level: `A2` | All Levels: `[A2, B1, B2]`
- **`en:date:verb`** (word: "date") in `time.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:day:noun`** (word: "day") in `time.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:debt:noun`** (word: "debt") in `shopping.json` | Intro Level: `A2` | All Levels: `[A2, B2]`
- **`en:decide:verb`** (word: "decide") in `verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:decorate:verb`** (word: "decorate") in `daily_verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:defence:noun`** (word: "defence") in `politics.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:defense:noun`** (word: "defense") in `politics.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:degree:noun`** (word: "degree") in `weather.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:delineate:verb`** (word: "delineate") in `academic_vocabulary.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:demonstrate:verb`** (word: "demonstrate") in `advanced_verbs.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:denouement:noun`** (word: "denouement") in `media.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:depression:noun`** (word: "depression") in `health.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:destruction:noun`** (word: "destruction") in `geography.json` | Intro Level: `B1` | All Levels: `[B1, B2, C2]`
- **`en:determinism:noun`** (word: "determinism") in `ethics.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:development:noun`** (word: "development") in `science.json` | Intro Level: `B1` | All Levels: `[B1, B2, C1]`
- **`en:device:noun`** (word: "device") in `media.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:diet:noun`** (word: "diet") in `health.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:difference:verb`** (word: "difference") in `opinions.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:diligence:noun`** (word: "diligence") in `business.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:diplomacy:noun`** (word: "diplomacy") in `global_issues.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:disagree:verb`** (word: "disagree") in `daily_verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:dishonest:adjective`** (word: "dishonest") in `personality.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:disruptive:adjective`** (word: "disruptive") in `science.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:dissonance:noun`** (word: "dissonance") in `psychology.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:distance:noun`** (word: "distance") in `measurement.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:diversity:noun`** (word: "diversity") in `culture.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:doctor:noun`** (word: "doctor") in `body_health.json` | Intro Level: `A1` | All Levels: `[A1, C1]`
- **`en:double-edged:phrase`** (word: "double-edged") in `collocations.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:double:noun`** (word: "double") in `measurement.json` | Intro Level: `A2` | All Levels: `[A2, C2]`
- **`en:down:preposition`** (word: "down") in `classroom_phrases.json` | Intro Level: `A1` | All Levels: `[A1, A2, C2]`
- **`en:draw:noun`** (word: "draw") in `sports.json` | Intro Level: `B1` | All Levels: `[B1, C1]`
- **`en:draw:phrase`** (word: "draw") in `collocations.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:dress:noun`** (word: "dress") in `clothes.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:drop:verb`** (word: "drop") in `daily_verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:drought:noun`** (word: "drought") in `environment.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:due:noun`** (word: "due") in `cause_effect.json` | Intro Level: `B1` | All Levels: `[B1, B2, C1]`
- **`en:duty:noun`** (word: "duty") in `work.json` | Intro Level: `A2` | All Levels: `[A2, C1]`
- **`en:early:noun`** (word: "early") in `time.json` | Intro Level: `A1` | All Levels: `[A1, B2]`
- **`en:earthquake:noun`** (word: "earthquake") in `environment.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:economy:noun`** (word: "economy") in `abstract_nouns.json` | Intro Level: `A2` | All Levels: `[A2, B1, B2]`
- **`en:ecosystem:noun`** (word: "ecosystem") in `environment.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:effect:noun`** (word: "effect") in `abstract_nouns.json` | Intro Level: `A2` | All Levels: `[A2, B1, B2]`
- **`en:empirical:adjective`** (word: "empirical") in `science.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:employee:noun`** (word: "employee") in `jobs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:end:verb`** (word: "end") in `common_nouns.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:engagement:noun`** (word: "engagement") in `relationships.json` | Intro Level: `A2` | All Levels: `[A2, B2, C1]`
- **`en:environment:noun`** (word: "environment") in `environment.json` | Intro Level: `A2` | All Levels: `[A2, B2]`
- **`en:epistemic:adjective`** (word: "epistemic") in `education.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:eschew:verb`** (word: "eschew") in `nuanced_verbs.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:esoteric:adjective`** (word: "esoteric") in `sophisticated_adjectives.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:ethical:noun`** (word: "ethical") in `ethics.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:euphemism:noun`** (word: "euphemism") in `communication.json` | Intro Level: `B2` | All Levels: `[B2, C2]`
- **`en:evidence:noun`** (word: "evidence") in `science.json` | Intro Level: `B1` | All Levels: `[B1, C1]`
- **`en:exam:noun`** (word: "exam") in `school.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:exhibition:noun`** (word: "exhibition") in `sports_hobbies.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:extrapolate:verb`** (word: "extrapolate") in `statistics.json` | Intro Level: `B2` | All Levels: `[B2, C1, C2]`
- **`en:factor:noun`** (word: "factor") in `abstract_concepts.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:failure:noun`** (word: "failure") in `abstract_nouns.json` | Intro Level: `A2` | All Levels: `[A2, C2]`
- **`en:fall:noun`** (word: "fall") in `time.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:fallacy:noun`** (word: "fallacy") in `ethics.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:famous:adjective`** (word: "famous") in `adjectives.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:fastidious:adjective`** (word: "fastidious") in `sophisticated_adjectives.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:find:verb`** (word: "find") in `verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:fine:phrase`** (word: "fine") in `expressions.json` | Intro Level: `A1` | All Levels: `[A1, C1]`
- **`en:first:noun`** (word: "first") in `transport.json` | Intro Level: `A2` | All Levels: `[A2, C1]`
- **`en:food:noun`** (word: "food") in `food_drink.json` | Intro Level: `A1` | All Levels: `[A1, B1, B2]`
- **`en:for:preposition`** (word: "for") in `classroom_phrases.json` | Intro Level: `A1` | All Levels: `[A1, A2, B1, C1, C2]`
- **`en:forecast:noun`** (word: "forecast") in `environment.json` | Intro Level: `A2` | All Levels: `[A2, B2]`
- **`en:foreign:noun`** (word: "foreign") in `tourism.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:forgive:verb`** (word: "forgive") in `daily_verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:foster:verb`** (word: "foster") in `family.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:free:noun`** (word: "free") in `money_shopping.json` | Intro Level: `A1` | All Levels: `[A1, B2]`
- **`en:friendly:adjective`** (word: "friendly") in `adjectives.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:from:preposition`** (word: "from") in `prepositions.json` | Intro Level: `A1` | All Levels: `[A1, B1, C2]`
- **`en:frustrated:adjective`** (word: "frustrated") in `feelings.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:fry:verb`** (word: "fry") in `daily_verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:funny:adjective`** (word: "funny") in `adjectives.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:gadget:noun`** (word: "gadget") in `media.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:galvanise:verb`** (word: "galvanise") in `nuanced_verbs.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:galvanize:verb`** (word: "galvanize") in `nuanced_verbs.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:game:noun`** (word: "game") in `sports_hobbies.json` | Intro Level: `A1` | All Levels: `[A1, C2]`
- **`en:gas:noun`** (word: "gas") in `living.json` | Intro Level: `A2` | All Levels: `[A2, C1]`
- **`en:generation:noun`** (word: "generation") in `culture.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:get:verb`** (word: "get") in `verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2, B1]`
- **`en:gift:noun`** (word: "gift") in `common_nouns.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:give:verb`** (word: "give") in `verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2, B1]`
- **`en:glass:noun`** (word: "glass") in `house_furniture.json` | Intro Level: `A1` | All Levels: `[A1, B2]`
- **`en:go:verb`** (word: "go") in `classroom_phrases.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:good:phrase`** (word: "good") in `classroom_phrases.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:government:noun`** (word: "government") in `abstract_nouns.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:gratuitous:adjective`** (word: "gratuitous") in `sophisticated_adjectives.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:group:noun`** (word: "group") in `common_nouns.json` | Intro Level: `A1` | All Levels: `[A1, B2]`
- **`en:grow:verb`** (word: "grow") in `verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2, B1]`
- **`en:growth:noun`** (word: "growth") in `economy.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:guess:verb`** (word: "guess") in `daily_verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:habit:noun`** (word: "habit") in `abstract_nouns.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:habitat:noun`** (word: "habitat") in `animals.json` | Intro Level: `A2` | All Levels: `[A2, B2]`
- **`en:hand:phrase`** (word: "hand") in `classroom_phrases.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:hand:verb`** (word: "hand") in `opinions.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:handsome:adjective`** (word: "handsome") in `adjectives.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:hang:verb`** (word: "hang") in `daily_verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:happy:adjective`** (word: "happy") in `adjectives.json` | Intro Level: `A1` | All Levels: `[A1, C1]`
- **`en:healthy:adjective`** (word: "healthy") in `body_health.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:hegemony:noun`** (word: "hegemony") in `politics.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:heritage:noun`** (word: "heritage") in `culture.json` | Intro Level: `A2` | All Levels: `[A2, B2]`
- **`en:hierarchy:noun`** (word: "hierarchy") in `work.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:hold:phrase`** (word: "hold") in `collocations.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:hold:verb`** (word: "hold") in `daily_verbs.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:holiday:noun`** (word: "holiday") in `time.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:homework:noun`** (word: "homework") in `school.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:homogenisation:noun`** (word: "homogenisation") in `global_issues.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:homogenization:noun`** (word: "homogenization") in `global_issues.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:hotel:noun`** (word: "hotel") in `places_transport.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:hour:noun`** (word: "hour") in `time.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:house:noun`** (word: "house") in `house_furniture.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:hyperbole:noun`** (word: "hyperbole") in `communication.json` | Intro Level: `B2` | All Levels: `[B2, C2]`
- **`en:hypothesize:verb`** (word: "hypothesize") in `opinions.json` | Intro Level: `B2` | All Levels: `[B2, C2]`
- **`en:i:phrase`** (word: "I") in `classroom_phrases.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:identity:noun`** (word: "identity") in `abstract_nouns.json` | Intro Level: `A2` | All Levels: `[A2, B1, B2, C1]`
- **`en:impatient:adjective`** (word: "impatient") in `personality.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:implication:noun`** (word: "implication") in `communication.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:implicit:adjective`** (word: "implicit") in `communication.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:important:adjective`** (word: "important") in `adjectives.json` | Intro Level: `A1` | All Levels: `[A1, C1]`
- **`en:improve:verb`** (word: "improve") in `education.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:in:preposition`** (word: "in") in `daily_verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2, B1, B2, C2]`
- **`en:incentive:noun`** (word: "incentive") in `abstract_nouns.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:inconvenient:adjective`** (word: "inconvenient") in `general_adjectives.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:increase:noun`** (word: "increase") in `measurement.json` | Intro Level: `A2` | All Levels: `[A2, B2]`
- **`en:inculcate:verb`** (word: "inculcate") in `nuanced_verbs.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:indefatigable:adjective`** (word: "indefatigable") in `word_building.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:industry:noun`** (word: "industry") in `abstract_nouns.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:information:noun`** (word: "information") in `common_nouns.json` | Intro Level: `A1` | All Levels: `[A1, C2]`
- **`en:initiative:noun`** (word: "initiative") in `work.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:injury:noun`** (word: "injury") in `health.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:innovation:noun`** (word: "innovation") in `science.json` | Intro Level: `B1` | All Levels: `[B1, B2, C1]`
- **`en:integration:noun`** (word: "integration") in `culture.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:integrity:noun`** (word: "integrity") in `ethics.json` | Intro Level: `B1` | All Levels: `[B1, B2, C1]`
- **`en:intelligence:noun`** (word: "intelligence") in `science.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:interdisciplinary:adjective`** (word: "interdisciplinary") in `education.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:interest:noun`** (word: "interest") in `sports_hobbies.json` | Intro Level: `A2` | All Levels: `[A2, C1]`
- **`en:internet:noun`** (word: "internet") in `technology.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:interpret:verb`** (word: "interpret") in `education.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:into:preposition`** (word: "into") in `prepositions.json` | Intro Level: `A1` | All Levels: `[A1, B1, B2]`
- **`en:intransigent:adjective`** (word: "intransigent") in `sophisticated_adjectives.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:investment:noun`** (word: "investment") in `economy.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:invite:verb`** (word: "invite") in `verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:irony:noun`** (word: "irony") in `communication.json` | Intro Level: `B2` | All Levels: `[B2, C1, C2]`
- **`en:is:phrase`** (word: "is") in `classroom_phrases.json` | Intro Level: `A1` | All Levels: `[A1, C2]`
- **`en:issue:noun`** (word: "issue") in `abstract_nouns.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:it:pronoun`** (word: "it") in `pronouns.json` | Intro Level: `A1` | All Levels: `[A1, B1, C1]`
- **`en:itinerary:noun`** (word: "itinerary") in `tourism.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:its:pronoun`** (word: "its") in `pronouns.json` | Intro Level: `A1` | All Levels: `[A1, C2]`
- **`en:job:noun`** (word: "job") in `jobs.json` | Intro Level: `A1` | All Levels: `[A1, A2, B2]`
- **`en:journey:noun`** (word: "journey") in `places_transport.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:keep:verb`** (word: "keep") in `verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2, B1]`
- **`en:kind:adjective`** (word: "kind") in `adjectives.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:knowledge:noun`** (word: "knowledge") in `education.json` | Intro Level: `A2` | All Levels: `[A2, C1]`
- **`en:label:noun`** (word: "label") in `common_nouns.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:landlord:noun`** (word: "landlord") in `living.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:landscape:noun`** (word: "landscape") in `animals.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:language:noun`** (word: "language") in `nationalities.json` | Intro Level: `A1` | All Levels: `[A1, B2]`
- **`en:last:phrase`** (word: "last") in `idioms.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:law:noun`** (word: "law") in `common_nouns.json` | Intro Level: `A1` | All Levels: `[A1, A2, B1]`
- **`en:left:noun`** (word: "left") in `places_transport.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:letter:noun`** (word: "letter") in `objects.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:liability:noun`** (word: "liability") in `economy.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:lifestyle:noun`** (word: "lifestyle") in `abstract_nouns.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:like:verb`** (word: "like") in `expressions.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:literacy:noun`** (word: "literacy") in `education.json` | Intro Level: `B1` | All Levels: `[B1, C1]`
- **`en:look:verb`** (word: "look") in `verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:loss:noun`** (word: "loss") in `economy.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:lucid:adjective`** (word: "lucid") in `sophisticated_adjectives.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:machine:noun`** (word: "machine") in `house_furniture.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:magazine:noun`** (word: "magazine") in `objects.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:majority:noun`** (word: "majority") in `measurement.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:make:phrase`** (word: "make") in `idioms.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:man:noun`** (word: "man") in `family.json` | Intro Level: `A1` | All Levels: `[A1, C2]`
- **`en:manager:noun`** (word: "manager") in `jobs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:marginal:adjective`** (word: "marginal") in `statistics.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:market:noun`** (word: "market") in `money_shopping.json` | Intro Level: `A1` | All Levels: `[A1, B1, B2]`
- **`en:matter:noun`** (word: "matter") in `abstract_nouns.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:may:phrase`** (word: "may") in `expressions.json` | Intro Level: `A1` | All Levels: `[A1, C1]`
- **`en:maybe:adverb`** (word: "maybe") in `adverbs_connectors.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:media:noun`** (word: "media") in `media.json` | Intro Level: `A2` | All Levels: `[A2, C1]`
- **`en:medicine:noun`** (word: "medicine") in `body_health.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:meet:phrase`** (word: "meet") in `classroom_phrases.json` | Intro Level: `A1` | All Levels: `[A1, C1]`
- **`en:member:noun`** (word: "member") in `common_nouns.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:method:noun`** (word: "method") in `abstract_concepts.json` | Intro Level: `B1` | All Levels: `[B1, C1]`
- **`en:meticulous:adjective`** (word: "meticulous") in `general_adjectives.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:migration:noun`** (word: "migration") in `culture.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:mind:phrase`** (word: "mind") in `idioms.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:minimum:noun`** (word: "minimum") in `measurement.json` | Intro Level: `A2` | All Levels: `[A2, B2]`
- **`en:minority:noun`** (word: "minority") in `measurement.json` | Intro Level: `A2` | All Levels: `[A2, B1, B2]`
- **`en:mitigate:verb`** (word: "mitigate") in `advanced_verbs.json` | Intro Level: `B2` | All Levels: `[B2, C1, C2]`
- **`en:mix:verb`** (word: "mix") in `daily_verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:model:noun`** (word: "model") in `family.json` | Intro Level: `B1` | All Levels: `[B1, C1]`
- **`en:modern:adjective`** (word: "modern") in `general_adjectives.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:moral:noun`** (word: "moral") in `ethics.json` | Intro Level: `B2` | All Levels: `[B2, C2]`
- **`en:mortgage:noun`** (word: "mortgage") in `living.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:mother:noun`** (word: "mother") in `family.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:motivation:noun`** (word: "motivation") in `emotions.json` | Intro Level: `A2` | All Levels: `[A2, B1, B2]`
- **`en:move:verb`** (word: "move") in `verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:multicultural:adjective`** (word: "multicultural") in `culture.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:museum:noun`** (word: "museum") in `places_transport.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:my:pronoun`** (word: "my") in `pronouns.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:name:noun`** (word: "name") in `family.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:nation:noun`** (word: "nation") in `nationalities.json` | Intro Level: `A1` | All Levels: `[A1, B2]`
- **`en:national:noun`** (word: "national") in `culture.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:nature:noun`** (word: "nature") in `animals.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:neighbourhood:noun`** (word: "neighbourhood") in `living.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:nervous:adjective`** (word: "nervous") in `feelings.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:network:noun`** (word: "network") in `technology.json` | Intro Level: `B1` | All Levels: `[B1, C1]`
- **`en:news:noun`** (word: "news") in `common_nouns.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:newspaper:noun`** (word: "newspaper") in `objects.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:nihilism:noun`** (word: "nihilism") in `ethics.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:no:phrase`** (word: "no") in `classroom_phrases.json` | Intro Level: `A1` | All Levels: `[A1, C2]`
- **`en:not:phrase`** (word: "not") in `idioms.json` | Intro Level: `B1` | All Levels: `[B1, C2]`
- **`en:notwithstanding:adverb`** (word: "notwithstanding") in `linking_words.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:nuance:noun`** (word: "nuance") in `communication.json` | Intro Level: `B1` | All Levels: `[B1, C2]`
- **`en:obfuscate:verb`** (word: "obfuscate") in `nuanced_verbs.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:of:adverb`** (word: "of") in `adverbs_connectors.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:of:noun`** (word: "of") in `measurement.json` | Intro Level: `A2` | All Levels: `[A2, B2]`
- **`en:of:phrase`** (word: "of") in `classroom_phrases.json` | Intro Level: `A1` | All Levels: `[A1, B1, B2]`
- **`en:off:preposition`** (word: "off") in `clothes.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:office:noun`** (word: "office") in `jobs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:old:adjective`** (word: "old") in `adjectives.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:on:preposition`** (word: "on") in `clothes.json` | Intro Level: `A1` | All Levels: `[A1, A2, B1, B2]`
- **`en:ontological:adjective`** (word: "ontological") in `academic_vocabulary.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:order:noun`** (word: "order") in `food_drink.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:other:verb`** (word: "other") in `opinions.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:over:preposition`** (word: "over") in `prepositions.json` | Intro Level: `A1` | All Levels: `[A1, B1, C1]`
- **`en:overweight:adjective`** (word: "overweight") in `appearance.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:paper:noun`** (word: "paper") in `school.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:paradox:noun`** (word: "paradox") in `ethics.json` | Intro Level: `B2` | All Levels: `[B2, C1, C2]`
- **`en:party:noun`** (word: "party") in `sports_hobbies.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:password:noun`** (word: "password") in `technology.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:pattern:noun`** (word: "pattern") in `abstract_concepts.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:peer:noun`** (word: "peer") in `education.json` | Intro Level: `B1` | All Levels: `[B1, C1]`
- **`en:perceive:verb`** (word: "perceive") in `verbs_cognition.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:percentage:noun`** (word: "percentage") in `measurement.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:performance:noun`** (word: "performance") in `sports_hobbies.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:personification:noun`** (word: "personification") in `media.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:perspective:noun`** (word: "perspective") in `abstract_concepts.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:phenomenon:noun`** (word: "phenomenon") in `abstract_concepts.json` | Intro Level: `B1` | All Levels: `[B1, B2, C2]`
- **`en:placate:verb`** (word: "placate") in `nuanced_verbs.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:planning:noun`** (word: "planning") in `urban_housing.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:plastic:noun`** (word: "plastic") in `shapes_materials.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:plateau:noun`** (word: "plateau") in `geography.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:platform:noun`** (word: "platform") in `transport.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:plausible:adjective`** (word: "plausible") in `general_adjectives.json` | Intro Level: `B2` | All Levels: `[B2, C2]`
- **`en:play:phrase`** (word: "play") in `collocations.json` | Intro Level: `B2` | All Levels: `[B2, C2]`
- **`en:point:verb`** (word: "point") in `daily_verbs.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:police:noun`** (word: "police") in `jobs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:policy:noun`** (word: "policy") in `politics.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:polite:adjective`** (word: "polite") in `personality.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:politics:noun`** (word: "politics") in `politics.json` | Intro Level: `B1` | All Levels: `[B1, C1]`
- **`en:portion:noun`** (word: "portion") in `cooking.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:posit:verb`** (word: "posit") in `synonyms.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:possibly:adverb`** (word: "possibly") in `opinions.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:power:noun`** (word: "power") in `environment.json` | Intro Level: `A2` | All Levels: `[A2, B2]`
- **`en:predator:noun`** (word: "predator") in `animals.json` | Intro Level: `A2` | All Levels: `[A2, B2]`
- **`en:prejudice:noun`** (word: "prejudice") in `ethics.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:pretty:adjective`** (word: "pretty") in `adjectives.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:principle:noun`** (word: "principle") in `ethics.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:private:adjective`** (word: "private") in `general_adjectives.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:problem:noun`** (word: "problem") in `common_nouns.json` | Intro Level: `A1` | All Levels: `[A1, C2]`
- **`en:process:noun`** (word: "process") in `abstract_concepts.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:project:noun`** (word: "project") in `education.json` | Intro Level: `A2` | All Levels: `[A2, B2]`
- **`en:projection:noun`** (word: "projection") in `statistics.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:property:noun`** (word: "property") in `living.json` | Intro Level: `A2` | All Levels: `[A2, B1, B2]`
- **`en:proposition:noun`** (word: "proposition") in `innovation.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:protectionism:noun`** (word: "protectionism") in `global_issues.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:proud:adjective`** (word: "proud") in `feelings.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:public:adjective`** (word: "public") in `general_adjectives.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:public:noun`** (word: "public") in `culture.json` | Intro Level: `A2` | All Levels: `[A2, B2]`
- **`en:put:verb`** (word: "put") in `clothes.json` | Intro Level: `A1` | All Levels: `[A1, A2, B1]`
- **`en:qualification:noun`** (word: "qualification") in `work.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:qualitative:adjective`** (word: "qualitative") in `statistics.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:quality:noun`** (word: "quality") in `shopping.json` | Intro Level: `A2` | All Levels: `[A2, B2]`
- **`en:quiet:adjective`** (word: "quiet") in `adjectives.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:quite:adverb`** (word: "quite") in `adverbs_connectors.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:raise:phrase`** (word: "raise") in `classroom_phrases.json` | Intro Level: `A1` | All Levels: `[A1, B2, C1]`
- **`en:rate:noun`** (word: "rate") in `shopping.json` | Intro Level: `A2` | All Levels: `[A2, B2]`
- **`en:reason:noun`** (word: "reason") in `common_nouns.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:receipt:noun`** (word: "receipt") in `money_shopping.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:recipe:noun`** (word: "recipe") in `food_drink.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:reciprocate:verb`** (word: "reciprocate") in `relationships.json` | Intro Level: `B2` | All Levels: `[B2, C2]`
- **`en:reciprocity:noun`** (word: "reciprocity") in `relationships.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:reconcile:verb`** (word: "reconcile") in `relationships.json` | Intro Level: `B1` | All Levels: `[B1, C1]`
- **`en:refute:verb`** (word: "refute") in `opinions.json` | Intro Level: `B2` | All Levels: `[B2, C2]`
- **`en:relativism:noun`** (word: "relativism") in `ethics.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:relaxed:adjective`** (word: "relaxed") in `feelings.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:remote:adjective`** (word: "remote") in `places_transport.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:reserve:noun`** (word: "reserve") in `tourism.json` | Intro Level: `A2` | All Levels: `[A2, B2]`
- **`en:resilience:noun`** (word: "resilience") in `environment.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:resilient:adjective`** (word: "resilient") in `emotions.json` | Intro Level: `B1` | All Levels: `[B1, C1]`
- **`en:resolve:verb`** (word: "resolve") in `relationships.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:responsibility:noun`** (word: "responsibility") in `work.json` | Intro Level: `A2` | All Levels: `[A2, B1, B2]`
- **`en:retirement:noun`** (word: "retirement") in `work.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:review:verb`** (word: "review") in `education.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:rhetoric:noun`** (word: "rhetoric") in `communication.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:right:noun`** (word: "right") in `places_transport.json` | Intro Level: `A1` | All Levels: `[A1, A2, B1]`
- **`en:rights:noun`** (word: "rights") in `abstract_nouns.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:rigorous:adjective`** (word: "rigorous") in `general_adjectives.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:roast:verb`** (word: "roast") in `daily_verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:roughly:noun`** (word: "roughly") in `measurement.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:rule:noun`** (word: "rule") in `common_nouns.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:run:verb`** (word: "run") in `daily_verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2, B1]`
- **`en:sad:adjective`** (word: "sad") in `adjectives.json` | Intro Level: `A1` | All Levels: `[A1, C1]`
- **`en:salary:noun`** (word: "salary") in `jobs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:salient:adjective`** (word: "salient") in `synonyms.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:same:phrase`** (word: "same") in `linking_words.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:save:verb`** (word: "save") in `daily_verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:say:phrase`** (word: "say") in `classroom_phrases.json` | Intro Level: `A1` | All Levels: `[A1, C2]`
- **`en:scalability:noun`** (word: "scalability") in `innovation.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:science:noun`** (word: "science") in `school.json` | Intro Level: `A1` | All Levels: `[A1, C1]`
- **`en:scientist:noun`** (word: "scientist") in `jobs.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:score:verb`** (word: "score") in `sports_hobbies.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:sculpture:noun`** (word: "sculpture") in `sports_hobbies.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:security:noun`** (word: "security") in `abstract_nouns.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:see:phrase`** (word: "see") in `classroom_phrases.json` | Intro Level: `A1` | All Levels: `[A1, B2]`
- **`en:sentence:noun`** (word: "sentence") in `school.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:share:verb`** (word: "share") in `daily_verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:shopping:noun`** (word: "shopping") in `money_shopping.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:short:adjective`** (word: "short") in `adjectives.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:shortage:noun`** (word: "shortage") in `geography.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:shy:adjective`** (word: "shy") in `feelings.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:side:noun`** (word: "side") in `common_nouns.json` | Intro Level: `A1` | All Levels: `[A1, B1, B2]`
- **`en:significance:noun`** (word: "significance") in `abstract_concepts.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:similar:adjective`** (word: "similar") in `adjectives.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:single:adjective`** (word: "single") in `adjectives.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:sit:phrase`** (word: "sit") in `classroom_phrases.json` | Intro Level: `A1` | All Levels: `[A1, C1]`
- **`en:size:noun`** (word: "size") in `clothes.json` | Intro Level: `A1` | All Levels: `[A1, A2, B1, B2]`
- **`en:skills:noun`** (word: "skills") in `work.json` | Intro Level: `B1` | All Levels: `[B1, C1]`
- **`en:small:adjective`** (word: "small") in `adjectives.json` | Intro Level: `A1` | All Levels: `[A1, C1]`
- **`en:so:conjunction`** (word: "so") in `adverbs_connectors.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:social:noun`** (word: "social") in `media.json` | Intro Level: `A2` | All Levels: `[A2, B2]`
- **`en:society:noun`** (word: "society") in `abstract_nouns.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:soft:adjective`** (word: "soft") in `general_adjectives.json` | Intro Level: `A1` | All Levels: `[A1, B2]`
- **`en:solidarity:noun`** (word: "solidarity") in `relationships.json` | Intro Level: `B2` | All Levels: `[B2, C1, C2]`
- **`en:solipsism:noun`** (word: "solipsism") in `ethics.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:solution:noun`** (word: "solution") in `common_nouns.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:sound:verb`** (word: "sound") in `common_nouns.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:sovereignty:noun`** (word: "sovereignty") in `politics.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:species:noun`** (word: "species") in `environment.json` | Intro Level: `A2` | All Levels: `[A2, B2]`
- **`en:spend:noun`** (word: "spend") in `money_shopping.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:stakeholder:noun`** (word: "stakeholder") in `economy.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:stand:verb`** (word: "stand") in `verbs.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:station:noun`** (word: "station") in `places_transport.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:stereotype:noun`** (word: "stereotype") in `ethics.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:stir:verb`** (word: "stir") in `daily_verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:store:noun`** (word: "store") in `money_shopping.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:storm:noun`** (word: "storm") in `animals.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:straight:adjective`** (word: "straight") in `directions.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:strategy:noun`** (word: "strategy") in `sports.json` | Intro Level: `B1` | All Levels: `[B1, C1]`
- **`en:stubborn:adjective`** (word: "stubborn") in `personality.json` | Intro Level: `A2` | All Levels: `[A2, C2]`
- **`en:student:noun`** (word: "student") in `jobs.json` | Intro Level: `A1` | All Levels: `[A1, B2]`
- **`en:study:noun`** (word: "study") in `school.json` | Intro Level: `A1` | All Levels: `[A1, B2]`
- **`en:subject:noun`** (word: "subject") in `school.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:subjectivity:noun`** (word: "subjectivity") in `ethics.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:subjugate:verb`** (word: "subjugate") in `nuanced_verbs.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:substantial:adjective`** (word: "substantial") in `academic_vocabulary.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:substantiate:verb`** (word: "substantiate") in `opinions.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:subtext:noun`** (word: "subtext") in `communication.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:suburb:noun`** (word: "suburb") in `living.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:suitcase:noun`** (word: "suitcase") in `objects.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:supermarket:noun`** (word: "supermarket") in `places_transport.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:supplant:verb`** (word: "supplant") in `nuanced_verbs.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:supply:noun`** (word: "supply") in `economy.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:suppose:verb`** (word: "suppose") in `opinions.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:surmise:verb`** (word: "surmise") in `synonyms.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:sustainability:noun`** (word: "sustainability") in `environment.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:sustainable:adjective`** (word: "sustainable") in `culture.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:sword:phrase`** (word: "sword") in `collocations.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:sympathize:verb`** (word: "sympathize") in `emotions.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:synthesis:noun`** (word: "synthesis") in `science.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:systemic:adjective`** (word: "systemic") in `society.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:tablet:noun`** (word: "tablet") in `technology.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:take:verb`** (word: "take") in `classroom_phrases.json` | Intro Level: `A1` | All Levels: `[A1, A2, B1]`
- **`en:talkative:adjective`** (word: "talkative") in `personality.json` | Intro Level: `A2` | All Levels: `[A2, C2]`
- **`en:tall:adjective`** (word: "tall") in `adjectives.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:taste:verb`** (word: "taste") in `common_nouns.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:teacher:noun`** (word: "teacher") in `jobs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:technique:noun`** (word: "technique") in `abstract_concepts.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:temperature:noun`** (word: "temperature") in `weather.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:tenant:noun`** (word: "tenant") in `living.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:tenuous:adjective`** (word: "tenuous") in `sophisticated_adjectives.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:test:noun`** (word: "test") in `school.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:that:phrase`** (word: "that") in `classroom_phrases.json` | Intro Level: `A1` | All Levels: `[A1, B2, C1]`
- **`en:the:article`** (word: "the") in `time.json` | Intro Level: `A2` | All Levels: `[A2, B1, B2, C1]`
- **`en:theater:noun`** (word: "theater") in `places_transport.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:theatre:noun`** (word: "theatre") in `places_transport.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:then:adverb`** (word: "then") in `adverbs_connectors.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:theoretical:adjective`** (word: "theoretical") in `science.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:therapy:noun`** (word: "therapy") in `health.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:thin:adjective`** (word: "thin") in `general_adjectives.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:think:phrase`** (word: "think") in `classroom_phrases.json` | Intro Level: `A1` | All Levels: `[A1, B2]`
- **`en:think:verb`** (word: "think") in `verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:this:phrase`** (word: "this") in `classroom_phrases.json` | Intro Level: `A1` | All Levels: `[A1, C1]`
- **`en:through:preposition`** (word: "through") in `prepositions.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:throw:verb`** (word: "throw") in `daily_verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:ticket:noun`** (word: "ticket") in `places_transport.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:time:noun`** (word: "time") in `time.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:tip:phrase`** (word: "tip") in `idioms.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:to:preposition`** (word: "to") in `time.json` | Intro Level: `A1` | All Levels: `[A1, A2, B1, B2]`
- **`en:tongue:noun`** (word: "tongue") in `body_health.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:too:adverb`** (word: "too") in `adverbs_connectors.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:tourism:noun`** (word: "tourism") in `tourism.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:tournament:noun`** (word: "tournament") in `sports_hobbies.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:tradition:noun`** (word: "tradition") in `common_nouns.json` | Intro Level: `A1` | All Levels: `[A1, A2, B1]`
- **`en:train:noun`** (word: "train") in `places_transport.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:training:noun`** (word: "training") in `work.json` | Intro Level: `A2` | All Levels: `[A2, B1, B2]`
- **`en:transcend:verb`** (word: "transcend") in `ethics.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:transform:verb`** (word: "transform") in `comparisons.json` | Intro Level: `B1` | All Levels: `[B1, C1]`
- **`en:treaty:noun`** (word: "treaty") in `global_issues.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:trial:noun`** (word: "trial") in `crime.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:trip:noun`** (word: "trip") in `places_transport.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:try:verb`** (word: "try") in `clothes.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:turn:verb`** (word: "turn") in `verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:ubiquitous:adjective`** (word: "ubiquitous") in `sophisticated_adjectives.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:ugly:adjective`** (word: "ugly") in `adjectives.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:under:preposition`** (word: "under") in `prepositions.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:undermine:verb`** (word: "undermine") in `advanced_verbs.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:unemployment:noun`** (word: "unemployment") in `work.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:unequivocal:adjective`** (word: "unequivocal") in `sophisticated_adjectives.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:university:noun`** (word: "university") in `places_transport.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:unless:conjunction`** (word: "unless") in `adverbs_connectors.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:unnecessary:adjective`** (word: "unnecessary") in `general_adjectives.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:unusual:adjective`** (word: "unusual") in `general_adjectives.json` | Intro Level: `A2` | All Levels: `[A2, B1]`
- **`en:up:preposition`** (word: "up") in `classroom_phrases.json` | Intro Level: `A1` | All Levels: `[A1, A2, B1]`
- **`en:vacation:noun`** (word: "vacation") in `sports_hobbies.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:value:noun`** (word: "value") in `ethics.json` | Intro Level: `B1` | All Levels: `[B1, B2, C1]`
- **`en:verdict:noun`** (word: "verdict") in `crime.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:verisimilitude:noun`** (word: "verisimilitude") in `media.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:very:adverb`** (word: "very") in `adverbs_connectors.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:vindicate:verb`** (word: "vindicate") in `nuanced_verbs.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:vindictive:adjective`** (word: "vindictive") in `sophisticated_adjectives.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:vitriolic:adjective`** (word: "vitriolic") in `sophisticated_adjectives.json` | Intro Level: `C1` | All Levels: `[C1, C2]`
- **`en:volatility:noun`** (word: "volatility") in `statistics.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:wake:verb`** (word: "wake") in `verbs.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:watch:noun`** (word: "watch") in `clothes.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:water:noun`** (word: "water") in `food_drink.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:weekend:noun`** (word: "weekend") in `time.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:weight:noun`** (word: "weight") in `shapes_materials.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:wellbeing:noun`** (word: "wellbeing") in `health.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:when:phrase`** (word: "when") in `expressions.json` | Intro Level: `A1` | All Levels: `[A1, C1]`
- **`en:whereas:conjunction`** (word: "whereas") in `comparisons.json` | Intro Level: `B1` | All Levels: `[B1, B2]`
- **`en:while:conjunction`** (word: "while") in `adverbs_connectors.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:wind:noun`** (word: "wind") in `animals.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:with:preposition`** (word: "with") in `prepositions.json` | Intro Level: `A1` | All Levels: `[A1, B1, B2, C2]`
- **`en:work:noun`** (word: "work") in `work.json` | Intro Level: `B2` | All Levels: `[B2, C1]`
- **`en:work:verb`** (word: "work") in `jobs.json` | Intro Level: `A1` | All Levels: `[A1, A2, B1]`
- **`en:would:phrase`** (word: "would") in `expressions.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
- **`en:you:pronoun`** (word: "you") in `classroom_phrases.json` | Intro Level: `A1` | All Levels: `[A1, B1, C1]`
- **`en:young:adjective`** (word: "young") in `adjectives.json` | Intro Level: `A1` | All Levels: `[A1, A2]`
- **`en:your:pronoun`** (word: "your") in `classroom_phrases.json` | Intro Level: `A1` | All Levels: `[A1, B1]`
