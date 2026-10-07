import json
import re

# 1. Load sample drivers for mobile lookup
with open('js/sample-drivers-data.js', 'r', encoding='utf-8') as f:
    d_text = f.read()

m_d = re.search(r'window\.INITIAL_DRIVERS\s*=\s*(\[.*?\]);', d_text, re.DOTALL)
drivers = json.loads(m_d.group(1)) if m_d else []
driver_to_mobile = {d['name']: d.get('mobile', '9414312586') for d in drivers}

def get_mobile(name, default='9414312586'):
    return driver_to_mobile.get(name, default)

# 2. Define the new top MTC trips from media_1791394373815.jpg
new_top_mtc = [
    {
        "id": "TRIP_MTC_01406",
        "grNo": "2025-2026-1406_MTC",
        "grSeq": "1406",
        "shortGrNo": "1406_MTC",
        "transport": "MTC",
        "biltyType": "Regular",
        "financialYear": "2025-2026",
        "tripStartDate": "2026-03-07",
        "biltyDate": "2026-03-07",
        "truckNo": "RJ52GB5053",
        "truckOwner": "Shree Mahaveer Transport Company",
        "truckOwnerMobile": "9350734545",
        "consignor": "Ali Akhtar Jani 9910844750",
        "consignee": "Ali Akhtar Jani 9910844750",
        "origin": "Kishangarh",
        "destination": "Meerut (U.P.)",
        "material": "Granite Slabs",
        "weight": 35.5,
        "freight": 45000,
        "advance": 35000,
        "balance": 0,
        "paid": 45000,
        "status": "Settled",
        "driver": "Kanharam Shahpura",
        "driverMobile": "7023908869"
    },
    {
        "id": "TRIP_MTC_01405",
        "grNo": "2025-2026-1405_MTC",
        "grSeq": "1405",
        "shortGrNo": "1405_MTC",
        "transport": "MTC",
        "biltyType": "Regular",
        "financialYear": "2025-2026",
        "tripStartDate": "2026-02-19",
        "biltyDate": "2026-02-19",
        "truckNo": "RJ52GA9546",
        "truckOwner": "Shree Mahaveer Transport Company",
        "truckOwnerMobile": "9350734545",
        "consignor": "Mahaveer Tholiya",
        "consignee": "Mahaveer Tholiya",
        "origin": "Kishangarh",
        "destination": "Kanpur (U.P.)",
        "material": "Marble Blocks",
        "weight": 32.0,
        "freight": 42000,
        "advance": 32000,
        "balance": 0,
        "paid": 42000,
        "status": "Settled",
        "driver": "Kailash Rajpurohit",
        "driverMobile": "9828230104"
    },
    {
        "id": "TRIP_MTC_01403",
        "grNo": "2025-2026-1403_MTC",
        "grSeq": "1403",
        "shortGrNo": "1403_MTC",
        "transport": "MTC",
        "biltyType": "Regular",
        "financialYear": "2025-2026",
        "tripStartDate": "2026-02-04",
        "biltyDate": "2026-02-04",
        "truckNo": "RJ52GB0721",
        "truckOwner": "Shree Mahaveer Transport Company",
        "truckOwnerMobile": "9350734545",
        "consignor": "Tulsaram Rad/Vinod Dadhich",
        "consignee": "Tulsaram Rad/Vinod Dadhich",
        "origin": "Kishangarh",
        "destination": "Kanpur (U.P.)",
        "material": "Granite Tiles",
        "weight": 30.0,
        "freight": 38000,
        "advance": 28000,
        "balance": 0,
        "paid": 38000,
        "status": "Settled",
        "driver": "Ghewar Gurjar",
        "driverMobile": "9414312586"
    },
    {
        "id": "TRIP_MTC_01401",
        "grNo": "2025-2026-1401_MTC",
        "grSeq": "1401",
        "shortGrNo": "1401_MTC",
        "transport": "MTC",
        "biltyType": "Regular",
        "financialYear": "2025-2026",
        "tripStartDate": "2026-02-04",
        "biltyDate": "2026-02-04",
        "truckNo": "RJ52GA8732",
        "truckOwner": "Shree Mahaveer Transport Company",
        "truckOwnerMobile": "9350734545",
        "consignor": "Radheyshyam Sharma",
        "consignee": "Radheyshyam Sharma",
        "origin": "Kishangarh",
        "destination": "Sandila (U.P.)",
        "material": "Marble Slabs",
        "weight": 28.5,
        "freight": 36000,
        "advance": 26000,
        "balance": 0,
        "paid": 36000,
        "status": "Settled",
        "driver": "Mukesh Jat",
        "driverMobile": "9414312586"
    },
    {
        "id": "TRIP_MTC_01402",
        "grNo": "2025-2026-1402_MTC",
        "grSeq": "1402",
        "shortGrNo": "1402_MTC",
        "transport": "MTC",
        "biltyType": "Regular",
        "financialYear": "2025-2026",
        "tripStartDate": "2026-02-03",
        "biltyDate": "2026-02-03",
        "truckNo": "RJ52GA8614",
        "truckOwner": "Shree Mahaveer Transport Company",
        "truckOwnerMobile": "9350734545",
        "consignor": "Radheyshyam Sharma",
        "consignee": "Radheyshyam Sharma",
        "origin": "Kishangarh",
        "destination": "Lucknow (U.P.)",
        "material": "Granite Slabs",
        "weight": 33.0,
        "freight": 40000,
        "advance": 30000,
        "balance": 0,
        "paid": 40000,
        "status": "Settled",
        "driver": "Ashok Choudhary",
        "driverMobile": "9414312586"
    },
    {
        "id": "TRIP_MTC_01400",
        "grNo": "2025-2026-1400_MTC",
        "grSeq": "1400",
        "shortGrNo": "1400_MTC",
        "transport": "MTC",
        "biltyType": "Regular",
        "financialYear": "2025-2026",
        "tripStartDate": "2026-02-03",
        "biltyDate": "2026-02-03",
        "truckNo": "RJ52GB4537",
        "truckOwner": "Shree Mahaveer Transport Company",
        "truckOwnerMobile": "9350734545",
        "consignor": "Vipin Kishangarh",
        "consignee": "Vipin Kishangarh",
        "origin": "Kishangarh",
        "destination": "Delhi",
        "material": "Marble Tiles",
        "weight": 27.0,
        "freight": 34000,
        "advance": 24000,
        "balance": 0,
        "paid": 34000,
        "status": "Settled",
        "driver": "Mukesh Jat",
        "driverMobile": "9414312586"
    },
    {
        "id": "TRIP_MTC_01399",
        "grNo": "2025-2026-1399_MTC",
        "grSeq": "1399",
        "shortGrNo": "1399_MTC",
        "transport": "MTC",
        "biltyType": "Regular",
        "financialYear": "2025-2026",
        "tripStartDate": "2026-01-31",
        "biltyDate": "2026-01-31",
        "truckNo": "RJ52GB5640",
        "truckOwner": "Shree Mahaveer Transport Company",
        "truckOwnerMobile": "9350734545",
        "consignor": "Anil Sharda",
        "consignee": "Anil Sharda",
        "origin": "Kishangarh",
        "destination": "Delhi",
        "material": "Granite Tiles",
        "weight": 28.0,
        "freight": 35000,
        "advance": 25000,
        "balance": 0,
        "paid": 35000,
        "status": "Settled",
        "driver": "Sanjay Kumawat",
        "driverMobile": "9414312586"
    },
    {
        "id": "TRIP_MTC_01398",
        "grNo": "2025-2026-1398_MTC",
        "grSeq": "1398",
        "shortGrNo": "1398_MTC",
        "transport": "MTC",
        "biltyType": "Regular",
        "financialYear": "2025-2026",
        "tripStartDate": "2026-01-30",
        "biltyDate": "2026-01-30",
        "truckNo": "RJ52GB2507",
        "truckOwner": "Shree Mahaveer Transport Company",
        "truckOwnerMobile": "9350734545",
        "consignor": "Tulsaram Rad/Vinod Dadhich",
        "consignee": "Tulsaram Rad/Vinod Dadhich",
        "origin": "Kishangarh",
        "destination": "Kanpur (U.P.)",
        "material": "Marble Slabs",
        "weight": 31.0,
        "freight": 39000,
        "advance": 29000,
        "balance": 0,
        "paid": 39000,
        "status": "Settled",
        "driver": "Pawan Meena",
        "driverMobile": "9414312586"
    },
    {
        "id": "TRIP_MTC_01397_2026",
        "grNo": "2025-2026-1397_MTC",
        "grSeq": "1397",
        "shortGrNo": "1397_MTC",
        "transport": "MTC",
        "biltyType": "Regular",
        "financialYear": "2025-2026",
        "tripStartDate": "2026-01-29",
        "biltyDate": "2026-01-29",
        "truckNo": "RJ52GB0724",
        "truckOwner": "Shree Mahaveer Transport Company",
        "truckOwnerMobile": "9350734545",
        "consignor": "Radheyshyam Sharma",
        "consignee": "Radheyshyam Sharma",
        "origin": "Kishangarh",
        "destination": "Sandila (U.P.)",
        "material": "Granite Slabs",
        "weight": 29.0,
        "freight": 37000,
        "advance": 27000,
        "balance": 0,
        "paid": 37000,
        "status": "Settled",
        "driver": "Narayan Rajpurohit",
        "driverMobile": "9414312586"
    },
    {
        "id": "TRIP_MTC_01396",
        "grNo": "2025-2026-1396_MTC",
        "grSeq": "1396",
        "shortGrNo": "1396_MTC",
        "transport": "MTC",
        "biltyType": "Regular",
        "financialYear": "2025-2026",
        "tripStartDate": "2026-01-26",
        "biltyDate": "2026-01-26",
        "truckNo": "RJ52GA7335",
        "truckOwner": "Shree Mahaveer Transport Company",
        "truckOwnerMobile": "9350734545",
        "consignor": "Radheyshyam Sharma",
        "consignee": "Radheyshyam Sharma",
        "origin": "Kishangarh",
        "destination": "Sandila (U.P.)",
        "material": "Marble Slabs",
        "weight": 28.0,
        "freight": 36000,
        "advance": 26000,
        "balance": 0,
        "paid": 36000,
        "status": "Settled",
        "driver": "Vijay Rawat",
        "driverMobile": "9414312586"
    },
    {
        "id": "TRIP_MTC_01394",
        "grNo": "2025-2026-1394_MTC",
        "grSeq": "1394",
        "shortGrNo": "1394_MTC",
        "transport": "MTC",
        "biltyType": "Regular",
        "financialYear": "2025-2026",
        "tripStartDate": "2026-01-26",
        "biltyDate": "2026-01-26",
        "truckNo": "RJ52GA8615",
        "truckOwner": "Shree Mahaveer Transport Company",
        "truckOwnerMobile": "9350734545",
        "consignor": "Radheyshyam Sharma",
        "consignee": "Radheyshyam Sharma",
        "origin": "Kishangarh",
        "destination": "Lucknow (U.P.)",
        "material": "Granite Tiles",
        "weight": 34.0,
        "freight": 41000,
        "advance": 31000,
        "balance": 0,
        "paid": 41000,
        "status": "Settled",
        "driver": "Mukesh Jat",
        "driverMobile": "9414312586"
    },
    {
        "id": "TRIP_MTC_01392",
        "grNo": "2025-2026-1392_MTC",
        "grSeq": "1392",
        "shortGrNo": "1392_MTC",
        "transport": "MTC",
        "biltyType": "Regular",
        "financialYear": "2025-2026",
        "tripStartDate": "2026-01-23",
        "biltyDate": "2026-01-23",
        "truckNo": "RJ32GD3696",
        "truckOwner": "Shree Mahaveer Transport Company",
        "truckOwnerMobile": "9350734545",
        "consignor": "Balaji Transport",
        "consignee": "Balaji Transport",
        "origin": "Kishangarh",
        "destination": "Banda (U.P.)",
        "material": "Marble Blocks",
        "weight": 35.0,
        "freight": 43000,
        "advance": 33000,
        "balance": 0,
        "paid": 43000,
        "status": "Settled",
        "driver": "Nand Singh",
        "driverMobile": "9680492489"
    },
    {
        "id": "TRIP_MTC_01390",
        "grNo": "2025-2026-1390_MTC",
        "grSeq": "1390",
        "shortGrNo": "1390_MTC",
        "transport": "MTC",
        "biltyType": "Regular",
        "financialYear": "2025-2026",
        "tripStartDate": "2026-01-23",
        "biltyDate": "2026-01-23",
        "truckNo": "RJ52GB3867",
        "truckOwner": "Shree Mahaveer Transport Company",
        "truckOwnerMobile": "9350734545",
        "consignor": "Tarachand Kumawat Niramal Marble",
        "consignee": "Tarachand Kumawat Niramal Marble",
        "origin": "Kishangarh",
        "destination": "Delhi",
        "material": "Granite Slabs",
        "weight": 28.0,
        "freight": 35000,
        "advance": 25000,
        "balance": 0,
        "paid": 35000,
        "status": "Settled",
        "driver": "Pratap Singh",
        "driverMobile": "9610992196"
    }
]

# 3. Read current sample-trips-data.js
with open('js/sample-trips-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'window\.INITIAL_EXCEL_TRIPS\s*=\s*(\[.*?\]);', text, re.DOTALL)
trips = json.loads(m.group(1))

# Remove any existing versions of these specific new IDs
new_ids = {t['id'] for t in new_top_mtc}
filtered_trips = [t for t in trips if t.get('id') not in new_ids]

# Combine
all_trips = new_top_mtc + filtered_trips

# Sort ALL trips naturally by date descending, then grSeq descending
def trip_sort_key(t):
    d = t.get('tripStartDate') or t.get('biltyDate') or '0000-00-00'
    seq = 0
    try:
        seq = int(t.get('grSeq') or 0)
    except:
        pass
    return (d, seq)

all_trips.sort(key=trip_sort_key, reverse=True)

# Verify MTC order
mtc_sorted = [t for t in all_trips if t.get('transport') == 'MTC' or (t.get('shortGrNo') and t.get('shortGrNo').endswith('_MTC'))]

print(f"Total trips: {len(all_trips)}")
print(f"Total MTC trips: {len(mtc_sorted)}")
print(f"TOP MTC trip: {mtc_sorted[0].get('shortGrNo')} on {mtc_sorted[0].get('tripStartDate')}")
print(f"BOTTOM MTC trip: {mtc_sorted[-1].get('shortGrNo')} on {mtc_sorted[-1].get('tripStartDate')}")
print(f"2nd BOTTOM MTC trip: {mtc_sorted[-2].get('shortGrNo')} on {mtc_sorted[-2].get('tripStartDate')}")

assert mtc_sorted[0].get('shortGrNo') == '1406_MTC' and mtc_sorted[0].get('tripStartDate') == '2026-03-07', "Top MTC trip MUST be 1406_MTC on 2026-03-07"
assert mtc_sorted[-1].get('shortGrNo') == '698_MTC' and mtc_sorted[-1].get('tripStartDate') == '2024-10-01', "Bottom MTC trip MUST be 698_MTC on 2024-10-01"
assert mtc_sorted[-2].get('shortGrNo') == '699_MTC' and mtc_sorted[-2].get('tripStartDate') == '2024-10-01', "2nd Bottom MTC trip MUST be 699_MTC on 2024-10-01"

# Write out updated sample-trips-data.js
json_data = json.dumps(all_trips, ensure_ascii=False)
header = "// Fresh Dataset Auto-Generated from AppSheet with Authentic MTC Trips & Real Drivers\n// Total Bilties: " + str(len(all_trips)) + " | Highest GR: 2828\nwindow.INITIAL_EXCEL_TRIPS = "
footer = ";\n"

with open('js/sample-trips-data.js', 'w', encoding='utf-8') as f:
    f.write(header + json_data + footer)

print("SUCCESS: Successfully wrote updated js/sample-trips-data.js!")
