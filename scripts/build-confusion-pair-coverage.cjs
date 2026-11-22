#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const taxonomyPath = path.join(ROOT, 'taxonomy', 'vocab-confusion-pairs.json');
const flatIndexPath = path.join(ROOT, 'vocabulary', 'en', 'flat-index.json');

const taxonomy = JSON.parse(fs.readFileSync(taxonomyPath, 'utf8'));
const flatIndex = JSON.parse(fs.readFileSync(flatIndexPath, 'utf8'));

function hasEntry(term) {
  if (!term) return false;
  return Boolean(flatIndex[String(term).toLowerCase().trim()]);
}

let covered = 0;
let uncovered = 0;
for (const entries of Object.values(taxonomy.levels)) {
  for (const pair of entries) {
    pair.covered = hasEntry(pair.termA) && hasEntry(pair.termB);
    if (pair.covered) covered += 1;
    else uncovered += 1;
  }
}

fs.writeFileSync(taxonomyPath, JSON.stringify(taxonomy, null, 2) + '\n');
console.log(`vocabulary confusion pairs: ${covered} covered, ${uncovered} uncovered`);
