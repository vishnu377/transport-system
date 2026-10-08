for ($i=0; $i -le 11; $i++) {
    $img = (Resolve-Path "scripts/crops_overview/crop_$i.png").Path
    $out = (Join-Path (Get-Location) "scripts/crops_overview/ocr_$i.json")
    & ./scripts/ocr_image.ps1 -ImagePath $img -OutJsonPath $out | Out-Null
    Write-Host "Done OCR for crop $i"
}
Write-Host "All done!"
