# -*- coding: utf-8 -*-
import json

with open("scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_30_PM.json", 'r', encoding='utf-8-sig') as f:
    d = json.load(f)

# Find header line (Y around 150-180)
header_words = [w for w in d.get('words', []) if 140 <= w['y'] <= 180]
header_words.sort(key=lambda w: w['x'])
for w in header_words:
    print(f"X={w['x']:4d}..{w['x']+w['w']:4d} (Y={w['y']:3d}) : {w['text']}")

