#!/usr/bin/env node
/**
 * Builds stats.json, the machine-readable summary of what this repository holds.
 *
 * Every number is computed from the data on disk, so the file is reproducible:
 * running this script twice produces byte-identical output, which is what the
 * CI freshness check relies on. There is deliberately no build timestamp; the
 * `data_updated` field is the newest `updated` value found in the data.
 *
 *   node scripts/build-stats.cjs
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { readEntries, LEVELS } = require('./lib/vocabulary-scan.cjs');

const ROOT = path.resolve(__dirname, '..');
const VOCABULARY_DIR = path.join(ROOT, 'vocabulary');
const PHRASES_DIR = path.join(ROOT, 'functional-phrases');
const THEMES_SCHEMA = path.join(ROOT, 'schemas', 'themes.json');
const OUTPUT = path.join(ROOT, 'stats.json');

const COVERAGE_FIELDS = [
  'definitions',
  'examples',
  'transcription',
  'emoji',
  'audio',
  'image',
  'synonyms',
  'antonyms',
  'related_forms',
  'derivatives',
  'plural_form',
  'gender',
  'feminine',
  'feminine_plural',
  'masculine_plural',
  'neuter',
  'neuter_plural',
  'sense_label',
  'countability',
  'concept',
  'secondary_themes'
];

function isFilled(entry, field) {
  const value = entry[field];
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'string') return value.trim().length > 0;
  return Boolean(value);
}

function percent(part, whole) {
  return whole ? Math.round((part * 1000) / whole) / 10 : 0;
}

function tally(items, pick) {
  const counts = new Map();
  for (const item of items) {
    const key = pick(item);
    if (key === undefined || key === null || key === '') continue;
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return counts;
}

function ranked(counts) {
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name, entries]) => ({ name, entries }));
}

function coverageOf(entries) {
  const coverage = {};
  for (const field of COVERAGE_FIELDS) {
    const filled = entries.filter((entry) => isFilled(entry, field)).length;
    coverage[field] = percent(filled, entries.length);
  }
  return coverage;
}

function levelCounts(entries) {
  const counts = new Map(LEVELS.map((level) => [level, 0]));
  for (const entry of entries) {
    if (counts.has(entry.level)) counts.set(entry.level, counts.get(entry.level) + 1);
  }
  return Object.fromEntries(counts);
}

function readPhrases() {
  if (!fs.existsSync(PHRASES_DIR)) return { files: [], entries: [] };
  const files = [];
  const walk = (dir) => {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (name.endsWith('.json') && name !== 'index.json') files.push(full);
    }
  };
  walk(PHRASES_DIR);
  const entries = [];
  for (const file of files) {
    const content = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (Array.isArray(content)) entries.push(...content.filter((entry) => entry && typeof entry === 'object'));
  }
  return { files, entries };
}

function build() {
  const { files, entries: pairs } = readEntries(VOCABULARY_DIR);
  const entries = pairs.map((pair) => pair.entry);

  const byLanguage = new Map();
  for (const { entry, file } of pairs) {
    const code = path.relative(VOCABULARY_DIR, file).split(path.sep)[0];
    if (!byLanguage.has(code)) byLanguage.set(code, []);
    byLanguage.get(code).push(entry);
  }
  const languages = [...byLanguage.keys()].sort();
  const byLevel = levelCounts(entries);

  const themesSchema = JSON.parse(fs.readFileSync(THEMES_SCHEMA, 'utf8')).themes;
  const subThemeCount = Object.values(themesSchema).reduce((total, list) => total + list.length, 0);

  const themeEntries = tally(entries, (entry) => entry.theme);
  const themeLanguages = new Map();
  for (const entry of entries) {
    if (!entry.theme) continue;
    if (!themeLanguages.has(entry.theme)) themeLanguages.set(entry.theme, new Set());
    themeLanguages.get(entry.theme).add(entry.language);
  }

  const phrases = readPhrases();

  const stats = {
    schema_version: 1,
    counting_rule:
      'One entry is one object in a JSON array under vocabulary/<lang>/<level>/, excluding index.json, flat-index.json, search-index.json, themes-index.json, *-tracks.json and vocabulary/_canonical.',
    data_updated: entries.reduce((latest, entry) => (entry.updated && entry.updated > latest ? entry.updated : latest), ''),
    totals: {
      languages: languages.length,
      entries: entries.length,
      data_files: files.length,
      levels: LEVELS.filter((level) => byLevel[level] > 0).length,
      themes: Object.keys(themesSchema).length,
      sub_themes: subThemeCount,
      functional_phrases: phrases.entries.length,
      functional_phrase_languages: new Set(phrases.entries.map((entry) => entry.language)).size
    },
    by_level: byLevel,
    by_form: ranked(tally(entries, (entry) => entry.form)),
    coverage: coverageOf(entries),
    languages: languages.map((code) => {
      const languageEntries = byLanguage.get(code);
      return {
        code,
        entries: languageEntries.length,
        by_level: levelCounts(languageEntries),
        coverage: coverageOf(languageEntries),
        updated: languageEntries.reduce((latest, entry) => (entry.updated && entry.updated > latest ? entry.updated : latest), '')
      };
    }),
    themes: ranked(themeEntries).map(({ name, entries: count }) => ({
      theme: name,
      entries: count,
      languages: themeLanguages.get(name) ? themeLanguages.get(name).size : 0
    })),
    functional_phrases: {
      entries: phrases.entries.length,
      data_files: phrases.files.length,
      by_language: ranked(tally(phrases.entries, (entry) => entry.language)),
      by_level: ranked(tally(phrases.entries, (entry) => entry.level))
    }
  };

  return stats;
}

function main() {
  const stats = build();
  const serialised = JSON.stringify(stats, null, 2) + '\n';
  const summary = `${stats.totals.entries} entries, ${stats.totals.languages} languages, ${stats.totals.data_files} files, ${stats.totals.functional_phrases} phrases, data updated ${stats.data_updated}`;

  if (process.argv.includes('--check')) {
    const current = fs.existsSync(OUTPUT) ? fs.readFileSync(OUTPUT, 'utf8') : '';
    if (current !== serialised) {
      console.error(`stats.json is out of date (${summary}). Run: npm run build:stats`);
      process.exit(1);
    }
    console.log(`stats.json is up to date (${summary}).`);
    return;
  }

  fs.writeFileSync(OUTPUT, serialised);
  console.log(`stats.json: ${summary}`);
}

main();
