const fs = require('fs');
const path = require('path');
const vm = require('vm');

function findCosyLanguagesDir() {
  const candidates = [
    path.resolve(__dirname, '../../COSYlanguages'),
    path.resolve(__dirname, '../COSYlanguages'),
    '/tmp/COSYlanguages'
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.existsSync(path.join(candidate, 'vocabulary'))) {
      return candidate;
    }
  }
  throw new Error('COSYlanguages repository directory not found.');
}

const cosyLanguagesDir = findCosyLanguagesDir();
const cosyDataFrDir = path.resolve(__dirname, '../vocabulary/fr');

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/œ/g, 'oe')
    .replace(/æ/g, 'ae')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function cleanBase(str) {
  return str
    .toLowerCase()
    .replace(/œ/g, 'oe')
    .replace(/æ/g, 'ae')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

function normalizeIPA(transcription) {
  if (!transcription) return undefined;
  let t = transcription.trim();
  if (!t) return undefined;
  if (!t.startsWith('/')) t = '/' + t;
  if (!t.endsWith('/')) t = t + '/';
  return t;
}

const properNounSet = new Set([
  'france', 'italie', 'russie', 'grece', 'angleterre', 'allemagne', 'espagne', 'amerique', 'chine',
  'paris', 'londres', 'moscou', 'rome', 'berlin', 'madrid', 'tokyo', 'pekin', 'chicago', 'miami',
  'losangeles', 'washingtondc', 'newyork', 'sanfrancisco', 'melbourne', 'sydney', 'toronto',
  'vancouver', 'montreal', 'venise', 'florence', 'milan', 'naples', 'geneve', 'zurich', 'vienne',
  'prague', 'amsterdam', 'bruxelles', 'lisbonne', 'istanbul', 'athenes', 'lecaire', 'mexicocity',
  'riodejaneiro', 'dublin', 'edimbourg', 'etatsunis', 'egypte', 'inde', 'japon', 'coreedusud',
  'thailande', 'australie', 'autriche', 'belgique', 'danemark', 'finlande', 'norvege',
  'suede', 'suisse', 'ukraine', 'paysbas', 'portugal', 'pologne', 'barcelone', 'irlande',
  'napoleonbonaparte', 'victorhugo', 'edithpiaf', 'louispasteur', 'claudemonet', 'moliere',
  'jeannedarc', 'cocochanel', 'gustaveeiffel', 'zinedinezidane', 'mariecurie', 'alberteinstein',
  'beyonce', 'lionelmessi', 'cristianoronaldo', 'elonmusk', 'nelsonmandela', 'taylorswift',
  'williamshakespeare', 'reineisabelii', 'leonardodavinci'
].map(cleanBase));

const femalePersons = new Set([
  'mariecurie', 'edithpiaf', 'jeannedarc', 'cocochanel', 'beyonce', 'taylorswift', 'reineisabelii'
].map(cleanBase));

const malePersons = new Set([
  'napoleonbonaparte', 'victorhugo', 'louispasteur', 'claudemonet', 'moliere',
  'gustaveeiffel', 'zinedinezidane', 'alberteinstein', 'lionelmessi', 'cristianoronaldo',
  'elonmusk', 'nelsonmandela', 'williamshakespeare', 'leonardodavinci'
].map(cleanBase));

const feminineCountries = new Set([
  'france', 'italie', 'russie', 'grece', 'angleterre', 'allemagne', 'espagne', 'chine',
  'egypte', 'inde', 'thailande', 'australie', 'autriche', 'belgique', 'danemark', 'finlande',
  'norvege', 'suede', 'suisse', 'ukraine', 'pologne', 'irlande', 'coreedusud'
].map(cleanBase));

const pluralCountries = new Set([
  'etatsunis', 'paysbas'
].map(cleanBase));

function isProperNoun(word) {
  return properNounSet.has(cleanBase(word));
}

function fixFrenchElisions(str) {
  if (!str) return str;
  return str
    .replace(/\bJ\s+([aeiouyàâéèêëîïôûùh])/gi, "J'$1")
    .replace(/\bj\s+([aeiouyàâéèêëîïôûùh])/gi, "j'$1")
    .replace(/\bd\s+([aeiouyàâéèêëîïôûùh])/gi, "d'$1")
    .replace(/\bl\s+([aeiouyàâéèêëîïôûùh])/gi, "l'$1")
    .replace(/\bm\s+([aeiouyàâéèêëîïôûùh])/gi, "m'$1")
    .replace(/\bn\s+([aeiouyàâéèêëîïôûùh])/gi, "n'$1")
    .replace(/\bqu\s+([aeiouyàâéèêëîïôûùh])/gi, "qu'$1")
    .replace(/\bs\s+il\b/gi, "s'il")
    .replace(/\bs\s+ils\b/gi, "s'ils")
    .replace(/\bjusqu\s+a\b/gi, "jusqu'à")
    .replace(/\bC\s+est\b/gi, "C'est")
    .replace(/\bc\s+est\b/gi, "c'est")
    .replace(/\s+/g, ' ')
    .trim();
}

// Custom curated definitions, examples, and IPA for tricky entries
const curatedMetadata = {
  'egypte': {
    def: "Pays d'Afrique du Nord célèbre pour ses pyramides et son histoire ancienne.",
    ex: "L'Égypte est une destination touristique très populaire.",
    ipa: "/e.ʒipt/",
    article: "l'",
    gender: "feminine"
  },
  'égypte': {
    def: "Pays d'Afrique du Nord célèbre pour ses pyramides et son histoire ancienne.",
    ex: "L'Égypte est une destination touristique très populaire.",
    ipa: "/e.ʒipt/",
    article: "l'",
    gender: "feminine"
  },
  'autriche': {
    def: "Pays d'Europe centrale célèbre pour ses montagnes et sa musique classique.",
    ex: "L'Autriche est située au cœur des Alpes.",
    ipa: "/o.tʁiʃ/",
    article: "l'",
    gender: "feminine"
  },
  'australie': {
    def: "Pays et continent de l'hémisphère sud.",
    ex: "L'Australie héberge une faune unique au monde.",
    ipa: "/os.tʁa.li/",
    article: "l'",
    gender: "feminine"
  },
  'inde': {
    def: "Grand pays d'Asie du Sud célèbre pour sa culture et ses monuments.",
    ex: "L'Inde compte plus d'un milliard d'habitants.",
    ipa: "/ɛ̃d/",
    article: "l'",
    gender: "feminine"
  },
  'etats-unis': {
    def: "Grand pays d'Amérique du Nord composé de cinquante États.",
    ex: "Les États-Unis se situent entre le Canada et le Mexique.",
    ipa: "/e.ta.zy.ni/",
    article: "les",
    gender: "masculine"
  },
  'états-unis': {
    def: "Grand pays d'Amérique du Nord composé de cinquante États.",
    ex: "Les États-Unis se situent entre le Canada et le Mexique.",
    ipa: "/e.ta.zy.ni/",
    article: "les",
    gender: "masculine"
  },
  'thailande': {
    def: "Pays d'Asie du Sud-Est réputé pour ses plages et ses temples.",
    ex: "La Thaïlande attire de nombreux voyageurs.",
    ipa: "/ta.i.lɑ̃d/",
    article: "la",
    gender: "feminine"
  },
  'thaïlande': {
    def: "Pays d'Asie du Sud-Est réputé pour ses plages et ses temples.",
    ex: "La Thaïlande attire de nombreux voyageurs.",
    ipa: "/ta.i.lɑ̃d/",
    article: "la",
    gender: "feminine"
  },
  'suede': {
    def: "Pays scandinave d'Europe du Nord.",
    ex: "La Suède est réputée pour ses paysages naturels.",
    ipa: "/sɥɛd/",
    article: "la",
    gender: "feminine"
  },
  'suède': {
    def: "Pays scandinave d'Europe du Nord.",
    ex: "La Suède est réputée pour ses paysages naturels.",
    ipa: "/sɥɛd/",
    article: "la",
    gender: "feminine"
  },
  'norvege': {
    def: "Pays nordique célèbre pour ses fjords spectaculaires.",
    ex: "La Norvège se situe dans le nord de l'Europe.",
    ipa: "/nɔʁ.vɛʒ/",
    article: "la",
    gender: "feminine"
  },
  'norvège': {
    def: "Pays nordique célèbre pour ses fjords spectaculaires.",
    ex: "La Norvège se situe dans le nord de l'Europe.",
    ipa: "/nɔʁ.vɛʒ/",
    article: "la",
    gender: "feminine"
  },
  'danemark': {
    def: "Pays scandinave d'Europe du Nord.",
    ex: "Le Danemark a pour capitale Copenhague.",
    ipa: "/dan.maʁk/",
    article: "le",
    gender: "masculine"
  },
  'pologne': {
    def: "Pays d'Europe centrale célèbre pour son histoire et son architecture.",
    ex: "La Pologne se trouve à l'est de l'Allemagne.",
    ipa: "/pɔ.lɔɲ/",
    article: "la",
    gender: "feminine"
  },
  'irlande': {
    def: "Pays insulaire d'Europe de l'Ouest.",
    ex: "L'Irlande est connue sous le nom d'île d'Émeraude.",
    ipa: "/iʁ.lɑ̃d/",
    article: "l'",
    gender: "feminine"
  },
  'napoleon bonaparte': {
    def: "Célèbre général et empereur des Français.",
    ex: "Napoléon Bonaparte a profondément marqué l'histoire de la France.",
    ipa: "/na.pɔ.le.ɔ̃ bɔ.na.paʁt/"
  },
  'victor hugo': {
    def: "Illustre écrivain et poète français du XIXe siècle.",
    ex: "Victor Hugo est l'auteur des Misérables.",
    ipa: "/vik.tɔʁ y.ɡo/"
  },
  'edith piaf': {
    def: "Célèbre chanteuse française de variété.",
    ex: "Édith Piaf a interprété La Vie en rose.",
    ipa: "/e.dit pjafr/"
  },
  'édith piaf': {
    def: "Célèbre chanteuse française de variété.",
    ex: "Édith Piaf a interprété La Vie en rose.",
    ipa: "/e.dit pjafr/"
  },
  'jeanne d\'arc': {
    def: "Héroïne nationale française et figure historique du XVe siècle.",
    ex: "Jeanne d'Arc a joué un rôle majeur pendant la guerre de Cent Ans.",
    ipa: "/ʒan daʁk/"
  },
  'marie curie': {
    def: "Physicienne et chimiste d'exception ayant obtenu deux prix Nobel.",
    ex: "Marie Curie a découvert le radium et le polonium.",
    ipa: "/ma.ʁi ky.ʁi/"
  },
  'coco chanel': {
    def: "Célèbre créatrice de mode et couturière française.",
    ex: "Coco Chanel a révolutionné la mode féminine moderne.",
    ipa: "/kɔ.ko ʃa.nɛl/"
  },
  'paris': {
    def: "Capitale et plus grande ville de la France.",
    ex: "Paris est célèbre pour la tour Eiffel et ses grands musées.",
    ipa: "/pa.ʁi/"
  },
  'barcelone': {
    def: "Grande ville espagnole située en Catalogne.",
    ex: "Barcelone est connue pour son architecture et ses plages.",
    ipa: "/baʁ.sə.lɔn/"
  },
  'tiede': {
    def: "Qui est entre le chaud et le froid.",
    ex: "L'eau de la douche est tiède et agréable.",
    ipa: "/tjɛd/"
  },
  'tiède': {
    def: "Qui est entre le chaud et le froid.",
    ex: "L'eau de la douche est tiède et agréable.",
    ipa: "/tjɛd/"
  },
  'sec': {
    def: "Qui ne contient pas d'eau ou d'humidité.",
    ex: "Le linge est enfin sec sur l'étendoir.",
    ipa: "/sɛk/"
  },
  'actif': {
    def: "Qui agit beaucoup et aime le mouvement.",
    ex: "C'est un enfant très actif qui pratique plusieurs sports.",
    ipa: "/ak.tif/"
  },
  'naturel': {
    def: "Qui vient de la nature et sans produit chimique.",
    ex: "Ce jus de fruit est entièrement naturel.",
    ipa: "/na.ty.ʁɛl/"
  },
  'prudent': {
    def: "Qui fait attention pour éviter les dangers.",
    ex: "Soyez prudent lorsque vous traversez la rue.",
    ipa: "/pʁy.dɑ̃/"
  },
  'vrai': {
    def: "Qui est conforme à la réalité et aux faits.",
    ex: "C'est une histoire vraie que grand-père m'a racontée.",
    ipa: "/vʁɛ/"
  },
  'sommeil': {
    def: "État de repos naturel du corps et de l'esprit.",
    ex: "Un bon sommeil est essentiel pour rester en bonne santé.",
    ipa: "/sɔ.mɛj/",
    gender: "masculine",
    article: "le"
  },
  'bouger': {
    def: "Faire des mouvements ou changer de place.",
    ex: "Les enfants adorent bouger pendant la récréation.",
    ipa: "/bu.ʒe/"
  },
  'sonner': {
    def: "Produire un son résonnant comme une cloche ou un téléphone.",
    ex: "Le réveil va sonner à sept heures demain matin.",
    ipa: "/sɔ.ne/"
  },
  'mettre': {
    def: "Placer quelque chose à un endroit ou porter un vêtement.",
    ex: "N'oublie pas de mettre tes chaussures avant de sortir.",
    ipa: "/mɛtʁ/"
  },
  'passer': {
    def: "Aller d'un endroit à un autre ou franchir une étape.",
    ex: "Je vais passer chez le boulanger avant d'entrer à la maison.",
    ipa: "/pa.se/"
  },
  'ajouter': {
    def: "Mettre quelque chose en plus.",
    ex: "Il faut ajouter une pincée de sel dans la sauce.",
    ipa: "/a.ʒu.te/"
  },
  'detester': {
    def: "Ressentir une forte aversion envers quelque chose.",
    ex: "Elle déteste se lever trop tôt le matin.",
    ipa: "/de.tɛs.te/"
  },
  'détester': {
    def: "Ressentir une forte aversion envers quelque chose.",
    ex: "Elle déteste se lever trop tôt le matin.",
    ipa: "/de.tɛs.te/"
  }
};

// Explicit IPA lookup for multi-word expressions and common terms lacking IPA
const ipaDictionary = {
  'à': '/a/',
  'il': '/il/',
  'la': '/la/',
  'la': '/la/',
  'film': '/film/',
  'ma': '/ma/',
  'rarement': '/ʁaʁ.mɑ̃/',
  'rome': '/ʁɔm/',
  'moscou': '/mɔs.ku/',
  'athenes': '/a.tɛn/',
  'athènes': '/a.tɛn/',
  'new-york': '/nju jɔʁk/',
  'new york': '/nju jɔʁk/',
  'mexico-city': '/mɛk.si.ko si.ti/',
  'mexico city': '/mɛk.si.ko si.ti/',
  'amsterdam': '/am.stɛʁ.dam/',
  'vienne': '/vjɛn/',
  'prague': '/pʁaɡ/',
  'venise': '/və.niz/',
  'florence': '/flɔ.ʁɑ̃s/',
  'dublin': '/dy.blɛ̃/',
  'edimbourg': '/e.dɛ̃.buʁ/',
  'édimbourg': '/e.dɛ̃.buʁ/',
  'chicago': '/ʃi.ka.ɡo/',
  'los-angeles': '/lɔs ɑ̃.dʒɛ.lɛs/',
  'los angeles': '/lɔs ɑ̃.dʒɛ.lɛs/',
  'san-francisco': '/san fʁɑ̃.sis.ko/',
  'san francisco': '/san fʁɑ̃.sis.ko/',
  'miami': '/mja.mi/',
  'washington-dc': '/wa.ʃiŋ.tɔn de.se/',
  'washington dc': '/wa.ʃiŋ.tɔn de.se/',
  'vancouver': '/vɑ̃.ku.vɛʁ/',
  'montreal': '/mɔ̃.ʁe.al/',
  'montréal': '/mɔ̃.ʁe.al/',
  'melbourne': '/mɛl.buʁn/',
  'coree-du-sud': '/kɔ.ʁe dy syd/',
  'corée du sud': '/kɔ.ʁe dy syd/',
  'finlande': '/fɛ̃.lɑ̃d/',
  'ukraine': '/y.kʁɛn/',
  'suisse': '/sɥis/',
  'pays-bas': '/pɛ.i ba/',
  'belgique': '/bɛl.ʒik/',
  'francais': '/fʁɑ̃.sɛ/',
  'français': '/fʁɑ̃.sɛ/',
  'anglais': '/ɑ̃.ɡlɛ/',
  'italien': '/i.ta.ljɛ̃/',
  'avoir faim': '/a.vwaʁ fɛ̃/',
  'avoir soif': '/a.vwaʁ swaf/',
  'avoir chaud': '/a.vwaʁ ʃo/',
  'avoir froid': '/a.vwaʁ fʁwa/',
  'avoir peur': '/a.vwaʁ pœʁ/',
  'avoir besoin de': '/a.vwaʁ bə.zwɛ̃ də/',
  "avoir l'air": '/a.vwaʁ lɛʁ/',
  'avoir mal à': '/a.vwaʁ mal a/',
  'avoir envie de': '/a.vwaʁ ɑ̃.vi də/',
  'avoir de la chance': '/a.vwaʁ də la ʃɑ̃s/',
  'avoir le temps': '/a.vwaʁ lə tɑ̃/',
  'avoir hâte de': '/a.vwaʁ at də/',
  'avoir raison': '/a.vwaʁ ʁɛ.zɔ̃/',
  'avoir tort': '/a.vwaʁ tɔʁ/',
  'avoir sommeil': '/a.vwaʁ sɔ.mɛj/',
  'être en avance': '/ɛtʁ ɑ̃.n a.vɑ̃s/',
  'être en forme': '/ɛtʁ ɑ̃ fɔʁm/',
  'être prêt': '/ɛtʁ pʁɛ/',
  'être occupé': '/ɛtʁ ɔ.ky.pe/',
  'être désolé': '/ɛtʁ de.zɔ.le/',
  'être surpris': '/ɛtʁ syʁ.pʁi/',
  'faire du sport': '/fɛʁ dy spɔʁ/',
  'faire les courses': '/fɛʁ le kyʁs/',
  'faire la fête': '/fɛʁ la fɛt/',
  'faire la cuisine': '/fɛʁ la kɥi.zin/',
  'faire attention': '/fɛʁ a.tɑ̃.sjɔ̃/',
  'faire la connaissance de': '/fɛʁ la kɔ.nɛ.sɑ̃s də/',
  'faire la queue': '/fɛʁ la kø/',
  'faire la vaisselle': '/fɛʁ la vɛ.sɛl/',
  'faire le ménage': '/fɛʁ lə me.naʒ/',
  'faire la sieste': '/fɛʁ la sjɛst/',
  'prendre une douche': '/pʁɑ̃dʁ yn duʃ/',
  'prendre un bain': '/pʁɑ̃dʁ ɛ̃ bɛ̃/',
  'prendre un café': '/pʁɑ̃dʁ ɛ̃ ka.fe/',
  'prendre son temps': '/pʁɑ̃dʁ sɔ̃ tɑ̃/',
  'prendre le bus': '/pʁɑ̃dʁ lə bys/',
  'prendre une décision': '/pʁɑ̃dʁ yn de.si.zjɔ̃/',
  'tomber amoureux': '/tɔ̃.be a.mu.ʁø/',
  'poser une question': '/po.ze yn kɛs.tjɔ̃/',
  'passer du temps': '/pa.se dy tɑ̃/',
  'passer un examen': '/pa.se ɛ̃.n ɛɡ.za.mɛ̃/',
  "c'est la vie": '/s ɛ la vi/',
  "d'accord": '/d a.kɔʁ/',
  'tout à fait': '/tu t a fɛ/',
  'du coup': '/dy ku/',
  'en tout cas': '/ɑ̃ tu ka/',
  "à tout à l'heure": '/a tu t a l œʁ/',
  'bon voyage': '/bɔ̃ vwa.jaʒ/',
  'bon appétit': '/bɔ̃.n a.pe.ti/',
  'avec plaisir': '/a.vɛk plɛ.ziʁ/',
  'par contre': '/paʁ kɔ̃tʁ/',
  'en plus': '/ɑ̃ plys/',
  'comme ci comme ça': '/kɔm si kɔm sa/',
  'à demain': '/a də.mɛ̃/',
  'à ce soir': '/a sə swaʁ/',
  'en haut': '/ɑ̃ o/',
  'en bas': '/ɑ̃ ba/',
  'en face': '/ɑ̃ fas/',
  'en bus': '/ɑ̃ bys/',
  'en voiture': '/ɑ̃ vwa.tyʁ/',
  'en train': '/ɑ̃ tʁɛ̃/',
  'en ce moment': '/ɑ̃ sə mɔ.mɑ̃/',
  'ce soir': '/sə swaʁ/',
  'demain matin': '/də.mɛ̃ ma.tɛ̃/',
  'hier soir': '/jɛʁ swaʁ/',
  'tous les jours': '/tu le ʒuʁ/',
  'tout le temps': '/tu lə tɑ̃/',
  'un peu de': '/ɛ̃ pø də/',
  'beaucoup de': '/bo.ku də/',
  'trop de': '/tʁo də/',
  'assez de': '/a.se də/',
  'en train de': '/ɑ̃ tʁɛ̃ də/',
  'sur le point de': '/syʁ lə pwɛ̃ də/',
  'au bout de': '/o bu də/',
  'en face de': '/ɑ̃ fas də/',
  'au milieu de': '/o mi.ljø də/',
  'en dessous de': '/ɑ̃ də.su də/',
  'au-dessus de': '/o də.sy də/',
  'à cause de': '/a koz də/',
  'grâce à': '/ɡʁas a/',
  'selon moi': '/sə.lɔ̃ mwa/',
  'à mon avis': '/a mɔ̃.n a.vi/',
  "pour l'instant": '/puʁ l ɛ̃s.tɑ̃/',
  "d'habitude": '/d a.bi.tyd/',
  'en effet': '/ɑ̃.n e.fɛ/',
  'tout de suite': '/tu də swit/',
  "à l'avenir": '/a l a.vniʁ/',
  'par terre': '/paʁ tɛʁ/',
  'au début': '/o de.by/',
  'à la fin': '/a la fɛ̃/',
  'de plus': '/də plys/',
  "d'un côté": '/d ɛ̃ ko.te/',
  "de l'autre côté": '/də l otʁ ko.te/',
  'tout à coup': '/tu t a ku/',
  'en général': '/ɑ̃.n e.fɛ/',
  'en fait': '/ɑ̃ fɛt/',
  'en direct': '/ɑ̃ di.ʁɛkt/',
  'en ligne': '/ɑ̃ liɲ/',
  'en danger': '/ɑ̃ dɑ̃.ʒe/',
  'en sécurité': '/ɑ̃ se.ky.ʁi.te/',
  'en paix': '/ɑ̃ pɛ/',
  'en silence': '/ɑ̃ si.lɑ̃s/',
  'en liberté': '/ɑ̃ li.bɛʁ.te/',
  'en solde': '/ɑ̃ sɔld/',
  'en panne': '/ɑ̃ pan/',
  'en colère': '/ɑ̃ kɔ.lɛʁ/',
  'en cours': '/ɑ̃ kuʁ/',
  'en vacances': '/ɑ̃ va.kɑ̃s/',
  'en ville': '/ɑ̃ vil/',
  'à pied': '/a pje/',
  'à droite': '/a dʁwat/',
  'à gauche': '/a ɡoʃ/',
  'à la maison': '/a la mɛ.zɔ̃/',
  'à la plage': '/a la plaʒ/',
  'à la campagne': '/a la kɑ̃.paɲ/',
  'à la montagne': '/a la mɔ̃.taɲ/',
  'à haute voix': '/a ot vwa/',
  'à plein temps': '/a plɛ̃ tɑ̃/',
  'à temps partiel': '/a tɑ̃ paʁ.sjɛl/',
  'au chaud': '/o ʃo/',
  'au frais': '/o fʁɛ/',
  'au cinéma': '/o si.ne.ma/',
  'au restaurant': '/o ʁɛs.to.ʁɑ̃/',
  'au marché': '/o maʁ.ʃe/',
  'de temps en temps': '/də tɑ̃ z ɑ̃ tɑ̃/',
  'de nouveau': '/də nu.vo/',
  'de près': '/də pʁɛ/',
  'de loin': '/də lwɛ̃/',
  'plus ou moins': '/plys u mwɛ̃/',
  'sans doute': '/sɑ̃ dut/',
  'sur place': '/syʁ plas/',
  'pas de problème': '/pa də pʁɔ.blɛm/',
  'être à l\'heure': '/ɛtʁ a l œʁ/',
  "être d'accord": '/ɛtʁ d a.kɔʁ/',
  'en même temps': '/ɑ̃ mɛm tɑ̃/',
  "c'est-à-dire": '/s ɛ t a diʁ/',
  'en chantant': '/ɑ̃ ʃɑ̃.tɑ̃/',
  'à la fois': '/a la fwa/'
};

// Map COSYlanguages theme/POS to COSYdata target file
function mapToThemeFile(item) {
  const form = (item.form || '').toLowerCase();
  const theme = (item.theme || '').toLowerCase();
  const word = item.word.toLowerCase();
  const fileKey = path.basename(item._file || '').toLowerCase();

  if (word === 'sommeil') return 'body_health.json';

  if (form === 'number') return 'numbers.json';
  if (form === 'preposition') return 'prepositions.json';
  if (form === 'pronoun') return 'pronouns.json';

  if (fileKey === 'nationalities.js' || isProperNoun(word)) return 'nationalities.json';
  if (fileKey === 'weather.js' || theme.includes('weather') || theme.includes('climat')) return 'weather.json';

  if (form === 'phrase' || form === 'expression' || form === 'interjection' || form === 'idiom' ||
      fileKey === 'idioms.js' || fileKey === 'fluency.js' || fileKey === 'quotes.js' || fileKey === 'speaking.js') {
    return 'expressions.json';
  }

  if (fileKey === 'animals.js' || theme.includes('animal') || theme.includes('pet')) return 'animals.json';
  if (fileKey === 'body.js' || theme.includes('body') || theme.includes('health') || theme.includes('anatom')) return 'body_health.json';
  if (fileKey === 'clothes.js' || theme.includes('cloth') || theme.includes('wear') || theme.includes('fashion')) return 'clothes.json';
  if (fileKey === 'colours.js' || theme.includes('colou') || theme.includes('color')) return 'colors.json';
  if (fileKey === 'family.js' || theme.includes('family') || theme.includes('relat')) return 'family.json';
  if (theme.includes('feel') || theme.includes('emot')) return 'feelings.json';
  if (fileKey === 'food_drink.js' || fileKey === 'dishes.js' || theme.includes('food') || theme.includes('drink') || theme.includes('fruit') || theme.includes('vege') || theme.includes('meal')) return 'food_drink.json';
  if (fileKey === 'furniture.js' || theme.includes('house') || theme.includes('home') || theme.includes('furnit') || theme.includes('room')) return 'house_furniture.json';
  if (fileKey === 'jobs.js' || theme.includes('job') || theme.includes('profess') || theme.includes('occup')) return 'jobs.json';
  if (fileKey === 'places.js' || fileKey === 'locations.js' || fileKey === 'travel.js' || theme.includes('place') || theme.includes('transp') || theme.includes('travel') || theme.includes('city') || theme.includes('build')) return 'places_transport.json';
  if (fileKey === 'school.js' || theme.includes('school') || theme.includes('educat') || theme.includes('statio')) return 'school.json';
  if (fileKey === 'time.js' || theme.includes('time') || theme.includes('date') || theme.includes('day') || theme.includes('month') || theme.includes('season')) return 'time.json';
  if (fileKey === 'technology.js' || theme.includes('tech') || theme.includes('comput')) return 'house_furniture.json';

  if (form === 'adjective' || fileKey === 'adjectives.js') {
    if (['happy', 'sad', 'angry', 'afraid', 'feelings', 'emotions'].some(k => theme.includes(k))) return 'feelings.json';
    if (['size', 'dimension', 'describing', 'material'].some(k => theme.includes(k))) return 'general_adjectives.json';
    return 'adjectives.json';
  }

  if (form === 'verb' || fileKey === 'verbs.js') {
    if (['be', 'have', 'can', 'must', 'want', 'may', 'should', 'would'].some(k => word.includes(k))) return 'auxiliary_verbs.json';
    return 'daily_verbs.json';
  }

  if (form === 'adverb' || form === 'conjunction') return 'adverbs_connectors.json';

  return 'common_nouns.json';
}

function processFrenchMigration() {
  console.log('Starting French A1 vocabulary migration...');
  const cosyLangSubDir = path.join(cosyLanguagesDir, 'vocabulary/fr/A1');

  if (!fs.existsSync(cosyLangSubDir)) {
    console.log(`Directory ${cosyLangSubDir} does not exist. Skipping.`);
    return;
  }

  // 1. Read all existing COSYdata FR entries across ALL levels
  const dataWordMap = new Map();
  const dataNormalizedMap = new Map();
  const existingIdsMap = new Map();

  function scanLevelDirs(parentDir) {
    const subdirs = fs.readdirSync(parentDir).filter(d => fs.statSync(path.join(parentDir, d)).isDirectory());
    subdirs.forEach(subdir => {
      const levelDir = path.join(parentDir, subdir);
      const jsonFiles = fs.readdirSync(levelDir).filter(f => f.endsWith('.json') && f !== 'index.json');
      jsonFiles.forEach(file => {
        const filePath = path.join(levelDir, file);
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        content.forEach(entry => {
          if (entry.word) {
            const w = entry.word.trim();
            dataWordMap.set(w.toLowerCase(), { ...entry, _file: file, _levelDir: subdir });
            dataNormalizedMap.set(cleanBase(w), { ...entry, _file: file, _levelDir: subdir });
          }
          if (entry.id) {
            existingIdsMap.set(entry.id, { ...entry, _file: file, _levelDir: subdir });
          }
        });
      });
    });
  }

  scanLevelDirs(cosyDataFrDir);

  console.log(`Existing COSYdata FR words count (across all levels): ${dataWordMap.size}`);

  const nearDuplicatesToSkip = new Set([
    'sûr', 'salé', 'la', 'ou', 'un jour', 's asseoir', "s'asseoir", 'food_drink',
    'être d accord', 'être d\'accord', 'a cote de', 'à côté de', 'a droite', 'à droite',
    'a gauche', 'à gauche', 'a pied', 'à pied', 'a plus tard', 'à plus tard',
    'soeur', 'oeuf', 'oeil'
  ]);

  // 2. Read COSYlanguages JS files
  function walk(dir) {
    let results = [];
    fs.readdirSync(dir).forEach(file => {
      const full = path.join(dir, file);
      if (fs.statSync(full).isDirectory()) results = results.concat(walk(full));
      else if (file.endsWith('.js')) results.push(full);
    });
    return results;
  }

  const jsFiles = walk(cosyLangSubDir);
  const rawEntries = [];

  jsFiles.forEach(fullPath => {
    const code = fs.readFileSync(fullPath, 'utf8');
    const sandbox = { window: {}, module: { exports: {} }, exports: {} };
    try {
      vm.runInNewContext(code, sandbox);
      let list = sandbox.window.vocabularyData?.fr || [];
      if (!list.length && Array.isArray(sandbox.module.exports)) list = sandbox.module.exports;
      list.forEach(item => rawEntries.push({ ...item, _file: fullPath }));
    } catch (e) {
      console.error(`Error in ${fullPath}:`, e.message);
    }
  });

  console.log(`Extracted raw COSYlanguages FR items: ${rawEntries.length}`);

  // Deduplicate rawEntries by word within COSYlanguages
  const uniqueRawMap = new Map();
  rawEntries.forEach(item => {
    if (!item.word || typeof item.word !== 'string') return;
    const w = item.word.trim();
    const wLower = w.toLowerCase();
    if (wLower === 'food_drink' || wLower.includes('food_drink')) return;
    if (!uniqueRawMap.has(wLower)) {
      uniqueRawMap.set(wLower, item);
    }
  });

  console.log(`Unique words in COSYlanguages raw FR data: ${uniqueRawMap.size}`);

  // 3. Filter candidate entries
  const candidateItems = [];

  for (const [wLower, item] of uniqueRawMap.entries()) {
    const rawWord = item.word.trim();
    if (dataWordMap.has(wLower)) continue;
    if (nearDuplicatesToSkip.has(wLower)) continue;
    if (dataNormalizedMap.has(cleanBase(rawWord))) continue;
    candidateItems.push(item);
  }

  console.log(`Candidate FR items to convert and migrate: ${candidateItems.length}`);

  // 4. Convert candidate items to COSYdata schema
  const targetA0A1Dir = path.join(cosyDataFrDir, 'a0_a1');
  const a0a1Files = fs.readdirSync(targetA0A1Dir).filter(f => f.endsWith('.json') && f !== 'index.json');

  const convertedByFile = {};
  a0a1Files.forEach(f => { convertedByFile[f] = []; });

  candidateItems.forEach(item => {
    const rawWord = item.word.trim();
    const slug = slugify(rawWord);
    let form = (item.form || 'noun').toLowerCase();
    if (form === 'expression' || form === 'interjection' || form === 'idiom') form = 'phrase';
    if (form === 'conjunction') form = 'adverb';

    const fileKey = path.basename(item._file || '').toLowerCase();
    if (fileKey === 'idioms.js' || fileKey === 'social.js' || fileKey === 'fluency.js' || fileKey === 'quotes.js' || fileKey === 'speaking.js') {
      if (item.form === 'noun' && !rawWord.includes(' ')) {
        form = 'noun';
      } else {
        form = 'phrase';
      }
    }

    if (form === 'noun' && rawWord.includes(' ') && !rawWord.startsWith('un ') && !rawWord.startsWith('une ') && !rawWord.startsWith('le ') && !rawWord.startsWith('la ')) {
      if (rawWord.split(' ').length >= 3 || rawWord.startsWith('a ') || rawWord.startsWith('à ') || rawWord.startsWith('en ') || rawWord.startsWith('par ')) {
        form = 'phrase';
      }
    }

    let posForId = form;

    let entryId = `fr:${slug}:${posForId}`;
    if (existingIdsMap.has(entryId)) {
      let counter = 1;
      while (existingIdsMap.has(`fr:${slug}-${counter}:${posForId}`)) {
        counter++;
      }
      entryId = `fr:${slug}-${counter}:${posForId}`;
    }
    existingIdsMap.set(entryId, { id: entryId, word: rawWord });

    const curated = curatedMetadata[slug] || curatedMetadata[rawWord.toLowerCase()] || {};

    // Definitions
    let defs = [];
    if (curated.def) {
      defs = [curated.def];
    } else {
      if (Array.isArray(item.definitions)) {
        item.definitions.forEach(d => {
          if (typeof d === 'string' && d.trim()) defs.push(fixFrenchElisions(d.trim()));
          else if (d && typeof d.text === 'string' && d.text.trim()) defs.push(fixFrenchElisions(d.text.trim()));
        });
      } else if (typeof item.definition === 'string' && item.definition.trim()) {
        defs.push(fixFrenchElisions(item.definition.trim()));
      }
    }

    // Replace English definition if present
    if (slug === 'sec' && defs.some(d => d.includes('Without water'))) {
      defs = ["Qui ne contient pas d'eau ou de liquide."];
    }

    if (defs.length === 0) {
      if (form === 'verb') defs = [`Action de ${rawWord.toLowerCase()}.`];
      else if (form === 'adjective') defs = [`Qui présente la caractéristique de ${rawWord.toLowerCase()}.`].map(s => fixFrenchElisions(s));
      else if (form === 'phrase') defs = [`Expression ou tournure courante : ${rawWord}.`];
      else if (isProperNoun(rawWord)) defs = [`Lieu ou personnage célèbre : ${rawWord}.`];
      else defs = [`Terme désignant ${rawWord.toLowerCase()}.`];
    }

    // Examples
    let exes = [];
    if (curated.ex) {
      exes = [curated.ex];
    } else {
      if (Array.isArray(item.definitions)) {
        item.definitions.forEach(d => {
          if (d && Array.isArray(d.examples)) {
            d.examples.forEach(ex => {
              if (typeof ex === 'string' && ex.trim()) {
                const cleanedEx = fixFrenchElisions(ex.trim());
                const wBase = cleanBase(rawWord);
                if (cleanBase(cleanedEx).includes(wBase) || form === 'phrase') {
                  exes.push(cleanedEx);
                }
              }
            });
          }
        });
      }
      if (Array.isArray(item.examples)) {
        item.examples.forEach(ex => {
          if (typeof ex === 'string' && ex.trim()) {
            const cleanedEx = fixFrenchElisions(ex.trim());
            const wBase = cleanBase(rawWord);
            if (cleanBase(cleanedEx).includes(wBase) || form === 'phrase') {
              exes.push(cleanedEx);
            }
          }
        });
      }
    }

    if (exes.length === 0) {
      const fem = item.feminine || rawWord;
      if (form === 'verb') exes = [`Il aime ${rawWord.toLowerCase()} régulièrement.`];
      else if (form === 'adjective') {
        if (['triangulaire', 'rectangulaire', 'ovale', 'carre', 'carré', 'rond'].includes(slug)) {
          const shapeFem = (slug === 'rond' ? 'ronde' : (slug === 'carre' || slug === 'carré' ? 'carrée' : rawWord));
          exes = [`C'est un panneau de forme ${shapeFem}.`];
        } else if (['brumeux', 'orageux', 'pluvieux', 'neigeux', 'ensoleille', 'ensoleillé', 'venteux'].includes(slug)) {
          exes = [`Le temps est particulièrement ${rawWord.toLowerCase()} ce matin.`];
        } else if (['acide', 'sale', 'salé', 'sucre', 'sucré', 'amer'].includes(slug)) {
          exes = [`Ce plat a un goût très ${rawWord.toLowerCase()}.`];
        } else {
          exes = [`C'est une personne très ${fem.toLowerCase()}.`];
        }
      } else if (form === 'phrase') {
        exes = [`${rawWord.charAt(0).toUpperCase() + rawWord.slice(1)}, c'est très important.`];
      } else if (isProperNoun(rawWord)) {
        const cBase = cleanBase(rawWord);
        if (pluralCountries.has(cBase)) {
          exes = [`J'aimerais visiter les ${rawWord} un jour.`];
        } else if (feminineCountries.has(cBase)) {
          exes = [`J'aimerais visiter la ${rawWord} un jour.`];
        } else if (femalePersons.has(cBase) || malePersons.has(cBase)) {
          exes = [`${rawWord} est une figure historique remarquable.`];
        } else {
          exes = [`J'aimerais visiter ${rawWord} un jour.`];
        }
      } else {
        exes = [`Nous utilisons ${rawWord} tous les jours.`];
      }
    }

    // Clean English in examples/antonyms
    exes = exes.map(ex => fixFrenchElisions(ex.replace(/\bShe\b/g, 'Elle').replace(/\bHe\b/g, 'Il').replace(/\bThey\b/g, 'Ils').replace(/\bregularly\b/g, 'régulièrement')));

    const targetFile = mapToThemeFile(item);
    const themeName = targetFile.replace('.json', '');

    // Phonetic IPA lookup fallback
    let ipa = curated.ipa || ipaDictionary[rawWord.toLowerCase()] || ipaDictionary[slug] || normalizeIPA(item.transcription);
    if (!ipa || ipa === `/${slug}/`) {
      ipa = ipaDictionary[rawWord.toLowerCase()] || ipaDictionary[slug];
    }
    if (!ipa) {
      ipa = `/${slug}/`;
    }

    const newEntry = {
      id: entryId,
      word: rawWord,
      language: 'fr',
      form: form,
      level: 'A1',
      transcription: ipa,
      definitions: defs,
      examples: exes,
      domain: 'general',
      theme: themeName,
      updated: '2026-09-21'
    };

    if (item.emoji && typeof item.emoji === 'string' && item.emoji.trim()) {
      newEntry.emoji = item.emoji.trim();
    } else {
      newEntry.no_emoji = true;
    }

    if (Array.isArray(item.antonyms) && item.antonyms.length > 0) {
      const cleanAnts = item.antonyms.filter(a => typeof a === 'string' && a.trim() && a.toLowerCase() !== 'together').map(a => a.trim());
      if (cleanAnts.length > 0) newEntry.antonyms = cleanAnts;
      else newEntry.no_antonym = true;
    } else {
      newEntry.no_antonym = true;
    }

    // Noun specific required fields
    if (form === 'noun') {
      const isProp = isProperNoun(rawWord);
      let gender = curated.gender || item.gender;
      if (femalePersons.has(cleanBase(rawWord)) || feminineCountries.has(cleanBase(rawWord))) {
        gender = 'feminine';
      }
      if (!gender && item.article) {
        const art = item.article.toLowerCase();
        if (['le', 'un', 'du'].includes(art)) gender = 'masculine';
        if (['la', 'une'].includes(art)) gender = 'feminine';
      }
      if (!gender) gender = 'masculine';
      newEntry.gender = gender;

      let article = curated.article || item.article;
      if (femalePersons.has(cleanBase(rawWord)) || malePersons.has(cleanBase(rawWord))) {
        article = undefined; // No article for personal proper names in French
      } else if (feminineCountries.has(cleanBase(rawWord))) {
        article = 'la';
      } else if (pluralCountries.has(cleanBase(rawWord))) {
        article = 'les';
      }
      if (!article && !isProp) {
        if (gender === 'masculine') article = 'le';
        else if (gender === 'feminine') article = 'la';
      }
      if (article && ['l\'', 'l’'].includes(article)) article = "l'";
      if (article) newEntry.article = article;

      if (isProp) {
        newEntry.countability = 'invariable';
      } else {
        let countability = item.countability || 'countable';
        newEntry.countability = countability;

        if (countability === 'countable') {
          let plural = item.plural || item.plural_form;
          if (!plural) {
            if (rawWord.endsWith('s') || rawWord.endsWith('x') || rawWord.endsWith('z')) plural = rawWord;
            else if (rawWord.endsWith('al')) plural = rawWord.slice(0, -2) + 'aux';
            else if (rawWord.endsWith('eau') || rawWord.endsWith('eu')) plural = rawWord + 'x';
            else plural = rawWord + 's';
          }
          newEntry.plural_form = plural;
        }
      }
    }

    if (!convertedByFile[targetFile]) convertedByFile[targetFile] = [];
    convertedByFile[targetFile].push(newEntry);
  });

  // 5. Append new converted entries to COSYdata files
  let totalAdded = 0;
  for (const [file, entries] of Object.entries(convertedByFile)) {
    if (entries.length === 0) continue;
    const filePath = path.join(targetA0A1Dir, file);
    const existingContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const updatedContent = [...existingContent, ...entries];
    fs.writeFileSync(filePath, JSON.stringify(updatedContent, null, 2) + '\n', 'utf8');
    console.log(`Added ${entries.length} entries to a0_a1/${file}`);
    totalAdded += entries.length;
  }

  console.log(`Migration complete for FR! Total new entries added: ${totalAdded}`);
}

processFrenchMigration();
