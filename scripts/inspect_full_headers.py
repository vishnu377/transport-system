import json

with open('scripts/full_crop_top_ocr.json', encoding='utf-8-sig') as f:
    d = json.load(f)

headers = [w for w in d.get('words', []) if 130 <= w['y'] <= 170]
headers.sort(key=lambda w: w['x'])
print('Headers found:')
for w in headers:
    print(f"{w['text']} at x={w['x']}, y={w['y']}")
