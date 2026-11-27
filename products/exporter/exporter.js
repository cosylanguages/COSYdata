/**
 * Renders exports/manifest.json into download links.
 *
 * The manifest is resolved relative to this module, so the product keeps working
 * if it is copied elsewhere in the repository. Every link points at a file the
 * manifest has already hashed, so a stale manifest is a build failure, not a
 * broken download.
 */

const MANIFEST_URL = new URL('../../exports/manifest.json', import.meta.url);
const numberFormat = new Intl.NumberFormat('en-US');

const fmt = (value) => numberFormat.format(value);

function size(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else node.setAttribute(key, value);
  }
  for (const child of [].concat(children)) if (child) node.append(child);
  return node;
}

function downloadCard(file, label) {
  return el('a', { class: 'ex-card', href: `../../exports/${file.path}`, download: '' }, [
    el('span', { class: 'ex-card-name', text: file.path }),
    el('span', { class: 'ex-card-meta', text: `${label} · ${fmt(file.rows)} rows · ${size(file.bytes)}` }),
    el('span', { class: 'ex-card-hash', text: `sha256 ${file.sha256}` })
  ]);
}

function renderTotals(manifest) {
  const totalBytes = manifest.files.reduce((total, file) => total + file.bytes, 0);
  const values = {
    rows: fmt(manifest.rows),
    languages: fmt(manifest.languages.length),
    files: fmt(manifest.files.length),
    size: size(totalBytes)
  };
  for (const [key, value] of Object.entries(values)) {
    const node = document.querySelector(`[data-stat="${key}"]`);
    if (node) node.textContent = value;
  }

  const stamp = document.getElementById('ex-stamp');
  if (stamp) {
    stamp.textContent = `${fmt(manifest.rows)} entries · ${fmt(manifest.languages.length)} languages · ${manifest.ordering}`;
  }
}

function renderDownloads(manifest) {
  const host = document.getElementById('ex-downloads');
  const labels = { jsonl: 'every field', csv: 'flat columns' };
  for (const file of manifest.files.filter((item) => !item.path.includes('/'))) {
    host.append(downloadCard(file, labels[file.format] || file.format));
  }
}

function renderLanguages(manifest) {
  const host = document.getElementById('ex-languages');
  for (const language of manifest.languages) {
    host.append(
      el('a', { class: 'ex-chip', href: `../../exports/${language.csv}`, download: '' }, [
        el('span', { class: 'ex-chip-code', text: language.code }),
        el('span', { class: 'ex-chip-count', text: fmt(language.rows) })
      ])
    );
  }
}

function renderColumns(manifest) {
  const host = document.getElementById('ex-columns');
  for (const column of manifest.csv_columns) {
    host.append(
      el('tr', {}, [el('td', {}, [el('code', { text: column.name })]), el('td', { text: column.note })])
    );
  }
}

async function main() {
  try {
    const response = await fetch(MANIFEST_URL);
    if (!response.ok) throw new Error(`exports/manifest.json returned ${response.status}`);
    const manifest = await response.json();

    renderTotals(manifest);
    renderDownloads(manifest);
    renderLanguages(manifest);
    renderColumns(manifest);

    document.body.dataset.rendered = 'true';
  } catch (error) {
    const banner = document.getElementById('ex-error');
    if (banner) banner.hidden = false;
    const stamp = document.getElementById('ex-stamp');
    if (stamp) stamp.textContent = 'The manifest could not be loaded.';
    console.error('Exporter page could not render exports/manifest.json:', error);
  }
}

main();
