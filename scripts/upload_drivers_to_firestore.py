import json
import urllib.request
import urllib.error
import re
import time
from datetime import datetime, timezone

PROJECT_ID = "mtc-ttc-logistics"
COLLECTION = "drivers"
BASE_URL = f"https://firestore.googleapis.com/v1/projects/{PROJECT_ID}/databases/(default)/documents:commit"

with open('scripts/extracted_drivers.json', 'r', encoding='utf-8') as f:
    raw_drivers = json.load(f)

clean_drivers = []
seen = set()

for idx, d in enumerate(raw_drivers):
    name = d['name'].strip()
    mob = d.get('mobile', '').strip()
    mob1 = d.get('mobile1', '').strip()
    owner = d.get('ownerName', '').strip() or "Independent / Unassigned"

    # Discard obvious OCR noise
    if len(name) < 4 and not mob:
        continue
    if name.lower() in ["driver", "owner", "name", "mobile", "mobile no", "search", "resources"]:
        continue

    # If name is purely digits
    if name.isdigit():
        if len(name) == 10 and not mob:
            mob = name
            name = f"Driver ({mob[-4:]})"
        elif len(name) <= 5:
            name = f"Driver {name}"

    # Clean name
    name = re.sub(r'[\*\_\~]+', '', name).strip()
    # Replace Gur-jar with Gurjar
    name = name.replace("Gur-jar", "Gurjar").replace("Gu rjar", "Gurjar")

    dedup_key = f"{name.lower()}_{mob}"
    if dedup_key in seen:
        continue
    seen.add(dedup_key)

    slug = re.sub(r'[^a-zA-Z0-9]+', '_', name).strip('_')[:40].lower()
    doc_id = f"drv_{idx:04d}_{slug}"

    clean_drivers.append({
        "doc_id": doc_id,
        "name": name,
        "ownerName": owner,
        "mobile": mob,
        "mobile1": mob1,
        "licenseNo": d.get('licenseNo', ''),
        "source": "appsheet_master_import",
        "createdAt": datetime.now(timezone.utc).isoformat()
    })

print(f"Total cleaned drivers to upload: {len(clean_drivers)}")

BATCH_SIZE = 300
batches = [clean_drivers[i:i + BATCH_SIZE] for i in range(0, len(clean_drivers), BATCH_SIZE)]

total_written = 0

for batch_idx, batch in enumerate(batches):
    writes = []
    for item in batch:
        doc_path = f"projects/{PROJECT_ID}/databases/(default)/documents/{COLLECTION}/{item['doc_id']}"
        fields = {
            "name": {"stringValue": item['name']},
            "ownerName": {"stringValue": item['ownerName']},
            "mobile": {"stringValue": item['mobile']},
            "mobile1": {"stringValue": item['mobile1']},
            "licenseNo": {"stringValue": item['licenseNo']},
            "source": {"stringValue": item['source']},
            "createdAt": {"stringValue": item['createdAt']}
        }
        writes.append({
            "update": {
                "name": doc_path,
                "fields": fields
            }
        })
    
    payload = {"writes": writes}
    data_bytes = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(BASE_URL, data=data_bytes, headers={"Content-Type": "application/json"})
    
    try:
        with urllib.request.urlopen(req) as resp:
            res_data = json.loads(resp.read().decode('utf-8'))
            results_count = len(res_data.get('writeResults', []))
            total_written += results_count
            print(f"Batch {batch_idx + 1}/{len(batches)} uploaded successfully! ({results_count} records, Commit: {res_data.get('commitTime')})")
    except urllib.error.HTTPError as e:
        print(f"HTTPError in Batch {batch_idx + 1}: {e.code} - {e.read().decode('utf-8')}")
        raise
    
    time.sleep(0.5)

print(f"\nDONE! Successfully committed {total_written} drivers directly into Firebase Cloud Firestore collection '{COLLECTION}'!")
