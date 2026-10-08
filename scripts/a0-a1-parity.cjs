const fs = require('fs');
const path = require('path');

const TARGET_LANGS = ['en', 'fr', 'it', 'ru', 'el'];

const ALLOWED_FORMS = new Set([
  'noun',
  'verb',
  'adjective',
  'adverb',
  'pronoun',
  'preposition',
  'conjunction',
  'determiner',
  'number',
  'phrase'
]);

const ALLOWED_DOMAINS = new Set(['general', 'spoken', 'travel']);

const LEVEL_RANKS = {
  A0: 0,
  A1: 1,
  A2: 2,
  B1: 3,
  B2: 4,
  C1: 5,
  C2: 6
};

const LEADING_ARTICLES = [
  // English
  'the ', 'a ', 'an ',
  // French
  'le ', 'la ', "l'", "l’", 'les ', 'un ', 'une ', 'des ', 'du ', 'de la ', "de l'", "de l’",
  // Italian
  'il ', 'lo ', 'la ', "l'", "l’", 'i ', 'gli ', 'le ', 'un ', 'uno ', 'una ', "un'", "un’",
  // Greek
  'ο ', 'η ', 'το ', 'οι ', 'τα ', 'ένας ', 'μία ', 'ένα '
];

function norm(s) {
  if (!s) return '';
  let str = s.toLowerCase().trim();
  // Strip NFD diacritics
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  // Normalize quotes
  str = str.replace(/[’']/g, "'");

  // Strip leading articles
  let changed = true;
  while (changed) {
    changed = false;
    for (const art of LEADING_ARTICLES) {
      const artNorm = art.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      if (str.startsWith(artNorm)) {
        str = str.slice(artNorm.length).trim();
        changed = true;
        break;
      }
    }
  }

  // Remove non-alphanumeric except spaces
  str = str.replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
  return str;
}

function parseArgs() {
  const args = process.argv.slice(2);
  let strict = false;
  for (const arg of args) {
    if (arg === '--strict') strict = true;
  }
  return { strict };
}

function loadLevelEntries(rootDir, lang, level) {
  const dir = path.join(rootDir, 'vocabulary', lang, level);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
  const entries = [];
  files.forEach((f) => {
    try {
      const content = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
      if (Array.isArray(content)) {
        content.forEach((e) => {
          entries.push({ ...e, _filename: f });
        });
      }
    } catch (err) {
      console.error(`Error loading ${path.join(dir, f)}: ${err.message}`);
    }
  });
  return entries;
}

function loadTargetFile(rootDir) {
  const targetPath = path.join(rootDir, 'reports', 'a0_a1_target.json');
  if (fs.existsSync(targetPath)) {
    try {
      return JSON.parse(fs.readFileSync(targetPath, 'utf8'));
    } catch (e) {
      console.warn(`[WARNING] Could not parse reports/a0_a1_target.json: ${e.message}`);
    }
  }
  return null;
}

function loadEssentials(rootDir) {
  const tsvPath = path.join(rootDir, 'scripts', 'data', 'a0_a1_essentials.tsv');
  const exemptPath = path.join(rootDir, 'scripts', 'data', 'a0_a1_essentials_exempt.txt');

  if (!fs.existsSync(exemptPath)) {
    fs.mkdirSync(path.dirname(exemptPath), { recursive: true });
    fs.writeFileSync(exemptPath, '', 'utf8');
  }

  const exemptKeys = new Set();
  const exemptContent = fs.readFileSync(exemptPath, 'utf8');
  exemptContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const parts = trimmed.split('\t');
    exemptKeys.add(parts[0].trim());
  });

  if (!fs.existsSync(tsvPath)) {
    return { essentials: [], exemptKeys };
  }

  const tsvContent = fs.readFileSync(tsvPath, 'utf8');
  const lines = tsvContent.split('\n').map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return { essentials: [], exemptKeys };

  const headers = lines[0].split('\t').map((h) => h.trim());
  const essentials = [];

  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split('\t');
    const row = {};
    headers.forEach((h, idx) => {
      row[h] = parts[idx] ? parts[idx].trim() : '';
    });
    const key = row.en || parts[0] || `row_${i}`;
    if (!exemptKeys.has(key)) {
      essentials.push({ key, row });
    }
  }

  return { essentials, exemptKeys };
}

function main() {
  const { strict } = parseArgs();
  const rootDir = path.join(__dirname, '..');

  const targetData = loadTargetFile(rootDir);
  const { essentials, exemptKeys } = loadEssentials(rootDir);

  const langData = {};
  const allEntriesMap = new Map(); // id -> entry

  TARGET_LANGS.forEach((lang) => {
    const entries = loadLevelEntries(rootDir, lang, 'a0_a1');
    entries.forEach((e) => {
      if (e.id) allEntriesMap.set(e.id, e);
    });

    let a0Count = 0;
    let a1Count = 0;
    const themeCounts = {};

    entries.forEach((e) => {
      if (e.level === 'A0') a0Count++;
      else if (e.level === 'A1') a1Count++;

      const theme = e.theme || 'unassigned';
      themeCounts[theme] = (themeCounts[theme] || 0) + 1;
    });

    langData[lang] = {
      entries,
      total: entries.length,
      a0Count,
      a1Count,
      themeCounts
    };
  });

  // Validation checks per language
  const violations = {};
  let totalViolations = 0;

  const FR_MASS_NOUNS = new Set(['poulet', 'poisson', 'fromage', 'sport', 'musique', 'temps', 'argent', 'chance']);
  const IT_MASS_NOUNS = new Set(['pane', 'frutta', 'acqua', 'spaghetti', 'latte', 'caffè', 'riso', 'carne', 'formaggio', 'zucchero', 'vino', 'birra', 'tè', 'burro', 'pasta']);

  const REQUIRED_CONTRACTED_FORMS = {
    fr: ['au', 'aux', 'du', 'des'],
    it: [
      'al', 'allo', 'alla', "all'", 'ai', 'agli', 'alle',
      'del', 'dello', 'della', "dell'", 'dei', 'degli', 'delle',
      'nel', 'nello', 'nella', "nell'", 'nei', 'negli', 'nelle',
      'sul', 'sullo', 'sulla', "sull'", 'sui', 'sugli', 'sulle',
      'dal', 'dallo', 'dalla', "dall'", 'dai', 'dagli', 'dalle'
    ],
    el: ['στο', 'στη', 'στην', 'στον', 'στα', 'στους', 'στις']
  };

  TARGET_LANGS.forEach((lang) => {
    violations[lang] = {
      domainViolations: [],
      formViolations: [],
      levelViolations: [],
      duplicateIds: [],
      duplicateWordFormSense: [],
      missingPartitives: [],
      missingContractions: []
    };

    const entries = langData[lang].entries;

    // Check duplicate IDs
    const idMap = new Map();
    entries.forEach((e) => {
      if (!e.id) return;
      idMap.set(e.id, (idMap.get(e.id) || 0) + 1);
    });
    idMap.forEach((cnt, id) => {
      if (cnt > 1) {
        violations[lang].duplicateIds.push(`ID '${id}' appears ${cnt} times`);
        totalViolations += cnt - 1;
      }
    });

    // Check duplicate word + form + sense
    const wfsMap = new Map();
    entries.forEach((e) => {
      const key = `${norm(e.word)}::${e.form || ''}::${e.sense || ''}`;
      if (!wfsMap.has(key)) wfsMap.set(key, []);
      wfsMap.get(key).push(e.id);
    });
    wfsMap.forEach((ids, key) => {
      if (ids.length > 1) {
        violations[lang].duplicateWordFormSense.push(
          `Word+form+sense '${key}' duplicated across IDs: ${ids.join(', ')}`
        );
        totalViolations += ids.length - 1;
      }
    });

    // Domain check: general/spoken/travel only, general must be first
    entries.forEach((e) => {
      if (!e.domain) {
        violations[lang].domainViolations.push(`Entry '${e.id}' has missing domain`);
        totalViolations++;
        return;
      }
      const tags = e.domain.split(',').map((s) => s.trim()).filter(Boolean);
      if (tags.length === 0 || tags[0] !== 'general') {
        violations[lang].domainViolations.push(
          `Entry '${e.id}' domain '${e.domain}' must have 'general' as first tag`
        );
        totalViolations++;
      }
      tags.forEach((tag) => {
        if (!ALLOWED_DOMAINS.has(tag)) {
          violations[lang].domainViolations.push(
            `Entry '${e.id}' domain tag '${tag}' not allowed at A0-A1`
          );
          totalViolations++;
        }
      });
    });

    // Form check: allowed forms only
    entries.forEach((e) => {
      if (!e.form || !ALLOWED_FORMS.has(e.form)) {
        violations[lang].formViolations.push(
          `Entry '${e.id}' form '${e.form}' is not an allowed form at A0-A1`
        );
        totalViolations++;
      }
    });

    // Level check: level must be A0 or A1, equal to min of levels array if present
    entries.forEach((e) => {
      if (e.level !== 'A0' && e.level !== 'A1') {
        violations[lang].levelViolations.push(
          `Entry '${e.id}' level '${e.level}' must be 'A0' or 'A1'`
        );
        totalViolations++;
      }
      if (Array.isArray(e.levels) && e.levels.length > 0) {
        let minRank = Infinity;
        let minLvl = null;
        e.levels.forEach((l) => {
          const rank = LEVEL_RANKS[l] !== undefined ? LEVEL_RANKS[l] : 99;
          if (rank < minRank) {
            minRank = rank;
            minLvl = l;
          }
        });
        if (minLvl && e.level !== minLvl) {
          violations[lang].levelViolations.push(
            `Entry '${e.id}' level '${e.level}' does not equal min of levels [${e.levels.join(', ')}] ('${minLvl}')`
          );
          totalViolations++;
        }
      }
    });

    // Check missing partitives for fr and it
    if (lang === 'fr' || lang === 'it') {
      const massSet = lang === 'fr' ? FR_MASS_NOUNS : IT_MASS_NOUNS;
      entries.forEach((e) => {
        if (e.form === 'noun') {
          const wordLower = (e.word || '').toLowerCase();
          const isUncountable = e.countability === 'uncountable';
          const isPluraliaTantum = e.countability === 'pluralia_tantum';
          const isNormallyMass = massSet.has(wordLower);

          if ((isUncountable || isPluraliaTantum || isNormallyMass) && !e.partitive) {
            violations[lang].missingPartitives.push(
              `Noun '${e.word}' (${e.id}, countability '${e.countability}') missing required partitive`
            );
            totalViolations++;
          }
        }
      });
    }

    // Check missing contracted forms for fr, it, el
    if (REQUIRED_CONTRACTED_FORMS[lang]) {
      const existingContractionWords = new Set();
      entries.forEach((e) => {
        if (e.form === 'preposition') {
          const w = (e.word || '').toLowerCase().replace(/[’']/g, "'").trim();
          existingContractionWords.add(w);
        }
      });

      REQUIRED_CONTRACTED_FORMS[lang].forEach((req) => {
        const reqNorm = req.toLowerCase().replace(/[’']/g, "'").trim();
        if (!existingContractionWords.has(reqNorm)) {
          violations[lang].missingContractions.push(
            `Missing contracted preposition form '${req}'`
          );
          totalViolations++;
        }
      });
    }
  });

  // Essentials coverage check
  const missingEssentials = {};
  TARGET_LANGS.forEach((lang) => {
    missingEssentials[lang] = [];
  });

  essentials.forEach(({ key, row }) => {
    TARGET_LANGS.forEach((lang) => {
      const cell = row[lang] || '';
      if (!cell) {
        missingEssentials[lang].push({ key, cell: '', reason: 'empty essential cell in TSV' });
        return;
      }

      const variants = cell.split('/').map((v) => v.trim()).filter(Boolean);
      let matched = false;

      const langEntries = langData[lang].entries;

      for (const variant of variants) {
        const normVar = norm(variant);
        if (!normVar) continue;

        for (const entry of langEntries) {
          const normW = norm(entry.word);
          if (normW === normVar) {
            matched = true;
            break;
          }

          if (entry.plural_form && norm(entry.plural_form) === normVar) {
            matched = true;
            break;
          }

          if (Array.isArray(entry.related_forms)) {
            for (const rf of entry.related_forms) {
              if (norm(rf) === normVar) {
                matched = true;
                break;
              }
              // If related form is an ID reference
              if (allEntriesMap.has(rf)) {
                const targetEntry = allEntriesMap.get(rf);
                if (norm(targetEntry.word) === normVar) {
                  matched = true;
                  break;
                }
              }
            }
          }
          if (matched) break;
        }
        if (matched) break;
      }

      if (!matched) {
        missingEssentials[lang].push({ key, cell });
      }
    });
  });

  let totalMissingEssentials = 0;
  TARGET_LANGS.forEach((l) => {
    totalMissingEssentials += missingEssentials[l].length;
  });

  // Target deficit calculation
  let targetTotalDeficit = 0;
  if (targetData && targetData.target) {
    TARGET_LANGS.forEach((lang) => {
      const def = Math.max(0, targetData.target.total - langData[lang].total);
      targetTotalDeficit += def;
    });
  }

  // Console output
  console.log('====================================================');
  console.log('         COSYdata A0/A1 PARITY REPORT              ');
  console.log('====================================================\n');

  if (targetData && targetData.target) {
    console.log(`Target Set: Total = ${targetData.target.total}, A0 = ${targetData.target.A0}, A1 = ${targetData.target.A1}\n`);
  } else {
    console.log('Target File: Absent (reports/a0_a1_target.json not found). Reporting current counts only.\n');
  }

  TARGET_LANGS.forEach((lang) => {
    const data = langData[lang];
    console.log(`=== Language: ${lang.toUpperCase()} ===`);
    console.log(`  Total: ${data.total}`);
    console.log(`  A0:    ${data.a0Count}`);
    console.log(`  A1:    ${data.a1Count}`);

    if (targetData && targetData.target) {
      const defTotal = targetData.target.total - data.total;
      const defA0 = targetData.target.A0 - data.a0Count;
      const defA1 = targetData.target.A1 - data.a1Count;
      console.log(`  Deficit/Surplus vs Target: Total ${defTotal <= 0 ? '+' + Math.abs(defTotal) : '-' + defTotal}, A0 ${defA0 <= 0 ? '+' + Math.abs(defA0) : '-' + defA0}, A1 ${defA1 <= 0 ? '+' + Math.abs(defA1) : '-' + defA1}`);
    }

    const v = violations[lang];
    console.log(`  Violations: Domains=${v.domainViolations.length}, Forms=${v.formViolations.length}, Levels=${v.levelViolations.length}, DuplicateIDs=${v.duplicateIds.length}, DuplicateWordFormSense=${v.duplicateWordFormSense.length}, MissingPartitives=${v.missingPartitives.length}, MissingContractions=${v.missingContractions.length}`);
    console.log(`  Missing Essentials: ${missingEssentials[lang].length}`);

    if (targetData && targetData.themes) {
      const devWarnings = [];
      Object.keys(targetData.themes).forEach((th) => {
        const targetCnt = targetData.themes[th];
        const langCnt = data.themeCounts[th] || 0;
        if (targetCnt > 0) {
          const dev = Math.abs(langCnt - targetCnt) / targetCnt;
          if (dev > 0.3) {
            devWarnings.push(`Theme '${th}': ${langCnt} vs target ${targetCnt} (${Math.round(dev * 100)}% dev)`);
          }
        }
      });
      if (devWarnings.length > 0) {
        console.log(`  Per-Theme Deviation Warnings (>30%): ${devWarnings.length}`);
        devWarnings.forEach((w) => console.log(`    - ${w}`));
      }
    }
    console.log('');
  });

  // Write reports/a0_a1_parity.md
  const reportsDir = path.join(rootDir, 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  let md = '# A0–A1 Parity Report\n\n';
  md += `*Generated automatically on ${new Date().toISOString().split('T')[0]}*\n\n`;

  if (targetData && targetData.target) {
    md += `## Target Metrics\n\n`;
    md += `- **Target Total**: ${targetData.target.total}\n`;
    md += `- **Target A0**: ${targetData.target.A0}\n`;
    md += `- **Target A1**: ${targetData.target.A1}\n\n`;
  } else {
    md += `## Target Metrics\n\n*No target file present (\`reports/a0_a1_target.json\` is missing). Current counts reported below.*\n\n`;
  }

  md += `## Summary Table\n\n`;
  md += `| Language | Total | A0 | A1 | Deficit/Surplus (Total) | Deficit (A0) | Deficit (A1) | Violations | Missing Essentials |\n`;
  md += `| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n`;

  TARGET_LANGS.forEach((lang) => {
    const data = langData[lang];
    let defTotalStr = 'N/A';
    let defA0Str = 'N/A';
    let defA1Str = 'N/A';

    if (targetData && targetData.target) {
      const defTotal = targetData.target.total - data.total;
      const defA0 = targetData.target.A0 - data.a0Count;
      const defA1 = targetData.target.A1 - data.a1Count;
      defTotalStr = defTotal <= 0 ? `+${Math.abs(defTotal)}` : `-${defTotal}`;
      defA0Str = defA0 <= 0 ? `+${Math.abs(defA0)}` : `-${defA0}`;
      defA1Str = defA1 <= 0 ? `+${Math.abs(defA1)}` : `-${defA1}`;
    }

    const vCount =
      violations[lang].domainViolations.length +
      violations[lang].formViolations.length +
      violations[lang].levelViolations.length +
      violations[lang].duplicateIds.length +
      violations[lang].duplicateWordFormSense.length +
      violations[lang].missingPartitives.length +
      violations[lang].missingContractions.length;

    md += `| ${lang.toUpperCase()} | ${data.total} | ${data.a0Count} | ${data.a1Count} | ${defTotalStr} | ${defA0Str} | ${defA1Str} | ${vCount} | ${missingEssentials[lang].length} |\n`;
  });
  md += `\n`;

  // Details per language
  TARGET_LANGS.forEach((lang) => {
    const v = violations[lang];
    const totalV =
      v.domainViolations.length +
      v.formViolations.length +
      v.levelViolations.length +
      v.duplicateIds.length +
      v.duplicateWordFormSense.length;

    md += `### Details: ${lang.toUpperCase()}\n\n`;

    if (totalV > 0) {
      md += `#### Structural & Policy Violations (${totalV})\n\n`;
      if (v.domainViolations.length > 0) {
        md += `##### Domain Violations (${v.domainViolations.length})\n`;
        v.domainViolations.slice(0, 15).forEach((item) => (md += `- ${item}\n`));
        if (v.domainViolations.length > 15) md += `- *...and ${v.domainViolations.length - 15} more*\n`;
        md += `\n`;
      }
      if (v.formViolations.length > 0) {
        md += `##### Form Violations (${v.formViolations.length})\n`;
        v.formViolations.slice(0, 15).forEach((item) => (md += `- ${item}\n`));
        if (v.formViolations.length > 15) md += `- *...and ${v.formViolations.length - 15} more*\n`;
        md += `\n`;
      }
      if (v.levelViolations.length > 0) {
        md += `##### Level Violations (${v.levelViolations.length})\n`;
        v.levelViolations.slice(0, 15).forEach((item) => (md += `- ${item}\n`));
        if (v.levelViolations.length > 15) md += `- *...and ${v.levelViolations.length - 15} more*\n`;
        md += `\n`;
      }
      if (v.duplicateIds.length > 0) {
        md += `##### Duplicate IDs (${v.duplicateIds.length})\n`;
        v.duplicateIds.forEach((item) => (md += `- ${item}\n`));
        md += `\n`;
      }
      if (v.duplicateWordFormSense.length > 0) {
        md += `##### Duplicate Word+Form+Sense (${v.duplicateWordFormSense.length})\n`;
        v.duplicateWordFormSense.slice(0, 15).forEach((item) => (md += `- ${item}\n`));
        if (v.duplicateWordFormSense.length > 15) md += `- *...and ${v.duplicateWordFormSense.length - 15} more*\n`;
        md += `\n`;
      }
      if (v.missingPartitives.length > 0) {
        md += `##### Missing Partitives (${v.missingPartitives.length})\n`;
        v.missingPartitives.slice(0, 15).forEach((item) => (md += `- ${item}\n`));
        if (v.missingPartitives.length > 15) md += `- *...and ${v.missingPartitives.length - 15} more*\n`;
        md += `\n`;
      }
      if (v.missingContractions.length > 0) {
        md += `##### Missing Contractions (${v.missingContractions.length})\n`;
        v.missingContractions.slice(0, 15).forEach((item) => (md += `- ${item}\n`));
        if (v.missingContractions.length > 15) md += `- *...and ${v.missingContractions.length - 15} more*\n`;
        md += `\n`;
      }
    } else {
      md += `*No structural or policy violations found.*\n\n`;
    }

    if (missingEssentials[lang].length > 0) {
      md += `#### Missing Essentials (${missingEssentials[lang].length})\n\n`;
      missingEssentials[lang].slice(0, 25).forEach(({ key, cell }) => {
        md += `- **${key}** (expected: \`${cell}\`)\n`;
      });
      if (missingEssentials[lang].length > 25) {
        md += `- *...and ${missingEssentials[lang].length - 25} more*\n`;
      }
      md += `\n`;
    } else {
      md += `*All non-exempt essentials covered.*\n\n`;
    }
  });

  if (exemptKeys.size > 0) {
    md += `## Exempt Essentials Keys (${exemptKeys.size})\n\n`;
    Array.from(exemptKeys).forEach((k) => (md += `- \`${k}\`\n`));
    md += `\n`;
  }

  const reportPath = path.join(reportsDir, 'a0_a1_parity.md');
  fs.writeFileSync(reportPath, md, 'utf8');
  console.log(`Written report to ${path.relative(rootDir, reportPath)}`);

  // Exit logic
  if (strict) {
    let failed = false;
    if (totalViolations > 0) {
      console.error(`[STRICT FAIL] ${totalViolations} structural/policy violations found.`);
      failed = true;
    }
    if (totalMissingEssentials > 0) {
      console.error(`[STRICT FAIL] ${totalMissingEssentials} missing essentials found.`);
      failed = true;
    }
    if (targetTotalDeficit > 0) {
      console.error(`[STRICT FAIL] Non-zero target deficit of ${targetTotalDeficit} entries found.`);
      failed = true;
    }
    if (failed) {
      process.exit(1);
    }
  }
}

main();
