const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'vocabulary', 'en', 'c2', 'academic_vocabulary.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// IDs or words to remove before inserting clean merged entries
const removeIdsOrWords = new Set([
  'en:bona:phrase', 'en:fide:phrase', 'en:bona-fide:phrase',
  'en:de:phrase', 'en:facto:phrase', 'en:de-facto:phrase',
  'en:et:phrase', 'en:cetera:phrase', 'en:et-cetera:phrase',
  'en:ex:phrase', 'en:post:phrase', 'en:ex-post:phrase',
  'en:mutatis:phrase', 'en:mutandis:phrase', 'en:mutatis-mutandis:phrase',
  'en:per:phrase', 'en:se:phrase', 'en:per-se:phrase',
  'en:prima:phrase', 'en:facie:phrase', 'en:prima-facie:phrase',
  'en:pro:phrase', 'en:bono:phrase', 'en:pro-bono:phrase',
  'en:quid:phrase', 'en:quo:phrase', 'en:quid-pro-quo:phrase', 'en:quid-pro-quo-or-status-quo:phrase',
  'en:sui:phrase', 'en:generis:phrase', 'en:sui-generis:phrase',
  'en:status:phrase', 'en:status-quo:phrase',
  'en:raison:phrase', 'en:d-tre:phrase', 'en:raison-detre:phrase', 'en:raison-d-etre:phrase',
  'en:absentia:phrase', 'en:in-absentia:phrase',
  'en:situ:phrase', 'en:in-situ:phrase',
  'en:toto:phrase', 'en:in-toto:phrase'
]);

// Merged / newly constructed clean canonical entries
const mergedEntries = [
  {
    id: "en:bona-fide:phrase",
    word: "bona fide",
    language: "en",
    form: "phrase",
    level: "C2",
    definitions: [
      "Genuine, authentic, or carried out in good faith without intent to deceive."
    ],
    examples: [
      "The diplomat presented bona fide credentials to the ambassador, proving his official authority to negotiate the international trade agreement."
    ],
    domain: "general",
    theme: "academic",
    updated: "2025-01-15",
    transcription: {
      uk: "/ˌbəʊ.nə ˈfaɪ.diː/",
      us: "/ˌboʊ.nə ˈfaɪ.di/"
    },
    emoji: "📜",
    synonyms: ["genuine", "authentic", "real"],
    no_antonym: true
  },
  {
    id: "en:de-facto:phrase",
    word: "de facto",
    language: "en",
    form: "phrase",
    level: "C2",
    definitions: [
      "Functioning in reality or practice, regardless of whether officially or legally established."
    ],
    examples: [
      "Although no formal decree was issued, the experienced vice president became the de facto leader during the president's extended medical leave."
    ],
    domain: "general",
    theme: "academic",
    updated: "2025-01-15",
    transcription: {
      uk: "/deɪ ˈfæk.təʊ/",
      us: "/deɪ ˈfæk.toʊ/"
    },
    emoji: "⚖️",
    synonyms: ["actual", "in effect", "practical"],
    no_antonym: true
  },
  {
    id: "en:et-cetera:phrase",
    word: "et cetera",
    language: "en",
    form: "phrase",
    level: "C2",
    definitions: [
      "And other similar things; used at the end of a list to indicate that additional items of the same class are implied."
    ],
    examples: [
      "The syllabus listed primary historical sources including charters, treaties, diplomatic dispatches, et cetera, for student review prior to examinations."
    ],
    domain: "general",
    theme: "academic",
    updated: "2025-01-15",
    transcription: {
      uk: "/et ˈset.ər.ə/",
      us: "/et ˈset.ər.ə/"
    },
    emoji: "📝",
    synonyms: ["and so forth", "and others", "and so on"],
    no_antonym: true
  },
  {
    id: "en:ex-post:phrase",
    word: "ex post",
    language: "en",
    form: "phrase",
    level: "C2",
    definitions: [
      "Based on analysis or evaluation after an event has occurred; retrospective."
    ],
    examples: [
      "Economists conducted an ex post evaluation of the policy reform to determine whether original financial forecasts matched actual market outcomes."
    ],
    domain: "general",
    theme: "academic",
    updated: "2025-01-15",
    transcription: {
      uk: "/eks ˈpəʊst/",
      us: "/eks ˈpoʊst/"
    },
    emoji: "🔍",
    synonyms: ["retrospectively", "afterward", "subsequently"],
    no_antonym: true
  },
  {
    id: "en:in-absentia:phrase",
    word: "in absentia",
    language: "en",
    form: "phrase",
    level: "C2",
    definitions: [
      "The state of being absent; occurring or conducted while the individual concerned is not present."
    ],
    examples: [
      "The distinguished professor was awarded an honorary doctorate in absentia while delivering a keynote address at an international conference overseas."
    ],
    domain: "general",
    theme: "academic",
    updated: "2025-01-15",
    transcription: {
      uk: "/ˌɪn æbˈsen.ʃi.ə/",
      us: "/ˌɪn æbˈsen.ʃə/"
    },
    emoji: "👤",
    synonyms: ["in absence", "while absent", "unattended"],
    no_antonym: true
  },
  {
    id: "en:in-situ:phrase",
    word: "in situ",
    language: "en",
    form: "phrase",
    level: "C2",
    definitions: [
      "In its original or natural place or position, studied without moving it from context."
    ],
    examples: [
      "Archaeologists analyzed ancient artifact fragments in situ to preserve delicate context before carefully excavating the surrounding historical settlement site."
    ],
    domain: "general",
    theme: "academic",
    updated: "2025-01-15",
    transcription: {
      uk: "/ˌɪn ˈsɪt.juː/",
      us: "/ˌɪn ˈsɪt.tuː/"
    },
    emoji: "📍",
    synonyms: ["in place", "on site", "in position"],
    no_antonym: true
  },
  {
    id: "en:in-toto:phrase",
    word: "in toto",
    language: "en",
    form: "phrase",
    level: "C2",
    definitions: [
      "As a whole or entirely; completely encompassing every part without exception or qualification."
    ],
    examples: [
      "The academic Senate rejected the proposed curriculum overhaul in toto, citing severe pedagogical flaws across multiple core humanities departments."
    ],
    domain: "general",
    theme: "academic",
    updated: "2025-01-15",
    transcription: {
      uk: "/ˌɪn ˈtəʊ.təʊ/",
      us: "/ˌɪn ˈtoʊ.toʊ/"
    },
    emoji: "🌐",
    synonyms: ["entirely", "in full", "completely"],
    no_antonym: true
  },
  {
    id: "en:mutatis-mutandis:phrase",
    word: "mutatis mutandis",
    language: "en",
    form: "phrase",
    level: "C2",
    definitions: [
      "With the necessary structural changes or modifications having been made for comparison."
    ],
    examples: [
      "The legal precedent applies mutatis mutandis to digital intellectual property disputes, requiring minor contextual adjustments for internet platforms."
    ],
    domain: "general",
    theme: "academic",
    updated: "2025-01-15",
    transcription: {
      uk: "/mjuːˈtɑː.tɪs mjuːˈtæn.dɪs/",
      us: "/mjuːˈtɑː.t̬ɪs mjuːˈtæn.dɪs/"
    },
    emoji: "🔄",
    synonyms: ["with necessary changes", "adjusting for differences"],
    no_antonym: true
  },
  {
    id: "en:per-se:phrase",
    word: "per se",
    language: "en",
    form: "phrase",
    level: "C2",
    definitions: [
      "By or in itself; intrinsically considered without reference to surrounding context or external factors."
    ],
    examples: [
      "The technological innovation was not problematic per se, but its unregulated deployment created severe privacy concerns among civil rights advocates."
    ],
    domain: "general",
    theme: "academic",
    updated: "2025-01-15",
    transcription: {
      uk: "/pɜː ˈsiː/",
      us: "/pɝː ˈseɪ/"
    },
    emoji: "💎",
    synonyms: ["intrinsically", "in itself", "as such"],
    no_antonym: true
  },
  {
    id: "en:prima-facie:phrase",
    word: "prima facie",
    language: "en",
    form: "phrase",
    level: "C2",
    definitions: [
      "Based on the first impression or initial appearance; accepted as correct until proven otherwise."
    ],
    examples: [
      "The prosecution presented prima facie evidence establishing fraudulent corporate accounting, prompting the judge to order a full forensic audit."
    ],
    domain: "general",
    theme: "academic",
    updated: "2025-01-15",
    transcription: {
      uk: "/ˌpraɪ.mə ˈfeɪ.ʃi/",
      us: "/ˌpraɪ.mə ˈfeɪ.ʃi.i/"
    },
    emoji: "👁️",
    synonyms: ["at first sight", "on the face of it", "self-evident"],
    no_antonym: true
  },
  {
    id: "en:pro-bono:phrase",
    word: "pro bono",
    language: "en",
    form: "phrase",
    level: "C2",
    definitions: [
      "Done or donated without charge for the public good, particularly professional legal or academic work."
    ],
    examples: [
      "Prominent constitutional attorneys agreed to represent the displaced residents pro bono, offering expert legal defense without charging any consultation fees."
    ],
    domain: "general",
    theme: "academic",
    updated: "2025-01-15",
    transcription: {
      uk: "/ˌprəʊ ˈbəʊ.nəʊ/",
      us: "/ˌproʊ ˈboʊ.noʊ/"
    },
    emoji: "🤝",
    synonyms: ["for the public good", "charitable", "gratuitous"],
    no_antonym: true
  },
  {
    id: "en:quid-pro-quo:phrase",
    word: "quid pro quo",
    language: "en",
    form: "phrase",
    level: "C2",
    definitions: [
      "An item, favor, or concession given in direct return for something of equivalent value."
    ],
    examples: [
      "Diplomats negotiated a strategic quid pro quo, exchanging trade tariff concessions for binding commitments on regional nuclear non-proliferation agreements."
    ],
    domain: "general",
    theme: "academic",
    updated: "2025-01-15",
    transcription: {
      uk: "/ˌkwɪd.prəʊˈkwəʊ/",
      us: "/ˌkwɪd.proʊˈkwoʊ/"
    },
    emoji: "🔄",
    synonyms: ["trade-off", "exchange", "reciprocity"],
    no_antonym: true
  },
  {
    id: "en:raison-d-etre:phrase",
    word: "raison d'être",
    language: "en",
    form: "phrase",
    level: "C2",
    definitions: [
      "The core reason or fundamental justification for the existence of a person, institution, or effort."
    ],
    examples: [
      "Safeguarding international monetary stability remains the fundamental raison d'être of the institution according to its founding charter and mandate."
    ],
    domain: "general",
    theme: "academic",
    updated: "2025-01-15",
    transcription: {
      uk: "/ˌreɪ.zɒ̃ ˈdet.rə/",
      us: "/ˌreɪ.zoʊn ˈdet.rə/"
    },
    emoji: "🎯",
    synonyms: ["purpose", "justification", "core rationale"],
    no_antonym: true
  },
  {
    id: "en:status-quo:phrase",
    word: "status quo",
    language: "en",
    form: "phrase",
    level: "C2",
    definitions: [
      "The existing state of political, social, or economic affairs at a given moment."
    ],
    examples: [
      "Conservative political factions campaigned vigorously to defend the status quo against radical legislative proposals introduced by opposition parliamentary leaders."
    ],
    domain: "general",
    theme: "academic",
    updated: "2025-01-15",
    transcription: {
      uk: "/ˌsteɪ.təs ˈkwəʊ/",
      us: "/ˌstæt.əs ˈkwoʊ/"
    },
    emoji: "🛑",
    synonyms: ["current state", "existing condition", "stasis"],
    no_antonym: true
  },
  {
    id: "en:sui-generis:phrase",
    word: "sui generis",
    language: "en",
    form: "phrase",
    level: "C2",
    definitions: [
      "Of its own kind; possessing unique characteristics that prevent classification under standard categories."
    ],
    examples: [
      "Constitutional scholars argued that the treaty created a sui generis legal entity that defied traditional classification under international diplomatic law."
    ],
    domain: "general",
    theme: "academic",
    updated: "2025-01-15",
    transcription: {
      uk: "/ˌsuː.i ˈdʒen.ər.ɪs/",
      us: "/ˌsuː.i ˈdʒen.ɚ.ɪs/"
    },
    emoji: "⭐",
    synonyms: ["unique", "in a class of its own", "unrivaled"],
    no_antonym: true
  }
];

const filteredData = data.filter(e => !removeIdsOrWords.has(e.id));
const updatedData = [...filteredData, ...mergedEntries];

fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2) + '\n', 'utf8');
console.log(`Successfully updated academic_vocabulary.json with 15 consolidated Latin phrase entries.`);
