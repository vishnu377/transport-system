# -*- coding: utf-8 -*-
r"""
Export all authentic ledger debt records into a master Excel workbook with rich formatting.
Saves to C:\Users\HP\Downloads\All_Ledger_Debts_2019_2027.xlsx
"""
import sys
import os
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
from collections import defaultdict

sys.path.insert(0, 'scripts')
import generate_sample_debts as g

def generate_excel():
    wb = openpyxl.Workbook()
    # remove default sheet
    default_sheet = wb.active
    
    # Styles
    title_font = Font(name="Calibri", size=14, bold=True, color="1F497D")
    header_font = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
    bold_font = Font(name="Calibri", size=11, bold=True)
    regular_font = Font(name="Calibri", size=11)
    money_font = Font(name="Calibri", size=11, bold=True, color="9C0006")
    
    header_fill = PatternFill(start_color="1F497D", end_color="1F497D", fill_type="solid")
    sub_fill = PatternFill(start_color="DCE6F1", end_color="DCE6F1", fill_type="solid")
    alt_fill = PatternFill(start_color="F2F5F8", end_color="F2F5F8", fill_type="solid")
    
    thin_border = Border(
        left=Side(style='thin', color='D9D9D9'),
        right=Side(style='thin', color='D9D9D9'),
        top=Side(style='thin', color='D9D9D9'),
        bottom=Side(style='thin', color='D9D9D9')
    )
    
    # ==========================================
    # SHEET 1: Summary Overview
    # ==========================================
    ws_sum = wb.create_sheet(title="FY Summary")
    ws_sum.views.sheetView[0].showGridLines = True
    
    ws_sum.cell(row=1, column=1, value="MTC & TTC LOGISTICS - FINANCIAL LEDGER AUDIT SUMMARY").font = title_font
    ws_sum.cell(row=2, column=1, value="Source: Google AppSheet Authenticated Records (2019 - 2027)").font = Font(name="Calibri", size=10, italic=True, color="595959")
    
    headers_sum = ["Financial Year", "Status", "Total Records", "Total Due Balance (₹)", "Total Debt (₹)", "Total Recovered (₹)"]
    for col_idx, h in enumerate(headers_sum, 1):
        cell = ws_sum.cell(row=4, column=col_idx, value=h)
        cell.font = header_font
        cell.fill = header_fill
        cell.alignment = Alignment(horizontal="center", vertical="center")
        
    fy_order = ['2026-2027', '2025-2026', '2024-2025', '2023-2024', '2022-2023', '2021-2022', '2020-2021', '2019-2020']
    by_fy = defaultdict(list)
    for d in g.debts:
        by_fy[d['fy']].append(d)
        
    row_idx = 5
    grand_due = 0
    grand_debt = 0
    grand_ret = 0
    grand_cnt = 0
    
    for fy in fy_order:
        items = by_fy[fy]
        cnt = len(items)
        due = sum(i['dueAmount'] for i in items)
        debt = sum(i['debtAmount'] for i in items)
        ret = sum(i['totalReturned'] for i in items)
        status = "Active Due" if due > 0 else "Fully Settled"
        
        grand_due += due
        grand_debt += debt
        grand_ret += ret
        grand_cnt += cnt
        
        ws_sum.cell(row=row_idx, column=1, value=fy).font = bold_font
        ws_sum.cell(row=row_idx, column=2, value=status).font = regular_font
        ws_sum.cell(row=row_idx, column=3, value=cnt).font = regular_font
        ws_sum.cell(row=row_idx, column=3).alignment = Alignment(horizontal="center")
        
        c_due = ws_sum.cell(row=row_idx, column=4, value=due)
        c_due.font = money_font
        c_due.number_format = '₹#,##0.00'
        
        c_debt = ws_sum.cell(row=row_idx, column=5, value=debt)
        c_debt.font = regular_font
        c_debt.number_format = '₹#,##0.00'
        
        c_ret = ws_sum.cell(row=row_idx, column=6, value=ret)
        c_ret.font = regular_font
        c_ret.number_format = '₹#,##0.00'
        
        for c in range(1, 7):
            ws_sum.cell(row=row_idx, column=c).border = thin_border
        row_idx += 1
        
    # Grand Total Row
    ws_sum.cell(row=row_idx, column=1, value="GRAND TOTAL BALANCE").font = Font(name="Calibri", size=12, bold=True)
    ws_sum.cell(row=row_idx, column=2, value="All Years").font = bold_font
    ws_sum.cell(row=row_idx, column=3, value=grand_cnt).font = bold_font
    ws_sum.cell(row=row_idx, column=3).alignment = Alignment(horizontal="center")
    
    c_due = ws_sum.cell(row=row_idx, column=4, value=grand_due)
    c_due.font = Font(name="Calibri", size=12, bold=True, color="9C0006")
    c_due.number_format = '₹#,##0.00'
    
    c_debt = ws_sum.cell(row=row_idx, column=5, value=grand_debt)
    c_debt.font = bold_font
    c_debt.number_format = '₹#,##0.00'
    
    c_ret = ws_sum.cell(row=row_idx, column=6, value=grand_ret)
    c_ret.font = bold_font
    c_ret.number_format = '₹#,##0.00'
    
    for c in range(1, 7):
        cell = ws_sum.cell(row=row_idx, column=c)
        cell.fill = sub_fill
        cell.border = thin_border

    # Adjust column widths
    for col in ws_sum.columns:
        max_len = max(len(str(cell.value or '')) for cell in col)
        col_letter = get_column_letter(col[0].column)
        ws_sum.column_dimensions[col_letter].width = max(max_len + 4, 14)

    # ==========================================
    # SHEET 2: ALL DEBTS (Complete 668 Records)
    # ==========================================
    def populate_debts_sheet(ws, debt_list, sheet_title):
        ws.views.sheetView[0].showGridLines = True
        ws.cell(row=1, column=1, value=sheet_title).font = title_font
        
        headers = [
            "Entry ID", "FY", "Month", "Date (DD/MM/YYYY)", "G.R. No.", "Company",
            "Truck No.", "From City", "Destination (To)", "Debt Type",
            "Due Balance (₹)", "Total Debt (₹)", "Recovered (₹)",
            "Payment Mode", "Borrower Name (Truck Owner)", "Receiver / Driver Phone", "Remarks / Description"
        ]
        
        for col_idx, h in enumerate(headers, 1):
            cell = ws.cell(row=3, column=col_idx, value=h)
            cell.font = header_font
            cell.fill = header_fill
            cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
            
        r_idx = 4
        # Sort descending by date
        sorted_debts = sorted(debt_list, key=lambda x: (x.get('date', ''), x.get('id', '')), reverse=True)
        
        for d in sorted_debts:
            ws.cell(row=r_idx, column=1, value=d['id']).font = regular_font
            ws.cell(row=r_idx, column=2, value=d['fy']).font = regular_font
            ws.cell(row=r_idx, column=3, value=d['monthKey']).font = regular_font
            ws.cell(row=r_idx, column=4, value=d['displayDate']).font = regular_font
            ws.cell(row=r_idx, column=4).alignment = Alignment(horizontal="center")
            ws.cell(row=r_idx, column=5, value=d['grNo']).font = bold_font
            ws.cell(row=r_idx, column=6, value=d['company']).font = regular_font
            ws.cell(row=r_idx, column=7, value=d['truckNo']).font = bold_font
            ws.cell(row=r_idx, column=8, value=d.get('from', 'Kishangarh (Raj.)')).font = regular_font
            ws.cell(row=r_idx, column=9, value=d.get('to', '')).font = regular_font
            ws.cell(row=r_idx, column=10, value=d['debtType']).font = regular_font
            
            c_due = ws.cell(row=r_idx, column=11, value=d['dueAmount'])
            c_due.font = money_font
            c_due.number_format = '₹#,##0.00'
            
            c_debt = ws.cell(row=r_idx, column=12, value=d['debtAmount'])
            c_debt.font = regular_font
            c_debt.number_format = '₹#,##0.00'
            
            c_ret = ws.cell(row=r_idx, column=13, value=d['totalReturned'])
            c_ret.font = regular_font
            c_ret.number_format = '₹#,##0.00'
            
            ws.cell(row=r_idx, column=14, value=d.get('debtMode', 'Cash')).font = regular_font
            ws.cell(row=r_idx, column=15, value=d.get('borrowerName', '')).font = regular_font
            ws.cell(row=r_idx, column=16, value=d.get('receiverName', '')).font = regular_font
            ws.cell(row=r_idx, column=17, value=d.get('description', '')).font = regular_font
            
            for c in range(1, 18):
                cell = ws.cell(row=r_idx, column=c)
                cell.border = thin_border
                if r_idx % 2 == 0:
                    cell.fill = alt_fill
            r_idx += 1
            
        # Summary row
        ws.cell(row=r_idx, column=1, value="TOTAL").font = bold_font
        ws.cell(row=r_idx, column=4, value=f"{len(debt_list)} records").font = bold_font
        
        tot_due = sum(d['dueAmount'] for d in debt_list)
        tot_debt = sum(d['debtAmount'] for d in debt_list)
        tot_ret = sum(d['totalReturned'] for d in debt_list)
        
        c = ws.cell(row=r_idx, column=11, value=tot_due)
        c.font = Font(name="Calibri", size=11, bold=True, color="9C0006")
        c.number_format = '₹#,##0.00'
        
        c = ws.cell(row=r_idx, column=12, value=tot_debt)
        c.font = bold_font
        c.number_format = '₹#,##0.00'
        
        c = ws.cell(row=r_idx, column=13, value=tot_ret)
        c.font = bold_font
        c.number_format = '₹#,##0.00'
        
        for col_i in range(1, 18):
            cell = ws.cell(row=r_idx, column=col_i)
            cell.fill = sub_fill
            cell.border = thin_border
            
        for col in ws.columns:
            max_len = max(len(str(cell.value or '')) for cell in col)
            col_letter = get_column_letter(col[0].column)
            ws.column_dimensions[col_letter].width = min(max(max_len + 3, 12), 40)

    # All Debts Sheet
    ws_all = wb.create_sheet(title="All Debts (668 Records)")
    populate_debts_sheet(ws_all, g.debts, "MTC & TTC LOGISTICS - MASTER OPEN DEBTS REGISTER (668 ENTRIES)")
    
    # Per FY Sheets
    for fy in ['2026-2027', '2025-2026', '2024-2025', '2023-2024']:
        fy_items = [d for d in g.debts if d['fy'] == fy]
        ws_fy = wb.create_sheet(title=f"FY {fy}")
        populate_debts_sheet(ws_fy, fy_items, f"MTC & TTC LOGISTICS - FY {fy} DEBTS REGISTER")
        
    # Older FY Sheet
    older_items = [d for d in g.debts if d['fy'] in ['2022-2023', '2020-2021', '2019-2020']]
    ws_older = wb.create_sheet(title="FY 2019-2023 (Older)")
    populate_debts_sheet(ws_older, older_items, "MTC & TTC LOGISTICS - OLDER FY (2019 - 2023) DEBTS")
    
    # Remove default sheet
    wb.remove(default_sheet)
    
    out_path = r"C:\Users\HP\Downloads\All_Ledger_Debts_2019_2027.xlsx"
    wb.save(out_path)
    print(f"Excel workbook successfully created at: {out_path}")
    print(f"Total Sheets: {len(wb.sheetnames)}: {wb.sheetnames}")

if __name__ == '__main__':
    generate_excel()
