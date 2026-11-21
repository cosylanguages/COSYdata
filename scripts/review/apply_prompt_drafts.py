#!/usr/bin/env python3
"""
Adds approved prompts from returned draft / translation sheets to COSYpractice data/daily/<lang>/{speaking,writing}.json.

  python scripts/review/apply_prompt_drafts.py prompt-drafts-fr.xlsx prompt-translate-ka.xlsx --practice ../COSYpractice          # dry run
  python scripts/review/apply_prompt_drafts.py prompt-drafts-fr.xlsx --practice ../COSYpractice --write

  prompt-drafts-<lang>.xlsx      Verdict OK adds the draft as it is, Fix adds "Corrected prompt", Remove / empty adds nothing
  prompt-translate-<lang>.xlsx   every row with a Translation is added

New entries are flagged "curated": true with their level band, so the daily strip and the Daily Challenge prefer them for that band.
A prompt that already exists in the file is never added twice, so re-running a sheet is safe. Afterwards run
`node scripts/validate-daily-prompts.js` in COSYpractice.
"""
import argparse, json, os, re, sys
from openpyxl import load_workbook


def norm(s):
    return ' '.join(str(s or '').split())


def dump(data):
    return json.dumps(data, indent=2, ensure_ascii=False) + '\n'


def next_id(entries, lang, cat):
    used = {e.get('id') for e in entries}
    n = 1
    while f'{lang}:{cat}:d{n}' in used:
        n += 1
    return f'{lang}:{cat}:d{n}'


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('workbooks', nargs='+')
    ap.add_argument('--practice', required=True, help='COSYpractice checkout')
    ap.add_argument('--write', action='store_true')
    a = ap.parse_args()

    files, raw, changed = {}, {}, set()
    stats = {'added': 0, 'duplicate': 0, 'skipped': 0, 'open': 0}
    problems = []

    for wb_path in a.workbooks:
        ws = load_workbook(wb_path, data_only=True)['Review']
        col = {c.value: i for i, c in enumerate(ws[1])}
        kind = 'draft' if 'Draft prompt' in col else ('translate' if 'Translation' in col else None)
        if not kind:
            sys.exit(f'{wb_path}: not a prompt draft or translation sheet')
        print(f'{os.path.basename(wb_path)} ({kind})')
        for row in ws.iter_rows(min_row=2, values_only=True):
            id_ = row[col['ID']]
            if not id_:
                continue
            lang, cat, _ = (str(id_).split(':') + ['', '', ''])[:3]
            if cat not in ('speaking', 'writing'):
                problems.append(f'{id_}: unknown category'); stats['skipped'] += 1; continue
            level = str(row[col['Level']] or '').strip()
            if kind == 'draft':
                verdict = str(row[col['Verdict']] or '').strip().capitalize()
                if not verdict:
                    stats['open'] += 1; continue
                if verdict == 'Remove':
                    continue
                if verdict == 'Ok':
                    prompt = norm(row[col['Draft prompt']])
                elif verdict == 'Fix':
                    prompt = norm(row[col['Corrected prompt']])
                    if not prompt:
                        problems.append(f'{id_}: verdict Fix but no corrected prompt typed, skipped'); stats['skipped'] += 1; continue
                else:
                    problems.append(f'{id_}: unknown verdict "{row[col["Verdict"]]}", skipped'); stats['skipped'] += 1; continue
            else:
                prompt = norm(row[col['Translation']])
                if not prompt:
                    stats['open'] += 1; continue
            if len(prompt) < 10 or not re.search(r'\w', prompt):
                problems.append(f'{id_}: prompt too short, skipped'); stats['skipped'] += 1; continue
            path = os.path.join(a.practice, 'data', 'daily', lang, f'{cat}.json')
            if path not in files:
                raw[path] = open(path, encoding='utf-8').read()
                files[path] = json.loads(raw[path])
            entries = files[path]
            if any(norm(e.get('prompt')) == prompt for e in entries):
                stats['duplicate'] += 1
                continue
            entry = {'id': next_id(entries, lang, cat), 'prompt': prompt, 'level': level, 'curated': True}
            entries.append(entry)
            changed.add(path)
            stats['added'] += 1
            print(f'  + {entry["id"]} [{level}] {prompt[:90]}')

    print(f"\nadded {stats['added']} | already present {stats['duplicate']} | skipped {stats['skipped']} | not done yet {stats['open']}")
    for p in problems:
        print('  !', p)
    ok_files = {}
    for path in sorted(changed):
        if dump(json.loads(raw[path])) != raw[path]:
            print(f'  ! {os.path.relpath(path, a.practice)} does not round-trip through JSON, so it is not written. Add its prompts by hand.')
            continue
        ok_files[path] = dump(files[path])
    if a.write:
        for path, text in ok_files.items():
            open(path, 'w', encoding='utf-8').write(text)
            print('written', os.path.relpath(path, a.practice))
        print('\nNow run: node scripts/validate-daily-prompts.js  (in COSYpractice)')
    else:
        print('\nDry run: nothing written. Add --write to apply.')


if __name__ == '__main__':
    main()
