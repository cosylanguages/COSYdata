#!/usr/bin/env python3
"""
Applies a returned review workbook (made by make_review_sheets.py) to the COSY data files.

  python apply_review.py review-fr.xlsx --practice ../COSYpractice --data .          # dry run
  python apply_review.py review-fr.xlsx --practice ... --data ... --write            # apply

Verdicts (column "Verdict"):
  OK      nothing changes
  Fix     "Corrected text" replaces the prompt / idiom; for idioms "Corrected example" replaces the example sentence
  Remove  the entry is deleted

Safety: a row is skipped (and reported) when the "Text" in the sheet no longer matches the data file, i.e. the
entry was edited after the sheet was made, so newer work is never overwritten. Nothing is written without --write.
After writing, run `node scripts/validate-daily-prompts.js` in COSYpractice (it also checks that every core
language keeps a curated prompt for every level band).
"""
import argparse, json, os, sys
from openpyxl import load_workbook

KINDS = {  # id kind -> (repo key, relative path template, text field)
    'speaking': ('practice', 'data/daily/{lang}/speaking.json', 'prompt'),
    'writing': ('practice', 'data/daily/{lang}/writing.json', 'prompt'),
    'idiom': ('data', 'daily/{lang}/idioms.json', 'idiom'),
}


def load(path):
    with open(path, encoding='utf-8') as f:
        return json.load(f)


def save(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(json.dumps(data, indent=2, ensure_ascii=False) + '\n')


def norm(s):
    return ' '.join(str(s or '').split())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('workbook')
    ap.add_argument('--practice', required=True)
    ap.add_argument('--data', required=True)
    ap.add_argument('--write', action='store_true')
    a = ap.parse_args()
    roots = {'practice': a.practice, 'data': a.data}

    ws = load_workbook(a.workbook, data_only=True)['Review']
    head = [c.value for c in ws[1]]
    col = {h: i for i, h in enumerate(head)}
    for needed in ('ID', 'Text', 'Verdict', 'Corrected text', 'Corrected example'):
        if needed not in col:
            sys.exit(f'column "{needed}" not found: is this a review workbook?')

    files, changed_files = {}, set()
    stats = {'ok': 0, 'fixed': 0, 'removed': 0, 'skipped': 0, 'open': 0}
    problems = []

    for row in ws.iter_rows(min_row=2, values_only=True):
        id_ = row[col['ID']]
        if not id_:
            continue
        verdict = str(row[col['Verdict']] or '').strip().capitalize()
        if not verdict:
            stats['open'] += 1
            continue
        lang, kind, _ = (str(id_).split(':') + ['', '', ''])[:3]
        if kind not in KINDS:
            problems.append(f'{id_}: unknown kind'); stats['skipped'] += 1; continue
        repo, tmpl, field = KINDS[kind]
        path = os.path.join(roots[repo], tmpl.format(lang=lang))
        if path not in files:
            files[path] = load(path)
        entries = files[path]
        entry = next((e for e in entries if e.get('id') == id_), None)
        if entry is None:
            problems.append(f'{id_}: not in {path} (already removed?)'); stats['skipped'] += 1; continue
        if norm(entry.get(field)) != norm(row[col['Text']]):
            problems.append(f'{id_}: data changed since the sheet was made, skipped'); stats['skipped'] += 1; continue

        if verdict == 'Ok':
            stats['ok'] += 1
        elif verdict == 'Fix':
            new_text = norm(row[col['Corrected text']])
            new_ex = norm(row[col['Corrected example']]) if kind == 'idiom' else ''
            if not new_text and not new_ex:
                problems.append(f'{id_}: verdict Fix but no correction typed, skipped'); stats['skipped'] += 1; continue
            did_change = False
            if new_text and new_text != norm(entry[field]):
                print(f'  {id_} {field}: {entry[field]!r} -> {new_text!r}')
                entry[field] = new_text
                did_change = True
            if new_ex and new_ex != norm(entry.get('example')):
                print(f'  {id_} example: {entry.get("example")!r} -> {new_ex!r}')
                entry['example'] = new_ex
                did_change = True
            if did_change:
                changed_files.add(path); stats['fixed'] += 1
            else:
                problems.append(f'{id_}: verdict Fix but the correction equals the current text, nothing changed'); stats['skipped'] += 1
        elif verdict == 'Remove':
            print(f'  {id_} removed: {entry[field]!r}')
            entries.remove(entry)
            changed_files.add(path); stats['removed'] += 1
        else:
            problems.append(f'{id_}: unknown verdict "{row[col["Verdict"]]}", skipped'); stats['skipped'] += 1

    print(f"\nOK {stats['ok']} | fixed {stats['fixed']} | removed {stats['removed']} | skipped {stats['skipped']} | not reviewed yet {stats['open']}")
    for p in problems:
        print('  !', p)
    if a.write:
        for path in sorted(changed_files):
            save(path, files[path])
            print('written', path)
        print('Now run: node scripts/validate-daily-prompts.js  (in COSYpractice)')
    else:
        print('\nDry run: nothing written. Add --write to apply.')


if __name__ == '__main__':
    main()
