# P28 removal of real named people

P28 removed seven Russian entries that represented real named people, which the repository rules prohibit:

- `ru:petr-i:noun` — Пётр I
- `ru:fedor-dostoevskiy:noun` — Фёдор Достоевский
- `ru:mariya-sharapova:noun` — Мария Шарапова
- `ru:anna-akhmatova:noun` — Анна Ахматова
- `ru:aleksandr-pushkin:noun` — Александр Пушкин
- `ru:lev-tolstoy:noun` — Лев Толстой
- `ru:viktor-tsoy:noun` — Виктор Цой

All seven IDs are null aliases in `shared/id-aliases.json`; references to them were removed. Indexes, daily data and comparative data were rebuilt.

No new entries or forms were created.
