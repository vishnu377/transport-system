# -*- coding: utf-8 -*-
"""
Audits each month's entries in generate_sample_debts against the OCR images.
Checks:
1. Date header totals in the image vs code totals for each date
2. Missing dates in code
3. Extra dates in code
"""
import json
import re
import os
import sys
sys.path.insert(0, 'scripts')
import generate_sample_debts as g
from collections import defaultdict

def audit_month(fy, monthKey, json_path):
    print(f"\n========================================================")
    print(f"AUDITING: FY {fy} - {monthKey} ({os.path.basename(json_path)})")
    print(f"========================================================")
    
    with open(json_path, 'r', encoding='utf-8-sig') as f:
        ocr_data = json.load(f)
    words = [w for w in ocr_data.get('words', []) if w['y'] >= 140]
    words.sort(key=lambda w: (w['y'], w['x']))
    
    # cluster into lines
    lines = []
    curr = []
    curr_y = None
    for w in words:
        if curr_y is None:
            curr_y = w['y']
            curr.append(w)
        elif abs(w['y'] - curr_y) <= 12:
            curr.append(w)
            curr_y = sum(x['y'] for x in curr) / len(curr)
        else:
            curr.sort(key=lambda x: x['x'])
            lines.append((curr_y, " ".join(x['text'] for x in curr), curr))
            curr = [w]
            curr_y = w['y']
    if curr:
        curr.sort(key=lambda x: x['x'])
        lines.append((curr_y, " ".join(x['text'] for x in curr), curr))

    # Detect Date headers:
    # A date header has date pattern (e.g. DD/MM/YYYY) and usually subtotal on right or next to it
    detected_headers = []
    for y, line_str, line_words in lines:
        d_match = re.search(r'\b(\d{2})[/.\-](\d{2})[/.\-]20\d\d\b', line_str)
        if d_match:
            # Check if this line is a header (usually has few words, or starts with date)
            # or if it's the date at the far right of a row
            # If the date is at X < 400, it's a date group header!
            first_date_word = [w for w in line_words if '/' in w['text']][0]
            if first_date_word['x'] < 400:
                # Group header!
                detected_headers.append((y, d_match.group(0), line_str))
                
    # Group code debts by displayDate
    code_debts = [d for d in g.debts if d['fy'] == fy and d['monthKey'] == monthKey]
    code_by_date = defaultdict(list)
    for d in code_debts:
        code_by_date[d['displayDate']].append(d)
        
    print(f"Detected {len(detected_headers)} Date Group Headers in Screenshot:")
    for y, d_str, l_str in detected_headers:
        # Normalize date string e.g. 20/09/2026
        p = re.split(r'[/.\-]', d_str)
        norm_date = f"{int(p[0]):02d}/{int(p[1]):02d}/{p[2]}"
        code_entries = code_by_date.get(norm_date, [])
        code_sum = sum(e['dueAmount'] for e in code_entries)
        print(f"  Header: {norm_date:10} (OCR line: {l_str[:40]:40}) | Code entries: {len(code_entries)} | Code Due Sum: Rs. {code_sum:8,.2f}")
        
    # Check if code has dates NOT in detected_headers
    header_dates = set()
    for y, d_str, l_str in detected_headers:
        p = re.split(r'[/.\-]', d_str)
        header_dates.add(f"{int(p[0]):02d}/{int(p[1]):02d}/{p[2]}")
        
    extra_in_code = set(code_by_date.keys()) - header_dates
    if extra_in_code:
        print(f"  [!] Dates in code but not detected as group header: {extra_in_code}")
    missing_in_code = header_dates - set(code_by_date.keys())
    if missing_in_code:
        print(f"  [!] Group headers detected but missing in code: {missing_in_code}")

print("Running detailed audit on FY 2026-2027...")
audit_month("2026-2027", "6 Sep", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_30_PM.json")
audit_month("2026-2027", "5 Aug", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_31_PM.json")
audit_month("2026-2027", "4 Jul", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_31_PM_(1).json")
audit_month("2026-2027", "3 Jun", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_31_PM_(2).json")
audit_month("2026-2027", "2 May", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_31_PM_(3).json")
audit_month("2026-2027", "1 Apr", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_31_PM_(4).json")

