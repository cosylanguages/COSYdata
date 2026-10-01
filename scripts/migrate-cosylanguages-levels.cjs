const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');
const targetRoot = path.join(rootDir, 'vocabulary');
const levelOrder = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const sourceLevels = new Set(['A2', 'B1', 'B2', 'C1', 'C2']);

function parseArgs() {
  const args = process.argv.slice(2);
  const sourceIndex = args.indexOf('--source');
  const sourceRoot = sourceIndex >= 0 ? args[sourceIndex + 1] : null;
  const apply = args.includes('--apply');

  if (!sourceRoot || sourceIndex === args.length - 1) {
    console.error('Usage: node scripts/migrate-cosylanguages-levels.cjs --source <COSYlanguages/vocabulary> [--apply]');
    process.exit(1);
  }

  return { sourceRoot: path.resolve(sourceRoot), apply };
}

function normalizeWord(value) {
  return String(value || '').normalize('NFKC').toLowerCase().trim().replace(/\s+/g, ' ');
}

function normalizeForm(value) {
  const form = String(value || '').toLowerCase();
  return {
    'noun phrase': 'noun',
    'adjective / adverb': 'adjective',
    other: 'phrase'
  }[form] || form;
}

function getJsonFiles(dir) {
  let files = [];
  if (!fs.existsSync(dir)) return files;

  for (const name of fs.readdirSync(dir)) {
    const filePath = path.join(dir, name);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (!name.startsWith('_')) files = files.concat(getJsonFiles(filePath));
    } else if (
      name.endsWith('.json') &&
      !['index.json', 'flat-index.json', 'search-index.json'].includes(name)
    ) {
      files.push(filePath);
    }
  }

  return files;
}

function collectSourceLevels(sourceRoot) {
  const levelsByKey = new Map();

  for (const language of fs.readdirSync(sourceRoot)) {
    if (!/^[a-z]{2}$/.test(language)) continue;
    const languageDir = path.join(sourceRoot, language);
    if (!fs.statSync(languageDir).isDirectory()) continue;

    for (const level of levelOrder) {
      if (!sourceLevels.has(level)) continue;
      const levelDir = path.join(languageDir, level);
      if (!fs.existsSync(levelDir)) continue;

      function visit(dir) {
        for (const name of fs.readdirSync(dir)) {
          const filePath = path.join(dir, name);
          if (fs.statSync(filePath).isDirectory()) {
            visit(filePath);
            continue;
          }
          if (!name.endsWith('.js')) continue;

          const window = {};
          const module = { exports: {} };
          try {
            const code = fs.readFileSync(filePath, 'utf8');
            vm.runInNewContext(code, { window, module, exports: module.exports, console: { log() {}, warn() {}, error() {} } }, {
              filename: filePath,
              timeout: 1000
            });
          } catch (error) {
            console.warn(`[SKIP] Could not evaluate ${filePath}: ${error.message}`);
            continue;
          }

          const entriesByLanguage = window.vocabularyData || {};
          const exportedEntries = Object.entries(entriesByLanguage)
            .filter(([entryLanguage, entries]) => entryLanguage === language && Array.isArray(entries))
            .flatMap(([, entries]) => entries);
          if (Array.isArray(module.exports)) exportedEntries.push(...module.exports);

          for (const entry of exportedEntries) {
            const word = normalizeWord(entry.word);
            const form = normalizeForm(entry.form || entry.pos);
            if (!word || !form) continue;

            const entryLanguage = entry.language || entry.lang || language;
            const key = `${entryLanguage}|${word}|${form}`;
            if (!levelsByKey.has(key)) levelsByKey.set(key, new Set());
            levelsByKey.get(key).add(level);
          }
        }
      }

      visit(levelDir);
    }
  }

  return levelsByKey;
}

function main() {
  const { sourceRoot, apply } = parseArgs();
  if (!fs.existsSync(sourceRoot)) {
    console.error(`Source directory not found: ${sourceRoot}`);
    process.exit(1);
  }

  const sourceLevelsByKey = collectSourceLevels(sourceRoot);
  const targetsByKey = new Map();
  const targetFiles = new Map();

  for (const filePath of getJsonFiles(targetRoot)) {
    try {
      const entries = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (!Array.isArray(entries)) continue;
      targetFiles.set(filePath, entries);
      const relativePath = path.relative(targetRoot, filePath).split(path.sep);
      const language = relativePath[0];

      for (const entry of entries) {
        const word = normalizeWord(entry.word);
        const form = normalizeForm(entry.form);
        if (!word || !form) continue;
        const key = `${language}|${word}|${form}`;
        if (!targetsByKey.has(key)) targetsByKey.set(key, []);
        targetsByKey.get(key).push({ entry, filePath });
      }
    } catch (error) {
      console.error(`Could not parse ${filePath}: ${error.message}`);
      process.exit(1);
    }
  }

  let missing = 0;
  let ambiguous = 0;
  let alreadyRepresented = 0;
  let changedEntries = 0;
  const changedFiles = new Set();

  for (const [key, sourceLevelsForKey] of sourceLevelsByKey) {
    const matches = targetsByKey.get(key) || [];
    if (matches.length === 0) {
      missing++;
      continue;
    }
    if (matches.length !== 1) {
      ambiguous++;
      continue;
    }

    const { entry, filePath } = matches[0];
    const existingLevels = new Set([
      ...(Array.isArray(entry.levels) ? entry.levels : []),
      ...(entry.level ? [entry.level] : [])
    ]);
    const mergedLevels = new Set([...existingLevels, ...sourceLevelsForKey]);
    const orderedLevels = [...mergedLevels].sort((a, b) => levelOrder.indexOf(a) - levelOrder.indexOf(b));

    if (orderedLevels.length <= 1) {
      alreadyRepresented++;
      continue;
    }

    const levelsChanged = !Array.isArray(entry.levels) ||
      orderedLevels.length !== entry.levels.length ||
      orderedLevels.some((level, index) => level !== entry.levels[index]);

    if (!levelsChanged) {
      alreadyRepresented++;
      continue;
    }

    entry.levels = orderedLevels;
    entry.updated = new Date().toISOString().slice(0, 10);
    changedEntries++;
    changedFiles.add(filePath);
  }

  console.log(`Source unique word/form pairs: ${sourceLevelsByKey.size}`);
  console.log(`No target match: ${missing}`);
  console.log(`Ambiguous target matches skipped: ${ambiguous}`);
  console.log(`Already represented in target level metadata: ${alreadyRepresented}`);
  console.log(`Entries to update: ${changedEntries} across ${changedFiles.size} file(s)`);
  console.log(apply ? 'Mode: APPLY' : 'Mode: DRY RUN (pass --apply to write changes)');

  if (apply) {
    for (const filePath of changedFiles) {
      fs.writeFileSync(filePath, JSON.stringify(targetFiles.get(filePath), null, 2) + '\n', 'utf8');
    }
    console.log('CEFR level metadata migration applied.');
  }
}

main();