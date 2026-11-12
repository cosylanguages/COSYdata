# Intake Plan: COSYevents Session Vocabulary Batch

This document establishes the intake specification, data file layout, schema alignment rules, and ingestion pipeline for incorporating vocabulary surfaced during interactive **COSYevents** live sessions into `COSYdata`.

## 1. Batch Overview & Source Description

- **Batch Source**: Vocabulary items, key phrases, and domain-specific terms introduced or surfaced during live community events, workshops, and interactive practice sessions hosted on `COSYevents`.
- **Primary Objective**: Provide a structured intake staging workflow to capture real-time vocabulary generated during events, enrich them with standard metadata (IPA transcriptions, CEFR level, definitions, examples, emoji, and course track tagging), and integrate them into canonical `vocabulary/<lang>/<level>/<theme>.json` files.
- **External Dependency Note**: As of this writing, `COSYevents` is an empty/unpopulated repository with no automated export pipeline or exported vocabulary content yet. Consequently, this intake directory (`intake/cosyevents_sessions/`) is established as a **ready-to-fill batch template**. Once `COSYevents` exports session vocabulary logs or CSVs, data will be placed into the per-language CSV files in this folder following the specification below.

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
