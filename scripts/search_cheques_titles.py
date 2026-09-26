import json

with open(r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\all_57_titles.json', 'r', encoding='utf-8') as f:
    titles = json.load(f)

for item in titles:
    t = item['title'].lower()
    for word in ['cheque', 'pending', 'deposit', 'bounced', 'cleared', 'hand']:
        if word in t:
            print(f"{item['file']} matched '{word}': {item['title'][:120]}")
            break
