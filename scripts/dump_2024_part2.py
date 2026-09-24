# -*- coding: utf-8 -*-
import json
import os

images_part2 = [
    ("7 Oct", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(18).json"),
    ("8 Nov", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(19).json"),
    ("9 Dec", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(20).json"),
]

def dump_file(label, path):
    print(f"\n=================== FY 2024-2025: {label} ({os.path.basename(path)}) ===================")
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

for label, p in images_part2:
    dump_file(label, p)

