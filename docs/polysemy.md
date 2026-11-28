# Polysemy: one entry per meaning

A word with several meanings gets **one entry per meaning**, not one entry with a
list of unrelated senses. Each entry keeps the same `word` and `form`, has its
own `id`, `level`, `definitions`, `examples`, `synonyms`, `antonyms` and
`derivatives`, and carries a `sense` slug plus a short English `sense_label`.

```json
{
  "id": "en:bank-river:noun",
  "word": "bank",
  "form": "noun",
  "level": "B1",
  "sense": "river",
  "sense_label": "land beside a river",
  "definitions": ["The land along the side of a river."],
  "examples": ["We sat on the bank and watched the boats go by."]
}
```

## Why separate entries

- Each meaning can sit at its own CEFR level. `bank` as a financial institution
  is A1; `bank` as the land beside a river is B1. A shared entry cannot carry
  two levels honestly.
- Definitions, examples, synonyms, antonyms and word-family links always belong
  to one meaning. Mixing them is what makes learner dictionaries confusing.
- Ids stay stable and reviewable. `en:bank:noun` keeps the first sense;
  `en:bank-river:noun` is a new entry, and the id-alias file is untouched.

## Naming

- `sense` is a short lowercase slug: `river`, `sport`, `accusation`, `release`.
- `sense_label` is a short English gloss shown in the dictionary next to the
  headword, for example `bank · land beside a river`.
- The id uses the slug when the bare word is already taken:
  `en:bank:noun` → `en:bank-river:noun`. Do not rename the existing id.
- Two entries may share word and form only when they have different `sense`
  values or different `level` values. `npm run validate` checks the id rules;
  reviewers check the sense labels.

## CEFR rule

The `level` of the entry is the level of **that meaning**, established with the
same sources as any other entry (Oxford 3000/5000 sense-aware tags, EVP,
Cambridge, Larousse, Treccani, Babiniotis, Ozhegov and the language policy in
`docs/a0-a1-policy.md`). If a meaning is used at more than one level, list every
level in `levels` and keep `level` equal to the lowest one.

Definitions and examples must be understandable at the entry's own level. For a
B1 sense, use B1 words and short sentences; do not copy the C1 definition of the
same word from another dictionary.

## Passes so far

The model was applied in six passes on 2026-11-28. Together they split 143
English senses out of existing headwords.

Pass 1 added 13 senses: `bank` (river), `match` (game), `court` (sport),
`spring` (water), `case` (instance), `point` (idea), `state` (condition),
`light` (not heavy), `season` (add flavour), `charge` (accusation), `issue`
(release), `matter` (be important) and `right` (entitlement).

Pass 2 added 31 senses:

- A2: `set` (group), `turn` (chance), `line` (queue), `drop` (liquid),
  `note` (message), `pass` (ticket), `plan` (map), `press` (push), `ring`
  (phone), `top` (highest part), `treat` (something special), `way` (method).
- B1: `order` (command), `cover` (take over work), `face` (deal with),
  `head` (leader), `live` (happening now), `look` (appearance), `mean`
  (unkind), `paper` (newspaper), `part` (role), `raise` (increase), `rest`
  (remainder), `room` (space), `store` (keep), `strike` (hit), `support`
  (help), `term` (word), `train` (teach skills), `wear` (damage from use),
  `wonder` (feeling of surprise).

Two base entries were also corrected because their definitions described a
different part of speech: `cover` (noun) now means a lid or protective cover,
and `pass` (noun) now means a successful exam result. The old duty-taking sense
of `cover` lives on as `en:cover-takeover:verb`.

Pass 3 added 27 senses:

- A2: `work` (operate), `play` (music), `call` (shout), `play` (theatre),
  `break` (rest), `point` (score), `form` (shape), `light` (pale colour),
  `keep` (continue), `set` (put in place).
- B1: `work` (something an artist made), `call` (give a name), `hold`
  (contain), `hold` (organize an event), `keep` (write a record), `break`
  (not obey a rule), `check` (inspection), `fire` (shoot), `form` (type),
  `run` (manage), `run` (series of events), `set` (fixed), `order`
  (arrangement), `case` (legal matter), `live` (not dead).
- B2: `paper` (academic article), `matter` (physical substance).

Three conflated base entries were corrected in the same pass: `play` (noun)
now means activity for fun, `light` (adjective) now means full of light and not
dark, and `set` (verb) now only carries the begin sense with a real
transcription. The other senses moved to the new entries.

Pass 4 added 30 senses:

- A2: `place` (seat), `hard` (difficult), `class` (lesson), `pound` (weight),
  `subject` (topic), `tip` (money), `wave` (hand movement).
- B1: `state` (country), `power` (control), `mean` (intend), `support`
  (hold up), `support` (a prop), `open` (available), `free` (not busy),
  `key` (important), `stage` (phase), `board` (committee), `plant` (factory),
  `post` (job), `capital` (business money), `degree` (university
  qualification), `figure` (body shape), `well` (healthy), `note` (musical
  sound), `rock` (music), `present` (now), `tap` (knock), `tip` (pointed end).
- B2: `land` (property), `word` (promise).

Pass 4 also corrected seven base entries that mixed two senses in one
definition: `land` (noun) now means solid ground, `mean` (noun) means average,
`free` (adjective) means costing no money, `hard` (adjective) means solid and
firm, `pound` (noun) means British money, `present` (noun) means gift, and
`tip` (noun) means advice. The other meanings live in the new entries.

Pass 5 added 30 senses:

- A1: `fine` (good enough).
- A2: `kind` (type), `story` (building level), `glass` (material), `table`
  (list in rows), `floor` (building level), `last` (final), `time` (occasion),
  `wood` (small forest), `account` (bank account), `card` (playing card),
  `mouse` (computer device), `bug` (insect), `coach` (long-distance bus).
- B1: `fine` (very thin), `last` (continue), `market` (buying and selling),
  `interest` (money for a loan), `page` (web page), `program` (computer
  software), `cloud` (internet storage), `file` (folder for papers), `virus`
  (illness), `field` (area of study), `plane` (flat surface), `ground`
  (reason), `ship` (send goods), `right` (morally good).
- B2: `company` (companionship), `window` (chance for a limited time).

Pass 5 also narrowed two base entries: `last` (adjective) now means most
recent, with the final sense in `last-final`, and `right` (adjective) now means
correct or true, with the moral sense in `right-moral`.

Pass 6 added 12 senses:

- A2: `change` (money returned), `figure` (shape), `space` (empty area),
  `card` (greeting card), `show` (public performance).
- B1: `account` (description), `row` (line), `row` (argument), `space`
  (outer space), `book` (official record).
- B2: `end` (purpose), `start` (move suddenly).

Pass 6 also narrowed `show` (noun) to a television programme and removed the
shape example from `figure` (number); the other meanings live in the new
entries. `end` and `start` gained sense labels and `end` gained a real IPA
transcription.

The base entry of every split pair now carries its own `sense` and
`sense_label`, so the dictionary shows both meanings instead of only the new
one. This is a demonstration of the model, not a claim that English polysemy is
complete. Later tasks extend it by frequency and by level.
