import json

with open(r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\cheques_ocr\cleared_54_slice_0.json', 'r', encoding='utf-8-sig') as f:
    d = json.load(f)

for w in d['words']:
    if abs(w['y'] - 245) <= 15:
        print(f"{w['text']:15s} x={w['x']:4d} y={w['y']:4d} w={w['w']:3d}")
