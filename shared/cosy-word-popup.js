/**
 * COSYdata Click-to-Define & Personal Dictionary Module
 *
 * Dependency-free ES module for auto-detecting vocabulary words, rendering
 * floating popup cards with pronunciations and definitions, and managing a
 * localStorage-backed personal dictionary.
 */

const DICT_STORAGE_PREFIX = 'cosydata:dictionary:';
const STYLE_ELEMENT_ID = 'cosy-word-popup-styles';

function getLocalStorage() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
  } catch (err) {
    // localStorage restricted or disabled
  }
  return null;
}

/**
 * Creates a localStorage-backed personal dictionary manager.
 *
 * @param {string} [namespace='default']
 * @returns {Object} Dictionary instance
 */
export function createCosyDictionary(namespace = 'default') {
  const key = DICT_STORAGE_PREFIX + namespace;
  let inMemoryItems = [];
  const listeners = new Set();

  function load() {
    const storage = getLocalStorage();
    if (storage) {
      try {
        const item = storage.getItem(key);
        if (item) {
          const parsed = JSON.parse(item);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch (err) {
        // Ignore read error
      }
    }
    return inMemoryItems;
  }

  function save(items) {
    inMemoryItems = items;
    const storage = getLocalStorage();
    if (storage) {
      try {
        storage.setItem(key, JSON.stringify(items));
      } catch (err) {
        // Ignore write error
      }
    }
    notify();
  }

  function notify() {
    const items = load();
    for (const listener of listeners) {
      try {
        listener(items);
      } catch (err) {
        console.error('[COSYdata] Error in dictionary listener:', err);
      }
    }
  }

  return {
    list() {
      return load().slice();
    },
    has(id) {
      if (!id) return false;
      const items = load();
      return items.some((item) => (typeof item === 'string' ? item === id : item && item.id === id));
    },
    add(entryOrId) {
      if (!entryOrId) return;
      const id = typeof entryOrId === 'string' ? entryOrId : entryOrId.id;
      if (!id) return;

      const items = load();
      const existingIdx = items.findIndex((item) => (typeof item === 'string' ? item === id : item && item.id === id));

      const newItem =
        typeof entryOrId === 'string'
          ? { id: entryOrId, word: entryOrId, addedAt: Date.now() }
          : { ...entryOrId, addedAt: Date.now() };

      if (existingIdx >= 0) {
        items[existingIdx] = newItem;
      } else {
        items.push(newItem);
      }
      save(items);
    },
    remove(id) {
      if (!id) return;
      const items = load();
      const newItems = items.filter((item) => (typeof item === 'string' ? item !== id : item && item.id !== id));
      save(newItems);
    },
    exportJson() {
      return JSON.stringify(load(), null, 2);
    },
    importJson(jsonString) {
      try {
        const parsed = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
        if (Array.isArray(parsed)) {
          save(parsed);
          return true;
        }
      } catch (err) {
        console.warn('[COSYdata] Failed to parse dictionary JSON:', err.message);
      }
      return false;
    },
    onChange(callback) {
      if (typeof callback === 'function') {
        listeners.add(callback);
        return () => {
          listeners.delete(callback);
        };
      }
      return () => {};
    }
  };
}

/**
 * Scans text nodes under root and wraps recognized vocabulary words in <button class="cosy-word">.
 *
 * @param {Element|Document} [root=document]
 * @param {Object} options
 * @param {string} [options.lang]
 * @param {Function} options.matchWord - Function(surfaceForm, lang) returning match or array of matches
 */
export function autoDetect(root = typeof document !== 'undefined' ? document : null, options = {}) {
  if (!root || typeof options.matchWord !== 'function') return;

  const { lang, matchWord } = options;
  const doc = root.ownerDocument || (root.nodeType === 9 ? root : typeof document !== 'undefined' ? document : null);
  if (!doc) return;

  const isSkippedNode = (node) => {
    let curr = node.parentElement;
    while (curr) {
      const tag = curr.tagName ? curr.tagName.toLowerCase() : '';
      if (
        tag === 'script' ||
        tag === 'style' ||
        tag === 'code' ||
        tag === 'pre' ||
        curr.hasAttribute('data-vocab') ||
        curr.hasAttribute('data-cosy-skip') ||
        curr.classList.contains('cosy-word')
      ) {
        return true;
      }
      if (curr === root) break;
      curr = curr.parentElement;
    }
    return false;
  };

  const walker = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !node.nodeValue.trim()) {
        return NodeFilter.FILTER_REJECT;
      }
      if (isSkippedNode(node)) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const textNodes = [];
  let current;
  while ((current = walker.nextNode())) {
    textNodes.push(current);
  }

  const wordRegex = /[\p{L}\p{M}0-9'-]+/gu;

  for (const node of textNodes) {
    const text = node.nodeValue;
    if (!text) continue;

    wordRegex.lastIndex = 0;
    let match;
    const matchesList = [];

    while ((match = wordRegex.exec(text)) !== null) {
      const token = match[0];
      const matchResult = matchWord(token, lang);
      if (matchResult && (!Array.isArray(matchResult) || matchResult.length > 0)) {
        const id = Array.isArray(matchResult)
          ? matchResult[0] && matchResult[0].id
          : typeof matchResult === 'object' && matchResult !== null
          ? matchResult.id
          : typeof matchResult === 'string'
          ? matchResult
          : null;

        matchesList.push({
          start: match.index,
          end: match.index + token.length,
          token,
          id
        });
      }
    }

    if (matchesList.length === 0) continue;

    const fragment = doc.createDocumentFragment();
    let lastIndex = 0;

    for (const m of matchesList) {
      if (m.start > lastIndex) {
        fragment.appendChild(doc.createTextNode(text.slice(lastIndex, m.start)));
      }

      const btn = doc.createElement('button');
      btn.className = 'cosy-word';
      btn.type = 'button';
      if (m.id) {
        btn.setAttribute('data-vocab', m.id);
      } else {
        btn.setAttribute('data-word', m.token);
      }
      btn.textContent = m.token;

      fragment.appendChild(btn);
      lastIndex = m.end;
    }

    if (lastIndex < text.length) {
      fragment.appendChild(doc.createTextNode(text.slice(lastIndex)));
    }

    if (node.parentNode) {
      node.parentNode.replaceChild(fragment, node);
    }
  }
}

function injectStyles(doc) {
  if (!doc || doc.getElementById(STYLE_ELEMENT_ID)) return;

  const style = doc.createElement('style');
  style.id = STYLE_ELEMENT_ID;
  style.textContent = `
button.cosy-word {
  background: transparent;
  border: none;
  border-bottom: 1px dashed #3b82f6;
  color: inherit;
  font: inherit;
  padding: 0;
  cursor: pointer;
}
button.cosy-word:hover {
  background-color: rgba(59, 130, 246, 0.1);
  border-bottom-style: solid;
}
.cosy-popup-card {
  position: absolute;
  z-index: 10000;
  max-width: 340px;
  width: calc(100vw - 32px);
  background: #ffffff;
  color: #1f2937;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  padding: 16px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  box-sizing: border-box;
}
.cosy-popup-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 8px;
  gap: 8px;
}
.cosy-popup-word-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}
.cosy-popup-word {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}
.cosy-popup-emoji {
  font-size: 20px;
}
.cosy-popup-transcription {
  font-size: 13px;
  color: #6b7280;
  font-family: monospace;
}
.cosy-popup-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: #f3f4f6;
  color: #4b5563;
  text-transform: uppercase;
}
.cosy-popup-close {
  background: none;
  border: none;
  font-size: 18px;
  line-height: 1;
  color: #9ca3af;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
}
.cosy-popup-close:hover {
  color: #111827;
  background-color: #f3f4f6;
}
.cosy-popup-body {
  margin-bottom: 12px;
}
.cosy-popup-definition {
  margin-bottom: 8px;
  color: #374151;
}
.cosy-popup-example {
  font-style: italic;
  color: #6b7280;
  border-left: 3px solid #e5e7eb;
  padding-left: 8px;
  margin-bottom: 8px;
}
.cosy-popup-meta {
  font-size: 12px;
  color: #4b5563;
  margin-top: 6px;
}
.cosy-popup-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  border-top: 1px solid #f3f4f6;
  padding-top: 10px;
  margin-top: 8px;
}
.cosy-popup-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: background 0.15s ease;
  text-decoration: none;
}
.cosy-popup-btn:hover {
  background: #e5e7eb;
}
.cosy-popup-btn-saved {
  background: #fef3c7;
  border-color: #fde047;
  color: #92400e;
}
`;
  (doc.head || doc.body).appendChild(style);
}

/**
 * Attaches a delegated click handler to root that renders a popup card for vocabulary words.
 *
 * @param {Element|Document} [root=document]
 * @param {Object} options
 * @param {Function} options.resolveEntry - Function(ref) returning Promise<entry>
 * @param {Object} [options.dictionary] - Personal dictionary instance
 * @param {Function|string} [options.onSuggestUrl] - Suggest edit URL string or builder function
 * @returns {Function} Detach function to remove listener
 */
export function attachPopupHandler(root = typeof document !== 'undefined' ? document : null, options = {}) {
  if (!root || typeof options.resolveEntry !== 'function') {
    return () => {};
  }

  const { resolveEntry, dictionary, onSuggestUrl } = options;
  const doc = root.ownerDocument || (root.nodeType === 9 ? root : typeof document !== 'undefined' ? document : null);

  if (doc) injectStyles(doc);

  let currentPopup = null;

  const closePopup = () => {
    if (currentPopup && currentPopup.parentNode) {
      currentPopup.parentNode.removeChild(currentPopup);
    }
    currentPopup = null;
  };

  const handleDocumentClick = (e) => {
    if (currentPopup && !currentPopup.contains(e.target) && !e.target.closest('.cosy-word, [data-vocab]')) {
      closePopup();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closePopup();
    }
  };

  if (doc) {
    doc.addEventListener('pointerdown', handleDocumentClick);
    doc.addEventListener('keydown', handleKeyDown);
  }

  const handleClick = async (e) => {
    const target = e.target.closest('.cosy-word, [data-vocab]');
    if (!target || !root.contains(target)) return;

    const ref = target.getAttribute('data-vocab') || target.getAttribute('data-word') || target.textContent.trim();
    if (!ref) return;

    e.preventDefault();

    try {
      const entry = await resolveEntry(ref);
      if (!entry) return;

      closePopup();

      const popup = doc.createElement('div');
      popup.className = 'cosy-popup-card';

      // Header
      const header = doc.createElement('div');
      header.className = 'cosy-popup-header';

      const wordRow = doc.createElement('div');
      wordRow.className = 'cosy-popup-word-row';

      const wordEl = doc.createElement('span');
      wordEl.className = 'cosy-popup-word';
      wordEl.textContent = entry.word || ref;
      wordRow.appendChild(wordEl);

      if (entry.emoji) {
        const emojiEl = doc.createElement('span');
        emojiEl.className = 'cosy-popup-emoji';
        emojiEl.textContent = entry.emoji;
        wordRow.appendChild(emojiEl);
      }

      if (entry.transcription) {
        const transEl = doc.createElement('span');
        transEl.className = 'cosy-popup-transcription';
        transEl.textContent = entry.transcription;
        wordRow.appendChild(transEl);
      }

      if (entry.form) {
        const formEl = doc.createElement('span');
        formEl.className = 'cosy-popup-badge';
        formEl.textContent = entry.form;
        wordRow.appendChild(formEl);
      }

      if (entry.level) {
        const levelEl = doc.createElement('span');
        levelEl.className = 'cosy-popup-badge';
        levelEl.textContent = entry.level;
        wordRow.appendChild(levelEl);
      }

      header.appendChild(wordRow);

      const closeBtn = doc.createElement('button');
      closeBtn.className = 'cosy-popup-close';
      closeBtn.type = 'button';
      closeBtn.setAttribute('aria-label', 'Close');
      closeBtn.textContent = '×';
      closeBtn.onclick = closePopup;
      header.appendChild(closeBtn);

      popup.appendChild(header);

      // Body
      const body = doc.createElement('div');
      body.className = 'cosy-popup-body';

      if (Array.isArray(entry.definitions) && entry.definitions.length > 0) {
        const defEl = doc.createElement('div');
        defEl.className = 'cosy-popup-definition';
        defEl.textContent = entry.definitions[0];
        body.appendChild(defEl);
      }

      if (Array.isArray(entry.examples) && entry.examples.length > 0) {
        const exEl = doc.createElement('div');
        exEl.className = 'cosy-popup-example';
        exEl.textContent = `"${entry.examples[0]}"`;
        body.appendChild(exEl);
      }

      if (Array.isArray(entry.synonyms) && entry.synonyms.length > 0) {
        const synEl = doc.createElement('div');
        synEl.className = 'cosy-popup-meta';
        synEl.textContent = `Synonyms: ${entry.synonyms.join(', ')}`;
        body.appendChild(synEl);
      }

      if (Array.isArray(entry.antonyms) && entry.antonyms.length > 0) {
        const antEl = doc.createElement('div');
        antEl.className = 'cosy-popup-meta';
        antEl.textContent = `Antonyms: ${entry.antonyms.join(', ')}`;
        body.appendChild(antEl);
      }

      popup.appendChild(body);

      // Footer
      const footer = doc.createElement('div');
      footer.className = 'cosy-popup-footer';

      // Listen Button (Web Speech API)
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const listenBtn = doc.createElement('button');
        listenBtn.className = 'cosy-popup-btn';
        listenBtn.type = 'button';
        listenBtn.innerHTML = '🔊 Listen';
        listenBtn.onclick = () => {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(entry.word || ref);
          if (entry.language) utterance.lang = entry.language;
          window.speechSynthesis.speak(utterance);
        };
        footer.appendChild(listenBtn);
      }

      // Save Word Toggle Button
      if (dictionary && entry.id) {
        const saveBtn = doc.createElement('button');
        saveBtn.type = 'button';

        const updateSaveBtnState = () => {
          const isSaved = dictionary.has(entry.id);
          saveBtn.className = `cosy-popup-btn ${isSaved ? 'cosy-popup-btn-saved' : ''}`;
          saveBtn.textContent = isSaved ? '★ Saved' : '☆ Save word';
        };

        updateSaveBtnState();

        saveBtn.onclick = () => {
          if (dictionary.has(entry.id)) {
            dictionary.remove(entry.id);
          } else {
            dictionary.add(entry);
          }
          updateSaveBtnState();
        };

        footer.appendChild(saveBtn);
      }

      // Suggest Edit Link
      if (onSuggestUrl) {
        let suggestUrl = null;
        if (typeof onSuggestUrl === 'function') {
          suggestUrl = onSuggestUrl(entry);
        } else if (typeof onSuggestUrl === 'string') {
          suggestUrl = onSuggestUrl
            .replace('{id}', encodeURIComponent(entry.id || ''))
            .replace('{word}', encodeURIComponent(entry.word || ''));
        }

        if (suggestUrl) {
          const suggestLink = doc.createElement('a');
          suggestLink.className = 'cosy-popup-btn';
          suggestLink.href = suggestUrl;
          suggestLink.target = '_blank';
          suggestLink.rel = 'noopener noreferrer';
          suggestLink.textContent = '✏️ Suggest edit';
          footer.appendChild(suggestLink);
        }
      }

      popup.appendChild(footer);

      // Position popup
      doc.body.appendChild(popup);
      currentPopup = popup;

      const rect = target.getBoundingClientRect();
      const scrollTop = window.pageYOffset || doc.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || doc.documentElement.scrollLeft;

      let top = rect.bottom + scrollTop + 8;
      let left = rect.left + scrollLeft;

      const popupRect = popup.getBoundingClientRect();
      const viewportWidth = window.innerWidth || doc.documentElement.clientWidth;

      if (left + popupRect.width > viewportWidth - 16) {
        left = Math.max(16, viewportWidth - popupRect.width - 16);
      }

      popup.style.top = `${top}px`;
      popup.style.left = `${left}px`;
    } catch (err) {
      console.warn('[COSYdata] Error resolving entry for popup:', err.message);
    }
  };

  root.addEventListener('click', handleClick);

  return () => {
    root.removeEventListener('click', handleClick);
    if (doc) {
      doc.removeEventListener('pointerdown', handleDocumentClick);
      doc.removeEventListener('keydown', handleKeyDown);
    }
    closePopup();
  };
}

/**
 * Convenience wrapper combining dictionary creation, auto-detection, and popup handling.
 *
 * @param {Element|Document} [root=document]
 * @param {Object} options
 * @param {string} [options.lang]
 * @param {Function} [options.matchWord]
 * @param {Function} options.resolveEntry
 * @param {Object} [options.dictionary]
 * @param {Function|string} [options.onSuggestUrl]
 * @returns {Object} { dictionary, detach }
 */
export function hydrate(root = typeof document !== 'undefined' ? document : null, options = {}) {
  const dictionary = options.dictionary || createCosyDictionary();

  if (typeof options.matchWord === 'function') {
    autoDetect(root, { lang: options.lang, matchWord: options.matchWord });
  }

  const detach = attachPopupHandler(root, {
    resolveEntry: options.resolveEntry,
    dictionary,
    onSuggestUrl: options.onSuggestUrl
  });

  return { dictionary, detach };
}
