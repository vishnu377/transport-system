# -*- coding: utf-8 -*-
import os
import json
import glob
import re

def inspect_all():
    files = glob.glob("scripts/ocr_ledger_all/*.json") + glob.glob("scripts/ocr_newsave/*.json")
    mapping = []
    
    for f in sorted(files):
        with open(f, 'r', encoding='utf-8-sig') as fp:
            data = json.load(fp)
            
        fname = data.get('fileName', os.path.basename(f))
        lines = data.get('lines', [])
        
        # Check title / breadcrumbs
        # Often: "Home > Ledger > 2024-2025" or "Open > 2 May" or "6 Sep"
        folder = "ledger_all" if "ocr_ledger_all" in f else "newsave"
        
        # Extract dates
        dates = []
        for line in lines:
            d_matches = re.findall(r'\b\d{2}/\d{2}/20\d\d\b', line)
            dates.extend(d_matches)
            
        # Determine year/month from dates
        years_found = set()
        months_found = set()
        for d in dates:
            p = d.split('/')
            years_found.add(int(p[2]))
            months_found.add(int(p[1]))
            
        # Also check breadcrumb lines
        breadcrumb = ""
        for i, l in enumerate(lines[:10]):
            if "Home" in l or "Ledger" in l or "Open" in l or "202" in l:
                breadcrumb += " | " + l
                
        # Check for month names
        m_names = re.findall(r'\b(?:1[0-2]|[1-9])\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b', " ".join(lines[:20]), re.I)
        
        mapping.append({
            "folder": folder,
            "file": fname,
            "breadcrumb": breadcrumb[:100],
            "m_names": m_names,
            "years": sorted(list(years_found)),
            "months": sorted(list(months_found)),
            "total_dates": len(dates),
            "date_range": (min(dates) if dates else "") + " -> " + (max(dates) if dates else "")
        })
        
    return mapping

m = inspect_all()
print(f"Total mapped images: {len(m)}")
for item in m:
    print(f"{item['folder']:10} | {item['file']:45} | Years: {str(item['years']):15} | MNames: {str(item['m_names']):15} | Dates: {item['total_dates']:2} | Range: {item['date_range']}")

