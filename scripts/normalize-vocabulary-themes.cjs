#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TODAY = new Date().toISOString().slice(0, 10);
const DRY_RUN = process.argv.includes('--dry-run');
const INCLUDE_STAGING = process.argv.includes('--include-staging');
const REPORT_DIR = path.join(ROOT, 'reports');
const REVIEW_DIR = path.join(REPORT_DIR, 'needs-review');

const schema = JSON.parse(fs.readFileSync(path.join(ROOT, 'schemas/themes.json'), 'utf8'));
const THEMES = schema.themes;
const THEME_KEYS = new Set(Object.keys(THEMES));

const THEME_ALIASES = {
  daily_verbs: 'actions',
  verbs: 'actions',
  general_adjectives: 'descriptors',
  adjectives: 'descriptors',
  descriptions: 'descriptors',
  common_nouns: 'general',
  abstract_nouns: 'general',
  expressions: 'communication',
  social_expressions: 'communication',
  opinions: 'communication',
  greetings: 'communication',
  places_transport: 'travel',
  nationalities: 'geography',
  positive_feelings: 'emotions',
  feelings: 'emotions',
  clothes: 'clothing',
  school: 'education',
  body_health: 'health',
  health_medicine: 'health',
  food_drink: 'food',
  house_furniture: 'housing',
  home: 'housing',
  sports_hobbies: 'leisure',
  recreation: 'leisure',
  money_shopping: 'shopping',
  economy: 'business',
  culture: 'society',
  relationships: 'family',
  properties: 'shapes',
  quantity: 'measurement',
  art_culture: 'arts',
  idioms: 'general',
  cause_effect: 'general',
  prepositions: 'grammar',
  pronouns: 'grammar',
  adverbs_connectors: 'grammar',
  auxiliary_verbs: 'grammar',
};

const PAIR_ALIASES = {
  'general/general': 'general/miscellaneous',
  'general/professions_jobs': 'work/professions_jobs',
  'general/office_business': 'work/office_business',
  'objects/containers': 'objects/general',
  'objects/everyday_tools': 'objects/general',
  'objects/household_objects': 'objects/general',
  'technology/digital_devices': 'technology/devices_hardware',
  'technology/digital_media_internet': 'technology/communication_tech',
  'technology/internet': 'internet/general',
  'technology/communication': 'technology/communication_tech',
  'shopping/retail': 'shopping/stores_shops',
  'shopping/prices': 'shopping/transactions_pricing',
  'shopping/transactions': 'shopping/transactions_pricing',
  'shapes/materials_textures': 'shapes/general',
  'nature/environment': 'environment/general',
  'leisure/relaxation': 'leisure/general',
  'actions/movement': 'actions/physical_movement',
  'actions/learning': 'education/learning_activities',
  'actions/work_actions': 'work/general',
  'actions/money': 'money/payments',
  'emotions/positive_emotions': 'emotions/positive_feelings',
  'positive_feelings/positive_emotions': 'emotions/positive_feelings',
  'positive_feelings/positive_feelings': 'emotions/positive_feelings',
  'positive_feelings/negative_feelings': 'emotions/negative_feelings',
  'social_expressions/social_expressions': 'communication/social_expressions',
  'social_expressions/socializing': 'communication/social_expressions',
  'social_expressions/greetings': 'communication/greetings',
  'social_expressions/classroom_language': 'education/classroom_language',
  'social_expressions/reading': 'communication/general',
  'sports/sports': 'sports/general',
  'measurement/units': 'measurement/units_scales',
  'shapes/shapes': 'shapes/geometric_shapes',
  'colors/colors': 'colors/general',
  'housing/general': 'housing/daily_life',
  'money/general': 'money/payments',
  'personality/general': 'personality/personality_traits',
  'body/general': 'body/body_parts',
  'recreation/entertainment': 'leisure/entertainment_arts',
  'recreation/hobbies': 'leisure/games_hobbies',
  'recreation/sports': 'leisure/sports',
  'recreation/general': 'leisure/general',
  'quantity/dimensions': 'measurement/dimensions_weight',
  'quantity/quantity_words': 'measurement/general',
  'places_transport/navigation': 'navigation/asking_giving_directions',
  'properties/materials': 'shapes/general',
  'properties/shapes': 'shapes/geometric_shapes',
  'properties/general': 'shapes/general',
};

const FILE_DEFAULTS = {
  daily_verbs: ['actions', 'daily_routines'],
  verbs: ['actions', 'general'],
  general_adjectives: ['descriptors', 'general'],
  adjectives: ['descriptors', 'general'],
  common_nouns: ['general', 'common_things'],
  abstract_nouns: ['general', 'abstract_concepts'],
  expressions: ['communication', 'general'],
  social_expressions: ['communication', 'social_expressions'],
  opinions: ['communication', 'general'],
  greetings: ['communication', 'greetings'],
  places_transport: ['travel', 'general'],
  nationalities: ['geography', 'nationalities_languages'],
  positive_feelings: ['emotions', 'positive_feelings'],
  feelings: ['emotions', 'general'],
  clothes: ['clothing', 'general'],
  school: ['education', 'general'],
  body_health: ['health', 'general'],
  food_drink: ['food', 'general'],
  house_furniture: ['housing', 'furniture'],
  home: ['housing', 'daily_life'],
  sports_hobbies: ['leisure', 'sports'],
  recreation: ['leisure', 'general'],
  money_shopping: ['shopping', 'general'],
  economy: ['business', 'general'],
  culture: ['society', 'culture'],
  relationships: ['family', 'relationships'],
  properties: ['shapes', 'general'],
  quantity: ['measurement', 'general'],
  art_culture: ['arts', 'general'],
  idioms: ['general', 'miscellaneous'],
  cause_effect: ['general', 'miscellaneous'],
  prepositions: ['grammar', 'prepositions_spatial'],
  pronouns: ['grammar', 'pronouns'],
  adverbs_connectors: ['grammar', 'conjunctions_connectors'],
  auxiliary_verbs: ['grammar', 'auxiliaries_modals'],
  weather: ['weather', 'general'],
  technology: ['technology', 'general'],
  objects: ['objects', 'general'],
  personality: ['personality', 'personality_traits'],
  directions: ['navigation', 'asking_giving_directions'],
  measurement: ['measurement', 'general'],
  media: ['media', 'general'],
  education: ['education', 'general'],
  shapes_materials: ['shapes', 'general'],
  health: ['health', 'general'],
  environment: ['environment', 'general'],
  politics: ['politics', 'general'],
  science: ['science', 'general'],
  actions: ['actions', 'general'],
  shopping: ['shopping', 'general'],
  tourism: ['travel', 'general'],
  descriptions: ['descriptors', 'general'],
  leisure: ['leisure', 'general'],
  consumer_items: ['objects', 'general'],
  food: ['food', 'general'],
  nature: ['nature', 'general'],
  travel: ['travel', 'general'],
  adverb: ['grammar', 'adverbs'],
};

function validPair(theme, subTheme) {
  return Boolean(theme) && THEME_KEYS.has(theme) && Array.isArray(THEMES[theme]) && THEMES[theme].includes(subTheme);
}

function defaultSubTheme(theme) {
  if (!theme || !THEMES[theme]) return null;
  const subs = THEMES[theme];
  if (subs.includes('general')) return 'general';
  if (theme === 'general' && subs.includes('miscellaneous')) return 'miscellaneous';
  if (theme === 'housing' && subs.includes('daily_life')) return 'daily_life';
  if (theme === 'money' && subs.includes('payments')) return 'payments';
  if (theme === 'personality' && subs.includes('personality_traits')) return 'personality_traits';
  if (theme === 'body' && subs.includes('body_parts')) return 'body_parts';
  return subs[0] || null;
}

function normalizeTheme(theme) {
  if (!theme) return null;
  if (THEME_KEYS.has(theme)) return theme;
  return THEME_ALIASES[theme] || null;
}

function resolvePair(theme, subTheme, originalTheme) {
  if (!theme || !subTheme) return null;
  const candidates = [`${theme}/${subTheme}`];
  if (originalTheme && originalTheme !== theme) candidates.push(`${originalTheme}/${subTheme}`);
  for (const key of candidates) {
    const mapped = PAIR_ALIASES[key];
    if (!mapped) continue;
    const [mappedTheme, mappedSubTheme] = mapped.split('/', 2);
    if (validPair(mappedTheme, mappedSubTheme)) {
      return { theme: mappedTheme, subTheme: mappedSubTheme };
    }
  }
  return null;
}

function normalizeEntry(entry, fileStem) {
  const originalTheme = entry.theme;
  const originalSubTheme = entry.sub_theme;
  let theme = normalizeTheme(originalTheme);
  if (!theme) {
    return { changed: false, theme: originalTheme, subTheme: originalSubTheme, secondaryThemes: entry.secondary_themes, unknownTheme: originalTheme };
  }

  const pair = resolvePair(theme, originalSubTheme, originalTheme);
  let subTheme;
  if (pair) {
    theme = pair.theme;
    subTheme = pair.subTheme;
  } else if (validPair(theme, originalSubTheme)) {
    subTheme = originalSubTheme;
  }

  if (!subTheme) {
    const fileDefault = FILE_DEFAULTS[fileStem];
    if (fileDefault && fileDefault[0] === theme && validPair(fileDefault[0], fileDefault[1])) {
      subTheme = fileDefault[1];
    } else if (theme === 'body' && entry.form === 'verb' && validPair('body', 'fitness_hygiene')) {
      subTheme = 'fitness_hygiene';
    } else {
      subTheme = defaultSubTheme(theme);
    }
  }

  let secondaryThemes = entry.secondary_themes;
  if (Array.isArray(entry.secondary_themes)) {
    const normalized = [];
    for (const value of entry.secondary_themes) {
      if (typeof value !== 'string') continue;
      if (value.includes('/')) {
        const [secondaryTheme, secondarySubTheme] = value.split('/', 2);
        const mappedTheme = normalizeTheme(secondaryTheme);
        if (!mappedTheme) continue;
        const mappedPair = resolvePair(mappedTheme, secondarySubTheme, secondaryTheme);
        if (mappedPair) {
          normalized.push(`${mappedPair.theme}/${mappedPair.subTheme}`);
        } else if (validPair(mappedTheme, secondarySubTheme)) {
          normalized.push(`${mappedTheme}/${secondarySubTheme}`);
        }
      } else {
        const mappedTheme = normalizeTheme(value);
        if (mappedTheme) normalized.push(mappedTheme);
      }
    }
    secondaryThemes = normalized.length ? [...new Set(normalized)] : [];
  }

  const changed = theme !== originalTheme
    || subTheme !== originalSubTheme
    || JSON.stringify(secondaryThemes) !== JSON.stringify(entry.secondary_themes);

  return { changed, theme, subTheme, secondaryThemes, unknownTheme: null };
}

function walkJsonFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const item of fs.readdirSync(dir).sort()) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) results.push(...walkJsonFiles(fullPath));
    else if (item.endsWith('.json') && !['index.json', 'themes-index.json', 'flat-index.json', 'search-index.json'].includes(item)) {
      results.push(fullPath);
    }
  }
  return results;
}

function languageDirs() {
  const vocabularyDir = path.join(ROOT, 'vocabulary');
  return fs.readdirSync(vocabularyDir)
    .filter((name) => fs.statSync(path.join(vocabularyDir, name)).isDirectory())
    .filter((name) => INCLUDE_STAGING || !name.startsWith('_'))
    .sort();
}

function relativePath(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join('/');
}

function levelFor(relPath) {
  const parts = relPath.split('/');
  return parts.length > 2 ? parts[2] : '';
}

function effectiveFileTheme(relPath) {
  const parts = relPath.split('/');
  const stem = path.basename(relPath, '.json');
  let theme = null;
  let subTheme = null;
  const dirs = parts.slice(2, -1);
  for (let i = dirs.length - 1; i >= 0; i--) {
    const mapped = normalizeTheme(dirs[i]);
    if (!mapped) continue;
    theme = mapped;
    const child = dirs[i + 1];
    if (child) {
      if (validPair(theme, child)) {
        subTheme = child;
      } else {
        const pair = resolvePair(theme, child, dirs[i]);
        if (pair) {
          theme = pair.theme;
          subTheme = pair.subTheme;
        }
      }
    }
    break;
  }
  if (!theme && stem !== 'general') {
    theme = normalizeTheme(stem);
  }
  return { theme, subTheme };
}

function withNormalizedFields(entry, theme, subTheme, secondaryThemes) {
  const out = {};
  let subThemePlaced = false;
  for (const [key, value] of Object.entries(entry)) {
    if (key === 'theme') {
      out.theme = theme;
      if (subTheme != null) {
        out.sub_theme = subTheme;
        subThemePlaced = true;
      }
    } else if (key === 'sub_theme') {
      if (!subThemePlaced && subTheme != null) out.sub_theme = subTheme;
      subThemePlaced = true;
    } else if (key === 'secondary_themes') {
      out.secondary_themes = Array.isArray(secondaryThemes) ? secondaryThemes : value;
    } else if (key === 'updated') {
      out.updated = TODAY;
    } else {
      out[key] = value;
    }
  }
  if (!subThemePlaced && subTheme != null) out.sub_theme = subTheme;
  if (!('updated' in entry)) out.updated = TODAY;
  return out;
}

function csvCell(value) {
  const text = value == null ? '' : String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function main() {
  const counts = {
    files: 0,
    entries: 0,
    changedEntries: 0,
    changedFiles: 0,
    before: { invalidTheme: 0, invalidSubTheme: 0, missingSubTheme: 0, missingTheme: 0, invalidSecondary: 0 },
    after: { invalidTheme: 0, invalidSubTheme: 0, missingSubTheme: 0, missingTheme: 0, invalidSecondary: 0 },
    byLanguage: {},
    unknownThemes: new Map(),
  };
  const missingThemeGroups = new Map();
  const mismatchGroups = new Map();
  const reviewRows = [];

  for (const lang of languageDirs()) {
    counts.byLanguage[lang] = { changed: 0, entries: 0 };
    for (const filePath of walkJsonFiles(path.join(ROOT, 'vocabulary', lang))) {
      const relPath = relativePath(filePath);
      const fileStem = path.basename(filePath, '.json');
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (!Array.isArray(data)) continue;
      counts.files += 1;
      let fileChanged = 0;
      const fileTheme = effectiveFileTheme(relPath);

      for (let index = 0; index < data.length; index++) {
        const entry = data[index];
        if (!entry || typeof entry !== 'object') continue;
        counts.entries += 1;
        counts.byLanguage[lang].entries += 1;

        const originalTheme = entry.theme;
        const originalSubTheme = entry.sub_theme;
        const originalSecondary = entry.secondary_themes;
        const beforeThemeValid = originalTheme && THEME_KEYS.has(originalTheme);
        const beforeSubValid = beforeThemeValid && validPair(originalTheme, originalSubTheme);
        const beforeSecondaryValid = !Array.isArray(originalSecondary) || originalSecondary.every((value) => {
          if (typeof value !== 'string') return false;
          if (value.includes('/')) {
            const [theme, subTheme] = value.split('/', 2);
            return THEME_KEYS.has(theme) && validPair(theme, subTheme);
          }
          return THEME_KEYS.has(value);
        });

        if (!originalTheme) counts.before.missingTheme += 1;
        else if (!beforeThemeValid) counts.before.invalidTheme += 1;
        else if (!originalSubTheme) counts.before.missingSubTheme += 1;
        else if (!beforeSubValid) counts.before.invalidSubTheme += 1;
        if (!beforeSecondaryValid) counts.before.invalidSecondary += 1;

        if (!originalTheme) {
          counts.after.missingTheme += 1;
          const key = relPath;
          if (!missingThemeGroups.has(key)) {
            missingThemeGroups.set(key, { language: lang, level: levelFor(relPath), file: relPath, count: 0, forms: new Map(), samples: [] });
          }
          const group = missingThemeGroups.get(key);
          group.count += 1;
          group.forms.set(entry.form || '', (group.forms.get(entry.form || '') || 0) + 1);
          if (group.samples.length < 5) group.samples.push({ id: entry.id || '', word: entry.word || '', form: entry.form || '' });
          reviewRows.push({
            issue: 'missing_theme',
            language: lang,
            level: levelFor(relPath),
            file: relPath,
            id: entry.id || '',
            word: entry.word || '',
            form: entry.form || '',
            theme: '',
            sub_theme: originalSubTheme || '',
            suggested_theme: '',
            note: 'Form-based file; semantic theme needs review.',
          });
          continue;
        }

        const result = normalizeEntry(entry, fileStem);
        if (result.unknownTheme) {
          counts.unknownThemes.set(result.unknownTheme, (counts.unknownThemes.get(result.unknownTheme) || 0) + 1);
          counts.after.invalidTheme += 1;
        } else {
          const afterThemeValid = THEME_KEYS.has(result.theme);
          if (!afterThemeValid) counts.after.invalidTheme += 1;
          else if (!result.subTheme) counts.after.missingSubTheme += 1;
          else if (!validPair(result.theme, result.subTheme)) counts.after.invalidSubTheme += 1;
          const afterSecondaryValid = !Array.isArray(result.secondaryThemes) || result.secondaryThemes.every((value) => {
            if (typeof value !== 'string') return false;
            if (value.includes('/')) {
              const [theme, subTheme] = value.split('/', 2);
              return THEME_KEYS.has(theme) && validPair(theme, subTheme);
            }
            return THEME_KEYS.has(value);
          });
          if (!afterSecondaryValid) counts.after.invalidSecondary += 1;
        }

        if (result.changed) {
          data[index] = withNormalizedFields(entry, result.theme, result.subTheme, result.secondaryThemes);
          fileChanged += 1;
          counts.changedEntries += 1;
          counts.byLanguage[lang].changed += 1;
        }

        if (fileTheme.theme && result.theme !== fileTheme.theme) {
          const key = `${relPath}::${result.theme}`;
          if (!mismatchGroups.has(key)) {
            mismatchGroups.set(key, {
              language: lang,
              level: levelFor(relPath),
              file: relPath,
              fileTheme: fileTheme.theme,
              currentTheme: result.theme,
              count: 0,
              samples: [],
            });
          }
          const group = mismatchGroups.get(key);
          group.count += 1;
          if (group.samples.length < 5) group.samples.push({ id: entry.id || '', word: entry.word || '', form: entry.form || '' });
          reviewRows.push({
            issue: 'file_theme_mismatch',
            language: lang,
            level: levelFor(relPath),
            file: relPath,
            id: entry.id || '',
            word: entry.word || '',
            form: entry.form || '',
            theme: result.theme,
            sub_theme: result.subTheme || '',
            suggested_theme: fileTheme.theme,
            note: `File name suggests ${fileTheme.theme}; current theme is ${result.theme}.`,
          });
        }
      }

      if (fileChanged > 0) {
        counts.changedFiles += 1;
        if (!DRY_RUN) {
          fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
        }
      }
    }
  }

  const summary = {
    date: TODAY,
    dryRun: DRY_RUN,
    files: counts.files,
    entries: counts.entries,
    changedEntries: counts.changedEntries,
    changedFiles: counts.changedFiles,
    before: counts.before,
    after: counts.after,
    byLanguage: counts.byLanguage,
    unknownThemes: Object.fromEntries([...counts.unknownThemes.entries()].sort()),
    missingThemeGroups: [...missingThemeGroups.values()].sort((a, b) => b.count - a.count),
    mismatchGroups: [...mismatchGroups.values()].sort((a, b) => b.count - a.count),
  };

  if (!DRY_RUN) writeReports(summary, reviewRows);
  printSummary(summary);
  if (counts.unknownThemes.size > 0) process.exitCode = 1;
}

function writeReports(summary, reviewRows) {
  fs.mkdirSync(REVIEW_DIR, { recursive: true });
  const lines = [];
  lines.push(`# Vocabulary theme normalisation — ${summary.date}`);
  lines.push('');
  lines.push('## Result');
  lines.push('');
  lines.push(`- Files scanned: **${summary.files}**`);
  lines.push(`- Entries scanned: **${summary.entries}**`);
  lines.push(`- Entries changed: **${summary.changedEntries}** across **${summary.changedFiles}** files`);
  lines.push(`- Invalid primary themes: **${summary.before.invalidTheme}** → **${summary.after.invalidTheme}**`);
  lines.push(`- Invalid sub-themes: **${summary.before.invalidSubTheme}** → **${summary.after.invalidSubTheme}**`);
  lines.push(`- Missing sub-themes on themed entries: **${summary.before.missingSubTheme}** → **${summary.after.missingSubTheme}**`);
  lines.push(`- Invalid secondary themes: **${summary.before.invalidSecondary}** → **${summary.after.invalidSecondary}**`);
  lines.push(`- Entries still missing a primary theme: **${summary.after.missingTheme}** (form-based files; see review CSV)`);
  lines.push('');
  lines.push('## Changed entries by language');
  lines.push('');
  lines.push('| Language | Entries | Changed |');
  lines.push('| --- | ---: | ---: |');
  for (const [lang, value] of Object.entries(summary.byLanguage)) {
    lines.push(`| ${lang} | ${value.entries} | ${value.changed} |`);
  }
  lines.push('');
  lines.push('## Remaining entries without a primary theme');
  lines.push('');
  lines.push('These are mostly form-based files (`idiom.json`, `noun.json`, `adjective.json`, `verb.json`, `phrase.json`). They were left unthemed instead of guessing a semantic category. The full list is in `reports/theme-normalisation-review.csv`.');
  lines.push('');
  lines.push('| File | Entries | Forms | Sample entries |');
  lines.push('| --- | ---: | --- | --- |');
  for (const group of summary.missingThemeGroups.slice(0, 40)) {
    const forms = [...group.forms.entries()].sort((a, b) => b[1] - a[1]).map(([form, count]) => `${form || 'unknown'} (${count})`).join(', ');
    const samples = group.samples.map((item) => `${item.word || item.id} [${item.id}]`).join('; ');
    lines.push(`| \`${group.file}\` | ${group.count} | ${forms} | ${samples} |`);
  }
  if (summary.missingThemeGroups.length > 40) lines.push(`| ... | ... | ... | ${summary.missingThemeGroups.length - 40} more files in the CSV |`);
  lines.push('');
  lines.push('## File/theme mismatches for review');
  lines.push('');
  lines.push('These entries have a valid theme that differs from the theme suggested by the file name or directory. Many are legitimate cross-theme entries, so they were not changed automatically. The full list is in `reports/theme-normalisation-review.csv`.');
  lines.push('');
  lines.push('| File | File theme | Current theme | Entries | Sample entries |');
  lines.push('| --- | --- | --- | ---: | --- |');
  for (const group of summary.mismatchGroups.slice(0, 40)) {
    const samples = group.samples.map((item) => `${item.word || item.id} [${item.id}]`).join('; ');
    lines.push(`| \`${group.file}\` | ${group.fileTheme} | ${group.currentTheme} | ${group.count} | ${samples} |`);
  }
  if (summary.mismatchGroups.length > 40) lines.push(`| ... | ... | ... | ... | ${summary.mismatchGroups.length - 40} more groups in the CSV |`);
  lines.push('');
  lines.push('## Unknown invalid themes');
  lines.push('');
  const unknown = Object.entries(summary.unknownThemes);
  if (unknown.length === 0) {
    lines.push('None. Every non-canonical primary theme matched an alias.');
  } else {
    for (const [theme, count] of unknown) lines.push(`- \`${theme}\`: ${count}`);
  }
  lines.push('');
  lines.push('## Reproduce');
  lines.push('');
  lines.push('```sh');
  lines.push('node scripts/normalize-vocabulary-themes.cjs --dry-run');
  lines.push('node scripts/normalize-vocabulary-themes.cjs');
  lines.push('npm run build');
  lines.push('npm run validate');
  lines.push('```');
  lines.push('');

  fs.writeFileSync(path.join(REPORT_DIR, 'theme-normalisation.md'), `${lines.join('\n')}\n`, 'utf8');
  fs.writeFileSync(path.join(REVIEW_DIR, 'theme-normalisation.md'), `${lines.join('\n')}\n`, 'utf8');

  const csv = [
    ['issue', 'language', 'level', 'file', 'id', 'word', 'form', 'theme', 'sub_theme', 'suggested_theme', 'note'],
    ...reviewRows.map((row) => [
      row.issue, row.language, row.level, row.file, row.id, row.word, row.form,
      row.theme, row.sub_theme, row.suggested_theme, row.note,
    ]),
  ].map((row) => row.map(csvCell).join(',')).join('\n');
  fs.writeFileSync(path.join(REPORT_DIR, 'theme-normalisation-review.csv'), `${csv}\n`, 'utf8');
}

function printSummary(summary) {
  console.log(`Theme normalisation ${summary.dryRun ? '(dry run)' : 'complete'}`);
  console.log(`Files scanned: ${summary.files}`);
  console.log(`Entries scanned: ${summary.entries}`);
  console.log(`Entries changed: ${summary.changedEntries} across ${summary.changedFiles} files`);
  console.log(`Invalid primary themes: ${summary.before.invalidTheme} -> ${summary.after.invalidTheme}`);
  console.log(`Invalid sub-themes: ${summary.before.invalidSubTheme} -> ${summary.after.invalidSubTheme}`);
  console.log(`Missing sub-themes: ${summary.before.missingSubTheme} -> ${summary.after.missingSubTheme}`);
  console.log(`Invalid secondary themes: ${summary.before.invalidSecondary} -> ${summary.after.invalidSecondary}`);
  console.log(`Entries still missing a primary theme: ${summary.after.missingTheme}`);
  if (Object.keys(summary.unknownThemes).length) {
    console.log('Unknown invalid themes:', summary.unknownThemes);
  }
}

main();
