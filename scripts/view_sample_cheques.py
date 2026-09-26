import json

with open(r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\all_extracted_cheques.json', 'r', encoding='utf-8') as f:
    chqs = json.load(f)

print(f"Total cheques: {len(chqs)}")
for i, c in enumerate(chqs[:20]):
    print(f"{i+1:2d}. No: {c['chequeNo']:8s} | {c['bank']:12s} | Rs.{c['amount']:9,.2f} | {c['party'][:22]:22s} | GR:{c['grNo']:4s} | {c['truckNo']:10s} | {c['destination'][:15]:15s} | {c['firm']:4s} | {c['date']} | {c['status']}")
