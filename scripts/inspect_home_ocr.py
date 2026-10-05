import json

with open('scripts/home_screen_ocr.json', encoding='utf-8-sig') as f:
    d = json.load(f)

print(f"Total lines: {len(d.get('lines', []))}")
for i, l in enumerate(d.get('lines', [])):
    print(f"{i:2d}: {l}")

print("\nWord bounding boxes for items:")
keywords = ["Bilty", "Ledger", "Trips", "Cheques", "Created", "Parties", "Owners", "DEF", "Shahpura", "PDF", "Brokers", "Drivers", "Partnership"]
for w in d.get('words', []):
    for k in keywords:
        if k.lower() in w['text'].lower():
            print(f"  {w['text']:20} at x={w['x']}, y={w['y']}, w={w['w']}, h={w['h']}")
