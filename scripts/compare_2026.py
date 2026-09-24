# -*- coding: utf-8 -*-
import json
import os
import re
import sys
sys.path.insert(0, 'scripts')
import generate_sample_debts as g

months_2026 = [
    ("6 Sep", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_30_PM.json"),
    ("5 Aug", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_31_PM.json"),
    ("4 Jul", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_31_PM_(1).json"),
    ("3 Jun", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_31_PM_(2).json"),
    ("2 May", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_31_PM_(3).json"),
    ("1 Apr", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_31_PM_(4).json"),
]

for mKey, path in months_2026:
    curr_debts = [d for d in g.debts if d['fy'] == '2026-2027' and d['monthKey'] == mKey]
    curr_total = sum(d['dueAmount'] for d in curr_debts)
    print(f"\n=================== {mKey} ===================")
    print(f"Current count in code: {len(curr_debts)} | Total: Rs. {curr_total:,.2f}")
    
    # Check OCR raw text
    with open(path, 'r', encoding='utf-8-sig') as f:
        ocr_data = json.load(f)
    print(f"Screenshot: {os.path.basename(path)}")
    # Print the lines in code with date, grNo, truckNo, dueAmount
    for d in curr_debts:
        print(f"  {d['date']} | GR:{d['grNo']:10} | Trk:{d['truckNo']:12} | Due:{d['dueAmount']:8.2f} | {d['debtType']:10} | {d['receiverName'][:25]}")

