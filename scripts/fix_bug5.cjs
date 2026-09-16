const fs = require('fs');
const path = require('path');

const targets = [
  { file: path.join(__dirname, '..', 'vocabulary', 'en', 'b2', 'academic_vocabulary.json'), id: 'en:phenomena:noun' },
  { file: path.join(__dirname, '..', 'vocabulary', 'en', 'b2', 'education.json'), id: 'en:criteria:noun' }
];

for (const target of targets) {
  const data = JSON.parse(fs.readFileSync(target.file, 'utf8'));
  for (const entry of data) {
    if (entry.id === target.id) {
      delete entry.singular_workaround;
      console.log(`Removed singular_workaround from ${target.id} in ${target.file}`);
    }
  }
  fs.writeFileSync(target.file, JSON.stringify(data, null, 2) + '\n', 'utf8');
}
