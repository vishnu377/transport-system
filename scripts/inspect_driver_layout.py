import json

with open('scripts/drivers_top_crop_ocr.json', encoding='utf-8-sig') as f:
    d = json.load(f)

words = d.get('words', [])

# Print words around header y=120-170
headers = [w for w in words if 120 <= w['y'] <= 170]
headers.sort(key=lambda w: w['x'])
print("Headers:")
for w in headers:
    print(f"  {w['text']} at x={w['x']}, y={w['y']}")

# Cluster rows
rows = {}
for w in words:
    if w['y'] > 170:
        matched_y = None
        for y_k in rows.keys():
            if abs(w['y'] - y_k) <= 12:
                matched_y = y_k
                break
        if matched_y is None:
            matched_y = w['y']
            rows[matched_y] = []
        rows[matched_y].append(w)

print("\nSample Rows:")
for y in sorted(rows.keys())[:15]:
    r_words = sorted(rows[y], key=lambda w: w['x'])
    print(f"y={y:4d}: " + " | ".join([f"{w['text']} (x={w['x']})" for w in r_words]))
