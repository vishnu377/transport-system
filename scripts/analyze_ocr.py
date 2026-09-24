# -*- coding: utf-8 -*-
import os
import json
import glob
import re

def parse_folder(folder_path):
    files = glob.glob(os.path.join(folder_path, "*.json"))
    catalog = []
    for f in sorted(files):
        with open(f, 'r', encoding='utf-8-sig') as fp:
            data = json.load(fp)
        lines = data.get('lines', [])
        fname = data.get('fileName', os.path.basename(f))
        
        # Detect Month Key
        # Patterns like: "1 Apr", "2 May", "3 Jun", "4 Jul", "5 Aug", "6 Sep", "7 Oct", "8 Nov", "9 Dec", "10 Jan", "11 Feb", "12 Mar"
        months = []
        for line in lines:
            m = re.findall(r'\b(?:1[0-2]|[1-9])\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b', line, re.I)
            if m:
                months.extend(m)
        
        # Detect Year Key e.g. 2026-2027, 2025-2026, 2024-2025, 2023-2024
        years = []
        for line in lines:
            y = re.findall(r'20\d\d\s*[-–]\s*20\d\d', line)
            if y:
                years.extend(y)
                
        # Dates
        dates = []
        for line in lines:
            d = re.findall(r'\b\d{2}/\d{2}/20\d\d\b', line)
            if d:
                dates.extend(d)
                
        # Large amounts or totals
        amounts = []
        for line in lines:
            a = re.findall(r'[\d,]+\.\d\d', line)
            for val_str in a:
                try:
                    val = float(val_str.replace(',', ''))
                    amounts.append(val)
                except:
                    pass

        catalog.append({
            "fileName": fname,
            "jsonPath": f,
            "months": list(dict.fromkeys(months)),
            "years": list(dict.fromkeys(years)),
            "dateCount": len(dates),
            "dateSample": dates[:3],
            "maxAmount": max(amounts) if amounts else 0,
            "lineCount": len(lines),
            "lines": lines
        })
    return catalog

print("Cataloging scripts/ocr_ledger_all...")
cat1 = parse_folder("scripts/ocr_ledger_all")
for item in cat1:
    print(f"\n[{item['fileName']}]")
    print(f"  Months: {item['months']} | Years: {item['years']}")
    print(f"  Dates: {item['dateCount']} (Sample: {item['dateSample']})")
    print(f"  Max Amount: {item['maxAmount']:,.2f} | Total Lines: {item['lineCount']}")
    print(f"  First 6 lines: {item['lines'][:6]}")

