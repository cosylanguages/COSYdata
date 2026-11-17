#!/usr/bin/env python3
"""
Builds a native-speaker review workbook, per language, of the dictionary entries that the daily calendars are about to show.

  python scripts/review/make_dictionary_review.py --data . --out dictionary-review --days 14
  python scripts/review/make_dictionary_review.py --data . --days 30 --lang fr

A row is one dictionary entry scheduled in daily/<lang>/calendar/<slot>/ between today and today + --days, soonest first, so a
reviewer can stop anywhere and still have covered what learners will see next. Slots: word, verb, verb + preposition,
phrasal verb, idiom. Apply the returned sheet with apply_dictionary_review.py.
"""
import argparse, datetime, glob, json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, PatternFill
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.worksheet.properties import PageSetupProperties
from openpyxl.formatting.rule import CellIsRule
from make_review_sheets import NAMES, FONT, GREEN, INPUT_FILL, HEAD_FILL, LOCK_FILL, style

SLOT_LABELS = {'word': 'Word of the day', 'verb': 'Verb of the day', 'verb-prep': 'Verb + preposition',
               'phrasal-verb': 'Phrasal verb', 'idiom': 'Idiom'}
SLOT_ORDER = list(SLOT_LABELS)
COLUMNS = [('ID', 18, 'lock'), ('First shown', 12, 'lock'), ('Shown as', 22, 'lock'), ('Level', 8, 'lock'),
           ('Headword', 22, 'lock'), ('Part of speech', 13, 'lock'), ('Definition', 52, 'lock'), ('Example', 50, 'lock'),
           ('Verdict', 11, 'input'), ('Corrected definition', 46, 'input'), ('Corrected example', 44, 'input'), ('Comment', 34, 'input')]
LAST_ROW = 3000


def read(path):
    with open(path, encoding='utf-8') as f:
        return json.load(f)


def headword(e):
    art = e.get('article') or ''
    if not art:
        return e['word']
    return art + ('' if art.endswith(("'", '’')) else ' ') + e['word']


def collect(lang, data, start, end):
    """id -> {'first': date, 'slots': set}"""
    seen = {}
    for slot in SLOT_ORDER:
        for f in glob.glob(os.path.join(data, 'daily', lang, 'calendar', slot, '*.json')):
            for date, day in read(f)['days'].items():
                d = datetime.date.fromisoformat(date)
                if not (start <= d < end):
                    continue
                for card in day.values():
                    s = seen.setdefault(card['id'], {'first': date, 'slots': set()})
                    s['first'] = min(s['first'], date)
                    s['slots'].add(slot)
    return seen


def find_entry(lang, id_, data, index, cache):
    rel = index.get(id_)
    if not rel:
        return None
    path = os.path.join(data, 'vocabulary', lang, rel)
    if path not in cache:
        cache[path] = {e['id']: e for e in read(path) if isinstance(e, dict) and 'id' in e}
    return cache[path].get(id_)


def instructions(ws, lang, n, start, end):
    name = NAMES.get(lang, lang)
    ws.sheet_view.showGridLines = False
    for col, w in zip('ABCD', (26, 70, 30, 26)):
        ws.column_dimensions[col].width = w
    ws.cell(1, 1, f'COSYlanguages: {name} dictionary review').font = Font(name=FONT, bold=True, size=16, color=GREEN)
    blocks = [
        ('What this is', f'These {n} dictionary entries will be shown to learners of {name} as the word, verb or idiom of the day between {start} and {end - datetime.timedelta(days=1)}. They are listed soonest first, so you can stop at any row. The texts were produced without a native-speaker check.'),
        ('How to review', '1. Go to the "Review" sheet. 2. For each row choose a Verdict in the cream "Verdict" column. 3. Add a Comment if useful. 4. Save the file and send it back. Verdicts: OK = nothing to change. Fix = type a better definition and/or example in "Corrected definition" / "Corrected example". Exclude = not suitable as a daily pick (offensive, too obscure, a proper name, ...); it stays in the dictionary but will not be featured. Flag = a problem a definition or example cannot fix (wrong spelling, article or gender, wrong level, wrong part of speech): describe it in Comment and the team will edit the entry.'),
        ('Please do not change', 'The grey columns, or the order and number of rows. Corrections go only in the cream columns, so they can be applied automatically.'),
        ('What to check', 'Headword: correct spelling and, where shown, the right article. Definition: written in simple, natural language at the level shown; accurate; not circular (it must not just repeat the word); not a translation. Example: one natural sentence that really uses the headword with the right grammar. For verbs, check the infinitive form; for phrasal verbs, check the particle; for idioms, check that it is a real expression people use today.'),
        ('Levels', 'A0-A1 beginner: very simple, concrete words. A2: everyday topics. B1-B2: opinions, abstract everyday ideas. C1-C2: advanced, formal or specialised vocabulary. If a word looks far too hard or too easy for its level, choose Flag.'),
    ]
    r = 3
    for head, body in blocks:
        ws.cell(r, 1, head).font = Font(name=FONT, bold=True, size=10)
        ws.cell(r, 1).alignment = Alignment(vertical='top')
        ws.merge_cells(start_row=r, start_column=2, end_row=r, end_column=4)
        c = ws.cell(r, 2, body)
        c.font = Font(name=FONT, size=10)
        c.alignment = Alignment(wrap_text=True, vertical='top')
        ws.row_dimensions[r].height = max(30, 15 * (len(body) // 95 + 1))
        r += 1
    r += 1
    ws.cell(r, 1, 'Progress (updates as you work)').font = Font(name=FONT, bold=True, size=10, color=GREEN)
    r += 1
    rng = lambda col: f'Review!{col}2:{col}{LAST_ROW}'
    first = r
    items = [('Items to review', f'=COUNTA({rng("A")})', '0'), ('OK', f'=COUNTIF({rng("I")},"OK")', '0'),
             ('Fix', f'=COUNTIF({rng("I")},"Fix")', '0'), ('Exclude', f'=COUNTIF({rng("I")},"Exclude")', '0'),
             ('Flag', f'=COUNTIF({rng("I")},"Flag")', '0'),
             ('Still to do', f'=B{first}-B{first+1}-B{first+2}-B{first+3}-B{first+4}', '0'),
             ('Done', f'=IFERROR((B{first+1}+B{first+2}+B{first+3}+B{first+4})/B{first},0)', '0%')]
    for label, formula, fmt in items:
        ws.cell(r, 1, label).font = Font(name=FONT, size=10)
        c = ws.cell(r, 2, formula)
        c.font = Font(name=FONT, size=10, bold=True)
        c.number_format = fmt
        c.alignment = Alignment(horizontal='left')
        r += 1
    r += 1
    ws.cell(r, 1, 'Reviewer name / date:').font = Font(name=FONT, size=9, italic=True, color='666666')
    ws.cell(r, 2).fill = INPUT_FILL


def build(lang, data, out_dir, start, end):
    index = read(os.path.join(data, 'vocabulary', lang, 'index.json'))
    seen = collect(lang, data, start, end)
    cache, rows, missing = {}, [], []
    for id_, info in seen.items():
        e = find_entry(lang, id_, data, index, cache)
        if not e:
            missing.append(id_)
            continue
        slots = sorted(info['slots'], key=SLOT_ORDER.index)
        rows.append([id_, info['first'], ', '.join(SLOT_LABELS[s] for s in slots), e.get('level', ''), headword(e), e.get('form', ''),
                     (e.get('definitions') or [''])[0], (e.get('examples') or [''])[0], SLOT_ORDER.index(slots[0])])
    rows.sort(key=lambda r: (r[1], r[8], r[0]))
    wb = Workbook()
    ins = wb.active
    ins.title = 'Instructions'
    instructions(ins, lang, len(rows), start, end)
    ws = wb.create_sheet('Review')
    for i, (head, width, kind) in enumerate(COLUMNS, start=1):
        style(ws.cell(1, i, head), bold=True, color='FFFFFF', fill=HEAD_FILL)
        ws.column_dimensions[chr(64 + i)].width = width
    ws.row_dimensions[1].height = 22
    for r, row in enumerate(rows, start=2):
        for i, v in enumerate(row[:8] + [None] * 4, start=1):
            style(ws.cell(r, i, v), fill=LOCK_FILL if COLUMNS[i - 1][2] == 'lock' else INPUT_FILL)
        ws.row_dimensions[r].height = max(30, 14 * (int(max(len(str(row[6])), len(str(row[7]))) // 50) + 1))
    last = len(rows) + 1
    ws.freeze_panes = 'A2'
    ws.auto_filter.ref = f'A1:L{last}'
    dv = DataValidation(type='list', formula1='"OK,Fix,Exclude,Flag"', allow_blank=True, showErrorMessage=True,
                        errorTitle='Verdict', error='Choose OK, Fix, Exclude or Flag.')
    ws.add_data_validation(dv)
    dv.add(f'I2:I{LAST_ROW}')
    for text, color in (('"OK"', 'C6EFCE'), ('"Fix"', 'FFE699'), ('"Exclude"', 'F4B6B6'), ('"Flag"', 'D9C2F0')):
        ws.conditional_formatting.add(f'I2:I{last}', CellIsRule(operator='equal', formula=[text], fill=PatternFill('solid', start_color=color, end_color=color)))
    for sheet in (ins, ws):
        sheet.sheet_properties.pageSetUpPr = PageSetupProperties(fitToPage=True)
        sheet.page_setup.orientation = 'landscape'
        sheet.page_setup.fitToWidth = 1
        sheet.page_setup.fitToHeight = 0
    ws.print_title_rows = '1:1'
    os.makedirs(out_dir, exist_ok=True)
    path = os.path.join(out_dir, f'dictionary-review-{lang}.xlsx')
    wb.save(path)
    return path, len(rows), missing


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--data', required=True, help='COSYdata checkout')
    ap.add_argument('--out', default='dictionary-review')
    ap.add_argument('--days', type=int, default=14)
    ap.add_argument('--from', dest='start', help='first day, YYYY-MM-DD (default: today)')
    ap.add_argument('--lang')
    a = ap.parse_args()
    start = datetime.date.fromisoformat(a.start) if a.start else datetime.date.today()
    end = start + datetime.timedelta(days=a.days)
    cal = os.path.join(a.data, 'daily')
    langs = [a.lang] if a.lang else sorted(d for d in os.listdir(cal) if len(d) == 2 and os.path.isdir(os.path.join(cal, d, 'calendar')))
    for lang in langs:
        path, n, missing = build(lang, a.data, a.out, start, end)
        print(f'{path}: {n} entries ({start} to {end - datetime.timedelta(days=1)})' + (f', {len(missing)} ids not in the dictionary index: {missing[:3]}' if missing else ''))
