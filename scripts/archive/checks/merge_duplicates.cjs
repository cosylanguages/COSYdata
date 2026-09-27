const fs = require('fs');
const path = require('path');

const vocabDir = path.join(__dirname, '..', 'vocabulary', 'en');
const files = fs.readdirSync(vocabDir).filter(f => f.endsWith('.json') && f !== 'index.json').sort();

const cefrOrder = { A0: 0, A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 };

function isReal(str) {
  if (!str) return false;
  if (str.includes("entry for") || str.includes("English vocabulary") || str.includes("Spoken English")) return false;
  if (str.includes("example sentence using") || str.includes("usage example with") || str.includes("Example usage of")) return false;
  return true;
}

// 1. Read all files and build ID map
const fileEntriesMap = {};
const idMap = {};

files.forEach(file => {
  const filePath = path.join(vocabDir, file);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  fileEntriesMap[file] = content;

  content.forEach(entry => {
    if (!idMap[entry.id]) idMap[entry.id] = [];
    idMap[entry.id].push({ file, entry });
  });
});

const dupes = Object.entries(idMap).filter(([id, list]) => list.length > 1);
console.log(`Found ${dupes.length} duplicate IDs across theme files.`);

const placeholderOnlyMergedEntries = [];
let totalRemovedCopies = 0;

// 2. Process each duplicate ID
dupes.forEach(([id, list]) => {
  // Collect all unique CEFR levels across copies
  const allLevelsSet = new Set();
  list.forEach(item => {
    if (item.entry.level) allLevelsSet.add(item.entry.level);
    if (Array.isArray(item.entry.levels)) {
      item.entry.levels.forEach(l => allLevelsSet.add(l));
    }
  });

  const sortedLevels = Array.from(allLevelsSet).sort((a, b) => cefrOrder[a] - cefrOrder[b]);
  const minLevel = sortedLevels[0];

  // Select target file & base entry
  let targetItem = list.find(item => isReal(item.entry.definitions?.[0]) || isReal(item.entry.examples?.[0]));
  if (!targetItem) {
    const minLevelItems = list.filter(item => item.entry.level === minLevel);
    targetItem = minLevelItems.find(item => item.entry.theme === item.file.replace('.json', '')) || minLevelItems[0];
  }

  const targetFile = targetItem.file;
  const canonicalEntry = { ...targetItem.entry };

  // Set level and levels
  canonicalEntry.level = minLevel;
  canonicalEntry.levels = sortedLevels;

  // Check definitions and examples
  const hasRealDef = list.some(item => isReal(item.entry.definitions?.[0]));
  const hasRealEx = list.some(item => isReal(item.entry.examples?.[0]));

  if (hasRealDef) {
    const realDefItem = list.find(item => isReal(item.entry.definitions?.[0]));
    canonicalEntry.definitions = realDefItem.entry.definitions;
  } else if (canonicalEntry.definitions?.[0]) {
    // Update placeholder to reflect canonical minLevel if it mentions level
    canonicalEntry.definitions = canonicalEntry.definitions.map(d =>
      d.replace(/^[A-Z0-9]{1,2}\s+(entry for|Spoken English entry)/, `${minLevel} $1`)
    );
  }

  if (hasRealEx) {
    const realExItem = list.find(item => isReal(item.entry.examples?.[0]));
    canonicalEntry.examples = realExItem.entry.examples;
  }

  if (!hasRealDef && !hasRealEx) {
    placeholderOnlyMergedEntries.push({
      id: canonicalEntry.id,
      word: canonicalEntry.word,
      file: targetFile,
      level: canonicalEntry.level,
      levels: sortedLevels
    });
  }

  // Merge optional array/string fields if missing in target
  ['tags', 'synonyms', 'antonyms', 'collocations', 'related_forms'].forEach(field => {
    if (!canonicalEntry[field] || canonicalEntry[field].length === 0) {
      for (const item of list) {
        if (item.entry[field] && item.entry[field].length > 0) {
          canonicalEntry[field] = item.entry[field];
          break;
        }
      }
    }
  });

  // Remove all instances of `id` across all files in memory
  const affectedFiles = Array.from(new Set(list.map(item => item.file)));
  affectedFiles.forEach(file => {
    fileEntriesMap[file] = fileEntriesMap[file].filter(e => e.id !== id);
  });

  // Find position in targetFile to place canonicalEntry
  // Place it back in targetFile
  fileEntriesMap[targetFile].push(canonicalEntry);

  totalRemovedCopies += (list.length - 1);
});

console.log(`Merged ${dupes.length} colliding IDs. Removed ${totalRemovedCopies} redundant copies.`);
console.log(`Placeholder-only merged entries: ${placeholderOnlyMergedEntries.length}`);

// Save all modified theme files
files.forEach(file => {
  const filePath = path.join(vocabDir, file);
  fs.writeFileSync(filePath, JSON.stringify(fileEntriesMap[file], null, 2) + '\n', 'utf8');
});

console.log('All theme files saved successfully.');
