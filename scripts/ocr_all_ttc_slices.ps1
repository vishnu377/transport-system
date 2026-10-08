$pngs = Get-ChildItem -Path "scripts/ttc_slices" -Recurse -Filter "*.png" | Sort-Object FullName
$total = $pngs.Count
$done = 0
Write-Host "Total PNG slices to check: $total"

foreach ($p in $pngs) {
    $json = $p.FullName.Substring(0, $p.FullName.Length - 4) + ".json"
    if (-not (Test-Path $json)) {
        & ./scripts/ocr_image.ps1 -ImagePath $p.FullName -OutJsonPath $json | Out-Null
        $done++
        if ($done % 10 -eq 0) {
            Write-Host "Processed $done slices..."
        }
    }
}
Write-Host "All TTC slices OCR complete! Total new processed: $done"
