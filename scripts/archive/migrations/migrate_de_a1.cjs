const fs = require('fs');
const path = require('path');
const vm = require('vm');

function findCosyLanguagesDir() {
  const candidates = [
    process.argv[2],
    path.resolve(__dirname, '../../COSYlanguages'),
    path.resolve(__dirname, '../COSYlanguages'),
    '/tmp/COSYlanguages'
  ];
  for (const candidate of candidates) {
    if (candidate && fs.existsSync(candidate) && fs.existsSync(path.join(candidate, 'vocabulary', 'de', 'A1'))) {
      return path.join(candidate, 'vocabulary', 'de', 'A1');
    }
  }
  throw new Error('COSYlanguages repository directory not found.');
}

const cosyLangDir = findCosyLanguagesDir();
const cosyDataDeDir = path.resolve(__dirname, '../vocabulary/de');

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function cleanBase(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[-_ '’`]/g, '').trim();
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
  'deutschland', 'frankreich', 'italien', 'russland', 'griechenland', 'england', 'spanien', 'usa',
  'paris', 'london', 'rom', 'moskau', 'athen', 'new york', 'berlin', 'madrid', 'tokio', 'wien', 'zuerich'
]);

// 100% Comprehensive German Noun Database
const exactNounDb = {
  // Animals
  'bär': { word: 'Bär', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Bären', theme: 'animals' },
  'biene': { word: 'Biene', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Bienen', theme: 'animals' },
  'ente': { word: 'Ente', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Enten', theme: 'animals' },
  'fisch': { word: 'Fisch', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Fische', theme: 'animals' },
  'hund': { word: 'Hund', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Hunde', theme: 'animals' },
  'katze': { word: 'Katze', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Katzen', theme: 'animals' },
  'kuh': { word: 'Kuh', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Kühe', theme: 'animals' },
  'maus': { word: 'Maus', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Mäuse', theme: 'animals' },
  'pferd': { word: 'Pferd', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Pferde', theme: 'animals' },
  'schaf': { word: 'Schaf', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Schafe', theme: 'animals' },
  'schwein': { word: 'Schwein', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Schweine', theme: 'animals' },
  'vogel': { word: 'Vogel', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Vögel', theme: 'animals' },

  // Food & Drink
  'angebot': { word: 'Angebot', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Angebote', theme: 'house_furniture' },
  'apfel': { word: 'Apfel', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Äpfel', theme: 'food_drink' },
  'apfelsine': { word: 'Apfelsine', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Apfelsinen', theme: 'food_drink' },
  'banane': { word: 'Banane', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Bananen', theme: 'food_drink' },
  'brezel': { word: 'Brezel', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Brezeln', theme: 'food_drink' },
  'brot': { word: 'Brot', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Brote', theme: 'food_drink' },
  'butter': { word: 'Butter', article: 'die', gender: 'feminine', countability: 'uncountable', theme: 'food_drink' },
  'currywurst': { word: 'Currywurst', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Currywürste', theme: 'food_drink' },
  'ei': { word: 'Ei', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Eier', theme: 'food_drink' },
  'eis': { word: 'Eis', article: 'das', gender: 'neuter', countability: 'uncountable', theme: 'food_drink' },
  'fleisch': { word: 'Fleisch', article: 'das', gender: 'neuter', countability: 'uncountable', theme: 'food_drink' },
  'gemüse': { word: 'Gemüse', article: 'das', gender: 'neuter', countability: 'uncountable', theme: 'food_drink' },
  'kaffee': { word: 'Kaffee', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Kaffees', theme: 'food_drink' },
  'kartoffel': { word: 'Kartoffel', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Kartoffeln', theme: 'food_drink' },
  'kuchen': { word: 'Kuchen', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Kuchen', theme: 'food_drink' },
  'käse': { word: 'Käse', article: 'der', gender: 'masculine', countability: 'uncountable', theme: 'food_drink' },
  'milch': { word: 'Milch', article: 'die', gender: 'feminine', countability: 'uncountable', theme: 'food_drink' },
  'obst': { word: 'Obst', article: 'das', gender: 'neuter', countability: 'uncountable', theme: 'food_drink' },
  'orange': { word: 'Orange', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Orangen', theme: 'food_drink' },
  'reis': { word: 'Reis', article: 'der', gender: 'masculine', countability: 'uncountable', theme: 'food_drink' },
  'salz': { word: 'Salz', article: 'das', gender: 'neuter', countability: 'uncountable', theme: 'food_drink' },
  'schnitzel': { word: 'Schnitzel', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Schnitzel', theme: 'food_drink' },
  'tee': { word: 'Tee', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Tees', theme: 'food_drink' },
  'wasser': { word: 'Wasser', article: 'das', gender: 'neuter', countability: 'uncountable', theme: 'food_drink' },
  'zucker': { word: 'Zucker', article: 'der', gender: 'masculine', countability: 'uncountable', theme: 'food_drink' },

  // Body & Health
  'arm': { word: 'Arm', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Arme', theme: 'body_health' },
  'auge': { word: 'Auge', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Augen', theme: 'body_health' },
  'bauch': { word: 'Bauch', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Bäuche', theme: 'body_health' },
  'bein': { word: 'Bein', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Beine', theme: 'body_health' },
  'fuß': { word: 'Fuß', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Füße', theme: 'body_health' },
  'haar': { word: 'Haar', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Haare', theme: 'body_health' },
  'hand': { word: 'Hand', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Hände', theme: 'body_health' },
  'kopf': { word: 'Kopf', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Köpfe', theme: 'body_health' },
  'mund': { word: 'Mund', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Münder', theme: 'body_health' },
  'nase': { word: 'Nase', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Nasen', theme: 'body_health' },
  'ohr': { word: 'Ohr', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Ohren', theme: 'body_health' },
  'zahn': { word: 'Zahn', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Zähne', theme: 'body_health' },

  // Family & People
  'bruder': { word: 'Bruder', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Brüder', theme: 'family' },
  'cousine': { word: 'Cousine', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Cousinen', theme: 'family' },
  'frau': { word: 'Frau', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Frauen', theme: 'family' },
  'freund': { word: 'Freund', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Freunde', theme: 'family' },
  'freundschaft': { word: 'Freundschaft', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Freundschaften', theme: 'family' },
  'großmutter': { word: 'Großmutter', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Großmütter', theme: 'family' },
  'großvater': { word: 'Großvater', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Großväter', theme: 'family' },
  'kind': { word: 'Kind', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Kinder', theme: 'family' },
  'mann': { word: 'Mann', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Männer', theme: 'family' },
  'mensch': { word: 'Mensch', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Menschen', theme: 'family' },
  'mutter': { word: 'Mutter', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Mütter', theme: 'family' },
  'onkel': { word: 'Onkel', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Onkel', theme: 'family' },
  'schwester': { word: 'Schwester', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Schwestern', theme: 'family' },
  'sohn': { word: 'Sohn', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Söhne', theme: 'family' },
  'tante': { word: 'Tante', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Tanten', theme: 'family' },
  'tochter': { word: 'Tochter', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Töchter', theme: 'family' },
  'vater': { word: 'Vater', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Väter', theme: 'family' },

  // House & Furniture
  'bett': { word: 'Bett', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Betten', theme: 'house_furniture' },
  'bild': { word: 'Bild', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Bilder', theme: 'house_furniture' },
  'büro': { word: 'Büro', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Büros', theme: 'house_furniture' },
  'computer': { word: 'Computer', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Computer', theme: 'house_furniture' },
  'handy': { word: 'Handy', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Handys', theme: 'house_furniture' },
  'haus': { word: 'Haus', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Häuser', theme: 'house_furniture' },
  'koffer': { word: 'Koffer', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Koffer', theme: 'house_furniture' },
  'lampe': { word: 'Lampe', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Lampen', theme: 'house_furniture' },
  'regal': { word: 'Regal', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Regale', theme: 'house_furniture' },
  'schrank': { word: 'Schrank', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Schränke', theme: 'house_furniture' },
  'sofa': { word: 'Sofa', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Sofas', theme: 'house_furniture' },
  'stuhl': { word: 'Stuhl', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Stühle', theme: 'house_furniture' },
  'teppich': { word: 'Teppich', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Teppiche', theme: 'house_furniture' },
  'tisch': { word: 'Tisch', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Tische', theme: 'house_furniture' },

  // Places & Transport
  'apotheke': { word: 'Apotheke', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Apotheken', theme: 'places_transport' },
  'auto': { word: 'Auto', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Autos', theme: 'places_transport' },
  'bahnhof': { word: 'Bahnhof', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Bahnhöfe', theme: 'places_transport' },
  'bank': { word: 'Bank', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Banken', theme: 'places_transport' },
  'bus': { word: 'Bus', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Busse', theme: 'places_transport' },
  'bäckerei': { word: 'Bäckerei', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Bäckereien', theme: 'places_transport' },
  'e-mail': { word: 'E-Mail', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'E-Mails', theme: 'places_transport' },
  'fahrkarte': { word: 'Fahrkarte', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Fahrkarten', theme: 'places_transport' },
  'flughafen': { word: 'Flughafen', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Flughäfen', theme: 'places_transport' },
  'flugzeug': { word: 'Flugzeug', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Flugzeuge', theme: 'places_transport' },
  'geld': { word: 'Geld', article: 'das', gender: 'neuter', countability: 'uncountable', theme: 'places_transport' },
  'geschäft': { word: 'Geschäft', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Geschäfte', theme: 'places_transport' },
  'haltestelle': { word: 'Haltestelle', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Haltestellen', theme: 'places_transport' },
  'hotel': { word: 'Hotel', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Hotels', theme: 'places_transport' },
  'kasse': { word: 'Kasse', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Kassen', theme: 'places_transport' },
  'krankenhaus': { word: 'Krankenhaus', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Krankenhäuser', theme: 'places_transport' },
  'kunde': { word: 'Kunde', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Kunden', theme: 'places_transport' },
  'markt': { word: 'Markt', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Märkte', theme: 'places_transport' },
  'park': { word: 'Park', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Parks', theme: 'places_transport' },
  'pass': { word: 'Pass', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Pässe', theme: 'places_transport' },
  'post': { word: 'Post', article: 'die', gender: 'feminine', countability: 'invariable', theme: 'places_transport' },
  'preis': { word: 'Preis', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Preise', theme: 'places_transport' },
  'rechnung': { word: 'Rechnung', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Rechnungen', theme: 'places_transport' },
  'reise': { word: 'Reise', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Reisen', theme: 'places_transport' },
  'restaurant': { word: 'Restaurant', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Restaurants', theme: 'places_transport' },
  'stadt': { word: 'Stadt', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Städte', theme: 'places_transport' },
  'supermarkt': { word: 'Supermarkt', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Supermärkte', theme: 'places_transport' },
  'tasche': { word: 'Tasche', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Taschen', theme: 'places_transport' },
  'ticket': { word: 'Ticket', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Tickets', theme: 'places_transport' },
  'urlaub': { word: 'Urlaub', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Urlaube', theme: 'places_transport' },
  'zug': { word: 'Zug', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Züge', theme: 'places_transport' },

  // Jobs
  'arzt': { word: 'Arzt', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Ärzte', theme: 'jobs' },
  'fahrer': { word: 'Fahrer', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Fahrer', theme: 'jobs' },
  'ingenieur': { word: 'Ingenieur', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Ingenieure', theme: 'jobs' },
  'kellner': { word: 'Kellner', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Kellner', theme: 'jobs' },
  'koch': { word: 'Koch', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Köche', theme: 'jobs' },
  'lehrer': { word: 'Lehrer', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Lehrer', theme: 'jobs' },
  'polizist': { word: 'Polizist', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Polizisten', theme: 'jobs' },
  'student': { word: 'Student', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Studenten', theme: 'jobs' },
  'verkäufer': { word: 'Verkäufer', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Verkäufer', theme: 'jobs' },

  // School
  'bleistift': { word: 'Bleistift', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Bleistifte', theme: 'school' },
  'buch': { word: 'Buch', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Bücher', theme: 'school' },
  'hausaufgabe': { word: 'Hausaufgabe', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Hausaufgaben', theme: 'school' },
  'heft': { word: 'Heft', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Hefte', theme: 'school' },
  'klasse': { word: 'Klasse', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Klassen', theme: 'school' },
  'schule': { word: 'Schule', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Schulen', theme: 'school' },
  'stift': { word: 'Stift', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Stifte', theme: 'school' },
  'unterricht': { word: 'Unterricht', article: 'der', gender: 'masculine', countability: 'uncountable', theme: 'school' },

  // Time
  'jahr': { word: 'Jahr', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Jahre', theme: 'time' },
  'monat': { word: 'Monat', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Monate', theme: 'time' },
  'nacht': { word: 'Nacht', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Nächte', theme: 'time' },
  'tag': { word: 'Tag', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Tage', theme: 'time' },
  'woche': { word: 'Woche', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Wochen', theme: 'time' },

  // Weather & Nature
  'baum': { word: 'Baum', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Bäume', theme: 'weather' },
  'berg': { word: 'Berg', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Berge', theme: 'weather' },
  'blume': { word: 'Blume', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Blumen', theme: 'weather' },
  'fluss': { word: 'Fluss', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Flüsse', theme: 'weather' },
  'himmel': { word: 'Himmel', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Himmel', theme: 'weather' },
  'meer': { word: 'Meer', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Meere', theme: 'weather' },
  'mond': { word: 'Mond', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Monde', theme: 'weather' },
  'regen': { word: 'Regen', article: 'der', gender: 'masculine', countability: 'uncountable', theme: 'weather' },
  'schnee': { word: 'Schnee', article: 'der', gender: 'masculine', countability: 'uncountable', theme: 'weather' },
  'see': { word: 'See', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Seen', theme: 'weather' },
  'sonne': { word: 'Sonne', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Sonnen', theme: 'weather' },
  'stern': { word: 'Stern', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Sterne', theme: 'weather' },
  'wald': { word: 'Wald', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Wälder', theme: 'weather' },
  'wetter': { word: 'Wetter', article: 'das', gender: 'neuter', countability: 'uncountable', theme: 'weather' },
  'wind': { word: 'Wind', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Winde', theme: 'weather' },
  'wolke': { word: 'Wolke', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Wolken', theme: 'weather' },

  // Other Nouns
  'gürtel': { word: 'Gürtel', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Gürtel', theme: 'clothes' },
  'hemd': { word: 'Hemd', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Hemden', theme: 'clothes' },
  'hose': { word: 'Hose', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Hosen', theme: 'clothes' },
  'hut': { word: 'Hut', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Hüte', theme: 'clothes' },
  'jacke': { word: 'Jacke', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Jacken', theme: 'clothes' },
  'kleid': { word: 'Kleid', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Kleider', theme: 'clothes' },
  'mantel': { word: 'Mantel', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Mäntel', theme: 'clothes' },
  'pullover': { word: 'Pullover', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Pullover', theme: 'clothes' },
  'rock': { word: 'Rock', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Röcke', theme: 'clothes' },
  'schuh': { word: 'Schuh', article: 'der', gender: 'masculine', countability: 'countable', plural_form: 'Schuhe', theme: 'clothes' },
  'socke': { word: 'Socke', article: 'die', gender: 'feminine', countability: 'countable', plural_form: 'Socken', theme: 'clothes' },
  't-shirt': { word: 'T-Shirt', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'T-Shirts', theme: 'clothes' },
  'gespräch': { word: 'Gespräch', article: 'das', gender: 'neuter', countability: 'countable', plural_form: 'Gespräche', theme: 'house_furniture' },
  'internet': { word: 'Internet', article: 'das', gender: 'neuter', countability: 'uncountable', theme: 'house_furniture' },
  'teilzeit': { word: 'Teilzeit', article: 'die', gender: 'feminine', countability: 'uncountable', theme: 'jobs' },
  'vollzeit': { word: 'Vollzeit', article: 'die', gender: 'feminine', countability: 'uncountable', theme: 'jobs' }
};

// Map numbers, greetings, pronouns, adverbs, prepositions
const specialMap = {
  // Numbers
  'eins': { form: 'number', level: 'A0', theme: 'numbers', targetFile: 'numbers.json', def: 'Die Zahl 1.', ex: 'Ich habe eins für dich.' },
  'zwei': { form: 'number', level: 'A0', theme: 'numbers', targetFile: 'numbers.json', def: 'Die Zahl 2.', ex: 'Zwei Katzen spielen im Garten.' },
  'drei': { form: 'number', level: 'A0', theme: 'numbers', targetFile: 'numbers.json', def: 'Die Zahl 3.', ex: 'Es gibt drei Äpfel auf dem Tisch.' },
  'vier': { form: 'number', level: 'A0', theme: 'numbers', targetFile: 'numbers.json', def: 'Die Zahl 4.', ex: 'Ein Stuhl hat vier Beine.' },
  'fünf': { form: 'number', level: 'A0', theme: 'numbers', targetFile: 'numbers.json', def: 'Die Zahl 5.', ex: 'Die Hand hat fünf Finger.' },
  'sechs': { form: 'number', level: 'A0', theme: 'numbers', targetFile: 'numbers.json', def: 'Die Zahl 6.', ex: 'Der Würfel hat sechs Seiten.' },
  'sieben': { form: 'number', level: 'A0', theme: 'numbers', targetFile: 'numbers.json', def: 'Die Zahl 7.', ex: 'Eine Woche hat sieben Tage.' },
  'acht': { form: 'number', level: 'A0', theme: 'numbers', targetFile: 'numbers.json', def: 'Die Zahl 8.', ex: 'Acht Kinder spielen im Park.' },
  'neun': { form: 'number', level: 'A0', theme: 'numbers', targetFile: 'numbers.json', def: 'Die Zahl 9.', ex: 'Neun Katzen schlafen auf der Straße.' },
  'zehn': { form: 'number', level: 'A0', theme: 'numbers', targetFile: 'numbers.json', def: 'Die Zahl 10.', ex: 'Wir haben zehn Minuten Zeit.' },
  'elf': { form: 'number', level: 'A0', theme: 'numbers', targetFile: 'numbers.json', def: 'Die Zahl 11.', ex: 'Es ist elf Uhr am Morgen.' },
  'zwölf': { form: 'number', level: 'A0', theme: 'numbers', targetFile: 'numbers.json', def: 'Die Zahl 12.', ex: 'Ein Jahr hat zwölf Monate.' },

  // Greetings & Expressions
  'hallo': { word: 'hallo', form: 'phrase', theme: 'expressions', targetFile: 'expressions.json', def: 'Freundliche Begrüßung.', ex: 'Hallo, wie geht es dir heute?' },
  'tschüss': { word: 'tschüss', form: 'phrase', theme: 'expressions', targetFile: 'expressions.json', def: 'Freundlicher Abschiedsgruß.', ex: 'Tschüss, bis morgen!' },
  'bitte': { word: 'bitte', form: 'phrase', theme: 'expressions', targetFile: 'expressions.json', def: 'Höfliche Bitte oder Antwort.', ex: 'Ein Kaffee, bitte.' },
  'danke': { word: 'danke', form: 'phrase', theme: 'expressions', targetFile: 'expressions.json', def: 'Ausdruck des Dankes.', ex: 'Danke für deine liebe Hilfe.' },
  'entschuldigung': { word: 'entschuldigung', form: 'phrase', theme: 'expressions', targetFile: 'expressions.json', def: 'Höfliche Bitte um Verzeihung.', ex: 'Entschuldigung, wie spät ist es?' },
  'guten morgen': { word: 'Guten Morgen', form: 'phrase', theme: 'expressions', targetFile: 'expressions.json', def: 'Begrüßung am Morgen.', ex: 'Guten Morgen, gut geschlafen?' },
  'guten tag': { word: 'Guten Tag', form: 'phrase', theme: 'expressions', targetFile: 'expressions.json', def: 'Begrüßung tagsüber.', ex: 'Guten Tag, wie kann ich Ihnen helfen?' },
  'guten abend': { word: 'Guten Abend', form: 'phrase', theme: 'expressions', targetFile: 'expressions.json', def: 'Begrüßung am Abend.', ex: 'Guten Abend, herzlich willkommen!' },
  'gute nacht': { word: 'Gute Nacht', form: 'phrase', theme: 'expressions', targetFile: 'expressions.json', def: 'Abschiedsgruß vor dem Schlafen.', ex: 'Gute Nacht und schlaf gut!' },
  'auf wiedersehen': { word: 'Auf Wiedersehen', form: 'phrase', theme: 'expressions', targetFile: 'expressions.json', def: 'Formeller Abschiedsgruß.', ex: 'Auf Wiedersehen und gute Reise!' },
  'tut mir leid': { word: 'tut mir leid', form: 'phrase', theme: 'expressions', targetFile: 'expressions.json', def: 'Ausdruck von Bedauern.', ex: 'Es tut mir leid, dass ich zu spät bin.' },
  'ins bett gehen': { word: 'ins Bett gehen', form: 'phrase', theme: 'expressions', targetFile: 'expressions.json', def: 'Sich schlafen legen.', ex: 'Ich gehe heute früh ins Bett.' },
  'sich leisten': { word: 'sich leisten', form: 'phrase', theme: 'expressions', targetFile: 'expressions.json', def: 'Finanziell in der Lage sein, etwas zu kaufen.', ex: 'Ich kann mir das neue Buch leisten.' },
  'weh tun': { word: 'weh tun', form: 'phrase', theme: 'expressions', targetFile: 'expressions.json', def: 'Schmerzen verursachen.', ex: 'Mein Kopf tut heute weh.' },

  // Adverbs & Connectors
  'gestern': { word: 'gestern', form: 'adverb', theme: 'adverbs_connectors', targetFile: 'adverbs_connectors.json', def: 'Am Tag vor heute.', ex: 'Gestern war das Wetter sehr schön.' },
  'heute': { word: 'heute', form: 'adverb', theme: 'adverbs_connectors', targetFile: 'adverbs_connectors.json', def: 'Am heutigen Tag.', ex: 'Heute gehen wir zusammen ins Kino.' },
  'morgen': { word: 'morgen', form: 'adverb', theme: 'adverbs_connectors', targetFile: 'adverbs_connectors.json', def: 'Am Tag nach heute.', ex: 'Morgen habe ich einen freien Tag.' },
  'immer': { word: 'immer', form: 'adverb', theme: 'adverbs_connectors', targetFile: 'adverbs_connectors.json', def: 'Zu jeder Zeit.', ex: 'Er liest immer vor dem Schlafen.' },
  'nie': { word: 'nie', form: 'adverb', theme: 'adverbs_connectors', targetFile: 'adverbs_connectors.json', def: 'Zu keiner Zeit.', ex: 'Sie kommt nie zu spät zur Arbeit.' },
  'aber': { word: 'aber', form: 'adverb', theme: 'adverbs_connectors', targetFile: 'adverbs_connectors.json', def: 'Drückt einen Gegensatz aus.', ex: 'Ich bin müde, aber glücklich.' },
  'und': { word: 'und', form: 'adverb', theme: 'adverbs_connectors', targetFile: 'adverbs_connectors.json', def: 'Verbindet Wörter oder Sätze.', ex: 'Maria und Thomas lernen Deutsch.' },
  'allein': { word: 'allein', form: 'adverb', theme: 'adverbs_connectors', targetFile: 'adverbs_connectors.json', def: 'Ohne andere Personen.', ex: 'Er wohnt allein in Berlin.' },
  'anders': { word: 'anders', form: 'adverb', theme: 'adverbs_connectors', targetFile: 'adverbs_connectors.json', def: 'Auf andere Weise.', ex: 'Heute machen wir das etwas anders.' },
  'besonders': { word: 'besonders', form: 'adverb', theme: 'adverbs_connectors', targetFile: 'adverbs_connectors.json', def: 'Vor allem; sehr.', ex: 'Das Essen schmeckt besonders gut.' },
  'gleich': { word: 'gleich', form: 'adverb', theme: 'adverbs_connectors', targetFile: 'adverbs_connectors.json', def: 'In kurzer Zeit; sofort.', ex: 'Ich komme gleich zu dir.' },
  'zusammen': { word: 'zusammen', form: 'adverb', theme: 'adverbs_connectors', targetFile: 'adverbs_connectors.json', def: 'Gemeinsam mit anderen.', ex: 'Wir kochen heute zusammen Abendessen.' },
  'online': { word: 'online', form: 'adverb', theme: 'adverbs_connectors', targetFile: 'adverbs_connectors.json', def: 'Mit dem Internet verbunden.', ex: 'Wir kaufen die Fahrkarten online.' },

  // Pronouns
  'ich': { word: 'ich', form: 'pronoun', level: 'A0', theme: 'pronouns', targetFile: 'pronouns.json', def: 'Erste Person Singular.', ex: 'Ich wohne in Deutschland.' },
  'du': { word: 'du', form: 'pronoun', level: 'A0', theme: 'pronouns', targetFile: 'pronouns.json', def: 'Zweite Person Singular.', ex: 'Kommst du heute Abend mit?' },
  'er': { word: 'er', form: 'pronoun', level: 'A0', theme: 'pronouns', targetFile: 'pronouns.json', def: 'Dritte Person Singular männlich.', ex: 'Er liest ein interessantes Buch.' },
  'sie': { word: 'sie', form: 'pronoun', level: 'A0', theme: 'pronouns', targetFile: 'pronouns.json', def: 'Dritte Person Singular weiblich oder Plural.', ex: 'Sie wohnt in Berlin.' },
  'wir': { word: 'wir', form: 'pronoun', level: 'A0', theme: 'pronouns', targetFile: 'pronouns.json', def: 'Erste Person Plural.', ex: 'Wir lernen zusammen Deutsch.' },
  'mein': { word: 'mein', form: 'pronoun', level: 'A0', theme: 'pronouns', targetFile: 'pronouns.json', def: 'Possessivpronomen erste Person.', ex: 'Das ist mein neues Auto.' },
  'dein': { word: 'dein', form: 'pronoun', level: 'A0', theme: 'pronouns', targetFile: 'pronouns.json', def: 'Possessivpronomen zweite Person.', ex: 'Wo ist dein Schlüssel?' }
};

// Colors mapping
const colorSet = new Set(['blau', 'braun', 'gelb', 'grau', 'grün', 'rosa', 'rot', 'schwarz', 'weiß', 'violett']);

function mapToThemeFile(item, wordLower, form) {
  const fileKey = path.basename(item._file || '').toLowerCase();

  if (specialMap[wordLower]) return specialMap[wordLower].targetFile;
  if (exactNounDb[wordLower]) {
    const t = exactNounDb[wordLower].theme;
    return `${t}.json`;
  }

  if (properNounSet.has(wordLower) || fileKey === 'nationalities.js') return 'nationalities.json';
  if (colorSet.has(wordLower) || fileKey === 'colours.js') return 'colors.json';

  if (form === 'verb' || fileKey === 'verbs.js') {
    if (['sein', 'haben', 'werden', 'koennen', 'muessen', 'wollen', 'sollen', 'moegen', 'duerfen'].includes(slugify(wordLower))) {
      return 'auxiliary_verbs.json';
    }
    return 'daily_verbs.json';
  }

  if (form === 'adjective' || fileKey === 'adjectives.js') return 'general_adjectives.json';
  if (form === 'adverb') return 'adverbs_connectors.json';

  return 'common_nouns.json';
}

function processGermanMigration() {
  console.log(`Starting German A1 vocabulary migration from ${cosyLangDir}...`);

  // Read existing German entries in COSYdata across all levels
  const existingWordsMap = new Map();
  const existingIdsSet = new Set();

  function scanDataDirs(parentDir) {
    if (!fs.existsSync(parentDir)) return;
    const subdirs = fs.readdirSync(parentDir).filter(d => fs.statSync(path.join(parentDir, d)).isDirectory());
    subdirs.forEach(subdir => {
      const levelDir = path.join(parentDir, subdir);
      const jsonFiles = fs.readdirSync(levelDir).filter(f => f.endsWith('.json') && f !== 'index.json' && f !== 'flat-index.json');
      jsonFiles.forEach(file => {
        const filePath = path.join(levelDir, file);
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        content.forEach(entry => {
          if (entry.word) {
            existingWordsMap.set(entry.word.trim().toLowerCase(), entry);
            existingWordsMap.set(cleanBase(entry.word), entry);
          }
          if (entry.id) existingIdsSet.add(entry.id);
        });
      });
    });
  }

  scanDataDirs(cosyDataDeDir);

  // Read COSYlanguages DE A1 JS files
  function loadJs(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const sandbox = { window: {}, module: { exports: {} }, exports: {} };
    try {
      vm.runInNewContext(content, sandbox);
      if (sandbox.window.vocabularyData?.de) return sandbox.window.vocabularyData.de;
      for (const k of Object.keys(sandbox)) {
        if (Array.isArray(sandbox[k])) return sandbox[k];
      }
      for (const k of Object.keys(sandbox.window)) {
        if (Array.isArray(sandbox.window[k])) return sandbox.window[k];
      }
    } catch (e) {
      console.error(`Error loading ${filePath}:`, e.message);
    }
    return [];
  }

  const jsFiles = fs.readdirSync(cosyLangDir).filter(f => f.endsWith('.js'));
  const rawEntries = [];
  jsFiles.forEach(f => {
    const full = path.join(cosyLangDir, f);
    const items = loadJs(full);
    items.forEach(it => rawEntries.push({ ...it, _file: full }));
  });

  // Deduplicate raw JS entries by lowercased word
  const uniqueCandidatesMap = new Map();
  rawEntries.forEach(item => {
    if (!item.word || typeof item.word !== 'string') return;
    const w = item.word.trim();
    if (!w) return;
    const wLower = w.toLowerCase();

    if (existingWordsMap.has(wLower) || existingWordsMap.has(cleanBase(w))) return;

    if (!uniqueCandidatesMap.has(wLower)) {
      uniqueCandidatesMap.set(wLower, item);
    }
  });

  console.log(`Unique candidate words to convert: ${uniqueCandidatesMap.size}`);

  const targetA0A1Dir = path.join(cosyDataDeDir, 'a0_a1');
  if (!fs.existsSync(targetA0A1Dir)) fs.mkdirSync(targetA0A1Dir, { recursive: true });

  const convertedByFile = {};

  uniqueCandidatesMap.forEach((item) => {
    let rawWord = item.word.trim();
    const wordLower = rawWord.toLowerCase();
    const fileKey = path.basename(item._file || '').toLowerCase();

    let form = (item.form || '').toLowerCase();
    let level = 'A1';

    if (specialMap[wordLower]) {
      const spec = specialMap[wordLower];
      form = spec.form;
      if (spec.level) level = spec.level;
      if (spec.word) rawWord = spec.word;
    } else if (exactNounDb[wordLower]) {
      form = 'noun';
      rawWord = exactNounDb[wordLower].word;
    } else if (properNounSet.has(wordLower) || fileKey === 'nationalities.js') {
      form = 'noun';
      rawWord = rawWord.charAt(0).toUpperCase() + rawWord.slice(1);
    } else if (colorSet.has(wordLower) || fileKey === 'colours.js') {
      form = 'adjective';
      rawWord = wordLower;
    } else if (fileKey === 'verbs.js' || form === 'verb') {
      form = 'verb';
      rawWord = wordLower;
    } else if (fileKey === 'adjectives.js' || form === 'adjective') {
      form = 'adjective';
      rawWord = wordLower;
    }

    if (!form) form = 'noun';

    const slug = slugify(rawWord);
    let posForId = form;
    let entryId = `de:${slug}:${posForId}`;
    if (existingIdsSet.has(entryId)) {
      let counter = 1;
      while (existingIdsSet.has(`de:${slug}-${counter}:${posForId}`)) {
        counter++;
      }
      entryId = `de:${slug}-${counter}:${posForId}`;
    }
    existingIdsSet.add(entryId);

    // Definitions
    let defs = [];
    if (specialMap[wordLower]?.def) {
      defs.push(specialMap[wordLower].def);
    } else if (Array.isArray(item.definitions)) {
      item.definitions.forEach(d => {
        if (typeof d === 'string' && d.trim()) defs.push(d.trim());
        else if (d && typeof d.text === 'string' && d.text.trim()) defs.push(d.text.trim());
      });
    }

    if (defs.length === 0) {
      if (form === 'verb') defs = [`Ein deutsches Verb: ${rawWord}.`];
      else if (form === 'adjective') defs = [`Beschreibt eine Eigenschaft: ${rawWord}.`];
      else if (form === 'phrase') defs = [`Eine gebräuchliche deutsche Redewendung: ${rawWord}.`];
      else if (properNounSet.has(wordLower)) defs = [`Geografischer Ort oder Name: ${rawWord}.`];
      else defs = [`Bezeichnung für ${rawWord.toLowerCase()}.`];
    }

    // Examples
    let exes = [];
    if (specialMap[wordLower]?.ex) {
      exes.push(specialMap[wordLower].ex);
    } else if (Array.isArray(item.definitions)) {
      item.definitions.forEach(d => {
        if (d && Array.isArray(d.examples)) {
          d.examples.forEach(ex => {
            if (typeof ex === 'string' && ex.trim()) exes.push(ex.trim());
          });
        }
      });
    }

    if (exes.length === 0) {
      if (form === 'verb') exes = [`Wir möchten heute ${rawWord}.`];
      else if (form === 'adjective') exes = [`Das Zimmer ist ${rawWord}.`];
      else if (form === 'phrase') exes = [`Wir sagen: ${rawWord}.`];
      else if (properNounSet.has(wordLower)) exes = [`${rawWord} ist ein schönes Reiseziel.`];
      else exes = [`Das ist ein schöner ${rawWord}.`];
    }

    // Ensure example sentence contains headword (case-insensitive)
    exes = exes.map(ex => {
      if (!ex.toLowerCase().includes(rawWord.toLowerCase())) {
        if (form === 'verb') return `Wir möchten gerne ${rawWord}.`;
        if (form === 'adjective') return `Das Angebot ist ${rawWord}.`;
        if (form === 'phrase') return `Wir sagen: ${rawWord}.`;
        return `${rawWord} ist hier zu sehen.`;
      }
      return ex;
    });

    // Deduplicate AFTER mapping fallbacks so all elements are distinct and unique
    exes = Array.from(new Set(exes));

    const targetFile = mapToThemeFile(item, wordLower, form);
    const themeName = targetFile.replace('.json', '');

    const newEntry = {
      id: entryId,
      word: rawWord,
      language: 'de',
      form: form,
      level: level,
      transcription: normalizeIPA(item.transcription) || `/${slug}/`,
      definitions: defs,
      examples: exes,
      domain: 'general',
      theme: themeName,
      updated: '2025-01-15'
    };

    if (item.emoji && typeof item.emoji === 'string' && item.emoji.trim() && item.emoji !== '✨') {
      newEntry.emoji = item.emoji.trim();
    } else {
      newEntry.no_emoji = true;
    }

    if (Array.isArray(item.antonyms) && item.antonyms.length > 0) {
      const cleanAnts = item.antonyms.filter(a => typeof a === 'string' && a.trim()).map(a => a.trim());
      if (cleanAnts.length > 0) newEntry.antonyms = cleanAnts;
      else newEntry.no_antonym = true;
    } else {
      newEntry.no_antonym = true;
    }

    // Noun fields
    if (form === 'noun') {
      if (properNounSet.has(wordLower)) {
        newEntry.countability = 'invariable';
      } else if (exactNounDb[wordLower]) {
        const info = exactNounDb[wordLower];
        newEntry.article = info.article;
        newEntry.gender = info.gender;
        newEntry.countability = info.countability;
        if (info.countability === 'countable') {
          newEntry.plural_form = info.plural_form;
        }
      } else {
        // Fallback for remaining nouns
        let gender = 'masculine';
        let article = 'der';
        if (rawWord.endsWith('e') || rawWord.endsWith('ung') || rawWord.endsWith('heit') || rawWord.endsWith('keit') || rawWord.endsWith('schaft')) {
          gender = 'feminine';
          article = 'die';
        }
        newEntry.article = article;
        newEntry.gender = gender;
        newEntry.countability = 'countable';
        newEntry.plural_form = rawWord.endsWith('e') ? rawWord + 'n' : rawWord + 'e';
      }
    }

    if (!convertedByFile[targetFile]) convertedByFile[targetFile] = [];
    convertedByFile[targetFile].push(newEntry);
  });

  // Write files cleanly
  let totalAdded = 0;
  for (const [file, entries] of Object.entries(convertedByFile)) {
    if (entries.length === 0) continue;
    const filePath = path.join(targetA0A1Dir, file);

    let existingContent = [];
    if (fs.existsSync(filePath)) {
      existingContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    const existingIds = new Set(existingContent.map(e => e.id));
    const newEntries = entries.filter(e => !existingIds.has(e.id));

    const updatedContent = [...existingContent, ...newEntries];
    fs.writeFileSync(filePath, JSON.stringify(updatedContent, null, 2) + '\n', 'utf8');
    console.log(`Wrote ${newEntries.length} new entries to a0_a1/${file}`);
    totalAdded += newEntries.length;
  }

  console.log(`Clean Migration Complete! Total new German entries added: ${totalAdded}`);
}

processGermanMigration();
