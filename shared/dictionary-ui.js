/**
 * COSYdata Dictionary UI Engine
 *
 * Framework-free, reusable ES module for rendering an Oxford/Cambridge-style
 * browsing experience for any language dataset in COSYdata with full accessibility support.
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
  { name: 'COSYlanguages', desc: 'Learning Platform', pagesUrl: 'https://cosylanguages.github.io/COSYlanguages/', repoUrl: 'https://github.com/cosylanguages/COSYlanguages' },
  { name: 'COSYmanuals', desc: 'Grammar Manuals', pagesUrl: 'https://cosylanguages.github.io/COSYmanuals/', repoUrl: 'https://github.com/cosylanguages/COSYmanuals' },
  { name: 'COSYgames', desc: 'Language Games', pagesUrl: 'https://cosylanguages.github.io/COSYgames/', repoUrl: 'https://github.com/cosylanguages/COSYgames' },
  { name: 'COSYtools', desc: 'Language Tools', pagesUrl: 'https://cosylanguages.github.io/COSYtools/', repoUrl: 'https://github.com/cosylanguages/COSYtools' }
];

/**
 * Get favorites from localStorage
 */
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
    // Ignore storage errors
  }
  return new Set();
}

/**
 * Save favorites to localStorage
 */
function saveFavorites(lang, favoritesSet) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const arr = Array.from(favoritesSet);
      window.localStorage.setItem(`cosydata:favorites:${lang}`, JSON.stringify(arr));
    }
  } catch (err) {
    // Ignore storage errors
  }
}

/**
 * Calculates a deterministic "Word of the day" based on YYYY-MM-DD + entry list.
 */
function getWordOfTheDay(entries) {
  if (!entries || entries.length === 0) return null;

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = (hash << 5) - hash + today.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % entries.length;
  return entries[index];
}

/**
 * Parses related_forms string like "COSYtools:fr-conjugeur:aimer"
 * Returns object { repo, path, term, url, label }
 */
function parseRelatedForm(ref) {
  if (!ref || typeof ref !== 'string') return null;
  const parts = ref.split(':');
  if (parts.length < 2) return null;

  const repo = parts[0];
  const tool = parts[1] || '';
  const term = parts.slice(2).join(':');

  let url = `https://cosylanguages.github.io/${encodeURIComponent(repo)}/`;
  if (tool && term) {
    url += `${encodeURIComponent(tool)}/?q=${encodeURIComponent(term)}`;
  } else if (tool) {
    url += `${encodeURIComponent(tool)}/`;
  }

  const label = tool && term ? `${repo} (${tool}: ${term})` : tool ? `${repo} (${tool})` : repo;

  return { repo, tool, term, url, label };
}

/**
 * Normalizes text for search matching (lowercased, stripped diacritics).
 */
function normalizeText(text) {
  if (!text) return '';
  return String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/**
 * Loads vocabulary entries for a given language.
 */
async function loadLanguageDictionary(lang, baseUrl) {
  const normalizedBaseUrl = (baseUrl || DEFAULT_BASE_URL).replace(/\/?$/, '/');
  const indexUrl = `${normalizedBaseUrl}vocabulary/${lang}/index.json`;

  try {
    const indexRes = await fetch(indexUrl);
    if (!indexRes.ok) {
      console.warn(`[COSYdata UI] Failed to load index.json for '${lang}' (${indexRes.status})`);
      return { entries: [], entryMap: new Map(), availableDomains: [] };
    }

    const indexData = await indexRes.json();
    const themeFiles = new Set(Object.values(indexData));

    const themePromises = Array.from(themeFiles).map(async (filename) => {
      const themeUrl = `${normalizedBaseUrl}vocabulary/${lang}/${filename}`;
      try {
        const res = await fetch(themeUrl);
        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data) ? data : data && data.id ? [data] : [];
      } catch (err) {
        console.warn(`[COSYdata UI] Error loading theme file ${filename}:`, err);
        return [];
      }
    });

    const results = await Promise.all(themePromises);
    const entryMap = new Map();
    const foundDomains = new Set();

    for (const themeEntries of results) {
      for (const entry of themeEntries) {
        if (!entry || !entry.id) continue;
        entryMap.set(entry.id, entry);

        // Collect present domains
        if (entry.domain && typeof entry.domain === 'string') {
          const doms = entry.domain.split(',').map((d) => d.trim());
          for (const d of doms) {
            if (d) foundDomains.add(d);
          }
        }
      }
    }

    // Sort entries alphabetically by word
    const entries = Array.from(entryMap.values()).sort((a, b) =>
      (a.word || '').localeCompare(b.word || '', lang, { sensitivity: 'base' })
    );

    // Determine available domains in standard order
    const availableDomains = KNOWN_DOMAINS.filter((d) => foundDomains.has(d));
    for (const d of foundDomains) {
      if (!availableDomains.includes(d)) {
        availableDomains.push(d);
      }
    }

    return { entries, entryMap, availableDomains };
  } catch (err) {
    console.warn(`[COSYdata UI] Error loading dictionary for ${lang}:`, err);
    return { entries: [], entryMap: new Map(), availableDomains: [] };
  }
}

/**
 * Initializes the Dictionary UI engine on a container element.
 *
 * @param {Element|string} container - Element or selector
 * @param {Object} [options]
 * @param {string} [options.lang] - Language code (e.g. 'en', 'fr')
 * @param {string} [options.baseUrl] - Custom base URL for data
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
      <p>Loading ${lang.toUpperCase()} dictionary...</p>
    </div>
  `;

  const { entries, entryMap, availableDomains } = await loadLanguageDictionary(lang, baseUrl);
  const favorites = getFavorites(lang);
  const wordOfTheDay = getWordOfTheDay(entries);

  // Parse search query from URL params if present
  let searchQuery = '';
  if (typeof window !== 'undefined' && window.location && window.location.search) {
    const params = new URLSearchParams(window.location.search);
    searchQuery = params.get('q') || '';
  }

  // State
  let selectedLevels = new Set();
  let selectedDomains = new Set();
  let showFavoritesOnly = false;

  // Render Skeleton UI
  targetEl.innerHTML = '';

  // Header Landmark
  const headerEl = document.createElement('header');
  headerEl.className = 'cosy-dict-header';
  headerEl.setAttribute('role', 'banner');

  // Title Row with Title and Language Switcher
  const titleRow = document.createElement('div');
  titleRow.className = 'cosy-dict-title-row';

  const titleEl = document.createElement('h1');
  titleEl.className = 'cosy-dict-title';
  const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === lang) || { name: lang.toUpperCase() };
  titleEl.textContent = `${langObj.name} Dictionary (${entries.length.toLocaleString()} words)`;
  titleRow.appendChild(titleEl);

  // Language Switcher Dropdown
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
      let targetUrl = `../../vocabulary/${newLang}/index.html`;
      if (searchQuery) {
        targetUrl += `?q=${encodeURIComponent(searchQuery)}`;
      }
      window.location.href = targetUrl;
    }
  });

  titleRow.appendChild(langSelectWrapper);
  headerEl.appendChild(titleRow);

  // Word of the Day Banner
  if (wordOfTheDay) {
    const wotdBanner = document.createElement('section');
    wotdBanner.className = 'cosy-dict-wotd';
    wotdBanner.setAttribute('aria-label', 'Word of the Day');
    wotdBanner.innerHTML = `
      <div class="cosy-dict-wotd-badge">Word of the Day</div>
      <div class="cosy-dict-wotd-content">
        ${
          wordOfTheDay.emoji
            ? `<span class="cosy-dict-wotd-emoji" role="img" aria-label="Emoji ${wordOfTheDay.emoji}">${wordOfTheDay.emoji}</span>`
            : ''
        }
        <strong class="cosy-dict-wotd-word">${wordOfTheDay.word || ''}</strong>
        <span class="cosy-dict-wotd-pos">${wordOfTheDay.form || ''}</span>
        <span class="cosy-dict-wotd-def">${(wordOfTheDay.definitions && wordOfTheDay.definitions[0]) || ''}</span>
      </div>
      <button type="button" class="cosy-dict-wotd-btn" data-jump-id="${wordOfTheDay.id}" aria-label="Jump to entry for ${wordOfTheDay.word}">Jump to entry →</button>
    `;

    wotdBanner.querySelector('.cosy-dict-wotd-btn').addEventListener('click', () => {
      jumpToEntry(wordOfTheDay.id);
    });

    headerEl.appendChild(wotdBanner);
  }

  // Search & Filter Control Panel
  const controlsEl = document.createElement('section');
  controlsEl.className = 'cosy-dict-controls';
  controlsEl.setAttribute('role', 'search');
  controlsEl.setAttribute('aria-label', 'Search and filter dictionary controls');

  // Search input
  const searchRow = document.createElement('div');
  searchRow.className = 'cosy-dict-search-row';
  searchRow.innerHTML = `
    <div class="cosy-dict-search-wrapper">
      <span class="cosy-dict-search-icon" aria-hidden="true">🔍</span>
      <input type="text" class="cosy-dict-search-input" value="${escapeHtml(searchQuery)}" placeholder="Search words, definitions, tags..." aria-label="Search words, definitions, or tags" />
      <button type="button" class="cosy-dict-clear-btn" aria-label="Clear search input" style="display: ${searchQuery ? 'block' : 'none'};">×</button>
    </div>
    <button type="button" class="cosy-dict-fav-toggle-btn ${showFavoritesOnly ? 'active' : ''}" aria-label="Toggle my saved favorites list">
      <span class="cosy-dict-star-icon" aria-hidden="true">★</span> My List (${favorites.size})
    </button>
  `;

  const searchInput = searchRow.querySelector('.cosy-dict-search-input');
  const clearBtn = searchRow.querySelector('.cosy-dict-clear-btn');
  const favToggleBtn = searchRow.querySelector('.cosy-dict-fav-toggle-btn');

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    clearBtn.style.display = searchQuery ? 'block' : 'none';
    renderList();
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearBtn.style.display = 'none';
    searchInput.focus();
    renderList();
  });

  favToggleBtn.addEventListener('click', () => {
    showFavoritesOnly = !showFavoritesOnly;
    favToggleBtn.classList.toggle('active', showFavoritesOnly);
    renderList();
  });

  controlsEl.appendChild(searchRow);

  // Filter Group: Level & Domain
  const filtersRow = document.createElement('div');
  filtersRow.className = 'cosy-dict-filters-row';

  // Level filter
  const levelFilterGroup = document.createElement('fieldset');
  levelFilterGroup.className = 'cosy-dict-filter-group';
  levelFilterGroup.innerHTML = `
    <legend class="cosy-dict-filter-label">Level:</legend>
    <div class="cosy-dict-level-badges">
      ${ALL_CEFR_LEVELS.map(
        (lvl) => `<button type="button" class="cosy-dict-level-chip" data-level="${lvl}" aria-pressed="false" aria-label="Filter CEFR level ${lvl}">${lvl}</button>`
      ).join('')}
    </div>
  `;

  levelFilterGroup.querySelectorAll('.cosy-dict-level-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lvl = btn.getAttribute('data-level');
      if (selectedLevels.has(lvl)) {
        selectedLevels.delete(lvl);
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      } else {
        selectedLevels.add(lvl);
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      }
      renderList();
    });
  });

  filtersRow.appendChild(levelFilterGroup);

  // Domain filter (dynamic based on available domains)
  if (availableDomains.length > 0) {
    const domainFilterGroup = document.createElement('fieldset');
    domainFilterGroup.className = 'cosy-dict-filter-group';
    domainFilterGroup.innerHTML = `
      <legend class="cosy-dict-filter-label">Domain:</legend>
      <div class="cosy-dict-domain-checkboxes">
        ${availableDomains
          .map(
            (dom) => `
          <label class="cosy-dict-domain-label">
            <input type="checkbox" value="${dom}" class="cosy-dict-domain-cb" aria-label="Filter domain ${formatDomainLabel(dom)}" />
            <span>${formatDomainLabel(dom)}</span>
          </label>
        `
          )
          .join('')}
      </div>
    `;

    domainFilterGroup.querySelectorAll('.cosy-dict-domain-cb').forEach((cb) => {
      cb.addEventListener('change', () => {
        if (cb.checked) {
          selectedDomains.add(cb.value);
        } else {
          selectedDomains.delete(cb.value);
        }
        renderList();
      });
    });

    filtersRow.appendChild(domainFilterGroup);
  }

  controlsEl.appendChild(filtersRow);
  headerEl.appendChild(controlsEl);
  targetEl.appendChild(headerEl);

  // Status Bar
  const statusBar = document.createElement('div');
  statusBar.className = 'cosy-dict-status';
  statusBar.setAttribute('role', 'status');
  statusBar.setAttribute('aria-live', 'polite');
  targetEl.appendChild(statusBar);

  // Main List Container
  const listEl = document.createElement('main');
  listEl.className = 'cosy-dict-list';
  listEl.setAttribute('role', 'main');
  listEl.setAttribute('aria-label', `${langObj.name} Vocabulary List`);
  targetEl.appendChild(listEl);

  // Ecosystem Footer Block
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
          <a href="${repo.pagesUrl}" class="cosy-dict-eco-link" target="_blank" rel="noopener noreferrer" aria-label="${repo.name} - ${repo.desc}">
            <strong>${repo.name}</strong>
            <span>${repo.desc}</span>
          </a>
        `
        ).join('')}
      </div>
    </div>
  `;
  targetEl.appendChild(footerEl);

  // Function to jump to and highlight an entry
  function jumpToEntry(entryId) {
    const card = listEl.querySelector(`[data-entry-id="${CSS.escape(entryId)}"]`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.focus();
      card.classList.add('cosy-dict-card-highlight');
      setTimeout(() => {
        card.classList.remove('cosy-dict-card-highlight');
      }, 2000);
    } else {
      // Clear filters if entry is hidden
      searchQuery = '';
      searchInput.value = '';
      clearBtn.style.display = 'none';
      selectedLevels.clear();
      levelFilterGroup.querySelectorAll('.cosy-dict-level-chip').forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      selectedDomains.clear();
      domainFilterGroup?.querySelectorAll('.cosy-dict-domain-cb').forEach((cb) => (cb.checked = false));
      showFavoritesOnly = false;
      favToggleBtn.classList.remove('active');

      renderList();

      setTimeout(() => {
        const targetCard = listEl.querySelector(`[data-entry-id="${CSS.escape(entryId)}"]`);
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          targetCard.focus();
          targetCard.classList.add('cosy-dict-card-highlight');
          setTimeout(() => {
            targetCard.classList.remove('cosy-dict-card-highlight');
          }, 2000);
        }
      }, 100);
    }
  }

  // Filter & Render logic
  function renderList() {
    const normSearch = normalizeText(searchQuery);

    const filtered = entries.filter((entry) => {
      // 1. Favorites filter
      if (showFavoritesOnly && !favorites.has(entry.id)) {
        return false;
      }

      // 2. CEFR Level filter
      if (selectedLevels.size > 0) {
        const entryLevels = new Set([entry.level, ...(entry.levels || [])].filter(Boolean));
        let matchLvl = false;
        for (const lvl of selectedLevels) {
          if (entryLevels.has(lvl)) {
            matchLvl = true;
            break;
          }
        }
        if (!matchLvl) return false;
      }

      // 3. Domain filter
      if (selectedDomains.size > 0) {
        const entryDomains = (entry.domain || '').split(',').map((d) => d.trim());
        let matchDom = false;
        for (const dom of selectedDomains) {
          if (entryDomains.includes(dom)) {
            matchDom = true;
            break;
          }
        }
        if (!matchDom) return false;
      }

      // 4. Search query filter
      if (normSearch) {
        const normWord = normalizeText(entry.word);
        if (normWord.includes(normSearch)) return true;

        if (Array.isArray(entry.definitions)) {
          for (const def of entry.definitions) {
            if (normalizeText(def).includes(normSearch)) return true;
          }
        }

        if (Array.isArray(entry.tags)) {
          for (const tag of entry.tags) {
            if (normalizeText(tag).includes(normSearch)) return true;
          }
        }

        if (entry.theme && normalizeText(entry.theme).includes(normSearch)) return true;
        if (entry.sub_theme && normalizeText(entry.sub_theme).includes(normSearch)) return true;

        return false;
      }

      return true;
    });

    // Update status
    statusBar.textContent = `Showing ${filtered.length.toLocaleString()} of ${entries.length.toLocaleString()} entries`;

    listEl.innerHTML = '';

    if (filtered.length === 0) {
      listEl.innerHTML = `
        <div class="cosy-dict-empty" role="region" aria-label="No results">
          <p>No vocabulary terms found matching your filter criteria.</p>
        </div>
      `;
      return;
    }

    // Render cards
    const fragment = document.createDocumentFragment();

    for (const entry of filtered) {
      const card = createEntryCard(entry, {
        lang,
        entryMap,
        favorites,
        onFavoriteToggle: (id, isFav) => {
          if (isFav) {
            favorites.add(id);
          } else {
            favorites.delete(id);
          }
          saveFavorites(lang, favorites);
          favToggleBtn.innerHTML = `<span class="cosy-dict-star-icon" aria-hidden="true">★</span> My List (${favorites.size})`;
          if (showFavoritesOnly && !isFav) {
            renderList();
          }
        },
        onJumpToEntry: (targetId) => {
          jumpToEntry(targetId);
        }
      });
      fragment.appendChild(card);
    }

    listEl.appendChild(fragment);

    // Hydrate DOM elements if needed
    hydrateVocabElements(listEl, { baseUrl });
  }

  // Initial render
  renderList();
}

/**
 * Creates an entry card DOM element with full accessibility properties.
 */
function createEntryCard(entry, context) {
  const { lang, entryMap, favorites, onFavoriteToggle, onJumpToEntry } = context;

  const card = document.createElement('article');
  card.className = 'cosy-dict-card';
  card.setAttribute('data-entry-id', entry.id);
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `Vocabulary card for ${entry.word || entry.id}`);

  // Header Row: Emoji, Word, Fav star
  const cardHeader = document.createElement('div');
  cardHeader.className = 'cosy-dict-card-header';

  const titleGroup = document.createElement('div');
  titleGroup.className = 'cosy-dict-title-group';

  if (!entry.no_emoji && entry.emoji) {
    const emojiSpan = document.createElement('span');
    emojiSpan.className = 'cosy-dict-emoji';
    emojiSpan.setAttribute('role', 'img');
    emojiSpan.setAttribute('aria-label', `Emoji representation ${entry.emoji}`);
    emojiSpan.textContent = entry.emoji;
    titleGroup.appendChild(emojiSpan);
  }

  const wordSpan = document.createElement('h3');
  wordSpan.className = 'cosy-dict-headword';
  wordSpan.textContent = entry.word || entry.id;
  titleGroup.appendChild(wordSpan);

  cardHeader.appendChild(titleGroup);

  // Favorite Star Button
  const isFav = favorites.has(entry.id);
  const favBtn = document.createElement('button');
  favBtn.type = 'button';
  favBtn.className = `cosy-dict-star-btn ${isFav ? 'is-favorite' : ''}`;
  favBtn.setAttribute('aria-label', isFav ? `Remove ${entry.word} from favorites` : `Add ${entry.word} to favorites`);
  favBtn.setAttribute('aria-pressed', isFav ? 'true' : 'false');
  favBtn.innerHTML = isFav ? '★' : '☆';

  favBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const nextState = !favorites.has(entry.id);
    favBtn.classList.toggle('is-favorite', nextState);
    favBtn.innerHTML = nextState ? '★' : '☆';
    favBtn.setAttribute('aria-label', nextState ? `Remove ${entry.word} from favorites` : `Add ${entry.word} to favorites`);
    favBtn.setAttribute('aria-pressed', nextState ? 'true' : 'false');
    onFavoriteToggle(entry.id, nextState);
  });

  cardHeader.appendChild(favBtn);
  card.appendChild(cardHeader);

  // Meta Row: IPA, Form, Level, Gender/Article
  const metaRow = document.createElement('div');
  metaRow.className = 'cosy-dict-meta-row';

  // IPA transcription
  if (entry.transcription) {
    const ipaSpan = document.createElement('span');
    ipaSpan.className = 'cosy-dict-ipa';
    ipaSpan.setAttribute('aria-label', `IPA Pronunciation ${entry.transcription}`);
    ipaSpan.textContent = entry.transcription;
    metaRow.appendChild(ipaSpan);
  } else if (entry.transcription_variants) {
    const vars = entry.transcription_variants;
    const varStr = Object.entries(vars)
      .map(([k, v]) => `${k.toUpperCase()}: ${v}`)
      .join(' | ');
    if (varStr) {
      const ipaSpan = document.createElement('span');
      ipaSpan.className = 'cosy-dict-ipa';
      ipaSpan.textContent = varStr;
      metaRow.appendChild(ipaSpan);
    }
  }

  // Part of speech / form badge
  if (entry.form) {
    const formBadge = document.createElement('span');
    formBadge.className = 'cosy-dict-badge cosy-dict-badge-form';
    formBadge.textContent = entry.form;
    metaRow.appendChild(formBadge);
  }

  // Level badge
  if (entry.level) {
    const lvlBadge = document.createElement('span');
    lvlBadge.className = `cosy-dict-badge cosy-dict-badge-level cosy-dict-level-${entry.level.toLowerCase()}`;
    lvlBadge.textContent = entry.level;
    metaRow.appendChild(lvlBadge);
  }

  // Audio Play Button
  if (entry.audio) {
    const audioBtn = document.createElement('button');
    audioBtn.type = 'button';
    audioBtn.className = 'cosy-dict-audio-btn';
    audioBtn.setAttribute('aria-label', `Play recorded pronunciation for ${entry.word}`);
    audioBtn.innerHTML = '🔊 Play';
    audioBtn.onclick = (e) => {
      e.stopPropagation();
      const audio = new Audio(entry.audio);
      audio.play().catch((err) => console.warn('[COSYdata UI] Audio play error:', err));
    };
    metaRow.appendChild(audioBtn);
  } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const audioBtn = document.createElement('button');
    audioBtn.type = 'button';
    audioBtn.className = 'cosy-dict-audio-btn';
    audioBtn.setAttribute('aria-label', `Listen to speech synthesis for ${entry.word}`);
    audioBtn.innerHTML = '🔊 Listen';
    audioBtn.onclick = (e) => {
      e.stopPropagation();
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(entry.word);
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    };
    metaRow.appendChild(audioBtn);
  }

  card.appendChild(metaRow);

  // Noun or Adjective/Adverb Metadata Block
  const grammarBlock = document.createElement('div');
  grammarBlock.className = 'cosy-dict-grammar-props';
  const grammarItems = [];

  if (entry.form === 'noun') {
    if (entry.article) grammarItems.push(`<strong>Article:</strong> ${escapeHtml(entry.article)}`);
    if (entry.gender) grammarItems.push(`<strong>Gender:</strong> ${escapeHtml(entry.gender)}`);
    if (entry.countability) grammarItems.push(`<strong>Countability:</strong> ${escapeHtml(entry.countability)}`);
    if (entry.plural_form) grammarItems.push(`<strong>Plural:</strong> ${escapeHtml(entry.plural_form)}`);
    if (entry.singular_workaround) grammarItems.push(`<strong>Singular:</strong> ${escapeHtml(entry.singular_workaround)}`);
  } else if (entry.form === 'adjective' || entry.form === 'adverb') {
    if (entry.comparative) grammarItems.push(`<strong>Comparative:</strong> ${escapeHtml(entry.comparative)}`);
    if (entry.superlative) grammarItems.push(`<strong>Superlative:</strong> ${escapeHtml(entry.superlative)}`);
    if (entry.feminine) grammarItems.push(`<strong>Fem.:</strong> ${escapeHtml(entry.feminine)}`);
    if (entry.neuter) grammarItems.push(`<strong>Neuter:</strong> ${escapeHtml(entry.neuter)}`);
    if (entry.masculine_plural) grammarItems.push(`<strong>Masc. Pl.:</strong> ${escapeHtml(entry.masculine_plural)}`);
    if (entry.feminine_plural) grammarItems.push(`<strong>Fem. Pl.:</strong> ${escapeHtml(entry.feminine_plural)}`);
    if (entry.position) grammarItems.push(`<strong>Position:</strong> ${escapeHtml(entry.position)}`);
  }

  if (grammarItems.length > 0) {
    grammarBlock.innerHTML = grammarItems.join(' • ');
    card.appendChild(grammarBlock);
  }

  // Definitions
  if (Array.isArray(entry.definitions) && entry.definitions.length > 0) {
    const defsList = document.createElement('ol');
    defsList.className = 'cosy-dict-definitions';
    defsList.setAttribute('aria-label', `Definitions for ${entry.word}`);
    for (const def of entry.definitions) {
      const li = document.createElement('li');
      li.textContent = def;
      defsList.appendChild(li);
    }
    card.appendChild(defsList);
  }

  // Examples
  if (Array.isArray(entry.examples) && entry.examples.length > 0) {
    const exList = document.createElement('div');
    exList.className = 'cosy-dict-examples';
    exList.setAttribute('aria-label', `Example sentences for ${entry.word}`);
    for (const ex of entry.examples) {
      const exItem = document.createElement('blockquote');
      exItem.className = 'cosy-dict-example-item';
      exItem.textContent = `"${ex}"`;
      exList.appendChild(exItem);
    }
    card.appendChild(exList);
  }

  // Antonyms & Synonyms Chips
  const chipsRow = document.createElement('div');
  chipsRow.className = 'cosy-dict-chips-row';

  if (Array.isArray(entry.synonyms) && entry.synonyms.length > 0) {
    const synGroup = document.createElement('div');
    synGroup.className = 'cosy-dict-chip-group';
    synGroup.innerHTML = '<span class="cosy-dict-chip-label">Synonyms:</span>';

    for (const syn of entry.synonyms) {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'cosy-dict-chip cosy-dict-chip-synonym';

      const targetEntry = findTargetEntry(syn, entryMap);
      chip.textContent = targetEntry ? targetEntry.word : syn;

      if (targetEntry) {
        chip.classList.add('is-clickable');
        chip.setAttribute('aria-label', `Jump to synonym entry ${targetEntry.word}`);
        chip.onclick = (e) => {
          e.stopPropagation();
          onJumpToEntry(targetEntry.id);
        };
      }

      synGroup.appendChild(chip);
    }
    chipsRow.appendChild(synGroup);
  }

  if (Array.isArray(entry.antonyms) && entry.antonyms.length > 0) {
    const antGroup = document.createElement('div');
    antGroup.className = 'cosy-dict-chip-group';
    antGroup.innerHTML = '<span class="cosy-dict-chip-label">Antonyms:</span>';

    for (const ant of entry.antonyms) {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'cosy-dict-chip cosy-dict-chip-antonym';

      const targetEntry = findTargetEntry(ant, entryMap);
      chip.textContent = targetEntry ? targetEntry.word : ant;

      if (targetEntry) {
        chip.classList.add('is-clickable');
        chip.setAttribute('aria-label', `Jump to antonym entry ${targetEntry.word}`);
        chip.onclick = (e) => {
          e.stopPropagation();
          onJumpToEntry(targetEntry.id);
        };
      }

      antGroup.appendChild(chip);
    }
    chipsRow.appendChild(antGroup);
  }

  if (chipsRow.children.length > 0) {
    card.appendChild(chipsRow);
  }

  // "Related elsewhere in COSY" row
  if (Array.isArray(entry.related_forms) && entry.related_forms.length > 0) {
    const relatedRow = document.createElement('div');
    relatedRow.className = 'cosy-dict-related-row';
    relatedRow.innerHTML = '<span class="cosy-dict-related-label">Related elsewhere in COSY:</span>';

    for (const relRef of entry.related_forms) {
      const parsed = parseRelatedForm(relRef);
      if (parsed) {
        const link = document.createElement('a');
        link.className = 'cosy-dict-related-link';
        link.href = parsed.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', `External reference link to ${parsed.label}`);
        link.textContent = parsed.label;
        relatedRow.appendChild(link);
      }
    }
    card.appendChild(relatedRow);
  }

  return card;
}

/**
 * Helper to find entry in map by ref or word.
 */
function findTargetEntry(termOrId, entryMap) {
  if (entryMap.has(termOrId)) return entryMap.get(termOrId);

  const normTerm = normalizeText(termOrId);
  for (const entry of entryMap.values()) {
    if (entry.id === termOrId || normalizeText(entry.word) === normTerm) {
      return entry;
    }
  }
  return null;
}

/**
 * Formats domain slug into user-friendly label.
 */
function formatDomainLabel(domainStr) {
  return domainStr
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Escapes HTML characters in text string.
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Auto-initialize on DOM ready for elements with data-dictionary-lang
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
