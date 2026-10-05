import json
import urllib.request
import urllib.error
import re
import time
from datetime import datetime, timezone

PROJECT_ID = "mtc-ttc-logistics"
COLLECTION = "brokers"
BASE_URL = f"https://firestore.googleapis.com/v1/projects/{PROJECT_ID}/databases/(default)/documents:commit"

with open('scripts/extracted_brokers.json', 'r', encoding='utf-8') as f:
    raw_brokers = json.load(f)

# Filter & clean
clean_brokers = []
seen = set()

for idx, b in enumerate(raw_brokers):
    name = b['name'].strip()
    # Skip noise
    if len(name) < 2:
        continue
    # Must have at least 2 alphanumeric characters
    alnum_count = sum(1 for c in name if c.isalnum())
    if alnum_count < 2:
        continue
    # Skip header words or pure digits
    if name.lower() in ["name", "mobile", "mobile no.", "mobile no. 1", "number"]:
        continue
    if name.isdigit() and len(name) < 10:
        continue

    # Clean location if not set
    loc = b.get('location', '')
    mob = b.get('mobile', '')
    mob1 = b.get('mobile1', '')

    dedup_key = f"{name.lower()}_{mob}"
    if dedup_key in seen:
        continue
    seen.add(dedup_key)

    # Safe slug for ID
    slug = re.sub(r'[^a-zA-Z0-9]+', '_', name).strip('_')[:40].lower()
    doc_id = f"br_{idx:04d}_{slug}"

    clean_brokers.append({
        "doc_id": doc_id,
        "name": name,
        "mobile": mob,
        "mobile1": mob1,
        "location": loc,
        "commissionRate": b.get('commissionRate', '₹2,000 / Trip'),
        "source": "appsheet_master_import",
        "createdAt": datetime.now(timezone.utc).isoformat()
    })

print(f"Total cleaned brokers to upload: {len(clean_brokers)}")

# Batch in chunks of 300 (Firestore limit is 500 per commit)
BATCH_SIZE = 300
batches = [clean_brokers[i:i + BATCH_SIZE] for i in range(0, len(clean_brokers), BATCH_SIZE)]

total_written = 0

for batch_idx, batch in enumerate(batches):
    writes = []
    for item in batch:
        doc_path = f"projects/{PROJECT_ID}/databases/(default)/documents/{COLLECTION}/{item['doc_id']}"
        fields = {
            "name": {"stringValue": item['name']},
            "mobile": {"stringValue": item['mobile']},
            "mobile1": {"stringValue": item['mobile1']},
            "location": {"stringValue": item['location']},
            "commissionRate": {"stringValue": item['commissionRate']},
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

print(f"\nDONE! Successfully committed {total_written} brokers directly into Firebase Cloud Firestore collection '{COLLECTION}'!")
