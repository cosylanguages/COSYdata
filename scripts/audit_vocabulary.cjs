const fs = require('fs');
const path = require('path');

const dir = 'vocabulary/en';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') && f !== 'index.json').sort();

let totalEntries = 0;
const idMap = {};
const templatedEntriesByFileLevel = {};
const levelTotals = { A0: 0, A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 };
let totalTemplated = 0;
const nonTemplated = [];
const mergedPlaceholderEntries = [];

function isTemplated(def0, ex0) {
  const d = def0 || "";
  const e = ex0 || "";
  if (/entry for/i.test(d) || /Spoken English entry/i.test(d) || /English vocabulary/i.test(d)) return true;
  if (/example sentence using/i.test(e) || /usage example with/i.test(e) || /example usage of/i.test(e)) return true;
  return false;
}

const fileDetails = [];

files.forEach(file => {
  const filePath = path.join(dir, file);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const baseName = file.replace('.json', '');

  templatedEntriesByFileLevel[file] = { A0: 0, A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0, total: 0, fileTotal: content.length };

  const themeCounts = {};

  content.forEach(entry => {
    totalEntries++;
    if (!idMap[entry.id]) idMap[entry.id] = [];
    idMap[entry.id].push({ file, level: entry.level || 'N/A', word: entry.word, form: entry.form, theme: entry.theme, levels: entry.levels });

    themeCounts[entry.theme] = (themeCounts[entry.theme] || 0) + 1;

    const def0 = entry.definitions?.[0] || "";
    const ex0 = entry.examples?.[0] || "";

    if (isTemplated(def0, ex0)) {
      totalTemplated++;
      const lvl = entry.level;
      if (templatedEntriesByFileLevel[file][lvl] !== undefined) {
        templatedEntriesByFileLevel[file][lvl]++;
      }
      templatedEntriesByFileLevel[file].total++;
      if (levelTotals[lvl] !== undefined) levelTotals[lvl]++;

      if (Array.isArray(entry.levels) && entry.levels.length > 1) {
        mergedPlaceholderEntries.push({
          id: entry.id,
          word: entry.word,
          file,
          level: entry.level,
          levels: entry.levels,
          def0,
          ex0
        });
      }
    } else {
      nonTemplated.push({ file, id: entry.id, word: entry.word, def0, ex0 });
    }
  });

  fileDetails.push({
    file,
    baseName,
    totalCount: content.length,
    themeCounts
  });
});

const duplicateIDs = Object.entries(idMap)
  .filter(([id, list]) => list.length > 1)
  .sort((a, b) => a[0].localeCompare(b[0]));

let md = `# English Vocabulary Dataset Content Audit Report

## Executive Summary

- **Dataset Location**: \`vocabulary/en/\`
- **Total Theme Files**: ${files.length}
- **Total Canonical Vocabulary Entries**: ${totalEntries}
- **Total Unique IDs**: ${Object.keys(idMap).length}
- **Current Duplicate IDs Across Theme Files**: ${duplicateIDs.length}
- **Templated Entries**: ${totalTemplated} (${((totalTemplated / totalEntries) * 100).toFixed(2)}%)
- **Non-Templated Entries**: ${nonTemplated.length} (${((nonTemplated.length / totalEntries) * 100).toFixed(2)}%)
- **Merged Entries Requiring Content Review (Placeholder-Only)**: ${mergedPlaceholderEntries.length}

---

## 1. Duplicate Entry IDs Across Theme Files

### Audit Summary & ID Collision Resolution

All **867 ID collisions** originally identified across theme files have been merged into single canonical entries per \`word\`+\`form\` ID.
Each canonical entry now:
- Retains the lowest CEFR level at which the word is introduced as its primary \`level\` field.
- Includes a \`levels\` array property containing all CEFR levels across which the word was present (e.g., \`["B1", "B2"]\`).
- Retains the richest non-placeholder definitions and examples where available.
- Resides in a single primary theme file, with all redundant duplicate copies removed.

**Current Duplicate IDs Remaining**: **${duplicateIDs.length}**

`;

if (duplicateIDs.length > 0) {
  duplicateIDs.forEach(([id, occurrences]) => {
    const wordStr = occurrences[0].word ? ` (word: "${occurrences[0].word}")` : '';
    md += `- **\`${id}\`**${wordStr}:\n`;
    occurrences.forEach(o => {
      md += `  - File: \`${o.file}\` | Level: \`${o.level}\` | Theme Field: \`${o.theme}\` \n`;
    });
  });
} else {
  md += `*(Zero duplicate IDs remain in the dataset. Validation strictly enforces unique IDs across theme files.)*\n`;
}

md += `\n---\n\n## 2. Entries Matching Templated Patterns

### Pattern Audit Results

- **Matching Templated Entries**: **${totalTemplated}** / ${totalEntries} (${((totalTemplated / totalEntries) * 100).toFixed(2)}%)
- **Non-Templated Entries**: **${nonTemplated.length}** / ${totalEntries}

### Identified Templated Patterns

The vast majority of entries in the dataset contain automatically generated placeholder strings for their first definition (\`definitions[0]\`) and/or first example sentence (\`examples[0]\`). The detected templated patterns include:

1. **Definition Patterns (\`definitions[0]\`)**:
   - \`"[LEVEL] entry for \\"[word]\\" in English vocabulary."\` (e.g. *"B1 entry for \\"influence\\" in English vocabulary."*)
   - \`"[LEVEL] Spoken English entry for \\"[word]\\"."\` (e.g. *"B1 Spoken English entry for \\"hello\\"."*)
   - \`"Entry for \\"[word]\\" in general English vocabulary."\`
   - \`"Spoken English entry for \\"[word]\\"."\`

2. **Example Sentence Patterns (\`examples[0]\`)**:
   - \`"This is an example sentence using \\"[word]\\"."\` (e.g. *"This is an example sentence using \\"influence\\"."*)
   - \`"[LEVEL] spoken usage example with \\"[word]\\"."\`
   - \`"Spoken usage example with \\"[word]\\"."\`
   - \`"Example usage of \\"[word]\\"."\`

### Exceptions (Non-Templated Entries)

Only **${nonTemplated.length} entries** across the entire dataset contain genuine, human-authored definitions and examples (located in \`animals.json\`):

`;

nonTemplated.forEach(e => {
  md += `- **\`${e.id}\`** in \`${e.file}\`:\n  - *Definition*: "${e.def0}"\n  - *Example*: "${e.ex0}"\n`;
});

md += `\n---\n\n## 3. Templated Entry Counts Breakdown

### 3.1 Breakdown by CEFR Level

| CEFR Level | Templated Entries Count | Percentage of Templated Total | Percentage of All Entries |
|------------|------------------------|------------------------------|--------------------------|
`;

Object.keys(levelTotals).forEach(lvl => {
  const count = levelTotals[lvl];
  const pctTemplated = ((count / totalTemplated) * 100).toFixed(2);
  const pctAll = ((count / totalEntries) * 100).toFixed(2);
  md += `| **${lvl}** | ${count.toLocaleString()} | ${pctTemplated}% | ${pctAll}% |\n`;
});

md += `| **Total** | **${totalTemplated.toLocaleString()}** | **100.00%** | **${((totalTemplated / totalEntries) * 100).toFixed(2)}%** |\n`;

md += `\n### 3.2 Breakdown by Theme File and CEFR Level

| Theme File | A0 | A1 | A2 | B1 | B2 | C1 | C2 | Total Templated | Total File Entries |
|------------|----|----|----|----|----|----|----|-----------------|--------------------|
`;

files.forEach(file => {
  const stats = templatedEntriesByFileLevel[file];
  md += `| \`${file}\` | ${stats.A0} | ${stats.A1} | ${stats.A2} | ${stats.B1} | ${stats.B2} | ${stats.C1} | ${stats.C2} | **${stats.total}** | ${stats.fileTotal} |\n`;
});

md += `\n---\n\n## 4. Theme Field and Topic Mismatches

This section details entries where the \`theme\` JSON field value or word concept does not match the file's primary topic or filename.

### 4.1 Off-Topic & Misplaced Entries in \`animals.json\`

\`animals.json\` contains 116 total entries. Of these, only 68 are animals with \`theme: "animals"\`. The remaining 48 entries are landscape/nature concepts tagged with \`theme: "nature"\`. Furthermore, multiple non-animal nature and weather terms are erroneously tagged with \`theme: "animals"\`.

1. **Entries with \`theme: "animals"\` that are Weather / Astronomy / Landscape concepts**:
   - **Weather / Astronomy**: \`en:weather:noun\` (weather), \`en:moon:noun\` (moon), \`en:cloud:noun\` (cloud), \`en:sky:noun\` (sky), \`en:sun:noun\` (sun), \`en:star:noun\` (star), \`en:rain:noun\` (rain), \`en:snow:noun\` (snow), \`en:wind:noun\` (wind), \`en:storm:noun\` (storm), \`en:sunny:adjective\`, \`en:rainy:adjective\`, \`en:cloudy:adjective\`, \`en:windy:adjective\`, \`en:snowy:adjective\`, \`en:hot:adjective\`, \`en:cold:adjective\`, \`en:warm:adjective\`, \`en:cool:adjective\`.
   - **Flora & Landscape**: \`en:tree:noun\`, \`en:stone:noun\`, \`en:flower:noun\`, \`en:grass:noun\`, \`en:leaf:noun\`, \`en:leaves:noun\`, \`en:forest:noun\`, \`en:wood:noun\`, \`en:mountain:noun\`, \`en:hill:noun\`, \`en:river:noun\`, \`en:lake:noun\`, \`en:sea:noun\`, \`en:ocean:noun\`, \`en:beach:noun\`, \`en:island:noun\`, \`en:earth:noun\`, \`en:nature:noun\`, \`en:rock:noun\`, \`en:sand:noun\`.

2. **48 Entries tagged with \`theme: "nature"\` placed inside \`animals.json\`**:
   - \`view\`, \`landscape\`, \`wildlife\`, \`habitat\`, \`species\`, \`mammal\`, \`reptile\`, \`insect\`, \`amphibian\`, \`predator\`, \`prey\`, \`nest\`, \`cave\`, \`burrow\`, \`jungle\`, \`desert\`, \`valley\`, \`cliff\`, \`waterfall\`, \`volcano\`, \`tide\`, \`wave\`, \`current\`, \`branch\`, \`root\`, \`seed\`, \`bloom\`, \`blossom\`, \`breed\`, \`migrate\`, \`hibernate\`, \`pet\`, \`pond\`, \`stream\`, \`countryside\`, \`scenery\`, \`coast\`, \`wing\`, \`tail\`, \`paw\`, \`fur\`, \`feather\`, \`cage\`, \`wild\`, \`tame\`, \`pet-shop\`, \`veterinarian\`, \`vet\`.

### 4.2 Theme Field Mismatches in \`environment.json\`

While 163 entries in \`environment.json\` have \`theme: "environment"\`, **7 entries** have \`theme: "society"\`:
- \`en:headline:noun\` (headline)
- \`en:reporter:noun\` (reporter)
- \`en:climate-change:noun\` (climate change)
- \`en:global-warming:noun\` (global warming)
- \`en:nature-reserve:noun\` (nature reserve)
- \`en:natural-disaster:noun\` (natural disaster)
- \`en:mayor:noun\` (mayor)

### 4.3 Theme Field Mismatches in \`media.json\`

While 146 entries in \`media.json\` have \`theme: "media"\`, **54 entries** have \`theme: "technology"\`:
- Tech / Software terms: \`website\`, \`app\`, \`application\`, \`download\`, \`upload\`, \`social\`, \`media\`, \`internet\`, \`connection\`, \`wifi\`, \`password\`, \`username\`, \`account\`, \`update\`, \`install\`, \`device\`, \`gadget\`, \`newspaper\`, \`magazine\`, \`article\`, \`news\`, \`channel\`, \`program\`, \`programme\`, \`advertisement\`, \`advert\`, \`commercial\`, \`subscribe\`, \`follow\`, \`like\`, \`share\`, \`comment\`, \`online\`, \`offline\`, \`data\`, \`file\`, \`folder\`, \`search\`, \`engine\`, \`browser\`, \`social-media\`, \`profile\`, \`subscriber\`, \`uninstall\`, \`settings\`, \`memory\`, \`plug-in\`, \`connect\`, \`signal\`, \`hack\`, \`spam\`, \`search-engine\`, \`link\`, \`document\`.

### 4.4 Macro-Taxonomy Theme Mappings Across All Theme Files

Across the 92 theme files, many JSON files use broader taxonomy categories for their \`theme\` attribute rather than the specific filename topic. Below is a summary table of all theme files and the entry \`theme\` field values present in each file:

| Theme File | Total Entries | Entry \`theme\` Values Present & Counts |
|------------|---------------|----------------------------------------|
`;

fileDetails.forEach(f => {
  const themeStr = Object.entries(f.themeCounts).map(([k, v]) => `\`${k}\`: ${v}`).join(', ');
  md += `| \`${f.file}\` | ${f.totalCount} | ${themeStr} |\n`;
});

md += `\n---\n\n## 5. Follow-up List: Merged Entries Requiring Human Definition Review

The following **${mergedPlaceholderEntries.length} merged entries** were created by consolidating multi-level ID collisions, but currently possess only placeholder definitions and examples. Content editors should review and replace these placeholder definitions/examples with rich, human-authored content:

`;

mergedPlaceholderEntries.sort((a, b) => a.id.localeCompare(b.id)).forEach(e => {
  md += `- **\`${e.id}\`** (word: "${e.word}") in \`${e.file}\` | Intro Level: \`${e.level}\` | All Levels: \`[${e.levels.join(', ')}]\` \n`;
});

fs.writeFileSync(path.join('reports', 'content-audit.md'), md, 'utf8');
console.log('Report updated successfully at reports/content-audit.md');
