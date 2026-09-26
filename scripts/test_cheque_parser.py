import json

with open(r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\cheques_ocr\bounced_51.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

words = d.get('words', [])

# Filter table words: x between 300 and 2300, y >= 200
table_words = [w for w in words if w['x'] >= 300 and w['y'] >= 200]

rows = {}
for w in table_words:
    matched_y = None
    for y_key in rows.keys():
        if abs(w['y'] - y_key) <= 18:
            matched_y = y_key
            break
    if matched_y is None:
        matched_y = w['y']
        rows[matched_y] = []
    rows[matched_y].append(w)

sorted_y = sorted(rows.keys())
print(f"Detected {len(sorted_y)} rows in table:")
for y in sorted_y:
    row_words = sorted(rows[y], key=lambda w: w['x'])
    row_text = " | ".join(f"{w['text']}" for w in row_words)
    print(f"y={y:4d}: {row_text}")
