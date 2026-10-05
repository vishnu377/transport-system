import json

with open('scripts/full_crop_top_ocr.json', encoding='utf-8-sig') as f:
    d = json.load(f)

words = [w for w in d.get('words', []) if w['y'] > 170]

# Cluster by y within 12px
rows = {}
for w in words:
    matched_y = None
    for y_k in rows.keys():
        if abs(w['y'] - y_k) <= 12:
            matched_y = y_k
            break
    if matched_y is None:
        matched_y = w['y']
        rows[matched_y] = []
    rows[matched_y].append(w)

for y in sorted(rows.keys()):
    r_words = sorted(rows[y], key=lambda w: w['x'])
    name_words = [w['text'] for w in r_words if w['x'] < 680]
    mob1_words = [w['text'] for w in r_words if 680 <= w['x'] < 850]
    mob2_words = [w['text'] for w in r_words if w['x'] >= 850]
    
    name = " ".join(name_words).strip()
    mob1 = " ".join(mob1_words).strip()
    mob2 = " ".join(mob2_words).strip()
    if name or mob1:
        print(f"y={y:4d} | Name: {name:35} | Mob: {mob1:15} | Mob2: {mob2}")
