import zipfile
import xml.etree.ElementTree as ET
import json
import os
import re
from datetime import datetime, timedelta

EXCEL_PATH = r'C:\Users\HP\Downloads\GR14926 (2).xlsx'
OUTPUT_JS_PATH = r'C:\Users\HP\.gemini\antigravity\scratch\transport-system\js\sample-trips-data.js'

def parse_excel_date(v):
    if not v:
        return ''
    try:
        val_float = float(v)
        # Excel date epoch starts 1899-12-30
        dt = datetime(1899, 12, 30) + timedelta(days=int(val_float))
        return dt.strftime('%Y-%m-%d')
    except (ValueError, OverflowError):
        pass
    
    # Try standard string date formats
    for fmt in ('%m/%d/%Y', '%d/%m/%Y', '%Y-%m-%d', '%m/%d/%y', '%d/%m/%y'):
        try:
            return datetime.strptime(v.strip(), fmt).strftime('%Y-%m-%d')
        except ValueError:
            pass
    return v

def clean_num(v, default=0.0):
    if not v:
        return default
    try:
        return float(str(v).replace(',', '').strip())
    except ValueError:
        return default

def normalize_firm(gr_str, firm_part=''):
    gr_upper = (gr_str or '').upper()
    firm_upper = (firm_part or '').upper()
    if 'SMTC' in gr_upper or 'MAHAVEER' in gr_upper or 'SMTC' in firm_upper:
        return 'SMTC'
    elif 'MTC' in gr_upper or 'MTC' in firm_upper:
        return 'MTC'
    return 'TTC'

def run():
    print(f"Reading Excel: {EXCEL_PATH}...")
    if not os.path.exists(EXCEL_PATH):
        print(f"Error: File not found at {EXCEL_PATH}")
        return

    with zipfile.ZipFile(EXCEL_PATH, 'r') as z:
        shared_strings = []
        if 'xl/sharedStrings.xml' in z.namelist():
            tree = ET.fromstring(z.read('xl/sharedStrings.xml'))
            for si in tree.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
                t_elems = si.findall('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t')
                shared_strings.append(''.join([t.text or '' for t in t_elems]))

        sheet_tree = ET.fromstring(z.read('xl/worksheets/sheet1.xml'))
        rows = sheet_tree.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheetData/{http://schemas.openxmlformats.org/spreadsheetml/2006/main}row')
        print(f"Total rows found: {len(rows)}")

        header_row = rows[0]
        col_names = {}
        for c in header_row.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c'):
            r_ref = c.get('r')
            col_letter = re.match(r'([A-Z]+)', r_ref).group(1)
            t = c.get('t')
            v = c.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}v')
            val = v.text if v is not None else ''
            if t == 's' and val.isdigit():
                val = shared_strings[int(val)]
            col_names[col_letter] = val

        print("Columns detected:", col_names)

        trips = []
        trucks_set = set()
        parties_set = set()

        for idx, r in enumerate(rows[1:], start=1):
            row_dict = {}
            for c in r.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c'):
                r_ref = c.get('r')
                col_letter = re.match(r'([A-Z]+)', r_ref).group(1)
                t = c.get('t')
                v = c.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}v')
                val = v.text if v is not None else ''
                if t == 's' and val.isdigit():
                    val = shared_strings[int(val)]
                row_dict[col_names.get(col_letter, col_letter)] = val.strip()

            start_date_raw = row_dict.get('Start Date', '')
            parsed_date = parse_excel_date(start_date_raw)
            truck_no = (row_dict.get('Truck No.', '') or '').upper().replace(' ', '')
            gr_seq = row_dict.get('G.R.No.', '')
            destination = row_dict.get('Destination', '')
            gr_no = row_dict.get('G.R. No.', '')
            weight = clean_num(row_dict.get('Weight', 0))
            rate = clean_num(row_dict.get('Rate', 0))
            freight = clean_num(row_dict.get('Freight', 0))
            paid = clean_num(row_dict.get('Paid', 0))
            due = clean_num(row_dict.get('Due', 0))
            year = row_dict.get('Year', '') or '2026-2027'
            bill_no = row_dict.get('Bill No.', '')
            address = row_dict.get('Address', '')
            loading_charges = clean_num(row_dict.get('Loading Charges', 0))
            is_gst_paid = row_dict.get('Is GST Paid by Party?', '')
            gst_amount = clean_num(row_dict.get('GST Amount', 0))
            gst_due_amount = clean_num(row_dict.get('GST Due Amount', 0))
            short_gr = row_dict.get('N_G.R.No.', '')

            if not gr_no and short_gr:
                gr_no = f"{year}-{short_gr}"
            elif not gr_no and gr_seq:
                gr_no = f"{year}-{gr_seq}_TTC"

            transport = normalize_firm(gr_no, short_gr)

            # Determine consignee from Address or Destination
            consignee = destination
            if address:
                # Often address starts with party or location
                parts = [p.strip() for p in address.split(',') if p.strip()]
                if parts:
                    consignee = parts[0]

            # Determine status
            status = 'Settled'
            if due > 0:
                # Check if recent
                if parsed_date >= '2026-08-01':
                    status = 'Transit'
                else:
                    status = 'Due'

            trip_item = {
                "id": f"TRIP_{idx:05d}",
                "grNo": gr_no,
                "grSeq": gr_seq,
                "shortGrNo": short_gr,
                "transport": transport,
                "biltyType": "Regular",
                "financialYear": year,
                "tripStartDate": parsed_date,
                "truckNo": truck_no,
                "truckOwner": f"{truck_no} Fleet Owner",
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
            if consignee:
                parties_set.add(consignee)

        print(f"Successfully processed {len(trips)} trips.")
        print(f"Unique trucks found: {len(trucks_set)}")
        print(f"Unique parties/destinations: {len(parties_set)}")

        # Write to js/sample-trips-data.js
        os.makedirs(os.path.dirname(OUTPUT_JS_PATH), exist_ok=True)
        with open(OUTPUT_JS_PATH, 'w', encoding='utf-8') as f:
            f.write("// Auto-generated from Mosa ji's GR14926 (2).xlsx\n")
            f.write(f"// Total Records: {len(trips)}\n")
            f.write("window.INITIAL_EXCEL_TRIPS = ")
            json.dump(trips, f, ensure_ascii=False)
            f.write(";\n\n")
            
            # Also export trucks
            trucks_list = [{"id": f"TRK_{i+1:03d}", "truckNo": trk, "name": f"{trk} (Fleet)", "type": "Own" if i < 15 else "Market", "mobile": "9414312586"} for i, trk in enumerate(sorted(trucks_set))]
            f.write("window.INITIAL_EXCEL_TRUCKS = ")
            json.dump(trucks_list, f, ensure_ascii=False)
            f.write(";\n")

        print(f"Saved dataset to {OUTPUT_JS_PATH} ({os.path.getsize(OUTPUT_JS_PATH) / 1024 / 1024:.2f} MB)")

if __name__ == '__main__':
    run()
