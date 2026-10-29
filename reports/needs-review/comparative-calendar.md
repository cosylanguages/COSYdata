# Needs review: comparative calendar set (found while building `comparative/`)

## Probable data errors in existing dictionary entries
| Entry | Current | Issue |
|---|---|---|
| `br` June (`vocabulary/br/a0_a1/calendar.json`) | `mehefin` | `mehefin` is the **Welsh** word. Breton June is `Mezheven` (checked against a Breton month list: Genver, C'hwevrer, Meurzh, Ebrel, Mae, Mezheven, Gouere, Eost, Gwengolo, Here, Du, Kerzu). Not changed here (out of scope: vocabulary is untouched). |
| `ba` Thursday | `кесеуач` | Could not confirm this form. Search results suggest other Bashkir Thursday forms (e.g. `кесе йома`); check a Bashkir dictionary. |
| `ba` Saturday | `шимбә` | Check against standard `шәмбе` (Tatar uses `шимбә`). |
| `br` weekdays | `lun`, `meurzh`, `merc'her`, `yaou`, `gwener`, `sadorn`, `sul` | Breton normally prefixes `di-` (Dilun...). Bare forms are acceptable as stems but the dictionary should say so. |

## Claims in `linguistics/calendar-cognates.json` that need a source check before `reviewed: true`
- German Dienstag origin (debated, marked "probable").
- Armenian կիրակի and Georgian კვირა derivation from Greek *kyriakē* (marked generally accepted / probable).
- Breton `sul` from Latin *solis*; `sadorn` from *Saturni*.
- Persian numbered names for Tatar and Bashkir (the Bashkir Thursday form is unverified, so no Bashkir Thursday etymology was written).
- Chuvash: no weekday or month etymologies written (not confident).
- The five insights (counting systems, Persian numbers, Germanic gods, Sept-Dec numbers, Breton meurzh).
All 32 groups, 89 etymologies and 5 insights are `reviewed: false`.
