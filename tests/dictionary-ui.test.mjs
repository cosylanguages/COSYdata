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
