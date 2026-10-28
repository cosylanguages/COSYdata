/**
 * COSYdata Ecosystem Type Definitions
 * TypeScript interfaces and declarations for data models and client API wrappers.
 */

export type CEFRLevel = 'A0' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type LanguageCode =
  | 'en' | 'fr' | 'it' | 'de' | 'ru' | 'el' | 'es' | 'pt'
  | 'br' | 'cv' | 'hy' | 'ka' | 'ba' | 'tt';

export type GrammaticalForm =
  | 'noun' | 'verb' | 'adjective' | 'adverb' | 'pronoun' | 'preposition'
  | 'postposition' | 'conjunction' | 'interjection' | 'phrase' | 'number'
  | 'determiner' | 'article' | 'particle' | 'phrasal_verb' | 'idiom'
  | 'expression' | 'prefix' | 'suffix';

export type Countability = 'countable' | 'uncountable' | 'pluralia_tantum' | 'invariable';

export type Gender = 'masculine' | 'feminine' | 'neuter';

export type Register = 'formal' | 'neutral' | 'informal';

/**
 * Vocabulary Entry Model
 */
export interface VocabEntry {
  id: string;
  language: LanguageCode;
  word: string;
  form: GrammaticalForm;
  level: CEFRLevel;
  theme: string;
  sub_theme?: string;
  secondary_themes?: string[];
  domain?: string;
  transcription?: string;
  transcription_variants?: Record<string, string>;
  emoji?: string;
  definitions?: string[];
  examples?: string[];
  synonyms?: string[];
  antonyms?: string[];
  see_also?: string[];
  concept?: string;
  translation_of?: string;
  gender?: Gender;
  article?: string;
  countability?: Countability;
  plural_form?: string;
  partitive?: string;
  register?: Register;
  scenario?: string;
  exam_board?: string;
  exam_level?: string;
  transliteration?: string;
  related_forms?: string[];
  status?: 'published' | 'needs_review' | 'deprecated';
}

/**
 * Functional Phrase Model
 */
export interface FunctionalPhrase {
  id: string;
  language: LanguageCode;
  phrase: string;
  level: CEFRLevel;
  domain: string;
  situation: string;
  pragmatic_function: string;
  literal_translation?: string;
  natural_translation: string;
  cultural_note?: string;
  register?: Register;
  audio?: string;
  tags?: string[];
}

/**
 * Lesson Model
 */
export interface Lesson {
  id: string;
  course_id: string;
  unit_id: string;
  title: string;
  description: string;
  level: CEFRLevel;
  language: LanguageCode;
  target_vocabulary?: string[];
  functional_phrases?: string[];
  links?: {
    grammar?: Array<{ topic_id: string; manual_url: string }>;
    communication?: Array<{ phrase_id: string; manual_url: string }>;
  };
}

/**
 * Curriculum Competency Model
 */
export interface CurriculumCompetency {
  id: string;
  level: CEFRLevel;
  domain: string;
  subdomain: string;
  can_do_statement: string;
  descriptor_code: string;
  communicative_activities: string[];
}

/**
 * Daily Learning Entry Model
 */
export interface DailyEntry {
  id: string;
  language: LanguageCode;
  category: 'speaking' | 'writing' | 'idioms' | 'facts';
  title: string;
  content: string;
  translation?: string;
  example?: string;
  level?: CEFRLevel;
}

/**
 * Personal Saved Dictionary Item
 */
export interface DictionaryItem {
  id: string;
  word: string;
  addedAt: number;
  entry?: VocabEntry;
}

/**
 * Personal Dictionary Manager Interface
 */
export interface PersonalDictionary {
  list(): DictionaryItem[];
  has(id: string): boolean;
  add(entryOrId: VocabEntry | string): void;
  remove(id: string): void;
  exportJson(): string;
  importJson(jsonString: string | unknown): boolean;
  onChange(callback: (items: DictionaryItem[]) => void): () => void;
}

/**
 * resolveVocab Client Options
 */
export interface ResolveVocabOptions {
  baseUrl?: string;
  ttlMs?: number;
  fallback?: unknown;
  onError?: (err: Error) => void;
}

/**
 * Dictionary UI Options
 */
export interface DictionaryUIOptions {
  lang?: LanguageCode;
  baseUrl?: string;
}

/**
 * AutoDetect Options
 */
export interface AutoDetectOptions {
  lang?: LanguageCode;
  matchWord?: (word: string, lang?: string) => VocabEntry | VocabEntry[] | { id: string } | string | null | undefined;
}

/**
 * Popup Handler Options
 */
export interface PopupHandlerOptions {
  resolveEntry: (ref: string) => Promise<VocabEntry | null>;
  dictionary?: PersonalDictionary;
  onSuggestUrl?: string | ((entry: VocabEntry) => string);
}

/**
 * Hydrate Options
 */
export interface HydrateOptions extends AutoDetectOptions, PopupHandlerOptions {}
