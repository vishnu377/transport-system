$files = Get-ChildItem "C:\Users\HP\.gemini\antigravity\brain\ac3217be-821d-40b2-8aca-faf03e763b04\scratch\settlement_crops\*_header.png"
foreach ($f in $files) {
    $outJson = $f.FullName -replace '\.png$', '.json'
    powershell -ExecutionPolicy Bypass -File scripts\ocr_image.ps1 -ImagePath $f.FullName -OutJsonPath $outJson | Out-Null
    Write-Host "Processed $($f.Name)"
}
Write-Host "All crops OCR complete!"
