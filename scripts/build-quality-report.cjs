#!/usr/bin/env node
/**
 * Publishes the quality audit as JSON.
 *
 * scripts/quality-audit.cjs decides what is wrong with the data; this script
 * makes that decision readable without a terminal. It calls the same
 * collectFindings(), so the page and the CI gate can never disagree about what
 * a finding is.
 *
 *   node scripts/build-quality-report.cjs           # write reports/quality.json
 *   node scripts/build-quality-report.cjs --check   # exit 1 if it is stale
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { collectFindings, RULES } = require('./quality-audit.cjs');
const { readEntries, LEVELS } = require('./lib/vocabulary-scan.cjs');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.join(ROOT, 'reports/quality.json');
const BASELINE = path.join(ROOT, 'reports/quality-baseline.json');
const EXAMPLES_PER_RULE = 8;
const SAMPLE_SIZE = 40;

const percent = (part, whole) => (whole ? Math.round((part * 1000) / whole) / 10 : 0);

function build() {
  const { entries } = readEntries(path.join(ROOT, 'vocabulary'));
  const findings = collectFindings(entries);
  const baseline = fs.existsSync(BASELINE) ? JSON.parse(fs.readFileSync(BASELINE, 'utf8')) : { records: {} };
  const baselineRecords = baseline.records || {};

  const languageOf = new Map();
  const levelOf = new Map();
  for (const { entry } of entries) {
    if (entry.id) {
      languageOf.set(entry.id, entry.language);
      levelOf.set(entry.id, entry.level);
    }
  }

  const byCode = new Map();
  const byLanguage = new Map();
  const byLevel = new Map();
  const entriesWithFindings = new Set();
  const allFindings = [];

  for (const finding of findings.values()) {
    if (!byCode.has(finding.code)) byCode.set(finding.code, { code: finding.code, findings: 0, examples: [] });
    const code = byCode.get(finding.code);
    code.findings += 1;
    if (code.examples.length < EXAMPLES_PER_RULE) code.examples.push(finding.subject);

    // A duplicate-group finding names several entries at once.
    const subjects = finding.subject.split('|');
    for (const subject of subjects) {
      const language = languageOf.get(subject);
      const level = levelOf.get(subject);
      if (!language) continue;
      entriesWithFindings.add(subject);
      if (!byLanguage.has(language)) byLanguage.set(language, { code: language, findings: 0 });
      byLanguage.get(language).findings += 1;
      if (level) {
        if (!byLevel.has(level)) byLevel.set(level, { level, findings: 0 });
        byLevel.get(level).findings += 1;
      }
    }

    allFindings.push({ code: finding.code, subject: finding.subject, detail: finding.detail, language: languageOf.get(subjects[0]) });
  }

  const entryCounts = { language: new Map(), level: new Map() };
  for (const { entry } of entries) {
    if (entry.language) entryCounts.language.set(entry.language, (entryCounts.language.get(entry.language) || 0) + 1);
    if (entry.level) entryCounts.level.set(entry.level, (entryCounts.level.get(entry.level) || 0) + 1);
  }

  const baselineTotal = Object.values(baselineRecords).reduce((total, list) => total + list.length, 0);
  let newFindings = 0;
  let resolved = 0;
  const newByCode = new Map();
  const currentByCode = new Map();
  for (const finding of findings.values()) {
    if (!currentByCode.has(finding.code)) currentByCode.set(finding.code, new Set());
    currentByCode.get(finding.code).add(finding.subject);
  }
  for (const [code, subjects] of currentByCode) {
    const known = new Set(baselineRecords[code] || []);
    for (const subject of subjects) {
      if (!known.has(subject)) {
        newFindings += 1;
        newByCode.set(code, (newByCode.get(code) || 0) + 1);
      }
    }
  }
  for (const [code, subjects] of Object.entries(baselineRecords)) {
    const present = currentByCode.get(code) || new Set();
    for (const subject of subjects) if (!present.has(subject)) resolved += 1;
  }

  // One finding per language first, so the sample shows the rule's spread
  // rather than the first twelve entries of whichever file sorted first.
  const sample = [];
  const seenLanguages = new Set();
  for (const finding of allFindings) {
    if (sample.length >= SAMPLE_SIZE) break;
    if (!finding.language || seenLanguages.has(finding.language)) continue;
    seenLanguages.add(finding.language);
    sample.push({ code: finding.code, subject: finding.subject, detail: finding.detail });
  }
  for (const finding of allFindings) {
    if (sample.length >= SAMPLE_SIZE) break;
    if (sample.some((row) => row.subject === finding.subject && row.code === finding.code)) continue;
    sample.push({ code: finding.code, subject: finding.subject, detail: finding.detail });
  }

  return {
    schema_version: '1.0.0',
    source: 'scripts/quality-audit.cjs',
    counting_rule: 'One finding per (rule, subject). A subject is an entry id, or several ids joined by "|" for a duplicate group.',
    entries: entries.length,
    findings: findings.size,
    entries_with_findings: entriesWithFindings.size,
    findings_share: percent(entriesWithFindings.size, entries.length),
    baseline: { total: baselineTotal, generated: baseline.generated || null },
    new: newFindings,
    resolved,
    rules: Object.entries(RULES).map(([code, description]) => ({
      code,
      description,
      findings: byCode.has(code) ? byCode.get(code).findings : 0,
      new: newByCode.get(code) || 0
    })),
    by_code: [...byCode.values()]
      .map((code) => ({ ...code, new: newByCode.get(code.code) || 0, share: percent(code.findings, findings.size) }))
      .sort((a, b) => b.findings - a.findings || a.code.localeCompare(b.code)),
    by_language: [...byLanguage.values()]
      .map((row) => ({
        ...row,
        entries: entryCounts.language.get(row.code) || 0,
        share: percent(row.findings, entryCounts.language.get(row.code) || 0)
      }))
      .sort((a, b) => a.code.localeCompare(b.code)),
    by_level: LEVELS.filter((level) => byLevel.has(level)).map((level) => ({
      level,
      findings: byLevel.get(level).findings,
      entries: entryCounts.level.get(level) || 0,
      share: percent(byLevel.get(level).findings, entryCounts.level.get(level) || 0)
    })),
    sample
  };
}

function main() {
  const check = process.argv.includes('--check');
  const json = JSON.stringify(build(), null, 2) + '\n';
  const current = fs.existsSync(OUTPUT) ? fs.readFileSync(OUTPUT, 'utf8') : null;
  const report = JSON.parse(json);
  const summary = `${report.findings} findings across ${report.entries_with_findings} of ${report.entries} entries, ${report.new} new since baseline`;

  if (current === json) {
    console.log(`reports/quality.json is up to date (${summary}).`);
    return;
  }
  if (check) {
    console.error(`reports/quality.json is stale. Run: npm run build:quality-report`);
    process.exitCode = 1;
    return;
  }
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, json);
  console.log(`reports/quality.json written (${summary}).`);
}

main();
