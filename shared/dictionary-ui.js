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


const TAXONOMY_LOCALIZATIONS = {
  en: {
    titleSuffix: "Dictionary",
    words: "words",
    searchPlaceholder: "Search words...",
    language: "Language",
    primaryCategoryTitle: "🎯 Primary Category: CEFR Proficiency Level",
    primaryCategorySubtitle: "Select a level to practice all vocabulary curated specifically for your proficiency stage:",
    secondaryCategoryTitle: "📚 Secondary Category: Lexical Themes & Sub-Themes",
    secondaryCategorySubtitle: "Explore vocabulary grouped by communicative topics and detailed sub-themes:",
    browseAlphabetTitle: "🔤 Browse by Alphabet",
    browseTrackTitle: "Browse by Course Track",
    myList: "My List",
    recentlyViewed: "Recently Viewed",
    wordOfTheDay: "Word of the Day",
    fetchingDefinition: "Fetching definition...",
    backToHome: "← Back to Dictionary Home",
    searchResultsFor: "Search Results for",
    wordsStartingWith: "Words starting with",
    category: "Category",
    level: "CEFR Level",
    track: "Course Track",
    subThemesIn: "Sub-Themes in",
    themesInLevel: "Themes in Level",
    allSubThemes: "All Sub-Themes",
    allThemes: "All Themes",
    filterResults: "Filter Results:",
    allLevels: "All CEFR Levels",
    allForms: "All Parts of Speech",
    noMatchingWords: "No matching words found for this selection.",
    showMore: "Show More",
    subThemesCount: "sub-themes",
    levelPrefix: "Level"
  },
  fr: {
    titleSuffix: "Dictionnaire",
    words: "mots",
    searchPlaceholder: "Rechercher des mots...",
    language: "Langue",
    primaryCategoryTitle: "🎯 Catégorie principale: Niveau CECRL",
    primaryCategorySubtitle: "Sélectionnez un niveau pour pratiquer le vocabulaire adapté à votre étape d apprentissage:",
    secondaryCategoryTitle: "📚 Catégorie secondaire: Thèmes lexicaux & Sous-thèmes",
    secondaryCategorySubtitle: "Explorez le vocabulaire regroupé par thèmes de communication et sous-thèmes détaillés:",
    browseAlphabetTitle: "🔤 Parcourir par ordre alphabétique",
    browseTrackTitle: "Parcourir par parcours de cours",
    myList: "Ma liste",
    recentlyViewed: "Vus récemment",
    wordOfTheDay: "Mot du jour",
    fetchingDefinition: "Chargement de la définition...",
    backToHome: "← Retour à l accueil du dictionnaire",
    searchResultsFor: "Résultats de recherche pour",
    wordsStartingWith: "Mots commençant par",
    category: "Catégorie",
    level: "Niveau CECRL",
    track: "Parcours de cours",
    subThemesIn: "Sous-thèmes dans",
    themesInLevel: "Thèmes au niveau",
    allSubThemes: "Tous les sous-thèmes",
    allThemes: "Tous les thèmes",
    filterResults: "Filtrer les résultats:",
    allLevels: "Tous les niveaux",
    allForms: "Toutes les catégories grammaticales",
    noMatchingWords: "Aucun mot correspondant trouvé pour cette sélection.",
    showMore: "Afficher plus",
    subThemesCount: "sous-thèmes",
    levelPrefix: "Niveau",
    themes: {
      housing: "Logement & Maison",
      family: "Famille & Proches",
      food: "Nourriture & Boissons",
      work: "Travail & Professions",
      education: "Éducation & Écoles",
      health: "Santé & Corps",
      travel: "Voyages & Transport",
      shopping: "Achats & Commerces",
      money: "Argent & Finance",
      time: "Temps & Calendrier",
      weather: "Météo & Climat",
      nature: "Nature & Environnement",
      technology: "Technologie & Médias",
      communication: "Communication",
      sports: "Sports & Loisirs",
      arts: "Arts & Culture",
      emotions: "Émotions & Sentiments",
      descriptors: "Descriptions & Adjectifs",
      actions: "Actions & Verbes",
      society: "Société & Politique",
      law: "Droit & Justice",
      business: "Affaires & Commerce",
      science: "Science",
      city: "Ville & Lieux",
      objects: "Objets du quotidien",
      numbers: "Nombres & Mesures",
      general: "Vocabulaire général"
    }
  },
  ru: {
    titleSuffix: "Словарь",
    words: "слов",
    searchPlaceholder: "Поиск слов...",
    language: "Язык",
    primaryCategoryTitle: "🎯 Основная категория: Уровень владения CEFR",
    primaryCategorySubtitle: "Выберите уровень для практики лексики вашего этапа обучения:",
    secondaryCategoryTitle: "📚 Вторичная категория: Лексические темы и подтемы",
    secondaryCategorySubtitle: "Изучайте слова, сгруппированные по коммуникативным темам и детальным подтемам:",
    browseAlphabetTitle: "🔤 Просмотр по алфавиту",
    browseTrackTitle: "Просмотр по курсам",
    myList: "Мой список",
    recentlyViewed: "Недавно просмотренные",
    wordOfTheDay: "Слово дня",
    fetchingDefinition: "Загрузка определения...",
    backToHome: "← Назад на главную словаря",
    searchResultsFor: "Результаты поиска по запросу",
    wordsStartingWith: "Слова на букву",
    category: "Категория",
    level: "Уровень CEFR",
    track: "Курс",
    subThemesIn: "Подтемы в категории",
    themesInLevel: "Темы уровня",
    allSubThemes: "Все подтемы",
    allThemes: "Все темы",
    filterResults: "Фильтр результатов:",
    allLevels: "Все уровни",
    allForms: "Все части речи",
    noMatchingWords: "Слова по данному запросу не найдены.",
    showMore: "Показать еще",
    subThemesCount: "подтем",
    levelPrefix: "Уровень",
    themes: {
      housing: "Жилье и дом",
      family: "Семья и родственники",
      food: "Еда и напитки",
      work: "Работа и профессии",
      education: "Образование и учеба",
      health: "Здоровье и медицина",
      travel: "Путешествия и туризм",
      shopping: "Покупки и магазины",
      money: "Деньги и финансы",
      time: "Время и календарь",
      weather: "Погода и климат",
      nature: "Природа и животные",
      technology: "Технологии и интернет",
      communication: "Общение и речь",
      sports: "Спорт и фитнес",
      arts: "Искусство и культура",
      emotions: "Чувства и эмоции",
      descriptors: "Описание и свойства",
      actions: "Действия и глаголы",
      society: "Общество и политика",
      law: "Право и закон",
      business: "Бизнес и коммерция",
      science: "Наука",
      city: "Город и места",
      objects: "Предметы и вещи",
      numbers: "Числа и счет",
      general: "Общие слова"
    }
  },
  tt: {
    titleSuffix: "Сүзлек",
    words: "сүз",
    searchPlaceholder: "Сүзләрне эзләү...",
    language: "Тел",
    primaryCategoryTitle: "🎯 Төп категория: CEFR белем дәрәҗәсе",
    primaryCategorySubtitle: "Бүгенге белем дәрәҗәгезгә туры килгән сүзләрне сайлап өйрәнегез:",
    secondaryCategoryTitle: "📚 Икенчел категория: Лексик темалар һәм ярдәмче темалар",
    secondaryCategorySubtitle: "Сөйләм темалары һәм җентекле ярдәмче темалар буенча төркемләнгән сүзләр:",
    browseAlphabetTitle: "🔤 Алфавит буенча карау",
    browseTrackTitle: "Курслар буенча карау",
    myList: "Минем исемлек",
    recentlyViewed: "Соңгы каралганнар",
    wordOfTheDay: "Көн сүзе",
    fetchingDefinition: "Аныклама йөкләнә...",
    backToHome: "← Сүзлекнең баш биренә кайту",
    searchResultsFor: "Эзләү нәтиҗәләре:",
    wordsStartingWith: "Бу хәрефкә башланган сүзләр:",
    category: "Категория",
    level: "CEFR дәрәҗәсе",
    track: "Курс",
    subThemesIn: "Ярдәмче темалар:",
    themesInLevel: "Дәрәҗә темалары:",
    allSubThemes: "БАРЛЫК ярдәмче темалар",
    allThemes: "БАРЛЫК темалар",
    filterResults: "Нәтиҗәләрне сүзү:",
    allLevels: "БАРЛЫК дәрәҗәләр",
    allForms: "БАРЛЫК сүз төркемнәре",
    noMatchingWords: "Бу сайлау буенча бернинди сүз дә табылмады.",
    showMore: "Күбрәк күрсәтү",
    subThemesCount: "ярдәмче тема",
    levelPrefix: "Дәрәҗә",
    themes: {
      housing: "Торак һәм өй",
      family: "Гаилә һәм туганнар",
      food: "Ит-сүт һәм ашамлыклар",
      work: "Эш һәм һөнәрләр",
      education: "Мәгариф һәм уку",
      health: "Сәламәтлек",
      travel: "Сәяхәт",
      shopping: "Сатып алулар",
      money: "Акча һәм финанс",
      time: "Вакыт һәм календарь",
      weather: "Һава торышы",
      nature: "Табигать",
      technology: "Технологияләр",
      communication: "Сөйләшү һәм аралашу",
      sports: "Спорт",
      arts: "Сәнгать һәм мәдәният",
      emotions: "Хисләр һәм тойгылар",
      descriptors: "Сыйфатлар",
      actions: "Хәрәкәтләр һәм фигыльләр",
      society: "Cәмгыять",
      law: "Cайлау һәм закон",
      business: "Бизнес",
      science: "Фән",
      city: "Шәһәр һәм урыннар",
      objects: "Нәрcәләр",
      numbers: "Саннар",
      general: "Гомуми сүзләр"
    }
  }
};

function getI18n(lang) {
  return TAXONOMY_LOCALIZATIONS[lang] || TAXONOMY_LOCALIZATIONS["en"];
}

function formatSlugLabelLocalized(str, lang) {
  if (!str) return "";
  const i18n = getI18n(lang);
  if (i18n.themes && i18n.themes[str]) {
    return i18n.themes[str];
  }
  return str
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

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
    const subCategoryMap = new Map(); // theme -> Set of sub_themes
    const levelSet = new Set();
    const levelThemeMap = new Map(); // level -> Set of themes
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

      // Theme / Category & Sub-theme
      if (entry.theme) {
        categorySet.add(entry.theme);
        if (entry.sub_theme) {
          if (!subCategoryMap.has(entry.theme)) {
            subCategoryMap.set(entry.theme, new Set());
          }
          subCategoryMap.get(entry.theme).add(entry.sub_theme);
        }
      }

      // CEFR Level
      if (entry.level) {
        levelSet.add(entry.level);
        if (entry.theme) {
          if (!levelThemeMap.has(entry.level)) {
            levelThemeMap.set(entry.level, new Set());
          }
          levelThemeMap.get(entry.level).add(entry.theme);
        }
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

    return { entries, entryMap, letters, categories, subCategoryMap, levels, levelThemeMap, domains };
  } catch (err) {
    console.warn(`[COSYdata UI] Error loading search index for '${lang}':`, err);
    return { entries: [], entryMap: new Map(), letters: [], categories: [], subCategoryMap: new Map(), levels: [], levelThemeMap: new Map(), domains: [] };
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

  if (typeof document !== 'undefined' && document.documentElement) {
    document.documentElement.lang = lang;
  }

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

  targetEl.innerHTML = '';

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
    subValue: null,
    searchQuery: '',
    visibleCount: PAGE_SIZE,
    expandedEntryId: null,
    filterLevel: 'ALL',
    filterForm: 'ALL',
    filterSubTheme: 'ALL'
  };

  // Cache resolved full entries so we don't refetch
  const resolvedFullEntries = new Map();

  // Render Main Shell
  // Header Landmark
  const headerEl = document.createElement('header');
  headerEl.className = 'cosy-dict-header';

  const titleRow = document.createElement('div');
  titleRow.className = 'cosy-dict-title-row';

  const titleEl = document.createElement('h1');
  titleEl.className = 'cosy-dict-title';
  const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === lang) || { name: lang.toUpperCase() };
  const i18n = getI18n(lang);
  titleEl.textContent = `${langObj.name} ${i18n.titleSuffix || "Dictionary"}`;

  const wordCountBadge = document.createElement('span');
  wordCountBadge.className = 'cosy-dict-word-count';
  wordCountBadge.textContent = `${entries.length.toLocaleString()} ${i18n.words || "words"}`;
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
      <input type="text" class="cosy-dict-search-input" id="cosy-hero-search-input" placeholder="${i18n.searchPlaceholder || "Search words..."}" aria-label="Search words" autofocus autocomplete="off" />
      <button type="button" class="cosy-dict-search-clear-btn" aria-label="Clear search" style="display: none;">×</button>
      <div class="cosy-dict-autocomplete" id="cosy-autocomplete-list" style="display: none;" role="listbox"></div>
    </div>
  `;

  const searchInput = searchHeroSection.querySelector('#cosy-hero-search-input');
  const clearSearchBtn = searchHeroSection.querySelector('.cosy-dict-search-clear-btn');
  const autocompleteList = searchHeroSection.querySelector('#cosy-autocomplete-list');

  let selectedAutocompleteIndex = -1;

  function renderAutocompleteSuggestions(query) {
    if (!query || query.length < 2) {
      autocompleteList.style.display = 'none';
      autocompleteList.innerHTML = '';
      selectedAutocompleteIndex = -1;
      return;
    }

    const norm = normalizeText(query);
    const matches = entries
      .filter((e) => e && e.word && normalizeText(e.word).includes(norm))
      .slice(0, 6);

    if (matches.length === 0) {
      autocompleteList.style.display = 'none';
      autocompleteList.innerHTML = '';
      selectedAutocompleteIndex = -1;
      return;
    }

    autocompleteList.innerHTML = matches
      .map(
        (m, idx) => `
        <div class="cosy-dict-autocomplete-item" data-autocomplete-idx="${idx}" data-entry-id="${m.id}" role="option">
          <div class="cosy-dict-autocomplete-left">
            ${m.emoji ? `<span style="font-size: 16px;">${m.emoji}</span>` : ''}
            <span class="cosy-dict-autocomplete-word">${escapeHtml(m.word)}</span>
          </div>
          <div class="cosy-dict-autocomplete-badges">
            ${m.form ? `<span class="cosy-dict-badge cosy-dict-badge-form">${escapeHtml(m.form)}</span>` : ''}
            ${m.level ? `<span class="cosy-dict-badge cosy-dict-badge-level cosy-dict-level-${m.level.toLowerCase()}">${escapeHtml(m.level)}</span>` : ''}
          </div>
        </div>
      `
      )
      .join('');

    autocompleteList.style.display = 'block';
    selectedAutocompleteIndex = -1;

    autocompleteList.querySelectorAll('.cosy-dict-autocomplete-item').forEach((item) => {
      item.addEventListener('click', () => {
        const entryId = item.getAttribute('data-entry-id');
        const selectedEntry = entryMap.get(entryId);
        if (selectedEntry) {
          clearTimeout(searchDebounceTimer);
          searchInput.value = selectedEntry.word;
          activeState.mode = 'search';
          activeState.searchQuery = selectedEntry.word;
          activeState.expandedEntryId = selectedEntry.id;
          autocompleteList.style.display = 'none';
          renderApp();
        }
      });
    });
  }

  // Keyboard navigation for autocomplete
  searchInput.addEventListener('keydown', (e) => {
    const items = autocompleteList.querySelectorAll('.cosy-dict-autocomplete-item');
    if (autocompleteList.style.display === 'block' && items.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedAutocompleteIndex = (selectedAutocompleteIndex + 1) % items.length;
        items.forEach((it, idx) => it.classList.toggle('is-selected', idx === selectedAutocompleteIndex));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedAutocompleteIndex = (selectedAutocompleteIndex - 1 + items.length) % items.length;
        items.forEach((it, idx) => it.classList.toggle('is-selected', idx === selectedAutocompleteIndex));
      } else if (e.key === 'Enter' && selectedAutocompleteIndex >= 0) {
        e.preventDefault();
        items[selectedAutocompleteIndex].click();
      } else if (e.key === 'Escape') {
        autocompleteList.style.display = 'none';
      }
    }
  });

  document.addEventListener('click', (e) => {
    if (!searchHeroSection.contains(e.target)) {
      autocompleteList.style.display = 'none';
    }
  });

  // Debounce search input
  let searchDebounceTimer = null;
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    clearSearchBtn.style.display = query ? 'block' : 'none';

    renderAutocompleteSuggestions(query);

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
      <p style="margin-top: 24px; font-size: 13px; color: var(--cosy-dict-text-muted, #666);">Copyright (c) 2025-2026 COSY Languages. All rights reserved.</p>
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

    // 2. Primary Category Level (Level 1): CEFR Level Cards (A0–C2)
    if (levels.length > 0) {
      const levelSection = document.createElement('section');
      levelSection.className = 'cosy-dict-browse-section';
      levelSection.innerHTML = `
        <h2 class="cosy-dict-section-title">${i18n.primaryCategoryTitle || "🎯 Primary Category: CEFR Proficiency Level"}</h2>
        <p class="cosy-dict-section-subtitle" style="margin-bottom: 12px; color: var(--cosy-dict-text-muted); font-size: 14px;">${i18n.primaryCategorySubtitle || "Select a level:"}</p>
        <div class="cosy-dict-level-grid">
          ${levels
            .map((lvl) => {
              const count = entries.filter((e) => e.level === lvl).length;
              return `
                <button type="button" class="cosy-dict-level-card cosy-dict-level-${lvl.toLowerCase()}" data-level="${lvl}">
                  <strong>Level ${lvl}</strong>
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
          activeState.subValue = null;
          activeState.visibleCount = PAGE_SIZE;
          activeState.expandedEntryId = null;
          activeState.filterLevel = 'ALL';
          activeState.filterForm = 'ALL';
          activeState.filterSubTheme = 'ALL';
          renderApp();
        });
      });

      mainEl.appendChild(levelSection);
    }

    // 3. Secondary Category Level (Level 2 & Level 3): Lexical Themes & Sub-Themes
    if (categories.length > 0) {
      const catSection = document.createElement('section');
      catSection.className = 'cosy-dict-browse-section';
      catSection.innerHTML = `
        <h2 class="cosy-dict-section-title">${i18n.secondaryCategoryTitle || "📚 Secondary Category: Lexical Themes & Sub-Themes"}</h2>
        <p class="cosy-dict-section-subtitle" style="margin-bottom: 12px; color: var(--cosy-dict-text-muted); font-size: 14px;">${i18n.secondaryCategorySubtitle || "Explore vocabulary:"}</p>
        <div class="cosy-dict-tile-grid">
          ${categories
            .map((cat) => {
              const count = entries.filter((e) => e.theme === cat).length;
              const subSet = subCategoryMap.get(cat);
              const subCount = subSet ? subSet.size : 0;
              return `
                <button type="button" class="cosy-dict-tile-card" data-category="${cat}">
                  <span class="cosy-dict-tile-name">${escapeHtml(formatSlugLabelLocalized(cat, lang))}</span>
                  <span class="cosy-dict-tile-count">${count.toLocaleString()} words ${subCount > 0 ? `(${subCount} sub-themes)` : ''}</span>
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
          activeState.subValue = null;
          activeState.visibleCount = PAGE_SIZE;
          activeState.expandedEntryId = null;
          activeState.filterLevel = 'ALL';
          activeState.filterForm = 'ALL';
          activeState.filterSubTheme = 'ALL';
          renderApp();
        });
      });

      mainEl.appendChild(catSection);
    }

    // 4. Browse-by-Letter Row (A–Z)
    if (letters.length > 0) {
      const letterSection = document.createElement('section');
      letterSection.className = 'cosy-dict-browse-section';
      letterSection.innerHTML = `
        <h2 class="cosy-dict-section-title">${i18n.browseAlphabetTitle || "🔤 Browse by Alphabet"}</h2>
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
          activeState.subValue = null;
          activeState.visibleCount = PAGE_SIZE;
          activeState.expandedEntryId = null;
          activeState.filterLevel = 'ALL';
          activeState.filterForm = 'ALL';
          activeState.filterSubTheme = 'ALL';
          renderApp();
        });
      });

      mainEl.appendChild(letterSection);
    }

    // 5. User Saved & Recent Quick Entry Points
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
        activeState.subValue = null;
        activeState.visibleCount = PAGE_SIZE;
        activeState.expandedEntryId = null;
        activeState.filterLevel = 'ALL';
        activeState.filterForm = 'ALL';
        activeState.filterSubTheme = 'ALL';
        renderApp();
      });

      userSection.querySelector('#cosy-recents-btn').addEventListener('click', () => {
        activeState.mode = 'recent';
        activeState.value = null;
        activeState.subValue = null;
        activeState.visibleCount = PAGE_SIZE;
        activeState.expandedEntryId = null;
        activeState.filterLevel = 'ALL';
        activeState.filterForm = 'ALL';
        activeState.filterSubTheme = 'ALL';
        renderApp();
      });

      mainEl.appendChild(userSection);
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
                  <strong>${escapeHtml(formatSlugLabelLocalized(dom, lang))}</strong>
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
      titleText = `Category: ${formatSlugLabel(activeState.value)}${activeState.subValue ? ` → ${formatSlugLabel(activeState.subValue)}` : ''}`;
      filtered = entries.filter((e) => {
        if (e.theme !== activeState.value) return false;
        if (activeState.subValue && e.sub_theme !== activeState.subValue) return false;
        return true;
      });
    } else if (activeState.mode === 'level') {
      titleText = `CEFR Level: ${activeState.value}${activeState.subValue ? ` → Category: ${formatSlugLabel(activeState.subValue)}` : ''}`;
      filtered = entries.filter((e) => {
        if (e.level !== activeState.value) return false;
        if (activeState.subValue && e.theme !== activeState.subValue) return false;
        return true;
      });
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

    // Multi-Facet Filter Application
    if (activeState.filterLevel !== 'ALL') {
      filtered = filtered.filter((e) => e && e.level === activeState.filterLevel);
    }
    if (activeState.filterForm !== 'ALL') {
      filtered = filtered.filter((e) => e && e.form === activeState.filterForm);
    }
    if (activeState.filterSubTheme !== 'ALL') {
      filtered = filtered.filter((e) => e && e.sub_theme === activeState.filterSubTheme);
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
      activeState.subValue = null;
      activeState.searchQuery = '';
      activeState.visibleCount = PAGE_SIZE;
      activeState.expandedEntryId = null;
      activeState.filterLevel = 'ALL';
      activeState.filterForm = 'ALL';
      activeState.filterSubTheme = 'ALL';
      searchInput.value = '';
      clearSearchBtn.style.display = 'none';
      renderApp();
    });

    mainEl.appendChild(headerBar);

    // Hierarchical Exploration Chips Section
    if (activeState.mode === 'category' && activeState.value) {
      const subThemesSet = subCategoryMap.get(activeState.value);
      if (subThemesSet && subThemesSet.size > 0) {
        const subNavSection = document.createElement('div');
        subNavSection.className = 'cosy-dict-subnav-section';
        subNavSection.style.cssText = 'margin: -10px 0 16px 0; padding: 12px 16px; background: var(--cosy-dict-card-bg, #fff); border: 1px solid var(--cosy-dict-border, #e0e0e0); border-radius: var(--cosy-dict-radius, 8px);';

        let subNavHtml = `<div style="font-size: 13px; font-weight: 700; color: var(--cosy-dict-text-muted); margin-bottom: 8px;">Sub-Themes in ${escapeHtml(formatSlugLabel(activeState.value))}:</div>`;
        subNavHtml += `<div class="cosy-dict-subnav-chips" style="display: flex; flex-wrap: wrap; gap: 8px;">`;
        subNavHtml += `<button type="button" class="cosy-dict-chip ${!activeState.subValue ? 'is-active' : ''}" data-subnav="ALL" style="padding: 4px 10px; border-radius: 12px; font-size: 13px; cursor: pointer; border: 1px solid #ccc; background: ${!activeState.subValue ? 'var(--cosy-dict-accent, #416b49)' : '#fff'}; color: ${!activeState.subValue ? '#fff' : '#333'};">All Sub-Themes</button>`;

        for (const st of Array.from(subThemesSet).sort()) {
          const stCount = entries.filter((e) => e.theme === activeState.value && e.sub_theme === st).length;
          const isActive = activeState.subValue === st;
          subNavHtml += `<button type="button" class="cosy-dict-chip ${isActive ? 'is-active' : ''}" data-subnav="${st}" style="padding: 4px 10px; border-radius: 12px; font-size: 13px; cursor: pointer; border: 1px solid #ccc; background: ${isActive ? 'var(--cosy-dict-accent, #416b49)' : '#fff'}; color: ${isActive ? '#fff' : '#333'};">${escapeHtml(formatSlugLabelLocalized(st, lang))} (${stCount})</button>`;
        }
        subNavHtml += `</div>`;
        subNavSection.innerHTML = subNavHtml;

        subNavSection.querySelectorAll('[data-subnav]').forEach((btn) => {
          btn.addEventListener('click', () => {
            const val = btn.getAttribute('data-subnav');
            activeState.subValue = val === 'ALL' ? null : val;
            activeState.visibleCount = PAGE_SIZE;
            renderApp();
          });
        });

        mainEl.appendChild(subNavSection);
      }
    } else if (activeState.mode === 'level' && activeState.value) {
      const themesSet = levelThemeMap.get(activeState.value);
      if (themesSet && themesSet.size > 0) {
        const subNavSection = document.createElement('div');
        subNavSection.className = 'cosy-dict-subnav-section';
        subNavSection.style.cssText = 'margin: -10px 0 16px 0; padding: 12px 16px; background: var(--cosy-dict-card-bg, #fff); border: 1px solid var(--cosy-dict-border, #e0e0e0); border-radius: var(--cosy-dict-radius, 8px);';

        let subNavHtml = `<div style="font-size: 13px; font-weight: 700; color: var(--cosy-dict-text-muted); margin-bottom: 8px;">Themes in Level ${activeState.value}:</div>`;
        subNavHtml += `<div class="cosy-dict-subnav-chips" style="display: flex; flex-wrap: wrap; gap: 8px;">`;
        subNavHtml += `<button type="button" class="cosy-dict-chip ${!activeState.subValue ? 'is-active' : ''}" data-subnav-theme="ALL" style="padding: 4px 10px; border-radius: 12px; font-size: 13px; cursor: pointer; border: 1px solid #ccc; background: ${!activeState.subValue ? 'var(--cosy-dict-accent, #416b49)' : '#fff'}; color: ${!activeState.subValue ? '#fff' : '#333'};">All Themes</button>`;

        for (const th of Array.from(themesSet).sort()) {
          const thCount = entries.filter((e) => e.level === activeState.value && e.theme === th).length;
          const isActive = activeState.subValue === th;
          subNavHtml += `<button type="button" class="cosy-dict-chip ${isActive ? 'is-active' : ''}" data-subnav-theme="${th}" style="padding: 4px 10px; border-radius: 12px; font-size: 13px; cursor: pointer; border: 1px solid #ccc; background: ${isActive ? 'var(--cosy-dict-accent, #416b49)' : '#fff'}; color: ${isActive ? '#fff' : '#333'};">${escapeHtml(formatSlugLabelLocalized(th, lang))} (${thCount})</button>`;
        }
        subNavHtml += `</div>`;
        subNavSection.innerHTML = subNavHtml;

        subNavSection.querySelectorAll('[data-subnav-theme]').forEach((btn) => {
          btn.addEventListener('click', () => {
            const val = btn.getAttribute('data-subnav-theme');
            activeState.subValue = val === 'ALL' ? null : val;
            activeState.visibleCount = PAGE_SIZE;
            renderApp();
          });
        });

        mainEl.appendChild(subNavSection);
      }
    }

    // Extract available sub-themes in current pre-filtered dataset for toolbar filter dropdown
    const availableSubThemes = Array.from(new Set(filtered.map((e) => e && e.sub_theme).filter(Boolean))).sort();

    // Multi-Facet Filter Toolbar Controls
    const filterToolbar = document.createElement('div');
    filterToolbar.className = 'cosy-dict-filter-toolbar';
    filterToolbar.innerHTML = `
      <span class="cosy-dict-filter-label">Filter Results:</span>
      <select class="cosy-dict-filter-select" id="cosy-filter-level-select" aria-label="Filter by CEFR Level">
        <option value="ALL" ${activeState.filterLevel === 'ALL' ? 'selected' : ''}>All CEFR Levels</option>
        ${ALL_CEFR_LEVELS.map((lvl) => `<option value="${lvl}" ${activeState.filterLevel === lvl ? 'selected' : ''}>Level ${lvl}</option>`).join('')}
      </select>
      <select class="cosy-dict-filter-select" id="cosy-filter-form-select" aria-label="Filter by Part of Speech">
        <option value="ALL" ${activeState.filterForm === 'ALL' ? 'selected' : ''}>All Parts of Speech</option>
        <option value="noun" ${activeState.filterForm === 'noun' ? 'selected' : ''}>Nouns</option>
        <option value="verb" ${activeState.filterForm === 'verb' ? 'selected' : ''}>Verbs</option>
        <option value="adjective" ${activeState.filterForm === 'adjective' ? 'selected' : ''}>Adjectives</option>
        <option value="adverb" ${activeState.filterForm === 'adverb' ? 'selected' : ''}>Adverbs</option>
        <option value="phrase" ${activeState.filterForm === 'phrase' ? 'selected' : ''}>Phrases</option>
        <option value="idiom" ${activeState.filterForm === 'idiom' ? 'selected' : ''}>Idioms</option>
      </select>
      ${
        availableSubThemes.length > 0
          ? `
        <select class="cosy-dict-filter-select" id="cosy-filter-subtheme-select" aria-label="Filter by Sub-Theme">
          <option value="ALL" ${activeState.filterSubTheme === 'ALL' ? 'selected' : ''}>All Sub-Themes</option>
          ${availableSubThemes.map((st) => `<option value="${st}" ${activeState.filterSubTheme === st ? 'selected' : ''}>${escapeHtml(formatSlugLabelLocalized(st, lang))}</option>`).join('')}
        </select>
      `
          : ''
      }
    `;

    filterToolbar.querySelector('#cosy-filter-level-select').addEventListener('change', (e) => {
      activeState.filterLevel = e.target.value;
      activeState.visibleCount = PAGE_SIZE;
      renderApp();
    });

    const subThemeSelect = filterToolbar.querySelector('#cosy-filter-subtheme-select');
    if (subThemeSelect) {
      subThemeSelect.addEventListener('change', (e) => {
        activeState.filterSubTheme = e.target.value;
        activeState.visibleCount = PAGE_SIZE;
        renderApp();
      });
    }

    filterToolbar.querySelector('#cosy-filter-form-select').addEventListener('change', (e) => {
      activeState.filterForm = e.target.value;
      activeState.visibleCount = PAGE_SIZE;
      renderApp();
    });

    // Add Export Favorites button if viewing Favorites
    if (activeState.mode === 'favorites' && favorites.size > 0) {
      const exportBtn = document.createElement('button');
      exportBtn.type = 'button';
      exportBtn.className = 'cosy-dict-export-btn';
      exportBtn.innerHTML = '📥 Export My List (CSV)';
      exportBtn.addEventListener('click', () => {
        const favEntries = Array.from(favorites).map((id) => entryMap.get(id)).filter(Boolean);
        if (favEntries.length === 0) return;

        let csvLines = ['ID,Headword,Form,Level,Theme'];
        for (const entry of favEntries) {
          const row = [
            `"${entry.id || ''}"`,
            `"${(entry.word || '').replace(/"/g, '""')}"`,
            `"${(entry.form || '').replace(/"/g, '""')}"`,
            `"${(entry.level || '').replace(/"/g, '""')}"`,
            `"${(entry.theme || '').replace(/"/g, '""')}"`
          ].join(',');
          csvLines.push(row);
        }

        const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `cosydata_favorites_${lang}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
      filterToolbar.appendChild(exportBtn);
    }

    mainEl.appendChild(filterToolbar);

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

    // Category, Sub-Theme & Domain Tags Row
    if (lightweightEntry.domain || lightweightEntry.theme || lightweightEntry.sub_theme) {
      const tagsRow = document.createElement('div');
      tagsRow.className = 'cosy-dict-tags-row';
      if (lightweightEntry.theme) {
        tagsRow.innerHTML += `<span class="cosy-dict-tag-chip">Category: ${escapeHtml(formatSlugLabel(lightweightEntry.theme))}</span>`;
      }
      if (lightweightEntry.sub_theme) {
        tagsRow.innerHTML += `<span class="cosy-dict-tag-chip cosy-dict-tag-subtheme" style="background: rgba(65, 107, 73, 0.1); color: var(--cosy-dict-accent, #416b49);">Sub-theme: ${escapeHtml(formatSlugLabel(lightweightEntry.sub_theme))}</span>`;
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

        // Speech locale mapping table for 14 ISO languages
        const speechLocales = {
          en: 'en-US',
          fr: 'fr-FR',
          it: 'it-IT',
          de: 'de-DE',
          ru: 'ru-RU',
          el: 'el-GR',
          es: 'es-ES',
          pt: 'pt-PT',
          hy: 'hy-AM',
          ka: 'ka-GE',
          br: 'fr-FR',
          cv: 'ru-RU',
          ba: 'ru-RU',
          tt: 'ru-RU'
        };

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
              u.lang = speechLocales[lang] || lang;
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
