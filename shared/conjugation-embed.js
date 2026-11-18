/**
 * COSYdata Conjugation Embed
 * --------------------------
 * Renders a verb conjugation table by id, so any repo can show a table without
 * copying it. Tables live in shared/conjugation-index.json and carry a stable id
 * `conj:<lang>:<verb-slug>:<form>` (e.g. `conj:fr:etre:present`).
 *
 *   <div data-conjugation-embed="conj:fr:etre:present"></div>
 *
 * Concept form — pass the shared source-verb id as the second segment to render
 * every language that has that verb:
 *
 *   <div data-conjugation-embed="conj:be:present"></div>
 *
 * Options (data attributes):
 *   data-conjugation-embed         required, table id (or concept id)
 *   data-conjugation-embed-langs   comma list to limit concept output, e.g. "en,fr"
 *   data-conjugation-embed-url     override the base URL (default: GitHub Pages)
 *
 * Self-contained styling (Shadow DOM) so it looks the same in any host repo.
 * Programmatic API: window.COSYConjugation.render(el) / .renderAll() / .resolve(id)
 */
(function () {
  'use strict';

  const DEFAULT_BASE = 'https://cosylanguages.github.io/COSYdata/';
  const INDEX_PATH = 'shared/conjugation-index.json';
  const FLAGS = {
    en: '🇬🇧', fr: '🇫🇷', it: '🇮🇹', de: '🇩🇪', ru: '🇷🇺', el: '🇬🇷', es: '🇪🇸',
    pt: '🇵🇹', hy: '🇦🇲', ka: '🇬🇪', ba: '🏳️', br: '🏴', cv: '🏳️', tt: '🏳️'
  };
  const LANG_NAMES = {
    en: 'English', fr: 'French', it: 'Italian', de: 'German', ru: 'Russian',
    el: 'Greek', es: 'Spanish', pt: 'Portuguese', hy: 'Armenian', ka: 'Georgian',
    ba: 'Bashkir', br: 'Breton', cv: 'Chuvash', tt: 'Tatar'
  };

  let indexCache = null;
  let indexPromise = null;

  function baseUrl(host) {
    return (host && host.getAttribute('data-conjugation-embed-url')) || DEFAULT_BASE;
  }

  async function loadIndex(base) {
    if (indexCache) return indexCache;
    if (!indexPromise) {
      indexPromise = fetch(new URL(INDEX_PATH, base).href, { mode: 'cors' })
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.json();
        })
        .then(function (json) { indexCache = json; return json; });
    }
    return indexPromise;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // "conj:fr:etre:present" -> exact entry; "conj:be:present" -> concept group.
  function resolve(index, ref) {
    const id = String(ref || '').trim();
    if (index[id]) return { kind: 'table', entries: [Object.assign({ id: id }, index[id])] };
    const m = /^conj:([^:]+):([^:]+)$/.exec(id);
    if (m) {
      const concept = m[1];
      const entries = Object.keys(index)
        .filter(function (k) { return index[k].concept === concept; })
        .sort()
        .map(function (k) { return Object.assign({ id: k }, index[k]); });
      if (entries.length) return { kind: 'concept', entries: entries };
    }
    return { kind: 'missing', entries: [] };
  }

  function tableHtml(entry, compact) {
    const rows = Object.entries(entry.table || {}).map(function (pair) {
      return '<tr><th scope="row">' + escapeHtml(pair[0]) + '</th><td>' + escapeHtml(pair[1]) + '</td></tr>';
    }).join('');
    const flag = FLAGS[entry.lang] || '🌐';
    const name = LANG_NAMES[entry.lang] || entry.lang.toUpperCase();
    return '' +
      '<div class="conj-card">' +
        '<div class="conj-head">' +
          (compact ? '' : '<span class="conj-flag">' + flag + '</span>') +
          '<span class="conj-inf">' + escapeHtml(entry.infinitive) + '</span>' +
          '<span class="conj-lang">' + escapeHtml(name) + '</span>' +
          '<span class="conj-form">' + escapeHtml(entry.form_label || entry.form) + '</span>' +
        '</div>' +
        (entry.notes ? '<p class="conj-notes">' + escapeHtml(entry.notes) + '</p>' : '') +
        '<table class="conj-table"><tbody>' + rows + '</tbody></table>' +
        '<div class="conj-src">COSYdata · ' + escapeHtml(entry.id) + '</div>' +
      '</div>';
  }

  function style() {
    return '' +
      ':host{display:block;font-family:inherit;}' +
      '.conj-wrap{display:grid;gap:14px;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));}' +
      '.conj-card{border:1px solid rgba(0,0,0,.12);border-radius:10px;padding:12px 14px;background:#fff;color:#111;box-shadow:0 1px 2px rgba(0,0,0,.05);}' +
      '.conj-head{display:flex;flex-wrap:wrap;align-items:baseline;gap:6px;margin-bottom:8px;}' +
      '.conj-flag{font-size:1.1rem;}' +
      '.conj-inf{font-weight:800;font-size:1.05rem;}' +
      '.conj-lang{font-size:.8rem;opacity:.7;}' +
      '.conj-form{margin-left:auto;font-size:.72rem;text-transform:uppercase;letter-spacing:.04em;opacity:.6;}' +
      '.conj-notes{font-size:.85rem;opacity:.8;margin:0 0 8px;}' +
      '.conj-table{width:100%;border-collapse:collapse;font-size:.92rem;}' +
      '.conj-table th,.conj-table td{padding:4px 6px;border-bottom:1px solid rgba(0,0,0,.06);text-align:left;}' +
      '.conj-table th{font-weight:600;opacity:.7;white-space:nowrap;}' +
      '.conj-src{font-size:.7rem;opacity:.45;margin-top:8px;}' +
      '.conj-status{padding:12px;opacity:.75;font-style:italic;}';
  }

  function hostRoot(host) {
    if (!host.shadowRoot) host.attachShadow({ mode: 'open' });
    return host.shadowRoot;
  }

  async function render(host) {
    const ref = host.getAttribute('data-conjugation-embed');
    if (!ref || host.__cosyConjDone) return;
    host.__cosyConjDone = true;
    const base = baseUrl(host);
    const root = hostRoot(host);

    const styleEl = document.createElement('style');
    styleEl.textContent = style();
    const wrap = document.createElement('div');
    wrap.className = 'conj-wrap';
    wrap.innerHTML = '<div class="conj-status" role="status">Loading conjugation…</div>';
    root.append(styleEl, wrap);

    let index;
    try {
      index = await loadIndex(base);
    } catch (err) {
      wrap.innerHTML = '<div class="conj-status">Conjugation data is unavailable right now.</div>';
      return;
    }

    const found = resolve(index, ref);
    if (!found.entries.length) {
      wrap.innerHTML = '<div class="conj-status">No conjugation table found for “' + escapeHtml(ref) + '”.</div>';
      return;
    }

    const langs = (host.getAttribute('data-conjugation-embed-langs') || '')
      .split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    let entries = found.entries;
    if (langs.length) entries = entries.filter(function (e) { return langs.includes(e.lang); });

    const compact = found.kind === 'concept' && entries.length > 1;
    wrap.innerHTML = entries.map(function (e) { return tableHtml(e, compact); }).join('');
  }

  function renderAll(root) {
    (root || document).querySelectorAll('[data-conjugation-embed]').forEach(render);
  }

  window.COSYConjugation = {
    render: render,
    renderAll: renderAll,
    resolve: function (ref, cb) { loadIndex(DEFAULT_BASE).then(function (i) { cb(resolve(i, ref)); }); }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { renderAll(); });
  } else {
    renderAll();
  }
})();
