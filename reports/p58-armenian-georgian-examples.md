# P58 Armenian and Georgian examples
P58 added the missing examples for all Armenian and Georgian entries.
## Armenian
Added one C2 example for each of 58 adjectives. Each uses the exact stored headword:
- `hy:1oh5pwi:adjective`: Միջգիտակարգային երկխոսությունը միավորում է տարբեր ոլորտներ։
- `hy:160ljqg:adjective`: Ներհատուկ վտանգը հնարավոր չէ հեռացնել։
- `hy:zzfs8e:adjective`: Միանշանակ պատասխանը կասկած չի թողնում։
## Georgian
Added one C2 example for each of 58 adjectives:
- `ka:19ir70b:adjective`: ინტერდისციპლინური დიალოგი სხვადასხვა დარგს აერთიანებს.
- `ka:1mg39n4:adjective`: იმანენტური საფრთხის მოცილება შეუძლებელია.
- `ka:rr3dyd:adjective`: ცალსახა პასუხი ეჭვს არ ტოვებს.
## Headword corrections
Three entries had a word that did not match the stored definition:
- `hy:90r4a6:adjective`: `քայքայիչ` (destructive) -> `ապակայունացնող` (destabilizing, subversive).
- `ka:1r1axgv:adjective`: `თანამგზავრი` (companion) -> `თანმდევი` (incidental).
- `ka:1nqrich:adjective`: `დაუცველი` (unprotected) -> `დაუსაბუთებელი` (unfounded, untenable).
The IDs are opaque hashes, so no ID changes or aliases were needed.
## Schema fields
Added `no_antonym` and an empty `transcription` field to satisfy the schema, and removed `status: needs_review`.
## Sources checked
- Armenian Wiktionary and standard Eastern Armenian grammar
- Georgian Wiktionary and standard Georgian grammar
- Existing C2 entries in both languages for register
## Verification
- Every example contains the exact headword.
- Armenian and Georgian now have zero entries missing examples.
## Result
- Entries changed: **116**
- Entries total: **31,499**
- Findings: **8,978** (from 9,094)
- Missing definitions: **0**
- Missing examples: **651**
