#!/usr/bin/env python3
"""
Applies a returned dictionary review workbook (made by make_dictionary_review.py) to a COSYdata checkout.

  python scripts/review/apply_dictionary_review.py dictionary-review-fr.xlsx --data .           # dry run
  python scripts/review/apply_dictionary_review.py dictionary-review-fr.xlsx --data . --write

Verdicts:
  OK       nothing changes
  Fix      "Corrected definition" replaces definitions[0], "Corrected example" replaces examples[0]; "updated" is set to today
  Exclude  the entry is added to daily/<lang>/calendar/exclude.json for the slots it is shown in (it stays in the dictionary)
  Flag     reported with its comment so a person can edit the entry; nothing is changed

Safety: a row is skipped when the definition or example in the sheet no longer matches the dictionary (edited since the sheet
was made). A dictionary file is only written if it round-trips through JSON byte for byte, so no formatting noise is introduced.
After --write run `npm run build && npm run validate`: the build refreshes calendar cards and replaces any excluded pick.
"""
import argparse, datetime, json, os, sys
from openpyxl import load_workbook

LABEL_TO_SLOT = {'Word of the day': 'word', 'Verb of the day': 'verb', 'Verb + preposition': 'verb-prep',
                 'Phrasal verb': 'phrasal-verb', 'Idiom': 'idiom'}


def load_text(path):
    with open(path, encoding='utf-8') as f:
        return f.read()


def dump(data):
    return json.dumps(data, indent=2, ensure_ascii=False) + '\n'


def norm(s):
    return ' '.join(str(s or '').split())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('workbook')
    ap.add_argument('--data', required=True, help='COSYdata checkout')
    ap.add_argument('--write', action='store_true')
    a = ap.parse_args()
    today = datetime.date.today().isoformat()

    ws = load_workbook(a.workbook, data_only=True)['Review']
    col = {c.value: i for i, c in enumerate(ws[1])}
    for needed in ('ID', 'Shown as', 'Definition', 'Example', 'Verdict', 'Corrected definition', 'Corrected example', 'Comment'):
        if needed not in col:
            sys.exit(f'column "{needed}" not found: is this a dictionary review workbook?')

    indexes, files, raw = {}, {}, {}
    excludes = {}
    changed, stats, problems, flags = set(), {'ok': 0, 'fixed': 0, 'excluded': 0, 'flagged': 0, 'skipped': 0, 'open': 0}, [], []

    for row in ws.iter_rows(min_row=2, values_only=True):
        id_ = row[col['ID']]
        if not id_:
            continue
        verdict = str(row[col['Verdict']] or '').strip().capitalize()
        if not verdict:
            stats['open'] += 1
            continue
        lang = str(id_).split(':')[0]
        comment = str(row[col['Comment']] or '').strip()
        if verdict == 'Ok':
            stats['ok'] += 1
            continue
        if verdict == 'Flag':
            flags.append((id_, comment)); stats['flagged'] += 1
            continue
        if verdict not in ('Fix', 'Exclude'):
            problems.append(f'{id_}: unknown verdict "{row[col["Verdict"]]}", skipped'); stats['skipped'] += 1
            continue

        if lang not in indexes:
            indexes[lang] = json.loads(load_text(os.path.join(a.data, 'vocabulary', lang, 'index.json')))
        rel = indexes[lang].get(id_)
        if not rel:
            problems.append(f'{id_}: not in the dictionary index, skipped'); stats['skipped'] += 1
            continue
        path = os.path.join(a.data, 'vocabulary', lang, rel)
        if path not in files:
            raw[path] = load_text(path)
            files[path] = json.loads(raw[path])
        entry = next((e for e in files[path] if isinstance(e, dict) and e.get('id') == id_), None)
        if entry is None:
            problems.append(f'{id_}: not in {rel}, skipped'); stats['skipped'] += 1
            continue
        cur_def, cur_ex = (entry.get('definitions') or [''])[0], (entry.get('examples') or [''])[0]
        if norm(cur_def) != norm(row[col['Definition']]) or norm(cur_ex) != norm(row[col['Example']]):
            problems.append(f'{id_}: the entry changed since the sheet was made, skipped'); stats['skipped'] += 1
            continue

        if verdict == 'Fix':
            new_def, new_ex = norm(row[col['Corrected definition']]), norm(row[col['Corrected example']])
            did = False
            if new_def and new_def != norm(cur_def):
                print(f'  {id_} definition: {cur_def!r} -> {new_def!r}')
                entry['definitions'][0] = new_def; did = True
            if new_ex and new_ex != norm(cur_ex):
                print(f'  {id_} example: {cur_ex!r} -> {new_ex!r}')
                entry['examples'][0] = new_ex; did = True
            if not did:
                problems.append(f'{id_}: verdict Fix but no different correction typed, skipped'); stats['skipped'] += 1
                continue
            entry['updated'] = today
            changed.add(path); stats['fixed'] += 1
        else:  # Exclude
            path_ex = os.path.join(a.data, 'daily', lang, 'calendar', 'exclude.json')
            if path_ex not in excludes:
                excludes[path_ex] = json.loads(load_text(path_ex)) if os.path.exists(path_ex) else {}
            slots = [LABEL_TO_SLOT[s.strip()] for s in str(row[col['Shown as']]).split(',') if s.strip() in LABEL_TO_SLOT]
            for slot in slots:
                excludes[path_ex].setdefault(slot, {})[id_] = entry.get('word', id_)
            print(f'  {id_} excluded from: {", ".join(slots)}')
            stats['excluded'] += 1

    print(f"\nOK {stats['ok']} | fixed {stats['fixed']} | excluded {stats['excluded']} | flagged {stats['flagged']} | skipped {stats['skipped']} | not reviewed yet {stats['open']}")
    for p in problems:
        print('  !', p)
    if flags:
        print('\nFlagged for a person to edit (nothing was changed):')
        for id_, c in flags:
            print(f'  - {id_}: {c or "(no comment)"}')

    to_write = {}
    for path in sorted(changed):
        original = json.loads(raw[path])
        if dump(original) != raw[path]:
            print(f'  ! {os.path.relpath(path, a.data)} does not round-trip through JSON, so it is not written. Apply its changes by hand.')
            continue
        to_write[path] = dump(files[path])
    for path_ex, data in excludes.items():
        for slot in data:
            data[slot] = dict(sorted(data[slot].items()))
        to_write[path_ex] = dump(data)

    if a.write:
        for path, text in to_write.items():
            with open(path, 'w', encoding='utf-8') as f:
                f.write(text)
            print('written', os.path.relpath(path, a.data))
        print('\nNow run: npm run build && npm run validate')
    else:
        print('\nDry run: nothing written. Add --write to apply.')


if __name__ == '__main__':
    main()
