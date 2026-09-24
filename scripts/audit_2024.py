# -*- coding: utf-8 -*-
import json
import re
import os
import sys
sys.path.insert(0, 'scripts')
import generate_sample_debts as g
from collections import defaultdict
from detailed_audit import audit_month

print("Running detailed audit on FY 2024-2025...")
audit_month("2024-2025", "12 Mar", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(24).json")
audit_month("2024-2025", "11 Feb", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(22).json")
audit_month("2024-2025", "10 Jan", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(21).json")
audit_month("2024-2025", "9 Dec", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(20).json")
audit_month("2024-2025", "8 Nov", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(19).json")
audit_month("2024-2025", "7 Oct", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(18).json")
audit_month("2024-2025", "6 Sep", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(17).json")
audit_month("2024-2025", "5 Aug", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(16).json")
audit_month("2024-2025", "4 Jul", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(15).json")
audit_month("2024-2025", "3 Jun", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(14).json")
audit_month("2024-2025", "2 May", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(13).json")
audit_month("2024-2025", "1 Apr", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(12).json")

