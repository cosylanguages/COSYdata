# Domain and Tagging Conventions

This document outlines the conventions and observed practices for the `domain` and `sub_theme` fields across COSYdata vocabulary and functional phrase datasets.

---

## 1. `domain` Field Format & Conventions

The `domain` property in entry schemas indicates the thematic or course contexts in which a word or phrase is applied (e.g., `general`, `spoken`, `relocation`, `travel`, `professional`, `exam`).

### Key Rules and De Facto Conventions

1. **Comma-Separated String Format**
   - Multiple domain values are formatted as a comma-separated list with a single space following each comma (e.g., `"general, spoken"`, `"general, relocation, travel"`).

2. **Primary / Core Placement (`"general"`)**
   - Whenever `"general"` is present in the domain list, it **must always come first** (e.g., `"general, spoken"`, `"general, relocation"`).

3. **Insertion Order After `"general"` (De Facto Convention)**
   - **Alphabetical ordering after `"general"` is NOT the current convention.**
   - Live datasets contain variants reflecting insertion/addition order rather than alphabetical sort (for example, both `"general, spoken, relocation"` and `"general, relocation, spoken"` exist in live data).
   - Subsequent domains follow the de facto insertion order based on the course or track priority in which the item was categorized (e.g., `spoken`, `relocation`, `travel`, `professional`, `exam`).

---

## 2. Professional Domain & Sub-Theme Conventions

The `professional` domain covers specialized workplace, academic, and career track vocabulary.

### Core vs. Track-Specific Words

- **Part 1 Shared-Core Words**:
  - Domain: `"general, professional"`
  - `sub_theme`: Omitted / omitted in schema (represented by the `"general"` track slug in `vocabulary/professional-tracks.json`).

- **Track-Specific Words**:
  - Domain: `"professional"` (or `"general, professional"`)
  - `sub_theme`: Set to the specific track slug defined in `vocabulary/professional-tracks.json`.

### Valid Professional Tracks (`vocabulary/professional-tracks.json`)

| Track Slug | Track Label | Description |
| --- | --- | --- |
| `general` | General Professional | Part 1 shared-core professional words (uses domain `"general, professional"` without `sub_theme`) |
| `teachers-scientists` | Teachers & Scientists | Specialized terms for education and research professionals |
| `it-specialists` | IT Specialists | Software engineering, computing, and IT terminology |
| `legal-english` | Legal English | Legal terminology, contracts, and jurisprudence |
| `academic-english` | Academic English | Scholarly writing, discourse, and research methodology |

---

## 3. Maintaining and Extending Tracks

When adding new professional or exam tracks:
1. Append the new track object `{"slug": "...", "label": "...", "added": "YYYY-MM-DD"}` to `vocabulary/professional-tracks.json` or `vocabulary/exam-tracks.json`.
2. Assign the corresponding `sub_theme` value on entry objects belonging to that track.

---

## 4. Exam Domain & Sub-Theme Conventions

The `exam` domain covers high-stakes language examination, testing, and test-preparation vocabulary.

### Core vs. Track-Specific Words

- **Shared Exam Skills Words**:
  - Domain: `"general, exam"` (or `"exam"`)
  - `sub_theme`: Omitted / omitted in schema (represented by the `"general"` track slug in `vocabulary/exam-tracks.json`).

- **Track-Specific Words**:
  - Domain: `"exam"` (or `"general, exam"`)
  - `sub_theme`: Set to the specific track slug defined in `vocabulary/exam-tracks.json`.

### Valid Exam Tracks (`vocabulary/exam-tracks.json`)

| Track Slug | Track Label | Description |
| --- | --- | --- |
| `general` | General Exam Skills | Shared exam vocabulary (instructions, task types, common exam-rubric language) that applies across exam boards (uses domain `"general, exam"` or `"exam"` without `sub_theme`) |
| `ielts` | IELTS Preparation | Vocabulary, topics, and tasks specific to the IELTS exam |
| `toefl` | TOEFL Preparation | Vocabulary, topics, and tasks specific to the TOEFL exam |
| `cambridge` | Cambridge Exams (FCE/CAE/CPE) | Vocabulary, topics, and tasks specific to Cambridge English qualifications |
