#!/usr/bin/env python3
"""
Builds review sheets for NEW speaking/writing prompts that fill the thinnest level bands (A0-A1 and C1-C2).

  python scripts/review/make_prompt_draft_sheets.py --out prompt-draft-sheets      (reads scripts/review/prompt_drafts.json)

Two kinds of sheet:
  prompt-drafts-<lang>.xlsx      drafted prompts for a reviewer to approve (OK), correct (Fix) or reject (Remove)
  prompt-translate-<lang>.xlsx   English source prompts for a native speaker to translate (languages we cannot draft reliably)

Nothing reaches learners from a sheet alone: apply_prompt_drafts.py adds only approved rows to COSYpractice data/daily.
"""
import argparse, json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, PatternFill
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.worksheet.properties import PageSetupProperties
from openpyxl.formatting.rule import CellIsRule
from make_review_sheets import NAMES, FONT, GREEN, INPUT_FILL, HEAD_FILL, LOCK_FILL, style

LAST = 500
LEVEL_HELP = ('A0-A1: a complete beginner. Very short, concrete tasks in the present tense about the learner and their surroundings. '
              'C1-C2: an advanced learner. Abstract or argumentative topics that call for precise, nuanced language.')
REGISTER = {'fr': 'formal (vous)', 'ru': 'formal (вы)', 'el': 'formal (plural)', 'de': 'formal (Sie)', 'it': 'informal (tu)',
            'es': 'informal (tú)', 'pt': 'formal (o senhor / a senhora form, as in the existing prompts)', 'en': ''}
EXTRA = {'pt': 'The existing Portuguese prompts do not commit to Brazilian or European Portuguese. Please correct anything that sounds wrong in the variant you prefer, and say in a Comment which one it is.'}


def label(ws, r, text, body, height=None):
    ws.cell(r, 1, text).font = Font(name=FONT, bold=True, size=10)
    ws.cell(r, 1).alignment = Alignment(vertical='top')
    ws.merge_cells(start_row=r, start_column=2, end_row=r, end_column=4)
    c = ws.cell(r, 2, body)
    c.font = Font(name=FONT, size=10)
    c.alignment = Alignment(wrap_text=True, vertical='top')
    ws.row_dimensions[r].height = height or max(30, 15 * (len(body) // 95 + 1))


def counters(ws, r, rows, review_col, first_data=2):
    rng = lambda col: f'Review!{col}{first_data}:{col}{LAST}'
    ws.cell(r, 1, 'Progress (updates as you work)').font = Font(name=FONT, bold=True, size=10, color=GREEN)
    r += 1
    first = r
    for label_, formula, fmt in rows(first, rng):
        ws.cell(r, 1, label_).font = Font(name=FONT, size=10)
        c = ws.cell(r, 2, formula)
        c.font = Font(name=FONT, size=10, bold=True)
        c.number_format = fmt
        c.alignment = Alignment(horizontal='left')
        r += 1
    return r


def finish(wb, ins, ws, out_dir, name):
    for sheet in (ins, ws):
        sheet.sheet_properties.pageSetUpPr = PageSetupProperties(fitToPage=True)
        sheet.page_setup.orientation = 'landscape'
        sheet.page_setup.fitToWidth = 1
        sheet.page_setup.fitToHeight = 0
    ws.print_title_rows = '1:1'
    os.makedirs(out_dir, exist_ok=True)
    path = os.path.join(out_dir, name)
    wb.save(path)
    return path


def build_draft_sheet(lang, drafts, out_dir):
    name = NAMES.get(lang, lang)
    rows = []
    for cat in ('speaking', 'writing'):
        n = 0
        for band, prompts in drafts[cat].items():
            for p in prompts:
                n += 1
                rows.append([f'{lang}:{cat}:d{n}', 'Speaking prompt' if cat == 'speaking' else 'Writing prompt', band, p])
    # ids must be d1.. per category, in the order band A0-A1 then C1-C2
    wb = Workbook()
    ins = wb.active
    ins.title = 'Instructions'
    ins.sheet_view.showGridLines = False
    for col, w in zip('ABCD', (26, 70, 30, 26)):
        ins.column_dimensions[col].width = w
    ins.cell(1, 1, f'COSYlanguages: new {name} prompts to approve').font = Font(name=FONT, bold=True, size=16, color=GREEN)
    reg = REGISTER.get(lang, '')
    blocks = [
        ('What this is', f'Learners of {name} see one speaking and one writing prompt a day, chosen for their level. The beginner (A0-A1) and advanced (C1-C2) levels have only two or three prompts each, so they repeat every few days. The {len(rows)} prompts below are drafts to fill those levels. They were drafted without a native-speaker check, so please judge each one.'),
        ('How to review', '1. Go to the "Review" sheet. 2. In each row choose a Verdict: OK (add it as it is), Fix (type the better version in "Corrected prompt") or Remove (do not add it). 3. Add a Comment if useful. 4. Save the file and send it back. Only OK and Fix rows are added.'),
        ('What to check', 'Natural wording a teacher would really use; correct grammar and spelling; the right level (' + LEVEL_HELP + ') ' + (f'Address form: the existing prompts use {reg} address; please keep it consistent. ' if reg else '') + 'Speaking prompts should invite a spoken answer, writing prompts a clear written task. Remove anything culturally awkward or too close to an existing prompt. ' + EXTRA.get(lang, '')),
        ('Please do not change', 'The grey columns or the order of the rows. Corrections go only in the cream columns.'),
    ]
    r = 3
    for head, body in blocks:
        label(ins, r, head, body)
        r += 1
    r += 1
    counters(ins, r, lambda f, rng: [('Items to review', f'=COUNTA({rng("A")})', '0'), ('OK', f'=COUNTIF({rng("E")},"OK")', '0'),
             ('Fix', f'=COUNTIF({rng("E")},"Fix")', '0'), ('Remove', f'=COUNTIF({rng("E")},"Remove")', '0'),
             ('Still to do', f'=B{f}-B{f+1}-B{f+2}-B{f+3}', '0'), ('Done', f'=IFERROR((B{f+1}+B{f+2}+B{f+3})/B{f},0)', '0%')], 'E')
    ws = wb.create_sheet('Review')
    heads = [('ID', 18, 'lock'), ('Type', 16, 'lock'), ('Level', 9, 'lock'), ('Draft prompt', 70, 'lock'),
             ('Verdict', 11, 'input'), ('Corrected prompt', 60, 'input'), ('Comment', 36, 'input')]
    for i, (h, w, k) in enumerate(heads, start=1):
        style(ws.cell(1, i, h), bold=True, color='FFFFFF', fill=HEAD_FILL)
        ws.column_dimensions[chr(64 + i)].width = w
    for r, row in enumerate(rows, start=2):
        for i, v in enumerate(row + [None, None, None], start=1):
            style(ws.cell(r, i, v), fill=LOCK_FILL if heads[i - 1][2] == 'lock' else INPUT_FILL)
        ws.row_dimensions[r].height = max(30, 14 * (len(row[3]) // 70 + 1))
    last = len(rows) + 1
    ws.freeze_panes = 'A2'
    ws.auto_filter.ref = f'A1:G{last}'
    dv = DataValidation(type='list', formula1='"OK,Fix,Remove"', allow_blank=True, showErrorMessage=True, errorTitle='Verdict', error='Choose OK, Fix or Remove.')
    ws.add_data_validation(dv)
    dv.add(f'E2:E{LAST}')
    for text, color in (('"OK"', 'C6EFCE'), ('"Fix"', 'FFE699'), ('"Remove"', 'F4B6B6')):
        ws.conditional_formatting.add(f'E2:E{last}', CellIsRule(operator='equal', formula=[text], fill=PatternFill('solid', start_color=color, end_color=color)))
    return finish(wb, ins, ws, out_dir, f'prompt-drafts-{lang}.xlsx'), len(rows)


def build_translate_sheet(lang, source, out_dir):
    name = NAMES.get(lang, lang)
    rows = []
    for cat, bands in source['categories'].items():
        n = 0
        for band, prompts in bands.items():
            for p in prompts:
                n += 1
                rows.append([f'{lang}:{cat}:d{n}', 'Speaking prompt' if cat == 'speaking' else 'Writing prompt', band, p])
    wb = Workbook()
    ins = wb.active
    ins.title = 'Instructions'
    ins.sheet_view.showGridLines = False
    for col, w in zip('ABCD', (26, 70, 30, 26)):
        ins.column_dimensions[col].width = w
    ins.cell(1, 1, f'COSYlanguages: {name} beginner prompts to translate').font = Font(name=FONT, bold=True, size=16, color=GREEN)
    blocks = [
        ('What this is', f'Learners of {name} see one speaking prompt a day for their level, but beginners (A0-A1) have only one prompt, so they see it every day. Below are {len(rows)} short English prompts. Please write each one in {name}, the way a teacher would say it to a complete beginner.'),
        ('How to translate', 'Type the prompt in the cream "Translation" column. Translate naturally, not word for word. Keep it very short and simple (present tense, everyday words). Use one address form (formal or informal) for all of them, and say which in a Comment. Leave a row empty to skip it. Save the file and send it back.'),
        ('Please do not change', 'The grey columns or the order of the rows.'),
    ]
    r = 3
    for head, body in blocks:
        label(ins, r, head, body)
        r += 1
    r += 1
    counters(ins, r, lambda f, rng: [('Prompts to translate', f'=COUNTA({rng("A")})', '0'), ('Translated', f'=COUNTA({rng("E")})', '0'),
             ('Still to do', f'=B{f}-B{f+1}', '0'), ('Done', f'=IFERROR(B{f+1}/B{f},0)', '0%')], 'E')
    ws = wb.create_sheet('Review')
    heads = [('ID', 18, 'lock'), ('Type', 16, 'lock'), ('Level', 9, 'lock'), ('English prompt', 70, 'lock'),
             ('Translation', 70, 'input'), ('Comment', 36, 'input')]
    for i, (h, w, k) in enumerate(heads, start=1):
        style(ws.cell(1, i, h), bold=True, color='FFFFFF', fill=HEAD_FILL)
        ws.column_dimensions[chr(64 + i)].width = w
    for r, row in enumerate(rows, start=2):
        for i, v in enumerate(row + [None, None], start=1):
            style(ws.cell(r, i, v), fill=LOCK_FILL if heads[i - 1][2] == 'lock' else INPUT_FILL)
        ws.row_dimensions[r].height = 32
    ws.freeze_panes = 'A2'
    return finish(wb, ins, ws, out_dir, f'prompt-translate-{lang}.xlsx'), len(rows)


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--drafts', default=os.path.join(os.path.dirname(os.path.abspath(__file__)), 'prompt_drafts.json'))
    ap.add_argument('--out', default='prompt-draft-sheets')
    a = ap.parse_args()
    data = json.load(open(a.drafts, encoding='utf-8'))
    for lang, d in data['drafts'].items():
        path, n = build_draft_sheet(lang, d, a.out)
        print(f'{path}: {n} prompts to approve')
    for lang in data['translate']['languages']:
        path, n = build_translate_sheet(lang, data['translate'], a.out)
        print(f'{path}: {n} prompts to translate')
