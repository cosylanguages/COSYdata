# Shared Vocabulary Resolver (`shared/vocab-resolver.js`)

`shared/vocab-resolver.js` is the client-side JavaScript module that other repos across the COSYlanguages ecosystem (`COSYlanguages`, `COSYmanuals`, `COSYgames`, `COSYtools`) import to resolve vocabulary references into rendered content at runtime.

No build tooling or framework is required. It is served as a plain ES module over GitHub Pages.

---

## How to Include in Another Repository

Include the script using an ES module `<script type="module">` tag pointing to the published GitHub Pages URL (or raw GitHub content URL):

```html
<script type="module">
  import { resolveVocab, hydrateVocabElements } from 'https://cosylanguages.github.io/COSYdata/shared/vocab-resolver.js';

  // Example 1: Programmatic resolution
  const entry = await resolveVocab('en:animals:cat');
  if (entry) {
    console.log(entry.word); // "cat"
    console.log(entry.emoji); // "🐱"
    console.log(entry.transcription); // "/kæt/"
  }

  // Example 2: Automatic DOM hydration
  // Hydrates all elements with [data-vocab] attributes under document
  await hydrateVocabElements();
</script>
```

---

## Functions API

### 1. `resolveVocab(ref, options)`

Resolves a vocabulary reference string into a full vocabulary entry object.

#### Parameters
- **`ref`** *(string)*: Reference in either of two formats:
  - `"language:theme:word-slug"` (e.g., `"en:animals:cat"`) - Fetches theme file directly.
  - `"language:word-slug"` (e.g., `"en:cat"`) - Looks up theme file in `vocabulary/<lang>/index.json` first.
- **`options`** *(Object, optional)*:
  - **`baseUrl`** *(string)*: Overrides base URL (default: `https://cosylanguages.github.io/COSYdata/`). Useful for local development or staging.
  - **`ttlMs`** *(number)*: Cache TTL in milliseconds (default: `86400000` = 24 hours).

#### Returns
- **`Promise<Object|null>`**: Resolves to the vocabulary entry object, or `null` if not found or on network/parse error.

---

### 2. `hydrateVocabElements(root = document, options = {})`

Finds all elements with a `data-vocab` attribute under `root`, resolves each reference, and populates the text content according to `data-vocab-field`.

#### HTML Attributes
- **`data-vocab`**: Reference string (e.g. `"en:animals:cat"` or `"en:cat"`).
- **`data-vocab-field`**: Target field to display (default: `"word"`).
  - Supported options: `word`, `emoji`, `transcription`, `definitions[0]`, `examples[0]`, `plural_form`, `level`, etc.

#### HTML Example
```html
<p>
  Meet the <span data-vocab="en:animals:cat" data-vocab-field="emoji"></span>
  <strong data-vocab="en:animals:cat" data-vocab-field="word">cat</strong>
  (<span data-vocab="en:animals:cat" data-vocab-field="transcription"></span>):
  <i data-vocab="en:animals:cat" data-vocab-field="definitions[0]"></i>
</p>
```

---

## Caching & Error Handling

- **Caching**: Theme files and `index.json` lookups are automatically cached in browser `localStorage` under keys prefixed with `cosydata:` (e.g. `cosydata:en:animals`) with a 24-hour default TTL. Falls back to in-memory caching if `localStorage` is disabled.
- **Error Handling**: Network failures, 404s, or malformed JSON log a console warning (`[COSYdata]`) and leave element text untouched without throwing unhandled exceptions.
