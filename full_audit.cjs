const fs = require("fs");
const path = require("path");

function getJsonFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getJsonFiles(fullPath));
    } else if (file.endsWith(".json") && !["index.json", "search-index.json", "flat-index.json", "themes-index.json"].includes(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

const langs = ["ba", "br", "cv", "de", "el", "en", "es", "fr", "hy", "it", "ka", "pt", "ru", "tt"];

const langData = {};
langs.forEach(lang => {
  const files = getJsonFiles(`vocabulary/${lang}`);
  const entries = [];
  files.forEach(f => {
    const data = JSON.parse(fs.readFileSync(f, "utf8"));
    if (Array.isArray(data)) entries.push(...data);
  });
  langData[lang] = entries;
});

// Map of 41 concepts with known lexical targets (verbs, phrases, constructions) in all 14 languages
const conceptMap = [
  {
    concept: "be",
    ba: ["булыу"],
    br: ["bezañ", "bout", "eo"],
    cv: ["пулмаш", "пулмаша", "болмак"],
    de: ["sein"],
    el: ["είμαι"],
    en: ["be"],
    es: ["ser", "estar"],
    fr: ["être"],
    hy: ["լինել"],
    it: ["essere", "stare"],
    ka: ["ყოფნა"],
    pt: ["ser", "estar"],
    ru: ["быть"],
    tt: ["булу"]
  },
  {
    concept: "have",
    ba: ["ия булыу", "бар булыу"],
    br: ["kaout"],
    cv: ["пулмаш"],
    de: ["haben"],
    el: ["έχω"],
    en: ["have"],
    es: ["tener", "haber"],
    fr: ["avoir"],
    hy: ["ունենալ"],
    it: ["avere"],
    ka: ["ქონა", "ყოლა"],
    pt: ["ter", "haver"],
    ru: ["иметь"],
    tt: ["ия булу", "бар булу"]
  },
  {
    concept: "think",
    ba: ["уйлау"],
    br: ["soñjal"],
    cv: ["шухăшлама", "шухăшламашкăн"],
    de: ["denken"],
    el: ["σκέφτομαι", "νομίζω"],
    en: ["think"],
    es: ["pensar"],
    fr: ["penser"],
    hy: ["մտածել"],
    it: ["pensare"],
    ka: ["ფიქრი"],
    pt: ["pensar"],
    ru: ["думать", "подумать"],
    tt: ["уйлау"]
  },
  {
    concept: "know",
    ba: ["белеү"],
    br: ["gouzout", "anavezout"],
    cv: ["пĕлме", "пĕлмешкен"],
    de: ["wissen", "kennen"],
    el: ["ξέρω", "γνωρίζω"],
    en: ["know"],
    es: ["saber", "conocer"],
    fr: ["savoir", "connaître"],
    hy: ["իմանալ", "ճանաչել"],
    it: ["sapere", "conoscere"],
    ka: ["ცოდნა"],
    pt: ["saber", "conhecer"],
    ru: ["знать"],
    tt: ["белү"]
  },
  {
    concept: "like",
    ba: ["ошатыу"],
    br: ["plijout"],
    cv: ["кăмăллама", "кăмăлламашкăн"],
    de: ["mögen", "gefallen"],
    el: ["αρέσω", "μ' αρέσει"],
    en: ["like"],
    es: ["gustar"],
    fr: ["aimer", "aimer bien"],
    hy: ["հավանել", "սիրել"],
    it: ["piacere"],
    ka: ["მოწονება"],
    pt: ["gostar"],
    ru: ["нравиться"],
    tt: ["ошату"]
  },
  {
    concept: "adore",
    ba: ["бышыҡ яратыу", "ныҡ яратыу"],
    br: ["aodiñ", "adoriñ"],
    cv: ["махтанаш"],
    de: ["anbeten", "adorieren"],
    el: ["λατρεύω"],
    en: ["adore"],
    es: ["adorar"],
    fr: ["adorer"],
    hy: ["պաշտել"],
    it: ["adorare"],
    ka: ["თაყვანისცემა"],
    pt: ["adorar"],
    ru: ["обожать"],
    tt: ["табыну"]
  },
  {
    concept: "love",
    ba: ["яратыу"],
    br: ["karet"],
    cv: ["юратма", "юратмашкăн"],
    de: ["lieben"],
    el: ["αγαπώ", "αγαπάω"],
    en: ["love"],
    es: ["amar", "querer"],
    fr: ["aimer"],
    hy: ["սիրել"],
    it: ["amare"],
    ka: ["სიყვარული"],
    pt: ["amar"],
    ru: ["любить"],
    tt: ["ярату"]
  },
  {
    concept: "hate",
    ba: ["жек күреү"],
    br: ["kazout"],
    cv: ["жек курмаш"],
    de: ["hassen"],
    el: ["μισώ"],
    en: ["hate"],
    es: ["odiar", "detestar"],
    fr: ["haïr", "détester"],
    hy: ["ատել"],
    it: ["odiare", "detestare"],
    ka: ["სიძულვილი"],
    pt: ["odiar"],
    ru: ["ненавидеть"],
    tt: ["нәфрәт итү"]
  },
  {
    concept: "dislike",
    ba: ["яратмау", "ошатмау"],
    br: ["diasantout"],
    cv: ["килĕштермешкĕн", "килĕштерме"],
    de: ["misfallen", "nicht mögen"],
    el: ["δεν μ' αρέσει", "απεχθάνομαι"],
    en: ["dislike"],
    es: ["disgustar", "no gustar"],
    fr: ["détester", "ne pas aimer"],
    hy: ["չսիրել"],
    it: ["non piacere", "detestare"],
    ka: ["არ მოწონება"],
    pt: ["não gostar", "detestar"],
    ru: ["не нравиться"],
    tt: ["яратмау", "ошатмау"]
  },
  {
    concept: "want",
    ba: ["теләү"],
    br: ["fellout", "c-hoant kaout"],
    cv: ["вăйлама", "вăйламашкăн"],
    de: ["wollen"],
    el: ["θέλω"],
    en: ["want"],
    es: ["querer"],
    fr: ["vouloir"],
    hy: ["ուզել"],
    it: ["volere"],
    ka: ["ნდომა"],
    pt: ["querer"],
    ru: ["хотеть"],
    tt: ["теләү"]
  },
  {
    concept: "would_like",
    ba: ["теләр ине"],
    br: ["goulenn"],
    cv: ["илĕртмешкĕн"],
    de: ["möchte", "möchten"],
    el: ["θα ήθελα"],
    en: ["would like"],
    es: ["desearía", "gustaría"],
    fr: ["aimerait", "voudrait"],
    hy: ["կուզենայի"],
    it: ["vorrebbe", "gradirebbe"],
    ka: ["ისურვებდა"],
    pt: ["gostaria"],
    ru: ["хотел бы"],
    tt: ["теләр иде"]
  },
  {
    concept: "work",
    ba: ["эшләү"],
    br: ["labourat"],
    cv: ["ĕçлеме", "ĕçлемешкĕн"],
    de: ["arbeiten"],
    el: ["δουλεύω", "εργάζομαι"],
    en: ["work"],
    es: ["trabajar"],
    fr: ["travailler"],
    hy: ["աշխատել"],
    it: ["lavorare"],
    ka: ["მუშაობა"],
    pt: ["trabalhar"],
    ru: ["работать"],
    tt: ["эшләү"]
  },
  {
    concept: "study",
    ba: ["уҡыу"],
    br: ["studiañ"],
    cv: ["вĕренме", "вĕренмешкĕн"],
    de: ["studieren", "lernen"],
    el: ["σπουδάζω", "μελετώ"],
    en: ["study"],
    es: ["estudiar"],
    fr: ["étudier"],
    hy: ["սովորել"],
    it: ["studiare"],
    ka: ["სწავლα"],
    pt: ["estudar"],
    ru: ["учиться", "изучать"],
    tt: ["уку", "өйрәнү"]
  },
  {
    concept: "rest",
    ba: ["ял итеү"],
    br: ["diskouizhañ"],
    cv: ["κανăшма", "κανăшмашкăн"],
    de: ["ausruhen", "sich ausruhen"],
    el: ["ξεκουράζομαι"],
    en: ["rest"],
    es: ["descansar"],
    fr: ["se reposer", "reposer"],
    hy: ["հանգստանալ"],
    it: ["riposare", "riposarsi"],
    ka: ["დასვენება"],
    pt: ["descansar"],
    ru: ["отдыхать"],
    tt: ["ял итү"]
  },
  {
    concept: "go",
    ba: ["барыу"],
    br: ["mont"],
    cv: ["кайма", "каймашкăн"],
    de: ["gehen"],
    el: ["πηγαίνω", "πάω"],
    en: ["go"],
    es: ["ir"],
    fr: ["aller"],
    hy: ["գնալ"],
    it: ["andare"],
    ka: ["წასვლα", "სვლα"],
    pt: ["ir"],
    ru: ["идти", "ехать", "ходить"],
    tt: ["бару"]
  },
  {
    concept: "can",
    ba: ["ала алыу"],
    br: ["gallout"],
    cv: ["пултарма", "пултармашкăн"],
    de: ["können"],
    el: ["μπορώ"],
    en: ["can"],
    es: ["poder"],
    fr: ["pouvoir"],
    hy: ["կարողանալ"],
    it: ["potere"],
    ka: ["შეძლება"],
    pt: ["poder"],
    ru: ["мочь"],
    tt: ["булдыра алу"]
  },
  {
    concept: "be_able_to",
    ba: ["ала алыу", "ҡадир булыу"],
    br: ["gouest bezañ", "gallout"],
    cv: ["пултараш", "пултарма"],
    de: ["fähig sein", "können"],
    el: ["είμαι ικανός", "μπορώ"],
    en: ["be able to"],
    es: ["ser capaz de", "poder"],
    fr: ["être capable de", "pouvoir"],
    hy: ["ի վիճակի լինել", "կարողանալ"],
    it: ["essere in grado di", "potere"],
    ka: ["შეძლება"],
    pt: ["ser capaz de", "poder"],
    ru: ["быть в состоянии", "мочь"],
    tt: ["булдыра алу", "булдыру"]
  },
  {
    concept: "eat",
    ba: ["ашау"],
    br: ["debriñ"],
    cv: ["çиме", "çимешкĕн"],
    de: ["essen"],
    el: ["τρώω"],
    en: ["eat"],
    es: ["comer"],
    fr: ["manger"],
    hy: ["ուտել"],
    it: ["mangiare"],
    ka: ["ჭαμα"],
    pt: ["comer"],
    ru: ["есть", "поесть", "кушать"],
    tt: ["ашау"]
  },
  {
    concept: "drink",
    ba: ["эсеү"],
    br: ["evañ"],
    cv: ["ĕçме", "ĕçмешкĕн"],
    de: ["trinken"],
    el: ["πίνω"],
    en: ["drink"],
    es: ["beber", "tomar"],
    fr: ["boire"],
    hy: ["խմել"],
    it: ["bere"],
    ka: ["სմα"],
    pt: ["beber"],
    ru: ["пить"],
    tt: ["эчү"]
  },
  {
    concept: "do",
    ba: ["эшләү"],
    br: ["ober"],
    cv: ["тума", "тумашкăн"],
    de: ["tun", "machen"],
    el: ["κάνω"],
    en: ["do"],
    es: ["hacer"],
    fr: ["faire"],
    hy: ["անել"],
    it: ["fare"],
    ka: ["კეთება"],
    pt: ["fazer"],
    ru: ["делать"],
    tt: ["эшләү"]
  },
  {
    concept: "make",
    ba: ["яһау"],
    br: ["ober"],
    cv: ["тăваша", "тума"],
    de: ["machen", "herstellen"],
    el: ["φτιάχνω", "κάνω"],
    en: ["make"],
    es: ["hacer"],
    fr: ["fabriquer", "faire"],
    hy: ["պատրաստել", "անել"],
    it: ["fabbricare", "fare"],
    ka: ["დამზადება"],
    pt: ["fazer"],
    ru: ["создавать", "делать"],
    tt: ["ясау"]
  },
  {
    concept: "understand",
    ba: ["аңлау"],
    br: ["comprenañ"],
    cv: ["ăнланма", "ăнланмашкăн"],
    de: ["verstehen"],
    el: ["καταλαβαίνω"],
    en: ["understand"],
    es: ["comprender", "entender"],
    fr: ["comprendre"],
    hy: ["հասկանալ"],
    it: ["capire", "comprendere"],
    ka: ["გაგება"],
    pt: ["entender", "compreender"],
    ru: ["понимать"],
    tt: ["аңлау"]
  },
  {
    concept: "speak",
    ba: ["һөйләшеү"],
    br: ["komz"],
    cv: ["калаçма", "калаçмашкăн"],
    de: ["sprechen"],
    el: ["μιλάω", "μιλώ"],
    en: ["speak"],
    es: ["hablar"],
    fr: ["parler"],
    hy: ["խոսել"],
    it: ["parlare"],
    ka: ["ლապարαკი"],
    pt: ["falar"],
    ru: ["говорить"],
    tt: ["сөйләшү"]
  },
  {
    concept: "talk",
    ba: ["эңгәмәләшеү", "һөйләшеү"],
    br: ["kaozeal", "komz"],
    cv: ["капăшма", "калаçма"],
    de: ["reden", "sprechen"],
    el: ["κουβεντιάζω", "μιλάω"],
    en: ["talk"],
    es: ["conversar", "hablar"],
    fr: ["discuter", "parler"],
    hy: ["զրուցել", "խոսել"],
    it: ["chiacchierare", "parlare"],
    ka: ["საუბარი"],
    pt: ["conversar", "falar"],
    ru: ["разговаривать", "говорить"],
    tt: ["сөйләү", "сөйләшү"]
  },
  {
    concept: "say",
    ba: ["әйтеү"],
    br: ["lavaret"],
    cv: ["калама", "каламашкăн"],
    de: ["sagen"],
    el: ["λέω"],
    en: ["say"],
    es: ["decir"],
    fr: ["dire"],
    hy: ["ասել"],
    it: ["dire"],
    ka: ["თქμα"],
    pt: ["dizer"],
    ru: ["сказать", "говорить"],
    tt: ["әйтү"]
  },
  {
    concept: "look",
    ba: ["ҡарау"],
    br: ["sellout"],
    cv: ["пăхма", "пăхмашкăн"],
    de: ["schauen", "gucken"],
    el: ["κοιτάζω"],
    en: ["look"],
    es: ["mirar"],
    fr: ["regarder"],
    hy: ["նայել"],
    it: ["guardare"],
    ka: ["ყურება"],
    pt: ["olhar"],
    ru: ["смотреть"],
    tt: ["карау"]
  },
  {
    concept: "watch",
    ba: ["күҙәтеү", "ҡарау"],
    br: ["arsellout", "sellout"],
    cv: ["сăнама", "пăхма"],
    de: ["zuschauen", "beobachten"],
    el: ["παρακολουθώ"],
    en: ["watch"],
    es: ["observar", "mirar"],
    fr: ["observer", "regarder"],
    hy: ["դիտել"],
    it: ["osservare", "guardare"],
    ka: ["თვალის დევნება"],
    pt: ["assistir", "observar"],
    ru: ["наблюдать", "смотреть"],
    tt: ["күзәтү", "карау"]
  },
  {
    concept: "see",
    ba: ["күреү"],
    br: ["gwelout"],
    cv: ["курма", "курмашкăн"],
    de: ["sehen"],
    el: ["βλέπω"],
    en: ["see"],
    es: ["ver"],
    fr: ["voir"],
    hy: ["տեսնել"],
    it: ["vedere"],
    ka: ["ნαխվα"],
    pt: ["ver"],
    ru: ["видеть"],
    tt: ["күрү"]
  },
  {
    concept: "tell",
    ba: ["һөйләү"],
    br: ["kontañ"],
    cv: ["каласа параш", "калама"],
    de: ["erzählen"],
    el: ["διηγούμαι", "λέω"],
    en: ["tell"],
    es: ["contar", "decir"],
    fr: ["raconter", "dire"],
    hy: ["պատմել"],
    it: ["raccontare"],
    ka: ["მოყოლα"],
    pt: ["contar"],
    ru: ["рассказывать", "рассказать"],
    tt: ["сөйләү"]
  },
  {
    concept: "need",
    ba: ["кәрәк булыу"],
    br: ["ezhomm kaout"],
    cv: ["кирĕк пулмаш"],
    de: ["brauchen"],
    el: ["χρειάζομαι"],
    en: ["need"],
    es: ["necesitar"],
    fr: ["avoir besoin de", "nécessiter", "avoir besoin"],
    hy: ["կարիք ունենալ"],
    it: ["aver bisogno di", "servire", "avere bisogno"],
    ka: ["საჭიროებα"],
    pt: ["precisar"],
    ru: ["нуждаться"],
    tt: ["кирәк булу"]
  },
  {
    concept: "ask",
    ba: ["һорау"],
    br: ["goulenn"],
    cv: ["ыйтма", "ыйтмашкăн"],
    de: ["fragen", "bitten"],
    el: ["ρωτώ", "ζητώ"],
    en: ["ask"],
    es: ["preguntar", "pedir"],
    fr: ["demander"],
    hy: ["հարցնել", "խնդրել"],
    it: ["chiedere"],
    ka: ["კითხვα"],
    pt: ["perguntar", "pedir"],
    ru: ["спрашивать", "просить"],
    tt: ["сорау"]
  },
  {
    concept: "answer",
    ba: ["яуап биреү"],
    br: ["respont"],
    cv: ["хурав параш"],
    de: ["antworten"],
    el: ["απαντώ"],
    en: ["answer"],
    es: ["responder", "contestar"],
    fr: ["répondre"],
    hy: ["պատասխանել"],
    it: ["rispondere"],
    ka: ["პასუხի"],
    pt: ["responder"],
    ru: ["отвечать", "ответить"],
    tt: ["җавап бирү"]
  },
  {
    concept: "take",
    ba: ["алыу"],
    br: ["kemer"],
    cv: ["илме", "илемешкĕн"],
    de: ["nehmen"],
    el: ["παίρνω"],
    en: ["take"],
    es: ["tomar", "coger"],
    fr: ["prendre"],
    hy: ["վերցնել"],
    it: ["prendere"],
    ka: ["აღებα"],
    pt: ["tomar", "pegar"],
    ru: ["брать", "взять"],
    tt: ["алу"]
  },
  {
    concept: "give",
    ba: ["биреү"],
    br: ["reiñ"],
    cv: ["парама", "парамашкăн"],
    de: ["geben"],
    el: ["δίνω"],
    en: ["give"],
    es: ["dar"],
    fr: ["donner"],
    hy: ["տալ"],
    it: ["dare"],
    ka: ["მიცემα"],
    pt: ["dar"],
    ru: ["давать", "дать"],
    tt: ["бирү"]
  },
  {
    concept: "get",
    ba: ["алыу"],
    br: ["kaout"],
    cv: ["илмеш"],
    de: ["bekommen"],
    el: ["παίρνω", "αποκτώ"],
    en: ["get"],
    es: ["recibir", "obtener"],
    fr: ["recevoir", "obtenir"],
    hy: ["ստանալ"],
    it: ["ricevere", "ottenere"],
    ka: ["მიღებα"],
    pt: ["receber", "obter"],
    ru: ["получать", "получить"],
    tt: ["алу"]
  },
  {
    concept: "must",
    ba: ["тиеш булыу"],
    br: ["rankout"],
    cv: ["тиеш пулмаш"],
    de: ["müssen"],
    el: ["πρέπει"],
    en: ["must"],
    es: ["deber"],
    fr: ["devoir"],
    hy: ["պետք է"],
    it: ["dovere"],
    ka: ["უნդα"],
    pt: ["dever"],
    ru: ["должен"],
    tt: ["тиеш булу"]
  },
  {
    concept: "have_to",
    ba: ["тиеш булыу"],
    br: ["rankout"],
    cv: ["тиеш пулмаш"],
    de: ["müssen"],
    el: ["πρέπει να", "πρέπει"],
    en: ["have to"],
    es: ["tener que"],
    fr: ["devoir", "avoir à"],
    hy: ["ստիպված լինել"],
    it: ["dovere"],
    ka: ["ვალდებულებα"],
    pt: ["ter que", "ter de"],
    ru: ["приходиться", "должен"],
    tt: ["тиеш булу"]
  },
  {
    concept: "wait",
    ba: ["көтөү"],
    br: ["gortoz"],
    cv: ["кĕтме", "кĕтмешкĕн"],
    de: ["warten"],
    el: ["περιμένω"],
    en: ["wait"],
    es: ["esperar"],
    fr: ["attendre"],
    hy: ["սպասել"],
    it: ["aspettare"],
    ka: ["ცดα"],
    pt: ["esperar"],
    ru: ["ждать"],
    tt: ["көтү"]
  },
  {
    concept: "live",
    ba: ["яшау"],
    br: ["bevañ", "chom"],
    cv: ["пурăнма", "пурăнмашкăн"],
    de: ["leben", "wohnen"],
    el: ["ζω", "μένω"],
    en: ["live"],
    es: ["vivir"],
    fr: ["vivre", "habiter"],
    hy: ["ապրել"],
    it: ["vivere", "abitare"],
    ka: ["ცხოვრებα"],
    pt: ["viver", "morar"],
    ru: ["жить"],
    tt: ["яшәү"]
  },
  {
    concept: "listen",
    ba: ["тыңлау"],
    br: ["selaou"],
    cv: ["ишĕтме", "ишĕтмешкĕн"],
    de: ["zuhören", "hören"],
    el: ["ακούω"],
    en: ["listen"],
    es: ["escuchar"],
    fr: ["écouter"],
    hy: ["լսել"],
    it: ["ascoltare"],
    ka: ["მოსմենα"],
    pt: ["escutar", "ouvir"],
    ru: ["слушать"],
    tt: ["тыңлау"]
  },
  {
    concept: "hear",
    ba: ["ишетеү"],
    br: ["klevout"],
    cv: ["илтме", "илтмешкĕн"],
    de: ["hören"],
    el: ["ακούω"],
    en: ["hear"],
    es: ["oír"],
    fr: ["entendre"],
    hy: ["լսել"],
    it: ["sentire"],
    ka: ["გონებα"],
    pt: ["ouvir"],
    ru: ["слышать"],
    tt: ["ишетү"]
  }
];

// Search exact presence in COSYdata dataset per lang
const auditReport = [];

conceptMap.forEach(item => {
  const row = { concept: item.concept, status: {} };
  langs.forEach(lang => {
    const targetWords = item[lang] || [];
    const entries = langData[lang];
    const found = [];

    entries.forEach(e => {
      const id = (e.id || "").toLowerCase();
      const word = (e.word || "").toLowerCase();
      const translation_of = (e.translation_of || "").toLowerCase();
      const concept = (e.concept || "").toLowerCase();

      // direct concept or translation_of match
      if (translation_of.endsWith(`:${item.concept}:verb`) || translation_of.endsWith(`:${item.concept}:phrase`) ||
          id.endsWith(`:${item.concept}:verb`) || id.endsWith(`:${item.concept}:phrase`)) {
        found.push(e);
        return;
      }

      for (let tw of targetWords) {
        const twL = tw.toLowerCase();
        if (word === twL || word.includes(twL)) {
          found.push(e);
          return;
        }
      }
    });

    row.status[lang] = found;
  });
  auditReport.push(row);
});

console.log("Audit completed for 41 concepts across 14 languages.");
