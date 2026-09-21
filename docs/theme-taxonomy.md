# Theme & Sub-Theme Taxonomy for COSYdata Vocabulary

This document presents a proposed canonical theme and `sub_theme` taxonomy for vocabulary datasets (specifically targeting A0–A1 core vocabulary, such as `vocabulary/en/a0_a1/*.json`).

---

## 1. Executive Summary & Mapping Table

An audit of `vocabulary/en/a0_a1/*.json` revealed 50 distinct `theme` values currently in use. Many of these are near-duplicates or fragmented variants (e.g., `clothes` vs `clothing`, `house_furniture` vs `housing`, `sports_hobbies` vs `leisure`, `common_nouns` vs `general`, `verbs` vs `actions`).

Below is the complete mapping of all 50 existing theme values into **29 canonical theme names**:

| Existing Theme Name | Canonical Theme Name | Notes / Merge Target |
| --- | --- | --- |
| `actions` | `actions` | Maintained as canonical theme for physical & social actions |
| `verbs` | `actions` | Merged into `actions` |
| `daily_verbs` | `actions` | Merged into `actions` |
| `activities` | `activities` | Maintained for routines, hobbies, and events |
| `adjectives` | `descriptors` | Merged into `descriptors` |
| `descriptions` | `descriptors` | Merged into `descriptors` |
| `descriptors` | `descriptors` | Maintained as canonical theme for descriptive words |
| `adverbs_connectors` | `grammar` | Merged into `grammar` |
| `prepositions` | `grammar` | Merged into `grammar` |
| `positions` | `grammar` | Merged into `grammar` |
| `pronouns` | `grammar` | Merged into `grammar` |
| `grammar` | `grammar` | Maintained as canonical theme for functional grammar |
| `animals` | `animals` | Maintained as canonical theme |
| `body_health` | `health` | Merged into `health` |
| `health` | `health` | Maintained as canonical theme |
| `clothes` | `clothing` | Merged into `clothing` |
| `clothing` | `clothing` | Maintained as canonical theme |
| `colors` | `colors` | Maintained as canonical theme |
| `common_nouns` | `general` | Merged into `general` |
| `general` | `general` | Maintained as canonical theme for unclassified terms |
| `communication` | `communication` | Maintained as canonical theme |
| `expressions` | `communication` | Merged into `communication` |
| `education` | `education` | Maintained as canonical theme |
| `school` | `education` | Merged into `education` |
| `emotions` | `emotions` | Maintained as canonical theme |
| `family` | `family` | Maintained as canonical theme |
| `food` | `food` | Maintained as canonical theme |
| `food_drink` | `food` | Merged into `food` |
| `geography` | `geography` | Maintained as canonical theme |
| `nationalities` | `geography` | Merged into `geography` |
| `house_furniture` | `housing` | Merged into `housing` |
| `housing` | `housing` | Maintained as canonical theme |
| `leisure` | `leisure` | Maintained as canonical theme |
| `sports_hobbies` | `leisure` | Merged into `leisure` |
| `measurement` | `measurement` | Maintained as canonical theme |
| `money_shopping` | `shopping` | Merged into `shopping` |
| `shopping` | `shopping` | Maintained as canonical theme |
| `nature` | `nature` | Maintained as canonical theme |
| `navigation` | `navigation` | Maintained as canonical theme |
| `numbers` | `numbers` | Maintained as canonical theme |
| `objects` | `objects` | Maintained as canonical theme |
| `places_transport` | `travel` | Merged into `travel` |
| `transport` | `travel` | Merged into `travel` |
| `travel` | `travel` | Maintained as canonical theme |
| `shapes` | `shapes` | Maintained as canonical theme |
| `technology` | `technology` | Maintained as canonical theme |
| `time` | `time` | Maintained as canonical theme |
| `weather` | `weather` | Maintained as canonical theme |
| `jobs` | `work` | Merged into `work` |
| `work` | `work` | Maintained as canonical theme |

---

## 2. Proposed Canonical Theme & `sub_theme` Taxonomy

Below are the 29 canonical themes along with a recommended set of `sub_theme` values for categorizing vocabulary entries.

### 1. `actions`
*Description:* Action verbs describing physical movement, daily operations, or social interactions.
*Proposed `sub_theme` values:*
- `daily_routines`
- `physical_movement`
- `social_interaction`
- `mental_cognition`

### 2. `activities`
*Description:* Nouns and multi-word phrases for daily activities, chores, and events.
*Proposed `sub_theme` values:*
- `daily_life`
- `chores`
- `hobbies`
- `events`

### 3. `animals`
*Description:* Living creatures including pets, farm animals, wild animals, and insects.
*Proposed `sub_theme` values:*
- `pets`
- `farm_animals`
- `wild_animals`
- `sea_creatures`
- `insects`

### 4. `clothing`
*Description:* Garments, footwear, wear accessories, and attire.
*Proposed `sub_theme` values:*
- `everyday_wear`
- `footwear`
- `accessories`
- `outerwear`
- `weather_gear`

### 5. `colors`
*Description:* Color names, shades, and visual color descriptors.
*Proposed `sub_theme` values:*
- `primary_colors`
- `secondary_colors`
- `shades_tones`

### 6. `communication`
*Description:* Spoken and written language interaction, social expressions, and greetings.
*Proposed `sub_theme` values:*
- `greetings`
- `courtesy`
- `social_expressions`
- `questions`
- `classroom_language`

### 7. `descriptors`
*Description:* Adjectives describing qualities, traits, size, appearance, or state.
*Proposed `sub_theme` values:*
- `physical_appearance`
- `size_dimension`
- `quality_condition`
- `personality_traits`

### 8. `education`
*Description:* Schooling, academic subjects, classroom objects, and learning activities.
*Proposed `sub_theme` values:*
- `school_subjects`
- `classroom_objects`
- `academic_roles`
- `learning_activities`

### 9. `emotions`
*Description:* Feelings, emotional states, and mood descriptors.
*Proposed `sub_theme` values:*
- `positive_feelings`
- `negative_feelings`
- `mental_states`

### 10. `family`
*Description:* Family members, relatives, and interpersonal relationships.
*Proposed `sub_theme` values:*
- `immediate_family`
- `extended_family`
- `relationships`

### 11. `food`
*Description:* Food items, ingredients, meals, beverages, and culinary terms.
*Proposed `sub_theme` values:*
- `meals`
- `drinks`
- `fruits_vegetables`
- `cooking`
- `meat_dairy`
- `snacks_sweets`

### 12. `general`
*Description:* Broad, unclassified, or multi-purpose vocabulary terms.
*Proposed `sub_theme` values:*
- `miscellaneous`
- `abstract_concepts`
- `common_things`

### 13. `geography`
*Description:* Countries, nationalities, languages, and geographic features.
*Proposed `sub_theme` values:*
- `countries_regions`
- `nationalities_languages`
- `landscape_features`
- `cities_towns`

### 14. `grammar`
*Description:* Functional grammatical terms, pronouns, prepositions, and conjunctions.
*Proposed `sub_theme` values:*
- `pronouns`
- `prepositions_spatial`
- `prepositions_temporal`
- `conjunctions_connectors`
- `auxiliaries_modals`

### 15. `health`
*Description:* Human anatomy, body parts, health conditions, and medical care.
*Proposed `sub_theme` values:*
- `body_parts`
- `illness_symptoms`
- `medical_care`
- `fitness_hygiene`

### 16. `housing`
*Description:* Residential living spaces, rooms, furniture, home fixtures, and appliances.
*Proposed `sub_theme` values:*
- `rooms_spaces`
- `furniture`
- `appliances`
- `home_fixtures`
- `building_types`

### 17. `leisure`
*Description:* Sports, games, hobbies, entertainment, and recreational activities.
*Proposed `sub_theme` values:*
- `sports`
- `games_hobbies`
- `entertainment_arts`
- `relaxation`

### 18. `measurement`
*Description:* Units of measure, dimensions, quantity, weight, and scales.
*Proposed `sub_theme` values:*
- `dimensions_weight`
- `units_scales`
- `quantity`

### 19. `nature`
*Description:* Environmental features, flora, plants, landscape, and celestial bodies.
*Proposed `sub_theme` values:*
- `plants_trees`
- `landforms`
- `environment`
- `celestial_bodies`

### 20. `navigation`
*Description:* Directional vocabulary, spatial orientation, and location terms.
*Proposed `sub_theme` values:*
- `cardinal_directions`
- `spatial_orientation`
- `asking_giving_directions`

### 21. `numbers`
*Description:* Cardinal and ordinal numbers, fractions, and numerical amounts.
*Proposed `sub_theme` values:*
- `cardinal_numbers`
- `ordinal_numbers`
- `fractions_amounts`

### 22. `objects`
*Description:* Physical everyday items, tools, personal belongings, and containers.
*Proposed `sub_theme` values:*
- `personal_items`
- `everyday_tools`
- `containers`
- `office_supplies`

### 23. `shapes`
*Description:* Geometric shapes, patterns, textures, and material types.
*Proposed `sub_theme` values:*
- `geometric_shapes`
- `materials_textures`

### 24. `shopping`
*Description:* Commerce, money, transactions, stores, pricing, and currency.
*Proposed `sub_theme` values:*
- `money_currency`
- `stores_shops`
- `transactions_pricing`

### 25. `technology`
*Description:* Digital devices, hardware, internet, software, and electronic communications.
*Proposed `sub_theme` values:*
- `devices_hardware`
- `digital_media_internet`
- `communication_tech`

### 26. `time`
*Description:* Time expression, days of the week, months, seasons, clock time, and frequency.
*Proposed `sub_theme` values:*
- `days_months_seasons`
- `clock_time`
- `frequency_duration`
- `time_periods`

### 27. `travel`
*Description:* Transportation, vehicles, places to visit, booking, and trip destinations.
*Proposed `sub_theme` values:*
- `vehicles_transportation`
- `places_destinations`
- `transit_booking`
- `vacation_lodging`

### 28. `weather`
*Description:* Atmospheric conditions, precipitation, temperature, and seasonal weather.
*Proposed `sub_theme` values:*
- `precipitation_sky`
- `temperature_climate`
- `seasons_atmosphere`

### 29. `work`
*Description:* Professions, job titles, workplaces, business, and employment.
*Proposed `sub_theme` values:*
- `professions_jobs`
- `workplace_locations`
- `office_business`

---

## 3. Note on Weather Terms Relocation (`animals.json` → `weather.json`)

**Audit Observation:**
In the existing dataset `vocabulary/en/a0_a1/`, `weather.json` currently contains only abstract terms (`temperature`, `degree`, `climate`, `season`, `plant`), whereas 19 core weather-related vocabulary entries (`weather`, `moon`, `cloud`, `sky`, `sun`, `star`, `rain`, `snow`, `wind`, `storm`, `hot`, `cold`, `warm`, `cool`, `sunny`, `rainy`, `cloudy`, `windy`, `snowy`) are misfiled inside `animals.json` (tagged with theme `"weather"`).

**Required Data Cleanup (Future Task):**
All 19 weather entries should be moved out of `vocabulary/en/a0_a1/animals.json` and placed into `vocabulary/en/a0_a1/weather.json` under canonical theme `"weather"`, with appropriate `sub_theme` values (such as `precipitation_sky`, `temperature_climate`, or `seasons_atmosphere`).
