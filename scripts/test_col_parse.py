# -*- coding: utf-8 -*-
import json

def test_column_parse(json_path):
    with open(json_path, 'r', encoding='utf-8-sig') as f:
        data = json.load(f)
    words = [w for w in data.get('words', []) if w['y'] >= 180]
    words.sort(key=lambda w: (w['y'], w['x']))
    
    rows = []
    curr = []
    curr_y = None
    for w in words:
        if curr_y is None:
            curr_y = w['y']
            curr.append(w)
        elif abs(w['y'] - curr_y) <= 12:
            curr.append(w)
            curr_y = sum(x['y'] for x in curr) / len(curr)
        else:
            curr.sort(key=lambda x: x['x'])
            rows.append(curr)
            curr = [w]
            curr_y = w['y']
    if curr:
        curr.sort(key=lambda x: x['x'])
        rows.append(curr)
        
    current_date = ""
    parsed_records = []
    
    for r in rows:
        row_str = " ".join(w['text'] for w in r)
        # Check if date header row (e.g. "23/09/2026 2,000.00")
        if any(w['text'].count('/') == 2 for w in r) and len(r) <= 4:
            # It's a date group header!
            for w in r:
                if w['text'].count('/') == 2:
                    current_date = w['text']
            print(f">>> DATE HEADER: {current_date} (Full: {row_str})")
            continue
            
        col_gr = " ".join(w['text'] for w in r if w['x'] < 150)
        col_truck = " ".join(w['text'] for w in r if 150 <= w['x'] < 270)
        col_to = " ".join(w['text'] for w in r if 270 <= w['x'] < 440)
        col_type = " ".join(w['text'] for w in r if 440 <= w['x'] < 560)
        col_due = " ".join(w['text'] for w in r if 560 <= w['x'] < 670)
        col_debt = " ".join(w['text'] for w in r if 670 <= w['x'] < 780)
        col_mode = " ".join(w['text'] for w in r if 780 <= w['x'] < 850)
        col_borrower = " ".join(w['text'] for w in r if 850 <= w['x'] < 1010)
        col_receiver = " ".join(w['text'] for w in r if 1010 <= w['x'] < 1180)
        col_date = " ".join(w['text'] for w in r if w['x'] >= 1180)
        
        row_date = col_date if col_date else current_date
        
        parsed_records.append({
            "date": row_date,
            "gr": col_gr,
            "truck": col_truck,
            "to": col_to,
            "type": col_type,
            "due": col_due,
            "debt": col_debt,
            "mode": col_mode,
            "borrower": col_borrower,
            "receiver": col_receiver
        })
        
    print(f"\nParsed {len(parsed_records)} data records:")
    for rec in parsed_records[:15]:
        print(f"[{rec['date']:10}] GR:{rec['gr']:10} | Trk:{rec['truck']:10} | To:{rec['to']:15} | Type:{rec['type']:10} | Due:{rec['due']:10} | Borrower:{rec['borrower']:20} | Recv:{rec['receiver']}")

test_column_parse("scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_30_PM.json")

