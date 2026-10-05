import json

with open('scripts/full_crop_top_ocr.json', encoding='utf-8-sig') as f:
    d = json.load(f)

for w in d.get('words', []):
    if w['y'] < 250:
        print(f"{w['text']:25} at x={w['x']}, y={w['y']}, w={w['w']}, h={w['h']}")
