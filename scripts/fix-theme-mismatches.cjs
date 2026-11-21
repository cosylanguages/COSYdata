#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const vocabularyDir = path.join(rootDir, 'vocabulary');
const correctionsPath = path.join(__dirname, 'theme-mismatch-corrections.json');
const dryRun = process.argv.includes('--dry-run');
const today = new Date().toISOString().slice(0, 10);

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

function main() {
  const corrections = JSON.parse(fs.readFileSync(correctionsPath, 'utf8'));
  const byId = new Map(corrections.map((item) => [item.id, item]));
  const applied = new Map();
  const missing = [];
  const skipped = [];
  const seen = new Set();
  let alreadyApplied = 0;
  let changedFiles = 0;

  const files = fs
    .readdirSync(vocabularyDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !SKIP_DIRS.has(entry.name))
    .flatMap((entry) => walkJsonFiles(path.join(vocabularyDir, entry.name)));

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!Array.isArray(data)) continue;
    let fileChanged = 0;

    for (const entry of data) {
      const correction = byId.get(entry.id);
      if (!correction) continue;
      seen.add(entry.id);
      const current = `${entry.theme || ''}/${entry.sub_theme || ''}`;
      if (current === correction.to) {
        alreadyApplied += 1;
        continue;
      }
      if (current !== correction.from) {
        skipped.push(`${entry.id}: expected ${correction.from}, found ${current}`);
        continue;
      }
      const [theme, subTheme] = correction.to.split('/', 2);
      entry.theme = theme;
      entry.sub_theme = subTheme;
      entry.updated = today;
      applied.set(correction.to, (applied.get(correction.to) || 0) + 1);
      fileChanged += 1;
    }

    if (fileChanged > 0) {
      changedFiles += 1;
      if (!dryRun) {
        fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
      }
    }
  }

  for (const correction of corrections) {
    if (!seen.has(correction.id)) missing.push(correction.id);
  }

  const total = [...applied.values()].reduce((sum, count) => sum + count, 0);
  console.log(`${dryRun ? 'Theme mismatch fix (dry run)' : 'Theme mismatch fix'}`);
  console.log(`Corrections loaded: ${corrections.length}`);
  console.log(`Entries changed: ${total} across ${changedFiles} files`);
  if (alreadyApplied > 0) console.log(`Already applied: ${alreadyApplied}`);
  [...applied.entries()]
    .sort((a, b) => b[1] - a[1])
    .forEach(([target, count]) => console.log(`  ${target}: ${count}`));
  if (skipped.length > 0) {
    console.log(`Skipped (current theme changed): ${skipped.length}`);
    skipped.slice(0, 20).forEach((line) => console.log(`  - ${line}`));
  }
  if (missing.length > 0) {
    console.log(`Missing entries: ${missing.length}`);
    missing.slice(0, 20).forEach((id) => console.log(`  - ${id}`));
  }
}

main();
