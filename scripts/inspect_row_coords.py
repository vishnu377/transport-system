import json

with open(r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\cheques_ocr\bounced_51.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

for w in d['words']:
    if abs(w['y'] - 340) <= 15:
        print(f"{w['text']:15s} x={w['x']:4d} y={w['y']:4d} w={w['w']:3d}")
