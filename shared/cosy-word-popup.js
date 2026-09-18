/**
 * shared/cosy-word-popup.js
 *
 * Click-to-define word popup + personal dictionary, for use across every
 * COSYlanguages ecosystem repo (COSYlanguages, COSYmanuals, COSYgames,
 * COSYtools). Framework-agnostic ES module, no build step, no dependencies.
 *
 * This module does NOT know how to fetch COSYdata itself — that stays the
 * job of shared/vocab-resolver.js (resolveVocab / theme-file fetching).
 * Instead this module takes two small callbacks so it can be tested and
 * demoed without a network:
 *
 *   matchWord(surface, lang)   -> { id, field } | null   (cheap, sync or async;
 *                                  backed by flat-index.json in production)
 *   resolveEntry(id)           -> Promise<entryObject | null>
 *                                  (backed by resolveVocab() in production)
 *
 * ------------------------------------------------------------------
 * USAGE IN A CONSUMER REPO
 * ------------------------------------------------------------------
 *   <script type="module">
 *     import { hydrate } from 'https://cosylanguages.github.io/COSYdata/shared/cosy-word-popup.js';
 *     import { resolveVocab } from 'https://cosylanguages.github.io/COSYdata/shared/vocab-resolver.js';
 *
 *     const flatIndex = await fetch('https://cosylanguages.github.io/COSYdata/vocabulary/en/flat-index.json')
 *       .then(r => r.json());
 *
 *     hydrate(document.querySelector('#lesson-content'), {
 *       lang: 'en',
 *       matchWord: (surface) => {
 *         const hits = flatIndex[surface.toLowerCase()];
 *         return hits ? hits[0] : null; // naive disambiguation: first hit
 *       },
 *       resolveEntry: (id) => resolveVocab(id),
 *     });
 *   </script>
 *
 * Any element already carrying `data-vocab` (the existing pre-tagged
 * convention) is left untouched by auto-detection — hydrateVocabElements()
 * from vocab-resolver.js still owns those.
 */

const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'BUTTON', 'CODE', 'PRE']);
const WORD_RE = /[\p{L}\p{M}][\p{L}\p{M}'-]*/gu;

// ---------------------------------------------------------------------------
// 1. Personal dictionary (per-browser, shared across every repo on the same
//    GitHub Pages org domain, since localStorage is scoped by origin, not
//    by path — https://cosylanguages.github.io/COSYgames/ and
//    https://cosylanguages.github.io/COSYmanuals/ already share storage).
// ---------------------------------------------------------------------------

const DICT_EVENT = 'cosy-dictionary:change';

export function createCosyDictionary(namespace = 'cosydata:my-dictionary') {
  function readAll() {
    try {
      const raw = localStorage.getItem(namespace);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function writeAll(list) {
    try {
      localStorage.setItem(namespace, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent(DICT_EVENT, { detail: { namespace, list } }));
      return true;
    } catch {
      return false; // storage disabled / quota exceeded — fail closed, don't throw
    }
  }

  return {
    list() {
      return readAll();
    },
    has(id) {
      return readAll().some((e) => e.id === id);
    },
    /** item: { id, word, emoji, language, note? } — id may be null for a
     *  fully custom word the learner typed in themselves. */
    add(item) {
      const list = readAll();
      const key = item.id ?? `custom:${item.word}`;
      if (list.some((e) => (e.id ?? `custom:${e.word}`) === key)) return list;
      list.push({ ...item, addedAt: new Date().toISOString() });
      writeAll(list);
      return list;
    },
    remove(id) {
      const list = readAll().filter((e) => (e.id ?? `custom:${e.word}`) !== id);
      writeAll(list);
      return list;
    },
    exportJson() {
      return JSON.stringify(readAll(), null, 2);
    },
    importJson(json, { merge = true } = {}) {
      let incoming;
      try {
        incoming = JSON.parse(json);
      } catch {
        return false;
      }
      if (!Array.isArray(incoming)) return false;
      const current = merge ? readAll() : [];
      const seen = new Set(current.map((e) => e.id ?? `custom:${e.word}`));
      for (const item of incoming) {
        const key = item.id ?? `custom:${item.word}`;
        if (!seen.has(key)) {
          current.push(item);
          seen.add(key);
        }
      }
      writeAll(current);
      return true;
    },
    onChange(callback) {
      const handler = (e) => callback(e.detail.list);
      window.addEventListener(DICT_EVENT, handler);
      return () => window.removeEventListener(DICT_EVENT, handler);
    },
  };
}

// ---------------------------------------------------------------------------
// 2. Auto-detection: wrap known surface forms in clickable buttons.
// ---------------------------------------------------------------------------

function shouldSkip(node) {
  let el = node.parentElement;
  while (el) {
    if (SKIP_TAGS.has(el.tagName)) return true;
    if (el.hasAttribute('data-vocab') || el.hasAttribute('data-cosy-skip')) return true;
    if (el.classList?.contains('cosy-word')) return true;
    el = el.parentElement;
  }
  return false;
}

function wrapTextNode(textNode, matchWord, lang) {
  const text = textNode.nodeValue;
  const matches = [...text.matchAll(WORD_RE)];
  if (matches.length === 0) return;

  const hits = matches
    .map((m) => ({ m, hit: matchWord(m[0], lang) }))
    .filter((x) => x.hit);
  if (hits.length === 0) return;

  const frag = document.createDocumentFragment();
  let cursor = 0;
  for (const { m, hit } of hits) {
    const start = m.index;
    const end = start + m[0].length;
    if (start > cursor) frag.appendChild(document.createTextNode(text.slice(cursor, start)));

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cosy-word';
    btn.dataset.cosyId = hit.id;
    btn.dataset.cosyField = hit.field;
    btn.dataset.cosyLang = lang;
    btn.textContent = text.slice(start, end);
    frag.appendChild(btn);

    cursor = end;
  }
  if (cursor < text.length) frag.appendChild(document.createTextNode(text.slice(cursor)));
  textNode.parentNode.replaceChild(frag, textNode);
}

/**
 * Scans `root` for text and wraps every surface form that `matchWord`
 * recognizes. Idempotent-ish: elements it has already wrapped carry the
 * `cosy-word` class and are skipped on re-runs.
 */
export function autoDetect(root, { lang, matchWord }) {
  if (!root || typeof matchWord !== 'function') return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      if (shouldSkip(node)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const targets = [];
  let n;
  while ((n = walker.nextNode())) targets.push(n);
  // Collect first, then mutate — TreeWalker + live DOM edits don't mix.
  targets.forEach((node) => wrapTextNode(node, matchWord, lang));
}

// ---------------------------------------------------------------------------
// 3. The popup card itself + click delegation.
// ---------------------------------------------------------------------------

let activePopup = null;
let speaking = false;

function closePopup() {
  activePopup?.remove();
  activePopup = null;
}

function speak(word, lang) {
  if (!('speechSynthesis' in window) || speaking) return;
  const utter = new SpeechSynthesisUtterance(word);
  utter.lang = lang || 'en';
  speaking = true;
  utter.onend = utter.onerror = () => (speaking = false);
  speechSynthesis.speak(utter);
}

function renderPopup(anchorEl, entry, { dictionary, onSuggestUrl }) {
  closePopup();

  const card = document.createElement('div');
  card.className = 'cosy-popup-card';
  card.setAttribute('role', 'dialog');
  card.setAttribute('aria-modal', 'false');

  const inDictionary = entry.id ? dictionary.has(entry.id) : false;

  const chips = (label, arr) =>
    arr?.length
      ? `<div class="cosy-chip-row"><span class="cosy-chip-label">${label}</span>${arr
          .map((s) => `<span class="cosy-chip">${escapeHtml(s)}</span>`)
          .join('')}</div>`
      : '';

  card.innerHTML = `
    <button type="button" class="cosy-close" aria-label="Close">×</button>
    <div class="cosy-head">
      <span class="cosy-emoji">${entry.emoji ?? '🔎'}</span>
      <span class="cosy-word-title">${escapeHtml(entry.word ?? '')}</span>
      ${entry.level ? `<span class="cosy-level">${escapeHtml(entry.level)}</span>` : ''}
    </div>
    ${entry.transcription ? `<div class="cosy-transcription">${escapeHtml(entry.transcription)}</div>` : ''}
    ${entry.definitions?.[0] ? `<p class="cosy-def">${escapeHtml(entry.definitions[0])}</p>` : ''}
    ${entry.examples?.[0] ? `<p class="cosy-example">“${escapeHtml(entry.examples[0])}”</p>` : ''}
    ${chips('Synonyms', entry.synonyms)}
    ${chips('Antonyms', entry.antonyms)}
    <div class="cosy-actions">
      <button type="button" class="cosy-btn cosy-btn-audio" aria-label="Hear pronunciation">🔊 Listen</button>
      <button type="button" class="cosy-btn cosy-btn-save">${inDictionary ? '✓ Saved' : '+ Save word'}</button>
    </div>
    ${entry._notFound ? `<a class="cosy-suggest" href="${onSuggestUrl(entry)}" target="_blank" rel="noopener">Suggest this word for COSYdata →</a>` : ''}
  `;

  document.body.appendChild(card);
  positionNear(card, anchorEl);

  card.querySelector('.cosy-close').addEventListener('click', closePopup);
  card.querySelector('.cosy-btn-audio').addEventListener('click', () => speak(entry.word, entry.language));
  const saveBtn = card.querySelector('.cosy-btn-save');
  saveBtn.addEventListener('click', () => {
    if (!entry.id) return;
    if (dictionary.has(entry.id)) {
      dictionary.remove(entry.id);
      saveBtn.textContent = '+ Save word';
    } else {
      dictionary.add({ id: entry.id, word: entry.word, emoji: entry.emoji, language: entry.language });
      saveBtn.textContent = '✓ Saved';
    }
  });

  activePopup = card;
}

function positionNear(card, anchorEl) {
  const rect = anchorEl.getBoundingClientRect();
  const cardWidth = 300; // matches CSS min/max-width below
  let left = rect.left + window.scrollX;
  let top = rect.bottom + window.scrollY + 8;

  if (left + cardWidth > window.scrollX + window.innerWidth - 12) {
    left = window.scrollX + window.innerWidth - cardWidth - 12;
  }
  if (window.innerWidth < 480) {
    // Mobile: dock to the bottom of the viewport instead of floating.
    card.classList.add('cosy-popup-sheet');
    return;
  }
  card.style.left = `${Math.max(12, left)}px`;
  card.style.top = `${top}px`;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/**
 * Attaches one delegated click listener to `root` that opens the popup
 * for any `.cosy-word` (auto-detected) or `[data-vocab]` (pre-tagged,
 * once vocab-resolver.js has hydrated it) element clicked inside it.
 *
 * options:
 *   resolveEntry(id)   -> Promise<entry|null>   required
 *   dictionary          -> object from createCosyDictionary()  required
 *   onSuggestUrl(entry) -> string   builds a "suggest this word" GitHub
 *                          issue URL; defaults to a generic new-issue link
 */
export function attachPopupHandler(root, { resolveEntry, dictionary, onSuggestUrl } = {}) {
  const suggestUrl =
    onSuggestUrl ??
    ((entry) =>
      `https://github.com/cosylanguages/COSYdata/issues/new?title=${encodeURIComponent(
        `Add word: ${entry.word ?? ''}`
      )}`);

  root.addEventListener('click', async (e) => {
    const target = e.target.closest('.cosy-word, [data-vocab][data-cosy-id], [data-vocab]');
    if (!target) return;
    const id = target.dataset.cosyId ?? target.getAttribute('data-vocab');
    if (!id) return;

    const entry = (await resolveEntry(id)) ?? {
      id: null,
      word: target.textContent,
      _notFound: true,
    };
    renderPopup(target, entry, { dictionary, onSuggestUrl: suggestUrl });
  });

  document.addEventListener('click', (e) => {
    if (activePopup && !activePopup.contains(e.target) && !e.target.closest('.cosy-word, [data-vocab]')) {
      closePopup();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePopup();
  });
}

/**
 * Convenience one-call setup: runs autoDetect + attachPopupHandler together.
 */
export function hydrate(root, { lang, matchWord, resolveEntry, dictionary, onSuggestUrl } = {}) {
  const dict = dictionary ?? createCosyDictionary();
  if (matchWord) autoDetect(root, { lang, matchWord });
  attachPopupHandler(root, { resolveEntry, dictionary: dict, onSuggestUrl });
  return dict;
}

// ---------------------------------------------------------------------------
// 4. Minimal default styling. Consumer repos are expected to override these
//    custom properties to match their own branding; nothing here is scoped
//    tighter than :root so a single <style> override block in the host page
//    is enough.
// ---------------------------------------------------------------------------
export const DEFAULT_STYLES = `
  .cosy-word { background: none; border: none; padding: 0; font: inherit; color: inherit;
    cursor: pointer; text-underline-offset: 3px; text-decoration: underline dotted; }
  .cosy-word:hover, .cosy-word:focus-visible { text-decoration-style: solid; }
  .cosy-popup-card { position: absolute; z-index: 1000; width: 300px; max-width: 90vw;
    background: var(--cosy-card, #fff); color: var(--cosy-ink, #1a1a1a);
    border: 1px solid var(--cosy-border, #ddd); border-radius: 10px; padding: 14px 16px;
    box-shadow: 0 8px 24px rgba(0,0,0,.18); font-family: system-ui, sans-serif; }
  .cosy-popup-sheet { position: fixed; left: 0; right: 0; bottom: 0; top: auto; width: 100%;
    max-width: none; border-radius: 16px 16px 0 0; }
`;
