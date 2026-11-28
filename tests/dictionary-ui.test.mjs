/**
 * Dictionary UI rendering tests
 * -----------------------------
 * The dictionary page is the most visited page in the repository and had no
 * test that looked at it as a user does. Two filters were dead: the theme tiles
 * read a sub-theme map that the page never received, and the level view read a
 * theme map that was never received either. Both threw a ReferenceError on every
 * render, which the browser reported and nothing caught.
 *
 * These tests render the page, fail on any page error, and click through the
 * three browse modes.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { startStaticServer } from './helpers/static-server.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('the dictionary page renders and its browse modes work', async () => {
  const { base, close } = await startStaticServer(ROOT);
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await (await browser.newContext()).newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });

    await page.goto(base + 'vocabulary/en/', { waitUntil: 'networkidle' });
    await page.waitForSelector('.cosy-dict-wotd-word', { timeout: 20000 });
    assert.deepEqual(errors, [], 'rendering the dictionary raises no page errors');

    const tiles = page.locator('.cosy-dict-tile-card');
    const tileCount = await tiles.count();
    assert.ok(tileCount > 0, 'themes are listed');
    const tileText = await tiles.first().innerText();
    assert.match(tileText, /sub-themes/, 'a theme tile reports how many sub-themes it has');

    await tiles.first().click();
    await page.waitForSelector('.cosy-dict-subnav-chips [data-subnav]', { timeout: 10000 });
    const subChips = await page.locator('.cosy-dict-subnav-chips [data-subnav]').count();
    assert.ok(subChips > 1, 'opening a theme lists its sub-themes');

    await page.goto(base + 'vocabulary/en/', { waitUntil: 'networkidle' });
    await page.waitForSelector('.cosy-dict-level-card', { timeout: 20000 });
    await page.locator('.cosy-dict-level-card').first().click();
    await page.waitForSelector('.cosy-dict-subnav-chips [data-subnav-theme]', { timeout: 10000 });
    const themeChips = await page.locator('.cosy-dict-subnav-chips [data-subnav-theme]').count();
    assert.ok(themeChips > 1, 'opening a level lists its themes');

    assert.deepEqual(errors, [], 'browsing raises no page errors');
  } finally {
    await browser.close();
    await close();
  }
});

test('an entry shows its own antonyms, and placeholders never reach the chips', async () => {
  const { base, close } = await startStaticServer(ROOT);
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await (await browser.newContext()).newPage();
    await page.goto(base + 'vocabulary/en/', { waitUntil: 'networkidle' });
    await page.waitForSelector('.cosy-dict-search-input', { timeout: 20000 });

    await page.fill('.cosy-dict-search-input', 'easy');
    await page.keyboard.press('Enter'); // closes the autocomplete overlay
    const card = page
      .locator('.cosy-dict-card')
      .filter({ has: page.locator('.cosy-dict-headword', { hasText: /^easy$/i }) })
      .first();
    await card.locator('.cosy-dict-expand-btn').click();
    await page.waitForSelector('.cosy-dict-chip-antonym', { timeout: 10000 });

    const antonyms = await page.locator('.cosy-dict-chip-antonym').allInnerTexts();
    assert.deepEqual(antonyms.sort(), ['difficult', 'hard'], 'the entry renders the antonyms it stores');

    const chips = await page.locator('.cosy-dict-chip').allInnerTexts();
    assert.ok(
      !chips.some((chip) => chip.trim().toLowerCase().startsWith('no_')),
      `no placeholder chip rendered, got: ${chips.join(' | ')}`
    );
  } finally {
    await browser.close();
    await close();
  }
});

test('a polysemous headword shows sense labels and its word family', async () => {
  const { base, close } = await startStaticServer(ROOT);
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await (await browser.newContext()).newPage();
    await page.goto(base + 'vocabulary/en/', { waitUntil: 'networkidle' });
    await page.waitForSelector('.cosy-dict-search-input', { timeout: 20000 });

    await page.fill('.cosy-dict-search-input', 'bank');
    await page.keyboard.press('Enter');
    await page.waitForSelector('.cosy-dict-sense-label', { timeout: 10000 });
    const labels = await page.locator('.cosy-dict-sense-label').allInnerTexts();
    assert.ok(labels.includes('land beside a river'), `the river sense has a label, got: ${labels.join(' | ')}`);
    assert.ok(labels.includes('financial institution'), `the finance sense has a label, got: ${labels.join(' | ')}`);

    await page.fill('.cosy-dict-search-input', 'season');
    await page.keyboard.press('Enter');
    await page.waitForSelector('.cosy-dict-sense-label:has-text("add flavour to food")', { timeout: 10000 });
    const card = page
      .locator('.cosy-dict-card')
      .filter({ has: page.locator('.cosy-dict-sense-label', { hasText: 'add flavour to food' }) })
      .first();
    await card.locator('.cosy-dict-expand-btn').click();
    await page.waitForSelector('.cosy-dict-chip-derivative', { timeout: 10000 });
    const family = await page.locator('.cosy-dict-chip-derivative').allInnerTexts();
    assert.ok(family.some((chip) => chip.startsWith('seasoning')), `the verb shows its family, got: ${family.join(' | ')}`);
  } finally {
    await browser.close();
    await close();
  }
});

