/**
 * COSYdata Dictionary UI Engine
 *
 * Framework-free, reusable ES module for rendering an Oxford/Cambridge-style
 * dictionary browsing experience for any language dataset in COSYdata.
 *
 * Search-first architecture:
 * - On initial load, loads ONLY vocabulary/<lang>/search-index.json (lightweight metadata).
 * - No "browse all" view exists — entry points are strictly search, letter, category, level, domain, favorites, and recent.
 * - Full word entries (definitions, examples, audio, synonyms, etc.) are fetched on demand via resolveVocab().
 */

import { resolveVocab, hydrateVocabElements } from './vocab-resolver.js';

const DEFAULT_BASE_URL = 'https://cosylanguages.github.io/COSYdata/';
const ALL_CEFR_LEVELS = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const KNOWN_DOMAINS = [
  'general',
  'travelling',
  'relocation',
  'spoken',
  'exam_preparation',
  'professional'
];
const PAGE_SIZE = 60;

const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'French' },
  { code: 'it', name: 'Italian' },
  { code: 'de', name: 'German' },
  { code: 'ru', name: 'Russian' },
  { code: 'el', name: 'Greek' },
  { code: 'es', name: 'Spanish' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'br', name: 'Breton' },
  { code: 'cv', name: 'Chuvash' },
  { code: 'hy', name: 'Armenian' },
  { code: 'ka', name: 'Georgian' },
  { code: 'ba', name: 'Bashkir' },
  { code: 'tt', name: 'Tatar' }
];

const ECOSYSTEM_REPOS = [
  { name: 'COSYlanguages', desc: 'Learning Platform', pagesUrl: 'https://cosylanguages.github.io/COSYlanguages/' },
  { name: 'COSYmanuals', desc: 'Grammar Manuals', pagesUrl: 'https://cosylanguages.github.io/COSYmanuals/' },
  { name: 'COSYgames', desc: 'Language Games', pagesUrl: 'https://cosylanguages.github.io/COSYgames/' },
  { name: 'COSYtools', desc: 'Language Tools', pagesUrl: 'https://cosylanguages.github.io/COSYtools/' }
];

// Helper: Favorites in localStorage
function getFavorites(lang) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = window.localStorage.getItem(`cosydata:favorites:${lang}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return new Set(parsed);
      }
    }
  } catch (err) {
    // Ignore storage error
  }
  return new Set();
}

function saveFavorites(lang, favoritesSet) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(`cosydata:favorites:${lang}`, JSON.stringify(Array.from(favoritesSet)));
    }
  } catch (err) {
    // Ignore storage error
  }
}

// Helper: Recently Viewed in localStorage
function getRecentlyViewed(lang) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = window.localStorage.getItem(`cosydata:recently-viewed:${lang}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    }
  } catch (err) {
    // Ignore storage error
  }
  return [];
}

function addRecentlyViewed(lang, entryId) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      let list = getRecentlyViewed(lang).filter((id) => id !== entryId);
      list.unshift(entryId);
      if (list.length > 30) list = list.slice(0, 30);
      window.localStorage.setItem(`cosydata:recently-viewed:${lang}`, JSON.stringify(list));
    }
  } catch (err) {
    // Ignore storage error
  }
}

// Helper: Deterministic Word of the Day
function getWordOfTheDay(entries) {
  if (!entries || entries.length === 0) return null;
  const today = new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = (hash << 5) - hash + today.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % entries.length;
  return entries[index];
}

// Helper: Text normalization for search matching
function normalizeText(text) {
  if (!text) return '';
  return String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

// Helper: Format category / domain slug
function formatSlugLabel(str) {
  if (!str) return '';
  return str
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Helper: Escape HTML
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Loads vocabulary search index for a given language.
 */
async function loadSearchIndex(lang, baseUrl) {
  const normalizedBaseUrl = (baseUrl || DEFAULT_BASE_URL).replace(/\/?$/, '/');
  const searchIndexUrl = `${normalizedBaseUrl}vocabulary/${lang}/search-index.json`;

  try {
    const res = await fetch(searchIndexUrl);
    if (!res.ok) {
      console.warn(`[COSYdata UI] Failed to load search-index.json for '${lang}' (${res.status})`);
      return { entries: [], entryMap: new Map(), letters: [], categories: [], levels: [], domains: [] };
    }

    const data = await res.json();
    const entries = Array.isArray(data) ? data : [];
    const entryMap = new Map();
    const letterSet = new Set();
    const categorySet = new Set();
    const levelSet = new Set();
    const domainSet = new Set();

    for (const entry of entries) {
      if (!entry || !entry.id) continue;
      entryMap.set(entry.id, entry);

      // Letter
      if (entry.word) {
        const normWord = normalizeText(entry.word);
        const firstChar = normWord.charAt(0).toUpperCase();
        if (/[A-Z]/.test(firstChar)) {
          letterSet.add(firstChar);
        } else if (firstChar) {
          letterSet.add('#');
        }
      }

      // Theme / Category
      if (entry.theme) {
        categorySet.add(entry.theme);
      }

      // CEFR Level
      if (entry.level) {
        levelSet.add(entry.level);
      }

      // Domain
      if (entry.domain && typeof entry.domain === 'string') {
        const doms = entry.domain.split(',').map((d) => d.trim());
        for (const d of doms) {
          if (d) domainSet.add(d);
        }
      }
    }

    const letters = Array.from(letterSet).sort();
    const categories = Array.from(categorySet).sort();
    const levels = ALL_CEFR_LEVELS.filter((l) => levelSet.has(l));
    const domains = KNOWN_DOMAINS.filter((d) => domainSet.has(d));
    for (const d of domainSet) {
      if (!domains.includes(d)) domains.push(d);
    }

    return { entries, entryMap, letters, categories, levels, domains };
  } catch (err) {
    console.warn(`[COSYdata UI] Error loading search index for '${lang}':`, err);
    return { entries: [], entryMap: new Map(), letters: [], categories: [], levels: [], domains: [] };
  }
}

/**
 * Initializes the Dictionary UI Engine on a target container.
 */
export async function initDictionaryUI(container, options = {}) {
  const targetEl = typeof container === 'string' ? document.querySelector(container) : container;
  if (!targetEl) {
    console.error('[COSYdata UI] Target container not found.');
    return;
  }

  const lang = options.lang || targetEl.getAttribute('data-dictionary-lang') || targetEl.getAttribute('data-lang') || 'en';

  let defaultRelativeBase = './';
  if (typeof window !== 'undefined' && window.location && window.location.pathname) {
    if (window.location.pathname.includes('/vocabulary/')) {
      defaultRelativeBase = '../../';
    }
  }

  const baseUrl = options.baseUrl || targetEl.getAttribute('data-base-url') || defaultRelativeBase;

  // Render initial loading state
  targetEl.classList.add('cosy-dict-container');
  targetEl.innerHTML = `
    <div class="cosy-dict-loading" role="status" aria-live="polite">
      <div class="cosy-dict-spinner" aria-hidden="true"></div>
      <p>Loading ${lang.toUpperCase()} dictionary index...</p>
    </div>
  `;

  // Fetch lightweight search index only
  const { entries, entryMap, letters, categories, levels, domains } = await loadSearchIndex(lang, baseUrl);
  const favorites = getFavorites(lang);
  const wotdLightweight = getWordOfTheDay(entries);

  // Ecosystem Strip Header Landmark
  const stripEl = document.createElement('div');
  stripEl.className = 'cosy-ecosystem-strip';
  stripEl.setAttribute('role', 'navigation');
  stripEl.setAttribute('aria-label', 'COSY Ecosystem Products');
  stripEl.innerHTML = `
    <div class="cosy-strip-inner">
      <span class="cosy-strip-brand">🌐 COSY Ecosystem:</span>
      <ul class="cosy-strip-links">
        <li><a href="https://cosylanguages.github.io/COSYlanguages/" class="cosy-strip-link">COSYlanguages</a></li>
        <li><a href="${baseUrl}index.html" class="cosy-strip-link active">COSYdata 📚</a></li>
        <li><a href="https://cosylanguages.github.io/COSYtools/" target="_blank" rel="noopener" class="cosy-strip-link">COSYtools 🔎</a></li>
        <li><a href="https://cosylanguages.github.io/COSYgames/" target="_blank" rel="noopener" class="cosy-strip-link">COSYgames 🎮</a></li>
        <li><a href="https://cosylanguages.github.io/COSYevents/" target="_blank" rel="noopener" class="cosy-strip-link">COSYevents 🎉</a></li>
      </ul>
    </div>
  `;
  targetEl.appendChild(stripEl);

  // Active UI Navigation State
  // mode: 'home' | 'letter' | 'category' | 'level' | 'domain' | 'favorites' | 'recent' | 'search'
  let activeState = {
    mode: 'home',
    value: null,
    searchQuery: '',
    visibleCount: PAGE_SIZE,
    expandedEntryId: null
  };

  // Cache resolved full entries so we don't refetch
  const resolvedFullEntries = new Map();

  // Render Main Shell
  targetEl.innerHTML = '';

  // Header Landmark
  const headerEl = document.createElement('header');
  headerEl.className = 'cosy-dict-header';

  const titleRow = document.createElement('div');
  titleRow.className = 'cosy-dict-title-row';

  const titleEl = document.createElement('h1');
  titleEl.className = 'cosy-dict-title';
  const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === lang) || { name: lang.toUpperCase() };
  titleEl.textContent = `${langObj.name} Dictionary`;

  const wordCountBadge = document.createElement('span');
  wordCountBadge.className = 'cosy-dict-word-count';
  wordCountBadge.textContent = `${entries.length.toLocaleString()} words`;
  titleEl.appendChild(wordCountBadge);

  titleRow.appendChild(titleEl);

  // Language Switcher
  const langSelectWrapper = document.createElement('div');
  langSelectWrapper.className = 'cosy-dict-lang-switcher';
  langSelectWrapper.innerHTML = `
    <label for="cosy-lang-select" class="cosy-dict-lang-label">Language:</label>
    <select id="cosy-lang-select" class="cosy-dict-lang-select" aria-label="Switch dictionary language">
      ${SUPPORTED_LANGUAGES.map(
        (l) => `<option value="${l.code}" ${l.code === lang ? 'selected' : ''}>${l.name} (${l.code.toUpperCase()})</option>`
      ).join('')}
    </select>
  `;

  const langSelect = langSelectWrapper.querySelector('#cosy-lang-select');
  langSelect.addEventListener('change', (e) => {
    const newLang = e.target.value;
    if (newLang !== lang) {
      window.location.href = `../../vocabulary/${newLang}/index.html`;
    }
  });

  titleRow.appendChild(langSelectWrapper);
  headerEl.appendChild(titleRow);

  // Hero Search Section
  const searchHeroSection = document.createElement('section');
  searchHeroSection.className = 'cosy-dict-search-hero';
  searchHeroSection.setAttribute('role', 'search');

  searchHeroSection.innerHTML = `
    <div class="cosy-dict-search-box">
      <span class="cosy-dict-search-icon" aria-hidden="true">🔍</span>
      <input type="text" class="cosy-dict-search-input" id="cosy-hero-search-input" placeholder="Search ${entries.length.toLocaleString()} ${langObj.name} words..." aria-label="Search words" autofocus />
      <button type="button" class="cosy-dict-search-clear-btn" aria-label="Clear search" style="display: none;">×</button>
    </div>
  `;

  const searchInput = searchHeroSection.querySelector('#cosy-hero-search-input');
  const clearSearchBtn = searchHeroSection.querySelector('.cosy-dict-search-clear-btn');

  // Debounce search input
  let searchDebounceTimer = null;
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    clearSearchBtn.style.display = query ? 'block' : 'none';

    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      if (query.length >= 2) {
        activeState.mode = 'search';
        activeState.searchQuery = query;
        activeState.visibleCount = PAGE_SIZE;
        activeState.expandedEntryId = null;
        renderApp();
      } else if (query.length < 2 && activeState.mode === 'search') {
        activeState.mode = 'home';
        activeState.searchQuery = '';
        activeState.visibleCount = PAGE_SIZE;
        activeState.expandedEntryId = null;
        renderApp();
      }
    }, 250);
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    if (activeState.mode === 'search') {
      activeState.mode = 'home';
      activeState.searchQuery = '';
      activeState.visibleCount = PAGE_SIZE;
      activeState.expandedEntryId = null;
      renderApp();
    }
    searchInput.focus();
  });

  headerEl.appendChild(searchHeroSection);
  targetEl.appendChild(headerEl);

  // Main Content Landmark
  const mainEl = document.createElement('main');
  mainEl.className = 'cosy-dict-main';
  targetEl.appendChild(mainEl);

  // Ecosystem Footer Landmark
  const footerEl = document.createElement('footer');
  footerEl.className = 'cosy-dict-footer';
  footerEl.setAttribute('role', 'contentinfo');
  footerEl.innerHTML = `
    <div class="cosy-dict-footer-content">
      <h3 class="cosy-dict-footer-title">COSYlanguages Ecosystem</h3>
      <p class="cosy-dict-footer-desc">Explore connected tools, learning modules, and manuals in the COSY ecosystem:</p>
      <div class="cosy-dict-ecosystem-links">
        ${ECOSYSTEM_REPOS.map(
          (repo) => `
          <a href="${repo.pagesUrl}" class="cosy-dict-eco-link" target="_blank" rel="noopener noreferrer">
            <strong>${repo.name}</strong>
            <span>${repo.desc}</span>
          </a>
        `
        ).join('')}
      </div>
    </div>
  `;
  targetEl.appendChild(footerEl);

  // Render App State
  function renderApp() {
    mainEl.innerHTML = '';

    if (activeState.mode === 'home') {
      renderHomeView();
    } else {
      renderResultsView();
    }
  }

  /**
   * Home View: Entry points ONLY (Letter, Category, Level, Domain, Favorites, Recent, WOTD)
   */
  function renderHomeView() {
    // 1. Word of the Day Banner
    if (wotdLightweight) {
      const wotdSection = document.createElement('section');
      wotdSection.className = 'cosy-dict-wotd';
      wotdSection.setAttribute('aria-label', 'Word of the Day');

      wotdSection.innerHTML = `
        <div class="cosy-dict-wotd-badge">Word of the Day</div>
        <div class="cosy-dict-wotd-card" id="cosy-wotd-card-body">
          <div class="cosy-dict-wotd-header">
            ${wotdLightweight.emoji ? `<span class="cosy-dict-wotd-emoji">${wotdLightweight.emoji}</span>` : ''}
            <strong class="cosy-dict-wotd-word">${escapeHtml(wotdLightweight.word)}</strong>
            <span class="cosy-dict-badge cosy-dict-badge-form">${wotdLightweight.form || ''}</span>
            <span class="cosy-dict-badge cosy-dict-badge-level cosy-dict-level-${(wotdLightweight.level || 'a1').toLowerCase()}">${wotdLightweight.level || ''}</span>
          </div>
          <p class="cosy-dict-wotd-loading">Fetching definition...</p>
        </div>
      `;

      mainEl.appendChild(wotdSection);

      // Asynchronously resolve full WOTD entry
      resolveVocab(wotdLightweight.id, { baseUrl }).then((fullWotd) => {
        const wotdCardBody = wotdSection.querySelector('#cosy-wotd-card-body');
        if (wotdCardBody && fullWotd) {
          resolvedFullEntries.set(fullWotd.id, fullWotd);
          const def = (fullWotd.definitions && fullWotd.definitions[0]) || '';
          const ex = (fullWotd.examples && fullWotd.examples[0]) || '';
          wotdCardBody.innerHTML = `
            <div class="cosy-dict-wotd-header">
              ${fullWotd.emoji ? `<span class="cosy-dict-wotd-emoji">${fullWotd.emoji}</span>` : ''}
              <strong class="cosy-dict-wotd-word">${escapeHtml(fullWotd.word)}</strong>
              ${fullWotd.transcription ? `<span class="cosy-dict-ipa">${escapeHtml(fullWotd.transcription)}</span>` : ''}
              <span class="cosy-dict-badge cosy-dict-badge-form">${fullWotd.form || ''}</span>
              <span class="cosy-dict-badge cosy-dict-badge-level cosy-dict-level-${(fullWotd.level || 'a1').toLowerCase()}">${fullWotd.level || ''}</span>
            </div>
            ${def ? `<p class="cosy-dict-wotd-def">${escapeHtml(def)}</p>` : ''}
            ${ex ? `<blockquote class="cosy-dict-wotd-ex">"${escapeHtml(ex)}"</blockquote>` : ''}
          `;
        }
      });
    }

    // 2. Browse-by-Letter Row (A–Z)
    if (letters.length > 0) {
      const letterSection = document.createElement('section');
      letterSection.className = 'cosy-dict-browse-section';
      letterSection.innerHTML = `
        <h2 class="cosy-dict-section-title">Browse by Alphabet</h2>
        <div class="cosy-dict-letter-row">
          ${letters
            .map((ltr) => `<button type="button" class="cosy-dict-letter-btn" data-letter="${ltr}">${ltr}</button>`)
            .join('')}
        </div>
      `;

      letterSection.querySelectorAll('.cosy-dict-letter-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          activeState.mode = 'letter';
          activeState.value = btn.getAttribute('data-letter');
          activeState.visibleCount = PAGE_SIZE;
          activeState.expandedEntryId = null;
          renderApp();
        });
      });

      mainEl.appendChild(letterSection);
    }

    // 3. User Saved & Recent Quick Entry Points
    const recents = getRecentlyViewed(lang);
    if (favorites.size > 0 || recents.length > 0) {
      const userSection = document.createElement('section');
      userSection.className = 'cosy-dict-user-section';
      userSection.innerHTML = `
        <div class="cosy-dict-user-cards">
          <button type="button" class="cosy-dict-user-card" id="cosy-favorites-btn">
            <span class="cosy-dict-user-icon">★</span>
            <div class="cosy-dict-user-info">
              <strong>My List</strong>
              <span>${favorites.size} saved word(s)</span>
            </div>
          </button>
          <button type="button" class="cosy-dict-user-card" id="cosy-recents-btn">
            <span class="cosy-dict-user-icon">🕒</span>
            <div class="cosy-dict-user-info">
              <strong>Recently Viewed</strong>
              <span>${recents.length} word(s)</span>
            </div>
          </button>
        </div>
      `;

      userSection.querySelector('#cosy-favorites-btn').addEventListener('click', () => {
        activeState.mode = 'favorites';
        activeState.value = null;
        activeState.visibleCount = PAGE_SIZE;
        activeState.expandedEntryId = null;
        renderApp();
      });

      userSection.querySelector('#cosy-recents-btn').addEventListener('click', () => {
        activeState.mode = 'recent';
        activeState.value = null;
        activeState.visibleCount = PAGE_SIZE;
        activeState.expandedEntryId = null;
        renderApp();
      });

      mainEl.appendChild(userSection);
    }

    // 4. Browse-by-Category Tiles
    if (categories.length > 0) {
      const catSection = document.createElement('section');
      catSection.className = 'cosy-dict-browse-section';
      catSection.innerHTML = `
        <h2 class="cosy-dict-section-title">Browse by Category</h2>
        <div class="cosy-dict-tile-grid">
          ${categories
            .map((cat) => {
              const count = entries.filter((e) => e.theme === cat).length;
              return `
                <button type="button" class="cosy-dict-tile-card" data-category="${cat}">
                  <span class="cosy-dict-tile-name">${escapeHtml(formatSlugLabel(cat))}</span>
                  <span class="cosy-dict-tile-count">${count.toLocaleString()} words</span>
                </button>
              `;
            })
            .join('')}
        </div>
      `;

      catSection.querySelectorAll('.cosy-dict-tile-card').forEach((cardBtn) => {
        cardBtn.addEventListener('click', () => {
          activeState.mode = 'category';
          activeState.value = cardBtn.getAttribute('data-category');
          activeState.visibleCount = PAGE_SIZE;
          activeState.expandedEntryId = null;
          renderApp();
        });
      });

      mainEl.appendChild(catSection);
    }

    // 5. Browse-by-Level Chips
    if (levels.length > 0) {
      const levelSection = document.createElement('section');
      levelSection.className = 'cosy-dict-browse-section';
      levelSection.innerHTML = `
        <h2 class="cosy-dict-section-title">Browse by CEFR Level</h2>
        <div class="cosy-dict-level-grid">
          ${levels
            .map((lvl) => {
              const count = entries.filter((e) => e.level === lvl).length;
              return `
                <button type="button" class="cosy-dict-level-card cosy-dict-level-${lvl.toLowerCase()}" data-level="${lvl}">
                  <strong>${lvl}</strong>
                  <span>${count.toLocaleString()} words</span>
                </button>
              `;
            })
            .join('')}
        </div>
      `;

      levelSection.querySelectorAll('.cosy-dict-level-card').forEach((cardBtn) => {
        cardBtn.addEventListener('click', () => {
          activeState.mode = 'level';
          activeState.value = cardBtn.getAttribute('data-level');
          activeState.visibleCount = PAGE_SIZE;
          activeState.expandedEntryId = null;
          renderApp();
        });
      });

      mainEl.appendChild(levelSection);
    }

    // 6. Browse-by-Domain Tiles
    if (domains.length > 0) {
      const domSection = document.createElement('section');
      domSection.className = 'cosy-dict-browse-section';
      domSection.innerHTML = `
        <h2 class="cosy-dict-section-title">Browse by Course Track</h2>
        <div class="cosy-dict-domain-grid">
          ${domains
            .map((dom) => {
              const count = entries.filter((e) => (e.domain || '').includes(dom)).length;
              return `
                <button type="button" class="cosy-dict-domain-card" data-domain="${dom}">
                  <strong>${escapeHtml(formatSlugLabel(dom))}</strong>
                  <span>${count.toLocaleString()} words</span>
                </button>
              `;
            })
            .join('')}
        </div>
      `;

      domSection.querySelectorAll('.cosy-dict-domain-card').forEach((cardBtn) => {
        cardBtn.addEventListener('click', () => {
          activeState.mode = 'domain';
          activeState.value = cardBtn.getAttribute('data-domain');
          activeState.visibleCount = PAGE_SIZE;
          activeState.expandedEntryId = null;
          renderApp();
        });
      });

      mainEl.appendChild(domSection);
    }
  }

  /**
   * Scoped Results View: Filtered from search-index.json, bounded to 60 per page
   */
  function renderResultsView() {
    // Determine filtered lightweight entries
    let filtered = [];
    let titleText = '';

    if (activeState.mode === 'search') {
      const normQuery = normalizeText(activeState.searchQuery);
      titleText = `Search Results for "${escapeHtml(activeState.searchQuery)}"`;
      filtered = entries.filter((e) => {
        if (!normQuery) return false;
        if (normalizeText(e.word).includes(normQuery)) return true;
        if (e.tags && Array.isArray(e.tags)) {
          if (e.tags.some((t) => normalizeText(t).includes(normQuery))) return true;
        }
        if (e.theme && normalizeText(e.theme).includes(normQuery)) return true;
        return false;
      });
    } else if (activeState.mode === 'letter') {
      const targetLtr = activeState.value;
      titleText = `Words starting with "${targetLtr}"`;
      filtered = entries.filter((e) => {
        if (!e.word) return false;
        const norm = normalizeText(e.word);
        const first = norm.charAt(0).toUpperCase();
        if (targetLtr === '#') {
          return !/[A-Z]/.test(first);
        }
        return first === targetLtr;
      });
    } else if (activeState.mode === 'category') {
      titleText = `Category: ${formatSlugLabel(activeState.value)}`;
      filtered = entries.filter((e) => e.theme === activeState.value);
    } else if (activeState.mode === 'level') {
      titleText = `CEFR Level: ${activeState.value}`;
      filtered = entries.filter((e) => e.level === activeState.value);
    } else if (activeState.mode === 'domain') {
      titleText = `Course Track: ${formatSlugLabel(activeState.value)}`;
      filtered = entries.filter((e) => (e.domain || '').includes(activeState.value));
    } else if (activeState.mode === 'favorites') {
      titleText = `My Saved Favorites (${favorites.size})`;
      filtered = entries.filter((e) => favorites.has(e.id));
    } else if (activeState.mode === 'recent') {
      const recents = getRecentlyViewed(lang);
      titleText = `Recently Viewed Words (${recents.length})`;
      filtered = recents.map((id) => entryMap.get(id)).filter(Boolean);
    }

    // Results Header Bar with Back Button
    const headerBar = document.createElement('div');
    headerBar.className = 'cosy-dict-results-header';
    headerBar.innerHTML = `
      <button type="button" class="cosy-dict-back-btn" id="cosy-back-to-home">← Back to Dictionary Home</button>
      <h2 class="cosy-dict-results-title">${titleText}</h2>
      <div class="cosy-dict-results-status">Showing ${Math.min(activeState.visibleCount, filtered.length).toLocaleString()} of ${filtered.length.toLocaleString()} words</div>
    `;

    headerBar.querySelector('#cosy-back-to-home').addEventListener('click', () => {
      activeState.mode = 'home';
      activeState.value = null;
      activeState.searchQuery = '';
      activeState.visibleCount = PAGE_SIZE;
      activeState.expandedEntryId = null;
      searchInput.value = '';
      clearSearchBtn.style.display = 'none';
      renderApp();
    });

    mainEl.appendChild(headerBar);

    if (filtered.length === 0) {
      const emptyEl = document.createElement('div');
      emptyEl.className = 'cosy-dict-empty';
      emptyEl.textContent = 'No matching words found for this selection.';
      mainEl.appendChild(emptyEl);
      return;
    }

    // Slice to bounded page limit (~60 entries max per view)
    const visibleEntries = filtered.slice(0, activeState.visibleCount);

    const listContainer = document.createElement('div');
    listContainer.className = 'cosy-dict-results-list';

    for (const entry of visibleEntries) {
      const isExpanded = activeState.expandedEntryId === entry.id;
      const card = createLightweightCard(entry, {
        isExpanded,
        favorites,
        onToggleFavorite: (id, isFav) => {
          if (isFav) favorites.add(id);
          else favorites.delete(id);
          saveFavorites(lang, favorites);
          renderApp();
        },
        onExpand: async (id) => {
          if (activeState.expandedEntryId === id) {
            activeState.expandedEntryId = null;
            renderApp();
            return;
          }

          activeState.expandedEntryId = id;
          addRecentlyViewed(lang, id);
          renderApp();

          // On-demand resolution of full entry
          if (!resolvedFullEntries.has(id)) {
            const full = await resolveVocab(id, { baseUrl });
            if (full) {
              resolvedFullEntries.set(id, full);
              if (activeState.expandedEntryId === id) {
                renderApp();
              }
            }
          }
        }
      });

      listContainer.appendChild(card);
    }

    mainEl.appendChild(listContainer);

    // "Show More" Capped Pagination Button if results > visibleCount
    if (filtered.length > activeState.visibleCount) {
      const loadMoreContainer = document.createElement('div');
      loadMoreContainer.className = 'cosy-dict-load-more-container';

      const loadMoreBtn = document.createElement('button');
      loadMoreBtn.type = 'button';
      loadMoreBtn.className = 'cosy-dict-load-more-btn';
      loadMoreBtn.textContent = `Show More (${filtered.length - activeState.visibleCount} remaining)`;

      loadMoreBtn.addEventListener('click', () => {
        activeState.visibleCount += PAGE_SIZE;
        renderApp();
      });

      loadMoreContainer.appendChild(loadMoreBtn);
      mainEl.appendChild(loadMoreContainer);
    }

    // Hydrate DOM elements if needed
    hydrateVocabElements(mainEl, { baseUrl });
  }

  /**
   * Creates a Lightweight Card Element with On-Demand Expanded Details.
   */
  function createLightweightCard(lightweightEntry, context) {
    const { isExpanded, favorites, onToggleFavorite, onExpand } = context;
    const isFav = favorites.has(lightweightEntry.id);
    const fullEntry = resolvedFullEntries.get(lightweightEntry.id);

    const card = document.createElement('article');
    card.className = `cosy-dict-card ${isExpanded ? 'is-expanded' : ''}`;
    card.setAttribute('data-entry-id', lightweightEntry.id);

    // Card Header Row
    const header = document.createElement('div');
    header.className = 'cosy-dict-card-header';

    const titleGroup = document.createElement('div');
    titleGroup.className = 'cosy-dict-title-group';

    if (lightweightEntry.emoji) {
      const emojiSpan = document.createElement('span');
      emojiSpan.className = 'cosy-dict-emoji';
      emojiSpan.textContent = lightweightEntry.emoji;
      titleGroup.appendChild(emojiSpan);
    }

    const wordSpan = document.createElement('h3');
    wordSpan.className = 'cosy-dict-headword';
    wordSpan.textContent = lightweightEntry.word || lightweightEntry.id;
    titleGroup.appendChild(wordSpan);

    if (lightweightEntry.form) {
      const formBadge = document.createElement('span');
      formBadge.className = 'cosy-dict-badge cosy-dict-badge-form';
      formBadge.textContent = lightweightEntry.form;
      titleGroup.appendChild(formBadge);
    }

    if (lightweightEntry.level) {
      const lvlBadge = document.createElement('span');
      lvlBadge.className = `cosy-dict-badge cosy-dict-badge-level cosy-dict-level-${lightweightEntry.level.toLowerCase()}`;
      lvlBadge.textContent = lightweightEntry.level;
      titleGroup.appendChild(lvlBadge);
    }

    header.appendChild(titleGroup);

    // Actions Group: Star Favorite + Expand Details Button
    const actionsGroup = document.createElement('div');
    actionsGroup.className = 'cosy-dict-card-actions';

    const favBtn = document.createElement('button');
    favBtn.type = 'button';
    favBtn.className = `cosy-dict-star-btn ${isFav ? 'is-favorite' : ''}`;
    favBtn.setAttribute('aria-label', isFav ? 'Remove from favorites' : 'Add to favorites');
    favBtn.textContent = isFav ? '★' : '☆';
    favBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      onToggleFavorite(lightweightEntry.id, !isFav);
    });

    const expandBtn = document.createElement('button');
    expandBtn.type = 'button';
    expandBtn.className = 'cosy-dict-expand-btn';
    expandBtn.textContent = isExpanded ? 'Hide Details ▲' : 'View Details ▼';
    expandBtn.addEventListener('click', () => {
      onExpand(lightweightEntry.id);
    });

    actionsGroup.appendChild(favBtn);
    actionsGroup.appendChild(expandBtn);
    header.appendChild(actionsGroup);

    card.appendChild(header);

    // Domain Tags Row
    if (lightweightEntry.domain || lightweightEntry.theme) {
      const tagsRow = document.createElement('div');
      tagsRow.className = 'cosy-dict-tags-row';
      if (lightweightEntry.theme) {
        tagsRow.innerHTML += `<span class="cosy-dict-tag-chip">Category: ${escapeHtml(formatSlugLabel(lightweightEntry.theme))}</span>`;
      }
      if (lightweightEntry.domain) {
        const doms = lightweightEntry.domain.split(',').map((d) => d.trim());
        for (const d of doms) {
          if (d) {
            tagsRow.innerHTML += `<span class="cosy-dict-tag-chip cosy-dict-tag-domain">${escapeHtml(formatSlugLabel(d))}</span>`;
          }
        }
      }
      card.appendChild(tagsRow);
    }

    // Expanded Detailed Content (On-Demand)
    if (isExpanded) {
      const detailsBox = document.createElement('div');
      detailsBox.className = 'cosy-dict-expanded-details';

      if (!fullEntry) {
        detailsBox.innerHTML = `
          <div class="cosy-dict-loading-details">
            <div class="cosy-dict-spinner" aria-hidden="true"></div>
            <span>Fetching full definition & examples...</span>
          </div>
        `;
      } else {
        // Render Resolved Full Entry Details
        let html = '';

        // IPA & Audio
        if (fullEntry.transcription || fullEntry.audio) {
          html += `<div class="cosy-dict-meta-row">`;
          if (fullEntry.transcription) {
            html += `<span class="cosy-dict-ipa">/ ${escapeHtml(fullEntry.transcription)} /</span>`;
          }
          if (fullEntry.audio) {
            html += `<button type="button" class="cosy-dict-audio-btn" data-audio-url="${escapeHtml(fullEntry.audio)}">🔊 Play Audio</button>`;
          } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            html += `<button type="button" class="cosy-dict-audio-btn" data-speech-text="${escapeHtml(fullEntry.word)}">🔊 Listen</button>`;
          }
          html += `</div>`;
        }

        // Definitions
        if (Array.isArray(fullEntry.definitions) && fullEntry.definitions.length > 0) {
          html += `<ol class="cosy-dict-definitions">`;
          for (const def of fullEntry.definitions) {
            html += `<li>${escapeHtml(def)}</li>`;
          }
          html += `</ol>`;
        }

        // Example Sentences
        if (Array.isArray(fullEntry.examples) && fullEntry.examples.length > 0) {
          html += `<div class="cosy-dict-examples">`;
          for (const ex of fullEntry.examples) {
            html += `<blockquote class="cosy-dict-example-item">"${escapeHtml(ex)}"</blockquote>`;
          }
          html += `</div>`;
        }

        // Synonyms & Antonyms
        if ((Array.isArray(fullEntry.synonyms) && fullEntry.synonyms.length > 0) || (Array.isArray(fullEntry.antonyms) && fullEntry.antonyms.length > 0)) {
          html += `<div class="cosy-dict-chips-row">`;
          if (Array.isArray(fullEntry.synonyms) && fullEntry.synonyms.length > 0) {
            html += `<div class="cosy-dict-chip-group"><span class="cosy-dict-chip-label">Synonyms:</span>`;
            for (const syn of fullEntry.synonyms) {
              html += `<span class="cosy-dict-chip cosy-dict-chip-synonym">${escapeHtml(syn)}</span>`;
            }
            html += `</div>`;
          }
          if (Array.isArray(fullEntry.antonyms) && fullEntry.antonyms.length > 0) {
            html += `<div class="cosy-dict-chip-group"><span class="cosy-dict-chip-label">Antonyms:</span>`;
            for (const ant of fullEntry.antonyms) {
              html += `<span class="cosy-dict-chip cosy-dict-chip-antonym">${escapeHtml(ant)}</span>`;
            }
            html += `</div>`;
          }
          html += `</div>`;
        }

        detailsBox.innerHTML = html;

        // Audio Handler
        const audioBtn = detailsBox.querySelector('.cosy-dict-audio-btn');
        if (audioBtn) {
          audioBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const audioUrl = audioBtn.getAttribute('data-audio-url');
            const speechText = audioBtn.getAttribute('data-speech-text');
            if (audioUrl) {
              new Audio(audioUrl).play().catch((err) => console.warn(err));
            } else if (speechText && typeof window !== 'undefined' && 'speechSynthesis' in window) {
              window.speechSynthesis.cancel();
              const u = new SpeechSynthesisUtterance(speechText);
              u.lang = lang;
              window.speechSynthesis.speak(u);
            }
          });
        }
      }

      card.appendChild(detailsBox);
    }

    return card;
  }

  // Initial App Render
  renderApp();
}

// Auto-initialize on DOM ready
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  const autoInit = () => {
    const els = document.querySelectorAll('[data-dictionary-lang]');
    els.forEach((el) => {
      if (!el.hasAttribute('data-dictionary-initialized')) {
        el.setAttribute('data-dictionary-initialized', 'true');
        initDictionaryUI(el);
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
}
