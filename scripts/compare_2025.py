# -*- coding: utf-8 -*-
import json
import os
import re
import sys
sys.path.insert(0, 'scripts')
import generate_sample_debts as g

months_2025 = [
    ("12 Mar", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM.json"),
    ("11 Feb", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(1).json"),
    ("10 Jan", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(2).json"),
    ("9 Dec", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(3).json"),
    ("8 Nov", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(4).json"),
    ("7 Oct", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(5).json"),
    ("6 Sep", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(6).json"),
    ("5 Aug", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(7).json"),
    ("4 Jul", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(8).json"),
    ("3 Jun", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(9).json"),
    ("2 May", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(10).json"),
    ("1 Apr", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(11).json"),
]

for mKey, path in months_2025:
    curr_debts = [d for d in g.debts if d['fy'] == '2025-2026' and d['monthKey'] == mKey]
    curr_total = sum(d['dueAmount'] for d in curr_debts)
    print(f"\n=================== FY 2025-2026 : {mKey} ===================")
    print(f"Current count in code: {len(curr_debts)} | Total: Rs. {curr_total:,.2f}")
    
    # Read screenshot OCR to see date headers and subtotals
    with open(path, 'r', encoding='utf-8-sig') as f:
        ocr_data = json.load(f)
    words = [w for w in ocr_data.get('words', []) if w['y'] >= 160]
    words.sort(key=lambda w: (w['y'], w['x']))
    # find lines with date headers
    # A date header line typically has a date DD/MM/YYYY and an amount
    curr_y = None
    curr_line = []
    lines = []
    for w in words:
        if curr_y is None:
            curr_y = w['y']
            curr_line.append(w)
        elif abs(w['y'] - curr_y) <= 12:
            curr_line.append(w)
            curr_y = sum(x['y'] for x in curr_line) / len(curr_line)
        else:
            curr_line.sort(key=lambda x: x['x'])
            lines.append(" ".join(x['text'] for x in curr_line))
            curr_line = [w]
            curr_y = w['y']
    if curr_line:
        curr_line.sort(key=lambda x: x['x'])
        lines.append(" ".join(x['text'] for x in curr_line))
        
    date_headers = []
    for l in lines:
        if re.search(r'\b\d{2}/\d{2}/20\d\d\b', l) and len(l) < 35:
            date_headers.append(l)
    print(f"Detected Date Headers ({len(date_headers)}):")
    for dh in date_headers[:8]:
        print(f"   {dh}")

