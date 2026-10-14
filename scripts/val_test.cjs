const fs = require('fs');
const path = require('path');
const Ajv2020 = require('ajv/dist/2020');
const addFormats = require('ajv-formats');

function main() {
  let hasError = false;

  const rootDir = path.join(__dirname, '..');

  // Load canonical themes taxonomy
  let knownThemes = {};
  const themesSchemaPath = path.join(rootDir, 'schemas', 'themes.json');
  const sharedThemesPath = path.join(rootDir, 'shared', 'themes.json');

  if (fs.existsSync(themesSchemaPath)) {
    try {
      const themesData = JSON.parse(fs.readFileSync(themesSchemaPath, 'utf8'));
      knownThemes = themesData.themes || themesData;
    } catch (err) {
      console.warn(`[WARNING] Could not parse schemas/themes.json: ${err.message}`);
    }
  } else if (fs.existsSync(sharedThemesPath)) {
    try {
      const themesData = JSON.parse(fs.readFileSync(sharedThemesPath, 'utf8'));
      knownThemes = themesData.themes || {};
    } catch (err) {
      console.warn(`[WARNING] Could not parse shared/themes.json: ${err.message}`);
    }
  }

  // Load ID aliases
  let idAliases = {};
  const aliasesPath = path.join(rootDir, 'shared', 'id-aliases.json');
  if (fs.existsSync(aliasesPath)) {
    try {
      idAliases = JSON.parse(fs.readFileSync(aliasesPath, 'utf8'));
    } catch (err) {
      console.warn(`[WARNING] Could not parse shared/id-aliases.json: ${err.message}`);
    }
  }

  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);

  if (fs.existsSync(themesSchemaPath)) {
    try {
      const themesSchema = JSON.parse(fs.readFileSync(themesSchemaPath, 'utf8'));
      ajv.addSchema(themesSchema, 'themes.json');
    } catch (err) {
      console.warn(`[WARNING] Could not add themes.json schema to Ajv: ${err.message}`);
    }
  }

  const schemaFiles = {
    vocab: 'vocabulary.schema.json',
    phrase: 'functional-phrase.schema.json',
    curriculum: 'curriculum-competency.schema.json',
    lesson: 'lesson.schema.json',
  };

  const validators = {};

  for (const [key, filename] of Object.entries(schemaFiles)) {
    const sPath = path.join(__dirname, '..', 'schemas', filename);
    if (!fs.existsSync(sPath)) {
      console.error(`Schema file not found at ${sPath}`);
      process.exit(1);
    }
    const sData = JSON.parse(fs.readFileSync(sPath, 'utf8'));
    validators[key] = ajv.compile(sData);
  }

  function findFiles(dir, fileList = []) {
    if (
      !fs.existsSync(dir) ||
      path.resolve(dir).startsWith(path.join(rootDir, 'vocabulary', '_canonical'))
    ) return fileList;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        findFiles(filePath, fileList);
      } else if (file.endsWith('.json')) {
        fileList.push(filePath);
      }
    }
    return fileList;
  }

  let targetPaths = [];

  if (process.argv[2]) {
    targetPaths = [path.resolve(rootDir, process.argv[2])];
  } else {
    targetPaths = [
      path.join(rootDir, 'vocabulary'),
      path.join(rootDir, 'functional-phrases'),
      path.join(rootDir, 'curriculum'),
    ];
  }

  let allJsonFiles = [];
  for (const tPath of targetPaths) {
    if (fs.existsSync(tPath)) {
      const stat = fs.statSync(tPath);
      if (stat.isDirectory()) {
        allJsonFiles = allJsonFiles.concat(findFiles(tPath));
      } else if (tPath.endsWith('.json')) {
        allJsonFiles.push(tPath);
      }
    }
  }

  const themeFiles = allJsonFiles.filter(
    (f) =>
      path.basename(f) !== 'index.json' &&
      path.basename(f) !== 'flat-index.json' &&
      path.basename(f) !== 'search-index.json' &&
      path.basename(f) !== 'themes-index.json' &&
      !path.basename(f).endsWith('-tracks.json')
  );
  const indexFiles = allJsonFiles.filter((f) => path.basename(f) === 'index.json');
  const flatIndexFiles = allJsonFiles.filter((f) => path.basename(f) === 'flat-index.json');
  const searchIndexFiles = allJsonFiles.filter((f) => path.basename(f) === 'search-index.json');

  console.log(`Validating ${themeFiles.length} data file(s)...`);

  const idToFilesMap = {};
  const allEnglishIds = new Set();
  const vocabEntriesList = [];

  for (const file of themeFiles) {
    const relPath = path.relative(rootDir, file).replace(/\\/g, '/');
    let validate = null;
    let schemaType = '';

    if (relPath.startsWith('vocabulary/')) {
      validate = validators.vocab;
      schemaType = 'vocabulary';
    } else if (relPath.startsWith('functional-phrases/')) {
      validate = validators.phrase;
      schemaType = 'functional phrase';
    } else if (relPath.startsWith('curriculum/')) {
      validate = validators.curriculum;
      schemaType = 'curriculum competency';
    } else if (relPath.startsWith('schemas/examples/')) {
      if (relPath.includes('valid-lesson')) {
        validate = validators.lesson;
        schemaType = 'lesson';
      } else {
        validate = validators.vocab;
        schemaType = 'vocabulary example';
      }
    } else {
      console.warn(`[WARNING] Skipping ${relPath}: unknown directory context for schema selection.`);
      continue;
    }

    try {
      const content = JSON.parse(fs.readFileSync(file, 'utf8'));
      const entries = Array.isArray(content)
        ? content
        : typeof content === 'object' && content !== null && content.id
        ? [content]
        : typeof content === 'object' && content !== null
        ? Object.values(content)
        : [];

      if (entries.length === 0) {
        console.warn(`[WARNING] File ${relPath} contains no entries.`);
      }

      for (const [idx, entry] of entries.entries()) {
        let entryValidate = validate;
        let entrySchemaType = schemaType;
        if (entry && entry.id && entry.id.includes(':lesson:') && relPath.startsWith('lessons/')) {
          entryValidate = validators.lesson;
          entrySchemaType = 'lesson';
        }
        const valid = entryValidate(entry);
        if (!valid) {
          const blockingErrors = (entryValidate.errors || []).filter((err) => {
    if (err.keyword === "if") return false;
    if (schemaType === "vocabulary" && err.instancePath && err.instancePath.includes("/secondary_themes") && err.keyword === "enum") {
      return false;
    }
    return true;
  });

          if (blockingErrors.length > 0) {
console.log("hasError set at line 193"); hasError = true;
            console.error(`\n[SCHEMA ERROR] File: ${relPath} (${entrySchemaType}, Entry #${idx + 1}, ID: ${entry.id || 'N/A'})`);
            for (const err of blockingErrors) {
              let fieldName = '/';
              if (err.keyword === 'required' && err.params && err.params.missingProperty) {
                fieldName = err.instancePath
                  ? `${err.instancePath.replace(/^\//, '')}.${err.params.missingProperty}`
                  : err.params.missingProperty;
              } else if (err.instancePath) {
                fieldName = err.instancePath.replace(/^\//, '');
              }
              console.error(`  - Field '${fieldName}': ${err.message}`);
            }
          }
        }

        if (entry && entry.id) {
          if (!idToFilesMap[entry.id]) {
            idToFilesMap[entry.id] = [];
          }
          idToFilesMap[entry.id].push(relPath);

          if (relPath.startsWith('vocabulary/en/')) {
            allEnglishIds.add(entry.id);
          }

          if (schemaType === 'vocabulary') {
            vocabEntriesList.push({ entry, relPath });
          }
        }
      }
    } catch (err) {
console.log("hasError set at line 225"); hasError = true;
      console.error(`\n[JSON ERROR] Could not parse file: ${relPath}\n  ${err.message}`);
    }
  }

  console.log(`Checking unique IDs across data files...`);
  for (const [id, filesList] of Object.entries(idToFilesMap)) {
    if (filesList.length > 1) {
console.log("hasError set at line 233"); hasError = true;
      console.error(`\n[DUPLICATE ID ERROR] ID '${id}' appears ${filesList.length} times in data files:`);
      filesList.forEach((f) => console.error(`  - ${f}`));
    }
  }

  // Check alias list freshness
  console.log(`Checking id-aliases freshness...`);
  for (const retiredId of Object.keys(idAliases)) {
    if (idToFilesMap[retiredId]) {
console.log("hasError set at line 243"); hasError = true;
      console.error(`\n[RETIRED ID ERROR] ID '${retiredId}' is listed in shared/id-aliases.json as retired, but still exists in data files:`);
      idToFilesMap[retiredId].forEach((f) => console.error(`  - ${f}`));
    }
  }

  // Index all vocabulary entries by ID and by language+word+form for relational checks
  const vocabIdMap = new Map();
  const langWordFormMap = new Map(); // "lang:word:form" -> array of entries
  for (const { entry, relPath } of vocabEntriesList) {
    if (entry && entry.id) {
      vocabIdMap.set(entry.id, { entry, relPath });
      const key = `${entry.language}:${entry.word}:${entry.form}`;
      if (!langWordFormMap.has(key)) {
        langWordFormMap.set(key, []);
      }
      langWordFormMap.get(key).push({ entry, relPath });
    }
  }

  // Taxonomy & concept resolution checks (warnings)
  console.log(`Checking theme taxonomy and concept resolution...`);
  for (const { entry, relPath } of vocabEntriesList) {
    if (entry.theme && Object.keys(knownThemes).length > 0) {
      if (!knownThemes[entry.theme]) {
        console.warn(`[WARNING] File ${relPath} (ID: ${entry.id}): primary theme '${entry.theme}' is not in schemas/themes.json`);
      } else if (entry.sub_theme) {
        const allowedSubThemes = knownThemes[entry.theme] || [];
        if (!allowedSubThemes.includes(entry.sub_theme)) {
          console.warn(`[WARNING] File ${relPath} (ID: ${entry.id}): sub_theme '${entry.sub_theme}' is not in schemas/themes.json for theme '${entry.theme}'`);
        }
      }
    }

    if (entry.secondary_themes && Object.keys(knownThemes).length > 0) {
      for (const st of entry.secondary_themes) {
        if (st.includes('/')) {
          const [secTheme, secSubTheme] = st.split('/');
          if (!knownThemes[secTheme]) {
            console.warn(`[WARNING] File ${relPath} (ID: ${entry.id}): secondary_theme theme '${secTheme}' in '${st}' is not in schemas/themes.json`);
          } else if (secSubTheme) {
            const allowedSubThemes = knownThemes[secTheme] || [];
            if (!allowedSubThemes.includes(secSubTheme)) {
              console.warn(`[WARNING] File ${relPath} (ID: ${entry.id}): secondary_theme sub_theme '${secSubTheme}' in '${st}' is not in schemas/themes.json for theme '${secTheme}'`);
            }
          }
        } else if (!knownThemes[st]) {
          console.warn(`[WARNING] File ${relPath} (ID: ${entry.id}): secondary_theme '${st}' is not in schemas/themes.json`);
        }
      }
    }

    if (entry.concept) {
      if (/^[a-z]{2}:[a-z0-9-]+:[a-z0-9-]+$/.test(entry.concept) && !allEnglishIds.has(entry.concept)) {
        console.info(`[INFO] File ${relPath} (ID: ${entry.id}): concept '${entry.concept}' does not resolve to an existing English entry ID (optional field)`);
      }
    }
  }

  // Partitive and Contraction validation checks
  console.log(`Checking partitive and contraction rules...`);
  const FR_MASS_NOUNS = new Set(['poulet', 'poisson', 'fromage', 'sport', 'musique', 'temps', 'argent', 'chance']);
  const IT_MASS_NOUNS = new Set(['pane', 'frutta', 'acqua', 'spaghetti', 'latte', 'caffè', 'riso', 'carne', 'formaggio', 'zucchero', 'vino', 'birra', 'tè', 'burro', 'pasta']);

  const FR_ALLOWED_PARTITIVES = new Set(['du', 'de la', "de l'", 'des']);
  const IT_ALLOWED_PARTITIVES = new Set(['del', 'dello', 'della', "dell'", 'dei', 'degli', 'delle']);

  const IT_ARTICLE_TO_PARTITIVE = {
    'il': 'del',
    'lo': 'dello',
    'la': 'della',
    "l'": "dell'",
    "l’": "dell'",
    'i': 'dei',
    'gli': 'degli',
    'le': 'delle'
  };

  for (const { entry, relPath } of vocabEntriesList) {
    const lang = entry.language;

    // Check 1: Partitive presence in unsupported languages
    if (entry.partitive !== undefined && entry.partitive !== null) {
      if (lang === 'en' || lang === 'ru' || lang === 'el') {
console.log("hasError set at line 327"); hasError = true;
        console.error(`\n[VALIDATION ERROR] File: ${relPath} (ID: ${entry.id})`);
        console.error(`  - Field 'partitive': Partitive is not allowed for language '${lang}'`);
      }
    }

    // Check 2: French partitives
    if (lang === 'fr') {
      if (entry.partitive !== undefined && entry.partitive !== null) {
        if (!FR_ALLOWED_PARTITIVES.has(entry.partitive)) {
console.log("hasError set at line 337"); hasError = true;
          console.error(`\n[VALIDATION ERROR] File: ${relPath} (ID: ${entry.id})`);
          console.error(`  - Field 'partitive': Invalid French partitive value '${entry.partitive}'. Must be one of: du, de la, de l', des`);
        }

        // Agreement checks for French
        if (entry.form === 'noun') {
          if (entry.countability === 'pluralia_tantum' && entry.partitive !== 'des') {
console.log("hasError set at line 345"); hasError = true;
            console.error(`\n[VALIDATION ERROR] File: ${relPath} (ID: ${entry.id})`);
            console.error(`  - Field 'partitive': Pluralia tantum noun must have partitive 'des', found '${entry.partitive}'`);
          } else if (entry.countability === 'uncountable' || entry.countability === 'countable') {
            const wordClean = (entry.word || '').toLowerCase();
            const startsWithVowelOrMuteH = /^[aeiouyéèêëàâùûîïô]/i.test(wordClean) || (/^h/i.test(wordClean) && entry.h_aspire !== true);

            if (startsWithVowelOrMuteH) {
              if (entry.partitive !== "de l'") {
console.log("hasError set at line 354"); hasError = true;
                console.error(`\n[VALIDATION ERROR] File: ${relPath} (ID: ${entry.id})`);
                console.error(`  - Field 'partitive': Inconsistent French partitive '${entry.partitive}' for word starting with vowel/mute h. Expected 'de l''`);
              }
            } else if (entry.gender === 'masculine') {
              if (entry.partitive !== 'du') {
console.log("hasError set at line 360"); hasError = true;
                console.error(`\n[VALIDATION ERROR] File: ${relPath} (ID: ${entry.id})`);
                console.error(`  - Field 'partitive': Inconsistent French partitive '${entry.partitive}' for masculine noun. Expected 'du'`);
              }
            } else if (entry.gender === 'feminine') {
              if (entry.partitive !== 'de la') {
console.log("hasError set at line 366"); hasError = true;
                console.error(`\n[VALIDATION ERROR] File: ${relPath} (ID: ${entry.id})`);
                console.error(`  - Field 'partitive': Inconsistent French partitive '${entry.partitive}' for feminine noun. Expected 'de la'`);
              }
            }
          }
        }
      }

      // Omitted on ordinary countable nouns check
      if (entry.form === 'noun') {
        const isNormallyMass = FR_MASS_NOUNS.has((entry.word || '').toLowerCase());
        const isOrdinaryCountable = entry.countability === 'countable' && !isNormallyMass;

        if (isOrdinaryCountable && entry.partitive) {
console.log("hasError set at line 381"); hasError = true;
          console.error(`\n[VALIDATION ERROR] File: ${relPath} (ID: ${entry.id})`);
          console.error(`  - Field 'partitive': Partitive should be omitted on ordinary countable noun '${entry.word}'`);
        }
      }
    }

    // Check 3: Italian partitives
    if (lang === 'it') {
      if (entry.partitive !== undefined && entry.partitive !== null) {
        if (!IT_ALLOWED_PARTITIVES.has(entry.partitive)) {
console.log("hasError set at line 392"); hasError = true;
          console.error(`\n[VALIDATION ERROR] File: ${relPath} (ID: ${entry.id})`);
          console.error(`  - Field 'partitive': Invalid Italian partitive value '${entry.partitive}'`);
        }

        // Agreement check with article if present
        if (entry.article && IT_ARTICLE_TO_PARTITIVE[entry.article]) {
          const expected = IT_ARTICLE_TO_PARTITIVE[entry.article];
          if (entry.partitive !== expected) {
console.log("hasError set at line 401"); hasError = true;
            console.error(`\n[VALIDATION ERROR] File: ${relPath} (ID: ${entry.id})`);
            console.error(`  - Field 'partitive': Inconsistent Italian partitive '${entry.partitive}' for article '${entry.article}'. Expected '${expected}'`);
          }
        }
      }

      if (entry.form === 'noun') {
        const isNormallyMass = IT_MASS_NOUNS.has((entry.word || '').toLowerCase());
        const isOrdinaryCountable = entry.countability === 'countable' && !isNormallyMass;

        if (isOrdinaryCountable && entry.partitive) {
console.log("hasError set at line 413"); hasError = true;
          console.error(`\n[VALIDATION ERROR] File: ${relPath} (ID: ${entry.id})`);
          console.error(`  - Field 'partitive': Partitive should be omitted on ordinary countable noun '${entry.word}'`);
        }
      }
    }

    // Check 4: Contractions
    if (entry.contraction) {
      if (entry.form !== 'preposition') {
console.log("hasError set at line 423"); hasError = true;
        console.error(`\n[VALIDATION ERROR] File: ${relPath} (ID: ${entry.id})`);
        console.error(`  - Field 'contraction': Contraction is allowed only when form is 'preposition'`);
      }

      if (lang !== 'fr' && lang !== 'it' && lang !== 'el') {
console.log("hasError set at line 429"); hasError = true;
        console.error(`\n[VALIDATION ERROR] File: ${relPath} (ID: ${entry.id})`);
        console.error(`  - Field 'contraction': Contraction is not allowed for language '${lang}'`);
      }

      // Check base preposition entry and cross-referencing in related_forms
      const basePrep = entry.contraction.preposition;
      if (basePrep) {
        const matches = langWordFormMap.get(`${lang}:${basePrep}:preposition`) || [];
        if (matches.length === 0) {
console.log("hasError set at line 439"); hasError = true;
          console.error(`\n[VALIDATION ERROR] File: ${relPath} (ID: ${entry.id})`);
          console.error(`  - Field 'contraction': Base preposition '${basePrep}' not found as a preposition entry in language '${lang}'`);
        } else {
          // Check that at least one base preposition entry lists this contracted entry ID in its related_forms
          const relatesBack = matches.some((m) => Array.isArray(m.entry.related_forms) && m.entry.related_forms.includes(entry.id));
          if (!relatesBack) {
console.log("hasError set at line 446"); hasError = true;
            console.error(`\n[VALIDATION ERROR] File: ${relPath} (ID: ${entry.id})`);
            console.error(`  - Field 'contraction': Base preposition '${matches[0].entry.id}' missing related_forms reference to contracted entry '${entry.id}'`);
          }
        }
      }

      // Check definition / example language script suitability for contracted entries
      if (Array.isArray(entry.definitions)) {
        for (const def of entry.definitions) {
          if (lang === 'el' && !/[\u0370-\u03ff\u1f00-\u1fff]/.test(def)) {
console.log("hasError set at line 457"); hasError = true;
            console.error(`\n[VALIDATION ERROR] File: ${relPath} (ID: ${entry.id})`);
            console.error(`  - Field 'definitions': Definition '${def}' is not written in Greek`);
          }
          if ((lang === 'fr' || lang === 'it') && /[\u0400-\u04ff\u0370-\u03ff]/.test(def)) {
console.log("hasError set at line 462"); hasError = true;
            console.error(`\n[VALIDATION ERROR] File: ${relPath} (ID: ${entry.id})`);
            console.error(`  - Field 'definitions': Definition '${def}' is not in the entry's language (${lang})`);
          }
        }
      }

      if (Array.isArray(entry.examples)) {
        for (const ex of entry.examples) {
          if (lang === 'el' && !/[\u0370-\u03ff\u1f00-\u1fff]/.test(ex)) {
console.log("hasError set at line 472"); hasError = true;
            console.error(`\n[VALIDATION ERROR] File: ${relPath} (ID: ${entry.id})`);
            console.error(`  - Field 'examples': Example '${ex}' is not written in Greek`);
          }
          if ((lang === 'fr' || lang === 'it') && /[\u0400-\u04ff\u0370-\u03ff]/.test(ex)) {
console.log("hasError set at line 477"); hasError = true;
            console.error(`\n[VALIDATION ERROR] File: ${relPath} (ID: ${entry.id})`);
            console.error(`  - Field 'examples': Example '${ex}' is not in the entry's language (${lang})`);
          }
        }
      }
    }
  }

  console.log(`Checking ${indexFiles.length} index.json file(s)...`);

  const indexTargetIdsCache = new Map();

  for (const indexFile of indexFiles) {
    const relIndexPath = path.relative(rootDir, indexFile).replace(/\\/g, '/');
    const langDir = path.dirname(indexFile);

    try {
      const indexMap = JSON.parse(fs.readFileSync(indexFile, 'utf8'));
      if (typeof indexMap !== 'object' || indexMap === null || Array.isArray(indexMap)) {
console.log("hasError set at line 497"); hasError = true;
        console.error(`\n[INDEX ERROR] File ${relIndexPath} must be a JSON object mapping IDs to filenames.`);
        continue;
      }

      for (const [wordId, targetFilename] of Object.entries(indexMap)) {
        const targetPath = path.join(langDir, targetFilename);
        const relTargetPath = path.relative(rootDir, targetPath).replace(/\\/g, '/');

        if (!fs.existsSync(targetPath)) {
console.log("hasError set at line 507"); hasError = true;
          console.error(`\n[INDEX ERROR] Missing Target File in ${relIndexPath}:`);
          console.error(`  ID '${wordId}' points to '${targetFilename}', but file '${relTargetPath}' does not exist.`);
          continue;
        }

        try {
          let targetIds = indexTargetIdsCache.get(targetPath);
          if (!indexTargetIdsCache.has(targetPath)) {
            const targetContent = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
            targetIds = new Set();

            if (Array.isArray(targetContent)) {
              for (const entry of targetContent) {
                if (entry && entry.id) targetIds.add(entry.id);
              }
            } else if (typeof targetContent === 'object' && targetContent !== null) {
              if (targetContent.id) targetIds.add(targetContent.id);
              for (const [key, value] of Object.entries(targetContent)) {
                if (key !== 'id' && value) targetIds.add(key);
                if (value && typeof value === 'object' && value.id) targetIds.add(value.id);
              }
            }

            indexTargetIdsCache.set(targetPath, targetIds);
          }
          const exists = targetIds.has(wordId);

          if (!exists) {
console.log("hasError set at line 536"); hasError = true;
            console.error(`\n[INDEX MISMATCH ERROR] File: ${relIndexPath}`);
            console.error(`  ID '${wordId}' is mapped to '${targetFilename}' in index.json, but '${wordId}' was not found inside '${relTargetPath}'.`);
          }
        } catch (err) {
console.log("hasError set at line 541"); hasError = true;
          console.error(`\n[JSON ERROR] Failed to parse target file '${relTargetPath}' referenced by '${relIndexPath}':\n  ${err.message}`);
        }
      }
    } catch (err) {
console.log("hasError set at line 546"); hasError = true;
      console.error(`\n[JSON ERROR] Could not parse index file: ${relIndexPath}\n  ${err.message}`);
    }
  }

  console.log(`Checking ${flatIndexFiles.length} flat-index.json file(s)...`);
  for (const flatFile of flatIndexFiles) {
    const relFlatPath = path.relative(rootDir, flatFile).replace(/\\/g, '/');
    try {
      const flatMap = JSON.parse(fs.readFileSync(flatFile, 'utf8'));
      if (typeof flatMap !== 'object' || flatMap === null || Array.isArray(flatMap)) {
console.log("hasError set at line 557"); hasError = true;
        console.error(`\n[FLAT-INDEX ERROR] File ${relFlatPath} must be a JSON object mapping surface forms to arrays of { id, field }.`);
        continue;
      }

      for (const [surfaceForm, refs] of Object.entries(flatMap)) {
        if (!Array.isArray(refs)) {
console.log("hasError set at line 564"); hasError = true;
          console.error(`\n[FLAT-INDEX ERROR] File ${relFlatPath}: Entry for '${surfaceForm}' must be an array.`);
          continue;
        }

        for (const ref of refs) {
          if (!ref || typeof ref !== 'object' || !ref.id) {
console.log("hasError set at line 571"); hasError = true;
            console.error(`\n[FLAT-INDEX ERROR] File ${relFlatPath}: Invalid reference item for '${surfaceForm}'.`);
            continue;
          }

          if (idToFilesMap[ref.id] === undefined && !idToFilesMap[ref.id]) {
console.log("hasError set at line 577"); hasError = true;
            console.error(`\n[FLAT-INDEX MISMATCH ERROR] File ${relFlatPath}: ID '${ref.id}' for surface form '${surfaceForm}' was not found in data files.`);
          }
        }
      }
    } catch (err) {
console.log("hasError set at line 583"); hasError = true;
      console.error(`\n[JSON ERROR] Could not parse flat-index file: ${relFlatPath}\n  ${err.message}`);
    }
  }

  console.log(`Checking ${searchIndexFiles.length} search-index.json file(s)...`);
  for (const searchFile of searchIndexFiles) {
    const relSearchPath = path.relative(rootDir, searchFile).replace(/\\/g, '/');
    try {
      const searchItems = JSON.parse(fs.readFileSync(searchFile, 'utf8'));
      if (!Array.isArray(searchItems)) {
console.log("hasError set at line 594"); hasError = true;
        console.error(`\n[SEARCH-INDEX ERROR] File ${relSearchPath} must be a JSON array of lightweight entries.`);
        continue;
      }

      for (const item of searchItems) {
        if (!item || typeof item !== 'object' || !item.id) {
console.log("hasError set at line 601"); hasError = true;
          console.error(`\n[SEARCH-INDEX ERROR] File ${relSearchPath}: Entry missing 'id' property.`);
          continue;
        }

        if (idToFilesMap[item.id] === undefined && !idToFilesMap[item.id]) {
console.log("hasError set at line 607"); hasError = true;
          console.error(`\n[SEARCH-INDEX MISMATCH ERROR] File ${relSearchPath}: ID '${item.id}' was not found in data files.`);
        }
      }
    } catch (err) {
console.log("hasError set at line 612"); hasError = true;
      console.error(`\n[JSON ERROR] Could not parse search-index file: ${relSearchPath}\n  ${err.message}`);
    }
  }

  if (hasError) {
    console.error('\nValidation failed.');
    process.exit(1);
  } else {
    console.log('\nAll data files and index mapping checks passed successfully!');
  }
}

main();
