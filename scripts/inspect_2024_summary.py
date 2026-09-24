# -*- coding: utf-8 -*-
import json

with open("scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(25).json", 'r', encoding='utf-8-sig') as f:
    d = json.load(f)

words = d.get('words', [])
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

for y, l in lines:
    print(f"[{y:4.0f}] {l}")

