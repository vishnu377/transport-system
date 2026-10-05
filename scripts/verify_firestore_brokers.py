import urllib.request
import json

url = 'https://firestore.googleapis.com/v1/projects/mtc-ttc-logistics/databases/(default)/documents/brokers?pageSize=100'
req = urllib.request.Request(url)
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    docs = data.get('documents', [])
    print(f"Sample of documents fetched (first {len(docs)}):")
    for d in docs[:10]:
        fields = d.get('fields', {})
        name = fields.get('name', {}).get('stringValue', '')
        mob = fields.get('mobile', {}).get('stringValue', '')
        mob1 = fields.get('mobile1', {}).get('stringValue', '')
        loc = fields.get('location', {}).get('stringValue', '')
        print(f"  - {name:30} | Mobile: {mob:12} | Secondary: {mob1:12} | Loc: {loc}")

# Also count total documents using structured query
count_url = 'https://firestore.googleapis.com/v1/projects/mtc-ttc-logistics/databases/(default)/documents:runAggregationQuery'
count_payload = {
    "structuredAggregationQuery": {
        "structuredQuery": {
            "from": [{"collectionId": "brokers"}]
        },
        "aggregations": [
            {"alias": "total_count", "count": {}}
        ]
    }
}
req2 = urllib.request.Request(count_url, data=json.dumps(count_payload).encode('utf-8'), headers={'Content-Type': 'application/json'})
with urllib.request.urlopen(req2) as resp:
    res = json.loads(resp.read().decode('utf-8'))
    count_val = res[0].get('result', {}).get('aggregateFields', {}).get('total_count', {}).get('integerValue', '0')
    print(f"\nTOTAL BROKERS IN FIREBASE FIRESTORE: {count_val}")
