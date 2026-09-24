# -*- coding: utf-8 -*-
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))
import generate_sample_debts as g
from collections import defaultdict

by_fy_m = defaultdict(lambda: defaultdict(list))
for d in g.debts:
    by_fy_m[d['fy']][d['monthKey']].append(d)

for fy in sorted(by_fy_m.keys(), reverse=True):
    print(f"\n=================== {fy} ===================")
    total_fy = sum(d['dueAmount'] for m in by_fy_m[fy].values() for d in m)
    print(f"Total FY: {total_fy:,.2f}")
    for m in by_fy_m[fy]:
        records = by_fy_m[fy][m]
        tot_m = sum(r['dueAmount'] for r in records)
        dates = [r['date'] for r in records]
        is_sorted_desc = dates == sorted(dates, reverse=True)
        print(f"  {m:10}: Count={len(records):3d} | Total={tot_m:11,.2f} | Range={min(dates)} to {max(dates)} | SortedDesc={is_sorted_desc}")
        if not is_sorted_desc:
            print(f"    --> UNORDERED DATES in {m}: {dates[:8]}")

