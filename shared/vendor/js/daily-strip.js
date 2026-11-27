/**
 * COSYlanguages Daily Strip Component Engine
 * File: js/daily-strip.js
 *
 * Integrated with COSYpractice (https://cosylanguages.github.io/COSYpractice/):
 * - Unified day streak (`cosy-streak`, `practice_streak`)
 * - Direct deep-link launchers to interactive practice modules
 * - Daily Challenge sync matching COSYpractice's 7-day schedule
 */

(function () {
    'use strict';

    // Chrome labels come from data/ui/<lang>.json through window.t(). The English
    // literal stays as the fallback: sibling repositories load this file without the
    // i18n engine, and a missing key must degrade to English, not to an empty label.
    const t = (key, fallback) => {
        const value = (typeof window !== 'undefined' && window.t) ? window.t(key) : '';
        return value || fallback;
    };

    const COSY_DATA_DAILY_BASE = 'https://cosylanguages.github.io/COSYdata/daily/';

    const COSY_PRACTICE_BASE = 'https://cosylanguages.github.io/COSYpractice/';
    const COSY_TOOLS_DAILY_URL = 'https://cosylanguages.github.io/COSYtools/practice/daily/';
    const COSY_HUB_DATA_BASE = 'https://cosylanguages.github.io/COSYlanguages/data/daily/';

    // Each daily file has exactly one owner: COSYpractice publishes the speaking and
    // writing prompts, this repository publishes the fun facts. COSYdata holds the
    // vocabulary calendars only, so it is not a fallback for any of them.
    const DAILY_SOURCES = {
        speaking: [COSY_PRACTICE_BASE + 'data/daily/'],
        writing: [COSY_PRACTICE_BASE + 'data/daily/'],
        facts: [COSY_HUB_DATA_BASE]
    };

    // Every tab a strip can show. A host picks and orders them with data-slots="word,phrasal-verb";
    // without it a strip shows the default four below. `calendar` names the COSYdata calendar slot a tab reads.
    const TAB_REGISTRY = {
        speaking: { id: 'speaking', label: 'Speaking Prompt', labelKey: 'strip_tab_speaking', icon: '🗣️' },
        writing: { id: 'writing', label: 'Writing Prompt', labelKey: 'strip_tab_writing', icon: '✍️' },
        fact: { id: 'fact', label: 'Fun Fact', labelKey: 'strip_tab_fact', icon: '💡' },
        word: { id: 'word', label: 'Word of the Day', labelKey: 'strip_tab_word', icon: '📖', calendar: 'word' },
        idiom: { id: 'idiom', label: 'Idiom of the Day', labelKey: 'strip_tab_idiom', icon: '💬', calendar: 'idiom' },
        'phrasal-verb': { id: 'phrasal-verb', label: 'Phrasal Verb of the Day', labelKey: 'strip_tab_phrasal_verb', icon: '🔗', calendar: 'phrasal-verb' },
        // verbs COSYtools can drill; `toolsLabel` swaps the footer link for one into the COSYtools Daily page
        verb: { id: 'verb', label: 'Verb of the Day', labelKey: 'strip_tab_verb', icon: '🔤', calendar: 'verb', toolsLabel: '🛠️ Conjugate it in COSYtools', toolsKey: 'strip_tools_conjugate' },
        'verb-prep': { id: 'verb-prep', label: 'Verb + Preposition', labelKey: 'strip_tab_verb_prep', icon: '🧩', calendar: 'verb-prep', toolsLabel: '🎯 Guess the preposition in COSYtools', toolsKey: 'strip_tools_preposition' }
    };
    const TABS_CONFIG = ['speaking', 'writing', 'fact'].map(id => TAB_REGISTRY[id]);

    // COSYpractice 7-day rotating schedule mapping
    const DAILY_SCHEDULE = {
        0: { cat: 'speaking', label: 'Speaking Fluency', labelKey: 'strip_sched_speaking_fluency', icon: '🗣️', theme: 'speaking' },
        1: { cat: 'writing', label: 'Writing & Expression', labelKey: 'strip_sched_writing_expression', icon: '✍️', theme: 'writing' },
        2: { cat: 'grammar', label: 'Grammar Accuracy', labelKey: 'strip_sched_grammar_accuracy', icon: '📐', theme: 'all' },
        3: { cat: 'speaking', label: 'Speaking Conversation', labelKey: 'strip_sched_speaking_conversation', icon: '🗣️', theme: 'speaking' },
        4: { cat: 'writing', label: 'Writing & Opinion', labelKey: 'strip_sched_writing_opinion', icon: '✍️', theme: 'writing' },
        5: { cat: 'vocabulary', label: 'Vocabulary Expansion', labelKey: 'strip_sched_vocabulary_expansion', icon: '📖', theme: 'all' },
        6: { cat: 'speaking', label: 'Weekend Speaking Club', labelKey: 'strip_sched_weekend_speaking', icon: '🗣️', theme: 'speaking' }
    };

    function getDayOfYear() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
        return Math.floor(diff / 86400000);
    }

    function getTodayKey() {
        const d = new Date();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${d.getFullYear()}-${month}-${day}`;
    }

    function getYesterdayKey() {
        const d = new Date();
        d.setDate(d.getDate() - 1);
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${d.getFullYear()}-${month}-${day}`;
    }

    function getTodaySchedule() {
        const dayOfWeek = new Date().getDay();
        return DAILY_SCHEDULE[dayOfWeek] || DAILY_SCHEDULE[0];
    }

    function getUnifiedStreak() {
        const s1 = parseInt(localStorage.getItem('cosy-streak') || '0', 10);
        const s2 = parseInt(localStorage.getItem('practice_streak') || '0', 10);
        return Math.max(s1, s2, 0);
    }

    function getUnifiedPoints() {
        return parseInt(localStorage.getItem('cosy_total_points') || '0', 10);
    }

    function isPracticeDoneToday() {
        const todayStr = getTodayKey();
        const lastPractice = localStorage.getItem('cosy-last-practice');
        const dcLast = localStorage.getItem('dc_last_completed');
        return lastPractice === todayStr || dcLast === todayStr;
    }

    async function fetchCategoryData(lang, category) {
        const cacheKey = `cosy_daily_${lang}_${category}`;
        try {
            const cached = sessionStorage.getItem(cacheKey);
            if (cached) {
                return JSON.parse(cached);
            }
        } catch (e) {
            // Ignore sessionStorage access errors
        }

        const remoteCategory = category === 'fact' ? 'facts' : category;
        const bases = DAILY_SOURCES[remoteCategory] || [COSY_DATA_DAILY_BASE];

        for (const base of bases) {
            try {
                const res = await fetch(`${base}${lang}/${remoteCategory}.json`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    try {
                        sessionStorage.setItem(cacheKey, JSON.stringify(data));
                    } catch (e) {
                        // Ignore storage quota errors
                    }
                    return data;
                }
            } catch (err) {
                // Try the next location; the caller falls back to built-in prompts if none has data
            }
        }
        return null;
    }

    // The band guides ship in English inside this file; data/daily/<lang>/band-guide.json carries the same
    // structure per language, including the exams that actually certify *that* language. Anything missing
    // from a translation falls back to the English guide rather than leaving a gap in the panel.
    async function fetchBandGuide(lang) {
        const cacheKey = `cosy_band_guide_${lang}`;
        try {
            const cached = sessionStorage.getItem(cacheKey);
            if (cached) return JSON.parse(cached);
        } catch (e) {
            // Ignore sessionStorage access errors
        }

        try {
            const res = await fetch(`${COSY_HUB_DATA_BASE}${lang}/band-guide.json`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            if (!data || !data.bands) return null;
            try {
                sessionStorage.setItem(cacheKey, JSON.stringify(data));
            } catch (e) {
                // Ignore storage quota errors
            }
            return data;
        } catch (err) {
            return null;
        }
    }

    // ---- Dictionary-backed calendar (COSYdata/daily/<lang>/calendar/<slot>/YYYY-MM.json) ----
    const CALENDAR_LEVELS = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

    // Calendar levels to try for a strip level band, most wanted first. Bands that span two
    // levels alternate by day so both get exposure. Phrasal verbs start at A2, so A0-A1 maps to A2 for
    // them; words have A0 and A1 of their own.
    function calendarLevelPreference(selectedLevel, dayOfYear, slot) {
        const odd = dayOfYear % 2 === 1;
        const pair = (a, b) => (odd ? [b, a] : [a, b]);
        if (selectedLevel === 'b1-b2') return pair('B1', 'B2');
        if (selectedLevel === 'c1-c2') return pair('C1', 'C2');
        if (slot === 'word' || slot === 'verb' || slot === 'verb-prep') return selectedLevel === 'a2' ? ['A2'] : pair('A0', 'A1');
        return ['A2'];
    }

    // Choose one level's card from a calendar day; falls back to the nearest level the language has.
    function pickCalendarCard(day, selectedLevel, dayOfYear, slot) {
        if (!day || typeof day !== 'object') return null;
        const available = Object.keys(day).filter(l => day[l] && day[l].word);
        if (!available.length) return null;
        const prefs = calendarLevelPreference(selectedLevel, dayOfYear, slot);
        const hit = prefs.find(l => available.includes(l));
        if (hit) return { level: hit, card: day[hit] };
        const want = CALENDAR_LEVELS.indexOf(prefs[0]);
        available.sort((a, b) => Math.abs(CALENDAR_LEVELS.indexOf(a) - want) - Math.abs(CALENDAR_LEVELS.indexOf(b) - want));
        return { level: available[0], card: day[available[0]] };
    }

    // Returns the day object for dateKey, or null when the language/month has no calendar.
    // A missing calendar is remembered for the session so we do not re-request a 404.
    async function fetchCalendarDay(lang, slot, dateKey) {
        const month = dateKey.slice(0, 7);
        const cacheKey = `cosy_daily_cal_${lang}_${slot}_${month}`;
        let cal = null;
        try {
            const cached = sessionStorage.getItem(cacheKey);
            if (cached) cal = JSON.parse(cached);
        } catch (e) {
            // Ignore sessionStorage access/parse errors
        }
        if (!cal) {
            try {
                const res = await fetch(`${COSY_DATA_DAILY_BASE}${lang}/calendar/${slot}/${month}.json`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                cal = await res.json();
            } catch (err) {
                cal = { missing: true };
            }
            try {
                sessionStorage.setItem(cacheKey, JSON.stringify(cal));
            } catch (e) {
                // Ignore storage quota errors
            }
        }
        return (cal && cal.days && cal.days[dateKey]) || null;
    }

    function calendarCardToItem(pick, slot) {
        const c = pick.card;
        const item = {
            definition: c.definition,
            example: c.example,
            literal_meaning: c.literal_meaning,
            emoji: c.emoji,
            // verb cards come from cumulative pools, so show the verb's own level, not the pool it was drawn for
            level: (slot === 'verb' || slot === 'verb-prep') && c.level ? c.level : pick.level,
            fromCalendar: true,
            preposition: c.preposition,
            prepositions: c.prepositions,
            case: c.case,
            pattern: c.pattern,
            common_mistake: c.common_mistake,
            review: Boolean(c.review),
            slotLevel: c.slot_level || pick.level
        };
        if (slot === 'word') {
            // "la gare", "l'orage": no space after an elided article
            const article = c.article ? c.article + (/['’]$/.test(c.article) ? '' : ' ') : '';
            item.text = article + c.word;
            item.pos = c.pos;
            item.transcription = c.transcription;
        } else if (slot === 'verb' || slot === 'verb-prep') {
            const prep = slot === 'verb-prep' && c.preposition && c.preposition !== 'none' ? ` ${c.preposition}` : '';
            item.text = c.word + prep;
            item.transcription = c.transcription;
        } else {
            item.idiom = c.word;
            item.transcription = c.transcription;
            item.synonyms = c.synonyms;
        }
        return item;
    }


    // General-course writing cards carry an activity key; the chip shows a readable label for it.
    const WRITING_ACTIVITY_LABELS = {
        describe: '🎨 Describe',
        narrate: '📖 Tell a story',
        inform: '📰 Inform',
        persuade: '⚖️ Persuade',
        explain: '🔍 Explain',
        instruct: '🧭 Give instructions',
        summarise: '🗂️ Summarise',
        review: '⭐ Review',
        'personal-message': '✉️ Personal message',
        'formal-message': '📧 Formal message',
        'creative-writing': '✨ Creative writing',
        journal: '📔 Journal'
    };

    // General-course speaking cards carry an activity key; the chip shows a readable label for it.
    const ACTIVITY_LABELS = {
        brainstorm: '💡 Brainstorm',
        analyse: '🔍 Analyse',
        describe: '🎨 Describe',
        compare: '⚖️ Compare',
        discuss: '💬 Discuss',
        narrate: '📖 Tell a story',
        'role-play': '🎭 Role-play',
        'problem-solving': '🧩 Problem-solving',
        interview: '🎤 Interview',
        plan: '🗂️ Plan together',
        present: '📢 Present',
        identify: '🔎 Identify'
    };

    // The site-wide audience preference (js/core/audience.js) uses children/teens/adults/seniors; prompt cards
    // tag themselves young/teen/adult/senior. A container may also pin its own data-audience.
    const AUDIENCE_ALIASES = {
        children: 'young', child: 'young', young: 'young',
        teens: 'teen', teen: 'teen',
        adults: 'adult', adult: 'adult',
        seniors: 'senior', senior: 'senior'
    };

    function resolveAudience(container) {
        const own = (container.getAttribute('data-audience') || '').toLowerCase();
        if (AUDIENCE_ALIASES[own]) return AUDIENCE_ALIASES[own];
        try {
            const stored = (localStorage.getItem('cosy_audience_preference') || '').toLowerCase();
            if (AUDIENCE_ALIASES[stored]) return AUDIENCE_ALIASES[stored];
        } catch (e) { /* storage blocked */ }
        const root = (document.documentElement && document.documentElement.getAttribute('data-audience')) || '';
        return AUDIENCE_ALIASES[root.toLowerCase()] || '';
    }

    // "45s", "1 min 30s", "2 min" — speaking times are stored in seconds.
    function formatDuration(seconds) {
        const total = Math.max(0, Math.round(Number(seconds) || 0));
        if (total < 60) return `${total}s`;
        const minutes = Math.floor(total / 60);
        const rest = total % 60;
        return rest ? `${minutes} min ${rest}s` : `${minutes} min`;
    }

    // Offline last resort: one English prompt per CEFR band. The real prompts live in COSYpractice (data/daily),
    // so this is only used when every fetch fails.
    const BUILT_IN_PROMPTS = {
        speaking: {
            'a0-a1': [{ prompt: "Introduce yourself: say your name, where you are from, and what languages you are learning.", level: 'A0-A1' }],
            'a2': [{ prompt: "Describe your typical morning routine and what helps you wake up smoothly.", level: 'A2' }],
            'b1-b2': [{ prompt: "How has modern technology transformed how you stay in touch with friends and family?", level: 'B1-B2' }],
            'c1-c2': [{ prompt: "To what extent does speaking multiple languages alter an individual's worldview or cognitive perception?", level: 'C1-C2' }]
        },
        writing: {
            'a0-a1': [{ prompt: "Write 3-4 simple sentences about what you do every morning.", level: 'A0-A1' }],
            'a2': [{ prompt: "Write a short paragraph describing your ideal relaxing day from morning to evening.", level: 'A2' }],
            'b1-b2': [{ prompt: "Write a short reflective paragraph on a personal goal you set this year and your progress.", level: 'B1-B2' }],
            'c1-c2': [{ prompt: "Write a persuasive opinion piece on whether public transit should be free in major urban centers.", level: 'C1-C2' }]
        }
    };

    const BAND_ORDER = ['a0-a1', 'a2', 'b1-b2', 'c1-c2'];

    // Does a card's level fall inside the requested band?
    function levelInBand(itemLevel, band) {
        if (!itemLevel) return false;
        const lvl = itemLevel.toLowerCase();
        if (band === 'a0-a1') return lvl.includes('a0') || lvl.includes('a1');
        if (band === 'a2') return lvl.includes('a2') && !lvl.includes('b2');
        if (band === 'b1-b2') return lvl.includes('b1') || lvl.includes('b2');
        if (band === 'c1-c2') return lvl.includes('c1') || lvl.includes('c2');
        return false;
    }

    function pickItemForLevel(items, selectedLevel, dayIdx, audience, track) {
        if (!items || items.length === 0) return null;
        // data-track="general" asks for course material with no exam at all; "exam" keeps only exam tasks.
        // Without it every card in the band stays eligible.
        if (track === 'general' || track === 'exam') {
            const byTrack = items.filter((it) => (it && it.track === 'general' ? 'general' : 'exam') === track);
            if (byTrack.length > 0) items = byTrack;
        }
        const norm = (selectedLevel || 'a0-a1').toLowerCase();
        const start = Math.max(0, BAND_ORDER.indexOf(norm));

        // How well a card fits the requested audience:
        //   2  it names this audience
        //   1  it names no audience at all (older cards, neutral wording — safe for anyone)
        //   0  it names other audiences only
        const fit = (it) => {
            if (!audience) return 1;
            if (!Array.isArray(it.audience) || it.audience.length === 0) return 1;
            return it.audience.includes(audience) ? 2 : 0;
        };

        const distances = BAND_ORDER.map((b, i) => i)
            .sort((a, b) => Math.abs(a - start) - Math.abs(b - start) || a - b);
        const others = distances.filter((i) => i !== start);

        const poolAt = (i, minFit) => {
            const matching = items.filter((it) => levelInBand(it && it.level, BAND_ORDER[i])
                && fit(it) >= minFit);
            if (matching.length === 0) return null;
            // hand-curated prompts written for one band win over loosely tagged ones
            const curated = matching.filter((it) => it.curated);
            return curated.length > 0 ? curated : matching;
        };

        // Explicitly age-appropriate first, then neutral wording, then material for other ages as a last
        // resort. Age comes before level inside each tier on purpose: a young learner who picks C1-C2 is
        // better served a B1-B2 card about school than an adult-only card about compulsory voting, because a
        // level measures language, not maturity.
        const passes = [
            [start, 2], ...others.map((i) => [i, 2]),
            [start, 1], ...others.map((i) => [i, 1]),
            [start, 0], ...others.map((i) => [i, 0])
        ];
        for (const [i, minFit] of passes) {
            const pool = poolAt(i, minFit);
            if (pool) return pool[dayIdx % pool.length];
        }

        return items[dayIdx % items.length];
    }

    // Last-resort content when no data file could be fetched. Real content comes from the data files
    // (COSYpractice for prompts, the hub for facts, COSYdata for vocabulary), never from this function.
    function getLocalFallback(lang, category, selectedLevel, dayIdx) {
        const lvl = (selectedLevel || 'a0-a1').toLowerCase();
        if (category === 'fact') {
            return ['Learning a new language expands memory and cognitive flexibility.'];
        }
        const prompts = BUILT_IN_PROMPTS[category];
        return prompts ? (prompts[lvl] || prompts['a0-a1']) : [];
    }

    // Meta is assembled on every render, not once at parse time: the dictionary that
    // localizes its labels arrives after the data is fetched.
    function buildMeta(item) {
        if (!item || typeof item === 'string') return '';
        let meta = '';
        if (item.level) meta += `${t('strip_cefr', 'CEFR')} ${item.level.toUpperCase()}`;
        if (item.review) {
            if (meta) meta += ' • ';
            meta += item.slotLevel
                ? t('strip_review_for', 'Review for {level}').replace('{level}', item.slotLevel.toUpperCase())
                : t('strip_review', 'Review');
        }
        if (item.pos) {
            if (meta) meta += ' • ';
            meta += posLabel(item.pos);
        }
        if (item.transcription) {
            if (meta) meta += ' • ';
            meta += item.transcription;
        }
        if (item.preposition) {
            if (meta) meta += ' • ';
            const preps = Array.isArray(item.prepositions) && item.prepositions.length > 1
                ? item.prepositions
                : [item.preposition];
            meta += item.preposition === 'none'
                ? t('strip_no_preposition', 'No preposition (direct object)')
                : `+ ${preps.join(' / ')}`;
        }
        if (item.case) {
            if (meta) meta += ' • ';
            meta += `${t('strip_case', 'Case')}: ${item.case}`;
        }
        if (item.pattern) {
            if (meta) meta += ' • ';
            meta += `${t('strip_pattern', 'Pattern')}: ${item.pattern}`;
        }
        if (Array.isArray(item.synonyms) && item.synonyms.length) {
            if (meta) meta += ' • ';
            meta += `${t('strip_similar', 'Similar')}: ${item.synonyms.join(', ')}`;
        }
        if (item.literal_meaning) {
            if (meta) meta += ' • ';
            meta += `${t('strip_literally', 'Literally')}: "${item.literal_meaning}"`;
        }
        if (item.example) {
            if (meta) meta += ' • ';
            meta += `${t('strip_example', 'Example')}: "${item.example}"`;
        }
        if (item.common_mistake) {
            if (meta) meta += ' • ';
            meta += `${t('strip_common_mistake', 'Common mistake')}: ${item.common_mistake}`;
        }
        return meta;
    }

    // Parts of speech come from the data in English ("adverb"); show them in the UI language.
    function posLabel(value) {
        const key = 'pos_' + String(value).toLowerCase().replace(/\s+/g, '_');
        return t(key, value);
    }

    function parseDailyItem(item) {
        if (!item) return { text: t('strip_no_content', 'No content available today.'), translation: '', meta: '', raw: null };
        if (typeof item === 'string') return { text: item, translation: '', meta: '', raw: null };
        const text = item.prompt || item.fact || item.idiom || item.text || item.question || item.phrase || '';
        const translation = item.translation || item.real_meaning || item.meaning || item.explanation || item.ru || item.en || '';
        return {
            text,
            translation,
            definition: item.definition || item.real_meaning || '',
            emoji: item.emoji || '',
            fromCalendar: Boolean(item.fromCalendar),
            raw: item,
            meta: buildMeta(item),
            level: item.level || '',
            preposition: item.preposition || '',
            pattern: item.pattern || '',
            case: item.case || '',
            review: Boolean(item.review),
            slotLevel: item.slotLevel || '',
            // exam-style speaking scaffolding; all optional so older cached prompts still render
            track: item.track === 'general' ? 'general' : 'exam',
            exam: item.exam || '',
            part: item.part || '',
            task: item.task || '',
            activity: item.activity || '',
            audience: Array.isArray(item.audience) ? item.audience.filter(a => typeof a === 'string') : [],
            followUps: Array.isArray(item.follow_ups) ? item.follow_ups.filter(q => typeof q === 'string' && q.trim()) : [],
            prepSeconds: Number.isFinite(Number(item.prep_seconds)) && Number(item.prep_seconds) > 0 ? Number(item.prep_seconds) : 0,
            speakSeconds: Number.isFinite(Number(item.speak_seconds)) && Number(item.speak_seconds) > 0 ? Number(item.speak_seconds) : 0,
            // writing scaffolding; optional so legacy prompts keep rendering
            genre: item.genre || '',
            wordMin: Number.isFinite(Number(item.word_min)) && Number(item.word_min) > 0 ? Number(item.word_min) : 0,
            wordMax: Number.isFinite(Number(item.word_max)) && Number(item.word_max) > 0 ? Number(item.word_max) : 0,
            writeMinutes: Number.isFinite(Number(item.write_minutes)) && Number(item.write_minutes) > 0 ? Number(item.write_minutes) : 0,
            checklist: Array.isArray(item.checklist) ? item.checklist.filter(c => typeof c === 'string' && c.trim()) : []
        };
    }

    class DailyStripComponent {
        constructor(element) {
            this.container = element;
            this.lang = this.container.getAttribute('data-lang') || localStorage.getItem('cosy.pinnedLang') || 'en';
            // data-slots="word,phrasal-verb" chooses and orders the tabs; unknown names are ignored.
            const slots = (this.container.getAttribute('data-slots') || '').split(',').map(x => x.trim()).filter(id => TAB_REGISTRY[id]);
            this.tabs = slots.length ? slots.map(id => TAB_REGISTRY[id]) : TABS_CONFIG;
            this.rawTitle = this.container.getAttribute('data-title');
            // data-compact="true": no Practice challenge pill, streak or "done today" button (for non-Practice hosts)
            this.compact = this.container.getAttribute('data-compact') === 'true';
            // data-recall="true": vocabulary cards start with the answer hidden, so the learner recalls before revealing.
            this.recall = this.container.getAttribute('data-recall') === 'true';
            this.activeTab = this.tabs[0].id;
            this.selectedLevel = localStorage.getItem('cosy.dailyLevel') || 'a0-a1';
            this.audience = resolveAudience(this.container);
            // data-track="general" hides exam tasks; "exam" keeps only them. Unset means both.
            const trk = (this.container.getAttribute('data-track') || '').toLowerCase();
            this.track = ['general', 'exam'].includes(trk) ? trk : '';
            this.categoryData = {};
            this.bandGuide = null;
            this.uniqueId = 'ds_' + Math.random().toString(36).substring(2, 9);
            this.init();
        }

        async init() {
            this.renderShell();
            this.bindEvents();
            await this.loadBandGuide();
            await this.loadAllCategories();
            this.renderContent();
            this.updateStreakUI();
        }

        // Resolved per render: the constructor runs before the dictionary is loaded.
        get title() {
            return this.rawTitle || t('strip_title', 'Daily Practice Strip');
        }

        renderShell() {
            const currentStreak = getUnifiedStreak();
            const isDoneToday = isPracticeDoneToday();
            const todaySchedule = getTodaySchedule();
            const challengeUrl = `${COSY_PRACTICE_BASE}#daily-challenge`;

            this.container.classList.add('daily-strip-container');
            this.container.innerHTML = `
                <div class="daily-strip-header">
                    <div class="daily-strip-title-wrap">
                        <span class="daily-strip-title-icon">🌟</span>
                        <h2 class="daily-strip-title">${this.escapeHTML(this.title)}</h2>
                        <span class="daily-strip-lang-badge">${this.lang.toUpperCase()}</span>
                    </div>
                    ${this.compact ? '' : `<div class="daily-strip-header-actions">
                        <a href="${challengeUrl}" class="daily-strip-challenge-pill" title="${this.escapeHTML(t('strip_challenge_title', 'COSYpractice Daily Challenge: {topic}').replace('{topic}', this.scheduleLabel(todaySchedule)))}">
                            <span class="daily-strip-challenge-icon">${todaySchedule.icon}</span>
                            <span class="daily-strip-challenge-text">${this.escapeHTML(t('strip_today', 'Today:'))} <strong>${this.escapeHTML(this.scheduleLabel(todaySchedule))}</strong></span>
                        </a>
                        <div class="daily-strip-streak" title="${this.escapeHTML(t('strip_streak_title', 'Your current practice streak across COSYpractice and COSYlanguages'))}">
                            🔥 <span class="daily-strip-streak-count">${currentStreak}</span> ${this.escapeHTML(t('strip_streak_days', 'day streak'))}
                        </div>
                        <button type="button" class="daily-strip-done-btn ${isDoneToday ? 'completed' : ''}" aria-label="${this.escapeHTML(t('strip_mark_done_aria', 'Mark daily practice done'))}">
                            ${isDoneToday ? this.escapeHTML(t('strip_done_today', '✓ Done today')) : this.escapeHTML(t('strip_mark_done', 'Mark done today'))}
                        </button>
                    </div>`}
                </div>

                <div class="daily-strip-tabs" role="tablist" aria-label="${this.escapeHTML(t('strip_tabs_aria', 'Daily Dose Categories'))}">
                    ${this.tabs.map((tab) => `
                        <button type="button"
                                class="daily-strip-tab"
                                id="${this.uniqueId}_tab_${tab.id}"
                                role="tab"
                                aria-selected="${tab.id === this.activeTab ? 'true' : 'false'}"
                                aria-controls="${this.uniqueId}_panel_${tab.id}"
                                tabindex="${tab.id === this.activeTab ? '0' : '-1'}"
                                data-tab="${tab.id}">
                            <span>${tab.icon}</span> ${this.escapeHTML(this.tabLabel(tab))}
                        </button>
                    `).join('')}
                </div>

                <div class="daily-strip-panels">
                    ${this.tabs.map((tab) => `
                        <div id="${this.uniqueId}_panel_${tab.id}"
                             class="daily-strip-panel"
                             role="tabpanel"
                             aria-labelledby="${this.uniqueId}_tab_${tab.id}"
                             ${tab.id !== this.activeTab ? 'hidden' : ''}>
                            <div class="daily-strip-content-main">
                                <p class="daily-strip-prompt">Loading daily content...</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                ${this.container.getAttribute('data-directory') === 'true' ? '<div class="daily-strip-directory" data-daily-directory data-compact="true" data-self="languages"></div>' : ''}
            `;
            this.mountDirectory();
        }

        // data-directory="true" adds one line of links to the other COSYlanguages daily surfaces under the tabs.
        // If daily-directory.js has not run yet it renders the slot itself when it loads.
        mountDirectory() {
            const slot = this.container.querySelector && this.container.querySelector('[data-daily-directory]');
            const dir = typeof window !== 'undefined' && window.COSY_DailyDirectory;
            if (slot && dir && typeof dir.renderCompact === 'function') {
                // The directory's headings follow the interface language, not the
                // language the prompts are practising, so its slot stays unpinned.
                dir.renderCompact(slot);
            }
        }

        bindEvents() {
            this.bindDomEvents();

            // Listen for cross-component storage or streak updates
            const onStreakUpdated = () => this.updateStreakUI();
            window.addEventListener('cosyStreakUpdated', onStreakUpdated);
            window.addEventListener('storage', (e) => {
                if (e.key === 'cosy-streak' || e.key === 'practice_streak' || e.key === 'cosy-last-practice' || e.key === 'dc_last_completed') {
                    this.updateStreakUI();
                }
            });

            // The i18n engine announces a switch as cosyLanguageChanged; cosy:langchange is
            // the older name other pages still fire. Either one relabels the chrome in place.
            const onLanguageChanged = async (e) => {
                if (this.container.getAttribute('data-lang')) return;
                const newLang = (e.detail && e.detail.lang) || localStorage.getItem('cosy.pinnedLang') || 'en';
                if (newLang === this.lang) {
                    this.renderShell();
                    this.bindDomEvents();
                    this.renderContent();
                    this.updateStreakUI();
                    return;
                }
                this.lang = newLang;
                this.renderShell();
                this.bindDomEvents();
                await this.reloadForLang();
                this.updateStreakUI();
            };
            document.addEventListener('cosyLanguageChanged', onLanguageChanged);
            window.addEventListener('cosy:langchange', onLanguageChanged);

            // The dictionary arrives after this file runs, so a strip rendered on
            // DOMContentLoaded would keep the English literals. Repaint once it lands.
            document.addEventListener('cosyI18nReady', () => {
                this.renderShell();
                this.bindDomEvents();
                this.renderContent();
                this.updateStreakUI();
            }, { once: true });
        }

        bindDomEvents() {
            // Tab click & keyboard events
            const tabsList = this.container.querySelector('.daily-strip-tabs');
            tabsList.addEventListener('click', (e) => {
                const btn = e.target.closest('.daily-strip-tab');
                if (btn) {
                    this.switchTab(btn.getAttribute('data-tab'));
                }
            });

            tabsList.addEventListener('keydown', (e) => {
                const tabs = Array.from(tabsList.querySelectorAll('.daily-strip-tab'));
                const currentIndex = tabs.findIndex(t => t.getAttribute('data-tab') === this.activeTab);
                let targetIndex = -1;

                if (e.key === 'ArrowRight') {
                    targetIndex = (currentIndex + 1) % tabs.length;
                } else if (e.key === 'ArrowLeft') {
                    targetIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                } else if (e.key === 'Home') {
                    targetIndex = 0;
                } else if (e.key === 'End') {
                    targetIndex = tabs.length - 1;
                }

                if (targetIndex !== -1) {
                    e.preventDefault();
                    const targetTab = tabs[targetIndex];
                    this.switchTab(targetTab.getAttribute('data-tab'));
                    targetTab.focus();
                }
            });

            // "Mark done today" button
            const doneBtn = this.container.querySelector('.daily-strip-done-btn');
            if (doneBtn) {
                doneBtn.addEventListener('click', () => {
                    this.handleMarkDone();
                });
            }

        }

        switchTab(tabId) {
            if (this.activeTab === tabId) return;
            this.activeTab = tabId;

            this.tabs.forEach(tab => {
                const tabBtn = this.container.querySelector(`#${this.uniqueId}_tab_${tab.id}`);
                const panel = this.container.querySelector(`#${this.uniqueId}_panel_${tab.id}`);
                const isActive = tab.id === tabId;

                if (tabBtn) {
                    tabBtn.setAttribute('aria-selected', isActive ? 'true' : 'false');
                    tabBtn.setAttribute('tabindex', isActive ? '0' : '-1');
                }
                if (panel) {
                    if (isActive) {
                        panel.removeAttribute('hidden');
                    } else {
                        panel.setAttribute('hidden', '');
                    }
                }
            });
        }

        async loadBandGuide() {
            this.bandGuide = await fetchBandGuide(this.lang);
        }

        // Tab and schedule labels are resolved at render time, not at module load: the
        // i18n engine fills the dictionary asynchronously, after this file is parsed.
        tabLabel(tab) {
            return tab.labelKey ? t(tab.labelKey, tab.label) : tab.label;
        }

        scheduleLabel(schedule) {
            return schedule.labelKey ? t(schedule.labelKey, schedule.label) : schedule.label;
        }

        activityLabel(map, prefix, key) {
            return t(prefix + key, map[key] || key);
        }

        // Panel chrome (Level:, Prep, Speak, words, Follow-up questions, ...) follows the
        // interface language. The band guide's chrome is written in the language being
        // practised, so it is only a fallback for hosts that embed the strip with no UI
        // dictionary of their own.
        chrome() {
            const c = (this.bandGuide && this.bandGuide.chrome) || {};
            const ui = key => t(key, '');
            return {
                level: ui('strip_level') || c.level || 'Level:',
                speak: ui('strip_speak') || c.speak || 'Speak', words: ui('strip_words') || c.words || 'words',
                followUps: ui('strip_follow_ups') || c.followUps || 'Follow-up questions'
            };
        }

        async loadAllCategories() {
            const dayIdx = getDayOfYear();
            for (const config of this.tabs) {
                if (config.calendar) {
                    // Dictionary-backed slot (word, verb, phrasal verb); falls through to the legacy lists when absent.
                    const day = await fetchCalendarDay(this.lang, config.calendar, getTodayKey());
                    const pick = pickCalendarCard(day, this.selectedLevel, dayIdx, config.calendar);
                    if (pick) {
                        this.categoryData[config.id] = parseDailyItem(calendarCardToItem(pick, config.calendar));
                        continue;
                    }
                    if (config.id === 'word') {
                        // the word tab has no legacy list to fall back on
                        this.categoryData[config.id] = parseDailyItem(null);
                        continue;
                    }
                }

                // Data files first (COSYpractice prompts, hub facts, COSYdata vocabulary), built-in last resort after
                const isPrompt = config.id === 'speaking' || config.id === 'writing';
                const pickFrom = (list) => (isPrompt
                    ? pickItemForLevel(list, this.selectedLevel, dayIdx, this.audience, this.track)
                    : list[dayIdx % list.length]);
                let rawItem = null;
                const remoteList = await fetchCategoryData(this.lang, config.id);
                if (remoteList && remoteList.length > 0) rawItem = pickFrom(remoteList);
                if (!rawItem) {
                    const list = getLocalFallback(this.lang, config.id, this.selectedLevel, dayIdx);
                    if (list && list.length > 0) rawItem = pickFrom(list);
                }
                this.categoryData[config.id] = parseDailyItem(rawItem);
            }
        }

        renderContent() {
            this.tabs.forEach(tab => {
                const panel = this.container.querySelector(`#${this.uniqueId}_panel_${tab.id}`);
                if (!panel) return;

                const item = this.categoryData[tab.id] || { text: t('strip_content_unavailable', 'Content unavailable.'), translation: '', meta: '' };
                const chrome = this.chrome();
                const hasTranslation = Boolean(item.translation);
                // Published word levels can be narrower than the selected band; say so instead of silently
                // showing an A2 word as if it were C1 material. Review cards already carry their own label.
                const levelNote = item.fromCalendar && item.level && !item.review && !levelInBand(item.level, this.selectedLevel)
                    ? t('strip_nearest_level', 'Nearest available level: {level}').replace('{level}', item.level)
                    : '';
                const meta = [item.raw ? buildMeta(item.raw) : item.meta, levelNote].filter(Boolean).join(' • ');
                // Only the COSYtools tabs carry a footer link now; the generic "Practice in Hub" deep link is gone.
                const toolsUrl = tab.toolsLabel ? `${COSY_TOOLS_DAILY_URL}?lang=${encodeURIComponent(this.lang)}` : '';

                const showLevelBar = (tab.id === 'speaking' || tab.id === 'writing' || item.fromCalendar);
                const levelBarHTML = showLevelBar ? `
                    <div class="daily-strip-level-bar" role="group" aria-label="${this.escapeHTML(t('strip_level_filter', 'CEFR Level Filter'))}">
                        <span class="daily-strip-level-label">${this.escapeHTML(chrome.level)}</span>
                        <button type="button" class="daily-strip-level-btn ${this.selectedLevel === 'a0-a1' ? 'active' : ''}" data-level="a0-a1">A0-A1</button>
                        <button type="button" class="daily-strip-level-btn ${this.selectedLevel === 'a2' ? 'active' : ''}" data-level="a2">A2</button>
                        <button type="button" class="daily-strip-level-btn ${this.selectedLevel === 'b1-b2' ? 'active' : ''}" data-level="b1-b2">B1-B2</button>
                        <button type="button" class="daily-strip-level-btn ${this.selectedLevel === 'c1-c2' ? 'active' : ''}" data-level="c1-c2">C1-C2</button>
                    </div>
                ` : '';

                // Writing keeps the word target and the time limit; speaking keeps the speaking
                // timer. The prompt carries the task, so exam, part, task and genre are not chips.
                const chips = [];
                const isSpeaking = tab.id === 'speaking';
                const isWriting = tab.id === 'writing';
                // A0-A1 writing drops the time limit and the self-check list.
                const isBeginnerWriting = isWriting && levelInBand(item.level, 'a0-a1');
                // General-course cards practise the skill for its own sake: show the activity instead of an exam.
                if (isSpeaking && !item.exam && item.activity) chips.push(`<span class="daily-strip-chip daily-strip-chip-activity">${this.escapeHTML(this.activityLabel(ACTIVITY_LABELS, 'strip_activity_', item.activity))}</span>`);
                if (isWriting && !item.exam && item.activity) chips.push(`<span class="daily-strip-chip daily-strip-chip-activity">${this.escapeHTML(this.activityLabel(WRITING_ACTIVITY_LABELS, 'strip_writing_activity_', item.activity))}</span>`);
                if (isSpeaking && item.speakSeconds) chips.push(`<span class="daily-strip-chip">🗣️ ${this.escapeHTML(chrome.speak)} ${this.escapeHTML(formatDuration(item.speakSeconds))}</span>`);
                if (isWriting && (item.wordMin || item.wordMax)) {
                    const target = item.wordMin && item.wordMax
                        ? `${item.wordMin}-${item.wordMax} ${chrome.words}`
                        : `${item.wordMin || item.wordMax}+ ${chrome.words}`;
                    chips.push(`<span class="daily-strip-chip">📝 ${this.escapeHTML(target)}</span>`);
                }
                if (isWriting && item.writeMinutes && !isBeginnerWriting) chips.push(`<span class="daily-strip-chip">⏱️ ${this.escapeHTML(item.writeMinutes)} min</span>`);
                const chipsHTML = chips.length ? `<div class="daily-strip-chips">${chips.join('')}</div>` : '';

                // Both prompt tabs can carry follow-ups: speaking answers them aloud, writing uses them to extend the draft.
                const followUpsHTML = (isSpeaking || isWriting) && item.followUps.length ? `
                    <div class="daily-strip-followups">
                        <span class="daily-strip-followups-label">${this.escapeHTML(chrome.followUps)}</span>
                        <ul class="daily-strip-followups-list">
                            ${item.followUps.map(q => `<li>${this.escapeHTML(q)}</li>`).join('')}
                        </ul>
                    </div>
                ` : '';

                const isVocab = Boolean(tab.calendar);
                const answerId = `${this.uniqueId}_answer_${tab.id}`;
                const translationButtonHTML = hasTranslation ? `
                    <button type="button" class="daily-strip-toggle-translation-btn" data-target="${this.uniqueId}_trans_${tab.id}">
                        🌐 ${this.escapeHTML(t('strip_show_translation', 'Show Translation'))}
                    </button>
                ` : '';
                const answerHTML = `
                    ${item.definition ? `<div class="daily-strip-definition">${this.escapeHTML(item.definition)}</div>` : ''}
                    ${hasTranslation ? `<div class="daily-strip-translation" id="${this.uniqueId}_trans_${tab.id}" hidden>${this.escapeHTML(item.translation)}</div>` : ''}
                    ${meta ? `<div class="daily-strip-meta">${this.escapeHTML(meta)}</div>` : ''}
                    ${isVocab ? translationButtonHTML : ''}
                `;
                const answerBlockHTML = isVocab
                    ? `<div class="daily-strip-answer" id="${answerId}"${this.recall ? ' hidden' : ''}>${answerHTML}</div>`
                    : answerHTML;
                const revealHTML = isVocab
                    ? `<button type="button" class="daily-strip-reveal-btn" data-target="${answerId}" aria-expanded="${this.recall ? 'false' : 'true'}" aria-label="${this.escapeHTML(this.recall ? t('strip_show_answer', 'Show answer') : t('strip_hide_answer', 'Hide answer'))}" title="${this.escapeHTML(this.recall ? t('strip_show_answer', 'Show answer') : t('strip_hide_answer', 'Hide answer'))}">${this.recall ? `👁️ ${this.escapeHTML(t('strip_show_answer', 'Show answer'))}` : `🙈 ${this.escapeHTML(t('strip_hide_answer', 'Hide answer'))}`}</button>`
                    : '';

                panel.innerHTML = `
                    ${levelBarHTML}
                    ${chipsHTML}
                    <div class="daily-strip-content-main">
                        <p class="daily-strip-prompt">${item.emoji ? `<span class="daily-strip-emoji" aria-hidden="true">${this.escapeHTML(item.emoji)}</span> ` : ''}${this.escapeHTML(item.text)}</p>
                        ${revealHTML}
                        ${answerBlockHTML}
                        ${followUpsHTML}
                    </div>
                    <div class="daily-strip-footer">
                        <div class="daily-strip-actions-left">
                            ${hasTranslation && !isVocab ? translationButtonHTML : ''}
                        </div>
                        ${toolsUrl ? `
                        <div class="daily-strip-actions-right">
                            <a href="${toolsUrl}" class="daily-strip-practice-link" title="Open today's verb in the COSYtools Daily page">
                                ${this.escapeHTML(t(tab.toolsKey, tab.toolsLabel))} <span class="daily-strip-ext-icon">↗</span>
                            </a>
                        </div>
                        ` : ''}
                    </div>
                `;

                // Bind level buttons
                if (showLevelBar) {
                    panel.querySelectorAll('.daily-strip-level-btn').forEach(btn => {
                        btn.addEventListener('click', async (e) => {
                            const newLevel = e.target.getAttribute('data-level');
                            if (newLevel && newLevel !== this.selectedLevel) {
                                this.selectedLevel = newLevel;
                                try {
                                    localStorage.setItem('cosy.dailyLevel', newLevel);
                                } catch (err) {}
                                await this.loadAllCategories();
                                this.renderContent();
                            }
                        });
                    });
                }

                // Bind translation toggle button
                const transBtn = panel.querySelector('.daily-strip-toggle-translation-btn');
                if (transBtn) {
                    transBtn.addEventListener('click', () => {
                        const transDiv = panel.querySelector(`#${this.uniqueId}_trans_${tab.id}`);
                        if (transDiv) {
                            const isHidden = transDiv.hasAttribute('hidden');
                            if (isHidden) {
                                transDiv.removeAttribute('hidden');
                                transBtn.textContent = `🌐 ${t('strip_hide_translation', 'Hide Translation')}`;
                            } else {
                                transDiv.setAttribute('hidden', '');
                                transBtn.textContent = `🌐 ${t('strip_show_translation', 'Show Translation')}`;
                            }
                        }
                    });
                }

                // Recall mode: reveal the meaning only after the learner has tried to retrieve it.
                const revealBtn = panel.querySelector('.daily-strip-reveal-btn');
                if (revealBtn) {
                    revealBtn.addEventListener('click', () => {
                        const answer = panel.querySelector(`#${answerId}`);
                        if (!answer) return;
                        const hidden = answer.hasAttribute('hidden');
                        if (hidden) {
                            answer.removeAttribute('hidden');
                            revealBtn.textContent = `🙈 ${t('strip_hide_answer', 'Hide answer')}`;
                            revealBtn.setAttribute('aria-expanded', 'true');
                            revealBtn.setAttribute('aria-label', t('strip_hide_answer', 'Hide answer'));
                            revealBtn.setAttribute('title', t('strip_hide_answer', 'Hide answer'));
                        } else {
                            answer.setAttribute('hidden', '');
                            revealBtn.textContent = `👁️ ${t('strip_show_answer', 'Show answer')}`;
                            revealBtn.setAttribute('aria-expanded', 'false');
                            revealBtn.setAttribute('aria-label', t('strip_show_answer', 'Show answer'));
                            revealBtn.setAttribute('title', t('strip_show_answer', 'Show answer'));
                        }
                    });
                }
            });
        }

        handleMarkDone() {
            const todayStr = getTodayKey();
            const yesterdayStr = getYesterdayKey();
            const lastPractice = localStorage.getItem('cosy-last-practice') || localStorage.getItem('dc_last_completed');
            let streak = getUnifiedStreak();

            if (lastPractice !== todayStr) {
                if (lastPractice === yesterdayStr) {
                    streak += 1;
                } else {
                    streak = 1;
                }

                // Synchronize streak across COSYlanguages and COSYpractice keys
                localStorage.setItem('cosy-streak', String(streak));
                localStorage.setItem('practice_streak', String(streak));
                localStorage.setItem('cosy-last-practice', todayStr);

                // Dispatch unified events
                const detail = { streak, lastCompleted: todayStr };
                document.dispatchEvent(new CustomEvent('cosyStreakUpdated', { detail }));
            }

            this.updateStreakUI();
        }

        updateStreakUI() {
            const currentStreak = getUnifiedStreak();
            const isDoneToday = isPracticeDoneToday();

            const streakCountEl = this.container.querySelector('.daily-strip-streak-count');
            if (streakCountEl) streakCountEl.textContent = currentStreak;

            const doneBtn = this.container.querySelector('.daily-strip-done-btn');
            if (doneBtn) {
                if (isDoneToday) {
                    doneBtn.classList.add('completed');
                    doneBtn.textContent = t('strip_done_today', '✓ Done today');
                } else {
                    doneBtn.classList.remove('completed');
                    doneBtn.textContent = t('strip_mark_done', 'Mark done today');
                }
            }

            const challengePill = this.container.querySelector('.daily-strip-challenge-pill');
            if (challengePill) {
                const todaySchedule = getTodaySchedule();
                const dcLast = localStorage.getItem('dc_last_completed');
                const todayStr = getTodayKey();
                if (dcLast === todayStr) {
                    challengePill.classList.add('completed');
                    challengePill.innerHTML = `
                        <span class="daily-strip-challenge-icon">✓</span>
                        <span class="daily-strip-challenge-text">${this.escapeHTML(t('strip_today', 'Today:'))} <strong>${this.escapeHTML(this.scheduleLabel(todaySchedule))}</strong> ${this.escapeHTML(t('strip_completed', 'completed'))}</span>
                    `;
                }
            }
        }

        // Public: switch the strip's language (used by hosts that offer their own language picker).
        setLang(code) {
            if (!code || code === this.lang) return Promise.resolve();
            this.lang = code;
            this.container.setAttribute('data-lang', code);
            return this.reloadForLang();
        }

        async reloadForLang() {
            const langBadge = this.container.querySelector('.daily-strip-lang-badge');
            if (langBadge) langBadge.textContent = this.lang.toUpperCase();
            this.mountDirectory();
            await this.loadBandGuide();
            await this.loadAllCategories();
            this.renderContent();
        }

        escapeHTML(str) {
            if (!str) return '';
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');
        }
    }

    function initAllDailyStrips() {
        document.querySelectorAll('[data-daily-strip]').forEach(el => {
            if (!el.__dailyStripInstance) {
                el.__dailyStripInstance = new DailyStripComponent(el);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllDailyStrips);
    } else {
        initAllDailyStrips();
    }

    // Expose helpers & component for modular testing and programmatic usage
    window.COSY_DailyStrip = DailyStripComponent;
    window.COSY_DailyStrip_Helpers = {
        getUnifiedStreak,
        getUnifiedPoints,
        isPracticeDoneToday,
        getTodaySchedule,
        getTodayKey,
        getYesterdayKey,
        calendarLevelPreference,
        pickCalendarCard,
        fetchCategoryData,
        fetchBandGuide,
        DAILY_SOURCES,
        fetchCalendarDay,
        calendarCardToItem,
        parseDailyItem,
        pickItemForLevel,
        getLocalFallback,
        formatDuration,
        DAILY_SCHEDULE
    };
})();
