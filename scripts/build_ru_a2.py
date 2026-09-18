import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))

from data_a2 import part1_travel_shopping_health
from data_a2 import part2_emotions_routine_work
from data_a2 import part3_tech_weather_connectors
from data_a2 import part4_food_clothing_house
from data_a2 import part5_hobbies_nature_society
from data_a2 import part6_adjectives_quantifiers_expressions
from data_a2 import part7_verbs
from data_a2 import part8_places

out_dir = os.path.join(os.path.dirname(__file__), '..', 'vocabulary', 'ru', 'a2')
os.makedirs(out_dir, exist_ok=True)

files_data = {}
all_ids = set()

def add_entry(filename, entry):
    if filename not in files_data:
        files_data[filename] = []

    assert 'id' in entry, f"Missing id in {entry}"
    assert entry['id'] not in all_ids, f"Duplicate ID found: {entry['id']}"
    all_ids.add(entry['id'])

    assert 'word' in entry, f"Missing word in {entry}"
    assert 'form' in entry, f"Missing form in {entry}"
    assert 'transcription' in entry, f"Missing transcription in {entry}"
    assert 'definitions' in entry and len(entry['definitions']) >= 1, f"Missing definitions in {entry}"
    assert 'examples' in entry and len(entry['examples']) >= 1, f"Missing examples in {entry}"

    entry['language'] = 'ru'
    entry['level'] = 'A2'
    entry['levels'] = ['A2']
    if 'domain' not in entry:
        entry['domain'] = 'general'
    if 'updated' not in entry:
        entry['updated'] = '2025-01-01'

    # Check example lengths (must be 6 to 10 words for A2)
    for ex in entry['examples']:
        words = ex.strip().split()
        assert 6 <= len(words) <= 10, f"Example length for '{entry['word']}' ({len(words)} words) not between 6 and 10: '{ex}'"

    # Noun checks
    if entry['form'] == 'noun':
        assert 'gender' in entry and entry['gender'] in ['masculine', 'feminine', 'neuter'], f"Invalid/missing gender in noun {entry['word']}"
        assert 'countability' in entry and entry['countability'] in ['countable', 'uncountable', 'pluralia_tantum', 'invariable', 'false_plural'], f"Invalid/missing countability in noun {entry['word']}"
        if entry['countability'] == 'countable':
            assert 'plural_form' in entry, f"Missing plural_form for countable noun {entry['word']}"
        else:
            assert 'plural_form' not in entry, f"plural_form forbidden for non-countable noun {entry['word']}"
        assert 'article' not in entry, f"article key must be omitted for Russian noun {entry['word']}"
    else:
        for forbidden in ['gender', 'countability', 'plural_form', 'article', 'singular_workaround', 'collective_note']:
            assert forbidden not in entry, f"{forbidden} forbidden for non-noun {entry['word']}"

    files_data[filename].append(entry)

print("Registering A2 parts...")
part1_travel_shopping_health.register(add_entry)
part2_emotions_routine_work.register(add_entry)
part3_tech_weather_connectors.register(add_entry)
part4_food_clothing_house.register(add_entry)
part5_hobbies_nature_society.register(add_entry)
part6_adjectives_quantifiers_expressions.register(add_entry)
part7_verbs.register(add_entry)
part8_places.register(add_entry)

print(f"Total entries generated across {len(files_data)} files: {len(all_ids)}")

for filename, entries in files_data.items():
    filepath = os.path.join(out_dir, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(entries, f, ensure_ascii=False, indent=2)

print("Successfully wrote all A2 JSON files to:", out_dir)
