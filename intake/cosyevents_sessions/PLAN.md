# Intake Plan: COSYevents Session Vocabulary Batch

This document establishes the intake specification, data file layout, schema alignment rules, and ingestion pipeline for incorporating vocabulary surfaced during interactive **COSYevents** live sessions into `COSYdata`.

## 1. Batch Overview & Source Description

- **Batch Source**: Vocabulary items, key phrases, and domain-specific terms introduced or surfaced during live community events, workshops, and interactive practice sessions hosted on `COSYevents`.
- **Primary Objective**: Provide a structured intake staging workflow to capture real-time vocabulary generated during events, enrich them with standard metadata (IPA transcriptions, CEFR level, definitions, examples, emoji, and course track tagging), and integrate them into canonical `vocabulary/<lang>/<level>/<theme>.json` files.
- **Batch Status (2026-11-28)**: Executed. 1,597 unique English terms were harvested from 12 COSYevents club folders (Speaking Clubs, Cinema Club, Karaoke Club, Long Reads, Keeping Up with Science, Mind Matters, I Couldn't Help But Wonder, The Greatest Quotes, Let's Celebrate, Debatable & Relatable, My Life With & Without, If You Were), using structured Markdown frontmatter and HTML vocabulary cards. 869 were already present in COSYdata, 27 non-unit or metadata cards were skipped, and 701 new entries were added. Provenance and the machine-readable batch are in `cosyevents-vocabulary.json`; the human-editable export is `english.csv`.

---

## 2. Intake Directory File Structure

The `intake/cosyevents_sessions/` batch folder follows the standard `intake/` pattern established in `intake/a0_a1_fr_it_ru_el/`:

```
intake/cosyevents_sessions/
├── PLAN.md              # Intake specification, schema mapping, and pipeline guide (this file)
├── read_me.csv          # High-level summary of session batch scope and usage notes
├── all_languages.csv    # Master comparative side-by-side CSV for multi-language session terms
├── english.csv          # English (en) session vocabulary export template
├── french.csv           # French (fr) session vocabulary export template
├── german.csv           # German (de) session vocabulary export template
└── spanish.csv          # Spanish (es) session vocabulary export template
```

---

## 3. CSV Column Specifications

### Per-Language CSV Layout (`english.csv`, `french.csv`, `german.csv`, `spanish.csv`)
| Column Header | Required | Description & Example |
|---|---|---|
| `Session_ID` | Yes | Identifier of the originating event/session (e.g., `event-2025-01-webinar-01`). |
| `Category` | Yes | Thematic topic / category (e.g., `Technology`, `Business`, `Travel`, `Daily Life`). |
| `English` | Yes | English reference gloss or concept name. |
| `Word` | Yes | Target headword in the target language (e.g., `réunion`, `Schlüssel`). |
| `CEFR_Level` | Yes | Estimated CEFR level (`A0`, `A1`, `A2`, `B1`, `B2`, `C1`, `C2`). |
| `Part_Of_Speech` | Yes | Grammatical form (`noun`, `verb`, `adjective`, `adverb`, `phrase`). |
| `Context_Notes` | No | Session context, sentence fragment, or usage notes from the live event. |

### Master Comparative CSV Layout (`all_languages.csv`)
| Column Header | Required | Description |
|---|---|---|
| `Session_ID` | Yes | Identifier of the originating event/session. |
| `Category` | Yes | Thematic topic / category. |
| `English` | Yes | English base term / reference word. |
| `French` | No | Target French term. |
| `German` | No | Target German term. |
| `Spanish` | No | Target Spanish term. |
| `CEFR_Level` | Yes | Target CEFR level designation. |
| `Notes` | No | Additional session context or translation notes. |

---

## 4. Ingestion & Transformation Pipeline

When `COSYevents` exports vocabulary files into `intake/cosyevents_sessions/`:

1. **Extraction & Verification**:
   - Verify that exported session terms are placed into the corresponding language CSVs (`english.csv`, `french.csv`, etc.).
   - Check that `CEFR_Level`, `Category`, and `Word` are fully populated.

2. **Schema & ID Alignment**:
   - Slugify headwords according to language conventions to form canonical IDs (`<lang>:<slug>:<form>`).
   - Match `Category` against canonical taxonomy in `shared/themes.json`.
   - Ensure mandatory fields per `schemas/vocabulary.schema.json` are generated:
     - Nouns: `countability`, `article`, `gender`, `plural_form` (if countable).
     - Transcriptions: single IPA string (or `{ "uk": "...", "us": "..." }` for English).
     - Emoji, definitions, examples, antonyms/synonyms.

3. **Merging & Index Updates**:
   - Merge new vocabulary entries into target level theme files (`vocabulary/<lang>/<level>/<theme>.json`).
   - Run `npm run build` (`npm run build:index`, `npm run build:flat-index`, `npm run build:search-index`).
   - Run `npm run validate` to ensure complete repository compliance.

### Executed batch (2026-11-28)

The enriched batch is `intake/cosyevents_sessions/cosyevents-vocabulary.json`. Each entry keeps its COSYevents provenance in `clubs`, `session_level`, and `sources`; the importer strips those fields before writing canonical data. Re-running the importer against an already-imported batch reports the entries as existing IDs instead of duplicating them.

```bash
# Re-run the import (idempotent: existing IDs are reported, not duplicated)
node scripts/import-events-vocab.cjs intake/cosyevents_sessions/cosyevents-vocabulary.json

# Required after any successful import
npm run build
npm run validate
```

Enrichment sources: session definitions/examples first; Wiktionary (English section) for IPA, noun countability, and plural evidence; WordNet for part of speech, synonyms, and antonyms. Missing phrase IPA is composed from component headwords, with manual overrides for technical and loanword items. The quality audit reports zero new findings for this batch.
