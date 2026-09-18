const fs = require("fs");
const path = require("path");

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file));
    } else if (file.endsWith(".json") && !file.endsWith("index.json") && !file.endsWith("flat-index.json")) {
      results.push(file);
    }
  });
  return results;
}

const enFiles = getFiles("vocabulary/en");
const existingWordsSet = new Set();
const existingIdsSet = new Set();

enFiles.forEach(f => {
  const content = JSON.parse(fs.readFileSync(f, "utf8"));
  if (Array.isArray(content)) {
    content.forEach(entry => {
      if (entry.id) existingIdsSet.add(entry.id);
      if (entry.word) existingWordsSet.add(entry.word.toLowerCase().trim());
    });
  }
});

console.log(`Loaded ${existingWordsSet.size} existing words, ${existingIdsSet.size} existing IDs.`);

const curatedEntries = [
  // IT Specialists
  {
    word: "front end",
    form: "noun",
    level: "B1",
    theme: "it_specialists",
    domain: "professional",
    sub_theme: "it-specialists",
    countability: "countable",
    plural_form: "front ends",
    transcription: "/ˌfrʌnt ˈend/",
    transcription_variants: { us: "/ˌfrʌnt ˈend/" },
    no_emoji: true,
    definitions: ["the client-side user interface of a computer application or website with which users directly interact"],
    examples: ["The software development team redesigned the front end to improve accessibility and user navigation."],
    synonyms: ["client side", "user interface"],
    no_antonym: true
  },
  {
    word: "back end",
    form: "noun",
    level: "B1",
    theme: "it_specialists",
    domain: "professional",
    sub_theme: "it-specialists",
    countability: "countable",
    plural_form: "back ends",
    transcription: "/ˌbæk ˈend/",
    transcription_variants: { us: "/ˌbæk ˈend/" },
    no_emoji: true,
    definitions: ["the server-side part of a software application responsible for data processing, business logic, and database operations"],
    examples: ["Engineers optimized the database queries on the back end to reduce server response times."],
    synonyms: ["server side", "data layer"],
    no_antonym: true
  },
  {
    word: "source code",
    form: "noun",
    level: "B1",
    theme: "it_specialists",
    domain: "professional",
    sub_theme: "it-specialists",
    countability: "uncountable",
    transcription: "/ˈsɔːs kəʊd/",
    transcription_variants: { us: "/ˈsɔːrs koʊd/" },
    no_emoji: true,
    definitions: ["the human-readable instruction statements written by programmers in a high-level programming language"],
    examples: ["Developers submitted their source code to the central repository for automated security scanning."],
    synonyms: ["codebase", "program text"],
    no_antonym: true
  },
  {
    word: "refactor",
    form: "verb",
    level: "B2",
    theme: "it_specialists",
    domain: "professional",
    sub_theme: "it-specialists",
    transcription: "/riːˈfæk.tə/",
    transcription_variants: { us: "/riːˈfæk.tɚ/" },
    no_emoji: true,
    definitions: ["to restructure existing computer code without altering its external behavior to improve maintainability and readability"],
    examples: ["The engineering team scheduled two weeks to refactor legacy code before introducing new platform features."],
    synonyms: ["restructure", "clean up", "reorganize"],
    no_antonym: true
  },
  {
    word: "microservices",
    form: "noun",
    level: "B2",
    theme: "it_specialists",
    domain: "professional",
    sub_theme: "it-specialists",
    countability: "pluralia_tantum",
    singular_workaround: "a microservice",
    transcription: "/ˈmaɪ.krəʊˌsɜː.vɪ.sɪz/",
    transcription_variants: { us: "/ˈmaɪ.kroʊˌsɝː.vɪ.sɪz/" },
    no_emoji: true,
    definitions: ["a software architectural style that structures an application as a collection of small, independent, deployable services"],
    examples: ["Migrating from a monolithic architecture to microservices enabled the team to deploy updates independently."],
    synonyms: ["distributed services", "modular architecture"],
    no_antonym: true
  },
  {
    word: "technical debt",
    form: "noun",
    level: "B2",
    theme: "it_specialists",
    domain: "professional",
    sub_theme: "it-specialists",
    countability: "uncountable",
    transcription: "/ˈtek.nɪ.kəl det/",
    transcription_variants: { us: "/ˈtek.nɪ.kəl det/" },
    no_emoji: true,
    definitions: ["the implied cost of additional rework caused by choosing an easy or fast code solution now instead of a better approach"],
    examples: ["Accumulated technical debt forced developers to spend more time patching bugs than writing new features."],
    synonyms: ["code debt", "architectural debt"],
    no_antonym: true
  },
  {
    word: "idempotency",
    form: "noun",
    level: "C1",
    theme: "it_specialists",
    domain: "professional",
    sub_theme: "it-specialists",
    countability: "uncountable",
    transcription: "/ˌaɪ.demˈpəʊ.tən.si/",
    transcription_variants: { us: "/ˌaɪ.demˈpoʊ.tən.si/" },
    no_emoji: true,
    definitions: ["the property of an operation whereby it can be applied multiple times without changing the result beyond the initial application"],
    examples: ["Ensuring idempotency in payment processing APIs prevents duplicate charges when network retries occur."],
    synonyms: ["repeatability", "consistency"],
    no_antonym: true
  },
  {
    word: "Byzantine fault tolerance",
    form: "noun",
    level: "C2",
    theme: "it_specialists",
    domain: "professional",
    sub_theme: "it-specialists",
    countability: "uncountable",
    transcription: "/ˈbɪz.ən.tiːn fɔːlt ˈtɒl.ər.əns/",
    transcription_variants: { us: "/ˈbɪz.ən.tiːn fɑːlt ˈtɑːl.ɚ.əns/" },
    no_emoji: true,
    definitions: ["the dependability of a fault-tolerant computer system where components may fail and there is imperfect information on whether a component has failed"],
    examples: ["Consensus protocols in distributed ledgers rely on Byzantine fault tolerance to reach agreement despite potentially malicious network nodes."],
    synonyms: ["resilient consensus", "distributed reliability"],
    no_antonym: true
  },

  // Legal English
  {
    word: "cross-examination",
    form: "noun",
    level: "B2",
    theme: "legal_english",
    domain: "professional",
    sub_theme: "legal-english",
    countability: "countable",
    plural_form: "cross-examinations",
    transcription: "/ˌkrɒs.ɪɡˌzæm.ɪˈneɪ.ʃən/",
    transcription_variants: { us: "/ˌkrɑːs.ɪɡˌzæm.əˈneɪ.ʃən/" },
    no_emoji: true,
    definitions: ["the formal questioning of a witness called by the opposing party in a court trial to test veracity or credibility"],
    examples: ["During cross-examination, defense counsel pointed out inconsistencies in the key witness's timeline."],
    synonyms: ["questioning", "interrogation"],
    no_antonym: true
  },
  {
    word: "alternative dispute resolution",
    form: "noun",
    level: "B2",
    theme: "legal_english",
    domain: "professional",
    sub_theme: "legal-english",
    countability: "uncountable",
    transcription: "/ɔːlˈtɜː.nə.tɪv dɪˈspjuːt ˌrez.əˈluː.ʃən/",
    transcription_variants: { us: "/ɑːlˈtɝː.nə.t̬ɪv dɪˈspjuːt ˌrez.əˈluː.ʃən/" },
    no_emoji: true,
    definitions: ["methods such as mediation or arbitration used to resolve legal conflicts without resorting to court litigation"],
    examples: ["Both corporations agreed to pursue alternative dispute resolution to settle their contractual disagreement discreetly and cost-effectively."],
    synonyms: ["ADR", "mediation", "arbitration"],
    no_antonym: true
  },
  {
    word: "interlocutory injunction",
    form: "noun",
    level: "C1",
    theme: "legal_english",
    domain: "professional",
    sub_theme: "legal-english",
    countability: "countable",
    plural_form: "interlocutory injunctions",
    transcription: "/ˌɪn.təˈlɒk.jə.tər.i ɪnˈdʒʌŋk.ʃən/",
    transcription_variants: { us: "/ˌɪn.t̬ɚˈlɑː.kjə.tɔːr.i ɪnˈdʒʌŋk.ʃən/" },
    no_emoji: true,
    definitions: ["a provisional court order issued before the final trial judgment to preserve the status quo or prevent immediate irreparable harm"],
    examples: ["The court granted an interlocutory injunction preventing the competitor from distributing the proprietary product pending trial outcome."],
    synonyms: ["temporary injunction", "preliminary order"],
    no_antonym: true
  },
  {
    word: "res judicata",
    form: "noun",
    level: "C1",
    theme: "legal_english",
    domain: "professional",
    sub_theme: "legal-english",
    countability: "uncountable",
    transcription: "/ˌriːz dʒuː.dɪˈkɑː.tə/",
    transcription_variants: { us: "/ˌriːz dʒuː.dɪˈkɑː.t̬ə/" },
    no_emoji: true,
    definitions: ["a legal principle establishing that a matter that has been finally adjudicated by a competent court may not be pursued again by the same parties"],
    examples: ["The tribunal dismissed the lawsuit on the grounds of res judicata, noting the appellate court had already issued a final decision."],
    synonyms: ["adjudicated matter", "final judgment"],
    no_antonym: true
  },
  {
    word: "pacta sunt servanda",
    form: "noun",
    level: "C2",
    theme: "legal_english",
    domain: "professional",
    sub_theme: "legal-english",
    countability: "uncountable",
    transcription: "/ˈpæk.tə sʊnt sɜːˈvæn.də/",
    transcription_variants: { us: "/ˈpæk.tə sʊnt sɝːˈvæn.də/" },
    no_emoji: true,
    definitions: ["a fundamental principle of international law stating that agreements and international treaties are binding upon the parties and must be performed in good faith"],
    examples: ["International legal scholars reaffirmed the principle of pacta sunt servanda when evaluating bilateral trade obligations during diplomatic talks."],
    synonyms: ["binding agreements principle", "sanctity of contracts"],
    no_antonym: true
  },

  // Teachers & Scientists
  {
    word: "differentiation",
    form: "noun",
    level: "B1",
    theme: "teachers_scientists",
    domain: "professional",
    sub_theme: "teachers-scientists",
    countability: "uncountable",
    transcription: "/ˌdɪf.ər.en.ʃiˈeɪ.ʃən/",
    transcription_variants: { us: "/ˌdɪf.ɚ.en.ʃiˈeɪ.ʃən/" },
    no_emoji: true,
    definitions: ["the educational practice of tailoring instruction to meet individual student learning needs, readiness, and interests"],
    examples: ["Effective classroom differentiation allows teachers to support struggling learners while challenging advanced students."],
    synonyms: ["adapted instruction", "tailored learning"],
    no_antonym: true
  },
  {
    word: "formative assessment",
    form: "noun",
    level: "B2",
    theme: "teachers_scientists",
    domain: "professional",
    sub_theme: "teachers-scientists",
    countability: "countable",
    plural_form: "formative assessments",
    transcription: "/ˈfɔː.mə.tɪv əˈses.mənt/",
    transcription_variants: { us: "/ˈfɔːr.mə.t̬ɪv əˈses.mənt/" },
    no_emoji: true,
    definitions: ["ongoing evaluation methods used by instructors to monitor student learning and provide feedback during the instructional process"],
    examples: ["Quizzes and class polls serve as formative assessment tools to identify learning gaps before final examinations."],
    synonyms: ["ongoing evaluation", "diagnostic assessment"],
    no_antonym: true
  },
  {
    word: "constructivism",
    form: "noun",
    level: "C1",
    theme: "teachers_scientists",
    domain: "professional",
    sub_theme: "teachers-scientists",
    countability: "uncountable",
    transcription: "/kənˈstrʌk.tɪ.vɪ.zəm/",
    transcription_variants: { us: "/kənˈstrʌk.tə.vɪ.zəm/" },
    no_emoji: true,
    definitions: ["a learning theory emphasizing that learners actively construct knowledge rather than passively receiving information"],
    examples: ["In accordance with educational constructivism, students engaged in hands-on inquiry projects to build scientific understanding."],
    synonyms: ["constructivist learning", "active learning theory"],
    no_antonym: true
  },
  {
    word: "andragogical praxis",
    form: "noun",
    level: "C2",
    theme: "teachers_scientists",
    domain: "professional",
    sub_theme: "teachers-scientists",
    countability: "uncountable",
    transcription: "/ˌæn.drəˈɡɒdʒ.ɪ.kəl ˈpræk.sɪs/",
    transcription_variants: { us: "/ˌæn.drəˈɡɑː.dʒɪ.kəl ˈpræk.sɪs/" },
    no_emoji: true,
    definitions: ["the practical application and reflective action of adult learning theory and instructional methods"],
    examples: ["Professors designing executive adult education programs grounded their course structure in reflexive andragogical praxis."],
    synonyms: ["adult education practice", "reflective pedagogy"],
    no_antonym: true
  },

  // Academic English
  {
    word: "literature review",
    form: "noun",
    level: "B1",
    theme: "academic_english",
    domain: "professional",
    sub_theme: "academic-english",
    countability: "countable",
    plural_form: "literature reviews",
    transcription: "/ˈlɪt.rə.tʃə rɪˈvjuː/",
    transcription_variants: { us: "/ˈlɪt̬.ɚ.ə.tʃʊr rɪˈvjuː/" },
    no_emoji: true,
    definitions: ["a comprehensive survey and critical evaluation of published scholarly works relevant to a specific research topic"],
    examples: ["The postgraduate researcher wrote a literature review to identify existing research gaps in renewable energy policy."],
    synonyms: ["scholarly survey", "literature synthesis"],
    no_antonym: true
  },
  {
    word: "thesis statement",
    form: "noun",
    level: "B2",
    theme: "academic_english",
    domain: "professional",
    sub_theme: "academic-english",
    countability: "countable",
    plural_form: "thesis statements",
    transcription: "/ˈθiː.sɪs ˌsteɪt.mənt/",
    transcription_variants: { us: "/ˈθiː.sɪs ˌsteɪt.mənt/" },
    no_emoji: true,
    definitions: ["a concise sentence appearing in an academic paper that summarizes the central argument or claim"],
    examples: ["The student refined her thesis statement to clearly articulate the main line of argument in her essay."],
    synonyms: ["main claim", "central thesis"],
    no_antonym: true
  },
  {
    word: "intertextuality",
    form: "noun",
    level: "C1",
    theme: "academic_english",
    domain: "professional",
    sub_theme: "academic-english",
    countability: "uncountable",
    transcription: "/ˌɪn.tə.teks.tʃuˈæl.ə.ti/",
    transcription_variants: { us: "/ˌɪn.t̬ɚ.teks.tʃuˈæl.ə.t̬i/" },
    no_emoji: true,
    definitions: ["the complex relationship and interrelationship between texts that shapes a reader's interpretation of a literary or scholarly work"],
    examples: ["The literary scholar analyzed intertextuality in modern poetry, demonstrating how allusions to classical tragedy enriched the text."],
    synonyms: ["textual cross-reference", "intertextual relation"],
    no_antonym: true
  },
  {
    word: "hermeneutic circle",
    form: "noun",
    level: "C2",
    theme: "academic_english",
    domain: "professional",
    sub_theme: "academic-english",
    countability: "countable",
    plural_form: "hermeneutic circles",
    transcription: "/ˌhɜː.mɪˈnjuː.tɪk ˈsɜː.kəl/",
    transcription_variants: { us: "/ˌhɝː.məˈnuː.t̬ɪk ˈsɝː.kəl/" },
    no_emoji: true,
    definitions: ["a process of textual interpretation where understanding a whole text depends on understanding its parts, and vice versa"],
    examples: ["Literary critics navigated the hermeneutic circle to reconcile historical context with granular textual analysis."],
    synonyms: ["interpretive cycle", "hermeneutic loop"],
    no_antonym: true
  }
];

let addedCount = 0;

curatedEntries.forEach(entry => {
  const slug = entry.word.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const id = `en:${slug}:${entry.form}`;

  if (existingWordsSet.has(entry.word.toLowerCase().trim())) {
    console.log(`Skipping duplicate word: ${entry.word}`);
    return;
  }
  if (existingIdsSet.has(id)) {
    console.log(`Skipping duplicate ID: ${id}`);
    return;
  }

  entry.id = id;
  entry.language = "en";

  const lvlFolder = entry.level.toLowerCase();
  const filePath = path.join("vocabulary/en", lvlFolder, `${entry.theme}.json`);

  let themeArray = [];
  if (fs.existsSync(filePath)) {
    themeArray = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  themeArray.push(entry);
  fs.writeFileSync(filePath, JSON.stringify(themeArray, null, 2) + "\n", "utf8");

  existingWordsSet.add(entry.word.toLowerCase().trim());
  existingIdsSet.add(id);
  addedCount++;
});

console.log(`Added ${addedCount} curated entries.`);
