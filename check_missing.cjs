const fs = require("fs");
const path = require("path");

const rawList = [
  "hello", "hi", "goodbye", "bye", "good morning", "good afternoon", "good evening", "good night", "please", "thank you", "thanks", "you're welcome", "sorry", "excuse me", "yes", "no", "OK", "maybe", "welcome", "how are you", "fine", "nice to meet you", "see you", "see you later", "take care", "congratulations", "happy birthday", "cheers", "good luck", "no problem",
  "I", "you", "he", "she", "it", "we", "they", "me", "him", "her", "us", "them", "my", "your", "his", "her", "its", "our", "their", "mine", "yours", "ours", "theirs", "this", "that", "these", "those", "who", "what", "which", "someone", "something", "nothing", "everyone", "everybody", "nobody",
  "what", "who", "where", "when", "why", "how", "which", "whose", "how much", "how many", "how old", "how far", "how long",
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety", "hundred", "thousand", "million", "first", "second", "third", "fourth", "fifth", "last", "next", "half", "pair", "dozen",
  "red", "blue", "green", "yellow", "black", "white", "orange", "pink", "purple", "brown", "grey/gray", "gold", "silver", "light", "dark",
  "time", "clock", "watch", "hour", "minute", "second", "today", "tomorrow", "yesterday", "morning", "afternoon", "evening", "night", "day", "week", "weekend", "month", "year", "now", "later", "early", "late", "soon", "before", "after", "always", "never", "sometimes", "often", "usually", "o'clock", "half past", "quarter", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "spring", "summer", "autumn/fall", "winter", "birthday", "holiday", "weekday",
  "family", "mother", "mom/mum", "father", "dad", "parent", "son", "daughter", "brother", "sister", "baby", "child", "children", "kid", "husband", "wife", "grandmother", "grandma", "grandfather", "grandpa", "grandparent", "aunt", "uncle", "cousin", "niece", "nephew", "friend", "boy", "girl", "man", "men", "woman", "women", "people", "person", "name", "age", "boyfriend", "girlfriend", "neighbor", "teenager", "adult",
  "head", "face", "eye", "eyes", "ear", "nose", "mouth", "teeth", "tooth", "hair", "neck", "shoulder", "arm", "hand", "finger", "leg", "foot", "feet", "knee", "back", "stomach", "heart", "body", "tall", "short", "fat", "thin", "ill", "sick", "healthy", "hurt", "pain", "doctor", "nurse", "hospital", "medicine", "cold", "cough", "headache", "tired",
  "clothes", "shirt", "T-shirt", "trousers/pants", "jeans", "dress", "skirt", "jacket", "coat", "sweater", "shoes", "boots", "socks", "hat", "cap", "gloves", "scarf", "belt", "bag", "glasses", "watch", "ring", "wear", "put on", "take off", "size", "new", "old", "clean", "dirty",
  "food", "breakfast", "lunch", "dinner", "meal", "eat", "drink", "water", "milk", "juice", "tea", "coffee", "coke", "bread", "butter", "cheese", "egg", "meat", "chicken", "fish", "rice", "pasta", "soup", "salad", "sandwich", "pizza", "hamburger", "chips/fries", "apple", "banana", "orange", "lemon", "grape", "strawberry", "potato", "tomato", "onion", "carrot", "sugar", "salt", "pepper", "oil", "cake", "chocolate", "ice cream", "cookie", "biscuit", "hungry", "thirsty", "delicious", "sweet", "sour", "spicy", "fresh", "restaurant", "menu", "waiter", "bill", "cook", "kitchen", "plate", "cup", "glass", "bottle", "spoon", "fork", "knife", "bowl",
  "animal", "dog", "cat", "bird", "fish", "horse", "cow", "pig", "sheep", "chicken", "duck", "rabbit", "mouse", "elephant", "lion", "tiger", "bear", "monkey", "snake", "spider", "insect", "fly", "bee", "butterfly", "frog",
  "house", "home", "flat/apartment", "room", "bedroom", "bathroom", "kitchen", "living room", "garden", "door", "window", "wall", "floor", "roof", "stairs", "bed", "table", "chair", "sofa/couch", "desk", "lamp", "mirror", "shelf", "cupboard", "wardrobe", "TV", "fridge", "oven", "key", "address", "street", "city", "town", "village", "country",
  "weather", "sun", "sunny", "rain", "rainy", "snow", "snowy", "wind", "windy", "cloud", "cloudy", "storm", "hot", "cold", "warm", "cool", "sky", "star", "moon", "tree", "flower", "grass", "mountain", "sea", "beach", "river", "lake", "forest", "park", "world", "earth", "school", "university", "shop", "store", "supermarket", "market", "bank", "post office", "hospital", "hotel", "airport", "station", "bus stop", "church", "museum", "library", "cinema", "theatre", "office", "factory", "farm", "road", "street", "bridge", "corner", "car", "bus", "train", "plane", "airplane", "taxi", "bicycle/bike", "motorbike", "boat", "ship", "ticket", "journey", "trip", "travel", "drive", "fly", "walk", "run",
  "school", "class", "classroom", "teacher", "student", "pupil", "lesson", "homework", "book", "pen", "pencil", "paper", "notebook", "bag", "desk", "board", "question", "answer", "test", "exam", "subject", "English", "math/maths", "science", "history", "work", "job", "worker", "boss", "company", "meeting", "computer", "phone", "mobile phone", "email", "internet", "website", "message",
  "teacher", "doctor", "nurse", "dentist", "police officer", "firefighter", "waiter", "waitress", "cook", "chef", "driver", "pilot", "engineer", "farmer", "worker", "manager", "singer", "actor", "actress", "artist", "writer", "student", "businessman", "businesswoman", "shop assistant", "hairdresser",
  "money", "price", "cost", "cheap", "expensive", "buy", "sell", "pay", "shop", "shopping", "shopping center/mall", "gift", "present", "coin", "note/bill", "card", "wallet", "receipt", "discount", "sale",
  "sport", "football/soccer", "basketball", "tennis", "swimming", "running", "game", "play", "ball", "team", "win", "lose", "music", "song", "sing", "dance", "movie/film", "watch", "listen", "read", "write", "draw", "paint", "photo", "picture", "camera", "party", "holiday", "vacation", "hobby", "game console", "happy", "sad", "angry", "afraid", "scared", "surprised", "tired", "bored", "excited", "nervous", "worried", "in love", "funny", "interesting", "boring", "good", "bad", "great", "wonderful", "terrible", "beautiful", "pretty", "handsome", "ugly", "big", "small", "little", "long", "short", "high", "low", "wide", "narrow", "heavy", "light", "easy", "difficult/hard", "right", "wrong", "correct", "true", "false", "same", "different", "important", "dangerous", "safe", "strong", "weak", "quiet", "noisy", "loud", "rich", "poor", "kind", "nice", "friendly", "polite", "rude", "lazy", "busy", "free", "ready", "sure",
  "be", "have", "do", "go", "come", "get", "make", "take", "give", "see", "look", "watch", "hear", "listen", "say", "tell", "speak", "talk", "ask", "answer", "know", "think", "understand", "remember", "forget", "want", "need", "like", "love", "hate", "hope", "feel", "believe", "live", "stay", "work", "study", "learn", "teach", "play", "run", "walk", "jump", "swim", "fly", "drive", "ride", "sit", "stand", "sleep", "wake up", "get up", "wash", "clean", "cook", "eat", "drink", "buy", "sell", "pay", "open", "close", "start", "begin", "finish", "stop", "wait", "help", "use", "put", "carry", "bring", "send", "receive", "meet", "visit", "call", "phone", "write", "read", "draw", "sing", "dance", "laugh", "cry", "smile", "love", "marry", "born", "die", "grow", "change", "try", "find", "lose", "keep", "leave", "arrive", "return", "turn", "push", "pull", "hold", "cut", "break", "fix", "build", "fall", "follow", "show", "choose", "decide", "plan", "agree", "disagree", "enjoy", "relax", "travel", "cost", "wear", "fit", "borrow", "lend", "share", "invite", "thank", "apologize", "worry", "care", "kiss", "hug",
  "new", "old", "young", "big", "small", "good", "bad", "hot", "cold", "fast", "slow", "near", "far", "full", "empty", "open", "closed", "wet", "dry", "first", "last", "alone", "together", "different", "similar", "real", "fake", "main", "other", "another", "own", "same", "next", "previous", "whole", "extra", "favorite", "special", "normal", "usual", "modern", "traditional",
  "in", "on", "at", "to", "from", "of", "with", "without", "for", "by", "about", "under", "over", "above", "below", "between", "next to", "near", "behind", "in front of", "inside", "outside", "up", "down", "into", "out of", "through", "across", "along", "and", "or", "but", "because", "so", "if", "then", "also", "too", "very", "really", "only", "just", "again", "still", "already", "yet",
  "phone", "mobile", "computer", "laptop", "tablet", "TV", "radio", "camera", "clock", "watch", "umbrella", "bag", "box", "bottle", "key", "lock", "light", "candle", "letter", "newspaper", "magazine", "map", "ticket", "wallet", "purse", "glasses", "battery", "charger",
  "country", "world", "England", "America", "the USA", "Canada", "France", "Germany", "Italy", "Spain", "China", "Japan", "Russia", "Brazil", "India", "English", "American", "French", "German", "Italian", "Spanish", "Chinese", "Japanese", "language"
];

// Load all existing entries across ALL level dirs or just a0_a1
const dirs = fs.readdirSync("vocabulary/en").filter(d => fs.statSync(path.join("vocabulary/en", d)).isDirectory());
const allExistingWords = new Map();
const a0a1Words = new Map();

for (const d of dirs) {
  const dirPath = path.join("vocabulary/en", d);
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith(".json"));
  for (const file of files) {
    const content = JSON.parse(fs.readFileSync(path.join(dirPath, file), "utf8"));
    for (const item of content) {
      const w = item.word.toLowerCase();
      if (!allExistingWords.has(w)) allExistingWords.set(w, []);
      allExistingWords.get(w).push({ dir: d, file, item });
      if (d === "a0_a1") {
        if (!a0a1Words.has(w)) a0a1Words.set(w, []);
        a0a1Words.get(w).push({ file, item });
      }
    }
  }
}

const termsToTest = new Set();
for (const item of rawList) {
  if (item.includes("/")) {
    item.split("/").forEach(s => termsToTest.add(s.trim()));
    termsToTest.add(item.trim());
  } else {
    termsToTest.add(item.trim());
  }
}

const missingInA0A1 = [];
for (const term of termsToTest) {
  const lower = term.toLowerCase();
  if (!a0a1Words.has(lower)) {
    const existsElsewhere = allExistingWords.get(lower);
    missingInA0A1.push({
      term,
      existsElsewhere: existsElsewhere ? existsElsewhere.map(e => `${e.dir}/${e.file}`) : false
    });
  }
}

console.log("Missing in A0_A1 count:", missingInA0A1.length);
console.log(JSON.stringify(missingInA0A1, null, 2));
