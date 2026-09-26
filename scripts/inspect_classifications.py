import json

with open(r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\header_classifications.json', 'r', encoding='utf-8-sig') as f:
    data = json.load(f)

for k, v in data.items():
    cat = v['category']
    lines = v['lines'][:6]
    print(f"{k} [{cat}]: {' | '.join(lines)}")
