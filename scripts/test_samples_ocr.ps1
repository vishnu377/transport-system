$indices = @(15, 25, 40, 51, 54)
foreach ($idx in $indices) {
    Write-Output "=== SAMPLE $idx ==="
    $res = powershell -ExecutionPolicy Bypass -File scripts/ocr_image.ps1 -ImagePath "C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\sample_$idx.png" | ConvertFrom-Json
    $res.lines | Select-Object -First 20
    Write-Output ""
}
