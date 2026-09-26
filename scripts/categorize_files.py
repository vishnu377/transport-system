import json

with open(r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\header_classifications.json', 'r', encoding='utf-8-sig') as f:
    data = json.load(f)

cheque_files = []
owner_files = []
trip_due_files = []
other_files = []

for k, v in data.items():
    lines = v['lines']
    full = (" ".join(lines)).lower()
    
    if "cheque" in full or "bounced" in full or "cleared" in full:
        cheque_files.append((k, lines[:5]))
    elif "owner due" in full or "owner paid" in full:
        owner_files.append((k, lines[:5]))
    elif "truck owners" in full or "owners" in full:
        owner_files.append((k, lines[:5]))
    elif any(x in full for x in ['_ttc', '_mtc', '_smtc', 'g.r.no']):
        trip_due_files.append((k, lines[:5]))
    else:
        other_files.append((k, lines[:5]))

print(f"=== CHEQUE FILES ({len(cheque_files)}) ===")
for k, l in cheque_files:
    print(f"  {k}: {' | '.join(l[:4])}")

print(f"\n=== TRUCK OWNER FILES ({len(owner_files)}) ===")
for k, l in owner_files:
    print(f"  {k}: {' | '.join(l[:4])}")

print(f"\n=== TRIP / OWNER DUE FILES ({len(trip_due_files)}) ===")
for k, l in trip_due_files:
    print(f"  {k}: {' | '.join(l[:4])}")

print(f"\n=== OTHER FILES ({len(other_files)}) ===")
for k, l in other_files:
    print(f"  {k}: {' | '.join(l[:4])}")
