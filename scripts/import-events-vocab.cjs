const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const Ajv2020 = require('ajv/dist/2020');
const addFormats = require('ajv-formats');

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeLevel(levelStr) {
  if (!levelStr || typeof levelStr !== 'string') return null;
  const upper = levelStr.trim().toUpperCase();
  const validLevels = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  if (validLevels.includes(upper)) return upper;
  return null;
}

function levelToDir(level) {
  if (level === 'A0' || level === 'A1') return 'a0_a1';
  if (level === 'A2') return 'a2';
  if (level === 'B1') return 'b1';
  if (level === 'B2') return 'b2';
  if (level === 'C1') return 'c1';
  if (level === 'C2') return 'c2';
  return null;
}

function loadThemes(rootDir) {
  const themesPath = path.join(rootDir, 'shared', 'themes.json');
  if (fs.existsSync(themesPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(themesPath, 'utf8'));
      return data.themes || {};
    } catch (err) {
      console.warn(`[WARNING] Could not parse shared/themes.json: ${err.message}`);
    }
  }
  return {};
}

function loadVocabularySchema(rootDir) {
  const schemaPath = path.join(rootDir, 'schemas', 'vocabulary.schema.json');
  if (!fs.existsSync(schemaPath)) {
    throw new Error(`Schema file not found at ${schemaPath}`);
  }
  return JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
}

function loadAllExistingIds(rootDir) {
  const existingIds = new Map(); // id -> relative file path
  const vocabDir = path.join(rootDir, 'vocabulary');
  if (!fs.existsSync(vocabDir)) return existingIds;

  function traverse(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (
        item.endsWith('.json') &&
        item !== 'index.json' &&
        item !== 'flat-index.json' &&
        item !== 'search-index.json' &&
        !item.endsWith('-tracks.json')
      ) {
        try {
          const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
          const entries = Array.isArray(content)
            ? content
            : typeof content === 'object' && content !== null && content.id
            ? [content]
            : [];
          const relPath = path.relative(rootDir, fullPath).replace(/\\/g, '/');
          for (const entry of entries) {
            if (entry && entry.id) {
              existingIds.set(entry.id, relPath);
            }
          }
        } catch (err) {
          // ignore
        }
      }
    }
  }

  traverse(vocabDir);
  return existingIds;
}

function main() {
  const rootDir = path.join(__dirname, '..');
  const inputArg = process.argv[2];

  if (!inputArg) {
    console.error('Usage: node scripts/import-events-vocab.cjs <path-to-events-json>');
    process.exit(1);
  }

  const inputPath = path.resolve(process.cwd(), inputArg);
  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`);
    process.exit(1);
  }

  let rawInput;
  try {
    rawInput = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  } catch (err) {
    console.error(`Failed to parse JSON in ${inputPath}: ${err.message}`);
    process.exit(1);
  }

  const items = Array.isArray(rawInput)
    ? rawInput
    : typeof rawInput === 'object' && rawInput !== null
    ? [rawInput]
    : [];

  if (items.length === 0) {
    console.log('No entries found in input JSON file.');
    process.exit(0);
  }

  const schemaData = loadVocabularySchema(rootDir);
  const ajv = new Ajv2020({ allErrors: true });
  addFormats(ajv);
  const validateSchema = ajv.compile(schemaData);

  const knownThemes = loadThemes(rootDir);
  const existingIds = loadAllExistingIds(rootDir);

  const resolvedEntriesByFile = new Map(); // targetRelPath -> entry array
  const reviewReport = [];

  for (let i = 0; i < items.length; i++) {
    const rawEntry = items[i];
    const reasons = [];

    if (!rawEntry || typeof rawEntry !== 'object') {
      reviewReport.push({
        index: i,
        entry: rawEntry,
        reasons: ['Entry is not a valid JSON object'],
      });
      continue;
    }

    const word = rawEntry.word ? String(rawEntry.word).trim() : '';
    if (!word) {
      reasons.push("Missing or empty required field 'word'");
    }

    const language = rawEntry.language ? String(rawEntry.language).trim().toLowerCase() : 'en';
    const form = rawEntry.form ? String(rawEntry.form).trim().toLowerCase() : '';
    if (!form) {
      reasons.push("Missing or empty required field 'form'");
    }

    const rawLevel = rawEntry.level || rawEntry.cefr_level;
    const level = normalizeLevel(rawLevel);
    if (!level) {
      reasons.push(`Missing, ambiguous, or invalid CEFR level: '${rawLevel || 'N/A'}'`);
    }

    const levelDir = level ? levelToDir(level) : null;
    let theme = rawEntry.theme ? String(rawEntry.theme).trim().toLowerCase() : '';

    if (theme && !knownThemes[theme]) {
      // Check if theme file exists under vocabulary/<lang>/<levelDir>/<theme>.json
      const candidateFilePath = levelDir
        ? path.join(rootDir, 'vocabulary', language, levelDir, `${theme}.json`)
        : null;
      if (!candidateFilePath || !fs.existsSync(candidateFilePath)) {
        reasons.push(`Theme '${theme}' is not recognized in shared/themes.json or existing theme files`);
      }
    } else if (!theme) {
      reasons.push("Missing or empty required field 'theme'");
    }

    const wordSlug = word ? slugify(word) : '';
    const constructedId = rawEntry.id || (wordSlug && form ? `${language}:${wordSlug}:${form}` : null);

    if (!constructedId) {
      reasons.push('Unable to construct a valid entry ID');
    } else if (existingIds.has(constructedId)) {
      const existingFile = existingIds.get(constructedId);
      reasons.push(`Entry ID '${constructedId}' already exists in COSYdata (${existingFile})`);
    }

    // Build candidate object
    const candidate = {
      ...rawEntry,
      id: constructedId || rawEntry.id,
      word: word || rawEntry.word,
      language: language,
      form: form || rawEntry.form,
      level: level || rawEntry.level,
      theme: theme || rawEntry.theme,
    };

    // Remove event-internal context field if present on candidate or keep if valid
    // Note: context is not a schema field, so we omit non-schema property context from candidate for vocabulary.schema.json
    delete candidate.context;
    delete candidate.cefr_level;

    // Validate against JSON schema
    const valid = validateSchema(candidate);
    if (!valid) {
      const schemaErrors = validateSchema.errors
        .filter((err) => err.keyword !== 'if')
        .map((err) => {
          let fieldName = '/';
          if (err.keyword === 'required' && err.params && err.params.missingProperty) {
            fieldName = err.instancePath
              ? `${err.instancePath.replace(/^\//, '')}.${err.params.missingProperty}`
              : err.params.missingProperty;
          } else if (err.instancePath) {
            fieldName = err.instancePath.replace(/^\//, '');
          }
          return `Schema field '${fieldName}': ${err.message}`;
        });
      reasons.push(...schemaErrors);
    }

    if (reasons.length > 0) {
      reviewReport.push({
        index: i,
        entry: rawEntry,
        reasons: reasons,
      });
    } else {
      // Entry is fully resolved and schema compliant!
      const targetRelPath = path.join('vocabulary', language, levelDir, `${theme}.json`).replace(/\\/g, '/');
      if (!resolvedEntriesByFile.has(targetRelPath)) {
        resolvedEntriesByFile.set(targetRelPath, []);
      }
      resolvedEntriesByFile.get(targetRelPath).push(candidate);
    }
  }

  // Handle review report
  const reportsDir = path.join(rootDir, 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const reviewReportPath = path.join(reportsDir, 'events-import-needs-review.json');
  if (reviewReport.length > 0) {
    fs.writeFileSync(reviewReportPath, JSON.stringify(reviewReport, null, 2) + '\n', 'utf8');
    console.log(`[REVIEW REQUIRED] ${reviewReport.length} entry/entries flagged for manual review -> ${path.relative(rootDir, reviewReportPath)}`);
  } else {
    // Clear review report if no unresolved entries
    if (fs.existsSync(reviewReportPath)) {
      fs.writeFileSync(reviewReportPath, '[]\n', 'utf8');
    }
  }

  // Merge resolved entries
  let totalMerged = 0;
  for (const [relPath, newEntries] of resolvedEntriesByFile.entries()) {
    const fullPath = path.join(rootDir, relPath);
    const targetDir = path.dirname(fullPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    let existingEntries = [];
    if (fs.existsSync(fullPath)) {
      try {
        const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        existingEntries = Array.isArray(content) ? content : [];
      } catch (err) {
        console.error(`Failed to read existing file ${fullPath}: ${err.message}`);
        process.exit(1);
      }
    }

    const updatedContent = existingEntries.concat(newEntries);
    fs.writeFileSync(fullPath, JSON.stringify(updatedContent, null, 2) + '\n', 'utf8');
    totalMerged += newEntries.length;
    console.log(`[MERGED] ${newEntries.length} entry/entries appended to ${relPath}`);
  }

  console.log(`\nImport summary: ${totalMerged} resolved entries merged across ${resolvedEntriesByFile.size} file(s); ${reviewReport.length} entries flagged for review.`);

  if (totalMerged > 0) {
    console.log('\nRegenerating vocabulary index files...');
    try {
      child_process.execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });
    } catch (err) {
      console.error(`Error rebuilding indices: ${err.message}`);
      process.exit(1);
    }
  }
}

main();
