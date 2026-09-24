# -*- coding: utf-8 -*-
import json
import glob
import os

images_2026 = [
    ("6 Sep", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_30_PM.json"),
    ("5 Aug", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_31_PM.json"),
    ("4 Jul", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_31_PM_(1).json"),
    ("3 Jun", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_31_PM_(2).json"),
    ("2 May", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_31_PM_(3).json"),
    ("1 Apr", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_31_PM_(4).json"),
]

def dump_month(label, path):
    print(f"\n=================== {label} : {os.path.basename(path)} ===================")
    with open(path, 'r', encoding='utf-8-sig') as f:
        data = json.load(f)
    words = [w for w in data.get('words', []) if w['y'] >= 60]
    words.sort(key=lambda w: (w['y'], w['x']))
    
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
            lines.append((curr_y, " ".join(x['text'] for x in curr)))
            curr = [w]
            curr_y = w['y']
    if curr:
        curr.sort(key=lambda x: x['x'])
        lines.append((curr_y, " ".join(x['text'] for x in curr)))
        
    for y, line_str in lines:
        print(f"[{y:4.0f}] {line_str}")

for label, p in images_2026:
    dump_month(label, p)

