$files = Get-ChildItem "scripts/ttc_slices/img_11/*.png" | Sort-Object Name
foreach ($f in $files) {
    $outJson = $f.FullName.Replace(".png", ".json")
    if (-not (Test-Path $outJson)) {
        & ./scripts/ocr_image.ps1 -ImagePath $f.FullName -OutJsonPath $outJson | Out-Null
        Write-Host "OCR done for $($f.Name)"
    }
}
Write-Host "All slices of img_11 processed!"
