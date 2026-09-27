const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'vocabulary', 'el', 'a0_a1');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function writeTheme(filename, entries) {
  const filepath = path.join(outDir, filename);
  fs.writeFileSync(filepath, JSON.stringify(entries, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${entries.length} entries to ${filename}`);
  return entries.length;
}

const numTime = require('./greek_numbers_time.cjs');
const part1 = require('./greek_part1.cjs');
const part2 = require('./greek_part2.cjs');
const part3 = require('./greek_part3.cjs');
const part4 = require('./greek_part4.cjs');

let total = 0;

// Numbers & Time
total += writeTheme('numbers.json', numTime.numbers);
total += writeTheme('time.json', numTime.time);

// Part 1
total += writeTheme('colors.json', part1.colors);
total += writeTheme('family.json', part1.family);
total += writeTheme('expressions.json', part1.expressions);
total += writeTheme('pronouns.json', part1.pronouns);
total += writeTheme('auxiliary_verbs.json', part1.auxiliary_verbs);
total += writeTheme('feelings.json', part1.feelings);
total += writeTheme('general_adjectives.json', part1.general_adjectives);
total += writeTheme('weather.json', part1.weather);
total += writeTheme('geography.json', part1.geography);

// Part 2
total += writeTheme('jobs.json', part2.jobs);
total += writeTheme('school.json', part2.school);
total += writeTheme('prepositions.json', part2.prepositions);
total += writeTheme('adverbs_connectors.json', part2.adverbs_connectors);
total += writeTheme('nationalities.json', part2.nationalities);
total += writeTheme('common_nouns.json', part2.common_nouns);
total += writeTheme('clothes.json', part2.clothes);
total += writeTheme('house_furniture.json', part2.house_furniture);
total += writeTheme('body_health.json', part2.body_health);

// Part 3
total += writeTheme('food_drink.json', part3.food_drink);
total += writeTheme('animals.json', part3.animals);
total += writeTheme('adjectives.json', part3.adjectives);
total += writeTheme('places_transport.json', part3.places_transport);

// Part 4
total += writeTheme('daily_verbs.json', part4.daily_verbs);

console.log(`Total Greek entries generated across 25 files: ${total}`);
