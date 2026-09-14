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
 *   const entry = await resolveVocab('en:animals:cat');
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
    // localStorage might be blocked or restricted
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
      // Ignore quota exceeded or storage write error
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
 * @param {string} ref - "language:theme:word-slug" (e.g. "en:animals:cat") OR "language:word-slug" (e.g. "en:cat")
 * @param {Object} [options]
 * @param {string} [options.baseUrl] - Base URL for COSYdata repo (default: https://cosylanguages.github.io/COSYdata/)
 * @param {number} [options.ttlMs] - Cache TTL in milliseconds (default: 24h)
 * @returns {Promise<Object|null>} Vocabulary entry object or null if not found
 */
export async function resolveVocab(ref, options = {}) {
  if (!ref || typeof ref !== 'string') {
    console.warn(`[COSYdata] Invalid ref passed to resolveVocab: ${ref}`);
    return null;
  }

  const parts = ref.split(':');
  if (parts.length < 2) {
    console.warn(`[COSYdata] Malformed ref '${ref}'. Expected 'lang:word' or 'lang:theme:word'.`);
    return null;
  }

  const baseUrl = (options.baseUrl || DEFAULT_BASE_URL).replace(/\/?$/, '/');
  const ttlMs = typeof options.ttlMs === 'number' ? options.ttlMs : DEFAULT_TTL_MS;

  let lang, theme, wordSlug;

  if (parts.length >= 3) {
    lang = parts[0];
    theme = parts[1];
    wordSlug = parts.slice(2).join(':');
  } else {
    lang = parts[0];
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

    // Match wordSlug in index map:
    // Mappings in index.json can be "en:cat:noun": "animals.json" or "cat": "animals.json"
    let targetFile = null;
    for (const [idKey, filename] of Object.entries(indexData)) {
      const keyParts = idKey.split(':');
      const slugInKey = keyParts.length >= 2 ? keyParts[1] : idKey;
      if (idKey === wordSlug || slugInKey === wordSlug || idKey.startsWith(`${lang}:${wordSlug}:`)) {
        targetFile = filename;
        break;
      }
    }

    if (!targetFile) {
      console.warn(`[COSYdata] Word slug '${wordSlug}' not found in index for language '${lang}'.`);
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

    if (entry.id === wordSlug || entry.word === wordSlug || slugInId === wordSlug || entry.id.startsWith(`${lang}:${wordSlug}:`)) {
      return entry;
    }
  }

  console.warn(`[COSYdata] Word '${wordSlug}' not found in theme '${theme}' for language '${lang}'.`);
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
