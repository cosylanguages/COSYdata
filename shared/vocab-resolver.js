/**
 * COSYdata Vocabulary Resolver
 *
 * Client-side helper module to resolve vocabulary references into rendered content.
 *
 * Usage Example:
 * --------------
 * <script type="module">
 *   import { resolveVocab, hydrateVocabElements } from 'https://cosylanguages.github.io/COSYdata/shared/vocab-resolver.js';
 *
 *   // 1. Programmatic resolution
 *   const entry = await resolveVocab('en:animals:cat'); // theme explicitly provided
 *   const entry2 = await resolveVocab('en:cat:noun');   // canonical ID
 *   console.log(entry.word, entry.emoji); // "cat", "🐱"
 *
 *   // 2. DOM Hydration
 *   // <span data-vocab="en:cat" data-vocab-field="emoji"></span>
 *   await hydrateVocabElements();
 * </script>
 */

const DEFAULT_BASE_URL = 'https://cosylanguages.github.io/COSYdata/';
const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const CACHE_PREFIX = 'cosydata:';

const memoryCache = new Map();

function getStorage() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
  } catch (err) {
    // localStorage might be restricted
  }
  return null;
}

function getCache(key) {
  const fullKey = CACHE_PREFIX + key;
  const storage = getStorage();

  if (storage) {
    try {
      const item = storage.getItem(fullKey);
      if (item) {
        const parsed = JSON.parse(item);
        if (parsed && parsed.expiry && Date.now() < parsed.expiry) {
          return parsed.data;
        } else {
          storage.removeItem(fullKey);
        }
      }
    } catch (err) {
      // Ignore storage read error
    }
  }

  const memItem = memoryCache.get(fullKey);
  if (memItem && memItem.expiry && Date.now() < memItem.expiry) {
    return memItem.data;
  } else if (memItem) {
    memoryCache.delete(fullKey);
  }

  return null;
}

function setCache(key, data, ttlMs = DEFAULT_TTL_MS) {
  const fullKey = CACHE_PREFIX + key;
  const expiry = Date.now() + ttlMs;
  const payload = { data, expiry };

  const storage = getStorage();
  if (storage) {
    try {
      storage.setItem(fullKey, JSON.stringify(payload));
    } catch (err) {
      // Ignore storage write error
    }
  }

  memoryCache.set(fullKey, payload);
}

async function fetchJson(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`[COSYdata] Fetch failed (${res.status} ${res.statusText}): ${url}`);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.warn(`[COSYdata] Network or parsing error fetching ${url}: ${err.message}`);
    return null;
  }
}

function handleFailure(message, options, error = null) {
  const err = error || new Error(message);
  console.warn(`[COSYdata] ${message}`);
  if (options && typeof options.onError === 'function') {
    options.onError(err);
  }
  if (options && options.fallback !== undefined) {
    return options.fallback;
  }
  return null;
}

/**
 * Resolves a vocabulary reference into a vocabulary entry object.
 *
 * Supported reference formats:
 * - "lang:theme:word-slug" (e.g. "en:animals:cat")
 * - "lang:word-slug:form"  (e.g. "en:healthy:adjective" or "en:cat:noun")
 * - "lang:word-slug"       (e.g. "en:cat")
 *
 * @param {string} ref - Vocabulary reference string
 * @param {Object} [options]
 * @param {string} [options.baseUrl] - Base URL for COSYdata repo
 * @param {number} [options.ttlMs] - Cache TTL in milliseconds
 * @param {any} [options.fallback] - Optional fallback return value when entry cannot be resolved
 * @param {Function} [options.onError] - Optional error handler callback
 * @returns {Promise<Object|null>} Vocabulary entry object, fallback value, or null
 */
export async function resolveVocab(ref, options = {}, _visited = new Set()) {
  if (!ref || typeof ref !== 'string') {
    return handleFailure(`Invalid ref passed to resolveVocab: ${ref}`, options);
  }

  if (_visited.has(ref)) {
    return handleFailure(`Circular alias cycle detected for ref '${ref}'.`, options);
  }
  _visited.add(ref);

  const baseUrl = (options.baseUrl || DEFAULT_BASE_URL).replace(/\/?$/, '/');
  const ttlMs = typeof options.ttlMs === 'number' ? options.ttlMs : DEFAULT_TTL_MS;

  const parts = ref.split(':');
  if (parts.length < 2) {
    return handleFailure(`Malformed ref '${ref}'. Expected 'lang:word' or 'lang:theme:word' or 'lang:word:form'.`, options);
  }

  const lang = parts[0];
  let theme = null;
  let wordSlug = null;
  let targetForm = null;

  const KNOWN_FORMS = new Set([
    'noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition',
    'postposition', 'conjunction', 'interjection', 'phrase', 'number',
    'determiner', 'article', 'particle', 'phrasal_verb', 'idiom',
    'expression', 'prefix', 'suffix'
  ]);

  if (parts.length >= 3) {
    const lastPart = parts[parts.length - 1];
    if (KNOWN_FORMS.has(lastPart.toLowerCase())) {
      // Format: lang:word-slug:form
      wordSlug = parts.slice(1, parts.length - 1).join(':');
      targetForm = lastPart;
    } else {
      // Format: lang:theme:word-slug
      theme = parts[1];
      wordSlug = parts.slice(2).join(':');
    }
  } else {
    // Format: lang:word-slug
    wordSlug = parts[1];
  }

  if (!theme) {
    const indexCacheKey = `${lang}:index`;
    let indexData = getCache(indexCacheKey);

    if (!indexData) {
      const indexUrl = `${baseUrl}vocabulary/${lang}/index.json`;
      indexData = await fetchJson(indexUrl);
      if (indexData) {
        setCache(indexCacheKey, indexData, ttlMs);
      }
    }

    if (!indexData) {
      return handleFailure(`Unable to load index.json for language '${lang}'.`, options);
    }

    // Match wordSlug / exact ref / canonical ID in index.json
    let targetFile = indexData[ref];

    if (!targetFile) {
      for (const [idKey, filename] of Object.entries(indexData)) {
        const keyParts = idKey.split(':');
        const hasFormInKey = keyParts.length >= 3 && KNOWN_FORMS.has(keyParts[keyParts.length - 1].toLowerCase());
        const slugInKey = keyParts.length >= 2
          ? keyParts.slice(1, hasFormInKey ? keyParts.length - 1 : keyParts.length).join(':')
          : idKey;
        const formInKey = hasFormInKey ? keyParts[keyParts.length - 1] : null;

        if (
          idKey === ref ||
          idKey === wordSlug ||
          slugInKey === wordSlug ||
          (targetForm && slugInKey === wordSlug && formInKey === targetForm)
        ) {
          targetFile = filename;
          break;
        }
      }
    }

    if (!targetFile) {
      // Fallback: check shared/id-aliases.json for retired IDs
      const aliasCacheKey = 'shared:id-aliases';
      let aliasData = getCache(aliasCacheKey);
      if (!aliasData) {
        const aliasUrl = `${baseUrl}shared/id-aliases.json`;
        aliasData = await fetchJson(aliasUrl);
        if (aliasData) {
          setCache(aliasCacheKey, aliasData, ttlMs);
        }
      }

      if (aliasData && aliasData[ref]) {
        const targetAliasId = aliasData[ref];
        return await resolveVocab(targetAliasId, options, _visited);
      }

      return handleFailure(`Word reference '${ref}' not found in index for language '${lang}'.`, options);
    }

    theme = targetFile.replace(/\.json$/, '');
  }

  const themeCacheKey = `${lang}:${theme}`;
  let themeData = getCache(themeCacheKey);

  if (!themeData) {
    const themeUrl = `${baseUrl}vocabulary/${lang}/${theme}.json`;
    themeData = await fetchJson(themeUrl);
    if (themeData) {
      setCache(themeCacheKey, themeData, ttlMs);
    }
  }

  if (!themeData) {
    return handleFailure(`Unable to load theme file '${theme}.json' for language '${lang}'.`, options);
  }

  const entries = Array.isArray(themeData)
    ? themeData
    : typeof themeData === 'object' && themeData !== null && themeData.id
    ? [themeData]
    : typeof themeData === 'object' && themeData !== null
    ? Object.values(themeData)
    : [];

  for (const entry of entries) {
    if (!entry || !entry.id) continue;
    const keyParts = entry.id.split(':');
    const hasFormInId = keyParts.length >= 3 && KNOWN_FORMS.has(keyParts[keyParts.length - 1].toLowerCase());
    const slugInId = keyParts.length >= 2
      ? keyParts.slice(1, hasFormInId ? keyParts.length - 1 : keyParts.length).join(':')
      : entry.word;
    const formInId = hasFormInId ? keyParts[keyParts.length - 1] : entry.form;

    if (
      entry.id === ref ||
      entry.id === wordSlug ||
      entry.word === wordSlug ||
      slugInId === wordSlug ||
      (targetForm && slugInId === wordSlug && formInId === targetForm)
    ) {
      return entry;
    }
  }

  // Fallback: check shared/id-aliases.json
  const aliasCacheKey = 'shared:id-aliases';
  let aliasData = getCache(aliasCacheKey);
  if (!aliasData) {
    const aliasUrl = `${baseUrl}shared/id-aliases.json`;
    aliasData = await fetchJson(aliasUrl);
    if (aliasData) {
      setCache(aliasCacheKey, aliasData, ttlMs);
    }
  }

  if (aliasData && aliasData[ref]) {
    const targetAliasId = aliasData[ref];
    return await resolveVocab(targetAliasId, options, _visited);
  }

  return handleFailure(`Word reference '${ref}' not found in theme '${theme}' for language '${lang}'.`, options);
}

/**
 * Extracts field value from a vocabulary entry.
 * Supports array indexing (e.g. definitions[0], synonyms[1]), aliases (definition, example), and joined arrays.
 *
 * @param {Object} entry - Vocabulary entry object
 * @param {string} field - Field specification string
 * @returns {any} Field value or null if not found
 */
export function extractVocabField(entry, field = 'word') {
  if (!entry || typeof entry !== 'object') return null;

  if (field === 'definition') field = 'definitions[0]';
  if (field === 'example') field = 'examples[0]';

  const arrayIndexMatch = field.match(/^([a-zA-Z0-9_]+)\[(\d+)\]$/);
  if (arrayIndexMatch) {
    const prop = arrayIndexMatch[1];
    const index = parseInt(arrayIndexMatch[2], 10);
    if (Array.isArray(entry[prop]) && index < entry[prop].length) {
      return entry[prop][index];
    }
    return null;
  }

  if (field in entry) {
    const val = entry[field];
    if (Array.isArray(val)) {
      return val.join(', ');
    }
    return val;
  }

  return null;
}

/**
 * Hydrates DOM elements with data-vocab attributes under a root element.
 *
 * @param {Element|Document} [root=document] - Root container element
 * @param {Object} [options] - Options passed to resolveVocab and fallback settings
 * @param {any} [options.fallback] - Fallback text or function (ref, field) => string
 * @param {Function} [options.onError] - Error handler callback (ref, field, error) => void
 */
export async function hydrateVocabElements(root = typeof document !== 'undefined' ? document : null, options = {}) {
  if (!root || typeof root.querySelectorAll !== 'function') {
    return;
  }

  const elements = root.querySelectorAll('[data-vocab]');

  for (const el of elements) {
    const ref = el.getAttribute('data-vocab');
    if (!ref) continue;

    const field = el.getAttribute('data-vocab-field') || 'word';

    try {
      const entry = await resolveVocab(ref, options);
      let value = null;

      if (entry) {
        value = extractVocabField(entry, field);
      }

      if (value !== null && value !== undefined) {
        el.textContent = String(value);
      } else {
        let fallbackVal = typeof el.getAttribute === 'function' ? el.getAttribute('data-vocab-fallback') : null;
        if (fallbackVal === null && options.fallback !== undefined) {
          fallbackVal = typeof options.fallback === 'function' ? options.fallback(ref, field) : options.fallback;
        }

        if (fallbackVal !== null && fallbackVal !== undefined) {
          el.textContent = String(fallbackVal);
        }

        if (!entry && typeof options.onError === 'function') {
          options.onError(ref, field, new Error(`Failed to resolve ref '${ref}'`));
        }
      }
    } catch (err) {
      console.warn(`[COSYdata] Failed to hydrate element for ref '${ref}': ${err.message}`);
      let fallbackVal = typeof el.getAttribute === 'function' ? el.getAttribute('data-vocab-fallback') : null;
      if (fallbackVal === null && options.fallback !== undefined) {
        fallbackVal = typeof options.fallback === 'function' ? options.fallback(ref, field) : options.fallback;
      }
      if (fallbackVal !== null && fallbackVal !== undefined) {
        el.textContent = String(fallbackVal);
      }
      if (typeof options.onError === 'function') {
        options.onError(ref, field, err);
      }
    }
  }
}
