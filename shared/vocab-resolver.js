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
 * @returns {Promise<Object|null>} Vocabulary entry object or null if not found
 */
export async function resolveVocab(ref, options = {}, _visited = new Set()) {
  if (!ref || typeof ref !== 'string') {
    console.warn(`[COSYdata] Invalid ref passed to resolveVocab: ${ref}`);
    return null;
  }

  if (_visited.has(ref)) {
    console.warn(`[COSYdata] Circular alias cycle detected for ref '${ref}'.`);
    return null;
  }
  _visited.add(ref);

  const baseUrl = (options.baseUrl || DEFAULT_BASE_URL).replace(/\/?$/, '/');
  const ttlMs = typeof options.ttlMs === 'number' ? options.ttlMs : DEFAULT_TTL_MS;

  const parts = ref.split(':');
  if (parts.length < 2) {
    console.warn(`[COSYdata] Malformed ref '${ref}'. Expected 'lang:word' or 'lang:theme:word' or 'lang:word:form'.`);
    return null;
  }

  const lang = parts[0];
  let theme = null;
  let wordSlug = null;
  let targetForm = null;

  const KNOWN_FORMS = new Set(['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'interjection', 'phrase', 'number']);

  if (parts.length >= 3) {
    const lastPart = parts[parts.length - 1];
    if (KNOWN_FORMS.has(lastPart.toLowerCase())) {
      // Format: lang:word-slug:form
      wordSlug = parts[1];
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
      console.warn(`[COSYdata] Unable to load index.json for language '${lang}'.`);
      return null;
    }

    // Match wordSlug / exact ref / canonical ID in index.json
    let targetFile = indexData[ref];

    if (!targetFile) {
      for (const [idKey, filename] of Object.entries(indexData)) {
        const keyParts = idKey.split(':');
        const slugInKey = keyParts.length >= 2 ? keyParts[1] : idKey;
        const formInKey = keyParts.length >= 3 ? keyParts[2] : null;

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

      console.warn(`[COSYdata] Word reference '${ref}' not found in index for language '${lang}'.`);
      return null;
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
    console.warn(`[COSYdata] Unable to load theme file '${theme}.json' for language '${lang}'.`);
    return null;
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
    const slugInId = keyParts.length >= 2 ? keyParts[1] : entry.word;
    const formInId = keyParts.length >= 3 ? keyParts[2] : entry.form;

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

  console.warn(`[COSYdata] Word reference '${ref}' not found in theme '${theme}' for language '${lang}'.`);
  return null;
}

/**
 * Hydrates DOM elements with data-vocab attributes under a root element.
 *
 * @param {Element|Document} [root=document] - Root container element
 * @param {Object} [options] - Options passed to resolveVocab
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
      if (!entry) continue;

      let value = null;

      if (field === 'definitions[0]' || field === 'definition') {
        value = Array.isArray(entry.definitions) && entry.definitions.length > 0 ? entry.definitions[0] : null;
      } else if (field === 'examples[0]' || field === 'example') {
        value = Array.isArray(entry.examples) && entry.examples.length > 0 ? entry.examples[0] : null;
      } else if (field in entry) {
        value = entry[field];
      }

      if (value !== null && value !== undefined) {
        el.textContent = String(value);
      }
    } catch (err) {
      console.warn(`[COSYdata] Failed to hydrate element for ref '${ref}': ${err.message}`);
    }
  }
}
