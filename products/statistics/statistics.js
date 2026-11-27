/**
 * Renders stats.json.
 *
 * The file is resolved relative to this module, so the product keeps working if
 * it is copied to another path in the repository. No number is hardcoded here:
 * if a value is missing from stats.json, the page leaves it blank rather than
 * inventing it.
 */

const STATS_URL = new URL('../../stats.json', import.meta.url);
const numberFormat = new Intl.NumberFormat('en-US');
const TOP_THEMES = 12;
const TOP_FORMS = 8;

const fmt = (value) => numberFormat.format(value);

function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else if (key.startsWith('data-')) node.setAttribute(key, value);
    else node.setAttribute(key, value);
  }
  for (const child of [].concat(children)) {
    if (child) node.append(child);
  }
  return node;
}

function barRow({ label, value, max, detail, empty = false }) {
  const width = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
  const fill = el('div', { class: 'st-bar-fill' });
  fill.style.width = `${width}%`;

  return el('div', { class: `st-bar-row${empty ? ' is-empty' : ''}` }, [
    el('span', { class: 'st-bar-label', text: label }),
    el('div', { class: 'st-bar-track', 'aria-hidden': 'true' }, [fill]),
    el('span', { class: 'st-bar-value', text: detail })
  ]);
}

function renderLevels(stats) {
  const host = document.getElementById('levels');
  const total = stats.totals.entries;
  const max = Math.max(...Object.values(stats.by_level));
  for (const [level, count] of Object.entries(stats.by_level)) {
    const share = total ? Math.round((count * 1000) / total) / 10 : 0;
    host.append(barRow({ label: level, value: count, max, detail: `${fmt(count)} · ${share}%` }));
  }
}

function renderCoverage(stats) {
  const host = document.getElementById('coverage');
  for (const [field, percent] of Object.entries(stats.coverage)) {
    host.append(
      barRow({
        label: field.replace(/_/g, ' '),
        value: percent,
        max: 100,
        detail: percent === 0 ? 'not yet' : `${percent}%`,
        empty: percent === 0
      })
    );
  }
}

function renderLanguages(stats) {
  const host = document.getElementById('languages');
  const rows = [...stats.languages].sort((a, b) => b.entries - a.entries);
  for (const language of rows) {
    const levels = Object.values(language.by_level).filter((count) => count > 0).length;
    host.append(
      el('tr', {}, [
        el('td', { class: 'st-lang-code', text: language.code }),
        el('td', { class: 'st-num', text: fmt(language.entries) }),
        el('td', { class: 'st-num', text: String(levels) }),
        el('td', { class: 'st-num', text: `${language.coverage.transcription}%` }),
        el('td', { class: 'st-num', text: `${language.coverage.emoji}%` }),
        el('td', { class: 'st-num', text: `${language.coverage.synonyms}%` }),
        el('td', { class: 'st-num', text: `${language.coverage.antonyms}%` }),
        el('td', { class: 'st-num', text: language.updated || '—' })
      ])
    );
  }
}

function renderForms(stats) {
  const host = document.getElementById('forms');
  const forms = stats.by_form.slice(0, TOP_FORMS);
  const max = forms.length ? forms[0].entries : 0;
  for (const form of forms) {
    const share = stats.totals.entries ? Math.round((form.entries * 1000) / stats.totals.entries) / 10 : 0;
    host.append(barRow({ label: form.name, value: form.entries, max, detail: `${fmt(form.entries)} · ${share}%` }));
  }
}

function renderThemes(stats) {
  const host = document.getElementById('themes');
  const themes = stats.themes.slice(0, TOP_THEMES);
  const max = themes.length ? themes[0].entries : 0;
  for (const theme of themes) {
    const languages = `${theme.languages} ${theme.languages === 1 ? 'language' : 'languages'}`;
    host.append(
      barRow({
        label: theme.theme,
        value: theme.entries,
        max,
        detail: `${fmt(theme.entries)} · ${languages}`
      })
    );
  }
  document.getElementById('themes-note').textContent =
    `The ${themes.length} largest themes by entry count, out of ${stats.totals.themes}.`;
}

function renderTotals(stats) {
  const values = {
    entries: stats.totals.entries,
    languages: stats.totals.languages,
    themes: stats.totals.themes,
    phrases: stats.totals.functional_phrases
  };
  for (const [key, value] of Object.entries(values)) {
    const node = document.querySelector(`[data-stat="${key}"]`);
    if (node && typeof value === 'number') node.textContent = fmt(value);
  }

  const updated = document.getElementById('data-updated');
  if (updated && stats.data_updated) {
    updated.textContent = stats.data_updated;
    updated.setAttribute('datetime', stats.data_updated);
  }

  const files = document.getElementById('data-files');
  if (files && typeof stats.totals.data_files === 'number') files.textContent = fmt(stats.totals.data_files);
}

async function main() {
  try {
    const response = await fetch(STATS_URL);
    if (!response.ok) throw new Error(`stats.json returned ${response.status}`);
    const stats = await response.json();

    renderTotals(stats);
    renderLevels(stats);
    renderCoverage(stats);
    renderLanguages(stats);
    renderForms(stats);
    renderThemes(stats);

    document.body.dataset.rendered = 'true';
  } catch (error) {
    document.getElementById('stats-error').hidden = false;
    console.error('Statistics page could not render stats.json:', error);
  }
}

main();
