#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const schema = JSON.parse(fs.readFileSync(path.join(rootDir, 'schemas', 'themes.json'), 'utf8'));
const shared = JSON.parse(fs.readFileSync(path.join(rootDir, 'shared', 'themes.json'), 'utf8'));

const errors = [];

if (!schema.themes || typeof schema.themes !== 'object') {
  errors.push('schemas/themes.json is missing a themes object');
}
if (!shared.themes || typeof shared.themes !== 'object') {
  errors.push('shared/themes.json is missing a themes object');
}

if (errors.length === 0) {
  for (const [theme, schemaSubthemes] of Object.entries(schema.themes)) {
    if (!Array.isArray(schemaSubthemes)) continue;
    if (!Array.isArray(shared.themes[theme])) {
      errors.push(`shared/themes.json is missing schema theme '${theme}'`);
      continue;
    }
    for (const subtheme of schemaSubthemes) {
      if (!shared.themes[theme].includes(subtheme)) {
        errors.push(`shared/themes.json is missing schema sub-theme '${theme}/${subtheme}'`);
      }
    }
  }

  const macroThemes = new Set();
  for (const themes of Object.values(shared.macro_domains || {})) {
    if (Array.isArray(themes)) themes.forEach((theme) => macroThemes.add(theme));
  }
  for (const theme of Object.keys(shared.themes)) {
    if (!macroThemes.has(theme)) {
      errors.push(`shared/themes.json theme '${theme}' is not assigned to a macro domain`);
    }
  }
}

if (errors.length > 0) {
  console.error(`Theme taxonomy sync failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`  - ${error}`));
  process.exit(1);
}

console.log(
  `Theme taxonomy sync passed: ${Object.keys(schema.themes).length} schema themes are covered by ` +
  `${Object.keys(shared.themes).length} shared display themes.`
);
