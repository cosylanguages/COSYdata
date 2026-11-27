/**
 * Product contract tests
 * ----------------------
 * A product is a folder that a reader can copy. That claim is only worth
 * something if it is checked, so these tests read each product's own files and
 * assert that everything it reaches for is either inside the folder or one of
 * the declared shared/data paths. A product that starts importing another
 * product fails here.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PRODUCTS = path.join(ROOT, 'products');
const PRODUCT_DIRS = fs
  .readdirSync(PRODUCTS, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
  .map((entry) => entry.name);

const EXTERNAL = /^(https?:|mailto:|#|\/$)/;
const SHARED_PREFIXES = ['shared/'];
const DATA_FILES = ['stats.json', 'reports/quality.json', 'reports/quality-baseline.json'];
const ASSET_EXTENSIONS = /\.(css|js|json|png|svg|woff2?|ico)$/;

// Assets are loaded by the page; navigation is only a link a reader may follow.
function references(source) {
  const assets = new Set();
  const navigation = new Set();
  for (const match of source.matchAll(/src="([^"]+)"/g)) assets.add(match[1]);
  for (const match of source.matchAll(/new URL\('([^']+)'/g)) assets.add(match[1]);
  for (const match of source.matchAll(/href="([^"]+)"/g)) {
    (ASSET_EXTENSIONS.test(match[1]) ? assets : navigation).add(match[1]);
  }
  const clean = (set) => [...set].filter((ref) => !EXTERNAL.test(ref) && !ref.startsWith('data:'));
  return { assets: clean(assets), navigation: clean(navigation) };
}

function resolve(productDir, ref) {
  return path.relative(ROOT, path.resolve(PRODUCTS, productDir, ref)).split(path.sep).join('/');
}

function isAllowed(productDir, target) {
  return target.startsWith(`products/${productDir}/`) || SHARED_PREFIXES.some((prefix) => target.startsWith(prefix)) || DATA_FILES.includes(target);
}

test('every product has markup, styles, script and a README', () => {
  assert.ok(PRODUCT_DIRS.length >= 2, 'at least two products exist');
  for (const dir of PRODUCT_DIRS) {
    const files = fs.readdirSync(path.join(PRODUCTS, dir));
    for (const required of ['index.html', 'README.md']) {
      assert.ok(files.includes(required), `${dir} has ${required}`);
    }
    assert.ok(files.some((file) => file.endsWith('.css')), `${dir} has a stylesheet`);
    assert.ok(files.some((file) => file.endsWith('.js')), `${dir} has a script`);
  }
});

test('a product only reaches into itself, shared, or a declared data file', () => {
  for (const dir of PRODUCT_DIRS) {
    const folder = path.join(PRODUCTS, dir);
    const sources = fs
      .readdirSync(folder)
      .filter((file) => /\.(html|css|js)$/.test(file))
      .map((file) => fs.readFileSync(path.join(folder, file), 'utf8'));

    for (const source of sources) {
      const { assets, navigation } = references(source);
      for (const ref of assets) {
        const target = resolve(dir, ref);
        assert.ok(isAllowed(dir, target), `${dir} may not load ${target}`);
        assert.ok(fs.existsSync(path.join(ROOT, target)), `${dir} loads a missing file: ${target}`);
      }
      for (const ref of navigation) {
        const target = resolve(dir, ref);
        assert.ok(fs.existsSync(path.join(ROOT, target)), `${dir} links to a missing file: ${target}`);
      }
    }
  }
});

test('a product does not reference another product', () => {
  for (const dir of PRODUCT_DIRS) {
    const others = PRODUCT_DIRS.filter((other) => other !== dir);
    for (const file of fs.readdirSync(path.join(PRODUCTS, dir))) {
      if (!/\.(html|css|js|md)$/.test(file)) continue;
      const source = fs.readFileSync(path.join(PRODUCTS, dir, file), 'utf8');
      for (const other of others) {
        assert.ok(!source.includes(`/products/${other}/`), `${dir}/${file} links to the ${other} product`);
      }
    }
  }
});

test('the README names every file the product depends on', () => {
  for (const dir of PRODUCT_DIRS) {
    const folder = path.join(PRODUCTS, dir);
    const readme = fs.readFileSync(path.join(folder, 'README.md'), 'utf8');
    const sources = fs
      .readdirSync(folder)
      .filter((file) => /\.(html|css|js)$/.test(file))
      .map((file) => fs.readFileSync(path.join(folder, file), 'utf8'));

    const declared = new Set();
    for (const source of sources) {
      const { assets } = references(source);
      for (const ref of assets) {
        const target = resolve(dir, ref);
        if (target.startsWith(`products/${dir}/`)) continue;
        declared.add(target);
      }
    }

    for (const target of declared) {
      assert.ok(readme.includes(target), `${dir}/README.md does not mention ${target}`);
    }
  }
});
