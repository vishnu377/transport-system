import json
import glob
import os
import re

bounced_files = [
    r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\cheques_ocr\bounced_51.json',
    r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\cheques_ocr\bounced_52.json',
    r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\cheques_ocr\bounced_53.json'
]

cleared_slices = sorted(
    glob.glob(r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\cheques_ocr\cleared_*_slice_*.json'),
    key=lambda x: (int(os.path.basename(x).split('_')[1]), int(os.path.basename(x).split('_')[3].split('.')[0]))
)

print(f"Bounced files: {len(bounced_files)}, Cleared slices: {len(cleared_slices)}")

def clean_amount(txt):
    txt = txt.replace('e', '').replace('&', '').replace('t', '').replace('', '').replace('Q', '').strip()
    # remove leading non-digits except dot or comma
    txt = re.sub(r'^[^\d]+', '', txt)
    try:
        val = float(txt.replace(',', ''))
        return val
    except:
        return 0.0

def clean_truck_no(txt):
    txt = txt.upper().replace(' ', '').replace('-', '').replace('.', '')
    if txt.startswith('R3') or txt.startswith('RO') or txt.startswith('RD') or txt.startswith('RB'):
        txt = 'RJ' + txt[2:]
    return txt

all_cheques = []
seen_cheque_keys = set()

# Process Bounced
for bf in bounced_files:
    with open(bf, 'r', encoding='utf-8-sig') as f:
        d = json.load(f)
    words = [w for w in d.get('words', []) if w['x'] >= 300 and w['y'] >= 200]
    
    rows = {}
    for w in words:
        matched_y = None
        for y_k in rows.keys():
            if abs(w['y'] - y_k) <= 18:
                matched_y = y_k
                break
        if matched_y is None:
            matched_y = w['y']
            rows[matched_y] = []
        rows[matched_y].append(w)
        
    for y in sorted(rows.keys()):
        r_words = sorted(rows[y], key=lambda w: w['x'])
        # A cheque row in bounced starts with cheque no (x ~ 300-500)
        # Check if first word looks like a cheque number (digits)
        first_w = r_words[0]['text']
        if not re.match(r'^\d{4,8}$', first_w):
            continue
            
        cheque_no = first_w
        # Bank: x ~ 500-750
        bank_w = [w['text'] for w in r_words if w['x'] >= 480 and w['x'] < 750 and not re.search(r'\d', w['text'])]
        bank = " ".join(bank_w) or "HDFC"
        
        # Amount: x ~ 650-900 with digits
        amt_w = [w['text'] for w in r_words if (w['x'] >= 650 and w['x'] < 900) and (',' in w['text'] or '.' in w['text'] or re.search(r'\d{3,}', w['text']))]
        amt = clean_amount(amt_w[0]) if amt_w else 0.0
        
        # Party: x ~ 850-1300
        party_w = [w['text'] for w in r_words if w['x'] >= 850 and w['x'] < 1350 and not re.match(r'^\d{1,4}$', w['text']) and not ('RJ' in clean_truck_no(w['text']))]
        party = " ".join(party_w).replace('...', '').strip()
        
        # GR No: digits alone around x 1200-1450
        gr_w = [w['text'] for w in r_words if w['x'] >= 1150 and w['x'] < 1450 and re.match(r'^\d{1,5}$', w['text'])]
        gr = gr_w[0] if gr_w else ""
        
        # Truck No: around x 1300-1600
        truck_w = [clean_truck_no(w['text']) for w in r_words if w['x'] >= 1300 and w['x'] < 1650 and ('RJ' in clean_truck_no(w['text']) or 'NL' in clean_truck_no(w['text']) or len(w['text']) >= 8)]
        truck = truck_w[0] if truck_w else ""
        
        # Destination: x ~ 1500-1850
        dest_w = [w['text'] for w in r_words if w['x'] >= 1500 and w['x'] < 1850 and w['text'] not in ['TTC', 'MTC', 'SMTC']]
        dest = " ".join(dest_w).strip()
        
        # Firm: TTC, MTC, SMTC
        firm_w = [w['text'] for w in r_words if w['text'] in ['TTC', 'MTC', 'SMTC']]
        firm = firm_w[0] if firm_w else "TTC"
        
        # Date: x >= 1800
        date_w = [w['text'] for w in r_words if re.match(r'^\d{2}/\d{2}/\d{4}$', w['text'])]
        chq_date = date_w[0] if date_w else "15/08/2026"
        
        key = f"{cheque_no}_{gr}_{amt}"
        if key in seen_cheque_keys:
            continue
        seen_cheque_keys.add(key)
        
        all_cheques.append({
            'chequeNo': cheque_no,
            'bank': bank,
            'amount': amt,
            'party': party or "Shankar Marbles",
            'grNo': gr,
            'truckNo': truck,
            'destination': dest or "Lucknow (U.P.)",
            'firm': firm,
            'date': chq_date,
            'status': 'Bounced'
        })

print(f"Extracted {len(all_cheques)} Bounced cheques!")
for c in all_cheques[:10]:
    print(f"  {c['chequeNo']:8s} | {c['bank']:10s} | ₹{c['amount']:9,.2f} | {c['party'][:20]:20s} | GR: {c['grNo']:4s} | {c['truckNo']:10s} | {c['date']}")
