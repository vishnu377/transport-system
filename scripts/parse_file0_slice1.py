import json

with open(r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\file0_slice1_ocr.json', 'r', encoding='utf-8-sig') as f:
    d = json.load(f)

words = d.get('words', [])

# Filter table words: y >= 250
table_words = [w for w in words if w['y'] >= 250]

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
print(f"Total rows found: {len(sorted_y)}")
for y in sorted_y[:35]:
    row_words = sorted(rows[y], key=lambda w: w['x'])
    row_text = "  |  ".join(f"{w['text']} ({w['x']})" for w in row_words)
    print(f"y={y:4d}: {row_text}")
