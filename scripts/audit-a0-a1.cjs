const fs = require('fs');
const path = require('path');

const ALL_LANGS = [
  'ba', 'br', 'cv', 'de', 'el', 'en', 'es', 'fr', 'hy', 'it', 'ka', 'pt', 'ru', 'tt'
];

const CHECK_KEYS = [
  '1_duplicate_ids',
  '2_same_word_form_without_diff_sense',
  '3_id_segment_mismatch',
  '4_single_word_phrase_shadow',
  '5_identical_first_definition',
  '6_identical_example_sentence',
  '7_singular_plural_separate_entries',
  '8_cross_level_overlap',
  '9_transcription_empty_or_spelling',
  '10_noun_missing_countability_or_plural',
  '11_invalid_theme_or_subtheme',
  '12_concept_missing_or_unresolved',
  '13_regional_equivalents_dangling_or_non_reciprocal'
];

const STRICT_CHECK_KEYS = [
  '1_duplicate_ids',
  '2_same_word_form_without_diff_sense',
  '3_id_segment_mismatch',
  '4_single_word_phrase_shadow',
  '5_identical_first_definition',
  '6_identical_example_sentence',
  '7_singular_plural_separate_entries',
  '8_cross_level_overlap',
  '13_regional_equivalents_dangling_or_non_reciprocal'
];

const COVERAGE_FIELDS = [
  'article',
  'gender',
  'plural_form',
  'past_participle',
  'prepositions',
  'comparative',
  'sub_theme',
  'secondary_themes',
  'concept',
  'present_forms'
];

function norm(s) {
  return (s || '').normalize('NFKC').toLowerCase().trim().replace(/\s+/g, ' ');
}

function cleanTranscription(t) {
  if (typeof t === 'string') return t.replace(/[\/\[\]\s]/g, '').toLowerCase();
  if (t && typeof t === 'object') {
    const val = t.uk || t.us || '';
    return val.replace(/[\/\[\]\s]/g, '').toLowerCase();
  }
  return '';
}

function parseArgs() {
  const args = process.argv.slice(2);
  let strict = false;
  let baseline = false;
  let targetLang = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--strict') {
      strict = true;
    } else if (args[i] === '--baseline') {
      baseline = true;
    } else if (args[i] === '--lang' && i + 1 < args.length) {
      targetLang = args[i + 1];
      i++;
    }
  }

  return { strict, baseline, targetLang };
}

function loadThemes(rootDir) {
  const themesPath = path.join(rootDir, 'shared', 'themes.json');
  if (fs.existsSync(themesPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(themesPath, 'utf8'));
      return data.themes || {};
    } catch (e) {
      console.warn('Warning: Could not parse shared/themes.json');
    }
  }
  return {};
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
        entries.push(...content);
      }
    } catch (e) {
      console.error(`Error reading ${path.join(dir, f)}: ${e.message}`);
    }
  });
  return entries;
}

function loadHigherLevelEntries(rootDir, lang) {
  const langDir = path.join(rootDir, 'vocabulary', lang);
  if (!fs.existsSync(langDir)) return [];
  const levels = fs
    .readdirSync(langDir)
    .filter((d) => fs.statSync(path.join(langDir, d)).isDirectory() && d !== 'a0_a1');
  const entries = [];
  levels.forEach((lvl) => {
    entries.push(...loadLevelEntries(rootDir, lang, lvl));
  });
  return entries;
}

function getPluralCandidates(word, lang) {
  const w = norm(word);
  const candidates = [];
  if (lang === 'en' || lang === 'es' || lang === 'pt') {
    if (w.endsWith('s')) candidates.push(w.slice(0, -1));
    if (w.endsWith('es')) candidates.push(w.slice(0, -2));
  } else if (lang === 'fr') {
    if (w.endsWith('s') || w.endsWith('x')) candidates.push(w.slice(0, -1));
  } else if (lang === 'it') {
    if (w.endsWith('i')) {
      candidates.push(w.slice(0, -1) + 'o');
      candidates.push(w.slice(0, -1) + 'e');
    }
    if (w.endsWith('e')) {
      candidates.push(w.slice(0, -1) + 'a');
    }
  } else if (lang === 'de') {
    if (w.endsWith('en')) candidates.push(w.slice(0, -2));
    if (w.endsWith('n')) candidates.push(w.slice(0, -1));
    if (w.endsWith('e')) candidates.push(w.slice(0, -1));
    if (w.endsWith('er')) candidates.push(w.slice(0, -2));
    if (w.endsWith('s')) candidates.push(w.slice(0, -1));
  }
  return candidates;
}

function auditLanguage(rootDir, lang, knownThemes, englishIds) {
  const entries = loadLevelEntries(rootDir, lang, 'a0_a1');
  const higherEntries = loadHigherLevelEntries(rootDir, lang);

  const allLangEntriesMap = new Map();
  entries.forEach((e) => {
    if (e.id) allLangEntriesMap.set(e.id, e);
  });
  higherEntries.forEach((e) => {
    if (e.id) allLangEntriesMap.set(e.id, e);
  });

  const results = {
    counts: {},
    examples: {},
    conceptCoverage: { total: entries.length, withConcept: 0, percentage: 0 },
    fieldCoverage: {}
  };

  CHECK_KEYS.forEach((k) => {
    results.counts[k] = 0;
    results.examples[k] = [];
  });

  // Check 1: Duplicate IDs
  const idCountMap = new Map();
  entries.forEach((e) => {
    if (!e.id) return;
    idCountMap.set(e.id, (idCountMap.get(e.id) || 0) + 1);
  });
  idCountMap.forEach((cnt, id) => {
    if (cnt > 1) {
      results.counts['1_duplicate_ids'] += cnt - 1;
      results.examples['1_duplicate_ids'].push(`Duplicate ID '${id}' found ${cnt} times`);
    }
  });

  // Check 2: Same norm word + same form appearing more than once without different `sense` values
  const wordFormMap = new Map();
  entries.forEach((e) => {
    const key = `${norm(e.word)}::${e.form}`;
    if (!wordFormMap.has(key)) wordFormMap.set(key, []);
    wordFormMap.get(key).push(e);
  });
  wordFormMap.forEach((list, key) => {
    if (list.length > 1) {
      const senses = list.map((e) => e.sense || null);
      const uniqueSenses = new Set(senses);
      if (uniqueSenses.size < list.length || senses.some((s) => s === null)) {
        results.counts['2_same_word_form_without_diff_sense'] += list.length - 1;
        results.examples['2_same_word_form_without_diff_sense'].push(
          `Word+form '${key}' appears ${list.length} times without distinct sense values (IDs: ${list.map((e) => e.id).join(', ')})`
        );
      }
    }
  });

  // Check 3: Id whose 1st segment is not language or 3rd segment differs from form
  entries.forEach((e) => {
    if (!e.id) return;
    const parts = e.id.split(':');
    const seg1Mismatch = parts[0] !== e.language;
    const seg3Mismatch = parts.length >= 3 && parts[2] !== e.form;
    if (seg1Mismatch || seg3Mismatch) {
      results.counts['3_id_segment_mismatch']++;
      let reason = [];
      if (seg1Mismatch) reason.push(`segment 1 '${parts[0]}' !== lang '${e.language}'`);
      if (seg3Mismatch) reason.push(`segment 3 '${parts[2]}' !== form '${e.form}'`);
      results.examples['3_id_segment_mismatch'].push(`Entry '${e.id}' mismatch: ${reason.join(', ')}`);
    }
  });

  // Check 4: Entry with form "phrase" whose `word` is a single word and the same word exists with another form
  const phrases = entries.filter((e) => e.form === 'phrase');
  phrases.forEach((p) => {
    const nw = norm(p.word);
    if (!nw.includes(' ')) {
      const shadow = entries.find((e) => e.form !== 'phrase' && norm(e.word) === nw);
      if (shadow) {
        results.counts['4_single_word_phrase_shadow']++;
        results.examples['4_single_word_phrase_shadow'].push(
          `Phrase entry '${p.id}' ('${p.word}') shadowed by '${shadow.id}' (form: ${shadow.form})`
        );
      }
    }
  });

  // Check 5: Identical first definition on two different entries
  const defMap = new Map();
  entries.forEach((e) => {
    const def = e.definitions && e.definitions[0] ? e.definitions[0].trim() : '';
    if (def) {
      if (!defMap.has(def)) defMap.set(def, []);
      defMap.get(def).push(e);
    }
  });
  defMap.forEach((list, def) => {
    if (list.length > 1) {
      results.counts['5_identical_first_definition'] += list.length - 1;
      results.examples['5_identical_first_definition'].push(
        `Identical definition '${def.slice(0, 40)}...' on ${list.length} entries (${list.map((e) => e.id).join(', ')})`
      );
    }
  });

  // Check 6: Identical example sentence on two different entries
  const exMap = new Map();
  entries.forEach((e) => {
    const ex = e.examples && e.examples[0] ? e.examples[0].trim() : '';
    if (ex) {
      if (!exMap.has(ex)) exMap.set(ex, []);
      exMap.get(ex).push(e);
    }
  });
  exMap.forEach((list, ex) => {
    if (list.length > 1) {
      results.counts['6_identical_example_sentence'] += list.length - 1;
      results.examples['6_identical_example_sentence'].push(
        `Identical example '${ex.slice(0, 40)}...' on ${list.length} entries (${list.map((e) => e.id).join(', ')})`
      );
    }
  });

  // Check 7: Singular and plural of the same noun both present as separate entries (en/fr/it/es/pt/de)
  const nouns = entries.filter((e) => e.form === 'noun');
  const nounWordMap = new Map();
  nouns.forEach((n) => {
    const nw = norm(n.word);
    if (!nounWordMap.has(nw)) nounWordMap.set(nw, []);
    nounWordMap.get(nw).push(n);
  });

  const reportedPairs = new Set();
  nouns.forEach((n) => {
    const nw = norm(n.word);
    // explicit plural_form match
    if (n.plural_form) {
      const np = norm(n.plural_form);
      if (nounWordMap.has(np)) {
        const matches = nounWordMap.get(np);
        matches.forEach((m) => {
          if (m.id !== n.id) {
            const pairKey = [n.id, m.id].sort().join('::');
            if (!reportedPairs.has(pairKey)) {
              reportedPairs.add(pairKey);
              results.counts['7_singular_plural_separate_entries']++;
              results.examples['7_singular_plural_separate_entries'].push(
                `Singular/plural pair: '${n.id}' ('${n.word}') and '${m.id}' ('${m.word}')`
              );
            }
          }
        });
      }
    }

    // language-specific stem rules
    const candidates = getPluralCandidates(nw, lang);
    candidates.forEach((cand) => {
      if (nounWordMap.has(cand)) {
        const matches = nounWordMap.get(cand);
        matches.forEach((m) => {
          if (m.id !== n.id) {
            const pairKey = [n.id, m.id].sort().join('::');
            if (!reportedPairs.has(pairKey)) {
              reportedPairs.add(pairKey);
              results.counts['7_singular_plural_separate_entries']++;
              results.examples['7_singular_plural_separate_entries'].push(
                `Singular/plural pair (rule): '${m.id}' ('${m.word}') and '${n.id}' ('${n.word}')`
              );
            }
          }
        });
      }
    });
  });

  // Check 8: Word + form present in both a0_a1 and a2 (or higher) of the same language
  const higherKeysMap = new Map();
  higherEntries.forEach((e) => {
    const k = `${norm(e.word)}::${e.form}`;
    if (!higherKeysMap.has(k)) higherKeysMap.set(k, []);
    higherKeysMap.get(k).push(e.id);
  });
  entries.forEach((e) => {
    const k = `${norm(e.word)}::${e.form}`;
    if (higherKeysMap.has(k)) {
      results.counts['8_cross_level_overlap']++;
      results.examples['8_cross_level_overlap'].push(
        `Entry '${e.id}' ('${e.word}', ${e.form}) in a0_a1 also exists in higher levels (${higherKeysMap.get(k).join(', ')})`
      );
    }
  });

  // Check 9: Transcription empty or equal to the spelling (after removing / [ ] and spaces)
  entries.forEach((e) => {
    const cleanT = cleanTranscription(e.transcription);
    const cleanW = (e.word || '').replace(/\s/g, '').toLowerCase();
    if (!cleanT || cleanT === cleanW) {
      results.counts['9_transcription_empty_or_spelling']++;
      const detail = !cleanT ? 'empty' : `equal to spelling '${cleanW}'`;
      results.examples['9_transcription_empty_or_spelling'].push(
        `Entry '${e.id}' transcription is ${detail}`
      );
    }
  });

  // Check 10: Nouns missing countability; countable nouns missing plural_form
  nouns.forEach((e) => {
    if (!e.countability) {
      results.counts['10_noun_missing_countability_or_plural']++;
      results.examples['10_noun_missing_countability_or_plural'].push(
        `Noun '${e.id}' missing countability`
      );
    } else if (e.countability === 'countable' && !e.plural_form) {
      results.counts['10_noun_missing_countability_or_plural']++;
      results.examples['10_noun_missing_countability_or_plural'].push(
        `Countable noun '${e.id}' missing plural_form`
      );
    }
  });

  // Check 11: theme / sub_theme / secondary_themes not in shared/themes.json
  entries.forEach((e) => {
    if (Object.keys(knownThemes).length > 0) {
      if (e.theme && !knownThemes[e.theme]) {
        results.counts['11_invalid_theme_or_subtheme']++;
        results.examples['11_invalid_theme_or_subtheme'].push(
          `Entry '${e.id}' theme '${e.theme}' not in shared/themes.json`
        );
      } else if (e.theme && e.sub_theme) {
        const allowedSubs = knownThemes[e.theme] || [];
        if (!allowedSubs.includes(e.sub_theme)) {
          results.counts['11_invalid_theme_or_subtheme']++;
          results.examples['11_invalid_theme_or_subtheme'].push(
            `Entry '${e.id}' sub_theme '${e.sub_theme}' not valid for theme '${e.theme}' in shared/themes.json`
          );
        }
      }

      if (e.secondary_themes && Array.isArray(e.secondary_themes)) {
        e.secondary_themes.forEach((st) => {
          if (!knownThemes[st]) {
            results.counts['11_invalid_theme_or_subtheme']++;
            results.examples['11_invalid_theme_or_subtheme'].push(
              `Entry '${e.id}' secondary_theme '${st}' not in shared/themes.json`
            );
          }
        });
      }
    }
  });

  // Check 12: concept missing, or not resolving to an existing English entry (report % coverage per language)
  let withConcept = 0;
  entries.forEach((e) => {
    if (!e.concept) {
      results.counts['12_concept_missing_or_unresolved']++;
      results.examples['12_concept_missing_or_unresolved'].push(
        `Entry '${e.id}' missing concept`
      );
    } else {
      if (englishIds.has(e.concept)) {
        withConcept++;
      } else {
        results.counts['12_concept_missing_or_unresolved']++;
        results.examples['12_concept_missing_or_unresolved'].push(
          `Entry '${e.id}' concept '${e.concept}' does not resolve to an English entry`
        );
      }
    }
  });
  results.conceptCoverage.withConcept = withConcept;
  results.conceptCoverage.percentage =
    entries.length > 0 ? Math.round((withConcept / entries.length) * 1000) / 10 : 0;

  // Check 13: regional_equivalents links that are dangling or not reciprocal
  entries.forEach((e) => {
    if (e.regional_equivalents && Array.isArray(e.regional_equivalents)) {
      e.regional_equivalents.forEach((targetId) => {
        const targetEntry = allLangEntriesMap.get(targetId);
        if (!targetEntry) {
          results.counts['13_regional_equivalents_dangling_or_non_reciprocal']++;
          results.examples['13_regional_equivalents_dangling_or_non_reciprocal'].push(
            `Entry '${e.id}' has dangling regional_equivalent '${targetId}'`
          );
        } else {
          const targetReqs = targetEntry.regional_equivalents || [];
          if (!targetReqs.includes(e.id)) {
            results.counts['13_regional_equivalents_dangling_or_non_reciprocal']++;
            results.examples['13_regional_equivalents_dangling_or_non_reciprocal'].push(
              `Regional equivalent from '${e.id}' to '${targetId}' is non-reciprocal`
            );
          }
        }
      });
    }
  });

  // Check 14: Field coverage table per word class
  const formGroups = new Map();
  entries.forEach((e) => {
    const f = e.form || 'unknown';
    if (!formGroups.has(f)) formGroups.set(f, []);
    formGroups.get(f).push(e);
  });

  const sortedForms = Array.from(formGroups.keys()).sort();
  sortedForms.forEach((formName) => {
    const list = formGroups.get(formName);
    const total = list.length;
    const row = { total };

    COVERAGE_FIELDS.forEach((field) => {
      let count = 0;
      list.forEach((e) => {
        if (e[field] !== undefined && e[field] !== null && e[field] !== '') {
          if (Array.isArray(e[field]) && e[field].length === 0) return;
          count++;
        }
      });
      row[field] = {
        count,
        pct: total > 0 ? Math.round((count / total) * 100) : 0
      };
    });

    results.fieldCoverage[formName] = row;
  });

  return results;
}

function main() {
  const { strict, baseline, targetLang } = parseArgs();
  const rootDir = path.join(__dirname, '..');
  const knownThemes = loadThemes(rootDir);

  // Load English A0/A1 IDs for concept resolution
  const englishEntries = loadLevelEntries(rootDir, 'en', 'a0_a1');
  const englishIds = new Set(englishEntries.map((e) => e.id).filter(Boolean));

  const langsToProcess = targetLang ? [targetLang] : ALL_LANGS;
  const auditReport = {};

  langsToProcess.forEach((lang) => {
    auditReport[lang] = auditLanguage(rootDir, lang, knownThemes, englishIds);
  });

  // Build stdout human-readable report
  console.log('====================================================');
  console.log('         COSYdata A0/A1 DATA AUDIT REPORT           ');
  console.log('====================================================\n');

  langsToProcess.forEach((lang) => {
    const rep = auditReport[lang];
    console.log(`=== Language: ${lang.toUpperCase()} ===`);
    console.log(`Concept Resolution Coverage: ${rep.conceptCoverage.withConcept}/${rep.conceptCoverage.total} (${rep.conceptCoverage.percentage}%)\n`);

    console.log('Check Summary:');
    CHECK_KEYS.forEach((key) => {
      const count = rep.counts[key];
      console.log(`  ${key}: ${count}`);
      const examples = rep.examples[key];
      if (examples && examples.length > 0) {
        examples.slice(0, 25).forEach((ex) => {
          console.log(`    - ${ex}`);
        });
        if (examples.length > 25) {
          console.log(`    ... and ${examples.length - 25} more`);
        }
      }
    });

    console.log('\nField Coverage Table by Word Class:');
    const forms = Object.keys(rep.fieldCoverage).sort();
    forms.forEach((formName) => {
      const data = rep.fieldCoverage[formName];
      console.log(`  Form: ${formName} (total: ${data.total})`);
      COVERAGE_FIELDS.forEach((f) => {
        const cov = data[f];
        console.log(`    ${f}: ${cov.count}/${data.total} (${cov.pct}%)`);
      });
    });
    console.log('\n----------------------------------------------------\n');
  });

  // Write deterministic Markdown file reports/audit-a0-a1.md
  const reportsDir = path.join(rootDir, 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  let md = '# A0/A1 Data Audit Report\n\n';
  md += 'This is an automated report generated by `scripts/audit-a0-a1.cjs`.\n\n';

  langsToProcess.forEach((lang) => {
    const rep = auditReport[lang];
    md += `## Language: ${lang.toUpperCase()}\n\n`;
    md += `**Concept Resolution Coverage**: ${rep.conceptCoverage.withConcept} / ${rep.conceptCoverage.total} (${rep.conceptCoverage.percentage}%)\n\n`;

    md += '### Check Results\n\n';
    md += '| Check ID | Check Name | Count |\n';
    md += '| --- | --- | --- |\n';
    CHECK_KEYS.forEach((key) => {
      const name = key.replace(/^\d+_/, '').replace(/_/g, ' ');
      md += `| ${key} | ${name} | ${rep.counts[key]} |\n`;
    });
    md += '\n';

    let hasExamples = false;
    CHECK_KEYS.forEach((key) => {
      const examples = rep.examples[key];
      if (examples && examples.length > 0) {
        if (!hasExamples) {
          md += '### Findings & Examples (First 25 per check)\n\n';
          hasExamples = true;
        }
        md += `#### ${key}\n\n`;
        examples.slice(0, 25).forEach((ex) => {
          md += `- ${ex}\n`;
        });
        if (examples.length > 25) {
          md += `- *...and ${examples.length - 25} more*\n`;
        }
        md += '\n';
      }
    });

    md += '### Field Coverage Table by Word Class\n\n';
    md += `| Word Class | Total | ${COVERAGE_FIELDS.join(' | ')} |\n`;
    md += `| --- | --- | ${COVERAGE_FIELDS.map(() => '---').join(' | ')} |\n`;
    const forms = Object.keys(rep.fieldCoverage).sort();
    forms.forEach((formName) => {
      const data = rep.fieldCoverage[formName];
      const covCells = COVERAGE_FIELDS.map((f) => `${data[f].count} (${data[f].pct}%)`).join(' | ');
      md += `| ${formName} | ${data.total} | ${covCells} |\n`;
    });
    md += '\n---\n\n';
  });

  fs.writeFileSync(path.join(reportsDir, 'audit-a0-a1.md'), md, 'utf8');
  console.log(`Written report to ${path.relative(rootDir, path.join(reportsDir, 'audit-a0-a1.md'))}`);

  // Write baseline JSON if --baseline flag is provided
  if (baseline) {
    const baselineData = {};
    ALL_LANGS.forEach((lang) => {
      const rep = auditReport[lang] || auditLanguage(rootDir, lang, knownThemes, englishIds);
      baselineData[lang] = {
        total_a0_a1_entries: rep.conceptCoverage.total,
        concept_coverage_pct: rep.conceptCoverage.percentage,
        counts: rep.counts
      };
    });
    fs.writeFileSync(
      path.join(reportsDir, 'audit-baseline.json'),
      JSON.stringify(baselineData, null, 2) + '\n',
      'utf8'
    );
    console.log(`Written baseline to ${path.relative(rootDir, path.join(reportsDir, 'audit-baseline.json'))}`);
  }

  // Strict check evaluation
  if (strict) {
    let strictFailures = 0;
    langsToProcess.forEach((lang) => {
      const rep = auditReport[lang];
      STRICT_CHECK_KEYS.forEach((key) => {
        if (rep.counts[key] > 0) {
          strictFailures += rep.counts[key];
        }
      });
    });

    if (strictFailures > 0) {
      console.error(`\n[STRICT MODE FAIL] Found ${strictFailures} findings in strict checks (1-8, 13). Exiting with code 1.`);
      process.exit(1);
    }
  }
}

main();
