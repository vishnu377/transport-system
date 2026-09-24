# -*- coding: utf-8 -*-
import json
import os
import re
import sys
sys.path.insert(0, 'scripts')
import generate_sample_debts as g

# Map each month of each FY to its OCR JSON file
mapping = {
    ("2026-2027", "6 Sep"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_30_PM.json",
    ("2026-2027", "5 Aug"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_31_PM.json",
    ("2026-2027", "4 Jul"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_31_PM_(1).json",
    ("2026-2027", "3 Jun"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_31_PM_(2).json",
    ("2026-2027", "2 May"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_31_PM_(3).json",
    ("2026-2027", "1 Apr"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_31_PM_(4).json",

    ("2025-2026", "12 Mar"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM.json",
    ("2025-2026", "11 Feb"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(1).json",
    ("2025-2026", "10 Jan"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(2).json",
    ("2025-2026", "9 Dec"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(3).json",
    ("2025-2026", "8 Nov"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(4).json",
    ("2025-2026", "7 Oct"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(5).json",
    ("2025-2026", "6 Sep"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(6).json",
    ("2025-2026", "5 Aug"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(7).json",
    ("2025-2026", "4 Jul"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(8).json",
    ("2025-2026", "3 Jun"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(9).json",
    ("2025-2026", "2 May"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(10).json",
    ("2025-2026", "1 Apr"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(11).json",

    ("2024-2025", "12 Mar"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(24).json",
    ("2024-2025", "11 Feb"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(22).json",
    ("2024-2025", "10 Jan"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(21).json",
    ("2024-2025", "9 Dec"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(20).json",
    ("2024-2025", "8 Nov"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(19).json",
    ("2024-2025", "7 Oct"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(18).json",
    ("2024-2025", "6 Sep"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(17).json",
    ("2024-2025", "5 Aug"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(16).json",
    ("2024-2025", "4 Jul"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(15).json",
    ("2024-2025", "3 Jun"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(14).json",
    ("2024-2025", "2 May"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(13).json",
    ("2024-2025", "1 Apr"): "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(12).json",
}

print("Running OCR validation for all months...")
for (fy, mKey), path in sorted(mapping.items()):
    with open(path, 'r', encoding='utf-8-sig') as f:
        ocr_data = json.load(f)
    full_text = " ".join(ocr_data.get('lines', []))
    
    recs = [d for d in g.debts if d['fy'] == fy and d['monthKey'] == mKey]
    m_tot = sum(r['dueAmount'] for r in recs)
    
    # Check each record
    unmatched_trucks = []
    for r in recs:
        # Check last 4 digits of truck number
        if r['truckNo'] and len(r['truckNo']) >= 4:
            digits = r['truckNo'][-4:]
            if digits not in full_text:
                unmatched_trucks.append(r['truckNo'])
                
    print(f"[{fy} {mKey:7}] Recs:{len(recs):2d} | Total:{m_tot:10,.2f} | Unmatched trucks in text: {len(unmatched_trucks)} {unmatched_trucks[:3]}")

