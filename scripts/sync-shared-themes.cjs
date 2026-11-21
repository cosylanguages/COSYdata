#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const schemaPath = path.join(rootDir, 'schemas', 'themes.json');
const sharedPath = path.join(rootDir, 'shared', 'themes.json');
const dryRun = process.argv.includes('--dry-run');

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function main() {
  const schema = loadJson(schemaPath);
  const shared = loadJson(sharedPath);

  if (!schema.themes || typeof schema.themes !== 'object') {
    throw new Error('schemas/themes.json is missing a themes object');
  }
  if (!shared.themes || typeof shared.themes !== 'object') {
    throw new Error('shared/themes.json is missing a themes object');
  }

  const additions = [];
  for (const [theme, schemaSubthemes] of Object.entries(schema.themes)) {
    if (!Array.isArray(schemaSubthemes)) continue;
    if (!Array.isArray(shared.themes[theme])) {
      shared.themes[theme] = [];
      additions.push(`${theme} (theme)`);
    }
    for (const subtheme of schemaSubthemes) {
      if (!shared.themes[theme].includes(subtheme)) {
        shared.themes[theme].push(subtheme);
        additions.push(`${theme}/${subtheme}`);
      }
    }
  }

  console.log(`Schema themes: ${Object.keys(schema.themes).length}`);
  console.log(`Shared display themes: ${Object.keys(shared.themes).length}`);
  console.log(`Missing schema entries in shared: ${additions.length}`);
  additions.forEach((entry) => console.log(`  + ${entry}`));

  if (dryRun) {
    console.log('Dry run: shared/themes.json was not changed.');
    return;
  }

  fs.writeFileSync(sharedPath, `${JSON.stringify(shared, null, 2)}\n`, 'utf8');
  console.log('Updated shared/themes.json');
}

main();
