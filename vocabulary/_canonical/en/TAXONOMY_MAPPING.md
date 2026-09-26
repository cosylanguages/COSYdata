# Master Flat Topic Taxonomy & Legacy Source Mapping

This document establishes the canonical flat topic taxonomy for A0–A1 English vocabulary in COSYlanguages. It maps every legacy topic, domain, unit, and section across the existing ecosystem sources onto a single, unified set of 25 flat, learner-facing topics.

---

## 1. Canonical Flat Topics (25 Topics)

| Topic ID / Slug | Canonical Title | Scope & Coverage Description |
|---|---|---|
| `greetings_phrases` | Greetings & Basic Phrases | Everyday greetings, farewells, polite expressions, social phrases, classroom/learning phrases. |
| `pronouns_grammar` | Pronouns & Basic Grammar Words | Personal, possessive, demonstrative, relative, and indefinite pronouns; basic grammar words. |
| `question_words` | Question Words | Interrogatives (`what`, `who`, `where`, `when`, `why`, `how`, `which`, `whose`, `how much`, etc.). |
| `numbers_measurement` | Numbers & Measurement | Cardinal and ordinal numbers, fractions, quantities, units of measurement (`meter`, `kilo`), basic math. |
| `colors` | Colors | Primary/secondary colors, shades, light/dark descriptors. |
| `time_calendar` | Time, Days, Months & Seasons | Days of the week, months, clock time, time expressions (`today`, `tomorrow`, `always`, `never`). |
| `family_people` | Family & People | Family members, relationships, age groups, personal titles, general people terms. |
| `body_health` | Body & Health | Anatomy, physical states, health conditions, medical care, symptoms (`cold`, `cough`). |
| `clothes_accessories` | Clothes & Accessories | Apparel items, footwear, accessories, dressing actions, sizes (`small`, `large`). |
| `food_drink` | Food & Drink | Meals, ingredients, dishes, beverages, flavor adjectives, dining out, cooking verbs. |
| `house_furniture` | House, Kitchen & Furniture | Rooms, furniture, appliances, kitchen utensils, household items, cleaning actions. |
| `animals_nature` | Animals & Nature | Domestic and wild animals, birds, insects, natural features (`tree`, `river`, `mountain`). |
| `weather_environment` | Weather & Environment | Weather conditions (`sunny`, `rainy`), climate, temperature, sky/elements (`sun`, `moon`, `star`). |
| `places_transport` | Places, Buildings & Transport | Cities, towns, public places, buildings, vehicles, travel, movement terms. |
| `directions_location` | Directions & Location | Cardinal directions, spatial orientation (`left`, `right`), prepositions of place. |
| `school_education` | School & Education | Classroom items, school subjects, academic activities (`study`, `test`, `homework`). |
| `jobs_work` | Jobs & Work | Occupations, professions, workplace items, general employment terms. |
| `technology_communication` | Technology & Communication | Digital devices, internet, phone calls, messages, social media, media items. |
| `shopping_money` | Shopping & Money | Prices, currency, buying, selling, stores, payment methods, receipts. |
| `sports_hobbies` | Sports, Hobbies & Free Time | Sports, games, music, arts, leisure activities, entertainment, hobbies. |
| `feelings_emotions` | Feelings & Emotions | Emotional states (`happy`, `sad`), feelings, personality traits. |
| `countries_languages` | Countries, Nationalities & Languages | Country names, continents, nationalities, languages. |
| `descriptive_adjectives` | Descriptive Adjectives & Opposites | General qualities, size, age, condition, appearance, evaluation (`big`, `small`, `good`, `bad`). |
| `common_verbs_actions` | Common Verbs & Daily Actions | Core action verbs, daily routines, movement, perception, basic auxiliary verbs (`be`, `have`, `do`). |
| `prepositions_connectors` | Prepositions, Adverbs & Connectors | Spatial/temporal prepositions, frequency/manner adverbs, conjunctions (`and`, `but`, `because`). |

---

## 2. Source-to-Flat Mapping Matrix

### A. General Course A (34 Topics) & General Course B (24 Topics)

| General Course A Section | General Course B Section | Mapped Canonical Flat Topic |
|---|---|---|
| Pronouns & basic grammar words | Pronouns & Possessives | `pronouns_grammar` |
| The verb 'be' and auxiliary/modal verbs | Common Verbs | `common_verbs_actions` |
| Numbers 0-100 and beyond | Numbers | `numbers_measurement` |
| Numbers & measurement extra | Numbers | `numbers_measurement` |
| Shapes, materials, sizes | Common Adjectives (extra) | `numbers_measurement` / `descriptive_adjectives` |
| Days, months, seasons, time | Time, Days, Months, Seasons | `time_calendar` |
| Colors | Colors | `colors` |
| Family & people | Family & People | `family_people` |
| Body & health | Body & Health | `body_health` |
| Clothes | Clothes | `clothes_accessories` |
| Food & drink | Food & Drink | `food_drink` |
| Kitchen, house, furniture | House & Furniture | `house_furniture` |
| Animals & nature | Animals | `animals_nature` |
| Weather & environment extra | Weather & Nature | `weather_environment` |
| Places, buildings, transport | Places & Transport | `places_transport` |
| Directions & location words | Prepositions & Connectors | `directions_location` |
| Jobs & work | Jobs | `jobs_work` |
| School & education | School & Work | `school_education` |
| Technology & communication | Everyday Objects | `technology_communication` |
| Money & shopping | Shopping & Money | `shopping_money` |
| Common verbs (action & everyday) | Common Verbs | `common_verbs_actions` |
| More verbs (daily activities) | Common Verbs | `common_verbs_actions` |
| Adjectives (describing people & things) | Feelings & Description | `descriptive_adjectives` |
| Opposites & general adjectives 2 | Common Adjectives (extra) | `descriptive_adjectives` |
| Adverbs & connectors | Prepositions & Connectors | `prepositions_connectors` |
| Prepositions | Prepositions & Connectors | `prepositions_connectors` |
| Feelings & emotions | Feelings & Description | `feelings_emotions` |
| Hobbies, sports, free time | Sports & Free Time | `sports_hobbies` |
| Question words & everyday expressions | Greetings & Basic Phrases / Question Words | `greetings_phrases` / `question_words` |
| More expressions & classroom phrases | Greetings & Basic Phrases | `greetings_phrases` |
| Nationalities & languages (basic set) | Countries & Nationalities | `countries_languages` |
| Countries, continents, world | Countries & Nationalities | `countries_languages` |
| More everyday objects | Everyday Objects | `house_furniture` / `technology_communication` |
| More common nouns | Feelings & Description / Various | `descriptive_adjectives` / Various |

---

### B. Manual's 10 Parts (`manuals/en/vocabulary/a1/topics/*.html`)

| Manual Part HTML File | Covered Topic Area | Mapped Canonical Flat Topic |
|---|---|---|
| `part-1-about-me.html` | Greetings, Personal Info, Family, Countries | `greetings_phrases`, `family_people`, `countries_languages` |
| `part-2-clothes.html` | Clothing, Apparel, Footwear, Accessories | `clothes_accessories` |
| `part-3-home.html` | Rooms, House, Furniture, Appliances | `house_furniture` |
| `part-4-food.html` | Meals, Food, Drinks, Cooking, Restaurants | `food_drink` |
| `part-5-city.html` | City, Places, Transport, Travel, Directions | `places_transport`, `directions_location` |
| `part-6-hobbies.html` | Free Time, Hobbies, Sports, Entertainment | `sports_hobbies` |
| `part-7-daily-routine.html` | Daily Activities, Time, Work, Schedule | `time_calendar`, `common_verbs_actions`, `jobs_work` |
| `part-8-nature.html` | Animals, Weather, Nature, Earth | `animals_nature`, `weather_environment` |
| `part-9-abstract-basics.html` | Basic Adjectives, Feelings, Descriptions | `descriptive_adjectives`, `feelings_emotions` |
| `part-10-primitives.html` | Numbers, Colors, Core Grammar Primitives | `numbers_measurement`, `colors`, `pronouns_grammar` |

---

### C. Curriculum's 10 Units (`curriculum/en/general/A1.json`)

| Unit Number | Unit Title | Primary Focus | Mapped Canonical Flat Topic |
|---|---|---|---|
| Unit 1 | Hello — Greetings, names & alphabet | Greetings, Name, Alphabet, Numbers 0-10 | `greetings_phrases`, `numbers_measurement` |
| Unit 2 | People & Family — Pronouns & relationships | Family, Relationships, Jobs, Pronouns | `family_people`, `jobs_work`, `pronouns_grammar` |
| Unit 3 | Everyday Objects & Colors | Classroom, Objects, Colors, Prepositions | `house_furniture`, `colors`, `prepositions_connectors` |
| Unit 4 | Food & Drink — Cafe & ordering | Food, Drinks, Meals, Cafe, Ordering | `food_drink`, `greetings_phrases` |
| Unit 5 | Time & Routine — Days, time, habits | Time, Days, Daily Verbs, Frequency | `time_calendar`, `common_verbs_actions` |
| Unit 6 | House & Home — Rooms & furniture | Rooms, Furniture, House, Home | `house_furniture` |
| Unit 7 | Places in Town & Transport | Places, Transport, Directions, City | `places_transport`, `directions_location` |
| Unit 8 | Free Time & Sports | Hobbies, Sports, Free Time, Likes | `sports_hobbies` |
| Unit 9 | Weather & Seasons | Weather, Seasons, Clothes, Temperature | `weather_environment`, `clothes_accessories` |
| Unit 10 | Review & Synthesis | A1 Synthesis, Core Expressions | `greetings_phrases`, `descriptive_adjectives` |

---

### D. Practice Engine Domains & POS Subcategories (`vocabulary/en/A1/**/*.js`)

| Practice POS / Domain | Subcategory / Theme | Mapped Canonical Flat Topic |
|---|---|---|
| `Nouns/SELF` | Family, Body, Identity, Emotions | `family_people`, `body_health`, `feelings_emotions` |
| `Nouns/HOME` | Rooms, Furniture, Appliances, Objects | `house_furniture` |
| `Nouns/FOOD` | Meals, Ingredients, Drinks, Dishes | `food_drink` |
| `Nouns/WORK_SCHOOL` | School, Classroom, Jobs, Office | `school_education`, `jobs_work` |
| `Nouns/TRAVEL` | Places, Vehicles, Directions, City | `places_transport`, `directions_location` |
| `Nouns/NATURE` | Animals, Natural World, Weather | `animals_nature`, `weather_environment` |
| `Nouns/TIME_NUMBERS` | Days, Months, Clock, Numbers | `time_calendar`, `numbers_measurement` |
| `Nouns/COMMUNICATION` | Tech, Phone, Media, Language | `technology_communication`, `countries_languages` |
| `Verbs/*` | Actions, Daily Routines, Motion, Speech | `common_verbs_actions` |
| `Adjectives/*` | Descriptions, Qualities, Colors, Size | `descriptive_adjectives`, `colors` |
| `Other_POS/*` | Pronouns, Prepositions, Connectors | `pronouns_grammar`, `prepositions_connectors`, `question_words` |
