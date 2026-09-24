# -*- coding: utf-8 -*-
import json
import os
import re
import sys
sys.path.insert(0, 'scripts')
import generate_sample_debts as g

months_2024 = [
    ("1 Apr", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(12).json"),
    ("2 May", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(13).json"),
    ("3 Jun", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(14).json"),
    ("4 Jul", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(15).json"),
    ("5 Aug", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(16).json"),
    ("6 Sep", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(17).json"),
    ("7 Oct", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(18).json"),
    ("8 Nov", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(19).json"),
    ("9 Dec", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(20).json"),
    ("10 Jan", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(21).json"),
    ("11 Feb", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(22).json"),
    ("12 Mar", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(24).json"),
]

for mKey, path in months_2024:
    curr_debts = [d for d in g.debts if d['fy'] == '2024-2025' and d['monthKey'] == mKey]
    curr_total = sum(d['dueAmount'] for d in curr_debts)
    print(f"\n=================== FY 2024-2025 : {mKey} ===================")
    print(f"Current count in code: {len(curr_debts)} | Total: Rs. {curr_total:,.2f}")
    
    # Read screenshot OCR
    with open(path, 'r', encoding='utf-8-sig') as f:
        ocr_data = json.load(f)
    print(f"Screenshot: {os.path.basename(path)}")
    for d in curr_debts:
        print(f"  {d['date']} | GR:{d['grNo']:10} | Trk:{d['truckNo']:12} | Due:{d['dueAmount']:8.2f} | {d['debtType']:10} | {d['receiverName'][:25]}")

