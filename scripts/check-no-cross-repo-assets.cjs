#!/usr/bin/env node
/**
 * Fails when COSYdata loads a CSS, JavaScript, font or image asset from a
 * sibling repository at runtime, or references a local asset that does not exist.
 *
 * Navigation links (<a href>) and canonical/OG metadata are allowed: they point
 * at other sites without depending on them. Everything that the browser must
 * fetch to render this site has to live in this repository.
 *
 * Data endpoints (JSON fetches) are deliberately out of scope; see
 * docs/independence.md for the remaining data-plane couplings.
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const SKIP_DIRS = new Set(['.git', 'node_modules', 'shared/vendor', 'reports/archive']);

const SIBLING_ORIGIN = 'https://cosylanguages.github.io/';
const RESOURCE_EXTENSIONS = 'css|mjs|js|woff2?|ttf|otf|eot|png|jpe?g|gif|svg|webp|ico|mp3|wav|ogg|mp4|webm';
const REL_LINK_ALLOWED = /canonical|alternate|author|license|me\b|dns-prefetch|preconnect|search/i;
const ASSET_TAGS = 'script|img|iframe|source|video|audio|embed';

function isSiblingAsset(url) {
  if (!/^(?:https?:)?\/\//i.test(url)) return false;
  let parsed;
  try {
    parsed = new URL(url, SIBLING_ORIGIN);
  } catch {
    return false;
  }
  if (parsed.hostname !== 'cosylanguages.github.io') return false;
  const p = parsed.pathname;
  return !(p === '/COSYdata' || p.startsWith('/COSYdata/'));
}

function lineOf(source, index) {
  return source.slice(0, index).split('\n').length;
}

function htmlAssetRefs(source) {
  const refs = [];

  for (const match of source.matchAll(/<link\b[^>]*>/gi)) {
    const tag = match[0];
    const rel = (tag.match(/\brel\s*=\s*["']([^"']*)["']/i) || [])[1] || '';
    if (REL_LINK_ALLOWED.test(rel)) continue;
    const href = (tag.match(/\bhref\s*=\s*["']([^"']*)["']/i) || [])[1];
    if (href) refs.push({ line: lineOf(source, match.index), url: href, where: `<link rel="${rel}">` });
  }

  for (const match of source.matchAll(new RegExp(`<(${ASSET_TAGS})\\b[^>]*>`, 'gi'))) {
    const tag = match[0];
    const tagName = match[1].toLowerCase();
    for (const attribute of ['src', 'poster']) {
      const value = (tag.match(new RegExp(`\\b${attribute}\\s*=\\s*["']([^"']*)["']`, 'i')) || [])[1];
      if (value) refs.push({ line: lineOf(source, match.index), url: value, where: `<${tagName} ${attribute}>` });
    }
    const srcset = (tag.match(/\bsrcset\s*=\s*["']([^"']*)["']/i) || [])[1];
    if (srcset) {
      for (const candidate of srcset.split(',')) {
        const value = candidate.trim().split(/\s+/)[0];
        if (value) refs.push({ line: lineOf(source, match.index), url: value, where: `<${tagName} srcset>` });
      }
    }
  }

  return refs;
}

function cssAssetRefs(source) {
  const refs = [];
  const pattern = /(?:@import\s+(?:url\()?["']?([^"')\s]+)|url\(["']?([^"')\s]+))/gi;
  for (const match of source.matchAll(pattern)) {
    const url = match[1] || match[2];
    if (url) refs.push({ line: lineOf(source, match.index), url, where: 'stylesheet reference' });
  }
  return refs;
}

function jsAssetUrls(source) {
  const refs = [];
  const pattern = new RegExp(`["'\`](https?://[^"'\`\\s]+\\.(?:${RESOURCE_EXTENSIONS}))["'\`]`, 'gi');
  for (const match of source.matchAll(pattern)) {
    refs.push({ line: lineOf(source, match.index), url: match[1], where: 'asset URL string' });
  }
  return refs;
}

/** Resolves a same-repository reference, or returns null for external and non-file references. */
function localPath(fromFile, url) {
  if (!url || /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(url)) return null;
  const clean = url.split(/[?#]/)[0];
  if (!clean) return null;
  return path.resolve(path.dirname(fromFile), clean);
}

const CHECKERS = {
  '.html': htmlAssetRefs,
  '.css': cssAssetRefs,
  '.js': jsAssetUrls,
  '.mjs': jsAssetUrls,
  '.cjs': jsAssetUrls
};

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(ROOT, full).split(path.sep).join('/');
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(rel) || SKIP_DIRS.has(entry.name)) continue;
      walk(full, files);
    } else {
      files.push(full);
    }
  }
  return files;
}

let siblingCount = 0;
let missingCount = 0;
let scanned = 0;

for (const file of walk(ROOT)) {
  const collect = CHECKERS[path.extname(file).toLowerCase()];
  if (!collect) continue;
  scanned += 1;

  const source = fs.readFileSync(file, 'utf8');
  const rel = path.relative(ROOT, file).split(path.sep).join('/');

  for (const ref of collect(source)) {
    if (isSiblingAsset(ref.url)) {
      siblingCount += 1;
      console.error(`${rel}:${ref.line}  ${ref.where} loads a sibling repository asset`);
      console.error(`    ${ref.url}`);
      console.error('    Fix: vendor it into shared/vendor/ (npm run sync:ecosystem-assets) and reference the local copy.');
      continue;
    }
    const resolved = localPath(file, ref.url);
    if (resolved && !fs.existsSync(resolved)) {
      missingCount += 1;
      console.error(`${rel}:${ref.line}  ${ref.where} points at a missing local file`);
      console.error(`    ${ref.url}`);
      console.error(`    Expected ${path.relative(ROOT, resolved)}`);
    }
  }
}

if (siblingCount || missingCount) {
  console.error(`\n${siblingCount} cross-repository asset reference(s), ${missingCount} missing local asset(s), in ${scanned} file(s).`);
  process.exit(1);
}

console.log(`No cross-repository or missing runtime assets in ${scanned} file(s).`);
