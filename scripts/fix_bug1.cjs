const fs = require('fs');
const path = require('path');

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const cefrOrder = { A0: 0, A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 };

// Curated mapping of truncated phrase IDs to their full canonical phrases
const ID_TO_PHRASE = {
  // classroom_phrases.json
  "en:hand:phrase": "raise your hand",
  "en:good:phrase": "good job",
  "en:see:phrase": "see you",
  "en:meet:phrase": "nice to meet you",
  "en:raise:phrase": "raise your hand",
  "en:sit:phrase": "sit down",
  "en:course:phrase": "of course",
  "en:no:phrase": "no problem",
  "en:look:phrase": "look at",
  "en:stand:phrase": "stand up",
  "en:as:phrase": "as well",
  "en:here:phrase": "right here",
  "en:there:phrase": "over there",
  "en:agree:phrase": "agree with",
  "en:disagree:phrase": "disagree with",
  "en:example:phrase": "for example",
  "en:luck:phrase": "good luck",
  "en:quiet:phrase": "be quiet",
  "en:listen:phrase": "listen to",
  "en:repeat:phrase": "repeat after me",
  "en:be:phrase": "be quiet",
  "en:later:phrase": "see you later",
  "en:care:phrase": "take care of",
  "en:birthday:phrase": "happy birthday",
  "en:congratulations:phrase": "congratulations on",
  "en:welcome:phrase": "you are welcome",

  // expressions.json (a0_a1)
  "en:morning:phrase": "good morning",
  "en:afternoon:phrase": "good afternoon",
  "en:evening:phrase": "good evening",
  "en:night:phrase": "good night",

  // expressions.json (a2)
  "en:arrangement:phrase": "make an arrangement",
  "en:agenda:phrase": "meeting agenda",
  "en:resolution:phrase": "New Year's resolution",

  // b1 idioms
  "en:ice:phrase": "melt the ice",
  "en:hang:phrase": "get the hang of (something)",
  "en:try:phrase": "give (something) a try",
  "en:eye:phrase": "keep an eye on (someone/something)",
  "en:make:phrase": "make up one's mind",
  "en:mind:phrase": "change one's mind",
  "en:piece:phrase": "a piece of cake",
  "en:cake:phrase": "a piece of cake",
  "en:weather:phrase": "under the weather",
  "en:waste:phrase": "waste time",
  "en:time:phrase": "time flies",
  "en:long:phrase": "in the long run",
  "en:last:phrase": "last but not least",
  "en:not:phrase": "not in the least",
  "en:least:phrase": "not in the least",
  "en:second:phrase": "on second thought",
  "en:thought:phrase": "on second thought",
  "en:out:phrase": "out of the blue",
  "en:blue:phrase": "out of the blue",
  "en:easy:phrase": "easier said than done",
  "en:flies:phrase": "time flies",

  // b1 register
  "en:if:phrase": "I was wondering",
  "en:sum:phrase": "to sum up",
  "en:kind:phrase": "be so kind as to",
  "en:apologise:phrase": "sincerely apologise for",
  "en:could:phrase": "could you please",
  "en:was:phrase": "I was wondering",
  "en:wondering:phrase": "I was wondering",
  "en:words:phrase": "in other words",
  "en:simply:phrase": "to put it simply",
  "en:gonna:phrase": "going to",
  "en:wanna:phrase": "want to",

  // b2 collocations
  "en:take:phrase": "take into account",
  "en:double-edged:phrase": "double-edged sword",
  "en:sword:phrase": "double-edged sword",
  "en:come:phrase": "come to a conclusion",
  "en:draw:phrase": "draw a conclusion",
  "en:play:phrase": "play a role",
  "en:account:phrase": "take into account",
  "en:role:phrase": "play a role",
  "en:wake:phrase": "in the wake of",
  "en:awareness:phrase": "raise awareness",
  "en:difference:phrase": "make a difference",
  "en:all:phrase": "all things considered",
  "en:conclusion:phrase": "draw a conclusion",
  "en:due:phrase": "due to",
  "en:certain:phrase": "to a certain extent",
  "en:bear:phrase": "bear in mind",
  "en:vested:phrase": "vested interest",
  "en:interest:phrase": "vested interest",
  "en:balance:phrase": "strike a balance",
  "en:advantage:phrase": "take advantage of",
  "en:large:phrase": "by and large",
  "en:terms:phrase": "in terms of",
  "en:extent:phrase": "to a large extent",
  "en:strike:phrase": "strike a balance",
  "en:verge:phrase": "on the verge of",
  "en:odds:phrase": "at odds with",
  "en:retrospect:phrase": "in retrospect",
  "en:resort:phrase": "last resort",
  "en:loophole:phrase": "legal loophole",
  "en:concession:phrase": "make a concession",
  "en:ultimatum:phrase": "issue an ultimatum",
  "en:standoff:phrase": "reach a standoff",
  "en:stalemate:phrase": "reach a stalemate",
  "en:deadlock:phrase": "break a deadlock",

  // b2 idioms
  "en:get:phrase": "get the ball rolling",
  "en:blessing:phrase": "a blessing in disguise",
  "en:disguise:phrase": "a blessing in disguise",
  "en:bite:phrase": "bite the bullet",
  "en:bullet:phrase": "bite the bullet",
  "en:cut:phrase": "cut corners",
  "en:corners:phrase": "cut corners",
  "en:ball:phrase": "get the ball rolling",
  "en:rolling:phrase": "get the ball rolling",
  "en:hit:phrase": "hit the nail on the head",
  "en:nail:phrase": "hit the nail on the head",
  "en:head:phrase": "hit the nail on the head",
  "en:jump:phrase": "jump on the bandwagon",
  "en:bandwagon:phrase": "jump on the bandwagon",
  "en:learn:phrase": "learn the ropes",
  "en:ropes:phrase": "learn the ropes",
  "en:once:phrase": "once in a blue moon",
  "en:moon:phrase": "once in a blue moon",
  "en:speak:phrase": "speak of the devil",
  "en:tip:phrase": "tip of the iceberg",
  "en:iceberg:phrase": "tip of the iceberg",
  "en:outside:phrase": "think outside the box",
  "en:box:phrase": "think outside the box",
  "en:throw:phrase": "throw in the towel",
  "en:towel:phrase": "throw in the towel",
  "en:turn:phrase": "turn a blind eye",
  "en:blind:phrase": "turn a blind eye",
  "en:weigh:phrase": "weigh the pros and cons",
  "en:pros:phrase": "weigh the pros and cons",
  "en:cons:phrase": "weigh the pros and cons",

  // b2 lifestyle
  "en:autopilot:phrase": "on autopilot",

  // b2 linking_words
  "en:light:phrase": "in light of",
  "en:contrast:phrase": "by contrast",
  "en:provided:phrase": "provided that",
  "en:regard:phrase": "with regard to",
  "en:insofar:phrase": "insofar as",
  "en:being:phrase": "that being said",
  "en:said:phrase": "that being said",
  "en:things:phrase": "all things considered",
  "en:considered:phrase": "all things considered",

  // b2 register
  "en:regarding:phrase": "with regard to",
  "en:concerning:phrase": "concerning the matter",

  // c1 collocations
  "en:give:phrase": "give priority to",
  "en:run:phrase": "run a risk",
  "en:call:phrase": "call into question",
  "en:face:phrase": "face fierce competition",
  "en:short:phrase": "fall short of",
  "en:set:phrase": "set a precedent",
  "en:hold:phrase": "hold accountable",
  "en:influence:phrase": "exert influence",
  "en:fall:phrase": "fall into hardship",
  "en:rise:phrase": "rise to the occasion",
  "en:sway:phrase": "sway public opinion",
  "en:root:phrase": "root cause",
  "en:matter:phrase": "matter of priority",
  "en:lend:phrase": "lend credibility to",
  "en:stage:phrase": "critical stage",
  "en:question:phrase": "question of debate",
  "en:foregone:phrase": "foregone conclusion",
  "en:contention:phrase": "bone of contention",
  "en:slippery:phrase": "slippery slope",
  "en:slope:phrase": "slippery slope",
  "en:uphill:phrase": "uphill battle",
  "en:battle:phrase": "uphill battle",
  "en:crux:phrase": "crux of the matter",
  "en:parallels:phrase": "draw parallels",
  "en:exert:phrase": "exert pressure",
  "en:expectations:phrase": "exceed expectations",
  "en:gain:phrase": "gain traction",
  "en:traction:phrase": "gain traction",
  "en:adversity:phrase": "in the face of adversity",
  "en:credence:phrase": "give credence to",
  "en:level:phrase": "level the playing field",
  "en:playing:phrase": "level the playing field",
  "en:field:phrase": "level the playing field",
  "en:pave:phrase": "pave the way",
  "en:way:phrase": "pave the way",
  "en:counter:phrase": "counter the impact",
  "en:chord:phrase": "strike a chord",

  // c1 idioms
  "en:add:phrase": "add fuel to the fire",
  "en:fuel:phrase": "add fuel to the fire",
  "en:fire:phrase": "add fuel to the fire",
  "en:bark:phrase": "bark up the wrong tree",
  "en:wrong:phrase": "bark up the wrong tree",
  "en:tree:phrase": "bark up the wrong tree",
  "en:beat:phrase": "beat around the bush",
  "en:around:phrase": "beat around the bush",
  "en:bush:phrase": "beat around the bush",
  "en:burn:phrase": "burn bridges",
  "en:bridges:phrase": "burn bridges",
  "en:day:phrase": "call it a day",
  "en:cast:phrase": "cast doubt on",
  "en:doubt:phrase": "cast doubt on",
  "en:cross:phrase": "cross that bridge when you come to it",
  "en:bridge:phrase": "cross that bridge when you come to it",
  "en:blank:phrase": "carte blanche",
  "en:music:phrase": "face the music",
  "en:end:phrase": "short end of the stick",
  "en:stick:phrase": "short end of the stick",
  "en:go:phrase": "go the extra mile",
  "en:extra:phrase": "go the extra mile",
  "en:mile:phrase": "go the extra mile",
  "en:have:phrase": "have the upper hand",
  "en:upper:phrase": "have the upper hand",
  "en:lose:phrase": "lose sight of",
  "en:sight:phrase": "lose sight of",
  "en:ends:phrase": "make ends meet",
  "en:move:phrase": "move the goalposts",
  "en:goalposts:phrase": "move the goalposts",
  "en:navigate:phrase": "navigate a minefield",
  "en:minefield:phrase": "navigate a minefield",
  "en:open:phrase": "open a can of worms",
  "en:worms:phrase": "open a can of worms",
  "en:push:phrase": "push the envelope",
  "en:envelope:phrase": "push the envelope",
  "en:bar:phrase": "raise the bar",
  "en:read:phrase": "read between the lines",
  "en:lines:phrase": "read between the lines",
  "en:precedent:phrase": "set a precedent",
  "en:fence:phrase": "sit on the fence",
  "en:steal:phrase": "steal someone's thunder",
  "en:someone-s:phrase": "steal someone's thunder",
  "en:thunder:phrase": "steal someone's thunder",
  "en:scales:phrase": "tip the scales",
  "en:walk:phrase": "walk a fine line",
  "en:line:phrase": "walk a fine line",

  // c1 linking_words
  "en:same:phrase": "by the same token",
  "en:principle:phrase": "in principle",
  "en:token:phrase": "by the same token",
  "en:vein:phrase": "in a similar vein",
  "en:contrary:phrase": "contrary to popular belief",
  "en:extension:phrase": "by extension",
  "en:follows:phrase": "it follows that",
  "en:corollary:phrase": "natural corollary",
  "en:essence:phrase": "in essence",

  // c2 idioms
  "en:keep:phrase": "earn one's keep",
  "en:leopard:phrase": "a leopard cannot change its spots",
  "en:cannot:phrase": "a leopard cannot change its spots",
  "en:change:phrase": "a leopard cannot change its spots",
  "en:spots:phrase": "a leopard cannot change its spots",
  "en:wolf:phrase": "a wolf in sheep's clothing",
  "en:sheep-s:phrase": "a wolf in sheep's clothing",
  "en:clothing:phrase": "a wolf in sheep's clothing",
  "en:bury:phrase": "bury the hatchet",
  "en:hatchet:phrase": "bury the hatchet",
  "en:first:phrase": "cast the first stone",
  "en:stone:phrase": "cast the first stone",
  "en:full:phrase": "come full circle",
  "en:circle:phrase": "come full circle",
  "en:rubicon:phrase": "cross the Rubicon",
  "en:cloth:phrase": "cut one's coat according to one's cloth",
  "en:every:phrase": "every cloud has a silver lining",
  "en:cloud:phrase": "every cloud has a silver lining",
  "en:has:phrase": "every cloud has a silver lining",
  "en:silver:phrase": "every cloud has a silver lining",
  "en:lining:phrase": "every cloud has a silver lining",
  "en:fan:phrase": "fan the flames",
  "en:flames:phrase": "fan the flames",
  "en:fight:phrase": "fight fire with fire",
  "en:fit:phrase": "fit for purpose",
  "en:purpose:phrase": "fit for purpose",
  "en:grasp:phrase": "grasp the nettle",
  "en:nettle:phrase": "grasp the nettle",
  "en:thread:phrase": "hang by a thread",
  "en:water:phrase": "hold water",
  "en:bay:phrase": "keep at bay",
  "en:let:phrase": "let sleeping dogs lie",
  "en:sleeping:phrase": "let sleeping dogs lie",
  "en:dogs:phrase": "let sleeping dogs lie",
  "en:lie:phrase": "let sleeping dogs lie",
  "en:muddy:phrase": "muddy the waters",
  "en:waters:phrase": "muddy the waters",
  "en:one-s:phrase": "of one's own accord",
  "en:own:phrase": "of one's own accord",
  "en:accord:phrase": "of one's own accord",
  "en:par:phrase": "on a par with",
  "en:devil-s:phrase": "play devil's advocate",
  "en:advocate:phrase": "play devil's advocate",
  "en:poetic:phrase": "poetic justice",
  "en:justice:phrase": "poetic justice",
  "en:rest:phrase": "rest on one's laurels",
  "en:laurels:phrase": "rest on one's laurels",
  "en:rub:phrase": "rub salt in the wound",
  "en:salt:phrase": "rub salt in the wound",
  "en:wound:phrase": "rub salt in the wound",
  "en:show:phrase": "show one's true colors",
  "en:true:phrase": "show one's true colors",
  "en:colours:phrase": "show one's true colors",
  "en:skate:phrase": "skate on thin ice",
  "en:thin:phrase": "skate on thin ice",
  "en:spare:phrase": "spare no expense",
  "en:expense:phrase": "spare no expense",
  "en:splitting:phrase": "splitting hairs",
  "en:hairs:phrase": "splitting hairs",
  "en:elephant:phrase": "the elephant in the room",
  "en:room:phrase": "the elephant in the room",
  "en:writing:phrase": "the writing on the wall",
  "en:wall:phrase": "the writing on the wall",
  "en:gauntlet:phrase": "throw down the gauntlet",

  // c2 linking_words
  "en:evidence:phrase": "in light of evidence",
  "en:analysis:phrase": "upon closer analysis",
  "en:fact:phrase": "in point of fact",
  "en:contend:phrase": "scholars contend that",
  "en:one:phrase": "for one thing",
  "en:final:phrase": "as a final point",
  "en:intents:phrase": "for all intents and purposes",
  "en:purposes:phrase": "for practical purposes",
  "en:ipso:phrase": "ipso facto",
  "en:fortiori:phrase": "a fortiori",
  "en:argued:phrase": "it can be argued that",
  "en:might:phrase": "it might be noted that"
};

function getJsonFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(getJsonFiles(fullPath));
    } else if (item.endsWith('.json') && item !== 'index.json') {
      results.push(fullPath);
    }
  }
  return results;
}

function processFiles() {
  const vocabDir = path.join(__dirname, '..', 'vocabulary', 'en');
  const files = getJsonFiles(vocabDir);
  let totalFixed = 0;

  const fileContentMap = {};

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    const newEntries = [];
    const mapByNewId = new Map();

    for (const entry of data) {
      if (entry.form === 'phrase' && ID_TO_PHRASE[entry.id]) {
        const fullPhrase = ID_TO_PHRASE[entry.id];
        const newSlug = slugify(fullPhrase);
        const newId = `en:${newSlug}:phrase`;

        entry.word = fullPhrase;
        entry.id = newId;
        totalFixed++;

        if (mapByNewId.has(newId)) {
          const existing = mapByNewId.get(newId);
          entry.definitions.forEach((d) => {
            if (!existing.definitions.includes(d)) existing.definitions.push(d);
          });
          entry.examples.forEach((e) => {
            if (!existing.examples.includes(e)) existing.examples.push(e);
          });
          if (entry.synonyms) {
            existing.synonyms = Array.from(new Set([...(existing.synonyms || []), ...entry.synonyms]));
          }
          if (entry.tags) {
            existing.tags = Array.from(new Set([...(existing.tags || []), ...entry.tags]));
          }
        } else {
          mapByNewId.set(newId, entry);
          newEntries.push(entry);
        }
      } else {
        if (mapByNewId.has(entry.id)) {
          const existing = mapByNewId.get(entry.id);
          if (Array.isArray(entry.definitions)) {
            entry.definitions.forEach((d) => {
              if (!existing.definitions.includes(d)) existing.definitions.push(d);
            });
          }
        } else {
          mapByNewId.set(entry.id, entry);
          newEntries.push(entry);
        }
      }
    }

    fileContentMap[file] = newEntries;
  }

  // Cross-file duplicate ID resolution
  const globalIdMap = {};
  for (const [file, entries] of Object.entries(fileContentMap)) {
    for (const entry of entries) {
      if (!globalIdMap[entry.id]) globalIdMap[entry.id] = [];
      globalIdMap[entry.id].push({ file, entry });
    }
  }

  const duplicates = Object.entries(globalIdMap).filter(([_, list]) => list.length > 1);

  for (const [id, list] of duplicates) {
    const allLevelsSet = new Set();
    list.forEach((item) => {
      if (item.entry.level) allLevelsSet.add(item.entry.level);
      if (Array.isArray(item.entry.levels)) {
        item.entry.levels.forEach((l) => allLevelsSet.add(l));
      }
    });

    const sortedLevels = Array.from(allLevelsSet).sort((a, b) => cefrOrder[a] - cefrOrder[b]);
    const minLevel = sortedLevels[0];

    let targetItem = list.find((item) => item.entry.level === minLevel);
    if (!targetItem) targetItem = list[0];

    const targetFile = targetItem.file;
    const canonicalEntry = { ...targetItem.entry };
    canonicalEntry.level = minLevel;
    canonicalEntry.levels = sortedLevels;

    ['definitions', 'examples', 'synonyms', 'antonyms', 'collocations', 'tags'].forEach((field) => {
      const mergedSet = new Set();
      list.forEach((item) => {
        if (Array.isArray(item.entry[field])) {
          item.entry[field].forEach((val) => mergedSet.add(val));
        }
      });
      if (mergedSet.size > 0) {
        canonicalEntry[field] = Array.from(mergedSet);
      }
    });

    const affectedFiles = Array.from(new Set(list.map((item) => item.file)));
    affectedFiles.forEach((file) => {
      fileContentMap[file] = fileContentMap[file].filter((e) => e.id !== id);
    });

    fileContentMap[targetFile].push(canonicalEntry);
  }

  for (const [file, entries] of Object.entries(fileContentMap)) {
    fs.writeFileSync(file, JSON.stringify(entries, null, 2) + '\n', 'utf8');
  }

  console.log(`Successfully fixed ${totalFixed} truncated phrase entries.`);
  console.log(`Merged ${duplicates.length} cross-file duplicate IDs.`);
}

processFiles();
