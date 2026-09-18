# Domain and Tagging Conventions

This document outlines the conventions and observed practices for the `domain` and `sub_theme` fields across COSYdata vocabulary and functional phrase datasets.

---

## 1. `domain` Field Format & Conventions

The `domain` property in entry schemas indicates the thematic or course contexts in which a word or phrase is applied (e.g., `general`, `spoken`, `relocation`, `travel`, `professional`).

### Key Rules and De Facto Conventions

1. **Comma-Separated String Format**
   - Multiple domain values are formatted as a comma-separated list with a single space following each comma (e.g., `"general, spoken"`, `"general, relocation, travel"`).

2. **Primary / Core Placement (`"general"`)**
   - Whenever `"general"` is present in the domain list, it **must always come first** (e.g., `"general, spoken"`, `"general, relocation"`).

3. **Insertion Order After `"general"` (De Facto Convention)**
   - **Alphabetical ordering after `"general"` is NOT the current convention.**
   - Live datasets contain variants reflecting insertion/addition order rather than alphabetical sort (for example, both `"general, spoken, relocation"` and `"general, relocation, spoken"` exist in live data).
   - Subsequent domains follow the de facto insertion order based on the course or track priority in which the item was categorized (e.g., `spoken`, `relocation`, `travel`, `professional`).

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

When adding new professional tracks:
1. Append the new track object `{"slug": "...", "label": "...", "added": "YYYY-MM-DD"}` to `vocabulary/professional-tracks.json`.
2. Assign the corresponding `sub_theme` value on entry objects belonging to that track.
