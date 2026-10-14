const fs = require("fs");
const path = require("path");
const vm = require("vm");

// CLI path parameter or default
const cosylangDir = process.argv[2] || "/tmp/COSYlanguages/vocabulary/en";

// Helper: slugify headword for ID creation
function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Canonical theme mapping
const themeMapping = {
  "idioms": "communication",
  "sports": "leisure",
  "places": "geography",
  "home": "housing",
  "science": "technology",
  "social": "communication",
  "health_medicine": "health",
  "giving_opinions": "communication",
  "language": "communication",
  "people": "communication",
  "shopping": "shopping",
  "work": "work",
  "technology": "technology",
  "time": "time",
  "travel": "travel",
  "nature": "nature",
  "culture": "communication",
  "politics": "communication",
  "law": "communication",
  "economy": "work",
  "academic": "education",
  "education": "education",
  "emotions": "emotions",
  "family": "family",
  "food": "food",
  "general": "general",
  "geography": "geography",
  "grammar": "grammar",
  "health": "health",
  "housing": "housing",
  "leisure": "leisure",
  "measurement": "measurement",
  "navigation": "navigation",
  "numbers": "numbers",
  "objects": "objects",
  "shapes": "shapes",
  "philosophy": "philosophy",
  "weather": "weather"
};

function getCanonicalTheme(rawTheme) {
  if (!rawTheme) return "general";
  const lower = rawTheme.toLowerCase().trim();
  return themeMapping[lower] || "general";
}

// Helper to clean IPA transcription
function formatIPA(raw) {
  if (!raw) return "/.../";
  let cleaned = raw.trim();
  if (cleaned.includes("🇬🇧") || cleaned.includes("🇺🇸")) {
    const ukMatch = cleaned.match(/🇬🇧\s*([^|]+)/);
    if (ukMatch) cleaned = ukMatch[1].trim();
    else {
      const usMatch = cleaned.match(/🇺🇸\s*(.+)/);
      if (usMatch) cleaned = usMatch[1].trim();
    }
  }
  cleaned = cleaned.replace(/^\/+|\/+$/g, "").trim();
  return `/${cleaned}/`;
}

// Irregular plurals mapping
const irregularPlurals = {
  "man": "men", "woman": "women", "child": "children", "person": "people",
  "foot": "feet", "tooth": "teeth", "goose": "geese", "mouse": "mice",
  "ox": "oxen", "louse": "lice", "die": "dice", "criterion": "criteria",
  "phenomenon": "phenomena", "datum": "data", "medium": "media",
  "analysis": "analyses", "crisis": "crises", "thesis": "theses",
  "basis": "bases", "index": "indices", "appendix": "appendices",
  "focus": "foci", "cactus": "cacti", "nucleus": "nuclei",
  "fungus": "fungi", "syllabus": "syllabi", "stimulus": "stimuli",
  "alumnus": "alumni", "half": "halves", "knife": "knives", "life": "lives",
  "leaf": "leaves", "thief": "thieves", "wife": "wives", "calf": "calves",
  "wolf": "wolves", "shelf": "shelves", "loaf": "loaves", "hero": "heroes",
  "potato": "potatoes", "tomato": "tomatoes", "echo": "echoes",
  "torpedo": "torpedoes", "veto": "vetoes", "gentleman": "gentlemen"
};

function getEnglishPlural(word) {
  if (!word) return "";
  const lower = word.toLowerCase().trim();

  // If compound word (e.g. "action bias"), process last token
  const tokens = lower.split(/\s+/);
  if (tokens.length > 1) {
    const lastToken = tokens[tokens.length - 1];
    const lastPlural = getEnglishPlural(lastToken);
    tokens[tokens.length - 1] = lastPlural;
    return tokens.join(" ");
  }

  if (irregularPlurals[lower]) {
    return irregularPlurals[lower];
  }

  // Already ending in plural -es or -s if pluralia/plural form
  if (lower.endsWith("ss")) {
    return lower + "es"; // e.g. bias -> biases, pass -> passes
  }

  if (/[sxyz]$|ch$|sh$/i.test(lower)) {
    return lower + "es";
  }

  if (/[bcdfghjklmnpqrstvwxyz]y$/i.test(lower)) {
    return lower.slice(0, -1) + "ies";
  }

  if (/[fe]$/i.test(lower) && !lower.endsWith("ee") && !lower.endsWith("ffe")) {
    if (lower.endsWith("fe")) return lower.slice(0, -2) + "ves";
    if (lower.endsWith("f") && !lower.endsWith("rf") && !lower.endsWith("ff")) return lower.slice(0, -1) + "ves";
  }

  return lower + "s";
}

// Known uncountable nouns list
const uncountableSet = new Set([
  // Sports & Games
  "badminton", "golf", "hockey", "rugby", "tennis", "football", "cricket", "volleyball",
  "athletics", "squash", "archery", "bowling", "curling", "fencing", "gymnastics",
  "judo", "karate", "rowing", "skiing", "surfing", "swimming", "boxing", "wrestling",
  "sailing", "taekwondo",
  // Food & Drink / Ingredients
  "spinach", "cinnamon", "celery", "oatmeal", "butter", "cheese", "milk", "water",
  "rice", "sugar", "salt", "pepper", "oil", "soup", "flour", "wheat", "bread", "meat",
  "pork", "beef", "mutton", "lamb", "poultry", "seafood", "mustard", "mayonnaise",
  "honey", "jam", "juice", "tea", "coffee", "beer", "wine", "liquor",
  // Mass & Abstract Nouns
  "health", "mental health", "remote work", "work", "information", "furniture",
  "luggage", "baggage", "equipment", "advice", "news", "knowledge", "money",
  "cash", "traffic", "weather", "software", "hardware", "research", "evidence",
  "progress", "harm", "permission", "patience", "courage", "luck", "fun",
  "leisure", "space", "poverty", "pollution", "justice", "freedom", "peace",
  "security", "safety", "staff", "personnel", "content", "context", "conduct"
]);

function isUncountable(word) {
  if (!word) return false;
  const lower = word.toLowerCase().trim();
  return uncountableSet.has(lower);
}

// Helper to load all COSYdata files
function getJsonFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  for (const file of fs.readdirSync(dir)) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      results = results.concat(getJsonFiles(filePath));
    } else if (file.endsWith(".json") && !file.endsWith("index.json") && !file.endsWith("flat-index.json") && !file.endsWith("search-index.json")) {
      results.push(filePath);
    }
  }
  return results;
}

const cosydataFiles = getJsonFiles("vocabulary/en");
const cosydataByFile = new Map();
const cosydataById = new Map();
const cosydataByWordForm = new Map();
const allUsedIds = new Set();

for (const f of cosydataFiles) {
  const content = JSON.parse(fs.readFileSync(f, "utf8"));
  cosydataByFile.set(f, content);
  for (const item of content) {
    if (item.id) {
      cosydataById.set(item.id, { item, file: f });
      allUsedIds.add(item.id);
    }
    const key = `${(item.word || "").toLowerCase().trim()}:${item.form}`;
    if (!cosydataByWordForm.has(key)) cosydataByWordForm.set(key, []);
    cosydataByWordForm.get(key).push({ item, file: f });
  }
}

// Helper to load all COSYlanguages JS files
function getJsFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  for (const file of fs.readdirSync(dir)) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      results = results.concat(getJsFiles(filePath));
    } else if (file.endsWith(".js")) {
      results.push(filePath);
    }
  }
  return results;
}

const cosylangFiles = getJsFiles(cosylangDir);
const context = { window: {} };
vm.createContext(context);
for (const f of cosylangFiles) {
  const code = fs.readFileSync(f, "utf8");
  try {
    vm.runInContext(code, context);
  } catch (err) {
    console.error("Error evaluating:", f, err.message);
  }
}

const cosylangEntries = context.window.vocabularyData && context.window.vocabularyData.en ? context.window.vocabularyData.en : [];

console.log(`Loaded ${cosydataFiles.length} COSYdata files, total used IDs: ${allUsedIds.size}`);
console.log(`Loaded ${cosylangEntries.length} COSYlanguages entries from ${cosylangDir}.`);

let enrichedCount = 0;
let newCreatedCount = 0;

const levelDirMap = {
  "elementary": "a2",
  "intermediate": "b1",
  "upper_intermediate": "b2",
  "advanced": "c1",
  "proficiency": "c2",
  "A2": "a2",
  "B1": "b1",
  "B2": "b2",
  "C1": "c1",
  "C2": "c2"
};

const levelCodeMap = {
  "elementary": "A2",
  "intermediate": "B1",
  "upper_intermediate": "B2",
  "advanced": "C1",
  "proficiency": "C2",
  "A2": "A2",
  "B1": "B1",
  "B2": "B2",
  "C1": "C1",
  "C2": "C2"
};

const formNormalizeMap = {
  "noun phrase": "noun",
  "adjective / adverb": "adjective",
  "other": "phrase"
};

const newEntriesByFile = new Map();

for (const cItem of cosylangEntries) {
  const wordClean = (cItem.word || "").trim();
  if (!wordClean) continue;

  let form = cItem.form || "noun";
  if (formNormalizeMap[form]) form = formNormalizeMap[form];

  const key = `${wordClean.toLowerCase()}:${form}`;
  let match = (cItem.id && cosydataById.get(cItem.id)) || (cosydataByWordForm.has(key) && cosydataByWordForm.get(key)[0]);

  if (match) {
    // ENRICH EXISTING ITEM
    const target = match.item;
    let modified = false;

    // Synonyms
    if (cItem.synonyms && Array.isArray(cItem.synonyms) && cItem.synonyms.length > 0) {
      if (!target.synonyms || target.synonyms.length === 0) {
        target.synonyms = cItem.synonyms;
        modified = true;
      }
    }

    // Antonyms
    if (cItem.antonyms && Array.isArray(cItem.antonyms) && cItem.antonyms.length > 0) {
      if ((!target.antonyms || target.antonyms.length === 0) && target.no_antonym) {
        delete target.no_antonym;
        target.antonyms = cItem.antonyms.slice(0, 2);
        modified = true;
      }
    }

    // Emoji
    if (cItem.emoji && (!target.emoji || target.emoji === "❓") && !target.no_emoji) {
      target.emoji = cItem.emoji;
      modified = true;
    }

    // Definitions & Examples
    if (cItem.definitions) {
      const cDefs = Array.isArray(cItem.definitions) ? cItem.definitions : [cItem.definitions];
      for (const d of cDefs) {
        if (typeof d === "object" && d.examples) {
          target.examples = target.examples || [];
          for (const ex of d.examples) {
            if (!target.examples.includes(ex)) {
              target.examples.push(ex);
              modified = true;
            }
          }
        }
      }
    }

    // Transcription
    if (cItem.transcription && !target.transcription && !target.transcription_variants) {
      target.transcription = formatIPA(cItem.transcription);
      modified = true;
    }

    if (modified) enrichedCount++;
  } else {
    // CREATE NEW ITEM
    const lvlDir = levelDirMap[cItem.level_code || cItem.level] || "a2";
    const lvlCode = levelCodeMap[cItem.level_code || cItem.level] || "A2";

    // Target file selection
    let themeFileName = "general.json";
    if (form === "idiom" || cItem.theme === "idioms") {
      themeFileName = "idioms.json";
    } else if (cItem.theme) {
      themeFileName = `${slugify(cItem.theme)}.json`;
    }

    const targetFilePath = path.join("vocabulary", "en", lvlDir, themeFileName);

    // ID generation
    let baseSlug = slugify(wordClean);
    if (!baseSlug) baseSlug = "word";
    let candidateId = `en:${baseSlug}:${form}`;
    if (allUsedIds.has(candidateId)) {
      const themeSlug = slugify(cItem.theme || "term");
      candidateId = `en:${baseSlug}-${themeSlug}:${form}`;
      let suffix = 1;
      while (allUsedIds.has(candidateId)) {
        candidateId = `en:${baseSlug}-${themeSlug}-${suffix}:${form}`;
        suffix++;
      }
    }
    allUsedIds.add(candidateId);

    // Build definitions array
    let defs = [];
    let exList = [];
    if (cItem.definitions) {
      const cDefs = Array.isArray(cItem.definitions) ? cItem.definitions : [cItem.definitions];
      for (const d of cDefs) {
        if (typeof d === "string") {
          defs.push(d);
        } else if (typeof d === "object") {
          if (d.text) defs.push(d.text);
          if (d.examples && Array.isArray(d.examples)) {
            exList.push(...d.examples);
          }
        }
      }
    }
    if (defs.length === 0) {
      defs.push(cItem.subtext || `${wordClean} (${form})`);
    }

    if (exList.length === 0) {
      exList.push(`We used the term '${wordClean}' in our discussion.`);
    }

    // Form specific fields
    const newItem = {
      id: candidateId,
      word: wordClean,
      language: "en",
      form: form,
      level: lvlCode,
      theme: getCanonicalTheme(cItem.theme),
      definitions: defs,
      examples: exList.slice(0, 3),
      transcription: formatIPA(cItem.transcription)
    };

    if (cItem.emoji) {
      newItem.emoji = cItem.emoji;
    } else {
      newItem.no_emoji = true;
    }

    if (cItem.antonyms && Array.isArray(cItem.antonyms) && cItem.antonyms.length > 0) {
      newItem.antonyms = cItem.antonyms.slice(0, 2);
    } else {
      newItem.no_antonym = true;
    }

    if (cItem.synonyms && Array.isArray(cItem.synonyms) && cItem.synonyms.length > 0) {
      newItem.synonyms = cItem.synonyms.slice(0, 3);
    }

    if (form === "noun") {
      const cCountability = (cItem._legacy && cItem._legacy.countability) || cItem.countability;
      if (cCountability && ["countable", "uncountable", "pluralia_tantum", "invariable", "false_plural"].includes(cCountability)) {
        newItem.countability = cCountability;
      } else if (isUncountable(wordClean)) {
        newItem.countability = "uncountable";
      } else {
        newItem.countability = "countable";
      }

      if (newItem.countability === "countable") {
        const startsWithVowel = /^[aeiou]/i.test(wordClean);
        newItem.article = startsWithVowel ? "an" : "a";
        newItem.plural_form = (cItem._legacy && cItem._legacy.plural) || getEnglishPlural(wordClean);
      }
    }

    if (form === "verb") {
      if (cItem.classification === "irregular") {
        newItem.is_irregular = true;
        newItem.past_tense = cItem.v2 || `${wordClean}ed`;
        newItem.past_participle = cItem.v3 || cItem.v2 || `${wordClean}ed`;
      }
    }

    if (!newEntriesByFile.has(targetFilePath)) {
      newEntriesByFile.set(targetFilePath, []);
    }
    newEntriesByFile.get(targetFilePath).push(newItem);
    newCreatedCount++;
  }
}

console.log(`Enriched ${enrichedCount} existing COSYdata entries.`);
console.log(`Created ${newCreatedCount} new COSYdata entries across ${newEntriesByFile.size} files.`);

// Write updated existing files
for (const [f, content] of cosydataByFile.entries()) {
  fs.writeFileSync(f, JSON.stringify(content, null, 2) + "\n", "utf8");
}

// Append or write new files
for (const [targetFilePath, items] of newEntriesByFile.entries()) {
  const dir = path.dirname(targetFilePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  let existing = [];
  if (fs.existsSync(targetFilePath)) {
    try {
      existing = JSON.parse(fs.readFileSync(targetFilePath, "utf8"));
    } catch (e) {
      existing = [];
    }
  }

  const combined = [...existing, ...items];
  fs.writeFileSync(targetFilePath, JSON.stringify(combined, null, 2) + "\n", "utf8");
}

console.log("Migration script execution completed!");
