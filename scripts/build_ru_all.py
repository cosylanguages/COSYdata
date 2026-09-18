import json
import os
import sys

# Ensure scripts directory is in path
sys.path.insert(0, os.path.dirname(__file__))

from data import part1_numbers_time_colors
from data import part2_family_expressions_pronouns
from data import part3_verbs
from data import part4_adjectives
from data import part5_food_body_clothes
from data import part6_house_animals_nature
from data import part7_places_jobs_school
from data import part8_prepositions_adverbs_nationalities_common

out_dir = os.path.join(os.path.dirname(__file__), '..', 'vocabulary', 'ru', 'a0_a1')
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
    if 'level' not in entry:
        entry['level'] = 'A1'
    if 'levels' not in entry:
        entry['levels'] = [entry['level']]
    if 'domain' not in entry:
        entry['domain'] = 'general'
    if 'updated' not in entry:
        entry['updated'] = '2025-01-01'

    # Check example lengths (must be 5 to 8 words)
    for ex in entry['examples']:
        words = ex.strip().split()
        assert 5 <= len(words) <= 8, f"Example length for '{entry['word']}' ({len(words)} words) not between 5 and 8: '{ex}'"

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

print("Registering parts...")
part1_numbers_time_colors.register(add_entry)
part2_family_expressions_pronouns.register(add_entry)
part3_verbs.register(add_entry)
part4_adjectives.register(add_entry)
part5_food_body_clothes.register(add_entry)
part6_house_animals_nature.register(add_entry)
part7_places_jobs_school.register(add_entry)
part8_prepositions_adverbs_nationalities_common.register(add_entry)

print(f"Total entries generated across {len(files_data)} files: {len(all_ids)}")

for filename, entries in files_data.items():
    filepath = os.path.join(out_dir, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(entries, f, ensure_ascii=False, indent=2)

print("Successfully wrote all JSON files to:", out_dir)
