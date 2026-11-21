#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const vocabularyDir = path.join(rootDir, 'vocabulary');
const schema = JSON.parse(fs.readFileSync(path.join(rootDir, 'schemas', 'themes.json'), 'utf8'));
const dryRun = process.argv.includes('--dry-run');
const today = new Date().toISOString().slice(0, 10);

const FORM_DEFAULTS = {
  noun: ['general', 'miscellaneous'],
  adjective: ['descriptors', 'general'],
  verb: ['actions', 'general'],
  phrase: ['communication', 'general'],
  idiom: ['communication', 'general'],
  adverb: ['grammar', 'adverbs'],
  conjunction: ['grammar', 'conjunctions_connectors'],
  determiner: ['grammar', 'general'],
  preposition: ['grammar', 'prepositions_spatial'],
  postposition: ['grammar', 'general'],
  particle: ['grammar', 'general'],
};

const SKIP_FILES = new Set(['index.json', 'themes-index.json', 'search-index.json', 'flat-index.json']);
const SKIP_DIRS = new Set(['_canonical']);

function walkJsonFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walkJsonFiles(full, files);
    } else if (entry.isFile() && entry.name.endsWith('.json') && !SKIP_FILES.has(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function withThemeFields(entry, theme, subTheme) {
  const out = {};
  let inserted = false;
  for (const [key, value] of Object.entries(entry)) {
    if (key === 'theme' || key === 'sub_theme' || key === 'updated') continue;
    if (key === 'updated' && !inserted) {
      out.theme = theme;
      out.sub_theme = subTheme;
      inserted = true;
    }
    out[key] = value;
  }
  if (!inserted) {
    out.theme = theme;
    out.sub_theme = subTheme;
  }
  out.updated = today;
  return out;
}

function main() {
  const files = fs
    .readdirSync(vocabularyDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !SKIP_DIRS.has(entry.name))
    .flatMap((entry) => walkJsonFiles(path.join(vocabularyDir, entry.name)));
  const countsByForm = {};
  const countsByFile = {};
  const unmapped = [];
  let changedEntries = 0;
  let changedFiles = 0;

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!Array.isArray(data)) continue;

    const fileStem = path.basename(file, '.json');
    let changedInFile = 0;
    const next = data.map((entry) => {
      if (typeof entry.theme === 'string' && entry.theme.trim() !== '') return entry;
      const form = entry.form || fileStem;
      const target = FORM_DEFAULTS[form];
      if (!target) {
        unmapped.push(`${entry.id || file}:${form}`);
        return entry;
      }
      const [theme, subTheme] = target;
      countsByForm[form] = (countsByForm[form] || 0) + 1;
      countsByFile[file] = (countsByFile[file] || 0) + 1;
      changedInFile += 1;
      return withThemeFields(entry, theme, subTheme);
    });

    if (changedInFile > 0) {
      changedEntries += changedInFile;
      changedFiles += 1;
      if (!dryRun) {
        fs.writeFileSync(file, `${JSON.stringify(next, null, 2)}\n`, 'utf8');
      }
    }
  }

  console.log(`${dryRun ? 'Form-theme backfill (dry run)' : 'Form-theme backfill'}`);
  console.log(`Files scanned: ${files.length}`);
  console.log(`Entries changed: ${changedEntries} across ${changedFiles} files`);
  Object.entries(countsByForm)
    .sort((a, b) => b[1] - a[1])
    .forEach(([form, count]) => console.log(`  ${form}: ${count}`));
  if (unmapped.length > 0) {
    console.log(`Unmapped entries: ${unmapped.length}`);
    unmapped.slice(0, 20).forEach((entry) => console.log(`  - ${entry}`));
  }

  if (!dryRun) {
    const invalid = Object.entries(FORM_DEFAULTS).filter(
      ([, [theme, subtheme]]) => !schema.themes[theme] || !schema.themes[theme].includes(subtheme)
    );
    if (invalid.length > 0) {
      console.error('Invalid form defaults:');
      invalid.forEach(([form, [theme, subtheme]]) => console.error(`  ${form}: ${theme}/${subtheme}`));
      process.exit(1);
    }
  }
}

main();
