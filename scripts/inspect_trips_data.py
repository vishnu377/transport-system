import json
import re

# Load sample trips data
with open(r'C:\Users\HP\.gemini\antigravity\scratch\transport-system\js\sample-trips-data.js', 'r', encoding='utf-8') as f:
    trips_text = f.read()

# Extract json array
m = re.search(r'window\.INITIAL_EXCEL_TRIPS\s*=\s*(\[.*?\]);', trips_text, re.DOTALL)
if m:
    trips = json.loads(m.group(1))
    print(f"Loaded {len(trips)} trips from sample-trips-data.js")
    
    # Check trucks in trips
    trips_trucks = set(t.get('truckNo', '') for t in trips if t.get('truckNo'))
    print(f"Unique trucks in trips: {len(trips_trucks)}")
    
    # Check sample trip fields
    if trips:
        print("Sample trip fields:", list(trips[0].keys()))
        print("Sample trip 0:", trips[0])
else:
    print("Could not parse trips from sample-trips-data.js")
