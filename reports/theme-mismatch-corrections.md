# Theme mismatch corrections

Curated semantic corrections applied after the form-based backfill. The correction list is `scripts/theme-mismatch-corrections.json`; the runner is `scripts/fix-theme-mismatches.cjs`.

- Corrections applied: **310** across 30 files.
- Remaining file/theme mismatches: **2411**.
  - **1663** are expected form-file mismatches: the file name is a grammatical form (`idioms.json`, `daily_verbs.json`, `common_nouns.json`, `verbs.json`, `abstract_nouns.json`), not a semantic theme. They are listed in `reports/theme-mismatches-form-files.csv`.
  - **748** are semantic review items. They are listed in `reports/theme-mismatches-review.csv`.

## Corrections by target

| Target | Entries |
| --- | ---: |
| `personality/personality_traits` | 83 |
| `work/professions_jobs` | 55 |
| `society/culture` | 52 |
| `crime/general` | 42 |
| `education/general` | 16 |
| `communication/general` | 15 |
| `animals/general` | 11 |
| `activities/daily_routines` | 9 |
| `grammar/auxiliaries_modals` | 8 |
| `grammar/adverbs` | 5 |
| `health/fitness_hygiene` | 4 |
| `health/medical_care` | 4 |
| `sports/general` | 3 |
| `society/general` | 3 |

## Corrections by rule

| Rule | Entries |
| --- | ---: |
| personality traits in personality.json | 83 |
| professions in work.json | 55 |
| culture terms in culture.json | 52 |
| crime terms misclassified as work | 42 |
| education terms in school.json | 16 |
| communication terms in communication.json | 15 |
| animals misclassified as general | 11 |
| daily routines misclassified as immediate_family | 9 |
| modal verbs misclassified as actions | 8 |
| adverbs misclassified as descriptors | 5 |
| hygiene products misclassified as body parts | 4 |
| health insurance terms misclassified as money | 4 |
| sports terms misclassified as leisure | 3 |
| society terms misclassified as communication | 3 |

## Top remaining semantic groups

| File | Current theme | Entries |
| --- | --- | ---: |
| `environment.json` | `nature/plants_trees` | 91 |
| `media.json` | `communication/greetings` | 76 |
| `work.json` | `general/miscellaneous` | 74 |
| `sports_hobbies.json` | `activities/general` | 65 |
| `crime.json` | `law/general` | 54 |
| `animals.json` | `nature/plants_trees` | 45 |
| `places_transport.json` | `geography/countries_regions` | 38 |
| `media.json` | `technology/devices_hardware` | 35 |
| `animals.json` | `nature/general` | 19 |
| `crime.json` | `law/legal-english` | 19 |
| `economy.json` | `money/banking` | 16 |
| `geography.json` | `nature/general` | 15 |
| `economy.json` | `money/finance` | 12 |
| `family.json` | `activities/general` | 11 |
| `expressions.json` | `actions/daily_routines` | 9 |
| `family.json` | `activities/daily_routines` | 9 |
| `sports_hobbies.json` | `sports/general` | 7 |
| `places_transport.json` | `leisure/general` | 6 |
| `school.json` | `general/miscellaneous` | 6 |
| `economy.json` | `shopping/general` | 6 |

## Notes

- The remaining semantic groups are mixed. For example, `environment.json` contains pollution, weather, plants, and landforms; `media.json` contains media content, devices, and internet actions; `work.json` contains professions alongside general business terms. They need word-level review, not a file-level rule.
- Some remaining mismatches are intentional cross-theme entries, such as `animals.json` containing `nature/plants_trees` or `places_transport.json` containing `geography/countries_regions`.
- The 9 `family.json` entries moved to `activities/daily_routines` still appear as mismatches because the file theme is `family`. They are semantically correct and are left as cross-theme entries.
