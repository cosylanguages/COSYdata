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

// Articles dictionary for Spanish (es) and Portuguese (pt)
const articles = {
  de: {
    "Garten": "der"
  },
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
  }
};

// Gender dictionary for Spanish (es) and Portuguese (pt)
const genders = {
  de: {
    "Garten": "masculine"
  },
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
    "língua": "feminine", "palavra": "feminine", "frase": "feminine", "letra": "feminine", "nome": "masculine", "pergunta": "feminine",
    "respuesta": "feminine", "exemplo": "masculine", "estudante": "masculine", "mulher": "feminine", "porta": "feminine", "janela": "feminine",
    "prato": "masculine", "chávena": "feminine", "copo": "masculine", "garfo": "masculine", "colher": "feminine", "faca": "feminine",
    "secretária": "feminine", "lâmpada": "feminine", "relógio": "masculine", "espelho": "masculine", "garrafa": "feminine",
    "caixa": "feminine", "lápis": "masculine", "papel": "masculine", "frigorífico": "masculine", "forno": "masculine", "sabão": "masculine",
    "toalha": "feminine", "sofá": "masculine", "estante": "feminine", "champô": "masculine", "pente": "masculine", "armário": "masculine",
    "parede": "feminine", "chão": "masculine", "telhado": "masculine", "país": "masculine", "montanha": "feminine", "mar": "masculine",
    "rio": "masculine", "praia": "feminine", "floresta": "feminine", "rua": "feminine", "parque": "masculine", "ponte": "feminine",
    "preço": "masculine", "recibo": "masculine", "mercado": "masculine", "cartão": "masculine", "mala": "feminine",
    "escova de dentes": "feminine", "pasta de dentes": "feminine", "t-shirt": "feminine", "mapa": "masculine"
  }
};

// Phonetic IPA transcriptions dictionary
const transcriptions = {
  de: {
    "Garten": "/ˈɡaʁtn̩/",
    "Arzt": "/aʁtsːt/",
    "Fuß": "/fuːs/",
    "Lehrer": "/ˈleːʁɐ/",
    "Pizza": "/ˈpɪtsa/",
    "Pasta": "/ˈpasta/",
    "Apfel": "/ˈapfl̩/",
    "Brot": "/bʁoːt/",
    "Ei": "/aɪ̯/",
    "Milch": "/mɪlç/",
    "Banane": "/baˈnaːnə/",
    "Kaffee": "/ˈkafe/",
    "Tee": "/teː/",
    "Wasser": "/ˈvasɐ/",
    "Schule": "/ˈʃuːlə/",
    "T-Shirt": "/ˈtiːʃœːt/",
    "Hose": "/ˈhoːzə/",
    "Schuh": "/ʃuː/",
    "Hut": "/huːt/",
    "Stuhl": "/ʃtuːl/",
    "Tisch": "/tɪʃ/",
    "Bett": "/bɛt/",
    "Schlüssel": "/ˈʃlʏsl̩/",
    "Telefon": "/teləˈfoːn/",
    "Buch": "/buːx/",
    "Tasche": "/ˈtaʃə/",
    "Stift": "/ʃtɪft/",
    "Katze": "/ˈkatsə/",
    "Hund": "/hʊnt/",
    "Hand": "/hant/",
    "Bein": "/baɪ̯n/",
    "Auge": "/ˈaʊ̯ɡə/",
    "Nase": "/ˈnaːzə/",
    "Mund": "/mʊnt/",
    "Ohr": "/oːɐ̯/",
    "Mutter": "/ˈmʊtɐ/",
    "Vater": "/ˈfaːtɐ/",
    "Arbeit": "/ˈaʁbaɪ̯t/",
    "Zuhause": "/tsuˈhaʊ̯zə/",
    "Auto": "/ˈaʊ̯to/",
    "Bus": "/bʊs/",
    "Zug": "/tsuːk/",
    "Geld": "/ɡɛlt/",
    "Geschäft": "/ɡəˈʃɛft/",
    "Familie": "/faˈmiːli̯ə/",
    "Freund": "/fʁɔɪ̯nt/",
    "Tag": "/taːk/",
    "Woche": "/ˈvɔxə/",
    "Essen": "/ˈɛsn̩/",
    "Frühstück": "/ˈfʁyːʃtʏk/",
    "Mittagessen": "/ˈmɪtaːkˌɛsn̩/",
    "Abendessen": "/ˈaːbn̩tˌɛsn̩/",
    "Morgen": "/ˈmɔʁɡn̩/",
    "morgen": "/ˈmɔʁɡn̩/",
    "Abend": "/ˈaːbn̩t/",
    "Nacht": "/naxt/",
    "Heute": "/ˈhɔɪ̯tə/",
    "heute": "/ˈhɔɪ̯tə/",
    "Ehemann": "/ˈeːəˌman/",
    "Ehefrau": "/ˈeːəˌfʁaʊ̯/",
    "Kind": "/kɪnt/",
    "Sonne": "/ˈzɔnə/",
    "Regen": "/ˈʁeːɡn̩/"
  },
  es: {
    "jardín": "/xaɾˈðin/",
    "médico": "/ˈmeðiko/",
    "pie": "/ˈpje/",
    "profesor": "/pɾofeˈsoɾ/",
    "pizza": "/ˈpitsa/",
    "pasta": "/ˈpasta/",
    "manzana": "/manˈsana/",
    "pan": "/pan/",
    "huevo": "/ˈweβo/",
    "leche": "/ˈletʃe/",
    "plátano": "/ˈplatano/",
    "café": "/kaˈfe/",
    "té": "/te/",
    "agua": "/ˈaɣwa/",
    "escuela": "/esˈkwela/",
    "camiseta": "/kamiˈseta/",
    "pantalones": "/pantaˈlones/",
    "zapato": "/saˈpato/",
    "sombrero": "/somˈbɾeɾo/",
    "silla": "/ˈsi.ʝa/",
    "mesa": "/ˈme.sa/",
    "cama": "/ˈka.ma/",
    "llave": "/ˈʎaβe/",
    "teléfono": "/teˈlefono/",
    "libro": "/ˈli.βɾo/",
    "bolso": "/ˈbolso/",
    "bolígrafo": "/boˈliɣɾafo/",
    "gato": "/ˈɡato/",
    "perro": "/ˈpero/",
    "mano": "/ˈmano/",
    "pierna": "/ˈpjeɾna/",
    "ojo": "/ˈoxo/",
    "nariz": "/naˈɾis/",
    "boca": "/ˈboka/",
    "oreja": "/oˈɾexa/",
    "madre": "/ˈmaðɾe/",
    "padre": "/ˈpaðɾe/",
    "trabajo": "/tɾaˈβaxo/",
    "casa": "/ˈkasa/",
    "coche": "/ˈkotʃe/",
    "autobús": "/awtoˈβus/",
    "tren": "/tɾen/",
    "dinero": "/diˈneɾo/",
    "tienda": "/ˈtjenda/",
    "familia": "/faˈmilja/",
    "amigo": "/aˈmiɣo/",
    "día": "/ˈdi.a/",
    "semana": "/seˈmana/",
    "comida": "/koˈmiða/",
    "desayuno": "/desaˈʒuno/",
    "almuerzo": "/alˈmweɾso/",
    "cena": "/ˈsena/",
    "mañana": "/maˈɲana/",
    "tarde": "/ˈtaɾðe/",
    "noche": "/ˈnotʃe/",
    "hoy": "/oj/",
    "esposo": "/esˈposo/",
    "esposa": "/esˈposa/",
    "niño": "/ˈniɲo/",
    "sol": "/sol/",
    "lluvia": "/ˈʎuβja/",
    "hola": "/ˈola/",
    "adiós": "/aˈðjos/",
    "por favor": "/poɾ faˈβoɾ/",
    "gracias": "/ˈɡɾasjas/",
    "de nada": "/de ˈnaða/",
    "sí": "/si/",
    "no": "/no/",
    "disculpe": "/disˈkulpe/",
    "lo siento": "/lo ˈsjento/",
    "buenos días": "/ˈbwenoz ˈdi.as/",
    "buenas tardes": "/ˈbwenas ˈtaɾðes/",
    "buenas noches": "/ˈbwenaz ˈnotʃes/",
    "¿cómo estás?": "/ˈkomo esˈtas/",
    "mucho gusto": "/ˈmutʃo ˈɡusto/",
    "bienvenido": "/bjembeˈniðo/",
    "idioma": "/iˈðjoma/",
    "palabra": "/paˈlaβɾa/",
    "frase": "/ˈfɾase/",
    "letra": "/ˈletɾa/",
    "nombre": "/ˈnombɾe/",
    "pregunta": "/pɾeˈɣunta/",
    "respuesta": "/resˈpwesta/",
    "ejemplo": "/eˈxemplo/",
    "estudiante": "/estuˈðjante/",
    "hogar": "/oˈɣaɾ/",
    "marido": "/maˈɾiðo/",
    "mujer": "/muˈxeɾ/",
    "puerta": "/ˈpweɾta/",
    "ventana": "/benˈtana/",
    "plato": "/ˈplato/",
    "taza": "/ˈtasa/",
    "vaso": "/ˈbaso/",
    "tenedor": "/teneˈðoɾ/",
    "cuchara": "/kuˈtʃaɾa/",
    "cuchillo": "/kuˈtʃiʎo/",
    "escritorio": "/eskɾiˈtoɾjo/",
    "lámpara": "/ˈlampaɾa/",
    "reloj": "/reˈlox/",
    "espejo": "/esˈpexo/",
    "botella": "/boˈteʎa/",
    "caja": "/ˈkaxa/",
    "lápiz": "/ˈlapis/",
    "papel": "/paˈpel/",
    "nevera": "/neˈβeɾa/",
    "horno": "/ˈoɾno/",
    "toalla": "/toˈaʎa/",
    "sofá": "/soˈfa/",
    "estante": "/esˈtante/",
    "champú": "/tʃamˈpu/",
    "peine": "/ˈpejne/",
    "armario": "/aɾˈmaɾjo/",
    "pared": "/paˈɾeð/",
    "suelo": "/ˈswelo/",
    "techo": "/ˈtetʃo/",
    "país": "/paˈis/",
    "montaña": "/monˈtaɲa/",
    "mar": "/maɾ/",
    "río": "/ˈri.o/",
    "playa": "/ˈplaʝa/",
    "bosque": "/ˈboske/",
    "calle": "/ˈkaʎe/",
    "parque": "/ˈpaɾke/",
    "puente": "/ˈpwente/",
    "precio": "/ˈpɾesjo/",
    "recibo": "/ˈresjβo/",
    "mercado": "/meɾˈkaðo/",
    "tarjeta": "/taɾˈxeta/",
    "bolsa": "/ˈbolsa/",
    "cepillo de dientes": "/seˈpiʎo ðe ˈðjentes/",
    "pasta de dientes": "/ˈpasta ðe ˈðjentes/",
    "jabón": "/xaˈβon/",
    "mapa": "/ˈmapa/",
    "regalo": "/reˈɣalo/",
    "perdón": "/peɾˈdon/",
    "quién": "/kjen/",
    "dónde": "/ˈdonde/",
    "cuándo": "/ˈkwando/",
    "qué": "/ke/",
    "por qué": "/poɾ ˈke/",
    "cómo": "/ˈkomo/",
    "cuántos": "/ˈkwantos/"
  },
  pt: {
    "jardim": "/ʒaʁˈdĩ/",
    "médico": "/ˈmɛdiku/",
    "pé": "/pɛ/",
    "professor": "/pɾufeˈsoɾ/",
    "pizza": "/ˈpitsa/",
    "pasta": "/ˈpaʃtɐ/",
    "maçã": "/mɐˈsɐ̃/",
    "pão": "/pɐ̃w̃/",
    "ovo": "/ˈovu/",
    "leite": "/ˈlejtɨ/",
    "banana": "/bɐˈnɐnɐ/",
    "café": "/kɐˈfɛ/",
    "chá": "/ʃa/",
    "água": "/ˈaɡwɐ/",
    "escola": "/ɨʃˈkɔlɐ/",
    "camiseta": "/kɐmiˈzetɐ/",
    "calças": "/ˈkaɫsɐʃ/",
    "sapato": "/sɐˈpatu/",
    "chapéu": "/ʃɐˈpɛw/",
    "cadeira": "/kɐˈdɐjɾɐ/",
    "mesa": "/ˈmezɐ/",
    "cama": "/ˈkɐmɐ/",
    "chave": "/ˈʃavɨ/",
    "telefone": "/tɨlɨˈfɔnɨ/",
    "livro": "/ˈlivɾu/",
    "bolsa": "/ˈboɫsɐ/",
    "caneta": "/kɐˈnetɐ/",
    "gato": "/ˈgatu/",
    "cão": "/kɐ̃w̃/",
    "mão": "/mɐ̃w̃/",
    "perna": "/ˈpɛɾnɐ/",
    "olho": "/ˈoʎu/",
    "nariz": "/nɐˈɾiʃ/",
    "boca": "/ˈbokɐ/",
    "orelha": "/oˈɾeʎɐ/",
    "mãe": "/mɐ̃j̃/",
    "pai": "/paj/",
    "trabalho": "/tɾɐˈbaʎu/",
    "casa": "/ˈkazɐ/",
    "carro": "/ˈkaʁu/",
    "autocarro": "/awtɔˈkaʁu/",
    "comboio": "/kõˈbɔju/",
    "dinheiro": "/diˈɲejɾu/",
    "loja": "/ˈlɔʒɐ/",
    "família": "/fɐˈmiljɐ/",
    "amigo": "/ɐˈmiɡu/",
    "dia": "/ˈdiɐ/",
    "semana": "/sɨˈmɐnɐ/",
    "comida": "/kuˈmidɐ/",
    "pequeno-almoço": "/pɨˈkenwɐɫˈmosu/",
    "almoço": "/aɫˈmosu/",
    "jantar": "/ʒɐ̃ˈtaɾ/",
    "manhã": "/mɐˈɲɐ̃/",
    "tarde": "/ˈtaɾdɨ/",
    "noite": "/ˈnojtɨ/",
    "hoje": "/ˈoʒɨ/",
    "amanhã": "/ɐmɐˈɲɐ̃/",
    "marido": "/mɐˈɾidu/",
    "esposa": "/ɨʃˈpozɐ/",
    "criança": "/kɾiˈɐ̃sɐ/",
    "sol": "/sɔɫ/",
    "chuva": "/ˈʃuvɐ/",
    "olá": "/oˈla/",
    "adeus": "/ɐˈdewʃ/",
    "por favor": "/puɾ fɐˈvoɾ/",
    "obrigado": "/ubɾiˈɡadu/",
    "de nada": "/dɨ ˈnadɐ/",
    "sim": "/sĩ/",
    "não": "/nɐ̃w̃/",
    "com licença": "/kõ liˈsẽsɐ/",
    "desculpe": "/dɨʃˈkuɫpɨ/",
    "bom dia": "/bõ ˈdiɐ/",
    "boa tarde": "/ˈboɐ ˈtaɾdɨ/",
    "boa noite": "/ˈboɐ ˈnojtɨ/",
    "como está?": "/ˈkomu iʃˈta/",
    "muito prazer": "/ˈmũjtu pɾɐˈzeɾ/",
    "bem-vindo": "/bẽj ˈvĩdu/",
    "língua": "/ˈlĩɡwɐ/",
    "palavra": "/pɐˈlavɾɐ/",
    "frase": "/ˈfɾazɨ/",
    "letra": "/ˈletɾɐ/",
    "nome": "/ˈnomɨ/",
    "pregunta": "/pɨɾˈɡũtɐ/",
    "resposta": "/ʁɨʃˈpɔʃtɐ/",
    "exemplo": "/iˈzẽplu/",
    "estudante": "/ɨʃtuˈdɐ̃tɨ/",
    "mulher": "/muˈʎɛɾ/",
    "porta": "/ˈpɔɾtɐ/",
    "janela": "/ʒɐˈnɛlɐ/",
    "prato": "/ˈpɾatu/",
    "chávena": "/ˈʃavɨnɐ/",
    "copo": "/ˈkɔpu/",
    "garfo": "/ˈɡaɾfu/",
    "colher": "/kuˈʎɛɾ/",
    "faca": "/ˈfakɐ/",
    "secretária": "/sɨkɾɨˈtaɾjɐ/",
    "lâmpada": "/ˈlɐ̃pɐdɐ/",
    "relógio": "/ʁɨˈlɔʒju/",
    "espelho": "/ɨʃˈpɨʎu/",
    "garrafa": "/ɡɐˈʁafɐ/",
    "caixa": "/ˈkajʃɐ/",
    "lápis": "/ˈlapiʃ/",
    "papel": "/pɐˈpɛɫ/",
    "frigorífico": "/fɾiɡuˈɾifiku/",
    "forno": "/ˈfoɾnu/",
    "sabão": "/sɐˈbɐ̃w̃/",
    "toalha": "/tuˈaʎɐ/",
    "sofá": "/suˈfa/",
    "estante": "/ɨʃˈtɐ̃tɨ/",
    "champô": "/ʃɐ̃ˈpo/",
    "pente": "/ˈpẽtɨ/",
    "armário": "/ɐɾˈmaɾju/",
    "parede": "/pɐˈɾedɨ/",
    "chão": "/ʃɐ̃w̃/",
    "telhado": "/tɨˈʎadu/",
    "país": "/pɐˈiʃ/",
    "montanha": "/mõˈtɐɲɐ/",
    "mar": "/maɾ/",
    "rio": "/ˈʁiu/",
    "praia": "/ˈpɾajɐ/",
    "floresta": "/fluˈɾɛʃtɐ/",
    "rua": "/ˈʁuɐ/",
    "parque": "/ˈpaɾkɨ/",
    "ponte": "/ˈpõtɨ/",
    "preço": "/ˈpɾesu/",
    "recibo": "/ʁɨˈsibu/",
    "mercado": "/mɨɾˈkadu/",
    "cartão": "/kɐɾˈtɐ̃w̃/",
    "mala": "/ˈmalɐ/",
    "escova de dentes": "/ɨʃˈkovɐ dɨ ˈdẽtɨʃ/",
    "pasta de dentes": "/ˈpaʃtɐ dɨ ˈdẽtɨʃ/",
    "t-shirt": "/ˈtiʃœɾt/",
    "mapa": "/ˈmapɐ/",
    "massa": "/ˈmasɐ/",
    "o quê": "/u ˈke/",
    "porquê": "/puɾˈke/",
    "como": "/ˈkomu/",
    "quantos": "/ˈkwɐ̃tuʃ/"
  }
};

// Plural forms for German (de), Spanish (es), and Portuguese (pt)
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
  }
};

// Map source concepts/themes to standard COSYdata theme filenames
function getTargetTheme(item) {
  const t = item.theme;
  const w = item.word.toLowerCase();

  if (t === "food_drink") return "food_drink.json";
  if (t === "clothes") return "clothes.json";
  if (t === "animals") return "animals.json";
  if (t === "body" || t === "health_medicine") return "body_health.json";
  if (t === "jobs") return "jobs.json";
  if (t === "time") return "time.json";
  if (t === "school" || t === "language") return "school.json";
  if (t === "social") return "expressions.json";
  if (t === "travel") return "places_transport.json";

  if (t === "places") {
    if (w.includes("garten") || w.includes("jardín") || w.includes("jardim")) return "house_furniture.json";
    return "places_transport.json";
  }

  if (t === "furniture" || t === "technology") {
    if (w.includes("garten") || w.includes("jardín") || w.includes("jardim")) return "house_furniture.json";
    if (w.includes("zuhause") || w.includes("casa")) return "house_furniture.json";
    if (w.includes("buch") || w.includes("libro") || w.includes("livro")) return "school.json";
    if (w.includes("stift") || w.includes("bolígrafo") || w.includes("caneta")) return "school.json";
    if (w.includes("tasche") || w.includes("bolso") || w.includes("bolsa")) return "clothes.json";
    return "house_furniture.json";
  }

  if (t === "people") {
    return "family.json";
  }

  if (t === "shopping") {
    if (w.includes("geld") || w.includes("dinero") || w.includes("dinheiro")) return "jobs.json";
    return "places_transport.json";
  }

  if (t === "nature") {
    if (w.includes("sonne") || w.includes("regen") || w.includes("sol") || w.includes("lluvia") || w.includes("chuva")) return "weather.json";
    return "geography.json";
  }

  return "common_nouns.json";
}

// Slugs mapping helper
function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
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
  "hoy", "hoje", "heute", "amanhã"
]);

// Pronouns / Interrogatives
const pronounWords = new Set([
  "qué", "cómo", "cuántos", "porquê", "quantos", "quién", "dónde", "cuándo", "por qué", "quem", "onde", "quando", "como", "o quê"
]);

// A0 words (top 15-20% foundational concepts)
const a0Words = new Set([
  "danke", "gracias", "obrigado",
  "de nada",
  "disculpe", "com licença", "desculpe",
  "¿cómo estás?", "como está?",
  "mucho gusto", "muito prazer",
  "agua", "água", "wasser",
  "pan", "pão", "brot",
  "madre", "mãe", "mutter",
  "padre", "pai", "vater",
  "hola", "olá", "adiós", "adeus"
]);

async function convertBatch1() {
  const langs = ["de", "es", "pt"];

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

      // Refine German word forms
      if (lang === "de" && item.word === "Morgen") {
        if (item.definitions[0]?.text?.includes("nach heute")) {
          word = "morgen";
          form = "adverb";
        } else {
          word = "Morgen";
          form = "noun";
        }
      } else if (lang === "de" && item.word === "Heute") {
        word = "heute";
        form = "adverb";
      }

      const wLower = word.toLowerCase();

      // Refine Spanish / Portuguese forms
      if (phraseWords.has(wLower) || word.includes("?") || (word.includes(" ") && !["t-shirt", "pequeno-almoço", "cepillo de dientes", "pasta de dientes", "escova de dentes", "pasta de dentes"].includes(wLower))) {
        form = "phrase";
      } else if (adverbWords.has(wLower)) {
        form = "adverb";
      } else if (pronounWords.has(wLower)) {
        form = "pronoun";
      }

      const slug = slugify(word);
      const entryKey = `${lang}:${slug}:${form}`;

      // Deduplicate identical duplicate concepts (e.g. jardín/jardim in places vs furniture)
      if (processedKeys.has(entryKey)) {
        console.log(`  [DEDUPLICATED] Skipping duplicate concept ${entryKey}`);
        continue;
      }
      processedKeys.add(entryKey);

      const targetThemeFile = getTargetTheme(item);
      const themeName = targetThemeFile.replace(".json", "");

      // Level assignment
      const level = a0Words.has(wLower) ? "A0" : "A1";

      // IPA transcription: always prefer true IPA from dictionary if present
      let transcription = (transcriptions[lang] && transcriptions[lang][word]) || (transcriptions[lang] && transcriptions[lang][item.word]) || item.transcription;
      if (!transcription || transcription.trim() === "" || /[a-zA-Z-]{3,}/.test(transcription.replace(/^\/|\/$/g, ""))) {
        transcription = `/${slug}/`;
      }
      if (!transcription.startsWith("/")) {
        transcription = `/${transcription.replace(/^\/|\/$/g, '')}/`;
      }

      // Clean emoji
      let emoji = item.emoji || "📌";
      if (wLower === "mesa") emoji = "🪑";

      // Definition & examples
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

      // Handle Noun properties ONLY when form === "noun"
      if (form === "noun") {
        let countability = item.countability || "countable";
        // Ensure uncountables are handled correctly
        if (["Milch", "Wasser", "Geld", "agua", "água", "dinero", "dinheiro", "Essen", "leche", "leite", "jabón", "sabão", "massa", "pasta"].includes(word)) {
          countability = "uncountable";
        }
        entry.countability = countability;

        const art = item.article || (articles[lang] && articles[lang][word]) || (articles[lang] && articles[lang][item.word]);
        const gen = item.gender || (genders[lang] && genders[lang][word]) || (genders[lang] && genders[lang][item.word]);

        if (art) entry.article = art;
        else console.warn(`  [WARN] Missing article for noun: ${word} (${lang})`);

        if (gen) entry.gender = gen;
        else console.warn(`  [WARN] Missing gender for noun: ${word} (${lang})`);

        if (countability === "countable") {
          const plural = item.plural || item.plural_form || (plurals[lang] && plurals[lang][word]) || (plurals[lang] && plurals[lang][item.word]);
          if (plural) {
            entry.plural_form = plural;
          } else {
            console.warn(`  [WARN] Missing plural for countable noun: ${word} (${lang})`);
            entry.plural_form = word + "s";
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

convertBatch1().catch(err => {
  console.error("Conversion error:", err);
  process.exit(1);
});
