/**
 * @fileoverview Client-side Daily Picker Engine for the COSY Learning Ecosystem.
 *
 * Provides utilities to fetch and select daily elements (Word of the Day,
 * Phrasal Verb of the Day, Collocation of the Day, Idiom of the Day) with:
 *  - Deterministic local midnight timezone synchronization.
 *  - Hot-refresh countdown to the next local midnight.
 *  - CEFR band resolution (A0-A1, A2, B1-B2, C1-C2).
 *  - Creative prompt helpers and synonym matching challenges.
 *  - Automatic fallback and memory caching.
 *
 * Designed for use in COSYlanguages, COSYpractice, COSYtools, and COSYdata.
 */

const DEFAULT_BASE_URL = 'https://cosylanguages.github.io/COSYdata/';

/** In-memory cache for month calendar JSON files keyed by `${baseUrl}:${lang}:${slot}:${month}` */
const monthCache = new Map();

/**
 * Returns the user's current local date formatted as YYYY-MM-DD.
 * Automatically aligns with local midnight in whatever time zone the client is in.
 *
 * @param {Date} [now=new Date()]
 * @returns {string} e.g. "2026-11-11"
 */
export function getLocalMidnightDateKey(now = new Date()) {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calculates milliseconds remaining until the upcoming local midnight (00:00:00 tomorrow).
 * Useful for scheduling setTimeout() to hot-refresh the daily cards without reloading.
 *
 * @param {Date} [now=new Date()]
 * @returns {number} Milliseconds until next local midnight
 */
export function getMsUntilLocalMidnight(now = new Date()) {
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 1);
  return Math.max(1000, tomorrow.getTime() - now.getTime());
}

/**
 * Fetches the monthly calendar JSON file for a slot, language, and date.
 *
 * @param {string} slot - 'word' | 'phrasal_verb' | 'collocation' | 'idiom'
 * @param {string} [lang='en']
 * @param {string} [dateStr] - YYYY-MM-DD format (defaults to local date)
 * @param {string} [baseUrl=DEFAULT_BASE_URL]
 * @returns {Promise<object|null>} The parsed month payload or null on error
 */
export async function fetchDailyMonth(slot, lang = 'en', dateStr = null, baseUrl = DEFAULT_BASE_URL) {
  const targetDate = dateStr || getLocalMidnightDateKey();
  const month = targetDate.slice(0, 7);
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
  const url = `${normalizedBase}daily/${encodeURIComponent(lang)}/calendar/${encodeURIComponent(slot)}/${month}.json`;
  const cacheKey = `${normalizedBase}:${lang}:${slot}:${month}`;

  if (monthCache.has(cacheKey)) {
    return monthCache.get(cacheKey);
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`[COSY daily-picker] Failed to fetch daily calendar: HTTP ${res.status} at ${url}`);
      return null;
    }
    const data = await res.json();
    monthCache.set(cacheKey, data);
    return data;
  } catch (err) {
    console.error(`[COSY daily-picker] Network error fetching ${url}:`, err);
    return null;
  }
}

/**
 * Retrieves the daily learning card for a specific slot, CEFR level/band, and date.
 *
 * @param {string} slot - 'word' | 'phrasal_verb' | 'collocation' | 'idiom'
 * @param {string} [cefr='B1-B2'] - 'A0-A1' | 'A2' | 'B1-B2' | 'C1-C2' (or 'B1', 'B2', etc.)
 * @param {string} [lang='en']
 * @param {string} [dateStr] - YYYY-MM-DD (defaults to local date)
 * @param {string} [baseUrl=DEFAULT_BASE_URL]
 * @returns {Promise<object|null>} The daily card payload
 */
export async function getDailyCard(slot, cefr = 'B1-B2', lang = 'en', dateStr = null, baseUrl = DEFAULT_BASE_URL) {
  const targetDate = dateStr || getLocalMidnightDateKey();
  const monthData = await fetchDailyMonth(slot, lang, targetDate, baseUrl);
  if (!monthData || !monthData.days || !monthData.days[targetDate]) {
    return null;
  }

  const dayCards = monthData.days[targetDate];

  // Direct match
  if (dayCards[cefr]) return dayCards[cefr];

  // Normalized matching for idiom levels vs bands
  const bandAliases = {
    'A0-A1': ['A1', 'A0', 'A2'],
    'A2': ['A2', 'A0-A1', 'B1'],
    'B1-B2': ['B1', 'B2', 'B1-B2'],
    'C1-C2': ['C1', 'C2', 'C1-C2'],
    'B1': ['B1-B2', 'B1', 'B2'],
    'B2': ['B1-B2', 'B2', 'B1'],
    'C1': ['C1-C2', 'C1', 'C2'],
    'C2': ['C1-C2', 'C2', 'C1']
  };

  const fallbacks = bandAliases[cefr] || [];
  for (const f of fallbacks) {
    if (dayCards[f]) return dayCards[f];
  }

  // Return any available level if requested band isn't present
  const availableLevels = Object.keys(dayCards);
  return availableLevels.length > 0 ? dayCards[availableLevels[0]] : null;
}

/**
 * Checks a user-submitted synonym against the card's synonyms list.
 *
 * @param {string} input - Learner's guessed synonym
 * @param {object} card - The daily card containing synonyms
 * @returns {boolean} True if input is a valid synonym
 */
export function verifySynonym(input, card) {
  if (!card || !Array.isArray(card.synonyms) || !input) return false;
  const cleanInput = input.trim().toLowerCase();
  return card.synonyms.some((s) => s.toLowerCase() === cleanInput);
}

/**
 * Subscribes to local midnight date changes and invokes a callback with the new date.
 *
 * @param {function(string): void} callback - Invoked with new YYYY-MM-DD on rollover
 * @returns {function(): void} Cleanup unsubscribe function
 */
export function onLocalMidnight(callback) {
  let timerId = null;

  function schedule() {
    const ms = getMsUntilLocalMidnight();
    timerId = setTimeout(() => {
      const newDate = getLocalMidnightDateKey();
      try {
        callback(newDate);
      } catch (err) {
        console.error('[COSY daily-picker] Error in onLocalMidnight callback:', err);
      }
      schedule();
    }, ms);
  }

  schedule();
  return () => {
    if (timerId) clearTimeout(timerId);
  };
}
