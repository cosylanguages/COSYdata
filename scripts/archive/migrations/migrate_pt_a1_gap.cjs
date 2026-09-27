const fs = require('fs');
const path = require('path');

const cosyDataDir = path.resolve(__dirname, '..');
const ptDir = path.join(cosyDataDir, 'vocabulary', 'pt');
const targetA0A1Dir = path.join(ptDir, 'a0_a1');

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const entriesToMigrate = [
  // Numbers / Adverbs / Pronouns / Prepositions
  { word: 'dois', theme: 'numbers.json', form: 'number', transcription: '/ˈdoiʃ/', emoji: '2️⃣', definitions: ['número equivalente a uma unidade mais uma'], examples: ['Tenho dois livros sobre a mesa.'], no_antonym: true },
  { word: 'e', theme: 'adverbs_connectors.json', form: 'adverb', transcription: '/i/', definitions: ['conjunção para ligar palavras ou frases'], examples: ['Gosto de chá e de café.'], no_antonym: true, no_emoji: true },
  { word: 'mas', theme: 'adverbs_connectors.json', form: 'adverb', transcription: '/mɐʃ/', definitions: ['palavra que indica oposição ou contraste'], examples: ['Estudo muito, mas preciso de praticar.'], no_antonym: true, no_emoji: true },
  { word: 'sempre', theme: 'adverbs_connectors.json', form: 'adverb', transcription: '/ˈsẽpɾɨ/', emoji: '🔄', definitions: ['em todo o tempo, sem interrupção'], examples: ['Ele chega sempre a horas às aulas.'], antonyms: ['nunca'] },
  { word: 'nunca', theme: 'adverbs_connectors.json', form: 'adverb', transcription: '/ˈnũkɐ/', emoji: '🚫', definitions: ['em tempo algum, em nenhuma ocasião'], examples: ['Nunca bebo café à noite.'], antonyms: ['sempre'] },
  { word: 'on-line', theme: 'adverbs_connectors.json', form: 'adverb', transcription: '/õˈlajnɨ/', emoji: '🌐', definitions: ['ligado à rede de computadores ou internet'], examples: ['Faço as compras de livros on-line.'], no_antonym: true },

  // Phrases & Expressions
  { word: 'a tempo inteiro', theme: 'jobs.json', form: 'phrase', transcription: '/ɐ ˈtẽpu ĩˈtɐi̯ɾu/', emoji: '⏰', definitions: ['trabalho com horário completo habitual'], examples: ['Ela trabalha a tempo inteiro na empresa.'], no_antonym: true },
  { word: 'a tempo parcial', theme: 'jobs.json', form: 'phrase', transcription: '/ɐ ˈtẽpu pɐɾsiˈaɫ/', emoji: '⏱️', definitions: ['trabalho com horário reduzido'], examples: ['O estudante trabalha a tempo parcial no restaurante.'], no_antonym: true },
  { word: 'em forma', theme: 'body_health.json', form: 'phrase', transcription: '/ẽ ˈfɔɾmɐ/', emoji: '🏋️‍♂️', definitions: ['em boa condição física e de saúde'], examples: ['Ele faz exercício para se manter em forma.'], no_antonym: true },
  { word: 'estar de pé', theme: 'daily_verbs.json', form: 'phrase', transcription: '/ɨʃˈtaɾ ðɨ ˈpɛ/', emoji: '🧍', definitions: ['manter-se na posição vertical sobre os pés'], examples: ['O professor prefere estar de pé durante a aula.'], no_antonym: true },
  { word: 'fazer as malas', theme: 'expressions.json', form: 'phrase', transcription: '/fɐˈzeɾ ɐʃ ˈmalɐʃ/', emoji: '🧳', definitions: ['preparar a bagagem para uma viagem'], examples: ['Vou fazer as malas para viajar amanhã.'], no_antonym: true },
  { word: 'ter meios para', theme: 'expressions.json', form: 'phrase', transcription: '/ˈteɾ ˈmɐi̯uʃ ˈpɐɾɐ/', emoji: '💰', definitions: ['possuir recursos financeiros para algo'], examples: ['Ele tem meios para comprar uma casa.'], no_antonym: true },
  { word: 'tomar o pequeno-almoço', theme: 'expressions.json', form: 'phrase', transcription: '/tuˈmaɾ u pɨˈkenu aɫˈmosu/', emoji: '🥣', definitions: ['comer a primeira refeição da manhã'], examples: ['Tomo o pequeno-almoço às oito horas.'], no_antonym: true },
  { word: 'viajar diariamente', theme: 'daily_verbs.json', form: 'phrase', transcription: '/viɐˈʒaɾ diɐɾiɐˈmẽtɨ/', emoji: '🚌', definitions: ['fazer a deslocação quotidiana para o trabalho'], examples: ['Muitas pessoas viajam diariamente de comboio.'], no_antonym: true },

  // Pronouns
  { word: 'eu', theme: 'pronouns.json', form: 'pronoun', transcription: '/ˈeu̯/', emoji: '🙋‍♂️', definitions: ['pronome pessoal da primeira pessoa do singular'], examples: ['Eu moro em Lisboa.'], no_antonym: true },
  { word: 'tu', theme: 'pronouns.json', form: 'pronoun', transcription: '/ˈtu/', emoji: '🫵', definitions: ['pronome pessoal da segunda pessoa do singular'], examples: ['Tu falas português muito bem.'], no_antonym: true },
  { word: 'ele', theme: 'pronouns.json', form: 'pronoun', transcription: '/ˈelɨ/', emoji: '👨', definitions: ['pronome pessoal masculino da terceira pessoa'], examples: ['Ele trabalha no hospital.'], no_antonym: true },
  { word: 'ela', theme: 'pronouns.json', form: 'pronoun', transcription: '/ˈɛlɐ/', emoji: '👩', definitions: ['pronome pessoal feminino da terceira pessoa'], examples: ['Ela estuda na universidade.'], no_antonym: true },
  { word: 'nós', theme: 'pronouns.json', form: 'pronoun', transcription: '/ˈnɔʃ/', emoji: '👥', definitions: ['pronome pessoal da primeira pessoa do plural'], examples: ['Nós vivemos em Portugal.'], no_antonym: true },
  { word: 'eles', theme: 'pronouns.json', form: 'pronoun', transcription: '/ˈelɨʃ/', emoji: '👥', definitions: ['pronome pessoal masculino plural da terceira pessoa'], examples: ['Eles são meus amigos.'], no_antonym: true },
  { word: 'meu', theme: 'pronouns.json', form: 'pronoun', transcription: '/ˈmeu̯/', emoji: '👤', definitions: ['pronome possessivo masculino de primeira pessoa'], examples: ['Este é o meu livro de português.'], no_antonym: true },
  { word: 'teu', theme: 'pronouns.json', form: 'pronoun', transcription: '/ˈteu̯/', emoji: '👤', definitions: ['pronome possessivo masculino de segunda pessoa'], examples: ['Onde está o teu casaco?'], no_antonym: true },

  // Family
  { word: 'irmã', theme: 'family.json', form: 'noun', gender: 'feminine', article: 'a', countability: 'countable', plural_form: 'irmãs', transcription: '/iɾˈmɐ̃/', emoji: '👧', definitions: ['pessoa do sexo feminino nascida dos mesmos pais'], examples: ['A minha irmã estuda na escola primária.'], no_antonym: true },
  { word: 'irmão', theme: 'family.json', form: 'noun', gender: 'masculine', article: 'o', countability: 'countable', plural_form: 'irmãos', transcription: '/iɾˈmɐ̃u̯/', emoji: '👦', definitions: ['pessoa do sexo masculino nascida dos mesmos pais'], examples: ['O meu irmão joga futebol ao fim de semana.'], no_antonym: true },

  // Animals
  { word: 'cavalo', theme: 'animals.json', form: 'noun', gender: 'masculine', article: 'o', countability: 'countable', plural_form: 'cavalos', transcription: '/kɐˈvalu/', emoji: '🐴', definitions: ['mamífero quadrúpede herbívoro de grande porte'], examples: ['O cavalo corre no campo de manhã.'], no_antonym: true },
  { word: 'pássaro', theme: 'animals.json', form: 'noun', gender: 'masculine', article: 'o', countability: 'countable', plural_form: 'pássaros', transcription: '/ˈpasɐɾu/', emoji: '🐦', definitions: ['ave pequena que voa e canta nas árvores'], examples: ['O pássaro canta na árvore do jardim.'], no_antonym: true },
  { word: 'peixe', theme: 'animals.json', form: 'noun', gender: 'masculine', article: 'o', countability: 'countable', plural_form: 'peixes', transcription: '/ˈpɐi̯ʃɨ/', emoji: '🐟', definitions: ['animal aquático com escamas que respira por guelras'], examples: ['O peixe nada no mar azul.'], no_antonym: true },
  { word: 'vaca', theme: 'animals.json', form: 'noun', gender: 'feminine', article: 'a', countability: 'countable', plural_form: 'vacas', transcription: '/ˈvakɐ/', emoji: '🐄', definitions: ['fêmea do boi que produz leite'], examples: ['A vaca come erva na quinta.'], no_antonym: true },

  // Weather
  { word: 'chuvoso', theme: 'weather.json', form: 'adjective', transcription: '/ʃuˈvozu/', emoji: '🌧️', definitions: ['que tem muita chuva'], examples: ['Hoje é um dia chuvoso na cidade.'], antonyms: ['ensolarado'] },
  { word: 'ensolarado', theme: 'weather.json', form: 'adjective', transcription: '/ẽsulɐˈɾaðu/', emoji: '☀️', definitions: ['que tem muito sol e céu limpo'], examples: ['A manhã está ensolarada e quente.'], antonyms: ['chuvoso'] },
  { word: 'fresco', theme: 'weather.json', form: 'adjective', transcription: '/ˈfɾeʃku/', emoji: '🍃', definitions: ['que tem temperatura moderadamente baixa'], examples: ['O ar da manhã está fresco e agradável.'], no_antonym: true },

  // Food & Drink
  { word: 'bacalhau', theme: 'food_drink.json', form: 'noun', gender: 'masculine', article: 'o', countability: 'countable', plural_form: 'bacalhaus', transcription: '/bɐkɐˈʎau̯/', emoji: '🐟', definitions: ['peixe salgado e seco tradicional da culinária portuguesa'], examples: ['Comemos bacalhau assado no domingo.'], no_antonym: true },
  { word: 'brigadeiro', theme: 'food_drink.json', form: 'noun', gender: 'masculine', article: 'o', countability: 'countable', plural_form: 'brigadeiros', transcription: '/bɾiɡɐˈðɐi̯ɾu/', emoji: '🍬', definitions: ['doce de chocolate e leite condensado'], examples: ['Trouxe brigadeiros saborosos para a festa.'], no_antonym: true },
  { word: 'feijoada', theme: 'food_drink.json', form: 'noun', gender: 'feminine', article: 'a', countability: 'countable', plural_form: 'feijoadas', transcription: '/fɐi̯ʒuˈaðɐ/', emoji: '🍲', definitions: ['prato tradicional de feijão com várias carnes'], examples: ['Servimos feijoada quente no almoço.'], no_antonym: true },
  { word: 'laranja', theme: 'food_drink.json', form: 'noun', gender: 'feminine', article: 'a', countability: 'countable', plural_form: 'laranjas', transcription: '/lɐˈɾɐ̃ʒɐ/', emoji: '🍊', definitions: ['fruta cítrica redonda de cor alaranjada'], examples: ['Bebo sumo de laranja fresca todos os dias.'], no_antonym: true },

  // House / School / Body / Clothes / Common Nouns
  { word: 'computador', theme: 'house_furniture.json', form: 'noun', gender: 'masculine', article: 'o', countability: 'countable', plural_form: 'computadores', transcription: '/kõputɐˈðoɾ/', emoji: '💻', definitions: ['máquina eletrónica para processar dados e aceder à internet'], examples: ['Uso o computador para trabalhar no escritório.'], no_antonym: true },
  { word: 'telemóvel', theme: 'house_furniture.json', form: 'noun', gender: 'masculine', article: 'o', countability: 'countable', plural_form: 'telemóveis', transcription: '/tɛlɛˈmɔvɛɫ/', emoji: '📱', definitions: ['telefone portátil pessoal sem fios'], examples: ['Atendo a chamada no telemóvel.'], no_antonym: true },
  { word: 'caderno', theme: 'school.json', form: 'noun', gender: 'masculine', article: 'o', countability: 'countable', plural_form: 'cadernos', transcription: '/kɐˈðɛɾnu/', emoji: '📓', definitions: ['conjunto de folhas de papel para escrever ou desenhar'], examples: ['Escrevo os apontamentos no caderno de notas.'], no_antonym: true },
  { word: 'cabeça', theme: 'body_health.json', form: 'noun', gender: 'feminine', article: 'a', countability: 'countable', plural_form: 'cabeças', transcription: '/kɐˈbesɐ/', emoji: '🗣️', definitions: ['parte superior do corpo humano onde estão os olhos e o cérebro'], examples: ['Lavo a cabeça com champô suave.'], no_antonym: true },
  { word: 'camisa', theme: 'clothes.json', form: 'noun', gender: 'feminine', article: 'a', countability: 'countable', plural_form: 'camisas', transcription: '/kɐˈmizɐ/', emoji: '👔', definitions: ['peça de vestuário com botões e mangas'], examples: ['Visto uma camisa branca para a reunião.'], no_antonym: true },
  { word: 'vestido', theme: 'clothes.json', form: 'noun', gender: 'masculine', article: 'o', countability: 'countable', plural_form: 'vestidos', transcription: '/vɨʃˈtiðu/', emoji: '👗', definitions: ['peça de vestuário feminino de peça única'], examples: ['Ela veste um lindo vestido azul.'], no_antonym: true },
  { word: 'festa', theme: 'common_nouns.json', form: 'noun', gender: 'feminine', article: 'a', countability: 'countable', plural_form: 'festas', transcription: '/ˈfɛʃtɐ/', emoji: '🎉', definitions: ['reunião de celebração com música e diversão'], examples: ['A festa de aniversário começa às seis horas.'], no_antonym: true },
  { word: 'lua', theme: 'geography.json', form: 'noun', gender: 'feminine', article: 'a', countability: 'countable', plural_form: 'luas', transcription: '/ˈluɐ/', emoji: '🌙', definitions: ['satélite natural da Terra visível à noite'], examples: ['A lua ilumina o céu durante a noite.'], no_antonym: true }
];

// List of all Nationalities and Proper Places with authentic European Portuguese IPA
const properPlacesNationalities = [
  { word: 'Alemanha', article: 'a', gender: 'feminine', transcription: '/ɐlɨˈmɐɲɐ/', definitions: ['país europeu cuja capital é Berlim'], examples: ['A Alemanha é um país bonito na Europa.'], emoji: '🇩🇪' },
  { word: 'Amesterdão', article: 'a', gender: 'feminine', transcription: '/ɐmɨʃtɐɾˈdɐ̃u̯/', definitions: ['capital e maior cidade dos Países Baixos'], examples: ['Amesterdão é famosa pelos seus canais.'], emoji: '🇳🇱' },
  { word: 'Atenas', article: 'a', gender: 'feminine', transcription: '/ɐˈtenɐʃ/', definitions: ['capital e maior cidade da Grécia'], examples: ['Atenas é uma cidade muito antiga e histórica.'], emoji: '🏛️' },
  { word: 'Austrália', article: 'a', gender: 'feminine', transcription: '/ɐu̯ʃˈtɾaliɐ/', definitions: ['país e continente localizado no hemisfério sul'], examples: ['A Austrália tem praias muito bonitas.'], emoji: '🇦🇺' },
  { word: 'Áustria', article: 'a', gender: 'feminine', transcription: '/ˈɐu̯ʃtɾiɐ/', definitions: ['país europeu cuja capital é Viena'], examples: ['A Áustria fica no centro da Europa.'], emoji: '🇦🇹' },
  { word: 'Barcelona', article: 'a', gender: 'feminine', transcription: '/bɐɾsɨˈlonɐ/', definitions: ['cidade espanhola na costa do Mediterrâneo'], examples: ['Barcelona é famosa pela sua arquitetura.'], emoji: '🇪🇸' },
  { word: 'Bélgica', article: 'a', gender: 'feminine', transcription: '/ˈbɛɫʒikɐ/', definitions: ['país europeu cuja capital é Bruxelas'], examples: ['A Bélgica é conhecida pelo seu chocolate.'], emoji: '🇧🇪' },
  { word: 'Berlim', article: 'a', gender: 'feminine', transcription: '/bɨɾˈlĩ/', definitions: ['capital e maior cidade da Alemanha'], examples: ['Berlim tem muitos museus interessantes.'], emoji: '🇩🇪' },
  { word: 'Brasil', article: 'o', gender: 'masculine', transcription: '/bɾɐˈziɫ/', definitions: ['maior país da América do Sul de língua portuguesa'], examples: ['O Brasil é um país grande e ensolarado.'], emoji: '🇧🇷' },
  { word: 'brasileiro', article: 'o', gender: 'masculine', countability: 'countable', plural_form: 'brasileiros', transcription: '/bɾɐziˈlɐi̯ɾu/', definitions: ['pessoa natural ou habitante do Brasil'], examples: ['O meu amigo brasileiro fala português.'], emoji: '🇧🇷' },
  { word: 'Canadá', article: 'o', gender: 'masculine', transcription: '/kɐnɐˈða/', definitions: ['país localizado na América do Norte'], examples: ['O Canadá tem invernos muito frios.'], emoji: '🇨🇦' },
  { word: 'Chicago', article: 'o', gender: 'masculine', transcription: '/ʃiˈkaɡu/', definitions: ['grande cidade nos Estados Unidos da América'], examples: ['Chicago fica junto a um grande lago.'], emoji: '🇺🇸' },
  { word: 'China', article: 'a', gender: 'feminine', transcription: '/ˈʃinɐ/', definitions: ['país populoso localizado na Ásia'], examples: ['A China é um país antigo e muito grande.'], emoji: '🇨🇳' },
  { word: 'Cidade do México', article: 'a', gender: 'feminine', transcription: '/siˈðaðɨ ðu ˈmɛksiku/', definitions: ['capital e maior cidade do México'], examples: ['A Cidade do México é muito populosa.'], emoji: '🇲🇽' },
  { word: 'Coreia do Sul', article: 'a', gender: 'feminine', transcription: '/kuˈɾɛi̯ɐ ðu ˈsuɫ/', definitions: ['país localizado no leste da Ásia'], examples: ['A Coreia do Sul produz muita tecnologia.'], emoji: '🇰🇷' },
  { word: 'Dinamarca', article: 'a', gender: 'feminine', transcription: '/dinɐˈmɐɾkɐ/', definitions: ['país nórdico do norte da Europa'], examples: ['A Dinamarca é um país muito organizado.'], emoji: '🇩🇰' },
  { word: 'Edimburgo', article: 'o', gender: 'masculine', transcription: '/ɨðĩˈbuɾɡu/', definitions: ['capital da Escócia no Reino Unido'], examples: ['Edimburgo tem um castelo histórico.'], emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  { word: 'Egito', article: 'o', gender: 'masculine', transcription: '/iˈʒitu/', definitions: ['país localizado no norte de África'], examples: ['O Egito é famoso pelas pirâmides.'], emoji: '🇪🇬' },
  { word: 'Espanha', article: 'a', gender: 'feminine', transcription: '/iʃˈpɐɲɐ/', definitions: ['país europeu vizinho de Portugal'], examples: ['A Espanha fica na Península Ibérica.'], emoji: '🇪🇸' },
  { word: 'EUA', article: 'os', gender: 'masculine', transcription: '/ˈe.u.ɐ/', definitions: ['Estados Unidos da América'], examples: ['Os EUA ficam na América do Norte.'], emoji: '🇺🇸' },
  { word: 'Finlândia', article: 'a', gender: 'feminine', transcription: '/fĩˈlɐ̃diɐ/', definitions: ['país nórdico no norte da Europa'], examples: ['A Finlândia tem muitas florestas e lagos.'], emoji: '🇫🇮' },
  { word: 'Florença', article: 'a', gender: 'feminine', transcription: '/fluˈɾẽsɐ/', definitions: ['cidade histórica italiana na Toscana'], examples: ['Florença é uma cidade cheia de arte.'], emoji: '🇮🇹' },
  { word: 'França', article: 'a', gender: 'feminine', transcription: '/ˈfɾɐ̃sɐ/', definitions: ['país europeu cuja capital é Paris'], examples: ['A França é famosa pela sua gastronomia.'], emoji: '🇫🇷' },
  { word: 'Grécia', article: 'a', gender: 'feminine', transcription: '/ˈɡɾɛsiɐ/', definitions: ['país europeu no sul da Europa com muitas ilhas'], examples: ['A Grécia tem ilhas muito bonitas.'], emoji: '🇬🇷' },
  { word: 'Índia', article: 'a', gender: 'feminine', transcription: '/ˈĩdiɐ/', definitions: ['país grande localizado no sul da Ásia'], examples: ['A Índia tem uma cultura muito rica.'], emoji: '🇮🇳' },
  { word: 'Inglaterra', article: 'a', gender: 'feminine', transcription: '/ĩɡlɐˈtɛʁɐ/', definitions: ['país que faz parte do Reino Unido'], examples: ['A Inglaterra fica numa ilha europeia.'], emoji: '🇬🇧' },
  { word: 'inglês', article: 'o', gender: 'masculine', countability: 'countable', plural_form: 'ingleses', transcription: '/ĩˈɡleʃ/', definitions: ['pessoa natural ou habitante da Inglaterra'], examples: ['O professor inglês ensina a língua inglesa.'], emoji: '🇬🇧' },
  { word: 'Irlanda', article: 'a', gender: 'feminine', transcription: '/iɾˈlɐ̃dɐ/', definitions: ['país insular no noroeste da Europa'], examples: ['A Irlanda é conhecida pelas suas paisagens verdes.'], emoji: '🇮🇪' },
  { word: 'Itália', article: 'a', gender: 'feminine', transcription: '/iˈtaliɐ/', definitions: ['país europeu cuja capital é Roma'], examples: ['A Itália é famosa pela pizza e massa.'], emoji: '🇮🇹' },
  { word: 'Japão', article: 'o', gender: 'masculine', transcription: '/ʒɐˈpɐ̃u̯/', definitions: ['país insular localizado na Ásia'], examples: ['O Japão é um país com muita tradição.'], emoji: '🇯🇵' },
  { word: 'Londres', article: 'o', gender: 'masculine', transcription: '/ˈlõdɾɨʃ/', definitions: ['capital do Reino Unido'], examples: ['Londres é uma cidade cosmopolita.'], emoji: '🇬🇧' },
  { word: 'Los Angeles', article: 'o', gender: 'masculine', transcription: '/lɔz ˈɐ̃ʒɨlɨʃ/', definitions: ['grande cidade no estado da Califórnia'], examples: ['Los Angeles é famosa pelo cinema.'], emoji: '🇺🇸' },
  { word: 'Melbourne', article: 'o', gender: 'masculine', transcription: '/mɛɫˈbuɾnɨ/', definitions: ['cidade importante na Austrália'], examples: ['Melbourne fica no sul da Austrália.'], emoji: '🇦🇺' },
  { word: 'Miami', article: 'o', gender: 'masculine', transcription: '/miˈɐmi/', definitions: ['cidade no estado da Flórida nos Estados Unidos'], examples: ['Miami tem um clima quente e praias.'], emoji: '🇺🇸' },
  { word: 'Montreal', article: 'o', gender: 'masculine', transcription: '/mõtɾiˈaɫ/', definitions: ['cidade no Canadá onde se fala francês'], examples: ['Montreal fica na província do Quebeque.'], emoji: '🇨🇦' },
  { word: 'Moscovo', article: 'o', gender: 'masculine', transcription: '/muʃˈkovu/', definitions: ['capital da Rússia (variedade europeia: Moscovo; pt-BR: Moscou)'], examples: ['Moscovo é a capital da Rússia.'], emoji: '🇷🇺' },
  { word: 'Nova Iorque', article: 'a', gender: 'feminine', transcription: '/ˈnɔvɐ iˈɔɾkɨ/', definitions: ['grande cidade nos Estados Unidos da América'], examples: ['Nova Iorque tem edifícios muito altos.'], emoji: '🗽' },
  { word: 'Noruega', article: 'a', gender: 'feminine', transcription: '/nuɾuˈɛɣɐ/', definitions: ['país nórdico no norte da Europa'], examples: ['A Noruega tem fiordes fantásticos.'], emoji: '🇳🇴' },
  { word: 'Países Baixos', article: 'os', gender: 'masculine', transcription: '/pɐˈizɨʃ ˈbɐi̯ʃuʃ/', definitions: ['país europeu cuja capital é Amesterdão'], examples: ['Os Países Baixos são conhecidos pelos moinhos.'], emoji: '🇳🇱' },
  { word: 'Paris', article: 'o', gender: 'masculine', transcription: '/pɐˈɾiʃ/', definitions: ['capital e maior cidade da França'], examples: ['Paris é conhecida como a cidade das luzes.'], emoji: '🇫🇷' },
  { word: 'Pequim', article: 'o', gender: 'masculine', transcription: '/pɨˈkĩ/', definitions: ['capital da China'], examples: ['Pequim é a capital histórica da China.'], emoji: '🇨🇳' },
  { word: 'Polónia', article: 'a', gender: 'feminine', transcription: '/puˈlɔniɐ/', definitions: ['país localizado na Europa Central'], examples: ['A Polónia é um país com muita história.'], emoji: '🇵🇱' },
  { word: 'português', article: 'o', gender: 'masculine', countability: 'countable', plural_form: 'portugueses', transcription: '/puɾtuˈɣeʃ/', definitions: ['pessoa natural ou habitante de Portugal'], examples: ['O cidadão português vive em Lisboa.'], emoji: '🇵🇹' },
  { word: 'Praga', article: 'a', gender: 'feminine', transcription: '/ˈpɾaɣɐ/', definitions: ['capital da República Checa'], examples: ['Praga tem uma ponte antiga muito bonita.'], emoji: '🇨🇿' },
  { word: 'Rio de Janeiro', article: 'o', gender: 'masculine', transcription: '/ˈʁiu̯ ðɨ ʒɐˈnɐi̯ɾu/', definitions: ['cidade famosa do Brasil'], examples: ['O Rio de Janeiro tem praias bonitas.'], emoji: '🇧🇷' },
  { word: 'Roma', article: 'a', gender: 'feminine', transcription: '/ˈʁomɐ/', definitions: ['capital e maior cidade da Itália'], examples: ['Roma tem monumentos romanos antigos.'], emoji: '🇮🇹' },
  { word: 'Rússia', article: 'a', gender: 'feminine', transcription: '/ˈʁusiɐ/', definitions: ['maior país do mundo em extensão territorial'], examples: ['A Rússia fica na Europa e na Ásia.'], emoji: '🇷🇺' },
  { word: 'São Francisco', article: 'o', gender: 'masculine', transcription: '/sɐ̃u̯ fɾɐ̃ˈsiʃku/', definitions: ['cidade na Califórnia nos Estados Unidos'], examples: ['São Francisco é famosa pela sua ponte.'], emoji: '🇺🇸' },
  { word: 'Suécia', article: 'a', gender: 'feminine', transcription: '/suˈɛsiɐ/', definitions: ['país nórdico no norte da Europa'], examples: ['A Suécia tem um clima frio no inverno.'], emoji: '🇸🇪' },
  { word: 'Suíça', article: 'a', gender: 'feminine', transcription: '/suˈisɐ/', definitions: ['país europeu neutro nas montanhas dos Alpes'], examples: ['A Suíça é famosa pelos Alpes e relógios.'], emoji: '🇨🇭' },
  { word: 'Sydney', article: 'o', gender: 'masculine', transcription: '/ˈsidni/', definitions: ['maior cidade da Austrália'], examples: ['Sydney tem uma famosa ópera à beira-mar.'], emoji: '🇦🇺' },
  { word: 'Tailândia', article: 'a', gender: 'feminine', transcription: '/tɐi̯ˈlɐ̃diɐ/', definitions: ['país localizado no sudeste asiático'], examples: ['A Tailândia tem praias tropicais e templos.'], emoji: '🇹🇭' },
  { word: 'Tóquio', article: 'o', gender: 'masculine', transcription: '/ˈtɔkju/', definitions: ['capital e maior cidade do Japão'], examples: ['Tóquio é uma cidade moderna e organizada.'], emoji: '🇯🇵' },
  { word: 'Ucrânia', article: 'a', gender: 'feminine', transcription: '/uˈkɾɐniɐ/', definitions: ['país localizado no leste da Europa'], examples: ['A Ucrânia é um país na Europa de Leste.'], emoji: '🇺🇦' },
  { word: 'Vancouver', article: 'o', gender: 'masculine', transcription: '/vɐ̃ˈkuvɨɾ/', definitions: ['cidade na costa oeste do Canadá'], examples: ['Vancouver tem montanhas e mar por perto.'], emoji: '🇨🇦' },
  { word: 'Veneza', article: 'a', gender: 'feminine', transcription: '/vɨˈnezɐ/', definitions: ['cidade italiana famosa pelos seus canais'], examples: ['Veneza é uma cidade sem carros.'], emoji: '🇮🇹' },
  { word: 'Viena', article: 'a', gender: 'feminine', transcription: '/viˈenɐ/', definitions: ['capital da Áustria'], examples: ['Viena é famosa pela sua música clássica.'], emoji: '🇦🇹' },
  { word: 'Washington D.C.', article: 'o', gender: 'masculine', transcription: '/ˈwɔʃĩɡtõ/', definitions: ['capital dos Estados Unidos da América'], examples: ['Washington D.C. é a capital dos EUA.'], emoji: '🇺🇸' },
  { word: 'Albert Einstein', article: 'o', gender: 'masculine', transcription: '/ˈaɫbɛɾt ˈɐi̯nʃtɐi̯n/', definitions: ['famoso físico teórico alemão'], examples: ['Albert Einstein foi um grande cientista.'], emoji: '🧠' },
  { word: 'Beyoncé', article: 'a', gender: 'feminine', transcription: '/biˈõse/', definitions: ['famosa cantora e artista norte-americana'], examples: ['Beyoncé é uma cantora internacional.'], emoji: '🎤' },
  { word: 'Cristiano Ronaldo', article: 'o', gender: 'masculine', transcription: '/kɾiʃtiˈɐnu ʁuˈnɐɫðu/', definitions: ['famoso jogador de futebol português'], examples: ['Cristiano Ronaldo é um futebolista famoso.'], emoji: '⚽' },
  { word: 'Elon Musk', article: 'o', gender: 'masculine', transcription: '/ˈilõ ˈmɐʃk/', definitions: ['empresário e empreendedor de tecnologia'], examples: ['Elon Musk trabalha em tecnologia espacial.'], emoji: '🚀' },
  { word: 'Leonardo da Vinci', article: 'o', gender: 'masculine', transcription: '/liu̯ˈnaɾðu ðɐ ˈvĩsi/', definitions: ['famoso pintor e génio italiano do Renascimento'], examples: ['Leonardo da Vinci pintou obras famosas.'], emoji: '🎨' },
  { word: 'Lionel Messi', article: 'o', gender: 'masculine', transcription: '/liˈɔnɛɫ ˈmɛsi/', definitions: ['famoso jogador de futebol argentino'], examples: ['Lionel Messi joga futebol ao mais alto nível.'], emoji: '⚽' },
  { word: 'Marie Curie', article: 'a', gender: 'feminine', transcription: '/mɐˈɾi kyˈɾi/', definitions: ['famosa cientista e física polaca'], examples: ['Marie Curie ganhou dois Prémios Nobel.'], emoji: '🔬' },
  { word: 'Nelson Mandela', article: 'o', gender: 'masculine', transcription: '/ˈnɛɫsõ mɐ̃ˈdɛlɐ/', definitions: ['líder histórico e prémio Nobel da paz sul-africano'], examples: ['Nelson Mandela lutou pela paz.'], emoji: '🕊️' },
  { word: 'Rainha Isabel II', article: 'a', gender: 'feminine', transcription: '/ʁɐˈiɲɐ izɐˈbɛɫ/', definitions: ['monarca histórica do Reino Unido'], examples: ['A Rainha Isabel II reinou durante muitos anos.'], emoji: '👑' },
  { word: 'Taylor Swift', article: 'a', gender: 'feminine', transcription: '/ˈtɐi̯luɾ ˈswift/', definitions: ['famosa cantora e compositora norte-americana'], examples: ['Taylor Swift canta canções populares.'], emoji: '🎸' },
  { word: 'William Shakespeare', article: 'o', gender: 'masculine', transcription: '/ˈwiljɐm ˈʃɐi̯kʃpiɾ/', definitions: ['famoso dramaturgo e poeta inglês'], examples: ['William Shakespeare escreveu peças de teatro.'], emoji: '🎭' }
];

properPlacesNationalities.forEach(p => {
  entriesToMigrate.push({
    word: p.word,
    theme: 'nationalities.json',
    form: 'noun',
    gender: p.gender,
    article: p.article,
    countability: p.countability || 'invariable',
    plural_form: p.plural_form,
    transcription: p.transcription,
    emoji: p.emoji || '🌐',
    definitions: p.definitions,
    examples: p.examples,
    no_antonym: true
  });
});

// Verbs to migrate to daily_verbs.json & auxiliary_verbs.json with European Portuguese IPA
const verbsList = [
  { word: 'acontecer', ipa: '/ɐkõtɨˈseɾ/', def: 'ocorrer ou dar-se um facto', ex: 'O que vai acontecer amanhã?' },
  { word: 'acordar', ipa: '/ɐkuɾˈðaɾ/', def: 'despertar do sono', ex: 'Acordo cedo todos os dias.' },
  { word: 'adicionar', ipa: '/ɐðisiuˈnaɾ/', def: 'acrescentar algo a um conjunto', ex: 'Vou adicionar açúcar ao chá.' },
  { word: 'agradecer', ipa: '/ɐɣɾɐðɨˈseɾ/', def: 'dar graças por um benefício', ex: 'Agradeço a tua ajuda constante.' },
  { word: 'ajudar', ipa: '/ɐʒuˈðaɾ/', def: 'prestar auxílio ou socorro a alguém', ex: 'Ele ajuda os amigos na escola.' },
  { word: 'alugar', ipa: '/ɐluˈɣaɾ/', def: 'ceder ou tomar mediante pagamento de renda', ex: 'Queremos alugar um apartamento.' },
  { word: 'amar', ipa: '/ɐˈmaɾ/', def: 'sentir amor por alguém ou algo', ex: 'Ela ama a sua família.' },
  { word: 'aprender', ipa: '/ɐpɾẽˈdeɾ/', def: 'adquirir conhecimento sobre algo', ex: 'Aprendo português na escola.' },
  { word: 'apresentar', ipa: '/ɐpɾɨzẽˈtaɾ/', def: 'dar a conhecer alguém ou algo', ex: 'Apresento o meu novo amigo.' },
  { word: 'assistir', ipa: '/ɐsiʃˈtiɾ/', def: 'ver ou presenciar um espetáculo', ex: 'Assistimos a um filme no cinema.' },
  { word: 'beber', ipa: '/bɨˈbeɾ/', def: 'ingerir um líquido pela boca', ex: 'Bebo água fresca no verão.' },
  { word: 'cair', ipa: '/kɐˈiɾ/', def: 'ir para o chão por perda de equilíbrio', ex: 'A folha cai da árvore.' },
  { word: 'caminhar', ipa: '/kɐmiˈɲaɾ/', def: 'andar a pé a passo normal', ex: 'Caminho no parque todas as manhãs.' },
  { word: 'cancelar', ipa: '/kɐ̃sɨˈlaɾ/', def: 'anular a realização de algo', ex: 'Preciso de cancelar a reunião.' },
  { word: 'cantar', ipa: '/kɐ̃ˈtaɾ/', def: 'produzir sons musicais com a voz', ex: 'Ela canta muito bem.' },
  { word: 'celebrar', ipa: '/sɨlɨˈbɾaɾ/', def: 'fazer festa em comemoração de algo', ex: 'Celebramos o aniversário em casa.' },
  { word: 'chegar', ipa: '/ʃɨˈɣaɾ/', def: 'atingir o fim de um percurso', ex: 'Chego ao trabalho às nove horas.' },
  { word: 'cobrar', ipa: '/kuˈbɾaɾ/', def: 'exigir o pagamento de uma quantia', ex: 'O banco cobra uma taxa mensal.' },
  { word: 'começar', ipa: '/kumɨˈsaɾ/', def: 'dar início a uma ação', ex: 'A aula começa às nove horas.' },
  { word: 'comer', ipa: '/kuˈmeɾ/', def: 'ingerir alimentos sólidos', ex: 'Como uma maçã fresca.' },
  { word: 'comprar', ipa: '/kõˈpɾaɾ/', def: 'adquirir algo mediante pagamento', ex: 'Compro pão fresco na padaria.' },
  { word: 'concordar', ipa: '/kõkuɾˈðaɾ/', def: 'ter a mesma opinião de outra pessoa', ex: 'Concordo com a tua ideia.' },
  { word: 'conduzir', ipa: '/kõduˈziɾ/', def: 'guiar um veículo na estrada', ex: 'Conduzo o carro com cuidado.' },
  { word: 'conhecer', ipa: '/kuɲɨˈseɾ/', def: 'ter saber ou familiaridade com algo', ex: 'Conheço bem a cidade de Lisboa.' },
  { word: 'construir', ipa: '/kõʃtɾuˈiɾ/', def: 'fazer ou erguer uma edificação', ex: 'Eles constroem uma casa nova.' },
  { word: 'contar', ipa: '/kõˈtaɾ/', def: 'narrar uma história ou calcular', ex: 'O avô conta histórias aos netos.' },
  { word: 'continuar', ipa: '/kõtinuˈaɾ/', def: 'prosseguir numa ação', ex: 'Continuo a estudar até à noite.' },
  { word: 'convidar', ipa: '/kõviˈðaɾ/', def: 'pedir a presença de alguém num evento', ex: 'Convido os meus amigos para o jantar.' },
  { word: 'correr', ipa: '/kuˈʁeɾ/', def: 'deslocar-se com rapidez a pé', ex: 'Corro no parque ao fim da tarde.' },
  { word: 'cortar', ipa: '/kuɾˈtaɾ/', def: 'dividir com instrumento afiado', ex: 'Corto o pão com a faca.' },
  { word: 'cozinhar', ipa: '/kuziˈɲaɾ/', def: 'preparar alimentos ao lume', ex: 'Cozinho a refeição para a família.' },
  { word: 'crescer', ipa: '/kɾɨʃˈseɾ/', def: 'aumentar de tamanho ou idade', ex: 'As crianças crescem muito depressa.' },
  { word: 'custar', ipa: '/kuʃˈtaɾ/', def: 'ter determinado preço', ex: 'O livro custa dez euros.' },
  { word: 'dançar', ipa: '/dɐ̃ˈsaɾ/', def: 'mover o corpo ao ritmo da música', ex: 'Dançamos na festa de aniversário.' },
  { word: 'dar', ipa: '/ˈdaɾ/', def: 'entregar gratuitamente algo a alguém', ex: 'Dou um presente ao meu amigo.' },
  { word: 'decidir', ipa: '/dɨsiˈðiɾ/', def: 'tomar uma resolução clara', ex: 'Decido estudar esta tarde.' },
  { word: 'deitar-se', ipa: '/dɐi̯ˈtaɾ sɨ/', def: 'ir para a cama descansar', ex: 'Deito-me cedo durante a semana.' },
  { word: 'descansar', ipa: '/dɨʃkɐ̃ˈsaɾ/', def: 'recuperar forças após esforço', ex: 'Descanso no sofá ao fim do dia.' },
  { word: 'desenhar', ipa: '/dɨziˈɲaɾ/', def: 'fazer traços e figuras no papel', ex: 'O rapaz desenha uma árvore bonita.' },
  { word: 'desfrutar', ipa: '/dɨʃfɾuˈtaɾ/', def: 'gozar ou aproveitar algo agradável', ex: 'Desfruto do sol na praia.' },
  { word: 'dever', ipa: '/dɨˈveɾ/', def: 'ter a obrigação de fazer algo ou ter uma dívida', ex: 'Devo estudar para o exame.' },
  { word: 'dizer', ipa: '/diˈzeɾ/', def: 'exprimir por meio de palavras', ex: 'Digo a verdade aos meus pais.' },
  { word: 'dormir', ipa: '/duɾˈmiɾ/', def: 'estar num estado de repouso noturno', ex: 'Dormo oito horas todas as noites.' },
  { word: 'empurrar', ipa: '/ẽpuˈʁaɾ/', def: 'exercer força para afastar algo', ex: 'Empurro a porta para abrir.' },
  { word: 'encomendar', ipa: '/ẽkumẽˈdaɾ/', def: 'pedir a entrega de um bem ou serviço', ex: 'Encomendo uma pizza para o jantar.' },
  { word: 'encontrar', ipa: '/ẽkõˈtɾaɾ/', def: 'achar algo que se procurava', ex: 'Encontro as chaves em cima da mesa.' },
  { word: 'ensinar', ipa: '/ẽsiˈnaɾ/', def: 'transmitir conhecimentos a alguém', ex: 'A professora ensina português.' },
  { word: 'entender', ipa: '/ẽtẽˈdeɾ/', def: 'compreender o sentido de algo', ex: 'Entendo bem a explicação.' },
  { word: 'enviar', ipa: '/ẽviˈaɾ/', def: 'remeter uma mensagem ou pacote', ex: 'Envio uma carta pelo correio.' },
  { word: 'escolher', ipa: '/ɨʃkuˈʎeɾ/', def: 'selecionar entre várias opções', ex: 'Escolho o livro que quero ler.' },
  { word: 'escrever', ipa: '/ɨʃkɾɨˈveɾ/', def: 'representar palavras por símbolos', ex: 'Escrevo uma mensagem no telemóvel.' },
  { word: 'esperar', ipa: '/ɨʃpɨˈɾaɾ/', def: 'ficar aguardando a chegada de algo', ex: 'Espero pelo autocarro na paragem.' },
  { word: 'esquecer', ipa: '/ɨʃkɨˈseɾ/', def: 'perder da memória consciente', ex: 'Não me esqueço do teu nome.' },
  { word: 'estudar', ipa: '/ɨʃtuˈðaɾ/', def: 'dedicar-se à aprendizagem de matérias', ex: 'Estudo para o exame de amanhã.' },
  { word: 'exercitar', ipa: '/ɨzɛɾsiˈtaɾ/', def: 'praticar exercícios físicos ou mentais', ex: 'Exercito o corpo diariamente.' },
  { word: 'explicar', ipa: '/ɨʃpliˈkaɾ/', def: 'tornar algo claro e inteligível', ex: 'O professor explica a lição.' },
  { word: 'falar', ipa: '/fɐˈlaɾ/', def: 'exprimir-se através da voz', ex: 'Falo português e inglês.' },
  { word: 'fazer', ipa: '/fɐˈzeɾ/', def: 'realizar ou produzir uma ação', ex: 'Faço os trabalhos de casa.' },
  { word: 'fechar', ipa: '/fɨˈʃaɾ/', def: 'tapar uma abertura ou porta', ex: 'Fecho a janela por causa do frio.' },
  { word: 'ficar', ipa: '/fiˈkaɾ/', def: 'permanecer num determinado local', ex: 'Fico em casa durante o fim de semana.' },
  { word: 'ganhar', ipa: '/ɡɐˈɲaɾ/', def: 'obter vitória ou receber vencimento', ex: 'A nossa equipa ganha o jogo.' },
  { word: 'gastar', ipa: '/ɡɐʃˈtaɾ/', def: 'despender dinheiro em compras', ex: 'Gasto dinheiro no supermercado.' },
  { word: 'gerir', ipa: '/ʒɨˈɾiɾ/', def: 'administrar um negócio ou recursos', ex: 'Ela gere o tempo muito bem.' },
  { word: 'gostar', ipa: '/ɡuʃˈtaɾ/', def: 'sentir simpatia ou agrado por algo', ex: 'Gosto de comer fruta fresca.' },
  { word: 'incluir', ipa: '/ĩkluiˈiɾ/', def: 'conter dentro de um todo', ex: 'O pequeno-almoço inclui sumo e pão.' },
  { word: 'ir', ipa: '/ˈiɾ/', def: 'deslocar-se de um ponto para outro', ex: 'Vou para a escola de manhã.' },
  { word: 'jogar', ipa: '/ʒuˈɣaɾ/', def: 'participar num jogo ou desporto', ex: 'Jogo futebol com os meus amigos.' },
  { word: 'lavar', ipa: '/lɐˈvaɾ/', def: 'limpar com água e sabão', ex: 'Lavo as mãos antes de comer.' },
  { word: 'lembrar', ipa: '/lẽˈbɾaɾ/', def: 'recordar algo na memória', ex: 'Lembro-me bem desse dia alegre.' },
  { word: 'ler', ipa: '/ˈleɾ/', def: 'interpretar texto escrito', ex: 'Lembro-me de ler este livro.' },
  { word: 'levantar-se', ipa: '/lɨvɐ̃ˈtaɾ sɨ/', def: 'sair da cama ou erguer-se', ex: 'Levanto-me às sete da manhã.' },
  { word: 'levar', ipa: '/lɨˈvaɾ/', def: 'transportar algo para outro local', ex: 'Levo o saco para as compras.' },
  { word: 'ligar', ipa: '/liˈɣaɾ/', def: 'telefonar a alguém ou acender aparelho', ex: 'Ligo a luz da sala.' },
  { word: 'limpar', ipa: '/lĩˈpaɾ/', def: 'retirar a sujidade de algo', ex: 'Limpo o meu quarto ao sábado.' },
  { word: 'magoar', ipa: '/mɐɣuˈaɾ/', def: 'causar dor física ou emocional', ex: 'Tenho cuidado para não magoar o pé.' },
  { word: 'manter', ipa: '/mɐ̃ˈteɾ/', def: 'conservar em determinado estado', ex: 'Mantenho a casa organizada.' },
  { word: 'morrer', ipa: '/muˈʁeɾ/', def: 'deixar de ter vida', ex: 'As plantas morrem sem água.' },
  { word: 'mostrar', ipa: '/muʃˈtɾaɾ/', def: 'dar a ver algo a outra pessoa', ex: 'Mostro as fotos da viagem aos amigos.' },
  { word: 'mover', ipa: '/muˈveɾ/', def: 'deslocar de uma posição para outra', ex: 'Movo a cadeira para perto da mesa.' },
  { word: 'mudar', ipa: '/muˈðaɾ/', def: 'alterar ou trocar de lugar', ex: 'Mudo de roupa após o treino.' },
  { word: 'nadar', ipa: '/nɐˈðaɾ/', def: 'deslocar-se na água movendo o corpo', ex: 'Nado na piscina no verão.' },
  { word: 'obter', ipa: '/ɔbˈteɾ/', def: 'alcançar ou conseguir algo', ex: 'Obtenho bons resultados no exame.' },
  { word: 'odiar', ipa: '/uðiˈaɾ/', def: 'sentir aversão por algo', ex: 'Odio chegar atrasado aos compromissos.' },
  { word: 'olhar', ipa: '/uˈʎaɾ/', def: 'dirigir os olhos para algo', ex: 'Olho para o céu azul.' },
  { word: 'ouvir', ipa: '/oˈviɾ/', def: 'perceber sons através dos ouvidos', ex: 'Ouço música relaxante à noite.' },
  { word: 'pagar', ipa: '/pɐˈɣaɾ/', def: 'entregar quantia pecuniária devida', ex: 'Pago a conta no restaurante.' },
  { word: 'parar', ipa: '/pɐˈɾaɾ/', def: 'cessar o movimento ou atividade', ex: 'O autocarro para na estação.' },
  { word: 'parecer', ipa: '/pɐɾɨˈseɾ/', def: 'dar a impressão de ser algo', ex: 'Parece que vai chover hoje.' },
  { word: 'partilhar', ipa: '/pɐɾtiˈʎaɾ/', def: 'dividir algo com outras pessoas', ex: 'Partilho a refeição com a família.' },
  { word: 'partir', ipa: '/pɐɾˈtiɾ/', def: 'iniciar viagem ou quebrar em pedaços', ex: 'O comboio parte às dez horas.' },
  { word: 'passar', ipa: '/pɐˈsaɾ/', def: 'transitar por um local ou gastar tempo', ex: 'Passo o dia a estudar na biblioteca.' },
  { word: 'pensar', ipa: '/pẽˈsaɾ/', def: 'usar a mente para raciocinar', ex: 'Penso na melhor solução.' },
  { word: 'perder', ipa: '/pɨɾˈdeɾ/', def: 'deixar de possuir algo ou não vencer', ex: 'Perco as chaves com frequência.' },
  { word: 'perguntar', ipa: '/pɨɾɣũˈtaɾ/', def: 'fazer uma questão a alguém', ex: 'Pergunto as horas ao colega.' },
  { word: 'pertencer', ipa: '/pɨɾtẽˈseɾ/', def: 'ser propriedade de alguém', ex: 'Este livro pertence à biblioteca.' },
  { word: 'pôr', ipa: '/ˈpoɾ/', theme: 'daily_verbs.json', def: 'colocar algo num determinado sítio', ex: 'Ponho o prato na mesa.' },
  { word: 'poupar', ipa: '/poˈpaɾ/', def: 'guardar dinheiro para o futuro', ex: 'Poupo dinheiro para as férias.' },
  { word: 'precisar', ipa: '/pɾɨsiˈzaɾ/', def: 'ter necessidade inevitável de algo', ex: 'Preciso de comprar pão fresco.' },
  { word: 'produzir', ipa: '/pɾuðuˈziɾ/', def: 'criar ou fabricar bens', ex: 'A fábrica produz vestuário de qualidade.' },
  { word: 'projetar', ipa: '/pɾuʒɛˈtaɾ/', def: 'planear algo para o futuro', ex: 'Projetamos uma viagem de férias.' },
  { word: 'puxar', ipa: '/puˈʃaɾ/', def: 'exercer força para trazer perto', ex: 'Puxo a porta para fechar.' },
  { word: 'quebrar', ipa: '/kɨˈbɾaɾ/', def: 'partir algo em pedaços', ex: 'O copo de vidro quebra se cair.' },
  { word: 'querer', ipa: '/kɨˈɾeɾ/', def: 'ter desejo ou intenção de algo', ex: 'Quero beber um sumo de laranja.' },
  { word: 'receber', ipa: '/ʁɨsɨˈbeɾ/', def: 'obter algo enviado por outrem', ex: 'Recebo uma carta pelo correio.' },
  { word: 'recomendar', ipa: '/ʁɨkumẽˈdaɾ/', def: 'aconselhar algo como bom', ex: 'Recomendo este restaurante aos amigos.' },
  { word: 'recuperar', ipa: '/ʁɨkupɨˈɾaɾ/', def: 'recompor-se de uma doença ou esforço', ex: 'Recupero a saúde com repouso.' },
  { word: 'relaxar', ipa: '/ʁɨlɐˈʃaɾ/', def: 'descontrair o corpo e a mente', ex: 'Relaxo no jardim ao fim da tarde.' },
  { word: 'reparar', ipa: '/ʁɨpɐˈɾaɾ/', def: 'consertar algo danificado', ex: 'O mecânico repara o carro.' },
  { word: 'repetir', ipa: '/ʁɨpɨˈtiɾ/', def: 'dizer ou fazer algo novamente', ex: 'Repito a palavra para memorizar.' },
  { word: 'reservar', ipa: '/ʁɨzɨɾˈvaɾ/', def: 'guardar antecipadamente um lugar', ex: 'Reservo uma mesa para o jantar.' },
  { word: 'responder', ipa: '/ʁɨʃpõˈdeɾ/', def: 'dar resposta a uma pergunta', ex: 'Respondo à pergunta do professor.' },
  { word: 'saber', ipa: '/sɐˈbeɾ/', def: 'ter conhecimento de uma informação', ex: 'Sei a resposta correta.' },
  { word: 'saltar', ipa: '/saɫˈtaɾ/', def: 'dar um pulo no ar', ex: 'As crianças saltam no jardim.' },
  { word: 'seguir', ipa: '/sɨˈɣiɾ/', def: 'ir atrás de alguém ou prosseguir', ex: 'Sigo as indicações do mapa.' },
  { word: 'sentar', ipa: '/sẽˈtaɾ/', def: 'tomar lugar numa cadeira', ex: 'Sento-me na cadeira da sala.' },
  { word: 'sentir', ipa: '/sẽˈtiɾ/', def: 'experimentar uma sensação ou emoção', ex: 'Sinto alegria ao ver os amigos.' },
  { word: 'ser', ipa: '/ˈseɾ/', theme: 'auxiliary_verbs.json', def: 'ter uma identidade ou estado permanente', ex: 'Eu sou estudante de português.' },
  { word: 'significar', ipa: '/siɣnifiˈkaɾ/', def: 'ter determinado sentido ou valor', ex: 'O que significa esta palavra?' },
  { word: 'sorrir', ipa: '/suˈʁiɾ/', def: 'mostrar um sorriso no rosto', ex: 'Sorrio quando estou feliz.' },
  { word: 'tentar', ipa: '/tẽˈtaɾ/', def: 'fazer esforço para conseguir algo', ex: 'Tento aprender palavras novas.' },
  { word: 'ter', ipa: '/ˈteɾ/', theme: 'auxiliary_verbs.json', def: 'possuir ou guardar algo consigo', ex: 'Tenho um cão muito simpático.' },
  { word: 'terminar', ipa: '/tɨɾmiˈnaɾ/', def: 'concluir uma tarefa ou ação', ex: 'Termino o trabalho às cinco horas.' },
  { word: 'tomar', ipa: '/tuˈmaɾ/', def: 'ingerir algo ou agarrar', ex: 'Tomo um chá quente no inverno.' },
  { word: 'tornar-se', ipa: '/tuɾˈnaɾ sɨ/', def: 'passar a ser algo diferente', ex: 'Ele quer tornar-se médico.' },
  { word: 'trabalhar', ipa: '/tɾɐbɐˈʎaɾ/', def: 'exercer uma atividade profissional', ex: 'Trabalho no escritório todos os dias.' },
  { word: 'trazer', ipa: '/tɾɐˈzeɾ/', def: 'transportar algo para junto de quem fala', ex: 'Trago o livro para a aula.' },
  { word: 'usar', ipa: '/uˈzaɾ/', def: 'fazer utilização de um objeto', ex: 'Uso o telemóvel para falar.' },
  { word: 'vender', ipa: '/vẽˈdeɾ/', def: 'ceder bens em troca de dinheiro', ex: 'A loja vende fruta fresca.' },
  { word: 'ver', ipa: '/ˈveɾ/', def: 'perceber com a vista', ex: 'Vejo o mar da janela.' },
  { word: 'verificar', ipa: '/vɨɾifiˈkaɾ/', def: 'examinar para comprovar a exatidão', ex: 'Verifico se a porta está fechada.' },
  { word: 'vestir', ipa: '/vɨʃˈtiɾ/', def: 'pôr roupa no corpo', ex: 'Visto um casaco quente.' },
  { word: 'viajar', ipa: '/viɐˈʒaɾ/', def: 'fazer uma deslocação a lugar distante', ex: 'Viajo para Lisboa no verão.' },
  { word: 'vir', ipa: '/ˈviɾ/', def: 'deslocar-se para perto de quem fala', ex: 'Ele vem à minha casa hoje.' },
  { word: 'virar', ipa: '/viˈɾaɾ/', def: 'mudar de direção ao caminhar', ex: 'Viro à esquerda na próxima rua.' },
  { word: 'visitar', ipa: '/viziˈtaɾ/', def: 'ir ver alguém ou um monumento', ex: 'Visito o museu no domingo.' },
  { word: 'viver', ipa: '/viˈveɾ/', def: 'estar vivo ou habitar num local', ex: 'Vivo numa cidade tranquila.' },
  { word: 'voar', ipa: '/vuˈaɾ/', def: 'sustentar-se e mover-se no ar', ex: 'O avião voa no céu.' },
  { word: 'voltar', ipa: '/vɔɫˈtaɾ/', def: 'regressar ao ponto de partida', ex: 'Volto a casa ao fim da tarde.' }
];

verbsList.forEach(v => {
  entriesToMigrate.push({
    word: v.word,
    theme: v.theme || 'daily_verbs.json',
    form: 'verb',
    transcription: v.ipa,
    emoji: '👉',
    definitions: [v.def],
    examples: [v.ex],
    no_antonym: true
  });
});

// Feelings & Emotions (feelings.json)
const feelingsList = [
  { word: 'aborrecido', ipa: '/ɐbuʁɨˈsiðu/', def: 'que sente tédio ou aborrecimento', ex: 'Estou aborrecido porque não tenho nada para fazer.' },
  { word: 'arrependido', ipa: '/ɐʁɨpẽˈdiðu/', def: 'que lamenta ter feito algo', ex: 'Ele ficou arrependido pelo erro cometido.' },
  { word: 'assustado', ipa: '/ɐsuʃˈtaðu/', def: 'que sente medo repentino', ex: 'O cão ficou assustado com o barulho.' },
  { word: 'cansado', ipa: '/kɐ̃ˈsaðu/', def: 'que precisa de repousar após esforço', ex: 'Estou cansado depois de trabalhar tanto.' },
  { word: 'dececionado', ipa: '/dɨsɨsjuˈnaðu/', def: 'que sofreu uma desilusão', ex: 'Ficou dececionado com o resultado do jogo.' },
  { word: 'entediado', ipa: '/ẽtɨðiˈaðu/', def: 'que sente falta de interesse ou tédio', ex: 'O aluno parece entediado na aula.' },
  { word: 'entusiasmado', ipa: '/ẽtuziɐʃˈmaðu/', def: 'que sente grande alegria e animação', ex: 'Estamos entusiasmados com a viagem.' },
  { word: 'estressado', ipa: '/ɨʃtɾɨˈsaðu/', def: 'que sofre de tensão ou stresse', ex: 'Ele fica estressado antes dos exames.' },
  { word: 'faminto', ipa: '/fɐˈmĩtu/', def: 'que sente grande necessidade de comer', ex: 'Cheguei a casa muito faminto.' },
  { word: 'feliz', ipa: '/fɨˈliʃ/', def: 'que sente grande contentamento e alegria', ex: 'Estou muito feliz hoje.' },
  { word: 'infeliz', ipa: '/ĩfɨˈliʃ/', def: 'que não sente alegria ou satisfação', ex: 'Ela sentiu-se infeliz com a notícia.' },
  { word: 'nervoso', ipa: '/nɨɾˈvozu/', def: 'que se encontra agitado ou ansioso', ex: 'Fico nervoso quando falo em público.' },
  { word: 'orgulhoso', ipa: '/oɾɣuˈʎozu/', def: 'que sente grande satisfação própria', ex: 'Os pais estão orgulhosos do filho.' },
  { word: 'preocupado', ipa: '/pɾiukuˈpaðu/', def: 'que sente inquietação por algum problema', ex: 'O pai está preocupado com o filho.' },
  { word: 'relaxado', ipa: '/ʁɨlɐˈʃaðu/', def: 'que se encontra calmo e sem tensão', ex: 'Sinto-me relaxado após as férias.' },
  { word: 'sedento', ipa: '/sɨˈdẽtu/', def: 'que sente grande sede por falta de água', ex: 'O atleta chegou sedento do treino.' },
  { word: 'surpreendido', ipa: '/suɾpɾɨẽˈdiðu/', def: 'que sente surpresa inesperada', ex: 'Fiquei surpreendido com a festa.' },
  { word: 'triste', ipa: '/ˈtɾiʃtɨ/', def: 'que sente tristeza e falta de alegria', ex: 'O menino está triste porque perdeu o brinquedo.' }
];

feelingsList.forEach(f => {
  entriesToMigrate.push({
    word: f.word,
    theme: 'feelings.json',
    form: 'adjective',
    transcription: f.ipa,
    emoji: '😊',
    definitions: [f.def],
    examples: [f.ex],
    no_antonym: true
  });
});

// Adjectives (adjectives.json)
const adjectivesList = [
  { word: 'amigável', ipa: '/ɐmiˈɡavɛɫ/', def: 'que demonstra amizade e simpatia', ex: 'O novo vizinho é muito amigável.' },
  { word: 'amarelo', ipa: '/ɐmɐˈɾɛlu/', def: 'que tem a cor do sol brilhante', ex: 'O girassol é uma flor amarela.' },
  { word: 'azul', ipa: '/ɐˈzuɫ/', def: 'que tem a cor do céu limpo', ex: 'O céu está azul hoje.' },
  { word: 'branco', ipa: '/ˈbɾɐ̃ku/', def: 'que tem a cor da neve fresca', ex: 'O papel de carta é branco.' },
  { word: 'castanho', ipa: '/kɐʃˈtɐɲu/', def: 'que tem a cor do café ou da madeira', ex: 'O cão tem um pelo castanho bonito.' },
  { word: 'cinzento', ipa: '/sĩˈzẽtu/', def: 'que tem a cor entre o branco e o preto', ex: 'As nuvens estão cinzentas.' },
  { word: 'cor-de-rosa', ipa: '/ˈkɔɾ ðɨ ˈʁɔzɐ/', def: 'que tem cor rosa suave', ex: 'Ela comprou uma camisola cor-de-rosa.' },
  { word: 'preto', ipa: '/ˈpɾetu/', def: 'que tem a cor da noite escura', ex: 'O gato preto dorme no sofá.' },
  { word: 'verde', ipa: '/ˈveɾðɨ/', def: 'que tem a cor da erva dos campos', ex: 'A erva do jardim é muito verde.' },
  { word: 'vermelho', ipa: '/vɨɾˈmɛʎu/', def: 'que tem a cor do sangue ou do tomate', ex: 'O carro vermelho parou no sinal.' },
  { word: 'bondoso', ipa: '/bõˈdozu/', def: 'que demonstra bondade e carinho', ex: 'A avó é uma pessoa muito bondosa.' },
  { word: 'bonito', ipa: '/buˈnitu/', def: 'que é agradável à vista, lindo', ex: 'Este parque é muito bonito.' },
  { word: 'educado', ipa: '/iðurˈkaðu/', def: 'que tem bons modos e cortesia', ex: 'O rapaz é muito educado com todos.' },
  { word: 'engraçado', ipa: '/ẽɡɾɐˈsaðu/', def: 'que faz rir e tem graça', ex: 'O filme de comédia é muito engraçado.' },
  { word: 'esperto', ipa: '/ɨʃˈpɛɾtu/', def: 'que tem inteligência e vivacidade', ex: 'O aluno é muito esperto.' },
  { word: 'grosseiro', ipa: '/ɡɾuˈsɐi̯ɾu/', def: 'que carece de educação ou delicadeza', ex: 'Não devemos ter um comportamento grosseiro.' },
  { word: 'honesto', ipa: '/oˈnɛʃtu/', def: 'que age com verdade e integridade', ex: 'Ele é um homem honesto e trabalhador.' },
  { word: 'lindo', ipa: '/ˈlĩdu/', def: 'que tem extrema beleza', ex: 'O dia de hoje está lindo.' },
  { word: 'preguiçoso', ipa: '/pɾɨɣiˈsozu/', def: 'que evita o trabalho ou esforço', ex: 'O gato preguiçoso dorme no sol.' },
  { word: 'silencioso', ipa: '/silẽsiˈozu/', def: 'que não faz qualquer barulho', ex: 'O quarto é muito silencioso.' },
  { word: 'simpático', ipa: '/sĩˈpatiku/', def: 'que inspira simpatia e agrado', ex: 'A empregada da loja é simpática.' },
  { word: 'tímido', ipa: '/ˈtimiðu/', def: 'que sente vergonha na presença de outros', ex: 'O menino é tímido com estranhos.' }
];

adjectivesList.forEach(a => {
  entriesToMigrate.push({
    word: a.word,
    theme: 'adjectives.json',
    form: 'adjective',
    transcription: a.ipa,
    emoji: '✨',
    definitions: [a.def],
    examples: [a.ex],
    no_antonym: true
  });
});

// General Adjectives (general_adjectives.json)
const generalAdjectivesList = [
  { word: 'aberto', ipa: '/ɐˈbɛɾtu/', def: 'que não está fechado', ex: 'A janela da sala está aberta.' },
  { word: 'alto', ipa: '/ˈaɫtu/', def: 'que tem grande altura', ex: 'O edifício no centro é muito alto.' },
  { word: 'baixo', ipa: '/ˈbɐi̯ʃu/', def: 'que tem pequena altura', ex: 'A mesa de centro é baixa.' },
  { word: 'barato', ipa: '/bɐˈɾatu/', def: 'que tem um preço baixo', ex: 'Este livro de bolso é barato.' },
  { word: 'barulhento', ipa: '/bɐɾuˈʎẽtu/', def: 'que faz muito barulho', ex: 'O trânsito da cidade é barulhento.' },
  { word: 'cheio', ipa: '/ˈʃɐi̯u/', def: 'que contém o máximo de capacidade', ex: 'O autocarro está cheio de passageiros.' },
  { word: 'comum', ipa: '/kuˈmũ/', def: 'que acontece habitualmente', ex: 'É um problema muito comum.' },
  { word: 'confiante', ipa: '/kõfiˈɐ̃tɨ/', def: 'que tem confiança nas suas capacidades', ex: 'Estou confiante para o exame.' },
  { word: 'correto', ipa: '/kuˈʁɛtu/', def: 'que está sem erros e certo', ex: 'A resposta do aluno está correta.' },
  { word: 'diferente', ipa: '/difɨˈɾẽtɨ/', def: 'que não é igual a outro', ex: 'Eles têm ideias muito diferentes.' },
  { word: 'difícil', ipa: '/diˈfisiɫ/', def: 'que exige grande esforço para fazer', ex: 'Este teste de matemática é difícil.' },
  { word: 'doente', ipa: '/duˈẽtɨ/', def: 'que não tem boa saúde', ex: 'O meu amigo está doente em casa.' },
  { word: 'duro', ipa: '/ˈduɾu/', def: 'que resiste à pressão sem ceder', ex: 'O pão antigo está duro.' },
  { word: 'errado', ipa: '/iˈʁaðu/', def: 'que contém incorreção ou erro', ex: 'O cálculo estava errado.' },
  { word: 'especial', ipa: '/iʃpɨˈsiɐɫ/', def: 'que se distingue do comum', ex: 'Hoje é um dia especial para nós.' },
  { word: 'excelente', ipa: '/ɐi̯ʃsɨˈlẽtɨ/', def: 'de altíssima qualidade', ex: 'O jantar estava excelente.' },
  { word: 'fácil', ipa: '/ˈfasiɫ/', def: 'que se realiza sem dificuldade', ex: 'O exercício de leitura é fácil.' },
  { word: 'fantástico', ipa: '/fɐ̃ˈtastiku/', def: 'que causa grande admiração', ex: 'Tivemos um dia fantástico na praia.' },
  { word: 'fechado', ipa: '/fɨˈʃaðu/', def: 'que não permite entrada ou passagem', ex: 'A loja está fechada hoje.' },
  { word: 'forte', ipa: '/ˈfɔɾtɨ/', def: 'que tem grande força física ou poder', ex: 'O atleta é muito forte.' },
  { word: 'fraco', ipa: '/ˈfɾaku/', def: 'que tem pouca força física', ex: 'Sinto-me fraco quando não como.' },
  { word: 'frio', ipa: '/ˈfɾiu̯/', def: 'que tem temperatura baixa', ex: 'O tempo está muito frio no inverno.' },
  { word: 'grande', ipa: '/ˈɡɾɐ̃dɨ/', def: 'de dimensões elevadas', ex: 'A casa nova tem um jardim grande.' },
  { word: 'grátis', ipa: '/ˈɡɾatiʃ/', def: 'que não custa dinheiro', ex: 'A entrada no museu é grátis ao domingo.' },
  { word: 'horrível', ipa: '/uˈʁivɛɫ/', def: 'muito desagradável ou mau', ex: 'O tempo estava horrível ontem.' },
  { word: 'importante', ipa: '/ĩpuɾˈtɐ̃tɨ/', def: 'que tem grande valor ou significado', ex: 'É importante estudar todos os dias.' },
  { word: 'impossível', ipa: '/ĩpuˈsivɛɫ/', def: 'que não se pode realizar', ex: 'É impossível voar sem asas.' },
  { word: 'incrível', ipa: '/ĩˈkɾivɛɫ/', def: 'que causa espanto de tão bom', ex: 'A vista da montanha é incrível.' },
  { word: 'inúteis', ipa: '/iˈnutɐi̯ʃ/', def: 'sem qualquer utilidade prática', ex: 'Esses objetos velhos são inúteis.' },
  { word: 'inútil', ipa: '/iˈnutiɫ/', def: 'que não presta para nada', ex: 'Esta ferramenta partida é inútil.' },
  { word: 'jovem', ipa: '/ˈʒɔvẽi̯/', def: 'de pouca idade, novo', ex: 'O rapaz jovem estuda música.' },
  { word: 'lento', ipa: '/ˈlẽtu/', def: 'que se desloca a baixa velocidade', ex: 'O caracol é um animal lento.' },
  { word: 'leve', ipa: '/ˈlɛvɨ/', def: 'que tem pouco peso', ex: 'A mala pequena é muito leve.' },
  { word: 'limpo', ipa: '/ˈlĩpu/', def: 'isento de qualquer sujidade', ex: 'O quarto está limpo e arrumado.' },
  { word: 'longo', ipa: '/ˈlõɡu/', def: 'de grande extensão ou duração', ex: 'O caminho até à praia é longo.' },
  { word: 'macio', ipa: '/mɐˈsiu̯/', def: 'suave ao toque e confortável', ex: 'O travesseiro da cama é macio.' },
  { word: 'maravilhoso', ipa: '/mɐɾɐviˈʎozu/', def: 'que encanta pela beleza', ex: 'Foi um espetáculo maravilhoso.' },
  { word: 'mau', ipa: '/ˈmau̯/', def: 'que carece de boa qualidade ou bondade', ex: 'O filme era muito mau.' },
  { word: 'mesmo', ipa: '/ˈmeʃmu/', def: 'exatamente igual ou idêntico', ex: 'Lemos o mesmo livro na escola.' },
  { word: 'molhado', ipa: '/muˈʎaðu/', def: 'coberto de água ou líquido', ex: 'O chão do chão está molhado.' },
  { word: 'morno', ipa: '/ˈmoɾnu/', def: 'nem quente nem frio', ex: 'Tomo um banho morno relaxante.' },
  { word: 'necessário', ipa: '/nɨsɨˈsaɾiu̯/', def: 'indispensável para determinado fim', ex: 'É necessário beber água suficiente.' },
  { word: 'novo', ipa: '/ˈnovu/', def: 'de criação recente ou pouca idade', ex: 'Comprei um telemóvel novo.' },
  { word: 'ocupado', ipa: '/ukuˈpaðu/', def: 'com a atenção dedicada a tarefas', ex: 'O médico está ocupado agora.' },
  { word: 'ótimo', ipa: '/ˈɔtimu/', def: 'excelente, muito bom', ex: 'Este restaurante é ótimo.' },
  { word: 'perfeito', ipa: '/pɨɾˈfɐi̯tu/', def: 'sem qualquer defeito ou falha', ex: 'O trabalho de casa ficou perfeito.' },
  { word: 'perigoso', ipa: '/pɨɾiˈɣozu/', def: 'que envolve risco de dano', ex: 'É perigoso andar depressa na chuva.' },
  { word: 'pesado', ipa: '/pɨˈzaðu/', def: 'que tem grande massa e peso', ex: 'O caixote de madeira é pesado.' },
  { word: 'possível', ipa: '/puˈsivɛɫ/', def: 'que pode vir a acontecer', ex: 'É possível chegar a tempo.' },
  { word: 'quente', ipa: '/ˈkẽtɨ/', def: 'de temperatura elevada', ex: 'Bebo café quente de manhã.' },
  { word: 'rápido', ipa: '/ˈʁapidu/', def: 'que se desloca a alta velocidade', ex: 'O comboio rápido chegou.' },
  { word: 'saudável', ipa: '/sɐu̯ˈdavɛɫ/', def: 'que é benéfico para a saúde', ex: 'Comer fruta é saudável.' },
  { word: 'seco', ipa: '/ˈseku/', def: 'sem qualquer humidade', ex: 'O chão já está seco.' },
  { word: 'seguro', ipa: '/sɨˈɣuɾu/', def: 'protegido de perigos', ex: 'A casa é um lugar seguro.' },
  { word: 'semelhante', ipa: '/sɨmɨˈʎɐ̃tɨ/', def: 'parecido com outro objeto', ex: 'Eles têm sapatos semelhantes.' },
  { word: 'sozinho', ipa: '/suˈziɲu/', def: 'sem qualquer companhia', ex: 'Ele gosta de caminhar sozinho.' },
  { word: 'sujo', ipa: '/ˈsuʒu/', def: 'com manchas ou sujidade', ex: 'O carro está sujo de lama.' },
  { word: 'terrível', ipa: '/tɨˈɾivɛɫ/', def: 'que causa pavor ou desconforto', ex: 'Houve uma tempestade terrível.' },
  { word: 'útil', ipa: '/ˈutiɫ/', def: 'que tem serventia e utilidade', ex: 'Este dicionário é muito útil.' },
  { word: 'vazio', ipa: '/vɐˈziu̯/', def: 'sem nada no seu interior', ex: 'O copo de água está vazio.' },
  { word: 'velho', ipa: '/ˈvɛʎu/', def: 'de idade avançada ou antigo', ex: 'O edifício velho fica na praça.' },
  { word: 'zangado', ipa: '/zɐ̃ˈɡaðu/', def: 'que sente irritação ou raiva', ex: 'Ele ficou zangado com o atraso.' }
];

generalAdjectivesList.forEach(g => {
  entriesToMigrate.push({
    word: g.word,
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: g.ipa,
    emoji: '⭐',
    definitions: [g.def],
    examples: [g.ex],
    no_antonym: true
  });
});

function runMigration() {
  console.log(`Starting migration of ${entriesToMigrate.length} qualifying Portuguese entries...`);

  // Track existing IDs to enforce global uniqueness across pt files
  const allExistingIds = new Set();
  const subdirs = fs.readdirSync(ptDir).filter(d => fs.statSync(path.join(ptDir, d)).isDirectory());
  subdirs.forEach(subdir => {
    const levelDir = path.join(ptDir, subdir);
    const files = fs.readdirSync(levelDir).filter(f => f.endsWith('.json') && f !== 'index.json' && f !== 'flat-index.json');
    files.forEach(f => {
      const content = JSON.parse(fs.readFileSync(path.join(levelDir, f), 'utf8'));
      content.forEach(e => {
        if (e.id) allExistingIds.add(e.id);
      });
    });
  });

  console.log(`Existing Portuguese IDs across all levels before gap migration: ${allExistingIds.size}`);

  const themeFilesMap = {};

  entriesToMigrate.forEach(item => {
    const rawWord = item.word.trim();
    const slug = slugify(rawWord);
    const form = item.form;

    let id = `pt:${slug}:${form}`;
    if (allExistingIds.has(id)) {
      let c = 1;
      while (allExistingIds.has(`pt:${slug}-${c}:${form}`)) c++;
      id = `pt:${slug}-${c}:${form}`;
    }
    allExistingIds.add(id);

    const themeFile = item.theme;
    const themeName = themeFile.replace('.json', '');

    const entry = {
      id: id,
      word: rawWord,
      language: 'pt',
      form: form,
      level: 'A1',
      transcription: item.transcription,
      definitions: item.definitions,
      examples: item.examples,
      domain: 'general',
      theme: themeName,
      updated: '2025-01-15'
    };

    if (item.emoji) {
      entry.emoji = item.emoji;
    } else {
      entry.no_emoji = true;
    }

    if (item.antonyms && item.antonyms.length > 0) {
      entry.antonyms = item.antonyms;
    } else {
      entry.no_antonym = true;
    }

    if (form === 'noun') {
      entry.gender = item.gender;
      entry.article = item.article;
      entry.countability = item.countability;
      if (item.countability === 'countable' && item.plural_form) {
        entry.plural_form = item.plural_form;
      }
    }

    if (!themeFilesMap[themeFile]) {
      // Read existing file if present, else empty array
      const filePath = path.join(targetA0A1Dir, themeFile);
      if (fs.existsSync(filePath)) {
        themeFilesMap[themeFile] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } else {
        themeFilesMap[themeFile] = [];
      }
    }

    themeFilesMap[themeFile].push(entry);
  });

  // Write files
  let totalSaved = 0;
  for (const [f, content] of Object.entries(themeFilesMap)) {
    const filePath = path.join(targetA0A1Dir, f);
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf8');
    console.log(`Saved ${content.length} total entries to ${f}`);
    totalSaved += content.length;
  }

  console.log(`Migration complete! Total Portuguese entries across a0_a1: ${totalSaved}`);
}

runMigration();
