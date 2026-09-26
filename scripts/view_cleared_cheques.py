import json

with open(r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\all_extracted_cheques.json', 'r', encoding='utf-8') as f:
    chqs = json.load(f)

cleared = [c for c in chqs if c['status'] == 'Cleared']
print(f"Total cleared cheques: {len(cleared)}")
for i, c in enumerate(cleared[:15]):
    print(f"{i+1:2d}. No: {c['chequeNo']:8s} | {c['bank']:14s} | Rs.{c['amount']:9,.2f} | {c['party'][:22]:22s} | GR:{c['grNo']:4s} | {c['truckNo']:10s} | {c['destination'][:15]:15s} | {c['firm']:4s} | {c['date']}")
