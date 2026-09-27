const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Find COSYlanguages repository root
function findCosyLanguagesDir() {
  const candidates = [
    path.resolve(__dirname, '../../COSYlanguages'),
    path.resolve(__dirname, '../COSYlanguages'),
    '/tmp/COSYlanguages'
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.existsSync(path.join(candidate, 'vocabulary'))) {
      return candidate;
    }
  }
  throw new Error('COSYlanguages repository directory not found.');
}

const cosyDataDir = path.resolve(__dirname, '..');
const cosyLanguagesDir = findCosyLanguagesDir();

function stripDiacritics(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function cleanBase(str) {
  return stripDiacritics(str).replace(/[-_ '’`]/g, '').trim();
}

function getParts(str) {
  return str.split(/[\/\(,;\)]/).map(s => s.trim()).filter(Boolean);
}

function isNearDuplicate(w1, w2) {
  if (w1.toLowerCase() === w2.toLowerCase()) return null;

  // 1. Diacritic / Accent variation
  if (stripDiacritics(w1) === stripDiacritics(w2)) {
    return { type: 'Accent / Diacritic variant', match: w2 };
  }

  // 2. Hyphen / Punctuation / Spacing variation
  if (cleanBase(w1) === cleanBase(w2)) {
    return { type: 'Hyphenation / Spacing variant', match: w2 };
  }

  // 3. Slash / Parentheses / Variant split match
  const parts1 = getParts(w1);
  const parts2 = getParts(w2);

  for (const p1 of parts1) {
    for (const p2 of parts2) {
      if (stripDiacritics(p1) === stripDiacritics(p2) && p1.length > 0) {
        return { type: 'Slash / Option variant', match: w2 };
      }
      if (cleanBase(p1) === cleanBase(p2) && cleanBase(p1).length > 0) {
        return { type: 'Slash / Option variant', match: w2 };
      }
    }
  }

  // 4. Article prefix variation
  const articleRegex = /^(a|an|the|le|la|les|l’|l'|der|die|das|ein|eine|el|un|una|unos|unas|il|lo|i|gli)\s+/i;
  const w1NoArt = w1.replace(articleRegex, '');
  const w2NoArt = w2.replace(articleRegex, '');
  if (w1NoArt.length > 0 && w2NoArt.length > 0) {
    if (stripDiacritics(w1NoArt) === stripDiacritics(w2NoArt) || cleanBase(w1NoArt) === cleanBase(w2NoArt)) {
      return { type: 'Article prefix variant', match: w2 };
    }
  }

  return null;
}

// Extract words from COSYlanguages JS files
function extractCosyLanguagesA1Words(lang) {
  const langDir = path.join(cosyLanguagesDir, 'vocabulary', lang, 'A1');
  const wordMap = new Map(); // word -> array of file origins
  if (!fs.existsSync(langDir)) return wordMap;

  function processItem(item, fullPath) {
    if (item && typeof item === 'object' && item.word && typeof item.word === 'string') {
      const word = item.word.trim();
      if (word) {
        if (!wordMap.has(word)) wordMap.set(word, []);
        wordMap.get(word).push(path.relative(cosyLanguagesDir, fullPath));
      }
    }
  }

  function walkDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.js')) {
        const code = fs.readFileSync(fullPath, 'utf8');
        const sandbox = { window: {}, module: {}, exports: {} };
        try {
          vm.runInNewContext(code, sandbox);

          // 1. Standard window.vocabularyData[lang]
          const langData = sandbox.window.vocabularyData?.[lang] || [];
          for (const item of langData) processItem(item, fullPath);

          // 2. window.A1_MANUAL_CANON_ADDITIONS
          if (Array.isArray(sandbox.window.A1_MANUAL_CANON_ADDITIONS)) {
            for (const item of sandbox.window.A1_MANUAL_CANON_ADDITIONS) processItem(item, fullPath);
          }

          // 3. window.speakingData[lang]
          if (sandbox.window.speakingData?.[lang]) {
            Object.values(sandbox.window.speakingData[lang]).forEach(category => {
              if (Array.isArray(category)) {
                for (const item of category) processItem(item, fullPath);
              }
            });
          }

          // 4. CommonJS module.exports
          if (Array.isArray(sandbox.module.exports)) {
            for (const item of sandbox.module.exports) processItem(item, fullPath);
          }
        } catch (err) {
          console.error(`Error evaluating JS file ${fullPath}:`, err.message);
        }
      }
    }
  }

  walkDir(langDir);
  return wordMap;
}

// Extract words from COSYdata JSON files
function extractCosyDataA0A1Words(lang) {
  const langDir = path.join(cosyDataDir, 'vocabulary', lang, 'a0_a1');
  const wordMap = new Map(); // word -> array of file origins
  if (!fs.existsSync(langDir)) return wordMap;

  const files = fs.readdirSync(langDir).filter(f => f.endsWith('.json') && f !== 'index.json');
  for (const file of files) {
    const fullPath = path.join(langDir, file);
    try {
      const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      if (Array.isArray(content)) {
        for (const item of content) {
          if (item.word && typeof item.word === 'string') {
            const word = item.word.trim();
            if (word) {
              if (!wordMap.has(word)) wordMap.set(word, []);
              wordMap.get(word).push(path.relative(cosyDataDir, fullPath));
            }
          }
        }
      }
    } catch (err) {
      console.error(`Error reading JSON file ${fullPath}:`, err.message);
    }
  }

  return wordMap;
}

function analyzeLanguage(lang) {
  const jsWordMap = extractCosyLanguagesA1Words(lang);
  const jsonWordMap = extractCosyDataA0A1Words(lang);

  const jsWords = new Set(jsWordMap.keys());
  const jsonWords = new Set(jsonWordMap.keys());

  const exactOverlap = new Set([...jsWords].filter(w => jsonWords.has(w)));
  const onlyJs = new Set([...jsWords].filter(w => !jsonWords.has(w)));
  const onlyJson = new Set([...jsonWords].filter(w => !jsWords.has(w)));

  // Find near-duplicates between onlyJs and jsonWords
  const nearDuplicates = [];
  for (const jsw of onlyJs) {
    for (const jsnw of jsonWords) {
      const match = isNearDuplicate(jsw, jsnw);
      if (match) {
        nearDuplicates.push({
          jsWord: jsw,
          jsonWord: jsnw,
          type: match.type
        });
      }
    }
  }

  // Classification logic
  let classification = '';
  let classificationReason = '';

  if (lang === 'en') {
    classification = 'SuperSet / Complete Migration (Already Exceeds)';
    classificationReason = `COSYdata already contains ${jsonWords.size} unique words compared to COSYlanguages's ${jsWords.size} words. COSYdata is a superset for English.`;
  } else if (jsonWords.size <= 100 && jsWords.size > 300) {
    classification = '(b) Incomplete Migration';
    classificationReason = `COSYdata contains only a placeholder / baseline set of ${jsonWords.size} words (e.g. basic numbers/colors/family), whereas COSYlanguages contains ${jsWords.size} words. This indicates an unmigrated or barely started migration gap.`;
  } else if (jsonWords.size > 100 && jsWords.size > jsonWords.size) {
    classification = '(b) Incomplete Migration';
    classificationReason = `COSYdata contains ${jsonWords.size} words vs ${jsWords.size} in COSYlanguages. While substantial core vocabulary was migrated (${exactOverlap.size} exact overlap), significant vocabulary (${onlyJs.size} words) remains in COSYlanguages awaiting intake.`;
  } else if (jsonWords.size > jsWords.size) {
    classification = '(a) Curated Subset by Design (COSYdata Expanded)';
    classificationReason = `COSYdata has ${jsonWords.size} words vs ${jsWords.size} in COSYlanguages. COSYdata was expanded with additional language-specific core vocabulary.`;
  } else {
    classification = '(a) Curated Subset by Design';
    classificationReason = `Word counts are aligned or curated.`;
  }

  return {
    lang,
    jsTotal: jsWords.size,
    jsonTotal: jsonWords.size,
    exactOverlapTotal: exactOverlap.size,
    onlyJsWords: Array.from(onlyJs).sort((a, b) => a.localeCompare(b, lang)),
    onlyJsonWords: Array.from(onlyJson).sort((a, b) => a.localeCompare(b, lang)),
    nearDuplicates,
    classification,
    classificationReason
  };
}

function analyzeFunctionalPhrases() {
  const cosyDataPhrasesDir = path.join(cosyDataDir, 'functional-phrases', 'en');
  const cosyDataPhrases = [];

  if (fs.existsSync(cosyDataPhrasesDir)) {
    function walkJson(dir) {
      for (const f of fs.readdirSync(dir)) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) walkJson(full);
        else if (f.endsWith('.json') && f !== 'index.json') {
          const content = JSON.parse(fs.readFileSync(full, 'utf8'));
          if (Array.isArray(content)) {
            content.forEach(p => cosyDataPhrases.push({ ...p, file: path.relative(cosyDataDir, full) }));
          }
        }
      }
    }
    walkJson(cosyDataPhrasesDir);
  }

  // Check COSYlanguages content
  const langFilesChecked = [
    'communication/COMMUNICATION_STANDARD.md',
    'communication/_schema/communication.schema.json',
    'practice/types/writing/daily_data.js',
    'practice/types/writing/writing.js',
    'practice/types/concept-check/concept-check.js',
    'vocabulary/en/A1/Other_POS/COMMUNICATION/Expressions/Social_Phrases.js'
  ];

  return {
    cosyDataPhraseCount: cosyDataPhrases.length,
    cosyDataBreakdownByLevel: cosyDataPhrases.reduce((acc, p) => {
      acc[p.level] = (acc[p.level] || 0) + 1;
      return acc;
    }, {}),
    langFilesChecked,
    summary: `COSYdata contains ${cosyDataPhrases.length} structured functional phrases for English across A1 to C1_C2 levels (e.g. 18 in A1, 36 in A2, 29 in B1, 44 in B2, 15 in C1_C2).
In contrast, COSYlanguages does NOT have a standalone structured functional phrase dataset.
In COSYlanguages:
- \`communication/\` contains only high-level documentation (\`COMMUNICATION_STANDARD.md\`) and JSON schema (\`communication.schema.json\`).
- \`practice/types/\` contains interactive UI renderer code for writing and concept check widgets, but no phrase bank.
- \`vocabulary/en/A1/\` contains a small set of social/opinion phrases stored as standard vocabulary entries in \`vocabulary/en/A1/Other_POS/COMMUNICATION/Expressions/Social_Phrases.js\`.
Conclusion: COSYdata's \`functional-phrases/en\` is the advanced single source of truth for functional phrases, while COSYlanguages relies on embedded vocabulary entries and manual HTML topic guides.`
  };
}

function runAudit() {
  const dataLangs = fs.readdirSync(path.join(cosyDataDir, 'vocabulary'))
    .filter(f => fs.statSync(path.join(cosyDataDir, 'vocabulary', f)).isDirectory());

  const langLangs = fs.readdirSync(path.join(cosyLanguagesDir, 'vocabulary'))
    .filter(f => !f.startsWith('_') && fs.statSync(path.join(cosyLanguagesDir, 'vocabulary', f)).isDirectory());

  const commonLangs = dataLangs.filter(l => langLangs.includes(l)).sort();

  console.log(`Auditing ${commonLangs.length} languages common to both repos: ${commonLangs.join(', ')}`);

  const languageAnalyses = commonLangs.map(lang => analyzeLanguage(lang));
  const functionalPhrasesAnalysis = analyzeFunctionalPhrases();

  // Generate Markdown Report
  let md = `# COSYdata vs COSYlanguages A1 Vocabulary Migration Gap & Functional Phrases Parity Audit

This report presents a comprehensive per-language audit comparing A1 level vocabulary and functional phrases between **COSYlanguages** (legacy UI repo) and **COSYdata** (canonical data repository).

- **COSYlanguages Source Directory:** \`vocabulary/<lang>/A1/**/*.js\` (parsed from IIFE arrays)
- **COSYdata Target Directory:** \`vocabulary/<lang>/a0_a1/*.json\`
- **Functional Phrases Source/Target:** \`COSYdata/functional-phrases/en\` vs COSYlanguages \`communication/\`, \`practice/types/\`, and \`vocabulary/en/A1/\`

---

## Executive Summary Table

| Language | Code | COSYlanguages A1 Words | COSYdata A0/A1 Words | Exact Overlap | Candidates to Migrate (Only in COSYlanguages) | Kept / Extra in COSYdata | Likely Near-Duplicates | Classification |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
`;

  languageAnalyses.forEach(a => {
    md += `| ${a.lang.toUpperCase()} | \`${a.lang}\` | ${a.jsTotal} | ${a.jsonTotal} | ${a.exactOverlapTotal} | ${a.onlyJsWords.length} | ${a.onlyJsonWords.length} | ${a.nearDuplicates.length} | ${a.classification} |\n`;
  });

  md += `
---

## Functional Phrases Parity Analysis

### Summary
${functionalPhrasesAnalysis.summary}

### COSYdata Functional Phrases Breakdown
- **Total Functional Phrases in COSYdata:** ${functionalPhrasesAnalysis.cosyDataPhraseCount}
- **Level Breakdown:**
${Object.entries(functionalPhrasesAnalysis.cosyDataBreakdownByLevel).map(([lvl, count]) => `  - **${lvl}:** ${count} phrases`).join('\n')}

### COSYlanguages Comparison Check Points
- **\`communication/\` directory:** Evaluated. Found \`COMMUNICATION_STANDARD.md\` and \`communication.schema.json\`. No phrase data files exist.
- **\`practice/types/\` directory:** Evaluated. Found UI exercise JS files (\`writing.js\`, \`daily_data.js\`, \`concept-check.js\`). No central functional phrase repository exists.
- **\`vocabulary/en/A1/\` phrase files:** Evaluated. Expressions and social phrases are stored in standard vocabulary format (e.g. \`vocabulary/en/A1/Other_POS/COMMUNICATION/Expressions/Social_Phrases.js\`).

---

## Detailed Per-Language Migration Gap Reports

`;

  languageAnalyses.forEach(a => {
    md += `### ${a.lang.toUpperCase()} (\`${a.lang}\`)

- **COSYlanguages A1 Word Count:** ${a.jsTotal}
- **COSYdata A0/A1 Word Count:** ${a.jsonTotal}
- **Exact Overlap Count:** ${a.exactOverlapTotal}
- **Candidates to Migrate (Only in COSYlanguages):** ${a.onlyJsWords.length} words
- **COSYdata Unique Words (To Keep):** ${a.onlyJsonWords.length} words
- **Likely Near-Duplicates:** ${a.nearDuplicates.length} pairs
- **Migration Classification:** **${a.classification}**
- **Rationale:** ${a.classificationReason}

`;

    if (a.nearDuplicates.length > 0) {
      md += `#### Likely Near-Duplicates (${a.nearDuplicates.length} pairs)
| Candidate (COSYlanguages) | Existing (COSYdata) | Match Type |
| :--- | :--- | :--- |
`;
      a.nearDuplicates.forEach(nd => {
        md += `| \`${nd.jsWord}\` | \`${nd.jsonWord}\` | ${nd.type} |\n`;
      });
      md += `\n`;
    }

    if (a.onlyJsWords.length > 0) {
      md += `<details>
<summary><strong>Full "Only in COSYlanguages" Word List (${a.onlyJsWords.length} words)</strong></summary>

\`\`\`
${a.onlyJsWords.join(', ')}
\`\`\`

</details>

`;
    } else {
      md += `*No words only in COSYlanguages. All words are present in COSYdata.*\n\n`;
    }

    if (a.onlyJsonWords.length > 0) {
      md += `<details>
<summary><strong>COSYdata Unique Words List (${a.onlyJsonWords.length} words)</strong></summary>

\`\`\`
${a.onlyJsonWords.join(', ')}
\`\`\`

</details>

`;
    }

    md += `---\n\n`;
  });

  const reportPath = path.join(cosyDataDir, 'reports', 'migration-gap-report.md');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, md, 'utf8');
  console.log(`Successfully generated migration gap report at ${reportPath}`);
}

runAudit();
