$sliceDir = "scripts\driver_slices"
$jsonDir = "scripts\driver_ocr_json"

if (-not (Test-Path $jsonDir)) {
    New-Item -ItemType Directory -Path $jsonDir | Out-Null
}

$pngs = Get-ChildItem -Path $sliceDir -Filter "*.png" | Sort-Object Name

foreach ($p in $pngs) {
    $outJson = Join-Path $jsonDir "$($p.BaseName).json"
    if (Test-Path $outJson) {
        Write-Output "Skipping already processed: $($p.Name)"
        continue
    }
    Write-Output "OCRing $($p.Name)..."
    & powershell -ExecutionPolicy Bypass -File scripts\ocr_image.ps1 -ImagePath $p.FullName -OutJsonPath $outJson
}

Write-Output "All driver slices OCR complete!"
