# Portuguese (`pt`) A0–A1 Vocabulary Migration Gap Reconciliation Report

## Executive Summary

This report documents the reconciliation and migration gap closure for Portuguese (`pt`) A0–A1 core vocabulary between **COSYlanguages** (legacy UI repo) and **COSYdata** (canonical static data repository).

Prior to this task, `COSYdata/vocabulary/pt/a0_a1/` contained 124 entries. While a baseline core existed, 360 candidate terms in `COSYlanguages` had not yet been integrated into `COSYdata`.

Through gap analysis, European Portuguese (pt-PT) dialectal alignment, and CEFR A1 standards verification against **CAPLE (Centro de Avaliação de Português Língua Estrangeira - CIPLE A1)** and **QuaREPE (Quadro de Referência para o Ensino Português no Estrangeiro)**:
- **352 candidate terms** qualified as distinct, valuable beginner terms and were fully converted and incorporated into `COSYdata/vocabulary/pt/a0_a1/*.json`.
- **Dialectal consistency** was maintained across all entries adhering to European Portuguese (pt-PT) spelling conventions (e.g. `Amesterdão`, `Polónia`, `dececionado`, `telemóvel`, `conduzir`, `Moscovo`).
- **Brazilian Portuguese variants** (such as `Moscou`) were flagged and normalized to `Moscovo` (pt-PT headword) while noting the pt-BR variant in definitions and reports.

Following this reconciliation, `COSYdata/vocabulary/pt/a0_a1/` contains **476 total entries** (476 unique words), achieving complete vocabulary parity with zero schema errors or linter failures.

---

## 1. Initial Gap Analysis & Methodology

The candidate list from `COSYlanguages` comprised 360 unique terms. Each candidate word was evaluated across the following criteria:
1. **Existing Entry Check**: Is the word already present in `COSYdata/vocabulary/pt/a0_a1/`?
2. **European Portuguese (pt-PT) Variety Alignment**: Is the word consistent with the European Portuguese standard used throughout `COSYdata/vocabulary/pt/a0_a1/` (e.g., `autocarro`, `pequeno-almoço`, `frigorífico`, `chávena`, `telemóvel`)?
3. **Dialectal Variation Handling**: Where Brazilian Portuguese (pt-BR) spellings or terms differed (e.g., `Moscou` vs `Moscovo`), the entry was converted to the pt-PT headword `Moscovo` while documenting the pt-BR alternative.
4. **CEFR A1 / CAPLE Standard Verification**: Is the term listed in or aligned with CAPLE CIPLE A1 / QuaREPE communicative goals?

---

## 2. Variety & Dialectal Alignment (pt-PT vs pt-BR)

`COSYdata/vocabulary/pt/a0_a1/` uses **European Portuguese (pt-PT)** as its primary language standard. All migrated entries conform to pt-PT orthography and vocabulary:

| Category / Term | European Portuguese (pt-PT) Standard Used | Brazilian Portuguese (pt-BR) Alternative | Alignment Action Taken |
| :--- | :--- | :--- | :--- |
| **Mobile Phone** | `telemóvel` | `celular` | Kept pt-PT headword `telemóvel` |
| **Driving Verb** | `conduzir` | `dirigir` | Kept pt-PT headword `conduzir` |
| **Breakfast** | `tomar o pequeno-almoço` | `tomar café da manhã` | Kept pt-PT expression `tomar o pequeno-almoço` |
| **City: Moscow** | `Moscovo` | `Moscou` | Converted candidate `Moscou` to pt-PT `Moscovo` |
| **Country: Poland** | `Polónia` | `Polônia` | Kept pt-PT orthography `Polónia` |
| **City: Amsterdam** | `Amesterdão` | `Amsterdã` | Kept pt-PT orthography `Amesterdão` |
| **Disillusioned** | `dececionado` (post-AO1990) | `decepcionado` | Kept pt-PT post-AO1990 orthography |
| **Cultural Dishes** | `feijoada`, `brigadeiro` | Same | Included as food/drink terms |

---

## 3. Migrated Qualifying Entries (352 Words)

The 352 qualifying words were converted and added to `COSYdata/vocabulary/pt/a0_a1/*.json` theme files (including newly populated standard theme files such as `daily_verbs.json`, `adjectives.json`, `general_adjectives.json`, `feelings.json`, `nationalities.json`, `adverbs_connectors.json`, `numbers.json`, `pronouns.json`, `prepositions.json`, `common_nouns.json`, `auxiliary_verbs.json`).

Each entry includes:
- Canonical ID convention: `pt:<slug>:<pos>`
- Monolingual European Portuguese definitions written in CEFR A1-calibrated vocabulary.
- Individualized, natural example sentences in European Portuguese.
- Valid single-string IPA transcriptions (`transcription`).
- Complete noun grammatical metadata (`gender`, `article`, `countability`, `plural_form` for countable nouns, and `countability: "invariable"` without plural forms for proper nouns).

---

## 4. Dataset Summary & Final Totals

| Metric | Pre-Migration | Post-Migration | Change |
| :--- | :---: | :---: | :---: |
| **Total Entries in `vocabulary/pt/a0_a1/`** | 124 | **476** | +352 |
| **Unique Words in `vocabulary/pt/a0_a1/`** | 124 | **476** | +352 |
| **Index Entries (`vocabulary/pt/index.json`)** | 140 | **492** | +352 |
| **Flat Index Forms (`vocabulary/pt/flat-index.json`)** | 240 | **609** | +369 |
| **Schema Validation Errors (`scripts/validate.cjs`)** | 0 | **0** | Pass |
| **Vocabulary Linter Warnings (`scripts/audit_vocabulary.cjs`)** | 0 | **0** | Pass |

---

## 5. Conclusion

The Portuguese (`pt`) A0–A1 vocabulary reconciliation task is complete. All distinct beginner concepts from `COSYlanguages` are now integrated into `COSYdata` under European Portuguese (pt-PT) conventions with 100% schema compliance and zero validation failures.
