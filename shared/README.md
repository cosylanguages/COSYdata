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

---

## Click-to-define & Personal Dictionary (`shared/cosy-word-popup.js`)

`shared/cosy-word-popup.js` is a lightweight, dependency-free ES module for auto-detecting vocabulary words in web pages, showing floating definition cards with speech output, and maintaining a personal saved-word dictionary in `localStorage`.

### What `flat-index.json` is for

Each language folder contains `flat-index.json`, a pre-computed map from lowercased surface forms (`word`, `plural_form`, `comparative`, `superlative`) to an array of matching word `{ id, field }` entries. Client applications load `flat-index.json` to instantly match text node tokens without downloading full theme files upfront.

### Module API

- **`createCosyDictionary(namespace)`**: Returns a `localStorage`-backed personal dictionary instance (`list()`, `add(entry)`, `remove(id)`, `has(id)`, `exportJson()`, `importJson()`, `onChange(cb)`).
- **`autoDetect(root, { lang, matchWord })`**: Scans text nodes under `root` and wraps matched vocabulary words in `<button class="cosy-word">` elements, skipping anything already inside `[data-vocab]`, `[data-cosy-skip]`, `<script>`, `<style>`, `<code>`, or `<pre>`.
- **`attachPopupHandler(root, { resolveEntry, dictionary, onSuggestUrl })`**: Attaches a delegated click handler that opens a floating popup card with word details, Web Speech audio synthesis, and a "Save word" toggle.
- **`hydrate(root, opts)`**: Convenience wrapper combining `autoDetect` and `attachPopupHandler`.

### Minimal Wiring Example

```html
<script type="module">
  import { resolveVocab } from 'https://cosylanguages.github.io/COSYdata/shared/vocab-resolver.js';
  import { hydrate, createCosyDictionary } from 'https://cosylanguages.github.io/COSYdata/shared/cosy-word-popup.js';

  // 1. Fetch flat index for language
  const res = await fetch('https://cosylanguages.github.io/COSYdata/vocabulary/en/flat-index.json');
  const flatIndex = await res.json();

  // 2. Define matchWord backed by flatIndex
  const matchWord = (word) => flatIndex[word.toLowerCase()];

  // 3. Hydrate container element with auto-detection & popup
  const dictionary = createCosyDictionary('my-app');
  hydrate(document.body, {
    lang: 'en',
    matchWord,
    resolveEntry: resolveVocab,
    dictionary,
  });
</script>
```
