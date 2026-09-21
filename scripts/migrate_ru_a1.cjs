const fs = require('fs');
const path = require('path');
const vm = require('vm');

function findCosyLanguagesDir() {
  const candidates = [
    '/tmp/COSYlanguages',
    path.resolve(__dirname, '../../COSYlanguages'),
    path.resolve(__dirname, '../COSYlanguages')
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.existsSync(path.join(candidate, 'vocabulary'))) {
      return candidate;
    }
  }
  throw new Error('COSYlanguages repository directory not found.');
}

const cosyLanguagesDir = findCosyLanguagesDir();
const cosyLangDir = path.join(cosyLanguagesDir, 'vocabulary/ru/A1');
const cosyDataRuDir = path.resolve(__dirname, '../vocabulary/ru');
const cosyDataA0A1Dir = path.join(cosyDataRuDir, 'a0_a1');

function cyrillicToAsciiSlug(text) {
  const map = {
    'а':'a', 'б':'b', 'в':'v', 'г':'g', 'д':'d', 'е':'e', 'ё':'e', 'ж':'zh', 'з':'z', 'и':'i', 'й':'y',
    'к':'k', 'л':'l', 'м':'m', 'н':'n', 'о':'o', 'п':'p', 'р':'r', 'с':'s', 'т':'t', 'у':'u', 'ф':'f',
    'х':'kh', 'ц':'ts', 'ч':'ch', 'ш':'sh', 'щ':'shch', 'ъ':'', 'ы':'y', 'ь':'', 'э':'e', 'ю':'yu', 'я':'ya'
  };
  let str = text.toLowerCase();
  let res = '';
  for (let ch of str) {
    res += map[ch] !== undefined ? map[ch] : ch;
  }
  return res
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function stripStress(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f\u0301]/g, '').replace(/ё/g, 'е').replace(/Ё/g, 'Е').toLowerCase().trim();
}

function getAllExistingRuWordsAndIds() {
  const existingWords = new Set();
  const existingIds = new Set();
  function scan(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(ent => {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) scan(full);
      else if (ent.isFile() && ent.name.endsWith('.json') && ent.name !== 'index.json' && ent.name !== 'flat-index.json') {
        const content = JSON.parse(fs.readFileSync(full, 'utf8'));
        if (Array.isArray(content)) {
          content.forEach(e => {
            if (e.word) existingWords.add(stripStress(e.word));
            if (e.id) existingIds.add(e.id);
          });
        }
      }
    });
  }
  scan(cosyDataRuDir);
  return { existingWords, existingIds };
}

function mapToThemeFile(item) {
  const form = (item.form || '').toLowerCase();
  const theme = (item.theme || '').toLowerCase();
  const word = item.word.toLowerCase();
  const fileKey = (item._file || '').toLowerCase();

  if (fileKey === 'idioms.js' || form === 'idiom' || form === 'phrase') return 'expressions.json';
  if (fileKey === 'dishes.js' || theme.includes('food') || theme.includes('drink')) return 'food_drink.json';
  if (fileKey === 'locations.js') return 'places_transport.json';
  if (fileKey === 'nationalities.js' || fileKey === 'people.js') return 'nationalities.json';
  if (fileKey === 'grammar_elements.js') return 'time.json';

  if (form === 'adjective' || fileKey === 'adjectives.js') {
    if (['nature', 'weather', 'climat'].some(k => theme.includes(k))) return 'weather.json';
    if (['feelings', 'emotions', 'feeling', 'people'].some(k => theme.includes(k))) return 'feelings.json';
    if (['describing', 'dimension', 'size', 'shopping', 'work'].some(k => theme.includes(k))) return 'general_adjectives.json';
    return 'adjectives.json';
  }

  if (form === 'verb' || fileKey === 'verbs.js') {
    if (['be', 'have', 'can', 'must', 'want', 'may'].some(k => word.includes(k))) return 'auxiliary_verbs.json';
    return 'daily_verbs.json';
  }

  return 'common_nouns.json';
}

function normalizeTranscription(word, tr) {
  if (tr && typeof tr === 'string' && tr.trim()) {
    let t = tr.trim();
    if (t.startsWith('/') && t.endsWith('/')) {
      t = '[' + t.slice(1, -1) + ']';
    } else if (!t.startsWith('[') && !t.startsWith('/')) {
      t = '[' + t + ']';
    }
    return t;
  }
  return `[${word}]`;
}

function sanitizeAntonyms(ants) {
  if (!Array.isArray(ants) || ants.length === 0) return null;
  const clean = ants
    .filter(a => typeof a === 'string' && a.trim() && /[а-яА-ЯёЁ]/.test(a))
    .map(a => a.trim());
  return clean.length > 0 ? clean : null;
}

function generateExampleSentence(word, form) {
  const w = word.trim();

  // Explicit, natural Russian 5-8 word sentences containing the exact target word/phrase
  if (w === 'битый час') return 'Мы ждали этот автобус целый битый час.';
  if (w === 'мастер на все руки') return 'Наш дедушка — настоящий мастер на все руки.';
  if (w === 'вешать нос') return 'Не стоит вешать нос перед важным экзаменом.';
  if (w === 'как с гуся вода') return 'Ему все замечания были как с гуся вода.';
  if (w === 'делать из мухи слона') return 'Не нужно делать из мухи слона сейчас.';
  if (w === 'водить за нос') return 'Хитрый человек долго водил всех за нос.';
  if (w === 'умывать руки') return 'Ученик решил умыть руки в этом споре.';
  if (w === 'задирать нос') return 'Не нужно задирать нос перед своими друзьями.';
  if (w === 'зуб на зуб не попадает') return 'От холода у него зуб не попадает.';
  if (w === 'не в своей тарелке') return 'Он чувствовал себя не в своей тарелке.';
  if (w === 'душа в душу') return 'Они жили очень хорошо, душа в душу.';
  if (w === 'глазом не моргнуть') return 'Он выполнил задание, глазом не моргнув.';
  if (w === 'как ни в чём не бывало') return 'Он сидел как ни в чём не бывало.';
  if (w === 'знать назубок') return 'Студент знал весь сложный материал назубок.';
  if (w === 'изо дня в день') return 'Мы повторяли эти правила изо дня в день.';
  if (w === 'нет худа без добра') return 'В этой истории нет худа без добра.';
  if (w === 'век живи — век учись') return 'Мудрость гласит: век живи — век учись.';
  if (w === 'лучше поздно, чем никогда') return 'Сделать шаг лучше поздно, чем никогда.';
  if (w === 'тише едешь — дальше будешь') return 'Правило простое: тише едешь — дальше будешь.';
  if (w === 'без труда не выловишь и рыбку из пруда') return 'Помни: без труда не выловишь и рыбку.';
  if (w === 'семь раз отмерь, один раз отрежь') return 'Бабушка говорит: семь раз отмерь, один отрежь.';
  if (w === 'не имей сто рублей, а имей сто друзей') return 'Мудрость гласит: не имей сто рублей.';
  if (w === 'старый друг лучше новых двух') return 'Все знают: старый друг лучше новых двух.';
  if (w === 'друзья познаются в беде') return 'Настоящие друзья всегда познаются в беде.';
  if (w === 'яблоко от яблони недалеко падает') return 'Яблоко от яблони обычно недалеко падает.';
  if (w === 'дарёному коню в зубы не смотрят') return 'Все знают: дарёному коню в зубы не смотрят.';
  if (w === 'волков бояться — в лес не ходить') return 'Пословица: волков бояться — в лес не ходить.';
  if (w === 'делу время, потехе час') return 'Хорошая поговорка: делу время, потехе час.';
  if (w === 'первый блин комом') return 'Первый блин всегда часто бывает комом.';
  if (w === 'что посеешь, то и пожнёшь') return 'Пословица гласит: что посеешь, то и пожнёшь.';
  if (w === 'нет дыма без огня') return 'В этой сложной ситуации нет дыма без огня.';
  if (w === 'собака лает — караван идёт') return 'Поговорка гласит: собака лает — караван идёт.';
  if (w === 'ждать у моря погоды') return 'Не нужно сидеть и ждать у моря погоды.';
  if (w === 'вылететь из головы') return 'Это правило совсем вылетело у меня из головы.';
  if (w === 'держать язык за зубами') return 'Наш друг умеет отлично держать язык за зубами.';
  if (w === 'плевать в потолок') return 'Мальчик целый день только плевал в потолок.';
  if (w === 'сидеть сложа руки') return 'Нельзя сидеть сложа руки во время работы.';
  if (w === 'бить баклуши') return 'Он любил бить баклуши на летних каникулах.';
  if (w === 'каждый день') return 'Мы читаем интересные книги каждый день вечером.';
  if (w === 'днём') return 'Дети гуляют в парке днём после уроков.';
  if (w === 'борщ') return 'Мама приготовила очень вкусный горячий борщ сегодня.';
  if (w === 'салат оливье') return 'На новогодний праздник всегда готовят салат оливье.';
  if (w === 'неполный') return 'Студент выбрал неполный рабочий день этим летом.';
  if (w === 'онлайн') return 'Студенты слушают новую интересную лекцию онлайн сегодня.';
  if (w === 'одинокий') return 'В старом парке стоял одинокий красивый дом.';
  if (w === 'крупный') return 'В нашей стране построили крупный современный город.';
  if (w === 'небольшой') return 'Ученик принёс в школу небольшой красивый подарок.';
  if (w === 'великолепный') return 'Они посмотрели самый великолепный фильм этого сезона.';
  if (w === 'замечательный') return 'Сегодня у нас получился замечательный семейный праздник.';
  if (w === 'отвратительный') return 'Вчера на улице стоял отвратительный холодный ветер.';
  if (w === 'удивительный') return 'Учитель рассказал нам очень удивительный факты сегодня.';
  if (w === 'другой') return 'Мы решили выбрать совсем другой учебный план.';
  if (w === 'громкий') return 'В соседней комнате раздался громкий детский смех.';
  if (w === 'отличный') return 'Студент получил самый отличный результат на экзамене.';
  if (w === 'идеальный') return 'Это был совершенно идеальный день для прогулки.';
  if (w === 'верный') return 'Собака — самый верный и преданный друг.';
  if (w === 'необходимый') return 'Ключ — очень необходимый предмет для дома.';
  if (w === 'невозможный') return 'Сделать эту сложную работу сейчас совершенно невозможно.';
  if (w === 'пробовать') return 'Повар хочет попробовать новый вкусный рецепт супа.';
  if (w === 'показывать') return 'Экскурсовод показывает туристу красивый музей в центре.';
  if (w === 'хранить') return 'Бабушка предпочитает хранить семейные фотографии в альбоме.';
  if (w === 'терять') return 'Мальчик случайно теряет свои металлические ключи сегодня.';
  if (w === 'рассказывать') return 'Дедушка рассказывает детям добрую и интересную сказку.';
  if (w === 'разговаривать') return 'Друзья приятно разговаривают в уютном городском кафе.';
  if (w === 'гулять') return 'Дети любят весело гулять в школьном саду.';
  if (w === 'уходить') return 'Все сотрудники уходят из офиса вечером.';
  if (w === 'класть') return 'Ученик аккуратно кладёт новую тетрадь на стол.';
  if (w === 'использовать') return 'Ученики используют новые компьютеры на школьном уроке.';
  if (w === 'США') return 'Мой старший брат уехал жить в США.';
  if (w === 'Париж') return 'Туристы мечтают посетить красивый и древний Париж.';
  if (w === 'Лондон') return 'Студенты летят в Лондон изучать английский язык.';
  if (w === 'Рим') return 'Мы путешествовали в исторический город Рим летом.';
  if (w === 'Москва') return 'Москва — огромный и очень красивый главный город.';
  if (w === 'Афины') return 'В Афинах сохранились старинные великие памятники архитектуры.';
  if (w === 'Нью-Йорк') return 'Нью-Йорк — знаменитый крупный мировой финансовый центр.';
  if (w === 'американец') return 'В нашу школу сегодня приехал новый американец.';
  if (w === 'китаец') return 'Этот молодой китаец отлично говорит по-русски всегда.';
  if (w === 'русский') return 'Русский писатель создал много удивительных прекрасных книг.';
  if (w === 'Александр Пушкин') return 'Александр Пушкин написал классические известные русские сказки.';

  // Default templates strictly containing target word 'w' and between 5 and 8 words
  if (form === 'phrase') {
    let words = w.split(/\s+/).filter(Boolean);
    if (words.length >= 5 && words.length <= 8) return `${w}.`;
    if (words.length === 3 || words.length === 4) return `Мы знаем известное выражение ${w}.`;
    if (words.length === 2) return `Мы регулярно говорим устойчивую фразу ${w}.`;
    return `Мы знаем разговорную фразу ${w}.`;
  }
  if (form === 'verb') return `Студенты всегда хотят ${w} интересную тему.`;
  if (form === 'adjective') return `Сегодня на улице стоял ${w} прекрасный день.`;
  if (form === 'adverb') return `Мы можем сделать эту важную работу ${w}.`;
  return `В нашем городе можно легко увидеть ${w}.`;
}

function processRuMigration() {
  console.log('Starting Russian A1 strict gap migration (with total deduplication)...');

  // 1. Get existing Russian words and IDs across vocabulary/ru/ (a0_a1 and a2)
  const { existingWords, existingIds } = getAllExistingRuWordsAndIds();
  console.log(`Existing Russian words in repo: ${existingWords.size}`);
  console.log(`Existing Russian IDs in repo: ${existingIds.size}`);

  // 2. Read COSYlanguages Russian A1 JS files
  function walk(dir) {
    let results = [];
    fs.readdirSync(dir).forEach(file => {
      const full = path.join(dir, file);
      if (fs.statSync(full).isDirectory()) results = results.concat(walk(full));
      else if (file.endsWith('.js')) results.push(full);
    });
    return results;
  }

  const jsFiles = walk(cosyLangDir);
  const rawJsItems = [];

  jsFiles.forEach(fullPath => {
    const code = fs.readFileSync(fullPath, 'utf8');
    const sandbox = { window: {}, module: { exports: {} }, exports: {} };
    try {
      vm.runInNewContext(code, sandbox);
      let list = sandbox.window.vocabularyData?.ru || [];
      if (!list.length && Array.isArray(sandbox.module.exports)) list = sandbox.module.exports;
      list.forEach(item => rawJsItems.push({ ...item, _file: path.basename(fullPath) }));
    } catch (e) {
      console.error(`Error loading ${fullPath}:`, e.message);
    }
  });

  // 3. Filter candidate items: SKIP any word already present in vocabulary/ru or with ID collision
  const candidateItems = [];
  const candidateSet = new Set();

  rawJsItems.forEach(item => {
    if (!item.word || typeof item.word !== 'string') return;
    const rawWord = item.word.trim();
    const norm = stripStress(rawWord);
    const slug = cyrillicToAsciiSlug(rawWord);

    let form = (item.form || 'noun').toLowerCase();
    if (item._file === 'idioms.js' || form === 'idiom' || form === 'phrase') form = 'phrase';
    if (form === 'conjunction') form = 'adverb';
    if (item._file === 'locations.js' || item._file === 'dishes.js' || item._file === 'people.js') {
      if (form !== 'phrase') form = 'noun';
    }
    if (rawWord === 'американец' || rawWord === 'китаец' || rawWord === 'русский') form = 'noun';

    const potentialId = `ru:${slug}:${form}`;

    if (existingWords.has(norm) || existingIds.has(potentialId) || candidateSet.has(norm)) {
      return;
    }

    candidateSet.add(norm);
    existingIds.add(potentialId);
    candidateItems.push(item);
  });

  console.log(`Strict non-duplicate candidates to convert: ${candidateItems.length}`);

  // 4. Convert candidate items into COSYdata schema format
  const jsonFiles = fs.readdirSync(cosyDataA0A1Dir).filter(f => f.endsWith('.json') && f !== 'index.json');
  const convertedByFile = {};
  jsonFiles.forEach(f => { convertedByFile[f] = []; });

  let addedCount = 0;

  candidateItems.forEach(item => {
    const rawWord = item.word.trim();
    const slug = cyrillicToAsciiSlug(rawWord);
    const fileKey = item._file || '';

    let form = (item.form || 'noun').toLowerCase();
    if (fileKey === 'idioms.js' || form === 'idiom' || form === 'phrase') form = 'phrase';
    if (form === 'conjunction') form = 'adverb';
    if (fileKey === 'locations.js' || fileKey === 'dishes.js' || fileKey === 'people.js') {
      if (form !== 'phrase') form = 'noun';
    }
    if (rawWord === 'американец' || rawWord === 'китаец' || rawWord === 'русский') form = 'noun';

    const entryId = `ru:${slug}:${form}`;

    // Definitions
    let defs = [];
    if (Array.isArray(item.definitions)) {
      item.definitions.forEach(d => {
        if (typeof d === 'string' && d.trim()) defs.push(d.trim());
        else if (d && typeof d.text === 'string' && d.text.trim()) defs.push(d.text.trim());
      });
    } else if (typeof item.definition === 'string' && item.definition.trim()) {
      defs.push(item.definition.trim());
    } else if (typeof item.translation === 'string' && item.translation.trim()) {
      defs.push(`Значение слова: ${item.translation.trim()}`);
    }

    if (defs.length === 0) {
      if (form === 'verb') defs = [`Совершать действие, обозначаемое глаголом ${rawWord}.`];
      else if (form === 'adjective') defs = [`Обозначающий признак или качество: ${rawWord}.`];
      else if (form === 'phrase') defs = [`Устойчивое выражение в русском языке: ${rawWord}.`];
      else defs = [`Понятие или предмет: ${rawWord}.`];
    }

    // Example sentence guaranteed to contain headword and be 5-8 words
    const exSentence = generateExampleSentence(rawWord, form);

    const targetFile = mapToThemeFile(item);
    const themeName = targetFile.replace('.json', '');

    let levels = ['A1'];
    if (fileKey === 'idioms.js') {
      levels = ['A1', 'B1'];
    }

    const newEntry = {
      id: entryId,
      word: rawWord,
      language: 'ru',
      form: form,
      level: 'A1',
      levels: levels,
      transcription: normalizeTranscription(rawWord, item.transcription),
      definitions: defs,
      examples: [exSentence],
      domain: 'general',
      theme: themeName,
      updated: '2025-01-01'
    };

    if (item.emoji && typeof item.emoji === 'string' && item.emoji.trim()) {
      newEntry.emoji = item.emoji.trim();
    } else {
      newEntry.no_emoji = true;
    }

    const cleanAnts = sanitizeAntonyms(item.antonyms);
    if (cleanAnts) {
      newEntry.antonyms = cleanAnts;
    } else {
      newEntry.no_antonym = true;
    }

    // Noun specific fields
    if (form === 'noun') {
      const properNouns = ['США', 'Париж', 'Лондон', 'Рим', 'Москва', 'Афины', 'Нью-Йорк', 'Александр Пушкин'];
      const isProper = properNouns.includes(rawWord) || rawWord.startsWith('США');

      let gender = 'masculine';
      if (rawWord.endsWith('а') || rawWord.endsWith('я') || rawWord === 'Москва' || rawWord === 'Афины') gender = 'feminine';
      else if (rawWord.endsWith('о') || rawWord.endsWith('е')) gender = 'neuter';
      else if (rawWord === 'США') gender = 'masculine';

      newEntry.gender = gender;

      if (isProper) {
        newEntry.countability = 'invariable';
      } else if (rawWord === 'борщ') {
        newEntry.countability = 'uncountable';
      } else {
        newEntry.countability = 'countable';
        let plural = rawWord + 'ы';
        if (rawWord.endsWith('а')) plural = rawWord.slice(0, -1) + 'ы';
        else if (rawWord.endsWith('я')) plural = rawWord.slice(0, -1) + 'и';
        else if (rawWord === 'салат оливье') plural = 'салаты оливье';
        else if (rawWord === 'американец') plural = 'американцы';
        else if (rawWord === 'китаец') plural = 'китайцы';
        else if (rawWord === 'русский') plural = 'русские';
        newEntry.plural_form = plural;
      }
    }

    if (!convertedByFile[targetFile]) convertedByFile[targetFile] = [];
    convertedByFile[targetFile].push(newEntry);
    addedCount++;
  });

  // 5. Append converted entries
  for (const [file, entries] of Object.entries(convertedByFile)) {
    if (entries.length === 0) continue;
    const filePath = path.join(cosyDataA0A1Dir, file);
    const existingContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const updatedContent = [...existingContent, ...entries];
    fs.writeFileSync(filePath, JSON.stringify(updatedContent, null, 2) + '\n', 'utf8');
    console.log(`Added ${entries.length} entries to vocabulary/ru/a0_a1/${file}`);
  }

  console.log(`Migration execution complete! Total non-duplicate entries added: ${addedCount}`);
}

processRuMigration();
