/**
 * Validator product tests
 * -----------------------
 * The page must agree with the audit. These tests check the report the audit
 * publishes, then open the page and confirm it renders that report rather than a
 * second, hand-written opinion.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { startStaticServer } from './helpers/static-server.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPORT = JSON.parse(fs.readFileSync(path.join(ROOT, 'reports/quality.json'), 'utf8'));
const { RULES } = await import('../scripts/quality-audit.cjs').then((mod) => mod.default ?? mod);

test('the report is up to date with the entries on disk', () => {
  const output = execFileSync(process.execPath, ['scripts/build-quality-report.cjs', '--check'], {
    cwd: ROOT,
    encoding: 'utf8'
  });
  assert.match(output, /is up to date/);
});

test('every rule in the audit appears in the report, including the quiet ones', () => {
  assert.deepEqual(REPORT.rules.map((rule) => rule.code).sort(), Object.keys(RULES).sort());
  for (const rule of REPORT.rules) {
    assert.ok(rule.description.length > 0, `${rule.code} has a description`);
    assert.ok(Number.isInteger(rule.findings), `${rule.code} has a finding count`);
  }
});

test('the totals add up', () => {
  const byCode = REPORT.by_code.reduce((total, rule) => total + rule.findings, 0);
  assert.equal(byCode, REPORT.findings, 'by_code sums to findings');
  const rulesWithFindings = REPORT.rules.filter((rule) => rule.findings > 0).reduce((total, rule) => total + rule.findings, 0);
  assert.equal(rulesWithFindings, REPORT.findings, 'rules sum to findings');
  assert.ok(REPORT.new <= REPORT.findings, 'new findings cannot exceed findings');
  assert.ok(REPORT.entries_with_findings <= REPORT.entries, 'affected entries cannot exceed entries');
});

test('the page renders the published report', async () => {
  const { base, close } = await startStaticServer(ROOT);
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await (await browser.newContext()).newPage();
    const missing = [];
    const pageErrors = [];
    page.on('response', (response) => {
      if (response.status() >= 400) missing.push(`${response.status()} ${response.url()}`);
    });
    page.on('pageerror', (error) => pageErrors.push(error.message));

    await page.goto(`${base}products/validator/`, { waitUntil: 'networkidle' });
    await page.waitForSelector('body[data-rendered="true"]', { timeout: 15000 });

    assert.deepEqual(missing, [], 'no asset request fails');
    assert.deepEqual(pageErrors, [], 'no page errors');

    const shown = await page.locator('[data-stat="findings"]').innerText();
    assert.equal(Number(shown.replace(/[^0-9]/g, '')), REPORT.findings, 'tile shows the published finding count');

    const rules = await page.locator('#vd-rules tr').count();
    assert.equal(rules, REPORT.rules.length, 'every rule has a row');

    const cleanRows = await page.locator('#vd-rules .vd-badge-clean').count();
    assert.equal(cleanRows, REPORT.rules.filter((rule) => rule.findings === 0).length, 'clean rules are labelled');

    const levels = await page.locator('#vd-levels .vd-bar-row').count();
    assert.equal(levels, REPORT.by_level.length, 'one bar per level');

    const languages = await page.locator('#vd-languages tr').count();
    assert.equal(languages, REPORT.by_language.length, 'one row per language');
  } finally {
    await browser.close();
    await close();
  }
});
