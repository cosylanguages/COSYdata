/**
 * COSYdata Dictionary UI Engine
 *
 * Framework-free, reusable ES module for rendering an Oxford/Cambridge-style
 * browsing experience for any language dataset in COSYdata.
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
    // Append any extra unknown domains found
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
    <div class="cosy-dict-loading">
      <div class="cosy-dict-spinner"></div>
      <p>Loading ${lang.toUpperCase()} dictionary...</p>
    </div>
  `;

  const { entries, entryMap, availableDomains } = await loadLanguageDictionary(lang, baseUrl);
  const favorites = getFavorites(lang);
  const wordOfTheDay = getWordOfTheDay(entries);

  // State
  let searchQuery = '';
  let selectedLevels = new Set();
  let selectedDomains = new Set();
  let showFavoritesOnly = false;

  // Render Skeleton UI
  targetEl.innerHTML = '';

  const headerEl = document.createElement('div');
  headerEl.className = 'cosy-dict-header';

  // Title & Stats
  const titleEl = document.createElement('h2');
  titleEl.className = 'cosy-dict-title';
  titleEl.textContent = `${lang.toUpperCase()} Dictionary (${entries.length.toLocaleString()} words)`;
  headerEl.appendChild(titleEl);

  // Word of the Day Banner
  if (wordOfTheDay) {
    const wotdBanner = document.createElement('div');
    wotdBanner.className = 'cosy-dict-wotd';
    wotdBanner.innerHTML = `
      <div class="cosy-dict-wotd-badge">Word of the Day</div>
      <div class="cosy-dict-wotd-content">
        <span class="cosy-dict-wotd-emoji">${wordOfTheDay.emoji || ''}</span>
        <strong class="cosy-dict-wotd-word">${wordOfTheDay.word || ''}</strong>
        <span class="cosy-dict-wotd-pos">${wordOfTheDay.form || ''}</span>
        <span class="cosy-dict-wotd-def">${(wordOfTheDay.definitions && wordOfTheDay.definitions[0]) || ''}</span>
      </div>
      <button type="button" class="cosy-dict-wotd-btn" data-jump-id="${wordOfTheDay.id}">Jump to entry →</button>
    `;

    wotdBanner.querySelector('.cosy-dict-wotd-btn').addEventListener('click', () => {
      jumpToEntry(wordOfTheDay.id);
    });

    headerEl.appendChild(wotdBanner);
  }

  // Search & Filter Control Panel
  const controlsEl = document.createElement('div');
  controlsEl.className = 'cosy-dict-controls';

  // Search input
  const searchRow = document.createElement('div');
  searchRow.className = 'cosy-dict-search-row';
  searchRow.innerHTML = `
    <div class="cosy-dict-search-wrapper">
      <span class="cosy-dict-search-icon">🔍</span>
      <input type="text" class="cosy-dict-search-input" placeholder="Search words, definitions, tags..." aria-label="Search dictionary" />
      <button type="button" class="cosy-dict-clear-btn" aria-label="Clear search" style="display: none;">×</button>
    </div>
    <button type="button" class="cosy-dict-fav-toggle-btn ${showFavoritesOnly ? 'active' : ''}">
      <span class="cosy-dict-star-icon">★</span> My List (${favorites.size})
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
  const levelFilterGroup = document.createElement('div');
  levelFilterGroup.className = 'cosy-dict-filter-group';
  levelFilterGroup.innerHTML = `
    <span class="cosy-dict-filter-label">Level:</span>
    <div class="cosy-dict-level-badges">
      ${ALL_CEFR_LEVELS.map(
        (lvl) => `<button type="button" class="cosy-dict-level-chip" data-level="${lvl}">${lvl}</button>`
      ).join('')}
    </div>
  `;

  levelFilterGroup.querySelectorAll('.cosy-dict-level-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lvl = btn.getAttribute('data-level');
      if (selectedLevels.has(lvl)) {
        selectedLevels.delete(lvl);
        btn.classList.remove('active');
      } else {
        selectedLevels.add(lvl);
        btn.classList.add('active');
      }
      renderList();
    });
  });

  filtersRow.appendChild(levelFilterGroup);

  // Domain filter (dynamic based on available domains)
  if (availableDomains.length > 0) {
    const domainFilterGroup = document.createElement('div');
    domainFilterGroup.className = 'cosy-dict-filter-group';
    domainFilterGroup.innerHTML = `
      <span class="cosy-dict-filter-label">Domain:</span>
      <div class="cosy-dict-domain-checkboxes">
        ${availableDomains
          .map(
            (dom) => `
          <label class="cosy-dict-domain-label">
            <input type="checkbox" value="${dom}" class="cosy-dict-domain-cb" />
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
  targetEl.appendChild(statusBar);

  // List Container
  const listEl = document.createElement('div');
  listEl.className = 'cosy-dict-list';
  targetEl.appendChild(listEl);

  // Function to jump to and highlight an entry
  function jumpToEntry(entryId) {
    const card = listEl.querySelector(`[data-entry-id="${CSS.escape(entryId)}"]`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
      levelFilterGroup.querySelectorAll('.cosy-dict-level-chip').forEach((b) => b.classList.remove('active'));
      selectedDomains.clear();
      domainFilterGroup?.querySelectorAll('.cosy-dict-domain-cb').forEach((cb) => (cb.checked = false));
      showFavoritesOnly = false;
      favToggleBtn.classList.remove('active');

      renderList();

      setTimeout(() => {
        const targetCard = listEl.querySelector(`[data-entry-id="${CSS.escape(entryId)}"]`);
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
        <div class="cosy-dict-empty">
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
          favToggleBtn.innerHTML = `<span class="cosy-dict-star-icon">★</span> My List (${favorites.size})`;
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
 * Creates an entry card DOM element.
 */
function createEntryCard(entry, context) {
  const { lang, entryMap, favorites, onFavoriteToggle, onJumpToEntry } = context;

  const card = document.createElement('article');
  card.className = 'cosy-dict-card';
  card.setAttribute('data-entry-id', entry.id);

  // Header Row: Emoji, Word, Fav star
  const cardHeader = document.createElement('div');
  cardHeader.className = 'cosy-dict-card-header';

  const titleGroup = document.createElement('div');
  titleGroup.className = 'cosy-dict-title-group';

  if (!entry.no_emoji && entry.emoji) {
    const emojiSpan = document.createElement('span');
    emojiSpan.className = 'cosy-dict-emoji';
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
  favBtn.setAttribute('aria-label', isFav ? 'Remove from favorites' : 'Add to favorites');
  favBtn.innerHTML = isFav ? '★' : '☆';

  favBtn.addEventListener('click', () => {
    const nextState = !favorites.has(entry.id);
    favBtn.classList.toggle('is-favorite', nextState);
    favBtn.innerHTML = nextState ? '★' : '☆';
    favBtn.setAttribute('aria-label', nextState ? 'Remove from favorites' : 'Add to favorites');
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
    audioBtn.innerHTML = '🔊 Play';
    audioBtn.onclick = () => {
      const audio = new Audio(entry.audio);
      audio.play().catch((err) => console.warn('[COSYdata UI] Audio play error:', err));
    };
    metaRow.appendChild(audioBtn);
  } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const audioBtn = document.createElement('button');
    audioBtn.type = 'button';
    audioBtn.className = 'cosy-dict-audio-btn';
    audioBtn.innerHTML = '🔊 Listen';
    audioBtn.onclick = () => {
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
    if (entry.article) grammarItems.push(`<strong>Article:</strong> ${entry.article}`);
    if (entry.gender) grammarItems.push(`<strong>Gender:</strong> ${entry.gender}`);
    if (entry.countability) grammarItems.push(`<strong>Countability:</strong> ${entry.countability}`);
    if (entry.plural_form) grammarItems.push(`<strong>Plural:</strong> ${entry.plural_form}`);
    if (entry.singular_workaround) grammarItems.push(`<strong>Singular:</strong> ${entry.singular_workaround}`);
  } else if (entry.form === 'adjective' || entry.form === 'adverb') {
    if (entry.comparative) grammarItems.push(`<strong>Comparative:</strong> ${entry.comparative}`);
    if (entry.superlative) grammarItems.push(`<strong>Superlative:</strong> ${entry.superlative}`);
    if (entry.feminine) grammarItems.push(`<strong>Fem.:</strong> ${entry.feminine}`);
    if (entry.neuter) grammarItems.push(`<strong>Neuter:</strong> ${entry.neuter}`);
    if (entry.masculine_plural) grammarItems.push(`<strong>Masc. Pl.:</strong> ${entry.masculine_plural}`);
    if (entry.feminine_plural) grammarItems.push(`<strong>Fem. Pl.:</strong> ${entry.feminine_plural}`);
    if (entry.position) grammarItems.push(`<strong>Position:</strong> ${entry.position}`);
  }

  if (grammarItems.length > 0) {
    grammarBlock.innerHTML = grammarItems.join(' • ');
    card.appendChild(grammarBlock);
  }

  // Definitions
  if (Array.isArray(entry.definitions) && entry.definitions.length > 0) {
    const defsList = document.createElement('ol');
    defsList.className = 'cosy-dict-definitions';
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

      // Find if synonym exists in dictionary
      const targetEntry = findTargetEntry(syn, entryMap);
      chip.textContent = targetEntry ? targetEntry.word : syn;

      if (targetEntry) {
        chip.classList.add('is-clickable');
        chip.title = `Jump to ${targetEntry.word}`;
        chip.onclick = () => onJumpToEntry(targetEntry.id);
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

      // Find if antonym exists in dictionary
      const targetEntry = findTargetEntry(ant, entryMap);
      chip.textContent = targetEntry ? targetEntry.word : ant;

      if (targetEntry) {
        chip.classList.add('is-clickable');
        chip.title = `Jump to ${targetEntry.word}`;
        chip.onclick = () => onJumpToEntry(targetEntry.id);
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
