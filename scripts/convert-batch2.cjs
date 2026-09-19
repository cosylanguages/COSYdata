const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Safe parsing of fetched JS IIFE data without eval()
function parseIIFEData(text) {
  const match = text.match(/const data = (\[[\s\S]*?\]);\s*(?:if|window|\}\)\(\))/);
  if (!match) {
    throw new Error('Failed to locate data array in IIFE text');
  }
  const sandbox = {};
  const code = `data = ${match[1]};`;
  vm.runInNewContext(code, sandbox);
  return sandbox.data;
}

// Cyrillic & accented transliteration helper to ASCII slug
function transliterate(text) {
  const map = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'ғ': 'g', 'д': 'd', 'ҙ': 'zh', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'ҡ': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'ң': 'ng', 'о': 'o',
    'ө': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'ҫ': 's', 'т': 't', 'у': 'u', 'ү': 'u', 'ф': 'f', 'х': 'kh',
    'һ': 'h', 'ц': 'ts', 'ч': 'ch', 'ç': 's', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e',
    'ә': 'a', 'ю': 'yu', 'я': 'ya', 'ĕ': 'e', 'ă': 'a', 'ӳ': 'u', 'ÿ': 'u'
  };

  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .split('')
    .map(ch => map[ch] !== undefined ? map[ch] : ch)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Breton noun articles & gender
const brArticles = {
  "liorzh": "al", "medisin": "ar", "troad": "an", "kelennour": "ar", "kelenner": "ar", "piza": "ar", "pizza": "ar", "pasta": "ar",
  "aval": "an", "bara": "ar", "ui": "an", "vi": "an", "laezh": "al", "bananez": "ar", "banana": "ar", "kafe": "ar",
  "te": "an", "dour": "an", "skol": "an", "krez": "ar", "bragoù": "ar", "botez": "ar",
  "tok": "an", "tog": "an", "kador": "ar", "taol": "an", "gwele": "ar", "alc'hwez": "an", "pellgomz": "ar",
  "levr": "al", "sac'h": "ar", "stilo": "ar", "kazh": "ar", "ki": "ar", "dorn": "an",
  "gar": "ar", "lagad": "an", "fri": "an", "genou": "ar", "skouarn": "ar", "mamm": "ar",
  "tad": "an", "labour": "an", "ti": "an", "karr": "ar", "karr-boutin": "ar", "bus": "ar", "tren": "ar",
  "arc'hant": "an", "stal": "ar", "familh": "ar", "mignon": "ar", "deiz": "an", "sizhun": "ar",
  "boued": "ar", "lein": "al", "merenn": "ar", "koan": "ar", "beure": "ar", "mintin": "ar", "abardaez": "an",
  "noz": "an", "teñvalijenn": "an", "an deiz-mañ": "an", "c'hoazh": "ar", "gwaz": "ar", "gwreg": "ar", "bugel": "ar",
  "heol": "an", "glav": "ar", "t-shirt": "an", "gêr": "ar"
};

const brGenders = {
  "liorzh": "masculine", "medisin": "masculine", "troad": "masculine", "kelennour": "masculine", "kelenner": "masculine", "piza": "feminine", "pizza": "feminine", "pasta": "masculine",
  "aval": "masculine", "bara": "masculine", "ui": "masculine", "vi": "masculine", "laezh": "masculine", "bananez": "feminine", "banana": "feminine", "kafe": "masculine",
  "te": "masculine", "dour": "masculine", "skol": "feminine", "krez": "masculine", "bragoù": "masculine", "botez": "feminine",
  "tok": "masculine", "tog": "masculine", "kador": "feminine", "taol": "feminine", "gwele": "masculine", "alc'hwez": "masculine", "pellgomz": "masculine",
  "levr": "masculine", "sac'h": "masculine", "stilo": "masculine", "kazh": "masculine", "ki": "masculine", "dorn": "masculine",
  "gar": "feminine", "lagad": "masculine", "fri": "masculine", "genou": "masculine", "skouarn": "feminine", "mamm": "feminine",
  "tad": "masculine", "labour": "masculine", "ti": "masculine", "karr": "masculine", "karr-boutin": "masculine", "bus": "masculine", "tren": "masculine",
  "arc'hant": "masculine", "stal": "feminine", "familh": "feminine", "mignon": "masculine", "deiz": "masculine", "sizhun": "feminine",
  "boued": "masculine", "lein": "feminine", "merenn": "feminine", "koan": "feminine", "beure": "masculine", "mintin": "masculine", "abardaez": "masculine",
  "noz": "feminine", "teñvalijenn": "feminine", "an deiz-mañ": "masculine", "c'hoazh": "masculine", "gwaz": "masculine", "gwreg": "feminine", "bugel": "masculine",
  "heol": "masculine", "glav": "masculine", "t-shirt": "feminine", "gêr": "feminine"
};

// Plurals dictionary
const plurals = {
  ba: {
    "баҡса": "баҡсалар", "врач": "врачтар", "аяҡ": "аяҡтар", "уҡытыусы": "уҡытыусылар", "пицца": "пиццалар", "салбар": "салбарҙар",
    "паста": "пасталар", "алма": "алмалар", "икмәк": "икмәкләр", "йомырҡа": "йомырҡалар", "йомортҡа": "йомортҡалар", "банан": "банандар",
    "кофе": "кофелар", "сәй": "сәйҙәр", "мәктәп": "мәктәптәр", "футболка": "футболкалар", "бышҡа": "бышҡалар",
    "аяҡ киеме": "аяҡ киемдәре", "баш кейеме": "баш кейемдәре", "олтырғыс": "олтырғыстар", "асҡыс": "асҡыстар", "беше": "бешеләр",
    "борон": "борондар", "ауыҙ": "ауыҙҙар", "ҡолаҡ": "ҡолаҡтар", "кибет": "кибеттәр", "аҙна": "аҙналар",
    "иртәнге аш": "иртәнге аштар", "төшке аш": "төшке аштар", "киске аш": "киске аштар", "ир": "иртәр",
    "эш": "эштәр", "өй": "өйҙәр", "машина": "машиналар", "автобус": "автобустар",
    "поезд": "поездар", "магазин": "магазиндар", "ғаилә": "ғаиләләр", "дуҫ": "дуҫтар", "көн": "көндәр",
    "он": "ондар", "иртә": "иртәләр", "кис": "кистәр", "төн": "төндәр", "байрам": "байрамдар",
    "күҙ": "күҙҙәр", "ҡолоҡ": "ҡолоҡтар", "ҡул": "ҡулдар", "баш": "баштар",
    "әсәй": "әсәйҙәр", "атай": "атайҙар", "иш": "иштәр", "ҡатын": "ҡатындар", "бала": "балалар",
    "бесәй": "бесәйҙәр", "эт": "эттәр", "өҫтәл": "өҫтәлдәр", "стул": "стулдар", "карауат": "карауаттар",
    "телефон": "телефондар", "китап": "китаптар", "сумка": "сумкалар", "ручка": "ручкалар"
  },
  br: {
    "liorzh": "liorzhoù", "medisin": "medisined", "troad": "treid", "kelennour": "kelennourien", "kelenner": "kelennerien", "piza": "pizaoù", "pizza": "pizaoù",
    "pasta": "pastaoù", "aval": "avaloù", "bara": "baraoù", "ui": "uioù", "vi": "uioù", "bananez": "bananez", "banana": "bananez",
    "kafe": "kafeoù", "te": "teoù", "skol": "skolioù", "krez": "krezoù", "bragoù": "bragoù",
    "botez": "botoù", "tok": "tokoù", "tog": "tokoù", "kador": "kadorioù", "taol": "taolioù", "gwele": "gweleoù",
    "alc'hwez": "alc'hwezioù", "pellgomz": "pellgomzoù", "levr": "levrioù", "sac'h": "seier", "stilo": "stiloioù",
    "kazh": "kazhed", "ki": "chas", "dorn": "daouarn", "gar": "divesker", "lagad": "daoulagad",
    "fri": "frioù", "genou": "genoù", "skouarn": "skouarnioù", "mamm": "mammoù", "tad": "tadoù",
    "labour": "labourioù", "ti": "tier", "karr": "kirri", "karr-boutin": "kirri-boutin", "bus": "busoù", "tren": "trenioù",
    "stal": "stalioù", "familh": "familhoù", "mignon": "mignoned", "deiz": "deizioù", "sizhun": "sizhunioù",
    "boued": "bouedoù", "lein": "leinioù", "merenn": "merennoù", "koan": "koanioù", "beure": "beureoù", "mintin": "mintinioù",
    "abardaez": "abardaezioù", "noz": "nozioù", "teñvalijenn": "teñvalijennoù", "gwaz": "gwazed", "gwreg": "gwraged", "bugel": "bugale",
    "t-shirt": "t-shirts", "gêr": "kêrioù"
  },
  cv: {
    "ят": "ятсем", "пĕрре": "пĕрресем", "вуннă": "вуннăсем", "çĕр": "çĕрсем", "панулми": "панулмисем",
    "хăяр": "хăярсем", "помидор": "помидорсем", "пахча": "пахчасем", "йывăç": "йывăçсем", "чечек": "чечексем",
    "вăрман": "вăрмансем", "пĕлĕт": "пĕлĕтсем", "уйăх": "уйăхсем", "çăлтăр": "çăлтăрсем", "кун": "кунсем",
    "каç": "каçсем", "ир": "ирсем", "çулталăк": "çулталăксем", "эрне": "эрнесем", "çемье": "çемьесем",
    "анне": "аннесем", "атте": "аттесем", "пичче": "пиччесем", "аппа": "аппасем", "асатте": "асаттесем",
    "асанне": "асаннесем", "çурт": "çуртсем", "пĕлĕм": "пĕлĕмсем", "сĕтел": "сĕтелсем", "покан": "покансем",
    "диван": "дивансем", "кăмака": "кăмакасем", "алăк": "алăксем", "чӳрече": "чӳречесем", "кĕнеке": "кĕнекесем",
    "тедрать": "тедратьсем", "ручка": "ручкасем", "карандаш": "карандашсем", "шкул": "шкулсем", "партă": "партăсем",
    "класс": "класссем", "урок": "уроксем", "кĕпе": "кĕпесем", "йĕм": "йĕмсем", "шапка": "шапкасем",
    "çăпата": "çăпатасем", "тăла": "тăласем", "атă": "атăсем", "алшалли": "алшаллисем", "пуç": "пуçсем",
    "алă": "алăсем", "ура": "урасем", "куç": "куçсем", "хăлха": "хăлхасем", "çăвар": "çăварсем",
    "шăл": "шăлсем", "чĕлхе": "чĕлхесем", "кушак": "кушаксем", "йытă": "йытăсем", "ĕне": "ĕнесем",
    "лаша": "лашасем", "сурăх": "сурăхсем", "кайăк": "кайăксем", "пулă": "пулăсем", "машина": "машинасем",
    "поезд": "поездсем", "автобус": "автобуссем", "велосипед": "велосипедсем", "çул": "çулсем", "урам": "урамсем",
    "хула": "хуласем", "ял": "ялсем", "базар": "базарсем", "лавкка": "лавккасем", "ĕç": "ĕçсем",
    "уяв": "уявсем", "юрă": "юрăсем", "ташă": "ташăсем", "сăмах": "сăмахсем", "юмах": "юмахсем",
    "хисеп": "хисепсем", "салам": "саламсем", "яшка": "яшкасем", "çăмарта": "çăмартасем", "стакан": "стакансем",
    "чашăк": "чашăксем", "çĕççĕ": "çĕççĕсем", "кашăк": "кашăксем", "сумка": "сумкасем", "юханшыв": "юханшывсем",
    "кӳлĕ": "кӳлĕсем", "парк": "парксем", "япрах": "япрахсем", "пӳлĕм": "пӳлĕмсем", "вăрманлăх": "вăрманлăхсем",
    "улма": "улмасем", "çырла": "çырласем", "кăмпа": "кăмпасем", "пасар": "пасарсем", "хыпар": "хыпарсем",
    "буквă": "буквăсем", "уçăлав": "уçăлавсем", "кашта": "каштасем", "кукаçи": "кукаçисем", "кукамай": "кукамайсем",
    "шăллă": "шăллăсем"
  }
};

// IPA transcription dictionary
const transcriptions = {
  ba: {
    "баҡса": "/baqˈsa/", "врач": "/vratʃ/", "аяҡ": "/aˈjaq/", "уҡытыусы": "/uqɯtɯwˈsɯ/",
    "пицца": "/ˈpitsa/", "паста": "/ˈpasta/", "алма": "/alˈma/", "икмәк": "/ikˈmæk/",
    "йомырҡа": "/jomɯrˈqa/", "йомортҡа": "/jomɯrˈqa/", "hөт": "/høt/", "һөт": "/høt/", "банан": "/baˈnan/", "кофе": "/ˈkofe/", "салбар": "/salˈbar/",
    "сәй": "/sæj/", "һыу": "/hɯw/", "мәктәп": "/mækˈtæp/", "футболка": "/futˈbolka/",
    "бышҡа": "/bɯʃˈqa/", "аяҡ киеме": "/aˈjaq kejeˈme/", "баш кейеме": "/baʃ kejeˈme/", "эш": "/eʃ/", "өй": "/øy/",
    "машина": "/maˈʃina/", "автобус": "/avˈtobus/", "поезд": "/poˈjazd/", "аҡса": "/aqˈsa/",
    "магазин": "/magaˈzin/", "кибет": "/kiˈbet/", "ғаилә": "/ʁa.iˈlæ/", "дуҫ": "/duθ/", "көн": "/køn/",
    "он": "/on/", "иртә": "/irˈtæ/", "кис": "/kis/", "төн": "/tøn/",
    "байрам": "/bajˈram/", "күҙ": "/kyθ/", "ҡолоҡ": "/qoˈluq/", "ауыз": "/aˈwɯθ/",
    "ҡул": "/qul/", "баш": "/baʃ/", "әсәй": "/æˈsæj/", "атай": "/aˈtaj/",
    "иш": "/iʃ/", "ҡатын": "/qaˈtɯn/", "бала": "/baˈla/", "бесәй": "/beˈsæj/",
    "эт": "/et/", "өҫтәл": "/øθˈtæl/", "стул": "/stul/", "карауат": "/karaˈwat/",
    "ачҡыс": "/atʃˈqɯs/", "асҡыс": "/asˈqɯs/", "телефон": "/teleˈfon/", "китап": "/kiˈtap/", "сумка": "/sumˈka/",
    "ручка": "/rutʃˈka/", "көнбағыш": "/kønbaˈʁɯʃ/", "ҡош": "/qoʃ/", "балыҡ": "/baˈlɯq/",
    "ҡоеш": "/qoˈjeʃ/", "яңғыр": "/jamˈʁɯr/", "олтырғыс": "/oltɯrˈʁɯs/", "беше": "/beˈʃe/",
    "борон": "/boˈron/", "ауыҙ": "/aˈwɯθ/", "ҡолаҡ": "/qoˈlaq/", "аҙна": "/aðˈna/",
    "аҙыҡ": "/aˈðɯq/", "иртәнге аш": "/irˈtænɡe aʃ/", "төшке аш": "/tøʃˈke aʃ/", "киске аш": "/kisˈke aʃ/",
    "бөгөн": "/bøˈɡøn/", "иртәгә": "/irˈtæɡæ/", "ир": "/ir/", "ҡояш": "/qoˈjaʃ/"
  },
  br: {
    "liorzh": "/ˈljɔrs/", "medisin": "/meˈdiːzin/", "troad": "/ˈtroːat/", "kelennour": "/keˈlɛnːur/", "kelenner": "/keˈlɛnːer/",
    "piza": "/ˈpiːza/", "pizza": "/ˈpiːza/", "pasta": "/ˈpasta/", "aval": "/ˈaːval/", "bara": "/ˈbaːra/",
    "ui": "/ˈyːi/", "vi": "/ˈyːi/", "laezh": "/lɛːs/", "bananez": "/baˈnãːnes/", "banana": "/baˈnãːna/", "kafe": "/ˈkaːfe/",
    "te": "/teː/", "dour": "/duːr/", "skol": "/skoːl/", "krez": "/kreːs/",
    "bragoù": "/ˈbraːɡu/", "botez": "/ˈboːtes/", "tok": "/tok/", "tog": "/tok/", "kador": "/ˈkaːdor/",
    "taol": "/taol/", "gwele": "/ˈɡweːle/", "alc'hwez": "/alˈxweːs/", "pellgomz": "/pɛlˈɡõms/",
    "levr": "/leːvr/", "sac'h": "/sax/", "stilo": "/ˈstiːlo/", "kazh": "/kaːs/",
    "ki": "/kiː/", "dorn": "/dɔrn/", "gar": "/ɡaːr/", "lagad": "/ˈlaːɡat/",
    "fri": "/friː/", "genou": "/ˈɡeːnu/", "skouarn": "/ˈskwarːn/", "mamm": "/mamː/",
    "tad": "/taːt/", "labour": "/ˈlaːbur/", "ti": "/tiː/", "karr": "/karː/", "karr-boutin": "/kar ˈbuːtẽn/",
    "bus": "/bys/", "tren": "/trɛn/", "arc'hant": "/arˈxãnt/", "stal": "/staːl/",
    "familh": "/faˈmiːl/", "mignon": "/ˈmiɲon/", "deiz": "/deis/", "sizhun": "/ˈsiːzyn/",
    "boued": "/bweːt/", "lein": "/lɛ̃jn/", "merenn": "/ˈmeːrɛnː/", "koan": "/kwãːn/",
    "beure": "/ˈbøːre/", "mintin": "/ˈmĩntin/", "abardaez": "/abarˈdɛːs/", "noz": "/noːs/", "teñvalijenn": "/tẽnvaˈliːʒɛnː/",
    "an deiz-mañ": "/an deis mɑ̃/", "hiziv": "/ˈhiːziv/", "warc'hoazh": "/varˈxwaːs/",
    "c'hoazh": "/xwaːs/", "gwaz": "/gwaːs/", "gwreg": "/ɡwrɛk/", "bugel": "/ˈbyːɡel/",
    "heol": "/heːul/", "glav": "/ɡlaːv/", "t-shirt": "/tiːʃœɾt/", "gêr": "/ɡeːr/"
  },
  cv: {
    "çăкăр": "/səˈkər/", "шыв": "/ʃɯv/", "сĕт": "/sət/", "чей": "/tʃej/", "ят": "/jat/", "пĕрре": "/pərˈre/",
    "вуннă": "/vunˈnə/", "çĕр": "/sər/", "панулми": "/panulˈmi/", "çĕр улми": "/sər ulˈmi/",
    "хăяр": "/xəˈjar/", "помидор": "/pomiˈdor/", "пахча": "/paxˈtʃa/", "йывăç": "/jɯˈvətʃ/",
    "чечек": "/tʃeˈtʃek/", "курăк": "/kuˈrək/", "вăрман": "/vərˈman/", "пĕлĕт": "/pəˈlət/",
    "хĕвел": "/xəˈvel/", "уйăх": "/uˈjəx/", "çăлтăр": "/səlˈtər/", "çумăр": "/suˈmər/",
    "юр": "/jur/", "çил": "/sil/", "кун": "/kun/", "каç": "/kas/", "ир": "/ir/",
    "кăнтăр": "/kənˈtər/", "çулталăк": "/sultaˈlək/", "эрне": "/erˈne/", "çемье": "/semˈje/",
    "анне": "/anˈne/", "атте": "/atˈte/", "пичче": "/pitʃˈtʃe/", "аппа": "/apˈpa/",
    "асатте": "/asatˈte/", "асанне": "/asanˈne/", "çурт": "/surt/", "пĕлĕм": "/pəˈləm/",
    "сĕтел": "/səˈtel/", "покан": "/poˈkan/", "диван": "/diˈvan/", "кăмака": "/kəmaˈka/",
    "алăк": "/aˈlək/", "чӳрече": "/tʃyredˈtʃe/", "кĕнеке": "/kəneˈke/", "тедрать": "/tedˈrat/",
    "ручка": "/rutʃˈka/", "карандаш": "/karanˈdaʃ/", "шкул": "/ʃkul/", "партă": "/parˈtə/",
    "класс": "/klas/", "урок": "/uˈrok/", "тумтир": "/tumˈtir/", "кĕпе": "/kəˈpe/",
    "йĕм": "/jəm/", "шапка": "/ʃapˈka/", "çăпата": "/səpaˈta/", "тăла": "/təˈla/",
    "атă": "/aˈtə/", "алшалли": "/alʃalˈli/", "пуç": "/pus/", "алă": "/aˈlə/",
    "ура": "/uˈra/", "куç": "/kus/", "хăлха": "/xəlˈxa/", "çăвар": "/səˈvar/",
    "шăл": "/ʃəl/", "чĕлхе": "/tʃəlˈxe/", "кушак": "/kuˈʃak/", "йытă": "/jɯˈtə/",
    "ĕне": "/əˈne/", "лаша": "/laˈʃa/", "сурăх": "/suˈrək/", "кайăк": "/kaˈjək/",
    "пулă": "/puˈlə/", "машина": "/maˈʃina/", "поезд": "/poˈjest/", "автобус": "/avˈtobus/",
    "велосипед": "/velosiˈpet/", "çул": "/sul/", "урам": "/uˈram/", "хула": "/xuˈla/",
    "ял": "/jal/", "базар": "/baˈzar/", "лавкка": "/lavkˈka/", "укçа": "/ukˈsa/",
    "ĕç": "/əs/", "уяв": "/uˈjav/", "юрă": "/juˈrə/", "ташă": "/taˈʃə/",
    "сăмах": "/səˈmax/", "юмах": "/juˈmax/", "хисеп": "/xiˈsep/", "çанталăк": "/santaˈlək/",
    "сывлăш": "/sɯvˈləʃ/", "салам": "/saˈlam/", "яшка": "/jaʃˈka/", "çăмарта": "/səmarˈta/",
    "çу": "/su/", "пăр": "/pər/", "сахар": "/saˈxar/", "тăвар": "/təˈvar/",
    "стакан": "/staˈkan/", "чашăк": "/tʃaˈʃək/", "çĕççĕ": "/sətʃˈtʃə/", "кашăк": "/kaˈʃək/",
    "сумка": "/sumˈka/", "юханшыв": "/juxanˈʃɯv/", "кӳлĕ": "/kyˈlə/", "парк": "/park/",
    "вакăр": "/vaˈkər/", "япрах": "/japˈrax/", "кăмăл": "/kəˈməl/", "пӳлĕм": "/pyˈləm/",
    "вăрманлăх": "/vərmanˈlək/", "какай": "/kaˈkaj/", "улма": "/ulˈma/", "çырла": "/sɯrˈla/",
    "кăмпа": "/kəmˈpa/", "аш": "/aʃ/", "пасар": "/paˈzar/", "çăм": "/səm/",
    "кану": "/kaˈnu/", "сывлăх": "/sɯvˈlək/", "хыпар": "/xɯˈpar/", "буквă": "/bukˈvə/",
    "уçăлав": "/usəˈlav/", "кашта": "/kaʃˈta/", "кукаçи": "/kukaˈsi/", "кукамай": "/kukaˈmaj/",
    "шăллă": "/ʃəlˈlə/"
  }
};

// Target theme mapping
function getTargetTheme(item) {
  const t = item.theme;
  const w = item.word.toLowerCase();

  if (t === "food_drink") return "food_drink.json";
  if (t === "clothes") return "clothes.json";
  if (t === "animals") return "animals.json";
  if (t === "body" || t === "health_medicine") return "body_health.json";
  if (t === "jobs" || t === "work") return "jobs.json";
  if (t === "time") return "time.json";
  if (t === "school") return "school.json";
  if (t === "social") return "expressions.json";
  if (t === "travel") return "places_transport.json";
  if (t.startsWith("numbers")) return "numbers.json";
  if (t === "describing") return "adjectives.json";
  if (t === "emotions") return "feelings.json";
  if (t === "music") return "common_nouns.json";

  if (t === "places") {
    if (w.includes("баҡса") || w.includes("liorzh") || w.includes("пахча")) return "house_furniture.json";
    return "places_transport.json";
  }

  if (t === "furniture" || t === "technology") {
    if (w.includes("баҡса") || w.includes("liorzh") || w.includes("пахча")) return "house_furniture.json";
    if (w.includes("өй") || w.includes("ti") || w.includes("çурт")) return "house_furniture.json";
    if (w.includes("китап") || w.includes("levr") || w.includes("кĕнеке")) return "school.json";
    if (w.includes("ручка") || w.includes("stilo")) return "school.json";
    if (w.includes("сумка") || w.includes("sac'h")) return "clothes.json";
    return "house_furniture.json";
  }

  if (t === "people") {
    return "family.json";
  }

  if (t === "shopping") {
    if (w.includes("аҡса") || w.includes("arc'hant") || w.includes("укçа")) return "jobs.json";
    return "places_transport.json";
  }

  if (t === "nature") {
    if (w.includes("ҡоеш") || w.includes("ямғыр") || w.includes("heol") || w.includes("glav") || w.includes("хĕвел") || w.includes("çумăр") || w.includes("юр") || w.includes("çил")) return "weather.json";
    return "geography.json";
  }

  return "common_nouns.json";
}

async function convertBatch2() {
  const langs = ["ba", "br", "cv"];

  for (const lang of langs) {
    console.log(`Processing ${lang}...`);
    const res = await fetch(`https://raw.githubusercontent.com/cosylanguages/COSYlanguages/main/vocabulary/${lang}/A1/vocabulary.js`);
    const text = await res.text();
    const sourceData = parseIIFEData(text);

    const themeMap = {};
    const processedKeys = new Set();

    for (const item of sourceData) {
      let word = item.word;
      let form = item.form;

      const wLower = word.toLowerCase();

      // Refine adverbs
      if (["бөгөн", "иртәгә", "hiziv", "warc'hoazh"].includes(wLower)) {
        form = "adverb";
      }

      const slug = transliterate(word);
      const entryKey = `${lang}:${slug}:${form}`;

      if (processedKeys.has(entryKey)) {
        console.log(`  [DEDUPLICATED] Skipping duplicate concept ${entryKey}`);
        continue;
      }
      processedKeys.add(entryKey);

      const targetThemeFile = getTargetTheme(item);
      const themeName = targetThemeFile.replace(".json", "");

      const level = "A1";

      // IPA transcription
      let transcription = item.transcription;
      if (!transcription || transcription.trim() === "" || /[a-zA-Z-]{3,}/.test(transcription.replace(/^\/|\/$/g, ""))) {
        transcription = (transcriptions[lang] && transcriptions[lang][word]) || (transcriptions[lang] && transcriptions[lang][item.word]);
      }
      if (!transcription) {
        console.warn(`  [WARN] Missing transcription for ${word} (${lang})`);
        transcription = `/${slug}/`;
      }
      if (!transcription.startsWith("/")) {
        transcription = `/${transcription.replace(/^\/|\/$/g, '')}/`;
      }

      const defs = item.definitions ? item.definitions.map(d => d.text).filter(Boolean) : ["Core vocabulary term."];
      const ex = item.definitions ? item.definitions.flatMap(d => d.examples || []).filter(Boolean) : [];

      const entry = {
        id: entryKey,
        word: word,
        language: lang,
        form: form,
        level: level,
        transcription: transcription,
        emoji: item.emoji || "📌",
        definitions: defs,
        examples: ex,
        domain: "general",
        theme: themeName,
        updated: "2025-01-15",
        no_antonym: true
      };

      // Handle Noun properties ONLY when form === "noun"
      if (form === "noun") {
        let countability = item.countability || "countable";
        // Fix uncountables
        if (["hөт", "һөт", "һыу", "аҡса", "аҙыҡ", "ҡояш", "яңғыр", "laezh", "dour", "arc'hant", "heol", "glav", "чей", "çурт"].includes(word)) {
          if (word !== "çурт") countability = "uncountable";
        }
        entry.countability = countability;

        // Article & Gender only for Breton (br)
        if (lang === "br") {
          const art = brArticles[word] || brArticles[item.word];
          const gen = brGenders[word] || brGenders[item.word];
          if (art) entry.article = art;
          else console.warn(`  [WARN] Missing Breton article for ${word}`);
          if (gen) entry.gender = gen;
          else console.warn(`  [WARN] Missing Breton gender for ${word}`);
        }

        if (countability === "countable") {
          const plural = item.plural || item.plural_form || (plurals[lang] && plurals[lang][word]) || (plurals[lang] && plurals[lang][item.word]);
          if (plural) {
            entry.plural_form = plural;
          } else {
            console.warn(`  [WARN] Missing plural for countable noun: ${word} (${lang})`);
            entry.plural_form = word + "лар";
          }
        }
      }

      if (!themeMap[targetThemeFile]) themeMap[targetThemeFile] = [];
      themeMap[targetThemeFile].push(entry);
    }

    // Write theme files to vocabulary/<lang>/a0_a1/
    const targetDir = path.join(__dirname, "..", "vocabulary", lang, "a0_a1");
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    for (const [filename, entries] of Object.entries(themeMap)) {
      const filePath = path.join(targetDir, filename);
      fs.writeFileSync(filePath, JSON.stringify(entries, null, 2) + "\n", "utf8");
      console.log(`  Wrote ${entries.length} entries to ${path.relative(path.join(__dirname, ".."), filePath)}`);
    }
  }
}

convertBatch2().catch(err => {
  console.error("Conversion error:", err);
  process.exit(1);
});
