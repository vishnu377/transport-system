# -*- coding: utf-8 -*-
import json
import re
import os
import sys
sys.path.insert(0, 'scripts')
import generate_sample_debts as g
from collections import defaultdict
from detailed_audit import audit_month

print("Running detailed audit on FY 2025-2026...")
audit_month("2025-2026", "12 Mar", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM.json")
audit_month("2025-2026", "11 Feb", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(1).json")
audit_month("2025-2026", "10 Jan", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(2).json")
audit_month("2025-2026", "9 Dec", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(3).json")
audit_month("2025-2026", "8 Nov", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(4).json")
audit_month("2025-2026", "7 Oct", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(5).json")
audit_month("2025-2026", "6 Sep", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(6).json")
audit_month("2025-2026", "5 Aug", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(7).json")
audit_month("2025-2026", "4 Jul", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(8).json")
audit_month("2025-2026", "3 Jun", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(9).json")
audit_month("2025-2026", "2 May", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(10).json")
audit_month("2025-2026", "1 Apr", "scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_33_PM_(11).json")

