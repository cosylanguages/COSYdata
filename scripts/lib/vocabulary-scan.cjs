/**
 * Canonical vocabulary walk.
 *
 * Every script that counts or audits entries must go through this module so that
 * "31,498 entries" means the same thing everywhere. The rule matches
 * scripts/validate.cjs and scripts/quality-audit.cjs:
 *
 *   one entry = one object in a JSON array under vocabulary/<lang>/<level>/
 *   excluding index.json, flat-index.json, search-index.json, themes-index.json,
 *   *-tracks.json and the vocabulary/_canonical staging tree.
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const INDEX_FILES = new Set([
  'index.json',
  'flat-index.json',
  'search-index.json',
  'themes-index.json'
]);

const LEVELS = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

function listEntryFiles(dir, { includeCanonical = false } = {}) {
  const files = [];
  const walk = (current) => {
    for (const name of fs.readdirSync(current)) {
      if (!includeCanonical && name === '_canonical') continue;
      const full = path.join(current, name);
      if (fs.statSync(full).isDirectory()) {
        walk(full);
      } else if (name.endsWith('.json') && !name.endsWith('-tracks.json') && !INDEX_FILES.has(name)) {
        files.push(full);
      }
    }
  };
  if (fs.existsSync(dir)) walk(dir);
  return files;
}

/** Reads every entry under `dir`; returns the files read and {entry, file} pairs. */
function readEntries(dir, options) {
  const files = listEntryFiles(dir, options);
  const entries = [];
  for (const file of files) {
    const content = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!Array.isArray(content)) continue;
    for (const entry of content) {
      if (entry && typeof entry === 'object') entries.push({ entry, file });
    }
  }
  return { files, entries };
}

module.exports = { INDEX_FILES, LEVELS, listEntryFiles, readEntries };
