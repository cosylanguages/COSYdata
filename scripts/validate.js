const fs = require('fs');
const path = require('path');
const Ajv2020 = require('ajv/dist/2020');
const addFormats = require('ajv-formats');

function main() {
  let hasError = false;

  const ajv = new Ajv2020({ allErrors: true });
  addFormats(ajv);

  const schemaPath = path.join(__dirname, '..', 'schemas', 'vocabulary.schema.json');
  if (!fs.existsSync(schemaPath)) {
    console.error(`Schema file not found at ${schemaPath}`);
    process.exit(1);
  }

  const schemaData = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  const validate = ajv.compile(schemaData);

  const vocabDir = path.join(__dirname, '..', 'vocabulary');

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

  const allJsonFiles = findFiles(vocabDir);

  const themeFiles = allJsonFiles.filter((f) => path.basename(f) !== 'index.json');
  const indexFiles = allJsonFiles.filter((f) => path.basename(f) === 'index.json');

  console.log(`Validating ${themeFiles.length} theme file(s) against vocabulary schema...`);

  for (const file of themeFiles) {
    const relPath = path.relative(path.join(__dirname, '..'), file);
    try {
      const content = JSON.parse(fs.readFileSync(file, 'utf8'));
      // Content may be an array of entries or a single object / map of entries
      const entries = Array.isArray(content)
        ? content
        : typeof content === 'object' && content !== null && content.id
        ? [content]
        : typeof content === 'object' && content !== null
        ? Object.values(content)
        : [];

      if (entries.length === 0) {
        console.warn(`[WARNING] File ${relPath} contains no vocabulary entries.`);
      }

      for (const [idx, entry] of entries.entries()) {
        const valid = validate(entry);
        if (!valid) {
          hasError = true;
          console.error(`\n[SCHEMA ERROR] File: ${relPath} (Entry #${idx + 1}, ID: ${entry.id || 'N/A'})`);
          for (const err of validate.errors) {
            console.error(`  - Field '${err.instancePath || '/'}' ${err.message}`);
          }
        }
      }
    } catch (err) {
      hasError = true;
      console.error(`\n[JSON ERROR] Could not parse file: ${relPath}\n  ${err.message}`);
    }
  }

  console.log(`Checking ${indexFiles.length} index.json file(s)...`);

  for (const indexFile of indexFiles) {
    const relIndexPath = path.relative(path.join(__dirname, '..'), indexFile);
    const langDir = path.dirname(indexFile);

    try {
      const indexMap = JSON.parse(fs.readFileSync(indexFile, 'utf8'));
      if (typeof indexMap !== 'object' || indexMap === null || Array.isArray(indexMap)) {
        hasError = true;
        console.error(`\n[INDEX ERROR] File ${relIndexPath} must be a JSON object mapping word IDs to filenames.`);
        continue;
      }

      for (const [wordId, targetFilename] of Object.entries(indexMap)) {
        const targetPath = path.join(langDir, targetFilename);
        const relTargetPath = path.relative(path.join(__dirname, '..'), targetPath);

        if (!fs.existsSync(targetPath)) {
          hasError = true;
          console.error(`\n[INDEX ERROR] Missing Target File in ${relIndexPath}:`);
          console.error(`  Word ID '${wordId}' points to '${targetFilename}', but file '${relTargetPath}' does not exist.`);
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
            console.error(`  Word ID '${wordId}' is mapped to '${targetFilename}' in index.json, but '${wordId}' was not found inside '${relTargetPath}'.`);
          }
        } catch (err) {
          hasError = true;
          console.error(`\n[INDEX ERROR] Failed to parse target file '${relTargetPath}' referenced by '${relIndexPath}':\n  ${err.message}`);
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
    console.log('\nAll vocabulary files and index mapping checks passed successfully!');
  }
}

main();
