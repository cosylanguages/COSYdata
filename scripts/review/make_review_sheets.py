#!/usr/bin/env python3
"""
Builds one native-speaker review workbook per language from the COSY daily content.

  python scripts/review/make_review_sheets.py --practice ../COSYpractice --data . --out review-sheets
  python make_review_sheets.py ... --lang fr          # a single language

Content reviewed (the texts the daily strip shows to learners):
  speaking / writing prompts   COSYpractice  data/daily/<lang>/{speaking,writing}.json
  idioms (legacy list)         COSYdata      daily/<lang>/idioms.json

Fun facts are owned by COSYlanguages (`data/daily/<lang>/facts.json`) and reviewed
there (`data/daily/TODO.md`); they are not collected here.

The ID column is how apply_review.py finds each entry again, so reviewers must not change it.
"""
import argparse, json, os
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.formatting.rule import CellIsRule
from openpyxl.worksheet.properties import PageSetupProperties

NAMES = {'ba': 'Bashkir', 'br': 'Breton', 'cv': 'Chuvash', 'de': 'German', 'el': 'Greek', 'en': 'English',
         'es': 'Spanish', 'fr': 'French', 'hy': 'Armenian', 'it': 'Italian', 'ka': 'Georgian', 'pt': 'Portuguese',
         'ru': 'Russian', 'tt': 'Tatar'}
FONT = 'Arial'
GREEN = '2F5D3A'
INPUT_FILL = PatternFill('solid', start_color='FFF8DC')   # reviewers type in the cream cells
HEAD_FILL = PatternFill('solid', start_color=GREEN)
LOCK_FILL = PatternFill('solid', start_color='F1F1F1')
THIN = Side(style='thin', color='D0D0D0')
BORDER = Border(left=THIN, right=THIN, top=THIN, bottom=THIN)

COLUMNS = [  # header, width, kind
    ('ID', 16, 'lock'), ('Type', 16, 'lock'), ('Level / topic', 14, 'lock'), ('Text', 60, 'lock'),
    ('Meaning (English)', 34, 'lock'), ('Example sentence', 50, 'lock'),
    ('Verdict', 12, 'input'), ('Corrected text', 50, 'input'), ('Corrected example', 45, 'input'), ('Comment', 36, 'input'),
]
REVIEW_ROWS_MAX = 2000


def read(path):
    with open(path, encoding='utf-8') as f:
        return json.load(f)


def collect(lang, practice, data):
    rows = []
    for kind, label in (('speaking', 'Speaking prompt'), ('writing', 'Writing prompt')):
        for e in read(os.path.join(practice, 'data', 'daily', lang, kind + '.json')):
            level = e.get('level', '') + (' (curated)' if e.get('curated') else '')
            rows.append([e['id'], label, level, e['prompt'], '', ''])
    for e in read(os.path.join(data, 'daily', lang, 'idioms.json')):
        rows.append([e['id'], 'Idiom', '', e['idiom'], e.get('real_meaning', ''), e.get('example', '')])
    return rows


def style(cell, bold=False, color='000000', fill=None, wrap=True, size=10):
    cell.font = Font(name=FONT, bold=bold, color=color, size=size)
    cell.alignment = Alignment(wrap_text=wrap, vertical='top')
    cell.border = BORDER
    if fill:
        cell.fill = fill


def instructions(ws, lang, n_items):
    name = NAMES.get(lang, lang)
    ws.sheet_view.showGridLines = False
    ws.column_dimensions['A'].width = 26
    ws.column_dimensions['B'].width = 70
    ws.column_dimensions['C'].width = 30
    ws.column_dimensions['D'].width = 26
    r = 1
    ws.cell(r, 1, f'COSYlanguages: {name} content review').font = Font(name=FONT, bold=True, size=16, color=GREEN)
    r += 2
    blocks = [
        ('What this is', 'The short texts below are shown to learners of %s in the daily strip on cosylanguages.github.io. They were written without a native-speaker check. Please read each one on the "Review" sheet and tell us whether it is natural, correct and suitable.' % name),
        ('How to review', '1. Go to the "Review" sheet. 2. In each row, choose a Verdict in the cream "Verdict" column: OK (nothing to change), Fix (type the better version in "Corrected text", and in "Corrected example" for idioms) or Remove (cannot be fixed, or not suitable). 3. Add a Comment if it helps. 4. Save the file and send it back.'),
        ('Please do not change', 'The ID and Text columns (grey). Corrections go only in the cream columns, so they can be applied automatically. Do not add, delete or re-sort rows.'),
        ('Speaking / writing prompts', 'Natural wording a teacher would really use. Correct grammar and spelling. Suitable for the CEFR level shown (A0-A1 beginner: short, concrete, present tense; A2: simple personal topics; B1-B2: opinions, experiences, explanations; C1-C2: abstract topics, nuance). Speaking prompts should invite a spoken answer, writing prompts a clear written task. "(curated)" means hand-written for that level.'),
        ('Idioms', 'Is it a real expression that native speakers use today (not a literal translation or an invention)? Is the spelling right? Is the English meaning correct? Is the example sentence natural and does it contain the idiom? Fix the idiom in "Corrected text" and the sentence in "Corrected example".'),
    ]
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
    ws.cell(r, 1, 'Example (not part of your review)').font = Font(name=FONT, bold=True, size=10, color=GREEN)
    r += 1
    for i, h in enumerate(['Verdict', 'Text (as shown)', 'Corrected text', 'Comment']):
        style(ws.cell(r, 1 + i, h), bold=True, color='FFFFFF', fill=HEAD_FILL)
    r += 1
    example = ['Fix', 'He has went to school yesterday.', 'He went to school yesterday.', 'Wrong past tense']
    for i, v in enumerate(example):
        style(ws.cell(r, 1 + i, v), fill=INPUT_FILL if i in (0, 2, 3) else LOCK_FILL)
    ws.row_dimensions[r].height = 30
    r += 2
    ws.cell(r, 1, 'Progress (updates as you work)').font = Font(name=FONT, bold=True, size=10, color=GREEN)
    r += 1
    rng = lambda col: f'Review!{col}2:{col}{REVIEW_ROWS_MAX}'
    first = r
    items = [('Items to review', f'=COUNTA({rng("A")})', '0'),
             ('OK', f'=COUNTIF({rng("G")},"OK")', '0'),
             ('Fix', f'=COUNTIF({rng("G")},"Fix")', '0'),
             ('Remove', f'=COUNTIF({rng("G")},"Remove")', '0'),
             ('Still to do', f'=B{first}-B{first+1}-B{first+2}-B{first+3}', '0'),
             ('Done', f'=IFERROR((B{first+1}+B{first+2}+B{first+3})/B{first},0)', '0%')]
    for label, formula, fmt in items:
        ws.cell(r, 1, label).font = Font(name=FONT, size=10)
        c = ws.cell(r, 2, formula)
        c.font = Font(name=FONT, size=10, bold=True)
        c.number_format = fmt
        c.alignment = Alignment(horizontal='left')
        r += 1
    r += 1
    ws.cell(r, 1, f'Generated from the live COSY data: {n_items} items. Reviewer name / date:').font = Font(name=FONT, size=9, italic=True, color='666666')
    ws.cell(r, 3).fill = INPUT_FILL
    ws.cell(r, 4).fill = INPUT_FILL


def build(lang, practice, data, out_dir):
    rows = collect(lang, practice, data)
    wb = Workbook()
    ins = wb.active
    ins.title = 'Instructions'
    instructions(ins, lang, len(rows))
    ws = wb.create_sheet('Review')
    for i, (head, width, kind) in enumerate(COLUMNS, start=1):
        style(ws.cell(1, i, head), bold=True, color='FFFFFF', fill=HEAD_FILL)
        ws.column_dimensions[chr(64 + i)].width = width
    ws.row_dimensions[1].height = 22
    for r, row in enumerate(rows, start=2):
        values = row + [None, None, None, None]
        for i, v in enumerate(values, start=1):
            kind = COLUMNS[i - 1][2]
            style(ws.cell(r, i, v), fill=LOCK_FILL if kind == 'lock' else INPUT_FILL)
        longest = max(len(str(row[3])), len(str(row[5])) * 1.2, len(str(row[4])) * 1.7)
        ws.row_dimensions[r].height = max(30, 14 * (int(longest // 55) + 1))
    last = len(rows) + 1
    ws.freeze_panes = 'A2'
    ws.auto_filter.ref = f'A1:J{last}'
    dv = DataValidation(type='list', formula1='"OK,Fix,Remove"', allow_blank=True, showErrorMessage=True,
                        errorTitle='Verdict', error='Choose OK, Fix or Remove.')
    ws.add_data_validation(dv)
    dv.add(f'G2:G{REVIEW_ROWS_MAX}')
    for text, color in (('"OK"', 'C6EFCE'), ('"Fix"', 'FFE699'), ('"Remove"', 'F4B6B6')):
        ws.conditional_formatting.add(f'G2:G{last}', CellIsRule(operator='equal', formula=[text], fill=PatternFill('solid', start_color=color, end_color=color)))
    for sheet in (ins, ws):  # print on one page width, landscape
        sheet.sheet_properties.pageSetUpPr = PageSetupProperties(fitToPage=True)
        sheet.page_setup.orientation = 'landscape'
        sheet.page_setup.fitToWidth = 1
        sheet.page_setup.fitToHeight = 0
        sheet.sheet_properties.pageSetUpPr.fitToPage = True
    ws.print_title_rows = '1:1'
    os.makedirs(out_dir, exist_ok=True)
    path = os.path.join(out_dir, f'review-{lang}.xlsx')
    wb.save(path)
    return path, len(rows)


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--practice', required=True)
    ap.add_argument('--data', required=True)
    ap.add_argument('--out', default='review-sheets')
    ap.add_argument('--lang')
    a = ap.parse_args()
    langs = [a.lang] if a.lang else sorted(d for d in os.listdir(os.path.join(a.practice, 'data', 'daily')) if len(d) == 2)
    for lang in langs:
        path, n = build(lang, a.practice, a.data, a.out)
        print(f'{path}: {n} items')
