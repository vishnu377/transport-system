import json
import os
import re

with open('scripts/ttc_slices/img_11/slice_00_0_2400.json', 'r', encoding='utf-8-sig') as f:
    d = json.load(f)

words = d.get('words', [])
print(f"Total words: {len(words)}")

# Cluster words into horizontal rows by Y
sorted_words = sorted(words, key=lambda w: (w['y'], w['x']))
rows = []
curr = []
last_y = -1
for w in sorted_words:
    if last_y == -1 or abs(w['y'] - last_y) < 14:
        curr.append(w)
        last_y = w['y']
    else:
        rows.append(curr)
        curr = [w]
        last_y = w['y']
if curr:
    rows.append(curr)

print(f"Total row clusters: {len(rows)}")
for idx, r in enumerate(rows):
    row_words = sorted(r, key=lambda x: x['x'])
    line_text = ' '.join(w['text'] for w in row_words)
    print(f"[{idx:02d}] Y={r[0]['y']}: {line_text}")
