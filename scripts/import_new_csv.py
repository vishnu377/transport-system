import csv
import json
import os
import re
from datetime import datetime

CSV_PATH = r'C:\Users\HP\Downloads\AppSheet.ViewData.2026-09-21 (1).csv'
OUTPUT_JS_PATH = r'C:\Users\HP\.gemini\antigravity\scratch\transport-system\js\sample-trips-data.js'

def parse_date(v):
    if not v:
        return ''
    v = v.strip()
    for fmt in ('%m/%d/%Y', '%d/%m/%Y', '%Y-%m-%d', '%m/%d/%y', '%d/%m/%y'):
        try:
            return datetime.strptime(v, fmt).strftime('%Y-%m-%d')
        except ValueError:
            pass
    return v

def clean_num(v, default=0.0):
    if not v:
        return default
    v_str = str(v).replace('₹', '').replace(',', '').replace(' ', '').strip()
    try:
        return float(v_str)
    except ValueError:
        return default

def clean_seq(v):
    if not v:
        return ''
    return str(v).replace(',', '').strip()

def normalize_firm(gr_str, firm_part=''):
    gr_upper = (gr_str or '').upper()
    firm_upper = (firm_part or '').upper()
    if 'SMTC' in gr_upper or 'MAHAVEER' in gr_upper or 'SMTC' in firm_upper:
        return 'SMTC'
    elif 'MTC' in gr_upper or 'MTC' in firm_upper:
        return 'MTC'
    return 'TTC'

def run():
    print(f"Reading CSV from: {CSV_PATH}...")
    if not os.path.exists(CSV_PATH):
        print(f"Error: File not found at {CSV_PATH}")
        return

    trips = []
    trucks_set = set()
    destinations_set = set()
    highest_gr = 0

    with open(CSV_PATH, 'r', encoding='utf-8-sig', errors='replace') as f:
        reader = csv.DictReader(f)
        headers = reader.fieldnames
        print(f"Headers detected: {headers}")

        for idx, row in enumerate(reader, start=1):
            start_date = parse_date(row.get('Start Date', ''))
            truck_no = (row.get('Truck No.', '') or '').upper().replace(' ', '')
            gr_seq = clean_seq(row.get('G.R.No.', ''))
            destination = (row.get('Destination', '') or '').strip()
            gr_no = (row.get('G.R. No.', '') or '').strip()
            weight = clean_num(row.get('Weight', 0))
            rate = clean_num(row.get('Rate', 0))
            freight = clean_num(row.get('Freight', 0))
            if freight == 0 and weight > 0 and rate > 0:
                freight = weight * rate
            paid = clean_num(row.get('Paid', 0))
            due = clean_num(row.get('Due', 0))
            if due == 0 and paid == 0 and freight > 0:
                due = freight
            year = (row.get('Year', '') or '2026-2027').strip()
            month = (row.get('Month', '') or '').strip()
            bill_no = (row.get('Bill No.', '') or '').strip()
            address = (row.get('Address', '') or '').strip()
            loading_charges = clean_num(row.get('Loading Charges', 0))
            is_gst_paid = (row.get('Is GST Paid by Party?', '') or '').strip()
            gst_amount = clean_num(row.get('GST Amount', 0))
            gst_due_amount = clean_num(row.get('GST Due Amount', 0))
            short_gr = (row.get('N_G.R.No.', '') or '').strip()

            transport = normalize_firm(gr_no, short_gr)

            if not gr_no:
                gr_no = f"{year}-{gr_seq}_{transport}" if gr_seq else f"TRIP_{idx}"
            if not short_gr and gr_seq:
                short_gr = f"{gr_seq}_{transport}"

            # Track highest GR sequence
            try:
                numeric_gr = int(gr_seq)
                if numeric_gr > highest_gr:
                    highest_gr = numeric_gr
            except ValueError:
                pass

            consignee = destination.split('(')[0].strip() if destination else "Consignee Party"

            status = "Settled" if due <= 0 else ("Transit" if idx <= 20 else "Completed")

            trip_item = {
                "id": f"TRIP_{idx:05d}",
                "grNo": gr_no,
                "grSeq": gr_seq,
                "shortGrNo": short_gr,
                "transport": transport,
                "biltyType": "Regular",
                "financialYear": year,
                "tripStartDate": start_date or "2026-09-21",
                "truckNo": truck_no,
                "truckOwner": f"{truck_no} Owner" if truck_no else "Assigned Owner",
                "driver": "Assigned Driver",
                "driverMobile": "",
                "origin": "Rajsamand (Raj.)",
                "destination": destination,
                "deliveryAddress": address,
                "consignor": "MTC & TTC Logistics Consignor",
                "consignee": consignee,
                "material": "Marble Powder / Goods",
                "billingType": "Per Tonne",
                "weight": weight,
                "rate": rate,
                "freight": freight,
                "loadingCharges": loading_charges,
                "billNo": bill_no,
                "isGstPaidByParty": is_gst_paid if is_gst_paid else ("Yes" if gst_amount > 0 else "No"),
                "gstAmount": gst_amount,
                "gstDueAmount": gst_due_amount,
                "partyPaid": paid,
                "partyDue": due,
                "ownerDue": freight * 0.9,
                "commission": 0,
                "status": status
            }
            trips.append(trip_item)
            if truck_no:
                trucks_set.add(truck_no)
            if destination:
                destinations_set.add(destination)

    print(f"Successfully processed {len(trips)} trips from new CSV!")
    print(f"Highest GR Number: {highest_gr}")
    print(f"Unique trucks: {len(trucks_set)}")
    print(f"Unique destinations: {len(destinations_set)}")

    # Sort trips descending by tripStartDate and grNo
    trips.sort(key=lambda t: (t['tripStartDate'], t['grNo']), reverse=True)

    # Write to js/sample-trips-data.js
    os.makedirs(os.path.dirname(OUTPUT_JS_PATH), exist_ok=True)
    with open(OUTPUT_JS_PATH, 'w', encoding='utf-8') as f:
        f.write("// Fresh Dataset Auto-Generated from AppSheet.ViewData.2026-09-21 (1).csv\n")
        f.write(f"// Total Bilties: {len(trips)} | Highest GR: {highest_gr}\n")
        f.write("window.INITIAL_EXCEL_TRIPS = ")
        json.dump(trips, f, ensure_ascii=False)
        f.write(";\n\n")

        # Export trucks
        trucks_list = [{"id": f"TRK_{i+1:03d}", "truckNo": trk, "name": f"{trk} (Fleet)", "type": "Own" if i < 20 else "Market", "mobile": "9414312586"} for i, trk in enumerate(sorted(trucks_set))]
        f.write("window.INITIAL_EXCEL_TRUCKS = ")
        json.dump(trucks_list, f, ensure_ascii=False)
        f.write(";\n")

    print(f"Successfully saved new dataset to {OUTPUT_JS_PATH} ({os.path.getsize(OUTPUT_JS_PATH) / 1024 / 1024:.2f} MB)")

if __name__ == '__main__':
    run()
