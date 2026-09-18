const fs = require('fs');
const path = require('path');
const Ajv2020 = require('ajv/dist/2020');
const addFormats = require('ajv-formats');

function main() {
  let hasError = false;

  const ajv = new Ajv2020({ allErrors: true });
  addFormats(ajv);

  const schemaFiles = {
    vocab: 'vocabulary.schema.json',
    phrase: 'functional-phrase.schema.json',
    curriculum: 'curriculum-competency.schema.json',
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
    if (!fs.existsSync(dir)) return fileList;
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

  const rootDir = path.join(__dirname, '..');
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
      path.basename(f) !== 'professional-tracks.json'
  );
  const indexFiles = allJsonFiles.filter((f) => path.basename(f) === 'index.json');

  console.log(`Validating ${themeFiles.length} data file(s)...`);

  const idToFilesMap = {};

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
        const valid = validate(entry);
        if (!valid) {
          const blockingErrors = validate.errors.filter((err) => err.keyword !== 'if');

          if (blockingErrors.length > 0) {
            hasError = true;
            console.error(`\n[SCHEMA ERROR] File: ${relPath} (${schemaType}, Entry #${idx + 1}, ID: ${entry.id || 'N/A'})`);
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
        }
      }
    } catch (err) {
      hasError = true;
      console.error(`\n[JSON ERROR] Could not parse file: ${relPath}\n  ${err.message}`);
    }
  }

  console.log(`Checking unique IDs across data files...`);
  for (const [id, filesList] of Object.entries(idToFilesMap)) {
    if (filesList.length > 1) {
      hasError = true;
      console.error(`\n[DUPLICATE ID ERROR] ID '${id}' appears ${filesList.length} times in data files:`);
      filesList.forEach((f) => console.error(`  - ${f}`));
    }
  }

  console.log(`Checking ${indexFiles.length} index.json file(s)...`);

  for (const indexFile of indexFiles) {
    const relIndexPath = path.relative(rootDir, indexFile).replace(/\\/g, '/');
    const langDir = path.dirname(indexFile);

    try {
      const indexMap = JSON.parse(fs.readFileSync(indexFile, 'utf8'));
      if (typeof indexMap !== 'object' || indexMap === null || Array.isArray(indexMap)) {
        hasError = true;
        console.error(`\n[INDEX ERROR] File ${relIndexPath} must be a JSON object mapping IDs to filenames.`);
        continue;
      }

      for (const [wordId, targetFilename] of Object.entries(indexMap)) {
        const targetPath = path.join(langDir, targetFilename);
        const relTargetPath = path.relative(rootDir, targetPath).replace(/\\/g, '/');

        if (!fs.existsSync(targetPath)) {
          hasError = true;
          console.error(`\n[INDEX ERROR] Missing Target File in ${relIndexPath}:`);
          console.error(`  ID '${wordId}' points to '${targetFilename}', but file '${relTargetPath}' does not exist.`);
          continue;
        }

        try {
          const targetContent = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
          let exists = false;

          if (Array.isArray(targetContent)) {
            exists = targetContent.some((entry) => entry && entry.id === wordId);
          } else if (typeof targetContent === 'object' && targetContent !== null) {
            if (targetContent[wordId]) {
              exists = true;
            } else if (targetContent.id === wordId) {
              exists = true;
            } else {
              exists = Object.values(targetContent).some((entry) => entry && typeof entry === 'object' && entry.id === wordId);
            }
          }

          if (!exists) {
            hasError = true;
            console.error(`\n[INDEX MISMATCH ERROR] File: ${relIndexPath}`);
            console.error(`  ID '${wordId}' is mapped to '${targetFilename}' in index.json, but '${wordId}' was not found inside '${relTargetPath}'.`);
          }
        } catch (err) {
          hasError = true;
          console.error(`\n[JSON ERROR] Failed to parse target file '${relTargetPath}' referenced by '${relIndexPath}':\n  ${err.message}`);
        }
      }
    } catch (err) {
      hasError = true;
      console.error(`\n[JSON ERROR] Could not parse index file: ${relIndexPath}\n  ${err.message}`);
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
