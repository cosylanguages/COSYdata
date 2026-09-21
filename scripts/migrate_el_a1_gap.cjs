const fs = require('fs');
const path = require('path');

const cosyDataDir = path.resolve(__dirname, '..');
const elDir = path.join(cosyDataDir, 'vocabulary', 'el');
const targetA0A1Dir = path.join(elDir, 'a0_a1');

// Helper to generate Greek slugs
function slugifyGreek(text) {
  const greekToLatin = {
    'α': 'a', 'ά': 'a', 'β': 'v', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'έ': 'e',
    'ζ': 'z', 'η': 'i', 'ή': 'i', 'θ': 'th', 'ι': 'i', 'ί': 'i', 'ϊ': 'i', 'ΐ': 'i',
    'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': 'x', 'ο': 'o', 'ό': 'o',
    'π': 'p', 'ρ': 'r', 'σ': 's', 'ς': 's', 'τ': 't', 'υ': 'y', 'ύ': 'y', 'ϋ': 'y', 'ΰ': 'y',
    'φ': 'f', 'χ': 'ch', 'ψ': 'ps', 'ω': 'o', 'ώ': 'o',
    'Α': 'a', 'Ά': 'a', 'Β': 'v', 'Γ': 'g', 'Δ': 'd', 'Ε': 'e', 'Έ': 'e',
    'Ζ': 'z', 'Η': 'i', 'Ή': 'i', 'Θ': 'th', 'Ι': 'i', 'Ί': 'i',
    'Κ': 'k', 'Λ': 'l', 'Μ': 'm', 'Ν': 'n', 'Ξ': 'x', 'Ο': 'o', 'Ό': 'o',
    'Π': 'p', 'Ρ': 'r', 'Σ': 's', 'Τ': 't', 'Υ': 'y', 'Ύ': 'y',
    'Φ': 'f', 'Χ': 'ch', 'Ψ': 'ps', 'Ω': 'o', 'Ώ': 'o'
  };

  let res = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (greekToLatin[ch]) {
      res += greekToLatin[ch];
    } else if (/[a-zA-Z0-9]/.test(ch)) {
      res += ch.toLowerCase();
    } else {
      res += '-';
    }
  }
  return res.replace(/-+/g, '-').replace(/^-+|-+$/g, '');
}

const entriesToMigrate = [
  // Nationalities / Places (nationalities.json)
  {
    word: 'Άγγλος',
    theme: 'nationalities.json',
    form: 'noun',
    gender: 'masculine',
    article: 'ο',
    countability: 'countable',
    plural_form: 'Άγγλοι',
    transcription: '/ˈaŋɡlos/',
    emoji: '🇬🇧',
    definitions: ['άνθρωπος που καταγόταν ή ζει στην Αγγλία'],
    examples: ['Ο Άγγλος τουρίστας μιλάει πολύ καλά ελληνικά.'],
    no_antonym: true
  },
  {
    word: 'Γάλλος',
    theme: 'nationalities.json',
    form: 'noun',
    gender: 'masculine',
    article: 'ο',
    countability: 'countable',
    plural_form: 'Γάλλοι',
    transcription: '/ˈɣalos/',
    emoji: '🇫🇷',
    definitions: ['άνθρωπος που καταγόταν ή ζει στη Γαλλία'],
    examples: ['Ο Γάλλος φίλος μας μαγειρεύει πολύ νόστιμα.'],
    no_antonym: true
  },
  {
    word: 'Έλληνας',
    theme: 'nationalities.json',
    form: 'noun',
    gender: 'masculine',
    article: 'ο',
    countability: 'countable',
    plural_form: 'Έλληνες',
    transcription: '/ˈelinas/',
    emoji: '🇬🇷',
    definitions: ['άνθρωπος που καταγόταν ή ζει στην Ελλάδα'],
    examples: ['Ο Έλληνας καθηγητής διδάσκει στο σχολείο μας.'],
    no_antonym: true
  },
  {
    word: 'Αθήνα',
    theme: 'nationalities.json',
    form: 'noun',
    gender: 'feminine',
    article: 'η',
    countability: 'invariable',
    transcription: '/aˈθina/',
    emoji: '🏛️',
    definitions: ['η πρωτεύουσα και μεγαλύτερη πόλη της Ελλάδας'],
    examples: ['Η Αθήνα είναι μια ιστορική και όμορφη πόλη.'],
    no_antonym: true
  },
  {
    word: 'ΗΠΑ',
    theme: 'nationalities.json',
    form: 'noun',
    gender: 'feminine',
    article: 'οι',
    countability: 'invariable',
    transcription: '/iˈpa/',
    emoji: '🇺🇸',
    definitions: ['οι Ηνωμένες Πολιτείες της Αμερικής'],
    examples: ['Οι ΗΠΑ είναι μια μεγάλη χώρα στην Αμερική.'],
    no_antonym: true
  },
  {
    word: 'Λονδίνο',
    theme: 'nationalities.json',
    form: 'noun',
    gender: 'neuter',
    article: 'το',
    countability: 'invariable',
    transcription: '/lonˈðino/',
    emoji: '🇬🇧',
    definitions: ['η πρωτεύουσα του Ηνωμένου Βασιλείου'],
    examples: ['Το Λονδίνο είναι μια μεγάλη ευρωπαϊκή πόλη.'],
    no_antonym: true
  },
  {
    word: 'Μόσχα',
    theme: 'nationalities.json',
    form: 'noun',
    gender: 'feminine',
    article: 'η',
    countability: 'invariable',
    transcription: '/ˈmosxa/',
    emoji: '🇷🇺',
    definitions: ['η πρωτεύουσα της Ρωσίας'],
    examples: ['Η Μόσχα έχει πολύ όμορφα και μεγάλα κτίρια.'],
    no_antonym: true
  },
  {
    word: 'Νέα Υόρκη',
    theme: 'nationalities.json',
    form: 'noun',
    gender: 'feminine',
    article: 'η',
    countability: 'invariable',
    transcription: '/ˈnea iˈorki/',
    emoji: '🗽',
    definitions: ['μεγάλη διάσημη πόλη στις Ηνωμένες Πολιτείες'],
    examples: ['Η Νέα Υόρκη είναι γεμάτη ψηλά κτίρια.'],
    no_antonym: true
  },
  {
    word: 'Παρίσι',
    theme: 'nationalities.json',
    form: 'noun',
    gender: 'neuter',
    article: 'το',
    countability: 'invariable',
    transcription: '/paˈrisi/',
    emoji: '🇫🇷',
    definitions: ['η πρωτεύουσα της Γαλλίας'],
    examples: ['Το Παρίσι είναι φημισμένο για τον Πύργο του Άιφελ.'],
    no_antonym: true
  },
  {
    word: 'Ρώμη',
    theme: 'nationalities.json',
    form: 'noun',
    gender: 'feminine',
    article: 'η',
    countability: 'invariable',
    transcription: '/ˈromi/',
    emoji: '🇮🇹',
    definitions: ['η πρωτεύουσα της Ιταλίας'],
    examples: ['Η Ρώμη είναι μια πανέμορφη και ιστορική πόλη.'],
    no_antonym: true
  },
  {
    word: 'Σωκράτης',
    theme: 'nationalities.json',
    form: 'noun',
    gender: 'masculine',
    article: 'ο',
    countability: 'invariable',
    transcription: '/soˈkratis/',
    emoji: '🏛️',
    definitions: ['διάσημος αρχαίος Έλληνας φιλόσοφος'],
    examples: ['Ο Σωκράτης έζησε στην αρχαία Αθήνα.'],
    no_antonym: true
  },

  // Family (family.json)
  {
    word: 'μαμά',
    theme: 'family.json',
    form: 'noun',
    gender: 'feminine',
    article: 'η',
    countability: 'countable',
    plural_form: 'μαμάδες',
    transcription: '/maˈma/',
    emoji: '👩',
    definitions: ['οικεία προσφώνηση για τη μητέρα'],
    examples: ['Η μαμά μου ετοιμάζει το πρωινό.'],
    no_antonym: true
  },
  {
    word: 'μπαμπάς',
    theme: 'family.json',
    form: 'noun',
    gender: 'masculine',
    article: 'ο',
    countability: 'countable',
    plural_form: 'μπαμπάδες',
    transcription: '/baˈmbas/',
    emoji: '👨',
    definitions: ['οικεία προσφώνηση για τον πατέρα'],
    examples: ['Ο μπαμπάς μου παίζει μαζί μας στον κήπο.'],
    no_antonym: true
  },

  // Food & Drink (food_drink.json)
  {
    word: 'μουσακάς',
    theme: 'food_drink.json',
    form: 'noun',
    gender: 'masculine',
    article: 'ο',
    countability: 'countable',
    plural_form: 'μουσακάδες',
    transcription: '/musaˈkas/',
    emoji: '🍲',
    definitions: ['παραδοσιακό ελληνικό φαγητό με μελιτζάνες και κιμά'],
    examples: ['Τρώμε νόστιμο μουσακά στο ελληνικό εστιατόριο.'],
    no_antonym: true
  },

  // Weather (weather.json)
  {
    word: 'βροχερός',
    theme: 'weather.json',
    form: 'adjective',
    transcription: '/vroxeˈros/',
    emoji: '🌧️',
    definitions: ['που έχει πολλή βροχή'],
    examples: ['Ο καιρός είναι βροχερός σήμερα το πρωί.'],
    antonyms: ['ηλιόλουστος']
  },
  {
    word: 'δροσερός',
    theme: 'weather.json',
    form: 'adjective',
    transcription: '/ðroseˈros/',
    emoji: '🍃',
    definitions: ['που έχει ευχάριστα χαμηλή θερμοκρασία'],
    examples: ['Πίνουμε δροσερό νερό μετά τη γυμναστική.'],
    no_antonym: true
  },
  {
    word: 'ηλιόλουστος',
    theme: 'weather.json',
    form: 'adjective',
    transcription: '/iliˈolustos/',
    emoji: '☀️',
    definitions: ['που έχει πολύ ήλιο και καθαρό ουρανό'],
    examples: ['Σήμερα είναι μια όμορφη ηλιόλουστη μέρα.'],
    antonyms: ['βροχερός']
  },

  // Adjectives (adjectives.json & general_adjectives.json & feelings.json)
  {
    word: 'αγενής',
    theme: 'adjectives.json',
    form: 'adjective',
    transcription: '/ajeˈnis/',
    emoji: '😠',
    definitions: ['που δεν έχει καλούς τρόπους συμπεριφοράς'],
    examples: ['Δεν πρέπει να είμαστε αγενείς στους άλλους.'],
    antonyms: ['ευγενικός']
  },
  {
    word: 'αστείος',
    theme: 'adjectives.json',
    form: 'adjective',
    transcription: '/asˈtios/',
    emoji: '😄',
    definitions: ['που προκαλεί γέλιο και χαρά'],
    examples: ['Ο φίλος μου λέει αστεία ιστορία.'],
    no_antonym: true
  },
  {
    word: 'βαρετός',
    theme: 'adjectives.json',
    form: 'adjective',
    transcription: '/vareˈtos/',
    emoji: '🥱',
    definitions: ['που δεν έχει ενδιαφέρον'],
    examples: ['Αυτό το βιβλίο είναι πολύ βαρετό.'],
    antonyms: ['ενδιαφέρων']
  },
  {
    word: 'ειλικρινής',
    theme: 'adjectives.json',
    form: 'adjective',
    transcription: '/ilikriˈnis/',
    emoji: '🤝',
    definitions: ['που λέει πάντα την αλήθεια'],
    examples: ['Είναι ένας ειλικρινής και καλός άνθρωπος.'],
    no_antonym: true
  },
  {
    word: 'έξυπνος',
    theme: 'adjectives.json',
    form: 'adjective',
    transcription: '/ˈeksipnos/',
    emoji: '🧠',
    definitions: ['που έχει μεγάλη αντιληπτική ικανότητα'],
    examples: ['Ο μαθητής είναι πολύ έξυπνος στην τάξη.'],
    no_antonym: true
  },
  {
    word: 'ευγενής',
    theme: 'adjectives.json',
    form: 'adjective',
    transcription: '/evjeˈnis/',
    emoji: '🎩',
    definitions: ['που συμπεριφέρεται με λεπτότητα και ευγένεια'],
    examples: ['Ο καθηγητής είναι πάντα ευγενής με όλους.'],
    antonyms: ['αγενής']
  },
  {
    word: 'ευγενικός',
    theme: 'adjectives.json',
    form: 'adjective',
    transcription: '/evjeniˈkos/',
    emoji: '😊',
    definitions: ['που δείχνει καλούς τρόπους και σεβασμό'],
    examples: ['Είναι πολύ ευγενικός με τους ηλικιωμένους.'],
    antonyms: ['αγενής']
  },
  {
    word: 'τεμπέλης',
    theme: 'adjectives.json',
    form: 'adjective',
    transcription: '/teˈbelis/',
    emoji: '🦥',
    definitions: ['που αποφεύγει τη δουλειά και την προσπάθεια'],
    examples: ['Ο γάτος είναι τεμπέλης και κοιμάται όλη μέρα.'],
    no_antonym: true
  },
  {
    word: 'φιλικός',
    theme: 'adjectives.json',
    form: 'adjective',
    transcription: '/filiˈkos/',
    emoji: '🤝',
    definitions: ['που συμπεριφέρεται σαν φίλος'],
    examples: ['Ο νέος γείτονας είναι πολύ φιλικός.'],
    no_antonym: true
  },
  {
    word: 'ωραίος',
    theme: 'adjectives.json',
    form: 'adjective',
    transcription: '/oˈreos/',
    emoji: '✨',
    definitions: ['που είναι όμορφος και ευχάριστος'],
    examples: ['Σήμερα είναι μια ωραία μέρα για βόλτα.'],
    antonyms: ['άσχημος']
  },

  // General Adjectives (general_adjectives.json)
  {
    word: 'αδύνατος',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/aˈðinatos/',
    emoji: '📏',
    definitions: ['που δεν έχει πολύ βάρος ή που δεν είναι δυνατός'],
    examples: ['Ο αθλητής είναι πολύ αδύνατος και γρήγορος.'],
    antonyms: ['δυνατός']
  },
  {
    word: 'ακριβός',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/akriˈvos/',
    emoji: '💎',
    definitions: ['που έχει υψηλή τιμή αγοράς'],
    examples: ['Αυτό το ρολόι είναι πολύ ακριβό.'],
    antonyms: ['φτηνός']
  },
  {
    word: 'απαίσιος',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/aˈpesios/',
    emoji: '🤮',
    definitions: ['πολύ κακός ή δυσάρεστος'],
    examples: ['Ο καιρός ήταν απαίσιος χθες το βράδυ.'],
    antonyms: ['θαυμάσιος']
  },
  {
    word: 'απαραίτητος',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/apareˈtitos/',
    emoji: '🔑',
    definitions: ['που χρειάζεται οπωσδήποτε'],
    examples: ['Το νερό είναι απαραίτητο για τη ζωή.'],
    no_antonym: true
  },
  {
    word: 'ασφαλής',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/asfaˈlis/',
    emoji: '🛡️',
    definitions: ['που προστατεύεται από κινδύνους'],
    examples: ['Το σπίτι μας είναι ασφαλές μέρος.'],
    antonyms: ['επικίνδυνος']
  },
  {
    word: 'άχρηστος',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/ˈaxristos/',
    emoji: '🗑️',
    definitions: ['που δεν έχει καμία χρησιμότητα'],
    examples: ['Αυτό το παλιό πράγμα είναι άχρηστο.'],
    antonyms: ['χρήσιμος']
  },
  {
    word: 'βρεγμένος',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/vreˈmenos/',
    emoji: '💧',
    definitions: ['που έχει πάνω του νερό'],
    examples: ['Τα ρούχα είναι βρεγμένα από τη βροχή.'],
    antonyms: ['στεγνός']
  },
  {
    word: 'δημοφιλής',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/ðimofiˈlis/',
    emoji: '⭐',
    definitions: ['που αρέσει σε πολλούς ανθρώπους'],
    examples: ['Είναι πολύ δημοφιλής τραγουδιστής στην Ελλάδα.'],
    no_antonym: true
  },
  {
    word: 'διαδικτυακός',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/ðiaðiktiaˈkos/',
    emoji: '🌐',
    definitions: ['που σχετίζεται με το διαδίκτυο'],
    examples: ['Κάνουμε διαδικτυακό μάθημα στο υπολογιστή.'],
    no_antonym: true
  },
  {
    word: 'ειδικός',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/eðiˈkos/',
    emoji: '🎯',
    definitions: ['που έχει εξειδικευμένες γνώσεις ή χρήση'],
    examples: ['Χρειάζεται ειδικός εξοπλισμός για το άθλημα.'],
    no_antonym: true
  },
  {
    word: 'ελεύθερος',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/eˈlefθeros/',
    emoji: '🕊️',
    definitions: ['που δεν περιορίζεται από κάποιον'],
    examples: ['Έχω ελεύθερο χρόνο το Σαββατοκύριακο.'],
    no_antonym: true
  },
  {
    word: 'ενδιαφέρων',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/enðiaˈferon/',
    emoji: '💡',
    definitions: ['που τραβάει την προσοχή'],
    examples: ['Διαβάζω ένα πολύ ενδιαφέρον βιβλίο.'],
    antonyms: ['βαρετός']
  },
  {
    word: 'εξαιρετικός',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/eksaretiˈkos/',
    emoji: '🌟',
    definitions: ['πολύ καλός, ανώτερης ποιότητας'],
    examples: ['Το φαγητό στο εστιατόριο ήταν εξαιρετικό.'],
    no_antonym: true
  },
  {
    word: 'επικίνδυνος',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/epikinˈðinos/',
    emoji: '⚠️',
    definitions: ['που μπορεί να προκαλέσει βλάβη'],
    examples: ['Είναι επικίνδυνο να τρέχεις στη βροχή.'],
    antonyms: ['ασφαλής']
  },
  {
    word: 'θαυμάσιος',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/θavˈmasios/',
    emoji: '✨',
    definitions: ['πολύ όμορφος και ευχάριστος'],
    examples: ['Είχαμε μια θαυμάσια μέρα στην παραλία.'],
    antonyms: ['απαίσιος']
  },
  {
    word: 'θορυβώδης',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/θorivoˈðis/',
    emoji: '🔊',
    definitions: ['που κάνει πολύ θόρυβο'],
    examples: ['Η πόλη είναι πολύ θορυβώδης το πρωί.'],
    antonyms: ['ήσυχος']
  },
  {
    word: 'ήσυχος',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/ˈisixos/',
    emoji: '🤫',
    definitions: ['που δεν κάνει θόρυβο'],
    examples: ['Το δωμάτιο είναι ήσυχο για διάβασμα.'],
    antonyms: ['θορυβώδης']
  },
  {
    word: 'καινούριος',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/keˈnurios/',
    emoji: '🆕',
    definitions: ['που έχει φτιαχτεί ή αγοραστεί πρόσφατα'],
    examples: ['Αγόρασα καινούριο αυτοκίνητο χθες.'],
    antonyms: ['παλιός']
  },
  {
    word: 'καταπληκτικός',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/katapliktiˈkos/',
    emoji: '🤩',
    definitions: ['που προκαλεί μεγάλο θαυμασμό'],
    examples: ['Η θέα από το βουνό είναι καταπληκτική.'],
    no_antonym: true
  },
  {
    word: 'λανθασμένος',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/lanθazˈmenos/',
    emoji: '❌',
    definitions: ['που περιέχει λάθος'],
    examples: ['Αυτή η απάντηση είναι λανθασμένη.'],
    antonyms: ['σωστός']
  },
  {
    word: 'λευκό',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/lefˈkos/',
    emoji: '⚪',
    definitions: ['που έχει το χρώμα του χιονιού'],
    examples: ['Το λευκό πουκάμισο είναι καθαρό.'],
    antonyms: ['μαύρος']
  },
  {
    word: 'μόνος',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/ˈmonos/',
    emoji: '🚶',
    definitions: ['χωρίς τη συντροφιά άλλων'],
    examples: ['Περπατάει μόνος στο πάρκο.'],
    no_antonym: true
  },
  {
    word: 'παρόμοιος',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/paˈromios/',
    emoji: '👯',
    definitions: ['που μοιάζει πολύ με κάτι άλλο'],
    examples: ['Έχουμε παρόμοια βιβλία στη βιβλιοθήκη.'],
    antonyms: ['διαφορετικός']
  },
  {
    word: 'πιθανός',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/piθaˈnos/',
    emoji: '🎲',
    definitions: ['που μπορεί να συμβεί'],
    examples: ['Είναι πιθανό να βρέξει το απόγευμα.'],
    no_antonym: true
  },
  {
    word: 'στεγνός',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/steˈɣnos/',
    emoji: '☀️',
    definitions: ['που δεν έχει καθόλου υγρασία'],
    examples: ['Τα ρούχα είναι πλέον στεγνά.'],
    antonyms: ['βρεγμένος']
  },
  {
    word: 'συνηθισμένος',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/siniθizˈmenos/',
    emoji: '🔄',
    definitions: ['που συμβαίνει συχνά, κανονικός'],
    examples: ['Είναι μια συνηθισμένη μέρα στη δουλειά.'],
    no_antonym: true
  },
  {
    word: 'σωστός',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/sosˈtos/',
    emoji: '✅',
    definitions: ['που είναι ακριβής και χωρίς λάθη'],
    examples: ['Έδωσε τη σωστή απάντηση στην άσκηση.'],
    antonyms: ['λανθασμένος']
  },
  {
    word: 'τέλειος',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/ˈtelios/',
    emoji: '👌',
    definitions: ['που δεν έχει κανένα ελάττωμα'],
    examples: ['Ο καιρός είναι τέλειος για βόλτα.'],
    no_antonym: true
  },
  {
    word: 'τρομερός',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/tromeˈros/',
    emoji: '💥',
    definitions: ['πολύ μεγάλος, εντυπωσιακός ή φοβερός'],
    examples: ['Έκανε τρομερή ζέστη το μεσημέρι.'],
    no_antonym: true
  },
  {
    word: 'υπέροχος',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/iˈperoxos/',
    emoji: '🌈',
    definitions: ['εξαιρετικά όμορφος και ευχάριστος'],
    examples: ['Περάσαμε μια υπέροχη μέρα μαζί.'],
    no_antonym: true
  },
  {
    word: 'υψηλός',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/ipsiˈlos/',
    emoji: '📈',
    definitions: ['που βρίσκεται πολύ ψηλά'],
    examples: ['Η θερμοκρασία είναι υψηλή σήμερα.'],
    antonyms: ['χαμηλός']
  },
  {
    word: 'φανταστικός',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/fantastiˈkos/',
    emoji: '🦄',
    definitions: ['πολύ ωραίος, εξαιρετικός'],
    examples: ['Είδαμε μια φανταστική ταινία στο σινεμά.'],
    no_antonym: true
  },
  {
    word: 'φτηνός',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/ftiˈnos/',
    emoji: '🏷️',
    definitions: ['που έχει χαμηλή τιμή'],
    examples: ['Αυτό το βιβλίο είναι πολύ φτηνό.'],
    antonyms: ['ακριβός']
  },
  {
    word: 'χαμηλός',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/xamiˈlos/',
    emoji: '📉',
    definitions: ['που έχει μικρό ύψος ή επίπεδο'],
    examples: ['Το τραπέζι είναι χαμηλό.'],
    antonyms: ['υψηλός']
  },
  {
    word: 'χρήσιμος',
    theme: 'general_adjectives.json',
    form: 'adjective',
    transcription: '/ˈxrisimos/',
    emoji: '🛠️',
    definitions: ['που προσφέρει εξυπηρέτηση ή βοήθεια'],
    examples: ['Αυτός ο οδηγός είναι πολύ χρήσιμος.'],
    antonyms: ['άχρηστος']
  },

  // Feelings (feelings.json)
  {
    word: 'αγχωμένος',
    theme: 'feelings.json',
    form: 'adjective',
    transcription: '/aŋxoˈmenos/',
    emoji: '😰',
    definitions: ['που νιώθει έντονο άγχος'],
    examples: ['Είναι αγχωμένος πριν από τις εξετάσεις.'],
    antonyms: ['χαλαρός']
  },
  {
    word: 'ανήσυχος',
    theme: 'feelings.json',
    form: 'adjective',
    transcription: '/aˈnisixos/',
    emoji: '😟',
    definitions: ['που νιώθει ανησυχία για κάτι'],
    examples: ['Η μητέρα είναι ανήσυχη για το παιδί.'],
    antonyms: ['ήσυχος']
  },
  {
    word: 'απασχολημένος',
    theme: 'feelings.json',
    form: 'adjective',
    transcription: '/apasxoliˈmenos/',
    emoji: '⏳',
    definitions: ['που έχει πολλή δουλειά να κάνει'],
    examples: ['Ο πατέρας είναι πολύ απασχολημένος σήμερα.'],
    no_antonym: true
  },
  {
    word: 'απογοητευμένος',
    theme: 'feelings.json',
    form: 'adjective',
    transcription: '/apoɣoiteˈmenos/',
    emoji: '😞',
    definitions: ['που έχασε τις ελπίδες του'],
    examples: ['Ήταν απογοητευμένος από το αποτέλεσμα.'],
    no_antonym: true
  },
  {
    word: 'βαριεστημένος',
    theme: 'feelings.json',
    form: 'adjective',
    transcription: '/variestiˈmenos/',
    emoji: '🥱',
    definitions: ['που νιώθει πλήξη και ανία'],
    examples: ['Ο μαθητής δείχνει βαριεστημένος στο μάθημα.'],
    no_antonym: true
  },
  {
    word: 'δυστυχισμένος',
    theme: 'feelings.json',
    form: 'adjective',
    transcription: '/ðistixiˈmenos/',
    emoji: '😢',
    definitions: ['που νιώθει μεγάλη λύπη'],
    examples: ['Δεν θέλω να βλέπω κανέναν δυστυχισμένο.'],
    antonyms: ['χαρούμενος']
  },
  {
    word: 'έκπληκτος',
    theme: 'feelings.json',
    form: 'adjective',
    transcription: '/ˈekpliktos/',
    emoji: '😲',
    definitions: ['που νιώθει μεγάλη έκπληξη'],
    examples: ['Ήταν έκπληκτος με το δώρο.'],
    no_antonym: true
  },
  {
    word: 'ενθουσιασμένος',
    theme: 'feelings.json',
    form: 'adjective',
    transcription: '/enθusiaˈzmenos/',
    emoji: '😃',
    definitions: ['που νιώθει μεγάλο ενθουσιασμό'],
    examples: ['Τα παιδιά είναι ενθουσιασμένα με το ταξίδι.'],
    no_antonym: true
  },
  {
    word: 'θυμωμένος',
    theme: 'feelings.json',
    form: 'adjective',
    transcription: '/θimoˈmenos/',
    emoji: '😡',
    definitions: ['που νιώθει θυμό'],
    examples: ['Ο άνδρας είναι θυμωμένος με το λάθος.'],
    no_antonym: true
  },
  {
    word: 'μετανιωμένος',
    theme: 'feelings.json',
    form: 'adjective',
    transcription: '/metanioˈmenos/',
    emoji: '😔',
    definitions: ['που λυπάται για κάτι που έκανε'],
    examples: ['Δείχνει μετανιωμένος για τις πράξεις του.'],
    no_antonym: true
  },
  {
    word: 'νευρικός',
    theme: 'feelings.json',
    form: 'adjective',
    transcription: '/nevriˈkos/',
    emoji: '😬',
    definitions: ['που αναστατώνεται εύκολα'],
    examples: ['Είναι νευρικός όταν μιλάει σε κόσμο.'],
    antonyms: ['ήρεμος']
  },
  {
    word: 'περήφανος',
    theme: 'feelings.json',
    form: 'adjective',
    transcription: '/periˈfanos/',
    emoji: '🦚',
    definitions: ['που νιώθει υπερηφάνεια'],
    examples: ['Οι γονείς είναι περήφανοι για το παιδί.'],
    no_antonym: true
  },
  {
    word: 'σίγουρος',
    theme: 'feelings.json',
    form: 'adjective',
    transcription: '/ˈsiɣuros/',
    emoji: '👍',
    definitions: ['που δεν έχει καμία αμφιβολία'],
    examples: ['Είμαι σίγουρος για τη σωστή απάντηση.'],
    no_antonym: true
  },
  {
    word: 'φοβισμένος',
    theme: 'feelings.json',
    form: 'adjective',
    transcription: '/foviˈzmenos/',
    emoji: '😨',
    definitions: ['που νιώθει φόβο'],
    examples: ['Το μικρό παιδί είναι φοβισμένο στο σκοτάδι.'],
    no_antonym: true
  },
  {
    word: 'χαλαρός',
    theme: 'feelings.json',
    form: 'adjective',
    transcription: '/xalaˈros/',
    emoji: '😌',
    definitions: ['που είναι ξεκούραστος και ήρεμος'],
    examples: ['Νιώθω χαλαρός μετά τις διακοπές.'],
    antonyms: ['αγχωμένος']
  },

  // Expressions / Phrases (expressions.json)
  {
    word: 'έχω την οικονομική δυνατότητα',
    theme: 'expressions.json',
    form: 'phrase',
    transcription: '/ˈexo tin ikonomiki ðinaˈtotita/',
    emoji: '💰',
    definitions: ['έχω αρκετά χρήματα για να αγοράσω κάτι'],
    examples: ['Έχω την οικονομική δυνατότητα να ταξιδέψω.'],
    no_antonym: true
  },
  {
    word: 'κάνω κράτηση',
    theme: 'expressions.json',
    form: 'phrase',
    transcription: '/ˈkano ˈkratisi/',
    emoji: '🏨',
    definitions: ['κλείνω δωμάτιο ή τραπέζι εκ των προτέρων'],
    examples: ['Θέλω να κάνω κράτηση στο εστιατόριο.'],
    no_antonym: true
  },
  {
    word: 'πέφτω για ύπνο',
    theme: 'expressions.json',
    form: 'phrase',
    transcription: '/ˈpefto ja ˈipno/',
    emoji: '🛌',
    definitions: ['ξαπλώνω στο κρεβάτι για να κοιμηθώ'],
    examples: ['Πέφτω για ύπνο νωρίς το βράδυ.'],
    no_antonym: true
  },
  {
    word: 'τρώω πρωινό',
    theme: 'expressions.json',
    form: 'phrase',
    transcription: '/ˈtroo proiˈno/',
    emoji: '🥣',
    definitions: ['καταναλώνω το πρώτο γεύμα της ημέρας'],
    examples: ['Τρώω πρωινό κάθε μέρα στις οκτώ.'],
    no_antonym: true
  },
  {
    word: 'φτιάχνω βαλίτσα',
    theme: 'expressions.json',
    form: 'phrase',
    transcription: '/ˈftiaxno vaˈlitsa/',
    emoji: '🧳',
    definitions: ['ετοιμάζω τα πράγματά μου για ταξίδι'],
    examples: ['Φτιάχνω βαλίτσα για τις διακοπές μου.'],
    no_antonym: true
  },

  // Adverbs / Connectors (adverbs_connectors.json)
  {
    word: 'κάθε μέρα',
    theme: 'adverbs_connectors.json',
    form: 'adverb',
    transcription: '/ˈkaθe ˈmera/',
    emoji: '📅',
    definitions: ['καθημερινά, σε όλες τις ημέρες'],
    examples: ['Πηγαίνω στο σχολείο κάθε μέρα.'],
    no_antonym: true
  },

  // Body & Health (body_health.json)
  {
    word: 'γυμνασμένος',
    theme: 'body_health.json',
    form: 'adjective',
    transcription: '/jimnaˈzmenos/',
    emoji: '🏋️‍♂️',
    definitions: ['που έχει γυμνάσει το σώμα του'],
    examples: ['Ο αθλητής είναι πολύ γυμνασμένος.'],
    no_antonym: true
  },
  {
    word: 'υγιής',
    theme: 'body_health.json',
    form: 'adjective',
    transcription: '/ijiˈis/',
    emoji: '💪',
    definitions: ['που έχει καλή σωματική υγεία'],
    examples: ['Τρώει φρούτα για να είναι υγιής.'],
    antonyms: ['άρρωστος']
  },

  // Jobs / Occupations / Terms (jobs.json)
  {
    word: 'μερικής απασχόλησης',
    theme: 'jobs.json',
    form: 'phrase',
    transcription: '/meriˈkis apasˈxolisis/',
    emoji: '⏱️',
    definitions: ['εργασία με μειωμένο ωράριο'],
    examples: ['Εργάζεται με μερικής απασχόλησης στη βιβλιοθήκη.'],
    no_antonym: true
  },
  {
    word: 'πλήρους απασχόλησης',
    theme: 'jobs.json',
    form: 'phrase',
    transcription: '/ˈpliros apasˈxolisis/',
    emoji: '⏰',
    definitions: ['εργασία με κανονικό πλήρες ωράριο'],
    examples: ['Βρήκε δουλειά πλήρους απασχόλησης στην εταιρεία.'],
    no_antonym: true
  },

  // Daily Verbs (daily_verbs.json)
  {
    word: 'ακολουθώ',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/akoluˈθo/',
    emoji: '🚶‍♂️',
    definitions: ['πηγαίνω πίσω από κάποιον'],
    examples: ['Ακολουθώ τον οδηγό στο δρόμο.'],
    no_antonym: true
  },
  {
    word: 'ακυρώνω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/akiˈrono/',
    emoji: '❌',
    definitions: ['ματαιώνω μια προγραμματισμένη ενέργεια'],
    examples: ['Πρέπει να ακυρώσω τη σημερινή συνάντηση.'],
    no_antonym: true
  },
  {
    word: 'αναρρώνω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/anaˈrono/',
    emoji: '🩹',
    definitions: ['ξαναβρίσκω την υγεία μου μετά από αρρώστια'],
    examples: ['Ο ασθενής αναρρώνει γρήγορα στο σπίτι.'],
    no_antonym: true
  },
  {
    word: 'ανήκω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/aˈniko/',
    emoji: '🧩',
    definitions: ['είμαι ιδιοκτησία ή μέρος κάποιου σύνολου'],
    examples: ['Αυτό το βιβλίο ανήκει στη βιβλιοθήκη.'],
    no_antonym: true
  },
  {
    word: 'απολαμβάνω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/apolamˈvano/',
    emoji: '😌',
    definitions: ['νιώθω μεγάλη ευχαρίστηση από κάτι'],
    examples: ['Απολαμβάνω τον καφέ μου το πρωί.'],
    no_antonym: true
  },
  {
    word: 'αποταμιεύω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/apotamiˈevo/',
    emoji: '🏦',
    definitions: ['μαζεύω και φυλάω χρήματα'],
    examples: ['Αποταμιεύω χρήματα για το ταξίδι.'],
    no_antonym: true
  },
  {
    word: 'αποφασίζω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/apofaˈsizo/',
    emoji: '🤔',
    definitions: ['παίρνω μια απόφαση για κάτι'],
    examples: ['Αποφασίζω να μάθω μια νέα γλώσσα.'],
    no_antonym: true
  },
  {
    word: 'βάζω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/ˈvazo/',
    emoji: '📥',
    definitions: ['τοποθετώ κάτι σε ένα μέρος'],
    examples: ['Βάζω το βιβλίο πάνω στο τραπέζι.'],
    antonyms: ['βγάζω']
  },
  {
    word: 'γίνομαι',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/ˈjinome/',
    emoji: '🌱',
    definitions: ['μεταβάλλομαι σε κάτι άλλο'],
    examples: ['Θέλει να γίνει γιατρός όταν μεγαλώσει.'],
    no_antonym: true
  },
  {
    word: 'γιορτάζω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/jorˈtazo/',
    emoji: '🎉',
    definitions: ['κάνω γιορτή για μια χαρούμενη μέρα'],
    examples: ['Γιορτάζουμε τα γενέθλιά μου σήμερα.'],
    no_antonym: true
  },
  {
    word: 'γυμνάζομαι',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/jimˈnazome/',
    emoji: '🤸',
    definitions: ['κάνω ασκήσεις για το σώμα'],
    examples: ['Γυμνάζομαι στο γυμναστήριο τρεις φορές.'],
    no_antonym: true
  },
  {
    word: 'δείχνω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/ˈðixno/',
    emoji: '👉',
    definitions: ['φανερώνω κάτι με το χέρι ή το βλέμμα'],
    examples: ['Δείχνω τον δρόμο στον τουρίστα.'],
    no_antonym: true
  },
  {
    word: 'διαχειρίζομαι',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/ðiaxeriˈzome/',
    emoji: '📊',
    definitions: ['διοικώ ή κατευθύνω μια υπόθεση'],
    examples: ['Διαχειρίζομαι το χρόνο μου προσεκτικά.'],
    no_antonym: true
  },
  {
    word: 'ελέγχω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/eˈleŋxo/',
    emoji: '🔍',
    definitions: ['εξετάζω αν κάτι είναι σωστό'],
    examples: ['Ελέγχω τις ασκήσεις μου πριν τις παραδώσω.'],
    no_antonym: true
  },
  {
    word: 'ελπίζω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/elˈpizo/',
    emoji: '🤞',
    definitions: ['προσδοκώ κάτι καλό στο μέλλον'],
    examples: ['Ελπίζω να κάνει καλό καιρό αύριο.'],
    no_antonym: true
  },
  {
    word: 'εξηγώ',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/eksiˈɣo/',
    emoji: '🗣️',
    definitions: ['κάνω κάτι σαφές και κατανοητό'],
    examples: ['Ο δάσκαλος εξηγεί τον νέο κανόνα.'],
    no_antonym: true
  },
  {
    word: 'επαναλαμβάνω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/epanalamˈvano/',
    emoji: '🔁',
    definitions: ['λέω ή κάνω κάτι ξανά'],
    examples: ['Επαναλαμβάνω τη λέξη για να τη μάθω.'],
    no_antonym: true
  },
  {
    word: 'επιλέγω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/epiˈleɣo/',
    emoji: '☑️',
    definitions: ['διαλέγω ανάμεσα σε περισσότερα'],
    examples: ['Επιλέγω το κόκκινο μπλουζάκι.'],
    no_antonym: true
  },
  {
    word: 'επισκέπτομαι',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/epiˈskeptome/',
    emoji: '🏛️',
    definitions: ['πηγαίνω να δω κάποιον ή ένα μέρος'],
    examples: ['Επισκέπτομαι το μουσείο την Κυριακή.'],
    no_antonym: true
  },
  {
    word: 'επισκευάζω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/episkeiˈazo/',
    emoji: '🛠️',
    definitions: ['διορθώνω κάτι που είναι χαλασμένο'],
    examples: ['Επισκευάζω το ποδήλατό μου στον κήπο.'],
    no_antonym: true
  },
  {
    word: 'επιστρέφω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/epiˈstrefo/',
    emoji: '↩️',
    definitions: ['γυρίζω πίσω εκεί που ήμουν'],
    examples: ['Επιστρέφω στο σπίτι το απόγευμα.'],
    no_antonym: true
  },
  {
    word: 'καλώ',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/kaˈlo/',
    emoji: '📞',
    definitions: ['φωνάζω ή τηλεφωνώ σε κάποιον'],
    examples: ['Καλώ τον φίλο μου στο τηλέφωνο.'],
    no_antonym: true
  },
  {
    word: 'κερδίζω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/kerˈðizo/',
    emoji: '🏆',
    definitions: ['βγαίνω πρώτος ή αποκτώ όφελος'],
    examples: ['Η ομάδα μας κερδίζει τον αγώνα.'],
    antonyms: ['χάνω']
  },
  {
    word: 'κόβω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/ˈkovo/',
    emoji: '✂️',
    definitions: ['διαιρώ κάτι με μαχαίρι ή ψαλίδι'],
    examples: ['Κόβω το ψωμί στο τραπέζι.'],
    no_antonym: true
  },
  {
    word: 'κοστίζω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/kosˈtizo/',
    emoji: '🏷️',
    definitions: ['έχω μια ορισμένη χρηματική τιμή'],
    examples: ['Αυτό το βιβλίο κοστίζει δέκα ευρώ.'],
    no_antonym: true
  },
  {
    word: 'κρατώ',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/kraˈto/',
    emoji: '🤲',
    definitions: ['έχω στα χέρια μου και δεν αφήνω'],
    examples: ['Κρατώ την τσάντα μου στο λεωφορείο.'],
    no_antonym: true
  },
  {
    word: 'λαμβάνω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/lamˈvano/',
    emoji: '📬',
    definitions: ['παίρνω κάτι που μου στέλνουν'],
    examples: ['Λαμβάνω ένα γράμμα από τον φίλο μου.'],
    no_antonym: true
  },
  {
    word: 'μεγαλώνω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/meɣaˈlono/',
    emoji: '🌱',
    definitions: ['αυξάνω σε ηλικία ή μέγεθος'],
    examples: ['Το παιδί μεγαλώνει πολύ γρήγορα.'],
    no_antonym: true
  },
  {
    word: 'μένω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/ˈmeno/',
    emoji: '🏠',
    definitions: ['κατοικώ κάπου ή παραμένω σε ένα μέρος'],
    examples: ['Μένω σε ένα όμορφο σπίτι στην Αθήνα.'],
    no_antonym: true
  },
  {
    word: 'μετακινούμαι',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/metakiˈnume/',
    emoji: '🚌',
    definitions: ['αλλάζω θέση ή μεταβαίνω κάπου'],
    examples: ['Μετακινούμαι με το λεωφορείο στην πόλη.'],
    no_antonym: true
  },
  {
    word: 'μισώ',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/miˈso/',
    emoji: '😡',
    definitions: ['νιώθω έντονη απέχθεια για κάτι'],
    examples: ['Μισώ την καθυστέρηση στο ραντεβού.'],
    antonyms: ['αγαπάω']
  },
  {
    word: 'μοιράζομαι',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/miˈrazome/',
    emoji: '🤝',
    definitions: ['δίνω μέρος από κάτι σε άλλους'],
    examples: ['Μοιράζομαι το φαγητό μου με τον φίλο μου.'],
    no_antonym: true
  },
  {
    word: 'νοικιάζω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/niˈkiazo/',
    emoji: '🔑',
    definitions: ['παίρνω ή δίνω κάτι με ενοίκιο'],
    examples: ['Νοικιάζουμε ένα διαμέρισμα στο κέντρο.'],
    no_antonym: true
  },
  {
    word: 'ξεκινώ',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/ksekiˈno/',
    emoji: '🚀',
    definitions: ['αρχίζω μια δραστηριότητα ή διαδρομή'],
    examples: ['Ξεκινώ τη δουλειά μου νωρίς το πρωί.'],
    antonyms: ['τελειώνω']
  },
  {
    word: 'ξεκουράζομαι',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/ksekuˈrazome/',
    emoji: '🛋️',
    definitions: ['αναπαύομαι μετά από κούραση'],
    examples: ['Ξεκουράζομαι στον καναπέ το απόγευμα.'],
    no_antonym: true
  },
  {
    word: 'ξοδεύω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/ksoˈðevo/',
    emoji: '💸',
    definitions: ['δίνω χρήματα για να αγοράσω πράγματα'],
    examples: ['Ξοδεύω χρήματα για τα ψώνια της εβδομάδας.'],
    antonyms: ['αποταμιεύω']
  },
  {
    word: 'ξυπνάω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/ksiˈpnao/',
    emoji: '⏰',
    definitions: ['σταματώ να κοιμάμαι'],
    examples: ['Ξυπνάω στις επτά κάθε πρωί.'],
    no_antonym: true
  },
  {
    word: 'οργανώνω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/orɣaˈnono/',
    emoji: '📅',
    definitions: ['βάζω πράγματα σε τάξη'],
    examples: ['Οργανώνω το γραφείο μου πριν τη δουλειά.'],
    no_antonym: true
  },
  {
    word: 'παραγγέλνω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/paraˈjelno/',
    emoji: '🍕',
    definitions: ['ζητώ φαγητό ή προϊόντα'],
    examples: ['Παραγγέλνω πίτσα για το βράδυ.'],
    no_antonym: true
  },
  {
    word: 'παρευρίσκομαι',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/pareˈvriskome/',
    emoji: '👥',
    definitions: ['είμαι παρών σε μια εκδήλωση'],
    examples: ['Παρευρίσκομαι στη γιορτή του σχολείου.'],
    no_antonym: true
  },
  {
    word: 'παρουσιάζω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/parusiˈazo/',
    emoji: '🎤',
    definitions: ['δείχνω ή εξηγώ κάτι στο κοινό'],
    examples: ['Παρουσιάζω την εργασία μου στην τάξη.'],
    no_antonym: true
  },
  {
    word: 'πεθαίνω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/peˈθeno/',
    emoji: '🥀',
    definitions: ['χάνω τη ζωή μου'],
    examples: ['Τα λουλούδια πεθαίνουν χωρίς νερό.'],
    antonyms: ['ζω']
  },
  {
    word: 'περιλαμβάνω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/perilamˈvano/',
    emoji: '📦',
    definitions: ['έχω μέσα στο περιεχόμενό μου'],
    examples: ['Το γεύμα περιλαμβάνει σαλάτα και χυμό.'],
    no_antonym: true
  },
  {
    word: 'περνώ',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/perˈno/',
    emoji: '🚶',
    definitions: ['διασχίζω έναν τόπο ή διαθέτω χρόνο'],
    examples: ['Περνώ όμορφα τις διακοπές μου.'],
    no_antonym: true
  },
  {
    word: 'πηδώ',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/piˈðo/',
    emoji: '🦘',
    definitions: ['αναπηδώ στον αέρα'],
    examples: ['Το παιδί πηδάει στο γρασίδι.'],
    no_antonym: true
  },
  {
    word: 'πονώ',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/poˈno/',
    emoji: '🤕',
    definitions: ['αισθάνομαι σωματικό πόνο'],
    examples: ['Πονάει το κεφάλι μου σήμερα.'],
    no_antonym: true
  },
  {
    word: 'προσθέτω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/prosˈθeto/',
    emoji: '➕',
    definitions: ['βάζω κάτι επιπλέον σε ένα σύνολο'],
    examples: ['Προσθέτω λίγο αλάτι στο φαγητό.'],
    no_antonym: true
  },
  {
    word: 'προσκαλώ',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/proskaˈlo/',
    emoji: '✉️',
    definitions: ['ζητώ από κάποιον να έρθει σε εκδήλωση'],
    examples: ['Προσκαλώ τους φίλους μου στο πάρτι.'],
    no_antonym: true
  },
  {
    word: 'προσπαθώ',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/prospaˈθo/',
    emoji: '🎯',
    definitions: ['κάνω προσπάθεια για να πετύχω κάτι'],
    examples: ['Προσπαθώ να καταλάβω το μάθημα.'],
    no_antonym: true
  },
  {
    word: 'σηκώνομαι',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/siˈkonome/',
    emoji: '🧍',
    definitions: ['στέκομαι όρθιος από τη θέση μου'],
    examples: ['Σηκώνομαι νωρίς το πρωί από το κρεβάτι.'],
    antonyms: ['κάθομαι']
  },
  {
    word: 'σημαίνω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/siˈmeno/',
    emoji: '💡',
    definitions: ['έχω μια συγκεκριμένη σημασία'],
    examples: ['Τι σημαίνει αυτή η νέα λέξη;'],
    no_antonym: true
  },
  {
    word: 'σπάω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/ˈspao/',
    emoji: '💔',
    definitions: ['κομματιάζω κάτι σκληρό'],
    examples: ['Έσπασε το ποτήρι στο πάτωμα.'],
    no_antonym: true
  },
  {
    word: 'σπρώχνω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/ˈsproxno/',
    emoji: '👐',
    definitions: ['ασκώ πίεση για να μετακινήσω κάτι'],
    examples: ['Σπρώχνω την πόρτα για να ανοίξει.'],
    antonyms: ['τραβώ']
  },
  {
    word: 'στέλνω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/ˈstelno/',
    emoji: '✉️',
    definitions: ['διαβιβάζω κάτι σε άλλον'],
    examples: ['Στέλνω ένα μήνυμα στον φίλο μου.'],
    antonyms: ['λαμβάνω']
  },
  {
    word: 'στρίβω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/ˈstrivo/',
    emoji: '↪️',
    definitions: ['αλλάζω κατεύθυνση καθώς κινούμαι'],
    examples: ['Στρίβω δεξιά στον επόμενο δρόμο.'],
    no_antonym: true
  },
  {
    word: 'συμβαίνει',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/simˈveni/',
    emoji: '⚡',
    definitions: ['λαμβάνει χώρα ένα γεγονός'],
    examples: ['Τι συμβαίνει εκεί έξω;'],
    no_antonym: true
  },
  {
    word: 'συμφωνώ',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/simfoˈno/',
    emoji: '🤝',
    definitions: ['έχω την ίδια γνώμη με κάποιον'],
    examples: ['Συμφωνώ απόλυτα με την πρότασή σου.'],
    no_antonym: true
  },
  {
    word: 'συναντώ',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/sinanˈto/',
    emoji: '👥',
    definitions: ['βλέπω κάποιον σε ορισμένο μέρος'],
    examples: ['Συναντώ τους φίλους μου στο πάρκο.'],
    no_antonym: true
  },
  {
    word: 'συνεχίζω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/sineˈxizo/',
    emoji: '▶️',
    definitions: ['δεν σταματώ μια δραστηριότητα'],
    examples: ['Συνεχίζω το διάβασμα μέχρι το βράδυ.'],
    antonyms: ['σταματάω']
  },
  {
    word: 'συνιστώ',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/siniˈsto/',
    emoji: '👍',
    definitions: ['προτείνω κάτι ως καλό'],
    examples: ['Συνιστώ αυτό το εστιατόριο σε όλους.'],
    no_antonym: true
  },
  {
    word: 'συστήνω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/siˈstino/',
    emoji: '🤝',
    definitions: ['γνωρίζω κάποιον σε άλλον'],
    examples: ['Συστήνω τον νέο συνάδελφο στην ομάδα.'],
    no_antonym: true
  },
  {
    word: 'σχεδιάζω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/sxeðiˈazo/',
    emoji: '✏️',
    definitions: ['κάνω σχέδιο ή προγραμματίζω κάτι'],
    examples: ['Σχεδιάζω το ταξίδι μου για το καλοκαίρι.'],
    no_antonym: true
  },
  {
    word: 'ταξιδεύω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/taksiˈðevo/',
    emoji: '✈️',
    definitions: ['μεταβαίνω σε μακρινούς τόπους'],
    examples: ['Ταξιδεύω στην Ελλάδα κάθε καλοκαίρι.'],
    no_antonym: true
  },
  {
    word: 'τραβώ',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/traˈvo/',
    emoji: '🧲',
    definitions: ['ασκώ δύναμη για να φέρω κάτι κοντά'],
    examples: ['Τραβώ την καρέκλα κοντά στο τραπέζι.'],
    antonyms: ['σπρώχνω']
  },
  {
    word: 'φαίνομαι',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/ˈfenome/',
    emoji: '👀',
    definitions: ['δίνω την εντύπωση ότι είμαι κάτι'],
    examples: ['Φαίνεται πολύ χαρούμενος σήμερα.'],
    no_antonym: true
  },
  {
    word: 'φοράω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/foˈrao/',
    emoji: '👕',
    definitions: ['έχω πάνω μου ρούχα'],
    examples: ['Φοράω ζεστό παλτό το χειμώνα.'],
    no_antonym: true
  },
  {
    word: 'φτιάχνω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/ˈftiaxno/',
    emoji: '🛠️',
    definitions: ['κατασκευάζω ή ετοιμάζω κάτι'],
    examples: ['Φτιάχνω έναν ζεστό καφέ το πρωί.'],
    no_antonym: true
  },
  {
    word: 'χαλαρώνω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/xalaˈrono/',
    emoji: '🧘',
    definitions: ['διώχνω την ένταση και ηρεμώ'],
    examples: ['Χαλαρώνω στο σπίτι ακούγοντας μουσική.'],
    no_antonym: true
  },
  {
    word: 'χαμογελώ',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/xamojoˈlo/',
    emoji: '😊',
    definitions: ['σχηματίζω χαμόγελο στο πρόσωπο'],
    examples: ['Χαμογελάει όταν βλέπει τους φίλους του.'],
    no_antonym: true
  },
  {
    word: 'χάνω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/ˈxano/',
    emoji: '🔍',
    definitions: ['δεν έχω πια κάτι στην κατοχή μου'],
    examples: ['Έχασα τα κλειδιά μου στο πάρκο.'],
    antonyms: ['βρίσκω']
  },
  {
    word: 'χρεώνω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/xreˈono/',
    emoji: '💳',
    definitions: ['ζητώ πληρωμή για μια υπηρεσία'],
    examples: ['Το ξενοδοχείο χρεώνει τη διαμονή.'],
    no_antonym: true
  },
  {
    word: 'χρησιμοποιώ',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/xrisimopiˈo/',
    emoji: '🛠️',
    definitions: ['κάνω χρήση ενός αντικειμένου'],
    examples: ['Χρησιμοποιώ τον υπολογιστή στη δουλειά.'],
    no_antonym: true
  },
  {
    word: 'χρωστώ',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/xrosˈto/',
    emoji: '💸',
    definitions: ['οφείλω χρήματα σε κάποιον'],
    examples: ['Χρωστάω δέκα ευρώ στον φίλο μου.'],
    no_antonym: true
  },
  {
    word: 'χτίζω',
    theme: 'daily_verbs.json',
    form: 'verb',
    transcription: '/ˈxtizo/',
    emoji: '🏗️',
    definitions: ['κατασκευάζω ένα κτίριο'],
    examples: ['Χτίζουν ένα νέο σπίτι στη γειτονιά.'],
    no_antonym: true
  }
];

function runMigration() {
  console.log(`Starting migration of ${entriesToMigrate.length} qualifying Greek gap entries...`);

  // Collect ALL existing IDs across ALL Greek levels (a0_a1 and a2)
  const allExistingIds = new Set();
  const subdirs = fs.readdirSync(elDir).filter(d => fs.statSync(path.join(elDir, d)).isDirectory());
  subdirs.forEach(subdir => {
    const levelDir = path.join(elDir, subdir);
    const files = fs.readdirSync(levelDir).filter(f => f.endsWith('.json') && f !== 'index.json' && f !== 'flat-index.json');
    files.forEach(f => {
      const content = JSON.parse(fs.readFileSync(path.join(levelDir, f), 'utf8'));
      content.forEach(e => {
        if (e.id) allExistingIds.add(e.id);
      });
    });
  });

  console.log(`Total existing IDs across all Greek levels before migration: ${allExistingIds.size}`);

  const themeFilesMap = {};
  const a0a1Files = fs.readdirSync(targetA0A1Dir).filter(f => f.endsWith('.json') && f !== 'index.json' && f !== 'flat-index.json');
  a0a1Files.forEach(f => {
    themeFilesMap[f] = JSON.parse(fs.readFileSync(path.join(targetA0A1Dir, f), 'utf8'));
  });

  let addedCount = 0;

  entriesToMigrate.forEach(item => {
    const rawWord = item.word.trim();
    const slug = slugifyGreek(rawWord);
    const form = item.form;

    let id = `el:${slug}:${form}`;
    if (allExistingIds.has(id)) {
      let c = 1;
      while (allExistingIds.has(`el:${slug}-${c}:${form}`)) c++;
      id = `el:${slug}-${c}:${form}`;
    }
    allExistingIds.add(id);

    const themeFile = item.theme;
    const themeName = themeFile.replace('.json', '');

    const entry = {
      id: id,
      word: rawWord,
      language: 'el',
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

    // Noun fields
    if (form === 'noun') {
      entry.gender = item.gender;
      entry.article = item.article;
      entry.countability = item.countability;
      if (item.countability === 'countable' && item.plural_form) {
        entry.plural_form = item.plural_form;
      }
    }

    if (!themeFilesMap[themeFile]) {
      themeFilesMap[themeFile] = [];
    }

    themeFilesMap[themeFile].push(entry);
    addedCount++;
  });

  // Write updated JSON files
  for (const [f, content] of Object.entries(themeFilesMap)) {
    const filePath = path.join(targetA0A1Dir, f);
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf8');
  }

  console.log(`Successfully migrated ${addedCount} entries! Total Greek A0/A1 entries now: ${addedCount + 516}`);
}

runMigration();
