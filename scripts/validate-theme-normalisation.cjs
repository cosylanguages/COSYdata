#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const INCLUDE_STAGING = process.argv.includes('--include-staging');
const ALLOW_MISSING_THEME = process.argv.includes('--allow-missing-theme') || INCLUDE_STAGING;
const schema = JSON.parse(fs.readFileSync(path.join(ROOT, 'schemas/themes.json'), 'utf8'));
const THEMES = schema.themes;
const THEME_KEYS = new Set(Object.keys(THEMES));

function walkJsonFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const item of fs.readdirSync(dir).sort()) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) results.push(...walkJsonFiles(fullPath));
    else if (item.endsWith('.json') && !['index.json', 'themes-index.json', 'flat-index.json', 'search-index.json'].includes(item)) {
      results.push(fullPath);
    }
  }
  return results;
}

function languageDirs() {
  const vocabularyDir = path.join(ROOT, 'vocabulary');
  return fs.readdirSync(vocabularyDir)
    .filter((name) => fs.statSync(path.join(vocabularyDir, name)).isDirectory())
    .filter((name) => INCLUDE_STAGING || !name.startsWith('_'))
    .sort();
}

function validPair(theme, subTheme) {
  return Boolean(theme) && THEME_KEYS.has(theme) && Array.isArray(THEMES[theme]) && THEMES[theme].includes(subTheme);
}

function validateSecondaryThemes(entry, relPath, errors) {
  if (!Array.isArray(entry.secondary_themes)) return;
  for (const value of entry.secondary_themes) {
    if (typeof value !== 'string') {
      errors.push(`${relPath} (${entry.id}): secondary_themes contains a non-string value`);
      continue;
    }
    if (value.includes('/')) {
      const [theme, subTheme] = value.split('/', 2);
      if (!validPair(theme, subTheme)) {
        errors.push(`${relPath} (${entry.id}): secondary_theme '${value}' is not valid`);
      }
    } else if (!THEME_KEYS.has(value)) {
      errors.push(`${relPath} (${entry.id}): secondary_theme '${value}' is not valid`);
    }
  }
}

function main() {
  const errors = [];
  let entries = 0;
  let missingTheme = 0;

  for (const lang of languageDirs()) {
    for (const filePath of walkJsonFiles(path.join(ROOT, 'vocabulary', lang))) {
      const relPath = path.relative(ROOT, filePath).split(path.sep).join('/');
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (!Array.isArray(data)) continue;
      for (const entry of data) {
        if (!entry || typeof entry !== 'object') continue;
        entries += 1;
        if (!entry.theme) {
          missingTheme += 1;
          if (!ALLOW_MISSING_THEME) {
            errors.push(`${relPath} (${entry.id}): missing theme`);
          }
          continue;
        }
        if (!THEME_KEYS.has(entry.theme)) {
          errors.push(`${relPath} (${entry.id}): theme '${entry.theme}' is not in schemas/themes.json`);
          continue;
        }
        if (!entry.sub_theme) {
          errors.push(`${relPath} (${entry.id}): theme '${entry.theme}' has no sub_theme`);
        } else if (!validPair(entry.theme, entry.sub_theme)) {
          errors.push(`${relPath} (${entry.id}): sub_theme '${entry.sub_theme}' is not valid for theme '${entry.theme}'`);
        }
        validateSecondaryThemes(entry, relPath, errors);
      }
    }
  }

  for (const lang of languageDirs()) {
    const themesIndexPath = path.join(ROOT, 'vocabulary', lang, 'themes-index.json');
    if (!fs.existsSync(themesIndexPath)) continue;
    const themesIndex = JSON.parse(fs.readFileSync(themesIndexPath, 'utf8'));
    for (const key of Object.keys(themesIndex)) {
      if (key.includes('/')) {
        const [theme, subTheme] = key.split('/', 2);
        if (!validPair(theme, subTheme)) {
          errors.push(`vocabulary/${lang}/themes-index.json: key '${key}' is not valid`);
        }
      } else if (!THEME_KEYS.has(key)) {
        errors.push(`vocabulary/${lang}/themes-index.json: key '${key}' is not valid`);
      }
    }
  }

  if (errors.length) {
    console.error(`Theme normalisation validation failed with ${errors.length} error(s):`);
    for (const error of errors.slice(0, 100)) console.error(`- ${error}`);
    if (errors.length > 100) console.error(`...and ${errors.length - 100} more`);
    process.exit(1);
  }

  console.log(
    `Theme normalisation validation passed: ${entries} entries, ${missingTheme} without a theme` +
    `${ALLOW_MISSING_THEME ? ' (allowed)' : ''}, 0 invalid themes/sub-themes.`
  );
}

main();
