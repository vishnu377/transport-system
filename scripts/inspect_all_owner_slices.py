import json
import glob
import os

slices = sorted(glob.glob(r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\owners_ocr\file0_slice_*.json'),
                key=lambda x: int(os.path.basename(x).split('_')[2].split('.')[0]))

print(f"Found {len(slices)} slices for File 0")

for s in slices:
    with open(s, 'r', encoding='utf-8-sig') as f:
        d = json.load(f)
    words = d.get('words', [])
    # Find truck numbers starting with RJ or R3 or similar
    trucks = [w['text'] for w in words if ('R3' in w['text'] or 'RJ' in w['text'] or 'NL' in w['text']) and len(w['text']) >= 8]
    print(f"{os.path.basename(s)}: {len(words)} words, detected {len(trucks)} truck numbers")
