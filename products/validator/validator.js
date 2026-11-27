/**
 * Renders reports/quality.json.
 *
 * The file is resolved relative to this module, so the product keeps working if
 * it is copied elsewhere in the repository. Nothing here knows a rule by name:
 * the catalogue comes from the report, which reads it from the audit script.
 */

const REPORT_URL = new URL('../../reports/quality.json', import.meta.url);
const numberFormat = new Intl.NumberFormat('en-US');
const SAMPLE_SHOWN = 12;

const fmt = (value) => numberFormat.format(value);

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

function statusBadge(rule) {
  if (rule.new > 0) return el('span', { class: 'vd-badge vd-badge-debt', text: `${fmt(rule.new)} new` });
  if (rule.findings > 0) return el('span', { class: 'vd-badge vd-badge-debt', text: 'recorded debt' });
  return el('span', { class: 'vd-badge vd-badge-clean', text: 'clean' });
}

function barRow({ label, value, max, detail }) {
  const width = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
  const fill = el('div', { class: 'vd-bar-fill' });
  fill.style.width = `${width}%`;
  return el('div', { class: 'vd-bar-row' }, [
    el('span', { class: 'vd-bar-label', text: label }),
    el('div', { class: 'vd-bar-track', 'aria-hidden': 'true' }, [fill]),
    el('span', { class: 'vd-bar-value', text: detail })
  ]);
}

function renderTotals(report) {
  const values = {
    entries: report.entries,
    rules: report.rules.length,
    findings: report.findings,
    new: report.new
  };
  for (const [key, value] of Object.entries(values)) {
    const node = document.querySelector(`[data-stat="${key}"]`);
    if (node && typeof value === 'number') node.textContent = fmt(value);
  }

  const checked = report.rules.filter((rule) => rule.findings > 0).length;
  const stamp = document.getElementById('vd-stamp');
  if (stamp) {
    const parts = [
      `${fmt(report.entries)} entries`,
      `${checked} of ${report.rules.length} rules found something`,
      `${fmt(report.findings)} findings recorded in the baseline`
    ];
    if (report.resolved > 0) parts.push(`${fmt(report.resolved)} baseline findings since fixed`);
    stamp.textContent = parts.join(' · ');
  }
}

function renderRules(report) {
  const host = document.getElementById('vd-rules');
  const rules = [...report.rules].sort((a, b) => b.findings - a.findings || a.code.localeCompare(b.code));
  for (const rule of rules) {
    host.append(
      el('tr', {}, [
        el('td', {}, [el('code', { class: 'vd-rule-code', text: rule.code })]),
        el('td', { class: 'vd-rule-text', text: rule.description }),
        el('td', { class: 'vd-num', text: fmt(rule.findings) }),
        el('td', {}, [statusBadge(rule)])
      ])
    );
  }
}

function renderLevels(report) {
  const host = document.getElementById('vd-levels');
  const max = Math.max(...report.by_level.map((row) => row.findings), 0);
  for (const row of report.by_level) {
    host.append(
      barRow({
        label: row.level,
        value: row.findings,
        max,
        detail: `${fmt(row.findings)} of ${fmt(row.entries)} · ${row.share}%`
      })
    );
  }
}

function renderLanguages(report) {
  const host = document.getElementById('vd-languages');
  const rows = [...report.by_language].sort((a, b) => b.share - a.share || a.code.localeCompare(b.code));
  for (const row of rows) {
    host.append(
      el('tr', {}, [
        el('td', { class: 'vd-rule-code', text: row.code }),
        el('td', { class: 'vd-num', text: fmt(row.entries) }),
        el('td', { class: 'vd-num', text: fmt(row.findings) }),
        el('td', { class: 'vd-num', text: `${row.share}%` })
      ])
    );
  }
}

function renderSample(report) {
  const host = document.getElementById('vd-sample');
  const sample = report.sample.slice(0, SAMPLE_SHOWN);
  for (const finding of sample) {
    host.append(
      el('li', {}, [
        el('span', { class: 'vd-sample-code', text: finding.code }),
        el('span', { class: 'vd-sample-subject', text: finding.subject }),
        el('span', { class: 'vd-sample-detail', text: finding.detail || '' })
      ])
    );
  }

  const note = document.getElementById('vd-sample-note');
  if (note) {
    note.textContent = report.sample.length
      ? `The first ${sample.length} findings in audit order, out of ${fmt(report.findings)}. The complete list, entry by entry, is in the baseline file.`
      : 'No findings to show.';
  }
}

async function main() {
  try {
    const response = await fetch(REPORT_URL);
    if (!response.ok) throw new Error(`reports/quality.json returned ${response.status}`);
    const report = await response.json();

    renderTotals(report);
    renderRules(report);
    renderLevels(report);
    renderLanguages(report);
    renderSample(report);

    document.body.dataset.rendered = 'true';
  } catch (error) {
    const banner = document.getElementById('vd-error');
    if (banner) banner.hidden = false;
    const stamp = document.getElementById('vd-stamp');
    if (stamp) stamp.textContent = 'The report could not be loaded.';
    console.error('Validator page could not render reports/quality.json:', error);
  }
}

main();
