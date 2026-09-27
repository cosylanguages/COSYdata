const fs = require('fs');
const path = require('path');
const vm = require('vm');

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

// Transliteration helper for Armenian, Georgian, Tatar, Chuvash, Bashkir
function transliterate(text) {
  const map = {
    // Armenian
    'ա': 'a', 'բ': 'b', 'գ': 'g', 'դ': 'd', 'ե': 'e', 'զ': 'z', 'է': 'e', 'ը': 'e', 'թ': 't', 'ժ': 'zh',
    'ի': 'i', 'լ': 'l', 'խ': 'kh', 'ծ': 'ts', 'կ': 'k', 'հ': 'h', 'ձ': 'dz', 'ղ': 'gh', 'ճ': 'ch', 'մ': 'm',
    'յ': 'y', 'ն': 'n', 'շ': 'sh', 'ո': 'o', 'չ': 'ch', 'պ': 'p', 'ջ': 'j', 'ռ': 'r', 'ս': 's', 'վ': 'v',
    'տ': 't', 'ր': 'r', 'ց': 'c', 'ու': 'u', 'փ': 'p', 'ք': 'k', 'օ': 'o', 'ֆ': 'f',
    // Georgian
    'ა': 'a', 'ბ': 'b', 'გ': 'g', 'დ': 'd', 'ე': 'e', 'ვ': 'v', 'ზ': 'z', 'თ': 't', 'ი': 'i', 'კ': 'k',
    'ლ': 'l', 'მ': 'm', 'ნ': 'n', 'ო': 'o', 'პ': 'p', 'ჟ': 'zh', 'რ': 'r', 'ს': 's', 'ტ': 't', 'უ': 'u',
    'ფ': 'p', 'ქ': 'k', 'ღ': 'g', 'ყ': 'q', 'შ': 'sh', 'ჩ': 'ch', 'ც': 'ts', 'ძ': 'dz', 'წ': 'ts', 'ჭ': 'ch',
    'ხ': 'k', 'ჯ': 'j', 'ჰ': 'h',
    // Tatar / Chuvash / Bashkir Cyrillic
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

// Articles dictionary
const articles = {
  de: { "Garten": "der" },
  es: {
    "jardín": "el", "médico": "el", "pie": "el", "profesor": "el", "pizza": "la", "pasta": "la",
    "manzana": "la", "pan": "el", "huevo": "el", "leche": "la", "plátano": "el", "café": "el",
    "té": "el", "agua": "el", "escuela": "la", "camiseta": "la", "pantalones": "los", "zapato": "el",
    "sombrero": "el", "silla": "la", "mesa": "la", "cama": "la", "llave": "la", "teléfono": "el",
    "libro": "el", "bolso": "el", "bolígrafo": "el", "gato": "el", "perro": "el", "mano": "la",
    "pierna": "la", "ojo": "el", "nariz": "la", "boca": "la", "oreja": "la", "madre": "la",
    "padre": "el", "trabajo": "el", "casa": "la", "coche": "el", "autobús": "el", "tren": "el",
    "dinero": "el", "tienda": "la", "familia": "la", "amigo": "el", "día": "el", "semana": "la",
    "comida": "la", "desayuno": "el", "almuerzo": "el", "cena": "la", "mañana": "la", "tarde": "la",
    "noche": "la", "esposo": "el", "esposa": "la", "niño": "el", "sol": "el", "lluvia": "la",
    "idioma": "el", "palabra": "la", "frase": "la", "letra": "la", "nombre": "el", "pregunta": "la",
    "respuesta": "la", "ejemplo": "el", "estudiante": "el", "hogar": "el", "marido": "el",
    "mujer": "la", "puerta": "la", "ventana": "la", "plato": "el", "taza": "la", "vaso": "el",
    "tenedor": "el", "cuchara": "la", "cuchillo": "el", "escritorio": "el", "lámpara": "la",
    "reloj": "el", "espejo": "el", "botella": "la", "caja": "la", "lápiz": "el", "papel": "el",
    "nevera": "la", "horno": "el", "toalla": "la", "sofá": "el", "estante": "el", "champú": "el",
    "peine": "el", "armario": "el", "pared": "la", "suelo": "el", "techo": "el", "país": "el",
    "montaña": "la", "mar": "el", "río": "el", "playa": "la", "bosque": "el", "calle": "la",
    "parque": "el", "puente": "el", "precio": "el", "recibo": "el", "mercado": "el", "tarjeta": "la",
    "bolsa": "la", "cepillo de dientes": "el", "pasta de dientes": "la", "jabón": "el", "mapa": "el"
  },
  pt: {
    "jardim": "o", "médico": "o", "pé": "o", "professor": "o", "pizza": "a", "pasta": "a",
    "maçã": "a", "pão": "o", "ovo": "o", "leite": "o", "banana": "a", "café": "o",
    "chá": "o", "água": "a", "escola": "a", "camiseta": "a", "calças": "as", "sapato": "o",
    "chapéu": "o", "cadeira": "a", "mesa": "a", "cama": "a", "chave": "a", "telefone": "o",
    "livro": "o", "bolsa": "a", "caneta": "a", "gato": "o", "cão": "o", "mão": "a",
    "perna": "a", "olho": "o", "nariz": "o", "boca": "a", "orelha": "a", "mãe": "a",
    "pai": "o", "trabalho": "o", "casa": "a", "carro": "o", "autocarro": "o", "comboio": "o",
    "dinheiro": "o", "loja": "a", "família": "a", "amigo": "o", "dia": "o", "semana": "a",
    "comida": "a", "pequeno-almoço": "o", "almoço": "o", "jantar": "o", "manhã": "a", "tarde": "a",
    "noite": "a", "marido": "o", "esposa": "a", "criança": "a", "sol": "o", "chuva": "a",
    "língua": "a", "palavra": "a", "frase": "a", "letra": "a", "nome": "o", "pergunta": "a",
    "resposta": "a", "exemplo": "o", "estudante": "o", "mulher": "a", "porta": "a", "janela": "a",
    "prato": "o", "chávena": "a", "copo": "o", "garfo": "o", "colher": "a", "faca": "a",
    "secretária": "a", "lâmpada": "a", "relógio": "o", "espelho": "o", "garrafa": "a",
    "caixa": "a", "lápis": "o", "papel": "o", "frigorífico": "o", "forno": "o", "sabão": "o",
    "toalha": "a", "sofá": "o", "estante": "a", "champô": "o", "pente": "o", "armário": "o",
    "parede": "a", "chão": "o", "telhado": "o", "país": "o", "montanha": "a", "mar": "o",
    "rio": "o", "praia": "a", "floresta": "a", "rua": "a", "parque": "o", "ponte": "a",
    "preço": "o", "recibo": "o", "mercado": "o", "cartão": "o", "mala": "a",
    "escova de dentes": "a", "pasta de dentes": "a", "t-shirt": "a", "mapa": "o"
  },
  br: {
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
  }
};

// Gender dictionary
const genders = {
  de: { "Garten": "masculine" },
  es: {
    "jardín": "masculine", "médico": "masculine", "pie": "masculine", "profesor": "masculine", "pizza": "feminine", "pasta": "feminine",
    "manzana": "feminine", "pan": "masculine", "huevo": "masculine", "leche": "feminine", "plátano": "masculine", "café": "masculine",
    "té": "masculine", "agua": "feminine", "escuela": "feminine", "camiseta": "feminine", "pantalones": "masculine", "zapato": "masculine",
    "sombrero": "masculine", "silla": "feminine", "mesa": "feminine", "cama": "feminine", "llave": "feminine", "teléfono": "masculine",
    "libro": "masculine", "bolso": "masculine", "bolígrafo": "masculine", "gato": "masculine", "perro": "masculine", "mano": "feminine",
    "pierna": "feminine", "ojo": "masculine", "nariz": "feminine", "boca": "feminine", "oreja": "feminine", "madre": "feminine",
    "padre": "masculine", "trabajo": "masculine", "casa": "feminine", "coche": "masculine", "autobús": "masculine", "tren": "masculine",
    "dinero": "masculine", "tienda": "feminine", "familia": "feminine", "amigo": "masculine", "día": "masculine", "semana": "feminine",
    "comida": "feminine", "desayuno": "masculine", "almuerzo": "masculine", "cena": "feminine", "mañana": "feminine", "tarde": "feminine",
    "noche": "feminine", "esposo": "masculine", "esposa": "feminine", "niño": "masculine", "sol": "masculine", "lluvia": "feminine",
    "idioma": "masculine", "palabra": "feminine", "frase": "feminine", "letra": "feminine", "nombre": "masculine", "pregunta": "feminine",
    "respuesta": "feminine", "ejemplo": "masculine", "estudiante": "masculine", "hogar": "masculine", "marido": "masculine",
    "mujer": "feminine", "puerta": "feminine", "ventana": "feminine", "plato": "masculine", "taza": "feminine", "vaso": "masculine",
    "tenedor": "masculine", "cuchara": "feminine", "cuchillo": "masculine", "escritorio": "masculine", "lámpara": "feminine",
    "reloj": "masculine", "espejo": "masculine", "botella": "feminine", "caja": "feminine", "lápiz": "masculine", "papel": "masculine",
    "nevera": "feminine", "horno": "masculine", "toalla": "feminine", "sofá": "masculine", "estante": "masculine", "champú": "masculine",
    "peine": "masculine", "armario": "masculine", "pared": "feminine", "suelo": "masculine", "techo": "masculine", "país": "masculine",
    "montaña": "feminine", "mar": "masculine", "río": "masculine", "playa": "feminine", "bosque": "masculine", "calle": "feminine",
    "parque": "masculine", "puente": "masculine", "precio": "masculine", "recibo": "masculine", "mercado": "masculine", "tarjeta": "feminine",
    "bolsa": "feminine", "cepillo de dientes": "masculine", "pasta de dientes": "feminine", "jabón": "masculine", "mapa": "masculine"
  },
  pt: {
    "jardim": "masculine", "médico": "masculine", "pé": "masculine", "professor": "masculine", "pizza": "feminine", "pasta": "feminine",
    "maçã": "feminine", "pão": "masculine", "ovo": "masculine", "leite": "masculine", "banana": "feminine", "café": "masculine",
    "chá": "masculine", "água": "feminine", "escola": "feminine", "camiseta": "feminine", "calças": "feminine", "sapato": "masculine",
    "chapéu": "masculine", "cadeira": "feminine", "mesa": "feminine", "cama": "feminine", "chave": "feminine", "telefone": "masculine",
    "livro": "masculine", "bolsa": "feminine", "caneta": "feminine", "gato": "masculine", "cão": "masculine", "mão": "feminine",
    "perna": "feminine", "olho": "masculine", "nariz": "masculine", "boca": "feminine", "orelha": "feminine", "mãe": "feminine",
    "pai": "masculine", "trabalho": "masculine", "casa": "feminine", "carro": "masculine", "autocarro": "masculine", "comboio": "masculine",
    "dinheiro": "masculine", "loja": "feminine", "família": "feminine", "amigo": "masculine", "dia": "masculine", "semana": "feminine",
    "comida": "feminine", "pequeno-almoço": "masculine", "almoço": "masculine", "jantar": "masculine", "manhã": "feminine", "tarde": "feminine",
    "noite": "feminine", "marido": "masculine", "esposa": "feminine", "criança": "feminine", "sol": "masculine", "chuva": "feminine",
    "língua": "feminine", "palavra": "feminine", "frase": "feminine", "letra": "feminine", "nome": "masculine", "pregunta": "feminine",
    "resposta": "feminine", "exemplo": "masculine", "estudante": "masculine", "mulher": "feminine", "porta": "feminine", "janela": "feminine",
    "prato": "masculine", "chávena": "feminine", "copo": "masculine", "garfo": "masculine", "colher": "feminine", "faca": "feminine",
    "secretária": "feminine", "lâmpada": "feminine", "relógio": "masculine", "espelho": "masculine", "garrafa": "feminine",
    "caixa": "feminine", "lápis": "masculine", "papel": "masculine", "frigorífico": "masculine", "forno": "masculine", "sabão": "masculine",
    "toalha": "feminine", "sofá": "masculine", "estante": "feminine", "champô": "masculine", "pente": "masculine", "armário": "masculine",
    "parede": "feminine", "chão": "masculine", "telhado": "masculine", "país": "masculine", "montanha": "feminine", "mar": "masculine",
    "rio": "masculine", "praia": "feminine", "floresta": "feminine", "rua": "feminine", "parque": "masculine", "ponte": "feminine",
    "preço": "masculine", "recibo": "masculine", "mercado": "masculine", "cartão": "masculine", "mala": "feminine",
    "escova de dentes": "feminine", "pasta de dentes": "feminine", "t-shirt": "feminine", "mapa": "masculine"
  },
  br: {
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
  }
};

// Phonetic IPA transcriptions dictionary
const ipaDict = {
  de: {
    "Garten": "/ˈɡaʁtn̩/", "Arzt": "/aʁtsːt/", "Fuß": "/fuːs/", "Lehrer": "/ˈleːʁɐ/", "Pizza": "/ˈpɪtsa/",
    "Pasta": "/ˈpasta/", "Apfel": "/ˈapfl̩/", "Brot": "/bʁoːt/", "Ei": "/aɪ̯/", "Milch": "/mɪlç/",
    "Banane": "/baˈnaːnə/", "Kaffee": "/ˈkafe/", "Tee": "/teː/", "Wasser": "/ˈvasɐ/", "Schule": "/ˈʃuːlə/",
    "T-Shirt": "/ˈtiːʃœːt/", "Hose": "/ˈhoːzə/", "Schuh": "/ʃuː/", "Hut": "/huːt/", "Stuhl": "/ʃtuːl/",
    "Tisch": "/tɪʃ/", "Bett": "/bɛt/", "Schlüssel": "/ˈʃlʏsl̩/", "Telefon": "/teləˈfoːn/", "Buch": "/buːx/",
    "Tasche": "/ˈtaʃə/", "Stift": "/ʃtɪft/", "Katze": "/ˈkatsə/", "Hund": "/hʊnt/", "Hand": "/hant/",
    "Bein": "/baɪ̯n/", "Auge": "/ˈaʊ̯ɡə/", "Nase": "/ˈnaːzə/", "Mund": "/mʊnt/", "Ohr": "/oːɐ̯/",
    "Mutter": "/ˈmʊtɐ/", "Vater": "/ˈfaːtɐ/", "Arbeit": "/ˈaʁbaɪ̯t/", "Zuhause": "/tsuˈhaʊ̯zə/", "Auto": "/ˈaʊ̯to/",
    "Bus": "/bʊs/", "Zug": "/tsuːk/", "Geld": "/ɡɛlt/", "Geschäft": "/ɡəˈʃɛft/", "Familie": "/faˈmiːli̯ə/",
    "Freund": "/fʁɔɪ̯nt/", "Tag": "/taːk/", "Woche": "/ˈvɔxə/", "Essen": "/ˈɛsn̩/", "Frühstück": "/ˈfʁyːʃtʏk/",
    "Mittagessen": "/ˈmɪtaːkˌɛsn̩/", "Abendessen": "/ˈaːbn̩tˌɛsn̩/", "Morgen": "/ˈmɔʁɡn̩/", "morgen": "/ˈmɔʁɡn̩/",
    "Abend": "/ˈaːbn̩t/", "Nacht": "/naxt/", "Heute": "/ˈhɔɪ̯tə/", "heute": "/ˈhɔɪ̯tə/", "Ehemann": "/ˈeːəˌman/",
    "Ehefrau": "/ˈeːəˌfʁaʊ̯/", "Kind": "/kɪnt/", "Sonne": "/ˈzɔnə/", "Regen": "/ˈʁeːɡn̩/"
  },
  es: {
    "jardín": "/xaɾˈðin/", "médico": "/ˈmeðiko/", "pie": "/ˈpje/", "profesor": "/pɾofeˈsoɾ/", "pizza": "/ˈpitsa/",
    "pasta": "/ˈpasta/", "manzana": "/manˈsana/", "pan": "/pan/", "huevo": "/ˈweβo/", "leche": "/ˈletʃe/",
    "plátano": "/ˈplatano/", "café": "/kaˈfe/", "té": "/te/", "agua": "/ˈaɣwa/", "escuela": "/esˈkwela/",
    "camiseta": "/kamiˈseta/", "pantalones": "/pantaˈlones/", "zapato": "/saˈpato/", "sombrero": "/somˈbɾeɾo/",
    "silla": "/ˈsi.ʝa/", "mesa": "/ˈme.sa/", "cama": "/ˈka.ma/", "llave": "/ˈʎaβe/", "teléfono": "/teˈlefono/",
    "libro": "/ˈli.βɾo/", "bolso": "/ˈbolso/", "bolígrafo": "/boˈliɣɾafo/", "gato": "/ˈɡato/", "perro": "/ˈpero/",
    "mano": "/ˈmano/", "pierna": "/ˈpjeɾna/", "ojo": "/ˈoxo/", "nariz": "/naˈɾis/", "boca": "/ˈboka/",
    "oreja": "/oˈɾexa/", "madre": "/ˈmaðɾe/", "padre": "/ˈpaðɾe/", "trabajo": "/tɾaˈβaxo/", "casa": "/ˈkasa/",
    "coche": "/ˈkotʃe/", "autobús": "/awtoˈβus/", "tren": "/tɾen/", "dinero": "/diˈneɾo/", "tienda": "/ˈtjenda/",
    "familia": "/faˈmilja/", "amigo": "/aˈmiɣo/", "día": "/ˈdi.a/", "semana": "/seˈmana/", "comida": "/koˈmiða/",
    "desayuno": "/desaˈʒuno/", "almuerzo": "/alˈmweɾso/", "cena": "/ˈsena/", "mañana": "/maˈɲana/", "tarde": "/ˈtaɾðe/",
    "noche": "/ˈnotʃe/", "hoy": "/oj/", "esposo": "/esˈposo/", "esposa": "/esˈposa/", "niño": "/ˈniɲo/",
    "sol": "/sol/", "lluvia": "/ˈʎuβja/", "hola": "/ˈola/", "adiós": "/aˈðjos/", "por favor": "/poɾ faˈβoɾ/",
    "gracias": "/ˈɡɾasjas/", "de nada": "/de ˈnaða/", "sí": "/si/", "no": "/no/", "disculpe": "/disˈkulpe/",
    "lo siento": "/lo ˈsjento/", "buenos días": "/ˈbwenoz ˈdi.as/", "buenas tardes": "/ˈbwenas ˈtaɾðes/",
    "buenas noches": "/ˈbwenaz ˈnotʃes/", "¿cómo estás?": "/ˈkomo esˈtas/", "mucho gusto": "/ˈmutʃo ˈɡusto/",
    "bienvenido": "/bjembeˈniðo/", "idioma": "/iˈðjoma/", "palabra": "/paˈlaβɾa/", "frase": "/ˈfɾase/",
    "letra": "/ˈletɾa/", "nombre": "/ˈnombɾe/", "pregunta": "/pɾeˈɣunta/", "respuesta": "/resˈpwesta/",
    "ejemplo": "/eˈxemplo/", "estudiante": "/estuˈðjante/", "hogar": "/oˈɣaɾ/", "marido": "/maˈɾiðo/",
    "mujer": "/muˈxeɾ/", "puerta": "/ˈpweɾta/", "ventana": "/benˈtana/", "plato": "/ˈplato/", "taza": "/ˈtasa/",
    "vaso": "/ˈbaso/", "tenedor": "/teneˈðoɾ/", "cuchara": "/kuˈtʃaɾa/", "cuchillo": "/kuˈtʃiʎo/", "escritorio": "/eskɾiˈtoɾjo/",
    "lámpara": "/ˈlampaɾa/", "reloj": "/reˈlox/", "espejo": "/esˈpexo/", "botella": "/boˈteʎa/", "caja": "/ˈkaxa/",
    "lápiz": "/ˈlapis/", "papel": "/paˈpel/", "nevera": "/neˈβeɾa/", "horno": "/ˈoɾno/", "toalla": "/toˈaʎa/",
    "sofá": "/soˈfa/", "estante": "/esˈtante/", "champú": "/tʃamˈpu/", "peine": "/ˈpejne/", "armario": "/aɾˈmaɾjo/",
    "pared": "/paˈɾeð/", "suelo": "/ˈswelo/", "techo": "/ˈtetʃo/", "país": "/paˈis/", "montaña": "/monˈtaɲa/",
    "mar": "/maɾ/", "río": "/ˈri.o/", "playa": "/ˈplaʝa/", "bosque": "/ˈboske/", "calle": "/ˈkaʎe/",
    "parque": "/ˈpaɾke/", "puente": "/ˈpwente/", "precio": "/ˈpɾesjo/", "recibo": "/ˈresjβo/", "mercado": "/meɾˈkaðo/",
    "tarjeta": "/taɾˈxeta/", "bolsa": "/ˈbolsa/", "cepillo de dientes": "/seˈpiʎo ðe ˈðjentes/", "pasta de dientes": "/ˈpasta ðe ˈðjentes/",
    "jabón": "/xaˈβon/", "mapa": "/ˈmapa/", "regalo": "/reˈɣalo/", "perdón": "/peɾˈdon/", "quién": "/kjen/",
    "dónde": "/ˈdonde/", "cuándo": "/ˈkwando/", "qué": "/ke/", "por qué": "/poɾ ˈke/", "cómo": "/ˈkomo/", "cuántos": "/ˈkwantos/"
  },
  pt: {
    "jardim": "/ʒaʁˈdĩ/", "médico": "/ˈmɛdiku/", "pé": "/pɛ/", "professor": "/pɾufeˈsoɾ/", "pizza": "/ˈpitsa/",
    "pasta": "/ˈpaʃtɐ/", "maçã": "/mɐˈsɐ̃/", "pão": "/pɐ̃w̃/", "ovo": "/ˈovu/", "leite": "/ˈlejtɨ/",
    "banana": "/bɐˈnɐnɐ/", "café": "/kɐˈfɛ/", "chá": "/ʃa/", "água": "/ˈaɡwɐ/", "escola": "/ɨʃˈkɔlɐ/",
    "camiseta": "/kɐmiˈzetɐ/", "calças": "/ˈkaɫsɐʃ/", "sapato": "/sɐˈpatu/", "chapéu": "/ʃɐˈpɛw/",
    "cadeira": "/kɐˈdɐjɾɐ/", "mesa": "/ˈmezɐ/", "cama": "/ˈkɐmɐ/", "chave": "/ˈʃavɨ/", "telefone": "/tɨlɨˈfɔnɨ/",
    "livro": "/ˈlivɾu/", "bolsa": "/ˈboɫsɐ/", "caneta": "/kɐˈnetɐ/", "gato": "/ˈgatu/", "cão": "/kɐ̃w̃/",
    "mão": "/mɐ̃w̃/", "perna": "/ˈpɛɾnɐ/", "olho": "/ˈoʎu/", "nariz": "/nɐˈɾiʃ/", "boca": "/ˈbokɐ/",
    "orelha": "/oˈɾeʎɐ/", "mãe": "/mɐ̃j̃/", "pai": "/paj/", "trabalho": "/tɾɐˈbaʎu/", "casa": "/ˈkazɐ/",
    "carro": "/ˈkaʁu/", "autocarro": "/awtɔˈkaʁu/", "comboio": "/kõˈbɔju/", "dinheiro": "/diˈɲejɾu/", "loja": "/ˈlɔʒɐ/",
    "família": "/fɐˈmiljɐ/", "amigo": "/ɐˈmiɡu/", "dia": "/ˈdiɐ/", "semana": "/sɨˈmɐnɐ/", "comida": "/kuˈmidɐ/",
    "pequeno-almoço": "/pɨˈkenwɐɫˈmosu/", "almoço": "/aɫˈmosu/", "jantar": "/ʒɐ̃ˈtaɾ/", "manhã": "/mɐˈɲɐ̃/",
    "tarde": "/ˈtaɾdɨ/", "noite": "/ˈnojtɨ/", "hoje": "/ˈoʒɨ/", "amanhã": "/ɐmɐˈɲɐ̃/", "marido": "/mɐˈɾidu/",
    "esposa": "/ɨʃˈpozɐ/", "criança": "/kɾiˈɐ̃sɐ/", "sol": "/sɔɫ/", "chuva": "/ˈʃuvɐ/", "olá": "/oˈla/",
    "adeus": "/ɐˈdewʃ/", "por favor": "/puɾ fɐˈvoɾ/", "obrigado": "/ubɾiˈɡadu/", "de nada": "/dɨ ˈnadɐ/",
    "sim": "/sĩ/", "não": "/nɐ̃w̃/", "com licença": "/kõ liˈsẽsɐ/", "desculpe": "/dɨʃˈkuɫpɨ/", "bom dia": "/bõ ˈdiɐ/",
    "boa tarde": "/ˈboɐ ˈtaɾdɨ/", "boa noite": "/ˈboɐ ˈnojtɨ/", "como está?": "/ˈkomu iʃˈta/", "muito prazer": "/ˈmũjtu pɾɐˈzeɾ/",
    "bem-vindo": "/bẽj ˈvĩdu/", "língua": "/ˈlĩɡwɐ/", "palavra": "/pɐˈlavɾɐ/", "frase": "/ˈfɾazɨ/", "letra": "/ˈletɾɐ/",
    "nome": "/ˈnomɨ/", "pregunta": "/pɨɾˈɡũtɐ/", "resposta": "/ʁɨʃˈpɔʃtɐ/", "exemplo": "/iˈzẽplu/", "estudante": "/ɨʃtuˈdɐ̃tɨ/",
    "mulher": "/muˈʎɛɾ/", "porta": "/ˈpɔɾtɐ/", "janela": "/ʒɐˈnɛlɐ/", "prato": "/ˈpɾatu/", "chávena": "/ˈʃavɨnɐ/",
    "copo": "/ˈkɔpu/", "garfo": "/ˈɡaɾfu/", "colher": "/kuˈʎɛɾ/", "faca": "/ˈfakɐ/", "secretária": "/sɨkɾɨˈtaɾjɐ/",
    "lâmpada": "/ˈlɐ̃pɐdɐ/", "relógio": "/ʁɨˈlɔʒju/", "espelho": "/ɨʃˈpɨʎu/", "garrafa": "/ɡɐˈʁafɐ/", "caixa": "/ˈkajʃɐ/",
    "lápis": "/ˈlapiʃ/", "papel": "/pɐˈpɛɫ/", "frigorífico": "/fɾiɡuˈɾifiku/", "forno": "/ˈfoɾnu/", "sabão": "/sɐˈbɐ̃w̃/",
    "toalha": "/tuˈaʎɐ/", "sofá": "/suˈfa/", "estante": "/ɨʃˈtɐ̃tɨ/", "champô": "/ʃɐ̃ˈpo/", "pente": "/ˈpẽtɨ/",
    "armário": "/ɐɾˈmaɾju/", "parede": "/pɐˈɾedɨ/", "chão": "/ʃɐ̃w̃/", "telhado": "/tɨˈʎadu/", "país": "/pɐˈiʃ/",
    "montanha": "/mõˈtɐɲɐ/", "mar": "/maɾ/", "rio": "/ˈʁiu/", "praia": "/ˈpɾajɐ/", "floresta": "/fluˈɾɛʃtɐ/",
    "rua": "/ˈʁuɐ/", "parque": "/ˈpaɾkɨ/", "ponte": "/ˈpõtɨ/", "preço": "/ˈpɾesu/", "recibo": "/ʁɨˈsibu/",
    "mercado": "/mɨɾˈkadu/", "cartão": "/kɐɾˈtɐ̃w̃/", "mala": "/ˈmalɐ/", "escova de dentes": "/ɨʃˈkovɐ dɨ ˈdẽtɨʃ/",
    "pasta de dentes": "/ˈpaʃtɐ dɨ ˈdẽtɨʃ/", "t-shirt": "/ˈtiʃœɾt/", "mapa": "/ˈmapɐ/", "massa": "/ˈmasɐ/",
    "o quê": "/u ˈke/", "porquê": "/puɾˈke/", "como": "/ˈkomu/", "quantos": "/ˈkwɐ̃tuʃ/"
  },
  ba: {
    "баҡса": "/baqˈsa/", "врач": "/vratʃ/", "аяҡ": "/aˈjaq/", "уҡытыусы": "/uqɯtɯwˈsɯ/",
    "пицца": "/ˈpitsa/", "паста": "/ˈpasta/", "алма": "/alˈma/", "икмәк": "/ikˈmæk/",
    "йомырҡа": "/jomɯrˈqa/", "йомортҡа": "/jomɯrˈqa/", "hөт": "/høt/", "һөт": "/høt/", "банан": "/baˈnan/",
    "кофе": "/ˈkofe/", "сәй": "/sæj/", "һыу": "/hɯw/", "мәктәп": "/mækˈtæp/", "футболка": "/futˈbolka/",
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
    "бөгөн": "/bøˈɡøn/", "иртәгә": "/irˈtæɡæ/", "ир": "/ir/", "ҡояш": "/qoˈjaʃ/", "салбар": "/salˈbar/"
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
  },
  hy: {
    "այգի": "/ajˈgi/", "բժիշկ": "/bəˈʒiʃk/", "ոտք": "/votkʰ/", "ուսուցիչ": "/usuˈtsʰitʃʰ/",
    "պիցցա": "/piˈtsa/", "պաստա": "/pasˈta/", "խնձոր": "/khənˈdzɔɾ/", "հաց": "/hatsʰ/",
    "ձու": "/dzu/", "կաթ": "/katʰ/", "բանան": "/baˈnan/", "սուրճ": "/suɾtʃʰ/",
    "թեյ": "/tʰɛj/", "ջուր": "/dʒuɾ/", "դպրոց": "/dəpˈɾɔtsʰ/", "շապիկ": "/ʃaˈpik/",
    "տաբատ": "/taˈbat/", "կոշիկ": "/kɔˈʃik/", "գլխարկ": "/ɡəlˈxaɾk/", "աթոռ": "/aˈtʰɔɾ/",
    "սեղան": "/sɛˈghan/", "մահճակալ": "/mahtʃʰaˈkal/", "բանալի": "/banaˈli/", "հեռախոս": "/hɛraˈxɔs/",
    "գիրք": "/ɡiɾkʰ/", "պայուսակ": "/pajuˈsak/", "գրիչ": "/ɡəˈɾitʃʰ/", "կատու": "/kaˈtu/",
    "շուն": "/ʃun/", "ձեռք": "/dzɛɾkʰ/", "աչք": "/atʃʰkʰ/", "քիթ": "/kʰitʰ/",
    "բերան": "/bɛˈran/", "ականջ": "/akanˈdʒ/", "մայր": "/majɾ/", "հայր": "/hajɾ/",
    "աշխատանք": "/aʃxaˈtankʰ/", "տուն": "/tun/", "մեքենա": "/mɛkʰɛˈna/", "ավտոբուս": "/avtɔˈbus/",
    "գնացք": "/ɡəˈnatsʰkʰ/", "փող": "/pʰɔgh/", "խանութ": "/xaˈnutʰ/", "ընտանիք": "/ənˈtanikʰ/",
    "ընկեր": "/ənˈkɛɾ/", "օր": "/ɔɾ/", "շաբաթ": "/ʃaˈbatʰ/", "ուտելիք": "/utɛˈlikʰ/",
    "նախաճաշ": "/naxaˈtʃaʃ/", "ճաշ": "/tʃaʃ/", "ընթրիք": "/ənˈtʰɾikʰ/", "առավոտ": "/araˈvɔt/",
    "երեկո": "/ɛɾɛˈkɔ/", "գիշեր": "/ɡiˈʃɛɾ/", "այսօր": "/ajˈsɔɾ/", "վաղը": "/vaˈghə/",
    "ամուսին": "/amuˈsin/", "կին": "/kin/", "երեխա": "/ɛɾɛˈxa/", "արև": "/aˈɾɛv/", "անձրև": "/andzˈɾɛv/"
  },
  ka: {
    "ბაღი": "/baɣi/", "ექიმი": "/ekimi/", "ფეხი": "/peki/", "მასწავლებელი": "/mastsavlebeli/",
    "პიცა": "/pitsa/", "პასტა": "/pasta/", "ვაშლი": "/vashli/", "პური": "/puri/",
    "კვერცხი": "/kvertski/", "რძე": "/rdze/", "ბანანი": "/banani/", "ყავა": "/qava/",
    "ჩაი": "/chai/", "წყალი": "/tsqali/", "სკოლა": "/skola/", "მაისური": "/maisuri/",
    "შარვალი": "/sharvali/", "ფეხსაცმელი": "/peksatsmeli/", "ქუდი": "/kudi/", "სკამი": "/skami/",
    "მაგიდა": "/magida/", "საწოლი": "/satsoli/", "გასაღები": "/gasagebi/", "ტელეფონი": "/telefoni/",
    "წიგნი": "/tsigni/", "ჩანთა": "/chanta/", "კალამი": "/kalami/", "კატა": "/kata/",
    "ძაღლი": "/dzagli/", "ხელი": "/keli/", "თვალი": "/tvali/", "ცხვირი": "/tskviri/",
    "პირი": "/piri/", "ყური": "/quri/", "დედა": "/deda/", "მამა": "/mama/",
    "მუშაობა": "/mushaoba/", "სახლი": "/sakli/", "მანქანა": "/manqana/", "ავტობუსი": "/avtobusi/",
    "მატარებელი": "/matarebeli/", "ფული": "/puli/", "მაღაზია": "/magazia/", "ოჯახი": "/ojaki/",
    "მეგობარი": "/megobari/", "დღე": "/dge/", "კვირა": "/kvira/", "საჭმელი": "/satsmeli/",
    "საუზმე": "/sauzme/", "სადილი": "/sadili/", "ვახშამი": "/vaksami/", "დილა": "/dila/",
    "საღამო": "/sagamo/", "ღამე": "/game/", "დღეს": "/dges/", "ხვალ": "/hval/",
    "ქმარი": "/kmari/", "ცოლი": "/tsoli/", "ბავშვი": "/bavshvi/", "მზე": "/mze/", "წვიმა": "/tsvima/"
  },
  tt: {
    "бакча": "/baqˈtʃa/", "врач": "/vratʃ/", "аяк": "/aˈjaq/", "укытучы": "/uqɯtuˈtʃɯ/",
    "пицца": "/ˈpitsa/", "паста": "/ˈpasta/", "алма": "/alˈma/", "икмәк": "/ikˈmæk/",
    "йомырка": "/jomɯrˈqa/", "сөт": "/søyt/", "банан": "/baˈnan/", "кофе": "/ˈkofe/",
    "чәй": "/tʃæj/", "су": "/su/", "мәктәп": "/mækˈtæp/", "футболка": "/futˈbolka/",
    "чалбар": "/tʃalˈbar/", "аяк киеме": "/aˈjaq kijeˈme/", "баш киеме": "/baʃ kijeˈme/", "урындык": "/urɯnˈdɯq/",
    "өстәл": "/østæl/", "карават": "/karaˈvat/", "ачкыч": "/atʃˈqɯtʃ/", "телефон": "/teleˈfon/",
    "китап": "/kiˈtap/", "сумка": "/sumˈka/", "ручка": "/rutʃˈka/", "мәче": "/mæˈtʃe/",
    "эт": "/et/", "кул": "/qul/", "борын": "/boˈrɯn/", "авыз": "/aˈvɯz/",
    "колак": "/qoˈlaq/", "әни": "/æˈni/", "әти": "/æˈti/", "эш": "/eʃ/",
    "өй": "/øy/", "машина": "/maˈʃina/", "автобус": "/avˈtobus/", "поезд": "/poˈjazd/",
    "акча": "/aqˈtʃa/", "кибет": "/kiˈbet/", "гаилә": "/ʁa.iˈlæ/", "дус": "/dus/",
    "көн": "/køn/", "атна": "/atˈna/", "ризык": "/riˈzɯq/", "иртәнге аш": "/irˈtænɡe aʃ/",
    "төшке аш": "/tøʃˈke aʃ/", "кичке аш": "/kitʃˈke aʃ/", "иртә": "/irˈtæ/", "кич": "/kitʃ/",
    "төн": "/tøn/", "бүген": "/byˈɡen/", "иртәгә": "/irˈtæɡæ/", "ир": "/ir/",
    "хатын": "/xaˈtɯn/", "бала": "/baˈla/", "кояш": "/qoˈjaʃ/", "яңгыр": "/jaŋˈʁɯr/"
  }
};

// Plural forms dictionary
const plurals = {
  de: {
    "Garten": "Gärten", "Arzt": "Ärzte", "Fuß": "Füße", "Lehrer": "Lehrer",
    "Pizza": "Pizzen", "Pasta": "Pasten", "Apfel": "Äpfel", "Brot": "Brote",
    "Ei": "Eier", "Banane": "Bananen", "Kaffee": "Kaffees", "Tee": "Tees",
    "Schule": "Schulen", "T-Shirt": "T-Shirts", "Hose": "Hosen", "Schuh": "Schuhe",
    "Hut": "Hüte", "Stuhl": "Stühle", "Tisch": "Tische", "Bett": "Betten",
    "Schlüssel": "Schlüssel", "Telefon": "Telefone", "Buch": "Bücher", "Tasche": "Taschen",
    "Stift": "Stifte", "Katze": "Katzen", "Hund": "Hunde", "Hand": "Hände",
    "Bein": "Beine", "Auge": "Augen", "Nase": "Nasen", "Mund": "Münder",
    "Ohr": "Ohren", "Mutter": "Mütter", "Vater": "Väter", "Arbeit": "Arbeiten",
    "Zuhause": "Zuhause", "Auto": "Autos", "Bus": "Busse", "Zug": "Züge",
    "Geschäft": "Geschäfte", "Familie": "Familien", "Freund": "Freunde", "Tag": "Tage",
    "Woche": "Wochen", "Essen": "Essen", "Frühstück": "Frühstücke", "Mittagessen": "Mittagessen",
    "Abendessen": "Abendessen", "Morgen": "Morgen", "Abend": "Abende", "Nacht": "Nächte",
    "Ehemann": "Ehemänner", "Ehefrau": "Ehefrauen", "Kind": "Kinder", "Sonne": "Sonnen", "Regen": "Regen"
  },
  es: {
    "jardín": "jardines", "médico": "médicos", "pie": "pies", "profesor": "profesores",
    "pizza": "pizzas", "pasta": "pastas", "manzana": "manzanas", "pan": "panes",
    "huevo": "huevos", "plátano": "plátanos", "café": "cafés", "té": "tés",
    "escuela": "escuelas", "camiseta": "camisetas", "pantalones": "pantalones", "zapato": "zapatos",
    "sombrero": "sombreros", "silla": "sillas", "mesa": "mesas", "cama": "camas",
    "llave": "llaves", "teléfono": "teléfonos", "libro": "libros", "bolso": "bolsos",
    "bolígrafo": "bolígrafos", "gato": "gatos", "perro": "perros", "mano": "manos",
    "pierna": "piernas", "ojo": "ojos", "nariz": "narices", "boca": "bocas",
    "oreja": "orejas", "madre": "madres", "padre": "padres", "trabajo": "trabajos",
    "casa": "casas", "coche": "coches", "autobús": "autobuses", "tren": "trenes",
    "tienda": "tiendas", "familia": "familias", "amigo": "amigos", "día": "días",
    "semana": "semanas", "comida": "comidas", "desayuno": "desayunos", "almuerzo": "almuerzos",
    "cena": "cenas", "mañana": "mañanas", "tarde": "tardes", "noche": "noches",
    "esposo": "esposos", "esposa": "esposas", "niño": "niños", "sol": "soles",
    "lluvia": "lluvias", "idioma": "idiomas", "palabra": "palabras", "frase": "frases",
    "letra": "letras", "nombre": "nombres", "pregunta": "preguntas", "respuesta": "respuestas",
    "ejemplo": "ejemplos", "estudiante": "estudiantes", "hogar": "hogares", "marido": "maridos",
    "mujer": "mujeres", "puerta": "puertas", "ventana": "ventanas", "plato": "platos",
    "taza": "tazas", "vaso": "vasos", "tenedor": "tenedores", "cuchara": "cucharas",
    "cuchillo": "cuchillos", "escritorio": "escritorios", "lámpara": "lámparas", "reloj": "relojes",
    "espejo": "espejos", "botella": "botellas", "caja": "cajas", "lápiz": "lápices",
    "papel": "papeles", "nevera": "neveras", "horno": "hornos", "toalla": "toallas",
    "sofá": "sofás", "estante": "estantes", "champú": "champús", "peine": "peines",
    "armario": "armarios", "pared": "paredes", "suelo": "suelos", "techo": "techos",
    "país": "países", "montaña": "montañas", "mar": "mares", "río": "ríos",
    "playa": "playas", "bosque": "bosques", "calle": "calles", "parque": "parques",
    "puente": "puentes", "precio": "precios", "recibo": "recibos", "mercado": "mercados",
    "tarjeta": "tarjetas", "bolsa": "bolsas", "mapa": "mapas",
    "cepillo de dientes": "cepillos de dientes", "pasta de dientes": "pastas de dientes"
  },
  pt: {
    "jardim": "jardins", "médico": "médicos", "pé": "pés", "professor": "professores",
    "pizza": "pizzas", "pasta": "pastas", "maçã": "maçãs", "pão": "pães",
    "ovo": "ovos", "banana": "bananas", "café": "cafés", "chá": "chás",
    "escola": "escolas", "camiseta": "camisetas", "calças": "calças", "sapato": "sapatos",
    "chapéu": "chapéus", "cadeira": "cadeiras", "mesa": "mesas", "cama": "camas",
    "chave": "chaves", "telefone": "telefones", "livro": "livros", "bolsa": "bolsas",
    "caneta": "canetas", "gato": "gatos", "cão": "cães", "mão": "mãos",
    "perna": "pernas", "olho": "olhos", "nariz": "narizes", "boca": "bocas",
    "orelha": "orelhas", "mãe": "mães", "pai": "pais", "trabalho": "trabalhos",
    "casa": "casas", "carro": "carros", "autocarro": "autocarros", "comboio": "comboios",
    "loja": "lojas", "família": "famílias", "amigo": "amigos", "dia": "dias",
    "semana": "semanas", "comida": "comidas", "pequeno-almoço": "pequenos-almoços", "almoço": "almoços",
    "jantar": "jantares", "manhã": "manhãs", "tarde": "tardes", "noite": "noites",
    "marido": "maridos", "esposa": "esposas", "criança": "crianças", "sol": "sóis",
    "chuva": "chuvas", "língua": "línguas", "palavra": "palavras", "frase": "frases",
    "letra": "letras", "nome": "nomes", "pergunta": "perguntas", "resposta": "respostas",
    "exemplo": "exemplos", "estudante": "estudantes", "mulher": "mulheres", "porta": "portas",
    "janela": "janelas", "prato": "pratos", "chávena": "chávenas", "copo": "copos",
    "garfo": "garfos", "colher": "colheres", "faca": "facas", "secretária": "secretárias",
    "lâmpada": "lâmpadas", "relógio": "relógios", "espelho": "espelhos", "garrafa": "garrafas",
    "caixa": "caixas", "lápis": "lápis", "papel": "papéis", "frigorífico": "frigoríficos",
    "forno": "fornos", "toalha": "toalhas", "sofá": "sofás", "estante": "estantes",
    "champô": "champôs", "pente": "pentes", "armário": "armários", "parede": "paredes",
    "chão": "chãos", "telhado": "telhados", "país": "países", "montanha": "montanhas",
    "mar": "mares", "rio": "rios", "praia": "praias", "floresta": "florestas",
    "rua": "ruas", "parque": "parques", "ponte": "pontes", "preço": "preços",
    "recibo": "recibos", "mercado": "mercados", "cartão": "cartões", "mala": "malas",
    "t-shirt": "t-shirts", "mapa": "mapas",
    "escova de dentes": "escovas de dentes", "pasta de dentes": "pastas de dentes"
  },
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
  },
  hy: {
    "այգի": "այգիներ", "բժիշկ": "բժիշկներ", "ոտք": "ոտքեր", "ուսուցիչ": "ուսուցիչներ", "պիցցա": "պիցցաներ",
    "պաստա": "պաստաներ", "խնձոր": "խնձորներ", "հաց": "հացեր", "ձու": "ձվեր", "բանան": "բանաններ",
    "սուրճ": "սուրճեր", "թեյ": "թեյեր", "դպրոց": "դպրոցներ", "շապիկ": "շապիկներ", "տաբատ": "տաբատներ",
    "կոշիկ": "կոշիկներ", "գլխարկ": "գլխարկներ", "աթոռ": "աթոռներ", "սեղան": "սեղաններ", "մահճակալ": "մահճակալներ",
    "բանալի": "բանալիներ", "հեռախոս": "հեռախոսներ", "գիրք": "գրքեր", "պայուսակ": "պայուսակներ", "գրիչ": "գրիչներ",
    "կատու": "կատուներ", "շուն": "շներ", "ձեռք": "ձեռքեր", "աչք": "աչքեր", "քիթ": "քթեր",
    "բերան": "բերաններ", "ականջ": "ականջներ", "մայր": "մայրեր", "հայր": "հայրեր", "աշխատանք": "աշխատանքներ",
    "տուն": "տներ", "մեքենա": "մեքենաներ", "ավտոբուս": "ավտոբուսներ", "գնացք": "գնացքներ", "խանութ": "խանութներ",
    "ընտանիք": "ընտանիքներ", "ընկեր": "ընկերներ", "օր": "օրեր", "շաբաթ": "շաբաթներ", "ուտելիք": "ուտելիքներ",
    "նախաճաշ": "նախաճաշեր", "ճաշ": "ճաշեր", "ընթրիք": "ընթրիքներ", "առավոտ": "առավոտներ", "երեկո": "երեկոներ",
    "գիշեր": "գիշերներ", "ամուսին": "ամուսիններ", "կին": "կանայք", "երեխա": "երեխաներ"
  },
  ka: {
    "ბაღი": "ბაღები", "ექიმი": "ექიმები", "ფეხი": "ფეხები", "მასწავლებელი": "მასწავლებლები", "პიცა": "პიცები",
    "პასტა": "პასტები", "ვაშლი": "ვაშლები", "პური": "პურები", "კვერცხი": "კვერცხები", "ბანანი": "ბანანები",
    "ყავა": "ყავები", "ჩაი": "ჩაიები", "სკოლა": "სკოლები", "მაისური": "მაისურები", "შარვალი": "შარვლები",
    "ფეხსაცმელი": "ფეხსაცმელები", "ქუდი": "ქუდები", "სკამი": "სკამები", "მაგიდა": "მაგიდები", "საწოლი": "საწოლები",
    "გასაღები": "გასაღებები", "ტელეფონი": "ტელეფონები", "წიგნი": "წიგნები", "ჩანთა": "ჩანთები", "კალამი": "კალმები",
    "კატა": "კატები", "ძაღლი": "ძაღლები", "ხელი": "ხელები", "თვალი": "თვალები", "ცხვირი": "ცხვირები",
    "პირი": "პირები", "ყური": "ყურები", "დედა": "დედები", "მამა": "მამები", "მუშაობა": "მუშაობები",
    "სახლი": "სახლები", "მანქანა": "მანქანები", "ავტობუსი": "ავტობუსები", "მატარებელი": "მატარებლები", "მაღაზია": "მაღაზიები",
    "ოჯახი": "ოჯახები", "მეგობარი": "მეგობრები", "დღე": "დღეები", "კვირა": "კვირები", "საჭმელი": "საჭმელები",
    "საუზმე": "საუზმეები", "სადილი": "სადილები", "ვახშამი": "ვახშმები", "დილა": "დილები", "საღამო": "საღამოები",
    "ღამე": "ღამეები", "ქმარი": "ქმრები", "ცოლი": "ცოლები", "ბავშვი": "ბავშვები"
  },
  tt: {
    "бакча": "бакчалар", "врач": "врачлар", "аяк": "аяклар", "укытучы": "укытучылар", "пицца": "пиццалар",
    "паста": "пасталар", "алма": "алмалар", "икмәк": "икмәкләр", "йомырка": "йомыркалар", "банан": "бананнар",
    "кофе": "кофелар", "чәй": "чәйләр", "мәктәп": "мәктәпләр", "футболка": "футболкалар", "чалбар": "чалбарлар",
    "аяк киеме": "аяк киемнәре", "баш киеме": "баш киемнәре", "урындык": "урындыклар", "өстәл": "өстәлләр", "карават": "караватлар",
    "ачкыч": "ачкычлар", "телефон": "телефоннар", "китап": "китаплар", "сумка": "сумкалар", "ручка": "ручкалар",
    "мәче": "мәчеләр", "эт": "этләр", "кул": "куллар", "борын": "борыннар", "авыз": "авызлар",
    "колак": "колаклар", "әни": "әниләр", "әти": "әтиләр", "эш": "эшләр", "өй": "өйләр",
    "машина": "машиналар", "автобус": "автобуслар", "поезд": "поездлар", "кибет": "кибетләр", "гаилә": "гаиләләр",
    "дус": "дуслар", "көн": "көннәр", "атна": "атналар", "ризык": "ризыклар", "иртәнге аш": "иртәнге ашлар",
    "төшке аш": "төшке ашлар", "кичке аш": "кичке ашлар", "иртә": "иртәләр", "кич": "кичләр",
    "төн": "төннәр", "ир": "ирләр", "хатын": "хатыннар", "бала": "балалар"
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
  if (t === "school" || t === "language") return "school.json";
  if (t === "social") return "expressions.json";
  if (t === "travel") return "places_transport.json";
  if (t.startsWith("numbers")) return "numbers.json";
  if (t === "describing") return "adjectives.json";
  if (t === "emotions") return "feelings.json";
  if (t === "music") return "common_nouns.json";

  if (t === "places") {
    if (w.includes("garten") || w.includes("jardín") || w.includes("jardim") || w.includes("баҡса") || w.includes("liorzh") || w.includes("пахча") || w.includes("այգի") || w.includes("ბაღი") || w.includes("бакча")) return "house_furniture.json";
    return "places_transport.json";
  }

  if (t === "furniture" || t === "technology") {
    if (w.includes("garten") || w.includes("jardín") || w.includes("jardim") || w.includes("баҡса") || w.includes("liorzh") || w.includes("пахча") || w.includes("այգի") || w.includes("ბაღი") || w.includes("бакча")) return "house_furniture.json";
    if (w.includes("zuhause") || w.includes("casa") || w.includes("өй") || w.includes("ti") || w.includes("çурт") || w.includes("տուն") || w.includes("სახლი")) return "house_furniture.json";
    if (w.includes("buch") || w.includes("libro") || w.includes("livro") || w.includes("китап") || w.includes("levr") || w.includes("кĕнеке") || w.includes("գիրք") || w.includes("წიგნი")) return "school.json";
    if (w.includes("stift") || w.includes("bolígrafo") || w.includes("caneta") || w.includes("ручка") || w.includes("stilo") || w.includes("գրիչ") || w.includes("კალამი")) return "school.json";
    if (w.includes("tasche") || w.includes("bolso") || w.includes("bolsa") || w.includes("сумка") || w.includes("sac'h") || w.includes("պայուսակ") || w.includes("ჩანთა")) return "clothes.json";
    return "house_furniture.json";
  }

  if (t === "people") {
    return "family.json";
  }

  if (t === "shopping") {
    if (w.includes("geld") || w.includes("dinero") || w.includes("dinheiro") || w.includes("аҡса") || w.includes("arc'hant") || w.includes("укçа") || w.includes("փող") || w.includes("ფული") || w.includes("акча")) return "jobs.json";
    return "places_transport.json";
  }

  if (t === "nature") {
    if (w.includes("sonne") || w.includes("regen") || w.includes("sol") || w.includes("lluvia") || w.includes("chuva") || w.includes("ҡоеш") || w.includes("ямғыр") || w.includes("heol") || w.includes("glav") || w.includes("хĕвел") || w.includes("çумăр") || w.includes("юр") || w.includes("çил") || w.includes("արև") || w.includes("անձրև") || w.includes("მზე") || w.includes("წვიმა") || w.includes("кояш") || w.includes("яңгыр")) return "weather.json";
    return "geography.json";
  }

  return "common_nouns.json";
}

// Phrases and conversational expressions
const phraseWords = new Set([
  "hola", "olá", "adiós", "adeus", "gracias", "obrigado", "por favor", "de nada",
  "disculpe", "com licença", "desculpe", "lo siento", "perdón",
  "buenos días", "buenas tardes", "buenas noches", "bom dia", "boa tarde", "boa noite",
  "¿cómo estás?", "como está?", "mucho gusto", "muito prazer", "bienvenido", "bem-vindo"
]);

// Adverbs
const adverbWords = new Set([
  "hoy", "hoje", "heute", "amanhã", "бөгөн", "иртәгә", "hiziv", "warc'hoazh", "այսօր", "վաղը", "დღეს", "ხვალ", "бүген"
]);

// Pronouns / Interrogatives
const pronounWords = new Set([
  "qué", "cómo", "cuántos", "porquê", "quantos", "quién", "dónde", "cuándo", "por qué", "quem", "onde", "quando", "como", "o quê"
]);

// A0 words
const a0Words = new Set([
  "danke", "gracias", "obrigado", "de nada", "disculpe", "com licença", "desculpe",
  "¿cómo estás?", "como está?", "mucho gusto", "muito prazer",
  "agua", "água", "wasser", "pan", "pão", "brot",
  "madre", "mãe", "mutter", "padre", "pai", "vater", "hola", "olá", "adiós", "adeus"
]);

async function convertAll() {
  const langs = ["hy", "ka", "tt"];

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

      if (phraseWords.has(wLower) || word.includes("?") || (word.includes(" ") && !["t-shirt", "pequeno-almoço", "cepillo de dientes", "pasta de dientes", "escova de dentes", "pasta de dentes", "аяҡ киеме", "баш кейеме", "аяҡ киеме", "аяк киеме", "баш киеме", "çĕр улми", "иртәнге аш", "төшке аш", "киске аш"].includes(wLower))) {
        form = "phrase";
      } else if (adverbWords.has(wLower)) {
        form = "adverb";
      } else if (pronounWords.has(wLower)) {
        form = "pronoun";
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

      const level = a0Words.has(wLower) ? "A0" : "A1";

      // ALWAYS force true IPA from ipaDict if present
      let transcription = (ipaDict[lang] && ipaDict[lang][word]) || (ipaDict[lang] && ipaDict[lang][item.word]) || item.transcription;
      if (!transcription || transcription.trim() === "" || /[a-zA-Z-]{3,}/.test(transcription.replace(/^\/|\/$/g, ""))) {
        if (!ipaDict[lang] || !ipaDict[lang][word]) {
          console.warn(`  [WARN] Missing transcription for ${word} (${lang})`);
        }
        transcription = `/${slug}/`;
      }
      if (!transcription.startsWith("/")) {
        transcription = `/${transcription.replace(/^\/|\/$/g, '')}/`;
      }

      let emoji = item.emoji || "📌";
      if (wLower === "mesa") emoji = "🪑";

      const defs = item.definitions ? item.definitions.map(d => d.text).filter(Boolean) : ["Core vocabulary term."];
      const ex = item.definitions ? item.definitions.flatMap(d => d.examples || []).filter(Boolean) : [];

      const entry = {
        id: entryKey,
        word: word,
        language: lang,
        form: form,
        level: level,
        transcription: transcription,
        emoji: emoji,
        definitions: defs,
        examples: ex,
        domain: "general",
        theme: themeName,
        updated: "2025-01-15",
        no_antonym: true
      };

      if (form === "noun") {
        let countability = item.countability || "countable";
        if (["կաթ", "ջուր", "փող", "արև", "անձրև", "რძე", "წყალი", "ფული", "მზე", "წვიმა", "сөт", "су", "акча", "кояш", "яңгыр", "Milch", "Wasser", "Geld", "agua", "água", "dinero", "dinheiro", "Essen", "leche", "leite", "jabón", "sabão", "massa", "pasta"].includes(word)) {
          if (word !== "çурт") countability = "uncountable";
        }
        entry.countability = countability;

        if (lang === "br" || lang === "de" || lang === "es" || lang === "pt") {
          const art = (articles[lang] && articles[lang][word]) || (articles[lang] && articles[lang][item.word]);
          const gen = (genders[lang] && genders[lang][word]) || (genders[lang] && genders[lang][item.word]);
          if (art) entry.article = art;
          if (gen) entry.gender = gen;
        }

        if (countability === "countable") {
          const plural = item.plural || item.plural_form || (plurals[lang] && plurals[lang][word]) || (plurals[lang] && plurals[lang][item.word]);
          if (plural) {
            entry.plural_form = plural;
          } else {
            console.warn(`  [WARN] Missing plural for countable noun: ${word} (${lang})`);
            entry.plural_form = word + "ներ";
          }
        }
      }

      if (!themeMap[targetThemeFile]) themeMap[targetThemeFile] = [];
      themeMap[targetThemeFile].push(entry);
    }

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

convertAll().catch(err => {
  console.error("Conversion error:", err);
  process.exit(1);
});
